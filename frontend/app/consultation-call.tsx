import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getLawyerById, updateBookingStatus, Lawyer } from '../services/lawyersData';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  primary: '#FF9933',
  white: '#FFFFFF',
  success: '#10B981',
  error: '#EF4444',
  textPrimary: '#1A1A2E',
};

export default function ConsultationCallScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { bookingId, lawyerId } = params;
  
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    const lawyerData = getLawyerById(lawyerId as string);
    if (lawyerData) setLawyer(lawyerData);
    
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [lawyerId]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    Alert.alert(
      'End Call',
      'Are you sure you want to end this call?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'End Call', style: 'destructive', onPress: () => {
          updateBookingStatus(bookingId as string, 'completed');
          router.replace({
            pathname: '/post-consultation',
            params: { bookingId, lawyerId }
          });
        }}
      ]
    );
  };

  const handleBack = () => {
    Alert.alert(
      'Leave Call',
      'Are you sure you want to leave this call?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Leave', style: 'destructive', onPress: () => {
          updateBookingStatus(bookingId as string, 'completed');
          router.replace('/(tabs)/home');
        }}
      ]
    );
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  const handleKeypad = () => {
    Alert.alert('Keypad', 'Keypad functionality coming soon');
  };

  const handleChat = () => {
    router.push({
      pathname: '/consultation-chat',
      params: { bookingId, lawyerId }
    });
  };

  if (!lawyer) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      
      <LinearGradient colors={['#1A1A2E', '#2D3748']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          {/* Header with back button */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBack}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Call Info */}
          <View style={styles.callInfo}>
            <View style={styles.profileContainer}>
              <Image source={{ uri: lawyer.image }} style={styles.profileImage} />
              <View style={styles.callPulse} />
            </View>
            <Text style={styles.lawyerName}>{lawyer.name}</Text>
            <Text style={styles.practiceArea}>{lawyer.practiceArea}</Text>
            <View style={styles.durationContainer}>
              <View style={styles.liveDot} />
              <Text style={styles.durationText}>{formatDuration(callDuration)}</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity 
              style={[styles.controlButton, isMuted && styles.controlButtonActive]} 
              onPress={toggleMute}
              activeOpacity={0.7}
            >
              <Ionicons name={isMuted ? 'mic-off' : 'mic'} size={28} color={COLORS.white} />
              <Text style={styles.controlLabel}>{isMuted ? 'Unmute' : 'Mute'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.controlButton, isSpeakerOn && styles.controlButtonActive]} 
              onPress={toggleSpeaker}
              activeOpacity={0.7}
            >
              <Ionicons name={isSpeakerOn ? 'volume-high' : 'volume-medium'} size={28} color={COLORS.white} />
              <Text style={styles.controlLabel}>Speaker</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={handleKeypad}
              activeOpacity={0.7}
            >
              <Ionicons name="keypad" size={28} color={COLORS.white} />
              <Text style={styles.controlLabel}>Keypad</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.controlButton}
              onPress={handleChat}
              activeOpacity={0.7}
            >
              <Ionicons name="chatbubble" size={28} color={COLORS.white} />
              <Text style={styles.controlLabel}>Chat</Text>
            </TouchableOpacity>
          </View>

          {/* End Call Button */}
          <View style={styles.endCallContainer}>
            <TouchableOpacity 
              style={styles.endCallButton} 
              onPress={handleEndCall}
              activeOpacity={0.8}
            >
              <Ionicons name="call" size={32} color={COLORS.white} style={{ transform: [{ rotate: '135deg' }] }} />
            </TouchableOpacity>
            <Text style={styles.endCallLabel}>End Call</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callInfo: { 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileContainer: { 
    position: 'relative',
  },
  profileImage: { 
    width: 140, 
    height: 140, 
    borderRadius: 70, 
    borderWidth: 4, 
    borderColor: COLORS.success,
    backgroundColor: '#374151',
  },
  callPulse: { 
    position: 'absolute', 
    top: -10, 
    left: -10, 
    right: -10, 
    bottom: -10, 
    borderRadius: 80, 
    borderWidth: 2, 
    borderColor: COLORS.success, 
    opacity: 0.5,
  },
  lawyerName: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: COLORS.white, 
    marginTop: 24,
  },
  practiceArea: { 
    fontSize: 16, 
    color: COLORS.white, 
    opacity: 0.7, 
    marginTop: 4,
  },
  durationContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 20,
  },
  liveDot: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: COLORS.success, 
    marginRight: 10,
  },
  durationText: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: COLORS.white,
  },
  controlsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  controlButton: { 
    alignItems: 'center', 
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 8,
    minWidth: 70,
  },
  controlButtonActive: { 
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  controlLabel: { 
    fontSize: 12, 
    color: COLORS.white, 
    opacity: 0.8, 
    marginTop: 8,
  },
  endCallContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  endCallButton: { 
    width: 72, 
    height: 72, 
    borderRadius: 36, 
    backgroundColor: COLORS.error, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  endCallLabel: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 8,
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
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
          Alert.alert('Call Ended', `Call duration: ${formatDuration(callDuration)}`, [
            { text: 'OK', onPress: () => router.replace('/(tabs)/home') }
          ]);
        }}
      ]
    );
  };

  if (!lawyer) return null;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      
      <LinearGradient colors={['#1A1A2E', '#2D3748']} style={styles.container}>
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

        <View style={styles.controlsContainer}>
          <TouchableOpacity style={[styles.controlButton, isMuted && styles.controlButtonActive]} onPress={() => setIsMuted(!isMuted)}>
            <Ionicons name={isMuted ? 'mic-off' : 'mic'} size={28} color={COLORS.white} />
            <Text style={styles.controlLabel}>{isMuted ? 'Unmute' : 'Mute'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.controlButton, isSpeakerOn && styles.controlButtonActive]} onPress={() => setIsSpeakerOn(!isSpeakerOn)}>
            <Ionicons name={isSpeakerOn ? 'volume-high' : 'volume-medium'} size={28} color={COLORS.white} />
            <Text style={styles.controlLabel}>Speaker</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="keypad" size={28} color={COLORS.white} />
            <Text style={styles.controlLabel}>Keypad</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
          <Ionicons name="call" size={32} color={COLORS.white} style={{ transform: [{ rotate: '135deg' }] }} />
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', paddingTop: 80, paddingBottom: 60 },
  callInfo: { alignItems: 'center' },
  profileContainer: { position: 'relative' },
  profileImage: { width: 140, height: 140, borderRadius: 70, borderWidth: 4, borderColor: COLORS.success },
  callPulse: { position: 'absolute', top: -10, left: -10, right: -10, bottom: -10, borderRadius: 80, borderWidth: 2, borderColor: COLORS.success, opacity: 0.5 },
  lawyerName: { fontSize: 28, fontWeight: '700', color: COLORS.white, marginTop: 24 },
  practiceArea: { fontSize: 16, color: COLORS.white, opacity: 0.7, marginTop: 4 },
  durationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.success, marginRight: 10 },
  durationText: { fontSize: 18, fontWeight: '600', color: COLORS.white },
  controlsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 40 },
  controlButton: { alignItems: 'center', padding: 16 },
  controlButtonActive: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16 },
  controlLabel: { fontSize: 12, color: COLORS.white, opacity: 0.8, marginTop: 8 },
  endCallButton: { alignSelf: 'center', width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.error, justifyContent: 'center', alignItems: 'center' },
});
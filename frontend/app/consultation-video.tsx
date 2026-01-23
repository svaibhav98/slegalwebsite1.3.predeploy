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

const COLORS = {
  primary: '#FF9933',
  white: '#FFFFFF',
  success: '#10B981',
  error: '#EF4444',
  overlay: 'rgba(0,0,0,0.6)',
};

export default function ConsultationVideoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { bookingId, lawyerId } = params;
  
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

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
      'End Video Call',
      'Are you sure you want to end this video call?',
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
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.container}>
        {/* Remote Video (Lawyer) - Full screen background */}
        <View style={styles.remoteVideo}>
          <Image source={{ uri: lawyer.image }} style={styles.remoteVideoImage} />
          <View style={styles.remoteOverlay} />
        </View>

        {/* Local Video (User) - Small PiP */}
        <View style={styles.localVideo}>
          {isVideoOff ? (
            <View style={styles.videoOff}>
              <Ionicons name="videocam-off" size={24} color={COLORS.white} />
            </View>
          ) : (
            <View style={styles.localVideoPlaceholder}>
              <Ionicons name="person" size={32} color={COLORS.white} />
            </View>
          )}
        </View>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.callStatusContainer}>
            <View style={styles.liveDot} />
            <Text style={styles.durationText}>{formatDuration(callDuration)}</Text>
          </View>
          <View style={styles.lawyerInfoTop}>
            <Text style={styles.lawyerNameTop}>{lawyer.name}</Text>
            <Text style={styles.practiceAreaTop}>{lawyer.practiceArea}</Text>
          </View>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={[styles.controlButton, isMuted && styles.controlButtonActive]} onPress={() => setIsMuted(!isMuted)}>
            <Ionicons name={isMuted ? 'mic-off' : 'mic'} size={24} color={COLORS.white} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.controlButton, isVideoOff && styles.controlButtonActive]} onPress={() => setIsVideoOff(!isVideoOff)}>
            <Ionicons name={isVideoOff ? 'videocam-off' : 'videocam'} size={24} color={COLORS.white} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
            <Ionicons name="call" size={28} color={COLORS.white} style={{ transform: [{ rotate: '135deg' }] }} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="chatbubble" size={24} color={COLORS.white} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="swap-horizontal" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  remoteVideo: { ...StyleSheet.absoluteFillObject },
  remoteVideoImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  remoteOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  localVideo: { position: 'absolute', top: 100, right: 20, width: 120, height: 160, borderRadius: 12, overflow: 'hidden', borderWidth: 2, borderColor: COLORS.white },
  localVideoPlaceholder: { flex: 1, backgroundColor: '#374151', justifyContent: 'center', alignItems: 'center' },
  videoOff: { flex: 1, backgroundColor: '#1F2937', justifyContent: 'center', alignItems: 'center' },
  topBar: { position: 'absolute', top: 50, left: 20, right: 140 },
  callStatusContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start' },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success, marginRight: 8 },
  durationText: { fontSize: 14, fontWeight: '600', color: COLORS.white },
  lawyerInfoTop: { marginTop: 16 },
  lawyerNameTop: { fontSize: 18, fontWeight: '700', color: COLORS.white },
  practiceAreaTop: { fontSize: 14, color: COLORS.white, opacity: 0.8, marginTop: 2 },
  bottomControls: { position: 'absolute', bottom: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16 },
  controlButton: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  controlButtonActive: { backgroundColor: 'rgba(255,255,255,0.4)' },
  endCallButton: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.error, justifyContent: 'center', alignItems: 'center' },
});
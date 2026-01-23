import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getLawyerById, Lawyer } from '../services/lawyersData';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  primary: '#FF9933',
  white: '#FFFFFF',
  background: '#F8F9FA',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  success: '#10B981',
};

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { bookingId, lawyerId, packageType } = params;
  
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);

  useEffect(() => {
    const lawyerData = getLawyerById(lawyerId as string);
    if (lawyerData) setLawyer(lawyerData);
  }, [lawyerId]);

  const handleStartConsultation = () => {
    const path = packageType === 'chat' ? '/consultation-chat' : 
                 packageType === 'voice' ? '/consultation-call' : '/consultation-video';
    router.replace({
      pathname: path,
      params: { bookingId, lawyerId }
    });
  };

  const handleGoHome = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.success} />
      
      <View style={styles.container}>
        <LinearGradient colors={[COLORS.success, '#059669']} style={styles.successBanner}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={48} color={COLORS.success} />
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtitle}>Your consultation has been scheduled successfully</Text>
        </LinearGradient>

        <View style={styles.content}>
          {lawyer && (
            <View style={styles.lawyerCard}>
              <Image source={{ uri: lawyer.image }} style={styles.lawyerImage} />
              <View style={styles.lawyerInfo}>
                <Text style={styles.lawyerName}>{lawyer.name}</Text>
                <Text style={styles.lawyerPractice}>{lawyer.practiceArea}</Text>
              </View>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            </View>
          )}

          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Ionicons name="document-text" size={20} color={COLORS.textSecondary} />
              <Text style={styles.detailLabel}>Booking ID</Text>
              <Text style={styles.detailValue}>{bookingId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name={packageType === 'chat' ? 'chatbubble' : packageType === 'voice' ? 'call' : 'videocam'} size={20} color={COLORS.textSecondary} />
              <Text style={styles.detailLabel}>Consultation Type</Text>
              <Text style={styles.detailValue}>{packageType === 'chat' ? 'Chat' : packageType === 'voice' ? 'Voice Call' : 'Video Call'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="checkmark-done" size={20} color={COLORS.success} />
              <Text style={styles.detailLabel}>Payment Status</Text>
              <Text style={[styles.detailValue, { color: COLORS.success }]}>Paid</Text>
            </View>
          </View>

          <View style={styles.noteCard}>
            <Ionicons name="information-circle" size={20} color={COLORS.primary} />
            <Text style={styles.noteText}>You can start your consultation now or access it from 'My Consultations' section anytime.</Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.startButton} onPress={handleStartConsultation}>
            <Ionicons name={packageType === 'chat' ? 'chatbubbles' : packageType === 'voice' ? 'call' : 'videocam'} size={20} color={COLORS.white} />
            <Text style={styles.startButtonText}>Start Consultation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
            <Text style={styles.homeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  successBanner: { alignItems: 'center', paddingTop: 60, paddingBottom: 40, paddingHorizontal: 20 },
  checkCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  successTitle: { fontSize: 26, fontWeight: '800', color: COLORS.white, marginBottom: 8 },
  successSubtitle: { fontSize: 15, color: COLORS.white, opacity: 0.9, textAlign: 'center' },
  content: { flex: 1, padding: 20, marginTop: -20 },
  lawyerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  lawyerImage: { width: 56, height: 56, borderRadius: 28, marginRight: 14 },
  lawyerInfo: { flex: 1 },
  lawyerName: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  lawyerPractice: { fontSize: 13, color: COLORS.success, marginTop: 2 },
  detailsCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 20, marginBottom: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  detailLabel: { flex: 1, fontSize: 14, color: COLORS.textSecondary, marginLeft: 12 },
  detailValue: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  noteCard: { flexDirection: 'row', backgroundColor: COLORS.primary + '15', borderRadius: 14, padding: 16 },
  noteText: { flex: 1, fontSize: 13, color: COLORS.primary, marginLeft: 12, lineHeight: 20, fontWeight: '500' },
  bottomContainer: { padding: 20, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  startButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.success, borderRadius: 14, paddingVertical: 18, marginBottom: 12 },
  startButtonText: { fontSize: 16, fontWeight: '700', color: COLORS.white, marginLeft: 8 },
  homeButton: { alignItems: 'center', paddingVertical: 14 },
  homeButtonText: { fontSize: 15, fontWeight: '600', color: COLORS.textSecondary },
});
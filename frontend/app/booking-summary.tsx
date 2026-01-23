import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getLawyerById, Lawyer, LawyerPackage } from '../services/lawyersData';

const COLORS = {
  primary: '#FF9933',
  white: '#FFFFFF',
  background: '#F8F9FA',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  success: '#10B981',
};

export default function BookingSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { lawyerId, packageId, mode, scheduledDateTime } = params;
  
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<LawyerPackage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lawyerData = getLawyerById(lawyerId as string);
    if (lawyerData) {
      setLawyer(lawyerData);
      const pkg = lawyerData.packages.find(p => p.id === packageId);
      setSelectedPackage(pkg || null);
    }
    setLoading(false);
  }, [lawyerId, packageId]);

  const handleProceedToPayment = () => {
    router.push({
      pathname: '/payment',
      params: { 
        lawyerId: lawyerId as string,
        packageId: packageId as string,
        mode: mode as string,
        scheduledDateTime: scheduledDateTime as string || '',
      }
    });
  };

  const handleBack = () => {
    router.back();
  };

  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return 'Next available';
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || !lawyer || !selectedPackage) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Summary</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          {/* Lawyer Info */}
          <View style={styles.lawyerCard}>
            <Image source={{ uri: lawyer.image }} style={styles.lawyerImage} />
            <View style={styles.lawyerInfo}>
              <Text style={styles.lawyerName}>{lawyer.name}</Text>
              <Text style={styles.lawyerPractice}>{lawyer.practiceArea}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.ratingText}>{lawyer.rating} ({lawyer.reviewCount} reviews)</Text>
              </View>
            </View>
          </View>

          {/* Booking Details */}
          <View style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Consultation Details</Text>
            
            <View style={styles.detailRow}>
              <Ionicons name={selectedPackage.type === 'voice' ? 'call' : selectedPackage.type === 'chat' ? 'chatbubble' : 'videocam'} size={20} color={COLORS.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{selectedPackage.name}</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="time" size={20} color={COLORS.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>{selectedPackage.duration} minutes</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={20} color={COLORS.primary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Schedule</Text>
                <Text style={styles.detailValue}>{mode === 'instant' ? 'Instant (Next available)' : formatDateTime(scheduledDateTime as string)}</Text>
              </View>
            </View>
          </View>

          {/* Price Summary */}
          <View style={styles.priceCard}>
            <Text style={styles.sectionTitle}>Payment Summary</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Consultation Fee</Text>
              <Text style={styles.priceValue}>₹{selectedPackage.price}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Platform Fee</Text>
              <Text style={styles.priceValue}>₹0</Text>
            </View>
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{selectedPackage.price}</Text>
            </View>
          </View>
        </View>

        {/* Bottom CTA */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.payButton} onPress={handleProceedToPayment} activeOpacity={0.9}>
            <Text style={styles.payButtonText}>Proceed to Payment</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: COLORS.white },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  headerSpacer: { width: 44 },
  content: { flex: 1, padding: 20 },
  lawyerCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  lawyerImage: { width: 70, height: 70, borderRadius: 35, marginRight: 16 },
  lawyerInfo: { flex: 1, justifyContent: 'center' },
  lawyerName: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  lawyerPractice: { fontSize: 14, color: COLORS.success, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingText: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 4 },
  detailsCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  detailContent: { flex: 1, marginLeft: 14 },
  detailLabel: { fontSize: 12, color: COLORS.textMuted },
  detailValue: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginTop: 2 },
  priceCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 20 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  priceLabel: { fontSize: 14, color: COLORS.textSecondary },
  priceValue: { fontSize: 14, fontWeight: '500', color: COLORS.textPrimary },
  totalRow: { borderTopWidth: 1, borderTopColor: COLORS.border, marginTop: 8, paddingTop: 16 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  totalValue: { fontSize: 20, fontWeight: '800', color: COLORS.primary },
  bottomContainer: { padding: 20, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border },
  payButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 18 },
  payButtonText: { fontSize: 16, fontWeight: '700', color: COLORS.white, marginRight: 8 },
});
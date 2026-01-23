import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getLawyerById, createBooking, Lawyer, LawyerPackage } from '../services/lawyersData';

const COLORS = {
  primary: '#FF9933',
  white: '#FFFFFF',
  background: '#F8F9FA',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  success: '#10B981',
  error: '#EF4444',
};

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { lawyerId, packageId, mode, scheduledDateTime } = params;
  
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<LawyerPackage | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    const lawyerData = getLawyerById(lawyerId as string);
    if (lawyerData) {
      setLawyer(lawyerData);
      const pkg = lawyerData.packages.find(p => p.id === packageId);
      setSelectedPackage(pkg || null);
    }
  }, [lawyerId, packageId]);

  const handleBack = () => router.back();

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Create booking
      const booking = createBooking({
        lawyerId: lawyerId as string,
        lawyerName: lawyer?.name || '',
        userId: 'user-1',
        packageType: selectedPackage?.type || 'chat',
        packageName: selectedPackage?.name || '',
        price: selectedPackage?.price || 0,
        duration: selectedPackage?.duration || 10,
        status: 'confirmed',
        paymentStatus: 'paid',
        scheduledDateTime: scheduledDateTime as string || '',
      });
      
      setProcessing(false);
      
      router.replace({
        pathname: '/booking-confirmation',
        params: { 
          bookingId: booking.id,
          lawyerId: lawyerId as string,
          packageType: selectedPackage?.type || 'chat',
        }
      });
    }, 2000);
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  if (!lawyer || !selectedPackage) return null;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Amount */}
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.amountValue}>₹{selectedPackage.price}</Text>
            <Text style={styles.amountSubtext}>{selectedPackage.name} • {selectedPackage.duration} min with {lawyer.name}</Text>
          </View>

          {/* Payment Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            
            <TouchableOpacity
              style={[styles.methodCard, paymentMethod === 'card' && styles.methodCardSelected]}
              onPress={() => setPaymentMethod('card')}
            >
              <Ionicons name="card" size={24} color={paymentMethod === 'card' ? COLORS.primary : COLORS.textSecondary} />
              <Text style={[styles.methodText, paymentMethod === 'card' && styles.methodTextSelected]}>Debit/Credit Card</Text>
              {paymentMethod === 'card' && <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.methodCard, paymentMethod === 'upi' && styles.methodCardSelected]}
              onPress={() => setPaymentMethod('upi')}
            >
              <Ionicons name="wallet" size={24} color={paymentMethod === 'upi' ? COLORS.primary : COLORS.textSecondary} />
              <Text style={[styles.methodText, paymentMethod === 'upi' && styles.methodTextSelected]}>UPI</Text>
              {paymentMethod === 'upi' && <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />}
            </TouchableOpacity>
          </View>

          {/* Card Form */}
          {paymentMethod === 'card' && (
            <View style={styles.formSection}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={COLORS.textMuted}
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>
              <View style={styles.rowInputs}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    placeholderTextColor={COLORS.textMuted}
                    value={expiryDate}
                    onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    placeholderTextColor={COLORS.textMuted}
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          )}

          {/* UPI Form */}
          {paymentMethod === 'upi' && (
            <View style={styles.formSection}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>UPI ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="yourname@upi"
                  placeholderTextColor={COLORS.textMuted}
                  value={upiId}
                  onChangeText={setUpiId}
                  autoCapitalize="none"
                />
              </View>
            </View>
          )}

          {/* Demo Notice */}
          <View style={styles.demoNotice}>
            <Ionicons name="information-circle" size={18} color={COLORS.primary} />
            <Text style={styles.demoText}>This is a demo payment. No real transaction will occur.</Text>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.payButton}
            onPress={handlePayment}
            disabled={processing}
          >
            {processing ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <>
                <Ionicons name="lock-closed" size={18} color={COLORS.white} />
                <Text style={styles.payButtonText}>Pay ₹{selectedPackage.price}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 16, backgroundColor: COLORS.white },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  headerSpacer: { width: 44 },
  content: { flex: 1, padding: 20 },
  amountCard: { backgroundColor: COLORS.primary, borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 24 },
  amountLabel: { fontSize: 14, color: COLORS.white, opacity: 0.9 },
  amountValue: { fontSize: 40, fontWeight: '800', color: COLORS.white, marginVertical: 8 },
  amountSubtext: { fontSize: 13, color: COLORS.white, opacity: 0.85, textAlign: 'center' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 14 },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 2, borderColor: 'transparent' },
  methodCardSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.primary + '08' },
  methodText: { flex: 1, fontSize: 15, fontWeight: '500', color: COLORS.textSecondary, marginLeft: 14 },
  methodTextSelected: { color: COLORS.textPrimary },
  formSection: { marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 8 },
  input: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: COLORS.textPrimary },
  rowInputs: { flexDirection: 'row' },
  demoNotice: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary + '15', borderRadius: 12, padding: 14 },
  demoText: { flex: 1, fontSize: 13, color: COLORS.primary, marginLeft: 10, fontWeight: '500' },
  bottomContainer: { padding: 20, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border },
  payButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 18 },
  payButtonText: { fontSize: 16, fontWeight: '700', color: COLORS.white, marginLeft: 8 },
});
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, G } from 'react-native-svg';

const COLORS = {
  primary: '#FF9800',
  background: '#FFFFFF',
  textPrimary: '#212121',
  textSecondary: '#757575',
  success: '#4CAF50',
  borderGray: '#E0E0E0',
  lightYellow: '#FFF8E1',
  lightBlue: '#E3F2FD',
};

const ClockIllustration = () => (
  <View style={styles.illustrationContainer}>
    {/* Outer glow circle */}
    <LinearGradient
      colors={['#FFE082', '#FFB74D']}
      style={styles.outerCircle}
    >
      {/* Clock face */}
      <View style={styles.clockFace}>
        {/* Clock ticks */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <View
            key={i}
            style={[
              styles.clockTick,
              {
                transform: [
                  { rotate: `${angle}deg` },
                  { translateY: -60 },
                ],
              },
            ]}
          />
        ))}
        
        {/* Shield with checkmark */}
        <LinearGradient
          colors={['#90CAF9', '#64B5F6']}
          style={styles.shield}
        >
          <Ionicons name="checkmark" size={50} color="#FFFFFF" />
        </LinearGradient>
      </View>
    </LinearGradient>
    
    {/* Decorative sparkles */}
    <View style={[styles.sparkle, { top: 20, left: 20 }]}>
      <Ionicons name="sparkles" size={16} color="#FFE082" />
    </View>
    <View style={[styles.sparkle, { top: 30, right: 30 }]}>
      <Ionicons name="sparkles" size={12} color="#90CAF9" />
    </View>
    <View style={[styles.sparkle, { bottom: 40, left: 35 }]}>
      <Ionicons name="sparkles" size={14} color="#FFE082" />
    </View>
    <View style={[styles.sparkle, { bottom: 25, right: 40 }]}>
      <Ionicons name="sparkles" size={10} color="#90CAF9" />
    </View>
  </View>
);

export default function VerificationInProgressScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text style={styles.title}>Verification in Progress</Text>

          {/* Clock Illustration */}
          <ClockIllustration />

          {/* Main Message */}
          <Text style={styles.mainHeading}>Your profile is under verification</Text>
          <Text style={styles.mainDescription}>
            Your details and documents have been successfully submitted.{' '}
            Our team is reviewing your profile to ensure authenticity and compliance.
          </Text>

          {/* Estimated Time */}
          <View style={styles.estimatedTimeRow}>
            <Ionicons name="time-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.estimatedLabel}>Estimated time: </Text>
            <Text style={styles.estimatedValue}>2–3 working days</Text>
          </View>

          {/* What Happens Next */}
          <View style={styles.stepsCard}>
            <Text style={styles.stepsTitle}>What Happens Next:</Text>
            
            <View style={styles.stepItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.stepText}>Profile details review</Text>
            </View>

            <View style={styles.stepItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.stepText}>Bar Council ID verification</Text>
            </View>

            <View style={styles.stepItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.stepText}>Certificate validation</Text>
            </View>

            <View style={styles.stepItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.stepText}>Final approval</Text>
            </View>
          </View>

          {/* Status Chip */}
          <TouchableOpacity style={styles.statusChip}>
            <Text style={styles.statusText}>Current Status: Under Review</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textPrimary} />
          </TouchableOpacity>

          {/* Action Buttons */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text style={styles.primaryButtonText}>Go to Dashboard (Limited Access)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>Edit Submitted Details</Text>
          </TouchableOpacity>

          {/* Security Footer */}
          <View style={styles.securityFooter}>
            <Ionicons name="lock-closed" size={18} color={COLORS.textSecondary} />
            <Text style={styles.securityText}>
              Your documents are encrypted and used only for verification purposes.
            </Text>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 40,
    textAlign: 'center',
  },
  illustrationContainer: {
    width: 240,
    height: 240,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockFace: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFF9C4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  clockTick: {
    position: 'absolute',
    width: 2,
    height: 8,
    backgroundColor: '#FFE082',
  },
  shield: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkle: {
    position: 'absolute',
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  mainDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  estimatedTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  estimatedLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  estimatedValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  stepsCard: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    padding: 20,
    marginBottom: 24,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  stepText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.lightYellow,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 24,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    marginBottom: 24,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  securityFooter: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 20,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

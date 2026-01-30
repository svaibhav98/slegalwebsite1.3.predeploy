import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, onPress }) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  return <CardComponent style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>{children}</CardComponent>;
};

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, rightAction }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
      </View>
      {rightAction}
    </View>
  );
};

interface QuickAccessCardProps {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  onPress: () => void;
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ icon, title, subtitle, color, onPress }) => {
  return (
    <TouchableOpacity style={[styles.quickAccessCard, { backgroundColor: color + '15' }]} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon as any} size={32} color={color} />
      <Text style={styles.quickAccessTitle}>{title}</Text>
      <Text style={styles.quickAccessSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

interface LawyerCardProps {
  lawyer: any;
  onPress: () => void;
}

export const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onPress }) => {
  return (
    <TouchableOpacity style={styles.lawyerCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.lawyerInfo}>
        <View style={styles.lawyerAvatar}>
          <Ionicons name="person" size={32} color={Colors.primary} />
        </View>
        <View style={styles.lawyerDetails}>
          <Text style={styles.lawyerName}>{lawyer.name}</Text>
          <Text style={styles.lawyerSpecialization}>{lawyer.specialization?.[0]}</Text>
          <View style={styles.lawyerMeta}>
            <Ionicons name="star" size={14} color={Colors.warning} />
            <Text style={styles.lawyerRating}>{lawyer.rating || '4.5'}</Text>
            <Text style={styles.lawyerExperience}> • {lawyer.experience} years</Text>
          </View>
        </View>
      </View>
      <View style={styles.lawyerPrice}>
        <Text style={styles.lawyerPriceAmount}>₹{lawyer.price}</Text>
        <Text style={styles.lawyerPriceLabel}>per 30 min</Text>
      </View>
    </TouchableOpacity>
  );
};

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  action?: { label: string; onPress: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, subtitle, action }) => {
  return (
    <View style={styles.emptyState}>
      <Ionicons name={icon as any} size={64} color={Colors.gray300} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySubtitle}>{subtitle}</Text>
      {action && (
        <TouchableOpacity style={styles.emptyAction} onPress={action.onPress}>
          <Text style={styles.emptyActionText}>{action.label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: Colors.surface, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, backgroundColor: Colors.background },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
  headerSubtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  quickAccessCard: { width: '48%', aspectRatio: 1, borderRadius: 16, padding: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  quickAccessTitle: { fontSize: 14, fontWeight: '600', color: Colors.text, marginTop: 12, textAlign: 'center' },
  quickAccessSubtitle: { fontSize: 12, color: Colors.textSecondary, marginTop: 4, textAlign: 'center' },
  lawyerCard: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
  lawyerInfo: { flex: 1, flexDirection: 'row' },
  lawyerAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.primaryLight + '30', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  lawyerDetails: { flex: 1 },
  lawyerName: { fontSize: 16, fontWeight: '600', color: Colors.text },
  lawyerSpecialization: { fontSize: 14, color: Colors.secondary, marginTop: 2 },
  lawyerMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  lawyerRating: { fontSize: 12, color: Colors.text, marginLeft: 4 },
  lawyerExperience: { fontSize: 12, color: Colors.textSecondary },
  lawyerPrice: { alignItems: 'flex-end', justifyContent: 'center' },
  lawyerPriceAmount: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },
  lawyerPriceLabel: { fontSize: 12, color: Colors.textSecondary },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: Colors.text, marginTop: 16, textAlign: 'center' },
  emptySubtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 8, textAlign: 'center' },
  emptyAction: { marginTop: 24, paddingHorizontal: 24, paddingVertical: 12, backgroundColor: Colors.primary, borderRadius: 8 },
  emptyActionText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});

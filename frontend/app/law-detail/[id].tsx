import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function LawDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const lawDetails: any = {
    tenancy: {
      title: 'Tenancy Laws',
      icon: 'home',
      content: 'Tenants in India are protected under state Rent Acts and the Model Tenancy Act, 2021. Key rights include a written rental agreement, fair rent, peaceful possession, and refund of security deposit. Landlords must follow due process for eviction.\n\nTenants must pay rent on time, maintain the property, and avoid unauthorized changes.',
      link: 'https://mohua.gov.in',
      related: [
        { icon: 'business', title: 'Land & Property Laws' },
        { icon: 'document-text', title: 'Tenancy Laws' },
        { icon: 'leaf', title: 'Farmer Schemes' },
      ]
    },
    consumer: {
      title: 'Consumer Protection Act',
      icon: 'cart',
      content: 'The Consumer Protection Act, 2019 protects consumers against unfair trade practices, defective goods, and deficient services. It provides for consumer tribunals at district, state, and national levels.\n\nKey rights include: Right to safety, Right to information, Right to choose, Right to be heard, Right to seek redressal.',
      link: 'https://consumeraffairs.nic.in',
      related: [
        { icon: 'shield-checkmark', title: 'Consumer Rights' },
        { icon: 'document-text', title: 'E-commerce Rules' },
        { icon: 'card', title: 'Payment Disputes' },
      ]
    },
  };

  const law = lawDetails[params.id as string] || lawDetails.tenancy;

  const handleOpenLink = () => {
    Linking.openURL(law.link);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <View style={styles.iconCircle}>
            <Ionicons name={law.icon} size={48} color={Colors.primary} />
          </View>
          <Text style={styles.title}>{law.title}</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>Tenant Rights and Responsibilities</Text>
            <Text style={styles.contentText}>{law.content}</Text>
            <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
              <Ionicons name="document-text" size={16} color={Colors.info} />
              <Text style={styles.linkText}>Learn more: {law.link}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.relatedSection}>
            {law.related.map((item: any, index: number) => (
              <TouchableOpacity key={index} style={styles.relatedCard} activeOpacity={0.8}>
                <View style={styles.relatedIcon}>
                  <Ionicons name={item.icon} size={32} color={Colors.primary} />
                </View>
                <Text style={styles.relatedTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2B2D42' },
  header: { paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  titleSection: { alignItems: 'center', paddingBottom: 32 },
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', textAlign: 'center' },
  content: { flex: 1, backgroundColor: Colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24 },
  contentCard: { marginHorizontal: 20, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 12 },
  contentText: { fontSize: 14, color: Colors.text, lineHeight: 22, marginBottom: 16 },
  linkButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 8 },
  linkText: { fontSize: 13, color: Colors.info, fontWeight: '600' },
  relatedSection: { marginHorizontal: 20, gap: 12 },
  relatedCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  relatedIcon: { width: 56, height: 56, borderRadius: 12, backgroundColor: Colors.surface, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  relatedTitle: { fontSize: 15, fontWeight: '600', color: Colors.text, flex: 1 },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import * as DocumentPicker from 'expo-document-picker';

export default function JoinLawyerScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    specialization: '',
    experience: '',
    languages: '',
    councilNumber: '',
  });
  const [uploads, setUploads] = useState({
    photo: null,
    certificates: null,
    barCouncilId: null,
  });

  const specializations = ['Corporate Law', 'Family Law', 'Criminal Law', 'Property Law', 'Tax Law'];
  const experienceYears = ['1-3', '4-7', '8-12', '12+'];
  const languageOptions = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi'];

  const handleUpload = async (field: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.assets && result.assets[0]) {
        setUploads({ ...uploads, [field]: result.assets[0].name });
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData, uploads);
    alert('Application submitted for verification!');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Join as a Lawyer</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>Create an account</Text>
            <Text style={styles.cardSubtitle}>Sign up your account to continue</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor={Colors.gray400} value={formData.fullName} onChangeText={(text) => setFormData({ ...formData, fullName: text })} />

            <Text style={styles.label}>Specialization</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>{formData.specialization || 'Select Specialization'}</Text>
              <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
            </View>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Experience</Text>
                <View style={styles.dropdown}>
                  <Text style={styles.dropdownText}>{formData.experience || 'Years'}</Text>
                  <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
                </View>
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Languages</Text>
                <View style={styles.dropdown}>
                  <Text style={styles.dropdownText}>{formData.languages || 'Select language'}</Text>
                  <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
                </View>
              </View>
            </View>

            <Text style={styles.label}>Council Number</Text>
            <TextInput style={styles.input} placeholder="Registration Number" placeholderTextColor={Colors.gray400} value={formData.councilNumber} onChangeText={(text) => setFormData({ ...formData, councilNumber: text })} />

            <Text style={styles.label}>Uploads</Text>
            <View style={styles.uploadsRow}>
              <TouchableOpacity style={styles.uploadBox} onPress={() => handleUpload('photo')} activeOpacity={0.8}>
                <View style={styles.uploadIcon}>
                  <Ionicons name="cloud-upload-outline" size={32} color={Colors.textSecondary} />
                </View>
                <Text style={styles.uploadLabel}>Profile Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadBox} onPress={() => handleUpload('certificates')} activeOpacity={0.8}>
                <View style={styles.uploadIcon}>
                  <Ionicons name="cloud-upload-outline" size={32} color={Colors.textSecondary} />
                </View>
                <Text style={styles.uploadLabel}>Certificates</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadBox} onPress={() => handleUpload('barCouncilId')} activeOpacity={0.8}>
                <View style={styles.uploadIcon}>
                  <Ionicons name="cloud-upload-outline" size={32} color={Colors.textSecondary} />
                </View>
                <Text style={styles.uploadLabel}>Bar Council ID</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.9}>
              <Text style={styles.submitButtonText}>Submit for Verification</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>Your profile will go live only after verification by the SunoLegal team. Verification may take 2-3 working days</Text>
          </View>

          <View style={{ height: 80 }} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2B2D42' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  content: { flex: 1, backgroundColor: Colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24 },
  formCard: { marginHorizontal: 20, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24 },
  cardTitle: { fontSize: 24, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24 },
  label: { fontSize: 15, fontWeight: '600', color: Colors.text, marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: Colors.surface, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 16, fontSize: 15, color: Colors.text, borderWidth: 1, borderColor: Colors.border },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 16, borderWidth: 1, borderColor: Colors.border },
  dropdownText: { fontSize: 15, color: Colors.textSecondary },
  row: { flexDirection: 'row', gap: 12 },
  halfWidth: { flex: 1 },
  uploadsRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  uploadBox: { flex: 1, alignItems: 'center', backgroundColor: Colors.info + '15', borderRadius: 14, paddingVertical: 24, borderWidth: 2, borderColor: Colors.info + '30', borderStyle: 'dashed' },
  uploadIcon: { marginBottom: 8 },
  uploadLabel: { fontSize: 12, fontWeight: '600', color: Colors.text, textAlign: 'center' },
  submitButton: { marginTop: 32, backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 18, alignItems: 'center', shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  submitButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  disclaimer: { fontSize: 11, color: Colors.error, textAlign: 'center', marginTop: 16, lineHeight: 16 },
});

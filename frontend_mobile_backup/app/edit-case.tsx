import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getCaseById, updateCase, CASE_TYPES, CaseType, CaseStatus, Case } from '../services/casesData';

// Design System Colors
const COLORS = {
  headerBg: '#1A1A2E',
  primary: '#FF9933',
  white: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  surface: '#FFFFFF',
  background: '#F5F7FA',
  inputBg: '#F9FAFB',
  ongoing: '#10B981',
  closed: '#EF4444',
  upcoming: '#F59E0B',
};

export default function EditCaseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const caseId = params.caseId as string;
  
  const [formData, setFormData] = useState({
    title: '',
    caseType: '' as CaseType | '',
    caseNumber: '',
    court: '',
    city: '',
    petitioner: '',
    respondent: '',
    filingDate: '',
    nextHearingDate: '',
    status: 'upcoming' as CaseStatus,
    notes: '',
  });
  const [showCaseTypePicker, setShowCaseTypePicker] = useState(false);

  useEffect(() => {
    if (caseId) {
      const caseItem = getCaseById(caseId);
      if (caseItem) {
        setFormData({
          title: caseItem.title,
          caseType: caseItem.caseType,
          caseNumber: caseItem.caseNumber,
          court: caseItem.court,
          city: caseItem.city,
          petitioner: caseItem.petitioner,
          respondent: caseItem.respondent,
          filingDate: caseItem.filingDate,
          nextHearingDate: caseItem.nextHearingDate,
          status: caseItem.status,
          notes: caseItem.notes,
        });
      }
    }
  }, [caseId]);

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      Alert.alert('Validation Error', 'Case title is required.');
      return;
    }

    updateCase(caseId, {
      title: formData.title,
      caseType: formData.caseType as CaseType,
      caseNumber: formData.caseNumber,
      court: formData.court,
      city: formData.city,
      petitioner: formData.petitioner,
      respondent: formData.respondent,
      filingDate: formData.filingDate,
      nextHearingDate: formData.nextHearingDate,
      status: formData.status,
      notes: formData.notes,
      lastActivityDate: new Date().toISOString().split('T')[0],
    });

    Alert.alert(
      'Case Updated',
      'Your changes have been saved successfully.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case 'ongoing': return COLORS.ongoing;
      case 'closed': return COLORS.closed;
      case 'upcoming': return COLORS.upcoming;
      default: return COLORS.textMuted;
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerBg} />
      
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Edit Case</Text>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Case Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Case Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter case title"
              placeholderTextColor={COLORS.textMuted}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          {/* Case Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Case Type *</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowCaseTypePicker(!showCaseTypePicker)}
            >
              <Text style={formData.caseType ? styles.dropdownText : styles.dropdownPlaceholder}>
                {formData.caseType || 'Select case type'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
            {showCaseTypePicker && (
              <View style={styles.pickerOptions}>
                {CASE_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.pickerOption}
                    onPress={() => {
                      setFormData({ ...formData, caseType: type });
                      setShowCaseTypePicker(false);
                    }}
                  >
                    <Text style={styles.pickerOptionText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Case Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Case Number</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., RTI/2025/1234"
              placeholderTextColor={COLORS.textMuted}
              value={formData.caseNumber}
              onChangeText={(text) => setFormData({ ...formData, caseNumber: text })}
            />
          </View>

          {/* Court & City Row */}
          <View style={styles.rowGroup}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Court/Authority *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., High Court"
                placeholderTextColor={COLORS.textMuted}
                value={formData.court}
                onChangeText={(text) => setFormData({ ...formData, court: text })}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>City *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Delhi"
                placeholderTextColor={COLORS.textMuted}
                value={formData.city}
                onChangeText={(text) => setFormData({ ...formData, city: text })}
              />
            </View>
          </View>

          {/* Parties */}
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={18} color={COLORS.textPrimary} />
            <Text style={styles.sectionTitle}>Parties Involved</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Petitioner / Applicant *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter petitioner name"
              placeholderTextColor={COLORS.textMuted}
              value={formData.petitioner}
              onChangeText={(text) => setFormData({ ...formData, petitioner: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Respondent / Opposite Party *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter respondent name"
              placeholderTextColor={COLORS.textMuted}
              value={formData.respondent}
              onChangeText={(text) => setFormData({ ...formData, respondent: text })}
            />
          </View>

          {/* Important Dates */}
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={18} color={COLORS.textPrimary} />
            <Text style={styles.sectionTitle}>Important Dates</Text>
          </View>

          <View style={styles.rowGroup}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Filing Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={COLORS.textMuted}
                value={formData.filingDate}
                onChangeText={(text) => setFormData({ ...formData, filingDate: text })}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Next Hearing</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={COLORS.textMuted}
                value={formData.nextHearingDate}
                onChangeText={(text) => setFormData({ ...formData, nextHearingDate: text })}
              />
            </View>
          </View>

          {/* Status */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusOptions}>
              {(['upcoming', 'ongoing', 'closed'] as CaseStatus[]).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusOption,
                    formData.status === status && { 
                      backgroundColor: getStatusColor(status),
                      borderColor: getStatusColor(status)
                    }
                  ]}
                  onPress={() => setFormData({ ...formData, status })}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.statusOptionText,
                    formData.status === status && { color: COLORS.white }
                  ]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notes */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add any notes about this case..."
              placeholderTextColor={COLORS.textMuted}
              value={formData.notes}
              onChangeText={(text) => setFormData({ ...formData, notes: text })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSave}
            activeOpacity={0.9}
          >
            <Ionicons name="checkmark-circle" size={22} color={COLORS.white} />
            <Text style={styles.submitButtonText}>Save Changes</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.headerBg,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.headerBg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },

  // Content
  content: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contentContainer: {
    padding: 24,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 10,
  },

  // Input Group
  inputGroup: {
    marginBottom: 20,
  },
  rowGroup: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },

  // Dropdown
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: COLORS.textMuted,
  },
  pickerOptions: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    marginTop: 8,
    overflow: 'hidden',
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  pickerOptionText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  // Status Options
  statusOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },

  // Submit Button
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 18,
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: 10,
  },
});

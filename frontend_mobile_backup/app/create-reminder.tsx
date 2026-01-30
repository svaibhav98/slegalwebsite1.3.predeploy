import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const COLORS = {
  primary: '#FF9933',
  background: '#F8F9FA',
  white: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  headerBg: '#1A1A2E',
};

export default function CreateReminderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { caseId, caseTitle, caseStatus } = params;

  const [reminderTitle, setReminderTitle] = useState(`Reminder: ${caseTitle || 'Case'}`);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminderType, setReminderType] = useState('Court Hearing');
  const [pushEnabled, setPushEnabled] = useState(true);

  const reminderTypes = ['Court Hearing', 'Document Submission', 'Meeting', 'Other'];

  const handleSave = () => {
    // Save reminder logic here
    const reminderData = {
      caseId,
      title: reminderTitle,
      date: selectedDate,
      time: selectedTime,
      notes,
      type: reminderType,
      pushEnabled,
    };
    
    // Navigate to confirmation page
    router.push({
      pathname: '/reminder-saved',
      params: {
        caseTitle: caseTitle as string,
        date: selectedDate.toISOString(),
        time: selectedTime.toISOString(),
      },
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.headerBg} />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reminder</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Case Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Case & Appointment Reminder</Text>
            <Text style={styles.sectionSubtitle}>Helps you to get notified</Text>
          </View>

          {/* Date & Time */}
          <View style={styles.section}>
            <Text style={styles.label}>Date & Time</Text>
            <View style={styles.row}>
              <TouchableOpacity 
                style={styles.dateTimeButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar" size={20} color={COLORS.primary} />
                <Text style={styles.dateTimeText}>{formatDate(selectedDate)}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.dateTimeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons name="time" size={20} color={COLORS.primary} />
                <Text style={styles.dateTimeText}>{formatTime(selectedTime)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Repeat */}
          <View style={styles.section}>
            <Text style={styles.label}>Repeat</Text>
            <View style={styles.repeatOption}>
              <Ionicons name="refresh" size={20} color={COLORS.textMuted} />
              <Text style={styles.repeatText}>Do not repeat</Text>
            </View>
          </View>

          {/* Reminder Type */}
          <View style={styles.section}>
            <Text style={styles.label}>Reminder Type</Text>
            <View style={styles.typeSelector}>
              <Text style={styles.typeText}>{reminderType}</Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.textMuted} />
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.section}>
            <Text style={styles.label}>Notifications</Text>
            <View style={styles.notificationRow}>
              <View style={styles.notificationLeft}>
                <Ionicons name="notifications" size={20} color={COLORS.primary} />
                <Text style={styles.notificationText}>Push Notifications</Text>
              </View>
              <TouchableOpacity 
                style={[styles.toggle, pushEnabled && styles.toggleActive]}
                onPress={() => setPushEnabled(!pushEnabled)}
              >
                <View style={[styles.toggleKnob, pushEnabled && styles.toggleKnobActive]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Eg. Bring affidavit copy, Submit RTI..."
              placeholderTextColor={COLORS.textMuted}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}

        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={(event, time) => {
              setShowTimePicker(false);
              if (time) setSelectedTime(time);
            }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
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
  headerSpacer: {
    width: 44,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  dateTimeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateTimeText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  repeatOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  repeatText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  typeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typeText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.border,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  notesInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    fontSize: 14,
    color: COLORS.textPrimary,
    minHeight: 120,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});

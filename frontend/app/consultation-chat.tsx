import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
  background: '#F0F2F5',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  userBubble: '#DCF8C6',
  lawyerBubble: '#FFFFFF',
  success: '#10B981',
  headerBg: '#128C7E',
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'lawyer';
  timestamp: string;
}

export default function ConsultationChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { bookingId, lawyerId } = params;
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sessionActive, setSessionActive] = useState(true);

  useEffect(() => {
    const lawyerData = getLawyerById(lawyerId as string);
    if (lawyerData) {
      setLawyer(lawyerData);
      // Initial lawyer greeting
      setMessages([{
        id: '1',
        text: `Hello! I'm ${lawyerData.name}. Thank you for consulting with me today. How can I help you with your legal matter?`,
        sender: 'lawyer',
        timestamp: new Date().toISOString(),
      }]);
    }
  }, [lawyerId]);

  const handleSend = () => {
    if (!inputText.trim() || !sessionActive) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // Simulate lawyer response
    setTimeout(() => {
      const responses = [
        'I understand your concern. Could you provide more details about the timeline of events?',
        'Based on what you\'ve shared, I would recommend the following approach...',
        'This is a common situation. Let me explain the legal provisions that apply here.',
        'You have several options available. Let me walk you through each one.',
        'I\'ll need some additional documentation to give you precise advice. Do you have...?',
      ];
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'lawyer',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, response]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1500);
    
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleEndSession = () => {
    Alert.alert(
      'End Consultation',
      'Are you sure you want to end this consultation session?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'End Session', style: 'destructive', onPress: () => {
          setSessionActive(false);
          updateBookingStatus(bookingId as string, 'completed');
          Alert.alert('Session Completed', 'Your consultation has been completed successfully.', [
            { text: 'OK', onPress: () => router.replace('/(tabs)/home') }
          ]);
        }}
      ]
    );
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!lawyer) return null;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerBg} />
      
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <Image source={{ uri: lawyer.image }} style={styles.headerImage} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{lawyer.name}</Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Online • Consultation active</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.endButton} onPress={handleEndSession}>
            <Ionicons name="close-circle" size={28} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView ref={scrollViewRef} style={styles.messagesContainer} contentContainerStyle={styles.messagesContent} showsVerticalScrollIndicator={false}>
          {messages.map((message) => (
            <View key={message.id} style={[styles.messageRow, message.sender === 'user' ? styles.userRow : styles.lawyerRow]}>
              <View style={[styles.messageBubble, message.sender === 'user' ? styles.userBubble : styles.lawyerBubble]}>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTime}>{formatTime(message.timestamp)}</Text>
              </View>
            </View>
          ))}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Input */}
        {sessionActive ? (
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Type your message..."
                placeholderTextColor={COLORS.textSecondary}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={1000}
              />
              <TouchableOpacity style={styles.attachButton}>
                <Ionicons name="attach" size={22} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} onPress={handleSend} disabled={!inputText.trim()}>
              <Ionicons name="send" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.sessionEndedBar}>
            <Text style={styles.sessionEndedText}>Session ended</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.headerBg, paddingTop: 50, paddingBottom: 16, paddingHorizontal: 16 },
  backButton: { padding: 8 },
  headerImage: { width: 44, height: 44, borderRadius: 22, marginHorizontal: 12, borderWidth: 2, borderColor: COLORS.white },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  onlineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ADE80', marginRight: 6 },
  onlineText: { fontSize: 12, color: COLORS.white, opacity: 0.9 },
  endButton: { padding: 4 },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 16 },
  messageRow: { marginBottom: 12 },
  userRow: { alignItems: 'flex-end' },
  lawyerRow: { alignItems: 'flex-start' },
  messageBubble: { maxWidth: '80%', borderRadius: 18, padding: 12, paddingBottom: 8 },
  userBubble: { backgroundColor: COLORS.userBubble, borderBottomRightRadius: 4 },
  lawyerBubble: { backgroundColor: COLORS.lawyerBubble, borderBottomLeftRadius: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  messageText: { fontSize: 15, color: COLORS.textPrimary, lineHeight: 22 },
  messageTime: { fontSize: 11, color: COLORS.textSecondary, alignSelf: 'flex-end', marginTop: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', padding: 12, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  inputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', backgroundColor: COLORS.background, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 8, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: COLORS.textPrimary, maxHeight: 100, paddingVertical: 8 },
  attachButton: { padding: 8 },
  sendButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.headerBg, justifyContent: 'center', alignItems: 'center' },
  sendButtonDisabled: { opacity: 0.5 },
  sessionEndedBar: { padding: 16, backgroundColor: '#FEE2E2', alignItems: 'center' },
  sessionEndedText: { fontSize: 14, fontWeight: '600', color: '#EF4444' },
});
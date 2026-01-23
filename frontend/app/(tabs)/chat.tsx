import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { chatAPI } from '../../utils/api';

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setSessionId(`session_${Date.now()}`);
    setMessages([{
      role: 'assistant',
      content: 'Namaste! 🙏 I am NyayAI, your legal information assistant for India. Ask me anything about laws, rights, or procedures in simple language.\n\n\u26a0️ Remember: I provide general information, not legal advice.',
      timestamp: new Date().toISOString()
    }]);
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { role: 'user', content: inputText, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(inputText, sessionId);
      const aiMessage = { role: 'assistant', content: response.response, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toISOString(), error: true };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const suggestedQuestions = [
    { icon: 'home', q: 'Tenant rights in India?' },
    { icon: 'document-text', q: 'How to file RTI?' },
    { icon: 'cart', q: 'Consumer protection law?' },
    { icon: 'shield-checkmark', q: 'Police complaint process?' }
  ];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={require('../../assets/logo.jpg')} style={styles.logoSmall} resizeMode="contain" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>NyayAI</Text>
            <Text style={styles.headerSubtitle}>Your Legal Assistant</Text>
          </View>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.disclaimer}>
        <Ionicons name="alert-circle" size={16} color={Colors.warning} />
        <Text style={styles.disclaimerText}>General legal information, not personalized advice</Text>
      </View>

      <ScrollView ref={scrollViewRef} style={styles.messagesContainer} contentContainerStyle={styles.messagesContent} showsVerticalScrollIndicator={false}>
        {messages.map((message, index) => (
          <View key={index} style={[styles.messageBubble, message.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            {message.role === 'assistant' && (
              <View style={styles.aiAvatarContainer}>
                <LinearGradient colors={[Colors.primary + '30', Colors.primary + '20']} style={styles.aiAvatar}>
                  <Ionicons name="sparkles" size={16} color={Colors.primary} />
                </LinearGradient>
              </View>
            )}
            <View style={[styles.messageContent, message.role === 'user' ? styles.userContent : styles.aiContent]}>
              <Text style={[styles.messageText, message.role === 'user' ? styles.userText : styles.aiText]}>{message.content}</Text>
              {message.role === 'assistant' && !message.error && index > 0 && (
                <TouchableOpacity style={styles.lawyerCTA} activeOpacity={0.8}>
                  <Ionicons name="people" size={14} color={Colors.primary} />
                  <Text style={styles.lawyerCTAText}>Talk to a Lawyer</Text>
                  <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {messages.length === 1 && (
          <View style={styles.suggestedQuestionsContainer}>
            <Text style={styles.suggestedTitle}>Try asking about:</Text>
            <View style={styles.suggestedGrid}>
              {suggestedQuestions.map((item, index) => (
                <TouchableOpacity key={index} style={styles.suggestedButton} onPress={() => { setInputText(item.q); }} activeOpacity={0.8}>
                  <Ionicons name={item.icon as any} size={20} color={Colors.primary} />
                  <Text style={styles.suggestedText}>{item.q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {loading && (
          <View style={[styles.messageBubble, styles.aiBubble]}>
            <View style={styles.aiAvatarContainer}>
              <LinearGradient colors={[Colors.primary + '30', Colors.primary + '20']} style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={16} color={Colors.primary} />
              </LinearGradient>
            </View>
            <View style={[styles.messageContent, styles.aiContent]}>
              <ActivityIndicator size="small" color={Colors.primary} />
              <Text style={styles.typingText}>Thinking...</Text>
            </View>
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.bottomDisclaimer}>
          <Ionicons name="shield-checkmark-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.bottomDisclaimerText}>General information only. Consult a qualified lawyer for advice.</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.voiceButton}>
            <Ionicons name="mic-outline" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TextInput style={styles.input} placeholder="Ask anything legal..." placeholderTextColor={Colors.gray400} value={inputText} onChangeText={setInputText} multiline maxLength={500} editable={!loading} />
          <TouchableOpacity style={[styles.sendButton, (!inputText.trim() || loading) && styles.sendButtonDisabled]} onPress={handleSend} disabled={!inputText.trim() || loading} activeOpacity={0.8}>
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 16 },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  logoSmall: { width: 48, height: 48, marginRight: 12, borderRadius: 24, backgroundColor: '#FFFFFF' },
  headerTextContainer: { flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.3 },
  headerSubtitle: { fontSize: 13, color: '#FFFFFF', opacity: 0.9, marginTop: 2 },
  infoButton: { padding: 8 },
  disclaimer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: Colors.warning + '15', borderBottomWidth: 1, borderBottomColor: Colors.warning + '20' },
  disclaimerText: { fontSize: 12, color: Colors.text, marginLeft: 8, flex: 1, fontWeight: '600' },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 20 },
  messageBubble: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-start' },
  userBubble: { justifyContent: 'flex-end' },
  aiBubble: { justifyContent: 'flex-start' },
  aiAvatarContainer: { marginRight: 10 },
  aiAvatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  messageContent: { maxWidth: '75%', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  userContent: { backgroundColor: Colors.primary, marginLeft: 'auto' },
  aiContent: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  messageText: { fontSize: 15, lineHeight: 22, letterSpacing: -0.2 },
  userText: { color: '#FFFFFF', fontWeight: '500' },
  aiText: { color: Colors.text },
  typingText: { fontSize: 13, color: Colors.textSecondary, marginLeft: 8, fontStyle: 'italic' },
  lawyerCTA: { flexDirection: 'row', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: Colors.border, gap: 6 },
  lawyerCTAText: { fontSize: 13, fontWeight: '700', color: Colors.primary, letterSpacing: -0.2 },
  suggestedQuestionsContainer: { marginTop: 20 },
  suggestedTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 14, letterSpacing: -0.3 },
  suggestedGrid: { gap: 10 },
  suggestedButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderWidth: 2, borderColor: Colors.border, borderRadius: 14, padding: 14, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  suggestedText: { fontSize: 14, color: Colors.text, fontWeight: '600', flex: 1 },
  inputContainer: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border },
  bottomDisclaimer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray100, padding: 10, borderRadius: 10, marginBottom: 12 },
  bottomDisclaimerText: { fontSize: 11, color: Colors.textSecondary, marginLeft: 6, flex: 1, lineHeight: 16 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, borderRadius: 24, paddingHorizontal: 12, paddingVertical: 4, borderWidth: 2, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  voiceButton: { padding: 8 },
  input: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 15, color: Colors.text, maxHeight: 100, fontWeight: '500' },
  sendButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', shadowColor: Colors.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 },
  sendButtonDisabled: { opacity: 0.5 },
});

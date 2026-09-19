import React, { useState, useEffect, useRef } from 'react';
import {
  View, StyleSheet, TouchableOpacity, StatusBar, ScrollView,
  TextInput, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../components/Typography';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Markdown from 'react-native-markdown-display';
import { callGroqChatAPI } from '../services/groqClient';
import { mockPlaces } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

// Build a compact place directory for the system prompt
// Format: "Place Name (slug: place-slug, type: temple)"
const PLACES_DIRECTORY = mockPlaces
  .map(p => `${p.name?.en} (slug: ${p.slug}, type: ${p.placeType}, district: ${p.districtId})`)
  .join('\n');

const buildSystemPrompt = (language: string) => `You are a friendly Bihar tourism guide AI inside the "Bihar Explorer" app.

IMPORTANT RULES:
1. You ONLY recommend places that exist in the app's database below. Do not invent or suggest places not in this list.
2. When recommending a place, ALWAYS format it as a markdown link: [Place Name](/place/slug) — this opens the place in the app.
3. Write in a warm, conversational chat style. NO tables. Use bullet points (•) or numbered lists.
4. Keep responses under 150 words. Be concise, warm and inspiring.
5. Never use <br> tags. Use proper newlines only.
6. RESPOND IN ${language === 'hi' ? 'HINDI' : 'ENGLISH'}, as the user prefers this language.

AVAILABLE PLACES IN THE APP:
${PLACES_DIRECTORY}`;

// Clean raw AI response — strip HTML tags like <br>, <br/> etc
const cleanResponse = (text: string): string =>
  text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .trim();

type Message = { role: 'user' | 'assistant'; content: string };

export default function AiPlannerScreen() {
  const { colors: theme, theme: themeMode } = useTheme();
  const router = useRouter();
  const { language } = useLanguage();
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Set initial greeting based on language
    setMessages([{ role: 'assistant', content: t('aiGreeting', language) as string }]);
  }, [language]);

  const QUICK_PROMPTS = t('aiPrompts', language) as string[];

  const scrollToBottom = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  useEffect(() => { scrollToBottom(); }, [messages]);

  const getApiKey = async () => {
    const stored = await AsyncStorage.getItem('ds_groq_api_key');
    return stored?.trim() || process.env.EXPO_PUBLIC_GROQ_API_KEY?.trim() || '';
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setInputText('');
    setSending(true);

    const userMsg: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    try {
      const apiKey = await getApiKey();
      if (!apiKey || !apiKey.startsWith('gsk_')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: t('aiApiKeyRequired', language) as string
        }]);
        setSending(false);
        return;
      }

      const chatMessages = [
        { role: 'system' as const, content: buildSystemPrompt(language) },
        ...updatedMessages.slice(-10).map(m => ({ role: m.role, content: m.content })),
      ];

      const rawReply = await callGroqChatAPI(chatMessages, apiKey);
      const reply = cleanResponse(rawReply);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error: any) {
      console.warn('AI Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Oops! Something went wrong.\n\nError: ${error.message}`
      }]);
    } finally {
      setSending(false);
    }
  };

  const isDark = themeMode === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border, backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Typography variant="semiBold" style={[styles.headerTitle, { color: theme.text }]}>
            {t('aiPlannerTitle', language)}
          </Typography>
          <Typography variant="regular" style={{ color: theme.textSecondary, fontSize: 12 }}>
            {t('aiPlannerSubtitle', language)}
          </Typography>
        </View>
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.iconBtn}>
          <Ionicons name="settings-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Quick Prompts */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.quickBar, { borderBottomColor: theme.border }]}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8, alignItems: 'center', paddingVertical: 8 }}
      >
        {QUICK_PROMPTS.map((p, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.chip, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
            onPress={() => sendMessage(p)}
          >
            <Ionicons name="sparkles" size={12} color={theme.primary} style={{ marginRight: 4 }} />
            <Typography variant="medium" style={{ color: theme.primary, fontSize: 13 }}>{p}</Typography>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={styles.chatScroll}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((m, i) => {
            const isAI = m.role === 'assistant';
            return (
              <View key={i} style={[styles.messageRow, isAI ? styles.aiRow : styles.userRow]}>
                {isAI && (
                  <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
                    <Ionicons name="sparkles" size={14} color="#FFF" />
                  </View>
                )}
                <View style={[styles.bubble, isAI
                  ? { backgroundColor: theme.cardBackground, borderColor: theme.border, borderTopLeftRadius: 4 }
                  : { backgroundColor: theme.primary, borderTopRightRadius: 4 }
                ]}>
                  {isAI ? (
                    <Markdown
                      style={{
                        body: { color: theme.text, fontFamily: 'Poppins_400Regular', fontSize: 14, lineHeight: 22 },
                        strong: { color: theme.text },
                        link: { color: theme.primary },
                        bullet_list: { color: theme.text },
                        list_item: { color: theme.text, marginBottom: 4 },
                      }}
                      onLinkPress={(url) => {
                        // Internal app links like /place/slug navigate in-app
                        if (url.startsWith('/')) {
                          router.push(url as any);
                          return false;
                        }
                        return true; // external links open in browser
                      }}
                    >
                      {m.content}
                    </Markdown>
                  ) : (
                    <Typography variant="regular" style={{ color: '#FFF', fontSize: 14, lineHeight: 20 }}>
                      {m.content}
                    </Typography>
                  )}
                </View>
                {!isAI && (
                  <View style={[styles.avatar, { backgroundColor: theme.border }]}>
                    <Ionicons name="person" size={14} color={theme.text} />
                  </View>
                )}
              </View>
            );
          })}

          {sending && (
            <View style={[styles.messageRow, styles.aiRow]}>
              <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
                <Ionicons name="sparkles" size={14} color="#FFF" />
              </View>
              <View style={[styles.bubble, { backgroundColor: theme.cardBackground, borderColor: theme.border, borderTopLeftRadius: 4 }]}>
                <ActivityIndicator size="small" color={theme.primary} />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom Bar — input first, disclaimer below it */}
        <View style={[styles.bottomBar, { borderTopColor: theme.border, backgroundColor: theme.cardBackground }]}>

          {/* Input Row */}
          <View style={styles.inputRow}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about Bihar..."
              placeholderTextColor={theme.textSecondary}
              style={[styles.textInput, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
              onSubmitEditing={() => sendMessage(inputText)}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[styles.sendBtn, { backgroundColor: inputText.trim() ? theme.primary : theme.border }]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim() || sending}
            >
              <Ionicons name="send" size={18} color={inputText.trim() ? '#FFF' : theme.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* AI Disclaimer — BELOW the input box */}
          <Typography variant="regular" style={[styles.disclaimerText, { color: theme.textSecondary }]}>
            AI can make mistakes. Always verify important travel info.
          </Typography>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 18 },
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  quickBar: { borderBottomWidth: 1, flexGrow: 0 },
  chip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, borderWidth: 1,
  },
  chatScroll: { padding: 16, paddingBottom: 20 },
  messageRow: { flexDirection: 'row', marginBottom: 16, maxWidth: '85%', gap: 8 },
  aiRow: { alignSelf: 'flex-start' },
  userRow: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  avatar: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginTop: 2,
  },
  bubble: { flex: 1, padding: 12, borderRadius: 18, borderWidth: 1 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingBottom: 8, gap: 10,
  },
  textInput: {
    flex: 1, height: 46, borderWidth: 1, borderRadius: 23,
    paddingHorizontal: 16, fontSize: 14,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
  },
  bottomBar: {
    borderTopWidth: 1,
    paddingTop: 6,
  },
  disclaimerText: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
});

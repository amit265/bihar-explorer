import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, Linking, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../components/Typography';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STEPS = [
  { n: '1', text: 'Go to console.groq.com and create a free account.' },
  { n: '2', text: 'Click "API Keys" in the left sidebar.' },
  { n: '3', text: 'Click "Create API Key", give it a name, and copy it.' },
  { n: '4', text: 'Paste your key in the field below and tap Save.' },
];

export default function SettingsScreen() {
  const { colors: theme, theme: themeMode } = useTheme();
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('ds_groq_api_key').then(val => {
      if (val) setApiKey(val);
    });
  }, []);

  const saveKey = async () => {
    await AsyncStorage.setItem('ds_groq_api_key', apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const clearKey = async () => {
    setApiKey('');
    await AsyncStorage.removeItem('ds_groq_api_key');
  };

  const isDark = themeMode === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.surface }]} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.border, backgroundColor: theme.cardBackground }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Typography variant="semiBold" style={[styles.title, { color: theme.text }]}>Settings</Typography>
            <Typography variant="regular" style={{ color: theme.textSecondary, fontSize: 12 }}>AI Journey Planner</Typography>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>

          {/* WHY SECTION */}
          <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconCircle, { backgroundColor: theme.primary + '20' }]}>
                <Ionicons name="sparkles" size={20} color={theme.primary} />
              </View>
              <Typography variant="semiBold" style={[styles.cardTitle, { color: theme.text }]}>
                Groq AI Integration
              </Typography>
            </View>
            <Typography variant="regular" style={[styles.desc, { color: theme.textSecondary }]}>
              The AI Journey Planner uses Groq&apos;s free API to give you personalised Bihar travel recommendations. Your key is stored only on your device — we never see it.
            </Typography>
          </View>

          {/* HOW TO GET A KEY */}
          <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <Typography variant="semiBold" style={[styles.cardTitle, { color: theme.text, marginBottom: 16 }]}>
              How to get your free API key
            </Typography>

            {STEPS.map(step => (
              <View key={step.n} style={styles.stepRow}>
                <View style={[styles.stepBadge, { backgroundColor: theme.primary }]}>
                  <Typography variant="semiBold" style={{ color: '#FFF', fontSize: 12 }}>{step.n}</Typography>
                </View>
                <Typography variant="regular" style={[styles.stepText, { color: theme.text }]}>
                  {step.text}
                </Typography>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.openBtn, { backgroundColor: theme.surface }]}
              onPress={() => Linking.openURL('https://console.groq.com/keys')}
            >
              <Ionicons name="open-outline" size={16} color={theme.primary} />
              <Typography variant="medium" style={{ color: theme.primary, marginLeft: 8 }}>
                Open console.groq.com
              </Typography>
            </TouchableOpacity>
          </View>

          {/* ENTER KEY */}
          <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconCircle, { backgroundColor: theme.primary + '20' }]}>
                <Ionicons name="key-outline" size={20} color={theme.primary} />
              </View>
              <Typography variant="semiBold" style={[styles.cardTitle, { color: theme.text }]}>
                Your API Key
              </Typography>
            </View>

            {saved && (
              <View style={[styles.successBanner, { backgroundColor: '#4CAF5020' }]}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Typography variant="medium" style={{ color: '#4CAF50', marginLeft: 6 }}>
                  API Key saved successfully!
                </Typography>
              </View>
            )}

            <View style={[styles.inputWrapper, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="gsk_..."
                placeholderTextColor={theme.textSecondary}
                value={apiKey}
                onChangeText={setApiKey}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!showKey}
              />
              <TouchableOpacity onPress={() => setShowKey(!showKey)} style={{ padding: 4 }}>
                <Ionicons name={showKey ? 'eye-off-outline' : 'eye-outline'} size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: saved ? '#4CAF50' : theme.primary, flex: 1 }]}
                onPress={saveKey}
              >
                <Typography variant="semiBold" style={{ color: '#FFF' }}>
                  {saved ? '✓ Saved!' : 'Save API Key'}
                </Typography>
              </TouchableOpacity>
              {apiKey.length > 0 && (
                <TouchableOpacity
                  style={[styles.clearBtn, { borderColor: theme.border }]}
                  onPress={clearKey}
                >
                  <Typography variant="medium" style={{ color: theme.textSecondary }}>Clear</Typography>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* PRIVACY NOTE */}
          <View style={[styles.privacyBox, { backgroundColor: theme.cardBackground }]}>
            <Ionicons name="shield-checkmark-outline" size={18} color={theme.primary} />
            <Typography variant="regular" style={[styles.privacyText, { color: theme.textSecondary }]}>
              Your API key is stored locally on your device using AsyncStorage and is never transmitted to our servers.
            </Typography>
          </View>

        </ScrollView>
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
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18 },
  content: { padding: 16, gap: 16, paddingBottom: 60 },
  card: { padding: 20, borderRadius: 20, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 16, marginLeft: 12 },
  desc: { fontSize: 14, lineHeight: 22 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  stepBadge: {
    width: 24, height: 24, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 1,
  },
  stepText: { flex: 1, fontSize: 14, lineHeight: 20 },
  openBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 12, borderRadius: 12, marginTop: 8,
  },
  successBanner: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, borderRadius: 8, marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderRadius: 12, paddingHorizontal: 16,
    paddingVertical: 4, marginBottom: 16,
  },
  input: { flex: 1, height: 46, fontSize: 15 },
  btnRow: { flexDirection: 'row', gap: 10 },
  saveBtn: { padding: 14, borderRadius: 12, alignItems: 'center' },
  clearBtn: {
    padding: 14, borderRadius: 12, alignItems: 'center',
    justifyContent: 'center', borderWidth: 1, paddingHorizontal: 20,
  },
  privacyBox: {
    flexDirection: 'row', alignItems: 'flex-start',
    padding: 16, borderRadius: 16, gap: 10,
  },
  privacyText: { flex: 1, fontSize: 13, lineHeight: 18 },
});

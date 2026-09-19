import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function KnowledgeDashboardScreen() {
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Typography variant="semiBold" style={[styles.headerTitle, { color: theme.text }]}>
          {language === 'hi' ? 'अपना ज्ञान परखें' : 'Test Your Knowledge'}
        </Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Intro */}
        <Typography style={{fontSize: 16, color: theme.textSecondary, marginBottom: 32, lineHeight: 24}}>
          {language === 'hi' 
            ? 'बिहार के बारे में अपने ज्ञान का परीक्षण करने के लिए एक मोड चुनें।' 
            : 'Choose a mode to test your knowledge about Bihar.'}
        </Typography>

        {/* Quiz Card */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
          activeOpacity={0.7}
          onPress={() => router.push('/knowledge/quiz-play' as any)}
        >
          <View style={[styles.iconWrapper, { backgroundColor: theme.primary + '15' }]}>
            <Ionicons name="school" size={32} color={theme.primary} />
          </View>
          <View style={styles.cardContent}>
            <Typography variant="semiBold" style={[styles.cardTitle, { color: theme.text }]}>
              {language === 'hi' ? 'क्विज़ लें' : 'Take a Quiz'}
            </Typography>
            <Typography style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
              {language === 'hi' ? '10 बहुविकल्पीय प्रश्नों के साथ खुद को चुनौती दें।' : 'Challenge yourself with 10 multiple choice questions.'}
            </Typography>
          </View>
          <Ionicons name="chevron-forward" size={24} color={theme.primary} />
        </TouchableOpacity>

        {/* Flashcards Card */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
          activeOpacity={0.7}
          onPress={() => router.push('/knowledge/flashcards' as any)}
        >
          <View style={[styles.iconWrapper, { backgroundColor: theme.primary + '15' }]}>
            <Ionicons name="copy-outline" size={32} color={theme.primary} />
          </View>
          <View style={styles.cardContent}>
            <Typography variant="semiBold" style={[styles.cardTitle, { color: theme.text }]}>
              {language === 'hi' ? 'फ्लैशकार्ड' : 'Study Flashcards'}
            </Typography>
            <Typography style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
              {language === 'hi' ? 'इंटरएक्टिव 3D कार्ड का उपयोग करके महत्वपूर्ण तथ्यों को याद करें।' : 'Memorize important facts using interactive 3D cards.'}
            </Typography>
          </View>
          <Ionicons name="chevron-forward" size={24} color={theme.primary} />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  backBtn: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  }
});

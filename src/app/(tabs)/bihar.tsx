import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const KNOWLEDGE_SECTIONS = [
  { id: 'basics', icon: '✨', titleEn: 'Bihar at a Glance', titleHi: 'एक नज़र में बिहार' },
  { id: 'history', icon: '🏺', titleEn: 'History', titleHi: 'इतिहास' },
  { id: 'geography', icon: '🗺️', titleEn: 'Geography', titleHi: 'भूगोल' },
  { id: 'polity', icon: '🏛️', titleEn: 'Polity', titleHi: 'राजव्यवस्था' },
  { id: 'economy', icon: '📈', titleEn: 'Economy', titleHi: 'अर्थव्यवस्था' },
  { id: 'society', icon: '👥', titleEn: 'Society', titleHi: 'समाज' },
  { id: 'culture', icon: '🎨', titleEn: 'Art & Culture', titleHi: 'कला और संस्कृति' },
  { id: 'environment', icon: '🌿', titleEn: 'Environment', titleHi: 'पर्यावरण' },
  { id: 'districts', icon: '📍', titleEn: 'Districts', titleHi: 'जिले' },
  { id: 'people', icon: '👤', titleEn: 'Personalities', titleHi: 'प्रमुख व्यक्तित्व' },
  { id: 'institutions', icon: '🏫', titleEn: 'Institutions', titleHi: 'संस्थान' },
  { id: 'development', icon: '📈', titleEn: 'Development', titleHi: 'विकास' },
];

export default function BiharKnowledgeScreen() {
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="semiBold" style={[styles.title, { color: theme.text }]}>
            {t('themesTrails', language)}
          </Typography>
          <Typography variant="regular" style={[styles.subtitle, { color: theme.textSecondary }]}>
            {t('themesSubtitle', language)}
          </Typography>
        </View>

        {/* Gamification Banner */}
        <TouchableOpacity 
          style={[styles.quizBanner, { backgroundColor: theme.secondary }]} 
          activeOpacity={0.9} 
          onPress={() => router.push('/knowledge/quiz' as any)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <Typography style={{ fontSize: 36, marginRight: 12 }}>📝</Typography>
             <View style={{ flex: 1 }}>
                <Typography variant="semiBold" style={[styles.quizTitle, { color: '#FFF' }]}>
                  {t('quizTitle', language)}
                </Typography>
                <Typography variant="medium" style={[styles.quizSubtitle, { color: '#FFF' }]}>
                  {t('quizSubtitle', language)}
                </Typography>
             </View>
          </View>
        </TouchableOpacity>

        {/* Categories Grid */}
        <View style={styles.grid}>
          {KNOWLEDGE_SECTIONS.map((section) => (
            <TouchableOpacity 
              key={section.id}
              style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
              activeOpacity={0.7}
              onPress={() => {
                router.push(`/knowledge/${section.id}` as any);
              }}
            >
              <Typography style={styles.cardIcon}>{section.icon}</Typography>
              <Typography variant="semiBold" style={[styles.cardTitle, { color: theme.text }]}>
                {language === 'hi' ? section.titleHi : section.titleEn}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 48,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quizBanner: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  quizTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  quizSubtitle: {
    fontSize: 14,
    opacity: 0.9,
    lineHeight: 20,
  },
  card: {
    flexBasis: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    textAlign: 'center',
  },
});

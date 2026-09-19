import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Typography } from '../components/Typography';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockPlaces } from '../data';
import { Place } from '../types/place';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

const FAVORITES_KEY = '@bihar_explorer_favorites';

export default function SavedScreen() {
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, [])
  );

  const loadSaved = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const savedIds: string[] = JSON.parse(stored);
        const filtered = mockPlaces.filter((p: Place) => savedIds.includes(p.id));
        setSavedPlaces(filtered);
      } else {
        setSavedPlaces([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeSaved = async (id: string) => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      let savedIds: string[] = stored ? JSON.parse(stored) : [];
      savedIds = savedIds.filter((savedId) => savedId !== id);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(savedIds));
      setSavedPlaces((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View>
          <Typography variant="semiBold" style={[styles.title, { color: theme.text }]}>{t('savedPlaces', language)}</Typography>
          <Typography style={[styles.subtitle, { color: theme.textSecondary }]}>{t('savedSubtitle', language)}</Typography>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {savedPlaces.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark-outline" size={64} color={theme.border} />
            <Typography variant="semiBold" style={[styles.emptyStateTitle, { color: theme.text }]}>{t('noSavedPlaces', language)}</Typography>
            <Typography style={[styles.emptyStateSub, { color: theme.textSecondary }]}>
              {t('noSavedSub', language)}
            </Typography>
            <TouchableOpacity 
              style={[styles.exploreBtn, { backgroundColor: theme.navigationBackground }]}
              onPress={() => router.push('/(tabs)/explore' as any)}
            >
              <Typography variant="medium" style={[styles.exploreBtnText, { color: theme.textWhite }]}>{t('exploreBihar', language)}</Typography>
            </TouchableOpacity>
          </View>
        ) : (
          savedPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
              onPress={() =>
                router.push({
                  pathname: '/place/[slug]',
                  params: { slug: place.slug },
                } as any)
              }
              activeOpacity={0.8}
            >
              <View style={[styles.cardImagePlaceholder, { backgroundColor: theme.border }]} />
              <View style={styles.cardContent}>
                <Typography variant="semiBold" style={[styles.cardTitle, { color: theme.text }]}>{place.name[language] || place.name.hi}</Typography>
                <Typography style={[styles.cardSubtitle, { color: theme.textSecondary }]} numberOfLines={2}>
                  {place.shortDescription[language] || place.shortDescription.hi}
                </Typography>
                <View style={styles.cardFooter}>
                  <Typography variant="medium" style={[styles.categoryBadge, { color: theme.primary }]}>
                    {place.categories[0]}
                  </Typography>
                </View>
              </View>
              <TouchableOpacity onPress={() => removeSaved(place.id)} style={{ padding: 8 }}>
                <Ionicons name="trash-outline" size={20} color={theme.error} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 16,
    paddingTop: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  title: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  content: { padding: 16, paddingBottom: 130 },
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 60, paddingHorizontal: 20 },
  emptyStateTitle: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSub: { fontSize: 13, textAlign: 'center', marginTop: 6, lineHeight: 18 },
  exploreBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  exploreBtnText: { fontSize: 14 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 1,
  },
  cardImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 17 },
  cardSubtitle: { fontSize: 12, marginTop: 2 },
  cardFooter: { marginTop: 6 },
  categoryBadge: {
    fontSize: 12,
  },
});

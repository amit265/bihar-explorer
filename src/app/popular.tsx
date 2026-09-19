import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, ImageBackground, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Typography } from '../components/Typography';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { mockPlaces, getDistrictName } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

export default function PopularPlacesScreen() {
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const getLocalized = (obj: any) => obj ? (obj[language] || obj.en) : null;

  const popularPlaces = mockPlaces
    .filter(p => p.discoveryFlags?.featured)
    .filter(p => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        getLocalized(p.name)?.toLowerCase().includes(q) ||
        getLocalized(p.shortDescription)?.toLowerCase().includes(q) ||
        getDistrictName(p.districtId)?.toLowerCase().includes(q)
      );
    });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.surface }]} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Typography variant="semiBold" style={[styles.title, { color: theme.text }]}>
          {language === 'hi' ? 'लोकप्रिय स्थान' : 'Popular Places'}
        </Typography>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
        <Ionicons name="search" size={18} color={theme.textSecondary} style={{ marginRight: 8 }} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder={language === 'hi' ? 'स्थान खोजें...' : 'Search places...'}
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Count */}
      <Typography variant="regular" style={[styles.count, { color: theme.textSecondary }]}>
        {popularPlaces.length} {t('places', language)}
      </Typography>

      <FlashList
        data={popularPlaces}
        keyExtractor={(item) => item.id}
        // @ts-ignore
        estimatedItemSize={115}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: place }) => (
          <TouchableOpacity
            style={[styles.placeCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
            activeOpacity={0.8}
            onPress={() => router.push(`/place/${place.slug}` as any)}
          >
            {place.heroImage ? (
              <ImageBackground source={{ uri: place.heroImage }} style={styles.placeImage} imageStyle={{ borderRadius: 8 }} />
            ) : (
              <View style={[styles.placeImage, { backgroundColor: theme.border, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }]}>
                <Ionicons name="image-outline" size={24} color={theme.textSecondary} />
              </View>
            )}
            <View style={styles.placeInfo}>
              <Typography variant="semiBold" numberOfLines={2} style={[styles.placeTitle, { color: theme.text }]}>
                {getLocalized(place.name)}
              </Typography>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Ionicons name="location" size={12} color={theme.textSecondary} />
                <Typography variant="medium" numberOfLines={1} style={[styles.placeDistrict, { color: theme.textSecondary, marginLeft: 2 }]}>
                  {getDistrictName(place.districtId)}
                </Typography>
              </View>
              {place.shortDescription && (
                <Typography variant="regular" numberOfLines={2} style={[styles.placeDesc, { color: theme.textSecondary, marginTop: 4 }]}>
                  {getLocalized(place.shortDescription)}
                </Typography>
              )}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color={theme.textSecondary} />
            <Typography variant="medium" style={[styles.emptyText, { color: theme.textSecondary }]}>No places found</Typography>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  title: { fontSize: 20 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    marginHorizontal: 16, marginBottom: 8, borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 15 },
  count: { fontSize: 13, marginHorizontal: 16, marginBottom: 8 },
  listContent: { paddingHorizontal: 16, paddingBottom: 100 },
  placeCard: {
    flexDirection: 'row', padding: 12, borderRadius: 12,
    marginBottom: 12, borderWidth: 1,
  },
  placeImage: { width: 90, height: 90, borderRadius: 8 },
  placeInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  placeTitle: { fontSize: 16 },
  placeDistrict: { fontSize: 13 },
  placeDesc: { fontSize: 12 },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 16 },
});

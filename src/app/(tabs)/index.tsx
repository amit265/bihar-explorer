import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ImageBackground,
  Image
} from 'react-native';
import { Typography } from '../../components/Typography';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { mockDistricts, mockPlaces } from '../../data';
import { UnifiedSearchResults } from '../../components/UnifiedSearchResults';
import { InteractiveBiharMap } from '../../components/InteractiveBiharMap';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Platform } from 'react-native';
import { FallbackImage, FallbackImageBackground } from '../../components/FallbackImage';
import { APP_LINKS } from '../../constants/links';

// Curated Data
const TOP_DISTRICTS = mockDistricts.slice(0, 5); // Just take first 5 for now
const TOP_PLACES = mockPlaces.filter(p => p.discoveryFlags?.featured).slice(0, 5);
const WEEKEND_GETAWAYS = mockPlaces.filter(p => p.discoveryFlags?.weekendTrip).slice(0, 5);

const CIRCUITS = [
  { id: 'buddhist', name: { en: 'Buddhist Circuit', hi: 'बौद्ध परिपथ' }, color: '#FF9800' },
  { id: 'ramayana', name: { en: 'Ramayana Circuit', hi: 'रामायण परिपथ' }, color: '#E91E63' },
  { id: 'sufi', name: { en: 'Sufi Circuit', hi: 'सूफी परिपथ' }, color: '#9C27B0' },
  { id: 'jain', name: { en: 'Jain Circuit', hi: 'जैन परिपथ' }, color: '#FFC107' },
  { id: 'sikh', name: { en: 'Sikh Circuit', hi: 'सिख परिपथ' }, color: '#03A9F4' },
  { id: 'eco', name: { en: 'Eco Circuit', hi: 'इको परिपथ' }, color: '#4CAF50' },
];

const VIBES = [
  { id: 'waterfalls', name: { en: 'Chasing Waterfalls', hi: 'जलप्रपात' }, color: '#00BCD4', icon: 'water' },
  { id: 'mountains', name: { en: 'Mountain Escapes', hi: 'पहाड़ी वादियां' }, color: '#8BC34A', icon: 'image' },
  { id: 'wildlife', name: { en: 'Wildlife & Nature', hi: 'वन्यजीव और प्रकृति' }, color: '#4CAF50', icon: 'paw' },
  { id: 'hidden_gems', name: { en: 'Hidden Gems', hi: 'अनदेखी जगहें' }, color: '#9C27B0', icon: 'diamond' },
  { id: 'photography', name: { en: 'Insta\nWorthy', hi: 'फोटोग्राफी' }, color: '#FF4081', icon: 'camera' },
];


export default function HomeScreen() {
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const getLocalized = (obj: any) => obj ? (obj[language] || obj.en) : '';

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(themeMode === 'dark' ? 'light-content' : 'dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(theme.surface);
        StatusBar.setTranslucent(false);
      }
    }, [themeMode, theme.surface])
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="semiBold" style={[styles.title, { color: theme.text }]}>{t('appTitle', language)}</Typography>
            <Typography variant="medium" style={[styles.subtitle, { color: theme.textSecondary }]}>{t('homeSubtitle', language)}</Typography>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => router.push('/saved' as any)} style={[styles.headerIconBtn, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
              <Ionicons name="bookmark" size={20} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleLanguage} style={[styles.langToggle, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
              <Typography variant="semiBold" style={[styles.langToggleText, { color: theme.primary }]}>{language === 'hi' ? 'A' : 'अ'}</Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={[styles.searchBarContainer, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
          <Ionicons name="search" size={18} color={theme.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder={t('searchPlaces', language)}
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {searchQuery.length > 0 ? (
          <UnifiedSearchResults query={searchQuery} />
        ) : (
          <View>
            {/* Interactive Map replacing old Explore Banner */}
            <View style={{ marginBottom: 24, marginTop: 12 }}>
              <InteractiveBiharMap />
            </View>

            {/* AI Journey Planner Promo */}
            <TouchableOpacity 
              style={[styles.exploreBanner, { backgroundColor: theme.primary, marginBottom: 24 }]} 
              activeOpacity={0.9} 
              onPress={() => router.push('/ai-planner' as any)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="sparkles" size={28} color={theme.onPrimary} style={{ marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                  <Typography variant="semiBold" style={[styles.bannerTitle, { color: theme.onPrimary }]}>{t('aiPlannerTitle', language)}</Typography>
                  <Typography variant="regular" style={[styles.bannerSubtitle, { color: theme.onPrimary }]}>{t('aiPlannerSubtitle', language)}</Typography>
                </View>
                <Ionicons name="arrow-forward" size={20} color={theme.onPrimary} />
              </View>
            </TouchableOpacity>

            {/* Must Visit Places (Top 5) */}
            <View style={styles.sectionHeader}>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>
                {t('popularPlaces', language)}
              </Typography>
              <TouchableOpacity onPress={() => router.push('/popular' as any)}>
                <Typography variant="medium" style={{ color: theme.primary }}>{t('viewAll', language)}</Typography>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={styles.horizontalScroll}>
              {TOP_PLACES.map(place => (
                <TouchableOpacity 
                  key={place.id} 
                  style={[styles.placeCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]} 
                  activeOpacity={0.8}
                  onPress={() => router.push(`/place/${place.slug}` as any)}
                >
                  {/* Hero Image or Placeholder */}
                  <FallbackImageBackground 
                    sourceUri={place.heroImage} 
                    style={styles.cardImagePlaceholder} 
                    imageStyle={{ borderTopLeftRadius: 11, borderTopRightRadius: 11 }}
                    fallbackIcon="image-outline"
                  />
                  
                  <View style={{ padding: 10 }}>
                    <Typography variant="semiBold" style={[styles.cardTitle, { color: theme.text }]} numberOfLines={2}>{getLocalized(place.name)}</Typography>
                    <Typography variant="regular" style={[styles.cardSubtitle, { color: theme.textSecondary }]} numberOfLines={1}>{getLocalized(place.shortDescription)}</Typography>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Top Districts (Top 5) */}
            <View style={[styles.sectionHeader, { marginTop: 8 }]}>
            <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>{t('exploreByDistrict', language)}</Typography>
            <TouchableOpacity onPress={() => router.push('/all-districts' as any)}>
               <Typography variant="medium" style={{ color: theme.primary, fontSize: 14 }}>{t('viewAll', language)}</Typography>
            </TouchableOpacity>
          </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={styles.horizontalScroll}>
              {TOP_DISTRICTS.map(district => (
                <TouchableOpacity 
                  key={district.id} 
                  style={[styles.districtCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]} 
                  activeOpacity={0.8}
                  onPress={() => router.push(`/district/${district.slug}` as any)}
                >
                  <FallbackImageBackground 
                    sourceUri={district.heroImage} 
                    style={styles.cardImagePlaceholder} 
                    imageStyle={{ borderTopLeftRadius: 11, borderTopRightRadius: 11 }}
                    fallbackIcon="map-outline"
                  />
                  <View style={{ padding: 10 }}>
                    <Typography variant="semiBold" style={[styles.cardTitle, { color: theme.text }]} numberOfLines={2}>{getLocalized(district.name)}</Typography>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Circuits (Grid) */}
            <View style={styles.sectionHeader}>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>{language === 'hi' ? 'परिपथ (सर्किट) द्वारा खोजें' : 'Explore by Circuit'}</Typography>
            </View>
            <View style={styles.circuitGrid}>
              {CIRCUITS.map(circuit => (
                <TouchableOpacity 
                   key={circuit.id}
                   style={[styles.circuitBtn, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
                   activeOpacity={0.8}
                   onPress={() => {
                     router.push(`/circuit/${circuit.id}` as any)
                   }}
                >
                  <View style={[styles.circuitImageWrapper, { backgroundColor: circuit.color + '15' }]}>
                    <FallbackImage 
                      sourceUri={`${APP_LINKS.assetBaseUrl}/ui/circuits/circuit_${circuit.id}.webp`}
                      style={styles.circuitImage}
                      resizeMode="contain"
                      fallbackIcon="map-outline"
                      fallbackColor={circuit.color}
                    />
                  </View>
                  <Typography variant="semiBold" style={[styles.circuitBtnText, { color: theme.text }]}>{getLocalized(circuit.name)}</Typography>
                </TouchableOpacity>
              ))}
            </View>

            {/* Trending Vibes */}
            <View style={[styles.sectionHeader, { marginTop: 24 }]}>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>{language === 'hi' ? 'ट्रेंडिंग वाइब्स' : 'Trending Vibes'}</Typography>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={styles.horizontalScroll}>
              {VIBES.map(vibe => (
                <TouchableOpacity 
                  key={vibe.id} 
                  activeOpacity={0.8}
                  onPress={() => router.push(`/category/${vibe.id}` as any)}
                >
                  <FallbackImageBackground
                    sourceUri={`${APP_LINKS.assetBaseUrl}/ui/categories/${vibe.id}.webp`}
                    style={[styles.vibeCard, { backgroundColor: vibe.color }]}
                    imageStyle={{ borderRadius: 16, opacity: 0.6 }}
                    fallbackIcon={vibe.icon as any}
                    fallbackColor="#FFF"
                  >
                    <Typography variant="semiBold" style={[styles.vibeTitle, { color: '#FFF' }]} numberOfLines={2}>{getLocalized(vibe.name)}</Typography>
                  </FallbackImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Weekend Getaways */}
            {WEEKEND_GETAWAYS.length > 0 && (
              <>
                <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                  <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>{language === 'hi' ? 'वीकेंड गेटअवे' : 'Weekend Getaways'}</Typography>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={styles.horizontalScroll}>
                  {WEEKEND_GETAWAYS.map(place => (
                    <TouchableOpacity 
                      key={place.id} 
                      style={[styles.placeCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]} 
                      activeOpacity={0.8}
                      onPress={() => router.push(`/place/${place.slug}` as any)}
                    >
                      <FallbackImageBackground 
                        sourceUri={place.heroImage} 
                        style={styles.cardImagePlaceholder} 
                        imageStyle={{ borderTopLeftRadius: 11, borderTopRightRadius: 11 }}
                        fallbackIcon="image-outline"
                      />
                      <View style={{ padding: 10 }}>
                        <Typography variant="semiBold" style={[styles.cardTitle, { color: theme.text }]} numberOfLines={2}>{getLocalized(place.name)}</Typography>
                        <Typography variant="regular" style={[styles.cardSubtitle, { color: theme.textSecondary }]} numberOfLines={1}>{getLocalized(place.shortDescription)}</Typography>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

          </View>
        )}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  langToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  langToggleText: {
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  exploreBanner: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    height: 120,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 22,
  },
  bannerSubtitle: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalScroll: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  placeCard: {
    width: 220,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 16,
    overflow: 'hidden',
  },
  districtCard: {
    width: 150,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 16,
    overflow: 'hidden',
  },
  cardImagePlaceholder: {
    height: 120,
    width: '100%',
  },
  cardTitle: {
    fontSize: 13,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
  },
  circuitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  circuitBtn: {
    flex: 1,
    minWidth: 150,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circuitImageWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circuitImage: {
    width: 52,
    height: 52,
  },
  circuitBtnText: {
    fontSize: 14,
    textAlign: 'center',
  },
  vibeCard: {
    width: 140,
    height: 140,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vibeTitle: {
    fontSize: 16,
    lineHeight: 22,
  }
});

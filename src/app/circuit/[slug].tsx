import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { FallbackImageBackground } from '../../components/FallbackImage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme/ThemeContext';
import { mockPlaces, mockDistricts } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const CIRCUITS = {
  'buddhist': { name: { en: 'Buddhist Circuit', hi: 'बौद्ध परिपथ' }, desc: { en: 'Trace the footsteps of Lord Buddha across Bihar.', hi: 'बिहार भर में भगवान बुद्ध के पदचिह्नों का अनुसरण करें।' }, color: '#4CAF50' },
  'ramayana': { name: { en: 'Ramayana Circuit', hi: 'रामायण परिपथ' }, desc: { en: 'Discover the ancient sites linked to the epic Ramayana.', hi: 'महाकाव्य रामायण से जुड़े प्राचीन स्थलों की खोज करें।' }, color: '#FF9800' },
  'sufi': { name: { en: 'Sufi Circuit', hi: 'सूफी परिपथ' }, desc: { en: 'Explore the spiritual heritage of Sufi saints.', hi: 'सूफी संतों की आध्यात्मिक विरासत का अन्वेषण करें।' }, color: '#00BCD4' },
  'eco': { name: { en: 'Eco Circuit', hi: 'इको परिपथ' }, desc: { en: 'Experience the pristine nature and wildlife of Bihar.', hi: 'बिहार की अछूती प्रकृति और वन्य जीवन का अनुभव करें।' }, color: '#8BC34A' },
};

export default function CircuitDetailScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();

  const circuitId = slug as string;
  const circuitMeta = (CIRCUITS as any)[circuitId] || { name: { en: 'Circuit', hi: 'परिपथ' }, desc: { en: '', hi: '' }, color: theme.primary };
  
  const circuitPlaces = mockPlaces.filter((p: any) => 
    p.circuits?.some((c: string) => c.toLowerCase().includes(circuitId.toLowerCase()))
  );
  const heroImage = circuitPlaces.find(p => p.heroImage)?.heroImage;

  const getLocalized = (obj: any) => obj ? (obj[language] || obj.en) : null;

  const getDistrictName = (districtId: string) => {
    const d = mockDistricts.find(d => d.id === districtId);
    if (!d) return '';
    return getLocalized(d.name);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <FlashList
        data={circuitPlaces}
        keyExtractor={(item) => item.id}
        // @ts-ignore
        estimatedItemSize={115}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              {heroImage ? (
                 <FallbackImageBackground sourceUri={heroImage} style={styles.heroImage} imageStyle={{ opacity: 0.8 }} fallbackIcon="map-outline" />
              ) : (
                 <View style={[styles.heroImage, { backgroundColor: circuitMeta.color }]} />
              )}
              
              <View style={styles.heroOverlay}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                   <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.heroTextContainer}>
                  <View style={[styles.badge, { backgroundColor: circuitMeta.color }]}>
                    <Typography variant="semiBold" style={{color: '#FFF', fontSize: 12}}>CIRCUIT</Typography>
                  </View>
                  <Typography variant="semiBold" style={styles.heroTitle}>{getLocalized(circuitMeta.name)}</Typography>
                  <Typography variant="medium" style={styles.heroSubtitle}>{getLocalized(circuitMeta.desc)}</Typography>
                </View>
              </View>
            </View>

            <View style={[styles.content, { backgroundColor: theme.surface, paddingBottom: 0 }]}>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>
                {circuitPlaces.length} {t('places', language)}
              </Typography>
            </View>
          </View>
        )}
        renderItem={({ item: place }) => (
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity 
              style={[styles.placeCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
              activeOpacity={0.8}
              onPress={() => router.push(`/place/${place.slug}` as any)}
            >
              {place.heroImage ? (
                <FallbackImageBackground sourceUri={place.heroImage} style={styles.placeImage} imageStyle={{ borderRadius: 8 }} fallbackIcon="image-outline" />
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
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTextContainer: {
    marginBottom: 20,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 32,
    color: '#FFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#EEE',
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  placeCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  placeImage: {
    width: 90,
    height: 90,
  },
  placeInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  placeTitle: {
    fontSize: 16,
  },
  placeDistrict: {
    fontSize: 13,
  },
  placeDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});

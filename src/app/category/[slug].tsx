import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme/ThemeContext';
import { mockPlaces, mockDistricts } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const CATEGORIES = {
  'waterfalls': { 
    name: { en: 'Chasing Waterfalls', hi: 'जलप्रपात' }, 
    desc: { en: 'Discover the most spectacular and breathtaking waterfalls in Bihar.', hi: 'बिहार के सबसे शानदार और लुभावने झरनों की खोज करें।' }, 
    color: '#00BCD4',
    filter: (p: any) => p.placeType === 'waterfall'
  },
  'mountains': { 
    name: { en: 'Mountain Escapes', hi: 'पहाड़ी वादियां' }, 
    desc: { en: 'Escape to the serene hills, peaks, and panoramic viewpoints.', hi: 'शांत पहाड़ियों, चोटियों और मनोरम दृश्यों के लिए भाग जाएं।' }, 
    color: '#8BC34A',
    filter: (p: any) => p.placeType === 'hill' || p.placeType === 'viewpoint' || p.placeType === 'cave'
  },
  'wildlife': { 
    name: { en: 'Wildlife & Nature', hi: 'वन्यजीव और प्रकृति' }, 
    desc: { en: 'Explore dense forests, national parks, and wildlife sanctuaries.', hi: 'घने जंगलों, राष्ट्रीय उद्यानों और वन्यजीव अभयारण्यों का अन्वेषण करें।' }, 
    color: '#4CAF50',
    filter: (p: any) => p.placeType === 'wildlife_reserve' || p.placeType === 'national_park' || p.placeType === 'zoo' || p.placeType === 'lake'
  },
  'hidden_gems': { 
    name: { en: 'Hidden Gems', hi: 'अनदेखी जगहें' }, 
    desc: { en: 'Uncover offbeat and unexplored majestic places.', hi: 'ऑफ़बीट और अज्ञात राजसी स्थानों को उजागर करें।' }, 
    color: '#9C27B0',
    filter: (p: any) => p.discoveryFlags?.hiddenGem || p.tags?.includes('hidden_gem') || p.tags?.includes('offbeat')
  },
  'photography': { 
    name: { en: 'Insta-Worthy', hi: 'फोटोग्राफी' }, 
    desc: { en: 'The most photogenic and visually stunning spots in Bihar.', hi: 'बिहार में सबसे अधिक फोटोजेनिक और आश्चर्यजनक स्थान।' }, 
    color: '#FF4081',
    filter: (p: any) => p.discoveryFlags?.photography || p.tags?.includes('photography') || p.tags?.includes('sunset')
  }
};

export default function CategoryDetailScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();

  const categoryId = slug as string;
  const categoryMeta = (CATEGORIES as any)[categoryId] || { 
    name: { en: 'Category', hi: 'श्रेणी' }, 
    desc: { en: '', hi: '' }, 
    color: theme.primary,
    filter: () => true 
  };
  
  // Sort by featured/mustVisit to ensure the best places are at the top, then limit to 20
  const categoryPlaces = mockPlaces
    .filter(categoryMeta.filter)
    .sort((a: any, b: any) => {
      const aScore = (a.discoveryFlags?.featured ? 2 : 0) + (a.tags?.includes('mustVisit') ? 1 : 0);
      const bScore = (b.discoveryFlags?.featured ? 2 : 0) + (b.tags?.includes('mustVisit') ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 20);
  const heroImage = categoryPlaces.find(p => p.heroImage)?.heroImage;

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
        data={categoryPlaces}
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
                 <ImageBackground source={{ uri: heroImage }} style={styles.heroImage} imageStyle={{ opacity: 0.8 }} />
              ) : (
                 <View style={[styles.heroImage, { backgroundColor: categoryMeta.color }]} />
              )}
              
              <View style={styles.heroOverlay}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                   <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.heroTextContainer}>
                  <View style={[styles.badge, { backgroundColor: categoryMeta.color }]}>
                    <Typography variant="semiBold" style={{color: '#FFF', fontSize: 12}}>VIBES</Typography>
                  </View>
                  <Typography variant="semiBold" style={styles.heroTitle}>{getLocalized(categoryMeta.name)}</Typography>
                  <Typography variant="medium" style={styles.heroSubtitle}>{getLocalized(categoryMeta.desc)}</Typography>
                </View>
              </View>
            </View>

            {/* Content */}
            <View style={[styles.content, { backgroundColor: theme.surface, paddingBottom: 0 }]}>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>
                {categoryPlaces.length} {t('places', language)}
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
                <ImageBackground source={{uri: place.heroImage}} style={styles.placeImage} imageStyle={{ borderRadius: 8 }} />
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

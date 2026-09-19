import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme/ThemeContext';
import { mockPlaces, mockDistricts } from '../../data';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';
import Markdown from 'react-native-markdown-display';
import { getMarkdownStyles } from '../../theme/markdownStyles';

export default function PlaceDetailScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();
  const [isSaved, setIsSaved] = React.useState(false);

  const getDistrictName = (districtId: string) => {
    const d = mockDistricts.find(d => d.id === districtId);
    if (!d) return '';
    return d.name[language] || d.name.en;
  };

  const FAVORITES_KEY = '@bihar_explorer_favorites';

  const markdownStyles = getMarkdownStyles(theme, language as 'en' | 'hi');

  const place = mockPlaces.find((p: any) => p.slug === slug) || mockPlaces[0];

  // Interweaving logic
  const nearbyPlaces = (place.nearbyPlaceIds || [])
    .map((id: string) => mockPlaces.find((p: any) => p.id === id))
    .filter(Boolean);

  const similarPlaces = mockPlaces
    .filter((p: any) => p.id !== place.id && p.primaryCategory === place.primaryCategory)
    .slice(0, 5);

  const circuitPlaces = place.circuits && place.circuits.length > 0 
    ? mockPlaces.filter((p: any) => p.id !== place.id && p.circuits?.includes(place.circuits[0])).slice(0, 5)
    : [];

  React.useEffect(() => {
    checkIfSaved();
  }, [place]);

  const checkIfSaved = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const savedIds: string[] = JSON.parse(stored);
        setIsSaved(savedIds.includes(place.id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleSave = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      let savedIds: string[] = stored ? JSON.parse(stored) : [];
      
      if (isSaved) {
        savedIds = savedIds.filter(id => id !== place.id);
      } else {
        if (!savedIds.includes(place.id)) {
          savedIds.push(place.id);
        }
      }
      
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(savedIds));
      setIsSaved(!isSaved);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${place.location.latitude},${place.location.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={[styles.heroImage, { backgroundColor: theme.border }]}>
          {place.heroImage && (
            <Image 
              source={{ uri: place.heroImage }} 
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
          )}
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: theme.overlay }]} onPress={() => router.back()}>
             <Ionicons name="arrow-back" size={24} color={theme.textWhite} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Typography variant="semiBold" style={[styles.title, { color: theme.text }]}>{place.name[language]}</Typography>
          <Typography variant="medium" style={[styles.subtitle, { color: theme.textSecondary }]}>{place.name[language === 'hi' ? 'en' : 'hi']}</Typography>
          
          <View style={[styles.categoryBadge, { backgroundColor: theme.badgeBackground }]}>
            <Typography variant="semiBold" style={{color: theme.primaryDark}}>🛕 {place.categories?.[0]}</Typography>
          </View>

          {/* Actions */}
          <View style={styles.actionsRow}>
             <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.primary }]} onPress={handleNavigate}>
               <Ionicons name="navigate" size={20} color={theme.textWhite} style={{marginRight: 8}} />
               <Typography variant="semiBold" style={{color: theme.textWhite}}>Navigate</Typography>
             </TouchableOpacity>
             <TouchableOpacity 
               style={[styles.actionBtn, { backgroundColor: theme.cardBackground, borderColor: theme.border, borderWidth: 1 }]}
               onPress={toggleSave}
             >
               <Ionicons name={isSaved ? "heart" : "heart-outline"} size={20} color={isSaved ? theme.error : theme.text} style={{marginRight: 8}} />
               <Typography variant="semiBold" style={{color: isSaved ? theme.error : theme.text}}>{isSaved ? 'Saved' : 'Save'}</Typography>
             </TouchableOpacity>
          </View>

          {/* Quick Info */}
          <View style={[styles.quickInfo, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
             {place.visitingInfo?.entryFee && (
               <View style={styles.infoRow}>
                 <Ionicons name="ticket" size={16} color={theme.textSecondary}/>
                 <Typography variant="medium" style={[styles.infoText, { color: theme.text }]}> {language === 'hi' ? 'प्रवेश:' : 'Entry:'} {place.visitingInfo.entryFee.amount === 0 ? (language === 'hi' ? 'निःशुल्क' : 'Free') : `₹${place.visitingInfo.entryFee.amount}`}</Typography>
               </View>
             )}
             {place.visitingInfo?.recommendedDurationMinutes && (
               <View style={styles.infoRow}>
                 <Ionicons name="time" size={16} color={theme.textSecondary}/>
                 <Typography variant="medium" style={[styles.infoText, { color: theme.text }]}> {language === 'hi' ? 'अवधि:' : 'Duration:'} {place.visitingInfo.recommendedDurationMinutes} {language === 'hi' ? 'मिनट' : 'mins'}</Typography>
               </View>
             )}
             {place.visitingInfo?.bestTimeToVisit && place.visitingInfo.bestTimeToVisit[language] && (
               <View style={styles.infoRow}>
                 <Ionicons name="calendar" size={16} color={theme.textSecondary}/>
                 <Typography variant="medium" style={[styles.infoText, { color: theme.text }]}> {language === 'hi' ? 'सबसे अच्छा समय:' : 'Best Time:'} {place.visitingInfo.bestTimeToVisit[language]}</Typography>
               </View>
             )}
          </View>

          {/* About */}
          {place.description && place.description[language] && (
            <>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>{language === 'hi' ? 'विवरण' : 'About'}</Typography>
              <Markdown style={markdownStyles}>
                {place.description[language]}
              </Markdown>
            </>
          )}

          {/* History */}
          {place.history && place.history[language] && (
            <>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>{t('historyTitle', language)}</Typography>
              <Markdown style={markdownStyles}>
                {place.history[language]}
              </Markdown>
            </>
          )}

          {/* Significance */}
          {place.significance && place.significance[language] && (
            <>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>{language === 'hi' ? 'महत्व' : 'Significance'}</Typography>
              <Markdown style={markdownStyles}>
                {place.significance[language]}
              </Markdown>
            </>
          )}

          {/* Facilities (Quick Icons) */}
          {place.facilities && (
            <>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>{language === 'hi' ? 'सुविधाएं' : 'Facilities'}</Typography>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 12}}>
                {Object.entries(place.facilities).map(([key, value]) => {
                  if (!value) return null;
                  let iconName = 'checkmark-circle';
                  if (key === 'parking') iconName = 'car';
                  if (key === 'toilets') iconName = 'water';
                  if (key === 'drinkingWater') iconName = 'pint';
                  if (key === 'food') iconName = 'restaurant';
                  if (key === 'medical') iconName = 'medkit';
                  
                  return (
                    <View key={key} style={[styles.facilityBadge, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
                      <Ionicons name={iconName as any} size={16} color={theme.primary} style={{marginRight: 6}} />
                      <Typography variant="medium" style={{color: theme.text, fontSize: 13, textTransform: 'capitalize'}}>{key.replace(/([A-Z])/g, ' $1')}</Typography>
                    </View>
                  );
                })}
              </View>
            </>
          )}

          {/* Travel Tips */}
          {place.travelTips && place.travelTips.length > 0 && (
            <>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>{language === 'hi' ? 'यात्रा सुझाव' : 'Travel Tips'}</Typography>
              {place.travelTips.map((tip: any, index: number) => (
                <View key={index} style={{marginBottom: 16}}>
                  <Markdown style={markdownStyles}>
                    {tip[language]}
                  </Markdown>
                </View>
              ))}
            </>
          )}

          {/* How to Reach */}
          {place.howToReach && (
            <>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>{t('howToReach', language)}</Typography>
              
              {place.howToReach.railway && place.howToReach.railway.length > 0 && (
                <Typography variant="regular" style={[styles.paragraph, { color: theme.textSecondary }]}>🚆 {place.howToReach.railway[0].name[language]} ({place.howToReach.railway[0].distanceKm} km)</Typography>
              )}
              {place.howToReach.airport && place.howToReach.airport.length > 0 && (
                <Typography variant="regular" style={[styles.paragraph, { color: theme.textSecondary }]}>✈️ {place.howToReach.airport[0].name[language]} ({place.howToReach.airport[0].distanceKm} km)</Typography>
              )}
              {place.howToReach.road && place.howToReach.road[language] && (
                <Typography variant="regular" style={[styles.paragraph, { color: theme.textSecondary }]}>🚗 {place.howToReach.road[language]}</Typography>
              )}
              {place.howToReach.localTransport && place.howToReach.localTransport[language] && (
                <Typography variant="regular" style={[styles.paragraph, { color: theme.textSecondary }]}>🛺 {place.howToReach.localTransport[language]}</Typography>
              )}
            </>
          )}

          {/* Location & Address */}
          {place.location?.address?.[language] && (
            <>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text, marginTop: 24 }]}>{language === 'hi' ? 'पता एवं दिशा-निर्देश' : 'Location & Address'}</Typography>
              <Markdown style={markdownStyles}>
                {place.location.address[language]}
              </Markdown>
            </>
          )}

          {/* Explore the Circuit */}
          {circuitPlaces.length > 0 && (
            <View style={{ marginTop: 24 }}>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text, marginTop: 0 }]}>
                {language === 'hi' ? 'परिपथ में और खोजें' : 'More in this Circuit'}
              </Typography>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {circuitPlaces.map((cp: any) => (
                  <TouchableOpacity 
                    key={cp.id}
                    style={[styles.horizontalPlaceCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
                    onPress={() => router.push(`/place/${cp.slug}` as any)}
                    activeOpacity={0.8}
                  >
                    {cp.heroImage ? (
                      <Image source={{uri: cp.heroImage}} style={styles.horizontalPlaceImage} />
                    ) : (
                      <View style={[styles.horizontalPlaceImage, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Ionicons name="image-outline" size={24} color={theme.textSecondary} />
                      </View>
                    )}
                    <View style={styles.horizontalPlaceInfo}>
                      <Typography variant="semiBold" numberOfLines={2} style={[styles.horizontalPlaceTitle, { color: theme.text }]}>
                        {cp.name[language] || cp.name.en}
                      </Typography>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                        <Ionicons name="location" size={10} color={theme.textSecondary} />
                        <Typography variant="medium" numberOfLines={1} style={[styles.horizontalPlaceSubtitle, { color: theme.textSecondary, marginLeft: 2 }]}>
                          {getDistrictName(cp.districtId)}
                        </Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Similar Places */}
          {similarPlaces.length > 0 && (
            <View style={{ marginTop: 24 }}>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text, marginTop: 0 }]}>
                {language === 'hi' ? 'मिलते-जुलते स्थान' : 'Similar Places'}
              </Typography>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {similarPlaces.map((sp: any) => (
                  <TouchableOpacity 
                    key={sp.id}
                    style={[styles.horizontalPlaceCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
                    onPress={() => router.push(`/place/${sp.slug}` as any)}
                    activeOpacity={0.8}
                  >
                    {sp.heroImage ? (
                      <Image source={{uri: sp.heroImage}} style={styles.horizontalPlaceImage} />
                    ) : (
                      <View style={[styles.horizontalPlaceImage, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Ionicons name="image-outline" size={24} color={theme.textSecondary} />
                      </View>
                    )}
                    <View style={styles.horizontalPlaceInfo}>
                      <Typography variant="semiBold" numberOfLines={2} style={[styles.horizontalPlaceTitle, { color: theme.text }]}>
                        {sp.name[language] || sp.name.en}
                      </Typography>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                        <Ionicons name="location" size={10} color={theme.textSecondary} />
                        <Typography variant="medium" numberOfLines={1} style={[styles.horizontalPlaceSubtitle, { color: theme.textSecondary, marginLeft: 2 }]}>
                          {getDistrictName(sp.districtId)}
                        </Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Nearby Places */}
          {nearbyPlaces.length > 0 && (
            <View style={{ marginTop: 24 }}>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text, marginTop: 0 }]}>
                {language === 'hi' ? 'आसपास के स्थान' : 'Nearby Places'}
              </Typography>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {nearbyPlaces.map((np: any) => (
                  <TouchableOpacity 
                    key={np.id}
                    style={[styles.horizontalPlaceCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
                    onPress={() => router.push(`/place/${np.slug}` as any)}
                    activeOpacity={0.8}
                  >
                    {np.heroImage ? (
                      <Image source={{uri: np.heroImage}} style={styles.horizontalPlaceImage} />
                    ) : (
                      <View style={[styles.horizontalPlaceImage, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Ionicons name="map-outline" size={24} color={theme.textSecondary} />
                      </View>
                    )}
                    <View style={styles.horizontalPlaceInfo}>
                      <Typography variant="semiBold" numberOfLines={2} style={[styles.horizontalPlaceTitle, { color: theme.text }]}>
                        {np.name[language] || np.name.en}
                      </Typography>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                        <Ionicons name="location" size={10} color={theme.textSecondary} />
                        <Typography variant="medium" numberOfLines={1} style={[styles.horizontalPlaceSubtitle, { color: theme.textSecondary, marginLeft: 2 }]}>
                          {getDistrictName(np.districtId)}
                        </Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    height: 300,
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  facilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  quickInfo: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  horizontalPlaceCard: {
    width: 170,
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  horizontalPlaceImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#CCC',
  },
  horizontalPlaceInfo: {
    padding: 10,
  },
  horizontalPlaceTitle: {
    fontSize: 13,
  },
  horizontalPlaceSubtitle: {
    fontSize: 12,
  },
});

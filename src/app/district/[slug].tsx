import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { getMarkdownStyles } from '../../theme/markdownStyles';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme/ThemeContext';
import { mockDistricts, getDistrictPlaceCount, mockPlaces } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

const AccordionSection = ({ title, iconName, children, theme, expandedInitially = false }: any) => {
  const [expanded, setExpanded] = useState(expandedInitially);

  return (
    <View style={[styles.accordionContainer, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.accordionHeaderLeft}>
          <Ionicons name={iconName} size={22} color={theme.primary} style={styles.accordionIcon} />
          <Typography variant="semiBold" style={[styles.accordionTitle, { color: theme.text }]}>{title}</Typography>
        </View>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textSecondary} />
      </TouchableOpacity>
      {expanded && (
        <View style={[styles.accordionContent, { borderTopColor: theme.border }]}>
          {children}
        </View>
      )}
    </View>
  );
};

export default function DistrictDetailScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();

  const district = mockDistricts.find((d: any) => d.slug === slug) || mockDistricts[0];
  const districtPlaces = mockPlaces.filter((p: any) => p.districtId === district.id);
  
  const neighboringDistricts = (district.nearbyDistrictIds || [])
    .map((id: string) => mockDistricts.find((d: any) => d.id === id))
    .filter(Boolean);

  const markdownStyles = getMarkdownStyles(theme, language as 'en' | 'hi');

  const getLocalized = (obj: any) => obj ? (obj[language] || obj.en) : null;

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.heroImage, { backgroundColor: theme.border }]}>
          {district.heroImage && (
            <Image 
              source={{ uri: district.heroImage }} 
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
          )}
          {/* Dark Overlay for better text readability if no image, or even with image */}
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
          
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: 'rgba(0,0,0,0.5)' }]} onPress={() => router.back()}>
             <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.heroTextContainer}>
            <Typography variant="semiBold" style={styles.heroTitle}>{getLocalized(district.name)}</Typography>
            <Typography variant="medium" style={styles.heroDistrictText}>
              {district.name.en} {t('districtSuffix', language)}
            </Typography>
          </View>
        </View>

        <View style={styles.content}>
          
          <View style={[styles.statsRow]}>
            <View style={[styles.statBox, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
              <Ionicons name="location" size={20} color={theme.primary} />
              <Typography style={{ color: theme.text, fontWeight: 'bold', marginTop: 4 }}>
                {districtPlaces.length}
              </Typography>
              <Typography style={{ color: theme.textSecondary, fontSize: 12 }}>
                {language === 'hi' ? 'स्थान' : 'Places'}
              </Typography>
            </View>
            
            {district.geography?.areaSqKm && (
              <View style={[styles.statBox, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
                <Ionicons name="map" size={20} color={theme.primary} />
                <Typography style={{ color: theme.text, fontWeight: 'bold', marginTop: 4 }}>
                  {district.geography.areaSqKm}
                </Typography>
                <Typography style={{ color: theme.textSecondary, fontSize: 12 }}>Sq. Km</Typography>
              </View>
            )}

            {district.demographics?.population?.value && (
              <View style={[styles.statBox, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
                <Ionicons name="people" size={20} color={theme.primary} />
                <Typography style={{ color: theme.text, fontWeight: 'bold', marginTop: 4 }}>
                  {(district.demographics.population.value / 100000).toFixed(1)}L
                </Typography>
                <Typography style={{ color: theme.textSecondary, fontSize: 12 }}>Population</Typography>
              </View>
            )}
          </View>

          {/* Overview */}
          {getLocalized(district.overview) && (
            <View style={styles.section}>
               <Markdown style={markdownStyles}>
                 {getLocalized(district.overview)}
               </Markdown>
            </View>
          )}

          {/* Popular Places Quick List */}
          {districtPlaces.length > 0 && (
            <View style={styles.section}>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>
                {t('popularPlaces', language)}
              </Typography>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {districtPlaces.map((place: any) => (
                  <TouchableOpacity 
                    key={place.id}
                    style={[styles.horizontalPlaceCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
                    onPress={() => router.push(`/place/${place.slug}` as any)}
                    activeOpacity={0.8}
                  >
                    {place.heroImage && (
                      <Image source={{uri: place.heroImage}} style={styles.horizontalPlaceImage} />
                    )}
                    {!place.heroImage && (
                      <View style={[styles.horizontalPlaceImage, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Ionicons name="image-outline" size={24} color={theme.textSecondary} />
                      </View>
                    )}
                    <View style={styles.horizontalPlaceInfo}>
                      <Typography variant="semiBold" numberOfLines={2} style={[styles.horizontalPlaceTitle, { color: theme.text }]}>
                        {getLocalized(place.name)}
                      </Typography>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                        <Ionicons name="location" size={10} color={theme.textSecondary} />
                        <Typography variant="medium" numberOfLines={1} style={[styles.horizontalPlaceSubtitle, { color: theme.textSecondary, marginLeft: 2 }]}>
                          {getLocalized(district.name)}
                        </Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Neighboring Districts */}
          {neighboringDistricts.length > 0 && (
            <View style={styles.section}>
              <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>
                {language === 'hi' ? 'पड़ोसी ज़िले' : 'Neighboring Districts'}
              </Typography>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {neighboringDistricts.map((neighbor: any) => (
                  <TouchableOpacity 
                    key={neighbor.id}
                    style={[styles.horizontalPlaceCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
                    onPress={() => router.push(`/district/${neighbor.slug}` as any)}
                    activeOpacity={0.8}
                  >
                    {neighbor.heroImage ? (
                      <Image source={{uri: neighbor.heroImage}} style={styles.horizontalPlaceImage} />
                    ) : (
                      <View style={[styles.horizontalPlaceImage, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Ionicons name="map-outline" size={24} color={theme.textSecondary} />
                      </View>
                    )}
                    <View style={styles.horizontalPlaceInfo}>
                      <Typography variant="semiBold" numberOfLines={2} style={[styles.horizontalPlaceTitle, { color: theme.text }]}>
                        {getLocalized(neighbor.name)}
                      </Typography>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Detailed Encyclopedic Sections (Accordions) */}
          <View style={styles.accordionsWrapper}>
            {/* History */}
            {getLocalized(district.history) && (
              <AccordionSection title={language === 'hi' ? 'इतिहास' : 'History'} iconName="time-outline" theme={theme} expandedInitially={true}>
                <Markdown style={markdownStyles}>{getLocalized(district.history)}</Markdown>
              </AccordionSection>
            )}

            {/* Geography */}
            {district.geography && (
              <AccordionSection title={language === 'hi' ? 'भूगोल' : 'Geography'} iconName="earth-outline" theme={theme}>
                {district.geography.location && (
                  <Markdown style={markdownStyles}>{getLocalized(district.geography.location)}</Markdown>
                )}
                {district.geography.boundaries && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Boundaries</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.geography.boundaries)}</Markdown>
                  </>
                )}
                {district.geography.physiography && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Physiography</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.geography.physiography)}</Markdown>
                  </>
                )}
                {district.geography.climate && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Climate</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.geography.climate)}</Markdown>
                  </>
                )}
              </AccordionSection>
            )}

            {/* Economy */}
            {district.economy && (
              <AccordionSection title={language === 'hi' ? 'अर्थव्यवस्था' : 'Economy'} iconName="briefcase-outline" theme={theme}>
                {district.economy.description && (
                  <Markdown style={markdownStyles}>{getLocalized(district.economy.description)}</Markdown>
                )}
                {district.economy.majorIndustries && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Major Industries</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.economy.majorIndustries)}</Markdown>
                  </>
                )}
              </AccordionSection>
            )}

            {/* Agriculture */}
            {district.agriculture && (
              <AccordionSection title={language === 'hi' ? 'कृषि' : 'Agriculture'} iconName="leaf-outline" theme={theme}>
                {district.agriculture.description && (
                  <Markdown style={markdownStyles}>{getLocalized(district.agriculture.description)}</Markdown>
                )}
                {district.agriculture.majorCrops && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Major Crops</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.agriculture.majorCrops)}</Markdown>
                  </>
                )}
              </AccordionSection>
            )}

            {/* Culture */}
            {district.culture && (
              <AccordionSection title={language === 'hi' ? 'संस्कृति' : 'Culture'} iconName="color-palette-outline" theme={theme}>
                {district.culture.festivals && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Festivals</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.culture.festivals)}</Markdown>
                  </>
                )}
                {district.culture.artAndCrafts && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Arts & Crafts</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.culture.artAndCrafts)}</Markdown>
                  </>
                )}
                {district.culture.food && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Cuisine</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.culture.food)}</Markdown>
                  </>
                )}
              </AccordionSection>
            )}

            {/* Transport */}
            {district.transport && (
              <AccordionSection title={language === 'hi' ? 'परिवहन' : 'Transport'} iconName="bus-outline" theme={theme}>
                {district.transport.road && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Road</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.transport.road)}</Markdown>
                  </>
                )}
                {district.transport.railway && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Railway</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.transport.railway)}</Markdown>
                  </>
                )}
                {district.transport.airport && (
                  <>
                    <Typography variant="semiBold" style={{color: theme.text, marginTop: 12}}>Air</Typography>
                    <Markdown style={markdownStyles}>{getLocalized(district.transport.airport)}</Markdown>
                  </>
                )}
              </AccordionSection>
            )}
            
            {/* Administration */}
            {district.administration && (
              <AccordionSection title={language === 'hi' ? 'प्रशासन' : 'Administration'} iconName="business-outline" theme={theme}>
                <Typography style={{color: theme.textSecondary}}>
                  <Typography variant="semiBold" style={{color: theme.text}}>Headquarters: </Typography>
                  {getLocalized(district.administration.headquarters)}
                </Typography>
                <Typography style={{color: theme.textSecondary, marginTop: 8}}>
                  <Typography variant="semiBold" style={{color: theme.text}}>Subdivisions: </Typography>
                  {district.administration.subdivisions}
                </Typography>
                <Typography style={{color: theme.textSecondary, marginTop: 8}}>
                  <Typography variant="semiBold" style={{color: theme.text}}>Blocks: </Typography>
                  {district.administration.blocks}
                </Typography>
                <Typography style={{color: theme.textSecondary, marginTop: 8}}>
                  <Typography variant="semiBold" style={{color: theme.text}}>Villages: </Typography>
                  {district.administration.villages}
                </Typography>
              </AccordionSection>
            )}
          </View>

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
    justifyContent: 'flex-end',
    padding: 16,
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
    zIndex: 10,
  },
  heroTextContainer: {
    zIndex: 10,
  },
  heroTitle: {
    fontSize: 36,
    color: '#FFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroDistrictText: {
    fontSize: 20,
    color: '#E0E0E0',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: -30,
    zIndex: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
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
  accordionsWrapper: {
    marginTop: 10,
  },
  accordionContainer: {
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionIcon: {
    marginRight: 12,
  },
  accordionTitle: {
    fontSize: 16,
  },
  accordionContent: {
    padding: 16,
    paddingTop: 8,
    borderTopWidth: 1,
  }
});

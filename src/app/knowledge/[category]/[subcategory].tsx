import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../../components/Typography';
import { useTheme } from '../../../theme/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { BiharKnowledgeData } from '../../../data/bihar-knowledge';

const SUBCATEGORY_TITLES: Record<string, { en: string, hi: string }> = {
  ancient: { en: 'Ancient History', hi: 'प्राचीन इतिहास' },
  medieval: { en: 'Medieval History', hi: 'मध्यकालीन इतिहास' },
  modern: { en: 'Modern History', hi: 'आधुनिक इतिहास' },
  'freedom-movement': { en: 'Freedom Movement', hi: 'स्वतंत्रता आंदोलन' },
  'important-events': { en: 'Important Events', hi: 'महत्वपूर्ण घटनाएँ' },
  'physical-geography': { en: 'Physical Geography', hi: 'भौतिक भूगोल' },
  rivers: { en: 'Rivers & Drainage', hi: 'नदियाँ और अपवाह' },
  climate: { en: 'Climate', hi: 'जलवायु' },
  soils: { en: 'Soils', hi: 'मिट्टी' },
  'agriculture-geography': { en: 'Agriculture', hi: 'कृषि भूगोल' },
  'natural-resources': { en: 'Natural Resources', hi: 'प्राकृतिक संसाधन' },
  glance: { en: 'At a Glance', hi: 'एक नज़र में' },
  symbols: { en: 'State Symbols', hi: 'राजकीय प्रतीक' },
  facts: { en: 'Basic Facts', hi: 'मूल तथ्य' },
  administration: { en: 'Administration', hi: 'प्रशासन' },
  legislature: { en: 'Legislature', hi: 'विधानमंडल' },
  judiciary: { en: 'Judiciary', hi: 'न्यायपालिका' },
  'local-government': { en: 'Local Government', hi: 'स्थानीय सरकार' },
  elections: { en: 'Elections', hi: 'चुनाव' },
  agriculture: { en: 'Agriculture', hi: 'कृषि' },
  industry: { en: 'Industry', hi: 'उद्योग' },
  infrastructure: { en: 'Infrastructure', hi: 'बुनियादी ढांचा' },
  budget: { en: 'Budget', hi: 'बजट' },
  demographics: { en: 'Demographics', hi: 'जनसांख्यिकी' },
  census: { en: 'Census', hi: 'जनगणना' },
  languages: { en: 'Languages', hi: 'भाषाएँ' },
  communities: { en: 'Communities', hi: 'समुदाय' },
  'social-development': { en: 'Social Development', hi: 'सामाजिक विकास' },
  art: { en: 'Art', hi: 'कला' },
  music: { en: 'Music', hi: 'संगीत' },
  dance: { en: 'Dance', hi: 'नृत्य' },
  literature: { en: 'Literature', hi: 'साहित्य' },
  festivals: { en: 'Festivals', hi: 'त्यौहार' },
  cuisine: { en: 'Cuisine', hi: 'भोजन' },
  crafts: { en: 'Handicrafts', hi: 'हस्तशिल्प' },
  ecology: { en: 'Ecology', hi: 'पारिस्थितिकी' },
  forests: { en: 'Forests', hi: 'वन' },
  wildlife: { en: 'Wildlife', hi: 'वन्यजीव' },
  'protected-areas': { en: 'Protected Areas', hi: 'संरक्षित क्षेत्र' },
  education: { en: 'Education', hi: 'शिक्षा' },
  health: { en: 'Health', hi: 'स्वास्थ्य' },
  schemes: { en: 'Govt Schemes', hi: 'सरकारी योजनाएं' },
  'development-indicators': { en: 'Development Indicators', hi: 'विकास संकेतक' },
  personalities: { en: 'Major Personalities', hi: 'प्रमुख व्यक्तित्व' },
  institutions: { en: 'Major Institutions', hi: 'प्रमुख संस्थान' },
};

export default function SubcategoryScreen() {
  const { category, subcategory } = useLocalSearchParams<{ category: string, subcategory: string }>();
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();
  
  const subTitleObj = SUBCATEGORY_TITLES[subcategory] || { en: subcategory, hi: subcategory };
  const headerTitle = language === 'hi' ? subTitleObj.hi : subTitleObj.en;
  
  const categoryData = (BiharKnowledgeData as any)[category];
  const items = categoryData ? categoryData[subcategory] : [];

  const renderItem = (record: any, index: number) => {
    const titleObj = record.name || record.title;
    const titleText = titleObj ? (titleObj[language] || titleObj.hi || titleObj.en) : record.id;
    
    // Attempt to grab a tiny preview
    const descObj = record.description || record.details || record.shortDescription;
    const descText = descObj ? (descObj[language] || descObj.hi || descObj.en) : null;
    
    return (
      <TouchableOpacity 
        key={`${record.id}-${index}`} 
        style={[styles.recordCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
        activeOpacity={0.7}
        onPress={() => router.push(`/knowledge/detail?category=${category}&subcategory=${subcategory}&id=${record.id}`)}
      >
        <View style={{flex: 1}}>
          <Typography variant="semiBold" style={[styles.recordTitle, { color: theme.text }]} numberOfLines={2}>
            {titleText}
          </Typography>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.primary} style={{marginLeft: 12}} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Typography variant="semiBold" style={[styles.headerTitle, { color: theme.text }]} numberOfLines={2}>
          {headerTitle}
        </Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {!Array.isArray(items) || items.length === 0 ? (
           <Typography style={{color: theme.textSecondary, textAlign: 'center', marginTop: 40}}>
             No topics found in this category.
           </Typography>
        ) : (
           items.map(renderItem)
        )}
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
    elevation: 2,
  },
  backBtn: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  recordTitle: {
    fontSize: 16,
  },
  recordSubtitle: {
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  }
});

import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { BiharKnowledgeData } from '../../data/bihar-knowledge';

const CATEGORY_TITLES: Record<string, { en: string, hi: string }> = {
  basics: { en: 'Bihar at a Glance', hi: 'एक नज़र में बिहार' },
  history: { en: 'History', hi: 'इतिहास' },
  geography: { en: 'Geography', hi: 'भूगोल' },
  polity: { en: 'Polity', hi: 'राजव्यवस्था' },
  economy: { en: 'Economy', hi: 'अर्थव्यवस्था' },
  society: { en: 'Society', hi: 'समाज' },
  culture: { en: 'Art & Culture', hi: 'कला और संस्कृति' },
  environment: { en: 'Environment', hi: 'पर्यावरण' },
  districts: { en: 'Districts', hi: 'जिले' },
  people: { en: 'Personalities', hi: 'प्रमुख व्यक्तित्व' },
  institutions: { en: 'Institutions', hi: 'संस्थान' },
  development: { en: 'Development', hi: 'विकास' },
  quiz: { en: 'Test Your Knowledge', hi: 'अपना ज्ञान परखें' }
};

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

export default function KnowledgeCategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();
  
  const categoryTitle = CATEGORY_TITLES[category] || { en: 'Knowledge', hi: 'ज्ञान' };
  const categoryData = (BiharKnowledgeData as any)[category];

  // For flat arrays (like districts), render list of items routing directly to Detail
  const renderFlatRecord = (record: any, index: number) => {
    const titleObj = record.name || record.title;
    const titleText = titleObj ? (titleObj[language] || titleObj.hi || titleObj.en) : record.id;
    
    return (
      <TouchableOpacity 
        key={`${record.id}-${index}`} 
        style={[styles.recordCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
        activeOpacity={0.7}
        onPress={() => router.push(`/knowledge/detail?category=${category}&id=${record.id}`)}
      >
        <View style={{flex: 1}}>
          <Typography variant="semiBold" style={[styles.recordTitle, { color: theme.text }]}>{titleText}</Typography>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.primary} />
      </TouchableOpacity>
    );
  };

  // For nested objects (like history), render list of subcategories
  const renderSubCategory = (subCategoryKey: string) => {
    const subTitle = SUBCATEGORY_TITLES[subCategoryKey] || { en: subCategoryKey, hi: subCategoryKey };
    const titleText = language === 'hi' ? subTitle.hi : subTitle.en;
    
    // Check if subcategory has data
    const subData = categoryData[subCategoryKey];
    if (!Array.isArray(subData) || subData.length === 0) return null;

    return (
      <TouchableOpacity 
        key={subCategoryKey} 
        style={[styles.recordCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
        activeOpacity={0.7}
        onPress={() => router.push(`/knowledge/${category}/${subCategoryKey}` as any)}
      >
        <View style={{flex: 1}}>
          <Typography variant="semiBold" style={[styles.recordTitle, { color: theme.text }]}>{titleText}</Typography>
          <Typography style={[styles.recordSubtitle, { color: theme.textSecondary }]}>
            {subData.length} {language === 'hi' ? 'विषय' : 'topics'}
          </Typography>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.primary} />
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
          {language === 'hi' ? categoryTitle.hi : categoryTitle.en}
        </Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {!categoryData ? (
           <Typography style={{color: theme.textSecondary, textAlign: 'center', marginTop: 40}}>
             Data unavailable for this category.
           </Typography>
        ) : Array.isArray(categoryData) ? (
           // Flat array
           categoryData.map(renderFlatRecord)
        ) : (
           // Nested object -> render subcategories
           Object.keys(categoryData).map(renderSubCategory)
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
    marginTop: 4,
  }
});

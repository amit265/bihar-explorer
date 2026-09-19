import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { FallbackImage } from '../../components/FallbackImage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { BiharKnowledgeData } from '../../data/bihar-knowledge';

export default function KnowledgeDetailScreen() {
  const { category, subcategory, id } = useLocalSearchParams<{ category: string, subcategory?: string, id: string }>();
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();
  
  // Find the record
  const categoryData = (BiharKnowledgeData as any)[category];
  let record = null;
  
  if (categoryData) {
    if (subcategory && categoryData[subcategory]) {
      record = categoryData[subcategory].find((item: any) => item.id === id);
    } else if (Array.isArray(categoryData)) {
      record = categoryData.find((item: any) => item.id === id);
    }
  }

  if (!record) {
    return (
      <View style={[styles.container, { backgroundColor: theme.surface }]}>
        <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        <Typography style={{textAlign: 'center', marginTop: 40, color: theme.textSecondary}}>
          {language === 'hi' ? 'रिकॉर्ड नहीं मिला' : 'Record not found'}
        </Typography>
      </View>
    );
  }

  const titleObj = record.name || record.title;
  const titleText = titleObj ? (titleObj[language] || titleObj.hi || titleObj.en) : record.id;
  
  const descObj = record.description || record.details || record.biography || record.shortDescription || record.history;
  const descText = descObj ? (descObj[language] || descObj.hi || descObj.en) : '';

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />
      
      {/* Immersive Header */}
      <View style={[styles.header, { borderBottomWidth: 1, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Typography variant="semiBold" style={[styles.headerTitle, { color: theme.text }]} numberOfLines={2}>
          {titleText}
        </Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Optional Hero Image */}
        {(record.image || record.imageUrl) && (
          <FallbackImage 
            sourceUri={record.image || record.imageUrl} 
            style={[styles.heroImage, { borderColor: theme.border }]} 
            resizeMode="cover" 
            fallbackIcon="image-outline"
          />
        )}


        {record.period && (
          <Typography variant="medium" style={[styles.metadataBadge, { color: theme.primary }]}>
            {typeof record.period === 'object' ? (record.period[language] || record.period.hi || record.period.en) : record.period}
          </Typography>
        )}
        
        {record.asOf && (
          <Typography style={[styles.asOf, { color: theme.textSecondary }]}>
            {language === 'hi' ? 'अद्यतन:' : 'As of:'} {record.asOf}
          </Typography>
        )}

        {/* Divider - only if metadata exists */}
        {(record.period || record.asOf) && (
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
        )}

        {/* Main Content */}
        {descText ? (
          <Markdown 
            style={{
              body: { color: theme.textSecondary, fontSize: 16, lineHeight: 26, fontFamily: 'Outfit-Regular' },
              heading3: { color: theme.text, fontSize: 20, fontFamily: 'Outfit-SemiBold', marginTop: 16, marginBottom: 8 },
              heading4: { color: theme.text, fontSize: 18, fontFamily: 'Outfit-Medium', marginTop: 16, marginBottom: 8 },
              strong: { color: theme.text, fontFamily: 'Outfit-Bold' },
              bullet_list: { marginTop: 8, marginBottom: 16 },
              list_item: { marginBottom: 8, lineHeight: 24 }
            }}
          >
            {descText}
          </Markdown>
        ) : (
          <Typography style={[styles.content, { color: theme.textSecondary, fontStyle: 'italic' }]}>
            {language === 'hi' ? 'विस्तृत जानकारी उपलब्ध नहीं है।' : 'Detailed information not available.'}
          </Typography>
        )}
        
        {/* Render any additional data blocks if present */}
        {record.keyFacts && (
          <View style={[styles.extraSection, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <Typography variant="semiBold" style={[styles.extraTitle, { color: theme.text }]}>
              {language === 'hi' ? 'मुख्य तथ्य' : 'Key Facts'}
            </Typography>
            {record.keyFacts.map((fact: string, idx: number) => (
              <View key={idx} style={styles.bulletRow}>
                <Typography style={{ color: theme.primary, marginRight: 8 }}>•</Typography>
                <Typography style={{ color: theme.textSecondary, flex: 1, lineHeight: 22 }}>{fact}</Typography>
              </View>
            ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
  },
  backBtn: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 60,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    marginBottom: 12,
  },
  metadataBadge: {
    fontSize: 14,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(196, 154, 74, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  asOf: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 24,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
  },
  extraSection: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  extraTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  }
});

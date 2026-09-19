import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from './Typography';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { mockPlaces, mockDistricts } from '../data';
import { BiharKnowledgeData } from '../data/bihar-knowledge';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type SearchResult = {
  id: string;
  type: 'place' | 'district' | 'knowledge';
  title: string;
  subtitle: string;
  categoryName?: string;
  route: string;
};

export function UnifiedSearchResults({ query }: { query: string }) {
  const { colors: theme } = useTheme();
  const { language } = useLanguage();
  const router = useRouter();

  const getResults = (): SearchResult[] => {
    if (!query || query.length < 2) return [];
    
    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search Places
    mockPlaces.forEach(place => {
      const nameMatch = (place.name.en?.toLowerCase().includes(lowerQuery) || place.name.hi?.toLowerCase().includes(lowerQuery));
      if (nameMatch) {
        results.push({
          id: `place-${place.id}`,
          type: 'place',
          title: place.name[language] || place.name.en,
          subtitle: place.shortDescription[language] || place.shortDescription.en,
          route: `/place/${place.slug}`
        });
      }
    });

    // Search Districts
    mockDistricts.forEach(district => {
      const nameMatch = (district.name.en?.toLowerCase().includes(lowerQuery) || district.name.hi?.toLowerCase().includes(lowerQuery));
      if (nameMatch) {
        results.push({
          id: `district-${district.id}`,
          type: 'district',
          title: district.name[language] || district.name.en,
          subtitle: `District in ${district.division} division`,
          route: `/district/${district.slug}`
        });
      }
    });

    // Search Knowledge Base
    Object.keys(BiharKnowledgeData).forEach(mainCategory => {
      const categoryData = (BiharKnowledgeData as any)[mainCategory];
      
      if (Array.isArray(categoryData)) {
        // Handle flat arrays like districts
        categoryData.forEach(item => {
          const title = item.name || item.title || {en: item.id};
          const nameMatch = (title.en?.toLowerCase().includes(lowerQuery) || title.hi?.toLowerCase().includes(lowerQuery));
          if (nameMatch && mainCategory !== 'districts') { // Skip districts as we already have them
            results.push({
              id: `know-${mainCategory}-${item.id}`,
              type: 'knowledge',
              title: title[language] || title.en || item.id,
              subtitle: `Knowledge Base: ${mainCategory}`,
              categoryName: mainCategory,
              route: `/knowledge/${mainCategory}`
            });
          }
        });
      } else {
        // Handle nested objects
        Object.keys(categoryData).forEach(subCategory => {
          const subData = categoryData[subCategory];
          if (Array.isArray(subData)) {
            subData.forEach(item => {
              const title = item.name || item.title || {en: item.id};
              const nameMatch = (title.en?.toLowerCase().includes(lowerQuery) || title.hi?.toLowerCase().includes(lowerQuery));
              if (nameMatch) {
                results.push({
                  id: `know-${mainCategory}-${subCategory}-${item.id}`,
                  type: 'knowledge',
                  title: title[language] || title.en || item.id,
                  subtitle: `Knowledge Base: ${mainCategory} / ${subCategory}`,
                  categoryName: mainCategory,
                  route: `/knowledge/${mainCategory}`
                });
              }
            });
          }
        });
      }
    });

    return results.slice(0, 15); // Limit to top 15 results
  };

  const results = getResults();

  if (query.length > 0 && query.length < 2) {
    return (
      <View style={styles.center}>
         <Typography style={{ color: theme.textSecondary }}>Type at least 2 characters to search...</Typography>
      </View>
    );
  }

  if (results.length === 0) {
    return (
      <View style={styles.center}>
         <Ionicons name="search-outline" size={48} color={theme.border} style={{ marginBottom: 12 }} />
         <Typography variant="semiBold" style={{ color: theme.text }}>No results found</Typography>
         <Typography style={{ color: theme.textSecondary, marginTop: 4 }}>Try searching for a different place, district, or historical topic.</Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {results.map((item, index) => (
        <TouchableOpacity 
          key={`${item.id}-${index}`}
          style={[styles.resultItem, { borderBottomColor: theme.border }]}
          onPress={() => router.push(item.route as any)}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <Ionicons 
              name={item.type === 'place' ? "location" : item.type === 'district' ? "map" : "book"} 
              size={20} 
              color={theme.primary} 
            />
          </View>
          <View style={styles.resultText}>
            <Typography variant="semiBold" style={{ color: theme.text, fontSize: 16 }}>{item.title}</Typography>
            <Typography style={{ color: theme.textSecondary, fontSize: 13, marginTop: 2 }}>{item.subtitle}</Typography>
          </View>
          <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  center: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  resultText: {
    flex: 1,
    marginRight: 8,
  }
});

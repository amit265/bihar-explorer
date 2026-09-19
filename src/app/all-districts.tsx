import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Typography } from '../components/Typography';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { mockDistricts, getDistrictPlaceCount } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

export default function AllDistrictsScreen() {
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDistricts = mockDistricts.filter(d => 
    (d.name.en + d.name.hi).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.surface }]} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Typography variant="semiBold" style={[styles.title, { color: theme.text }]}>
          {t('tabDistricts', language)}
        </Typography>
        <View style={{ width: 40 }} />
      </View>

      <View style={[styles.searchBarContainer, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
        <Ionicons name="search" size={18} color={theme.textSecondary} style={{ marginRight: 8 }} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder={t('searchDistricts', language)}
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlashList
        data={filteredDistricts}
        keyExtractor={(item) => item.id}
        // @ts-ignore
        estimatedItemSize={80}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item: district }) => (
          <TouchableOpacity 
            style={[styles.gridItem, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
            onPress={() => router.push(`/district/${district.slug}` as any)}
          >
            <Typography variant="semiBold" style={[styles.gridItemTitle, { color: theme.text }]}>
              {district.name[language] || district.name.en}
            </Typography>
            <Typography variant="medium" style={{color: theme.primary, fontSize: 13}}>
              {getDistrictPlaceCount(district.id)} {t('places', language)}
            </Typography>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
  },
  backBtn: {
    width: 40, height: 40,
    justifyContent: 'center',
  },
  title: { fontSize: 20 },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  gridItem: {
    flex: 1,
    margin: 6,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  gridItemTitle: {
    fontSize: 16,
    marginBottom: 4,
  }
});

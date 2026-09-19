import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { useTheme } from '../theme/ThemeContext';
import { Typography } from './Typography';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

import { biharPaths } from '../data/biharPathsData';
import { mockDistricts } from '../data';

const { width } = Dimensions.get('window');
const MAP_WIDTH = 400;
const MAP_HEIGHT = 300;
const SVG_SCALE = width / MAP_WIDTH;
const ACTUAL_HEIGHT = MAP_HEIGHT * SVG_SCALE;

const DIVISION_COLORS: Record<string, string> = {
  'Patna': '#FFD180',
  'Tirhut': '#81D4FA',
  'Saran': '#A5D6A7',
  'Darbhanga': '#CE93D8',
  'Kosi': '#FFAB91',
  'Purnia': '#F48FB1',
  'Bhagalpur': '#FFE082',
  'Munger': '#BCAAA4',
  'Magadh': '#FFF59D',
};

export const InteractiveBiharMap = () => {
  const { colors: theme, theme: themeMode } = useTheme();
  const router = useRouter();
  const { language } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districtDivisionMap = useMemo(() => {
    const map: Record<string, string> = {};
    mockDistricts.forEach(d => {
      if (d.name && d.name.en && d.division) {
        let mapName = d.name.en;
        // Fix mismatches between SVG map names and JSON data names
        if (mapName === 'Kaimur') mapName = 'Bhabua';
        if (mapName === 'West Champaran') mapName = 'Pashchim Champaran';
        if (mapName === 'East Champaran') mapName = 'Purba Champaran';
        // Note: Arwal might be missing from this specific SVG map
        
        map[mapName] = d.division;
      }
    });
    return map;
  }, []);

  const handleDistrictPress = (districtName: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDistrict(districtName);
  };

  const handleExplore = () => {
    if (selectedDistrict) {
      const slug = selectedDistrict.toLowerCase().replace(/ /g, '-');
      router.push(`/district/${slug}` as any);
    }
  };

  return (
    <View style={styles.container}>
      {/* Diagnostic text so we know if paths loaded */}
      {biharPaths.length === 0 && (
        <Typography variant="medium" style={{ textAlign: 'center', margin: 20 }}>
          {t('loadingMap', language)}
        </Typography>
      )}
      <View style={styles.mapContainer}>
        <Svg
          width="100%"
          height={ACTUAL_HEIGHT || 300}
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          style={{ backgroundColor: 'transparent' }}
        >
          <G>
            {biharPaths.map((district: any, index: number) => {
              const isSelected = selectedDistrict === district.name;
              const division = districtDivisionMap[district.name];
              
              // Base color by division if available, fallback to theme elevated
              // In dark mode, we lower the opacity of the division colors to look better
              let baseColor = division && DIVISION_COLORS[division] ? DIVISION_COLORS[division] : (theme.elevated || '#F0F0F0');
              if (themeMode === 'dark' && division && DIVISION_COLORS[division]) {
                // simple hack to make colors darker/transparent for dark mode
                baseColor = DIVISION_COLORS[division] + '66'; // add 40% opacity hex
              }

              return (
                <Path
                  key={index}
                  d={district.d}
                  fill={isSelected ? '#E91E63' : baseColor}
                  stroke={theme.border || 'rgba(0,0,0,0.1)'}
                  strokeWidth={isSelected ? "1.5" : "0.75"}
                  onPress={() => handleDistrictPress(district.name)}
                />
              );
            })}
          </G>
        </Svg>
      </View>

      {selectedDistrict && (
        <View style={[styles.bottomSheet, { backgroundColor: theme.surface }]}>
          <View style={styles.sheetHeader}>
            <View>
              <Typography variant="medium" style={[styles.subtitle, { color: theme.textSecondary }]}>
                Selected District
              </Typography>
              <Typography variant="semiBold" style={[styles.title, { color: theme.text }]}>
                {selectedDistrict}
              </Typography>
            </View>
            <TouchableOpacity onPress={() => setSelectedDistrict(null)} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.exploreBtn, { backgroundColor: '#E91E63' }]}
            onPress={handleExplore}
          >
            <Typography variant="semiBold" style={{ color: '#FFF' }}>Explore District</Typography>
            <Ionicons name="arrow-forward" size={18} color="#FFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 300,
  },
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  bottomSheet: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
  },
  closeBtn: {
    padding: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 24,
  }
});

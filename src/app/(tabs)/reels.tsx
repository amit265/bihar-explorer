import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { FallbackImageBackground } from '../../components/FallbackImage';
import { Typography } from '../../components/Typography';
import { mockPlaces } from '../../data';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import { useFocusEffect } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

// Keep it exclusive - only highly photogenic places
const reelPlaces = mockPlaces.filter(p => p.heroImage && (p.discoveryFlags?.photography || p.tags?.includes('mustVisit'))).slice(0, 30);

export default function ReelsScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const FAVORITES_KEY = '@bihar_explorer_favorites';

  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    loadSaved();
  }, []);

  const loadSaved = async () => {
    try {
      const saved = await AsyncStorage.getItem(FAVORITES_KEY);
      if (saved) setSavedIds(JSON.parse(saved));
    } catch (e) { }
  };

  const handleSave = async (place: any) => {
    try {
      let newSaved = [...savedIds];
      if (newSaved.includes(place.id)) {
        newSaved = newSaved.filter(id => id !== place.id);
      } else {
        newSaved.push(place.id);
      }
      setSavedIds(newSaved);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newSaved));
    } catch (e) { }
  };

  const handleShare = async (place: any) => {
    try {
      const storeLink = Platform.OS === 'ios' 
        ? 'https://apps.apple.com/app/bihar-explorer/idXXXXXX' // Replace with actual Apple ID when published
        : 'https://play.google.com/store/apps/details?id=com.mahavyomastudio.biharexplorer';
        
      const shareOptions = {
        title: place.name[language],
        message: `Check out ${place.name[language]} in Bihar! 🌟\n\n${place.description[language]}\n\nDownload Bihar Explorer:\n${storeLink}`,
      };
      await Share.open(shareOptions);
    } catch (e) {
      console.log('Share dismissed');
    }
  };

  const getLocalized = (obj: any) => obj ? (obj[language] || obj.en) : null;

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item: place, index }: any) => {
    return (
      <ReelItem
        place={place}
        isActive={index === currentIndex}
        savedIds={savedIds}
        handleSave={handleSave}
        handleShare={handleShare}
        language={language}
        router={router}
        windowHeight={windowHeight}
        insets={insets}
        t={t}
      />
    );
  };

  if (reelPlaces.length === 0) return null;

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reelPlaces}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={windowHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelContainer: {
    width: windowWidth,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomInfo: {
    paddingHorizontal: 20,
    paddingRight: 80, // leave space for right bar
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  tagText: {
    color: '#FFF',
    fontSize: 12,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  desc: {
    color: '#EEE',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  actionBtn: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#000',
    fontSize: 14,
  },
  rightBar: {
    position: 'absolute',
    bottom: 60,
    right: 16,
    alignItems: 'center',
    gap: 24,
  },
  actionIcon: {
    alignItems: 'center',
  },
  actionIconText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  }
});

function ReelItem({ place, isActive, savedIds, handleSave, handleShare, language, router, windowHeight, insets, t }: any) {
  const isSaved = savedIds.includes(place.id);
  const videoUrl = `https://mahavyomastudio.com/apps/bihar-explorer/videos/reels/${place.id}_reel.mp4`;
  
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.muted = false;
  });

  React.useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, player]);

  const getLocalized = (obj: any) => obj ? (obj[language] || obj.en) : null;
  const isError = player.status === 'error';

  return (
    <View style={[styles.reelContainer, { height: windowHeight }]}>
      <FallbackImageBackground
        sourceUri={place.heroImage}
        style={styles.image}
        resizeMode="cover"
        fallbackIcon="image-outline"
      >
        {!isError && (
          <VideoView
            player={player}
            style={StyleSheet.absoluteFill}
            nativeControls={false}
            contentFit="cover"
          />
        )}
        <View style={styles.overlay}>
          
          {/* Header / Actions */}
          <View style={[styles.header, { paddingTop: Math.max(insets.top + 10, 50) }]}>
            <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.iconBtn}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Bottom Info */}
          <View style={styles.bottomInfo}>
            {place.placeType && (
              <View style={styles.tag}>
                <Ionicons name="location" size={14} color="#FFF" style={{ marginRight: 4 }} />
                <Typography variant="semiBold" style={styles.tagText}>{place.placeType.replace('_', ' ').toUpperCase()}</Typography>
              </View>
            )}
            
            <Typography variant="semiBold" style={styles.title}>{getLocalized(place.name)}</Typography>
            
            {place.shortDescription && (
              <Typography variant="regular" numberOfLines={2} style={styles.desc}>
                {getLocalized(place.shortDescription)}
              </Typography>
            )}

            <TouchableOpacity 
              style={styles.actionBtn}
              onPress={() => router.push(`/place/${place.slug}` as any)}
            >
              <Typography variant="semiBold" style={styles.actionBtnText}>Explore Place</Typography>
              <Ionicons name="arrow-forward" size={18} color="#000" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>

          {/* Right Action Bar */}
          <View style={styles.rightBar}>
            <TouchableOpacity style={styles.actionIcon} onPress={() => handleSave(place)}>
              <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={32} color="#FFF" />
              <Typography style={styles.actionIconText}>{isSaved ? t('saved', language) : t('save', language)}</Typography>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon} onPress={() => handleShare(place)}>
              <Ionicons name="share-social-outline" size={32} color="#FFF" />
              <Typography style={styles.actionIconText}>{t('share', language)}</Typography>
            </TouchableOpacity>
          </View>

        </View>
      </FallbackImageBackground>
    </View>
  );
}

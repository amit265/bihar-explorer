import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, useWindowDimensions, Platform, View, Text, StyleSheet, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { NotoSansDevanagari_400Regular, NotoSansDevanagari_500Medium, NotoSansDevanagari_600SemiBold } from '@expo-google-fonts/noto-sans-devanagari';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS
} from 'react-native-reanimated';

import { RemoteConfigProvider } from '../context/RemoteConfigContext';
import { RemoteConfigService } from '../services/remoteConfig/RemoteConfigService';
import { Analytics } from '../services/analytics/analytics';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

import { OTAUpdateModal } from '../components/OTAUpdateModal';
import { Typography } from '../components/Typography';

// Prevent native splash screen from auto-hiding immediately
SplashScreen.preventAutoHideAsync().catch(() => {});

const loadNativeModules = () => {
  if (Platform.OS === 'web') return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Notifications = require('expo-notifications');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { extractNavigationTarget } = require('../services/notifications/notifications');
    return { Notifications, extractNavigationTarget };
  } catch {
    return null;
  }
};

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LanguageProvider>
          <ThemeProvider>
            <RemoteConfigProvider>
                <AppContent />
            </RemoteConfigProvider>
          </ThemeProvider>
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AppContent() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const { colors, theme } = useTheme();
  const { language } = useLanguage();
  const isMounted = useRef(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    NotoSansDevanagari_400Regular,
    NotoSansDevanagari_500Medium,
    NotoSansDevanagari_600SemiBold,
  });

  // Reanimated splash values
  const logoScale = useSharedValue(0.4);
  const logoOpacity = useSharedValue(0);
  const logoRotation = useSharedValue(0);
  const textTranslateY = useSharedValue(35);
  const textOpacity = useSharedValue(0);
  const splashOpacity = useSharedValue(1);

  useEffect(() => {
    if (!isMounted.current && fontsLoaded) {
      isMounted.current = true;
      setTimeout(() => {
        setIsAppReady(true);
      }, 300);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!isMounted.current) return;

    try {
      void Analytics.track('app_open');
    } catch (e) {
      console.warn('Analytics init skipped:', e);
    }

    try {
      void RemoteConfigService.initialize();
    } catch (error) {
      console.error('Root Layout Error in Bihar Explorer:', error);
    }

    if (Platform.OS === 'web') return;

    try {
      const native = loadNativeModules();
      if (!native) return;
      const { Notifications, extractNavigationTarget } = native;

      // 1. Sync daily rate-limited Place reminder notifications
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { NotificationScheduler } = require('../services/notifications/NotificationScheduler');
      void NotificationScheduler.sync();

      // 2. Foreground / Background notification tap listener
      const notificationSubscription = Notifications.addNotificationResponseReceivedListener(
        (response: any) => {
          const target = extractNavigationTarget(response);
          if (target) {
            router.push(target as any);
          }
        }
      );

      // 3. Cold-start notification tap listener (when app is opened via notification click)
      void Notifications.getLastNotificationResponseAsync().then((response: any) => {
        if (response) {
          const target = extractNavigationTarget(response);
          if (target) {
            router.push(target as any);
          }
        }
      });

      return () => {
        notificationSubscription.remove();
      };
    } catch (e) {
      console.warn('Notification listener error:', e);
    }
  }, [isMounted, router]);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync().catch(() => {});

      logoScale.value = withTiming(1, { duration: 900, easing: Easing.out(Easing.back(1.5)) });
      logoOpacity.value = withTiming(1, { duration: 600 });
      logoRotation.value = withTiming(720, { duration: 1200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

      textTranslateY.value = withDelay(350, withTiming(0, { duration: 1000, easing: Easing.out(Easing.cubic) }));
      textOpacity.value = withDelay(350, withTiming(1, { duration: 1000 }));

      const timeout = setTimeout(() => {
        splashOpacity.value = withTiming(0, { duration: 600 }, (finished) => {
          if (finished) {
            runOnJS(setIsSplashVisible)(false);
          }
        });
      }, 2200);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppReady]);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotateY: `${logoRotation.value}deg` }
    ],
    opacity: logoOpacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: textTranslateY.value }],
    opacity: textOpacity.value,
  }));

  const animatedSplashStyle = useAnimatedStyle(() => ({
    opacity: splashOpacity.value,
  }));

  const renderAppContent = () => (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.surface,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="place/[slug]" options={{ headerShown: false }} />
      <Stack.Screen name="district/[slug]" options={{ headerShown: false }} />
    </Stack>
  );

  const isWideWeb = Platform.OS === 'web' && windowWidth > 850;

  return (
    <React.Fragment>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} animated />
      <OTAUpdateModal />

      {Platform.OS === 'web' ? (
        <View style={[styles.webContainer, { backgroundColor: colors.navigationBackground }]}>
          {isWideWeb && (
            <View style={styles.webSidebar}>
              <Typography variant="semiBold" style={[styles.sidebarBrand, { color: colors.accent }]}>● BIHAR EXPLORER</Typography>
              <Typography variant="semiBold" style={[styles.sidebarTitle, { color: colors.textWhite }]}>{t('appTitle', language)} — Travel Guide</Typography>
              <Typography style={[styles.sidebarSubtitle, { color: colors.textWhite }]}>
                {t('homeSubtitle', language)}
              </Typography>
            </View>
          )}
          <View style={[styles.phoneContainer, { backgroundColor: colors.surface }]}>
            {renderAppContent()}
          </View>
        </View>
      ) : (
        renderAppContent()
      )}

      {isSplashVisible && (
        <Animated.View style={[StyleSheet.absoluteFill, styles.splashContainer, { backgroundColor: colors.navigationBackground }, animatedSplashStyle]}>
          <View style={styles.splashContent}>
            {/* Animated App Splash Icon Image with scale & 3D Y-axis rotation */}
            <Animated.View style={[styles.splashLogoBadge, animatedLogoStyle]}>
              <Image
                source={require('../../assets/images/splash-icon.png')}
                style={styles.splashIconImage}
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.View style={[styles.splashTextContainer, animatedTextStyle]}>
              <Typography variant="semiBold" style={[styles.splashTitle, { color: colors.accent }]}>{t('appTitle', language)}</Typography>
              <Typography variant="semiBold" style={[styles.splashSubtitle, { color: colors.textWhite }]}>Travel Guide</Typography>
              <Typography style={[styles.splashTagline, { color: colors.textWhite }]}>{t('discoverHeart', language)}</Typography>
            </Animated.View>
          </View>

          <Typography variant="semiBold" style={[styles.splashDeveloperText, { color: colors.accent }]}>
            MAHAVYOMA STUDIO
          </Typography>
        </Animated.View>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webSidebar: {
    flex: 1,
    marginRight: 40,
    maxWidth: 450,
    padding: 20,
    justifyContent: 'center',
  },
  sidebarBrand: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  sidebarTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 15,
    lineHeight: 42,
  },
  sidebarSubtitle: {
    fontSize: 15,
    marginBottom: 25,
    lineHeight: 24,
    opacity: 0.7,
  },
  phoneContainer: {
    width: '100%',
    maxWidth: 480,
    height: '95%',
    maxHeight: 850,
    borderRadius: 24,
    overflow: 'hidden',
  },
  splashContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  splashContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogoBadge: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  splashIconImage: {
    width: '100%',
    height: '100%',
  },
  splashTextContainer: {
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  splashSubtitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
    letterSpacing: 1,
  },
  splashTagline: {
    fontSize: 13,
    marginTop: 16,
    letterSpacing: 0.8,
  },
  splashDeveloperText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
});

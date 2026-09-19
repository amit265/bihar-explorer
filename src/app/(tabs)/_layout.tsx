import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, Platform, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { shadows } from '../../theme/colors';
import { Typography } from '../../components/Typography';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';

const TAB_ICONS: Record<string, string> = {
  index: '🏠',      // Home
  reels: '🎬',      // Reels
  bihar: '📖',      // Bihar
  settings: '⚙️',   // Settings
};

interface CustomFloatingTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

function CustomFloatingTabBar({ state, descriptors, navigation }: CustomFloatingTabBarProps) {
  const { colors: theme, theme: themeMode } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 12 : 6);

  // Check if current route requests hiding the tab bar
  const currentRoute = state.routes[state.index];
  const { options } = descriptors[currentRoute.key];
  if (options.tabBarStyle?.display === 'none') {
    return null;
  }

  return (
    <View style={[styles.floatingContainerWrapper, { bottom: bottomInset + 8 }]}>
      <BlurView
        intensity={themeMode === 'dark' ? 40 : 80}
        tint={themeMode === 'dark' ? 'dark' : 'light'}
        style={[
          styles.floatingContainer,
          {
            backgroundColor: themeMode === 'dark' ? 'rgba(11,33,27,0.85)' : 'rgba(255,255,255,0.85)',
            borderColor: theme.accent,
          },
        ]}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Skip hidden screens (href: null)
          if (options.href === null) {
            return null;
          }

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const icon = TAB_ICONS[route.name] || '🌸';

          const onPress = () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              activeOpacity={0.85}
              style={[
                styles.tabItem,
                isFocused && [styles.tabItemActive, { backgroundColor: theme.badgeBackground }],
              ]}
            >
              <Typography style={[styles.tabIcon, isFocused && styles.tabIconActive]}>
                {icon}
              </Typography>
              <Typography
                variant={isFocused ? "semiBold" : "medium"}
                style={[
                  styles.tabLabel,
                  { color: isFocused ? theme.primary : theme.textMuted },
                  isFocused && styles.tabLabelActive,
                ]}
              >
                {label as string}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomFloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="reels" options={{ title: 'Reels', tabBarStyle: { display: 'none' } }} />
      <Tabs.Screen name="bihar" options={{ title: 'Bihar' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  floatingContainerWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    borderRadius: 16,
    elevation: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    zIndex: 999,
  },
  floatingContainer: {
    borderRadius: 16,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    borderWidth: 1.8,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  tabItemActive: {
    transform: [{ scale: 1.05 }],
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.7,
  },
  tabIconActive: {
    fontSize: 22,
    opacity: 1.0,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
  tabLabelActive: {
    fontWeight: 'bold',
  },
});

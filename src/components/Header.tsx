import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../theme/ThemeContext';
import { Typography } from './Typography';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  showSearch?: boolean;
  onSearchPress?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Bihar Explorer',
  subtitle = 'Discover the heart of India',
  showBack = false,
  onBackPress,
  showSearch = false,
  onSearchPress,
  rightAction,
}) => {
  const router = useRouter();
  const { colors: theme } = useTheme();
  const insets = useSafeAreaInsets();
  const topPadding = Math.max(
    insets.top,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44
  ) + 8;

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.navigationBackground,
        borderBottomColor: theme.border,
        paddingTop: topPadding,
      }
    ]}>
      <View style={styles.topRow}>
        <View style={styles.logoRow}>
          {showBack ? (
            <TouchableOpacity
              style={[
                styles.backBtn,
                {
                  backgroundColor: theme.overlayLight,
                  borderColor: theme.border,
                },
              ]}
              onPress={onBackPress || (() => router.back())}
              activeOpacity={0.7}
            >
              <Typography style={[styles.backIcon, { color: theme.accent }]}>◀</Typography>
            </TouchableOpacity>
          ) : (
            <View style={[styles.omBadge, { backgroundColor: theme.primary, borderColor: theme.accent }]}>
              <Typography variant="semiBold" style={[styles.omText, { color: theme.textWhite }]}>B</Typography>
            </View>
          )}

          <View style={styles.textColumn}>
            <Typography variant="semiBold" style={[styles.titleText, { color: theme.textWhite }]} numberOfLines={2}>{title}</Typography>
            {subtitle ? <Typography style={[styles.subtitleText, { color: theme.textWhite }]} numberOfLines={1}>{subtitle}</Typography> : null}
          </View>
        </View>

        <View style={styles.actionsRow}>
          {showSearch && (
            <TouchableOpacity style={styles.iconBtn} onPress={onSearchPress} activeOpacity={0.7}>
              <Typography style={styles.iconSymbol}>🔍</Typography>
            </TouchableOpacity>
          )}
          {rightAction}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backIcon: {
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    ...Platform.select({
      android: {
        includeFontPadding: false,
        transform: [{ translateX: -1 }],
      },
      ios: {
        lineHeight: 18,
        transform: [{ translateX: -1 }],
      },
      web: {
        lineHeight: 18,
        transform: [{ translateX: -1 }],
      },
    }),
  },
  omBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    overflow: 'hidden',
  },
  omText: {
    fontSize: 21,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 40
  },
  textColumn: {
    flex: 1,
    paddingRight: 6,
  },
  titleText: {
    fontSize: 20,
    letterSpacing: 0.5,
  },
  subtitleText: {
    fontSize: 11,
    opacity: 0.9,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconSymbol: {
    fontSize: 16,
  },
});

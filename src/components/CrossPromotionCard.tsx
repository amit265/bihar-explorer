import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Linking,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Typography } from './Typography';

type CrossPromotionCardProps = {
  titleHi: string;
  descHi: string;
  appIcon: ImageSourcePropType;
  storeUrl: string;
  badgeText?: string;
};

export function CrossPromotionCard({
  titleHi,
  descHi,
  appIcon,
  storeUrl,
  badgeText = 'महाव्योम स्टूडियो ऐप'
}: CrossPromotionCardProps) {
  const { colors: theme } = useTheme();

  const handlePress = () => {
    Linking.openURL(storeUrl).catch((err) => console.error('Failed to open URL', err));
  };

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border, shadowColor: theme.text }]} onPress={handlePress} activeOpacity={0.8}>
      <Image source={appIcon} style={[styles.appIconImage, { borderColor: theme.border }]} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Typography variant="semiBold" style={[styles.badge, { color: theme.secondary }]}>{badgeText}</Typography>
        <Typography variant="semiBold" style={[styles.title, { color: theme.text }]}>{titleHi}</Typography>
        <Typography style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
          {descHi}
        </Typography>
      </View>
      <View style={[styles.installBtn, { backgroundColor: theme.primary }]}>
        <Typography variant="semiBold" style={[styles.installBtnText, { color: theme.onPrimary }]}>देखें</Typography>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1
  },
  appIconImage: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8
  },
  badge: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2
  },
  title: {
    fontSize: 15,
  },
  description: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16
  },
  installBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16
  },
  installBtnText: {
    fontSize: 12
  }
});

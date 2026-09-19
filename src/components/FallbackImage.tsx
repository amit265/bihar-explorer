import React, { useState } from 'react';
import { View, Image, ImageBackground, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface FallbackImageProps {
  sourceUri?: string | null;
  style?: StyleProp<ImageStyle>;
  fallbackIcon?: keyof typeof Ionicons.glyphMap;
  fallbackColor?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export const FallbackImage = ({
  sourceUri,
  style,
  fallbackIcon = 'image-outline',
  fallbackColor,
  resizeMode = 'cover',
}: FallbackImageProps) => {
  const { colors: theme } = useTheme();
  const [hasError, setHasError] = useState(false);

  if (!sourceUri || hasError) {
    return (
      <View style={[styles.fallbackContainer, { backgroundColor: theme.border }, style]}>
        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name={fallbackIcon as any} size={24} color={fallbackColor || theme.textSecondary} />
        </View>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: sourceUri }}
      style={style}
      resizeMode={resizeMode}
      onError={() => setHasError(true)}
    />
  );
};

interface FallbackImageBackgroundProps extends FallbackImageProps {
  children?: React.ReactNode;
  imageStyle?: StyleProp<ImageStyle>;
}

export const FallbackImageBackground = ({
  sourceUri,
  style,
  imageStyle,
  fallbackIcon = 'image-outline',
  fallbackColor,
  resizeMode = 'cover',
  children,
}: FallbackImageBackgroundProps) => {
  const { colors: theme } = useTheme();
  const [hasError, setHasError] = useState(false);

  if (!sourceUri || hasError) {
    return (
      <View style={[styles.fallbackContainer, { backgroundColor: theme.border }, style]}>
        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name={fallbackIcon as any} size={24} color={fallbackColor || theme.textSecondary} />
        </View>
        {children}
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: sourceUri }}
      style={style}
      imageStyle={imageStyle}
      resizeMode={resizeMode}
      onError={() => setHasError(true)}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    overflow: 'hidden',
  },
});

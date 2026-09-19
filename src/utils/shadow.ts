import { Platform } from 'react-native';

/**
 * Returns platform-appropriate shadow styles.
 * - iOS/Android: uses React Native shadowColor/elevation props
 * - Web: uses CSS boxShadow to avoid deprecation warnings
 */
export function shadow(
  color = '#000',
  offsetX = 0,
  offsetY = 4,
  blurRadius = 8,
  opacity = 0.12,
  elevation = 4,
): object {
  if (Platform.OS === 'web') {
    return {
      boxShadow: `${offsetX}px ${offsetY}px ${blurRadius}px rgba(0,0,0,${opacity})`,
    };
  }
  return {
    shadowColor: color,
    shadowOffset: { width: offsetX, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: blurRadius,
    elevation,
  };
}

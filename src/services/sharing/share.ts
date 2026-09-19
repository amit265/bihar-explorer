import { Share, Platform } from 'react-native';

export async function shareText(title: string, message: string) {
  try {
    if (Platform.OS === 'web' && (typeof navigator === 'undefined' || !navigator.share)) {
      // Fallback for browsers that do not support navigator.share
      alert(`${title}\n${message}`);
      return;
    }
    await Share.share({
      title,
      message,
    });
  } catch (error) {
    console.warn('Sharing failed:', error);
  }
}

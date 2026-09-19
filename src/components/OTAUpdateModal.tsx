import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Typography } from './Typography';

export function OTAUpdateModal() {
  const { colors } = useTheme();
  const [dismissed, setDismissed] = useState(false);

  // Safely call useUpdates (it works on native, gracefully falls back on web)
  const { isUpdatePending } = Updates.useUpdates();

  const handleRestart = async () => {
    try {
      await Updates.reloadAsync();
    } catch (e) {
      console.warn('Failed to restart app:', e);
      setDismissed(true); // Fallback
    }
  };

  const handleLater = () => {
    setDismissed(true);
  };

  // Only show if there's an update ready to apply, user hasn't dismissed, and we are not on web/dev
  if (!isUpdatePending || dismissed || Platform.OS === 'web' || __DEV__) {
    return null;
  }

  return (
    <Modal visible={true} animationType="fade" transparent onRequestClose={handleLater}>
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          {/* Header strip */}
          <View style={[styles.header, { backgroundColor: colors.primary }]}>
            <Ionicons name="cloud-download" size={36} color={colors.onPrimary} style={{ marginBottom: 4 }} />
            <Typography variant="semiBold" style={[styles.headerTitle, { color: colors.onPrimary }]}>नया अपडेट उपलब्ध है!</Typography>
            <Typography variant="regular" style={[styles.headerSub, { color: colors.onPrimary }]}>New Update Available</Typography>
          </View>

          <View style={styles.body}>
            <Typography variant="regular" style={[styles.message, { color: colors.text }]}>
              ऐप का नया वर्ज़न डाउनलोड हो गया है। बेहतरीन अनुभव के लिए ऐप को अभी रीस्टार्ट करें।
            </Typography>

            <Pressable
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={handleRestart}
            >
              <Ionicons name="refresh" size={18} color={colors.onPrimary} style={{ marginRight: 6 }} />
              <Typography variant="semiBold" style={[styles.primaryButtonText, { color: colors.onPrimary }]}>अभी रीस्टार्ट करें (Restart Now)</Typography>
            </Pressable>

            <Pressable style={styles.dismissButton} onPress={handleLater}>
              <Typography variant="medium" style={[styles.dismissText, { color: colors.textSecondary }]}>
                बाद में (Later)
              </Typography>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 24,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  header: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    textAlign: 'center',
  },
  headerSub: {
    fontSize: typography.sizes.sm,
    opacity: 0.8,
    textAlign: 'center',
  },
  body: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  message: {
    fontSize: typography.sizes.md,
    lineHeight: 22,
    textAlign: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 14,
  },
  primaryButtonText: {
    fontSize: typography.sizes.md,
  },
  dismissButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  dismissText: {
    fontSize: typography.sizes.md,
  },
});

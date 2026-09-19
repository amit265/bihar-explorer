import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Typography } from './Typography';

type SeoPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel?: string;
  ctaRoute?: string;
  children?: React.ReactNode;
};

export function SeoPage(props: SeoPageProps) {
  const { eyebrow, title, description, bullets, ctaLabel = 'View Calendar', ctaRoute = '/calendar', children } = props;
  const router = useRouter();
  const { colors: theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} contentContainerStyle={styles.content}>
      <View style={[styles.hero, { backgroundColor: theme.badgeBackground }]}>
        <Typography variant="semiBold" style={[styles.eyebrow, { color: theme.primary }]}>{eyebrow}</Typography>
        <Typography variant="semiBold" style={[styles.title, { color: theme.primaryDark }]}>{title}</Typography>
        <Typography style={[styles.description, { color: theme.text }]}>{description}</Typography>
        <Pressable style={[styles.cta, { backgroundColor: theme.primary }]} onPress={() => router.push(ctaRoute as any)}>
          <Typography variant="semiBold" style={[styles.ctaText, { color: theme.onPrimary }]}>{ctaLabel}</Typography>
        </Pressable>
      </View>

      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>What you get</Typography>
        {bullets.map((bullet) => (
          <Typography key={bullet} style={[styles.bullet, { color: theme.text }]}>
            • {bullet}
          </Typography>
        ))}
      </View>

      {children}

      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Typography variant="semiBold" style={[styles.sectionTitle, { color: theme.text }]}>Why install the app</Typography>
        <Typography style={[styles.body, { color: theme.text }]}>Get offline access, faster calendar browsing, reminder settings, and a more complete Hindi-first experience on Android and iPhone.</Typography>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
  hero: {
    borderRadius: 24,
    padding: spacing.lg,
  },
  eyebrow: {
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.xl,
  },
  description: {
    fontSize: typography.sizes.md,
    marginTop: spacing.sm,
    lineHeight: 24,
  },
  cta: {
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  ctaText: {
  },
  card: {
    borderRadius: 18,
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    marginBottom: spacing.sm,
  },
  bullet: {
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  body: {
    lineHeight: 22,
  },
});

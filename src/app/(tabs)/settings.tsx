import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Linking,
  StatusBar,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useTheme } from '../../theme/ThemeContext';
import { CrossPromotionCard } from '../../components/CrossPromotionCard';
import { APP_LINKS } from '../../constants/links';
import { Typography } from '../../components/Typography';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../i18n/translations';

export default function MoreScreen() {
  const router = useRouter();
  const { colors: theme, theme: themeMode, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(true);

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: t('shareAppMessage', language),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const openUrl = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />
      
      <View style={styles.header}>
        <Typography variant="semiBold" style={[styles.title, { color: theme.text }]}>{t('settingsTitle', language)}</Typography>
        <Typography variant="medium" style={[styles.subtitle, { color: theme.textSecondary }]}>{t('settingsSubtitle', language)}</Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Settings Group */}
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
          <Typography variant="semiBold" style={[styles.sectionHeader, { color: theme.primaryDark }]}>{t('settingsSection', language)}</Typography>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="notifications-outline" size={20} color={theme.primary} />
              <Typography variant="medium" style={[styles.rowText, { color: theme.text }]}>{t('travelReminders', language)}</Typography>
            </View>
            <Switch
              value={remindersEnabled}
              onValueChange={setRemindersEnabled}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.textWhite}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name={themeMode === 'dark' ? "moon" : "sunny"} size={20} color={theme.primary} />
              <Typography variant="medium" style={[styles.rowText, { color: theme.text }]}>{t('darkMode', language)}</Typography>
            </View>
            <Switch
              value={themeMode === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.textWhite}
            />
          </View>

          <TouchableOpacity style={styles.rowBtn} onPress={toggleLanguage} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <Ionicons name="language-outline" size={20} color={theme.primary} />
              <Typography style={[styles.rowText, { color: theme.text }]}>{t('language', language)}</Typography>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="semiBold" style={{ color: theme.primary, marginRight: 8 }}>{language === 'hi' ? 'हिंदी' : 'English'}</Typography>
              <Ionicons name="sync" size={16} color={theme.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Share & Feedback */}
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
          <Typography style={[styles.sectionHeader, { color: theme.primaryDark }]}>{t('supportShare', language)}</Typography>

          <TouchableOpacity style={styles.rowBtn} onPress={handleShareApp} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <Ionicons name="share-social-outline" size={20} color={theme.primary} />
              <Typography style={[styles.rowText, { color: theme.text }]}>{t('shareApp', language)}</Typography>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rowBtn}
            onPress={() => openUrl('https://play.google.com/store/apps/details?id=com.mahavyomastudio.biharexplorer')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="star-outline" size={20} color={theme.primary} />
              <Typography style={[styles.rowText, { color: theme.text }]}>{t('rateApp', language)}</Typography>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Mahavyoma Sister Apps Cross Promotion with App Icons */}
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
          <Typography style={[styles.sectionHeader, { color: theme.primaryDark }]}>{t('otherApps', language)}</Typography>

          <CrossPromotionCard
            titleHi="ठाकुर प्रसाद कैलेंडर 2027"
            descHi="संपूर्ण पंचांग, शुभ मुहूर्त, राहुकाल एवं चौघड़िया"
            appIcon={require('../../../assets/images/promo/thakur_prasad_icon.png')}
            storeUrl="https://play.google.com/store/apps/details?id=com.mahavyomastudio.hindicalendar"
          />

          <CrossPromotionCard
            titleHi="शिव चर्चा (Shiv Charcha)"
            descHi="शिव भजन, मंत्र, चालीसा एवं 108 जाप काउंटर"
            appIcon={require('../../../assets/images/promo/shiv_charcha_icon.png')}
            storeUrl="https://play.google.com/store/apps/details?id=com.mahavyomastudio.shivcharcha"
          />
        </View>

        {/* About & Legal */}
        <View style={[styles.sectionCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
          <Typography style={[styles.sectionHeader, { color: theme.primaryDark }]}>{t('legalPrivacy', language)}</Typography>

          <TouchableOpacity
            style={styles.rowBtn}
            onPress={() => router.push('/legal/privacy')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color={theme.primary} />
              <Typography style={[styles.rowText, { color: theme.text }]}>{t('privacyPolicy', language)}</Typography>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rowBtn}
            onPress={() => router.push('/legal/terms')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="document-text-outline" size={20} color={theme.primary} />
              <Typography style={[styles.rowText, { color: theme.text }]}>{t('termsOfService', language)}</Typography>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.footerInfo}>
          <Typography variant="semiBold" style={[styles.appVersion, { color: theme.textSecondary }]}>Bihar Explorer • Version 1.0.0</Typography>
          <Typography style={[styles.copyright, { color: theme.textSecondary }]}>© 2026 Mahavyoma Studio.</Typography>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 16,
    paddingTop: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  content: { padding: 16, paddingBottom: 130 },
  sectionCard: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    elevation: 1,
  },
  sectionHeader: { fontSize: 13, fontWeight: 'bold', marginBottom: 12, textTransform: 'uppercase' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  rowBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'transparent' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowText: { fontSize: 15, marginLeft: 10, fontWeight: '500' },
  footerInfo: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  appVersion: { fontSize: 13, fontWeight: '600' },
  copyright: { fontSize: 12, marginTop: 4 },
});

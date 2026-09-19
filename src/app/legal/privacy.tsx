import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { useTheme } from '../../theme/ThemeContext';
import { APP_LINKS } from '../../constants/links';

export default function PrivacyScreen() {
  const { colors: theme, theme: themeMode } = useTheme();

  const openWebPolicy = () => {
    Linking.openURL(APP_LINKS.privacyPolicyUrl).catch((err) =>
      console.error('Could not open privacy policy URL:', err)
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.navigationBackground} />
      <Header title="गोपनीयता नीति" subtitle="Privacy Policy • व्रत साथी" showBack />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
          <Text style={[styles.badge, { backgroundColor: theme.primary, color: theme.textWhite }]}>
            🔒 डेटा सुरक्षा व गोपनीयता
          </Text>

          <Text style={[styles.heading, { color: theme.primaryDark }]}>
            गोपनीयता नीति (Privacy Policy)
          </Text>

          <Text style={[styles.subtext, { color: theme.textSecondary }]}>
            ऐप पैकेज: com.mahavyomastudio.biharexplorer {'\n'}
            डेवलपर: Mahavyoma Studio (महाव्योम) {'\n'}
            अंतिम अपडेट: सितंबर 2026
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>1. डेटा सुरक्षा एवं प्रतिबद्धता</Text>
            <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
              महाव्योम स्टूडियो (Mahavyoma Studio) आपके डेटा की गोपनीयता का पूरा सम्मान करता है। व्रत साथी ऐप एक ऑफ़लाइन-फर्स्ट सनातन व्रत, उपवास एवं कथा निर्देशिका है। हम आपका व्यक्तिगत डेटा (जैसे नाम, ईमेल, फोन नंबर, संपर्क या लोकेशन) एकत्र या किसी तीसरे पक्ष को बेचे बिना कार्य करते हैं।
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>2. स्थानीय डेटा संग्रहण (On-Device Storage)</Text>
            <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
              आपकी ऐप सेटिंग्स एवं पसंदीदा व्रत सूचियाँ केवल आपके मोबाइल डिवाइस में local storage (AsyncStorage) में सुरक्षित रखी जाती हैं:
            </Text>
            <Text style={[styles.bulletPoint, { color: theme.textSecondary }]}>• पसंदीदा व्रत, एकादशी व कथा बुकमार्क</Text>
            <Text style={[styles.bulletPoint, { color: theme.textSecondary }]}>• व्रत रिमाइंडर अलार्म सेटिंग्स</Text>
            <Text style={[styles.bulletPoint, { color: theme.textSecondary }]}>• ऑडियो प्लेबैक एवं थीम प्रेफरेंस</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>3. विश्लेषिकी एवं विज्ञापन (AdMob & Firebase)</Text>
            <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
              ऐप को सभी भक्तों के लिए 100% निःशुल्क बनाए रखने हेतु गूगल एडमॉब (Google AdMob) एवं फ़ायरबेस एनालिटिक्स SDK का उपयोग किया जाता है। ये मानक Google SDKs गैर-व्यक्तिगत डिवाइस पहचानकर्ता (Android Advertising ID) एकत्र कर सकते हैं।
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>4. संपर्क एवं सहायता</Text>
            <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
              यदि आपके पास इस गोपनीयता नीति या व्रत साथी ऐप से संबंधित कोई प्रश्न या सुझाव है, तो कृपया हमें ईमेल करें:
            </Text>
            <Text style={[styles.emailText, { color: theme.primary }]}>support@mahavyomastudio.com</Text>
          </View>

          <TouchableOpacity style={[styles.webBtn, { backgroundColor: theme.primary }]} onPress={openWebPolicy} activeOpacity={0.8}>
            <Ionicons name="globe-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.webBtnText}>वेबसाइट पर पूरी नीति देखें</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  card: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 18,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 21,
  },
  bulletPoint: {
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 8,
    marginTop: 3,
  },
  emailText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
  webBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 12,
  },
  webBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

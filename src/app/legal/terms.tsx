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

export default function TermsScreen() {
  const { colors: theme, theme: themeMode } = useTheme();

  const openWebTerms = () => {
    Linking.openURL(APP_LINKS.termsOfServiceUrl).catch((err) =>
      console.error('Could not open terms of service URL:', err)
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.navigationBackground} />
      <Header title="सेवा शर्तें" subtitle="Terms of Service • व्रत साथी" showBack />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
          <Text style={[styles.badge, { backgroundColor: theme.primary, color: theme.textWhite }]}>
            📄 कानूनी नियम व शर्तें
          </Text>

          <Text style={[styles.heading, { color: theme.primaryDark }]}>
            सेवा शर्तें (Terms of Service)
          </Text>

          <Text style={[styles.subtext, { color: theme.textSecondary }]}>
            ऐप पैकेज: com.mahavyomastudio.biharexplorer {'\n'}
            डेवलपर: Mahavyoma Studio (महाव्योम) {'\n'}
            अंतिम अपडेट: सितंबर 2026
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>1. शर्तों की स्वीकृति</Text>
            <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
              व्रत साथी (Bihar Explorer) मोबाइल ऐप का उपयोग या डाउनलोड करके, आप इन सेवा शर्तों से सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया ऐप का उपयोग न करें।
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>2. आध्यात्मिक एवं व्यक्तिगत उपयोग</Text>
            <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
              यह ऐप व्यक्तिगत, गैर-व्यावसायिक, धार्मिक एवं शैक्षणिक उद्देश्यों के लिए प्रदान किया गया है। आप ऐप सामग्री (जैसे व्रत कथाएँ, पूजा विधि, नियम एवं मंत्र) का उपयोग श्रद्धा एवं आदर भाव के साथ करने के लिए सहमत हैं।
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>3. सर्वाधिकार एवं कॉपीराइट</Text>
            <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
              समस्त पौराणिक व्रत कथाएँ, स्तोत्र, आरती एवं मंत्र सनातन धर्मशास्त्रों व सार्वजनिक डोमेन पर आधारित हैं। ऐप का डिज़ाइन, यूजर इंटरफेस (UI), कोड एवं लोगो Mahavyoma Studio की बौद्धिक संपदा (Intellectual Property) हैं।
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>4. सटीकता का अस्वीकरण (Disclaimer)</Text>
            <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
              हालाँकि हम व्रत तिथियों, पूजा सामग्री सूची एवं विधि की सटीकता हेतु पूरा प्रयास करते हैं, क्षेत्रीय एवं पंचांगीय विविधताओं के कारण मामूली अंतर हो सकते हैं। ऐप सामग्री केवल मार्गदर्शन हेतु है।
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>5. संपर्क एवं सहायता</Text>
            <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
              कानूनी प्रश्नों या सुझावों हेतु संपर्क करें:
            </Text>
            <Text style={[styles.emailText, { color: theme.primary }]}>support@mahavyomastudio.com</Text>
          </View>

          <TouchableOpacity style={[styles.webBtn, { backgroundColor: theme.primary }]} onPress={openWebTerms} activeOpacity={0.8}>
            <Ionicons name="globe-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.webBtnText}>वेबसाइट पर पूरी शर्तें देखें</Text>
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

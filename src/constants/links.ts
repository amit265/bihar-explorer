/**
 * Centralized Application & Studio Links Constants for Bihar Explorer
 * Follows Shiv Charcha (latest Mahavyoma reference app) standards
 */

export const APP_CONFIG = {
  appName: 'Bihar Explorer',
  appNameShort: 'Bihar Explorer',
  appNameHindi: 'बिहार एक्सप्लोरर: यात्रा गाइड',
  packageName: 'com.mahavyomastudio.biharexplorer',
  version: '1.0.0',
  buildNumber: 100,
  developerName: 'Mahavyoma Studio',
  supportEmail: 'support@mahavyomastudio.com',
} as const;

export const APP_LINKS = {
  // Official Website Domains & Deep Linking
  studioWebsite: 'https://mahavyomastudio.com',
  appLandingPage: 'https://mahavyomastudio.com/apps/bihar-explorer',
  deepLinkScheme: 'biharexplorer://',

  // Google Play Store Links
  playStoreUrl: `https://play.google.com/store/apps/details?id=${APP_CONFIG.packageName}`,
  playStoreSearchBase: 'https://play.google.com/store/search?q=Mahavyoma+Studio',
  publisherUrl: 'https://play.google.com/store/apps/developer?id=Mahavyoma+Studio',

  // Legal & Policy Web Links (Shiv Charcha Latest Pattern)
  privacyPolicyUrl: 'https://mahavyomastudio.com/legal/bihar-explorer-privacy',
  termsOfServiceUrl: 'https://mahavyomastudio.com/legal/bihar-explorer-terms',
  supportPageUrl: 'https://mahavyomastudio.com/support',

  // Remote Manifest for In-App Updates
  versionJsonUrl: 'https://mahavyomastudio.com/apps/bihar-explorer/version.json',
  assetLinksJsonUrl: 'https://mahavyomastudio.com/.well-known/assetlinks.json',
} as const;

export const CROSS_PROMO_APPS = [
  {
    id: 'hindi-calendar-2027',
    title: 'Hindi Calendar 2027: Panchang',
    titleHindi: 'हिंदी कैलेंडर 2027 - पंचांग',
    descriptionHindi: 'ठाकुर प्रसाद पंचांग स्टाइल कैलेंडर, 20-शहर पंचांग एवं व्रत तिथियाँ',
    url: 'https://play.google.com/store/apps/details?id=com.mahavyomastudio.hindicalendar',
    icon: '📅',
    badgeText: 'Live',
  },
  {
    id: 'shiv-charcha',
    title: 'Shiv Charcha: Shiv Guru Sadhana',
    titleHindi: 'शिव चर्चा - शिव गुरु साधना',
    descriptionHindi: 'शिव भजन, मंत्र, चालीसा एवं 108 जाप काउंटर',
    url: 'https://play.google.com/store/apps/details?id=com.mahavyomastudio.shivcharcha',
    icon: '🔱',
    badgeText: 'Live',
  },
] as const;

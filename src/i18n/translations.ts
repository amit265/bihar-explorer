import { Language } from '../context/LanguageContext';

export const dictionaries = {
  en: {
    // Tabs
    tabHome: 'Home',
    tabExplore: 'Explore',
    tabSaved: 'Saved',
    tabSettings: 'Settings',

    // Home Screen
    appTitle: 'Bihar Explorer',
    homeSubtitle: 'Start exploring Bihar',
    searchPlaces: 'Search places...',
    exploreBihar: 'Explore Bihar',
    discoverHeart: 'Discover the heart of India',
    exploreByDistrict: 'Explore by District',
    popularPlaces: 'Popular Places',
    exploreByCategory: 'Explore by Category',
    religious: 'Religious',
    history: 'History',
    nature: 'Nature',
    waterfall: 'Waterfall',
    places: 'places',

    // Explore Screen
    tabDistricts: 'Districts',
    tabPlaces: 'Places',
    tabCategories: 'Categories',
    searchDistricts: 'Search districts...',
    districtsCount: 'Districts',

    // Saved Screen
    savedPlaces: 'Saved Places',
    savedSubtitle: 'Your travel bucket list',
    noSavedPlaces: 'No saved places yet',
    noSavedSub: 'Places you save will appear here for quick access.',

    // Settings Screen
    settingsTitle: 'Settings',
    settingsSubtitle: 'Preferences and info',
    settingsSection: 'Settings',
    travelReminders: 'Travel Reminders',
    darkMode: 'Dark Mode',
    language: 'Language (भाषा)',
    supportShare: 'Support & Share',
    shareApp: 'Share App',
    rateApp: 'Rate on Play Store',
    otherApps: 'Our Other Sanatan Apps',
    legalPrivacy: 'Legal & Privacy',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    view: 'View',

    // Place & District Screen
    districtSuffix: 'District',
    explorePlacesCount: 'Explore {count} places',
    historyTitle: 'History & Significance',
    howToReach: 'How to Reach',
    byAir: 'By Air',
    byTrain: 'By Train',
    byRoad: 'By Road',

    // New additions for Dual-Language Audit
    aiPlannerTitle: 'AI Journey Planner',
    aiPlannerSubtitle: 'Generate a custom itinerary with Groq AI',
    viewAll: 'View All',
    loadingMap: 'Loading map data...',
    save: 'Save',
    saved: 'Saved',
    share: 'Share',
    quizTitle: 'Test your Knowledge',
    quizSubtitle: 'Take the Bihar Heritage Quiz',
    takeQuizBtn: 'Take Quiz',
    themesTrails: 'Themes & Trails',
    themesSubtitle: 'Start exploring curated experiences',
    aiInputPlaceholder: 'Where would you like to go?',
    aiGreeting: "🙏 **Namaste!** I'm your Bihar travel guide.\n\nAsk me anything — *spirituality, history, nature, adventure* — and I'll recommend real places from the app for you to explore!",
    aiApiKeyRequired: "🔑 **API Key Required**\n\nTo use AI features, you need a **free Groq API key**. It takes 2 minutes to set up!\n\n[⚙️ Set up API Key](/settings)",
    aiPrompts: [
      'Best places for a weekend?',
      'Top Buddhist sites',
      'Hidden gems & offbeat spots',
      'Best time to visit Bihar',
      'Suggest a 3-day itinerary',
    ],
    shareAppMessage: '🌸 Bihar Explorer — Detailed guide to the tourist destinations and heritage of Bihar.\n\nDownload from Google Play Store: https://play.google.com/store/apps/details?id=com.mahavyomastudio.biharexplorer',
  },
  hi: {
    // Tabs
    tabHome: 'होम',
    tabExplore: 'खोजें',
    tabSaved: 'सेव्ड',
    tabSettings: 'सेटिंग',

    // Home Screen
    appTitle: 'बिहार दर्शन: यात्रा और ज्ञान',
    homeSubtitle: 'बिहार घूमना शुरू करें',
    searchPlaces: 'स्थान खोजें...',
    exploreBihar: 'बिहार एक्सप्लोर करें',
    discoverHeart: 'भारत के हृदय को जानें',
    exploreByDistrict: 'ज़िले के अनुसार खोजें',
    popularPlaces: 'प्रसिद्ध स्थान',
    exploreByCategory: 'श्रेणी के अनुसार खोजें',
    religious: 'धार्मिक',
    history: 'ऐतिहासिक',
    nature: 'प्राकृतिक',
    waterfall: 'जलप्रपात',
    places: 'स्थान',

    // Explore Screen
    tabDistricts: 'ज़िले',
    tabPlaces: 'स्थान',
    tabCategories: 'श्रेणियाँ',
    searchDistricts: 'ज़िले खोजें...',
    districtsCount: 'ज़िले',

    // Saved Screen
    savedPlaces: 'सेव किए गए स्थान',
    savedSubtitle: 'आपकी यात्रा सूची',
    noSavedPlaces: 'कोई स्थान सेव नहीं किया गया',
    noSavedSub: 'आपके द्वारा सेव किए गए स्थान यहाँ दिखाई देंगे।',

    // Settings Screen
    settingsTitle: 'सेटिंग',
    settingsSubtitle: 'प्राथमिकताएं और जानकारी',
    settingsSection: 'सेटिंग',
    travelReminders: 'यात्रा अनुस्मारक',
    darkMode: 'डार्क मोड',
    language: 'Language (भाषा)',
    supportShare: 'समर्थन और साझा करें',
    shareApp: 'ऐप साझा करें',
    rateApp: 'प्ले स्टोर पर रेट करें',
    otherApps: 'हमारे अन्य सनातन ऐप्स',
    legalPrivacy: 'कानूनी और गोपनीयता',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    view: 'देखें',

    // Place & District Screen
    districtSuffix: 'ज़िला',
    explorePlacesCount: '{count} स्थान खोजें',
    historyTitle: 'इतिहास एवं महत्व',
    howToReach: 'कैसे पहुंचें',
    byAir: 'हवाई मार्ग से',
    byTrain: 'रेल मार्ग से',
    byRoad: 'सड़क मार्ग से',

    // New additions for Dual-Language Audit
    aiPlannerTitle: 'AI यात्रा योजनाकार',
    aiPlannerSubtitle: 'Groq AI के साथ एक अनुकूलित यात्रा कार्यक्रम बनाएं',
    viewAll: 'सभी देखें',
    loadingMap: 'मानचित्र डेटा लोड हो रहा है...',
    save: 'सेव',
    saved: 'सेव्ड',
    share: 'साझा करें',
    quizTitle: 'अपने ज्ञान का परीक्षण करें',
    quizSubtitle: 'बिहार विरासत प्रश्नोत्तरी में भाग लें',
    takeQuizBtn: 'क्विज़ शुरू करें',
    themesTrails: 'थीम और ट्रेल्स',
    themesSubtitle: 'क्यूरेटेड अनुभवों की खोज शुरू करें',
    aiInputPlaceholder: 'आप कहाँ जाना चाहेंगे?',
    aiGreeting: "🙏 **नमस्ते!** मैं आपका बिहार टूरिज्म गाइड हूँ।\n\nमुझसे कुछ भी पूछें — *अध्यात्म, इतिहास, प्रकृति, रोमांच* — और मैं आपको घूमने के लिए ऐप से वास्तविक स्थानों की सिफारिश करूँगा!",
    aiApiKeyRequired: "🔑 **API कुंजी आवश्यक**\n\nAI सुविधाओं का उपयोग करने के लिए, आपको एक **मुफ़्त Groq API कुंजी** की आवश्यकता है। इसे सेट करने में 2 मिनट लगते हैं!\n\n[⚙️ API कुंजी सेट करें](/settings)",
    aiPrompts: [
      'वीकेंड के लिए सबसे अच्छी जगहें?',
      'शीर्ष बौद्ध स्थल',
      'अनदेखी जगहें',
      'बिहार घूमने का सबसे अच्छा समय',
      '3-दिवसीय यात्रा का सुझाव दें',
    ],
    shareAppMessage: '🌸 बिहार दर्शन: यात्रा और ज्ञान (Bihar Explorer) — बिहार के पर्यटन स्थल और धरोहर की विस्तृत जानकारी।\n\nगूगल प्ले स्टोर से डाउनलोड करें: https://play.google.com/store/apps/details?id=com.mahavyomastudio.biharexplorer',
  }
};

export type TranslationKey = keyof typeof dictionaries.en;

export function t(key: TranslationKey, lang: Language, params?: Record<string, string | number>): any {
  let text: any = dictionaries[lang][key] || dictionaries.en[key] || key;
  
  if (params && typeof text === 'string') {
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, String(params[param]));
    });
  }
  
  return text;
}

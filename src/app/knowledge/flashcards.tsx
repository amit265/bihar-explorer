import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { BiharKnowledgeData } from '../../data/bihar-knowledge';

function AnimatedFlashcard({ question, answer, theme, language }: { question: string, answer: string, theme: any, language: string }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsFlipped(false);
    flipAnim.setValue(0);
  }, [question]);

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnim, { toValue: 0, friction: 8, tension: 10, useNativeDriver: true }).start();
    } else {
      Animated.spring(flipAnim, { toValue: 180, friction: 8, tension: 10, useNativeDriver: true }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }], position: 'absolute' as const, top: 0, bottom: 0, left: 0, right: 0 };

  return (
    <View style={styles.cardWrapper}>
      {/* FRONT */}
      <Animated.View style={[styles.cardSurface, { backgroundColor: theme.cardBackground, borderColor: theme.border }, frontAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ width: '100%', marginBottom: 16 }}>
          <Typography variant="semiBold" style={{ color: theme.primary, marginBottom: 12, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }}>
            {language === 'hi' ? 'प्रश्न' : 'Question'}
          </Typography>
          <Typography variant="semiBold" style={{ color: theme.text, fontSize: 24, textAlign: 'center', lineHeight: 34 }}>
            {question}
          </Typography>
        </ScrollView>
        <TouchableOpacity style={styles.flipBtn} onPress={flipCard} activeOpacity={0.7}>
          <Ionicons name="sync-outline" size={20} color={theme.textSecondary} style={{ marginRight: 8 }} />
          <Typography style={{ color: theme.textSecondary, fontSize: 14 }}>
            {language === 'hi' ? 'उत्तर देखने के लिए पलटने' : 'Tap to flip'}
          </Typography>
        </TouchableOpacity>
      </Animated.View>

      {/* BACK */}
      <Animated.View style={[styles.cardSurface, { backgroundColor: theme.primary, borderColor: theme.primary }, backAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ width: '100%', marginBottom: 16 }}>
          <Typography variant="semiBold" style={{ color: theme.onPrimary, marginBottom: 12, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.8, textAlign: 'center' }}>
            {language === 'hi' ? 'उत्तर' : 'Answer'}
          </Typography>
          <Typography variant="medium" style={{ color: theme.onPrimary, fontSize: 18, textAlign: 'center', lineHeight: 28 }}>
            {answer}
          </Typography>
        </ScrollView>
        <TouchableOpacity style={[styles.flipBtn, { backgroundColor: 'rgba(255,255,255,0.1)' }]} onPress={flipCard} activeOpacity={0.7}>
          <Ionicons name="sync-outline" size={20} color={theme.onPrimary} style={{ marginRight: 8 }} />
          <Typography style={{ color: theme.onPrimary, fontSize: 14 }}>
            {language === 'hi' ? 'वापस पलटें' : 'Flip back'}
          </Typography>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default function FlashcardsScreen() {
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();
  
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  // Extract facts for flashcards
  const getFlashcards = () => {
    const cards: any[] = [];
    if (BiharKnowledgeData.basics?.facts) {
      cards.push(...BiharKnowledgeData.basics.facts.map((f: any) => ({
        q: { en: f.title?.en || f.name?.en || f.id, hi: f.title?.hi || f.name?.hi || f.id },
        a: { en: f.description?.en || f.details?.en, hi: f.description?.hi || f.details?.hi }
      })));
    }
    if (BiharKnowledgeData.history?.ancient) {
      cards.push(...BiharKnowledgeData.history.ancient.slice(0, 5).map((f: any) => ({
        q: { en: `Who/What is ${f.name?.en || f.id}?`, hi: `${f.name?.hi || f.id} कौन/क्या है?` },
        a: { en: f.description?.en, hi: f.description?.hi }
      })));
    }
    return cards.length > 0 ? cards : [{ q: {en: "No data", hi: "कोई डेटा नहीं"}, a: {en: "Sync required", hi: "सिंक आवश्यक"} }];
  };

  const flashcards = getFlashcards();
  const currentCard = flashcards[flashcardIndex];

  const handleNextCard = () => {
    setFlashcardIndex((prev) => (prev + 1) % flashcards.length);
  };
  
  const handlePrevCard = () => {
    setFlashcardIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.surface} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Typography variant="semiBold" style={[styles.headerTitle, { color: theme.text }]}>
          {language === 'hi' ? 'फ्लैशकार्ड' : 'Study Flashcards'}
        </Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
        <View style={styles.flashcardContainer}>
          <Typography style={{textAlign: 'center', marginBottom: 24, color: theme.textSecondary, fontSize: 16}}>
            {language === 'hi' ? 'कार्ड' : 'Card'} {flashcardIndex + 1} of {flashcards.length}
          </Typography>

          <AnimatedFlashcard 
            question={currentCard.q[language]} 
            answer={currentCard.a[language]} 
            theme={theme} 
            language={language}
          />

          <View style={styles.flashcardControls}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1 }]} onPress={handlePrevCard}>
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnPrimary, { backgroundColor: theme.primary }]} onPress={handleNextCard}>
              <Typography variant="semiBold" style={{ color: theme.onPrimary, marginRight: 8, fontSize: 16 }}>
                {language === 'hi' ? 'अगला कार्ड' : 'Next Card'}
              </Typography>
              <Ionicons name="arrow-forward" size={20} color={theme.onPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E0D6',
  },
  backBtn: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
  },
  flashcardContainer: {
    padding: 24,
    paddingTop: 40,
    flex: 1,
  },
  cardWrapper: {
    height: 400,
    width: '100%',
  },
  cardSurface: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
  },
  flipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 24,
    width: '100%',
  },
  flashcardControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    gap: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  btnPrimary: {
    flex: 1,
  }
});

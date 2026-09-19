import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../components/Typography';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const QUIZ_QUESTIONS = [
  {
    q: { en: 'What is the capital of Bihar?', hi: 'बिहार की राजधानी क्या है?' },
    options: [{ en: 'Gaya', hi: 'गया' }, { en: 'Patna', hi: 'पटना' }, { en: 'Bhagalpur', hi: 'भागलपुर' }, { en: 'Muzaffarpur', hi: 'मुज़फ़्फ़रपुर' }],
    correctIndex: 1,
  },
  {
    q: { en: 'Which ancient universities were located in Bihar?', hi: 'बिहार में कौन से प्राचीन विश्वविद्यालय स्थित थे?' },
    options: [{ en: 'Taxila', hi: 'तक्षशिला' }, { en: 'Nalanda', hi: 'नालंदा' }, { en: 'Vikramashila', hi: 'विक्रमशिला' }, { en: 'Nalanda & Vikramashila', hi: 'नालंदा और विक्रमशिला दोनों' }],
    correctIndex: 3,
  },
  {
    q: { en: 'When was the modern state of Bihar formed?', hi: 'आधुनिक बिहार राज्य का गठन कब हुआ था?' },
    options: [{ en: '22 March 1912', hi: '22 मार्च 1912' }, { en: '15 August 1947', hi: '15 अगस्त 1947' }, { en: '26 January 1950', hi: '26 जनवरी 1950' }, { en: '1 April 1936', hi: '1 अप्रैल 1936' }],
    correctIndex: 0,
  },
  {
    q: { en: 'Who was the first Chief Minister of Bihar?', hi: 'बिहार के पहले मुख्यमंत्री कौन थे?' },
    options: [{ en: 'Nitish Kumar', hi: 'नीतीश कुमार' }, { en: 'Lalu Prasad Yadav', hi: 'लालू प्रसाद यादव' }, { en: 'Sri Krishna Sinha', hi: 'श्री कृष्ण सिन्हा' }, { en: 'Dr. Rajendra Prasad', hi: 'डॉ. राजेंद्र प्रसाद' }],
    correctIndex: 2,
  },
  {
    q: { en: 'Which famous festival is strictly dedicated to the Sun God?', hi: 'कौन सा प्रसिद्ध त्योहार मुख्य रूप से सूर्य देव को समर्पित है?' },
    options: [{ en: 'Diwali', hi: 'दीपावली' }, { en: 'Chhath Puja', hi: 'छठ पूजा' }, { en: 'Makar Sankranti', hi: 'मकर संक्रांति' }, { en: 'Holi', hi: 'होली' }],
    correctIndex: 1,
  },
  {
    q: { en: 'In which district is the Mahabodhi Temple located?', hi: 'महाबोधि मंदिर किस जिले में स्थित है?' },
    options: [{ en: 'Patna', hi: 'पटना' }, { en: 'Nalanda', hi: 'नालंदा' }, { en: 'Gaya', hi: 'गया' }, { en: 'Vaishali', hi: 'वैशाली' }],
    correctIndex: 2,
  },
  {
    q: { en: 'Which river is known as the "Sorrow of Bihar"?', hi: 'किस नदी को "बिहार का शोक" कहा जाता है?' },
    options: [{ en: 'Ganga', hi: 'गंगा' }, { en: 'Kosi', hi: 'कोसी' }, { en: 'Gandak', hi: 'गंडक' }, { en: 'Son', hi: 'सोन' }],
    correctIndex: 1,
  },
  {
    q: { en: 'Which art form is famous in the Mithila region of Bihar?', hi: 'बिहार के मिथिला क्षेत्र में कौन सी कला शैली प्रसिद्ध है?' },
    options: [{ en: 'Warli Painting', hi: 'वर्ली पेंटिंग' }, { en: 'Pattachitra', hi: 'पट्टचित्र' }, { en: 'Madhubani Painting', hi: 'मधुबनी पेंटिंग' }, { en: 'Tanjore Painting', hi: 'तंजौर पेंटिंग' }],
    correctIndex: 2,
  },
  {
    q: { en: 'Who was the first President of India, born in Ziradei, Bihar?', hi: 'भारत के पहले राष्ट्रपति कौन थे, जिनका जन्म बिहार के जीरादेई में हुआ था?' },
    options: [{ en: 'Zakir Husain', hi: 'ज़ाकिर हुसैन' }, { en: 'Sarvepalli Radhakrishnan', hi: 'सर्वपल्ली राधाकृष्णन' }, { en: 'Dr. Rajendra Prasad', hi: 'डॉ. राजेंद्र प्रसाद' }, { en: 'V. V. Giri', hi: 'वी. वी. गिरि' }],
    correctIndex: 2,
  },
  {
    q: { en: 'What is the state animal of Bihar?', hi: 'बिहार का राजकीय पशु क्या है?' },
    options: [{ en: 'Tiger', hi: 'बाघ' }, { en: 'Elephant', hi: 'हाथी' }, { en: 'Gaur (Mithun)', hi: 'गौर (मिथुन)' }, { en: 'Rhinoceros', hi: 'गैंडा' }],
    correctIndex: 2,
  }
];

export default function QuizPlayScreen() {
  const router = useRouter();
  const { colors: theme, theme: themeMode } = useTheme();
  const { language } = useLanguage();

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === QUIZ_QUESTIONS[currentQuestionIndex].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
  };

  const renderContent = () => {
    if (!quizStarted) {
      return (
        <View style={styles.centerContainer}>
          <Ionicons name="school" size={64} color={theme.primary} style={{marginBottom: 16}} />
          <Typography variant="semiBold" style={{fontSize: 24, color: theme.text, marginBottom: 8}}>
            {language === 'hi' ? 'ज्ञान चुनौती' : 'Knowledge Challenge'}
          </Typography>
          <Typography style={{fontSize: 14, color: theme.textSecondary, textAlign: 'center', marginBottom: 32}}>
            {language === 'hi' ? 'बिहार के इतिहास और संस्कृति पर 10 बहुविकल्पीय प्रश्न।' : '10 multiple choice questions on the history and culture of Bihar.'}
          </Typography>
          <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary, width: '100%' }]} onPress={() => setQuizStarted(true)}>
            <Typography variant="semiBold" style={{ color: theme.onPrimary }}>{language === 'hi' ? 'क्विज़ शुरू करें' : 'Start Quiz'}</Typography>
          </TouchableOpacity>
        </View>
      );
    }

    if (quizFinished) {
      const percentage = (score / QUIZ_QUESTIONS.length) * 100;
      return (
        <View style={styles.centerContainer}>
          <Ionicons name="trophy" size={80} color={theme.accent} style={{marginBottom: 16}} />
          <Typography variant="semiBold" style={{fontSize: 28, color: theme.text, marginBottom: 8}}>
            {language === 'hi' ? 'स्कोर' : 'Score'}: {score}/{QUIZ_QUESTIONS.length}
          </Typography>
          <Typography style={{fontSize: 16, color: theme.textSecondary, textAlign: 'center', marginBottom: 32, lineHeight: 24}}>
            {percentage >= 80 ? (language === 'hi' ? 'अद्भुत! आपको बिहार का गहरा ज्ञान है।' : 'Amazing! You have deep knowledge of Bihar.') : 
             percentage >= 50 ? (language === 'hi' ? 'अच्छा प्रयास! और पढ़ें और फिर कोशिश करें।' : 'Good effort! Read more and try again.') : 
             (language === 'hi' ? 'अभ्यास करते रहें! फ्लैशकार्ड आपकी मदद कर सकते हैं।' : 'Keep practicing! Flashcards can help you.')}
          </Typography>
          <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary, width: '100%' }]} onPress={resetQuiz}>
            <Typography variant="semiBold" style={{ color: theme.onPrimary }}>{language === 'hi' ? 'फिर से खेलें' : 'Play Again'}</Typography>
          </TouchableOpacity>
        </View>
      );
    }

    const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

    return (
      <View style={styles.quizContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24}}>
          <Typography style={{ color: theme.textSecondary }}>
            {language === 'hi' ? 'प्रश्न' : 'Question'} {currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length}
          </Typography>
          <Typography style={{ color: theme.textSecondary }}>
            {language === 'hi' ? 'स्कोर' : 'Score'}: {score}
          </Typography>
        </View>
        
        <Typography variant="semiBold" style={{fontSize: 22, color: theme.text, marginBottom: 32, lineHeight: 32}}>
          {currentQ.q[language] || currentQ.q.en}
        </Typography>

        <View style={styles.optionsContainer}>
          {currentQ.options.map((opt, idx) => {
            let bgColor = theme.cardBackground;
            let borderColor = theme.border;
            let icon = null;

            if (selectedOption !== null) {
              if (idx === currentQ.correctIndex) {
                bgColor = theme.success + '20'; // light green
                borderColor = theme.success;
                icon = <Ionicons name="checkmark-circle" size={24} color={theme.success} />;
              } else if (idx === selectedOption) {
                bgColor = theme.error + '20'; // light red
                borderColor = theme.error;
                icon = <Ionicons name="close-circle" size={24} color={theme.error} />;
              }
            } else if (selectedOption === idx) {
              bgColor = theme.border;
            }

            return (
              <TouchableOpacity 
                key={idx} 
                style={[styles.optionCard, { backgroundColor: bgColor, borderColor }]} 
                onPress={() => handleOptionSelect(idx)}
                activeOpacity={0.7}
                disabled={selectedOption !== null}
              >
                <Typography variant="medium" style={{color: theme.text, flex: 1, fontSize: 16}}>
                  {opt[language] || opt.en}
                </Typography>
                {icon}
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedOption !== null && (
          <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary, marginTop: 32 }]} onPress={handleNextQuestion}>
            <Typography variant="semiBold" style={{ color: theme.onPrimary }}>{language === 'hi' ? 'अगला प्रश्न' : 'Next Question'}</Typography>
          </TouchableOpacity>
        )}
      </View>
    );
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
          {language === 'hi' ? 'क्विज़' : 'Take a Quiz'}
        </Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {renderContent()}
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
  centerContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  quizContainer: {
    padding: 24,
    flex: 1,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  }
});

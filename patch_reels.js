const fs = require('fs');
const file = 'src/app/reels.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add imports
content = content.replace(
  "import { useLanguage } from '../context/LanguageContext';",
  "import { useLanguage } from '../context/LanguageContext';\nimport AsyncStorage from '@react-native-async-storage/async-storage';\nimport Share from 'react-native-share';"
);

// 2. Add state and logic
const hooksCode = `
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const FAVORITES_KEY = '@bihar_explorer_favorites';

  React.useEffect(() => {
    loadSaved();
  }, []);

  const loadSaved = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleSave = async (placeId: string) => {
    try {
      let newSaved = [...savedIds];
      if (newSaved.includes(placeId)) {
        newSaved = newSaved.filter(id => id !== placeId);
      } else {
        newSaved.push(placeId);
      }
      setSavedIds(newSaved);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newSaved));
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async (place: any) => {
    try {
      const title = getLocalized(place.name);
      const desc = getLocalized(place.shortDescription);
      const message = \`Check out \${title} in Bihar!\\n\\n\${desc || ''}\\n\\nExplore more on Bihar Explorer.\`;
      
      await Share.open({
        title: title,
        message: message,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };
`;

content = content.replace(
  "const [currentIndex, setCurrentIndex] = useState(0);",
  "const [currentIndex, setCurrentIndex] = useState(0);" + hooksCode
);

// 3. Update buttons
content = content.replace(
  "<TouchableOpacity style={styles.actionIcon}>\\n                <Ionicons name=\"heart-outline\" size={32} color=\"#FFF\" />",
  "<TouchableOpacity style={styles.actionIcon} onPress={() => toggleSave(place.id)}>\\n                <Ionicons name={savedIds.includes(place.id) ? 'heart' : 'heart-outline'} size={32} color={savedIds.includes(place.id) ? '#E91E63' : '#FFF'} />"
);

content = content.replace(
  "<TouchableOpacity style={styles.actionIcon}>\\n                <Ionicons name=\"share-social-outline\" size={32} color=\"#FFF\" />",
  "<TouchableOpacity style={styles.actionIcon} onPress={() => handleShare(place)}>\\n                <Ionicons name=\"share-social-outline\" size={32} color=\"#FFF\" />"
);

fs.writeFileSync(file, content);
console.log('patched reels.tsx');

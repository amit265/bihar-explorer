const fs = require('fs');
const file = 'src/app/reels.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "<TouchableOpacity style={styles.actionIcon}>\\n                <Ionicons name=\"heart-outline\" size={32} color=\"#FFF\" />",
  "<TouchableOpacity style={styles.actionIcon} onPress={() => toggleSave(place.id)}>\\n                <Ionicons name={savedIds.includes(place.id) ? 'heart' : 'heart-outline'} size={32} color={savedIds.includes(place.id) ? '#E91E63' : '#FFF'} />"
);

content = content.replace(
  "<TouchableOpacity style={styles.actionIcon}>\\n                <Ionicons name=\"share-social-outline\" size={32} color=\"#FFF\" />",
  "<TouchableOpacity style={styles.actionIcon} onPress={() => handleShare(place)}>\\n                <Ionicons name=\"share-social-outline\" size={32} color=\"#FFF\" />"
);

fs.writeFileSync(file, content);
console.log('patched reels.tsx buttons');

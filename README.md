# 🚩 व्रत साथी (Bihar Explorer)

> **सनातन व्रत, पावन कथाएँ एवं डिजिटल मन्दिर • आपका दैनिक व्रत एवं उपासना साथी**

An authentic, calm, offline-first devotional platform for Sanatan Places, Kathas, Puja Vidhi, Samagri, Fasting Rules, and Digital Mandir. Built with **React Native**, **Expo**, **TypeScript**, and a sacred dark maroon & gold shrine design language (`#1C0B05` / `#2E1508`).

---

## 🌟 Key Features

### 1. 🏠 मुख्य पृष्ठ (Home & Upcoming Places)
- **आगामी पावन व्रत**: Automatic sorting of upcoming Places by remaining days with countdown badges (`आज का व्रत`, `कल का व्रत`, `X दिन शेष`).
- **दैनिक व्रत कार्ड**: Full detail previews for today's and upcoming fasts.
- **कैटेगरी फ़िल्टर**: Ekadashi, Pradosh, Sankashti, Purnima, Monday, Tuesday, Friday, etc.

### 2. 🛕 डिजिटल मन्दिर (Interactive Digital Mandir)
- **देवता अनुसार पावन मन्दिर**: Dynamic deity artwork rendering (`mahadev`, `vishnu_neelkanth`, `ganesha`, `parvati`, `hanuman`, `surya_dev`, `shani_dev`, `brihaspati`, `santoshi_mata`).
- **साधना उपकरण**: 
  - 🔔 **घंटी नाद (Bell Chime)**: Temple brass bell chime with scale animation.
  - 🐚 **शंख ध्वनि (Conch Shell)**: Sacred Conch shell blowing sound.
  - 🌸 **पुष्प अर्पण (Flower Shower)**: Interactive floating petal animations with chime audio.
  - 🙏 **प्रणाम (Pranam)**: Context-aware devotional feedback (`damru` for Shiva, `chime` for other deities).
  - 📿 **108 जाप (Jap Counter)**: Instant launcher for digital Rudraksha Mala.
- **श्राइन ऑडियो प्लेयर**: Integrated player with synchronized bhajan, mantra, and ambient audio tracks.

### 3. 📿 108 मनका जाप साधना (108 Jap Counter)
- **प्रोग्रेसिव अरा रिंग**: Progressive divine aura glows (`0 → 25 → 50 → 75 → 108`).
- **स्पर्श एवं स्पर्शज (Haptic Feedback)**: Tactile vibration feedback on every bead tap.
- **माला प्रोग्रेस व शेयर**: Round counters (`completedRounds`) and a completion celebration dialog to share साधना with family.

### 4. 📖 सम्पूर्ण व्रत विवरण व मार्गदर्शन (Comprehensive Place Guide)
- **महिमा व परिचय (Overview)**: Scriptural history and spiritual significance.
- **शुभ मुहूर्त व तिथि (Timings)**: Precise Tithi timings and location-dependent Panchang alerts.
- **व्रत तैयारी व पूजन सामग्री (Preparation & Samagri)**: Complete list of required Puja items.
- **व्रत नियम व आहार (Fasting Rules & Diet)**: What to eat (फलाहार), strict prohibitions, and Place Vidhi.
- **पावन व्रत कथा (Place Katha)**: Complete Hindi storytelling with Devanagari typography.
- **आरती व मन्त्र (Aarti & Mantras)**: Sanskrit mantras with meanings and audio tracks.

### 5. 📅 बहु-वर्षीय व्रत कैलेंडर (Multi-Year Place Calendar 2026–2030)
- Interactive calendar view displaying future dates for 2026, 2027, 2028, 2029, and 2030 without requiring external API calls.

### 6. 📴 100% ऑफ़लाइन कार्यक्षमता (Offline-First)
- All core text, kathas, samagri, mantras, calculations, and local sound effects work 100% offline without active internet connection.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: React Native (v0.76+ / RN 0.86), Expo SDK 52, TypeScript
- **Navigation**: Expo Router (File-based routing with dark shrine tab layout)
- **Audio Engine**: `expo-audio` (`~57.0.4`) with lazy dynamic imports (`getCreateAudioPlayer()`) and pre-flight HEAD checks (Strictly No `expo-av`)
- **Design Engine**: Deep Velvet Maroon (`#1C0B05` / `#2E1508`) & Sacred Gold (`#D4AF37` / `#FFD700`)
- **State & Storage**: AsyncStorage for favorites and offline progress

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go app on mobile (or Android Studio for emulator)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mahavyomastudio-apps/app_01_place_sathi.git
   cd app_01_place_sathi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

4. **Run on Android**:
   ```bash
   npx expo run:android
   ```

---

## 📂 Project Structure

```
app_01_place_sathi/
├── src/
│   ├── app/                  # Expo Router File-Based Pages & Tabs
│   │   ├── (tabs)/           # Main Navigation Bar Tabs
│   │   │   ├── index.tsx     # Home Screen (मुख्य पृष्ठ)
│   │   │   ├── places.tsx     # All Places Directory (सभी व्रत)
│   │   │   └── favorites.tsx # Saved Favorites (पसंदीदा)
│   │   ├── calendar.tsx      # Multi-Year Place Calendar (व्रत कैलेंडर)
│   │   ├── settings.tsx      # Settings & App Information
│   │   └── place/[slug].tsx   # Comprehensive Place Detail Page
│   ├── components/           # Devotional UI Components (DevotionalShrineBar, JapCounterModal)
│   ├── data/                 # Authentic Place Literature & Panchang Dates
│   ├── context/              # Audio & Theme Context Providers
│   └── constants/            # Image Asset Mappings & Shrine Audio Configurations
├── assets/
│   ├── images/               # App Icons & Optimized Deity Artworks (1080×1440 px JPGs)
│   └── sounds/               # 16-bit Stereo Temple Audio Clips (bell, shankh, damru, chime, water)
├── app.json                  # Expo Configuration (mindcraftlearning owner)
├── eas.json                  # EAS Build Configuration
├── version.json              # In-App Update Checker Configuration
└── README.md
```

---

## 🙏 Acknowledgment & Credits

व्रत साथी ऐप सनातन धर्म की पावन व्रत परंपराओं, एकादशी, शिव पूजन एवं समस्त देवी-देवताओं के व्रत-त्योहारों के प्रचार-प्रसार व सर्वजन हितार्थ समर्पित है।

---

## 📄 License & Studio

Designed & Developed by **Mahavyoma Studio / Destya Studio**.  
All rights reserved.

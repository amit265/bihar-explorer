# Bihar Explorer (व्रत साथी) — Asset Inventory & Requirement List

This document lists all required graphics, icons, sound effects, devotional audio tracks, and content data for **Bihar Explorer**. 

---

## 1. App Identity & Branding Assets (`assets/images/`)

| Asset Name | Spec / Format | Dimensions | Status | Description / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `icon.png` | PNG (No transparency) | 1024 × 1024 px | ⚠️ **Borrowed / Needs Custom** | Primary app launcher icon. Currently temporary branding; needs custom sacred Kalash/Diya artwork. |
| `splash-icon.png` | Transparent PNG | 512 × 512 px | ✅ **Ready** | High-res sacred emblem used for the 3D rotating splash screen on `#2E1508` dark maroon. |
| `favicon.ico` / `favicon.png` | PNG | 48 × 48 px | ✅ **Ready** | Browser / Web app tab favicon. |

---

## 2. Deity Artworks & Place Banners (`assets/images/deities/`)

| Asset Filename | Target Places / Use Case | Dimensions | Status | Description / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `mahadev.jpg` | Solah Somvar, Pradosh, Mahashiplaceri | 1080 × 1440 px (3:4 Portrait) | ⚠️ **Borrowed / Needs Custom** | Artwork of Lord Shiva / Mahadev in deep meditation. |
| `vishnu_neelkanth.jpg` | Ekadashi (Indira & Nirjala), Satyanarayan Purnima | 1080 × 1440 px (3:4 Portrait) | ⚠️ **Borrowed / Needs Custom** | Artwork of Lord Vishnu / Shri Hari Satyanarayan. |
| `ganesha.jpg` | Sankashti Chaturthi Place | 1080 × 1440 px (3:4 Portrait) | ⚠️ **Borrowed / Needs Custom** | Artwork of Lord Ganesha / Vighnaharta. |
| `parvati.jpg` | Hartalika Teej, Karwa Chauth Place | 1080 × 1440 px (3:4 Portrait) | ⚠️ **Borrowed / Needs Custom** | Artwork of Mata Parvati / Goddess Lakshmi. |
| `santoshi_mata.jpg` | Santoshi Mata Place, Vaibhav Lakshmi Place | 1080 × 1440 px (3:4 Portrait) | ❌ **Missing (Needs Collection)** | Artwork of Santoshi Mata / Goddess Lakshmi. Currently falls back to `parvati.jpg`. |
| `hanuman.jpg` | Mangalvar Place (Tuesday Fast) | 1080 × 1440 px (3:4 Portrait) | ❌ **Missing (Needs Collection)** | Artwork of Lord Hanuman / Shri Ram Bhakt. Currently falls back to `hero_banner.jpg`. |
| `brihaspati.jpg` | Brihaspativar Place (Thursday Fast) | 1080 × 1440 px (3:4 Portrait) | ❌ **Missing (Needs Collection)** | Artwork of Lord Brihaspati / Guru Dev. Currently falls back to `vishnu_neelkanth.jpg`. |
| `surya_dev.jpg` | Ravivar Place (Sunday Fast) | 1080 × 1440 px (3:4 Portrait) | ❌ **Missing (Needs Collection)** | Artwork of Surya Dev (Sun God in chariot). Currently falls back to `hero_banner.jpg`. |
| `shani_dev.jpg` | Shanivar Place (Saturday Fast) | 1080 × 1440 px (3:4 Portrait) | ❌ **Missing (Needs Collection)** | Artwork of Shani Dev / Lord Saturn. Currently falls back to `hero_banner.jpg`. |
| `hero_banner.jpg` | Home Screen Hero Banner | 1920 × 1080 px (16:9 Landscape) | ✅ **Ready** | Default sacred background banner for top Place card. |
| `place_shrine_bg.jpg` | Digital Mandir Background | 1080 × 1440 px (3:4 Portrait) | ✅ **Ready** | Dark brass / wooden shrine framing texture for interactive shrine. |

---

## 3. Shrine Tool Sound Effects (`assets/sounds/`)
*Short, crystal-clear 16-bit 44.1kHz stereo audio clips in `.mp3` format (Offline Native Support Enabled).*

| Asset Filename | Duration | Status | Description |
| :--- | :--- | :--- | :--- |
| `bell.mp3` | 2–3 sec | ✅ **Ready (Local)** | Temple brass bell chime sound (मन्दिर पीतल घंटी). |
| `shankh.mp3` | 3–5 sec | ✅ **Ready (Local)** | Sacred Conch shell blowing sound (पावन शंख नाद). |
| `damru.mp3` | 2–4 sec | ✅ **Ready (Local)** | Rhythmic Mahadev Damru sound (डमरू नाद). |
| `chime.mp3` | 1–2 sec | ✅ **Ready (Local)** | Soft Jap bead count / completion chime sound (जाप मनका). |
| `water.mp3` | 2–3 sec | ✅ **Ready (Local)** | Gentle Jal Arpan / Pushpa Arpan sound (जल अर्पण). |

---

## 4. Devotional Audio Tracks (Audio Player & Place Kathas)
*High-quality studio recorded `.mp3` files hosted on CDN or bundled in app.*

### A. Mantras & Meditation Chants (`src/constants/imageAssets.ts`)

| Track Title | Category | Status | Notes |
| :--- | :--- | :--- | :--- |
| 108 बार ॐ नमः शिवाय (मंत्र जाप) | Mantra Chant | ⚠️ **CDN Hosted** | `https://mahavyomastudio.com/apps/shiv-charcha/audio/108_om_namah_shivaya_chant.mp3` |
| शिव गुरु मेरे आधार | Bhajan | ⚠️ **CDN Hosted** | `https://mahavyomastudio.com/apps/shiv-charcha/audio/shiv_guru_mere_aadhar.mp3` |
| मंदिर घंटी व ॐ ध्यान ध्वनि | Ambient sound | ⚠️ **CDN Hosted** | `https://mahavyomastudio.com/apps/shiv-charcha/audio/om_meditation_ambience.mp3` |

### B. Place Kathas & Aartis (Audio Files to Collect)
- [ ] **Solah Somvar Katha & Shiv Aarti** (`solah_somvar_katha.mp3`)
- [ ] **Pradosh Place Katha** (`pradosh_place_katha.mp3`)
- [ ] **Mahashiplaceri Katha & Aarti** (`mahashiplaceri_katha.mp3`)
- [ ] **Ekadashi Place Katha & Vishnu Aarti** (`ekadashi_katha.mp3`)
- [ ] **Satyanarayan Purnima Katha & Aarti** (`satyanarayan_katha.mp3`)
- [ ] **Sankashti Chaturthi Katha & Ganesh Aarti** (`ganesh_katha.mp3`)
- [ ] **Hartalika Teej Katha** (`hartalika_teej_katha.mp3`)
- [ ] **Karwa Chauth Katha** (`karwa_chauth_katha.mp3`)
- [ ] **Santoshi Mata Katha & Aarti** (`santoshi_mata_katha.mp3`)
- [ ] **Mangalvar Hanuman Place Katha & Hanuman Chalisa** (`hanuman_chalisa.mp3`)
- [ ] **Brihaspativar Place Katha** (`brihaspati_katha.mp3`)
- [ ] **Ravivar Surya Dev Katha** (`surya_katha.mp3`)
- [ ] **Shanivar Shani Dev Katha** (`shani_katha.mp3`)

---

## 5. Cross-Promotion Sister App Icons (`assets/images/promo/`)

| Asset Filename | Dimensions | Status | Description |
| :--- | :--- | :--- | :--- |
| `thakur_prasad_icon.png` | 512 × 512 px | ✅ **Ready** | High-resolution icon for Thakur Prasad Hindi Calendar app. |
| `shiv_charcha_icon.png` | 512 × 512 px | ✅ **Ready** | High-resolution icon for Shiv Charcha app. |

---

## 6. Content Data & Panchang Dates
- ✅ **Devanagari Digits Purged**: All dates, counts, and step numbers converted to modern digits (`0-9`).
- ✅ **Multi-Year Place Calendar**: Screen created (`src/app/calendar.tsx`) dynamically displaying future Place dates for 2026, 2027, 2028, etc.

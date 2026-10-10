# Haya Asaad — Architecture & Urban Planning Portfolio

> A dynamic, trilingual, static React portfolio engineered for architect & urban planner **Haya Asaad** (B.Arch Tel-Aviv University graduate). Built with a decoupled architecture for zero-code project updates, fluid RTL/LTR support, and 100% static hosting on **GitHub Pages**.

---

## 🌟 Key Features

1. **Trilingual Architecture with Seamless RTL / LTR Switching**:
   - **English (`en`)**: LTR layout with editorial architectural typography (*Cormorant Garamond* & *Plus Jakarta Sans*).
   - **Arabic (`ar`)**: RTL layout with clean geometric typography (*Cairo*).
   - **Hebrew (`he`)**: RTL layout with modern legible typography (*Heebo*).
   - Dynamic `document.documentElement.dir` & `lang` synchronization with `localStorage` persistence.
   - Built exclusively with Tailwind CSS logical directional utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) for perfect bi-directional mirroring.

2. **Plug-and-Play Zero-Hardcoding Architecture**:
   - **Projects**: Add, modify, or remove projects entirely within [`src/data/projects.json`](./src/data/projects.json).
   - **Translations**: Edit any UI label or section heading in [`src/data/translations.json`](./src/data/translations.json).
   - **Site Config**: Manage WhatsApp, phone, email, studio location, and social links in [`src/data/siteConfig.json`](./src/data/siteConfig.json).

3. **High-Performance Image Inspection & Gallery**:
   - Category filtering (*All*, *Residential & Living*, *Urban Planning*, *Civic & Community*, *Parametric & High-Tech*, *Sketches & Art*).
   - Interactive Project Detail Modal with complete architectural brief, specs, and plate drawings.
   - Fullscreen Lightbox Modal with keyboard arrow navigation (`←` / `→`), Escape key support, image counter, and thumbnail strip.
   - Elegant architectural wireframe blueprint fallback when local images are loading or missing.

4. **Zero-Backend Static Deployment (GitHub Pages Ready)**:
   - Configured with relative base path (`base: './'`) in [`vite.config.js`](./vite.config.js) to resolve all bundled assets properly on GitHub Pages sub-paths.
   - Client-side form actions: direct WhatsApp pre-filled messaging and pre-filled email client actions.
   - Build output in `dist/` is 100% static HTML, CSS, and JS with no server dependencies.

---

## 📁 Directory & Image Convention

To add your own high-resolution photography, simply place your photos in the designated folders under `public/images/`:

```
public/
└── images/
    ├── profile/
    │   └── bio.jpg                               # Architect portrait photo
    └── projects/
        ├── final-project-dahmash/
        │   ├── cover.jpg                         # Project card & primary cover
        │   ├── 01.jpg                            # Drawing / render plate
        │   ├── 02.jpg                            # Drawing / render plate
        │   └── plan.jpg                          # Architectural plan / section
        ├── urban-studio-wadi/
        │   ├── cover.jpg
        │   ├── 01.jpg
        │   ├── 02.jpg
        │   └── plan.jpg
        └── [project-slug]/
            ├── cover.jpg
            ├── 01.jpg
            └── ...
```

---

## 🛠️ Data Schema Example (`src/data/projects.json`)

```json
[
  {
    "id": "modern-villa",
    "category": "residential",
    "year": "2024",
    "location": {
      "en": "Galilee",
      "ar": "الجليل",
      "he": "הגליל"
    },
    "title": {
      "en": "Modern Villa",
      "ar": "فيلا حديثة",
      "he": "וילה מודרנית"
    },
    "description": {
      "en": "Architectural concept and execution details...",
      "ar": "تفاصيل ومفهوم المشروع المعماري...",
      "he": "קונספט אדריכלי ופרטי ביצוע..."
    },
    "coverImage": "./images/projects/modern-villa/cover.jpg",
    "gallery": [
      "./images/projects/modern-villa/01.jpg",
      "./images/projects/modern-villa/02.jpg",
      "./images/projects/modern-villa/plan.jpg"
    ]
  }
]
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Build Production Bundle
```bash
npm run build
```
Generates an optimized static bundle in `dist/`.

### 4. Deploy to GitHub Pages
To publish the static site directly to your GitHub repository's `gh-pages` branch:
```bash
npm run deploy
```

---

## 📦 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [gh-pages](https://www.npmjs.com/package/gh-pages)

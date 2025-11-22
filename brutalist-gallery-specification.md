# VOID.GALLERY - Brutalist Digital Art Platform Specification

## Project Overview
Build an avant-garde digital art gallery and collectibles platform featuring brutalist web design, experimental interactions, and a raw aesthetic. Multi-language support (Serbian, German, English).

**Design Philosophy**: Raw, bold, unapologetic. Anti-establishment aesthetics meeting high art.

---

## 1. Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS custom properties
- **Animations**: GSAP (GreenSock) for bold, experimental animations
- **3D Elements**: Three.js / React Three Fiber (optional)
- **State**: React Context + useReducer

### Backend
- **Architecture**: Next.js API Routes (serverless)
- **Database**: SQLite with Drizzle ORM
- **File Storage**: Local + Cloudinary for images

---

## 2. Design System (Brutalist/Avant-Garde)

### Color Palette
```css
/* Primary - High Contrast */
--void-black: #0A0A0A;
--void-white: #F5F5F5;
--void-red: #FF0040;
--void-yellow: #FFE500;
--void-blue: #0055FF;

/* Glitch Colors */
--glitch-cyan: #00FFFF;
--glitch-magenta: #FF00FF;
--glitch-green: #00FF00;

/* Grays */
--gray-900: #121212;
--gray-800: #1A1A1A;
--gray-700: #2A2A2A;
--gray-400: #888888;
--gray-200: #CCCCCC;
```

### Typography
```css
/* Font Stack - Monospace + Display */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
--font-display: 'Space Grotesk', 'Helvetica Neue', sans-serif;
--font-accent: 'Monument Extended', 'Impact', sans-serif;

/* Sizes - Extreme Hierarchy */
--text-xs: 0.625rem;     /* 10px - metadata */
--text-sm: 0.75rem;      /* 12px - labels */
--text-base: 1rem;       /* 16px - body */
--text-lg: 1.25rem;      /* 20px - subheadings */
--text-xl: 2rem;         /* 32px - headings */
--text-2xl: 4rem;        /* 64px - display */
--text-3xl: 8rem;        /* 128px - hero */
--text-massive: 15vw;    /* viewport-based giant text */
```

### Visual Language
- **Grids**: Broken, asymmetrical, overlapping
- **Borders**: Thick, visible, often incomplete
- **Images**: Raw, unpolished, glitch effects
- **Hover States**: Aggressive color shifts, distortion
- **Cursor**: Custom cursor that reacts to content
- **Loading**: Glitch effects, ASCII art loaders

---

## 3. Database Schema

### Artists Table
```sql
artists:
  - id (TEXT, PK)
  - slug (TEXT, UNIQUE)
  - name (TEXT)
  - bio_en (TEXT)
  - bio_de (TEXT)
  - bio_sr (TEXT)
  - avatar_url (TEXT)
  - website (TEXT)
  - social_links (JSON) -- { twitter, instagram, etc }
  - is_featured (BOOLEAN)
  - created_at (TIMESTAMP)
```

### Artworks Table
```sql
artworks:
  - id (TEXT, PK)
  - slug (TEXT, UNIQUE)
  - title_en (TEXT)
  - title_de (TEXT)
  - title_sr (TEXT)
  - description_en (TEXT)
  - description_de (TEXT)
  - description_sr (TEXT)
  - artist_id (TEXT, FK -> artists.id)
  - category (TEXT) -- 'digital', 'generative', 'photography', 'mixed-media'
  - year (INTEGER)
  - medium (TEXT)
  - dimensions (TEXT)
  - edition_size (INTEGER) -- NULL for unique pieces
  - price (REAL)
  - currency (TEXT, DEFAULT 'EUR')
  - is_sold (BOOLEAN)
  - is_featured (BOOLEAN)
  - display_order (INTEGER)
  - created_at (TIMESTAMP)
```

### Artwork Images Table
```sql
artwork_images:
  - id (TEXT, PK)
  - artwork_id (TEXT, FK -> artworks.id)
  - url (TEXT)
  - alt_text (TEXT)
  - is_primary (BOOLEAN)
  - display_order (INTEGER)
```

### Exhibitions Table
```sql
exhibitions:
  - id (TEXT, PK)
  - slug (TEXT, UNIQUE)
  - title_en (TEXT)
  - title_de (TEXT)
  - title_sr (TEXT)
  - description_en (TEXT)
  - description_de (TEXT)
  - description_sr (TEXT)
  - curator (TEXT)
  - start_date (DATE)
  - end_date (DATE)
  - cover_image (TEXT)
  - is_active (BOOLEAN)
  - created_at (TIMESTAMP)
```

### Exhibition Artworks (Many-to-Many)
```sql
exhibition_artworks:
  - exhibition_id (TEXT, FK)
  - artwork_id (TEXT, FK)
  - display_order (INTEGER)
  - PRIMARY KEY (exhibition_id, artwork_id)
```

### Inquiries Table
```sql
inquiries:
  - id (TEXT, PK)
  - artwork_id (TEXT, FK -> artworks.id)
  - name (TEXT)
  - email (TEXT)
  - message (TEXT)
  - status (TEXT) -- 'new', 'responded', 'closed'
  - created_at (TIMESTAMP)
```

---

## 4. Frontend Pages

### Public Pages
```
/                           - Homepage (featured works, exhibitions)
/[lang]/gallery             - Full gallery grid
/[lang]/gallery/[category]  - Category filtered view
/[lang]/work/[slug]         - Single artwork detail
/[lang]/artists             - Artists index
/[lang]/artists/[slug]      - Artist profile + works
/[lang]/exhibitions         - All exhibitions
/[lang]/exhibitions/[slug]  - Single exhibition
/[lang]/about               - About the gallery
/[lang]/contact             - Contact + inquiry form
```

---

## 5. Component Architecture

### Layout Components

#### Header (Brutalist)
```
+--------------------------------------------------+
| VOID.                                    [EN|DE|SR]
| GALLERY                              [≡] MENU
+--------------------------------------------------+
```
- Massive typography, left-aligned
- Language switcher as brutal toggles
- Hamburger menu for navigation
- No hover states, just hard color changes

#### Navigation (Full-Screen Overlay)
```
+--------------------------------------------------+
|                                              [×] |
|                                                  |
|    01 — GALLERY                                  |
|    02 — ARTISTS                                  |
|    03 — EXHIBITIONS                              |
|    04 — ABOUT                                    |
|    05 — CONTACT                                  |
|                                                  |
|    ----------------------------------------     |
|    INSTAGRAM    TWITTER    NEWSLETTER           |
+--------------------------------------------------+
```
- Numbers prefix each link
- Massive text, full viewport
- Staggered animation on open

#### Footer (Minimal)
```
+--------------------------------------------------+
| © 2024 VOID.GALLERY                              |
| BELGRADE / BERLIN / WORLDWIDE                    |
+--------------------------------------------------+
```

### Artwork Components

#### ArtworkCard (Grid Item)
```
+------------------------+
|                        |
|    [IMAGE]             |
|    ████████████████    |
|    ████████████████    |
|                        |
+------------------------+
| ARTIST NAME            |
| "WORK TITLE"           |
| 2024 / DIGITAL         |
| €2,500                 |
+------------------------+
```
- Image fills most of card
- Grayscale by default, color on hover
- Text: uppercase, monospace
- Thick border on hover

#### ArtworkDetail (Full Page)
```
+--------------------------------------------------+
| ← BACK TO GALLERY                                |
+--------------------------------------------------+
|                                                  |
|     +----------------------------------+         |
|     |                                  |         |
|     |          [MAIN IMAGE]            |         |
|     |                                  |         |
|     +----------------------------------+         |
|                                                  |
| ARTIST_NAME                                      |
| ================================================|
| "WORK TITLE"                                     |
| ================================================|
|                                                  |
| YEAR________2024                                 |
| MEDIUM______Digital print on archival paper     |
| DIMENSIONS__100 × 150 cm                         |
| EDITION_____1/10                                 |
| PRICE_______€2,500                               |
|                                                  |
| [INQUIRE ABOUT THIS WORK]                        |
|                                                  |
| ------------------------------------------------|
| DESCRIPTION                                      |
| Lorem ipsum dolor sit amet...                    |
+--------------------------------------------------+
```

### Exhibition Components

#### ExhibitionCard
```
+--------------------------------------------------+
| ██████████████████████████████████████████████  |
| █████████████ [COVER IMAGE] █████████████████  |
| ██████████████████████████████████████████████  |
+--------------------------------------------------+
| "EXHIBITION TITLE"                               |
| CURATED BY NAME                                  |
| 15.01 — 28.02.2024                               |
| [VIEW EXHIBITION →]                              |
+--------------------------------------------------+
```

---

## 6. Interactions & Animations

### Page Transitions
- Hard cut transitions (no fade)
- Content slides in from bottom
- Text characters animate individually (typewriter effect)

### Hover Effects
```css
/* Card Hover - Inverted Colors */
.artwork-card:hover {
  filter: invert(1);
  border: 4px solid var(--void-red);
}

/* Link Hover - Strikethrough + Color */
.nav-link:hover {
  text-decoration: line-through;
  color: var(--void-red);
}

/* Button Hover - Glitch */
.btn:hover {
  animation: glitch 0.3s infinite;
}
```

### Scroll Effects
- Parallax on hero text (moves slower than scroll)
- Images reveal with wipe effect
- Progress indicator (thick line at bottom)

### Cursor
- Custom cursor: small red dot
- On interactive elements: expands to circle
- On images: transforms to "VIEW" text

---

## 7. Sample Content

### Artists
```javascript
const artists = [
  {
    id: 'artist-1',
    slug: 'nova-zero',
    name: 'NOVA ZERO',
    bio_en: 'Berlin-based digital artist exploring the intersection of code and chaos.',
    bio_de: 'Berliner Digitalkünstler, der die Schnittstelle von Code und Chaos erforscht.',
    bio_sr: 'Berlinski digitalni umetnik koji istražuje presek koda i haosa.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    is_featured: true,
  },
  {
    id: 'artist-2',
    slug: 'data-decay',
    name: 'DATA_DECAY',
    bio_en: 'Collective creating generative art from corrupted data streams.',
    bio_de: 'Kollektiv, das generative Kunst aus korrumpierten Datenströmen erschafft.',
    bio_sr: 'Kolektiv koji stvara generativnu umetnost od oštećenih tokova podataka.',
    is_featured: true,
  },
  {
    id: 'artist-3',
    slug: 'error-state',
    name: 'ERROR_STATE',
    bio_en: 'Anonymous artist. Glitch photography. Belgrade underground.',
    bio_de: 'Anonymer Künstler. Glitch-Fotografie. Belgrader Underground.',
    bio_sr: 'Anonimni umetnik. Glič fotografija. Beogradski andergraund.',
    is_featured: false,
  },
];
```

### Artworks
```javascript
const artworks = [
  {
    id: 'work-1',
    slug: 'system-failure-001',
    title_en: 'SYSTEM.FAILURE//001',
    title_de: 'SYSTEM.FAILURE//001',
    title_sr: 'SYSTEM.FAILURE//001',
    description_en: 'Generative piece exploring digital entropy...',
    artist_id: 'artist-1',
    category: 'generative',
    year: 2024,
    medium: 'Archival pigment print on Hahnemühle',
    dimensions: '100 × 70 cm',
    edition_size: 10,
    price: 2500,
    is_featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200', is_primary: true },
    ],
  },
  {
    id: 'work-2',
    slug: 'void-portrait',
    title_en: 'VOID PORTRAIT',
    title_de: 'VOID PORTRAIT',
    title_sr: 'VOID PORTRET',
    description_en: 'AI-corrupted self-portrait series...',
    artist_id: 'artist-2',
    category: 'digital',
    year: 2024,
    medium: 'Digital print on aluminum',
    dimensions: '80 × 120 cm',
    edition_size: 5,
    price: 3800,
    is_featured: true,
  },
  // ... more artworks
];
```

### Exhibitions
```javascript
const exhibitions = [
  {
    id: 'exhibition-1',
    slug: 'digital-ruins',
    title_en: 'DIGITAL RUINS',
    title_de: 'DIGITALE RUINEN',
    title_sr: 'DIGITALNE RUŠEVINE',
    description_en: 'An exploration of decay in the digital age...',
    curator: 'MARIA VOID',
    start_date: '2024-01-15',
    end_date: '2024-02-28',
    is_active: true,
  },
];
```

---

## 8. Internationalization

### Translation Keys
```javascript
const translations = {
  en: {
    brand: 'VOID.',
    tagline: 'DIGITAL ART GALLERY',
    nav: {
      gallery: 'GALLERY',
      artists: 'ARTISTS',
      exhibitions: 'EXHIBITIONS',
      about: 'ABOUT',
      contact: 'CONTACT',
    },
    artwork: {
      year: 'YEAR',
      medium: 'MEDIUM',
      dimensions: 'DIMENSIONS',
      edition: 'EDITION',
      price: 'PRICE',
      inquire: 'INQUIRE ABOUT THIS WORK',
      sold: 'SOLD',
      unique: 'UNIQUE PIECE',
    },
    exhibition: {
      current: 'CURRENT',
      upcoming: 'UPCOMING',
      past: 'PAST',
      curator: 'CURATED BY',
      viewWorks: 'VIEW WORKS',
    },
    contact: {
      title: 'GET IN TOUCH',
      name: 'NAME',
      email: 'EMAIL',
      message: 'MESSAGE',
      send: 'SEND',
      success: 'MESSAGE SENT. WE WILL RESPOND.',
    },
    footer: {
      copyright: '© 2024 VOID.GALLERY',
      location: 'BELGRADE / BERLIN / WORLDWIDE',
    },
  },
  de: {
    brand: 'VOID.',
    tagline: 'DIGITALE KUNSTGALERIE',
    nav: {
      gallery: 'GALERIE',
      artists: 'KÜNSTLER',
      exhibitions: 'AUSSTELLUNGEN',
      about: 'ÜBER UNS',
      contact: 'KONTAKT',
    },
    artwork: {
      year: 'JAHR',
      medium: 'MEDIUM',
      dimensions: 'MASSE',
      edition: 'AUFLAGE',
      price: 'PREIS',
      inquire: 'ANFRAGE ZU DIESEM WERK',
      sold: 'VERKAUFT',
      unique: 'EINZELSTÜCK',
    },
    // ... rest of German
  },
  sr: {
    brand: 'VOID.',
    tagline: 'GALERIJA DIGITALNE UMETNOSTI',
    nav: {
      gallery: 'GALERIJA',
      artists: 'UMETNICI',
      exhibitions: 'IZLOŽBE',
      about: 'O NAMA',
      contact: 'KONTAKT',
    },
    artwork: {
      year: 'GODINA',
      medium: 'MEDIJUM',
      dimensions: 'DIMENZIJE',
      edition: 'EDICIJA',
      price: 'CENA',
      inquire: 'UPIT ZA OVO DELO',
      sold: 'PRODATO',
      unique: 'UNIKAT',
    },
    // ... rest of Serbian
  },
};
```

---

## 9. Key Styling Patterns

### Brutalist Button
```css
.btn-brutal {
  background: var(--void-black);
  color: var(--void-white);
  border: 3px solid var(--void-white);
  padding: 1rem 2rem;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}

.btn-brutal:hover {
  background: var(--void-red);
  border-color: var(--void-red);
  color: var(--void-white);
}
```

### Broken Grid
```css
.broken-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0;
}

.grid-item {
  grid-column: span 4;
}

.grid-item:nth-child(2) {
  grid-column: span 5;
  margin-top: 4rem;
}

.grid-item:nth-child(3) {
  grid-column: span 3;
  margin-left: -2rem;
}
```

### Glitch Text Effect
```css
.glitch {
  position: relative;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 var(--glitch-cyan);
  animation: glitch-1 2s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: 2px 0 var(--glitch-magenta);
  animation: glitch-2 3s infinite linear alternate-reverse;
}
```

### Data Visualization Labels
```css
.data-label {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-700);
  padding: 0.75rem 0;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.data-label__key {
  color: var(--gray-400);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.data-label__value {
  color: var(--void-white);
}

/* With underscores */
.data-label__key::after {
  content: '________';
  color: var(--gray-700);
  margin: 0 0.5rem;
}
```

---

## 10. Success Criteria

Your implementation is successful when:
- ✅ Brutalist aesthetic is consistent throughout
- ✅ Gallery displays artworks in broken grid layout
- ✅ Individual artwork pages show full details
- ✅ Artist profiles display bio and works
- ✅ Exhibitions feature curated artwork collections
- ✅ Site supports 3 languages (EN, DE, SR)
- ✅ Inquiry form works for artwork inquiries
- ✅ Responsive design maintains brutalist feel
- ✅ Custom cursor and interactions work
- ✅ Page transitions feel intentional and bold

---

## Design References

- Bloomberg.com (brutalist news)
- Balenciaga.com (avant-garde fashion)
- Cargo Collective templates
- Brutalist Websites (brutalistwebsites.com)
- Virgil Abloh's "FIGURES OF SPEECH"

---

**Remember**: Brutalism isn't about being ugly—it's about being honest, raw, and unapologetic. Every design choice should feel intentional, not accidental.

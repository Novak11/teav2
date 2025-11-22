export { getLocalizedField } from './i18n';

export type Artist = {
  id: string;
  slug: string;
  name: string;
  bio_en: string;
  bio_de: string;
  bio_sr: string;
  avatar_url: string;
  website?: string;
  is_featured: boolean;
};

export type Artwork = {
  id: string;
  slug: string;
  title_en: string;
  title_de: string;
  title_sr: string;
  description_en: string;
  description_de: string;
  description_sr: string;
  artist_id: string;
  category: 'digital' | 'generative' | 'photography' | 'mixed-media';
  year: number;
  medium: string;
  dimensions: string;
  edition_size: number | null;
  price: number;
  is_sold: boolean;
  is_featured: boolean;
  images: { url: string; is_primary: boolean }[];
};

export type Exhibition = {
  id: string;
  slug: string;
  title_en: string;
  title_de: string;
  title_sr: string;
  description_en: string;
  description_de: string;
  description_sr: string;
  curator: string;
  start_date: string;
  end_date: string;
  cover_image: string;
  is_active: boolean;
  artwork_ids: string[];
};

export const artists: Artist[] = [
  {
    id: 'artist-1',
    slug: 'nova-zero',
    name: 'NOVA ZERO',
    bio_en: 'Berlin-based digital artist exploring the intersection of code and chaos. Her work transforms algorithms into visual poetry, creating pieces that exist in the liminal space between order and entropy.',
    bio_de: 'In Berlin ansässige Digitalkünstlerin, die die Schnittstelle von Code und Chaos erforscht. Ihre Arbeit verwandelt Algorithmen in visuelle Poesie.',
    bio_sr: 'Berlinska digitalna umetnica koja istražuje presek koda i haosa. Njen rad transformiše algoritme u vizuelnu poeziju.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    website: 'https://novazero.art',
    is_featured: true,
  },
  {
    id: 'artist-2',
    slug: 'data-decay',
    name: 'DATA_DECAY',
    bio_en: 'Collective of three anonymous artists creating generative art from corrupted data streams. Their work questions the permanence of digital memory.',
    bio_de: 'Kollektiv aus drei anonymen Künstlern, das generative Kunst aus beschädigten Datenströmen erschafft.',
    bio_sr: 'Kolektiv od tri anonimna umetnika koji stvaraju generativnu umetnost od oštećenih tokova podataka.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    is_featured: true,
  },
  {
    id: 'artist-3',
    slug: 'error-state',
    name: 'ERROR_STATE',
    bio_en: 'Anonymous artist working from the Belgrade underground. Glitch photography that captures the beauty in system failures and digital artifacts.',
    bio_de: 'Anonymer Künstler aus dem Belgrader Underground. Glitch-Fotografie, die die Schönheit in Systemfehlern einfängt.',
    bio_sr: 'Anonimni umetnik iz beogradskog andergraunda. Glič fotografija koja hvata lepotu u sistemskim greškama.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    is_featured: false,
  },
  {
    id: 'artist-4',
    slug: 'pixel-void',
    name: 'PIXEL_VOID',
    bio_en: 'Tokyo-born, Vienna-based artist. Creates minimalist digital compositions that explore negative space in the digital realm.',
    bio_de: 'In Tokio geborener, in Wien ansässiger Künstler. Erschafft minimalistische digitale Kompositionen.',
    bio_sr: 'Umetnik rođen u Tokiju, živi u Beču. Stvara minimalističke digitalne kompozicije.',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    is_featured: true,
  },
];

export const artworks: Artwork[] = [
  {
    id: 'work-1',
    slug: 'system-failure-001',
    title_en: 'SYSTEM.FAILURE//001',
    title_de: 'SYSTEM.FAILURE//001',
    title_sr: 'SYSTEM.FAILURE//001',
    description_en: 'A generative piece exploring digital entropy. Created through custom algorithms that progressively corrupt their own output, this work captures the moment of beautiful collapse.',
    description_de: 'Ein generatives Werk, das digitale Entropie erforscht. Durch benutzerdefinierte Algorithmen entstanden.',
    description_sr: 'Generativno delo koje istražuje digitalnu entropiju. Nastalo kroz prilagođene algoritme.',
    artist_id: 'artist-1',
    category: 'generative',
    year: 2024,
    medium: 'Archival pigment print on Hahnemühle',
    dimensions: '100 × 70 cm',
    edition_size: 10,
    price: 2500,
    is_sold: false,
    is_featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200', is_primary: true },
    ],
  },
  {
    id: 'work-2',
    slug: 'void-portrait-i',
    title_en: 'VOID PORTRAIT I',
    title_de: 'VOID PORTRAIT I',
    title_sr: 'VOID PORTRET I',
    description_en: 'AI-corrupted self-portrait series. The machine learning model was trained on thousands of faces, then asked to forget—this is what remains.',
    description_de: 'KI-korrumpierte Selbstporträtserie. Das maschinelle Lernmodell wurde trainiert zu vergessen.',
    description_sr: 'AI-oštećena serija autoportreta. Model mašinskog učenja je treniran da zaboravi.',
    artist_id: 'artist-2',
    category: 'digital',
    year: 2024,
    medium: 'Digital print on aluminum dibond',
    dimensions: '80 × 120 cm',
    edition_size: 5,
    price: 3800,
    is_sold: false,
    is_featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200', is_primary: true },
    ],
  },
  {
    id: 'work-3',
    slug: 'memory-leak',
    title_en: 'MEMORY LEAK',
    title_de: 'MEMORY LEAK',
    title_sr: 'CURENJE MEMORIJE',
    description_en: 'Glitch photography capturing the exact moment of digital failure. Shot on modified hardware that introduces errors during capture.',
    description_de: 'Glitch-Fotografie, die den genauen Moment des digitalen Versagens einfängt.',
    description_sr: 'Glič fotografija koja hvata tačan trenutak digitalnog pada.',
    artist_id: 'artist-3',
    category: 'photography',
    year: 2023,
    medium: 'C-print on archival paper',
    dimensions: '60 × 90 cm',
    edition_size: 15,
    price: 1800,
    is_sold: false,
    is_featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200', is_primary: true },
    ],
  },
  {
    id: 'work-4',
    slug: 'null-space',
    title_en: 'NULL SPACE',
    title_de: 'NULL SPACE',
    title_sr: 'NULL PROSTOR',
    description_en: 'Minimalist exploration of digital void. The work exists primarily in the negative space, challenging viewers to find meaning in absence.',
    description_de: 'Minimalistische Erkundung der digitalen Leere.',
    description_sr: 'Minimalistička eksploracija digitalne praznine.',
    artist_id: 'artist-4',
    category: 'digital',
    year: 2024,
    medium: 'UV print on acrylic glass',
    dimensions: '150 × 100 cm',
    edition_size: null,
    price: 8500,
    is_sold: false,
    is_featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200', is_primary: true },
    ],
  },
  {
    id: 'work-5',
    slug: 'recursive-dream',
    title_en: 'RECURSIVE DREAM',
    title_de: 'REKURSIVER TRAUM',
    title_sr: 'REKURZIVNI SAN',
    description_en: 'Generative art piece where the output feeds back into the input infinitely. Each print is a unique snapshot of an endless process.',
    description_de: 'Generatives Kunstwerk, bei dem die Ausgabe unendlich in die Eingabe zurückfließt.',
    description_sr: 'Generativno umetničko delo gde izlaz beskonačno vraća u ulaz.',
    artist_id: 'artist-1',
    category: 'generative',
    year: 2023,
    medium: 'Giclée print on cotton rag',
    dimensions: '70 × 100 cm',
    edition_size: 25,
    price: 1500,
    is_sold: true,
    is_featured: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200', is_primary: true },
    ],
  },
  {
    id: 'work-6',
    slug: 'broken-grid',
    title_en: 'BROKEN GRID',
    title_de: 'ZERBROCHENES RASTER',
    title_sr: 'SLOMLJENA MREŽA',
    description_en: 'Mixed media installation combining physical elements with projected digital art. The grid references brutalist architecture while subverting its principles.',
    description_de: 'Mixed-Media-Installation, die physische Elemente mit projizierter digitaler Kunst kombiniert.',
    description_sr: 'Instalacija mešanih medija koja kombinuje fizičke elemente sa projektovanom digitalnom umetnošću.',
    artist_id: 'artist-2',
    category: 'mixed-media',
    year: 2024,
    medium: 'Steel, projection, custom software',
    dimensions: '300 × 200 × 50 cm',
    edition_size: null,
    price: 15000,
    is_sold: false,
    is_featured: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200', is_primary: true },
    ],
  },
];

export const exhibitions: Exhibition[] = [
  {
    id: 'exhibition-1',
    slug: 'digital-ruins',
    title_en: 'DIGITAL RUINS',
    title_de: 'DIGITALE RUINEN',
    title_sr: 'DIGITALNE RUŠEVINE',
    description_en: 'An exploration of decay in the digital age. As our lives become increasingly digitized, what happens when these systems fail? This exhibition presents works that find beauty in digital collapse.',
    description_de: 'Eine Erkundung des Verfalls im digitalen Zeitalter.',
    description_sr: 'Istraživanje propadanja u digitalnom dobu.',
    curator: 'MARIA VOID',
    start_date: '2024-01-15',
    end_date: '2024-03-28',
    cover_image: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=1200',
    is_active: true,
    artwork_ids: ['work-1', 'work-2', 'work-3', 'work-4'],
  },
  {
    id: 'exhibition-2',
    slug: 'code-as-canvas',
    title_en: 'CODE AS CANVAS',
    title_de: 'CODE ALS LEINWAND',
    title_sr: 'KOD KAO PLATNO',
    description_en: 'Showcasing generative artists who use programming as their primary medium. The exhibition questions authorship when algorithms create art.',
    description_de: 'Präsentation generativer Künstler, die Programmierung als ihr primäres Medium nutzen.',
    description_sr: 'Izložba generativnih umetnika koji koriste programiranje kao primarni medij.',
    curator: 'ALEX KERNEL',
    start_date: '2024-04-15',
    end_date: '2024-06-30',
    cover_image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
    is_active: false,
    artwork_ids: ['work-1', 'work-5', 'work-6'],
  },
];

export function getArtist(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getArtworksByArtist(artistId: string): Artwork[] {
  return artworks.filter((a) => a.artist_id === artistId);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getExhibitionBySlug(slug: string): Exhibition | undefined {
  return exhibitions.find((e) => e.slug === slug);
}

export function getArtworksByExhibition(exhibitionId: string): Artwork[] {
  const exhibition = exhibitions.find((e) => e.id === exhibitionId);
  if (!exhibition) return [];
  return artworks.filter((a) => exhibition.artwork_ids.includes(a.id));
}

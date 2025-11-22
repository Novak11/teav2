export const translations = {
  en: {
    nav: {
      home: 'Home',
      shop: 'Shop',
      clothing: 'Clothing',
      footwear: 'Footwear',
      jewelry: 'Jewelry',
      bags: 'Bags',
      cart: 'Cart',
      favorites: 'Favorites',
      profile: 'Profile',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
    },
    buttons: {
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      checkout: 'Checkout',
      continueShopping: 'Continue Shopping',
      viewCart: 'View Cart',
      remove: 'Remove',
    },
    product: {
      size: 'Size',
      color: 'Color',
      quantity: 'Quantity',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      description: 'Description',
      details: 'Details',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      tax: 'Tax',
      total: 'Total',
    },
    home: {
      hero: 'Discover Luxury',
      heroSubtitle: 'Curated collection of the finest designer pieces',
      featured: 'Featured Products',
      categories: 'Shop by Category',
      newArrivals: 'New Arrivals',
    },
    footer: {
      newsletter: 'Subscribe to our newsletter',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      customerService: 'Customer Service',
      about: 'About Us',
      contact: 'Contact',
      shipping: 'Shipping',
      returns: 'Returns',
      company: 'Company',
      careers: 'Careers',
      press: 'Press',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      shop: 'Shop',
      clothing: 'Kleidung',
      footwear: 'Schuhe',
      jewelry: 'Schmuck',
      bags: 'Taschen',
      cart: 'Warenkorb',
      favorites: 'Favoriten',
      profile: 'Profil',
      login: 'Anmelden',
      logout: 'Abmelden',
      register: 'Registrieren',
    },
    buttons: {
      addToCart: 'In den Warenkorb',
      buyNow: 'Jetzt kaufen',
      checkout: 'Zur Kasse',
      continueShopping: 'Weiter einkaufen',
      viewCart: 'Warenkorb ansehen',
      remove: 'Entfernen',
    },
    product: {
      size: 'Größe',
      color: 'Farbe',
      quantity: 'Menge',
      inStock: 'Auf Lager',
      outOfStock: 'Nicht verfügbar',
      description: 'Beschreibung',
      details: 'Details',
    },
    cart: {
      title: 'Warenkorb',
      empty: 'Ihr Warenkorb ist leer',
      subtotal: 'Zwischensumme',
      shipping: 'Versand',
      tax: 'MwSt',
      total: 'Gesamt',
    },
    home: {
      hero: 'Entdecken Sie Luxus',
      heroSubtitle: 'Kuratierte Kollektion der feinsten Designer-Stücke',
      featured: 'Ausgewählte Produkte',
      categories: 'Nach Kategorie einkaufen',
      newArrivals: 'Neuheiten',
    },
    footer: {
      newsletter: 'Abonnieren Sie unseren Newsletter',
      emailPlaceholder: 'E-Mail eingeben',
      subscribe: 'Abonnieren',
      customerService: 'Kundenservice',
      about: 'Über uns',
      contact: 'Kontakt',
      shipping: 'Versand',
      returns: 'Rückgabe',
      company: 'Unternehmen',
      careers: 'Karriere',
      press: 'Presse',
      legal: 'Rechtliches',
      privacy: 'Datenschutz',
      terms: 'AGB',
    },
  },
  sr: {
    nav: {
      home: 'Početna',
      shop: 'Prodavnica',
      clothing: 'Odeća',
      footwear: 'Obuća',
      jewelry: 'Nakit',
      bags: 'Torbe',
      cart: 'Korpa',
      favorites: 'Omiljeno',
      profile: 'Profil',
      login: 'Prijava',
      logout: 'Odjava',
      register: 'Registracija',
    },
    buttons: {
      addToCart: 'Dodaj u korpu',
      buyNow: 'Kupi odmah',
      checkout: 'Plaćanje',
      continueShopping: 'Nastavi kupovinu',
      viewCart: 'Pogledaj korpu',
      remove: 'Ukloni',
    },
    product: {
      size: 'Veličina',
      color: 'Boja',
      quantity: 'Količina',
      inStock: 'Na stanju',
      outOfStock: 'Nema na stanju',
      description: 'Opis',
      details: 'Detalji',
    },
    cart: {
      title: 'Korpa',
      empty: 'Vaša korpa je prazna',
      subtotal: 'Međuzbir',
      shipping: 'Dostava',
      tax: 'PDV',
      total: 'Ukupno',
    },
    home: {
      hero: 'Otkrijte Luksuz',
      heroSubtitle: 'Kolekcija najfinijih dizajnerskih komada',
      featured: 'Istaknuti proizvodi',
      categories: 'Kupuj po kategoriji',
      newArrivals: 'Novo u ponudi',
    },
    footer: {
      newsletter: 'Pretplatite se na naš bilten',
      emailPlaceholder: 'Unesite email',
      subscribe: 'Pretplati se',
      customerService: 'Korisnička podrška',
      about: 'O nama',
      contact: 'Kontakt',
      shipping: 'Dostava',
      returns: 'Povraćaj',
      company: 'Kompanija',
      careers: 'Karijera',
      press: 'Press',
      legal: 'Pravne informacije',
      privacy: 'Politika privatnosti',
      terms: 'Uslovi korišćenja',
    },
  },
};

export type TranslationKey = keyof typeof translations.en;
export type Language = keyof typeof translations;

export const getTranslation = (lang: Language, path: string): string => {
  const keys = path.split('.');
  let value: any = translations[lang];
  for (const key of keys) {
    value = value?.[key];
  }
  return value || path;
};

export const getProductName = (product: any, lang: Language): string => {
  const key = `name${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as keyof typeof product;
  return product[key] || product.nameEn;
};

export const getProductDescription = (product: any, lang: Language): string => {
  const key = `description${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as keyof typeof product;
  return product[key] || product.descriptionEn || '';
};

export const getCategoryName = (category: any, lang: Language): string => {
  const key = `name${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as keyof typeof category;
  return category[key] || category.nameEn;
};

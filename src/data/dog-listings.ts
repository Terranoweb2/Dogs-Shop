
import { DogListing } from '@/types/dog';

export const dogListings: DogListing[] = [
  {
    id: 'listing-1',
    breedId: 'golden-retriever',
    name: 'Max',
    age: 3,
    ageUnit: 'mois',
    gender: 'Mâle',
    price: 600000,
    description: 'Magnifique chiot Golden Retriever mâle, très sociable et joueur. Élevé en famille avec enfants. Parents visibles sur place, tous deux champions de France.',
    images: [
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80',
      'https://images.unsplash.com/photo-1612536981610-2e8a6a2ca2ed?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Dakar, Sénégal',
    breeder: {
      name: 'Élevage des Champs Dorés',
      phone: '+221 77 123 45 67',
      email: 'contact@champsdores.sn'
    },
    available: true,
    postedDate: '2024-01-15'
  },
  {
    id: 'listing-2',
    breedId: 'labrador',
    name: 'Luna',
    age: 2,
    ageUnit: 'mois',
    gender: 'Femelle',
    price: 550000,
    description: 'Adorable femelle Labrador chocolat. Très câline et douce. Première vaccination effectuée, vermifugée. Idéale pour famille avec enfants.',
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: false,
    location: 'Abidjan, Côte d\'Ivoire',
    breeder: {
      name: 'Élevage Ivoirien',
      phone: '+225 07 12 34 56 78',
      email: 'elevage@ivoirien.ci'
    },
    available: true,
    postedDate: '2024-01-20'
  },
  {
    id: 'listing-3',
    breedId: 'berger-allemand',
    name: 'Rex',
    age: 4,
    ageUnit: 'mois',
    gender: 'Mâle',
    price: 750000,
    description: 'Superbe mâle Berger Allemand, lignée de travail. Excellent caractère, très intelligent. Parents testés dysplasie. Parfait pour sport canin ou famille active.',
    images: [
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Lomé, Togo',
    breeder: {
      name: 'Élevage Togolais Elite',
      phone: '+228 90 12 34 56',
      email: 'elite@togo.tg'
    },
    available: true,
    postedDate: '2024-01-18'
  },
  {
    id: 'listing-4',
    breedId: 'bouledogue-francais',
    name: 'Bella',
    age: 10,
    ageUnit: 'semaines',
    gender: 'Femelle',
    price: 1000000,
    description: 'Magnifique femelle Bouledogue Français fauve. Très joueuse et affectueuse. Habituée aux enfants et autres animaux. Parents LOF.',
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Cotonou, Bénin',
    breeder: {
      name: 'Élevage Béninois Premium',
      phone: '+229 97 12 34 56',
      email: 'premium@benin.bj'
    },
    available: true,
    postedDate: '2024-01-22'
  },
  {
    id: 'listing-5',
    breedId: 'beagle',
    name: 'Charlie',
    age: 3,
    ageUnit: 'mois',
    gender: 'Mâle',
    price: 450000,
    description: 'Chiot Beagle tricolore plein de vie. Très curieux et joueur. Socialisé avec enfants et chats. Première vaccination et vermifuge à jour.',
    images: [
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: false,
    location: 'Ouagadougou, Burkina Faso',
    breeder: {
      name: 'Élevage Burkinabé',
      phone: '+226 70 12 34 56',
      email: 'elevage@burkina.bf'
    },
    available: true,
    postedDate: '2024-01-19'
  },
  {
    id: 'listing-6',
    breedId: 'husky',
    name: 'Alaska',
    age: 5,
    ageUnit: 'mois',
    gender: 'Femelle',
    price: 650000,
    description: 'Superbe femelle Husky aux yeux bleus. Très énergique et joueuse. Parents importés de Sibérie. Nécessite famille sportive et jardin.',
    images: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Bamako, Mali',
    breeder: {
      name: 'Élevage Malien',
      phone: '+223 76 12 34 56',
      email: 'elevage@mali.ml'
    },
    available: true,
    postedDate: '2024-01-21'
  },
  {
    id: 'listing-7',
    breedId: 'golden-retriever',
    name: 'Buddy',
    age: 2,
    ageUnit: 'ans',
    gender: 'Mâle',
    price: 400000,
    description: 'Golden Retriever adulte cherche nouvelle famille. Très gentil et obéissant. Parfait avec enfants. Cause déménagement.',
    images: [
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Niamey, Niger',
    breeder: {
      name: 'Particulier',
      phone: '+227 96 12 34 56',
      email: 'particulier@niger.ne'
    },
    available: true,
    postedDate: '2024-01-23'
  },
  {
    id: 'listing-8',
    breedId: 'labrador',
    name: 'Daisy',
    age: 12,
    ageUnit: 'semaines',
    gender: 'Femelle',
    price: 575000,
    description: 'Femelle Labrador sable, très douce. Élevée en famille, habituée aux enfants. Parents testés santé. Disponible mi-février.',
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Conakry, Guinée',
    breeder: {
      name: 'Élevage Guinéen',
      phone: '+224 622 12 34 56',
      email: 'elevage@guinee.gn'
    },
    available: true,
    postedDate: '2024-01-17'
  },
  {
    id: 'listing-9',
    breedId: 'berger-australien',
    name: 'Blue',
    age: 8,
    ageUnit: 'semaines',
    gender: 'Mâle',
    price: 700000,
    description: 'Magnifique chiot Berger Australien bleu merle aux yeux vairons. Très vif et intelligent. Parents champions d\'agility. Idéal pour sport canin.',
    images: [
      'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Dakar, Sénégal',
    breeder: {
      name: 'Élevage Sénégalais Sport',
      phone: '+221 77 234 56 78',
      email: 'sport@senegal.sn'
    },
    available: true,
    postedDate: '2024-01-24'
  },
  {
    id: 'listing-10',
    breedId: 'berger-belge-malinois',
    name: 'Titan',
    age: 6,
    ageUnit: 'mois',
    gender: 'Mâle',
    price: 900000,
    description: 'Jeune Malinois mâle, lignée de travail exceptionnelle. Très intelligent et obéissant. Débourré mordant. Pour maître expérimenté uniquement.',
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Abidjan, Côte d\'Ivoire',
    breeder: {
      name: 'Élevage Elite Ivoirien',
      phone: '+225 07 23 45 67 89',
      email: 'elite@cotedivoire.ci'
    },
    available: true,
    postedDate: '2024-01-16'
  },
  {
    id: 'listing-11',
    breedId: 'berger-blanc-suisse',
    name: 'Snow',
    age: 10,
    ageUnit: 'semaines',
    gender: 'Femelle',
    price: 675000,
    description: 'Adorable femelle Berger Blanc Suisse. Pelage blanc immaculé, très douce et sociable. Parents importés de Suisse. Parfaite pour famille.',
    images: [
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Lomé, Togo',
    breeder: {
      name: 'Élevage Togolais Premium',
      phone: '+228 90 23 45 67',
      email: 'premium@togo.tg'
    },
    available: true,
    postedDate: '2024-01-25'
  },
  {
    id: 'listing-12',
    breedId: 'border-collie',
    name: 'Flash',
    age: 3,
    ageUnit: 'mois',
    gender: 'Mâle',
    price: 550000,
    description: 'Chiot Border Collie noir et blanc, extrêmement intelligent. Parents champions de troupeau. Nécessite famille très active et stimulation mentale.',
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Cotonou, Bénin',
    breeder: {
      name: 'Élevage Béninois Actif',
      phone: '+229 97 23 45 67',
      email: 'actif@benin.bj'
    },
    available: true,
    postedDate: '2024-01-20'
  },
  {
    id: 'listing-13',
    breedId: 'berger-pyrenees',
    name: 'Pixel',
    age: 12,
    ageUnit: 'semaines',
    gender: 'Mâle',
    price: 475000,
    description: 'Petit Berger des Pyrénées fauve, très vif et courageux. Excellent pour l\'agility. Socialisé avec enfants et autres chiens.',
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: false,
    location: 'Ouagadougou, Burkina Faso',
    breeder: {
      name: 'Élevage Burkinabé Agility',
      phone: '+226 70 23 45 67',
      email: 'agility@burkina.bf'
    },
    available: true,
    postedDate: '2024-01-22'
  },
  {
    id: 'listing-14',
    breedId: 'berger-australien',
    name: 'Ruby',
    age: 4,
    ageUnit: 'mois',
    gender: 'Femelle',
    price: 675000,
    description: 'Femelle Berger Australien rouge tricolore. Très affectueuse et joueuse. Parents testés génétiquement. Excellente pour famille sportive.',
    images: [
      'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Bamako, Mali',
    breeder: {
      name: 'Élevage Malien Familial',
      phone: '+223 76 23 45 67',
      email: 'familial@mali.ml'
    },
    available: true,
    postedDate: '2024-01-19'
  },
  {
    id: 'listing-15',
    breedId: 'berger-hollandais',
    name: 'Duke',
    age: 5,
    ageUnit: 'mois',
    gender: 'Mâle',
    price: 800000,
    description: 'Berger Hollandais bringé, très athlétique. Lignée de travail, excellent pour le ring ou le mordant. Caractère équilibré.',
    images: [
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Niamey, Niger',
    breeder: {
      name: 'Élevage Nigérien Pro',
      phone: '+227 96 23 45 67',
      email: 'pro@niger.ne'
    },
    available: true,
    postedDate: '2024-01-21'
  },
  {
    id: 'listing-16',
    breedId: 'berger-shetland',
    name: 'Muffin',
    age: 10,
    ageUnit: 'semaines',
    gender: 'Femelle',
    price: 525000,
    description: 'Adorable femelle Sheltie tricolore. Très intelligente et facile à éduquer. Parfaite pour famille avec enfants. Pelage magnifique.',
    images: [
      'https://images.unsplash.com/photo-1609457782398-e82f59c9c9d0?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Conakry, Guinée',
    breeder: {
      name: 'Élevage Guinéen Familial',
      phone: '+224 622 23 45 67',
      email: 'familial@guinee.gn'
    },
    available: true,
    postedDate: '2024-01-23'
  },
  {
    id: 'listing-17',
    breedId: 'rottweiler',
    name: 'Thor',
    age: 4,
    ageUnit: 'mois',
    gender: 'Mâle',
    price: 700000,
    description: 'Mâle Rottweiler imposant, très bon caractère. Parents testés dysplasie et cardio. Socialisé dès le plus jeune âge. Pour maître responsable.',
    images: [
      'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Dakar, Sénégal',
    breeder: {
      name: 'Élevage Sénégalais Garde',
      phone: '+221 77 345 67 89',
      email: 'garde@senegal.sn'
    },
    available: true,
    postedDate: '2024-01-18'
  },
  {
    id: 'listing-18',
    breedId: 'doberman',
    name: 'Athena',
    age: 3,
    ageUnit: 'mois',
    gender: 'Femelle',
    price: 775000,
    description: 'Femelle Doberman noire et feu, très élégante. Lignée de beauté et de travail. Caractère équilibré, excellente pour la garde et la compagnie.',
    images: [
      'https://images.unsplash.com/photo-1603966242246-c1e5b0f6f20e?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Abidjan, Côte d\'Ivoire',
    breeder: {
      name: 'Élevage Ivoirien Elite',
      phone: '+225 07 34 56 78 90',
      email: 'elite@abidjan.ci'
    },
    available: true,
    postedDate: '2024-01-24'
  },
  {
    id: 'listing-19',
    breedId: 'boxer',
    name: 'Rocky',
    age: 8,
    ageUnit: 'semaines',
    gender: 'Mâle',
    price: 600000,
    description: 'Chiot Boxer fauve, très joueur et affectueux. Excellent avec les enfants. Parents testés santé. Idéal pour famille active.',
    images: [
      'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Lomé, Togo',
    breeder: {
      name: 'Élevage Togolais Familial',
      phone: '+228 90 34 56 78',
      email: 'familial@lome.tg'
    },
    available: true,
    postedDate: '2024-01-25'
  },
  {
    id: 'listing-20',
    breedId: 'border-collie',
    name: 'Bella',
    age: 2,
    ageUnit: 'mois',
    gender: 'Femelle',
    price: 525000,
    description: 'Femelle Border Collie tricolore, très intelligente. Parents champions d\'obéissance. Parfaite pour agility ou obé-rythmée.',
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: false,
    location: 'Cotonou, Bénin',
    breeder: {
      name: 'Élevage Béninois Sport',
      phone: '+229 97 34 56 78',
      email: 'sport@cotonou.bj'
    },
    available: true,
    postedDate: '2024-01-26'
  },
  {
    id: 'listing-21',
    breedId: 'berger-allemand',
    name: 'Kira',
    age: 3,
    ageUnit: 'mois',
    gender: 'Femelle',
    price: 725000,
    description: 'Femelle Berger Allemand noir et feu, lignée de beauté. Très équilibrée, sociable avec enfants et animaux. Parents champions.',
    images: [
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Ouagadougou, Burkina Faso',
    breeder: {
      name: 'Élevage Burkinabé Champion',
      phone: '+226 70 34 56 78',
      email: 'champion@ouaga.bf'
    },
    available: true,
    postedDate: '2024-01-20'
  },
  {
    id: 'listing-22',
    breedId: 'berger-belge-malinois',
    name: 'Nala',
    age: 4,
    ageUnit: 'mois',
    gender: 'Femelle',
    price: 850000,
    description: 'Femelle Malinois fauve charbonné, très vive et intelligente. Lignée de travail police. Excellente pour le sport de mordant.',
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Bamako, Mali',
    breeder: {
      name: 'Élevage Malien Police',
      phone: '+223 76 34 56 78',
      email: 'police@bamako.ml'
    },
    available: true,
    postedDate: '2024-01-22'
  },
  {
    id: 'listing-23',
    breedId: 'berger-australien',
    name: 'Cooper',
    age: 10,
    ageUnit: 'semaines',
    gender: 'Mâle',
    price: 650000,
    description: 'Mâle Berger Australien noir tricolore. Très joueur et affectueux. Parents testés MDR1 et CEA. Idéal pour famille sportive.',
    images: [
      'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Niamey, Niger',
    breeder: {
      name: 'Élevage Nigérien Sport',
      phone: '+227 96 34 56 78',
      email: 'sport@niamey.ne'
    },
    available: true,
    postedDate: '2024-01-24'
  },
  {
    id: 'listing-24',
    breedId: 'husky',
    name: 'Storm',
    age: 6,
    ageUnit: 'mois',
    gender: 'Mâle',
    price: 625000,
    description: 'Jeune Husky mâle aux yeux bleus perçants. Très énergique, parfait pour cani-cross ou cani-VTT. Nécessite beaucoup d\'exercice.',
    images: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Conakry, Guinée',
    breeder: {
      name: 'Élevage Guinéen Nordique',
      phone: '+224 622 34 56 78',
      email: 'nordique@conakry.gn'
    },
    available: true,
    postedDate: '2024-01-21'
  },
  {
    id: 'listing-25',
    breedId: 'labrador',
    name: 'Oscar',
    age: 3,
    ageUnit: 'mois',
    gender: 'Mâle',
    price: 575000,
    description: 'Mâle Labrador noir, très joueur. Lignée de chasse et de travail. Parents testés dysplasie et oculaire. Excellent caractère.',
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80'
    ],
    pedigree: true,
    vaccinated: true,
    microchipped: true,
    location: 'Dakar, Sénégal',
    breeder: {
      name: 'Élevage Sénégalais Océan',
      phone: '+221 77 456 78 90',
      email: 'ocean@dakar.sn'
    },
    available: true,
    postedDate: '2024-01-23'
  }
];

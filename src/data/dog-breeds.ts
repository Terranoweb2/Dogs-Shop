
import { DogBreed } from '@/types/dog';

export const dogBreeds: DogBreed[] = [
  {
    id: 'golden-retriever',
    name: 'Golden Retriever',
    nameEn: 'Golden Retriever',
    description: 'Le Golden Retriever est un chien de taille moyenne à grande, connu pour son tempérament amical et sa loyauté. Excellent chien de famille, il est intelligent, patient et facile à dresser.',
    origin: 'Écosse',
    size: 'Grand',
    weight: '25-34 kg',
    lifeExpectancy: '10-12 ans',
    temperament: ['Amical', 'Intelligent', 'Dévoué', 'Fiable', 'Digne de confiance'],
    exerciseNeeds: 'Élevé',
    groomingNeeds: 'Modéré',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium pour chiots grandes races',
        dailyAmount: '300-400g (selon poids)',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes pour chiens actifs grandes races',
        dailyAmount: '350-450g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior grandes races',
        dailyAmount: '300-350g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Avocat', 'Xylitol'],
      recommendations: [
        'Privilégier les protéines de qualité (poulet, poisson)',
        'Surveiller le poids pour éviter l\'obésité',
        'Eau fraîche disponible en permanence',
        'Éviter les exercices intenses après les repas'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Dysplasie de la hanche',
        'Problèmes oculaires (cataracte)',
        'Problèmes cardiaques',
        'Allergies cutanées'
      ],
      vaccinations: [
        { name: 'DHPP (Maladie de Carré, Hépatite, Parvovirose, Parainfluenza)', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Annuel ou tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' },
        { name: 'Toux de chenil', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Traitement anti-puces mensuel',
        'Traitement anti-tiques pendant la saison'
      ],
      checkupFrequency: 'Visite annuelle, semestrielle après 7 ans'
    }
  },
  {
    id: 'labrador',
    name: 'Labrador Retriever',
    nameEn: 'Labrador Retriever',
    description: 'Le Labrador est l\'une des races les plus populaires au monde. Affectueux, joueur et très intelligent, il excelle comme chien de famille, chien d\'assistance et chien de travail.',
    origin: 'Canada (Terre-Neuve)',
    size: 'Grand',
    weight: '25-36 kg',
    lifeExpectancy: '10-12 ans',
    temperament: ['Amical', 'Actif', 'Extraverti', 'Gentil', 'Agile'],
    exerciseNeeds: 'Très Élevé',
    groomingNeeds: 'Modéré',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium pour chiots grandes races',
        dailyAmount: '300-450g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes pour chiens actifs',
        dailyAmount: '350-500g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes light senior',
        dailyAmount: '300-400g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Avocat', 'Noix de macadamia'],
      recommendations: [
        'Contrôler les portions (tendance à l\'embonpoint)',
        'Protéines de haute qualité essentielles',
        'Oméga-3 pour la santé du pelage',
        'Éviter les friandises excessives'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Dysplasie de la hanche et du coude',
        'Obésité',
        'Problèmes oculaires',
        'Otites'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces mensuel',
        'Anti-tiques en saison'
      ],
      checkupFrequency: 'Visite annuelle obligatoire'
    }
  },
  {
    id: 'berger-allemand',
    name: 'Berger Allemand',
    nameEn: 'German Shepherd',
    description: 'Le Berger Allemand est un chien de travail polyvalent, intelligent et courageux. Utilisé dans la police, l\'armée et comme chien d\'assistance, il est également un excellent compagnon familial.',
    origin: 'Allemagne',
    size: 'Grand',
    weight: '22-40 kg',
    lifeExpectancy: '9-13 ans',
    temperament: ['Intelligent', 'Courageux', 'Loyal', 'Vigilant', 'Confiant'],
    exerciseNeeds: 'Très Élevé',
    groomingNeeds: 'Élevé',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes spéciales chiots grandes races',
        dailyAmount: '350-500g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes haute énergie grandes races',
        dailyAmount: '400-550g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior articulations',
        dailyAmount: '350-450g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Os cuits'],
      recommendations: [
        'Protéines animales de qualité (minimum 25%)',
        'Glucosamine pour les articulations',
        'Repas fractionnés pour éviter la torsion d\'estomac',
        'Calcium contrôlé pour les chiots'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Dysplasie de la hanche',
        'Myélopathie dégénérative',
        'Torsion d\'estomac',
        'Allergies cutanées'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces et tiques mensuel',
        'Prévention dirofilariose en zone à risque'
      ],
      checkupFrequency: 'Visite semestrielle recommandée'
    }
  },
  {
    id: 'berger-australien',
    name: 'Berger Australien',
    nameEn: 'Australian Shepherd',
    description: 'Le Berger Australien est un chien de berger énergique et intelligent, malgré son nom originaire des États-Unis. Très polyvalent, il excelle dans les sports canins et comme chien de famille actif.',
    origin: 'États-Unis',
    size: 'Moyen',
    weight: '16-32 kg',
    lifeExpectancy: '12-15 ans',
    temperament: ['Intelligent', 'Énergique', 'Loyal', 'Protecteur', 'Travailleur'],
    exerciseNeeds: 'Très Élevé',
    groomingNeeds: 'Élevé',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium chiots moyennes races actives',
        dailyAmount: '250-350g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes haute énergie sport',
        dailyAmount: '300-400g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior actives',
        dailyAmount: '250-350g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Avocat', 'Caféine'],
      recommendations: [
        'Protéines élevées pour soutenir l\'activité',
        'Oméga-3 pour le pelage et les articulations',
        'Adapter les portions selon l\'activité physique',
        'Éviter la suralimentation malgré l\'activité'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Dysplasie de la hanche',
        'Problèmes oculaires (cataracte, anomalie de l\'œil du colley)',
        'Épilepsie',
        'Sensibilité médicamenteuse (gène MDR1)'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces mensuel (attention aux produits avec ivermectine)',
        'Anti-tiques mensuel',
        'Test génétique MDR1 recommandé'
      ],
      checkupFrequency: 'Visite annuelle, examen oculaire régulier'
    }
  },
  {
    id: 'berger-belge-malinois',
    name: 'Berger Belge Malinois',
    nameEn: 'Belgian Malinois',
    description: 'Le Malinois est un chien de travail d\'élite, utilisé par les forces de l\'ordre et l\'armée du monde entier. Extrêmement intelligent, athlétique et dévoué, il nécessite un maître expérimenté.',
    origin: 'Belgique',
    size: 'Grand',
    weight: '20-30 kg',
    lifeExpectancy: '12-14 ans',
    temperament: ['Intelligent', 'Protecteur', 'Énergique', 'Alerte', 'Travailleur'],
    exerciseNeeds: 'Très Élevé',
    groomingNeeds: 'Modéré',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: false,
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium chiots grandes races sportives',
        dailyAmount: '300-450g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes haute performance',
        dailyAmount: '350-500g',
        frequency: '2-3 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior actives articulations',
        dailyAmount: '300-400g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Os cuits', 'Aliments gras'],
      recommendations: [
        'Protéines très élevées (minimum 30%)',
        'Glucides complexes pour l\'endurance',
        'Suppléments pour articulations recommandés',
        'Hydratation abondante après l\'exercice'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Dysplasie de la hanche et du coude',
        'Atrophie rétinienne progressive',
        'Épilepsie',
        'Sensibilité à l\'anesthésie'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' },
        { name: 'Bordetella', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces et tiques mensuel',
        'Prévention dirofilariose'
      ],
      checkupFrequency: 'Visite semestrielle recommandée'
    }
  },
  {
    id: 'berger-blanc-suisse',
    name: 'Berger Blanc Suisse',
    nameEn: 'White Swiss Shepherd',
    description: 'Le Berger Blanc Suisse est un chien élégant au pelage blanc immaculé. Cousin du Berger Allemand, il est doux, attentif et excellent chien de famille tout en conservant ses instincts de gardien.',
    origin: 'Suisse',
    size: 'Grand',
    weight: '25-40 kg',
    lifeExpectancy: '12-14 ans',
    temperament: ['Doux', 'Attentif', 'Loyal', 'Vigilant', 'Sociable'],
    exerciseNeeds: 'Élevé',
    groomingNeeds: 'Élevé',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium chiots grandes races',
        dailyAmount: '300-450g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes grandes races actives',
        dailyAmount: '350-500g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior grandes races',
        dailyAmount: '300-400g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Avocat'],
      recommendations: [
        'Protéines de qualité pour le pelage blanc',
        'Oméga-3 et 6 pour la brillance du poil',
        'Éviter les colorants alimentaires',
        'Calcium et phosphore équilibrés'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Dysplasie de la hanche',
        'Problèmes digestifs',
        'Allergies cutanées',
        'Sensibilité au soleil (pelage blanc)'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces mensuel',
        'Anti-tiques mensuel',
        'Protection solaire pour le museau en été'
      ],
      checkupFrequency: 'Visite annuelle'
    }
  },
  {
    id: 'border-collie',
    name: 'Border Collie',
    nameEn: 'Border Collie',
    description: 'Le Border Collie est considéré comme la race de chien la plus intelligente. Chien de berger par excellence, il a besoin d\'une stimulation mentale et physique intense. Idéal pour les sports canins.',
    origin: 'Grande-Bretagne',
    size: 'Moyen',
    weight: '14-20 kg',
    lifeExpectancy: '12-15 ans',
    temperament: ['Très intelligent', 'Énergique', 'Attentif', 'Réactif', 'Travailleur'],
    exerciseNeeds: 'Très Élevé',
    groomingNeeds: 'Modéré',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium chiots moyennes races',
        dailyAmount: '200-300g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes haute énergie sport',
        dailyAmount: '250-350g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior actives',
        dailyAmount: '200-300g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Caféine', 'Xylitol'],
      recommendations: [
        'Protéines élevées (minimum 28%)',
        'Glucides complexes pour l\'endurance',
        'Acides gras essentiels pour le pelage',
        'Portions adaptées à l\'activité intense'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Dysplasie de la hanche',
        'Anomalie de l\'œil du colley (CEA)',
        'Épilepsie',
        'Sensibilité médicamenteuse (MDR1)'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces mensuel (éviter ivermectine)',
        'Anti-tiques mensuel',
        'Test génétique MDR1 et CEA recommandé'
      ],
      checkupFrequency: 'Visite annuelle, examen oculaire régulier'
    }
  },
  {
    id: 'berger-pyrenees',
    name: 'Berger des Pyrénées',
    nameEn: 'Pyrenean Shepherd',
    description: 'Le Berger des Pyrénées est un petit chien de berger vif et courageux. Malgré sa petite taille, c\'est un travailleur infatigable, très attaché à son maître et excellent en agility.',
    origin: 'France (Pyrénées)',
    size: 'Petit',
    weight: '8-15 kg',
    lifeExpectancy: '15-17 ans',
    temperament: ['Vif', 'Courageux', 'Méfiant', 'Énergique', 'Dévoué'],
    exerciseNeeds: 'Très Élevé',
    groomingNeeds: 'Élevé',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium chiots petites races actives',
        dailyAmount: '120-180g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes petites races haute énergie',
        dailyAmount: '150-220g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior petites races',
        dailyAmount: '120-180g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Avocat'],
      recommendations: [
        'Protéines de qualité pour l\'énergie',
        'Croquettes adaptées aux petites mâchoires',
        'Portions fractionnées',
        'Eau fraîche toujours disponible'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Luxation de la rotule',
        'Problèmes dentaires',
        'Dysplasie de la hanche (rare)',
        'Allergies cutanées'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces mensuel',
        'Anti-tiques mensuel',
        'Brossage régulier du pelage'
      ],
      checkupFrequency: 'Visite annuelle, soins dentaires réguliers'
    }
  },
  {
    id: 'bouledogue-francais',
    name: 'Bouledogue Français',
    nameEn: 'French Bulldog',
    description: 'Le Bouledogue Français est un petit chien compact et musclé, au caractère affectueux et joueur. Parfait pour la vie en appartement, il est un excellent compagnon pour les familles.',
    origin: 'France',
    size: 'Petit',
    weight: '8-14 kg',
    lifeExpectancy: '10-12 ans',
    temperament: ['Affectueux', 'Joueur', 'Sociable', 'Patient', 'Alerte'],
    exerciseNeeds: 'Modéré',
    groomingNeeds: 'Faible',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes pour chiots petites races',
        dailyAmount: '100-150g',
        frequency: '3 repas par jour'
      },
      adultFood: {
        type: 'Croquettes petites races',
        dailyAmount: '120-180g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior petites races',
        dailyAmount: '100-150g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Produits laitiers (intolérance fréquente)'],
      recommendations: [
        'Éviter la suralimentation (tendance à l\'obésité)',
        'Croquettes adaptées aux mâchoires brachycéphales',
        'Protéines digestibles',
        'Surveiller les allergies alimentaires'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Problèmes respiratoires (brachycéphalie)',
        'Allergies cutanées',
        'Problèmes de dos',
        'Sensibilité à la chaleur'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Toux de chenil', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces mensuel',
        'Nettoyage des plis faciaux quotidien'
      ],
      checkupFrequency: 'Visite annuelle, surveillance respiratoire'
    }
  },
  {
    id: 'beagle',
    name: 'Beagle',
    nameEn: 'Beagle',
    description: 'Le Beagle est un chien de chasse de taille moyenne, joyeux et curieux. Excellent avec les enfants, il est énergique et nécessite beaucoup d\'exercice et de stimulation mentale.',
    origin: 'Angleterre',
    size: 'Moyen',
    weight: '9-11 kg',
    lifeExpectancy: '12-15 ans',
    temperament: ['Joyeux', 'Curieux', 'Amical', 'Déterminé', 'Doux'],
    exerciseNeeds: 'Élevé',
    groomingNeeds: 'Faible',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes pour chiots moyennes races',
        dailyAmount: '150-200g',
        frequency: '3 repas par jour'
      },
      adultFood: {
        type: 'Croquettes moyennes races actives',
        dailyAmount: '180-240g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior moyennes races',
        dailyAmount: '150-200g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Aliments gras'],
      recommendations: [
        'Contrôler les portions (tendance à la gourmandise)',
        'Protéines de qualité',
        'Fibres pour la satiété',
        'Éviter les restes de table'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Obésité',
        'Problèmes d\'oreilles',
        'Épilepsie',
        'Hypothyroïdie'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces et tiques mensuel',
        'Nettoyage des oreilles hebdomadaire'
      ],
      checkupFrequency: 'Visite annuelle'
    }
  },
  {
    id: 'husky',
    name: 'Husky Sibérien',
    nameEn: 'Siberian Husky',
    description: 'Le Husky Sibérien est un chien de travail nordique, énergique et indépendant. Avec ses yeux bleus caractéristiques et son pelage épais, il nécessite beaucoup d\'exercice et d\'espace.',
    origin: 'Sibérie',
    size: 'Grand',
    weight: '16-27 kg',
    lifeExpectancy: '12-14 ans',
    temperament: ['Énergique', 'Indépendant', 'Amical', 'Alerte', 'Doux'],
    exerciseNeeds: 'Très Élevé',
    groomingNeeds: 'Élevé',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: false,
    imageUrl: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes pour chiots grandes races actives',
        dailyAmount: '300-400g',
        frequency: '3 repas par jour'
      },
      adultFood: {
        type: 'Croquettes haute énergie',
        dailyAmount: '350-450g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior actives',
        dailyAmount: '300-400g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Avocat'],
      recommendations: [
        'Protéines élevées (minimum 30%)',
        'Graisses saines pour l\'énergie',
        'Eau fraîche en abondance',
        'Adapter selon l\'activité physique'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Dysplasie de la hanche',
        'Problèmes oculaires (cataracte)',
        'Hypothyroïdie',
        'Dermatite'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces et tiques mensuel',
        'Brossage régulier pendant la mue'
      ],
      checkupFrequency: 'Visite annuelle, examen oculaire régulier'
    }
  },
  {
    id: 'berger-hollandais',
    name: 'Berger Hollandais',
    nameEn: 'Dutch Shepherd',
    description: 'Le Berger Hollandais est un chien de travail polyvalent, cousin du Berger Allemand et du Malinois. Intelligent, athlétique et dévoué, il excelle dans tous les domaines du travail canin.',
    origin: 'Pays-Bas',
    size: 'Grand',
    weight: '23-30 kg',
    lifeExpectancy: '11-14 ans',
    temperament: ['Intelligent', 'Loyal', 'Fiable', 'Alerte', 'Athlétique'],
    exerciseNeeds: 'Très Élevé',
    groomingNeeds: 'Modéré',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium chiots grandes races sportives',
        dailyAmount: '300-450g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes haute performance',
        dailyAmount: '350-500g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior actives',
        dailyAmount: '300-400g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Os cuits'],
      recommendations: [
        'Protéines de haute qualité (minimum 28%)',
        'Glucosamine pour les articulations',
        'Acides gras oméga-3',
        'Portions adaptées à l\'activité'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Dysplasie de la hanche',
        'Problèmes oculaires',
        'Allergies',
        'Problèmes thyroïdiens'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces et tiques mensuel',
        'Brossage régulier'
      ],
      checkupFrequency: 'Visite annuelle'
    }
  },
  {
    id: 'berger-shetland',
    name: 'Berger des Shetland',
    nameEn: 'Shetland Sheepdog',
    description: 'Le Berger des Shetland, ou Sheltie, ressemble à un Collie miniature. Intelligent, affectueux et facile à dresser, c\'est un excellent chien de famille et de compagnie.',
    origin: 'Écosse (Îles Shetland)',
    size: 'Petit',
    weight: '6-12 kg',
    lifeExpectancy: '12-14 ans',
    temperament: ['Intelligent', 'Affectueux', 'Joueur', 'Alerte', 'Loyal'],
    exerciseNeeds: 'Élevé',
    groomingNeeds: 'Élevé',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1609457782398-e82f59c9c9d0?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium chiots petites races',
        dailyAmount: '120-180g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes petites races actives',
        dailyAmount: '150-220g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior petites races',
        dailyAmount: '120-180g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Xylitol'],
      recommendations: [
        'Protéines de qualité pour le pelage',
        'Oméga-3 et 6 pour la brillance',
        'Portions contrôlées',
        'Éviter la suralimentation'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Anomalie de l\'œil du colley',
        'Dysplasie de la hanche',
        'Hypothyroïdie',
        'Dermatomyosite'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces mensuel',
        'Anti-tiques mensuel',
        'Brossage quotidien recommandé'
      ],
      checkupFrequency: 'Visite annuelle, examen oculaire régulier'
    }
  },
  {
    id: 'rottweiler',
    name: 'Rottweiler',
    nameEn: 'Rottweiler',
    description: 'Le Rottweiler est un chien puissant et confiant, utilisé historiquement pour la garde et le travail. Avec une éducation appropriée, c\'est un compagnon loyal et protecteur de sa famille.',
    origin: 'Allemagne',
    size: 'Grand',
    weight: '35-60 kg',
    lifeExpectancy: '8-10 ans',
    temperament: ['Confiant', 'Courageux', 'Calme', 'Loyal', 'Protecteur'],
    exerciseNeeds: 'Élevé',
    groomingNeeds: 'Faible',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: false,
    imageUrl: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes spéciales chiots grandes races',
        dailyAmount: '400-600g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes grandes races',
        dailyAmount: '500-700g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior grandes races articulations',
        dailyAmount: '400-600g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Os cuits', 'Aliments gras'],
      recommendations: [
        'Protéines de qualité (minimum 24%)',
        'Calcium contrôlé pour les chiots',
        'Glucosamine pour les articulations',
        'Repas fractionnés pour éviter la torsion d\'estomac'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Dysplasie de la hanche et du coude',
        'Torsion d\'estomac',
        'Problèmes cardiaques',
        'Cancer des os'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces et tiques mensuel',
        'Surveillance du poids'
      ],
      checkupFrequency: 'Visite semestrielle recommandée'
    }
  },
  {
    id: 'doberman',
    name: 'Doberman',
    nameEn: 'Doberman Pinscher',
    description: 'Le Doberman est un chien élégant et athlétique, connu pour son intelligence et sa loyauté. Excellent chien de garde et de compagnie, il nécessite une éducation ferme mais douce.',
    origin: 'Allemagne',
    size: 'Grand',
    weight: '27-45 kg',
    lifeExpectancy: '10-13 ans',
    temperament: ['Intelligent', 'Loyal', 'Alerte', 'Énergique', 'Obéissant'],
    exerciseNeeds: 'Très Élevé',
    groomingNeeds: 'Faible',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: false,
    imageUrl: 'https://images.unsplash.com/photo-1603966242246-c1e5b0f6f20e?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium chiots grandes races',
        dailyAmount: '350-500g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes grandes races actives',
        dailyAmount: '400-600g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior grandes races',
        dailyAmount: '350-500g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Avocat'],
      recommendations: [
        'Protéines élevées pour la masse musculaire',
        'L-carnitine pour le cœur',
        'Repas fractionnés',
        'Éviter l\'exercice après les repas'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Cardiomyopathie dilatée',
        'Syndrome de Wobbler',
        'Dysplasie de la hanche',
        'Maladie de Von Willebrand'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces et tiques mensuel',
        'Examens cardiaques réguliers'
      ],
      checkupFrequency: 'Visite semestrielle, échocardiographie annuelle'
    }
  },
  {
    id: 'boxer',
    name: 'Boxer',
    nameEn: 'Boxer',
    description: 'Le Boxer est un chien énergique et joueur, connu pour son caractère joyeux et son attachement à sa famille. Excellent avec les enfants, il reste joueur toute sa vie.',
    origin: 'Allemagne',
    size: 'Grand',
    weight: '25-32 kg',
    lifeExpectancy: '10-12 ans',
    temperament: ['Joueur', 'Énergique', 'Loyal', 'Intelligent', 'Patient'],
    exerciseNeeds: 'Très Élevé',
    groomingNeeds: 'Faible',
    familyFriendly: true,
    goodWithChildren: true,
    goodWithPets: true,
    imageUrl: 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=800&q=80',
    nutritionGuide: {
      puppyFood: {
        type: 'Croquettes premium chiots grandes races',
        dailyAmount: '300-450g',
        frequency: '3-4 repas par jour'
      },
      adultFood: {
        type: 'Croquettes grandes races actives',
        dailyAmount: '350-500g',
        frequency: '2 repas par jour'
      },
      seniorFood: {
        type: 'Croquettes senior grandes races',
        dailyAmount: '300-450g',
        frequency: '2 repas par jour'
      },
      forbiddenFoods: ['Chocolat', 'Raisins', 'Oignons', 'Ail', 'Aliments gras'],
      recommendations: [
        'Protéines de qualité',
        'Éviter les céréales (allergies fréquentes)',
        'Portions contrôlées',
        'Eau fraîche en abondance'
      ]
    },
    healthInfo: {
      commonIssues: [
        'Cardiomyopathie',
        'Cancer',
        'Dysplasie de la hanche',
        'Problèmes thyroïdiens'
      ],
      vaccinations: [
        { name: 'DHPP', ageWeeks: 6, booster: 'Tous les 3 ans' },
        { name: 'Rage', ageWeeks: 12, booster: 'Tous les 3 ans' },
        { name: 'Leptospirose', ageWeeks: 8, booster: 'Annuel' }
      ],
      parasitePrevention: [
        'Vermifuge tous les 3 mois',
        'Anti-puces et tiques mensuel',
        'Surveillance cardiaque régulière'
      ],
      checkupFrequency: 'Visite annuelle, échocardiographie après 6 ans'
    }
  }
];

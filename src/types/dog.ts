
export interface DogBreed {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  origin: string;
  size: 'Petit' | 'Moyen' | 'Grand' | 'Très Grand';
  weight: string;
  lifeExpectancy: string;
  temperament: string[];
  exerciseNeeds: 'Faible' | 'Modéré' | 'Élevé' | 'Très Élevé';
  groomingNeeds: 'Faible' | 'Modéré' | 'Élevé';
  familyFriendly: boolean;
  goodWithChildren: boolean;
  goodWithPets: boolean;
  imageUrl: string;
  nutritionGuide: NutritionGuide;
  healthInfo: HealthInfo;
}

export interface NutritionGuide {
  puppyFood: {
    type: string;
    dailyAmount: string;
    frequency: string;
  };
  adultFood: {
    type: string;
    dailyAmount: string;
    frequency: string;
  };
  seniorFood: {
    type: string;
    dailyAmount: string;
    frequency: string;
  };
  forbiddenFoods: string[];
  recommendations: string[];
}

export interface HealthInfo {
  commonIssues: string[];
  vaccinations: VaccinationSchedule[];
  parasitePrevention: string[];
  checkupFrequency: string;
}

export interface VaccinationSchedule {
  name: string;
  ageWeeks: number;
  booster?: string;
}

export interface DogListing {
  id: string;
  breedId: string;
  name: string;
  age: number;
  ageUnit: 'semaines' | 'mois' | 'ans';
  gender: 'Mâle' | 'Femelle';
  price: number;
  description: string;
  images: string[];
  pedigree: boolean;
  vaccinated: boolean;
  microchipped: boolean;
  location: string;
  breeder: {
    name: string;
    phone: string;
    email: string;
  };
  available: boolean;
  postedDate: string;
  sellerId?: string;
}

export interface HealthRecord {
  id: string;
  dogId: string;
  dogName: string;
  breedId: string;
  dateOfBirth: string;
  vaccinations: {
    id: string;
    name: string;
    date: string;
    nextDue?: string;
    veterinarian: string;
  }[];
  veterinaryVisits: {
    id: string;
    date: string;
    reason: string;
    diagnosis: string;
    treatment: string;
    veterinarian: string;
  }[];
  parasiteTreatments: {
    id: string;
    type: 'Vermifuge' | 'Anti-puces' | 'Anti-tiques';
    date: string;
    nextDue: string;
    product: string;
  }[];
  weight: {
    date: string;
    weight: number;
  }[];
  notes: string;
}

export type PaymentMethod = 'orange-money' | 'mtn-money' | 'moov-money' | 'cash';
export type OrderStatus = 'pending' | 'deposit-paid' | 'fully-paid' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  listingId: string;
  dogName: string;
  breedName: string;
  buyerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  totalPrice: number;
  depositAmount: number;
  remainingAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  depositPaidAt?: string;
  fullyPaidAt?: string;
  completedAt?: string;
  notes: string;
}

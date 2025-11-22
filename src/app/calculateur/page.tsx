
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { dogBreeds } from '@/data/dog-breeds';
import { Calculator, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/currency';

interface CostEstimate {
  food: number;
  veterinary: number;
  grooming: number;
  accessories: number;
  insurance: number;
  training: number;
  total: number;
}

export default function CostCalculatorPage() {
  const [breedId, setBreedId] = useState('');
  const [age, setAge] = useState('puppy');
  const [activityLevel, setActivityLevel] = useState('normal');
  const [costs, setCosts] = useState<CostEstimate | null>(null);

  const calculateCosts = () => {
    const breed = dogBreeds.find(b => b.id === breedId);
    if (!breed) return;

    let foodCost = 0;
    let veterinaryCost = 0;
    let groomingCost = 0;
    let accessoriesCost = 0;
    let insuranceCost = 0;
    let trainingCost = 0;

    // Coût alimentation (mensuel) en XOF
    if (breed.size === 'Petit') {
      foodCost = age === 'puppy' ? 20000 : age === 'adult' ? 17500 : 15000;
    } else if (breed.size === 'Moyen') {
      foodCost = age === 'puppy' ? 30000 : age === 'adult' ? 27500 : 25000;
    } else {
      foodCost = age === 'puppy' ? 45000 : age === 'adult' ? 40000 : 35000;
    }

    if (activityLevel === 'high') {
      foodCost *= 1.2;
    }

    // Coût vétérinaire (annuel) en XOF
    veterinaryCost = age === 'puppy' ? 200000 : age === 'adult' ? 100000 : 175000;
    
    // Coût toilettage (mensuel) en XOF
    if (breed.groomingNeeds === 'Élevé') {
      groomingCost = breed.size === 'Petit' ? 20000 : breed.size === 'Moyen' ? 25000 : 30000;
    } else if (breed.groomingNeeds === 'Modéré') {
      groomingCost = breed.size === 'Petit' ? 12500 : breed.size === 'Moyen' ? 15000 : 17500;
    } else {
      groomingCost = 7500;
    }

    // Accessoires (annuel) en XOF
    accessoriesCost = age === 'puppy' ? 150000 : 75000;

    // Assurance (mensuel) en XOF
    insuranceCost = breed.size === 'Petit' ? 10000 : breed.size === 'Moyen' ? 15000 : 20000;

    // Éducation (annuel) en XOF
    trainingCost = age === 'puppy' ? 250000 : 0;

    const monthlyTotal = foodCost + groomingCost + insuranceCost;
    const annualTotal = (monthlyTotal * 12) + veterinaryCost + accessoriesCost + trainingCost;

    setCosts({
      food: foodCost,
      veterinary: veterinaryCost,
      grooming: groomingCost,
      accessories: accessoriesCost,
      insurance: insuranceCost,
      training: trainingCost,
      total: annualTotal
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="h-6 w-6 text-[#D4A574]" />
            <h2 className="text-2xl font-bold">Calculateur de coût</h2>
          </div>
          <p className="text-muted-foreground">
            Estimez le coût annuel d'entretien de votre futur compagnon
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Race du chien</Label>
                <Select value={breedId} onValueChange={setBreedId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une race" />
                  </SelectTrigger>
                  <SelectContent>
                    {dogBreeds.map((breed) => (
                      <SelectItem key={breed.id} value={breed.id}>
                        {breed.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Âge du chien</Label>
                <Select value={age} onValueChange={setAge}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="puppy">Chiot (0-1 an)</SelectItem>
                    <SelectItem value="adult">Adulte (1-7 ans)</SelectItem>
                    <SelectItem value="senior">Senior (7+ ans)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Niveau d'activité</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">Élevé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateCosts} 
                className="w-full"
                disabled={!breedId}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculer les coûts
              </Button>
            </CardContent>
          </Card>

          {costs && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#D4A574]" />
                  Estimation des coûts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Alimentation (mensuel)</span>
                    <span className="font-semibold">{formatPrice(costs.food)}</span>
                  </div>
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Toilettage (mensuel)</span>
                    <span className="font-semibold">{formatPrice(costs.grooming)}</span>
                  </div>
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Assurance (mensuel)</span>
                    <span className="font-semibold">{formatPrice(costs.insurance)}</span>
                  </div>
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vétérinaire (annuel)</span>
                    <span className="font-semibold">{formatPrice(costs.veterinary)}</span>
                  </div>
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Accessoires (annuel)</span>
                    <span className="font-semibold">{formatPrice(costs.accessories)}</span>
                  </div>
                  <Separator />
                  
                  {costs.training > 0 && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Éducation (annuel)</span>
                        <span className="font-semibold">{formatPrice(costs.training)}</span>
                      </div>
                      <Separator />
                    </>
                  )}
                  
                  <div className="flex justify-between items-center pt-3 border-t-2">
                    <span className="font-bold">Coût total annuel</span>
                    <span className="font-bold text-xl text-[#D4A574]">
                      {formatPrice(costs.total)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Soit par mois</span>
                    <span>{formatPrice(Math.round(costs.total / 12))}</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mt-4">
                  <div className="flex gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 dark:text-blue-100">
                      <p className="font-semibold mb-1">Note importante</p>
                      <p>
                        Ces estimations sont indicatives et peuvent varier selon votre région, 
                        les prestataires choisis et les besoins spécifiques de votre chien.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

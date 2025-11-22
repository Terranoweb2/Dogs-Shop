
'use client';

import { useState } from 'react';
import { dogBreeds } from '@/data/dog-breeds';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DogBreed } from '@/types/dog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

export default function BreedsPage() {
  const [search, setSearch] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<DogBreed | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredBreeds = dogBreeds.filter(breed =>
    breed.name.toLowerCase().includes(search.toLowerCase()) ||
    breed.description.toLowerCase().includes(search.toLowerCase()) ||
    breed.origin.toLowerCase().includes(search.toLowerCase())
  );

  const handleBreedClick = (breed: DogBreed) => {
    setSelectedBreed(breed);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Guide des races</h2>
          <p className="text-muted-foreground">
            Découvrez les caractéristiques de {dogBreeds.length} races de chiens
          </p>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Rechercher une race..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBreeds.map((breed) => (
            <Card
              key={breed.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleBreedClick(breed)}
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={breed.imageUrl}
                  alt={breed.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{breed.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{breed.origin}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline">{breed.size}</Badge>
                  <Badge variant="outline">{breed.weight}</Badge>
                  <Badge variant="outline">{breed.lifeExpectancy}</Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {breed.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBreed && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedBreed.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <img
                    src={selectedBreed.imageUrl}
                    alt={selectedBreed.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Informations</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                    <TabsTrigger value="health">Santé</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-muted-foreground">{selectedBreed.description}</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Origine</p>
                        <p className="font-medium">{selectedBreed.origin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Taille</p>
                        <p className="font-medium">{selectedBreed.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Poids</p>
                        <p className="font-medium">{selectedBreed.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Espérance de vie</p>
                        <p className="font-medium">{selectedBreed.lifeExpectancy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Besoins en exercice</p>
                        <p className="font-medium">{selectedBreed.exerciseNeeds}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Toilettage</p>
                        <p className="font-medium">{selectedBreed.groomingNeeds}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Tempérament</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBreed.temperament.map((trait) => (
                          <Badge key={trait} variant="secondary">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        {selectedBreed.familyFriendly ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span className="text-sm">Familial</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedBreed.goodWithChildren ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span className="text-sm">Enfants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedBreed.goodWithPets ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span className="text-sm">Animaux</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="nutrition" className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg flex gap-3">
                      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900 dark:text-blue-100">
                        Ces recommandations sont générales. Consultez votre vétérinaire pour un plan nutritionnel personnalisé.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Chiot (0-12 mois)</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Type:</span> {selectedBreed.nutritionGuide.puppyFood.type}</p>
                        <p><span className="font-medium">Quantité:</span> {selectedBreed.nutritionGuide.puppyFood.dailyAmount}</p>
                        <p><span className="font-medium">Fréquence:</span> {selectedBreed.nutritionGuide.puppyFood.frequency}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">Adulte (1-7 ans)</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Type:</span> {selectedBreed.nutritionGuide.adultFood.type}</p>
                        <p><span className="font-medium">Quantité:</span> {selectedBreed.nutritionGuide.adultFood.dailyAmount}</p>
                        <p><span className="font-medium">Fréquence:</span> {selectedBreed.nutritionGuide.adultFood.frequency}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">Senior (7+ ans)</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Type:</span> {selectedBreed.nutritionGuide.seniorFood.type}</p>
                        <p><span className="font-medium">Quantité:</span> {selectedBreed.nutritionGuide.seniorFood.dailyAmount}</p>
                        <p><span className="font-medium">Fréquence:</span> {selectedBreed.nutritionGuide.seniorFood.frequency}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3 text-red-600 dark:text-red-400">Aliments interdits</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBreed.nutritionGuide.forbiddenFoods.map((food) => (
                          <Badge key={food} variant="destructive">
                            {food}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">Recommandations</h4>
                      <ul className="space-y-2">
                        {selectedBreed.nutritionGuide.recommendations.map((rec, index) => (
                          <li key={index} className="flex gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="health" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Problèmes de santé courants</h4>
                      <ul className="space-y-2">
                        {selectedBreed.healthInfo.commonIssues.map((issue, index) => (
                          <li key={index} className="flex gap-2 text-sm">
                            <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">Calendrier vaccinal</h4>
                      <div className="space-y-3">
                        {selectedBreed.healthInfo.vaccinations.map((vac, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <p className="font-medium text-sm">{vac.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Première dose: {vac.ageWeeks} semaines
                            </p>
                            {vac.booster && (
                              <p className="text-xs text-muted-foreground">
                                Rappel: {vac.booster}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">Prévention parasitaire</h4>
                      <ul className="space-y-2">
                        {selectedBreed.healthInfo.parasitePrevention.map((prevention, index) => (
                          <li key={index} className="flex gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{prevention}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        Fréquence des visites vétérinaires
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-200 mt-1">
                        {selectedBreed.healthInfo.checkupFrequency}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

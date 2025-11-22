
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { dogBreeds } from '@/data/dog-breeds';
import { DogBreed } from '@/types/dog';
import { Scale, X, CheckCircle2, XCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function ComparisonPage() {
  const [selectedBreeds, setSelectedBreeds] = useState<(DogBreed | null)[]>([null, null, null]);

  const handleBreedSelect = (index: number, breedId: string) => {
    const breed = dogBreeds.find(b => b.id === breedId) || null;
    const newSelected = [...selectedBreeds];
    newSelected[index] = breed;
    setSelectedBreeds(newSelected);
  };

  const handleRemoveBreed = (index: number) => {
    const newSelected = [...selectedBreeds];
    newSelected[index] = null;
    setSelectedBreeds(newSelected);
  };

  const selectedCount = selectedBreeds.filter(b => b !== null).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-6 w-6 text-[#D4A574]" />
            <h2 className="text-2xl font-bold">Comparateur de races</h2>
          </div>
          <p className="text-muted-foreground">
            Comparez jusqu'à 3 races de chiens pour trouver celle qui vous convient le mieux
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[0, 1, 2].map((index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-sm">Race {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedBreeds[index] ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <img
                        src={selectedBreeds[index]!.imageUrl}
                        alt={selectedBreeds[index]!.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => handleRemoveBreed(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-semibold text-center">{selectedBreeds[index]!.name}</p>
                  </div>
                ) : (
                  <Select onValueChange={(value) => handleBreedSelect(index, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une race" />
                    </SelectTrigger>
                    <SelectContent>
                      {dogBreeds
                        .filter(breed => !selectedBreeds.some(sb => sb?.id === breed.id))
                        .map((breed) => (
                          <SelectItem key={breed.id} value={breed.id}>
                            {breed.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCount < 2 ? (
          <div className="text-center py-12">
            <Info className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Sélectionnez au moins 2 races pour commencer la comparaison
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Caractéristiques générales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Critère</th>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <th key={index} className="text-center p-3 font-medium">
                              {breed.name}
                            </th>
                          )
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Origine</td>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <td key={index} className="text-center p-3">
                              {breed.origin}
                            </td>
                          )
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Taille</td>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <td key={index} className="text-center p-3">
                              <Badge variant="outline">{breed.size}</Badge>
                            </td>
                          )
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Poids</td>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <td key={index} className="text-center p-3">
                              {breed.weight}
                            </td>
                          )
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Espérance de vie</td>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <td key={index} className="text-center p-3">
                              {breed.lifeExpectancy}
                            </td>
                          )
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Besoins en exercice</td>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <td key={index} className="text-center p-3">
                              <Badge 
                                variant={
                                  breed.exerciseNeeds === 'Très Élevé' ? 'destructive' :
                                  breed.exerciseNeeds === 'Élevé' ? 'default' :
                                  'secondary'
                                }
                              >
                                {breed.exerciseNeeds}
                              </Badge>
                            </td>
                          )
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Toilettage</td>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <td key={index} className="text-center p-3">
                              <Badge variant="outline">{breed.groomingNeeds}</Badge>
                            </td>
                          )
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compatibilité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Critère</th>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <th key={index} className="text-center p-3 font-medium">
                              {breed.name}
                            </th>
                          )
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Chien de famille</td>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <td key={index} className="text-center p-3">
                              {breed.familyFriendly ? (
                                <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" />
                              ) : (
                                <XCircle className="h-6 w-6 text-muted-foreground mx-auto" />
                              )}
                            </td>
                          )
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Bon avec les enfants</td>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <td key={index} className="text-center p-3">
                              {breed.goodWithChildren ? (
                                <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" />
                              ) : (
                                <XCircle className="h-6 w-6 text-muted-foreground mx-auto" />
                              )}
                            </td>
                          )
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Bon avec les animaux</td>
                        {selectedBreeds.map((breed, index) => (
                          breed && (
                            <td key={index} className="text-center p-3">
                              {breed.goodWithPets ? (
                                <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" />
                              ) : (
                                <XCircle className="h-6 w-6 text-muted-foreground mx-auto" />
                              )}
                            </td>
                          )
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tempérament</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedBreeds.map((breed, index) => (
                    breed && (
                      <div key={index}>
                        <h4 className="font-semibold mb-3">{breed.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {breed.temperament.map((trait) => (
                            <Badge key={trait} variant="secondary">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Problèmes de santé courants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedBreeds.map((breed, index) => (
                    breed && (
                      <div key={index}>
                        <h4 className="font-semibold mb-3">{breed.name}</h4>
                        <ul className="space-y-2">
                          {breed.healthInfo.commonIssues.map((issue, i) => (
                            <li key={i} className="flex gap-2 text-sm">
                              <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

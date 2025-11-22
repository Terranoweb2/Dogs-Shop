
'use client';

import { DogListing, DogBreed } from '@/types/dog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle2,
  XCircle,
  Info,
  ShoppingCart
} from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { formatPrice } from '@/lib/currency';
import { PaymentDialog } from '@/components/payment/PaymentDialog';

interface DogDetailDialogProps {
  listing: DogListing | null;
  breed: DogBreed | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DogDetailDialog({ listing, breed, open, onOpenChange }: DogDetailDialogProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  if (!listing || !breed) return null;

  const favorite = isFavorite(listing.id);

  const formatAge = () => {
    if (listing.ageUnit === 'semaines') {
      return `${listing.age} semaines`;
    } else if (listing.ageUnit === 'mois') {
      return `${listing.age} mois`;
    } else {
      return `${listing.age} an${listing.age > 1 ? 's' : ''}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 sm:p-6 pb-0">
            <DialogTitle className="text-xl sm:text-2xl pr-8">{listing.name}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-80px)]">
            <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-2">
              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-video sm:aspect-[16/10] overflow-hidden rounded-lg bg-muted">
                  <img
                    src={listing.images[currentImageIndex]}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {listing.images.length > 1 && (
                  <div className="flex gap-1.5 sm:gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
                    {listing.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all",
                          currentImageIndex === index ? "border-[#D4A574]" : "border-transparent opacity-70"
                        )}
                      >
                        <img
                          src={image}
                          alt={`${listing.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute top-2 right-2 h-9 w-9 sm:h-10 sm:w-10 bg-white/90 hover:bg-white shadow-sm",
                    favorite && "text-red-500"
                  )}
                  onClick={() => toggleFavorite(listing.id)}
                >
                  <Heart className={cn("h-5 w-5", favorite && "fill-current")} />
                </Button>
              </div>

              {/* Price and Breed Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">{breed.name}</h3>
                  <p className="text-sm text-muted-foreground">{breed.origin}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl sm:text-3xl font-bold text-[#D4A574]">{formatPrice(listing.price)}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <Badge variant="outline" className="text-xs sm:text-sm">{listing.gender}</Badge>
                <Badge variant="outline" className="text-xs sm:text-sm">{formatAge()}</Badge>
                <Badge variant="outline" className="text-xs sm:text-sm">{breed.size}</Badge>
                <Badge variant="outline" className="text-xs sm:text-sm">{breed.weight}</Badge>
                {listing.pedigree && <Badge className="text-xs sm:text-sm">LOF</Badge>}
                {listing.vaccinated && <Badge className="text-xs sm:text-sm">Vacciné</Badge>}
                {listing.microchipped && <Badge className="text-xs sm:text-sm">Pucé</Badge>}
              </div>

              {/* Tabs */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto">
                  <TabsTrigger value="description" className="text-xs sm:text-sm py-2 px-1 sm:px-3">Description</TabsTrigger>
                  <TabsTrigger value="breed" className="text-xs sm:text-sm py-2 px-1 sm:px-3">Race</TabsTrigger>
                  <TabsTrigger value="nutrition" className="text-xs sm:text-sm py-2 px-1 sm:px-3">Nutrition</TabsTrigger>
                  <TabsTrigger value="health" className="text-xs sm:text-sm py-2 px-1 sm:px-3">Santé</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">À propos de {listing.name}</h4>
                    <p className="text-muted-foreground text-sm">{listing.description}</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      {listing.pedigree ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="text-sm">Pedigree LOF</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {listing.vaccinated ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="text-sm">Vacciné</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {listing.microchipped ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="text-sm">Pucé</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm truncate">Publié le {formatDate(listing.postedDate)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3 text-sm sm:text-base">Éleveur</h4>
                    <div className="space-y-2">
                      <p className="font-medium text-sm sm:text-base">{listing.breeder.name}</p>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{listing.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{listing.breeder.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm truncate">{listing.breeder.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button className="flex-1" size="lg" onClick={() => setPaymentDialogOpen(true)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Réserver maintenant
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                      <Phone className="h-4 w-4 mr-2" />
                      Contacter
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="breed" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Description de la race</h4>
                    <p className="text-muted-foreground text-sm">{breed.description}</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Origine</p>
                      <p className="font-medium text-sm sm:text-base">{breed.origin}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Taille</p>
                      <p className="font-medium text-sm sm:text-base">{breed.size}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Poids</p>
                      <p className="font-medium text-sm sm:text-base">{breed.weight}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Espérance de vie</p>
                      <p className="font-medium text-sm sm:text-base">{breed.lifeExpectancy}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Exercice</p>
                      <p className="font-medium text-sm sm:text-base">{breed.exerciseNeeds}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Toilettage</p>
                      <p className="font-medium text-sm sm:text-base">{breed.groomingNeeds}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Tempérament</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {breed.temperament.map((trait) => (
                        <Badge key={trait} variant="secondary" className="text-xs sm:text-sm">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {breed.familyFriendly ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="text-xs sm:text-sm">Familial</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {breed.goodWithChildren ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="text-xs sm:text-sm">Enfants</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {breed.goodWithPets ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="text-xs sm:text-sm">Animaux</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="nutrition" className="space-y-4 mt-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 sm:p-4 rounded-lg flex gap-2 sm:gap-3">
                    <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
                      Ces recommandations sont générales. Consultez votre vétérinaire pour un plan personnalisé.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Chiot (0-12 mois)</h4>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <p><span className="font-medium">Type:</span> {breed.nutritionGuide.puppyFood.type}</p>
                      <p><span className="font-medium">Quantité:</span> {breed.nutritionGuide.puppyFood.dailyAmount}</p>
                      <p><span className="font-medium">Fréquence:</span> {breed.nutritionGuide.puppyFood.frequency}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Adulte (1-7 ans)</h4>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <p><span className="font-medium">Type:</span> {breed.nutritionGuide.adultFood.type}</p>
                      <p><span className="font-medium">Quantité:</span> {breed.nutritionGuide.adultFood.dailyAmount}</p>
                      <p><span className="font-medium">Fréquence:</span> {breed.nutritionGuide.adultFood.frequency}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Senior (7+ ans)</h4>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <p><span className="font-medium">Type:</span> {breed.nutritionGuide.seniorFood.type}</p>
                      <p><span className="font-medium">Quantité:</span> {breed.nutritionGuide.seniorFood.dailyAmount}</p>
                      <p><span className="font-medium">Fréquence:</span> {breed.nutritionGuide.seniorFood.frequency}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-red-600 dark:text-red-400 text-sm sm:text-base">Aliments interdits</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {breed.nutritionGuide.forbiddenFoods.map((food) => (
                        <Badge key={food} variant="destructive" className="text-xs sm:text-sm">
                          {food}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Recommandations</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {breed.nutritionGuide.recommendations.map((rec, index) => (
                        <li key={index} className="flex gap-2 text-xs sm:text-sm">
                          <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="health" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Problèmes de santé courants</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {breed.healthInfo.commonIssues.map((issue, index) => (
                        <li key={index} className="flex gap-2 text-xs sm:text-sm">
                          <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Calendrier vaccinal</h4>
                    <div className="space-y-2 sm:space-y-3">
                      {breed.healthInfo.vaccinations.map((vac, index) => (
                        <div key={index} className="border rounded-lg p-2.5 sm:p-3">
                          <p className="font-medium text-xs sm:text-sm">{vac.name}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                            Première dose: {vac.ageWeeks} semaines
                          </p>
                          {vac.booster && (
                            <p className="text-[10px] sm:text-xs text-muted-foreground">
                              Rappel: {vac.booster}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Prévention parasitaire</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {breed.healthInfo.parasitePrevention.map((prevention, index) => (
                        <li key={index} className="flex gap-2 text-xs sm:text-sm">
                          <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{prevention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="bg-green-50 dark:bg-green-950 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm font-medium text-green-900 dark:text-green-100">
                      Fréquence des visites vétérinaires
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-200 mt-1">
                      {breed.healthInfo.checkupFrequency}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <PaymentDialog
        listing={listing}
        breed={breed}
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
      />
    </>
  );
}

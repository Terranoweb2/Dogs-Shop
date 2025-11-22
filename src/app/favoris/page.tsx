
'use client';

import { useFavorites } from '@/hooks/use-favorites';
import { dogBreeds } from '@/data/dog-breeds';
import { dogListings } from '@/data/dog-listings';
import { DogCard } from '@/components/dogs/DogCard';
import { DogDetailDialog } from '@/components/dogs/DogDetailDialog';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { DogListing, DogBreed } from '@/types/dog';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [selectedListing, setSelectedListing] = useState<DogListing | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<DogBreed | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const favoriteListings = dogListings.filter(listing => 
    favorites.includes(listing.id)
  );

  const handleCardClick = (listing: DogListing) => {
    const breed = dogBreeds.find(b => b.id === listing.breedId);
    setSelectedListing(listing);
    setSelectedBreed(breed || null);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-20 lg:pb-6">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-[#D4A574]" />
            <h2 className="text-xl sm:text-2xl font-bold">Mes favoris</h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            {favoriteListings.length} chien{favoriteListings.length > 1 ? 's' : ''} sauvegardé{favoriteListings.length > 1 ? 's' : ''}
          </p>
        </div>

        {favoriteListings.length === 0 ? (
          <div className="text-center py-10 sm:py-12">
            <Heart className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-muted-foreground text-base sm:text-lg mb-2">
              Vous n'avez pas encore de favoris
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">
              Cliquez sur le cœur pour sauvegarder vos chiens préférés
            </p>
            <Link href="/annonces">
              <Button>Parcourir les annonces</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {favoriteListings.map((listing) => {
              const breed = dogBreeds.find(b => b.id === listing.breedId);
              if (!breed) return null;
              
              return (
                <DogCard
                  key={listing.id}
                  listing={listing}
                  breed={breed}
                  onClick={() => handleCardClick(listing)}
                />
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />

      <DogDetailDialog
        listing={selectedListing}
        breed={selectedBreed}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}

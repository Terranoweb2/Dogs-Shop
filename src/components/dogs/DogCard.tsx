
'use client';

import { DogListing } from '@/types/dog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/currency';

interface DogCardProps {
  listing: DogListing;
  breed: {
    name: string;
    size: string;
  };
  onClick: () => void;
}

export function DogCard({ listing, breed, onClick }: DogCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(listing.id);

  const formatAge = () => {
    if (listing.ageUnit === 'semaines') {
      return `${listing.age} sem.`;
    } else if (listing.ageUnit === 'mois') {
      return `${listing.age} mois`;
    } else {
      return `${listing.age} an${listing.age > 1 ? 's' : ''}`;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col">
      <div className="relative" onClick={onClick}>
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={listing.images[0]}
            alt={listing.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-1.5 right-1.5 xs:top-2 xs:right-2 h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9 bg-white/90 hover:bg-white shadow-sm",
            favorite && "text-red-500"
          )}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(listing.id);
          }}
        >
          <Heart className={cn("h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5", favorite && "fill-current")} />
        </Button>
        {!listing.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="text-xs xs:text-sm sm:text-lg">
              Vendu
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-2.5 xs:p-3 sm:p-4 flex-1 flex flex-col" onClick={onClick}>
        <div className="flex items-start justify-between gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm xs:text-base sm:text-lg truncate">{listing.name}</h3>
            <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground truncate">{breed.name}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-bold text-sm xs:text-base sm:text-lg text-[#D4A574] whitespace-nowrap">
              {formatPrice(listing.price)}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 xs:gap-1.5 mb-1.5 xs:mb-2 sm:mb-3">
          <Badge variant="outline" className="text-[9px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 sm:px-2 py-0.5">
            {listing.gender}
          </Badge>
          <Badge variant="outline" className="text-[9px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 sm:px-2 py-0.5">
            {formatAge()}
          </Badge>
          <Badge variant="outline" className="text-[9px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 sm:px-2 py-0.5">
            {breed.size}
          </Badge>
        </div>

        <div className="flex items-center gap-1 xs:gap-1.5 text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground mb-1.5 xs:mb-2 mt-auto">
          <MapPin className="h-2.5 w-2.5 xs:h-3 xs:w-3 flex-shrink-0" />
          <span className="truncate">{listing.location}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {listing.pedigree && (
            <Badge variant="secondary" className="text-[9px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 sm:px-2 py-0.5">
              LOF
            </Badge>
          )}
          {listing.vaccinated && (
            <Badge variant="secondary" className="text-[9px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 sm:px-2 py-0.5">
              Vacciné
            </Badge>
          )}
          {listing.microchipped && (
            <Badge variant="secondary" className="text-[9px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 sm:px-2 py-0.5 hidden xs:inline-flex">
              Pucé
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

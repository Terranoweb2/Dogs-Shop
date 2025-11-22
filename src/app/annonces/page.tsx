
'use client';

import { useState, useMemo, useEffect } from 'react';
import { dogBreeds } from '@/data/dog-breeds';
import { dogListings } from '@/data/dog-listings';
import { getFromLocalStorage, STORAGE_KEYS } from '@/lib/localStorage';
import { DogCard } from '@/components/dogs/DogCard';
import { DogFilters, FilterState } from '@/components/dogs/DogFilters';
import { DogDetailDialog } from '@/components/dogs/DogDetailDialog';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { DogListing, DogBreed } from '@/types/dog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown, Grid3x3, List, Star } from 'lucide-react';

type SortOption = 'recent' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc';
type ViewMode = 'grid' | 'list';

export default function AnnoncesPage() {
  const [userListings, setUserListings] = useState<DogListing[]>([]);

  useEffect(() => {
    const loadUserListings = () => {
      const listings = getFromLocalStorage<DogListing[]>(STORAGE_KEYS.USER_LISTINGS, []);
      setUserListings(listings);
    };

    loadUserListings();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.USER_LISTINGS || e.key === null) {
        loadUserListings();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(loadUserListings, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const allListings = useMemo(() => {
    return [...dogListings, ...userListings];
  }, [userListings]);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    breedId: '',
    gender: '',
    minPrice: 0,
    maxPrice: 5000000,
    size: '',
    ageUnit: '',
    location: '',
    pedigree: null,
    vaccinated: null
  });

  const [selectedListing, setSelectedListing] = useState<DogListing | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<DogBreed | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredListings = useMemo(() => {
    let result = allListings.filter((listing) => {
      const breed = dogBreeds.find(b => b.id === listing.breedId);
      if (!breed) return false;

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !listing.name.toLowerCase().includes(searchLower) &&
          !breed.name.toLowerCase().includes(searchLower) &&
          !listing.description.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      if (filters.breedId && listing.breedId !== filters.breedId) return false;
      if (filters.gender && listing.gender !== filters.gender) return false;
      if (listing.price < filters.minPrice || listing.price > filters.maxPrice) return false;
      if (filters.size && breed.size !== filters.size) return false;
      if (filters.ageUnit && listing.ageUnit !== filters.ageUnit) return false;
      if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.pedigree !== null && listing.pedigree !== filters.pedigree) return false;
      if (filters.vaccinated !== null && listing.vaccinated !== filters.vaccinated) return false;

      return true;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'age-asc':
        result.sort((a, b) => {
          const ageA = a.ageUnit === 'ans' ? a.age * 365 : a.ageUnit === 'mois' ? a.age * 30 : a.age * 7;
          const ageB = b.ageUnit === 'ans' ? b.age * 365 : b.ageUnit === 'mois' ? b.age * 30 : b.age * 7;
          return ageA - ageB;
        });
        break;
      case 'age-desc':
        result.sort((a, b) => {
          const ageA = a.ageUnit === 'ans' ? a.age * 365 : a.ageUnit === 'mois' ? a.age * 30 : a.age * 7;
          const ageB = b.ageUnit === 'ans' ? b.age * 365 : b.ageUnit === 'mois' ? b.age * 30 : b.age * 7;
          return ageB - ageA;
        });
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
    }

    return result;
  }, [filters, allListings, sortBy]);

  const handleCardClick = (listing: DogListing) => {
    const breed = dogBreeds.find(b => b.id === listing.breedId);
    setSelectedListing(listing);
    setSelectedBreed(breed || null);
    setDialogOpen(true);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      breedId: '',
      gender: '',
      minPrice: 0,
      maxPrice: 5000000,
      size: '',
      ageUnit: '',
      location: '',
      pedigree: null,
      vaccinated: null
    });
  };

  const stats = {
    total: filteredListings.length,
    available: filteredListings.filter(l => l.available).length,
    withPedigree: filteredListings.filter(l => l.pedigree).length,
    vaccinated: filteredListings.filter(l => l.vaccinated).length
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 lg:pb-6">
        <section className="bg-gradient-to-br from-[#D4A574]/10 to-[#2C5530]/10 py-8 sm:py-10 md:py-12 mb-6 sm:mb-8">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="text-center">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
                Chiens et chiots disponibles
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6">
                Découvrez tous nos chiens et chiots de race disponibles
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                <Badge variant="secondary" className="text-[10px] sm:text-xs md:text-sm py-1.5 sm:py-2 px-2.5 sm:px-4">
                  {stats.total} annonce{stats.total > 1 ? 's' : ''}
                </Badge>
                <Badge variant="secondary" className="text-[10px] sm:text-xs md:text-sm py-1.5 sm:py-2 px-2.5 sm:px-4">
                  {stats.available} disponible{stats.available > 1 ? 's' : ''}
                </Badge>
                <Badge variant="secondary" className="text-[10px] sm:text-xs md:text-sm py-1.5 sm:py-2 px-2.5 sm:px-4 hidden xs:inline-flex">
                  {stats.withPedigree} avec LOF
                </Badge>
                <Badge variant="secondary" className="text-[10px] sm:text-xs md:text-sm py-1.5 sm:py-2 px-2.5 sm:px-4 hidden sm:inline-flex">
                  {stats.vaccinated} vacciné{stats.vaccinated > 1 ? 's' : ''}
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-3 sm:px-4">
          <div className="mb-4 sm:mb-6">
            <DogFilters
              breeds={dogBreeds}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1">
                {filteredListings.length} résultat{filteredListings.length > 1 ? 's' : ''} trouvé{filteredListings.length > 1 ? 's' : ''}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                Trouvez votre compagnon idéal
              </p>
            </div>

            <div className="flex items-center gap-2 w-full xs:w-auto">
              <div className="flex items-center gap-2 flex-1 xs:flex-initial">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-full xs:w-[160px] sm:w-[180px] md:w-[200px] h-9 sm:h-10 text-xs sm:text-sm">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récentes</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="name-asc">Nom A-Z</SelectItem>
                    <SelectItem value="name-desc">Nom Z-A</SelectItem>
                    <SelectItem value="age-asc">Plus jeunes</SelectItem>
                    <SelectItem value="age-desc">Plus âgés</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="hidden md:flex items-center gap-1 border rounded-md p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {filteredListings.length === 0 ? (
            <div className="text-center py-10 sm:py-12 md:py-16">
              <div className="bg-muted/50 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                Aucun chien ne correspond à vos critères
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
                Essayez de modifier vos filtres de recherche
              </p>
              <Button onClick={handleResetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6'
                : 'space-y-3 sm:space-y-4'
            }>
              {filteredListings.map((listing) => {
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
        </section>
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

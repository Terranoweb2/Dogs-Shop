
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Filter, X, Search } from 'lucide-react';
import { DogBreed } from '@/types/dog';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface FilterState {
  search: string;
  breedId: string;
  gender: string;
  minPrice: number;
  maxPrice: number;
  size: string;
  ageUnit: string;
  location: string;
  pedigree: boolean | null;
  vaccinated: boolean | null;
}

interface DogFiltersProps {
  breeds: DogBreed[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function DogFilters({ breeds, filters, onFiltersChange }: DogFiltersProps) {
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    onFiltersChange({
      search: '',
      breedId: '',
      gender: '',
      minPrice: 0,
      maxPrice: 5000,
      size: '',
      ageUnit: '',
      location: '',
      pedigree: null,
      vaccinated: null
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'minPrice' && value === 0) return false;
    if (key === 'maxPrice' && value === 5000) return false;
    if (key === 'search' && value === '') return false;
    return value !== '' && value !== null;
  }).length;

  return (
    <div className="space-y-2 xs:space-y-3 sm:space-y-4">
      <div className="flex gap-1.5 xs:gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 xs:h-4 xs:w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-8 xs:pl-9 h-9 xs:h-10 sm:h-11 text-sm"
          />
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative h-9 xs:h-10 sm:h-11 px-2.5 xs:px-3 sm:px-4">
              <Filter className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:mr-2" />
              <span className="hidden sm:inline text-sm">Filtres</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 xs:-top-1.5 xs:-right-1.5 bg-[#D4A574] text-white text-[9px] xs:text-[10px] sm:text-xs rounded-full h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[90vw] max-w-md p-0">
            <SheetHeader className="p-3 xs:p-4 sm:p-6 border-b">
              <SheetTitle className="text-base xs:text-lg">Filtres de recherche</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-160px)] xs:h-[calc(100vh-180px)]">
              <div className="space-y-4 xs:space-y-5 sm:space-y-6 p-3 xs:p-4 sm:p-6">
                <div className="space-y-1.5 xs:space-y-2">
                  <Label className="text-xs xs:text-sm font-medium">Race</Label>
                  <Select
                    value={filters.breedId}
                    onValueChange={(value) => onFiltersChange({ ...filters, breedId: value })}
                  >
                    <SelectTrigger className="h-9 xs:h-10 sm:h-11 text-sm">
                      <SelectValue placeholder="Toutes les races" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Toutes les races</SelectItem>
                      {breeds.map((breed) => (
                        <SelectItem key={breed.id} value={breed.id}>
                          {breed.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                  <div className="space-y-1.5 xs:space-y-2">
                    <Label className="text-xs xs:text-sm font-medium">Sexe</Label>
                    <Select
                      value={filters.gender}
                      onValueChange={(value) => onFiltersChange({ ...filters, gender: value })}
                    >
                      <SelectTrigger className="h-9 xs:h-10 sm:h-11 text-sm">
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous</SelectItem>
                        <SelectItem value="Mâle">Mâle</SelectItem>
                        <SelectItem value="Femelle">Femelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5 xs:space-y-2">
                    <Label className="text-xs xs:text-sm font-medium">Taille</Label>
                    <Select
                      value={filters.size}
                      onValueChange={(value) => onFiltersChange({ ...filters, size: value })}
                    >
                      <SelectTrigger className="h-9 xs:h-10 sm:h-11 text-sm">
                        <SelectValue placeholder="Toutes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes</SelectItem>
                        <SelectItem value="Petit">Petit</SelectItem>
                        <SelectItem value="Moyen">Moyen</SelectItem>
                        <SelectItem value="Grand">Grand</SelectItem>
                        <SelectItem value="Très Grand">Très Grand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5 xs:space-y-2">
                  <Label className="text-xs xs:text-sm font-medium">Âge</Label>
                  <Select
                    value={filters.ageUnit}
                    onValueChange={(value) => onFiltersChange({ ...filters, ageUnit: value })}
                  >
                    <SelectTrigger className="h-9 xs:h-10 sm:h-11 text-sm">
                      <SelectValue placeholder="Tous âges" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tous âges</SelectItem>
                      <SelectItem value="semaines">Chiots (semaines)</SelectItem>
                      <SelectItem value="mois">Jeunes (mois)</SelectItem>
                      <SelectItem value="ans">Adultes (ans)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 xs:space-y-2">
                  <Label className="text-xs xs:text-sm font-medium">Localisation</Label>
                  <Input
                    placeholder="Ville ou département"
                    value={filters.location}
                    onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
                    className="h-9 xs:h-10 sm:h-11 text-sm"
                  />
                </div>

                <div className="space-y-3 xs:space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs xs:text-sm font-medium">Prix</Label>
                    <span className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">
                      {filters.minPrice}€ - {filters.maxPrice}€
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={5000}
                    step={100}
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={([min, max]) => 
                      onFiltersChange({ ...filters, minPrice: min, maxPrice: max })
                    }
                    className="py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                  <div className="space-y-1.5 xs:space-y-2">
                    <Label className="text-xs xs:text-sm font-medium">Pedigree</Label>
                    <Select
                      value={filters.pedigree === null ? '' : filters.pedigree.toString()}
                      onValueChange={(value) => 
                        onFiltersChange({ 
                          ...filters, 
                          pedigree: value === '' ? null : value === 'true' 
                        })
                      }
                    >
                      <SelectTrigger className="h-9 xs:h-10 sm:h-11 text-sm">
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous</SelectItem>
                        <SelectItem value="true">Oui</SelectItem>
                        <SelectItem value="false">Non</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5 xs:space-y-2">
                    <Label className="text-xs xs:text-sm font-medium">Vacciné</Label>
                    <Select
                      value={filters.vaccinated === null ? '' : filters.vaccinated.toString()}
                      onValueChange={(value) => 
                        onFiltersChange({ 
                          ...filters, 
                          vaccinated: value === '' ? null : value === 'true' 
                        })
                      }
                    >
                      <SelectTrigger className="h-9 xs:h-10 sm:h-11 text-sm">
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous</SelectItem>
                        <SelectItem value="true">Oui</SelectItem>
                        <SelectItem value="false">Non</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </ScrollArea>
            
            <div className="flex gap-2 p-3 xs:p-4 sm:p-6 border-t bg-background">
              <Button variant="outline" onClick={handleReset} className="flex-1 h-9 xs:h-10 sm:h-11 text-sm">
                <X className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-1.5 xs:mr-2" />
                Réinitialiser
              </Button>
              <Button onClick={() => setOpen(false)} className="flex-1 h-9 xs:h-10 sm:h-11 text-sm">
                Appliquer
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

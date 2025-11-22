
'use client';

import { useState, useMemo, useEffect } from 'react';
import { dogBreeds } from '@/data/dog-breeds';
import { dogListings } from '@/data/dog-listings';
import { useUserListings } from '@/hooks/use-user-listings';
import { DogCard } from '@/components/dogs/DogCard';
import { DogFilters, FilterState } from '@/components/dogs/DogFilters';
import { DogDetailDialog } from '@/components/dogs/DogDetailDialog';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { DogListing, DogBreed } from '@/types/dog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Scale, Calculator, TrendingUp, ChevronLeft, ChevronRight, Star, Shield, Heart, Award } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { getAllListings } = useUserListings();
  const [allListings, setAllListings] = useState<DogListing[]>([]);

  useEffect(() => {
    const userListings = getAllListings();
    setAllListings([...dogListings, ...userListings]);
  }, []);

  const [filters, setFilters] = useState<FilterState>({
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

  const [selectedListing, setSelectedListing] = useState<DogListing | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<DogBreed | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=1200&q=80',
      title: 'Berger Allemand',
      subtitle: 'Intelligent et loyal'
    },
    {
      url: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=1200&q=80',
      title: 'Golden Retriever',
      subtitle: 'Affectueux et joueur'
    },
    {
      url: 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=1200&q=80',
      title: 'Berger Australien',
      subtitle: 'Énergique et intelligent'
    },
    {
      url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&q=80',
      title: 'Berger Belge Malinois',
      subtitle: 'Protecteur et travailleur'
    },
    {
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80',
      title: 'Labrador Retriever',
      subtitle: 'Amical et actif'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const filteredListings = useMemo(() => {
    return allListings.filter((listing) => {
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
  }, [filters, allListings]);

  const handleCardClick = (listing: DogListing) => {
    const breed = dogBreeds.find(b => b.id === listing.breedId);
    setSelectedListing(listing);
    setSelectedBreed(breed || null);
    setDialogOpen(true);
  };

  const stats = {
    totalListings: allListings.length,
    totalBreeds: dogBreeds.length,
    availableListings: allListings.filter(l => l.available).length,
    shepherdBreeds: dogBreeds.filter(b => b.name.toLowerCase().includes('berger')).length
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const shepherdBreeds = dogBreeds.filter(b => b.name.toLowerCase().includes('berger')).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 lg:pb-6">
        {/* Hero Section */}
        <section className="relative h-[350px] xs:h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
              <img
                src={heroImages[currentSlide].url}
                alt={heroImages[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl lg:max-w-2xl"
                  >
                    <Badge className="mb-2 sm:mb-4 bg-[#D4A574] text-white text-xs sm:text-sm">
                      Chiens de Race Premium
                    </Badge>
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">
                      {heroImages[currentSlide].title}
                    </h1>
                    <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/90 mb-3 sm:mb-6">
                      {heroImages[currentSlide].subtitle}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-white/80 mb-4 sm:mb-8 hidden xs:block">
                      Trouvez votre compagnon idéal parmi {stats.totalListings} annonces de chiens de race
                    </p>
                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-4">
                      <Button 
                        size="default"
                        className="bg-[#D4A574] hover:bg-[#C39564] text-white h-10 sm:h-11 text-sm sm:text-base"
                        onClick={() => setShowFilters(true)}
                      >
                        Parcourir les annonces
                      </Button>
                      <Link href="/quiz">
                        <Button 
                          size="default" 
                          variant="outline" 
                          className="bg-white/10 text-white border-white hover:bg-white/20 w-full xs:w-auto h-10 sm:h-11 text-sm sm:text-base"
                        >
                          Trouver ma race idéale
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 sm:gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-6 sm:w-8 bg-white' : 'w-1.5 sm:w-2 bg-white/50'
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-3 sm:px-4 -mt-10 sm:-mt-12 md:-mt-16 relative z-20 mb-8 sm:mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <Card className="bg-white dark:bg-card shadow-lg">
              <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                <div className="bg-[#D4A574]/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-[#D4A574]" />
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D4A574] mb-0.5 sm:mb-1">{stats.totalListings}</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Annonces actives</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-card shadow-lg">
              <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                <div className="bg-[#2C5530]/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#2C5530]" />
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2C5530] mb-0.5 sm:mb-1">{stats.totalBreeds}</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Races disponibles</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-card shadow-lg">
              <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                <div className="bg-blue-500/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500 mb-0.5 sm:mb-1">{stats.shepherdBreeds}</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Races de Berger</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-card shadow-lg">
              <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                <div className="bg-red-500/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-500 mb-0.5 sm:mb-1">{stats.availableListings}</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Disponibles</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Popular Breeds Section */}
        <section className="container mx-auto px-3 sm:px-4 mb-8 sm:mb-12">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 md:mb-3">Races de Berger Populaires</h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Découvrez nos magnifiques chiens de berger
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {shepherdBreeds.map((breed) => (
              <Card 
                key={breed.id} 
                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setFilters({ ...filters, breedId: breed.id })}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={breed.imageUrl}
                    alt={breed.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-2 sm:p-3 text-center">
                  <p className="font-semibold text-xs sm:text-sm truncate">{breed.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{breed.size}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section className="bg-muted/50 py-8 sm:py-10 md:py-12 mb-8 sm:mb-12">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 md:mb-3">Outils pour vous aider</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                Trouvez le compagnon parfait grâce à nos outils
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <Link href="/quiz" className="block">
                <Card className="hover:shadow-xl transition-all cursor-pointer h-full border-2 hover:border-[#D4A574]">
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <div className="bg-[#D4A574]/10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#D4A574]" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Quiz Race Idéale</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      Répondez à quelques questions pour découvrir la race qui vous correspond
                    </p>
                    <Badge className="bg-[#D4A574] text-xs sm:text-sm">Commencer le quiz</Badge>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/comparaison" className="block">
                <Card className="hover:shadow-xl transition-all cursor-pointer h-full border-2 hover:border-[#2C5530]">
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <div className="bg-[#2C5530]/10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Scale className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#2C5530]" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Comparateur de Races</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      Comparez jusqu'à 3 races côte à côte pour faire le bon choix
                    </p>
                    <Badge className="bg-[#2C5530] text-xs sm:text-sm">Comparer maintenant</Badge>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/calculateur" className="block sm:col-span-2 lg:col-span-1">
                <Card className="hover:shadow-xl transition-all cursor-pointer h-full border-2 hover:border-blue-500">
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <div className="bg-blue-500/10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Calculator className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Calculateur de Coûts</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      Estimez les coûts d'entretien annuels de votre futur compagnon
                    </p>
                    <Badge className="bg-blue-500 text-xs sm:text-sm">Calculer les coûts</Badge>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Chiens et chiots disponibles</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                {filteredListings.length} résultat{filteredListings.length > 1 ? 's' : ''} trouvé{filteredListings.length > 1 ? 's' : ''}
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto"
            >
              {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
            </Button>
          </div>

          {showFilters && (
            <div className="mb-4 sm:mb-6">
              <DogFilters
                breeds={dogBreeds}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          )}

          {filteredListings.length === 0 ? (
            <div className="text-center py-10 sm:py-12 md:py-16">
              <div className="bg-muted/50 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl mb-2">
                Aucun chien ne correspond à vos critères
              </p>
              <p className="text-muted-foreground text-sm sm:text-base mb-4">
                Essayez de modifier vos filtres
              </p>
              <Button onClick={() => setFilters({
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
              })}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredListings.slice(0, 12).map((listing) => {
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

          {filteredListings.length > 12 && (
            <div className="text-center mt-6 sm:mt-8">
              <Link href="/annonces">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Voir toutes les annonces ({filteredListings.length})
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-gradient-to-br from-[#D4A574]/10 to-[#2C5530]/10 py-10 sm:py-12 md:py-16 mt-10 sm:mt-12 md:mt-16">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 md:mb-3">Pourquoi choisir Dogs-Shop ?</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                La plateforme de confiance pour trouver votre compagnon idéal
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <div className="text-center">
                <div className="bg-white dark:bg-card w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg">
                  <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#D4A574]" />
                </div>
                <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Éleveurs Vérifiés</h3>
                <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm line-clamp-3">
                  Tous nos éleveurs sont certifiés et vérifiés
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white dark:bg-card w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg">
                  <Award className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#2C5530]" />
                </div>
                <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Chiens LOF</h3>
                <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm line-clamp-3">
                  Pedigree certifié et garantie de race pure
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white dark:bg-card w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg">
                  <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-500" />
                </div>
                <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Suivi Santé</h3>
                <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm line-clamp-3">
                  Guides nutritionnels et carnets de santé
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white dark:bg-card w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg">
                  <Star className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-500" />
                </div>
                <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Paiement Sécurisé</h3>
                <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm line-clamp-3">
                  Mobile Money et paiement en espèces
                </p>
              </div>
            </div>
          </div>
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

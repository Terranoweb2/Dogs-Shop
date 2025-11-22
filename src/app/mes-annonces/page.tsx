
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useUserListings } from '@/hooks/use-user-listings';
import { dogBreeds } from '@/data/dog-breeds';
import { DogListing } from '@/types/dog';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/currency';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function MesAnnoncesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { userListings, addListing, updateListing, deleteListing } = useUserListings(user?.id);
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState<DogListing | null>(null);

  const [formData, setFormData] = useState({
    breedId: '',
    name: '',
    age: 0,
    ageUnit: 'mois' as 'semaines' | 'mois' | 'ans',
    gender: 'Mâle' as 'Mâle' | 'Femelle',
    price: 0,
    description: '',
    images: [''],
    pedigree: false,
    vaccinated: false,
    microchipped: false,
    location: '',
    breeder: {
      name: user?.breederInfo?.businessName || user?.name || '',
      phone: user?.phone || '',
      email: user?.email || ''
    },
    available: true
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'seller')) {
      router.push('/');
      toast.error('Vous devez être connecté en tant que vendeur');
    }
  }, [isAuthenticated, user, router, isLoading]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        breeder: {
          name: user.breederInfo?.businessName || user.name,
          phone: user.phone,
          email: user.email
        }
      }));
    }
  }, [user]);

  const resetForm = () => {
    setFormData({
      breedId: '',
      name: '',
      age: 0,
      ageUnit: 'mois',
      gender: 'Mâle',
      price: 0,
      description: '',
      images: [''],
      pedigree: false,
      vaccinated: false,
      microchipped: false,
      location: '',
      breeder: {
        name: user?.breederInfo?.businessName || user?.name || '',
        phone: user?.phone || '',
        email: user?.email || ''
      },
      available: true
    });
    setEditingListing(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    if (editingListing) {
      updateListing(editingListing.id, formData);
    } else {
      addListing(formData, user.id);
    }

    resetForm();
  };

  const handleEdit = (listing: DogListing) => {
    setEditingListing(listing);
    setFormData({
      breedId: listing.breedId,
      name: listing.name,
      age: listing.age,
      ageUnit: listing.ageUnit,
      gender: listing.gender,
      price: listing.price,
      description: listing.description,
      images: listing.images,
      pedigree: listing.pedigree,
      vaccinated: listing.vaccinated,
      microchipped: listing.microchipped,
      location: listing.location,
      breeder: listing.breeder,
      available: listing.available
    });
    setShowForm(true);
  };

  const handleDelete = (listingId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      deleteListing(listingId);
    }
  };

  const toggleAvailability = (listing: DogListing) => {
    updateListing(listing.id, { available: !listing.available });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-[#D4A574]" />
          <p className="text-muted-foreground text-sm sm:text-base">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'seller') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 pb-20 lg:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Mes annonces</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Gérez vos annonces de chiens à vendre
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto h-10 sm:h-11">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Nouvelle annonce
          </Button>
        </div>

        {userListings.length === 0 ? (
          <Card>
            <CardContent className="py-10 sm:py-12 md:py-16 text-center">
              <div className="bg-muted/50 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Plus className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl mb-2">
                Aucune annonce publiée
              </p>
              <p className="text-muted-foreground text-sm sm:text-base mb-4">
                Commencez par créer votre première annonce
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Créer une annonce
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {userListings.map((listing) => {
              const breed = dogBreeds.find(b => b.id === listing.breedId);
              if (!breed) return null;

              return (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={listing.images[0]}
                      alt={listing.name}
                      className="w-full h-full object-cover"
                    />
                    {!listing.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary" className="text-sm sm:text-lg">
                          Non disponible
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{listing.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{breed.name}</p>
                      </div>
                      <p className="font-bold text-base sm:text-lg text-[#D4A574] flex-shrink-0">
                        {formatPrice(listing.price)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      <Badge variant="outline" className="text-[10px] sm:text-xs">
                        {listing.gender}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] sm:text-xs">
                        {listing.age} {listing.ageUnit}
                      </Badge>
                      {listing.pedigree && (
                        <Badge variant="secondary" className="text-[10px] sm:text-xs">LOF</Badge>
                      )}
                    </div>

                    <div className="flex gap-1.5 sm:gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8 sm:h-9 text-xs sm:text-sm"
                        onClick={() => handleEdit(listing)}
                      >
                        <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 sm:h-9 w-8 sm:w-9 p-0"
                        onClick={() => toggleAvailability(listing)}
                      >
                        {listing.available ? (
                          <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        ) : (
                          <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 sm:h-9 w-8 sm:w-9 p-0"
                        onClick={() => handleDelete(listing.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />

      <Dialog open={showForm} onOpenChange={(open) => {
        if (!open) resetForm();
        setShowForm(open);
      }}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 sm:p-6 pb-0">
            <DialogTitle className="text-xl sm:text-2xl">
              {editingListing ? 'Modifier l\'annonce' : 'Nouvelle annonce'}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-80px)]">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="breed" className="text-sm">Race *</Label>
                <Select
                  value={formData.breedId}
                  onValueChange={(value) => setFormData({ ...formData, breedId: value })}
                  required
                >
                  <SelectTrigger className="h-10 sm:h-11">
                    <SelectValue placeholder="Sélectionnez une race" />
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

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Nom du chien *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-10 sm:h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm">Sexe *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value as 'Mâle' | 'Femelle' })}
                    required
                  >
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mâle">Mâle</SelectItem>
                      <SelectItem value="Femelle">Femelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm">Âge *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                    required
                    className="h-10 sm:h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageUnit" className="text-sm">Unité *</Label>
                  <Select
                    value={formData.ageUnit}
                    onValueChange={(value) => setFormData({ ...formData, ageUnit: value as 'semaines' | 'mois' | 'ans' })}
                    required
                  >
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semaines">Semaines</SelectItem>
                      <SelectItem value="mois">Mois</SelectItem>
                      <SelectItem value="ans">Ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm">Prix (XOF CFA) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  required
                  className="h-10 sm:h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm">Localisation *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: Dakar, Sénégal"
                  required
                  className="h-10 sm:h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm">URL de l'image *</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.images[0]}
                  onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="h-10 sm:h-11"
                />
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pedigree" className="text-sm">Pedigree LOF</Label>
                  <Switch
                    id="pedigree"
                    checked={formData.pedigree}
                    onCheckedChange={(checked) => setFormData({ ...formData, pedigree: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="vaccinated" className="text-sm">Vacciné</Label>
                  <Switch
                    id="vaccinated"
                    checked={formData.vaccinated}
                    onCheckedChange={(checked) => setFormData({ ...formData, vaccinated: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="microchipped" className="text-sm">Pucé</Label>
                  <Switch
                    id="microchipped"
                    checked={formData.microchipped}
                    onCheckedChange={(checked) => setFormData({ ...formData, microchipped: checked })}
                  />
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 pt-2">
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1 h-10 sm:h-11">
                  Annuler
                </Button>
                <Button type="submit" className="flex-1 h-10 sm:h-11">
                  {editingListing ? 'Mettre à jour' : 'Publier l\'annonce'}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

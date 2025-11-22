
import { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '@/lib/localStorage';
import { DogListing } from '@/types/dog';
import { toast } from 'sonner';

export function useUserListings(userId?: string) {
  const [userListings, setUserListings] = useState<DogListing[]>([]);

  useEffect(() => {
    if (userId) {
      const allListings = getFromLocalStorage<DogListing[]>(STORAGE_KEYS.USER_LISTINGS, []);
      setUserListings(allListings.filter(listing => listing.sellerId === userId));
    }
  }, [userId]);

  const addListing = (listing: Omit<DogListing, 'id' | 'postedDate' | 'sellerId'>, sellerId: string) => {
    const newListing: DogListing = {
      ...listing,
      id: `user-listing-${Date.now()}`,
      postedDate: new Date().toISOString(),
      sellerId
    };

    const allListings = getFromLocalStorage<DogListing[]>(STORAGE_KEYS.USER_LISTINGS, []);
    allListings.push(newListing);
    saveToLocalStorage(STORAGE_KEYS.USER_LISTINGS, allListings);
    
    setUserListings(prev => [...prev, newListing]);
    toast.success('Annonce publiée avec succès !');
    return newListing;
  };

  const updateListing = (listingId: string, updates: Partial<DogListing>) => {
    const allListings = getFromLocalStorage<DogListing[]>(STORAGE_KEYS.USER_LISTINGS, []);
    const updatedListings = allListings.map(listing =>
      listing.id === listingId ? { ...listing, ...updates } : listing
    );
    
    saveToLocalStorage(STORAGE_KEYS.USER_LISTINGS, updatedListings);
    setUserListings(updatedListings.filter(listing => listing.sellerId === userId));
    toast.success('Annonce mise à jour');
  };

  const deleteListing = (listingId: string) => {
    const allListings = getFromLocalStorage<DogListing[]>(STORAGE_KEYS.USER_LISTINGS, []);
    const filteredListings = allListings.filter(listing => listing.id !== listingId);
    
    saveToLocalStorage(STORAGE_KEYS.USER_LISTINGS, filteredListings);
    setUserListings(filteredListings.filter(listing => listing.sellerId === userId));
    toast.success('Annonce supprimée');
  };

  const getAllListings = (): DogListing[] => {
    return getFromLocalStorage<DogListing[]>(STORAGE_KEYS.USER_LISTINGS, []);
  };

  return {
    userListings,
    addListing,
    updateListing,
    deleteListing,
    getAllListings
  };
}

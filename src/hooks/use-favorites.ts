
import { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '@/lib/localStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFromLocalStorage<string[]>(STORAGE_KEYS.FAVORITES, []));
  }, []);

  const toggleFavorite = (listingId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(listingId)
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId];
      
      saveToLocalStorage(STORAGE_KEYS.FAVORITES, newFavorites);
      return newFavorites;
    });
  };

  const isFavorite = (listingId: string) => favorites.includes(listingId);

  return { favorites, toggleFavorite, isFavorite };
}

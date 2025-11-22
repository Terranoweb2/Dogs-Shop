
export const STORAGE_KEYS = {
  FAVORITES: 'dogs-shop-favorites',
  HEALTH_RECORDS: 'dogs-shop-health-records',
  FILTERS: 'dogs-shop-filters',
  ORDERS: 'dogs-shop-orders',
  USER: 'dogs-shop-user',
  USERS: 'dogs-shop-users',
  USER_LISTINGS: 'dogs-shop-user-listings'
} as const;

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
}

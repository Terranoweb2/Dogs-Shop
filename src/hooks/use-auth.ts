
import { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage, STORAGE_KEYS } from '@/lib/localStorage';
import { User, AuthState } from '@/types/user';
import { toast } from 'sonner';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getFromLocalStorage<User | null>(STORAGE_KEYS.USER, null);
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true
      });
    }
    setIsLoading(false);
  }, []);

  const register = (userData: {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: 'buyer' | 'seller';
    breederInfo?: {
      businessName: string;
      address: string;
    };
  }): User | null => {
    const users = getFromLocalStorage<User[]>(STORAGE_KEYS.USERS, []);
    
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      toast.error('Un compte existe déjà avec cet email');
      return null;
    }

    // Le premier utilisateur devient super administrateur
    const isFirstUser = users.length === 0;

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      role: isFirstUser ? 'admin' : userData.role,
      createdAt: new Date().toISOString(),
      breederInfo: userData.role === 'seller' && userData.breederInfo ? {
        businessName: userData.breederInfo.businessName,
        address: userData.breederInfo.address,
        verified: false,
        rating: 0,
        totalSales: 0
      } : undefined,
      // Permissions complètes pour le super administrateur
      adminPermissions: isFirstUser ? {
        manageUsers: true,
        manageDogs: true,
        manageOrders: true,
        manageAnnonces: true,
        manageReports: true,
        viewStatistics: true,
        systemSettings: true
      } : undefined
    };

    users.push(newUser);
    saveToLocalStorage(STORAGE_KEYS.USERS, users);
    saveToLocalStorage(STORAGE_KEYS.USER, newUser);
    
    setAuthState({
      user: newUser,
      isAuthenticated: true
    });

    if (isFirstUser) {
      toast.success('Compte Super Administrateur créé avec succès ! Vous avez tous les droits.');
    } else {
      toast.success('Compte créé avec succès !');
    }
    return newUser;
  };

  const login = (email: string, password: string): User | null => {
    const users = getFromLocalStorage<User[]>(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email === email);

    if (!user) {
      toast.error('Email ou mot de passe incorrect');
      return null;
    }

    saveToLocalStorage(STORAGE_KEYS.USER, user);
    setAuthState({
      user,
      isAuthenticated: true
    });

    if (user.role === 'admin') {
      toast.success('Bienvenue, Super Administrateur !');
    } else {
      toast.success('Connexion réussie !');
    }
    return user;
  };

  const logout = () => {
    removeFromLocalStorage(STORAGE_KEYS.USER);
    setAuthState({
      user: null,
      isAuthenticated: false
    });
    toast.success('Déconnexion réussie');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!authState.user) return;

    const updatedUser = { ...authState.user, ...updates };
    const users = getFromLocalStorage<User[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex(u => u.id === authState.user?.id);
    
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      saveToLocalStorage(STORAGE_KEYS.USERS, users);
    }

    saveToLocalStorage(STORAGE_KEYS.USER, updatedUser);
    setAuthState({
      user: updatedUser,
      isAuthenticated: true
    });

    toast.success('Profil mis à jour');
  };

  // Fonctions utilitaires pour vérifier les permissions admin
  const isAdmin = () => authState.user?.role === 'admin';
  
  const hasPermission = (permission: keyof NonNullable<User['adminPermissions']>) => {
    if (!authState.user?.adminPermissions) return false;
    return authState.user.adminPermissions[permission];
  };

  const getAllUsers = (): User[] => {
    if (!isAdmin()) return [];
    return getFromLocalStorage<User[]>(STORAGE_KEYS.USERS, []);
  };

  const updateUserRole = (userId: string, newRole: 'buyer' | 'seller' | 'admin') => {
    if (!isAdmin()) {
      toast.error('Permission refusée');
      return;
    }

    const users = getFromLocalStorage<User[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      toast.error('Utilisateur non trouvé');
      return;
    }

    users[userIndex].role = newRole;
    
    // Ajouter les permissions admin si nécessaire
    if (newRole === 'admin') {
      users[userIndex].adminPermissions = {
        manageUsers: true,
        manageDogs: true,
        manageOrders: true,
        manageAnnonces: true,
        manageReports: true,
        viewStatistics: true,
        systemSettings: true
      };
    } else {
      users[userIndex].adminPermissions = undefined;
    }

    saveToLocalStorage(STORAGE_KEYS.USERS, users);
    toast.success('Rôle utilisateur mis à jour');
  };

  const deleteUser = (userId: string) => {
    if (!isAdmin()) {
      toast.error('Permission refusée');
      return;
    }

    // Empêcher la suppression de son propre compte admin
    if (userId === authState.user?.id) {
      toast.error('Vous ne pouvez pas supprimer votre propre compte');
      return;
    }

    const users = getFromLocalStorage<User[]>(STORAGE_KEYS.USERS, []);
    const filteredUsers = users.filter(u => u.id !== userId);
    
    saveToLocalStorage(STORAGE_KEYS.USERS, filteredUsers);
    toast.success('Utilisateur supprimé');
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    register,
    login,
    logout,
    updateUser,
    isAdmin,
    hasPermission,
    getAllUsers,
    updateUserRole,
    deleteUser
  };
}

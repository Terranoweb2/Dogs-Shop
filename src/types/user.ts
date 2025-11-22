
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'buyer' | 'seller' | 'admin';
  createdAt: string;
  breederInfo?: {
    businessName: string;
    address: string;
    verified: boolean;
    rating: number;
    totalSales: number;
  };
  adminPermissions?: {
    manageUsers: boolean;
    manageDogs: boolean;
    manageOrders: boolean;
    manageAnnonces: boolean;
    manageReports: boolean;
    viewStatistics: boolean;
    systemSettings: boolean;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

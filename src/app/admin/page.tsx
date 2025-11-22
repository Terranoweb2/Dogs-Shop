
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, 
  Users, 
  Dog, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  Trash2,
  Store,
  ShoppingBag,
  Crown,
  Eye,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Star,
  Award,
  Zap,
  Target,
  PieChart,
  BarChart,
  Database,
  FileText,
  Plus,
  Edit,
  EyeOff,
  LogOut,
} from 'lucide-react';
import { User } from '@/types/user';
import { DogListing, Order } from '@/types/dog';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '@/lib/localStorage';
import { dogBreeds } from '@/data/dog-breeds';
import { formatPrice } from '@/lib/currency';
import { toast } from 'sonner';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isAdmin, updateUserRole, deleteUser, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<DogListing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedListing, setSelectedListing] = useState<DogListing | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showListingForm, setShowListingForm] = useState(false);
  const [editingListing, setEditingListing] = useState<DogListing | null>(null);

  const [listingFormData, setListingFormData] = useState({
    breedId: '',
    name: '',
    age: '',
    ageUnit: 'mois' as 'semaines' | 'mois' | 'ans',
    gender: 'Mâle' as 'Mâle' | 'Femelle',
    price: '',
    description: '',
    images: [''],
    pedigree: false,
    vaccinated: false,
    microchipped: false,
    location: '',
    breeder: {
      name: user?.name || 'Administrateur',
      phone: user?.phone || '',
      email: user?.email || ''
    },
    available: true
  });

  const userIsAdmin = useMemo(() => {
    return isAdmin();
  }, [isAdmin]);

  const stats = useMemo(() => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const newUsersThisMonth = users.filter((u) => 
      new Date(u.createdAt) >= firstDayOfMonth
    ).length;

    const newUsersLastMonth = users.filter((u) => {
      const createdDate = new Date(u.createdAt);
      return createdDate >= firstDayOfLastMonth && createdDate <= lastDayOfLastMonth;
    }).length;

    const newListingsThisMonth = listings.filter((l) => 
      new Date(l.postedDate) >= firstDayOfMonth
    ).length;

    const completedStatuses: Array<Order['status']> = ['completed', 'fully-paid'];

    const totalRevenue = orders
      .filter((o) => completedStatuses.includes(o.status))
      .reduce((sum, o) => sum + o.totalPrice, 0);

    const lastMonthRevenue = orders
      .filter((o) => {
        const orderDate = new Date(o.createdAt);
        return (
          completedStatuses.includes(o.status) &&
          orderDate >= firstDayOfLastMonth &&
          orderDate <= lastDayOfLastMonth
        );
      })
      .reduce((sum, o) => sum + o.totalPrice, 0);

    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    const conversionRate =
      listings.length > 0 ? (orders.length / listings.length) * 100 : 0;

    const breedCounts = listings.reduce((acc, listing) => {
      acc[listing.breedId] = (acc[listing.breedId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topBreedId = Object.entries(breedCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    const topBreed =
      topBreedId ? dogBreeds.find((b) => b.id === topBreedId)?.name || 'N/A' : 'N/A';

    const sellerSales = orders.reduce((acc, order) => {
      const listing = listings.find((l) => l.id === order.listingId);
      if (listing) {
        const sellerId = listing.breeder.email;
        acc[sellerId] = (acc[sellerId] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topSellerEmail = Object.entries(sellerSales).sort((a, b) => b[1] - a[1])[0]?.[0];
    const topSeller = topSellerEmail
      ? users.find((u) => u.email === topSellerEmail)?.name || 'N/A'
      : 'N/A';

    const revenueGrowth =
      lastMonthRevenue > 0 ? ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;

    const userGrowth =
      newUsersLastMonth > 0
        ? ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100
        : 0;

    return {
      totalUsers: users.length,
      buyers: users.filter((u) => u.role === 'buyer').length,
      sellers: users.filter((u) => u.role === 'seller').length,
      admins: users.filter((u) => u.role === 'admin').length,
      totalOrders: orders.length,
      totalListings: listings.length,
      activeListings: listings.filter((l) => l.available).length,
      totalRevenue,
      pendingOrders: orders.filter((o) => o.status === 'pending').length,
      completedOrders: orders.filter((o) => o.status === 'completed').length,
      newUsersThisMonth,
      newListingsThisMonth,
      averageOrderValue,
      conversionRate,
      topBreed,
      topSeller,
      revenueGrowth,
      userGrowth,
    };
  }, [users, listings, orders]);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !userIsAdmin)) {
      router.push('/');
      return;
    }

    if (userIsAdmin) {
      const allUsers = getFromLocalStorage<User[]>(STORAGE_KEYS.USERS, []);
      const allListings = getFromLocalStorage<DogListing[]>(STORAGE_KEYS.USER_LISTINGS, []);
      const allOrders = getFromLocalStorage<Order[]>(STORAGE_KEYS.ORDERS, []);

      setUsers(allUsers);
      setListings(allListings);
      setOrders(allOrders);
    }
  }, [isLoading, isAuthenticated, userIsAdmin, router, refreshKey]);

  useEffect(() => {
    if (user) {
      setListingFormData(prev => ({
        ...prev,
        breeder: {
          name: user.name,
          phone: user.phone,
          email: user.email
        }
      }));
    }
  }, [user]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    toast.success('Données actualisées');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    updateUserRole(userId, newRole as 'buyer' | 'seller' | 'admin');
    setRefreshKey(prev => prev + 1);
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
    setRefreshKey(prev => prev + 1);
  };

  const handleDeleteListing = (listingId: string) => {
    const updatedListings = listings.filter((l) => l.id !== listingId);
    saveToLocalStorage(STORAGE_KEYS.USER_LISTINGS, updatedListings);
    setListings(updatedListings);
    toast.success("Annonce supprimée avec succès");
  };

  const handleToggleListingAvailability = (listingId: string) => {
    const updatedListings = listings.map((l) =>
      l.id === listingId ? { ...l, available: !l.available } : l
    );
    saveToLocalStorage(STORAGE_KEYS.USER_LISTINGS, updatedListings);
    setListings(updatedListings);
    toast.success("Statut de l'annonce mis à jour");
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    saveToLocalStorage(STORAGE_KEYS.ORDERS, updatedOrders);
    setOrders(updatedOrders);
    toast.success('Statut de la commande mis à jour');
  };

  const handleDeleteOrder = (orderId: string) => {
    const updatedOrders = orders.filter((o) => o.id !== orderId);
    saveToLocalStorage(STORAGE_KEYS.ORDERS, updatedOrders);
    setOrders(updatedOrders);
    toast.success('Commande supprimée avec succès');
  };

  const handleExportData = (type: 'users' | 'listings' | 'orders') => {
    let data: unknown[] = [];
    let filename = '';

    switch (type) {
      case 'users':
        data = users;
        filename = 'utilisateurs.json';
        break;
      case 'listings':
        data = listings;
        filename = 'annonces.json';
        break;
      case 'orders':
        data = orders;
        filename = 'commandes.json';
        break;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Données exportées avec succès');
  };

  const resetListingForm = () => {
    setListingFormData({
      breedId: '',
      name: '',
      age: '',
      ageUnit: 'mois',
      gender: 'Mâle',
      price: '',
      description: '',
      images: [''],
      pedigree: false,
      vaccinated: false,
      microchipped: false,
      location: '',
      breeder: {
        name: user?.name || 'Administrateur',
        phone: user?.phone || '',
        email: user?.email || ''
      },
      available: true
    });
    setEditingListing(null);
    setShowListingForm(false);
  };

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const ageValue = listingFormData.age.trim();
    const priceValue = listingFormData.price.trim();

    if (!ageValue || !priceValue) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const age = parseInt(ageValue, 10);
    const price = parseInt(priceValue, 10);

    if (isNaN(age) || age <= 0) {
      toast.error('Veuillez entrer un âge valide');
      return;
    }

    if (isNaN(price) || price <= 0) {
      toast.error('Veuillez entrer un prix valide');
      return;
    }

    const listingData = {
      breedId: listingFormData.breedId,
      name: listingFormData.name,
      age,
      ageUnit: listingFormData.ageUnit,
      gender: listingFormData.gender,
      price,
      description: listingFormData.description,
      images: listingFormData.images,
      pedigree: listingFormData.pedigree,
      vaccinated: listingFormData.vaccinated,
      microchipped: listingFormData.microchipped,
      location: listingFormData.location,
      breeder: listingFormData.breeder,
      available: listingFormData.available
    };

    if (editingListing) {
      const updatedListings = listings.map(listing =>
        listing.id === editingListing.id ? { ...listing, ...listingData } : listing
      );
      saveToLocalStorage(STORAGE_KEYS.USER_LISTINGS, updatedListings);
      setListings(updatedListings);
      toast.success('Annonce mise à jour avec succès');
    } else {
      const newListing: DogListing = {
        ...listingData,
        id: `admin-listing-${Date.now()}`,
        postedDate: new Date().toISOString(),
        sellerId: user.id
      };

      const updatedListings = [...listings, newListing];
      saveToLocalStorage(STORAGE_KEYS.USER_LISTINGS, updatedListings);
      setListings(updatedListings);
      toast.success('Annonce publiée avec succès');
    }

    resetListingForm();
  };

  const handleEditListing = (listing: DogListing) => {
    setEditingListing(listing);
    setListingFormData({
      breedId: listing.breedId,
      name: listing.name,
      age: listing.age.toString(),
      ageUnit: listing.ageUnit,
      gender: listing.gender,
      price: listing.price.toString(),
      description: listing.description,
      images: listing.images,
      pedigree: listing.pedigree,
      vaccinated: listing.vaccinated,
      microchipped: listing.microchipped,
      location: listing.location,
      breeder: listing.breeder,
      available: listing.available
    });
    setShowListingForm(true);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return (
          <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] xs:text-xs">
            <Crown className="h-2.5 w-2.5 xs:h-3 xs:w-3 mr-1" />
            Admin
          </Badge>
        );
      case 'seller':
        return (
          <Badge className="bg-[#D4A574]/20 text-[#D4A574] text-[10px] xs:text-xs">
            <Store className="h-2.5 w-2.5 xs:h-3 xs:w-3 mr-1" />
            Vendeur
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] xs:text-xs">
            <ShoppingBag className="h-2.5 w-2.5 xs:h-3 xs:w-3 mr-1" />
            Acheteur
          </Badge>
        );
    }
  };

  const getOrderStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            Complétée
          </Badge>
        );
      case 'fully-paid':
        return (
          <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            Payée
          </Badge>
        );
      case 'deposit-paid':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
            <Clock className="h-3 w-3 mr-1" />
            Acompte payé
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-orange-500/20 text-orange-600 dark:text-orange-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-500/20 text-red-600 dark:text-red-400">
            <XCircle className="h-3 w-3 mr-1" />
            Annulée
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getBreedName = (breedId: string) => {
    return dogBreeds.find((b) => b.id === breedId)?.name || 'Race inconnue';
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || u.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  const filteredListings = useMemo(() => {
    return listings.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getBreedName(l.breedId).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'available' && l.available) ||
        (filterStatus === 'sold' && !l.available);
      return matchesSearch && matchesStatus;
    });
  }, [listings, searchTerm, filterStatus]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.dogName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.buyerInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, filterStatus]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#D4A574] to-[#2C5530]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto" />
          <p className="text-white font-medium">Chargement du panneau administrateur...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !userIsAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4A574] to-[#2C5530] pb-20 lg:pb-6">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 xs:space-y-6"
        >
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold flex items-center gap-3 mb-2">
                  <Shield className="h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10" />
                  Panneau Super Administrateur
                </h1>
                <p className="text-sm xs:text-base opacity-90">
                  Bienvenue, {user?.name} • Gestion complète de la plateforme
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRefresh}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualiser
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="bg-red-500/80 hover:bg-red-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card className="bg-white/95 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Utilisateurs</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Annonces</p>
                    <p className="text-2xl font-bold">{stats.totalListings}</p>
                  </div>
                  <Dog className="h-8 w-8 text-[#D4A574]" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Commandes</p>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Revenus</p>
                    <p className="text-xl font-bold">{formatPrice(stats.totalRevenue)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/20 backdrop-blur">
              <TabsTrigger value="users" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                <Users className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Utilisateurs</span>
              </TabsTrigger>
              <TabsTrigger value="listings" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                <Dog className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Annonces</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Commandes</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                <BarChart3 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Stats</span>
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="mt-4">
              <Card className="bg-white/95 backdrop-blur">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-48"
                      />
                      <Select value={filterRole} onValueChange={setFilterRole}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous</SelectItem>
                          <SelectItem value="buyer">Acheteurs</SelectItem>
                          <SelectItem value="seller">Vendeurs</SelectItem>
                          <SelectItem value="admin">Admins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Rôle</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((u) => (
                          <TableRow key={u.id}>
                            <TableCell className="font-medium">{u.name}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>{getRoleBadge(u.role)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Select
                                  value={u.role}
                                  onValueChange={(value) => handleRoleChange(u.id, value)}
                                >
                                  <SelectTrigger className="w-28 h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="buyer">Acheteur</SelectItem>
                                    <SelectItem value="seller">Vendeur</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Supprimer l'utilisateur ?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Cette action est irréversible.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteUser(u.id)}>
                                        Supprimer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Listings Tab */}
            <TabsContent value="listings" className="mt-4">
              <Card className="bg-white/95 backdrop-blur">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle>Gestion des annonces</CardTitle>
                    <div className="flex gap-2">
                      <Button onClick={() => setShowListingForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle annonce
                      </Button>
                      <Button variant="outline" onClick={() => handleExportData('listings')}>
                        <Download className="h-4 w-4 mr-2" />
                        Exporter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Race</TableHead>
                          <TableHead>Prix</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredListings.map((listing) => (
                          <TableRow key={listing.id}>
                            <TableCell className="font-medium">{listing.name}</TableCell>
                            <TableCell>{getBreedName(listing.breedId)}</TableCell>
                            <TableCell>{formatPrice(listing.price)}</TableCell>
                            <TableCell>
                              <Badge variant={listing.available ? "default" : "secondary"}>
                                {listing.available ? 'Disponible' : 'Vendu'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditListing(listing)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleToggleListingAvailability(listing.id)}
                                >
                                  {listing.available ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Supprimer l'annonce ?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Cette action est irréversible.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteListing(listing.id)}>
                                        Supprimer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-4">
              <Card className="bg-white/95 backdrop-blur">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle>Gestion des commandes</CardTitle>
                    <Button variant="outline" onClick={() => handleExportData('orders')}>
                      <Download className="h-4 w-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {orders.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        Aucune commande pour le moment
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Chien</TableHead>
                            <TableHead>Acheteur</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.dogName}</TableCell>
                              <TableCell>{order.buyerInfo.name}</TableCell>
                              <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                              <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Select
                                    value={order.status}
                                    onValueChange={(value) => handleUpdateOrderStatus(order.id, value as Order['status'])}
                                  >
                                    <SelectTrigger className="w-32 h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">En attente</SelectItem>
                                      <SelectItem value="deposit-paid">Acompte payé</SelectItem>
                                      <SelectItem value="fully-paid">Payée</SelectItem>
                                      <SelectItem value="completed">Complétée</SelectItem>
                                      <SelectItem value="cancelled">Annulée</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive" size="sm">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Supprimer la commande ?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Cette action est irréversible.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteOrder(order.id)}>
                                          Supprimer
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-white/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-sm">Répartition des utilisateurs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Acheteurs</span>
                        <span className="font-bold">{stats.buyers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vendeurs</span>
                        <span className="font-bold">{stats.sellers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Admins</span>
                        <span className="font-bold">{stats.admins}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-sm">Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Taux de conversion</span>
                        <span className="font-bold">{stats.conversionRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Panier moyen</span>
                        <span className="font-bold">{formatPrice(stats.averageOrderValue)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-sm">Top</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Race populaire</span>
                        <span className="font-bold text-sm">{stats.topBreed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Meilleur vendeur</span>
                        <span className="font-bold text-sm">{stats.topSeller}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Listing Form Dialog */}
      <Dialog open={showListingForm} onOpenChange={(open) => {
        if (!open) resetListingForm();
        setShowListingForm(open);
      }}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 sm:p-6 pb-0">
            <DialogTitle className="text-xl sm:text-2xl">
              {editingListing ? "Modifier l'annonce" : 'Nouvelle annonce'}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-80px)]">
            <form onSubmit={handleSubmitListing} className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="breed" className="text-sm">Race *</Label>
                <Select
                  value={listingFormData.breedId}
                  onValueChange={(value) => setListingFormData({ ...listingFormData, breedId: value })}
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
                    value={listingFormData.name}
                    onChange={(e) => setListingFormData({ ...listingFormData, name: e.target.value })}
                    required
                    className="h-10 sm:h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm">Sexe *</Label>
                  <Select
                    value={listingFormData.gender}
                    onValueChange={(value) => setListingFormData({ ...listingFormData, gender: value as 'Mâle' | 'Femelle' })}
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
                    min="1"
                    value={listingFormData.age}
                    onChange={(e) => setListingFormData({ ...listingFormData, age: e.target.value })}
                    required
                    className="h-10 sm:h-11"
                    placeholder="Ex: 3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageUnit" className="text-sm">Unité *</Label>
                  <Select
                    value={listingFormData.ageUnit}
                    onValueChange={(value) => setListingFormData({ ...listingFormData, ageUnit: value as 'semaines' | 'mois' | 'ans' })}
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
                  min="1"
                  value={listingFormData.price}
                  onChange={(e) => setListingFormData({ ...listingFormData, price: e.target.value })}
                  required
                  className="h-10 sm:h-11"
                  placeholder="Ex: 500000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm">Localisation *</Label>
                <Input
                  id="location"
                  value={listingFormData.location}
                  onChange={(e) => setListingFormData({ ...listingFormData, location: e.target.value })}
                  placeholder="Ex: Dakar, Sénégal"
                  required
                  className="h-10 sm:h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm">Description *</Label>
                <Textarea
                  id="description"
                  value={listingFormData.description}
                  onChange={(e) => setListingFormData({ ...listingFormData, description: e.target.value })}
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
                  value={listingFormData.images[0]}
                  onChange={(e) => setListingFormData({ ...listingFormData, images: [e.target.value] })}
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
                    checked={listingFormData.pedigree}
                    onCheckedChange={(checked) => setListingFormData({ ...listingFormData, pedigree: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="vaccinated" className="text-sm">Vacciné</Label>
                  <Switch
                    id="vaccinated"
                    checked={listingFormData.vaccinated}
                    onCheckedChange={(checked) => setListingFormData({ ...listingFormData, vaccinated: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="microchipped" className="text-sm">Pucé</Label>
                  <Switch
                    id="microchipped"
                    checked={listingFormData.microchipped}
                    onCheckedChange={(checked) => setListingFormData({ ...listingFormData, microchipped: checked })}
                  />
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 pt-2">
                <Button type="button" variant="outline" onClick={resetListingForm} className="flex-1 h-10 sm:h-11">
                  Annuler
                </Button>
                <Button type="submit" className="flex-1 h-10 sm:h-11">
                  {editingListing ? 'Mettre à jour' : "Publier l'annonce"}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

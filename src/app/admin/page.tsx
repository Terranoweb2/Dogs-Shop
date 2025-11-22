
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Shield, 
  Users, 
  Dog, 
  ShoppingCart, 
  FileText, 
  BarChart3, 
  Settings,
  Trash2,
  UserCog,
  Store,
  ShoppingBag,
  Crown
} from 'lucide-react';
import { User } from '@/types/user';
import { getFromLocalStorage, STORAGE_KEYS } from '@/lib/localStorage';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isAdmin, getAllUsers, updateUserRole, deleteUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    buyers: 0,
    sellers: 0,
    admins: 0,
    totalOrders: 0,
    totalListings: 0
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin())) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  useEffect(() => {
    if (isAdmin()) {
      const allUsers = getAllUsers();
      setUsers(allUsers);
      
      const orders = getFromLocalStorage<any[]>(STORAGE_KEYS.ORDERS, []);
      const listings = getFromLocalStorage<any[]>(STORAGE_KEYS.USER_LISTINGS, []);
      
      setStats({
        totalUsers: allUsers.length,
        buyers: allUsers.filter(u => u.role === 'buyer').length,
        sellers: allUsers.filter(u => u.role === 'seller').length,
        admins: allUsers.filter(u => u.role === 'admin').length,
        totalOrders: orders.length,
        totalListings: listings.length
      });
    }
  }, [isAdmin, getAllUsers]);

  const handleRoleChange = (userId: string, newRole: string) => {
    updateUserRole(userId, newRole as 'buyer' | 'seller' | 'admin');
    setUsers(getAllUsers());
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
    setUsers(getAllUsers());
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] xs:text-xs"><Crown className="h-2.5 w-2.5 xs:h-3 xs:w-3 mr-1" />Admin</Badge>;
      case 'seller':
        return <Badge className="bg-[#D4A574]/20 text-[#D4A574] text-[10px] xs:text-xs"><Store className="h-2.5 w-2.5 xs:h-3 xs:w-3 mr-1" />Vendeur</Badge>;
      default:
        return <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] xs:text-xs"><ShoppingBag className="h-2.5 w-2.5 xs:h-3 xs:w-3 mr-1" />Acheteur</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-6">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 xs:space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 xs:gap-4">
            <div>
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold flex items-center gap-2">
                <Shield className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 text-amber-500" />
                Tableau de bord Admin
              </h1>
              <p className="text-xs xs:text-sm text-muted-foreground mt-1">
                Bienvenue, {user?.name}
              </p>
            </div>
            <Badge variant="outline" className="self-start sm:self-auto text-[10px] xs:text-xs">
              Super Administrateur
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 xs:gap-3 sm:gap-4">
            <Card className="col-span-1">
              <CardContent className="p-3 xs:p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 xs:h-5 xs:w-5 text-blue-500" />
                  <div>
                    <p className="text-[10px] xs:text-xs text-muted-foreground">Utilisateurs</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardContent className="p-3 xs:p-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 xs:h-5 xs:w-5 text-green-500" />
                  <div>
                    <p className="text-[10px] xs:text-xs text-muted-foreground">Acheteurs</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold">{stats.buyers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardContent className="p-3 xs:p-4">
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4 xs:h-5 xs:w-5 text-[#D4A574]" />
                  <div>
                    <p className="text-[10px] xs:text-xs text-muted-foreground">Vendeurs</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold">{stats.sellers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardContent className="p-3 xs:p-4">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 xs:h-5 xs:w-5 text-amber-500" />
                  <div>
                    <p className="text-[10px] xs:text-xs text-muted-foreground">Admins</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold">{stats.admins}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardContent className="p-3 xs:p-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 xs:h-5 xs:w-5 text-purple-500" />
                  <div>
                    <p className="text-[10px] xs:text-xs text-muted-foreground">Commandes</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardContent className="p-3 xs:p-4">
                <div className="flex items-center gap-2">
                  <Dog className="h-4 w-4 xs:h-5 xs:w-5 text-pink-500" />
                  <div>
                    <p className="text-[10px] xs:text-xs text-muted-foreground">Annonces</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold">{stats.totalListings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="w-full grid grid-cols-3 sm:grid-cols-4 h-9 xs:h-10">
              <TabsTrigger value="users" className="text-[10px] xs:text-xs sm:text-sm">
                <Users className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 mr-1 xs:mr-1.5" />
                <span className="hidden xs:inline">Utilisateurs</span>
                <span className="xs:hidden">Users</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-[10px] xs:text-xs sm:text-sm">
                <ShoppingCart className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 mr-1 xs:mr-1.5" />
                <span className="hidden xs:inline">Commandes</span>
                <span className="xs:hidden">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="text-[10px] xs:text-xs sm:text-sm">
                <BarChart3 className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 mr-1 xs:mr-1.5" />
                <span className="hidden xs:inline">Statistiques</span>
                <span className="xs:hidden">Stats</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-[10px] xs:text-xs sm:text-sm hidden sm:flex">
                <Settings className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 mr-1 xs:mr-1.5" />
                Paramètres
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-4">
              <Card>
                <CardHeader className="p-3 xs:p-4 sm:p-6">
                  <CardTitle className="text-base xs:text-lg sm:text-xl">Gestion des utilisateurs</CardTitle>
                  <CardDescription className="text-[10px] xs:text-xs sm:text-sm">
                    Gérez les comptes et les rôles des utilisateurs
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="w-full">
                    <div className="min-w-[600px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-[10px] xs:text-xs sm:text-sm">Nom</TableHead>
                            <TableHead className="text-[10px] xs:text-xs sm:text-sm">Email</TableHead>
                            <TableHead className="text-[10px] xs:text-xs sm:text-sm">Téléphone</TableHead>
                            <TableHead className="text-[10px] xs:text-xs sm:text-sm">Rôle</TableHead>
                            <TableHead className="text-[10px] xs:text-xs sm:text-sm">Date</TableHead>
                            <TableHead className="text-[10px] xs:text-xs sm:text-sm text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((u) => (
                            <TableRow key={u.id}>
                              <TableCell className="text-[10px] xs:text-xs sm:text-sm font-medium">
                                {u.name}
                                {u.id === user?.id && (
                                  <Badge variant="outline" className="ml-2 text-[8px] xs:text-[9px]">Vous</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-[10px] xs:text-xs sm:text-sm">{u.email}</TableCell>
                              <TableCell className="text-[10px] xs:text-xs sm:text-sm">{u.phone}</TableCell>
                              <TableCell>
                                {u.id === user?.id ? (
                                  getRoleBadge(u.role)
                                ) : (
                                  <Select
                                    value={u.role}
                                    onValueChange={(value) => handleRoleChange(u.id, value)}
                                  >
                                    <SelectTrigger className="w-[100px] xs:w-[120px] h-7 xs:h-8 text-[10px] xs:text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="buyer" className="text-[10px] xs:text-xs">Acheteur</SelectItem>
                                      <SelectItem value="seller" className="text-[10px] xs:text-xs">Vendeur</SelectItem>
                                      <SelectItem value="admin" className="text-[10px] xs:text-xs">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              </TableCell>
                              <TableCell className="text-[10px] xs:text-xs sm:text-sm">
                                {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                              </TableCell>
                              <TableCell className="text-right">
                                {u.id !== user?.id && (
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 xs:h-8 xs:w-8 text-destructive hover:text-destructive">
                                        <Trash2 className="h-3 w-3 xs:h-3.5 xs:w-3.5" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-base xs:text-lg">Supprimer l'utilisateur ?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-xs xs:text-sm">
                                          Cette action est irréversible. L'utilisateur {u.name} sera définitivement supprimé.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="text-xs xs:text-sm h-8 xs:h-9">Annuler</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleDeleteUser(u.id)}
                                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs xs:text-sm h-8 xs:h-9"
                                        >
                                          Supprimer
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardHeader className="p-3 xs:p-4 sm:p-6">
                  <CardTitle className="text-base xs:text-lg sm:text-xl">Gestion des commandes</CardTitle>
                  <CardDescription className="text-[10px] xs:text-xs sm:text-sm">
                    Suivez et gérez toutes les commandes de la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 xs:p-4 sm:p-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-10 w-10 xs:h-12 xs:w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-xs xs:text-sm">Aucune commande pour le moment</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="mt-4">
              <Card>
                <CardHeader className="p-3 xs:p-4 sm:p-6">
                  <CardTitle className="text-base xs:text-lg sm:text-xl">Statistiques</CardTitle>
                  <CardDescription className="text-[10px] xs:text-xs sm:text-sm">
                    Aperçu des performances de la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 xs:p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold text-sm xs:text-base mb-2">Répartition des utilisateurs</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs xs:text-sm">
                          <span>Acheteurs</span>
                          <span className="font-medium">{stats.buyers}</span>
                        </div>
                        <div className="flex justify-between text-xs xs:text-sm">
                          <span>Vendeurs</span>
                          <span className="font-medium">{stats.sellers}</span>
                        </div>
                        <div className="flex justify-between text-xs xs:text-sm">
                          <span>Administrateurs</span>
                          <span className="font-medium">{stats.admins}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold text-sm xs:text-base mb-2">Activité</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs xs:text-sm">
                          <span>Total commandes</span>
                          <span className="font-medium">{stats.totalOrders}</span>
                        </div>
                        <div className="flex justify-between text-xs xs:text-sm">
                          <span>Total annonces</span>
                          <span className="font-medium">{stats.totalListings}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardHeader className="p-3 xs:p-4 sm:p-6">
                  <CardTitle className="text-base xs:text-lg sm:text-xl">Paramètres système</CardTitle>
                  <CardDescription className="text-[10px] xs:text-xs sm:text-sm">
                    Configurez les paramètres de la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 xs:p-4 sm:p-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <Settings className="h-10 w-10 xs:h-12 xs:w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-xs xs:text-sm">Paramètres à venir</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

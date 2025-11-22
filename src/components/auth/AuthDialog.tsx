
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { getFromLocalStorage, STORAGE_KEYS } from '@/lib/localStorage';
import { User } from '@/types/user';
import { LogIn, UserPlus, Store, ShoppingBag, Shield } from 'lucide-react';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const router = useRouter();
  const { register, login } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    role: 'buyer' as 'buyer' | 'seller',
    businessName: '',
    address: ''
  });

  // Vérifier si c'est le premier utilisateur
  const isFirstUser = () => {
    const users = getFromLocalStorage<User[]>(STORAGE_KEYS.USERS, []);
    return users.length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(loginData.email, loginData.password);
    if (result) {
      onOpenChange(false);
      setLoginData({ email: '', password: '' });
      
      if (result.role === 'admin') {
        router.push('/admin');
      } else if (result.role === 'seller') {
        router.push('/mes-annonces');
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      return;
    }

    const result = register({
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
      phone: registerData.phone,
      role: registerData.role,
      breederInfo: registerData.role === 'seller' ? {
        businessName: registerData.businessName,
        address: registerData.address
      } : undefined
    });

    if (result) {
      onOpenChange(false);
      setRegisterData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        role: 'buyer',
        businessName: '',
        address: ''
      });
      
      if (result.role === 'admin') {
        router.push('/admin');
      } else if (registerData.role === 'seller') {
        router.push('/mes-annonces');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[92vw] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-3 xs:p-4 sm:p-6 pb-0">
          <DialogTitle className="text-lg xs:text-xl sm:text-2xl">Bienvenue sur Dogs-Shop</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')} className="w-full">
          <div className="px-3 xs:px-4 sm:px-6">
            <TabsList className="grid w-full grid-cols-2 h-9 xs:h-10 sm:h-11">
              <TabsTrigger value="login" className="text-xs xs:text-sm">
                <LogIn className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-1 xs:mr-1.5 sm:mr-2" />
                Connexion
              </TabsTrigger>
              <TabsTrigger value="register" className="text-xs xs:text-sm">
                <UserPlus className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-1 xs:mr-1.5 sm:mr-2" />
                Inscription
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="max-h-[calc(90vh-120px)] xs:max-h-[calc(90vh-140px)]">
            <TabsContent value="login" className="p-3 xs:p-4 sm:p-6 pt-3 xs:pt-4 mt-0">
              <form onSubmit={handleLogin} className="space-y-3 xs:space-y-4">
                <div className="space-y-1.5 xs:space-y-2">
                  <Label htmlFor="login-email" className="text-xs xs:text-sm">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="h-9 xs:h-10 sm:h-11 text-sm"
                  />
                </div>

                <div className="space-y-1.5 xs:space-y-2">
                  <Label htmlFor="login-password" className="text-xs xs:text-sm">Mot de passe</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="h-9 xs:h-10 sm:h-11 text-sm"
                  />
                </div>

                <Button type="submit" className="w-full h-9 xs:h-10 sm:h-11 text-sm">
                  <LogIn className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-2" />
                  Se connecter
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="p-3 xs:p-4 sm:p-6 pt-3 xs:pt-4 mt-0">
              <form onSubmit={handleRegister} className="space-y-3 xs:space-y-4">
                {isFirstUser() && (
                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-3 xs:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 xs:h-5 xs:w-5 text-amber-500" />
                      <span className="font-semibold text-xs xs:text-sm text-amber-600 dark:text-amber-400">
                        Premier compte
                      </span>
                      <Badge variant="secondary" className="text-[9px] xs:text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400">
                        Super Admin
                      </Badge>
                    </div>
                    <p className="text-[10px] xs:text-xs text-muted-foreground">
                      Ce compte aura tous les droits d'administration sur la plateforme.
                    </p>
                  </div>
                )}

                {!isFirstUser() && (
                  <div className="space-y-2 xs:space-y-3">
                    <Label className="text-xs xs:text-sm">Type de compte</Label>
                    <RadioGroup 
                      value={registerData.role} 
                      onValueChange={(value) => setRegisterData({ ...registerData, role: value as 'buyer' | 'seller' })}
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-2 xs:p-2.5 sm:p-3 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="buyer" id="buyer" />
                        <Label htmlFor="buyer" className="flex-1 cursor-pointer flex items-center gap-1.5 xs:gap-2">
                          <ShoppingBag className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-blue-500 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-xs xs:text-sm">Acheteur</p>
                            <p className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground">Je cherche à adopter</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded-lg p-2 xs:p-2.5 sm:p-3 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="seller" id="seller" />
                        <Label htmlFor="seller" className="flex-1 cursor-pointer flex items-center gap-1.5 xs:gap-2">
                          <Store className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-[#D4A574] flex-shrink-0" />
                          <div>
                            <p className="font-medium text-xs xs:text-sm">Éleveur / Vendeur</p>
                            <p className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground">Je veux publier des annonces</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <div className="space-y-1.5 xs:space-y-2">
                  <Label htmlFor="register-name" className="text-xs xs:text-sm">Nom complet</Label>
                  <Input
                    id="register-name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                    className="h-9 xs:h-10 sm:h-11 text-sm"
                  />
                </div>

                <div className="space-y-1.5 xs:space-y-2">
                  <Label htmlFor="register-phone" className="text-xs xs:text-sm">Téléphone</Label>
                  <Input
                    id="register-phone"
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    required
                    className="h-9 xs:h-10 sm:h-11 text-sm"
                  />
                </div>

                <div className="space-y-1.5 xs:space-y-2">
                  <Label htmlFor="register-email" className="text-xs xs:text-sm">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                    className="h-9 xs:h-10 sm:h-11 text-sm"
                  />
                </div>

                {!isFirstUser() && registerData.role === 'seller' && (
                  <>
                    <div className="space-y-1.5 xs:space-y-2">
                      <Label htmlFor="business-name" className="text-xs xs:text-sm">Nom de l'élevage</Label>
                      <Input
                        id="business-name"
                        value={registerData.businessName}
                        onChange={(e) => setRegisterData({ ...registerData, businessName: e.target.value })}
                        required
                        className="h-9 xs:h-10 sm:h-11 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5 xs:space-y-2">
                      <Label htmlFor="address" className="text-xs xs:text-sm">Adresse</Label>
                      <Input
                        id="address"
                        value={registerData.address}
                        onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                        required
                        className="h-9 xs:h-10 sm:h-11 text-sm"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1.5 xs:space-y-2">
                  <Label htmlFor="register-password" className="text-xs xs:text-sm">Mot de passe</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                    className="h-9 xs:h-10 sm:h-11 text-sm"
                  />
                </div>

                <div className="space-y-1.5 xs:space-y-2">
                  <Label htmlFor="confirm-password" className="text-xs xs:text-sm">Confirmer le mot de passe</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                    className="h-9 xs:h-10 sm:h-11 text-sm"
                  />
                </div>

                <Button type="submit" className="w-full h-9 xs:h-10 sm:h-11 text-sm">
                  {isFirstUser() ? (
                    <>
                      <Shield className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-2" />
                      Créer le compte Admin
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-2" />
                      Créer mon compte
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

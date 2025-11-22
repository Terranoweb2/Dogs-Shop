
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useAuth } from '@/hooks/use-auth';
import { useFavorites } from '@/hooks/use-favorites';
import {
  Dog,
  Heart,
  User,
  Menu,
  X,
  ShoppingCart,
  Calculator,
  Award,
  GitCompare,
  Shield,
  LogOut,
  FileText,
  Store,
  HelpCircle,
  Stethoscope,
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const navigation = [
    { name: 'Annonces', href: '/annonces', icon: Dog },
    { name: 'Races', href: '/races', icon: Award },
    { name: 'Comparaison', href: '/comparaison', icon: GitCompare },
    { name: 'Calculateur', href: '/calculateur', icon: Calculator },
    { name: 'Santé', href: '/sante', icon: Stethoscope },
    { name: 'Quiz', href: '/quiz', icon: HelpCircle },
  ];

  const userNavigation = [
    { name: 'Mes favoris', href: '/favoris', icon: Heart },
    { name: 'Mes commandes', href: '/commandes', icon: ShoppingCart },
    { name: 'Mes annonces', href: '/mes-annonces', icon: FileText },
  ];

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Dog className="h-6 w-6 sm:h-8 sm:w-8 text-[#D4A574]" />
            <span className="font-bold text-lg sm:text-xl">ChienMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className="text-sm"
                  >
                    <item.icon className="h-4 w-4 mr-1.5" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <ThemeToggle />

            {/* Favorites button */}
            <Link href="/favoris" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[10px] sm:text-xs"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User menu or login button */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 sm:gap-2">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline max-w-[100px] truncate">
                      {user.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {userNavigation.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href} className="cursor-pointer">
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  {isAdmin() && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Shield className="h-4 w-4 mr-2" />
                          Administration
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                onClick={() => setAuthDialogOpen(true)}
                className="bg-[#D4A574] hover:bg-[#C49A6C] text-white text-xs sm:text-sm"
              >
                <User className="h-4 w-4 mr-1.5" />
                <span className="hidden xs:inline">Connexion</span>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-background"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              {isAuthenticated && (
                <>
                  <div className="border-t pt-2 mt-2">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button variant="ghost" className="w-full justify-start">
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                    {isAdmin() && (
                      <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Shield className="h-4 w-4 mr-2" />
                          Administration
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </header>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
}

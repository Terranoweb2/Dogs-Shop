
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  LogOut, 
  Heart, 
  ShoppingCart, 
  FileText, 
  Menu,
  Dog,
  Calculator,
  Stethoscope,
  GitCompare,
  HelpCircle,
  BookOpen,
  Shield,
  Store
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    { href: '/annonces', label: 'Annonces', icon: Dog },
    { href: '/races', label: 'Races', icon: BookOpen },
    { href: '/calculateur', label: 'Calculateur', icon: Calculator },
    { href: '/sante', label: 'Santé', icon: Stethoscope },
    { href: '/comparaison', label: 'Comparer', icon: GitCompare },
    { href: '/quiz', label: 'Quiz', icon: HelpCircle },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 xs:h-16 items-center justify-between px-3 xs:px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 xs:gap-2">
            <Image
              src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1763812106/dog-shop_copie_wzu9xb.png"
              alt="Dogs-Shop Logo"
              width={32}
              height={32}
              className="h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9"
            />
            <span className="font-bold text-base xs:text-lg sm:text-xl text-[#D4A574]">
              Dogs-Shop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" size="sm" className="text-xs xl:text-sm">
                  <item.icon className="h-3.5 w-3.5 mr-1.5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                {/* Admin Badge */}
                {isAdmin() && (
                  <Link href="/admin" className="hidden sm:block">
                    <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10">
                      <Shield className="h-3.5 w-3.5" />
                      Admin
                    </Button>
                  </Link>
                )}

                {/* Seller Dashboard */}
                {user?.role === 'seller' && (
                  <Link href="/mes-annonces" className="hidden sm:block">
                    <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
                      <Store className="h-3.5 w-3.5" />
                      Mes annonces
                    </Button>
                  </Link>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 xs:h-9 xs:w-9">
                      <User className="h-4 w-4 xs:h-5 xs:w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 xs:w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-xs xs:text-sm font-medium truncate">{user?.name}</p>
                      <p className="text-[10px] xs:text-xs text-muted-foreground truncate">{user?.email}</p>
                      {user?.role === 'admin' && (
                        <Badge className="mt-1 text-[9px] xs:text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400">
                          Super Admin
                        </Badge>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    {isAdmin() && (
                      <>
                        <DropdownMenuItem onClick={() => router.push('/admin')} className="text-xs xs:text-sm">
                          <Shield className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-2 text-amber-500" />
                          Tableau de bord Admin
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={() => router.push('/favoris')} className="text-xs xs:text-sm">
                      <Heart className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-2" />
                      Mes favoris
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/commandes')} className="text-xs xs:text-sm">
                      <ShoppingCart className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-2" />
                      Mes commandes
                    </DropdownMenuItem>
                    {(user?.role === 'seller' || user?.role === 'admin') && (
                      <DropdownMenuItem onClick={() => router.push('/mes-annonces')} className="text-xs xs:text-sm">
                        <FileText className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-2" />
                        Mes annonces
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-xs xs:text-sm text-destructive">
                      <LogOut className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-2" />
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button 
                onClick={() => setAuthDialogOpen(true)} 
                size="sm"
                className="h-8 xs:h-9 text-xs xs:text-sm px-2.5 xs:px-3 sm:px-4"
              >
                <User className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-1 xs:mr-1.5 sm:mr-2" />
                <span className="hidden xs:inline">Connexion</span>
                <span className="xs:hidden">Login</span>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 xs:h-9 xs:w-9">
                  <Menu className="h-4 w-4 xs:h-5 xs:w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] xs:w-[320px] sm:w-[380px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Image
                      src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1763812106/dog-shop_copie_wzu9xb.png"
                      alt="Dogs-Shop Logo"
                      width={24}
                      height={24}
                    />
                    Dogs-Shop
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1">
                  {isAdmin() && (
                    <>
                      <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-sm h-10 text-amber-600 dark:text-amber-400">
                          <Shield className="h-4 w-4 mr-3" />
                          Tableau de bord Admin
                        </Button>
                      </Link>
                      <div className="my-2 border-t" />
                    </>
                  )}
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-sm h-10">
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
}

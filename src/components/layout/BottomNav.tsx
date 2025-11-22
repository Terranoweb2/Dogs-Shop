
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { 
  Home, 
  Search, 
  Heart, 
  ShoppingCart, 
  User,
  Shield
} from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, isAdmin } = useAuth();

  const navItems = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/annonces', label: 'Annonces', icon: Search },
    { href: '/favoris', label: 'Favoris', icon: Heart },
    { href: '/commandes', label: 'Commandes', icon: ShoppingCart },
  ];

  // Ajouter le lien admin si l'utilisateur est admin
  if (isAuthenticated && isAdmin()) {
    navItems.splice(2, 0, { href: '/admin', label: 'Admin', icon: Shield });
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t safe-area-bottom">
      <div className="flex items-center justify-around h-14 xs:h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isAdminItem = item.href === '/admin';
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 xs:gap-1 transition-colors",
                isActive 
                  ? isAdminItem 
                    ? "text-amber-500" 
                    : "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4 xs:h-5 xs:w-5",
                isActive && isAdminItem && "text-amber-500"
              )} />
              <span className={cn(
                "text-[9px] xs:text-[10px] sm:text-xs font-medium",
                isActive && isAdminItem && "text-amber-500"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

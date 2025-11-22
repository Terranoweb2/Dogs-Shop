
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '@/lib/localStorage';
import { isSuperAdmin } from '@/lib/constants';
import { User } from '@/types/user';
import { Shield, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function AdminDiagnostic() {
  const [diagnosticResult, setDiagnosticResult] = useState<{
    currentUser: User | null;
    isSuperAdminEmail: boolean;
    hasAdminRole: boolean;
    hasAdminPermissions: boolean;
  } | null>(null);

  const runDiagnostic = () => {
    const currentUser = getFromLocalStorage<User | null>(STORAGE_KEYS.USER, null);
    
    if (!currentUser) {
      toast.error('Aucun utilisateur connecté');
      return;
    }

    const result = {
      currentUser,
      isSuperAdminEmail: isSuperAdmin(currentUser.email),
      hasAdminRole: currentUser.role === 'admin',
      hasAdminPermissions: !!currentUser.adminPermissions
    };

    setDiagnosticResult(result);
  };

  const fixAdminRights = () => {
    const currentUser = getFromLocalStorage<User | null>(STORAGE_KEYS.USER, null);
    
    if (!currentUser) {
      toast.error('Aucun utilisateur connecté');
      return;
    }

    if (!isSuperAdmin(currentUser.email)) {
      toast.error('Cet email n\'est pas autorisé comme super administrateur');
      return;
    }

    // Mettre à jour l'utilisateur avec les droits admin
    const updatedUser: User = {
      ...currentUser,
      role: 'admin',
      adminPermissions: {
        manageUsers: true,
        manageDogs: true,
        manageOrders: true,
        manageAnnonces: true,
        manageReports: true,
        viewStatistics: true,
        systemSettings: true
      }
    };

    // Sauvegarder l'utilisateur mis à jour
    saveToLocalStorage(STORAGE_KEYS.USER, updatedUser);

    // Mettre à jour dans la liste des utilisateurs
    const users = getFromLocalStorage<User[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      saveToLocalStorage(STORAGE_KEYS.USERS, users);
    }

    toast.success('Droits d\'administrateur activés ! Rechargez la page.');
    
    // Recharger la page après 1 seconde
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-500" />
          Diagnostic Super Administrateur
        </CardTitle>
        <CardDescription>
          Vérifiez et corrigez vos droits d'administrateur
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runDiagnostic} className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Lancer le diagnostic
        </Button>

        {diagnosticResult && (
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Email connecté</span>
                <span className="text-sm">{diagnosticResult.currentUser?.email}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Email autorisé comme Super Admin</span>
                {diagnosticResult.isSuperAdminEmail ? (
                  <Badge className="bg-green-500/20 text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Oui
                  </Badge>
                ) : (
                  <Badge className="bg-red-500/20 text-red-600">
                    <XCircle className="h-3 w-3 mr-1" />
                    Non
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Rôle Admin actif</span>
                {diagnosticResult.hasAdminRole ? (
                  <Badge className="bg-green-500/20 text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Oui
                  </Badge>
                ) : (
                  <Badge className="bg-red-500/20 text-red-600">
                    <XCircle className="h-3 w-3 mr-1" />
                    Non
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Permissions Admin</span>
                {diagnosticResult.hasAdminPermissions ? (
                  <Badge className="bg-green-500/20 text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Oui
                  </Badge>
                ) : (
                  <Badge className="bg-red-500/20 text-red-600">
                    <XCircle className="h-3 w-3 mr-1" />
                    Non
                  </Badge>
                )}
              </div>
            </div>

            {diagnosticResult.isSuperAdminEmail && (!diagnosticResult.hasAdminRole || !diagnosticResult.hasAdminPermissions) && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-sm text-amber-600 dark:text-amber-400 mb-3">
                  ⚠️ Votre email est autorisé comme super administrateur mais les droits ne sont pas activés.
                </p>
                <Button onClick={fixAdminRights} className="w-full bg-amber-500 hover:bg-amber-600">
                  <Shield className="h-4 w-4 mr-2" />
                  Activer les droits d'administrateur
                </Button>
              </div>
            )}

            {diagnosticResult.isSuperAdminEmail && diagnosticResult.hasAdminRole && diagnosticResult.hasAdminPermissions && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  ✅ Tous les droits d'administrateur sont actifs ! Vous pouvez accéder au panneau admin.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

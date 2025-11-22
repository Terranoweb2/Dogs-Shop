
// Configuration des super administrateurs
export const SUPER_ADMINS = [
  {
    email: 'socialassaibo@gmail.com',
    name: 'TOH JEAN GEORGES GLACIA',
    role: 'admin' as const
  }
];

// Vérifier si un email est un super administrateur
export function isSuperAdmin(email: string): boolean {
  return SUPER_ADMINS.some(admin => admin.email.toLowerCase() === email.toLowerCase());
}

// Obtenir les informations d'un super administrateur
export function getSuperAdminInfo(email: string) {
  return SUPER_ADMINS.find(admin => admin.email.toLowerCase() === email.toLowerCase());
}

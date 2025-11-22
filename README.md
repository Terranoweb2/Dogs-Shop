
# 🐕 Dogs Shop

Application web moderne pour la vente et l'adoption de chiens, construite avec Next.js 15 et TypeScript.

## 🚀 Fonctionnalités

- 🐶 **Catalogue de chiens** - Parcourez les annonces de chiens disponibles
- 🔍 **Filtres avancés** - Recherchez par race, âge, prix, localisation
- ❤️ **Favoris** - Sauvegardez vos annonces préférées
- 📊 **Comparaison** - Comparez plusieurs chiens côte à côte
- 🧮 **Calculateur de coûts** - Estimez le budget annuel pour votre chien
- 🎯 **Quiz de compatibilité** - Trouvez la race idéale pour vous
- 🛡️ **Panneau d'administration** - Gestion complète de la plateforme
- 📱 **Design responsive** - Optimisé pour mobile et desktop
- 🌙 **Mode sombre** - Interface adaptée à vos préférences

## 👑 Super Administrateur

L'utilisateur **TOH JEAN GEORGES GLACIA** (socialassaibo@gmail.com) dispose d'un accès super administrateur avec tous les droits :

- ✅ Gestion des utilisateurs
- ✅ Gestion des annonces
- ✅ Gestion des commandes
- ✅ Statistiques de la plateforme
- ✅ Paramètres système

Pour accéder au panneau d'administration :
1. Connectez-vous avec l'email : **socialassaibo@gmail.com**
2. Accédez à `/admin` ou cliquez sur le bouton "Admin" dans le header
3. Vous aurez un accès complet à toutes les fonctionnalités d'administration

## 🛠️ Technologies utilisées

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **Composants UI** : shadcn/ui
- **Icônes** : Lucide React
- **Animations** : Framer Motion
- **Stockage** : localStorage

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/VOTRE-USERNAME/dogs-shop.git

# Accéder au dossier
cd dogs-shop

# Installer les dépendances
pnpm install
# ou
npm install --legacy-peer-deps

# Lancer le serveur de développement
pnpm dev
# ou
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
src/
├── app/                    # Pages et routes Next.js
│   ├── admin/             # Page d'administration
│   ├── annonces/          # Liste des annonces
│   ├── calculateur/       # Calculateur de coûts
│   ├── comparaison/       # Comparaison de chiens
│   ├── favoris/           # Annonces favorites
│   ├── mes-annonces/      # Mes annonces publiées
│   ├── quiz/              # Quiz de compatibilité
│   ├── races/             # Guide des races
│   └── sante/             # Conseils santé
├── components/            # Composants React
│   ├── dogs/              # Composants liés aux chiens
│   ├── layout/            # Header, Footer, Navigation
│   ├── payment/           # Système de paiement
│   └── ui/                # Composants shadcn/ui
├── data/                  # Données statiques
├── hooks/                 # Hooks personnalisés
├── lib/                   # Utilitaires et configurations
│   └── constants.ts       # Configuration des super admins
└── types/                 # Types TypeScript
```

## 📝 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Lancer en mode développement |
| `pnpm build` | Construire pour la production |
| `pnpm start` | Lancer en mode production |
| `pnpm lint` | Vérifier le code avec ESLint |

## 🚀 Déploiement

### Netlify

1. Connectez votre dépôt GitHub à Netlify
2. Configurez les paramètres de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `.next`
3. Déployez !

Le fichier `netlify.toml` est déjà configuré pour le déploiement.

## 🔐 Sécurité

- Les super administrateurs sont définis dans `src/lib/constants.ts`
- Impossible de supprimer ou modifier le rôle d'un super administrateur
- Système de permissions granulaires pour les administrateurs

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT © 2024

## 👤 Auteur

Développé avec ❤️

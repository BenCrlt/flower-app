# CLAUDE.md — client (frontend)

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Langage | TypeScript 5.9 |
| Framework UI | React 19 |
| Build tool | Vite 7 |
| Routeur | TanStack Router 1.161 |
| Data fetching | TanStack Query 5 |
| Styles | Tailwind CSS 4 |
| Composants | shadcn/ui (Radix UI) |
| Icônes | Lucide React |
| Formulaires | React Hook Form + Zod |
| Animations | Framer Motion |
| Charts | Recharts |
| Toasts | Sonner |
| Authentification | Better Auth client |

## Structure

```
client/src/
├── main.tsx                 # Entrée React (PWA service worker + QueryClient)
├── App.tsx                  # Root router TanStack + Toaster Sonner
├── index.css                # Styles globaux Tailwind
├── components/              # Composants partagés
│   ├── ui/                  # shadcn/ui primitives
│   ├── AppSidebar/          # Navigation latérale
│   └── Table/               # Composants tableau
├── features/                # Modules fonctionnels
│   ├── budget/              # Gestion budget
│   ├── cash-register/       # Caisse enregistreuse (POS)
│   ├── dashboard/           # Tableau de bord analytique
│   ├── edition/             # Gestion des éditions (EditionContext + EditionProvider)
│   ├── payment/             # Factures et paiements
│   ├── sales/               # Suivi des ventes
│   └── settings/            # Configuration
├── routes/                  # Pages TanStack Router
│   ├── __root.tsx           # Layout racine (garde auth)
│   └── routeTree.gen.ts     # Auto-généré TanStack Router
├── generated/               # Types GraphQL auto-générés (codegen)
├── hooks/
├── lib/
│   ├── auth-client.ts       # Better Auth client
│   └── gqlFetch.ts          # Utilitaire fetch GraphQL typé
└── utils/                   # DateUtils, PriceUtils
```

## Commandes

```bash
pnpm dev              # Serveur de développement Vite
pnpm build            # Build de production (tsc + vite build)
pnpm lint             # ESLint
pnpm lint:fix         # Correction automatique ESLint
pnpm format           # Prettier write
pnpm format:check     # Vérification Prettier
pnpm preview          # Prévisualiser le build de production
pnpm codegen          # Générer les types GraphQL (graphql-codegen)
```

Variable d'environnement (`.env.local`) : `VITE_API_URL="http://localhost:3000"`

## Conventions

### Data fetching
- `gqlFetch()` (`lib/gqlFetch.ts`) : fetch GraphQL typé avec `TypedDocumentNode`
- TanStack Query pour le cache et la synchronisation
- Requêtes `.graphql` dans `features/<module>/gql/`
- Hooks React Query dans `features/<module>/hooks/`
- Types auto-générés par `pnpm codegen` dans `src/generated/` (exclu du lint)

### Structure d'une feature
- `components/` — UI propre à la feature
- `gql/` — fichiers `.graphql` (queries/mutations)
- `hooks/` — hooks React Query wrappant `gqlFetch`
- `utils/` ou `lib/` — logique pure

### Authentification
Garde dans `routes/__root.tsx` — redirige vers `/auth/sign-in` si non connecté.

## Règles de lint (React Compiler + Fast Refresh)

Le lint applique `eslint-plugin-react-hooks` (règles React Compiler) et `react-refresh`. Patterns attendus :

- **Synchroniser un état sur une prop** : ajuster l'état pendant le rendu en mémorisant la valeur précédente (`const [prev, setPrev] = useState(prop); if (prop !== prev) { setPrev(prop); setX(...); }`), ou dériver la valeur avec `useMemo`. Un `setState` synchrone dans un `useEffect` est une erreur de lint.
- **Rendu pur** : les valeurs aléatoires ou impures passent par un initialiseur `useState(() => ...)`.
- **Fichiers de composants** : un `.tsx` qui exporte un composant n'exporte que des composants. Contexte, hooks et constantes partagées vivent dans un fichier `.ts` séparé (ex: `EditionContext.ts` + `EditionProvider.tsx`).
- **Mémoïsation manuelle** : les tableaux de dépendances de `useMemo`/`useCallback` listent exactement les valeurs utilisées ; une fonction utilisée en dépendance est elle-même stable (`useCallback`).
- Les warnings « Compilation Skipped: Use of incompatible library » (React Hook Form `watch`, TanStack Table) sont connus et tolérés.

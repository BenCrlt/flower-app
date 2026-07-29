# CLAUDE.md — flower-app

## Vue d'ensemble

Application de gestion d'événements musicaux (Flower Music Festival) : éditions, budget, caisse enregistreuse, ventes, factures, paiements. Backend GraphQL (Fastify + Mercurius/GQLoom) et frontend React 19 avec TanStack Router.

## Stack technique

### Backend (`server/`)

| Couche | Technologie |
|--------|-------------|
| Langage | TypeScript 5.9 (strict, ESM NodeNext) |
| Framework HTTP | Fastify 5 |
| GraphQL | Mercurius + GQLoom 0.16 |
| Validation | Zod 3 |
| ORM | Drizzle ORM 0.45 |
| Base de données | PostgreSQL 15 (Docker) |
| Authentification | Better Auth 1.5 |
| Stockage fichiers | AWS S3 / Garage (S3-compatible) |
| Runtime dev | tsx (watch mode) |
| Jobs planifiés | node-cron |

### Frontend (`client/`)

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

## Structure du projet

```
flower-app/
├── client/
│   ├── src/
│   │   ├── main.tsx                 # Entrée React (PWA service worker + QueryClient)
│   │   ├── App.tsx                  # Root router TanStack + Toaster Sonner
│   │   ├── index.css                # Styles globaux Tailwind
│   │   ├── components/              # Composants partagés
│   │   │   ├── ui/                  # shadcn/ui primitives
│   │   │   ├── AppSidebar/          # Navigation latérale
│   │   │   ├── Table/               # Composants tableau
│   │   │   ├── add-budget-line-dialog.tsx
│   │   │   ├── add-vendor-dialog.tsx
│   │   │   ├── category-command.tsx
│   │   │   ├── CategoryBadge.tsx
│   │   │   ├── CheckboxFilterSheet.tsx
│   │   │   ├── date-picker.tsx
│   │   │   ├── pin-input.tsx
│   │   │   └── PopoverCommand.tsx
│   │   ├── features/                # Modules fonctionnels
│   │   │   ├── budget/              # Gestion budget
│   │   │   ├── cash-register/       # Caisse enregistreuse (POS)
│   │   │   ├── dashboard/           # Tableau de bord analytique
│   │   │   ├── edition/             # Gestion des éditions
│   │   │   ├── payment/             # Factures et paiements
│   │   │   ├── sales/               # Suivi des ventes
│   │   │   └── settings/            # Configuration
│   │   ├── routes/                  # Pages TanStack Router
│   │   │   ├── __root.tsx           # Layout racine (garde auth)
│   │   │   ├── auth/sign-in.tsx
│   │   │   ├── budget-table.tsx
│   │   │   ├── cash-register.tsx
│   │   │   ├── dashboard.tsx
│   │   │   ├── index.tsx            # Redirect → /dashboard
│   │   │   ├── invoices.tsx
│   │   │   ├── sales.tsx
│   │   │   ├── settings.tsx
│   │   │   └── routeTree.gen.ts     # Auto-généré TanStack Router
│   │   ├── generated/               # Types GraphQL auto-générés (codegen)
│   │   ├── hooks/
│   │   │   └── use-mobile.ts
│   │   ├── lib/
│   │   │   ├── auth-client.ts       # Better Auth client
│   │   │   ├── gqlFetch.ts          # Utilitaire fetch GraphQL typé
│   │   │   ├── invoice-file-api.ts
│   │   │   ├── payment-switch.ts
│   │   │   └── utils.ts
│   │   ├── utils/
│   │   │   ├── DateUtils.ts
│   │   │   └── PriceUtils.ts
│   │   └── assets/                  # Polices, SVGs
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
│   ├── codegen.ts                   # Config GraphQL Code Generator
│   ├── components.json              # Config shadcn/ui
│   ├── .prettierrc
│   ├── .env.local                   # VITE_API_URL
│   ├── Dockerfile
│   └── nginx.conf
└── server/
    ├── src/
    │   ├── server.ts                # Entrée : charge .env, démarre Fastify
    │   ├── index.ts                 # Exporte l'instance db
    │   ├── app.ts                   # Factory Fastify (CORS, plugins)
    │   ├── schema.ts                # Assemblage schéma GraphQL (GQLoom weave)
    │   ├── db/
    │   │   ├── index.ts             # Instance Drizzle ORM
    │   │   └── schema/              # Définitions des tables
    │   │       ├── auth.ts          # users, sessions, accounts, verification
    │   │       ├── editions.ts
    │   │       ├── budget-lines.ts
    │   │       ├── budget-categories.ts
    │   │       ├── sales.ts
    │   │       ├── orders.ts
    │   │       ├── order-origins.ts
    │   │       ├── order-origin-budget-lines.ts
    │   │       ├── payments.ts
    │   │       ├── invoices.ts
    │   │       ├── vendors.ts
    │   │       ├── invoice-files.ts
    │   │       ├── google-drive-config.ts
    │   │       ├── hello-asso-config.ts
    │   │       └── relations.ts
    │   ├── modules/                 # Modules métier
    │   │   ├── budget/              # resolver.ts + utils/
    │   │   ├── editions/            # resolver.ts + utils/
    │   │   ├── payment/             # resolver.ts + utils/
    │   │   ├── sale/                # resolver.ts + utils/
    │   │   ├── helloasso/           # resolver.ts + api/ + utils/
    │   │   ├── google-drive/        # resolver.ts + api/ + utils/
    │   │   ├── graphql/
    │   │   │   └── context.ts       # AppGraphQLContext + helpers
    │   │   ├── type.ts              # paginatedSchema partagé
    │   │   └── utils.ts             # getOffsetFromPagination, getPriceWithTVA
    │   ├── routes/
    │   │   ├── public/              # auth.ts, google-drive-oauth.ts
    │   │   └── private/             # GraphQL, file upload/download
    │   ├── middleware/
    │   │   └── authorization.ts     # Hook Fastify vérification session
    │   ├── jobs/
    │   │   ├── index.ts             # Cron scheduler
    │   │   └── dailySynchroHelloAsso.ts
    │   ├── utils/
    │   │   ├── auth.ts              # Config Better Auth
    │   │   ├── S3Connect.ts         # Config Garage/S3
    │   │   └── upload.ts            # Upload utilitaires
    │   └── playground.ts            # GraphiQL
    ├── drizzle/                     # 27 migrations SQL
    ├── devtools/scripts/            # generate-schema, reset-db, seed
    ├── generated/
    │   └── schema.gql               # Schéma GraphQL généré
    ├── docker-compose.yml           # postgres + garage S3
    ├── drizzle.config.ts
    ├── Dockerfile
    ├── package.json
    ├── tsconfig.json
    └── .env
```

## Commandes essentielles

### Backend (`server/`)

```bash
# Développement
pnpm dev              # Serveur en watch mode (tsx)
pnpm build            # Compilation TypeScript (tsc)
pnpm start            # Lance le build compilé (node dist/server.js)

# Qualité du code
pnpm lint             # ESLint src/
pnpm lint:fix         # Correction automatique ESLint
pnpm format           # Prettier write src/
pnpm format:check     # Vérification Prettier

# Base de données
pnpm mig:gen          # Générer les migrations (drizzle-kit generate)
pnpm mig:run          # Appliquer les migrations (drizzle-kit migrate)
pnpm db:reset         # Réinitialiser DB + migrer + seed
pnpm db:reset:sql     # Supprimer et recréer le schéma uniquement
pnpm seed             # Peupler avec des données de test

# GraphQL
pnpm generate:schema  # Générer generated/schema.gql
```

### Frontend (`client/`)

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

## Environnement local

```bash
# Démarrer PostgreSQL + Garage S3 via Docker
docker compose up -d    # depuis server/

# Variables d'environnement serveur (.env)
DATABASE_URL="postgresql://admin:admin@localhost:5432/flower-app?schema=public"
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=...
AWS_ENDPOINT_URL="http://127.0.0.1:3900"
FLOWER_FILES_BUCKET=...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL="http://localhost:3000"
HELLO_ASSO_CLIENT_ID=...
HELLO_ASSO_CLIENT_SECRET=...
HELLO_ASSO_ORGANIZATION_SLUG=...
SUMUP_AFFILIATE_KEY=...
SUMUP_APP_ID=...
DAILY_SYNCHRO_HELLO_ASSO_CRON="0 12,20 * * *"
FRONTEND_URL="http://localhost:5173"
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_DRIVE_TOKEN_ENCRYPTION_KEY=...
GOOGLE_DRIVE_REDIRECT_URI=...

# Variable d'environnement client (.env.local)
VITE_API_URL="http://localhost:3000"
```

Serveur disponible sur : `http://localhost:3000`
Interface GraphiQL : `http://localhost:3000/graphiql`

## Tables de la base de données

| Table | Description |
|-------|-------------|
| `editions` | Événements (nom, startDate, endDate, active, openingBalance) |
| `budget_lines` | Lignes budgétaires (income/expense, estimatedQuantity, estimatedUnitPrice) |
| `budget_categories` | Catégories de lignes budgétaires (name, color) |
| `orders` | Transactions (editionId, authorId, originId, paymentMethod, helloAssoOrderId) |
| `order_origins` | Canaux de vente (name, isPhysical) |
| `order_origin_budget_lines` | Table de jonction origine ↔ ligne budgétaire |
| `sales` | Ventes individuelles (quantity, unitPrice, budgetLineId, orderId) |
| `payments` | Paiements sur factures (quantity, unitPrice, invoiceId, editionId) |
| `invoices` | Factures fournisseurs (name, totalAmount, status, vendorId, editionId) |
| `invoice_files` | Pièces jointes Google Drive liées aux factures |
| `vendors` | Fournisseurs (name, email, phoneNumber, address) |
| `users` | Comptes utilisateurs Better Auth (role, username) |
| `sessions` | Sessions actives Better Auth |
| `accounts` | Comptes OAuth Better Auth |
| `verification` | Codes de vérification Better Auth |
| `google_drive_config` | Connexion OAuth Drive par édition |
| `hello_asso_config` | Config API Hello Asso par édition |

### Google Drive (factures)

Variables serveur : `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_DRIVE_REDIRECT_URI`, `GOOGLE_DRIVE_TOKEN_ENCRYPTION_KEY`.

Console Google Cloud : activer l'API Drive, créer des identifiants OAuth « Application Web », URI de redirection = `GOOGLE_DRIVE_REDIRECT_URI`.

## Conventions et patterns

### Architecture modulaire backend
- Chaque module métier dans `src/modules/<nom>/`
- Structure type : `resolver.ts` + `utils/<action>.ts` + éventuellement `api/`
- Les resolvers délèguent toute logique aux fonctions `utils/`

### GQLoom (GraphQL)
- Schémas inférés depuis TypeScript/Zod via `resolver.of(table)`
- `.input(zodSchema)` pour validation des inputs
- `.load()` pour les champs batch (data loaders, prévention N+1)
- `.resolve(fn)` pour la logique
- Tables Drizzle exposées via `drizzleSilk`
- Contexte GraphQL : `AppGraphQLContext` contenant `authSession` — accédé via `getAppGraphQLContext()`

### Authentification
- Better Auth avec plugins `username` et `admin`
- Côté serveur : hook Fastify `authorization.ts` bloque les routes privées (401 si non connecté)
- Côté client : garde dans `routes/__root.tsx` — redirige vers `/auth/sign-in` si non connecté

### Data fetching frontend
- `gqlFetch()` (`lib/gqlFetch.ts`) : fetch GraphQL typé avec `TypedDocumentNode`
- TanStack Query pour le cache et la synchronisation
- Requêtes `.graphql` dans `features/<module>/gql/`
- Hooks React Query dans `features/<module>/hooks/`
- Types auto-générés par `pnpm codegen` dans `src/generated/`

### Structure des features frontend
- `components/` — UI propre à la feature
- `gql/` — fichiers `.graphql` (queries/mutations)
- `hooks/` — hooks React Query wrappant `gqlFetch`
- `utils/` ou `lib/` — logique pure

### Base de données (Drizzle ORM)
- Types inférés avec `InferSelectModel`
- Enums PostgreSQL pour les valeurs typées (ex: `lineType: "income" | "expense"`)
- Pagination standardisée via `getOffsetFromPagination(page, limit)` dans `modules/utils.ts`
- Cascades sur les clés étrangères pour l'intégrité des données
- Contrainte unique sur `editions.active` (une seule édition active)

### Style de code
- Guillemets doubles, points-virgules, trailing commas
- Largeur de ligne : 80 caractères, indentation : 2 espaces
- ESLint : `@eslint/js` recommended + `typescript-eslint/recommended`
- Prettier pour le formatage

## Intégrations externes

| Service | Usage | Variables |
|---------|-------|-----------|
| Hello Asso | Import produits, sync commandes en ligne, cron quotidien | `HELLO_ASSO_*` |
| Google Drive | Stockage pièces jointes factures (OAuth2) | `GOOGLE_*` |
| SumUp | Paiement POS (affiliation) | `SUMUP_*` |
| Garage (S3) | Stockage fichiers (compatible AWS S3) | `AWS_*`, `FLOWER_FILES_BUCKET` |

## Workflow Git

- Branche principale : `master`
- Branches de développement : `claude/<nom>` (ex: `claude/crazy-joliot`)

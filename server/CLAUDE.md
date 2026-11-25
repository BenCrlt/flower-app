# CLAUDE.md — server (backend)

## Stack technique

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

## Structure

```
server/
├── src/
│   ├── server.ts                # Entrée : charge .env, démarre Fastify
│   ├── app.ts                   # Factory Fastify (CORS, plugins)
│   ├── schema.ts                # Assemblage schéma GraphQL (GQLoom weave)
│   ├── db/
│   │   ├── index.ts             # Instance Drizzle ORM
│   │   └── schema/              # Définitions des tables (+ relations.ts)
│   ├── modules/                 # Modules métier
│   │   ├── budget/ editions/ payment/ sale/   # resolver.ts + utils/
│   │   ├── helloasso/ google-drive/           # resolver.ts + api/ + utils/
│   │   ├── graphql/context.ts   # AppGraphQLContext + helpers
│   │   ├── type.ts              # paginatedSchema partagé
│   │   └── utils.ts             # getOffsetFromPagination, getPriceWithTVA
│   ├── routes/
│   │   ├── public/              # auth.ts, google-drive-oauth.ts
│   │   └── private/             # GraphQL, file upload/download
│   ├── middleware/authorization.ts  # Hook Fastify vérification session
│   ├── jobs/                    # Cron scheduler + dailySynchroHelloAsso
│   ├── utils/                   # auth.ts (Better Auth), S3Connect.ts, upload.ts
│   └── playground.ts            # GraphiQL
├── drizzle/                     # Migrations SQL
├── devtools/scripts/            # generate-schema, reset-db, seed
├── generated/schema.gql         # Schéma GraphQL généré
└── docker-compose.yml           # postgres + garage S3
```

## Commandes

```bash
# Développement
pnpm dev              # Serveur en watch mode (tsx)
pnpm build            # Compilation TypeScript (tsc) — sert aussi de typecheck
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

## Environnement local

```bash
docker compose up -d    # PostgreSQL + Garage S3

# Variables d'environnement (.env)
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
```

Serveur : `http://localhost:3000` — GraphiQL : `http://localhost:3000/graphiql`

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

## Conventions

### Architecture modulaire
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
- Hook Fastify `authorization.ts` bloque les routes privées (401 si non connecté)

### Base de données (Drizzle ORM)
- Types inférés avec `InferSelectModel`
- Enums PostgreSQL pour les valeurs typées (ex: `lineType: "income" | "expense"`)
- Pagination standardisée via `getOffsetFromPagination(page, limit)` dans `modules/utils.ts`
- Cascades sur les clés étrangères pour l'intégrité des données
- Contrainte unique sur `editions.active` (une seule édition active)

### Erreurs
Une erreur relancée dans un `catch` transporte l'erreur d'origine : `throw new Error("message", { cause: e })` (règle ESLint `preserve-caught-error`).

## Intégrations externes

| Service | Usage | Variables |
|---------|-------|-----------|
| Hello Asso | Import produits, sync commandes en ligne, cron quotidien | `HELLO_ASSO_*` |
| Google Drive | Stockage pièces jointes factures (OAuth2) | `GOOGLE_*` |
| SumUp | Paiement POS (affiliation) | `SUMUP_*` |
| Garage (S3) | Stockage fichiers (compatible AWS S3) | `AWS_*`, `FLOWER_FILES_BUCKET` |

### Google Drive (factures)

Console Google Cloud : activer l'API Drive, créer des identifiants OAuth « Application Web », URI de redirection = `GOOGLE_DRIVE_REDIRECT_URI`.

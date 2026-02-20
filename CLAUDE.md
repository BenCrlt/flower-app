# CLAUDE.md — flower-app

## Vue d'ensemble

Backend GraphQL pour une application de gestion d'événements floraux (éditions, budget, ventes, paiements).

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Langage | TypeScript 5.x (strict, ESM) |
| Framework HTTP | Fastify 5 |
| GraphQL | Mercurius + GQLoom |
| Validation | Zod |
| ORM | Drizzle ORM |
| Base de données | PostgreSQL 14 (Docker) |
| Runtime dev | tsx (watch mode) |

## Structure du projet

```
flower-app/
└── server/
    ├── src/
    │   ├── index.ts          # Point d'entrée (Fastify + Mercurius)
    │   ├── schema.ts         # Assembly du schéma GraphQL
    │   ├── db/
    │   │   ├── index.ts      # Instance Drizzle
    │   │   └── schema/       # Définitions des tables + relations
    │   └── modules/          # Modules métier
    │       ├── budget/       # Budget (lignes, catégories)
    │       ├── editions/     # Éditions/événements
    │       ├── payment/      # Paiements
    │       ├── sale/         # Ventes
    │       ├── type.ts       # Types partagés
    │       └── utils.ts      # Utilitaires (pagination...)
    ├── drizzle/              # Fichiers de migration SQL
    ├── docker-compose.yml
    ├── drizzle.config.ts
    └── .env
```

## Commandes essentielles

```bash
# Développement
pnpm dev             # Serveur en watch mode (tsx)

# Qualité du code
pnpm lint            # ESLint
pnpm lint:fix        # Correction automatique ESLint
pnpm format          # Prettier
pnpm format:check    # Vérification Prettier

# Base de données
pnpm mig:gen         # Générer les migrations (drizzle-kit generate)
pnpm mig:run         # Appliquer les migrations (drizzle-kit migrate)
```

## Environnement local

```bash
# Lancer PostgreSQL via Docker
docker compose up -d

# Variable d'environnement requise (.env)
DATABASE_URL="postgresql://admin:admin@localhost:5432/flower-app?schema=public"
```

Serveur disponible sur : `http://localhost:3000`
Interface GraphiQL : `http://localhost:3000/graphiql`

## Conventions et patterns

### Architecture modulaire
- Chaque module métier a son propre dossier dans `src/modules/`
- Structure type d'un module : `resolver.ts` + sous-dossier `utils/`
- Les resolvers utilisent GQLoom (`resolver`, `query`, `mutation`, `field`)

### GraphQL avec GQLoom
- Les schémas sont générés à partir des types TypeScript et Zod
- Les tables Drizzle sont exposées via `drizzleSilk`
- Validation des inputs via schemas Zod dans les mutations/queries

### Base de données (Drizzle ORM)
- Les types sont inférés avec `InferSelectModel`
- Les enums PostgreSQL sont utilisés pour les valeurs typées (ex: `lineType: "income" | "expense"`)
- Pagination standardisée via `modules/utils.ts` (page/limit → offset)

### Style de code
- Guillemets doubles, points-virgules, trailing commas
- Largeur de ligne : 80 caractères, indentation : 2 espaces
- ESLint : `js/recommended` + `typescript-eslint/recommended`

## Tables de la base de données

| Table | Description |
|-------|-------------|
| `editions` | Événements/éditions (nom, date de début) |
| `budget_lines` | Lignes budgétaires (income/expense) |
| `budget_categories` | Catégories de lignes budgétaires |
| `products` | Produits |
| `sales` | Ventes |
| `payments` | Paiements |
| `receipts` | Reçus |
| `users` | Utilisateurs |
| `vendors` | Fournisseurs |

## Workflow Git

- Branche principale : `master`
- Branches de développement : `claude/<nom>` (ex: `claude/crazy-joliot`)

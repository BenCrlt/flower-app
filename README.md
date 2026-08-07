# 🌸 Flower Music Festival — Flower App

Application de gestion pour un événement musical associatif : éditions, budget prévisionnel et réel, caisse enregistreuse (point de vente), suivi des ventes, factures fournisseurs, paiements et tableau de bord analytique.

Pensée pour une équipe bénévole qui organise un festival d'une édition à l'autre : on prépare le budget, on encaisse les ventes le jour J (bar, restauration, boutique, billetterie), on suit les factures fournisseurs et leurs paiements, et on visualise la santé financière de l'événement en temps réel.

## Fonctionnalités

- **Éditions** — une édition active à la fois, avec solde d'ouverture, dates et historique des éditions précédentes.
- **Budget** — lignes de recettes/dépenses par catégorie, montants estimés vs réalisés, produits à prix libre.
- **Caisse enregistreuse** — interface de vente tactile par origine (bar, restauration, boutique, billetterie…), paiement espèces/CB.
- **Ventes** — historique des commandes et des ventes, ventilé par origine et par ligne budgétaire.
- **Factures & paiements** — suivi des factures fournisseurs (en attente / payée / annulée) avec pièces jointes stockées sur Google Drive.
- **Tableau de bord** — vue d'ensemble des recettes, dépenses et solde de l'édition en cours.
- **Intégrations** — synchronisation des ventes en ligne via Hello Asso, paiement carte via SumUp.

## Stack technique

| Couche | Technologie |
| --- | --- |
| Backend | TypeScript, Fastify 5, Mercurius (GraphQL), GQLoom, Drizzle ORM, PostgreSQL |
| Frontend | React 19, Vite 7, TanStack Router/Query, Tailwind CSS 4, shadcn/ui |
| Auth | Better Auth |
| Fichiers | S3 / Garage, Google Drive |

Détails complets (structure du repo, conventions, modules) : voir [CLAUDE.md](./CLAUDE.md).

## Prérequis

- **Node.js** 20+
- **pnpm** (gestionnaire de paquets)
- **Docker** et **Docker Compose** (pour PostgreSQL et optionnellement Garage/S3)

## Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd flower-app
```

### 2. Installer les dépendances

Le projet est en monorepo sans `package.json` à la racine : installez le **client** et le **server** séparément.

```bash
# Backend
cd server && pnpm install && cd ..

# Frontend
cd client && pnpm install && cd ..
```

### 3. Base de données (PostgreSQL)

Démarrez PostgreSQL avec Docker Compose depuis le dossier `server` :

```bash
cd server
docker compose up -d db
```

Cela lance un conteneur PostgreSQL (port 5432) avec la base `flower-app` et l'utilisateur `admin` / mot de passe `admin`.

### 4. Variables d'environnement (backend)

Créez un fichier `server/.env` avec au minimum :

```env
DATABASE_URL="postgresql://admin:admin@localhost:5432/flower-app?schema=public"
BETTER_AUTH_SECRET=<une-valeur-aleatoire>
BETTER_AUTH_URL="http://localhost:3000"
FRONTEND_URL="http://localhost:5173"
```

Pour le stockage de fichiers (optionnel, avec Garage en local), vous pouvez ajouter :

```env
AWS_DEFAULT_REGION=garage
AWS_ENDPOINT_URL=http://localhost:3900
AWS_ACCESS_KEY_ID=<votre-clé>
AWS_SECRET_ACCESS_KEY=<votre-secret>
FLOWER_FILES_BUCKET=<nom-du-bucket>
```

Sans ces variables S3, l'app fonctionne ; les fonctionnalités liées aux fichiers peuvent être limitées. La liste complète des variables (Hello Asso, Google Drive, SumUp…) est documentée dans [CLAUDE.md](./CLAUDE.md#environnement-local).

Créez également `client/.env.local` :

```env
VITE_API_URL="http://localhost:3000"
```

### 5. Migrations

Appliquez les migrations Drizzle depuis `server` :

```bash
cd server
pnpm mig:run
```

### 6. Données de démonstration

Deux options pour peupler la base, depuis `server` :

```bash
# Jeu de données minimal : un compte admin + une édition vide
pnpm seed

# Jeu de données complet pour démonstration : un compte admin + plusieurs
# éditions (passées, en cours, à venir) avec budget, ventes, factures et
# paiements — de quoi montrer le produit dans sa globalité
pnpm seed:demo
```

`pnpm seed:demo` crée notamment :

- 3 éditions (`FMF 2024`, `FMF 2025`, `FMF 2026` active)
- des catégories et lignes de budget (recettes et dépenses) par édition
- des origines de vente (bar, restauration, boutique, billetterie, Hello Asso)
- des commandes et ventes réparties sur les éditions passées et l'édition en cours
- des fournisseurs, factures (payées / en attente / annulées) et paiements associés

Le script est **idempotent** : il ne touche que les éditions qu'il gère (par nom) et peut être relancé sans dupliquer les données. Compte de connexion créé : `admin` / `123456`.

## Lancer l'application

Il faut lancer **deux processus** : le serveur API puis le client.

### Terminal 1 — Backend (GraphQL)

```bash
cd server
pnpm dev
```

- API : **http://localhost:3000**
- GraphiQL : **http://localhost:3000/graphiql**

### Terminal 2 — Frontend (React)

```bash
cd client
pnpm dev
```

- Interface : **http://localhost:5173** (ou le port indiqué par Vite)

Le client est configuré pour appeler l'API sur `http://localhost:3000` (GraphQL et auth).

## Commandes utiles

| Contexte  | Commande         | Description                              |
| --------- | ---------------- | ----------------------------------------- |
| `server/` | `pnpm dev`       | Serveur en mode watch                     |
| `server/` | `pnpm mig:gen`   | Générer les migrations                    |
| `server/` | `pnpm mig:run`   | Appliquer les migrations                  |
| `server/` | `pnpm seed`      | Jeu de données minimal (admin + 1 édition) |
| `server/` | `pnpm seed:demo` | Jeu de données complet de démonstration   |
| `server/` | `pnpm db:reset`  | Réinitialiser la base, migrer et seed     |
| `server/` | `pnpm lint`      | Linter ESLint                             |
| `server/` | `pnpm format`    | Formater avec Prettier                    |
| `client/` | `pnpm dev`       | Dev Vite                                  |
| `client/` | `pnpm build`     | Build de production                       |
| `client/` | `pnpm codegen`   | Régénérer les types GraphQL               |

## Structure du projet

```
flower-app/
├── client/   # Frontend React (TanStack Router/Query, Tailwind, shadcn/ui)
└── server/   # Backend GraphQL (Fastify, Mercurius, GQLoom, Drizzle ORM)
```

Structure détaillée, conventions de code et workflow Git : voir [CLAUDE.md](./CLAUDE.md).

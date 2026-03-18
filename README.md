# flower-app

Application de gestion d’événements floraux (éditions, budget, ventes, paiements) avec un backend GraphQL (Mercurius x Fastify x GQLoom) et un frontend React.

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

Cela lance un conteneur PostgreSQL (port 5432) avec la base `flower-app` et l’utilisateur `admin` / mot de passe `admin`.

### 4. Variables d’environnement (backend)

Créez un fichier `server/.env` avec au minimum :

```env
DATABASE_URL="postgresql://admin:admin@localhost:5432/flower-app?schema=public"
```

Pour le stockage de fichiers (optionnel, avec Garage en local), vous pouvez ajouter :

```env
AWS_DEFAULT_REGION=garage
AWS_ENDPOINT_URL=http://localhost:3900
AWS_ACCESS_KEY_ID=<votre-clé>
AWS_SECRET_ACCESS_KEY=<votre-secret>
FLOWER_FILES_BUCKET=<nom-du-bucket>
```

Sans ces variables S3, l’app fonctionne ; les fonctionnalités liées aux fichiers peuvent être limitées.

### 5. Migrations

Appliquez les migrations Drizzle depuis `server` :

```bash
cd server
pnpm mig:run
```

### 6. (Optionnel) Données de démo

Pour peupler la base avec des données de test :

```bash
cd server
pnpm seed
```

Pour ajouter un utilisateur admin :

```bash
pnpm add-admin
```

## Lancer l’application

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

Le client est configuré pour appeler l’API sur `http://localhost:3000` (GraphQL et auth).

## Commandes utiles

| Contexte  | Commande       | Description                 |
| --------- | -------------- | --------------------------- |
| `server/` | `pnpm dev`     | Serveur en mode watch       |
| `server/` | `pnpm mig:gen` | Générer les migrations      |
| `server/` | `pnpm mig:run` | Appliquer les migrations    |
| `server/` | `pnpm lint`    | Linter ESLint               |
| `server/` | `pnpm format`  | Formater avec Prettier      |
| `client/` | `pnpm dev`     | Dev Vite                    |
| `client/` | `pnpm build`   | Build de production         |
| `client/` | `pnpm codegen` | Régénérer les types GraphQL |

## Stack

- **Backend** : TypeScript, Fastify 5, Mercurius (GraphQL), GQLoom, Drizzle ORM, PostgreSQL
- **Frontend** : React 19, Vite 7, Tailwind CSS 4, shadcn/ui, TanStack Query/Router

Pour plus de détails (structure, conventions, workflow Git), voir [CLAUDE.md](./CLAUDE.md).

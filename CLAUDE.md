# CLAUDE.md — flower-app

## Vue d'ensemble

Application de gestion d'événements musicaux (Flower Music Festival) : éditions, budget, caisse enregistreuse, ventes, factures, paiements. Backend GraphQL (Fastify + Mercurius/GQLoom) et frontend React 19 avec TanStack Router.

Monorepo à deux sous-projets indépendants (chacun son `package.json` et son `pnpm-lock.yaml`) :

- `client/` — frontend React. Conventions détaillées : `client/CLAUDE.md`.
- `server/` — backend GraphQL + PostgreSQL. Conventions détaillées : `server/CLAUDE.md`.

## Définition de « terminé »

Une tâche est terminée quand, **dans chaque sous-projet modifié** (`client/` et/ou `server/`) :

```bash
pnpm lint    # 0 erreur (les warnings sont tolérés)
pnpm build   # compile sans erreur
```

Ce sont exactement les checks de la CI (`.github/workflows/ci.yml`) : une erreur locale = une PR rouge. Corriger la cause dans le code ; un `eslint-disable` n'est acceptable qu'avec un commentaire qui justifie l'exception.

## CI (GitHub Actions)

- `.github/workflows/ci.yml` : jobs `lint` et `build` séparés par sous-projet, déclenchés uniquement si `client/**` ou `server/**` change (filtre `dorny/paths-filter`).
- `.github/actions/setup/` : action composite partagée (pnpm + Node 24 + cache + install).
- `CI OK` est le seul check requis sur `master` : tout nouveau job doit être ajouté à ses `needs`.
- `build-push-client.yml` / `build-push-server.yml` : build et push des images Docker sur GHCR (déclenchement manuel).

## Style de code

- Guillemets doubles, points-virgules, trailing commas
- Largeur de ligne : 80 caractères, indentation : 2 espaces
- ESLint : `@eslint/js` recommended + `typescript-eslint/recommended`
- Prettier pour le formatage (`pnpm format` dans le sous-projet)

## Workflow Git

- Branche principale : `master`
- Branches de développement : `claude/<nom>` (ex: `claude/crazy-joliot`)

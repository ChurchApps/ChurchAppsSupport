---
title: "Applications web"
---

# Applications web

<div class="article-intro">

ChurchApps inclut trois applications web, chacune servant un public et un objectif différent. Elles partagent une fondation technologique commune de React 19, TypeScript et Material-UI 7, mais diffèrent dans leurs outils de build et leurs cibles de déploiement.

</div>

## Applications en un coup d'œil

| Application | Objectif | Framework | Port de développement |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Tableau de bord d'administration d'église | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Application publique des membres de l'église | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Gestion du contenu des leçons | Next.js 16 + React 19 | 3501 |

## Pile technologique partagée

Toutes les trois applications web sont construites avec :

- **TypeScript** -- Sécurité de type end-to-end
- **React 19** -- Bibliothèque de composants UI
- **Material-UI 7** -- Système de design et boîte à outils de composants
- **React Query 5** -- Gestion d'état du serveur

## Composants partagés

Les applications partagent les composants UI et les utilitaires via la famille de paquets `@churchapps/apphelper*` :

| Paquet | Objectif |
|---------|---------|
| `@churchapps/apphelper` | Composants React partagés core |
| `@churchapps/apphelper-login` | Composants UI d'authentification |
| `@churchapps/apphelper-donations` | Formulaires de donation et de donation |
| `@churchapps/apphelper-forms` | Composants du générateur de formulaires |
| `@churchapps/apphelper-markdown` | Rendu Markdown |
| `@churchapps/apphelper-website` | Composants de site web/CMS |

:::tip
Pour les détails sur le développement local de ces paquets partagés, voir la documentation [AppHelper](../shared-libraries/app-helper).
:::

## Script postinstall

Chaque application web a un script `postinstall` qui copie les fichiers de locale et les actifs CSS de `@churchapps/apphelper` dans le projet. Cela s'exécute automatiquement après `npm install`.

:::info
Si les composants semblent non stylisés après l'installation des dépendances, le script `postinstall` peut ne pas s'être exécuté correctement. Vous pouvez le déclencher manuellement avec `npm run postinstall`.
:::

## Outils de build

Les applications utilisent deux outils de build différents :

- **B1Admin** utilise **Vite** -- un bundler rapide et moderne idéal pour les applications monopage
- **B1App** et **LessonsApp** utilisent **Next.js** -- fournissant le rendu côté serveur, le routage basé sur les fichiers et les builds de production optimisés

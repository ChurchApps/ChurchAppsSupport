---
title: "Configuration"
---

# Configuration

<div class="article-intro">

Cette section vous guide à travers la configuration d'un environnement de développement local pour les projets ChurchApps. Vous pouvez soit pointer votre frontend vers les APIs de staging partagées pour un développement rapide, ou exécuter la pile complète localement pour le travail backend.

</div>

## Deux approches

Il y a deux façons de développer localement, selon la quantité de pile dont vous avez besoin :

### 1. Pointer vers les APIs de staging (le plus facile)

Si vous travaillez sur un **projet frontend** (application web, application mobile ou application de bureau), le chemin le plus rapide est de pointer votre application locale vers les APIs de staging partagées. Aucune configuration de base de données ou de backend requise.

L'URL de base de l'API de staging est :

```
https://api.staging.churchapps.org
```

Chaque module API est disponible à un chemin sous cette base, par exemple :

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
Cette approche vous permet de commencer à faire des changements frontend en minutes. C'est le chemin recommandé pour la plupart des contributeurs.
:::

### 2. Exécuter tout localement

Si vous avez besoin de modifier le code de l'API ou de travailler hors ligne, vous pouvez exécuter la pile complète localement. Cela nécessite MySQL 8.0+ et une configuration supplémentaire. Voir le guide [Configuration locale de l'API](../api/local-setup) pour les instructions détaillées.

## Pour commencer

Suivez ces pages dans l'ordre :

1. **[Prérequis](prerequisites)** -- Installer les outils requis (Node.js, Git, MySQL, etc.)
2. **[Aperçu du projet](project-overview)** -- Comprendre quels projets existent et ce qu'ils font
3. **[Variables d'environnement](environment-variables)** -- Configurer vos fichiers `.env` pour tout connecter

:::info
Chaque projet ChurchApps est un référentiel Git indépendant. Vous devez uniquement cloner les projets spécifiques sur lesquels vous voulez travailler.
:::

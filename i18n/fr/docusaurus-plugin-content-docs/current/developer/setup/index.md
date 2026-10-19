---
title: "Installation"
---

# Installation

<div class="article-intro">

Cette section vous guide dans la mise en place d'un environnement de développement local pour les projets ChurchApps. Vous pouvez soit pointer votre frontend vers les API de démonstration partagées pour un développement rapide, soit faire tourner la pile complète en local pour le travail sur le backend.

</div>

## Deux approches

Il existe deux façons de développer en local, selon la partie de la pile dont vous avez besoin :

### 1. Pointer vers les API de démonstration (le plus simple)

Si vous travaillez sur un **projet frontend** (application web, application mobile ou application de bureau), le plus rapide est de pointer votre application locale vers les API de démonstration partagées. Aucune base de données ni aucune configuration backend n'est nécessaire.

L'URL de base de l'API de démonstration est :

```
https://api.demo.churchapps.org
```

Chaque module de l'API est accessible sous un chemin de cette base, par exemple :

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

L'environnement de démonstration exécute le dernier code de `main`, et ses données d'exemple sont régénérées chaque nuit : ne vous attendez donc pas à ce que ce que vous y créez soit conservé. (L'ancien environnement de préproduction, `api.staging.churchapps.org`, a été retiré. Certains fichiers `.env` d'exemple peuvent encore mentionner les URL de préproduction : remplacez-les par les URL de démonstration ou locales.)

:::tip
Cette approche vous permet de commencer à modifier le frontend en quelques minutes. C'est la voie recommandée pour la plupart des contributeurs.
:::

### 2. Tout exécuter en local

Si vous devez modifier le code de l'API ou travailler hors ligne, vous pouvez faire tourner la pile complète en local. Cela nécessite MySQL 8.0+ et une configuration supplémentaire. Voir le guide [installation locale de l'API](../api/local-setup) pour des instructions détaillées.

## Pour commencer

Suivez ces pages dans l'ordre :

1. **[Prérequis](prerequisites)** -- Installer les outils nécessaires (Node.js, Git, MySQL, etc.)
2. **[Vue d'ensemble du projet](project-overview)** -- Comprendre quels projets existent et ce qu'ils font
3. **[Variables d'environnement](environment-variables)** -- Configurer vos fichiers `.env` pour tout relier entre eux

:::info
Chaque projet ChurchApps est un dépôt Git indépendant. Vous n'avez besoin de cloner que le ou les projets sur lesquels vous souhaitez travailler.
:::

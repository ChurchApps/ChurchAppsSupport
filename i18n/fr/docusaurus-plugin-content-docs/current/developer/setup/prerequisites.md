---
title: "Prérequis"
---

# Prérequis

<div class="article-intro">

Les outils dont vous avez besoin dépendent des projets sur lesquels vous envisagez de travailler. Cette page répertorie tous les logiciels requis organisés par domaine de développement, des exigences universelles aux chaînes d'outils spécifiques à la plateforme.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Consulter l'[Aperçu du projet](./project-overview) pour déterminer sur quels projets vous voulez travailler
- Avoir accès administrateur sur votre machine de développement pour installer des logiciels

</div>

## Tous les projets

Ceux-ci sont requis indépendamment du projet sur lequel vous travaillez :

| Outil | Version | Notes |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ requise pour B1App et LessonsApp (Next.js 16) |
| **npm** | Inclus avec Node.js | Utilisé comme gestionnaire de paquets sur tous les projets |
| **Git** | Dernière version | Chaque projet est un référentiel séparé |

:::tip
Utiliser un gestionnaire de version Node comme [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) pour basculer facilement entre les versions de Node.
:::

## Développement de l'API backend

Si vous envisagez d'exécuter l'API localement (plutôt que de pointer vers staging) :

| Outil | Version | Notes |
|------|---------|-------|
| **MySQL** | 8.0+ | Chaque module API utilise sa propre base de données |

Vous aurez besoin de six bases de données pour l'API core : `membership`, `attendance`, `content`, `giving`, `messaging` et `doing`. L'API inclut des scripts pour initialiser le schéma -- voir le guide de [Configuration locale de l'API](../api/local-setup).

## Développement d'applications mobiles

Pour B1Mobile, B1Checkin, LessonsScreen ou d'autres applications React Native / Expo :

| Outil | Version | Notes |
|------|---------|-------|
| **Expo CLI** | Dernière version | Installer globalement : `npm install -g expo-cli` |
| **Android Studio** | Dernière version | Requis pour le développement Android (inclut Android SDK) |
| **Xcode** | Dernière version | Requis pour le développement iOS (macOS uniquement) |

:::info
Vous pouvez utiliser l'application Expo Go sur un appareil physique pour des tests rapides sans Android Studio ou Xcode. Cependant, la construction des binaires de production nécessite les chaînes d'outils natives.
:::

## Développement de FreeShow (application de bureau)

FreeShow a des dépendances de build natives supplémentaires car il compile des modules Node natifs (comme `canvas`) :

### Toutes les plateformes

| Outil | Version | Notes |
|------|---------|-------|
| **Python** | 3.12 | Requis par `node-gyp` pour la compilation du module natif |
| **setuptools** | Dernière version | Installer via `pip install setuptools` |

### Windows

| Outil | Notes |
|------|-------|
| **Visual Studio** | L'édition Community est suffisante |
| **Charge de travail "Desktop development with C++"** | Sélectionner lors de l'installation de Visual Studio |
| **Windows 10 SDK** | Inclus dans la charge de travail C++ ; s'assurer qu'il est coché |

Vous pouvez installer les outils de build Visual Studio via la ligne de commande :

```bash
npm install --global windows-build-tools
```

Ou installer Visual Studio Community et sélectionner la charge de travail "Desktop development with C++" lors de l'installation.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Les outils en ligne de commande Xcode sont généralement suffisants :

```bash
xcode-select --install
```

## Vérifier votre installation

Exécutez ces commandes pour confirmer que tout est installé :

```bash
node --version    # Doit afficher v20.x.x ou supérieur
npm --version     # Doit afficher 10.x.x ou supérieur
git --version     # Doit afficher git version 2.x.x
mysql --version   # Seulement requis pour le développement local de l'API
```

## Étapes suivantes

- **[Aperçu du projet](./project-overview)** -- Voir tous les projets et ce qu'ils font
- **[Variables d'environnement](./environment-variables)** -- Configurer vos fichiers `.env`

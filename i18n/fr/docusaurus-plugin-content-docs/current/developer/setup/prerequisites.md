---
title: "Prérequis"
description: "Installez Node.js, npm, Git et les chaînes d'outils de votre plateforme avant de travailler localement sur les projets ChurchApps comme B1 Admin, Lessons.church, FreePlay ou l'API."
---

# Prérequis

<div class="article-intro">

Les outils dont vous avez besoin dépendent des projets sur lesquels vous comptez travailler. Cette page répertorie l'ensemble des logiciels requis, organisés par domaine de développement, depuis les exigences communes à tous les projets jusqu'aux chaînes d'outils propres à chaque plateforme.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Consultez la [Présentation des projets](./project-overview.md) pour déterminer les projets sur lesquels vous souhaitez travailler
- Assurez-vous de disposer des droits d'administrateur sur votre ordinateur de développement pour installer les logiciels

</div>

## Tous les projets

Ces outils sont requis quel que soit le projet sur lequel vous travaillez :

| Outil | Version | Remarques |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ requise pour B1App et LessonsApp (Next.js 16) ; 24+ requise pour l'API |
| **npm** | Fourni avec Node.js | Utilisé comme gestionnaire de paquets pour tous les projets |
| **Git** | Dernière version | Chaque projet est un dépôt distinct |

:::tip
Utilisez un gestionnaire de versions de Node comme [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) pour changer facilement de version de Node.
:::

## Développement de l'API backend

Si vous prévoyez d'exécuter l'API localement (plutôt que de pointer vers les API de démonstration) :

| Outil | Version | Remarques |
|------|---------|-------|
| **MySQL** | 8.0+ | Chaque module de l'API utilise sa propre base de données |

Six bases de données sont nécessaires pour l'API principale : `membership`, `attendance`, `content`, `giving`, `messaging` et `doing`. L'API inclut des scripts d'initialisation du schéma -- consultez le guide [Configuration locale de l'API](../api/local-setup.md).

## Développement de l'application mobile

Pour B1Checkin, LessonsScreen ou d'autres applications React Native / Expo :

| Outil | Version | Remarques |
|------|---------|-------|
| **Expo CLI** | Dernière version | Installation globale : `npm install -g expo-cli` |
| **Android Studio** | Dernière version | Requis pour le développement Android (inclut le SDK Android) |
| **Xcode** | Dernière version | Requis pour le développement iOS (macOS uniquement) |

:::info
Vous pouvez utiliser l'application Expo Go sur un appareil physique pour des tests rapides sans Android Studio ni Xcode. Cependant, la création de binaires de production nécessite les chaînes d'outils natives.
:::

## Développement de FreeShow (application de bureau)

FreeShow nécessite des dépendances de compilation natives supplémentaires, car il compile des modules Node natifs (comme `canvas`) :

### Toutes les plateformes

| Outil | Version | Remarques |
|------|---------|-------|
| **Python** | 3.12 | Requis par `node-gyp` pour la compilation des modules natifs |
| **setuptools** | Dernière version | Installation via `pip install setuptools` |

### Windows

| Outil | Remarques |
|------|-------|
| **Visual Studio** | L'édition Community suffit |
| **Charge de travail « Développement desktop en C++ »** | À sélectionner pendant l'installation de Visual Studio |
| **Windows 10 SDK** | Inclus dans la charge de travail C++ ; vérifiez qu'il est coché |

Vous pouvez installer les outils de compilation Visual Studio en ligne de commande :

```bash
npm install --global windows-build-tools
```

Ou installez Visual Studio Community et sélectionnez la charge de travail « Développement desktop en C++ » pendant l'installation.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Les outils de ligne de commande Xcode suffisent généralement :

```bash
xcode-select --install
```

## Vérifier votre installation

Exécutez ces commandes pour confirmer que tout est bien installé :

```bash
node --version    # Devrait afficher v20.x.x ou supérieur
npm --version     # Devrait afficher 10.x.x ou supérieur
git --version     # Devrait afficher git version 2.x.x
mysql --version   # Nécessaire uniquement pour le développement local de l'API
```

## Étapes suivantes

- **[Présentation des projets](./project-overview.md)** -- Découvrez tous les projets et leurs fonctions
- **[Variables d'environnement](./environment-variables.md)** -- Configurez vos fichiers `.env`

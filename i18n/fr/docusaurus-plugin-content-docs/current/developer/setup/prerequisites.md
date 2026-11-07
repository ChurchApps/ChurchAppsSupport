---
title: "Prérequis"
description: "Installer Node.js, npm, Git et les outils de votre plateforme avant de travailler sur les projets ChurchApps (B1 Admin, Lessons.church, FreePlay, API)."
---

# Prérequis

<div class="article-intro">

Les outils dont vous avez besoin dépendent des projets sur lesquels vous comptez travailler. Cette page énumère tous les logiciels requis, organisés par domaine de développement, des exigences communes aux chaînes d'outils propres à chaque plateforme.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Consultez l'[aperçu des projets](./project-overview.md) pour déterminer sur quels projets vous voulez travailler
- Ayez les droits d'administrateur sur votre poste de développement pour installer les logiciels

</div>

## Tous les projets

Ces éléments sont requis quel que soit le projet sur lequel vous travaillez :

| Outil | Version | Remarques |
|------|---------|-------|
| **Node.js** | 20+ | La version 22+ est requise pour B1App et LessonsApp (Next.js 16) ; la version 24+ est requise pour l'Api |
| **npm** | Fourni avec Node.js | Utilisé comme gestionnaire de paquets dans tous les projets |
| **Git** | Dernière version | Chaque projet est un dépôt distinct |

:::tip
Utilisez un gestionnaire de versions de Node comme [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) pour changer facilement de version de Node.
:::

## Développement de l'API backend

Si vous prévoyez d'exécuter l'API localement (plutôt que de pointer vers les API de démonstration) :

| Outil | Version | Remarques |
|------|---------|-------|
| **MySQL** | 8.0+ | Chaque module de l'API utilise sa propre base de données |

Vous aurez besoin de six bases de données pour l'API principale : `membership`, `attendance`, `content`, `giving`, `messaging` et `doing`. L'API comprend des scripts pour initialiser le schéma — voir le guide de [configuration locale de l'API](../api/local-setup.md).

## Développement d'applications mobiles

Pour B1Mobile, B1Checkin, LessonsScreen ou toute autre application React Native / Expo :

| Outil | Version | Remarques |
|------|---------|-------|
| **Expo CLI** | Dernière version | Installation globale : `npm install -g expo-cli` |
| **Android Studio** | Dernière version | Requis pour le développement Android (inclut le SDK Android) |
| **Xcode** | Dernière version | Requis pour le développement iOS (macOS seulement) |

:::info
Vous pouvez utiliser l'application Expo Go sur un appareil physique pour des tests rapides, sans Android Studio ni Xcode. Cependant, la compilation des binaires de production exige les chaînes d'outils natives.
:::

## Développement de FreeShow (application de bureau)

FreeShow a des dépendances natives de compilation supplémentaires, car il compile des modules Node natifs (comme `canvas`) :

### Toutes les plateformes

| Outil | Version | Remarques |
|------|---------|-------|
| **Python** | 3.12 | Requis par `node-gyp` pour la compilation des modules natifs |
| **setuptools** | Dernière version | À installer via `pip install setuptools` |

### Windows

| Outil | Remarques |
|------|-------|
| **Visual Studio** | L'édition Community suffit |
| **Charge de travail « Développement Desktop en C++ »** | À sélectionner pendant l'installation de Visual Studio |
| **Windows 10 SDK** | Inclus dans la charge de travail C++ ; assurez-vous qu'il est coché |

Vous pouvez installer les outils de compilation Visual Studio en ligne de commande :

```bash
npm install --global windows-build-tools
```

Ou installez Visual Studio Community et sélectionnez la charge de travail « Développement Desktop en C++ » pendant l'installation.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Les outils en ligne de commande de Xcode suffisent généralement :

```bash
xcode-select --install
```

## Vérifier votre installation

Exécutez ces commandes pour confirmer que tout est installé :

```bash
node --version    # Doit afficher v20.x.x ou plus
npm --version     # Doit afficher 10.x.x ou plus
git --version     # Doit afficher git version 2.x.x
mysql --version   # Nécessaire seulement pour le développement local de l'API
```

## Et ensuite

- **[Aperçu des projets](./project-overview.md)** -- Voir tous les projets et leur rôle
- **[Variables d'environnement](./environment-variables.md)** -- Configurer vos fichiers `.env`

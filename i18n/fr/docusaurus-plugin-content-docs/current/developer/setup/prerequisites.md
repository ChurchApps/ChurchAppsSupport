---
title: "Prérequis"
---

# Prérequis

<div class="article-intro">

Les outils nécessaires dépendent des projets sur lesquels vous prévoyez de travailler. Cette page liste tous les logiciels requis, organisés par domaine de développement, des exigences communes aux chaînes d'outils propres à chaque plateforme.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Consultez la [Vue d'ensemble des projets](./project-overview) pour déterminer sur quels projets vous souhaitez travailler
- Disposez des droits d'administrateur sur votre machine de développement pour installer les logiciels

</div>

## Tous les projets

Ils sont requis quel que soit le projet sur lequel vous travaillez :

| Outil | Version | Remarques |
|------|---------|-------|
| **Node.js** | 20+ | Version 22+ requise pour B1App et LessonsApp (Next.js 16) |
| **npm** | Fourni avec Node.js | Utilisé comme gestionnaire de paquets pour tous les projets |
| **Git** | Dernière | Chaque projet est un dépôt distinct |

:::tip
Utilisez un gestionnaire de versions Node comme [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) pour changer facilement de version de Node.
:::

## Développement de l'API backend

Si vous prévoyez d'exécuter l'API en local (plutôt que de pointer vers les API de démonstration) :

| Outil | Version | Remarques |
|------|---------|-------|
| **MySQL** | 8.0+ | Chaque module de l'API utilise sa propre base de données |

Vous aurez besoin de six bases de données pour l'API principale : `membership`, `attendance`, `content`, `giving`, `messaging` et `doing`. L'API inclut des scripts d'initialisation du schéma -- consultez le guide [Configuration locale de l'API](../api/local-setup).

## Développement d'applications mobiles

Pour B1Mobile, B1Checkin, LessonsScreen ou toute autre application React Native / Expo :

| Outil | Version | Remarques |
|------|---------|-------|
| **Expo CLI** | Dernière | Installez globalement : `npm install -g expo-cli` |
| **Android Studio** | Dernière | Requis pour le développement Android (inclut le SDK Android) |
| **Xcode** | Dernière | Requis pour le développement iOS (macOS uniquement) |

:::info
Vous pouvez utiliser l'application Expo Go sur un appareil physique pour des tests rapides, sans Android Studio ni Xcode. Cependant, la création de binaires de production nécessite les chaînes d'outils natives.
:::

## Développement de FreeShow (application de bureau)

FreeShow nécessite des dépendances de compilation natives supplémentaires car il compile des modules Node natifs (comme `canvas`) :

### Toutes les plateformes

| Outil | Version | Remarques |
|------|---------|-------|
| **Python** | 3.12 | Requis par `node-gyp` pour la compilation des modules natifs |
| **setuptools** | Dernière | Installer avec `pip install setuptools` |

### Windows

| Outil | Remarques |
|------|-------|
| **Visual Studio** | L'édition Community suffit |
| **« Développement Desktop en C++ »** | À sélectionner lors de l'installation de Visual Studio |
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

Les Outils en ligne de commande Xcode suffisent généralement :

```bash
xcode-select --install
```

## Vérifier votre installation

Exécutez ces commandes pour vérifier que tout est installé :

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Étapes suivantes

- **[Vue d'ensemble des projets](./project-overview)** -- Voir tous les projets et leur rôle
- **[Variables d'environnement](./environment-variables)** -- Configurer vos fichiers `.env`

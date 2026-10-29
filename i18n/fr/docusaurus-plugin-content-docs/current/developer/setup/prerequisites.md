---
title: "Prérequis"
---

# Prérequis

<div class="article-intro">

Les outils dont vous avez besoin dépendent des projets sur lesquels vous prévoyez travailler. Cette page énumère tous les logiciels requis, organisés par domaine de développement, des exigences universelles aux chaînes d'outils propres à chaque plateforme.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Consultez la [Vue d'ensemble des projets](./project-overview) pour déterminer les projets sur lesquels vous voulez travailler
- Vous devez disposer des droits d'administrateur sur votre poste de développement pour installer des logiciels

</div>

## Tous les projets

Ces éléments sont requis quel que soit le projet sur lequel vous travaillez :

| Outil | Version | Remarques |
|------|---------|-----------|
| **Node.js** | 20+ | Version 22+ requise pour B1App et LessonsApp (Next.js 16) ; 24+ requise pour l'Api |
| **npm** | Fourni avec Node.js | Utilisé comme gestionnaire de paquets dans tous les projets |
| **Git** | Dernière version | Chaque projet est un dépôt distinct |

:::tip
Utilisez un gestionnaire de versions de Node comme [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) pour passer facilement d'une version de Node à l'autre.
:::

## Développement de l'API backend

Si vous prévoyez exécuter l'API localement (plutôt que de pointer vers les API de démonstration) :

| Outil | Version | Remarques |
|------|---------|-----------|
| **MySQL** | 8.0+ | Chaque module de l'API utilise sa propre base de données |

Vous aurez besoin de six bases de données pour l'API principale : `membership`, `attendance`, `content`, `giving`, `messaging` et `doing`. L'API comprend des scripts pour initialiser le schéma -- consultez le guide [Installation locale de l'API](../api/local-setup).

## Développement d'applications mobiles

Pour B1Mobile, B1Checkin, LessonsScreen ou d'autres applications React Native / Expo :

| Outil | Version | Remarques |
|------|---------|-----------|
| **Expo CLI** | Dernière version | À installer globalement : `npm install -g expo-cli` |
| **Android Studio** | Dernière version | Requis pour le développement Android (comprend le SDK Android) |
| **Xcode** | Dernière version | Requis pour le développement iOS (macOS seulement) |

:::info
Vous pouvez utiliser l'application Expo Go sur un appareil physique pour des tests rapides sans Android Studio ni Xcode. Cependant, la compilation des binaires de production exige les chaînes d'outils natives.
:::

## Développement de FreeShow (application de bureau)

FreeShow a des dépendances de compilation natives supplémentaires, car il compile des modules Node natifs (comme `canvas`) :

### Toutes les plateformes

| Outil | Version | Remarques |
|------|---------|-----------|
| **Python** | 3.12 | Requis par `node-gyp` pour la compilation des modules natifs |
| **setuptools** | Dernière version | À installer avec `pip install setuptools` |

### Windows

| Outil | Remarques |
|------|-----------|
| **Visual Studio** | L'édition Community suffit |
| **Charge de travail « Développement desktop en C++ »** | À sélectionner pendant l'installation de Visual Studio |
| **Windows 10 SDK** | Inclus dans la charge de travail C++ ; assurez-vous qu'il est coché |

Vous pouvez installer les outils de compilation de Visual Studio en ligne de commande :

```bash
npm install --global windows-build-tools
```

Ou installez Visual Studio Community et sélectionnez la charge de travail « Développement desktop en C++ » pendant l'installation.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Les outils de ligne de commande de Xcode suffisent généralement :

```bash
xcode-select --install
```

## Vérifier votre installation

Exécutez ces commandes pour confirmer que tout est installé :

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Étapes suivantes

- **[Vue d'ensemble des projets](./project-overview)** -- Voir tous les projets et ce qu'ils font
- **[Variables d'environnement](./environment-variables)** -- Configurer vos fichiers `.env`

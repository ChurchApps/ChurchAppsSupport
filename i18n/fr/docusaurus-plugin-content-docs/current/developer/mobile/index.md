---
title: "Applications mobiles"
description: "Présentation des applications mobiles Expo et React Native de ChurchApps, B1 Checkin et LessonsScreen, ainsi que les étapes de configuration locale de leur chaîne d'outils Expo commune."
---

# Applications mobiles

<div class="article-intro">

Les applications mobiles de ChurchApps sont développées avec **React Native** et **Expo**, et offrent une expérience native sur Android, iOS et Android TV. Toutes les applications mobiles partagent la même chaîne d'outils basée sur Expo : si vous savez en compiler une, vous savez les compiler toutes.

</div>

## Applications

| Application | Objectif | Plateforme |
|-----|---------|----------|
| B1 Checkin | Application de borne pour les postes d'enregistrement | Android, iOS |
| LessonsScreen | Application Android TV pour afficher les leçons dans les salles de classe | Android TV |

:::info
L'application destinée aux membres est la B1 App, c'est-à-dire la section `/mobile` de B1App, que les membres installent comme application web progressive. Il s'agit d'une application web et non d'un projet Expo ; consultez [Applications web](../web-apps/index.md) pour la lancer localement.
:::

### B1 Checkin

Une application de borne conçue spécifiquement pour les postes d'enregistrement des églises. Elle offre une interface simple et adaptée au tactile, permettant aux membres d'enregistrer les enfants et de noter les présences aux cultes et aux événements.

### LessonsScreen

Une application Android TV qui affiche le contenu des leçons dans les salles de classe. Les enseignants peuvent envoyer les diapositives, vidéos et activités de leçon sur un écran de télévision, ce qui facilite la présentation des supports pédagogiques pendant les cours.

## Configuration locale

Toutes les applications mobiles partagent la même chaîne d'outils basée sur Expo et suivent des étapes de configuration similaires. Prenons B1 Checkin comme exemple :

1. Installez **Node.js**, Android Studio (pour l'émulateur Android) et Xcode (pour le simulateur iOS, macOS uniquement) — consultez [Prérequis](../setup/prerequisites.md).
2. Clonez le dépôt et installez les dépendances (B1 Checkin utilise Yarn) :

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Copiez `dotenv.sample.txt` vers `.env` et définissez l'environnement auquel l'application doit se connecter (`dev` pour une API locale) — consultez [Variables d'environnement](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Démarrez le serveur de développement Expo avec `yarn start`, puis exécutez `yarn android` ou `yarn ios` pour lancer l'application sur un émulateur ou un appareil.

Consultez [Déploiement mobile](../deployment/mobile.md) pour les versions de production et les mises à jour over-the-air.

---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Le paquet `@churchapps/apphelper` fournit des composants React partagés et des utilitaires pour toutes les applications web ChurchApps. C'est un seul paquet publié qui expose des modules de fonctionnalités via des points d'entrée de chemin secondaire -- connexion, donations, formulaires, markdown et fonctionnalités de site web/CMS -- aux côtés d'un ensemble central de composants et d'aides partagés.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez **Node.js** et **Git** -- voir [Conditions préalables](../setup/prerequisites)
- Familiarisez-vous avec la configuration de l'espace de travail [Packages](./index.md) et le flux de libération

</div>

## Points d'entrée

Le paquet définit les exportations de chemin secondaire dans sa `package.json`, donc chaque module de fonctionnalité est importable par lui-même :

| Point d'entrée | Contenu |
|-------------|----------|
| `@churchapps/apphelper` | Composants principaux, aides et crochets |
| `@churchapps/apphelper/login` | Interface utilisateur de connexion et d'enregistrement |
| `@churchapps/apphelper/donations` | Composants de donation et de don |
| `@churchapps/apphelper/forms` | Composants de soumission de formulaire |
| `@churchapps/apphelper/markdown` | Éditeurs et moteurs de rendu Markdown et HTML |
| `@churchapps/apphelper/website` | Composants du constructeur de site web et du CMS |

## Qui consomme quoi

Avant de modifier une exportation partagée, vérifiez quelles applications l'importent :

| Zone d'exportation | Ce qu'elle fournit | Consommé par |
|---|---|---|
| Racine -- composants principaux et crochets | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, plus ré-exporté `@churchapps/helpers` utilitaires (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, etc.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Racine -- chrome du site | `SiteHeader` (nav, menu utilisateur, notifications) | B1Admin, B1Transfer, LessonsApp |
| Racine -- éditeurs de contenu admin | `ImageEditor`, `HelpIcon` | B1Admin |
| Racine -- tuyauterie en temps réel | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Racine -- magasins de chat/présence | `ConversationStore`, `PresenceStore` | B1App |
| Racine -- notes et interface utilisateur de messagerie | `Notes` (notes du personnel sur les personnes/tâches) ; `AddNote`, `SubscriptionToggle` (messagerie des membres) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Racine -- Lessons-spécifique | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (partagé) ; `MarkdownPreview`, `HtmlEditor` (édition de contenu admin) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (partagé) ; `FundDonations` (admin uniquement) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (rend `ConversationalForm` quand le `displayMode` du formulaire est `conversational`) | B1Admin, B1App |
| `./website` | Cœur de rendu de page partagé par l'éditeur et le moteur de rendu (`Element` + les moteurs de rendu par type résolus via `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`) ; widgets site-large (`AnnouncementBanner`, `Launcher` + leurs aides `parse*Config`) ; `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` utilisés uniquement par le moteur de rendu public | B1Admin (éditeur), B1App (composants d'éditeur + moteur de rendu) |

B1Transfer et LessonsApp utilisent uniquement les points d'entrée racine et `login` -- les chemins secondaires `donations`, `forms` et `website` sont consommés exclusivement par B1Admin et B1App aujourd'hui.

## Configuration pour le développement local

Ce paquet vit dans l'espace de travail [Packages](https://github.com/ChurchApps/Packages) aux côtés des autres bibliothèques partagées :

1. Clonez l'espace de travail :

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installez les dépendances à la racine de l'espace de travail :

   ```bash
   cd Packages && yarn install
   ```

3. Lancez le terrain de jeu Vite à partir du répertoire du paquet :

   ```bash
   cd apphelper && yarn dev
   ```

   Le serveur de développement du terrain de jeu démarre à `http://localhost:3001`. Copiez `playground/dotenv.sample` en `playground/.env` et remplissez d'abord les valeurs requises.

Pour construire le paquet pour la consommation (compile vers `dist/` et copie les actifs locale/CSS), exécutez `yarn workspace @churchapps/apphelper build` -- ou `yarn build` à la racine pour construire chaque paquet dans l'ordre de dépendance. Pour tester une construction non publiée dans une application consommatrice, utilisez un portail Yarn temporaire -- voir [Développement local par rapport à une application consommatrice](./index.md#local-development-against-a-consuming-app).

:::tip
Le terrain de jeu est le moyen le plus rapide de développer et tester les composants AppHelper. Il recharge à chaud le serveur de développement Vite afin que vous puissiez voir les modifications en temps réel.
:::

## Publication

Les versions passent par des changements : exécutez `yarn changeset` à la racine de l'espace de travail avec chaque modification, puis `yarn publish-all` quand vous êtes prêt à libérer. Voir [Aperçu des bibliothèques partagées](./index.md#releasing-with-changesets) pour le flux complet.

:::warning
Ne supprimez ou renommez jamais une exportation jusqu'à ce que le remplacement soit publié et que chaque consommateur soit migré -- grep tous les dépôts consommateurs avant de fusionner une suppression.
:::

## Articles connexes

- **[Helpers](./helpers)** -- Le paquet d'utilitaires de base utilisé aux côtés d'AppHelper
- **[Applications web](../web-apps/)** -- Les applications web qui consomment ce paquet
- **[Aperçu des bibliothèques partagées](./index.md)** -- Configuration de l'espace de travail, flux de libération et flux de liaison locale

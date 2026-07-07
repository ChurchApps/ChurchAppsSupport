---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Le paquet `@churchapps/apphelper` fournit des composants React partagés et des utilitaires pour toutes les applications web ChurchApps. C'est un seul paquet publié qui expose des modules de fonctionnalités via des points d'entrée de sous-chemin -- connexion, donations, formulaires, markdown et fonctionnalité site web/CMS -- aux côtés d'un ensemble de composants et assistants partagés de base.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Vous familiariser avec la configuration de [l'espace de travail Packages](./index.md) et le flux de publication

</div>

## Points d'entrée

Le paquet définit les exportations de sous-chemins dans son `package.json`, afin que chaque module de fonctionnalité soit importable seul :

| Point d'entrée | Contenu |
|-------------|----------|
| `@churchapps/apphelper` | Composants de base, assistants et hooks |
| `@churchapps/apphelper/login` | UI de connexion et d'enregistrement |
| `@churchapps/apphelper/donations` | Composants de donation et de contribution |
| `@churchapps/apphelper/forms` | Composants de soumission de formulaire |
| `@churchapps/apphelper/markdown` | Éditeurs et rendus Markdown et HTML |
| `@churchapps/apphelper/website` | Composants du créateur de sites web et du CMS |

## Qui consomme quoi

Avant de modifier une exportation partagée, vérifiez quelles applications l'importent :

| Zone d'exportation | Ce qu'elle fournit | Consommé par |
|---|---|---|
| Racine -- composants & hooks de base | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, plus les utilitaires `@churchapps/helpers` réexportés (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, etc.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Racine -- chrome du site | `SiteHeader` (nav, menu utilisateur, notifications) | B1Admin, B1Transfer, LessonsApp |
| Racine -- éditeurs de contenu admin | `ImageEditor`, `HelpIcon` | B1Admin |
| Racine -- tuyauterie en temps réel | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Racine -- magasins de chat/présence | `ConversationStore`, `PresenceStore` | B1App |
| Racine -- notes & UI de messagerie | `Notes` (notes du personnel sur les personnes/tâches) ; `AddNote`, `SubscriptionToggle` (messagerie des membres) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Racine -- spécifique à Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (partagé) ; `MarkdownPreview`, `HtmlEditor` (édition de contenu admin) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (partagé) ; `FundDonations` (admin uniquement) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (rend `ConversationalForm` quand le `displayMode` du formulaire est `conversational`) | B1Admin, B1App |
| `./website` | Core de rendu de page partagé par l'éditeur et le renderer (`Element` + les rendus par type résolus via `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`) ; widgets à l'échelle du site (`AnnouncementBanner`, `Launcher` + leurs aides `parse*Config`) ; `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` utilisés uniquement par le renderer public | B1Admin (éditeur), B1App (composants d'éditeur + renderer) |

B1Transfer et LessonsApp n'utilisent que les points d'entrée racine et `login` -- les sous-chemins `donations`, `forms` et `website` sont consommés exclusivement par B1Admin et B1App aujourd'hui.

## Configuration pour le développement local

Ce paquet vit dans l'espace de travail [Packages](https://github.com/ChurchApps/Packages) à côté des autres bibliothèques partagées :

1. Cloner l'espace de travail :

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installer les dépendances à la racine de l'espace de travail :

   ```bash
   cd Packages && yarn install
   ```

3. Lancer le terrain de jeu Vite depuis le répertoire du paquet :

   ```bash
   cd apphelper && yarn dev
   ```

   Le serveur de développement du terrain de jeu démarre à **http://localhost:3001**. Copier `playground/dotenv.sample` à `playground/.env` et remplir d'abord les valeurs requises.

Pour construire le paquet pour la consommation (compile vers `dist/` et copie les actifs locale/CSS), exécutez `yarn workspace @churchapps/apphelper build` -- ou `yarn build` à la racine pour construire tous les paquets dans l'ordre des dépendances. Pour tester une construction non publiée dans une application consommatrice, utilisez un portail Yarn temporaire -- voir [Développement local contre une application consommatrice](./index.md#local-development-against-a-consuming-app).

:::tip
Le terrain de jeu est le moyen le plus rapide de développer et tester les composants AppHelper. Il rechargue à chaud le serveur de développement Vite afin que vous puissiez voir les changements en temps réel.
:::

## Publication

Les versions passent par changesets : exécutez `yarn changeset` à la racine de l'espace de travail avec chaque changement, puis `yarn publish-all` quand vous êtes prêt à publier. Voir [Vue d'ensemble des bibliothèques partagées](./index.md#releasing-with-changesets) pour le flux complet.

:::warning
Ne jamais supprimer ou renommer une exportation jusqu'à ce que le remplacement soit publié et que chaque consommateur ait été migré -- grep tous les référentiels consommateurs avant de fusionner une suppression.
:::

## Articles connexes

- **[Helpers](./helpers)** -- Le paquet d'utilitaires de base utilisé aux côtés d'AppHelper
- **[Applications web](../web-apps/)** -- Les applications web qui consomment ce paquet
- **[Vue d'ensemble des bibliothèques partagées](./index.md)** -- Configuration de l'espace de travail, flux de publication et flux de liaison locale

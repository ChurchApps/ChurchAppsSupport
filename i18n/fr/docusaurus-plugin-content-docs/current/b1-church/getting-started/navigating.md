---
title: "Navigation dans B1App"
---

# Navigation dans B1App

<div class="article-intro">

Le portail des membres de B1.church est une application Web conçue pour téléphone qui se trouve sous `/mobile`. Elle fonctionne dans n'importe quel navigateur et peut être installée sur l'écran d'accueil de votre appareil. Cette page explique le tableau de bord Accueil, la barre d'onglets inférieure, la page Plus et la page Moi.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez être [connecté](./logging-in.md) pour voir vos informations personnelles. Les visiteurs non connectés peuvent tout de même consulter le contenu public, et un bouton **Se connecter** leur est proposé lorsqu'une fonctionnalité nécessite un compte.

</div>

## Accueil {#home}

En ouvrant `https://yourchurchname.b1.church/mobile`, vous accédez au tableau de bord **Accueil** à l'adresse `/mobile/dashboard`. Accueil est la page d'entrée du portail des membres. Elle commence par un message de bienvenue (« Bonjour », « Bon après-midi » ou « Bonsoir », suivi de votre prénom) et la date du jour, puis affiche des sections qui n'apparaissent que lorsqu'elles sont pertinentes :

- **Vignettes photo** -- les onglets pour lesquels votre église a fourni une photo (y compris le Verset du jour) apparaissent sous forme de vignettes sous le nom de votre église. Selon le choix de votre église, elles sont disposées en grille à deux colonnes, en une rangée que l'on fait défiler latéralement, ou en liste avec une petite miniature à côté de chaque nom -- voir [Vignettes de l'écran d'accueil](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Chaque onglet photo apparaît ici, même s'il occupe déjà un emplacement dans la barre d'onglets.
- **Dernier sermon** -- le sermon le plus récent de votre église, avec un lien **Tous les sermons**
- **Verset du jour** -- le verset du jour ; appuyez dessus pour ouvrir la page complète [Verset du jour](../content/verse-of-the-day.md)
- **Vous servez** -- vos prochaines affectations de service, avec un lien **Tous les plans**. Si une affectation attend toujours votre réponse, elle s'affiche en premier avec un badge **Réponse requise** et les boutons **Accepter** / **Refuser**, afin que vous puissiez répondre directement depuis Accueil (**Refuser** vous demande d'abord une confirmation) ; sinon, vos prochaines affectations affichent un badge **Acceptée** ou **Confirmée**. Appuyez sur une affectation pour ouvrir son plan.
- **Vos groupes** -- jusqu'à trois de vos groupes avec leur heure et leur lieu de rencontre, et un lien **Tous les groupes**
- **Événements à venir** -- lorsque vous êtes connecté, les trois prochains événements des groupes auxquels vous appartenez, chacun avec sa date et son heure (ainsi qu'une miniature si l'événement possède une photo). Appuyez sur un événement pour ouvrir les événements de son groupe. Appuyez sur **Tous les événements à venir** pour ouvrir la liste complète sur votre [page Moi](./me-page.md#upcoming), qui comprend aussi vos affectations de service et vos inscriptions.
- **Dons** -- le montant que vous avez donné cette année (« Donné en » l'année en cours), un bouton **Donner** et un lien **Historique** vers votre [historique de dons](../giving/donation-history.md). Cette section est masquée si votre église a limité l'historique des dons de ses membres à une année antérieure ou l'a masqué ; dans ce cas, l'outil de dons de votre église apparaît plutôt sous forme de bouton dans la section **Plus de**
- **Plus de** *votre église* -- boutons pour les autres outils activés par votre église qui ne figurent ni dans la barre d'onglets ni dans les sections ci-dessus. Les outils que vous utilisez le plus sont placés en premier.

Les sections Service, Groupes et Dons n'apparaissent que lorsque vous êtes connecté, que votre église a activé cet outil et que vous avez quelque chose à afficher -- par exemple, une affectation à venir ou au moins un groupe. Sur un ordinateur, Accueil est disposé en deux colonnes.

Si vous n'êtes pas connecté, Accueil affiche un titre **Bienvenue** à la place du message d'accueil, accompagné d'une courte invitation (« Connectez-vous pour voir vos groupes, vos dons et plus encore. ») et d'un bouton **Se connecter**. Cette invitation s'affiche même si votre église n'a encore rien configuré pour Accueil. Votre église peut reformuler cette invitation ou la masquer -- voir [Paramètres de l'application mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Lorsqu'elle est masquée, vous pouvez tout de même vous connecter depuis la page **Plus** ou la page **Moi**.

## La barre d'onglets inférieure {#the-bottom-tab-bar}

Sur un téléphone, une barre d'onglets est fixée en bas de l'écran :

- **Accueil** -- toujours le premier onglet
- Jusqu'à trois des onglets configurés par votre église
- **Plus** -- ouvre la page Plus

Les écrans intégrés (comme Groupes, Dons ou Plans) reçoivent d'abord les emplacements d'onglets ; les emplacements restants sont attribués aux pages personnalisées de votre église. Seuls les liens vers des sites Web externes et le Verset du jour ne reçoivent jamais d'onglet. Si votre église a configuré plus d'onglets qu'il n'en peut être affiché, les autres ne sont pas perdus : ils apparaissent sur la page **Plus** et dans la section **Plus de** de l'accueil. Les administrateurs de l'église définissent l'ordre des onglets dans B1 Admin, sous **Mobile → Navigation**.

## Sur un ordinateur {#on-a-computer}

Sur un écran plus large, comme celui d'un ordinateur ou d'une grande tablette, la barre d'onglets inférieure est remplacée par un en-tête en haut de l'écran, aux couleurs de votre église. On y trouve le logo de votre église (ou son nom si aucun logo n'est défini ; cliquez dessus pour revenir à Accueil), **Accueil**, jusqu'à cinq des onglets configurés par votre église, et **Plus**, avec la cloche et votre photo de profil à droite. Lorsque vous ouvrez un écran de détail, un lien **Retour** apparaît au-dessus du contenu de la page.

## La page Plus {#the-more-page}

Appuyer sur **Plus** ouvre la page Plus, à l'adresse `/mobile/more`. Elle contient :

- Votre nom et votre photo, avec un lien **Modifier le profil** -- voir [Modifier votre profil](./editing-your-profile.md)
- Tous les onglets configurés par votre église, dans l'ordre, sous le nom de votre église. Les liens vers des sites Web externes s'ouvrent dans un nouvel onglet du navigateur.
- Une section **Compte** comprenant :
  - **Moi** -- votre page personnelle (réservée aux personnes connectées)
  - **Apparence** -- permet de basculer entre le **mode clair** et le **mode sombre**
  - **Portail administrateur** -- affiché uniquement si vous disposez des autorisations d'administrateur dans votre église ; il ouvre B1 Admin dans un nouvel onglet
  - **Installer l'application** -- ouvre les [instructions d'installation](./installing-pwa.md) à l'adresse `/mobile/install` (masqué une fois l'application installée)
- **Se déconnecter**, ou un bouton **Se connecter** si vous n'êtes pas connecté
- Le nom de votre église et un lien vers la politique de confidentialité

## La barre d'application {#the-app-bar}

Sur un téléphone, la barre située en haut de chaque écran affiche :

- Le logo de votre église (ou son nom, si votre église n'a pas téléversé de logo) sur l'accueil et les autres écrans principaux, ou une flèche de retour lorsque vous êtes entré dans un écran de détail. Le titre de l'écran apparaît en haut de la page elle-même.
- Une icône **cloche** pour les notifications et les messages, avec un badge indiquant les éléments non lus -- voir [Notifications et messages](#notifications-and-messages) ci-dessous
- Votre **photo de profil**, qui ouvre votre profil à l'adresse `/mobile/profileEdit` -- voir [Modifier votre profil](./editing-your-profile.md)

La cloche et la photo de profil n'apparaissent que lorsque vous êtes connecté.

## Notifications et messages {#notifications-and-messages}

En appuyant sur la cloche, un panneau s'ouvre avec deux sections :

- **Messages** -- vos conversations privées les plus récentes, avec un lien **Nouveau message** pour en démarrer une
- **Notifications** -- vos notifications les plus récentes, avec un badge **Nouveau** sur celles qui n'ont pas été lues. Appuyez sur une notification pour accéder au groupe, au plan ou à la conversation dont elle provient.

Chaque section indique le nombre d'éléments non lus qu'elle contient. Appuyez sur **Voir tout** en bas pour ouvrir votre boîte de réception complète à l'adresse `/mobile/notifications`.

## Pages avec sections {#pages-with-sections}

Les pages de détail -- un groupe, un plan, votre page Moi, les écrans Plans et Dons -- sont présentées sous forme de page unique divisée en sections, au lieu d'onglets. Chaque section affiche un bref aperçu, et un lien dans l'en-tête de la section (comme **Tous les membres**, **Tous les événements** ou **Ordre complet du service**) ouvre la liste complète. Un lien **Retour à** en haut de cette vue vous ramène à la page d'où vous venez.

## La page Moi {#the-me-page}

**Moi** (`/mobile/me`) est votre espace personnel. Il affiche votre nom et votre photo, avec les boutons **Modifier le profil** et **Paramètres** ([préférences de notification](./notification-preferences.md)), puis ce qui est à venir pour vous -- affectations de service, inscriptions aux événements et événements de groupe -- suivi de votre foyer, de vos groupes, de vos [dons](../giving/) de l'année, des formulaires que vous avez envoyés, de votre historique de présence, de vos [inscriptions](../events/my-registrations.md), ainsi que de vos notifications et messages récents. Voir [La page Moi](./me-page) pour plus de détails.

Si vous n'êtes pas connecté, la page Moi affiche plutôt un bouton **Se connecter**.

## Installer sur votre écran d'accueil {#installing-to-your-home-screen}

Le portail des membres est une application Web progressive. Rendez-vous à l'adresse `/mobile/install` (ou choisissez **Installer l'application** sur la page Plus) pour obtenir des instructions étape par étape pour votre appareil. Une fois installée, l'application s'ouvre en plein écran depuis votre écran d'accueil, sans les éléments du navigateur. Voir [Installer l'application (PWA)](./installing-pwa.md).

## Le site Web public de votre église {#your-churchs-public-website}

En dehors du portail des membres, le site Web public de votre église possède sa propre navigation d'en-tête, avec des liens configurés par vos administrateurs -- des pages comme [sermons](../content/sermons.md), la [Bible](../content/bible.md), la [diffusion en direct](../content/live-streaming.md) et une liste publique des groupes. Sur un téléphone, ces liens se trouvent derrière l'icône hamburger en haut à droite de l'en-tête.

:::info
Les onglets et outils que vous voyez varient selon l'église. Les administrateurs contrôlent les sections visibles par les membres depuis B1 Admin ; si vous ne voyez pas une fonctionnalité décrite ici, il se peut que votre église ne l'ait pas activée.
:::

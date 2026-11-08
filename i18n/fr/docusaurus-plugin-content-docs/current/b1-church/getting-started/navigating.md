---
title: "Naviguer dans B1App"
description: "Trouvez votre chemin dans le portail membre de B1.church sur téléphone ou ordinateur : le tableau de bord Accueil, la barre d'onglets inférieure, la page Plus et la page Moi."
---

# Naviguer dans B1App

<div class="article-intro">

Le portail membre de B1.church est une application web conçue d'abord pour le téléphone, qui se trouve sous `/mobile`. Elle fonctionne dans tous les navigateurs et peut être installée sur l'écran d'accueil. Cette page explique le tableau de bord Accueil, la barre d'onglets inférieure, la page Plus et la page Moi.

</div>

## Vidéo de présentation

<YouTube id="8XKRZvvAbXg" title="Visite de l'application membre B1.church" next="Présentation de B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez être [connecté](./logging-in.md) pour voir vos informations personnelles. Les visiteurs non connectés peuvent toujours parcourir le contenu public, et un bouton **Se connecter** leur est proposé lorsqu'une fonctionnalité nécessite un compte.

</div>

## Accueil {#home}

En ouvrant `https://yourchurchname.b1.church/mobile`, vous arrivez sur le tableau de bord **Accueil**, à l'adresse `/mobile/dashboard`. Accueil est la page d'accueil du portail membre. Elle commence par un message de bienvenue (« Bonjour », « Bon après-midi » ou « Bonsoir », suivi de votre prénom) et la date du jour, puis par des sections qui n'apparaissent que lorsqu'elles sont pertinentes :

- **Vignettes photo** -- les onglets auxquels votre église a associé une photo (y compris le Verset du jour) apparaissent sous forme de vignettes sous le nom de votre église. Selon le choix de votre église, elles sont présentées en grille de deux colonnes, en rangée que vous faites défiler latéralement (qui peut aussi avancer automatiquement), ou en liste avec une petite miniature à côté de chaque nom. Voir [Vignettes de l'écran d'accueil](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Lorsque la rangée latérale contient plus de vignettes qu'il n'en tient à l'écran, une rangée de points s'affiche dessous pour indiquer votre position ; touchez un point pour aller directement à cette vignette. La rangée continue d'avancer et repart de la première vignette après la dernière. Chaque onglet photo apparaît ici, même s'il a aussi un emplacement dans la barre d'onglets.
- **Dernier sermon** -- le sermon le plus récent de votre église, avec un lien **Tous les sermons**
- **Verset du jour** -- le verset du jour ; touchez-le pour ouvrir la page complète du [Verset du jour](../content/verse-of-the-day.md)
- **Vous servez** -- vos prochaines affectations de service, avec un lien **Tous les plans**. Si une affectation attend encore votre réponse, elle est affichée en premier, avec un badge **Réponse requise** et les boutons **Accepter** / **Refuser** afin que vous puissiez répondre directement depuis l'accueil (**Refuser** vous demande d'abord une confirmation). Sinon, vos prochaines affectations affichent un badge **Acceptée** ou **Confirmée**. Touchez une affectation pour ouvrir son plan.
- **Vos groupes** -- jusqu'à trois de vos groupes, avec leur heure et leur lieu de réunion, et un lien **Tous les groupes**
- **Événements à venir** -- lorsque vous êtes connecté, vos trois prochains événements de groupe et inscriptions à des événements, réunis et classés par date, chacun avec sa date et son heure (ainsi qu'une miniature si l'événement a une photo). Chaque ligne porte l'étiquette **Événement** (un événement d'un groupe dont vous faites partie) ou **Inscription** (un événement auquel vous êtes [inscrit](../events/registering.md)) ; un événement auquel vous êtes inscrit n'apparaît qu'une fois, en tant qu'inscription. Touchez un événement pour ouvrir les événements de son groupe, ou une inscription pour ouvrir [vos inscriptions](../events/my-registrations.md). Touchez **Tous les événements à venir** pour ouvrir la liste complète sur votre [page Moi](./me-page.md#upcoming), qui comprend aussi vos affectations de service et vos inscriptions.
- **Ma présence** et **Mes formulaires** -- si votre église les active, le nombre de fois où vous avez assisté aux 90 derniers jours avec vos deux visites les plus récentes, ainsi que vos deux derniers formulaires envoyés, avec des liens vers les listes complètes. Ils apparaissent toujours sur votre [page Moi](./me-page.md), quoi qu'il en soit -- voir [Sections de l'écran d'accueil](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Dons** -- le montant que vous avez donné cette année (« Donné en » l'année en cours), un bouton **Donner** (affiché uniquement si votre église propose les dons en ligne) et un lien **Historique** vers votre [historique des dons](../giving/donation-history.md). Cette section est masquée si votre église a limité l'historique des dons des membres à une année antérieure ou l'a masqué ; dans ce cas, l'outil de dons de votre église apparaît comme un bouton sous **Plus de** à la place
- **Plus de** *votre église* -- des boutons pour les autres outils activés par votre église qui ne figurent pas déjà dans la barre d'onglets ou ci-dessus. Ceux que vous utilisez le plus passent en premier.

Les sections Service, Groupes, Présence, Formulaires et Dons n'apparaissent que lorsque vous êtes connecté, que votre église a activé cet outil et que vous avez quelque chose à afficher -- par exemple une affectation à venir ou au moins un groupe. Sur un ordinateur, l'accueil est disposé sur deux colonnes.

Si vous n'êtes pas connecté, l'accueil affiche un titre **Bienvenue** à la place du message de bienvenue, accompagné d'une courte invitation (« Connectez-vous pour voir vos groupes, vos dons et plus encore. ») et d'un bouton **Se connecter**. Cette invitation s'affiche même si votre église n'a encore rien configuré pour l'accueil. Votre église peut reformuler cette invitation ou la masquer -- voir [Paramètres de l'application mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Lorsqu'elle est masquée, vous pouvez toujours vous connecter depuis la page **Plus** ou la page **Moi**.

## La barre d'onglets inférieure

Sur un téléphone, une barre d'onglets est fixée en bas de l'écran :

- **Accueil** -- toujours le premier onglet
- Jusqu'à trois des onglets configurés par votre église
- **Plus** -- ouvre la page Plus

Les écrans intégrés (comme Groupes, Dons ou Plans) obtiennent d'abord les emplacements d'onglets ; les emplacements restants sont attribués aux pages personnalisées de votre église. Seuls les liens vers des sites externes et le Verset du jour ne reçoivent jamais d'onglet. Si votre église a configuré plus d'onglets qu'il n'en tient, les autres ne sont pas perdus : ils apparaissent sur la page **Plus** et dans la section **Plus de** de l'accueil. Les administrateurs de l'église définissent l'ordre des onglets dans B1 Admin, sous **Mobile → Navigation**.

### Dossiers d'onglets {#folder-tabs}

Votre église peut regrouper plusieurs onglets dans un **dossier**. Un dossier apparaît comme n'importe quel autre onglet -- dans la barre d'onglets, sur la page **Plus** ou sous forme de vignette photo sur l'accueil. En le touchant, vous ouvrez un écran portant le nom du dossier, qui liste les onglets qu'il contient. Si chaque onglet du dossier a une photo, ils sont affichés sous forme de vignettes ; sinon, ils sont affichés sous forme de liste. Les liens vers des sites externes présents dans un dossier s'ouvrent dans un nouvel onglet du navigateur. Les onglets d'un dossier n'apparaissent que sur l'écran de ce dossier, et non dans la barre d'onglets ni sur la page **Plus**. Un dossier qui ne contient rien de visible est masqué.

## Sur un ordinateur

Sur un écran plus large, comme celui d'un ordinateur ou d'une grande tablette, la barre d'onglets inférieure est remplacée par un en-tête en haut de l'écran, aux couleurs de votre église. Il affiche le logo de votre église, ou son nom si aucun logo n'est défini (cliquez dessus pour revenir à l'accueil), **Accueil**, jusqu'à cinq des onglets configurés par votre église, et **Plus**, avec la cloche et votre photo de profil à droite. Lorsque vous ouvrez un écran de détail, un lien **Retour** apparaît au-dessus du contenu de la page.

## La page Plus

En touchant **Plus**, vous ouvrez la page Plus, à l'adresse `/mobile/more`. Elle contient :

- Votre nom et votre photo, avec un lien **Modifier le profil** -- voir [Modifier votre profil](./editing-your-profile.md)
- Tous les onglets configurés par votre église, dans l'ordre, sous le nom de votre église. Les liens vers des sites externes s'ouvrent dans un nouvel onglet du navigateur.
- Une section **Compte** comprenant :
  - **Moi** -- votre page personnelle (uniquement si vous êtes connecté)
  - **Apparence** -- pour basculer entre le **Mode clair** et le **Mode sombre**
  - **Portail d'administration** -- affiché uniquement si vous disposez des droits d'administrateur dans votre église ; il ouvre B1 Admin dans un nouvel onglet
  - **Installer l'application** -- ouvre les [instructions d'installation](./installing-pwa.md) à l'adresse `/mobile/install` (masqué une fois l'application installée)
- **Se déconnecter**, ou un bouton **Se connecter** si vous n'êtes pas connecté
- Le nom de votre église et un lien vers la politique de confidentialité

## La barre de l'application

Sur un téléphone, la barre en haut de chaque écran affiche :

- Le logo de votre église (ou son nom, si elle n'a pas téléversé de logo) sur l'accueil et les autres écrans principaux, ou une flèche de retour lorsque vous êtes entré dans un écran de détail. Le titre de l'écran apparaît en haut de la page elle-même.
- Une icône **cloche** pour les notifications et les messages, avec un badge indiquant les éléments non lus -- voir [Notifications et messages](#notifications-and-messages) ci-dessous
- Votre **photo de profil**, qui ouvre votre profil à l'adresse `/mobile/profileEdit` -- voir [Modifier votre profil](./editing-your-profile.md)

La cloche et la photo de profil n'apparaissent que lorsque vous êtes connecté.

## Notifications et messages

En touchant la cloche, vous ouvrez un panneau comportant deux sections :

- **Messages** -- vos conversations privées les plus récentes, avec un lien **Nouveau message** pour en démarrer une
- **Notifications** -- vos notifications les plus récentes, avec un badge **Nouveau** sur celles qui ne sont pas lues. Touchez une notification pour accéder au groupe, au plan ou à la conversation dont elle provient.

Chaque section indique le nombre d'éléments non lus qu'elle contient. Touchez **Voir tout** en bas pour ouvrir votre boîte de réception complète à l'adresse `/mobile/notifications`.

## Pages avec sections

Les pages de détail -- un groupe, un plan, votre page Moi, les écrans Plans et Dons -- sont organisées en une seule page de sections plutôt qu'en onglets. Chaque section affiche un bref aperçu, et un lien dans l'en-tête de la section (comme **Tous les membres**, **Tous les événements** ou **Ordre complet du service**) ouvre la liste complète. Un lien **Retour à** en haut de cette vue vous ramène à la page d'où vous venez.

## La page Moi

**Moi** (`/mobile/me`) est votre espace personnel. Il affiche votre nom et votre photo, avec les boutons **Modifier le profil** et **Paramètres** ([préférences de notification](./notification-preferences.md)), puis ce qui est à venir pour vous -- affectations de service, inscriptions à des événements et événements de groupe -- suivi de votre foyer, de vos groupes, de vos [dons](../giving/index.md) de l'année, des formulaires que vous avez envoyés, de votre historique de présence, de vos [inscriptions](../events/my-registrations.md), ainsi que de vos notifications et messages récents. Voir [La page Moi](./me-page.md) pour plus de détails.

Si vous n'êtes pas connecté, la page Moi affiche à la place un bouton **Se connecter**.

## Installer sur votre écran d'accueil

Le portail membre est une application web progressive. Rendez-vous à l'adresse `/mobile/install` (ou choisissez **Installer l'application** sur la page Plus) pour obtenir des instructions pas à pas adaptées à votre appareil. Une fois installée, l'application s'ouvre en plein écran depuis votre écran d'accueil, sans les éléments du navigateur. Voir [Installer comme application (PWA)](./installing-pwa.md).

## Le site public de votre église

En dehors du portail membre, le site public de votre église dispose de son propre menu de navigation en haut, avec des liens configurés par vos administrateurs -- des pages comme [sermons](../content/sermons.md), la [Bible](../content/bible.md), la [diffusion en direct](../content/live-streaming.md) et une liste publique de groupes. Sur un téléphone, ces liens se trouvent derrière l'icône hamburger, en haut à droite de l'en-tête.

:::info
Les onglets et outils que vous voyez varient selon l'église. Les administrateurs contrôlent les sections visibles par les membres depuis B1 Admin ; si vous ne voyez pas une fonctionnalité décrite ici, votre église ne l'a peut-être pas activée.
:::

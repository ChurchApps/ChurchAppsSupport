---
title: "Naviguer dans B1App"
---

# Naviguer dans B1App

<div class="article-intro">

Le portail des membres de B1.church est une application web conçue d'abord pour le téléphone, qui se trouve sous `/mobile`. Elle fonctionne dans n'importe quel navigateur et peut être installée sur l'écran d'accueil. Cette page explique le tableau de bord Accueil, la barre d'onglets inférieure, la page Plus et la page Moi.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez être [connecté](./logging-in.md) pour voir vos informations personnelles. Les visiteurs non connectés peuvent toujours parcourir le contenu public, et un bouton **Se connecter** leur est proposé lorsqu'une fonctionnalité nécessite un compte.

</div>

## Accueil {#home}

Ouvrir `https://yourchurchname.b1.church/mobile` vous mène au tableau de bord **Accueil**, à l'adresse `/mobile/dashboard`. Accueil est la page d'accueil du portail des membres. Elle commence par une salutation (« Bonjour », « Bon après-midi » ou « Bonsoir », suivie de votre prénom) et la date du jour, puis affiche des sections qui n'apparaissent que si elles sont pertinentes :

- **Dernier sermon** — le sermon le plus récent de votre église, avec un lien **Tous les sermons**
- **Verset du jour** — le verset du jour ; appuyez dessus pour ouvrir la page complète [Verset du jour](../content/verse-of-the-day.md)
- **Vous servez** — vos prochaines affectations de service, avec un lien **Tous les plans**. Si une affectation attend encore votre réponse, elle s'affiche en premier avec un badge **Réponse requise** et les boutons **Accepter** / **Refuser**, afin que vous puissiez répondre directement depuis Accueil (**Refuser** vous demande d'abord une confirmation) ; sinon, vos prochaines affectations affichent un badge **Acceptée** ou **Confirmée**. Appuyez sur une affectation pour ouvrir son plan.
- **Vos groupes** — jusqu'à trois de vos groupes avec leur heure de rencontre et leur lieu, et un lien **Tous les groupes**
- **Dons** — le montant que vous avez donné cette année (« Donné en » l'année en cours), un bouton **Donner** et un lien **Historique** vers votre [historique des dons](../giving/donation-history.md)
- **Plus de** *votre église* — des boutons pour les autres outils que votre église a activés et qui ne figurent pas déjà dans la barre d'onglets ou ci-dessus. Ceux que vous utilisez le plus passent en premier.

Les sections Service, Groupes et Dons n'apparaissent que lorsque vous êtes connecté, que votre église a activé cet outil et que vous avez quelque chose à afficher — par exemple une affectation à venir ou au moins un groupe. Sur ordinateur, Accueil est disposé sur deux colonnes.

Si vous n'êtes pas connecté, Accueil affiche un titre **Bienvenue** à la place de la salutation, avec une courte invitation (« Connectez-vous pour voir vos groupes, vos dons et plus encore. ») et un bouton **Se connecter**. Cette invitation s'affiche même si votre église n'a pas encore configuré autre chose pour Accueil. Votre église peut reformuler cette invitation ou la masquer — voir [Paramètres de l'application mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Lorsqu'elle est masquée, vous pouvez toujours vous connecter depuis la page **Plus** ou la page **Moi**.

## La barre d'onglets inférieure

Sur téléphone, une barre d'onglets est fixée au bas de l'écran :

- **Accueil** — toujours le premier onglet
- Jusqu'à trois des onglets configurés par votre église
- **Plus** — ouvre la page Plus

Les liens vers des sites web externes, des pages personnalisées et le Verset du jour ne reçoivent jamais d'onglet. Si votre église a configuré plus d'onglets qu'il n'en peut être affiché, les autres ne sont pas perdus : ils apparaissent sur la page **Plus** et dans la section **Plus de** de l'accueil. Les administrateurs de l'église définissent l'ordre des onglets dans B1 Admin, sous **Mobile → Navigation**.

## Sur ordinateur

Sur un écran plus large, comme un ordinateur ou une grande tablette, la barre d'onglets inférieure est remplacée par un en-tête en haut de l'écran, aux couleurs de votre église. Il affiche le nom de votre église (cliquez dessus pour revenir à Accueil), **Accueil**, jusqu'à cinq des onglets configurés par votre église, et **Plus**, avec la cloche et votre photo de profil à droite. Lorsque vous ouvrez un écran de détail, un lien **Retour** apparaît au-dessus du contenu de la page.

## La page Plus {#the-more-page}

Appuyer sur **Plus** ouvre la page Plus à l'adresse `/mobile/more`. Elle contient :

- Votre nom et votre photo, avec un lien **Modifier le profil** — voir [Modifier votre profil](./editing-your-profile.md)
- Chaque onglet configuré par votre église, dans l'ordre, sous le nom de votre église. Les liens vers des sites web externes s'ouvrent dans un nouvel onglet du navigateur.
- Une section **Compte** comprenant :
  - **Moi** — votre page personnelle (connectés uniquement)
  - **Apparence** — basculer entre **Mode clair** et **Mode sombre**
  - **Portail d'administration** — visible uniquement si vous disposez de permissions d'administrateur dans votre église ; il ouvre B1 Admin dans un nouvel onglet
  - **Installer l'application** — ouvre les [instructions d'installation](./installing-pwa.md) à l'adresse `/mobile/install` (masqué une fois l'application installée)
- **Se déconnecter**, ou un bouton **Se connecter** si vous n'êtes pas connecté
- Le nom de votre église et un lien vers la politique de confidentialité

## La barre d'application

Sur téléphone, la barre en haut de chaque écran affiche :

- Le nom de votre église sur Accueil et les autres écrans principaux, ou une flèche de retour lorsque vous êtes entré dans un écran de détail. Le titre de l'écran apparaît en haut de la page elle-même.
- Une icône **cloche** pour les notifications et les messages, avec un badge pour les éléments non lus — voir [Notifications et messages](#notifications-and-messages) ci-dessous
- Votre **photo de profil**, qui ouvre votre profil à l'adresse `/mobile/profileEdit` — voir [Modifier votre profil](./editing-your-profile.md)

La cloche et la photo de profil n'apparaissent que lorsque vous êtes connecté.

## Notifications et messages {#notifications-and-messages}

Appuyer sur la cloche ouvre un panneau avec deux sections :

- **Messages** — vos conversations privées les plus récentes, avec un lien **Nouveau message** pour en commencer une
- **Notifications** — vos notifications les plus récentes, avec un badge **Nouveau** sur celles qui sont non lues. Appuyez sur une notification pour accéder au groupe, au plan ou à la conversation dont elle provient.

Chaque section indique le nombre d'éléments non lus qu'elle contient. Appuyez sur **Voir tout** en bas pour ouvrir votre boîte de réception complète à l'adresse `/mobile/notifications`.

## Pages avec sections

Les pages de détail — un groupe, un plan, votre page Moi, les écrans Plans et Dons — sont organisées en une seule page de sections plutôt qu'en onglets. Chaque section affiche un bref aperçu, et un lien dans l'en-tête de la section (comme **Tous les membres**, **Tous les événements** ou **Ordre complet du service**) ouvre la liste complète. Un lien **Retour à** en haut de cette vue vous ramène à la page d'où vous venez.

## La page Moi

**Moi** (`/mobile/me`) est votre espace personnel. Elle affiche votre nom et votre photo, avec les boutons **Modifier le profil** et **Paramètres** ([préférences de notification](./notification-preferences.md)), puis ce qui vous attend — affectations de service, inscriptions aux événements et événements de groupe — suivi de votre foyer, de vos groupes, de vos [dons](../giving/) de l'année, de vos [inscriptions](../events/my-registrations.md), et de vos notifications et messages récents. Voir [La page Moi](./me-page) pour plus de détails.

Si vous n'êtes pas connecté, la page Moi affiche à la place un bouton **Se connecter**.

## Installer sur votre écran d'accueil

Le portail des membres est une application web progressive (PWA). Rendez-vous à `/mobile/install` (ou choisissez **Installer l'application** sur la page Plus) pour obtenir des instructions pas à pas adaptées à votre appareil. Une fois installée, elle s'ouvre en plein écran depuis votre écran d'accueil, sans la barre du navigateur. Voir [Installer l'application (PWA)](./installing-pwa.md).

## Le site public de votre église

En dehors du portail des membres, le site public de votre église dispose de sa propre navigation d'en-tête, avec des liens configurés par vos administrateurs — des pages comme les [sermons](../content/sermons.md), la [Bible](../content/bible.md), la [diffusion en direct](../content/live-streaming.md) et une liste publique de groupes. Sur téléphone, ces liens se trouvent derrière l'icône hamburger en haut à droite de l'en-tête.

:::info
Les onglets et les outils que vous voyez varient selon l'église. Les administrateurs contrôlent les sections visibles par les membres depuis B1 Admin ; si vous ne voyez pas une fonctionnalité décrite ici, votre église ne l'a peut-être pas activée.
:::

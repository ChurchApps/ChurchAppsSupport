---
title: "Navigation dans B1App"
---

# Navigation dans B1App

<div class="article-intro">

Le portail des membres de B1.church est une application web pensée pour le téléphone, accessible à l'adresse `/mobile`. Elle fonctionne dans tous les navigateurs et peut être installée sur l'écran d'accueil. Cette page présente le tableau de bord Accueil, la barre d'onglets inférieure, la page Plus et la page Moi.

</div>

## Vidéo de présentation

<YouTube id="8XKRZvvAbXg" title="A Tour of the B1.church Member App" next="A Tour of B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez être [connecté](./logging-in.md) pour voir vos informations personnelles. Les visiteurs non connectés peuvent toujours consulter le contenu public et se voient proposer un bouton **Se connecter** lorsqu'une fonctionnalité nécessite un compte.

</div>

## Accueil {#home}

Ouvrir `https://yourchurchname.b1.church/mobile` vous mène au tableau de bord **Accueil**, à l'adresse `/mobile/dashboard`. Accueil est la page d'entrée du portail des membres. Elle commence par une salutation (« Bonjour », « Bon après-midi » ou « Bonsoir », suivi de votre prénom) et la date du jour, puis par des sections qui n'apparaissent que lorsqu'elles sont pertinentes :

- **Vignettes photo** -- les onglets pour lesquels votre église a fourni une photo (y compris le Verset du jour) apparaissent sous forme de vignettes photo sous le nom de votre église. Selon le choix de votre église, elles sont disposées en grille à deux colonnes, en rangée à faire défiler latéralement (qui peut aussi se déplacer seule), ou en liste avec une petite miniature à côté de chaque nom -- voir [Vignettes de l'écran d'accueil](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Chaque onglet photo apparaît ici, même s'il dispose aussi d'un emplacement dans la barre d'onglets.
- **Dernière prédication** -- la prédication la plus récente de votre église, avec un lien **Toutes les prédications**
- **Verset du jour** -- le verset du jour ; touchez-le pour ouvrir la page complète [Verset du jour](../content/verse-of-the-day.md)
- **Vous servez** -- vos prochaines affectations de service, avec un lien **Tous les plannings**. Si une affectation attend encore votre réponse, elle est affichée en premier avec un badge **Réponse attendue** et les boutons **Accepter** / **Refuser** pour répondre directement depuis l'accueil (**Refuser** vous demande d'abord une confirmation) ; sinon, vos prochaines affectations affichent un badge **Acceptée** ou **Confirmée**. Touchez une affectation pour ouvrir son planning.
- **Vos groupes** -- jusqu'à trois de vos groupes avec leur horaire et leur lieu de rencontre, et un lien **Tous les groupes**
- **Événements à venir** -- lorsque vous êtes connecté, les trois prochains événements des groupes auxquels vous appartenez, chacun avec sa date et son heure (et une miniature si l'événement a une photo). Touchez un événement pour ouvrir les événements de son groupe. Touchez **Tous les événements à venir** pour ouvrir la liste complète sur votre [page Moi](./me-page.md#upcoming), qui comprend aussi vos affectations de service et vos inscriptions.
- **Mes présences** et **Mes formulaires** -- si votre église les active, le nombre de fois où vous avez été présent au cours des 90 derniers jours avec vos deux visites les plus récentes, et vos deux soumissions de formulaires les plus récentes, avec des liens vers les listes complètes. Ils apparaissent toujours sur votre [page Moi](./me-page.md), quel que soit ce réglage -- voir [Sections de l'écran d'accueil](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Dons** -- le montant que vous avez donné cette année (« Donné en » l'année en cours), un bouton **Donner** (affiché uniquement si votre église propose les dons en ligne) et un lien **Historique** vers votre [historique des dons](../giving/donation-history.md). Masqué si votre église a limité l'historique des dons des membres à une année antérieure ou l'a masqué ; dans ce cas, l'outil de dons de votre église apparaît comme un bouton sous **Plus de** à la place
- **Plus de** *votre église* -- boutons pour les autres outils activés par votre église qui ne figurent pas déjà dans la barre d'onglets ou ci-dessus. Ceux que vous utilisez le plus passent en tête.

Les sections Service, Groupes, Présences, Formulaires et Dons n'apparaissent que lorsque vous êtes connecté, que votre église a activé cet outil et que vous avez quelque chose à afficher -- par exemple, une affectation à venir ou au moins un groupe. Sur un ordinateur, l'accueil est disposé sur deux colonnes.

Si vous êtes déconnecté, l'accueil affiche un titre **Bienvenue** à la place de la salutation, avec une courte invitation (« Connectez-vous pour voir vos groupes, vos dons et plus encore. ») et un bouton **Se connecter**. Cette invitation s'affiche même si votre église n'a encore rien configuré pour l'accueil. Votre église peut reformuler cette invitation ou la masquer -- voir [Paramètres de l'application mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Lorsqu'elle est masquée, vous pouvez toujours vous connecter depuis la page **Plus** ou la page **Moi**.

## La barre d'onglets inférieure

Sur un téléphone, une barre d'onglets est fixée en bas de l'écran :

- **Accueil** -- toujours le premier onglet
- Jusqu'à trois des onglets configurés par votre église
- **Plus** -- ouvre la page Plus

Les écrans intégrés (comme Groupes, Dons ou Plannings) reçoivent d'abord les emplacements d'onglets ; les emplacements restants sont attribués aux pages personnalisées de votre église. Seuls les liens vers des sites externes et le Verset du jour ne reçoivent jamais d'onglet. Si votre église a configuré plus d'onglets qu'il n'en tient, les autres ne sont pas perdus : ils apparaissent sur la page **Plus** et dans la section **Plus de** de l'accueil. Les administrateurs de l'église définissent l'ordre des onglets dans B1 Admin, sous **Mobile → Navigation**.

## Sur un ordinateur

Sur un écran plus large, comme un ordinateur ou une grande tablette, la barre d'onglets inférieure est remplacée par un en-tête en haut de l'écran, aux couleurs de votre église. Il affiche le logo de votre église, ou son nom si aucun logo n'est défini (cliquez dessus pour revenir à l'accueil), **Accueil**, jusqu'à cinq des onglets configurés par votre église, et **Plus**, avec la cloche et votre photo de profil à droite. Lorsque vous ouvrez un écran de détail, un lien **Retour** apparaît au-dessus du contenu de la page.

## La page Plus

Toucher **Plus** ouvre la page Plus à l'adresse `/mobile/more`. Elle contient :

- Votre nom et votre photo, avec un lien **Modifier le profil** -- voir [Modifier votre profil](./editing-your-profile.md)
- Tous les onglets configurés par votre église, dans l'ordre, sous le nom de votre église. Les liens vers des sites externes s'ouvrent dans un nouvel onglet du navigateur.
- Une section **Compte** avec :
  - **Moi** -- votre page personnelle (réservée aux membres connectés)
  - **Apparence** -- basculer entre le **Mode clair** et le **Mode sombre**
  - **Portail d'administration** -- affiché uniquement si vous disposez des droits d'administrateur dans votre église ; il ouvre B1 Admin dans un nouvel onglet
  - **Installer l'application** -- ouvre les [instructions d'installation](./installing-pwa.md) à l'adresse `/mobile/install` (masqué une fois l'application installée)
- **Se déconnecter**, ou un bouton **Se connecter** si vous êtes déconnecté
- Le nom de votre église et un lien vers la politique de confidentialité

## La barre d'application

Sur un téléphone, la barre en haut de chaque écran affiche :

- Le logo de votre église (ou son nom, si votre église n'a pas téléversé de logo) sur l'accueil et les autres écrans principaux, ou une flèche de retour lorsque vous êtes entré dans un écran de détail. Le titre de l'écran apparaît en haut de la page elle-même.
- Une icône **cloche** pour les notifications et les messages, avec un badge pour les éléments non lus -- voir [Notifications et messages](#notifications-and-messages) ci-dessous
- Votre **photo de profil**, qui ouvre votre profil à l'adresse `/mobile/profileEdit` -- voir [Modifier votre profil](./editing-your-profile.md)

La cloche et la photo de profil n'apparaissent que lorsque vous êtes connecté.

## Notifications et messages

Toucher la cloche ouvre un panneau avec deux sections :

- **Messages** -- vos conversations privées les plus récentes, avec un lien **Nouveau message** pour en démarrer une
- **Notifications** -- vos notifications les plus récentes, avec un badge **Nouveau** sur celles qui n'ont pas été lues. Touchez une notification pour accéder au groupe, au planning ou à la conversation dont elle provient.

Chaque section indique le nombre d'éléments non lus qu'elle contient. Touchez **Voir tout** en bas pour ouvrir votre boîte de réception complète à l'adresse `/mobile/notifications`.

## Pages avec sections

Les pages de détail -- un groupe, un planning, votre page Moi, les écrans Plannings et Dons -- sont organisées en une seule page de sections plutôt qu'en onglets. Chaque section affiche un bref aperçu, et un lien dans l'en-tête de la section (comme **Tous les membres**, **Tous les événements** ou **Ordre de service complet**) ouvre la liste complète. Un lien **Retour à** en haut de cette vue vous ramène à la page d'où vous venez.

## La page Moi

**Moi** (`/mobile/me`) est votre espace personnel. Il affiche votre nom et votre photo avec les boutons **Modifier le profil** et **Paramètres** ([préférences de notification](./notification-preferences.md)), puis ce qui est prévu pour vous -- affectations de service, inscriptions aux événements et événements de groupe -- suivi de votre foyer, de vos groupes, de vos [dons](../giving/) pour l'année, des formulaires que vous avez soumis, de votre historique de présence, de vos [inscriptions](../events/my-registrations.md), ainsi que de vos notifications et messages récents. Voir [La page Moi](./me-page) pour plus de détails.

Si vous êtes déconnecté, la page Moi affiche un bouton **Se connecter** à la place.

## Installer sur l'écran d'accueil

Le portail des membres est une application web progressive (PWA). Rendez-vous à l'adresse `/mobile/install` (ou choisissez **Installer l'application** sur la page Plus) pour des instructions pas à pas adaptées à votre appareil. Une fois installée, l'application s'ouvre en plein écran depuis votre écran d'accueil, sans les éléments du navigateur. Voir [Installer l'application (PWA)](./installing-pwa.md).

## Le site public de votre église

En dehors du portail des membres, le site public de votre église dispose de sa propre navigation d'en-tête, avec des liens configurés par vos administrateurs -- des pages comme les [prédications](../content/sermons.md), la [Bible](../content/bible.md), la [diffusion en direct](../content/live-streaming.md) et une liste publique des groupes. Sur un téléphone, ces liens se trouvent derrière l'icône menu (hamburger) en haut à droite de l'en-tête.

:::info
Les onglets et outils que vous voyez varient selon l'église. Les administrateurs contrôlent les sections visibles par les membres depuis B1 Admin ; si vous ne voyez pas une fonctionnalité décrite ici, votre église ne l'a peut-être pas activée.
:::

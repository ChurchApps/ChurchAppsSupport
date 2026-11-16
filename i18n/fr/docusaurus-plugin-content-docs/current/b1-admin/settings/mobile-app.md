---
title: "Paramètres de l'application mobile"
description: "Configurez les onglets de navigation, les tuiles de l'écran d'accueil, l'invitation à se connecter et les paramètres de confidentialité de l'annuaire des membres pour l'application des membres B1.church dans B1 Admin."
---

# Paramètres de l'application mobile {#mobile-app-settings}

<div class="article-intro">

La page Paramètres de l'application mobile vous permet de configurer les onglets de navigation qui apparaissent dans l'**expérience mobile B1.church (PWA)** pour les membres de votre église. Vous contrôlez quels onglets sont visibles, vers quoi ils mènent et comment ils sont affichés.

</div>

## Vidéo de formation {#training-video}

<YouTube id="ydY7WGK16fE" title="Personnaliser l'application des membres de votre église dans B1" />

:::info
Les onglets configurés ici apparaissent dans l'application B1, que les membres peuvent [installer comme application web progressive (PWA)](../../b1-church/getting-started/installing-pwa.md). Partagez la page d'installation de votre église — `https://yourchurchname.b1.church/mobile/install` — avec vos membres ; elle les guide pour installer l'application sur leur appareil, sans téléchargement depuis l'App Store ou Google Play.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation « Modifier les paramètres de l'église ». Voir [Rôles et autorisations](./roles-permissions.md) si vous n'y avez pas accès.
- Configurez d'abord vos [Paramètres de l'église](./church-settings.md), y compris le nom et l'image de marque de votre église

</div>

## Accéder aux paramètres de navigation {#accessing-navigation-settings}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **Navigation** (`/mobile/navigation`). Vous avez besoin de l'autorisation **Modifier le contenu** pour la voir.
3. La liste **Onglets de l'application** affiche vos onglets actuels dans l'ordre, chacun avec sa visibilité. Les onglets placés dans un dossier sont en retrait sous celui-ci.

Le menu Mobile comprend aussi **Thème de l'application**, **Portail des membres**, **Pointage B1**, **Étiquettes** et **Notifications push**. Le thème de l'application et le portail des membres sont décrits ci-dessous ; voir [Notifications push](#push-notifications) pour programmer des notifications.

## Ajouter un nouvel onglet {#adding-a-new-tab}

1. Cliquez sur le bouton **Ajouter un onglet** en haut de la page.
2. Renseignez les détails de l'onglet :
   - **Nom de l'onglet** -- L'étiquette affichée sur l'onglet (par exemple, « Prédications » ou « Donner »).
   - **Icône** -- Cliquez sur le sélecteur d'icônes pour choisir une icône pour votre onglet.
   - **Image** -- Cliquez sur **Choisir une image** (ou **Changer l'image**) pour attribuer une photo à l'onglet. Les onglets avec une photo apparaissent sous forme de tuiles photo sur l'écran d'accueil de l'application -- voir [Tuiles de l'écran d'accueil](#home-screen-tiles). Pour retirer une photo, cliquez sur **Retirer l'image** puis enregistrez ; l'onglet apparaît alors comme un onglet simple, et non comme une tuile d'accueil.
   - **Type d'onglet** -- **Bible**, **Diffusion en direct**, **Verset du jour**, **Prédications**, **Pointage**, **Don**, **Annuaire des membres**, **Mes groupes**, **Occasions de bénévolat**, **Plans de service**, **Inscriptions**, **Demandes**, **URL externe**, **Page interne** ou **Dossier**. **Inscriptions** ouvre les inscriptions aux événements du membre ; **Demandes** ouvre Mes demandes, où un membre peut demander un événement et consulter l'état de ses demandes passées. Réglez la visibilité sur Utilisateurs connectés ou Membres et personnel pour ces onglets, car ils exigent un membre connecté.
   - **URL** -- Affiché pour les onglets **URL externe** : l'adresse web que l'onglet ouvre.
   - **Page** -- Affiché pour les onglets **Page interne** : choisissez l'une des pages de votre site web.
   - **Onglet parent** -- Placez l'onglet dans un onglet **Dossier**, ou laissez **Aucun (niveau supérieur)**. Voir [Emplacement de ces onglets](#where-these-tabs-appear).
   - **Visibilité** -- Qui peut voir cet onglet : **Tout le monde (y compris anonymes)**, **Utilisateurs connectés**, **Membres et personnel**, **Personnel seulement**, **Membres de l'équipe de service** ou **Groupes précis...** (puis cochez les groupes). Pour un onglet **Annuaire des membres**, ce réglage contrôle seulement qui voit l'onglet lui-même ; qui peut ouvrir l'annuaire se règle avec **Afficher dans l'annuaire** sur la page Portail des membres (voir [Paramètres de l'annuaire des membres et de la messagerie](#member-directory--messaging-settings)).
3. Cliquez sur **Enregistrer l'onglet** pour l'ajouter à votre application.

## Modifier un onglet existant {#editing-an-existing-tab}

1. Cliquez sur l'icône de modification (crayon) d'un onglet dans la liste **Onglets de l'application**.
2. Mettez à jour le nom, l'icône, l'image, le type ou les paramètres de visibilité de l'onglet.
3. Cliquez sur **Enregistrer l'onglet** pour appliquer vos modifications. Pour retirer l'onglet, cliquez plutôt sur **Supprimer l'onglet**. Supprimer un dossier ramène ses onglets au niveau supérieur.

## Réordonner les onglets {#reordering-tabs}

Vous pouvez changer l'ordre d'affichage des onglets dans l'application mobile. Utilisez les flèches **Monter** et **Descendre** de chaque onglet pour les réorganiser. Les onglets d'un dossier se déplacent à l'intérieur de ce dossier. L'ordre affiché sur cette page correspond à l'ordre que vos membres verront dans l'application.

:::info
Certains onglets peuvent apparaître automatiquement lorsque certaines conditions sont remplies -- par exemple, un onglet Diffusion en direct peut apparaître lorsqu'une diffusion est active. Les onglets ajoutés manuellement vous donnent un contrôle total sur ce que vos membres voient en tout temps.
:::

:::tip
Limitez le nombre d'onglets. Trois à cinq onglets conviennent à la plupart des églises. Un trop grand nombre d'onglets peut rendre la navigation confuse pour vos membres.
:::

## Thème de l'application {#app-theme}

**Mobile > Thème de l'application** (`/mobile/theme`) définit les couleurs utilisées par l'application B1, le portail des membres et la borne de pointage. Vous avez besoin de l'autorisation **Modifier les paramètres de l'église**.

1. Développez **Mode clair** ou **Mode sombre**.
2. Pour chaque couleur -- **Arrière-plan**, **Surface**, **Principale**, **Contraste principal** (texte sur les boutons et les en-têtes de couleur principale), **Secondaire** et **Couleur du texte** -- cliquez sur la pastille pour choisir une couleur, ou saisissez-la dans la zone **Hex**. L'**Aperçu** ci-dessous montre un en-tête, une carte et un bouton dans vos couleurs.
3. Cliquez sur **Enregistrer**.

Cliquez sur **Rétablir les valeurs par défaut** pour revenir aux couleurs standard. Le thème **Personnalisé** de B1 Admin utilise aussi la couleur **Principale** du mode clair -- voir [Gérer votre profil](../profile/managing-profile.md).

## Paramètres de l'annuaire des membres et de la messagerie {#member-directory--messaging-settings}

L'élément **Portail des membres** de la même section Mobile (`/mobile/b1-mobile`, intitulé **Paramètres du portail**) contient les paramètres qui régissent l'annuaire des membres et la messagerie privée dans l'expérience B1.church. Vous avez besoin de l'autorisation **Modifier les paramètres de l'église**. Modifiez l'un des paramètres ci-dessous, puis cliquez sur **Enregistrer** au bas de la page :

- **Groupe d'approbation de l'annuaire** -- Le groupe qui examine les modifications de l'annuaire des membres, ainsi que les [demandes de suppression de compte](../profile/account-deletion.md), avant qu'elles ne prennent effet.
- **Afficher dans l'annuaire** -- Qui peut ouvrir l'annuaire des membres et qui y figure : **Administrateurs seulement**, **Membres et plus** (par défaut), **Participants réguliers et plus** ou **Visiteurs et plus**. Les personnes dont le statut de membre est inférieur au niveau choisi ne voient pas l'annuaire et n'y figurent pas. **Administrateurs seulement** ferme l'annuaire à tous sauf au personnel disposant de l'autorisation Personnes &gt; Voir (le statut de membre Personnel seul ne suffit pas) ; ces personnes peuvent toujours ouvrir l'annuaire et voir tout le monde, quel que soit ce réglage. Les invités ne sont jamais inclus, puisque toute personne qui s'inscrit en ligne d'elle-même commence comme invité.
- **Préférence de visibilité** -- Définit la valeur par défaut de toute l'église pour les membres qui n'ont pas encore choisi leur propre réglage. **Adresse**, **Numéro de téléphone** et **Courriel** ont chacun leur liste déroulante (chacune commence à **Membres**), avec les mêmes cinq niveaux disponibles partout où la visibilité est configurée :
  - **Tout le monde** -- visible par n'importe qui, y compris les visiteurs anonymes
  - **Membres** -- visible seulement pour les personnes ayant une fiche de membre ou de personnel
  - **Groupes seulement** -- visible seulement pour les personnes partageant un groupe avec cette personne, ainsi que le personnel
  - **Responsables de mes groupes et personnel** -- visible seulement pour les responsables d'un groupe auquel cette personne appartient, ainsi que le personnel
  - **Personnel seulement** -- visible seulement pour le personnel (toute personne dont le statut de membre est Personnel, ou qui dispose de l'autorisation Personnes &gt; Voir), et pour la personne elle-même

  Dans ces niveaux, le « personnel » désigne toute personne dont le statut de membre est Personnel ou qui dispose de l'autorisation Personnes &gt; Voir. Les modifications de groupes prennent effet immédiatement : une personne qui rejoint un groupe, ou qui en devient responsable, peut voir les coordonnées **Groupes seulement** ou **Responsables de mes groupes et personnel** des membres de ce groupe sans se déconnecter puis se reconnecter.

  Les membres peuvent remplacer ces valeurs par défaut pour leur propre fiche depuis l'onglet **Confidentialité** de leur profil dans la PWA B1.church -- voir [Modifier votre profil](/docs/b1-church/getting-started/me-page).
- **Âge minimum pour les messages privés** -- Une mesure de protection des enfants. B1 n'ouvrira pas une **nouvelle** conversation de messagerie privée lorsque l'une des deux personnes est plus jeune que cet âge, d'après sa date de naissance (le rôle familial sert de solution de rechange lorsqu'aucune date de naissance n'est au dossier). Les personnes plus jeunes restent entièrement visibles dans l'annuaire -- seule la messagerie directe est bloquée, dans **les deux sens**, pour tout le monde, y compris le personnel. Les conversations de groupe et la messagerie avec les parents d'un enfant fonctionnent toujours. Les options sont Désactivé, 13, 16 ou 18 ; la valeur par défaut est **18**. Les conversations existantes ne sont pas touchées.

:::tip
Comme la vérification de l'âge minimum repose sur les dates de naissance, assurez-vous que les dates de naissance des enfants de votre communauté sont renseignées. Ce paramètre fait partie de la même famille de mesures de protection de l'enfance que les [contrôles de sécurité du pointage](../attendance/checkin-safety.md).
:::

### Invitation à se connecter sur l'écran d'accueil {#home-screen-sign-in-prompt}

Les visiteurs qui ouvrent l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sans se connecter voient une courte invitation -- par défaut, *« Connectez-vous pour voir vos groupes, vos dons et plus encore. »* -- à côté d'un bouton **Se connecter**. Les paramètres **Invitation à se connecter sur l'écran d'accueil** de la même page Portail des membres (`/mobile/b1-mobile`) vous permettent de la modifier :

- **Afficher l'invitation à se connecter sur l'écran d'accueil** -- Désactivez cette option pour masquer à la fois l'invitation et le bouton **Se connecter** de l'écran d'accueil. Les visiteurs peuvent toujours se connecter depuis le menu de l'application.
- **Texte de l'invitation à se connecter** -- Remplacez la formulation par défaut par votre propre message (jusqu'à 150 caractères). Laissez vide pour utiliser la valeur par défaut. Cette zone est désactivée lorsque l'invitation est désactivée.

Cliquez sur **Enregistrer** pour appliquer. Un message **Enregistré** confirme la modification. L'enregistrement actualise les paramètres mis en cache de l'application, de sorte que la modification apparaît la prochaine fois que l'écran d'accueil se charge.

### Page de demande d'événement {#event-request-page}

Les membres qui [demandent un événement](../../b1-church/events/requesting-events.md) dans l'application voient une courte ligne en haut de la page **Demander un événement** -- par défaut, *« Le personnel approuve chaque salle et chaque élément. »* Le paramètre **Page de demande d'événement** de la même page Portail des membres (`/mobile/b1-mobile`) vous permet de la remplacer par vos propres instructions, comme des règles de réservation, le préavis à respecter ou des conditions :

1. Saisissez votre texte dans **Instructions de demande d'événement** (jusqu'à 1 000 caractères). Les sauts de ligne sont conservés.
2. Cliquez sur **Enregistrer**.

Laissez le champ vide pour conserver la ligne par défaut.

### Tuiles de l'écran d'accueil {#home-screen-tiles}

Les onglets qui ont une photo (voir **Image** dans [Ajouter un nouvel onglet](#adding-a-new-tab)) apparaissent sur l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sous forme de tuiles photo, dans une section portant le nom de votre église. Cela inclut un onglet Verset du jour, si vous lui donnez une photo. Les onglets avec photo apparaissent aussi dans la barre d'onglets.

Le paramètre **Tuiles de l'écran d'accueil** de la même page Portail des membres (`/mobile/b1-mobile`) contrôle la disposition de ces tuiles. Choisissez une **Disposition** :

- **Grille** -- Deux tuiles par rangée (par défaut). Lorsque le nombre de tuiles est impair, la première tuile occupe toute la largeur.
- **Rangée défilante** -- Une seule rangée de tuiles que les membres font défiler latéralement.
- **Défilement (automatique)** -- La même rangée défilante latérale, mais qui se déplace aussi toute seule, en avançant d'une tuile environ toutes les quatre secondes, puis revenant à la première tuile après la dernière. Elle s'arrête lorsqu'un membre touche, survole ou se déplace dans la rangée avec la touche Tab, puis reprend quelques secondes plus tard. Sur les appareils dont la réduction des animations est activée, la rangée reste immobile et fonctionne comme **Rangée défilante**.
- **Liste** -- Une liste avec une petite vignette photo à côté du nom de chaque onglet.
- **Grille et liste** -- Les trois premiers onglets avec photo en grille, la première tuile occupant toute la largeur, et les trois suivants listés en dessous, avec une petite vignette à côté de chaque nom. S'il y en a plus de trois, l'en-tête de la section affiche un lien **Tout** qui ouvre la page **Plus** de l'application, listant chaque onglet.
- **Défilement (automatique) et liste** -- Chaque onglet avec photo dans la rangée qui avance d'elle-même, décrite ci-dessus, avec les trois premiers qui ne sont pas déjà dans le menu de l'application (la barre d'onglets sur téléphone, l'en-tête sur ordinateur) aussi listés en dessous, et le même lien **Tout** s'il y en a plus de trois.

Dans les deux dispositions défilantes, lorsqu'il y a plus de tuiles qu'il n'en tient à l'écran, une rangée de points apparaît sous les tuiles, un point par tuile, le point de la tuile courante étant plein. Les membres peuvent toucher un point pour aller directement à cette tuile.

Cliquez sur **Enregistrer** pour appliquer.

### Sections de l'écran d'accueil {#home-screen-sections}

Les membres connectés voient toujours leur propre historique de présences et les formulaires qu'ils ont soumis sur la [page Moi](/docs/b1-church/getting-started/me-page). Les commutateurs **Sections de l'écran d'accueil** de la même page Portail des membres (`/mobile/b1-mobile`) permettent de les afficher aussi sur l'écran d'accueil :

- **Afficher Mes présences à l'accueil** -- Ajoute une section **Mes présences** indiquant combien de fois le membre a assisté au cours des 90 derniers jours, ses deux visites les plus récentes, et un lien **Historique** vers sa liste complète de présences.
- **Afficher Mes formulaires à l'accueil** -- Ajoute une section **Mes formulaires** avec les deux soumissions de formulaire les plus récentes du membre et un lien **Tous les formulaires**.

Ces deux options sont désactivées par défaut. Une section n'apparaît que pour les membres connectés qui ont au moins un élément à afficher.

- **Afficher les nouvelles à l'accueil** -- Ajoute une section **Nouvelles** juste sous la salutation, qui affiche vos cinq derniers billets de [blogue](../website/blog.md) publiés sous forme de cartes photo dans une rangée qui défile d'elle-même. Toucher une carte ouvre le billet complet dans l'application, et un lien **Toutes les nouvelles** liste vos billets récents. Une fois l'option activée, **Seulement cette catégorie** vous permet de choisir une catégorie de blogue (par exemple, *Annonces*) afin que seuls ces billets apparaissent ; laissez **Tous les billets** pour tout afficher. Les nouvelles sont visibles par toute personne qui ouvre l'application, connectée ou non, puisque les billets de blogue sont publics sur votre site web. Cette option est désactivée par défaut et n'apparaît que lorsque vous avez au moins un billet publié.

Cliquez sur **Enregistrer** pour appliquer.

## Notifications push {#push-notifications}

**Mobile > Notifications push** (`/mobile/notifications`) envoie ou programme une notification push aux personnes qui ont installé l'application B1 et activé les notifications. Vous avez besoin de **Modifier le contenu** pour envoyer à tout le monde, ou de **Modifier les membres du groupe** pour envoyer à un groupe.

1. Cliquez sur **Envoyer la notification**.
2. Choisissez le **Public** : **Toutes les personnes ayant l'application**, ou l'un de vos groupes. B1 indique combien de personnes la notification atteindra et combien ont désactivé les notifications push ; vous êtes exclu de votre propre envoi.
3. Saisissez un **Titre** (jusqu'à 80 caractères) et un **Message** (jusqu'à 240 caractères), et facultativement une **URL du lien ou du feuillet** et une **URL de l'image** (les mêmes champs qu'une [notification de groupe](../groups/group-members.md#sending-push-notifications-to-group-members)).
4. Sous **Quand**, conservez **Envoyer maintenant**, ou choisissez **Programmer pour plus tard** et sélectionnez une heure d'envoi **Envoyer à** dans le futur.
5. Cliquez sur **Envoyer la notification** (ou **Programmer la notification**).

La page liste les notifications **Programmées** (avec **Modifier**, **Envoyer maintenant** et **Annuler** sur chacune) et les notifications **Récentes** avec leur statut, comme *Envoyée : 12 sur 15*, *Annulée* ou *Manquée (l'heure d'envoi est passée)*. Cliquez sur **Retirer** pour retirer une notification terminée de la liste, ou sur **Tout effacer** pour retirer toutes les notifications envoyées, en échec ou annulées. Les heures sont affichées selon le [fuseau horaire](./church-settings.md#time-zone) de votre église, ou celui de votre ordinateur si l'église n'en a pas défini. Les destinataires d'une notification programmée sont recalculés au moment de l'envoi.

Une notification envoyée par B1 plus de 30 minutes après l'heure prévue est marquée *Manquée* et n'est pas envoyée ; une notification qui échoue trois fois affiche *Échec* avec l'erreur. Retirer une notification de la liste ne la retire pas des appareils des personnes qui l'ont déjà reçue. Lorsqu'une notification n'a pas de lien, la toucher ouvre la liste des notifications de l'application pour une notification à toute l'église, ou la page du groupe pour une notification de groupe. Les membres qui ont désactivé **Annonces de l'église** dans leurs [préférences de notification](../../b1-church/getting-started/notification-preferences.md) ne reçoivent pas ces notifications, qu'elles soient destinées à tout le monde ou à un groupe.

## Emplacement de ces onglets {#where-these-tabs-appear}

Les onglets que vous configurez ici s'affichent dans la **PWA B1.church** que vos membres installent depuis n'importe quelle page de `https://yourchurchname.b1.church`. Les modifications apportées sur cette page sont prises en compte la prochaine fois qu'un membre ouvre l'application.

Sur un téléphone, la barre d'onglets du bas affiche **Accueil**, jusqu'à trois de vos onglets, et **Plus** ; sur un ordinateur, l'en-tête en affiche jusqu'à cinq. Les écrans intégrés (comme Prédications, Don ou Groupes) obtiennent ces emplacements en premier, et les onglets **Page interne** remplissent les emplacements restants. Les onglets **URL externe** et **Verset du jour** n'obtiennent jamais d'emplacement. Chaque onglet, y compris ceux qui ne tiennent pas, figure sur la page **Plus** de l'application.

Les onglets placés dans un onglet **Dossier** font exception : ils apparaissent sur l'écran propre au dossier, que les membres ouvrent en touchant le dossier. Lorsque le dossier n'obtient pas d'emplacement dans la barre d'onglets ou l'en-tête, la section **Plus de** de l'accueil affiche aussi le nom du dossier avec ses onglets sous forme de boutons, dans l'ordre défini ici. Cet écran présente les onglets sous forme de tuiles photo si chacun d'eux a une image, ou sous forme de liste dans le cas contraire. Un dossier qui ne contient aucun onglet visible par un membre est masqué pour ce membre. Voir [Onglets de dossier](../../b1-church/getting-started/navigating.md#folder-tabs). Voir [Navigation dans B1App](../../b1-church/getting-started/navigating.md) pour ce que voient les membres.

## Étapes suivantes {#next-steps}

- [Paramètres de l'église](./church-settings.md) -- Configurez les informations et l'image de marque de votre église
- [Rôles et autorisations](./roles-permissions.md) -- Gérez les accès de votre équipe

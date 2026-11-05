---
title: "Paramètres de l'application mobile"
---

# Paramètres de l'application mobile

<div class="article-intro">

La page Paramètres de l'application mobile vous permet de configurer les onglets de navigation qui apparaissent dans l'**expérience mobile B1.church (PWA)** de vos membres. Vous contrôlez quels onglets sont visibles, vers quoi ils mènent et comment ils sont affichés.

</div>

## Vidéo de formation

<YouTube id="ydY7WGK16fE" title="Personnaliser l'application membre de votre église dans B1" />

:::info L'application mobile B1 native est obsolète
Les onglets configurés ici sont diffusés par la [Application web progressive (PWA) de B1.church](/docs/b1-church/getting-started/installing-pwa), qui a remplacé l'application mobile B1 native. Partagez la page d'installation de votre église -- `https://votreeglise.b1.church/mobile/install` -- avec vos membres ; elle les guide pour installer l'application sur leur appareil, sans téléchargement depuis l'App Store ni Google Play.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de l'autorisation « Modifier les paramètres de l'église ». Consultez [Rôles et autorisations](./roles-permissions.md) si vous n'y avez pas accès.
- Configurez d'abord vos [Paramètres de l'église](./church-settings.md), y compris le nom de votre église et son image de marque

</div>

## Accéder aux paramètres de navigation

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **Navigation** (`/mobile/navigation`).
3. La page Navigation affiche vos onglets d'application actuels.

## Ajouter un nouvel onglet {#adding-a-new-tab}

1. Cliquez sur le bouton **Ajouter un onglet** en haut de la page.
2. Remplissez les détails de l'onglet :
   - **Nom** -- Le libellé qui apparaît sur l'onglet (par exemple « Sermons » ou « Dons »).
   - **Icône** -- Cliquez sur le sélecteur d'icônes pour choisir une icône pour votre onglet.
   - **Image** -- Cliquez sur **Sélectionner une image** (ou **Changer l'image**) pour attribuer une photo à l'onglet. Les onglets avec une photo apparaissent comme des tuiles photo sur l'écran d'accueil de l'application -- voir [Tuiles de l'écran d'accueil](#home-screen-tiles).
   - **Type d'onglet** -- Choisissez parmi des options comme Bible, Diffusion en direct, Don, Site web, et plus encore.
   - **URL** -- Saisissez l'adresse web vers laquelle l'onglet doit mener.
   - **Visibilité** -- Contrôlez qui peut voir cet onglet (tout le monde, membres seulement, etc.). Pour un onglet **Annuaire des membres**, cela ne contrôle que qui voit l'onglet lui-même ; qui peut ouvrir l'annuaire est défini par **Afficher dans l'annuaire** sur la page Portail des membres (voir [Paramètres de l'annuaire des membres et de la messagerie](#member-directory--messaging-settings)).
3. Cliquez sur **Enregistrer l'onglet** pour l'ajouter à votre application.

## Modifier un onglet existant

1. Cliquez sur n'importe quel onglet existant dans la liste **Onglets de l'application**.
2. Modifiez le nom, l'icône, l'URL, le type ou les paramètres de visibilité de l'onglet.
3. Cliquez sur **Enregistrer l'onglet** pour appliquer vos modifications.

## Réorganiser les onglets

Vous pouvez modifier l'ordre dans lequel les onglets apparaissent dans l'application mobile. Glissez-déposez les onglets dans la liste pour les réorganiser. L'ordre affiché sur cette page correspond à celui que verront vos membres dans l'application.

:::info
Certains onglets peuvent apparaître automatiquement lorsque certaines conditions sont remplies -- par exemple, un onglet Diffusion en direct peut apparaître lorsqu'une diffusion est active. Les onglets ajoutés manuellement vous donnent un contrôle total sur ce que voient vos membres en tout temps.
:::

:::tip
Gardez un nombre d'onglets raisonnable. Trois à cinq onglets conviennent à la plupart des églises. Trop d'onglets peuvent rendre la navigation confuse pour vos membres.
:::

## Paramètres de l'annuaire des membres et de la messagerie {#member-directory--messaging-settings}

L'élément **Portail des membres**, dans la même section Mobile, regroupe les paramètres qui régissent l'annuaire des membres et la messagerie privée dans l'expérience B1.church :

- **Groupe d'approbation de l'annuaire** -- Le groupe qui examine les mises à jour de l'annuaire des membres, ainsi que les [demandes de suppression de compte](../profile/account-deletion.md), avant qu'elles ne prennent effet.
- **Afficher dans l'annuaire** -- Qui peut ouvrir l'annuaire des membres et qui y figure : **Administrateurs seulement**, **Membres et plus** (par défaut), **Participants réguliers et plus**, ou **Visiteurs et plus**. Les personnes dont le statut de membre est inférieur au niveau choisi ne voient pas l'annuaire et n'y figurent pas. **Administrateurs seulement** ferme l'annuaire à tous sauf au personnel disposant de l'autorisation Personnes &gt; Voir (un statut de membre Personnel ne suffit pas à elle seule). Ces personnes peuvent toujours ouvrir l'annuaire et voir tout le monde, quel que soit ce paramètre. Les invités ne sont jamais inclus, puisque toute personne qui s'inscrit en ligne commence comme invité.
- **Préférence de visibilité** -- Définit la valeur par défaut de toute l'église pour les membres qui n'ont pas encore choisi leur propre réglage. **Adresse**, **Numéro de téléphone** et **Courriel** ont chacun leur propre liste déroulante, avec les mêmes cinq niveaux disponibles partout où la visibilité est configurée :
  - **Tout le monde** -- visible par n'importe qui, y compris les visiteurs anonymes
  - **Membres** -- visible seulement par les personnes ayant une fiche de membre ou de personnel
  - **Groupes seulement** -- visible seulement par les personnes qui partagent un groupe avec cette personne, ainsi que le personnel
  - **Mes responsables de groupe et le personnel** -- visible seulement par les responsables d'un groupe auquel cette personne appartient, ainsi que le personnel
  - **Personnel seulement** -- visible seulement par le personnel (toute personne dont le statut de membre est Personnel, ou qui dispose de l'autorisation Personnes &gt; Voir), ainsi que par la personne elle-même

  Dans ces niveaux, « personnel » désigne toute personne dont le statut de membre est Personnel ou qui dispose de l'autorisation Personnes &gt; Voir. Les changements de groupe prennent effet immédiatement : une personne qui rejoint un groupe, ou qui devient responsable de groupe, peut voir les détails **Groupes seulement** ou **Mes responsables de groupe et le personnel** des membres de ce groupe, sans se déconnecter puis se reconnecter.

  Les membres peuvent remplacer ces valeurs par défaut pour leur propre fiche depuis l'onglet **Confidentialité** de leur profil dans la PWA B1.church -- voir [Modifier votre profil](/docs/b1-church/getting-started/me-page).
- **Âge minimum pour les messages privés** -- Une mesure de protection des enfants. B1 n'ouvrira pas une **nouvelle** conversation privée lorsque l'une des deux personnes est sous cet âge, selon sa date de naissance (le rôle dans le foyer sert de solution de rechange lorsqu'aucune date de naissance n'est au dossier). Les personnes sous cet âge restent entièrement visibles dans l'annuaire -- seule la messagerie directe est bloquée, **dans les deux sens**, pour tout le monde, y compris le personnel. Les conversations de groupe et la messagerie avec les parents d'un enfant restent possibles. Les options sont Désactivé, 13, 16 ou 18 ; la valeur par défaut est **18**. Les conversations existantes ne sont pas touchées.

:::tip
Puisque la vérification de l'âge minimum repose sur les dates de naissance, assurez-vous que les dates de naissance sont renseignées pour les enfants de votre communauté. Ce paramètre fait partie de la même famille de mesures de protection des enfants que les [contrôles de sécurité de l'enregistrement](../attendance/checkin-safety.md).
:::

### Invite de connexion sur l'écran d'accueil {#home-screen-sign-in-prompt}

Les visiteurs qui ouvrent l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sans se connecter voient une courte invite -- par défaut, *« Connectez-vous pour voir vos groupes, vos dons, et plus encore. »* -- à côté d'un bouton **Se connecter**. Les paramètres **Invite de connexion sur l'écran d'accueil**, sur la même page Portail des membres (`/mobile/b1-mobile`), vous permettent de la modifier :

- **Afficher l'invite de connexion sur l'écran d'accueil de l'application** -- Désactivez cette option pour masquer à la fois l'invite et le bouton **Se connecter** de l'écran d'accueil. Les visiteurs peuvent toujours se connecter depuis le menu de l'application.
- **Texte de l'invite de connexion** -- Remplacez le texte par défaut par votre propre message (jusqu'à 150 caractères). Laissez vide pour utiliser le texte par défaut. Cette case est désactivée lorsque l'invite est désactivée.

Cliquez sur **Enregistrer** pour appliquer. Un message **Enregistré** confirme le changement. L'enregistrement actualise les paramètres en cache de l'application, de sorte que le changement apparaît la prochaine fois que l'écran d'accueil se charge.

### Tuiles de l'écran d'accueil {#home-screen-tiles}

Les onglets qui ont une photo (voir **Image** sous [Ajouter un nouvel onglet](#adding-a-new-tab)) apparaissent sur l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sous forme de tuiles photo, dans une section portant le nom de votre église. Cela comprend un onglet Verset du jour, si vous lui donnez une photo. Les onglets photo apparaissent aussi dans la barre d'onglets.

Le paramètre **Tuiles de l'écran d'accueil**, sur la même page Portail des membres (`/mobile/b1-mobile`), contrôle la disposition de ces tuiles. Choisissez une **disposition** :

- **Grille** -- Deux tuiles par rangée (par défaut). Lorsque le nombre de tuiles est impair, la première tuile occupe toute la largeur.
- **Rangée défilante** -- Une seule rangée de tuiles que les membres font défiler latéralement.
- **Défilement (automatique)** -- La même rangée défilante latérale, mais elle se déplace aussi toute seule, en passant à la tuile suivante environ toutes les quatre secondes, et revient au début à la fin. Elle se met en pause lorsqu'un membre la touche, la survole ou s'y déplace avec la touche de tabulation, puis reprend quelques secondes plus tard. Sur les appareils qui réduisent les animations, la rangée reste immobile et fonctionne comme **Rangée défilante**.
- **Liste** -- Une liste avec une petite vignette photo à côté du nom de chaque onglet.

Cliquez sur **Enregistrer** pour appliquer.

### Sections de l'écran d'accueil {#home-screen-sections}

Les membres connectés voient toujours leur historique de présences et leurs formulaires soumis sur la [page Moi](/docs/b1-church/getting-started/me-page). Les boutons **Sections de l'écran d'accueil**, sur la même page Portail des membres (`/mobile/b1-mobile`), permettent de les afficher aussi sur l'écran d'accueil :

- **Afficher Mes présences sur l'accueil** -- Ajoute une section **Mes présences** indiquant le nombre de fois où le membre s'est présenté au cours des 90 derniers jours, ses deux visites les plus récentes, et un lien **Historique** vers sa liste complète de présences.
- **Afficher Mes formulaires sur l'accueil** -- Ajoute une section **Mes formulaires** avec les deux soumissions de formulaire les plus récentes du membre et un lien **Tous les formulaires**.

Ces deux options sont désactivées par défaut. Une section n'apparaît que pour les membres connectés qui ont au moins un enregistrement à afficher. Cliquez sur **Enregistrer** pour appliquer.

## Où apparaissent ces onglets

Les onglets que vous configurez ici sont affichés dans la **PWA B1.church** que vos membres installent depuis n'importe quelle page de `https://votreeglise.b1.church`. Les modifications apportées sur cette page sont prises en compte la prochaine fois qu'un membre ouvre l'application.

Sur un téléphone, la barre d'onglets du bas affiche **Accueil**, jusqu'à trois de vos onglets et **Plus** ; sur un ordinateur, l'en-tête affiche jusqu'à cinq onglets. Les écrans intégrés (comme Sermons, Dons ou Groupes) obtiennent leurs emplacements en premier, et les onglets **Page interne** remplissent les emplacements restants. Les onglets **URL externe** et **Verset du jour** n'obtiennent jamais d'emplacement. Chaque onglet, y compris ceux qui ne tiennent pas dans la barre, est listé sur la page **Plus** de l'application. Consultez [Naviguer dans B1App](/docs/b1-church/getting-started/navigating) pour voir ce que voient les membres. (Les onglets sont aussi affichés par l'[application mobile B1 native](/docs/b1-mobile/) héritée pour les membres qui l'utilisent encore, mais cette application est obsolète et n'est plus mise à jour.)

## Étapes suivantes

- [Paramètres de l'église](./church-settings.md) -- configurer les renseignements de votre église et son image de marque
- [Rôles et autorisations](./roles-permissions.md) -- gérer les accès de votre équipe

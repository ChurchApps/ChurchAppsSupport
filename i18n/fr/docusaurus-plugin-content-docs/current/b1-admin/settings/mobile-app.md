---
title: "Paramètres de l'application mobile"
---

# Paramètres de l'application mobile

<div class="article-intro">

La page Paramètres de l'application mobile vous permet de configurer les onglets de navigation qui apparaissent dans l'**expérience mobile B1.church (PWA)** pour les membres de votre église. Vous contrôlez les onglets visibles, leur destination et leur mode d'affichage.

</div>

:::info L'application mobile native B1 est obsolète
Les onglets configurés ici sont diffusés via la [Progressive Web App (PWA) B1.church](/docs/b1-church/getting-started/installing-pwa), qui a remplacé l'application mobile native B1. Partagez avec vos membres la page d'installation de votre église, `https://yourchurchname.b1.church/mobile/install` : elle les guide pour installer l'application sur leur appareil, sans passer par l'App Store ni par Google Play.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation « Modifier les paramètres de l'église ». Voir [Rôles et autorisations](./roles-permissions.md) si vous n'y avez pas accès.
- Configurez d'abord vos [paramètres de l'église](./church-settings.md), notamment le nom de l'église et son identité visuelle.

</div>

## Accéder aux paramètres de navigation

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **Navigation** (`/mobile/navigation`).
3. La page Navigation affiche les onglets actuels de votre application.

## Ajouter un nouvel onglet

1. Cliquez sur le bouton **Ajouter un onglet** en haut de la page.
2. Renseignez les détails de l'onglet :
   - **Nom** : le libellé affiché sur l'onglet (par exemple, « Prédications » ou « Don »).
   - **Icône** : cliquez sur le sélecteur d'icônes pour choisir une icône pour votre onglet.
   - **Image** : cliquez sur **Sélectionner une image** (ou **Changer l'image**) pour attribuer une photo à l'onglet. Les onglets dotés d'une photo apparaissent sous forme de vignettes photo sur l'écran d'accueil de l'application ; voir [Vignettes de l'écran d'accueil](#home-screen-tiles).
   - **Type d'onglet** : choisissez parmi des options comme Bible, Diffusion en direct, Don, Site web, et d'autres.
   - **URL** : saisissez l'adresse web vers laquelle l'onglet doit pointer.
   - **Visibilité** : définissez qui peut voir cet onglet (tout le monde, membres uniquement, etc.). Pour un onglet **Annuaire des membres**, ce réglage ne contrôle que qui voit l'onglet lui-même ; qui peut ouvrir l'annuaire est défini par **Afficher dans l'annuaire** sur la page Portail membre (voir [Paramètres de l'annuaire des membres et de la messagerie](#member-directory--messaging-settings)).
3. Cliquez sur **Enregistrer l'onglet** pour l'ajouter à votre application.

## Modifier un onglet existant

1. Cliquez sur n'importe quel onglet existant dans la liste **Onglets de l'application**.
2. Modifiez le nom, l'icône, l'URL, le type ou les paramètres de visibilité de l'onglet.
3. Cliquez sur **Enregistrer l'onglet** pour appliquer vos modifications.

## Réorganiser les onglets

Vous pouvez modifier l'ordre d'affichage des onglets dans l'application mobile. Faites glisser les onglets dans la liste pour les réorganiser. L'ordre affiché sur cette page correspond à celui que verront vos membres dans l'application.

:::info
Certains onglets peuvent apparaître automatiquement lorsque certaines conditions sont remplies : par exemple, un onglet Diffusion en direct peut s'afficher lorsqu'une diffusion est active. Les onglets ajoutés manuellement vous donnent un contrôle total sur ce que voient vos membres à tout moment.
:::

:::tip
Limitez le nombre d'onglets. Trois à cinq onglets conviennent à la plupart des églises. Trop d'onglets peuvent rendre la navigation confuse pour vos membres.
:::

## Paramètres de l'annuaire des membres et de la messagerie

L'élément **Portail membre**, dans la même section Mobile, regroupe les paramètres qui régissent l'annuaire des membres et la messagerie privée dans l'expérience B1.church :

- **Groupe d'approbation de l'annuaire** : le groupe qui examine les mises à jour de l'annuaire des membres, ainsi que les [demandes de suppression de compte](../profile/account-deletion.md), avant leur prise en compte.
- **Afficher dans l'annuaire** : qui peut ouvrir l'annuaire des membres et qui y figure : **Administrateurs uniquement**, **Membres et au-dessus** (par défaut), **Participants réguliers et au-dessus**, ou **Visiteurs et au-dessus**. Les personnes dont le statut de membre est inférieur au niveau choisi ne voient pas l'annuaire et n'y figurent pas. **Administrateurs uniquement** ferme l'annuaire à tous, sauf au personnel disposant de l'autorisation Personnes > Afficher (le statut de membre Personnel ne suffit pas), qui peut toujours ouvrir l'annuaire et voir tout le monde, quel que soit ce réglage. Les invités ne sont jamais inclus, car toute personne qui s'inscrit en ligne commence en tant qu'invité.
- **Préférence de visibilité** : définit la valeur par défaut pour toute l'église, pour les membres qui n'ont pas encore choisi leur propre réglage. **Adresse**, **Numéro de téléphone** et **E-mail** disposent chacun de leur propre liste déroulante, avec les mêmes cinq niveaux disponibles partout où la visibilité est configurée :
  - **Tout le monde** : visible par n'importe qui, y compris les visiteurs anonymes
  - **Membres** : visible uniquement pour les personnes ayant une fiche Membre ou Personnel
  - **Groupes uniquement** : visible uniquement pour les personnes partageant un groupe avec cette personne, ainsi que pour le personnel
  - **Mes responsables de groupe et le personnel** : visible uniquement pour les responsables d'un groupe auquel cette personne appartient, ainsi que pour le personnel
  - **Personnel uniquement** : visible uniquement pour le personnel (toute personne ayant le statut de membre Personnel ou l'autorisation Personnes > Afficher), ainsi que pour la personne elle-même

  Dans ces niveaux, « Personnel » désigne toute personne ayant le statut de membre Personnel ou l'autorisation Personnes > Afficher. Les changements de groupe prennent effet immédiatement : une personne qui rejoint un groupe, ou qui en devient responsable, peut voir les coordonnées des membres de ce groupe définies sur **Groupes uniquement** ou **Mes responsables de groupe et le personnel**, sans avoir à se déconnecter puis se reconnecter.

  Les membres peuvent remplacer ces valeurs par défaut pour leur propre fiche depuis l'onglet **Confidentialité** de leur profil dans la PWA B1.church ; voir [Modifier votre profil](/docs/b1-church/getting-started/me-page).
- **Âge minimum pour les messages privés** : un contrôle de protection des enfants. B1 n'ouvrira pas de **nouvelle** conversation privée si l'une des deux personnes est âgée de moins de cet âge, d'après sa date de naissance (le rôle dans le foyer sert de solution de repli lorsqu'aucune date de naissance n'est enregistrée). Les personnes mineures restent entièrement visibles dans l'annuaire ; seule la messagerie directe est bloquée, dans **les deux sens**, pour tout le monde, y compris le personnel. Les conversations de groupe et la messagerie avec les parents d'un enfant restent possibles. Les options sont Désactivé, 13, 16 ou 18 ; la valeur par défaut est **18**. Les conversations existantes ne sont pas affectées.

:::tip
Le contrôle de l'âge minimum reposant sur les dates de naissance, veillez à renseigner les dates de naissance des enfants de votre communauté. Ce paramètre appartient à la même famille de protections des enfants que les [contrôles de sécurité de l'enregistrement](../attendance/checkin-safety.md).
:::

### Invite de connexion sur l'écran d'accueil

Les visiteurs qui ouvrent l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sans se connecter voient une courte invite, par défaut *« Connectez-vous pour voir vos groupes, vos dons, et plus encore. »*, accompagnée d'un bouton **Se connecter**. Les paramètres **Invite de connexion sur l'écran d'accueil**, sur la même page Portail membre (`/mobile/b1-mobile`), vous permettent de la modifier :

- **Afficher l'invite de connexion sur l'écran d'accueil de l'application** : désactivez cette option pour masquer à la fois l'invite et le bouton **Se connecter** de l'écran d'accueil. Les visiteurs peuvent toujours se connecter depuis le menu de l'application.
- **Texte de l'invite de connexion** : remplacez le texte par défaut par votre propre message (jusqu'à 150 caractères). Laissez ce champ vide pour utiliser le texte par défaut. Cette zone est désactivée lorsque l'invite est masquée.

Cliquez sur **Enregistrer** pour appliquer. Un message **Enregistré** confirme la modification. L'enregistrement actualise les paramètres mis en cache de l'application, si bien que la modification apparaît au prochain chargement de l'écran d'accueil.

### Vignettes de l'écran d'accueil

Les onglets dotés d'une photo (voir **Image** dans [Ajouter un nouvel onglet](#adding-a-new-tab)) apparaissent sur l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sous forme de vignettes photo, dans une section portant le nom de votre église. Cela inclut un onglet Verset du jour, si vous lui attribuez une photo. Les onglets photo apparaissent aussi dans la barre des onglets.

Le paramètre **Vignettes de l'écran d'accueil**, sur la même page Portail membre (`/mobile/b1-mobile`), contrôle la mise en page de ces vignettes. Choisissez une **Disposition** :

- **Grille** : deux vignettes par ligne (par défaut). Si le nombre de vignettes est impair, la première occupe toute la largeur.
- **Ligne défilante** : une seule ligne de vignettes que les membres font défiler latéralement.
- **Défilement automatique** : la même ligne défilante latérale, mais qui avance d'elle-même, d'une vignette environ toutes les quatre secondes, et revient au début en fin de parcours. Le défilement se met en pause lorsqu'un membre touche, survole ou sélectionne au clavier la ligne, puis reprend quelques secondes plus tard. Sur les appareils dont la réduction des animations est activée, la ligne reste immobile et fonctionne comme **Ligne défilante**.
- **Liste** : une liste avec une petite miniature photo à côté du nom de chaque onglet.

Cliquez sur **Enregistrer** pour appliquer.

### Sections de l'écran d'accueil

Les membres connectés voient toujours leur historique de présence et leurs formulaires soumis sur la [page Moi](/docs/b1-church/getting-started/me-page). Les boutons **Sections de l'écran d'accueil**, sur la même page Portail membre (`/mobile/b1-mobile`), permettent de les afficher également sur l'écran d'accueil :

- **Afficher Ma présence sur l'accueil** : ajoute une section **Ma présence** indiquant le nombre de fois où le membre a participé au cours des 90 derniers jours, ses deux visites les plus récentes, et un lien **Historique** vers sa liste complète de présences.
- **Afficher Mes formulaires sur l'accueil** : ajoute une section **Mes formulaires** avec les deux dernières soumissions de formulaires du membre et un lien **Tous les formulaires**.

Ces deux options sont désactivées par défaut. Une section n'apparaît que pour les membres connectés qui ont au moins un élément à afficher. Cliquez sur **Enregistrer** pour appliquer.

## Où apparaissent ces onglets

Les onglets que vous configurez ici sont affichés dans la **PWA B1.church** que vos membres installent depuis n'importe quelle page de `https://yourchurchname.b1.church`. Les modifications effectuées sur cette page sont prises en compte la prochaine fois qu'un membre ouvre l'application.

Sur téléphone, la barre d'onglets inférieure affiche **Accueil**, jusqu'à trois de vos onglets, et **Plus** ; sur ordinateur, l'en-tête affiche jusqu'à cinq onglets. Les écrans intégrés (comme Prédications, Dons ou Groupes) occupent d'abord les emplacements, et les onglets **Page interne** remplissent les emplacements restants. Les onglets **URL externe** et **Verset du jour** n'occupent jamais d'emplacement. Tous les onglets, y compris ceux qui ne tiennent pas dans la barre, figurent sur la page **Plus** de l'application. Voir [Naviguer dans B1App](/docs/b1-church/getting-started/navigating) pour savoir ce que voient les membres. (Les onglets sont également affichés par l'ancienne [application native B1 Mobile](/docs/b1-mobile/) pour les membres qui l'utilisent encore, mais cette application est obsolète et n'est plus mise à jour.)

## Étapes suivantes

- [Paramètres de l'église](./church-settings.md) : configurer les informations et l'identité visuelle de votre église
- [Rôles et autorisations](./roles-permissions.md) : gérer les accès de votre équipe

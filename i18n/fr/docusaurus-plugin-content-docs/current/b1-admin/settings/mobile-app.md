---
title: "Paramètres de l'application mobile"
---

# Paramètres de l'application mobile {#mobile-app-settings}

<div class="article-intro">

La page Paramètres de l'application mobile vous permet de configurer les onglets de navigation qui apparaissent dans l'**expérience mobile B1.church (PWA)** de vos membres. Vous contrôlez quels onglets sont visibles, vers quoi ils mènent et leur mode d'affichage.

</div>

:::info L'application mobile native B1 est obsolète
Les onglets configurés ici sont diffusés via la [Progressive Web App (PWA) B1.church](/docs/b1-church/getting-started/installing-pwa), qui a remplacé l'application mobile native B1. Partagez la page d'installation de votre église (`https://yourchurchname.b1.church/mobile/install`) avec vos membres : elle les guide pour installer l'application sur leur appareil, sans téléchargement depuis l'App Store ni Google Play.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation « Modifier les paramètres de l'église ». Voir [Rôles et permissions](./roles-permissions.md) si vous n'y avez pas accès.
- Configurez d'abord vos [Paramètres de l'église](./church-settings.md), y compris le nom et l'image de marque de l'église

</div>

## Accéder aux paramètres de navigation {#accessing-navigation-settings}

1. Dans B1 Admin, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **Navigation** (`/mobile/navigation`).
3. La page Navigation affiche vos onglets d'application actuels.

## Ajouter un nouvel onglet {#adding-a-new-tab}

1. Cliquez sur le bouton **Ajouter un onglet** en haut de la page.
2. Renseignez les détails de l'onglet :
   - **Nom** : le libellé affiché sur l'onglet (par exemple, « Sermons » ou « Don »).
   - **Icône** : cliquez sur le sélecteur d'icônes pour choisir une icône pour votre onglet.
   - **Image** : cliquez sur **Sélectionner une image** (ou **Changer l'image**) pour attribuer une photo à l'onglet. Les onglets avec une photo apparaissent sous forme de vignettes photo sur l'écran d'accueil de l'application : voir [Vignettes de l'écran d'accueil](#home-screen-tiles).
   - **Type d'onglet** : choisissez parmi des options telles que Bible, Diffusion en direct, Don, Site web, et plus encore.
   - **URL** : saisissez l'adresse web vers laquelle l'onglet doit renvoyer.
   - **Visibilité** : contrôlez qui peut voir cet onglet (tout le monde, membres uniquement, etc.). Pour un onglet **Annuaire des membres**, cela ne contrôle que qui voit l'onglet lui-même ; qui peut ouvrir l'annuaire est défini par **Afficher dans l'annuaire** sur la page Portail membre (voir [Paramètres de l'annuaire des membres et de la messagerie](#member-directory--messaging-settings)).
3. Cliquez sur **Enregistrer l'onglet** pour l'ajouter à votre application.

## Modifier un onglet existant {#editing-an-existing-tab}

1. Cliquez sur n'importe quel onglet existant dans la liste **Onglets de l'application**.
2. Mettez à jour le nom, l'icône, l'URL, le type ou les paramètres de visibilité de l'onglet.
3. Cliquez sur **Enregistrer l'onglet** pour appliquer vos modifications.

## Réorganiser les onglets {#reordering-tabs}

Vous pouvez modifier l'ordre d'affichage des onglets dans l'application mobile. Faites glisser et déposez les onglets dans la liste pour les réorganiser. L'ordre affiché sur cette page correspond à celui que verront vos membres dans l'application.

:::info
Certains onglets peuvent apparaître automatiquement lorsque certaines conditions sont remplies : par exemple, un onglet Diffusion en direct peut apparaître lorsqu'une diffusion est active. Les onglets ajoutés manuellement vous donnent un contrôle total sur ce que voient vos membres à tout moment.
:::

:::tip
Limitez le nombre d'onglets. Trois à cinq onglets conviennent à la plupart des églises. Trop d'onglets peuvent rendre la navigation confuse pour vos membres.
:::

## Paramètres de l'annuaire des membres et de la messagerie {#member-directory--messaging-settings}

L'élément **Portail membre** de la même section Mobile contient les paramètres qui régissent l'annuaire des membres et la messagerie privée dans l'expérience B1.church :

- **Groupe d'approbation de l'annuaire** : le groupe qui examine les mises à jour de l'annuaire des membres et les [demandes de suppression de compte](../profile/account-deletion.md) avant qu'elles ne prennent effet.
- **Afficher dans l'annuaire** : qui peut ouvrir l'annuaire des membres et qui y figure : **Personnel uniquement**, **Membres et personnel** (par défaut), **Participants réguliers et plus** ou **Tout le monde (y compris les visiteurs)**. Les personnes dont le statut de membre est inférieur au niveau choisi ne voient pas l'annuaire et n'y figurent pas. Le personnel disposant de l'autorisation Personnes &gt; Voir peut toujours ouvrir l'annuaire et voir tout le monde, quel que soit ce paramètre.
- **Préférence de visibilité** : définit la valeur par défaut à l'échelle de l'église pour les membres qui n'ont pas encore choisi leur propre paramètre. **Adresse**, **Numéro de téléphone** et **E-mail** disposent chacun de leur propre liste déroulante, avec les mêmes cinq niveaux disponibles partout où la visibilité est configurée :
  - **Tout le monde** : visible par n'importe qui, y compris les visiteurs anonymes
  - **Membres** : visible uniquement pour les personnes disposant d'une fiche Membre ou Personnel
  - **Groupes uniquement** : visible uniquement pour les personnes qui partagent un groupe avec cette personne
  - **Mes responsables de groupe et le personnel** : visible uniquement pour les responsables d'un groupe auquel cette personne appartient, ainsi que pour le personnel
  - **Personnel uniquement** : visible uniquement pour le personnel disposant de l'autorisation Personnes &gt; Voir, et pour la personne elle-même

  Les membres peuvent remplacer ces valeurs par défaut pour leur propre fiche depuis l'onglet **Confidentialité** de leur profil dans le PWA B1.church : voir [Modifier votre profil](/docs/b1-church/getting-started/me-page).
- **Âge minimum pour les messages privés** : un contrôle de sécurité pour les enfants. B1 n'ouvrira pas de **nouvelle** conversation privée si l'une des deux personnes est plus jeune que cet âge, d'après sa date de naissance (le rôle dans le foyer sert de solution de repli lorsqu'aucune date de naissance n'est enregistrée). Les personnes plus jeunes restent pleinement visibles dans l'annuaire : seule la messagerie directe est bloquée, **dans les deux sens**, pour tout le monde, y compris le personnel. Les conversations de groupe et la messagerie avec les parents d'un enfant restent possibles. Les options sont Désactivé, 13, 16 ou 18 ; la valeur par défaut est **18**. Les conversations existantes ne sont pas affectées.

:::tip
Comme la vérification de l'âge minimum repose sur les dates de naissance, assurez-vous que les dates de naissance sont renseignées pour les enfants de votre communauté. Ce paramètre appartient à la même famille de contrôles de sécurité que les [contrôles de sécurité lors de l'enregistrement](../attendance/checkin-safety.md).
:::

### Invite de connexion sur l'écran d'accueil {#home-screen-sign-in-prompt}

Les visiteurs qui ouvrent l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sans se connecter voient une courte invite (par défaut, *« Connectez-vous pour voir vos groupes, vos dons et plus encore. »*) à côté d'un bouton **Se connecter**. Les paramètres **Invite de connexion sur l'écran d'accueil**, sur la même page Portail membre (`/mobile/b1-mobile`), permettent de la modifier :

- **Afficher l'invite de connexion sur l'écran d'accueil de l'application** : désactivez cette option pour masquer à la fois l'invite et le bouton **Se connecter** de l'écran d'accueil. Les visiteurs peuvent toujours se connecter depuis le menu de l'application.
- **Texte de l'invite de connexion** : remplacez le texte par défaut par votre propre message (jusqu'à 150 caractères). Laissez vide pour utiliser le texte par défaut. Ce champ est désactivé lorsque l'invite est désactivée.

Cliquez sur **Enregistrer** pour appliquer. L'enregistrement actualise les paramètres mis en cache de l'application, de sorte que le changement apparaît à la prochaine ouverture de l'écran d'accueil.

### Vignettes de l'écran d'accueil {#home-screen-tiles}

Les onglets qui ont une photo (voir **Image** sous [Ajouter un nouvel onglet](#adding-a-new-tab)) apparaissent sur l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sous forme de vignettes photo, dans une section intitulée du nom de votre église. Cela inclut un onglet Verset du jour, si vous lui attribuez une photo. Les onglets avec photo apparaissent aussi dans la barre d'onglets.

Le paramètre **Vignettes de l'écran d'accueil**, sur la même page Portail membre (`/mobile/b1-mobile`), contrôle la mise en page de ces vignettes. Choisissez une **Disposition** :

- **Grille** : deux vignettes par ligne (par défaut). Lorsque le nombre de vignettes est impair, la première occupe toute la largeur.
- **Ligne défilante** : une seule ligne de vignettes que les membres font défiler latéralement.
- **Liste** : une liste avec une petite miniature photo à côté du nom de chaque onglet.

Cliquez sur **Enregistrer** pour appliquer.

## Où apparaissent ces onglets {#where-these-tabs-appear}

Les onglets que vous configurez ici s'affichent dans le **PWA B1.church** que vos membres installent depuis n'importe quelle page de `https://yourchurchname.b1.church`. Les modifications effectuées sur cette page sont prises en compte la prochaine fois qu'un membre ouvre l'application.

Sur téléphone, la barre d'onglets inférieure affiche **Accueil**, jusqu'à trois de vos onglets et **Plus** ; sur ordinateur, l'en-tête affiche jusqu'à cinq onglets. Les écrans intégrés (comme Sermons, Dons ou Groupes) occupent les emplacements en premier, et les onglets **Page interne** remplissent les emplacements restants. Les onglets **URL externe** et **Verset du jour** n'ont jamais d'emplacement. Tous les onglets, y compris ceux qui ne tiennent pas, figurent sur la page **Plus** de l'application. Voir [Naviguer dans B1App](/docs/b1-church/getting-started/navigating) pour ce que voient les membres. (Les onglets sont aussi affichés par l'ancienne [application native B1 Mobile](/docs/b1-mobile/) pour les membres qui l'utilisent encore, mais cette application est obsolète et n'est plus mise à jour.)

## Étapes suivantes {#next-steps}

- [Paramètres de l'église](./church-settings.md) : configurer les informations et l'image de marque de votre église
- [Rôles et permissions](./roles-permissions.md) : gérer les accès de votre équipe

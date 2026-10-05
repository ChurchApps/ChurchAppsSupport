---
title: "Paramètres de l'application mobile"
---

# Paramètres de l'application mobile

<div class="article-intro">

La page Paramètres de l'application mobile vous permet de configurer les onglets de navigation qui apparaissent dans l'**expérience mobile B1.church (PWA)** pour les membres de votre église. Vous contrôlez quels onglets sont visibles, vers quoi ils se lient et comment ils sont affichés.

</div>

:::info L'application native B1 Mobile est dépréciée
Les onglets configurés ici sont livrés via l'[application web progressive B1.church (PWA)](/docs/b1-church/getting-started/installing-pwa), qui a remplacé l'application native B1 Mobile. Partagez la page d'installation de votre église -- `https://nomdevotreeglise.b1.church/mobile/install` -- avec les membres ; elle les guide à travers l'installation de l'application sur leur appareil, sans téléchargement requis sur l'App Store ou Google Play.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission « Modifier les paramètres de l'église ». Voir [Rôles et autorisations](./roles-permissions.md) si vous n'avez pas accès.
- Configurez d'abord vos [Paramètres de l'église](./church-settings.md), y compris le nom et la marque de votre église

</div>

## Accès aux paramètres de navigation

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **Navigation** (`/mobile/navigation`).
3. La page Navigation affiche vos onglets d'application actuels.

## Ajout d'un nouvel onglet

1. Cliquez sur le bouton **Ajouter un onglet** en haut de la page.
2. Remplissez les détails de l'onglet :
   - **Nom** -- Le libellé qui s'affiche sur l'onglet (par exemple, « Sermons » ou « Donner »).
   - **Icône** -- Cliquez sur le sélecteur d'icône pour choisir une icône pour votre onglet. Vous pouvez également télécharger une image personnalisée.
   - **Type d'onglet** -- Sélectionnez parmi des options comme Bible, Flux en direct, Don, Site Web, et plus.
   - **URL** -- Entrez l'adresse web vers laquelle l'onglet doit se lier.
   - **Visibilité** -- Contrôlez qui peut voir cet onglet (tout le monde, membres seulement, etc.).
3. Cliquez sur **Enregistrer l'onglet** pour l'ajouter à votre application.

## Modification d'un onglet existant

1. Cliquez sur n'importe quel onglet existant dans la liste **Onglets d'application**.
2. Mettez à jour le nom, l'icône, l'URL, le type ou les paramètres de visibilité de l'onglet.
3. Cliquez sur **Enregistrer l'onglet** pour appliquer vos modifications.

## Réorganisation des onglets

Vous pouvez modifier l'ordre dans lequel les onglets apparaissent dans l'application mobile. Faites glisser et déposez les onglets dans la liste pour les réorganiser. L'ordre affiché sur cette page correspond à l'ordre que vos membres verront dans l'application.

:::info
Certains onglets peuvent s'afficher automatiquement lorsque certaines conditions sont remplies -- par exemple, un onglet Flux en direct peut apparaître lorsqu'un flux est actif. Les onglets ajoutés manuellement vous donnent un contrôle total sur ce que vos membres voient à tout moment.
:::

:::tip
Gardez votre nombre d'onglets gérable. Trois à cinq onglets fonctionnent bien pour la plupart des églises. Trop d'onglets peuvent rendre la navigation confuse pour vos membres.
:::

## Paramètres du répertoire des membres et de la messagerie

L'élément **portail des membres** dans la même section Mobile contient les paramètres qui régissent le répertoire des membres et la messagerie privée dans l'expérience B1.church :

- **Groupe d'approbation d'annuaire** -- Le groupe qui examine les mises à jour du répertoire des membres, et les [demandes de suppression de compte](../profile/account-deletion.md), avant qu'elles ne prennent effet.
- **Afficher dans le répertoire** -- Qui peut apparaître dans le répertoire des membres (Personnel uniquement à Tout le monde).
- **Préférence de visibilité** -- Définit la valeur par défaut au niveau de l'église pour les membres qui n'ont pas encore choisi leur propre paramètre. **Adresse**, **Numéro de téléphone**, et **E-mail** ont chacun leur propre liste déroulante, avec les mêmes cinq niveaux disponibles partout où la visibilité est configurée :
  - **Tout le monde** -- visible pour tous, y compris les visiteurs anonymes
  - **Membres** -- visible uniquement pour les personnes ayant un dossier Membre ou Personnel
  - **Groupes uniquement** -- visible uniquement pour les personnes qui partagent un groupe avec cette personne
  - **Mes chefs de groupe et personnel** -- visible uniquement pour les chefs de groupe auquel cette personne appartient, plus le personnel
  - **Personnel uniquement** -- visible uniquement pour le personnel avec la permission Personnes > Afficher, et pour la personne elle-même

  Les membres peuvent remplacer ces valeurs par défaut pour leur propre dossier à partir de l'onglet **Confidentialité** de leur profil dans le PWA B1.church -- voir [Modification de votre profil](/docs/b1-church/getting-started/me-page).
- **Âge minimum pour les messages privés** -- Un contrôle de sécurité des enfants. B1 n'ouvrira pas une **nouvelle** conversation de message privé lorsque l'une des deux personnes est en dessous de cet âge, en fonction de sa date de naissance (le rôle des membres du ménage est utilisé comme solution de secours lorsqu'aucune date de naissance n'est en dossier). Les personnes en dessous de l'âge restent entièrement visibles dans le répertoire -- seule la messagerie directe est bloquée, **dans les deux sens**, pour tous y compris le personnel. Les conversations de groupe et la messagerie aux parents d'un enfant continuent de fonctionner. Les options sont Désactivé, 13, 16, ou 18 ; la valeur par défaut est **18**. Les conversations existantes ne sont pas affectées.

:::tip
Parce que la vérification de l'âge minimum dépend des dates de naissance, assurez-vous que les dates de naissance sont remplies pour les enfants de votre congrégation. Ce paramètre appartient à la même famille de contrôles de sécurité des enfants que les [contrôles de sécurité de l'enregistrement](../attendance/checkin-safety.md).
:::

### Invite de connexion de l'écran d'accueil

Les visiteurs qui ouvrent l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sans se connecter voient une courte invite -- par défaut, *« Connectez-vous pour voir vos groupes, dons et plus »* -- à côté d'un bouton **Se connecter**. Les paramètres **Invite de connexion de l'écran d'accueil** sur la même page du portail des membres (`/mobile/b1-mobile`) vous permettent de la changer :

- **Afficher l'invite de connexion sur l'écran d'accueil de l'application** -- Éteignez ceci pour masquer à la fois l'invite et le bouton **Se connecter** de l'écran d'accueil. Les visiteurs peuvent toujours se connecter à partir du menu de l'application.
- **Texte de l'invite de connexion** -- Remplacez le libellé par défaut par votre propre message (jusqu'à 150 caractères). Laissez-le vide pour utiliser la valeur par défaut. Cette zone est désactivée lorsque l'invite est désactivée.

Cliquez sur **Enregistrer** pour appliquer. L'enregistrement actualise les paramètres en cache de l'application, afin que la modification s'affiche la prochaine fois que l'écran d'accueil se charge.

## Où ces onglets apparaissent

Les onglets que vous configurez ici sont affichés dans le **PWA B1.church** que vos membres installent à partir de n'importe quelle page sur `https://nomdevotreeglise.b1.church`. Les modifications que vous apportez à cette page sont reflétées la prochaine fois qu'un membre ouvre l'application. (Les onglets sont également rendus par l'[application native B1 Mobile](/docs/b1-mobile/) héritée pour tout membre qui l'exécute toujours, mais cette application est dépréciée et n'est plus mise à jour.)

## Prochaines étapes

- [Paramètres de l'église](./church-settings.md) -- Configurez les informations et la marque de votre église
- [Rôles et autorisations](./roles-permissions.md) -- Gérez l'accès pour votre équipe


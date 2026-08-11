---
title: "Paramètres de l'application mobile"
---

# Paramètres de l'application mobile

<div class="article-intro">

La page Paramètres de l'application mobile vous permet de configurer les onglets de navigation qui apparaissent dans l'**expérience mobile B1.church (PWA)** pour vos membres d'église. Vous contrôlez quels onglets sont visibles, vers quoi ils renvoient et comment ils sont affichés.

</div>

:::info L'application native B1 Mobile est abandonnée
Les onglets configurés ici sont fournis via l'[Application Web Progressive B1.church (PWA)](/docs/b1-church/getting-started/installing-pwa), qui a remplacé l'application native B1 Mobile. Partagez votre page d'installation de l'église -- `https://votrenomeglise.b1.church/mobile/install` -- avec les membres ; cela les guide dans l'installation de l'application sur leur appareil, sans téléchargement requis sur l'App Store ou Google Play.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission « Modifier les paramètres de l'église ». Consultez [Rôles & Permissions](./roles-permissions.md) si vous n'avez pas accès.
- Configurez d'abord vos [Paramètres d'église](./church-settings.md), y compris le nom de votre église et la marque

</div>

## Accès aux paramètres de l'application mobile

1. Dans B1 Admin, ouvrez le **menu de section** dans le coin supérieur gauche (le nom de la section avec la petite flèche) et choisissez **Paramètres**.
2. Cliquez sur le bouton **Applications mobiles** dans l'en-tête.
3. La page Paramètres de l'application mobile affiche vos onglets d'application actuels.

## Ajout d'un nouvel onglet

1. Cliquez sur le bouton **Ajouter un onglet** en haut de la page.
2. Remplissez les détails de l'onglet :
   - **Nom** -- Le label qui apparaît sur l'onglet (par exemple, « Sermons » ou « Donner »).
   - **Icône** -- Cliquez sur le sélecteur d'icônes pour choisir une icône pour votre onglet. Vous pouvez également télécharger une image personnalisée.
   - **Type d'onglet** -- Sélectionnez parmi les options comme Bible, Flux en direct, Donation, Site web, et plus.
   - **URL** -- Entrez l'adresse web vers laquelle l'onglet doit renvoyer.
   - **Visibilité** -- Contrôlez qui peut voir cet onglet (tout le monde, membres uniquement, etc.).
3. Cliquez sur **Enregistrer l'onglet** pour l'ajouter à votre application.

## Édition d'un onglet existant

1. Cliquez sur n'importe quel onglet existant dans la liste **Onglets d'application**.
2. Mettez à jour le nom, l'icône, l'URL, le type ou les paramètres de visibilité de l'onglet.
3. Cliquez sur **Enregistrer l'onglet** pour appliquer vos modifications.

## Réorganisation des onglets

Vous pouvez modifier l'ordre dans lequel les onglets apparaissent dans l'application mobile. Faites glisser et déposez les onglets dans la liste pour les réorganiser. L'ordre affiché sur cette page correspond à l'ordre que vos membres verront dans l'application.

:::info
Certains onglets peuvent apparaître automatiquement lorsque certaines conditions sont remplies -- par exemple, un onglet Flux en direct peut apparaître lorsqu'un flux est actif. Les onglets ajoutés manuellement vous donnent un contrôle total sur ce que vos membres voient à tout moment.
:::

:::tip
Maintenez votre nombre d'onglets gérable. Trois à cinq onglets convient bien à la plupart des églises. Trop d'onglets peuvent rendre la navigation confuse pour vos membres.
:::

## Paramètres du répertoire des membres et de la messagerie

L'onglet **B1 Mobile** dans la même section Mobile contient les paramètres qui gouvernent le répertoire des membres et la messagerie privée dans l'expérience B1.church :

- **Groupe d'approbation du répertoire** -- Le groupe qui examine les mises à jour du répertoire des membres avant leur application.
- **Afficher dans le répertoire** -- Qui peut figurer dans le répertoire des membres (Personnel uniquement jusqu'à Tout le monde).
- **Préférences de visibilité** -- Visibilité par défaut pour les adresses, numéros de téléphone et adresses email des membres.
- **Âge minimum pour les messages privés** -- Un contrôle de sécurité pour enfants. B1 n'ouvrira pas une **nouvelle** conversation de message privé lorsque l'une ou l'autre personne est en dessous de cet âge, en fonction de sa date de naissance (le rôle du ménage est utilisé comme solution de secours lorsqu'aucune date de naissance n'est disponible). Les personnes en dessous de l'âge restent entièrement visibles dans le répertoire -- seule la messagerie directe est bloquée, **dans les deux sens**, pour tout le monde, y compris le personnel. Les conversations de groupe et la messagerie aux parents d'un enfant fonctionnent toujours. Les options sont Désactiver, 13, 16 ou 18 ; la valeur par défaut est **18**. Les conversations existantes ne sont pas affectées.

:::tip
Parce que la vérification d'âge minimum repose sur les dates de naissance, assurez-vous que les dates de naissance sont remplies pour les enfants de votre congrégation. Ce paramètre appartient à la même famille de sécurité des enfants que les [contrôles de sécurité d'enregistrement](../attendance/checkin-safety.md).
:::

## Où ces onglets apparaissent

Les onglets que vous configurez ici sont affichés dans l'**Application Web Progressive B1.church** que vos membres installent à partir de n'importe quelle page sur `https://votrenomeglise.b1.church`. Les modifications que vous apportez sur cette page sont reflétées la prochaine fois qu'un membre ouvre l'application. (Les onglets sont également rendus par l'application native [B1 Mobile](/docs/b1-mobile/) héritée pour tous les membres qui l'exécutent toujours, mais cette application est abandonnée et n'est plus mise à jour.)

## Prochaines étapes

- [Paramètres d'église](./church-settings.md) -- Configurez les informations et la marque de votre église
- [Rôles & Permissions](./roles-permissions.md) -- Gérez l'accès pour votre équipe

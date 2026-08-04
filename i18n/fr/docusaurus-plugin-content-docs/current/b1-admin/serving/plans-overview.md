---
title: "Vue d'ensemble des plans"
---

# Vue d'ensemble des plans

<div class="article-intro">

La vue d'ensemble des plans vous offre une vision globale de toutes les affectations de bénévoles sur plusieurs dates de service à la fois. Plutôt que d'ouvrir chaque plan individuellement, vous pouvez voir qui sert à chaque poste sur les semaines à venir dans une seule grille — et repérer rapidement les postes qui restent à pourvoir.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez au moins un ministère et un type de plan dans la section Service
- Créez des [plans de service](./plans.md) avec des dates et des affectations de bénévoles
- Assurez-vous que vos bénévoles ont été ajoutés à votre [répertoire de personnes](../people/adding-people.md)

</div>

## Accéder à la vue d'ensemble

1. Accédez à **Service** depuis le menu principal de B1 Admin.
2. Sélectionnez un **onglet de ministère** en haut de la page.
3. Cliquez sur un **type de plan** pour ouvrir sa liste de plans.
4. Cliquez sur le bouton **Vue d'ensemble** en haut de la page.

## Lire la grille de vue d'ensemble

La vue d'ensemble affiche une grille où :

- Les **lignes** représentent chaque poste (par exemple, « Musique : Guitare », « Technique : Projection ») regroupées par catégorie
- Les **colonnes** représentent les dates de service à venir (par exemple, « 14 avril », « 21 avril »)
- Les **cellules** affichent le nom du bénévole affecté à ce poste à cette date

Les cellules surlignées en **rouge** ne sont pas pourvues — aucun bénévole n'a encore été affecté. Cela permet de repérer facilement les manques d'effectifs en un coup d'œil, sans avoir à ouvrir chaque plan individuellement.

:::tip
Les noms des bénévoles sont affichés dans un format raccourci (prénom et initiale du nom de famille, par exemple « Jean D. ») afin de garder la grille compacte lorsque vous avez de nombreux postes.
:::

## Affecter des bénévoles directement depuis la vue d'ensemble

Vous n'avez pas besoin d'ouvrir les plans individuels pour pourvoir les postes vacants. Cliquez sur n'importe quelle cellule de la grille pour ouvrir un panneau d'affectation pour ce poste et cette date. À partir de là, vous pouvez :

- Sélectionner une personne de votre équipe à affecter au poste
- Cliquer sur **Retirer** à côté d'une personne déjà affectée pour la retirer de ce créneau
- Enregistrer la modification sans quitter la vue d'ensemble

Cela permet de pourvoir tout un planning en une seule fois — travaillez sur plusieurs semaines et postes sans avoir à entrer et sortir des plans individuels.

## Planification automatique depuis la vue d'ensemble

Cliquez sur **Planification automatique** pour que B1 pourvoie automatiquement tous les créneaux ouverts et non pourvus de la grille actuelle. Pour chaque plan affiché, l'outil sélectionne des candidats parmi le groupe lié à chaque poste et pourvoit automatiquement les créneaux vides, puis indique combien des plans visibles ont pu être pourvus. Les plans sont pourvus un par un afin qu'un même bénévole ne soit pas affecté deux fois le même jour au cours d'un même passage.

:::info
La planification automatique ne pourvoit que les créneaux déjà vides — elle ne remplace jamais une affectation existante.
:::

## Envoyer un e-mail à tous les bénévoles planifiés

Cliquez sur **E-mail aux bénévoles** pour envoyer une notification à tous les bénévoles affectés n'importe où dans la plage de dates et le ministère actuellement filtrés, en une seule action, plutôt que d'envoyer un e-mail plan par plan. B1 indique combien d'e-mails ont été envoyés et combien ont échoué.

## Mettre en évidence le planning d'un bénévole

Utilisez le menu déroulant **Surligner** pour choisir une personne de votre équipe — chaque cellule où elle est affectée est mise en évidence dans la grille, afin que vous puissiez voir partout où elle sert déjà avant de l'ajouter à un autre créneau. Choisissez **Tout le monde** pour désactiver la mise en évidence.

## Filtrer la vue d'ensemble

Vous pouvez ajuster ce que la vue d'ensemble affiche à l'aide des contrôles de filtre en haut :

- **Date de début / Date de fin** — Par défaut, la vue d'ensemble affiche les 12 semaines à venir. Saisissez des dates personnalisées pour élargir ou réduire la plage.
- **Ministère** — Passez à un autre ministère sans quitter la vue d'ensemble.
- **Type de plan** — Filtrez sur un type de plan spécifique au sein du ministère sélectionné.
- **Non pourvus uniquement** — Activez cette option pour masquer les lignes où toutes les dates sont déjà pourvues, afin de vous concentrer uniquement sur les postes qui nécessitent encore un bénévole.

Cliquez sur **Filtrer** après avoir effectué vos modifications pour mettre à jour la grille.

## Exporter au format CSV

Cliquez sur **Exporter CSV** pour télécharger la grille actuelle sous forme de feuille de calcul. L'export inclut tous les postes et affectations de bénévoles pour la plage de dates filtrée, ce qui facilite le partage avec les responsables de ministère ou l'impression pour les réunions de planification.

:::info
L'export CSV reflète les filtres actuellement appliqués — seules les dates et le type de plan affichés dans la grille sont inclus dans le téléchargement.
:::

## Articles associés

- [Plans de service](./plans.md) — Créer et gérer des plans de service individuels
- [Ordre du service](./service-order.md) — Construire l'ordre du service au sein d'un plan
- [Planification des leçons](./scheduling-lessons.md) — Planifier des leçons en parallèle de vos plans de service

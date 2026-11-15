---
title: "Vue d'ensemble des plans"
description: "Obtenez une vue d'ensemble des affectations des bénévoles sur de nombreuses dates de service dans B1 Admin, repérez les postes non pourvus, et comblez-les ou écrivez à votre équipe depuis une seule grille."
---

# Vue d'ensemble des plans

<div class="article-intro">

La vue d'ensemble des plans vous offre une vue d'ensemble de toutes vos affectations de bénévoles sur plusieurs dates de service à la fois. Au lieu d'ouvrir chaque plan individuellement, vous voyez qui sert à chaque poste pendant les semaines à venir dans une seule grille, et vous repérez rapidement les lacunes à combler.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez au moins un ministère et un type de plan dans l'espace Service
- Créez des [plans de service](./plans.md) avec des dates et des affectations de bénévoles
- Assurez-vous que vos bénévoles ont été ajoutés à votre [répertoire des personnes](../people/adding-people.md)

</div>

## Accéder à la vue d'ensemble {#accessing-the-overview}

1. Dans B1 Admin, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Service** et cliquez sur **Plans**.
2. Sélectionnez un **onglet de ministère** en haut de la page.
3. Cliquez sur **Vue d'ensemble** à côté du type de plan dans la liste **Types de plans**, ou ouvrez le type de plan et cliquez sur **Vue d'ensemble** en haut de la page.

La vue d'ensemble porte sur le type de plan à partir duquel vous l'avez ouverte. Cliquez sur le nom du type de plan en haut de la vue d'ensemble pour revenir à sa liste de plans.

## Lire la grille de la vue d'ensemble {#reading-the-overview-grid}

La vue d'ensemble affiche une grille où :

- Les **lignes** représentent chaque poste (par exemple, « Musique : guitare », « Technique : projection ») regroupés par catégorie
- Les **colonnes** représentent les prochaines dates de service (par exemple, « 14 avr. », « 21 avr. »)
- Les **cellules** indiquent le nom du bénévole affecté à ce poste à cette date

Les cellules surlignées en **rouge** ne sont pas pourvues : aucun bénévole n'y a encore été affecté. Vous repérez ainsi les lacunes de personnel d'un coup d'œil, sans ouvrir chaque plan individuellement.

:::tip
Les noms des bénévoles sont affichés sous forme abrégée (prénom et initiale du nom, par exemple « Jean D. ») pour garder la grille compacte lorsque vous avez de nombreux postes.
:::

## Affecter des bénévoles directement depuis la vue d'ensemble {#assigning-volunteers-directly-from-the-overview}

Vous n'avez pas besoin d'ouvrir chaque plan pour combler les postes vacants. Cliquez sur n'importe quelle cellule de la grille pour ouvrir un panneau d'affectation pour ce poste et cette date. Vous pouvez alors :

- Cliquer sur le nom d'un membre de l'équipe pour l'affecter au poste (ou, pour un poste sans groupe de bénévoles, rechercher n'importe quelle personne de votre église)
- Cliquer sur l'icône **Retirer** (X) à côté d'une personne déjà affectée, puis confirmer, pour la retirer de ce poste
- Cliquer sur **Terminé** pour fermer le panneau sans quitter la vue d'ensemble

Vous pouvez ainsi pourvoir un calendrier complet en une seule fois, en parcourant les semaines et les postes sans entrer et sortir de chaque plan.

## Planification automatique depuis la vue d'ensemble {#auto-scheduling-from-the-overview}

Cliquez sur **Planification automatique** et confirmez pour que B1 remplisse en une fois chaque poste vacant de la grille actuelle. Pour chaque plan affiché, il recherche des candidats dans le groupe lié à chaque poste et remplit automatiquement les postes vides, puis indique combien des plans visibles il a pu compléter (par exemple, « Planification automatique de 3 plans sur 4 »). Les postes sans groupe de bénévoles sont ignorés. Les plans sont remplis un à un afin qu'un même bénévole ne soit pas affecté à deux dates en double au cours d'une même opération.

:::info
La planification automatique ne remplit que les postes déjà vides : elle ne remplace jamais une affectation existante.
:::

## Écrire à toutes les personnes planifiées {#emailing-everyone-scheduled}

Cliquez sur **Écrire aux bénévoles** et confirmez pour envoyer une notification à chaque bénévole affecté à n'importe quel moment de la plage de dates et du ministère filtrés, en une seule action, plutôt que plan par plan. B1 indique combien de courriels ont été envoyés et combien ont échoué.

## Envoyer un message texte à toutes les personnes planifiées {#texting-everyone-scheduled}

Si votre église a connecté un [fournisseur de messages texte](../settings/church-settings.md#texting) et que vous pouvez à la fois modifier les plans et envoyer des messages texte, un bouton **Envoyer un texto aux bénévoles** apparaît en haut de la vue d'ensemble.

1. Cliquez sur **Envoyer un texto aux bénévoles**.
2. La boîte de dialogue indique combien de bénévoles recevront le message (par exemple, « 12 bénévoles sur 14 recevront ce message »), ainsi que le nombre de personnes qui ont refusé les messages texte et le nombre de personnes sans numéro de téléphone au dossier.
3. Saisissez votre **message**. Vous pouvez cliquer sur un espace réservé pour insérer le nom de chaque bénévole ou celui de votre église.
4. Cliquez sur **Envoyer**. B1 indique combien de messages ont été envoyés.

Chaque bénévole affecté dans la plage de dates reçoit un seul message au numéro de téléphone mobile de son profil, même s'il sert à plusieurs dates. Les personnes qui partagent un même numéro de téléphone (comme un téléphone familial) ne reçoivent qu'un seul message. Les bénévoles ayant répondu STOP à un message précédent sont ignorés.

:::info
Les messages texte sont envoyés par le fournisseur de messages de votre église, et sa tarification s'applique. Si votre église n'a plus de crédits de messages texte, l'envoi s'arrête et la boîte de dialogue vous en avertit. Un seul envoi atteint au maximum 200 bénévoles ; réduisez la plage de dates si vous en avez davantage.
:::

## Mettre en évidence l'horaire d'un bénévole {#highlighting-a-volunteers-schedule}

Utilisez la liste déroulante **Mettre en évidence** pour choisir une personne de votre équipe : chaque cellule où elle est affectée est mise en évidence dans la grille, ce qui vous permet de voir tous les endroits où elle sert déjà avant de l'ajouter à un autre poste. Choisissez **Tout le monde** pour désactiver la mise en évidence.

## Filtrer la vue d'ensemble {#filtering-the-overview}

Vous pouvez ajuster ce que la vue d'ensemble affiche à l'aide des commandes situées au-dessus de la grille. La grille se met à jour dès que vous les modifiez.

- **Tous les postes / Non pourvus seulement** -- Choisissez **Non pourvus seulement** pour masquer les lignes où chaque date est déjà pourvue, afin de vous concentrer uniquement sur les postes qui ont encore besoin d'un bénévole.
- **Date de début / Date de fin** -- Par défaut, la vue d'ensemble affiche les 12 semaines à venir. Saisissez des dates personnalisées pour élargir ou restreindre la plage.

## Exporter en CSV {#exporting-to-csv}

Cliquez sur **Exporter en CSV** pour télécharger la grille actuelle sous forme de feuille de calcul. L'exportation comprend tous les postes et toutes les affectations de bénévoles pour la plage de dates filtrée, ce qui facilite le partage avec les responsables de ministères ou l'impression pour les réunions de planification.

:::info
L'exportation CSV reflète les filtres actuellement appliqués : seules les dates et le type de plan affichés dans la grille sont inclus dans le téléchargement.
:::

## Articles connexes {#related-articles}

- [Plans de service](./plans.md) — Créer et gérer les plans de service individuels
- [Ordre de service](./service-order.md) — Construire l'ordre de service d'un plan
- [Planifier les leçons](./scheduling-lessons.md) — Planifier les leçons en parallèle de vos plans de service

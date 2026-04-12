---
title: "Configuration de la présence"
---

# Configuration de la présence

<div class="article-intro">

Avant de pouvoir suivre la présence, vous devez indiquer à B1 Admin les emplacements physiques de votre église, les horaires des cultes et les groupes qui se réunissent à chaque culte. Cette configuration unique crée la structure qui alimente tout le suivi et les rapports de présence de votre église.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec la permission de gérer la présence. Voir [Rôles et permissions](../people/roles-permissions.md) si vous n'êtes pas sûr de votre niveau d'accès.
- Si vous prévoyez d'assigner des groupes à des horaires de culte, assurez-vous que vos [groupes sont créés](../groups/creating-groups.md) au préalable.

</div>

## Concepts clés

- **Campus** -- un emplacement physique où votre église se réunit (par ex., « Campus principal », « Campus Nord »).
- **Horaire de culte** -- un rassemblement récurrent dans un campus (par ex., « Dimanche 9h00 », « Mercredi 19h00 »).
- **Groupe planifié** -- un groupe assigné à un horaire de culte spécifique. La présence est suivie dans le contexte de ce culte.
- **Groupe non planifié** -- un groupe qui suit la présence de manière autonome, sans être lié à un horaire de culte.

## Configurer votre structure de présence

1. Ouvrez **B1 Admin** et cliquez sur **Présence** dans la barre latérale.
2. Sélectionnez l'onglet **Configuration**.
3. Cliquez sur **Ajouter un campus** et entrez le nom de votre emplacement. Cliquez sur **Enregistrer**.
4. Avec votre campus sélectionné, cliquez sur **Ajouter un horaire de culte**. Entrez un nom tel que « Dimanche 9h00 » et cliquez sur **Enregistrer**.
5. Répétez pour chaque horaire de culte de ce campus.
6. Pour assigner un groupe à un horaire de culte, sélectionnez l'horaire de culte et cliquez sur **Ajouter un groupe**. Choisissez le groupe dans la liste et cliquez sur **Enregistrer**.

### Activer le suivi de présence sur un groupe

Avant qu'un groupe puisse avoir sa présence enregistrée, le suivi de présence doit être activé pour ce groupe.

1. Cliquez sur **Groupes** dans la barre latérale et sélectionnez le groupe.
2. Cliquez sur l'icône **Modifier** (crayon).
3. Réglez **Suivi de présence** sur **Oui**.
4. Cliquez sur **Enregistrer**.

:::tip
Si vous avez assigné le groupe à un horaire de culte à l'étape précédente, utilisez également l'option **Ajouter un horaire de culte** sur l'écran de modification du groupe pour le lier au bon culte. Cela garantit que les sessions sont connectées au bon campus et au bon horaire.
:::

:::tip
Si un groupe se réunit en dehors d'un culte régulier -- comme un petit groupe en milieu de semaine qui suit sa propre présence -- vous pouvez le laisser comme groupe non planifié. Il apparaîtra toujours dans l'onglet Groupes pour les rapports de présence.
:::

## Modifier votre configuration

Vous pouvez mettre à jour votre configuration à tout moment. Sélectionnez un campus, un horaire de culte ou un groupe et cliquez sur **Modifier** pour changer ses détails, ou **Supprimer** pour le retirer.

:::info
Supprimer un horaire de culte ne supprime pas les enregistrements de présence passés. Vos données historiques sont préservées même si vous modifiez votre planning.
:::

## Et ensuite

Une fois vos campus, horaires de culte et groupes en place, vous êtes prêt à commencer à [enregistrer la présence](recording-attendance.md) manuellement ou à configurer [l'enregistrement en libre-service](check-in.md) pour vos cultes.

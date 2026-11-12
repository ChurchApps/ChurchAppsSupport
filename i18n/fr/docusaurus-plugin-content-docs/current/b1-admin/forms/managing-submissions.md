---
title: "Gérer les soumissions"
description: "Examinez, imprimez et réaffectez les soumissions de formulaires dans B1 Admin, en transférant les réponses à la bonne personne et en assurant le suivi des cartes de visiteur et des demandes de prière."
---

# Gérer les soumissions

<div class="article-intro">

Une fois votre formulaire en ligne, les soumissions commencent à arriver. L'onglet **Soumissions du formulaire** vous permet d'examiner chaque réponse, de suivre qui a soumis et d'utiliser les données pour faire un suivi auprès de votre communauté en temps opportun.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Créez un formulaire](./creating-forms.md) avec au moins une question
- Partagez le formulaire via son adresse web publique ou intégrez-le sur votre [site web](../website/managing-pages.md)

</div>

## Consulter les soumissions {#viewing-submissions}

1. Ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Personnes** et cliquez sur **Formulaires**.
2. Cliquez sur le formulaire que vous souhaitez examiner.
3. Accédez à l'onglet **Soumissions du formulaire**.

L'onglet comporte deux cartes :

- **Résumé des soumissions du formulaire** -- Pour chaque question à choix multiple, à cases à cocher et Oui/Non, un décompte du nombre de personnes ayant choisi chaque réponse.
- **Résultats des soumissions du formulaire** -- Un tableau de chaque réponse, avec le nombre de soumissions. Chaque ligne indique pour qui la soumission a été faite (**Soumis pour** sur les formulaires Personnes, **Soumis par** sur les formulaires Autonomes, ou **Anonyme**) et la **Date de soumission**, suivis d'une colonne pour chaque question du formulaire, dans l'ordre du formulaire. Si votre formulaire comporte de nombreuses questions, faites défiler le tableau horizontalement pour voir les autres colonnes. Cliquez sur le nom d'une personne pour ouvrir sa fiche.

Cliquez sur **Exporter** sur l'une ou l'autre carte pour télécharger les réponses au format CSV, avec une ligne par soumission. Cliquez sur l'icône **Imprimer** (imprimante) pour imprimer le résumé et le tableau des résultats, avec en tête le nom de votre église.

## Examiner les soumissions individuelles {#reviewing-individual-submissions}

Pour lire ou imprimer les réponses d'une personne, ouvrez sa fiche dans [Personnes](../people/adding-people.md#working-with-forms) et cliquez sur le formulaire dans sa section **Formulaires**. Vous verrez toutes les réponses qu'elle a données, une question par ligne.

Cliquez sur l'**icône d'impression** à côté de la soumission pour imprimer les réponses remplies de cette personne -- utile pour un dossier papier ou une autorisation signée que vous devez conserver. L'impression affiche le logo de votre église (le **logo pour fond clair** de [Site web > Apparence](../website/appearance.md), si vous en avez téléversé un) centré en haut, avec le nom de votre église en dessous. Les impressions utilisent toujours un texte foncé sur une page blanche, même si vous utilisez B1 Admin en mode sombre. Cette fonction est distincte de [l'impression d'un formulaire vierge](./creating-forms.md#printing-a-blank-form) : elle imprime les réponses déjà soumises d'une personne, et non une copie vide.

## Changer la personne associée à une soumission {#changing-the-person-on-a-submission}

Si une soumission est liée à la mauvaise personne -- par exemple, deux membres d'une famille partagent une même adresse courriel -- vous pouvez la transférer à la bonne personne ou la dissocier.

1. Dans l'onglet **Soumissions du formulaire**, cliquez sur l'icône **Changer la personne** (deux flèches) à côté du nom de la personne. La même icône apparaît à côté d'une soumission sur le [profil d'une personne](../people/adding-people.md#working-with-forms).
2. Dans la boîte de dialogue **Changer la personne**, recherchez la bonne personne et cliquez sur **Transférer à cette personne**.
3. Ou cliquez sur **Dissocier (Anonyme)** pour détacher la soumission de toute personne. Elle apparaît alors comme **Anonyme**.

Seul le lien change. Les réponses restent les mêmes, et aucun courriel de suivi n'est renvoyé.

:::info
Pour les formulaires configurés pour créer une fiche personne, lorsqu'une personne est connectée au site de votre église au moment de soumettre, la soumission est liée à sa propre fiche, même si une autre personne de votre base de données partage son adresse courriel. Lorsque vous [fusionnez deux fiches personnes](../people/adding-people.md), les soumissions de formulaires de la personne supprimée sont transférées à la personne que vous conservez.
:::

## Comment les soumissions sont recueillies {#how-submissions-are-collected}

Les soumissions peuvent arriver par plusieurs canaux :

- **Adresse web publique** -- Si votre formulaire possède une adresse web publique (formulaires Autonomes), quiconque possède le lien peut soumettre une réponse. Partagez l'adresse par courriel, sur les réseaux sociaux ou par message texte.
- **Intégré sur votre site web** -- Les formulaires intégrés sur votre site B1 recueillent automatiquement les soumissions lorsque les visiteurs les remplissent.
- **Usage interne** -- Le personnel peut remplir les formulaires Personnes au nom d'une personne depuis la fiche de cette personne dans B1 Admin. Voir [Travailler avec les formulaires](../people/adding-people.md#working-with-forms).

:::tip
Consultez régulièrement l'onglet **Soumissions du formulaire** pour les formulaires comme les cartes de visiteur ou les demandes de prière, afin d'assurer un suivi rapide.
:::

## Utiliser les données des soumissions {#using-submission-data}

Les données recueillies par les formulaires peuvent vous aider à :

- Suivre les inscriptions aux événements et planifier en conséquence
- Faire un suivi auprès des visiteurs ou des nouveaux membres
- Recueillir les retours d'un sondage pour la planification des ministères
- Traiter les paiements pour les événements ou les programmes

:::info
Les membres du formulaire ayant le rôle **Administrateur** ou **Consultation seulement** peuvent accéder à l'onglet **Soumissions du formulaire**. Assurez-vous que les bonnes personnes de votre équipe ont accès aux formulaires dont elles ont besoin en gérant les rôles dans l'onglet **Membres du formulaire**.
:::

:::info
Si un formulaire Autonome est [lié à un groupe](./creating-forms.md#linking-a-form-to-a-group), les responsables de ce groupe peuvent lire et imprimer ses soumissions depuis la page du groupe sur B1.church, sans être membres du formulaire. Ils peuvent aussi y lire les réponses aux questions d'inscription pour les événements de leur groupe. Voir [Détails du groupe](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Si un formulaire **Autonome** est configuré pour créer une fiche personne, toutes les soumissions associées à une personne existante apparaissent aussi dans la section **Formulaires** de la page de cette personne dans Personnes -- et pas seulement les formulaires de type Personnes.
:::

## Étapes suivantes {#next-steps}

- Apprenez à créer et personnaliser des formulaires dans [Créer des formulaires](./creating-forms.md)
- Ajoutez les personnes issues des soumissions de formulaires à votre [répertoire des personnes](../people/adding-people.md) pour un suivi continu
- [Liez un formulaire à un groupe](./creating-forms.md#linking-a-form-to-a-group) pour que ses responsables puissent lire les réponses, ou [ajoutez automatiquement les personnes qui soumettent au groupe](./creating-forms.md#automatically-adding-submitters-to-a-group) afin qu'un formulaire d'inscription autonome constitue sa propre liste

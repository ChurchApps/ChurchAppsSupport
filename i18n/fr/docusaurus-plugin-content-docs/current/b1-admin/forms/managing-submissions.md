---
title: "Gérer les réponses"
---

# Gérer les réponses

<div class="article-intro">

Une fois votre formulaire en ligne, les réponses commencent à arriver. L'onglet **Form Submissions** vous permet d'examiner chaque réponse, de suivre qui a envoyé le formulaire et d'utiliser ces données pour assurer un suivi rapide auprès de votre congrégation.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Créez un formulaire](./creating-forms.md) comportant au moins une question
- Partagez le formulaire via son URL publique ou intégrez-le à votre [site web](../website/managing-pages.md)

</div>

## Consulter les réponses

1. Ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **People**, puis cliquez sur **Forms**.
2. Cliquez sur le formulaire que vous souhaitez examiner.
3. Accédez à l'onglet **Form Submissions**.

Vous verrez la liste de toutes les réponses reçues pour ce formulaire. Chaque réponse affiche les informations du répondant et la date d'envoi, suivies d'une colonne pour chaque question du formulaire. Si votre formulaire comporte de nombreuses questions, faites défiler le tableau horizontalement pour voir les autres colonnes.

## Examiner des réponses individuelles

Cliquez sur une réponse pour en afficher tous les détails. Vous verrez toutes les réponses que la personne a fournies pour chaque question du formulaire.

Cliquez sur l'**icône d'impression** à côté de la réponse pour imprimer les réponses remplies de cette personne, pratique pour un dossier papier ou une autorisation signée que vous devez conserver. L'impression affiche le logo de votre église (le **Light Background Logo** de [Website > Appearance](../website/appearance.md), si vous en avez téléversé un) centré en haut, avec le nom de votre église en dessous. Les impressions utilisent toujours un texte foncé sur fond blanc, même si vous utilisez B1 Admin en mode sombre. Cette fonction est distincte de [l'impression d'un formulaire vierge](./creating-forms.md#printing-a-blank-form) : elle imprime les réponses déjà envoyées par une personne, et non un exemplaire vide. L'icône d'impression apparaît partout où une réponse est affichée, y compris sur le [profil d'une personne](../people/adding-people.md#working-with-forms).

## Changer la personne associée à une réponse

Si une réponse est liée à la mauvaise personne, par exemple lorsque deux membres d'une même famille partagent une adresse courriel, vous pouvez la déplacer vers la bonne personne ou la dissocier.

1. Dans l'onglet **Form Submissions**, cliquez sur l'icône **Change person** (deux flèches) à côté du nom de la personne. La même icône apparaît à côté d'une réponse sur le [profil d'une personne](../people/adding-people.md#working-with-forms).
2. Dans la boîte de dialogue **Change person**, recherchez la bonne personne et cliquez sur **Move to this person**.
3. Ou cliquez sur **Unlink (Anonymous)** pour détacher la réponse de toute personne. Elle s'affiche alors comme **Anonymous**.

Seul le lien change. Les réponses restent les mêmes, et aucun courriel de suivi n'est renvoyé.

:::info
Pour les formulaires configurés pour créer une fiche de personne, lorsqu'une personne est connectée au site de votre église au moment de l'envoi, la réponse est liée à sa propre fiche, même si une autre personne de votre base de données partage la même adresse courriel. Lorsque vous [fusionnez deux fiches de personnes](../people/adding-people.md), les réponses aux formulaires de la personne supprimée sont transférées à la personne que vous conservez.
:::

## Comment les réponses sont recueillies

Les réponses peuvent arriver par plusieurs canaux :

- **URL publique** -- Si votre formulaire dispose d'une URL publique (formulaires Stand Alone), toute personne disposant du lien peut envoyer une réponse. Partagez l'URL par courriel, sur les réseaux sociaux ou par message texte.
- **Intégré à votre site web** -- Les formulaires intégrés à votre site B1 recueillent automatiquement les réponses lorsque les visiteurs les remplissent.
- **Usage interne** -- Le personnel et les bénévoles peuvent aussi envoyer des formulaires au nom d'autres personnes directement dans B1 Admin.

:::tip
Consultez régulièrement l'onglet **Form Submissions** pour les formulaires comme les fiches de visiteurs ou les demandes de prière, afin de pouvoir assurer un suivi rapide.
:::

## Utiliser les données des formulaires

Les données recueillies par les formulaires peuvent vous aider à :

- Suivre les inscriptions aux événements et planifier en conséquence
- Assurer un suivi auprès des visiteurs ou des nouveaux membres
- Recueillir les commentaires des sondages pour la planification des ministères
- Traiter les paiements pour les événements ou les programmes

:::info
Les membres du formulaire ayant le rôle **Admin** ou **View Only** peuvent accéder à l'onglet **Form Submissions**. Assurez-vous que les bonnes personnes de votre équipe ont accès aux formulaires dont elles ont besoin en gérant les rôles dans l'onglet **Form Members**.
:::

:::info
Si un formulaire Stand Alone est [lié à un groupe](./creating-forms.md#linking-a-form-to-a-group), les responsables de ce groupe peuvent lire et imprimer ses réponses depuis la page du groupe sur B1.church, sans être membres du formulaire. Les responsables peuvent également y lire les réponses aux questions d'inscription pour les événements de leur groupe. Voir [Détails du groupe](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Si un formulaire Stand Alone est configuré pour créer une fiche de personne, les réponses associées à une personne existante apparaissent également dans la section **Forms** de la page de cette personne dans People, et pas seulement pour les formulaires de type People.
:::

## Étapes suivantes

- Apprenez à créer et personnaliser des formulaires dans [Créer des formulaires](./creating-forms.md)
- Ajoutez les personnes issues des réponses de formulaires à votre [répertoire des personnes](../people/adding-people.md) pour un suivi continu
- [Liez un formulaire à un groupe](./creating-forms.md#linking-a-form-to-a-group) pour que ses responsables puissent lire les réponses, ou [ajoutez automatiquement les personnes qui envoient le formulaire au groupe](./creating-forms.md#automatically-adding-submitters-to-a-group) afin qu'un formulaire d'inscription autonome constitue sa propre liste

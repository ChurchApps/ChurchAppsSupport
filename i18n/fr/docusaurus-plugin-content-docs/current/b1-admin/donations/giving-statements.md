---
title: "Relevés de dons"
---

# Relevés de dons

<div class="article-intro">

Chaque année, vos donateurs ont besoin d'un récapitulatif de leurs dons déductibles d'impôt pour leurs dossiers. B1 Admin vous permet de générer facilement ces relevés pour tous les donateurs en une seule fois, ce qui vous fait gagner des heures de travail manuel.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vérifiez que vos [fonds](funds.md) sont bien marqués comme **Déductibles d'impôt** -- seuls les dons aux fonds déductibles apparaissent sur les relevés
- Assurez-vous que tous les dons ont été [enregistrés](recording-donations.md) et que les transactions en ligne ont été [importées depuis Stripe](stripe-import.md)

</div>

## Accéder aux relevés de dons

1. Dans **B1 Admin**, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Dons**.
2. Cliquez sur **Relevés de dons**. La page **Relevés de dons par lot** s'ouvre.

## Générer les relevés

1. Dans le panneau **Sélectionner l'année**, choisissez l'**année** dans la liste déroulante. Vous pouvez choisir l'année en cours ou l'une des cinq années précédentes.
2. La page ne charge que les dons datés de cette année (du 1er janvier au 31 décembre), de sorte qu'elle s'ouvre rapidement même si votre église compte de nombreuses années d'historique de dons. Lorsque vous choisissez une autre année, le résumé se met à jour avec les dons de cette année. Le panneau **Résumé** sous l'année affiche les statistiques de cette année, notamment :
   - **Nombre total de donateurs** -- le nombre de personnes ayant donné
   - **Nombre total de dons** -- le nombre d'enregistrements de dons individuels
   - **Montant total** -- le montant combiné de tous les dons

## Télécharger les relevés

Le panneau **Options de téléchargement** vous offre deux façons de remettre les relevés à vos donateurs :

### Télécharger en fichiers CSV

Sous **Fichiers CSV individuels**, cliquez sur **Télécharger le ZIP** pour télécharger un fichier ZIP contenant un fichier CSV individuel pour chaque donateur. C'est utile si vous voulez envoyer les relevés par e-mail un à un ou les importer dans un autre système.

### Imprimer tous les relevés

Sous **Relevés imprimables**, cliquez sur **Tout imprimer** (le bouton affiche le nombre de relevés) pour ouvrir dans votre navigateur une version imprimable du relevé de chaque donateur pour l'année sélectionnée. Utilisez ensuite la fonction d'impression de votre navigateur pour les envoyer à une imprimante. Chaque relevé commence sur une nouvelle page, prêt à être plié et posté, et les relevés sont classés par nom de famille, puis par prénom du donateur.

Si vous avez téléversé un **Logo pour fond clair** dans [Site web > Apparence](../website/appearance.md), il s'imprime centré en haut de chaque relevé, au-dessus du titre du relevé. Cela s'applique à la fois à **Tout imprimer** et à l'impression du relevé d'un seul donateur depuis sa fiche.

:::tip
Lancez vos relevés tôt en janvier, pendant que vos dossiers sont à jour. Vérifiez bien que vos fonds sont correctement marqués comme déductibles d'impôt avant de générer les relevés -- seuls les dons aux fonds déductibles sont inclus.
:::

:::info
Les relevés de dons ne comprennent que les dons affectés à des fonds dont le paramètre **Déductible d'impôt** est activé. Si un fonds n'est pas marqué comme déductible d'impôt, ses dons n'apparaîtront pas sur le relevé. Vous pouvez gérer ce paramètre sur la page [Fonds](funds.md).
:::

## Formats de reçus pour le Canada, l'Australie et la Nouvelle-Zélande

Les églises situées hors des États-Unis peuvent basculer le relevé vers la mise en page officielle de reçu de leur pays. Cliquez sur **Format du relevé** en haut de la page Relevés de dons (ou accédez aux **Paramètres** et ouvrez la section **Dons**), puis réglez **Format du relevé** sur **Canada**, **Australie** ou **Nouvelle-Zélande**, et remplissez les champs qui apparaissent : votre numéro d'enregistrement (numéro d'enregistrement de l'ARC, ABN ou numéro d'enregistrement d'organisme de bienfaisance de la NZ), l'adresse de votre organisme, le nom de la personne autorisée à signer les reçus et, pour le Canada, la ville où les reçus sont émis.

Les relevés comportent alors la formulation qu'exige votre autorité fiscale (pour le Canada, « Reçu officiel aux fins de l'impôt sur le revenu » avec la référence de l'ARC), un numéro de reçu de la forme `ANNÉE-IDDONATEUR`, le montant admissible calculé à partir des seuls fonds déductibles, et une ligne distincte pour les dons aux fonds non déductibles. Les donateurs voient le même bloc de reçu lorsqu'ils impriment leur propre relevé depuis B1.church.

## Étapes suivantes

Si vous devez examiner les détails des dons avant de générer les relevés, consultez la page [Rapports de dons](donation-reports.md) ou vérifiez les [lots](batches.md) individuellement.

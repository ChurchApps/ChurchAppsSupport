---
title: "Relevés de dons"
---

# Relevés de dons

<div class="article-intro">

À la fin de chaque année, vos donateurs ont besoin d'un récapitulatif de leurs dons déductibles d'impôt pour leurs dossiers. B1 Admin permet de générer ces relevés pour tous les donateurs en une seule opération, vous faisant gagner des heures de travail manuel.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vérifiez que vos [fonds](funds.md) sont correctement marqués comme **Déductible d'impôt** -- seuls les dons faits à des fonds déductibles apparaissent sur les relevés
- Assurez-vous que tous les dons ont été [enregistrés](recording-donations.md) et que les transactions en ligne ont été [importées depuis Stripe](stripe-import.md)

</div>

## Accéder aux relevés de dons

1. Dans **B1 Admin**, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Dons**.
2. Cliquez sur **Relevés de dons**. La page **Relevés de dons par lot** s'ouvre.

## Générer les relevés

1. Dans le panneau **Sélectionner l'année**, choisissez l'**Année** dans la liste déroulante. Vous pouvez choisir l'année en cours ou l'une des cinq années précédentes.
2. La page ne charge que les dons datés de cette année (du 1er janvier au 31 décembre), elle s'ouvre donc rapidement même si votre église possède de nombreuses années d'historique de dons. Lorsque vous choisissez une autre année, le résumé se met à jour avec les dons de cette année. Le panneau **Résumé** sous l'année affiche des statistiques pour cette année, notamment :
   - **Total des donateurs** -- le nombre de personnes qui ont donné
   - **Nombre total de dons** -- le nombre d'enregistrements de dons individuels
   - **Montant total** -- le montant combiné de l'ensemble des dons

## Télécharger les relevés

Le panneau **Options de téléchargement** vous offre deux façons de transmettre les relevés à vos donateurs :

### Télécharger sous forme de fichiers CSV

Sous **Fichiers CSV individuels**, cliquez sur **Télécharger le ZIP** pour télécharger un fichier ZIP contenant un fichier CSV individuel pour chaque donateur. Cela est utile si vous voulez envoyer les relevés par courriel un à un ou les importer dans un autre système.

### Imprimer tous les relevés

Sous **Relevés imprimables**, cliquez sur **Tout imprimer** (le bouton indique le nombre de relevés) pour ouvrir dans votre navigateur une version imprimable du relevé de chaque donateur pour l'année sélectionnée. Utilisez ensuite la fonction d'impression de votre navigateur pour les envoyer à une imprimante. Chaque relevé commence sur une nouvelle page, prêt à être plié et posté, et les relevés sont classés par nom de famille du donateur, puis par prénom.

Si vous avez téléversé un **Logo sur fond clair** dans [Site web > Apparence](../website/appearance.md), il s'imprime centré en haut de chaque relevé, au-dessus du titre. Cela s'applique à la fois à **Tout imprimer** et à l'impression du relevé d'un seul donateur depuis sa fiche.

:::tip
Lancez vos relevés tôt en janvier, pendant que vos dossiers sont à jour. Vérifiez bien que vos fonds sont correctement marqués comme déductibles d'impôt avant de générer les relevés -- seuls les dons faits à des fonds déductibles sont inclus.
:::

:::info
Les relevés de dons ne comprennent que les dons affectés à des fonds dont le paramètre **Déductible d'impôt** est activé. Si un fonds n'est pas marqué comme déductible d'impôt, ses dons n'apparaîtront pas sur le relevé. Vous pouvez gérer ce paramètre sur la page [Fonds](funds.md).
:::

## Formats de reçus pour le Canada, l'Australie et la Nouvelle-Zélande

Les églises situées hors des États-Unis peuvent faire passer le relevé à la mise en page officielle de reçu de leur pays. Cliquez sur **Format du relevé** en haut de la page Relevés de dons (ou allez dans **Paramètres** et ouvrez la section **Dons**), puis réglez le **Format du relevé** sur **Canada**, **Australie** ou **Nouvelle-Zélande**, et remplissez les champs qui apparaissent : votre numéro d'enregistrement (numéro d'enregistrement auprès de l'ARC, ABN ou numéro d'enregistrement d'organisme de bienfaisance néo-zélandais), l'adresse de votre organisme, le nom de la personne autorisée à signer les reçus et, pour le Canada, la ville où les reçus sont délivrés.

Les relevés comportent alors la formulation qu'exige votre autorité fiscale (pour le Canada, « Reçu officiel à des fins d'impôt sur le revenu » avec la référence de l'ARC), un numéro de reçu sous la forme `ANNÉE-IDDONATEUR`, le montant admissible compté uniquement à partir des fonds déductibles d'impôt, et une ligne distincte pour les dons faits à des fonds non déductibles. Les donateurs voient le même bloc de reçu lorsqu'ils impriment leur propre relevé depuis B1.church.

## Ce que voient les membres dans B1.church

La même section **Dons** des paramètres contrôle ce que les membres voient sur leur propre page de dons dans B1.church :

- **Historique des dons des membres** détermine les années que les membres peuvent consulter. **Toutes les années** est la valeur par défaut. **Jusqu'en 2025** (ou toute autre année) s'arrête à cette année, de sorte que les membres ne peuvent pas consulter ni imprimer une année ultérieure tant que vous ne l'autorisez pas. Utilisez ce réglage pour retenir l'année en cours pendant que vous terminez les corrections et les remboursements. **Masqué** supprime complètement l'historique des dons, les totaux annuels et l'impression des relevés. Les membres peuvent toujours donner.
- **Note sur les dons** est un court message affiché sur la page de dons du membre et dans son historique, et imprimé en bas de chaque relevé de dons, y compris les relevés que vous imprimez ici. Utilisez-la pour des informations comme votre politique de remboursement.

Ces paramètres ne modifient que ce que voient les membres. Vous pouvez toujours imprimer n'importe quelle année depuis cette page.

## Et ensuite

Si vous devez passer en revue les détails des dons avant de générer les relevés, consultez la page [Rapports de dons](donation-reports.md) ou examinez des [lots](batches.md) individuels.

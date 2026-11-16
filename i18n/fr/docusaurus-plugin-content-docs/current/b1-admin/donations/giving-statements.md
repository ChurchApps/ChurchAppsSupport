---
title: "Relevés de dons"
description: "Créez les relevés de dons de fin d'année pour chaque donateur dans B1 Admin, puis téléchargez-les en fichiers CSV ou imprimez-les pour l'envoi postal avec les totaux déductibles d'impôt."
---

# Relevés de dons {#giving-statements}

<div class="article-intro">

À la fin de chaque année, vos donateurs ont besoin d'un résumé de leurs dons déductibles d'impôt pour leurs dossiers. B1 Admin vous permet de générer facilement ces relevés pour tous les donateurs à la fois, ce qui vous fait gagner des heures de travail manuel.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vérifiez que vos [fonds](funds.md) sont correctement marqués comme **Déductibles d'impôt** -- seuls les dons versés à des fonds déductibles apparaissent sur les relevés
- Assurez-vous que tous les dons ont été [enregistrés](recording-donations.md) et que les transactions en ligne ont été [importées depuis Stripe](stripe-import.md)

</div>

## Accéder aux relevés de dons {#accessing-giving-statements}

1. Dans **B1 Admin**, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Dons**.
2. Cliquez sur **Relevés de dons**. La page **Relevés de dons par lot** s'ouvre.

## Générer les relevés {#generating-statements}

1. Dans le panneau **Choisir l'année**, sélectionnez l'**Année** dans la liste déroulante. Vous pouvez choisir l'année en cours ou l'une des cinq années précédentes.
2. La page ne charge que les dons datés de cette année (du 1er janvier au 31 décembre), de sorte qu'elle s'ouvre rapidement même si votre église compte de nombreuses années d'historique de dons. Lorsque vous choisissez une autre année, le résumé se met à jour avec les dons de cette année. Le panneau **Résumé** sous l'année affiche des statistiques pour cette année, en comptant les mêmes dons que ceux inclus dans les relevés (les dons versés uniquement à des fonds non déductibles sont exclus) :
   - **Nombre total de donateurs** -- le nombre de personnes ayant donné
   - **Nombre total de dons** -- le nombre d'enregistrements de dons individuels
   - **Montant total** -- le montant cumulé de leurs dons

## Télécharger les relevés {#downloading-statements}

Le panneau **Options de téléchargement** vous offre deux façons de transmettre les relevés à vos donateurs :

### Télécharger en fichiers CSV {#download-as-csv-files}

Sous **Fichiers CSV individuels**, cliquez sur **Télécharger le ZIP** (le bouton indique le nombre de fichiers) pour télécharger un fichier ZIP contenant un fichier CSV individuel pour chaque donateur. C'est utile si vous voulez envoyer les relevés individuellement par courriel ou les importer dans un autre système.

### Imprimer tous les relevés {#print-all-statements}

Sous **Relevés imprimables**, cliquez sur **Tout imprimer** (le bouton indique le nombre de relevés) pour ouvrir dans votre navigateur une version imprimable du relevé de chaque donateur pour l'année choisie. Utilisez ensuite la fonction d'impression de votre navigateur pour les envoyer à une imprimante. Chaque relevé commence sur une nouvelle page afin d'être prêt à être plié et posté, et les relevés sont classés par nom de famille, puis par prénom du donateur.

Si vous avez téléversé un **logo pour fond clair** dans [Site web > Apparence](../website/appearance.md), il s'imprime centré en haut de chaque relevé, au-dessus du titre du relevé. Cela s'applique à **Tout imprimer**, au relevé d'un seul donateur imprimé depuis sa fiche, ainsi qu'aux relevés que les membres impriment eux-mêmes depuis la page **Dons** de B1.church.

:::tip
Générez vos relevés tôt en janvier, pendant que vos registres sont encore frais. Vérifiez à deux reprises que vos fonds sont correctement marqués comme déductibles d'impôt avant de générer les relevés -- seuls les dons versés à des fonds déductibles sont inclus.
:::

:::info
Les relevés de dons ne comprennent que les dons attribués à des fonds dont le paramètre **Déductible d'impôt** est activé. Si un fonds n'est pas marqué comme déductible d'impôt, ses dons n'apparaîtront pas sur le relevé. Vous pouvez gérer ce paramètre sur la page [Fonds](funds.md).
:::

## Mémos sur les relevés {#gift-memos-on-statements}

Chaque relevé énumère chaque don avec sa date, son mode, son fonds et son montant. Lorsqu'au moins un don d'un relevé comporte un **Mémo**, une colonne **Mémo** est ajoutée après le fonds, afin que le donateur voie à quoi servait chaque don. Les relevés sans mémo conservent la mise en page à quatre colonnes. Les **Notes** d'un don sont internes et n'apparaissent jamais sur un relevé. Les fichiers CSV du ZIP incluent le mémo comme dernière colonne.

Pour indiquer une affectation sur le relevé, saisissez-la comme **Mémo** du don lors de [l'enregistrement du don](recording-donations.md), ou créez-lui un [fonds](funds.md) distinct si vous voulez le totaliser séparément.

## Formats de reçus pour le Canada, l'Australie et la Nouvelle-Zélande {#receipt-formats-for-canada-australia-and-new-zealand}

Les églises situées hors des États-Unis peuvent faire passer le relevé à la mise en page officielle de reçu de leur pays. Cliquez sur **Format du relevé** en haut de la page Relevés de dons (ou allez dans **Paramètres** et ouvrez la section **Dons**), puis réglez le **Format du relevé** (qui commence sur **Standard**) sur **Canada - reçu officiel de l'ARC**, **Australie** ou **Nouvelle-Zélande**, puis remplissez les champs qui apparaissent : votre numéro d'enregistrement (**Numéro d'enregistrement ARC**, **ABN** ou **Numéro d'enregistrement d'organisme de bienfaisance NZ**), l'**Adresse de l'organisation**, le **Nom du signataire autorisé** et, pour le Canada, la **Ville de délivrance**. Cliquez sur **Enregistrer**.

Les relevés comportent alors la formulation qu'attend votre autorité fiscale (pour le Canada, « Reçu officiel aux fins de l'impôt sur le revenu » avec la référence de l'ARC), un numéro de reçu sous la forme `YEAR-DONORID`, le montant admissible compté uniquement à partir des fonds déductibles d'impôt, ainsi qu'une ligne distincte pour les dons versés à des fonds non déductibles. Les donateurs voient le même bloc de reçu lorsqu'ils impriment leur propre relevé depuis B1.church.

## Ce que voient les membres dans B1.church {#what-members-see-in-b1church}

La même section **Dons** des paramètres contrôle ce que les membres voient sur leur propre page de dons dans B1.church :

- **Historique des dons des membres** détermine les années visibles par les membres. **Toutes les années** est la valeur par défaut. **Jusqu'en 2025** (ou toute autre année) s'arrête à cette année, de sorte que les membres ne peuvent ni consulter ni imprimer une année ultérieure tant que vous ne l'avez pas autorisée. Utilisez cette option pour retenir l'année en cours pendant que vous terminez les corrections et les remboursements. **Masqué** supprime complètement l'historique des dons, les totaux annuels et l'impression des relevés. Les membres peuvent toujours donner.
- **Note sur les dons** est un court message affiché sur la page de dons du membre et dans son historique, et imprimé au bas de chaque relevé de dons, y compris les relevés que vous imprimez ici. Utilisez-la pour des éléments comme votre politique de remboursement.

Ces paramètres ne modifient que ce que voient les membres. Vous pouvez toujours imprimer n'importe quelle année depuis cette page.

## Étapes suivantes {#next-steps}

Si vous devez vérifier les détails des dons avant de générer les relevés, consultez la page [Rapports sur les dons](donation-reports.md) ou examinez les [lots](batches.md) individuels.

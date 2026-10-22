---
title: "Relevés de dons"
---

# Relevés de dons {#giving-statements}

<div class="article-intro">

À la fin de chaque année, vos donateurs ont besoin d'un résumé de leurs dons déductibles d'impôt pour leurs dossiers. B1 Admin permet de générer ces relevés pour tous les donateurs en une seule fois, ce qui vous fait gagner des heures de travail manuel.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vérifiez que vos [fonds](funds.md) sont correctement marqués comme **Déductibles d'impôt** -- seuls les dons faits à des fonds déductibles apparaissent sur les relevés
- Assurez-vous que tous les dons ont été [enregistrés](recording-donations.md) et que toutes les transactions en ligne ont été [importées depuis Stripe](stripe-import.md)

</div>

## Accéder aux relevés de dons {#accessing-giving-statements}

1. Dans **B1 Admin**, ouvrez le [menu de saut](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Dons**.
2. Cliquez sur **Relevés de dons**. La page **Relevés de dons par lot** s'ouvre.

## Générer les relevés {#generating-statements}

1. Dans le panneau **Sélectionner l'année**, choisissez l'**Année** dans la liste déroulante. Vous pouvez choisir l'année en cours ou l'une des cinq années précédentes.
2. La page ne charge que les dons datés de cette année (du 1er janvier au 31 décembre), elle s'ouvre donc rapidement même si votre église a un long historique de dons. Lorsque vous choisissez une autre année, le résumé se met à jour avec les dons de cette année. Le panneau **Résumé** sous l'année affiche les statistiques de cette année, notamment :
   - **Total des donateurs** -- le nombre de personnes qui ont donné
   - **Total des dons** -- le nombre de dons individuels enregistrés
   - **Montant total** -- le montant total en dollars de tous les dons

## Télécharger les relevés {#downloading-statements}

Le panneau **Options de téléchargement** vous offre deux façons de remettre les relevés à vos donateurs :

### Télécharger en fichiers CSV {#download-as-csv-files}

Sous **Fichiers CSV individuels**, cliquez sur **Télécharger le ZIP** pour télécharger un fichier ZIP contenant un fichier CSV individuel pour chaque donateur. C'est utile si vous voulez envoyer les relevés par courriel individuellement ou les importer dans un autre système.

### Imprimer tous les relevés {#print-all-statements}

Sous **Relevés imprimables**, cliquez sur **Tout imprimer** (le bouton affiche le nombre de relevés) pour ouvrir dans votre navigateur une vue imprimable de chaque relevé de donateur pour l'année sélectionnée. Utilisez ensuite la fonction d'impression de votre navigateur pour les envoyer à une imprimante. Chaque relevé commence sur une nouvelle page, prêt à être plié et posté, et les relevés sont classés par nom de famille, puis par prénom du donateur.

Si vous avez téléversé un **logo sur fond clair** sous [Site web > Apparence](../website/appearance.md), il est imprimé centré en haut de chaque relevé, au-dessus du titre. Cela s'applique à **Tout imprimer** comme au relevé d'un seul donateur imprimé depuis sa fiche.

:::tip
Générez vos relevés tôt en janvier, pendant que vos dossiers sont à jour. Vérifiez bien que vos fonds sont correctement marqués comme déductibles d'impôt avant de générer les relevés -- seuls les dons faits à des fonds déductibles sont inclus.
:::

:::info
Les relevés de dons incluent uniquement les dons affectés à des fonds dont le paramètre **Déductible d'impôt** est activé. Si un fonds n'est pas marqué comme déductible d'impôt, ses dons n'apparaîtront pas sur le relevé. Vous pouvez gérer ce paramètre sur la page [Fonds](funds.md).
:::

## Formats de reçus pour le Canada, l'Australie et la Nouvelle-Zélande {#receipt-formats-for-canada-australia-and-new-zealand}

Les églises situées hors des États-Unis peuvent faire passer le relevé à la mise en page officielle de reçu de leur pays. Cliquez sur **Format du relevé** en haut de la page Relevés de dons (ou allez dans **Paramètres** et ouvrez la section **Dons**), puis réglez **Format du relevé** sur **Canada**, **Australie** ou **Nouvelle-Zélande**. Remplissez ensuite les champs qui apparaissent : votre numéro d'enregistrement (numéro d'enregistrement de l'ARC, ABN ou numéro d'organisme de bienfaisance de la NZ), l'adresse de votre organisme, le nom de la personne autorisée à signer les reçus et, pour le Canada, la ville où les reçus sont émis.

Les relevés comportent alors la formulation qu'exige votre autorité fiscale (pour le Canada, « Reçu officiel aux fins de l'impôt sur le revenu » avec la référence de l'ARC), un numéro de reçu sous la forme `ANNÉE-IDDONATEUR`, le montant admissible calculé uniquement à partir des fonds déductibles d'impôt, et une ligne distincte pour les dons faits à des fonds non déductibles. Les donateurs voient le même bloc de reçu lorsqu'ils impriment leur propre relevé depuis B1.church.

## Ce que les membres voient dans B1.church {#what-members-see-in-b1church}

La même section **Dons** des paramètres contrôle ce que les membres voient sur leur propre page de dons dans B1.church :

- **Historique des dons du membre** détermine les années que les membres peuvent voir. **Toutes les années** est la valeur par défaut. **Jusqu'en 2025** (ou toute autre année) s'arrête à cette année, de sorte que les membres ne peuvent pas consulter ou imprimer une année ultérieure tant que vous ne l'autorisez pas. Utilisez-le pour retenir l'année en cours pendant que vous terminez les corrections et les remboursements. **Masqué** supprime complètement l'historique des dons, les totaux annuels et l'impression des relevés. Les membres peuvent toujours donner.
- **Note sur les dons** est un court message affiché sur la page de dons du membre et dans son historique, et imprimé au bas de chaque relevé de dons, y compris les relevés que vous imprimez ici. Utilisez-la pour des éléments comme votre politique de remboursement.

Ces paramètres ne modifient que ce que voient les membres. Vous pouvez toujours imprimer n'importe quelle année depuis cette page.

## Étapes suivantes {#next-steps}

Si vous devez examiner les détails des dons avant de générer les relevés, consultez la page [Rapports de dons](donation-reports.md) ou vérifiez les [lots](batches.md) individuels.

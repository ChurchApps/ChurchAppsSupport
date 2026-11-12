---
title: "Prise en charge multidevise"
description: "Enregistrez et présentez les dons dans différentes devises dans B1 Admin, y compris la saisie manuelle, les dons en ligne par Stripe et la façon dont les totaux combinés sont convertis."
---

# Prise en charge multidevise

<div class="article-intro">

La fonctionnalité multidevise de B1 permet à votre église d'accepter et de suivre des dons dans différentes devises. Elle est particulièrement utile pour les églises comptant des membres internationaux, des missionnaires ou plusieurs campus dans différents pays.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation de gérer les dons. Voir [Rôles et autorisations](../people/roles-permissions.md) pour plus de détails.
- Configurez vos [dons en ligne](./online-giving-setup.md) avec Stripe, qui prend en charge les transactions multidevises. Une église sans dons en ligne peut tout de même choisir la devise dans laquelle ses dons saisis à la main sont enregistrés.
- Comprenez les besoins comptables de votre église en matière de gestion de plusieurs devises.

</div>

La devise de votre église correspond au départ à la devise du pays saisi lors de l'inscription de l'église (par exemple, le shilling kényan pour une église au Kenya), et elle est utilisée tant qu'aucune devise n'a été enregistrée. Vous pouvez la modifier à tout moment dans **Paramètres → Dons** (la liste déroulante **Devise**). Si votre pays n'est pas reconnu, la devise par défaut est le dollar américain.

## Activer la multidevise {#enabling-multi-currency}

La prise en charge multidevise est activée par défaut dans B1 :

- Les dons en ligne sont facturés dans la devise choisie dans vos paramètres de **Dons**
- Chaque don conserve la devise dans laquelle il a été enregistré, et chaque ligne de don individuelle affiche cette devise
- Les totaux combinés sont convertis dans la devise de votre église (voir [Totaux convertis](#converted-totals))
- Stripe gère la conversion de devise vers la devise de versement de votre compte pour les dons en ligne

## Devises prises en charge {#supported-currencies}

Le système prend en charge toutes les grandes devises mondiales, notamment :

- **USD** -- dollar américain
- **EUR** -- euro
- **GBP** -- livre sterling
- **CAD** -- dollar canadien
- **AUD** -- dollar australien
- **MXN** -- peso mexicain
- **BRL** -- réal brésilien
- **INR** -- roupie indienne
- **CNY** -- yuan chinois
- **JPY** -- yen japonais
- Et bien d'autres...

Les devises disponibles pour les dons en ligne dépendent des devises prises en charge par votre compte Stripe.

## Enregistrer des dons dans différentes devises {#recording-donations-in-different-currencies}

### Dons en ligne {#online-donations}

Lorsqu'un membre donne en ligne par Stripe :

1. Le don est facturé dans la devise définie dans **Paramètres → Dons** ; les donateurs ne choisissent pas de devise au moment du paiement
2. Stripe traite le paiement dans cette devise
3. Le don est enregistré dans B1 avec cette devise et ce montant
4. Stripe gère automatiquement toute conversion de devise nécessaire vers la devise de versement de votre compte

Si vous modifiez plus tard le paramètre **Devise**, les nouveaux dons utilisent la nouvelle devise, tandis que les dons déjà enregistrés conservent la leur ; vos registres peuvent donc contenir plusieurs devises.

### Saisie manuelle {#manual-entry}

Les dons que vous saisissez à la main -- dans un lot, avec **Importer un CSV**, ou avec **Enregistrer un don** sur la fiche d'une personne -- sont toujours enregistrés dans la devise de votre église, affichée à côté du champ **Montant**. Il n'y a pas de liste déroulante de devises pour la saisie manuelle ; convertissez donc un don effectué dans une autre devise vers la devise de votre église avant de le saisir, et notez le montant d'origine dans les **Notes** si vous en avez besoin.

## Consulter les dons multidevises {#viewing-multi-currency-donations}

### Rapports sur les dons {#donation-reports}

Les lignes de dons individuelles -- dans un lot, sur la page d'un fonds et dans l'historique de dons d'une personne -- affichent chaque don dans la devise dans laquelle il a été enregistré. Les totaux combinés sont convertis, comme décrit ci-dessous.

### Totaux convertis {#converted-totals}

Partout où B1 affiche un total combiné unique -- les cartes d'indicateurs du résumé des dons, le total d'un lot de dons et le total d'un fonds --, les dons enregistrés dans une devise autre que celle par défaut de votre église sont convertis dans la devise de votre église aux taux de change actuels, de sorte que le total soit un nombre unique et significatif au lieu d'additionner des devises différentes. Une note **Converti aux taux de change actuels** apparaît sous le total chaque fois qu'une conversion a été appliquée. Les lignes de dons individuelles s'affichent toujours dans leur devise d'origine.

### Relevés de dons {#giving-statements}

Les relevés de dons indiquent le montant de chaque don tel qu'il a été enregistré et additionnent ces montants sans conversion ; un relevé n'est donc exact que si tous les dons de l'année de ce donateur sont dans la devise de votre église. Si un donateur a donné dans plusieurs devises, vérifiez son relevé avant de l'envoyer.

## Intégration Stripe {#stripe-integration}

Pour les dons en ligne, Stripe gère les transactions multidevises :

- **Conversion automatique** -- Stripe convertit les devises dans la devise par défaut de votre compte
- **Taux de change** -- Stripe utilise les taux de change actuels du marché
- **Frais** -- La conversion de devise peut entraîner des frais Stripe supplémentaires
- **Devise de versement** -- Les fonds sont déposés dans la devise par défaut de votre compte

:::info
Consultez votre tableau de bord Stripe pour connaître les taux de conversion actuels et les frais associés aux transactions multidevises.
:::

## Considérations comptables {#accounting-considerations}

Lorsque vous travaillez avec plusieurs devises :

- **Tenue des registres** -- Conservez les montants et devises d'origine des dons pour des rapports exacts
- **Taux de change** -- Notez que les taux de conversion de Stripe peuvent différer de ceux de votre banque
- **Reçus fiscaux** -- Consultez votre comptable sur la manière de déclarer les dons dans différentes devises à des fins fiscales
- **Affectation aux fonds** -- Vous pouvez affecter les dons à des fonds précis quelle que soit la devise

## Bonnes pratiques {#best-practices}

- **Devise par défaut** -- Définissez votre devise d'église principale dans **Paramètres > Dons** pour que les dons saisis à la main et les totaux de dons l'utilisent
- **Communication claire** -- Indiquez aux donateurs la devise dans laquelle ils donnent pendant le processus de paiement
- **Rapports cohérents** -- Les totaux combinés sont toujours convertis automatiquement dans la devise de votre église ; ouvrez un lot ou un fonds pour voir le montant et la devise d'origine de chaque don
- **Rapprochement régulier** -- Rapprochez les versements Stripe de vos registres de dons, en tenant compte des conversions de devises

## Limites {#limitations}

- La conversion de devise pour le traitement des paiements est assurée par Stripe pour les dons en ligne uniquement ; les dons manuels sont enregistrés dans la devise de votre église telle que saisie
- Les rapports historiques et les lignes de dons individuelles affichent toujours la devise d'origine dans laquelle le don a été enregistré
- Les totaux combinés (cartes d'indicateurs, totaux de lots, totaux de fonds) sont convertis dans la devise de votre église aux taux de change actuels -- ces taux peuvent légèrement différer de ceux de votre banque ou de Stripe au moment du règlement des fonds

## Articles connexes {#related-articles}

- [Configuration des dons en ligne](./online-giving-setup.md) -- Configurer Stripe pour accepter les dons
- [Enregistrer des dons](./recording-donations.md) -- Saisir manuellement les enregistrements de dons
- [Rapports sur les dons](./donation-reports.md) -- Générer et consulter les résumés de dons
- [Relevés de dons](./giving-statements.md) -- Créer les relevés de fin d'année

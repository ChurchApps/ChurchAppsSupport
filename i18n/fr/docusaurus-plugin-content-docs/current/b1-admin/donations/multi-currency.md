---
title: "Prise en charge multidevise"
description: "Enregistrez et présentez les dons en différentes devises dans B1 Admin, y compris la saisie manuelle, les dons en ligne par Stripe et la conversion des totaux combinés."
---

# Prise en charge multidevise

<div class="article-intro">

La fonctionnalité multidevise de B1 permet à votre église d'accepter et de suivre les dons dans différentes devises. Elle est particulièrement utile pour les églises qui comptent des membres internationaux, des missionnaires ou plusieurs campus dans différents pays.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir la permission de gérer les dons. Voir [Rôles et autorisations](../people/roles-permissions.md) pour les détails.
- Configurez vos [dons en ligne](./online-giving-setup.md) avec Stripe, qui prend en charge les transactions multidevises. Une église sans dons en ligne peut tout de même choisir la devise dans laquelle sont enregistrés les dons saisis à la main.
- Connaissez les besoins comptables de votre église pour la gestion de plusieurs devises.

</div>

La devise de votre église correspond au départ à la devise du pays indiqué lors de votre inscription (par exemple, le shilling kényan pour une église au Kenya) ; elle sert tant qu'aucune autre devise n'a été enregistrée. Vous pouvez la modifier à tout moment sous **Gérer l'église → Dons**. Si votre pays n'est pas reconnu, la devise par défaut est le dollar américain.

## Activer la multidevise

La prise en charge multidevise est désormais activée par défaut dans B1. Une fois activée :

- Les membres peuvent donner dans leur devise locale lorsqu'ils font un don en ligne
- Vous pouvez enregistrer manuellement les dons dans n'importe quelle devise
- Les rapports de dons affichent les montants dans leur devise d'origine
- Stripe gère automatiquement la conversion de devises pour les dons en ligne

## Devises prises en charge

Le système prend en charge toutes les principales devises mondiales, notamment :

- **USD** -- Dollar américain
- **EUR** -- Euro
- **GBP** -- Livre sterling
- **CAD** -- Dollar canadien
- **AUD** -- Dollar australien
- **MXN** -- Peso mexicain
- **BRL** -- Réal brésilien
- **INR** -- Roupie indienne
- **CNY** -- Yuan chinois
- **JPY** -- Yen japonais
- Et bien d'autres...

Les devises disponibles pour les dons en ligne dépendent des devises prises en charge par votre compte Stripe.

## Enregistrer des dons en différentes devises

### Dons en ligne

Lorsqu'un membre donne en ligne par Stripe :

1. Il choisit sa devise préférée au moment du paiement
2. Stripe traite le paiement dans cette devise
3. Le don est enregistré dans B1 avec le montant dans sa devise d'origine
4. Stripe effectue automatiquement toute conversion nécessaire vers la devise par défaut de votre compte

### Saisie manuelle

Les dons en espèces et par chèque que vous saisissez à la main sont enregistrés dans la devise de votre église, c'est-à-dire la **devise** définie sous **Paramètres > Dons** (voir [Choisir votre devise](./online-giving-setup.md#choosing-your-currency)). Il n'existe pas de choix de devise par don. Le champ **Montant** affiche à sa fin le code de la devise (par exemple *PHP*), afin que vous sachiez dans quelle devise vous saisissez le montant.

1. Accédez à **Dons > Lots** dans B1 Admin et ouvrez le lot
2. Cliquez sur **Ajouter un don** en haut de la page du lot
3. Saisissez le montant dans la devise de votre église
4. Complétez le reste des détails du don
5. Cliquez sur **Enregistrer**

La modification d'un don existant conserve la devise dans laquelle il a été enregistré à l'origine.

## Afficher les dons multidevises

### Rapports de dons

Les rapports de dons affichent les montants dans leur devise d'origine :

- Les enregistrements de dons individuels affichent le code de devise (par exemple « 100,00 $ USD »)
- Les totaux sont calculés par devise
- Vous pouvez filtrer par devise précise

### Totaux convertis {#converted-totals}

Partout où B1 affiche un total combiné unique -- les cartes KPI du résumé des dons, le total d'un lot de dons et le total d'un fonds -- les dons enregistrés dans une devise autre que celle par défaut de votre église sont convertis dans la devise de votre église aux taux de change actuels. Le total est ainsi un seul nombre significatif, au lieu d'additionner des devises différentes. Une note **Converti aux taux de change actuels** apparaît sous le total chaque fois qu'une conversion a été appliquée. Les lignes de dons individuelles restent affichées dans leur devise d'origine.

### Relevés de dons

Lors de la génération des relevés de dons :

- Chaque don apparaît dans sa devise d'origine
- Les totaux sont ventilés par devise
- Les membres voient exactement ce qu'ils ont donné dans chaque devise

## Intégration à Stripe

Pour les dons en ligne, Stripe gère les transactions multidevises :

- **Conversion automatique** -- Stripe convertit les devises vers la devise par défaut de votre compte
- **Taux de change** -- Stripe utilise les taux de change du marché actuels
- **Frais** -- La conversion de devises peut entraîner des frais Stripe supplémentaires
- **Devise de versement** -- Les fonds sont déposés dans la devise par défaut de votre compte

:::info
Consultez votre tableau de bord Stripe pour voir les taux de conversion actuels et les frais associés aux transactions multidevises.
:::

## Considérations comptables

Lorsque vous travaillez avec plusieurs devises :

- **Tenue des registres** -- Conservez les montants et les devises d'origine des dons pour que vos rapports soient exacts
- **Taux de change** -- Les taux de conversion de Stripe peuvent différer de ceux de votre banque
- **Reçus fiscaux** -- Consultez votre comptable sur la façon de déclarer les dons en différentes devises aux fins fiscales
- **Affectation aux fonds** -- Vous pouvez affecter les dons à des fonds précis, quelle que soit la devise

## Meilleures pratiques

- **Devise par défaut** -- Réglez la devise principale de votre église sous **Paramètres > Dons**, afin que les dons saisis à la main et les totaux utilisent cette devise
- **Communication claire** -- Indiquez aux donateurs dans quelle devise ils donnent pendant le processus de paiement
- **Rapports cohérents** -- Les totaux combinés sont toujours convertis automatiquement dans la devise de votre église ; utilisez le filtre de devise par don lorsque vous avez besoin de voir les montants d'origine
- **Rapprochement régulier** -- Rapprochez les versements Stripe de vos registres de dons en tenant compte des conversions de devises

## Limites

- La conversion de devises pour le traitement des paiements est assurée par Stripe pour les dons en ligne seulement ; les dons saisis manuellement sont enregistrés tels quels, sans conversion automatique
- Les rapports historiques et les lignes de dons individuelles affichent toujours la devise d'origine dans laquelle le don a été enregistré
- Les totaux combinés (cartes KPI, totaux de lots, totaux de fonds) sont convertis dans la devise de votre église aux taux de change actuels. Ces taux peuvent différer légèrement de ceux de votre banque ou de Stripe au moment où les fonds sont versés

## Articles connexes

- [Dons en ligne](./online-giving-setup.md) -- Configurer Stripe pour accepter les dons
- [Enregistrer des dons](./recording-donations.md) -- Saisir manuellement les dossiers de dons
- [Rapports de dons](./donation-reports.md) -- Générer et consulter les résumés de dons
- [Relevés de dons](./giving-statements.md) -- Créer les relevés de dons de fin d'année

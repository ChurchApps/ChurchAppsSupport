---
title: "Prise en charge multi-devises"
---

# Prise en charge multi-devises

<div class="article-intro">

La fonctionnalité multi-devises de B1 permet à votre église d'accepter et de suivre les dons dans différentes devises. Ceci est particulièrement utile pour les églises avec des membres internationaux, des missionnaires ou plusieurs campus dans différents pays.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission de gérer les dons. Consultez [Rôles et permissions](../people/roles-permissions.md) pour plus de détails.
- Configurez vos [dons en ligne](./online-giving-setup.md) avec Stripe, qui prend en charge les transactions multi-devises.
- Comprenez les besoins comptables de votre église pour gérer plusieurs devises.

</div>

## Activer le multi-devises

La prise en charge multi-devises est maintenant activée par défaut dans B1. Une fois activée :

- Les membres peuvent donner dans leur devise locale lorsqu'ils font des dons en ligne
- Vous pouvez enregistrer manuellement des dons dans n'importe quelle devise
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

## Enregistrer des dons dans différentes devises

### Dons en ligne

Lorsqu'un membre donne en ligne via Stripe :

1. Il sélectionne sa devise préférée lors du paiement
2. Stripe traite le paiement dans cette devise
3. Le don est enregistré dans B1 avec le montant de la devise d'origine
4. Stripe gère automatiquement toute conversion de devise nécessaire vers la devise par défaut de votre compte

### Saisie manuelle

Pour enregistrer un don en espèces ou par chèque dans une devise différente :

1. Accédez à **Dons** dans B1 Admin
2. Cliquez sur **Ajouter un don**
3. Sélectionnez la devise dans le menu déroulant des devises
4. Saisissez le montant dans cette devise
5. Complétez le reste des détails du don
6. Cliquez sur **Enregistrer**

## Consulter les dons multi-devises

### Rapports de dons

Les rapports de dons affichent les montants dans leur devise d'origine :

- Les enregistrements de dons individuels affichent le code de devise (par exemple, « 100,00 $ USD »)
- Les totaux sont calculés par devise
- Vous pouvez filtrer par devises spécifiques

### Relevés de dons

Lors de la génération de relevés de dons :

- Chaque don apparaît avec sa devise d'origine
- Les totaux sont répartis par devise
- Les membres voient exactement ce qu'ils ont donné dans chaque devise

## Intégration Stripe

Pour les dons en ligne, Stripe gère les transactions multi-devises :

- **Conversion automatique** -- Stripe convertit les devises vers la devise par défaut de votre compte
- **Taux de change** -- Stripe utilise les taux de change actuels du marché
- **Frais** -- La conversion de devises peut entraîner des frais Stripe supplémentaires
- **Devise de paiement** -- Les fonds sont déposés dans la devise par défaut de votre compte

:::info
Consultez votre tableau de bord Stripe pour voir les taux de conversion actuels et les frais associés aux transactions multi-devises.
:::

## Considérations comptables

Lorsque vous travaillez avec plusieurs devises :

- **Tenue de registres** -- Gardez une trace des montants et des devises de dons d'origine pour des rapports précis
- **Taux de change** -- Notez que les taux de conversion de Stripe peuvent différer des taux de votre banque
- **Reçus fiscaux** -- Consultez votre comptable sur la façon de déclarer les dons dans différentes devises à des fins fiscales
- **Allocation de fonds** -- Vous pouvez affecter des dons à des fonds spécifiques quelle que soit la devise

## Bonnes pratiques

- **Devise par défaut** -- Définissez la devise principale de votre église comme devise par défaut pour la plupart des transactions
- **Communication claire** -- Indiquez aux donateurs dans quelle devise ils donnent pendant le processus de paiement
- **Rapports cohérents** -- Décidez s'il faut rapporter dans les devises d'origine ou convertir en une seule devise pour les résumés
- **Rapprochement régulier** -- Rapprochez les paiements Stripe avec vos enregistrements de dons, en tenant compte des conversions de devises

## Limitations

- La conversion de devises est gérée par Stripe pour les dons en ligne uniquement
- Les dons manuels sont enregistrés tels que saisis sans conversion automatique
- Les rapports historiques affichent les dons dans leurs devises d'origine
- Les calculs de totaux sont effectués par devise, pas entre les devises

## Articles connexes

- [Configuration des dons en ligne](./online-giving-setup.md) -- Configurez Stripe pour accepter des dons
- [Enregistrement des dons](./recording-donations.md) -- Saisissez manuellement des enregistrements de dons
- [Rapports de dons](./donation-reports.md) -- Générez et consultez des résumés de dons
- [Relevés de dons](./giving-statements.md) -- Créez des relevés de dons de fin d'année

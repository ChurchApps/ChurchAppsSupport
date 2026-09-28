---
title: "Support Multi-Devises"
---

# Support Multi-Devises

<div class="article-intro">

La fonctionnalité multi-devises de B1 permet à votre église d'accepter et de suivre les dons dans différentes devises. Ceci est particulièrement utile pour les églises avec des membres internationaux, des missionnaires ou plusieurs campus dans différents pays.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission de gérer les dons. Voir [Rôles et Autorisations](../people/roles-permissions.md) pour les détails.
- Configurez votre [don en ligne](./online-giving-setup.md) avec Stripe, qui prend en charge les transactions multi-devises.
- Comprenez les besoins comptables de votre église pour traiter plusieurs devises.

</div>

## Activation du Support Multi-Devises

Le support multi-devises est maintenant activé par défaut dans B1. Une fois activé :

- Les membres peuvent donner dans leur devise locale lors d'un don en ligne
- Vous pouvez enregistrer manuellement les dons dans n'importe quelle devise
- Les rapports de dons affichent les montants dans leur devise d'origine
- Stripe gère la conversion de devises automatiquement pour les dons en ligne

## Devises Acceptées

Le système prend en charge toutes les principales devises mondiales, y compris :

- **USD** -- Dollar américain
- **EUR** -- Euro
- **GBP** -- Livre sterling
- **CAD** -- Dollar canadien
- **AUD** -- Dollar australien
- **MXN** -- Peso mexicain
- **BRL** -- Real brésilien
- **INR** -- Roupie indienne
- **CNY** -- Yuan chinois
- **JPY** -- Yen japonais
- Et bien d'autres...

Les devises disponibles pour les dons en ligne dépendent des devises prises en charge par votre compte Stripe.

## Enregistrement des dons en différentes devises

### Dons en ligne

Lorsqu'un membre fait un don en ligne via Stripe :

1. Il sélectionne sa devise préférée à la caisse
2. Stripe traite le paiement dans cette devise
3. Le don est enregistré dans B1 avec le montant dans la devise d'origine
4. Stripe gère automatiquement toute conversion de devise nécessaire pour la devise par défaut de votre compte

### Entrée manuelle

Pour enregistrer un don en espèces ou par chèque en devise différente :

1. Accédez à **Dons** dans B1 Admin
2. Cliquez sur **Ajouter un don**
3. Sélectionnez la devise dans la liste déroulante des devises
4. Entrez le montant dans cette devise
5. Complétez le reste des détails du don
6. Cliquez sur **Enregistrer**

## Affichage des dons multi-devises

### Rapports de dons

Les rapports de dons affichent les montants dans leur devise d'origine :

- Les enregistrements de dons individuels affichent le code de devise (par exemple, "$100.00 USD")
- Les totaux sont calculés par devise
- Vous pouvez filtrer par devises spécifiques

### Totaux convertis

Partout où B1 affiche un total combiné unique -- les cartes KPI du résumé des dons, un total de lot de don et le total d'un fonds -- les dons enregistrés dans une devise autre que celle par défaut de votre église sont convertis dans la devise de votre église en utilisant les taux de change actuels, de sorte que le total est un seul nombre significatif au lieu d'ajouter des devises différentes ensemble. Une note **Converti aux taux de change actuels** apparaît sous le total chaque fois qu'une conversion a été appliquée. Les éléments individuels de la ligne de don affichent toujours dans leur devise d'origine.

### Déclarations de dons

Lors de la génération de déclarations de dons :

- Chaque don apparaît avec sa devise d'origine
- Les totaux sont ventilés par devise
- Les membres voient exactement ce qu'ils ont donné dans chaque devise

## Intégration Stripe

Pour les dons en ligne, Stripe gère les transactions multi-devises :

- **Conversion automatique** -- Stripe convertit les devises dans la devise par défaut de votre compte
- **Taux de change** -- Stripe utilise les taux de change du marché actuels
- **Frais** -- La conversion de devises peut entraîner des frais Stripe supplémentaires
- **Devise de paiement** -- Les fonds sont déposés dans la devise par défaut de votre compte

:::info
Consultez votre tableau de bord Stripe pour voir les taux de conversion actuels et tous les frais associés aux transactions multi-devises.
:::

## Considérations comptables

Lorsque vous travaillez avec plusieurs devises :

- **Tenue des registres** -- Gardez une trace des montants de dons d'origine et des devises pour une création de rapports précise
- **Taux de change** -- Notez que les taux de conversion de Stripe peuvent différer des taux de votre banque
- **Reçus fiscaux** -- Consultez votre comptable sur la façon de déclarer les dons dans différentes devises aux fins fiscales
- **Allocation de fonds** -- Vous pouvez allouer des dons à des fonds spécifiques indépendamment de la devise

## Meilleures pratiques

- **Devise par défaut** -- Définissez la devise principale de votre église comme par défaut pour la plupart des transactions
- **Communication claire** -- Dites aux donateurs dans quelle devise ils donnent lors du processus de paiement
- **Rapport cohérent** -- Les totaux combinés sont toujours convertis dans la devise de votre église automatiquement ; utilisez le filtre de devise par don lorsque vous avez besoin de voir les montants d'origine
- **Rapprochement régulier** -- Rapprochez les paiements Stripe avec vos dossiers de dons, en tenant compte des conversions de devises

## Limitations

- La conversion de devises pour le traitement des paiements est gérée par Stripe pour les dons en ligne uniquement ; les dons manuels sont enregistrés tels quels sans conversion automatique
- Les rapports historiques et les éléments individuels de la ligne de don affichent toujours la devise d'origine dans laquelle le don a été enregistré
- Les totaux combinés (cartes KPI, totaux de lots, totaux de fonds) sont convertis dans la devise de votre église en utilisant les taux de change actuels -- ces taux peuvent différer légèrement des taux de votre banque ou de Stripe au moment du règlement des fonds

## Articles connexes

- [Configuration des dons en ligne](./online-giving-setup.md) -- Configurez Stripe pour accepter les dons
- [Enregistrement des dons](./recording-donations.md) -- Enregistrez manuellement les dossiers de dons
- [Rapports de don](./donation-reports.md) -- Générez et consultez les résumés de dons
- [Déclarations de dons](./giving-statements.md) -- Créez des déclarations de dons de fin d'année

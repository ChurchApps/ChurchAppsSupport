---
title: "Support Multi-Devises"
---

# Support Multi-Devises

<div class="article-intro">

La fonctionnalité multi-devises de B1 permet à votre église d'accepter et de suivre les dons dans différentes devises. C'est particulièrement utile pour les églises ayant des membres internationaux, des missionnaires ou plusieurs succursales dans différents pays.

</div>

<div class="prereqs">
<h4>Avant de Commencer</h4>

- Vous avez besoin d'une permission pour gérer les dons. Voir [Rôles et Permissions](../people/roles-permissions.md) pour plus de détails.
- Configurez votre [collecte de fonds en ligne](./online-giving-setup.md) avec Stripe, qui supporte les transactions multi-devises.
- Comprenez les besoins comptables de votre église pour gérer plusieurs devises.

</div>

## Activer le Support Multi-Devises

Le support multi-devises est désormais activé par défaut dans B1. Une fois activé :

- Les membres peuvent faire des dons dans leur devise locale lors d'un don en ligne
- Vous pouvez enregistrer manuellement des dons dans n'importe quelle devise
- Les rapports de dons affichent les montants dans leur devise d'origine
- Stripe gère automatiquement la conversion de devises pour les dons en ligne

## Devises Supportées

Le système supporte toutes les principales devises mondiales, notamment :

- **USD** -- Dollar américain
- **EUR** -- Euro
- **GBP** -- Livre sterling britannique
- **CAD** -- Dollar canadien
- **AUD** -- Dollar australien
- **MXN** -- Peso mexicain
- **BRL** -- Real brésilien
- **INR** -- Roupie indienne
- **CNY** -- Yuan chinois
- **JPY** -- Yen japonais
- Et bien d'autres...

Les devises disponibles pour les dons en ligne dépendent des devises supportées par votre compte Stripe.

## Enregistrer des Dons dans Différentes Devises

### Dons en Ligne

Lorsqu'un membre fait un don en ligne via Stripe :

1. Il sélectionne sa devise préférée au moment du paiement
2. Stripe traite le paiement dans cette devise
3. Le don est enregistré dans B1 avec le montant en devise d'origine
4. Stripe gère automatiquement la conversion de devise nécessaire vers la devise par défaut de votre compte

### Entrée Manuelle

Pour enregistrer un don en espèces ou par chèque dans une devise différente :

1. Allez à **Dons** dans B1 Admin
2. Cliquez sur **Ajouter un Don**
3. Sélectionnez la devise dans le menu déroulant de devise
4. Entrez le montant dans cette devise
5. Complétez le reste des détails du don
6. Cliquez sur **Enregistrer**

## Afficher les Dons Multi-Devises

### Rapports de Dons

Les rapports de dons affichent les montants dans leur devise d'origine :

- Les enregistrements de dons individuels affichent le code de devise (par exemple, « $100,00 USD »)
- Les totaux sont calculés par devise
- Vous pouvez filtrer par devises spécifiques

### Relevés de Dons

Lors de la génération de relevés de dons :

- Chaque don apparaît avec sa devise d'origine
- Les totaux sont ventilés par devise
- Les membres voient exactement ce qu'ils ont donné dans chaque devise

## Intégration Stripe

Pour les dons en ligne, Stripe gère les transactions multi-devises :

- **Conversion automatique** -- Stripe convertit les devises vers la devise par défaut de votre compte
- **Taux de change** -- Stripe utilise les taux de change du marché actuels
- **Frais** -- La conversion de devises peut entraîner des frais supplémentaires de Stripe
- **Devise de versement** -- Les fonds sont déposés dans la devise par défaut de votre compte

:::info
Consultez votre tableau de bord Stripe pour voir les taux de conversion actuels et les frais associés aux transactions multi-devises.
:::

## Considérations Comptables

Lorsque vous travaillez avec plusieurs devises :

- **Tenue des registres** -- Conservez un suivi des montants de dons d'origine et des devises pour un rapport exact
- **Taux de change** -- Notez que les taux de conversion de Stripe peuvent différer de ceux de votre banque
- **Reçus fiscaux** -- Consultez votre comptable sur la manière de déclarer les dons dans différentes devises à titre fiscal
- **Allocation de fonds** -- Vous pouvez allouer des dons à des fonds spécifiques quelle que soit la devise

## Bonnes Pratiques

- **Devise par défaut** -- Définissez la devise primaire de votre église comme devise par défaut pour la plupart des transactions
- **Communication claire** -- Informez les donateurs de la devise qu'ils utilisent lors du processus de paiement
- **Rapports cohérents** -- Décidez si vous rapporterez dans les devises d'origine ou si vous convertirez en une seule devise pour les résumés
- **Rapprochement régulier** -- Rapprochez les versements Stripe avec vos enregistrements de dons, en tenant compte des conversions de devises

## Limitations

- La conversion de devises est gérée par Stripe uniquement pour les dons en ligne
- Les dons manuels sont enregistrés tels qu'entrés sans conversion automatique
- Les rapports historiques affichent les dons dans leurs devises d'origine
- Les calculs de total sont effectués par devise, non entre les devises

## Articles Connexes

- [Configuration des Dons en Ligne](./online-giving-setup.md) -- Configurer Stripe pour accepter les dons
- [Enregistrer des Dons](./recording-donations.md) -- Entrer manuellement des enregistrements de dons
- [Rapports de Dons](./donation-reports.md) -- Générer et afficher des résumés de dons
- [Relevés de Dons](./giving-statements.md) -- Créer des relevés de dons de fin d'année

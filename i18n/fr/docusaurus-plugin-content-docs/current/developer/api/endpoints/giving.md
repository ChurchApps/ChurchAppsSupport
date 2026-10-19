---
title: "Points de terminaison Giving"
---

# Points de terminaison Giving

<div class="article-intro">

Le module Giving gère les dons, les fonds, le traitement des paiements, les abonnements et les opérations financières associées. Il prend en charge plusieurs passerelles de paiement (Stripe, PayPal), gère les dons ponctuels et récurrents, suit les lots de dons et fournit le traitement des webhooks pour les événements de paiement asynchrones.

</div>

**Chemin de base :** `/giving`

## Dons

Chemin de base : `/giving/donations`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View ou son propre personId | Liste tous les dons. Filtrer par `?batchId=` ou `?personId=`. Avec `?personId=`, les dons destinés à des fonds non déductibles sont exclus (comme sur les relevés de dons), sauf si un appelant Donations.View ajoute `&includeNonDeductible=1`, ce que fait la fiche personne de B1Admin |
| GET | `/:id` | JWT | Donations.View | Obtient un don par ID |
| GET | `/my` | JWT | — | Obtient les dons de l'utilisateur actuel |
| GET | `/my/summary?year=` | JWT | — | Total des dons de l'utilisateur actuel pour une année (par défaut, l'année en cours) : `{ year, total, count, currency, isConverted }`, les totaux étant convertis dans la devise de l'église. Alimente l'aperçu des dons sur la page d'accueil des membres |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Dons datés dans la plage (bornes incluses). Les deux dates sont obligatoires au format `YYYY-MM-DD`, sinon `400`. Les pages de relevés de dons de B1Admin demandent ainsi une année civile au lieu de l'historique complet de l'église |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtient le résumé des dons. Filtrer par `?startDate=&endDate=&type=`. Utiliser `type=person` pour une ventilation par personne |
| GET | `/testEmail` | Public | — | Envoie un e-mail de test (développement/débogage) |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Crée ou met à jour des dons (par lot). Avec Donations.Enter seul, le lot cible et (pour une mise à jour) le lot actuel du don doivent être ouverts, et les dons issus de passerelles (ceux qui ont un `transactionId`) ne peuvent pas être modifiés ; sinon `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit ou Donations.Enter | Supprime un don. Donations.Enter seul : le don doit se trouver dans un lot ouvert et ne pas provenir d'une passerelle, sinon `403` |

### Exemple : lister les dons par lot

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Exemple : obtenir le résumé des dons

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Lots de dons {#donation-batches}

Chemin de base : `/giving/donationbatches`

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. L'opération de suppression supprime aussi tous les dons du lot.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary ou Donations.Enter | Liste tous les lots de dons |
| GET | `/:id` | JWT | Donations.ViewSummary ou Donations.Enter | Obtient un lot de dons par ID |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Crée ou met à jour des lots de dons. Donations.Enter seul : la mise à jour d'un lot existant exige qu'il soit ouvert, sinon `403 { "error": "This batch is closed." }`. `status` est ignoré ici, donc l'enregistrement d'un lot ne peut pas le rouvrir |
| POST | `/:id/close` | JWT | Donations.Edit | Ferme un lot : définit `status` à `closed`, `closedDate` à maintenant et `closedBy` à l'ID utilisateur de l'appelant. Renvoie le lot |
| POST | `/:id/reopen` | JWT | Donations.Edit | Rouvre un lot : définit `status` à `open` et efface `closedDate` et `closedBy`. Renvoie le lot |
| DELETE | `/:id` | JWT | Donations.Edit | Supprime un lot et tous ses dons |

Chaque lot comprend `status` (`open` ou `closed` ; les lots nouveaux et existants sont `open`), `closedDate` et `closedBy`. Donations.Edit peut modifier les dons de tous les lots ; Donations.Enter (affiché comme **Saisir des dons** dans l'éditeur de rôles) ne peut ajouter, modifier ou supprimer des dons et des répartitions de fonds que lorsque leur lot est ouvert.

## Donate

Chemin de base : `/giving/donate`

Gère le parcours de don public, y compris les paiements, les abonnements, les webhooks et le calcul des frais. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Obtient les passerelles de paiement disponibles pour une église (clés publiques uniquement) |
| POST | `/client-token` | JWT | — | Génère un jeton client pour l'initialisation de la passerelle |
| POST | `/create-order` | JWT | — | Crée une commande de paiement (paiement de type PayPal) |
| POST | `/charge` | JWT | — | Traite un don ponctuel |
| POST | `/subscribe` | JWT | — | Crée un abonnement de don récurrent |
| POST | `/log` | Public | — | Journalise un don. Corps : `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Reçoit les événements webhook de paiement (Stripe, PayPal). Requiert `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Rejoue les événements Stripe pour une plage de dates. Corps : `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Calcule les frais de transaction. Corps : `{ type, provider, gatewayId, amount, currency }`. Requiert `?churchId=` |
| POST | `/captcha-verify` | Public | — | Vérifie le jeton reCAPTCHA. Corps : `{ token }` |

### Exemple : traiter un don ponctuel

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Exemple : créer un abonnement récurrent

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Fonds

Chemin de base : `/giving/funds`

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. La permission `view` est `null` (aucune permission requise pour consulter les fonds).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste tous les fonds |
| GET | `/:id` | JWT | — | Obtient un fonds par ID |
| GET | `/churchId/:churchId` | Public | — | Obtient tous les fonds d'une église donnée (public) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Obtient le total des dons d'un fonds : `{ fundId, totalAmount, donationCount }`. Alimente l'élément `campaignProgress` du créateur de site web |
| POST | `/` | JWT | Donations.Edit | Crée ou met à jour des fonds |
| DELETE | `/:id` | JWT | Donations.Edit | Supprime un fonds |

## Dons par fonds

Chemin de base : `/giving/funddonations`

Suit la répartition de chaque don entre les fonds. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Liste les dons par fonds. Filtrer par `?donationId=`, `?personId=`, `?fundId=` ou `?fundName=`. Ajouter facultativement `?startDate=&endDate=` pour filtrer par date |
| GET | `/:id` | JWT | Donations.View | Obtient un don par fonds par ID |
| GET | `/my` | JWT | — | Obtient les dons par fonds de l'utilisateur actuel |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Crée ou met à jour des dons par fonds (par lot). Donations.Enter seul : le don parent doit se trouver dans un lot ouvert et ne pas provenir d'une passerelle, sinon `403` |
| DELETE | `/:id` | JWT | Donations.Edit ou Donations.Enter | Supprime un don par fonds. Même règle de lot ouvert pour Donations.Enter |

## Passerelles

Chemin de base : `/giving/gateways`

Gère la configuration des passerelles de paiement (Stripe, PayPal, etc.). Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés. Les secrets des passerelles sont chiffrés au repos.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste toutes les passerelles de l'église |
| GET | `/:id` | JWT | Settings.Edit | Obtient une passerelle par ID |
| GET | `/churchId/:churchId` | Public | — | Obtient les passerelles d'une église (clés publiques uniquement) |
| GET | `/configured/:churchId` | Public | — | Vérifie si une église a configuré une passerelle de paiement |
| POST | `/` | JWT | Settings.Edit | Crée ou met à jour des passerelles (chiffre les clés, provisionne les webhooks et les produits) |
| PATCH | `/:id` | JWT | Settings.Edit | Met à jour partiellement une passerelle |
| DELETE | `/:id` | JWT | Settings.Edit | Supprime une passerelle (supprime aussi ses webhooks) |

### Exemple : vérifier la configuration de la passerelle

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Clients

Chemin de base : `/giving/customers`

Étend `GenericCrudController` avec les routes CRUD : `getAll`, `delete`. Relie les personnes à leurs enregistrements de clients dans la passerelle de paiement.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Liste tous les clients |
| GET | `/:id` | JWT | Donations.ViewSummary ou son propre enregistrement | Obtient un client par ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ou son propre enregistrement | Obtient les abonnements de passerelle d'un client |
| DELETE | `/:id` | JWT | Donations.Edit | Supprime un client |

## Abonnements

Chemin de base : `/giving/subscriptions`

Gère les abonnements de dons récurrents. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Liste tous les abonnements |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtient un abonnement par ID |
| POST | `/` | JWT | Donations.Edit ou son propre abonnement | Met à jour les abonnements auprès de la passerelle de paiement |
| DELETE | `/:id` | JWT | Donations.Edit ou son propre abonnement | Annule un abonnement et le supprime de la base de données. Corps : `{ provider, reason }` |

## Fonds des abonnements

Chemin de base : `/giving/subscriptionfunds`

Suit la répartition par fonds des abonnements récurrents. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View ou son propre abonnement | Liste les fonds des abonnements. Filtrer par `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtient un fonds d'abonnement par ID |
| DELETE | `/:id` | JWT | Donations.Edit | Supprime un fonds d'abonnement |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ou son propre abonnement | Supprime tous les fonds d'un abonnement |

## Moyens de paiement

Chemin de base : `/giving/paymentmethods`

Gère les moyens de paiement enregistrés (cartes, comptes bancaires) via les API des passerelles de paiement. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View ou son propre personId | Obtient tous les moyens de paiement enregistrés d'une personne (cartes, comptes bancaires) |
| POST | `/addcard` | JWT | — | Associe un moyen de paiement par carte. Corps : `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ou son propre personId | Met à jour les informations de la carte. Corps : `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ou son propre personId | Crée un SetupIntent ACH Stripe pour lier un compte bancaire. Corps : `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Crée un SetupIntent ACH anonyme pour les dons de visiteurs. Corps : `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ou son propre personId | Ajoute un compte bancaire via jeton (obsolète ; utiliser `ach-setup-intent`). Corps : `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ou son propre personId | Met à jour les informations du compte bancaire. Corps : `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ou son propre client | Vérifie un compte bancaire à l'aide de micro-dépôts. Corps : `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ou son propre client | Supprime un moyen de paiement (carte ou compte bancaire) |

## Journal des événements

Chemin de base : `/giving/eventLog`

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. Suit les événements webhook des passerelles de paiement pour l'audit et la déduplication.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Liste tous les journaux d'événements |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtient un journal d'événements par ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtient les journaux d'événements filtrés par type d'événement |
| POST | `/` | JWT | Donations.Edit | Crée ou met à jour des journaux d'événements |
| DELETE | `/:id` | JWT | Donations.Edit | Supprime un journal d'événements |

## Pages connexes

- [Points de terminaison Membership](./membership) — Personnes, églises, groupes, rôles et permissions
- [Authentification et permissions](./authentication) — Flux de connexion, JWT, OAuth, modèle de permissions
- [Structure du module](../module-structure) — Modèles d'organisation du code

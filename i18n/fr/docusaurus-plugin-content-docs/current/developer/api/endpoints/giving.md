---
title: "Points de terminaison Giving"
---

# Points de terminaison Giving

<div class="article-intro">

Le module Giving gère les dons, les fonds, le traitement des paiements, les abonnements et les opérations financières associées. Il prend en charge plusieurs passerelles de paiement (Stripe, PayPal), gère les dons ponctuels et récurrents, suit les lots de dons, et fournit le traitement des webhooks pour les événements de paiement asynchrones.

</div>

**Chemin de base :** `/giving`

## Donations

Chemin de base : `/giving/donations`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View ou son propre personId | Lister tous les dons. Filtrer par `?batchId=` ou `?personId=` |
| GET | `/:id` | JWT | Donations.View | Obtenir un don par ID |
| GET | `/my` | JWT | — | Obtenir les dons de l'utilisateur actuel |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtenir une synthèse des dons. Filtrer par `?startDate=&endDate=&type=`. Utilisez `type=person` pour une ventilation par personne |
| GET | `/testEmail` | Public | — | Envoyer un e-mail de test (développement/débogage) |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour des dons (par lot) |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un don |

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

### Exemple : obtenir une synthèse des dons

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

## Donation Batches

Chemin de base : `/giving/donationbatches`

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. La suppression retire aussi tous les dons du lot.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les lots de dons |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un lot de dons par ID |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour des lots de dons |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un lot et tous ses dons |

## Donate

Chemin de base : `/giving/donate`

Gère le flux de don public, y compris les charges, les abonnements, les webhooks et les calculs de frais. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Obtenir les passerelles de paiement disponibles pour une église (clés publiques uniquement) |
| POST | `/client-token` | JWT | — | Générer un jeton client pour l'initialisation de la passerelle |
| POST | `/create-order` | JWT | — | Créer une commande de paiement (style paiement PayPal) |
| POST | `/charge` | JWT | — | Traiter une charge de don ponctuel |
| POST | `/subscribe` | JWT | — | Créer un abonnement de don récurrent |
| POST | `/log` | Public | — | Journaliser un don. Corps : `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Recevoir les événements webhook de paiement (Stripe, PayPal). Nécessite `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Rejouer les événements Stripe pour une plage de dates. Corps : `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Calculer les frais de transaction. Corps : `{ type, provider, gatewayId, amount, currency }`. Nécessite `?churchId=` |
| POST | `/captcha-verify` | Public | — | Vérifier un jeton reCAPTCHA. Corps : `{ token }` |

### Exemple : traiter une charge de don

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

## Funds

Chemin de base : `/giving/funds`

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. La permission `view` est `null` (aucune permission requise pour consulter les fonds).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les fonds |
| GET | `/:id` | JWT | — | Obtenir un fonds par ID |
| GET | `/churchId/:churchId` | Public | — | Obtenir tous les fonds d'une église spécifique (public) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Obtenir le total des dons d'un fonds : `{ fundId, totalAmount, donationCount }`. Alimente l'élément `campaignProgress` du générateur de sites web |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour des fonds |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un fonds |

## Fund Donations

Chemin de base : `/giving/funddonations`

Suit la manière dont les dons individuels sont répartis entre les fonds. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Lister les dons par fonds. Filtrer par `?donationId=`, `?personId=`, `?fundId=`, ou `?fundName=`. Ajouter éventuellement `?startDate=&endDate=` pour filtrer par date |
| GET | `/:id` | JWT | Donations.View | Obtenir un don par fonds par ID |
| GET | `/my` | JWT | — | Obtenir les dons par fonds de l'utilisateur actuel |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour des dons par fonds (par lot) |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un don par fonds |

## Gateways

Chemin de base : `/giving/gateways`

Gère les configurations de passerelles de paiement (Stripe, PayPal, etc.). Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés. Les secrets de passerelle sont chiffrés au repos.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les passerelles de l'église |
| GET | `/:id` | JWT | Settings.Edit | Obtenir une passerelle par ID |
| GET | `/churchId/:churchId` | Public | — | Obtenir les passerelles d'une église (clés publiques uniquement) |
| GET | `/configured/:churchId` | Public | — | Vérifier si une église a une passerelle de paiement configurée |
| POST | `/` | JWT | Settings.Edit | Créer ou mettre à jour des passerelles (chiffre les clés, provisionne les webhooks et les produits) |
| PATCH | `/:id` | JWT | Settings.Edit | Mettre à jour partiellement une passerelle |
| DELETE | `/:id` | JWT | Settings.Edit | Supprimer une passerelle (retire aussi ses webhooks) |

### Exemple : vérifier la configuration d'une passerelle

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Customers

Chemin de base : `/giving/customers`

Étend `GenericCrudController` avec les routes CRUD : `getAll`, `delete`. Relie les personnes à leurs enregistrements de client de passerelle de paiement.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les clients |
| GET | `/:id` | JWT | Donations.ViewSummary ou son propre enregistrement | Obtenir un client par ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ou son propre enregistrement | Obtenir les abonnements de passerelle d'un client |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un client |

## Subscriptions

Chemin de base : `/giving/subscriptions`

Gère les abonnements de dons récurrents. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les abonnements |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un abonnement par ID |
| POST | `/` | JWT | Donations.Edit ou son propre abonnement | Mettre à jour des abonnements auprès de la passerelle de paiement |
| DELETE | `/:id` | JWT | Donations.Edit ou son propre abonnement | Annuler un abonnement et le retirer de la base de données. Corps : `{ provider, reason }` |

## Subscription Funds

Chemin de base : `/giving/subscriptionfunds`

Suit les répartitions de fonds pour les abonnements récurrents. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View ou son propre abonnement | Lister les fonds d'abonnement. Filtrer par `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un fonds d'abonnement par ID |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un fonds d'abonnement |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ou son propre abonnement | Supprimer tous les fonds d'un abonnement |

## Payment Methods

Chemin de base : `/giving/paymentmethods`

Gère les moyens de paiement enregistrés (cartes, comptes bancaires) via les API de passerelle de paiement. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View ou son propre personId | Obtenir tous les moyens de paiement enregistrés d'une personne (cartes, comptes bancaires) |
| POST | `/addcard` | JWT | — | Attacher un moyen de paiement par carte. Corps : `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ou son propre personId | Mettre à jour les détails d'une carte. Corps : `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ou son propre personId | Créer une intention de configuration Stripe ACH pour lier un compte bancaire. Corps : `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Créer une intention de configuration ACH anonyme pour les dons d'invités. Corps : `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ou son propre personId | Ajouter un compte bancaire via jeton (obsolète ; utiliser `ach-setup-intent`). Corps : `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ou son propre personId | Mettre à jour les détails d'un compte bancaire. Corps : `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ou son propre client | Vérifier un compte bancaire par micro-dépôts. Corps : `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ou son propre client | Supprimer un moyen de paiement (carte ou compte bancaire) |

## Event Log

Chemin de base : `/giving/eventLog`

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. Suit les événements webhook de passerelle de paiement pour l'audit et la déduplication.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les journaux d'événements |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un journal d'événement par ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtenir les journaux d'événements filtrés par type d'événement |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour des journaux d'événements |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un journal d'événement |

## Pages connexes

- [Points de terminaison Membership](./membership) — Personnes, églises, groupes, rôles et permissions
- [Authentification et permissions](./authentication) — Flux de connexion, JWT, OAuth, modèle de permissions
- [Structure des modules](../module-structure) — Motifs d'organisation du code

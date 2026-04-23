---
title: "Points de terminaison Giving"
---

# Points de terminaison Giving

<div class="article-intro">

Le module Giving gère les donations, les fonds, le traitement des paiements, les abonnements et les opérations financières connexes. Il supporte plusieurs passerelles de paiement (Stripe, PayPal), gère les donations ponctuelles et récurrentes, suit les lots de donations et fournit le traitement des webhooks pour les événements de paiement asynchrones.

</div>

**Chemin de base :** `/giving`

## Donations

Chemin de base : `/giving/donations`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Donations.View ou personId personnel | Lister toutes les donations. Filtrer par `?batchId=` ou `?personId=` |
| GET | `/:id` | JWT | Donations.View | Obtenir une donation par ID |
| GET | `/my` | JWT | — | Obtenir les donations de l'utilisateur actuel |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtenir le résumé des donations. Filtrer par `?startDate=&endDate=&type=`. Utiliser `type=person` pour la répartition par personne |
| GET | `/testEmail` | Public | — | Envoyer un e-mail test (développement/débogage) |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour les donations (lot) |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer une donation |

### Exemple : Lister les donations par lot

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

### Exemple : Obtenir le résumé des donations

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

## Lots de donations

Chemin de base : `/giving/donationbatches`

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. L'opération de suppression supprime également toutes les donations du lot.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les lots de donations |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un lot de donations par ID |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour les lots de donations |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un lot et toutes ses donations |

## Donner

Chemin de base : `/giving/donate`

Gère le flux de donation public y compris les charges, les abonnements, les webhooks et les calculs de frais. Aucune route CRUD de base n'est activée ; tous les endpoints sont personnalisés.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Obtenir les passerelles de paiement disponibles pour une église (clés publiques uniquement) |
| POST | `/client-token` | JWT | — | Générer un jeton client pour l'initialisation de la passerelle |
| POST | `/create-order` | JWT | — | Créer une commande de paiement (checkout style PayPal) |
| POST | `/charge` | JWT | — | Traiter une charge de donation ponctuelle |
| POST | `/subscribe` | JWT | — | Créer un abonnement à donation récurrente |
| POST | `/log` | Public | — | Enregistrer une donation. Corps : `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Recevoir les événements de webhook de paiement (Stripe, PayPal). Nécessite `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Rejouer les événements Stripe pour une plage de dates. Corps : `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Calculer les frais de transaction. Corps : `{ type, provider, gatewayId, amount, currency }`. Nécessite `?churchId=` |
| POST | `/captcha-verify` | Public | — | Vérifier le jeton reCAPTCHA. Corps : `{ token }` |

### Exemple : Traiter une charge de donation

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

### Exemple : Créer un abonnement récurrent

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

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. La permission `view` est `null` (aucune permission requise pour afficher les fonds).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les fonds |
| GET | `/:id` | JWT | — | Obtenir un fonds par ID |
| GET | `/churchId/:churchId` | Public | — | Obtenir tous les fonds pour une église spécifique (public) |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour les fonds |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un fonds |

## Donations au fonds

Chemin de base : `/giving/funddonations`

Suit comment les donations individuelles sont allouées entre les fonds. Aucune route CRUD de base n'est activée ; tous les endpoints sont personnalisés.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Donations.View | Lister les donations au fonds. Filtrer par `?donationId=`, `?personId=`, `?fundId=`, ou `?fundName=`. Ajouter optionnellement `?startDate=&endDate=` pour le filtrage par date |
| GET | `/:id` | JWT | Donations.View | Obtenir une donation au fonds par ID |
| GET | `/my` | JWT | — | Obtenir les donations au fonds de l'utilisateur actuel |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour les donations au fonds (lot) |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer une donation au fonds |

## Passerelles

Chemin de base : `/giving/gateways`

Gère les configurations des passerelles de paiement (Stripe, PayPal, etc.). Aucune route CRUD de base n'est activée ; tous les endpoints sont personnalisés. Les secrets de la passerelle sont chiffrés au repos.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les passerelles pour l'église |
| GET | `/:id` | JWT | Settings.Edit | Obtenir une passerelle par ID |
| GET | `/churchId/:churchId` | Public | — | Obtenir les passerelles pour une église (clés publiques uniquement) |
| GET | `/configured/:churchId` | Public | — | Vérifier si une église a une passerelle de paiement configurée |
| POST | `/` | JWT | Settings.Edit | Créer ou mettre à jour les passerelles (chiffre les clés, met en service les webhooks et les produits) |
| PATCH | `/:id` | JWT | Settings.Edit | Mise à jour partielle d'une passerelle |
| DELETE | `/:id` | JWT | Settings.Edit | Supprimer une passerelle (supprime également ses webhooks) |

### Exemple : Vérifier la configuration de la passerelle

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

Étend `GenericCrudController` avec les routes CRUD : `getAll`, `delete`. Lie les personnes à leurs enregistrements de clients de passerelle de paiement.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les clients |
| GET | `/:id` | JWT | Donations.ViewSummary ou enregistrement personnel | Obtenir un client par ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ou enregistrement personnel | Obtenir les abonnements à la passerelle pour un client |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un client |

## Abonnements

Chemin de base : `/giving/subscriptions`

Gère les abonnements à donations récurrentes. Aucune route CRUD de base n'est activée ; tous les endpoints sont personnalisés.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les abonnements |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un abonnement par ID |
| POST | `/` | JWT | Donations.Edit ou abonnement personnel | Mettre à jour les abonnements avec la passerelle de paiement |
| DELETE | `/:id` | JWT | Donations.Edit ou abonnement personnel | Annuler un abonnement et supprimer de la base de données. Corps : `{ provider, reason }` |

## Fonds d'abonnement

Chemin de base : `/giving/subscriptionfunds`

Suit les allocations de fonds pour les abonnements récurrents. Aucune route CRUD de base n'est activée ; tous les endpoints sont personnalisés.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Donations.View ou abonnement personnel | Lister les fonds d'abonnement. Filtrer par `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un fonds d'abonnement par ID |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un fonds d'abonnement |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ou abonnement personnel | Supprimer tous les fonds pour un abonnement |

## Méthodes de paiement

Chemin de base : `/giving/paymentmethods`

Gère les méthodes de paiement stockées (cartes, comptes bancaires) via les APIs de passerelles de paiement. Aucune route CRUD de base n'est activée ; tous les endpoints sont personnalisés.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View ou personId personnel | Obtenir toutes les méthodes de paiement stockées pour une personne (cartes, comptes bancaires) |
| POST | `/addcard` | JWT | — | Attacher une méthode de paiement par carte. Corps : `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ou personId personnel | Mettre à jour les détails de la carte. Corps : `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ou personId personnel | Créer une Stripe ACH SetupIntent pour la liaison de compte bancaire. Corps : `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Créer un SetupIntent ACH anonyme pour les donations d'invités. Corps : `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ou personId personnel | Ajouter un compte bancaire via jeton (déprécié ; utiliser `ach-setup-intent`). Corps : `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ou personId personnel | Mettre à jour les détails du compte bancaire. Corps : `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ou client personnel | Vérifier un compte bancaire avec les micro-dépôts. Corps : `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ou client personnel | Supprimer une méthode de paiement (carte ou compte bancaire) |

## Enregistrement d'événement

Chemin de base : `/giving/eventLog`

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. Suit les événements de webhook de la passerelle de paiement pour l'audit et la déduplication.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les enregistrements d'événement |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un enregistrement d'événement par ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtenir les enregistrements d'événement filtrés par type d'événement |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour les enregistrements d'événement |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un enregistrement d'événement |

## Pages connexes

- [Points de terminaison Membership](./membership) — Personnes, églises, groupes, rôles et permissions
- [Authentification et permissions](./authentication) — Flux de connexion, JWT, OAuth, modèle de permissions
- [Structure du module](../module-structure) — Modèles d'organisation du code

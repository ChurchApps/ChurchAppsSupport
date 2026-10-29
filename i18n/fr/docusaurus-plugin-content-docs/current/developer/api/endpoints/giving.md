---
title: "Points de terminaison Giving"
---

# Points de terminaison Giving

<div class="article-intro">

Le module Giving gère les dons, les fonds, le traitement des paiements, les abonnements et les opérations financières connexes. Il prend en charge plusieurs passerelles de paiement (Stripe, PayPal), gère les dons ponctuels et récurrents, suit les lots de dons et assure le traitement des webhooks pour les événements de paiement asynchrones.

</div>

**Chemin de base :** `/giving`

## Dons

Chemin de base : `/giving/donations`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.View ou son propre personId | Lister tous les dons. Filtrer par `?batchId=` ou `?personId=`. Avec `?personId=`, les dons aux fonds non déductibles sont exclus (comme sur les relevés de dons), sauf si un appelant ayant Donations.View ajoute `&includeNonDeductible=1`, ce que fait la fiche de personne de B1Admin |
| GET | `/:id` | JWT | Donations.View | Obtenir un don par ID |
| GET | `/my` | JWT | — | Obtenir les dons de l'utilisateur actuel |
| GET | `/my/summary?year=` | JWT | — | Total des dons de l'utilisateur actuel pour une année (par défaut cette année) : `{ year, total, count, currency, isConverted }`, avec les totaux convertis dans la devise de l'église. Alimente l'aperçu des dons sur la page d'accueil des membres |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Dons datés dans la plage (inclusive). Les deux dates sont obligatoires au format `YYYY-MM-DD`, sinon `400`. Les pages de relevés de dons de B1Admin demandent une année civile de cette façon au lieu de l'historique complet de l'église |
| GET | `/summary` | JWT | Donations.ViewSummary | Obtenir le sommaire des dons. Filtrer par `?startDate=&endDate=&type=`. Utilisez `type=person` pour la ventilation par personne |
| GET | `/testEmail` | Publique | — | Envoyer un e-mail de test (développement et débogage) |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Créer ou mettre à jour des dons (lot). Avec Donations.Enter seulement, le lot cible et (pour une mise à jour) le lot actuel du don doivent être ouverts, et les dons de passerelle (ceux qui ont un `transactionId`) ne peuvent pas être modifiés ; sinon `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit ou Donations.Enter | Supprimer un don. Donations.Enter seulement : le don doit être dans un lot ouvert et ne pas être un don de passerelle, sinon `403` |

### Exemple : lister les dons d'un lot

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

### Exemple : obtenir le sommaire des dons

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

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. L'opération de suppression supprime également tous les dons du lot.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary ou Donations.Enter | Lister tous les lots de dons |
| GET | `/:id` | JWT | Donations.ViewSummary ou Donations.Enter | Obtenir un lot de dons par ID |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Créer ou mettre à jour des lots de dons. Donations.Enter seulement : la mise à jour d'un lot existant exige qu'il soit ouvert, sinon `403 { "error": "This batch is closed." }`. `status` est ignoré ici : enregistrer un lot ne peut donc pas le rouvrir |
| POST | `/:id/close` | JWT | Donations.Edit | Fermer un lot : définit `status` à `closed`, `closedDate` à maintenant et `closedBy` à l'ID utilisateur de l'appelant. Renvoie le lot |
| POST | `/:id/reopen` | JWT | Donations.Edit | Rouvrir un lot : définit `status` à `open` et efface `closedDate` et `closedBy`. Renvoie le lot |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un lot et tous ses dons |

Chaque lot comprend `status` (`open` ou `closed` ; les lots nouveaux et existants sont `open`), `closedDate` et `closedBy`. Donations.Edit peut modifier les dons de n'importe quel lot ; Donations.Enter (affiché comme **Saisir les dons** dans l'éditeur de rôles) ne peut ajouter, modifier ou supprimer des dons et des répartitions de fonds que lorsque leur lot est ouvert.

## Donner

Chemin de base : `/giving/donate`

Gère le flux de don destiné au public, y compris les paiements, les abonnements, les webhooks et les calculs de frais. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/gateways/:churchId` | Publique | — | Obtenir les passerelles de paiement disponibles pour une église (clés publiques seulement) |
| POST | `/client-token` | JWT | — | Générer un jeton client pour l'initialisation de la passerelle |
| POST | `/create-order` | JWT | — | Créer une commande de paiement (paiement de type PayPal) |
| POST | `/charge` | JWT | — | Traiter un don ponctuel |
| POST | `/subscribe` | JWT | — | Créer un abonnement de don récurrent |
| POST | `/log` | Publique | — | Consigner un don. Corps : `{ donation, fundData }` |
| POST | `/webhook/:provider` | Publique | — | Recevoir les événements webhook de paiement (Stripe, PayPal). Exige `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Rejouer les événements Stripe pour une plage de dates. Corps : `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Publique | — | Calculer les frais de transaction. Corps : `{ type, provider, gatewayId, amount, currency }`. Exige `?churchId=` |
| POST | `/captcha-verify` | Publique | — | Vérifier un jeton reCAPTCHA. Corps : `{ token, churchId? }`. Une réponse humaine renvoie `{ response: "human", pass }`, où `pass` est un laissez-passer signé de don invité valable 10 minutes (et seulement pour `churchId` lorsqu'il est envoyé) |

Lorsque l'API fonctionne avec `CAPTCHA_ENFORCE=true`, les appels d'invités (non connectés) à `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` et `/giving/paymentmethods/ach-setup-intent-anon` doivent inclure ce `captchaPass` dans le corps, sinon ils renvoient 403 `Captcha verification required`. Le laissez-passer peut être réutilisé jusqu'à son expiration, car le flux invité de Stripe effectue deux appels (ajout de la carte, puis paiement). Les appels d'utilisateurs connectés ne sont pas touchés. `CAPTCHA_ENFORCE` vaut `false` par défaut ; les formulaires de don invité de `@churchapps/apphelper` envoient le laissez-passer automatiquement.

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

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. L'autorisation `view` est `null` (aucune autorisation n'est requise pour consulter les fonds).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Lister tous les fonds |
| GET | `/:id` | JWT | — | Obtenir un fonds par ID |
| GET | `/churchId/:churchId` | Publique | — | Obtenir tous les fonds d'une église précise (public) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Publique | — | Obtenir le total des dons d'un fonds : `{ fundId, totalAmount, donationCount }`. Alimente l'élément `campaignProgress` du constructeur de site web |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour des fonds |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un fonds |

## Dons par fonds

Chemin de base : `/giving/funddonations`

Suit la répartition de chaque don entre les fonds. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.View | Lister les dons par fonds. Filtrer par `?donationId=`, `?personId=`, `?fundId=` ou `?fundName=`. Ajoutez facultativement `?startDate=&endDate=` pour filtrer par date |
| GET | `/:id` | JWT | Donations.View | Obtenir un don par fonds par ID |
| GET | `/my` | JWT | — | Obtenir les dons par fonds de l'utilisateur actuel |
| POST | `/` | JWT | Donations.Edit ou Donations.Enter | Créer ou mettre à jour des dons par fonds (lot). Donations.Enter seulement : le don parent doit être dans un lot ouvert et ne pas être un don de passerelle, sinon `403` |
| DELETE | `/:id` | JWT | Donations.Edit ou Donations.Enter | Supprimer un don par fonds. Même règle de lot ouvert pour Donations.Enter |

## Passerelles

Chemin de base : `/giving/gateways`

Gère les configurations des passerelles de paiement (Stripe, PayPal, etc.). Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés. Les secrets des passerelles sont chiffrés au repos.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Lister toutes les passerelles de l'église |
| GET | `/:id` | JWT | Settings.Edit | Obtenir une passerelle par ID |
| GET | `/churchId/:churchId` | Publique | — | Obtenir les passerelles d'une église (clés publiques seulement) |
| GET | `/configured/:churchId` | Publique | — | Vérifier si une église a une passerelle de paiement configurée |
| POST | `/` | JWT | Settings.Edit | Créer ou mettre à jour des passerelles (chiffre les clés, provisionne les webhooks et les produits) |
| PATCH | `/:id` | JWT | Settings.Edit | Mettre à jour partiellement une passerelle |
| DELETE | `/:id` | JWT | Settings.Edit | Supprimer une passerelle (supprime aussi ses webhooks) |

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

Étend `GenericCrudController` avec les routes CRUD : `getAll`, `delete`. Relie les personnes à leurs enregistrements de clients de passerelle de paiement.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les clients |
| GET | `/:id` | JWT | Donations.ViewSummary ou son propre enregistrement | Obtenir un client par ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary ou son propre enregistrement | Obtenir les abonnements de passerelle d'un client |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un client |

## Abonnements

Chemin de base : `/giving/subscriptions`

Gère les abonnements de dons récurrents. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les abonnements |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un abonnement par ID |
| POST | `/` | JWT | Donations.Edit ou son propre abonnement | Mettre à jour les abonnements auprès de la passerelle de paiement |
| DELETE | `/:id` | JWT | Donations.Edit ou son propre abonnement | Annuler un abonnement et le retirer de la base de données. Corps : `{ provider, reason }` |

## Fonds des abonnements

Chemin de base : `/giving/subscriptionfunds`

Suit la répartition par fonds des abonnements récurrents. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.View ou son propre abonnement | Lister les fonds des abonnements. Filtrer par `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un fonds d'abonnement par ID |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un fonds d'abonnement |
| DELETE | `/subscription/:id` | JWT | Donations.Edit ou son propre abonnement | Supprimer tous les fonds d'un abonnement |

## Modes de paiement

Chemin de base : `/giving/paymentmethods`

Gère les modes de paiement enregistrés (cartes, comptes bancaires) par l'intermédiaire des API des passerelles de paiement. Aucune route CRUD de base n'est activée ; tous les points de terminaison sont personnalisés.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View ou son propre personId | Obtenir tous les modes de paiement enregistrés d'une personne (cartes, comptes bancaires) |
| POST | `/addcard` | JWT | — | Attacher un mode de paiement par carte. Corps : `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit ou son propre personId | Mettre à jour les détails d'une carte. Corps : `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit ou son propre personId | Créer une intention de configuration ACH Stripe pour le lien d'un compte bancaire. Corps : `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Publique | — | Créer une intention de configuration ACH anonyme pour les dons d'invités. Corps : `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit ou son propre personId | Ajouter un compte bancaire par jeton (déprécié ; utilisez `ach-setup-intent`). Corps : `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit ou son propre personId | Mettre à jour les détails du compte bancaire. Corps : `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit ou son propre client | Vérifier un compte bancaire par micro-dépôts. Corps : `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit ou son propre client | Supprimer un mode de paiement (carte ou compte bancaire) |

## Journal des événements

Chemin de base : `/giving/eventLog`

Étend `GenericCrudController` avec les routes CRUD : `getById`, `getAll`, `post`, `delete`. Suit les événements des webhooks de passerelle de paiement pour la vérification et la déduplication.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Lister tous les journaux d'événements |
| GET | `/:id` | JWT | Donations.ViewSummary | Obtenir un journal d'événements par ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Obtenir les journaux d'événements filtrés par type d'événement |
| POST | `/` | JWT | Donations.Edit | Créer ou mettre à jour des journaux d'événements |
| DELETE | `/:id` | JWT | Donations.Edit | Supprimer un journal d'événements |

## Pages connexes

- [Points de terminaison Membership](./membership) — Personnes, églises, groupes, rôles et autorisations
- [Authentification et autorisations](./authentication) — Flux de connexion, JWT, OAuth, modèle d'autorisations
- [Structure des modules](../module-structure) — Modèles d'organisation du code

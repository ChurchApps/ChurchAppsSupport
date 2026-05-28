---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Les webhooks permettent à une église d'envoyer des notifications en temps réel vers des outils tiers — plateformes d'automatisation (Zapier, Make, n8n), CRM, systèmes comptables, ou tout ce qui accepte un HTTP POST. Lorsqu'une personne, un groupe ou un foyer change dans B1, B1 envoie une charge JSON signée à chaque URL abonnée à cet événement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur d'église avec la permission **Modifier les paramètres de l'église** enregistre et gère les webhooks
- Votre point de terminaison récepteur doit être accessible via **HTTPS** à une adresse publique
- Avoir un moyen de stocker le secret de signature en toute sécurité — il n'est affiché qu'une seule fois

</div>

## Vue d'ensemble

Les webhooks sont **sortants** uniquement : B1 appelle votre point de terminaison, vous n'appelez pas B1. Chaque webhook est un abonnement par église composé d'une URL de destination, d'un secret de signature et d'une liste d'événements auxquels vous êtes abonné.

La livraison utilise une **boîte d'envoi durable** : lorsqu'un événement auquel vous êtes abonné se produit, B1 enregistre une ligne de livraison et un worker en arrière-plan envoie un POST en environ une minute. Les livraisons échouées sont réessayées avec un backoff exponentiel. Rien n'est perdu si une livraison est lente ou si votre point de terminaison est brièvement hors service.

## Enregistrement d'un webhook

### Dans B1Admin

Allez dans **Paramètres → Webhooks → Nouveau webhook**. Entrez un nom, l'URL de la charge et sélectionnez les événements auxquels vous abonner. Lors de l'enregistrement, le **secret de signature est affiché une fois** — copiez-le immédiatement et stockez-le avec votre intégration. Il n'est jamais affiché à nouveau (vous pouvez le faire pivoter plus tard, mais vous ne pouvez pas récupérer l'original).

### Via l'API

Tous les points de terminaison sont sous le chemin de base du module Membership `/membership/webhooks` et nécessitent un JWT d'un administrateur d'église avec la permission `Settings / Edit`.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — nouveaux membres",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

La réponse de création — et **uniquement** la réponse de création — inclut le `secret` :

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — nouveaux membres",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Méthode et chemin | Objectif |
|---|---|
| `GET /membership/webhooks` | Liste les webhooks de l'église (secret omis) |
| `GET /membership/webhooks/events` | Le catalogue des noms d'événements valides |
| `GET /membership/webhooks/:id` | Charge un webhook |
| `POST /membership/webhooks` | Créer (sans `id`) ou mettre à jour (avec `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Faire pivoter le secret de signature ; retourne la nouvelle valeur une fois |
| `DELETE /membership/webhooks/:id` | Supprimer un webhook |
| `GET /membership/webhooks/:id/deliveries` | Tentatives de livraison récentes pour un webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Charge complète et réponse pour une livraison |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Remettre en file d'attente une livraison |

## Catalogue d'événements

Les noms d'événements suivent le modèle `{entité}.{action}`. Récupérez la liste en direct depuis `GET /membership/webhooks/events`.

| Événement | Se déclenche quand |
|---|---|
| `person.created` | Une personne est ajoutée |
| `person.updated` | Un dossier de personne est modifié |
| `person.destroyed` | Une personne est supprimée |
| `household.created` | Un foyer est ajouté |
| `household.updated` | Un foyer est modifié |
| `household.destroyed` | Un foyer est supprimé |
| `group.created` | Un groupe est ajouté |
| `group.updated` | Un groupe est modifié |
| `group.destroyed` | Un groupe est supprimé |
| `group.member.added` | Une personne est ajoutée à un groupe |
| `group.member.removed` | Une personne est retirée d'un groupe |

## Format de la charge

Chaque livraison est un `POST` HTTP avec un corps JSON et ces en-têtes :

| En-tête | Description |
|---|---|
| `Content-Type` | Toujours `application/json` |
| `X-B1-Event` | Le nom de l'événement, par exemple `person.created` |
| `X-B1-Delivery-Id` | Id unique pour cette tentative de livraison — utilisez-le pour dédupliquer |
| `X-B1-Signature` | Signature HMAC-SHA256 du corps brut (voir ci-dessous) |
| `X-B1-Timestamp` | Secondes de l'époque Unix lorsque la demande a été envoyée |
| `User-Agent` | `B1-Webhooks/1.0` |

Le corps enveloppe la ressource modifiée dans une petite enveloppe :

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

Pour les événements `*.destroyed`, `data` contient uniquement l'`id` et le `churchId` de l'enregistrement supprimé.

## Vérification des signatures

Vérifiez toujours `X-B1-Signature` avant de faire confiance à une charge. La signature est `sha256=` suivi du HMAC-SHA256 hex du **corps de requête brut** claveté avec votre secret de signature. Calculez-le sur les octets que vous avez reçus — ne re-sérialisez pas le JSON analysé.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

Rejetez toute demande dont la signature ne correspond pas. Rejetez également facultativement les demandes dont le `X-B1-Timestamp` date de plus de quelques minutes pour limiter les fenêtres de rejeu.

## Livraison et réessais

Votre point de terminaison devrait répondre avec un statut `2xx` aussi rapidement que possible — idéalement après avoir seulement mis le travail en file d'attente, pas après l'avoir traité. Toute réponse non-`2xx`, un échec de connexion ou une réponse plus lente que **10 secondes** compte comme une livraison échouée.

Les livraisons échouées sont réessayées avec un backoff exponentiel — **16 tentatives sur environ 5 jours**. L'intervalle passe de 1 minute, à travers des heures, jusqu'à des écarts de 3 jours pour les dernières tentatives. Après la 16e tentative échouée, la livraison est marquée `exhausted` et abandonnée.

La livraison est **au moins une fois** : une livraison peut arriver plus d'une fois (par exemple, si votre point de terminaison réussit mais que la réponse est perdue). Utilisez l'en-tête `X-B1-Delivery-Id` pour dédupliquer — traitez chaque id une seule fois et traitez les répétitions comme des no-ops.

### Désactivation automatique

Si un webhook produit **trois livraisons épuisées consécutives**, B1 le désactive automatiquement. Corrigez votre point de terminaison, puis réactivez le webhook dans B1Admin (ou via `POST /membership/webhooks` avec `"active": true`).

## Inspection et relivraison

L'éditeur de webhook dans B1Admin affiche un tableau **Livraisons récentes** — événement, statut, nombre de tentatives, code de réponse et horodatage. La sélection d'une ligne révèle la charge complète qui a été envoyée et la réponse qui est revenue.

Utilisez **Relivrer** pour remettre en file d'attente toute livraison passée avec sa charge d'origine — utile après avoir corrigé un bug dans votre point de terminaison, ou pour remplir rétroactivement les événements que votre point de terminaison a manqués pendant qu'il était hors service.

## Exigences d'URL

Parce que les URL de webhook sont fournies par l'église, B1 applique des protections contre la falsification de requête côté serveur. Une URL de webhook est rejetée — lors de l'enregistrement et revérifiée avant chaque livraison — si elle :

- n'utilise pas **`https`**
- pointe vers `localhost`, un nom d'hôte `.local` / `.internal`, ou
- se résout en une adresse IP **privée, de bouclage, link-local ou de métadonnées cloud**

Votre point de terminaison doit être un service HTTPS accessible publiquement.

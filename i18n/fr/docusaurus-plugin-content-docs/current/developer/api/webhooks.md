---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Les webhooks permettent à une église d'envoyer des notifications en temps réel vers des outils tiers — des plates-formes d'automatisation (Zapier, Make, n8n), des CRM, des systèmes comptables, ou n'importe quoi qui accepte un POST HTTP. Lorsqu'une personne, un groupe ou un ménage change dans B1, B1 envoie une charge utile JSON signée à chaque URL abonnée à cet événement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur d'église avec la permission **Modifier les paramètres d'église** enregistre et gère les webhooks
- Votre point de terminaison récepteur doit être accessible sur **HTTPS** à une adresse publique
- Ayez un moyen de stocker le secret de signature en toute sécurité — il n'est affiché qu'une seule fois

</div>

## Aperçu

Les webhooks sont **sortants uniquement** : B1 appelle votre point de terminaison, vous n'appelez pas B1. Chaque webhook est un abonnement par église constitué d'une URL de destination, d'un secret de signature et d'une liste d'événements abonnés.

La livraison utilise une **boîte de sortie durable** : lorsqu'un événement abonné se produit, B1 enregistre une ligne de livraison et un processus de fond le POST dans environ une minute. Les livraisons échouées sont renvoyées avec un backoff exponentiel. Rien n'est perdu si une livraison est lente ou si votre point de terminaison est brièvement indisponible.

## Enregistrement d'un webhook

### Dans B1Admin

Allez à **Paramètres → Développeur → Webhooks → Nouveau Webhook**. Entrez un nom, l'URL de la charge utile et sélectionnez les événements à abonner. À l'enregistrement, le **secret de signature est affiché une fois** — copiez-le immédiatement et stockez-le avec votre intégration. Il n'est jamais montré à nouveau (vous pouvez le faire pivoter plus tard, mais vous ne pouvez pas récupérer l'original).

### Via l'API

Tous les points de terminaison sont sous le chemin de base du module Membership `/membership/webhooks` et nécessitent soit un JWT d'un administrateur d'église avec la permission `Settings / Edit`, **soit une [clé API](./api-keys) créée avec la portée `settings:write`**. Les mêmes routes acceptent les deux. C'est ce qui permet à Zapier et Make d'enregistrer les webhooks au nom de l'église lorsqu'un Zap ou un scénario est activé.

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

La réponse de création — et **seulement** la réponse de création — inclut le `secret` :

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
| `GET /membership/webhooks` | Lister les webhooks de l'église (secret omis) |
| `GET /membership/webhooks/events` | Le catalogue des noms d'événements valides |
| `GET /membership/webhooks/:id` | Charger un webhook |
| `POST /membership/webhooks` | Créer (pas `id`) ou mettre à jour (avec `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Faire pivoter le secret de signature ; retourne la nouvelle valeur une fois |
| `DELETE /membership/webhooks/:id` | Supprimer un webhook |
| `GET /membership/webhooks/:id/deliveries` | Tentatives de livraison récentes pour un webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Charge utile complète et réponse pour une livraison |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Re-mettre en file d'attente une livraison |

## Catalogue d'événements

Les noms d'événements suivent le modèle `{entity}.{action}`. Récupérez la liste en direct depuis `GET /membership/webhooks/events`.

| Événement | Déclenché quand |
|---|---|
| `person.created` | Une personne est ajoutée |
| `person.updated` | Un dossier personnel est modifié |
| `person.destroyed` | Une personne est supprimée |
| `household.created` | Un ménage est ajouté |
| `household.updated` | Un ménage est modifié |
| `household.destroyed` | Un ménage est supprimé |
| `group.created` | Un groupe est ajouté |
| `group.updated` | Un groupe est modifié |
| `group.destroyed` | Un groupe est supprimé |
| `group.member.added` | Une personne est ajoutée à un groupe |
| `group.member.removed` | Une personne est supprimée d'un groupe |
| `donation.created` | Un don est enregistré — saisie manuelle, en ligne ou la transition en attente → complète |
| `donation.updated` | Un dossier de donation est modifié |
| `attendance.recorded` | Une visite est enregistrée (saisie manuelle ou enregistrement) |
| `session.created` | Une nouvelle session de présence est créée (manuellement ou automatiquement au premier enregistrement) |
| `form.submission.created` | Un formulaire est soumis |
| `event.created` | Un événement de calendrier est ajouté |
| `event.updated` | Un événement de calendrier est modifié |
| `event.destroyed` | Un événement de calendrier est supprimé |

## Format de charge utile

Chaque livraison est un `POST` HTTP avec un corps JSON et ces en-têtes :

| En-tête | Description |
|---|---|
| `Content-Type` | Toujours `application/json` |
| `X-B1-Event` | Le nom de l'événement, par ex. `person.created` |
| `X-B1-Delivery-Id` | Id unique pour cette tentative de livraison — utilisez-le pour dédupliquer |
| `X-B1-Signature` | Signature HMAC-SHA256 du corps brut (voir ci-dessous) |
| `X-B1-Timestamp` | Secondes d'époque Unix au moment où la demande a été envoyée |
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

Pour les événements `*.destroyed`, `data` contient uniquement l'`id` et `churchId` du dossier supprimé.

Les événements dont les charges utiles font référence à d'autres dossiers par id portent également des noms lisibles par l'homme, résolus au moment de la livraison : `personName` et `groupName` sur les événements d'adhésion de groupe, `personName` sur les présences, les donations et les événements d'adhésion de liste, `groupName` sur `session.created`, et `formName` (plus `personName` lorsque la soumission est liée à une personne) sur `form.submission.created`.

## Types de connecteur

Le format de livraison par défaut est l'enveloppe JSON ci-dessus — `connectorType: "standard"`. Pour [Slack et Discord](/docs/b1-admin/integrations/slack-discord) le même moteur webhook publie plutôt un message en forme de chat que ces services acceptent directement :

| `connectorType` | Corps envoyé | Utilisé quand |
|---|---|---|
| `"standard"` (défaut) | enveloppe `{event, churchId, occurredAt, data}`, signée | Vous écrivez votre propre intégration, ou pointez sur Zapier / Make / un serveur personnalisé |
| `"slack"` | `{ "text": "💝 Nouveau don : 50,00 $" }` | Vous publiez directement sur une URL Slack Incoming Webhook |
| `"discord"` | `{ "content": "💝 Nouveau don : 50,00 $" }` | Vous publiez directement sur une URL de webhook de canal Discord |
| `"mailchimp"` | s.o. — le connecteur appelle l'API Mailchimp lui-même | Vous voulez [audience sync](/docs/b1-admin/integrations/services/mailchimp) sans URL à héberger |

Le type de connecteur est défini dans la liste déroulante **Type de connecteur** sur l'éditeur de webhook, ou via `connectorType` dans le corps `POST /membership/webhooks`. L'en-tête signé `X-B1-Signature` est toujours envoyé pour les livraisons Slack/Discord (ils l'ignorent sans danger), donc revenir à `standard` plus tard ne nécessite pas de resignature.

Slack et Discord sont des refonte de corps purs — le moteur POST toujours à l'URL fournie par l'église. `mailchimp` est le premier connecteur qui possède plutôt son échange HTTP : par événement il émet des demandes de upsert/archive/tag authentifiées contre l'API Mailchimp (`MailchimpConnector.deliver`), et ses identifiants (`{apiKey, audienceId}`) sont stockés chiffrés AES dans `webhooks.connectorConfig`, écrit uniquement via l'API. Les webhooks Mailchimp n'acceptent que les événements personne, membre de groupe et membre de liste ; l'itinéraire de sauvegarde vérifie la clé et l'audience contre Mailchimp avant d'accepter. Les lignes de livraison stockent l'enveloppe standard, de sorte que le journal de livraison montre ce que B1 a vu à côté de la réponse de Mailchimp. Les situations non mappées (personne sans e-mail, événement sans mappage) se terminent comme réussies avec une réponse `Skipped:` plutôt que de brûler des retries.

## Livraisons de test

Chaque éditeur de webhook a un bouton **Envoyer un événement de test** — l'appel API correspondant est `POST /membership/webhooks/:id/test`. L'itinéraire de test construit une charge utile synthétique pour le premier événement abonné, l'envoie de manière synchrone par le chemin de livraison signé réel (et via `formatForConnector` pour Slack/Discord), et retourne la ligne de livraison résultante incluant `responseStatus` et `responseBody`. Utilisez-le pour confirmer la connectivité et la manipulation de signature avant d'activer l'intégration pour de vrai. Pour les webhooks `mailchimp` le test vérifie plutôt les identifiants stockés contre l'API Mailchimp (un événement synthétique écrirait un abonné faux dans l'audience réelle de l'église) et retourne un résultat en forme de livraison sans créer de ligne.

## Vérification des signatures

Vérifiez toujours `X-B1-Signature` avant de faire confiance à une charge utile. La signature est `sha256=` suivie du HMAC-SHA256 hex du **corps de la demande brute** clé avec votre secret de signature. Calculez-la sur les octets que vous avez reçus — ne resérialisez pas le JSON analysé.

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

Rejetez toute demande dont la signature ne correspond pas. Optionnellement, rejetez également les demandes dont `X-B1-Timestamp` date de plus de quelques minutes pour limiter les fenêtres de relecture.

## Support SDK

Pour Node.js, `@churchapps/integration-sdk` expédie un vérificateur typé et un middleware Express qui gère la capture du corps brut, la vérification de signature et l'analyse d'enveloppe pour vous :

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capturez le corps brut avant l'analyse JSON — requis pour que la signature se vérifie toujours.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

Le SDK expose également `WebhookVerifier.verify(secret, rawBody, signatureHeader)` pour les runtimes non-Express (fonctions serverless, Fastify, etc.). Voir le paquet sur npm.

## Livraison et retries

Votre point de terminaison doit répondre avec un statut `2xx` aussi rapidement que possible — idéalement après avoir uniquement mis en file d'attente le travail, pas après l'avoir traité. Toute réponse non-`2xx`, une défaillance de connexion ou une réponse plus lente que **10 secondes** compte comme une livraison échouée.

Les livraisons échouées sont retentées avec un backoff exponentiel — **16 tentatives sur environ 5 jours**. L'intervalle passe de 1 minute, par les heures, jusqu'à des écarts de 3 jours pour les tentatives finales. Après la 16ème tentative échouée, la livraison est marquée `exhausted` et abandonnée.

La livraison est **au moins une fois** : une livraison peut arriver plus d'une fois (par exemple, si votre point de terminaison réussit mais que la réponse est perdue). Utilisez l'en-tête `X-B1-Delivery-Id` pour dédupliquer — traitez chaque id une seule fois et traitez les répétitions comme des no-ops.

### Désactivation automatique

Si un webhook produit **trois livraisons épuisées consécutives**, B1 le désactive automatiquement. Corrigez votre point de terminaison, puis réactivez le webhook dans B1Admin (ou via `POST /membership/webhooks` avec `"active": true`).

## Inspection et renvoi

L'éditeur de webhook dans B1Admin affiche un tableau **Livraisons récentes** — événement, statut, nombre de tentatives, code de réponse et horodatage. Sélectionner une ligne révèle la charge utile complète qui a été envoyée et la réponse qui est revenue.

Utilisez **Renvoyer** pour remettre en file d'attente n'importe quelle livraison passée avec sa charge utile d'origine — utile après avoir corrigé un bug dans votre point de terminaison ou pour remplir les événements que votre point de terminaison a manqués pendant qu'il était en bas.

## Exigences d'URL

Parce que les URL de webhook sont fournies par l'église, B1 met en place des protections contre la falsification de demande côté serveur. Une URL de webhook est rejetée — à l'enregistrement et re-vérifiée avant chaque livraison — si elle :

- n'utilise pas **`https`**
- pointe sur `localhost`, un nom d'hôte `.local` / `.internal`, ou
- se résout en une adresse IP **privée, loopback, link-local ou métadonnées cloud**

Votre point de terminaison doit être un service HTTPS publiquement accessible.

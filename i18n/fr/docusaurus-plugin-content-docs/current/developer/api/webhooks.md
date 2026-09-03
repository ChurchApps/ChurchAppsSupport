---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Les Webhooks permettent à une église de pousser des notifications en temps réel vers des outils tiers — des plateformes d'automatisation (Zapier, Make, n8n), des CRM, des systèmes comptables, ou n'importe quoi qui accepte une POST HTTP. Lorsqu'une personne, un groupe ou un ménage change dans B1, B1 envoie une charge JSON signée à chaque URL abonnée à cet événement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur d'église avec la permission **Éditer les Paramètres de l'Église** enregistre et gère les webhooks
- Votre point de terminaison de réception doit être accessible via **HTTPS** à une adresse publique
- Ayez un moyen de stocker le secret de signature de manière sécurisée — il n'est affiché qu'une seule fois

</div>

## Aperçu

Les Webhooks sont **sortants uniquement** : B1 appelle votre point de terminaison, vous n'appelez pas B1. Chaque webhook est une souscription par église composée d'une URL de destination, d'un secret de signature, et d'une liste d'événements abonnés.

La livraison utilise une **boîte de sortie durable** : lorsqu'un événement abonné se produit, B1 enregistre une ligne de livraison et un travail en arrière-plan la envoie par POST environ une minute après. Les livraisons échouées sont retentées avec backoff exponentiel. Rien n'est perdu si une livraison est lente ou votre point de terminaison est brièvement hors ligne.

## Enregistrement d'un Webhook

### Dans B1Admin

Allez à **Paramètres → Développeur → Webhooks → Nouveau Webhook**. Entrez un nom, l'URL de la charge, et sélectionnez les événements à abonner. À l'enregistrement, le **secret de signature est affiché une seule fois** — copiez-le immédiatement et stockez-le avec votre intégration. Il ne s'affiche jamais à nouveau (vous pouvez le faire tourner plus tard, mais vous ne pouvez pas récupérer l'original).

### Via l'API

Tous les points de terminaison se trouvent sous le chemin de base du module Membership `/membership/webhooks` et nécessitent soit un JWT d'un administrateur d'église avec la permission `Settings / Edit`, **soit une [clé API](./api-keys) frappée avec la portée `settings:write`**. Les mêmes routes acceptent les deux. C'est ce qui permet à Zapier et Make d'enregistrer les webhooks au nom de l'église lorsqu'un Zap ou un scénario est activé.

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

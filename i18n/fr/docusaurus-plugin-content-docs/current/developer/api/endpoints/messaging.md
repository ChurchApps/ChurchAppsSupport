---
title: "Endpoints de messagerie"
---

# Endpoints de messagerie

<div class="article-intro">

Les API ChurchApps fournissent l'accès par programme aux systèmes de messagerie, permettant aux intégrateurs d'envoyer et de recevoir des messages.

</div>

## Authentification

Tous les endpoints d'API nécessitent une authentification via clé d'API. Incluez votre clé d'API dans l'en-tête `Authorization` :

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints principaux

### Envoyer un message
```
POST /api/v1/messaging/messages
```

Envoie un message à un destinataire ou un groupe.

### Obtenir les messages
```
GET /api/v1/messaging/messages
```

Récupère une liste des messages envoyés et reçus.

### Obtenir les conversations
```
GET /api/v1/messaging/conversations
```

Récupère les conversations de messagerie.

## Documentation complète

Pour la documentation API complète, consultez [developer.churchapps.org](https://developer.churchapps.org).

## Articles connexes

- [Vue d'ensemble de l'API](../index.md)
- [API d'assistance](./attendance.md)
- [API de contenu](./content.md)

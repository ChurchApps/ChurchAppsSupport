---
title: "Endpoints d'assistance"
---

# Endpoints d'assistance

<div class="article-intro">

Les API ChurchApps fournissent l'accès par programme aux données de présence, permettant aux intégrateurs de lire, créer et mettre à jour les enregistrements de présence.

</div>

## Authentification

Tous les endpoints d'API nécessitent une authentification via clé d'API. Incluez votre clé d'API dans l'en-tête `Authorization` :

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints principaux

### Obtenir les dossiers de présence
```
GET /api/v1/attendance/sessions
```

Récupère une liste des sessions de présence.

### Créer un enregistrement de présence
```
POST /api/v1/attendance/attendance
```

Crée un nouveau dossier de présence pour une personne et un service.

### Mettre à jour la présence
```
PUT /api/v1/attendance/attendance/:id
```

Met à jour un dossier de présence existant.

## Documentation complète

Pour la documentation API complète, consultez [developer.churchapps.org](https://developer.churchapps.org).

## Articles connexes

- [Vue d'ensemble de l'API](../index.md)
- [API de messagerie](./messaging.md)
- [API de contenu](./content.md)

---
title: "Endpoints de contenu"
---

# Endpoints de contenu

<div class="article-intro">

Les API ChurchApps fournissent l'accès par programme aux données de contenu comme les sermons, les articles et les ressources multimédia.

</div>

## Authentification

Tous les endpoints d'API nécessitent une authentification via clé d'API. Incluez votre clé d'API dans l'en-tête `Authorization` :

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints principaux

### Obtenir le contenu
```
GET /api/v1/content
```

Récupère une liste des éléments de contenu disponibles.

### Obtenir un article de contenu spécifique
```
GET /api/v1/content/:id
```

Récupère les détails d'un élément de contenu spécifique.

### Créer un contenu
```
POST /api/v1/content
```

Crée un nouvel élément de contenu.

## Documentation complète

Pour la documentation API complète, consultez [developer.churchapps.org](https://developer.churchapps.org).

## Articles connexes

- [Vue d'ensemble de l'API](../index.md)
- [API d'assistance](./attendance.md)
- [API de messagerie](./messaging.md)

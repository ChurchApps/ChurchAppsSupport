---
title: "Terminaisons de contenu"
---

# Terminaisons de contenu

<div class="article-intro">

Le module Content gère les pages du site Web, les sections, les éléments, les blocs, les articles de blog, les redirections, les sermons, les listes de lecture, les services de streaming, les événements, les calendriers organisés, les fichiers, les galeries, les traductions bibliques et les recherches de versets, les chansons, les arrangements, les styles globaux, les photos d'archives et les paramètres. C'est le plus grand module de l'API et alimente le CMS, les médias/streaming, la planification du culte et les fonctionnalités Bible dans toutes les applications ChurchApps.

</div>

**Chemin de base :** `/content`

## Pages

Chemin de base : `/content/pages`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Charger l'arborescence complète de la page (sections, éléments, blocs) par URL ou ID. Supprime les ID internes lorsqu'ils sont récupérés par URL. Les récupérations basées sur l'URL appliquent la visibilité `pages.visibility` : une page fermée retourne `{ restricted: true, visibility }` sauf si le JWT (optionnel) satisfait la porte |
| GET | `/public/:churchId` | Public | — | Lister les pages publiques (`url`, `title`, `metaDescription`) ; seul `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtenir une page par ID |
| GET | `/` | JWT | — | Lister toutes les pages de l'église |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliquer une page avec tous les sections et éléments |
| POST | `/temp/ai` | JWT | Content.Edit | Enregistrer une page générée par IA (page, sections et éléments en un seul appel) |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les pages (lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une page |

### Exemple : Charger l'arborescence de la page

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Sections

Chemin de base : `/content/sections`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une section par ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliquer une section ou la convertir en bloc réutilisable |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les sections (lot). Mise à jour automatique de l'ordre de tri |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une section (mise à jour automatique de l'ordre de tri) |

## Éléments

Chemin de base : `/content/elements`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un élément par ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliquer un élément avec tous les enfants |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les éléments (lot). Gère automatiquement les colonnes de lignes et les diapositives de carrousel |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un élément |

## Blocs

Chemin de base : `/content/blocks`

Étend la CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la classe de base avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un bloc par ID |
| GET | `/` | JWT | — | Lister tous les blocs |
| GET | `/:churchId/tree/:id` | Public | — | Charger l'arborescence complète du bloc avec sections et éléments |
| GET | `/blockType/:blockType` | JWT | — | Charger les blocs par type (par exemple footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Charger l'arborescence du bloc de pied de page pour une église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les blocs |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un bloc |

## Liens

Chemin de base : `/content/links`

Étend la CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la classe de base avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un lien par ID |
| GET | `/` | JWT | — | Lister tous les liens. Filtre `?category=` optionnel. Tri automatique après enregistrement |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Charger les liens filtrés par visibilité (tout le monde, visiteurs, membres, personnel, groupes) |
| GET | `/church/:churchId?category=` | Public | — | Charger les liens pour une église par catégorie (public) |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les liens (lot). Tri automatique par catégorie |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un lien |

## Styles globaux

Chemin de base : `/content/globalStyles`

Étend la CRUD standard (POST `/`, DELETE `/:id` de la classe de base avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Charger les styles globaux pour une église (retourne les valeurs par défaut si aucun n'est défini) |
| GET | `/` | JWT | — | Charger les styles globaux pour l'église authentifiée |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les styles globaux |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer les styles globaux |

## Historique de page

Chemin de base : `/content/pageHistory`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Lister les entrées d'historique d'une page |
| GET | `/block/:blockId` | JWT | Content.Edit | Lister les entrées d'historique d'un bloc |
| GET | `/:id` | JWT | Content.Edit | Obtenir une entrée d'historique par ID |
| POST | `/` | JWT | Content.Edit | Enregistrer un instantané de page/bloc. Nettoie périodiquement les entrées antérieures à 30 jours |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurer une page/bloc à partir d'un instantané d'historique (supprime le contenu actuel et le recrée à partir de l'instantané) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurer à partir d'un objet d'instantané en ligne. Corps : `{ pageId, blockId, snapshot }` |

## Articles (Blog)

Chemin de base : `/content/posts`

Les articles de blog sont des métadonnées sur les pages ordinaires : le `pageId` de chaque article référence la page qui contient le corps, et la rangée d'articles ajoute `title`, `slug` (unique par église), `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category` et `tags`. Un article est publié une fois que `publishDate` est défini et dans le passé. Consultez [Architecture du générateur de sites Web](../../architecture/website-builder#blog-posts-over-pages).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Lister les articles publiés, paginés (max 50 par page) |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obtenir les métadonnées d'un article publié par slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Flux RSS 2.0 des articles publiés (liens construits comme `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obtenir un article par ID |
| GET | `/` | JWT | — | Lister tous les articles de l'église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les articles (lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un article |

## Redirections

Chemin de base : `/content/redirects`

Redirections d'URL par église (`fromPath` → `toPath`), limitées à 200 par église. Les chemins sont normalisés (minuscules, barre oblique en début, pas de barre oblique finale) et `fromPath` est unique par église. B1App les résout sur les 404 qui seraient autrement et émet un HTTP 308.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Résoudre un chemin (ou lister toutes les redirections quand `path` est omis) |
| GET | `/:id` | JWT | — | Obtenir une redirection par ID |
| GET | `/` | JWT | — | Lister toutes les redirections de l'église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les redirections. Rejette `fromPath = toPath` et applique la limite de 200 rangées |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une redirection |

## Sermons

Chemin de base : `/content/sermons`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obtenir une structure de liste de lecture FreeShow d'exemple |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obtenir l'emballage de l'application TV avec les sources de sermon, leçon et FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Obtenir un seul sermon sous la forme d'une liste de lecture de flux TV |
| GET | `/public/tvFeed/:churchId` | Public | — | Obtenir tous les sermons/listes de lecture publics sous la forme d'un flux TV |
| GET | `/public/:churchId` | Public | — | Lister tous les sermons publics pour une église |
| GET | `/timeline?sermonIds=` | JWT | — | Charger les données de la chronologie pour les sermons |
| GET | `/lookup?videoType=&videoData=` | Public | — | Rechercher les métadonnées de sermon à partir de YouTube ou Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Générer des suggestions de messages de médias sociaux IA à partir des sous-titres du sermon |
| GET | `/outline?url=&title=&author=` | JWT | — | Générer un plan de leçon IA à partir d'une URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importer des vidéos d'une chaîne YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importer des vidéos d'une chaîne Vimeo |
| GET | `/:id` | JWT | — | Obtenir un sermon par ID |
| GET | `/` | JWT | — | Lister tous les sermons |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour les sermons (lot, supporte le téléchargement de miniature base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer un sermon |

### Exemple : Rechercher un sermon YouTube

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Listes de lecture

Chemin de base : `/content/playlists`

Étend la CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` de la classe de base avec la permission StreamingServices.Edit pour les écritures).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une liste de lecture par ID |
| GET | `/` | JWT | — | Lister toutes les listes de lecture |
| GET | `/public/:churchId` | Public | — | Lister toutes les listes de lecture publiques pour une église |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour les listes de lecture (lot, supporte le téléchargement de miniature base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer une liste de lecture |

## Services de streaming

Chemin de base : `/content/streamingServices`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obtenir l'ID de la salle de chat hôte chiffré pour un service |
| GET | `/` | JWT | — | Lister tous les services de streaming. Nettoie automatiquement les services non récurrents expirés et avance les services récurrents |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour les services de streaming (lot) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer un service de streaming (efface également les IP bloquées) |

## Événements

Chemin de base : `/content/events`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Charger les événements de la chronologie pour un groupe |
| GET | `/timeline?eventIds=` | JWT | — | Charger les événements de la chronologie pour les groupes de l'utilisateur actuel |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | S'abonner aux événements en tant que flux de calendrier ICS |
| GET | `/group/:groupId` | JWT | — | Obtenir les événements d'un groupe (inclut les dates d'exception) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Obtenir les événements publics d'un groupe |
| GET | `/:id` | JWT | — | Obtenir un événement par ID |
| POST | `/` | JWT | — | Créer ou mettre à jour les événements (lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un événement |

## Exceptions d'événement

Chemin de base : `/content/eventExceptions`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une exception d'événement par ID |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les exceptions d'événement (lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une exception d'événement |

## Calendriers organisés

Chemin de base : `/content/curatedCalendars`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un calendrier organisé par ID |
| GET | `/` | JWT | — | Lister tous les calendriers organisés |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les calendriers organisés (lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un calendrier organisé |

## Événements organisés

Chemin de base : `/content/curatedEvents`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obtenir les événements organisés pour un calendrier (inclut les détails de l'événement et les dates d'exception sauf si `?withoutEvents` est défini) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Obtenir les événements publics organisés pour un calendrier |
| GET | `/:id` | JWT | — | Obtenir un événement organisé par ID |
| GET | `/` | JWT | — | Lister tous les événements organisés |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les événements organisés. Supporte le tableau `eventIds` pour ajouter des événements de groupe spécifiques |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un événement organisé |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Retirer un événement spécifique d'un calendrier organisé |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Retirer tous les événements d'un groupe d'un calendrier organisé |

## Fichiers

Chemin de base : `/content/files`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtenir des fichiers par type de contenu et ID de contenu |
| GET | `/` | JWT | — | Lister tous les fichiers du site Web de l'église |
| GET | `/:id` | JWT | — | Obtenir un fichier par ID |
| POST | `/` | JWT | Content.Edit* | Télécharger les fichiers (base64). *Également autorisé si l'utilisateur est membre du groupe correspondant à `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtenir une URL de téléchargement S3 présignée. *Également autorisé pour les membres du groupe. Max 100 Mo par élément de contenu |
| DELETE | `/:id` | JWT | Content.Edit* | Supprimer un fichier et le retirer du stockage. *Également autorisé pour les membres du groupe |

## Galerie

Chemin de base : `/content/gallery`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Lister les photos d'archives dans un dossier |
| GET | `/:folder` | JWT | Content.Edit | Lister les images de galerie dans un dossier |
| POST | `/requestUpload` | JWT | Content.Edit | Obtenir une URL de téléchargement S3 présignée pour une image de galerie |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Supprimer une image de galerie |

## Bibles

Chemin de base : `/content/bibles`

Tous les terminaisons Bible sont publics (aucune authentification requise). Les données sont récupérées à partir de sources externes et mises en cache localement.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/` | Public | — | Lister toutes les traductions bibliques (récupère la source si le cache est vide) |
| GET | `/stats?startDate=&endDate=` | Public | — | Obtenir les statistiques de recherche biblique pour une plage de dates |
| GET | `/availableTranslations/:source` | Public | — | Lister les traductions disponibles à partir d'une source (par exemple api.bible) |
| GET | `/updateTranslations` | Public | — | Synchroniser toutes les traductions de toutes les sources |
| GET | `/updateTranslations/:source` | Public | — | Synchroniser les traductions d'une source spécifique |
| GET | `/updateCopyrights` | Public | — | Mettre à jour les informations de droit d'auteur pour les traductions qui les manquent |
| GET | `/:translationKey/updateCopyright` | Public | — | Mettre à jour le droit d'auteur pour une traduction spécifique |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Rechercher des versets dans une traduction |
| GET | `/:translationKey/books` | Public | — | Obtenir les livres pour une traduction (cache localement) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Obtenir les chapitres d'un livre (cache localement) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Obtenir les versets d'un chapitre (cache localement) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Obtenir le texte du verset pour une plage. Enregistre les recherches. Certaines traductions contournent la mise en cache pour des raisons de licence |

### Exemple : Obtenir le texte du verset

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Chansons

Chemin de base : `/content/songs`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/search?q=` | JWT | — | Rechercher des chansons par requête |
| GET | `/:id` | JWT | — | Obtenir une chanson par ID |
| GET | `/` | JWT | Content.Edit | Lister toutes les chansons |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les chansons (lot) |
| POST | `/import` | JWT | — | Importer des chansons de FreeShow (lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une chanson |

## Détails de la chanson

Chemin de base : `/content/songDetails`

Les détails de la chanson sont globaux (pas d'étendue de l'église). Ceux-ci représentent les métadonnées de chanson canoniques partagées dans les églises.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un détail de chanson par ID (global) |
| GET | `/` | JWT | — | Lister les détails de la chanson pour l'église |
| POST | `/create` | JWT | — | Créer un détail de chanson à partir de l'ID PraiseCharts (retourne le produit existant s'il est déjà créé). Récupère automatiquement les métadonnées à partir de PraiseCharts et MusicBrainz |
| POST | `/` | JWT | — | Créer ou mettre à jour les détails de la chanson (lot) |

## Liens de détails de la chanson

Chemin de base : `/content/songDetailLinks`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un lien de détail de chanson par ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obtenir tous les liens pour un détail de chanson |
| POST | `/` | JWT | — | Créer ou mettre à jour les liens de détails de la chanson (lot). Récupère automatiquement les données MusicBrainz si lié |
| DELETE | `/:id` | JWT | — | Supprimer un lien de détail de chanson |

## Arrangements

Chemin de base : `/content/arrangements`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un arrangement par ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obtenir les arrangements d'une chanson |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obtenir les arrangements pour un détail de chanson |
| GET | `/` | JWT | Content.Edit | Lister tous les arrangements |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les arrangements (lot) |
| POST | `/freeShow/missing` | JWT | — | Trouver les ID FreeShow qui n'existent pas dans l'église. Corps : `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un arrangement (supprime également les clés ; supprime la chanson s'il n'y a pas d'autres arrangements) |

## Clés d'arrangement

Chemin de base : `/content/arrangementKeys`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Obtenir la clé d'arrangement avec les données de chanson complètes pour l'affichage du présentateur |
| GET | `/:id` | JWT | — | Obtenir une clé d'arrangement par ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obtenir les clés pour un arrangement |
| GET | `/` | JWT | Content.Edit | Lister toutes les clés d'arrangement |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les clés d'arrangement (lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une clé d'arrangement |

## Paramètres

Chemin de base : `/content/settings`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les paramètres de l'utilisateur actuel |
| GET | `/` | JWT | Settings.Edit | Obtenir tous les paramètres de l'église |
| GET | `/public/:churchId` | Public | — | Obtenir les paramètres publics pour une église (retournés sous forme de paires clé-valeur) |
| POST | `/my` | JWT | — | Enregistrer les paramètres au niveau de l'utilisateur (supporte le téléchargement d'image base64) |
| POST | `/` | JWT | Settings.Edit | Enregistrer les paramètres au niveau de l'église (supporte le téléchargement d'image base64) |
| DELETE | `/my/:id` | JWT | — | Supprimer un paramètre utilisateur |

## Aperçu

Chemin de base : `/content/preview`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/data/:key` | Public | — | Charger les données d'aperçu du streaming pour une église par clé de sous-domaine (onglets, liens, services, sermons) |

## Galerie (Photos d'archives)

Chemin de base : `/content/stock`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| POST | `/search` | Public | — | Rechercher les photos d'archives Pexels. Corps : `{ term: "church" }` |

## PraiseCharts

Chemin de base : `/content/praiseCharts`

Intégration avec PraiseCharts pour la découverte de chansons de culte et les téléchargements de partitions.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Obtenir les données PraiseCharts brutes pour une chanson |
| GET | `/hasAccount` | JWT | — | Vérifier si l'utilisateur a un compte PraiseCharts lié |
| GET | `/search?q=` | JWT | — | Rechercher le catalogue PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obtenir les produits pour une chanson (à partir de la bibliothèque si authentifié, sinon le catalogue) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obtenir les données d'arrangement brutes à partir de la bibliothèque |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Télécharger un fichier de PraiseCharts (PDF ou ZIP). Retourne `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Obtenir l'URL d'autorisation OAuth pour PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Échanger le vérificateur OAuth contre un jeton d'accès et l'enregistrer dans les paramètres utilisateur |
| GET | `/library` | JWT | — | Parcourir la bibliothèque PraiseCharts de l'utilisateur |

## Support

Chemin de base : `/content/support`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|-----------------|------------|-------------|
| POST | `/createAudio` | Public | — | Convertir le SSML en audio MP3 à l'aide d'AWS Polly. Corps : `{ ssml: "<speak>...</speak>" }` |

## Pages connexes

- [Architecture du générateur de sites Web](../../architecture/website-builder) -- Comment les pages, les sections, les éléments, les articles et les redirections s'assemblent dans les applications
- [Terminaisons d'adhésion](./membership) -- Personnes, églises, groupes, rôles, permissions
- [Terminaisons de présence](./attendance) -- Suivi du service et des visites
- [Authentification et permissions](./authentication) -- Flux de connexion, JWT, modèle de permission
- [Structure du module](../module-structure) -- Motifs d'organisation du code
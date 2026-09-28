---
title: "Points de terminaison Content"
---

# Points de terminaison Content

<div class="article-intro">

Le module Content gère les pages de site web, les sections, les éléments, les blocs, les articles de blog, les redirections, les sermons, les listes de lecture, les services de diffusion en continu, les événements, les calendriers organisés, les fichiers, les galeries, les traductions de la Bible et les recherches de versets, les chansons, les arrangements, les styles globaux, les photos d'action et les paramètres. C'est le plus grand module de l'API et alimente les fonctionnalités CMS, médias/diffusion, planification du culte et Bible sur toutes les applications ChurchApps.

</div>

**Chemin de base :** `/content`

## Pages

Chemin de base : `/content/pages`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Charger l'arborescence complète des pages (sections, éléments, blocs) par URL ou ID. Supprime les ID internes lors de la récupération par URL. Les récupérations basées sur les URL appliquent `pages.visibility` — une page avec accès restreint retourne `{ restricted: true, visibility }` sauf si le JWT (optionnel) satisfait la porte d'accès |
| GET | `/public/:churchId` | Public | — | Lister les pages publiques (`url`, `title`, `metaDescription`) ; uniquement `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtenir une page par ID |
| GET | `/` | JWT | — | Lister toutes les pages de l'église |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliquer une page avec toutes ses sections et tous ses éléments |
| POST | `/temp/ai` | JWT | Content.Edit | Enregistrer une page générée par l'IA (page, sections et éléments en un seul appel) |
| POST | `/importTree` | JWT | Content.Edit | Créer une page à partir d'une arborescence imbriquée (`title`, `url`, `sections[].elements[]…`). Insère toujours sous l'église de l'appelant ; les ID du corps sont ignorés. Les lignes doivent inclure leurs enfants `column`. Max 30 sections / 500 éléments |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des pages (en lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une page |

### Exemple : Charger l'arborescence des pages

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
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une section par ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliquer une section ou la convertir en bloc réutilisable |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des sections (en lot). Met à jour automatiquement l'ordre de tri |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une section (met à jour automatiquement l'ordre de tri) |

## Éléments

Chemin de base : `/content/elements`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un élément par ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliquer un élément avec tous ses enfants |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des éléments (en lot). Gère automatiquement les colonnes de ligne et les diapositives du carrousel |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un élément |

## Blocs

Chemin de base : `/content/blocks`

Étend le CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la classe de base avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un bloc par ID |
| GET | `/` | JWT | — | Lister tous les blocs |
| GET | `/:churchId/tree/:id` | Public | — | Charger l'arborescence complète des blocs avec sections et éléments |
| GET | `/blockType/:blockType` | JWT | — | Charger les blocs par type (par ex. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Charger l'arborescence du bloc de pied de page pour une église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des blocs |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un bloc |

## Liens

Chemin de base : `/content/links`

Étend le CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la classe de base avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un lien par ID |
| GET | `/` | JWT | — | Lister tous les liens. Filtre `?category=` optionnel. Tri automatique après enregistrement |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Charger les liens filtrés par visibilité (tout le monde, visiteurs, membres, personnel, groupes) |
| GET | `/church/:churchId?category=` | Public | — | Charger les liens pour une église par catégorie (public) |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des liens (en lot). Tri automatique par catégorie |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un lien |

## Styles globaux

Chemin de base : `/content/globalStyles`

Étend le CRUD standard (POST `/`, DELETE `/:id` de la classe de base avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Charger les styles globaux pour une église (retourne les valeurs par défaut si aucun ensemble) |
| GET | `/` | JWT | — | Charger les styles globaux pour l'église authentifiée |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les styles globaux |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer les styles globaux |

## Historique des pages

Chemin de base : `/content/pageHistory`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Lister les entrées d'historique pour une page |
| GET | `/block/:blockId` | JWT | Content.Edit | Lister les entrées d'historique pour un bloc |
| GET | `/:id` | JWT | Content.Edit | Obtenir une entrée d'historique par ID |
| POST | `/` | JWT | Content.Edit | Enregistrer un instantané page/bloc. Nettoie périodiquement les entrées de plus de 30 jours |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurer une page/bloc à partir d'un instantané d'historique (supprime le contenu actuel et recrée à partir de l'instantané) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurer à partir d'un objet d'instantané en ligne. Corps : `{ pageId, blockId, snapshot }` |

## Articles (Blog)

Chemin de base : `/content/posts`

Les articles de blog sont des lignes autonomes : `title`, `slug` (unique par église), `excerpt`, `content` (corps markdown), `authorId`, `photoUrl`, `publishDate`, `category` et `tags`. Un article est publié une fois que `publishDate` est défini et dans le passé. Les points de terminaison de lecture enrichissent chaque article avec `authorName` résolu à partir de `authorId`. Voir [Architecture du générateur de sites web](../../architecture/website-builder#blog).

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Lister les articles publiés, paginés (max 50 par page) |
| GET | `/public/:churchId/categories` | Public | — | Catégories distinctes parmi les articles publiés |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obtenir un article publié par slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Flux RSS 2.0 des articles publiés (liens construits comme `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obtenir un article par ID |
| GET | `/` | JWT | — | Lister tous les articles pour l'église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des articles (en lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un article |

## Redirections

Chemin de base : `/content/redirects`

Redirections d'URL par église (`fromPath` → `toPath`), limitées à 200 par église. Les chemins sont normalisés (minuscules, barre oblique de début, pas de barre oblique finale) et `fromPath` est unique par église. B1App résout ceux-ci sur les 404 potentiels et émet un HTTP 308.

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Résoudre un chemin (ou lister toutes les redirections quand `path` est omis) |
| GET | `/:id` | JWT | — | Obtenir une redirection par ID |
| GET | `/` | JWT | — | Lister toutes les redirections pour l'église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des redirections. Rejette `fromPath = toPath` et applique la limite de 200 lignes |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une redirection |

## Sermons

Chemin de base : `/content/sermons`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obtenir un exemple de structure de liste de lecture FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obtenir le wrapper d'application TV avec sources de sermon, de leçon et FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Obtenir un sermon unique comme une liste de lecture de flux TV |
| GET | `/public/tvFeed/:churchId` | Public | — | Obtenir toutes les listes de lecture/sermons publics comme un flux TV |
| GET | `/public/:churchId` | Public | — | Lister tous les sermons publics pour une église |
| GET | `/timeline?sermonIds=` | JWT | — | Charger les données de chronologie pour les sermons |
| GET | `/lookup?videoType=&videoData=` | Public | — | Rechercher les métadonnées du sermon sur YouTube ou Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Générer des suggestions de messages de médias sociaux basées sur l'IA à partir des sous-titres de sermon |
| GET | `/outline?url=&title=&author=` | JWT | — | Générer un plan de leçon basé sur l'IA à partir d'une URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importer des vidéos d'une chaîne YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importer des vidéos d'une chaîne Vimeo |
| GET | `/:id` | JWT | — | Obtenir un sermon par ID |
| GET | `/` | JWT | — | Lister tous les sermons |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour des sermons (en lot, prend en charge le téléchargement de miniature en base64) |
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

Étend le CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` de la classe de base avec la permission StreamingServices.Edit pour les écritures).

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une liste de lecture par ID |
| GET | `/` | JWT | — | Lister toutes les listes de lecture |
| GET | `/public/:churchId` | Public | — | Lister toutes les listes de lecture publiques pour une église |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour des listes de lecture (en lot, prend en charge le téléchargement de miniature en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer une liste de lecture |

## Services de diffusion en continu

Chemin de base : `/content/streamingServices`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obtenir l'ID de la salle de discussion de l'animateur chiffré pour un service |
| GET | `/` | JWT | — | Lister tous les services de diffusion en continu. Nettoie automatiquement les services non récurrents expirés et en avance les récurrents |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour des services de diffusion en continu (en lot) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer un service de diffusion en continu (efface également les IP bloquées) |

## Événements

Chemin de base : `/content/events`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Charger les événements de chronologie pour un groupe |
| GET | `/timeline?eventIds=` | JWT | — | Charger les événements de chronologie pour les groupes de l'utilisateur actuel |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | S'abonner aux événements en tant que flux de calendrier ICS |
| GET | `/group/:groupId` | JWT | — | Obtenir les événements d'un groupe (inclut les dates d'exception) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Obtenir les événements publics d'un groupe |
| GET | `/:id` | JWT | — | Obtenir un événement par ID |
| POST | `/` | JWT | — | Créer ou mettre à jour des événements (en lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un événement |

## Exceptions d'événement

Chemin de base : `/content/eventExceptions`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une exception d'événement par ID |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des exceptions d'événement (en lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une exception d'événement |

## Calendriers organisés

Chemin de base : `/content/curatedCalendars`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un calendrier organisé par ID |
| GET | `/` | JWT | — | Lister tous les calendriers organisés |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des calendriers organisés (en lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un calendrier organisé |

## Événements organisés

Chemin de base : `/content/curatedEvents`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obtenir les événements organisés pour un calendrier (inclut les détails des événements et les dates d'exception sauf si `?withoutEvents` est défini) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Obtenir les événements organisés publics pour un calendrier |
| GET | `/:id` | JWT | — | Obtenir un événement organisé par ID |
| GET | `/` | JWT | — | Lister tous les événements organisés |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des événements organisés. Prend en charge le tableau `eventIds` pour ajouter des événements de groupe spécifiques |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un événement organisé |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Supprimer un événement spécifique d'un calendrier organisé |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Supprimer tous les événements d'un groupe d'un calendrier organisé |

## Fichiers

Chemin de base : `/content/files`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtenir les fichiers par type de contenu et ID de contenu |
| GET | `/` | JWT | — | Lister tous les fichiers pour le site web de l'église |
| GET | `/:id` | JWT | — | Obtenir un fichier par ID |
| POST | `/` | JWT | Content.Edit* | Télécharger des fichiers (base64). *Également autorisé si l'utilisateur est membre du groupe correspondant à `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtenir une URL de téléchargement S3 pré-signée. *Également autorisé pour les membres du groupe. Max 100 Mo par élément de contenu |
| DELETE | `/:id` | JWT | Content.Edit* | Supprimer un fichier et le supprimer du stockage. *Également autorisé pour les membres du groupe |

## Galerie

Chemin de base : `/content/gallery`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Lister les photos d'action dans un dossier |
| GET | `/:folder` | JWT | Content.Edit | Lister les images de galerie dans un dossier |
| POST | `/requestUpload` | JWT | Content.Edit | Obtenir une URL de téléchargement S3 pré-signée pour une image de galerie |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Supprimer une image de galerie |

## Bibles

Chemin de base : `/content/bibles`

Tous les points de terminaison de la Bible sont publics (aucune authentification requise). Les données sont extraites de sources externes et mises en cache localement.

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Lister toutes les traductions de la Bible (récupère à partir de la source si le cache est vide) |
| GET | `/stats?startDate=&endDate=` | Public | — | Obtenir les statistiques de recherche de la Bible pour une plage de dates |
| GET | `/availableTranslations/:source` | Public | — | Lister les traductions disponibles d'une source (par ex. api.bible) |
| GET | `/updateTranslations` | Public | — | Synchroniser toutes les traductions de toutes les sources |
| GET | `/updateTranslations/:source` | Public | — | Synchroniser les traductions d'une source spécifique |
| GET | `/updateCopyrights` | Public | — | Mettre à jour les informations de droit d'auteur pour les traductions qui en manquent |
| GET | `/:translationKey/updateCopyright` | Public | — | Mettre à jour le droit d'auteur pour une traduction spécifique |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Rechercher des versets dans une traduction |
| GET | `/:translationKey/books` | Public | — | Obtenir les livres d'une traduction (mises en cache localement) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Obtenir les chapitres d'un livre (mises en cache localement) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Obtenir les versets d'un chapitre (mises en cache localement) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Obtenir le texte du verset pour une plage. Enregistre les recherches. Certaines traductions contournent la mise en cache pour des raisons de licence |

### Exemple : Obtenir le texte d'un verset

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
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Rechercher des chansons par requête |
| GET | `/:id` | JWT | — | Obtenir une chanson par ID |
| GET | `/` | JWT | Content.Edit | Lister toutes les chansons |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des chansons (en lot) |
| POST | `/import` | JWT | — | Importer des chansons depuis FreeShow (en lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une chanson |

## Détails de chanson

Chemin de base : `/content/songDetails`

Les détails de chanson sont globaux (non limités à l'église). Ceux-ci représentent les métadonnées de chanson canoniques partagées entre les églises.

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un détail de chanson par ID (global) |
| GET | `/` | JWT | — | Lister les détails de chanson pour l'église |
| POST | `/create` | JWT | — | Créer un détail de chanson à partir de l'ID PraiseCharts (retourne l'existant s'il est déjà créé). Récupère automatiquement les métadonnées de PraiseCharts et MusicBrainz |
| POST | `/` | JWT | — | Créer ou mettre à jour des détails de chanson (en lot) |

## Liens des détails de chanson

Chemin de base : `/content/songDetailLinks`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un lien de détail de chanson par ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obtenir tous les liens pour un détail de chanson |
| POST | `/` | JWT | — | Créer ou mettre à jour les liens de détail de chanson (en lot). Récupère automatiquement les données de MusicBrainz si lié |
| DELETE | `/:id` | JWT | — | Supprimer un lien de détail de chanson |

## Arrangements

Chemin de base : `/content/arrangements`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un arrangement par ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obtenir les arrangements pour une chanson |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obtenir les arrangements pour un détail de chanson |
| GET | `/` | JWT | Content.Edit | Lister tous les arrangements |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des arrangements (en lot) |
| POST | `/freeShow/missing` | JWT | — | Rechercher les ID FreeShow qui n'existent pas dans l'église. Corps : `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un arrangement (supprime également les touches ; supprime la chanson s'il n'y a pas d'arrangements restants) |

## Touches d'arrangement

Chemin de base : `/content/arrangementKeys`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Obtenir la touche d'arrangement avec les données complètes de la chanson pour la vue du présentateur |
| GET | `/:id` | JWT | — | Obtenir une touche d'arrangement par ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obtenir les touches pour un arrangement |
| GET | `/` | JWT | Content.Edit | Lister toutes les touches d'arrangement |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des touches d'arrangement (en lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une touche d'arrangement |

## Paramètres

Chemin de base : `/content/settings`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les paramètres de l'utilisateur actuel |
| GET | `/` | JWT | Settings.Edit | Obtenir tous les paramètres pour l'église |
| GET | `/public/:churchId` | Public | — | Obtenir les paramètres publics pour une église (retournés sous forme de paires clé-valeur) |
| POST | `/my` | JWT | — | Enregistrer les paramètres au niveau de l'utilisateur (prend en charge le téléchargement d'image en base64) |
| POST | `/` | JWT | Settings.Edit | Enregistrer les paramètres au niveau de l'église (prend en charge le téléchargement d'image en base64) |
| DELETE | `/my/:id` | JWT | — | Supprimer un paramètre utilisateur |

## Aperçu

Chemin de base : `/content/preview`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Charger les données d'aperçu de diffusion en continu pour une église par clé de sous-domaine (onglets, liens, services, sermons) |

## Galerie (Photos d'action)

Chemin de base : `/content/stock`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Rechercher les photos d'action Pexels. Corps : `{ term: "church" }` |

## PraiseCharts

Chemin de base : `/content/praiseCharts`

Intégration avec PraiseCharts pour la découverte de chansons de culte et les téléchargements de partitions.

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Obtenir les données brutes de PraiseCharts pour une chanson |
| GET | `/hasAccount` | JWT | — | Vérifier si l'utilisateur a un compte PraiseCharts lié |
| GET | `/search?q=` | JWT | — | Rechercher le catalogue PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obtenir les produits pour une chanson (de la bibliothèque si authentifié, sinon du catalogue) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obtenir les données d'arrangement brutes de la bibliothèque |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Télécharger un fichier de PraiseCharts (PDF ou ZIP). Retourne `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Obtenir l'URL d'autorisation OAuth pour PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Échanger le vérificateur OAuth pour un jeton d'accès et enregistrer dans les paramètres utilisateur |
| GET | `/library` | JWT | — | Parcourir la bibliothèque PraiseCharts de l'utilisateur |

## Support

Chemin de base : `/content/support`

| Méthode | Chemin | Authentification | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Convertir SSML en audio MP3 en utilisant AWS Polly. Corps : `{ ssml: "<speak>...</speak>" }` |

## Pages connexes

- [Architecture du générateur de sites web](../../architecture/website-builder) -- Comment les pages, sections, éléments, articles et redirections fonctionnent ensemble sur les applications
- [Points de terminaison adhésion](./membership) -- Personnes, églises, groupes, rôles, permissions
- [Points de terminaison de participation](./attendance) -- Suivi des services et des visites
- [Authentification et permissions](./authentication) -- Flux de connexion, JWT, modèle de permission
- [Structure du module](../module-structure) -- Modèles d'organisation du code

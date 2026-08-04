---
title: "Points de terminaison Content"
---

# Points de terminaison Content

<div class="article-intro">

Le module Content gère les pages de site web, les sections, les éléments, les blocs, les articles de blog, les redirections, les prédications, les listes de lecture, les services de streaming, les événements, les calendriers organisés, les fichiers, les galeries, les traductions bibliques et les recherches de versets, les chants, les arrangements, les styles globaux, les photos d'archives et les paramètres. C'est le plus grand module de l'API, et il alimente le CMS, les médias/streaming, la planification du culte et les fonctionnalités bibliques dans toutes les applications ChurchApps.

</div>

**Chemin de base :** `/content`

## Pages

Chemin de base : `/content/pages`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Charger l'arborescence complète d'une page (sections, éléments, blocs) par URL ou par ID. Retire les ID internes lors d'une récupération par URL. Les récupérations par URL appliquent `pages.visibility` -- une page restreinte renvoie `{ restricted: true, visibility }` sauf si le JWT (optionnel) satisfait la restriction |
| GET | `/public/:churchId` | Public | — | Lister les pages publiques (`url`, `title`, `metaDescription`) ; uniquement `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtenir une page par ID |
| GET | `/` | JWT | — | Lister toutes les pages de l'église |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliquer une page avec toutes ses sections et éléments |
| POST | `/temp/ai` | JWT | Content.Edit | Enregistrer une page générée par IA (page, sections et éléments en un seul appel) |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des pages (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une page |

### Exemple : charger l'arborescence d'une page

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

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une section par ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliquer une section ou la convertir en bloc réutilisable |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des sections (par lot). Met à jour automatiquement l'ordre de tri |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une section (met à jour automatiquement l'ordre de tri) |

## Elements

Chemin de base : `/content/elements`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un élément par ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliquer un élément avec tous ses enfants |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des éléments (par lot). Gère automatiquement les colonnes de rangée et les diapositives de carrousel |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un élément |

## Blocks

Chemin de base : `/content/blocks`

Étend le CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la classe de base, avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un bloc par ID |
| GET | `/` | JWT | — | Lister tous les blocs |
| GET | `/:churchId/tree/:id` | Public | — | Charger l'arborescence complète d'un bloc avec ses sections et éléments |
| GET | `/blockType/:blockType` | JWT | — | Charger les blocs par type (par ex. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Charger l'arborescence du bloc de pied de page pour une église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des blocs |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un bloc |

## Links

Chemin de base : `/content/links`

Étend le CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la classe de base, avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un lien par ID |
| GET | `/` | JWT | — | Lister tous les liens. Filtre optionnel `?category=`. Tri automatique après enregistrement |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Charger les liens filtrés par visibilité (tout le monde, visiteurs, membres, personnel, groupes) |
| GET | `/church/:churchId?category=` | Public | — | Charger les liens d'une église par catégorie (public) |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des liens (par lot). Tri automatique par catégorie |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un lien |

## Global Styles

Chemin de base : `/content/globalStyles`

Étend le CRUD standard (POST `/`, DELETE `/:id` de la classe de base, avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Charger les styles globaux d'une église (renvoie les valeurs par défaut si aucun n'est défini) |
| GET | `/` | JWT | — | Charger les styles globaux de l'église authentifiée |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les styles globaux |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer les styles globaux |

## Page History

Chemin de base : `/content/pageHistory`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Lister les entrées d'historique d'une page |
| GET | `/block/:blockId` | JWT | Content.Edit | Lister les entrées d'historique d'un bloc |
| GET | `/:id` | JWT | Content.Edit | Obtenir une entrée d'historique par ID |
| POST | `/` | JWT | Content.Edit | Enregistrer un instantané de page/bloc. Nettoie périodiquement les entrées de plus de 30 jours |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurer une page/bloc depuis un instantané d'historique (supprime le contenu actuel et le recrée depuis l'instantané) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurer depuis un objet instantané en ligne. Corps : `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Chemin de base : `/content/posts`

Les articles de blog sont des lignes autonomes : `title`, `slug` (unique par église), `excerpt`, `content` (corps en markdown), `authorId`, `photoUrl`, `publishDate`, `category`, et `tags`. Un article est publié dès que `publishDate` est défini et dans le passé. Les points de terminaison de lecture enrichissent chaque article avec `authorName` résolu depuis `authorId`. Voir [Architecture du générateur de sites web](../../architecture/website-builder#blog).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Lister les articles publiés, paginés (max 50 par page) |
| GET | `/public/:churchId/categories` | Public | — | Catégories distinctes parmi les articles publiés |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obtenir un article publié par slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Flux RSS 2.0 des articles publiés (liens construits comme `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obtenir un article par ID |
| GET | `/` | JWT | — | Lister tous les articles de l'église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des articles (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un article |

## Redirects

Chemin de base : `/content/redirects`

Redirections d'URL par église (`fromPath` → `toPath`), plafonnées à 200 par église. Les chemins sont normalisés (minuscules, barre oblique de tête, pas de barre oblique finale) et `fromPath` est unique par église. B1App résout ces redirections lors des 404 potentiels et émet un HTTP 308.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Résoudre un chemin (ou lister toutes les redirections si `path` est omis) |
| GET | `/:id` | JWT | — | Obtenir une redirection par ID |
| GET | `/` | JWT | — | Lister toutes les redirections de l'église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des redirections. Rejette `fromPath = toPath` et applique le plafond de 200 lignes |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une redirection |

## Sermons

Chemin de base : `/content/sermons`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obtenir une structure d'exemple de liste de lecture FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obtenir l'enveloppe de l'application TV avec les sources de prédication, de leçon et de FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Obtenir une seule prédication en tant que liste de lecture de flux TV |
| GET | `/public/tvFeed/:churchId` | Public | — | Obtenir toutes les listes de lecture/prédications publiques en tant que flux TV |
| GET | `/public/:churchId` | Public | — | Lister toutes les prédications publiques d'une église |
| GET | `/timeline?sermonIds=` | JWT | — | Charger les données de timeline pour des prédications |
| GET | `/lookup?videoType=&videoData=` | Public | — | Rechercher les métadonnées d'une prédication depuis YouTube ou Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Générer des suggestions de publications pour les réseaux sociaux par IA à partir des sous-titres de la prédication |
| GET | `/outline?url=&title=&author=` | JWT | — | Générer un plan de leçon par IA à partir d'une URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importer des vidéos depuis une chaîne YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importer des vidéos depuis une chaîne Vimeo |
| GET | `/:id` | JWT | — | Obtenir une prédication par ID |
| GET | `/` | JWT | — | Lister toutes les prédications |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour des prédications (par lot, prend en charge le téléversement de miniature en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer une prédication |

### Exemple : rechercher une prédication YouTube

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

## Playlists

Chemin de base : `/content/playlists`

Étend le CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` de la classe de base, avec la permission StreamingServices.Edit pour les écritures).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une liste de lecture par ID |
| GET | `/` | JWT | — | Lister toutes les listes de lecture |
| GET | `/public/:churchId` | Public | — | Lister toutes les listes de lecture publiques d'une église |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour des listes de lecture (par lot, prend en charge le téléversement de miniature en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer une liste de lecture |

## Streaming Services

Chemin de base : `/content/streamingServices`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obtenir l'ID chiffré du salon de chat de l'hôte pour un service |
| GET | `/` | JWT | — | Lister tous les services de streaming. Nettoie automatiquement les services non récurrents expirés et fait avancer les services récurrents |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour des services de streaming (par lot) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer un service de streaming (efface aussi les IP bloquées) |

## Events

Chemin de base : `/content/events`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Charger les événements de timeline pour un groupe |
| GET | `/timeline?eventIds=` | JWT | — | Charger les événements de timeline pour les groupes de l'utilisateur actuel |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | S'abonner aux événements sous forme de flux calendrier ICS |
| GET | `/group/:groupId` | JWT | — | Obtenir les événements d'un groupe (inclut les dates d'exception) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Obtenir les événements publics d'un groupe |
| GET | `/:id` | JWT | — | Obtenir un événement par ID |
| POST | `/` | JWT | — | Créer ou mettre à jour des événements (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un événement |

## Event Exceptions

Chemin de base : `/content/eventExceptions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une exception d'événement par ID |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des exceptions d'événement (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une exception d'événement |

## Curated Calendars

Chemin de base : `/content/curatedCalendars`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un calendrier organisé par ID |
| GET | `/` | JWT | — | Lister tous les calendriers organisés |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des calendriers organisés (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un calendrier organisé |

## Curated Events

Chemin de base : `/content/curatedEvents`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obtenir les événements organisés pour un calendrier (inclut les détails d'événement et les dates d'exception, sauf si `?withoutEvents` est défini) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Obtenir les événements organisés publics pour un calendrier |
| GET | `/:id` | JWT | — | Obtenir un événement organisé par ID |
| GET | `/` | JWT | — | Lister tous les événements organisés |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des événements organisés. Prend en charge un tableau `eventIds` pour ajouter des événements de groupe spécifiques |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un événement organisé |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Retirer un événement spécifique d'un calendrier organisé |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Retirer tous les événements d'un groupe d'un calendrier organisé |

## Files

Chemin de base : `/content/files`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtenir des fichiers par type et ID de contenu |
| GET | `/` | JWT | — | Lister tous les fichiers du site web de l'église |
| GET | `/:id` | JWT | — | Obtenir un fichier par ID |
| POST | `/` | JWT | Content.Edit* | Téléverser des fichiers (base64). *Également autorisé si l'utilisateur est membre du groupe correspondant à `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtenir une URL de téléversement S3 pré-signée. *Également autorisé pour les membres du groupe. Max 100 Mo par élément de contenu |
| DELETE | `/:id` | JWT | Content.Edit* | Supprimer un fichier et le retirer du stockage. *Également autorisé pour les membres du groupe |

## Gallery

Chemin de base : `/content/gallery`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Lister les photos d'archives d'un dossier |
| GET | `/:folder` | JWT | Content.Edit | Lister les images de la galerie d'un dossier |
| POST | `/requestUpload` | JWT | Content.Edit | Obtenir une URL de téléversement S3 pré-signée pour une image de galerie |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Supprimer une image de galerie |

## Bibles

Chemin de base : `/content/bibles`

Tous les points de terminaison Bible sont publics (aucune authentification requise). Les données sont récupérées depuis des sources externes et mises en cache localement.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Lister toutes les traductions bibliques (récupère depuis la source si le cache est vide) |
| GET | `/stats?startDate=&endDate=` | Public | — | Obtenir les statistiques de recherche biblique pour une plage de dates |
| GET | `/availableTranslations/:source` | Public | — | Lister les traductions disponibles d'une source (par ex. api.bible) |
| GET | `/updateTranslations` | Public | — | Synchroniser toutes les traductions de toutes les sources |
| GET | `/updateTranslations/:source` | Public | — | Synchroniser les traductions d'une source spécifique |
| GET | `/updateCopyrights` | Public | — | Mettre à jour les informations de copyright des traductions qui en manquent |
| GET | `/:translationKey/updateCopyright` | Public | — | Mettre à jour le copyright d'une traduction spécifique |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Rechercher des versets dans une traduction |
| GET | `/:translationKey/books` | Public | — | Obtenir les livres d'une traduction (mis en cache localement) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Obtenir les chapitres d'un livre (mis en cache localement) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Obtenir les versets d'un chapitre (mis en cache localement) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Obtenir le texte des versets pour une plage. Journalise les recherches. Certaines traductions contournent la mise en cache pour des raisons de licence |

### Exemple : obtenir le texte d'un verset

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

## Songs

Chemin de base : `/content/songs`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Rechercher des chants par requête |
| GET | `/:id` | JWT | — | Obtenir un chant par ID |
| GET | `/` | JWT | Content.Edit | Lister tous les chants |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des chants (par lot) |
| POST | `/import` | JWT | — | Importer des chants depuis FreeShow (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un chant |

## Song Details

Chemin de base : `/content/songDetails`

Les détails de chant sont globaux (non délimités par église). Ils représentent des métadonnées de chant canoniques partagées entre les églises.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un détail de chant par ID (global) |
| GET | `/` | JWT | — | Lister les détails de chant de l'église |
| POST | `/create` | JWT | — | Créer un détail de chant à partir d'un ID PraiseCharts (renvoie l'existant s'il a déjà été créé). Récupère automatiquement les métadonnées depuis PraiseCharts et MusicBrainz |
| POST | `/` | JWT | — | Créer ou mettre à jour des détails de chant (par lot) |

## Song Detail Links

Chemin de base : `/content/songDetailLinks`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un lien de détail de chant par ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obtenir tous les liens d'un détail de chant |
| POST | `/` | JWT | — | Créer ou mettre à jour des liens de détail de chant (par lot). Récupère automatiquement les données MusicBrainz si lié |
| DELETE | `/:id` | JWT | — | Supprimer un lien de détail de chant |

## Arrangements

Chemin de base : `/content/arrangements`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un arrangement par ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obtenir les arrangements d'un chant |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obtenir les arrangements d'un détail de chant |
| GET | `/` | JWT | Content.Edit | Lister tous les arrangements |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des arrangements (par lot) |
| POST | `/freeShow/missing` | JWT | — | Trouver les ID FreeShow qui n'existent pas dans l'église. Corps : `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un arrangement (supprime aussi les tonalités ; supprime le chant s'il ne reste aucun arrangement) |

## Arrangement Keys

Chemin de base : `/content/arrangementKeys`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Obtenir une tonalité d'arrangement avec les données complètes du chant pour la vue présentateur |
| GET | `/:id` | JWT | — | Obtenir une tonalité d'arrangement par ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obtenir les tonalités d'un arrangement |
| GET | `/` | JWT | Content.Edit | Lister toutes les tonalités d'arrangement |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des tonalités d'arrangement (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une tonalité d'arrangement |

## Settings

Chemin de base : `/content/settings`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les paramètres de l'utilisateur actuel |
| GET | `/` | JWT | Settings.Edit | Obtenir tous les paramètres de l'église |
| GET | `/public/:churchId` | Public | — | Obtenir les paramètres publics d'une église (renvoyés sous forme de paires clé-valeur) |
| POST | `/my` | JWT | — | Enregistrer les paramètres au niveau utilisateur (prend en charge le téléversement d'image en base64) |
| POST | `/` | JWT | Settings.Edit | Enregistrer les paramètres au niveau de l'église (prend en charge le téléversement d'image en base64) |
| DELETE | `/my/:id` | JWT | — | Supprimer un paramètre utilisateur |

## Preview

Chemin de base : `/content/preview`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Charger les données d'aperçu de streaming d'une église par clé de sous-domaine (onglets, liens, services, prédications) |

## Gallery (Stock Photos)

Chemin de base : `/content/stock`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Rechercher des photos d'archives Pexels. Corps : `{ term: "church" }` |

## PraiseCharts

Chemin de base : `/content/praiseCharts`

Intégration avec PraiseCharts pour la découverte de chants de culte et le téléchargement de partitions.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Obtenir les données brutes PraiseCharts d'un chant |
| GET | `/hasAccount` | JWT | — | Vérifier si l'utilisateur a un compte PraiseCharts lié |
| GET | `/search?q=` | JWT | — | Rechercher dans le catalogue PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obtenir les produits d'un chant (depuis la bibliothèque si authentifié, sinon depuis le catalogue) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obtenir les données brutes d'arrangement depuis la bibliothèque |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Télécharger un fichier depuis PraiseCharts (PDF ou ZIP). Renvoie `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Obtenir l'URL d'autorisation OAuth pour PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Échanger le vérificateur OAuth contre un jeton d'accès et l'enregistrer dans les paramètres utilisateur |
| GET | `/library` | JWT | — | Parcourir la bibliothèque PraiseCharts de l'utilisateur |

## Support

Chemin de base : `/content/support`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Convertir du SSML en audio MP3 avec AWS Polly. Corps : `{ ssml: "<speak>...</speak>" }` |

## Pages connexes

- [Architecture du générateur de sites web](../../architecture/website-builder) -- Comment les pages, sections, éléments, articles et redirections s'articulent entre les applications
- [Points de terminaison Membership](./membership) -- Personnes, églises, groupes, rôles, permissions
- [Points de terminaison Attendance](./attendance) -- Suivi des services et des visites
- [Authentification et permissions](./authentication) -- Flux de connexion, JWT, modèle de permissions
- [Structure des modules](../module-structure) -- Motifs d'organisation du code

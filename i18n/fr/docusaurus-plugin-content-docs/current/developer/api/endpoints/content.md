---
title: "Points de terminaison Contenu"
---

# Points de terminaison Contenu

<div class="article-intro">

Le module Contenu gère les pages du site web, les sections, les éléments, les blocs, les articles de blog, les redirections, les sermons, les playlists, les services de diffusion, les événements, les calendriers sélectionnés, les fichiers, les galeries, les traductions de la Bible et les recherches de versets, les chants, les arrangements, les styles globaux, les photos d'archive et les paramètres. C'est le plus grand module de l'API : il alimente le CMS, les fonctions média et diffusion, la planification du culte et les fonctionnalités Bible de toutes les applications ChurchApps.

</div>

**Chemin de base :** `/content`

## Pages

Chemin de base : `/content/pages`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Charge l'arborescence complète de la page (sections, éléments, blocs) par URL ou ID. Supprime les ID internes lorsque la page est récupérée par URL. Les récupérations par URL appliquent `pages.visibility` — une page restreinte renvoie `{ restricted: true, visibility }`, sauf si le JWT (facultatif) satisfait la condition |
| GET | `/public/:churchId` | Public | — | Liste les pages publiques (`url`, `title`, `metaDescription`) ; seules celles dont `visibility = everyone` sont retournées |
| GET | `/:id` | JWT | — | Récupère une page par ID |
| GET | `/` | JWT | — | Liste toutes les pages de l'église |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplique une page avec toutes ses sections et ses éléments |
| POST | `/temp/ai` | JWT | Content.Edit | Enregistre une page générée par IA (page, sections et éléments en un seul appel) |
| POST | `/importTree` | JWT | Content.Edit | Crée une page à partir d'une arborescence imbriquée (`title`, `url`, `sections[].elements[]…`). Insère toujours sous l'église de l'appelant ; les ID présents dans le corps sont ignorés. Les lignes doivent inclure leurs enfants `column`. Maximum 30 sections / 500 éléments |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des pages (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprime une page |

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
| GET | `/:id` | JWT | — | Récupère une section par ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplique une section ou la convertit en bloc réutilisable |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des sections (par lot). Met à jour l'ordre de tri automatiquement |
| DELETE | `/:id` | JWT | Content.Edit | Supprime une section (met à jour l'ordre de tri automatiquement) |

## Éléments

Chemin de base : `/content/elements`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Récupère un élément par ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplique un élément avec tous ses enfants |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des éléments (par lot). Gère automatiquement les colonnes des lignes et les diapositives des carrousels |
| DELETE | `/:id` | JWT | Content.Edit | Supprime un élément |

## Blocs

Chemin de base : `/content/blocks`

Étend le CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la classe de base, avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Récupère un bloc par ID |
| GET | `/` | JWT | — | Liste tous les blocs |
| GET | `/:churchId/tree/:id` | Public | — | Charge l'arborescence complète du bloc avec ses sections et ses éléments |
| GET | `/blockType/:blockType` | JWT | — | Charge les blocs par type (par ex. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Charge l'arborescence du bloc de pied de page d'une église |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des blocs |
| DELETE | `/:id` | JWT | Content.Edit | Supprime un bloc |

## Liens

Chemin de base : `/content/links`

Étend le CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` de la classe de base, avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Récupère un lien par ID |
| GET | `/` | JWT | — | Liste tous les liens. Filtre facultatif `?category=`. Tri automatique après l'enregistrement |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Charge les liens filtrés par visibilité (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | Charge les liens d'une église par catégorie (public) |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des liens (par lot). Tri automatique par catégorie |
| DELETE | `/:id` | JWT | Content.Edit | Supprime un lien |

## Styles globaux

Chemin de base : `/content/globalStyles`

Étend le CRUD standard (POST `/`, DELETE `/:id` de la classe de base, avec la permission Content.Edit pour les écritures).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Charge les styles globaux d'une église (renvoie les valeurs par défaut si aucun n'est défini) |
| GET | `/` | JWT | — | Charge les styles globaux de l'église authentifiée |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour les styles globaux |
| DELETE | `/:id` | JWT | Content.Edit | Supprime les styles globaux |

## Historique des pages

Chemin de base : `/content/pageHistory`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Liste les entrées d'historique d'une page |
| GET | `/block/:blockId` | JWT | Content.Edit | Liste les entrées d'historique d'un bloc |
| GET | `/:id` | JWT | Content.Edit | Récupère une entrée d'historique par ID |
| POST | `/` | JWT | Content.Edit | Enregistre un instantané de page ou de bloc. Supprime périodiquement les entrées de plus de 30 jours |
| POST | `/restore/:id` | JWT | Content.Edit | Restaure une page ou un bloc à partir d'un instantané de l'historique (supprime le contenu actuel et le recrée à partir de l'instantané) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaure à partir d'un objet d'instantané intégré. Corps : `{ pageId, blockId, snapshot }` |

## Articles (Blog)

Chemin de base : `/content/posts`

Les articles de blog sont des lignes autonomes : `title`, `slug` (unique par église), `excerpt`, `content` (corps en markdown), `authorId`, `photoUrl`, `publishDate`, `category` et `tags`. Un article est publié dès que `publishDate` est définie et dans le passé. Les points de terminaison de lecture enrichissent chaque article avec `authorName`, résolu à partir de `authorId`. Voir [Architecture du créateur de site web](../../architecture/website-builder#blog).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Liste les articles publiés, paginés (50 maximum par page) |
| GET | `/public/:churchId/categories` | Public | — | Catégories distinctes des articles publiés |
| GET | `/public/:churchId/slug/:slug` | Public | — | Récupère un article publié par slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Flux RSS 2.0 des articles publiés (liens construits sous la forme `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Récupère un article par ID |
| GET | `/` | JWT | — | Liste tous les articles de l'église |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des articles (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprime un article |

## Redirections

Chemin de base : `/content/redirects`

Redirections d'URL propres à chaque église (`fromPath` → `toPath`), limitées à 200 par église. Les chemins sont normalisés (minuscules, barre oblique initiale, sans barre oblique finale) et `fromPath` est unique par église. B1App les résout lorsqu'une erreur 404 serait affichée, et émet un HTTP 308.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Résout un chemin (ou liste toutes les redirections lorsque `path` est omis) |
| GET | `/:id` | JWT | — | Récupère une redirection par ID |
| GET | `/` | JWT | — | Liste toutes les redirections de l'église |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des redirections. Refuse `fromPath = toPath` et applique la limite de 200 lignes |
| DELETE | `/:id` | JWT | Content.Edit | Supprime une redirection |

## Sermons

Chemin de base : `/content/sermons`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Récupère un exemple de structure de playlist FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Récupère l'enveloppe de l'application TV avec les sources sermon, leçon et FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Récupère un seul sermon sous forme de playlist de flux TV |
| GET | `/public/tvFeed/:churchId` | Public | — | Récupère toutes les playlists et tous les sermons publics sous forme de flux TV |
| GET | `/public/:churchId` | Public | — | Liste tous les sermons publics d'une église |
| GET | `/timeline?sermonIds=` | JWT | — | Charge les données de chronologie des sermons |
| GET | `/lookup?videoType=&videoData=` | Public | — | Recherche les métadonnées d'un sermon sur YouTube ou Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Génère par IA des suggestions de publications pour les réseaux sociaux à partir des sous-titres du sermon |
| GET | `/outline?url=&title=&author=` | JWT | — | Génère par IA un plan de leçon à partir d'une URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importe les vidéos d'une chaîne YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Importe les vidéos d'une chaîne Vimeo |
| GET | `/:id` | JWT | — | Récupère un sermon par ID |
| GET | `/` | JWT | — | Liste tous les sermons |
| POST | `/` | JWT | StreamingServices.Edit | Crée ou met à jour des sermons (par lot, prend en charge l'envoi de miniature en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprime un sermon |

### Exemple : rechercher un sermon YouTube

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
| GET | `/:id` | JWT | — | Récupère une playlist par ID |
| GET | `/` | JWT | — | Liste toutes les playlists |
| GET | `/public/:churchId` | Public | — | Liste toutes les playlists publiques d'une église |
| POST | `/` | JWT | StreamingServices.Edit | Crée ou met à jour des playlists (par lot, prend en charge l'envoi de miniature en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprime une playlist |

## Services de diffusion

Chemin de base : `/content/streamingServices`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Récupère l'ID chiffré du salon de discussion de l'hôte pour un service |
| GET | `/` | JWT | — | Liste tous les services de diffusion. Supprime automatiquement les services expirés non récurrents et fait avancer les services récurrents |
| POST | `/` | JWT | StreamingServices.Edit | Crée ou met à jour des services de diffusion (par lot) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprime un service de diffusion (efface aussi les adresses IP bloquées) |

## Événements

Chemin de base : `/content/events`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Charge les événements de chronologie d'un groupe |
| GET | `/timeline?eventIds=` | JWT | — | Charge les événements de chronologie des groupes de l'utilisateur actuel |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | S'abonne aux événements sous forme de flux de calendrier ICS |
| GET | `/group/:groupId` | JWT | — | Récupère les événements d'un groupe (inclut les dates d'exception) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Récupère les événements publics d'un groupe |
| GET | `/public/:churchId/:id` | Public | — | Récupère un événement pour sa page publique, avec `roomNames` (salles issues des réservations non refusées). Renvoie `null` pour les événements en attente ou refusés, et pour les événements privés qui n'acceptent pas d'inscriptions |
| GET | `/public/:churchId/:id/ical` | Public | — | Télécharge cet événement unique sous forme de fichier `.ics` (`text/calendar`, dates d'exception appliquées). Renvoie `404` lorsque l'événement est masqué selon les mêmes règles |
| GET | `/:id` | JWT | — | Récupère un événement par ID |
| POST | `/` | JWT | — | Crée ou met à jour des événements (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprime un événement |

Les enregistrements d'événements incluent `photoUrl` (la photo d'événement au format 16:9 affichée sur la page publique de l'événement et dans les vignettes des événements à venir), `tags` (séparés par des virgules, utilisés par le filtre de tags de l'élément Calendrier du site web) et `notesViewRole` / `notesPostRole` (`staff` lorsque `null`, `leaders` ou `members`), qui contrôlent la conversation `eventNote` de l'événement — voir [Contrôle d'accès aux notes de groupe et d'événement](./messaging.md#group-and-event-notes-access-control). Les réponses des événements sélectionnés publics contiennent aussi le `photoUrl` et les `tags` de chaque événement.

## Exceptions d'événements

Chemin de base : `/content/eventExceptions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Récupère une exception d'événement par ID |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des exceptions d'événement (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprime une exception d'événement |

## Calendriers sélectionnés

Chemin de base : `/content/curatedCalendars`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Récupère un calendrier sélectionné par ID |
| GET | `/` | JWT | — | Liste tous les calendriers sélectionnés |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des calendriers sélectionnés (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprime un calendrier sélectionné |

## Événements sélectionnés

Chemin de base : `/content/curatedEvents`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Récupère les événements sélectionnés d'un calendrier (inclut les détails des événements et les dates d'exception, sauf si `?withoutEvents` est défini) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Récupère les événements sélectionnés publics d'un calendrier |
| GET | `/:id` | JWT | — | Récupère un événement sélectionné par ID |
| GET | `/` | JWT | — | Liste tous les événements sélectionnés |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des événements sélectionnés. Prend en charge le tableau `eventIds` pour ajouter des événements de groupe précis |
| DELETE | `/:id` | JWT | Content.Edit | Supprime un événement sélectionné |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Retire un événement précis d'un calendrier sélectionné |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Retire tous les événements d'un groupe d'un calendrier sélectionné |

## Fichiers

Chemin de base : `/content/files`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Récupère les fichiers par type et ID de contenu |
| GET | `/` | JWT | — | Liste tous les fichiers du site web de l'église |
| GET | `/:id` | JWT | — | Récupère un fichier par ID |
| POST | `/` | JWT | Content.Edit* | Téléverse des fichiers (en base64). *Autorisé aussi si l'utilisateur est membre du groupe correspondant à `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtient une URL de téléversement S3 pré-signée. *Autorisé aussi pour les membres du groupe. 100 Mo maximum par élément de contenu |
| DELETE | `/:id` | JWT | Content.Edit* | Supprime un fichier et le retire du stockage. *Autorisé aussi pour les membres du groupe |

## Galerie

Chemin de base : `/content/gallery`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Liste les photos d'archive d'un dossier |
| GET | `/:folder` | JWT | Content.Edit | Liste les images de la galerie d'un dossier |
| POST | `/requestUpload` | JWT | Content.Edit | Obtient une URL de téléversement S3 pré-signée pour une image de galerie |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Supprime une image de la galerie |

## Bibles

Chemin de base : `/content/bibles`

Tous les points de terminaison Bible sont publics (aucune authentification requise). Les données sont récupérées auprès de sources externes, puis mises en cache localement.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Liste toutes les traductions de la Bible (récupère depuis la source si le cache est vide) |
| GET | `/stats?startDate=&endDate=` | Public | — | Récupère les statistiques de consultation de la Bible pour une plage de dates |
| GET | `/availableTranslations/:source` | Public | — | Liste les traductions disponibles d'une source (par ex. api.bible) |
| GET | `/updateTranslations` | Public | — | Synchronise toutes les traductions de toutes les sources |
| GET | `/updateTranslations/:source` | Public | — | Synchronise les traductions d'une source précise |
| GET | `/updateCopyrights` | Public | — | Met à jour les informations de droits d'auteur des traductions qui en sont dépourvues |
| GET | `/:translationKey/updateCopyright` | Public | — | Met à jour les droits d'auteur d'une traduction précise |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Recherche des versets dans une traduction |
| GET | `/:translationKey/books` | Public | — | Récupère les livres d'une traduction (mise en cache locale) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Récupère les chapitres d'un livre (mise en cache locale) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Récupère les versets d'un chapitre (mise en cache locale) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Récupère le texte d'une plage de versets. Enregistre les consultations. Certaines traductions contournent le cache pour des raisons de licence |

### Exemple : obtenir le texte de versets

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

## Chants

Chemin de base : `/content/songs`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Recherche des chants par requête |
| GET | `/:id` | JWT | — | Récupère un chant par ID |
| GET | `/` | JWT | Content.Edit | Liste tous les chants |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des chants (par lot) |
| POST | `/import` | JWT | — | Importe des chants depuis FreeShow (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprime un chant |

## Détails des chants

Chemin de base : `/content/songDetails`

Les détails des chants sont globaux (non rattachés à une église). Ils représentent les métadonnées canoniques des chants, partagées entre les églises.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Récupère les détails d'un chant par ID (global) |
| GET | `/` | JWT | — | Liste les détails des chants de l'église |
| POST | `/create` | JWT | — | Crée le détail d'un chant à partir d'un ID PraiseCharts (renvoie l'existant s'il a déjà été créé). Récupère automatiquement les métadonnées depuis PraiseCharts et MusicBrainz |
| POST | `/` | JWT | — | Crée ou met à jour les détails des chants (par lot) |

## Liens des détails de chant

Chemin de base : `/content/songDetailLinks`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Récupère un lien de détail de chant par ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Récupère tous les liens d'un détail de chant |
| POST | `/` | JWT | — | Crée ou met à jour des liens de détails de chant (par lot). Récupère automatiquement les données MusicBrainz si un lien est défini |
| DELETE | `/:id` | JWT | — | Supprime un lien de détail de chant |

## Arrangements

Chemin de base : `/content/arrangements`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Récupère un arrangement par ID |
| GET | `/song/:songId` | JWT | Content.Edit | Récupère les arrangements d'un chant |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Récupère les arrangements d'un détail de chant |
| GET | `/` | JWT | Content.Edit | Liste tous les arrangements |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des arrangements (par lot) |
| POST | `/freeShow/missing` | JWT | — | Trouve les ID FreeShow absents de l'église. Corps : `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Supprime un arrangement (supprime aussi ses tonalités ; supprime le chant si plus aucun arrangement ne subsiste) |

## Tonalités des arrangements

Chemin de base : `/content/arrangementKeys`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Récupère la tonalité d'un arrangement avec les données complètes du chant pour la vue présentateur |
| GET | `/:id` | JWT | — | Récupère une tonalité d'arrangement par ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Récupère les tonalités d'un arrangement |
| GET | `/` | JWT | Content.Edit | Liste toutes les tonalités d'arrangement |
| POST | `/` | JWT | Content.Edit | Crée ou met à jour des tonalités d'arrangement (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprime une tonalité d'arrangement |

## Paramètres

Chemin de base : `/content/settings`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Récupère les paramètres de l'utilisateur actuel |
| GET | `/` | JWT | Settings.Edit | Récupère tous les paramètres de l'église |
| GET | `/public/:churchId` | Public | — | Récupère les paramètres publics d'une église (sous forme de paires clé-valeur) |
| POST | `/my` | JWT | — | Enregistre les paramètres utilisateur (prend en charge l'envoi d'image en base64) |
| POST | `/` | JWT | Settings.Edit | Enregistre les paramètres de l'église (prend en charge l'envoi d'image en base64) |
| DELETE | `/my/:id` | JWT | — | Supprime un paramètre utilisateur |

## Aperçu

Chemin de base : `/content/preview`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Charge les données d'aperçu de diffusion d'une église à partir de sa clé de sous-domaine (onglets, liens, services, sermons) |

## Galerie (photos d'archive)

Chemin de base : `/content/stock`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Recherche des photos d'archive sur Pexels. Corps : `{ term: "church" }` |

## PraiseCharts

Chemin de base : `/content/praiseCharts`

Intégration avec PraiseCharts pour la découverte de chants de louange et le téléchargement de partitions.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Récupère les données brutes PraiseCharts d'un chant |
| GET | `/hasAccount` | JWT | — | Vérifie si l'utilisateur a un compte PraiseCharts lié |
| GET | `/search?q=` | JWT | — | Recherche dans le catalogue PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Récupère les produits d'un chant (depuis la bibliothèque si authentifié, sinon depuis le catalogue) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Récupère les données brutes d'un arrangement depuis la bibliothèque |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Télécharge un fichier depuis PraiseCharts (PDF ou ZIP). Renvoie `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Récupère l'URL d'autorisation OAuth pour PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Échange le vérificateur OAuth contre un jeton d'accès et l'enregistre dans les paramètres utilisateur |
| GET | `/library` | JWT | — | Parcourt la bibliothèque PraiseCharts de l'utilisateur |

## Support

Chemin de base : `/content/support`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Convertit du SSML en audio MP3 avec AWS Polly. Corps : `{ ssml: "<speak>...</speak>" }` |

## Pages connexes

- [Architecture du créateur de site web](../../architecture/website-builder) -- Comment les pages, sections, éléments, articles et redirections s'articulent entre les applications
- [Points de terminaison Membres](./membership) -- Personnes, églises, groupes, rôles, permissions
- [Points de terminaison Présences](./attendance) -- Suivi des services et des visites
- [Authentification et permissions](./authentication) -- Flux de connexion, JWT, modèle de permissions
- [Structure du module](../module-structure) -- Modèles d'organisation du code

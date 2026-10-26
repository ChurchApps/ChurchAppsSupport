---
title: "Points de terminaison de contenu"
---

# Points de terminaison de contenu

<div class="article-intro">

Le module Contenu gère les pages de site web, les sections, les éléments, les blocs, les articles de blog, les redirections, les sermons, les listes de lecture, les services de diffusion en continu, les événements, les calendriers sélectionnés, les fichiers, les galeries, les traductions de la Bible et les recherches de versets, les chansons, les arrangements, les styles globaux, les photos d'archive et les paramètres. C'est le plus grand module de l'API. Il alimente le CMS, les fonctions multimédias et de diffusion, la planification du culte et les fonctionnalités bibliques de toutes les applications ChurchApps.

</div>

**Chemin de base :** `/content`

## Pages

Chemin de base : `/content/pages`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Charger l'arborescence complète de la page (sections, éléments, blocs) par URL ou par ID. Supprime les ID internes lorsque la page est récupérée par URL. Les récupérations par URL appliquent `pages.visibility` : une page restreinte renvoie `{ restricted: true, visibility }`, sauf si le JWT (facultatif) satisfait la condition |
| GET | `/public/:churchId` | Public | — | Lister les pages publiques (`url`, `title`, `metaDescription`) ; uniquement `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtenir une page par son ID |
| GET | `/` | JWT | — | Lister toutes les pages de l'église |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliquer une page avec toutes ses sections et tous ses éléments |
| POST | `/temp/ai` | JWT | Content.Edit | Enregistrer une page générée par l'IA (page, sections et éléments en un seul appel) |
| POST | `/importTree` | JWT | Content.Edit | Créer une page à partir d'une arborescence imbriquée (`title`, `url`, `sections[].elements[]…`). Insère toujours sous l'église de l'appelant ; les ID du corps sont ignorés. Les lignes doivent inclure leurs enfants `column`. Maximum 30 sections / 500 éléments |
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

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une section par son ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliquer une section ou la convertir en bloc réutilisable |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des sections (par lot). Met à jour automatiquement l'ordre de tri |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une section (met à jour automatiquement l'ordre de tri) |

## Éléments

Chemin de base : `/content/elements`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un élément par son ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliquer un élément avec tous ses enfants |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des éléments (par lot). Gère automatiquement les colonnes de ligne et les diapositives du carrousel |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un élément |

## Blocs

Chemin de base : `/content/blocks`

Hérite du CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` depuis la classe de base, avec l'autorisation Content.Edit pour les écritures).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un bloc par son ID |
| GET | `/` | JWT | — | Lister tous les blocs |
| GET | `/:churchId/tree/:id` | Public | — | Charger l'arborescence complète du bloc avec sections et éléments |
| GET | `/blockType/:blockType` | JWT | — | Charger les blocs par type (par ex. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Charger l'arborescence du bloc de pied de page d'une église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des blocs |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un bloc |

## Liens

Chemin de base : `/content/links`

Hérite du CRUD standard (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` depuis la classe de base, avec l'autorisation Content.Edit pour les écritures).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un lien par son ID |
| GET | `/` | JWT | — | Lister tous les liens. Filtre facultatif `?category=`. Tri automatique après l'enregistrement |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Charger les liens filtrés par visibilité (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | Charger les liens d'une église par catégorie (public) |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des liens (par lot). Tri automatique par catégorie |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un lien |

## Styles globaux

Chemin de base : `/content/globalStyles`

Hérite du CRUD standard (POST `/`, DELETE `/:id` depuis la classe de base, avec l'autorisation Content.Edit pour les écritures).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Charger les styles globaux d'une église (renvoie les valeurs par défaut si aucun n'est défini) |
| GET | `/` | JWT | — | Charger les styles globaux de l'église authentifiée |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour les styles globaux |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer les styles globaux |

## Historique des pages

Chemin de base : `/content/pageHistory`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Lister les entrées d'historique d'une page |
| GET | `/block/:blockId` | JWT | Content.Edit | Lister les entrées d'historique d'un bloc |
| GET | `/:id` | JWT | Content.Edit | Obtenir une entrée d'historique par son ID |
| POST | `/` | JWT | Content.Edit | Enregistrer un instantané de page ou de bloc. Nettoie périodiquement les entrées de plus de 30 jours |
| POST | `/restore/:id` | JWT | Content.Edit | Restaurer une page ou un bloc à partir d'un instantané de l'historique (supprime le contenu actuel et le recrée à partir de l'instantané) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Restaurer à partir d'un objet d'instantané intégré. Corps : `{ pageId, blockId, snapshot }` |

## Articles (blog)

Chemin de base : `/content/posts`

Les articles de blog sont des lignes autonomes : `title`, `slug` (unique par église), `excerpt`, `content` (corps en markdown), `authorId`, `photoUrl`, `publishDate`, `category` et `tags`. Un article est publié dès que `publishDate` est définie et se situe dans le passé. Les endpoints de lecture enrichissent chaque article avec `authorName`, résolu à partir de `authorId`. Voir [Architecture du générateur de site web](../../architecture/website-builder#blog).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Lister les articles publiés, avec pagination (50 au maximum par page) |
| GET | `/public/:churchId/categories` | Public | — | Catégories distinctes des articles publiés |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obtenir un article publié par son slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | Flux RSS 2.0 des articles publiés (liens construits sous la forme `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Obtenir un article par son ID |
| GET | `/` | JWT | — | Lister tous les articles de l'église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des articles (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un article |

## Redirections

Chemin de base : `/content/redirects`

Redirections d'URL par église (`fromPath` → `toPath`), limitées à 200 par église. Les chemins sont normalisés (en minuscules, avec une barre oblique initiale et sans barre oblique finale) et `fromPath` est unique par église. B1App résout ces redirections lorsqu'une réponse 404 est sur le point d'être renvoyée et émet un HTTP 308.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Résoudre un chemin (ou lister toutes les redirections si `path` est omis) |
| GET | `/:id` | JWT | — | Obtenir une redirection par son ID |
| GET | `/` | JWT | — | Lister toutes les redirections de l'église |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des redirections. Rejette `fromPath = toPath` et applique la limite de 200 lignes |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une redirection |

## Sermons

Chemin de base : `/content/sermons`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Obtenir un exemple de structure de liste de lecture FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Obtenir l'enveloppe de l'application TV avec les sources sermon, leçon et FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Obtenir un sermon unique sous forme de liste de lecture de flux TV |
| GET | `/public/tvFeed/:churchId` | Public | — | Obtenir toutes les listes de lecture ou tous les sermons publics sous forme de flux TV |
| GET | `/public/:churchId` | Public | — | Lister tous les sermons publics d'une église |
| GET | `/timeline?sermonIds=` | JWT | — | Charger les données de chronologie des sermons |
| GET | `/lookup?videoType=&videoData=` | Public | — | Rechercher les métadonnées d'un sermon sur YouTube ou Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Générer des suggestions de publications pour les réseaux sociaux par IA à partir des sous-titres du sermon |
| GET | `/outline?url=&title=&author=` | JWT | — | Générer un plan de leçon par IA à partir d'une URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importer des vidéos d'une chaîne YouTube. Les entités HTML que l'API de recherche YouTube place dans les titres et les descriptions (comme `&amp;` et `&#39;`) sont décodées |
| GET | `/vimeoImport/:channelId` | JWT | — | Importer des vidéos d'une chaîne Vimeo |
| GET | `/:id` | JWT | — | Obtenir un sermon par son ID |
| GET | `/` | JWT | — | Lister tous les sermons |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour des sermons. Accepte un tableau ou un seul objet sermon (renvoie toujours un tableau) ; un corps vide renvoie 400. Prend en charge le téléversement de vignette en base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer un sermon |

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

## Listes de lecture

Chemin de base : `/content/playlists`

Hérite du CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` depuis la classe de base, avec l'autorisation StreamingServices.Edit pour les écritures).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une liste de lecture par son ID |
| GET | `/` | JWT | — | Lister toutes les listes de lecture |
| GET | `/public/:churchId` | Public | — | Lister toutes les listes de lecture publiques d'une église |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour des listes de lecture (par lot, prend en charge le téléversement de vignette en base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer une liste de lecture |

## Services de diffusion en continu

Chemin de base : `/content/streamingServices`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Obtenir l'ID chiffré du salon de chat de l'animateur pour un service |
| GET | `/` | JWT | — | Lister tous les services de diffusion en continu. Nettoie automatiquement les services non récurrents expirés et fait avancer les services récurrents |
| POST | `/` | JWT | StreamingServices.Edit | Créer ou mettre à jour des services de diffusion en continu (par lot) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Supprimer un service de diffusion en continu (efface aussi les adresses IP bloquées) |

## Événements

Chemin de base : `/content/events`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Charger la chronologie des événements d'un groupe (inclut les dates d'exception, afin que les occurrences supprimées puissent être ignorées) |
| GET | `/timeline?eventIds=` | JWT | — | Charger la chronologie des événements des groupes de l'utilisateur actuel (inclut les dates d'exception) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | S'abonner aux événements sous forme de flux de calendrier ICS |
| GET | `/group/:groupId` | JWT | — | Obtenir les événements d'un groupe (inclut les dates d'exception) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Obtenir les événements publics d'un groupe |
| GET | `/public/:churchId/:id` | Public | — | Obtenir un événement pour sa page publique, avec `roomNames` (salles issues des réservations non refusées). Renvoie `null` pour les événements en attente ou refusés, et pour les événements privés qui n'acceptent pas d'inscriptions |
| GET | `/public/:churchId/:id/ical` | Public | — | Télécharger cet événement unique sous forme de fichier `.ics` (`text/calendar`, dates d'exception appliquées). Renvoie `404` lorsque l'événement est masqué selon les mêmes règles |
| GET | `/:id` | JWT | — | Obtenir un événement par son ID |
| POST | `/` | JWT | — | Créer ou mettre à jour des événements (par lot) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin ou chef de groupe | Supprimer un événement et ses réservations. Les responsables du groupe de l'événement peuvent le supprimer, et un demandeur peut retirer sa propre demande en attente |

Les enregistrements d'événements incluent `photoUrl` (la photo d'événement au format 16:9 affichée sur la page publique de l'événement et dans les vignettes des événements à venir), `tags` (séparés par des virgules, utilisés par le filtre par étiquette de l'élément Calendrier du site web) et `notesViewRole` / `notesPostRole` (`staff` lorsque la valeur est `null`, `leaders` ou `members`), qui contrôlent la conversation `eventNote` de l'événement. Voir [Contrôle d'accès aux notes de groupe et d'événement](./messaging.md#group-and-event-notes-access-control). Les réponses publiques d'événements sélectionnés incluent également le `photoUrl` et les `tags` de chaque événement.

## Exceptions d'événements

Chemin de base : `/content/eventExceptions`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une exception d'événement par son ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin ou chef de groupe | Créer ou mettre à jour des exceptions d'événements (par lot). Les responsables ne peuvent ajouter des exceptions que pour les événements des groupes qu'ils dirigent |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin ou chef de groupe | Supprimer une exception d'événement |

## Calendriers sélectionnés

Chemin de base : `/content/curatedCalendars`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un calendrier sélectionné par son ID |
| GET | `/` | JWT | — | Lister tous les calendriers sélectionnés |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des calendriers sélectionnés (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un calendrier sélectionné |

## Événements sélectionnés

Chemin de base : `/content/curatedEvents`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Obtenir les événements sélectionnés d'un calendrier (inclut les détails des événements et les dates d'exception, sauf si `?withoutEvents` est défini) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Obtenir les événements publics sélectionnés d'un calendrier |
| GET | `/:id` | JWT | — | Obtenir un événement sélectionné par son ID |
| GET | `/` | JWT | — | Lister tous les événements sélectionnés |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des événements sélectionnés. Accepte un tableau `eventIds` pour ajouter des événements de groupe précis |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un événement sélectionné |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Retirer un événement précis d'un calendrier sélectionné |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Retirer tous les événements d'un groupe d'un calendrier sélectionné |

## Fichiers

Chemin de base : `/content/files`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtenir les fichiers selon le type de contenu et l'ID de contenu |
| GET | `/` | JWT | — | Lister tous les fichiers du site web de l'église |
| GET | `/:id` | JWT | — | Obtenir un fichier par son ID |
| POST | `/` | JWT | Content.Edit* | Téléverser des fichiers (en base64). *Autorisé aussi si l'utilisateur est membre du groupe correspondant au `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Obtenir une URL de téléversement S3 pré-signée. *Autorisé aussi pour les membres du groupe. 100 Mo au maximum par élément de contenu |
| DELETE | `/:id` | JWT | Content.Edit* | Supprimer un fichier et le retirer du stockage. *Autorisé aussi pour les membres du groupe |

## Galerie

Chemin de base : `/content/gallery`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Lister les photos d'archive d'un dossier |
| GET | `/:folder` | JWT | Content.Edit | Lister les images de galerie d'un dossier |
| POST | `/requestUpload` | JWT | Content.Edit | Obtenir une URL de téléversement S3 pré-signée pour une image de galerie |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Supprimer une image de galerie |

## Bibles

Chemin de base : `/content/bibles`

Tous les endpoints de la Bible sont publics (aucune authentification requise). Les données sont récupérées auprès de sources externes et mises en cache localement. Les requêtes vers api.bible expirent après 15 secondes ; un délai dépassé renvoie **504**.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Lister toutes les traductions de la Bible (les récupère depuis la source si le cache est vide) |
| GET | `/stats?startDate=&endDate=` | Public | — | Obtenir les statistiques de consultation de la Bible pour une plage de dates |
| GET | `/availableTranslations/:source` | Public | — | Lister les traductions disponibles d'une source (par ex. api.bible) |
| GET | `/updateTranslations` | Public | — | Synchroniser toutes les traductions de toutes les sources |
| GET | `/updateTranslations/:source` | Public | — | Synchroniser les traductions d'une source précise |
| GET | `/updateCopyrights` | Public | — | Mettre à jour les informations de droits d'auteur des traductions qui en sont dépourvues |
| GET | `/:translationKey/updateCopyright` | Public | — | Mettre à jour le droit d'auteur d'une traduction précise |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Rechercher des versets dans une traduction |
| GET | `/:translationKey/books` | Public | — | Obtenir les livres d'une traduction (mise en cache locale) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Obtenir les chapitres d'un livre (mise en cache locale) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Obtenir les versets d'un chapitre (mise en cache locale) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Obtenir le texte d'une plage de versets. Journalise les consultations. Certaines traductions contournent le cache pour des raisons de licence |

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

## Chansons

Chemin de base : `/content/songs`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Rechercher des chansons par requête |
| GET | `/:id` | JWT | — | Obtenir une chanson par son ID |
| GET | `/` | JWT | Content.Edit | Lister toutes les chansons |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des chansons (par lot) |
| POST | `/import` | JWT | — | Importer des chansons depuis FreeShow (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une chanson |

## Détails des chansons

Chemin de base : `/content/songDetails`

Les détails des chansons sont globaux (non limités à une église). Ils représentent les métadonnées canoniques des chansons, partagées entre les églises.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir le détail d'une chanson par son ID (global) |
| GET | `/` | JWT | — | Lister les détails des chansons de l'église |
| POST | `/create` | JWT | — | Créer un détail de chanson à partir d'un ID PraiseCharts (renvoie l'existant s'il a déjà été créé). Récupère automatiquement les métadonnées depuis PraiseCharts et MusicBrainz |
| POST | `/` | JWT | — | Créer ou mettre à jour des détails de chansons (par lot) |

## Liens des détails de chanson

Chemin de base : `/content/songDetailLinks`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un lien de détail de chanson par son ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Obtenir tous les liens d'un détail de chanson |
| POST | `/` | JWT | — | Créer ou mettre à jour des liens de détails de chansons (par lot). Récupère automatiquement les données MusicBrainz si un lien est défini |
| DELETE | `/:id` | JWT | — | Supprimer un lien de détail de chanson |

## Arrangements

Chemin de base : `/content/arrangements`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un arrangement par son ID |
| GET | `/song/:songId` | JWT | Content.Edit | Obtenir les arrangements d'une chanson |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Obtenir les arrangements d'un détail de chanson |
| GET | `/` | JWT | Content.Edit | Lister tous les arrangements |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des arrangements (par lot) |
| POST | `/freeShow/missing` | JWT | — | Trouver les ID FreeShow qui n'existent pas dans l'église. Corps : `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer un arrangement (supprime aussi ses tonalités ; supprime la chanson s'il ne reste aucun arrangement) |

## Tonalités d'arrangement

Chemin de base : `/content/arrangementKeys`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Obtenir une tonalité d'arrangement avec les données complètes de la chanson pour la vue présentateur |
| GET | `/:id` | JWT | — | Obtenir une tonalité d'arrangement par son ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Obtenir les tonalités d'un arrangement |
| GET | `/` | JWT | Content.Edit | Lister toutes les tonalités d'arrangement |
| POST | `/` | JWT | Content.Edit | Créer ou mettre à jour des tonalités d'arrangement (par lot) |
| DELETE | `/:id` | JWT | Content.Edit | Supprimer une tonalité d'arrangement |

## Paramètres

Chemin de base : `/content/settings`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les paramètres de l'utilisateur actuel |
| GET | `/` | JWT | Settings.Edit | Obtenir tous les paramètres de l'église |
| GET | `/public/:churchId` | Public | — | Obtenir les paramètres publics d'une église (renvoyés sous forme de paires clé-valeur) |
| POST | `/my` | JWT | — | Enregistrer les paramètres au niveau de l'utilisateur (prend en charge le téléversement d'image en base64) |
| POST | `/` | JWT | Settings.Edit | Enregistrer les paramètres au niveau de l'église (prend en charge le téléversement d'image en base64) |
| DELETE | `/my/:id` | JWT | — | Supprimer un paramètre utilisateur |

## Aperçu

Chemin de base : `/content/preview`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Charger les données d'aperçu de diffusion d'une église à partir de sa clé de sous-domaine (onglets, liens, services, sermons) |

## Galerie (photos d'archive)

Chemin de base : `/content/stock`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Rechercher des photos d'archive sur Pexels. Corps : `{ term: "church" }` |

## PraiseCharts

Chemin de base : `/content/praiseCharts`

Intégration avec PraiseCharts pour la découverte de chansons de louange et le téléchargement de partitions.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Obtenir les données brutes PraiseCharts d'une chanson |
| GET | `/hasAccount` | JWT | — | Vérifier si l'utilisateur a un compte PraiseCharts lié |
| GET | `/search?q=` | JWT | — | Rechercher dans le catalogue PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Obtenir les produits d'une chanson (depuis la bibliothèque si authentifié, sinon depuis le catalogue) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Obtenir les données brutes d'un arrangement depuis la bibliothèque |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Télécharger un fichier depuis PraiseCharts (PDF ou ZIP). Renvoie `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Obtenir l'URL d'autorisation OAuth pour PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Échanger le vérificateur OAuth contre un jeton d'accès et l'enregistrer dans les paramètres de l'utilisateur |
| GET | `/library` | JWT | — | Parcourir la bibliothèque PraiseCharts de l'utilisateur |

## Assistance

Chemin de base : `/content/support`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Convertir du SSML en audio MP3 avec AWS Polly. Corps : `{ ssml: "<speak>...</speak>" }` |

## Pages connexes

- [Architecture du générateur de site web](../../architecture/website-builder) -- Comment les pages, sections, éléments, articles et redirections s'articulent entre les applications
- [Points de terminaison Membership](./membership) -- Personnes, églises, groupes, rôles, autorisations
- [Points de terminaison de présence](./attendance) -- Suivi des services et des visites
- [Authentification et autorisations](./authentication) -- Flux de connexion, JWT, modèle d'autorisations
- [Structure du module](../module-structure) -- Organisation du code

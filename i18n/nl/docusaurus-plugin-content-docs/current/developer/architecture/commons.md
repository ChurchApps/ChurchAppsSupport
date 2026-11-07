---
title: "Content Commons"
---

# Content Commons: gedeelde bibliotheek en moderatie

Door gebruikers ingediende content die over producten heen wordt gedeeld (WorshipCommons-liedjes, Lessons.church-lessen, FreeShow-sjablonen, sjablonen voor B1-websites) doorloopt één moderatiewachtrij in plaats van een eigen beoordelingsproces per product. Deze pagina beschrijft de levenscyclus van inzendingen en goedkeuringen, het gedeelde datamodel voor assets en waar de moderatie plaatsvindt.

## De asset-kern

Twee tabellen bevatten elk commons-item, ongeacht het product:

- **`assets`**: de openbare identiteitsrij. `status`: `pending` | `published` | `unpublished` | `removed`. Typespecifieke gegevens (liedgegevens, auteurs) staan in satelliettabellen die via `assetId` zijn gekoppeld.
- **`assetFiles`**: elk bestand dat aan een asset is gekoppeld (audio, afbeeldingen, documenten). Deze tabel vervangt de oudere kolommen `path` en de door komma's gescheiden `files` in afzonderlijke contenttabellen.
- **`submissions`**: de moderatie-eenheid. Levenscyclus: `draft → pending → approved | rejected | withdrawn`. Een inzending kan een gloednieuwe asset zijn of een bewerking van een bestaande, gepubliceerde asset (door de oorspronkelijke auteur of door een derde partij).

Wanneer een inzending wordt goedgekeurd, wordt een productspecifieke **publicatiehaak** uitgevoerd (`Api/src/modules/commons/helpers/publishHooks/`, bijvoorbeeld `song.ts`). Die haak vertaalt de inzending naar de eigen records van het product.

## Inzendingsproces

`CommonsSubmissionController` (`Api/src/modules/commons/`) is de API voor eindgebruikers: een concept aanmaken, bestanden vooraf ondertekenen en koppelen, een inzending ter beoordeling indienen of intrekken. De werkelijke afnemers zijn externe producentensites (de WorshipCommons-site, Lessons.church, FreeShow en de galerij met sjablonen voor B1-websites), niet B1Admin.

## Gebruik door kerken

Naast moderatie leest B1Admin ook rechtstreeks uit de commons-kern. De zoekfunctie "Add Song" onder Serving → Songs doorzoekt `GET /songs?sundayReady=true` naast de bestaande externe liedendatabase. Zo verschijnen gepubliceerde WorshipCommons-liedjes die medewerkers als klaar voor zondag hebben gemarkeerd (zie de luistervergrendeling hieronder), met een licentiebadge. Als je een lied selecteert, wordt de nieuwe `SongDetail` via `songDetailLinks` aan de bron gekoppeld. Dit is het enige pad waarlangs de B1Admin van een afzonderlijke kerk rechtstreeks commons-gegevens gebruikt, in plaats van via de hulpmiddelen van Server Admin die alleen voor medewerkers van ChurchApps bedoeld zijn. Voor de beschrijving voor kerken, zie de sectie [Gratis liederen van WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) in de supportdocumentatie.

## Moderatiewachtrij

De wachtrij staat onder **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`). Toegang wordt geregeld door de machtiging `Permissions.server.admin`, dezelfde die op die pagina ook Churches, Impersonate en Jobs beveiligt. Dit is een intern hulpmiddel dat alleen voor medewerkers van ChurchApps bedoeld is; individuele kerken zien het niet.

Er zijn drie subtabbladen:

- **Queue**: alle openstaande inzendingen van alle producten, te filteren op product en type asset. Elke rij toont een badge voor nieuwe asset, bewerking door de auteur of bewerking door een derde partij, het goedkeuringsverleden van de indiener, een samenvatting van de verschillen in velden en bestanden, en de leeftijd van de inzending (gemarkeerd na 72 uur). **Review** opent een paneel met verschillen per veld, voorbeelden van bestanden en een ingesloten voorbeeld van het product in alleen-lezenmodus. Approve en Reject ondersteunen sneltoetsen: j/k om te navigeren, a/r om een actie uit te voeren.
- **Reports**: auteursrechtelijke en beleids- of kwaliteitsmeldingen over gepubliceerde assets, verdeeld over twee wachtrijen plus een geschiedenis van afgehandelde meldingen. Een medewerker neemt een melding in behandeling en handelt die af met een resolutie (gegrond, afgewezen of duplicaat) en een actie (geen, depubliceren of verwijderen).
- **Assets**: een doorzoekbaar overzicht van gepubliceerde content met acties per asset: uitlichten, depubliceren/opnieuw publiceren, of verwijderen (reden: auteursrecht of beleid). Voor liedjes is hier de **luistervergrendeling** de manier waarop een lied "klaar voor zondag" wordt. Medewerkers markeren het pas nadat ze elke gepubliceerde toonsoort hebben beluisterd en hebben bevestigd dat de partituur, akkoorden en dia's allemaal aanwezig zijn.

Elk eindpunt onder `/commons/admin/*` (`CommonsAdminController.ts`) controleert de machtiging voor serverbeheer opnieuw, onafhankelijk van de rest.

:::info
Dit ontwerp kent bewust één wachtrij: de eigen moderatiepagina `/admin` van WorshipCommons is uitgefaseerd, zodat de inzendingen van alle producten via de hulpmiddelen van Server Admin in B1Admin worden afgehandeld.
:::

## Omvang

Api (commons-module), B1Admin (Server Admin) en de externe producentensites: WorshipCommons, Lessons.church, FreeShow en de sjablonen van de B1-websitebouwer.

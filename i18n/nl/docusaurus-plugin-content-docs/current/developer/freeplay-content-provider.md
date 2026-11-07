---
title: "FreePlay-contentprovider"
description: "Wat een contentprovider moet leveren om een lessenbibliotheek aan FreePlay te koppelen: logo, aanmeldmodel, catalogus- en playlist-endpoints en mediaformaten."
---

# FreePlay-contentprovider

<div class="article-intro">

FreePlay is de mediaspeler van ChurchApps voor het streamen van lessen en andere videocontent op telefoons, tablets en tv's. Als u een bibliotheek met lesmateriaal heeft en dit beschikbaar wilt maken in FreePlay, dan beschrijft deze gids alles wat u moet aanleveren.

</div>

## Branding

Voordat de integratie kan beginnen, hebben we het volgende nodig:

- **Logo** -- Een logo-afbeelding in de beeldverhouding **16:9** (wordt gebruikt voor providerkaarten in de FreePlay-interface)
- **Merknaam** -- De gewenste naam die voor uw organisatie in FreePlay moet worden weergegeven

## API-eindpunten

FreePlay communiceert met uw service via een kleine set REST-eindpunten. Voor elke provider schrijven wij een eigen adapter, dus de exacte URL-structuur is flexibel -- maar onderstaande informatie hebben we nodig.

### Authenticatie

Kies het model dat past bij uw content:

| Model | Wanneer gebruiken | Wat we nodig hebben |
|-------|-------------------|---------------------|
| **Geen** | Openbare content, geen aanmelding vereist | Niets -- wij roepen uw catalogusendpoints direct aan |
| **OAuth (PKCE)** | Aanmelden via web/mobiel | Autorisatie-URL, token-uitwisselingseindpunt, client-ID, scopes |
| **Device Flow** | Aanbevolen voor tv-apps (gebruiker voert een korte code in op zijn telefoon) | Device-autorisatie-eindpunt, token-polling-eindpunt, client-ID |

:::tip
Als uw content authenticatie vereist, geeft het auth-eindpunt een **gebruikerstoken** terug dat FreePlay doorgeeft aan de browse- en les-eindpunten om de toegang te autoriseren.
:::

### Browse / Catalogus

Een eindpunt (of een set eindpunten) dat een **mappenstructuur** teruggeeft van alle beschikbare lessen.

- Dit kan een **enkele aanroep** zijn die de volledige structuur teruggeeft, of **meerdere aanroepen** waarbij elke aanroep één niveau teruggeeft terwijl de gebruiker dieper navigeert.
- Elk item in de structuur moet de volgende velden bevatten:

| Veld | Verplicht | Beschrijving |
|------|-----------|--------------|
| `id` | Ja | Een unieke identificatie voor de map |
| `name` | Ja | Weergavenaam van de map |
| `thumbnail` | Aanbevolen | Een miniatuur-URL in de verhouding **16:9** |

### Lesplaylist

Een eindpunt dat de **playlist van mediabestanden** voor één les teruggeeft.

Elk item in de playlist moet de volgende velden bevatten:

| Veld | Verplicht | Beschrijving |
|------|-----------|--------------|
| `title` | Ja | Weergavetitel van het mediabestand |
| `mediaType` | Ja | `video` of `image` |
| `url` | Ja | Directe downloadlink naar het bestand (zie hieronder [Mediaformaten](#media-formats)) |
| `thumbnail` | Aanbevolen | Een miniatuurafbeelding voor het item |
| `duration` | Aanbevolen | Duur in seconden (voor video's) |

## Mediaformaten

FreePlay downloadt bestanden rechtstreeks, dus elk mediabestand moet een **directe link** hebben (geen ingesloten spelers of paginaredirects).

| Type | Geaccepteerde formaten |
|------|-----------------------|
| Video | **MP4** (vereist voor afspelen op alle platforms, op Apple- en Android-apparaten) |
| Afbeelding | JPG, PNG of GIF |

## Opmerkingen

- Een **REST-API die JSON teruggeeft** is het gebruikelijke integratiepatroon, maar omdat wij voor elke provider een eigen adapter schrijven, kunnen wij met vrijwel elk API-formaat werken.
- Als u interesse heeft om een FreePlay-contentprovider te worden, neem dan contact op via [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) of open een issue op [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).

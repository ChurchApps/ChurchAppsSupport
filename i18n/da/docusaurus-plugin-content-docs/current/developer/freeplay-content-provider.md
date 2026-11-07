---
title: "FreePlay-indholdsudbyder"
description: "Hvad en indholdsudbyder skal levere for at forbinde et lektionsbibliotek til FreePlay: logo, login-model, katalog- og playlist-endepunkter samt medieformater."
---

# FreePlay-indholdsudbyder

<div class="article-intro">

FreePlay er ChurchApps' medieafspiller til streaming af lektioner og andet videoindhold på telefoner, tablets og tv. Hvis du har et bibliotek med lektionsindhold og gerne vil gøre det tilgængeligt i FreePlay, dækker denne guide alt, hvad du skal levere.

</div>

## Branding

Før integrationen kan begynde, har vi brug for:

- **Logo** -- Et logobillede i **16:9**-format (bruges til udbyderkort i FreePlay-brugerfladen)
- **Brandnavn** -- Det foretrukne navn, der skal vises for din organisation i FreePlay

## API-endepunkter

FreePlay kommunikerer med din tjeneste via et lille sæt REST-endepunkter. Vi skriver en tilpasset adapter for hver udbyder, så den præcise URL-struktur er fleksibel -- men oplysningerne nedenfor er dem, vi har brug for.

### Godkendelse

Vælg den model, der passer til dit indhold:

| Model | Hvornår den bruges | Hvad vi har brug for |
|-------|-------------|--------------|
| **Ingen** | Offentligt indhold, ingen login påkrævet | Intet -- vi kalder dine katalogendepunkter direkte |
| **OAuth (PKCE)** | Web-/mobillogin | Autorisations-URL, endepunkt til tokenudveksling, klient-ID, scopes |
| **Enhedsflow** | Foretrukket til tv-apps (brugeren indtaster en kort kode på sin telefon) | Endepunkt for enhedsautorisation, endepunkt til tokenpolling, klient-ID |

:::tip
Hvis dit indhold kræver godkendelse, returnerer godkendelsesendepunktet et **brugertoken**, som FreePlay sender til browse- og lektionsendepunkterne for at autorisere adgang.
:::

### Browse / katalog

Et endepunkt (eller sæt af endepunkter), der returnerer et **mappetræ** med alle tilgængelige lektioner.

- Dette kan være et **enkelt kald**, der returnerer hele træet, eller **flere kald**, hvor hvert returnerer ét niveau, efterhånden som brugeren navigerer dybere.
- Hvert element i træet bør indeholde:

| Felt | Påkrævet | Beskrivelse |
|-------|----------|-------------|
| `id` | Ja | En unik identifikator for mappen |
| `name` | Ja | Visningsnavn for mappen |
| `thumbnail` | Anbefales | En URL til et **16:9**-miniaturebillede |

### Lektionsafspilningsliste

Et endepunkt, der returnerer **afspilningslisten med mediefiler** for en enkelt lektion.

Hvert element i afspilningslisten bør indeholde:

| Felt | Påkrævet | Beskrivelse |
|-------|----------|-------------|
| `title` | Ja | Visningstitel for mediet |
| `mediaType` | Ja | `video` eller `image` |
| `url` | Ja | Direkte downloadlink til filen (se [Medieformater](#media-formats) nedenfor) |
| `thumbnail` | Anbefales | Et miniaturebillede for elementet |
| `duration` | Anbefales | Varighed i sekunder (for videoer) |

## Medieformater

FreePlay downloader filer direkte, så hvert medieelement skal have et **direkte link** (ingen indlejrede afspillere eller sidehenvisninger).

| Type | Accepterede formater |
|------|-----------------|
| Video | **MP4** (påkrævet for afspilning på tværs af platforme på Apple- og Android-enheder) |
| Billede | JPG, PNG eller GIF |

## Noter

- Et **REST API, der returnerer JSON**, er det typiske integrationsmønster, men da vi skriver en tilpasset adapter for hver udbyder, kan vi arbejde med stort set alle API-formater.
- Hvis du er interesseret i at blive indholdsudbyder til FreePlay, kan du kontakte os på [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) eller oprette et issue på [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).

---
title: "FreePlay innholdsleverandør"
---

# FreePlay innholdsleverandør

:::info Teknisk dokumentasjon
Denne siden inneholder teknisk API-dokumentasjon for innholdsleverandører.
For fullstendig engelsk dokumentasjon, se [FreePlay Content Provider](/docs/developer/freeplay-content-provider) (engelsk versjon).
:::

<div class="article-intro">

FreePlay er ChurchApps mediespiller for strømming av leksjoner og annet videoinnhold på telefoner, nettbrett og TV-er. Hvis du har et bibliotek med leksjonsinnhold og vil gjøre det tilgjengelig i FreePlay, dekker denne guiden alt du trenger å tilby.

</div>

## Merkevarebygging

Før integ

rasjon kan begynne, trenger vi:

- **Logo** -- Et logobilde i **16:9**-størrelsesforhold (brukes for leverandørkort i FreePlay UI)
- **Merkenavn** -- Det foretrukne navnet for å vise organisasjonen din i FreePlay

## API-endepunkter

FreePlay kommuniserer med tjenesten din gjennom et lite sett med REST-endepunkter. Vi skriver en tilpasset adapter for hver leverandør, så den eksakte URL-strukturen er fleksibel -- men informasjonen nedenfor er det vi trenger.

### Autentisering

Velg modellen som passer innholdet ditt:

| Modell | Når å bruke | Hva vi trenger |
|-------|-------------|--------------|
| **Ingen** | Offentlig innhold, ingen pålogging påkrevd | Ingenting -- vi ringer katalogendepunktene dine direkte |
| **OAuth (PKCE)** | Web/mobil pålogging | Autorisasjons-URL, token-utveksling-endepunkt, klient-ID, omfang |
| **Enhetsflyt** | Foretrukket for TV-apper (bruker skriver inn en kort kode på telefonen) | Enhetsautorisering-endepunkt, token-polling-endepunkt, klient-ID |

For fullstendig dokumentasjon på engelsk, se [FreePlay Content Provider](/docs/developer/freeplay-content-provider).

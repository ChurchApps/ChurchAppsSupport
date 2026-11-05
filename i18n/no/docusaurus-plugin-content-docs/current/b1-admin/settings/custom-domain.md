---
title: "Eget domene"
---

# Eget domene

<div class="article-intro">

Du kan peke ditt eget domene (for eksempel **`www.yourchurch.org`**) til B1-nettstedet ditt, slik at besøkende kommer til menighetens faktiske webadresse i stedet for standardadressen yourchurch.b1.church.

</div>

## Opplæringsvideo

<YouTube id="L5yaDusHts8" title="Connecting a Custom Domain in B1" next="Setting Up Live Streaming in B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Steg 1 — Legg til DNS-posten først

Før du legger til domenet ditt i B1, må du peke det til B1s servere hos domeneregistratoren din (GoDaddy, Namecheap, Cloudflare osv.).

Legg til én av disse postene -- CNAME er å foretrekke:

| Type | Vert | Verdi |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Bruk **CNAME** for `www`-adressen din. Bruk **A-posten** hvis registratoren din ikke støtter CNAME på rotdomenet (uten www), eller hvis du vil at rotdomenet også skal fungere.

Det kan ta fra noen minutter til noen timer før DNS-endringer trer i kraft.

## Steg 2 — Legg til domenet i B1

Når DNS peker til B1:

1. Gå til **Settings** i B1 Admin.
2. Klikk på **Domains** i listen til venstre, og klikk deretter på **Edit** i seksjonen **Domains**.
3. Skriv inn domenet ditt i feltet og klikk på **Save**.

Du trenger ikke å klikke på **+**-knappen først. Et domene som står i feltet når du lagrer, blir lagt til. Bruk **+** (eller trykk **Enter**) når du vil legge til flere domener i listen før du lagrer.

B1 håndterer SSL automatisk -- du trenger ikke kjøpe et sertifikat.

:::warning
Hvis du legger til domenet i B1 før DNS-postene er på plass, blir det ikke lagret. Sett alltid opp DNS først.
:::

## Sjekke at det fungerer

Etter lagring besøker du domenet ditt i en nettleser. Hvis det laster B1-nettstedet ditt, er du ferdig. Hvis du får en feilmelding, kan DNS fortsatt være under oppdatering. Vent noen minutter og prøv igjen.

Du kan også sjekke DNS-oppdateringen på [dnschecker.org](https://dnschecker.org). Søk etter domenet ditt og se om CNAME- eller A-posten din vises.

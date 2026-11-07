---
title: "Eget domene"
description: "Pek ditt eget domene, for eksempel www.dinmenighet.no, mot B1-nettstedet ditt i B1 Admin ved å sette opp DNS-poster og legge til domenet i Innstillinger."
---

# Eget domene

<div class="article-intro">

Du kan peke ditt eget domene (for eksempel **`www.dinkirke.org`**) til B1-nettstedet ditt, slik at besøkende når det på kirkens virkelige nettadresse i stedet for standardadressen dinkirke.b1.church.

</div>

## Steg 1 — Legg til DNS-posten først

Før du legger til domenet ditt i B1, må du peke det til B1s servere hos domeneleverandøren din (GoDaddy, Namecheap, Cloudflare osv.).

Legg til én av disse postene — CNAME foretrekkes:

| Type | Vert | Verdi |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `dinkirke.org` | `3.23.251.61` |

Bruk **CNAME** for `www`-adressen din. Bruk **A-posten** hvis domeneleverandøren ikke støtter CNAME på rotdomenet (uten www), eller hvis du også vil at rotdomenet skal fungere.

DNS-endringer kan ta alt fra noen minutter til noen timer før de virker.

## Steg 2 — Legg til domenet i B1

Når DNS peker til B1:

1. Gå til **Innstillinger** i B1 Admin.
2. Klikk **Domener** i listen til venstre, og klikk deretter **Rediger** i delen **Domener**.
3. Skriv inn domenet ditt i feltet og klikk **Lagre**.

Du trenger ikke å klikke på **+**-knappen først -- et domene som står skrevet i feltet, legges til når du lagrer. Bruk **+** (eller trykk **Enter**) når du vil legge til flere domener i listen før du lagrer.

B1 håndterer SSL automatisk — du trenger ikke kjøpe et sertifikat.

:::warning
Hvis du legger til domenet i B1 før DNS-postene er på plass, blir det ikke lagret. Sett alltid opp DNS først.
:::

## Sjekke at det fungerer

Etter lagring besøker du domenet ditt i en nettleser. Hvis det laster B1-nettstedet ditt, er du ferdig. Hvis du ser en feilmelding, kan DNS fortsatt være i ferd med å spre seg -- vent noen minutter og prøv igjen.

Du kan også sjekke DNS-spredningen på [dnschecker.org](https://dnschecker.org) — søk etter domenet ditt og se etter at CNAME- eller A-posten din vises.

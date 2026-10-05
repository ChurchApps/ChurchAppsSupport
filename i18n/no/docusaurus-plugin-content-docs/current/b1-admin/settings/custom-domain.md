---
title: "Eget domene"
---

# Eget domene

<div class="article-intro">

Du kan peke ditt eget domene (for eksempel **www.dinkirke.no**) til B1-nettstedet ditt, slik at besøkende kommer til kirkens egentlige nettadresse i stedet for standardadressen dinkirke.1.church.

</div>

## Trinn 1 — Legg til DNS-posten først

Før du legger til domenet i B1, må du peke det til B1s servere hos domeneregistratoren din (GoDaddy, Namecheap, Cloudflare osv.).

Legg til én av disse postene — CNAME er å foretrekke:

| Type | Vert | Verdi |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Bruk **CNAME** for `www`-adressen din. Bruk **A-posten** hvis registratoren din ikke støtter CNAME på et rot-/apex-domene (uten www), eller hvis du vil at rotdomenet også skal fungere.

DNS-endringer kan ta fra noen minutter til noen timer før de trer i kraft.

## Trinn 2 — Legg til domenet i B1

Når DNS peker til B1:

1. Gå til **Innstillinger** i B1 Admin.
2. Klikk på **Domener**.
3. Skriv inn domenet ditt i feltet og klikk på **Lagre**.

Du trenger ikke klikke på **+**-knappen først -- et domene som står skrevet i feltet, legges til når du lagrer. Bruk **+** (eller trykk **Enter**) når du vil legge til flere domener i listen før du lagrer.

B1 håndterer SSL automatisk — du trenger ikke kjøpe noe sertifikat.

:::warning
Hvis du legger til domenet i B1 før DNS-postene dine er på plass, blir det ikke lagret. Sett alltid opp DNS først.
:::

## Sjekke om det fungerer

Etter at du har lagret, besøker du domenet ditt i en nettleser. Hvis B1-nettstedet ditt lastes, er du ferdig. Hvis du ser en feil, kan DNS fortsatt være i ferd med å spre seg — vent noen minutter og prøv igjen.

Du kan også sjekke DNS-spredningen på [dnschecker.org](https://dnschecker.org) — søk etter domenet ditt og se etter at CNAME- eller A-posten din dukker opp.

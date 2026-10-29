---
title: "Eget domene"
---

# Eget domene

<div class="article-intro">

Du kan peke ditt eget domene (for eksempel **`www.dinkirke.no`**) til B1-nettstedet ditt, slik at besøkende når det på kirkens egen nettadresse i stedet for standardadressen dinkirke.b1.church.

</div>

## Steg 1 — Legg til DNS-posten først

Før du legger til domenet ditt i B1, må du peke det til B1s servere hos domeneregistratoren din (GoDaddy, Namecheap, Cloudflare osv.).

Legg til en av disse postene — CNAME er å foretrekke:

| Type | Vert | Verdi |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `dinkirke.no` | `3.23.251.61` |

Bruk **CNAME** for `www`-adressen din. Bruk **A-posten** hvis registratoren din ikke støtter CNAME på et rotdomene (uten www), eller hvis du vil at rotdomenet også skal fungere.

DNS-endringer kan ta fra noen minutter til noen timer før de trer i kraft.

## Steg 2 — Legg til domenet i B1

Når DNS peker til B1:

1. Gå til **Innstillinger** i B1 Admin.
2. Klikk **Domener** i listen til venstre, og klikk deretter **Rediger** i seksjonen **Domener**.
3. Skriv inn domenet ditt i feltet og klikk **Lagre**.

Du trenger ikke klikke på **+**-knappen først — et domene som står igjen i feltet, legges til når du lagrer. Bruk **+** (eller trykk **Enter**) når du vil legge til flere domener i listen før du lagrer.

B1 håndterer SSL automatisk — du trenger ikke kjøpe et sertifikat.

:::warning
Hvis du legger til domenet i B1 før DNS-postene er på plass, lagres det ikke. Sett alltid opp DNS først.
:::

## Sjekke at det fungerer

Etter lagring besøker du domenet ditt i en nettleser. Hvis det laster B1-nettstedet ditt, er du ferdig. Hvis du ser en feil, kan DNS fortsatt være under utbredelse — vent noen minutter og prøv igjen.

Du kan også sjekke DNS-utbredelsen på [dnschecker.org](https://dnschecker.org) — søk etter domenet ditt og se at CNAME- eller A-posten din vises.

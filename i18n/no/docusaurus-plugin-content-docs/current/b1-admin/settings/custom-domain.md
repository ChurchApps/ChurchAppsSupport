---
title: "Eget domene"
description: "Pek ditt eget domene, for eksempel www.yourchurch.org, til B1-nettstedet ditt i B1 Admin ved å sette opp DNS-poster og legge til domenet i Innstillinger."
---

# Eget domene

<div class="article-intro">

Du kan peke ditt eget domene (for eksempel **`www.yourchurch.org`**) til B1-nettstedet ditt, slik at besøkende når det på menighetens faktiske webadresse i stedet for standardadressen yourchurch.b1.church.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="L5yaDusHts8" title="Koble til et eget domene i B1" next="Sette opp direktesending i B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Steg 1 — Legg til DNS-posten først {#step-1--add-the-dns-record-first}

Før du legger til domenet ditt i B1, må du peke det til B1s servere hos domeneregistratoren din (GoDaddy, Namecheap, Cloudflare osv.).

Legg til en av disse postene — CNAME foretrekkes:

| Type | Vert | Verdi |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Bruk **CNAME** for `www`-adressen din. Bruk **A-posten** hvis registratoren din ikke støtter CNAME på et rotdomene (uten www), eller hvis du vil at rotdomenet også skal fungere.

Endringer i DNS kan ta fra noen minutter til noen timer før de får effekt.

## Steg 2 — Legg til domenet i B1 {#step-2--add-the-domain-in-b1}

Når DNS peker til B1:

1. Gå til **Innstillinger** i B1 Admin.
2. Klikk på **Domener** i listen til venstre, og deretter på **Rediger** i delen **Domener**.
3. Skriv inn domenet ditt i feltet og klikk på **Lagre**.

Du trenger ikke klikke på **+**-knappen først -- et domene som står i feltet når du lagrer, legges til. Bruk **+** (eller trykk **Enter**) når du vil legge til flere domener i listen før du lagrer. Skriv bare inn selve domenet, for eksempel `www.yourchurch.org` -- ikke `https://` eller en sidesti.

Hvis menigheten din har mer enn ett nettsted, får hvert domene også en nedtrekksliste for **Nettsted**. La den stå på **Hovednettsted**, eller velg nettstedet domenet skal åpne.

For å fjerne et domene klikker du på slettikonet på raden og klikker på **Lagre**.

B1 håndterer SSL automatisk — du trenger ikke kjøpe noe sertifikat.

:::warning
B1 lagrer domenet selv om DNS-postene ikke er på plass ennå, men domenet vil ikke laste nettstedet ditt, og B1 kan ikke utstede SSL-sertifikatet, før DNS peker til B1. Sett opp DNS først. Et domene som en annen menighet allerede bruker, kan ikke legges til.
:::

## Sjekke at det fungerer {#checking-if-its-working}

Etter lagring besøker du domenet ditt i en nettleser. Hvis det laster B1-nettstedet ditt, er du ferdig. Hvis du ser en feilmelding, kan DNS fortsatt være under oppdatering — vent noen minutter og prøv igjen.

Du kan også sjekke DNS-oppdateringen på [dnschecker.org](https://dnschecker.org) — søk etter domenet ditt og se etter at CNAME- eller A-posten din dukker opp.

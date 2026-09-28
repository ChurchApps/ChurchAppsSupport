---
title: "Egendefinert domene"
---

# Egendefinert domene

<div class="article-intro">

Du kan peke ditt eget domene (for eksempel, **www.yourchurch.org**) til B1-nettstedet ditt slik at besøkende når det på kirkens virkelige nettadresse i stedet for standardadressen yourchurch.1.church.

</div>

## Steg 1 -- Legg til DNS-posten først

Før du legger til domenet i B1, må du peke det til B1s servere hos domeneleverandøren din (GoDaddy, Namecheap, Cloudflare, osv.).

Legg til en av disse postene -- CNAME er foretrukket:

| Type | Vert | Verdi |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Bruk **CNAME** for adressen din `www`. Bruk **A-posten** hvis domeneleverandøren din ikke støtter CNAME på et rotdomene (uten www), eller hvis du også vil at rotdomenet skal fungere.

DNS-endringer kan ta fra noen få minutter til noen timer før de trer i kraft.

## Steg 2 -- Legg til domenet i B1

Når DNS peker til B1:

1. Gå til **Innstillinger** i B1 Admin.
2. Klikk **Domener**.
3. Skriv inn domenet ditt i feltet og klikk **Lagre**.

B1 håndterer SSL automatisk -- ingen sertifikatkjøp nødvendig.

:::warning
Hvis du legger til domenet i B1 før DNS-postene dine er på plass, vil det ikke lagres. Sett alltid opp DNS først.
:::

## Kontrollering av om det fungerer

Etter lagring besøker du domenet ditt i en nettleser. Hvis det laster B1-nettstedet ditt, er du ferdig. Hvis du ser en feil, kan det være at DNS fremdeles forplanter seg -- vent noen få minutter og prøv igjen.

Du kan også kontrollere DNS-forplantning på [dnschecker.org](https://dnschecker.org) -- søk etter domenet ditt og se etter at CNAME- eller A-posten dukker opp.

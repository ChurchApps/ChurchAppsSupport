---
title: "Eget domene"
---

# Eget domene

<div class="article-intro">

Du kan peke ditt eget domene (for eksempel **www.yourchurch.org**) til B1-nettstedet ditt, slik at besøkende når det under kirkens faktiske webadresse i stedet for standardadressen yourchurch.b1.church.

</div>

## Steg 1 -- Legg til DNS-posten først

Før du legger til domenet ditt i B1, må du peke det til B1s servere hos domeneregistratoren din (GoDaddy, Namecheap, Cloudflare osv.).

Legg til en av disse postene. CNAME er foretrukket:

| Type | Vert | Verdi |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Bruk **CNAME** for din `www`-adresse. Bruk **A-posten** hvis registratoren din ikke støtter CNAME på et rotdomene (uten www), eller hvis du også vil at rotdomenet skal fungere.

Det kan ta noen minutter til et par timer før DNS-endringer trer i kraft.

## Steg 2 -- Legg til domenet i B1

Når DNS peker til B1:

1. Gå til **Innstillinger** i B1 Admin.
2. Klikk på **Domener** i den venstre listen, og klikk deretter på **Rediger** i delen **Domener**.
3. Skriv inn domenet ditt i feltet og klikk på **Lagre**.

Du trenger ikke å klikke på **+**-knappen først. Et domene som står skrevet i feltet, blir lagt til når du lagrer. Bruk **+** (eller trykk **Enter**) når du vil legge til flere domener i listen før du lagrer.

B1 håndterer SSL automatisk. Du trenger ikke å kjøpe et sertifikat.

:::warning
Hvis du legger til domenet i B1 før DNS-postene er på plass, lagres det ikke. Sett alltid opp DNS først.
:::

## Sjekke at det fungerer

Etter at du har lagret, besøk domenet ditt i en nettleser. Hvis det laster B1-nettstedet ditt, er du ferdig. Hvis du ser en feilmelding, kan DNS fortsatt være under spredning. Vent noen minutter og prøv igjen.

Du kan også sjekke DNS-spredningen på [dnschecker.org](https://dnschecker.org). Søk etter domenet ditt og se om CNAME- eller A-posten din vises.

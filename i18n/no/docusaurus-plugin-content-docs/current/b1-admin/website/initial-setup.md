---
title: "Førstegangsoppsett"
---

# Førstegangsoppsett

<div class="article-intro">

Hver B1-konto kommer med et nettsted klart til bruk. Denne guiden veileder deg gjennom oppsett av kirkens domene, konfigurering av nettstedets utseende, opprettelse av de første sidene og organisering av navigasjonen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en B1.church-konto med administratortilgang
- Hvis du bruker et egendefinert domene, ha innloggingsopplysningene til DNS-leverandøren din klare (f.eks. GoDaddy, Cloudflare eller AWS)
- Forbered kirkens logo i PNG-format med gjennomsiktig bakgrunn for best resultat

</div>

## Sette opp domenet ditt

Kirken din mottar automatisk et underdomene på B1.church (for eksempel `dinkirke.b1.church`). Du kan også peke ditt eget egendefinerte domene til B1-nettstedet ditt.

1. Gå til **B1.church Admin** ved å besøke admin.b1.church eller klikke på profilmenyen og velge **Bytt app**.
2. Klikk **Dashbord** i venstre sidefelt, og velg deretter **Innstillinger** fra nedtrekksmenyen.
3. Klikk **Administrer** for å se underdomenet ditt. Sett det til noe kort og gjenkjennelig uten mellomrom.
4. For å bruke et egendefinert domene, logg inn hos DNS-leverandøren din (som GoDaddy, Cloudflare eller AWS) og legg til to oppføringer:
   - En **A-oppføring** for rotdomenet som peker til `3.23.251.61`
   - En **CNAME-oppføring** for `www` som peker til `proxy.b1.church`
5. Gå tilbake til B1.church Admin, legg til det egendefinerte domenet i listen, og klikk **Legg til** og deretter **Lagre**. Nettstedet ditt vil være tilgjengelig fra det egendefinerte domenet innen noen minutter.

:::tip
Hvis du ikke ser Innstillinger-alternativet, be personen som opprettet kirkekontoen din om å gi deg tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](../settings/roles-permissions.md) for detaljer.
:::

## Opprette din første side

1. I B1 Admin, klikk **Nettsted** i venstre meny for å åpne visningen for nettsider.
2. Klikk **Legg til side** øverst til høyre.
3. Velg **Tom** som sidetype og gi den navnet «Hjem».
4. Klikk **Sideinnstillinger** og sett URL-banen til `/` (en skråstrek uten tekst) for hjemmesiden. Andre sider bruker `/sidenavn`.
5. Klikk **Rediger innhold** for å begynne å bygge. Hver side må begynne med en **Seksjon** -- dette er beholderen for alle andre elementer.
6. Etter å ha lagt til en seksjon, klikk **Legg til innhold** igjen for å sette inn tekst, bilder, videoer, kort, skjemaer og mer ved å dra dem inn i seksjonen.

:::info
For detaljerte instruksjoner om arbeid med sider, navigasjon og sidetyper, se [Administrere sider](managing-pages).
:::

## Konfigurere nettstedets utseende

1. Fra visningen for nettsider, klikk fanen **Utseende** øverst.
2. Bruk **Fargepaletten** til å angi merkefargene dine for primær-, sekundær- og aksenttoner.
3. Under **Typografiinnstillinger**, velg skrifttyper for overskrifter og brødtekst fra skrifttypeutforskeren.
4. Last opp kirkens logo under **Logo** i stilinnstillingene. Oppgi både en versjon for lys bakgrunn og en for mørk bakgrunn.
5. Konfigurer **Bunnteksten** med kirkens kontaktinformasjon og lenker.

:::info
Endringer du gjør i Utseende brukes på hele nettstedet. Se [Utseende](appearance)-siden for detaljerte instruksjoner for hver innstilling.
:::

## Sette opp navigasjon

Navigasjonslenkene dine vises i venstre sidefelt i visningen for nettsider. For å organisere dem:

1. Klikk **Legg til** for å opprette en ny navigasjonslenke og pek den til en av sidene dine.
2. Dra og slipp lenker for å omorganisere dem eller legge dem under overordnede elementer.
3. Forhåndsvis nettstedet for å bekrefte at navigasjonen ser riktig ut.

## Neste steg

- [Administrere sider](managing-pages) -- Lær hvordan du jobber med sider og navigasjon i detalj
- [Utseende](appearance) -- Finjuster nettstedets farger, skrifttyper og oppsett
- [Filer](files) -- Last opp bilder og dokumenter for nettstedet ditt

---
title: "Startoppsett"
---

# Startoppsett

<div class="article-intro">

Hver B1-konto kommer med et nettsted klart til bruk. Denne guiden gjennomgår oppsett av kirkadomenen din, konfigurering av nettsideens utseende, opprettelse av de første sidene dine og organisering av navigasjonen din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en B1.church-konto med administratorrettigheter
- Hvis du bruker et egendefinert domene, ha påloggingsinformasjonen for DNS-leverandøren klar (f.eks. GoDaddy, Cloudflare eller AWS)
- Forbered kirkalogoen din i PNG-format med transparent bakgrunn for best resultat

</div>

## Konfigurer domenet ditt

Kirken din mottar automatisk et underdomene på B1.church (for eksempel `yourchurch.b1.church`). Du kan også peke ditt eget egendefinerte domene til B1-nettstedet ditt.

1. Gå til **B1.church Admin** ved å besøke admin.b1.church eller klikke profilrullegardinen og velge **Bytt app**.
2. Åpne **seksjonsmenyen** i det øvre venstre hjørnet (seksjonsnavnet med liten pil) og velg **Innstillinger**.
3. Klikk **Administrer** for å vise underdomenet ditt. Sett det til noe kort og gjenkjennelig uten mellomrom.
4. Hvis du vil bruke et egendefinert domene, logger du inn på DNS-leverandøren din (som GoDaddy, Cloudflare eller AWS) og legger til to poster:
   - En **A-post** for rotdomenet ditt peker på `3.23.251.61`
   - En **CNAME-post** for `www` peker på `proxy.b1.church`
5. Gå tilbake til B1.church Admin, legg til det egendefinerte domenet ditt i listen, og klikk **Legg til** og deretter **Lagre**. Nettstedet ditt vil være tilgjengelig fra det egendefinerte domenet innen få minutter.

:::tip
Hvis du ikke ser Innstillinger-alternativet, ber du personen som konfigurerte kirkaen din om å gi deg tillatelsen "Rediger kirkeinnstillinger". Se [Roller & rettigheter](../settings/roles-permissions.md) for detaljer.
:::

## Opprett den første siden din

1. I B1 Admin klikker du **Nettsted** i menyen til venstre for å åpne Nettsideperspektivet.
2. Klikk **Legg til side** i det øvre høyre hjørnet.
3. Velg **Tomt** som sidetype og navngi det "Hjem."
4. Klikk **Sideinnstillinger** og sett URL-banen til `/` (en fremover skråstrek uten tekst) for hjemmesiden. Andre sider bruker `/page-name`.
5. Klikk **Rediger innhold** for å begynne å bygge. Hver side må begynne med en **Seksjon** -- dette er beholderen for alle andre elementer.
6. Etter å ha lagt til en seksjon, klikk **Legg til innhold** igjen for å sette inn tekst, bilder, videoer, kort, skjemaer og mer ved å dra dem inn i seksjonen.

:::info
For detaljerte instruksjoner om arbeid med sider og navigasjon, se [Administrer sider](managing-pages). For en fullstendig guide til det visuelle editoren, se [Bruk sideeditor](page-editor).
:::

## Konfigurer utseendet på nettstedet

1. Fra Nettsideperspektivet, klikk **Utseende**-fanen øverst.
2. Bruk **Fargepaletten** for å angi merkevarfargene for primær, sekundær og aksent-toner.
3. Under **Typografiinnstillinger**, velg overskrift- og brødtekstskrifttyper fra skrifttypen.
4. Last opp kirkalogoen under **Logo** i Stilinnstillinger. Gi både en lys bakgrunn og mørk bakgrunnsversjon.
5. Konfigurer **Nettsidefoter** med kirkens kontaktinformasjon og lenker.

:::info
Endringer du gjør i Utseende gjelder hele nettstedet ditt. Se siden [Utseende](appearance) for detaljerte instruksjoner om hver innstilling.
:::

## Konfigurer navigasjon

Navigasjonslenkene dine vises i Nettsideperspektivet. For å organisere dem:

1. Klikk **Legg til** for å opprette en ny navigasjonslenke og pek den til en av sidene dine.
2. Dra og slipp lenker for å sortere dem eller neste dem under overordnede elementer.
3. Forhåndsvis nettstedet ditt for å bekreftet at navigasjonen ser riktig ut.

## Neste trinn

- [Administrer sider](managing-pages) -- Lær hvordan du arbeider med sider og navigasjon i detalj
- [Utseende](appearance) -- Finjuster farger, skrifter og layout på nettstedet ditt
- [Filer](files) -- Last opp bilder og dokumenter for nettstedet ditt

---
title: "Administrere sider"
---

# Administrere sider

<div class="article-intro">

Visningen Nettstedsider er din sentrale plattform for å opprette, redigere og organisere alle sidene på kirkens nettsted. Du kan administrere både sideinnholdet og nettstedets navigasjon fra denne ene skjermen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Førstegangsoppsett](initial-setup) for å konfigurere domenet ditt og grunnleggende nettstedsinnstillinger
- Ha innholdet og bildene dine klare. Bruk [Filer](files)-behandleren til å laste opp mediaressurser først.

</div>

:::info
Hvis kirken din har mer enn ett nettsted (for eksempel separate nettsteder per lokasjon), bruker du nettstedbryteren øverst i visningen Nettstedsider for å hoppe mellom dem. Hvert nettsted har sine egne sider, sin egen navigasjon og sine egne [utseende](appearance)-innstillinger.
:::

## Forstå sidetyper

Tabellen **Sider** viser alle sidene på nettstedet ditt sammen med statusen deres:

- **Generert** -- Sider som ble automatisk opprettet av systemet basert på kirkens data (for eksempel en Grupper-side, en Prekener-side, eller en individuell side for hver preken i biblioteket ditt). Disse sidene oppdaterer seg selv etter hvert som dataene dine endres.
- **Egendefinert** -- Sider som du selv har opprettet med eget innhold og layout.

Du kan konvertere en hvilken som helst automatisk generert side til en egendefinert side hvis du ønsker full kontroll over innholdet og designet.

## Legge til og redigere sider

1. Klikk på **Legg til side**-knappen øverst til høyre i tabellen Sider.
2. Velg en sidetype (blank eller en mal) og gi den et navn.
3. Klikk **Rediger** ved siden av en hvilken som helst side for å åpne [sideredigeringsprogrammet](page-editor), der du kan legge til seksjoner, tekst, bilder og andre elementer.
4. Klikk **Sideinnstillinger** for å oppdatere sidetittelen, URL-stien og annen metadata.
5. Bruk **Forhåndsvisning**-knappen for å åpne siden din i et nytt vindu og se nøyaktig hvordan den vil se ut for besøkende.

:::tip
For hjemmesiden din setter du URL-stien til bare `/`. For alle andre sider bruker du en beskrivende sti som `/om-oss` eller `/kontakt`.
:::

### Sideinnstillinger

Åpne **Sideinnstillinger** på en hvilken som helst side for å konfigurere:

- **Tittel og URL-sti** -- Sidens navn og adressen på nettstedet ditt.
- **Synlighet** -- Velg hvem som kan se siden: alle, kun medlemmer, kun ansatte, eller medlemmer av bestemte grupper. Dette er en rask måte å begrense en privat side (som en ressursside for ansatte) uten et separat passord.
- **Metabeskrivelse** -- Et kort sammendrag som vises i søkemotorresultater og forhåndsvisninger av lenker i sosiale medier.
- **Omdirigeringer** -- Peker en gammel URL-sti til denne siden, slik at lenker og bokmerker til en avviklet side fortsatt fungerer.

## Administrere navigasjon

Venstre sidefelt i visningen Nettstedsider viser navigasjonslenkene dine. Disse lenkene styrer menyen som besøkende ser på nettstedet ditt.

1. Klikk **Legg til** for å opprette en ny navigasjonslenke. Du kan peke den til en hvilken som helst side på nettstedet ditt eller til en ekstern URL.
2. For å endre rekkefølgen på lenker drar og slipper du dem i den rekkefølgen du ønsker. Du kan også neste lenker under et overordnet element for å lage nedtrekksmenyer.
3. Klikk på **Rediger**-ikonet ved siden av en hvilken som helst lenke for å endre etiketten, URL-en eller posisjonen dens.
4. For å fjerne en lenke fra navigasjonen klikker du på **Slett**-ikonet.

:::info
Å fjerne en navigasjonslenke sletter ikke selve siden. Siden finnes fortsatt og kan nås direkte via URL-en sin -- den vises rett og slett ikke i menyen.
:::

## Tips for å organisere nettstedet ditt

- Hold toppnivå-navigasjonen til fem eller seks elementer, slik at besøkende raskt finner det de leter etter.
- Bruk nestede lenker for relaterte undersider (for eksempel en «Om oss»-nedtrekksmeny med «Vårt team», «Tro» og «Historie»).
- Se over navigasjonen på mobil ved å klikke **Mobilforhåndsvisning** for å sikre at den fungerer godt på mindre skjermer.
- Gi sidene klare, beskrivende navn som hjelper besøkende å forstå hva de vil finne.

:::tip
Du kan legge til [skjemaer](../forms/creating-forms.md) på sidene dine for å samle inn registreringer, bønneemner eller annen informasjon fra besøkende.
:::

## Starte fra en nettstedmal

Hvis du bygger nettstedet ditt fra bunnen av, kan du starte det opp med en **nettstedmal** i stedet for å opprette sider én om gangen. En nettstedmal oppretter et sett med ferdigbygde sider — hjem, om oss, bli med, gi, og andre — med plassholderinnhold og navigasjonslenker allerede koblet til.

1. På sideskjermen klikker du på **Nettstedmaler**-knappen (ved siden av **Legg til side**-knappen).
2. Bla gjennom de tilgjengelige malene og klikk på én for å forhåndsvise sidestrukturen.
3. Når du finner en du liker, klikker du **Bruk mal**.
4. Sider som ikke allerede finnes, opprettes og legges til i navigasjonen din. Eksisterende sider forblir uendret.

Etter at du har brukt en mal, åpner du hver side i [sideredigeringsprogrammet](page-editor) for å erstatte plassholdertekst og -bilder med kirkens virkelige innhold.

:::info
Nettstedmaler oppretter sidestruktur og navigasjon. De overstyrer ikke nettstedets fargeskjema eller skrifttyper — disse styres av [Utseende](appearance).
:::

## Bildevisning i lysboks

Når besøkende klikker på et bilde på nettstedet ditt, åpnes det i et fullskjerms lysboksoverlegg. Dette lar folk se bilder i større størrelse uten å forlate siden. Ingen konfigurasjon er nødvendig — lysboksen aktiveres automatisk for bilder i sideinnholdet ditt.

## Neste steg

- [Førstegangsoppsett](initial-setup) -- Instruksjoner for førstegangsoppsett
- [Bruke sideredigeringsprogrammet](page-editor) -- Lær hvordan du bygger og stiler sideinnhold
- [Utseende](appearance) -- Tilpass nettstedets visuelle tema
- [Filer](files) -- Last opp og administrer mediaressurser for sidene dine

---
title: "Administrer sider"
---

# Administrer sider

<div class="article-intro">

Nettsideperspektivet er senteret ditt for å opprette, redigere og organisere alle sidene på kirkens nettsted. Du kan administrere både sideinnholdet og navigasjonen på nettstedet ditt fra denne enkeltskjermen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Startoppsett](initial-setup) for å konfigurere domenet og grunnleggende nettstedsinnstillinger
- Ha innholdet og bildene dine klare. Bruk [Filer](files)-lederen til å laste opp medieobjekter først.

</div>

:::info
Hvis kirken din har mer enn ett nettsted (for eksempel separate steder per filial), bruker du nettstedsvelgeren øverst i Nettsideperspektivet for å hoppe mellom dem. Hvert nettsted har sine egne sider, navigasjon og [utseende](appearance)-innstillinger.
:::

## Forstå sidetyper

**Sider**-tabellen viser hver side på nettstedet ditt sammen med statusen:

- **Generert** -- Sider som ble automatisk opprettet av systemet basert på kirkens data (for eksempel en Gruppesside, en Predikenersiden eller en individuell side for hver preken i biblioteket ditt). Disse sidene oppdaterer seg selv når dataene dine endres.
- **Egendefinert** -- Sider som du opprettet selv med ditt eget innhold og layout.

Du kan konvertere en hvilken som helst autogenerert side til en egendefinert side hvis du vil ha full kontroll over innholdet og designet.

## Legg til og rediger sider

1. Klikk **Legg til side**-knappen i det øvre høyre hjørnet av Sider-tabellen.
2. Velg en sidetype (tom eller mal) og gi det et navn.
3. Klikk **Rediger** ved siden av en hvilken som helst side for å åpne [sideeditoren](page-editor), hvor du kan legge til seksjoner, tekst, bilder og andre elementer.
4. Klikk **Sideinnstillinger** for å oppdatere sidetittel, URL-bane og andre metadata.
5. Bruk **Forhåndsvis**-knappen for å åpne siden i et nytt vindu og se nøyaktig hvordan det vil se ut for besøkende.

:::tip
For hjemmesiden, sett URL-banen til bare `/`. For alle andre sider bruker du en beskrivende bane som `/about` eller `/contact`.
:::

### Sideinnstillinger

Åpne **Sideinnstillinger** på en hvilken som helst side for å konfigurere:

- **Tittel og URL-bane** -- Sidenavnet og dets adresse på nettstedet ditt.
- **Synlighet** -- Velg hvem som kan se siden: alle, bare medlemmer, bare ansatte eller medlemmer av spesifikke grupper. Dette er en rask måte å gate en privat side (som en ansattrissursside) uten et eget passord.
- **Metabeskrivelse** -- En kort oppsummering som vises i søkemotorresultater og forhåndsvisninger av sosiale medier.
- **Omdirigeringer** -- Pek en gammel URL-bane til denne siden, så lenker og bokmerker til en pensjonert side fortsetter å fungere.

## Administrer navigasjon

Nettsideperspektivet viser navigasjonslenkene dine. Disse lenkene kontrollerer menyen som besøkende ser på nettstedet ditt.

1. Klikk **Legg til** for å opprette en ny navigasjonslenke. Du kan peke den til en hvilken som helst side på nettstedet ditt eller til en ekstern URL.
2. For å sortere lenker, dra og slipp dem inn i den rekkefølgen du ønsker. Du kan også neste lenker under et overordnet element for å lage rullegardinmenyer.
3. Klikk **Rediger**-ikonet ved siden av en hvilken som helst lenke for å endre etiketten, URL-en eller posisjonen.
4. For å fjerne en lenke fra navigasjonen, klikk **Slett**-ikonet.

:::info
Fjerning av en navigasjonslenke sletter ikke siden selv. Siden fortsatt å eksistere og kan nås direkte via dens URL -- den vil simpelthen ikke vises i menyen.
:::

## Tips for å organisere nettstedet ditt

- Hold toppnivånavigasjonen din til fem eller seks elementer slik besøkende raskt kan finne ting.
- Bruk nestede lenker for relaterte undersider (for eksempel en "Om"-rullegardin med "Teamet vårt," "Oppfatninger," og "Historie").
- Gjennomgå navigasjonen din på mobiltelefon ved å klikke **Mobil forhåndsvisning** for å sikre at det fungerer bra på mindre skjermer.
- Gi sidene klare, beskrivende navn som hjelper besøkende med å forstå hva de vil finne.

:::tip
Du kan legge til [skjemaer](../forms/creating-forms.md) på sidene dine for å samle påmeldinger, bønneforespørsler eller annen informasjon fra besøkende.
:::

## Start fra en nettstedsmal

Hvis du bygger nettstedet fra bunnen av, kan du bootstrap det ved å bruke en **Nettstedmal** i stedet for å opprette sider en av gangen. En nettstedmal lager et sett med forhåndsoppbygde sider -- hjem, om, koble til, gi, og andre -- med plassholderskjemaer og navigasjonslenker allerede tilkoblet.

1. På Sider-skjermen, klikk **Nettstedmaler**-knappen (ved siden av **Legg til side**-knappen).
2. Bla gjennom tilgjengelige maler og klikk en for å forhåndsvise sidens struktur.
3. Når du finner en du liker, klikk **Bruk mal**.
4. Sider som ikke allerede eksisterer, opprettes og legges til i navigasjonen. Eksisterende sider blir igjen som de er.

Etter å ha brukt en mal, åpner du hver side i [sideeditoren](page-editor) for å erstatte plassholderteksten og bildene med kirkaens virkelige innhold.

:::info
Nettstedmaler lager sidestruktur og navigasjon. De overstyrer ikke fargeordningen eller skrifttypene på nettstedet -- disse styres av [Utseende](appearance).
:::

## Bildelightbox

Når besøkende klikker på et bilde på nettstedet ditt, åpnes det i en full-skjerm lightbox-overlegg. Dette lar mennesker se fotos i større størrelse uten å forlate siden. Ingen konfigurering kreves -- lightboksen er aktivert automatisk for bilder i sideinnholdet ditt.

## Neste trinn

- [Startoppsett](initial-setup) -- Første gangs oppsetsinstruksjoner
- [Bruk sideeditor](page-editor) -- Lær hvordan du bygger og utformer sideinnhold
- [Utseende](appearance) -- Tilpass det visuelle temaet på nettstedet ditt
- [Filer](files) -- Last opp og administrer medieobjekter for sidene dine

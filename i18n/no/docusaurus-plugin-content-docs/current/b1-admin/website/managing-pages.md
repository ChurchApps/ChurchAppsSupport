---
title: "Administrering av sider"
---

# Administrering av sider

<div class="article-intro">

Nettsideperspektivet er senteret ditt for å opprette, redigere og organisere alle sidene på kirkens nettsted. Du kan administrere både sideinnholdet og nettstedets navigasjon fra denne enkeltskjermen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Initialoppsett](initial-setup) for å konfigurere domenet og grunnleggende nettstedsinnstillinger
- Ha innholdet og bildene dine klare. Bruk [Filer](files)-lederen til å laste opp medieobjekter først.

</div>

:::info
Hvis kirken din har mer enn ett nettsted (for eksempel separate steder per campus), bruker du nettstedsvelgeren øverst i Nettsideperspektivet for å hoppe mellom dem. Hvert nettsted har sine egne sider, navigasjon og [utseende](appearance)-innstillinger.
:::

## Forståelse av sidetyper

**Sider**-tabellen viser hver side på nettstedet ditt sammen med statusen:

- **Generert** -- Sider som ble automatisk opprettet av systemet basert på kirkens data (for eksempel en Grupper-side, en Prekener-side eller en individuell side for hver preken i biblioteket). Disse sidene oppdaterer seg selv når dataene dine endres.
- **Egendefinert** -- Sider som du opprettet selv med ditt eget innhold og layout.

Du kan konvertere en hvilken som helst autogenerert side til en egendefinert side hvis du vil ha full kontroll over innholdet og designet.

## Legge til og redigering av sider

1. Klikk **Legg til side**-knappen i øvre høyre hjørne av Sider-tabellen.
2. Velg en sidetype (blank eller mal) og gi den et navn.
3. Klikk **Rediger innhold** ved siden av en hvilken som helst side for å åpne [sideeditoren](page-editor), hvor du kan legge til seksjoner, tekst, bilder og andre elementer.
4. Klikk **Sideinnstillinger** (tandhjulikonet) for å oppdatere sidetittel, URL-bane og andre metadata.
5. Bruk **Vis live-side**-knappen for å åpne siden i et nytt vindu og se nøyaktig hvordan det vil se ut for besøkende.

:::tip
For hjemmesiden, sett URL-banen til bare `/`. For alle andre sider bruker du en beskrivende bane som `/about` eller `/contact`.
:::

### Sideinnstillinger

Åpne **Sideinnstillinger** på en hvilken som helst side for å konfigurere:

- **Tittel og URL-bane** -- Sidenavnet og dets adresse på nettstedet.
- **Synlighet** -- Velg hvem som kan se siden: alle, bare medlemmer, bare ansatte, eller medlemmer av spesifikke grupper. Dette er en rask måte å gate en privat side (som en ansattsressurs-side) uten et eget passord.
- **Meta-beskrivelse** -- En kort oppsummering som vises i søkemotorresultater og forhåndsvisninger av sosiale medier.
- **Omdirigeringer** -- Pek en gammel URL-bane til denne siden, så lenker og bokmerker til en pensjonert side fortsetter å fungere.

## Administrering av navigasjon

Nettsideperspektivet viser navigasjonslenkene dine. Disse lenkene kontrollerer menyen som besøkende ser på nettstedet.

1. Klikk **Legg til** for å opprette en ny navigasjonslenke. Du kan peke den til en hvilken som helst side på nettstedet eller til en ekstern URL.
2. For å sortere lenker, dra og slipp dem inn i den rekkefølgen du ønsker. Du kan også neste lenker under et overordnet element for å lage rullegardinmenyer.
3. Klikk **Rediger**-ikonet ved siden av en hvilken som helst lenke for å endre etiketten, URL-en eller posisjonen.
4. For å fjerne en lenke fra navigasjonen, klikk **Slett**-ikonet.

:::info
Fjerning av en navigasjonslenke sletter ikke siden selv. Siden fortsetter å eksistere og kan nås direkte via dens URL -- den vil ganske enkelt ikke vises i menyen.
:::

## Sideomfattende bryteknapper

Over **Hovednavigasjon** på venstre side av Nettsideperspektivet er det to bryteknapper som gjelder for hele kirkens nettsted:

- **Vis pålogging** -- Viser en **Pålogging**-knapp i nettstedets navigasjonslinje.
- **Deaktiver offentlig nettsted** -- Slår av ditt offentlige nettsted. Bruk det hvis kirken bruker B1 bare for medlemsportalen, giving og registreringer, og holder hovednettstedet sitt et annet sted.

### Hva det gjør å deaktivere det offentlige nettstedet

Når **Deaktiver offentlig nettsted** er på:

- Hver offentlig side, inkludert hjemmesiden og de tilpassede sidene, sender besøkende til påloggingsskjermen.
- De innebygde **Genererte** sidene (som Grupper og Prekener) blir ikke lenger served og vises ikke lenger i Sider-tabellen.
- Nettstedshuvudet viser bare **Pålogging**-knappen, uten navigasjonslenker.
- Søkemotorer blir fortalt ikke å indeksere nettstedet. Sitemap er tomt og `robots.txt` blokkerer all crawling.

Disse lenkene fortsetter å fungere, slik at medlemmer og gjester fremdeles kan nå dem:

- Pålogging og utlogging
- Medlemsportalen (alt under `/mobile`)
- [Hendelsesregistrering](../guides/event-registration.md)-lenker og gjestregistrering

En advarsel vises under bryteren mens det offentlige nettstedet er av. Slå bryteren av igjen for å få sidene tilbake. Ingenting slettes mens nettstedet er deaktivert.

:::info
Denne innstillingen gjelder hele kirken. Hvis du har mer enn ett nettsted, slår den av alle, ikke bare det som er valgt i nettstedsvelgeren.
:::

## Tips for organisering av nettstedet

- Hold toppnivånavigasjonen til fem eller seks elementer slik besøkende raskt kan finne ting.
- Bruk nestede lenker for relaterte undersider (for eksempel en "Om"-rullegardin med "Teamet vårt," "Oppfatninger" og "Historie").
- Gjennomgå navigasjonen på mobil ved å klikke **Mobil forhåndsvisning** for å sikre at det fungerer bra på mindre skjermer.
- Gi sidene klare, beskrivende navn som hjelper besøkende med å forstå hva de finner.

:::tip
Du kan legge til [skjemaer](../forms/creating-forms.md) på sidene dine for å samle påmeldinger, bønneforespørsler eller annen informasjon fra besøkende.
:::

## Start fra en nettstedsmal

Hvis du bygger nettstedet fra bunnen av, kan du bootstrape det ved å bruke en **Nettstedmal** i stedet for å opprette sider en etter en. En nettstedmal lager et sett med forhåndsbyggede sider -- hjem, om, koble til, gi og andre -- med placeholder-innhold og navigasjonslenker allerede tilkoblet.

1. På siden Sider klikker du **Nettstedsmaler**-knappen (ved siden av **Legg til side**-knappen).
2. Bla gjennom tilgjengelige maler og klikk en for å forhåndsvise sidestrukturen.
3. Når du finner en du liker, klikk **Bruk mal**.
4. Sider som ikke allerede eksisterer, opprettes og legges til i navigasjonen. Eksisterende sider blir igjen som de er.

Etter å ha brukt en mal, åpner du hver side i [sideeditoren](page-editor) for å erstatte placeholder-teksten og bildene med kirkens virkelige innhold.

:::info
Nettstedsmaler oppretter sidestruktur og navigasjon. De overstyrer ikke fargeskjemaet eller skrifttypene på nettstedet -- disse styres av [Utseende](appearance).
:::

## Bildelightbox

Når besøkende klikker på et bilde på nettstedet, åpnes det i en fullskjerms lightbox-overlay. Dette lar personer vise bilder i større størrelse uten å forlate siden. Ingen konfigurering er nødvendig -- lightbox-en er aktivert automatisk for bilder i sideinnholdet.

## Neste steg

- [Initialoppsett](initial-setup) -- Instruksjoner for første gangs oppsett
- [Bruk av sideeditoren](page-editor) -- Lær hvordan du bygger og utformer sideinnhold
- [Utseende](appearance) -- Tilpass det visuelle temaet på nettstedet
- [Filer](files) -- Last opp og administrer medieobjekter for sidene

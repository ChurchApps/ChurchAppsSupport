---
title: "Administrere sider"
---

# Administrere sider

<div class="article-intro">

Visningen Nettstedssider er det sentrale stedet for å opprette, redigere og organisere alle sidene på kirkens nettsted. Du kan administrere både sideinnholdet og navigasjonen fra denne ene skjermen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](initial-setup) for å konfigurere domenet og de grunnleggende nettstedsinnstillingene
- Ha innhold og bilder klare. Last opp mediefilene først i [Filer](files)-behandleren.

</div>

:::info
Hvis kirken har mer enn ett nettsted (for eksempel egne nettsteder for hver menighet), bruker du nettstedsvelgeren øverst i visningen Nettstedssider for å bytte mellom dem. Hvert nettsted har sine egne sider, sin egen navigasjon og egne [utseende](appearance)-innstillinger.
:::

## Forstå sidetyper

Tabellen **Sider** viser alle sidene på nettstedet sammen med status:

- **Generert** -- Sider som systemet har opprettet automatisk ut fra kirkens data (for eksempel en gruppeside, en preken-side eller en egen side for hver preken i biblioteket). Disse sidene oppdaterer seg selv når dataene endres.
- **Egendefinert** -- Sider du har opprettet selv med eget innhold og eget oppsett.

Du kan gjøre om en hvilken som helst automatisk generert side til en egendefinert side hvis du vil ha full kontroll over innhold og design.

## Legge til og redigere sider

1. Klikk på knappen **Legg til side** øverst til høyre i tabellen Sider.
2. Velg en sidetype (tom eller en mal) og gi siden et navn.
3. Klikk på **Rediger innhold** ved siden av en side for å åpne [sideredigeringen](page-editor), der du kan legge til seksjoner, tekst, bilder og andre elementer.
4. Klikk på **Sideinnstillinger** (tannhjulikonet) for å oppdatere sidetittel, URL-bane og andre metadata.
5. Bruk knappen **Vis live side** for å åpne siden i et nytt vindu og se nøyaktig hvordan den ser ut for besøkende.

:::tip
For hjemmesiden setter du URL-banen til bare `/`. For alle andre sider bruker du en beskrivende bane som `/about` eller `/contact`.
:::

### Sideinnstillinger

Åpne **Sideinnstillinger** på en side for å angi:

- **Tittel og URL-bane** -- Sidens navn og adressen på nettstedet.
- **Synlighet** -- Velg hvem som kan se siden: alle, bare medlemmer, bare ansatte eller medlemmer av bestemte grupper. Dette er en enkel måte å skjerme en privat side (for eksempel en ressursside for ansatte) uten et eget passord.
- **Metabeskrivelse** -- Et kort sammendrag som vises i søkeresultater og i lenkeforhåndsvisninger på sosiale medier.
- **Omdirigeringer** -- La en gammel URL-bane peke til denne siden, slik at lenker og bokmerker til en nedlagt side fortsetter å fungere.

## Administrere navigasjon

Visningen Nettstedssider viser navigasjonslenkene dine. Disse lenkene styrer menyen besøkende ser på nettstedet.

1. Klikk på **Legg til** for å opprette en ny navigasjonslenke. Den kan peke til en hvilken som helst side på nettstedet eller til en ekstern URL.
2. Dra og slipp lenkene i ønsket rekkefølge for å endre rekkefølgen. Du kan også legge lenker under et overordnet element for å lage nedtrekksmenyer.
3. Klikk på ikonet **Rediger** ved siden av en lenke for å endre navn, URL eller plassering.
4. Klikk på ikonet **Slett** for å fjerne en lenke fra navigasjonen.

:::info
Når du fjerner en navigasjonslenke, slettes ikke selve siden. Siden finnes fortsatt og kan nås direkte med URL-en -- den vises bare ikke i menyen.
:::

## Bryterne for hele nettstedet

Over **Hovednavigasjon** på venstre side av visningen Nettstedssider finner du to brytere som gjelder hele kirkens nettsted:

- **Vis innlogging** -- Viser en **Logg inn**-knapp i nettstedets navigasjonslinje.
- **Deaktiver offentlig nettsted** -- Slår av det offentlige nettstedet. Bruk den hvis kirken bare bruker B1 til medlemsportalen, giving og påmeldinger, og har hovednettstedet et annet sted.

### Hva det betyr å deaktivere det offentlige nettstedet

Når **Deaktiver offentlig nettsted** er slått på:

- Alle offentlige sider, inkludert hjemmesiden og de egendefinerte sidene, sender besøkende som ikke er innlogget, til innloggingsskjermen. Etter innlogging kommer de tilbake til siden de ba om.
- Innloggede medlemmer ser hele nettstedet som vanlig, inkludert navigasjonen og de innebygde **genererte** sidene (som Grupper og Prekener). Genererte sider vises ikke lenger i tabellen Sider.
- Søkemotorer får beskjed om ikke å indeksere nettstedet. Områdekartet er tomt, og `robots.txt` blokkerer all gjennomsøking.

Disse lenkene fungerer fortsatt, slik at medlemmer og gjester kan nå dem:

- Innlogging og utlogging
- Medlemsportalen (alt under `/mobile`)
- Lenker til [arrangementspåmelding](../guides/event-registration.md) og gjestepåmelding

Det vises en advarsel under bryteren så lenge det offentlige nettstedet er slått av. Slå bryteren av igjen for å få sidene tilbake. Ingenting slettes mens nettstedet er deaktivert.

:::info
Denne innstillingen gjelder hele kirken. Hvis du har mer enn ett nettsted, slås alle av, ikke bare det som er valgt i nettstedsvelgeren.
:::

## Tips for å organisere nettstedet

- Hold hovednavigasjonen til fem eller seks elementer, slik at besøkende raskt finner frem.
- Bruk nøstede lenker for relaterte undersider (for eksempel en nedtrekksmeny «Om oss» med «Teamet vårt», «Tro» og «Historie»).
- Sjekk navigasjonen på mobil ved å klikke på **Mobilforhåndsvisning**, så du ser at den fungerer godt på mindre skjermer.
- Gi sidene klare, beskrivende navn som hjelper besøkende å forstå hva de finner.

:::tip
Du kan legge til [skjemaer](../forms/creating-forms.md) på sidene for å samle inn påmeldinger, forbønnsemner eller annen informasjon fra besøkende.
:::

## Starte fra en nettstedsmal

Hvis du bygger nettstedet fra grunnen av, kan du komme raskt i gang med en **nettstedsmal** i stedet for å opprette sider én og én. En nettstedsmal oppretter et sett ferdige sider -- hjem, om oss, kontakt, gi og flere -- med plassholderinnhold og navigasjonslenker som allerede er koblet sammen.

1. På skjermen Sider klikker du på knappen **Nettstedsmaler** (ved siden av knappen **Legg til side**).
2. Bla gjennom tilgjengelige maler og klikk på en for å forhåndsvise sidestrukturen.
3. Når du har funnet en du liker, klikker du på **Bruk mal**.
4. Sider som ikke finnes fra før, opprettes og legges til i navigasjonen. Eksisterende sider blir stående som de er.

Etter at du har brukt en mal, åpner du hver side i [sideredigeringen](page-editor) og erstatter plassholdertekst og -bilder med kirkens egentlige innhold.

:::info
Nettstedsmaler oppretter sidestruktur og navigasjon. De overstyrer ikke nettstedets fargevalg eller skrifttyper -- de styres av [Utseende](appearance).
:::

## Bildelysboks

Når besøkende klikker på et bilde på nettstedet, åpnes det i en lysboks over hele skjermen. Da kan folk se bilder i større format uten å forlate siden. Ingen konfigurasjon er nødvendig -- lysboksen er automatisk slått på for bilder i sideinnholdet.

## Neste steg

- [Førstegangsoppsett](initial-setup) -- Veiledning for første gangs oppsett
- [Bruke sideredigeringen](page-editor) -- Lær hvordan du bygger og stiler sideinnhold
- [Utseende](appearance) -- Tilpass nettstedets visuelle tema
- [Filer](files) -- Last opp og administrer mediefiler til sidene

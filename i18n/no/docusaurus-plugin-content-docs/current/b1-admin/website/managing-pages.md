---
title: "Administrere sider"
description: "Lag, rediger og organiser sider og navigasjon i visningen Nettsidesider i B1 Admin, inkludert sideinnstillinger, omdirigeringer og nettstedmaler."
---

# Administrere sider

<div class="article-intro">

Visningen Nettsidesider er din sentrale plass for å lage, redigere og organisere alle sidene på menighetens nettside. Du kan administrere både sideinnholdet og nettstedets navigasjon fra dette ene skjermbildet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](./initial-setup.md) for å konfigurere domenet og de grunnleggende innstillingene for nettstedet
- Ha innholdet og bildene dine klare. Bruk [Filer](./files.md) til å laste opp mediefiler først.
- Bruk en datamaskin eller et nettbrett. Visningen Nettsidesider og sideeditoren trenger en skjerm som er minst rundt 880 piksler bred; på telefon ser du en melding som ber deg bytte til en større skjerm.

</div>

:::info
Hvis menigheten din har mer enn ett nettsted (for eksempel egne nettsteder per menighetsenhet), bruker du nettstedvelgeren øverst i visningen Nettsidesider for å hoppe mellom dem. Hvert nettsted har sine egne sider, navigasjon og innstillinger for [utseende](./appearance.md). Se [Flere nettsteder](#multiple-websites) nedenfor.
:::

## Forstå sidetyper {#understanding-page-types}

Tabellen **Sider** lister alle sidene på nettstedet ditt etter **sti** og **tittel**. Det finnes to typer sider:

- **Generert** -- Sider som systemet har laget automatisk basert på menighetens data (for eksempel en side for grupper, en side for prekener, eller en individuell side for hver preken i biblioteket ditt). Disse sidene har et merke **Generert** og oppdaterer seg selv etter hvert som dataene dine endres.
- **Egendefinert** -- Sider du har laget selv, med ditt eget innhold og oppsett.

Du kan gjøre om en hvilken som helst automatisk generert side til en egendefinert side hvis du vil ha full kontroll over innholdet og designet. Klikk på **Konverter** ved siden av den genererte siden og klikk på **Bekreft**. Dialogen **Ny side** åpnes; gi siden en tittel og klikk på **Lagre**. Den nye egendefinerte siden overtar den genererte sidens sti, og du kan deretter bygge den i [sideeditoren](./page-editor.md).

## Legge til og redigere sider {#adding-and-editing-pages}

1. Klikk på knappen **Legg til side** øverst til høyre i visningen Nettsidesider.
2. Velg en sidetype og skriv inn en **sidetittel**, og klikk deretter på **Lagre**. **Tom** starter en tom side; **Preken**, **Om oss**, **Gave** og **Sted** fyller inn en foreslått tittel for den typen side; **KI** lager et første utkast til siden basert på en kort beskrivelse du skriver. Sidens sti lages av tittelen (for eksempel blir «Vårt team» til `/our-team`), og du kan endre den senere under **Sideinnstillinger**.
3. Klikk på **Rediger innhold** ved siden av en side for å åpne [sideeditoren](./page-editor.md), der du kan legge til seksjoner, tekst, bilder og andre elementer.
4. Klikk på **Sideinnstillinger** ved siden av en side for å oppdatere sidetittelen, URL-stien og andre metadata.
5. Klikk på en sides sti i kolonnen **Sti** for å åpne den live siden i en ny fane og se nøyaktig hvordan den vil se ut for besøkende.

:::tip
For hjemmesiden din setter du URL-stien til bare `/`. For alle andre sider bruker du en beskrivende sti som `/about` eller `/contact`.
:::

### Sideinnstillinger {#page-settings}

Åpne **Sideinnstillinger** på en hvilken som helst side for å konfigurere:

- **Sidetittel** -- Navnet på siden.
- **Oppsett** -- **Topptekst og bunntekst** (nettstedets navigasjonslinje og bunntekst rundt siden, standard) eller **Ren sentrert innhold** (bare sideinnholdet, i et sentrert kort på lys grå bakgrunn, uten navigasjonslinje eller bunntekst -- nyttig for en enkel påmelding eller landingsside).
- **URL-sti** -- Sidens adresse på nettstedet ditt. Klikk på blyanten for å endre den, og klikk deretter på **Sjekk** for å kontrollere at stien er gyldig og ikke allerede er i bruk.
- **Synlighet** -- Velg hvem som kan se siden: **Alle**, **Innloggede brukere**, **Medlemmer og ansatte**, **Kun ansatte**, **Teammedlemmer** eller **Bestemte grupper** (og kryss deretter av gruppene). Dette er en rask måte å beskytte en privat side (som en ressursside for ansatte) på, uten et eget passord. Besøkende som ikke er innlogget, ser «Denne siden er for menighetsmedlemmer» med en knapp for **Logg inn**; innloggede personer som siden ikke er delt med, ser «Du har ikke tilgang til denne siden.» Beskyttede sider utelates fra nettstedkartet ditt.
- **Metabeskrivelse** -- Et kort sammendrag som vises i søkemotorresultater og forhåndsvisninger av lenker i sosiale medier. Sikt mot rundt 155 tegn, eller klikk på **Generer med KI** for å lage et utkast basert på sidens innhold.

Dialogen har også en knapp for **Dupliser**, som lager en kopi av siden med alt innholdet, og en knapp for **Slett**, som sletter siden permanent.

:::tip
For å sende en gammel adresse til en side (for eksempel etter at du har gitt `/about-us` nytt navn til `/about`), legger du til en omdirigering under **Omdirigeringer og analyse** i [Utseende](./appearance.md#redirects--analytics).
:::

## Administrere navigasjonen {#managing-navigation}

Panelet **Hovednavigasjon** på høyre side av visningen Nettsidesider viser navigasjonslenkene dine. Disse lenkene styrer menyen besøkende ser på nettstedet ditt.

1. Klikk på **Legg til** for å lage en ny navigasjonslenke. Du kan peke den til en hvilken som helst side på nettstedet ditt eller til en ekstern URL.
2. For å endre rekkefølgen på lenkene drar og slipper du dem i ønsket rekkefølge. Du kan også nøste lenker under et overordnet element for å lage rullegardinmenyer.
3. Klikk på en lenke for å åpne **lenkeinnstillingene**, der du kan endre teksten, URL-en eller overordnet side.
4. For å fjerne en lenke fra navigasjonen åpner du lenkeinnstillingene og klikker på **Slett**.

:::info
Å fjerne en navigasjonslenke sletter ikke selve siden. Siden finnes fortsatt og kan åpnes direkte via URL-en -- den vises bare ikke i menyen.
:::

## Bryter for hele nettstedet {#site-wide-switches}

Under lenkene i panelet **Hovednavigasjon** finner du to brytere som gjelder for hele menighetens nettsted:

- **Vis innlogging** -- Viser en knapp for **Logg inn** i navigasjonslinjen på nettstedet ditt.
- **Deaktiver offentlig nettsted** -- Slår av det offentlige nettstedet ditt. Bruk dette hvis menigheten din bare bruker B1 til medlemsportalen, gaver og påmeldinger, og har hovednettstedet sitt et annet sted.

### Hva deaktivering av det offentlige nettstedet gjør {#what-disabling-the-public-website-does}

Når **Deaktiver offentlig nettsted** er på:

- Hver offentlig side, inkludert hjemmesiden og egendefinerte sider, sender besøkende som ikke er innlogget til innloggingsskjermen. Etter at de har logget inn, går de tilbake til siden de ba om.
- Innloggede medlemmer ser hele nettstedet som vanlig, inkludert navigasjonen din og de innebygde **genererte** sidene (som Grupper og Prekener). Genererte sider vises ikke lenger i tabellen Sider.
- Søkemotorer får beskjed om ikke å indeksere nettstedet. Nettstedkartet er tomt, og `robots.txt` blokkerer all crawling.

Disse lenkene fungerer fortsatt, slik at medlemmer og gjester fortsatt kan nå dem:

- Innlogging og utlogging
- Medlemsportalen (alt under `/mobile`)
- [Lenker til arrangementspåmelding](../guides/event-registration.md) og påmelding for gjester

En advarsel vises under bryteren så lenge det offentlige nettstedet er av. Slå bryteren av igjen for å få sidene tilbake. Ingenting slettes mens nettstedet er deaktivert.

:::info
Denne innstillingen gjelder for hele menigheten din. Hvis du har mer enn ett nettsted, slår den av alle, ikke bare det som er valgt i nettstedvelgeren.
:::

## Tips for å organisere nettstedet ditt {#tips-for-organizing-your-site}

- Hold hovednavigasjonen på fem eller seks punkter, slik at besøkende raskt finner frem.
- Bruk nøstede lenker for relaterte undersider (for eksempel en rullegardin «Om oss» med «Vårt team», «Tro» og «Historie»).
- Gå gjennom navigasjonen din på telefon for å sikre at den fungerer godt på mindre skjermer.
- Gi sidene tydelige, beskrivende navn som hjelper besøkende å forstå hva de vil finne.

:::tip
Du kan legge til [skjemaer](../forms/creating-forms.md) på sidene dine for å samle inn påmeldinger, bønneforespørsler eller annen informasjon fra besøkende.
:::

## Starte fra en nettstedmal {#starting-from-a-site-template}

Hvis du bygger nettstedet ditt fra bunnen av, kan du komme i gang med en **nettstedmal** i stedet for å lage sider én og én. En nettstedmal lager et sett ferdiglagde sider -- hjem, om oss, kontakt, gave og andre -- med plassholderinnhold og navigasjonslenker allerede koblet opp.

1. På siden Sider klikker du på knappen **Start fra en mal** (ved siden av knappen **Legg til side**).
2. Bla gjennom de tilgjengelige malene (for eksempel **Klassisk**, **Moderne**, **Fellesskap** og **Besøksfokusert**) og klikk på en for å forhåndsvise sidene og navigasjonslenkene den legger til.
3. Når du finner en du liker, klikker du på **Opprett nettsted**.
4. Sider som ikke finnes fra før, opprettes og legges til i navigasjonen din. Sider du allerede har, merkes **Finnes allerede** og lates være urørt. Den første nye siden åpnes så du kan se over den.

Etter at du har brukt en mal, åpner du hver side i [sideeditoren](./page-editor.md) for å erstatte plassholdertekst og bilder med menighetens faktiske innhold.

:::info
En mal setter bare farger og skrifter på et nettsted som aldri har hatt en fargepalett lagret. Når du har valgt din egen palett, lar bruk av en mal farger og skrifter være urørt -- de forblir under [Utseende](./appearance.md).
:::

## Flere nettsteder {#multiple-websites}

En menighet kan drive mer enn ett nettsted fra samme konto -- for eksempel ett per menighetsenhet, eller et eget nettsted for en skole.

1. På siden Sider åpner du nettstedvelgeren (den viser **Hovednettsted** først) og velger **Administrer nettsteder…**.
2. I dialogen **Nettsteder** skriver du inn et **navn** og et **subdomene** (bare små bokstaver og tall -- det blir `{subdomain}.b1.church`) og klikker på **Legg til nettsted**.
3. Velg det nye nettstedet i nettstedvelgeren for å bygge dets sider, navigasjon, blokker og utseende.

For å fjerne et nettsted åpner du **Administrer nettsteder…** og klikker på **Slett** ved siden av det. Sidene, navigasjonen og utseendet til nettstedet slettes permanent, og eventuelle egne domener det hadde, flyttes til hovednettstedet.

## Bildelightbox {#image-lightbox}

Når besøkende klikker på et bilde på nettstedet ditt, åpnes det i en lightbox-overlay i fullskjerm. Dette lar folk se bilder i større størrelse uten å forlate siden. Det kreves ingen konfigurasjon -- lightboxen er aktivert automatisk for bilder i sideinnholdet ditt.

## Neste steg {#next-steps}

- [Førstegangsoppsett](./initial-setup.md) -- Instruksjoner for oppsett første gang
- [Bruke sideeditoren](./page-editor.md) -- Lær å bygge og stile sideinnhold
- [Utseende](./appearance.md) -- Tilpass nettstedets visuelle tema
- [Filer](./files.md) -- Last opp og administrer mediefiler til sidene dine

---
title: "Google Sheets"
description: "Koble B1 Admin til Google Sheets med tillegget B1 Export for å hente personer, gaver, grupper og oppmøte inn i regnearkfaner på forespørsel."
---

# Google Sheets

<div class="article-intro">

**B1 Export** er det offisielle Google Sheets-tillegget for B1.church. Det legger til en sidepanel i et hvilket som helst regneark, og eksporterer personer, gaver, grupper eller oppmøte fra kirken din i B1 til navngitte faner, på forespørsel, med ett klikk. Tillegget kjører helt inne i brukerens Google-konto. Det er ingen annen kontakt med ChurchApps' servere enn de skrivebeskyttede API-kallene hver eksport gjør.

</div>

:::caution Ikke tilgjengelig ennå
B1 Export-tillegget er ikke publisert i Google Workspace Marketplace ennå, så du kan ikke installere det i dag. Inntil det er publisert, eksporter personer fra B1 Admin (se [Eksportere data](../people/exporting-data.md)) og importer CSV-filen til Google Sheets. Alt nedenfor beskriver hvordan tillegget vil fungere når det er lansert.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- En Google-konto med redigeringstilgang til regnearket du vil eksportere til
- En kirkeadministrator (eller noen med lesetilgang til dataene du vil eksportere) som kan lage en B1 API-nøkkel
- B1 Export-tillegget installert fra Google Workspace Marketplace

</div>

## Hva det eksporterer {#what-it-exports}

| Menyelement | Regnearkfane | Data |
|---|---|---|
| Eksporter personer | `B1 People` | ID, visningsnavn, fornavn, etternavn, e-post, medlemsstatus |
| Eksporter gaver | `B1 Donations` | ID, person-ID, dato, beløp, metode, batch-ID |
| Eksporter grupper | `B1 Groups` | ID, navn, kategori, antall medlemmer |
| Eksporter oppmøte | `B1 Attendance` | ID, person-ID, besøksdato, gudstjeneste-ID, gruppe-ID |

Hver eksport **erstatter** innholdet i den navngitte fanen. Kjører du eksporten på nytt, får du et nytt øyeblikksbilde, ikke nye rader lagt til under. Andre faner i regnearket blir ikke berørt.

## Oppsett {#setup}

### 1. Lag en B1 API-nøkkel med riktige omfang {#1-create-a-b1-api-key-with-the-right-scopes}

1. I B1 Admin går du til **Innstillinger → Utvikler → API-nøkler**.
2. Klikk på **Ny API-nøkkel**, gi den navnet «Sheets Export», og gi **lese**-omfang for det du planlegger å eksportere:
   - `people:read` for eksport av personer
   - `donations:read` for gaver
   - `groups:read` for grupper
   - `attendance:read` for oppmøte
3. En nøkkel som bare brukes til eksport trenger **ikke** `settings:write`. Det omfanget er bare for connectorer som registrerer webhooks (Zapier / Make). Hold denne nøkkelen smal.
4. Lagre og kopier `cak_…`-nøkkelen.

### 2. Installer tillegget {#2-install-the-add-on}

1. Åpne regnearket du vil eksportere til.
2. **Utvidelser → Tillegg → Hent tillegg**.
3. Søk etter **B1 Export** og installer det. Google ber deg gi tilgang til regnearkene dine og til eksterne HTTP-kall (slik at tillegget kan kalle B1 API-et).

Etter installasjonen vises et **B1 Export**-punkt under menyen **Utvidelser** i alle regneark du åpner med denne Google-kontoen.

### 3. Koble til nøkkelen {#3-connect-the-key}

1. **Utvidelser → B1 Export → Koble til…** (eller **B1 Export → Koble til…** i menylinjen etter første åpning).
2. Lim inn API-nøkkelen i sidepanelet, la basis-URL-en stå som `https://api.churchapps.org` (med mindre du tester mot staging), og klikk på **Lagre**.
3. Klikk på **Test tilkobling**. En grønn «Tilkobling OK» bekrefter at nøkkelen fungerer.

Nøkkelen lagres i **brukerspesifikke egenskaper** (`PropertiesService.getUserProperties()`). Den er knyttet til Google-kontoen din, skrives aldri inn i regnearket, og er aldri synlig for andre redigerere av regnearket.

## Kjøre en eksport {#running-an-export}

Enten:

- **Fra menyen**: **Utvidelser → B1 Export → Eksporter personer** (eller gaver / grupper / oppmøte)
- **Fra sidepanelet**: åpne sidepanelet (Koble til…) og klikk på riktig datasettknapp

En melding bekrefter når det er ferdig: «_N_ rad(er) skrevet til "B1 People"».

## Bygge rapporter oppå {#building-reports-on-top}

De eksporterte fanene er vanlige Google Sheets-data. Bygg egne analyser ved å referere til fanene:

- En **oppsummeringsfane** med `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` for å summere kortgaver
- En **filtrert visning** som bare viser medlemmer med `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Et **diagram** over oppmøtetrender som henter data fra `B1 Attendance`

Kjører du eksporten på nytt, oppdateres den underliggende fanen. Formlene dine oppdateres automatisk.

## Planlegge gjentakende eksporter {#scheduling-recurring-exports}

Tillegget kjøres på forespørsel som standard. For ukentlige eller månedlige eksporter bruker du Apps Scripts innebygde tidsstyrte utløsere:

1. **Utvidelser → Apps Script** i regnearket (dette åpner tilleggets tilknyttede skript).
2. Klikk på **⏰ Utløsere**-ikonet i venstre sidepanel.
3. **Legg til utløser** for `exportPeople` (eller en annen eksportfunksjon). Velg *Tidsstyrt*, *Ukentlig timer*, f.eks. *Hver mandag kl. 06*.

Eksporten kjører i bakgrunnen under Google-kontoen din. Hvis API-nøkkelen byttes ut eller trekkes tilbake, sender utløseren deg en e-post neste gang den mislykkes.

## Tillatelser og personvern {#permissions--privacy}

- Tillegget ber bare om `spreadsheets.currentonly` (det kan bare røre regnearket det er åpnet i) og `script.external_request` (slik at `UrlFetchApp` kan kalle B1 API-et). Det ser **ikke** Drive, Gmail eller andre Google-data dine.
- B1 API-nøkkelen lagres per bruker. Andre redigerere av samme regneark kan ikke se den.
- Alle B1 API-kall gjøres over HTTPS med `Authorization: Bearer cak_…`.

## Feilsøking {#troubleshooting}

- **«Ingen API-nøkkel er satt»**: åpne **Utvidelser → B1 Export → Koble til…** og lim inn nøkkelen.
- **«B1 avviste API-nøkkelen (401)»**: nøkkelen er slettet eller feil. Lag en ny nøkkel og lim den inn.
- **«Denne API-nøkkelen mangler tillatelse for /giving/donations (403)»**: nøkkelen har ikke `donations:read`. Omfang kan ikke endres på en eksisterende nøkkel, så lag en ny nøkkel med riktige omfang i B1 Admin.
- **Regnearket oppdateres ikke** etter kjøring: sjekk at du ser på riktig fanenavn (`B1 People` osv.). Eksporten oppretter fanen hvis den ikke finnes.
- **«Kvote overskredet»**: Apps Script setter daglige kvoter per bruker for `UrlFetchApp` (vanligvis tusenvis av kall per dag). En stor kirke med mange registreringer kan trenge å dele eksportene over flere dager, eller bruke [Make](./make.md) / en egen integrasjon for synkronisering med høyt volum.

## Mangler en kolonne? {#missing-a-column}

Hvis du vil ha en kolonne vi ikke eksporterer, et ekstra datasett eller et annet utdataformat, send e-post til [support@churchapps.org](mailto:support@churchapps.org).

## Se også {#see-also}

- [Zapier](./zapier.md) for synkronisering i sanntid i stedet for eksport på forespørsel
- [Make](./make.md) for synkronisering med mer kompliserte transformasjoner
- [API-nøkler (referanse for utviklere)](/docs/developer/api/api-keys)

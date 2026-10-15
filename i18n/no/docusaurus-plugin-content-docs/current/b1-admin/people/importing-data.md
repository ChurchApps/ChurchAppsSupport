---
title: "Importere data"
---

# Importere data

<div class="article-intro">

Verktøyet B1 Transfer gjør det enkelt å flytte eksisterende data inn i B1, enten du starter fra bunnen av med et regneark, flytter fra en annen plattform for kirkeadministrasjon, eller importerer gaveregistreringer. Det kan også brukes til å eksportere eller ta sikkerhetskopi av dataene dine når som helst.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tilgang til **Innstillinger**.
- Ha dataene dine eksportert og klare fra det forrige systemet før du begynner.
- Dette verktøyet er beregnet for innledende datamigrering. Hvis dere allerede har brukt B1 en stund, kan ny import skape dupliserte registreringer.

</div>

## Åpne overføringsverktøyet

1. Logg inn på **B1 Admin**.
2. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Innstillinger**, og klikk på **Innstillinger**.
3. Klikk på lenken **Import/Eksport** under kirkens navn øverst i den venstre innstillingsmenyen.
4. Dette åpner verktøyet **B1 Transfer** i en ny fane på [transfer.b1.church](https://transfer.b1.church).

Overføringsverktøyet guider deg gjennom fire trinn: Kilde, Forhåndsvisning, Mål og Kjør.

---

## Trinn 1 – Velg kilde

Velg hvor dataene dine kommer fra. Det finnes sju alternativer:

- **B1-database** – Henter data direkte fra din eksisterende B1-kirke. Nyttig for å ta en sikkerhetskopi eller konvertere dataene dine til et annet format. Du må være logget inn for å bruke dette alternativet.
- **B1 import-zip** – En zip-fil i B1s eget format. Dette brukes først og fremst for å gjenopprette en tidligere B1-eksport. Når en B1 eksport-zip lastes inn i **B1-databasen** igjen, gjenopprettes alt eksporten inneholder (se [Eksportere data](./exporting-data.md#full-data-export-from-settings)). Hvis filen ikke kan leses, viser verktøyet feilen i stedet for å starte på nytt.
- **Breeze import-zip** – En zip-fil som inneholder eksporterte filer fra Breeze ChMS.
- **Planning Center-zip** – En zip- eller CSV-fil eksportert fra Planning Center.
- **Egendefinert CSV / Excel** – Enhver CSV- eller Excel-fil som inneholder personopplysninger. Etter opplasting må du koble kolonnene dine til B1-felt før importen fortsetter.
- **Tithe.ly CSV** – En eksportfil med personer eller gaver fra Tithe.ly (CSV- eller Excel-format godtas).
- **CCB / Pushpay CSV** – En CSV-eksport med personer eller gaver fra Church Community Builder eller Pushpay.

Du kan dra og slippe filen din i opplastingsområdet, eller klikke for å bla etter den.

---

## Trinn 1b – Koble feltene dine (kun Egendefinert CSV / Excel)

Hvis du valgte **Egendefinert CSV / Excel**, viser verktøyet etter opplasting av filen et skjermbilde for feltkobling før forhåndsvisningen.

Hver kolonne i filen din er oppført sammen med en eksempelverdi. For hver kolonne bruker du rullegardinmenyen til å velge det tilsvarende B1-feltet. Verktøyet gjenkjenner vanlige kolonnenavn som «Fornavn», «E-post» eller «Postnummer» automatisk, men du bør gå gjennom hver rad og rette det verktøyet ikke fikk med.

Tilgjengelige B1-felt inkluderer:

- Fornavn, Etternavn, Mellomnavn, Kallenavn, Visningsnavn, Tittel/Prefiks, Suffiks
- E-post, Hjemmetelefon, Mobiltelefon, Jobbtelefon
- Adresselinje 1, Adresselinje 2, By, Fylke, Postnummer
- Fødselsdato, Bryllupsdato, Kjønn, Sivilstatus, Medlemsstatus
- Husstands-/familienavn
- Gruppenavn – knytter personen til en gruppe etter navn
- **Egendefinert felt (match på navn)** – lagrer kolonnen i ett av kirkens [egendefinerte personfelt](../settings/custom-fields.md). En boks **B1-feltnavn** vises, fylt ut med kolonneoverskriften. Endre den til feltets navn nøyaktig slik det står i B1 (store og små bokstaver spiller ingen rolle).
- **Skjemasvar (egendefinert felt)** – lagrer verdien i kolonnen som et egendefinert felt knyttet til personens registrering. Hvis du bruker dette alternativet, blir du bedt om å gi skjemaet et navn.

Datoer kan være i vanlige formater som `17.9.1994` og konverteres automatisk. For egendefinerte felt godtar Ja/Nei-felt verdier som Ja, Nei, J, N, True, False, 1 og 0, og flervalgsfelt godtar enten valgteksten eller verdien.

:::info
Opprett de egendefinerte personfeltene dine i B1 Admin før du importerer. Når importen er ferdig, lister trinnet **Egendefinerte felt** eventuelle kolonnenavn som ikke samsvarer med et B1-felt, og teller verdier som ikke passer til feltets type. Disse verdiene hoppes over, og resten av importen fullføres likevel.
:::

Kolonner du ikke vil importere, kan settes til **(Hopp over)**. Minst ett navnefelt (Fornavn eller Etternavn) må kobles før du kan fortsette.

Klikk på **Bekreft kobling og importer** for å gå videre til forhåndsvisningen.

---

## Trinn 2 – Forhåndsvis dataene dine

Etter opplasting viser verktøyet en forhåndsvisning av alt som vil bli importert. Bruk fanene for å gå gjennom hver datatype:

- **Personer** – Oppført etter husstand, med bilder hvis de er inkludert.
- **Grupper** – Organisert etter campus, gudstjeneste, tidspunkt og kategori.
- **Oppmøte** – Øktdatoer, grupper og antall besøk.
- **Gaver** – Batcher, fond, givere og beløp.
- **Skjemaer** – Skjemanavn og innholdstyper.

Gjennomgå dette nøye før du fortsetter. Hvis noe ser feil ut, klikk på **Start på nytt** og rett opp kildefilen din.

---

## Trinn 3 – Velg mål

Velg hvor du vil at dataene skal havne:

- **B1-database** – Importerer direkte til kirkens B1-database. Etter at du har valgt dette, viser verktøyet et endelig antall registreringer som skal legges til. Klikk på **Start overføring** for å bekrefte.
- **B1 eksport-zip** – Laster ned dataene dine som en zip-fil i B1-format som senere kan gjenopprettes med **B1 import-zip**. Godt for sikkerhetskopier.
- **Breeze eksport-zip** – Konverterer dataene dine til Breeze-format.
- **Planning Center-zip** – Konverterer dataene dine til Planning Center-format.

:::warning
Kilde og mål kan ikke være samme format. Hvis de er like, advarer verktøyet deg for å forhindre utilsiktet duplisering.
:::

---

## Trinn 4 – Kjør

Verktøyet behandler overføringen og viser fremdrift for hvert trinn:

- Campus, gudstjenester og tidspunkter
- Personer
- Bilder
- Grupper og gruppemedlemmer
- Gaver
- Oppmøte
- Skjemaer, spørsmål, svar og skjemainnsendinger
- Egendefinerte felt (når du har koblet noen kolonner til egendefinerte felt)
- Komprimering (kun for zip-filmål)

Når målet er **B1-database**, har fremdriftskortet tittelen **Importfremdrift** og avsluttes med **Import fullført!** (eller **Import fullført med feil**). For zip-filmål sier de samme meldingene **Eksport**.

:::warning
Ikke lukk nettleseren mens overføringen pågår. Vent til alle trinn vises som fullført.
:::

---

## Klargjøre en Breeze import-zip

1. I Breeze går du til **Innstillinger** og klikker på **Eksporter** i sidemenyen til venstre.
2. Eksporter tre separate filer: **People**, **Tags** og **Contributions**.
3. Velg alle tre filene, høyreklikk og komprimer dem til én zip-fil.
   - På en Mac: velg filene, høyreklikk og velg **Komprimer**.
   - På en PC: velg filene, høyreklikk, velg **Send til**, deretter **Komprimert (zippet) mappe**.
4. Last opp zip-filen med alternativet **Breeze import-zip** i trinn 1.

Breeze-importen overfører personer, grupper (tags) og gaveregistreringer automatisk.

---

## Klargjøre en Planning Center-eksport

1. Logg inn på Planning Center og åpne produktet **People**.
2. Klikk på **Lists** i sidemenyen til venstre og opprett en liste som inkluderer alle du vil flytte over. (Hvis du allerede har en liste over hele menigheten, bruk den.)
3. Åpne listen og bruk alternativet **eksporter** for å laste ned personene dine som en **CSV**-fil. Ta med feltene du vil beholde – navn, e-post, telefon, adresse, fødselsdato, kjønn og medlemsstatus blir alle koblet til B1.
4. Hvis Planning Center gir deg flere filer, velg dem alle, høyreklikk og komprimer dem til én zip-fil.
   - På en Mac: velg filene, høyreklikk og velg **Komprimer**.
   - På en PC: velg filene, høyreklikk, velg **Send til**, deretter **Komprimert (zippet) mappe**.
5. Last opp CSV-filen eller zip-filen med alternativet **Planning Center-zip** i trinn 1.

Etter opplasting fortsetter du til forhåndsvisningen og bekrefter at personene og husstandene dine ser riktige ut før du kjører importen.

---

## Klargjøre en Tithe.ly-eksport

1. I Tithe.ly eksporterer du dataene dine for **People** som en CSV- eller Excel-fil. Du kan også eksportere en egen **Giving**-fil hvis du vil importere gaveregistreringer.
2. Verktøyet oppdager automatisk om filen inneholder personer- eller giveropplysninger basert på kolonnenavnene.
3. Last opp filen med alternativet **Tithe.ly CSV** i trinn 1.

:::info
Tithe.ly-eksporter kan importeres én fil om gangen. Kjør prosessen to ganger hvis du trenger å importere både personer og gaver separat.
:::

---

## Klargjøre en CCB- eller Pushpay-eksport

1. I Church Community Builder eller Pushpay eksporterer du dataene dine for **People** som en CSV-fil. Du kan også eksportere en egen fil for gaver/bidrag.
2. Verktøyet oppdager automatisk om filen inneholder personer- eller giveropplysninger basert på kolonnenavnene.
3. Last opp filen med alternativet **CCB / Pushpay CSV** i trinn 1.

---

## Etter importen

Når overføringen er fullført, bruk noen minutter på å kontrollere dataene dine:

1. Bla gjennom siden [Personer](../people/adding-people.md) og sjekk noen profiler stikkprøvevis.
2. Bekreft at navn, e-postadresser, telefonnumre og adresser kom riktig over.
3. Kontroller at husstandsforbindelsene er intakte. Hver persons husstandsrolle (Hode, Ektefelle, Barn eller Annen) overføres når kildefilen har en: kolonnen **householdRole** i en B1 import-zip, **Family Role** i Breeze eller Tithe.ly, og **Family Position** i CCB / Pushpay. Roller som «Head of Household», «Primary», «Wife» eller «Son» konverteres til tilsvarende B1-rolle. Planning Center- og egendefinerte CSV- / Excel-importer har ingen rollekolonne, så disse personene settes til **Annen**. Du kan endre en rolle fra personens husstand på siden [Personer](../people/adding-people.md#managing-households).
4. Gjennomgå eventuelle importerte grupper og gaveregistreringer.

Hvis du oppdager problemer, kan du redigere enkeltprofiler fra Personer-siden. Du kan også kjøre overføringsverktøyet på nytt for å [eksportere dataene dine](exporting-data.md) som sikkerhetskopi.

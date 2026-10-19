---
title: "Importere data"
---

# Importere data

<div class="article-intro">

B1 Transfer-verktøyet gjør det enkelt å hente eksisterende data inn i B1, enten du starter fra et regneark, migrerer fra en annen plattform for kirkeadministrasjon, eller importerer gaveregistreringer. Verktøyet kan også brukes til å eksportere eller ta sikkerhetskopi av dataene dine når som helst.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tilgang til **Innstillinger**.
- Ha dataene dine eksportert og klare fra det forrige systemet før du starter.
- Dette verktøyet er beregnet på innledende datamigrering. Hvis du allerede har brukt B1 en stund, kan ny import skape dupliserte poster.

</div>

## Åpne overføringsverktøyet

1. Logg inn i **B1 Admin**.
2. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Innstillinger**, og klikk på **Innstillinger**.
3. Klikk på lenken **Import/Export** under kirkens navn øverst i den venstre innstillingsmenyen.
4. Dette åpner **B1 Transfer**-verktøyet i en ny fane på [transfer.b1.church](https://transfer.b1.church).

Verktøyet leder deg gjennom fire steg: Kilde, Forhåndsvisning, Mål og Kjør.

---

## Steg 1 - Velg kilden din

Velg hvor dataene dine kommer fra. Det finnes sju alternativer:

- **B1-database** — Henter data direkte fra din eksisterende B1-kirke. Nyttig for å ta sikkerhetskopi eller konvertere dataene dine til et annet format. Du må være logget inn for å bruke dette alternativet.
- **B1-importzip** — En zip-fil i B1s eget format. Brukes først og fremst til å gjenopprette en tidligere B1-eksport. Hvis du laster en B1-eksport-zip tilbake i **B1-database**, gjenopprettes alt eksporten inneholder (se [Eksportere data](./exporting-data.md#full-data-export-from-settings)). Hvis filen ikke kan leses, viser verktøyet feilmeldingen i stedet for å starte på nytt.
- **Breeze-importzip** — En zip-fil med eksporterte filer fra Breeze ChMS.
- **Planning Center-zip** — En zip- eller CSV-fil eksportert fra Planning Center.
- **Egendefinert CSV / Excel** — Enhver CSV- eller Excel-fil med personopplysninger. Etter opplasting kobler du kolonnene dine til B1-felt før importen fortsetter.
- **Tithe.ly CSV** — En person- eller giveneksportfil fra Tithe.ly (CSV- eller Excel-format godtas).
- **CCB / Pushpay CSV** — En person- eller giveneksport-CSV fra Church Community Builder eller Pushpay.

Du kan dra og slippe filen din på opplastingsområdet, eller klikke for å bla etter den.

---

## Steg 1b - Kartlegg feltene dine (kun Egendefinert CSV / Excel)

Hvis du valgte **Egendefinert CSV / Excel**, viser verktøyet etter opplasting av filen en skjerm for feltkartlegging før forhåndsvisningen.

Hver kolonne i filen din vises sammen med en eksempelverdi. For hver kolonne bruker du rullegardinmenyen til å velge det tilsvarende B1-feltet. Verktøyet gjenkjenner vanlige kolonnenavn som "First Name," "Email" eller "Zip Code" automatisk, men du bør gå gjennom hver rad og rette det verktøyet har oversett.

Tilgjengelige B1-felt inkluderer:

- Fornavn, Etternavn, Mellomnavn, Kallenavn, Visningsnavn, Tittel/prefiks, Suffiks
- E-post, Hjemmetelefon, Mobiltelefon, Jobbtelefon
- Adresselinje 1, Adresselinje 2, By, Fylke, Postnummer
- Fødselsdato, Bryllupsdato, Kjønn, Sivilstatus, Medlemsstatus
- Husstands- eller familienavn
- Gruppenavn — knytter personen til en gruppe etter navn
- **Egendefinert felt (match etter navn)** — lagrer kolonnen i ett av kirkens [egendefinerte personfelt](../settings/custom-fields.md). En boks for **B1-feltnavn** vises, fylt ut med kolonneoverskriften. Endre den til feltets navn nøyaktig slik det står i B1 (store og små bokstaver spiller ingen rolle).
- **Skjemasvar (egendefinert felt)** — lagrer kolonnens verdi som et egendefinert felt knyttet til personens post. Hvis du bruker dette alternativet, blir du bedt om å gi skjemaet et navn.

Datoer kan være i vanlige formater, for eksempel `9/17/1994`, og konverteres automatisk. For egendefinerte felt godtar ja/nei-felt verdier som Yes, No, Y, N, True, False, 1 og 0. Flervalgsfelt godtar enten valgteksten eller verdien.

:::info
Opprett de egendefinerte personfeltene dine i B1 Admin før du importerer. Når importen er ferdig, viser steget **Egendefinerte felt** alle kolonnenavn som ikke samsvarer med et B1-felt, og teller verdier som ikke passer til feltets type. Disse verdiene hoppes over, og resten av importen fullføres likevel.
:::

Kolonner du ikke vil importere, kan settes til **(Hopp over)**. Minst ett navnefelt (Fornavn eller Etternavn) må kobles før du kan gå videre.

Klikk på **Bekreft kartlegging og importer** for å gå videre til forhåndsvisningen.

---

## Steg 2 - Forhåndsvis dataene dine

Etter opplasting viser verktøyet en forhåndsvisning av alt som skal importeres. Bruk fanene til å gå gjennom hver datatype:

- **Personer** — Listet etter husstand, med bilder hvis de er med.
- **Grupper** — Organisert etter campus, gudstjeneste, tidspunkt og kategori.
- **Oppmøte** — Øktdatoer, grupper og antall besøk.
- **Gaver** — Batcher, fond, givere og beløp.
- **Skjemaer** — Skjemanavn og innholdstyper.

Gå gjennom dette nøye før du fortsetter. Hvis noe ser feil ut, klikk på **Start på nytt** og rett opp kildefilen din.

---

## Steg 3 - Velg målet ditt

Velg hvor du vil at dataene skal havne:

- **B1-database** — Importerer direkte til kirkens B1-database. Etter at du har valgt dette, viser verktøyet et endelig antall poster som skal legges til. Klikk på **Start overføring** for å bekrefte.
- **B1-eksport-zip** — Laster ned dataene dine som en zip-fil i B1-format, som senere kan gjenopprettes med **B1-importzip**. Godt for sikkerhetskopier.
- **Breeze-eksport-zip** — Konverterer dataene dine til Breeze-format.
- **Planning Center-zip** — Konverterer dataene dine til Planning Center-format.

:::warning
Kilden og målet kan ikke være samme format. Hvis de er like, advarer verktøyet deg for å forhindre utilsiktet duplisering.
:::

---

## Steg 4 - Kjør

Verktøyet gjennomfører overføringen og viser fremdrift for hvert steg:

- Campus, gudstjenester og tidspunkter
- Personer
- Bilder
- Grupper og gruppemedlemmer
- Gaver
- Oppmøte
- Skjemaer, spørsmål, svar og skjemainnsendelser
- Egendefinerte felt (når du kartla egendefinerte feltkolonner)
- Komprimering (kun for zip-filmål)

Når målet er **B1-database**, har fremdriftskortet tittelen **Importfremdrift** og avsluttes med **Import fullført!** (eller **Import fullført med feil**). For zip-filmål står det **Eksport** i de samme meldingene.

:::info
Ved gjenoppretting av en **B1-importzip** hoppes poster som peker til noe som ikke lenger finnes i filen, over i stedet for at importen stopper. Dette gjelder gruppemedlemskap for personer eller grupper som ikke finnes i zip-filen, oppmøte for slettede grupper eller personer, og koblinger mellom grupper og slettede gudstjenestetider. Oppmøteøkter som aldri var knyttet til en gudstjenestetid, gjenopprettes likevel. Tilsvarende utelates et bilde som ikke kan lastes ned eller leses ved eksport, slik at steget **Bilder** fortsetter.
:::

:::warning
Ikke lukk nettleseren mens overføringen pågår. Vent til alle steg viser som fullført.
:::

---

## Forberede en Breeze-importzip

1. I Breeze går du til **Innstillinger** og klikker på **Export** i venstre sidemeny.
2. Eksporter tre separate filer: **People**, **Tags** og **Contributions**.
3. Velg alle tre filene, høyreklikk og komprimer dem til én zip-fil.
   - På Mac: velg filene, høyreklikk og velg **Komprimer**.
   - På PC: velg filene, høyreklikk, velg **Send til** og deretter **Komprimert (zippet) mappe**.
4. Last opp zip-filen med alternativet **Breeze-importzip** i steg 1.

Breeze-importen overfører personer, grupper (tagger) og gaveregistreringer automatisk.

---

## Forberede en Planning Center-eksport

1. Logg inn i Planning Center og åpne produktet **People**.
2. I venstre sidemeny klikker du på **Lists** og oppretter en liste som inkluderer alle du vil ta med. (Hvis du allerede har en liste over hele menigheten, bruk den.)
3. Åpne listen og bruk alternativet **export** for å laste ned personene dine som en **CSV**-fil. Ta med feltene du vil beholde. Navn, e-post, telefon, adresse, fødselsdato, kjønn og medlemsstatus overføres alle til B1.
4. Hvis Planning Center gir deg mer enn én fil, velger du dem alle, høyreklikker og komprimerer dem til én zip-fil.
   - På Mac: velg filene, høyreklikk og velg **Komprimer**.
   - På PC: velg filene, høyreklikk, velg **Send til** og deretter **Komprimert (zippet) mappe**.
5. Last opp CSV-filen eller zip-filen med alternativet **Planning Center-zip** i steg 1.

Etter opplasting fortsetter du til forhåndsvisningen og bekrefter at personene og husstandene dine ser riktige ut før du kjører importen.

---

## Forberede en Tithe.ly-eksport

1. I Tithe.ly eksporterer du **People**-dataene dine som CSV- eller Excel-fil. Du kan også eksportere en egen **Giving**-fil hvis du vil ta med gaveregistreringer.
2. Verktøyet oppdager automatisk om filen inneholder person- eller givedata, basert på kolonnenavnene.
3. Last opp filen med alternativet **Tithe.ly CSV** i steg 1.

:::info
Tithe.ly-eksporter kan importeres én fil om gangen. Kjør prosessen to ganger hvis du trenger å importere både personer og gaver hver for seg.
:::

---

## Forberede en CCB- eller Pushpay-eksport

1. I Church Community Builder eller Pushpay eksporterer du **People**-dataene dine som CSV-fil. Du kan også eksportere en egen fil for gaver og bidrag.
2. Verktøyet oppdager automatisk om filen inneholder person- eller givedata, basert på kolonnenavnene.
3. Last opp filen med alternativet **CCB / Pushpay CSV** i steg 1.

---

## Etter importen

Når overføringen er ferdig, bruk noen minutter på å kontrollere dataene dine:

1. Bla gjennom siden [Personer](../people/adding-people.md) og sjekk noen profiler stikkprøvevis.
2. Bekreft at navn, e-postadresser, telefonnumre og adresser er kommet riktig gjennom.
3. Kontroller at husstandsforbindelsene er intakte. Hver persons rolle i husstanden (**Hode**, **Ektefelle**, **Barn** eller **Annet**) overføres når kilden har en: kolonnen **householdRole** i en B1-importzip, **Family Role** i Breeze eller Tithe.ly, og **Family Position** i CCB / Pushpay. Roller som "Head of Household", "Primary", "Wife" eller "Son" konverteres til den tilsvarende B1-rollen. Planning Center- og egendefinerte CSV- / Excel-importer har ingen rollekolonne, så disse personene settes til **Annet**. Du kan endre rollen fra personens husstand på siden [Personer](../people/adding-people.md#managing-households).
4. Gå gjennom importerte grupper og gaveregistreringer.

Hvis du oppdager problemer, kan du redigere enkeltprofiler fra siden Personer. Du kan også kjøre overføringsverktøyet på nytt for å [eksportere dataene dine](exporting-data.md) som sikkerhetskopi.

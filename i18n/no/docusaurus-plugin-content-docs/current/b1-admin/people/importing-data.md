---
title: "Importere data"
---

# Importere data

<div class="article-intro">

B1 Transfer-verktøyet gjør det enkelt å hente eksisterende data inn i B1, enten du starter på nytt fra et regneark, flytter fra en annen plattform for menighetsadministrasjon, eller importerer gaveregistreringer. Det kan også brukes til å eksportere eller sikkerhetskopiere data når som helst.

</div>

## Opplæringsvideo

<YouTube id="G-VnhzACYIU" title="Importing Your People Database in B1" next="Searching People and Building Lists in B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tilgang til **Settings**.
- Ha dataene dine eksportert og klare fra det forrige systemet før du starter.
- Dette verktøyet er beregnet på første gangs datamigrering. Hvis du allerede har brukt B1 en stund, kan ny import skape dupliserte poster.

</div>

## Åpne Transfer-verktøyet

1. Logg inn på **B1 Admin**.
2. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Settings**, og klikk på **Settings**.
3. Klikk på lenken **Import/Export** under menighetens navn øverst i den venstre innstillingsmenyen.
4. Dette åpner **B1 Transfer**-verktøyet i en ny fane på [transfer.b1.church](https://transfer.b1.church).

Transfer-verktøyet leder deg gjennom fire steg: Source, Preview, Destination og Run.

---

## Steg 1 - Velg kilden din

Velg hvor dataene dine kommer fra. Det finnes sju alternativer:

- **B1 Database** — Henter data direkte fra din eksisterende B1-menighet. Nyttig for å lage en sikkerhetskopi eller konvertere dataene dine til et annet format. Du må være innlogget for å bruke dette alternativet.
- **B1 Import Zip** — En zip-fil i B1s eget format. Dette brukes først og fremst til å gjenopprette en tidligere B1-eksport. Når du laster en B1 Export Zip tilbake inn i **B1 Database**, gjenopprettes alt eksporten inneholder (se [Eksportere data](./exporting-data.md#full-data-export-from-settings)). Hvis filen ikke kan leses, viser verktøyet feilen i stedet for å starte på nytt.
- **Breeze Import Zip** — En zip-fil med eksporterte filer fra Breeze ChMS.
- **Planning Center Zip** — En zip- eller CSV-fil eksportert fra Planning Center.
- **Custom CSV / Excel** — Enhver CSV- eller Excel-fil med personopplysninger. Etter opplasting må du koble kolonnene dine til B1-felt før importen fortsetter.
- **Tithe.ly CSV** — En eksportfil med personer eller gaver fra Tithe.ly (CSV- eller Excel-format godtas).
- **CCB / Pushpay CSV** — En CSV-eksport med personer eller gaver fra Church Community Builder eller Pushpay.

Du kan dra og slippe filen din over opplastingsområdet, eller klikke for å bla etter den.

---

## Steg 1b - Koble feltene dine (kun Custom CSV / Excel)

Hvis du valgte **Custom CSV / Excel**, viser verktøyet et skjermbilde for feltkobling etter at du har lastet opp filen, før du går videre til forhåndsvisningen.

Hver kolonne i filen din vises sammen med en eksempelverdi. For hver kolonne bruker du rullegardinmenyen til å velge det tilsvarende B1-feltet. Verktøyet registrerer automatisk vanlige kolonnenavn som «First Name», «Email» eller «Zip Code», men du bør gå gjennom hver rad og rette opp det verktøyet har bommet på.

Tilgjengelige B1-felt inkluderer:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — tilordner personen til en gruppe etter navn
- **Custom Field (match by name)** — lagrer kolonnen i et av menighetens [egendefinerte personfelt](../settings/custom-fields.md). En boks **B1 field name** vises, forhåndsutfylt med kolonneoverskriften. Endre den til feltets navn nøyaktig slik det står i B1 (store og små bokstaver har ingen betydning).
- **Form Answer (custom field)** — lagrer kolonnens verdi som et egendefinert felt knyttet til personens post. Hvis du bruker dette alternativet, blir du bedt om å gi skjemaet et navn.

Datoer kan være i vanlige formater som `9/17/1994` og konverteres automatisk. For egendefinerte felt godtar Ja/Nei-felt verdier som Yes, No, Y, N, True, False, 1 og 0, og flervalgsfelt godtar enten valgteksten eller verdien.

:::info
Opprett de egendefinerte personfeltene dine i B1 Admin før du importerer. Når importen er ferdig, lister steget **Custom Fields** opp kolonnenavn som ikke samsvarer med et B1-felt, og teller verdier som ikke passer til feltets type. Disse verdiene hoppes over, og resten av importen fullføres likevel.
:::

Kolonner du ikke vil importere, kan settes til **(Skip)**. Minst ett navnefelt (First Name eller Last Name) må kobles før du kan gå videre.

Klikk på **Confirm Mapping & Import** for å gå videre til forhåndsvisningen.

---

## Steg 2 - Forhåndsvis dataene dine

Etter opplasting viser verktøyet en forhåndsvisning av alt som skal importeres. Bruk fanene for å gå gjennom hver datatype:

- **People** — Listet etter husstand, med bilder hvis de er med.
- **Groups** — Organisert etter campus, gudstjeneste, tidspunkt og kategori.
- **Attendance** — Datoer for samlinger, grupper og antall besøk.
- **Donations** — Batcher, fond, givere og beløp.
- **Forms** — Skjemanavn og innholdstyper.

Gå gjennom dette nøye før du fortsetter. Hvis noe ser feil ut, klikk på **Start Over** og rett opp kildefilen.

---

## Steg 3 - Velg målet ditt

Velg hvor du vil at dataene skal havne:

- **B1 Database** — Importerer direkte inn i menighetens B1-database. Etter at du har valgt dette, viser verktøyet et endelig antall poster som skal legges til. Klikk på **Start Transfer** for å bekrefte.
- **B1 Export Zip** — Laster ned dataene dine som en zip-fil i B1-format, som senere kan gjenopprettes med **B1 Import Zip**. Godt for sikkerhetskopier.
- **Breeze Export Zip** — Konverterer dataene dine til Breeze-format.
- **Planning Center Zip** — Konverterer dataene dine til Planning Center-format.

:::warning
Kilden og målet kan ikke være samme format. Hvis de er like, advarer verktøyet deg for å forhindre utilsiktet duplisering.
:::

---

## Steg 4 - Kjør

Verktøyet behandler overføringen og viser fremdrift for hvert steg:

- Campuses, Services og Times
- People
- Photos
- Groups og Group Members
- Donations
- Attendance
- Forms, Questions, Answers og Form Submissions
- Custom Fields (når du har koblet noen Custom Field-kolonner)
- Compressing (kun for zip-filmål)

Når målet er **B1 Database**, har fremdriftskortet tittelen **Import Progress** og avsluttes med **Import Complete!** (eller **Import Completed with Errors**). For zip-filmål sier de samme meldingene **Export**.

:::info
Ved gjenoppretting av en **B1 Import Zip** hoppes poster som peker på noe som ikke lenger finnes i filen over, i stedet for at importen stopper. Dette gjelder gruppemedlemskap for personer eller grupper som ikke finnes i zip-filen, oppmøte for slettede grupper eller personer, og koblinger mellom grupper og slettede gudstjenestetidspunkter. Oppmøtesamlinger som aldri var knyttet til et gudstjenestetidspunkt, gjenopprettes likevel. Tilsvarende, når du eksporterer, utelates et bilde som ikke kan lastes ned eller leses, slik at steget **Photos** fortsetter.
:::

:::warning
Lukk ikke nettleseren mens overføringen pågår. Vent til alle steg viser som fullført.
:::

---

## Forberede en Breeze Import Zip

1. I Breeze går du til **Settings** og klikker på **Export** i venstre sidemeny.
2. Eksporter tre separate filer: **People**, **Tags** og **Contributions**.
3. Velg alle tre filene, høyreklikk, og pakk dem sammen i én zip-fil.
   - På en Mac: velg filene, høyreklikk, og velg **Compress**.
   - På en PC: velg filene, høyreklikk, velg **Send to**, og deretter **Compressed (zipped) folder**.
4. Last opp zip-filen med alternativet **Breeze Import Zip** i steg 1.

Breeze-importen overfører personer, grupper (tags) og gaveregistreringer automatisk.

---

## Forberede en Planning Center-eksport

1. Logg inn på Planning Center og åpne produktet **People**.
2. Klikk på **Lists** i venstre sidemeny og lag en liste som inkluderer alle du vil ta med. (Hvis du allerede har en liste over hele menigheten, bruk den.)
3. Åpne listen og bruk alternativet **export** for å laste ned personene dine som en **CSV**-fil. Ta med feltene du vil beholde — navn, e-post, telefon, adresse, fødselsdato, kjønn og medlemsstatus blir alle koblet til B1.
4. Hvis Planning Center gir deg mer enn én fil, velg dem alle, høyreklikk, og pakk dem sammen i én zip-fil.
   - På en Mac: velg filene, høyreklikk, og velg **Compress**.
   - På en PC: velg filene, høyreklikk, velg **Send to**, og deretter **Compressed (zipped) folder**.
5. Last opp CSV-filen eller zip-filen med alternativet **Planning Center Zip** i steg 1.

Etter opplasting går du videre til forhåndsvisningen og bekrefter at personene og husstandene dine ser riktige ut før du kjører importen.

---

## Forberede en Tithe.ly-eksport

1. I Tithe.ly eksporterer du **People**-dataene dine som en CSV- eller Excel-fil. Du kan også eksportere en egen **Giving**-fil hvis du vil ta med gaveregistreringer.
2. Verktøyet registrerer automatisk om filen inneholder person- eller givingsdata, basert på kolonnenavnene.
3. Last opp filen med alternativet **Tithe.ly CSV** i steg 1.

:::info
Tithe.ly-eksporter kan importeres én fil om gangen. Kjør prosessen to ganger hvis du må importere både personer og gaver hver for seg.
:::

---

## Forberede en CCB- eller Pushpay-eksport

1. I Church Community Builder eller Pushpay eksporterer du **People**-dataene dine som en CSV-fil. Du kan også eksportere en egen fil for giving/bidrag.
2. Verktøyet registrerer automatisk om filen inneholder person- eller givingsdata, basert på kolonnenavnene.
3. Last opp filen med alternativet **CCB / Pushpay CSV** i steg 1.

---

## Etter importen

Når overføringen er ferdig, bruk noen minutter på å kontrollere dataene dine:

1. Bla gjennom siden [People](../people/adding-people.md) og stikkprøv noen profiler.
2. Bekreft at navn, e-postadresser, telefonnumre og adresser kom korrekt over.
3. Sjekk at husstandsforbindelsene er intakte. Hver persons husstandsrolle (Head, Spouse, Child eller Other) overføres når kilden har en: kolonnen **householdRole** i en B1 Import Zip, **Family Role** i Breeze eller Tithe.ly, og **Family Position** i CCB / Pushpay. Roller som «Head of Household», «Primary», «Wife» eller «Son» konverteres til tilsvarende B1-rolle. Planning Center- og Custom CSV / Excel-importer har ingen rollekolonne, så disse personene settes til **Other**; du kan endre rollen fra personens husstand på [People](../people/adding-people.md#managing-households)-siden.
4. Gå gjennom importerte grupper og gaveregistreringer.

Hvis du oppdager problemer, kan du redigere enkeltprofiler fra People-siden. Du kan også kjøre overføringsverktøyet på nytt for å [eksportere dataene dine](exporting-data.md) som en sikkerhetskopi.

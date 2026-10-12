---
title: "Importere data"
---

# Importere data

<div class="article-intro">

B1 Transfer-verktøyet gjør det enkelt å føre eksisterende data inn i B1, enten du starter på nytt fra et regneark, flytter fra en annen plattform for menighetsadministrasjon, eller importerer givingsposter. Det kan også brukes til å eksportere eller sikkerhetskopiere dataene dine når som helst.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tilgang til **Innstillinger**.
- Ha dataene dine eksportert og klare fra det forrige systemet før du starter.
- Dette verktøyet er beregnet for innledende datamigrering. Hvis du allerede har brukt B1 en stund, kan ny import skape dupliserte poster.

</div>

## Åpne Transfer-verktøyet

1. Logg inn på **B1 Admin**.
2. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Innstillinger**, og klikk **Innstillinger**.
3. Klikk lenken **Import/Eksport** under menighetens navn øverst i den venstre innstillingsmenyen.
4. Dette åpner **B1 Transfer**-verktøyet i en ny fane på [transfer.b1.church](https://transfer.b1.church).

Transfer-verktøyet leder deg gjennom fire trinn: Kilde, Forhåndsvisning, Mål og Kjør.

---

## Trinn 1 - Velg kilden din

Velg hvor dataene dine kommer fra. Det finnes sju alternativer:

- **B1-database** — Henter data direkte fra din eksisterende B1-menighet. Nyttig for å lage en sikkerhetskopi eller konvertere dataene til et annet format. Du må være innlogget for å bruke dette alternativet.
- **B1-importzip** — En zipfil i B1s eget format. Brukes primært for å gjenopprette en tidligere B1-eksport.
- **Breeze-importzip** — En zipfil med eksporterte filer fra Breeze ChMS.
- **Planning Center-zip** — En zip- eller CSV-fil eksportert fra Planning Center.
- **Egendefinert CSV / Excel** — Enhver CSV- eller Excel-fil med personopplysninger. Etter opplasting må du koble kolonnene dine til B1-felt før importen fortsetter.
- **Tithe.ly CSV** — En person- eller givingseksportfil fra Tithe.ly (CSV- eller Excel-format godtas).
- **CCB / Pushpay CSV** — En person- eller giving-CSV-eksport fra Church Community Builder eller Pushpay.

Du kan dra og slippe filen din over opplastingsområdet, eller klikke for å bla etter den.

---

## Trinn 1b - Koble feltene dine (kun Egendefinert CSV / Excel)

Hvis du valgte **Egendefinert CSV / Excel**, viser verktøyet et bilde for feltkobling etter at du har lastet opp filen, før du går videre til forhåndsvisningen.

Hver kolonne i filen din vises sammen med en eksempelverdi. For hver kolonne bruker du rullegardinmenyen til å velge det tilsvarende B1-feltet. Verktøyet gjenkjenner automatisk vanlige kolonnenavn som «First Name», «Email» eller «Zip Code», men du bør gå gjennom hver rad og rette det som ble oversett.

Tilgjengelige B1-felt inkluderer:

- Fornavn, Etternavn, Mellomnavn, Kallenavn, Visningsnavn, Tittel/prefiks, Suffiks
- E-post, Hjemmetelefon, Mobiltelefon, Jobbtelefon
- Adresselinje 1, Adresselinje 2, By, Fylke/delstat, Postnummer
- Fødselsdato, Bryllupsdato, Kjønn, Sivilstand, Medlemsstatus
- Husstands-/familienavn
- Gruppenavn — knytter personen til en gruppe etter navn
- **Egendefinert felt (samsvar på navn)** — lagrer kolonnen i ett av menighetens [egendefinerte personfelt](../settings/custom-fields.md). En boks **B1-feltnavn** vises, fylt ut med kolonneoverskriften. Endre den til feltets navn nøyaktig slik det vises i B1 (store og små bokstaver spiller ingen rolle).
- **Skjemasvar (egendefinert felt)** — lagrer kolonnens verdi som et egendefinert felt knyttet til personens post. Hvis du bruker dette alternativet, blir du bedt om å gi skjemaet et navn.

Datoer kan være i vanlige formater som `9/17/1994` og konverteres automatisk. For egendefinerte felt aksepterer Ja/Nei-felt verdier som Yes, No, Y, N, True, False, 1 og 0, og flervalgsfelt aksepterer enten valgteksten eller verdien.

:::info
Opprett de egendefinerte personfeltene dine i B1 Admin før du importerer. Når importen er ferdig, viser steget **Egendefinerte felt** alle kolonnenavn som ikke samsvarer med et B1-felt, og teller verdier som ikke passer til feltets type. Disse verdiene hoppes over, og resten av importen fullføres likevel.
:::

Kolonner du ikke vil importere, kan settes til **(Hopp over)**. Minst ett navnefelt (Fornavn eller Etternavn) må kobles før du kan fortsette.

Klikk **Bekreft kobling og importer** for å gå videre til forhåndsvisningen.

---

## Trinn 2 - Forhåndsvis dataene dine

Etter opplasting viser verktøyet en forhåndsvisning av alt som vil bli importert. Bruk fanene for å gå gjennom hver datatype:

- **Personer** — Listet etter husstand, med bilder hvis de er inkludert.
- **Grupper** — Organisert etter campus, gudstjeneste, tidspunkt og kategori.
- **Oppmøte** — Øktdatoer, grupper og antall besøk.
- **Gaver** — Batcher, fond, givere og beløp.
- **Skjemaer** — Skjemanavn og innholdstyper.

Gå gjennom dette nøye før du fortsetter. Hvis noe ser feil ut, klikk **Start på nytt** og rett kildefilen din.

---

## Trinn 3 - Velg målet ditt

Velg hvor du vil at dataene skal gå:

- **B1-database** — Importerer direkte inn i menighetens B1-database. Etter at du har valgt dette, viser verktøyet en endelig telling av postene som skal legges til. Klikk **Start overføring** for å bekrefte.
- **B1-eksportzip** — Laster ned dataene dine som en zipfil i B1-format. Godt for sikkerhetskopier.
- **Breeze-eksportzip** — Konverterer dataene dine til Breeze-format.
- **Planning Center-zip** — Konverterer dataene dine til Planning Center-format.

:::warning
Kilde og mål kan ikke være samme format. Hvis de samsvarer, advarer verktøyet deg for å forhindre utilsiktet duplisering.
:::

---

## Trinn 4 - Kjør

Verktøyet behandler overføringen og viser fremdrift for hvert steg:

- Campus, gudstjenester og tidspunkter
- Personer
- Bilder
- Grupper og gruppemedlemmer
- Gaver
- Oppmøte
- Skjemaer, spørsmål, svar og skjemainnsendinger
- Egendefinerte felt (når du har koblet noen kolonner for egendefinerte felt)
- Komprimering (kun for zipfil-mål)

Når målet er **B1-database**, har fremdriftskortet tittelen **Importfremdrift** og avsluttes med **Import fullført!** (eller **Import fullført med feil**). For zipfil-mål sier de samme meldingene **Eksport**.

:::warning
Lukk ikke nettleseren mens overføringen pågår. Vent til alle steg viser som fullført.
:::

---

## Forberede en Breeze-importzip

1. I Breeze går du til **Settings** og klikker **Export** i venstre sidemeny.
2. Eksporter tre separate filer: **People**, **Tags** og **Contributions**.
3. Velg alle tre filene, høyreklikk, og komprimer dem til én zipfil.
   - På Mac: velg filene, høyreklikk, og velg **Compress**.
   - På PC: velg filene, høyreklikk, velg **Send to**, deretter **Compressed (zipped) folder**.
4. Last opp zipfilen med alternativet **Breeze-importzip** i trinn 1.

Breeze-importen overfører personer, grupper (tagger) og gaveposter automatisk.

---

## Forberede en Planning Center-eksport

1. Logg inn på Planning Center og åpne produktet **People**.
2. I venstre sidemeny klikker du **Lists** og lager en liste som inkluderer alle du vil overføre. (Hvis du allerede har en liste over hele menigheten, bruk den.)
3. Åpne listen og bruk alternativet **export** for å laste ned personene dine som en **CSV**-fil. Ta med feltene du vil beholde – navn, e-post, telefon, adresse, fødselsdato, kjønn og medlemsstatus overføres alle til B1.
4. Hvis Planning Center gir deg mer enn én fil, velg dem alle, høyreklikk, og komprimer dem til én zipfil.
   - På Mac: velg filene, høyreklikk, og velg **Compress**.
   - På PC: velg filene, høyreklikk, velg **Send to**, deretter **Compressed (zipped) folder**.
5. Last opp CSV-filen eller zipfilen med alternativet **Planning Center-zip** i trinn 1.

Etter opplasting fortsetter du til forhåndsvisningen og bekrefter at personene og husstandene dine ser riktige ut før du kjører importen.

---

## Forberede en Tithe.ly-eksport

1. I Tithe.ly eksporterer du **People**-dataene dine som en CSV- eller Excel-fil. Du kan også eksportere en egen **Giving**-fil hvis du vil ta med gaveposter.
2. Verktøyet oppdager automatisk om filen inneholder person- eller givingsdata, basert på kolonnenavnene.
3. Last opp filen med alternativet **Tithe.ly CSV** i trinn 1.

:::info
Tithe.ly-eksporter kan importeres én fil om gangen. Kjør prosessen to ganger hvis du trenger å importere både personer og givingsposter hver for seg.
:::

---

## Forberede en CCB- eller Pushpay-eksport

1. I Church Community Builder eller Pushpay eksporterer du **People**-dataene dine som en CSV-fil. Du kan også eksportere en egen giving-/bidragsfil.
2. Verktøyet oppdager automatisk om filen inneholder person- eller givingsdata, basert på kolonnenavnene.
3. Last opp filen med alternativet **CCB / Pushpay CSV** i trinn 1.

---

## Etter importen

Når overføringen er fullført, bruk noen minutter på å kontrollere dataene dine:

1. Bla gjennom siden [Personer](../people/adding-people.md) og sjekk noen profiler stikkprøvevis.
2. Bekreft at navn, e-poster, telefonnumre og adresser kom gjennom riktig.
3. Sjekk at husstandstilknytningene er intakte. Hver persons husstandsrolle (Hode, Ektefelle, Barn eller Annet) overføres når kilden har en: kolonnen **householdRole** i en B1-importzip, **Family Role** i Breeze eller Tithe.ly, og **Family Position** i CCB / Pushpay. Roller som «Head of Household», «Primary», «Wife» eller «Son» konverteres til den tilsvarende B1-rollen. Planning Center- og egendefinerte CSV / Excel-importer har ingen rollekolonne, så disse personene settes til **Annet**; du kan endre rollen fra personens husstand på siden [Personer](../people/adding-people.md#managing-households).
4. Gjennomgå eventuelle importerte grupper og gaveposter.

Hvis du oppdager problemer, kan du redigere enkeltprofiler fra Personer-siden. Du kan også kjøre overføringsverktøyet på nytt for å [eksportere dataene dine](exporting-data.md) som en sikkerhetskopi.

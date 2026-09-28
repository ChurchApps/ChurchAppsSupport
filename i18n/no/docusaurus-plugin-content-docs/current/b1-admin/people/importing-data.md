---
title: "Importering av data"
---

# Importering av data

<div class="article-intro">

B1-overføringsverktøyet gjør det enkelt å bringe eksisterende data inn i B1, enten du starter på nytt fra et regneark, migrerer fra en annen kirkledelsesplattform eller importerer donasjonsposter. Det kan også brukes til å eksportere eller sikkerhetskopiere dataene dine når som helst.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må ha en aktiv B1 Admin-konto med tilgang til **Innstillinger**.
- Ha dataene dine eksportert og klar fra forrige system før du starter.
- Dette verktøyet er ment for innledende dataflytting. Hvis du allerede har brukt B1 en stund, kan import igjen opprette duplikat poster.

</div>

## Tilgang til overføringsverktøyet

1. Logg inn på **B1 Admin**.
2. Åpne **seksjonsmeny** i øverste venstre hjørne (seksjonsnavn med liten pil) og velg **Innstillinger**.
3. Klikk på **Import/eksport**-knappen øverst til høyre på sidetittelfeltet.
4. Dette åpner **B1-overføring**-verktøyet i en ny fane på [transfer.b1.church](https://transfer.b1.church).

Overføringsverktøyet leder deg gjennom fire trinn: Kilde, Forhåndsvisning, Destinasjon og Kjør.

---

## Trinn 1 - Velg kilde

Velg hvor dataene dine kommer fra. Det er syv valg:

- **B1-database** -- Trekker data direkte fra eksisterende B1-kirke din. Nyttig for å lage sikkerhetskopi eller konvertere dataene dine til et annet format. Du må være logget inn for å bruke dette valget.
- **B1-import ZIP** -- En ZIP-fil i B1s eget format. Dette brukes hovedsakelig til å gjenopprette en tidligere B1-eksport.
- **Breeze-import ZIP** -- En ZIP-fil som inneholder eksporterte filer fra Breeze ChMS.
- **Planning Center ZIP** -- En ZIP- eller CSV-fil eksportert fra Planning Center.
- **Egendefinert CSV/Excel** -- En CSV- eller Excel-fil som inneholder persondata. Etter opplasting, vil du kartlegge kolonnene dine til B1-felt før importen fortsetter.
- **Tithe.ly CSV** -- En personer- eller donasjonseksportfil fra Tithe.ly (CSV- eller Excel-format godtatt).
- **CCB/Pushpay CSV** -- En personer- eller donasjons-eksport CSV fra Church Community Builder eller Pushpay.

Du kan dra og slippe filen din på opplastingsområdet, eller klikk for å bla etter den.

---

## Trinn 1b - Kartlegg feltene dine (bare egendefinert CSV/Excel)

Hvis du valgte **Egendefinert CSV/Excel**, etter opplasting av filen din, vil verktøyet vise en feltkartkartskjerm før du går til forhåndsvisningen.

Hver kolonne fra filen din er oppført sammen med en eksempelverdi. For hver kolonne, bruk rullegardinmenyen for å velge det samsvarende B1-feltet. Verktøyet vil automatisk oppdage vanlige kolonnenavn som "Fornavn", "E-post" eller "Postnummer", men du bør gjennomgå hver rad og korrigere alt det gikk glipp av.

Tilgjengelige B1-felt inkluderer:

- Fornavn, Etternavn, Mellomtall, Kallenavn, Visningsnavn, Tittel/Prefiks, Suffiks
- E-post, Hjemmetelefon, Mobiltelefon, Arbeidstelefon
- Adresselinje 1, Adresselinje 2, By, Fylke, Postnummer
- Fødselsdato, Årsdagen, Kjønn, Sivilstand, Medlemskapsstatus
- Husholdning/familienavn
- Gruppenavn -- tildeler personen til en gruppe etter navn
- **Egendefinert felt (samsvarer etter navn)** -- lagrer kolonnen i et av kirkens [egendefinerte personfelter](../settings/custom-fields.md). En **B1-feltnavn**-boks vises, fylt med kolonneoverskriften. Endre den til feltets navn nøyaktig slik det vises i B1 (kapitalisering spiller ingen rolle).
- **Skjemarespons (egendefinert felt)** -- lagrer den kolonnens verdi som et egendefinert felt knyttet til personens oppføring. Hvis du bruker dette valget, blir du bedt om å gi skjemaet et navn.

Datoer kan være i vanlige formater som `9/17/1994` og konverteres automatisk. For egendefinerte felt, godtar Ja/Nei-felt verdier som Ja, Nei, J, N, Sann, Usann, 1 og 0, og flervalgsfelter godtar enten valgsteksten eller verdien.

:::info
Opprett egendefinerte personfelter dine i B1 Admin før du importerer. Når importen er ferdig, viser **Egendefinerte felt**-trinnet alle kolonnenavn som ikke samsvarer med et B1-felt og teller alle verdier som ikke passer til feltets type. Disse verdiene hoppes over, og resten av importen fullfører likevel.
:::

Kolonner du ikke vil importere kan settes til **(Skip)**. Minst ett navnefelt (Fornavn eller Etternavn) må kartlegges før du kan fortsette.

Klikk **Bekreft kartlegging og import** for å fortsette til forhåndsvisningen.

---

## Trinn 2 - Forhåndsvis dataene dine

Etter opplasting, viser verktøyet en forhåndsvisning av alt som vil importeres. Bruk fanene for å gjennomgå hver datatype:

- **Personer** -- Listet etter husholdning, med bilder hvis inkludert.
- **Grupper** -- Organisert etter campus, service, tid og kategori.
- **Frammøte** -- Økto datoer, grupper og besøktellinger.
- **Donasjoner** -- Batcher, fond, donatorer og beløp.
- **Skjemaer** -- Skjemanavner og innholdstyper.

Gjennomgå dette nøye før du fortsetter. Hvis noe ser galt ut, klikk **Start på nytt** og korriger kildefilen din.

---

## Trinn 3 - Velg destinasjon

Velg hvor du vil at dataene skal gå:

- **B1-database** -- Importerer direkte inn i kirkens B1-database. Etter å ha valgt dette, vil verktøyet vise en endelig telling av poster som skal legges til. Klikk **Start overføring** for å bekrefte.
- **B1-eksport ZIP** -- Laster ned dataene dine som en B1-format ZIP-fil. Bra for sikkerhetskopier.
- **Breeze-eksport ZIP** -- Konverterer dataene dine til Breeze-format.
- **Planning Center ZIP** -- Konverterer dataene dine til Planning Center-format.

:::warning
Kilden og destinasjonen kan ikke være samme format. Hvis de samsvarer, vil verktøyet advare deg for å forhindre utilsiktet duplisering.
:::

---

## Trinn 4 - Kjør

Verktøyet behandler overføringen og viser fremdrift for hvert trinn:

- Campus, tjenester og tider
- Personer
- Bilder
- Grupper og gruppmedlemmer
- Donasjoner
- Frammøte
- Skjemaer, spørsmål, svar og skjemainnlevering
- Egendefinerte felt (når du kartlegger noen egendefinerte feltkolonner)
- Komprimering (bare for ZIP-fildestinasjon)

:::warning
Lukk ikke nettleseren mens overføringen kjører. Vent til alle trinn viser som fullstendige.
:::

---

## Forberede en Breeze-import ZIP

1. I Breeze, gå til **Innstillinger** og klikk **Eksport** i venstre sidefelt.
2. Eksporter tre separate filer: **People**, **Tags** og **Bidrag**.
3. Velg alle tre filene, høyreklikk og komprimer dem inn i en enkelt ZIP-fil.
   - På en Mac: velg filene, høyreklikk og velg **Komprimer**.
   - På en PC: velg filene, høyreklikk, velg **Send til**, deretter **Komprimert (zippet) mappe**.
4. Last opp ZIP-filen ved å bruke **Breeze-import ZIP**-valget i trinn 1.

Breeze-importen overfører personer, grupper (etiketter) og donasjonsposter automatisk.

---

## Forberedelse av en Planning Center-eksport

1. Logg inn på Planning Center og åpne **Mennesker**-produktet.
2. I venstre sidefelt, klikk **Lister** og opprett en liste som inkluderer alle du vil bringe over. (Hvis du allerede har en liste over hele menigheten, bruk den.)
3. Åpne listen og bruk dens **eksport**-valget for å laste ned mennesker dine som en **CSV**-fil. Inkluder feltene du vil beholde -- navn, e-post, telefon, adresse, fødselsdato, kjønn og medlemskapsstatus alle kartlegges over til B1.
4. Hvis Planning Center gir deg mer enn en fil, velg dem alle, høyreklikk og komprimer dem inn i en enkelt ZIP.
   - På en Mac: velg filene, høyreklikk og velg **Komprimer**.
   - På en PC: velg filene, høyreklikk, velg **Send til**, deretter **Komprimert (zippet) mappe**.
5. Last opp CSV eller ZIP ved å bruke **Planning Center ZIP**-valget i trinn 1.

Etter opplasting, gå til forhåndsvisningen og bekreft at mennesker og husstander dine ser riktig ut før du kjører importen.

---

## Forberedelse av en Tithe.ly-eksport

1. I Tithe.ly, eksporter **Mennesker**-dataene dine som en CSV- eller Excel-fil. Du kan også eksportere en separat **Givende**-fil hvis du vil bringe donasjonsposter.
2. Verktøyet vil automatisk oppdage om filen inneholder personer- eller donasjondata basert på kolonnenavnene.
3. Last opp filen ved å bruke **Tithe.ly CSV**-valget i trinn 1.

:::info
Tithe.ly-eksporten kan importeres en fil av gangen. Kjør prosessen to ganger hvis du må importere både personer og donasjonsposter separat.
:::

---

## Forberedelse av en CCB eller Pushpay-eksport

1. I Church Community Builder eller Pushpay, eksporter **Mennesker**-dataene dine som en CSV-fil. Du kan også eksportere en separat givende/bidragssfil.
2. Verktøyet vil automatisk oppdage om filen inneholder personer- eller donasjondata basert på kolonnenavnene.
3. Last opp filen ved å bruke **CCB/Pushpay CSV**-valget i trinn 1.

---

## Etter import

Når overføringen er fullstendig, ta noen få minutter til å verifisere dataene dine:

1. Bla gjennom [Mennesker](../people/adding-people.md)-siden og plassekontroll noen få profiler.
2. Bekreft at navn, e-poster, telefonnumre og adresser kom gjennom korrekt.
3. Sjekk at husstandstilkoblingene er intakte.
4. Gjennomgå eventuelle importerte grupper og donasjonsposter.

Hvis du legger merke til problemer, kan du redigere individuelle profiler fra mennesker-siden. Du kan også kjøre overføringsverktøyet igjen for å [eksportere dataene dine](exporting-data.md) som sikkerhetskopi.

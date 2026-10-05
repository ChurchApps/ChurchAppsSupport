---
title: "Importere data"
---

# Importere data

<div class="article-intro">

Verktøyet B1 Transfer gjør det enkelt å hente inn eksisterende data i B1, enten du starter på nytt fra et regneark, flytter over fra en annen plattform for menighetsadministrasjon eller importerer gaveregistreringer. Det kan også brukes til å eksportere eller sikkerhetskopiere dataene dine når som helst.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tilgang til **Innstillinger**.
- Ha dataene eksportert og klare fra det tidligere systemet før du starter.
- Dette verktøyet er ment for den første dataflyttingen. Hvis du allerede har brukt B1 en stund, kan en ny import skape duplikater.

</div>

## Åpne overføringsverktøyet

1. Logg inn på **B1 Admin**.
2. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Innstillinger** og klikk på **Innstillinger**.
3. Klikk på knappen **Import/eksport** øverst til høyre i sidehodet.
4. Da åpnes verktøyet **B1 Transfer** i en ny fane på [transfer.b1.church](https://transfer.b1.church).

Overføringsverktøyet tar deg gjennom fire trinn: Kilde, Forhåndsvisning, Mål og Kjør.

---

## Trinn 1 - Velg kilde

Velg hvor dataene dine kommer fra. Det er sju alternativer:

- **B1 Database** — Henter data direkte fra din eksisterende B1-menighet. Nyttig for å ta sikkerhetskopi eller konvertere dataene til et annet format. Du må være logget inn for å bruke dette alternativet.
- **B1 Import Zip** — En zip-fil i B1s eget format. Brukes først og fremst for å gjenopprette en tidligere B1-eksport.
- **Breeze Import Zip** — En zip-fil med eksporterte filer fra Breeze ChMS.
- **Planning Center Zip** — En zip- eller CSV-fil eksportert fra Planning Center.
- **Egendefinert CSV / Excel** — En hvilken som helst CSV- eller Excel-fil med persondata. Etter opplasting kobler du kolonnene dine til B1-felt før importen fortsetter.
- **Tithe.ly CSV** — En eksportfil med personer eller gaver fra Tithe.ly (CSV- eller Excel-format godtas).
- **CCB / Pushpay CSV** — En CSV-eksportfil med personer eller gaver fra Church Community Builder eller Pushpay.

Du kan dra og slippe filen i opplastingsfeltet, eller klikke for å finne den.

---

## Trinn 1b - Koble feltene dine (bare egendefinert CSV / Excel)

Hvis du valgte **Egendefinert CSV / Excel**, viser verktøyet en skjerm for feltkobling etter at du har lastet opp filen, før det går videre til forhåndsvisningen.

Hver kolonne fra filen din vises sammen med en eksempelverdi. For hver kolonne bruker du nedtrekkslisten til å velge det tilsvarende B1-feltet. Verktøyet gjenkjenner automatisk vanlige kolonnenavn som «Fornavn», «E-post» eller «Postnummer», men du bør se gjennom hver rad og rette opp det som er oversett.

Tilgjengelige B1-felt omfatter:

- Fornavn, Etternavn, Mellomnavn, Kallenavn, Visningsnavn, Tittel/prefiks, Suffiks
- E-post, Hjemmetelefon, Mobiltelefon, Arbeidstelefon
- Adresselinje 1, Adresselinje 2, By, Fylke/delstat, Postnummer
- Fødselsdato, Jubileum, Kjønn, Sivilstatus, Medlemsstatus
- Husstands-/familienavn
- Gruppenavn — knytter personen til en gruppe etter navn
- **Egendefinert felt (koble på navn)** — lagrer kolonnen i et av menighetens [egendefinerte personfelt](../settings/custom-fields.md). Et felt **B1-feltnavn** vises, utfylt med kolonneoverskriften. Endre det til feltets navn nøyaktig slik det står i B1 (store og små bokstaver spiller ingen rolle).
- **Skjemasvar (egendefinert felt)** — lagrer kolonnens verdi som et egendefinert felt knyttet til personens post. Hvis du bruker dette alternativet, blir du bedt om å gi skjemaet et navn.

Datoer kan ha vanlige formater som `9/17/1994` og konverteres automatisk. For egendefinerte felt godtar ja/nei-felt verdier som Yes, No, Y, N, True, False, 1 og 0, og flervalgsfelt godtar enten valgteksten eller verdien.

:::info
Opprett de egendefinerte personfeltene dine i B1 Admin før du importerer. Når importen er ferdig, viser trinnet **Egendefinerte felt** alle kolonnenavn som ikke samsvarer med et B1-felt, og teller verdier som ikke passer til felttypen. Disse verdiene hoppes over, og resten av importen fullføres likevel.
:::

Kolonner du ikke vil importere, kan settes til **(Hopp over)**. Minst ett navnefelt (Fornavn eller Etternavn) må være koblet før du kan fortsette.

Klikk på **Bekreft kobling og importer** for å gå videre til forhåndsvisningen.

---

## Trinn 2 - Forhåndsvis dataene

Etter opplasting viser verktøyet en forhåndsvisning av alt som skal importeres. Bruk fanene for å gå gjennom hver datatype:

- **Personer** — Oppført etter husstand, med bilder hvis de er inkludert.
- **Grupper** — Organisert etter avdeling, samling, tid og kategori.
- **Oppmøte** — Øktdatoer, grupper og antall besøk.
- **Gaver** — Gavebunter, fond, givere og beløp.
- **Skjemaer** — Skjemanavn og innholdstyper.

Se nøye gjennom dette før du går videre. Hvis noe ser feil ut, klikker du på **Start på nytt** og retter opp kildefilen.

---

## Trinn 3 - Velg mål

Velg hvor dataene skal havne:

- **B1 Database** — Importerer direkte til menighetens B1-database. Når du har valgt dette, viser verktøyet et endelig antall poster som skal legges til. Klikk på **Start overføring** for å bekrefte.
- **B1 Export Zip** — Laster ned dataene som en zip-fil i B1-format. Bra for sikkerhetskopier.
- **Breeze Export Zip** — Konverterer dataene til Breeze-format.
- **Planning Center Zip** — Konverterer dataene til Planning Center-format.

:::warning
Kilden og målet kan ikke ha samme format. Hvis de er like, advarer verktøyet deg for å hindre utilsiktet duplisering.
:::

---

## Trinn 4 - Kjør

Verktøyet behandler overføringen og viser fremdriften for hvert trinn:

- Avdelinger, samlinger og tider
- Personer
- Bilder
- Grupper og gruppemedlemmer
- Gaver
- Oppmøte
- Skjemaer, spørsmål, svar og skjemainnsendinger
- Egendefinerte felt (når du har koblet noen kolonner til egendefinerte felt)
- Komprimering (bare for mål med zip-fil)

Når målet er **B1 Database**, har fremdriftskortet tittelen **Importfremdrift** og avsluttes med **Import fullført!** (eller **Import fullført med feil**). For mål med zip-fil står det **Eksport** i de samme meldingene.

:::warning
Ikke lukk nettleseren mens overføringen pågår. Vent til alle trinn vises som fullført.
:::

---

## Forberede en Breeze Import Zip

1. Gå til **Settings** i Breeze og klikk på **Export** i sidefeltet til venstre.
2. Eksporter tre separate filer: **People**, **Tags** og **Contributions**.
3. Marker alle tre filene, høyreklikk og komprimer dem til én enkelt zip-fil.
   - På Mac: marker filene, høyreklikk og velg **Komprimer**.
   - På PC: marker filene, høyreklikk, velg **Send til** og deretter **Komprimert mappe (zip)**.
4. Last opp zip-filen med alternativet **Breeze Import Zip** i trinn 1.

Breeze-importen overfører personer, grupper (tagger) og gaveregistreringer automatisk.

---

## Forberede en Planning Center-eksport

1. Logg inn på Planning Center og åpne produktet **People**.
2. Klikk på **Lists** i sidefeltet til venstre og lag en liste med alle du vil ta med deg. (Hvis du allerede har en liste over hele menigheten, bruker du den.)
3. Åpne listen og bruk **eksport**-alternativet for å laste ned personene som en **CSV**-fil. Ta med feltene du vil beholde – navn, e-post, telefon, adresse, fødselsdato, kjønn og medlemsstatus blir alle overført til B1.
4. Hvis Planning Center gir deg mer enn én fil, markerer du dem alle, høyreklikker og komprimerer dem til én zip-fil.
   - På Mac: marker filene, høyreklikk og velg **Komprimer**.
   - På PC: marker filene, høyreklikk, velg **Send til** og deretter **Komprimert mappe (zip)**.
5. Last opp CSV- eller zip-filen med alternativet **Planning Center Zip** i trinn 1.

Etter opplasting går du videre til forhåndsvisningen og kontrollerer at personene og husstandene ser riktige ut før du kjører importen.

---

## Forberede en Tithe.ly-eksport

1. Eksporter **People**-dataene dine fra Tithe.ly som CSV- eller Excel-fil. Du kan også eksportere en egen **Giving**-fil hvis du vil ta med gaveregistreringer.
2. Verktøyet gjenkjenner automatisk om filen inneholder persondata eller gavedata, ut fra kolonnenavnene.
3. Last opp filen med alternativet **Tithe.ly CSV** i trinn 1.

:::info
Tithe.ly-eksporter kan importeres én fil om gangen. Kjør prosessen to ganger hvis du må importere personer og gaveregistreringer hver for seg.
:::

---

## Forberede en CCB- eller Pushpay-eksport

1. Eksporter **People**-dataene dine fra Church Community Builder eller Pushpay som CSV-fil. Du kan også eksportere en egen fil med gaver/bidrag.
2. Verktøyet gjenkjenner automatisk om filen inneholder persondata eller gavedata, ut fra kolonnenavnene.
3. Last opp filen med alternativet **CCB / Pushpay CSV** i trinn 1.

---

## Etter importen

Når overføringen er fullført, bør du bruke noen minutter på å kontrollere dataene:

1. Bla gjennom siden [Personer](../people/adding-people.md) og stikkprøvekontroller noen profiler.
2. Bekreft at navn, e-postadresser, telefonnumre og adresser kom riktig med.
3. Kontroller at husstandskoblingene er intakte.
4. Gå gjennom importerte grupper og gaveregistreringer.

Hvis du oppdager feil, kan du redigere enkeltprofiler fra siden Personer. Du kan også kjøre overføringsverktøyet på nytt for å [eksportere dataene dine](exporting-data.md) som sikkerhetskopi.

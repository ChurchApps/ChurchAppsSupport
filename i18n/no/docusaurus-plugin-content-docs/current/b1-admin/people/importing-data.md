---
title: "Importering av data"
---

# Importering av data

<div class="article-intro">

B1 Transfer-verktøyet gjør det enkelt å bringe eksisterende data inn i B1, enten du starter frisk fra et regneark, migrerer fra et annet kirkestyrings-platform eller importerer givende-poster. Det kan også brukes til å eksportere eller sikkerhetskopiere data når som helst.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tilgang til **Innstillinger**.
- Ha dataene eksportert og klar fra tidligere system før du starter.
- Dette verktøyet er beregnet på initial datamigrering. Hvis du allerede har brukt B1 et stykke, kan importering igjen skape dupliserte poster.

</div>

## Tilgang til overføring-verktøyet

1. Logg inn i **B1 Admin**.
2. Åpne **seksjonsmenyene** i det øvre venstre hjørnet (seksjonsnavnet med den lille pilen) og velg **Innstillinger**.
3. Klikk **Importer/Eksport**-knappen i øvre høyre hjørnet av sidehode-panelet.
4. Dette åpner **B1 Transfer**-verktøyet i en ny fane på [transfer.b1.church](https://transfer.b1.church).

Overførings-verktøyet leder deg gjennom fire trinn: Kilde, forhåndsvisning, destinasjon og kjør.

---

## Trinn 1 - Velg kilde

Velg hvor dataene kommer fra. Det er syv alternativer:

- **B1-database** -- Henter data direkte fra eksisterende B1-kirke. Nyttig for å lage en sikkerhetskopi eller konvertere data til et annet format. Du må være innlogget for å bruke dette alternativet.
- **B1 Import Zip** -- En zip-fil i B1s eget format. Dette brukes først og fremst til å gjenopprette en tidligere B1-eksport.
- **Breeze Import Zip** -- En zip-fil som inneholder eksporterte filer fra Breeze ChMS.
- **Planning Center Zip** -- En zip- eller CSV-fil eksportert fra Planning Center.
- **Egendefinert CSV / Excel** -- Enhver CSV- eller Excel-fil som inneholder menneskedata. Etter opplasting vil du kartlegge kolonnene til B1-felter før importen fortsetter.
- **Tithe.ly CSV** -- En mennesker- eller givings-eksportfil fra Tithe.ly (CSV eller Excel-format akseptert).
- **CCB / Pushpay CSV** -- En mennesker- eller givings-eksport-CSV fra Church Community Builder eller Pushpay.

Du kan dra og slipp filen på opplastingsområdet, eller klikk for å bla etter den.

---

## Trinn 1b - Kartlegg feltene (kun egendefinert CSV / Excel)

Hvis du valgte **Egendefinert CSV / Excel**, vil verktøyet etter opplastingen vise en feltmapping-skjerm før det går til forhåndsvisningen.

Hver kolonne fra filen din er oppført ved siden av en eksempelverdi. For hver kolonne, bruk rullemenyene for å velge samsvarende B1-felt. Verktøyet vil automatisk oppdage vanlige kolonnenavn som "Fornavn", "E-post" eller "Postnummer", men du bør gjennomgå hver rad og korrigere hva det misset.

Tilgjengelige B1-felter inkluderer:

- Fornavn, Etternavn, Mellomnavn, Kallenavn, Visningsnavn, tittel/Prefiks, Suffiks
- E-post, Hjemel-telefon, Mobiltelefon, Arbeidstelefon
- Adresseline 1, Adresseline 2, By, Stat, Postnummer
- Fødselsdato, Kjønn, Sivilstand, Medlemskaps-status
- Husholdsnavnet / familienavn
- Gruppenavn -- tilordner personen til en gruppe etter navn
- **Skjemass-svar (egendefinert felt)** -- lagrer kolonnens verdi som et egendefinert felt knyttet til personens registrering. Hvis du bruker dette alternativet, blir du bedt om å gi skjemaet et navn.

Kolonner du ikke vil importere kan settes til **(Hopp over)**. Minst ett navnefelt (Fornavn eller Etternavn) må kartlegges før du kan fortsette.

Klikk **Bekreft kartlegging og importer** for å gå til forhåndsvisningen.

---

## Trinn 2 - Forhåndsvisning av data

Etter opplasting viser verktøyet en forhåndsvisning av alt som blir importert. Bruk fanene for å gjennomgå hver datatype:

- **Mennesker** -- Oppført etter hushold, med foto hvis inkludert.
- **Grupper** -- Organisert etter campus, gudstjeneste, tid og kategori.
- **Oppmøte** -- Økt-datoer, grupper og besøksantall.
- **Donasjoner** -- Batch-er, fond, givere og beløp.
- **Skjemaer** -- Skjemanavn og innholdstyper.

Gjennomgå dette nøye før du fortsetter. Hvis noe ser galt ut, klikk **Start på nytt** og korriger kildefilen.

---

## Trinn 3 - Velg destinasjon

Velg hvor du vil at dataene skal gå:

- **B1-database** -- Importer direkte inn i kirkens B1-database. Etter valg vil verktøyet vise en endelig telling av poster som skal legges til. Klikk **Start overføring** for å bekrefte.
- **B1 Export Zip** -- Laster ned dataene som en B1-format zip-fil. Bra for sikkerhetskopier.
- **Breeze Export Zip** -- Konverterer dataene til Breeze-format.
- **Planning Center Zip** -- Konverterer dataene til Planning Center-format.

:::warning
Kilden og destinasjonen kan ikke være samme format. Hvis de samsvarer, vil verktøyet advare deg for å forhindre utilsiktet dobling.
:::

---

## Trinn 4 - Kjør

Verktøyet behandler overføringen og viser fremgang for hvert trinn:

- Campuser, gudstjenester og tider
- Mennesker
- Foto
- Grupper og gruppemedlemmer
- Donasjoner
- Oppmøte
- Skjemaer, spørsmål, svar og skjemainnsendelser
- Komprimering (kun for zip-fil-destinasjoner)

:::warning
Lukk ikke nettleseren mens overføringen kjører. Vent til alle trinn viser som fullført.
:::

---

## Forberedelse av Breeze Import Zip

1. I Breeze, gå til **Innstillinger** og klikk **Eksport** i venstre sidestolpe.
2. Eksporter tre separate filer: **Mennesker**, **Etiketter** og **Bidrag**.
3. Velg alle tre filene, høyreklikk og komprimer dem til en enkelt zip-fil.
   - På en Mac: velg filene, høyreklikk og velg **Komprimer**.
   - På en PC: velg filene, høyreklikk, velg **Send til**, deretter **Komprimert (zippet) mappe**.
4. Last opp zip-filen ved hjelp av **Breeze Import Zip**-alternativet i Trinn 1.

Breeze-importen overfører mennesker, grupper (etiketter) og donasjon-poster automatisk.

---

## Forberedelse av Planning Center-eksport

1. I Planning Center, eksporter menneske-dataene som CSV- eller zip-fil.
2. Last det opp ved hjelp av **Planning Center Zip**-alternativet i Trinn 1.

---

## Forberedelse av Tithe.ly-eksport

1. I Tithe.ly, eksporter **Mennesker**-data som CSV- eller Excel-fil. Du kan også eksportere en separat **Giving**-fil hvis du vil bringe donasjon-poster.
2. Verktøyet vil automatisk oppdage om filen inneholder mennesker eller givinggs-data basert på kolonnenavn.
3. Last den opp ved hjelp av **Tithe.ly CSV**-alternativet i Trinn 1.

:::info
Tithe.ly-eksporer kan importeres en fil om gangen. Kjør prosessen to ganger hvis du trenger å importere både mennesker og givings-poster separat.
:::

---

## Forberedelse av CCB- eller Pushpay-eksport

1. I Church Community Builder eller Pushpay, eksporter **Mennesker**-data som CSV-fil. Du kan også eksportere en separat giving/bidrag-fil.
2. Verktøyet vil automatisk oppdage om filen inneholder mennesker eller givinggs-data basert på kolonnenavn.
3. Last det opp ved hjelp av **CCB / Pushpay CSV**-alternativet i Trinn 1.

---

## Etter importering

Når overføringen er fullført, ta noen minutter til å verifisere dataene:

1. Bla gjennom [Mennesker](../people/adding-people.md)-siden og spot-sjekk noen få profiler.
2. Bekreft at navn, e-post, telefonnumre og adresser kom gjennom riktig.
3. Sjekk at hushold-forbindelser er intakte.
4. Gjennomgå alle importerte grupper og givings-poster.

Hvis du merker problemer, kan du redigere individuelle profiler fra mennesker-siden. Du kan også kjøre overførings-verktøyet igjen for å [eksportere dataene](exporting-data.md) som sikkerhetskopi.

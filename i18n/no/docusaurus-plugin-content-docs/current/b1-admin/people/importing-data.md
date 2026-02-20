---
title: "Importere data"
---

# Importere data

<div class="article-intro">

B1 Admin gjør det enkelt å importere eksisterende medlemsdata inn i systemet. Enten du migrerer fra en annen menighetsstyringsplattform eller laster inn poster fra et regneark, sparer importverktøyene deg fra å manuelt legge inn hver enkelt person. Du kan importere fra en CSV-fil eller migrere direkte fra Breeze ChMS.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tilgang til **Innstillinger**. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Ha medlemsdataene dine klare i et regneark eller eksportert fra det forrige systemet ditt.
- Hvis du migrerer fra Breeze, sørg for at du har eksportert People-, Tags- og Contributions-filene fra Breeze først.

</div>

## Importere fra CSV

Hvis du har medlemsdata i et regneark eller et annet system, kan du importere dem ved hjelp av en CSV-fil (kommaseparerte verdier).

1. Gå til **Innstillinger** i venstre sidefelt.
2. Klikk på **Import/Eksport** i toppnavigasjonen.
3. Velg **B1 Import Zip** fra **Datakilde**-rullegardinmenyen.
4. Klikk på lenken for å **laste ned eksempelfiler** slik at du kan se det forventede formatet.
5. Åpne eksempelfilen `people.csv` og erstatt eksempeldataene med dine egne. Behold overskriftsraden intakt.
6. Hvis du har medlemsbilder, legg dem til i mappen med 400x300px-bilder, navngitt for å matche `importKey`-numrene i CSV-filen din.
7. Komprimer de redigerte filene til en zip-fil.
8. Tilbake i B1 Admin, klikk **Last opp** og velg zip-filen din.
9. Gjennomgå dataforhåndsvisningen og klikk **Fortsett til destinasjon**.
10. Bekreft at **B1 Database** er valgt, gjennomgå importsammendraget, og klikk **Start overføring**.
11. Vent til importen er fullført, og klikk deretter **Gå til B1** for å gå tilbake til dashbordet.

:::tip
Last alltid ned og gjennomgå eksempelfilene først. Å matche det forventede kolonneformatet vil forhindre importfeil.
:::

:::warning
Import av data legger til nye poster i databasen din. Hvis du importerer den samme filen to ganger, kan du ende opp med duplikater. Dobbeltsjekk filen din før du starter overføringen.
:::

## Importere fra Breeze ChMS

Hvis du migrerer fra Breeze, har B1 et dedikert importalternativ som håndterer konverteringen automatisk.

1. I Breeze, gå til **Innstillinger** og klikk **Eksporter** i venstre sidefelt.
2. Eksporter tre filer: **People**, **Tags** og **Contributions**.
3. Velg alle tre eksporterte filer, høyreklikk og komprimer dem til én zip-fil.
4. I B1 Admin, gå til **Innstillinger** og deretter **Import/Eksport**.
5. Velg **Breeze Import Zip** fra **Datakilde**-rullegardinmenyen.
6. Last opp zip-filen din og følg trinnene på skjermen for å gjennomgå og fullføre importen.

:::info
Breeze-importen overfører personer, bilder, grupper, donasjoner, oppmøte, skjemaer og mer -- og gir deg en komplett migrering i ett steg.
:::

## Etter import

Når importen er fullført, ta noen minutter for å verifisere dataene dine:

1. Bla gjennom [Personer](../people/adding-people.md)-siden og stikkprøvekontroller noen profiler.
2. Bekreft at navn, e-poster, telefonnumre og adresser ble importert riktig.
3. Sjekk at husstandstilknytninger er intakte.
4. Gjennomgå eventuelle [grupper](../groups/creating-groups.md) eller tagger som ble importert.

Hvis du oppdager problemer, kan du redigere individuelle profiler direkte fra Personer-siden. Du kan også [eksportere dataene dine](exporting-data.md) når som helst for å lage en sikkerhetskopi.

---
title: "Søke etter personer"
---

# Søke etter personer

<div class="article-intro">

**People**-siden viser menighetens katalog som en søkbar liste over husstander, eller som en sorterbar tabell med enkeltpersoner. Du kan raskt finne alle i menigheten din, tilpasse hvilken informasjon som vises, og eksportere resultatene. Effektivt søk er avgjørende for daglige administrative oppgaver i menigheten, som oppfølging av besøkende, forberedelse av kontaktlister og vedlikehold av medlemsposter.

</div>

## Opplæringsvideo

<YouTube id="7Y-tN9RmnDQ" title="Searching People and Building Lists in B1" next="Custom Fields, Bulk Editing, and Exporting in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Katalogen til menigheten din bør inneholde personer. Hvis du ikke har lagt til noen ennå, se [Legge til personer](adding-people.md) eller [Importere data](importing-data.md).

</div>

## Husstander og tabellvisninger

People-siden viser katalogen din etter **husstand**, sortert alfabetisk. Hver rad viser husstandens bilder, navnet (for eksempel «The Smith Family») og navnene på alle i den. Klikk på en husstand for å åpne profilen til hovedpersonen i husstanden, eller klikk på navnet til et hvilket som helst medlem for å åpne den personen. Et antall over listen viser hvor mange husstander og personer som vises.

Bruk bryteren **View as** over listen for å veksle mellom **Households** og **Table**. Visningen **Table** lister én person per rad, og det er her du kan sortere og velge kolonner (se nedenfor). B1 husker valget ditt på denne enheten.

Som standard laster siden den første delen av katalogen din. Hvis du har flere personer, klikker du på **Show All Members** under listen for å laste alle.

## Hurtigsøk

Boksen **Find a household or person** øverst på People-siden lar deg finne medlemmer i sanntid:

1. Klikk på **søkeboksen** øverst på People-siden.
2. Begynn å skrive et navn.
3. Resultatene filtreres automatisk mens du skriver (det er en kort forsinkelse på omtrent ett halvt sekund, slik at søket ikke kjøres for hvert tastetrykk).
4. Listen under oppdateres og viser bare de matchende resultatene.

Klikk på **Clear** (under søkeboksen) for å nullstille søket og vise hele katalogen igjen.

:::tip
Du trenger ikke å trykke Enter. Søket kjøres automatisk når du slutter å skrive.
:::

## Sortere resultater

I visningen **Table** listes personer etter etternavn, deretter fornavn. Du kan sortere katalogen på en annen måte ved å klikke på en hvilken som helst kolonneoverskrift:

1. Klikk på en **kolonneoverskrift** (for eksempel **Name** eller **Email**) for å sortere etter den kolonnen.
2. Klikk på den samme overskriften igjen for å reversere sorteringsrekkefølgen.

Dette gjør det enkelt å finne personer alfabetisk, etter alder, eller etter en hvilken som helst annen synlig kolonne.

## Tilpasse kolonner

Ikke all informasjon trenger å være synlig samtidig. Du kan velge hvilke kolonner som vises i tabellen:

1. Klikk på ikonet **Select columns** i sidehodet på People-siden. (Kolonner gjelder for visningen **Table**.)
2. Kryss av eller fjern avkryssingen for kolonner for å vise eller skjule dem. Tilgjengelige kolonner inkluderer:
   - **Photo**
   - **Name**
   - **Email**
   - **Phone**
   - **Address**
   - **Birth Date**
   - **Age**
   - **Gender**
   - **Membership Status**
   - **Campus**
3. Tabellen oppdateres umiddelbart for å vise valgene dine. Klikk på **Done** for å lukke dialogen **Select Columns**.

### Vise egendefinerte felt som kolonner

Kolonnevelgeren har to faner: **Standard** inneholder de innebygde kolonnene som er listet over, og **Custom** inneholder menighetens [egendefinerte felt](../settings/custom-fields.md) sammen med spørsmålene fra alle People-skjemaer. Kryss av et egendefinert felt på fanen **Custom** for å legge det til som kolonne, og hver persons verdi for det feltet vises i tabellen. Verdier vises på samme måte som på personens profil — Ja/Nei-felt viser *Yes* eller *No*, flervalgsfelt viser valgets etikett, og datoer vises som korte datoer. Personer uten verdi for feltet vises med en tom celle.


## Eksportere søkeresultater

Du kan laste ned de gjeldende søkeresultatene dine som en CSV-fil når som helst:

1. Bruk de søkene eller filtrene du ønsker.
2. Klikk på knappen **Export** i sidehodet på People-siden.
3. En CSV-fil lastes ned til datamaskinen din, klar til å åpnes i Excel, Google Sheets eller et hvilket som helst regnearkprogram.

For mer informasjon om eksport, se [Eksportere data](./exporting-data.md).

:::tip
For mer avanserte spørringer — som å finne alle som ikke har vært til stede de siste tre månedene — prøv funksjonen [AI Search](./ai-search.md), som lar deg søke med spørsmål i vanlig språk.
:::

## Avansert søk

Avansert søk lar deg bygge presise filtre ved å kombinere betingelser. Åpne det ved å klikke på **Advanced** under søkeboksen på People-siden, og utvid deretter en kategori og kryss av feltene du vil filtrere på (du kan klikke på feltets navn eller avkrysningsboksen), og velg en operator og verdi for hvert felt. Kategoriene inkluderer **Names**, **Demographics**, **Contact**, **Membership**, **Activity** (gaver og oppmøte) og **Custom Fields**.

Kategorien **Custom Fields** lister menighetens [egendefinerte felt](../settings/custom-fields.md) — feltene du definerer i Settings for å følge din egen informasjon (for eksempel en utløpsdato for bakgrunnssjekk). Operatorene som tilbys, samsvarer med hvert felts type: tekstfelt støtter *contains / equals / starts with / ends with*, tallfelt støtter sammenligningsoperatorene, datofelt støtter *equals / after / before*, og Ja/Nei- og flervalgsfelt lar deg velge en verdi. Ethvert felt du kan filtrere på her, kan lagres som en live [liste](./lists.md).

## Lagre søk som lister

Etter at du har kjørt et søk, vises knappen **Save as List** i sidehodet på People-siden. Klikk på den for å lagre den gjeldende spørringen under et navn og en valgfri kategori, slik at du kan laste den på nytt med en gang i fremtidige økter. Se [Lagrede lister](./lists.md) for alle detaljer.

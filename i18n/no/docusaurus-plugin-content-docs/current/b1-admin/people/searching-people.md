---
title: "Søke etter personer"
---

# Søke etter personer

<div class="article-intro">

Siden **Personer** viser menighetsregisteret ditt som en søkbar liste over husstander, eller som en sorterbar tabell over enkeltpersoner. Du finner raskt hvem som helst i menigheten, tilpasser hvilken informasjon som vises, og eksporterer resultatene. Effektivt søk er avgjørende i den daglige administrasjonen, for eksempel når du skal følge opp besøkende, lage kontaktlister eller vedlikeholde medlemsregisteret.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Menighetsregisteret ditt bør inneholde personer. Hvis du ikke har lagt til noen ennå, se [Legge til personer](adding-people.md) eller [Importere data](importing-data.md).

</div>

## Husstands- og tabellvisninger

Siden Personer lister registeret ditt etter **husstand**, gruppert alfabetisk. Hver rad viser husstandens bilder, navnet (for eksempel «Familien Hansen») og navnene på alle i den. Klikk på en husstand for å åpne hovedpersonens profil, eller klikk på et medlemsnavn for å åpne den personen. Et antall over listen viser hvor mange husstander og personer som vises.

Bruk bryteren **Vis som** over listen for å bytte mellom **Husstander** og **Tabell**. Tabellvisningen viser én person per rad, og det er der du kan sortere og velge kolonner (se nedenfor). B1 husker valget ditt på den enheten.

Som standard laster siden den første delen av registeret. Hvis du har flere personer, klikker du på **Vis alle medlemmer** under listen for å laste alle.

## Hurtigsøk

Boksen **Finn en husstand eller person** øverst på siden Personer lar deg finne medlemmer i sanntid:

1. Klikk på **søkefeltet** øverst på siden Personer.
2. Begynn å skrive et navn.
3. Resultatene filtreres automatisk mens du skriver (det er en kort forsinkelse på omtrent et halvt sekund, slik at søket ikke kjøres for hvert tastetrykk).
4. Listen under oppdateres og viser bare de samsvarende resultatene.

Klikk på **Tøm** (under søkefeltet) for å nullstille søket og vise hele registeret igjen.

:::tip
Du trenger ikke å trykke Enter. Søket kjøres automatisk når du slutter å skrive.
:::

## Sortere resultater

I **Tabell**-visningen kan du sortere registeret ved å klikke på en kolonneoverskrift:

1. Klikk på en **kolonneoverskrift** (for eksempel **Navn** eller **E-post**) for å sortere etter den kolonnen.
2. Klikk på samme overskrift igjen for å snu sorteringsrekkefølgen.

Dette gjør det enkelt å finne personer alfabetisk, etter alder eller etter en hvilken som helst annen synlig kolonne.

## Tilpasse kolonner

Ikke all informasjon trenger å være synlig samtidig. Du kan velge hvilke kolonner som vises i tabellen:

1. Klikk på ikonet **Velg kolonner** i sidetoppen på Personer-siden. (Kolonner gjelder for **Tabell**-visningen.)
2. Huk av eller fjern haken for kolonner for å vise eller skjule dem. Tilgjengelige kolonner er blant annet:
   - **Bilde**
   - **Navn**
   - **E-post**
   - **Telefon**
   - **Adresse**
   - **Fødselsdato**
   - **Alder**
   - **Kjønn**
   - **Medlemsstatus**
   - **Menighet**
3. Tabellen oppdateres umiddelbart i tråd med valgene dine.

### Vise egendefinerte felt som kolonner

Kolonnevelgeren har to faner: **Standard** inneholder de innebygde kolonnene som er nevnt ovenfor, og **Egendefinert** inneholder menighetens [egendefinerte felt](../settings/custom-fields.md) sammen med spørsmålene fra eventuelle personskjemaer. Huk av for et egendefinert felt i fanen **Egendefinert** for å legge det til som kolonne, så vises hver persons verdi for feltet i tabellen. Verdiene vises på samme måte som i personens profil -- Ja/Nei-felt viser *Ja* eller *Nei*, flervalgsfelt viser navnet på alternativet, og datoer vises som korte datoer. Personer uten verdi for feltet får en tom celle.

## Eksportere søkeresultater

Du kan når som helst laste ned de gjeldende søkeresultatene som en CSV-fil:

1. Bruk søket eller filtrene du ønsker.
2. Klikk på knappen **Eksporter** i sidetoppen på Personer-siden.
3. En CSV-fil lastes ned til datamaskinen din og kan åpnes i Excel, Google Sheets eller et annet regnearkprogram.

Du finner mer om eksport i [Eksportere data](./exporting-data.md).

:::tip
For mer avanserte spørringer -- som å finne alle som ikke har vært til stede de siste tre månedene -- kan du prøve funksjonen [AI-søk](./ai-search.md), der du søker med spørsmål formulert i vanlig språk.
:::

## Avansert søk

Med avansert søk kan du bygge presise filtre ved å kombinere vilkår. Åpne det ved å klikke på **Avansert** under søkefeltet på siden Personer, utvid en kategori og huk av feltene du vil filtrere på, og velg en operator og en verdi for hvert av dem. Kategoriene er **Navn**, **Demografi**, **Kontakt**, **Medlemskap**, **Aktivitet** (donasjoner og oppmøte) og **Egendefinerte felt**.

Kategorien **Egendefinerte felt** viser menighetens [egendefinerte felt](../settings/custom-fields.md) — feltene du definerer under Innstillinger for å holde oversikt over din egen informasjon (for eksempel utløpsdatoen for en politiattest). Operatorene som tilbys, tilsvarer typen til hvert felt: tekstfelt støtter *inneholder / er lik / begynner med / slutter med*, tallfelt støtter sammenligningsoperatorene, datofelt støtter *er lik / etter / før*, og Ja/Nei- og flervalgsfelt lar deg velge en verdi. Alle felt du kan filtrere på her, kan lagres som en levende [liste](./lists.md).

## Lagre søk som lister

Etter at du har kjørt et søk, vises en knapp **Lagre som liste** i toppen av siden Personer. Klikk på den for å lagre gjeldende spørring under et navn og en valgfri kategori, slik at du kan laste den inn igjen med en gang i fremtidige økter. Se [Lagrede lister](./lists.md) for alle detaljer.

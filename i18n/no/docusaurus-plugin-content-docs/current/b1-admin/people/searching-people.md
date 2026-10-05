---
title: "Søke etter personer"
---

# Søke etter personer

<div class="article-intro">

Siden **Personer** viser menighetsregisteret ditt i en søkbar og sorterbar tabell. Du finner raskt hvem som helst i menigheten, tilpasser hvilken informasjon som vises, og eksporterer resultatene. Effektivt søk er avgjørende i den daglige administrasjonen, for eksempel når du skal følge opp besøkende, lage kontaktlister eller vedlikeholde medlemsregisteret.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Menighetsregisteret ditt bør inneholde personer. Hvis du ikke har lagt til noen ennå, se [Legge til personer](adding-people.md) eller [Importere data](importing-data.md).

</div>

## Hurtigsøk

Søkefeltet øverst på siden Personer lar deg finne medlemmer i sanntid:

1. Klikk på **søkefeltet** øverst på siden Personer.
2. Begynn å skrive et navn, en e-postadresse eller et annet nøkkelord.
3. Resultatene filtreres automatisk mens du skriver (det er en kort forsinkelse på omtrent et halvt sekund, slik at søket ikke kjøres for hvert tastetrykk).
4. Tabellen under oppdateres og viser bare de samsvarende resultatene.

:::tip
Du trenger ikke å trykke Enter. Søket kjøres automatisk når du slutter å skrive.
:::

## Sortere resultater

Du kan sortere registeret ved å klikke på en kolonneoverskrift i tabellen:

1. Klikk på en **kolonneoverskrift** (for eksempel **Navn** eller **E-post**) for å sortere etter den kolonnen.
2. Klikk på samme overskrift igjen for å snu sorteringsrekkefølgen.

Dette gjør det enkelt å finne personer alfabetisk, etter alder eller etter en hvilken som helst annen synlig kolonne.

## Tilpasse kolonner

Ikke all informasjon trenger å være synlig samtidig. Du kan velge hvilke kolonner som vises i tabellen:

1. Se etter **nedtrekksmenyen for kolonnevalg** øverst i tabellen.
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

:::info
Kolonnevalgene dine påvirker hva som tas med når du eksporterer til CSV. Tilpass kolonnene før eksport for å få nøyaktig de dataene du trenger.
:::

## Sideinndeling

Når registeret har mange poster, deles resultatene over flere sider. Bruk **sidekontrollene** nederst i tabellen for å bla mellom sidene. Gjeldende side og totalt antall poster vises, slik at du alltid vet hvor du er i listen.

:::tip
Hvis du vil se flere resultater samtidig, kan du snevre inn søket i stedet for å bla gjennom et stort register.
:::

## Eksportere søkeresultater

Du kan når som helst laste ned de gjeldende søkeresultatene som en CSV-fil:

1. Bruk søket eller filtrene du ønsker.
2. Tilpass kolonnene slik at de inneholder dataene du trenger.
3. Klikk på knappen **Eksporter**.
4. En CSV-fil lastes ned til datamaskinen din og kan åpnes i Excel, Google Sheets eller et annet regnearkprogram.

Du finner mer om eksport i [Eksportere data](./exporting-data.md).

:::tip
For mer avanserte spørringer -- som å finne alle som ikke har vært til stede de siste tre månedene -- kan du prøve funksjonen [AI-søk](./ai-search.md), der du søker med spørsmål formulert i vanlig språk.
:::

## Avansert søk

Med avansert søk kan du bygge presise filtre ved å kombinere vilkår. Åpne det fra siden Personer, utvid en kategori og huk av feltene du vil filtrere på, og velg en operator og en verdi for hvert av dem. Kategoriene er **Navn**, **Demografi**, **Kontakt**, **Medlemskap**, **Aktivitet** (donasjoner og oppmøte) og **Egendefinerte felt**.

Kategorien **Egendefinerte felt** viser menighetens [egendefinerte felt](../settings/custom-fields.md) — feltene du definerer under Innstillinger for å holde oversikt over din egen informasjon (for eksempel utløpsdatoen for en politiattest). Operatorene som tilbys, tilsvarer typen til hvert felt: tekstfelt støtter *inneholder / er lik / begynner med / slutter med*, tallfelt støtter sammenligningsoperatorene, datofelt støtter *er lik / etter / før*, og Ja/Nei- og flervalgsfelt lar deg velge en verdi. Alle felt du kan filtrere på her, kan lagres som en levende [liste](./lists.md).

## Lagre søk som lister

Etter at du har kjørt et søk, vises en knapp **Lagre som liste** (med bokmerkeikon) i toppen av siden Personer. Klikk på den for å lagre gjeldende spørring under et navn og en valgfri kategori, slik at du kan laste den inn igjen med en gang i fremtidige økter. Se [Lagrede lister](./lists.md) for alle detaljer.

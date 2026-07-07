---
title: "Søk mennesker"
---

# Søk mennesker

<div class="article-intro">

**Mennesker**-siden viser kirkens katalog i en søkbar, sorterbar tabell. Du kan raskt finne alle i forsamlingen, tilpasse hvilken informasjon som vises, og eksportere resultatene. Effektivt søk er essensielt for daglige kirkestyringen oppgaver som oppfølging av besøkende, forberedelse av kontaktlister og administrasjon av medlemsposter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å vise mennesker. Se [Roller & Tillatelser](roles-permissions.md) hvis du er usikker på tilgangnivået ditt.
- Kirkens katalog bør ha mennesker i den. Hvis du ikke har lagt til noen ennå, se [Legge til mennesker](adding-people.md) eller [Importdata](importing-data.md).

</div>

## Raskt søk

Søkebaren øverst på mennesker-siden lar deg finne medlemmer i sanntid:

1. Klikk **søkeboksen** øverst på mennesker-siden.
2. Start å skrive et navn, e-post eller annen søkeord.
3. Resultater filtreres automatisk mens du skriver (det er en kort forsinkelse på omtrent et halvt sekund slik at søket ikke avfyrer på hvert tastetrykk).
4. Tabellen nedenfor oppdateres for å vise bare de samsvarende resultatene.

:::tip
Du trenger ikke å trykke Enter. Søket kjører automatisk etter at du slutter å skrive.
:::

## Sortering av resultater

Du kan sortere katalogen ved å klikke en hvilken som helst kolonneoverskrift i tabellen:

1. Klikk på en **kolonneoverskrift** (for eksempel **navn** eller **e-post**) for å sortere etter den kolonnen.
2. Klikk samme oppskrift igjen for å reversere sorteringsrekkefølgen.

Dette gjør det enkelt å finne mennesker alfabetisk, etter alder eller etter en hvilken som helst annen synlig kolonne.

## Tilpassing av kolonner

Ikke alle stykker informasjon må være synlig samtidig. Du kan velge hvilke kolonner som vises i tabellen:

1. Slå opp **kolonnevelger rullegardinmenyen** nær toppen av tabellen.
2. Merk eller avmerk kolonner for å vise eller skjule dem. Tilgjengelige kolonner inkluderer:
   - **Foto**
   - **Navn**
   - **E-post**
   - **Telefon**
   - **Adresse**
   - **Fødselsdato**
   - **Alder**
   - **Kjønn**
   - **MedlemskapsStatus**
   - **Avdeling**
3. Tabellen oppdateres umiddelbart for å gjenspeile dine valg.

:::info
Kolonnevalgene dine påvirker hva som er inkludert når du eksporterer til CSV. Tilpass kolonner før eksportering for å få akkurat dataene du trenger.
:::

## Sidedeling

Når katalogen din har mange poster, er resultatene delt på tvers av sider. Bruk **sidedelingskontrollene** nederst i tabellen for å bevege deg mellom sider. Den gjeldende siden og totalt antall poster vises slik at du alltid vet hvor du er på listen.

:::tip
Hvis du vil se flere resultater på en gang, raffinere søket ditt for å begrense listen i stedet for å side gjennom en stor katalog.
:::

## Eksportere søkeresultater

Du kan laste ned dine gjeldende søkeresultater som en CSV-fil når som helst:

1. Bruk et søk eller filtre du vil.
2. Tilpass kolonnene dine for å inkludere dataene du trenger.
3. Klikk **Eksport**-knappen.
4. En CSV-fil vil laste ned til datamaskinen din, klar til å åpne i Excel, Google Sheets eller en hvilken som helst regneapplilasjon.

For mer detaljer om eksportering, se [Eksportdata](./exporting-data.md).

:::tip
For mer avanserte spørsmål -- som å finne alle som ikke har møtt de siste tre månedene -- prøv [AI-søk](./ai-search.md) funksjonen, som lar deg søke ved hjelp av spørsmål på rene språk.
:::

## Avansert søk

Avansert søk lar deg bygge presise filtere ved å kombinere forhold. Åpne den fra mennesker-siden, og videre utvid en kategori og merk feltene du vil filtrere på, velg en operatør og verdi for hver. Kategorier inkluderer **navn**, **demografi**, **kontakt**, **medlemskap**, **aktivitet** (donasjoner og frammøte) og **egendefinerte felt**.

**Egendefinerte felt**-kategorien viser kirkens [egendefinerte felt](../settings/custom-fields.md) -- feltene du definerer i innstillinger for å spore dine egne informasjoner (for eksempel en utgåelsesdato for bakgrunnssjekk). Operatørene som tilbys samsvarer med hver felttype: tekstfelt støtter *inneholder / er lik / starter med / slutter med*, tallfelt støtter sammenligningsoperatørene, datofelter støtter *er lik / etter / før*, og Ja/Nei og flervalgsfelt lar deg velge en verdi. Enhver felt du kan filtrere på her kan lagres som en live [liste](./lists.md).

## Lagring av søk som lister

Etter å ha kjørt et søk, vises en **Lagre som liste**-knapp (bokmerke-ikon) i mennesker-sidehoppteksten. Klikk den for å lagre gjeldende forespørsel under et navn og valgfri kategori, slik at du kan laste den på nytt øyeblikkelig i fremtidige sesjoner. Se [Lagrede lister](./lists.md) for full detaljer.

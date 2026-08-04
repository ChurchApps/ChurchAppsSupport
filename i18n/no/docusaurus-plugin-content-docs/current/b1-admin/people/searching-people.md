---
title: "Søke etter personer"
---

# Søke etter personer

<div class="article-intro">

**Personer**-siden viser menighetsregisteret ditt i en søkbar, sorterbar tabell. Du kan raskt finne hvem som helst i menigheten din, tilpasse hvilken informasjon som vises, og eksportere resultatene dine. Effektivt søk er avgjørende for daglige administrasjonsoppgaver i menigheten, som å følge opp besøkende, forberede kontaktlister, og administrere medlemsposter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å vise personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Menighetsregisteret ditt bør inneholde personer. Hvis du ikke har lagt til noen ennå, se [Legge til personer](adding-people.md) eller [Importere data](importing-data.md).

</div>

## Hurtigsøk

Søkefeltet øverst på Personer-siden lar deg finne medlemmer i sanntid:

1. Klikk på **søkeboksen** øverst på Personer-siden.
2. Begynn å skrive et navn, en e-post, eller et annet nøkkelord.
3. Resultatene filtreres automatisk mens du skriver (det er en kort forsinkelse på omtrent et halvt sekund slik at søket ikke utløses ved hvert tastetrykk).
4. Tabellen nedenfor oppdateres til å vise kun de matchende resultatene.

:::tip
Du trenger ikke å trykke Enter. Søket kjøres automatisk etter at du slutter å skrive.
:::

## Sortere resultater

Du kan sortere registeret ved å klikke på en hvilken som helst kolonneoverskrift i tabellen:

1. Klikk på en **kolonneoverskrift** (for eksempel **Navn** eller **E-post**) for å sortere etter den kolonnen.
2. Klikk på den samme overskriften igjen for å reversere sorteringsrekkefølgen.

Dette gjør det enkelt å finne personer alfabetisk, etter alder, eller etter en hvilken som helst annen synlig kolonne.

## Tilpasse kolonner

Ikke all informasjon trenger å være synlig samtidig. Du kan velge hvilke kolonner som vises i tabellen:

1. Se etter **kolonnevelger-nedtrekksmenyen** nær toppen av tabellen.
2. Kryss av eller fjern avkrysningen for kolonner for å vise eller skjule dem. Tilgjengelige kolonner inkluderer:
   - **Bilde**
   - **Navn**
   - **E-post**
   - **Telefon**
   - **Adresse**
   - **Fødselsdato**
   - **Alder**
   - **Kjønn**
   - **Medlemsstatus**
   - **Kirkested**
3. Tabellen oppdateres umiddelbart for å gjenspeile valgene dine.

:::info
Kolonnevalgene dine påvirker hva som inkluderes når du eksporterer til CSV. Tilpass kolonner før du eksporterer for å få akkurat de dataene du trenger.
:::

## Paginering

Når registeret ditt har mange poster, deles resultatene over flere sider. Bruk **pagineringskontrollene** nederst i tabellen for å bevege deg mellom sidene. Gjeldende side og totalt antall poster vises, slik at du alltid vet hvor du er i listen.

:::tip
Hvis du vil se flere resultater samtidig, bør du avgrense søket ditt for å innsnevre listen i stedet for å bla gjennom et stort register.
:::

## Eksportere søkeresultater

Du kan laste ned dine gjeldende søkeresultater som en CSV-fil når som helst:

1. Bruk et hvilket som helst søk eller filtre du ønsker.
2. Tilpass kolonnene dine til å inkludere de dataene du trenger.
3. Klikk **Eksporter**-knappen.
4. En CSV-fil lastes ned til datamaskinen din, klar til å åpnes i Excel, Google Sheets, eller et hvilket som helst annet regnearkprogram.

For flere detaljer om eksport, se [Eksportere data](./exporting-data.md).

:::tip
For mer avanserte søk -- som å finne alle som ikke har møtt opp de siste tre månedene -- prøv funksjonen [AI-søk](./ai-search.md), som lar deg søke ved hjelp av spørsmål i vanlig språk.
:::

## Avansert søk

Avansert søk lar deg bygge presise filtre ved å kombinere betingelser. Åpne det fra Personer-siden, utvid deretter en kategori og kryss av for feltene du vil filtrere på, og velg en operator og en verdi for hvert av dem. Kategorier inkluderer **Navn**, **Demografi**, **Kontakt**, **Medlemskap**, **Aktivitet** (gaver og oppmøte), og **Egendefinerte felt**.

Kategorien **Egendefinerte felt** viser menighetens [egendefinerte felt](../settings/custom-fields.md) -- feltene du definerer i Innstillinger for å spore din egen informasjon (som en utløpsdato for bakgrunnssjekk). Operatorene som tilbys, matcher hvert felts type: tekstfelt støtter *inneholder / er lik / starter med / slutter med*, tallfelt støtter sammenligningsoperatorene, datofelt støtter *er lik / etter / før*, og Ja/Nei- og Flervalgsfelt lar deg velge en verdi. Ethvert felt du kan filtrere på her, kan lagres som en levende [liste](./lists.md).

## Lagre søk som lister

Etter at du har kjørt et søk, vises en **Lagre som liste**-knapp (bokmerkeikon) i toppteksten på Personer-siden. Klikk på den for å lagre gjeldende søk under et navn og en valgfri kategori, slik at du kan laste det inn på nytt umiddelbart i fremtidige økter. Se [Lagrede lister](./lists.md) for fullstendige detaljer.

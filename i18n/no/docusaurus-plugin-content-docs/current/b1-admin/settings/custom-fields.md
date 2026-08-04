---
title: "Egendefinerte felt"
---

# Egendefinerte felt

<div class="article-intro">

**Egendefinerte felt** lar deg spore din egen informasjon på hver personpost -- ting B1 ikke har et innebygd felt for, som en utløpsdato for bakgrunnssjekk, en T-skjortestørrelse, eller status på et dåpskurs. Du definerer et felt én gang i Innstillinger, fyller deretter inn en verdi på hver persons profil, og søker eller bygger lister basert på det. Dette erstatter den eldre løsningen med å opprette et Personer-skjema bare for å lagre én enkelt egendefinert opplysning.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger redigeringstilgang til **Personer** for å definere felt og fylle inn verdier, samt tilgang til **Innstillinger**-området. Alle med visningstilgang til Personer kan se verdiene. Se [Roller og tillatelser](./roles-permissions.md).
- Bestem hva du vil spore og hvilken type som passer best (tekst, et tall, en dato, et ja/nei-svar, eller en valgliste) før du begynner.

</div>

## Åpne Egendefinerte felt

I B1 Admin, gå til **Innstillinger** i venstre sidepanel og velg kortet **Egendefinerte felt**. Du kan også gå direkte dit på **/settings/custom-fields**. Du vil se en liste over alle feltene du har definert, med **Navn** og **Felttype**. Hvis du ikke har opprettet noen ennå, viser panelet *"Ingen egendefinerte felt er lagt til ennå."*

## Legge til et felt

1. Klikk **Legg til felt**.
2. I redigeringsverktøyet som åpnes til høyre, skriv inn et **Navn** -- dette er merkelappen ansatte vil se på personprofiler og i søk (for eksempel *Bakgrunnssjekk utløper*).
3. Velg en **Felttype**:
   - **Tekstboks** — fri korttekst.
   - **Heltall** — tall uten desimaler (for eksempel et antall).
   - **Desimal** — tall som kan inkludere desimaler.
   - **Dato** — en kalenderdato.
   - **Ja/Nei** — et enkelt ja-eller-nei-svar.
   - **Flervalg** — en valgliste. Når du velger denne typen, vises en **valgredigerer** slik at du kan legge til hvert alternativ folk kan velge mellom.
4. Klikk **Lagre**.

Feltet er nå tilgjengelig på alle personers profiler.

:::info
Felttypene er det samme settet som brukes for [skjemaspørsmål](../forms/creating-forms.md), slik at verdier oppfører seg konsekvent på tvers av B1.
:::

## Redigere et felt

Klikk på en hvilken som helst feltrad i listen for å åpne den på nytt i redigeringsverktøyet. Endre navnet, typen, eller valgene, og klikk **Lagre**.

:::warning
Å endre **Felttypen** til et felt som allerede har verdier (for eksempel fra Tekstboks til Dato) kan la tidligere innskrevne verdier stå i et format som ikke lenger passer den nye typen. Endre typer med forsiktighet når ansatte har begynt å fylle inn feltet.
:::

## Slette et felt

Åpne et felt for redigering og klikk **Slett**. Du vil bli bedt om å bekrefte: *"Er du sikker på at du vil slette dette egendefinerte feltet? De lagrede verdiene vil også bli fjernet."* Å slette et felt fjerner det permanent **og alle verdier lagret for det** på alle personer -- dette kan ikke angres.

## Fylle inn verdier på en person

Når minst ett egendefinert felt eksisterer, ligger verdiene rett ved siden av de innebygde detaljene på hver persons post -- du ser dem i **Personopplysninger** og redigerer dem på det samme skjemaet du bruker for resten av personens informasjon. Ingenting ekstra vises før du har definert ditt første felt.

1. Åpne en persons post i **Personer**.
2. I seksjonen **Personopplysninger**, klikk **Rediger**-knappen (blyanten).
3. Bla ned til området **Egendefinerte felt** nederst i redigeringsskjemaet, og fyll inn en verdi for hvert felt. Hvert felt viser inndatakomponenten som passer typen -- en datovelger for Dato-felt, en ja/nei-nedtrekksliste for Ja/Nei-felt, en valgliste for Flervalg, og så videre.
4. Klikk **Lagre**. De egendefinerte feltverdiene dine lagres sammen med resten av personens detaljer.

Tilbake på profilen vises nå ethvert felt som har en verdi, i seksjonen **Personopplysninger** (Ja/Nei-svar leses som *Ja* eller *Nei*, og Flervalg viser alternativets merkelapp). Felt som er tomme, er rett og slett skjult. For å fjerne en verdi, rediger personen, tøm feltet, og lagre -- en tom verdi slettes fra posten i stedet for å bli lagret som tom.

:::tip
Det klassiske brukstilfellet er frivillig-sikkerhet: opprett et **Dato**-felt kalt *Bakgrunnssjekk utløper*, registrer datoen for hver frivillig, og bygg deretter en [Lagret liste](../people/lists.md) som flagger alle med en dato som har passert.
:::

## Søke og bygge lister på egendefinerte felt

Egendefinerte felt er fullt søkbare:

1. På **Personer**-siden, åpne [Avansert søk](../people/searching-people.md).
2. Utvid kategorien **Egendefinerte felt**.
3. Kryss av feltet du vil filtrere på, velg en operator, og skriv inn en verdi. Operatorene som tilbys, passer feltets type:
   - **Tekstboks** — inneholder, er lik, begynner med, slutter med.
   - **Heltall / Desimal** — er lik, større enn, større enn eller lik, mindre enn, mindre enn eller lik.
   - **Dato** — er lik, etter (større enn), før (mindre enn).
   - **Ja/Nei** — er lik Ja eller Nei.
   - **Flervalg** — er lik eller inneholder ett av valgene.

Lagre et hvilket som helst egendefinert-felt-søk som en [Liste](../people/lists.md). Lister er levende spørringer, så en liste bygget på *Bakgrunnssjekk utløper er før i dag* sjekker på nytt hver person hver gang du åpner den -- ingen manuell vedlikehold.

## Hva skjer ved sammenslåing

Når du [slår sammen to personposter](../people/adding-people.md), overføres verdiene for egendefinerte felt automatisk. Personen du beholder, holder på sine egne verdier; for ethvert felt hvor bare den fjernede personen hadde en verdi, kopieres den verdien over slik at ingenting går tapt.

## Relaterte artikler

- [Søke i Personer](../people/searching-people.md) — avansert søk, inkludert kategorien Egendefinerte felt
- [Lagrede lister](../people/lists.md) — lagre et egendefinert-felt-søk og kjør det på nytt live
- [Roller og tillatelser](./roles-permissions.md) — hvem som kan definere felt og redigere verdier
- [Opprette skjemaer](../forms/creating-forms.md) — for datainnsamling med flere spørsmål der et fullt skjema passer bedre enn enkeltfelt

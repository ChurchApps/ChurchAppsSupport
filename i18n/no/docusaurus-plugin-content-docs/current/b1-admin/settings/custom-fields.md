---
title: "Egendefinerte felt"
---

# Egendefinerte felt

<div class="article-intro">

**Egendefinerte felt** lar deg spore din egen informasjon på hver personoppføring -- ting B1 ikke har et innebygd felt for, som en utløpsdato for bakgrunnkontroll, en T-skjortstørrelse eller status for dåpsklass. Du definerer et felt én gang i Innstillinger, deretter fylles en verdi på hver persons profil og søker eller bygger lister på den. Dette erstatter den eldre workaround-en med å opprette et Mennesker-skjema bare for å lagre et enkelt datasett.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **Mennesker**-redigeringspermisjon for å definere felt og fylle inn verdier, og tilgang til **Innstillinger**-området. Alle med Mennesker-visningstillatelse kan se verdiene. Se [Roller & rettigheter](./roles-permissions.md).
- Avgjør hva du vil spore og hvilken type som passer best (tekst, et tall, en dato, et ja/nei-svar eller en valgliste) før du begynner.

</div>

## Åpne egendefinerte felt

I B1 Admin åpner du **seksjonsmenyen** i det øvre venstre hjørnet (seksjonsnavnet med liten pil), velger **Innstillinger** og velger **Egendefinerte felt**-kortet. Du kan også gå direkte dit på **/settings/custom-fields**. Du vil se en liste over alle feltene du har definert, og viser **Navn** og **Felttype**. Hvis du ikke har opprettet noen ennå, lyder panelet *"Ingen egendefinerte felt er blitt lagt til ennå."*

## Legg til et felt

1. Klikk **Legg til felt**.
2. I redigeringsprogrammet som åpnes til høyre, angi et **Navn** -- dette er etiketten som personalet vil se på personprofilene og i søk (for eksempel *Bakgrunnkontroll utløper*).
3. Velg en **Felttype**:
   - **Tekstboks** -- fritekst kort tekst.
   - **Hele tall** -- tall uten desimaler (for eksempel en telling).
   - **Desimal** -- tall som kan inkludere desimaler.
   - **Dato** -- en kalenderdato.
   - **Ja/Nei** -- et enkelt ja-eller-nei-svar.
   - **Flervalg** -- en valgliste. Når du velger denne typen, vises en **valgredigeringsprogram** slik at du kan legge til hvert alternativ folk kan velge fra.
4. Klikk **Lagre**.

Feltet er nå tilgjengelig på hver persons profil.

:::info
Felttypene er det samme settet brukt for [skjemaspørsmål](../forms/creating-forms.md), så verdiene oppfører seg konsekvent på tvers av B1.
:::

## Rediger et felt

Klikk en hvilken som helst feltrad i listen for å åpne det på nytt i redigeringsprogrammet. Endre navn, type eller valg og klikk **Lagre**.

:::warning
Endring av **Felttype** for et felt som allerede har verdier (for eksempel fra Tekstboks til Dato) kan la tidligere oppgitte verdier være i et format som ikke lenger samsvarer med den nye typen. Endre typer med forsiktighet når personalet har begynt å fylle inn feltet.
:::

## Slett et felt

Åpne et felt for redigering og klikk **Slett**. Du blir bedt om å bekrefte: *"Er du sikker på at du vil slette dette egendefinerte feltet? Dens lagrede verdier vil også bli fjernet."* Sletting av et felt fjerner permanent det **og hver verdi som er lagret for det** på alle personer -- dette kan ikke angres.

## Fyll inn verdier på en person

Når minst ett egendefinert felt finnes, lever verdiene sine ved siden av de innebygde detaljene på hver persons oppføring -- du ser dem i **Personlige detaljer** og redigerer dem på det samme skjemaet du bruker for resten av personens informasjon. Ingenting ekstra vises før du har definert ditt første felt.

1. Åpne en persons oppføring i **Mennesker**.
2. I delen **Personlige detaljer**, klikk **Rediger** (blyantikonet).
3. Bla ned til området **Egendefinerte felt** nederst i redigeringsskjemaet og fyll inn en verdi for hvert felt. Hvert felt viser inngangen som samsvarer med sin type -- en datovalger for Dato-felt, en ja/nei-rullegardin for Ja/Nei-felt, en valgliste for Flervalg, og så videre.
4. Klikk **Lagre**. Egendefinerte feltverdier dine lagres sammen med resten av personens detaljer.

Tilbake på profilen viser nå ethvert felt som har en verdi i delen **Personlige detaljer** (Ja/Nei-svar leses som *Ja* eller *Nei*, og Flervalg viser alternativets etikett). Felt som er tomme, skjules enkelt. For å fjerne en verdi redigerer du personen, tømmer feltet og lagrer -- en tom verdi slettes fra posten i stedet for å lagres som tomt.

:::tip
Det klassiske brukstilfelle er sikkerhet for frivillig: opprett et **Dato**-felt kalt *Bakgrunnkontroll utløper*, registrer hver frivilligs dato, deretter bygger du en [Lagret liste](../people/lists.md) som flagg alle hvis dato har gått.
:::

## Søk og bygg lister på egendefinerte felt

Egendefinerte felt er fullt søkbare:

1. På siden **Mennesker** åpner du [Avansert søk](../people/searching-people.md).
2. Utvid kategorien **Egendefinerte felt**.
3. Merk av feltet du vil filtrere på, velg en operator, og skriv inn en verdi. Operatorene som tilbys samsvarer med feltets type:
   - **Tekstboks** -- inneholder, er lik, begynner med, slutter med.
   - **Hele tall / Desimal** -- er lik, større enn, større enn eller lik, mindre enn, mindre enn eller lik.
   - **Dato** -- er lik, etter (større enn), før (mindre enn).
   - **Ja/Nei** -- er lik Ja eller Nei.
   - **Flervalg** -- er lik eller inneholder ett av valgene.

Lagre ethvert egendefinert feltsøk som en [Liste](../people/lists.md). Lister er direkteforespørsler, så en liste bygd på *Bakgrunnkontroll utløper før i dag* sjekker på nytt hver person hver gang du åpner den -- ingen manuell vedlikehold.

## Hva skjer ved sammenslåing

Når du [slår sammen to personoppføringer](../people/adding-people.md), overføres verdier for egendefinerte felt automatisk. Personen du beholder holder på sine egne verdier; for ethvert felt der bare den slettede personen hadde en verdi, kopieres denne verdien over slik at ingenting går tapt.

## Relaterte artikler

- [Søk etter mennesker](../people/searching-people.md) -- avansert søk, inkludert kategorien Egendefinerte felt
- [Lagrede lister](../people/lists.md) -- lagre et egendefinert feltsøk og kjør det på nytt direkte
- [Roller & rettigheter](./roles-permissions.md) -- hvem som kan definere felt og redigere verdier
- [Opprett skjemaer](../forms/creating-forms.md) -- for flerspørsmålsdatainnsamling hvor et fullstendig skjema passer bedre enn enkeltfelt

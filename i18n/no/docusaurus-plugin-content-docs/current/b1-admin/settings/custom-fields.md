---
title: "Egendefinerte felt"
---

# Egendefinerte felt

<div class="article-intro">

**Egendefinerte felt** lar deg spore din egen informasjon på hver personpost -- ting B1 ikke har et innebygd felt for, som en bakgrunnssjekk utløpsdato, en T-skjorte størrelse eller en døpeklasse status. Du definerer et felt en gang i innstillinger, deretter fyller du in en verdi på hver persons profil og søk eller bygge lister på den. Dette erstatter den eldre omveien med å opprette et folk-skjema bare for å lagre en enkelt piece egendefinert data.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **Folk** redigeringstillatelse for å definere felt og for å fylle inn verdier, og få tilgang til **Innstillinger**-området. Alle med Folk-visningsrettigheter kan se verdiene. Se [Roller og tillatelser](./roles-permissions.md).
- Bestem hva du vil spore og hvilken type som passer best (tekst, et tall, en dato, et ja/nei-svar eller en plukkli) før du starter.

</div>

## Åpne egendefinerte felt

I B1 Admin, gå til **Innstillinger** i venstre sidepanel og velg **Egendefinerte felt**-kortet. Du kan også gå direkte dit på **/settings/custom-fields**. Du vil se en liste over hvert felt du har definert, som viser dets **Navn** og **felttype**. Hvis du ikke har opprettet noen ennå, leser panelet *"Ingen egendefinerte felt har blitt lagt til ennå."*

## Legge til et felt

1. Klikk **Legg til felt**.
2. I editoren som åpner seg til høyre, angi et **navn** -- dette er merket personalet vil se på person-profiler og i søk (for eksempel, *Bakgrunnssjekk utløper*).
3. Velg en **felttype**:
   - **Tekstboks** -- fri-form kort tekst.
   - **Helt tall** -- tall uten desimaler (for eksempel, en telling).
   - **Desimal** -- tall som kan inkludere desimaler.
   - **Dato** -- en kalenderdato.
   - **Ja/Nei** -- et enkelt ja-eller-nei-svar.
   - **Flere valg** -- en plukkli. Når du velger denne typen, en **valgredigerer** vises slik at du kan legge til hvert alternativ folk kan velge fra.
4. Klikk **Lagre**.

Feltet er nå tilgjengelig på hver persons profil.

:::info
Felttypene er samme sett brukt for [skjemaspørsmål](../forms/creating-forms.md), slik at verdiene oppfører seg konsistent på tvers av B1.
:::

## Redigering av et felt

Klikk en hvilken som helst feltrad i listen for å gjenåpne den i editoren. Endre navn, type eller valg og klikk **Lagre**.

:::warning
Endring av **felttypen** til et felt som allerede har verdier (for eksempel, fra tekstboks til dato) kan etterlate tidligere angitte verdier i et format som ikke lenger stemmer overens med den nye typen. Endre typer forsiktig når personalet har startet med å fylle feltet.
:::

## Sletting av et felt

Åpne et felt for redigering og klikk **Slett**. Du vil bli spurt om å bekrefte: *"Er du sikker på at du vil slette dette egendefinerte feltet? Dets lagrede verdier vil også bli fjernet."* Sletting av et felt fjerner permanent det **og hver verdi lagret for det** på alle mennesker -- dette kan ikke angres.

## Fylle inn verdier på en person

Når minst ett egendefinert felt eksisterer, lever dets verdier rett ved siden av de innebygde detaljene på hver persons post -- du viser dem i **Personlige detaljer** og redigerer dem på samme skjema du bruker for resten av personens informasjon. Ingenting ekstra vises til du har definert ditt første felt.

1. Åpne en persons post i **Folk**.
2. I **personlige detaljer**-seksjonen, klikk **Rediger** (blyant)-knappen.
3. Scroll til **egendefinerte felt**-området nederst i redigeringsskjemaet og fyll inn en verdi for hvert felt. Hvert felt viser inndataen som samsvarer med sin type -- en datovelger for dato-felt, en ja/nei-rullegardin for ja/nei-felt, en plukkli for flere valg og så videre.
4. Klikk **Lagre**. Dine egendefinerte feltverdier lagres sammen med resten av personens detaljer.

Tilbake på profilen, viser ethvert felt som har en verdi nå i **personlige detaljer**-seksjonen (ja/nei-svar leses som *Ja* eller *Nei*, og flere valg viser etiketten for alternativet). Felt etterlatt blank er ganske enkelt skjult. For å fjerne en verdi, rediger personen, tøm feltet og lagre -- en tom verdi slettes fra posten i stedet for å lagres som blank.

:::tip
Det klassiske brukstilfelle er frivillig sikkerhet: opprett en **dato**-felt kalt *bakgrunnssjekk utløper*, registrer hver frivilligs dato, deretter bygge en [lagret liste](../people/lists.md) som flagget alle hvis dato har passert.
:::

## Søking og bygge lister på egendefinerte felt

Egendefinerte felt er fullt søkbar:

1. På **folk**-siden, åpne [avansert søk](../people/searching-people.md).
2. Ekspander **egendefinerte felt**-kategorien.
3. Sjekk feltet du vil filtrere på, velg en operator og angi en verdi. Operatørene som tilbys stemmer overens med feltets type:
   - **Tekstboks** -- inneholder, lik, starter med, ender med.
   - **Helt tall / desimal** -- lik, større enn, større enn eller lik, mindre enn, mindre enn eller lik.
   - **Dato** -- lik, etter (større enn), før (mindre enn).
   - **Ja/Nei** -- lik ja eller nei.
   - **Flere valg** -- lik eller inneholder ett av valgene.

Lagre ethvert egendefinert felt søk som en [liste](../people/lists.md). Lister er direkte spørringer, så en liste bygget på *bakgrunnssjekk utløper er før i dag* re-sjekker hver person hver gang du åpner den -- ingen manuell vedlikehold.

## Hva skjer ved fusjon

Når du [slår sammen to person-poster](../people/adding-people.md), egendefinert felt-verdier overføres automatisk. Personen du holder på til deres egne verdier; for ethvert felt hvor bare den fjernede personen hadde en verdi, blir denne verdien kopiert over slik at ingenting går tapt.

## Relaterte artikler

- [Søk folk](../people/searching-people.md) -- avansert søk, inkludert egendefinerte felt-kategorien
- [Lagrede lister](../people/lists.md) -- lagre et egendefinert felt-søk og kjør det på nytt direkte
- [Roller og tillatelser](./roles-permissions.md) -- hvem kan definere felt og redigere verdier
- [Opprett skjemaer](../forms/creating-forms.md) -- for multi-spørsmål data innsamling hvor et fullt skjema passer bedre enn enkelt felt

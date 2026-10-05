---
title: "Egendefinerte felt"
---

# Egendefinerte felt

<div class="article-intro">

Med **Egendefinerte felt** kan du registrere din egen informasjon på hver personprofil — ting B1 ikke har et innebygd felt for, som utløpsdato for politiattest, T-skjortestørrelse eller status på dåpskurs. Du definerer et felt én gang under Innstillinger, fyller deretter inn en verdi på hver persons profil og kan søke og bygge lister på det. Dette erstatter den eldre nødløsningen med å opprette et Personer-skjema bare for å lagre én enkelt opplysning.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger redigeringstillatelse for **Personer** for å definere felt og fylle inn verdier, samt tilgang til området **Innstillinger**. Alle med visningstillatelse for Personer kan se verdiene. Se [Roller og tillatelser](./roles-permissions.md).
- Bestem hva du vil registrere og hvilken type som passer best (tekst, et tall, en dato, et ja/nei-svar eller en nedtrekksliste) før du starter.

</div>

## Åpne egendefinerte felt

I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Innstillinger > Innstillinger** og klikker på kortet **Egendefinerte felt**. Du kan også gå direkte til **/settings/custom-fields**. Du ser en liste over alle feltene du har definert, med **Navn** og **Felttype**. Hvis du ikke har opprettet noen ennå, står det *«Ingen egendefinerte felt er lagt til ennå.»*

## Legge til et felt

1. Klikk på **Legg til felt**.
2. I redigeringsvinduet som åpnes til høyre skriver du inn et **Navn** — dette er etiketten medarbeiderne ser på personprofiler og i søk (for eksempel *Politiattest utløper*).
3. Velg en **Felttype**:
   - **Tekstfelt** — kort fritekst.
   - **Heltall** — tall uten desimaler (for eksempel et antall).
   - **Desimaltall** — tall som kan ha desimaler.
   - **Dato** — en kalenderdato.
   - **Ja/Nei** — et enkelt ja- eller nei-svar.
   - **Flervalg** — en nedtrekksliste. Når du velger denne typen, vises en **valgredigerer** der du legger til hvert alternativ man kan velge mellom.
4. Klikk på **Lagre**.

Feltet er nå tilgjengelig på alle personers profiler.

:::info
Felttypene er de samme som brukes for [skjemaspørsmål](../forms/creating-forms.md), så verdiene oppfører seg likt i hele B1.
:::

## Redigere et felt

Klikk på en rad i listen for å åpne feltet i redigeringsvinduet igjen. Endre navn, type eller valg og klikk på **Lagre**.

:::warning
Hvis du endrer **Felttype** for et felt som allerede har verdier (for eksempel fra Tekstfelt til Dato), kan tidligere innskrevne verdier få et format som ikke lenger passer til den nye typen. Vær forsiktig med å endre typer når medarbeiderne har begynt å fylle ut feltet.
:::

## Slette et felt

Åpne et felt for redigering og klikk på **Slett**. Du blir bedt om å bekrefte: *«Er du sikker på at du vil slette dette egendefinerte feltet? De lagrede verdiene fjernes også.»* Når du sletter et felt, fjernes det permanent **sammen med alle verdier som er lagret for det** hos alle personer — dette kan ikke angres.

## Fylle inn verdier på en person

Så snart det finnes minst ett egendefinert felt, ligger verdiene rett ved siden av de innebygde opplysningene på hver persons profil — du ser dem under **Personopplysninger** og redigerer dem i samme skjema som resten av personens informasjon. Ingenting ekstra vises før du har definert det første feltet.

1. Åpne personens profil under **Personer**.
2. I delen **Personopplysninger** klikker du på **Rediger**-knappen (blyanten).
3. Bla til området **Egendefinerte felt** nederst i redigeringsskjemaet og fyll inn en verdi for hvert felt. Hvert felt viser inndataelementet som passer til typen — en datovelger for Dato-felt, en ja/nei-nedtrekksmeny for Ja/Nei-felt, en nedtrekksliste for Flervalg, og så videre.
4. Klikk på **Lagre**. Verdiene i de egendefinerte feltene lagres sammen med resten av personens opplysninger.

Tilbake på profilen vises alle felt som har en verdi nå i delen **Personopplysninger** (Ja/Nei-svar vises som *Ja* eller *Nei*, og Flervalg viser alternativets etikett). Felt som er tomme, skjules. For å fjerne en verdi redigerer du personen, tømmer feltet og lagrer — en tom verdi slettes fra posten i stedet for å lagres som tom.

:::tip
Det klassiske bruksområdet er frivilliges sikkerhet: opprett et **Dato**-felt kalt *Politiattest utløper*, registrer datoen for hver frivillig, og bygg deretter en [lagret liste](../people/lists.md) som markerer alle som har passert datoen.
:::

## Søke og bygge lister på egendefinerte felt

Egendefinerte felt er fullt søkbare:

1. På siden **Personer** åpner du [avansert søk](../people/searching-people.md).
2. Utvid kategorien **Egendefinerte felt**.
3. Kryss av for feltet du vil filtrere på, velg en operator og skriv inn en verdi. Operatorene som tilbys, passer til feltets type:
   - **Tekstfelt** — inneholder, er lik, begynner med, slutter med.
   - **Heltall / Desimaltall** — er lik, større enn, større enn eller lik, mindre enn, mindre enn eller lik.
   - **Dato** — er lik, etter (større enn), før (mindre enn).
   - **Ja/Nei** — er lik Ja eller Nei.
   - **Flervalg** — er lik eller inneholder ett av valgene.

Lagre ethvert søk på egendefinerte felt som en [liste](../people/lists.md). Lister er levende spørringer, så en liste bygget på *Politiattest utløper er før i dag* sjekker alle personer på nytt hver gang du åpner den — uten manuelt vedlikehold.

## Vise et egendefinert felt som kolonne

For å se et felts verdier for alle på én gang legger du det til som kolonne på siden **Personer**. Åpne kolonnevelgeren, bytt til fanen **Egendefinert** og kryss av for feltet. Hver persons verdi vises i en egen kolonne ved siden av de innebygde. Se [Vise egendefinerte felt som kolonner](../people/searching-people.md#showing-custom-fields-as-columns).

## Hva skjer ved sammenslåing

Når du [slår sammen to personposter](../people/adding-people.md), følger verdiene i egendefinerte felt automatisk med. Personen du beholder, beholder sine egne verdier; for felt der bare den fjernede personen hadde en verdi, kopieres den verdien over slik at ingenting går tapt.

## Relaterte artikler

- [Søke etter personer](../people/searching-people.md) — avansert søk, inkludert kategorien Egendefinerte felt, og visning av egendefinerte felt som kolonner
- [Lagrede lister](../people/lists.md) — lagre et søk på egendefinerte felt og kjør det på nytt live
- [Roller og tillatelser](./roles-permissions.md) — hvem som kan definere felt og redigere verdier
- [Opprette skjemaer](../forms/creating-forms.md) — for innsamling av data med flere spørsmål der et fullt skjema passer bedre enn enkeltfelt

---
title: "Egendefinerte felt"
description: "Definer egendefinerte felt i B1 Admin for å registrere ekstra opplysninger om personer, som utløpsdato for bakgrunnssjekk eller t-skjortestørrelse, og søk og filtrer på dem."
---

# Egendefinerte felt

<div class="article-intro">

**Egendefinerte felt** lar deg registrere din egen informasjon på hver personpost -- ting B1 ikke har et innebygd felt for, som utløpsdato for bakgrunnssjekk, t-skjortestørrelse eller status for dåpsundervisning. Du definerer et felt én gang i Innstillinger, fyller inn en verdi på hver persons profil, og søker eller lager lister basert på det. Dette erstatter den eldre løsningen med å lage et skjema for personer bare for å lagre én opplysning.

</div>

## Opplæringsvideo

<YouTube id="yUfDEbp2HQ4" title="Custom Fields, Bulk Editing, and Exporting in B1" next="Creating Groups and Adding Members in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Personer – rediger** for å definere felt og fylle inn verdier, og tilgang til området **Innstillinger**. Alle med tillatelsen Personer – vis kan se verdiene. Se [Roller og tillatelser](./roles-permissions.md).
- Bestem hva du vil registrere, og hvilken type som passer best (tekst, et tall, en dato, et ja/nei-svar eller en nedtrekksliste) før du begynner.

</div>

## Åpne egendefinerte felt

I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Innstillinger > Innstillinger** og klikker **Egendefinerte felt** i listen til venstre for å rulle til seksjonen **Egendefinerte felt**. Du kan også gå direkte dit på **/settings/custom-fields**. Du ser en liste over alle feltene du har definert, med **Navn** og **Feltype**. Hvis du ikke har laget noen ennå, står det i panelet *«Ingen egendefinerte felt er lagt til ennå.»*

## Titler

Kortet **Titler** øverst i seksjonen Egendefinerte felt viser titlene som tilbys i boksen **Tittel** når noen legger til eller redigerer en person, både i B1 Admin og i B1-appen (profilredigeringen og påmeldingsskjemaet for gjester). Listen starter med Mr, Mrs, Miss, Ms, Dr, Prof, Rev og Pastor.

1. Skriv en tittel i **Ny tittel** (opptil 10 tegn), for eksempel *Diakon* eller *Eldste*, og klikk **Legg til tittel**.
2. For å fjerne en tittel fra listen, klikker du **×** på brikken.
3. Klikk **Lagre**.

:::tip
Boksen for tittel tar fortsatt imot skrevet tekst, så ansatte og medlemmer kan skrive inn en tittel som ikke står på listen. Å fjerne en tittel fra listen endrer ikke personer som allerede har den.
:::

## Legge til et felt

1. Klikk **Legg til felt**.
2. I editoren som åpnes til høyre skriver du inn et **navn** -- dette er etiketten ansatte vil se på personprofiler og i søk (for eksempel *Bakgrunnssjekk utløper*).
3. Velg en **feltype**:
   - **Tekstboks** — fri tekst, kort.
   - **Heltall** — tall uten desimaler (for eksempel en telling).
   - **Desimaltall** — tall som kan inneholde desimaler.
   - **Dato** — en kalenderdato.
   - **Ja/nei** — et enkelt ja- eller nei-svar.
   - **Flervalg** — en nedtrekksliste. Når du velger denne typen, vises en **valgeditor** der du kan legge til hvert alternativ folk kan velge.
4. Klikk **Lagre**.

Feltet er nå tilgjengelig på alle personers profiler.

:::info
Feltypene er de samme som brukes for [spørsmål i skjemaer](../forms/creating-forms.md), så verdiene oppfører seg konsekvent i B1.
:::

## Redigere et felt

Klikk på en feltrad i listen for å åpne den på nytt i editoren. Endre navn, type eller valg og klikk **Lagre**.

:::warning
Hvis du endrer **Feltype** på et felt som allerede har verdier (for eksempel fra Tekstboks til Dato), kan tidligere registrerte verdier stå i et format som ikke passer den nye typen. Endre typer med forsiktighet når ansatte har begynt å fylle ut feltet.
:::

## Slette et felt

Åpne et felt for redigering og klikk **Slett**. Du må bekrefte: *«Er du sikker på at du vil slette dette egendefinerte feltet? Lagrede verdier fjernes også.»* Å slette et felt fjerner det for godt, **og alle verdier som er lagret for det** på alle personer -- dette kan ikke angres.

## Fylle inn verdier på en person

Når minst ett egendefinert felt finnes, ligger verdiene rett ved siden av de innebygde opplysningene på hver persons post -- du ser dem sammen med personens kontaktopplysninger til venstre på profilen, og redigerer dem i samme skjema som du bruker for resten av personens opplysninger. Ingenting vises ekstra før du har definert ditt første felt.

1. Åpne en persons post under **Personer**.
2. Klikk knappen **Rediger** til venstre på profilen, under personens kontaktopplysninger.
3. Gå ned til området **Egendefinerte felt** nederst i skjemaet og fyll inn en verdi for hvert felt. Hvert felt viser inndatafeltet som passer typen -- en datovelger for datofelt, en nedtrekksliste for ja/nei-felt, en liste for flervalg, og så videre.
4. Klikk **Lagre**. Verdiene for egendefinerte felt lagres sammen med resten av personens opplysninger.

Tilbake på profilen vises alle felt som har en verdi under personens kontaktopplysninger som *Feltnavn: verdi* (ja/nei-svar vises som *Ja* eller *Nei*, og flervalg viser alternativets etikett). Felt uten verdi skjules. For å fjerne en verdi redigerer du personen, tømmer feltet og lagrer -- en tom verdi slettes fra posten i stedet for å lagres som blank.

:::tip
Det klassiske bruksområdet er sikkerhet for frivillige: lag et felt av typen **Dato** som heter *Bakgrunnssjekk utløper*, registrer datoen for hver frivillig, og bygg deretter en [lagret liste](../people/lists.md) som flagger alle hvis dato har passert.
:::

## Søke og lage lister basert på egendefinerte felt

Egendefinerte felt kan søkes fullt ut:

1. På siden **Personer** åpner du [avansert søk](../people/searching-people.md).
2. Utvid kategorien **Egendefinerte felt**.
3. Kryss av for feltet du vil filtrere på, velg en operator, og skriv inn en verdi. Operatorene som tilbys, samsvarer med feltets type:
   - **Tekstboks** — inneholder, er lik, starter med, slutter med.
   - **Heltall / Desimaltall** — er lik, større enn, større enn eller lik, mindre enn, mindre enn eller lik.
   - **Dato** — er lik, etter (større enn), før (mindre enn).
   - **Ja/nei** — er lik Ja eller Nei.
   - **Flervalg** — er lik eller inneholder ett av valgene.

Lagre et egendefinert søk som en [liste](../people/lists.md). Lister er levende søk, så en liste bygget på *Bakgrunnssjekk utløper er før i dag* sjekker alle personer på nytt hver gang du åpner den -- uten manuelt vedlikehold.

## Vise et egendefinert felt som kolonne

For å se verdiene for et felt for alle samtidig, legg det til som en kolonne på siden **Personer**. Sett **Vis som** til **Tabell**, klikk ikonet **Velg kolonner** i sidehodet, bytt til fanen **Egendefinert**, og kryss av for feltet. Hver persons verdi vises i sin egen kolonne ved siden av de innebygde. Se [Vise egendefinerte felt som kolonner](../people/searching-people.md#showing-custom-fields-as-columns).

## Hva skjer ved sammenslåing

Når du [slår sammen to personposter](../people/adding-people.md), overføres verdier for egendefinerte felt automatisk. Personen du beholder, beholder sine egne verdier; for ethvert felt der bare den fjernede personen hadde en verdi, kopieres den over, slik at ingenting går tapt.

## Relaterte artikler

- [Søke etter personer](../people/searching-people.md) — avansert søk, inkludert kategorien Egendefinerte felt, og visning av egendefinerte felt som kolonner
- [Lagrede lister](../people/lists.md) — lagre et søk på egendefinerte felt og kjør det på nytt live
- [Roller og tillatelser](./roles-permissions.md) — hvem som kan definere felt og redigere verdier
- [Opprette skjemaer](../forms/creating-forms.md) — for innsamling av flere spørsmål der et helt skjema passer bedre enn enkeltfelt

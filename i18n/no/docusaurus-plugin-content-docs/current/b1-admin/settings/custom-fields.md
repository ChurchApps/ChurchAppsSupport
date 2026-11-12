---
title: "Egendefinerte felt"
description: "Definer egendefinerte felt i B1 Admin for å registrere ekstra opplysninger om personer, som utløpsdatoer for bakgrunnssjekk eller t-skjortestørrelser, og søk og filtrer deretter på dem."
---

# Egendefinerte felt

<div class="article-intro">

**Egendefinerte felt** lar deg registrere din egen informasjon på hver personregistrering — ting B1 ikke har et innebygd felt for, som utløpsdato for bakgrunnssjekk, t-skjortestørrelse eller status for dåpsklasse. Du definerer et felt én gang i Innstillinger, fyller deretter inn en verdi på hver persons profil, og søker eller lager lister basert på den. Dette erstatter den eldre løsningen med å lage et skjema for personer bare for å lagre én enkelt egendefinert opplysning.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="yUfDEbp2HQ4" title="Egendefinerte felt, massredigering og eksport i B1" next="Opprette grupper og legge til medlemmer i B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger kirkeinnstillinger** for å åpne siden Innstillinger (og for å lagre listen over titler), i tillegg til tillatelsen **Rediger personer** for å definere felt og fylle inn verdier. Alle med tillatelse til å se personer kan se verdiene. Se [Roller og tillatelser](./roles-permissions.md).
- Bestem hva du vil registrere, og hvilken type som passer best (tekst, et tall, en dato, ja/nei-svar eller en nedtrekksliste) før du begynner.

</div>

## Åpne egendefinerte felt {#opening-custom-fields}

I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Innstillinger > Innstillinger** og klikker på **Egendefinerte felt** i listen til venstre for å scrolle til delen **Egendefinerte felt**. Du kan også gå direkte dit på **/settings/custom-fields**. Du ser en liste over alle feltene du har definert, med **navn** og **feltype**. Hvis du ikke har opprettet noen ennå, står det i panelet *«Det er ikke lagt til noen egendefinerte felt ennå.»*

## Titler {#titles}

Kortet **Titler** øverst i delen Egendefinerte felt lister opp titlene som tilbys i boksen **Tittel** når noen legger til eller redigerer en person, både i B1 Admin og i B1-appen (profilredigeringen og påmeldingsskjemaet for gjester). Listen starter med Mr, Mrs, Miss, Ms, Dr, Prof, Rev og Pastor.

1. Skriv inn en tittel i **Ny tittel** (opptil 10 tegn), for eksempel *Diakon* eller *Eldste*, og klikk på **Legg til tittel**.
2. For å fjerne en tittel fra listen klikker du på **×** på brikken.
3. Klikk på **Lagre**. Meldingen *Titler lagret.* bekrefter endringen. Hvis du legger til en tittel som allerede står i listen, vises *Den tittelen står allerede i listen.*

:::tip
Boksen for tittel tar fortsatt imot skrevet tekst, slik at ansatte og medlemmer kan skrive inn en tittel som ikke står i listen. Å fjerne en tittel fra listen endrer ikke personer som allerede har den.
:::

## Legge til et felt {#adding-a-field}

1. Klikk på **Legg til felt**.
2. I redigeringsverktøyet som åpnes til høyre, skriver du inn et **navn** — dette er etiketten medarbeidere ser på personprofiler og i søk (for eksempel *Bakgrunnssjekk utløper*).
3. Velg en **feltype**:
   - **Tekstboks** — fri, kort tekst.
   - **Heltall** — tall uten desimaler (for eksempel en telling).
   - **Desimaltall** — tall som kan inneholde desimaler.
   - **Dato** — en kalenderdato.
   - **Ja/nei** — et enkelt ja- eller nei-svar.
   - **Flervalg** — en nedtrekksliste. Når du velger denne typen, vises et **redigeringsverktøy for valg**, slik at du kan legge til hvert alternativ folk kan velge mellom.
4. Klikk på **Lagre**.

Feltet er nå tilgjengelig på hver persons profil.

:::info
Feltypene er de samme som brukes for [skjemaspørsmål](../forms/creating-forms.md), så verdiene oppfører seg likt i hele B1.
:::

## Redigere et felt {#editing-a-field}

Klikk på en hvilken som helst feltrad i listen for å åpne den i redigeringsverktøyet igjen. Endre navn, type eller valg og klikk på **Lagre**.

:::warning
Å endre **feltype** på et felt som allerede har verdier (for eksempel fra Tekstboks til Dato) kan føre til at tidligere registrerte verdier står i et format som ikke lenger passer den nye typen. Endre typer med forsiktighet når medarbeidere har begynt å fylle inn feltet.
:::

## Slette et felt {#deleting-a-field}

Åpne et felt for redigering og klikk på **Slett**. Du blir bedt om å bekrefte: *«Er du sikker på at du vil slette dette egendefinerte feltet? De lagrede verdiene vil også bli fjernet.»* Å slette et felt fjerner det permanent **og alle verdier som er lagret for det** på alle personer — dette kan ikke angres.

## Fylle inn verdier på en person {#filling-in-values-on-a-person}

Når minst ett egendefinert felt finnes, ligger verdiene rett ved siden av de innebygde opplysningene på hver persons registrering — du ser dem sammen med personens kontaktopplysninger til venstre på profilen, og redigerer dem i samme skjema som du bruker for resten av personens opplysninger. Ingenting ekstra vises før du har definert ditt første felt.

1. Åpne en persons registrering under **Personer**.
2. Klikk på knappen **Rediger** til venstre på profilen, under personens kontaktopplysninger.
3. Scroll ned til området **Egendefinerte felt** nederst i redigeringsskjemaet og fyll inn en verdi for hvert felt. Hvert felt viser inndatafeltet som passer typen — en datovelger for datofelt, en nedtrekksliste for ja/nei-felt, en nedtrekksliste for flervalg, og så videre.
4. Klikk på **Lagre**. Verdiene for egendefinerte felt lagres sammen med resten av personens opplysninger.

Tilbake på profilen vises nå alle felt som har en verdi under personens kontaktopplysninger som *Feltnavn: verdi* (ja/nei-svar vises som *Ja* eller *Nei*, og flervalg viser alternativets etikett). Felt som er tomme, skjules bare. For å fjerne en verdi redigerer du personen, tømmer feltet og lagrer — en tom verdi slettes fra registreringen i stedet for å lagres som tom.

:::tip
Det klassiske bruksområdet er sikkerhet for frivillige: opprett et **Dato**-felt som heter *Bakgrunnssjekk utløper*, registrer datoen for hver frivillig, og lag deretter en [lagret liste](../people/lists.md) som flagger alle hvis dato er passert.
:::

## Søke og lage lister basert på egendefinerte felt {#searching-and-building-lists-on-custom-fields}

Egendefinerte felt er fullt søkbare:

1. På siden **Personer** åpner du [avansert søk](../people/searching-people.md).
2. Utvid kategorien **Egendefinerte felt**.
3. Kryss av for feltet du vil filtrere på, velg en operator og skriv inn en verdi. Operatorene som tilbys samsvarer med feltets type:
   - **Tekstboks** — inneholder, er lik, starter med, slutter med.
   - **Heltall / Desimaltall** — er lik, større enn, større enn eller lik, mindre enn, mindre enn eller lik.
   - **Dato** — er lik, etter (større enn), før (mindre enn).
   - **Ja/nei** — er lik Ja eller Nei.
   - **Flervalg** — er lik eller inneholder ett av valgene.

Lagre et hvilket som helst egendefinert felt-søk som en [liste](../people/lists.md). Lister er levende spørringer, så en liste basert på *Bakgrunnssjekk utløper er før i dag* kontrollerer alle personer på nytt hver gang du åpner den — uten manuelt vedlikehold.

## Vise et egendefinert felt som kolonne {#showing-a-custom-field-as-a-column}

For å se verdiene til et felt for alle samtidig, legg det til som kolonne på siden **Personer**. Sett **Vis som** til **Tabell**, klikk på ikonet **Velg kolonner** i sidehodet, bytt til fanen **Egendefinert** og kryss av for feltet. Hver persons verdi vises i sin egen kolonne ved siden av de innebygde. Se [Vise egendefinerte felt som kolonner](../people/searching-people.md#showing-custom-fields-as-columns).

## Hva som skjer ved sammenslåing {#what-happens-on-merge}

Når du [slår sammen to personregistreringer](../people/adding-people.md), overføres verdier for egendefinerte felt automatisk. Personen du beholder, beholder sine egne verdier; for ethvert felt der bare den fjernede personen hadde en verdi, kopieres den verdien over, slik at ingenting går tapt.

## Relaterte artikler {#related-articles}

- [Søke etter personer](../people/searching-people.md) — avansert søk, inkludert kategorien Egendefinerte felt, og visning av egendefinerte felt som kolonner
- [Lagrede lister](../people/lists.md) — lagre et søk på egendefinerte felt og kjør det på nytt live
- [Roller og tillatelser](./roles-permissions.md) — hvem som kan definere felt og redigere verdier
- [Opprette skjemaer](../forms/creating-forms.md) — for innsamling av data med flere spørsmål, der et helt skjema passer bedre enn enkeltfelt

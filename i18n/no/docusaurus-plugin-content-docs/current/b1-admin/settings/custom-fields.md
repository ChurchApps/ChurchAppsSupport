---
title: "Egendefinerte felt"
---

# Egendefinerte felt

<div class="article-intro">

**Egendefinerte felt** lar deg spore din egen informasjon på hver personpost — ting B1 ikke har et innebygd felt for, som en utløpsdato for bakgrunnssjekk, T-skjortestørrelse eller status for dåpsundervisning. Du definerer et felt én gang under Innstillinger, og fyller deretter inn en verdi på hver persons profil, og kan søke etter eller lage lister basert på feltet. Dette erstatter den eldre løsningen med å lage et personskjema bare for å lagre ett enkelt egendefinert datafelt.

</div>

## Opplæringsvideo

<YouTube id="yUfDEbp2HQ4" title="Custom Fields, Bulk Editing, and Exporting in B1" next="Creating Groups and Adding Members in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger redigeringstillatelsen **Personer** for å definere felt og fylle inn verdier, og tilgang til området **Innstillinger**. Alle med visningstillatelse for Personer kan se verdiene. Se [Roller og tillatelser](./roles-permissions.md).
- Bestem hva du vil spore, og hvilken type som passer best (tekst, et tall, en dato, et ja/nei-svar eller en nedtrekksliste), før du begynner.

</div>

## Åpne egendefinerte felt

I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Innstillinger > Innstillinger** og klikker på **Egendefinerte felt** i listen til venstre for å gå til seksjonen **Egendefinerte felt**. Du kan også gå direkte dit på **/settings/custom-fields**. Du ser en liste over alle feltene du har definert, med **Navn** og **Felttype**. Hvis du ikke har laget noen ennå, står det i panelet *"Ingen egendefinerte felt er lagt til ennå."*

## Legge til et felt

1. Klikk på **Legg til felt**.
2. I redigeringsverktøyet som åpnes til høyre, skriv inn et **Navn** — dette er etiketten medarbeiderne ser på personprofiler og i søk (for eksempel *Bakgrunnssjekk utløper*).
3. Velg en **Felttype**:
   - **Tekstboks** — fri korttekst.
   - **Heltall** — tall uten desimaler (for eksempel en telling).
   - **Desimaltall** — tall som kan inneholde desimaler.
   - **Dato** — en kalenderdato.
   - **Ja/Nei** — et enkelt ja- eller nei-svar.
   - **Flervalg** — en nedtrekksliste. Når du velger denne typen, vises en **redigering for valgalternativer**, slik at du kan legge til hvert alternativ folk kan velge mellom.
4. Klikk på **Lagre**.

Feltet er nå tilgjengelig på hver persons profil.

:::info
Felttypene er de samme som brukes for [skjemaspørsmål](../forms/creating-forms.md), slik at verdiene oppfører seg likt i hele B1.
:::

## Redigere et felt

Klikk på en feltrad i listen for å åpne den igjen i redigeringsverktøyet. Endre navn, type eller valgalternativer, og klikk på **Lagre**.

:::warning
Hvis du endrer **Felttypen** på et felt som allerede har verdier (for eksempel fra Tekstboks til Dato), kan tidligere registrerte verdier ende opp i et format som ikke passer lenger til den nye typen. Endre typer med forsiktighet når medarbeiderne har begynt å fylle ut feltet.
:::

## Slette et felt

Åpne et felt for redigering og klikk på **Slett**. Du blir bedt om å bekrefte: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* → *"Er du sikker på at du vil slette dette egendefinerte feltet? Lagrede verdier vil også bli fjernet."* Når du sletter et felt, fjernes det permanent, **og alle verdier som er lagret for det** på alle personer. Dette kan ikke angres.

## Fylle inn verdier på en person

Når minst ett egendefinert felt finnes, ligger verdiene dets rett ved siden av de innebygde opplysningene på hver persons post — du ser dem sammen med personens kontaktopplysninger til venstre på profilen, og redigerer dem på samme skjema som du bruker for resten av personens informasjon. Ingenting ekstra vises før du har definert ditt første felt.

1. Åpne en persons post under **Personer**.
2. Klikk på knappen **Rediger** til venstre på profilen, under personens kontaktopplysninger.
3. Bla ned til området **Egendefinerte felt** nederst i redigeringsskjemaet, og fyll inn en verdi for hvert felt. Hvert felt viser inndatafeltet som passer til typen sin — en datovelger for datofelt, en nedtrekksliste for ja/nei-felt, en liste over valg for flervalgsfelt, og så videre.
4. Klikk på **Lagre**. Verdiene for dine egendefinerte felt lagres sammen med resten av personens opplysninger.

Tilbake på profilen vises alle felt som har en verdi nå under personens kontaktopplysninger, som *Feltnavn: verdi* (ja/nei-svar vises som *Ja* eller *Nei*, og flervalg viser valgalternativets etikett). Felt som er tomme, skjules. For å fjerne en verdi, redigerer du personen, tømmer feltet og lagrer — en tom verdi slettes fra posten i stedet for å lagres som tom.

:::tip
Det klassiske bruksområdet er sikkerhet for frivillige: lag et **Dato**-felt som heter *Bakgrunnssjekk utløper*, registrer datoen for hver frivillig, og bygg deretter en [lagret liste](../people/lists.md) som markerer alle hvis dato har passert.
:::

## Søke og lage lister basert på egendefinerte felt

Egendefinerte felt kan søkes i fullt ut:

1. På siden **Personer** åpner du [Avansert søk](../people/searching-people.md).
2. Utvid kategorien **Egendefinerte felt**.
3. Kryss av for feltet du vil filtrere på, velg en operator, og skriv inn en verdi. Operatorene som tilbys samsvarer med feltets type:
   - **Tekstboks** — inneholder, er lik, begynner med, slutter med.
   - **Heltall / Desimaltall** — er lik, større enn, større enn eller lik, mindre enn, mindre enn eller lik.
   - **Dato** — er lik, etter (større enn), før (mindre enn).
   - **Ja/Nei** — er lik Ja eller Nei.
   - **Flervalg** — er lik eller inneholder ett av valgalternativene.

Lagre ethvert søk på egendefinerte felt som en [liste](../people/lists.md). Lister er levende spørringer, så en liste bygget på *Bakgrunnssjekk utløper er før i dag* sjekker hver person på nytt hver gang du åpner den — uten manuelt vedlikehold.

## Vise et egendefinert felt som kolonne

For å se et felts verdier for alle på én gang, legger du det til som en kolonne på siden **Personer**. Endre **Vis som** til **Tabell**, klikk på ikonet **Velg kolonner** i sidehodet, bytt til fanen **Egendefinert**, og kryss av for feltet. Hver persons verdi vises i sin egen kolonne ved siden av de innebygde. Se [Vise egendefinerte felt som kolonner](../people/searching-people.md#showing-custom-fields-as-columns).

## Hva skjer ved sammenslåing

Når du [slår sammen to personposter](../people/adding-people.md), overføres verdiene for egendefinerte felt automatisk. Personen du beholder, beholder sine egne verdier; for ethvert felt der bare den fjernede personen hadde en verdi, kopieres den verdien over, slik at ingenting går tapt.

## Relaterte artikler

- [Søke etter personer](../people/searching-people.md) — avansert søk, inkludert kategorien Egendefinerte felt, og visning av egendefinerte felt som kolonner
- [Lagrede lister](../people/lists.md) — lagre et søk på egendefinerte felt og kjør det på nytt live
- [Roller og tillatelser](./roles-permissions.md) — hvem som kan definere felt og redigere verdier
- [Lage skjemaer](../forms/creating-forms.md) — for innsamling av data med flere spørsmål, der et helt skjema passer bedre enn enkeltfelt

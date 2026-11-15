---
title: "E-postmaler"
description: "Sett opp e-post- og tekstmeldingsmaler i B1 Admin, med flettefelt, valg for tekstmeldinger og forhåndsvisninger for masseutsendelser."
---

# E-postmaler

<div class="article-intro">

E-postmaler lar deg lagre gjenbrukbart e-postinnhold -- en velkomstmelding, en påminnelse om et arrangement, en takk for gave -- slik at du (eller en [arbeidsflyt](../serving/workflows.md)) kan sende det med ett klikk i stedet for å skrive det fra bunnen av hver gang. Den samme listen inneholder også tekstmeldingsmaler for vinduene for tekst til gruppe og person, og handlingen **Send tekstmelding** i arbeidsflyter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger kirkeinnstillinger** (menyvalget **E-postmaler** vises bare med den). Personer med **Rediger gruppemedlemmer** kan også åpne siden direkte på **/settings/email-templates**.

</div>

## Åpne e-postmaler {#accessing-email-templates}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Innstillinger**.
2. Klikk på **E-postmaler**.
3. Du ser en liste over eksisterende maler med **navn**, **emne**, **kategori** og datoen de sist ble **endret**.

## Opprette en mal {#creating-a-template}

1. Klikk på **Ny mal**.
2. Skriv inn et **malnavn** for å identifisere den i listen, og velg en **kategori** (Generelt, Arrangementer, Grupper, Giving, Velkomst eller Tekst) for å organisere malene dine. Velg **Tekst** for å lage en tekstmeldingsmal i stedet (se [Tekstmaler](#text-templates) nedenfor).
3. Skriv inn **emnelinjen**.
4. Skriv **innholdet** med tekstredigeringsverktøyet.
5. Klikk på **Lagre**.

## Flettefelt {#merge-fields}

Klikk på en flettefeltbrikke over emnet eller innholdet for å sette den inn der markøren står -- klikk først i teksten der du vil ha feltet, og klikk deretter på brikken. Markøren blir stående på plass, så du kan fortsette å skrive rett etter feltet som er satt inn. Hvis du klikker på en brikke for innhold uten å klikke inn i innholdet først, legges feltet til på slutten av innholdet. Når e-posten sendes, erstattes hvert flettefelt med mottakerens faktiske opplysninger:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Mottakerens navn
- `{{email}}` -- Mottakerens e-postadresse
- `{{churchName}}` -- Menighetens navn

### Flettefelt for gaver {#gift-merge-fields}

Disse feltene fylles bare inn når e-posten sendes av en [arbeidsflyt](../serving/workflows.md#sending-email) som ble startet av en **Gave · Opprettet**-utløser. I alle andre e-poster blir de tomme.

- `{{amount}}` -- Beløpet for gaven, for eksempel $50.00
- `{{giftDate}}` -- Datoen for gaven
- `{{fund}}` -- Fondet eller fondene gaven gikk til
- `{{receipt}}` -- Et gavesammendrag: datoen og metoden, en rad for hvert fond med beløp, og totalen. Bruk det til å sende giveren en kvittering i samme e-post som takken din. Det tilbys bare for innholdet, ikke emnet.

## Tekstmaler {#text-templates}

En mal med kategorien **Tekst** er en ren tekstmelding for tekstmeldinger, ikke e-post:

- Den har ikke emne. Tekstredigeringsverktøyet erstattes av en enkel boks for **tekstmelding** som tar opptil 1 600 tegn.
- Brikkene for flettefelt over boksen setter inn `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` eller [flettefeltene for gaver](#gift-merge-fields) der markøren står. I en tekst blir `{{receipt}}` til én linje, for eksempel *$50.00 til Generelt fond 8. nov. 2026*.
- Tekstmaler vises i velgeren **Last inn mal (valgfritt)** i tekstvinduet for en [gruppe](../groups/group-members.md#texting-group-members) eller en enkelt person. Når du velger en, fylles meldingen inn, og du kan fortsatt redigere den før du sender.
- De vises også i listen **Start fra en mal** i handlingen [Send tekstmelding](../serving/workflows.md#sending-a-text) i arbeidsflyter.
- De utelates fra velgerne for e-postmaler, inkludert handlingen **Send e-post** i arbeidsflyter.

Tekstmeldinger krever en tilkoblet [tekstmeldingsleverandør](./church-settings.md#texting).

## Forhåndsvise en mal {#previewing-a-template}

Klikk på **Forhåndsvis** for å se hvordan emnet og innholdet vil se ut med eksempeldata fylt inn for flettefeltene, før du lagrer eller sender.

## Bruke en mal {#using-a-template}

Lagrede maler kan velges når du skriver en e-post til personer eller en gruppe, og brukes som handling i [arbeidsflyter](../serving/workflows.md). Før menigheten din kan sende dem, må ChurchApps-teamet godkjenne menigheten for gruppe-e-post én gang. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church).

## Redigere og slette {#editing-and-deleting}

Klikk på **Rediger** på en malrad for å oppdatere den, eller **Slett** for å fjerne den permanent. B1 ber deg bekrefte før sletting.

## Neste steg {#next-steps}

- [Arbeidsflyter](../serving/workflows.md) -- Utløs en malt e-post automatisk basert på regler

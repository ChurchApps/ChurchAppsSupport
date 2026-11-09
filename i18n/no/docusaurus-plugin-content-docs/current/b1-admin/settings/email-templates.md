---
title: "E-postmaler"
description: "Sett opp e-post- og tekstmaler i B1 Admin, med flettefelt, valg for tekstmeldinger og forhåndsvisning for masseutsendelser."
---

# E-postmaler

<div class="article-intro">

E-postmaler lar deg lagre gjenbrukbart e-postinnhold -- en velkomstmelding, en arrangementspåminnelse, en takk for giving -- slik at du (eller en [arbeidsflyt](../serving/workflows.md)) kan sende det med ett klikk i stedet for å skrive det fra scratch hver gang. Den samme listen inneholder også tekstmaler for vinduene for tekst til grupper og personer, og handlingen **Send tekst** i arbeidsflyter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang til området Innstillinger i B1 Admin.

</div>

## Åpne e-postmaler

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Innstillinger**.
2. Klikk **E-postmaler**.
3. Du ser en liste over eksisterende maler med emne, kategori og dato for siste endring.

## Opprette en mal

1. Klikk **Ny mal**.
2. Skriv inn et **malnavn** for å identifisere den i listen, og velg en **kategori** (Generell, Arrangementer, Grupper, Giving, Velkomst eller Tekst) for å organisere malene. Velg **Tekst** for å lage en tekstmelding i stedet (se [Tekstmaler](#text-templates) nedenfor).
3. Skriv inn **emnelinjen**.
4. Skriv **innholdet** i tekstredigeringsprogrammet.
5. Klikk **Lagre**.

## Flettefelt {#merge-fields}

Klikk på en flettefeltbrikke over emnet eller innholdet for å sette den inn der markøren står -- klikk først der du vil ha feltet i teksten, og klikk deretter brikken. Markøren står på samme sted, så du kan fortsette å skrive rett etter det innsatte feltet. Hvis du klikker en brikke for innholdet uten først å klikke inn i innholdet, legges feltet til på slutten av innholdet. Når e-posten sendes, erstattes hvert flettefelt med mottakerens faktiske opplysninger:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Mottakerens navn
- `{{email}}` -- Mottakerens e-postadresse
- `{{churchName}}` -- Menighetens navn

### Flettefelt for gaver {#gift-merge-fields}

Disse feltene fylles bare ut når e-posten sendes av en [arbeidsflyt](../serving/workflows.md#sending-email) som en utløser **Donasjon · Opprettet** startet. I alle andre e-poster står de tomme.

- `{{amount}}` -- Beløpet for gaven, for eksempel $50.00
- `{{giftDate}}` -- Datoen for gaven
- `{{fund}}` -- Fondet eller fondene gaven gikk til
- `{{receipt}}` -- Et gaveoppsummering: datoen og metoden, en rad for hvert fond med beløpet, og totalen. Bruk det til å sende giveren en kvittering i samme e-post som takkebrevet. Det tilbys bare for innholdet, ikke emnet.

## Tekstmaler {#text-templates}

En mal med kategorien **Tekst** er en ren tekstmelding for SMS, ikke en e-post:

- Den har ikke noe emne. Tekstredigeringsprogrammet erstattes av en enkel boks **Tekstmelding** som tar opptil 1 600 tegn.
- Flettefeltbrikkene over boksen setter inn `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` eller [flettefeltene for gaver](#gift-merge-fields) der markøren står. I en tekst blir `{{receipt}}` til én linje, for eksempel *$50.00 til Generelt fond 8. nov. 2026*.
- Tekstmaler vises i listen **Last mal (valgfritt)** i tekstvinduet for en [gruppe](../groups/group-members.md#texting-group-members) eller én person. Når du velger en, fylles meldingen ut, og du kan fortsatt redigere den før du sender.
- De vises også i listen **Start fra en mal** i handlingen [Send tekst](../serving/workflows.md#sending-a-text) i arbeidsflyter.
- De utelates fra malvelgerne for e-post, inkludert handlingen **Send e-post** i arbeidsflyter.

Tekstutsendelser krever en tilkoblet [tekstleverandør](./church-settings.md#texting).

## Forhåndsvise en mal

Klikk **Forhåndsvis** for å se hvordan emnet og innholdet vil se ut med eksempeldata fylt inn i flettefeltene, før du lagrer eller sender.

## Bruke en mal

Lagrede maler kan velges når du skriver en e-post til personer eller en gruppe, og som en handling i [arbeidsflyter](../serving/workflows.md). Før menigheten din kan sende dem, må ChurchApps-teamet godkjenne dem for gruppe-e-post én gang. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church).

## Redigere og slette

Klikk på **redigeringsikonet** ved siden av en mal for å oppdatere den, eller på **slettikonet** for å fjerne den for godt.

## Neste steg

- [Arbeidsflyter](../serving/workflows.md) -- Utløs en malt e-post automatisk basert på regler

---
title: "E-postmaler"
description: "Sett opp e-post- og SMS-maler i B1 Admin med flettefelt, tekstmeldingsvalg og forhåndsvisninger for masseutsendelser."
---

# E-postmaler

<div class="article-intro">

E-postmaler lar deg lagre gjenbrukbart e-postinnhold -- en velkomstmelding, en påminnelse om et arrangement, en takk for en gave -- slik at du (eller en [arbeidsflyt](../serving/workflows.md)) kan sende det med ett klikk i stedet for å skrive det fra bunnen av hver gang. Den samme listen inneholder også SMS-maler for vinduene for å sende SMS til grupper og personer.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang til området Innstillinger i B1 Admin.

</div>

## Åpne e-postmaler

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Innstillinger**.
2. Klikk **E-postmaler**.
3. Du ser en liste over eksisterende maler, med emne, kategori og dato for sist endret.

## Opprette en mal

1. Klikk **Ny mal**.
2. Skriv inn et **malnavn** for å identifisere den i listen, og velg en **kategori** (Generelt, Arrangementer, Grupper, Gaver, Velkommen eller SMS) for å organisere malene dine. Velg **SMS** for å lage en SMS-mal i stedet (se [SMS-maler](#text-templates) nedenfor).
3. Skriv inn **emnelinjen**.
4. Skriv **innholdet** i den rike tekst-editoren.
5. Klikk **Lagre**.

## Flettefelt {#merge-fields}

Klikk på en flettefeltbrikke over emnet eller innholdet for å sette den inn der markøren står -- klikk først inn i teksten der du vil ha feltet, og klikk deretter brikken. Markøren står på samme sted, slik at du kan fortsette å skrive rett etter det innsatte feltet. Hvis du klikker en brikke for innhold uten først å klikke inn i innholdet, legges feltet til på slutten av innholdet. Når e-posten sendes, erstattes hvert flettefelt med mottakerens faktiske opplysninger:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Mottakerens navn
- `{{email}}` -- Mottakerens e-postadresse
- `{{churchName}}` -- Kirkens navn

## SMS-maler {#text-templates}

En mal med kategorien **SMS** er en ren tekstmelding for SMS i stedet for e-post:

- Den har ingen emnelinje. Den rike tekst-editoren erstattes med en enkel boks for **SMS-melding** som rommer opptil 1 600 tegn.
- Flettefeltbrikkene over boksen setter inn `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` eller `{{churchName}}` der markøren står.
- SMS-maler vises i nedtrekkslisten **Last inn mal (valgfritt)** i SMS-vinduet for en [gruppe](../groups/group-members.md#texting-group-members) eller en enkelt person. Når du velger en, fylles meldingen inn, og du kan fortsatt redigere den før du sender.
- De utelates fra velgerne for e-postmaler, inkludert arbeidsflythandlingen **Send e-post**.

For å kunne sende SMS må du ha koblet til en [SMS-leverandør](./church-settings.md#texting).

## Forhåndsvise en mal

Klikk **Forhåndsvis** for å se hvordan emnet og innholdet vil se ut med eksempeldata fylt inn i flettefeltene, før du lagrer eller sender.

## Bruke en mal

Lagrede maler kan velges når du skriver en e-post til personer eller en gruppe, og som en handling i [arbeidsflyter](../serving/workflows.md). Før kirken din kan sende dem, må ChurchApps-teamet godkjenne den for gruppe-e-post én gang. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church).

## Redigere og slette

Klikk på **redigeringsikonet** ved siden av en mal for å oppdatere den, eller på **slettikonet** for å fjerne den permanent.

## Neste steg

- [Arbeidsflyter](../serving/workflows.md) -- Utløs en malt e-post automatisk basert på regler

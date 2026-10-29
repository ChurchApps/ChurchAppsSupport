---
title: "E-postmaler"
---

# E-postmaler

<div class="article-intro">

E-postmaler lar deg lagre gjenbrukbart e-postinnhold — en velkomstmelding, en påminnelse om et arrangement, en takk for gave — slik at du (eller en [arbeidsflyt](../serving/workflows.md)) kan sende det med ett klikk i stedet for å skrive det fra bunnen av hver gang. Den samme listen inneholder også tekstmeldingsmaler for vinduene for tekst til gruppe og person.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang til Innstillinger-området i B1 Admin.

</div>

## Åpne e-postmaler

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Innstillinger**.
2. Klikk **E-postmaler**.
3. Du ser en liste over eksisterende maler med emne, kategori og dato for sist endret.

## Opprette en mal

1. Klikk **Ny mal**.
2. Skriv inn et **Malnavn** for å identifisere den i listen, og velg en **Kategori** (Generell, Arrangementer, Grupper, Gaver, Velkommen eller Tekst) for å hjelpe deg å organisere malene. Velg **Tekst** for å lage en tekstmeldingsmal i stedet (se [Tekstmaler](#text-templates) nedenfor).
3. Skriv inn **emnelinjen**.
4. Skriv **innholdet** i den rike tekst-editoren.
5. Klikk **Lagre**.

## Flettefelt

Klikk på en flettefeltbrikke over emnet eller innholdet for å sette den inn ved markøren — klikk først i teksten der du vil ha feltet, og klikk deretter på brikken. Markøren står på samme sted, slik at du kan fortsette å skrive rett etter det innsatte feltet. Hvis du klikker en brikke for innholdet uten først å klikke i innholdsteksten, legges feltet til på slutten av innholdet. Når e-posten sendes, erstattes hvert flettefelt med mottakerens faktiske opplysninger:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` — mottakerens navn
- `{{email}}` — mottakerens e-postadresse
- `{{churchName}}` — kirkens navn

## Tekstmaler

En mal med kategorien **Tekst** er en ren tekstmelding for SMS i stedet for e-post:

- Den har ingen emnelinje. Den rike tekst-editoren erstattes med en enkel boks **Tekstmelding** som holder opptil 1 600 tegn.
- Flettefeltbrikkene over boksen setter inn `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` eller `{{churchName}}` ved markøren.
- Tekstmaler vises i velgeren **Last inn mal (valgfritt)** i tekstvinduet for en [gruppe](../groups/group-members.md#texting-group-members) eller en enkelt person. Når du velger en, fylles meldingen ut, og du kan fortsatt redigere den før du sender.
- De er utelatt fra e-postmalvelgerne, inkludert handlingen **Send e-post** i arbeidsflyter.

Tekstsending krever en koblet [tekstmeldingstjeneste](./church-settings.md#texting).

## Forhåndsvise en mal

Klikk **Forhåndsvis** for å se hvordan emnet og innholdet vil se ut med eksempeldata i flettefeltene, før du lagrer eller sender.

## Bruke en mal

Lagrede maler kan velges når du skriver en e-post til personer eller en gruppe, og som en handling i [arbeidsflyter](../serving/workflows.md). Før kirken din kan sende dem, må ChurchApps-teamet godkjenne den for gruppe-e-post én gang. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church).

## Redigere og slette

Klikk ikonet **Rediger** ved siden av en mal for å oppdatere den, eller ikonet **Slett** for å fjerne den permanent.

## Neste steg

- [Arbeidsflyter](../serving/workflows.md) — utløs en malt e-post automatisk basert på regler

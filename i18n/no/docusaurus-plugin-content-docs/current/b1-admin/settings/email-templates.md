---
title: "E-postmaler"
---

# E-postmaler

<div class="article-intro">

Med e-postmaler kan du lagre gjenbrukbart e-postinnhold -- en velkomstmelding, en påminnelse om et arrangement, en takk for gaven -- slik at du (eller en [arbeidsflyt](../serving/workflows.md)) kan sende den med ett klikk i stedet for å skrive den fra bunnen av hver gang.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang til området Innstillinger i B1 Admin.

</div>

## Åpne e-postmaler

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Innstillinger**.
2. Klikk på **E-postmaler**.
3. Du ser en liste over eksisterende maler med emne, kategori og dato for siste endring.

## Opprette en mal

1. Klikk på **Ny mal**.
2. Skriv inn et **Malnavn** som identifiserer malen i listen, og velg en **Kategori** (Generelt, Arrangementer, Grupper, Giving eller Velkomst) for å organisere malene dine.
3. Skriv inn **Emnefeltet**.
4. Skriv **Innholdet** med tekstredigereren.
5. Klikk på **Lagre**.

## Flettefelt

Klikk på en flettefeltbrikke over Emne eller Innhold for å sette den inn der markøren står -- klikk først i teksten der du vil ha feltet, og klikk deretter på brikken. Markøren blir stående, slik at du kan fortsette å skrive rett etter det innsatte feltet. Hvis du klikker på en brikke for Innhold uten først å ha klikket i innholdet, legges feltet til på slutten av innholdet. Når e-posten sendes, erstattes hvert flettefelt med mottakerens faktiske opplysninger:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Mottakerens navn
- `{{email}}` -- Mottakerens e-postadresse
- `{{churchName}}` -- Kirkens navn

## Forhåndsvise en mal

Klikk på **Forhåndsvis** for å se hvordan emne og innhold ser ut med eksempeldata i flettefeltene, før du lagrer eller sender.

## Bruke en mal

Lagrede maler kan velges når du skriver en e-post til personer eller en gruppe, og som handling i [Arbeidsflyter](../serving/workflows.md). Før kirken din kan sende dem, må ChurchApps-teamet godkjenne den for gruppe-e-post én gang. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church).

## Redigere og slette

Klikk på **Rediger**-ikonet ved siden av en mal for å oppdatere den, eller **Slett**-ikonet for å fjerne den permanent.

## Neste steg

- [Arbeidsflyter](../serving/workflows.md) -- La en malbasert e-post sendes automatisk ut fra regler

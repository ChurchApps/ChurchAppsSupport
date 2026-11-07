---
title: "E-mailskabeloner"
description: "Opsæt e-mail- og sms-skabeloner i B1 Admin med flettefelter, sms-valgmuligheder og forhåndsvisninger til masse-kommunikation."
---

# E-mailskabeloner

<div class="article-intro">

Med e-mailskabeloner kan du gemme genbrugeligt e-mailindhold -- en velkomstbesked, en påmindelse om en begivenhed eller et takkebrev for en gave -- så du (eller en [arbejdsgang](../serving/workflows.md)) kan sende det med ét klik i stedet for at skrive det fra bunden hver gang. Den samme liste indeholder også sms-skabeloner til vinduerne for tekstbeskeder til grupper og personer.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du skal have adgang til området Indstillinger i B1 Admin.

</div>

## Sådan får du adgang til e-mailskabeloner

1. Åbn [Jump-menuen](../introduction.md#getting-around-with-the-jump-menu) (søgefeltet øverst til venstre) i B1 Admin, og udvid **Indstillinger**.
2. Klik på **E-mailskabeloner**.
3. Du ser en liste over eksisterende skabeloner med deres emne, kategori og dato for sidste ændring.

## Oprettelse af en skabelon

1. Klik på **Ny skabelon**.
2. Angiv et **Skabelonnavn**, så du kan genkende den på listen, og vælg en **Kategori** (Generelt, Begivenheder, Grupper, Gaver, Velkomst eller Sms) for at hjælpe med at organisere dine skabeloner. Vælg **Sms** for i stedet at oprette en skabelon til sms-beskeder (se [Sms-skabeloner](#text-templates) nedenfor).
3. Skriv linjen **Emne**.
4. Skriv **Brødteksten** i teksteditoren med formatering.
5. Klik på **Gem**.

## Flettefelter

Klik på et flettefelt over feltet Emne eller Brødtekst for at indsætte det ved markøren -- klik først i den tekst, hvor du vil have feltet, og klik derefter på feltet. Markøren bliver stående på samme sted, så du kan fortsætte med at skrive lige efter det indsatte felt. Hvis du klikker på et felt for brødteksten uden først at have klikket i brødteksten, tilføjes feltet til slutningen af brødteksten. Når e-mailen sendes, erstattes hvert flettefelt med modtagerens faktiske oplysninger:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Modtagerens navn
- `{{email}}` -- Modtagerens e-mailadresse
- `{{churchName}}` -- Navnet på din kirke

## Sms-skabeloner

En skabelon i kategorien **Sms** er en almindelig tekstbesked til sms i stedet for en e-mail:

- Den har ingen emnelinje. Teksteditoren erstattes af et almindeligt felt til **Tekstbesked**, der kan rumme op til 1.600 tegn.
- Flettefelterne over feltet indsætter `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` eller `{{churchName}}` ved din markør.
- Sms-skabeloner vises i vælgeren **Indlæs skabelon (valgfri)** i vinduet for sms til en [gruppe](../groups/group-members.md#texting-group-members) eller en enkelt person. Når du vælger en skabelon, udfyldes beskeden, og du kan stadig redigere den, før du sender den.
- De udelades fra vælgerne for e-mailskabeloner, herunder handlingen **Send e-mail** i arbejdsgange.

Afsendelse af sms kræver en tilsluttet [sms-udbyder](./church-settings.md#texting).

## Forhåndsvisning af en skabelon

Klik på **Forhåndsvisning** for at se, hvordan emnet og brødteksten vil se ud med eksempeldata indsat i flettefelterne, før du gemmer eller sender.

## Brug af en skabelon

Gemte skabeloner kan vælges, når du skriver en e-mail til personer eller en gruppe, og de kan bruges som en handling i [arbejdsgange](../serving/workflows.md). Før din kirke kan sende dem, skal ChurchApps-teamet godkende det én gang for gruppe-e-mail. Se [Aktivering af gruppe-e-mail for din kirke](../groups/group-members.md#turning-on-group-email-for-your-church).

## Redigering og sletning

Klik på ikonet **Rediger** ved siden af en skabelon for at opdatere den, eller på ikonet **Slet** for at fjerne den permanent.

## Næste trin

- [Arbejdsgange](../serving/workflows.md) -- Udløs automatisk en skabelonbaseret e-mail ud fra regler

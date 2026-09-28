---
title: "E-postmaler"
---

# E-postmaler

<div class="article-intro">

E-postmaler lar deg lagre gjenbrukbart e-postinnhold -- en velkomstmelding, en hendelsespåminnelse, en givtakk -- slik at du (eller en [arbeitsflyt](../serving/workflows.md)) kan sende det på ett klikk i stedet for å skrive det fra bunnen av hver gang.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang til området Innstillinger i B1 Admin.

</div>

## Tilgang til e-postmaler

1. I B1 Admin åpner du **seksjonmenyen** i øvre venstre hjørne (seksjonsnavn med liten pil) og velger **Innstillinger**.
2. Klikk på **E-postmaler**.
3. Du vil se en liste over eksisterende maler med emne, kategori og dato for siste endring.

## Opprettelse av en mal

1. Klikk **Ny mal**.
2. Oppgi et **Malnavn** for å identifisere det i listen, og velg en **Kategori** (Generell, Hendelser, Grupper, Giving eller Velkommen) for å hjelpe med å organisere malene dine.
3. Skriv inn **Emnelinjen**.
4. Skriv **Brødteksten** ved hjelp av redigeringsverktøyet for rikt tekst.
5. Klikk **Lagre**.

## Flettefelter

Klikk på en flettfeltkort over emnet eller brødteksten for å sette den inn ved markøren. Når e-posten sendes, erstattes hvert flettfelt med mottakerens faktiske informasjon:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Mottakerens navn
- `{{email}}` -- Mottakerens e-postadresse
- `{{churchName}}` -- Kirkens navn

## Forhåndsvisning av en mal

Klikk på **Forhåndsvisning** for å se hvordan emnet og brødteksten vil se ut med eksempeldata fylt inn for flettefeltene, før du lagrer eller sender.

## Bruk av en mal

Lagrede maler er tilgjengelige å velge fra når du komponerer en e-post til personer eller en gruppe, og som en handling i [Arbeitsflyter](../serving/workflows.md). Før kirken din kan sende dem, må ChurchApps-teamet godkjenne det for gruppee-post en gang. Se [Slå på gruppee-post for kirken din](../groups/group-members.md#slå-på-gruppee-post-for-kirken-din).

## Redigering og sletting

Klikk på ikonet **Rediger** ved siden av en mal for å oppdatere den, eller ikonet **Slett** for å fjerne den permanent.

## Neste steg

- [Arbeitsflyter](../serving/workflows.md) -- Utløs en mal e-post automatisk basert på regler

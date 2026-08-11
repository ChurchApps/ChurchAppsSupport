---
title: "E-postmaler"
---

# E-postmaler

<div class="article-intro">

E-postmaler lar deg lagre gjenbrukbart e-postinnhold -- en velkomstmelding, en hendelsespåminnelse, en giving takkmelding -- slik at du (eller en [arbeidsflyt](../serving/workflows.md)) kan sende det på ett klikk i stedet for å skrive det fra bunnen hver gang.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tilgang til Innstillinger-området i B1 Admin.

</div>

## Få tilgang til e-postmaler

1. I B1 Admin åpner du **seksjonsmenyen** i det øvre venstre hjørnet (seksjonsnavnet med liten pil) og velger **Innstillinger**.
2. Klikk **E-postmaler**.
3. Du vil se en liste over eksisterende maler med deres emne, kategori og sist endret dato.

## Opprett en mal

1. Klikk **Ny mal**.
2. Skriv inn et **Malnavn** for å identifisere det i listen, og velg en **Kategori** (Generelt, Hendelser, Grupper, Giving, eller Velkommen) for å hjelpe til med å organisere malene dine.
3. Skriv inn **Emnelinjen**.
4. Skriv **Brødteksten** ved hjelp av riktekstredigeringsprogrammet.
5. Klikk **Lagre**.

## Slå sammen felt

Klikk en flettefeltbrikke over emnet eller brødteksten for å sette den inn der markøren er. Når e-posten sendes, erstattes hvert flettfelt med mottakerens faktiske informasjon:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Mottakerens navn
- `{{email}}` -- Mottakerens e-postadresse
- `{{churchName}}` -- Din kirkas navn

## Forhåndsvis en mal

Klikk **Forhåndsvis** for å se hvordan emnet og brødteksten vil se ut med eksempeldata fylt inn for flettefeltene, før du lagrer eller sender.

## Bruk en mal

Lagrede maler er tilgjengelige for valg når du skriver en e-post til mennesker eller en gruppe, og som en handling i [Arbeidsflyter](../serving/workflows.md).

## Rediger og slett

Klikk **Rediger**-ikonet ved siden av en mal for å oppdatere den, eller **Slett**-ikonet for å fjerne den permanent.

## Neste trinn

- [Arbeidsflyter](../serving/workflows.md) -- Utløs en male-e-post automatisk basert på regler

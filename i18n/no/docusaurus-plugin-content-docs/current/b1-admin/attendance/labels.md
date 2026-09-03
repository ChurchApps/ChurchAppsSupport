---
title: "Etikett-designer for innsjekking"
---

# Etikett-designer for innsjekking

<div class="article-intro">

Etikett-designeren lar deg opprette og tilpasse navn-merke- og uthentings-seddel-maler som skrives ut når familier sjekker inn barna sine. Du kan kontrollere nøyaktig hvilken informasjon som vises på hver etikett, hvor den er plassert, og hvordan den ser ut.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Sett opp [Innsjekking](setup) og konfigurer minst en servicetid med innsjekking aktivert
- Sett opp [Innsjekking](check-in) slik at etiketter skrives ut
- Du trenger administratortilgang til innsjekking-delen

</div>

## Åpning av etikett-designeren

I B1 Admin klikker du på **seksjonsmenyen** i øvre venstre hjørne (gjeldende seksjonnavn med den lille pilen ved siden av) og velger **Mobil**. I navigasjonslinjen velger du **B1 Innsjekking** og klikker deretter på **Design-etiketter**-knappen på Innsjekking-etiketter-kortet. Du vil se en liste over dine lagrede etikett-maler, delt etter type: **Merkelapp** og **Uthentings-sedde**.

## Etikett-typer

- **Merkelapp** — skrives ut og festes på barnet. Inkluderer typisk barnets navn, klasseromet/sesjonen deres og en sikkerhetskode.
- **Uthentings-sedde** -- gitt til forelder eller foresatt. Inkluderer typisk sikkerhetskoden og en liste over barna de sjekket inn.

B1 starter deg med en standard merkelapp og en standard uthentings-sedde-mal størrelse for standard 3,5 × 1,1 tomme termisk etiketter.

## Opprette en etikett-mal

1. Klikk **Legg til merkelapp** eller **Legg til uthentings-sedde** (eller bruk rullegardinlisten for å velge).
2. En ny mal åpnes i etikett-editoren.

### Etikett-editor

Editoren viser en skalert forhåndsvisning av etiketten ved konfigurert størrelse. I det venstre panelet kan du konfigurere:

- **Navn** — malens navn (kun for din referanse)
- **Etikett-type** -- Merkelapp eller Uthentings-sedde
- **Bredde / høyde** — etikettstørrelse i tommer

### Legge til blokker

En etikett er bygget av blokker — individuelle stykker innhold plassert på etikett-lerretet. Klikk **Legg til blokk** for å sette inn en ny blokk og velg dens type:

- **Felt** -- henter en dataverdi ved utskrivingstidspunkt:
  - `person.displayName` — personens fullt navn
  - `sessions` — tjenesten/klasserommet de sjekket inn til
  - `securityCode` -- den tilfeldig genererte uthentings-sikkerhetskoden
  - `children` -- liste over barn (for uthentings-sedler)
  - `person.nametagNotes` -- eventuelle spesielle merknader på personens post
  - `campus` -- kampusnavn
- **Tekst** -- statisk tekst du skriver inn (for overskrifter, etiketter eller instruksjoner)
- **Strekkode** -- en strekkode som koder sikkerhetskoden

### Posisjonering av blokker

Hver blokk har **X**, **Y**, **Bredde** og **Høyde**-felt uttrykt som prosenter av etikett-lerretet (0–100). Juster disse for å plassere innhold nøyaktig. Du kan også sette:

- **Skriftstørrelse** -- tekststørrelse i poeng
- **Fet** -- aktiver fet tekst
- **Justering** -- venstre, sentret eller høyre tekstjustering
- **Betingelse** -- skjul valgfritt blokken hvis et felt er tomt (for eksempel vis bare nametagNotes hvis det har en verdi)

### Lagring

Klikk **Lagre** for å lagre malen. Den oppdaterte malen vil bli brukt neste gang etiketter skrives ut i B1 Innsjekking.

## Omorganisering av maler

Hvis du har flere merkelapp- eller uthentings-sedde-maler, vil B1 Innsjekking som standard bruke den første malen i listen. Dra maler for å omorganisere dem.

## Sletting av en mal

Klikk slettikonet på en malrad og bekreft. Sletting av den siste malen av en type gjenoppretter den innebygde standard-malen.

:::tip
Gjør en testutskrift etter redigering av en mal for å bekrefte at oppsettet ser bra ut før neste servicetid.
:::

## Relaterte artikler

- [Innsjekking-oppsett](setup) -- konfigurer tjenester og grupper for innsjekking
- [Fullføring av innsjekking](check-in) -- innsjekking-flyt for familier
- [B1 Innsjekking Komme i gang](../../b1-checkin/getting-started/) -- Innsjekking kiosk-appen

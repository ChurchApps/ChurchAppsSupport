---
title: "Innsjekk-etikett designer"
---

# Innsjekk-etikett designer

<div class="article-intro">

Etikett-designeren lar deg opprette og tilpasse navneskilt- og hentemerkemaler som skrives ut når familier sjekker inn barna sine. Du kan kontrollere nøyaktig hva informasjon som vises på hver etikett, hvor den er plassert, og hvordan den ser ut.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [Oppmøte](setup) og konfigurer minst ett gudstjenesteklokkeslett med innsjekking aktivert
- Sett opp [Innsjekking](check-in) slik at etiketter skrives ut
- Du trenger administrativ tilgang til oppmøte-seksjonen

</div>

## Åpning av etikett-designeren

I B1 Admin, klikk **seksjonsmenyene** i det øvre venstre hjørnet (gjeldende seksjonsavn med den lille pilen ved siden av) og velg **Mobil**. I navigasjonslinjen velger du **B1 CheckIn**, deretter klikker du **Design Labels**-knappen på innsjekk-etikettkortet. Du vil se en liste over lagrede etikett-maler, atskilt etter type: **Navneskilt** og **Hentemerkeseddel**.

## Etikett-typer

- **Navneskilt** — skrevet ut og festet til barnet. Inkluderer vanligvis barnets navn, klasserommet/økten, og en sikkerhetskode.
- **Hentemerkeseddel** -- gitt til forelderen eller foresatte. Inkluderer vanligvis sikkerhetskoden og en liste over barna de sjekket inn.

B1 starter deg med en standard navneskilt- og en standard hentemerkeseddel-mal som er dimensjonert for standard 3,5 × 1,1 tommer termiske etiketter.

## Opprett en etikett-mal

1. Klikk **Legg til navneskilt** eller **Legg til hentemerkeseddel** (eller bruk rullemenyen for å velge).
2. En ny mal åpnes i etikett-editoren.

### Etikett-editor

Editoren viser en skalert forhåndsvisning av etiketten ved den konfigurerte størrelsen. I det venstre panelet kan du konfigurere:

- **Navn** -- malens navn (kun for din referanse)
- **Etikett-type** -- Navneskilt eller hentemerkeseddel
- **Bredde / høyde** -- etikettstørrelse i tommer

### Legge til blokker

En etikett er bygget fra blokker -- individuelle deler av innhold som er plassert på etikett-lerretet. Klikk **Legg til blokk** for å sette inn en ny blokk og velg dens type:

- **Felt** -- trekker en dataveralue ved utskriftstid:
  - `person.displayName` -- personens fulle navn
  - `sessions` -- gudstjenesten/klasserommet de sjekket inn til
  - `securityCode` -- den tilfeldig genererte sikkerhetskoden
  - `children` -- liste over barn (for hentemerkesedler)
  - `person.nametagNotes` -- alle spesielle notater på personens registrering
  - `campus` -- campusnavnet
- **Tekst** -- statisk tekst du skriver inn (for overskrifter, etiketter eller instruksjoner)
- **Strekkode** -- en strekkode som koder sikkerhetskoden

### Plassering av blokker

Hver blokk har **X**, **Y**, **Bredde** og **Høyde**-felt uttrykt som prosenter av etikett-lerretet (0–100). Juster disse for å plassere innhold presist. Du kan også sette:

- **Skriftstørrelse** -- tekststørrelse i poeng
- **Fet** -- slå på fet tekst
- **Justering** -- venstre, sentrum eller høyre tekstjustering
- **Betingelse** -- skjul valgfritt blokken hvis et felt er tomt (for eksempel, vis kun nametagNotes hvis det har en verdi)

### Lagring

Klikk **Lagre** for å lagre malen. Den oppdaterte malen vil bli brukt neste gang etiketter skrives ut i B1 Checkin.

## Ombestilling av maler

Hvis du har flere navneskilt- eller hentemerkeseddel-maler, vil B1 Checkin bruke den første malen i listen som standard. Dra maler for å ombestille dem.

## Sletting av en mal

Klikk slettikonet på en hvilken som helst mallinje og bekreft. Sletting av siste mal av en type gjenoppretter den innebygde standardmalen.

:::tip
Lag en testutskrift etter redigering av en mal for å bekrefte at oppsettet ser riktig ut før neste gudstjeneste.
:::

## Relaterte artikler

- [Innsjekking Setup](setup) -- konfigurere gudstjenester og grupper for innsjekking
- [Fullføring av innsjekking](check-in) -- innsjekkingsflyten for familier
- [B1 Checkin Komme i gang](../../b1-checkin/getting-started/) -- Checkin kioskappen

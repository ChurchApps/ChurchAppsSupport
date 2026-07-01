---
title: "Merkelappdesigner for innsjekking"
---

# Merkelappdesigner for innsjekking

<div class="article-intro">

Merkelappdesigneren lar deg lage og tilpasse navnemerke- og henteslipmaler som skrives ut når familier sjekker inn barna sine. Du kan kontrollere nøyaktig hvilken informasjon som vises på hver merkelapp, hvor den er plassert, og hvordan den ser ut.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [Oppmøte](setup) og konfigurer minst én servicetid med innsjekking aktivert
- Sett opp [Innsjekking](check-in) slik at merkelapper skrives ut
- Du trenger administratortilgang til oppmøteseksjonen

</div>

## Åpning av merkelappdesigneren

I B1 Admin går du til **Oppmøte** i venstresidemeny og velger **Merkelapper**. Du vil se en liste over dine lagrede merkelappmal, delt inn etter type: **Navnemerke** og **Henteslip**.

## Merkelapptyper

- **Navnemerke** — skrives ut og festes på barnet. Inneholder vanligvis barnets navn, klasseromet/økten deres og en sikkerhetskode.
- **Henteslip** — gis til forelder eller foresatt. Inneholder vanligvis sikkerhetskoden og en liste over barna de sjekket inn.

B1 starter deg med en standard navnemerkemal og en standard henteslipmal i størrelse for standard 3,5 × 1,1 tommer termiske merkelapper.

## Opprette en merkelappmal

1. Klikk **Legg til navnemerke** eller **Legg til henteslip** (eller bruk rullegardinmenyen for å velge).
2. En ny mal åpnes i merkelappediteren.

### Merkelappeditor

Redigereren viser en skalert forhåndsvisning av merkelappen i den konfigurerte størrelsen. I den venstre panelen kan du konfigurere:

- **Navn** — mallnavnet (bare for din henvisning)
- **Merkelapptype** — Navnemerke eller Henteslip
- **Bredde / Høyde** — merkelappstørrelse i tommer

### Legge til blokker

En merkelapp er bygget fra blokker — individuelle innholdsdeler plassert på merkelapplerret. Klikk **Legg til blokk** for å sette inn en ny blokk og velg dens type:

- **Felt** — trekker en datoverdi på utskriftstidspunktet:
  - `person.displayName` — personens fulle navn
  - `sessions` — servicen/klasserommet de sjekket inn til
  - `securityCode` — den tilfeldig genererte sikkerhetskoden for henting
  - `children` — liste over barn (for henteslip)
  - `person.nametagNotes` — eventuelle spesielle merknader på personens register
  - `campus` — campus-navn
- **Tekst** — statisk tekst du skriver inn (for overskrifter, merkelapper eller instruksjoner)
- **Strekkode** — en strekkode som koder sikkerhetskoden

### Plassering av blokker

Hver blokk har **X**, **Y**, **Bredde** og **Høyde**-felt uttrykt som prosenter av merkelapplerret (0–100). Juster disse for å plassere innholdet nøyaktig. Du kan også angi:

- **Skriftstørrelse** — tekststørrelse i punkter
- **Fett** — veksle fettskrift
- **Justering** — venstre, senter eller høyre tekstjustering
- **Betingelse** — skjul eventuelt blokken hvis et felt er tomt (for eksempel, vis bare nametagNotes hvis den har en verdi)

### Lagring

Klikk **Lagre** for å lagre malen. Den oppdaterte malen vil bli brukt neste gang merkelapper skrives ut i B1 Checkin.

## Omrangering av maler

Hvis du har flere navnemerke- eller henteslipsmaler, vil B1 Checkin som standard bruke den første malen i listen. Dra maler for å omrangere dem.

## Sletting av en mal

Klikk sletteikonet på en hvilken som helst malrad og bekreft. Sletting av den siste malen av en type gjenoppretter den innebygde standardmalen.

:::tip
Lag en testutskrift etter redigering av en mal for å bekrefte at oppsettet ser riktig ut før neste service.
:::

## Relaterte artikler

- [Innsjekking Setup](setup) — konfigurer services og grupper for innsjekking
- [Gjennomføring av innsjekking](check-in) — innsjekking flyt for familier
- [B1 Checkin Kom i gang](../../b1-checkin/getting-started/) — Checkin kioskapp

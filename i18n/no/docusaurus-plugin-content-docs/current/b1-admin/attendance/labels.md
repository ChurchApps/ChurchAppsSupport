---
title: "Etikettdesigner for innsjekking"
---

# Etikettdesigner for innsjekking

<div class="article-intro">

Etikettdesigneren lar deg lage og tilpasse malene for navnelapper og hentelapper som skrives ut når familier sjekker inn barna sine. Du bestemmer nøyaktig hvilken informasjon som vises på hver etikett, hvor den plasseres og hvordan den ser ut.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [Oppmøte](setup) og konfigurer minst ett samlingstidspunkt med innsjekking aktivert
- Sett opp [Innsjekking](check-in) slik at etiketter skrives ut
- Du trenger administratortilgang til Oppmøte-seksjonen

</div>

## Åpne etikettdesigneren

Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) i B1 Admin, utvid **Mobil** og klikk på **B1 CheckIn**. Klikk deretter på knappen **Design etiketter** på kortet Innsjekkingsetiketter. Du ser en liste over lagrede etikettmaler, delt etter type: **Navnelapp** og **Hentelapp**.

## Etikettyper

- **Navnelapp** — skrives ut og festes på barnet. Inneholder vanligvis barnets navn, klasserom/økt og en sikkerhetskode.
- **Hentelapp** — gis til forelderen eller den foresatte. Inneholder vanligvis sikkerhetskoden og en liste over barna som er sjekket inn.

B1 gir deg en standardmal for navnelapp og en for hentelapp, tilpasset vanlige termoetiketter på 3,5 × 1,1 tommer.

## Opprette en etikettmal

1. Klikk på **Legg til** og velg et utgangspunkt fra menyen: **Navnelapp 3,5" x 1,1"**, **Hentelapp 3,5" x 1,1"** eller **Tom**.
2. En ny mal åpnes i etikettredigeringen.

### Etikettredigering

Redigeringen viser en skalert forhåndsvisning av etiketten i den valgte størrelsen. I panelet til venstre kan du konfigurere:

- **Navn** — malens navn (bare til eget bruk)
- **Etikettype** — Navnelapp eller Hentelapp
- **Bredde / Høyde** — etikettens størrelse i tommer

### Legge til blokker

En etikett bygges opp av blokker — enkeltstående innholdsdeler som plasseres på etikettflaten. Klikk på **Legg til blokk** for å sette inn en ny blokk og velg type:

- **Felt** — henter en dataverdi ved utskrift:
  - `person.displayName` — personens fulle navn
  - `sessions` — samlingen/klasserommet personen er sjekket inn i
  - `securityCode` — den tilfeldig genererte sikkerhetskoden for henting
  - `children` — liste over barn (for hentelapper)
  - `person.nametagNotes` — spesielle merknader i personens oppføring
  - `person.isBirthdayWeek` — sann hvis personens fødselsdag (måned og dag) er innenfor 3 dager før eller etter innsjekkingsdatoen
  - `campus` — campusnavnet
- **Tekst** — fast tekst du skriver inn selv (for overskrifter, ledetekster eller instruksjoner)
- **Strekkode** — en strekkode som koder sikkerhetskoden

### Plassere blokker

Hver blokk har feltene **X**, **Y**, **Bredde** og **Høyde**, oppgitt som prosent av etikettflaten (0–100). Juster dem for å plassere innholdet nøyaktig. Du kan også angi:

- **Skriftstørrelse** — tekststørrelse i punkter
- **Fet** — slå fet tekst av eller på
- **Justering** — venstre-, sentrert eller høyrejustert tekst
- **Betingelse** — skjul eventuelt blokken hvis et felt er tomt (for eksempel vis nametagNotes bare hvis det har en verdi). Dette fungerer også med `person.isBirthdayWeek` for å vise en bursdagsgrafikk eller -tekst bare på navnelapper til barn som har bursdag like før eller etter innsjekkingen.

### Lagre

Klikk på **Lagre** for å lagre malen. Den oppdaterte malen brukes neste gang etiketter skrives ut i B1 Checkin.

## Endre rekkefølgen på maler

Hvis du har flere maler for navnelapper eller hentelapper, bruker B1 Checkin den første malen i listen som standard. Dra malene for å endre rekkefølgen.

## Slette en mal

Klikk på sletteikonet på en malrad og bekreft. Hvis du sletter den siste malen av en type, gjenopprettes den innebygde standardmalen.

:::tip
Ta en prøveutskrift etter at du har redigert en mal, for å være sikker på at utformingen ser riktig ut før neste gudstjeneste.
:::

## Relaterte artikler

- [Oppsett av innsjekking](setup) — sett opp gudstjenester og grupper for innsjekking
- [Fullføre innsjekking](check-in) — innsjekkingsforløpet for familier
- [Kom i gang med B1 Checkin](../../b1-checkin/getting-started/) — Checkin-kioskappen

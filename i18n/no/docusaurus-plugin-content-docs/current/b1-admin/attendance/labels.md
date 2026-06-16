---
title: "Merkedesigner for innsjekk"
---

# Merkedesigner for innsjekk

<div class="article-intro">

Merkedesigneren lar deg opprette og tilpasse navnekilder- og oppsamlingsmerkemaler som skrives ut når familier sjekker inn barna sine. Du kan styrer nøyaktig hvilken informasjon som vises på hvert merke, hvor det er plassert, og hvordan det ser ut.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [Innsjekk](setup) og konfigurer minst en servicetime med innsjekk aktivert
- Sett opp [Innsjekk](check-in) slik at merker skrives ut
- Du må ha administratortilgang til Innsjekk-delen

</div>

## Åpne merkedesigneren

I B1 Admin går du til **Innsjekk** i venstre sidepanel og velger **Merker**. Du ser en liste over lagrede merkemalene dine, atskilt etter type: **Navnekilt** og **Oppsamlingsmerkje**.

## Merketyper

- **Navnekilt** – skrevet ut og festet til barnet. Inkluderer vanligvis barnets navn, klasserom/sesjon og sikkerhetskode.
- **Oppsamlingsmerkje** – gitt til forelder eller foresatt. Inkluderer vanligvis sikkerhetskoden og en liste over barna de sjekket inn.

B1 starter deg med en standard navnekildemal og en standard oppsamlingsmerkjemal dimensjonert for standard 3,5 × 1,1-tommers varmebilitiketter.

## Opprett en merkemal

1. Klikk **Legg til navnekilt** eller **Legg til oppsamlingsmerkje** (eller bruk rullegardinlisten for å velge).
2. En ny mal åpnes i merkeredigeringen.

### Merkerediger

Editoren viser en skalert forhåndsvisning av merket med konfigurert størrelse. Langs venstre panel kan du konfigurere:

- **Navn** – merkemalens navn (kun for referanse)
- **Merketype** – Navnekilt eller Oppsamlingsmerkje
- **Bredde / Høyde** – merkestørrelse i tommer

### Legge til blokker

Et merke er bygd fra blokker – individuelle innholdsstykker plassert på merkelerretet. Klikk **Legg til blokk** for å sette inn en ny blokk og velg dens type:

- **Felt** – henter en dataverdi ved utskrift:
  - `person.displayName` – personens fullt navn
  - `sessions` – servicen/klasserommet de sjekket inn til
  - `securityCode` – den tilfeldig genererte oppsamlingssikkerhetskoden
  - `children` – liste over barn (for oppsamlingsmerkjer)
  - `person.nametagNotes` – alle spesielle merknader på personens post
  - `campus` – campusnavn
- **Tekst** – statisk tekst som du skriver inn (for overskrifter, etiketter eller instruksjoner)
- **Strekkode** – en strekkode som koder sikkerhetskoden

### Posisjonering av blokker

Hver blokk har **X**, **Y**, **Bredde** og **Høyde**-felt uttrykt som prosenter av merkerretet (0–100). Juster disse for å plassere innholdet nøyaktig. Du kan også angi:

- **Skriftstørrelse** – tekstens størrelse i poeng
- **Fet** – aktiver eller deaktiver fet tekst
- **Justering** – venstre, sentral eller høyre justering av tekst
- **Betingelse** – skjul eventuelt blokken hvis et felt er tomt (for eksempel vis bare nametagNotes hvis det har en verdi)

### Lagring

Klikk **Lagre** for å lagre malen. Den oppdaterte malen vil bli brukt neste gang merker skrives ut i B1 Innsjekk.

## Omorganisere maler

Hvis du har flere navnekilder- eller oppsamlingsmerkemaler, bruker B1 Innsjekk den første malen i listen som standard. Dra maler for å omorganisere dem.

## Slette en mal

Klikk sletteikonet på en malrad og bekreft. Sletting av den siste malen av en type gjenoppretter den innebygde standardmalen.

:::tip
Skriv ut en testutskrift etter redigering av en mal for å bekrefte at oppsettet ser riktig ut før neste servicetime.
:::

## Relaterte artikler

- [Innsjekk-oppsett](setup) – konfigurer servicetider og grupper for innsjekk
- [Fullføre innsjekk](check-in) – innsjekksflyt for familier
- [B1 Innsjekk Komme i gang](../../b1-checkin/getting-started/index) – kioskappen for innsjekk

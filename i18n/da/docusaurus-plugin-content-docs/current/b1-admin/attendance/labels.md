---
title: "Check-In Label-designer"
description: "Tilpas navnebrik- og afhentningsskabeloner, der udskrives ved check-in i B1 Admin, med felter, placering og betingelser for fødselsdag eller noter."
---

# Check-In Label-designer

<div class="article-intro">

Label-designeren lader dig oprette og tilpasse de navneskilte og afhentningsslips, der udskrives, når familier checker deres børn ind. Du kan styre præcis, hvilke oplysninger der vises på hver etiket, hvor de placeres, og hvordan de ser ud.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Opsæt [Attendance](./setup.md) og konfigurer mindst ét gudstjenestetidspunkt med check-in aktiveret
- Opsæt [Check-In](./check-in.md), så etiketterne bliver udskrevet
- Du skal have administratoradgang til Attendance-sektionen

</div>

## Åbn Label-designeren

Åbn [Jump-menuen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søgefeltet øverst til venstre), udvid **Mobile**, og klik på **B1 CheckIn**. Klik derefter på knappen **Design Labels** på kortet Check-in Labels. Du ser nu en liste over dine gemte etiketskabeloner, opdelt efter type: **Nametag** og **Pickup Slip**.

## Etikettyper

- **Nametag** — udskrives og fastgøres på barnet. Indeholder typisk barnets navn, deres klasse/gudstjeneste og en sikkerhedskode.
- **Pickup Slip** — gives til forælderen eller værgen. Indeholder typisk sikkerhedskoden og en liste over de børn, de har checket ind.

B1 starter dig med en standardskabelon til navneskilt og en standardskabelon til afhentningsslip, tilpasset standard 3,5 × 1,1 tommer termoetiketter.

## Oprettelse af en etiketskabelon

1. Klik på **Add**, og vælg et udgangspunkt i menuen: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** eller **Blank**.
2. En ny skabelon åbnes i etiketeditoren.

### Etiketeditor

Editoren viser et skaleret eksempel på etiketten i den angivne størrelse. I venstre panel kan du konfigurere:

- **Name** — skabelonens navn (kun til din egen reference)
- **Label Type** — Nametag eller Pickup Slip
- **Width / Height** — etiketstørrelse i tommer

### Tilføjelse af blokke

En etiket er bygget op af blokke — enkelte indholdselementer, der placeres på etiketlærredet. Klik på **Add Block** for at indsætte en ny blok, og vælg dens type:

- **Field** — henter en dataværdi på udskriftstidspunktet:
  - `person.displayName` — personens fulde navn
  - `sessions` — den gudstjeneste eller klasse, de er checket ind til
  - `securityCode` — den tilfældigt genererede sikkerhedskode til afhentning
  - `children` — liste over børn (til afhentningsslips)
  - `person.nametagNotes` — eventuelle særlige noter på personens profil
  - `person.isBirthdayWeek` — sand, hvis personens fødselsdag (måned og dag) ligger inden for 3 dage før eller efter check-in-datoen
  - `campus` — navnet på campus
- **Text** — fast tekst, du skriver selv (til overskrifter, etiketter eller instruktioner)
- **Barcode** — en stregkode, der koder sikkerhedskoden

### Placering af blokke

Hver blok har felterne **X**, **Y**, **Width** og **Height**, angivet i procent af etiketlærredet (0–100). Justér dem for at placere indholdet præcist. Du kan også angive:

- **Font Size** — tekststørrelse i punkter
- **Bold** — slå fed skrift til eller fra
- **Align** — venstre-, center- eller højrejustering af teksten
- **Condition** — skjul eventuelt blokken, hvis et felt er tomt (for eksempel kun vise nametagNotes, hvis der er en værdi). Dette virker også sammen med `person.isBirthdayWeek` til kun at vise en fødselsdagsgrafik eller -tekst på navneskilte for børn, hvis fødselsdag ligger tæt på check-in-datoen.

### Gem

Klik på **Save** for at gemme skabelonen. Den opdaterede skabelon bruges, næste gang der udskrives etiketter i B1 Checkin.

## Sortering af skabeloner

Hvis du har flere skabeloner til navneskilte eller afhentningsslips, bruger B1 Checkin som standard den første skabelon på listen. Træk skabeloner for at ændre rækkefølgen.

## Sletning af en skabelon

Klik på slet-ikonet ved en skabelonrække, og bekræft. Hvis du sletter den sidste skabelon af en type, gendannes standardskabelonen, der følger med systemet.

:::tip
Lav en testudskrift efter at have redigeret en skabelon, så du kan kontrollere, at layoutet ser rigtigt ud, inden din næste gudstjeneste.
:::

## Relaterede artikler

- [Check-In Setup](./setup.md) — konfigurer gudstjenester og grupper til check-in
- [Gennemførelse af check-in](./check-in.md) — check-in-forløbet for familier
- [B1 Checkin kom i gang](../../b1-checkin/getting-started/index.md) — Checkin-kioskappen

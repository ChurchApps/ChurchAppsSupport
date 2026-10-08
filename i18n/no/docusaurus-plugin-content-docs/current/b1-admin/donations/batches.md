---
title: "Gavebunter"
---

# Gavebunter

<div class="article-intro">

Gavebunter samler donasjonene dine, slik at de blir lettere å følge opp og avstemme. En typisk gavebunt representerer én innsamling, for eksempel søndagens offer eller et spesielt arrangement. Med gavebunter holder du orden, og det blir enkelt å kontrollere at registreringene stemmer med de faktiske innskuddene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Pass på at du har [satt opp fondene dine](funds.md), slik at de er tilgjengelige når du registrerer donasjoner
- Du trenger tilgang til **Donasjoner**-delen i B1 Admin

</div>

## Gavebunt-siden

Når du går til **Donasjoner > Gavebunter**, ser du en liste over alle gavebuntene dine. Hver rad viser:

- **Navn** -- navnet du ga gavebunten
- **Dato** -- datoen for innsamlingen
- **Donasjoner** -- antall enkeltdonasjoner i gavebunten
- **Totalt** -- det samlede beløpet

Overskriften øverst viser sammendragstall, blant annet totalt antall gavebunter, totalt antall donasjoner på tvers av alle gavebunter og det samlede beløpet.

## Opprette en ny gavebunt

1. Klikk på **Legg til gavebunt** øverst på siden.
2. Skriv inn et beskrivende navn (for eksempel «Søndagsoffer – 9. feb.»).
3. Velg datoen for innsamlingen.
4. Klikk på **Lagre**.

Den nye gavebunten vises i listen, klar til at du legger til donasjoner.

## Arbeide med gavebunter

- **Se donasjoner** -- klikk på navnet til en gavebunt for å åpne den og se alle enkeltdonasjonene den inneholder. Derfra kan du legge til, redigere eller fjerne donasjoner.
- **Redigere gavebuntdetaljer** -- klikk på knappen **Rediger** på en gavebuntrad for å endre navn eller dato.
- **Sortere** -- bruk kolonneoverskriftene til å sortere gavebuntene etter navn eller dato.
- **Eksportere** -- klikk på **Eksporter** for å laste ned gavebuntlisten som et regneark (CSV).

## Skrive ut en gavebunt

Åpne en gavebunt og klikk på **Skriv ut**-ikonet (skriveren) øverst i donasjonslisten for å skrive ut en papirkopi til telleteamet eller til innskuddsdokumentasjonen. Utskriften inneholder:

- Menighetens navn, gavebuntens navn og gavebuntens dato
- Alle donasjoner i gavebunten, med giverens navn, metode, notater, dato og beløp (refunderte gaver er overstreket og merket som refundert)
- **Delsummer per fond** -- totalbeløpet gitt til hvert fond i gavebunten
- **Gavebunttotal** -- det samlede beløpet for hele gavebunten

Skriv ut-ikonet vises først når gavebunten har minst én donasjon.

### Skrive ut flere gavebunter samtidig

For å skrive ut alle gavebunter fra en periode i én operasjon -- for eksempel alle innskudd fra forrige måned -- klikker du på **Skriv ut**-ikonet (skriveren) i overskriften på listen **Gavebunter**, ved siden av **Eksporter**. Siden **Skriv ut gavebunter** åpnes med en **Startdato** og en **Sluttdato** som som standard dekker de siste 30 dagene. Endre en av datoene for å velge et annet tidsrom.

Hver gavebunt med dato innenfor tidsrommet (inkludert start- og sluttdatoen) skrives ut i datorekkefølge, én gavebunt per side, med samme oppsett som utskriften av en enkelt gavebunt. Gavebunter uten donasjoner utelates, og hvis ingen av gavebuntene i tidsrommet har donasjoner, ser du teksten «No batches with donations in this date range.» Klikk på **Skriv ut** for å åpne utskriftsdialogen i nettleseren, eller på **Lukk** for å gå tilbake til gavebuntlisten.

## Eksportere en gavebunt til QuickBooks Online

Åpne en gavebunt og klikk på **Eksporter for QuickBooks** for å laste ned gavebunten som en journalpost som QuickBooks Online kan importere (**Settings > Import Data > Journal Entries**). Filen inneholder én debet til **Undeposited Funds** for gavebuntens totalbeløp og én kredit per fond, der fondets navn brukes som kontonavn. QuickBooks ber deg koble disse navnene til kontoplanen din under importen, så gi fondene samme navn som regnskapsføreren bruker på inntektskontoene, eller koble dem én gang under importen.

:::tip
Gi gavebuntene navn på en konsekvent måte, så er de lette å finne igjen senere. Hvis du tar med dato og type innsamling (for eksempel «Søndag formiddag – 2025-02-09»), holder du listen ryddig etter hvert som den vokser.
:::

## Neste steg

Når du har en gavebunt, kan du se [Registrere donasjoner](recording-donations.md) for å lære hvordan du legger til enkeltdonasjoner i den. Du kan også [importere Stripe-transaksjoner](stripe-import.md) for automatisk å opprette gavebunter fra nettbasert giving.

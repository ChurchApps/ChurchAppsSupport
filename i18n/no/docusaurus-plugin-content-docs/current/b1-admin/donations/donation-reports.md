---
title: "Donasjonsrapporter"
---

# Donasjonsrapporter

<div class="article-intro">

B1 Admin gir deg flere måter å vise og analysere kirkas givingsdata på. Siden for Givingsanslaktet gir en visuell oversikt med diagrammer og filtre, mens rapportseksjonen tilbyr en mer detaljert Donasjonsoversiktsrapport. Bruk disse verktøyene til å spore givingtrender, forberede deg til styremøter eller avstemme postene dine.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Forsikre deg om at donasjoner er blitt [registrert i partier](recording-donations.md) eller [importert fra Stripe](stripe-import.md)
- Bekreft at [fondene](funds.md) dine er satt opp riktig slik at donasjoner kategoriseres riktig

</div>

## Givingsanslaktet

**Givingsanslaktet** er det første du ser når du åpner **Donasjoner**-seksjonen. Det gir en oversikt på høyt nivå over givingsaktiviteten din med nøkkelprestasjoner.

1. Åpne **seksjonsmenyen** i øverste venstre hjørne og velg **Donasjoner** for å åpne anslaktet.
2. Øverst viser fire **KPI-kort** givingsmålingene dine ved første øyekast:
   - **Total giving** -- Det totale beløpet som er donert i den valgte perioden.
   - **Gjennomsnittlig gave** -- Gjennomsnittdonasjonsbeløpet.
   - **Unike givere** -- Antallet distinkte personer som ga.
   - **Totale donasjoner** -- Totalt antall individuelle donasjoner.
3. Bruk **periodeomkoblingen** for å bytte mellom **Ukentlig**, **Månedlig** og **Kvartalsvis** visninger.
4. Under KPI-ene viser et diagram givingtrender for den valgte perioden.
5. Klikk **Nedlasting** for å eksportere en CSV-fil med givingtotaler.

Hvis donasjoner i perioden ble gitt i mer enn én valuta, konverteres KPI-totalene til kirkas valuta og en **Konvertert til gjeldende valutakurser**-merknad vises under kortene. Se [Støtte for flere valutaer](./multi-currency.md#converted-totals) for detaljer.

## Tidligere givere

Fanen **Tidligere givere** ved siden av anslaktet viser personer som ga i en periode men ikke siden. Som standard sammenligner det forrige kalenderår med dette året til dags dato; endre begge datoene for å utvide eller begrense søket. Hver rad viser personen, datoen for deres siste gave og deres total for den tidligere perioden, og **Eksporter** nedlaster listen som en CSV for en oppfølgingspostkampanje eller samtaleliste.

## Donasjonsoversikt-side

**Oversikt**-siden gir mer detaljert samlende givingsdata.

1. Åpne **seksjonsmenyen** i øverste venstre hjørne og velg **Donasjoner** for å åpne oversiktssiden.
2. Bruk **datointervallfilter** for å velge tidsperioden du vil gjennomgå. Sett den tidligere datoen øverst og den nyere datoen nederst.
3. Siden viser et ukentlig givingsdiagram slik at du kan se trender ved første øyekast.
4. Klikk **Nedlasting** for å eksportere en CSV-fil med det totale beløpet som ble gitt, uken det ble gitt og fondet det ble gitt til.

:::info
Oversiktssiden viser samlende givingsdata. Den inkluderer ikke individuelle givarnavn. For detaljer på donor-nivå, bruk siden [Partier](batches.md).
:::

## Vise detaljer på donor-nivå

For en oppdelning av hvem som ga, hvor mye og til hvilket fond:

1. Gå til **Donasjoner > Partier**.
2. Klikk på et **partnavn** for å åpne det.
3. Detaljesiden for partiet viser hver donasjon med giverens navn, beløp, fond, dato og betalingsmåte.
4. Klikk på **giverens navn** for å se en oppdelning av hvor mange ganger de donerte og hvor mye hver gang.
5. Klikk på en **donasjon-ID** for å åpne et sidepanel med fullstendige detaljer for den individuelle donasjonen.
6. Klikk **Nedlasting** for å eksportere en CSV med all giver- og donasjonsinfo for det partiet.

## Donasjonsoversiktsrapport

Donasjonrapportering er bygget direkte inn i Donasjoner-seksjonen -- Oversikt-siden fungerer som din donasjonsoversiktsrapport:

1. Åpne **seksjonsmenyen** i øverste venstre hjørne og velg **Donasjoner** for å åpne oversiktssiden.
2. Bruk **datointervallfilter** for å velge perioden du vil rapportere om.
3. Klikk **Nedlasting** for å eksportere rapporten som en CSV-fil.

## Eksportere data

Du kan eksportere donasjonsdata fra flere steder:

- **Oversikt-siden** -- nedlast en CSV av ukentlige givingtotaler etter fond
- **Parti-detaljesiden** -- nedlast en CSV av individuelle donasjoner med giverdetaljer
- **Fond-detaljesiden** -- nedlast donasjonshistorikk for et spesifikt fond

:::tip
For årssluttrapportering, kombiner eksporteringen av Oversikt-siden med verktøyet [Givingsutsagn](giving-statements.md) for å få både samlende trender og individuelle giveroppgaver.
:::

## Neste steg

- Generer [Givingsutsagn](giving-statements.md) for giverne dine ved årsavslutning
- Gjennomgå individuelle [partier](batches.md) for å bekrefte donasjonsdetaljer
- Sjekk [fond](funds.md)-detaljesidene for givingsoppdelinger etter kategori

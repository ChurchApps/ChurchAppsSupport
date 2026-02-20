---
title: "Donasjonsrapporter"
---

# Donasjonsrapporter

<div class="article-intro">

B1 Admin gir deg flere måter å vise og analysere menighetens giverdata. Donasjonssammendragssiden gir en visuell oversikt med diagrammer og filtre, mens Rapporter-seksjonen tilbyr en mer detaljert donasjonssammendragsrapport. Bruk disse verktøyene til å spore givertrender, forberede styremøter eller avstemme registrene dine.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at donasjoner er [registrert i grupper](recording-donations.md) eller [importert fra Stripe](stripe-import.md)
- Verifiser at [fondene](funds.md) dine er riktig satt opp slik at donasjoner er riktig kategorisert

</div>

## Donasjonssammendragssiden

**Sammendrag**-siden er det første du ser når du klikker på **Donasjoner** i sidepanelet. Den gir en overordnet oversikt over giveraktiviteten din.

1. Naviger til **Donasjoner** i sidepanelet for å åpne Sammendragssiden.
2. Bruk **datoperiode-filteret** for å velge tidsperioden du vil gjennomgå. Sett den tidligere datoen øverst og den nyere datoen nederst.
3. Siden viser et ukentlig giverdiagram slik at du kan se trender med et blikk.
4. Klikk **Last ned** for å eksportere en CSV-fil med totalbeløpet gitt, uken det ble gitt, og fondet det ble gitt til.

:::info
Sammendragssiden viser aggregerte giverdata. Den inkluderer ikke individuelle givernavn. For detaljer på givernivå, bruk [Grupper](batches.md)-siden.
:::

## Vise detaljer på givernivå

For en oversikt over hvem som ga, hvor mye og til hvilket fond:

1. Naviger til **Donasjoner > Grupper**.
2. Klikk på et **gruppenavn** for å åpne den.
3. Gruppedetaljsiden lister opp hver donasjon med giverens navn, beløp, fond, dato og betalingsmetode.
4. Klikk på et **givernavn** for å se en oversikt over hvor mange ganger de donerte og hvor mye hver gang.
5. Klikk på en **donasjons-ID** for å åpne et sidepanel med alle detaljer for den individuelle donasjonen.
6. Klikk **Last ned** for å eksportere en CSV med all giver- og donasjonsinformasjon for den gruppen.

## Donasjonssammendragsrapport

B1 Admin inkluderer også en **Donasjonssammendrag**-rapport i Rapporter-seksjonen:

1. Klikk **Rapporter** i sidepanelet.
2. Velg **Donasjonssammendrag**-rapporten.
3. Velg filtrene dine (datoperiode, fond, campus, osv.) og kjør rapporten.

## Eksportere data

Du kan eksportere donasjonsdata fra flere steder:

- **Sammendragssiden** -- last ned en CSV med ukentlige givertotaler per fond
- **Gruppedetaljsiden** -- last ned en CSV med individuelle donasjoner med giverdetaljer
- **Fonddetaljsiden** -- last ned donasjonshistorikk for et spesifikt fond

:::tip
For årsrapportering, kombiner eksport fra Sammendragssiden med [Giveroppgaver](giving-statements.md)-verktøyet for å få både aggregerte trender og individuelle giveroppgaver.
:::

## Neste steg

- Generer [Giveroppgaver](giving-statements.md) for giverne dine ved årsslutt
- Gjennomgå individuelle [grupper](batches.md) for å verifisere donasjonsdetaljer
- Sjekk [fond](funds.md)-detaljsider for giveroversikter per kategori

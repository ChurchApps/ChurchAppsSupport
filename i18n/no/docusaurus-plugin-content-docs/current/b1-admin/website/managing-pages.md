---
title: "Håndtering av sider"
---

# Håndtering av sider

<div class="article-intro">

Siden Website Pages er sentralnavet ditt for å opprett, redigere og organisere alle sider på kirkens nettsted. Du kan administrere både sideinnholdet og nettstedets navigasjon fra dette enkeltskjermen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [innledende oppsett](initial-setup) for å konfigurere domenet og grunnleggende nettstedinnstillinger
- Ha innholdet og bildene klare. Bruk [Filer](files)-ansvarlig for å laste opp mediaressurser først.

</div>

## Forståelse av sidetypeene

**Sider**-tabellen viser hver side på nettstedet tillsammans med statusen:

- **Generert** -- Sider som automatisk ble opprettet av systemet basert på kirkens data (f.eks. en gruppeside eller Prekener-side). Disse sidene oppdaterer seg selv når dataene endres.
- **Egendefinert** -- Sider som du opprettet selv med ditt eget innhold og layout.

Du kan konvertere enhver auto-generert side til en egendefinert side hvis du vil ha full kontroll over innholdet og designet.

## Legge til og redigere sider

1. Klikk **Legg til side**-knappen i det øvre høyre hjørnet av siden Sider-tabellen.
2. Velg en sidetype (tom eller mal) og gi den et navn.
3. Klikk **Rediger** ved siden av enhver side for å åpne sidebyggeren, hvor du kan legge til seksjoner, tekst, bilder og andre elementer.
4. Klikk **Sideinnstillinger** for å oppdatere sidetittel, URL-banen og annen metadata.
5. Bruk **Forhåndsvis**-knappen for å åpne siden i et nytt vindu og se nøyaktig hvordan den vil se ut for besøkende.

:::tip
For hjemmesiden, sett URL-banen til bare `/`. For alle andre sider, bruk en beskrivende bane som `/om` eller `/kontakt`.
:::

## Håndtering av navigasjon

Venstre sidefelt på siden Website Pages viser navigasjonslinkene. Disse linkene kontrollerer menyen som besøkende ser på nettstedet.

1. Klikk **Legg til** for å opprette en ny navigasjonslenke. Du kan peke den til en hvilken som helst side på nettstedet eller til en ekstern URL.
2. For å omorganisere lenker, drar du dem inn i ønsket rekkefølge. Du kan også neste lenker under et overordnet element for å opprett rullegardinmenyer.
3. Klikk **Rediger**-ikonet ved siden av en link for å endre etiketten, URL-en eller posisjonen.
4. For å fjerne en lenke fra navigasjonen, klikk **Slett**-ikonet.

:::info
Fjerning av en navigasjonslenke sletter ikke siden selv. Siden finnes fortsatt og kan få tilgang direkte via URL-en -- det vil bare ikke vises i menyen.
:::

## Tips for organisering av nettstedet

- Hold navigasjonen på toppnivå til fem eller seks elementer slik at besøkende raskt kan finne ting.
- Bruk neste lenker for relaterte undersider (f.eks. en "Om" rullgardin med "Teamet vårt", "Tro" og "Historie").
- Gjennomgå navigasjonen på mobil ved å klikke **Mobil forhåndsvisning** for å kontroller at den fungerer bra på mindre skjermer.
- Gi sider klare, beskrivende navn som hjelper besøkende å forstå hva de vil finne.

:::tip
Du kan legge til [skjemaer](../forms/creating-forms.md) på sidene dine for å samle påmeldinger, begjæringer om bønn eller annen informasjon fra besøkende.
:::

## Bilde Lightbox

Når besøkende klikker på et bilde på nettstedet, åpner det i et fullskjerms lightbox-overlay. Dette lar personer vise bilder i større størrelse uten å forlate siden. Ingen konfigurasjon kreves -- lightbox-en er aktivert automatisk for bilder i sideinnholdet.

## Neste trinn

- [Innledende oppsett](initial-setup) -- Instruksjoner for første gangs oppsett
- [Utseende](appearance) -- Tilpass visuelt tema på nettstedet
- [Filer](files) -- Last opp og administrer mediaressurser for sidene

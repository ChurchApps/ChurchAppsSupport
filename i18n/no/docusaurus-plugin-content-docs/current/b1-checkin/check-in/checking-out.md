---
title: "Sjekking ut og barnesikkerhet"
---

# Sjekking ut og barnesikkerhet

<div class="article-intro">

Sjekking ut avslutter prosessen med innsjekking av barn: en forelder presenterer sikkerhetskoden fra etiketten deres, kiosken verifiserer hvem som skal hente, og barna sjekkes ut. Bemannte stasjoner får også sikkerhetsverktøy — verifisering av betrodd henting, tekster for å hente foreldre, omutskrift av sikkerhetsetiketter og nødkringkasting.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sjekking ut er tilgjengelig på stasjoner satt til **bemanne**d modus i innstillingene for kiosk-admin
- Barn må ha blitt [innsjekket](./completing-checkin) med en trykt henteetikett som inneholder sikkerhetskoden
- Kalling og nødkringkasting krever at kirken din har en tekstleverandør tilkoblet i B1 Admin

</div>

## Starte en sjekking ut

1. På en bemannt stasjon, trykk **Sjekk ut** på søkeskjermen.
2. Skriv inn 4-tegns **sikkerhetskode** fra familiens henteetikett. Du kan skrive den, bruke det elektroniske tastaturet på skjermen, eller skanne koden på etiketten med en USB- eller Bluetooth-skanner — koden sendes automatisk når alle 4 tegn er oppgitt.
3. Kiosken viser barna som er innsjekket under denne koden.

## Verifisering av hvem som henter

Sjekking ut-skjermen spør hvem som skal hente barna:

- **Betrodde hentepersoner** for husholdningen vises som trykbare kort med foto og forhold — trykk på personen som står foran deg.
- **Husholdningsadulter** vises også i et fotogalleri.
- **Annen** lar deg skrive inn navn på noen som ikke er på listen.

Hvis et skrevet navn stemmer overens med noen merket som **Ikke autorisert** for den husholdningen, blokkerer kiosken sjekking ut med en advarsel. En ansatt kan velge **Overstyring** for å fortsette likevel — overstyringen registreres på oppmøteposten med personens navn.

Når henteren er bekreftet, trykk sjekk ut. Henteren sin navn lagres med oppmøteposten.

:::info
Betrodde og ikke-autoriserte hentepersoner administreres av kirkestaben på hver persons side i B1 Admin — se [Sikkerhet ved innsjekking](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Ringing av forelder

Trenger en forelder under tjenesten — skifte bleie, et gretent barn? Fra sjekking ut-skjermen på en bemannt stasjon, kan staben sende en **ring**: en tekstmelding til barnets foreldre eller foresatte gjennom kirkens tekstleverandør. Foreldre som har meldt seg av tekster eller som ikke har mobilnummer, hoppes over, og kiosken viser hvor mange meldinger som ble sendt.

## Omutskrift av etiketter

Hvis en navneetikett eller henteetikett går tapt eller blir skadet, kan staben på en bemannt stasjon **omskrive** familiens etiketter fra sjekking ut-skjermen etter å ha tastet inn sikkerhetskoden. Omskriften bruker samme skriver og etikettemaler som den opprinnelige innsjekingen.

## Nødkringkasting

I en nødsituasjon kan staben sende tekstmelding til formynder av **alle innsjekket barn** for gjeldende tjeneste på en gang:

1. Åpne innstillingene for kiosk-**admin** (7 hurtige trykk på headerlogoen, pluss PIN-koden hvis en er satt).
2. Trykk **Nødkringkasting**.
3. Skriv inn meldingen, og skriv deretter **EMERGENCY** (NØDSITUATION) i bekreftelsesfeltet — knappen **Send broadcast** (Send kringkasting) forblir deaktivert til du gjør det.
4. Kiosken rapporterer hvor mange telefoner mottok meldingen og hvor mange personer ble hoppet over (meldt seg av eller ingen mobilnummer).

:::warning
Kringkastingen sendes til alle innsjekket husholdninger for den valgte tjenesten. Bruk den til ekte nødsituasjoner — evakueringer, lockdowns, ekstremvær.
:::

## Relaterte artikler

- [Fullføre innsjekking](./completing-checkin) — hvor sikkerhetskoder og hentetikett kommer fra
- [Sikkerhet ved innsjekking](../../b1-admin/attendance/checkin-safety) — konfigurering av kapasiteter, forhold, hentepersoner og krav til tekstleverandør
- [Skriveroppsett](../getting-started/printer-setup) — konfigurering av etikettskriver

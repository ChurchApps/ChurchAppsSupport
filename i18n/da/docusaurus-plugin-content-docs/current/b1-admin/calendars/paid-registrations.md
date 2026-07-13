---
title: "Betalte tilmeldinger"
---

# Betalte tilmeldinger

<div class="article-intro">

Begivenhedstilmelding kan være mere end en simpel optælling. Du kan definere prissatte deltagertyper (som Voksen og Barn), tilbyde valgfrie tilkøb med egne priser og antal, oprette rabatkoder og opkræve betaling ved tilmelding gennem din kirkes eksisterende donationsudbyder. Når en begivenhed bliver fuldtegnet, holder en valgfri venteliste interesserede medlemmer i kø og forfremmer dem automatisk, efterhånden som pladser åbner sig.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Aktivér først tilmelding på begivenheden — se [Opret kalendere](creating-calendars#enabling-event-registration)
- For at opkræve betalinger skal din kirke have [onlinedonationer konfigureret](../donations/online-giving-setup.md) (Stripe, PayPal eller Kingdom Funding). Gratis begivenheder kræver ingen donationsopsætning.

</div>

## Åbn tilmeldingsindstillinger

1. Gå til siden **Tilmeldinger** i B1 Admin, og åbn din begivenhed (eller åbn begivenheden fra dens kalender).
2. Kortet **Tilmeldingsindstillinger** viser det grundlæggende — **Aktivér tilmelding**, **Kapacitet**, **Tilmelding åbner/lukker**, **Tags** og **Tilmeldingsspørgsmål**.
3. Under det grundlæggende er der tre foldere: **Deltagertyper**, **Valgmuligheder** og **Rabatkoder**.

## Deltagertyper

Deltagertyper lader dig opkræve forskellige priser for forskellige typer deltagere — og sætte et loft for hver type separat.

1. Udvid folderen **Deltagertyper**, og klik **Tilføj type**.
2. Indtast et **Navn** (f.eks. "Voksen", "Barn", "Studerende").
3. Angiv en **Pris**. Brug 0 for en gratis type.
4. Angiv eventuelt en **Kapacitet** for netop denne type (f.eks. kun 20 pladser til Barn). Lad stå tomt for ingen grænse pr. type.
5. Klik **Gem**.

Under tilmelding vælger hver deltager en type; udsolgte typer vises som **Udsolgt** og kan ikke vælges. Deltagerlisten viser hver deltagers type og løbende antal pr. type.

## Valgmuligheder

Valgmuligheder er valgfrie, prissatte tilkøb — T-shirts, madplaner, aktivitetsopgraderinger.

1. Udvid folderen **Valgmuligheder**, og klik **Tilføj valgmulighed**.
2. Indtast et **Navn**, en valgfri **Beskrivelse** og en **Pris** (0 vises som "Gratis").
3. Angiv eventuelt en **Kapacitet** (samlet tilgængelig på tværs af alle tilmeldinger) og et **Maks. antal** (det højeste antal, én tilmelding kan bestille).
4. Klik **Gem**.

Tilmeldte vælger antal under tilmeldingen, og summerne tæller mod kapaciteten, så du aldrig oversælger.

## Rabatkoder

1. Udvid folderen **Rabatkoder**, og klik **Tilføj rabatkode**.
2. Indtast den **kode**, tilmeldte skal indtaste.
3. Vælg **Type** — **Procent** eller **Beløb** — og dens **Værdi**.
4. Begræns eventuelt koden med en **Startdato**/**Slutdato**, et **Min. medlemmer** (minimumsantal deltagere på tilmeldingen) og **Maks. anvendelser**.
5. Klik **Gem**.

Hver kode viser et antal **Anvendelser**, så du kan se, hvor ofte den er blevet indløst. Tilmeldte får øjeblikkelig feedback, når de anvender en kode — herunder tydelige beskeder, når en kode er udløbet, ikke er startet endnu, eller kræver flere deltagere.

## Venteliste

Slå **Aktivér venteliste** til i kortet Tilmeldingsindstillinger. Når begivenheden når sin kapacitet:

- Nye tilmeldte tilbydes en plads på ventelisten i stedet for at blive afvist. De gennemfører den samme tilmelding (betaling springes over, mens de er på ventelisten).
- Når nogen aflyser, forfremmes den ældste tilmelding på ventelisten automatisk og modtager en e-mail om, at en plads er blevet ledig. Hvis de skylder et beløb, linker e-mailen dem til at gennemføre betalingen.
- Du kan forfremme nogen manuelt når som helst med handlingen **Forfrem** på en ventelisterække — nyttigt efter en forhøjelse af begivenhedens kapacitet.

:::info
Forfremmede tilmeldinger forbliver *afventende*, indtil et eventuelt beløb er betalt; betaling (eller intet at betale) bekræfter dem.
:::

## Tilmeldingslisten

Åbn en begivenhed fra siden Tilmeldinger for at se alle tilmeldinger. Tabellen viser **Navn**, **Medlemmer**, **Type** (hver deltagers type), **Betalt/i alt** (med en saldoadvarsel, når der stadig skyldes penge), **Status** og **Dato**, plus antalschips pr. type over tabellen.

- Klik på en rækkes detaljeikon for at åbne dialogen **Tilmeldingsdetaljer** — medlemmer, valgmuligheder, betalt/saldo og en tabel **Betalinger**, der viser hver opkrævning (beløb, metode, dato).
- **Eksportér CSV** downloader den fulde deltagerliste med søjler for medlemmer, deltagertyper, valgmuligheder, betalt/i alt/saldo, status og én søjle pr. tilmeldingsspørgsmål.
- **Tilføj deltager** lader dig stadig registrere offline-tilmeldinger manuelt.

:::info
Refusioner behandles ikke i B1. Hvis du skal refundere en aflyst betalt tilmelding, skal du udstede refusionen fra din donationsudbyders dashboard (f.eks. Stripe).
:::

## Sådan fungerer betaling

Betalinger kører gennem den samme donations-gateway, som din kirke allerede bruger til donationer — kortoplysninger går direkte til udbyderen og rører aldrig B1's servere. Priser beregnes altid på serveren ud fra dine konfigurerede typer, valgmuligheder og rabatkoder, så en tilmeldt ikke kan manipulere med totalen. Loggede ind medlemmer kan betale med et gemt kort; gæster indtaster et kort ved betaling.

## Relaterede artikler

- [Opret kalendere](creating-calendars#enabling-event-registration) — aktivér tilmelding og de grundlæggende indstillinger
- [Opsætning af onlinedonationer](../donations/online-giving-setup.md) — konfigurer betalings-gatewayen, der bruges ved betaling
- [Tilmelding til begivenheder](../../b1-church/events/registering) — hvad medlemmer ser, når de tilmelder sig
- [Mine tilmeldinger](../../b1-church/events/my-registrations) — hvordan medlemmer betaler saldi og redigerer tilmeldinger

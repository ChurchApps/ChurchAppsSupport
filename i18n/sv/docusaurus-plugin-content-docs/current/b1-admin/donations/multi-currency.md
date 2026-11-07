---
title: "Flervalutastöd"
description: "Registrera och rapportera gåvor i olika valutor i B1 Admin, inklusive manuell inmatning, onlinegivande via Stripe och hur sammanlagda summor omräknas."
---

# Flervalutastöd

<div class="article-intro">

Med B1:s flervalutafunktion kan din kyrka ta emot och registrera gåvor i olika valutor. Detta är särskilt användbart för kyrkor med internationella medlemmar, missionärer eller flera församlingsplatser i olika länder.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörighet att hantera gåvor. Se [Roller och behörigheter](../people/roles-permissions.md) för mer information.
- Konfigurera [onlinegivande](./online-giving-setup.md) med Stripe, som stöder transaktioner i flera valutor.
- Sätt dig in i din kyrkas redovisningsbehov för hantering av flera valutor.

</div>

## Aktivera flervaluta

Stöd för flera valutor är nu aktiverat som standard i B1. När det är aktiverat:

- Medlemmar kan ge i sin lokala valuta när de donerar online
- Du kan manuellt registrera gåvor i valfri valuta
- Gåverapporter visar belopp i deras ursprungliga valuta
- Stripe hanterar valutaomvandlingen automatiskt för onlinegivande

## Stödda valutor

Systemet stöder alla större världsvalutor, bland annat:

- **USD** -- Amerikansk dollar
- **EUR** -- Euro
- **GBP** -- Brittiskt pund
- **CAD** -- Kanadensisk dollar
- **AUD** -- Australisk dollar
- **MXN** -- Mexikansk peso
- **BRL** -- Brasiliansk real
- **INR** -- Indisk rupie
- **CNY** -- Kinesisk yuan
- **JPY** -- Japansk yen
- Och många fler...

Vilka valutor som är tillgängliga för onlinegivande beror på vilka valutor ditt Stripe-konto stöder.

## Registrera gåvor i olika valutor

### Onlinegåvor

När en medlem ger online via Stripe:

1. Väljer medlemmen sin önskade valuta vid kassan
2. Stripe behandlar betalningen i den valutan
3. Gåvan registreras i B1 med beloppet i den ursprungliga valutan
4. Stripe hanterar automatiskt eventuell valutaomvandling till din kontos standardvaluta

### Manuell registrering

Så här registrerar du en kontant- eller checkgåva i en annan valuta:

1. Gå till **Gåvor > Batcher** i B1 Admin och öppna batchen
2. Klicka på **Lägg till gåva** högst upp på batchsidan
3. Välj valuta i valutalistan
4. Ange beloppet i den valutan
5. Fyll i resten av gåvouppgifterna
6. Klicka på **Spara**

## Visa gåvor i flera valutor

### Gåverapporter

Gåverapporter visar belopp i deras ursprungliga valuta:

- Enskilda gåvoposter visar valutakoden (t.ex. "$100.00 USD")
- Summor beräknas per valuta
- Du kan filtrera på specifika valutor

### Omvandlade summor

Där B1 visar en enda sammanlagd summa -- sammanfattningskorten för givande, en batchsumma för gåvor och en fonds totalsumma -- omvandlas gåvor registrerade i en annan valuta än din kyrkas standardvaluta till din kyrkvaluta med aktuella växelkurser. Summan blir därmed ett enda meningsfullt tal i stället för att olika valutor adderas ihop. En **Omvandlat till aktuella växelkurser**-notering visas under summan när en omvandling har tillämpats. Enskilda gåvorader visas fortfarande i sin ursprungliga valuta.

### Givandeöversikter

När du skapar givandeöversikter:

- Varje gåva visas i sin ursprungliga valuta
- Summor delas upp per valuta
- Medlemmar ser exakt vad de gav i varje valuta

## Stripe-integration

För onlinegivande hanterar Stripe transaktioner i flera valutor:

- **Automatisk omvandling** -- Stripe omvandlar valutor till ditt kontos standardvaluta
- **Växelkurser** -- Stripe använder aktuella marknadsväxelkurser
- **Avgifter** -- Valutaomvandling kan medföra ytterligare Stripe-avgifter
- **Utbetalningsvaluta** -- Medel sätts in i ditt kontos standardvaluta

:::info
Kontrollera din Stripe-instrumentpanel för att se aktuella omvandlingskurser och eventuella avgifter för transaktioner i flera valutor.
:::

## Redovisningsaspekter

När du arbetar med flera valutor:

- **Journalföring** -- Håll reda på ursprungliga gåvobelopp och valutor för korrekt rapportering
- **Växelkurser** -- Observera att Stripes omvandlingskurser kan skilja sig från din banks kurser
- **Skattekvitton** -- Rådgör med din revisor om hur gåvor i olika valutor ska redovisas för skatteändamål
- **Fondfördelning** -- Du kan fördela gåvor till specifika fonder oavsett valuta

## Bästa praxis

- **Standardvaluta** -- Ange din huvudsakliga kyrkvaluta som standard för de flesta transaktioner
- **Tydlig kommunikation** -- Tala om för givare vilken valuta de ger i under betalningsprocessen
- **Konsekvent rapportering** -- Sammanlagda summor omvandlas alltid automatiskt till din kyrkvaluta; använd filtret per gåva när du behöver se ursprungliga belopp
- **Regelbunden avstämning** -- Stäm av Stripe-utbetalningar mot dina gåvoregister och ta hänsyn till valutaomvandlingar

## Begränsningar

- Valutaomvandling vid betalningsbehandling sköts av Stripe, och endast för onlinegivande; manuella gåvor registreras som angivna utan automatisk omvandling
- Historiska rapporter och enskilda gåvoposter visar alltid den ursprungliga valuta som gåvan registrerades i
- Sammanlagda summor (KPI-kort, batchsummor, fondsummor) omvandlas till din kyrkvaluta med aktuella växelkurser -- dessa kurser kan skilja sig något från din banks eller Stripes kurser vid den tidpunkt då medlen överförs

## Relaterade artiklar

- [Konfigurera onlinegivande](./online-giving-setup.md) -- Konfigurera Stripe för att ta emot gåvor
- [Registrera gåvor](./recording-donations.md) -- Ange gåvoposter manuellt
- [Gåverapporter](./donation-reports.md) -- Skapa och visa gåvosammanfattningar
- [Givandeöversikter](./giving-statements.md) -- Skapa årliga givandeöversikter

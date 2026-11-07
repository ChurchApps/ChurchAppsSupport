---
title: "Betalda registreringar"
---

# Betalda registreringar

<div class="article-intro">

Eventregistrering kan gå längre än en enkel deltagarräkning. Du kan definiera deltagartyper med priser (till exempel Vuxen och Barn), erbjuda valfria tillägg med egna priser och antal, skapa rabattkoder och ta emot betalning vid registreringen via kyrkans befintliga givartjänst. När ett evenemang blir fullt håller en valfri väntelista intresserade medlemmar i kö och flyttar upp dem automatiskt när platser frigörs.

</div>

## Utbildningsvideo

<YouTube id="eGSZv24Dlzk" title="Eventregistrering och betalda evenemang i B1" next="Lansera din kyrkowebbplats i B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Aktivera registrering för eventet först — se [Skapa kalendrar](creating-calendars#enabling-event-registration)
- För att ta emot betalningar online behöver din kyrka [konfigurerad onlinegivning](../donations/online-giving-setup.md) (Stripe, PayPal eller Kingdom Funding). Gratis evenemang kräver ingen givarinställning. Utan onlinegivning fungerar betalda registreringar fortfarande, men personerna betalar kyrkan direkt — se [Kyrkor utan onlinegivning](#churches-without-online-giving).

</div>

## Öppna registreringsinställningarna

1. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (sökfältet uppe till vänster), välj **Kalendrar > Registreringar** och öppna ditt evenemang (eller öppna evenemanget från dess kalender).
2. Kortet **Registreringsinställningar** visar grunderna — **Aktivera registrering**, **Kapacitet**, **Registrering öppnar/stänger**, **Taggar** och **Registreringsfrågor**.
3. Under grunderna finns tre expanderbara sektioner: **Deltagartyper**, **Val** och **Rabattkoder**.

## Deltagartyper

Deltagartyper låter dig ta olika priser för olika slags deltagare — och begränsa varje typ separat.

1. Expandera sektionen **Deltagartyper** och klicka på **Lägg till typ**.
2. Ange ett **Namn** (t.ex. "Vuxen", "Barn", "Student").
3. Ange ett **Pris**. Använd 0 för en gratis typ.
4. Ange eventuellt en **Kapacitet** för just den här typen (t.ex. endast 20 platser för barn). Lämna tomt för ingen gräns per typ.
5. Klicka på **Spara**.

Vid registreringen väljer varje deltagare en typ; slutsålda typer visas som **Slutsåld** och kan inte väljas. Deltagarlistan visar varje deltagares typ och löpande antal per typ.

## Val

Val är valfria betalda tillägg — t-shirtar, måltidspaket, uppgraderingar av aktiviteter.

1. Expandera sektionen **Val** och klicka på **Lägg till val**.
2. Ange ett **Namn**, eventuellt en **Beskrivning** och ett **Pris** (0 visas som "Gratis").
3. Ange eventuellt en **Kapacitet** (totalt tillgängligt för alla registreringar) och en **Max antal** (det största antal en registrering kan beställa).
4. Klicka på **Spara**.

Registrerade väljer antal under anmälan, och summorna räknas mot kapaciteten så att du aldrig säljer för mycket.

## Rabattkoder

1. Expandera sektionen **Rabattkoder** och klicka på **Lägg till rabattkod**.
2. Ange **Koden** som registrerade ska skriva in.
3. Välj **Typ** — **Procent** eller **Belopp** — och ange **Värde**.
4. Begränsa eventuellt koden med ett **Startdatum** / **Slutdatum**, ett **Min. antal deltagare** (minsta antal deltagare på registreringen) och **Max antal användningar**.
5. Klicka på **Spara**.

Varje kod visar ett **Användningar**-antal, så du kan se hur ofta den har lösts in. Registrerade får direkt återkoppling när de tillämpar en kod — inklusive tydliga meddelanden när en kod har gått ut, inte har börjat gälla eller kräver fler deltagare.

## Väntelista

Aktivera **Aktivera väntelista** på kortet Registreringsinställningar. När evenemanget når sin kapacitet:

- Nya registrerade erbjuds en plats på väntelistan i stället för att nekas. De slutför samma anmälan (betalningen hoppas över medan de står på väntelistan).
- När någon avbokar flyttas den äldsta registreringen på väntelistan **upp automatiskt** och får ett e-postmeddelande om att en plats har frigjorts. Om de har en utestående skuld länkar e-postmeddelandet till [Mina registreringar](../../b1-church/events/my-registrations) på din kyrkas B1-webbplats, där de kan slutföra betalningen.
- Du kan flytta upp någon manuellt när som helst med åtgärden **Flytta upp** på en rad på väntelistan — användbart efter att du har höjt evenemangets kapacitet.

:::info
Uppflyttade registreringar förblir *väntande* tills eventuell skuld är betald; betalning (eller att inget finns att betala) bekräftar dem.
:::

## Registreringslistan

Öppna ett evenemang från sidan Registreringar för att se alla registreringar. Kortets rubrik visar hur många registreringar som har en plats i förhållande till kapaciteten (till exempel *Registreringar (18 / 20)*). Endast väntande och bekräftade registreringar räknas; när personer står på väntelistan läggs antalet till i rubriken (till exempel *· 3 på väntelistan*), och samma antal visas under kapacitetsfältet. Tabellen visar **Namn**, **Medlemmar**, **Typ** (varje deltagares typ), **Betalt / Totalt** (med en varning för saldo när pengar fortfarande är utestående), **Status** och **Datum**, samt räknare per typ ovanför tabellen.

- Klicka på en rads detaljikon för att öppna dialogrutan **Registreringsdetaljer** — medlemmar, val, betalt/saldo och en tabell **Betalningar** som listar varje debitering (belopp, metod, datum).
- **Exportera CSV** laddar ner hela listan med kolumner för medlemmar, deltagartyper, val, betalt/totalt/saldo, status och en kolumn per registreringsfråga.
- **Lägg till deltagare** registrerar en anmälan gjord offline eller per telefon för vilken person som helst i din kyrka. Välj personen och, vid ett betalt evenemang, deras deltagartyp. Deras kort debiteras inte: en betald registrering sparas som **väntande** med hela beloppet som utestående saldo. Om din kyrka har onlinegivning kan personen betala från [Mina registreringar](../../b1-church/events/my-registrations); annars tar du emot betalningen personligen. Du behöver behörigheten Registreringar – Redigera för att lägga till deltagare.

:::info
Återbetalningar hanteras inte i B1. Om du behöver återbetala en avbokad betald registrering gör du återbetalningen i din givartjänsts instrumentpanel (t.ex. Stripe).
:::

## Så fungerar betalningen

Betalningar går genom samma givargateway som din kyrka redan använder för gåvor — kortuppgifter går direkt till leverantören och berör aldrig B1:s servrar. Priserna beräknas alltid på servern utifrån dina konfigurerade typer, val och rabattkoder, så en registrerad kan inte manipulera totalsumman. Inloggade medlemmar kan betala med ett sparat kort. Gäster anger ett kort i kassan och måste bocka för **Jag är inte en robot** innan de betalar.

### Kyrkor utan onlinegivning

Om din kyrka inte har någon givartjänst konfigurerad kan betalda evenemang ändå ta emot registreringar. Betalningssteget informerar registrerade om att onlinebetalning inte är tillgänglig och att de kan betala kyrkan direkt, och knappen **Registrera och betala senare** sparar registreringen. Den sparas som **väntande** med hela beloppet som utestående saldo och visas i listan med en saldovarning. Ta in pengarna på det sätt din kyrka vanligtvis gör.

:::info
B1 har inget sätt att markera en offline-betalning som mottagen. Det utestående saldot finns kvar i listan och på den registrerades kort under [Mina registreringar](../../b1-church/events/my-registrations) även efter att du har tagit emot pengarna, såför din egen förteckning över vem som har betalat.
:::

## Relaterade artiklar

- [Skapa kalendrar](creating-calendars#enabling-event-registration) — aktivera registrering och grundinställningarna
- [Konfigurera onlinegivning](../donations/online-giving-setup.md) — konfigurera betalningsgatewayen som används i kassan
- [Registrera dig för evenemang](../../b1-church/events/registering) — vad medlemmar ser när de anmäler sig
- [Mina registreringar](../../b1-church/events/my-registrations) — hur medlemmar betalar saldon och redigerar registreringar

---
title: "Stripe-import"
---

# Stripe-import

<div class="article-intro">

Om du tar emot onlinegåvor via Stripe kan verktyget Stripe-import hämta dessa transaktioner till B1 Admin, så att alla dina gåvodata finns på ett ställe. Det är särskilt användbart för att fånga upp transaktioner som inte synkroniserades automatiskt.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Slutför [Konfigurera onlinegivande](online-giving-setup.md) för att koppla ditt Stripe-konto till B1 Admin. Menyalternativet **Stripe-import** och knappen på sidan Satser visas endast när kyrkans givandegateway är Stripe, och endast för personer som kan redigera gåvor
- Kontrollera att du har gåvor i din Stripe-instrumentpanel för det datumintervall du vill importera

</div>

## Så fungerar det

Importprocessen använder ett tvåstegsarbetsflöde: först förhandsgranskar du vad som skulle importeras, sedan bekräftar du importen. Detta torrkörningsupplägg låter dig granska allt innan några data skapas.

## Importera transaktioner

1. Gå till **B1 Admin** och navigera till **Gåvor > Stripe-import**. (Du kan också klicka på **Importera saknade Stripe-transaktioner** högst upp på sidan **Satser**.)
2. Sidan **Stripe-import** öppnas.
3. Välj ett **datumintervall** för de transaktioner du vill importera.
4. Klicka på **Förhandsgranska** för att köra en torrkörningskontroll.

## Granska förhandsgranskningen

Förhandsgranskningen visar varje transaktion från Stripe tillsammans med en statusindikator:

- **Ny** -- denna transaktion har inte importerats ännu och kommer att inkluderas om du fortsätter.
- **Redan importerad** -- denna transaktion finns redan i B1 Admin och hoppas över.
- **Överhoppad** -- denna transaktion exkluderades av en annan anledning (till exempel en återbetalning eller ett misslyckat debiteringsförsök).

Ett sammanfattningsavsnitt överst visar det totala antalet transaktioner i varje kategori och de belopp i dollar som berörs.

:::info
Förhandsgranskningssteget skapar inga poster. Det är en skrivskyddad kontroll så att du kan verifiera vad som kommer att hända innan du genomför det.
:::

## Slutför importen

1. Granska resultatet av förhandsgranskningen och sammanfattningssummorna.
2. Klicka på **Importera saknade** för att importera alla transaktioner som markerats som **Ny**.
3. När importen är klar uppdateras statusmärkena bredvid varje transaktion så att de visar resultatet.

## Tips för att använda Stripe-import

- Kör importen regelbundet (varje vecka eller månad) för att hålla dina uppgifter uppdaterade.
- Om en transaktion visas som **Redan importerad** betyder det att B1 Admin redan har en motsvarande post -- ingen åtgärd krävs.
- Använd datumintervallsfiltret för att fokusera på en viss period om du letar efter särskilda transaktioner.

:::tip
Efter importen bör du besöka sidan [Satser](batches.md) för att kontrollera att de importerade gåvorna visas korrekt och att summorna stämmer överens med det du ser i din Stripe-instrumentpanel.
:::

## Nästa steg

- Läs [Gåverapporter](donation-reports.md) för att granska de importerade transaktionerna tillsammans med dina övriga gåvodata
- Kontrollera att importerade gåvor tilldelas rätt [fonder](funds.md) för korrekta [givandebesked](giving-statements.md)

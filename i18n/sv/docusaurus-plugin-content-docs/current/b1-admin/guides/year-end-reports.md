---
title: "Guide: Generera årsrapporter för gåvor"
description: "I B1 Admin slutför du årets donationsregistreringar, kontrollerar skatteinställningarna för fonderna och genererar skattemässigt avdragsgilla gåvobesked för varje givare."
---

# Generera årsrapporter för gåvor

<div class="article-intro">

Gå igenom årsslutsprocessen: slutför dina donationsregistreringar, kontrollera fondinställningarna och generera skattemässigt avdragsgilla gåvobesked för varje givare. Detta görs vanligtvis i början av januari för föregående kalenderår.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- B1 Admin-konto med åtkomst till ekonomi
- Donationer som registrerats under året (online via Stripe och/eller manuellt inmatade)
- Åtkomst till ditt Stripe-konto om du tar emot onlinedonationer

</div>

## Steg 1: Importera de sista Stripe-transaktionerna

Se till att alla onlinedonationer från slutet av året finns i ditt system.

Följ guiden [Stripe Import](../donations/stripe-import.md) för att:

1. Gå till Donations > Stripe Import
2. Välj ett datumintervall som täcker slutet av året (t.ex. 1 december - 31 december)
3. Klicka först på Preview för att granska och sedan på Import Missing för att slutföra

:::warning
Kör den här importen innan du genererar gåvobesked. Transaktioner som inte har importerats visas inte på givarnas besked.
:::

## Steg 2: Granska donationsrapporterna

Kontrollera att dina registreringar är korrekta innan du genererar besked.

Följ guiden [Donation Reports](../donations/donation-reports.md) för att:

1. Kontrollera sammanfattningssidan för donationer för hela året
2. Granska summorna per fond och jämför dem med dina bankutdrag för att upptäcka eventuella avvikelser
3. Klicka in på enskilda batcher för att vid behov kontrollera uppgifterna per givare

## Steg 3: Kontrollera fondernas skattestatus

Se till att varje fonds inställning för skatteavdrag är korrekt så att beskeden blir riktiga.

Följ guiden [Funds](../donations/funds.md) för att:

1. Öppna varje fond och bekräfta att inställningen för skatteavdrag är korrekt

:::info
Endast donationer till fonder som är markerade som skattemässigt avdragsgilla visas på gåvobesked. Om en fond borde vara avdragsgill men inte är markerad så, uppdatera den innan du genererar besked.
:::

## Steg 4: Generera gåvobesked

Skapa de officiella gåvobeskeden för dina givare.

Följ guiden [Giving Statements](../donations/giving-statements.md) för att:

1. Gå till **Donations > Giving Statements**
2. Välj året i listrutan och granska sammanfattningsstatistiken
3. Välj hur du vill hämta beskeden:
   - **Download ZIP** — separata CSV-filer, en per givare
   - **Print All** — utskriftsvänlig vy där varje besked börjar på en ny sida, med din kyrkas logotyp överst (om du har laddat upp en)

:::tip
Generera besked tidigt i januari, medan uppgifterna är färska. Då har du tid att åtgärda eventuella problem innan beskeden skickas ut.
:::

## Steg 5: Distribuera till givare

Se till att beskeden når dina givare.

1. Skriv ut och posta besked, eller maila de enskilda CSV-filerna till givarna
2. Medlemmar kan också se sin egen gåvohistorik och skriva ut besked på [B1.church eller i B1 App](../../b1-church/giving/donation-history.md)

## Du är klar!

Dina årsrapporter för gåvor är klara. Givarna har sina skattemässigt avdragsgilla besked, och din ekonomiska redovisning för året är slutförd.

## Relaterade artiklar

- [Stripe Import](../donations/stripe-import.md) — importera onlinetransaktioner
- [Donation Reports](../donations/donation-reports.md) — visa givartrender och summor
- [Funds](../donations/funds.md) — hantera fonder och inställningar för skatteavdrag
- [Giving Statements](../donations/giving-statements.md) — generera årsbesked
- [Recording Donations](../donations/recording-donations.md) — registrera kontant- och checkdonationer manuellt
- [Donationshistorik (webb)](../../b1-church/giving/donation-history.md) — medlemmarnas självbetjäningsvy
- [Guide: Konfigurera onlinegåvor](./online-giving.md) — första konfigurationen av Stripe och gåvor online

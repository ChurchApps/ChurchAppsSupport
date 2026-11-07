---
title: "Guide: Skapa årsrapporter för gåvor"
description: "Slutför årets gåvoregister i B1 Admin, kontrollera skatteinställningarna för fonderna och skapa avdragsgilla gåvobesked för varje givare."
---

# Skapa årsrapporter för gåvor

<div class="article-intro">

Gå igenom årsslutsprocessen: slutför dina gåvoregistreringar, kontrollera fondinställningarna och skapa skattemässigt avdragsgilla gåvobesked för varje givare. Detta görs vanligtvis i början av januari för föregående kalenderår.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett B1 Admin-konto med ekonomiåtkomst
- Gåvor som registrerats under året (online via Stripe och/eller inmatade manuellt)
- Åtkomst till ditt Stripe-konto om du tar emot onlinegåvor

</div>

## Steg 1: Importera de sista Stripe-transaktionerna

Se till att alla onlinegåvor från slutet av året finns i ditt system.

Följ guiden [Stripe Import](../donations/stripe-import.md) för att:

1. Gå till Donations > Stripe Import
2. Välj ett datumintervall som täcker slutet av året (t.ex. 1 december - 31 december)
3. Klicka på Preview först för att granska, och sedan på Import Missing för att slutföra

:::warning
Kör den här importen innan du skapar besked. Transaktioner som du inte har importerat visas inte på givarnas besked.
:::

## Steg 2: Granska gåvorapporterna

Kontrollera att dina uppgifter är korrekta innan du skapar besked.

Följ guiden [Donation Reports](../donations/donation-reports.md) för att:

1. Kontrollera sammanfattningssidan för gåvor för hela året
2. Granska summorna per fond och jämför dem med dina bankutdrag för att upptäcka eventuella avvikelser
3. Klicka in på enskilda batcher för att kontrollera uppgifter per givare vid behov

## Steg 3: Kontrollera fondernas skattestatus

Se till att varje fonds inställning för skattemässigt avdrag är korrekt så att beskeden blir rätt.

Följ guiden [Funds](../donations/funds.md) för att:

1. Öppna varje fond och bekräfta att inställningen för skattemässigt avdrag är korrekt

:::info
Endast gåvor till fonder som är markerade som skattemässigt avdragsgilla visas på gåvobesked. Om en fond bör vara skattemässigt avdragsgill men inte är markerad så, uppdatera den innan du skapar besked.
:::

## Steg 4: Skapa gåvobesked

Skapa de officiella gåvobeskeden för dina givare.

Följ guiden [Giving Statements](../donations/giving-statements.md) för att:

1. Gå till **Donations > Giving Statements**
2. Välj året i rullgardinsmenyn och granska sammanfattningsstatistiken
3. Välj hur du vill ladda ner:
   - **Download ZIP**: separata CSV-filer, en per givare
   - **Print All**: utskriftsvänlig vy med varje besked på en egen sida, med din kyrkas logotyp överst (om du har laddat upp en)

:::tip
Skapa beskeden tidigt i januari medan uppgifterna är färska. Då har du tid att åtgärda eventuella problem innan du skickar dem.
:::

## Steg 5: Distribuera till givarna

Se till att beskeden når dina givare.

1. Skriv ut och skicka beskeden med post, eller skicka individuella CSV-filer till givarna via e-post
2. Medlemmar kan också se sin egen gävohistorik och skriva ut besked från [B1.church](../../b1-church/giving/donation-history.md) och [B1 Mobile-appen](../../b1-mobile/giving/donation-history.md)

## Klart!

Dina årsrapporter för gåvor är klara. Givarna har sina skattemässigt avdragsgilla besked, och dina ekonomiska uppgifter är slutförda för året.

## Relaterade artiklar

- [Stripe Import](../donations/stripe-import.md): importera onlinetransaktioner
- [Donation Reports](../donations/donation-reports.md): visa gåvotrender och summor
- [Funds](../donations/funds.md): hantera fonder och inställningar för skattemässigt avdrag
- [Giving Statements](../donations/giving-statements.md): skapa årsbesked
- [Recording Donations](../donations/recording-donations.md): registrera kontant- och checkgåvor manuellt
- [Donation History (Web)](../../b1-church/giving/donation-history.md): självbetjäningsvy för medlemmar
- [Set Up Online Giving Guide](./online-giving.md): första installationen av Stripe och onlinegåvor

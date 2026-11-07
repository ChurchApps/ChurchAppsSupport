---
title: "Guide: Ställ in onlinegivande"
---

# Ställ in onlinegivande

<div class="article-intro">

Gå igenom allt du behöver för att ta emot onlinedonationer i din församling, från att skapa donationsfonder till att koppla Stripe för betalningshantering och dela givarsidan med din församling. När du är klar kan medlemmarna ge online via din webbplats och mobilapp.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett B1 Admin-konto med administratörsbehörighet, se [Roller och behörigheter](../people/roles-permissions.md)
- Ett Stripe-konto (skapa ett gratis på [stripe.com](https://stripe.com) om du inte har något)

</div>

## Steg 1: Skapa donationsfonder

Fonder är de kategorier som givare kan ge till. Du behöver minst en fond innan du kan ta emot donationer.

Följ guiden [Fonder](../donations/funds.md) för att skapa dina givarkategorier:

1. Skapa de fonder som används mest, till exempel "Allmän fond", "Byggfond" och "Missionsfond"
2. Markera skattemässigt avdragsgilla fonder på rätt sätt, eftersom detta påverkar årsbesked för gåvor

:::tip
Du kan lägga till fler fonder när som helst. Börja med de givarkategorier som används mest.
:::

## Steg 2: Anslut Stripe

Stripe hanterar all betalningshantering. Du kopplar ditt Stripe-konto till B1 Admin så att donationer hamnar på ditt bankkonto.

Följ guiden [Konfigurera onlinegivande](../donations/online-giving-setup.md) för att ansluta Stripe:

1. Logga in på din Stripe-instrumentpanel och hämta din publicerbara nyckel (Publishable Key) och hemliga nyckel (Secret Key)
2. Gå till Inställningar i B1 Admin och ange båda nycklarna

:::warning
Stripe visar din hemliga nyckel bara en gång. Kopiera och spara den innan du lämnar Stripe-instrumentpanelen. Om du tappar bort den behöver du skapa en ny.
:::

## Steg 3: Lägg till en givarsida på din webbplats

Gör det enkelt att ge genom att lägga till en donationssida på din B1-webbplats.

Följ guiderna [Konfigurera onlinegivande](../donations/online-giving-setup.md) och [Hantera sidor](../website/managing-pages.md) för att:

1. Lägga till en flik "Donera" på din B1.church-webbplats
2. Din givar-URL blir: `https://dinsubdomän.b1.church/donate`
3. Medlemmar kan ge utan att logga in (offentlig sida), eller logga in för att spara betalningsmetoder och se sin donationshistorik

## Steg 4: Gör en testdonation

Innan du meddelar din församling bör du kontrollera att allt fungerar.

1. Gör en liten testdonation för att kontrollera att flödet fungerar från början till slut
2. Kontrollera att donationen visas i B1 Admin under Donationer

:::tip
Använd Stripes testläge först om du vill kontrollera utan riktiga betalningar. Byt sedan till liveläge innan du meddelar din församling.
:::

## Steg 5: Meddela din församling

Sprid budskapet så att medlemmarna vet att de kan ge online.

1. Dela givar-URL:en via din webbplats, e-postnyhetsbrev, programblad och sociala medier
2. Medlemmar kan också ge via [B1 Mobile-appen](../../b1-mobile/giving/). Funktionen för givande finns redan inbyggd.

:::info
Medlemmar som loggar in kan spara betalningsmetoder, ställa in återkommande donationer och se sin givarhistorik. Anonymt givande fungerar också, utan att man behöver logga in.
:::

## Steg 6: Löpande förvaltning

Håll dina donationsregister uppdaterade och skapa rapporter under hela året.

1. [Importera Stripe-transaktioner](../donations/stripe-import.md) regelbundet (varje vecka eller månad) för att hålla dina register aktuella
2. [Visa donationsrapporter](../donations/donation-reports.md) för att följa givartrender och summor per fond
3. [Skapa årsbesked för gåvor](../donations/giving-statements.md) till dina givare för deras skatteredovisning

:::tip
Kör Stripe-importer minst en gång i månaden så att dina register hålls uppdaterade. Se [Guide för årsrapporter](./year-end-reports.md) för hela årsavslutningsprocessen.
:::

## Klart!

Din församling tar nu emot onlinedonationer. Medlemmar kan ge via din webbplats, B1 Mobile-appen eller vilken enhet som helst med en webbläsare. Alla donationer registreras automatiskt i B1 Admin.

## Relaterade artiklar

- [Fonder](../donations/funds.md): skapa och hantera donationskategorier
- [Batcher](../donations/batches.md): organisera donationer i grupper
- [Registrera donationer](../donations/recording-donations.md): manuellt registrera kontant- och checkdonationer
- [Stripe-import](../donations/stripe-import.md): hämta onlinetransaktioner till B1 Admin
- [Donationsrapporter](../donations/donation-reports.md): visa givartrender och summor
- [Årsbesked för gåvor](../donations/giving-statements.md): skapa årsbesked för skatteändamål
- [Ge donationer (webb)](../../b1-church/giving/making-donations.md): givarupplevelsen för medlemmar
- [Ge donationer (mobil)](../../b1-mobile/giving/making-donations.md): ge via mobilappen

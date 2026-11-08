---
title: "Guide: Konfigurera onlinegivande"
description: "Konfigurera onlinegivande i B1 Admin genom att skapa gåvofonder, ansluta Stripe och lägga till en Ge-sida på din B1.church-webbplats för medlemmar."
---

# Konfigurera onlinegivande

<div class="article-intro">

Gå igenom allt som behövs för att ta emot onlinegåvor i din kyrka, från att skapa gåvofonder till att ansluta Stripe för betalningshantering och dela givandesidan med din församling. När du är klar kan medlemmarna ge online via din webbplats och mobilapp.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- B1 Admin-konto med administratörsbehörighet – se [Roller och behörigheter](../people/roles-permissions.md)
- Ett Stripe-konto (skapa ett gratis på [stripe.com](https://stripe.com) om du inte har något)

</div>

## Steg 1: Skapa gåvofonder

Fonder är de kategorier som givare kan ge till. Du behöver minst en fond innan du kan ta emot gåvor.

Följ guiden [Fonder](../donations/funds.md) för att skapa dina givandekategorier:

1. Skapa dina vanligaste fonder (t.ex. "Allmänna fonden", "Byggfonden", "Mission")
2. Markera skattemässigt avdragsgilla fonder på rätt sätt – detta påverkar årsvisa gåvobesked

:::tip
Du kan lägga till fler fonder när som helst. Börja med dina vanligaste givandekategorier.
:::

## Steg 2: Anslut Stripe

Stripe sköter all betalningshantering. Du kopplar ditt Stripe-konto till B1 Admin så att gåvor går direkt till ditt bankkonto.

Följ guiden [Konfigurera onlinegivande](../donations/online-giving-setup.md) för att ansluta Stripe:

1. Logga in på din Stripe-instrumentpanel och hämta din publicerbara nyckel (Publishable Key) och hemliga nyckel (Secret Key)
2. Gå till Inställningar i B1 Admin och ange båda nycklarna

:::warning
Stripe visar din hemliga nyckel (Secret Key) endast en gång. Kopiera och spara den innan du lämnar Stripe-instrumentpanelen. Om du tappar bort den behöver du skapa en ny.
:::

## Steg 3: Lägg till en givandesida på din webbplats

Gör det enkelt för medlemmarna att ge genom att lägga till en gåvosida på din B1-webbplats.

Följ guiderna [Konfigurera onlinegivande](../donations/online-giving-setup.md) och [Hantera sidor](../website/managing-pages.md) för att:

1. Lägga till en flik "Ge" på din B1.church-webbplats
2. Din givande-webbadress blir: `https://dinsubdomän.b1.church/donate`
3. Medlemmar kan ge utan att logga in (offentlig sida) eller logga in för att använda sparade betalningsmetoder och se sin gåvohistorik

## Steg 4: Gör en testgåva

Innan du meddelar din församling, kontrollera att allt fungerar.

1. Gör en liten testgåva för att kontrollera att flödet fungerar från början till slut
2. Kontrollera att gåvan visas i B1 Admin under Gåvor

:::tip
Använd Stripes testläge först om du vill kontrollera utan verkliga debiteringar, och växla sedan till livelläge innan du meddelar din församling.
:::

## Steg 5: Meddela din församling

Sprid informationen så att medlemmarna vet att de kan ge online.

1. Dela givande-webbadressen via din webbplats, e-postnyhetsbrev, programblad och sociala medier
2. Medlemmar kan även ge via [B1-appen](../../b1-church/giving/index.md) – funktionen för gåvor är inbyggd

:::info
Medlemmar som loggar in kan spara betalningsmetoder, ställa in återkommande gåvor och se sin gåvohistorik. Anonyma gåvor fungerar också – ingen inloggning krävs.
:::

## Steg 6: Löpande förvaltning

Håll dina gåvoregister uppdaterade och skapa rapporter under hela året.

1. [Importera Stripe-transaktioner](../donations/stripe-import.md) regelbundet (varje vecka eller varje månad) för att hålla dina register uppdaterade
2. [Visa gåvorapporter](../donations/donation-reports.md) för att följa givandetrender och summor per fond
3. [Skapa årsvisa gåvobesked](../donations/giving-statements.md) för dina givares skatteredovisning

:::tip
Kör Stripe-importer minst en gång i månaden så att dina register hålls uppdaterade. Se [Guiden för årsrapporter](./year-end-reports.md) för hela årsavslutningsprocessen.
:::

## Klart!

Din kyrka tar nu emot onlinegåvor. Medlemmar kan ge via din webbplats, B1-appen eller valfri enhet med en webbläsare. Alla gåvor spåras automatiskt i B1 Admin.

## Relaterade artiklar

- [Fonder](../donations/funds.md) – skapa och hantera givandekategorier
- [Batcher](../donations/batches.md) – organisera gåvor i grupper
- [Registrera gåvor](../donations/recording-donations.md) – registrera kontant- och checkgåvor manuellt
- [Stripe-import](../donations/stripe-import.md) – hämta onlinetransaktioner till B1 Admin
- [Gåvorapporter](../donations/donation-reports.md) – visa givandetrender och summor
- [Gåvobesked](../donations/giving-statements.md) – skapa årsvisa skatteunderlag
- [Ge gåvor](../../b1-church/giving/making-donations.md) – medlemmarnas upplevelse av att ge på B1.church och i B1-appen

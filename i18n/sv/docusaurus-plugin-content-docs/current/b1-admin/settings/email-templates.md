---
title: "E-postmallar"
---

# E-postmallar

<div class="article-intro">

E-postmallar låter dig spara återanvändbart e-postinnehåll -- ett välkomstmeddelande, en påminnelse om en händelse, ett tack för en gåva -- så att du (eller ett [arbetsflöde](../serving/workflows.md)) kan skicka det med ett klick i stället för att skriva det från grunden varje gång. Samma lista innehåller även mallar för sms som används i fönstren för textmeddelanden till grupper och personer.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver åtkomst till inställningsområdet i B1 Admin.

</div>

## Öppna e-postmallar

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster) och expanderar **Inställningar**.
2. Klicka på **E-postmallar**.
3. Du ser en lista över befintliga mallar med deras ämne, kategori och datum för senaste ändring.

## Skapa en mall

1. Klicka på **Ny mall**.
2. Ange ett **Mallnamn** för att identifiera mallen i listan och välj en **Kategori** (Allmänt, Händelser, Grupper, Gåvor, Välkomst eller Text) för att hjälpa till att ordna dina mallar. Välj **Text** om du i stället vill skapa en mall för textmeddelanden (se [Textmallar](#text-templates) nedan).
3. Ange **ämnesraden**.
4. Skriv **brödtexten** med den formaterade textredigeraren.
5. Klicka på **Spara**.

## Sammanfogningsfält

Klicka på en knapp för ett sammanfogningsfält ovanför ämnesraden eller brödtexten för att infoga fältet vid markören -- klicka först i texten där du vill ha fältet och klicka sedan på knappen. Markören står kvar på sin plats, så du kan fortsätta skriva direkt efter det infogade fältet. Om du klickar på en knapp för brödtexten utan att först klicka i brödtexten läggs fältet till i slutet av brödtexten. När e-posten skickas ersätts varje sammanfogningsfält med mottagarens faktiska uppgifter:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Mottagarens namn
- `{{email}}` -- Mottagarens e-postadress
- `{{churchName}}` -- Din församlings namn

## Textmallar

En mall i kategorin **Text** är ett enkelt textmeddelande avsett för sms i stället för e-post:

- Den har ingen ämnesrad. Den formaterade textredigeraren ersätts av en enkel ruta för **Textmeddelande** som rymmer upp till 1 600 tecken.
- Knapparna för sammanfogningsfält ovanför rutan infogar `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` eller `{{churchName}}` vid markören.
- Textmallar visas i väljaren **Ladda mall (valfritt)** i textfönstret för en [grupp](../groups/group-members.md#texting-group-members) eller en enskild person. När du väljer en mall fylls meddelandet i, och du kan fortfarande redigera det innan du skickar.
- De utelämnas från mallväljarna för e-post, inklusive åtgärden **Skicka e-post** i arbetsflöden.

Textmeddelanden kräver en ansluten [leverantör för textmeddelanden](./church-settings.md#texting).

## Förhandsgranska en mall

Klicka på **Förhandsgranska** för att se hur ämnesraden och brödtexten kommer att se ut med exempeldata ifylld i sammanfogningsfälten, innan du sparar eller skickar.

## Använda en mall

Sparade mallar kan väljas när du skriver ett e-postmeddelande till personer eller en grupp, och de kan användas som en åtgärd i [arbetsflöden](../serving/workflows.md). Innan din församling kan skicka dem behöver ChurchApps-teamet godkänna gruppe-e-post en gång. Se [Aktivera gruppe-e-post för din församling](../groups/group-members.md#turning-on-group-email-for-your-church).

## Redigera och ta bort

Klicka på ikonen **Redigera** bredvid en mall för att uppdatera den, eller på ikonen **Ta bort** för att ta bort den permanent.

## Nästa steg

- [Arbetsflöden](../serving/workflows.md) -- Utlös ett mallmeddelande automatiskt utifrån regler

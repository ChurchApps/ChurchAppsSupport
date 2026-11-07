---
title: "Digitalt skyltning"
description: "Skicka lektionsinnehåll till en TV i lobbyn eller korridoren i B1 Admin med en URL för digital skyltning som alltid visar aktuell plan, eller använd FreePlay TV."
---

# Digitalt skyltning

<div class="article-intro">

Skicka din lektionsinnehåll till en TV i foajén eller korridoren med ett flöde för digital skyltning. Varje planstyp får en flödes-URL som alltid visar den aktuella planens innehåll, så det finns inget att uppdatera från vecka till vecka. Om dina TV-apparater kör FreePlay kan du i stället schemalägga planstypen på dem i FreePlay Admin.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa en [planstyp](./plans.md) med [Lessons.church](../../b1-church/content/lessons.md) eller annat lektionsinnehåll schemalagt
- Ha ett konto hos [SignPresenter](https://www.signpresenter.com) och en enhet inställd för att visa det, eller en TV som kör [FreePlay](../../freeplay/index.md)

</div>

## Hämta flödes-URL:en

1. Gå till **Tjänster**, välj ministeriet som innehåller din planstyp och klicka på planstypen för att öppna den.
2. Klicka på **Digital skyltning** (TV-ikonen) överst på planstypens sida.
3. I dialogrutan **Flöde för digital skyltning** klickar du på kopieringsknappen bredvid **Flödes-URL**.

:::info
Flödes-URL:en är kopplad till planstypen, inte till en enskild plan. Den följer automatiskt den plan som är schemalagd som aktuell för planstypen, så du behöver bara ställa in den en gång.
:::

## Ansluta till SignPresenter

Flödet är utformat för att fungera med [SignPresenter](https://www.signpresenter.com), en tredjeparts app för digital skyltning. Klistra in den kopierade URL:en i SignPresenter som ett externt flöde för att visa ditt aktuella lektionsinnehåll på en ansluten skärm.

En steg-för-steg-guide för installationen i SignPresenter finns i [SignPresenters guide för Lessons.church](https://support.signpresenter.com/topics/lessons-dot-church.html). Dialogrutan länkar också till dessa instruktioner.

## Använda FreePlay-TV-apparater i stället

Om dina skärmar kör [FreePlay](../../freeplay/index.md) behöver du inte flödes-URL:en. Dialogrutan **Flöde för digital skyltning** länkar till **admin.freeplay.church/calendar**, där du kan schemalägga den här planstypen på dina FreePlay-TV-apparater:

1. Klicka på länken **admin.freeplay.church/calendar** i dialogrutan. FreePlay Admin använder samma inloggning som B1 Admin.
2. Välj skärmgruppen för dina TV-apparater och klicka på **Lägg till schema**.
3. Under **Spela upp** väljer du din planstyp under **Tjänsteplaner**. Den är markerad med **(aktuell plan)**.
4. Ange dagar och tider och klicka sedan på **Spara**.

TV-apparaterna spelar varje vecka upp den plan som är aktuell för planstypen, vid de tider du har angett. Detta fungerar även med Go Curriculum-lektioner, inklusive planer du har anpassat. FreePlay loggar in med det Go Curriculum-konto som är kopplat till ministeriet under **Innehållsleverantörer** (se [Schemalägga lektioner](./scheduling-lessons.md)), eller med kyrkans Go Curriculum-koppling om ministeriet saknar en. Se [Schemalägga kalendern](../../freeplay/scheduled-mode/scheduling-the-calendar.md) för alla alternativ och [Para ihop en skärm](../../freeplay/scheduled-mode/pairing-a-screen.md) för att lägga till en TV.

:::note
Flödes-URL:en innehåller inte Go Curriculum-media, eftersom det innehållet kräver kyrkans Go Curriculum-inloggning. För att visa en Go Curriculum-lektion på en TV i foajén eller ett klassrum använder du FreePlay.
:::

## Nästa steg

- Hantera planerna som matar den här digitala skylten på sidan [Planer](./plans.md)
- Schemalägg innehåll med [Lessons.church](./scheduling-lessons.md)
- Lägg FreePlay-TV-apparater på en kalender med [Schemalagt läge](../../freeplay/scheduled-mode/index.md)

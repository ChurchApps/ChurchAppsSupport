---
title: "Live Streaming"
---

# Live Streaming

<div class="article-intro">

Sidan Live Stream Times låter dig konfigurera din kyrkas streamingschema, hantera gudstjänsttider och anpassa tittarupplevelsen. Ställ in återkommande veckogudstjänster eller engångsevenemang, konfigurera chatt- och videoinställningar och styr när din stream går live.

</div>

## Utbildningsvideo

<YouTube id="tpEY-sEYW6A" title="Så här ställer du in livestreaming i B1" next="Anpassa din kyrkas medlemsapp i B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörigheten **contentApi.streamingServices.edit**. Se [Roller och behörigheter](../settings/roles-permissions.md) om du saknar åtkomst.
- Ha ditt YouTube-kanal-ID redo om du planerar att använda automatisk livestreaming
- Lägg till minst en [predikan](managing-sermons) eller en permanent live-URL som källa för din stream

</div>

Livestreaming hanteras från två sidor i avsnittet **Sermons** i Jump-menyn: **Live Stream Times** för att hantera ditt livestreamingschema och **Settings** för att konfigurera flikarna på din streamingsida.

## Hantera gudstjänster

### Lägga till en gudstjänst

1. I B1 Admin öppnar du [Jump-menyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), expanderar **Sermons** och klickar på **Live Stream Times**.
2. Klicka på knappen **Add Service** överst på sidan för att skapa en ny schemalagd gudstjänst. Befintliga gudstjänster visas i en tabell som visar varje gudstjänsts namn, tid, leverantör och längd. Klicka på redigeringsikonen på en rad för att ändra den.
3. Ange ett **Service Name** (till exempel "Söndagsmorgon").
4. Ange **Service Time** – välj den dag och tid då din gudstjänst börjar.
5. Ställ in **Recurs Weekly** på **Yes** för regelbundna veckogudstjänster, eller **No** för ett engångsevenemang.

### Konfigurera chatt- och videoinställningar

6. Under **Chat Settings** anger du hur många minuter före och efter gudstjänsten chatten ska vara aktiverad. Detta gör att besökare kan börja chatta innan gudstjänsten börjar och fortsätta efteråt.
7. Under **Video Settings** anger du hur tidigt videoströmmen ska starta för nedräkning eller innehåll före gudstjänsten. Chatten öppnas så många minuter *före* den tidiga videon startar, så tiden som visas bredvid chattens inställning för minuter före räknar båda talen. Till exempel: en gudstjänst kl. 10:00 med 15 minuters chatt före och en tidig start på 5 minuter öppnar chatten kl. 9:40.
8. Välj vilken predikan som ska spelas upp i listrutan:
   - **Latest Sermon** – Spelar automatiskt upp den video som senast lades till.
   - **Current Live Service** – Spelar upp din aktuella livesändning från YouTube med hjälp av ditt kanal-ID.
   - Du kan också välja någon specifik predikan som du redan har sparat.
9. Klicka på **Save** för att schemalägga din gudstjänst.

:::info
Din gudstjänst uppdateras automatiskt varje vecka om den är inställd som återkommande. Den behåller samma lokala tid när sommartid börjar eller slutar. Du kan lägga till så många gudstjänster som du behöver. Besökare ser nästa schemalagda gudstjänsttid när de besöker din streamingsida.
:::

## Inställningar för streamingsidan

För att anpassa flikarna och länkarna som visas bredvid din livestream, öppna Jump-menyn, expandera **Sermons** och klicka på **Settings**. Sidan **Stream Settings** visar din lista över **Content Tabs**.

### Lägga till flikar

1. Klicka på knappen **Add** för att lägga till en ny flik på din livestreamsida.
2. Välj en **Link Type**: **External URL** för en egen länk, eller en av de färdigdesignade flikarna **Chat** eller **Prayer**.
3. För chattfliken räcker det att ge den ett namn i rutan **Tab Text** så är konfigurationen klar.
4. För en länkad flik anger du flikens namn, väljer en ikon genom att klicka på ikonknappen och anger URL:en.
5. Dina konfigurerade flikar visas på livestreamsidan så att tittarna kan komma åt ytterligare resurser och interaktiva funktioner.

### Förhandsgranska din stream

På sidan **Live Stream Times** klickar du på **View Your Stream** överst på sidan för att se exakt hur din livestreamsida kommer att se ut för besökare, inklusive din logotyp, gudstjänsttider och konfigurerade flikar.

## Konfigurera din YouTube-livestream

Så här kopplar du din YouTube-kanal för automatisk livestreaming:

1. Gå till **Sermons** och klicka på **Add Sermon**, välj sedan **Add Permanent Live URL**.
2. Videoleverantören är som standard **Current YouTube Live Stream**. Ange ditt **YouTube Channel ID**.
3. Lägg till en titel och beskrivning och klicka sedan på **Save**.
4. Under **Live Stream Times** skapar du en gudstjänst och väljer din permanenta live-URL i listrutan för predikan.

:::tip
För att hitta ditt YouTube-kanal-ID går du till din YouTube-kanals avancerade inställningar och kopierar värdet för Channel ID.
:::

## Anpassa färger och logotyp

Din livestreamsida använder inställningarna för [Appearance](../website/appearance) på din webbplats:

- Den **ljusa accentfärgen** med mörk text används för sidhuvudet.
- Den **mörka accentfärgen** med ljus text används för sidofältet.
- Din **Light Background Logo** visas på streamingsidan. Använd en bild med transparent bakgrund och bildförhållandet 4:1.

För att ändra dessa går du till **Website** och sedan **Appearance** och uppdaterar dina inställningar för [Color Palette](../website/appearance#color-palette) och [Logo](../website/appearance#logo-and-branding).

## Lägga till streamingvärdar

För att ge teammedlemmar åtkomst till värdchatten som bara är till för värdar, vid sidan av den publika chatten:

1. I Jump-menyn väljer du **Settings > Roles**.
2. Klicka på plusknappen och välj **Add Custom Role**.
3. Ge rollen namnet "Streaming Host" och klicka på **Save**.
4. Klicka på den nya rollen och klicka sedan på **Add** i avsnittet Members för att lägga till personer.
5. Scrolla ner till **Edit Permissions**, expandera avsnittet **Content** och markera **Host Chat**.

När värdar loggar in på livestreamsidan visas en privat flik **Host Chat** bredvid den publika chatten för konversation enbart för personal under sändningen.

:::info
För mer information om att skapa roller och hantera behörigheter, se [Roller och behörigheter](../settings/roles-permissions.md).
:::

## Felsökning

Om din automatiska YouTube-livestream inte visas korrekt när du använder alternativet "Current YouTube Live Stream" med ditt kanal-ID, prova följande:

**Symptom:**
- Livestreamens inbäddning visar "Video unavailable"
- Sidan laddas men ingen video visas
- Direkta YouTube-inbäddningar fungerar, men den automatiska kanalens livestream gör det inte

**Lösning:**
Kontrollera din YouTube-kanal för gamla eller kommande schemalagda livestreamar och ta bort dem:

1. Gå till YouTube Studio.
2. Navigera till **Content** och sedan **Live**.
3. Leta efter gamla schemalagda live-sändningar eller kommande schemalagda streamar.
4. Ta bort dessa gamla eller schemalagda livestreamposter.
5. Testa din livestreamsida igen.

:::warning
YouTubes automatiska inbäddning av kanalens livestream kan blockeras när det finns flera schemalagda eller tidigare livestreamposter i din kanal. Om du tar bort dem kan YouTube identifiera och visa din aktuella livestream på rätt sätt.
:::

**Ytterligare krav:**
- Din livestream måste vara inställd på **Public** (inte Unlisted eller Private).
- Inbäddning måste vara tillåten i dina YouTube-inställningar för streaming.
- Kontrollera att du använder leverantören **Current YouTube Live Stream** (med Channel ID), inte leverantören **YouTube** (med Video ID).

## Nästa steg

- [Hantera predikningar](managing-sermons) -- Lägg till predikningar i ditt bibliotek
- [Spellistor](playlists) -- Organisera predikningar i serier

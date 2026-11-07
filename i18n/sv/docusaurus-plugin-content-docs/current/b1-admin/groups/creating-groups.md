---
title: "Skapa grupper"
---

# Skapa grupper

<div class="article-intro">

Att skapa en grupp i B1 Admin är enkelt. Du väljer en kategori, ger gruppen ett namn och konfigurerar sedan dess inställningar. Grupper hjälper dig att organisera din församling i meningsfulla enheter, till exempel smågrupper, kommittéer och klasser.

</div>

## Instruktionsvideo

<YouTube id="uG93pXVreNo" title="Skapa grupper och lägga till medlemmar i B1" next="Gruppförfrågningar och gruppkalendrar i B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver ett aktivt B1 Admin-konto med behörighet att hantera grupper. Se [Roller och behörigheter](../people/roles-permissions.md) om du är osäker på vilken åtkomstnivå du har.
- Bestäm en kategoristruktur för dina grupper (till exempel "Smågrupper", "Verksamheter", "Kommittéer"). Kategorier hjälper dig att hålla ihop relaterade grupper.

</div>

## Lägga till en ny grupp

1. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster i B1 Admin), expandera **People** och klicka på **Groups**.
2. Klicka på **Add Group** i sidhuvudet. Ett formulär för **New Group** öppnas under listan. Ange ett **Category Name**. Kategorier hjälper dig att organisera relaterade grupper tillsammans (till exempel "Smågrupper", "Verksamheter" eller "Kommittéer"). Om en kategori redan finns kan du välja den från listan.
3. Ange gruppens **Name**.
4. Klicka på **Add**. Din nya grupp visas i listan, med sin kategori angiven under namnet.

## Konfigurera gruppinställningar

När gruppen har skapats kan du fylla i ytterligare uppgifter:

1. Klicka på **gruppens namn** i listan för att öppna den.
2. Klicka på knappen **Edit** till vänster på gruppsidan, under gruppens uppgifter.
3. Konfigurera följande alternativ:
   - **Description** -- En kort sammanfattning av vad gruppen handlar om. Detta är synligt för medlemmarna.
   - **Meeting Times** -- När gruppen vanligtvis träffas (till exempel "Onsdagar kl. 19.00").
   - **Join Policy** -- Välj vem som kan gå med i gruppen:
     - **Open** -- Vem som helst kan gå med direkt, utan godkännande
     - **Request** -- Personer måste skicka en anslutningsförfrågan som kräver godkännande (se [Gruppförfrågningar](./group-join-requests.md))
     - **Closed** -- Medlemmar måste läggas till manuellt av ledare eller administratörer
   - **Labels** -- Tilldela en eller flera beskrivande etiketter till gruppen (till exempel "På plats", "Online", "Nya medlemmar välkomna"). Etiketter är fria taggar som du definierar; markera alla som passar. Etiketter kan användas för att filtrera grupper i webbelementet Groups Browser.
   - **Confidential group** -- Dölj denna grupp och dess medlemsförteckning från offentliga sidor, gruppsökaren och icke-medlemmar. Använd detta för känsliga grupper, till exempel återhämtnings- eller rådgivningsverksamhet; endast gruppens medlemmar och församlingens personal kan se den.
   - **Discussions** -- Slår på eller av gruppens chattflöde, där vilken medlem som helst kan skriva. Påslaget som standard.
   - **Announcements** -- Slår på ett andra chattflöde som endast ledare kan skriva i -- medlemmar kan läsa och reagera, men endast ledare kan publicera. Påslaget som standard.
   - **Attendance Tracking** -- Aktivera detta om du vill registrera [närvaro](../attendance/tracking-attendance.md) för denna grupp.
   - **Service Times** -- Koppla gruppen till specifika gudstjänsttider i församlingen, om tillämpligt. Se [Närvarouppsättning](../attendance/setup.md) för mer information om gudstjänsttider.
4. Klicka på **Save** för att spara dina ändringar.

:::tip
En tydlig beskrivning och mötestid hjälper medlemmarna att veta vad de kan förvänta sig när de går med i en grupp.
:::

:::info
Om du stänger av både Discussions och Announcements tas fliken Messages bort från gruppen helt i medlemsportalen. Om du stänger av endast ett alternativ döljs bara dess flik; medlemmarna flyttas till det flöde som fortfarande är på. Befintliga meddelanden behålls i båda fallen -- reglagen styr endast nya inlägg.
:::

## Duplicera en grupp

Startar du en ny omgång av en återkommande klass eller verksamhet? I stället för att ange alla inställningar på nytt kan du duplicera en befintlig grupp:

1. Öppna gruppen och klicka på **Duplicate** (under knappen **Edit** till vänster på gruppsidan).
2. Bekräfta dupliceringen.

Kopian tar över originalgruppens inställningar -- kategori, beskrivning, mötestid/plats, anslutningspolicy, etiketter och campus -- men **inte** dess medlemmar. Den nya gruppen får originalets namn med " (Copy)" tillagt; byt namn på den i gruppinställningarna.

## Arkivera en grupp

När en grupp inte längre är aktiv men du vill behålla dess historik i stället för att radera den:

1. Öppna gruppen och klicka på **Edit** för att redigera dess inställningar.
2. Klicka på **Archive** och bekräfta.

Arkiverade grupper försvinner från den huvudsakliga grupplistan. För att hitta en igen klickar du på knappen **Show archived** bredvid kategoknapparna överst på sidan Groups och klickar sedan på **Restore** bredvid gruppen för att återställa den.

:::info
Att arkivera en grupp raderar inte dess medlemmar, närvarohistorik eller kalenderhändelser -- den döljer bara gruppen från standardlistan tills du återställer den.
:::

## Nästa steg

När du har skapat och konfigurerat din grupp är du redo att:

- **Lägga till medlemmar** -- Sök efter personer och lägg till dem i gruppen. Använd stjärnikonen (**Make Leader**) för att utse gruppledare. Se [Gruppmedlemmar](./group-members.md).
- **Skapa en kalender** -- Skapa händelser och återkommande möten för gruppen. Se [Gruppkalender](./group-calendar.md).
- **Kommunicera** -- Skicka meddelanden direkt till alla gruppens medlemmar från gruppsidan.
- **Exportera data** -- Klicka på **Export** ovanför gruppens medlemslista för att ladda ner den.

:::info
Varje grupp tillhör en kategori, och på huvudsidan Groups kan du filtrera listan efter kategori. Du kan när som helst ändra ordning på eller byta namn på kategorier när din församling växer.
:::

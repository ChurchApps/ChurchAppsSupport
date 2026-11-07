---
title: "Gruppmedlemmar"
---

# Gruppmedlemmar

<div class="article-intro">

När du har skapat en grupp är nästa steg att lägga till medlemmar. Från gruppens detaljsida kan du söka efter personer, lägga till dem i gruppen, utse ledare, skicka meddelanden och exportera medlemslistan. Att hantera gruppmedlemskap är viktigt för att samordna smågrupper, kommittéer och klasser.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver minst en grupp upplagd i B1 Admin. Se [Skapa grupper](creating-groups.md) om du inte har skapat någon grupp ännu.
- Personerna du vill lägga till bör redan finnas i din [personkatalog](../people/adding-people.md). Om någon inte finns där kan du skapa personen från medlemssökningen (se nedan).

</div>

## Lägga till medlemmar i en grupp

1. I [hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) väljer du **Personer > Grupper** och klickar på gruppen du vill hantera.
2. I avsnittet **Medlemmar** på gruppsidan klickar du på **Alla medlemmar**. (Team och ministerier öppnas direkt till medlemslistan.)
3. I rutan **Lägg till person** under medlemslistan skriver du namnet på personen du vill lägga till och trycker på **Enter** eller klickar på sökikonen.
4. Klicka på personens namn, eller på lägg till-ikonen bredvid det, i sökresultaten.
5. Personen visas nu i gruppens medlemslista.

:::tip
Innan du skriver något visar rutan **Lägg till person** en kort lista över **Senaste personer** som du kan lägga till med ett klick.
:::

När du är klar klickar du på länken **Tillbaka till** med gruppens namn för att återgå till gruppsidan. Gruppsidan visar en sammanfattning av gruppens **Medlemmar**, **Sessioner**, **Kalender** och **Hälsa**, var och en med en länk till den fullständiga vyn. Om du är en av gruppens ledare visas även **Ledarnoteringar** (se [Ledarnoteringar](#leader-notes) nedan). När formulär är kopplade till gruppen visas även ett avsnitt för **Kopplade formulär** (se [Kopplade formulär](#linked-forms) nedan).

### Lägga till någon som inte finns i B1 ännu

Om din sökning inte hittar någon visar sökningen **Inga poster hittades** med en länk till **Lägg till ny person**. Klicka på den, ange personens förnamn, efternamn och (valfritt) e-postadress och klicka på **Lägg till**. Den nya personen skapas i din personkatalog och läggs till i gruppen i ett enda steg. Du behöver inte söka efter personen igen.

## Utse gruppledare {#designating-group-leaders}

Gruppledare har särskilda behörigheter. De kan redigera [gruppkalendern](group-calendar.md), hantera händelser och hjälpa till att samordna gruppen.

1. I gruppens medlemslista hittar du personen du vill göra till ledare.
2. Klicka på **stjärnikonen** (**Gör till ledare**) bredvid personens namn.
3. Personen är nu utsedd till gruppledare och visar ett **Ledare**-märke.

Om du vill ta bort ledarstatusen klickar du på stjärnikonen (**Ta bort ledarbehörighet**) igen.

:::info
Alla gruppmedlemmar kan se gruppkalendern och händelserna, men bara ledare kan lägga till eller redigera kalenderhändelser.
:::

## Kopplade formulär {#linked-forms}

När ett fristående formulär [kopplas till gruppen](../forms/creating-forms.md#linking-a-form-to-a-group) visar gruppsidan ett avsnitt för **Kopplade formulär** med varje formulärs namn, om det är **Öppet** eller **Stängt**, och hur många formulär som är kopplade. Avsnittet visas bara för gruppens ledare och för personer som kan administrera formulär, och bara när minst ett formulär är kopplat. Administratörer för formulär kan klicka på ett formulärs namn för att öppna det, eller klicka på **Alla formulär** för att gå till sidan Formulär.

Gruppledare läser och skriver ut svaren på dessa formulär från gruppens sida på [B1.church](../../b1-church/groups/group-details.md#linked-forms).

## Ledarnoteringar {#leader-notes}

Gruppledare kan föra privata anteckningar om gruppen, till exempel uppföljningar, bönebehov eller pastorala frågor, som resten av gruppen aldrig ser.

Avsnittet **Ledarnoteringar** visas på gruppsidan endast för personer som är ledare för just den gruppen. Det visar den senaste noteringen, vem som skrev den och när, samt hur många noteringar det finns.

1. På gruppsidan klickar du på **Alla noteringar** i avsnittet **Ledarnoteringar**.
2. Skriv din notering i rutan och publicera den. Noteringarna visas med författarens namn och foto samt datum och tid för när varje notering publicerades.
3. Klicka på länken **Tillbaka till** med gruppens namn för att återgå till gruppsidan.

:::info
Ledarnoteringar syns bara för gruppens ledare. Andra medlemmar kan inte se dem, och inte heller personal eller administratörer, inte ens med full behörighet, om de inte också är ledare för gruppen. Om du vill ge någon annan åtkomst kan du [göra personen till ledare](#designating-group-leaders). Ledare ser även dessa noteringar i avsnittet **Ledarnoteringar** på gruppsidan på [B1.church](../../b1-church/groups/group-details.md#leader-notes) och under fliken **Grupper** på sidan [Noteringar](../people/notes.md) i B1 Admin.
:::

## Skicka meddelanden till gruppmedlemmar

Du kan kommunicera med alla medlemmar i en grupp direkt från B1 Admin:

1. I gruppens medlemslista klickar du på ikonen **Skicka ett meddelande till medlemmar** ovanför listan.
2. Skriv ditt meddelande i textrutan (eller välj ett från **Mallar**).
3. Klicka på **Skicka**.

Ditt meddelande levereras till alla medlemmar i gruppen.

## Skicka e-post till gruppmedlemmar

Du kan skicka formaterade e-postmeddelanden till alla medlemmar i en grupp:

1. Från gruppens detaljsida klickar du på knappen **E-post** till vänster på sidan.
2. Dialogrutan Skicka e-post öppnas och visar hur många medlemmar som kommer att få e-postmeddelandet och hur många som inte har någon e-postadress registrerad.
3. Välj eventuellt en **e-postmall** i listrutan, eller skriv ett meddelande från början. Klicka på **Hantera mallar** för att skapa eller redigera mallar.
4. Ange en **ämnesrad**. Du kan infoga fält för personuppgifter genom att klicka på fältbrickorna: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}` och **Gruppnamn** (`{{groupName}}`), som fylls i med gruppens namn.
5. Skriv **e-postmeddelandet** i HTML-editorn. Samma fält för personuppgifter finns också här.
6. Klicka på **Skicka**.
7. En sammanfattning visar hur många e-postmeddelanden som skickades och hur många medlemmar som hoppades över (ingen e-postadress registrerad).

:::tip
Skapa återanvändbara e-postmallar för återkommande kommunikation, som veckouppdateringar, händelseannonser eller bönebegäran. Mallar sparar tid och säkerställer ett enhetligt budskap.
:::

### Aktivera gruppe-post för din församling {#turning-on-group-email-for-your-church}

Alla församlingar på B1 skickar e-post från samma adress och delar därför ett gemensamt avsändaryrykte. För att hålla allas e-post borta från skräppostmappar granskar ChurchApps-teamet varje församling en gång innan den kan skicka gruppe-post.

Om din församling ännu inte har granskats visar dialogrutan Skicka e-post **Gruppe-post behöver en snabb granskning** i stället för meddelandeeditorn:

1. Klicka på **Begär granskning**. ChurchApps supportteam får ett meddelande.
2. Dialogrutan ändras till **Granskning begärd**. Du kan stänga den.
3. Gruppe-post aktiveras vanligtvis inom en arbetsdag. Öppna dialogrutan Skicka e-post igen efter det för att skicka ditt meddelande.

Innan din församling godkänns skickar B1 inte heller [uppföljningsmejl från formulär](../forms/creating-forms.md#sending-a-follow-up-email) eller steget **Skicka e-post** i [arbetsflöden](../serving/workflows.md).

:::info Gränser för utskick
Efter godkännande kan en församling skicka upp till 150 e-postmeddelanden per dag som församlingen själv har skrivit. Gränsen ökar i takt med att församlingen bygger upp en ren avsändarhistorik, upp till 2 000 per dag. Om nyligen skickade meddelanden har studsat eller markerats som skräppost pausas gruppe-posten, och dialogrutan ber dig kontakta supporten. Om ett utskick skulle överskrida din dagliga gräns skickar B1 inte meddelandet och visar ett felmeddelande.
:::

## Skicka sms till gruppmedlemmar

När din församling har kopplat en [sms-leverantör](../settings/church-settings.md#texting) visas en knapp **SMS** (**Skicka sms till gruppen**) bredvid knappen **E-post** på gruppsidan.

1. Från gruppens detaljsida klickar du på **SMS**.
2. Dialogrutan visar hur många medlemmar som får sms:et. Medlemmar utan registrerat mobilnummer eller som har tackat nej hoppas över.
3. Välj eventuellt ett sparat sms från **Läs in mall (valfritt)** för att fylla i meddelandet. Väljaren visas när din församling har [sms-mallar](../settings/email-templates.md#text-templates). Personer som kan redigera inställningar ser också en länk till **Hantera mallar**.
4. Skriv eller redigera ditt meddelande. För att anpassa det klickar du på en platshållarbricka under meddelanderutan, **Förnamn**, **Efternamn**, **Visningsnamn**, **Församlingens namn** eller **Gruppnamn**, för att infoga den vid markören. Varje platshållare fylls i med mottagarens egna uppgifter när sms:et skickas. **Gruppnamn** blir gruppens namn.
5. Klicka på **Skicka**.

Mer information finns under [Anpassa sms med fält för personuppgifter](../settings/church-settings.md#personalizing-texts-with-merge-fields).

## Exportera gruppdata

Så här laddar du ner gruppens medlemslista som en fil:

1. I gruppens medlemslista klickar du på **Exportera** ovanför listan.
2. En CSV-fil med gruppens medlemsuppgifter laddas ner till din dator.

En CSV-export är användbar för att importera data i andra verktyg eller för att spara offline-register. Fler exportalternativ finns under [Exportera data](../people/exporting-data.md).

## Skriva ut medlemslistan

I gruppens medlemslista klickar du på ikonen **Skriv ut närvarolista** (skrivare) ovanför listan och väljer en layout. Sidan öppnas i en ny flik och din webbläsares utskriftsdialog visas automatiskt.

- **Närvarolista** – en odaterad klasslista med rutorna **Närvarande** och **Frånvarande** som lärare kan markera för hand. Se [Skriva ut en närvarolista](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Kontaktlista** – en kontaktlista för gruppen, daterad idag och med din församlings logotyp överst (**logotypen för ljus bakgrund** från [Webbplats > Utseende](../website/appearance.md), om du har laddat upp en), följd av församlingens namn och gruppens namn. Varje medlem har en rad med **Namn**, **Telefon**, **E-post** och **Adress**. Ledare listas först och markeras med **Ledare**, följt av alla andra i efternamnsordning. Telefonnumret som visas är medlemmens mobilnummer, eller hem- eller arbetsnumret om det inte finns något mobilnummer. Kontaktuppgifter lämnas tomma för dem som har tackat nej.

:::warning
En kontaktlista innehåller medlemmarnas personliga kontaktuppgifter. Dela utskrifter endast med gruppens ledare och andra som behöver dem.
:::

## Skicka pushnotiser till gruppmedlemmar

Du kan skicka en pushnotis direkt till alla gruppmedlemmar som har B1.church-appen installerad på sin enhet och har pushnotiser aktiverade.

1. Från gruppens detaljsida klickar du på **Meddela** (under knapparna **E-post** och **SMS**. Knappen **SMS** visas när en [sms-leverantör](../settings/church-settings.md#texting) har kopplats).
2. En dialogruta öppnas och visar hur många av gruppens medlemmar som har pushnotiser aktiverade.
3. Fyll i uppgifterna för notisen:
   - **Rubrik** *(obligatoriskt)* – En kort sammanfattning, högst 80 tecken.
   - **Meddelande** *(obligatoriskt)* – Notisens text, högst 240 tecken.
   - **Länk eller flygblads-URL som öppnas** *(valfritt)* – En relativ sökväg i appen (till exempel `/mobile/groups`) eller en fullständig `https://`-URL som öppnas när notisen trycks på.
   - **Bild-URL** *(valfritt)* – En `https://`-URL till en bild som visas tillsammans med notisen på enheter som stöder det.
4. En livefÖrhandsvisning visar hur notisen kommer att se ut på enheten.
5. Klicka på **Skicka notis**.

:::info
Pushnotiser levereras endast till gruppmedlemmar som har B1.church-PWA:n installerad och inte har inaktiverat pushnotiser. Medlemmar utan registrerad pushenhet eller med pushnotiser avstängda räknas som överhoppade, och sammanfattningen efter utskicket visar hur många som nåddes respektive hoppades över.
:::

:::tip
Efter utskicket visar dialogrutan hur många notiser som lades i kön. Om de flesta medlemmar visas som överhoppade kan du påminna dem om att besöka din B1.church-webbplats, installera den som en app på startskärmen och tillåta notiser när de uppmanas till det.
:::

## Ta bort medlemmar

Om du vill ta bort någon från en grupp letar du upp personens namn i medlemslistan och klickar på knappen **ta bort** bredvid personens post.

:::info
Om du tar bort en person från en grupp raderas hen inte från din församlings katalog. Personen finns kvar i avsnittet [Personer](../people/adding-people.md) och kan läggas till i gruppen igen när som helst.
:::

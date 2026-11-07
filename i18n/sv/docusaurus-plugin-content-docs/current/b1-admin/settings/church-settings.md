---
title: "Kyrkoinställningar"
---

# Kyrkoinställningar

<div class="article-intro">

Sidan Kyrkoinställningar är där du konfigurerar din kyrkas grundläggande information, kontaktuppgifter och grafiska profil. Uppgifterna används i alla ChurchApps-verktyg, inklusive din B1.church-webbplats och appen B1 Mobile.

</div>

## Utbildningsvideo

<YouTube id="634zSbzDkYA" title="Ställa in kyrkinformation och grafisk profil i B1" next="Roller, behörigheter och att bjuda in ditt team i B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörigheten ”Redigera kyrkinställningar”. Se [Roller och behörigheter](./roles-permissions.md) om du saknar åtkomst.
- Ha kyrkans adress, kontaktuppgifter och logotyp redo

</div>

## Redigera din kyrkinformation

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet uppe till vänster), expanderar **Inställningar** och klickar på **Inställningar**.
2. I avsnittet **Kyrkinformation** (överst på sidan) klickar du på **Redigera**.
3. Uppdatera något av följande fält:
   - **Kyrkans namn** -- Namnet som visas i alla ChurchApps-produkter.
   - **Adress** -- Kyrkans fysiska adress.
   - **Kontaktinformation** -- Telefonnummer, e-post och andra kontaktuppgifter.
   - **Tidszon** -- Kyrkans tidszon. Se [Tidszon](#time-zone) nedan.
4. Klicka på **Spara** för att tillämpa ändringarna.

## Ställa in din underdomän

Din kyrka får en kostnadsfri underdomän på **dinkyrka.1.church**. Det här är webbadressen där medlemmar och besökare kan nå kyrkans närvaro på nätet.

1. På sidan Inställningar klickar du på **Redigera** i avsnittet **Kyrkinformation** och hittar fältet **Underdomän**.
2. Ange önskad underdomän (till exempel ”gracechurch” för gracechurch.1.church).
3. Spara ändringarna.

:::info
Din underdomän måste vara unik bland alla ChurchApps-kyrkor. Om önskat namn redan är taget kan du lägga till din stad eller region (till exempel ”gracechurch-dallas”).
:::

Om du vill att besökare ska nå din webbplats på en egen domän (till exempel **`www.gracechurch.org`**), se [Anpassad domän](./custom-domain.md).

## Konfigurera grafisk profil

Anpassa hur din kyrka visas i alla ChurchApps-verktyg:

1. Ladda upp din **kyrkologotyp** genom att klicka på logotypområdet och välja en bildfil.
2. Lägg till ytterligare **kyrkbilder** som används på din webbplats och i [mobilappen](./mobile-app.md).

:::tip
För bästa resultat använder du en logotyp med transparent bakgrund i PNG-format. Då ser den bra ut mot både ljusa och mörka bakgrunder.
:::

## Första veckodag

Välj vilken dag dina kalendrar ska börja på. Rullistan **Första veckodag** i avsnittet Kyrkinformation står som standard på **Söndag**, men kan ställas in på vilken dag som helst. När du ändrat den används den i kalenderrutnäten i B1 Admin och på B1.churchs medlemsportal. Gruppkalendrar, kuraterade kalendrar och händelseredigeraren visar alla veckor som börjar på den dag du väljer.

## Tidszon

Rullistan **Tidszon** i avsnittet **Kyrkinformation** anger kyrkans tidszon (till exempel *America/Chicago*). Välj **Ingen** för att lämna fältet tomt. När du har sparat visas zonen i sammanfattningen av kyrkinformationen.

B1 använder den här tidszonen för tider som gäller hela kyrkan, till exempel påminnelser om händelser och schemana på dina [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-TV-apparater. [Incheckningsscheman](../attendance/setup.md#setting-a-check-in-schedule) mäts i tidszonen för gudstjänstens [campus](./campuses.md) först, och kyrkans tidszon används bara om campus saknar en egen. Om alla dina campus ligger i samma tidszon ställer du in den både för kyrkan och för varje campus.

## Region (datum- och telefonformat)

Inställningen **Region** styr hur datum och tider skrivs i hela B1. Som standard används det amerikanska datumformatet (till exempel ”Sep 28, 2026” och ”9/28/2026”). Kyrkor utanför USA kan byta till sitt eget format. Om du till exempel väljer engelska (Storbritannien) visas i stället ”28 Sept 2026” och ”28/09/2026”.

1. På sidan Inställningar klickar du på **Region** i den vänstra listan och sedan på **Redigera** i avsnittet **Region**.
2. Välj din region i rullistan **Region**. Varje alternativ visar ett exempeldatum så att du ser exakt hur datumen kommer att se ut.
3. Klicka på **Spara**.

Avsnittet Region visar sedan din valda region, ett exempel på **datumformatet** och ditt format för **telefonnummer**.

### Format för telefonnummer

Samma avsnitt Region har en inställning för **Telefonnummer** som styr hur telefonnummer anges i en persons profil:

- **Internationellt (med landskod)** -- standardvalet. Telefonfälten visar en flagg-väljare för land och sparar numren med landskod (till exempel +1 918 555 1234).
- **Lokalt (som det skrivs)** -- telefonfälten blir vanliga textrutor och sparar numren exakt som du skriver dem, utan att någon landskod läggs till (till exempel 0701 234 5678). Välj det här om din kyrka skriver nummer i ett lokalt format och inte vill att B1 lägger till en landskod.

När **Lokalt** är valt visar avsnittet Region även texten ”Lokala telefonnummer” bredvid din region.

:::tip
SMS fungerar bäst när numren innehåller landskod. Om du skickar SMS från B1 bör du behålla formatet **Internationellt** eller se till att nummer som du skriver i läget Lokalt innehåller landskod.
:::

Din region gäller datum och tider i B1 Admin och på din B1.church-webbplats och medlemsportal, inklusive predikningar, blogginlägg, gruppkalendrar och tjänstplaneringar. Då ser medlemmarna datum i samma format som personalen.

## Text (SMS) {#texting}

Anslut en leverantör av SMS för att skicka textmeddelanden till en person eller till en hel grupp från B1 Admin. Meddelandena skickas via ditt eget konto hos leverantören, så leverantörens priser och gränser gäller.

1. På sidan Inställningar klickar du på **Text** i den vänstra listan och sedan på **Redigera** i avsnittet **Text**.
2. Välj en **leverantör**:
   - **Clearstream** -- ange en **API-nyckel**. Skapa en nyckel under API Keys i dina Clearstream-kontoinställningar.
   - **Text In Church** -- ange en **API-nyckel**. Begär först API-åtkomst för utvecklare från Text In Churchs support och skapa sedan en nyckel i avsnittet Developer API under Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- ange auktoriseringsnyckeln från ditt Nalo Solutions-konto som **API-nyckel**, samt ett **Avsändar-ID** (högst 11 tecken) som Nalo har godkänt för dig.
   - **Twilio** -- använd kyrkans egna Twilio-konto. Twilio fakturerar dig direkt. Kopiera **Account SID** och **Auth Token** från [Twilio Console](https://console.twilio.com) och ange ett **Från-nummer**, det vill säga ett Twilio-telefonnummer som är registrerat för A2P 10DLC, i formatet `+15551234567`. Efter att du sparat klistrar du in webhook-adressen för inkommande meddelanden (se nedan) i fältet **A message comes in** för numret i Twilio, så att STOP-svar också registreras i B1.
3. Klicka på **Spara**.

För att sluta skicka SMS ställer du in **Leverantör** på **Ingen** och sparar. Då tas den sparade leverantören bort.

### Avregistrera personer som svarar STOP

När en leverantör har sparats öppnar du avsnittet Text igen med **Redigera**. Under leverantörsinställningarna visas ett skrivskyddat fält, **webhook-adress för inkommande STOP**, med en webbadress som är unik för din kyrka. Klicka i fältet för att markera adressen, kopiera den och klistra in den i leverantörens inställning för inkommande meddelanden (svar) som webhook. Det fungerar med alla leverantörer ovan som kan vidarebefordra inkommande svar till en webhook.

Därefter, när någon svarar **STOP** (eller STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT eller REVOKE) på ett av dina meddelanden, letar B1 upp alla vars mobilnummer matchar, markerar dem som avregistrerade och stänger av deras textpåminnelser. De hoppas sedan över vid gruppmeddelanden. Andra svar ignoreras.

:::info
Detta använder samma avregistreringsinställning som **Dölj mig från medlemskatalogen**. Personer som svarar STOP visas därför också som **Dold från katalogen** i sin profil. Fältet visas bara när den sparade leverantören är vald. Om du byter till en annan leverantör i rullistan måste du spara först för att se webbadressen igen.
:::

När en leverantör är ansluten ser personal med behörighet att skicka texter en knapp **Text** på en grupps sida (**Skicka text till gruppen**) och på en persons sida om personen har ett mobilnummer (**Skicka textmeddelande**). Skriv ditt meddelande och klicka på **Skicka**. Dialogrutan räknar tecken och SMS-segment. För en grupp visas hur många medlemmar som får meddelandet innan du skickar:

- Medlemmar utan registrerat mobilnummer hoppas över.
- Medlemmar som valt **Dölj mig från medlemskatalogen** räknas som avregistrerade och hoppas över.
- Familjemedlemmar som delar ett mobilnummer får meddelandet bara en gång.

### Personifiera texter med fält {#personalizing-texts-with-merge-fields}

Under meddelanderutan visar dialogrutan Text platshållarknappar: **Förnamn**, **Efternamn**, **Visningsnamn** och **Kyrkans namn**. Klicka på en knapp för att infoga motsvarande platshållare (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) där markören står. När meddelandet skickas ersätts varje platshållare med mottagarens uppgifter. Ett gruppmeddelande som `Hej {{firstName}}, vi ses på söndag!` når alltså varje medlem med deras eget namn. Platshållare fungerar både för gruppmeddelanden och för meddelanden till en enskild person. Meddelanden till en grupp har dessutom knappen **Gruppnamn** (`{{groupName}}`), som ersätts med gruppens namn.

Vill du återanvända ett meddelande sparar du det som en [textmall](./email-templates.md#text-templates) (en e-postmall i kategorin **Text**) och väljer den under **Läs in mall (valfritt)** överst i textfönstret.

:::info
Gränsen på 1 600 tecken gäller meddelandet så som du skriver det. När platshållarna har fyllts i kapas all text som är längre än 1 600 tecken vid den gränsen.
:::

Texter kan också skickas automatiskt från ett steg i ett [arbetsflöde](../serving/workflows.md#sending-a-text) med åtgärden **Skicka text**. Den använder samma leverantör och samma platshållare.

## Fillagring

Som standard använder de filer du laddar upp till din webbplats (via [Filer](../website/files.md)) och andra innehållsområden B1:s kostnadsfria värdlagring, upp till 100 MB. Om du behöver mer utrymme kan du i stället ansluta egen molnlagring. Nya uppladdningar går då direkt till ditt konto utan någon gräns från plattformen.

1. På sidan Inställningar klickar du på **Fillagring** i den vänstra listan och sedan på **Redigera** i avsnittet **Fillagring**.
2. Välj en leverantör: **Google Drive**, **Dropbox**, **OneDrive** eller en **S3-kompatibel bucket** (AWS S3, Cloudflare R2, Backblaze B2 med flera).
3. För Google Drive, Dropbox eller OneDrive klickar du på **Anslut** och loggar in för att godkänna åtkomsten. För en S3-kompatibel bucket anger du din åtkomstnyckel, hemlighet, bucketnamn och bas-URL för offentlig åtkomst.
4. Klicka på **Spara**.

:::info
Detta påverkar bara nya uppladdningar till filerna på din webbplats och liknande innehållsområden. Galleribilder, miniatyrer, logotyper och personbilder ligger alltid kvar i B1:s standardlagring.
:::

## Årskursuppflyttning

Om du registrerar **årskurs** för barn och elever kan B1 flytta alla upp en årskurs automatiskt ett datum du väljer (till exempel 1 augusti), så att du inte behöver redigera varje profil för hand.

1. På sidan Inställningar klickar du på **Årskursuppflyttning** i den vänstra listan och sedan på **Redigera** i avsnittet **Årskursuppflyttning**.
2. Slå på reglaget (det visar **Aktiverad**) och välj **månad** och **dag** för när årskurserna ska flyttas upp varje år. Då flyttas alla med en årskurs upp ett steg, och elever i årskurs 12 får statusen **Examinerad**.
3. Spara ändringarna.

För att stoppa den automatiska uppflyttningen slår du av reglaget så att det visar **Inaktiverad** och sparar. Datumet för uppflyttning tas bort, och årskurserna ändras inte längre av sig själva.

## Anmälan till volontärtjänst {#volunteer-signup}

Som standard visar medlemmar som tittar på [anmälan till volontärtjänst](../../b1-church/serving/volunteer-signup.md) alla kommande veckor som har lediga platser. Om listan blir lång kan du i stället visa bara nästa vecka för varje typ av planering.

1. På sidan Inställningar klickar du på **Anmälan till volontärtjänst** i den vänstra listan och sedan på **Redigera** i avsnittet **Anmälan till volontärtjänst**.
2. Slå på **Visa bara nästa vecka för varje typ av planering**.
3. Spara ändringarna.

När detta är på visar varje typ av planering bara sin nästa kommande planering. Nästa vecka visas när datumet har passerats. Raden **Visade veckor** i avsnittet visar antingen **Bara nästa vecka för varje typ av planering** eller **Alla kommande veckor**.

## Integritet för gåvor {#giving-privacy}

Personer med åtkomst till gåvor ser normalt en persons totalsummor för gåvor på deras [personpost](../people/adding-people.md#editing-details). Om du hellre inte vill ha beloppen synliga varje gång en post öppnas kan du dölja dem tills någon begär att se dem.

1. På sidan Inställningar klickar du på **Integritet för gåvor** i den vänstra listan och sedan på **Redigera** i avsnittet **Integritet för gåvor**.
2. Slå på **Dölj gåvor på personposter tills de klickas på**.
3. Spara ändringarna.

När detta är på står det på gåvokortet på en personpost: ”Gåvor är dolda på personposter.” Klicka på **Visa gåvor** för att läsa in och visa personens gåvor. De döljs igen när du öppnar en annan person. Vem som kan se gåvor ändras inte: bara personer med åtkomst till gåvor ser kortet.

## Import och export

Länken **Import/Export** under kyrkans namn på sidan Inställningar öppnar ett särskilt verktyg i ett nytt webbläsarfönster. Använd det för att:

- Importera medlemsuppgifter från ett annat system för kyrkoadministration.
- Exportera dina ChurchApps-uppgifter för säkerhetskopiering eller migrering.

Det här är särskilt användbart när du precis ställer in din kyrka och behöver överföra befintliga register till ChurchApps.

:::warning
Innan du importerar data ska du alltid säkerhetskopiera dina befintliga register. Importer lägger till data i systemet och kan skapa dubbletter om de körs flera gånger.
:::

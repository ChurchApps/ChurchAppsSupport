---
title: "Kyrkans inställningar"
description: "Ställ in namn, adress, subdomän, tidszon, regionformat, sms-leverantör och fillagring för din kyrka på sidan Kyrkans inställningar i B1 Admin."
---

# Kyrkans inställningar

<div class="article-intro">

Sidan Kyrkans inställningar är där du konfigurerar din kyrkas grundläggande information, kontaktuppgifter och grafiska profil. Dessa uppgifter används i alla ChurchApps-verktyg, inklusive din B1.church-webbplats och B1 App.

</div>

## Instruktionsvideo

<YouTube id="634zSbzDkYA" title="Så ställer du in kyrkans information och varumärke i B1" next="Roller, behörigheter och att bjuda in ditt team i B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörigheten ”Redigera kyrkans inställningar”. Se [Roller och behörigheter](./roles-permissions.md) om du saknar åtkomst.
- Ha din kyrkas adress, kontaktuppgifter och logotyp redo

</div>

## Redigera kyrkans information

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet högst upp till vänster), expanderar **Inställningar** och klickar på **Inställningar**.
2. I avsnittet **Kyrkoinformation** (överst på sidan) klickar du på **Redigera**.
3. Uppdatera något av följande fält:
   - **Kyrkans namn** -- Namnet som visas i alla ChurchApps-produkter.
   - **Adress** -- Din kyrkas fysiska adress.
   - **Kontaktuppgifter** -- Telefonnummer, e-postadress och andra kontaktuppgifter.
   - **Tidszon** -- Din kyrkas tidszon. Se [Tidszon](#time-zone) nedan.
4. Klicka på **Spara** för att tillämpa ändringarna.

## Ställa in din subdomän

Din kyrka får en kostnadsfri subdomän på **dinkyrka.1.church**. Det är webbadressen där medlemmar och besökare kan nå din kyrkas närvaro på nätet.

1. På sidan Inställningar klickar du på **Redigera** i avsnittet **Kyrkoinformation** och hittar fältet **Subdomän**.
2. Ange din önskade subdomän (till exempel ”gracechurch” för gracechurch.1.church).
3. Spara ändringarna.

:::info
Din subdomän måste vara unik bland alla ChurchApps-kyrkor. Om det önskade namnet redan är taget kan du prova att lägga till din stad eller region (till exempel ”gracechurch-dallas”).
:::

Om du vill att besökare ska nå din webbplats på din egen domän (till exempel **`www.gracechurch.org`**) se [Egen domän](./custom-domain.md).

## Anpassa varumärket

Anpassa hur din kyrka visas i alla ChurchApps-verktyg:

1. Ladda upp din **kyrkologotyp** genom att klicka på logotypområdet och välja en bildfil.
2. Lägg till eventuella ytterligare **kyrkbilder** som används på din webbplats och i [mobilappen](./mobile-app.md).

:::tip
För bästa resultat använder du en logotyp med transparent bakgrund i PNG-format. Då ser den bra ut mot både ljusa och mörka bakgrunder.
:::

## Första dagen i veckan

Välj vilken dag dina kalendrar ska börja på. Rullistan **Första dagen i veckan** i avsnittet Kyrkoinformation är inställd på **söndag** som standard, men kan ändras till vilken dag som helst. När du ändrat den används den i kalenderrutnäten i B1 Admin och i medlemsportalen på B1.church. Gruppkalendrar, kuraterade kalendrar och händelseredigeraren visar alla veckor som börjar på den dag du väljer.

## Tidszon

Rullistan **Tidszon** i avsnittet **Kyrkoinformation** anger din kyrkas tidszon (till exempel *America/Chicago*). Välj **Ingen** för att lämna fältet tomt. När du sparat visas zonen i sammanfattningen av kyrkoinformation.

B1 använder denna tidszon för kyrkogemensamma tider, till exempel påminnelser om händelser och scheman på dina [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-TV-apparater. [Incheckningsscheman](../attendance/setup.md#setting-a-check-in-schedule) mäts först i tidszonen för gudstjänstens [campus](./campuses.md), och kyrkans tidszon används endast om campuset inte har någon. Om alla dina campus ligger i samma tidszon kan du ange den både för kyrkan och för varje campus.

## Region (datum- och telefonformat)

Inställningen **Region** styr hur datum och tider skrivs i hela B1. Som standard används det amerikanska datumformatet (till exempel ”Sep 28, 2026” och ”9/28/2026”). Kyrkor utanför USA kan byta till sitt eget format. Om du väljer engelska (Storbritannien) visas i stället ”28 Sept 2026” och ”28/09/2026”, till exempel.

1. På sidan Inställningar klickar du på **Region** i den vänstra listan och sedan på **Redigera** i avsnittet **Region**.
2. Välj din region i rullistan **Region**. Varje alternativ visar ett exempeldatum, så att du ser exakt hur datum kommer att se ut.
3. Klicka på **Spara**.

Avsnittet Region visar sedan din valda region, ett exempel på **datumformatet** och ditt format för **telefonnummer**.

### Format för telefonnummer

Samma avsnitt Region innehåller inställningen **Telefonnummer** som styr hur telefonnummer anges på en persons profil:

- **Internationellt (med landskod)** -- standardvärdet. Telefonfälten visar en flaggväljare för land och sparar numren med landskod (till exempel +1 918 555 1234).
- **Lokalt (som skrivet)** -- telefonfälten blir vanliga textfält och sparar numren exakt som du skriver dem, utan att någon landskod läggs till (till exempel 0701 234 5678). Välj detta om din kyrka skriver nummer i ett lokalt format och inte vill att B1 lägger till en landskod.

När **Lokalt** är valt visar avsnittet Region även ”Lokala telefonnummer” bredvid din region.

:::tip
Sms fungerar bäst när numren innehåller landskod. Om du skickar sms från B1 behåller du formatet **Internationellt**, eller ser till att nummer som du skriver i lokalt läge innehåller landskod.
:::

Din region gäller datum och tider i hela B1 Admin och på din B1.church-webbplats och i medlemsportalen, inklusive predikningar, blogginlägg, gruppkalendrar och tjänstplaneringar. Då ser medlemmarna datum i samma format som din personal.

## Sms {#texting}

Anslut en sms-leverantör för att skicka sms till en person eller en hel grupp från B1 Admin. Sms skickas via ditt eget konto hos leverantören, så leverantörens priser och gränser gäller.

1. På sidan Inställningar klickar du på **Sms** i den vänstra listan och sedan på **Redigera** i avsnittet **Sms**.
2. Välj en **leverantör**:
   - **Clearstream** -- ange en **API-nyckel**. Skapa en under API Keys i dina kontoinställningar hos Clearstream.
   - **Text In Church** -- ange en **API-nyckel**. Be först Text In Church Support om åtkomst till deras utvecklar-API, och skapa sedan en nyckel i avsnittet Developer API under Account Settings.
   - **Nalo Solutions** (Ghana) -- ange auktoriseringsnyckeln från ditt Nalo Solutions-konto som **API-nyckel**, samt ett **avsändar-ID** (högst 11 tecken) som Nalo har godkänt för dig.
   - **Twilio** -- använd kyrkans egna Twilio-konto. Twilio fakturerar dig direkt. Kopiera **Account SID** och **Auth Token** från [Twilio Console](https://console.twilio.com) och ange ett **Från-nummer** -- ett Twilio-telefonnummer registrerat för A2P 10DLC, i formatet `+15551234567`. Efter att du sparat klistrar du in webhook-URL:en för inkommande meddelanden (se nedan) i numrets webhook **A message comes in** i Twilio, så att STOP-svar också registreras i B1.
3. Klicka på **Spara**.

För att sluta skicka sms ställer du **Leverantör** på **Ingen** och sparar. Då tas den sparade leverantören bort.

### Avregistrera personer som svarar STOP

När en leverantör har sparats öppnar du sms-avsnittet igen med **Redigera**. Under leverantörsinställningarna visar ett skrivskyddat fält **webhook-URL för inkommande STOP** en webbadress som är unik för din kyrka. Klicka i fältet för att markera adressen, kopiera den och klistra in den i din sms-leverantörs inställning för inkommande meddelanden (svar). Det fungerar med alla leverantörer ovan som kan vidarebefordra inkommande svar till en webhook.

Därefter, när någon svarar **STOP** (eller STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT eller REVOKE) på ett av dina sms, hittar B1 alla vars mobilnummer matchar, markerar dem som avregistrerade och stänger av deras sms-påminnelser. De hoppas sedan över vid gruppsms. Andra svar ignoreras.

:::info
Detta använder samma avregistreringsinställning som **Dölj mig från medlemskatalogen**, så personer som svarar STOP visas också som **Dold från katalogen** på sin profil. Fältet visas endast när den sparade leverantören är vald. Om du byter till en annan leverantör i rullistan måste du spara först för att se URL:en igen.
:::

När en leverantör är ansluten ser personal med behörighet att skicka sms en knapp **Sms** på sidan för en grupp (**Skicka sms till gruppen**) och för en person med mobiltelefon (**Skicka sms**). Skriv ditt meddelande och klicka på **Skicka**. Dialogrutan räknar tecken och sms-segment. För en grupp visas hur många medlemmar som får meddelandet innan du skickar:

- Medlemmar utan mobilnummer i registret hoppas över.
- Medlemmar som valt **Dölj mig från medlemskatalogen** räknas som avregistrerade och hoppas över.
- Familjemedlemmar som delar ett mobilnummer får sms bara en gång.

### Anpassa sms med platshållare {#personalizing-texts-with-merge-fields}

Under meddelanderutan visar sms-dialogen platshållarbrickor: **Förnamn**, **Efternamn**, **Visningsnamn** och **Kyrkans namn**. Klicka på en bricka för att infoga dess platshållare (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` eller `{{churchName}}`) vid markören. När sms:et skickas ersätts varje platshållare med mottagarens uppgifter. Ett gruppsms som `Hej {{firstName}}, vi ses på söndag!` når alltså varje medlem med deras eget namn. Platshållare fungerar både för gruppsms och för sms till en enskild person. Sms till en grupp erbjuder också brickan **Gruppnamn** (`{{groupName}}`), som ersätts med gruppens namn.

För att återanvända ett meddelande sparar du det som en [sms-mall](./email-templates.md#text-templates) (en e-postmall i kategorin **Sms**) och väljer den under **Ladda mall (valfritt)** högst upp i sms-fönstret.

:::info
Gränsen på 1 600 tecken gäller meddelandet så som du skriver det. När platshållarna har fyllts i kapas all text som är längre än 1 600 tecken vid den gränsen.
:::

Sms kan också skickas automatiskt från ett [arbetsflöde](../serving/workflows.md#sending-a-text)-steg med åtgärden **Skicka sms**, som använder samma leverantör och platshållare.

## Fillagring

Som standard använder filer som du laddar upp till din webbplats (via [Filer](../website/files.md)) och andra innehållsområden B1:s kostnadsfria hostinglagring, upp till 100 MB. Om du behöver mer utrymme kan du i stället ansluta din egen molnlagring. Nya uppladdningar går då direkt till ditt konto utan plattformens gräns.

1. På sidan Inställningar klickar du på **Fillagring** i den vänstra listan och sedan på **Redigera** i avsnittet **Fillagring**.
2. Välj en leverantör: **Google Drive**, **Dropbox**, **OneDrive** eller en **S3-kompatibel bucket** (AWS S3, Cloudflare R2, Backblaze B2 med flera).
3. För Google Drive, Dropbox eller OneDrive klickar du på **Anslut** och loggar in för att godkänna åtkomst. För en S3-kompatibel bucket anger du din åtkomstnyckel, hemlighet, bucketnamn och bas-URL för publika länkar.
4. Klicka på **Spara**.

:::info
Detta påverkar endast nya uppladdningar till filerna på din webbplats och liknande innehållsområden. Galleribilder, miniatyrbilder, logotyper och personfoton ligger alltid kvar i B1:s standardlagring.
:::

## Årskursbefordran

Om du registrerar **årskurs** för barn och elever kan B1 automatiskt flytta upp alla ett steg på ett datum du väljer (till exempel 1 augusti), i stället för att du behöver redigera varje profil för hand.

1. På sidan Inställningar klickar du på **Årskursbefordran** i den vänstra listan och sedan på **Redigera** i avsnittet **Årskursbefordran**.
2. Slå på reglaget (det visar **Aktiverad**) och välj **månad** och **dag** för när årskurserna ska flyttas upp varje år. Då flyttas alla med en årskurs upp ett steg, och elever i årskurs 12 blir **Examinerade**.
3. Spara ändringarna.

För att sluta med automatisk befordran stänger du av reglaget så att det visar **Inaktiverad**, och sparar. Befordringsdatumet tas bort och årskurserna ändras inte längre av sig själva.

## Anmälan till volontärtjänst {#volunteer-signup}

Som standard ser medlemmar som bläddrar bland [volontäranmälningar](../../b1-church/serving/volunteer-signup.md) alla kommande veckor som har lediga platser. Om listan blir lång kan du i stället visa bara nästa vecka för varje planeringstyp.

1. På sidan Inställningar klickar du på **Anmälan till volontärtjänst** i den vänstra listan och sedan på **Redigera** i avsnittet **Anmälan till volontärtjänst**.
2. Slå på **Visa endast nästa vecka för varje planeringstyp**.
3. Spara ändringarna.

När detta är påslaget visar varje planeringstyp endast sin nästa kommande planering. Nästa vecka visas när det datumet har passerat. Raden **Visade veckor** i avsnittet visar antingen **Endast nästa vecka för varje planeringstyp** eller **Alla kommande veckor**.

## Integritet för gåvor {#giving-privacy}

Personer med åtkomst till gåvor ser normalt en persons totala gåvor på deras [personpost](../people/adding-people.md#editing-details). Om du hellre inte vill att beloppen visas varje gång en post öppnas kan du dölja dem tills någon begär det.

1. På sidan Inställningar klickar du på **Integritet för gåvor** i den vänstra listan och sedan på **Redigera** i avsnittet **Integritet för gåvor**.
2. Slå på **Dölj gåvor på personposter tills de klickas på**.
3. Spara ändringarna.

När detta är påslaget står det på gåvokortet på en personpost: ”Gåvor är dolda på personposter.” Klicka på **Visa gåvor** för att läsa in och visa personens gåvor. De döljs igen när du öppnar en annan person. Vem som kan se gåvor ändras inte: endast personer med åtkomst till gåvor ser kortet överhuvudtaget.

## Import och export

Länken **Import/Export** under din kyrkas namn på sidan Inställningar öppnar ett särskilt verktyg i ett nytt webbläsarfönster. Använd det för att:

- Importera medlemsdata från ett annat system för kyrkoadministration.
- Exportera dina ChurchApps-data för säkerhetskopiering eller migrering.

Detta är särskilt användbart när du först ställer in din kyrka och behöver överföra befintliga register till ChurchApps.

:::warning
Innan du importerar data ska du alltid säkerhetskopiera dina befintliga register. Importer lägger till data i ditt system och kan skapa dubbletter om de körs flera gånger.
:::

---
title: "Konfigurera självincheckning med B1 Checkin och B1 Admin"
sidebar_label: "Incheckning"
description: "Konfigurera självincheckning för gudstjänster med appen B1 Checkin i B1 Admin, inklusive enheter, kioskkonton, scheman, varumärkesanpassning och gästregistrering via QR-kod."
---

# Incheckning

<div class="article-intro">

B1 Admin stöder självincheckning vid gudstjänster via den kompletterande appen **B1 Checkin**. Medlemmar kan checka in sig själva och sina familjer vid kiosker eller dedikerade enheter när de kommer, vilket gör processen snabb och minskar arbetsbördan för dina volontärer. Varje incheckning registreras automatiskt som närvaro.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Dina campus, gudstjänsttider och grupper måste vara konfigurerade i [Närvaroinställningar](setup.md).
- Du behöver [personer i din databas](../people/adding-people.md) med [hushåll](../people/adding-people.md#managing-households) upplagda, så att familjer kan checka in tillsammans.
- Du behöver en surfplatta och eventuellt en Brother-etikettskrivare (se [maskinvarurekommendationer](#recommended-hardware) nedan).

</div>

## Så fungerar det

Appen B1 Checkin är kopplad till dina närvaroinställningar i B1 Admin. När en medlem checkar in registreras närvaron automatiskt på rätt campus, gudstjänsttid och grupp. Du behöver inte ange närvaro manuellt för någon som använder incheckningssystemet.

## Konfigurera incheckning

1. **Konfigurera först din närvarostruktur.** Gå i B1 Admin till **Personer > Närvaro** och klicka på **Inställningar** för att se till att dina campus, gudstjänsttider och grupper finns på plats. Incheckningsappen förlitar sig på denna konfiguration. Du kan även ge varje gudstjänsttid ett [incheckningsschema](setup.md#setting-a-check-in-schedule) så att incheckningen öppnas och stängs automatiskt varje vecka. Scheman använder tidszonen för gudstjänstens campus, eller din kyrkas tidszon om campuset saknar en inställd tidszon. Kiosken visar gudstjänsttider vars fönster är stängt som **Stängd** och talar om för familjer när incheckningen öppnar. Se [Närvaroinställningar](setup.md) för mer information.
2. **Installera appen B1 Checkin** på de enheter du planerar att använda. Appen finns för följande plattformar:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-surfplattor:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-surfplattor:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logga in i appen B1 Checkin** med ett konto som har behörigheten **Checkin** (eller **Redigera närvaro**). Se [Kioskkonton för incheckning](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Välj campus och gudstjänsttid** för den aktuella sammankomsten.
5. Medlemmar kan nu söka efter sitt namn på enheten och checka in.

:::tip
Placera incheckningsenheter på synliga och lättillgängliga platser, till exempel vid entréer i foajén eller vid välkomstdisken. En kort information under gudstjänsterna hjälper medlemmarna att veta att alternativet finns.
:::

:::tip
Om din kyrka har flera campus behöver du upprepa konfigurationen för varje campus i [Närvaroinställningar](setup.md). Varje incheckningsenhet kan konfigureras för ett annat campus.
:::

## Rekommenderad maskinvara

**Surfplattor** — någon av dessa fungerar bra med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Stor skärm:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Skrivare** — incheckning fungerar med Brother-etikettskrivare för att skriva ut namnbrickor:

- **Bäst:** Brother QL-1110NWB (stöder flera surfplattor via Bluetooth och WiFi)
- **Bra:** Brother QL-810W (stöder flera surfplattor via WiFi)
- **Budget:** Brother QL-1100 (endast WiFi)

**Etiketter:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Endast Brother-etikettskrivare är kompatibla med appen B1 Checkin. Andra skrivarmärken fungerar inte för att skriva ut namnbrickor.
:::

:::info
Följ din skrivares installationsanvisningar för att ansluta den till samma WiFi-nätverk som din surfplatta. Du hittar Brother-skrivardrivrutiner och installationsguider på [Brothers supportsida](https://support.brother.com).
:::

## Anpassa kioskens utseende

Du kan anpassa utseendet på appen B1 Checkin så att det matchar din kyrkas grafiska profil. Gå i B1 Admin till **Mobil > B1 CheckIn** och använd kortet **Kiosktema** för att konfigurera:

### Färger

Anpassa åtta färginställningar så att de matchar din kyrkas grafiska profil:

- **Primär** och **Primär kontrast** -- Huvudfärg för varumärket och dess textfärg.
- **Sekundär** och **Sekundär kontrast** -- Accentfärg och dess textfärg.
- **Bakgrund för sidhuvud** och **Bakgrund för underrubrik** -- Färger för kioskens sidhuvudsområden.
- **Knappbakgrund** och **Knapptext** -- Färger för interaktiva knappar.

### Bakgrundsbild

Ladda upp en valfri bakgrundsbild för kioskens välkomst- och sökskärmar. Rekommenderad storlek är 1920x1080 pixlar.

### Viloskärm / Skärmsläckare

Konfigurera en skärmsläckare som aktiveras efter en period av inaktivitet:

1. Slå viloskärmen **på** eller **av**.
2. Ange **tidsgränsen** (hur många sekunder av inaktivitet innan skärmsläckaren startar, lägst 10 sekunder).
3. Lägg till en eller flera **bildspel** -- varje bild har en bild och en visningstid (lägst 3 sekunder).

:::tip
Använd viloskärmen för att visa information, kommande evenemang eller välkomstmeddelanden när kiosken inte används aktivt.
:::

## Gästregistrering via QR-kod

Incheckningskiosken kan visa en QR-kod som besökare skannar för att registrera sig själva och sin familj i sin egen telefon. Detta snabbar upp incheckningen för förstagångsgäster.

När en gäst skannar QR-koden kommer hen till en [registreringssida för gäster](../../b1-church/checkin/guest-registration.md) där hen anger sin families namn och andra uppgifter som du väljer att fråga efter. En volontär kan sedan slå upp gästen på kiosken och checka in hen.

### Aktivera QR-gästregistrering

Så här slår du på visningen av QR-koden:

1. Öppna i B1 Admin [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet högst upp till vänster) och expandera **Mobil**.
2. Klicka på **B1 CheckIn**.
3. Slå på **QR-gästregistrering** och klicka på **Spara**.

:::note
Denna inställning finns under **Mobil > B1 CheckIn** (samma sida som kortet **Kiosktema**), inte under Närvaro. Åtgärden **Kiosk** på sidan Närvaro har en länk till denna sida.
:::

När reglaget är på visas alla alternativ nedan på kortet **QR-gästregistrering**. Klicka på **Spara** på kortet efter att du ändrat något av dem.

### Välja registreringsfält

Checklistan **Registreringsfält** styr vad registreringsformuläret frågar efter. **Förnamn** och **Efternamn** finns alltid med i formuläret och är alltid obligatoriska för varje familjemedlem. För varje annat fält slår du på **Inkludera** för att lägga till det i formuläret, och sedan på **Obligatoriskt** om gäster måste fylla i det. **Obligatoriskt** kan bara slås på för ett inkluderat fält, och om du stänger av **Inkludera** rensas det.

| Fält | Efterfrågas | Inkluderas som standard |
|-------|-----------|---------------------|
| **Titel** | För varje familjemedlem, som en rullgardinsmeny framför namnet (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Nej |
| **E-post** | Endast huvudkontakten | Ja (valfritt) |
| **Telefon** | För varje familjemedlem. När fältet är obligatoriskt behöver endast huvudkontakten fylla i det. | Ja (valfritt) |
| **Roll i hushållet** | För varje familjemedlem efter huvudkontakten -- Make/maka, Barn eller Annan. Huvudkontakten är huvudman för ett nytt hushåll. Den som saknar roll sparas som Annan. | Ja (valfritt) |
| **Hemadress** | En gång för familjen -- gatuadress, adressrad 2, ort, delstat och postnummer. När fältet är obligatoriskt måste allt utom adressrad 2 fyllas i. Adressen sparas på varje familjemedlem. | Nej |
| **Födelsedatum** | För varje familjemedlem | Nej |
| **Kön** | För varje familjemedlem | Nej |
| **Civilstånd** | Endast huvudkontakten | Nej |
| **Årskurs** | För varje familjemedlem (förskola till årskurs 12, eller Examinerad) | Nej |
| **Kommentarer** | En gång, i en ruta under familjemedlemmarna (upp till 1 000 tecken) | Nej |

Fält som du stänger av sparas aldrig, även om någon skickar dem till registreringen på annat sätt. Kommentarer sparas som en anteckning på huvudkontaktens post (publicerad som "Gästregistrering"), så att du kan läsa dem i avsnittet **Anteckningar** på deras profil.

### Lägga till gäster i en grupp

Använd **Lägg till nya gäster i grupp** för att automatiskt placera alla som registrerar sig i en av dina grupper -- till exempel en grupp för "Nykomlingar" eller en grupp för helgens evenemang. Välj **Ingen** (standardvärdet) för att hoppa över detta. Gäster ser eller väljer aldrig gruppen; den anges endast här. Ändra den inför varje evenemang så att du kan följa upp evenemangets gäster tillsammans.

### Registrera närvaro

När en grupp är vald visas en omkopplare **Registrera även närvaro**. Slå på den för att markera gäster som närvarande i samma stund de registrerar sig, så att du inte behöver checka in dem separat.

Närvaro registreras endast när registreringen sker under en av den valda gruppens **schemalagda** gudstjänsttider:

- Gruppen måste vara kopplad till en eller flera gudstjänsttider, och dessa gudstjänsttider måste ha ett [incheckningsschema](setup.md#setting-a-check-in-schedule) (en **Dag** och en **Starttid**).
- "Under" innebär inom gudstjänstens incheckningsfönster -- från **Öppna incheckning** minuter före starten till **Stäng incheckning** minuter efter slutet (eller efter starten, om ingen sluttid är angiven; utan både sluttid och stängningsminuter gäller till slutet av dagen), i samma tidszon som incheckningsschemat använder.
- Varje familjemedlem markeras som närvarande i gruppen för varje av dess gudstjänsttider som är öppen i det ögonblicket, på dagens datum.
- Registreringar vid andra tidpunkter, eller för en grupp vars gudstjänsttider saknar schema, läggs till i gruppen men räknas inte som närvarande.

### Sidhuvudsfoto

Under **Sidhuvudsfoto** klickar du på **Byt foto** för att välja eller ladda upp en bild (beskuren till 16:9) som visas överst på registreringssidan i stället för standardikonen. Klicka på **Ta bort** för att gå tillbaka till ikonen.

### Dela registreringslänken

När QR-gästregistrering är aktiverad visas avsnittet **Dela registrerings-QR-kod** längst ner på kortet. Det ger dig två sätt att få gäster till registreringsformuläret, utöver kioskens QR-kod:

- **Kopiera länk** -- kopierar registreringsadressen så att du kan klistra in den på din kyrkas webbplats, i e-postmeddelanden eller var som helst online.
- **Ladda ner PNG** -- laddar ner QR-koden som en bild som du kan skriva ut på flygblad, i kyrkkaffebladet eller på skyltar.

:::tip
Lägg till registreringslänken på din kyrkas webbsida under "Planera ditt besök" eller "Jag är ny" så att gäster kan registrera sig redan innan de kommer.
:::

### Vad som händer efter att en gäst har registrerat sig

B1 letar först efter personer som redan finns i **Personer**. En familjemedlem matchas mot en befintlig person när exakt en person har samma förnamn och samma e-postadress eller telefonnummer. Ett barn som angetts utan e-post eller telefon matchas på förnamn inom det hushåll som matchades. Matchade personer återanvänds som de är -- registreringen ändrar aldrig deras uppgifter eller medlemsstatus -- och alla nya personer går med i det matchade hushållet.

När ingen matchning hittas skapas ett nytt hushåll som namnges efter huvudkontaktens efternamn, med en personpost för varje familjemedlem. Alla nya läggs till i **Personer** med medlemsstatus **Besökare**, med huvudkontakten som huvudman för hushållet.

Matchade och nya personer läggs båda till i den grupp du valde (om de inte redan är med i den) och får sin närvaro registrerad när detta är aktiverat. Kommentarer sparas som en anteckning på huvudkontakten.

För att följa upp automatiskt kan du lägga till en [arbetsflödesutlösare](../serving/workflows.md#triggers), till exempel **Person · Skapad** med villkoret *Medlemsstatus är Besökare*, eller **Grupp · Medlem gick med** för den grupp du valde ovan.

## Vad som registreras

Varje incheckning skapar en närvaroregistrering i B1 Admin. Du kan se dessa poster på sidan [Närvaro](tracking-attendance.md) och i varje [grupps](../groups/group-members.md) sammankomster, precis som manuellt inmatad närvaro. Det finns ingen skillnad i hur datan visas — båda metoderna matar samma rapporter.

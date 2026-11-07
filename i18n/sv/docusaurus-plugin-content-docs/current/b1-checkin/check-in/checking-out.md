---
title: "Utcheckning och barnsäkerhet"
description: "Checka ut barn vid en bemannad B1 Checkin-station med säkerhetskoder, verifierade hämtningspersoner, sökning efter föräldrar, nyutskrift av etiketter och nödutrop."
---

# Utcheckning och barnsäkerhet

<div class="article-intro">

Utcheckningen avslutar incheckningen av barn: en förälder visar säkerhetskoden från sin upphämtningsetikett, kiosken verifierar vem som hämtar, och barnen checkas ut. Bemannade stationer har dessutom säkerhetsverktyg: verifiering av betrodda hämtare, sms-sidning till förälder, omtryck av säkerhetsetiketter och ett nödutskick.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Utcheckning finns på stationer som är inställda på **bemannat** läge i kioskens admininställningar
- Barnen måste ha blivit [incheckade](./completing-checkin.md) med en utskriven upphämtningsetikett som innehåller säkerhetskoden
- Sidning och nödutskick kräver att din kyrka har en sms-leverantör ansluten i B1 Admin

</div>

## Starta en utcheckning

1. På en bemannad station trycker du på **Checka ut** på uppslagsskärmen.
2. Ange den 4-teckens **säkerhetskoden** från familjens upphämtningsetikett. Du kan skriva in den, använda det skärmbaserade tangentbordet eller skanna etikettens streckkod med en USB- eller Bluetooth-skanner. Koden skickas automatiskt när alla 4 tecken har angetts.
   - Ingen skanner? Tryck på **Skanna** under kodfältet för att använda surfplattans kamera. Håll upphämtningsetikettens QR-kod eller streckkod framför kameran i fönstret **Skanna upphämtningskod**, så fylls koden i åt dig. Bakre kameran används som standard. Tryck på växlingsknappen för att byta kamera, eller tryck på **Avbryt** för att gå tillbaka till att skriva.
3. Kiosken visar de barn som är incheckade under den koden.

## Verifiera vem som hämtar

Utcheckningsskärmen frågar vem som hämtar barnen:

- **Betrodda hämtare** för hushållet visas som kort med foto och relation. Tryck på den person som står framför dig.
- **Vuxna i hushållet** visas också i ett fotorutnät.
- **Annan** låter dig skriva in namnet på någon som inte finns i listan.

Om ett inskrivet namn matchar någon som är markerad som **Ej godkänd** för hushållet, blockerar kiosken utcheckningen med en varning. En personal kan välja **Åsidosätt** för att ändå fortsätta. Åsidosättningen registreras på närvaroposten tillsammans med personens namn.

När hämtaren är bekräftad trycker du på checka ut. Hämtarens namn sparas i närvaroposten.

:::info
Betrodda hämtare och personer som inte är godkända hanteras av kyrkans personal på varje persons sida i B1 Admin. Se [Incheckningssäkerhet](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Sidning till förälder

Behöver du en förälder under gudstjänsten, till exempel för blöjbyte eller ett gråtande barn? Från utcheckningsskärmen på en bemannad station kan personal skicka en **sida**: ett sms till barnets föräldrar eller vårdnadshavare via kyrkans sms-leverantör. Föräldrar som har avstått från sms eller saknar mobilnummer hoppas över, och kiosken visar hur många meddelanden som skickades.

## Omtryck av etiketter

Om en namnskylt eller upphämtningsetikett har försvunnit eller skadats kan personal på en bemannad station **skriva ut om** familjens etiketter från utcheckningsskärmen efter att ha angett säkerhetskoden. Omtrycket använder samma skrivare och etikettmallar som den ursprungliga incheckningen.

## Nödutskick

Vid en nödsituation kan personal skicka sms till vårdnadshavarna för **varje incheckat barn** under aktuell gudstjänst, samtidigt:

1. Öppna kioskens **adminInställningar** genom att trycka sju gånger snabbt på logotypen i sidhuvudet, plus PIN-koden om en sådan är inställd.
2. Tryck på **Nödutskick**.
3. Skriv meddelandet och skriv sedan **EMERGENCY** i bekräftelsefältet. Knappen **Skicka utskick** är inaktiverad tills du gör det.
4. Kiosken visar hur många telefoner som tog emot meddelandet och hur många personer som hoppades över (avstått eller saknar mobilnummer).

:::warning
Utskicket går till varje incheckat hushåll för den valda gudstjänsten. Använd det endast vid verkliga nödsituationer, till exempel evakueringar, nedstängningar eller svårt väder.
:::

## Relaterade artiklar

- [Slutför incheckning](./completing-checkin.md): var säkerhetskoder och upphämtningsetiketter kommer ifrån
- [Incheckningssäkerhet](../../b1-admin/attendance/checkin-safety.md): konfigurera kapacitet, förhållanden, hämtare och kravet på sms-leverantör
- [Skrivarinställning](../getting-started/printer-setup.md): konfiguration av etikettskrivare

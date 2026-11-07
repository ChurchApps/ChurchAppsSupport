---
title: "Guide: Konfigurera barnkontroll i barnverksamheten"
description: "Ställ in barnincheckning i B1 Admin: koppla familjer, skapa åldersgrupper, konfigurera gudstjänster och skriv ut namnskyltar till B1 Checkin-kiosken."
---

# Konfigurera barnkontroll i barnverksamheten

<div class="article-intro">

Den här guiden går igenom allt som behövs för att få igång ett system för barnincheckning i din församling, från att lägga in familjer i databasen till att ställa in åldersanpassade grupper och skriva ut namnbrickor på söndagsmorgonen. När du är klar kan föräldrar checka in sina barn vid en kioskplatta och få en matchande säkerhetsbricka.

</div>

## Instruktionsvideo

<YouTube id="Ep9CBUcJwPI" title="Konfigurera barnincheckning i B1" next="Registrera och följa närvaro i B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa ditt församlingskonto på [admin.b1.church](https://admin.b1.church)
- Se till att du har administratörsbehörighet. Se [Roller och behörigheter](../people/roles-permissions.md) vid behov
- Valfritt: Förbered en CSV-fil med familjer om du flyttar data från ett annat system

</div>

## Steg 1: Lägg till familjer i din databas

Innan incheckningen kan fungera behöver systemet veta vilka familjer som finns. Varje barn behöver kopplas till en förälder via hushållsfunktionen.

Följ guiden [Lägga till personer](../people/adding-people.md) för att lägga till minst en familj. Se till att:

- Lägga till föräldern/föräldrarna först
- Lägga till varje barn
- Koppla dem i samma hushåll med hjälp av [hushållsredigeraren](../people/adding-people.md#managing-households)

:::tip
Om du har fler än en handfull familjer att lägga till, använd verktyget [CSV-import](../people/importing-data.md) i stället för att lägga till dem en i taget. Du kan importera hela din medlemsförteckning på några minuter.
:::

## Steg 2: Skapa grupper för barn

Grupper definierar de klasser som barnen checkar in i. Du vill vanligtvis ha en grupp per åldersintervall.

Följ guiden [Skapa grupper](../groups/creating-groups.md) för att skapa grupper som:

- **Småbarnsgrupp** (0–2 år)
- **Förskola** (3–5 år)
- **Lågstadiet** (6–10 år)

Du kan anpassa namnen och åldersintervallen så att de passar din verksamhetsstruktur.

## Steg 3: Konfigurera församlingsenheter och gudstjänster

Incheckningen är kopplad till specifika gudstjänsttider. Du behöver minst en församlingsenhet och en gudstjänst konfigurerad.

Följ guiden [Närvaroinställningar](../attendance/setup.md) för att:

1. Lägga till din församlingsenhet (t.ex. "Huvudförsamlingen")
2. Lägga till en gudstjänst (t.ex. "Söndagsmorgon")
3. Ange gudstjänsttiden (t.ex. "09:00") och, valfritt, ett [incheckningsschema](../attendance/setup.md#setting-a-check-in-schedule) så att incheckningen öppnar automatiskt före varje gudstjänst och stänger efter den
4. Tilldela dina barngrupper till gudstjänsten

## Steg 4: Ställ in incheckningsappen

Nu kopplar du ihop allt genom att installera incheckningsappen på en platta.

1. Installera **appen B1 Checkin**. Se artikeln [Incheckning](../attendance/check-in.md) för nedladdningslänkar
2. Logga in med dina inloggningsuppgifter för B1 Admin
3. Välj din församlingsenhet och gudstjänsttid

Se hela artikeln [Incheckning](../attendance/check-in.md) för detaljerade installationssteg.

## Steg 5: Skaffa din utrustning

Du behöver en platta till kiosken och, valfritt, en Brother-etikettskrivare för namnbrickor.

Som minimum:
- **En Android- eller Amazon Fire-platta**. Se [rekommenderade plattor](../attendance/check-in.md#recommended-hardware)
- **En Brother-etikettskrivare**. QL-1110NWB rekommenderas för dess stöd för Bluetooth och WiFi
- **Brother DK-1201-etiketter** (1-1/7" x 3-1/2")

:::warning
Endast Brother-etikettskrivare är kompatibla med appen B1 Checkin. Skrivare från andra märken fungerar inte.
:::

## Steg 6: Genomför en testincheckning

Gör en provkörning innan söndagsmorgonen:

1. Öppna appen B1 Checkin på din platta
2. Välj din församlingsenhet och rätt gudstjänsttid
3. Sök efter en av de familjer du lade till
4. Checka in ett barn och kontrollera att:
   - Närvaron visas i B1 Admin under **Närvaro**
   - Om du använder en skrivare, att namnbrickan skrivs ut korrekt

:::tip
Utbilda dina välkomstvolontärer i incheckningsprocessen innan ni startar. En snabb genomgång på 5 minuter brukar räcka.
:::

## Klart!

Din barnincheckning är redo. Föräldrar kan söka efter sin familj, välja sina barn och checka in vid kiosken. Närvaron registreras automatiskt i B1 Admin.

## Relaterade artiklar

- [Lägga till personer](../people/adding-people.md): lägg till fler familjer när de besöker
- [Skapa grupper](../groups/creating-groups.md): hantera dina barngrupper
- [Närvaroinställningar](../attendance/setup.md): konfigurera församlingsenheter och gudstjänster
- [Incheckning](../attendance/check-in.md): detaljerad installation av incheckningsappen och utrustning
- [Följa närvaro](../attendance/tracking-attendance.md): visa incheckningsrapporter

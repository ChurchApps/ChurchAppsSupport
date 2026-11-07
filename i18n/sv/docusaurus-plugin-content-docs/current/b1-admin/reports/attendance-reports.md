---
title: "Närvarorapporter"
description: "Lär dig om B1 Admins tre närvarorapporter (Attendance Trend, Group Attendance, Daily Group Attendance), vad de visar och hur du kör och exporterar dem."
---

# Närvarorapporter

<div class="article-intro">

B1 Admin har tre närvarorapporter som hjälper dig att förstå hur människor deltar i dina gudstjänster och grupper. Varje rapport ger en annan bild av dina närvarodata, från övergripande trender till dagliga sammanställningar.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Se till att närvaro [registreras konsekvent](../attendance/tracking-attendance.md) för dina gudstjänster och grupper
- Kontrollera att dina [grupper](../groups/creating-groups.md) och gudstjänster är konfigurerade i B1 Admin
- Du behöver rätt [behörigheter](../settings/roles-permissions.md) för att komma åt rapporterna

</div>

## Närvarotrend

Rapporten Närvarotrend visar hur närvaron förändras över tid för dina gudstjänster.

1. Gå direkt till **admin.b1.church/reports/attendanceTrend** i din webbläsare (rapporterna finns inte i navigeringsmenyn, så det enklaste sättet att komma tillbaka är att bokmärka adressen). Samma rapport finns också på sidan Närvaro: klicka på **Alla år** och välj sedan fliken **Närvarotrend**.
2. Välj eventuellt en **Församling**, **Gudstjänst**, **Gudstjänsttid** eller **Grupp** för att filtrera resultaten.
3. Ange **Startdatum** och **Slutdatum**. Som standard omfattar rapporten det senaste året, från ett år sedan till idag, och slutdatumet inkluderas helt. Klicka på **Kör rapport**.
4. Rapporten visar ett stapeldiagram och en tabell med totalt antal besök per vecka. Varje vecka märks med datumet för veckans söndag, och kolumnen **Datum för sammankomster** i tabellen listar de faktiska datum i veckan som hade närvaro (till exempel ”9/27, 9/30”).

Den här rapporten är användbar för att upptäcka mönster som säsongsmässiga dalar, tillväxttrender eller effekten av särskilda evenemang.

## Gruppnärvaro

Rapporten Gruppnärvaro visar vilka som deltog i varje gruppsammankomst under ett datumintervall.

1. Gå direkt till **admin.b1.church/reports/groupAttendance** i din webbläsare, eller klicka på **Alla år** på sidan Närvaro och välj fliken **Gruppnärvaro**.
2. Välj eventuellt en **Församling** och en **Gudstjänst**.
3. Ange **Startdatum** och **Slutdatum**. Som standard omfattar rapporten från senaste söndagen till idag, och slutdatumet inkluderas helt.
4. Klicka på **Kör rapport**.

Resultaten grupperas efter sammankomstdatum, sedan gudstjänsttid, sedan grupp, med de personer som deltog listade under varje grupp. Gudstjänsttider, grupper och namn sorteras alfabetiskt. Bredvid varje persons namn visar kolumnen **Incheckad** den tid då deras närvaro registrerades (tomt när ingen tid finns registrerad), och kolumnen **Medlemsstatus** visar deras status, till exempel Medlem eller Besökare. Sammankomster för grupper som inte träffas vid någon gudstjänsttid inkluderas också; de visas utan gudstjänsttid.

För att ladda ner ett kalkylblad klickar du på **Nedladdningsalternativ** och väljer **Sammanfattning**. CSV-filen innehåller:

- En rad per medlem i varje grupp som träffades under datumintervallet, sorterad efter grupp och sedan namn.
- Personens namn och gruppens namn i de första kolumnerna.
- En kolumn per daterad sammankomst, namngiven med gudstjänst, gudstjänsttid och datum (till exempel ”Söndag - 9:00 (2026-09-27)”), där varje person markeras som **närvarande** eller **frånvarande**. En sammankomst utan gudstjänsttid namnges endast med sitt datum.

Använd den här rapporten för att jämföra närvaro mellan grupper och identifiera vilka grupper som växer eller behöver uppmärksamhet.

## Daglig gruppnärvaro

Rapporten Daglig gruppnärvaro (med titeln **Gruppnärvaro per dag**) ger en daglig räkning av hur många personer som deltog i en grupp.

1. Gå direkt till **admin.b1.church/reports/dailyGroupAttendance** i din webbläsare.
2. Använd rullgardinsmenyerna **Församling**, **Gudstjänst** och **Gudstjänsttid** för att begränsa listan och välj sedan den **Grupp** du vill granska.
3. Kör rapporten. Den listar varje dag gruppen träffades, äldst först, med **Datum** och antalet **Deltagare** som registrerats den dagen.

Den här rapporten ger detaljerad information, vilket är till hjälp för att förstå variationer från vecka till vecka eller för att identifiera särskilda dagar med ovanligt hög eller låg närvaro.

:::tip
Använd rapporten Närvarotrend för en övergripande översikt och rapporten Daglig gruppnärvaro när du behöver gå in på specifika datum.
:::

## Praktiska användningsområden

- **Planering** -- Använd närvarotrender för att planera sittplatser, bemanning och resurser inför kommande gudstjänster.
- **Uppsökande verksamhet** -- Upptäck tidigt minskande närvaromönster så att du kan följa upp med medlemmar.
- **Styrelserapporter** -- Inkludera närvarodata i dina regelbundna ledarskapsrapporter för att visa hur väl verksamheten mår.
- **Utvärdering av evenemang** -- Jämför närvaro före och efter särskilda evenemang för att mäta deras effekt.

:::warning
Närvarodata registreras genom dina grupp- och gudstjänstincheckningar. Om närvaro inte registreras konsekvent speglar inte dina rapporter det faktiska deltagandet på ett korrekt sätt. Se [Registrera närvaro](../attendance/tracking-attendance.md) för installationsanvisningar.
:::

---
title: "Inställning av närvaro"
description: "Ställ in campus, gudstjänster, gudstjänsttider och gruppindelningar i B1 Admin så att närvarouppföljning och incheckningsscheman fungerar i hela församlingen."
---

# Inställning av närvaro

<div class="article-intro">

Innan du kan registrera närvaro behöver du berätta för B1 Admin var din kyrka har sina fysiska platser, när gudstjänsterna hålls och vilka grupper som träffas vid varje gudstjänst. Den här engångsinställningen skapar den struktur som all närvaroregistrering och rapportering i din kyrka bygger på.

</div>

## Utbildningsvideo

<YouTube id="LQPc2gVlXvQ" title="Så ställer du in gudstjänster och närvaro i B1" next="Så ställer du in barnincheckning i B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver ett aktivt B1 Admin-konto med behörigheten **Redigera gudstjänster** för närvaro. Alternativet **Inställningar** visas bara för personer som har den. Att bara visa närvaro räcker inte. Se [Roller och behörigheter](../people/roles-permissions.md) om du är osäker på vilken åtkomstnivå du har.
- Om du planerar att koppla grupper till gudstjänsttider, se till att dina [grupper är skapade](../groups/creating-groups.md) först.

</div>

## Grundläggande begrepp

- **Campus** -- en fysisk plats där din kyrka samlas (till exempel "Huvudcampus" eller "Norra campus"). Campus hanteras under **Inställningar**.
- **Gudstjänst** -- en återkommande samling på ett campus (till exempel "Söndagsgudstjänst" eller "Mitt i veckan").
- **Gudstjänsttid** -- en specifik tid då en gudstjänst hålls (till exempel "9:00 AM" eller "11:00 AM").
- **Schemalagd grupp** -- en grupp som är kopplad till en specifik gudstjänsttid. Närvaron registreras i samband med den gudstjänsten.
- **Schemalös grupp** -- en grupp som registrerar närvaro på egen hand, utan koppling till någon gudstjänsttid.

## Så ställer du in din närvarostruktur

1. Öppna **B1 Admin**, öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster) och expandera **Personer**.
2. Klicka på **Närvaro** och sedan på **Inställningar** i vänster kolumn. Tabellen **Gudstjänststruktur** öppnas, med antal campus, gudstjänsttider samt schemalagda och schemalösa grupper överst. Siffrorna uppdateras så snart du lägger till, redigerar eller tar bort något i tabellen.
3. Klicka på **Hantera campus** (uppe till höger i panelen **Gudstjänststruktur**). Du kommer då till **Inställningar → Campus**. Klicka på **Lägg till campus**, ange namnet på din plats (adress och tidszon är valfria) och klicka på **Spara**.
4. Gå tillbaka till **Personer → Närvaro** och klicka på **Inställningar**. Ditt campus visas nu i inställningstabellen.
5. Klicka på **+-knappen i kolumnen Gudstjänst** under ditt campus. Ange ett gudstjänstnamn, till exempel "Söndagsgudstjänst", och klicka på **Spara**.
6. Klicka på **+-knappen i kolumnen Tid** under gudstjänsten. Ange ett namn på **gudstjänsttiden**, till exempel "9:00 AM". Fyll i [incheckningsschemat](#setting-a-check-in-schedule) om du vill, och klicka på **Spara**. Upprepa för varje gudstjänsttid.
7. För att koppla en grupp till en gudstjänsttid, öppna gruppen från **Personer > Grupper**, klicka på **Redigera** och använd **Lägg till gudstjänsttid**. Se nästa avsnitt.

### Aktivera spårning av närvaro för en grupp

Innan närvaro kan registreras för en grupp måste **Spåra närvaro** vara aktiverat för den gruppen.

1. I hoppmenyn väljer du **Personer > Grupper** och markerar gruppen.
2. Klicka på knappen **Redigera** under gruppens namn.
3. Ställ in **Spåra närvaro** på **Ja**.
4. Klicka på **Spara**.

:::tip
Om du kopplade gruppen till en gudstjänsttid i föregående steg, använd också alternativet **Lägg till gudstjänsttid** på gruppens redigeringssida för att koppla den till rätt gudstjänst. Då säkerställer du att sessionerna kopplas till rätt campus och tid.
:::

:::tip
Om en grupp träffas utanför de vanliga gudstjänsterna, till exempel en smågrupp mitt i veckan som registrerar sin egen närvaro, kan du låta den vara en schemalös grupp. Den visas fortfarande i rapporten **Gruppnärvaro** för närvarorapportering.
:::

## Ställa in ett incheckningsschema

Varje gudstjänsttid kan ha ett valfritt incheckningsschema, så att [självincheckningen](check-in.md) öppnas och stängs automatiskt varje vecka. Utan schema är incheckningen för den gudstjänsttiden tillgänglig när som helst (så länge rummet inte är stängt av andra skäl, till exempel för att det är fullt).

1. Klicka i vyn **Inställningar** på en gudstjänsttids namn i kolumnen **Tid** (eller lägg till en ny).
2. Under **Incheckningsschema** väljer du vilken **dag** i veckan gudstjänsttiden hålls.
3. Ange **starttid** och, om du vill, **sluttid**.
4. Ange **Öppna incheckning (minuter före start)**. Till exempel öppnar `30` incheckningen en halvtimme före gudstjänsten börjar.
5. Ange **Stäng incheckning (minuter efter slut)**. Till exempel håller `15` incheckningen öppen i 15 minuter efter sluttiden. Om du inte angav någon sluttid räknas detta från starttiden. Om du lämnar både **Sluttid** och **Stäng incheckning** tomma är incheckningen öppen till slutet av dagen.
6. Klicka på **Spara**.

Schemat upprepas varje vecka och mäts i tidszonen för gudstjänstens campus. Om campuset inte har någon tidszon används kyrkans [tidszon](../settings/church-settings.md#time-zone) i stället. Om den inte heller är inställd används tidszonen för ditt första campus som har en, och som sista utväg östlig tid (America/New_York). Om incheckningen öppnas vid fel klockslag, kontrollera **tidszonen** för campuset under [Campus](../settings/campuses.md). För att ta bort ett schema, ställ in **Dag** på tillbaka **Inget schema** och klicka på **Spara**. Ett schema träder bara i kraft när både **Dag** och **Starttid** är angivna.

Medan incheckningsfönstret för en gudstjänsttid är stängt gäller följande:

- **Självincheckning på B1.church** visar gudstjänsttiden som **Stängd** (eller till exempel **Stängd · öppnar sön 9:30 AM**) och den kan inte väljas. Om ingen av en gudstjänsts tider är öppen ser familjer när incheckningen öppnar, till exempel "Incheckningen öppnar sön 9:30 AM".
- **Kiosk-appen B1 Checkin** visar också gudstjänsttiden som **Stängd** med information om när den öppnar. Om alla tider för en gudstjänst är stängda visar kiosken när incheckningen för den gudstjänsten öppnar. Någon som redan checkat in till en stängd gudstjänsttid ser i stället sin grupp med **Incheckad**. Om fönstret stängs mitt i en incheckning slutför kiosken inte incheckningen. Den visar i stället en skärm med texten **Kan inte checka in ännu** och listar det berörda rummet, så att familjen kan välja ett annat.

En familj som redan checkat in till en tidigare gudstjänsttid kan fortfarande komma tillbaka och lägga till en senare gudstjänsttid som är öppen, även efter att det tidigare fönstret har stängts. Deras befintliga incheckningar behålls.

:::tip
Ange ett generöst öppningsfönster (till exempel 45 minuter före start) så att familjer och volontärer som kommer tidigt kan checka in. Ange ett kort stängningsfönster så att de som kommer sent ändå kan checka in efter att gudstjänsten har börjat.
:::

## Redigera din inställning

Du kan uppdatera din inställning när som helst. Markera ett campus, en gudstjänsttid eller en grupp och klicka på **Redigera** för att ändra uppgifterna, eller på **Ta bort** för att radera det.

:::info
Om du tar bort en gudstjänsttid raderas inte tidigare närvarouppgifter. Din historiska data bevaras även om du ändrar ditt schema.
:::

## Nästa steg

När dina campus, gudstjänsttider och grupper är på plats kan du börja [registrera närvaro](recording-attendance.md) manuellt eller ställa in [självincheckning](check-in.md) för dina gudstjänster.

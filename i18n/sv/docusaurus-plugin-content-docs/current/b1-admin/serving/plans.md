---
title: "Tjänsteplaner"
---

# Tjänsteplaner

<div class="article-intro">

Tjänsteplaner organiserar vem som tjänstgör och när. Varje plan är kopplad till ett specifikt datum och ett specifikt ministerium, vilket gör det enkelt att samordna dina volontärteam vecka för vecka och se till att varje gudstjänst är fullt bemannad.

</div>

## Utbildningsvideo

<YouTube id="47DstBXKl74" title="Skapa planer och schemalägga volontärer i B1" next="Bygga gudstjänstordningen och sångbiblioteket i B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Konfigurera dina ministerier och team i området Serving
- Se till att volontärer har lagts till i din [personregister](../people/adding-people.md) och tilldelats till team

</div>

## Öppna planer

1. Öppna i B1 Admin [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet längst upp till vänster), expandera **Serving** och klicka på **Planer**.
2. Välj en **flik för ministeriet** överst på sidan.
3. Klicka på en **plantyp** för att se listan över planer för den typen. Använd **Kommande** och **Tidigare** ovanför listan för att växla mellan framtida och tidigare planer. **Kommande** visar planer från och med idag, med de närmaste först och planer utan datum sist. **Tidigare** visar endast tidigare planer, med de senaste först.
4. Klicka på en specifik plan för att öppna den.

Varje planssida innehåller länkar tillbaka till dess plantyp och till **Planer**, så att du kan gå tillbaka utan webbläsarens bakåtknapp.

:::info
Du behöver inte fullständig administratörsåtkomst för att hantera planer. Alla som är medlemmar i ett ministerium kan gå till Serving och skapa, redigera och schemalägga planer för sitt eget ministerium utan att behöva behörigheten Plans Edit. Redigerare med rollen Plans Edit kan hantera planer för alla ministerier.
:::

## Skapa en plan

1. Klicka på **Ny plan** överst på sidan för plantypen.
2. Ge planen ett namn eller använd datumet som namn. Välj **datumet** för gudstjänsten.
3. Om ditt ministerium har [mallar](./plan-templates.md) kan du välja en under **Starta från mall** för att fylla i gudstjänstordningen, positionerna och anteckningarna i ett enda steg.
4. Om du i stället vill kopiera från en tidigare plan använder du **Kopiera från föregående plan** och väljer **Endast positioner** eller **Positioner och tilldelningar**. Om du inte vill kopiera väljer du **Ingenting**. Du kan också markera **Kopiera gudstjänstordning**. När du kopierar från en tidigare plan behåller den nya planen även den planens **Anteckningar**, **Anmälningsfrist**, **Visa volontärernas namn på anmälningssidan** och inställningen för automatisk ersättning, så att du inte behöver ange dem igen varje vecka. Du kan ändra vilket av dessa som helst i den nya planens inställningar.
5. Om du vill skapa flera planer på en gång medan du kopierar väljer du **Upprepa var** och **Frekvens** (dag, vecka eller månad) och anger sedan **Antal planer** (upp till 12). För månad låter **På** dig behålla samma dag i månaden eller samma veckodag, till exempel andra lördagen. B1 listar datumen innan du sparar och skapar en plan för varje datum, var och en kopierad från den föregående. Om planen namnges efter sitt datum får varje ny plan namn efter sitt eget datum.
6. Ange eventuellt **Anmälningsfrist (timmar före gudstjänsten)**. En ny plan börjar med föregående plans frist, och du kan ändra den här. Lämna fältet tomt om det inte ska finnas någon frist. Se [Planinställningar](#plan-settings) för hur fristen räknas.
7. Spara planen. Nu kan du börja tilldela teammedlemmar och bygga upp [gudstjänstordningen](./service-order.md).

:::tip
Upprepningsinställningarna är bara tillgängliga när du kopierar något från föregående plan (positioner, tilldelningar eller gudstjänstordningen).
:::

## Plandetaljsidan

När du öppnar en plan visas planens namn, ministerium, plantyp och gudstjänstdatum överst, tillsammans med knapparna **Redigera** och **Skriv ut**. Allt annat finns på en och samma sida nedanför:

- **[Gudstjänstordning](./service-order.md)** -- Bygg gudstjänstordningen med delar som lovsångssånger, böner, meddelanden och predikan.
- **Tilldelningar för tjänstelag** -- Hantera vilka teammedlemmar som är tilldelade till planen. Du kan lägga till personer från dina befintliga team och se vem som har bekräftat eller fortfarande väntar. Länkar ovanför positionerna öppnar planens **Anteckningar** och **Tider**.

## Tilldela teammedlemmar

1. Öppna en plan och scrolla till **Tilldelningar för tjänstelag**.
2. Klicka på **Lägg till position**. Fyll i uppgifterna i formuläret för att lägga till en position. För kategorinamnet kan du skriva vilken kategori du vill. Om du vill att vem som helst i din kyrka ska kunna fylla positionen (inte bara medlemmar i ett visst team) lämnar du **Volontärgrupp** satt till **Ingen**.
3. Klicka på **Behövs** och välj volontärer för att fylla positionen. Om positionen har en **Volontärgrupp** väljer du bland den gruppens medlemmar. Om dess volontärgrupp är satt till **Ingen** kan du i stället söka efter vem som helst i din kyrka.
4. Lägg till medlemmar från din teamlista genom att klicka på **Lägg till**.
5. Tilldelade medlemmar visas under sitt team med sin tilldelningsstatus.
6. Klicka på Meddela volontärer för att meddela dem i B1-appen eller via e-post. Om planen använder ett [bekräftelseflöde](#plan-settings) startar meddelandet även ett arbetskort som följer upp varje förfrågan tills volontären svarar.

Varje position visar en räknare (till exempel "2/3") så att du i förbigående ser hur många platser som är fyllda. Under rubriken **Tilldelningar för tjänstelag** visar en sammanfattning ("X av Y positioner fyllda") den övergripande bemanningen för planen, tillsammans med hur många som fortfarande behövs. Den byter till **Fullt bemannad** när alla positioner är täckta.

:::tip
Konfigurera dina team i ministeriets inställningar innan du skapar planer. På så sätt har du en färdig pool av volontärer att tilldela från.
:::

### Kopiera positioner till en tom plan

Om en plan ännu inte har några positioner och det finns en tidigare plan av samma typ visas en länk **Kopiera från föregående plan** under **Tilldelningar för tjänstelag**. Välj **Endast positioner** eller **Positioner och tilldelningar** för att fylla den öppna planen med föregående plans positioner (och volontärer). Kopian hamnar i den aktuella planen; den skapar inte en andra plan för samma datum.

## Planinställningar

Varje plan har ytterligare inställningar som du kan konfigurera genom att klicka på **Redigera** bredvid planen i plantypens lista, eller på knappen **Redigera** överst på planssidan. Klicka på **Klar** (eller planens namn) för att gå tillbaka till planen. Dessa inkluderar:

- **Anmälningsfrist (timmar före gudstjänsten)** — antalet timmar före gudstjänsten då volontärers anmälningar stängs. Timmarna räknas bakåt från planens första **Gudstjänst**-tid (övningar och andra tider hoppas över om planen inte har något annat). En tvåtimmarsfrist för en gudstjänst kl. 10.00 stänger alltså anmälningarna kl. 8.00 samma morgon. Om planen saknar tider räknas fristen från kl. 9.00 på gudstjänstdatumet i din kyrkas tidszon. När fristen har passerat kan volontärer varken anmäla sig eller avföra sig själva. Ange ett negativt tal för att hålla anmälningarna öppna efter att gudstjänsten har börjat. Lämna fältet tomt, eller rensa det, för att ingen frist ska gälla.
- **Bekräftelseflöde** — välj ett [arbetsflöde för bekräftelse av tjänstetilldelning](./workflows.md#serving-assignment-confirmations) för att följa upp tjänsteförfrågningarna för den här planen via e-post och sms tills varje volontär accepterar eller avböjer. När du **Meddelar** volontärerna i den publicerade planen får varje ny förfrågan ett eget kort på det arbetsflödets tavla, och en notis ovanför meddelandelänken säger *"Nya förfrågningar använder bekräftelseflödet."* Lämna inställningen på **Använd befintliga tilldelningsaviseringar** för att behålla de vanliga aviseringarna. Endast aktiva bekräftelseflöden visas i listan. Skapa ett först under **Serving > Workflows**.
- **Visa volontärernas namn på anmälningssidan** — när den är markerad kan inloggade volontärer se vilka andra som redan har anmält sig till varje position på B1.church-anmälningssidan. Namnen visas aldrig för besökare som inte är inloggade.
- **Preliminärt schemalagd** — döljer tilldelningar för volontärer tills du är redo att publicera schemat.
- **Schemalägg automatiskt en ersättare när en volontär avböjer** — när den är markerad kontaktar B1 automatiskt nästa tillgängliga person i teamlistan om en tilldelad volontär avböjer sin position och frågar om de kan tjänstgöra. Detta fortsätter nedåt i listan tills någon accepterar, vilket håller dina positioner fyllda utan manuell uppföljning.

:::tip
På medlemmarnas anmälningssida listas varje plans lediga positioner efter kategori och sedan efter namn. Medlemmar ser varje kommande vecka med lediga positioner, om du inte aktiverar **Visa endast nästa vecka för varje plantyp** i [Inställningar > Volontäranmälan](../settings/church-settings.md#volunteer-signup).
:::

## Påminnelser till volontärer {#volunteer-reminders}

B1 kan automatiskt påminna volontärer inför de gudstjänster de är schemalagda för, så att du inte behöver jaga efter ditt team varje vecka. Påminnelser skickas till **alla schemalagda** — både de som har bekräftat och de som ännu inte har svarat. Undantaget är en förfrågan som skickas via ett [bekräftelseflöde](./workflows.md#serving-assignment-confirmations): den volontären får påminnelser först efter att hen har accepterat, eftersom arbetsflödet sköter uppföljningen fram till dess. Varje påminnelse-e-post innehåller volontärens position(er), gudstjänstdatumet, planens anteckningar och ditt eget meddelande.

Påminnelsernas tidpunkt och innehåll anges per **plantyp**, så att varje typ av gudstjänst kan ha sitt eget schema.

1. Välj i området **Serving** det ministerium som innehåller plantypen.
2. Klicka på **Redigera** bredvid plantypen i listan **Plantyper**.
3. Expandera avsnittet **Påminnelser** och aktivera **Skicka påminnelser för planer av den här typen**.
4. Under **När ska påminnelser skickas?** väljer du upp till tre tidpunkter: **7 dagar före**, **3 dagar före**, **2 dagar före**, **1 dag före** eller **Samma dag**.
5. Ange **Klockslag** när påminnelserna ska skickas.
6. Lägg eventuellt till ett **Meddelande**. Lämna fältet tomt för att använda standardtexten för påminnelser.
7. Under **Skicka via** väljer du **Push**, **E-post** och, om din kyrka har en [sms-leverantör](../settings/church-settings.md#texting) kopplad, **Sms**.
8. Klicka på **Spara påminnelser**.

Påminnelser är avstängda för en plantyp tills du slår på dem.

:::tip
Volontärer som ännu inte har bekräftat får knapparna **Acceptera** och **Avböj** direkt i påminnelse-e-posten, så att de kan svara utan att logga in.
:::

### Sms-påminnelser

Alternativet **Sms** visas bara när din kyrka har en sms-leverantör kopplad. Sms skickas via din kyrkas sms-leverantör, och varje sms kan kosta din kyrka pengar. En volontär får bara en sms-påminnelse om hen har aktiverat **Textmeddelanden** i sina [aviseringsinställningar](../../b1-church/getting-started/notification-preferences.md) och har ett mobilnummer i sin profil. Varje sms börjar med din kyrkas namn, hålls inom ett enda sms och avslutas med ”Svara STOP för att avsluta.” Den som svarar STOP slutar ta emot sms från din kyrka. För att STOP-svar ska nå B1 måste du klistra in **webbadressen för inkommande (STOP) webhook** från dina [sms-inställningar](../settings/church-settings.md#texting) i din leverantörs webhook för inkommande meddelanden.

Om du vill skicka sms till alla schemalagda över ett datumintervall direkt använder du **Sms till volontärer** i [Planöversikten](./plans-overview.md#texting-everyone-scheduled).

:::info
Varje påminnelse skickas en gång. Sms-påminnelser skickas utöver push och e-post, inte i stället för dem.
:::

## Koppla grupper till en plantyp

Under planlistan på plantypens sida låter avsnittet **Kopplade grupper** dig avgöra vilka grupper som kan se planerna för den här plantypen från sin medlemsportal. Det är ett snabbt sätt att visa kommande gudstjänster för rätt team utan att ge dem administratörsåtkomst.

1. Klicka på **Kopplade grupper** överst på plantypens sida (eller scrolla ner till avsnittet).
2. Klicka på **Lägg till grupp** och välj en grupp i rullgardinsmenyn.
3. I kolumnen **Visas** väljer du om medlemmar i gruppen ska se **Endast tidigare planer**, **Endast kommande planer** eller **Tidigare och kommande planer** för den här plantypen.
4. Upprepa för att koppla fler grupper, eller klicka på papperskorgsikonen för att ta bort en grupp.

:::info
Endast grupper märkta som **Standard** visas i väljaren. Medlemmar i en kopplad grupp ser automatiskt den här plantypens planer på gruppens sida i B1:s medlemsportal, begränsat till det tidsfönster du har valt.
:::

Om planerna är Lessons.church-lektioner ser medlemmar i den kopplade gruppen också ett kort **Veckans lektion** på gruppsidan (budskap, vers och en fråga för föräldrar). Koppla en föräldragrupp här och ställ in filtret på **Endast tidigare planer** så att dagens lektion inkluderas. Volontärteam använder vanligtvis **Endast kommande planer** eller **Tidigare och kommande planer**.

## Skriva ut planer

Du kan skriva ut en plan för att dela ut till ditt team. Öppna planen och klicka på **Skriv ut** överst på sidan för att skapa en utskriftsvänlig version som innehåller tilldelningar och gudstjänstordningen. Överst på utskriften visas din kyrkas logotyp (**logotypen för ljus bakgrund** från [Webbplats > Utseende](../website/appearance.md), om du har laddat upp en) med kyrkans namn under, och planens namn, så att lösa sidor är lätta att känna igen. Det här är användbart för att dela ut på övningar eller sätta upp i ett gemensamt utrymme.

Utskriften utelämnar allt som skulle vara tomt. Om inga volontärer är tilldelade finns ingen teamruta, och gudstjänstordningen använder hela sidbredden. Om inga objekt har någon längd utelämnas kolumnen **Längd**, och om planen varken har gudstjänsttider eller längder utelämnas även kolumnen **Tid**. För att ta bort den svarta rubrikrutan **Gudstjänstordning** med gudstjänstdatumet avmarkerar du **Visa rubriken Gudstjänstordning** överst på utskriftssidan. B1 Admin kommer ihåg ditt val i den webbläsaren.

:::info
Planer är organiserade efter ministerium. Se till att du är på rätt flik för ministeriet innan du skapar eller visar planer.
:::

## Nästa steg

- Använd [Planöversikten](./plans-overview.md) för att se alla kommande tilldelningar över flera veckor i ett rutnät och upptäcka obemannade positioner — och tilldela volontärer direkt från rutnätet
- Spara en plans struktur som en [plan­mall](./plan-templates.md) så att du kan använda den på framtida planer med ett enda klick
- Bygg din [gudstjänstordning](./service-order.md) med sånger, läsningar och andra delar
- Lägg till [sånger](./songs.md) från ditt bibliotek direkt i gudstjänstordningen
- Använd [Uppgifter](./tasks.md) för att tilldela uppföljningsåtgärder till teammedlemmar
- Visa aktuellt lektionsinnehåll på en TV i lobbyn med [Digital skyltning](./digital-signage.md)

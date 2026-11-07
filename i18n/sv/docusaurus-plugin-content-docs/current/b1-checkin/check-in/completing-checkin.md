---
title: "Slutför incheckning"
description: "Slutför en familjs incheckning i B1 Checkin-kiosken, inklusive rumsgränser, utskrift av etiketter, hämtningskoder och vad appen gör härnäst."
---

# Slutför incheckning

<div class="article-intro">

När du har granskat din familj och eventuellt gjort gruppindelningar är du redo att slutföra incheckningen. Det här är sista steget i kioskflödet -- appen skickar in närvaron, skriver ut etiketter och återställs för nästa familj.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- [Granska din familj](./household-review.md) på skärmen för familjegranskning
- [Tilldela grupper](./group-assignment.md) till familjemedlemmar som behöver checka in i en specifik klass eller ett specifikt program
- Lägg eventuellt till [gäster](./adding-guests.md) som besöker kyrkan tillsammans med din familj

</div>

## Så checkar du in

1. Tryck på knappen **Checka in** längst ner på **skärmen för familjegranskning**.
2. Appen skickar närvarouppgifterna till servern och visar en **bekräftelseskärm** med en grön bock och ett välkomstmeddelande.

Det är allt som krävs. Din familjs närvaro har registrerats.

## Fulla rum och bemanningsnivåer

Om din kyrka har ställt in [säkerhetsgränser](../../b1-admin/attendance/checkin-safety.md) för sina rum kontrollerar servern dem innan incheckningen sparas:

- Om ett valt rum är **fullt eller stängt** går inte incheckningen igenom, och appen anger rummet så att du kan välja ett annat.
- Om gudstjänsttiden har ett [incheckningsschema](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) och dess incheckningsfönster inte är öppet just nu, nekas även incheckning i den gudstjänsttidens rum. Skärmen **Kan inte checka in ännu** visar rummet med orsaken "incheckning är inte öppen just nu". Tryck på **Ändra rum** för att välja en annan gudstjänsttid eller grupp. (Gudstjänsttider som redan har stängt visas som **Stängd** på [hushållsskärmen](./household-review.md) och kan inte väljas. Du ser därför vanligtvis bara detta om ett fönster stängs mitt under en incheckning.)
- En familj som checkat in för en tidigare gudstjänsttid kan komma tillbaka senare och lägga till en öppen gudstjänsttid, även efter att det tidigare fönstret har stängt. Deras befintliga incheckningar behålls och gör inte att den nya incheckningen nekas.
- Om ett barnrum har **brist på volontärer** i förhållande till sin bemanningsnivå visar appen antingen en varning som en medarbetare kan bekräfta för att fortsätta, eller blockerar incheckningen helt. Det beror på hur din kyrka har konfigurerat tillämpningen av bemanningsnivåer.

## Utskrift av etiketter

Om en nätverksskrivare är konfigurerad skriver appen automatiskt ut etiketter efter incheckningen:

- **Namnetiketter** skrivs ut för varje person som är tilldelad en grupp där inställningen **Skriv ut namnbricka** är aktiverad. Namnetiketterna innehåller personens namn, gruppindelning och eventuell allergi- eller anteckningsinformation som finns registrerad.
- **Hämtningslappar för föräldrar** skrivs ut när någon av de incheckade personerna finns i en grupp där inställningen **Hämtning av förälder** är aktiverad. Personer som checkat in som **Volontär** hoppas över, så en barnvakt som tjänstgör i ett rum för hämtning av förälder får ingen hämtningslapp. Hämtningslappen listar barnen, deras gruppindelningar och en unik **säkerhetskod med 4 tecken**.

:::info
Samma säkerhetskod visas både på barnets namnetikett och på förälderns hämtningslapp. Vid hämtning jämför volontärer koderna för att kontrollera att rätt vuxen hämtar respektive barn.
:::

Säkerhetskoden genereras på nytt för varje incheckning och använder endast konsonanter och siffror (vokaler utesluts för att undvika att de bildar olämpliga ord).

:::warning
Om etiketter inte skrivs ut, öppna admininställningarna genom att trycka på **kyrkans logotyp** sju gånger och tryck sedan på **Byt skrivare** för att kontrollera anslutningen till skrivaren. Se [Installation av skrivare](../getting-started/printer-setup.md) för felsökningssteg.
:::

## Vad som händer efter incheckningen

- Om en skrivare är konfigurerad skriver appen ut alla etiketter och återgår sedan automatiskt till **sökskärmen**, redo för nästa familj.
- Om ingen skrivare är konfigurerad återgår appen också automatiskt till **sökskärmen**.

I båda fallen visas bekräftelseskärmen minst 6 sekunder från det att den dyker upp (8 sekunder när den firar någons närvaromilstolpe), så att familjer kan se att incheckningen lyckades. Om utskriften tar längre tid än så återgår appen ungefär en och en halv sekund efter att utskriften är klar.

Du behöver inte trycka på något för att komma tillbaka till sökskärmen -- appen sköter övergången automatiskt. När skärmen har varit uppe en stund kan du trycka på den för att återgå direkt. En tryckning under de första en och en halv sekunderna ignoreras, så ett snabbt dubbeltryck på **Checka in** hoppar inte över den.

:::tip
Appen återställs helt efter varje incheckning, så det finns ingen risk att en familj ser en annan familjs uppgifter.
:::

## Vad som registreras

När du trycker på **Checka in** skickar appen följande till servern för varje familjemedlem som har en gruppindelning:

- Personen som checkas in
- Den **tjänst** som personen deltar i
- Den **gudstjänsttid** och **grupp** som personen är tilldelad

Dessa uppgifter visas i B1 Admin under avsnittet Närvaro, där kyrkans administratörer kan visa och hantera närvaroregistreringar. Se [administrationsguiden för incheckning](../../b1-admin/attendance/check-in.md) för mer information.

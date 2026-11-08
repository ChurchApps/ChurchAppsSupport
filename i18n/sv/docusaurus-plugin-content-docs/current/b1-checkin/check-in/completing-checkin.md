---
title: "Slutföra incheckning"
description: "Slutför en familjs incheckning i kiosken i B1 Checkin, med information om rumsgränser, utskrift av etiketter, säkerhetskoder för hämtning och vad appen gör härnäst."
---

# Slutföra incheckning

<div class="article-intro">

När du har granskat hushållet och gjort eventuella gruppval är du redo att slutföra incheckningen. Detta är sista steget i kioskarbetsflödet -- appen skickar in närvarodata, skriver ut etiketter och återställs för nästa familj.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- [Granska ditt hushåll](./household-review.md) på granskningsskärmen för hushållet
- [Tilldela grupper](./group-assignment.md) till familjemedlemmar som behöver checka in i en specifik klass eller ett specifikt program
- Lägg eventuellt till [eventuella gäster](./adding-guests.md) som besöker dig med familjen

</div>

## Så här checkar du in

1. Tryck på knappen **Checka in** längst ner på **granskningsskärmen för hushållet**.
2. Appen skickar närvarodatan till servern och visar en **bekräftelseskärm** med en grön bock och ett välkomstmeddelande.

Det är allt som krävs. Din familjs närvaro har registrerats.

Om någon av de personer du valt redan har checkat in för den här gudstjänsten idag visas först fönstret **Redan incheckad**, där de namnges. Tryck på **Checka in igen** för att spara deras nya gruppval, eller på **Avbryt** för att gå tillbaka till hushållsskärmen.

## Fulla rum och volontärbemanning

Om din kyrka har konfigurerat [säkerhetsgränser](../../b1-admin/attendance/checkin-safety.md) för sina rum kontrollerar servern dem innan incheckningen sparas:

- Om ett valt rum är **fullt eller stängt** går inte incheckningen igenom, och appen anger rummet så att du kan välja ett annat.
- Om gudstjänsttiden har ett [incheckningsschema](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) och dess incheckningsfönster inte är öppet just nu, nekas även incheckning till rummen för den gudstjänsttiden. Skärmen **Kan inte checka in ännu** visar rummet med orsaken "incheckningen är inte öppen just nu". Tryck på **Byt rum** för att välja en annan gudstjänsttid eller grupp. (Gudstjänsttider som redan har stängt visas som **Stängd** på [hushållsskärmen](./household-review.md) och kan inte väljas, så du ser vanligtvis detta bara om ett fönster stängs under en pågående incheckning.)
- Ett hushåll som checkade in för en tidigare gudstjänsttid kan komma tillbaka senare och lägga till en öppen gudstjänsttid, även efter att det tidigare fönstret har stängt. Deras befintliga incheckningar behålls och gör inte att den nya incheckningen nekas.
- Om ett barnrum har **brist på volontärer** i förhållande till sin bemanningsgräns visar appen antingen en varning som en personalmedlem kan bekräfta för att fortsätta, eller blockerar incheckningen helt. Detta beror på hur din kyrka har konfigurerat bemanningskravet.

## Utskrift av etiketter

Om en nätverksskrivare är konfigurerad skriver appen automatiskt ut etiketter efter incheckningen:

- **Namnbrickor** skrivs ut för varje person som är tilldelad en grupp där inställningen **Skriv ut namnbricka** är aktiverad. Namnbrickorna innehåller personens namn, gruppvalet och eventuell allergi- eller anteckningsinformation som finns registrerad.
- **Hämtningslappar för föräldrar** skrivs ut när någon av de incheckade personerna är i en grupp där inställningen **Föräldrahämtning** är aktiverad. Personer som checkat in som **Volontär** hoppas över, så en barnomsorgsarbetare som tjänstgör i ett rum för föräldrahämtning får ingen hämtningslapp. Hämtningslappen listar barnen, deras gruppval och en unik **4-teckens säkerhetskod**.

:::info
Samma säkerhetskod visas både på barnets namnbricka och på förälderns hämtningslapp. Vid hämtningen jämför volontärerna koderna för att kontrollera att rätt vuxen hämtar varje barn.
:::

Säkerhetskoden genereras på nytt för varje incheckning och använder endast konsonanter och siffror (vokaler utesluts för att undvika att bilda olämpliga ord).

:::warning
Om etiketterna inte skrivs ut öppnar du admininställningarna genom att trycka sju gånger på **kyrkans logotyp** och sedan trycker du på **Byt skrivare** för att kontrollera anslutningen till skrivaren. Se [Skrivarinstallation](../getting-started/printer-setup.md) för felsökningssteg.
:::

## Vad som händer efter incheckningen

- Om en skrivare är konfigurerad skriver appen ut alla etiketter och återgår sedan automatiskt till **sökskärmen**, redo för nästa familj.
- Om ingen skrivare är konfigurerad återgår appen också automatiskt till **sökskärmen**.

I båda fallen visas bekräftelseskärmen i minst 6 sekunder från när den visas (8 sekunder när den firar någons närvaromilstolpe), så att familjerna kan se att incheckningen lyckades. Om utskriften tar längre tid än så återgår appen cirka en och en halv sekund efter att utskriften är klar.

Du behöver inte trycka på något för att komma tillbaka till sökskärmen -- appen sköter övergången automatiskt. När skärmen har varit uppe en stund kan du trycka på den för att återgå direkt. En tryckning under de första en och en halv sekunderna ignoreras, så ett snabbt dubbeltryck på **Checka in** hoppar inte över den.

:::tip
Appen återställs helt efter varje incheckning, så det finns ingen risk att en familj ser en annan familjs information.
:::

## Vad som registreras

När du trycker på **Checka in** skickar appen följande till servern för varje hushållsmedlem som har ett gruppval:

- Den **person** som checkas in
- Den **tjänst** de deltar i
- Den **gudstjänsttid** och **grupp** de är tilldelade

Dessa data visas i B1 Admin under avsnittet Närvaro, där kyrkans administratörer kan visa och hantera närvarodata. Se [administrationsguiden för incheckning](../../b1-admin/attendance/check-in.md) för mer information.

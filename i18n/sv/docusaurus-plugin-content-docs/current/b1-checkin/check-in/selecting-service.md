---
title: "Välj en gudstjänst"
description: "Välj den gudstjänst du deltar i på B1 Checkins tjänstsida. Det styr gudstjänsttiderna och grupperna som visas i resten av incheckningen."
---

# Välj en gudstjänst

<div class="article-intro">

Det första steget vid varje incheckning är att välja vilken gudstjänst du deltar i. Skärmen för gudstjänster visas direkt efter att appen har laddat klart och avgör vilka gudstjänsttider och grupper som är tillgängliga för resten av incheckningen.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- [Logga in](../getting-started/logging-in.md) i appen B1 Church Checkin och välj din kyrka
- Kontrollera att kyrkans administratör har [konfigurerat gudstjänster och gudstjänsttider](../../b1-admin/attendance/setup.md) i B1 Admin

</div>

## Så fungerar det

1. Efter inloggning (eller efter automatisk inloggning vid återkommande besök) visar appen **skärmen för gudstjänster**.
2. Du ser en lista över alla gudstjänster som har konfigurerats för din kyrka. Varje gudstjänst visas som ett kort med gudstjänstens namn (till exempel "Söndagsmorgon" eller "Onsdagskväll").
3. Tryck på den gudstjänst du deltar i.

Appen laddar de gudstjänsttider och grupper som hör till gudstjänsten och tar dig sedan vidare till [skärmen för sökning av medlemmar](./looking-up-members.md).

## När incheckningen inte är öppen

Om din administratör har gett en gudstjänsttid ett [incheckningsschema](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule), låter appen familjer välja den gudstjänsttiden endast medan incheckningsfönstret är öppet. Gudstjänsttider vars fönster är stängt just nu visas fortfarande på [hushållsskärmen](./household-review.md), men de är markerade **Stängd** (till exempel **Stängd · öppnar sön 9:30**) i stället för att erbjuda en gruppknapp.

Om alla gudstjänsttider för den gudstjänst du tryckte på är stängda berättar appen när incheckningen öppnar, till exempel **"Incheckningen för denna gudstjänst öppnar sön 9:30."** (Om ingen öppningstid kan visas står det **"Incheckningen är inte öppen för denna gudstjänst just nu."**) Tryck på **Tillbaka** för att återgå till listan över gudstjänster och välja en annan, eller vänta tills fönstret öppnar och försök igen.

:::info
Incheckningsfönstren följer tidszonen för gudstjänstens campus. Om campuset inte har någon tidszon angiven används i stället kyrkans tidszon. Om en gudstjänsttid verkar öppna vid fel klockslag, be din administratör kontrollera tidszonen i inställningarna för campuset eller kyrkan. På hushållsskärmen använder kiosken dessutom surfplattans egen klocka för att öppna och stänga gudstjänsttider, så se till att surfplattan har rätt tid och tidszon.
:::

:::info
Gudstjänster konfigureras av din kyrkas administratör i B1 Admin under avsnittet Närvaro. Om du inte ser den gudstjänst du förväntar dig, be din administratör kontrollera att den har skapats i [närvaroinställningarna](../../b1-admin/attendance/setup.md).
:::

## Vad som händer i bakgrunden

När du väljer en gudstjänst hämtar appen tre saker från servern:

- **Gudstjänsttiderna** för den gudstjänsten (till exempel kan en gudstjänst ha både en tid kl. 9.00 och en tid kl. 11.00).
- **Grupperna** som finns tillgängliga vid varje gudstjänsttid (till exempel Spädbarn, Förskola och Lågstadiet).
- **Kopplingarna mellan grupp och gudstjänsttid**, som avgör vilka grupper som finns tillgängliga vid vilka tider.

Dessa uppgifter lagras lokalt så att resten av incheckningsprocessen går snabbt och känns responsiv.

:::tip
Om din kyrka bara har en gudstjänst konfigurerad måste du ändå trycka på den för att gå vidare. Appen väljer inte automatiskt en gudstjänst åt dig.
:::

## Nästa steg

När du har valt en gudstjänst kommer du att [slå upp din familj](./looking-up-members.md) med telefonnummer eller namn.

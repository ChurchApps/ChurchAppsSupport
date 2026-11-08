---
title: "Planvalidering och notifieringar"
description: "Kontrollera tjänsteplaner i B1 Admin efter lediga positioner, schemakrockar och blockerade volontärer, och skicka sedan push-notiser till hela teamet med ett enda klick."
---

# Planvalidering och notifieringar till volontärer

<div class="article-intro">

B1 Admin kontrollerar automatiskt dina planer för problem innan söndagen – lediga positioner, schemakrockar och volontärer som har blockerat datumet. När allt ser bra ut kan du meddela hela ditt team med ett enda klick.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa en [tjänsteplan](./plans.md) och tilldela volontärer till positioner
- Lägg till [gudstjänsttider](./plans.md) i planen så att krockkontrollen kan hitta överlappningar
- Se till att volontärerna har [B1 App installerad](../../b1-church/getting-started/installing-pwa.md) för att kunna ta emot push-notiser

</div>

## Valideringspanelen

Varje plan har en **Validering**-panel som körs automatiskt när du bygger planen. Den kontrollerar tre saker:

### Lediga positioner
Om en position kräver fler personer än vad som för närvarande är tilldelade visar valideringspanelen exakt vad som fortfarande behövs – till exempel *"Ljudtekniker: 1 person till behövs."* Du kan se med en blick om planen är fullt bemannad innan veckan börjar.

### Schemakrockar
Om en volontär är tilldelad två positioner som överlappar i tid inom samma plan, flaggar valideringspanelen krocken – till exempel *"Jane Smith: tidskrock mellan Lovsångsledare och Barnincheckning under söndagsgudstjänsten."* Detta fångar dubbelbokningar innan de blir ett problem en söndagsmorgon.

### Blockerade datum
Volontärer kan ange datum då de inte är tillgängliga i B1 App. Om någon är tilldelad en plan som infaller under ett av deras blockerade datum visar valideringspanelen krocken automatiskt, så att du kan hitta en ersättare.

### Krockar mellan planer
Valideringen kontrollerar också alla dina planer samtidigt. Om samma volontär är tilldelad i två olika planer som överlappar i tid – till exempel en gudstjänst kl. 9 och en gudstjänst kl. 10 som båda pågår till 10.30 – markerar B1 Admin personen som dubbelbokad över planer.

:::tip
Du behöver inte göra något för att köra validering – den uppdateras automatiskt varje gång du lägger till eller ändrar en tilldelning. Håll bara ett öga på panelen medan du bygger planen.
:::

## Meddela volontärer

När planen är klar kan du meddela alla tilldelade volontärer samtidigt direkt från valideringspanelen.

1. Öppna planen och scrolla till panelen **Validering**
2. Om det finns volontärer som inte har meddelats ser du en länk som visar hur många som behöver meddelas (t.ex. *"Meddela 8 volontärer"*)
3. Klicka på länken för att skicka push-notiser till alla som ännu inte har meddelats
4. Volontärerna får en notis i sin telefon som talar om att de har blivit schemalagda och uppmanar dem att bekräfta sin tilldelning

:::info
Endast volontärer som ännu inte har meddelats inkluderas. Om du lägger till någon i planen senare visas länken igen, så att du kan meddela den nya personen utan att meddela resten av teamet på nytt.
:::

### Planer med ett bekräftelseflöde

Om planens inställningar anger ett [bekräftelseflöde](./workflows.md#serving-assignment-confirmations) visar panelen *"Nya förfrågningar använder bekräftelseflödet. Appaviseringar är fortsatt aktiverade. Uppföljningar upphör när varje förfrågan accepteras eller avböjs."* I så fall gäller följande:

- Notifieringslänken räknar bara volontärer som inte har meddelats och som inte heller har svarat ännu.
- Om du klickar på den skickas den vanliga appaviseringen och ett kort skapas för varje förfrågan på flödets tavla. Flödet skickar sedan e-post- och sms-uppföljningar och överlämnar vid behov förfrågan till någon som ska ringa.
- Planen måste vara publicerad (inte preliminär) och flödet måste vara aktivt. Annars visar panelen *"Förfrågningarna kunde inte skickas. Kontrollera att det valda flödet är aktivt och att planen är publicerad, och försök sedan igen."*

:::warning
Volontärer måste ha B1 App installerad på startskärmen och ha aviseringar aktiverade för att kunna ta emot push-notiser. Se [Installera som app (PWA)](../../b1-church/getting-started/installing-pwa.md) för installationsanvisningar.
:::

## Relaterade artiklar

- [Tjänsteplaner](./plans.md)
- [Arbetsflöden](./workflows.md)
- [Installera B1.church PWA](/docs/b1-church/getting-started/installing-pwa)

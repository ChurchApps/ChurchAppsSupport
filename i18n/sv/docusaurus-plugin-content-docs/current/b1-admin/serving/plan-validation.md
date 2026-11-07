---
title: "Planvalidering och aviseringar"
description: "Kontrollera gudstjänstplaner i B1 Admin efter obesatta positioner, schemakrockar och blockerade volontärer, och push-avisera hela teamet med ett klick."
---

# Planvalidering och aviseringar till volontärer

<div class="article-intro">

B1 Admin kontrollerar automatiskt dina planer inför söndagen och letar efter problem: obemannade positioner, schemakrockar och volontärer som har blockerat datumet. När allt ser bra ut kan du meddela hela teamet med ett enda klick.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa en [gudstjänstplan](./plans.md) och tilldela volontärer till positioner
- Lägg till [gudstjänsttider](./plans.md) i planen så att konfliktkontrollen kan upptäcka överlappningar
- Se till att volontärerna har appen B1 Mobile installerad så att de kan ta emot push-notiser

</div>

## Valideringspanelen

Varje plan har en panel för **Validering** som körs automatiskt när du bygger planen. Den kontrollerar tre saker:

### Obemannade positioner
Om en position kräver fler personer än vad som för närvarande är tilldelat listar valideringspanelen exakt vad som fortfarande behövs, till exempel *”Ljudtekniker: 1 person till behövs.”* Du ser med en blick om planen är fullt bemannad innan veckan börjar.

### Schemakrockar
Om en volontär är tilldelad två positioner som överlappar varandra i tid inom samma plan markerar valideringspanelen krocken, till exempel *”Jane Smith: tidskrock mellan Lovsångsledare och Barnincheckning under söndagsgudstjänsten.”* Det här fångar dubbelbokningar innan de blir ett problem en söndagsmorgon.

### Blockerade datum
Volontärer kan ange datum då de inte är tillgängliga i B1 Mobile. Om någon är tilldelad en plan som infaller under ett av deras blockerade datum visar valideringspanelen automatiskt krocken så att du kan hitta en ersättare.

### Krockar mellan planer
Valideringen kontrollerar också alla dina planer samtidigt. Om samma volontär är tilldelad i två olika planer som överlappar i tid, till exempel en gudstjänst kl. 9 och en gudstjänst kl. 10 som båda pågår till kl. 10.30, markerar B1 Admin personen som dubbelbokad över planer.

:::tip
Du behöver inte göra något för att köra valideringen. Den uppdateras automatiskt varje gång du lägger till eller ändrar en tilldelning. Håll bara koll på panelen medan du bygger planen.
:::

## Meddela volontärer

När planen är klar kan du meddela alla tilldelade volontärer på en gång direkt från valideringspanelen.

1. Öppna planen och scrolla till panelen **Validering**
2. Om det finns volontärer som inte har meddelats ser du en länk som visar hur många som behöver meddelas (t.ex. *”Meddela 8 volontärer”*)
3. Klicka på länken för att skicka push-notiser till alla som ännu inte har meddelats
4. Volontärerna får en notis i sin telefon som informerar dem om att de har blivit schemalagda och uppmanar dem att bekräfta sin tilldelning

:::info
Endast volontärer som ännu inte har meddelats inkluderas. Om du lägger till någon i planen senare visas länken igen så att du kan meddela den nya personen utan att meddela resten av teamet på nytt.
:::

### Planer med ett bekräftelseflöde

Om planens inställningar anger ett [bekräftelseflöde](./workflows.md#serving-assignment-confirmations) visar panelen *”Nya förfrågningar använder bekräftelseflödet. Appaviseringar är fortsatt aktiverade. Påminnelser upphör när varje förfrågan har accepterats eller avböjts.”* I så fall gäller följande:

- Länken för att meddela räknar endast volontärer som inte har meddelats och inte har svarat ännu.
- När du klickar på den skickas den vanliga appaviseringen och ett kort skapas för varje förfrågan på flödets tavla. Flödet skickar sedan e-post- och sms-påminnelser och, vid behov, överlämnar förfrågan till någon som ska ringa.
- Planen måste vara publicerad (inte preliminär) och flödet måste vara aktivt. Annars visar panelen *”Förfrågningarna kunde inte skickas. Kontrollera att det valda flödet är aktivt och att planen är publicerad, och försök sedan igen.”*

:::warning
Volontärer måste ha B1.church-upplevelsen för mobil installerad (som PWA på hemskärmen, eller den föråldrade native-appen B1 Mobile för användare som fortfarande har den) med aviseringar aktiverade för att kunna ta emot push-notiser. Se [Installera som app (PWA)](/docs/b1-church/getting-started/installing-pwa) för installationsanvisningar.
:::

## Relaterade artiklar

- [Gudstjänstplaner](./plans.md)
- [Flöden](./workflows.md)
- [Installera B1.church-PWA:n](/docs/b1-church/getting-started/installing-pwa)

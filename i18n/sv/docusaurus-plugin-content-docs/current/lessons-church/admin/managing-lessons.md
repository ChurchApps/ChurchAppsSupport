---
title: "Hantera lektioner"
---

# Hantera lektioner

<div class="article-intro">

Lektioner är de enskilda undervisningstillfällena inom en studie. Varje lektion representerar vad som sker under ett enskilt klassmöte. Det är här du bygger upp det detaljerade innehållet -- platser, avsnitt, roller och åtgärder -- som volontärer använder när de undervisar.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- [Skapa ett program](./managing-programs.md) och [lägg till en studie](./managing-studies.md) i det
- Ha administratörsbehörighet för Lessons.church (se [Översikt över administration](./index.md))

</div>

## Skapa en lektion

1. Gå till området **Admin**, expandera programmet och studien och hitta studien du vill lägga till en lektion i.
2. Klicka på **Lägg till lektion**.
3. Ange ett **Namn** och övriga uppgifter för lektionen.
4. Spara lektionen.

## Hemtagning för föräldrar

Varje lektion har ett valfritt avsnitt **Hemtagning för föräldrar** under Beskrivning. Dessa fält är det föräldrarna ser i sin B1-grupp efter lektionen (och på sidan för föräldrar i klassrummet). De är inte en andra lektionsbeskrivning.

| Fält | Syfte |
|---|---|
| **Huvudbudskap** | En mening. "Gud håller sina löften." |
| **Vers** | Referens till minnesverset och en kort text. |
| **Fråga** | En fråga för bilturen hem som föräldrar kan ställa utan något PDF-dokument. |
| **Valfri anteckning** | Extra innehåll (bönepunkt, familjeaktivitet). Markdown. Döljs när fältet är tomt. |

Huvudbudskapet och en fråga är viktigare än en översikt. Lämna alla fyra tomma om du inte har något till föräldrarna den veckan -- då visas inget.

Lägg inte föräldratext i **Beskrivning**. Beskrivningen är katalogtext för lärare som bläddrar bland lektioner på lessons.church.

## Förstå lektionens struktur

Varje lektion är uppbyggd i flera lager:

- **Platser** -- Olika versioner av lektionen för olika åldersgrupper eller sammanhang. Du kan till exempel ha en plats "Förskola" och en plats "Lågstadie" för samma lektion.
- **Avsnitt** -- Delarna inom en plats, till exempel "Välkomst", "Video", "Bibelberättelse" och "Aktivitet". Avsnitten styr flödet under lektionstiden.
- **Roller och åtgärder** -- Inom varje avsnitt tilldelar du roller (till exempel "Huvudlärare" eller "Ledare för smågrupp") och ger varje roll specifika åtgärder.

## Åtgärdstyper

Det finns fyra typer av åtgärder som du kan tilldela en roll inom ett avsnitt:

- **Säg** -- Text som volontären ska säga eller återge med egna ord för klassen.
- **Gör** -- En fysisk aktivitet eller instruktion som ska utföras.
- **Anteckning** -- Bakgrundsinformation eller en påminnelse för volontären (läses inte upp).
- **Spela** -- En video- eller ljudklipp som ska spelas upp under avsnittet.

## Lägg till en plats

1. Öppna lektionen i administratörsvyn.
2. Klicka på **Lägg till plats**.
3. Ange ett namn för platsen (t.ex. "Förskola" eller "Lågstadie").
4. Spara. Du kan nu lägga till avsnitt i den här platsen.

## Lägg till avsnitt och åtgärder

1. Expandera en plats för att se dess avsnitt.
2. Klicka på **Lägg till avsnitt** och ge det ett namn (t.ex. "Välkomst").
3. Inom avsnittet klickar du på **Lägg till åtgärd**.
4. Välj **rollen**, **åtgärdstypen** (Säg, Gör, Anteckning eller Spela) och ange innehållet.
5. Spara.

Upprepa processen för att bygga upp hela lektionsflödet.

## Ladda upp resurser på lektionsnivå

Du kan bifoga nedladdningsbara material direkt till en lektion -- till exempel ett aktivitetsblad eller en målarbild som är specifik för just den veckan.

1. Öppna lektionen i administratörsvyn.
2. Gå till avsnittet **Resurser**.
3. Ladda upp dina filer.

:::tip
Bygg din lektion utifrån volontärens perspektiv. Gå igenom avsnitten och åtgärderna i ordning och fråga dig själv om en volontär som gör det för första gången skulle kunna följa med utan någon annan förberedelse.
:::

## Relaterade artiklar

- [Hantera program](./managing-programs.md) -- Skapa den översta behållaren för läroplanen
- [Hantera studier](./managing-studies.md) -- Organisera lektioner i studiegrupper
- [Statistik](./statistics.md) -- Följ hur dina lektioner används

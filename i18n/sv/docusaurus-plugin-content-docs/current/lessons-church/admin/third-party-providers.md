---
title: "Tredjepartsleverantörer"
description: "Lägg till ett externt läroplansflöde i Lessons.church från sidan för tredjepartsleverantörer och visa, uppdatera eller ta bort anslutningar vid behov."
---

# Tredjepartsleverantörer

<div class="article-intro">

Lessons.church stöder externa läroplansleverantörer via Open Lesson Format. Det innebär att du kan importera innehåll från andra organisationer och göra det tillgängligt tillsammans med det inbyggda biblioteket, så att kyrkor får tillgång till läroplaner från flera källor på ett och samma ställe.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ha administratörsbehörighet för Lessons.church (se [Administrationsöversikten](./index.md))
- Hämta flödes-URL:en från den externa leverantör du vill ansluta

</div>

## Lägga till en leverantör

1. Gå till området **Admin**.
2. Öppna sidan **Tredje part**.
3. Klicka på **Lägg till leverantör** (eller motsvarande knapp för att lägga till en ny anslutning).
4. Ange leverantörens **flödes-URL**. Detta är den URL där leverantören publicerar sina läroplansdata i Open Lesson Format.
5. Spara anslutningen.

När anslutningen har sparats importerar Lessons.church leverantörens innehåll. Deras program, studier och lektioner visas i läroplansbiblioteket tillsammans med ditt eget innehåll.

## Hantera leverantörer

På sidan **Tredje part** ser du alla anslutna leverantörer. För varje leverantör kan du:

- **Visa** det importerade innehållet för att kontrollera att det hämtats korrekt.
- **Uppdatera** flödes-URL:en om leverantören byter slutpunkt.
- **Ta bort** en leverantör om du inte längre vill inkludera deras innehåll.

## Vad är Open Lesson Format?

Open Lesson Format är ett standardiserat schema som beskriver läroplansinnehåll – program, studier, lektioner, platser, avsnitt och åtgärder – på ett strukturerat sätt. Alla organisationer som publicerar sitt innehåll i detta format kan läggas till som leverantör i Lessons.church.

Om du är en innehållsleverantör som vill göra din läroplan tillgänglig via Lessons.church hittar du den fullständiga schemadokumentationen i guiden [Open Lesson Format](./open-lesson-format.md).

## Varför använda tredjepartsleverantörer?

- **Fler val för kyrkor** -- Kyrkor kan bläddra bland ett bredare utbud av läroplaner utan att lämna plattformen.
- **Allt på ett ställe** -- Volontärer och koordinatorer behöver inte besöka flera webbplatser för att hitta och schemalägga lektioner.
- **Enkel installation** -- Att lägga till en leverantör kräver endast en flödes-URL. Ingen manuell datainmatning eller filuppladdning behövs.

:::info
Tredjepartsinnehåll hanteras av den externa leverantören. Om du märker saknat eller föråldrat innehåll från en leverantör kan problemet behöva lösas på deras sida.
:::

:::tip
För konfiguration av externa leverantörer på kyrkonivå (inte administratörsnivå), se sidan [Externa leverantörer](../browsing/external-providers.md) i avsnittet Bläddra.
:::

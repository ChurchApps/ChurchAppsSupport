---
title: "Tredjepartsleverantörer"
description: "Lägg till ett läroplansflöde i Open Lesson Format på sidan Externa leverantörer i Lessons.church, redigera eller ta bort det så att din församling kan schemalägga dess lektioner."
---

# Tredjepartsleverantörer

<div class="article-intro">

Lessons.church stöder externa läroplansleverantörer via Open Lesson Format. Det innebär att din församling kan koppla läroplaner från andra organisationer och schemalägga dem för dina klassrum precis bredvid det inbyggda biblioteket, så att ditt team har läroplaner från flera källor på ett och samma ställe.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Logga in på Lessons.church med ett konto som kan hantera din församlings klassrumsscheman
- Hämta flödets URL från den externa leverantör du vill koppla. Den måste returnera lektioner i [Open Lesson Format](./open-lesson-format.md)

</div>

## Lägga till en leverantör

1. Klicka på **Externa leverantörer** i navigeringen i Lessons.church. Sidan **Externa lektionsleverantörer** öppnas.
2. Klicka på **Lägg till leverantör**. Om du inte har lagt till någon än klickar du på **Lägg till första leverantören** i stället.
3. Ange ett **Leverantörsnamn**. Detta är namnet ditt team ser när de väljer leverantör.
4. Ange **API-URL:en**. Det är adressen där leverantören publicerar sin läroplan i Open Lesson Format.
5. Klicka på **Spara**.

Leverantören läggs till endast för din församling. Den visas sedan som ett alternativ under **Leverantör** när du [schemalägger en lektion](../classrooms/scheduling-lessons.md) för ett klassrum, och under **Källa** när du skapar en [årsplan](./managing-year-plans.md).

## Hantera leverantörer

Sidan **Externa lektionsleverantörer** visar alla leverantörer din församling har lagt till. Så här ändrar du en:

- **Redigera** -- Klicka på ikonen **Redigera leverantör** (penna), ändra **Leverantörsnamn** eller **API-URL** och klicka på **Spara**.
- **Ta bort** -- Klicka på ikonen **Redigera leverantör**, klicka sedan på ikonen för borttagning (papperskorg) och bekräfta.

## Vad är Open Lesson Format?

Open Lesson Format är ett standardiserat schema som beskriver läroplansinnehåll -- program, studier, lektioner, platser, avsnitt och åtgärder -- på ett strukturerat sätt. Alla organisationer som publicerar sitt innehåll i detta format kan läggas till som leverantör i Lessons.church.

Om du är innehållsleverantör och vill göra din läroplan tillgänglig via Lessons.church hittar du hela schemadokumentationen i guiden [Open Lesson Format](./open-lesson-format.md).

## Varför använda tredjepartsleverantörer?

- **Fler val för församlingar** -- Församlingar kan bläddra bland ett bredare utbud av läroplaner utan att lämna plattformen.
- **Ett ställe för allt** -- Volontärer och koordinatorer behöver inte besöka flera webbplatser för att hitta och schemalägga lektioner.
- **Enkel installation** -- Att lägga till en leverantör kräver bara ett namn och en flödes-URL. Ingen manuell datainmatning eller filuppladdning behövs.

:::info
Innehåll från tredje part hanteras av den externa leverantören. Om du märker att innehåll från en leverantör saknas eller är föråldrat kan problemet behöva lösas hos dem.
:::

:::tip
För att lära dig hur lektioner från en extern leverantör ser ut när de har schemalagts, se [Externa leverantörer](../browsing/external-providers.md) i avsnittet Bläddra.
:::

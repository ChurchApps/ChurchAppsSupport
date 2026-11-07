---
title: "Blogg"
---

# Blogg

<div class="article-intro">

Sidan Blogg låter dig publicera nyheter, uppdateringar och andaktstexter på din kyrkas webbplats. Inläggen visas i en kortlista på `/blog`, på sin egen URL och i ett RSS-flöde som andra verktyg (till exempel Zapier) kan bevaka för nya inlägg.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Slutför [Grundinställningar](initial-setup) för din webbplats
- Lägg till en navigeringslänk till `/blog` från [Hantera sidor](managing-pages) om du vill att besökare ska hitta din blogg via menyn

</div>

## Öppna bloggen

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet högst upp till vänster) och expanderar **Webbplats**.
2. Klicka på **Blogg**.
3. Sidan Blogg listar alla inlägg tillsammans med deras status och publiceringsdatum.

## Lägga till ett inlägg

1. Klicka på **Lägg till inlägg** i det övre högra hörnet.
2. Ange en **Titel**. En webbadress (slug) som är anpassad för URL:er genereras automatiskt när du skriver -- du kan redigera den direkt om du vill ha en annan adress.
3. Lägg till en **Ingress** -- en kort sammanfattning som visas i inläggslistan, i metabeskrivningar och i RSS-flödet. Lämnas fältet tomt genereras en automatiskt från början av inläggets innehåll.
4. Skriv inläggets text i redigeraren **Innehåll** med Markdown. Klicka på **Förhandsgranska** för att se hur det formaterade inlägget kommer att se ut.
5. Välj en **Kategori** (välj en befintlig eller skriv en ny) och valfria **Taggar**, separerade med kommatecken.
6. Klicka på **Välj bild** för att välja ett foto från ditt bildarkiv under [Filer](files), eller ladda upp en ny. Uppladdade foton öppnas i ett inbyggt beskärningsverktyg som är låst till 16:9, så att du kan rama in valfritt foto så att det passar inläggets rubrikbild och listkort.
7. Ange **Författare** -- som standard är det du, men du kan söka efter och välja vilken person som helst i din databas.
8. Aktivera **Publicerad** och ange ett **Publiceringsdatum** när du är redo att göra inlägget offentligt. Stäng av den för att spara inlägget som utkast.

:::tip
Ange ett **Publiceringsdatum** i framtiden för att schemalägga ett inlägg. Det är dolt för besökare och visar en **Schemalagd**-etikett i bloggListan tills det datumet infaller.
:::

## Inläggens status

Varje inlägg i listan visar en av tre statusar:

- **Utkast** -- Inte publicerat. Syns bara i administrationen.
- **Schemalagd** -- Publicerad är påslaget, men publiceringsdatumet ligger i framtiden.
- **Publicerad** -- Live på din webbplats och med i RSS-flödet.

## Redigera, förhandsgranska och ta bort inlägg

- Klicka på **Redigera** bredvid ett inlägg för att göra ändringar.
- Klicka på **Visa på webbplatsen** (visas för publicerade inlägg) för att öppna det publicerade inlägget på din webbplats i en ny flik.
- Klicka på **Ta bort** för att permanent radera ett inlägg.

## Så ser besökare din blogg

Publicerade inlägg visas på `{yoursite}/blog`, 10 per sida, med länkarna **Äldre** och **Nyare** för att bläddra i arkivet. Där finns också ett kategorifilter, och varje inläggs författarrad och foto visas. Taggar visas även som klickbara etiketter, så att besökare kan filtrera listan efter tagg på samma sätt. Enskilda inlägg finns på `{yoursite}/blog/{slug}` och inkluderar relaterade inlägg från samma kategori. Bloggsidan publicerar också ett RSS-flöde som automatiskt kan hittas av flödesläsare och automationsverktyg som Zapier.

:::info
Blogginlägg är en egen innehållstyp, skild från vanliga webbsidor -- de skapas inte i [sidredigeraren](page-editor) och visas inte i listan över sidor. Detta gör att skrivandet i bloggen går snabbt och fokuserat på själva texten.
:::

## Lägga till kommentarer under inlägg

B1 är inte värd för bloggkommentarer själv, men du kan lägga till en kommentarstjänst. Du kan också lägga in något annat under varje inlägg, till exempel en nyhetsbrevsanmälan eller en gåvoknapp.

1. Registrera dig hos en kommentarstjänst, som [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) eller [Disqus](https://disqus.com), och kopiera dess inbäddningskod.
2. På sidan Blogg, scrolla till **Under varje inlägg**.
3. Klistra in inbäddningskoden och klicka på **Spara**.

Koden visas under innehållet i varje publicerat inlägg. Din kommentarstjänst sköter modereringen och skräppostfiltreringen, så kontrollera dess instrumentpanel regelbundet.

:::tip
Töm rutan och klicka på **Spara** för att ta bort koden från alla inlägg. Det är bara personer som kan redigera kyrkoinställningar som ser den här rutan.
:::

## Nästa steg

- [Hantera sidor](managing-pages) -- Lägg till en navigeringslänk till din blogg
- [Filer](files) -- Ladda upp foton att använda i dina inlägg
- [Zapier-integration](../integrations/zapier.md) -- Utlös automationer när nya inlägg publiceras

---
title: "Utseende"
description: "Ange färger, typsnitt, avstånd, logotyp och navigering för din kyrkowebbplats i B1 Admin, samt widgetar, GA4-analys, omdirigeringar och anpassad CSS."
---

# Utseende

<div class="article-intro">

Sidan Utseende låter dig anpassa hela din kyrkas webbplats utseende och känsla. Från färger och typsnitt till avstånd och anpassad CSS kan du styra varje visuell del av din webbplats från ett och samma ställe.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Slutför [Första inställningen](./initial-setup.md) för din webbplats
- Ha din kyrkas logotyp redo i PNG-format med transparent bakgrund och bildförhållandet 4:1
- Känn till din kyrkas varumärkesfärger (hexvärden) om du har en befintlig stilguide

</div>

## Öppna utseendeinställningar

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster) och expanderar **Webbplats**.
2. Klicka på **Utseende**.
3. Sidan **Webbplatsstilar** öppnas. Kortet **Tema, typsnitt och sidfot** visar listan **Stilinställningar** till vänster och en förhandsvisning av en exempelwebbplats till höger. Under det finns korten **Meddelande och widgetar** och **Omdirigeringar och analys**.

## Färgpalett {#color-palette}

1. Klicka på **Färgpalett** i panelen Stilinställningar.
2. Du ser **Basfärger** (ljusa, accent- och mörka nyanser) och **Semantiska färger** (Primär, Sekundär, Lyckad, Varning och Fel).
3. Klicka på en färgruta för att öppna färgväljaren. Dra reglaget eller ange ett hexvärde för att välja din färg.
4. **Förhandsvisning av färgkombinationer** visar hur dina valda färger fungerar tillsammans.
5. Använd **Föreslagna paletter** för att snabbt tillämpa ett färdigdesignat färgschema.
6. Klicka på **Spara palett** när du är nöjd.

## Typografi

1. Klicka på **Typsnitt** i panelen Stilinställningar.
2. Klicka på knappen **Rubriktypsnitt** eller **Brödtextstypsnitt** för att öppna typsnittsbläddraren. Du kan söka efter namn eller bläddra bland kategorier som Serif, Sans Serif, Display, Handskrift och Monospace. Du kan också välja en av **Populära typsnittskombinationer**.
3. Klicka på **Spara typsnitt** för att tillämpa dina typsnittsval.
4. Om du vill justera storleksordningen för Rubrik 1 till Rubrik 4 klickar du på **Typografiskala** i panelen Stilinställningar. Använd fälten **Typskalsmultiplikator**, **Basstorlek** och **Radavstånd** för att finjustera och klicka sedan på **Spara typografi**.

## Avstånd

1. Klicka på **Avståndsskala** i panelen Stilinställningar.
2. Justera avståndsvärdena från Extra liten till Extra stor. Praktiska exempel visar hur varje värde påverkar layouten.
3. Klicka på **Spara avstånd** för att tillämpa värdena på hela din webbplats.

## Logotyp och varumärke {#logo-and-branding}

1. Klicka på **Logotyp** i panelen Stilinställningar.
2. Ladda upp din **Logotyp för ljus bakgrund** och **Logotyp för mörk bakgrund**. Använd bilder med transparent bakgrund och bildförhållandet 4:1 för bästa resultat.
3. Ladda upp en **Bild för sociala medier** för förhandsvisningar av länkar och en **Favicon** för ikonen i webbläsarfliken.
4. Klicka på **Spara ändringar**. Uppladdade bilder sparas inte förrän du sparar, så om du försöker stänga eller ladda om webbläsarfliken först visar webbläsaren en varning om osparade ändringar.

:::tip
För bästa resultat, använd en logotyp med transparent bakgrund i PNG-format. Då ser den bra ut på både ljusa och mörka bakgrunder på din webbplats och i [mobilappen](../settings/mobile-app.md).
:::

## Navigeringsstilar

Anpassa färgerna på din webbplats navigeringsfält för både fast och transparent läge:

1. Klicka på **Navigering** i panelen Stilinställningar
2. Konfigurera färgerna för **Sidhuvud (fast)** och **Sidhuvud över hero (transparent)**
3. Klicka på **Spara navigering** för att tillämpa dina navigeringsfärger

För detaljerade anvisningar, se [Navigeringsstilar](./navigation-styles.md).

## Meddelande och widgetar

Webbplatswidgetar visas på varje sida på din webbplats och svävar ovanför sidans innehåll:

- **Meddelandebanner** -- En avfärdbar rad överst på din webbplats för tidskänsliga meddelanden, till exempel ett kommande evenemang eller en ändring av gudstjänsten.
- **Startknapp** -- En flytande knapp som öppnar en snabbmeny, till exempel med länkar för att ge, checka in eller visa veckobladet.

1. Hitta kortet **Meddelande och widgetar** under Stilinställningarna.
2. Aktivera de widgetar du vill ha och konfigurera deras text, länkar och färger.
3. Klicka på **Spara**.

## Omdirigeringar och analys

Kortet **Omdirigeringar och analys** (under Stilinställningarna) innehåller två olika men ofta behövda inställningar:

- **Analys** -- Lägg till ditt **GA4-mätnings-ID** (formatet `G-XXXXXXXXXX`) för att spåra besökstrafiken på din webbplats. Samma ID spårar även sidvisningar i din kyrkas B1-app (medlemsportalen på `/mobile`, inklusive den installerade appen), taggade med `display_mode` som antingen `installed` eller `browser`, så att du i Google Analytics kan skilja besök från den installerade appen från besök i webbläsaren.
- **Omdirigeringar** -- Koppla en gammal URL-sökväg till en ny, så att länkar till en sida du flyttat eller bytt namn på fortsätter att fungera i stället för att ge ett 404-fel. Ange den gamla sökvägen under **Från** och den nya under **Till**, och klicka sedan på **Spara**. En omdirigering prioriteras också framför B1:s inbyggda sidor (`/sermons`, `/stream`, `/donate`, `/bible` och `/votd`), så att du kan skicka den adressen någon annanstans (till exempel till din egen predikansida eller en YouTube-kanal). Den åsidosätter inte en sida du själv har skapat på samma adress. Ta bort den sidan först om du vill att omdirigeringen ska gälla.

## Anpassad CSS och JavaScript

1. Klicka på **CSS och Javascript** i panelen Stilinställningar.
2. Lägg till **Anpassad CSS** för att åsidosätta standardstilar för avancerad anpassning.
3. Lägg till **Anpassad HTML** för spårningskoder eller andra skript.
4. Använd avsnittet **Vanliga JavaScript-exempel** för kodavsnitt, till exempel integrering av Google Analytics.

:::warning
Anpassad CSS är kraftfull men kan bryta din webbplats layout om den används felaktigt. De flesta kyrkor kan uppnå det utseende de vill ha med hjälp av de inbyggda kontrollerna för färg, typsnitt och avstånd. Använd bara anpassad CSS om du är bekväm med webbutveckling.
:::

:::info
Din webbplats använder en Content Security Policy som blockerar inline-skript från alla andra källor. Fältet **Anpassad HTML** här, och [HTML-elementet](./page-editor.md#using-the-html-element) på enskilda sidor, är de betrodda undantagen -- kod du sparar där körs som den är, så klistra bara in skript från källor du litar på (analysspårningar, chattwidgetar och liknande inbäddningar).
:::

## Temateman

Om du vill ha en snabb startpunkt erbjuder **Föreslagna paletter** i avsnittet Färgpalett färdiga teman som ställer in samordnade färger med ett enda klick. Du kan alltid finjustera enskilda inställningar efter att du har tillämpat ett tema.

## Nästa steg

- [Hantera sidor](./managing-pages.md) -- Skapa och organisera webbplatsens sidor
- [Filer](./files.md) -- Ladda upp mediefiler för din webbplats

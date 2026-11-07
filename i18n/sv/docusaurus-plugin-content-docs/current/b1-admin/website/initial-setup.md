---
title: "Första installationen"
---

# Första installationen

<div class="article-intro">

Varje B1-konto kommer med en webbplats som är redo att användas. Den här guiden visar hur du konfigurerar din kyrkas domän, anpassar webbplatsens utseende, skapar dina första sidor och organiserar navigeringen.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver ett B1.church-konto med administratörsbehörighet
- Om du använder en egen domän bör du ha inloggningsuppgifterna till din DNS-leverantör till hands (t.ex. GoDaddy, Cloudflare eller AWS)
- Förbered din kyrkas logotyp i PNG-format med transparent bakgrund för bästa resultat

</div>

## Konfigurera din domän

Din kyrka får automatiskt en subdomän på B1.church (till exempel `dinkyrka.b1.church`). Du kan också peka din egen domän mot din B1-webbplats.

1. Gå till **B1.church Admin** genom att besöka admin.b1.church eller klicka på din profilmeny och välja **Byt app**.
2. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), expandera **Inställningar** och klicka på **Inställningar**.
3. Öppna avsnittet **Kyrkoinformation** för att se din subdomän. Ange något kort och lätt igenkännligt utan mellanslag.
4. Om du vill använda en egen domän loggar du in hos din DNS-leverantör (till exempel GoDaddy, Cloudflare eller AWS) och lägger till två poster:
   - En **A-post** för din rotdomän som pekar mot `3.23.251.61`
   - En **CNAME-post** för `www` som pekar mot `proxy.b1.church`
5. Gå tillbaka till B1.church Admin, öppna avsnittet **Domäner** på samma inställningssida, lägg till din egen domän i listan och klicka på **Lägg till** och sedan **Spara**. Din webbplats bör vara tillgänglig via din egen domän inom några minuter.

:::tip
Om du inte ser alternativet Inställningar ber du den person som konfigurerade ditt kyrkkonto att ge dig behörigheten "Redigera kyrkans inställningar". Se [Roller och behörigheter](../settings/roles-permissions.md) för mer information.
:::

## Skapa din första sida

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), expanderar **Webbplats** och klickar på **Sidor**.
2. Klicka på **Lägg till sida** i det övre högra hörnet.
3. Välj **Tom** som sidtyp och ge den namnet "Startsida".
4. Klicka på **Sidinställningar** och ange URL-sökvägen till `/` (ett snedstreck utan text) för din startsida. Andra sidor använder `/sidnamn`.
5. Klicka på **Redigera innehåll** för att börja bygga sidan. Varje sida måste börja med en **Sektion** -- det är behållaren för alla andra element.
6. När du har lagt till en sektion klickar du på **Lägg till innehåll** igen för att infoga text, bilder, videor, kort, formulär och mycket mer genom att dra dem till din sektion.

:::info
För detaljerade instruktioner om att arbeta med sidor och navigering, se [Hantera sidor](managing-pages). För en fullständig guide till den visuella editorn, se [Använda sidredigeraren](page-editor).
:::

## Konfigurera webbplatsens utseende

1. I Hoppmenyn väljer du **Webbplats > Utseende**.
2. Använd **Färgpaletten** för att ange dina varumärkesfärger för primära, sekundära och accenttoner.
3. Under **Typsnitt** väljer du rubriktypsnitt och brödtextstypsnitt i typsnittsväljaren.
4. Ladda upp din kyrkas logotyp under **Logotyp** i stilinställningarna. Ange både en version för ljus bakgrund och en version för mörk bakgrund.
5. Konfigurera din **Sidfot** med din kyrkas kontaktuppgifter och länkar.

:::info
Ändringar du gör under Utseende gäller för hela din webbplats. Se sidan [Utseende](appearance) för detaljerade instruktioner om varje inställning.
:::

## Konfigurera navigeringen

Dina navigeringslänkar visas i vyn Webbplatssidor. Så här organiserar du dem:

1. Klicka på **Lägg till** för att skapa en ny navigeringslänk och peka den mot en av dina sidor.
2. Dra och släpp länkar för att ändra ordningen eller placera dem under överordnade objekt.
3. Förhandsgranska din webbplats för att kontrollera att navigeringen ser rätt ut.

## Nästa steg

- [Hantera sidor](managing-pages) -- Lär dig mer om hur du arbetar med sidor och navigering
- [Utseende](appearance) -- Finjustera din webbplats färger, typsnitt och layout
- [Filer](files) -- Ladda upp bilder och dokument till din webbplats

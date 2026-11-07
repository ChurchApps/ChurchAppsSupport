---
title: "Inställningar för mobilappen"
---

# Inställningar för mobilappen

<div class="article-intro">

Sidan Inställningar för mobilappen låter dig konfigurera navigeringsflikarna som visas i **B1.church-mobilupplevelsen (PWA)** för dina kyrkomedlemmar. Du styr vilka flikar som syns, vart de länkar och hur de visas.

</div>

## Utbildningsvideo

<YouTube id="ydY7WGK16fE" title="Anpassa din kyrkas medlemsapp i B1" />

:::info Den ursprungliga appen B1 Mobile är föråldrad
Flikar som konfigureras här levereras via [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), som har ersatt den ursprungliga appen B1 Mobile. Dela din kyrkas installationssida — `https://yourchurchname.b1.church/mobile/install` — med medlemmarna. Den guidar dem genom att installera appen på sin enhet, utan att någon nedladdning från App Store eller Google Play krävs.
:::

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörigheten "Redigera kyrkoinställningar". Se [Roller och behörigheter](./roles-permissions.md) om du saknar åtkomst.
- Konfigurera först dina [kyrkoinställningar](./church-settings.md), inklusive kyrkans namn och grafiska profil.

</div>

## Åtkomst till navigeringsinställningar

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet uppe till vänster) och expanderar **Mobil**.
2. Klicka på **Navigering** (`/mobile/navigation`).
3. Sidan Navigering visar dina aktuella flikar i appen.

## Lägga till en ny flik

1. Klicka på knappen **Lägg till flik** högst upp på sidan.
2. Fyll i uppgifterna för fliken:
   - **Namn** -- Texten som visas på fliken (till exempel "Predikningar" eller "Ge").
   - **Ikon** -- Klicka på ikonväljaren för att välja en ikon för fliken.
   - **Bild** -- Klicka på **Välj bild** (eller **Byt bild**) för att ge fliken ett foto. Flikar med foto visas som fotobrickor på appens startskärm -- se [Brickor på startskärmen](#home-screen-tiles).
   - **Typ av flik** -- Välj bland alternativ som Bibel, Livesändning, Gåva, Webbplats med flera.
   - **URL** -- Ange webbadressen som fliken ska länka till.
   - **Synlighet** -- Styr vem som kan se fliken (alla, endast medlemmar osv.). För en flik **Medlemskatalog** styr detta endast vem som ser själva fliken. Vem som kan öppna katalogen ställs in med **Visa i katalogen** på sidan Medlemsportal (se [Inställningar för medlemskatalog och meddelanden](#member-directory--messaging-settings)).
3. Klicka på **Spara flik** för att lägga till den i appen.

## Redigera en befintlig flik

1. Klicka på valfri befintlig flik i listan **Appflikar**.
2. Uppdatera fliken namn, ikon, URL, typ eller synlighetsinställningar.
3. Klicka på **Spara flik** för att tillämpa ändringarna.

## Ändra ordning på flikar

Du kan ändra i vilken ordning flikarna visas i mobilappen. Dra och släpp flikar i listan för att ordna om dem. Ordningen på den här sidan motsvarar den ordning dina medlemmar ser i appen.

:::info
Vissa flikar kan visas automatiskt när vissa villkor är uppfyllda. Till exempel kan en flik för livesändning dyka upp när en sändning pågår. Manuellt tillagda flikar ger dig full kontroll över vad dina medlemmar ser hela tiden.
:::

:::tip
Håll antalet flikar överskådligt. Tre till fem flikar fungerar bra för de flesta kyrkor. För många flikar kan göra navigeringen förvirrande för dina medlemmar.
:::

## Inställningar för medlemskatalog och meddelanden

Fliken **Medlemsportal** i samma avsnitt Mobil innehåller inställningarna som styr medlemskatalogen och privata meddelanden i B1.church-upplevelsen:

- **Godkännandegrupp för katalogen** -- Gruppen som granskar uppdateringar av medlemskatalogen och [begäran om kontoradering](../profile/account-deletion.md) innan de träder i kraft.
- **Visa i katalogen** -- Vem som kan öppna medlemskatalogen och vem som finns med i den: **Endast administratörer**, **Medlemmar och högre** (standard), **Regelbundna besökare och högre** eller **Besökare och högre**. Personer vars medlemsstatus ligger under den nivå du väljer ser inte katalogen och finns inte med i den. **Endast administratörer** stänger katalogen för alla utom personal med behörigheten Personer &gt; Visa (en medlemsstatus Personal räcker inte ensam). Dessa kan alltid öppna katalogen och se alla, oavsett inställning här. Gäster ingår aldrig, eftersom den som registrerar sig själv online börjar som gäst.
- **Synlighetsinställning** -- Anger standardvärdet för hela kyrkan för medlemmar som ännu inte har valt sin egen inställning. **Adress**, **Telefonnummer** och **E-post** har var sin rullgardinsmeny, med samma fem nivåer som finns överallt där synlighet ställs in:
  - **Alla** -- synlig för alla, inklusive anonyma besökare
  - **Medlemmar** -- synlig endast för personer med en post som Medlem eller Personal
  - **Endast gruppen** -- synlig endast för personer som delar en grupp med den här personen, samt personal
  - **Mina gruppledare och personal** -- synlig endast för ledare i en grupp den här personen tillhör, samt personal
  - **Endast personal** -- synlig endast för personal (alla vars medlemsstatus är Personal, eller som har behörigheten Personer &gt; Visa) och för personen själv

  "Personal" i dessa nivåer avser alla vars medlemsstatus är Personal eller som har behörigheten Personer &gt; Visa. Gruppändringar träder i kraft direkt: den som går med i en grupp, eller görs till gruppledare, kan se de motsvarande detaljerna **Endast gruppen** eller **Mina gruppledare och personal** för medlemmarna i gruppen, utan att logga ut och in igen.

  Medlemmar kan åsidosätta dessa standardvärden för sin egen post under fliken **Integritet** i sin profil i B1.church PWA. Se [Redigera din profil](/docs/b1-church/getting-started/me-page).
- **Lägsta ålder för privata meddelanden** -- En kontroll för barnsäkerhet. B1 öppnar inte en **ny** privat meddelandekonversation om någon av personerna är under denna ålder, baserat på födelsedatum (hushållsroll används som reserv när inget födelsedatum finns registrerat). Personer under åldersgränsen är fortfarande fullt synliga i katalogen. Endast direktmeddelanden blockeras, i **båda riktningarna**, för alla, inklusive personal. Gruppkonversationer och meddelanden till ett barns föräldrar fungerar fortfarande. Alternativen är Av, 13, 16 eller 18. Standardvärdet är **18**. Befintliga konversationer påverkas inte.

:::tip
Eftersom kontrollen av åldersgränsen bygger på födelsedatum bör du se till att födelsedatum är ifyllda för barn i din församling. Den här inställningen hör till samma familj av barnsäkerhetskontroller som [säkerhetskontrollerna för incheckning](../attendance/checkin-safety.md).
:::

### Inloggningsuppmaning på startskärmen

Besökare som öppnar appens [startskärm](/docs/b1-church/getting-started/navigating#home) utan att logga in ser en kort uppmaning -- som standard *"Logga in för att se dina grupper, gåvor och mer."* -- bredvid en knapp **Logga in**. Inställningarna för **Inloggningsuppmaning på startskärmen** på samma sida Medlemsportal (`/mobile/b1-mobile`) låter dig ändra den:

- **Visa inloggningsuppmaning på appens startskärm** -- Stäng av detta för att dölja både uppmaningen och knappen **Logga in** på startskärmen. Besökare kan fortfarande logga in via appens meny.
- **Text för inloggningsuppmaning** -- Ersätt standardtexten med ett eget meddelande (högst 150 tecken). Lämna tomt för att använda standardtexten. Rutan är inaktiverad när uppmaningen är avstängd.

Klicka på **Spara** för att tillämpa. Ett meddelande **Sparat** bekräftar ändringen. Vid sparande uppdateras appens cachade inställningar, så ändringen syns nästa gång startskärmen laddas.

### Brickor på startskärmen

Flikar som har ett foto (se **Bild** under [Lägga till en ny flik](#adding-a-new-tab)) visas på appens [startskärm](/docs/b1-church/getting-started/navigating#home) som fotobrickor, i en sektion med din kyrkas namn som rubrik. Detta gäller även en flik för Dagens vers, om du ger den ett foto. Flikar med foto visas även i flikraden.

Inställningen **Brickor på startskärmen** på samma sida Medlemsportal (`/mobile/b1-mobile`) styr hur brickorna är placerade. Välj en **Layout**:

- **Rutnät** -- Två brickor per rad (standard). När antalet brickor är udda tar den första brickan upp hela bredden.
- **Rullande rad** -- En rad med brickor som medlemmar sveper i sidled.
- **Rullande (automatiskt)** -- Samma rad i sidled, men den rör sig också av sig själv och går vidare en bricka ungefär var fjärde sekund och börjar om från början när den nått slutet. Den pausar när en medlem rör vid, för musen över eller tabbar in i raden, och fortsätter några sekunder senare. På enheter som är inställda på reducerad rörelse står raden stilla och fungerar som **Rullande rad**.
- **Lista** -- En lista med en liten fotominiatyr bredvid varje flikas namn.

Klicka på **Spara** för att tillämpa.

### Sektioner på startskärmen

Inloggade medlemmar ser alltid sin egen närvarohistorik och sina inskickade formulär på sidan [Mig](/docs/b1-church/getting-started/me-page). Reglagen för **Sektioner på startskärmen** på samma sida Medlemsportal (`/mobile/b1-mobile`) kan visa dem på startskärmen också:

- **Visa Min närvaro på startskärmen** -- Lägger till en sektion **Min närvaro** med hur många gånger medlemmen har varit närvarande de senaste 90 dagarna, deras två senaste besök och en länk **Historik** till hela deras närvarolista.
- **Visa Mina formulär på startskärmen** -- Lägger till en sektion **Mina formulär** med medlemmens två senaste formulärinskickningar och en länk **Alla formulär**.

Båda är avstängda som standard. En sektion visas endast för medlemmar som är inloggade och har minst en post att visa. Klicka på **Spara** för att tillämpa.

## Var flikarna visas

Flikarna du konfigurerar här visas i **B1.church PWA** som dina medlemmar installerar från valfri sida på `https://yourchurchname.b1.church`. Ändringar du gör på den här sidan syns nästa gång en medlem öppnar appen.

På en telefon visar den nedre flikraden **Startsida**, upp till tre av dina flikar och **Mer**. På en dator visar sidhuvudet upp till fem. Inbyggda skärmar (till exempel Predikningar, Ge eller Grupper) får platserna först, och flikar av typen **Intern sida** fyller eventuella lediga platser. Flikar av typen **Extern URL** och **Dagens vers** får aldrig en plats. Varje flik, även de som inte får plats, visas på appens sida **Mer**. Se [Navigera i B1App](/docs/b1-church/getting-started/navigating) för vad medlemmar ser. (Flikar återges även av den äldre [B1 Mobile-appen](/docs/b1-mobile/) för medlemmar som fortfarande använder den, men den appen är föråldrad och uppdateras inte längre.)

## Nästa steg

- [Kyrkoinställningar](./church-settings.md) -- Konfigurera kyrkans information och grafiska profil
- [Roller och behörigheter](./roles-permissions.md) -- Hantera åtkomst för ditt team

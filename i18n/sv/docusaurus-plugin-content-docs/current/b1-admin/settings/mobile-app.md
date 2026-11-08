---
title: "Inställningar för mobilappen"
description: "Konfigurera navigeringsflikarna, brickorna på startskärmen, inloggningsuppmaningen och integritetsinställningarna för medlemskatalogen i B1.church-medlemsappen i B1 Admin."
---

# Inställningar för mobilappen

<div class="article-intro">

Sidan Inställningar för mobilappen låter dig konfigurera navigeringsflikarna som visas i **B1.church-mobilupplevelsen (PWA)** för dina medlemmar. Du bestämmer vilka flikar som är synliga, vart de leder och hur de visas.

</div>

## Utbildningsvideo

<YouTube id="ydY7WGK16fE" title="Anpassa din kyrkas medlemsapp i B1" />

:::info
Flikar som konfigureras här visas i B1-appen, som medlemmar kan [installera som en progressiv webbapp (PWA)](../../b1-church/getting-started/installing-pwa.md). Dela din kyrkas installationssida — `https://yourchurchname.b1.church/mobile/install` — med medlemmarna. Där guidas de genom att installera appen på sin enhet, utan att någon nedladdning från App Store eller Google Play krävs.
:::

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörigheten "Redigera kyrkoinställningar". Se [Roller och behörigheter](./roles-permissions.md) om du saknar åtkomst.
- Konfigurera först dina [kyrkoinställningar](./church-settings.md), inklusive kyrkans namn och varumärkesprofil

</div>

## Öppna navigeringsinställningarna

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet längst upp till vänster) och expanderar **Mobil**.
2. Klicka på **Navigering** (`/mobile/navigation`).
3. Sidan Navigering visar dina nuvarande appflikar.

## Lägga till en ny flik

1. Klicka på knappen **Lägg till flik** högst upp på sidan.
2. Fyll i flikens uppgifter:
   - **Namn** -- Etiketten som visas på fliken (till exempel "Predikningar" eller "Ge").
   - **Ikon** -- Klicka på ikonväljaren för att välja en ikon till fliken.
   - **Bild** -- Klicka på **Välj bild** (eller **Byt bild**) för att ge fliken en bild. Flikar med bild visas som bildbrickor på appens startskärm -- se [Brickor på startskärmen](#home-screen-tiles).
   - **Fliktyp** -- Välj bland alternativ som Bibel, Livesändning, Gåva, Webbplats med mera.
   - **URL** -- Ange webbadressen som fliken ska länka till.
   - **Synlighet** -- Styr vem som kan se fliken (alla, endast medlemmar osv.). För en flik av typen **Medlemskatalog** styr detta endast vem som ser fliken själv. Vem som kan öppna katalogen ställs in med **Visa i katalog** på sidan Medlemsportal (se [Inställningar för medlemskatalog och meddelanden](#member-directory--messaging-settings)).
3. Klicka på **Spara flik** för att lägga till den i din app.

## Redigera en befintlig flik

1. Klicka på en befintlig flik i listan **Appflikar**.
2. Uppdatera fliknamn, ikon, URL, typ eller synlighetsinställningar.
3. Klicka på **Spara flik** för att tillämpa ändringarna.

## Ändra ordning på flikarna

Du kan ändra i vilken ordning flikarna visas i mobilappen. Dra och släpp flikar i listan för att ordna om dem. Ordningen som visas på denna sida motsvarar den ordning som dina medlemmar ser i appen.

:::info
Vissa flikar kan visas automatiskt när vissa villkor uppfylls -- till exempel kan en flik för Livesändning dyka upp när en sändning pågår. Manuellt tillagda flikar ger dig full kontroll över vad dina medlemmar ser hela tiden.
:::

:::tip
Håll antalet flikar överskådligt. Tre till fem flikar fungerar bra för de flesta kyrkor. För många flikar kan göra navigeringen förvirrande för dina medlemmar.
:::

## Inställningar för medlemskatalog och meddelanden

Objektet **Medlemsportal** i samma avsnitt Mobil innehåller inställningarna som styr medlemskatalogen och privata meddelanden i B1.church-upplevelsen:

- **Godkännandegrupp för katalogen** -- Gruppen som granskar uppdateringar i medlemskatalogen, och [begäranden om kontoradering](../profile/account-deletion.md), innan de träder i kraft.
- **Visa i katalog** -- Vem som kan öppna medlemskatalogen och vem som finns med i den: **Endast administratörer**, **Medlemmar och högre** (standard), **Regelbundna deltagare och högre** eller **Besökare och högre**. Personer vars medlemsstatus ligger under nivån du väljer ser inte katalogen och finns inte med i den. **Endast administratörer** stänger katalogen för alla utom personal med behörigheten Personer &gt; Visa (en medlemsstatus Personal ensam räcker inte). Dessa kan alltid öppna katalogen och se alla, oavsett hur denna inställning är satt. Gäster ingår aldrig, eftersom alla som registrerar sig själva online börjar som gäster.
- **Synlighetsinställning** -- Anger standardinställningen för hela kyrkan för medlemmar som ännu inte har valt sin egen. **Adress**, **Telefonnummer** och **E-post** har var sin rullgardinsmeny, med samma fem nivåer som finns överallt där synlighet ställs in:
  - **Alla** -- synlig för alla, inklusive anonyma besökare
  - **Medlemmar** -- synlig endast för personer med en post som Medlem eller Personal
  - **Endast gruppen** -- synlig endast för personer som delar en grupp med denna person, samt personal
  - **Mina gruppledare och personal** -- synlig endast för ledare i en grupp som denna person tillhör, samt personal
  - **Endast personal** -- synlig endast för personal (alla vars medlemsstatus är Personal, eller som har behörigheten Personer &gt; Visa), samt för personen själv

  "Personal" i dessa nivåer avser alla vars medlemsstatus är Personal eller som har behörigheten Personer &gt; Visa. Gruppändringar träder i kraft direkt: den som går med i en grupp, eller görs till gruppledare, kan se de motsvarande detaljerna **Endast gruppen** eller **Mina gruppledare och personal** för gruppens medlemmar, utan att logga ut och in igen.

  Medlemmar kan åsidosätta dessa standardinställningar för sin egen post från fliken **Integritet** i sin profil i B1.church PWA -- se [Redigera din profil](/docs/b1-church/getting-started/me-page).
- **Lägsta ålder för privata meddelanden** -- En barnsäkerhetskontroll. B1 öppnar inte en **ny** privat meddelandekonversation när någon av personerna är under denna ålder, baserat på deras födelsedatum (hushållsrollen används som reserv när inget födelsedatum finns registrerat). Personer under åldern förblir helt synliga i katalogen -- endast direktmeddelanden blockeras, i **båda riktningarna**, för alla, inklusive personal. Gruppkonversationer och meddelanden till ett barns föräldrar fungerar fortfarande. Alternativen är Av, 13, 16 eller 18; standardvärdet är **18**. Befintliga konversationer påverkas inte.

:::tip
Eftersom kontrollen av minimiålder bygger på födelsedatum bör du se till att födelsedatum är ifyllda för barnen i din församling. Denna inställning hör till samma familj av barnsäkerhetskontroller som [säkerhetskontrollerna vid incheckning](../attendance/checkin-safety.md).
:::

### Inloggningsuppmaning på startskärmen

Besökare som öppnar appens [startskärm](/docs/b1-church/getting-started/navigating#home) utan att logga in ser en kort uppmaning -- som standard *"Logga in för att se dina grupper, gåvor och mer."* -- bredvid en knapp **Logga in**. Inställningarna **Inloggningsuppmaning på startskärmen** på samma sida Medlemsportal (`/mobile/b1-mobile`) låter dig ändra den:

- **Visa inloggningsuppmaning på appens startskärm** -- Stäng av detta för att dölja både uppmaningen och knappen **Logga in** på startskärmen. Besökare kan fortfarande logga in via appmenyn.
- **Text för inloggningsuppmaning** -- Ersätt standardtexten med ditt eget meddelande (upp till 150 tecken). Lämna rutan tom för att använda standardtexten. Rutan är inaktiverad medan uppmaningen är avstängd.

Klicka på **Spara** för att tillämpa. Ett meddelande **Sparad** bekräftar ändringen. Att spara uppdaterar appens cachade inställningar, så ändringen syns nästa gång startskärmen laddas.

### Brickor på startskärmen

Flikar som har en bild (se **Bild** under [Lägga till en ny flik](#adding-a-new-tab)) visas på appens [startskärm](/docs/b1-church/getting-started/navigating#home) som bildbrickor, i ett avsnitt med din kyrkas namn som rubrik. Detta gäller även en flik för Dagens vers, om du ger den en bild. Bildflikar visas dessutom i flikraden.

Inställningen **Brickor på startskärmen** på samma sida Medlemsportal (`/mobile/b1-mobile`) styr hur brickorna är placerade. Välj en **Layout**:

- **Rutnät** -- Två brickor per rad (standard). När antalet brickor är udda tar den första brickan hela bredden.
- **Rullande rad** -- En rad med brickor som medlemmarna sveper i sidled.
- **Rullande (automatisk)** -- Samma rad i sidled, men den rör sig även av sig själv och går vidare en bricka ungefär var fjärde sekund. Efter den sista brickan börjar den om från den första. Den pausar när en medlem trycker på, hovrar över eller tabbar in i raden, och återupptas några sekunder senare. På enheter som är inställda på reducerad rörelse står raden still och fungerar som **Rullande rad**.
- **Lista** -- En lista med en liten bildminiatyr bredvid varje flikens namn.

I båda rullande layouterna visas en rad med prickar under brickorna när det finns fler brickor än som får plats på skärmen. Det finns en prick per bricka, och den aktuella brickans prick är ifylld. Medlemmar kan trycka på en prick för att hoppa till den brickan.

Klicka på **Spara** för att tillämpa.

### Avsnitt på startskärmen

Inloggade medlemmar ser alltid sin egen närvarohistorik och sina inskickade formulär på [Mig-sidan](/docs/b1-church/getting-started/me-page). Reglagen **Avsnitt på startskärmen** på samma sida Medlemsportal (`/mobile/b1-mobile`) kan visa dem på startskärmen också:

- **Visa min närvaro på startskärmen** -- Lägger till avsnittet **Min närvaro** med hur många gånger medlemmen var närvarande de senaste 90 dagarna, deras två senaste besök och en länk **Historik** till hela närvarolistan.
- **Visa mina formulär på startskärmen** -- Lägger till avsnittet **Mina formulär** med medlemmens två senaste formulärinskickningar och en länk **Alla formulär**.

Båda är avstängda som standard. Ett avsnitt visas endast för medlemmar som är inloggade och har minst en post att visa. Klicka på **Spara** för att tillämpa.

## Var dessa flikar visas

Flikarna du konfigurerar här visas i **B1.church PWA** som dina medlemmar installerar från valfri sida på `https://yourchurchname.b1.church`. Ändringar du gör på denna sida återspeglas nästa gång en medlem öppnar appen.

På en telefon visar den nedre flikraden **Startsida**, upp till tre av dina flikar och **Mer**. På en dator visar sidhuvudet upp till fem flikar. Inbyggda skärmar (som Predikningar, Gåvor eller Grupper) får platserna först, och flikar av typen **Intern sida** fyller eventuella lediga platser. Flikar av typen **Extern URL** och **Dagens vers** får aldrig en plats. Varje flik, även de som inte ryms, visas på appens sida **Mer**.

Flikar som placeras inuti en **Mapp**-flik är undantaget: de visas endast på mappens egen skärm, som medlemmarna öppnar genom att trycka på mappen. Den skärmen visar flikarna som bildbrickor när alla har en bild, och annars som en lista. En mapp som inte innehåller några flikar som en medlem kan se döljs för den medlemmen. Se [Mappflikar](../../b1-church/getting-started/navigating.md#folder-tabs). Se [Navigera i B1App](../../b1-church/getting-started/navigating.md) för vad medlemmarna ser.

## Nästa steg

- [Kyrkoinställningar](./church-settings.md) -- Konfigurera din kyrkas information och varumärkesprofil
- [Roller och behörigheter](./roles-permissions.md) -- Hantera åtkomst för ditt team

---
title: "Använda sidredigeraren"
description: "Ställ in en sidredigerare i B1 Admin genom att lägga till sektioner och element, anpassa stilar, förhandsgranska på mobil och publicera utkast. Beskriver även ångra och versionshistorik."
---

# Använda sidredigeraren

<div class="article-intro">

Sidredigeraren i B1 är ett visuellt dra-och-släpp-verktyg som låter dig utforma kyrkans webbsidor utan att skriva någon kod. Du kan lägga till sektioner och innehållsblock, anpassa stilar, förhandsgranska ditt arbete och ångra ändringar – allt direkt i webbläsaren.

</div>

## Utbildningsvideo

<YouTube id="m2B_JxmfFm4" title="Redigera sidor och navigering i B1" next="Connecting a Custom Domain in B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Slutför [Första inställningarna](./initial-setup.md) för att konfigurera din webbplats
- Skapa minst en sida i [Hantera sidor](./managing-pages.md)
- Du behöver behörigheten **content.edit** för att öppna redigeraren

</div>

## Öppna redigeraren

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet högst upp till vänster), expanderar **Webbplats** och klickar på **Sidor**.
2. Hitta sidan du vill redigera i tabellen Sidor och klicka på **Redigera innehåll**.

Redigeraren öppnas i helskärmsläge. Den vänstra panelen visar sidans struktur och tillgängliga innehållselement; mittenområdet visar en live-förhandsvisning av sidan.

:::info
Redigeraren visas alltid i ljust läge, oavsett vilket tema du valt i B1 Admin, och använder de rubrik- och brödtextsnitt du valt i [Utseende](./appearance.md). Detta säkerställer att förhandsvisningen stämmer överens med hur sidan kommer att se ut för besökarna.
:::

## Sidstruktur: sektioner och element

Varje sida byggs upp av två nivåer:

- **Sektioner** – De översta behållarna som delar upp sidan i horisontella band (till exempel en hjältesektion, ett innehållsblock eller en sidfotsremsa). Varje sida måste ha minst en sektion innan du kan lägga till innehåll.
- **Element** – De enskilda innehållsdelarna inuti en sektion, till exempel text, bilder, knappar, kort, formulär och kalendrar.

### Lägga till en sektion

1. Klicka på **Lägg till sektion** (eller på knappen **+** högst upp i den vänstra panelen).
2. Välj hur du vill börja:
   - **Från en mall** – Bläddra i mallgalleriet för sektioner, ordnat efter kategori (Hjälte, Om oss, Tjänster, Givande m.fl.), och klicka på en för att infoga den som en färdigstilad sektion med förifyllt innehåll. Du kan anpassa allt efter att den lagts till.
   - **Tom sektion** – Välj en kolumnlayout (en kolumn, två kolumner, tre kolumner osv.) och bygg från grunden.
3. Den nya sektionen visas i förhandsvisningen. Klicka på den för att markera den och ställa in bakgrundsfärg, utfyllnad och andra stilalternativ.

### Byta layout för en sektion

Har du redan byggt en sektion men vill ha en annan struktur? Använd layoutväljaren på sektionen för att byta kolumnupplägg mot ett annat från galleriet. Dina befintliga innehåll och element behålls på plats.

### Lägga till element i en sektion

1. Klicka inuti en sektion i förhandsvisningen för att markera den.
2. Klicka på **Lägg till innehåll** och välj en elementtyp från listan:
   - **Text** – Rubriker, stycken och formaterad text
   - **Bild** – Ladda upp eller länka till ett foto
   - **Knapp** – En klickbar uppmaning till handling med länk
   - **Kort** – En bild med en titel och en beskrivning
   - **Formulär** – Bädda in ett [formulär](../forms/creating-forms.md) direkt på sidan. Om formuläret har en [rubrikbild](../forms/creating-forms.md#adding-a-header-photo) visas den ovanför frågorna
   - **Kalender** – Visa en händelsekalender
   - **FAQ** – Frågor och svar i dragspelsformat
   - **Video** – Bädda in en video via en URL
   - **Gruppbläddrare** – En sökbar katalog över alla kyrkans grupper med valfri sökning, kategorifilter och etikettfilter. Dess **Layout** kan vara **Rutnät** (standard) eller **Rullande (automatisk)** – se [Rullande layouter](#scrolling-layouts)
   - **Grupplista** – Brickor för dina offentliga grupper, eventuellt endast de grupper med en viss etikett. Dess **Layout** kan vara **Rutnät** (standard; upp till tre brickor per rad) eller **Rullande (automatisk)** – se [Rullande layouter](#scrolling-layouts)
   - **Ikonfunktion** – En ikon med en titel och en kort beskrivning, för att lyfta fram funktioner eller verksamheter
   - **Galleri** – Ett rutnät eller en murverksliknande layout med flera foton
   - **Vittnesmål** – Ett eller flera citat med författarens namn, roll och foto
   - **Sociala ikoner** – Länkade ikoner till kyrkans profiler i sociala medier: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo och Podcast. Fyll i en länk för varje ikon du vill visa; för **WhatsApp** använder du en `https://wa.me/`-länk med ditt nummer eller en gruppinbjudningslänk
   - **Nedräkning** – En timer som räknar ner till ett datum eller en veckovis gudstjänsttid
   - **Statistik** – En rad med stora siffror och etiketter (medlemmar, år, verksamhetsställen)
   - **Insamlingsframsteg** – En livelevande förloppsindikator för en insamlingskampanj som visar det totala belopp som samlats in mot ett fondmål
   - **Personalrutnät** – Fotokort för medlemmarna i en grupp; gruppen måste ha alternativet **offentlig medlemsförteckning** påslaget
   - **Gudstjänsttider** – Schemat för dina verksamhetsställen, hämtat automatiskt från inställningarna för närvaro
   - **Predikningar** – Ditt predikningsarkiv, som en fullständig bläddrare eller i en rutnät-, lista- eller utvald-senaste-layout
   - **Karta** – En inbäddad karta centrerad på kyrkans adress
   - **Tabell** – Ett enkelt rutnät med rader och kolumner för tabellinnehåll
   - **Text med foto** – Text och en bild sida vid sida
   - **Logotyp** – Kyrkans logotyp, hämtad från [Utseende](./appearance.md)
   - **Livesändning** – Din spelare för livesändningar, inbäddad direkt på sidan
   - **Podcast** – En lista med avsnitt hämtade från en extern podcast-RSS-flöde-URL som du anger, med inställningar för hur många avsnitt som ska visas och om datum och beskrivningar ska visas. Varje avsnitt på den publicerade webbplatsen har en ljudspelare och en länk **Ladda ner** som sparar avsnittets ljudfil under avsnittets titel. Detta är till för att lyfta fram vilket podcast-flöde som helst på din webbplats; om du vill publicera dina egna predikningar som podcast, se i stället [Hantera predikningar](../sermons/managing-sermons.md#your-podcast-feed)
   - **Gåva** – En knapp för givande eller ett inbäddat gåvoformulär
   - **HTML** – Din egen råa HTML, för avancerade användningsområden som att bädda in en widget från tredje part (se [Använda HTML-elementet](#using-the-html-element))
   - **iFrame** – Bädda in externt innehåll via en URL
3. Konfigurera elementet med hjälp av inställningspanelen som visas.

### Använda HTML-elementet

Elementet **HTML** har två rutor:

- **HTML-innehåll** – Markupen som ska visas på sidan. Eventuella `<script>`-taggar du lägger till här körs på den publicerade webbplatsen.
- **JavaScript (utan script-taggen)** – Skriptkod som körs när sidan laddas. Du kan även klistra in en leverantörs inbäddningskod här med dess `<script>`-taggar, och den körs på den publicerade webbplatsen.

Om du bara klistrar in en webbadress (till exempel en bildlänk) i rutan för JavaScript blir rutan röd med varningen *”Det här är en webbadress, inte JavaScript.”* En ren adress i den rutan gör ingenting. För att visa en bild använder du ett **Bild**-element eller lägger `<img src="...">` i **HTML-innehåll**.

### Använda kalenderelementet {#using-the-calendar-element}

Elementet **Kalender** visar händelser från en av dina kalendrar:

1. Under **Välj** väljer du **Gruppkalender** (en grupps händelser – listan visar de grupper du är medlem i) eller **Kuraterad kalender** (en kalender du skapat under **Kalendrar**; se [Kuraterad kalender](../calendars/curated-calendar.md)).
2. Under **Välj kalender** väljer du gruppen eller kalendern.
3. Under **Visning** väljer du hur den ska visas:
   - **Månadskalender** – Ett månadsrutnät som besökarna kan bläddra i. Varje händelse färgas efter den grupp den tillhör, så en grupps händelser har samma färg i varje kalender. B1 väljer färgerna automatiskt; det finns inget att ställa in.
   - **Kommande händelser** – Ett rutnät med brickor för de nästa 12 kommande händelserna, där en återkommande händelse visas en gång på dess nästa datum. Varje bricka visar händelsens foto (eller dess titel på temats mörka färg om den saknar foto), ett datummärke, dag och tid samt första raden i beskrivningen. En knapp **Prenumerera** ovanför brickorna låter besökarna kopiera kalenderns ICS-länk eller ladda ner den. En inställning för **Layout** visas för denna visning: **Rutnät** (standard) eller **Rullande (automatisk)**, vilket placerar brickorna i en enda rad som rullar av sig själv (se [Rullande layouter](#scrolling-layouts)). För en **Kuraterad kalender** slår du på inställningen **Gruppmärke** för att visa varje händelses gruppnamn i brickans övre högra hörn, i gruppens kalenderfärg. Händelser från arkiverade eller konfidentiella grupper får inget märke.
4. För att bara visa vissa händelser skriver du en tagg i **Endast händelser med taggen** – till exempel `ungdom`. Endast händelser vars **Taggar** innehåller det ordet visas. Lämna fältet tomt för att visa alla händelser. Taggar anges på varje händelse; se [Lägga till och redigera händelser](../calendars/creating-calendars.md#adding-and-editing-events).

I båda visningarna öppnar ett klick på en händelse dess egen sida på din webbplats. Händelsesidan visar händelsens foto, titel, datum och tid samt beskrivning, plus en ruta med **När** (inklusive upprepningsmönstret för en återkommande händelse) och **Var** (de rum som bokats för den). Den har också knappen **Anmäl dig till händelsen** när anmälan är påslagen, och en länk **Lägg till i min kalender** som laddar ner händelsen som en kalenderfil. Sidan är uppbyggd så att sökmotorer kan visa händelsens datum och uppgifter i sina resultat. Händelsesidor från kuraterade kalendrar som visas på dina sidor (för händelser de kommande sex månaderna) listas även i din webbplatskarta, så att sökmotorer kan hitta dem.

### Rullande layouter {#scrolling-layouts}

Layouten **Rullande (automatisk)** i **Gruppbläddraren**, **Grupplistan** och visningen **Kommande händelser** i kalenderelementet placerar brickorna i en rad i stället för i ett rutnät. På en telefon fyller varje bricka hela raden; på en dator ryms två brickor sida vid sida. När det finns fler brickor än som får plats:

- Rör sig raden framåt en bricka ungefär var fjärde sekund och fortsätter tillbaka till första brickan efter den sista.
- Pausar den när en besökare för muspekaren över, rör vid eller tabbar in i den, och fortsätter igen några sekunder senare.
- Visas en rad med punkter under raden, en för varje bricka, där den aktuella brickans punkt är ifylld. Besökare kan klicka på en punkt för att hoppa till den brickan.

På enheter som är inställda på minskad rörelse står raden still, och besökarna sveper eller scrollar själva. Om alla brickor får plats rör sig inte raden och inga punkter visas.

### Ändra ordning på innehåll

Dra sektioner eller element med handtaget (sex prickar) på vänster sida av varje objekt för att ändra ordningen. Du kan dra element inom en sektion eller flytta dem mellan sektioner.

## Anpassa sidans stil

### Sektionsstilar

Klicka på en sektion för att öppna dess stilpanel. Du kan ställa in:

- **Bakgrund** – Enfärgad, övertoning eller bild. När du använder en bildbakgrund låter en väljare för **Fokuspunkt** dig klicka för att ange vilken del av bilden som ska förbli centrerad när sektionen skalas, och ett alternativ för **Överlägg** låter dig lägga en halvtransparent färgton över bilden för att förbättra läsbarheten i texten
- **Utfyllnad** – Avstånd över och under innehållet i sektionen
- **Bredd** – Hela bredden eller centrerad/begränsad
- **Avdelare** – Dekorativa formavdelare (våg, sluttning, kurva, triangel m.fl.) på sektionens övre eller nedre kant, med alternativ för färg, höjd och spegling

### Elementstilar

Klicka på ett element för att öppna dess stilpanel. Vanliga alternativ är teckenstorlek, färg, justering, marginal och utfyllnad. För bilder kan du ange alternativ text och länkmål.

### Anpassad CSS

För avancerad styling har varje sektion och element ett fält för **Anpassad CSS** där du kan skriva egna CSS-regler. Dessa begränsas till det elementet, så de påverkar inte resten av sidan oavsiktligt.

:::tip
Om du behöver tillämpa stilar på hela din webbplats – till exempel ett anpassat typsnitt eller en global färg – använder du i stället inställningarna under [Utseende](./appearance.md) i stället för anpassad CSS på enskilda sidor.
:::

## Förhandsgranska din sida

Använd förhandsgranskningsreglagen i verktygsfältet för att se hur sidan ser ut i olika skärmstorlekar:

- **Dator** – Vy i full webbläsarbredd
- **Mobil** – Smal vy i telefonstorlek

På telefoner staplas kolumnerna i en rad ovanpå varandra i full bredd, såvida du inte anger en **Mobilbredd** för dem i radens inställningar. Listor med predikningar och podcaster staplar också texten för varje avsnitt under dess miniatyrbild på telefoner.

För att se den publicerade sidan precis som besökarna ser den, gå tillbaka till listan Sidor och klicka på sidans sökväg. Den öppnas i en ny webbläsarflik.

## Kontrollera tillgänglighet

Klicka på ikonen **Tillgänglighet** i verktygsfältet för att göra en snabbkontroll av vanliga problem – bilder utan alternativ text, låg färgkontrast eller rubriker i fel ordning. Varje problem länkar direkt till elementet som behöver åtgärdas, så att du kan rätta till det på plats.

## Ångra ändringar

Redigeraren spårar din redigeringshistorik automatiskt. Använd knapparna i verktygsfältet eller tangentbordsgenvägar för att navigera:

- **Ångra** (Ctrl+Z / Cmd+Z) – Återställer din senaste åtgärd
- **Gör om** (Ctrl+Shift+Z eller Ctrl+Y / Cmd+Shift+Z) – Tillämpar en ångrad åtgärd igen

Du kan också återställa sidan till en tidigare ögonblicksbild. Klicka på **Visa historik** i verktygsfältet för att se en lista över sparade ögonblicksbilder med beskrivningar, och klicka på ett valfritt objekt för att återställa till den punkten.

:::warning
Att återställa en ögonblicksbild ersätter ditt nuvarande sidinnehåll med ögonblicksbildens version. Detta kan inte ångras med den vanliga ångra-knappen. Spara en ögonblicksbild av ditt nuvarande läge innan du återställer en äldre om du vill ha möjlighet att gå tillbaka.
:::

## Spara och publicera

Ändringar sparas automatiskt när du arbetar. En statusindikator i verktygsfältet visar om dina ändringar har sparats.

### Utkast och publicerat läge

Sidor kan ha ett **publicerat** läge, som styr när besökarna ser dina ändringar. Verktygsfältet visar en statusbricka med det aktuella läget:

- **Live vid sparning** – Sidan använder inget publiceringsflöde. Varje sparad ändring blir publik direkt. Detta är standard för nya sidor.
- **Opublicerade ändringar** – Sidan har publicerats tidigare, men du har gjort ändringar sedan den senaste publiceringen. Besökarna ser fortfarande den tidigare publicerade versionen.
- **Publicerad** – Sidan är publik och ditt sparade innehåll stämmer överens med det besökarna ser.

För att publicera dina ändringar klickar du på knappen **Publicera** i verktygsfältet. Sidan blir publik direkt.

För att återgå till den senast publicerade versionen utan att påverka vad besökarna ser öppnar du överflödesmenyn (⋮) och klickar på **Ignorera opublicerade ändringar**.

För att sluta använda publiceringsflödet öppnar du överflödesmenyn och klickar på **Stäng av publicering**. Redigeringar går då återigen live direkt.

:::tip
Använd utkast- och publiceringsflödet när du vill förbereda en sida – till exempel inför en kommande händelse – och bara göra den publik vid rätt tillfälle. Bygg och förhandsgranska sidan, och klicka sedan på Publicera när du är redo.
:::

## Relaterade artiklar

- [Hantera sidor](./managing-pages.md) – Skapa sidor, ange webbadresser och hantera webbplatsens navigering
- [Utseende](./appearance.md) – Ställ in webbplatsövergripande färger, typsnitt och varumärke
- [Filer](./files.md) – Ladda upp bilder och dokument att använda i redigeraren
- [Skapa formulär](../forms/creating-forms.md) – Bygg formulär som du kan bädda in på sidor

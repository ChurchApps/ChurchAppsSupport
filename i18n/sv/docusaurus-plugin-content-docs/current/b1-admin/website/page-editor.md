---
title: "Använda sidredigeraren"
---

# Använda sidredigeraren

<div class="article-intro">

B1:s sidredigerare är en visuell byggare med dra-och-släpp som låter dig utforma kyrkans webbsidor utan att skriva någon kod. Du kan lägga till sektioner och innehållsblock, anpassa stilar, förhandsgranska ditt arbete och ångra ändringar, allt direkt i webbläsaren.

</div>

## Utbildningsvideo

<YouTube id="m2B_JxmfFm4" title="Redigera sidor och navigering i B1" next="Ansluta en egen domän i B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Innan du börjar</h4>

- Slutför [Första inställningen](initial-setup) så att din webbplats är konfigurerad
- Skapa minst en sida i [Hantera sidor](managing-pages)
- Du behöver behörigheten **content.edit** för att öppna redigeraren

</div>

## Öppna redigeraren

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), expanderar **Webbplats** och klickar på **Sidor**.
2. Hitta sidan du vill redigera i tabellen Sidor och klicka på **Redigera innehåll**.

Redigeraren öppnas i helskärmsläge. Den vänstra panelen visar sidans struktur och tillgängliga innehållselement. Det centrala området visar en livevisning av din sida.

:::info
Redigeraren visas alltid i ljust läge, oavsett vilket tema du valt i B1 Admin, och använder de rubrik- och brödtexttypsnitt du valt under [Utseende](appearance). Det säkerställer att förhandsvisningen stämmer överens med hur sidan ser ut för webbplatsens besökare.
:::

## Sidstruktur: sektioner och element

Varje sida byggs upp av två nivåer:

- **Sektioner** -- De översta behållarna som delar upp sidan i horisontella band (till exempel en hjältesektion, ett innehållsblock eller en sidfotsremsa). Varje sida måste ha minst en sektion innan du kan lägga till innehåll.
- **Element** -- De enskilda innehållsdelarna i en sektion, som text, bilder, knappar, kort, formulär och kalendrar.

### Lägga till en sektion

1. Klicka på **Lägg till sektion** (eller på knappen **+** överst i den vänstra panelen).
2. Välj hur du vill börja:
   - **Från en mall** -- Bläddra i mallgalleriet för sektioner, ordnat efter kategori (Hjälte, Om oss, Tjänster, Gåvor med mera), och klicka på en mall för att infoga den som en färdigstilad sektion med förifylld text. Du kan anpassa allt efter att den lagts till.
   - **Tom sektion** -- Välj en kolumnlayout (en kolumn, två kolumner, tre kolumner med mera) och bygg från grunden.
3. Den nya sektionen visas i förhandsvisningen. Klicka på den för att markera den och ställa in bakgrundsfärg, utfyllnad och andra stilalternativ.

### Byta layout för en sektion

Har du redan byggt en sektion men vill ha en annan struktur? Använd layoutväxlaren på sektionen för att byta kolumnupplägg till ett annat från galleriet. Dina befintliga innehåll och element behålls på sina platser.

### Lägga till element i en sektion

1. Klicka inuti en sektion i förhandsvisningen för att markera den.
2. Klicka på **Lägg till innehåll** och välj en elementtyp i listan:
   - **Text** -- Rubriker, stycken och formaterad text
   - **Bild** -- Ladda upp eller länka till ett foto
   - **Knapp** -- En klickbar uppmaning till handling
   - **Kort** -- En bild med en titel och en beskrivning
   - **Formulär** -- Bädda in ett [formulär](../forms/creating-forms) direkt på sidan. Om formuläret har en [rubrikbild](../forms/creating-forms.md#adding-a-header-photo) visas den ovanför frågorna
   - **Kalender** -- Visa en händelsekalender
   - **FAQ** -- Dragspelsliknande block med frågor och svar
   - **Video** -- Bädda in en video via en URL
   - **Grupputforskare** -- En sökbar katalog över alla kyrkans grupper med valfri sökning, kategorifilter och etikettfilter
   - **Ikonfunktion** -- En ikon med en titel och en kort beskrivning, för att lyfta fram funktioner eller verksamheter
   - **Galleri** -- Ett rutnät med flera foton eller en masonry-layout
   - **Vittnesmål** -- Ett eller flera citat med författarens namn, roll och foto
   - **Sociala ikoner** -- Länkade ikoner för kyrkans profiler i sociala medier: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo och Podcast. Fyll i en länk för varje ikon du vill visa. För **WhatsApp** använder du en `https://wa.me/`-länk med ditt nummer eller en gruppinbjudningslänk
   - **Nedräkning** -- En timer som räknar ner till ett datum eller en veckovis gudstjänsttid
   - **Statistik** -- En rad med stora siffror och etiketter (medlemmar, år, campus)
   - **Kampanjframsteg** -- En livefylld förloppsindikator för en gåvokampanj som visar det totala beloppet som samlats in mot ett fondmål
   - **Personalrutnät** -- Fotokort för medlemmarna i en grupp. Gruppen måste ha alternativet **offentlig förteckning** aktiverat
   - **Gudstjänsttider** -- Schemat för dina campus gudstjänster, hämtat automatiskt från inställningarna för närvaro
   - **Predikningar** -- Ditt predikningsarkiv, som en fullständig webbläsare eller i ett rutnät, en lista eller en layout med framhävd senaste predikan
   - **Karta** -- En inbäddad karta centrerad på kyrkans adress
   - **Tabell** -- Ett enkelt rutnät med rader och kolumner för tabellformat innehåll
   - **Text med foto** -- Text och en bild sida vid sida
   - **Logotyp** -- Kyrkans logotyp, hämtad från [Utseende](appearance)
   - **Livesändning** -- Din livesändningsspelare, inbäddad direkt på sidan
   - **Podcast** -- En lista med avsnitt hämtade från en extern podcast-RSS-flödes-URL som du anger, med inställningar för hur många avsnitt som ska visas och om datum och beskrivningar ska visas. Varje avsnitt på den publicerade webbplatsen har en ljudspelare och en länk **Ladda ner** som sparar avsnittets ljudfil under avsnittets titel. Detta är till för att lyfta fram valfritt podcastflöde på din webbplats. Om du vill publicera dina egna predikningar som en podcast, se i stället [Hantera predikningar](../sermons/managing-sermons.md#your-podcast-feed)
   - **Gåva** -- En gåvoknapp eller ett inbäddat gåvoformulär
   - **HTML** -- Din egen råa HTML, för avancerad användning, till exempel för att bädda in en widget från tredje part (se [Använda HTML-elementet](#using-the-html-element))
   - **iFrame** -- Bädda in externt innehåll via en URL
3. Konfigurera elementet med hjälp av inställningspanelen som visas.

### Använda HTML-elementet

HTML-elementet har två rutor:

- **HTML-innehåll** -- Markupen som ska visas på sidan. Eventuella `<script>`-taggar du lägger till här körs på din publicerade webbplats.
- **JavaScript (utan script-taggen)** -- Skriptkod som körs när sidan laddas. Du kan också klistra in en leverantörs inbäddningskod här, med dess `<script>`-taggar, så körs den på den publicerade webbplatsen.

Om du bara klistrar in en webbadress (till exempel en bildlänk) i JavaScript-rutan blir rutan röd med varningen *„Det här är en webbadress, inte JavaScript.“* En ren adress i den rutan gör ingenting. Om du vill visa en bild använder du ett **Bild**-element eller lägger in `<img src="...">` i **HTML-innehåll**.

### Använda kalenderelementet {#using-the-calendar-element}

**Kalender**-elementet visar händelser från en av dina kalendrar:

1. Under **Välj** väljer du **Gruppkalender** (händelserna för en grupp; listan visar de grupper du är medlem i) eller **Kuraterad kalender** (en kalender du skapat under **Kalendrar**; se [Kuraterad kalender](../calendars/curated-calendar)).
2. Under **Välj kalender** väljer du gruppen eller kalendern.
3. Under **Visning** väljer du hur den ska visas:
   - **Månadskalender** -- Ett månadsrutnät som besökarna kan bläddra i.
   - **Kommande händelser** -- Ett rutnät med brickor för de nästa 12 kommande händelserna. En återkommande händelse visas en gång, på sitt nästa datum. Varje bricka visar händelsens foto (eller dess titel mot temats mörka färg om det saknar foto), en datumetikett, dag och tid samt första raden i beskrivningen. En knapp **Prenumerera** ovanför brickorna låter besökarna kopiera kalenderns ICS-länk eller ladda ner den. En inställning för **Layout** visas för denna visning: **Rutnät** (standard) eller **Rullande (automatisk)**, som placerar brickorna på en enda rad som rullar fram av sig själv.
4. Om du vill visa bara vissa händelser skriver du en tagg i **Endast händelser med taggen** -- till exempel `ungdom`. Endast händelser vars **Taggar** innehåller det ordet visas. Lämnas fältet tomt visas alla händelser. Taggar anges för varje händelse; se [Lägga till och redigera händelser](../calendars/creating-calendars.md#adding-and-editing-events).

I båda visningarna öppnas en händelse på en egen sida på din webbplats när man klickar på den. Händelsesidan visar händelsens foto, titel, datum och tid samt beskrivningen, plus en ruta med **När** (inklusive upprepningsmönstret för en återkommande händelse) och **Var** (de salar som bokats för den). Där finns också knappen **Anmäl dig till denna händelse** när anmälan är aktiverad, och en länk **Lägg till i min kalender** som laddar ner händelsen som en kalenderfil. Sidan är uppbyggd så att sökmotorer kan visa händelsens datum och uppgifter i sina resultat. Händelsesidor från kuraterade kalendrar som visas på dina sidor (för händelser under de kommande sex månaderna) tas också med i din webbplats webbkarta, så att sökmotorer kan hitta dem.

### Ändra ordningen på innehåll

Dra sektioner eller element med handtaget (sex prickar) på vänster sida av varje objekt för att ändra ordning. Du kan dra element inom en sektion eller flytta dem mellan sektioner.

## Formatera din sida

### Sektionsstilar

Klicka på en sektion för att öppna dess stilpanel. Du kan ställa in:

- **Bakgrund** -- Ensfärgad färg, övertoning eller bild. När du använder en bild som bakgrund kan du med väljaren **Fokuspunkt** klicka för att bestämma vilken del av bilden som ska förbbli centrerad när sektionen skalas. Med alternativet **Överlägg** kan du lägga en halvtransparent färgton över bilden för att förbättra textens läsbarhet.
- **Utfyllnad** -- Avstånd uppe och nere inne i sektionen
- **Bredd** -- Hela bredden eller centrerad/begränsad
- **Avdelare** -- Dekorativa formavdelare (våg, sned kant, båge, triangel med flera) på sektionens övre eller nedre kant, med färg, höjd och spegelvändningsalternativ

### Elementstilar

Klicka på ett element för att öppna dess stilpanel. Vanliga alternativ är teckenstorlek, färg, justering, marginal och utfyllnad. För bilder kan du ange alternativ text och länkmål.

### Anpassad CSS

För avancerad formatering har varje sektion och element ett fält **Anpassad CSS** där du kan skriva egna CSS-regler. Dessa gäller endast för det elementet, så de påverkar inte resten av sidan oavsiktligt.

:::tip
Om du behöver tillämpa stilar på hela din webbplats, till exempel ett eget typsnitt eller en global färg, använd inställningarna under [Utseende](appearance) i stället för anpassad CSS på enskilda sidor.
:::

## Förhandsgranska din sida

Använd förhandsgranskningsreglagen i verktygsfältet för att kontrollera hur sidan ser ut på olika skärmstorlekar:

- **Dator** -- Vy i full bredd i webbläsaren
- **Mobil** -- Smal vy i telefonstorlek

På telefoner staplas kolumnerna i en rad ovanpå varandra i full bredd, såvida du inte anger en **Mobilbredd** för dem i radens inställningar. Listor med predikningar och podcaster staplar också texten för varje avsnitt under miniatyrbilden på telefoner.

Om du vill se den publicerade sidan precis så som besökarna ser den går du tillbaka till listan Sidor och klickar på sidans sökväg. Den öppnas i en ny webbläsarflik.

## Kontrollera tillgänglighet

Klicka på ikonen **Tillgänglighet** i verktygsfältet för att göra en snabbkontroll av vanliga problem: bilder utan alternativ text, låg färgkontrast eller rubriker i fel ordning. Varje problem länkar direkt till det element som behöver åtgärdas, så att du kan rätta till det på plats.

## Ångra ändringar

Redigeraren spårar din redigeringshistorik automatiskt. Använd knapparna i verktygsfältet eller tangentbordsgenvägarna för att navigera:

- **Ångra** (Ctrl+Z / Cmd+Z) -- Återställer din senaste åtgärd
- **Gör om** (Ctrl+Shift+Z eller Ctrl+Y / Cmd+Shift+Z) -- Tillämpar en ångrad åtgärd igen

Du kan också återställa sidan till en tidigare ögonblicksbild. Klicka på **Visa historik** i verktygsfältet för att se en lista över sparade ögonblicksbilder med beskrivningar, och klicka på en post för att återställa till den punkten.

:::warning
Att återställa en ögonblicksbild ersätter ditt nuvarande sidinnehåll med ögonblicksbildens version. Det kan inte ångras med den vanliga ångra-knappen. Spara en ögonblicksbild av ditt nuvarande läge innan du återställer en äldre om du vill kunna gå tillbaka.
:::

## Spara och publicera

Ändringar sparas automatiskt när du arbetar. En statusindikator i verktygsfältet visar om dina ändringar har sparats.

### Utkast och publicerat läge

Sidor kan ha ett **publicerat**-läge, som styr när besökarna ser dina ändringar. Verktygsfältet visar en statusetikett med det aktuella läget:

- **Live vid sparande** -- Sidan använder inget publiceringsflöde. Varje sparad ändring blir direkt synlig. Detta är standard för nya sidor.
- **Opublicerade ändringar** -- Sidan har publicerats tidigare, men du har gjort ändringar sedan den senaste publiceringen. Besökarna ser fortfarande den tidigare publicerade versionen.
- **Publicerad** -- Sidan är live och ditt sparade innehåll stämmer överens med det besökarna ser.

För att publicera dina ändringar klickar du på knappen **Publicera** i verktygsfältet. Sidan blir direkt synlig.

För att återgå till den senaste publicerade versionen utan att påverka vad besökarna ser öppnar du överflödesmenyn (⋮) och klickar på **Förkasta opublicerade ändringar**.

För att sluta använda publiceringsflödet öppnar du överflödesmenyn och klickar på **Stäng av publicering**. Ändringar blir då åter direkt synliga.

:::tip
Använd arbetsflödet för utkast och publicering när du vill förbereda en sida, till exempel för en kommande händelse, och bara göra den synlig vid rätt tidpunkt. Bygg och förhandsgranska sidan, och klicka sedan på Publicera när du är redo.
:::

## Relaterade artiklar

- [Hantera sidor](managing-pages) -- Skapa sidor, ange webbadresser och hantera webbplatsens navigering
- [Utseende](appearance) -- Ställ in webbplatsövergripande färger, typsnitt och grafisk profil
- [Filer](files) -- Ladda upp bilder och dokument att använda i redigeraren
- [Skapa formulär](../forms/creating-forms) -- Bygg formulär som du kan bädda in på sidor

---
title: "Live streaming"
---

# Live streaming

<div class="article-intro">

Op de pagina Live Stream Times kunt u het streamingschema van uw kerk configureren, servicetijden beheren en de kijkerservaring aanpassen. Stel terugkerende wekelijkse services of eenmalige events in, configureer chat- en video-instellingen en controleer wanneer uw stream live gaat.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- U hebt de machtiging **contentApi.streamingServices.edit** nodig. Zie [Rollen & Machtigingen](../settings/roles-permissions.md) als u geen toegang hebt.
- Zorg dat u uw YouTube Channel ID gereed hebt als u van plan bent geautomatiseerde live streaming te gebruiken
- Voeg minstens één [preek](managing-sermons) of permanente live URL toe om als uw streambron te gebruiken

</div>

De pagina heeft twee belangrijke tabbladen: **Services** voor het beheren van uw live streamschema en **Instellingen** voor het configureren van uw streamingpagina.

## Services beheren

### Een service toevoegen

1. Klik in B1 Admin op **Preken** in de linkerzijbalk en klik vervolgens op het tabblad **Live Stream Times**.
2. Klik op de knop **Service toevoegen** om een nieuwe geplande service te maken.
3. Voer een **servicenaam** in (bijvoorbeeld "Zondagmorgen").
4. Stel de **servicetijd** in -- kies de dag en het moment waarop uw service begint.
5. Stel **Herhalen wekelijks** in op **Ja** voor regelmatige wekelijkse services of **Nee** voor een eenmalige event.

### Chat- en video-instellingen configureren

6. Stel onder **Chat-instellingen** in hoeveel minuten voor en na de service de chat moet worden ingeschakeld. Dit stelt bezoekers in staat om voor de service te beginnen chatten en daarna door te gaan.
7. Stel onder **Video-instellingen** in hoe vroeg de videostream moet worden gestart voor aftelling of pre-service-inhoud.
8. Selecteer welke preek u uit de vervolgkeuzelijst wilt afspelen:
   - **Nieuwste preek** -- Speelt automatisch uw meest recent toegevoegde video af.
   - **Huidige live service** -- Speelt uw huidige live stream van YouTube af met behulp van uw Channel ID.
   - U kunt ook elke specifieke preek kiezen die u al hebt opgeslagen.
9. Klik op **Opslaan** om uw service in te plannen.

:::info
Uw service wordt automatisch elke week bijgewerkt als deze terugkerend is ingesteld. U kunt zoveel services toevoegen als u nodig hebt. Bezoekers zien de volgende geplande servicetijd wanneer zij uw streamingpagina bezoeken.
:::

## Streamingpagina-instellingen

Klik op het tabblad **Instellingen** om de tabbladen en links aan te passen die naast uw live stream verschijnen.

### Tabbladen toevoegen

1. Klik op de knop **Toevoegen** om een nieuw tabblad aan uw live streamingpagina toe te voegen.
2. Kies uit vooraf ontworpen tabbladen (**Chat** of **Gebed**) of voeg een aangepast tabblad met een externe URL toe.
3. Voor vooraf ontworpen tabbladen, geef het in het vak **Tabblad tekst** gewoon een naam en de installatie is voltooid.
4. Voor een gekoppeld tabblad voert u de tabblad naam in, kiest u een pictogram door op de knop pictogram te klikken en voert u de URL in.
5. Uw geconfigureerde tabbladen verschijnen op de live streamingpagina zodat bezoekers aanvullende resources en interactieve functies kunnen openen.

### Uw stream bekijken

Klik op de knop **Bekijk uw stream** om te zien hoe uw live streamingpagina er voor bezoekers uitziet, inclusief uw logo, servicetijden en geconfigureerde tabbladen.

## Uw YouTube Live Stream instellen

Om uw YouTube-kanaal voor geautomatiseerde live streaming aan te sluiten:

1. Ga naar **Preken** en klik op **Preek toevoegen** en selecteer **Permanente live URL toevoegen**.
2. De videoprovider staat standaard ingesteld op **Huidige YouTube Live Stream**. Voer uw **YouTube Channel ID** in.
3. Voeg een titel en beschrijving toe en klik op **Opslaan**.
4. Maak in **Live Stream Times** een service en selecteer uw permanente live URL uit de preekenvervolgkeuzelijst.

:::tip
Om uw YouTube Channel ID te vinden, gaat u naar de geavanceerde instellingen van uw YouTube-kanaal en kopieert u de Channel ID-waarde.
:::

## Kleuren en logo aanpassen

Uw live streamingpagina gebruikt de [Weergave](../website/appearance)-instellingen van uw website:

- De **lichte accentkleur** met donkere tekst wordt gebruikt voor de koptekst.
- De **donkere accentkleur** met lichte tekst wordt gebruikt voor de zijbalk.
- Uw **Light Background Logo** verschijnt op de streamingpagina. Gebruik een afbeelding met een transparante achtergrond en een verhouding van 4:1.

Als u deze wilt wijzigen, gaat u naar **Website** en vervolgens **Weergave** en werk u uw [Kleurenpalette](../website/appearance#color-palette)- en [Logo](../website/appearance#logo-and-branding)-instellingen bij.

## Streaminghost toevoegen

Om teamleden hostmogelijkheden te geven (chatmoderatie, gebedsvraagresponses):

1. Ga naar **Instellingen** in de linkerzijbalk en klik op **Rollen**.
2. Klik op de plusknop en selecteer **Aangepaste rol toevoegen**.
3. Noem de rol "Streaming Host" en klik op **Opslaan**.
4. Klik op de nieuwe rol en klik vervolgens op **Toevoegen** in de sectie Leden om personen toe te voegen.
5. Schuif omlaag naar **Machtigingen bewerken**, vouw de sectie **Inhoud** uit en selecteer **Host Chat**.

Wanneer hosts inloggen op de live streamingpagina, hebben zij speciale mogelijkheden, inclusief chatmoderatie en gebedsvraagbeheer.

:::info
Voor meer details over het maken van rollen en het beheren van machtigingen, zie [Rollen & Machtigingen](../settings/roles-permissions.md).
:::

## Probleemoplossing

Als uw geautomatiseerde YouTube live stream niet correct wordt weergegeven wanneer u de optie "Huidige YouTube Live Stream" met uw Channel ID gebruikt, probeert u het volgende:

**Symptomen:**
- De live streaminginsluiting geeft "Video niet beschikbaar" weer
- De pagina laadt maar geen video verschijnt
- Directe YouTube-inbeddingen werken, maar de geautomatiseerde live stream van het kanaal niet

**Oplossing**
Controleer uw YouTube-kanaal op oude of aanstaande geplande live streams en verwijder deze:

1. Ga naar uw YouTube Studio.
2. Navigeer naar **Inhoud** en vervolgens **Live**.
3. Zoek naar oude geplande live of aanstaande geplande streams.
4. Verwijder deze oude of geplande live streamingeragengen.
5. Test uw live streamingpagina opnieuw.

:::warning
YouTube's geautomatiseerde live streaminsluiting van kanaal kan worden geblokkeerd wanneer er meerdere geplande of voorbije live streamingeragengen in uw kanaal staan. Het verwijderen daarvan stelt YouTube in staat uw huidige live stream correct in te stellen en te serveren.
:::

**Aanvullende vereisten:**
- Uw live stream moet op **Openbaar** zijn ingesteld (niet Niet vermeld of Privé).
- Inbedding moet zijn ingeschakeld in uw YouTube-streaminginstellingen.
- Zorg ervoor dat u de provider **Huidge YouTube Live Stream** (met Channel ID) gebruikt, niet de provider **YouTube** (met Video ID).

## Volgende stappen

- [Preken beheren](managing-sermons) -- Voeg preken aan uw bibliotheek toe
- [Afspeellijsten](playlists) -- Organiseer preken in series

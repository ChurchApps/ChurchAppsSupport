---
title: "live streaming"
---

# live streaming

<div class="article-intro">

Live stream gange siden lader dig konfigurere dit kirks streaming skema, administrere tjeneste gange og tilpasse beskuer erfaring. Opsæt tilbagevendende ugentlige tjenester eller engangs arrangementer, konfigurér chat og video indstillinger og kontrol hvornår din stream går live.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du har brug for **contentApi.streamingServices.edit** tilladelse. Se [roller og tilladelser](../settings/roles-permissions.md) hvis du ikke har adgang.
- Har din YouTube kanal ID klar hvis du planlægger at brug automatiseret live streaming
- Tilføj mindst en [prædikenindtastning](managing-sermons) eller permanent live URL for at bruge som din stream kilde

</div>

Siden har to hovedfaner: **tjenester** til administrering af dine live stream skema og **indstillinger** til konfigurering af din streaming siden.

## administrering af tjenester

### Tilføj en tjeneste

1. I B1 Admin, klik **prædikener** i venstre sidebar, derefter klik **live stream gange** fane.
2. Klik **Tilføj tjeneste** knap for at opbygge en ny planlagt tjeneste.
3. Anføre et **tjeneste navn** (for eksempel "søndag morgen").
4. Indstil **tjeneste gang** -- vælg dagen og gangen din tjeneste starter.
5. Indstil **tilbagevendende ugentlig** til **ja** til regelmæssige ugentlige tjenester eller **nej** til en engangs arrangement.

### konfigurering af chat og video indstillinger

6. Under **chat indstillinger**, indstil hvor mange minutter før og efter tjenesten chat skal være aktiveret. Dette lader besøgende starte chatning før tjeneste starter og fortsæt bagefter.
7. Under **video indstillinger**, indstil hvor tidligt at starte videostrømmen til nedtælling eller før-service indhold.
8. Vælg hvilken prædikenindtastning skal spilles fra dropdown:
   - **seneste prædikenindtastning** -- automatisk spiller din mest nyligt tilføjede video.
   - **nuværende live tjeneste** -- Spiller din nuværende live stream fra YouTube ved hjælp af din kanal ID.
   - Du kan også vælge enhver specifik prædikenindtastning du allerede har gemt.
9. Klik **gem** for at planlægge din tjeneste.

:::info
Din tjeneste opdateres automatisk hver uge hvis sat til tilbagevendende. Du kan tilføje så mange tjenester som du har brug for. Besøgende vil se den næste planlagte service gang når de besøger din streaming siden.
:::

## streaming siden indstillinger

Klik **indstillinger** fane for at tilpasse faner og links som vises sammen med dine live stream.

### Tilføj faner

1. Klik **Tilføj** knap for at tilføje en ny fane til din live stream siden.
2. Vælg fra foruddesignede faner (**chat** eller **bøn**) eller tilføje en brugerdefineret fane med en ekstern URL.
3. Til foruddesignede faner, bare giv det et navn i **fane tekst** boks og opsætningen er fuldført.
4. Til en linket fane, anføre fane navn, vælg et ikon ved at klikke ikon knap og anføre URL'en.
5. Dine konfigurerede faner vil vises på live streaming siden til besøgende for at få adgang til yderligere ressourcer og interaktive funktioner.

### forhåndsvisning din stream

Klik **se din stream** knap for at se præcis hvordan din live streaming siden vil se ud til besøgende, inkluderet dit logo, tjeneste gange og konfigurerede faner.

## opsætning af din YouTube live stream

For at forbinde din YouTube kanal til automatiseret live streaming:

1. Gå til **prædikener** og klik **Tilføj prædikenindtastning**, derefter vælg **Tilføj permanent live URL**.
2. Video providerstandarden er **nuværende YouTube live stream**. Anføre din **YouTube kanal ID**.
3. Tilføj titel og beskrivelse, derefter klik **gem**.
4. I **live stream gange**, opbygning en tjeneste og vælg din permanente live URL fra prædikenindtastning dropdown.

:::tip
For at finde din YouTube kanal ID, gå til din YouTube kanals avancerede indstillinger og kopier kanal ID værdien.
:::

## tilpas farver og logo

Din live stream siden bruger dit webstedsindhold [udseende](../website/appearance) indstillinger:

- **lys accent farve** med mørk tekst bliver brugt til headeren.
- **mørk accent farve** med lys tekst blive brugt til sidebjælken.
- Dit **lys bagrund logo** vises på streaming siden. Brug et billede med en transparent baggrund og en 4:1 aspect ratio.

For at ændre disse, gå til **websted** derefter **udseende** og opdater din [farve palet](../website/appearance#color-palette) og [logo](../website/appearance#logo-and-branding) indstillinger.

## Tilføj streaming værter

For at give holmedlemmer værtsevner (chat moderering, bøn anmodning svar):

1. Gå til **indstillinger** i venstre sidebar og klik **roller**.
2. Klik plus knappen og vælg **Tilføj brugerdefineret rolle**.
3. Navn rollen "streaming vært" og klik **gem**.
4. Klik den nye rolle, derefter klik **Tilføj** i medlemmer sektion for at tilføje folk.
5. Rul ned til **rediger tilladelser**, udvid **indhold** sektion og kontrollér **vært chat**.

Når værter logger ind på live stream siden, vil de have specielle evner inkluderet chat moderering og bøn anmodning styring.

:::info
For mere detaljer om opbygning af roller og administrering af tilladelser, se [roller og tilladelser](../settings/roles-permissions.md).
:::

## fejlfinding

Hvis din automatiseret YouTube live stream ikke vises korrekt når bruger "nuværende YouTube live stream" mulighed med din kanal ID, prøv følgende:

**symptomer:**
- Live stream indlejring viser "video utilgængelig"
- Siden loader men ingen video vises
- direkte YouTube indlejringer arbejde, men automatiseret kanal live stream gør ikke

**løsning**
Kontrollér din YouTube kanal til gamle eller kommende planlagte live streams og slet dem:

1. Gå til din YouTube studio.
2. Gå til **indhold** derefter **live**.
3. Se efter nogen gamle planlagte lives eller kommende planlagte strømme.
4. Slet disse gamle eller planlagte live stream poster.
5. Prøv dine live stream siden igen.

:::warning
YouTube automatiseret kanal live stream indlejring kan være blokeret når der er flere planlagte eller tidligere live stream poster i din kanal. Fjernelse af disse tillader YouTube til korrekt at identificere og serve din nuværende live stream.
:::

**yderligere krav:**
- Din live stream skal indstilles til **offentlig** (ikke på listen eller privat).
- indlejring skal være tilladt i dit YouTube stream indstillinger.
- Sørg for at du bruger **nuværende YouTube live stream** udbyder (med kanal ID), ikke **YouTube** udbyder (med video ID).

## Næste trin

- [administrering af prædikener](managing-sermons) -- Tilføj prædikener til dit bibliotek
- [playlister](playlists) -- Organiser prædikener ind i serier

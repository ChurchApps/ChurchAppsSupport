---
title: "Indstillinger for mobilappen"
description: "Konfigurer navigationsfanerne, flisene på startskærmen, login-prompten og privatlivsindstillingerne for medlemsoversigten i medlemsappen B1.church i B1 Admin."
---

# Indstillinger for mobilappen

<div class="article-intro">

Siden Indstillinger for mobilappen giver dig mulighed for at konfigurere navigationsfanerne, der vises i **B1.church-mobiloplevelsen (PWA)** for dine kirkemedlemmer. Du bestemmer, hvilke faner der er synlige, hvor de linker hen, og hvordan de vises.

</div>

## Træningsvideo

<YouTube id="ydY7WGK16fE" title="Tilpas din kirkes medlemsapp i B1" />

:::info
Faner, der konfigureres her, vises i B1 App, som medlemmer kan [installere som en Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md). Del din kirkes installationsside — `https://yourchurchname.b1.church/mobile/install` — med medlemmerne. Den guider dem gennem installationen af appen på deres enhed, uden at der kræves download fra App Store eller Google Play.
:::

<div class="prereqs">
<h4>Før du begynder</h4>

- Du skal have tilladelsen "Rediger kirkeindstillinger". Se [Roller og tilladelser](./roles-permissions.md), hvis du ikke har adgang.
- Konfigurer først dine [Kirkeindstillinger](./church-settings.md), herunder kirkens navn og branding

</div>

## Åbning af navigationsindstillinger

1. I B1 Admin skal du åbne [Jump-menuen](../introduction.md#getting-around-with-the-jump-menu) (søgefeltet øverst til venstre) og udvide **Mobil**.
2. Klik på **Navigation** (`/mobile/navigation`).
3. Siden Navigation viser dine nuværende app-faner.

## Tilføjelse af en ny fane

1. Klik på knappen **Tilføj fane** øverst på siden.
2. Udfyld fanens oplysninger:
   - **Navn** -- Etiketten, der vises på fanen (f.eks. "Prædikener" eller "Giv").
   - **Ikon** -- Klik på ikonvælgeren for at vælge et ikon til din fane.
   - **Billede** -- Klik på **Vælg billede** (eller **Skift billede**) for at give fanen et foto. Faner med et foto vises som fotoflisker på appens startskærm -- se [Fliser på startskærmen](#home-screen-tiles).
   - **Fanetype** -- Vælg blandt muligheder som Bibel, Livestream, Donation, Hjemmeside med flere.
   - **URL** -- Indtast den webadresse, fanen skal linke til.
   - **Synlighed** -- Styr, hvem der kan se fanen (alle, kun medlemmer osv.). For en **Medlemsoversigt**-fane styrer dette kun, hvem der ser selve fanen. Hvem der kan åbne oversigten, indstilles med **Vis i oversigt** på siden Medlemsportal (se [Indstillinger for medlemsoversigt og beskeder](#member-directory--messaging-settings)).
3. Klik på **Gem fane** for at tilføje den til din app.

## Redigering af en eksisterende fane

1. Klik på en eksisterende fane i listen **App-faner**.
2. Opdater fanens navn, ikon, URL, type eller synlighedsindstillinger.
3. Klik på **Gem fane** for at anvende dine ændringer.

## Omarrangering af faner

Du kan ændre rækkefølgen, som fanerne vises i mobilappen. Træk og slip fanerne i listen for at omarrangere dem. Rækkefølgen på denne side svarer til den rækkefølge, dine medlemmer ser i appen.

:::info
Nogle faner kan vises automatisk, når bestemte betingelser er opfyldt -- for eksempel kan en Livestream-fane dukke op, når en stream er aktiv. Manuelt tilføjede faner giver dig fuld kontrol over, hvad dine medlemmer ser til enhver tid.
:::

:::tip
Hold antallet af faner overskueligt. Tre til fem faner fungerer godt for de fleste kirker. For mange faner kan gøre navigationen forvirrende for dine medlemmer.
:::

## Indstillinger for medlemsoversigt og beskeder

Punktet **Medlemsportal** i samme Mobil-sektion indeholder indstillingerne for medlemsoversigten og privat messaging i B1.church-oplevelsen:

- **Godkendelsesgruppe for oversigt** -- Gruppen, der gennemgår opdateringer af medlemsoversigten og [anmodninger om sletning af konto](../profile/account-deletion.md), før de træder i kraft.
- **Vis i oversigt** -- Hvem der kan åbne medlemsoversigten, og hvem der er opført i den: **Kun administratorer**, **Medlemmer og højere** (standard), **Faste deltagere og højere** eller **Besøgende og højere**. Personer, hvis medlemsstatus er under det niveau, du vælger, ser ikke oversigten og er ikke opført i den. **Kun administratorer** lukker oversigten for alle undtagen medarbejdere med tilladelsen People &gt; View (en medarbejderstatus alene er ikke nok). Disse kan altid åbne oversigten og se alle, uanset hvad dette er indstillet til. Gæster medtages aldrig, da alle, der tilmelder sig selv online, starter som gæst.
- **Synlighedspræference** -- Angiver standardindstillingen for hele kirken for medlemmer, der endnu ikke har valgt deres egen. **Adresse**, **Telefonnummer** og **E-mail** har hver sin rullemenu med de samme fem niveauer, som er tilgængelige overalt, hvor synlighed konfigureres:
  - **Alle** -- synlig for alle, inklusive anonyme besøgende
  - **Medlemmer** -- kun synlig for personer med en Medlems- eller Medarbejderpost
  - **Kun gruppemedlemmer** -- kun synlig for personer, der deler en gruppe med denne person, samt medarbejdere
  - **Mine gruppeledere og medarbejdere** -- kun synlig for ledere af en gruppe, denne person tilhører, samt medarbejdere
  - **Kun medarbejdere** -- kun synlig for medarbejdere (alle, hvis medlemsstatus er Medarbejder, eller som har tilladelsen People &gt; View) og for personen selv

  "Medarbejder" i disse niveauer betyder alle, hvis medlemsstatus er Medarbejder, eller som har tilladelsen People &gt; View. Gruppeændringer træder straks i kraft: en person, der tilmelder sig en gruppe, eller gøres til gruppeleder, kan se de tilsvarende **Kun gruppemedlemmer**- eller **Mine gruppeledere og medarbejdere**-oplysninger om medlemmerne af den gruppe uden at logge ud og ind igen.

  Medlemmer kan tilsidesætte disse standarder for deres egen post under fanen **Privatliv** på deres profil i B1.church PWA'en -- se [Redigering af din profil](/docs/b1-church/getting-started/me-page).
- **Minimumsalder for private beskeder** -- En børnesikkerhedsfunktion. B1 åbner ikke en **ny** privat samtale, når en af parterne er under denne alder, baseret på fødselsdatoen (husstandsrollen bruges som reserve, når der ikke er registreret en fødselsdato). Personer under denne alder forbliver fuldt synlige i oversigten. Kun direkte beskeder blokeres, i **begge retninger**, for alle, inklusive medarbejdere. Gruppesamtaler og beskeder til et barns forældre virker stadig. Valgmulighederne er Fra, 13, 16 eller 18. Standarden er **18**. Eksisterende samtaler påvirkes ikke.

:::tip
Da kontrollen af minimumsalderen bygger på fødselsdatoer, skal du sørge for, at fødselsdatoer er udfyldt for børn i din menighed. Denne indstilling hører til samme familie af børnesikkerhedsfunktioner som [sikkerhedskontrollerne ved check-in](../attendance/checkin-safety.md).
:::

### Login-prompt på startskærmen

Besøgende, der åbner appens [startskærm](/docs/b1-church/getting-started/navigating#home) uden at logge ind, ser en kort prompt -- som standard *"Log ind for at se dine grupper, donationer og meget mere."* -- ved siden af en knap **Log ind**. Indstillingerne **Login-prompt på startskærmen** på samme side Medlemsportal (`/mobile/b1-mobile`) lader dig ændre den:

- **Vis login-prompt på appens startskærm** -- Slå dette fra for at skjule både prompten og knappen **Log ind** på startskærmen. Besøgende kan stadig logge ind via appens menu.
- **Tekst til login-prompt** -- Erstat standardteksten med din egen besked (op til 150 tegn). Lad feltet stå tomt for at bruge standardteksten. Feltet er deaktiveret, mens prompten er slået fra.

Klik på **Gem** for at anvende. En meddelelse **Gemt** bekræfter ændringen. Når du gemmer, opdateres appens cachede indstillinger, så ændringen vises, næste gang startskærmen indlæses.

### Fliser på startskærmen

Faner, der har et foto (se **Billede** under [Tilføjelse af en ny fane](#adding-a-new-tab)), vises på appens [startskærm](/docs/b1-church/getting-started/navigating#home) som fotoflisker i en sektion med din kirkes navn som overskrift. Dette gælder også en fane for Dagens vers, hvis du giver den et foto. Fotofaner vises stadig i fanelinjen.

Indstillingen **Fliser på startskærmen** på samme side Medlemsportal (`/mobile/b1-mobile`) styrer, hvordan disse fliser er opstillet. Vælg et **Layout**:

- **Gitter** -- To fliser pr. række (standard). Når antallet af fliser er ulige, strækker den første flise sig over hele bredden.
- **Rulbar række** -- En række fliser, som medlemmerne swiper sidelæns.
- **Rulning (automatisk)** -- Samme sidelæns række, men den bevæger sig også af sig selv og går videre til den næste flise cirka hvert fjerde sekund. Efter den sidste flise starter den forfra med den første. Den pauser, når et medlem rører ved, holder musen over eller tabber ind i rækken, og fortsætter et par sekunder senere. På enheder, der er indstillet til reduceret bevægelse, står rækken stille og fungerer som **Rulbar række**.
- **Liste** -- En liste med et lille fotothumbnail ved siden af hver fanes navn.

I begge rulbare layouts vises en række prikker under fliserne, når der er flere fliser, end der er plads til på skærmen. Der er én prik pr. flise, og den aktuelle flises prik er udfyldt. Medlemmer kan trykke på en prik for at springe til den pågældende flise.

Klik på **Gem** for at anvende.

### Sektioner på startskærmen

Loggede medlemmer ser altid deres egen deltagelseshistorik og indsendte formularer på [Me-siden](/docs/b1-church/getting-started/me-page). Kontakterne **Sektioner på startskærmen** på samme side Medlemsportal (`/mobile/b1-mobile`) kan vise dem på startskærmen også:

- **Vis Min deltagelse på startskærmen** -- Tilføjer en sektion **Min deltagelse** med, hvor mange gange medlemmet deltog i de seneste 90 dage, deres to seneste besøg og et link **Historik** til deres fulde deltagerliste.
- **Vis Mine formularer på startskærmen** -- Tilføjer en sektion **Mine formularer** med medlemmets to seneste formularindsendelser og et link **Alle formularer**.

Begge er slået fra som standard. En sektion vises kun for medlemmer, der er logget ind og har mindst én post at vise. Klik på **Gem** for at anvende.

## Hvor disse faner vises

Fanerne, du konfigurerer her, vises i **B1.church PWA'en**, som dine medlemmer installerer fra en hvilken som helst side på `https://yourchurchname.b1.church`. Ændringer, du foretager på denne side, afspejles, næste gang et medlem åbner appen.

På en telefon viser den nederste fanelinje **Startside**, op til tre af dine faner og **Mere**. På en computer viser headeren op til fem. Indbyggede skærme (som Prædikener, Giv eller Grupper) får deres pladser først, og fanerne **Intern side** fylder eventuelle ledige pladser. Fanerne **Ekstern URL** og **Dagens vers** får aldrig en plads. Alle faner, også dem der ikke får plads, vises på appens side **Mere**.

Faner placeret inde i en **Mappe**-fane er undtagelsen. De vises kun på mappens egen skærm, som medlemmerne åbner ved at trykke på mappen. Den skærm viser fanerne som fotoflisker, når alle har et billede, ellers som en liste. En mappe, der ikke indeholder faner, et medlem kan se, er skjult for det medlem. Se [Mappe-faner](../../b1-church/getting-started/navigating.md#folder-tabs). Se [Navigering i B1App](../../b1-church/getting-started/navigating.md) for, hvad medlemmerne ser.

## Næste skridt

- [Kirkeindstillinger](./church-settings.md) -- Konfigurer dine kirkeoplysninger og branding
- [Roller og tilladelser](./roles-permissions.md) -- Administrer adgang for dit team

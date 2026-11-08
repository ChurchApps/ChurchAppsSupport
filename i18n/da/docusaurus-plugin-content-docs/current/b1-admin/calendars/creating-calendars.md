---
title: "Kalendere oprettes"
description: "Opret en kalender i B1 Admin, tilslut grupper eller importer .ics-filer, og administrer dens begivenheder, tilmeldinger og noter ét sted."
---

# Kalendere oprettes

<div class="article-intro">

Når du opretter en kalender i B1 Admin, kan du bygge en udvalgt visning af begivenheder ved at tilslutte en eller flere grupper. Begivenheder administreres af gruppeledere inden for deres egne grupper, og din kalender viser disse begivenheder samlet ét sted. Administratorer med redigeringsadgang kan tilføje eller redigere begivenheder for alle grupper. Gruppeledere uden administratorrettigheder kan kun administrere begivenheder for de grupper, de leder.

</div>

## Træningsvideo

<YouTube id="Ko3kgsCSLFs" title="Oprettelse af kalendere, begivenheder og lokaleudlejning i B1" next="Begivenhedstilmelding og betalte begivenheder i B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Før du begynder</h4>

- Opsæt de [grupper](../groups/creating-groups.md), hvis begivenheder du vil medtage i din kalender
- Du skal have administrativ adgang til afsnittet Kalendere i B1 Admin

</div>

## Oprettelse af en ny kalender

1. Åbn i B1 Admin [hurtigmenuen](../introduction.md#getting-around-with-the-jump-menu) (søgefeltet øverst til venstre), udvid **Kalendere**, og klik på **Kalendere**.
2. Klik på **Tilføj kalender** øverst på siden. Formularen til en ny kalender åbnes under kalenderlisten.
3. Indtast et **navn** til din kalender (for eksempel "Ungdomsarrangementer" eller "Hovedkirkens kalender").
4. Tilføj eventuelt en **beskrivelse** for at hjælpe dit team med at forstå, hvad denne kalender er til.
5. Klik på **Opret** for at gemme din nye kalender.

## Kalendersiden med detaljer

Når du har oprettet en kalender, skal du klikke på **Administrer begivenheder** i dens række for at åbne siden med detaljer. Denne side har to hovedområder:

- **Venstre kolonne** -- Kalenderens navn med dens handlinger (**Ny begivenhed**, **Rediger**, **Importer .ics** og **Udskriv**), efterfulgt af listen **Grupper i kalenderen**, som viser hvilke grupper der er med i denne kalender. Klik på **Fjern** ved siden af en gruppe for at tage den ud af kalenderen.
- **Hovedområde** -- Visningen **Kalenderbegivenheder** med begivenheder hentet fra tilsluttede grupper, med knapperne **Abonner** og **Tilføj gruppe** over sig.

## Tilslutning af grupper

Grupper, der har begivenheder i kalenderen, vises automatisk i listen **Grupper i kalenderen** i venstre side af siden med detaljer.

1. Klik på **Tilføj gruppe** over kalenderen for at knytte en gruppe til din kalender.
2. Vælg gruppen fra rullelisten. Listen omfatter alle grupper i din kirke, ikke kun de grupper, du selv er medlem af.
3. Vælg, om du vil medtage **alle begivenheder** fra gruppen, eller kun **bestemte begivenheder**.
4. Klik på **Gem**.

Hver begivenhed vises kun én gang i kalenderen. Hvis du tilføjer en hel gruppe, bliver eventuelle begivenheder fra gruppen, som du allerede har tilføjet enkeltvis, samlet under gruppens post. Hvis du vælger bestemte begivenheder fra en gruppe, der allerede er i kalenderen, tilføjes der ikke noget nyt. Kun grupper, der er tilføjet som helhed, vises under **Grupper i kalenderen**.

### Import af en .ics-fil

Klik på **Importer .ics** for at hente begivenheder fra en anden kalender. Vælg den **gruppe**, begivenhederne skal tilhøre, klik derefter på **Vælg .ics-fil** eller indsæt filens indhold, og klik på **Importer**. Begivenhederne oprettes i den pågældende gruppe, og gruppen tilføjes til den kalender, du importerede fra, så begivenhederne vises der med det samme.

### Fjernelse af en begivenhed fra kalenderen

Klik på en begivenhed i kalenderen, og klik derefter på **Fjern fra kalender**. Dette fjerner kun begivenheden fra denne kalender -- selve begivenheden bliver liggende i sin gruppe. Hvis begivenheden er i kalenderen, fordi hele dens gruppe er tilføjet, fjerner du alle gruppens begivenheder fra denne kalender (begivenhederne forbliver i gruppen). Hvis du vil slette en begivenhed permanent, skal du slette den fra [gruppens kalender](../groups/group-calendar.md).

:::tip
At tilslutte grupper til din kalender er en effektiv måde automatisk at samle begivenheder. Når en gruppeleder tilføjer en begivenhed til sin [gruppe](../groups/creating-groups.md), kan den flyde ind i din kirkedækkende kalender uden ekstra arbejde fra din side.
:::

:::info
Hvis du vil oprette en enkelt kalender, der henter begivenheder fra mange grupper i din kirke, kan du se [Kurateret kalender](./curated-calendar.md), som er en mere strømlinet fremgangsmåde.
:::

## Tilføjelse og redigering af begivenheder {#adding-and-editing-events}

Klik på **Ny begivenhed** på kalenderens detaljeside for at tilføje en begivenhed, eller klik på en begivenhed i kalenderen og derefter på **Rediger** for at ændre den. Formularen **Ny begivenhed** / **Rediger begivenhed** har disse felter:

- **Gruppe** -- Den gruppe, begivenheden hører til. Hvis din kirke har begivenhedsskabeloner, kan du også vælge en **skabelon** for at udfylde formularen.
- **Titel**
- **Begivenhedsfoto** -- Klik på **Tilføj foto** (eller den tomme fotoboks) for at vælge eller uploade et billede, der beskæres til et bredt 16:9-format. Klik på **Skift foto** for at erstatte det. Fotoet vises øverst på begivenhedens side på din hjemmeside og som dens flise, når et Kalender-element viser **Kommende begivenheder** (se [Visning af begivenheder på din hjemmeside](#showing-events-on-your-website)).
- **Beskrivelse** -- Vises på begivenhedens side på din hjemmeside. Fed tekst, lister og links understøttes.
- **Start** og **Slut**, **Gentagelse** og **Synlighed** (**Offentlig** eller **Privat**).
- **Mærker** -- Kommaseparerede etiketter, for eksempel `ungdom, elever`. Et Kalender-element på din hjemmeside kan indstilles til kun at vise begivenheder med et bestemt mærke. Dette er det samme felt **Mærker**, som vises i begivenhedens tilmeldingsindstillinger.
- **Hvem kan se noter** og **Hvem kan skrive noter** -- Hvem der kan læse og tilføje noter til begivenheden (se [Begivenhedsnoter](#event-notes)). Vælg **Kun medarbejdere** (standard), **Gruppeledere** (ledere af begivenhedens gruppe) eller **Gruppemedlemmer** (alle i begivenhedens gruppe, inklusive dens ledere).
- **Lokaler** og **Ressourcer** -- Reserver plads og udstyr til begivenheden. Se [Lokaler, ressourcer og planlægning](./rooms-resources.md).

Klik på **Gem**. Hvis begivenheden gentages, beder B1 dig om at bekræfte, fordi lagring opdaterer alle forekomster i serien.

### Begivenhedsnoter {#event-notes}

Hver begivenhed har sin egen notetråd til planlægning og opfølgning. Klik på en begivenhed på kalenderens detaljeside; dialogen viser begivenhedens detaljer, dens påmindelser og dens **Noter** nedenunder. Skriv en note og send den for at tilføje den til tråden.

Medarbejdere med tilladelse til at redigere indhold eller administrere kalendere kan altid læse og skrive begivenhedsnoter. Indstillingerne **Hvem kan se noter** og **Hvem kan skrive noter** på begivenheden afgør, om begivenhedens gruppeledere eller -medlemmer også kan.

### Visning af begivenheder på din hjemmeside {#showing-events-on-your-website}

For at placere en kalender på din hjemmeside skal du tilføje et **Kalender**-element til en side og vælge denne kalender. Elementet kan vise en månedskalender eller et gitter med flise for kommende begivenheder, og kan begrænses til begivenheder med ét mærke. Besøgende, der klikker på en begivenhed, åbner begivenhedens egen side. Se [Brug af kalenderelementet](../website/page-editor.md#using-the-calendar-element).

## Aktivering af begivenhedstilmelding {#enabling-event-registration}

Du kan aktivere tilmelding til enhver kalenderbegivenhed, så medlemmer kan tilmelde sig via B1-hjemmesiden eller mobilappen.

1. Klik på en eksisterende begivenhed, eller opret en ny.
2. Slå **Tilmelding** til i begivenhedseditoren.
3. Konfigurer tilmeldingsindstillingerne:
   - **Kapacitet** (valgfri) -- Angiv et maksimalt antal tilmeldinger. Lad feltet være tomt for ubegrænset.
   - **Tilmelding åbner** -- Datoen og klokkeslættet, hvor tilmelding bliver mulig.
   - **Tilmelding lukker** -- Datoen og klokkeslættet, hvor tilmelding lukkes.
   - **Mærker** -- Kommaseparerede etiketter (f.eks. "ungdom, retræte, vbs") for at kategorisere begivenheder, man kan tilmelde sig.
   - **Tilmeldingsspørgsmål** -- Du kan eventuelt knytte en [formular](../forms/creating-forms.md), så tilmeldte besvarer ekstra spørgsmål (kostrestriktioner, T-shirt-størrelse, nødkontakt osv.) som en del af tilmeldingen. Vælg **Ingen** for at springe spørgsmål over.
   - **Aktiver venteliste** -- Når begivenheden er fuld, kan yderligere tilmeldte blive sat på en venteliste i stedet for at blive afvist. Se [Betalte tilmeldinger](./paid-registrations.md#waitlist).
4. Gem begivenheden.

For betalte begivenheder giver den samme indstillingsside dig mulighed for at definere prissatte **deltagertyper**, valgfrie **valg** (tilvalg) og **rabatkoder**, hvor betalingen opkræves via din kirkes givertjeneste. Se [Betalte tilmeldinger](./paid-registrations.md) for den fulde gennemgang.

Når tilmelding er aktiveret, vil medlemmer se knappen **Tilmeld dig denne begivenhed**, når de åbner begivenheden på [B1.church eller i B1-appen](../../b1-church/events/registering.md). Hvis du har knyttet en formular, ser tilmeldte et trin med **Spørgsmål** under tilmeldingen, og deres svar gemmes sammen med tilmeldingen.

:::info
Tilmeldingsspørgsmål fungerer kun med formularer, der **ikke** er markeret som begrænsede. En begrænset formular springes automatisk over under tilmeldingen i stedet for at blive vist, så brug en ikke-begrænset formular, når du knytter spørgsmål til en begivenhed.
:::

### Administration af tilmeldinger

Sådan ser og administrerer du tilmeldinger til dine begivenheder:

1. Vælg i hurtigmenuen **Kalendere > Tilmeldinger**.
2. Du får en tabel over alle begivenheder med aktiveret tilmelding, med begivenhedens titel, dato, aktuelt antal tilmeldinger i forhold til kapacitet og mærker.
3. Klik på en begivenhed for at se den fulde liste over tilmeldinger, inklusive navne, antal medlemmer, deltagertyper, betalingsstatus og tilmeldingsdato.
4. Fra detaljesiden kan du:
   - **Tilføj deltager** -- Tilmeld manuelt en person, der har tilmeldt sig offline eller telefonisk.
   - **Annuller** enkelte tilmeldinger
   - **Slet** tilmeldinger permanent
   - **Flyt op** tilmeldinger fra ventelisten, når en plads bliver ledig
   - **Eksporter CSV** -- Download alle tilmeldinger, inklusive deltagertyper, valg, betalingsbeløb og svar på spørgsmål

Hvis begivenheden har tilknyttede tilmeldingsspørgsmål, viser detaljesiden også et filter **Kun ubesvarede spørgsmål** for hurtigt at finde tilmeldte, som endnu ikke har indsendt svar, samt en knap **Se svar** ved hver besvaret tilmelding for at se deres svar. Betalte begivenheder tilføjer en kolonne **Type**, en kolonne **Betalt / i alt**, antal pr. type og en dialog med betalingsdetaljer -- se [Betalte tilmeldinger](./paid-registrations.md#the-registration-roster).

:::tip
Brug fremskridtslinjen for kapacitet til at følge med i, hvor hurtigt begivenhederne fyldes. Linjen bliver rød, når en begivenhed er nået til eller over kapacitet.
:::

## Næste skridt

- [Kurateret kalender](./curated-calendar.md) -- Opret en kalender, der henter fra flere grupper
- [Betalte tilmeldinger](./paid-registrations.md) -- Deltagertyper, tilvalg, rabatkoder, betalinger og ventelister
- [Guide til begivenhedstilmelding](../guides/event-registration.md) -- Trin-for-trin-guide til opsætning af begivenhedstilmelding
- [Oversigt over kalendere](./index.md) -- Gå tilbage til oversigten over kalendere

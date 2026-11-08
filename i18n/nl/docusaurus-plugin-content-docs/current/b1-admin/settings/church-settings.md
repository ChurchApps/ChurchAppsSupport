---
title: "Kerkinstellingen"
description: "Stel de naam, het adres, het subdomein, de tijdzone, het regioformaat, de sms-provider en de bestandsopslag van je kerk in op de pagina Kerkinstellingen in B1 Admin."
---

# Kerkinstellingen

<div class="article-intro">

Op de pagina Kerkinstellingen configureer je de basisgegevens, contactgegevens en huisstijl van je kerk. Deze gegevens worden gebruikt in alle ChurchApps-tools, waaronder je B1.church-website en de B1 App.

</div>

## Instructievideo

<YouTube id="634zSbzDkYA" title="Kerkgegevens en huisstijl instellen in B1" next="Rollen, rechten en je team uitnodigen in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Voordat je begint</h4>

- Je hebt de rechten "Kerkinstellingen bewerken" nodig. Zie [Rollen en rechten](./roles-permissions.md) als je geen toegang hebt.
- Zorg dat je het adres, de contactgegevens en het logo van je kerk bij de hand hebt

</div>

## Je kerkgegevens bewerken

1. Open in B1 Admin het [Sprongmenu](../introduction.md#getting-around-with-the-jump-menu) (de zoekbalk linksboven), klap **Instellingen** uit en klik op **Instellingen**.
2. Klik in de sectie **Kerkgegevens** (bovenaan de pagina) op **Bewerken**.
3. Werk een of meer van de volgende velden bij:
   - **Kerknaam** -- De naam die in alle ChurchApps-producten wordt getoond.
   - **Adres** -- Het fysieke adres van je kerk.
   - **Contactgegevens** -- Telefoonnummer, e-mailadres en andere contactgegevens.
   - **Tijdzone** -- De tijdzone van je kerk. Zie hieronder [Tijdzone](#time-zone).
4. Klik op **Opslaan** om je wijzigingen toe te passen.

## Je subdomein instellen

Je kerk krijgt een gratis subdomein op **jouwkerk.1.church**. Dit is het webadres waar leden en bezoekers je online aanwezigheid kunnen bekijken.

1. Klik op de pagina Instellingen in de sectie **Kerkgegevens** op **Bewerken** en zoek het veld **Subdomein**.
2. Voer je gewenste subdomein in (bijvoorbeeld "gracechurch" voor gracechurch.1.church).
3. Sla je wijzigingen op.

:::info
Je subdomein moet uniek zijn binnen alle ChurchApps-kerken. Als je gewenste naam al in gebruik is, probeer dan je stad of regio toe te voegen (bijvoorbeeld "gracechurch-dallas").
:::

Als bezoekers je site op je eigen domein moeten kunnen bereiken (bijvoorbeeld **`www.gracechurch.org`**), zie dan [Eigen domein](./custom-domain.md).

## Huisstijl instellen

Pas aan hoe je kerk verschijnt in alle ChurchApps-tools:

1. Upload je **kerklogo** door op het logogebied te klikken en een afbeeldingsbestand te selecteren.
2. Voeg eventuele extra **kerkafbeeldingen** toe die op je website en in de [mobiele app](./mobile-app.md) worden gebruikt.

:::tip
Voor het beste resultaat gebruik je een logo met een transparante achtergrond in PNG-formaat. Zo ziet het er goed uit op zowel lichte als donkere achtergronden.
:::

## Eerste dag van de week

Kies op welke dag je agenda's beginnen. De vervolgkeuzelijst **Eerste dag van de week** in de sectie Kerkgegevens staat standaard op **zondag**, maar je kunt elke dag kiezen. Na een wijziging wordt dit overal gebruikt in de agendaweergaven van B1 Admin en het ledenportaal van B1.church. Groepsagenda's, gecureerde agenda's en de evenementeneditor tonen weken dan vanaf de dag die je kiest.

## Tijdzone

Met de vervolgkeuzelijst **Tijdzone** in de sectie **Kerkgegevens** stel je de tijdzone van je kerk in (bijvoorbeeld *America/Chicago*). Kies **Geen** om het veld leeg te laten. Na het opslaan verschijnt de zone in het overzicht van de kerkgegevens.

B1 gebruikt deze tijdzone voor tijden die voor de hele kerk gelden, zoals herinneringen voor evenementen en de schema's op je [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md)-tv's. [Incheckschema's](../attendance/setup.md#setting-a-check-in-schedule) worden eerst gemeten in de tijdzone van de [locatie](./campuses.md) van de dienst. Alleen als die locatie geen tijdzone heeft, wordt de tijdzone van de kerk gebruikt. Als al je locaties in dezelfde tijdzone liggen, stel je die in op zowel de kerk als elke locatie.

## Regio (datum- en telefoonnotatie)

Met de instelling **Regio** bepaal je hoe datums en tijden in heel B1 worden geschreven. Standaard gebruikt B1 de Amerikaanse notatie (bijvoorbeeld "Sep 28, 2026" en "9/28/2026"). Kerken buiten de VS kunnen overschakelen naar hun eigen notatie. Kies bijvoorbeeld Engels (Verenigd Koninkrijk), dan wordt "28 Sept 2026" en "28/09/2026" getoond.

1. Klik op de pagina Instellingen in de linkerlijst op **Regio** en klik vervolgens in de sectie **Regio** op **Bewerken**.
2. Kies je regio in de vervolgkeuzelijst **Regio**. Elke optie toont een voorbeelddatum, zodat je precies ziet hoe datums eruitzien.
3. Klik op **Opslaan**.

De sectie Regio toont daarna je gekozen regio, een voorbeeld van het **Datumformaat** en je notatie voor **Telefoonnummers**.

### Telefoonnotatie

In dezelfde sectie Regio bepaalt de instelling **Telefoonnummers** hoe telefoonnummers worden ingevoerd in het profiel van een persoon:

- **Internationaal (met landcode)** -- de standaardinstelling. Telefoonvelden tonen een vlaggenkiezer voor het land en slaan nummers op met landcode (bijvoorbeeld +1 918 555 1234).
- **Lokaal (zoals ingevoerd)** -- telefoonvelden worden gewone tekstvelden en nummers worden precies opgeslagen zoals je ze typt, zonder landcode (bijvoorbeeld 0701 234 5678). Kies dit als je kerk nummers in een lokaal formaat schrijft en niet wil dat B1 een landcode toevoegt.

Als **Lokaal** is geselecteerd, toont de sectie Regio naast je regio ook "Lokale telefoonnummers".

:::tip
Sms'en werkt het best als nummers de landcode bevatten. Als je vanuit B1 sms'jes verstuurt, houd dan de notatie **Internationaal** aan, of zorg dat nummers die je in de modus Lokaal invoert de landcode bevatten.
:::

Je regio geldt voor datums en tijden in B1 Admin en op je B1.church-website en het ledenportaal, inclusief preken, blogberichten, groepsagenda's en dienstplannen. Zo zien leden datums in dezelfde notatie als je medewerkers.

## Sms'en {#texting}

Koppel een sms-provider om vanuit B1 Admin sms-berichten te sturen naar een persoon of een hele groep. Sms'jes worden verstuurd via je eigen account bij de provider, dus de prijzen en limieten van die provider gelden.

1. Klik op de pagina Instellingen in de linkerlijst op **Sms** en klik vervolgens in de sectie **Sms** op **Bewerken**.
2. Kies een **Provider**:
   - **Clearstream** -- voer een **API-sleutel** in. Maak die aan in je Clearstream-accountinstellingen onder API-sleutels.
   - **Text In Church** -- voer een **API-sleutel** in. Vraag eerst bij Text In Church Support om toegang tot de developer-API en maak daarna een sleutel aan in je accountinstellingen onder de sectie Developer API.
   - **Nalo Solutions** (Ghana) -- voer de authenticatiesleutel uit je Nalo Solutions-account in als **API-sleutel**, en een **Afzender-ID** (maximaal 11 tekens) die Nalo voor jou heeft goedgekeurd.
   - **Twilio** -- gebruik het eigen Twilio-account van je kerk; Twilio factureert je rechtstreeks. Kopieer de **Account SID** en het **Auth Token** uit de [Twilio Console](https://console.twilio.com) en voer een **Afzendernummer** in: een Twilio-telefoonnummer dat is geregistreerd voor A2P 10DLC, in een formaat zoals `+15551234567`. Plak na het opslaan de inkomende webhook-URL (zie hieronder) in de webhook **A message comes in** van het nummer in Twilio, zodat STOP-antwoorden ook in B1 worden geregistreerd.
3. Klik op **Opslaan**.

Om sms'en te stoppen, zet je **Provider** op **Geen** en sla je op. Dit verwijdert de opgeslagen provider.

### Personen die STOP antwoorden uitschrijven

Zodra een provider is opgeslagen, open je de sectie Sms opnieuw met **Bewerken**. Onder de instellingen van de provider toont een alleen-lezen veld **Inkomende (STOP) webhook-URL** een webadres dat uniek is voor je kerk. Klik in het veld om het adres te selecteren, kopieer het en plak het in de instelling voor inkomende berichten (antwoorden) van je sms-provider. Dit werkt met alle hierboven genoemde providers die inkomende antwoorden naar een webhook kunnen doorsturen.

Als iemand daarna op een van je sms'jes **STOP** antwoordt (of STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT of REVOKE), zoekt B1 iedereen met een overeenkomend mobiel nummer, markeert die personen als uitgeschreven en schakelt hun sms-herinneringen uit. Zij worden daarna overgeslagen bij groepssms'jes. Andere antwoorden worden genegeerd.

:::info
Dit gebruikt dezelfde uitschrijfinstelling als **Verberg mij in de ledengids**. Mensen die STOP antwoorden, worden daarom ook op hun profiel als **Verborgen in ledengids** getoond. Het veld verschijnt alleen als de opgeslagen provider is geselecteerd. Als je de vervolgkeuzelijst naar een andere provider zet, sla dan eerst op om de URL weer te zien.
:::

Zodra een provider is gekoppeld, zien medewerkers met de rechten om sms'jes te versturen een knop **Sms** op de pagina van een groep (**Sms naar deze groep**) en op die van een persoon met een mobiel nummer (**Sms-bericht versturen**). Typ je bericht en klik op **Verzenden**. Het dialoogvenster telt tekens en sms-segmenten. Bij een groep toont het hoeveel leden het bericht zullen ontvangen voordat je verzendt:

- Leden zonder mobiel nummer in het systeem worden overgeslagen.
- Leden die **Verberg mij in de ledengids** hebben gekozen, worden als uitgeschreven geteld en overgeslagen.
- Gezinsleden die een mobiel nummer delen, ontvangen het bericht maar één keer.

### Sms'jes personaliseren met samenvoegvelden {#personalizing-texts-with-merge-fields}

Onder het berichtvak toont het sms-venster tijdelijke aanduidingen als knoppen: **Voornaam**, **Achternaam**, **Weergavenaam** en **Kerknaam**. Klik op een knop om de bijbehorende aanduiding (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` of `{{churchName}}`) op de plek van je cursor in te voegen. Bij het verzenden wordt elke aanduiding vervangen door de gegevens van de ontvanger. Zo bereikt een groepssms zoals `Hi {{firstName}}, see you Sunday!` elk lid met de eigen naam. Aanduidingen werken zowel bij groepssms'jes als bij sms'jes naar één persoon. Bij sms'jes naar een groep is er ook een knop **Groepsnaam** (`{{groupName}}`), die wordt vervangen door de naam van de groep.

Wil je een bericht hergebruiken, sla het dan op als [sms-sjabloon](./email-templates.md#text-templates) (een e-mailsjabloon met de categorie **Sms**) en kies het bij **Sjabloon laden (optioneel)** bovenaan het sms-venster.

:::info
De limiet van 1.600 tekens geldt voor het bericht zoals je het typt. Nadat de aanduidingen zijn ingevuld, wordt tekst die langer is dan 1.600 tekens na die lengte afgekapt.
:::

Sms'jes kunnen ook automatisch worden verstuurd via een stap in een [workflow](../serving/workflows.md#sending-a-text) met de actie **Sms versturen**. Die gebruikt dezelfde provider en aanduidingen.

## Bestandsopslag

Standaard gebruiken bestanden die je via [Bestanden](../website/files.md) op je website uploadt, en andere inhoudsonderdelen, de gratis gehoste opslag van B1, tot 100 MB. Heb je meer ruimte nodig, dan kun je in plaats daarvan je eigen cloudopslag koppelen. Nieuwe uploads gaan dan rechtstreeks naar je eigen account, zonder limiet van het platform.

1. Klik op de pagina Instellingen in de linkerlijst op **Bestandsopslag** en klik vervolgens in de sectie **Bestandsopslag** op **Bewerken**.
2. Kies een provider: **Google Drive**, **Dropbox**, **OneDrive** of een **S3-compatibele bucket** (AWS S3, Cloudflare R2, Backblaze B2, enz.).
3. Klik bij Google Drive, Dropbox of OneDrive op **Verbinden** en log in om toegang te autoriseren. Voor een S3-compatibele bucket voer je je toegangssleutel, geheime sleutel, bucketnaam en basis-URL voor publieke toegang in.
4. Klik op **Opslaan**.

:::info
Dit geldt alleen voor nieuwe uploads naar Bestanden op je website en vergelijkbare inhoudsonderdelen. Galerijafbeeldingen, miniaturen, logo's en foto's van personen blijven altijd op de standaardopslag van B1.
:::

## Klimmen naar volgende klas

Als je **Klas** bijhoudt voor kinderen en leerlingen, kan B1 iedereen automatisch één klas hoger zetten op een datum die je kiest (bijvoorbeeld 1 augustus). Zo hoef je elk profiel niet handmatig te bewerken.

1. Klik op de pagina Instellingen in de linkerlijst op **Klimmen naar volgende klas** en klik vervolgens in de sectie **Klimmen naar volgende klas** op **Bewerken**.
2. Zet de schakelaar aan (er verschijnt **Ingeschakeld**) en kies de **Maand** en **Dag** waarop de klassen elk jaar worden verhoogd. Op die datum gaat iedereen met een klas één klas omhoog, en gaan leerlingen van de 12e klas naar **Afgestudeerd**.
3. Sla je wijzigingen op.

Om het automatisch verhogen te stoppen, zet je de schakelaar uit zodat er **Uitgeschakeld** staat, en sla je op. De datum voor het verhogen wordt dan verwijderd en klassen veranderen niet meer vanzelf.

## Aanmelden als vrijwilliger {#volunteer-signup}

Standaard zien leden die [vrijwilligersaanmeldingen](../../b1-church/serving/volunteer-signup.md) bekijken elke komende week met open posities. Als die lijst lang wordt, kun je alleen de eerstvolgende week per type planning tonen.

1. Klik op de pagina Instellingen in de linkerlijst op **Aanmelden als vrijwilliger** en klik vervolgens in de sectie **Aanmelden als vrijwilliger** op **Bewerken**.
2. Zet **Toon alleen de eerstvolgende week per type planning** aan.
3. Sla je wijzigingen op.

Als dit aan staat, toont elk type planning alleen de eerstvolgende komende planning. De volgende week verschijnt zodra die datum is verstreken. In de sectie staat bij **Getoonde weken** **Alleen de eerstvolgende week per type planning** of **Alle komende weken**.

## Privacy van giften {#giving-privacy}

Mensen met toegang tot giften zien normaal gesproken de giftentotalen van een persoon op diens [persoonsprofiel](../people/adding-people.md#editing-details). Als je niet elke keer dat een profiel wordt geopend de bedragen op het scherm wilt hebben, kun je ze verbergen tot iemand erom vraagt.

1. Klik op de pagina Instellingen in de linkerlijst op **Privacy van giften** en klik vervolgens in de sectie **Privacy van giften** op **Bewerken**.
2. Zet **Verberg giften op persoonsprofielen tot er geklikt wordt** aan.
3. Sla je wijzigingen op.

Als dit aan staat, staat er op de giftenkaart van een persoonsprofiel "Giften zijn verborgen op persoonsprofielen." Klik op **Giften tonen** om de giften van die persoon te laden en weer te geven. Ze worden weer verborgen zodra je een ander persoonsprofiel opent. Wie giften kan zien, verandert niet: alleen mensen met toegang tot giften zien de kaart.

## Importeren en exporteren

De link **Import/Export** onder de naam van je kerk op de pagina Instellingen opent een speciale tool in een nieuw browservenster. Gebruik deze om:

- Ledengegevens uit een ander kerkbeheersysteem te importeren.
- Je ChurchApps-gegevens te exporteren voor een back-up of migratie.

Dit is vooral handig wanneer je je kerk net instelt en bestaande gegevens naar ChurchApps moet overzetten.

:::warning
Maak bij het importeren van gegevens altijd eerst een back-up van je bestaande gegevens. Importbewerkingen voegen gegevens toe aan je systeem en kunnen dubbele vermeldingen maken als ze meerdere keren worden uitgevoerd.
:::

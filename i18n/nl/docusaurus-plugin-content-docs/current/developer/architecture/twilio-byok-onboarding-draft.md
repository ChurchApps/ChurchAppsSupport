---
title: "Twilio-kerkonboarding (concept)"
description: "Concept voor de Twilio-installatie van de kerk in B1, openbare aanmeldingsrichtlijnen, campagnevoorbeelden en een controlelijst voor goedkeuring."
---

# Concept voor kerkeigen Twilio-onboarding

:::caution Concept voor de voorgestelde integratie
Dit is een voorgestelde werkwijze. B1 heeft nu een basiskeuze voor **Twilio** onder **Instellingen > Texting** (Account SID, Auth Token, Afzendnummer en het inkomende STOP-webhook) -- zie [Kerkinstellingen: Texting](../../b1-admin/settings/church-settings.md#texting). De aanvullende B1-instellingen, de koppeling van toestemming en de validatiestappen hieronder zijn vereisten voor een toekomstige release, geen instructies om naar bestaande instellingen te zoeken. Lees het [technische voorstel](./twilio-byok-proposal.md) voor de reikwijdte en afhankelijkheden. De Twilio-bronnen zijn gecontroleerd op 22 oktober 2026; controleer de actuele vereisten voordat u een campagne indient.
:::

## De aanbevolen opzet

Uw kerk is eigenaar van het betaalde Twilio-account, het telefoonnummer, de Messaging Service, de facturering en de campagneregistratie. B1 zou via die middelen verzenden met inloggegevens die privé in de kerkinstellingen zijn ingevoerd. Zorg dat minstens twee geschikte kerkbeheerders toegang hebben tot het Twilio-account, schakel accountbeveiliging in en wijs een persoon aan die verantwoordelijk is voor toestemming, inkomende antwoorden en afwijzingsberichten.

De eerste voorgestelde release dekt één Amerikaans lokaal nummer en één duidelijk omschreven kerkelijk berichtenprogramma. De voorbeelden hieronder gebruiken het fictieve **Grace Community Church**-programma **Grace Church Updates** voor wijzigingen in diensten, herinneringen voor evenementen en planning van vrijwilligers. Vervang elke naam, elk domein, elke frequentie, elk contactpunt en elk doel door de werkelijke praktijk van de kerk. Dit zijn kerkspecifieke voorbeelden van de regels van Twilio, geen vooraf goedgekeurde campagne en geen belofte van goedkeuring.

## 1. Bereid de openbare B1-aanmeldervaring voor

Publiceer een pagina zoals `https://www.example.org/text-updates` op de website van de kerk, met een ingesloten openbaar B1-formulier of een duidelijke link naar het zelfstandige openbare formulier. Publiceer ook `https://www.example.org/privacy` en `https://www.example.org/sms-terms`. Die adressen zijn tijdelijke aanduidingen; dien de daadwerkelijk bereikbare URL's in.

Voor het voorgestelde sms-aanmeldformulier:

| Instelling | Aanbevolen configuratie |
|---|---|
| Toegang | Openbaar/zonder beperking; actief tijdens de beoordeling en bij voortdurende inschrijving; beschikbaar zonder inloggen |
| Formuliermodus | Aanvankelijk de standaardmodus; de conversatiemodus vereist de expliciete toestemmingsondersteuning die in het technische voorstel is beschreven |
| Mobiel | Duidelijk gelabeld met landcode; alleen verplicht bij het kiezen van sms-inschrijving, als het binnen een algemeen verbindings- of evenementformulier wordt gebruikt |
| Sms-keuze | Apart optioneel selectievakje, standaard niet aangevinkt, gekoppeld aan het specifieke programma en het mobiele veld |
| Mededelingen | Zichtbaar naast de sms-keuze: kerk/programma, doel en frequentie van berichten, mogelijke tarieven, STOP, HELP, contact voor ondersteuning, en echte klikbare links naar het privacybeleid en de sms-voorwaarden |
| Andere acties | Gasten kunnen de verbindingskaart indienen, zich voor een evenement inschrijven of informatie aanvragen zonder zich voor sms aan te melden |
| Bewijs | Sla programma, exact telefoonnummer, gekozen toestemming, bronindiening, servertijd en de versie van de mededeling of het beleid op; een gewoon formulierantwoord alleen schrijft vandaag niemand in |
| Automatisering van personen/groepen | Houd de automatische aanmaak van personen en de groepstoewijzing uit voor een eerste aanmeldproef, tenzij ze zijn beoordeeld op de bestaande matchingregels van de kerk. Groepstoewijzing is nooit de sms-autorisatie. |
| Bestaande automatiseringen | Schrijf niet elke formulierinzender of groepslid in een tekstberichtenworkflow in. Alleen de voorgestelde geverifieerde toestemmingskoppeling mag dat programma autoriseren. |
| Bedankbericht | Bevestig dat het formulier is ontvangen, zonder te beweren dat iemand voor sms is ingeschreven wanneer het vakje is geweigerd of de bevestiging of beoordeling nog loopt. |

Een bestaande selectievakjesvraag kan het formulier illustreren, maar B1 heeft nog steeds het toestemmingsregister en de verzendcontroles nodig. De huidige gedeelde weergave toont beschrijvingen als gewone tekst; Markdown of een URL typen is daar onvoldoende garantie dat beleidslinks klikbaar zijn. De implementatie moet een toegankelijk toestemmingsbedieningselement met echte links bieden. Zie [formulieren maken in B1](../../b1-admin/forms/creating-forms.md) en het [technische voorstel](./twilio-byok-proposal.md#consent-and-suppression-are-required-release-work).

Twilio vereist een vrijwillige, verifieerbare opt-in. Combineer sms niet met verplichte lidmaatschapsvoorwaarden, e-mail- of telefoontoestemmingen, schenkingstoestemming of evenementregistratie. Een mobiel nummer op een bezoekerskaart is op zichzelf geen sms-toestemming. Zie de [vereisten voor vrijwillige toestemming](https://www.twilio.com/docs/api/errors/30923) van Twilio en de [aanbevelingen voor campagnes](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Voorbeeldtekst voor aanmelding

Gebruik dit pas nadat de kerk de daadwerkelijke doelen, afzender en frequentie heeft gekozen. Het selectievakje is optioneel en staat standaard uit; de beleidsnamen hieronder moeten in het weergegeven formulier links zijn.

> Ja, ik wil dat Grace Community Church me via Grace Church Updates een sms stuurt over wijzigingen in de diensten, kerkevenementen en vrijwilligersroosters vanaf [geregistreerd kerknummer]. Verwacht maximaal 4 berichten per maand. Standaard berichten- en datatarieven kunnen van toepassing zijn. Antwoord STOP om je af te melden of HELP voor hulp. Aanmelden voor sms is optioneel en niet nodig om aanwezig te zijn, je in te schrijven of te geven. Bekijk ons privacybeleid en onze sms-voorwaarden. Vragen: [e-mail of telefoon voor kerkondersteuning].

„Maximaal 4” is een voorbeeldbelofte, geen door Twilio voorgeschreven limiet. Vervang het door een frequentie die de kerk daadwerkelijk kan nakomen; als de frequentie varieert, meld dat eerlijk en beschrijf het verwachte ritme. Houd promotionele boodschappen of extra kerkelijke programma's buiten dit vakje, tenzij hun doelen en toestemming afzonderlijk zijn beoordeeld.

Bij een algemeen bezoekers- of evenementenformulier moet indienen met dit vakje uit nog steeds slagen. Een apart sms-formulier mag uitleggen dat aanvinken om inschrijving vraagt, maar het mag nooit andere kerkdiensten afhankelijk maken van inschrijving. Controleer het werkelijke gedrag op zowel telefoon als desktop.

### Te bereiden beleidstekst

De privacypagina van de kerk moet uitleggen welke gegevens zij voor tekstberichten verzamelt, hoe zij die gebruikt en beschermt, en wat haar bewaar- en contactpraktijken zijn. Zij moet duidelijk vermelden dat mobiele nummers en berichttoestemmingen niet worden verkocht of gedeeld met derden of gelieerde partijen voor hun marketing of promotie. Leg de noodzakelijke verwerking door dienstverleners nauwkeurig uit; beweer niet dat de kerk nooit een verwerker gebruikt terwijl zij B1 en Twilio gebruikt. De [richtlijnen voor privacybeleid](https://www.twilio.com/docs/api/errors/30908) en de [aanbevelingen voor campagnes](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) van Twilio zijn de referentie voor dit onderscheid.

De sms-voorwaarden moeten de kerk en het programma identificeren, de doelen, de werkelijke frequentie, mogelijke berichtkosten, STOP- en HELP-instructies, het contact voor ondersteuning en de privacylink vermelden; neem ook aanvullende mededelingen op die de huidige beoordeling door Twilio vraagt. De beleidslinks op de opt-inpagina moeten precies overeenkomen met de URL's die in de campagne zijn ingediend. Sinds 30 juni 2026 vereist Twilio voor nieuwe API-campagneregistraties openbare, specifieke URL's voor privacybeleid en voorwaarden; ook de Console-stroom vraagt daarom. [Vereiste van Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Dit zijn inhoudelijke vereisten die u op het werkelijke beleid van de kerk moet toepassen; ze vervangen het bestaande privacybeleid niet en zijn geen generieke tekst om zonder controle te plakken.

## 2. Registreer de kerk en haar berichtenprogramma bij Twilio

1. Maak een **betaald account in eigendom van de kerk** aan, of gebruik er een, met een sms-geschikt Amerikaans lokaal nummer. Gebruik de wettelijke naam van de kerk, het EIN/bedrijfsregistratienummer, het adres, de website en de bevoegde vertegenwoordiger consequent. Vervang de identiteit van ChurchApps of van een andere kerk niet door die van uw kerk.
2. Volg de registratiestroom voor een directe klant met een merk bij Twilio die past bij het werkelijke type organisatie van de kerk. Voor een in aanmerking komende non-profit gebruikt u de [richtlijnen voor non-profitregistratie](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Gebruiksscenario's voor goede doelen of 501(c)(3)-organisaties hangen af van de geschiktheid; de naam van een kerk alleen bewijst geen goedkeuring of vrijstelling bij Twilio.
3. Maak een aparte Messaging Service aan en dien de relevante A2P 10DLC-campagne in. Kies het gebruiksscenario dat de werkelijke berichten en de opties voor dat goedgekeurde merk waarheidsgetrouw weergeeft; de voorbeelden hier schrijven geen universele gebruikscode voor kerken voor.
4. Lever de openbare aanmeld-URL, de beleids-URL's, de volledige beschrijving van opt-in en berichtstroom, en de gevraagde voorbeeldberichten aan. Vermeld elke werkelijke aanmeldmethode; laat de verklaringen over ingesloten links en telefoonnummers aansluiten op de werkelijke inhoud. Vermeld geen aanmelding via trefwoord of dubbele opt-in, tenzij die stroom bestaat en is getest.
5. Koppel het verzendnummer aan de service en de goedgekeurde campagne. Wacht op zowel de verificatie van de campagne **als de voltooide nummerregistratie** voordat u verzendt.

Voer deze stappen uit in de eigen Twilio-console van de kerk. De voorgestelde B1-integratie dient geen registraties in namens kerken. De [registratiegids](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) en de [campagnebron](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) van Twilio leggen de registratievelden en de status uit. Een nummer dat nog in behandeling is, kan verzending blokkeren, ook nadat een campagne is goedgekeurd. [Nummerregistratie](https://www.twilio.com/docs/api/errors/30035)

### Voorbeeld van een campagnebeschrijving

> Grace Community Church gebruikt Grace Church Updates om wijzigingen in het dienstrooster, herinneringen voor kerkevenementen en berichten over vrijwilligersplanning te sturen naar mensen die dit programma op onze openbare website kiezen. Via dit programma sturen wij niet meer dan vier berichten per maand. Ontvangers kunnen deze berichten op elk moment stopzetten. Dit programma omvat geen gekochte contacten, promoties van derden of fondsenwervingsacties.

Dit voorbeeld past alleen bij een kerk die die limieten en uitsluitingen daadwerkelijk naleeft. Als alleen al vrijwilligersherinneringen de beloofde frequentie overschrijden, pas dan het ontwerp van het programma en de mededeling aan vóór indiening.

### Voorbeeld van een beschrijving van de berichtstroom

> Bezoekers openen [werkelijke aanmeld-URL van de kerk], vullen hun mobiele nummer in en kiezen zelfstandig het optionele selectievakje voor Grace Church Updates. Het vakje is niet aangevinkt wanneer het formulier wordt geopend. De mededeling noemt Grace Community Church, beschrijft wijzigingen in de diensten, herinneringen voor evenementen en vrijwilligersroosters, geeft de maandelijkse limiet en mogelijke tarieven, en legt STOP en HELP uit. De getoonde Privacy Policy en sms-voorwaarden verwijzen naar [werkelijke privacy-URL] en [werkelijke sms-voorwaarden-URL]. Wie geen sms kiest, wordt niet verhinderd om aanwezig te zijn, zich voor een evenement in te schrijven, te geven of het algemene verbindingsformulier te gebruiken. B1 registreert de bevestigende keuze, het telefoonnummer, de indieningstijd en de versie van de mededeling. Wij sturen dit programma alleen naar de gedocumenteerde abonnees en onderdrukken intrekkingen voordat er verdere berichten worden verstuurd.

Pas deze alinea aan de geïmplementeerde stroom aan. Als telefonische bevestiging of beoordeling door medewerkers wordt gebruikt, beschrijf dan de wachtstatus en de precieze activeringsstap. Als andere methoden worden gebruikt, neem elke methode en het bijbehorende bewijs op. Waar aanmelding achter een login zit of op papier gebeurt, vraagt Twilio om openbaar, geredigeerd bewijs van de werkelijke opt-inervaring; toon nooit ingevulde formulieren of ledengegevens. [Richtlijnen voor verifieerbare opt-in](https://www.twilio.com/docs/api/errors/30923)

### Voorbeeldberichten voor uitgaand verkeer

Dit zijn fictieve voorbeelden om aan te passen; gebruik echte kerk-URL's en vervang de tussen haakjes geplaatste waarden voordat u indient. De campagne-API van Twilio accepteert twee tot vijf voorbeelden. Voorbeelden moeten de kerk identificeren, het vermelde doel weerspiegelen en een afmeldinstructie bevatten. [Velden voor campagnevoorbeelden](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: De dienst van zondag begint om [tijd] vanwege [reden]. Details: [website van de kerk]. Antwoord STOP om sms-berichten te beëindigen.
```

```text
Grace Community Church: Een herinnering dat [kerkevenement] plaatsvindt op [datum] om [tijd]. Informatie: [URL van het kerkevenement]. Antwoord STOP om sms-berichten te beëindigen.
```

```text
Grace Community Church: Je bent ingepland om te dienen bij [team] op [dag]. Bekijk je planning: [URL van het B1-kerkportaal]. Antwoord STOP om sms-berichten te beëindigen.
```

De tussen haakjes geplaatste URL's beschrijven voorbeeldvariabelen; de ingediende voorbeelden moeten het echte domein van de kerk en de werkelijke linkstijl tonen. Een link naar een planning kan inloggen vereisen, maar de aanmeldpagina en het beleid die voor de beoordeling worden gebruikt, moeten openbaar te bekijken zijn. Neem geen privénotities, gegevens over kinderen of identificeerbare ledengegevens op in goedkeuringsvoorbeelden. Houd de voorbeeldinhoud consistent met wat de sjablonen van B1 daadwerkelijk versturen; beloof geen antwoordinbox of een bepaald herinneringsgedrag dat niet beschikbaar is.

### Antwoorden op STOP, START en HELP

Gebruik Twilio Messaging Service Advanced Opt-Out voor deze bevestigingen en pas de identiteit van de kerk en het programma en de ondersteuningsgegevens aan. Voorbeeld van de bedoelde antwoorden:

- **STOP:** Bevestig dat Grace Church Updates is gestopt en leg uit hoe je het op de ondersteunde manier weer kunt activeren.
- **START:** Bevestig dat hetzelfde programma weer wordt opgestart, inclusief de identiteit, het ritme of de tarieven en de hulp- en stopinstructies die de geconfigureerde stroom vereist.
- **HELP:** Identificeer Grace Community Church en geef het werkelijke contact voor ondersteuning en de afmeldinstructies.

Stuur geen tweede bevestiging vanuit B1 wanneer Twilio al heeft geantwoord. Een HELP-antwoord is geen inschrijving. START mag niemand aanmelden voor extra kerkelijke programma's of die tonen in de ledenlijst. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Controleer het goedkeuringspakket vóór indiening

- [ ] De werkelijke wettelijke gegevens van de kerk, haar websiteidentiteit en het doel van de campagne komen overeen.
- [ ] De aanmeldpagina en het actieve formulier openen zonder login in een privévenster, ook op een mobiel apparaat.
- [ ] Het sms-vakje staat standaard uit en kan worden geweigerd terwijl de primaire bezoekers- of evenementactie wordt voltooid.
- [ ] Programmadoel, afzender, werkelijke frequentie, mogelijke kosten, STOP, HELP, contact voor ondersteuning en klikbare beleidslinks staan naast de sms-keuze.
- [ ] De exacte privacy- en voorwaarden-URL's die aan Twilio zijn opgegeven, zijn openbaar, werken zonder inloggegevens en identificeren dezelfde kerk en hetzelfde programma. De beleidsinhoud komt overeen met de werkelijke verwerking.
- [ ] Elk voorbeeldbericht past bij het programma, de werkelijke afzenderidentiteit en het verwachte link- en telefoongedrag. De campagne beschrijft elke werkelijke opt-inmethode.
- [ ] Geredigeerde schermafbeeldingen tonen het lege formulier, het vakje met de mededelingen en de beleidslinks zoals beoordelaars die zien. Het bewijs bevat geen ledengegevens of sleutels.
- [ ] De kerk heeft een werkbare manier om bewijs van toestemming te bewaren en intrekkingen na te komen vóór verzending, ook verzoeken die telefonisch of per e-mail binnenkomen.

Deze controles voorkomen vermijdbare afwijkingen; Twilio en de beoordelingspartners nemen de goedkeuringsbeslissing. Houd de werkelijke aanmeldpagina en beleids-URL's ook na goedkeuring beschikbaar, niet alleen tijdens de beoordeling.

## 4. Koppel en valideer de toekomstige B1-integratie

Na oplevering van de integratie moet de voorgestelde Texting-instelling het Account SID van de kerk, een toegewijde API Key SID en -geheim, een apart Auth Token voor het webhook, het Messaging Service SID en de gekozen afzender vragen. Maak sleutels alleen aan in de Console van de kerk en voer geheimen alleen in de privé-instellingen van B1 in. [Richtlijnen voor Twilio API-sleutels](https://www.twilio.com/docs/iam/api-keys)

Kopieer de kerkspecifieke URL's voor inkomende berichten en leveringsstatus die B1 levert naar de bijbehorende Twilio-serviceconfiguratie. Schakel Advanced Opt-Out in en controleer of inkomende berichten het geconfigureerde webhook bereiken. B1 moet afzonderlijke controles tonen voor inloggegevens, eigendom van service en afzender, geverifieerde campagne, voltooide nummerregistratie, verificatie van inkomende berichten en het geslaagde testbericht. Een opgeslagen inloggegeven of een geaccepteerd API-verzoek is niet hetzelfde als definitieve aflevering.

Als B1 een registratiesignaal niet programmatisch kan controleren, bevestig het dan rechtstreeks in de Console; de interface moet het gedateerde resultaat labelen als door de beheerder bevestigd. Los de status „in behandeling” of „mislukt” op voordat u productieberichten inschakelt. Gebruik een apart, expliciet aangevraagd testbericht naar een echte, instemmende volwassen testontvanger, en daarna:

1. Bevestig dat een overeenkomende gedocumenteerde aanmelding het juiste telefoon- en programmatoestemmingsrecord aanmaakt; weigeren of een telefoonwijziging mag een ontvanger niet stilzwijgend inschrijven.
2. Verstuur één testbericht, bevestig de ontvangst en vergelijk de B1-status met het Twilio Message SID en de leveringsuitkomst.
3. Antwoord STOP en controleer of handmatige berichten, groepsberichten, workflows en herinneringen dat telefoonnummer overslaan. De zichtbaarheid in de ledenlijst mag niet veranderen.
4. Test de gedocumenteerde hernieuwde aanmelding voor hetzelfde programma en het HELP-antwoord; controleer dat er geen dubbele bevestigingen zijn en geen ongerelateerde voorkeurswijzigingen.

## 5. Onderhoud het programma

Wijs een verantwoordelijke binnen de kerk aan die de status van campagne en account, saldo- en factureringsmeldingen, verzendfouten en inkomende antwoorden in Twilio bewaakt. De voorgestelde eerste B1-release heeft geen conversatie-inbox voor sms; publiceer en bewaak daarom een echt hulpcontact en controleer antwoorden, in plaats van aan te nemen dat medewerkers ze in B1 zien.

Bewaar de geschiedenis van toestemming en intrekking, de huidige versies van mededelingen en beleid, campagne-identificatoren en geredigeerd goedkeuringsbewijs in door de kerk beheerde administratie. Plak nooit sleutels of ontvangerlijsten in openbare supporttickets. Als een nummer, service, inloggegevens, aanmeldstroom, frequentie of doel verandert, controleer dan de integratie opnieuw en werk de registratie en toestemming bij waar nodig voordat u hervat. Controleer gedeelde huishoudnummers en gewijzigde nummers zorgvuldig; de geschiktheid volgt de instemmende telefoon en het programma, niet het record van elk gezinslid.

Bij afwijzing leest u de daadwerkelijke Twilio-foutmelding, corrigeert u de specifieke inconsistentie op zowel de website als in de indiening, en dient u opnieuw in via de Console van de kerk. Bij niet-geregistreerde of nog lopende afzenders wacht u tot de registratie is afgerond, in plaats van nummers te wisselen om het probleem te omzeilen. Gebruik de [probleemoplossing voor registratie](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) van Twilio en de meegeleverde referentie voor foutcodes. Beloof geen vaste doorlooptijd.

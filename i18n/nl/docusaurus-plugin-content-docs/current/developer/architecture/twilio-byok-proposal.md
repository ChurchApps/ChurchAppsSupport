---
title: "Twilio BYOK (voorstel)"
description: "Voorgestelde door de kerk beheerde Twilio-integratie, toestemmingsmodel, implementatiereikwijdte en releasecriteria."
---

# Voorstel voor Twilio BYOK-integratie

:::caution Voorstel — geen beschikbare integratie
Dit is een ontwerp ter beoordeling door de beheerders, gebaseerd op openbare broncode en Twilio-documentatie die op 22 oktober 2026 is bekeken. Sindsdien is een basis-Twilio-provider uitgebracht (`@churchapps/texting` 0.6.0 en B1 Admin **Settings > Texting**): de kerk voert haar Account SID, Auth Token en een From-nummer in (de provider accepteert ook een Messaging Service SID die begint met `MG`, maar de kolom `fromNumber` is nog steeds `varchar(20)`, te kort voor een SID van 34 tekens). Berichten worden verstuurd met één verzoek per ontvanger via de Messages API van Twilio, en STOP-antwoorden bereiken B1 via het bestaande inkomende webhook. Zie [Kerkinstellingen: Texting](../../b1-admin/settings/church-settings.md#texting). Het toestemmingsmodel, de afhandeling van Advanced Opt-Out, de bezorgstatus en de gereedheidscontroles hieronder zijn nog steeds voorstellen en geen uitgebracht gedrag. Het bijbehorende [conceptdocument voor kerkonboarding](./twilio-byok-onboarding-draft) bevat voorgestelde installatierichtlijnen en voorbeelden specifiek voor kerken.
:::

## Aanbevolen aanpak

Voeg Twilio toe aan het bestaande systeem voor sms-providers van B1, met **een door de kerk beheerd Twilio-account, API-inloggegevens, een Messaging Service en een sms-geschikt telefoonnummer**. De kerk registreert haar eigen juridische entiteit en berichtencampagne, betaalt Twilio rechtstreeks, beheert de toestemming van ontvangers en beheert de goedkeuring in de Twilio Console. ChurchApps levert de integratie en de documentatie.

Begin met één berichtenprogramma, één Messaging Service en één Amerikaanse lokale 10DLC-afzender per B1-kerk. Ondersteun individuele sms'jes, groepssms'jes, workflow-sms'jes en herinneringen waarvoor opt-in is gegeven, via de bestaande B1-schermen. Een redelijk eerste programma omvat wijzigingen in diensten, herinneringen voor evenementen en vrijwilligersroosters, mits alle drie zijn beschreven in de toestemmingstekst en de goedgekeurde campagne van die kerk. Fondsenwerving of promotionele berichten vereisen een afzonderlijk beoordeelde reikwijdte en toestemming; voeg deze niet stilzwijgend toe aan dit programma.

| Verantwoordelijkheid | Kerk | B1 / ChurchApps |
|---|---|---|
| Twilio-account, facturering, eigendom van nummers | Is eigenaar en beheert deze | Richt geen platformaccount in en verkoopt geen credits door |
| Merk, campagne, registratie van nummers | Dient accurate kerkgegevens in; behandelt beoordeling en correcties | Legt de vereisten uit en leest beschikbare gereedheidsinformatie |
| Aanmeldpagina, beleid, doel van berichten | Publiceert en onderhoudt deze | Levert compatibele formulierelementen, voorbeelden en toestemmingsregistraties |
| Geschiktheid van ontvangers en afhandeling van STOP | Beoordeelt bewijs van toestemming en vraagt om wat buiten sms is ontvangen | Handhaaft toestemming, onderdrukking, rechten en ondertekende webhooks |
| Bezorging en ondersteuning | Houdt Twilio-fouten, accountstatus en inkomende antwoorden in de gaten | Toont de status van indiening en bezorging zonder goedkeuringsgaranties te suggereren |

Stel een door ChurchApps beheerd bovenliggend Twilio-account, subaccounts voor klanten, het aanschaffen van nummers, indieningen bij Trust Hub, facturering, een gespreksinbox, MMS/WhatsApp, internationaal versturen en onboarding voor gratis nummers (toll-free) uit. Toll-free is een afzonderlijk pad voor geverifieerde afzenders en geen manier om registratie te omzeilen. Deze grenzen zorgen ervoor dat de eerste release aansluit bij het bestaande model van B1 waarbij de kerk een eigen provider meebrengt.

## Bestaande basis en tekortkomingen

De volgende observaties zijn gekoppeld aan broncodesnapshots en gaan niet uit van wat er momenteel is uitgerold:

| Onderdeel | Bestaand gedrag | Gevolg |
|---|---|---|
| [Providerregister en contract](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` ondersteunt enkelvoudige en bulkverzendingen, validatie, optionele mogelijkheden voor abonnees/lijsten, en een provider-berichts-ID in de resultaten. Er is geen Twilio-adapter geregistreerd. | Voeg Twilio toe in `@churchapps/texting`; daarvoor is het niet nodig abonnees aan te maken of door de provider beheerde lijsten te gebruiken. |
| [Texting-instellingen](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church en Nalo zijn selecteerbaar; MinistryStuff is afhankelijk van een functievlag. Het bewerken en opslaan van afzenders is momenteel specifiek voor Nalo. | Voeg expliciete Twilio-velden, validatie, opslag van afzenders en hulp bij onboarding toe. Een item in de vervolgkeuzelijst is niet voldoende. |
| [Controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) en [modulegateway](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Inloggegevens worden versleuteld en gemaskeerd; handmatige en geautomatiseerde verzendingen bepalen de provider van een kerk. Groepsverzendingen ontdubbelen gedeelde telefoonnummers. | Hergebruik deze paden en behoud de autorisatie. Plaats nieuwe poorten voor toestemming en gereedheid in een gemeenschappelijk serverpad, zodat workflows ze niet kunnen omzeilen. |
| [STOP-hulpfunctie](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Verwerkt Twilio-achtige `From`/`Body`-velden; valideert een kerk-URL-token; zet `person.optedOut` en schakelt sms-herinneringen uit. Andere antwoorden worden genegeerd. | Dit is een nuttig startpunt, maar geen volledige Twilio-webhook. Voeg Twilio-handtekeningen en een afzonderlijke sms-abonnementsstatus toe. |
| [Berichtenschema](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Slaat `apiKey`, `apiSecret` en een `fromNumber` van 20 tekens op; verzendlogboeken bewaren direct succes/fout, niet provider-ID's of definitieve bezorgstatussen. | Een E.164-afzender past hier; een Messaging Service SID van 34 tekens heeft een eigen veld nodig. Voeg duurzame opslag toe voor provider-berichten en statussen. |
| [Openbare formulierpagina](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [gedeelde formulierrenderer](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) en [controller voor formulierinzendingen](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Formulieren zonder beperkingen en optionele selectievakjes bestaan. Beschrijvingen zijn platte tekst. Inzendingen bewaren antwoorden, maar het sms-pad heeft geen toestemmingsregister per campagne. | Voeg een geconfigureerd sms-toestemmingselement toe met echte beleidslinks en vastlegging van bewijs aan de serverkant. Een generiek selectievakje of groepslidmaatschap mag niet automatisch sms toestaan. |

De [gebruikersdocumentatie voor kerkinstellingen](../../b1-admin/settings/church-settings#texting) legt ook uit dat de huidige opt-outvlag wordt gedeeld met de privacy-instelling van de ledenlijst. Die koppeling is een releasekwestie: het antwoord START mag de zichtbaarheid in de ledenlijst nooit wijzigen.

## Configuratie en ontwerp van inloggegevens

Gebruik expliciete, aanvullende configuratievelden in plaats van `fromNumber` te overbelasten of gestructureerde gegevens op te slaan in een API-sleutelstring:

| Veld | Voorgesteld doel |
|---|---|
| `accountSid` | Door de kerk beheerde Twilio-account-/projectidentificatie (`AC…`) |
| `apiKey`, `apiSecret` | Speciale Twilio API Key SID (`SK…`) en geheim voor uitgaande API-toegang; versleuteld en gemaskeerd |
| `webhookAuthToken` | Account Auth Token die de Twilio SDK gebruikt om inkomende handtekeningen te valideren; afzonderlijk versleuteld/gemaskeerd |
| `messagingServiceSid` | Messaging Service van de kerk (`MG…`, 34 tekens) |
| `fromNumber` | Geselecteerd sms-geschikt nummer in E.164-formaat, geverifieerd als afzender in dat account/die service |
| Programmaconfiguratie | Stabiele programma-ID, naam, toegestane doelen, aanmeld-/beleids-URL's en versie van de openbaarmaking |

Twilio [geeft de voorkeur aan API-sleutels voor REST-authenticatie](https://www.twilio.com/docs/iam/api-keys). Gebruik de smalste getestte sleutelrechten die verzenden en de vereiste alleen-lezen-controles voor de installatie dekken. De Auth Token van het account is nog steeds nodig voor de [standaard controle van de Twilio-webhookhandtekening](https://www.twilio.com/docs/usage/security). Leg dit onderscheid uit in de interface: een API-geheim is geen webhook-Auth Token. Bewaar inloggegevens uitsluitend in de serverzijdige instellingenopslag, nooit op openbare pagina's, in formulierantwoorden, in verzoeken vanuit de browser of in supportmeldingen.

De kerk maakt deze resources aan en beheert ze in de Console. De validatieactie van B1 mag alleen de geconfigureerde service, afzenders en registratiegegevens lezen. Ze mag geen nummers kopen, campagnes aanmaken, Twilio-instellingen wijzigen of als bijeffect een testbericht versturen. Bied een afzonderlijke, expliciete testverzendactie aan die beperkt is tot een geschikte ontvanger die toestemming heeft gegeven.

Behoud gemaskeerde inloggegevens alleen wanneer dezelfde opgeslagen provider wordt bewerkt. Overschakelen naar Twilio vereist eigen inloggegevens en het wissen van verouderde providerspecifieke waarden; neem geen gemaskeerde Clearstream- of Nalo-sleutel mee naar een Twilio-configuratie.

Beperk elk laden of bijwerken tot de geauthenticeerde B1-kerk. Koppel callbacks aan een opgeslagen integratie en het verwachte Twilio-account/de verwachte service/afzender, en weiger conflicterende toewijzingen tussen kerken. Rotatie van inloggegevens en het loskoppelen van een provider moeten de gereedheid ongeldig maken en wachtende verzendingen pauzeren, zonder toestemmingsgegevens of historische bezorgingsgegevens te wissen.

## Toestemming en onderdrukking zijn vereist als releasewerk

Introduceer aan telefoonnummer gebonden abonnementsregistraties voor het Twilio-programma, plus alleen-toevoegbare gebeurtenissen voor toestemming/onderdrukking. Het voorgestelde minimum aan bewijs is: kerk-ID, programma-ID, genormaliseerd telefoonnummer, optionele geverifieerde koppeling aan een persoon, bevestigende handeling, bron-formulier-/inzendings-ID of een beoordeeld extern bewijs, servertijdstip, tekst/versie van de openbaarmaking, bron-URL, beleids-URL's en gebeurtenissen voor intrekking/herstart. Beperk de toegang en bewaartermijn volgens het bestaande gegevensbeveiligingsbeleid van de kerk.

Gebruik statussen zoals `unknown`, `pending`, `active` en `suppressed`. Bestaande mobiele nummers, geïmporteerde contacten, aanwezigheid, donaties, groepslidmaatschap, `person.optedOut = false` en `allowSms` zijn geen bevestigende toestemming voor het programma. Het importeren van gedocumenteerde toestemming moet een geautoriseerde, gecontroleerde handeling zijn met een vastgelegde bron; een migratie mag niet iedereen inschrijven.

Gebruik voor de eerste webstroom de standaard openbare formuliermodus van B1. Voeg een expliciet geconfigureerde sms-toestemmingsvraag toe die standaard niet is aangevinkt, optioneel is, klikbare beleidslinks toont en aan één programma en één mobiel veld is gekoppeld. Valideer die koppeling aan de serverzijde en leg de getoonde openbaarmaking vast wanneer een bevestigend antwoord wordt opgeslagen. Leid toestemming nooit af uit willekeurige vraagteksten, conversatie-AI of workflowlidmaatschap. Schakel een conversationeel equivalent pas in nadat de expliciete bevestigende interactie en het vastleggen van bewijs zijn getest.

Een niet-aangevinkte inzending maakt geen abonnement aan en mag geen bestaande toestemming van iemand anders intrekken. Koppel toestemming aan het ingediende telefoonnummer; medewerkers kunnen dubbelzinnige koppelingen aan personen oplossen zonder gezinsrecords samen te voegen. Een gewijzigd mobiel nummer heeft eigen toestemming nodig. Pas bij anonieme formulieren misbruikbeperkingen toe, en maak eventuele verificatie van nummereigenaarschap of een dubbele bevestigingsstap expliciet; een aangevinkt vakje bewijst alleen niet wie de eigenaar van een telefoon is. Als bevestiging wordt gebruikt, blijft het abonnement in behandeling totdat die is voltooid, en beschrijf die exacte stroom in de registratiemateriaal.

Voor Twilio scheidt u sms-onderdrukking van de zichtbaarheid in de ledenlijst. Zet eventuele oude opt-out conservatief om naar een onderdrukkingsregistratie; laat andere oude ontvangers `unknown`. Een expliciete, gedocumenteerde nieuwe inschrijving kan sms-toestemming vastleggen terwijl de privacy-instelling voor de ledenlijst ongewijzigd blijft. Behoud het gedrag van andere providers totdat hun migraties afzonderlijk zijn beoordeeld.

Bij elke daadwerkelijke verzending moet de kerkintegratie ingeschakeld/gereed zijn, moet er actuele programmatoestemming zijn voor het exacte telefoonnummer, mag er geen onderdrukking op telefoonniveau zijn, en moet het bestaande recht van de aanroeper gelden. Herinneringen respecteren bovendien `allowSms`, categorievoorkeuren en stille uren. Controleer opnieuw na het in de wachtrij plaatsen, vul samenvoegvelden in, normaliseer en valideer nummers, en ontdubbel op telefoonnummer. STOP onderdrukt alle verzendingen voor de service/het programma, inclusief handmatige verzendingen en workflows; het moet ook elke persoon dekken die dat telefoonnummer deelt.

Toon de identiteit van de kerk en de STOP-instructie consistent in het gemeenschappelijke Twilio-verzendpad, en toon een voorbeeld van de definitieve sms en het aantal segmenten. Het uitvullen van samenvoegvelden en de lengtebehandeling moeten deze elementen behouden; kap de opt-outinstructie niet stilzwijgend af. Houd voorbeelden en de daadwerkelijke herinnerings- en workflowsjablonen op elkaar afgestemd.

## Twilio-verzendingen, antwoorden en bezorgstatus

Implementeer `TwilioProvider.sendMessage` via de Messages API met de geselecteerde Messaging Service en afzender. Retourneer een provider-berichten-SID en een geaccepteerd/ingediend resultaat; HTTP-acceptatie is niet hetzelfde als bezorging op het toestel. Een groepsverzending gebruikt resultaten per ontvanger in invoervolgorde.

Begrens de gelijktijdigheid van uitgaande verzendingen voor **zowel** `sendBulk` als afzonderlijke verzendingen: de huidige tak voor samenvoegvelden verspreidt `sendMessage`-aanroepen. Bewaar verzendintenties en claimbaar werk voor groepen die niet binnen een verzoekbudget passen; hergebruik het bestaande implementatiemodel in plaats van kerken te laten nog een service te draaien. Probeer opnieuw bij bekende tijdelijke fouten of limieten, met backoff. Behandel dubbelzinnige time-outs als onbekende resultaten die moeten worden afgestemd, niet als een opdracht om blindelings opnieuw te verzenden, wat dubbele sms'jes en kosten zou riskeren.

Configureer kerkspecifieke URL's voor inkomende berichten en statuscallbacks. Valideer `X-Twilio-Signature` met de SDK, de exacte geconfigureerde externe URL, de oorspronkelijke formulierparameters en de bijbehorende Auth Token van het account. Een geheime URL alleen is onvoldoende. Koppel callbacks aan opgeslagen kerk-, account- en berichtrecords, verwerk duplicaten en callbacks die arriveren voordat het verzendresultaat is vastgelegd, en voorkom dat oudere gebeurtenissen een eindstatus overschrijven. Retourneer lege TwiML voor een bevestiging van een inkomend bericht en een passend succesantwoord voor statusgebeurtenissen. [Twilio-beveiliging](https://www.twilio.com/docs/usage/security), [statuscallbacks](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Adviseer Messaging Service **Advanced Opt-Out**. Twilio beheert de bevestigingen voor STOP/START/HELP; B1 verwerkt geauthenticeerde `OptOutType`-gebeurtenissen zonder dubbele bevestigingen te versturen. STOP legt onderdrukking onmiddellijk vast. START herstelt alleen een bekend abonnement op hetzelfde vermelde programma, met een nieuwe herstartgebeurtenis; het mag geen nieuw telefoonnummer voor niet-gerelateerde berichten inschrijven en geen herinneringsvoorkeuren inschakelen. HELP schrijft niemand in. Andere inkomende antwoorden blijven buiten het bereik van de B1-inbox; kerken hebben een gedocumenteerde manier nodig om die in Twilio te volgen. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Sla het Twilio-berichten-SID, de koppeling aan account/service, het tijdstip van indiening, de definitieve status/foutcode en het tijdstip van de callback op naast het verzendlogboek. Toon nauwkeurig: in wachtrij/geaccepteerd, bezorgd, mislukt, niet bezorgd of onbekend. Behoud het bestaande antwoordcontract voor andere providers en bepaal of geaggregeerde succestellingen indiening of bezorging weergeven.

## Gereedheid van de installatie en validatie van goedkeuring

Toon afzonderlijke controlepunten voor inloggegevens, eigenaarschap van service/afzender, campagneverificatie, registratie van nummers, webhookcontroles en een geslaagde smoke test met bezorging. Toon nooit één groene badge “goedgekeurd” alleen omdat de inloggegevens werken.

Voor Amerikaanse lokale nummers leest u de [Usa2p-campagnebron](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) van de service en vereist u dat de relevante campagne `VERIFIED` is. Verifieer afzonderlijk dat het geselecteerde telefoonnummer aan die service is gekoppeld en de registratie van het nummer heeft voltooid: een goedgekeurde campagne kan nog een nummer hebben dat in behandeling is. Waar een ondersteunde lees-API een vereist signaal niet blootlegt, toon **handmatige verificatie in de Console vereist** en leg de gedateerde bevestiging van de kerkbeheerder vast als zodanig; label dit niet als API-geverifieerd. Automatische gebeurtenissen voor nummerregistratie kunnen later worden toegevoegd. [Fouten bij nummerregistratie](https://www.twilio.com/docs/api/errors/30035), [A2P-registratiegebeurtenissen](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Vereis actuele controles voordat verzendingen worden ingeschakeld; registreer wanneer en hoe de gereedheid is gecontroleerd, laat verouderde controles verlopen, en pauzeer bij ingetrokken inloggegevens, gewijzigde afzenders, registratiefouten of aanhoudende accountfouten. Een geslaagde smoke test bevestigt alleen het geteste pad, niet een universele goedkeuring door dragers of toestemming van de ontvanger. Het bijbehorende conceptdocument beschrijft de controles van de kerk vóór indiening, vóór de lancering en tijdens de doorlopende operatie.

## Repository- en releaseplan

De [bijdragegids van de organisatie](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) verwijst functieverzoeken voor B1 naar ChurchAppsSupport en implementatie-PR's naar de eigenaarsrepositories. Gebruik één centraal functieverzoek en koppel gerichte implementatie-PR's daaraan:

1. **ChurchAppsSupport:** beoordeel dit ontwerp en het bijbehorende conceptdocument voordat Twilio als beschikbare gebruikersfunctie wordt gepresenteerd.
2. **Packages:** voeg de Twilio-adapter, expliciete gedeelde configuratie/interfaces en weergave van het sms-toestemmingsformulier toe waar die door B1Admin/B1App wordt gedeeld. Voeg changesets toe en publiceer via de bestaande releaseworkflow voordat consumenten worden bijgewerkt.
3. **Api:** voeg additieve migraties toe voor integratiemetadata, toestemming/onderdrukking en bezorgstatussen; implementeer validatie van configuratie, gedeelde verzendpoorten, vastlegging van formulierbewijs, webhookverwerking en opslag van verzendingen.
4. **B1Admin:** voeg de Twilio-configuratie- en gereedheidsinterface toe, beheer van programma's/toestemming, providerbewust opslaan van afzenders en nauwkeurige bezorgrapportage. Bied geen overschrijving van sms-toestemming via gewone bewerkingen van personen.
5. **B1App:** verifieer de openbare formulier- en paginaervaring en de beleidslinks ten opzichte van de gedeelde elementen, inclusief anonieme bezoekers en mobiele bezoekers. Er is geen apart Twilio-browserclient nodig.
6. **ChurchAppsSupport:** maak na de release van het conceptdocument ondersteunde instellings- en hulppagina's, voeg echte schermafbeeldingen toe, koppel dit vanuit de Texting-instellingen en regel vertalingen.

Implementeer schema's en gedeelde pakketten voordat consumenten worden uitgerold. Houd Twilio achter een functievlag voor een kleine pilot waarin kerken zich vrijwillig aanmelden; bestaande providers moeten blijven werken. Terugdraaien schakelt Twilio-verzending uit en annuleert niet-ingediende taken, terwijl opt-outs en bewijs behouden blijven; het mag ontvangers niet automatisch naar een andere provider of afzender overzetten.

## Inschatting van de inspanning

Planningsraming voor een bijdrager die bekend is met het ecosysteem; er zijn in deze beoordeling geen productie-inloggegevens of live sms'jes gebruikt:

| Werk | Ontwikkeldagen |
|---|---|
| Adapter, uitbreidingen van configuratie/schema, instellingeninterface | 2–3 |
| Telefoon-/programmatoestemming, afzonderlijke onderdrukking, gedeelde verzendpoorten, integratie van openbaar formulier | 3–5 |
| Ondertekende callbacks, opslag van bezorging, begrensde en duurzame verzending | 2–3 |
| Gereedheidsinterface, kerkgids, integratie- en regressietests, pilotcorrecties | 3–4 |
| **Aanbevolen reikwijdte voor de lancering** | **10–15 totaal** |

Een eenvoudig proof of concept voor de adapter en instellingen kost ongeveer 1–2 dagen. Een schatting alleen voor de afzender sluit het toestemmings- en onboardingwerk uit dat deze aanbeveling noodzakelijk maakt. De tijd voor externe beoordeling door Twilio en dragers is afzonderlijk en variabel; het project mag geen goedkeuringsdatum of goedkeuringsuitkomst beloven.

## Acceptatiecriteria

- [ ] De kerk is eigenaar van en betaalt voor het account, de service, de geregistreerde afzender en de campagne; er is geen door ChurchApps beheerd Twilio-account vereist.
- [ ] Inloggegevens zijn versleuteld/gemaskeerd, beperkt tot de tenant, roteerbaar en afwezig in logs/openbare inhoud; validatie is alleen-lezen.
- [ ] Optionele, niet-aangevinkte toestemming toont echte beleidslinks en slaat bewijs aan de serverzijde op voor programma/telefoon/openbaarmaking; weigeren laat de primaire formulieractie nog steeds toe.
- [ ] Alle handmatige, groeps-, samenvoegveld-, workflow- en herinneringspaden passen dezelfde Twilio-geschiktheidspoort toe. Onbekende, niet-toegestane, gewijzigde-telefoon- of onderdrukte ontvangers worden overgeslagen met een bruikbare reden; weergave behoudt de identiteit van de kerk en STOP-instructies na uitvulling en lengtebehandeling.
- [ ] Verouderde privacy-instelling voor de ledenlijst schrijft geen ontvangers in; STOP/START wijzigt nooit de zichtbaarheid in de ledenlijst of niet-gerelateerde voorkeuren. Gevallen met gedeelde telefoonnummers en tussen kerken worden getest.
- [ ] Ondertekende STOP/START/HELP, ongeldige handtekeningen, verkeerde accounts/services, dubbele gebeurtenissen, herhaalde formulierinzendingen en vervalste toestemmingskoppelingen zijn gedekt.
- [ ] Groottes van groepen/time-outs, limieten, gedeeltelijke fouten, dubbelzinnige resultaten, racecondities bij callbacks en gebeurtenissen die buiten volgorde binnenkomen, worden getest zonder dubbele verzendingen.
- [ ] Campagnegoedkeuring en voltooide registratie van het nummer zijn afzonderlijk van de validatie van inloggegevens. Handmatig bewijs is duidelijk gelabeld; verouderde of ingetrokken gereedheid blokkeert verzendingen.
- [ ] Een pilotkerk controleert haar aanmeldpagina, de paden voor geweigerde en geaccepteerde formulieren, de exacte beleids-URL's en een toestemmende testontvanger, van inzending tot bezorging, STOP-onderdrukking en toegestane herinschrijving.
- [ ] Bestaande instellingen en verzendgedrag voor Clearstream, Text In Church en Nalo slagen voor regressiecontroles; hulpteksten maken onderscheid tussen voorstellen en uitgebrachte functies.

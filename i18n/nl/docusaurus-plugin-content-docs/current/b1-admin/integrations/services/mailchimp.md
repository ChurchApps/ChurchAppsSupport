---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Houd een Mailchimp-doelgroep automatisch synchroon met B1: personen komen erin met hun naam, e-mailadres en telefoonnummer; lidmaatschap van een groep of lijst wordt een Mailchimp-tag; verwijderde personen worden gearchiveerd. De synchronisatie is ingebouwd in B1 — geen dienst van derden, geen kosten per taak, en wijzigingen worden bijna in realtime verwerkt in plaats van op een nachtelijk schema.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een [Mailchimp](https://mailchimp.com)-account met de doelgroep die B1 moet beheren
- Een Mailchimp-**API-sleutel** (Mailchimp: profielpictogram → **Account & facturering → Extra's → API-sleutels**)
- Je **Doelgroep-ID** (Mailchimp: **Doelgroep → Instellingen → Naam van doelgroep en standaardinstellingen**)
- Een B1Admin-gebruiker met het recht **Instellingen bewerken**

</div>

## Wat wordt gesynchroniseerd

| Wijziging in B1 | Effect in Mailchimp |
|---|---|
| Persoon toegevoegd of bijgewerkt | Abonnee toegevoegd/bijgewerkt (voornaam, achternaam, telefoonnummer; nieuwe abonnees komen binnen als `subscribed`) |
| Persoon verwijderd (of AVG-gewist) | Abonnee gearchiveerd |
| Persoon wordt lid van een groep | Tag met de naam van de groep toegevoegd |
| Persoon verlaat een groep | Die tag verwijderd |
| Persoon komt in een opgeslagen lijst | Tag met de naam van de lijst toegevoegd |
| Persoon verlaat een opgeslagen lijst | Die tag verwijderd |

**Opgeslagen lijsten zijn meestal de betere tagbron.** Een [opgeslagen lijst](/docs/b1-admin/people/lists) in B1 is een doelgroep op basis van regels die zichzelf opnieuw evalueert — "iedereen op de campus Noord", "leden die zich hebben aangemeld voor pastorale e-mails". Laat je Mailchimp-segmenten naar lijsttags verwijzen, dan houdt de synchronisatie ze bij. Gebruik groepstags voor mailings naar ministerieteams.

De synchronisatie is **eenrichtingsverkeer** (B1 → Mailchimp) en raakt alleen de standaardvelden van Mailchimp aan. Ze kan dus niet conflicteren met samenvoegvelden of segmenten die je binnen Mailchimp beheert.

## Instellen

1. Ga in B1Admin naar **Instellingen → Ontwikkelaar → Webhooks → Nieuwe webhook**.
2. Stel **Connectortype** in op **Mailchimp**.
3. Plak je **Mailchimp-API-sleutel** en **Doelgroep-ID**. De sleutel wordt versleuteld opgeslagen en nooit opnieuw getoond.
4. De relevante gebeurtenissen zijn al geselecteerd. Vink uit wat je niet wilt (laat bijvoorbeeld de persoonsgebeurtenissen aan, maar sla groepstags over).
5. Sla op. B1 controleert de sleutel en doelgroep bij Mailchimp voordat het opslaat — een typfout mislukt meteen, met een reden.

Gebruik op elk moment **Test verzenden** om de verbinding opnieuw te controleren. Elke synchronisatiepoging wordt vastgelegd in de leveringsgeschiedenis van de webhook, met het daadwerkelijke antwoord van Mailchimp. Mislukte leveringen worden automatisch opnieuw geprobeerd, met oplopende wachttijden, gedurende ongeveer vijf dagen.

## Eerste import

De connector synchroniseert *wijzigingen* vanaf het moment dat hij aanstaat. Hij vult je bestaande adreslijst niet achteraf aan. Voor de dag van de installatie:

1. Ga in B1Admin naar **Personen**, zoek de personen die je wilt hebben (of voer een opgeslagen lijst uit), en klik op **Exporteren** om een CSV-bestand te downloaden.
2. Gebruik in Mailchimp **Doelgroep → Contacten importeren** om het CSV-bestand te laden, en pas eventuele tags toe tijdens de import.

Door de eerste lading via de importeur van Mailchimp te doen, houd je controle over de toestemming. Importeer alleen personen die daadwerkelijk hebben ingestemd met het ontvangen van je e-mails. Een hele adreslijst als abonnees in bulk importeren kan in strijd zijn met de voorwaarden van Mailchimp en met anti-spamwetgeving (CAN-SPAM/AVG).

## Beperkingen en opmerkingen

- **Eenrichtingssynchronisatie.** Afmeldingen, bounces en wijzigingen die in Mailchimp worden gedaan, stromen niet terug naar B1. Iemand die zich in Mailchimp afmeldt, kan nog steeds e-mail ontvangen die rechtstreeks vanuit B1 wordt verzonden. Behandel Mailchimp als bron van waarheid voor toestemming voor massamail.
- **Personen zonder e-mailadres worden overgeslagen** (dat wordt vermeld in de leveringsgeschiedenis), omdat Mailchimp-abonnees op e-mailadres worden geïdentificeerd.
- **Een wijziging van e-mailadres maakt een nieuwe abonnee aan.** Mailchimp herkent personen aan hun e-mailadres. Als je het e-mailadres van iemand in B1 wijzigt, wordt die toegevoegd onder het nieuwe adres. De oude abonnee blijft bestaan totdat je die in Mailchimp archiveert.
- **Alleen standaardvelden worden gesynchroniseerd**: voornaam, achternaam en telefoonnummer. Lidmaatschapsstatus, campus en aangepaste B1-velden worden in deze versie niet gekoppeld aan samenvoegvelden van Mailchimp. Gebruik lijsttags om te segmenteren.
- **Tagnamen zijn de namen van de groep of lijst.** Als je een groep of lijst hernoemt, wordt er vanaf dan getagd onder de nieuwe naam. De oude tag blijft bij bestaande abonnees staan totdat je die in Mailchimp verwijdert.
- **De contactlimieten van Mailchimp gelden nog steeds.** Een synchronisatie die een gratis doelgroep boven de limiet brengt, logt fouten als `Member limit reached` in de leveringsgeschiedenis.

## Andere recepten (Zapier / Make)

Alles wat verder gaat dan synchronisatie van doelgroepen, is nog steeds mogelijk via [Zapier](../zapier) of [Make](../make). Dat geldt bijvoorbeeld voor het taggen van givers bij `donation.created`, een omgekeerde richting van Mailchimp naar B1, of synchronisatie met een ander e-mailplatform (Constant Contact, Brevo, enz.). Deze diensten reageren op dezelfde webhook-gebeurtenissen:

- **Givers taggen:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Tweerichtingsverkeer:** Mailchimp *New Subscriber* → B1 *Create Person*

Als je persoons- en groepssynchronisatie eerder via Zapier hebt ingesteld, zet die Zaps dan uit nadat je de native connector hebt ingeschakeld. Beide tegelijk laten draaien verwerkt elke gebeurtenis dubbel en verbruikt Zapier-taken voor niets.

## Probleemoplossing

- **Opslaan mislukt met "Mailchimp rejected the API key"**: de sleutel is ingetrokken of verkeerd getypt. Sleutels eindigen op een datacentersuffix zoals `-us21`.
- **Opslaan mislukt met "audience not found"**: het Doelgroep-ID bestaat niet onder dat account. Kopieer het uit **Doelgroep → Instellingen → Naam van doelgroep en standaardinstellingen** (het is niet de naam van de doelgroep).
- **Een persoon is nooit in Mailchimp verschenen**: controleer de leveringsgeschiedenis van de webhook. "Skipped: person has no email address" betekent precies dat. Een `4xx`-fout van Mailchimp toont de reden in het antwoord.
- **Leveringen zijn helemaal gestopt**: na herhaaldelijke mislukte leveringen wordt de webhook automatisch uitgeschakeld. Los de oorzaak op (meestal een ingetrokken sleutel), schakel de webhook weer in en gebruik **Test verzenden** om te bevestigen.

## Zie ook

- [Webhooks (ontwikkelaarsreferentie)](/docs/developer/api/webhooks): de engine eronder, de gebeurtenissencatalogus en de semantiek van levering en herhaling
- [Opgeslagen lijsten](/docs/b1-admin/people/lists): doelgroepen op basis van regels die natuurlijk aansluiten op Mailchimp-tags
- [Zapier (overzicht)](../zapier): voor recepten die verder gaan dan synchronisatie van doelgroepen

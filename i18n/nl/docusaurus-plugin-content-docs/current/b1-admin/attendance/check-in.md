---
title: "Zelfstandig inchecken instellen met B1 Checkin en B1 Admin"
sidebar_label: "Inchecken"
description: "Stel zelfstandig inchecken voor diensten in met de B1 Checkin-app in B1 Admin, inclusief apparaten, kioskaccounts, planningen, huisstijl en aanmelding van gasten via QR-code."
---

# Inchecken

<div class="article-intro">

B1 Admin ondersteunt zelfstandig inchecken bij diensten via de bijbehorende app **B1 Checkin**. Leden kunnen zichzelf en hun gezin bij aankomst inchecken op kiosken of speciale apparaten, waardoor het proces snel verloopt en de werkdruk voor uw vrijwilligers afneemt. Elke incheck wordt automatisch als aanwezigheid geregistreerd.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Uw campussen, dienstijden en groepen moeten zijn ingesteld in [Aanwezigheidsinstellingen](setup.md).
- U hebt [personen in uw database](../people/adding-people.md) nodig met [huishoudens](../people/adding-people.md#managing-households) ingesteld, zodat gezinnen samen kunnen inchecken.
- U hebt een tablet nodig en eventueel een Brother-labelprinter (zie [hardwareaanbevelingen](#recommended-hardware) hieronder).

</div>

## Hoe het werkt

De B1 Checkin-app is gekoppeld aan uw aanwezigheidsinstellingen in B1 Admin. Wanneer een lid incheckt, wordt de aanwezigheid automatisch geregistreerd bij de juiste campus, dienstijd en groep. U hoeft de aanwezigheid niet handmatig in te voeren voor iedereen die het incheck-systeem gebruikt.

## Inchecken instellen

1. **Configureer eerst uw aanwezigheidsstructuur.** Ga in B1 Admin naar **Personen > Aanwezigheid** en klik op **Instellen** om te controleren of uw campussen, dienstijden en groepen zijn ingesteld. De incheck-app is afhankelijk van deze configuratie. Desgewenst kunt u elke dienstijd een [incheckplanning](setup.md#setting-a-check-in-schedule) geven, zodat het inchecken elke week automatisch opent en sluit. Planningen gebruiken de tijdzone van de campus van de dienst, of de tijdzone van uw kerk als de campus er geen heeft ingesteld. De kiosk toont dienstijden waarvan het venster gesloten is als **Gesloten** en laat gezinnen weten wanneer het inchecken opent. Zie [Aanwezigheidsinstellingen](setup.md) voor meer details.
2. **Installeer de B1 Checkin-app** op de apparaten die u wilt gebruiken. De app is beschikbaar op de volgende platforms:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android-/Samsung-tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Meld u aan bij de B1 Checkin-app** met een account dat het aanwezigheidsrecht **Checkin** (of **Aanwezigheid bewerken**) heeft. Zie [Kioskaccounts voor inchecken](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Selecteer de campus en dienstijd** voor de huidige bijeenkomst.
5. Leden kunnen nu op het apparaat hun naam zoeken en inchecken.

:::tip
Plaats incheckapparaten op zichtbare, goed bereikbare plekken, zoals bij de ingang van de hal of de welkomstbalie. Een korte aankondiging tijdens de diensten helpt leden te weten dat deze optie beschikbaar is.
:::

:::tip
Als uw kerk meerdere campussen heeft, moet u de instelling voor elke campus herhalen in [Aanwezigheidsinstellingen](setup.md). Elk incheckapparaat kan voor een andere campus worden ingesteld.
:::

## Aanbevolen hardware

**Tablets** — elk van deze werkt goed met de app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Groot scherm:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printers** — inchecken werkt met Brother-labelprinters voor het afdrukken van naamkaartjes:

- **Best:** Brother QL-1110NWB (ondersteunt meerdere tablets via Bluetooth en WiFi)
- **Goed:** Brother QL-810W (ondersteunt meerdere tablets via WiFi)
- **Budget:** Brother QL-1100 (alleen WiFi)

**Labels:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Alleen Brother-labelprinters zijn compatibel met de B1 Checkin-app. Printers van andere merken werken niet voor het afdrukken van naamkaartjes.
:::

:::info
Volg de installatie-instructies van uw printer om deze met hetzelfde WiFi-netwerk als uw tablet te verbinden. U vindt Brother-printerdrivers en installatiehandleidingen op de [Brother-supportsite](https://support.brother.com).
:::

## Het uiterlijk van de kiosk aanpassen

U kunt het uiterlijk van de B1 Checkin-app aanpassen aan de huisstijl van uw kerk. Ga in B1 Admin naar **Mobiel > B1 CheckIn** en gebruik de kaart **Kioskthema** om het volgende in te stellen:

### Kleuren

Pas acht kleurinstellingen aan om ze bij de huisstijl van uw kerk te laten passen:

- **Primair** en **Primair contrast** -- De hoofdmerkkleur en de tekstkleur daarvan.
- **Secundair** en **Secundair contrast** -- De accentkleur en de tekstkleur daarvan.
- **Achtergrond koptekst** en **Achtergrond subkoptekst** -- Kleuren voor de koptekstgebieden van de kiosk.
- **Achtergrond knop** en **Tekst knop** -- Kleuren voor interactieve knoppen.

### Achtergrondafbeelding

Upload optioneel een achtergrondafbeelding voor de welkoms- en zoekschermen van de kiosk. Het aanbevolen formaat is 1920x1080 pixels.

### Wachtscherm / screensaver

Configureer een screensaver die na een periode van inactiviteit wordt geactiveerd:

1. Zet het wachtscherm **aan** of **uit**.
2. Stel de **time-out** in: het aantal seconden inactiviteit voordat de screensaver start (minimaal 10 seconden).
3. Voeg een of meer **dia's** toe -- elke dia heeft een afbeelding en een weergaveduur (minimaal 3 seconden).

:::tip
Gebruik het wachtscherm om aankondigingen, komende evenementen of welkomstboodschappen te tonen wanneer de kiosk niet actief wordt gebruikt.
:::

## Gastregistratie via QR-code

De incheckkiosk kan een QR-code tonen die bezoekers scannen om zichzelf en hun gezin op hun eigen telefoon te registreren. Dit versnelt het inchecken voor gasten die voor het eerst komen.

Wanneer een gast de QR-code scant, wordt die doorgestuurd naar een [gastregistratiepagina](../../b1-church/checkin/guest-registration.md) waar de namen van het gezin en andere gegevens die u wilt vragen, worden ingevuld. Een vrijwilliger kan de gast vervolgens op de kiosk opzoeken en inchecken.

### QR-gastregistratie inschakelen

Om de QR-code weer te geven:

1. Open in B1 Admin het [Jump-menu](../introduction.md#getting-around-with-the-jump-menu) (de zoekbalk linksboven) en klap **Mobiel** uit.
2. Klik op **B1 CheckIn**.
3. Zet **QR-gastregistratie** aan en klik op **Opslaan**.

:::note
Deze instelling staat onder **Mobiel > B1 CheckIn** (dezelfde pagina als de kaart **Kioskthema**), niet onder Aanwezigheid. De actie **Kiosk** op de aanwezigheidspagina bevat een link naar deze pagina.
:::

Zodra de schakelaar aan staat, verschijnen de overige opties hieronder op dezelfde kaart **QR-gastregistratie**. Klik op **Opslaan** op de kaart nadat u een van deze opties hebt gewijzigd.

### Aanmeldvelden kiezen

De checklist **Aanmeldvelden** bepaalt wat het registratieformulier vraagt. **Voornaam** en **Achternaam** staan altijd op het formulier en zijn voor elk gezinslid verplicht. Zet bij elk ander veld **Opnemen** aan om het aan het formulier toe te voegen, en zet daarna **Verplicht** aan als gasten het moeten invullen. **Verplicht** kan alleen worden ingeschakeld voor een opgenomen veld, en als u **Opnemen** uitzet, wordt het veld ook gewist.

| Veld | Gevraagd voor | Standaard opgenomen |
|-------|-----------|---------------------|
| **Titel** | Elk gezinslid, als keuzelijst vóór de naam (Dhr., Mevr., Mej., Dr., Prof., Ds., Pastor) | Nee |
| **E-mail** | Alleen de hoofdcontactpersoon | Ja (optioneel) |
| **Telefoon** | Elk gezinslid. Wanneer verplicht, hoeft alleen de hoofdcontactpersoon dit in te vullen. | Ja (optioneel) |
| **Rol in het huishouden** | Elk gezinslid na de hoofdcontactpersoon -- Partner, Kind of Overig. De hoofdcontactpersoon is het hoofd van een nieuw huishouden. Wie geen rol heeft, wordt opgeslagen als Overig. | Ja (optioneel) |
| **Woonadres** | Eenmaal voor het gezin -- straat, adresregel 2, plaats, regio en postcode. Wanneer verplicht, moet alles behalve adresregel 2 zijn ingevuld. Het adres wordt bij elk gezinslid opgeslagen. | Nee |
| **Geboortedatum** | Elk gezinslid | Nee |
| **Geslacht** | Elk gezinslid | Nee |
| **Burgerlijke staat** | Alleen de hoofdcontactpersoon | Nee |
| **Klas** | Elk gezinslid (PreK tot en met 12, of Afgestudeerd) | Nee |
| **Opmerkingen** | Eenmaal, in een vak onder de gezinsleden (maximaal 1.000 tekens) | Nee |

Velden die u uitschakelt, worden nooit opgeslagen, ook niet als iemand ze op een andere manier naar de aanmelding stuurt. Opmerkingen worden opgeslagen als notitie in het profiel van de hoofdcontactpersoon (geplaatst als "Gastaanmelding"), zodat u ze kunt lezen in de sectie **Notities** van dat profiel.

### Gasten aan een groep toevoegen

Gebruik **Nieuwe gasten toevoegen aan groep** om iedereen die zich aanmeldt automatisch in een van uw groepen te plaatsen -- bijvoorbeeld een groep "Nieuwkomers" of een groep voor het evenement van dit weekend. Kies **Geen** (de standaard) om dit over te slaan. Gasten zien de groep nooit en kunnen die ook niet kiezen; die wordt alleen hier ingesteld. Wijzig deze vóór elk evenement, zodat u de gasten van dat evenement samen kunt opvolgen.

### Aanwezigheid registreren

Wanneer een groep is geselecteerd, verschijnt de schakelaar **Aanwezigheid ook registreren**. Zet deze aan om gasten direct bij aanmelding als aanwezig te markeren, zodat u ze niet apart hoeft in te checken.

Aanwezigheid wordt alleen geregistreerd wanneer de aanmelding plaatsvindt tijdens een van de **geplande** dienstijden van de geselecteerde groep:

- De groep moet aan een of meer dienstijden zijn gekoppeld, en die dienstijden moeten een [incheckplanning](setup.md#setting-a-check-in-schedule) hebben (een **Dag** en een **Starttijd**).
- "Tijdens" betekent binnen het incheckvenster van die dienstijd: vanaf de minuten van **Check-in openen** vóór de start tot de minuten van **Check-in sluiten** na het einde (of na de start, als er geen eindtijd is ingesteld; zonder eindtijd en zonder sluitminuten tot het einde van die dag), in dezelfde tijdzone als de incheckplanning gebruikt.
- Elk gezinslid wordt op vandaag als aanwezig in de groep gemarkeerd voor elk van de dienstijden die op dat moment open is.
- Aanmeldingen op een ander moment, of voor een groep waarvan de dienstijden geen planning hebben, worden aan de groep toegevoegd maar niet als aanwezig geteld.

### Koptekstfoto

Klik onder **Koptekstfoto** op **Foto wijzigen** om een afbeelding te kiezen of te uploaden (bijgesneden naar 16:9) die bovenaan de registratiepagina wordt getoond in plaats van het standaardpictogram. Klik op **Verwijderen** om terug te gaan naar het pictogram.

### De registratielink delen

Zodra QR-gastregistratie is ingeschakeld, verschijnt onderaan de kaart een sectie **Registratie-QR-code delen**. Zo kunt u gasten ook buiten de kiosk-QR-code naar het registratieformulier leiden:

- **Link kopiëren** — kopieert de registratie-URL, zodat u die op uw kerkwebsite, in e-mails of waar dan ook online kunt plakken.
- **PNG downloaden** — downloadt de QR-code als afbeelding die u op flyers, in weekbladen of op bewegwijzering kunt afdrukken.

:::tip
Voeg de registratielink toe aan de pagina "Plan uw bezoek" of "Ik ben nieuw" van uw kerkwebsite, zodat gasten zich kunnen registreren voordat ze zelfs maar aankomen.
:::

### Wat er gebeurt nadat een gast zich heeft aangemeld

B1 zoekt eerst naar personen die al in **Personen** staan. Een gezinslid wordt gekoppeld aan een bestaande persoon wanneer precies één persoon dezelfde voornaam en hetzelfde e-mailadres of telefoonnummer heeft. Een kind dat zonder e-mail of telefoon is ingevoerd, wordt gekoppeld op voornaam binnen het huishouden dat al is gekoppeld. Gekoppelde personen worden ongewijzigd hergebruikt -- de aanmelding wijzigt nooit hun gegevens of lidmaatschapsstatus -- en iedereen die nieuw is, wordt aan het gekoppelde huishouden toegevoegd.

Wanneer niemand overeenkomt, maakt de aanmelding een nieuw huishouden aan, genoemd naar de achternaam van de hoofdcontactpersoon, met een persoonsrecord voor elk gezinslid. Iedereen die nieuw is, wordt aan **Personen** toegevoegd met het lidmaatschapsstatus **Bezoeker**, met de hoofdcontactpersoon als hoofd van het huishouden.

Gekoppelde en nieuwe personen worden allemaal aan de door u gekozen groep toegevoegd (als ze er nog niet in zitten) en krijgen hun aanwezigheid geregistreerd wanneer dat is ingeschakeld. Opmerkingen worden opgeslagen als notitie bij de hoofdcontactpersoon.

Om automatisch op te volgen, voegt u een [workflowtrigger](../serving/workflows.md#triggers) toe, zoals **Persoon · Aangemaakt** met de voorwaarde *Lidmaatschapsstatus is Bezoeker*, of **Groep · Lid toegevoegd** voor de groep die u hierboven hebt gekozen.

## Wat er wordt geregistreerd

Elke incheck maakt een aanwezigheidsrecord aan in B1 Admin. U kunt deze records bekijken op de pagina [Aanwezigheid](tracking-attendance.md) en in de [sessies van elke groep](../groups/group-members.md), net als handmatig ingevoerde aanwezigheid. Er is geen verschil in de manier waarop de gegevens worden getoond; beide methoden voeden dezelfde rapporten.

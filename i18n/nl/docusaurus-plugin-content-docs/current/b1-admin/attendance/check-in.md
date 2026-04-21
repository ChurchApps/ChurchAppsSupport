---
title: "Inchecking"
---

# Inchecking

<div class="article-intro">

B1 Admin ondersteunt zelfwerkende inchecking op services via de bijgeluide app **B1 Inchecking**. Leden kunnen zichzelf en hun gezinnen inchecken op kiosken of speciale apparaten wanneer zij aankomen, waardoor het proces snel wordt en de werkbelasting op uw vrijwilligers wordt verminderd. Elke inchecking wordt automatisch als aanwezigheid geregistreerd.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Uw campussen, servicetijden en groepen moeten in [Aanwezigheid instellen](setup.md) zijn geconfigureerd.
- U hebt [personen in uw database nodig](../people/adding-people.md) met [huishoudens](../people/adding-people.md#managing-households) ingesteld, zodat gezinnen samen kunnen inchecken.
- U hebt een tablet nodig en optioneel een Brother-etiketprinter (zie [hardwareaanbevelingen](#recommended-hardware) hieronder).

</div>

## Hoe het werkt

De B1 Inchecking-app maakt verbinding met uw B1 Admin aanwezigheidsinstelling. Wanneer een lid incheckt, wordt hun aanwezigheid automatisch geregistreerd tegen de juiste campus, servicetijd en groep. U hoeft aanwezigheid niet handmatig in te voeren voor iemand die het incheckingsysteem gebruikt.

## Inchecking instellen

1. **Configureer eerst uw aanwezigheidsstructuur.** Ga in B1 Admin naar **Aanwezigheid > Instellen** en zorg ervoor dat uw campussen, servicetijden en groepen op hun plaats zijn. De incheckings-app is afhankelijk van deze configuratie. Zie [Aanwezigheid instellen](setup.md) voor details.
2. **Installeer de B1 Inchecking-app** op de apparaten die u wilt gebruiken. De app is beschikbaar op de volgende platforms:
   - **Android/Samsung-tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Meld u aan bij de B1 Inchecking-app** met de accountreferenties van uw kerk.
4. **Selecteer de campus en servicetijd** voor de huidige bijeenkomst.
5. Leden kunnen nu naar hun naam op het apparaat zoeken en inchecken.

:::tip
Plaats incheckingsapparaten op zichtbare, gemakkelijk bereikbare plaatsen, zoals lobbyingangen of welkome bureaus. Een korte aankondiging tijdens services helpt leden de optie te kennen.
:::

:::tip
Als uw kerk meerdere campussen heeft, moet u de instellingen voor elke campus in [Aanwezigheid instellen](setup.md) herhalen. Elk incheckingsapparaat kan voor een andere campus worden geconfigureerd.
:::

## Aanbevolen hardware

**Tablets** -- elk van deze werkt goed met de app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8,7"
- **Groot scherm:** Samsung Galaxy Tab A8 10,5"
- **Budget:** Amazon Fire HD 10

**Printers** -- inchecking werkt met Brother-etiketprinters voor het afdrukken van naamlabels:

- **Best:** Brother QL-1110NWB (ondersteunt meerdere tablets via Bluetooth en Wi-Fi)
- **Goed:** Brother QL-810W (ondersteunt meerdere tablets via Wi-Fi)
- **Budget:** Brother QL-1100 (alleen Wi-Fi)

**Etiketten:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Alleen Brother-etiketprinters zijn compatibel met de B1 Inchecking-app. Andere printermerkenen werken niet voor het afdrukken van naamlabels.
:::

:::info
Volg de instellingsinstructies van uw printer om deze aan te sluiten op hetzelfde Wi-Fi-netwerk als uw tablet. U kunt Brother-printerstuurprogramma's en instellingsgidsen vinden op de [Brother-ondersteuningssite](https://support.brother.com).
:::

## Het uiterlijk van de kiosk aanpassen

U kunt het uiterlijk van de B1 Inchecking-app aanpassen zodat deze overeenkomt met de branding van uw kerk. Ga in B1 Admin naar **Aanwezigheid > Kiosk-thema** om het volgende in te stellen:

### Kleuren

Pas acht kleurinstellingen aan uw kerkbranding aan:

- **Primair** en **Primair contrast** -- Merkkleur en tekstkleur ervan.
- **Secundair** en **Secundair contrast** -- Accentkleur en tekstkleur ervan.
- **Kopechtergr** en **Subkopachtergr** -- Kleuren voor kioskkoppen.
- **Knopachtergr** en **Knoptekst** -- Kleuren voor interactieve knoppen.

### Achtergr afbeelding

Upload een optionele achtergr voor de kiosk-welkom- en zoeekschermen. Aanbevolen grootte is 1920x1080 pixels.

### Inactief scherm / Screensaver

Configureer een screensaver die na een periode van inactiviteit wordt geactiveerd:

1. Schakel het inactieve scherm **in** of **uit**.
2. Stel de **timeout** in (hoeveel seconden inactiviteit voordat de screensaver start, minimum 10 seconden).
3. Voeg één of meer **slides** toe -- elke slide heeft een afbeelding en een weergaveduur (minimum 3 seconden).

:::tip
Gebruik het inactieve scherm voor het weergeven van mededelingen, komende ereignissen of welkomstberichten wanneer de kiosk niet actief wordt gebruikt.
:::

## Gastregistratie via QR-code

De incheckingskiosk kan een QR-code weergeven die bezoekers scannen om zichzelf en hun familie op hun eigen telefoon te registreren. Dit versnelt het incheckingsproces voor eerstmaals gasten.

Wanneer een gast de QR-code scant, worden zij naar een [gastregistratiepagina](../../b1-church/checkin/guest-registration) gebracht, waar zij hun naam, e-mail en familieleden invoeren. Een vrijwilliger kan hen vervolgens op de kiosk opzoeken en ze inchecken.

### Gastregistratie via QR inschakelen

Schakel de QR-code display in:

1. Ga in B1 Admin naar **Mobiel** in de linkerzijbalk (telefoonicoontje).
2. Selecteer het tabblad **Inchecking**.
3. Schakel **Gastregistratie via QR** in.

:::note
Deze instelling bevindt zich onder **Mobiel**, niet onder Aanwezigheid > Kiosk-thema.
:::

## Wat wordt geregistreerd

Elke inchecking creëert een aanwezigheidsregistratie in B1 Admin. U kunt deze gegevens op de tabbladen [Aanwezigheid](tracking-attendance.md) en [Groepen](../groups/group-members.md) net als handmatig ingevoerde aanwezigheid weergeven. Er is geen verschil in hoe de gegevens worden weergegeven -- beide methoden voeden dezelfde rapporten.

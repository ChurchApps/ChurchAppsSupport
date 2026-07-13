---
title: "Personen in bulk bewerken"
---

# Personen in bulk bewerken

<div class="article-intro">
Met bulkbewerking kunt u meerdere personen tegelijk bijwerken, wat tijd bespaart wanneer u dezelfde wijziging op veel personen wilt toepassen. U kunt lidmaatschapsstatus, burgerlijke staat, geslacht, opt-out-voorkeuren en groepslidmaatschappen in één bewerking bijwerken.
</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- U hebt toestemming nodig om persoonsgegevens te beheren. Zie [Rollen en machtigingen](./roles-permissions.md) voor details.
- U moet de personen die u wilt bewerken al hebben toegevoegd of geïmporteerd. Zie indien nodig [Personen toevoegen](./adding-people.md).
</div>

## Personen selecteren voor bulkbewerking

1. Navigeer naar **Personen** in B1 Admin
2. Gebruik de zoek- of filtertools om de personen te vinden die u wilt bijwerken
3. Vink de vakjes naast de naam van elke persoon aan om ze te selecteren
   - U kunt personen afzonderlijk selecteren
   - Of gebruik het selectievakje in de kop om alle zichtbare personen op de huidige pagina te selecteren
4. Zodra u ten minste één persoon hebt geselecteerd, verschijnt de knop **Bulkacties**

:::tip
Als u een grote groep personen op basis van specifieke criteria moet bijwerken, gebruikt u eerst de functie [AI-zoeking](./ai-search.md) of filters om uw lijst te verfijnen en selecteert u vervolgens alle overeenkomende personen.
:::

## Beschikbare bulkacties

Het menu **Bulkacties** biedt verschillende opties:

### Lidmaatschapsstatus bijwerken

Werk de lidmaatschapsstatus bij voor alle geselecteerde personen:

1. Klik op **Bulkacties** → **Lidmaatschapsstatus instellen**
2. Kies de nieuwe status:
   - **Bezoeker** -- Eerste of incidentele bezoekers
   - **Regelmatige bezoeker** -- Frequente bezoekers die geen lid zijn
   - **Lid** -- Officiële kerkleden
   - **Medewerker** -- Kerkmedewerkers
   - **Inactief** -- Personen die niet langer aanwezig zijn
3. Kies de bijwerkmodus:
   - **Alles overschrijven** -- Vervang de huidige status voor alle geselecteerde personen
   - **Alleen leeg bijwerken** -- Stel de status alleen in voor personen die er nog geen hebben
4. Klik op **Bijwerken**

### Burgerlijke staat bijwerken

Werk de burgerlijke staat in bulk bij:

1. Klik op **Bulkacties** → **Burgerlijke staat instellen**
2. Selecteer de nieuwe status:
   - **Onbekend**
   - **Alleenstaand**
   - **Getrouwd**
   - **Gescheiden**
   - **Weduwe/weduwnaar**
3. Kies of u bestaande waarden wilt overschrijven of alleen lege velden wilt bijwerken
4. Klik op **Bijwerken**

### Geslacht bijwerken

Werk de geslachtsinformatie bij voor meerdere personen:

1. Klik op **Bulkacties** → **Geslacht instellen**
2. Selecteer de waarde:
   - **Niet gespecificeerd**
   - **Man**
   - **Vrouw**
3. Kies de bijwerkmodus (alles overschrijven of alleen leeg)
4. Klik op **Bijwerken**

### Opt-outstatus bijwerken

Bepaal of personen zich hebben afgemeld voor communicatie:

1. Klik op **Bulkacties** → **Opt-out instellen**
2. Kies:
   - **Nee** -- Communicatie toestaan (opt-out verwijderen)
   - **Ja** -- Communicatie blokkeren (opt-out instellen)
3. Kies de bijwerkmodus
4. Klik op **Bijwerken**

:::warning
Wees voorzichtig bij het wijzigen van de opt-outstatus. Personen die zich expliciet hebben afgemeld, mogen geen communicatie ontvangen tenzij zij nieuwe toestemming hebben gegeven.
:::

### Toevoegen aan groep

Voeg alle geselecteerde personen toe aan een of meer groepen:

1. Klik op **Bulkacties** → **Toevoegen aan groep**
2. Zoek naar en selecteer de groep(en) om personen aan toe te voegen
3. U kunt meerdere groepen selecteren om personen aan alle groepen tegelijk toe te voegen
4. Klik op **Toevoegen aan groepen**

Elke persoon wordt toegevoegd als een regulier lid van de geselecteerde groep(en). U kunt individuen later indien nodig promoveren tot groepsleider vanaf de pagina [Groepsleden](../groups/group-members.md).

### Verwijderen uit groep

Verwijder alle geselecteerde personen uit een of meer groepen:

1. Klik op **Bulkacties** → **Verwijderen uit groep**
2. Zoek naar en selecteer de groep(en) om personen uit te verwijderen
3. U kunt meerdere groepen selecteren
4. Klik op **Verwijderen uit groepen**

:::info
Deze actie verwijdert personen alleen uit de opgegeven groepen. Hun persoonsrecords worden niet verwijderd.
:::

### Personen verwijderen

Verwijder de geselecteerde personen permanent uit uw kerkdatabase:

1. Klik op **Bulkacties** → **Verwijderen**
2. Bekijk de lijst met personen die zullen worden verwijderd
3. Typ **DELETE** in het bevestigingsveld
4. Klik op **Verwijdering bevestigen**

:::danger
Het verwijderen van personen is permanent en kan niet ongedaan worden gemaakt. Dit verwijdert al hun gegevens, waaronder:
- Persoonlijke informatie
- Groepslidmaatschappen
- Aanwezigheidsrecords
- Donatiegeschiedenis
- Formulierinzendingen

Gebruik deze actie alleen als u absoluut zeker weet dat u deze personen uit uw systeem wilt verwijderen.
:::

## Resultaten van bulkbewerking

Na het voltooien van een bulkactie ziet u een samenvatting met:

- **Totaal geselecteerd** -- Hoeveel personen bij de bewerking waren betrokken
- **Succesvol bijgewerkt** -- Hoeveel records zijn gewijzigd
- **Mislukt** -- Eventuele records die niet konden worden bijgewerkt (indien van toepassing)
- **Ongewijzigd** -- Records die geen wijzigingen nodig hadden (bijvoorbeeld bij gebruik van de modus "alleen leeg bijwerken")

Als bepaalde updates zijn mislukt, ziet u foutdetails die uitleggen waarom.

## Aanbevolen werkwijzen

- **Begin klein** -- Test bulkbewerkingen eerst op een paar records om ervoor te zorgen dat u de juiste wijzigingen aanbrengt
- **Gebruik filters** -- Verfijn uw lijst met filters of AI-zoeking voordat u personen selecteert, zodat u alleen de juiste personen bijwerkt
- **Controleer selecties dubbel** -- Controleer de geselecteerde personen voordat u bulkwijzigingen toepast
- **Gebruik de modus "alleen leeg bijwerken"** -- Wanneer u ontbrekende gegevens wilt invullen zonder bestaande informatie te overschrijven
- **Documenteer belangrijke wijzigingen** -- Houd aantekeningen bij over bulkupdates voor het geval u ze later moet raadplegen
- **Stem af met uw team** -- Laat andere beheerders weten wanneer u grote bulkwijzigingen doorvoert

## Veelvoorkomende toepassingen

### Nieuwe leden bijwerken

Werk na een lidmaatschapscursus alle aanwezigen bij naar de status Lid:

1. Zoek naar de personen die de cursus hebben bijgewoond
2. Selecteer ze allemaal
3. Gebruik **Bulkacties** → **Lidmaatschapsstatus instellen** → **Lid**

### Kleine groepen organiseren

Voeg meerdere personen toe aan een nieuwe kleine groep:

1. Zoek naar de personen die u in de groep wilt
2. Selecteer ze
3. Gebruik **Bulkacties** → **Toevoegen aan groep** en selecteer de kleine groep

### Gegevens opschonen

Vul de ontbrekende burgerlijke staat in voor getrouwde stellen:

1. Filter op personen die getrouwd zijn (met behulp van huishoudinformatie)
2. Selecteer degenen met een lege burgerlijke staat
3. Gebruik **Bulkacties** → **Burgerlijke staat instellen** → **Getrouwd** → **Alleen leeg bijwerken**

## Gerelateerde artikelen

- [Personen zoeken](./searching-people.md) -- Personen vinden om te bewerken
- [AI-zoeking](./ai-search.md) -- Gebruik natuurlijke taal om specifieke groepen personen te vinden
- [Groepsleden](../groups/group-members.md) -- Groepslidmaatschap beheren
- [Gegevens exporteren](./exporting-data.md) -- Exporteer persoonsgegevens voordat u bulkwijzigingen aanbrengt

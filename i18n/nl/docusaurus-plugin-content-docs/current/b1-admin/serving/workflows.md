---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Workflows leiden mensen door een reeks stappen op een visueel bord. Elke persoon wordt een kaart die van de ene stap naar de volgende reist -- van de opvolging van een eerste bezoeker, tot een lidmaatschapsproces, tot een bedankje voor een eerste gever, en al het andere waarbij je veel mensen door dezelfde reeks fasen moet volgen. Een stap kan een vrijwilliger vragen om iets te doen (bellen, een gesprek voeren) **en** tegelijkertijd automatische acties op eigen kracht uitvoeren -- een e-mail sturen, een paar dagen wachten, de persoon aan een groep toevoegen -- zodat Workflows zowel de menselijke opvolging als het routinewerk eromheen afhandelen. Workflows breiden [Taken](./tasks.md) uit tot een sleep-en-neerzet Kanban-bord zodat niets en niemand tussen wal en schip valt.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Zorg ervoor dat de mensen die je wilt volgen bestaan in B1 Admin
- Maak jezelf vertrouwd met hoe [Taken](./tasks.md) werken, aangezien elke kaart op een bord een taak is
- Om de actie **E-mail versturen** te gebruiken, maak je eerst de e-mailsjablonen die je wilt versturen (beheerd onder **Berichten → Sjablonen beheren**)
- Je hebt de juiste Taken-rechten nodig. Bekijken, kaarten bewerken en workflows beheren zijn afzonderlijke rechtenniveaus (zie [Rollen & Rechten](../settings/roles-permissions.md))

</div>

## Workflows bekijken

Navigeer naar **Dienstbaarheid**, open het gebied **Taken** en selecteer **Workflows** in het menu. Je ziet je workflows vermeld en gegroepeerd op categorie, met actieve workflows gemarkeerd. Klik op een workflow om het bord te openen.

## Een workflow maken

1. Klik op de Workflows-pagina op **Workflow toevoegen**.
2. Kies hoe je wilt starten:
   - **Lege workflow** -- begin vanaf nul en bouw je eigen stappen.
   - **Vanuit een sjabloon** -- begin met een kant-en-klare reeks stappen die je kunt bewerken. Ingebouwde sjablonen zijn onder andere:
     - **Opvolging nieuwe bezoeker** -- Welkomstmail sturen → Persoonlijk telefoongesprek → Uitnodigen voor volgende stap → Verbonden
     - **Lidmaatschapscursus** -- Interesse tonen → Inschrijven voor cursus → Cursus bijwonen → Lidmaatschap voltooien
     - **Bedankje eerste gever** -- Bedankbriefje sturen → Impact van geven delen → Gekoesterd

3. Geef de workflow een **Naam**.
4. Wijs eventueel een **Categorie** toe om gerelateerde workflows te groeperen. Je kunt een nieuwe categorie direct vanuit de vervolgkeuzelijst maken.
5. Laat de workflow **Actief** staan zodat mensen eraan kunnen worden toegevoegd, of zet hem op **Inactief** om hem te verbergen uit de lijsten voor het toevoegen aan workflows.
6. Klik op **Opslaan**.

:::tip
Gebruik de knop **Dupliceren** op de Workflows-lijst om een bestaande workflow te kopiëren -- inclusief de stappen, geautomatiseerde acties en routering -- als startpunt voor een nieuwe.
:::

## Het bord opbouwen met stappen

Elk workflowbord bestaat uit **stappen**, weergegeven als kolommen van links naar rechts. Open een workflow en gebruik **Stap toevoegen** om elke fase van je proces aan te maken.

Wanneer je een stap toevoegt of bewerkt, kun je het volgende configureren:

- **Stapnaam** -- de kolomtitel (bijvoorbeeld "Welkomstgesprek" of "Wachten op inschrijving").
- **Verval in (dagen)** -- stelt automatisch een vervaldatum in wanneer een kaart deze stap binnenkomt. Kaarten na hun vervaldatum worden gemarkeerd als **Verlopen**.
- **Standaard toegewezene** -- de persoon of groep waaraan nieuwe kaarten op deze stap automatisch worden toegewezen.
- **Geautomatiseerde acties** -- dingen die het systeem zelf doet wanneer een kaart binnenkomt (zie hieronder).
- **Routering** -- waar de kaart naartoe gaat wanneer die de stap verlaat (zie [Routering](#kaarten-routeren-met-uitkomsten-en-voorwaarden)).

Sleep stapkolommen in de volgorde die overeenkomt met je proces. De volgorde bepaalt ook het standaardpad dat een kaart volgt wanneer er geen andere routering van toepassing is.

:::info
Sla een nieuwe stap eerst op. Geautomatiseerde acties en routering worden aan de stap gekoppeld, dus de editor ontgrendelt die secties pas zodra de stap bestaat.
:::

## Geautomatiseerde acties

Elke stap kan een lijst met **geautomatiseerde acties** bevatten die vanzelf worden uitgevoerd op het moment dat een kaart de stap **binnenkomt** -- voordat iemand hem aanraakt. Zo zorgt een stap zowel voor een aansporing aan een vrijwilliger *als* voor het routinewerk rond de opvolging.

Open in de stapeditor **Geautomatiseerde acties**, klik op **Actie toevoegen**, kies een type, vul de instellingen in en klik op het opslagicoon bij die actie. Voeg er zoveel toe als je nodig hebt; ze worden **van boven naar beneden op volgorde** uitgevoerd.

| Actie | Wat het doet |
|---|---|
| **E-mail versturen** | Stuurt de persoon een e-mailsjabloon die je kiest. Je kunt de onderwerpregel overschrijven. |
| **Wachten** | Pauzeert de kaart een aantal dagen voordat er verder wordt gegaan (zie hieronder). |
| **Aan groep toevoegen** | Voegt de persoon toe aan een [groep](../groups/index.md) die je kiest. |
| **Aan workflow toevoegen** | Start de persoon in een andere workflow -- handig om over te dragen tussen processen. |
| **Notitie toevoegen** | Registreert een notitie in de geschiedenis van de kaart. |
| **Veld instellen** | Werkt een veld op het persoonsdossier bij: Lidmaatschapsstatus, Burgerlijke staat, Geslacht, Plaats, Provincie of Postcode. |
| **Webhook** | Stuurt de gegevens van de kaart naar een extern webadres (URL) dat je opgeeft, om met andere systemen te verbinden. |

Nadat alle acties van een stap zijn afgerond, **blijft de kaart op die stap staan** zodat iemand ermee aan de slag kan -- tenzij de stap een automatische route heeft die hem verder brengt (zie [Volledig geautomatiseerde stappen](#volledig-geautomatiseerde-stappen)).

:::info
Geautomatiseerde acties worden alleen uitgevoerd wanneer een kaart via de normale stroom binnenkomt -- wanneer die voor het eerst wordt toegevoegd, wanneer een uitkomst of automatische route hem binnenbrengt, of nadat een Wachten-actie is afgelopen. Ze worden **niet** opnieuw uitgevoerd wanneer een medewerker een kaart handmatig naar de stap sleept of terugstuurt, zodat iemand niet twee keer dezelfde e-mail krijgt.
:::

### E-mail versturen

Kies **E-mail versturen**, kies een van je e-mailsjablonen en typ eventueel een aangepast onderwerp. Wanneer een kaart de stap binnenkomt, ontvangt de persoon die e-mail automatisch. (Als de persoon geen e-mailadres heeft geregistreerd, slaat de stap deze actie gewoon over.)

### Een paar dagen wachten (druppelreeksen)

De actie **Wachten** houdt een kaart vast voor het aantal dagen dat je instelt. Terwijl hij wacht, toont de kaart **Gesnoozed**. Wanneer het wachten voorbij is:

1. Worden eventuele **resterende acties op dezelfde stap** uitgevoerd -- zo kun je een druppelreeks bouwen zoals **E-mail versturen → 3 dagen wachten → Herinneringsmail versturen**.
2. Vervolgens gaat de kaart, als de stap een automatische route heeft, verder; anders blijft hij op de stap staan zodat iemand hem kan oppakken.

:::tip
Een **Wachten**-actie helemaal aan het begin van een stap is een eenvoudige manier om een kaart even "vast te houden" voordat die bij een vrijwilliger opduikt -- bijvoorbeeld *7 dagen wachten, en dan neemt een coach contact op*.
:::

## Mensen als kaarten toevoegen

Er zijn verschillende manieren om mensen op een bord te plaatsen:

- **Vanaf het bord** -- Klik op **Kaart toevoegen** onderaan een stapkolom en kies een persoon. Je kunt ook een groep kiezen, en elk lid van die groep wordt als kaart toegevoegd.
- **Vanaf het dossier van een persoon** -- Gebruik **Aan workflow toevoegen** op de pagina van een persoon om diegene op een workflow te plaatsen.
- **Vanuit Personen zoeken** -- Selecteer meerdere personen en gebruik de bulkactie **Aan workflow toevoegen** om ze allemaal in één keer toe te voegen.
- **Automatisch met een trigger** -- Voeg mensen toe wanneer er iets gebeurt, zoals het indienen van een formulier of een eerste gift (zie [Triggers](#triggers) hieronder).

## Aan de slag met het bord

Open een workflow om het bord te bekijken. Elke kaart toont de naam van de persoon, aan wie hij is toegewezen en een vervaldatum- of statuschip (**Verlopen** of **Gesnoozed**). Een stapkolom toont ook kleine badges voor eventuele geautomatiseerde acties die hij uitvoert en aantekeningen voor de routering, zodat je in één oogopslag ziet hoe kaarten stromen.

- **Een kaart verplaatsen** -- Sleep een kaart van de ene kolom naar de volgende naarmate de persoon vordert.
- **Een kaart openen** -- Dubbelklik op een kaart (of klik erop) om de detaillade te openen, waar je de stap kunt wijzigen, opnieuw kunt toewijzen, notities kunt toevoegen en kunt bekijken wat er al is gebeurd.

Vanuit de kaartlade kun je:

- De kaart **toewijzen** aan een andere persoon of groep.
- De kaart **snoozen** voor 1 dag, 3 dagen of 1 week om de vervaldatum tijdelijk te verbergen.
- **Terugsturen** naar de vorige stap of **overslaan** naar de volgende stap.
- **Toewijzing vastzetten** -- houd dezelfde eigenaar op de kaart, ook als die tussen stappen beweegt. Standaard wijst het verplaatsen van een kaart naar een nieuwe stap deze opnieuw toe aan de standaard toegewezene van die stap; vastzetten houdt de huidige persoon gedurende het hele proces verantwoordelijk.
- De kaart **voltooien** om hem af te ronden, of een **Uitkomst**-knop kiezen als de stap uitkomsten heeft ingesteld (zie [Routering](#kaarten-routeren-met-uitkomsten-en-voorwaarden)).
- **Notities toevoegen** en de **geschiedenis** van de kaart bekijken -- inclusief een logboek van geautomatiseerde acties die zijn uitgevoerd (verzonden e-mails, wachttijden, enz.).

### Bulkacties

Selecteer de selectievakjes op meerdere kaarten om ze samen te bewerken. Er verschijnt een werkbalk waarmee je alle geselecteerde kaarten in één keer kunt **voltooien**, **snoozen**, **opnieuw toewijzen** of **verplaatsen** naar een andere stap.

## Kaarten routeren met uitkomsten en voorwaarden

Routering bepaalt waar een kaart naartoe gaat wanneer die een stap verlaat. Open de editor van een stap om twee soorten routering te configureren.

### Uitkomstknoppen

Uitkomsten zijn knoppen die in de kaartlade worden getoond wanneer je een kaart op die stap voltooit. In plaats van één enkele **Voltooien**-knop kun je keuzes aanbieden zoals "Lid geworden van een groep" of "Geen interesse". Elke uitkomst kan:

- De kaart naar **een andere stap** in deze workflow sturen,
- **De kaart overdragen** aan een geheel andere workflow, of
- De kaart **sluiten**.

Zo kan één beslissing de persoon langs verschillende paden laten vertakken.

### Automatische routering (voorwaardelijk)

Automatische routes verplaatsen een kaart verder **op het moment dat die een stap binnenkomt** (en nadat de geautomatiseerde acties zijn afgerond), zonder dat iemand klikt, als de persoon voldoet aan een reeks voorwaarden. Voeg een route toe, kies de doelstap en definieer een of meer **voorwaarden** (bijvoorbeeld de campus, leeftijd of lidmaatschapsstatus van een persoon). Een route zonder voorwaarden geldt voor iedereen.

:::info
Op het bord toont elke stapkolom kleine aantekeningen die de routering beschrijven -- bijvoorbeeld een uitkomstlabel of "indien overeenkomt" gevolgd door een pijl naar de doelstap of -workflow.
:::

## Volledig geautomatiseerde stappen

Je kunt een stap volledig zelfstandig laten draaien, zonder dat iemand hem bewerkt. Geef de stap zijn **geautomatiseerde acties** en voeg een **automatische route** toe (zonder voorwaarden) die naar de volgende stap wijst. Wanneer een kaart binnenkomt, worden de acties uitgevoerd, en vervolgens brengt de route hem meteen verder -- de kaart gaat er rechtstreeks doorheen.

:::tip
Combineer dit met **Wachten**: *Welkomstmail sturen → 3 dagen wachten → automatisch doorgaan naar de stap "Persoonlijk gesprek".* De e-mail en de timing worden voor je geregeld, en een vrijwilliger ziet de kaart pas als het tijd is voor het menselijke contact.
:::

## Triggers

Triggers voegen mensen automatisch aan een workflow toe wanneer er iets gebeurt, zodat je nooit handmatig kaarten hoeft toe te voegen. Klik op een workflowbord op het tabblad **Triggers** en vervolgens op **Trigger toevoegen**. Er zijn twee soorten:

### Gebeurtenistriggers

Worden geactiveerd zodra een dossier in B1 verandert. Kies de gebeurtenis en voeg eventueel **voorwaarden** toe zodat alleen overeenkomende mensen worden toegevoegd:

- **Persoon · Aangemaakt / Bijgewerkt** -- bijv. iedereen toevoegen wiens status *Bezoeker* wordt.
- **Donatie · Aangemaakt** -- bijv. een eerste of grote gift toevoegen aan een bedankworkflow (op basis van bedrag, fonds of methode).
- **Groep · Lid toegetreden** / **Groep · Aangemaakt**.
- **Formulier · Ingediend** -- iedereen toevoegen die een gekozen formulier indient (geweldig voor een "Ik ben nieuw"- of "Verbind"-kaart).

### Geplande triggers

Draaien op terugkerende basis -- dagelijks, wekelijks, maandelijks of jaarlijks -- tegen een reeks voorwaarden. Gebruik deze voor tijdgebonden benadering, zoals *iedereen wiens lidmaatschapsjubileum vandaag is* of een *maandelijkse* check-in.

Voor elke trigger kun je ook instellen:

- De **instapstap** waarop de nieuwe kaart start (standaard de eerste stap).
- **Eenmaal per persoon** -- zodat dezelfde persoon niet twee keer door de trigger aan de workflow wordt toegevoegd.
- **Actief** -- zet de trigger aan of uit zonder hem te verwijderen.

:::tip
Combineer een **Formulier · Ingediend**-trigger met het sjabloon **Opvolging nieuwe bezoeker** om je "Contactkaart" of "Ik ben nieuw"-formulier om te zetten in een automatische opvolgingspijplijn.
:::

## Mijn kaarten

Vrijwilligers en medewerkers hoeven niet elk bord af te zoeken om hun werk te vinden. De pagina **Mijn kaarten** (gekoppeld vanaf de Workflows-pagina) toont elke kaart die aan de huidige gebruiker is toegewezen, op alle workflows. Klik op een kaart om het bord waartoe hij behoort te openen.

## Rapporten

Open een workflow en klik op **Rapporten** om analyses voor die workflow te bekijken:

- **Verlopen** -- het aantal kaarten na hun vervaldatum.
- **Kaarten per stap** -- hoeveel kaarten er momenteel op elke stap staan, weergegeven als een kolomgrafiek.
- **Voltooid (30 dagen)** -- doorstroom over de afgelopen 30 dagen, weergegeven als een lijngrafiek.

Gebruik deze om knelpunten op te sporen -- bijvoorbeeld een stap waar kaarten zich opstapelen en nooit verder komen.

## Gerelateerde artikelen

- [Taken](./tasks.md) -- de individuele actiepunten waarop workflowkaarten zijn gebouwd
- [Automatiseringen](./automations.md) -- maak terugkerende taken op een schema
- [Formulieren](../forms/index.md) -- bouw de formulieren die workflows kunnen activeren
- [Groepen](../groups/index.md) -- de groepen waarin een "Aan groep toevoegen"-actie mensen kan plaatsen
- [Rollen & Rechten](../settings/roles-permissions.md) -- bepaal wie workflows kan bekijken, bewerken en beheren

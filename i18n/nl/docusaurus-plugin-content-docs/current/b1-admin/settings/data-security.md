---
title: "Gegevensbeveiliging"
---

# Gegevensbeveiliging

<div class="article-intro">

Er is geen perfect beveiligd systeem, maar ChurchApps neemt gegevensbeveiliging serieus. Deze pagina legt uit welke maatregelen worden genomen om alle gegevens die in B1.church Admin en andere ChurchApps-producten worden ingevoerd, te beschermen.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Controleer deze pagina om te begrijpen hoe de gegevens van uw kerk worden beschermd
- Stel [Rollen & Machtigingen](./roles-permissions.md) in om te bepalen wie toegang tot gevoelige informatie heeft
- Maak jezelf vertrouwd met het [privacybeleid](https://churchapps.org/privacy)

</div>

## Gevoelige gegevens beperken die zijn opgeslagen

Onze eerste benadering is om niet meer gevoelige gegevens op te slaan dan nodig. Dit betekent dat creditcardgegevens of bankrekeningdetails die voor donaties worden gebruikt, nooit worden opgeslagen. Wanneer een gebruiker een donatie doet met behulp van B1.church Admin of B1, worden de creditcardgegevens nooit naar een van onze servers verzonden, alleen naar uw betaalgateway (Stripe). Dit betekent dat in het geval van een datalekng geen creditcard- of bankgegevens in gevaar zijn.

We slaan ook nooit wachtwoorden in ons systeem op. Alle wachtwoorden worden verwerkt via een eenrichtingshashing-algoritme waarin gegevens worden vernietigd, waardoor het onmogelijk is voor iedereen om wachtwoorden uit de database op te halen, zelfs wij niet. Om wachtwoorden te verifiëren, moet de ingevoerde waarde door dezelfde eenrichtingshash gaan en hetzelfde resultaat opleveren.

Na het verwijderen van deze twee bronnen, is de enige gevoelige gegevens die overblijft een lijst met namen en contactgegevens.

:::tip
Omdat ChurchApps nooit creditcard- of bankgegevens opslaat, zou zelfs een worst-case datalekng geen financiële rekeningdetails blootstellen. Alleen namen en contactgegevens zouden risico lopen.
:::

## Industriestandaard beste praktijken gebruiken

We gebruiken industriestandaard best practices voor beveiliging, inclusief het versleutelen van alle gegevens in transit naar en van onze servers met behulp van HTTPS. Alle servers worden gehost in een veilig fysiek datacentrum met Amazon Web Services. Alle databaseservers worden achter een firewall opgeslagen en zijn niet toegankelijk via internet.

## Gegevenssegmentatie

Gegevens worden in verschillende databases gescheiden op basis van bereik. Elk van onze API's (lidmaatschap, geven, aanwezigheid, berichten, doen en lessen) zijn onafhankelijke silts gegevens met hun eigen databases. Als een ervan in gevaar is, is het nut van de gegevens beperkt zonder dat ook anderen in gevaar zijn. Bijvoorbeeld, als de Giving API/database in gevaar zou zijn, zou een slechte actor potentieel toegang kunnen krijgen tot een lijst met donaties en datums (maar nooit kaart-/bankgegevens). Ze zouden echter geen toegang hebben tot welke gebruikers de donaties hebben gedaan of voor welke kerken, aangezien die gegevens in de afzonderlijke lidmaatschapdatabase worden opgeslagen.

:::info
Gegevenssegmentatie betekent dat het in gevaar brengen van het ene systeem geen toegang tot alle kerkgegevens geeft. Elke API werkt onafhankelijk met zijn eigen database, waardoor de impact van mogelijke schending wordt beperkt.
:::

## Beperkte toegang

Toegang tot de productieservers is strikt beperkt tot de serverbeheerders die toegang nodig hebben. Dit zijn momenteel twee personen die ook leden van het bestuur zijn. Ontwikkelaars, vrijwilligers en andere bestuursleden hebben geen toegang tot de productieservers.

## Privacybeleid

Uw gegevens zijn van u en zullen nooit aan derden worden verkocht. U kunt ons volledige privacybeleid [hier](https://churchapps.org/privacy) lezen.

## GDPR-naleving

ChurchApps ondersteunt GDPR-naleving voor kerken met leden in het Verenigd Koninkrijk of de Europese Unie. Hier is hoe we de belangrijkste vereisten behandelen:

### Rechten van gegevensonderwerpen

ChurchApps biedt hulpmiddelen om kerken te helpen reageren op verzoeken van gegevensonderwerpen:

- **Recht op toegang (artikel 15)** -- Leden kunnen een kopie van hun persoonlijke gegevens aanvragen door contact met hun kerk op te nemen. Beheerders kunnen de gegevens van een persoon uit de sectie **Gegevensbeheer** op de pagina met persoonsdetails in B1.church Admin exporteren.
- **Recht op vergetelheid (artikel 17)** -- Leden kunnen verwijdering van het account aanvragen door contact met hun kerk op te nemen. Beheerders kunnen de gegevens van een persoon in alle modules anonimiseren uit de sectie **Gegevensbeheer** op de pagina met persoonsdetails. Anonimisering vervangt persoonlijke informatie door generieke waarden terwijl cumulatieve gegevens (donatietotalen, aanwezigheidsaantallen) behouden blijven die nodig zijn voor kerkfinanciële rapportage.
- **Recht op beperking (artikel 18)** -- Leden kunnen beperking van verwerking aanvragen door contact met hun kerk op te nemen, inclusief het afmelden van communicatie.
- **Recht op gegevensportabiliteit (artikel 20)** -- Beheerders kunnen persoonlijke gegevens in een gestructureerd, machine-leesbaar JSON-formaat namens leden die dit aanvragen, exporteren.

### De hulpmiddelen voor gegevensbeheer gebruiken

Gegevens-toegang voor GDPR voor een persoon:

1. Ga naar **Personen** in B1 Admin en open de gegevens van de persoon.
2. Klik op **Bewerken** om de bewerkingsmodus in te voeren.
3. Schuif omlaag naar de sectie **Gegevensbeheer** (standaard samengevouwen) en klik om deze uit te vouwen.
4. Gebruik **Gegevens exporteren** om een JSON-bestand te downloaden van alle gegevens die voor die persoon zijn opgeslagen.
5. Gebruik **Anonimiseren** om persoonlijke informatie door generieke waarden te vervangen. U wordt gevraagd `ANONYMIZE` in te typen om te bevestigen -- deze actie kan niet ongedaan worden gemaakt.

:::warning
Anonimisering is permanent. Donatietotalen en aanwezigheidsaantallen blijven behouden voor financiële rapportagedoeleinden, maar alle persoonlijke identifiers (naam, e-mail, adres, enz.) worden verwijderd en kunnen niet worden hersteld.
:::

### Gegevensverwerking

ChurchApps treedt op als **gegevensprocessor** namens uw kerk (de **gegevenscontroller**). Onze [Overeenkomst voor gegevensverwerking](https://churchapps.org/terms) schetst de verantwoordelijkheden van elke partij, inclusief subprocessorgebruik, inbreukmeldingsprocedures en gegevensafhandeling bij beëindiging.

### Internationale gegevensoverdrachten

ChurchApps-gegevens worden gehost op Amazon Web Services (AWS) in de Verenigde Staten. Internationale gegevensoverdrachten van het VK/EU worden gedekt door AWS's Standard Contractual Clauses (SCC's) onder de [AWS Data Processing Addendum](https://aws.amazon.com/compliance/data-processing-addendum/). De AWS DPA is automatisch opgenomen in de AWS Service Terms voor alle klanten. EU-gebaseerde hosting is niet vereist wanneer passende overdraagsmechanismen zoals SCC's aanwezig zijn.

Voor details over hoe overdrachtsrisico's zijn geëvalueerd, raadpleegt u de [Overdracht Risk Assessment](./transfer-risk-assessment.md).

### Subprocessors

- **Amazon Web Services (AWS)** -- Infrastructuurhosting, gegevensopslag en contentlevering
- **Stripe** -- Betalingsverwerking voor donaties (geen kaartgegevens worden door ChurchApps opgeslagen)

:::info
Voor volledige details over hoe we persoonlijke gegevens afhandelen, raadpleegt u ons [Privacybeleid](https://churchapps.org/privacy) en [Servicevoorwaarden](https://churchapps.org/terms). Als u vragen hebt over GDPR-naleving, neem contact met ons op via support@churchapps.org.
:::

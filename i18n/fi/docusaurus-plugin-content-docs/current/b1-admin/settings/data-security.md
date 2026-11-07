---
title: "Tietoturva"
---

# Tietoturva

<div class="article-intro">

Täydellisesti turvallista järjestelmää ei ole olemassa, mutta ChurchApps suhtautuu tietoturvaan vakavasti. Tämä sivu kertoo, mitä toimia on tehty suojaamaan B1.church Adminiin ja muihin ChurchApps-tuotteisiin syötetyt tiedot.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Lue tämä sivu, jotta ymmärrät, miten seurakuntasi tietoja suojataan
- Määritä [Roolit ja käyttöoikeudet](./roles-permissions.md), jotta voit hallita, kuka pääsee arkaluonteisiin tietoihin
- Tutustu [tietosuojakäytäntöön](https://churchapps.org/privacy)

</div>

## Arkaluonteisten tallennettavien tietojen rajoittaminen

Ensimmäinen lähestymistapamme on olla tallentamatta enempää arkaluonteisia tietoja kuin on tarpeen. Tämä tarkoittaa, että emme koskaan tallenna lahjoitusten maksamiseen käytettyjä luottokortti- tai pankkitilitietoja. Kun käyttäjä tekee lahjoituksen B1.church Adminin tai B1:n kautta, luottokorttitietoja ei lähetetä lainkaan meidän palvelimillemme, vaan ainoastaan maksunvälittäjällesi (Stripe). Tämän ansiosta tietovuodon sattuessa luottokortti- tai pankkitietoja ei vaarantuisi.

Emme myöskään koskaan tallenna salasanoja järjestelmäämme. Kaikki salasanat käsitellään yksisuuntaisella tiivistysalgoritmilla, jossa osa tiedoista hävitetään. Tämän vuoksi kukaan ei pysty palauttamaan salasanoja tietokannasta, ei edes me. Salasanan tarkistamiseksi syötetty arvo täytyy käydä läpi sama yksisuuntainen tiivistys, ja tuloksen on oltava sama.

Näiden kahden lähteen poistamisen jälkeen ainoat jäljelle jäävät arkaluonteiset tiedot ovat nimiluettelo ja yhteystiedot.

:::tip
Koska ChurchApps ei koskaan tallenna luottokortti- tai pankkitietoja, edes pahimmassakaan tietovuodossa taloudellisia tilitietoja ei paljastuisi. Vaarassa olisivat vain nimet ja yhteystiedot.
:::

## Yleisesti käytettyjen hyvien käytäntöjen noudattaminen

Noudatamme alan vakiintuneita tietoturvan parhaita käytäntöjä, mukaan lukien kaiken palvelimillemme siirrettävän ja niiltä siirrettävän tiedon salaaminen HTTPS-protokollalla. Kaikki palvelimet sijaitsevat Amazon Web Servicesin turvallisessa fyysisessä datakeskuksessa. Kaikki tietokantapalvelimet ovat palomuurin takana, eikä niihin ole pääsyä internetistä.

## Tietojen erottelu

Tiedot on jaettu eri tietokantoihin laajuuden mukaan. Jokainen API-rajapinta (Membership, Giving, Attendance, Messaging, Doing ja Lessons) on itsenäinen tietosiilo omine tietokantoineen. Jos yksi niistä vaarantuu, tiedot ovat hyödyttömiä ilman, että myös muut vaarantuvat. Esimerkiksi jos Giving-rajapinta tai -tietokanta vaarantuisi, pahantahtoinen taho voisi mahdollisesti saada käsiinsä luettelon lahjoituksista ja päivämääristä (ei koskaan kortti- tai pankkitietoja). Hänellä ei kuitenkaan olisi tietoa siitä, mitkä käyttäjät lahjoituksia tekivät tai mille seurakunnille ne menivät, koska nämä tiedot on tallennettu erilliseen Membership-tietokantaan.

:::info
Tietojen erottelu tarkoittaa, että yhden järjestelmän vaarantuminen ei anna pääsyä kaikkiin seurakunnan tietoihin. Jokainen rajapinta toimii itsenäisesti omalla tietokannallaan, mikä rajoittaa mahdollisen tietovuodon vaikutusta.
:::

## Rajoitettu pääsy

Pääsy tuotantopalvelimille on tiukasti rajoitettu niihin palvelinvalvojiin, jotka tarvitsevat sitä. Tällä hetkellä heitä on kaksi, ja he ovat myös hallituksen jäseniä. Kehittäjillä, vapaaehtoisilla ja muilla hallituksen jäsenillä ei ole lupaa päästä tuotantopalvelimille.

## Tietosuojakäytäntö

Tietosi ovat sinun, eikä niitä koskaan myydä kolmansille osapuolille. Voit lukea koko tietosuojakäytäntömme [täältä](https://churchapps.org/privacy).

## GDPR-vaatimustenmukaisuus

ChurchApps tukee GDPR-vaatimustenmukaisuutta seurakunnille, joilla on jäseniä Yhdistyneessä kuningaskunnassa tai Euroopan unionissa. Näin vastaamme keskeisiin vaatimuksiin:

### Rekisteröidyn oikeudet

ChurchApps tarjoaa työkaluja, joiden avulla seurakunnat voivat vastata rekisteröidyn pyyntöihin:

- **Tarkastusoikeus (19 artikla)** — Jäsenet voivat pyytää kopiota henkilötiedoistaan ottamalla yhteyttä seurakuntaansa. Ylläpitäjät voivat viedä minkä tahansa henkilön tiedot B1.church Adminin henkilön tietosivun **Tietojenhallinta**-osiosta.
- **Oikeus tulla unohdetuksi (17 artikla)** — Jäsenet voivat pyytää tilinsä poistamista itse Profiili-sivultaan (katso [Tilin poistopyyntöjen käsittely](../profile/account-deletion.md)) tai ottamalla yhteyttä suoraan seurakuntaansa. Ylläpitäjät voivat myös anonymisoida henkilön tiedot kaikissa moduuleissa henkilön tietosivun **Tietojenhallinta**-osiosta. Anonymisointi korvaa henkilötiedot yleisillä arvoilla, mutta säilyttää kokonaismääräiset tietueet (lahjoitussummat, osallistujamäärät), joita seurakunnan taloushallinto tarvitsee.
- **Käsittelyn rajoittaminen (18 artikla)** — Jäsenet voivat pyytää tietojensa käsittelyn rajoittamista ottamalla yhteyttä seurakuntaansa, myös kieltäytymällä viestinnästä.
- **Tietojen siirrettävyys (20 artikla)** — Ylläpitäjät voivat viedä henkilötiedot jäsentä pyytäessään rakenteellisessa, koneluettavassa JSON-muodossa.

### Tietojenhallintatyökalujen käyttäminen

Henkilön GDPR-tietotyökalujen käyttäminen:

1. Siirry B1 Adminissa kohtaan **Henkilöt** ja avaa henkilön tietue.
2. Napsauta **Muokkaa** siirtyäksesi muokkaustilaan.
3. Vieritä alas **Tietojenhallinta**-osioon (oletuksena suljettuna) ja napsauta sitä laajentaaksesi sen.
4. Lataa kaikki henkilöstä tallennetut tiedot JSON-tiedostona käyttämällä **Vie tiedot** -toimintoa.
5. Korvaa henkilötiedot yleisillä arvoilla **Anonymisoi**-toiminnolla. Sinua pyydetään kirjoittamaan `ANONYMIZE` vahvistaaksesi toiminnon. Tätä toimintoa ei voi perua.

:::warning
Anonymisointi on pysyvä. Lahjoitussummat ja osallistujamäärät säilytetään taloudellista raportointia varten, mutta kaikki henkilökohtaiset tunnisteet (nimi, sähköpostiosoite, osoite jne.) poistetaan eikä niitä voi palauttaa.
:::

### Tietojenkäsittely

ChurchApps toimii **tietojenkäsittelijänä** seurakuntasi puolesta, joka on **rekisterinpitäjä**. Meidän [tietojenkäsittelysopimuksemme](https://churchapps.org/terms) määrittelee kunkin osapuolen vastuut, mukaan lukien alikäsittelijöiden käytön, tietoturvaloukkausilmoitusten menettelyt ja tietojen käsittelyn sopimuksen päättyessä.

### Kansainväliset tietosiirrot

ChurchApps-tiedot on tallennettu Amazon Web Servicesiin (AWS) Yhdysvalloissa. Tietosiirrot Yhdistyneestä kuningaskunnasta tai EU:sta kattaa AWS:n vakiosopimuslausekkeet (SCC:t) [AWS:n tietojenkäsittelyliitteen](https://aws.amazon.com/compliance/data-processing-addendum/) nojalla. AWS:n tietojenkäsittelyliite sisältyy automaattisesti kaikille asiakkaille AWS-palveluehtoihin. EU-pohjaista palvelinta ei vaadita, kun asianmukaisia siirtomekanismeja, kuten SCC:itä, on käytössä.

Tietoja siitä, miten siirtoriskit on arvioitu, löydät [siirtoriskiarvioinnista](./transfer-risk-assessment.md).

### Alikäsittelijät

- **Amazon Web Services (AWS)** — Infrastruktuurin isännöinti, tietojen tallennus ja sisällönjakelu
- **Stripe** — Lahjoitusten maksunkäsittely (ChurchApps ei tallenna korttitietoja)

:::info
Lisätietoja henkilötietojen käsittelystämme on [tietosuojakäytännössämme](https://churchapps.org/privacy) ja [käyttöehdoissamme](https://churchapps.org/terms). Jos sinulla on kysyttävää GDPR-vaatimustenmukaisuudesta, ota yhteyttä osoitteeseen support@churchapps.org.
:::

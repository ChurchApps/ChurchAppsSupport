---
title: "Siirtoriskin arviointi"
description: "ChurchAppsin vaatimustenmukaisuusasiakirja UK/ETA-US-siirroista seurakuntatietojen osalta B1 Adminissa: suojatoimet, alihankkijat ja käyttöoikeudet."
---

# Siirtoriskin arviointi

<div class="article-intro">

Tämä asiakirja kuvaa ChurchAppsin arvion henkilötietojen kansainvälisiin siirtoihin liittyvistä riskeistä Yhdistyneestä kuningaskunnasta ja ETA-alueelta Yhdysvaltoihin. Arviointi tehdään Yhdistyneen kuningaskunnan yleisen tietosuoja-asetuksen (UK GDPR) ja EU:n yleisen tietosuoja-asetuksen (EU GDPR) mukaisesti. Tämä on ChurchAppsin sisäinen vaatimustenmukaisuusasiakirja, jota ChurchApps ylläpitää tietojenkäsittelijänä.

</div>

**Viimeksi tarkistettu:** huhtikuu 2026

## 1. Siirron tiedot

| Kohde | Tiedot |
|---|---|
| **Tietojen lähettäjä** | ChurchAppsia käyttävät seurakunnat (rekisterinpitäjät), jotka sijaitsevat Yhdistyneessä kuningaskunnassa tai ETA-alueella |
| **Tietojen vastaanottaja** | ChurchApps (tietojenkäsittelijä), toimii Yhdysvalloista |
| **Rekisteröityjen tietojen kohderyhmät** | Seurakunnan jäsenet, osallistujat, vierailijat, lahjoittajat, vapaaehtoiset, lapset (vanhempien tai ylläpitäjien hallinnoimina) |
| **Henkilötietojen luokat** | Nimet, sähköpostiosoitteet, puhelinnumerot, postiosoitteet, syntymäajat, sukupuoli, siviilisääty, profiilikuvat, lahjoitustiedot, osallistumistiedot, ryhmäjäsenyydet, vapaaehtoistehtävät, viestihistoria |
| **Arkaluonteiset tiedot** | Ei tarkoituksellisesti kerättyjä. Terveystietoja, biometrisiä tietoja tai rikostaustatietoja ei tallenneta. Maksutilien tietoja (luottokortit, pankkitilit) ei koskaan tallenneta ChurchAppsin toimesta, vaan niitä käsittelee suoraan Stripe. |
| **Siirron tarkoitus** | Seurakuntien hallintaohjelmiston palvelujen tarjoaminen (jäsenhallinta, lahjoitukset, osallistumisen seuranta, viestintä, vapaaehtoisten aikataulutus, tapahtumien ilmoittautuminen) |
| **Kohdemaa** | Yhdysvallat |
| **Siirtomekanismi** | EU:n vakiosopimuslausekkeet (SCC) ja Yhdistyneen kuningaskunnan kansainvälisen tietosiirron lisäsopimus (IDTA), jotka on sisällytetty AWS:n tietojenkäsittelyliitteen kautta |

## 2. Alihankkijat

| Alihankkija | Tehtävä | Sijainti | Siirtomekanismi |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastruktuurin isännöinti, tietojen tallennus, sisällön jakelu (us-east-2-alue) | Yhdysvallat | AWS:n tietojenkäsittelyliite vakiosopimuslausekkeineen (sisältyy automaattisesti AWS:n palveluehtoihin) |
| **Stripe** | Lahjoitusten maksujen käsittely | Yhdysvallat | Stripen tietojenkäsittelyliite vakiosopimuslausekkeineen |

Luottokortti- ja pankkitilitiedot siirtyvät käyttäjän selaimesta suoraan Stripelle, eivätkä ne koskaan tallennu ChurchAppsin palvelimille tai kulje niiden kautta.

## 3. Riskiarviointi

### 3.1 Salaus

- **Siirron aikana:** Kaikki tiedot salataan TLS/HTTPS-protokollalla käyttäjien ja ChurchAppsin palvelimien välisessä viestinnässä.
- **Tallennettuna:** AWS:ssä tallennetut tiedot salataan levylle AWS:n hallinnoimalla salauksella.

### 3.2 Käyttöoikeudet

- Tuotantopalvelimien käyttö on rajattu kahteen henkilöön, jotka ovat ChurchAppsin hallituksen jäseniä.
- Kehittäjillä, vapaaehtoisilla ja muilla hallituksen jäsenillä ei ole pääsyä tuotantopalvelimiin tai tietokantoihin.
- Tietokantapalvelimet sijaitsevat palomuurin takana, eikä niihin pääse suoraan internetistä.
- Seurakuntien tiedot on eristetty loogisesti: kukin seurakunta pääsee sovelluksen käyttöoikeuksien avulla vain omiin tietoihinsa.

### 3.3 Tietojen erottelu

Tiedot on jaettu kuuteen itsenäiseen tietokantaan (Jäsenrekisteri, Lahjoitukset, Osallistuminen, Viestintä, Tehtävät ja Sisältö). Yhden tietokannan vaarantuminen ei paljasta muiden tietokantojen tietoja. Esimerkiksi Lahjoitukset-tietokanta sisältää lahjoitusten määrät ja päivämäärät, mutta ei lahjoittajien nimiä tai yhteystietoja, jotka on tallennettu Jäsenrekisteriin.

### 3.4 Tietojen minimointi

- Luottokortti- tai pankkitilitietoja ei tallenneta (niitä käsittelee Stripe).
- Salasanat tallennetaan yksisuuntaisella tiivistteellä, eikä niitä voi palauttaa.
- Seurakunnat päättävät itse, mitä tietoja jäsenistään kerätään.

### 3.5 Rekisteröityjen oikeudet

ChurchApps tarjoaa teknisiä työkaluja, joiden avulla seurakunnat voivat vastata rekisteröityjen pyyntöihin:

- **Pääsy ja siirrettävyys:** Kaikkien tietojen vienti koneluettavassa JSON-muodossa.
- **Poisto:** Anonymisointi kaikissa kuudessa tietokannassa. Henkilötiedot korvataan yleisillä arvoilla, ja taloudellisen raportoinnin vaatimat kokonaistiedot säilytetään.
- **Käsittelyn rajoittaminen:** Passiivinen jäsenyystila rajaa henkilön pois hauista, hakemistosta, raporteista ja viestinnästä, mutta henkilön tiedot säilyvät.
- **Oikaisu:** Jäsenet ja ylläpitäjät voivat muokata henkilötietojaan sovelluksen kautta.

### 3.6 Tietoturvaloukkauksen ilmoittaminen

ChurchApps sitoutuu ilmoittamaan asianomaisille seurakunnille henkilötietojen tietoturvaloukkauksesta 72 tunnin kuluessa siitä, kun se on saanut tiedon loukkauksesta. Sitoumus on kirjattu [käyttöehtoihin](https://churchapps.org/terms) (kohta 11.6).

### 3.7 Yhdysvaltain viranomaisten pääsy tietoihin

Yhdysvalloissa isännöityihin tietoihin liittyvä ensisijainen riski on se, että Yhdysvaltain viranomaiset pääsevät tietoihin FISA:n 702 pykälän tai toimeenpanomääräyksen 12333 nojalla. Riski arvioidaan **matalaksi** seuraavista syistä:

- ChurchApps käsittelee seurakuntien jäsen- ja osallistumistietoja, eikä tiedoilla ole tiedustelullista arvoa.
- Rekisteröidyt ovat seurakunnan jäseniä ja osallistujia, eivät ryhmiä, joita valvontaohjelmat tyypillisesti kohdistavat.
- Arkaluonteisia henkilötietoja (terveys-, maksutili- tai poliittiset mielipiteet) ei tallenneta.
- AWS:n tietojenkäsittelyliite sisältää sitoumuksia viranomaispyyntöihin liittyen sekä läpinäkyvyysraportointia.
- EU:n ja Yhdysvaltojen tietosuojakehys (perustettu 2023) tarjoaa lisäsuojaa tiedonsiirroille sertifioituihin yhdysvaltalaisiin organisaatioihin.

## 4. Yleinen riskipäätelmä

Tämän kansainvälisen siirron aiheuttama riski rekisteröidyille arvioidaan **matalaksi**. Tähän päätelmään johtavat seuraavat seikat:

- Vakiosopimuslausekkeet oikeudellisena siirtomekanismina
- Salaus siirron aikana ja tallennettuna
- Tiukat käyttöoikeudet, joilla on vain kaksi valtuutettua henkilöä
- Tietojen erottelu itsenäisiin tietokantoihin
- Maksutilitietojen tallentamattomuus
- Käsiteltävien tietojen alhainen arkaluonteisuus ja alhainen tiedustelullinen arvo
- Ttekniset työkalut kaikkien rekisteröityjen oikeuksien käyttämiseen

Nämä seikat tarjoavat riittävät täydentävät suojatoimet, joilla varmistetaan, että siirrettyjen tietojen suojataso on olennaisesti vastaava kuin Yhdistyneessä kuningaskunnassa ja ETA-alueella taattu suojataso.

## 5. Tarkastusaikataulu

Tämä arviointi tarkistetaan vuosittain tai aina, kun henkilötietojen käsittelyssä, alihankkijoissa tai kansainvälisiä tiedonsiirtoja säätelevässä lainsäädännössä tapahtuu olennaisia muutoksia.

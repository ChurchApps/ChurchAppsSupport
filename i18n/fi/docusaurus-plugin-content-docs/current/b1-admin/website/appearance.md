---
title: "Ulkoasu"
---

# Ulkoasu

<div class="article-intro">

Ulkoasu-sivulla voit muokata verkkosivustosi yleistä ilmettä ja tuntua. Väreistä ja fonteista väliin ja mukautettuun CSS:ään asti voit hallita sivustosi kaikkia visuaalisia osa-alueita yhdestä paikasta.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Suorita verkkosivustosi [alkuasetukset](initial-setup)
- Valmistele kirkkosi logo PNG-muodossa, läpinäkyvällä taustalla ja kuvasuhteella 4:1
- Tiedä kirkkosi brändivärit (heksadesimaaliarvot), jos sinulla on olemassa oleva tyyliopas

</div>

## Ulkoasuasetusten avaaminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa) ja laajenna kohta **Verkkosivusto**.
2. Napsauta **Ulkoasu**.
3. **Sivuston tyylit** -sivu latautuu. **Teema, fontit ja alatunniste** -kortti näyttää vasemmalla **Tyyliasetukset**-luettelon ja oikealla esimerkkisivuston esikatselun. Sen alla ovat kortit **Ilmoitus ja widgetit** sekä **Uudelleenohjaukset ja analytiikka**.

## Väripaletti {#color-palette}

1. Napsauta Tyyliasetukset-paneelissa **Väripaletti**-kohtaa.
2. Näet **Perusvärit** (vaalea, korostus- ja tumma sävy) ja **Semanttiset värit** (Ensisijainen, Toissijainen, Onnistuminen, Varoitus ja Virhe).
3. Napsauta mitä tahansa väriruutua avataksesi värinvalitsimen. Valitse väri vetämällä valitsinta tai kirjoittamalla heksadesimaaliarvo.
4. **Väriyhdistelmien esikatselu** näyttää, miten valitsemasi värit toimivat yhdessä.
5. Käytä **Ehdotettuja paletteja** ottaaksesi nopeasti käyttöön valmiiksi suunnitellun värimaailman.
6. Kun olet tyytyväinen, napsauta **Tallenna paletti**.

## Typografia

1. Napsauta Tyyliasetukset-paneelissa **Fontit**-kohtaa.
2. Napsauta **Otsikkofontti**- tai **Leipätekstin fontti** -painiketta avataksesi fonttiselaimen. Voit hakea nimellä tai selata luokkia, kuten Serif, Sans Serif, Display, Käsinkirjoitus ja Monospace. Voit myös valita jonkin **Suositun fonttiyhdistelmän**.
3. Ota fonttivalinnat käyttöön napsauttamalla **Tallenna fontit**.
4. Säätääksesi otsikoiden 1–4 kokohierarkiaa napsauta Tyyliasetukset-paneelissa **Typografia-asteikko**. Hienosäädä kentillä **Tyyppiasteikon** kerroin, **Peruskoko** ja **Riviväli**, ja napsauta sitten **Tallenna typografia**.

## Väli

1. Napsauta Tyyliasetukset-paneelissa **Väliasteikko**-kohtaa.
2. Säädä välin arvoja väliltä erittäin pieni (Extra Small) – erittäin suuri (Extra Large). Käytännön esimerkit näyttävät, miten kukin arvo vaikuttaa asetteluun.
3. Ota arvot käyttöön koko sivustolla napsauttamalla **Tallenna väli**.

## Logo ja brändi {#logo-and-branding}

1. Napsauta Tyyliasetukset-paneelissa **Logo**-kohtaa.
2. Lataa **Logo vaalealla taustalla** ja **Logo tummalla taustalla**. Parhaan tuloksen saat käyttämällä kuvia, joissa on läpinäkyvä tausta ja kuvasuhde 4:1.
3. Lataa **Sosiaalisen median kuva** linkkien esikatselua varten ja **Favicon** selaimen välilehden kuvaketta varten.
4. Napsauta **Tallenna muutokset**. Ladatut kuvat eivät tallennu ennen tallennusta, joten jos yrität sulkea tai ladata selaimen välilehden uudelleen ensin, selain varoittaa tallentamattomista muutoksista.

:::tip
Parhaan tuloksen saat käyttämällä PNG-muotoista logoa, jossa on läpinäkyvä tausta. Näin logo näyttää hyvältä sekä vaaleilla että tummilla taustoilla sekä verkkosivustollasi että [mobiilisovelluksessa](../settings/mobile-app.md).
:::

## Navigointityylit

Mukauta verkkosivustosi navigointipalkin värejä sekä kiinteälle että läpinäkyvälle tilalle:

1. Napsauta Tyyliasetukset-paneelissa **Navigointi**-kohtaa
2. Määritä värit kohdille **Ylätunniste (kiinteä)** ja **Ylätunniste hero-osion päällä (läpinäkyvä)**
3. Ota navigointivärit käyttöön napsauttamalla **Tallenna navigointi**

Yksityiskohtaiset ohjeet: katso [Navigointityylit](./navigation-styles.md).

## Ilmoitukset ja widgetit

Sivuston widgetit näkyvät jokaisella sivullasi ja leijuvat sivun sisällön päällä:

- **Ilmoituspalkki** -- Suljettava palkki sivustosi yläosassa ajankohtaisille viesteille, kuten tulevalle tapahtumalle tai jumalanpalvelusmuutokselle.
- **Käynnistin** -- Leijuva painike, joka avaa pikavalikon, esimerkiksi linkit lahjoittamiseen, sisäänkirjautumiseen tai seurakuntatiedotteen katseluun.

1. Etsi Tyyliasetusten alapuolelta kortti **Ilmoitus ja widgetit**.
2. Ota käyttöön haluamasi widgetit ja määritä niiden teksti, linkit ja värit.
3. Napsauta **Tallenna**.

## Uudelleenohjaukset ja analytiikka

Kortti **Uudelleenohjaukset ja analytiikka** (Tyyliasetusten alapuolella) sisältää kaksi toisiinsa liittymätöntä, mutta usein tarvittavaa asetusta:

- **Analytiikka** -- Lisää **GA4-mittaustunnus** (muoto `G-XXXXXXXXXX`) seurataksesi verkkosivustosi kävijämääriä. Sama tunnus seuraa myös sivunäyttöjä kirkkosi B1-sovelluksessa (jäsenportaali osoitteessa `/mobile`, mukaan lukien asennettu sovellus). Näytöt merkitään `display_mode`-arvolla `installed` tai `browser`, jolloin voit erottaa asennetun sovelluksen käynnit selainkäynneistä Google Analyticsissa.
- **Uudelleenohjaukset** -- Yhdistä vanha URL-polku uuteen, jolloin siirrettyihin tai uudelleen nimettyihin sivuihin johtavat linkit toimivat edelleen eivätkä päädy virhesivulle (404). Syötä vanha **Mistä**-polku ja uusi **Mihin**-polku ja napsauta **Tallenna**. Uudelleenohjaus on myös etusijalla B1:n sisäänrakennettuihin sivuihin (`/sermons`, `/stream`, `/donate`, `/bible` ja `/votd`) nähden, joten voit ohjata tämän osoitteen muualle (esimerkiksi omalle saarnasivullesi tai YouTube-kanavallesi). Se ei korvaa samassa osoitteessa olevaa itse rakentamaasi sivua. Jos haluat uudelleenohjauksen toimivan, poista ensin kyseinen sivu.

## Mukautettu CSS ja JavaScript

1. Napsauta Tyyliasetukset-paneelissa **CSS ja Javascript**-kohtaa.
2. Lisää **Mukautettu CSS** ohittaaksesi oletustyylit edistynyttä muokkausta varten.
3. Lisää **Mukautettu HTML** seurantakoodeja tai muita komentosarjoja varten.
4. Käytä **Yleisiä JavaScript-esimerkkejä** -osiota katkelmiin, kuten Google Analytics -integraatioon.

:::warning
Mukautettu CSS on tehokas, mutta väärin käytettynä se voi rikkoa sivustosi asettelun. Useimmat seurakunnat saavuttavat haluamansa ilmeen sisäänrakennettujen väri-, fontti- ja väliasetusten avulla. Käytä mukautettua CSS:ää vain, jos hallitset verkkokehityksen.
:::

:::info
Sivustosi käyttää sisältöturvallisuuskäytäntöä (Content Security Policy), joka estää upotetut komentosarjat muista lähteistä. Tässä oleva **Mukautettu HTML** -kenttä ja yksittäisten sivujen [HTML-elementti](page-editor#using-the-html-element) ovat luotettuja poikkeuksia: tallentamasi koodi suoritetaan sellaisenaan, joten liitä komentosarjoja vain luotetuista lähteistä (analytiikkatagit, chat-widgetit ja vastaavat upotukset).
:::

## Teematyylit

Jos haluat nopean lähtökohdan, **Ehdotetut paletit** Väripaletti-osiossa tarjoavat valmiita teemoja, jotka asettavat yhdistelmävärit yhdellä napsautuksella. Voit aina hienosäätää yksittäisiä asetuksia teeman valitsemisen jälkeen.

## Seuraavat vaiheet

- [Sivujen hallinta](managing-pages) -- Rakenna ja järjestä verkkosivustosi sivut
- [Tiedostot](files) -- Lataa sivustosi mediatiedostot

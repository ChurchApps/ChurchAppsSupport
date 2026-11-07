---
title: "Lahjoituserät"
---

# Lahjoituserät

<div class="article-intro">

Erät ryhmittelevät lahjoituksesi yhteen, jotta niitä on helpompi seurata ja täsmäyttää. Tavallinen erä vastaa yhtä kokoelmaa, kuten sunnuntain kolehtia tai erityistilaisuutta. Erien käyttäminen auttaa pitämään tiedot järjestyksessä ja helpottaa sen varmistamista, että kirjanpitosi vastaa todellisia talletuksia.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Varmista, että olet [määrittänyt rahastosi](funds.md), jotta ne ovat käytettävissä lahjoituksia kirjatessasi
- Tarvitset oikeuden **Näytä lahjoitusyhteenvedot**, **Muokkaa lahjoituksia** tai **Syötä lahjoituksia** nähdäksesi Erät-sivun (katso [Kuka voi muuttaa erää](#who-can-change-a-batch))

</div>

## Erät-sivu

Kun siirryt kohtaan **Lahjoitukset > Erät**, näet luettelon eristäsi. Jokainen rivi näyttää:

- **Nimi** -- erälle antamasi nimi
- **Päivämäärä** -- kokoelman päivämäärä
- **Lahjoitukset** -- yksittäisten lahjoitusten määrä erässä
- **Yhteensä** -- yhteenlaskettu summa
- **Tila** -- **Avoin** tai **Suljettu** (katso [Erän sulkeminen ja uudelleen avaaminen](#closing-and-reopening-a-batch))

Listan yläpuolella vuosipainikkeet näyttävät vain yhden vuoden erät tai kaikki erät **Kaikki**-painikkeella. Yhden rivin yhteenveto näyttää näytettävien erien määrän, lahjojen määrän ja yhteissumman.

## Uuden erän luominen

1. Napsauta sivun yläosassa **Lisää erä**.
2. Kirjoita kuvaava nimi (esim. "Sunnuntain kolehti - 9. helmik.").
3. Valitse kokoelman päivämäärä.
4. Napsauta **Tallenna**.

Uusi erä ilmestyy luetteloon, ja voit lisätä siihen lahjoituksia.

## Erien käsittely

- **Näytä lahjoitukset** -- napsauta erän nimeä avataksesi sen ja nähdäksesi kaikki siihen kuuluvat yksittäiset lahjoitukset. Sieltä voit lisätä, muokata tai poistaa lahjoituksia tai napsauttaa **Tuo CSV** lisätäksesi monta lahjoitusta kerralla taulukkolaskennasta (katso [CSV-tiedoston lahjoitusten tuominen](recording-donations.md#importing-donations-from-a-csv-file)).
- **Muokkaa erän tietoja** -- napsauta erärivin **Muokkaa**-painiketta muuttaaksesi nimeä tai päivämäärää. Vain henkilöt, joilla on oikeus **Muokkaa lahjoituksia**, voivat poistaa erän.
- **Lajittele** -- käytä sarakeotsikoita lajitellaksesi erät nimen tai päivämäärän mukaan.
- **Vie** -- napsauta sivun yläosassa **Vie**-painiketta ladataksesi näytettävät erät taulukkona (CSV-muodossa).
- **Epäonnistuneet tapahtumat** -- jos maksupalveluntarjoajasi on ilmoittanut ongelmista, sivun yläosaan ilmestyy **Epäonnistuneet tapahtumat** -painike, jossa näkyy ratkaisemattomien tapahtumien määrä. Napsauta sitä näyttääksesi tai piilottaaksesi erien alla olevan tapahtumaluettelon.
- **Tuo Stripestä** -- napsauta sivun yläosassa **Tuo puuttuvat Stripe-tapahtumat** avataksesi [Stripe-tuonnin](stripe-import.md) työkalun. Painike näkyy vain, jos seurakuntasi lahjoituspalvelu on Stripe.

## Kuka kirjasi kunkin lahjan

Jokainen erään kirjattu lahja näyttää lahjoittajan nimen alla kentän **Kirjaaja** ja sen perässä henkilön nimen, joten näet, kuka lahjan kirjasi, ilman allekirjoituslomaketta. B1 tallentaa tiedon automaattisesti sisäänkirjautuneen henkilön mukaan, eikä lahjan myöhempi muokkaaminen muuta sitä. Lahjat, jotka tuotiin **Tuo CSV** -toiminnolla, näyttävät tuonnin suorittaneen henkilön.

Verkkolahjoitukset, [Stripe-tuonnin](stripe-import.md) työkalulla lisätyt lahjat ja ennen marraskuussa 2026 lisättyä ominaisuutta kirjatut lahjat eivät näytä nimeä.

## Erän sulkeminen ja uudelleen avaaminen

Kun erä on laskettu ja talletettu, sulje se, jotta sen lahjoitukset pysyvät täsmälleen samoina kuin sulkemishetkellä.

1. Avaa erä.
2. Napsauta sivun yläosassa **Sulje erä**.

Erän nimen vieressä oleva tilamerkki vaihtuu tilasta **Avoin** tilaan **Suljettu**, erä näyttää **Suljettu**-tilan Erät-sivun **Tila**-sarakkeessa, ja erän yläosassa oleva ilmoitus kertoo erän olevan suljettu. Suljetun erän lahjoituksia voivat edelleen katsella henkilöt, joilla on oikeus **Syötä lahjoituksia**, mutta he eivät voi lisätä, muokata tai poistaa sen lahjoituksia eivätkä muuttaa erän nimeä tai päivämäärää.

Tehdäksesi muutoksia uudelleen avaa erä ja napsauta **Avaa erä uudelleen**. Uudet erät ovat aina avoimia alussa.

:::info
Vain henkilöt, joilla on oikeus **Muokkaa lahjoituksia**, näkevät painikkeet **Sulje erä** ja **Avaa erä uudelleen**. He voivat myös muokata suljetun erän lahjoituksia, jos korjaus on tarpeen, ilman että erää avataan uudelleen.
:::

## Kuka voi muuttaa erää

Kaksi [käyttöoikeusroolia](../settings/roles-permissions.md) mahdollistavat erien käsittelyn:

- **Muokkaa lahjoituksia** -- täydet oikeudet: erien lisääminen ja poistaminen, niiden sulkeminen ja uudelleen avaaminen sekä minkä tahansa lahjoituksen lisääminen, muokkaaminen tai poistaminen erän ollessa avoin tai suljettu.
- **Syötä lahjoituksia** -- laskentatiimeille ja vapaaehtoisille, jotka kirjaavat kolehtia. He voivat lisätä eriä sekä lisätä, muokata tai poistaa lahjoituksia, mutta vain kun erä on avoin. He eivät voi poistaa eriä, sulkea tai avata niitä uudelleen, eivätkä muuttaa verkkolahjoituksina saapuneita lahjoituksia.

Henkilö, jolla on oikeus **Syötä lahjoituksia** mutta ei oikeutta **Näytä lahjoitusyhteenvedot**, näkee B1 Adminin valikossa kohdan **Lahjoitukset**, joka vie suoraan Erät-sivulle. **Yhteenveto**, **Rahastot**, **Kampanjat** ja **Lahjoitusselosteet** pysyvät heiltä piilossa. Jotta he voivat avata erän ja nähdä siinä olevat lahjoitukset, roolilla on oltava myös oikeus **Näytä lahjoitukset**.

:::tip
Yleinen asetelma on "Laskentatiimi"-rooli, jolla on oikeudet **Syötä lahjoituksia** ja **Näytä lahjoitukset**, sekä rahastonhoitaja, jolla on oikeus **Muokkaa lahjoituksia** ja joka sulkee kunkin erän sen jälkeen, kun talletus on täsmäytetty.
:::

## Erän tulostaminen

Avaa erä ja napsauta lahjoituslistan yläpuolella **Tulosta**, jotta saat paperikopion laskentatiimillesi tai talletustietojesi tueksi. Tulosteeseen kuuluu:

- Seurakuntasi kirjelomake -- logosi (**Vaalean taustan logo** kohdasta [Verkkosivusto > Ulkoasu](../website/appearance.md), jos olet ladannut sen) ja sen alla seurakuntasi nimi -- sekä erän nimi ja erän päivämäärä
- Kaikki erän lahjoitukset, joissa on lahjoittajan nimi, kirjaaja, tapa, muistiinpanot, päivämäärä ja summa (palautetut lahjat on yliviivattu ja merkitty palautetuiksi)
- **Rahastojen välisummat** -- kunkin rahaston saama yhteissumma erässä
- **Erän yhteissumma** -- koko erän yhteenlaskettu summa

**Tulosta**-painike näkyy vasta, kun erässä on vähintään yksi lahjoitus.

### Useiden erien tulostaminen kerralla

Tulostaaksesi kaikki tietyn ajanjakson erät yhdellä kertaa -- esimerkiksi kaikki viime kuukauden talletukset -- napsauta Erät-sivun yläosassa **Vie**-painikkeen vieressä olevaa **Tulosta**-painiketta. Avautuu **Tulosta erät** -sivu, jonka **Alkupäivä** ja **Loppupäivä** vastaavat näytöllä olevia eriä: 1. tammikuuta ja 31. joulukuuta valitsemasi vuoden väliltä tai varhaisimmasta ja myöhäisimmästä erän päivämäärästä, kun **Kaikki** on valittu. Voit muuttaa kumpaa tahansa päivämäärää valitaksesi toisen aikavälin.

Jokainen aikavälille osuva erä (myös alku- ja loppupäivä mukaan lukien) tulostuu päivämäärän mukaisessa järjestyksessä, yksi erä per sivu, samalla asettelulla kuin yksittäisen erän tuloste. Erät, joissa ei ole lahjoituksia, jätetään pois. Jos aikavälin erissä ei ole yhtään lahjoitusta, näet ilmoituksen "Ei lahjoituksia erillä tällä päivämääräjaksolla." Napsauta **Tulosta** avataksesi selaimen tulostusikkunan tai **Sulje** palataksesi erälistaan.

## Erän vieminen QuickBooks Onlineen

Avaa erä ja napsauta **Vie QuickBooksiin** ladataksesi erän kirjanpitotositteena, jonka QuickBooks Online voi tuoda (**Asetukset > Tuo tiedot > Kirjanpitotositteet**). Tiedosto sisältää yhden debet-kirjauksen tilille **Maksamattomat varat** erän yhteissummalle ja yhden kredit-kirjauksen rahastoa kohden, ja tilin nimenä on kunkin rahaston nimi. QuickBooks pyytää tuonnin aikana yhdistämään nämä nimet tilikarttaasi, joten nimeä rahastot samoin kuin kirjanpitäjäsi nimeää tulotilit, tai yhdistä ne kerran tuonnin yhteydessä.

:::tip
Nimeä erät johdonmukaisesti, jotta niitä on helppo löytää myöhemmin. Päivämäärän ja kokoelman tyypin lisääminen (esim. "Sunnuntai aamu - 2025-02-09") pitää luettelosi järjestyksessä, kun se kasvaa.
:::

## Seuraavat vaiheet

Kun sinulla on erä, katso [Lahjoitusten kirjaaminen](recording-donations.md), jossa kerrotaan, miten yksittäisiä lahjoituksia lisätään erään. Voit myös [tuoda Stripe-tapahtumia](stripe-import.md), jotta erät luodaan automaattisesti verkkolahjoituksista.

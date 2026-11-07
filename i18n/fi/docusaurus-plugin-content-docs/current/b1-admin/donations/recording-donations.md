---
title: "Lahjoitusten kirjaaminen"
description: "Kirjaa lahjoituksia B1 Adminissa: luo erä, syötä lahjat yksitellen, tuo CSV-tiedosto tai kirjaa yksi lahja lahjoittajan profiilista."
---

# Lahjoitusten kirjaaminen

<div class="article-intro">

Lahjoitusten kirjaaminen B1 Adminissa tehdään Erät-toiminnon kautta. Luot erän, joka edustaa yhtä kokoelmaa (esimerkiksi sunnuntain kolehti), ja lisäät siihen yksittäiset lahjoitukset. Näin lahjoitustietue pysyy järjestyksessä ja sen täsmäyttäminen on helppoa.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Luo [rahastot](funds.md), jotta voit kohdistaa lahjoitukset oikeisiin luokkiin
- Luo [erä](batches.md), johon kirjaat lahjoitukset, jotka olet syöttämässä
- Varmista, että lahjoittajat ovat [henkilöluettelossa](../people/adding-people.md), jotta voit hakea heidät lahjoituksia kirjatessasi
- Tarvitset oikeuden **Muokkaa lahjoituksia** tai oikeudet **Syötä lahjoituksia** ja **Näytä lahjoituksia** yhdessä, jotta voit kirjata lahjoituksia erään (katso [Kuka voi muuttaa erää](batches.md#who-can-change-a-batch))

</div>

## Erän luominen ja lahjoitusten lisääminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna kohta **Lahjoitukset** ja napsauta **Erät**.
2. Napsauta sivun yläosassa **Lisää erä**.
3. Kirjoita erälle nimi (esim. "Sunnuntain kolehti – 5. tammikuuta") ja valitse päivämäärä. Napsauta **Tallenna**.
4. Uusi erä näkyy luettelossa, ja siinä näkyvät nolla lahjoitusta ja 0,00 $.
5. Avaa erä napsauttamalla **erän nimeä**.

## Yksittäisten lahjoitusten kirjaaminen

1. Erän tietosivulla lahjoitusten syöttöpaneeli näkyy lahjoituslistan vieressä. Kohdassa **Valitse henkilö tai nimetön** kirjoita lahjoittajan nimi hakukenttään löytääksesi hänet tai napsauta **Nimetön**. (Kun napsautat sivun yläosassa **Lisää lahjoitus**, siirryt tähän paneeliin.)
2. Kun olet valinnut henkilön, lomakkeessa näkyvät kentät **Päivämäärä**, **Tapa** (Šekki, Käteinen, Kortti tai Luontoislahjoitus), **Rahasto**, **Muistiinpanot**, **Summa** ja **Šekin numero** (tai **Kortin viimeiset 4 numeroa** korttilahjoituksille, tai **Kohde** luontoislahjoituksen kuvaamiseen). Napsauta lahjoittajan nimen vieressä **Vaihda** valitaksesi toisen henkilön.
3. Täytä tiedot ja napsauta **Lisää lahjoitus** (tai paina Enter-näppäintä).
4. Lahjoitus lisätään lahjoituslistaan, ja lomake tyhjenee, jotta voit syöttää seuraavan.

:::info
Jos erä on [suljettu](batches.md#closing-and-reopening-a-batch), syöttöpaneeli ja **Muokkaa**-linkit ovat piilossa niiltä, joilla ei ole oikeutta **Muokkaa lahjoituksia**, ja erän yläosassa näkyy ilmoitus, että erä on suljettu. Pyydä jotakuta, jolla on oikeus **Muokkaa lahjoituksia**, avaamaan erä uudelleen.
:::

:::tip
Voit syöttää useita lahjoituksia peräkkäin pysymättä erän sivulla. Lomake tyhjenee jokaisen kirjauksen jälkeen, jolloin voit käydä läpi šekkipinon tai kirjekuoret nopeasti.
:::

## Lahjoitusten tuominen CSV-tiedostosta {#importing-donations-from-a-csv-file}

Jos lahjoitukset ovat jo taulukkolaskennassa, esimerkiksi toisesta lahjoitusjärjestelmästä viedyssä tiedostossa tai laskentatiimin laskentalomakkeessa, voit tuoda ne erään sen sijaan, että kirjoittaisit jokaisen erikseen.

1. Avaa erä ja napsauta sivun yläosassa **Tuo CSV**. (Painike näkyy, kun voit muokata erää ja seurakunnallasi on vähintään yksi [rahasto](funds.md).)
2. Napsauta **Valitse CSV-tiedosto** ja valitse tiedostosi. Tiedostossa pitää olla otsikkorivi, ja sarakkeet voivat olla missä järjestyksessä tahansa:
   - **Summa** (pakollinen; toimii myös `Total`) -- Valuuttamerkit ja pilkut ohitetaan, joten `1 250,00 $` käy. Summan on oltava suurempi kuin nolla.
   - **Päivämäärä** -- Käytä muotoa kuten `2026-10-25` tai `25.10.2026`. Jos kenttä on tyhjä, käytetään erän päivämäärää.
   - **Rahasto** -- Rahaston nimi, joka täsmätään kirjainkokoa huomioimatta. Jos kenttä on tyhjä, käytetään ensimmäistä rahastoasi.
   - **Tapa** -- **Šekki**, **Käteinen**, **Kortti** tai **Luontoislahjoitus**. Jos kenttä on tyhjä, käytetään **Šekki**.
   - **Šekin numero** -- Šekin numero (tai muu maksutieto).
   - **Muistiinpanot**
   - **Sähköposti**, **Nimi** tai **Etunimi** ja **Sukunimi** -- Käytetään lahjoittajan yhdistämiseen tietokannassasi olevaan henkilöön. Nimi muodossa "Virtanen, Matti" luetaan muodossa "Matti Virtanen".
3. Tarkista esikatselu. Jokainen rivi näyttää rivinumeron, tiedostossa olevan lahjoittajan, **Vastaavuuden**, rahaston ja summan:
   - Henkilön nimi tarkoittaa, että lahjoittaja on löydetty. B1 täsmää ensin sähköpostiosoitteen ja sitten tarkan nimen perusteella, ja vain jos täsmälleen yksi henkilö sopii.
   - **Ei löytynyt – nimetön** tarkoittaa, että yksiselitteistä vastaavuutta ei löytynyt. Lahjoitus tuodaan nimettömänä, ja muistiinpanoihin lisätään "Tuotu nimellä:" ja lahjoittajan nimi, jotta voit määrittää sen myöhemmin.
   - Punainen viesti, kuten **Virheellinen summa**, **Tuntematon rahasto**, **Tuntematon tapa** tai **Virheellinen päivämäärä**, tarkoittaa, että rivi ohitetaan. Korjaa tiedosto ja valitse se uudelleen, jotta rivi sisältyy tuontiin.
4. Napsauta **Tuo** (painike näyttää, kuinka monta riviä tuodaan). Lahjoitukset lisätään erään.

:::tip
Tuonnin jälkeen napsauta nimettömän lahjoituksen kohdalla **Muokkaa** ja valitse oikea henkilö. Muistiinpano "Tuotu nimellä:" kertoo, kenen tiedostossa sanottiin lahjoituksen tulleen.
:::

## Lahjoituksen kirjaaminen henkilön tietueesta

Voit kirjata yksittäisen lahjoituksen avaamatta erää. Avaa lahjoittajan tietue kohdasta **Henkilöt** ja napsauta **Kirjaa lahjoitus** (lahjoitusyhteenvedossa tai henkilön lahjoitusnäkymässä).

1. Aseta **Päivämäärä** ja **Summa**.
2. Valitse **Rahasto** ja **Tapa** (Šekki, Käteinen, Kortti tai Luontoislahjoitus) ja anna tarvittaessa **Šekin numero**, **Kortin viimeiset 4 numeroa** tai **Kohde** (luontoislahjoituksille).
3. Lisää tarvittaessa **Muistiinpanot** ja napsauta **Tallenna**.

Lahjoitus tallennetaan kyseisen päivämäärän erään. Jos erää ei ole vielä olemassa, se luodaan automaattisesti ja nimetään päivämäärän mukaan.

## Lahjoituksen jakaminen useammalle rahastolle

Joskus yksi lahjoittaja antaa yhdessä maksutapahtumassa useammalle rahastolle. Käsittele tämä seuraavasti:

1. Syöttöpaneelin alapuolella napsauta **koko lahjoituseditorin** linkkiä (tai napsauta olemassa olevan lahjoitusrivin **Muokkaa**-painiketta).
2. Lisää koko editorissa summat eri rahastoille. Kokonaissumma lasketaan automaattisesti rahastokohtaisista summista.
3. Päivitä lahjoitus napsauttamalla **Tallenna**.

:::info
Lahjoituksen jakaminen rahastojen kesken on tavallista, kun lahjoittaja kirjoittaa yhden šekin useaan tarkoitukseen, kuten yleisrahastoon ja lähetystyöhön.
:::

## Lahjoitusten muokkaaminen ja poistaminen

Jos haluat muokata lahjoitusta, napsauta erässä sen rivin **Muokkaa**-painiketta. Voit muuttaa päivämäärää, summaa, rahastoa, maksutapaa (Šekki, Käteinen, Kortti tai Luontoislahjoitus) tai mitä tahansa muuta tietoa. Luontoislahjoituksen kohdalla editori nimeää tietokentän **Kohde**-kentäksi, jotta voit kuvata, mitä lahjoitettiin. Kun olet valmis, napsauta **Tallenna**.

:::tip
Erän nimen alla sivun yläosassa oleva rivi päivittyy automaattisesti näyttämään erän päivämäärän, lahjoitusten määrän ja yhteissumman, kun lisäät tai muokkaat kirjauksia. Käytä sitä täsmäyttääksesi tiedot pankkitallettesi kanssa.
:::

## Lahjoituksen hyvittäminen

Jos lahjoittajalta veloitettiin virheellisesti tai hän pyytää rahojaan takaisin, voit hyvittää valmiin lahjoituksen suoraan sen muokkausnäkymästä. Sinun ei tarvitse mennä maksupalveluntarjoajasi hallintapaneeliin.

1. Avaa lahjoitus ja napsauta **Muokkaa**.
2. Napsauta lomakkeen alareunassa Poista-painikkeen vieressä olevaa **Hyvitä**-painiketta.
3. Vahvista valintaikkuna: "Hyvitetäänkö tämä lahjoitus kokonaisuudessaan maksupalvelun kautta? Tätä ei voi perua."

Lahjoitus hyvitetään kokonaisuudessaan alkuperäisen maksupalvelun kautta, ja se merkitään lahjoituslistoissasi **Hyvitetty**-tilaan.

:::warning
Hyvityksiä voi tehdä vain kokonaisina -- B1 Administa ei voi hyvittää osaa summasta. Hyvitystä ei myöskään voi perua, kun se on vahvistettu.
:::

:::info
**Hyvitä**-painike näkyy vain lahjoituksille, jotka on maksettu verkossa (niillä on maksupalvelun tapahtuma) ja jotka ovat yhä **Valmis**-tilassa. Manuaalisesti kirjatuilla lahjoituksilla (käteinen, šekki) ei ole maksupalvelun tapahtumaa, joten ne on muokattava tai poistettava.
:::

## Yhden lahjoituksen kuitin tulostaminen

Kun joku antaa šekin, maksaa tapahtuman tai t-paidan tai vierailevan järjestön tuoma lahjoitus saapuu, voit tulostaa kuitin vain kyseisestä lahjoituksesta koko erän tai vuosiyhteenvedon sijaan.

1. Avaa lahjoituksen sisältävä erä.
2. Napsauta lahjoituksen rivillä **Muokkaa**-painikkeen vieressä **Kuitti**-painiketta. Voit myös napsauttaa **Kuitti**-painiketta Muokkaa lahjoitusta -lomakkeen alareunassa.
3. Napsauta **Tulosta** tai **Sulje** palataksesi takaisin.

Kuitti käyttää samaa asettelua kuin lahjoitusyhteenveto: seurakuntasi ja lahjoittaja (tai "Nimetön"), lahjoituksen päivämäärä ja tapa, jokainen rahasto ja summa, muistiinpano, lahjoitusmuistiinpanosi sekä virallinen kuittilohko, jos olet määrittänyt **Yhteenvedon muodon** (katso [Lahjoitusyhteenvedot](giving-statements.md)). Lohkon kuittinumero on lahjoituksen tunnus.

:::info
Teksti "ei tavaroita eikä palveluita" tulostuu vain, kun kaikki lahjoituksen rahastot on merkitty verovähennyskelpoisiksi. Jos osa lahjoituksesta on mennyt rahastolle, joka ei ole verovähennyskelpoinen, kuten tapahtumamaksu tai ostos, kuittiin ei tulosteta tätä tekstiä, jotta se näyttää maksulta eikä hyväntekeväisyyslahjoitukselta.
:::

:::tip
Verkkolahjoittajat saavat jo automaattisen kiitossähköpostin, joten kuitti on pääasiassa hyödyllinen käsin kirjatuille lahjoituksille.
:::

## Seuraavat vaiheet

- Tarkista kirjaukset [Lahjoitusraporttien](donation-reports.md) avulla varmistaaksesi, että tiedot ovat oikein
- Luo vuoden lopussa [Lahjoitusyhteenvedot](giving-statements.md) lahjoittajillesi

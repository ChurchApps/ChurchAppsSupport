---
title: "Check-In -tarrakilpen suunnittelu"
---

# Check-In -tarrakilpen suunnittelu

<div class="article-intro">

Tarrakilpen suunnittelutyökalun avulla voit luoda ja muokata nimilappu- ja noutolappupohjia, jotka tulostuvat, kun perheet kirjaavat lapsensa sisään. Voit hallita tarkasti, mitä tietoja kullakin tarralla näkyy, mihin ne sijoitetaan ja miltä ne näyttävät.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Ota käyttöön [Attendance](setup) ja määritä vähintään yksi palveluaika, jolle sisäänkirjaus on käytössä
- Ota käyttöön [Check-In](check-in), jotta tarrat tulostuvat
- Tarvitset ylläpitäjän käyttöoikeudet Attendance-osioon

</div>

## Tarrakilpen suunnittelun avaaminen

Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna **Mobile**-kohta ja valitse **B1 CheckIn**. Napsauta sitten Check-in Labels -kortissa **Design Labels** -painiketta. Näet luettelon tallentamistasi tarrapohjista, jaoteltuina tyypin mukaan: **Nametag** ja **Pickup Slip**.

## Tarratyypit

- **Nametag** — tulostetaan ja kiinnitetään lapseen. Yleensä sisältää lapsen nimen, hänen luokkansa tai istuntonsa sekä turvakoodin.
- **Pickup Slip** — annetaan vanhemmalle tai huoltajalle. Yleensä sisältää turvakoodin ja luettelon lapsista, jotka on kirjattu sisään.

B1 tarjoaa valmiiksi oletusnimilapun ja oletusnoutolapun pohjan, joka on mitoitettu tavallisille 3,5 × 1,1 tuuman lämpötarroille.

## Tarrapohjan luominen

1. Napsauta **Add** ja valitse lähtökohta valikosta: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** tai **Blank**.
2. Uusi pohja avautuu tarrojen muokkausnäkymään.

### Tarrojen muokkausnäkymä

Muokkausnäkymä näyttää tarran esikatselun määritetyssä koossa. Vasemmalla paneelilla voit määrittää:

- **Name** — pohjan nimi (vain omaa käyttöäsi varten)
- **Label Type** — Nametag tai Pickup Slip
- **Width / Height** — tarran koko tuumina

### Lohkojen lisääminen

Tarra koostuu lohkoista eli yksittäisistä sisältöelementeistä, jotka sijoitetaan tarran alueelle. Lisää uusi lohko napsauttamalla **Add Block** ja valitse sen tyyppi:

- **Field** — hakee tietoarvon tulostushetkellä:
  - `person.displayName` — henkilön koko nimi
  - `sessions` — palvelu tai luokka, johon hänet on kirjattu sisään
  - `securityCode` — satunnaisesti luotu noutoturvakoodi
  - `children` — lasten luettelo (noutolappuja varten)
  - `person.nametagNotes` — henkilön tietueen erityismerkinnät
  - `person.isBirthdayWeek` — tosi, jos henkilön syntymäpäivä (kuukausi ja päivä) on enintään 3 päivää ennen tai jälkeen sisäänkirjauspäivän
  - `campus` — seurakunnan kampuksen nimi
- **Text** — itse kirjoittamasi kiinteä teksti (otsikoihin, nimiöihin tai ohjeisiin)
- **Barcode** — viivakoodi, joka koodaa turvakoodin

### Lohkojen sijoittaminen

Jokaisella lohkolla on kentät **X**, **Y**, **Width** ja **Height**, jotka ilmaistaan prosentteina tarran alueesta (0–100). Säädä niitä sijoittaaksesi sisällön tarkasti. Voit myös määrittää:

- **Font Size** — tekstin koko pisteinä
- **Bold** — lihavoinnin käyttö päälle tai pois
- **Align** — tekstin tasaus: vasen, keskitetty tai oikea
- **Condition** — piilota lohko valinnaisesti, jos kenttä on tyhjä (esimerkiksi näytä nametagNotes vain, jos siinä on arvo). Tämä toimii myös `person.isBirthdayWeek`-kentän kanssa: voit näyttää syntymäpäiväkuvan tai -tekstin vain nimilapuissa lapsille, joiden syntymäpäivä on lähellä sisäänkirjauspäivää.

### Tallentaminen

Napsauta **Save** tallentaaksesi pohjan. Päivitettyä pohjaa käytetään, kun tarrat seuraavan kerran tulostetaan B1 Checkinissä.

## Pohjien järjestäminen uudelleen

Jos sinulla on useita nimilappu- tai noutolappupohjia, B1 Checkin käyttää oletuksena luettelon ensimmäistä pohjaa. Voit järjestää pohjat uudelleen vetämällä niitä.

## Pohjan poistaminen

Napsauta minkä tahansa pohjarivin roskakorikuvaketta ja vahvista poisto. Jos poistat viimeisen tietyntyyppisen pohjan, palautetaan sisäänrakennettu oletuspohja.

:::tip
Tee testitulostus pohjan muokkaamisen jälkeen varmistaaksesi, että asettelu näyttää oikealta ennen seuraavaa palvelua.
:::

## Aiheeseen liittyvät artikkelit

- [Check-In Setup](setup) — palveluiden ja ryhmien määrittäminen sisäänkirjausta varten
- [Completing Check-In](check-in) — perheiden sisäänkirjausprosessi
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/) — Checkin-päätesovellus

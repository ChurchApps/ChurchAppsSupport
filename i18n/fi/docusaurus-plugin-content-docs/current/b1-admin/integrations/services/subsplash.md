---
title: "Subsplash"
description: "Yhdistä Subsplashin lahjoitukset, uudet henkilöt ja lomakevastaukset B1:een Zapierilla, jotta lahjat ja profiilit siirtyvät automaattisesti B1 Adminiin."
---

# Subsplash

<div class="article-intro">

Jos käytät Subsplashia kirkkosovelluksessasi, lahjoituksiin tai lomakkeisiin, mutta haluat B1:n olevan ensisijainen järjestelmä ihmisille ja lahjoituksille, Subsplashin Zapier-sovellus voi siirtää lahjoitukset, uudet profiilit ja lomakevastaukset B1:een reaaliajassa. Huomaa, että Subsplashin Zapier-sovellus toimii tällä hetkellä **vain laukaisimilla** — yhteys on yksisuuntainen (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Subsplash-tili tasolla, joka sisältää **API + Zapier** -käytön (tarkista asia Subsplashin Client Success Managerilta — nämä ominaisuudet on sidottu tasoon)
- [Zapier](https://zapier.com) -tili
- B1Admin-käyttäjä, jolla on **Edit Settings** -oikeus

</div>

## Mitä voit yhdistää

Kaikki alla olevat laukaisimet ovat Subsplashin. Toiminnot ovat B1:n.

| Subsplashin laukaisin | B1-toiminto |
|---|---|
| New Donation | Etsi henkilö → Lisää lahjoitus (luo henkilö, jos sitä ei ole) |
| New Pledge | Lisää lahjoitus (kentässä `notes` = "Lupaus: …") |
| New Person Created | Luo henkilö |
| Person Updated Profile | (ei suoraa B1-toimintoa — kirjaa Google Sheetiin manuaalista tarkistusta varten) |
| New Form Response | Luo henkilö + (valinnaisesti) lisää ryhmän jäsen lomakkeen perusteella |

Subsplashin sovellus tukee tällä hetkellä vain suuntaa Subsplash → B1.

## Asennus

### 1. Luo B1-API-avain

B1Adminissa: **Settings → Developer → API Keys → New API Key**. Käyttöoikeudet:

- `people:read` — hakee lahjoittajan sähköpostin perusteella
- `people:write` — luo henkilön, jos häntä ei ole
- `donations:write` — kirjaa lahjoituksen
- (`settings:write` ei tarvita — tässä laukaisimen omistaa Subsplash, ei B1.)

### 2. Yhdistä Subsplash Zapieriin

Noudata [Subsplashin Zapier-integraation ohjetta](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash luo Subsplash-hallintapaneelissa API-tunnuksen, jolla Zapier todentaa laukaisimen puolen.

### 3. Rakenna "lahjoituksen kirjaus" -Zap

1. **Laukaisin** — Subsplash: New Donation
2. **Toiminto** — B1.church: Find Person (sähköpostin perusteella)
3. **Suodatin / Polku** — haarauta "person found" -ehdon mukaan:
   - **Löytyi:** B1.church: Add Donation. Yhdistä määrä, päivämäärä, rahasto, tapa = "Online" ja notes = Subsplashin tapahtuman tunnus.
   - **Ei löytynyt:** B1.church: Create Person → B1.church: Add Donation (käyttäen juuri luodun henkilön tunnusta).

Ota Zap käyttöön. Tulevat Subsplash-lahjoitukset siirtyvät **B1Adminin → Donations** -kohtaan muutamassa sekunnissa.

## Yleisiä reseptejä

### Lähetä kiitos, kun ensimmäinen lahjoitus saapuu

- **Laukaisin** — Subsplash: New Donation
- **Toiminto** — Suodatus Zapierilla: jatka vain, jos kyseessä on lahjoittajan ensimmäinen lahjoitus (käytä *Lookup Table* -taulukkoa lahjoittajan sähköpostiosoitteelle Google Sheetiä vastaan, jossa on aiemmat lahjoittajat, tai Zapierin *Paths*-vaihetta lahjoittajan luontipäivän perusteella)
- **Toiminto** — Mailchimp / SMTP / SendGrid: lähetä ensimmäisen lahjoituksen kiitosviesti
- **Toiminto** — B1.church: Add Donation (normaalisti)

### Erota lupaukset tavallisesta lahjoitusvirrasta

- **Laukaisin** — Subsplash: New Pledge
- **Toiminto** — B1.church: Add Donation, jossa `notes = "Pledge — Subsplash"` ja rahasto nimeltä `Pledges` (erillään toimintarahastostasi), jotta voit raportoida lupaukset erikseen kohdassa **B1Admin → Donations → Summary**.

### Synkronoi uudet sovelluskäyttäjät B1-henkilöiksi

- **Laukaisin** — Subsplash: New Person Created
- **Toiminto** — B1.church: Create Person, täytä nimi, sähköposti ja puhelin. Merkitse henkilö B1:ssä lisäämällä hänet ryhmään "Subsplash-sovelluskäyttäjät".

## Rajoitukset ja huomautuksia

- **Subsplashin Zapier-sovellus toimii vain laukaisimilla.** Jos haluat, että B1:n puolen muutokset siirtyvät myös Subsplashiin (esimerkiksi uusi B1-henkilö myös Subsplashiin), sinun pitää rakentaa silta B1:n Zapier-sovelluksen laukaisimista, jotka kutsuvat Subsplashin REST API:a mukautetulla *Webhooks by Zapier — POST* -toiminnolla. Tämä on mukautettu integraatio, ei valmis resepti.
- **API-käyttö on sidottu tasoon.** Jos Zapier-yhteys epäonnistuu virheeseen `403 Forbidden`, Subsplash-tasosi ei todennäköisesti sisällä API-käyttöä — ota yhteyttä Client Success Manageriisi.
- **Rahastojen yhdistäminen on manuaalista.** Subsplash välittää kampanjan tai kategorian nimen, mutta B1 tarvitsee numeerisen rahastotunnuksen. Joko kovakoodaa rahasto Zapiin tai ylläpidä Zapierin *Lookup Table* -taulukkoa, joka yhdistää Subsplash-kampanjat B1-rahastoihin.

## Vianmääritys

- **Mikään laukaisin ei käynnisty lahjoituksen jälkeen** — tarkista Subsplashin Zapier-hallintapaneelista, että yhteys näkyy yhä tilassa *Connected*. Jos API-tunnusta on vaihdettu Subsplashin puolella, Zap pysähtyy hiljaa; yhdistä uudelleen.
- **B1:n *Add Donation* epäonnistuu virheeseen 422** — useimmiten `fundId` puuttuu tai on tunnistamaton. Listaa rahastosi kohdassa **B1Admin → Donations → Funds** ja kopioi täsmällinen tunnus Zap-vaiheeseen.
- **Ensimmäinen lahjoitus laukaisee kahdesti** — Subsplash lähettää laukaisimen joskus uudelleen, jos Zapier ei saanut kuittausta. Lisää *Filter by Zapier* lahjoitustunnuksen perusteella (Subsplash lähettää sen datassa), jotta kaksoiskappaleet poistuvat.

## Katso myös

- [Donorbox](./donorbox.md) — sama reseptirakenne, eri lahjoitusalusta
- [Zapier (yleiskatsaus)](../zapier.md) — B1:n puoli jokaisesta Zapier-reseptistä
- [Subsplashin Zapier-integraation ohje](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplashin dokumentaatio)

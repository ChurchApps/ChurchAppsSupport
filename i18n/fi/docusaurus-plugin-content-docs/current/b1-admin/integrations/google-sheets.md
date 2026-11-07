---
title: "Google Sheets"
description: "Yhdistä B1 Admin Google Sheetsiin B1 Export -lisäosalla ja hae People-, Donations-, Groups- ja Attendance-tiedot taulukkovälilehdille tarpeen mukaan."
---

# Google Sheets

<div class="article-intro">

**B1 Export** on B1.churchin virallinen Google Sheets -lisäosa. Se lisää sivupalkin mihin tahansa laskentataulukkoon, joka vie kirkkosi B1-tiedot Henkilöt-, Lahjoitukset-, Ryhmät- tai Läsnäolo-välilehtiin nimettyinä. Vienti käynnistyy pyynnöstä yhdellä napsautuksella. Lisäosa toimii kokonaan käyttäjän Google-tilin sisällä, eikä sillä ole yhteyttä ChurchAppsin palvelimiin muuten kuin kunkin viennin tekemien vain-luku-API-kutsujen kautta.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Google-tili, jolla on muokkausoikeus laskentataulukkoon, johon haluat viedä tiedot
- Kirkon ylläpitäjä (tai henkilö, jolla on lukuoikeus vietäviin tietoihin), joka voi luoda B1 API -avaimen
- B1 Export -lisäosa asennettuna Google Workspace Marketplacesta

</div>

## Mitä se vie

| Valikon kohta | Taulukon välilehti | Tiedot |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Jokainen vienti **korvaa** nimetyn välilehden sisällön. Viennin uudelleen suorittaminen antaa tuoreen tilannekuvan eikä lisää rivejä loppuun. Laskentataulukon muut välilehdet eivät muutu.

## Asennus

### 1. Luo B1 API -avain oikeilla käyttöoikeuksilla

1. Siirry B1Adminissa kohtaan **Asetukset → Kehittäjä → API Keys**.
2. Valitse **New API Key**, nimeä avain "Sheets Export" ja anna **lukuoikeudet** niille tiedoille, joita aiot viedä:
   - `people:read` Henkilöt-vientiä varten
   - `donations:read` Lahjoituksille
   - `groups:read` Ryhmille
   - `attendance:read` Läsnäololle
3. Pelkkiin vientöihin tarkoitettu avain **ei** tarvitse `settings:write`-oikeutta. Se on tarkoitettu vain webhookeja rekisteröiville liittimille (Zapier / Make). Pidä tämä avain mahdollisimman kapeana.
4. Tallenna ja kopioi `cak_…`-avain.

### 2. Asenna lisäosa

1. Avaa laskentataulukko, johon haluat viedä tiedot.
2. Valitse **Laajennukset → Lisäosat → Hae lisäosia**.
3. Hae **B1 Export** ja asenna se. Google pyytää lupaa käyttää taulukoitasi ja ulkoisia HTTP-yhteyksiä, jotta lisäosa voi kutsua B1 API:a.

Asennuksen jälkeen **B1 Export** näkyy **Laajennukset**-valikossa jokaisessa laskentataulukossa, jonka avaat tällä Google-tilillä.

### 3. Yhdistä avain

1. Valitse **Laajennukset → B1 Export → Connect…** (tai **B1 Export → Connect…** valikkopalkista ensimmäisen avauksen jälkeen).
2. Liitä API-avain sivupalkkiin, jätä Base URL arvoon `https://api.churchapps.org` (ellet testaa staging-ympäristöä vastaan) ja valitse **Save**.
3. Valitse **Test Connection**. Vihreä "Connection OK" vahvistaa, että avain toimii.

Avain tallennetaan **käyttäjäkohtaisiin ominaisuuksiin** (`PropertiesService.getUserProperties()`). Se liittyy Google-tiliisi, sitä ei kirjoiteta laskentataulukkoon, eikä laskentataulukon muut muokkaajat näe sitä koskaan.

## Viennin suorittaminen

Voit toimia jollakin seuraavista tavoista:

- **Valikosta:** **Laajennukset → B1 Export → Export People** (tai Donations / Groups / Attendance)
- **Sivupalkista:** avaa sivupalkki (Connect…) ja valitse sopiva tietojoukon painike

Ilmoitus kertoo, kun vienti on valmis: "_N_ row(s) written to 'B1 People'."

## Raporttien rakentaminen viennin päälle

Viedyt välilehdet ovat tavallista Google Sheets -dataa. Voit rakentaa omat analyysit viittaamalla niihin:

- **Yhteenvetovälilehti**, jossa `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` laskee yhteen korttilahjoitukset
- **Suodatettu näkymä** pelkistä jäsenistä: `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- **Kaavio** läsnäolotrendeistä, joka hakee tietonsa välilehdeltä `B1 Attendance`

Viennin uudelleen suorittaminen päivittää taustalla olevan välilehden, ja kaavasi päivittyvät automaattisesti.

## Toistuvien vientien ajastaminen

Lisäosa toimii oletuksena pyynnöstä. Viikoittaisia tai kuukausittaisia vientejä varten käytä Apps Scriptin sisäänrakennettuja ajastettuja triggereitä:

1. Valitse laskentataulukossa **Laajennukset → Apps Script**. Tämä avaa lisäosan sidotun skriptin.
2. Napsauta vasemman sivupalkin **⏰ Triggers** -kuvaketta.
3. Valitse **Add Trigger** funktiolle `exportPeople` (tai mille tahansa vientifunktiolle). Valitse *Time-driven*, *Week timer* ja esimerkiksi *Every Monday 6am*.

Vienti suoritetaan taustalla Google-tilisi alla. Jos API-avain kierrätetään tai mitätöidään, trigger lähettää sinulle sähköpostin seuraavan epäonnistumisen yhteydessä.

## Käyttöoikeudet ja yksityisyys

- Lisäosa pyytää vain `spreadsheets.currentonly`-oikeuden (se voi koskea vain laskentataulukkoa, jonka se on avannut) ja `script.external_request`-oikeuden (jotta `UrlFetchApp` voi kutsua B1 API:a). Se **ei** näe Drivea, Gmailia tai muita Google-tietojasi.
- B1 API -avain on tallennettu käyttäjäkohtaisesti. Saman laskentataulukon muut muokkaajat eivät näe sitä.
- Kaikki B1 API -kutsut tehdään HTTPS-yhteyden yli käyttäen `Authorization: Bearer cak_…`-otsaketta.

## Vianmääritys

- **"No API key set"**: avaa **Laajennukset → B1 Export → Connect…** ja liitä avain.
- **"B1 rejected the API key (401)"**: avain on mitätöity tai se on väärin. Luo uusi avain ja liitä se uudelleen.
- **"This API key lacks permission for /giving/donations (403)"**: avaimella ei ole oikeutta `donations:read`. Päivitä avaimen käyttöoikeudet B1Adminissa.
- **Taulukko ei päivity** vientiajon jälkeen: varmista, että katsot *oikeaa* välilehden nimeä (`B1 People` jne.). Vienti luo välilehden, jos sitä ei ole.
- **"Quota exceeded"**: Apps Script asettaa `UrlFetchApp`-kutsuille käyttäjäkohtaisia päivittäisiä rajoja (tyypillisesti tuhansia kutsuja päivässä). Suuri kirkko, jolla on paljon tietueita, voi joutua jakamaan viennit useammalle päivälle tai käyttämään [Makea](./make.md) tai mukautettua integraatiota suurimittaiseen synkronointiin.

## Lisäosan mukauttaminen

Lisäosa on avointa lähdekoodia. Apps Script -projekti sijaitsee repossa `B1Integrations/GoogleSheetsAddon/`. Jos haluat sarakkeen, jota emme vie, lisätietojoukon tai erilaisen tulostusmuodon, avaa siellä issue tai pull request.

## Katso myös

- [Zapier](./zapier.md): reaaliaikaiseen synkronointiin pyynnöstä tapahtuvan viennin sijaan
- [Make](./make.md): synkronointiin monimutkaisemmilla muunnoksilla
- [API-avaimet (kehittäjäviite)](/docs/developer/api/api-keys)

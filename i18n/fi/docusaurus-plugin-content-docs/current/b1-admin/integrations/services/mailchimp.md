---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Pidä Mailchimp-yleisö automaattisesti synkronoituna B1:n kanssa: ihmiset siirtyvät yleisöön nimensä, sähköpostinsa ja puhelinnumeronsa kanssa, ryhmä- ja listajäsenyydet muuttuvat Mailchimp-tunnisteiksi, ja poistetut henkilöt arkistoidaan. Synkronointi on rakennettu B1:een. Mukana ei ole kolmannen osapuolen palvelua eikä tehtäväkohtaista laskutusta, ja muutokset siirtyvät lähes reaaliajassa eikä yöllisen aikataulun mukaan.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Mailchimp](https://mailchimp.com)-tili, jossa on yleisö, jota haluat B1:n hallitsevan
- Mailchimpin **API-avain** (Mailchimp: profiilikuvake → **Tili ja laskutus → Lisäominaisuudet → API-avaimet**)
- **Yleisö-ID** (Mailchimp: **Yleisö → Asetukset → Yleisön nimi ja oletukset**)
- B1Admin-käyttäjä, jolla on **Muokkaa asetuksia** -oikeus

</div>

## Mitä synkronoituu

| B1-muutos | Mailchimpin vaikutus |
|---|---|
| Henkilö lisätty tai päivitetty | Tilaaja lisätty tai päivitetty (etunimi, sukunimi, puhelin; uudet tilaajat saapuvat tilassa `subscribed`) |
| Henkilö poistettu (tai GDPR-poisto) | Tilaaja arkistoidaan |
| Henkilö liittyy ryhmään | Ryhmän mukaan nimetty tunniste lisätään |
| Henkilö poistuu ryhmästä | Tämä tunniste poistetaan |
| Henkilö siirtyy tallennettuun listaan | Listan mukaan nimetty tunniste lisätään |
| Henkilö poistuu tallennetusta listasta | Tämä tunniste poistetaan |

**Tallennetut listat ovat yleensä parempi tunnisteiden lähde.** B1:n [tallennettu lista](/docs/b1-admin/people/lists) on sääntöihin perustuva yleisö, joka arvioi itsensä uudelleen. Esimerkkejä ovat "kaikki Pohjoisen kampuksen jäsenet" tai "jäsenet, jotka ovat tilanneet pastoraalisia sähköposteja". Ohjaa Mailchimp-segmenttisi listatunnisteisiin, jolloin synkronointi pitää ne ajan tasalla. Käytä ryhmätunnisteita tiimikohtaisiin lähetyksiin.

Synkronointi on **yksisuuntainen** (B1 → Mailchimp) ja koskee vain Mailchimpin vakiokenttiä. Se ei siis voi olla ristiriidassa Mailchimpissä hallitsemiesi yhdistelykenttien tai segmenttien kanssa.

## Asetukset

1. Siirry B1Adminissa kohtaan **Asetukset → Kehittäjä → Webhookit → Uusi Webhook**.
2. Aseta **Liitintyypiksi** **Mailchimp**.
3. Liitä **Mailchimp-API-avain** ja **Yleisö-ID**. Avain tallennetaan salattuna, eikä sitä näytetä enää myöhemmin.
4. Olennaiset tapahtumat on valittu valmiiksi. Poista valinta niistä, joita et halua. Esimerkiksi voit pitää henkilötapahtumat päällä ja ohittaa ryhmätunnisteet.
5. Tallenna. Ennen hyväksymistä B1 vahvistaa avaimen ja yleisön Mailchimpiä vastaan. Kirjoitusvirhe epäonnistuu heti ja kertoo syyn.

Voit käyttää **Lähetä testi** -painiketta milloin tahansa yhteyden uudelleen vahvistamiseen. Jokainen synkronointiyritys kirjataan webhookin toimitushistoriaan Mailchimpin todellisen vastauksen kanssa. Epäonnistuneet toimitukset yrittävät uudelleen viivästyen noin viiden päivän ajan.

## Alkutuonti

Liitin synkronoi *muutokset* siitä hetkestä lähtien, kun se on päällä. Se ei täydennä olemassa olevaa hakemistoasi taaksepäin. Asennuspäivänä toimi näin:

1. Siirry B1Adminissa kohtaan **Henkilöt**, hae haluamasi henkilöt (tai suorita tallennettu lista) ja klikkaa **Vie** ladataksesi CSV-tiedoston.
2. Mailchimpissä käytä **Yleisö → Tuo kontaktit** -toimintoa CSV-tiedoston lataamiseen ja lisää tarvittavat tunnisteet tuonnin aikana.

Kun teet alkulatauksen Mailchimpin tuojan kautta, pidät suostumuskysymyksen omissa käsissäsi. Tuo vain ihmisiä, jotka ovat oikeasti suostuneet vastaanottamaan sähköpostisi. Koko hakemiston massatuominen tilaajina voi rikkoa Mailchimpin käyttöehtoja ja roskapostilakeja (CAN-SPAM/GDPR).

## Rajoitukset ja huomautukset

- **Yksisuuntainen synkronointi.** Tilausten peruutukset, palautuneet viestit ja Mailchimpissä tehdyt muokkaukset eivät siirry takaisin B1:een. Henkilö, joka peruuttaa tilauksensa Mailchimpissä, voi silti saada suoraan B1:stä lähetettyjä sähköposteja. Käsittele Mailchimpiä joukkopostin suostumuksen lähteenä.
- **Ihmiset ilman sähköpostiosoitetta ohitetaan.** Tapaus kirjataan toimitushistoriaan. Mailchimpin tilaajat tunnistetaan sähköpostiosoitteen perusteella.
- **Sähköpostiosoitteen muutos luo uuden tilaajan.** Mailchimp tunnistaa ihmiset sähköpostiosoitteen perusteella. Jos muutat henkilön sähköpostin B1:ssä, hänet lisätään uudella osoitteella. Vanha tilaaja jää paikalleen, kunnes arkistoit sen Mailchimpissä.
- **Synkronoituvat vain vakiokentät:** etunimi, sukunimi ja puhelin. Jäsenyyden tila, kampus ja mukautetut B1-kentät eivät kartoitu Mailchimpin yhdistelykenttiin tässä versiossa. Käytä segmentointiin listatunnisteita.
- **Tunnisteiden nimet ovat ryhmien ja listojen nimiä.** Ryhmän tai listan uudelleennimeäminen alkaa merkitä uudella nimellä. Vanha tunniste jää olemassa oleviin tilaajiin, kunnes poistat sen Mailchimpissä.
- **Mailchimpin yhteysrajat pätevät edelleen.** Synkronointi, joka työntää ilmaisen tason yleisön rajansa yli, kirjaa virheitä `Member limit reached` toimitushistoriaan.

## Muut reseptit (Zapier / Make)

Kaikki, mikä ylittää yleisön synkronoinnin, on edelleen käytettävissä [Zapierin](../zapier) tai [Maken](../make) kautta. Näin on esimerkiksi antajien merkitseminen tapahtumalla `donation.created`, käänteinen suunta Mailchimp → B1 tai synkronointi kokonaan toiseen sähköpostialustaan, kuten Constant Contactiin tai Brevoon. Nämä käynnistyvät samoista webhook-tapahtumista:

- **Merkitse antajat:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Kaksisuuntainen:** Mailchimp *New Subscriber* → B1 *Create Person*

Jos olet aiemmin kytkenyt henkilö- ja ryhmäsynkronoinnin Zapierin kautta, kytke ne pois päältä natiivin liittimen käyttöönoton jälkeen. Molempien ajaminen käsittelee jokaisen tapahtuman kahdesti ja kuluttaa Zapier-tehtäviä turhaan.

## Vianmääritys

- **Tallennus epäonnistuu viestillä "Mailchimp rejected the API key"**: avain on peruttu tai kirjoitettu väärin. Avainten täytyy päättyä datakeskuksen tunnisteeseen, kuten `-us21`.
- **Tallennus epäonnistuu viestillä "audience not found"**: yleisö-ID ei ole olemassa kyseisellä tilillä. Kopioi se kohdasta **Yleisö → Asetukset → Yleisön nimi ja oletukset**. Se ei ole yleisön nimi.
- **Henkilö ei koskaan ilmestynyt Mailchimpiin**: tarkista webhookin toimitushistoria. "Skipped: person has no email address" tarkoittaa juuri sitä. Mailchimpin `4xx`-vastaus näyttää syyn vastauksen rungossa.
- **Toimitukset pysähtyivät kokonaan**: toistuvien epäonnistuneiden toimitusten jälkeen webhook poistuu automaattisesti käytöstä. Korjaa syy (yleensä peruttu avain), ota webhook uudelleen käyttöön ja vahvista toiminta painikkeella **Lähetä testi**.

## Katso myös

- [Webhookit (kehittäjän viiteopas)](/docs/developer/api/webhooks): moottori tämän taustalla, tapahtumaluettelo sekä toimituksen ja uudelleenyritysten toiminta
- [Tallennetut listat](/docs/b1-admin/people/lists): sääntöihin perustuvat yleisöt, jotka sopivat luontevasti Mailchimp-tunnisteiksi
- [Zapier (yleiskatsaus)](../zapier): reseptit yleisön synkronoinnin ylittäviin tarpeisiin

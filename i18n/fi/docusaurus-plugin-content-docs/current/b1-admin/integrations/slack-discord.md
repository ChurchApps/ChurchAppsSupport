---
title: "Slack ja Discord"
description: "Julkaise B1 Adminin tapahtumat, kuten uudet henkilöt, lahjoitukset ja lomakevastaukset, Slack- tai Discord-kanavalle saapuvan webhookin avulla ilman Zapieriä."
---

# Slack ja Discord

<div class="article-intro">

Lähetä luettavia ilmoituksia B1:stä suoraan Slack- tai Discord-kanavaan: uudet henkilöt, lahjoitukset, ryhmäilmoittautumiset, lomakkeiden lähetykset, kalenteritapahtumat ja paljon muuta. Tarvitset ei kolmannen osapuolen tiliä eikä Zapia, jota pitäisi ylläpitää. B1 muotoilee tapahtumat chat-viesteiksi ja lähettää ne kanavan webhook-osoitteeseen itse.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset **Muokkaa asetuksia** -oikeuden B1Adminissa
- Slack-työtilasi tai Discord-palvelimesi ylläpitäjä luo kanavalle saapuvan webhookin (Incoming Webhook)
- Päätä, mihin kanavaan haluat ilmoitukset. Voit käyttää samaa kanavaa useille tapahtumatyypeille tai jakaa ne eri kanaville.

</div>

## Miten se toimii

B1:ssä on sisäänrakennettu **Yhdistimen tyyppi** (Connector Type) chat-alustoille. Kun luot webhookin tyypillä **Slack** tai **Discord**, webhook-moottori hoitaa tavallisen toimituksen, uudelleenyritykset ja allekirjoitetut otsikot. Lähetettävä sisältö muotoillaan kuitenkin uudelleen B1:n tavallisesta `{event,churchId,data}`-kuoresta palveluiden odottamaksi pieneksi viestiksi: Slackille `{text}` ja Discordille `{content}`.

B1:n palvelimet eivät ota yhteyttä Slackiin kirkkokohtaisesti muuten kuin olemassa olevan lähtevän webhook-prosessin kautta. Mitään uutta ei tarvitse ylläpitää eikä maksaa.

## Slack: vaihe vaiheelta

### 1. Hanki Slackin Incoming Webhook -osoite

1. Avaa [api.slack.com/apps](https://api.slack.com/apps) siinä Slack-työtilassa, johon haluat ilmoitukset.
2. Klikkaa **Create New App → From scratch**, anna sovellukselle nimi, esimerkiksi "B1 Notifications", ja valitse työtila.
3. Valitse vasemmasta valikosta **Incoming Webhooks** ja aseta **Activate Incoming Webhooks** tilaan *On*.
4. Klikkaa **Add New Webhook to Workspace**, valitse kanava (esimerkiksi `#donations`) ja klikkaa **Allow**.
5. Slack palauttaa sinut sivulle, jolla on uusi **Webhook URL** muodossa `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Kopioi se. B1 tarvitsee vain tämän tiedon.

:::caution
Käsittele Slackin webhook-osoitetta salaisuutena. Kuka tahansa, jolla se on, voi lähettää mitä tahansa viestejä kanavaan. Jos paljastat sen vahingossa, luo se uudelleen Slack-sovelluksen sivulta. Uudelleenluonti vain vaihtaa osoitteen, joten päivitä B1:hen uusi osoite.
:::

### 2. Yhdistä B1Adminissa

1. Siirry B1Adminissa kohtaan **Asetukset → Kehittäjä → Webhookit**.
2. Klikkaa **Uusi webhook**.
3. Täytä kentät:
   - **Nimi**: esimerkiksi "Lahjoitukset → #donations". Vain tiimisi näkee tämän.
   - **Yhdistimen tyyppi**: valitse **Slack**.
   - **Payload-URL**: liitä Slackin osoite vaiheesta 1.
   - **Tapahtumat**: valitse tapahtumat, jotka haluat viesteinä. Lahjoituskanavalle riittää `donation.created`. #people-kanavalle kokeile `person.created` ja `group.member.added`.
4. Klikkaa **Tallenna**. Näyttöön tulee **allekirjoitusavain** (Signing Secret) -ikkuna. Slack ei tarkista B1:n allekirjoituksia, joten voit sivuuttaa sen ja sulkea ikkunan.

### 3. Testaa

Avaa webhook uudelleen listalta ja klikkaa **Lähetä testitapahtuma**. Muutaman sekunnin kuluessa Slack-kanavaasi ilmestyy viesti, esimerkiksi

> 💝 Uusi lahjoitus: $50.00

Samalle sivulle ilmestyy myös uusi rivi **Viimeisimmät toimitukset** -taulukkoon tilalla `succeeded`. Olet valmis.

## Discord: vaihe vaiheelta

### 1. Hanki Discordin webhook-osoite

1. Vie Discord-palvelimellasi hiiri kanavan päälle ja klikkaa **⚙-rataskuviketta** (Muokkaa kanavaa).
2. Avaa **Integraatiot → Webhookit → Uusi webhook**.
3. Anna sille nimi ja halutessasi avatar, ja klikkaa sitten **Kopioi Webhook-URL**. Osoite on muotoa `https://discord.com/api/webhooks/123…/abc…`.

### 2. Yhdistä B1Adminissa

Sama kuin yllä olevassa Slack-prosessissa, paitsi että **Yhdistimen tyyppi** asetetaan arvoon **Discord**. Liitä Discordin osoite kenttään **Payload-URL** ja tallenna.

:::tip
Discord-osoitteen loppuun **ei** tarvitse lisätä `/slack`. B1 lähettää Discordin omia `{content}`-hyötykuormia, ei Slack-yhteensopivia. Liitä vain Discordin antama osoite sellaisenaan.
:::

### 3. Testaa

Käytä samaa **Lähetä testitapahtuma** -painiketta. Discord näyttää viestin valitussa kanavassa, ja toimitusloki vaihtuu tilaan `succeeded`.

## Miltä viestit näyttävät

| Tapahtuma | Esimerkkiviesti |
|---|---|
| `person.created` | 👤 Uusi henkilö lisätty: Jordan Rivera |
| `person.updated` | 👤 Henkilön tiedot päivitetty: Jordan Rivera |
| `group.created` | 👥 Uusi ryhmä luotu: Tiistain raamattupiiri |
| `group.member.added` | ➕ Joku lisättiin ryhmään |
| `donation.created` | 💝 Uusi lahjoitus: $50.00 |
| `donation.updated` | 💝 Lahjoitus päivitetty: $75.00 |
| `attendance.recorded` | ✅ Läsnäolo kirjattu |
| `form.submission.created` | 📝 Uusi lomakevastaus vastaanotettu |
| `event.created` | 📅 Uusi tapahtuma: Pääsiäisjumalanpalvelus |

Täydellinen luettelo on [webhook-tapahtumaluettelossa](/docs/developer/api/webhooks#event-catalog). Mikä tahansa siellä oleva tapahtuma voidaan ohjata Slackiin tai Discordiin.

## Yksi kanava aihetta kohden

Kaikkia tapahtumia ei tarvitse laittaa samaan paikkaan. Useimmat seurakunnat luovat muutaman webhookin:

- **#donations**-kanavan, joka kuuntelee vain tapahtumaa `donation.created`
- **#new-people**-kanavan tapahtumille `person.created` ja `group.member.added`
- **#admin-alerts**-kanavan vähän käytetyille tapahtumille, kuten `form.submission.created`

Seurakunnalla ei ole rajaa webhookien määrälle. Jokainen on itsenäinen. Yhden poistaminen tai poistaminen käytöstä ei vaikuta muihin.

## Toimitusten tarkastelu

Webhook-editorin **Viimeisimmät toimitukset** -taulukko näyttää viimeiset 50 yritystä. Klikkaa riviä nähdäksesi lähetetyn tarkan hyötykuorman ja vastauksen, joka palautui. Slack-yhdistimen hyötykuorma on `{"text":"💝 Uusi lahjoitus: $50.00"}`, eikä raakaa `{event,churchId,...}`-kuorta, koska B1 muotoilee sen uudelleen ennen toimitusta.

Jos jokin epäonnistui (punainen merkki `failed` tai `exhausted`), ikkuna näyttää HTTP-tilakoodin ja vastauksen sisällön. Näin näet tarkasti, mitä Slack tai Discord ei hyväksynyt. Yleensä syy on virheellinen kopiointi osoitteesta.

## Vianmääritys

- **Viestiä ei näy ja toimituksen tila on `400`**: yleensä Yhdistimen tyypiksi on valittu **Tavallinen**, vaikka osoite on Slackin tai Discordin. Slack ja Discord hylkäävät raakan kuoren. Vaihda valikko arvoon **Slack** tai **Discord** ja lähetä testi uudelleen.
- **Webhook poistettiin käytöstä automaattisesti**: kun kolme toimitusta epäonnistuu peräkkäin, B1 sammuttaa webhookin. Korjaa osoite (tai luo se uudelleen Slackissa tai Discordissa) ja kytke **Aktiivinen** takaisin päälle.
- **Viesti saapui, mutta siitä puuttuu tietoa**: jokainen chat-alusta rajoittaa viestin kokoa. B1:n viestit on suunniteltu yhdellä rivillä. Rikkaampia ilmoituksia varten käytä [Zapieria](./zapier.md) tai [Makea](./make.md), jotka voivat koota laajemman Slack-viestin Slack-toimintojensa avulla.

## Yhdistimen tyypin vaihtaminen myöhemmin

Voit vaihtaa olemassa olevan webhookin yhdistimen tyypin. Muutos tulee voimaan seuraavassa toimituksessa. Jos vaihdat Slackista Tavalliseen, osoita URL omaan HTTPS-päätepisteeseesi. Sama allekirjoitusavain (se annettiin webhookia luotaessa) voidaan silloin tarkistaa raakaa kuorta vastaan.

## Katso myös

- [Zapier](./zapier.md): monivaiheisiin työnkulkuihin, joita B1-tapahtumat käynnistävät
- [Make](./make.md): visuaalinen skenaariorakentaja
- [Webhookit (kehittäjän viite)](/docs/developer/api/webhooks): täydet hyötykuorma- ja allekirjoitusmuodot, jos osoitat webhookin joskus omalle palvelimellesi

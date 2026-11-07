---
title: "Maksulliset ilmoittautumiset"
description: "Määritä B1 Adminissa maksulliset ilmoittautumiset: hinnoitellut osallistujatyypit, lisäpalvelut, alennuskoodit, odotuslistat ja maksut lahjoituspalvelun kautta."
---

# Maksulliset ilmoittautumiset

<div class="article-intro">

Tapahtumailmoittautuminen voi olla muutakin kuin yksinkertainen osallistujamäärän laskeminen. Voit määrittää hinnoitellut osallistujatyypit (kuten Aikuinen ja Lapsi), tarjota valinnaisia lisävarusteita omilla hinnoillaan ja määrillään, luoda alennuskoodeja sekä kerätä maksun ilmoittautumisen yhteydessä kirkkosi nykyisen lahjoituspalveluntarjoajan kautta. Kun tapahtuma täyttyy, valinnainen odotuslista pitää kiinnostuneet jäsenet jonossa ja siirtää heidät automaattisesti paikkojen vapautuessa.

</div>

## Koulutusvideo

<YouTube id="eGSZv24Dlzk" title="Tapahtumailmoittautuminen ja maksulliset tapahtumat B1:ssä" next="Kirkkosi verkkosivuston julkaiseminen B1:ssä" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Ota ilmoittautuminen käyttöön tapahtumassa ensin — katso [Kalenterien luominen](./creating-calendars.md#enabling-event-registration)
- Jotta maksut voidaan kerätä verkossa, kirkkosi tarvitsee [verkkolahjoitusten asetukset](../donations/online-giving-setup.md) (Stripe, PayPal tai Kingdom Funding). Ilmaiset tapahtumat eivät vaadi lahjoitusasetuksia. Ilman verkkolahjoituksia maksulliset ilmoittautumiset toimivat edelleen, mutta ihmiset maksavat suoraan kirkolle — katso [Kirkot ilman verkkolahjoituksia](#churches-without-online-giving).

</div>

## Ilmoittautumisasetusten avaaminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), valitse **Calendars > Registrations** ja avaa tapahtumasi (tai avaa tapahtuma sen kalenterista).
2. **Registration Settings** -kortti näyttää perusasiat — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags** ja **Registration Questions**.
3. Perusasetusten alla on kolme akordionia: **Attendee Types**, **Selections** ja **Discount Codes**.

## Osallistujatyypit

Osallistujatyyppien avulla voit veloittaa eri hinnan eri osallistujaryhmiltä — ja rajoittaa kunkin ryhmän paikkamäärää erikseen.

1. Laajenna **Attendee Types** -akordioni ja napsauta **Add Type**.
2. Kirjoita **Name** (esim. "Aikuinen", "Lapsi", "Opiskelija").
3. Aseta **Price**. Käytä arvoa 0 ilmaiselle tyypille.
4. Aseta halutessasi **Capacity** vain tälle tyypille (esim. vain 20 lapsipaikkaa). Jätä tyhjäksi, jos tyypille ei ole paikkarajoitusta.
5. Napsauta **Save**.

Ilmoittautumisen aikana jokainen osallistuja valitsee tyypin; loppuunmyydyt tyypit näkyvät merkinnällä **Sold out** eikä niitä voi valita. Osallistujalistassa näkyy kunkin osallistujan tyyppi sekä tyyppikohtaiset laskurit.

## Valinnat

Valinnat ovat valinnaisia maksullisia lisävarusteita — T-paidat, ateriasuunnitelmat, aktiviteettipäivitykset.

1. Laajenna **Selections** -akordioni ja napsauta **Add Selection**.
2. Kirjoita **Name**, halutessasi **Description** sekä **Price** (0 näkyy merkintänä "Free").
3. Aseta halutessasi **Capacity** (kokonaismäärä kaikissa ilmoittautumisissa) ja **Max Qty** (suurin määrä, jonka yksi ilmoittautuminen voi tilata).
4. Napsauta **Save**.

Ilmoittautujat valitsevat määrät ilmoittautumisen aikana, ja summat lasketaan kapasiteettiin, joten ylimyyntiä ei synny.

## Alennuskoodit

1. Laajenna **Discount Codes** -akordioni ja napsauta **Add Discount Code**.
2. Kirjoita **Code**, jonka ilmoittautujat syöttävät.
3. Valitse **Type** — **Percent** tai **Amount** — ja anna sen **Value**.
4. Rajoita koodia halutessasi **Start Date** / **End Date** -päivämäärillä, **Min Members** -arvolla (ilmoittautumisen vähimmäisosallistujamäärä) ja **Max Uses** -arvolla.
5. Napsauta **Save**.

Jokainen koodi näyttää **Uses**-laskurin, josta näet, kuinka usein sitä on käytetty. Ilmoittautujat saavat välittömän palautteen koodin käytön yhteydessä — mukaan lukien selkeät viestit, jos koodi on vanhentunut, ei ole vielä alkanut tai vaatii enemmän osallistujia.

## Odotuslista

Ota **Enable Waitlist** käyttöön Registration Settings -kortilla. Kun tapahtuma saavuttaa kapasiteettinsa:

- Uusille ilmoittautujille tarjotaan odotuslistapaikka sen sijaan, että heidät torjuttaisiin. He suorittavat saman ilmoittautumisen (maksu ohitetaan odotuslistalla ollessa).
- Kun joku peruu ilmoittautumisensa, vanhin odotuslistalla oleva ilmoittautuminen **siirretään automaattisesti** ja hän saa sähköpostin, jonka mukaan paikka vapautui. Jos hänellä on maksamatonta saldoa, sähköposti ohjaa hänet kirkkosi B1-sivuston [Ilmoittautumiseni](../../b1-church/events/my-registrations.md) -sivulle, jossa hän voi suorittaa maksun.
- Voit siirtää henkilön käsin milloin tahansa odotuslistalla olevan rivin **Promote**-toiminnolla — hyödyllinen esimerkiksi tapahtuman kapasiteetin nostamisen jälkeen.

:::info
Siirretyt ilmoittautumiset pysyvät *odottavina*, kunnes saldo on maksettu; maksu (tai maksettavaa ei ole lainkaan) vahvistaa ne.
:::

## Ilmoittautujaluettelo

Avaa tapahtuma Registrations-sivulta nähdäksesi kaikki ilmoittautumiset. Kortin otsikko näyttää, kuinka monta ilmoittautumista käyttää paikkaa kapasiteettia vastaan (esimerkiksi *Registrations (18 / 20)*). Vain odottavat ja vahvistetut ilmoittautumiset lasketaan mukaan; kun ihmisiä on odotuslistalla, otsikkoon lisätään määrä (esimerkiksi *· 3 waitlisted*), ja sama määrä näkyy kapasiteettipalkin alla. Taulukossa näkyvät **Name**, **Members**, **Type** (kunkin osallistujan tyyppi), **Paid / Total** (maksamattoman saldon varoituksella, jos rahaa on vielä maksamatta), **Status** ja **Date**, sekä taulukon yläpuolella tyyppikohtaiset laskurit.

- Napsauta rivin tietokuvaketta avataksesi **Registration Details** -ikkunan — jäsenet, valinnat, maksettu/saldo sekä **Payments**-taulukko, johon on listattu jokainen veloitus (summa, maksutapa, päivämäärä).
- **Export CSV** lataa koko ilmoittautujaluettelon sarakkeineen: jäsenet, osallistujatyypit, valinnat, maksettu/yhteensä/saldo, tila sekä yksi sarake kutakin ilmoittautumiskysymystä kohden.
- **Add Attendee** kirjaa offline- tai puhelinilmoittautumisen kenelle tahansa seurakuntasi jäsenelle. Valitse henkilö ja maksullisessa tapahtumassa hänen osallistujatyyppinsä. Hänen korttiaan ei veloiteta: maksullinen ilmoittautuminen tallennetaan **odottavana** koko summa maksettavana saldona. Jos kirkollasi on verkkolahjoitukset, henkilö voi maksaa sen [Ilmoittautumiseni](../../b1-church/events/my-registrations.md) -sivulta; muuten maksu kerätään henkilökohtaisesti. Tarvitset Registrations Edit -oikeuden lisätäksesi osallistujia.

:::info
Hyvityksiä ei käsitellä B1:ssä. Jos peruutetusta maksullisesta ilmoittautumisesta on palautettava rahat, tee hyvitys lahjoituspalveluntarjoajasi hallintapaneelista (esim. Stripe).
:::

## Maksun toiminta

Maksut kulkevat samaa lahjoitusyhteyskäytävää kuin kirkkosi jo käyttämä lahjoituksiin — korttitiedot menevät suoraan palveluntarjoajalle eivätkä koskaan kulje B1:n palvelimille. Hinnat lasketaan aina palvelimella määritetyistä tyypeistä, valinnoista ja alennuskoodeista, joten ilmoittautuja ei voi muokata loppusummaa. Kirjautuneet jäsenet voivat maksaa tallennetulla kortilla. Vieraat syöttävät kortin kassalla ja heidän on valittava ruutu **I'm not a robot** ennen maksamista.

### Kirkot ilman verkkolahjoituksia

Jos kirkollasi ei ole määritettyä lahjoituspalveluntarjoajaa, maksulliset tapahtumat voivat silti ottaa ilmoittautumisia vastaan. Maksuvaihe kertoo ilmoittautujille, että verkkomaksu ei ole käytettävissä ja että he voivat maksaa suoraan kirkolle. Painike **Register and Pay Later** tallentaa ilmoittautumisen. Se tallennetaan **odottavana** koko summa maksettavana saldona, ja se näkyy ilmoittautujaluettelossa saldovaroituksella. Kerää rahat tavalliseen tapaasi.

:::info
B1:ssä ei ole tapaa merkitä offline-maksua vastaanotetuksi. Maksettava saldo pysyy ilmoittautujaluettelossa ja ilmoittautujan [Ilmoittautumiseni](../../b1-church/events/my-registrations.md) -kortilla rahojen keräämisen jälkeenkin, joten pidä itse kirjaa siitä, ketkä ovat maksaneet.
:::

## Liittyvät artikkelit

- [Kalenterien luominen](./creating-calendars.md#enabling-event-registration) — ilmoittautumisen ja perusasetusten käyttöönotto
- [Verkkolahjoitusten asetukset](../donations/online-giving-setup.md) — kassalla käytettävän maksuyhdyskäytävän määrittäminen
- [Ilmoittautuminen tapahtumiin](../../b1-church/events/registering.md) — mitä jäsenet näkevät ilmoittautuessaan
- [Ilmoittautumiseni](../../b1-church/events/my-registrations.md) — miten jäsenet maksavat saldot ja muokkaavat ilmoittautumisiaan

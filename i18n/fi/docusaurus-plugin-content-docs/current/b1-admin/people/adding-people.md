---
title: "Henkilöiden lisääminen"
---

# Henkilöiden lisääminen

<div class="article-intro">

Henkilöt-osio on B1 Adminin perusta. Se on seurakuntasi jäsenrekisteri. Kaikki muut toiminnot (ryhmät, läsnäolo, lahjoitukset, lomakkeet) liittyvät henkilötietueisiin. Tämä opas neuvoo, miten henkilö lisätään rekisteriin, hänen tietojaan muokataan ja perheenjäsenet yhdistetään kotitalouksiin.

</div>

## Koulutusvideo

<YouTube id="NTL1UDQpx8s" title="Henkilöiden ja kotitalouksien lisääminen B1:ssä" next="Henkilörekisterin tuominen B1:ssä" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset aktiivisen B1 Admin -tilin, jolla on oikeus hallita henkilöitä. Katso [Roolit ja oikeudet](roles-permissions.md), jos et ole varma käyttöoikeuksistasi.
- Jos lisäät useampia kuin muutaman henkilön, harkitse [CSV-tuonnin](importing-data.md) käyttöä.

</div>

## Henkilön lisääminen

1. Siirry B1.church-hallintanäkymän etusivulle.
2. Avaa [Pikavalikko](../introduction.md#getting-around-with-the-jump-menu) (hakukenttä sivun yläreunassa vasemmalla), laajenna **Henkilöt** ja klikkaa **Henkilöt**.
3. Klikkaa sivun yläosan painiketta **Lisää henkilö**. Sivu vierittyy alas kohtaan **Lisää uusi henkilö** -lomake, joka on hakemiston alapuolella.
4. Täytä henkilön **Etunimi**, **Sukunimi** ja **Sähköposti** ja klikkaa sitten **Lisää**.

Henkilön profiilisivu avautuu, ja voit lisätä siihen lisätietoja.

:::tip
Jos siirryt toisesta seurakunnanhallintajärjestelmästä, [Tuo tietoja](importing-data.md) -toiminnon avulla voit tuoda koko hakemistosi CSV-tiedostosta. Se on paljon nopeampaa kuin henkilöiden lisääminen yksi kerrallaan.
:::

### Mahdollisten kaksoiskappaleiden varoitukset

Jos sähköpostiosoite vastaa jo rekisterissäsi olevaa henkilöä (tai kun henkilö luodaan täydellisestä Muokkaa-lomakkeesta, puhelinnumero tai etunimi, sukunimi ja syntymäaika), ennen uuden tietueen tallentamista avautuu valintaikkuna **Mahdollinen kaksoiskappale**. Se listaa jokaisen vastaavan henkilön sähköpostiosoitteineen, puhelinnumeroineen ja syntymäaikoineen, jotta voit verrata niitä.

- Klikkaa vastaavuuden vieressä **Käytä olemassa olevaa**, jos haluat käyttää kyseisen henkilön tietuetta uuden luomisen sijaan.
- Klikkaa **Luo silti**, jos haluat lisätä uuden henkilön, vaikka mahdollinen vastaavuus löytyi.

Tarkistus tehdään vain, kun luot aivan uuden henkilön. Olemassa olevan tietueen muokkaus ei koskaan laukaise sitä. Tarkistus estää vain uusien kaksoiskappaleiden syntymisen. Se ei yhdistä jo olemassa olevia tietueita.

## Tietojen muokkaaminen

1. Klikkaa henkilön profiilisivulla vasemmalla, yhteystietojen alapuolella, painiketta **Muokkaa**.
2. Täytä lisätietoja **Henkilötiedot**-lomakkeeseen. Voit valita **Titteli**-kenttään listalta Mr, Mrs, Miss, Ms, Dr, Prof, Rev tai Pastor tai kirjoittaa oman, enintään 10 merkkiä. Lisäksi voit täyttää toisen etunimen, jäsenyyden tilan (**Vierailija**, **Vieras**, **Säännöllinen osallistuja**, **Jäsen**, **Henkilökunta**, **Passiivinen** tai **Kuollut**), päivämäärät, osoitteen, puhelinnumerot sekä (lapsille ja opiskelijoille) luokan ja koulun.
3. Tallenna henkilötiedot klikkaamalla **Tallenna**.

Profiilin vasemmalla puolella näkyvät henkilön kuva, nimi, jäsenyyden tila, yhteystiedot, mahdolliset [mukautetun kentän](../settings/custom-fields.md) arvot ja kotitalous. Kotitalouden alapuolella **Lisätty** näyttää tietueen luontipäivämäärän (vain henkilöille, jotka on lisätty lokakuun lopun 2026 jälkeen). Klikkaa kuvaa vaihtaaksesi sen. Painikkeen **Muokkaa** alapuolella on muutama muu toiminto: **Työnkulku** (lisää henkilö [työnkulkuun](../serving/workflows.md)), **Yhdistä**, **Vie** ja **Vie tiedot**.

Profiilin muu osa näyttää yhteenvedon kustakin siihen liittyvästä tietotyypistä:

- **Läsnäolo**: Näyttää, mitä viimeisistä viikoista henkilö osallistui, ja hänen viimeisimmät käyntinsä. Klikkaa **Kaikki vuodet** nähdäksesi koko käyntihistorian. Siinä on sarakkeet kampukselle, palvelulle, palvelun ajalle, ryhmälle ja **Sisäänkirjautuminen**. Viimeisin sarake näyttää kioskilla tehdyn sisäänkirjautumisen ajan. Käynneille, joita ei kirjattu kioskin kautta, siinä on viiva. Voit myös klikata **Tulosta**. Tulosteen yläreunassa, henkilön nimen yläpuolella, on keskitettynä seurakuntasi logo ja nimi. Koko seurakunnan suuntauksia varten katso [Läsnäolon seuranta](../attendance/tracking-attendance.md).
- **Lahjoitukset**: Näyttää tämän vuoden lahjat, mukaan lukien lahjat vähennyskelvottomille rahastoille. Klikkaa **Kaikki vuodet** nähdäksesi koko [lahjoitushistorian](../donations/recording-donations.md) tai **Kirjaa lahja** kirjataksesi uuden lahjan. Jos seurakuntasi on ottanut käyttöön [lahjoitusten yksityisyyden](../settings/church-settings.md#giving-privacy), summat pysyvät piilossa, kunnes klikkaat **Näytä lahjoitukset**.
- **Ryhmät**: Listaa henkilön [ryhmäjäsenyydet](../groups/group-members.md). Kun tieto on tallennettu, jokaisen ryhmän kohdalla näkyy myös **Liittynyt**-päivämäärä.
- **Muistiinpanot**: Näyttää viimeisimmät henkilöä koskevat muistiinpanot (pastoraalinen hoito, seurantatoimet jne.). Klikkaa **Kaikki muistiinpanot** lukeaksesi ja lisätäksesi muistiinpanoja. Jokaisessa muistiinpanossa näkyy, kuka sen kirjoitti, sekä päivämäärä ja kellonaika. Nähdäksesi viimeisimmät muistiinpanot kaikilta henkilöiltä kerralla, käytä [Muistiinpanot](./notes.md)-sivua.
- **Lomakkeet**: Listaa henkilön lomakkeet ja kertoo, onko kukin niistä lähetetty (katso alla [Lomakkeiden käyttö](#working-with-forms)).

Kun avaat jonkin näistä kokonäkymistä, palaa profiiliin klikkaamalla sivun yläreunassa olevaa henkilön nimen sisältävää **Takaisin**-linkkiä.

## Henkilön sähköpostittaminen

Jos henkilöllä on rekisterissä sähköpostiosoite, profiilin vasemmalle puolelle yhteystietojen alapuolelle ilmestyy painike **Sähköposti**.

1. Klikkaa henkilön profiilissa **Sähköposti**.
2. Avautuu **Sähköposti**-valintaikkuna, jonka otsikossa on henkilön nimi. Siinä näkyy **Lähetetään vastaanottajalle** ja henkilön osoite.
3. Valitse halutessasi tallennettu malli kohdasta **Lataa malli (valinnainen)**.
4. Kirjoita **Aihe** ja laadi viesti.
5. Klikkaa **Lähetä sähköposti**.

Jos haluat kirjoittaa viestin omassa sähköpostiohjelmassasi, klikkaa **Avaa sähköpostisovelluksessani**.

:::info
Lähettäminen B1:stä noudattaa samoja hyväksyntä- ja päivärajoja kuin ryhmäsähköposti. Jos seurakuntaasi ei ole vielä hyväksytty, valintaikkuna pyytää sinua pyytämään tarkistusta. Voit kuitenkin klikata välissä **Avaa sähköpostisovelluksessani**. Katso [Ryhmäsähköpostin käyttöönotto seurakunnallesi](../groups/group-members.md#turning-on-group-email-for-your-church). Käyttäjät, joilla ei ole oikeutta muokata ryhmäjäseniä, siirtyvät suoraan sähköpostisovellukseensa klikatessaan **Sähköposti**.
:::

## Lomakkeiden käyttö

Voit täyttää mukautettuja lomakkeita suoraan henkilön profiilista. Nämä ovat käyttäjän määrittelemiä lomakkeita, jotka voit rakentaa [Lomakkeiden luominen](../forms/creating-forms.md) -oppaan avulla.

1. Etsi henkilön profiilista **Lomakkeet**-osio. Se listaa jokaisen lomakkeen ja kertoo, onko se **Lähetetty** vai **Ei lähetetty**.
2. Avaa lomake klikkaamalla sen nimeä (tai näe koko lista klikkaamalla **Kaikki lomakkeet**).
3. Klikkaa lomakkeen **muokkauskuvaketta** (kynää), täytä tiedot ja klikkaa **Tallenna**.

Kun lomake on lähetetty, klikkaa sen vieressä olevaa **tulostuskuvaketta** tulostaaksesi henkilön täytetyt vastaukset. Kun henkilöllä on yksi lomakkeen lähetys, lomake näyttää **Lähetetty**-tilan ja päivämäärän vastausten yläpuolella.

Jos lähetys kirjautui väärälle henkilölle, klikkaa sen vieressä olevaa **Vaihda henkilö** -kuvaketta (kaksi nuolta). Voit siirtää lähetyksen toiselle henkilölle tai irrottaa sen. Katso [Lähetyksen henkilön vaihtaminen](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Henkilön profiiliin liitetyt lomakkeet käyttävät **Henkilöt**-lomaketyyppiä. Jos tarvitset erillisen lomakkeen, kuten tapahtumailmoittautumisen, katso lomakeoppaan [Itsenäinen lomake -vaihtoehto](../forms/creating-forms.md).
:::

:::tip
Jos tarvitset vain yhden tai kaksi lisätietoa henkilöistä, kuten päivämäärän, numeron tai kyllä/ei-vastauksen, käytä lomakkeen sijaan [Mukautettuja kenttiä](../settings/custom-fields.md). Ne täytetään nopeammin, ja niitä voi hakea suoraan Laajennetussa haussa.
:::

## Kotitalouksien hallinta {#managing-households}

Kotitalouksien avulla voit yhdistää perheenjäsenet toisiinsa. Tämä on erityisen hyödyllistä [sisäänkirjautumisessa](../attendance/check-in.md), jossa vanhempi voi kirjata sisään kaikki lapsensa kerralla.

1. Klikkaa henkilön profiilissa vasemmalla **Kotitalous**-otsikon vieressä olevaa **Muokkaa**-painiketta.
2. Kotitalouden muokkausikkuna avautuu. Valitse nykyiselle henkilölle **kotitalousrooli** (esim. Pää, Puoliso, Lapsi, Muu).
3. Klikkaa **Lisää**-kuvaketta lisätäksesi toisen kotitalouden jäsenen.
4. Kohdassa **Lisää kotitalouden jäsen** kirjoita henkilön nimi hakukenttään ja paina **Enter** tai klikkaa hakukuvaketta. Ennen kirjoittamista näkyy lyhyt luettelo **Viimeisimmät henkilöt**.
5. Kun henkilö näkyy tuloksissa, klikkaa hänen nimeään tai hänen vieressään olevaa lisäyskuvaketta.
6. Valitse hänen kotitalousroolinsa ja klikkaa **Tallenna** viimeistelläksesi kotitalouden määrityksen.

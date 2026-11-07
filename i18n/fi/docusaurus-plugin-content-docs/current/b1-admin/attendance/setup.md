---
title: "Attendance-asetukset"
---

# Attendance-asetukset

<div class="article-intro">

Ennen kuin voit seurata osallistumista, sinun on kerrottava B1 Adminille seurakuntasi fyysisistä toimipisteistä, siitä milloin jumalanpalveluksia pidetään ja mitkä ryhmät kokoontuvat kullakin jumalanpalveluksella. Tämä kertaluonteinen asetus luo rakenteen, jonka varaan koko seurakuntasi osallistumisen seuranta ja raportointi rakentuu.

</div>

## Koulutusvideo

<YouTube id="LQPc2gVlXvQ" title="Jumalanpalvelusten ja osallistumisen asetukset B1:ssä" next="Lasten sisäänkirjautumisen asetukset B1:ssä" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset aktiivisen B1 Admin -tilin, jolla on **Muokkaa jumalanpalveluksia** -osallistumisoikeus. **Asetukset**-valinta näkyy vain niille, joilla tämä oikeus on; pelkkä osallistumisen katselu ei riitä. Katso [Roolit ja oikeudet](../people/roles-permissions.md), jos et ole varma käyttöoikeustasostasi.
- Jos aiot määrittää ryhmiä jumalanpalvelusajoille, varmista ensin, että [ryhmät on luotu](../groups/creating-groups.md).

</div>

## Keskeiset käsitteet

- **Toimipiste** -- fyysinen paikka, jossa seurakuntasi kokoontuu (esim. "Pääkampus", "Pohjoinen kampus"). Toimipisteitä hallitaan kohdassa **Asetukset**.
- **Jumalanpalvelus** -- toistuva kokoontuminen toimipisteellä (esim. "Sunnuntain jumalanpalvelus", "Keskiviikkoilta").
- **Jumalanpalveluksen ajankohta** -- tietty kellonaika, jolloin jumalanpalvelus pidetään (esim. "9.00", "11.00").
- **Aikataulutettu ryhmä** -- jumalanpalveluksen ajankohtaan liitetty ryhmä. Osallistumista seurataan kyseisen jumalanpalveluksen yhteydessä.
- **Aikatauluttamaton ryhmä** -- ryhmä, joka seuraa osallistumista itsenäisesti, ilman sidosta jumalanpalveluksen ajankohtaan.

## Osallistumisrakenteen määrittäminen

1. Avaa **B1 Admin**, avaa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa) ja laajenna **Henkilöt**.
2. Valitse **Osallistuminen** ja valitse sitten vasemmasta sarakkeesta **Asetukset**. **Palvelurakenne**-taulukko avautuu, ja sen yläosassa näkyvät toimipisteiden, jumalanpalvelusajankohtien sekä aikataulutettujen ja aikatauluttamattomien ryhmien määrät. Määrät päivittyvät heti, kun lisäät, muokkaat tai poistat jotakin taulukosta.
3. Valitse **Hallitse toimipisteitä** (**Palvelurakenne**-paneelin oikeassa yläkulmassa). Tämä vie sinut kohtaan **Asetukset → Toimipisteet**. Valitse **Lisää toimipiste**, kirjoita sijaintisi nimi (osoite ja aikavyöhyke ovat valinnaisia) ja valitse **Tallenna**.
4. Palaa kohtaan **Henkilöt → Osallistuminen** ja valitse **Asetukset**. Toimipisteesi näkyy nyt asetustaulukossa.
5. Valitse toimipisteesi alla olevan palvelun **+-painike** (sarakkeessa **Palvelu**). Kirjoita palvelun nimi, esimerkiksi "Sunnuntain jumalanpalvelus", ja valitse **Tallenna**.
6. Valitse palvelun alla olevan **+-painike** (sarakkeessa **Aika**). Kirjoita **jumalanpalveluksen ajankohdan** nimi, esimerkiksi "9.00", täytä halutessasi [sisäänkirjautumisen aikataulu](#sisäänkirjautumisen-aikataulun-asettaminen) ja valitse **Tallenna**. Toista jokaiselle jumalanpalveluksen ajankohdalle.
7. Jos haluat liittää ryhmän jumalanpalveluksen ajankohtaan, avaa ryhmä kohdasta **Henkilöt > Ryhmät**, valitse **Muokkaa** ja käytä valintaa **Lisää jumalanpalveluksen ajankohta** -- katso seuraava osio.

### Osallistumisen seurannan käyttöönotto ryhmälle

Ennen kuin ryhmälle voidaan kirjata osallistumisia, ryhmälle on otettava käyttöön osallistumisen seuranta.

1. Valitse Hyppyvalikossa **Henkilöt > Ryhmät** ja valitse ryhmä.
2. Valitse ryhmän nimen alla oleva **Muokkaa**-painike.
3. Aseta **Seuraa osallistumista** -kohdaksi **Kyllä**.
4. Valitse **Tallenna**.

:::tip
Jos liitit ryhmän jumalanpalvelusajankohtaan edellisessä vaiheessa, käytä myös ryhmän muokkausnäkymän valintaa **Lisää jumalanpalveluksen ajankohta** ja linkitä ryhmä oikeaan jumalanpalvelukseen. Näin istunnot liittyvät oikeaan toimipisteeseen ja ajankohtaan.
:::

:::tip
Jos ryhmä kokoontuu säännöllisen jumalanpalveluksen ulkopuolella -- kuten keskiviikkoillan pienryhmä, joka seuraa osallistumistaan itsenäisesti -- voit jättää sen aikatauluttamattomaksi ryhmäksi. Se näkyy silti **Ryhmien osallistuminen** -raportissa.
:::

## Sisäänkirjautumisen aikataulun asettaminen

Jokaiselle jumalanpalveluksen ajankohdalle voi asettaa valinnaisen sisäänkirjautumisen aikataulun, jotta [itsensä sisäänkirjaaminen](check-in.md) avautuu ja sulkeutuu joka viikko automaattisesti. Ilman aikataulua sisäänkirjautuminen kyseiselle ajankohdalle on koko ajan käytettävissä (kunhan huone ei ole suljettu muista syistä, kuten täydeksi tulemisen vuoksi).

1. Valitse **Asetukset**-näkymässä jumalanpalveluksen ajankohdan nimi **Aika**-sarakkeesta (tai lisää uusi ajankohta).
2. Kohdassa **Sisäänkirjautumisen aikataulu** valitse viikonpäivä, jona jumalanpalveluksen ajankohta pidetään, kohdasta **Päivä**.
3. Aseta **Alkamisaika** ja halutessasi **Päättymisaika**.
4. Kirjoita **Avaa sisäänkirjautuminen (minuuttia ennen alkua)** -kenttään arvo -- esimerkiksi `30` avaa sisäänkirjautumisen puoli tuntia ennen jumalanpalveluksen alkua.
5. Kirjoita **Sulje sisäänkirjautuminen (minuuttia lopun jälkeen)** -kenttään arvo -- esimerkiksi `15` pitää sisäänkirjautumisen auki 15 minuuttia päättymisajan jälkeen. Jos et asettanut päättymisaikaa, laskenta alkaa alkamisajasta. Jos jätät sekä **Päättymisaika**- että **Sulje sisäänkirjautuminen** -kentät tyhjiksi, sisäänkirjautuminen pysyy auki koko päivän loppuun asti.
6. Valitse **Tallenna**.

Aikataulu toistuu joka viikko, ja sitä mitataan jumalanpalveluksen toimipisteen aikavyöhykkeen mukaan. Jos toimipisteellä ei ole aikavyöhykettä, käytetään seurakuntasi [aikavyöhykettä](../settings/church-settings.md#time-zone), sen jälkeen ensimmäisen aikavyöhykkeen omaavan toimipisteesi aikavyöhykettä ja lopuksi itärannikon aikaa (America/New_York). Jos sisäänkirjautuminen avautuu väärään aikaan, tarkista toimipisteen **Aikavyöhyke** kohdassa [Toimipisteet](../settings/campuses.md). Poistaaksesi aikataulun aseta **Päivä**-kentäksi **Ei aikataulua** ja valitse **Tallenna**. Aikataulu tulee voimaan vain, kun sekä **Päivä** että **Alkamisaika** on asetettu.

Kun jumalanpalveluksen ajankohdan sisäänkirjautumisikkuna on suljettu:

- **Itsensä sisäänkirjautuminen B1.church-sivustolla** näyttää kyseisen ajankohdan tilassa **Suljettu** (tai esimerkiksi **Suljettu · avautuu su klo 9.30**), eikä sitä voi valita. Jos jokainen palvelun ajankohta on suljettu, perheet näkevät, milloin sisäänkirjautuminen avautuu, esimerkiksi "Sisäänkirjautuminen avautuu su klo 9.30."
- **B1 Checkin -kioskisovellus** näyttää myös ajankohdan tilassa **Suljettu** ja kertoo, milloin se avautuu. Jos kaikki palvelun ajankohdat ovat suljettuina, kioski kertoo, milloin palvelun sisäänkirjautuminen avautuu. Jos henkilö on jo kirjautunut sisään suljetulle ajankohdalle, hänen ryhmänsä näkyy tilassa **Sisäänkirjautunut**. Jos ikkuna sulkeutuu kesken sisäänkirjautumisen, kioski ei suorita sitä loppuun ja näyttää ruudun **Sisäänkirjautuminen ei ole vielä mahdollista**, jossa luetellaan vaikutettu huone, jotta perhe voi valita toisen huoneen.

Perhe, joka on jo kirjautunut sisään aiemmalle jumalanpalveluksen ajankohdalle, voi palata ja lisätä myöhemmän, avoinna olevan ajankohdan, vaikka aiemman ikkunan sulkeutumisesta olisi kulunut aikaa. Heidän olemassa olevat sisäänkirjautumisensa säilyvät.

:::tip
Aseta riittävän pitkä avausaika (esimerkiksi 45 minuuttia ennen alkua), jotta aikaisin saapuvat perheet ja vapaaehtoiset ehtivät kirjautua sisään, ja lyhyt sulkemisaika, jotta myöhästyneet voivat kirjautua sisään jumalanpalveluksen alettua.
:::

## Asetusten muokkaaminen

Voit päivittää asetuksia milloin tahansa. Valitse toimipiste, jumalanpalveluksen ajankohta tai ryhmä ja valitse **Muokkaa** muuttaaksesi sen tietoja tai **Poista** poistaaksesi sen.

:::info
Jumalanpalveluksen ajankohdan poistaminen ei poista aiempia osallistumistietoja. Historiatietosi säilyvät, vaikka muuttaisit aikatauluasi.
:::

## Mitä seuraavaksi

Kun toimipisteet, jumalanpalvelusten ajankohdat ja ryhmät on määritetty, voit aloittaa [osallistumisen kirjaamisen](recording-attendance.md) manuaalisesti tai ottaa käyttöön [itsensä sisäänkirjautumisen](check-in.md) jumalanpalveluksillesi.

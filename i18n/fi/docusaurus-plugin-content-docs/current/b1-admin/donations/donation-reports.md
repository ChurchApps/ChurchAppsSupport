---
title: "Lahjoitusraportit"
---

# Lahjoitusraportit

<div class="article-intro">

B1 Adminissa on useita tapoja tarkastella ja analysoida seurakuntasi lahjoitustietoja. Lahjoitusten **Yhteenveto**-sivun lahjoitusnäkymä tarjoaa visuaalisen yleiskuvan kaavioiden ja suodattimien avulla, kun taas Raportit-osio sisältää yksityiskohtaisemman Lahjoitusyhteenveto-raportin. Käytä näitä työkaluja lahjoitustrendien seurantaan, hallituksen kokouksiin valmistautumiseen tai kirjanpitosi täsmäyttämiseen.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Varmista, että lahjoitukset on [kirjattu erinä](recording-donations.md) tai [tuotu Stripestä](stripe-import.md)
- Tarkista, että [rahastot](funds.md) on määritetty oikein, jotta lahjoitukset luokitellaan oikein

</div>

## Lahjoitusnäkymä

Lahjoitusnäkymä on **Yhteenveto**-sivun **Kojelauta**-näkymä. Se on ensimmäinen sivu, joka avautuu, kun avaat **Lahjoitukset**-osion.

1. Avaa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (B1 Adminin yläreunan vasemmalla oleva hakukenttä), laajenna **Lahjoitukset** ja napsauta **Yhteenveto**. **Yhteenveto**-sivu avautuu **Kojelauta**-näkymään. Oikeassa yläkulmassa oleva **Näkymä**-valinta vaihtaa näkymien **Kojelauta** ja **Lapsenneet lahjoittajat** välillä.
2. Käytä raportin yläpuolella olevia **Viikoittain**, **Kuukausittain** ja **Neljännesvuosittain** -valintoja valitaksesi, miten lahjoitukset ryhmitellään.
3. Aseta **Suodata raporttia** -paneelissa **Alkupäivä** ja **Loppupäivä** (oletuksena edellinen vuosi tähän päivään asti) ja valitse halutessasi **Rahasto**, ja napsauta sitten **Suorita raportti**. Raportti suoritetaan automaattisesti oletusasetuksilla, kun sivu avautuu.
4. Valitulle aikavälille näkyy neljä **KPI-korttia**, jotka kuvaavat lahjoitustietojasi:
   - **Lahjoitukset yhteensä** -- Kaikkien lahjoitusten kokonaissumma.
   - **Keskimääräinen lahjoitus** -- Lahjoitusten keskimääräinen summa.
   - **Yksilölliset lahjoittajat** -- Eri henkilöiden määrä, jotka ovat lahjoittaneet.
   - **Lahjoitukset yhteensä (kpl)** -- Yksittäisten lahjoitusten kokonaismäärä.
5. KPI-korttien alla pylväskaavio näyttää lahjoitukset viikoittain, kuukausittain tai neljännesvuosittain rahastoittain jaoteltuna.
6. Napsauta **Latausvaihtoehdot** ja valitse **Yhteenveto** viedäksesi CSV-tiedoston, jossa on summat jaksoittain ja rahastoittain, tai napsauta tulostuskuvaketta tulostaaksesi raportin. Seurakuntasi logo (**Vaalean taustan logo** kohdasta [Verkkosivusto > Ulkoasu](../website/appearance.md), jos olet ladannut sellaisen) ja nimi näkyvät keskitettyinä tulostetun raportin yläreunassa. Tulosteessa on tumma teksti ja vaalea kaavio, vaikka käyttäisit B1 Adminia tummassa tilassa.

Jos jakson lahjoitukset on annettu useammassa kuin yhdessä valuutassa, KPI-summat muunnetaan seurakuntasi valuutaksi, ja korttien alapuolelle tulee huomautus **Muunnettu nykyisillä vaihtokursseilla**. Lisätietoja on kohdassa [Monivaluuttatuki](./multi-currency.md#converted-totals).

:::info
Kojelauta näyttää yhteenlasketut lahjoitustiedot. Se ei sisällä yksittäisten lahjoittajien nimiä. Lahjoittajakohtaisia tietoja varten käytä [Erät](batches.md)-sivua.
:::

## Lapsenneet lahjoittajat

Valitse **Näkymä**-valinnasta **Lapsenneet lahjoittajat**, jos haluat luetteloida henkilöt, jotka ovat lahjoittaneet yhdellä jaksolla mutta eivät sen jälkeen. Oletuksena vertaillaan edellistä kalenterivuotta tähän vuoteen asti. Voit muuttaa kumpaa tahansa aikaväliä, jos haluat laajentaa tai kaventaa hakua. Jokaisella rivillä näkyvät henkilö, hänen viimeisen lahjansa päivämäärä sekä hänen yhteissummansa aiemmalta jaksolta. **Latausvaihtoehdot > Yhteenveto** lataa luettelon CSV-tiedostona, jota voi käyttää seurantapostitukseen tai soittolistana.

## Lahjoittajakohtaiset tiedot

Jos haluat erittelyn siitä, kuka on lahjoittanut, kuinka paljon ja mihin rahastoon:

1. Siirry kohtaan **Lahjoitukset > Erät**.
2. Napsauta **erän nimeä** avataksesi sen.
3. Erän tietosivulla on luettelo jokaisesta lahjoituksesta, sen tapa (ja shekin numero tai kortin viimeiset numerot), lahjoittajan nimi, päivämäärä, muistiinpanot ja summa. Kokonaissumma on sivun alareunassa.
4. Napsauta lahjoitusrivin kohdalla **Muokkaa** avataksesi yksittäisen lahjoituksen kaikki tiedot, mukaan lukien rahasto.
5. Napsauta luettelon yläpuolella **Vie** ladataksesi CSV-tiedoston, jossa ovat kaikki kyseisen erän lahjoittajien ja lahjoitusten tiedot.

## Lahjoitusyhteenveto-raportti

Lahjoitusraportointi on rakennettu suoraan Lahjoitukset-osioon. Yhteenveto-sivu toimii lahjoitusten yhteenvetoraporttinasi:

1. Valitse Hyppyvalikosta **Lahjoitukset > Yhteenveto**.
2. Aseta **Kojelauta**-näkymässä **Suodata raporttia** -paneelissa **Alkupäivä** ja **Loppupäivä** ja napsauta **Suorita raportti**.
3. Napsauta **Latausvaihtoehdot** ja valitse **Yhteenveto** viedäksesi raportin CSV-tiedostona.

## Tietojen vienti

Voit viedä lahjoitustietoja useista paikoista:

- **Yhteenveto-sivu** -- lataa CSV-tiedosto lahjoitussummista viikoittain, kuukausittain tai neljännesvuosittain sekä rahastoittain
- **Erän tietosivu** -- lataa CSV-tiedosto yksittäisistä lahjoituksista lahjoittajien tiedot mukaan lukien
- **Rahaston tietosivu** -- lataa tietyn rahaston lahjoitushistoria

:::tip
Vuoden lopun raportointia varten yhdistä Yhteenveto-sivun vienti [Lahjoitustodistukset](giving-statements.md)-työkaluun, jolloin saat sekä yhteenlasketut trendit että yksittäisten lahjoittajien todistukset.
:::

## Seuraavat vaiheet

- Luo lahjoittajillesi [Lahjoitustodistukset](giving-statements.md) vuoden lopussa
- Tarkista yksittäiset [erät](batches.md) lahjoitustietojen varmistamiseksi
- Tarkista [rahastojen](funds.md) tietosivut nähdäksesi lahjoitusjaottelut luokittain

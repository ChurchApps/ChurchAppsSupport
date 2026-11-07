---
title: "Monivaluuttatuki"
---

# Monivaluuttatuki

<div class="article-intro">

B1:n monivaluuttaominaisuuden avulla seurakuntasi voi vastaanottaa ja seurata lahjoituksia eri valuutoissa. Tämä on erityisen hyödyllistä seurakunnille, joissa on kansainvälisiä jäseniä, lähetystyöntekijöitä tai useita toimipisteitä eri maissa.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset oikeuden hallita lahjoituksia. Lisätietoja on kohdassa [Roolit ja oikeudet](../people/roles-permissions.md).
- Ota käyttöön [verkkolahjoitukset](./online-giving-setup.md) Stripen kautta, joka tukee monivaluuttatapahtumia.
- Ymmärrä seurakuntasi kirjanpitotarpeet, jotka liittyvät useiden valuuttojen käsittelyyn.

</div>

## Monivaluuttatuen käyttöönotto

Monivaluuttatuki on nyt oletusarvoisesti käytössä B1:ssä. Kun se on käytössä:

- Jäsenet voivat lahjoittaa paikallisessa valuutassaan lahjoittaessaan verkossa
- Voit kirjata lahjoituksia manuaalisesti missä tahansa valuutassa
- Lahjoitusraportit näyttävät summat alkuperäisessä valuutassa
- Stripe hoitaa valuuttamuunnoksen automaattisesti verkkolahjoituksissa

## Tuetut valuutat

Järjestelmä tukee kaikkia tärkeimpiä maailman valuuttoja, muun muassa:

- **USD** -- Yhdysvaltain dollari
- **EUR** -- Euro
- **GBP** -- Punnan
- **CAD** -- Kanadan dollari
- **AUD** -- Australian dollari
- **MXN** -- Meksikon peso
- **BRL** -- Brasilian reaali
- **INR** -- Intian rupia
- **CNY** -- Kiinan juani
- **JPY** -- Japanin jeni
- Ja monia muita...

Verkkolahjoituksiin käytettävissä olevat valuutat riippuvat Stripe-tilisi tukemista valuutoista.

## Lahjoitusten kirjaaminen eri valuutoissa

### Verkkolahjoitukset

Kun jäsen lahjoittaa verkossa Stripen kautta:

1. Hän valitsee haluamansa valuutan maksun yhteydessä
2. Stripe käsittelee maksun kyseisessä valuutassa
3. Lahjoitus kirjataan B1:een alkuperäisellä valuuttasummalla
4. Stripe muuntaa tarvittaessa summan seurakuntasi oletusvaluutaan

### Manuaalinen kirjaus

Käteis- tai shekkilahjoituksen kirjaamiseksi eri valuutassa:

1. Siirry B1 Adminissa kohtaan **Lahjoitukset > Erät** ja avaa haluamasi erä
2. Napsauta erän sivun yläosassa **Lisää lahjoitus**
3. Valitse valuutta valuuttavalikosta
4. Syötä summa kyseisessä valuutassa
5. Täytä lahjoituksen muut tiedot
6. Napsauta **Tallenna**

## Monivaluuttalahjoitusten tarkastelu

### Lahjoitusraportit

Lahjoitusraportit näyttävät summat alkuperäisessä valuutassa:

- Yksittäiset lahjoitustiedot näyttävät valuuttakoodin (esim. "$100.00 USD")
- Yhteissummat lasketaan valuutoittain
- Voit suodattaa tietyn valuutan mukaan

### Muunnetut yhteissummat

Missä tahansa B1 näyttää yhdistetyn kokonaissumman -- lahjoitusten yhteenvedon KPI-kortit, lahjoituserän kokonaissumman tai rahaston kokonaissumman -- seurakuntasi oletusvaluutasta poikkeavassa valuutassa kirjatut lahjoitukset muunnetaan seurakuntasi valuuttaan nykyisten valuuttakurssien mukaan. Näin kokonaissumma on yksi mielekäs luku eikä eri valuuttoja lasketa yhteen. Kokonaissumman alla näkyy merkintä **Muunnettu nykyisten valuuttakurssien mukaan** aina, kun muunnos on tehty. Yksittäiset lahjoitusrivit näkyvät edelleen alkuperäisessä valuutassa.

### Lahjoitustodistukset

Kun luot lahjoitustodistuksia:

- Jokainen lahjoitus näkyy alkuperäisessä valuutassaan
- Summat eritellään valuutoittain
- Jäsenet näkevät tarkalleen, mitä lahjoittivat kussakin valuutassa

## Stripe-integraatio

Verkkolahjoituksissa Stripe hoitaa monivaluuttatapahtumat:

- **Automaattinen muunnos** -- Stripe muuntaa valuutat seurakuntasi oletusvaluutaan
- **Valuuttakurssit** -- Stripe käyttää ajantasaisia markkinavaluuttakursseja
- **Kulut** -- Valuuttamuunnoksesta voi aiheutua Stripen lisäkuluja
- **Maksun valuutta** -- Varat talletetaan tilisi oletusvaluutassa

:::info
Tarkista Stripe-hallintapaneelista ajantasaiset muunnoskurssit ja monivaluuttatapahtumiin liittyvät kulut.
:::

## Kirjanpidolliset näkökohdat

Kun työskentelet useiden valuuttojen kanssa:

- **Kirjanpito** -- Seuraa alkuperäisiä lahjoitussummia ja valuuttoja, jotta raportointi on tarkkaa
- **Valuuttakurssit** -- Huomioi, että Stripen muunnoskurssit voivat poiketa pankkisi kursseista
- **Verotodistukset** -- Kysy kirjanpitäjältäsi, miten eri valuutoissa tehdyt lahjoitukset raportoidaan verotuksessa
- **Rahastojen kohdentaminen** -- Voit kohdistaa lahjoituksia tiettyihin rahastoihin valuutasta riippumatta

## Parhaat käytännöt

- **Oletusvaluutta** -- Aseta seurakuntasi pääasiallinen valuutta useimpien tapahtumien oletukseksi
- **Selkeä viestintä** -- Kerro lahjoittajille, missä valuutassa he lahjoittavat maksuvaiheen aikana
- **Johdonmukainen raportointi** -- Yhdistetyt summat muunnetaan aina automaattisesti seurakuntasi valuuttaan; käytä lahjoituskohtaista valuuttasuodatinta, kun tarvitset alkuperäiset summat
- **Säännöllinen täsmäytys** -- Täsmäytä Stripen maksuerät lahjoituskirjauksiisi huomioiden valuuttamuunnokset

## Rajoitukset

- Maksujen valuuttamuunnoksen hoitaa Stripe ainoastaan verkkolahjoituksissa; manuaaliset lahjoitukset kirjataan sellaisenaan ilman automaattista muunnosta
- Historialliset raportit ja yksittäiset lahjoitusrivit näyttävät aina valuutan, jossa lahjoitus kirjattiin
- Yhdistetyt summat (KPI-kortit, erien ja rahastojen summat) muunnetaan seurakuntasi valuuttaan nykyisillä valuuttakursseilla. Nämä kurssit voivat hieman poiketa pankkisi tai Stripen kursseista, kun varat selvitetään

## Aiheeseen liittyvät artikkelit

- [Verkkolahjoitusten käyttöönotto](./online-giving-setup.md) -- Määritä Stripe lahjoitusten vastaanottamiseen
- [Lahjoitusten kirjaaminen](./recording-donations.md) -- Syötä lahjoitustiedot manuaalisesti
- [Lahjoitusraportit](./donation-reports.md) -- Luo ja tarkastele lahjoitusyhteenvetoja
- [Lahjoitustodistukset](./giving-statements.md) -- Luo vuoden lopun lahjoitustodistukset

---
title: "Opas: Verkkolahjoitusten käyttöönotto"
description: "Määritä verkkolahjoitukset B1 Adminissa: luo lahjoitusrahastot, yhdistä Stripe ja lisää Lahjoita-sivu B1.church-sivustolle jäseniä varten."
---

# Verkkolahjoitusten käyttöönotto

<div class="article-intro">

Käy läpi kaikki, mitä tarvitset verkkolahjoitusten vastaanottamiseen seurakunnassasi: lahjoitusrahastojen luominen, Stripe-maksupalvelun yhdistäminen maksujen käsittelyä varten ja lahjoitussivun jakaminen seurakuntalaisille. Lopuksi jäsenet voivat antaa lahjoituksia verkkosivuston ja mobiilisovelluksen kautta.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- B1 Admin -tili, jolla on ylläpitäjän oikeudet – katso [Roolit ja oikeudet](../people/roles-permissions.md)
- Stripe-tili (voit luoda ilmaisen tilin osoitteessa [stripe.com](https://stripe.com), jos sellaista ei vielä ole)

</div>

## Vaihe 1: Luo lahjoitusrahastot

Rahastot ovat lahjoittajien valitsemia lahjoituskohteita. Tarvitset vähintään yhden rahaston ennen kuin voit vastaanottaa lahjoituksia.

Luo lahjoituskohteesi noudattamalla [Rahastot](../donations/funds.md) -ohjetta:

1. Luo yleisimmin käytetyt rahastot (esim. "Yleisrahasto", "Rakennusrahasto", "Lähetystyö")
2. Merkitse verovähennyskelpoiset rahastot asianmukaisesti – tämä vaikuttaa vuoden lopun lahjoitustodistuksiin

:::tip
Voit lisätä rahastoja milloin tahansa. Aloita yleisimmillä lahjoituskohteillasi.
:::

## Vaihe 2: Yhdistä Stripe

Stripe hoitaa kaikki maksut. Yhdistät Stripe-tilisi B1 Adminiin, jotta lahjoitukset siirtyvät pankkitilillesi.

Yhdistä Stripe noudattamalla [Verkkolahjoitusten käyttöönotto](../donations/online-giving-setup.md) -ohjetta:

1. Kirjaudu Stripe-hallintapaneeliisi ja hae julkinen avain (Publishable Key) sekä salainen avain (Secret Key)
2. Siirry B1 Adminissa kohtaan Asetukset ja syötä molemmat avaimet

:::warning
Stripe näyttää salaisen avaimen vain kerran. Kopioi ja tallenna se ennen kuin poistut Stripe-hallintapaneelista. Jos menetät sen, sinun on luotava uusi avain.
:::

## Vaihe 3: Lisää lahjoitussivu verkkosivustollesi

Tee lahjoittamisesta helppoa lisäämällä B1-verkkosivustollesi lahjoitussivu.

Lisää lahjoitussivu noudattamalla [Verkkolahjoitusten käyttöönotto](../donations/online-giving-setup.md) ja [Sivujen hallinta](../website/managing-pages.md) -ohjeita:

1. Lisää "Lahjoita"-välilehti B1.church-sivustollesi
2. Lahjoitusosoitteesi on: `https://yoursubdomain.b1.church/donate`
3. Jäsenet voivat antaa lahjoituksia kirjautumatta (julkinen sivu) tai kirjautua sisään tallennettujen maksutapojen ja lahjoitushistorian käyttöä varten

## Vaihe 4: Tee koelahjoitus

Varmista ennen seurakunnan tiedottamista, että kaikki toimii.

1. Tee pieni koelahjoitus varmistaaksesi, että koko prosessi toimii alusta loppuun
2. Tarkista, että lahjoitus näkyy B1 Adminissa kohdassa Lahjoitukset

:::tip
Käytä ensin Stripen testitilaa, jos haluat tarkistaa prosessin ilman oikeita veloituksia. Vaihda sen jälkeen live-tilaan ennen kuin tiedotat seurakuntalaisille.
:::

## Vaihe 5: Tiedota seurakuntalaisille

Kerro asiasta, jotta jäsenet tietävät voivat antaa lahjoituksia verkossa.

1. Jaa lahjoitusosoite verkkosivuston, sähköposti-uutiskirjeiden, kirkkotiedotteiden ja sosiaalisen median kautta
2. Jäsenet voivat antaa lahjoituksia myös [B1 Mobile -sovelluksen](../../b1-mobile/giving/index.md) kautta – lahjoitusominaisuus on sovelluksessa valmiina

:::info
Kirjautuneet jäsenet voivat tallentaa maksutapoja, asettaa toistuvia lahjoituksia ja tarkastella lahjoitushistoriaansa. Myös anonyymi lahjoittaminen onnistuu – kirjautuminen ei ole pakollista.
:::

## Vaihe 6: Jatkuva ylläpito

Pidä lahjoitustietue ajan tasalla ja luo raportteja läpi vuoden.

1. [Tuo Stripe-tapahtumat](../donations/stripe-import.md) säännöllisesti (viikoittain tai kuukausittain), jotta tietueesi pysyvät ajan tasalla
2. [Tarkastele lahjoitusraportteja](../donations/donation-reports.md) seurataksesi lahjoitustrendejä ja rahastokohtaisia summia
3. [Luo vuoden lopun lahjoitustodistukset](../donations/giving-statements.md) lahjoittajiesi verotusta varten

:::tip
Suorita Stripe-tuonnit vähintään kerran kuukaudessa, jotta tietosi pysyvät ajan tasalla. Koko vuoden lopun prosessi on kuvattu [Vuoden lopun raportit -oppaassa](./year-end-reports.md).
:::

## Valmista!

Seurakuntasi vastaanottaa nyt verkkolahjoituksia. Jäsenet voivat antaa lahjoituksia verkkosivuston, B1 Mobile -sovelluksen tai minkä tahansa selaimella varustetun laitteen kautta. Kaikki lahjoitukset kirjautuvat automaattisesti B1 Adminiin.

## Liittyvät artikkelit

- [Rahastot](../donations/funds.md) – luo ja hallitse lahjoituskohteita
- [Erät](../donations/batches.md) – järjestä lahjoitukset ryhmiin
- [Lahjoitusten kirjaaminen](../donations/recording-donations.md) – syötä käteis- ja shekkilahjoitukset manuaalisesti
- [Stripe-tuonti](../donations/stripe-import.md) – tuo verkkotapahtumat B1 Adminiin
- [Lahjoitusraportit](../donations/donation-reports.md) – tarkastele lahjoitustrendejä ja summia
- [Lahjoitustodistukset](../donations/giving-statements.md) – luo vuoden lopun verotodistukset
- [Lahjoittaminen (web)](../../b1-church/giving/making-donations.md) – jäsenen lahjoituskokemus
- [Lahjoittaminen (mobiili)](../../b1-mobile/giving/making-donations.md) – lahjoittaminen mobiilisovelluksesta

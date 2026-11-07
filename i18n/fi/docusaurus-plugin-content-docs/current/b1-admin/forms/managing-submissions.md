---
title: "Lomakevastausten hallinta"
description: "Tarkastele, tulosta ja uudelleenohjaa lomakevastauksia B1 Adminissa, siirrä vastaukset oikealle henkilölle ja seuraa vierailijakortteja ja rukouspyyntöjä."
---

# Lomakevastausten hallinta

<div class="article-intro">

Kun lomakkeesi on julkaistu, vastauksia alkaa tulla. Välilehdellä **Lomakevastaukset** voit tarkastella jokaista vastausta, seurata, ketkä ovat lähettäneet lomakkeen, ja käyttää tietoja seurakuntalaistesi kanssa tehtävään seurantaan ajoissa.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Luo lomake](./creating-forms.md), jossa on vähintään yksi kysymys
- Jaa lomake sen julkisella osoitteella tai upota se [verkkosivustollesi](../website/managing-pages.md)

</div>

## Vastausten tarkastelu

1. Avaa [Jump-valikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki B1 Adminin yläreunassa vasemmalla), laajenna **Ihmiset**-kohta ja napsauta **Lomakkeet**.
2. Napsauta lomaketta, jonka vastauksia haluat tarkastella.
3. Siirry välilehdelle **Lomakevastaukset**.

Näet luettelon kaikista lomakkeeseen saaduista vastauksista. Jokaisessa vastauksessa näkyvät vastaajan tiedot ja lähetyspäivämäärä, minkä jälkeen on yksi sarake jokaiselle lomakkeen kysymykselle. Jos lomakkeessasi on paljon kysymyksiä, vieritä taulukkoa sivusuunnassa nähdäksesi loput sarakkeet.

## Yksittäisten vastausten tarkastelu

Napsauta mitä tahansa vastausta nähdäksesi kaikki tiedot. Näet kaikki vastaukset, jotka henkilö on antanut lomakkeen kysymyksiin.

Napsauta vastauksen vieressä olevaa **tulostuskuvaketta** tulostaaksesi henkilön täytetyt vastaukset. Tämä on hyödyllistä, kun tarvitset paperikopion arkistoon tai allekirjoitetun suostumuslomakkeen, joka pitää säilyttää. Tulosteen yläreunassa on keskitettynä seurakuntasi logo (**Light Background Logo** kohdasta [Verkkosivusto > Ulkoasu](../website/appearance.md), jos olet ladannut sellaisen) ja seurakuntasi nimi sen alla. Tulosteissa on aina tumma teksti valkoisella pohjalla, vaikka käyttäisit B1 Adminia tummassa tilassa. Tämä on eri toiminto kuin [tyhjän lomakkeen tulostaminen](./creating-forms.md#printing-a-blank-form), sillä se tulostaa yhden henkilön jo lähettämät vastaukset eikä tyhjää kopiota. Tulostuskuvake näkyy kaikkialla, missä vastaus näytetään, myös [henkilön profiilissa](../people/adding-people.md#working-with-forms).

## Vastauksen henkilön vaihtaminen

Jos vastaus on linkitetty väärään henkilöön (esimerkiksi kaksi perheenjäsentä jakaa saman sähköpostiosoitteen), voit siirtää vastauksen oikealle henkilölle tai irrottaa sen.

1. Napsauta välilehdellä **Lomakevastaukset** henkilön nimen vieressä olevaa **Vaihda henkilö** -kuvaketta (kaksi nuolta). Sama kuvake näkyy vastauksen vieressä [henkilön profiilissa](../people/adding-people.md#working-with-forms).
2. Etsi **Vaihda henkilö** -valintaikkunassa oikea henkilö ja napsauta **Siirrä tähän henkilöön**.
3. Tai napsauta **Unlink (Anonymous)** irrottaaksesi vastauksen mistä tahansa henkilöstä. Sen jälkeen se näkyy nimellä **Anonymous**.

Vain linkitys muuttuu. Vastaukset pysyvät ennallaan, eikä seurantasähköposteja lähetetä uudelleen.

:::info
Lomakkeilla, jotka luovat henkilötietueen, kun joku on kirjautunut seurakuntasi sivustolle lähettäessään vastausta, vastaus linkitetään hänen omaan tietueeseensa, vaikka toisella henkilöllä tietokannassasi olisi sama sähköpostiosoite. Kun [yhdistät kaksi henkilötietuetta](../people/adding-people.md), poistetun henkilön lomakevastaukset siirtyvät henkilölle, jonka säilytät.
:::

## Miten vastaukset kerätään

Vastauksia voi tulla useita kanavia kautta:

- **Julkinen osoite** -- Jos lomakkeellasi on julkinen osoite (itsenäiset lomakkeet), kuka tahansa linkin omaava voi lähettää vastauksen. Jaa osoite sähköpostitse, sosiaalisessa mediassa tai tekstiviesteillä.
- **Upotettu verkkosivustollesi** -- B1-verkkosivustollesi upotetut lomakkeet keräävät vastauksia automaattisesti, kun kävijät täyttävät ne.
- **Sisäinen käyttö** -- Henkilökunta ja vapaaehtoiset voivat myös lähettää lomakkeita muiden puolesta suoraan B1 Adminissa.

:::tip
Tarkista säännöllisesti välilehti **Lomakevastaukset** lomakkeiden, kuten vierailijakorttien tai rukouspyyntöjen, osalta, jotta voit seurata niitä nopeasti.
:::

## Vastaustietojen käyttö

Lomakkeiden kautta kerättyjen tietojen avulla voit:

- Seurata tapahtumailmoittautumisia ja suunnitella niiden mukaan
- Seurata vierailijoita tai uusia jäseniä
- Kerätä palautetta kyselyillä palvelutyön suunnittelua varten
- Käsitellä maksuja tapahtumista tai ohjelmista

:::info
Lomakkeen jäsenillä, joilla on rooli **Admin** tai **View Only**, on pääsy välilehdelle **Lomakevastaukset**. Varmista, että tiimisi oikeilla ihmisillä on pääsy tarvitsemiinsa lomakkeisiin, hallitsemalla rooleja välilehdellä **Lomakkeen jäsenet**.
:::

:::info
Jos itsenäinen lomake on [linkitetty ryhmään](./creating-forms.md#linking-a-form-to-a-group), ryhmän johtajat voivat lukea ja tulostaa sen vastaukset ryhmän sivulta B1.churchissa ilman, että he ovat lomakkeen jäseniä. Johtajat voivat myös lukea ryhmänsä tapahtumien ilmoittautumiskysymysten vastaukset siellä. Katso [Ryhmän tiedot](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Jos **itsenäinen** lomake on asetettu luomaan henkilötietue, kaikki olemassa olevaan henkilöön yhdistetyt vastaukset näkyvät myös henkilön sivun Ihmiset-osion **Lomakkeet**-kohdassa, ei vain Ihmiset-tyyppisissä lomakkeissa.
:::

## Seuraavat vaiheet

- Opi rakentamaan ja mukauttamaan lomakkeita sivulla [Lomakkeiden luominen](./creating-forms.md)
- Lisää henkilöitä lomakevastauksista [henkilöluetteloon](../people/adding-people.md) jatkuvaa seurantaa varten
- [Linkitä lomake ryhmään](./creating-forms.md#linking-a-form-to-a-group), jotta sen johtajat voivat lukea vastaukset, tai [lisää lähettäjät automaattisesti ryhmään](./creating-forms.md#automatically-adding-submitters-to-a-group), jotta itsenäinen ilmoittautumislomake muodostaa oman osallistujalistansa

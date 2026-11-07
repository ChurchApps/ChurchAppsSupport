---
title: "Blogi"
---

# Blogi

<div class="article-intro">

Blogi-sivun avulla voit julkaista uutisia, päivityksiä ja hartauksia kirkkosi verkkosivuille. Kirjoitukset näkyvät korttilistauksena osoitteessa `/blog`, omilla osoitteillaan sekä RSS-syötteessä, jota muut työkalut (kuten Zapier) voivat seurata uusien kirjoitusten varalta.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Suorita verkkosivustosi [Alkuasetukset](initial-setup)
- Lisää navigointilinkki osoitteeseen `/blog` kohdasta [Sivujen hallinta](managing-pages), jos haluat kävijöiden löytävän blogisi valikosta

</div>

## Blogin avaaminen

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa) ja laajenna kohta **Verkkosivusto**.
2. Napsauta **Blogi**.
3. Blogi-sivu listaa kaikki kirjoitukset sekä niiden tilan ja julkaisupäivän.

## Kirjoituksen lisääminen

1. Napsauta **Lisää kirjoitus** oikeassa yläkulmassa.
2. Kirjoita **Otsikko**. URL-ystävällinen **Verkko-osoite** (slug) luodaan automaattisesti kirjoittaessasi – voit muokata sitä suoraan, jos haluat toisen osoitteen.
3. Lisää **Tiivistelmä** – lyhyt yhteenveto, joka näkyy kirjoitusluettelossa, meta-kuvauksissa ja RSS-syötteessä. Jos jätät kentän tyhjäksi, se luodaan automaattisesti kirjoituksen sisällön alusta.
4. Kirjoita kirjoituksen runko **Sisältö**-editoriin Markdown-muodossa. Napsauta **Esikatselu** nähdäksesi, miltä muotoiltu kirjoitus näyttää.
5. Valitse **Luokka** (valitse olemassa oleva tai kirjoita uusi) ja halutessasi pilkulla erotetut **Tunnisteet**.
6. Napsauta **Valitse kuva** valitaksesi valokuvan [Tiedostot](files)-galleriastasi tai lataa uusi. Ladatut valokuvat avautuvat sisäänrakennettuun rajaustyökaluun, joka on lukittu 16:9-suhteeseen, jolloin voit rajata minkä tahansa valokuvan sopimaan kirjoituksen otsikkoon ja listakortteihin.
7. Aseta **Tekijä** – oletuksena se olet sinä, mutta voit hakea ja valita kenet tahansa tietokantasi henkilön.
8. Ota **Julkaistu** käyttöön ja aseta **Julkaisupäivä**, kun olet valmis julkaisemaan kirjoituksen. Jos jätät sen pois päältä, kirjoitus tallentuu luonnoksena.

:::tip
Aseta **Julkaisupäivä** tulevaisuuteen ajastaaksesi kirjoituksen. Se pysyy kävijöiltä piilossa ja näyttää **Ajastettu**-merkin blogiluettelossa, kunnes kyseinen päivä saapuu.
:::

## Kirjoitusten tilat

Jokainen luettelon kirjoitus näyttää yhden kolmesta tilasta:

- **Luonnos** – Ei julkaistu. Näkyy vain ylläpidossa.
- **Ajastettu** – Julkaistu on käytössä, mutta julkaisupäivä on tulevaisuudessa.
- **Julkaistu** – Näkyy verkkosivustollasi ja sisältyy RSS-syötteeseen.

## Kirjoitusten muokkaaminen, esikatselu ja poistaminen

- Napsauta kirjoituksen kohdalla **Muokkaa** tehdäksesi muutoksia.
- Napsauta **Näytä sivustolla** (näkyy julkaistuissa kirjoituksissa) avataksesi kirjoituksen verkkosivustollasi uudessa välilehdessä.
- Napsauta **Poista** poistaaksesi kirjoituksen pysyvästi.

## Miten kävijät näkevät blogisi

Julkaistut kirjoitukset näkyvät osoitteessa `{yoursite}/blog`, 10 kirjoitusta sivulla. Sivuilla selaamiseen käytetään linkkejä **Vanhemmat**/**Uudemmat**. Lisäksi sivulla on luokkasuodatin, ja jokaisen kirjoituksen tekijä ja kuva näkyvät. Myös tunnisteet ovat napsautettavia merkkejä, joiden avulla kävijät voivat suodattaa listaa tunnisteen mukaan samalla tavalla. Yksittäiset kirjoitukset ovat osoitteessa `{yoursite}/blog/{slug}` ja sisältävät samasta luokasta olevia aiheeseen liittyviä kirjoituksia. Blogisivu julkaisee myös RSS-syötteen, jonka syötelukijat ja automaatiotyökalut, kuten Zapier, löytävät automaattisesti.

:::info
Blogikirjoitukset ovat erillinen sisältötyyppi tavallisista verkkosivujen sivuista – niitä ei luoda [sivueditorilla](page-editor), eivätkä ne näy Sivut-luettelossa. Tämä pitää blogin kirjoittamisen nopeana ja keskittyneenä itse kirjoittamiseen.
:::

## Kommenttien lisääminen kirjoitusten alle

B1 ei itse isännöi blogikommentteja, mutta voit lisätä kommenttipalvelun. Voit myös lisätä jokaisen kirjoituksen alle muuta, kuten uutiskirjeen tilauslomakkeen tai lahjoituspainikkeen.

1. Rekisteröidy kommenttipalveluun, kuten [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) tai [Disqus](https://disqus.com), ja kopioi sen upotuskoodi.
2. Avaa Blogi-sivu ja vieritä kohtaan **Jokaisen kirjoituksen alla**.
3. Liitä upotuskoodi ja napsauta **Tallenna**.

Koodi näkyy jokaisen julkaistun kirjoituksen sisällön alla. Kommenttipalvelusi hoitaa moderoinnin ja roskapostin suodatuksen, joten tarkista sen hallintanäkymä säännöllisesti.

:::tip
Tyhjennä kenttä ja napsauta **Tallenna** poistaaksesi koodin kaikista kirjoituksista. Vain kirkkoasetusten muokkausoikeudet omaavat henkilöt näkevät tämän kentän.
:::

## Seuraavat vaiheet

- [Sivujen hallinta](managing-pages) – Lisää navigointilinkki blogiisi
- [Tiedostot](files) – Lataa kirjoituksissasi käytettäviä valokuvia
- [Zapier-integraatio](../integrations/zapier.md) – Käynnistä automaatioita, kun uusia kirjoituksia julkaistaan

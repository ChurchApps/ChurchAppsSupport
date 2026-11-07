---
title: "Ryhmien liittymispyynnöt"
---

# Ryhmien liittymispyynnöt

<div class="article-intro">

Kun ryhmä on määritetty hyväksyntään perustuvalla liittymiskäytännöllä, ihmiset voivat lähettää pyyntöjä liittyä ryhmään. Ryhmän johtajat ja ylläpitäjät tarkistavat pyynnöt ja hyväksyvät tai hylkäävät ne. Näin seurakunta voi hallita ryhmän jäsenyyksiä ja samalla helpottaa ihmisiä ilmaisemaan kiinnostuksensa liittyä ryhmään.

</div>

## Koulutusvideo

<YouTube id="1vj-suCiIsE" title="Ryhmien liittymispyynnöt ja ryhmäkalenterit B1:ssä" next="Palvelujen ja osallistumisen määrittäminen B1:ssä" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Ennen kuin aloitat</h4>

- Tarvitset luvan hallita ryhmiä tai sinun on oltava tietyn ryhmän johtaja. Katso lisätietoja sivulta [Roolit ja oikeudet](../people/roles-permissions.md).
- Ryhmän liittymiskäytännöksi on asetettava **Pyyntö** (vaatii hyväksynnän). Katso ohjeet liittymiskäytäntöjen määrittämiseen sivulta [Ryhmien luominen](./creating-groups.md).

</div>

## Liittymiskäytännöt

Ryhmillä voi olla kolme eri liittymiskäytäntöä:

- **Avoin** -- Kuka tahansa voi liittyä heti ilman hyväksyntää
- **Pyyntö** -- Ihmiset lähettävät liittymispyynnön, joka vaatii hyväksynnän
- **Suljettu** -- Kukaan ei voi pyytää liittymistä (jäsenet on lisättävä manuaalisesti)

Kun ryhmässä käytetään **Pyyntö**-käytäntöä, kaikki liittymisyritykset kulkevat tällä sivulla kuvatun hyväksymisprosessin kautta.

## Odottavien pyyntöjen tarkastelu

### Ryhmien johtajille

1. Avaa B1 Adminissa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) ja valitse **Ihmiset > Ryhmät**
2. Napsauta ryhmän nimeä
3. **Jäsenet**-osiossa näkyy, montako pyyntöä odottaa käsittelyä. Napsauta **Kaikki jäsenet** -- tämän ryhmän odottavat pyynnöt näkyvät jäsenluettelon yläosassa

### Ylläpitäjille

Ylläpitäjät, joilla on ryhmien hallintaoikeudet, voivat tarkastella odottavia pyyntöjä kaikissa ryhmissä:

1. Valitse Hyppyvalikosta **Ihmiset > Ryhmät**
2. Napsauta sivun otsikossa **odottavat pyynnöt** -painiketta (esimerkiksi "3 odottavaa pyyntöä"). Painike näkyy vain, kun pyyntöjä odottaa käsittelyä.
3. Tarkista kaikki odottavat pyynnöt koko seurakunnassa

## Liittymispyynnön tarkastelu

Jokainen liittymispyyntö näyttää seuraavat tiedot:

- **Henkilön nimi ja kuva** -- Henkilö, joka pyytää liittymistä
- **Valinnainen viesti** -- Henkilökohtainen viesti, jossa kerrotaan, miksi hän haluaa liittyä (jos viesti on annettu)
- **Pyynnön päivämäärä** -- Milloin pyyntö lähetettiin

Pyynnön tarkastelu:

1. Lue henkilön viesti, jos hän on kirjoittanut sellaisen
2. Tarvittaessa napsauta henkilön nimeä nähdäksesi hänen profiilinsa
3. Päätä, hyväksytkö vai hylkäätkö pyynnön

## Pyynnön hyväksyminen

1. Napsauta liittymispyynnön kohdalla **Hyväksy**
2. Henkilö lisätään välittömästi ryhmän jäseneksi
3. Pyynnön lähettäjä saa ilmoituksen, että hänen pyyntönsä on hyväksytty
4. Pyyntö merkitään järjestelmässä hyväksytyksi

:::tip
Kun hyväksyt pyynnön, henkilöstä tulee tavallinen ryhmän jäsen. Voit myöhemmin ylentää hänet ryhmän johtajaksi [Ryhmän jäsenet](./group-members.md) -sivulla.
:::

## Pyynnön hylkääminen

1. Napsauta liittymispyynnön kohdalla **Hylkää**
2. Anna halutessasi syy hylkäämiselle (enintään 500 merkkiä)
3. Napsauta **Vahvista**
4. Pyynnön lähettäjä saa ilmoituksen, johon sisältyy hylkäämisen syy (jos sellainen on annettu)
5. Pyyntö merkitään järjestelmässä hylätyksi

:::info
Hylkäämisen syyn antaminen auttaa henkilöä ymmärtämään, miksi hänen pyyntöään ei hyväksytty. Se voi myös rohkaista häntä yrittämään myöhemmin uudelleen tai tutustumaan muihin ryhmiin.
:::

## Hyväksyminen tehtäväsivulta

Jokainen liittymispyyntö luo myös tehtävän kohtaan **Palvelu &rarr; Omat työt**, jonka otsikko on "*Henkilö pyysi liittymistä ryhmään *Ryhmä*." Tehtävä osoitetaan ryhmän johtajille. Jos ryhmällä ei vielä ole johtajaa, tehtävä menee henkilökunnalle, jolla on oikeus **Ryhmän jäsenet &gt; Muokkaa**, tai seurakuntasi verkkotunnuksen pääkäyttäjille, jos kenelläkään ei ole tätä oikeutta. Tämän kautta tehtävän saaneet henkilökunta ja ylläpitäjät saavat myös ilmoituksen, josta pääsee suoraan tehtävään.

Tehtävän avaaminen näyttää pyynnön lähettäjän nimen, ryhmän ja hänen mahdollisen viestinsä. Tehtäväkortissa on suoraan **Hyväksy**- ja **Hylkää**-painikkeet. (Hylkää avaa saman valinnaisen syykentän, joka on kuvattu yllä.) Näin johtajilla on toinen, ilmoitusten kautta toimiva tapa käsitellä pyyntöjä ilman, että he avaavat ryhmän jäsenluetteloa.

Pyynnön käsitteleminen jommastakummasta paikasta -- ryhmän jäsenluettelosta tai tehtäväkortista -- sulkee pyynnön kaikkialta, joten johtajat eivät näe vanhentunutta tehtävää pyynnöstä, johon joku on jo vastannut.

## Ilmoitukset

Liittymispyyntöjärjestelmä lähettää automaattisesti seuraavat ilmoitukset:

- **Kun pyyntö lähetetään** -- Kaikki ryhmän johtajat saavat ilmoituksen. Jos ryhmällä ei ole johtajaa, ilmoitus lähetetään sen sijaan tehtävän saaneille henkilökunnalle tai ylläpitäjille (katso yllä).
- **Kun pyyntö hyväksytään** -- Pyynnön lähettäjä saa vahvistuksen
- **Kun pyyntö hylätään** -- Pyynnön lähettäjä saa ilmoituksen, johon sisältyy mahdollinen hylkäämisen syy

Ilmoitukset näkyvät käyttäjän ilmoituskeskuksessa B1.church-sivustolla ja mobiilisovelluksessa. B1 Adminin ilmoituskellossa liittymispyynnön ilmoituksen (tai sen **Näytä tiedot** -painikkeen) napsauttaminen avaa ryhmän seurakuntasi B1.church-sivustolla uuteen välilehteen.

## Pyyntöjen hallinta jäsenen näkökulmasta

Henkilöt voivat hallita omia liittymispyyntöjään B1.church-sivustolla:

- Ryhmän tietosivulla he voivat nähdä odottavien pyyntöjensä tilan
- He voivat peruuttaa odottavan pyynnön, jos muuttavat mieltään
- He voivat nähdä, onko pyyntö hyväksytty vai hylätty

## Hyviä käytäntöjä

- **Vastaa nopeasti** -- Pyri käsittelemään pyynnöt 24-48 tunnin kuluessa, jotta ihmiset eivät jää odottamaan
- **Ole selkeä hylkäämisen syistä** -- Auta ihmisiä ymmärtämään seuraavat askeleet tai vaihtoehtoiset mahdollisuudet
- **Tarkista profiilit** -- Katso henkilön profiilia, jotta näet, sopiiko hän hyvin ryhmään
- **Kerro odotuksesi** -- Varmista, että ryhmän kuvaus selkeästi kertoo, kenelle ryhmä on tarkoitettu

## Aiheeseen liittyvät artikkelit

- [Ryhmien luominen](./creating-groups.md) -- Opi luomaan ryhmiä ja määrittämään liittymiskäytäntöjä
- [Ryhmän jäsenet](./group-members.md) -- Hallitse olemassa olevia ryhmän jäseniä
- [Ryhmäkalenteri](./group-calendar.md) -- Suunnittele ryhmän kokouksia ja tapahtumia

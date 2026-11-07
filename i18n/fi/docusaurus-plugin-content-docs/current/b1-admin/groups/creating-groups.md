---
title: "Ryhmien luominen"
---

# Ryhmien luominen

<div class="article-intro">

Ryhmän luominen B1 Adminissa on helppoa. Asetat ensin kategorian, nimeät ryhmän ja määrität sitten sen asetukset. Ryhmien avulla voit järjestää seurakuntasi merkityksellisiin kokonaisuuksiin, kuten pienryhmiin, toimikuntiin ja luokkiin.

</div>

## Koulutusvideo

<YouTube id="uG93pXVreNo" title="Ryhmien luominen ja jäsenten lisääminen B1:ssä" next="Ryhmien liittymispyynnöt ja ryhmäkalenterit B1:ssä" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset aktiivisen B1 Admin -tilin, jolla on oikeus hallita ryhmiä. Katso [Roolit ja oikeudet](../people/roles-permissions.md), jos et ole varma käyttöoikeuksistasi.
- Mieti ryhmiesi kategoriarakenne (esimerkiksi "Pienryhmät", "Palvelutyöt", "Toimikunnat"). Kategoriat auttavat pitämään toisiinsa liittyvät ryhmät järjestyksessä.

</div>

## Uuden ryhmän lisääminen

1. Avaa [Hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki B1 Adminin yläreunassa vasemmalla), laajenna kohta **People** ja valitse **Groups**.
2. Valitse sivun yläreunasta **Add Group**. Luettelon alapuolelle avautuu **New Group** -lomake. Kirjoita **Category Name**-kenttään kategorian nimi. Kategoriat auttavat järjestämään toisiinsa liittyvät ryhmät yhteen (esimerkiksi "Pienryhmät", "Palvelutyöt" tai "Toimikunnat"). Jos kategoria on jo olemassa, voit valita sen luettelosta.
3. Kirjoita ryhmän **Name**.
4. Valitse **Add**. Uusi ryhmäsi ilmestyy luetteloon, ja sen kategoria näkyy nimen alla.

## Ryhmän asetusten määrittäminen

Kun ryhmä on luotu, voit täydentää siitä lisätietoja:

1. Avaa ryhmä napsauttamalla sen **nimeä** luettelossa.
2. Valitse ryhmäsivun vasemmalla puolella, ryhmän tietojen alapuolella, **Edit**-painike.
3. Määritä seuraavat asetukset:
   - **Description** -- Lyhyt kuvaus ryhmän toiminnasta. Jäsenet näkevät tämän.
   - **Meeting Times** -- Milloin ryhmä yleensä kokoontuu (esimerkiksi "Keskiviikkoisin klo 19").
   - **Join Policy** -- Valitse, kuka voi liittyä tähän ryhmään:
     - **Open** -- Kuka tahansa voi liittyä heti ilman hyväksyntää
     - **Request** -- Ihmisten on lähetettävä liittymispyyntö, joka vaatii hyväksynnän (katso [Ryhmien liittymispyynnöt](./group-join-requests.md))
     - **Closed** -- Johtajat tai ylläpitäjät lisäävät jäsenet manuaalisesti
   - **Labels** -- Lisää ryhmään yksi tai useampi kuvaava tunniste (esimerkiksi "Paikan päällä", "Verkossa", "Uudet jäsenet tervetuloa"). Tunnisteet ovat itse määrittelemiäsi vapaamuotoisia merkintöjä; valitse kaikki sopivat. Tunnisteilla voi suodattaa ryhmiä Groups Browser -verkkosivuelementissä.
   - **Confidential group** -- Piilottaa ryhmän ja sen jäsenluettelon julkisilta sivuilta, ryhmähakupalvelusta ja ryhmän ulkopuolisilta. Käytä tätä arkaluonteisille ryhmille, kuten päihde- tai neuvontatyölle; vain ryhmän jäsenet ja seurakunnan henkilökunta näkevät sen.
   - **Discussions** -- Kytkee ryhmän keskustelusyötteen päälle tai pois. Kaikki jäsenet voivat kirjoittaa siihen. Oletuksena päällä.
   - **Announcements** -- Kytkee päälle toisen, vain johtajien kirjoittamaan keskustelusyötteen: jäsenet voivat lukea ja reagoida, mutta vain johtajat voivat kirjoittaa. Oletuksena päällä.
   - **Attendance Tracking** -- Ota tämä käyttöön, jos haluat kirjata ryhmän [läsnäolot](../attendance/tracking-attendance.md).
   - **Service Times** -- Liitä ryhmä tiettyihin jumalanpalvelusaikoihin, jos se on tarpeen. Lisätietoja palvelusajoista on kohdassa [Läsnäolojen määrittäminen](../attendance/setup.md).
4. Tallenna muutokset valitsemalla **Save**.

:::tip
Selkeä kuvaus ja kokoontumisaika auttavat jäseniä tietämään, mitä odottaa liittyessään ryhmään.
:::

:::info
Jos poistat sekä Discussions- että Announcements-asetuksen käytöstä, Messages-välilehti poistuu ryhmästä kokonaan jäsenportaalista. Jos poistat vain toisen, sen välilehti piilotetaan ja jäsenet siirretään siihen syötteeseen, joka on yhä käytössä. Olemassa olevat viestit säilyvät kummassakin tapauksessa; kytkimet ohjaavat vain uusien viestien kirjoittamista.
:::

## Ryhmän monistaminen

Aloitatko uutta kokoontumiskautta toistuvalle luokalle tai palvelutyölle? Sen sijaan, että syöttäisit kaikki asetukset uudelleen, monista olemassa oleva ryhmä:

1. Avaa ryhmä ja valitse **Duplicate** (ryhmäsivun vasemmalla puolella **Edit**-painikkeen alapuolella).
2. Vahvista monistaminen.

Kopio perii alkuperäisen ryhmän asetukset: kategorian, kuvauksen, kokoontumisajan ja -paikan, liittymiskäytännön, tunnisteet ja kampuksen. Se **ei** kuitenkaan peri jäseniä. Uuden ryhmän nimi on alkuperäisen nimi, johon on lisätty " (Copy)". Nimeä ryhmä uudelleen ryhmäasetuksista.

## Ryhmän arkistoiminen

Kun ryhmä ei ole enää aktiivinen mutta haluat säilyttää sen historian sen poistamisen sijaan:

1. Avaa ryhmä ja valitse **Edit** muokataksesi sen asetuksia.
2. Valitse **Archive** ja vahvista.

Arkistoidut ryhmät katoavat pääryhmäluettelosta. Löytääksesi ryhmän uudelleen, valitse Groups-sivun yläreunassa kategoriapainikkeiden vierestä **Show archived** ja palauta ryhmä valitsemalla sen vierestä **Restore**.

:::info
Ryhmän arkistoiminen ei poista sen jäseniä, läsnäolohistoriaa tai kalenteritapahtumia. Se piilottaa ryhmän vain oletusluettelosta, kunnes palautat sen.
:::

## Seuraavat vaiheet

Kun olet luonut ja määrittänyt ryhmäsi, voit:

- **Lisätä jäseniä** -- Hae henkilöitä ja lisää heidät ryhmään. Määritä ryhmänjohtajat tähtikuvakkeella (**Make Leader**). Katso [Ryhmän jäsenet](./group-members.md).
- **Luoda kalenterin** -- Luo ryhmälle tapahtumia ja toistuvia kokoontumisia. Katso [Ryhmäkalenteri](./group-calendar.md).
- **Viestiä** -- Lähetä viestejä suoraan kaikille ryhmän jäsenille ryhmäsivulta.
- **Viedä tietoja** -- Lataa jäsenluettelo valitsemalla **Export** ryhmän jäsenluettelon yläpuolelta.

:::info
Jokainen ryhmä kuuluu kategoriaan, ja pääryhmäsivulla voit suodattaa luetteloa kategorian mukaan. Voit aina järjestellä tai nimetä kategorioita uudelleen seurakunnan kasvaessa.
:::

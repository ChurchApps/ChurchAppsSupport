---
title: "Tietojen vieminen"
---

# Tietojen vieminen

<div class="article-intro">

B1 Adminin avulla voit viedä seurakuntasi tiedot, jotta voit käyttää niitä taulukkolaskennassa, jakaa niitä tiimisi kanssa tai tallentaa varmuuskopion. Tarvitsetko nopean luettelon nimistä ja sähköpostiosoitteista vai koko tietokannan viennin, saatavilla on vaihtoehdot tarpeisiisi.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset aktiivisen B1 Admin -tilin, jolla on oikeus tarkastella vietäviä tietoja. Katso [Roolit ja oikeudet](roles-permissions.md), jos et ole varma käyttöoikeuksistasi.
- Koko tietokannan vientiä varten tarvitset pääsyn **Asetukset**-osioon.

</div>

## Vieminen Henkilöt-sivulta

Nopein tapa viedä hakemistosi on suoraan **Henkilöt**-sivulta:

1. Avaa [Pikavalikko](../introduction.md#getting-around-with-the-jump-menu) (B1 Adminin yläreunan vasemmalla oleva hakupalkki), laajenna **Henkilöt**-kohta ja napsauta **Henkilöt**-linkkiä.
2. Rajaa vietävät tulokset hakupalkin tai suodattimien avulla (tai jätä suodattamatta, jos haluat viedä kaikki). Katso [Henkilöiden haku](searching-people.md) saadaksesi vinkkejä suodattamiseen.
3. Napsauta **Vie**-painiketta Henkilöt-sivun otsikkorivillä.
4. Tulokset sisältävä CSV-tiedosto latautuu tietokoneellesi. Se sisältää nykyisissä tuloksissa olevien henkilöiden nimen, yhteystiedot, osoitteen ja muut yleiset kentät.

:::tip
Vienti sisältää kaikki nykyisissä tuloksissasi olevat henkilöt. Suorita ensin haku, lataa [Tallennettu lista](./lists.md) tai käytä **Tarkennettu** hakua, jotta viet vain tarvitsemasi henkilöt.
:::

## Koko tietokannan vienti Asetuksista

Jos haluat viedä kaikki B1-tietosi (ei pelkästään henkilöitä), käytä vientityökalua Asetuksissa:

1. Valitse pikavalikosta **Asetukset > Asetukset**.
2. Napsauta seurakuntasi nimen alla olevaa **Tuonti/Vienti**-linkkiä asetusten vasemmanpuoleisessa valikossa.
3. Valitse **Tietolähde**-pudotusvalikosta **B1-tietokanta**.
4. Tarkista tietojen esikatselu ja napsauta **Jatka kohteeseen**.
5. Valitse vientikohteeksi **B1-vientizip**.
6. Seuraa viennin edistymistä, kunnes kaikki kohteet näyttävät vihreitä valintamerkkejä.
7. Vientitiedosto latautuu automaattisesti. Etsi latauskansiostasi `B1Export`-tiedosto.
8. Pura tiedosto, jotta pääset yksittäisiin CSV-tiedostoihin (kuten `people.csv`), jotka voit avata Excelissä, Google Sheetsissä tai Numbersissa.

:::info
B1-vientizip on seurakuntasi tietojen täydellinen varmuuskopio. Se sisältää:

- henkilöt (kuvineen) ja taloudet, mukaan lukien talouden noutajien yhteystiedot
- kampukset, palvelut ja palveluajat
- ryhmät ja ryhmäjäsenet
- rahastot ja lahjoitukset, mukaan lukien useisiin rahastoihin jaetut lahjoitukset
- läsnäolo
- lomakkeet, kysymykset, vastaukset ja vastaukset
- mukautetut kentät ja niiden arvot
- tallennetut henkilöluettelot

Jos henkilön kuvaa ei voida ladata tai lukea viennin aikana, kuva ohitetaan ja vienti jatkuu ilman sitä.

Palauttaaksesi tiedot valitse lähteeksi **B1-tuontizip** ja kohteeksi **B1-tietokanta** (katso [Tietojen tuonti](./importing-data.md)). Taloudet, noutajien yhteystiedot ja tallennetut luettelot rakennetaan uudelleen henkilöiden mukana. Tallennettujen luetteloiden suodattimet osoitetaan palautetuille ryhmille, rahastoille, kampuksille ja mukautetuille kentille.
:::

## Ryhmätietojen vieminen

Voit viedä myös yksittäisten ryhmien jäsenluettelot. Avaa **Ryhmät**-sivulta haluamasi ryhmä ja napsauta **latauskuvaketta**, jolloin ryhmän jäsenluettelo viedään. Lisätietoja on kohdassa [Ryhmän jäsenet](../groups/group-members.md).

:::info
CSV-tiedostot toimivat kaikissa yleisissä taulukkolaskentaohjelmissa, kuten Microsoft Excelissä, Google Sheetsissä ja Apple Numbersissä.
:::

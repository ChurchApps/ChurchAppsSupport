---
title: "Aloitus B1 Adminin verkkosivuston kanssa"
sidebar_label: "Alkuasetukset"
description: "Määritä B1 Adminin seurakuntasivusto: osoita alidomain tai oma verkkotunnus, luo etusivu, valitse brändivärit ja logo sekä rakenna navigointi."
---

# Alkuasetukset

<div class="article-intro">

Jokaisella B1-tilillä on valmis verkkosivusto. Tässä oppaassa käydään läpi kirkkosi verkkotunnuksen määrittäminen, sivustosi ulkoasun muokkaaminen, ensimmäisten sivujen luominen ja navigaation järjestäminen.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset B1.church-tilin, jolla on ylläpitäjän oikeudet
- Jos käytät omaa verkkotunnusta, pidä DNS-palveluntarjoajasi kirjautumistiedot valmiina (esim. GoDaddy, Cloudflare tai AWS)
- Valmistele kirkkosi logo PNG-muodossa läpinäkyvällä taustalla, jotta tulos on paras mahdollinen

</div>

## Verkkotunnuksen määrittäminen

Kirkkosi saa automaattisesti aliverkkotunnuksen B1.church-palvelussa (esimerkiksi `yourchurch.b1.church`). Voit myös osoittaa oman mukautetun verkkotunnuksesi B1-sivustoosi.

1. Siirry osoitteeseen admin.b1.church tai napsauta profiilisi avattavaa valikkoa ja valitse **Vaihda sovellusta**.
2. Avaa [hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna kohta **Asetukset** ja napsauta **Asetukset**.
3. Avaa **Kirkon tiedot** -osio nähdäksesi aliverkkotunnuksesi. Aseta se lyhyeksi ja helposti tunnistettavaksi ilman välilyöntejä.
4. Jos haluat käyttää omaa verkkotunnusta, kirjaudu DNS-palveluntarjoajaasi (kuten GoDaddy, Cloudflare tai AWS) ja lisää kaksi tietuetta:
   - **A-tietue** juuriverkkotunnukselle, joka osoittaa osoitteeseen `3.23.251.61`
   - **CNAME-tietue** `www`-alidomainille, joka osoittaa osoitteeseen `proxy.b1.church`
5. Palaa B1.church Adminiin, avaa saman Asetukset-sivun **Verkkotunnukset**-osio, lisää oma verkkotunnuksesi luetteloon ja napsauta ensin **Lisää** ja sitten **Tallenna**. Sivustosi on käytettävissä omalla verkkotunnuksellasi muutaman minuutin kuluessa.

:::tip
Jos et näe Asetukset-vaihtoehtoa, pyydä henkilöltä, joka perusti kirkkosi tilin, että hän antaa sinulle oikeuden "Muokkaa kirkon asetuksia". Lisätietoja on kohdassa [Roolit ja oikeudet](../settings/roles-permissions.md).
:::

## Ensimmäisen sivun luominen

1. Avaa B1 Admin -sovelluksessa [hyppyvalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna kohta **Verkkosivusto** ja napsauta **Sivut**.
2. Napsauta **Lisää sivu** oikeassa yläkulmassa.
3. Valitse sivutyypiksi **Tyhjä** ja nimeä sivu "Etusivu".
4. Napsauta **Sivun asetukset** ja aseta etusivusi URL-poluksi `/` (vinoviiva ilman muuta tekstiä). Muiden sivujen polku on muotoa `/sivun-nimi`.
5. Aloita rakentaminen napsauttamalla **Muokkaa sisältöä**. Jokaisen sivun on alettava **osiolla**, joka on kaikkien muiden elementtien säiliö.
6. Lisättyäsi osion napsauta uudelleen **Lisää sisältöä** ja lisää tekstiä, kuvia, videoita, kortteja, lomakkeita ja muuta vetämällä ne osioon.

:::info
Lisätietoja sivujen ja navigaation käsittelystä on kohdassa [Sivujen hallinta](./managing-pages.md). Kattavan oppaan visuaaliseen editoriin löydät kohdasta [Sivueditorin käyttö](./page-editor.md).
:::

## Sivuston ulkoasun määrittäminen

1. Valitse hyppyvalikosta **Verkkosivusto > Ulkoasu**.
2. Aseta brändivärisi käyttämällä **Väripalettia** ensisijaisille, toissijaisille ja korostusvärisävyille.
3. Valitse kohdassa **Fontit** otsikko- ja leipätekstin fontit fonttiselaimesta.
4. Lataa kirkkosi logo kohtaan **Logo** tyyliasetuksissa. Anna sekä vaalean että tumman taustan versio.
5. Määritä **Sivuston alatunniste** kirkkosi yhteystiedoilla ja linkeillä.

:::info
Ulkoasussa tekemäsi muutokset koskevat koko verkkosivustoasi. Katso ohjeet kullekin asetukselle sivulta [Ulkoasu](./appearance.md).
:::

## Navigaation määrittäminen

Navigaatiolinkkisi näkyvät Verkkosivun sivut -näkymässä. Voit järjestää ne seuraavasti:

1. Napsauta **Lisää** luodaksesi uuden navigaatiolinkin ja osoita se yhdelle sivuistasi.
2. Järjestä linkit uudelleen vetämällä ja pudottamalla tai sijoita ne ylätason kohtien alle.
3. Esikatsele sivustoasi varmistaaksesi, että navigaatio näyttää oikealta.

## Seuraavat vaiheet

- [Sivujen hallinta](./managing-pages.md) -- Opi käsittelemään sivuja ja navigaatiota yksityiskohtaisesti
- [Ulkoasu](./appearance.md) -- Hienosäädä sivustosi värejä, fontteja ja asettelua
- [Tiedostot](./files.md) -- Lataa kuvia ja asiakirjoja verkkosivustollesi

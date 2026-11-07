---
title: "Opas: Julkaise seurakuntasi verkkosivusto"
---

# Julkaise seurakuntasi verkkosivusto

<div class="article-intro">

B1.church sisältää täydellisen verkkosivujen rakentajan ilman lisämaksua. Tämä opas opastaa sinut luomaan seurakuntasi verkkosivuston alusta alkaen: kotisivun määrittämisen, ulkoasun ja tyylin asetukset, tärkeiden sivujen lisäämisen sekä halutessasi verkkolahjoitusten ja tapahtumailmoittautumislomakkeiden yhdistämisen.

</div>

## Koulutusvideo

<YouTube id="aA4UahZpmXg" title="Seurakuntasi verkkosivuston julkaiseminen B1:ssä" next="Sivujen ja navigoinnin muokkaaminen B1:ssä" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Ennen kuin aloitat</h4>

- Ota seurakuntasi logo valmiiksi (PNG-muoto läpinäkyvällä taustalla toimii parhaiten)
- Valitse 2–3 brändiväriä sivustollesi
- Jos käytät omaa verkkotunnusta (esim. yourchurch.com), varmista, että sinulla on pääsy verkkotunnuspalvelusi (GoDaddy, Cloudflare jne.) hallintaan
- Jos haluat verkkolahjoitukset sivustollesi, suorita ensin [Verkkolahjoitusten määritys](../donations/online-giving-setup.md) (Stripe)

</div>

## Vaihe 1: Verkkosivuston alkuasetukset

Aloita luomalla kotisivusi ja sivuston perusrakenne.

Seuraa opasta [Verkkosivuston alkuasetukset](../website/initial-setup.md) ja:

1. Siirry B1 Adminissa kohtaan **Verkkosivusto**
2. Luo kotisivusi, jossa on pääkuva, tervehdysviesti ja tärkeimmät tiedot
3. Lisää seurakuntasi nimi ja iskulause

## Vaihe 2: Ulkoasun määrittäminen

Määritä sivustosi visuaalinen ilme: värit, fontit, logo ja alatunniste.

Seuraa opasta [Ulkoasu](../website/appearance.md) ja:

1. Lataa seurakuntasi logo
2. Aseta pää- ja korostusvärit
3. Määritä navigointipalkki ja alatunniste
4. Esikatsele muutoksesi

:::tip
Pidä väripaletti yksinkertaisena: yksi pääväri ja yksi korostusväri riittävät yleensä. Verkkosivujen rakentaja hoitaa loput.
:::

## Vaihe 3: Lisää sisältösivut

Rakenna sivut, joita kävijät tarvitsevat eniten.

Seuraa opasta [Sivujen hallinta](../website/managing-pages.md) ja luo sivuja, kuten:

- **Tietoa meistä**: Seurakuntamme tarina, uskomukset ja johtajuus
- **Saarnat**: Linkki [saarnakirjastoon](../sermons/managing-sermons.md)
- **Tapahtumat**: Tulevat tapahtumat ja ilmoittautuminen
- **Lahjoitukset**: Verkkolahjoitussivu (vaatii [Stripe-asetukset](../donations/online-giving-setup.md))
- **Yhteystiedot**: Sijainti, jumalanpalveluksen ajat ja yhteystiedot

## Vaihe 4: Yhdistä verkkotunnuksesi

Jos haluat käyttää omaa verkkotunnusta (kuten yourchurch.com) oletusosoitteen sijaan:

1. Siirry B1 Adminissa kohtaan **Asetukset** ja avaa **Verkkotunnukset**-osio
2. Syötä oma verkkotunnuksesi
3. Päivitä DNS-tietueet verkkotunnuspalvelussasi osoittamaan B1:een

:::info
DNS-muutosten leviäminen voi kestää jopa 48 tuntia. Sivustosi ei välttämättä ole heti saavutettavissa omalla verkkotunnuksellasi. Oletusosoite B1:ssä toimii tänä aikana edelleen.
:::

## Vaihe 5: Lisää lahjoitukset ja lomakkeet

Paranna sivustoasi interaktiivisilla elementeillä:

- **Verkkolahjoitukset**: Lisää lahjoitusosio, jotta jäsenet voivat lahjoittaa suoraan verkkosivustoltasi. Määritä Stripe ensin ohjeen [Verkkolahjoitusten määritys](../donations/online-giving-setup.md) mukaan.
- **Ilmoittautumislomakkeet**: Upota [itsenäisiä lomakkeita](../forms/creating-forms.md) tapahtumailmoittautumisiin, kävijäkortteihin tai vapaaehtoishakemuksiin. Katso ohjeet lomake-elementin lisäämisestä mille tahansa sivulle: [Sivujen hallinta](../website/managing-pages.md).

## Valmista!

Seurakuntasi verkkosivusto on julkaistu. Jaa osoite seurakuntalaisillesi ja sosiaalisessa mediassa. Voit päivittää sisältöä, lisätä uusia sivuja ja muokata ulkoasua milloin tahansa B1 Adminin hallintanäkymästä.

## Aiheeseen liittyvät artikkelit

- [Verkkosivuston alkuasetukset](../website/initial-setup.md): yksityiskohtainen asennusopas
- [Sivujen hallinta](../website/managing-pages.md): sivujen lisääminen ja muokkaaminen
- [Ulkoasu](../website/appearance.md): värit, logo ja asettelu
- [Tiedostojen hallinta](../website/files.md): kuvien ja asiakirjojen lataaminen
- [Verkkolahjoitusten määritys](../donations/online-giving-setup.md): Stripe-asetusten määrittäminen
- [Lomakkeiden luominen](../forms/creating-forms.md): rekisteröinti- ja kyselylomakkeiden rakentaminen

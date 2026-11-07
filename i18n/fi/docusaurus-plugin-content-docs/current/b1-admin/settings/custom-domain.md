---
title: "Mukautettu verkkotunnus"
---

# Mukautettu verkkotunnus

<div class="article-intro">

Voit osoittaa oman verkkotunnuksesi (esimerkiksi **`www.seurakuntasi.org`**) B1-sivustollesi, jolloin vierailijat pääsevät sivustolle seurakuntasi oikean verkko-osoitteen kautta oletusosoitteen yourchurch.b1.church sijaan.

</div>

## Koulutusvideo

<YouTube id="L5yaDusHts8" title="Mukautetun verkkotunnuksen yhdistäminen B1:ssä" next="Live-suoratoiston määrittäminen B1:ssä" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Vaihe 1 — Lisää DNS-tietue ensin

Ennen kuin lisäät verkkotunnuksesi B1:een, sinun on osoitettava se B1:n palvelimille verkkotunnusrekisterinpitäjässäsi (GoDaddy, Namecheap, Cloudflare jne.).

Lisää jokin näistä tietueista — CNAME on suositeltava:

| Tyyppi | Isäntä | Arvo |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `seurakuntasi.org` | `3.23.251.61` |

Käytä **CNAME-tietuetta** `www`-osoitettasi varten. Käytä **A-tietuetta**, jos rekisterinpitäjäsi ei tue CNAME-tietuetta juuritason (www-etuliitteettömässä) verkkotunnuksessa, tai jos haluat, että juuritason verkkotunnus toimii myös.

DNS-muutosten voimaantulo voi kestää muutamasta minuutista muutamaan tuntiin.

## Vaihe 2 — Lisää verkkotunnus B1:ssä

Kun DNS osoittaa B1:een:

1. Siirry **Asetuksiin** B1 Adminissa.
2. Valitse vasemmanpuoleisesta luettelosta **Verkkotunnukset** ja napsauta sitten **Muokkaa**-painiketta **Verkkotunnukset**-osiossa.
3. Kirjoita verkkotunnuksesi kenttään ja napsauta **Tallenna**.

Sinun ei tarvitse ensin napsauttaa **+**-painiketta — kenttään kirjoitettu verkkotunnus lisätään tallennettaessa. Käytä **+**-painiketta (tai paina **Enter**-näppäintä), kun haluat lisätä useita verkkotunnuksia luetteloon ennen tallentamista.

B1 hoitaa SSL-salauksen automaattisesti — erillistä varmenteen ostamista ei tarvita.

:::warning
Jos lisäät verkkotunnuksen B1:een ennen kuin DNS-tietueet ovat paikoillaan, sitä ei tallenneta. Määritä aina ensin DNS.
:::

## Toiminnan tarkistaminen

Tallennuksen jälkeen avaa verkkotunnuksesi selaimessa. Jos sivusto B1 latautuu, olet valmis. Jos näet virheilmoituksen, DNS-muutokset eivät ehkä ole vielä levinneet — odota muutama minuutti ja yritä uudelleen.

Voit myös tarkistaa DNS-muutosten leviämisen osoitteessa [dnschecker.org](https://dnschecker.org) — hae verkkotunnustasi ja tarkista, että CNAME- tai A-tietue näkyy.

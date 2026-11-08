---
title: "Suunnitelman tarkistus ja ilmoitukset"
description: "Tarkista B1 Adminissa palvelusuunnitelmat täyttämättömien tehtävien, aikataulukonfliktien ja poissaolevien vapaaehtoisten varalta ja lähetä push-ilmoitus koko tiimillesi yhdellä napsautuksella."
---

# Suunnitelman tarkistus ja vapaaehtoisten ilmoittaminen

<div class="article-intro">

B1 Admin tarkistaa suunnitelmasi automaattisesti ennen sunnuntaita ongelmien varalta: täyttämättömät tehtävät, aikataulukonfliktit ja vapaaehtoiset, jotka ovat merkinneet päivän poissaolokseen. Kun kaikki on kunnossa, voit ilmoittaa koko tiimillesi yhdellä napsautuksella.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Luo [palvelusuunnitelma](./plans.md) ja määritä vapaaehtoiset tehtäviin
- Lisää suunnitelmaan [palveluajat](./plans.md), jotta konfliktien tunnistus voi tarkistaa päällekkäisyydet
- Varmista, että vapaaehtoisilla on [B1 App asennettuna](../../b1-church/getting-started/installing-pwa.md), jotta he voivat vastaanottaa push-ilmoituksia

</div>

## Tarkistusnäkymä

Jokaisessa suunnitelmassa on **Tarkistus**-paneeli, joka käy suunnitelman automaattisesti läpi sitä rakentaessasi. Se tarkistaa kolme asiaa:

### Täyttämättömät tehtävät
Jos tehtävä vaatii enemmän ihmisiä kuin tällä hetkellä on määritetty, tarkistuspaneeli listaa tarkalleen, mitä vielä tarvitaan, esimerkiksi *"Äänitekniikko: 1 henkilö lisää tarvitaan."* Näet yhdellä silmäyksellä, onko suunnitelma täysin miehitetty ennen viikon alkua.

### Aikataulukonfliktit
Jos vapaaehtoinen on määritetty kahteen samassa suunnitelmassa ajallisesti päällekkäiseen tehtävään, tarkistuspaneeli merkitsee konfliktin, esimerkiksi *"Jane Smith: aikaristiriita tehtävien Ylistysjohtaja ja Lasten sisäänkirjaus välillä sunnuntain jumalanpalveluksen aikana."* Tämä paljastaa kaksoisvarauksen ennen kuin siitä tulee ongelma sunnuntaiaamuna.

### Poissaolopäivät
Vapaaehtoiset voivat asettaa B1 Appissa päivät, jolloin he eivät ole käytettävissä. Jos joku on määritetty suunnitelmaan, joka osuu yhteen hänen poissaolopäiviensä kanssa, tarkistuspaneeli nostaa konfliktin automaattisesti esiin, jotta voit löytää korvaajan.

### Konfliktit eri suunnitelmien välillä
Tarkistus katsoo kaikkia suunnitelmiasi kerralla. Jos sama vapaaehtoinen on määritetty kahteen eri suunnitelmaan, jotka menevät ajallisesti päällekkäin, esimerkiksi aamun kello 9 ja 10 jumalanpalvelukseen, jotka molemmat kestävät kello 10.30 asti, B1 Admin merkitsee henkilön kaksoisvaratuksi suunnitelmien välillä.

:::tip
Tarkistuksen käynnistämiseksi sinun ei tarvitse tehdä mitään. Se päivittyy automaattisesti aina, kun lisäät tai muutat tehtäviä. Seuraa vain paneelia suunnitelmaa rakentaessasi.
:::

## Vapaaehtoisten ilmoittaminen

Kun suunnitelma on valmis, voit ilmoittaa kaikille määritetyille vapaaehtoisille kerralla suoraan tarkistuspaneelista.

1. Avaa suunnitelma ja vieritä **Tarkistus**-paneeliin
2. Jos ilmoittamattomia vapaaehtoisia on, näet linkin, joka kertoo, kuinka monelle ilmoitus pitää vielä lähettää (esim. *"Ilmoita 8 vapaaehtoiselle"*)
3. Napsauta linkkiä lähettääksesi push-ilmoituksen kaikille, joille ei ole vielä ilmoitettu
4. Vapaaehtoiset saavat puhelimeensa ilmoituksen, jossa kerrotaan, että heidät on aikataulutettu, ja pyydetään vahvistamaan tehtävänsä

:::info
Mukaan otetaan vain vapaaehtoiset, joille ei ole vielä ilmoitettu. Jos lisäät suunnitelmaan jonkun myöhemmin, linkki ilmestyy uudelleen, jotta voit ilmoittaa uudelle henkilölle ilman, että muille ilmoitetaan uudelleen.
:::

### Suunnitelmat vahvistusprosessilla

Jos suunnitelman asetuksissa on määritetty [vahvistusprosessi](./workflows.md#serving-assignment-confirmations), paneelissa näkyy teksti *"Uudet pyynnöt käyttävät vahvistusprosessia. Sovellushälytykset pysyvät käytössä. Muistutukset loppuvat, kun kukin pyyntö hyväksytään tai hylätään."* Tässä tapauksessa:

- Ilmoituslinkki laskee vain ne vapaaehtoiset, joille ei ole vielä ilmoitettu eikä jotka ole vielä vastanneet.
- Linkin napsauttaminen lähettää tavanomaisen sovellushälytyksen ja luo prosessin taululle yhden kortin jokaista pyyntöä kohden. Prosessi lähettää sen jälkeen sähköposti- ja tekstiviestimuistutukset ja tarvittaessa siirtää pyynnön jollekulle soitettavaksi.
- Suunnitelman täytyy olla julkaistu (ei luonnos) ja prosessin täytyy olla aktiivinen. Muuten paneelissa näkyy teksti *"Pyyntöjä ei voitu lähettää. Tarkista, että valittu prosessi on aktiivinen ja suunnitelma julkaistu, ja yritä uudelleen."*

:::warning
Vapaaehtoisilla täytyy olla B1 App asennettuna kotinäytölleen ja ilmoitukset käytössä, jotta he voivat vastaanottaa push-ilmoituksia. Katso asennusohjeet kohdasta [Asentaminen sovelluksena (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Aiheeseen liittyvät artikkelit

- [Palvelusuunnitelmat](./plans.md)
- [Prosessit](./workflows.md)
- [B1.church PWA:n asentaminen](/docs/b1-church/getting-started/installing-pwa)

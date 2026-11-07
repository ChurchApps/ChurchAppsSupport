---
title: "Suunnitelman tarkistus ja ilmoitukset"
---

# Suunnitelman tarkistus ja vapaaehtoisten ilmoitukset

<div class="article-intro">

B1 Admin tarkistaa suunnitelmasi automaattisesti ennen sunnuntaita ja etsii niistä ongelmia: täyttämättömiä tehtäviä, aikataulun päällekkäisyyksiä ja vapaaehtoisia, jotka ovat merkinneet päivän estetyksi. Kun kaikki on kunnossa, voit ilmoittaa koko tiimille yhdellä napsautuksella.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Luo [palvelusuunnitelma](./plans.md) ja määritä vapaaehtoiset tehtäviin
- Lisää suunnitelmaan [palveluajat](./plans.md), jotta päällekkäisyyksien tarkistus voi havaita limittymiset
- Varmista, että vapaaehtoisilla on B1 Mobile -sovellus asennettuna, jotta he voivat vastaanottaa push-ilmoituksia

</div>

## Tarkistuspaneeli

Jokaisessa suunnitelmassa on **Tarkistus**-paneeli, joka käynnistyy automaattisesti suunnitelmaa rakentaessasi. Se tarkistaa kolme asiaa:

### Täyttämättömät tehtävät
Jos tehtävään tarvitaan enemmän henkilöitä kuin siihen on tällä hetkellä määritetty, tarkistuspaneeli luettelee tarkalleen, mitä vielä tarvitaan, esimerkiksi *„Äänitekniikko: tarvitaan vielä 1 henkilö.”* Näet yhdellä silmäyksellä, onko suunnitelma täysin miehitetty ennen viikon alkua.

### Aikataulun päällekkäisyydet
Jos vapaaehtoinen on määritetty kahteen tehtävään, jotka menevät ajallisesti päällekkäin saman suunnitelman sisällä, tarkistuspaneeli merkitsee ristiriidan, esimerkiksi *„Jane Smith: aikaristiriita tehtävien Ylistysjohtaja ja Lastenkirkon sisäänkirjautuminen välillä sunnuntain jumalanpalveluksessa.”* Tämä huomaa kaksoisvarauksen ennen kuin siitä tulee ongelma sunnuntaiaamuna.

### Estopäivät
Vapaaehtoiset voivat asettaa B1 Mobilessa päivät, jolloin he eivät ole käytettävissä. Jos joku on määritetty suunnitelmaan, joka osuu yhteen hänen estopäivistään, tarkistuspaneeli nostaa ristiriidan automaattisesti esiin, jotta voit etsiä korvaajan.

### Suunnitelmien väliset päällekkäisyydet
Tarkistus kattaa myös kaikki suunnitelmasi kerralla. Jos sama vapaaehtoinen on määritetty kahteen eri suunnitelmaan, jotka menevät ajallisesti päällekkäin, esimerkiksi klo 9 ja klo 10 alkavat jumalanpalvelukset, jotka molemmat kestävät klo 10.30 asti, B1 Admin merkitsee henkilön kaksoisvaratuksi suunnitelmien välillä.

:::tip
Tarkistuksen käynnistämiseen ei tarvitse tehdä mitään. Se päivittyy automaattisesti aina, kun lisäät tehtäväjakoon tai muutat sitä. Pidä vain paneelia silmällä suunnitelmaa rakentaessasi.
:::

## Vapaaehtoisille ilmoittaminen

Kun suunnitelma on valmis, voit ilmoittaa kaikille määritetyille vapaaehtoisille kerralla suoraan tarkistuspaneelista.

1. Avaa suunnitelma ja vieritä **Tarkistus**-paneeliin
2. Jos ilmoittamattomia vapaaehtoisia on, näet linkin, joka kertoo, kuinka moneen henkilöön ilmoitusta ei ole vielä lähetetty (esim. *„Ilmoita 8 vapaaehtoiselle”*)
3. Napsauta linkkiä lähettääksesi push-ilmoitukset kaikille, joille ilmoitusta ei ole vielä lähetetty
4. Vapaaehtoiset saavat puhelimeensa ilmoituksen, jonka mukaan heidät on aikataulutettu, ja se pyytää heitä vahvistamaan tehtävänsä

:::info
Mukaan otetaan vain vapaaehtoiset, joille ilmoitusta ei ole vielä lähetetty. Jos lisäät suunnitelmaan jonkun myöhemmin, linkki ilmestyy uudelleen, jotta voit ilmoittaa uudelle henkilölle ilman, että muille lähetetään ilmoitus uudelleen.
:::

### Suunnitelmat, joissa on vahvistusprosessi

Jos suunnitelman asetuksissa on määritetty [vahvistusprosessi](./workflows.md#serving-assignment-confirmations), paneelissa näkyy *„Uudet pyynnöt käyttävät vahvistusprosessia. Sovellushälytykset pysyvät käytössä. Muistutukset loppuvat, kun kukin pyyntö hyväksytään tai hylätään.”* Tällöin:

- Ilmoituslinkki laskee vain ne vapaaehtoiset, joille ilmoitusta ei ole vielä lähetetty eivätkä ole vastanneet.
- Linkin napsauttaminen lähettää tavallisen sovellushälytyksen ja luo prosessin taululle yhden kortin jokaista pyyntöä kohden. Prosessi lähettää sen jälkeen sähköposti- ja tekstiviestimuistutukset ja tarvittaessa siirtää pyynnön jollekin soitettavaksi.
- Suunnitelman on oltava julkaistu (ei luonnos) ja prosessin aktiivinen. Muuten paneelissa näkyy *„Pyyntöjä ei voitu lähettää. Tarkista, että valittu prosessi on aktiivinen ja suunnitelma julkaistu, ja yritä uudelleen.”*

:::warning
Vapaaehtoisilla on oltava B1.church-mobiilikokemus asennettuna (PWA kotinäytölle tai vanhentunut B1 Mobile -natiivisovellus niille, joilla se vielä on), ja ilmoitukset on otettava käyttöön, jotta he voivat vastaanottaa push-ilmoituksia. Katso asennusohjeet kohdasta [Sovelluksen asentaminen (PWA)](/docs/b1-church/getting-started/installing-pwa).
:::

## Aiheeseen liittyvät artikkelit

- [Palvelusuunnitelmat](./plans.md)
- [Prosessit](./workflows.md)
- [B1.church PWA:n asentaminen](/docs/b1-church/getting-started/installing-pwa)

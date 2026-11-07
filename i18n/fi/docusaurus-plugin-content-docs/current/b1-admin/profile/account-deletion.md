---
title: "Tilien hyväksyntä­pyyntöjen käsittely"
---

# Tilien poistopyyntöjen käsittely

<div class="article-intro">

Kun seurakunnalle on määritetty hakemistohyväksyntäryhmä, tilin poisto ei enää tapahdu välittömästi. Jäsenen pyyntö muuttuu tehtäväksi, jonka hyväksyntäryhmä käsittelee ennen kuin mitään poistetaan. Tämä sivu selittää, miten pyyntö tehdään, miten sen voi hyväksyä tai hylätä, ja mitä kussakin tapauksessa tapahtuu.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Sinulla täytyy olla **Hakemistohyväksyntäryhmä** määritettynä kohdassa **Mobiili &rarr; Jäsenportaali**. Ilman sitä profiilisivun **Poista tilini** -painike poistaa tilin heti ilman tarkistusvaihetta. Katso [Mobiilisovelluksen asetukset](../settings/mobile-app.md).
- Pyynnön hyväksyminen tai hylkääminen vaatii oikeuden **Ihmiset &gt; Muokkaa**.

</div>

## Miten jäsen pyytää poistoa

Tilin poistoa pyydetään **Omat tiedot** -sivulta — samalta yhteiseltä tilisivulta, joka on kuvattu artikkelissa [Profiilisi hallinta](./managing-profile.md) — kohdan **Tilin poistaminen** alla. Kun hyväksyntäryhmä on määritetty, pyynnön vahvistaminen ei poista mitään heti. Sen sijaan se:

1. Luo avoimen tehtävän nimeltä **"Tilin poistopyyntö"**, joka on osoitettu hakemistohyväksyntäryhmälle, kohtaan **Palvelu &rarr; Omat työt**.
2. Poistaa henkilöltä **Poista tilini** -painikkeen käytöstä ja näyttää ilmoituksen, että pyyntö odottaa tarkistusta.

Jos avoin pyyntö on jo olemassa ja lähetät uuden, sama tehtävä avataan uudelleen. Henkilöllä voi olla kerrallaan vain yksi odottava poistopyyntö.

## Pyynnön tarkistaminen

1. Siirry kohtaan **Palvelu &rarr; Omat työt** (tai kohtaan **Minun ryhmilleni osoitetut** kojelaudallasi — sama paikka, jossa [profiilimuutospyynnöt](./approving-profile-changes.md) näkyvät).
2. Avaa tehtävä nimeltä **"Tilin poistopyyntö käyttäjältä *Nimi*"**.
3. Näet kaksi toimintoa: **Hyväksy poisto** ja **Hylkää**.

### Hyväksyminen

Vahvista kehote **"Anonymisoidaanko tämän henkilön tiedot pysyvästi ja poistetaanko hänen kirjautumistietonsa? Tätä ei voi peruuttaa."** Tämä korvaa henkilön henkilötiedot yleisillä arvoilla (sama anonymisointi, jota käytetään henkilön tietueen toiminnossa **Tietojen hallinta &gt; Anonymisoi** — katso [Tietoturva](../settings/data-security.md)) ja poistaa hänen kirjautumistietonsa. Tehtävä sulkeutuu automaattisesti, ja jäsentä ilmoitetaan, että hänen pyyntönsä on hyväksytty.

### Hylkääminen

Hylkääminen vaatii perustelun, sillä GDPR sallii tietojen poistopyynnön evämisen vain lakisääteisen poikkeuksen perusteella:

- **Lakisääteinen säilytysvelvoite** (lahjoitus-, vero- tai työsuhdekirjanpito)
- **Tarvitaan oikeudelliseen vaateeseen**
- **Muu** — selitä tekstikentässä (vähintään 10 merkkiä)

Jäsentä ilmoitetaan päätöksestä ja antamastasi perustelusta. Hän voi tehdä pyynnön uudelleen tai, jos hän on eri mieltä, valittaa valvontaviranomaiselle.

:::info
Seurakunnilla on 30 päivää aikaa vastata poistopyyntöön. Tehtävän määräaika on 28 päivän päässä, ja hyväksyntäryhmä saa automaattisia muistutuksia, jos tehtävä on yhä avoin 21 ja 27 päivän kuluttua.
:::

:::tip
Poisto- ja profiilimuutospyynnöt käyttävät samaa hakemistohyväksyntäryhmää ja samaa tehtäväpohjaista tarkistusprosessia. Katso [Profiilimuutosten hyväksyminen](./approving-profile-changes.md), jos tarvitset myös hakemistopäivityspyyntöjen tarkistamista.
:::

## Liittyvät artikkelit

- [Profiilisi hallinta](./managing-profile.md) — Missä jäsenet pyytävät oman tilinsä poistamista
- [Profiilimuutosten hyväksyminen](./approving-profile-changes.md) — Samankaltainen tarkistusprosessi hakemistopäivityspyynnöille
- [Tietoturva](../settings/data-security.md) — GDPR-vaatimustenmukaisuus ja ylläpitäjän käynnistämä anonymisointi
- [Mobiilisovelluksen asetukset](../settings/mobile-app.md) — Hakemistohyväksyntäryhmän määrittäminen

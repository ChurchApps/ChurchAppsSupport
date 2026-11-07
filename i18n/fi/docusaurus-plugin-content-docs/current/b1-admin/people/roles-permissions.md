---
title: "Roolien määrittäminen"
description: "Määritä B1 Adminissa roolit, jotta henkilökunta ja vapaaehtoiset näkevät vain tarvitsemansa henkilö-, lahjoitus-, läsnäolo- ja ryhmäalueet."
---

# Roolien määrittäminen

<div class="article-intro">

B1 Admin käyttää roolipohjaista käyttöoikeusjärjestelmää, jolla hallitaan, mitä kukin tiimisi käyttäjä näkee ja voi tehdä. Roolien avulla voit antaa työntekijöille ja vapaaehtoisille pääsyn juuri niihin osiin, joita he tarvitsevat, ja ei yhtään enempää. Hyvä roolien hallinta pitää seurakuntasi tiedot turvassa ja auttaa tiimiäsi työskentelemään tehokkaasti.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tarvitset **Domain Admin** -käyttöoikeuden tai roolin, jolla on oikeus hallita **Asetuksia** B1 Adminissa.
- Henkilöiden, joille haluat määrittää roolit, on oltava jo hakemistossasi. Jos sinun on ensin lisättävä heidät, katso [Henkilöiden lisääminen](adding-people.md).

</div>

## Roolien ymmärtäminen

Rooli on joukko käyttöoikeuksia, jotka määrität yhdelle tai useammalle käyttäjälle. Voit esimerkiksi luoda roolin "Talousryhmä", joka antaa pääsyn [lahjoitustietoihin](../donations/recording-donations.md), tai roolin "Sisäänkirjautumisvapaaehtoinen", joka sallii pääsyn vain [osallistumistoimintoihin](../attendance/check-in.md).

Jokainen rooli hallitsee pääsyä tiettyihin B1 Adminin osiin, mukaan lukien seuraavat:

- **Henkilöt** -- jäsenprofiilien katseleminen ja muokkaaminen. Henkilötietueen Muistiinpanot-osio vaatii oikeuden **Muokkaa henkilöitä**, ja erillinen oikeus **Näytä luottamukselliset muistiinpanot** hallitsee pääsyä Luottamuksellisten muistiinpanojen osioon (pastoraaliseen hoitoon, henkilökohtaiseen historiaan ja vastaaviin arkaluonteisiin muistiinpanoihin). **Näytä vain henkilöiden nimet** antaa jollekulle mahdollisuuden etsiä henkilöitä nimellä (näkyvissä vain nimi, kuva ja jäsenyyden tila) ilman pääsyä koko hakemistoon. Yhdistettynä oikeuteen **Näytä osallistuminen** tai **Muokkaa osallistumista** se antaa vapaaehtoiselle mahdollisuuden avata **Ryhmät** ja nähdä luokkalistat nimien perusteella; oikeudella **Muokkaa osallistumista** he voivat myös [kirjata osallistumisen](../attendance/recording-attendance.md). Katso [Vain nimet -käyttöoikeus](../settings/roles-permissions.md#people-names-only).
- **Lahjoitukset** -- lahjoitusten ja taloudellisten raporttien hallinta. **Syötä lahjoituksia** on kapeampi vaihtoehto laskentatiimeille: sen avulla joku voi syöttää lahjoituksia, mutta vain sellaisiin [eriin](../donations/batches.md#who-can-change-a-batch), jotka ovat yhä avoinna.
- **Osallistuminen** -- osallistumistietojen kirjaaminen ja katseleminen
- **Lomakkeet** -- [mukautettujen lomakkeiden](../forms/creating-forms.md) luominen ja hallinta
- **Ryhmät** -- [ryhmäjäsenyyksien](../groups/group-members.md) ja kalenterien hallinta
- **Asetukset** -- seurakuntakohtaisten asetusten määrittäminen

:::warning
**Domain Adminilla** on täydet oikeudet kaikkiin B1 Adminin osiin. Heidän oikeuksiaan ei voi muokata tai rajoittaa. Käytä tätä roolia vain ensisijaisille ylläpitäjillesi.
:::

## Roolien katseleminen ja hallinta

1. Avaa [Jump-valikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki B1 Adminin vasemmassa yläkulmassa) ja laajenna **Asetukset**.
2. Napsauta **Roolit**.
3. Näet luettelon kaikista seurakunnallesi määritetyistä rooleista. **Jäsenet**-sarake näyttää, kuinka monta käyttäjää kussakin roolissa on.
4. Napsauta mitä tahansa roolia nähdäksesi sen jäsenet ja käyttöoikeudet.

## Käyttäjien lisääminen rooliin

1. Valitse Jump-valikosta **Asetukset > Roolit**.
2. Napsauta roolia, johon haluat lisätä käyttäjän.
3. Etsi henkilö nimellä **Jäsenet**-osiosta.
4. Napsauta **Lisää** määrittääksesi hänet rooliin.

Käyttäjällä on kaikki roolin käyttöoikeudet seuraavan kerran, kun hän kirjautuu sisään.

## Roolin käyttöoikeuksien muokkaaminen

1. Valitse Jump-valikosta **Asetukset > Roolit**.
2. Napsauta roolia, jota haluat muokata.
3. Valitse tai poista valinta **Käyttöoikeudet**-osiossa alueista, joihin haluat roolin pääsevän. Jokaisessa käyttöoikeusryhmässä näkyy, kuinka monta sen käyttöoikeutta on valittuna (esimerkiksi **2 / 5**).
4. Jokainen muutos tallentuu heti, kun valitset tai poistat valinnan ruudusta.

:::tip
Noudata vähimmän oikeuden periaatetta -- anna jokaiselle roolille vain ne käyttöoikeudet, joita se todella tarvitsee. Tämä pitää tietosi turvassa ja vähentää vahingossa tapahtuvien muutosten riskiä.
:::

## Yleisiä rooliesimerkkejä

- **Toimistohenkilökunta** -- pääsy Henkilöihin, Lahjoituksiin, Osallistumiseen ja Lomakkeisiin
- **Ryhmänjohtajat** -- pääsy vain [Ryhmiin](../groups/creating-groups.md)
- **Sisäänkirjautumisvapaaehtoiset** -- **Checkin**-osallistumisoikeus, jota [sisäänkirjautumisterminaaliin](../attendance/check-in.md) kirjautunut tili tarvitsee
- **Talousryhmä** -- pääsy [Lahjoituksiin](../donations/recording-donations.md) ja raportointiin
- **Laskentatiimi** -- **Syötä lahjoituksia** ja **Näytä lahjoitukset**, jotta vapaaehtoiset voivat syöttää kolehdin avoimiin eriin näkemättä lahjoitusyhteenvetoja

Katso [Roolit ja käyttöoikeudet](../settings/roles-permissions.md), jos haluat tarkemman kuvauksen lahjoitus- ja henkilöoikeuksista.

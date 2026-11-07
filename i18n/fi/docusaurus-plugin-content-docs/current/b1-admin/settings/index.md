---
title: "Asetukset"
description: "Opastus B1 Adminin asetuksiin: seurakunnan tiedot, brändäys, kampukset, omat kentät, käyttäjäroolit ja B1.church-sovelluksen navigointi."
---

# Asetukset

<div class="article-intro">

Asetukset-osiossa määrität kirkkosi tilin, brändäyksen ja hallinnolliset asetukset B1 Adminissa. Täältä voit hallita kaikkea kirkkosi nimestä ja alidomainista käyttöoikeuksiin ja mobiilisovelluksen määrityksiin.

</div>

## Mitä tältä sivulta löytyy

Asetukset-alue on jaettu seuraaviin alaosioihin:

1. **Asetukset** -- Määritä kirkkosi perustiedot, brändäys, alidomain, alue (päivämäärän ja puhelinnumeron muoto), tekstiviestipalveluntarjoaja ja tiedostotallennus. Katso lisätietoja: [Kirkon asetukset](./church-settings.md). Jos haluat käyttää omaa verkkotunnusta (esim. yourchurch.org), katso [Mukautettu verkkotunnus](./custom-domain.md).
2. **Toimipisteet** -- Lisää ja hallitse kirkkosi useita fyysisiä toimipisteitä. Kun toimipisteet on luotu, ne näkyvät henkilöprofiileissa, läsnäolon määrityksessä ja Demografia-kojelaudassa. Ne löytyvät asetusten pääsivun osiona eivätkä erillisenä navigointikohteena. Lisätietoja: [Toimipisteet](./campuses.md).
3. **Mukautetut kentät** -- Määritä omat kentät, joita seuraat henkilöistä (päivämäärä, numero, kyllä/ei-vastaus tai valintalista), täytä ne profiileissa ja hae niiden perusteella. Ne löytyvät myös asetusten pääsivun osiona. Lisätietoja: [Mukautetut kentät](./custom-fields.md).
4. **Sähköpostipohjat** -- Tallenna uudelleenkäytettävää sähköpostisisältöä lähetettäväksi manuaalisesti tai työnkulusta. Lisätietoja: [Sähköpostipohjat](./email-templates.md).
5. **Tapahtumaloki** ja **Erät** -- Tarkastele tilillesi tehtyjä muutoksia ([Tapahtumaloki](../reports/audit-log.md)) sekä tarkastele tai peru massatuonteja ja -toimintoja (**Erät**).
6. **Palvelimen ylläpito** -- Käytä edistyneitä ylläpitotyökaluja kirkkosi palvelintason asetusten hallintaan.

:::info
**Mobiilisovellukset**-määritykset ja **Lomakkeet** ovat nyt omia ylimmän tason navigointikohtiaan -- **Mobiili** ja **Lomakkeet** (löytyvät kohdasta **Ihmiset**) -- eivätkä ne ole enää Asetukset-osion sisällä. Lisätietoja: [Mobiilisovelluksen asetukset](./mobile-app.md) ja [Lomakkeiden luominen](/docs/b1-admin/forms/creating-forms).
:::

## Asetusten pääsivu

Kun avaat Asetukset-sivun ensimmäistä kertaa, vasemmalla oleva paneeli näyttää kirkkosi **nimen**, **alidomainin** ja osoitteen sekä **Tuonti/Vienti**-linkin, josta avautuu tuonti- ja vientityökalu tietojen siirtämiseen järjestelmien välillä.

Tämän alapuolella **Määritykset**-luettelo sisältää linkit kaikkiin asetusosioihin: **Kirkon tiedot**, **Yleiset**, **Alue**, **Lahjoitukset**, **Tekstiviestit**, **Tiedostotallennus**, **Verkkotunnukset**, **Luokkien siirto**, **Sisäänkirjautuminen**, **Toimipisteet**, **Mukautetut kentät** ja **Kehittäjä**. Osiot, joita vielä pitää määrittää (esimerkiksi Lahjoitukset, Tekstiviestit tai Verkkotunnukset), on merkitty pienellä pisteellä. Kaikki osiot ovat samalla sivulla -- napsauta luettelon nimeä siirtyäksesi siihen tai vieritä alas. Jokainen osio näyttää nykyiset asetuksensa; muuttaaksesi niitä napsauta osion **Muokkaa**-painiketta.

**Sähköpostipohjat**, **Tapahtumaloki** ja **Erät** ovat erillisiä sivuja -- avaa ne [Hyppy-valikosta](../introduction.md#getting-around-with-the-jump-menu) kohdasta **Asetukset**.

Aloita **Kirkon tiedot** -osiosta, jossa voit muokata kirkkosi nimeä, osoitetta ja yhteystietoja -- katso [Kirkon asetukset](./church-settings.md). Käyttäjien roolien hallitsemiseksi avaa [Hyppy-valikko](../introduction.md#getting-around-with-the-jump-menu) ja valitse **Asetukset > Roolit** -- katso [Roolit ja käyttöoikeudet](./roles-permissions.md).

:::tip
Aloita määrittämällä kirkkosi nimi ja brändäys kohdassa **Kirkon tiedot**. Määritä sen jälkeen [Roolit](./roles-permissions.md), jotta voit kutsua tiimisi jäsenet oikealla käyttöoikeustasolla.
:::

:::info
Tietojesi suojauksesta kerrotaan lisää kohdassa [Tietoturva](./data-security.md).
:::

## Seuraavat vaiheet

- [Kirkon asetukset](./church-settings.md) -- Määritä kirkkosi tiedot ja brändäys
- [Toimipisteet](./campuses.md) -- Lisää toimipisteitä monitoimipisteisille kirkoille
- [Roolit ja käyttöoikeudet](./roles-permissions.md) -- Määritä käyttäjäroolit ja pääsynhallinta
- [Mobiilisovelluksen asetukset](./mobile-app.md) -- Muokkaa B1.church PWA:ssa näkyviä navigointivälilehtiä
- [Tietoturva](./data-security.md) -- Lue, miten tietojasi suojataan

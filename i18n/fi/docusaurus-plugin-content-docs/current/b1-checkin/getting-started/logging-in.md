---
title: "Kirjautuminen B1 Church Checkiniin"
sidebar_label: "Kirjautuminen"
description: "Kirjaudu B1 Church Checkin -kioskisovellukseen, valitse seurakuntasi ja tutustu automaattiseen kirjautumiseen, ylläpitoasetuksiin ja uloskirjautumiseen sisäänkirjautumistabletilla."
---

# Kirjautuminen

<div class="article-intro">

Kioskia voi käyttää sisäänkirjautumiseen vasta, kun olet kirjautunut sisään ChurchApps-tilillä, jolla on pääsy seurakuntaasi. Tämä sivu käsittelee ensimmäisen kirjautumisen, seurakunnan valinnan, automaattisen kirjautumisen toiminnan ja uloskirjautumisen.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna B1 Church Checkin Android-tablettiisi (katso [Aloittaminen](./index.md))
- Valmistele ChurchApps-tilisi sähköpostiosoite ja salasana
- Tilillä täytyy olla **Checkin**-oikeus (tai **Muokkaa osallistumista**) seurakunnassasi. Ylläpitäjä lisää sen B1 Adminissa kohdassa **Asetukset > Roolit**. Katso [Sisäänkirjautumiskioskin tilit](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Ensimmäinen kirjautuminen

1. Avaa B1 Church Checkin -sovellus. Aloitusruudun jälkeen näet kirjautumisnäkymän, jossa on B1 Church Checkin -logo.
2. Kirjoita **sähköpostiosoitteesi** ensimmäiseen kenttään.
3. Kirjoita **salasanasi** toiseen kenttään.
4. Napauta **Kirjaudu**-painiketta.

Sovellus vahvistaa tunnuksesi ja kirjaa sinut sisään. Jos sähköpostiosoite tai salasana on väärä, ruudun alareunaan ilmestyy virheilmoitus.

Jos tilillä on käytössä [kaksivaiheinen kirjautuminen](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), sovellus pyytää sen jälkeen koodin. Kirjoita tilin omistajan todennussovelluksen 6-numeroinen koodi tai jokin hänen varakoodeistaan ja napauta uudelleen **Kirjaudu**. Koodia tarvitaan vain ensimmäisellä kirjautumiskerralla. Sen jälkeen kiosk pysyy kirjautuneena.

:::info
Tämä on sama sähköpostiosoite ja salasana, jota käytät B1 Adminissa tai muissa ChurchApps-tuotteissa. Sisäänkirjautumiskioskia varten ei tarvita erillistä tiliä.
:::

## Seurakunnan valinta

Onnistuneen kirjautumisen jälkeen sovellus lataa seurakunnat, joissa tililläsi on **Checkin**- tai **Muokkaa osallistumista** -oikeus. Seurakunnat, joissa sinulla on vain muita oikeuksia, jätetään pois. Jos yhtään seurakuntaa ei jää jäljelle, sovellus näyttää ilmoituksen **Ei sisäänkirjautumisoikeutta** ja pyytää sinua pyytämään seurakunnan ylläpitäjää lisäämään Checkin-oikeuden yhteen rooleistasi. Jokainen seurakunta näkyy korttina, jossa on seurakunnan nimi ja logo (jos sellainen on määritetty B1 Adminissa).

- Jos tilisi on yhdistetty **vain yhteen seurakuntaan**, näet silti valintanäkymän. Jatka napauttamalla seurakuntaasi.
- Jos tilisi on yhdistetty **useisiin seurakuntiin**, napauta seurakuntaa, jota tämä kiosk palvelee.

Kun valitset seurakunnan, sovellus lataa sen brändäys- ja ulkoasuasetukset. Seurakuntasi logo näkyy yläpalkissa kaikilla seuraavilla näkymillä.

## Automaattinen kirjautuminen myöhemmillä käyttökerroilla

Ensimmäisen onnistuneen kirjautumisen jälkeen sovellus tallentaa tablettiin suojatun kirjautumistunnuksen ja valitsemasi seurakunnan. Salasanaa se ei tallenna. Seuraavilla käynnistyskerroilla:

- Sovellus kirjaa sinut takaisin sisään tallennetulla tunnuksella.
- Jos valitsit seurakunnan aiemmin, sovellus palauttaa valinnan ja siirtää sinut suoraan **palvelunäkymään**.
- Jos tallennettu kirjautuminen ei ole enää voimassa, sovellus palaa kirjautumisnäkymään, jotta voit kirjautua uudelleen.

:::tip
Koska kiosk kirjautuu automaattisesti sisään, tunnukset tarvitsee syöttää vain kerran alkuasennuksen yhteydessä. Sen jälkeen tabletin voi käynnistää, ja se on valmis käyttöön.
:::

## Ylläpitoasetukset

Ylläpitoasetukset on piilotettu tarkoituisesti, jotta kioskia käyttävät seurakuntalaiset eivät vahingossa muuta kokoonpanoa. Pääset niihin seuraavasti:

1. Napauta yläpalkin **seurakunnan logoa** **seitsemän kertaa** nopeasti peräkkäin (kahden sekunnin sisällä).
2. Jos kioskille on asetettu PIN-koodi, kirjoita se, kun sitä pyydetään.
3. **Ylläpitoasetukset**-näkymä avautuu seuraavilla vaihtoehdoilla:
   - **Vaihda palvelu**: vaihda valittu palveluaika
   - **Vaihda tulostin**: avaa [tulostinasetukset](./printer-setup.md), joista voit hakea ja valita tulostimen
   - **Aseta ylläpito-PIN** (tai **Vaihda ylläpito-PIN**, kun se on asetettu): aseta tai päivitä PIN-koodi, joka suojaa ylläpitokäytön
   - **Hätätiedote**: lähetä tekstiviesti jokaisen sisäänkirjautuneen perheen huoltajille (katso [Hätätiedote](../check-in/checking-out.md#emergency-broadcast))
   - **Henkilöstön asematila**: kytkin, joka lisää tälle asemalle uloskirjautumisen, kutsuhaun, uudelleentulostuksen ja profiilin muokkauksen (katso [Uloskirjautuminen](../check-in/checking-out.md))
   - **Kirjaudu ulos**: kirjaudu ulos ja palaa kirjautumisnäkymään

   Palaa sisäänkirjautumiseen napauttamalla **Takaisin kioskiin**.

:::warning
Uloskirjautuminen poistaa kaikki tallennetut tunnukset ja seurakuntavalinnan. Sinun täytyy syöttää sähköpostiosoitteesi ja salasanasi uudelleen, jotta voit käyttää kioskia. Kirjaudu ulos vain silloin, kun haluat vaihtaa tiliä tai määrittää kioskin uudelleen.
:::

## Seuraavat vaiheet

Kun olet kirjautunut sisään, voit [määrittää tulostimen](./printer-setup.md) tai siirtyä suoraan [sisäänkirjautumisen työnkulkuun](../check-in/index.md).

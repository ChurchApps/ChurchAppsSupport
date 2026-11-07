---
title: "Kirjautuminen"
---

# Kirjautuminen

<div class="article-intro">

Ennen kuin infopistettä voi käyttää sisäänkirjautumiseen, sinun on kirjauduttava sisään ChurchApps-tilillä, jolla on pääsy seurakuntaasi. Tämä sivu käsittelee ensimmäisen kirjautumisen, seurakunnan valinnan, automaattisen kirjautumisen toiminnan ja uloskirjautumisen.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna B1 Church Checkin Android-tabletillesi (katso [Aloittaminen](./index.md))
- Varmista, että sinulla on ChurchApps-tilisi sähköpostiosoite ja salasana valmiina
- Tililläsi on oltava seurakunnassasi **Checkin**-oikeus (tai **Edit Attendance**-oikeus). Ylläpitäjä lisää sen B1 Adminissa kohdassa **Settings > Roles** (eli **Asetukset > Roolit**). Katso [Sisäänkirjautumisinfopisteen tilit](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Ensimmäinen kirjautuminen

1. Avaa B1 Church Checkin -sovellus. Aloitusruudun jälkeen näet kirjautumisnäkymän, jossa on B1 Church Checkin -logo.
2. Kirjoita **sähköpostiosoitteesi** ensimmäiseen kenttään.
3. Kirjoita **salasanasi** toiseen kenttään.
4. Napauta **Kirjaudu sisään** -painiketta.

Sovellus tarkistaa tunnuksesi ja kirjaa sinut sisään. Jos sähköpostiosoite tai salasana on väärä, näytön alareunaan ilmestyy virheilmoitus.

Jos tilillä on käytössä [kaksivaiheinen kirjautuminen](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), sovellus pyytää sen jälkeen koodia. Anna tilin omistajan todennussovelluksen 6-numeroinen koodi tai jokin hänen varakoodeistaan ja napauta uudelleen **Kirjaudu sisään**. Koodia tarvitaan vain tässä ensimmäisessä kirjautumisessa. Sen jälkeen infopiste pysyy kirjautuneena.

:::info
Tämä on sama sähköpostiosoite ja salasana, jota käytät B1 Adminissa tai muissa ChurchApps-tuotteissa. Infopisteelle ei tarvita erillistä tiliä.
:::

## Seurakunnan valitseminen

Onnistuneen kirjautumisen jälkeen sovellus lataa seurakunnat, joissa tililläsi on **Checkin**- tai **Edit Attendance** -oikeus. Seurakunnat, joissa sinulla on vain muita oikeuksia, jätetään pois. Jos yhtään seurakuntaa ei jää jäljelle, sovellus näyttää ilmoituksen **No check-in access** (eli ei sisäänkirjautumisoikeutta) ja pyytää sinua pyytämään seurakuntasi ylläpitäjää lisäämään Checkin-oikeuden johonkin roolistasi. Jokainen seurakunta näkyy korttina, jossa on seurakunnan nimi ja logo (jos se on määritetty B1 Adminissa).

- Jos tilisi on yhdistetty **vain yhteen seurakuntaan**, näet silti valintanäkymän. Jatka napauttamalla seurakuntaasi.
- Jos tilisi on yhdistetty **useisiin seurakuntiin**, napauta seurakuntaa, jota tämän infopisteen pitää palvella.

Kun valitset seurakunnan, sovellus lataa sen brändäyksen ja ulkoasuasetukset. Seurakuntasi logo näkyy yläpalkissa kaikilla seuraavilla näytöillä.

## Automaattinen kirjautuminen myöhemmillä käynnöillä

Ensimmäisen onnistuneen kirjautumisen jälkeen sovellus tallentaa tabletille turvallisen kirjautumistunnuksen ja valitsemasi seurakunnan. Salasanaa se ei tallenna. Seuraavilla käynnistyskerroilla:

- Sovellus kirjaa sinut takaisin sisään tallennetulla tunnuksella.
- Jos valitsit seurakunnan aiemmin, se palauttaa valintasi ja vie sinut suoraan **palvelunäkymään**.
- Jos tallennettu kirjautuminen ei ole enää voimassa, sovellus palaa kirjautumisnäkymään, jotta voit kirjautua uudelleen.

:::tip
Koska infopiste kirjautuu automaattisesti sisään, tunnukset tarvitsee syöttää vain kerran alkuasetuksissa. Sen jälkeen tabletti voidaan kytkeä päälle, ja se on valmis käyttöön.
:::

## Järjestelmänvalvojan asetukset

Järjestelmänvalvojan asetukset on piilotettu tarkoituksella, jotta infopistettä käyttävät seurakuntalaiset eivät vahingossa muuta asetuksia. Näihin pääsee seuraavasti:

1. Napauta yläpalkin **seurakunnan logoa** **seitsemän kertaa** nopeasti peräkkäin (kahden sekunnin sisällä).
2. Jos infopisteelle on asetettu PIN-koodi, anna se, kun sitä pyydetään.
3. **Järjestelmänvalvojan asetukset** -näkymä avautuu seuraavilla vaihtoehdoilla:
   - **Change Service** (eli Vaihda palvelu): vaihda valittu palveluaika
   - **Change Printer** (eli Vaihda tulostin): avaa [tulostimen asetukset](./printer-setup), joista voit etsiä ja valita tulostimen
   - **Set/Change PIN** (eli Aseta/vaihda PIN): aseta tai päivitä infopisteen PIN-koodi, joka suojaa järjestelmänvalvojan käytön
   - **Logout** (eli Kirjaudu ulos): kirjaudu ulos ja palaa kirjautumisnäkymään

:::warning
Uloskirjautuminen poistaa kaikki tallennetut tunnukset ja seurakuntavalinnan. Sinun on syötettävä sähköpostiosoitteesi ja salasanasi uudelleen, jotta voit käyttää infopistettä taas. Kirjaudu ulos vain, kun haluat vaihtaa tiliä tai määrittää infopisteen uudelleen.
:::

## Seuraavat vaiheet

Kun olet kirjautunut sisään, voit [määrittää tulostimen](./printer-setup) tai siirtyä suoraan [sisäänkirjautumisprosessiin](../check-in/).

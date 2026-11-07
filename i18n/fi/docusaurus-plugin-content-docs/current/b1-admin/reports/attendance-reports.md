---
title: "Raporti o osallistumisesta"
description: "Ohje B1 Adminin kolmeen osallistumisraporttiin (Attendance Trend, Group Attendance, Daily Group Attendance): mitä kukin näyttää sekä ajo- ja vientiohjeet."
---

# Raporti o osallistumisesta

<div class="article-intro">

B1 Admin tarjoaa kolme raporttia osallistumisesta, joiden avulla voit ymmärtää, miten ihmiset osallistuvat jumalanpalveluksiin ja ryhmiin. Jokainen raportti tarjoaa erilaisen näkökulman osallistumistietoihin, yleisistä suuntauksista päivittäisiin erittelyihin.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Varmista, että osallistumista [seurataan johdonmukaisesti](../attendance/tracking-attendance.md) jumalanpalveluksissa ja ryhmissä
- Varmista, että [ryhmät](../groups/creating-groups.md) ja jumalanpalvelukset on määritetty B1 Adminissa
- Tarvitset asianmukaiset [oikeudet](../settings/roles-permissions.md) raportteihin pääsemiseksi

</div>

## Osallistumisen kehitys

Osallistumisen kehitys -raportti näyttää, miten jumalanpalvelusten osallistuminen muuttuu ajan myötä.

1. Siirry suoraan selaimessasi osoitteeseen **admin.b1.church/reports/attendanceTrend** (raporteilla ei ole omaa kohtaa navigointivalikossa, joten osoitteen lisääminen kirjanmerkkeihin on helpoin tapa palata siihen). Sama raportti löytyy myös Osallistuminen-sivulta: napsauta **Kaikki vuodet** ja valitse sitten välilehti **Osallistumisen kehitys**.
2. Halutessasi valitse **Seurakunta**, **Jumalanpalvelus**, **Jumalanpalveluksen aika** tai **Ryhmä** suodattaaksesi tuloksia.
3. Aseta **Alkupäivämäärä** ja **Loppupäivämäärä**. Oletuksena raportti kattaa viimeisen vuoden, vuoden takaa tähän päivään, ja loppupäivä sisältyy kokonaisuudessaan. Napsauta **Suorita raportti**.
4. Raportti näyttää pylväskaavion ja taulukon viikoittaisista kokonaiskäynneistä. Jokainen viikko on merkitty kyseisen viikon sunnuntain päivämäärällä, ja taulukon sarake **Kokoontumispäivät** luettelee ne todelliset päivämäärät kyseisellä viikolla, joilla oli osallistujia (esimerkiksi "9/27, 9/30").

Tästä raportista on apua esimerkiksi kausittaisten laskujen, kasvutrendien tai erityistapahtumien vaikutuksen havaitsemisessa.

## Ryhmän osallistuminen

Ryhmän osallistuminen -raportti näyttää, ketkä osallistuivat kunkin ryhmän kokoontumiseen valitulla aikavälillä.

1. Siirry suoraan selaimessasi osoitteeseen **admin.b1.church/reports/groupAttendance**, tai napsauta Osallistuminen-sivulla **Kaikki vuodet** ja valitse välilehti **Ryhmän osallistuminen**.
2. Halutessasi valitse **Seurakunta** ja **Jumalanpalvelus**.
3. Aseta **Alkupäivämäärä** ja **Loppupäivämäärä**. Oletuksena raportti kattaa viime sunnuntain tähän päivään, ja loppupäivä sisältyy kokonaisuudessaan.
4. Napsauta **Suorita raportti**.

Tulokset ryhmitellään kokoontumispäivän, sitten jumalanpalveluksen ajan ja sitten ryhmän mukaan, ja kunkin ryhmän alla luetellaan osallistuneet henkilöt. Jumalanpalveluksen ajat, ryhmät ja nimet on lajiteltu aakkosjärjestyksessä. Jokaisen henkilön nimen vieressä sarake **Sisäänkirjautumisaika** näyttää ajan, jolloin osallistuminen kirjattiin (tyhjä, jos aikaa ei ole tallennettu), ja sarake **Jäsenyyden tila** näyttää tilan, kuten Jäsen tai Vierailija. Mukana ovat myös ryhmien kokoontumiset, jotka eivät pidä kokoontumistaan jumalanpalveluksen aikaan; ne näkyvät ilman jumalanpalveluksen aikaa.

Taulukkolaskentatiedoston lataamiseksi napsauta **Latausasetukset** ja valitse **Yhteenveto**. CSV-tiedosto sisältää:

- Yhden rivin jokaista aikavälillä kokoontuneen ryhmän jäsentä kohden, lajiteltuna ryhmän ja sitten nimen mukaan.
- Henkilön nimen ja ryhmän nimen ensimmäisissä sarakkeissa.
- Yhden sarakkeen jokaista päivämäärällistä kokoontumista kohden. Sarakkeen nimi koostuu jumalanpalveluksesta, jumalanpalveluksen ajasta ja päivämäärästä (esimerkiksi "Sunnuntai - 9:00 (2026-09-27)"), ja jokaisen henkilön kohdalla lukee **läsnä** tai **poissa**. Kokoontuminen ilman jumalanpalveluksen aikaa on nimetty pelkällä päivämäärällä.

Tämän raportin avulla voit verrata osallistumista ryhmien välillä ja selvittää, mitkä ryhmät kasvavat tai tarvitsevat huomiota.

## Päivittäinen ryhmän osallistuminen

Päivittäinen ryhmän osallistuminen -raportti (otsikoltaan **Ryhmän osallistuminen päivittäin**) antaa päivä päivältä laskelman siitä, kuinka monta henkilöä osallistui yhteen ryhmään.

1. Siirry suoraan selaimessasi osoitteeseen **admin.b1.church/reports/dailyGroupAttendance**.
2. Käytä pudotusvalikoita **Seurakunta**, **Jumalanpalvelus** ja **Jumalanpalveluksen aika** rajataksesi luetteloa, ja valitse sitten tarkasteltava **Ryhmä**.
3. Suorita raportti. Se listaa kaikki päivät, jolloina ryhmä kokoontui, vanhimmasta uusimpaan, ja sarakkeissa on **Päivämäärä** sekä sinä päivänä kirjattujen **Osallistujien** määrä.

Tämä raportti antaa tarkkaa tietoa, mikä on hyödyllistä viikosta toiseen tapahtuvan vaihtelun ymmärtämisessä tai tiettyjen päivien tunnistamisessa, joina osallistuminen oli poikkeuksellisen korkeaa tai matalaa.

:::tip
Käytä Osallistumisen kehitys -raporttia yleiskatsaukseen ja Päivittäinen ryhmän osallistuminen -raporttia, kun haluat tarkastella tiettyjä päivämääriä yksityiskohtaisemmin.
:::

## Käytännön käyttötapoja

- **Suunnittelu** -- Käytä osallistumistrendejä istumapaikkojen, henkilöstön ja resurssien suunnitteluun tulevia jumalanpalveluksia varten.
- **Tavoittaminen** -- Tunnista varhain laskevat osallistumistrendit, jotta voit ottaa yhteyttä jäseniin.
- **Hallitusraportit** -- Sisällytä osallistumistiedot säännöllisiin johtoraportteihisi seurakunnan toiminnan elinvoimaisuuden osoittamiseksi.
- **Tapahtumien arviointi** -- Vertaa osallistumista ennen erityistapahtumia ja niiden jälkeen niiden vaikutuksen mittaamiseksi.

:::warning
Osallistumistiedot kirjataan ryhmien ja jumalanpalvelusten sisäänkirjautumisprosesseissa. Jos osallistumista ei seurata johdonmukaisesti, raporttisi eivät kuvaa todellista osallistumista oikein. Katso asennusohjeet kohdasta [Osallistumisen seuranta](../attendance/tracking-attendance.md).
:::

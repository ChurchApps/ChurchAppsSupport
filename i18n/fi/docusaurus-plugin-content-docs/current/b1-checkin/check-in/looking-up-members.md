---
title: "Jäsenten haku"
description: "Etsi perheesi B1 Checkin -kioskilla hakemalla puhelinnumeron numeroilla tai nimellä. Rekisteröidy vieraana, jos olet ensikertalainen."
---

# Jäsenten haku

<div class="article-intro">

Kun olet valinnut palvelun, avautuu jäsenhakunäkymä. Täältä etsit perheesi, jotta voit kirjautua sisään. Sovellus tukee hakua puhelinnumeron tai nimen perusteella.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [Valitse palvelu](./selecting-service.md) palvelunäkymästä
- Varmista, että kirkon ylläpitäjä on [lisännyt talouden järjestelmään](../../b1-admin/people/adding-people.md)

</div>

## Hakutilat

Hakunäkymässä on kaksi hakutilaa. Voit vaihtaa niiden välillä napauttamalla näytön yläosan valitsinta:

- **Puhelin** -- Haku puhelinnumeron perusteella. Tämä on oletustila.
- **Nimi** -- Haku nimen perusteella.

## Haku puhelinnumerolla

1. Varmista, että **Puhelin** on aktiivinen hakutila (se on korostettu yläosassa).
2. Napauta hakukenttää ja syötä näytönäppäimistöllä vähintään **4 numeroa** puhelinnumerostasi.
3. Napauta **Hae**-painiketta tai paina näppäimistön hakunäppäintä.

Sovellus etsii jäseniä, joiden puhelinnumero vastaa syöttämiäsi numeroita. Jos syötät yli 4 numeroa, sovellus käyttää koko numeroa. Jos syötät täsmälleen 4 numeroa, sovellus vertaa niitä tallennettujen puhelinnumeroiden viimeisiin 4 numeroon.

## Haku nimellä

1. Napauta näytön yläosassa olevaa **Nimi**-valitsinta vaihtaaksesi nimihakuun.
2. Kirjoita hakukenttään vähintään **2 merkkiä** henkilön nimestä.
3. Napauta **Hae**-painiketta.

Sovellus etsii jäseniä, joiden nimi vastaa kirjoittamaasi.

## Henkilön valitseminen

Hakutulokset näkyvät korttina hakukentän alapuolella. Jokaisessa kortissa näkyvät henkilön **nimi** ja **valokuva** (jos sellainen on tallennettu).

Napauta henkilön korttia valitaksesi hänet. Sovellus lataa kyseisen henkilön talouden kaikki jäsenet ja vie sinut [talouden tarkistusnäkymään](./household-review.md).

:::tip
Nopein tapa etsiä perheesi on hakea puhelinnumeron viimeisillä 4 numerolla. Kannusta jäseniä käyttämään tätä menetelmää, jotta sisäänkirjautuminen sujuu nopeammin.
:::

:::warning
Jos hakutuloksia ei löydy, sovellus näyttää siitä ilmoituksen. Tarkista syöttämäsi numerot tai nimi tai kokeile toista hakutilaa. Jos olet ensikertalainen vierailija, pyydä vapaaehtoiselta apua, jotta sinut [lisätään järjestelmään](../../b1-admin/people/adding-people.md).
:::

## Rekisteröityminen vieraana

Jos kirkossasi on käytössä QR-vierasrekisteröinti, hakunäkymässä hakukentän alla näkyy linkki **Rekisteröidy vieraana**. Ensikertalaiset vierailijat voivat käyttää sitä lisätäkseen perheensä kirkon järjestelmään ennen sisäänkirjautumista.

1. Napauta **Rekisteröidy vieraana**. Avautuu ikkuna, jossa on QR-koodi ja teksti ”Skannaa rekisteröityäksesi vieraana.”
2. Valitse, miten täytät [vieraan rekisteröintilomakkeen](../../b1-church/checkin/guest-registration.md):
   - **Omalla puhelimella** -- Skannaa QR-koodi, täytä lomake puhelimellasi ja sulje ikkuna napauttamalla **OK**.
   - **Infopisteessä** -- Napauta **Rekisteröidy tässä**, jolloin sama lomake avautuu suoraan tabletilla. Täytä se ja napauta **Rekisteröidy**. Palaa hakunäkymään napauttamalla **Valmis** (tai takaisin-nuolta).
3. Kun olet rekisteröitynyt, hae perheesi nimellä tai puhelinnumerolla sisäänkirjautumista varten.

:::info
Lomake, joka avautuu **Rekisteröidy tässä** -painikkeesta, pysyy vieraiden rekisteröintisivulla. Vierailijat eivät voi siirtyä infopisteen laitteelta muille kirkon verkkosivuston osille. Jos lomakkeeseen ei kosketa eikä siihen kirjoiteta 2 minuuttiin, infopiste sulkee sen ja palaa hakunäkymään. Aina kun lomake suljetaan, siihen kirjoitettu teksti tyhjennetään, jotta seuraava perhe aloittaa tyhjältä lomakkeelta.
:::

## Tarrojen tulostaminen puhelimella tehdyn sisäänkirjautumisen jälkeen

Perheet, jotka ovat jo kirjautuneet sisään puhelimellaan [B1 Church -itsepalvelun](../../b1-church/checkin/self-checkin.md) kautta, voivat tulostaa nimilappunsa infopisteellä ilman, että heidän tarvitsee etsiä itseään.

1. Napauta hakunäkymässä **Skannaa koodi** -painiketta (QR-koodikuvake).
2. Pidä puhelimesi QR-koodia kameran edessä. Jos sovellus pyytää kameran käyttöoikeutta, napauta **Salli kamera**. Oletuksena käytetään etukameraa; vaihda kameraa napauttamalla kääntöpainiketta.
3. Infopiste löytää sisäänkirjautumisen, tulostaa tarrat ja palaa hakunäkymään.

Koodin skannaaminen tulostaa vain tarrat -- läsnäolo kirjattiin jo, kun perhe kirjautui sisään puhelimellaan. Jos koodi ei vastaa aktiivista sisäänkirjautumista, infopiste näyttää ilmoituksen ja palaa hakunäkymään.

## Seuraava vaihe

Kun olet valinnut henkilön, [tarkistat taloutesi](./household-review.md) ja hallitset ryhmäjäseniä.

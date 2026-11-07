---
title: "Lomakkeiden luominen"
---

# Lomakkeiden luominen

<div class="article-intro">

Luo mukautettuja lomakkeita, joilla keräät tietoja seurakuntalaisilta. Voit luoda lomakkeita tapahtumailmoittautumisiin, kyselyihin, vierailijakortteihin, jäsenhakemuksiin ja muuhun tarpeeseen. Lomakkeet voidaan liittää tietokannasi henkilöihin tai käyttää itsenäisinä sivuina, joilla on oma julkinen osoite.

</div>

## Koulutusvideo

<YouTube id="sr9wxEj9ghQ" title="Lomakkeiden luominen ja vastausten hallinta B1:ssä" next="Seurakuntasi verkkosivuston julkaiseminen B1:ssä" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- **Henkilö**-lomakkeita (jotka liitetään henkilötietueisiin) varten tarvitset ensin [henkilöitä tietokannassasi](../people/adding-people.md).
- Lomakkeita, joilla kerätään **maksuja**, varten sinulla täytyy olla [Stripe määritettynä verkkolahjoituksia varten](../donations/online-giving-setup.md).

</div>

## Uuden lomakkeen luominen

1. Avaa [pikavalikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki B1 Adminin vasemmassa yläkulmassa), laajenna **People**-kohta ja valitse **Forms**.
2. Valitse **Add Form**.
3. Anna lomakkeelle **nimi**.
4. Valitse lomaketyyppi pudotusvalikosta **Associate With**:
   - **People** – Liittää lähetykset [henkilötietueisiin](../people/adding-people.md) tietokannassasi. Henkilö-lomakkeet täytetään henkilön tietueesta, joten niille ei ole jaettavaa linkkiä.
   - **Stand Alone** – Luo itsenäisen lomakkeen, jolla on oma julkinen osoite. Se sopii erinomaisesti ulkopuolisiin ilmoittautumisiin. Vain Stand Alone -lomakkeissa voi käyttää [otsikkokuvaa](#adding-a-header-photo), [QR-koodia](#sharing-a-form-with-a-qr-code), [linkitettyä ryhmää](#linking-a-form-to-a-group) ja **Create a person record from submissions** -asetusta.
5. Luo lomake valitsemalla **Save**.

Uusi lomakkeesi näkyy listassa. Aloita kysymysten lisääminen klikkaamalla sitä.

## Tyhjän lomakkeen tulostaminen {#printing-a-blank-form}

Tarvitsetko paperikopion jaettavaksi, esimerkiksi vierailijakortin tervetuliaispisteeseen tai lomakkeen henkilölle, jolla ei ole internetyhteyttä? Valitse pääluettelon Forms-listalla lomakkeen vierestä **Print**, jolloin avautuu esikatselu. Valitse sitten **Print**. Tyhjät kentät tulostuvat niin, että jokaisen kysymyksen kohdalla on alleviivaus tai valintaruutu, jotta ihmiset voivat täyttää lomakkeen käsin. Pakolliset kysymykset on merkitty tähdellä. Sivun yläosassa näkyy seurakuntasi logo (**Light Background Logo** kohdasta [Website > Appearance](../website/appearance.md), jos olet ladannut sellaisen), seurakunnan nimi sen alla ja sen jälkeen lomakkeen nimi. Muita tulostusasetuksia ei ole: tulostat koko lomakkeen tai et mitään.

## Lomakkeen jakaminen QR-koodilla {#sharing-a-form-with-a-qr-code}

Stand Alone -lomakkeiden vieressä pääluettelon Forms-listalla on **QR Code**-linkki. Arkistoiduilla lomakkeilla sitä ei ole. Valitse linkki, jolloin avautuu lomakkeen julkisen osoitteen QR-koodi ja osoite koodin alla. Tallenna koodi kuvana valitsemalla **Download PNG**, jolloin voit tulostaa sen tiedotteisiin tai näyttää sen diaesityksessä. Jokainen, joka skannaa koodin, avaa lomakkeen puhelimellaan.

## Kysymysten lisääminen {#adding-questions}

1. Avaa lomakkeesi ja siirry välilehdelle **Questions**.
2. Valitse **Add Question**.
3. Valitse **kenttätyyppi** avattavasta Provider-valikosta. Käytettävissä olevia tyyppejä ovat muun muassa:
   - **Textbox** – Lyhyisiin tekstivastauksiin
   - **Date** – Päivämäärävalintoihin
   - **Email** – Sähköpostiosoitteisiin
   - **Phone Number** – Puhelinnumeroille
   - **Multiple Choice** – Valmiista vaihtoehdoista valitsemiseen
   - **Payment** – Maksujen keräämiseen
4. Anna kysymykselle **Title** ja halutessasi **Description**. Kuvaus näkyy kysymyksen alla, kun ihmiset täyttävät lomaketta, joten käytä sitä vihjeisiin, kuten "Mainitse kaikki allergiat, jotka meidän pitäisi tietää."
5. Valitse **Require an answer**, jos kenttä on pakollinen.
6. Valitse **Save**.
7. Lisää lisää kysymyksiä toistamalla vaiheet.

:::warning
**Payment**-kenttätyyppi edellyttää, että Stripe on määritetty. Jos et ole vielä ottanut verkkolahjoituksia käyttöön, lue ohje [Verkkolahjoitusten määrittäminen](../donations/online-giving-setup.md) ennen maksukenttien lisäämistä. Ihmisten, jotka maksavat lomakkeella kirjautumatta sisään, täytyy valita ruutu **Minä en ole robotti** ennen kuin kortti hyväksytään.
:::

## Lomakkeen jäsenten hallinta {#managing-form-members}

1. Avaa lomakkeesi ja siirry välilehdelle **Form Members**.
2. Hae henkilö ja lisää hänet roolilla:
   - **Admin** – Voi muokata lomaketta ja tarkastella kaikkia lähetyksiä.
   - **View Only** – Voi tarkastella lähetyksiä, mutta ei muokata lomaketta.

## Lomakkeen linkittäminen ryhmään {#linking-a-form-to-a-group}

Voit linkittää minkä tahansa Stand Alone -lomakkeen ryhmään, esimerkiksi pienryhmän rukouspyyntölomakkeen tai nuorten matkan lääketieteellisen vapautuslomakkeen:

1. Avaa lomakkeesi **Details**.
2. Valitse kohdassa **Linked group** ryhmä tai jätä asetukseksi **None**.
3. Valitse **Save**.

Kun lomake on linkitetty:

- **Ryhmän jäsenet** näkevät lomakkeen B1.church-sivuston ryhmäsivun **Forms**-osiossa, kun lomake on avoinna. Siinä on **Fill out**-painike, joka avaa lomakkeen (katso [Ryhmän tiedot](../../b1-church/groups/group-details.md#linked-forms)).
- **Ryhmän johtajat** näkevät myös suljetut lomakkeet. He voivat lukea jokaisen lähetyksen vastaukset ja tulostaa ne (yksi lähetys tai **Print all**). Johtajat voivat vain tarkastella vastauksia. He eivät voi muokata lomaketta, ellei heitä ole lisätty [lomakkeen jäseniksi](#managing-form-members).
- **B1 Adminissa** ryhmän sivulla on osio **Linked forms**, jossa jokainen linkitetty lomake näkyy tilassa **Open** tai **Closed**. Osio näkyy ryhmän johtajille ja henkilöille, jotka voivat hallita lomakkeita. Katso [Ryhmän jäsenet](../groups/group-members.md#linked-forms).

Lomake on suljettu, kun se on sen saatavuusajan ulkopuolella. Arkistoituja lomakkeita ei näytetä ryhmäsivulla.

### Lähettäjien lisääminen ryhmään automaattisesti {#automatically-adding-submitters-to-a-group}

Lomakkeen linkittäminen ryhmään ei itsessään lisää ketään ryhmään. Jos haluat lisätä jokaisen lähettäjän linkitetyn ryhmän jäsenlistalle, ota lomakkeen tiedoissa käyttöön myös asetus **Create a person record from submissions** ja valitse **Save**.

Aina kun joku lähettää lomakkeen, vastaava tai juuri luotu henkilö lisätään ryhmään. Jo ryhmän jäsenet ohitetaan. Tämä on hyödyllistä esimerkiksi leirin ilmoittautumislomakkeelle, joka rakentaa leirin ryhmän jäsenlistan automaattisesti.

### Seurantasähköpostin lähettäminen

Kun **Create a person record from submissions** on käytössä, voit lähettää sähköpostin jokaiselle lomakkeen lähettäjälle. Täytä lomakkeen tiedoissa kentät **Follow-up Email Subject** ja **Follow-up Email Body**. Molemmissa voit käyttää merkkijonoja `{firstName}` ja `{churchName}`. Sähköposti lähetetään vain, jos molemmat kentät on täytetty.

:::info
Seurantasähköpostit lähtevät vasta, kun seurakuntasi on hyväksytty lähettämään ryhmäsähköposteja. Ne lasketaan seurakuntasi päivittäiseen sähköpostirajaan. Katso [Ryhmäsähköpostin käyttöönotto seurakunnallesi](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Lomakkeen kopioiminen

Voit käyttää lomaketta uuden lomakkeen lähtökohtana. Valitse lomakkeen vierestä lomakelistalla **Duplicate** ja vahvista. B1 luo lomakkeesta täsmällisen kopion, kysymykset mukaan lukien. Voit sitten nimetä kopion uudelleen ja muokata sitä itsenäisesti.

:::tip
Kopioiminen on kätevää toistuvia tapahtumia varten, joissa ilmoittautumiskysymykset pysyvät samoina vuodesta toiseen. Kopioi viime vuoden lomake, päivitä nimi ja päivämäärät, ja olet valmis.
:::

## Lomakkeen asetusten muokkaaminen

Voit päivittää lomakkeen nimen ja asetukset milloin tahansa. Stand Alone -lomakkeissa näet myös yksilöllisen **julkisen osoitteen**, jonka voit jakaa kenelle tahansa, sekä kentän **Description**. Kuvaus näkyy kysymysten yläpuolella julkisella lomakesivulla. Sitä voi käyttää kertomaan, mihin lomake on tarkoitettu ennen kuin ihmiset alkavat täyttää sitä.

### Otsikkokuvan lisääminen {#adding-a-header-photo}

Stand Alone -lomakkeissa voi näyttää **Header Photo** -kuvan lomakkeen yläreunassa. Valitse lomakkeen tiedoissa kuvaruutu tai **Add Photo**, valitse kuva tai lataa se (kuva rajataan 16:9-muotoon). Valitse **Save**. Kuva näkyy lomakkeen nimen alapuolella ja kuvauksen yläpuolella lomakkeen julkisen osoitteen sivulla sekä kaikkialla, minne lomake on upotettu verkkosivuston **Form**-elementillä. Käytä **Change Photo** -painiketta vaihtaaksesi kuvan tai **Remove** -painiketta poistaaksesi sen.

Kentällä **Thank You Message** voit määrittää, mitä ihmiset näkevät lomakkeen lähettämisen jälkeen. Tämä näkyy myös lomakkeen julkisen osoitteen sivulla. Jos jätät kentän tyhjäksi, he näkevät tekstin "Kiitos lomakkeen lähettämisestä!"

:::tip
Stand Alone -lomakkeet sopivat erinomaisesti tapahtumailmoittautumisiin. Jaa julkinen osoite sähköpostitse tai sosiaalisessa mediassa tai upota lomake suoraan seurakuntasi verkkosivuille.
:::

:::info
Jos haluat upottaa lomakkeen B1-verkkosivustollesi, avaa verkkosivueditori, lisää uusi osio ja valitse elementti **Form**. Valitse sitten näytettävä lomake. Lisätietoja verkkosivujen muokkaamisesta on kohdassa [Sivujen hallinta](../website/managing-pages.md).
:::

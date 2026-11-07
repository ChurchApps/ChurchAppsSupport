---
title: "Läsnäolon kirjaaminen"
---

# Läsnäolon kirjaaminen

<div class="article-intro">

Kun seurakuntasi, palveluajat ja ryhmät on määritetty, voit kirjata läsnäolon manuaalisesti jokaisen kokoontumisen jälkeen. B1 Admin järjestää läsnäolon **istuntojen** mukaan: yksi istunto per ryhmä ja kokoontumispäivä. Luot istunnon, merkitset paikalle tulleet, ja tiedot siirtyvät suoraan läsnäoloraportteihisi.

</div>

## Koulutusvideo

<YouTube id="gS8h2rhyMys" title="Läsnäolon kirjaaminen ja seuranta B1:ssä" next="Suunnitelmien luominen ja vapaaehtoisten ajoittaminen B1:ssä" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Seurakuntasi, palveluaikasi ja ryhmäsi on oltava määritetty. Katso [Läsnäolon asetukset](setup.md), jos et ole vielä tehnyt tätä.
- Ryhmillä, joiden läsnäoloa haluat seurata, on oltava **Track Attendance** käytössä. Katso lisätietoja kohdasta [Läsnäolon asetukset](setup.md).
- Tarvitset **Edit Attendance** -oikeuden läsnäolon tallentamiseen. Vapaaehtoiset, joilla on pelkkä **View People Names Only** -oikeus henkilöihin, voivat silti kirjata läsnäoloa tällä tavalla. He avaavat luokat kohdasta **Groups** ja näkevät jäsenet vain nimillä. Katso [People Names Only](../settings/roles-permissions.md#people-names-only).

</div>

## Istunnon luominen

Istunto edustaa yhtä ryhmän kokoontumiskertaa, esimerkiksi K–3. luokan ryhmää tiettynä sunnuntaina.

1. Avaa **B1 Admin**, avaa [Jump-valikko](../introduction.md#getting-around-with-the-jump-menu) (hakupalkki vasemmassa yläkulmassa), laajenna **People** ja valitse **Groups**.
2. Valitse ryhmä, jonka läsnäoloa haluat kirjata.
3. Ryhmän sivun **Sessions**-osiossa valitse **All sessions**.
4. Luo uusi istunto valitsemalla **New**.
5. Jos ryhmä on liitetty palveluaikaan, valitse **Service Time**. Jos ryhmä ei ole ajoitettu, tätä kenttää ei näy.
6. Valitse **Session Date** -- se voi olla tänään, menneisyyden tai tulevaisuuden päivä.
7. Valitse **Save**.

### Istuntojen lisääminen jokaiselle palveluajan luokalle

Jos muut ryhmät kokoontuvat samaan palveluaikaan (esimerkiksi kaikki lastenluokkasi sunnuntaina klo 9.00), voit luoda niiden istunnot yhdellä kertaa sen sijaan, että kävisit jokaisen ryhmän sivulla.

1. Noudata yllä olevia ohjeita ja valitse **Service Time**.
2. Valitse **Also add for the other _N_ groups in _service time_**. Valintaruutu näyttää, kuinka monta muuta ryhmää on liitetty kyseiseen palveluaikaan. Se näkyy vain uutta istuntoa lisättäessä, ja vain jos vähintään yksi muu ryhmä kokoontuu samaan aikaan.
3. Valitse **Save**.

Istunto luodaan nykyiselle ryhmälle ja jokaiselle muulle samaan palveluaikaan kuuluvalle ryhmälle samana päivänä. Ryhmät, joilla on jo istunto kyseiselle päivälle ja palveluajalle, ohitetaan, joten päällekkäisiä istuntoja ei synny.

:::tip
Voit luoda istuntoja menneille päiville, jos haluat kirjata jälkikäteen läsnäoloa, jota et ole vielä merkinnyt. Voit myös luoda ne etukäteen, jotta ne ovat valmiina, kun ryhmäsi kokoontuu.
:::

## Istunnon muistiinpanot {#session-notes}

Jokaiseen istuntoon voi liittää muistiinpanoja. Ne voivat olla yhteenveto käsitellystä aiheesta, tiedotteita tai rukousaiheita.

1. Kun lisäät istunnon tai valitset istunnon listassa kynäkuvakkeen (**Edit**), kirjoita tekstiä **Notes (what was covered, announcements, prayer requests)** -kenttään päivämäärän alapuolella. Työkalurivillä voit lisätä lihavointia, luetteloita ja linkkejä.
2. Valitse **Save**.

Muistiinpanot näkyvät istunnon läsnäololistan yläosassa. Ne ovat myös kokoontumismuistiinpanoja, joita ryhmän jäsenet lukevat B1.church-sivuston ryhmän sivun **Meetings**-osiossa. Ryhmänjohtajat voivat kirjoittaa ja muokata niitä myös siellä. Katso [Ryhmän tiedot](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Läsnäolon merkitseminen

Valitse istunto nähdäksesi sen läsnäololistan. Jokainen ryhmän jäsen on listattu valintaruudulla, lajiteltuna sukunimen mukaan, ja jo paikalle merkityt on valittu.

1. Valitse ruutu jokaisen paikalle tulleen kohdalta. Voit vaihtaa kaikkien tilan kerralla valitsemalla **Select All** tai **Select None**.
2. Luettelon yläpuolella oleva laskuri (esimerkiksi "12 of 15 present") päivittyy, kun valitset ruutuja.
3. Valitse **Save Attendance**. Mitään ei kirjata ennen tallentamista, ja viesti vahvistaa, kun tallennus on valmis. Jos yrität sulkea tai ladata selaimen välilehden uudelleen kesken tallennuksen, selain varoittaa sinua, jotta muutokset eivät katoa.

Jos poistat valinnan henkilöltä, joka oli jo merkitty paikalle, ja tallennat, henkilö poistetaan istunnosta.

### Vieraiden lisääminen

Jos haluat kirjata henkilön, joka ei ole ryhmän jäsen, hae hänet läsnäololistan vieressä olevasta henkilöhausta. Jos häntä ei vielä ole tietokannassasi, voit luoda hänet hakunäkymästä. Molemmissa tapauksissa hänet lisätään listalle valittuna. Kirjaa hänet valitsemalla **Save Attendance**.

Henkilöt, jotka kirjautuivat sisään kioskilla, näyttävät **Volunteer**- tai **Guest**-merkinnän. Henkilöt, jotka eivät ole ryhmän jäseniä, näyttävät **Guest**-merkinnän.

## Mitkä ryhmät tarvitsevat vielä läsnäolon

Kun useita luokkia kokoontuu samaan palveluaikaan, näet yhdellä silmäyksellä, mitkä niistä tarvitsevat vielä läsnäolonsa kirjaamisen kyseiselle päivälle.

1. Avaa istunto, jolla on palveluaika.
2. Valitse läsnäololistan yläreunasta **Who Still Needs Attendance**.
3. Valintaikkuna listaa kaikki kyseiseen palveluaikaan liitetyt ryhmät. Ylhäällä on yhteenveto, esimerkiksi "5 of 8 groups entered".

Ryhmät, joissa kyseisenä päivänä ei ole merkitty ketään paikalle, näyttävät **Not entered**-merkinnän ja ovat listan alussa. Ryhmät, joilla on läsnäoloa, näyttävät **Entered**-merkinnän ja paikalle merkittyjen henkilöiden määrän (esimerkiksi "Entered (12)"). Kun valitset ryhmän nimen, avautuu kyseisen ryhmän istuntolista, ja saman päivän istunto on jo valittuna, joten voit kirjata läsnäolon heti. Jos ryhmällä ei vielä ole istuntoa kyseiselle päivälle, avautuu sen istuntolista, jotta voit lisätä sellaisen.

:::tip
Yhdistä tämä **Print All Classes** -toimintoon ja [istuntojen lisäämiseen jokaiselle palveluajan luokalle](#adding-sessions-for-every-class-in-a-service-time): luo istunnot, jaa läsnäololomakkeet ja tarkista sitten **Who Still Needs Attendance** -toiminnolla, mitkä lomakkeet eivät ole vielä kirjattuja.
:::

## Läsnäololomakkeen tulostaminen

Läsnäololomake on tulostettava luettelo, jonka opettajat voivat merkitä käsin ja antaa sinulle myöhemmin kirjattavaksi. Jokaisessa lomakkeessa on seurakuntasi logo (**Light Background Logo** kohdasta [Website > Appearance](../website/appearance.md), jos olet ladannut sellaisen), seurakunnan nimi logon alla, luokan nimi, suuri **Date**-kenttä luokan nimen alla sekä palveluaika. Jäsenet on listattu kahteen sarakkeeseen (luetaan ensin vasen sarake ja sitten oikea), jotta sivulle mahtuu enemmän nimiä. Jokaisella jäsenellä on **Present**- ja **Absent**-ruudut. Vieraille on tyhjiä rivejä, ja lisäksi on alue **Teacher / Notes**.

- **Istunnosta** -- Valitse tulostuskuvake (**Print Roll Sheet**) istunnon läsnäololistan yläreunasta. Lomake on päivätty istunnon päivämäärällä ja näyttää kyseisen istunnon palveluajan.
- **Kaikki palvelun luokat** -- Jos istunnolla on palveluaika, valitse **Print All Classes** tulostaaksesi yhden lomakkeen jokaiselle palveluaikaan liitetylle luokalle. Jokainen luokka tulostuu omalle sivulleen.
- **Jäsenlistasta** -- Valitse ryhmän sivulla **All members** ja sitten jäsenlistan yläpuolella oleva **Print Roll Sheet** -kuvake. Valitse **Attendance Sheet** tulostaaksesi päivämäärättömän lomakkeen. Samasta valikosta löytyy myös **Contact Roster** -asettelu, jossa on jokaisen jäsenen puhelin, sähköposti ja osoite. Katso [Jäsenlistan tulostaminen](../groups/group-members.md#printing-the-member-list).

Lomake avautuu uuteen välilehteen, ja selaimen tulostusikkuna avautuu automaattisesti.

## Läsnäolon vieminen taulukkolaskentaan

Voit ladata istunnosta CSV-tiedoston, jonka voi avata Excelissä, Numbersissa tai Google Sheetsissä.

1. Avaa istunto, jonka haluat viedä.
2. Valitse läsnäololistan yläreunasta **Export**-painike.
3. Avaa ladattu tiedosto taulukkolaskentaohjelmassa.

Tiedostossa on yksi rivi jokaista ryhmän jäsentä kohden. Rivillä on jäsenen nimi ja tieto, oliko hän paikalla vai poissa. Lisäksi tiedostossa on istunnon päivämäärä ja istunnon muistiinpanot.

## Kirjatun läsnäolon tarkastelu

Kun olet kirjannut istuntoja, tiedot näkyvät läsnäoloraporteissasi.

- **Attendance Trend** -välilehti (Attendance-sivulla kohdassa **All years**) näyttää seurakuntakohtaiset suuntaukset ajan kuluessa. Katso [Läsnäolon seuranta](tracking-attendance.md).
- **Group Attendance** -välilehti näyttää läsnäolon eriteltynä ryhmittäin. Katso [Läsnäoloraportit](../reports/attendance-reports.md#group-attendance).

:::tip
Jos juuri luomasi istunto ei näy heti raporteissa, varmista, että istunnon päivämäärä on raporttien suodattimissa valitun aikavälin sisällä.
:::

---
title: "Membership-päätepisteet"
description: "Päätepisteiden viiteopas ChurchApps Membership API:lle: henkilöt, kotitaloudet, ryhmät, roolit, lomakkeet ja asetukset sekä todennus- ja käyttöoikeussäännöt."
---

# Membership-päätepisteet

<div class="article-intro">

Membership-moduuli hallinnoi henkilöitä, seurakuntia, ryhmiä, talouksia, rooleja, käyttöoikeuksia, lomakkeita ja asetuksia. Se on suurin moduuli, ja se tarjoaa ydintason tunnistus- ja valtuutuskerroksen kaikille muille moduuleille.

</div>

**Perusosoite:** `/membership`

## Henkilöt

Perusosoite: `/membership/people`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | People.View tai Member | Listaa seurakunnan kaikki henkilöt |
| GET | `/:id` | JWT | People.View tai oma tietue | Hae henkilö tunnisteella (sisältää lomakevastaukset) |
| GET | `/ids?ids=` | JWT | People.View, Member tai People.ViewNames | Hae useita henkilöitä pilkulla erotettujen tunnisteiden perusteella. Kutsujat, joilla on People.ViewNames mutta ei People.View, saavat perusmallin, ja käytöstä poistuneet henkilöt jätetään pois (paitsi kutsuja itse) |
| GET | `/basic?ids=` | JWT | — | Hae useiden henkilöiden perustiedot (vain nimi) |
| GET | `/names?ids=` | JWT | Mikä tahansa seurakunnan oikeus | `[{ id, name: { display, first, last }, photo }]`, lajiteltuna sukunimen ja etunimen mukaan pilkulla erotetuille tunnisteille, jotka kutsuja jo tuntee. Näin roolit ilman People.View-oikeutta (lahjoitukset, läsnäolo) voivat nimetä henkilöt. Ei hakua eikä hakemistosuodatinta |
| POST | `/names` | JWT | Mikä tahansa seurakunnan oikeus | Sama kuin `GET /names`. Runko: `{ peopleIds }` (tai `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member tai People.ViewNames | Äskettäin lisätyt henkilöt. Kutsujat, joilla on People.ViewNames mutta ei People.View (myös jäsenet, joilla on hakemistoon pääsy), saavat perusmallin (`id`, `name.display`, `photo`, `membershipStatus`), ja käytöstä poistuneet henkilöt jätetään pois |
| GET | `/guest-register/options?churchId=` | Julkinen | — | QR-vieraskirjautumisen tarkistuslista. Palauttaa `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, kukin arvo `"off"`, `"optional"` tai `"required"`. Arvot luetaan julkisesta `guestRegistrationFields`-asetuksesta. Puuttuvat tai virheelliset arvot palautuvat oletuksiin: sähköposti ja puhelin valinnaisia, muut pois. Vaatii `enableQRGuestRegistration`-asetuksen, ellei pyyntö sisällä vastaavaa sivuston tai seurakunnan tunnistetta. Nopeusrajoitettu (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member tai People.ViewNames | Hae henkilöitä nimen tai sähköpostin perusteella (enintään 100, lajiteltuna sukunimen ja etunimen mukaan). Kutsujat, joilla on People.ViewNames mutta ei People.View (myös jäsenet, joilla on hakemistoon pääsy), saavat nimihaun perusmallilla. `email`-haku palauttaa `[]` |
| GET | `/search/phone?number=` | JWT | People.View tai Member | Hae puhelinnumeron perusteella |
| GET | `/search/group?groupId=` | JWT | People.View tai Member | Hae tietyn ryhmän henkilöt |
| GET | `/household/:householdId` | JWT | — | Hae kaikki talouden henkilöt |
| GET | `/attendance` | JWT | People.Edit | Lataa osallistujat suodattimilla (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Lataa aikajanatiedot henkilöille ja ryhmille |
| GET | `/directory/:id` | JWT | — | Hae henkilö hakemistonäkymään (noudattaa näkyvyysasetuksia) |
| GET | `/claim/:churchId` | JWT | — | Liitä henkilötietue nykyiselle käyttäjälle seurakunnassa |
| POST | `/` | JWT | People.Edit tai EditSelf | Luo tai päivitä henkilöitä (erissä) |
| POST | `/search` | JWT | People.View, Member tai People.ViewNames | Hae henkilöitä (POST-versio). Runko: `{ term }` tai `{ email }`. Samat nimirajoitukset kuin `GET /search` |
| POST | `/advancedSearch` | JWT | People.View tai Member | Moniehtoinen haku (ikä, birthMonth, membershipStatus jne.). Runko on taulukko ehdoista. Tyhjä runko tarkoittaa, ettei ehtoja ole, ja mikä tahansa muu kuin taulukkomuotoinen runko palauttaa 400 |
| POST | `/loadOrCreate` | Julkinen | — | Etsi tai luo henkilö sähköpostin perusteella. Runko: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Julkinen | — | QR-vieraskirjautuminen. Runko: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 jäsentä; email/phone/maritalStatus koskevat vain ensimmäistä jäsentä). Kentät, jotka seurakunta on kytkenyt pois, jätetään huomiotta. Puuttuvat pakolliset tai virheelliset arvot palauttavat 400. Ensin käytetään olemassa olevia henkilöitä: jäsen täsmää, kun täsmälleen yksi poistamaton henkilö on samalla etunimellä (kirjainkoolla ei ole väliä) ja samalla sähköpostilla tai puhelinnumeron numeroilla (koti, työ tai matkapuhelin). Jäsen ilman sähköpostia tai puhelinta täsmää etunimen perusteella täsmänneen talouden sisällä. Täsmääviä henkilöitä ei koskaan muokata. Täsmäämättömät jäsenet liittyvät täsmänneeseen talouteen tai muutoin uuteen talouteen (nimetään ensimmäisen jäsenen sukunimen mukaan) statuksella `membershipStatus: "Visitor"` ja jaetulla `address`-osoitteella. Tallentaa `comments`-kentän muistiinpanona ensimmäiselle jäsenelle ja lisää kaikki yksityiseen `guestRegistrationGroupId`-ryhmään, jos se on asetettu. Kun `guestRegistrationRecordAttendance` on `"true"`, kirjaa läsnäolon kyseisen ryhmän ajastetuille palvelu­ajoille, joiden sisäänkirjautumisikkuna on tällä hetkellä auki. Palauttaa `{ householdId, people: [{ id, name }] }` ja toistaa lähetetyt nimet tallennettujen sijaan. Sama vapaaehtoisuuden, tunnusten ja nopeusrajoitusten käytäntö kuin options-kutsussa |
| POST | `/household/:householdId` | JWT | People.Edit | Päivitä talouden jäsenten määritykset |
| POST | `/public/email` | Julkinen | — | Lähetä sähköposti henkilölle. Runko: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Sisäinen | — | Lataa henkilöiden sähköpostit tunnisteiden perusteella (palvelimelta palvelimelle, vaatii jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Poista henkilö |

### Esimerkki: Henkilöiden haku

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Esimerkki: Henkilön luominen

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Käyttäjät

Perusosoite: `/membership/users`

Katso kirjautumista, rekisteröitymistä ja salasanojen hallintaa koskevat päätepisteet kohdasta [Todennus ja käyttöoikeudet](./authentication.md).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| POST | `/login` | Julkinen | — | Kirjaudu sisään (sähköposti/salasana, JWT-päivitys tai authGuid) |
| POST | `/register` | Julkinen | — | Rekisteröi uusi käyttäjä |
| POST | `/forgot` | Julkinen | — | Lähetä salasanan palautussähköposti |
| POST | `/setPasswordGuid` | Julkinen | — | Aseta salasana sähköpostin linkin auth-GUID:n avulla |
| POST | `/verifyCredentials` | Julkinen | — | Vahvista sähköposti ja salasana ja palauta niihin liittyvät seurakunnat |
| POST | `/loadOrCreate` | JWT | — | Etsi tai luo käyttäjä sähköpostin tai userId:n perusteella |
| POST | `/setDisplayName` | JWT | — | Päivitä käyttäjän etu- ja sukunimi |
| POST | `/updateEmail` | JWT | — | Vaihda käyttäjän sähköpostiosoite |
| POST | `/updatePassword` | JWT | — | Vaihda käyttäjän salasana (vähintään 6 merkkiä) |
| POST | `/updateOptedOut` | JWT | — | Aseta henkilön käytöstä poistumisen tila |
| POST | `/sendInviteEmail` | JWT | People.Edit | Lähetä kutsu henkilölle tähän seurakuntaan (`email`, `personName`, `contextName`). Painike on **Rekisteröidy**, jos henkilöllä ei ole tiliä, ja **Kirjaudu sisään**, jos käyttäjä on jo olemassa. Käyttäjä, joka ei ole koskaan kirjautunut sisään, saa sen sijaan linkin **Aseta salasanasi**, joka vanhenee 7 päivässä. Kyseessä on kiinteä mallipohja, joten se ei lasketa seurakunnan päivittäiseen sähköpostirajaan |
| GET | `/search?term=` | JWT | Server.Admin | Hae kaikkia käyttäjiä nimen tai sähköpostin perusteella |
| DELETE | `/` | JWT | — | Poista nykyisen käyttäjän tili |

## Seurakunnat

Perusosoite: `/membership/churches`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lataa kaikki nykyisen käyttäjän seurakunnat |
| GET | `/:id` | JWT | — | Hae seurakunta tunnisteella |
| GET | `/:id/getDomainAdmin` | JWT | — | Hae seurakunnan verkkotunnuksen ylläpitäjäkäyttäjä |
| GET | `/:id/impersonate` | JWT | Server.Admin | Esiinny seurakuntana (vain palvelimen ylläpitäjä) |
| GET | `/all?term=` | JWT | Server.Admin | Hae kaikki seurakunnat (ylläpito) |
| GET | `/search/?name=` | Julkinen | — | Hae seurakuntia nimellä |
| GET | `/lookup/?subDomain=&id=` | Julkinen | — | Hae seurakunta aliverkkotunnuksen tai tunnisteen perusteella |
| POST | `/` | JWT | Settings.Edit | Päivitä seurakunnan tiedot |
| POST | `/add` | JWT | — | Rekisteröi uusi seurakunta. Pakolliset kentät: name, address1, city, state, zip, country |
| POST | `/search` | Julkinen | — | Hae seurakuntia nimellä (POST-versio) |
| POST | `/select` | JWT | — | Valitse tai vaihda seurakuntaan. Runko: `{ churchId }` tai `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arkistoi seurakunta tai palauta se arkistosta |
| POST | `/byIds` | Julkinen | — | Lataa useita seurakuntia tunnisteiden perusteella |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Poista seurakunnat, jotka ovat olleet hylättyinä vähintään 7 päivää |

## Ryhmät

Perusosoite: `/membership/groups`

Laajentaa vakio-CRUDia (GET `/` ja GET `/:id` kantaluokasta).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Listaa kaikki ryhmät |
| GET | `/:id` | JWT | — | Hae ryhmä tunnisteella |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Hae ryhmiä palvelusuodattimilla |
| GET | `/my` | JWT | — | Hae nykyisen käyttäjän ryhmät |
| GET | `/my/:tag` | JWT | — | Hae nykyisen käyttäjän ryhmät tagin mukaan suodatettuna |
| GET | `/tag/:tag` | JWT | — | Hae kaikki tietyn tagin ryhmät |
| GET | `/public/:churchId/:id` | Julkinen | — | Hae julkinen ryhmä seurakunnan ja tunnisteen perusteella |
| GET | `/public/:churchId/tag/:tag` | Julkinen | — | Hae julkiset ryhmät tagin perusteella |
| GET | `/public/:churchId/label?label=` | Julkinen | — | Hae julkiset ryhmät tarran perusteella |
| GET | `/public/:churchId/slug/:slug` | Julkinen | — | Hae julkinen ryhmä slugin perusteella |
| POST | `/` | JWT | Groups.Edit | Luo tai päivitä ryhmiä (luo slugin automaattisesti) |
| DELETE | `/:id` | JWT | Groups.Edit | Poista ryhmä (poistaa myös ministeriöryhmien alaiset tiimit) |

## Ryhmän jäsenet

Perusosoite: `/membership/groupmembers`

Laajentaa vakio-CRUDia (GET `/:id` ja DELETE `/:id` kantaluokasta).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | GroupMembers.View | Hae ryhmän jäsen tunnisteella |
| GET | `/` | JWT | GroupMembers.View* | Listaa ryhmän jäsenet. Suodata `?groupId=`, `?groupIds=` tai `?personId=`. *Sallittu myös, jos käyttäjä on ryhmässä tai kysyy omaa personId-arvoaan, sekä `?groupId=`-kyselyissä mille tahansa ei-luottamukselliselle ryhmälle, kun käyttäjällä on Attendance.View- tai Attendance.Edit-oikeus (alle 13-vuotiaat jäsenet sisällytetään heille) |
| GET | `/my` | JWT | — | Hae nykyisen käyttäjän ryhmäjäsenyydet |
| GET | `/basic/:groupId` | JWT | — | Hae ryhmän perusjäsenluettelo |
| GET | `/public/leaders/:churchId/:groupId` | Julkinen | — | Hae ryhmän johtajat (julkinen) |
| GET | `/public/:churchId/:groupId` | Julkinen | — | Hae ryhmän julkinen jäsenluettelo (vähimmäiskentät: `personId`, `displayName`, `leader`, valokuva). Vain jos ryhmä on ottanut käyttöön `publicRoster`-asetuksen. Käytetään verkkosivurakentajan `staffGrid`-elementissä |
| POST | `/` | JWT | GroupMembers.Edit | Lisää tai päivitä ryhmän jäseniä |
| DELETE | `/:id` | JWT | GroupMembers.View | Poista ryhmän jäsen |

## Taloudet

Perusosoite: `/membership/households`

Vakio-CRUD-ohjain.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Listaa kaikki taloudet |
| GET | `/:id` | JWT | — | Hae talous tunnisteella |
| POST | `/` | JWT | People.Edit | Luo tai päivitä talouksia |
| DELETE | `/:id` | JWT | People.Edit | Poista talous |

## Roolit

Perusosoite: `/membership/roles`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Roles.View | Hae rooli tunnisteella |
| GET | `/church/:churchId` | JWT | Roles.View | Hae kaikki seurakunnan roolit. Jokainen rooli sisältää `memberCount`-kentän, eli siihen kuuluvien eri käyttäjien määrän |
| POST | `/` | JWT | Roles.Edit | Luo tai päivitä rooleja |
| DELETE | `/:id` | JWT | Roles.Edit | Poista rooli (poistaa myös sen käyttöoikeudet ja jäsenet) |

## Roolien jäsenet

Perusosoite: `/membership/rolemembers`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | Hae roolin jäsenet. Lisää `?include=users` sisällyttääksesi käyttäjätiedot |
| POST | `/` | JWT | Roles.Edit | Lisää jäseniä rooliin (luo käyttäjän, jos sähköpostia ei ole olemassa) |
| DELETE | `/:id` | JWT | Roles.View | Poista roolin jäsen |
| DELETE | `/self/:churchId/:userId` | JWT | — | Poista itsesi seurakunnasta |

## Roolien käyttöoikeudet

Perusosoite: `/membership/rolepermissions`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/roles/:id` | JWT | Roles.View | Hae roolin käyttöoikeudet (käytä `null`-arvoa tunnisteena roolille „Everyone”) |
| POST | `/` | JWT | Roles.Edit | Luo tai päivitä roolin käyttöoikeuksia |
| DELETE | `/:id` | JWT | Roles.Edit | Poista roolin käyttöoikeus |

## Käyttöoikeudet

Perusosoite: `/membership/permissions`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Hae kaikkien käytettävissä olevien käyttöoikeuksien täysi luettelo |

Jokaisella merkinnällä on `apiName`, `section` (sisältötyyppi), `action` sekä `displaySection`- ja `displayAction`-nimikkeet, jotka B1Adminin roolieditori näyttää. Viimeaikaiset lisäykset: `MembershipApi` / `People` / `View Names` (**Vain henkilöiden nimien katselu**, kohdassa Henkilöt ja ryhmät) sekä `GivingApi` / `Donations` / `Enter` (**Kirjaa lahjoitukset**, kohdassa Lahjoitukset; katso [Lahjoituserät](./giving.md#donation-batches)).

## Lomakkeet

Perusosoite: `/membership/forms`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin tai Forms.Edit | Listaa kaikki lomakkeet (ylläpitäjä näkee kaikki, muokkaajat näkevät itselleen määritetyt ja ei-jäsenlomakkeet) |
| GET | `/:id` | JWT | Lomakkeen käyttöoikeus | Hae lomake tunnisteella |
| GET | `/archived` | JWT | Forms.Admin tai Forms.Edit | Listaa arkistoidut lomakkeet |
| GET | `/group/:groupId` | JWT | Ryhmän jäsen, ryhmänjohtaja tai Forms.Admin | Ryhmään linkitetyt itsenäiset lomakkeet (`forms.groupId`), lukuun ottamatta arkistoituja, lajiteltuna nimen mukaan. Palauttaa `id`, `name`, `description` ja `open` (saatavuusikkunan sisällä). Jäsenet saavat vain avoimet lomakkeet, ja johtajat sekä lomakeylläpitäjät saavat myös suljetut. Tukee ryhmäsivun linkitettyjä lomakkeita |
| GET | `/standalone/:id?churchId=` | JWT | — | Hae itsenäinen lomake (rajoitetut lomakkeet vaativat todennuksen) |
| POST | `/` | JWT | Forms.Admin tai Forms.Edit | Luo tai päivitä lomakkeita. Itsenäiset lomakkeet hyväksyvät valinnaisen `photoUrl`-kentän (otsikkokuva lomakkeen yläpuolella) ja `groupId`-kentän (linkitetty ryhmä) |
| DELETE | `/:id` | JWT | Lomakkeen käyttöoikeus | Poista lomake |

## Lomakevastaukset

Perusosoite: `/membership/formsubmissions`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin tai Forms.Edit | Listaa vastaukset. Suodata `?personId=` tai `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Vain omat tiedot: enintään 50 itsenäistä lomakevastausta (ei henkilölomakkeita), jotka kirjautunut jäsen on lähettänyt tai jotka on linkitetty hänen henkilötietueeseensa (`contentType` `person`, `contentId` = hänen henkilötunnuksensa, esimerkiksi ylläpitäjän tekemän henkilömuutoksen jälkeen), uusimmasta vanhimpaan. Jokaisessa on `form.name`. `include` liittää kunkin lomakkeen kysymykset ja vastauksen vastaukset. Palauttaa `401`, jos käyttäjää ei ole linkitetty henkilöön. Tukee B1 Me -sivun osiota **Omat lomakkeet** |
| GET | `/group/:groupId` | JWT | Ryhmän johtaja | Ryhmän johtajille tarkoitetut vastaukset: yksi merkintä kutakin linkitettyä lomaketta ja kutakin ryhmätapahtumaa kohden, jossa on ilmoittautumislomake. Jokaisessa on `form`, `event` (`id`, `title`, `start`; vain tapahtumamerkinnöissä), `questions` ja `submissions` (sisältäen `answers` ja `personName`, joka on `null`, jos vastaus on anonyymi) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit tai katseluoikeus | Hae vastaus tunnisteella. Lisää `?include=form,questions,answers`. Lomakkeen linkitetyn ryhmän johtajat sekä tapahtuman ilmoittautumisen ryhmän johtajat voivat myös lukea sen |
| GET | `/formId/:formId` | JWT | Lomakkeen käyttöoikeus (katselu) | Hae kaikki lomakkeen vastaukset (sisältää lomakkeen, kysymykset ja vastaukset). Lomakkeen linkitetyn ryhmän johtajilla on katseluoikeus |
| POST | `/` | JWT | — | Lähetä lomakevastaukset (käsittelee rajoitetut ja rajoittamattomat lomakkeet ja lähettää ilmoitussähköpostit). Kun lomakkeella on `autoCreatePerson`, etsii tai luo sähköpostin perusteella Guest-henkilön ja linkittää vastauksen tähän. Kun lomakkeella on myös `groupId`, lisää henkilön kyseiseen ryhmään. Kun `followUpSubject`- tai `followUpBody`-kenttä on asetettu, lähettää lähettäjälle mallipohjaisen jatkoviestin. Ellei kutsuja voi hallita lomaketta, `submittedBy` asetetaan aina kirjautuneen jäsenen henkilöksi (tai jätetään tyhjäksi anonyymeissä vastauksissa) |
| DELETE | `/:id` | JWT | Forms.Admin tai Forms.Edit | Poista vastaus ja sen vastaukset |

## Kysymykset

Perusosoite: `/membership/questions`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | Lomakkeen käyttöoikeus | Listaa lomakkeen kysymykset. Vaatii `?formId=`-parametrin |
| GET | `/:id` | JWT | Lomakkeen käyttöoikeus | Hae kysymys tunnisteella |
| GET | `/unrestricted?formId=` | JWT | — | Hae rajoittamattoman lomakkeen kysymykset |
| GET | `/sort/:id/up` | JWT | — | Siirrä kysymystä ylöspäin järjestyksessä |
| GET | `/sort/:id/down` | JWT | — | Siirrä kysymystä alaspäin järjestyksessä |
| POST | `/` | JWT | Lomakkeen käyttöoikeus | Luo tai päivitä kysymyksiä (määrittää järjestyksen automaattisesti) |
| DELETE | `/:id?formId=` | JWT | Lomakkeen käyttöoikeus | Poista kysymys |

## Vastaukset

Perusosoite: `/membership/answers`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | Forms.Admin tai Forms.Edit | Listaa vastaukset. Suodata `?formSubmissionId=`-parametrilla |
| POST | `/` | JWT | Forms.Admin tai Forms.Edit | Luo tai päivitä vastauksia |

## Jäsenten käyttöoikeudet

Perusosoite: `/membership/memberpermissions`

Hallitsee jäsenten pääsyä tiettyihin lomakkeisiin.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:id` | JWT | Lomakkeen käyttöoikeus | Hae jäsenen käyttöoikeus tunnisteella |
| GET | `/member/:id` | JWT | Lomakkeen käyttöoikeus | Hae kaikki jäsenen lomakekäyttöoikeudet |
| GET | `/form/:id` | JWT | Lomakkeen käyttöoikeus | Hae kaikki lomakkeen jäsenkäyttöoikeudet |
| GET | `/form/:id/my` | JWT | Lomakkeen käyttöoikeus | Hae nykyisen käyttäjän käyttöoikeus lomakkeeseen |
| POST | `/` | JWT | Lomakkeen käyttöoikeus | Luo tai päivitä jäsenten käyttöoikeuksia |
| DELETE | `/:id?formId=` | JWT | Lomakkeen käyttöoikeus | Poista jäsenen käyttöoikeus |
| DELETE | `/member/:id?formId=` | JWT | Lomakkeen käyttöoikeus | Poista kaikki jäsenen käyttöoikeudet lomakkeeseen |

## Asetukset

Perusosoite: `/membership/settings`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | Settings.Edit | Hae seurakunnan kaikki asetukset |
| GET | `/public/:churchId` | Julkinen | — | Hae seurakunnan julkiset asetukset |
| POST | `/` | JWT | Settings.Edit | Tallenna asetukset (tukee base64-kuvan lataamista) |

## Verkkotunnukset

Perusosoite: `/membership/domains`

Laajentaa vakio-CRUDia (GET `/:id`, GET `/` ja DELETE `/:id` kantaluokasta).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Listaa kaikki verkkotunnukset |
| GET | `/:id` | JWT | — | Hae verkkotunnus tunnisteella |
| GET | `/lookup/:domainName` | JWT | — | Hae verkkotunnus nimen perusteella |
| GET | `/public/lookup/:domainName` | Julkinen | — | Julkinen verkkotunnushaku nimen perusteella |
| GET | `/health/check` | Julkinen | — | Suorita terveystarkistus tarkistamattomille verkkotunnuksille |
| POST | `/` | JWT | Settings.Edit | Luo tai päivitä verkkotunnuksia (käynnistää Caddy-päivityksen) |
| DELETE | `/:id` | JWT | Settings.Edit | Poista verkkotunnus |

## Käyttäjä–seurakunta

Perusosoite: `/membership/userchurch`

Hallitsee käyttäjien ja seurakuntien välistä yhteyttä.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/userid/:userId` | JWT | — | Hae käyttäjä–seurakunta-tietue käyttäjän tunnisteella |
| GET | `/personid/:personId` | JWT | — | Hae henkilöön linkitetyn käyttäjän sähköposti |
| GET | `/user/:userId` | JWT | Server.Admin | Lataa kaikki käyttäjän seurakunnat |
| POST | `/` | JWT | — | Luo käyttäjä–seurakunta-yhteys |
| PATCH | `/:userId` | JWT | — | Päivitä viimeksi käytetty aika ja kirjaa käyttö |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Poista käyttäjä–seurakunta-tietue |

## Näkyvyysasetukset

Perusosoite: `/membership/visibilityPreferences`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Hae nykyisen käyttäjän näkyvyysasetukset |
| POST | `/` | JWT | — | Tallenna näkyvyysasetukset (osoitteen, puhelimen ja sähköpostin näkyvyys) |

## Kysely

Perusosoite: `/membership/query`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| POST | `/members` | JWT | — | Luonnollisen kielen jäsenhaku tekoälyn avulla. Runko: `{ text, subDomain, siteUrl }` |

## Asiakaspuolen virheet

Perusosoite: `/membership/clientErrors`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|------|
| POST | `/` | JWT | — | Kirjaa asiakaspuolen virhe |

## Aiheeseen liittyvät sivut

- [Todennus ja käyttöoikeudet](./authentication.md): kirjautumisvirta, JWT, OAuth ja käyttöoikeusmalli
- [Läsnäolon päätepisteet](./attendance.md): palvelu- ja vierailuseuranta
- [Moduulin rakenne](../module-structure.md): koodin järjestämisen mallit

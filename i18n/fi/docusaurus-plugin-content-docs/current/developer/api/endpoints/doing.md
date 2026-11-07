---
title: "Doing-päätepisteet"
description: "Päätepisteiden viiteopas Doing-API:lle, joka kattaa palvelusuunnitelmat, vapaaehtoistehtävät, tehtävät ja automaatiot B1 Adminissa, sisältäen polut, todennuksen ja käyttöoikeudet."
---

# Doing-päätepisteet

<div class="article-intro">

Doing-moduuli hallinnoi palvelusuunnittelua, vapaaehtoisten aikataulutusta, tehtävienhallintaa ja automaatioita. Sen avulla voit luoda palvelusuunnitelmia ajankohtineen ja tehtävineen, määrittää vapaaehtoisia, hallita estettyjä päivämääriä, rakentaa palvelun järjestyskohteita, yhdistää ulkoisiin sisältöpalveluihin ja määrittää automatisoituja työnkulkuja ehtojen ja toimintojen avulla.

</div>

**Perustie:** `/doing`

## Suunnitelmat

Perustie: `/doing/plans`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Listaa seurakunnan kaikki suunnitelmat |
| GET | `/:id` | JWT | — | Hae suunnitelma tunnuksella |
| GET | `/ids?ids=` | JWT | — | Hae useita suunnitelmia pilkuilla erotettujen tunnusten perusteella |
| GET | `/types/:planTypeId` | JWT | — | Hae suunnitelmat suunnitelmatyypin mukaan |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + ministeriön muokkaus | Esikatsele palveluyleiskatsaus, jonka **Tekstaa vapaaehtoisille** -toiminto lähettäisi: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` aikavälillä määritetyille vapaaehtoisille (yksi per henkilö, kieltäytyneet ja puhelinnumerottomat ohitetaan, jaetut numerot poistetaan kaksoiskappaleista, enimmäismäärä 200) |
| GET | `/presenter` | JWT | — | Hae seuraavan 7 päivän suunnitelmat (esittäjän näkymä) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Ministeriön muokkaus | Aktiiviset palvelutehtävien vahvistustyönkulut (`workflowType = "assignmentConfirmation"`), joita suunnitelma voi valita: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Julkinen | — | Hae suunnitelmatyypin nykyinen suunnitelma |
| GET | `/public/signup/:churchId` | Julkinen | — | Suunnitelmat, joihin voi ilmoittautua itse, lähimmästä alkaen. Jokaisessa on sen itseilmoittautumispaikat (lajiteltu kentän `categoryName` ja sitten `name` mukaan, sekä `filledCount` hyväksytyille ja vahvistamattomille tehtäville) ja ajankohdat. Vapaaehtoisten nimiä ei näytetä. Kun seurakunnan asetus `volunteerSignupNextOnly` on `"true"`, palautetaan vain kunkin suunnitelmatyypin ensimmäinen suunnitelma. Jokainen `plan` sisältää lasketun kentän `signupDeadline` (ISO-ajanhetki tai `null`): `signupDeadlineHours` tuntia ennen suunnitelman aikaisinta `service`-tyypin ajankohtaa (jos palveluaikaa ei ole, mikä tahansa ajastettu merkintä; jos suunnitelmalla ei ole ajankohtia, klo 9.00 seurakunnan aikavyöhykkeellä kentän `serviceDate` päivänä) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` suunnitelman itseilmoittautumispaikoille (hyväksyttyjen ja vahvistamattomien tehtävien saajien näyttönimet). Palauttaa `[]`, ellei suunnitelman `showVolunteerNames`-asetus ole päällä |
| POST | `/` | JWT | — | Luo tai päivitä suunnitelmia (hyväksyy yksittäisen olion tai taulukon). Aseta `confirmationWorkflowId` liittääksesi suunnitelman palveluvahvistustyönkulkuun tai `null` poistaaksesi liitoksen tulevista pyynnöistä. Lähetä `signupDeadlineHours: null` tyhjentääksesi määräajan; jos kenttää ei lähetetä, tallennettu arvo säilyy |
| POST | `/copy/:id` | JWT | Ministeriön muokkaus | Kopioi suunnitelman, mukaan lukien paikat, ajankohdat, tehtävät ja palvelun järjestyskohteet. Pyynnön runko sisältää `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"` tai `"all"`) ja `copyServiceOrder` (totuusarvo). Ilman `targetPlanId`-kenttää luodaan uusi suunnitelma, ja `notes`, `signupDeadlineHours`, `showVolunteerNames` ja `autoReplaceOnDecline` siirtyvät lähdesuunnitelmasta, ellei pyynnön runko anna niille arvoa. `targetPlanId`-kentän kanssa kopio täyttää olemassa olevan suunnitelman (kutsujan on voitava muokata sitä). B1Adminin **Toista viikoittain** -valinta kutsuu tätä kerran viikossa, ja jokainen kerta kopioi edellisen viikon aikana luodusta suunnitelmasta |
| POST | `/textRange` | JWT | `texting.send` + ministeriön muokkaus | Lähetä teksti jokaiselle aikavälille määritetylle vapaaehtoiselle seurakunnan tekstiviestipalvelun kautta. Pyynnön runko: `{ startDate, endDate, ministryId, planTypeId?, message }` (viesti enintään 1600 merkkiä; yhdistämiskentät ratkaistaan vastaanottajakohtaisesti). Palauttaa esikatselumäärät sekä `recipientCount`, `successCount`, `failCount` ja `error` (`no_provider` tai `insufficient_credits`), jos lähetys pysähtyy ennenaikaisesti |
| POST | `/:id/issueRequests` | JWT | Suunnitelman muokkaus | Lähetä suunnitelman uudet vahvistamattomat ja vielä ilmoittamattomat tehtävät sen vahvistustyönkulun kautta: merkitsee jokaisen ilmoitetuksi ja käynnistää yhden työnkulkukortin tehtävää kohden. Tyhjä pyyntörunko; palauttaa `{ issued }`. Epäonnistuu, ellei suunnitelma ole julkaistu (ei `prepared`-tilassa), sillä ei ole aktiivista `confirmationWorkflowId`-tunnusta, jossa on vähintään yksi vaihe, eikä sen vastausmääräaika ole umpeutunut |
| POST | `/autofill/:id` | JWT | — | Täytä suunnitelman vapaaehtoistehtävät automaattisesti. Pyynnön runko: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Poista suunnitelma sekä kaikki siihen liittyvät ajankohdat, tehtävät, paikat ja suunnitelmakohteet |

### Esimerkki: suunnitelman kopiointi

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Suunnitelmatyypit

Perustie: `/doing/planTypes`

Laajentaa CRUD-perusluokkaa (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ei oikeustarkistuksia).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Listaa kaikki suunnitelmatyypit |
| GET | `/:id` | JWT | — | Hae suunnitelmatyyppi tunnuksella |
| GET | `/ids?ids=` | JWT | — | Hae useita suunnitelmatyyppejä pilkuilla erotettujen tunnusten perusteella |
| GET | `/ministryId/:ministryId` | JWT | — | Hae ministeriön suunnitelmatyypit |
| POST | `/` | JWT | — | Luo tai päivitä suunnitelmatyyppejä |
| DELETE | `/:id` | JWT | — | Poista suunnitelmatyyppi |

## Suunnitelmakohteet

Perustie: `/doing/planItems`

Hallinnoi palvelun järjestyskohteita (otsikoita, osioita, lauluja ym.), jotka on järjestetty vanhempi–lapsi-puurakenteeseen.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Hae suunnitelmakohde tunnuksella |
| GET | `/ids?ids=` | JWT | — | Hae useita suunnitelmakohteita pilkuilla erotettujen tunnusten perusteella |
| GET | `/plan/:planId` | JWT | — | Hae kaikki suunnitelman kohteet (palauttaa puurakenteen) |
| GET | `/presenter/:churchId/:planId` | Julkinen | — | Hae suunnitelmakohteet esittäjän näkymään (palauttaa puurakenteen) |
| POST | `/` | JWT | — | Luo tai päivitä suunnitelmakohteita |
| POST | `/sort` | JWT | — | Päivitä suunnitelmakohteen järjestys (lajittelee sisarukset uudelleen) |
| DELETE | `/:id` | JWT | — | Poista suunnitelmakohde |

## Suunnitelman syöte

Perustie: `/doing/planFeed`

Tarjoaa suunnitelmakohteiden syötteet esittäjälle. Jos suunnitelmakohteita ei ole, syöte täytetään automaattisesti Lessons.church-paikan syötteestä suunnitelman `contentId`-tunnuksen avulla.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/presenter/:churchId/:planId` | Julkinen | — | Hae suunnitelman syöte esittäjälle (täytetään paikan syötteestä, jos tyhjä) |

## Paikat

Perustie: `/doing/positions`

Laajentaa CRUD-perusluokkaa (GET `/:id`, POST `/`, DELETE `/:id` — ei oikeustarkistuksia).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Hae paikka tunnuksella |
| GET | `/ids?ids=` | JWT | — | Hae useita paikkoja pilkuilla erotettujen tunnusten perusteella |
| GET | `/plan/ids?planIds=` | JWT | — | Hae useiden suunnitelmien paikat pilkuilla erotettujen suunnitelmatunnusten perusteella |
| GET | `/plan/:planId` | JWT | — | Hae kaikki suunnitelman paikat |
| POST | `/` | JWT | — | Luo tai päivitä paikkoja |
| DELETE | `/:id` | JWT | — | Poista paikka |

## Ajankohdat

Perustie: `/doing/times`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/all` | JWT | — | Listaa seurakunnan kaikki ajankohdat |
| GET | `/:id` | JWT | — | Hae ajankohta tunnuksella |
| GET | `/plans?planIds=` | JWT | — | Hae useiden suunnitelmien ajankohdat pilkuilla erotettujen suunnitelmatunnusten perusteella |
| GET | `/plan/:planId` | JWT | — | Hae kaikki suunnitelman ajankohdat |
| POST | `/` | JWT | — | Luo tai päivitä ajankohtia |
| DELETE | `/:id` | JWT | — | Poista ajankohta |

## Tehtävät

Perustie: `/doing/assignments`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/my` | JWT | — | Hae nykyisen käyttäjän tehtävät |
| GET | `/my/upcoming` | JWT | — | Enintään 20 nykyisen käyttäjän tehtävää suunnitelmissa, jotka ovat eilisestä eteenpäin (ohitetaan suunnitelmat, joita pidetään varattuina tai jotka ovat `prepared`-tilassa), lähimmästä alkaen: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Tukee palveluesikatselua jäsenen kotisivulla |
| GET | `/:id` | JWT | — | Hae tehtävä tunnuksella |
| GET | `/plan/ids?planIds=` | JWT | — | Hae useiden suunnitelmien tehtävät pilkuilla erotettujen suunnitelmatunnusten perusteella |
| GET | `/plan/:planId` | JWT | — | Hae kaikki suunnitelman tehtävät |
| POST | `/` | JWT | — | Luo tai päivitä tehtäviä (tilan oletusarvo on "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Hyväksy tehtävä (vain tehtävään määrätty henkilö) |
| POST | `/decline/:id` | JWT | — | Hylkää tehtävä (vain tehtävään määrätty henkilö) |
| POST | `/signup` | JWT | — | Ilmoittaudu itse paikkaan. Pyynnön runko: `{ positionId }`. Paikan on sallittava itseilmoittautuminen ja siinä on oltava tilaa; luo Accepted-tilassa olevan tehtävän. Hylätään viestillä "Signup deadline has passed", kun suunnitelman ilmoittautumismääräaika (laskettuna takaisin ensimmäisestä palveluajasta, kuten yllä) on umpeutunut |
| DELETE | `/signup/:id` | JWT | — | Poista oma itseilmoittautumisesi. Hylätään viestillä "Removal deadline has passed" suunnitelman ilmoittautumismääräajan jälkeen |
| DELETE | `/:id` | JWT | — | Poista tehtävä |

### Esimerkki: tehtävän hyväksyminen

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Estetyt päivämäärät

Perustie: `/doing/blockoutDates`

Laajentaa CRUD-perusluokkaa (GET `/:id`, DELETE `/:id` — ei oikeustarkistuksia).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Hae estetty päivämäärä tunnuksella |
| GET | `/ids?ids=` | JWT | — | Hae useita estettyjä päivämääriä pilkuilla erotettujen tunnusten perusteella |
| GET | `/my` | JWT | — | Hae nykyisen käyttäjän estetyt päivämäärät |
| GET | `/upcoming` | JWT | — | Hae seurakunnan kaikki tulevat estetyt päivämäärät |
| POST | `/` | JWT | — | Luo tai päivitä estettyjä päivämääriä (asettaa personId-kentän oletukseksi nykyisen käyttäjän, jos sitä ei anneta) |
| DELETE | `/:id` | JWT | — | Poista estetty päivämäärä |

## Tehtävät

Perustie: `/doing/tasks`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Hae nykyisen käyttäjän avoimet tehtävät |
| GET | `/:id` | JWT | — | Hae tehtävä tunnuksella |
| GET | `/:id/contact` | JWT | Voi tarkastella korttia | Yhteystiedot henkilölle, jota työnkulkukortti koskee: `{ personId, displayName, mobilePhone, email }`. Mahdollistaa sen, että määrätty soittaja, jolla ei ole henkilötietojen käyttöoikeutta, voi tavoittaa henkilön |
| GET | `/closed` | JWT | — | Hae nykyisen käyttäjän suljetut tehtävät |
| GET | `/timeline?taskIds=` | JWT | — | Hae tehtävien aikajanatiedot pilkuilla erotettujen tehtävätunnusten perusteella |
| GET | `/directoryUpdate/:personId` | JWT | — | Hae henkilön hakemistopäivitystehtävä |
| POST | `/` | JWT | — | Luo tai päivitä tehtäviä. Lisää `?type=directoryUpdate` käsitelläksesi hakemistopäivitystehtäviä (lataa valokuvat automaattisesti) |
| POST | `/:id/conversation` | JWT | `tasks.edit` tai kortin vastuuhenkilö | Liitä muistiinpanokeskustelu kortille. Pyynnön runko: `{ conversationId }`. Ensimmäinen liitetty keskustelu jää voimaan; myöhemmät kutsut palauttavat kortin muuttumattomana |
| POST | `/loadForGroups` | JWT | — | Lataa tehtävät tietyille ryhmille. Pyynnön runko: `{ groupIds: [], status: "Open" }` |

## Automaatiot

Perustie: `/doing/automations`

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Listaa seurakunnan kaikki automaatiot |
| GET | `/:id` | JWT | — | Hae automaatio tunnuksella |
| GET | `/check` | Julkinen | — | Käynnistä kaikkien automaatioiden tarkistus |
| POST | `/` | JWT | — | Luo tai päivitä automaatioita |
| DELETE | `/:id` | JWT | — | Poista automaatio |

## Toiminnot

Perustie: `/doing/actions`

Toiminnot määrittävät, mitä tapahtuu, kun automaatio käynnistyy.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Hae toiminto tunnuksella |
| GET | `/automation/:id` | JWT | — | Hae kaikki automaation toiminnot |
| POST | `/` | JWT | — | Luo tai päivitä toimintoja |
| DELETE | `/:id` | JWT | — | Poista toiminto |

## Ehdot

Perustie: `/doing/conditions`

Ehdot määrittävät kriteerit, joiden perusteella automaatio käynnistyy.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Hae ehto tunnuksella |
| GET | `/automation/:id` | JWT | — | Hae kaikki automaation ehdot |
| POST | `/` | JWT | — | Luo tai päivitä ehtoja |
| DELETE | `/:id` | JWT | — | Poista ehto |

## Yhdistelmät

Perustie: `/doing/conjunctions`

Yhdistelmät liittävät useita ehtoja yhteen automaatiossa (JA/TAI-logiikka).

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Hae yhdistelmä tunnuksella |
| GET | `/automation/:id` | JWT | — | Hae kaikki automaation yhdistelmät |
| POST | `/` | JWT | — | Luo tai päivitä yhdistelmiä |
| DELETE | `/:id` | JWT | — | Poista yhdistelmä |

## Sisältöpalvelujen todennukset

Perustie: `/doing/contentProviderAuths`

Laajentaa CRUD-perusluokkaa (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ei oikeustarkistuksia).

Hallinnoi ulkoisten sisältöpalvelujen (esim. esitysohjelmistojen integraatioiden) OAuth-todennustietueita.

`accessToken` ja `refreshToken` salataan levyllä `EncryptionHelper`-luokalla ja puretaan luettaessa, joten API palauttaa edelleen selkeät tunnukset. Ennen salausta tallennetut rivit sisältävät selkeää tekstiä (joka ei koskaan sisällä merkkiä `|`); ne palautetaan sellaisenaan ja salataan seuraavan tallennuksen yhteydessä.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Listaa kaikki sisältöpalvelujen todennukset |
| GET | `/:id` | JWT | — | Hae sisältöpalvelun todennus tunnuksella |
| GET | `/ids?ids=` | JWT | — | Hae useita sisältöpalvelujen todennuksia pilkuilla erotettujen tunnusten perusteella |
| GET | `/ministry/:ministryId` | JWT | — | Hae kaikki ministeriön sisältöpalvelujen todennukset |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Hae todennustietue tietylle ministeriölle ja palveluntarjoajalle |
| POST | `/` | JWT | — | Luo tai päivitä sisältöpalvelujen todennuksia |
| DELETE | `/:id` | JWT | — | Poista sisältöpalvelun todennus |

## Palveluntarjoajan välityspalvelin

Perustie: `/doing/providerProxy`

Välittää pyynnöt ulkoisille sisältöpalveluille (esim. ProPresenter, EasyWorship). Käsittelee tunnusten uusimisen automaattisesti, kun tunnukset vanhenevat.

| Menetelmä | Polku | Todennus | Oikeus | Kuvaus |
|--------|------|------|------|-------------|
| POST | `/browse` | JWT | — | Selaa sisältöpalvelun tiedostoja. Pyynnön runko: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Hae esitykset sisältöpalvelusta. Pyynnön runko: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Hae soittolista sisältöpalvelusta. Pyynnön runko: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Hae sisältökohteen ohjeet. Pyynnön runko: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Hae sisältökohteen laajennetut ohjeet. Pyynnön runko: `{ ministryId, providerId, path }` |

## Liittyvät sivut

- [Jäsenpäätepisteet](./membership.md) — Henkilöt, ryhmät, roolit ja oikeudet
- [Läsnäolopäätepisteet](./attendance.md) — Palvelu- ja vierailuseuranta
- [Moduulin rakenne](../module-structure.md) — Koodin järjestelyn mallit

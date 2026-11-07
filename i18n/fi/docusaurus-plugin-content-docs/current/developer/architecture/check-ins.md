---
title: "Lasten sisäänkirjaus"
---

# Lasten sisäänkirjaus

<div class="article-intro">

Sisäänkirjaus on yksi järjestelmä, jolla on kolme sisäänkäyntiä: B1Checkin-kioskisovellus henkilökunnan tai itsepalvelun asemille, itsepalvelun sisäänkirjaus B1App-jäsenportaalissa ja ylläpidon puolen osallistumiskirjaus B1Adminissa. Kaikki kolme kirjoittavat samaan osallistumismoduuliin ydin-Apiin, ja luokkahuoneiden reititys ohjataan kokonaan ryhmien kautta. Erillistä "sijainti"- tai "huone"-kokonaisuutta ei ole. Sen päällä on lapsiturvallisuuskerros: käyntikohtaiset sisäänkirjaustyypit, palvelinpuolen kapasiteetti- ja vastaavuussuhteen tarkistukset, kioskin ikä- ja luokka-asteen kelpoisuus, luovutuksen varmennus uloskirjauksessa sekä vanhempien hälyttäminen kirkon tekstiviestipalvelun kautta. Tämä sivu kuvaa tietomallin, sisäänkirjausvirrat, turvallisuuskerroksen ja tarrojen tulostusputken.

</div>

## Yleiskuvaus

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  haku → kotitalous →     │  │         │ Api                                          │
│  ryhmät → valmis/tulosta │  │  HTTPS  │  ┌─ jäsenyysmoduuli ───────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (itsepalvelu)      │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin-näkymä  │  │         │  ┌─ osallistumismoduuli ───────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (henkilökunta)   │──┘         │  │ groupServiceTimes  (huonereititys)      │ │
│  asetukset · raportit · │            │  │ sessions ← visitSessions → visits       │ │
│  tarrasuunnittelija      │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Tarrojen tulostuspolku (vain kioski):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (tarrapohjat tai mukana toimitettu HTML-varavaihtoehto)
       └▶ LabelRenderer → HTML-dokumentti + upotetut SVG-viivakoodit
            └▶ PrintUI: WebView-renderöinti → ViewShot JPG-kaappaus
                 └▶ printer-helper-natiivimoduuli → Brother QL / Zebra
```

| Pinta | Repo | Pino | Rooli |
|-------|------|------|-------|
| Kioski | `B1Checkin` | Expo / React Native, expo-routerin tiedostoreititys; EAS-buildit Androidille, Amazon Fireylle ja iOS:lle; OTA-päivitykset `expo-updates`-kirjaston kautta | Henkilökunnan tai itsepalvelun asema tarrojen tulostuksella ja varmennetulla uloskirjauksella |
| Itsepalvelun sisäänkirjaus | `B1App` | Next.js (b1.church-jäsenportaali) | Kirjautuneet jäsenet kirjaavat kotitalouden sisään puhelimella; ei tulostusta |
| Ylläpito | `B1Admin` | React SPA | Määrittää palvelurakenteen, liittää ryhmät palveluaikoihin, suunnittelee tarrat, kirjaa manuaalisen osallistumisen ja ajaa raportit |

Kaikki kolme kutsuvat samoja kahta API-moduulia `ApiHelperin` kautta: **MembershipApi** (`/membership`) henkilöille, kotitalouksille ja ryhmille sekä **AttendanceApi** (`/attendance`) kaikelle alla olevalle.

## Tietomalli (`Api/src/modules/attendance`)

| Entiteetti / taulu | Keskeiset kentät | Merkitys |
|--------------------|------------------|----------|
| `campuses` | name, address | Vanhentunut tässä — kampukset ylläpidetään jäsenyysmoduulissa (`/membership/campuses`); osallistumispuolen kopio on jäädytetty vain luettavaksi vanhoille lukijoille (`models/Campus.ts`) |
| `services` | campusId, name | Toistuva kokoontuminen, esim. "Sunnuntaiaamu" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Aikaikkuna palvelun sisällä, esim. "9.00" (`models/ServiceTime.ts`). Aikataulusarakkeet ovat valinnaisia (migraatio `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) ja ohjaavat [sisäänkirjausikkunaa](#aikataulutetut-sisäänkirjausikkunat) |
| `groupServiceTimes` | groupId, serviceTimeId | Liitostaulu: mitkä ryhmät (luokkahuoneet) kokoontuvat mihinkin palveluaikoihin (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Yksi ryhmän kokoontuminen yhtenä päivänä — luodaan laiskasti sisäänkirjauksen yhteydessä (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Yksi henkilö osallistumassa yhtenä päivänä (`models/Visit.ts`). `checkinType` on `member` / `guest` / `volunteer` (NULL = vanha jäsen); kioski asettaa sen, ja kapasiteetti- ja vastaavuussuhdetarkistukset käyttävät sitä |
| `visitSessions` | visitId, sessionId | Mihin sessioihin käynti kohdistuu — lapsi, joka kirjataan kahteen palveluaikaan, saa kaksi riviä (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON-lohkot) | Suunniteltavat tarrapohjat (`models/LabelTemplate.ts`) |

### Miten valmis sisäänkirjaus tallennetaan

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) käsittelee pyynnön `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Runko on `Visit`-olioiden taulukko, joista jokainen kantaa `visitSessions`-kenttää, jonka upotettu `session` nimeää vain parin `(serviceTimeId, groupId)`. Palvelin sitten:

1. **Tarkistaa kapasiteetin ja suhteet ennen kirjoitusta.** `evaluateGates()` → `CheckinGateHelper.evaluate()` tarkistaa jokaisen kohdeltavan huoneen kapasiteetin, vieraskapasiteetin, suljetun-lipun ja vastaavuussuhteen nykyistä läsnäoloa vasten. postCheckin **ei ole transaktionaalinen**, joten tarkistuksen on tapahduttava ennen ensimmäistä tallennusta — kovan rikkomuksen tapauksessa palautuu 409, joka nimeää rikkovat huoneet, eikä mitään tallenneta. Katso [Kapasiteetti- ja vastaavuussuhdetarkistukset](#kapasiteetti-ja-vastaavuussuhdetarkistukset).
2. **Ratkaisee sessiot laiskasti.** `getSessionId()` etsii tai luo `sessions`-rivin parille `(groupId, serviceTimeId, today)` — sessio-id:t on välimuistitettu prosessin sisällä päivämäärän mukaan. Uudet sessiot lähettävät `session.created`-webhookin. Silmukka on odotettu `for..of` — aiempi fire-and-forget `forEach(async …)` kilpaili tallennuksen kanssa ja kirjoitti NULL-sessionId-arvoja ensimmäisen session luonnin yhteydessä (korjattu; mainittu koodikommentissa silmukan kohdalla).
3. **Korvaa päivän tietueet.** Kaikki kyseisten henkilöiden olemassa olevat käynnit tälle palvelulle tänään poistetaan yhdessä visitSessions-rivien kanssa, minkä jälkeen lähetetty joukko tallennetaan. Perheen uudelleen sisäänkirjaus on siis idempotentti "tämä on nykyinen tila" -operaatio, ei lisäys. `?checkDuplicates=true` palauttaa sen sijaan `{ duplicates: [personId…] }` kirjoittamatta mitään — näin kioski varoittaa ennen ylikirjoitusta.
4. **Luo yhden turvakoodin erää kohden.** `SecurityCodeHelper.generate()` tuottaa 4-merkkisen koodin aakkosista `23456789BCDFGHJKLMNPQRSTVWXYZ` (ei vokaaleja eikä sekaantuvia merkkejä, joten koodit eivät muodosta sanoja eivätkä ole helppo lukea väärin). Palvelin yrittää uudelleen törmäyksen sattuessa saman kirkon samana päivänä avoimia käyntejä vastaan ja leimaa koodin jokaiseen erän käyntiin.
5. **Palauttaa `{ streaks, securityCode }`.** `streaks` kuvaa henkilö-id:n peräkkäisten viikkojen osallistumismääräksi; kioski juhlistaa merkkipaaluja (joka viides viikko) konfettilla.

Jokainen tallennettu käynti lähettää myös `attendance.recorded`-webhookin. Lukupuoli, `GET /attendance/visits/checkin`, palauttaa henkilöiden käynnit heidän **viimeksi kirjatusta päivämäärästään** — jos se oli edellinen viikko, tunnisteet poistetaan, jolloin asiakas saa esitäytetyn kopion viime viikon huonevalinnoista, jotka tallentuvat uusina tietueina.

### Uloskirjaus

Kaksi päätepistettä sulkee kierron (`VisitController`):

- `GET /attendance/visits/code/:code` — tämän päivän ei vielä uloskirjatut käynnit, joilla on kyseinen turvakoodi, sessiot täytettyinä.
- `POST /attendance/visits/checkout` — runko `{ visitIds, checkedOutBy?, checkedOutById? }`; leimaa `checkoutTime`-ajan ja kuka noudti, ja lähettää `attendance.checkout`-webhookin jokaiselle käynnille.

Oikeudet: kioskit tunnistautuvat `attendance.checkin`-oikeudella, joka antaa tarkalleen sisäänkirjauksen, uloskirjauksen ja tarrapohjien pinnan, sekä kotitalouden haut, joita kioski tarvitsee ilman `people.view`-oikeutta (puhelin- ja nimihaku, kotitalouden jäsenet sisäänkirjausmallissa ja kotitalouden noutolista). B1Checkinin `SessionHelper.filterChurches` tarjoaa vain kirkkoja, joissa tilillä on `Attendance/Checkin` tai `Attendance/Edit`. `Checkin` ei ole enää osa Everyone-oikeuksia (null-rooli) (`RoleHelper` ja migraatio `2026-11-01_remove_everyone_checkin`), joten se on myönnettävä oikean roolin kautta; `attendance.view`/`attendance.edit` kattavat raportoinnin ja manuaalisen kirjauksen; rakenne (palvelut, palveluajat, ryhmäliitokset) vaatii `services.edit`-oikeuden. Jäsenen itsepalvelu sisäänkirjaus (B1App) ei vaadi mitään oikeuksia: jokainen todennettu käyttäjä, jolla on kirkossa linkitetty henkilö, saa kutsua `GET`/`POST /attendance/visits/checkin`-päätepisteitä, ja palvelin rajoittaa lähetetyt `personId`-arvot kutsujan omaan kotitalouteen (muuten 403) — tämä aita estää muiden perheiden `securityCode`-koodien lukemisen. Jäsenyys on oikeus; se, näkevätkö jäsenet ominaisuuden, määräytyy kirkon B1App-navigaatiovälilehdillä. Muut sisäänkirjauksen päätepisteet (`code/:code`, `checkout`, `guardians`, `CheckinController`) pysyvät vain kioskille ja henkilökunnalle.

## Ryhmät ohjaavat huonereititystä

Järjestelmässä ei missään ole huone- tai luokkahuone-entiteettiä. "Huone" on jäsenyysmoduulin **ryhmä**, jolla on `trackAttendance` käytössä ja joka on linkitetty yhteen tai useampaan palveluaikaan `groupServiceTimes`-taulun kautta. Ryhmäkentät (`Api/src/modules/membership/models/Group.ts`), jotka muokkaavat kioskin toimintaa:

| Kenttä | Vaikutus |
|------|--------|
| `trackAttendance` | Ryhmä osallistuu osallistumiskirjaukseen lainkaan; B1Adminin asetuspuu merkitsee `trackAttendance`-ryhmät ilman `groupServiceTimes`-riviä kohdistamattomiksi |
| `parentPickup` | Merkitsee lastenhuoneen: sisäänkirjaus siihen tekee käynnistä "lapsi"-käynnin, joka tulostaa perheen noutotarran ja asettaa turvakoodin nimilappuun |
| `printNametag` | Tulostetaanko nimilappu ylipäätään sisäänkirjauksista tähän ryhmään |
| `capacity` / `guestCapacity` / `checkinClosed` | Huoneen kapasiteettirajat ja kova "suljettu"-kytkin, jonka palvelinpuolen sisäänkirjauksen tarkistus valvoo (muokataan B1Adminin ryhmäasetuksissa kohdassa "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Lapsia per vapaaehtoinen -suhde ja vapaaehtoisten vähimmäismäärä, valvotaan kirkkokohtaisen `ratioEnforcement`-asetuksen mukaan |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Ikä- ja luokka-asteen kelpoisuusrajat, jotka arvioidaan kioskilla huoneiden korostamiseksi tai himmentämiseksi |

Jokainen asiakas denormalisoi samalla tavalla (esim. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): lataa `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` ja `GET /membership/groups` rinnakkain, ja kerää sitten jokaiselle palveluajalle ne ryhmät, joiden `groupServiceTimes`-rivi osoittaa siihen, `serviceTime.groups`-kenttään. Tämä taulukko on se, minkä huonevalitsin näyttää, ryhmiteltynä ryhmän `categoryName`-kentän mukaan.

Liitokset muokataan B1Adminissa ryhmän sivulta (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), ja koko Kampus → Palvelu → Palveluaika → Ryhmä -puu visualisoidaan `B1Admin/src/attendance/components/AttendanceSetup.tsx`-tiedostossa `GET /attendance/attendancerecords/tree`-päätepisteen kautta.

:::info
Koska ryhmät ovat ainoa totuuden lähde, sama ryhmäjäsenyys ohjaa kioskin reititystä, B1Adminin ryhmäsivujen listamaista osallistumiskirjausta ja osallistumisraportointia — ryhmän liittäminen palveluaikaan on ainoa vaihe, joka tekee siitä sisäänkirjauskohteen.
:::

## Lapsiturvallisuus

### Sisäänkirjaustyypit

Jokaisella käynnillä on `checkinType` — `member`, `guest` tai `volunteer` (NULL tarkoittaa vanhaa/jäsentä; migraatio `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Tyypin valitsee **kioskin puolella**: Jäsen / Vieras / Vapaaehtoinen -siruista laajennetulla jäsenrivillä (`B1Checkin/src/components/MemberServiceTimes.tsx`), ja se leimataan jokaiseen odottavaan käyntiin valmistuessa (`app/checkinComplete.tsx`, oletuksena `member`). Palvelin käyttää tyyppiä tarkistuksessa — vapaaehtoiset lasketaan suhdekattavuuteen kapasiteetin sijaan, ja vieraat lasketaan `guestCapacity`-rajaa vasten.

### Kapasiteetti- ja vastaavuussuhdetarkistukset

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) ajetaan `postCheckin`-funktion sisällä ennen mitään tallennusta (päätepiste ei ole transaktionaalinen, joten tarkistus ennen tallennusta on oikeellisuusmekanismi). Se lataa kohdeltavan ryhmän nykyisen läsnäolon (`VisitRepo.countActiveByGroupToday`) ja ryhmän asetukset jäsenyysmoduulin kautta, ja luokittelee sitten rikkomukset:

- **Kova (estää aina):** `checkinClosed`, `current + incoming > capacity`, vieraiden määrä ylittää `guestCapacity`-rajan. Erä hylätään vastauksella `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kioski näyttää nimetyn huoneen.
- **Suhde (varoitus tai esto):** saapuvat ei-vapaaehtoiset huoneeseen, jossa `volunteers < minVolunteers`, ei lainkaan vapaaehtoisia tai `children > volunteers × volunteerRatio`. Vakavuus noudattaa kirkkokohtaista `ratioEnforcement`-asetusta (`"warn"` oletuksena / `"block"`, muokataan B1Adminin Manage Church → Check-In -kohdassa, `CheckinSettingsEdit.tsx`). Varoitustilassa palautuu `409 { warning: true, error: "ratio", … }`, ellei asiakas lähetä pyyntöä uudelleen arvolla `acknowledgeWarnings=true` — tämä uudelleenlähetys on kioskin henkilökunnan vahvistusohitus.

### Aikataulutetut sisäänkirjausikkunat

Palveluajalla voi olla valinnainen viikkoaikataulu (`dayOfWeek` 0–6, jossa 0 = sunnuntai, `startTime`/`endTime` muodossa `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), joka muokataan B1Adminin **Attendance → Setup** -palveluaikalomakkeessa (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule"). `CheckinGateHelper.hasSchedule()` pitää palveluaikaa aikataulutettuna vain, kun sekä `dayOfWeek` että `startTime` on asetettu; aikatauluttomia aikoja ei koskaan rajoiteta ajan perusteella. `isServiceTimeOpen()` laskee ikkunan paikallisessa seinäkellonajassa (`DateHelper.toChurchTime`). Aikavyöhyke ratkaistaan palveluajoittain `CheckinTimeZoneHelper.load()`-funktiolla (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): palvelun kampuksen `timezone` (`service.campusId`, kautta `MembershipModuleGateway.loadCampusTimeZones`) on ensimmäinen, sen jälkeen kirkon `timeZone` (asetettu B1Adminin Church Informationissa), sitten ensimmäinen poistamaton kampus, jolla on `timezone` (`loadCampusTimeZone`), ja vasta sen jälkeen `America/New_York`. Kampus on ensin, koska useimmilla kirkoilla oli `America/New_York` täytetty kirkon vyöhykkeeksi. Sekä listaus- että lähetyspolku alla ratkaisevat sen samalla tavalla. Ikkuna kulkee `checkinOpenMinutes`-minuuttia ennen alkua aina `checkinCloseMinutes`-minuuttiin loppumisen jälkeen (tai alun jälkeen, jos loppua ei ole), ja se käsittelee yön yli tai viikon rajan yli menevät ikkunat.

Ikkunaa valvotaan kahdessa paikassa:

- **Listaus:** `GET /attendance/servicetimes` leimaa jokaiselle riville lasketun `checkinOpen`-totuusarvon. B1Appin itsepalvelu sisäänkirjaus (`CheckinPage.tsx`) ja B1Checkinin palvelunvalitsin (`app/services.tsx`) pitävät jokaisen ajan valittavana. Kun kaikki palvelun ajat ovat kiinni, ne näyttävät seuraavan avautuvan ajan ("Sisäänkirjaus avautuu su 9.30." B1Appissa, "Sisäänkirjaus tähän palveluun avautuu su 9.30." B1Checkinissa, lähteenä `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), ja jos avautumisaikaa ei voida laskea, käytetään tekstiä "Sisäänkirjaus ei ole tällä hetkellä auki tälle palvelulle." (kioskilla on Takaisin-painike toisen palvelun valintaan). Muuten suljetut ajat näkyvät valitsemattomana "Suljettu" / "Suljettu · avautuu 9.30" -rivinä. B1Checkinin kotitalousnäkymä (`MemberServiceTimes.tsx`) arvioi avoinnaolon uudelleen reaaliajassa laitteen kellon mukaan `ServiceTimeHelper.isCheckinOpen()`-funktiolla (laitteen aikavyöhyke, ei kirkon), joten pidempään päällä ollut kioski aukeaa ja sulkeutuu ajallaan, ja se näyttää suljetussa ajassa, johon henkilö on jo kirjautunut, "Lastenhuone 1 · Sisäänkirjattu" (ryhmän nimi).
- **Lähetys:** `evaluateGates()`-funktion sisällä ennen kapasiteetti- ja suhdetarkistusta `findClosedServiceTimeGroups()` hylkää erän vastauksella `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`, jos jonkin kohdeltavan session palveluaika on ikkunansa ulkopuolella. Koska kotitalouden tämän päivän olemassa olevat käynnit lähetetään uudelleen jokaisen sisäänkirjauksen yhteydessä, henkilön jo hallussa olevat sessiot (`personId|sessionId` olemassa olevissa käynneissä) ohittavat tämän tarkistuksen, joten myöhemmän avoimen palveluajan lisäystä ei hylätä sen takia, että aiempi ikkuna sulkeutui. B1Checkin näyttää tämän kovan rajoituksen näytöllä, jossa syy on "sisäänkirjaus ei ole tällä hetkellä auki" (kapasiteettirikkomukset näkyvät edelleen "huone on täynnä tai suljettu").

### Ikä- ja luokka-asteen kelpoisuus (kioskin puolella)

Huoneiden kelpoisuus on neuvova käyttöliittymä, jonka arvioi kioski, eikä palvelin valvo sitä. `B1Checkin/src/helpers/EligibilityHelper.ts` vertaa henkilön syntymäaikaa/luokka-astetta ryhmän `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`-arvoihin (luokka-asteiden järjestys: PreK, K, 1–12, Graduated) ja palauttaa `eligible` / `ineligible` / `unknown` — puuttuvat tiedot antavat `unknown`-tuloksen eivätkä koskaan piilota huonetta. Iät ja luokka-asteet lasketaan kirkon **luokkakorotuspäivänä** (`gradePromotionDate`-asetus, `"MM-DD"`, muokataan `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`-tiedostossa); kioski hakee sen `GET /attendance/checkin/settings`-päätepisteestä, ja `resolveAsOfDate` valitsee viimeisimmän esiintymän, joka on tänään tai sitä ennen. Huonevalitsin korostaa kelpaavat huoneet ja himmentää kelpaamattomat; kun valitaan himmennetty huone, tarvitaan henkilökunnan vahvistus.

### Luottamuksellinen ja ei-valtuutettu nouto

Noutajat ovat jäsenyysentiteetti, kotitaloutta kohden: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, valinnainen personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD on `GET /membership/householdpickup/:householdId` (mikä tahansa todennettu kirkon käyttäjä, jotta kioskit voivat lukea sen) sekä `POST` / `DELETE`, joita rajoittaa `people.edit`. Henkilökunta hallinnoi listaa henkilösivun **Nouto**-kortilla (`B1Admin/src/people/components/PickupPeople.tsx`) — kuva, suhde ja Luotettu / Ei valtuutettu -tilapainike.

Uloskirjauksessa (`B1Checkin/app/checkout.tsx`) kioski lataa kotitalouden noutolistan: `trusted`-merkinnät näkyvät napautettavina noutokortteina kotitalouden aikuisten valokuvaruudukon rinnalla, ja vapaasti kirjoitettu "Muu"-nimi verrataan sumeasti (Levenshtein, `src/helpers/PickupMatchHelper.ts`) `notAuthorized`-merkintöihin — osuma estää uloskirjauksen varoituslomakkeella ja henkilökunnan **Ohita**-painikkeella. Ohitus kirjataan itse käynnille: se lähettää `checkedOutBy`-kentäksi `"OVERRIDE: {name}"` tavallisen `POST /attendance/visits/checkout`-päätepisteen kautta, joten se päätyy osallistumistietueeseen ja `attendance.checkout`-webhookiin eikä erilliseen tarkastustauluun.

### Vanhempien hälyttäminen ja hätälähetys

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) tarjoaa kaksi tekstiviestipäätepistettä:

- `POST /page` — `{ visitId, message }`: hälyttää yhden sisäänkirjatun lapsen huoltajat (kioskin uloskirjausnäkymä, henkilökuntatilassa).
- `POST /broadcast` — `{ serviceId, message }`: lähettää tekstiviestin kaikkien palveluun sisäänkirjattujen kotitalouksien aikuisille (kioskin ylläpitoasetukset, takana `EMERGENCY`-tyypin vahvistuslomake `B1Checkin/app/adminSettings.tsx`-tiedostossa).

Molemmat ratkaisevat kotitalouden aikuiset jäsenyysgatewayn kautta ja siirtävät toimituksen **`MessagingModuleGateway.sendBulkText`**-funktiolle (`Api/src/shared/modules/MessagingModuleGateway.ts`) — moduulien välinen ovi kirkon määrittämään tekstiviestipalveluun (`@churchapps/texting`: TextInChurch, Clearstream tai MutualMinistry; sisäänrakennettua SMS-lähettäjää ei ole). Gateway kirjaa `sentText`-rivin ja vastaanottajakohtaiset `deliveryLog`-merkinnät ja rajoittaa erän 500 vastaanottajaan; ilman määritettyä palvelua se palauttaa `no_provider`, jonka kioski näyttää tekstinä "SMS-palvelua ei ole määritetty". Controllerin `dispatch()` poistaa puhelinnumeroiden kaksoiskappaleet ja ohittaa henkilöt, joilla ei ole matkapuhelinta tai joilla on `optedOut` asetettuna, ja palauttaa `{ sent, failed, skippedOptedOut, skippedNoPhone }`, jotta kioski voi näyttää, mitä ohitettiin.

## Kioski (B1Checkin)

Näytöt ovat expo-routerin tiedostoja kansiossa `B1Checkin/app/`; näyttöjen välinen tila on staattisessa `CachedData`-luokassa (`src/helpers/CachedData.ts`), ei React-tilassa.

```
index (käynnistys/automaattinen kirjautuminen) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             lataa serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ tulosta tarrat,
             groupServiceTimes,           │             └▶ checkout (henkilökunta)     palaa automaattisesti
             labelTemplates               │                                            hakuun
```

1. **Haku** (`app/lookup.tsx`) — hakee puhelinnumerolla (`GET /membership/people/search/phone?number=`, viimeiset 4 tai koko numero) tai nimellä (`GET /membership/people/search?term=`). Osuman valitseminen lataa kotitalouden (`GET /membership/people/household/{householdId}`) ja olemassa olevat käynnit (`GET /attendance/visits/checkin`) ja täyttää `pendingVisits`-listan viime viikon valinnoilla.
2. **Kotitalouden tarkistus** (`app/household.tsx`, `src/components/MemberList.tsx`) — jokaisella jäsenrivillä on jo sisäänkirjattu -merkki, allergia-/`nametagNotes`-merkki ja nykyiset huonesirut. Jäsenen laajennus listaa jokaisen palveluajan huonepainikkeen kanssa sekä Jäsen / Vieras / Vapaaehtoinen -sisäänkirjaustyyppisirut (`MemberServiceTimes.tsx`). Jokaisen palveluajan nimen alla `ServiceTimeHelper.getGroupSummary()` näyttää sillä tarjottavat ryhmät (`serviceTime.groups`-nimet, siistittyinä, kirjainkoosta riippumatta poistettuina kaksoiskappaleina ja pilkulla erotettuina); mitään ei näytetä, jos ajalla ei ole ryhmiä.
3. **Ryhmän valinta** (`app/selectGroup.tsx`) — kategoriapuu, joka on rakennettu `serviceTime.groups`-kentästä, iät/luokka-asteet täyttävät huoneet korostettuina ja kelpaamattomat himmennettyinä henkilökunnan vahvistuksen takana (katso [Ikä- ja luokka-asteen kelpoisuus](#ikäluokkaasteen-kelpoisuus-kioskin-puolella)); huoneen valinta kirjoittaa `{ session: { serviceTimeId, groupId } }`-visitSession-rivin henkilön odottavaan käyntiin (`src/helpers/VisitSessionHelper.ts`). "Ei mitään" tyhjentää valinnan.
4. **Valmis** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` lähettää `pendingVisits`-listan (jokainen leimattuna `checkinType`-tyypillä), tulostaa tarrat, jos tulostin on määritetty, ja palaa automaattisesti hakuun. Vastaus `409` kapasiteetti- tai `notOpen` näyttää nimetyn huoneen syyn kanssa (täynnä/suljettu tai sisäänkirjaus ei ole auki); suhdevaroitus tarjoaa henkilökunnan vahvistuksen, joka lähettää pyynnön uudelleen arvolla `acknowledgeWarnings=true`.

**Uloskirjaus** -näyttö (`app/checkout.tsx`) hyväksyy 4-merkkisen turvakoodin automaattisesti kohdistetulla kentällä — joten USB- tai Bluetooth-näppäimistömuotoisilla viivakoodinlukijoilla toimii ilman kameraa — tai näytöllä olevalla näppäimistöllä, jossa on sama aakkosto ja joka lähettää automaattisesti 4 merkin jälkeen. **Skannaa**-painike avaa lomakkeen, jossa on jaettu `src/components/CodeScanner.tsx`-kamera (oletuksena takakamera, hyväksyy QR-, Code 128- ja Code 39 -koodit), jotta asemat ilman langatonta lukijaa voivat lukea noutotarran; skannattu koodi syöttää saman `handleCode()`-polun kuin kirjoitettu syöte. Näyttö hakee koodin, näyttää noudettavat lapset ja esittää kotitalouden **luotettavat noutajat** napautettavina kortteina kotitalouden aikuisten valokuvaruudukon rinnalla (sekä "Muu" -vapaatekstivaihtoehto, joka vertaillaan sumeasti ei-valtuutettuihin nimiin — katso [Luottamuksellinen ja ei-valtuutettu nouto](#luottamuksellinen-ja-ei-valtuutettu-nouto)), ja lähettää sitten `POST /attendance/visits/checkout` -pyynnön valitsijan nimen/tunnisteen kanssa. Henkilökuntatilassa näyttö tarjoaa myös **Hälytä vanhempi** (`POST /attendance/checkin/page`) -toiminnon ja **turvatarran uudelleentulostuksen** — `reprint()` rakentaa perheen tarrat `LabelHelper.getAllLabelsFor(...)`-funktiolla ja syöttää ne samaa `PrintUI`-putkea pitkin kuin sisäänkirjaus.

Aseman luonne on AsyncStorage-lippu `@StationMode` (`"self"` | `"manned"`, vaihdetaan `app/adminSettings.tsx`-tiedostossa). Henkilökuntatila lisää uloskirjauksen aloituspisteen hakunäyttöön ja jäsenkohtaisen profiilin muokkauksen (`POST /membership/people`) kotitalousnäytöstä. Kioskin kovennus on sisäänrakennettu: valinnainen PIN-koodi (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) suojaa ylläpito- ja tulostinnäytöt, ylläpitonäyttö aukeaa vain 7 nopealla napautuksella otsikon logoon, ja tyhjäkäynnin houkutteluruutu (`src/hooks/useInactivityTimer.ts`) ottaa hallinnan perheiden välillä.

## Itsepalvelun sisäänkirjaus (B1App)

Jäsenet kirjautuvat sisään b1.church-portaalista `/mobile/checkin`-näytöltä (reititetty `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`-tiedostosta `screens/CheckinPage.tsx`-tiedostoon). Se vaatii kirjautuneen käyttäjän ja käy läpi samat neljä vaihetta kuin kioski — palvelut → kotitalous → ryhmät → valmis — samoja päätepisteitä vasten, ja tila pidetään tiedostossa `B1App/src/helpers/CheckinHelper.ts`. Erot kioskiin: kotitalous tulee kirjautuneen käyttäjän omasta `householdId`-kentästä (ei hakuvaihetta), eikä tulostusta ole — sen sijaan valmistumisnäyttö näyttää erän turvakoodin QR-koodina (`qrcode.react`) ja vihjeen "näytä tämä sisäänkirjausasemalla". Jos kotitalous on jo sisäänkirjattu sivun latautuessa, "Näytä sisäänkirjauskoodi" -painike näyttää QR-koodin uudelleen ensimmäisestä olemassa olevasta käynnistä (`GET /attendance/visits/checkin`), jolla on `securityCode`. Sisäänkirjaus kirjataan heti lähetyshetkellä (ei odottavaa tilaa); QR ohjaa tarrojen tulostusta vain kioskilla.

**Puhelimelta kioskille tarran tulostus** (`B1Checkin/app/scan.tsx`, avataan aloitusnäytön QR-koodin "Skannaa koodi" -painikkeesta): kioski näyttää `CodeScanner`-komponentin (`expo-camera` `CameraView`, oletuksena etukamera, käännettävissä) ja skannaa QR-koodeja. `ScanCodeHelper.parse()` hyväksyy sisällön vain, jos se on pelkkä 4-merkkinen koodi turvakoodin aakkostossa, ja `ScanCodeHelper.isRepeat()` jättää huomiotta saman koodin 4 sekunnin ajan, joten sekä B1Appin QR että tulostetun tarran QR-lohko toimivat. Näyttö seuraa sitten uloskirjauksen uudelleentulostuspolkua — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — ja palaa hakuun. Skannauksen aikana ei tehdä osallistumiskirjausta; vain tarrat. Koodit ilman aktiivisia käyntejä, asemat ilman tulostinta ja ryhmät ilman tarroja näyttävät kukin ilmoituksen ja palaavat hakuun.

Tyypit sekä `ApiHelper`/`ArrayHelper` tulevat paketeista `@churchapps/helpers` ja `@churchapps/apphelper`; React-komponentteja ei jaeta B1Adminin kanssa.

## Ylläpidon osallistuminen (B1Admin)

- **Asetukset** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderöi rakennepuun ja luo palvelut (`ServiceEdit.tsx`) ja palveluajat (`ServiceTimeEdit.tsx`). Kampustiedot tulevat jäsenyydeltä `useCampuses()`-koukun kautta.
- **Manuaalinen osallistuminen** on ryhmäpuolella, ei osallistumisosiossa: `B1Admin/src/groups/components/GroupSessionsTab.tsx` luo sessiot (`POST /attendance/sessions`; lisättäessä `SessionEdit.tsx` voi sisältää yhden session jokaiselle muulle ryhmälle, joka jakaa valitun palveluajan, ohittaen ryhmät, joilla on jo sessio kyseisenä päivänä), ja merkitsee henkilöt läsnä `POST /attendance/visitsessions/log`-päätepisteen kautta, joka etsii tai luo käynnin kyseiselle henkilölle ja sessiolle. Ryhmänjohtajat voivat kirjata osallistumisen omille ryhmilleen ilman `attendance.edit`-oikeutta — controllerit tarkistavat `au.leaderGroupIds`-kentän.
- **Raportointi** — osallistumistrendi ja ryhmän osallistuminen ovat palvelimen määrittelemiä raportteja (`B1Admin/src/components/reporting/ReportWithFilter.tsx` ReportingApi-rajapintaa vasten; määrittelyt kansiossa `Api/reports/*.json`). Molemmat ottavat `startDate`/`endDate` (loppupäivä mukaan lukien); trendiraportti oletusarvoisesti yhdestä vuodesta sitten tähän päivään ja lisää viikkokohtaisen `sessionDates`-sarakkeen, ja ryhmän osallistumisen näytöllä oleva puu sisältää jokaisen käynnin `checkinTime`-ajan ja henkilön `membershipStatus`-tilan. Ryhmän osallistumisen CSV tulee rinnakkaisesta `groupAttendanceDownload`-raportista, jonka `GroupAttendanceDownloadHelper` kääntää yhdeksi riviksi ryhmän jäsentä kohden, ja jokaiselle päivätylle sessiolle on oma läsnä/poissa-sarake; henkilökohtainen historia on `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Tarrojen tulostus

### Pohjat ja suunnittelija

Kirkot suunnittelevat omat tarransa B1Adminissa osoitteessa `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, avataan Check-In-asetussivulta). Tarrapohja on `labelTemplates`-rivi, jonka `content` on JSON-taulukko lohkoja — `text`, `field`, `barcode`, `qrcode` tai `box` — joista jokainen on sijoitettu prosenttikoordinaatteihin fontin, tasauksen, symbologian (`code39`/`code128`/`qr`) ja valinnaisten näkyvyysehtojen kanssa (esim. renderöi allergialaatikko vain, kun `person.nametagNotes` ei ole tyhjä). Tarratyyppejä on kaksi: `nametag` (yksi jokaista sisäänkirjattua henkilöä kohden; kentät kuten `person.displayName`, `sessions`, `securityCode` ja `person.isBirthdayWeek` — `"true"`, kun syntymäpäivän kuukausi/päivä on enintään 3 päivän päässä tänään, kiertäen vuodenvaihteen yli, lasketaan `LabelHelper.isBirthdayWithin()`-funktiolla) ja `pickup` (yksi per perhe; kentät kuten `children`, `childrenAllergies`). Palvelin varmistaa kirkkoa ja tyyppiä kohden yhden oletuksen (`LabelTemplateController.save`). Suunnittelija toimittaa aloituspohjat, jotka peilaavat kioskin mukana tulevia tarroja, ja esikatselee ne esimerkkidatalla.

### Renderöinti ja tulostus kioskilla

Sisäänkirjauksen valmistuessa `B1Checkin/src/helpers/LabelHelper.ts` päättää, mitä tulostetaan, odottavien käyntien ryhmälippujen perusteella: nimilaput `printNametag`-ryhmille sekä yksi perheen noutotarra, jos jokin käynti osui `parentPickup`-ryhmään. Käynnit, joiden `checkinType` on `volunteer`, ohitetaan `LabelHelper.selectChildVisits()`-funktiolla, joten lastenhoitaja Parent Pickup -huoneessa ei koskaan laukaise noutotarraa. Sisäänkirjauksen vastauksen turvakoodi laitetaan lapsien nimilappuihin ja noutotarraan; aikuisten nimilaput tulostuvat ilman koodia. Jos kirkolla on pohjia, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) muuntaa lohkot + kenttäkontekstin itsenäiseksi HTML-dokumentiksi; muuten käytetään `B1Checkin/assets/labels/`-kansion mukana toimitettuja HTML-tarroja paikanvaihdolla.

Viivakoodit luodaan inline-SVG:nä puhtaasti TypeScript-koodaajilla tiedostossa `B1Checkin/src/helpers/barcode.ts` — Code 39 -kuviotaulukot ja Code 128 (koodijoukko B, mod-103-tarkistussumma) leveystaulukot, ja QR `qrcode`-paketin kautta. **Nämä koodaajat on tarkoituksella monistettu B1Adminiin** (`LabelEditor.tsx` upottaa samat taulukot, mainittu koodikommentissa), jotta suunnittelijan esikatselut vastaavat pikselitarkasti kioskin tulostetta; muutos toiseen on peiliin toisessa.

Tulostusputki (`src/components/PrintUI.tsx`) renderöi jokaisen HTML-tarran `WebView`:ssä, kaappaa sen JPG-kuvaksi `react-native-view-shot`-kirjastolla ja antaa kuvien URI:t natiiville **printer-helper** Expo -moduulille (`B1Checkin/modules/printer-helper/`). Moduuli tarjoaa `scan()`, `checkInit()`, `printUris()` ja tilatapahtumat, joissa on palveluntarjoaja brändiä kohden molemmilla alustoilla:

| Brändi | Android | iOS | Huomiot |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-sarjan verkkotulostimet (QL-800/810W/820NWB/1100/1110NWB…), leikattavat 29×90 mm tarrat, suositeltu oletus |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Verkon löytäminen + TCP/ZPL-kuvatulostus |

Tulostimen valinta on tiedostossa `app/printers.tsx` (verkkoskannaus palauttaa `brand~model~ip`-merkinnät; valinta tallentuu AsyncStorageen), ja `src/helpers/PrinterLog.ts` ylläpitää laitteen diagnostiikkalokia, joka näkyy elävänä tilapisteenä kioskin otsikossa.

## Vierasrekisteröinti

Kaksi polkua luo henkilön sisäänkirjauksen aikana:

- **Kioskilla** — kotitalousnäytön "Lisää vieras" avaa `B1Checkin/app/addGuest.tsx`-tiedoston, joka hakee ensin olemassa olevaa ei-jäsenosumaa `GET /membership/people/search?term=` -päätepisteestä ja muuten luo uuden `POST /membership/people` -pyynnöllä, liitettynä nykyiseen kotitalouteen. Vieras kulkee sen jälkeen ryhmänvalinnan läpi kuten mikä tahansa jäsen.
- **Itsepalvelu QR-koodilla** — kun kirkon asetus `enableQRGuestRegistration` on päällä (määritetään B1Adminin Check-In-asetuksissa, luetaan `GET /membership/settings/public/{churchId}`-päätepisteestä), kioskin hakunäyttö näyttää QR-koodin, joka linkittää osoitteeseen `https://{subdomain}.b1.church/guest-register?serviceId=`. Tuo B1App-sivu (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) antaa vierailevan perheen rekisteröityä itse omalla puhelimellaan anonyymin `POST /membership/people/guest-register` -päätepisteen kautta, jolloin kioskijono liikkuu. QR-lomakkeessa on myös **Rekisteröidy täällä** -painike, joka avaa saman sivun kioskilla (`app/guestRegister.tsx`) incognito-tilassa ilman välimuistia `WebView`:ssä; `src/helpers/GuestRegisterHelper.ts` rakentaa URL-osoitteen sekä QR:lle että WebView:lle ja estää navigoinnin muualle kuin `https://{subdomain}.b1.church/guest-register`. Näyttö palaa hakuun **Valmis**-painikkeesta, takaisin-painikkeesta tai 120 sekunnin toimettomuuden jälkeen (lomakkeen kirjoittaminen välitetään WebView:stä aktiivisuutena), ja irrottaa WebView:n, jotta yhden perheen tiedot eivät koskaan päädy seuraavalle.

QR-rekisteröinti ohjataan kirkkoasetuksilla, jotka tallennetaan **QR Guest Registration** -kortilta B1Adminissa (`src/mobile/CheckInPage.tsx`):

| Asetus | Näkyvyys | Tarkoitus |
|---|---|---|
| `enableQRGuestRegistration` | julkinen | Kytkin, jolla kioskin QR ja anonyymit päätepisteet otetaan käyttöön |
| `guestRegistrationFields` | julkinen | JSON-kartta kentistä `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Oletus: sähköposti ja puhelin valinnaisia, muut pois päältä. Etu- ja sukunimi ovat aina pakollisia |
| `guestRegistrationImage` | julkinen | Otsikkokuvan URL; B1App näyttää sen 16:9-suhteessa kuvakkeen sijaan lomakkeella ja vahvistusnäytöllä |
| `guestRegistrationGroupId` | yksityinen | Ryhmä, johon jokainen rekisteröinti lisätään (vieraat eivät näe tai valitse sitä) |
| `guestRegistrationRecordAttendance` | yksityinen | `"true"`, jotta osallistuminen kirjataan myös tälle ryhmälle |

B1Appin `src/components/checkin/GuestRegister.tsx` hakee tarkistuslistan anonyymistä `GET /membership/people/guest-register/options?churchId=`-päätepisteestä ja renderöi vain sisällytetyt kentät (sähköposti, puhelin, siviilisääty ja osoite ensisijaisella yhteyshenkilöllä; syntymäaika, sukupuoli ja luokka-aste jäsentä kohden; yksi kommenttikenttä), ja lähettää vain nämä. Palvelin soveltaa tarkistuslistaa uudelleen `GuestRegistrationHelper.sanitize()`-funktiossa — pois päältä olevat kentät pudotetaan, puuttuvat pakolliset tai luettelon ulkopuoliset arvot ovat 400-virhe — ennen kuin `PersonHelper.registerGuestHousehold()` ajetaan. Se kutsuu ensin `PersonRepo.findGuestMatch()` jokaiselle jäsenelle, jolla on sähköposti tai puhelin: täsmälleen yksi elävä henkilö, jolla on sama etunimi ja sama sähköposti tai puhelinnumero, käytetään uudelleen (nolla tai useampi osuma luo uuden henkilön, joten arvailua ei ole). Yhteyshenkilötön jäsen täsmätään etunimellä sovitetun kotitalouden sisällä. Uudelleenkäytettyjä henkilöitä ei koskaan muokata, joten anonyymi lomake ei voi ylikirjoittaa tallennettuja tietoja, ja vastaus toistaa lähetetyt nimet. Täsmäämättömät jäsenet liittyvät sovitettuun tai uuteen kotitalouteen tilalla `membershipStatus: "Visitor"`, ja jokaisesta uudesta henkilöstä lähetetään `person.created`. Sen jälkeen epäonnistumiset kirjataan lokiin eikä palauteta: jäsenet lisätään määritettyyn ryhmään (`group.member.added`); jos osallistumisen kirjaus on päällä, `AttendanceModuleGateway.recordAttendance()` merkitsee jokaisen jäsenen läsnä jokaiselle ryhmän palveluajalle, jolla on aikataulu ja jonka sisäänkirjausikkuna (`CheckinGateHelper.isServiceTimeOpen`) on auki juuri nyt, luoden session kirkon paikallisen päivämäärän mukaan tarvittaessa — aikatauluttomat palveluajat ja ikkunan ulkopuoliset rekisteröinnit eivät kirjaa mitään; ja kommentit muuttuvat piilotetuksi henkilömuistiinpanokeskusteluksi kotitalouden päälle (viestin tekijä "Guest sign-up"), linkitettynä `person.conversationId`-kentän kautta.

## Liittyvät sivut

- [Osallistumisen päätepisteet](../api/endpoints/attendance) -- Täysi REST-pinta kampuksille, palveluille, sessioille, käynneille ja käyntisessioille
- [Jäsenyyden päätepisteet](../api/endpoints/membership) -- Henkilöt, kotitaloudet ja ryhmät
- [Webhookit](../api/webhooks) -- Tapahtumat `session.created`, `attendance.recorded` ja `attendance.checkout`
- [Moduulirakenne](../api/module-structure) -- Miten osallistumismoduuli on järjestetty palvelinpuolella

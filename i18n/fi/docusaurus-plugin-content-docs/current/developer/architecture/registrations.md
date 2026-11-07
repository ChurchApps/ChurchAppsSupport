---
title: "Tapahtumailmoittautumiset"
---

# Tapahtumailmoittautumiset

<div class="article-intro">

Sisäinen tapahtumailmoittautuminen sijaitsee sisältömoduulissa, ja maksullisten ilmoittautumisten käyttöönoton jälkeen siinä on täysi kaupallinen malli: hinnoitellut osallistujatyypit, hinnoitellut lisävalinnat, alennuskoodit, maksut seurakunnan olemassa olevan lahjoitysyhdyskäytävän kautta sekä tilapohjainen odotuslista. Maksupolku käyttää tarkoituksella uudelleen lahjoitusjärjestelmää. Ilmoittautumisohjain veloittaa saman `GatewayService` / `IGatewayProvider` -abstraktion kautta, joka on kuvattu sivulla [Lahjoitukset](./giving), joten korttitietoja tai maksupalvelun SDK:ta ei ole sisältömoduulissa. Tämä sivu kuvaa tietomallin, hinnoittelu- ja kapasiteettisäännöt sekä ilmoittautumis-, maksu- ja odotuslistavirrat.

</div>

## Yleiskatsaus

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Kolme sääntöä pätee koko pinossa:

1. **Palvelin määrittää hinnan.** Asiakas lähettää tyyppitunnisteet, valintatunnisteet ja määrät. `RegistrationPricingHelper.computeTotal()` laskee loppusumman palvelimella, ja kupongit validoidaan uudelleen veloitushetkellä. Asiakkaan lähettämään summaan ei koskaan luoteta.
2. **Kapasiteetti valvotaan atomisesti lisäyshetkellä.** Jokainen kapasiteettirajoitettu lisäys käyttää `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity` -lausetta, joten kaksi samanaikaista ilmoittautumista ei voi molemmat saada viimeistä paikkaa. Määrät johdetaan tilasta (`pending`/`confirmed`), niitä ei koskaan tallenneta.
3. **Maksut kulkevat lahjoitusjärjestelmän kautta.** `RegistrationController` kutsuu jaettua `GatewayService.processCharge`-metodia seurakunnan määrittämällä yhdyskäytävällä. Käytössä on sama palveluntarjoajaabstraktio, tokenisointimalli ja SCA-käsittely kuin lahjoituksissa.

## Tietomalli (`Api/src/modules/content`)

Mallit ovat tiedostossa `models/Registration.ts`, taulumäärittelyt tiedostossa `db/DatabaseTypes.ts`, ja jokaista taulua kohti on oma repo kansiossa `repositories/`.

| Taulu | Merkitys | Keskeiset kentät |
|-------|----------|------------------|
| `registrations` | Yksi ilmoittautuminen (yksi perhe tai seurue yhteen tapahtumaan) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Yksi osallistuja ilmoittautumisessa | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Osallistujatyypit tapahtumittain (esim. Aikuinen / Lapsi) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Nimetyt hinnoitellut lisävalinnat (esim. T-paita) | eventId, name, description, **price**, **capacity**, **maxQuantity** (ilmoittautumiskohtainen enimmäismäärä), sort, active |
| `registrationSelectionChoices` | Valinnan määrä, jonka ilmoittautuminen tai osallistuja on valinnut | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Yksi onnistunut veloitus ilmoittautumista vastaan | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Tapahtumakohtaiset alennuskoodit | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Huomioita:

- **Erillistä odotuslistataulua ei ole.** Odotuslistalla olevat seurueet ovat `registrations`-rivejä, joiden `status = 'waitlisted'`. Koko odotuslistan elinkaari on tilasiirtymiä tässä yhdessä taulussa.
- **Tallennettuja laskureita ei ole.** Myytyjen ja käytettyjen määrät (tapahtuman kapasiteetti, tyyppikohtainen kapasiteetti, valintakohtainen kapasiteetti, kupongin käytöt) lasketaan korreloiduilla alikyselyillä riveistä, joiden tila on `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Ilmoittautumisen peruminen vapauttaa siis kapasiteetin ilman erillistä kirjanpitoa.
- Hinnat ovat MySQL DECIMAL -sarakkeita (verkon yli merkkijonoina), ja ne muunnetaan `Number()`-funktiolla hinnoittelu-apurissa.

## REST-rajapinta

Kaikki on polun `/content/registrations` alla (`controllers/RegistrationController.ts`). Sitä suojaa `Permissions.registrations` (`view` / `edit`):

| Reitti | Käyttöoikeus | Tarkoitus |
|--------|--------------|-----------|
| `POST /register` | anonyymi | Koko lomakkeen lähetys: vieras, jäsen tai henkilökunnan Lisää osallistuja. Palvelimen hinnoittelu, kapasiteettitarkistukset ja valinnainen veloitus. |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | julkinen | Tyypit ja valinnat, joihin on johdettu `used` / `remainingCapacity` ohjattua lomaketta varten |
| `POST /types`, `DELETE /types/:id` (sama `/selections`- ja `/coupons`-reiteille) | `registrations.edit` | Henkilökunnan asetusten CRUD |
| `POST /coupons/validate` | julkinen | Alennuskoodin validointi lomakkeen aikana |
| `GET /coupons/event/:eventId` | henkilökunta | Kupongit käyttömäärineen |
| `GET /event/:eventId` · `GET /event/:eventId/count` | henkilökunta · julkinen | Osallistujaluettelo, ja aktiivisten määrä kapasiteettinäyttöä varten |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | kirjautunut | Omat ilmoittautumiset, yksityiskohdat ja maksuhistoria |
| `PUT /:id` | omistaja / henkilökunta | Muokkaus lähettämisen jälkeen. Korvaa osallistujat ja valintavalinnat tuoreilla atomisilla kapasiteettitarkistuksilla ja laskee `totalAmount`-summan uudelleen. Ei koskaan veloita eikä hyvitä automaattisesti. |
| `POST /:id/pay` | omistaja | "Viimeistele maksu": veloittaa `totalAmount − amountPaid` ja muuttaa tilan `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | henkilökunta | Manuaalinen siirto odotuslistalta |
| `POST /:id/cancel` · `DELETE /:id` | omistaja · henkilökunta | Peruminen tai poisto. Molemmat käynnistävät odotuslistan automaattisen siirron. |

Saman `personId`:n olemassa oleva ei-peruttu ilmoittautuminen samaan tapahtumaan hylätään 409-virheellä. Jokainen luotu ilmoittautuminen lähettää `registration.created`-webhookin `WebhookDispatcher`in kautta.

## Hinnoittelu ja alennuskoodit

`helpers/RegistrationPricingHelper.ts` on ainoa rahalaskennan auktoriteetti:

- `computeTotal()` laskee yhteen jokaisen osallistujan tyyppihinnan sekä jokaisen valinnan `hinta × määrä`.
- `validateCoupon()` tarkistaa aktiivisuuslipun, voimassaoloikkunan (`startDate`/`endDate`), `minMembers`-arvon suhteessa lähetetyn seurueen kokoon ja `maxUses`-arvon suhteessa tilasta johdettuun lunastusmäärään.
- `applyDiscount()`: `percent` vähentää `total × value/100`, `amount` vähentää `value`. Molemmat rajoittuvat nollaan.

Ohjattu lomake kutsuu `POST /coupons/validate` -päätepistettä antamaan välitöntä palautetta. `register` validoi kuitenkin kupongin uudelleen ja soveltaa sen palvelimella, joten asiakkaan näyttämä loppusumma on vain suuntaa antava.

## Atomisen kapasiteetin kaava

Jokainen kapasiteettirajoitettu lisäys kilpailee turvallisesti ilman transaktioita tai lukituksia, koska kapasiteettitarkistus on osa itse `INSERT`-lausetta. Tapahtumatasolla (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Nolla muuttunutta riviä tarkoittaa, että kapasiteetti on täynnä. Sama kaava suojaa tyyppikohtaiset lisäykset (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, joka laskee aktiivisiin ilmoittautumisiin liitetyt osallistujat) ja valintakohtaiset määrät (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, joka käyttää `COALESCE(SUM(quantity),0) + ? <= capacity`). Jos jonkin osallistujan tai valinnan lisäys epäonnistuu kesken ilmoittautumisen, ohjain peruuttaa osittaisen ilmoittautumisen `deleteCascade()`-kutsulla ja ilmoittaa, mikä tyyppi tai valinta myi loppuun.

## Maksuvirta

`processRegistrationCharge` ohjaimessa on ainoa paikka, jossa ilmoittautumiset koskettavat rahaa. Se on ohut asiakas lahjoitusjärjestelmälle:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenisointi tapahtuu selaimessa täsmälleen samalla tavalla kuin lahjoituksissa (ks. [Lahjoitukset](./giving)). Ohjattu lomake käyttää uudelleen apphelper-maksunkäsittelijöiden rekisteriä, joten kirjautuneet jäsenet voivat maksaa tallennetuilla korteilla ja vieraat tokenisoivat uuden kortin. Ohjain peilaa `DonateController`in palveluntarjoajakohtaiset erikoisuudet: Kingdom Funding `pm-{id}` -maksutapatunnukset ja Stripe SCA -vastaukset `requires_action`, jotka palautetaan asiakkaalle kirjaamatta maksua. Onnistunut veloitus kirjoittaa `registrationPayments`-rivin, kasvattaa `amountPaid`-arvoa ja vahvistaa ilmoittautumisen. **Hyvityksiä ei ole toteutettu.** Maksullisen ilmoittautumisen peruminen säilyttää maksurivit, ja mahdolliset hyvitykset hoidetaan erikseen maksupalvelun hallintanäkymässä.

Molemmat sisäänkäyntipisteet kulkevat saman koodipolun kautta: `register` (maksu rekisteröitymisen yhteydessä) ja `pay` (saldon maksu tai odotuslistan viimeistely).

`register` ohittaa veloituksen kahdessa tapauksessa ja tallentaa ilmoittautumisen tilaan `pending` arvolla `amountPaid = 0`, jolloin koko summa jää maksettavaksi saldona:

- **Henkilökunnan Lisää osallistuja.** Pyynnön rungossa on `personId`, joka ei ole kutsujan oma, ei `guestInfo`-kenttää, ja kutsujalla on `registrations.edit` kyseisessä seurakunnassa. Henkilön on oltava olemassa (muuten 404), perheenjäsensuodatin ohitetaan eikä korttia veloiteta.
- **Ei maksuyhdyskäytävää.** Seurakunnalla ei ole lahjoitusyhdyskäytävää (`hasGateway` tarkistaa `gateway.loadAll`). B1App-maksuvaihe näyttää korttilomakkeen sijaan painikkeen **Rekisteröidy ja maksa myöhemmin**.

Vieraat (ilman `au.id`-tunnistetta) tarvitsevat hinnoitelluissa ilmoittautumisissa `captchaPass`-arvon, joka saadaan pyynnöstä `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (nykyään `shared/helpers`-kansiossa) suoritetaan juuri ennen veloitusta, joten odotuslista- ja ilmaiset ilmoittautumiset eivät muutu. Kun `CAPTCHA_ENFORCE=true` ja ohitusluvan puuttuu tai se on virheellinen, uusi ilmoittautuminen peruutetaan `deleteCascade()`-kutsulla ja kutsu palauttaa 403-virheen. B1Appin `RegistrationPaymentForm` näyttää vierailleen reCAPTCHA-valintaruudun ja lähettää ohitusluvan sekä kortin tallennukseen että ilmoittautumiseen.

## Odotuslistan elinkaari

Kun tapahtuma on täynnä ja tapahtuman `waitlistEnabled`-lippu on päällä, `register` tallentaa seurueen tilaan `waitlisted` (ohittaen kapasiteettitarkistukset) ja lähettää tavallisen vahvistussähköpostin, joka on merkitty odotuslistapaikaksi. Siirto tapahtuu kolmella tavalla: `cancel`, `delete` ja henkilökunnan `promote`-päätepiste. Kaikki johtavat `RegistrationRepo.promoteFromWaitlist`-metodiin, joka valitsee odotuslistan vanhimman rivin ja vaihtaa sen atomisesti:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

`status='waitlisted'`-ehto estää, että samanaikaiset siirrot siirtävät saman rivin kahdesti. Kapasiteetin alikysely estää ylimyynnin siirron kautta. Siirretyt rivit päätyvät tilaan `pending` eikä `confirmed`, koska saldoa saattaa vielä olla maksamatta. `RegistrationHelper.sendWaitlistAvailabilityEmail` ilmoittaa ilmoittautujalle, että paikka vapautui. Kun `totalAmount − amountPaid > 0`, viesti linkittää seurakunnan B1-sivulle `/mobile/registrations` (Omat ilmoittautumiset), joka rakennetaan `B1AppRoot`ista ja seurakunnan alidomainista. Maksu tai saldon puuttuminen vahvistaa ilmoittautumisen.

:::info
Kapasiteetin korottaminen ei itsessään siirrä ketään odotuslistalta. Henkilökunta käyttää osallistujaluettelon Siirrä-toimintoa kapasiteetin korottamisen jälkeen. Peruutukset ja poistot siirtävät automaattisesti.
:::

## Asiakaspinnat

- **B1App-ohjattu lomake:** yksi yhteinen koukku, `B1App/src/components/registration/useEventRegistration.ts`, ohjaa sekä verkkosivukomponenttia (`components/registration/EventRegister.tsx`) että mobiilin portaalinäkymää (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) vaiheiden `info → members → selections → questions → payment → confirm` läpi. Keskivaiheet näkyvät vain, kun tapahtumassa on valintoja, liitetty lomake tai nollasta poikkeava loppusumma. Info- ja members-vaiheet näyttävät osallistujatyyppikohtaiset valitsimet reaaliaikaisine jäljellä olevan kapasiteetin ja loppuunmyynnin tiloineen. Maksuvaihe (`RegistrationPaymentForm.tsx`) näyttää tilausyhteenvedon, alennuskoodin syötön ja kirjautuneille jäsenille tallennetut maksutavat apphelper-maksunkäsittelijöiden rekisterin kautta. Vierailleen uusi kortti tokenisoidaan. **Ilmoittautumiset**-mobiilinäkymä (`screens/RegistrationsPage.tsx`) on Omat ilmoittautumiset: tila, maksamatta oleva saldo, Viimeistele maksu (`POST /:id/pay`), Muokkaa (`PUT /:id`: yhteystiedot, jäsentyypit ja valintamäärät) ja Peru.
- **B1Admin-asetukset:** `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` lisää Ota odotuslista käyttöön -kytkimen sekä akordeonit osallistujatyypeille, valinnoille ja alennuskoodeille (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Kaikki ne tekevät CRUD-toimintoja reiteille `/types`, `/selections` ja `/coupons`.
- **B1Admin-osallistujaluettelo:** `B1Admin/src/registrations/RegistrationDetailsPage.tsx` sisältää osallistujakohtaisen Tyyppi-sarakkeen, Maksettu/Yhteensä-sarakkeen saldomerkillä, tyyppikohtaiset määrämerkit, maksutietojen dialogin (`RegistrationDetailDialog.tsx`, lähteenä `GET /payments/:registrationId`), odotuslistan Siirrä-rivitoiminnon sekä CSV-viennin. Vienti sisältää osallistujatyypit, valinnat, maksettu/yhteensä/saldo ja kysymysten vastaukset.

Tietojen haku moduulien välillä (vieraan henkilön ratkaiseminen tai luominen, seurakunnan lataaminen sähköposteja varten) kulkee `getMembershipModuleGateway()`-kutsun kautta. Sisältömoduuli ei koskaan lue jäsenyystaulujen tietoja suoraan.

## Aiheeseen liittyvät sivut

- [Lahjoitukset](./giving): yhdyskäytävän abstraktio, palveluntarjoajarekisteri ja tokenisointimalli, joita tämä ominaisuus käyttää uudelleen
- [Sisältöpäätepisteet](../api/endpoints/content): sisältömoduulin REST-rajapinta
- [Webhookit](../api/webhooks): `registration.created`-tapahtuma
- [Moduulirakenne](../api/module-structure): sisältömoduulin järjestäytyminen palvelinpuolella

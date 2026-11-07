---
title: "Ilmoitusten ja muistutusten arkkitehtuuri"
description: "Miten B1 Admin -API reitittää ilmoitukset, ajastetut muistutukset, seurakunnan sähköpostirajat ja tekstiviestien estot yhden toimitusputken ja asetustarkistuksen kautta."
---

# Ilmoitusten ja muistutusten arkkitehtuuri

<div class="article-intro">

Jokainen viesti, jonka kirkon jäsen näkee muulla sivulla kuin sillä, jota hän katsoo (merkkimäärä, push-ilmoitus, yhteenvetosähköposti), kulkee yhden kahdesta ovesta MessagingApi-rajapinnassa. Tämä sivu kuvaa tätä suppilota, ajastetusti sitä ruokkivaa muistutusmoottoria sekä asetusmallia, joka päättää, mikä lopulta tavoittaa henkilön.

</div>

## Yleiskatsaus: kaksi ovea

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Kaikki, mikä kertoo henkilölle jotakin**, kulkee messaging-moduulin funktion `NotificationHelper.createNotifications()` kautta. Se tallentaa rivin `notifications`-tauluun ja etenee socket → push → sähköposti -ketjua pitkin. Jokaisen kanavan kohdalla se arvioi `PreferenceGateHelper`-tarkistuksen, mukaan lukien `in_app` tasolla 0.
2. **Kaikki ajastettu** on `reminderDefinition` (kokonaisuuskohtainen tai laajuuskohtainen). Se laajennetaan `reminderOccurrences`-riveiksi, ja `ReminderEngine.scan()` lähettää ne toistuvalla ajastimella. Yksi laajentaja, yksi lähettäjä ja yksi lähetyskirjanpito (`reminderSentLog`).
3. **Suora sähköposti** on olemassa vain `TransactionalEmailHelper.sendTransactional()`-funktion takana. ESLint-sääntö valvoo tätä käännösaikana, katso alla.

:::tip Sähköpostiovea valvoo linter, ei pelkkä käytäntö
`Api/tools/eslint-rules/email-door.cjs` määrittelee säännön `no-direct-email-helper`: jokainen kutsu `EmailHelper.sendTemplatedEmail()`- tai `EmailHelper.sendEmail()`-funktioon tiedostojen `NotificationHelper.ts` tai `TransactionalEmailHelper.ts` ulkopuolella epäonnistuu linttauksessa. Jos sinun on lähetettävä sähköposti, ohjaa se suppilon kautta (`createNotifications` ja `emailImmediate`) tai `TransactionalEmailHelper.sendTransactional()`-funktion kautta. Muuta tapaa, joka läpäisee CI:n, ei ole.
:::

## Ilmoitussuppilo

`NotificationHelper.createNotifications()` on ainoa sisäänkäyntipiste kaikelle, mikä ei ole ajastettua eikä transaktiivista:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Jokaiselle vastaanottajalle se tallentaa rivin `notifications`-tauluun ja kutsuu funktiota `attemptDeliveryWithEscalation`, joka käy läpi alla olevan kanavaportaan. Saman `(contentType, contentId)`-parin lukematon rivi estää uuden luomisen. Tätä päällekkäisyyden estoa ei käytetä `emailImmediate`-lähetyksissä (muistutusajat, henkilökunnan ”lähetä sähköposti kaikille” ja työnkulun vaiheet hoitavat omat päällekkäisyystarkistuksensa) eikä suorissa viesteissä, jotka aina välittävät ilmoituksen socketiin.

`shared/helpers/NotificationService.ts` peilaa saman allekirjoituksen (`NotificationServiceOptions`) messaging-moduulin ulkopuolisille kutsujille, ja se rekisteröidään messaging-moduuliin käynnistyksen yhteydessä.

## Kanavaportaiden ketju

Toimitus alkaa tasolta (oletuksena 0, muistutuksissa tai erillisissä lähetyksissä korkeammalta) ja jatkuu seuraavaan kanavaan vain, jos edellinen ei onnistunut. Jokaisen tason edessä `PreferenceGateHelper` tarkistaa, sallitaanko toimitus.

| Taso | Kanava | Toiminta |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app`-portti tarkistetaan ensin. Jos ilmoitus on estetty (mykistetty), rivi tallennetaan arvolla `isNew=false` ja toimitus päättyy kokonaan: ei socket-ilmoitusta, ei merkkiä, ei jatkoeskalaatiota. Muuten palvelin etsii henkilön `alerts`-huoneen avoimet socket-yhteydet ja lähettää `notification`- (tai `privateMessage`-) kehyksen. Tavallisten ilmoitusten kohdalla onnistunut socket-toimitus pysäyttää ketjun tähän. 30 minuutin ajastin tarkistaa lukemattomat kohteet myöhemmin ja eskaloi ne. Suorat viestit eivät koskaan pysähdy socketiin: asennettu PWA voi pitää alerts-socketia auki taustalla, mikä muuten estäisi käyttöjärjestelmän tason push-ilmoituksen. |
| 1 | **push** | Ehdollinen: `allowPush`, kategorian ulosjäänti ja hiljaiset tunnit. Lähettää sekä Expo-push-tunnuksille että Web Push -tilauksille, jotka löytyvät henkilön `devices`-riveiltä. Poistaa kaksoiskappaleet päätepisteen perusteella ja karsii samalla vanhentuneet tunnukset. |
| 2 | **email** | Ehdollinen: `emailFrequency` ja kategorian ulosjäänti. Välittömät lähetykset (`emailImmediate`) renderöidään heti ja kirjoittavat rivin `deliveryLogs`-tauluun. Muuten ilmoitus jää odottamaan eräkoostetta, joka kuvataan alla. |
| — | **sms** | Ei ole taso eskalaatioketjussa. Ainoa ehdollinen tekstiviestien lähettäjä on muistutusmoottori: kun definitionin `channels` sisältää `sms`, `ReminderEngine.sendSms()` lähettää jokaiselle vastaanottajalle tekstiviestin **push- tai sähköposti-ilmoituksen lisäksi** (katso [Tekstimuistutukset](#text-reminders)). Joukkotekstiviestit (`TextingController` / `@churchapps/texting`), palvelusivun **Text Volunteers** -toiminto (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) ja työnkulun **Send Text** -vaihe (`StepActionHelper.sendText` → `sendPersonText`) lähettävät kaikki tekstiviestin suoraan kirkon palveluntarjoajan kautta. Siksi ilmoitusasetukset ja hiljaiset tunnit eivät koske niitä. Huomioon otetaan vain henkilön `optedOut`-lippu. |

Lukemattomat ilmoitukset, jotka jäävät socket- tai push-tasolle, eskaloidaan 30 minuutin ajastimella (`NotificationHelper.escalateDelivery`). Eräsähköpostin lähettää `NotificationHelper.sendEmailNotifications(frequency)`, ja sitä ohjaa kunkin henkilön `emailFrequency`-asetus: `individual` ajetaan 30 minuutin ajastimella, `daily` yöajastimella. (`weekly` on kelvollinen asetusarvo, mutta sille ei ole vielä omaa eräajoa.)

## Muistutusmoottori

Ajastetut muistutukset (tapahtumamuistutukset, tehtävien eräpäivät sekä palvelu- ja suunnitelmatehtävien muistutukset) kulkevat kaikki yhden yleistetyn moottorin kautta. Ominaisuuksilla ei ole kullekin omaa cron-logiikkaa.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Määritelmät** (`reminderDefinitions`) ovat joko kokonaisuuskohtaisia (`entityId` asetettu, eli tietty tapahtuma, tehtävä tai suunnitelma) tai laajuuskohtaisia (`entityId` null, `scopeId` asetettu, esim. jokainen suunnitelma palvelutyypin alla). Määritelmä sisältää pilkulla erotetun listan minuuttisiirtymiä (`offsets`, esim. `"1440,60"` yksi päivä ja yksi tunti ennen), paikallisen lähetysajan (`sendLocalTime`), pilkulla erotetun listan kanavia (`channels`, mukaan lukien `email`, joka laukaisee välittömän rikkaan sähköpostin lähetyshetkellä), `recipientMode`-asetuksen ja valinnaisen mukautetun `message`-viestin.

**Laajennus** luo muistutusrivit tulevalle aikavälille (liukuva useamman päivän ikkuna). Se ajetaan yöajastimella, ja synkronisesti aina kun määritelmä tallennetaan, jotta viime hetken tapahtuman muistutus varmasti lähtee. Laajuusmääritelmät hajautuvat sovittimen `loadScopeEntities`-funktion kautta, ja jokaista konkreettista kokonaisuutta kohden syntyy oma esiintymäjoukkonsa. Kokonaisuuskohtaiset esiintymät käyttävät avainta `definitionId:occurrenceISO:offset`. Laajuuskohtaiset esiintymät nimiavaruutetaan kokonaisuuden tunnuksella, joten ne eivät koskaan törmää toisiinsa. Esiintymän päivittäminen **herättää henkiin** aiemmin peruutetun rivin. Peru ja laajenna uudelleen on tavallinen tapa synkronoida muistutus uudelleen, kun taustalla oleva kokonaisuus muuttuu. Rivejä, jotka ovat jo tilassa `sent`, `failed` tai `processing`, ei muuteta.

**Lähetys** (`ReminderEngine.scan()`) ajetaan 30 minuutin ajastimella. Se varaa erääntyneet esiintymät (lease estää kaksoiskäsittelyn), lataa vastaanottajat kokonaisuuden sovittimen kautta ja suodattaa pois kaikki, jotka on jo kirjattu `reminderSentLog`-lokiin kyseiselle esiintymälle. Sitten se kutsuu `createNotifications`-funktiota arvolla `deliveryStartLevel: 1` (suoraan push-tasolle) sekä arvoilla `emailImmediate` ja `emailByPerson`, jos määritelmän kanavat sisältävät sähköpostin.

### Tekstimuistutukset

Kun definitionin `channels` sisältää `sms`, `scan()` kutsuu `ReminderEngine.sendSms()`-funktiota push- ja sähköposti-ilmoitusten luomisen jälkeen samoille tuoreille vastaanottajille. Tekstiviestit ovat jokaisen jäsenen erikseen valitsemia:

- Jokainen vastaanottaja käy läpi `PreferenceGateHelper.evaluate(..., "sms", ...)`-tarkistuksen. Siksi `allowSms` täytyy olla päällä (se on oletuksena pois ja asetetaan B1App-sovelluksen **Text messages** -kytkimestä), eikä kategorian `sms`-kanavaa saa olla ohitettu pois päältä. `event_reminders`, `serving_schedule` ja `tasks` listaavat `sms`-kanavan sekä `defaultChannels`- että `allowedChannels`-listoissa.
- Henkilöt, joilla ei ole `mobilePhone`-numeroa tai joiden `optedOut` on asetettu, ohitetaan. Jos kirkolla ei ole tekstiviestipalveluntarjoajaa, loppu erä estetään syyllä `no_provider`.
- Viestin runko rakennetaan funktiolla `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, leikattuna yhteen 160 merkin segmenttiin.
- Jokaisella vastaanottajalla on oma `reminderSentLog`-rivinsä, jonka `channel` on `"sms"` ja tila `sent` / `suppressed` / `failed`. Rivi on erillinen push- ja sähköpostirivistä, joten epäonnistunut tekstiviesti ei koskaan lähetä push-ilmoitusta tai sähköpostia uudelleen.

Muokkausnäkymät tarjoavat **Text**-vaihtoehdon vain, kun `GET /messaging/texting/status` palauttaa `{ enabled: true }` (kirkon ensimmäinen tekstiviestipalveluntarjoaja on käytössä).

**STOP-tilauksen peruutus.** `POST /messaging/texting/inbound/:churchId/:token` on anonyymi webhook, jonka kirkko liittää palveluntarjoajaansa. B1Admin näyttää URL-osoitteen pyynnöstä `GET /messaging/texting/inboundUrl` tekstiviestiasetuksissa. Tunnus on kirkon tunnuksen HMAC (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` hyväksyy Twilio-tyyliset lomakekentät sekä Clearstream- ja TextInChurch-tyyliset JSON-viestit. Jos vastaus on täsmälleen operaattorin lopetussana (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), kirkon jokaisen poistamattoman henkilön, jonka matkapuhelinnumero täsmää, arvoksi asetetaan `people.optedOut = true` ja `allowSms = false`. Muut vastaukset kuitataan ja jätetään huomiotta.

Sisäinen tapahtumaväylä reagoi kokonaisuuksien muutoksiin odottamatta yöllistä laajennusta. Sisältötapahtumat (webhook-lähettäjän kautta) sekä suunnitelma- ja tehtävätapahtumat käynnistävät välittömän uudelleenlaajennuksen tai peruutuksen kyseiselle kokonaisuudelle. Suunnitelman päivitys laajentaa lisäksi uudelleen sen suunnitelmatyyppiin liittyvät laajuusmääritelmät.

### Sovittimet

Moottori ei ole sidottu kokonaisuustyyppiin. Jokainen tuettu kokonaisuustyyppi liittyy moottoriin sovittimen (`helpers/adapters/`) kautta:

| Kokonaisuustyyppi | Sovitin | Huomautuksia |
|-------------|---------|--------------|
| `event` | `EventReminderAdapter` | Vastaanottajat rajataan rekisteröityneisiin tai ryhmän jäseniin tapahtumasta ja `recipientMode`-asetuksesta riippuen. |
| `plan` | `PlanReminderAdapter` | Vastaanottajina ovat hyväksytyt ja vahvistamattomat tehtävät julkaistuissa (ei luonnos) suunnitelmissa. Palvelun vahvistustyönkulun kautta annetut vahvistamattomat tehtävät suljetaan pois, kunnes ne hyväksytään (katso alla). `buildEmails` kutsuu `DoingModuleGateway.buildPlanReminderEmails`-funktiota, joka renderöi tehtävät, muistiinpanot ja mukautetun viestin `doing/helpers/PlanReminderEmailHelper`-moduulilla. Mukana ovat Accept/Decline-painikkeet, jotka `ReminderTokenHelper` allekirjoittaa ja jotka lähettävät julkiseen tehtävävastaus-päätepisteeseen. |
| `task` | `TaskReminderAdapter` | Vastaanottajina ovat tehtävän vastuuhenkilö tai -henkilöt. |

### Päätepisteet

| Menetelmä | Polku | Tarkoitus |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Lataa tai tallenna yhden kokonaisuuden muistutusmääritelmä. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Lataa tai tallenna laajuustason (perittyn) muistutusmääritelmä. |
| `DELETE` | `/messaging/reminders/:defId` | Poista määritelmä ja peruuta sen odottavat esiintymät. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Esikatsele tapahtumamuistutuksen vastaanottajamäärä ja seuraavat lähetysajat ennen tallennusta. |
| `GET` | `/messaging/reminders/log` | Kirkon viimeaikaiset muistutusesiintymien historiat. |
| `POST` | `/messaging/reminders/mute` | Mykistä muistutukset tietylle kokonaisuudelle. |

Määritelmän tallentaminen käynnistää synkronisen uudelleenlaajennuksen kyseiselle kokonaisuudelle tai laajuudelle. Muokkaajat näkevät siis ajantasaiset ”seuraavat lähetykset” odottamatta yöajoa.

## Suorat viestit

Suorat viestit kulkevat samaa suppilon kautta kuin kaikki muu, eivät erillistä eskalaatioreittiä pitkin. Jokaisella lukemattomalla keskustelulla on yksi **varjorivi** `notifications`-taulussa (`contentType='privateMessage'`, `contentId` = yksityisviestin tunnus, `category='direct_messages'`). Varjorivi hallinnoi kaikkea toimitustilaa: socket-, push- ja sähköposti-eskalaatiota, lukuseurantaa ja muuta. `privateMessages`-taulu säilyttää itse viestin sisällön ja `notifyPersonId`-sarakkeen. Tämä sarake on lukemattomien merkin lähde, ja se tyhjennetään, kun vastaanottaja lukee keskustelun.

Varjorivit eivät näy ilmoituskellossa. Ne on jätetty pois lukemattomien määrän kyselystä, ilmoitusluettelon kyselystä sekä merkitse luetuksi- ja poistokyselyistä, jotka kaikki suodattavat `contentType <> 'privateMessage'`. Jokainen suoran viestin ilmoitus välittyy socketiin lukutilasta riippumatta (chat-tyyppinen toiminta, ei kaksoiskappaleiden estoa). Suorat viestit eivät koskaan pysähdy socket-toimitukseen kuten tavalliset ilmoitukset, koska taustalla oleva PWA voi pitää socketia auki ja silti tarvita käyttöjärjestelmän tason push-ilmoituksen. Jos henkilö mykistää suorien viestien ilmoitukset, varjorivi asetetaan syrjään (`isNew=false`, `notifyPersonId` tyhjennetään). Viesti näkyy yhä keskustelussa itsessään, mutta ilman merkkejä tai hälytyksiä.

## Asetukset ja portitus

Jokainen lähetys kulkee `PreferenceGateHelper.evaluate()`-funktion läpi. Se on puhdas funktio: kaikki tila annetaan sisään, eikä kriittisellä polulla tehdä tietokantakutsuja. Funktio palauttaa arvon `allow`, `suppress` tai `defer`. Kerrokset ajetaan järjestyksessä, ja ensimmäinen, joka päättää, voittaa:

1. **Lukittu kategoria**: jotkin kategoriat ovat pakollisia (taso 0) ja ohittavat kaikki muut kerrokset.
2. **Pääasetuksen mykistys ja kanavan katkaisu**: `masterMute`, `allowPush`, `allowSms` (oletuksena pois, jäsenet ottavat sen käyttöön itse) tai `emailFrequency='never'` estävät lähetyksen kokonaan.
3. **Hiljaiset tunnit**: koskevat vain pushia ja tekstiviestejä, sillä sähköpostia pidetään häiritsemättömänä. Jos henkilön aikavyöhykkeen kellonaika osuu hänen hiljaiseen ikkunaansa, siirtoluonteinen kategoria menee silti läpi. Ei-siirtoluonteinen lähetys siirretään hiljaisen ikkunan loppuun. Loppuhetki lasketaan DST-oikein UTC-hetkenä funktiolla `TimezoneHelper.wallClockToUtc`.
4. **Kategiakohtainen asetusohitus**: nimenomainen ulosjäänti yhdelle kategoria × kanava -parille. Jos ohitusta ei ole, käytetään kategorian oletusta.
5. **Kokonaisuuskohtainen mykistys**: tiettyyn kokonaisuuteen (esim. yksi tapahtuma tai yksi suunnitelma) tallennettu mykistys rajoittaa enemmän kuin kategiatason asetus. Se koskee kuitenkin vain tilanteita, joissa kutsuja antaa ilmoituksen mukana kokonaisuuden tunnuksen ja tyypin.

Mukana olevat taulut: `notificationPreferences` (globaali: `masterMute`, `emailFrequency` arvoilla `individual|daily|weekly|never`, `allowPush`, hiljaisten tuntien ikkuna ja aikavyöhyke, `allowSms`), `notificationPreferenceOverrides` (kategoria × kanava) ja `notificationEntityMutes` (kokonaisuuskohtainen).

Tämä portti pakotetaan sovelluksen sisäisessä kanavassa (taso 0), pushissa (taso 1) ja sähköpostissa (taso 2) suppilon sisällä, mukaan lukien välittömät muistutus- ja koostesähköpostit. Se pakotetaan myös muistutustekstiviesteille funktiossa `ReminderEngine.sendSms()`. Siirtosähköposti (kirjautumiskoodit, salasanan palautukset, kutsut ja lahjoituskuitit) ohittaa portin tarkoituksella. Juuri siihen toinen ovi on olemassa.

### Palvelun vahvistustyönkulut

Suunnitelma voi ottaa käyttöön työnkulun `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Julkaise/Ilmoita kutsuu silloin `POST /doing/plans/:id/issueRequests`-päätepistettä kohdekohtaisen ilmoituksen sijaan. Jokainen uusi vahvistamaton tehtävä saa merkinnät `notified` ja `confirmationWorkflowId` sekä yhden työnkulkukortin (`tasks.assignmentId`, yksilöllinen `followupKey`). Kortti lähettää vain sovellukseen näkyvän hälytyksen (`appOnly: true`, ei push- eikä sähköpostieskalaatiota). Sen jälkeen se suorittaa työnkulun `sendAssignmentRequest`-toiminnot, jotka kulkevat funktion `MessagingModuleGateway.sendServingWorkflowMessage` kautta:

- sähköposti `NotificationHelper.sendWorkflowEmail`-funktion kautta (preferenssiportti sekä `ChurchEmailLimiter`, mittarina `workflowEmail`)
- tekstiviesti `sendPersonText`-funktiolla vain, kun `allowSms` ja `serving_schedule`-kategorian portti sallivat sen.

Hyväksy tai Hylkää (`assignment.updated` tapahtumaväylällä) sulkee kortin. 30 minuutin ajastin (`AssignmentWorkflowHelper.processPending`) korjaa missatut aloitukset ja tapahtumat. Se muuttaa myös vastaamattoman pyynnön seurantamääräajan tullen johtajan tarkistustehtäväksi. Koko elinkaari on kuvattu tiedostossa `Api/docs/assignment-confirmation-workflows.md`.

## Kirkon kirjoittamien sähköpostien rajat

Sähköposti, jonka sisällön kirkko on kirjoittanut, lähtee jaetusta ChurchApps SES -identiteetistä. Siksi `Api/src/shared/helpers/ChurchEmailLimiter.ts` mittaa sen kirkkokohtaisesti. Neljä polkua kutsuu sitä:

- ryhmä- ja mallilähetykset (`EmailTemplateController`, sisältötyyppi `email`)
- lomakkeen jatkoviestit (`FormSubmissionController`, `formFollowUp`)
- työnkulun **Send email** -toiminnot (`NotificationHelper`, arvolla `churchAuthored`, `workflowEmail`)
- palvelun vahvistuspyyntöjen sähköpostit (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`)

Järjestelmäpostia (kirjautumiskoodit, kuitit, muistutukset) sekä rooli- ja ryhmäkutsuja (`UserController.sendInviteEmail`, kiinteä malli) ei mitata.

- **Hyväksyntäportti.** Kirkko ei lähetä mitään ennen kuin palvelinylläpitäjä asettaa `churches.emailApprovedDate`-kentän (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → **Group Email** -merkki). Arkistoidut kirkot estetään aina. B1Adminin Send Email -valintaikkuna lukee päätepisteen `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`). Jos kirkkoa ei ole hyväksytty, valintaikkuna näyttää editorin sijaan **Request review** -kortin. Työnkulun vaiheeditori lukee saman päätepisteen (käytettävissä myös `tasks.admin`-käyttäjille ja `groupMembers.edit`-käyttäjille) ja varoittaa **Send email** -toiminnoista, jos kirkko ei ole hyväksytty tai sen lähetykset on keskeytetty. Lähetyshetkellä `MessagingModuleGateway.sendTemplatedEmail` palauttaa `false` ilman ilmoituksen luomista, jos `ChurchEmailLimiter.remaining()` on alle 1. Näin kortin historia ei koskaan väitä **Email sent** -tilaa postille, joka pudotettiin. `POST /messaging/emailTemplates/requestApproval` lähettää tuelle sähköpostin enintään kerran viikossa kirkkoa kohden.
- **Ansaittu kiintiö.** Hyväksytty kirkko saa `max(150, 2 × sen paras kirkon kirjoittama päivä edeltävän 30 päivän aikana)`. Kiintiö on katettu 2 000 viestiin liukuvan 24 tunnin ajalta. Nykyistä 24 tuntia ei oteta huomioon ”parhaassa päivässä”, jotta purske ei nosta omaa rajaansa.
- **Varaa, sitten selvitä.** `reserve()` kirjoittaa yhden `deliveryLogs`-rivin vastaanottajaa kohden ennen lähetystä. Se tarkistaa kiintiön uudelleen näiden rivien kanssa ja perääntyy, jos kaksi pyyntöä ohitti rajan samanaikaisesti (lähetys palauttaa 429). `settle()` merkitsee kunkin rivin lähetetyksi tai epäonnistuneeksi.
- **Valitusten keskeytys.** `sesFeedback`-Lambda (`Api/src/lambda/ses-feedback-handler.ts`, syötteenä SES → SNS) kiinnittää jokaisen pysyvän palautuksen tai valituksen kirkkoon, jonka kirkon kirjoittama sähköposti saavutti kyseisen osoitteen samaan aikaan. Tallennus tehdään `deliveryMethod`-arvoilla `sesBounce` ja `sesComplaint`. Kirkko keskeytetään, kun valituksia on 2 tai enemmän (≥ 0,3 % lähetyksistä) tai kovia palautuksia 10 tai enemmän (≥ 5 %) 7 päivän aikana.

## Ajastus

Sekä muistutusmoottori että ilmoitusten koosteet käyttävät olemassa olevia ajastimia sen sijaan, että ottaisivat käyttöön uutta infrastruktuuria:

| Ajastin | Aikataulu | Suorittaa |
|-------|----------|--------|
| 30 minuutin ajastin | joka 30. minuutti | Eskaloi lukemattomat ilmoitukset. Lähettää `individual`-taajuuden koostesähköpostit. Lähettää erääntyneet muistutusesiintymät (`ReminderEngine.scan`). Käsittelee hyväksyntäkoosteet ja erääntyneet automaatiosuoritukset. |
| Yöajastin | 05:00 UTC | Ryhmien läsnäolomuistutukset. Siirtää toistuvia suoratoistopalveluita eteenpäin. Virkistää automaattisesti päivittyvät listat. Laajentaa muistutusesiintymät seuraavalle aikavälille (`ReminderEngine.expandAll`). Lähettää `daily`-taajuuden koostesähköpostit. |

Paikallisesti saman logiikan voi käynnistää pyynnöstä komennoilla `npm run timer:30min` ja `npm run timer:midnight` `Api`-projektista.

## Tiedostoluettelo

| Alue | Tiedostot |
|------|-----------|
| Suppilo | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Jaettu sisäänkäynti | `Api/src/shared/helpers/NotificationService.ts` |
| Siirto-ovi | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, linttisääntö `Api/tools/eslint-rules/email-door.cjs` |
| Kirkon sähköpostirajat | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Muistutusmoottori | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Tekstiviestit / STOP-tilauksen peruutus | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (palvelusivun **Text Volunteers**) |
| Muistutusvarastot | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Palvelu- ja suunnitelmasähköposti | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Muistutusmuokkaimet (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Muistutusmuokkain ja asetukset (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Aiheeseen liittyvät sivut

- [Reaaliaikainen arkkitehtuuri](../realtime.md): WebSocket-protokolla ja asiakaspuolen perusrakenteet (`SocketHelper`, `SubscriptionManager`, `ConversationStore`), joiden päällä sisäinen toimitustaso toimii
- [Web Push -ilmoitukset](../web-push.md): VAPID-asetukset ja selaimen Push API -polku, jota push-eskalaatiotaso käyttää
- [Viestiliikenteen päätepisteet](../api/endpoints/messaging.md): täydellinen REST-rajapinta viesteille, keskusteluille, yhteyksille sekä ilmoitus- ja muistutusreiteille

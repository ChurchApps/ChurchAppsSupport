---
title: "Giving-arkkitehtuuri"
description: "Kehittäjän opas ChurchApps-lahjoituksiin: miten B1 Admin ja B1.church lähettävät lahjoituksia Stripe-, PayPal-, Kingdom Funding- tai Paystack-yhdyskäytävien kautta."
---

# Giving-arkkitehtuuri

<div class="article-intro">

ChurchApps toteuttaa lahjoitukset yhdyskäytävämallilla (gateway-rail): seurakunta pitää omat Stripe- (tai PayPal-, Kingdom Funding- tai Paystack-) tilinsä, eikä B1 koskaan ole maksunvälittäjänä rahavirrassa. Korttitiedot tokenisoidaan selaimessa, eivätkä ne koskaan päädy ChurchAppsin palvelimelle. Tämä sivu kuvaa koko pinon: `@churchapps/apphelper`-paketin asiakaspuolen maksuntarjoajarekisterin, GivingApi-yhdyskäytävän abstraktion, lahjoitusten tietomallin sekä sen, miten yhdyskäytävän webhookit synkronoituvat takaisin tietokantaan.

</div>

## Yleiskuva

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (selain)   │                   │  Maksuyhdyskäytävä                    │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ kortin syöttö     │  Stripe Elements · KF-tokenizer ·     │
│  │ Maksunttarjoajan      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ rekisteri             │  │◀── token / nonce ─│  (kortti ei koskaan saavuta B1:n      │
│  │ getPaymentProvider()  │  │                   │   palvelinta)                         │
│  │ Stripe · PayPal · KF  │  │                   └──────────▲────────────────┬───────────┘
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            veloitus / tilaus │                │ allekirjoitettu
┌─────────────────────────────────────────────┐ (salainen avain)│                │ webhook-tapahtuma
│  GivingApi — /giving-moduuli                │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  tallenna donations + fundDonations — deduplikointi eventLogs / transactionId
                      ▼
                MySQL (giving-skeema)
```

Pinon kolme periaatetta:

1. **Yhdyskäytävä pitää kortin.** Jokaisen tarjoajan syöttöwidget tokenisoi tiedot selaimessa; API vastaanottaa ainoastaan tokenin, noncen tai tilausnumeron.
2. **Yksi abstraktio, monta tarjoajaa.** Selain hakee `PaymentProvider`-tarjoajan rekisteristä; palvelin hakee `IGatewayProvider`-toteutuksen tehtaasta. Molemmat käyttävät samaa normalisoitua tarjoajan nimeä, joka on tallennettu yhdyskäytävätietueeseen.
3. **Webhookit ovat maksun lopullinen totuuden lähde.** Veloituksen vastaus kirjataan optimistisesti, mutta allekirjoitettu webhook vahvistaa (tai luo) valmiin lahjoituksen. Molemmilla puolilla on idempotenssisuojat.

## Asiakaspuoli: maksunttarjoajien rekisteri (`@churchapps/apphelper`)

Rekisteri sijaitsee kansiossa `Packages/apphelper/src/donations/providers/`. Kunkin tarjoajan widgetit ja apufunktiot ovat omassa alikansiossaan (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). `providers/`-kansion ulkopuolella mikään koodi ei haarauddu tarjoajan nimen perusteella. `PaymentProvider` (ks. `providers/types.ts`) sisältää kaiken, mitä isäntäsovellus tarvitsee yhtä yhdyskäytävää varten: `descriptor` (hallinnon nimikkeet, tuetut valuutat, kenttä maksuille, oletuskulut sekä kojelauta- ja rekisteröintilinkit), `capabilities`-ominaisuusjoukko (tallennetut kortit, ACH, toistuvat maksut, uuden kortin syöttö suoraan, tallennus tokenisoinnin yhteydessä), React-widgetit lahjoittajan syötölle (`MemberWrapper`/`MemberEntry`), vierailijalahjoitukselle (`GuestForm`), tallennetun maksutavan muokkaukselle (`MethodEditForm`) ja lomakekysymysten maksuille (`FormPayment`), sekä `buildChargeRequest(ctx, token)`, joka on ainoa paikka, jossa veloituspyynnön rakenne eroaa tarjoajittain. Jokainen tarjoajan `MemberWrapper` lataa oman SDK:nsa yhdyskäytävätietueen julkisella avaimella, joten isäntäsovellukset eivät koskaan tuo yhdyskäytävän SDK:ta (B1App ja B1Admin eivät riipu `@stripe/*`-paketeista). `pickDefaultGateway(gateways, capability?)` määrittää, mitä seurakunnan yhdyskäytävää kukin näkymä käyttää.

`providers/registry.ts` sisältää sisäänrakennetut tarjoajat. Ne **viitataan arvon perusteella**, eikä niitä rekisteröidä moduulin sivuvaikutuksena, joten bundlerin tree-shaking ei voi koskaan poistaa rekisteröintiä:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funktio | Tarkoitus |
|---------|-----------|
| `getPaymentProvider(name)` | Hakee normalisoidun nimen perusteella; palaa Stripeen, jotta virheellinen tarjoajan asetus ei koskaan kaada lahjoituslomaketta |
| `registerPaymentProvider(p)` | Rekisteröi lisätarjoajan ajonaikaisesti (isäntäsovelluksen oma yhdyskäytävä) |
| `listPaymentProviders()` | Luettelee sisäänrakennetut ja mukautetut tarjoajat; käytetään hallinnon yhdyskäytäväpudotusvalikon rakentamiseen |
| `hasPaymentProvider(name)` | Tarkistaa, onko tarjoaja rekisterissä |

**Sisäänrakennetut asiakastarjoajat: Stripe, PayPal, Kingdom Funding, Paystack.** B1App ja B1Admin ainoastaan *lukevat* rekisteriä (`getPaymentProvider`, `listPaymentProviders`); kumpikaan ei kutsu `registerPaymentProvider`-funktiota. Rekisteröinti pysyy apphelperin sisällä.

Jokainen tarjoaja tokenisoi tiedot omalla tavallaan, mutta kaikki pitävät kortin erillään B1:stä:

| Tarjoaja | Syöttowidget | API:lle palautettu token |
|----------|--------------|--------------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; vierailijalomake kiinnittää myös `ExpressCheckoutElement`-elementin (Apple Pay / Google Pay, kertalahjat), jonka `onConfirm` palauttaa saman `pm_…`-tunnuksen | maksutavan tunnus (`pm_…`); pankkitili `/paymentmethods/ach-setup-intent`-reitin kautta: Financial Connections `us_bank_account` USD-yhdyskäytäville, kanadalainen PAD `acss_debit` (hostattu valtuutusikkuna, valtuutus `default_for` laskuille/tilauksille, kertaveloitukset välittävät valtuutuksen tunnuksen) CAD-yhdyskäytäville |
| Kingdom Funding | Hostattu tokenizer-lomake, avaimena yhdyskäytävän julkinen avain | kertakäyttöinen nonce |
| PayPal | PayPal Hosted Fields (kortti, toistuvat maksut) sekä PayPal Smart Buttons Venmo-rahoituksella (kertaluonteiset); molemmat jakavat yhden SDK-latauksen, ja palvelimen tilaus rakennetaan reittien `/donate/client-token` ja `/donate/create-order` kautta | vangittu tilaustunnus |
| Paystack | Paystack Inline -ponnahdusikkuna (`js.paystack.co/v2/inline.js`) — ponnahdusikkuna itse hoitaa maksun (kortti, mobiilirahansiirto, pankkisiirto, USSD) | maksettu tapahtumaviite; tallennetut maksutavat ovat Paystackin `AUTH_…`-valtuutuskoodeja |

Stripen `finalizeResult` suorittaa 3-D Secure / SCA -vahvistuksen selaimessa (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) ennen kuin lahjoitus katsotaan valmiiksi. Jaettu lomake kutsuu vain `provider.finalizeResult(result)`-funktiota eikä tiedä, mitä se tekee.

## Palvelinpuoli: yhdyskäytäväabstraktio (GivingApi)

`/giving`-moduuli (`Api/src/modules/giving`) tarjoaa REST-rajapinnan; yhdyskäytävän infrastruktuuri on kansiossa `Api/src/shared/helpers`. `DonateController` ei koskaan puhu suoraan yhdyskäytävän SDK:lle. Se kulkee `GatewayService`in kautta, joka hakee oikean `IGatewayProvider`-toteutuksen tehtaasta `GatewayFactory` ja antaa sille puretun `GatewayConfig`-asetuksen.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() purkaa privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) on sopimus, jonka jokainen yhdyskäytävä toteuttaa. Se kattaa webhookien elinkaaren (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), maksut (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), kulut (`calculateFees`), tallennettujen maksutapojen käsittelyn (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) sekä valinnaiset lisäominaisuudet (asiakkaat, tilaukset, SetupIntentit, tapahtumien toisto, `retryFailedPayment` epäonnistuneelle tilauslaskulle ja `registerPaymentMethodDomain` Apple Pay -domainin vahvistukseen). Tarjoaja, joka jättää valinnaisen koukun pois, ilmoitetaan toiminnon osalta tukemattomaksi, ja käyttöliittymä piilottaa vastaavan säätimen. Jokainen tarjoajaluokka ilmoittaa oman `capabilities`-matriisinsa (tuetut valuutat, ACH, hyvitykset, tilausvaatimukset, tapahtumarajat). `GatewayService.getProviderCapabilities(provider)` vain lukee sen. Lisäksi liput, kuten `logsDonationsImmediately`, ohjaavat kontrollerien toimintaa ilman tarjoajakohtaisia ehtoja kontrollereissa.

**Palvelintarjoajat rekisteröity `GatewayFactory`-tehtaaseen:**

| Tarjoaja | Saatavuus |
|----------|-----------|
| Stripe | Aina käytössä |
| PayPal | Aina käytössä |
| Kingdom Funding | Aina käytössä |
| Paystack | Aina käytössä (Nigerian, Ghanan, Etelä-Afrikan, Kenian ja Norsunluurannikon kauppiaat; valuutat NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Valinnainen ympäristölipun `ENABLE_SQUARE` kautta |
| ePayMints | Valinnainen ympäristölipun `ENABLE_EPAYMINTS` kautta |

Paystack eroaa muista siinä, että rahat liikkuvat ennen kuin GivingApi tulee mukaan: ponnahdusikkuna veloittaa lahjoittajan, `processCharge` on `GET /transaction/verify/:reference`, jonka maksettu summa ja valuutta täytyy vastata kirjattavaa lahjoitusta (jo kirjattu viite ei koskaan kirjata kahdesti), ja toistuvan aikataulun ensimmäinen lahja kirjataan `finalizeSubscription`-funktiosta (verify → `POST /plan` → `POST /subscription`, jossa `start_date` on yksi väli eteenpäin). Webhookit allekirjoitetaan salaisella avaimella itsellään (`x-paystack-signature`, HMAC-SHA512 raakadatasta), eikä Paystackilla ole webhookien hallinta-rajapintaa. Hallintanäkymä näyttää siksi URL-osoitteen, jonka seurakunta liittää Paystack-kojelautaansa. `charge.success`-uusiutumistapahtumissa ei ole rahastojakoa; tarjoaja palauttaa sen lahjoittajan paikallisista `subscriptions`/`subscriptionFunds`-riveistä. Ainoastaan korttivaltuutukset ovat `reusable`-tyyppisiä. Mobiilirahansiirtolahjat ovat vain kertaluonteisia, joten `createSubscription` hylkää ne. Demodata lisää toisen seurakunnan (Accra Community Church, `CHU00000002`) Paystackin testitilassa olevaan GHS-yhdyskäytävään, jotta Paystack-Playwright-testisarja toimii Gracen Stripe-sarjan rinnalla.

Mukautettuja tarjoajia voi rekisteröidä ajonaikaisesti, kun `ENABLE_CUSTOM_GATEWAY_PROVIDERS` on asetettu. `AbstractExperimentalGatewayProvider` on niiden kantaluokka. Tarjoajien nimet täsmäytetään kirjainkoosta riippumatta.

### Yhdyskäytävän asetukset ja salaisuudet

Hallinta tallentaa yhdyskäytävän tunnukset reitillä `POST /giving/gateways` (`GatewayController`). Tallennuksessa kontrolleri salaa yksityisen ja webhook-avaimen `EncryptionHelper`-apuohjelmalla ennen tallennusta. Jos isäntä on muu kuin localhost, se poistaa seurakunnan olemassa olevan webhookin ja luo uuden, joka osoittaa osoitteeseen `/giving/donate/webhook/{provider}?churchId=…`. Seurakunnalla on yksi rivi tarjoajaa kohden: yhdyskäytävän tallentaminen korvaa vain saman tarjoajan olemassa olevan rivin. Julkiset lukupyynnöt (`GET /giving/gateways/churchId/:churchId` ja `/configured/:churchId`) palauttavat vain julkiset avaimet.

## Tietomalli

Giving-skeema (`Api/src/modules/giving/db/DatabaseTypes.ts`, mallit kansiossa `models/`) on MySQL-skeema, johon pääsee Kyselyn kautta:

| Taulu | Tehtävä |
|-------|---------|
| `gateways` | Seurakunnan tarjoajakohtainen asetus: `provider`, `publicKey`, salattu `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Lahjoitusten kohdistukset (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Ryhmittely syöttöä ja raportointia varten (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Yksi lahja: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; tiliotteet, summat, kojelaudat ja lahjoitusraportit laskevat vain `complete`- tai null-tilaiset), `transactionId` |
| `fundDonations` | Lahjoituksen jakaminen yhdelle tai useammalle rahastolle (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Toistuva lahja; `id` on yhdyskäytävän tilaustunnus, linkitetty `personId`-, `customerId`- ja `gatewayId`-kenttiin |
| `subscriptionFunds` | Toistuvan lahjan rahastojako |
| `customers` | Yhdistää `personId`-tunnuksen yhdyskäytävän asiakastunnukseen tarjoajakohtaisesti (`provider`) |
| `gatewayPaymentMethods` | Tallennetut kortit ja pankkitilit: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook- ja tapahtumalokit sekä deduplikointiavain (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Rahastoon sidotut lahjoituskampanjat ja kunkin henkilön luvattu summa |

Lahjoitus jaetaan rahastoille `fundDonations`-taulun kautta: lahjoitus kantaa kokonaissumman, ja jokainen `fundDonation` kantaa osuuden. `donations.currency` ja `gateways.currency` kantavat ISO-valuuttakoodin. Jokainen tarjoaja ilmoittaa `supportedCurrencies`-valuuttansa, ja summat muotoillaan `CurrencyHelper.formatCurrencyWithLocale`-funktiolla.

## Päästä päähän -kulut

### Jäsenen kertaluonteinen ja toistuva lahjoitus (B1App)

Kirjautuneen lahjoittajan lahjoitusnäkymä (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) koostuu kolmesta apphelper-komponentista: `MultiGatewayDonationForm`, `PaymentMethods` ja `RecurringDonations`. B1App hoitaa ympäröivän tietojen latauksen — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — ja välittää yhdyskäytävälistan eteenpäin. Valittu tarjoaja lataa oman SDK:nsa yhdyskäytävän julkisella avaimella. Varsinainen veloitus tapahtuu apphelperin sisällä: valittu tarjoaja tokenisoi (uuden tai tallennetun) maksutavan ja lähettää sen reitille `/giving/donate/charge` kertalahjaa varten tai `/giving/donate/subscribe` toistuvaa varten. Molemmat päätepisteet kohdistavat kirjautuneen lahjoittajan omaan `personId`-tunnukseensa (vain `donations.edit`-oikeuden omaavat voivat kohdistaa toiselle henkilölle), ja ne hylkäävät rahastojaot, joiden summa ylittää veloitetun summan. Toistuvat lahjat luovat `subscriptions`-rivin sekä `subscriptionFunds`-rivit ja luovuttavat aikataulun yhdyskäytävälle (Stripe Subscriptions, PayPal Billing Plans tai KF:n toistuva aikataulu).

### Vieraslahjoitus / anonyymi lahjoitus

Julkinen lahjoitussivu (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) ja "anna nyt" -paneeli renderöivät `NonAuthDonationWrapper`-komponentin paketista `@churchapps/apphelper/website`. Se injektoi reCAPTCHAn ja yhdyskäytävän Elements-kontekstin tarjoajan `GuestForm`-lomakkeen ympärille. Vieraat eivät kirjaudu sisään, eivätkä he näe tallennettuja maksutapoja tai historiaa. Kulku hakee `GET /giving/funds/churchId/:id`- ja `GET /giving/donate/gateways/:churchId`-tiedot (vain julkiset avaimet), vahvistaa kävijän `POST /giving/donate/captcha-verify`-pyynnöllä, tokenisoi selaimessa ja lähettää lahjan reitille `/giving/donate/charge` (tai `/subscribe`). Vahvistuskutsu palauttaa 10 minuutin HMAC-allekirjoitetun `captchaPass`-tunnuksen (`Api/src/modules/giving/helpers/CaptchaPass.ts`), jonka lomake lähettää jokaisen vieraan rahaliikennepyynnön mukana. Kun `CAPTCHA_ENFORCE=true`, API hylkää vieraiden `create-order`-, `charge`-, `subscribe`-, `addcard`- ja `ach-setup-intent-anon`-pyynnöt ilman voimassa olevaa tunnusta kyseiselle seurakunnalle. Vieraiden maksulliset tapahtumailmoittautumiset (`POST /content/registrations/register`) tarkistavat saman tunnuksen juuri ennen veloitusta; ks. [Tapahtumailmoittautumiset](./registrations.md#payment-flow). Vieraiden ACH käyttää anonyymiä `POST /giving/paymentmethods/ach-setup-intent-anon`-pyyntöä, joka sallii vain välittömän (Financial Connections) vahvistuksen. Mikrosiirtotarkistus valmistuu päivien päästä, kun vierassivu on jo suljettu, joten lahja ei koskaan valmistuisi. Lomake ei veloita vahvistamatonta SetupIntentiä, vaan ohjaa lahjoittajan kortin tai kirjautuneen pankkitilin asetukseen.

Kolme vieraslomakkeen valintaa käyttävät samaa veloituspyyntöä. `?fundId=` ja `?amount=` lahjoituslinkissä esivalitsevat rahastojaon (kunkin tarjoajan vieraslomake lukee ne latautuessaan, ja ne kulkevat tavallisen rahastonvaihtokäsittelijän kautta, jolloin summat ja kulut päivittyvät). `anonymous: true` saa `DonateController.charge`-funktion hylkäämään asiakkaan lähettämän henkilön ja kirjaamaan lahjan `personId = null` -arvolla. Vieraslomake ohittaa `/people/loadOrCreate`-kutsun sekä asiakas- ja holvivaiheen, ja kolme välittömästi kirjaavaa tarjoajaa lopettavat henkilön selvittämisen yhdyskäytävän asiakkaasta. Apple Pay edellyttää, että sivun domain on rekisteröity Stripeen, joten Stripe-vieraslomake lähettää kerran istunnossa julkisen, nopeusrajoitetun `POST /giving/donate/register-domain`-pyynnön. Se hyväksyy vain seurakunnalle kuuluvan domainin (`<subDomain>.b1.church`, rivi sisältömoduulin domain-taulussa tai paikallinen isäntä) ennen kuin kutsuu Stripen payment-method-domains-rajapintaa.

### Hallinnon kirjaus ja Stripe-tuonti (B1Admin)

B1Admin-lahjoitusosio (`B1Admin/src/donations/`) on paikka, jossa talousryhmät työskentelevät. Erän syöttö (`components/BulkDonationEntry.tsx`) kirjaa käteis-, shekki- ja luontoislahjoja lähettämällä `/giving/donations`- ja sitten `/giving/funddonations`-pyynnöt; yhdyskäytävää ei ole mukana. Henkilötietueen **Kirjaa lahja** -paneeli (`components/LogGiftDialog.tsx`) tekee saman yksittäiselle lahjalle: ensin se etsii erän, jonka `batchDate` vastaa lahjan päivää, tai luo uuden ssen päivän nimellä (`POST /giving/donationbatches`), ja poistaa lahjoituksen sekä uuden erän, jos myöhempi vaihe epäonnistuu. Rahastot, erät, kampanjat ja tiliotteet vastaavat kukin omia `/giving/*`-CRUD-reittejään. Tiliotteiden tulostussivut (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) pyytävät yhden kalenterivuoden tiedot kutsulla `GET /donations?startDate=&endDate=` ja `GET /fundDonations?startDate=&endDate=`, eikä koko seurakunnan historiaa, joka saattaisi ylittää Lambdan vastauskoon rajan. Jäsentyylinen lahjoitusnäkymä (`B1Admin/src/donationComponents/`) käyttää samoja apphelper-komponentteja kuin B1App.

Kirjanpito- ja raportointisiirrot tehdään asiakaspuolella tai raportointiajossa, eivät yhdyskäytävässä. Erän sivun QuickBooks-vienti rakentaa erän `donations`- ja `fundDonations`-tiedoista kirjanpitomerkinnän CSV-tiedoston (veloitus Undeposited Funds, yksi hyvitys rahastoa kohden). Yhteenvetosivun Lapsuneet lahjoittajat -näkymä ajaa `Api/reports/lapsedGivers.json`-tiedoston yleisen raportointiajon kautta, ja `ReportOutput` ratkaisee henkilöiden nimet. Maakohtaiset kuittiformaatit (Kanada / Australia / Uusi-Seelanti) ovat seurakunnan asetuksia jäsenyyden avain-arvo-varastossa. Ne renderöidään `GivingStatementDocument`-komponentilla ja kopioidaan B1App-tulostussivulle. B1Admin-tiliotteiden tulostussivut (`PrintDonationPage`, `PrintAllStatementsPage`) välittävät seurakunnan `logoLight`-asetuksen (`usePrintLogo`-funktion kautta tiedostossa `B1Admin/src/components/PrintChurchHeader.tsx`), jotta logo tulostuu jokaisen tiliotteen yläreunaan, ja odottavat kuvan latautumista ennen automaattista tulostusta.

### Erän tila ja Enter Donations -oikeus

Erät voidaan sulkea, jotta täsmäytetty talletus pysyy muuttumattomana. `POST /giving/donationbatches/:id/close` ja `/:id/reopen` (vain Donations.Edit) ovat ainoat kirjoittajat kentille `status`, `closedDate` ja `closedBy` (`DonationBatchRepo.setStatus`). Tavallinen erän tallennus ei koskaan koske niihin, joten erän kirjaaminen ei voi avata suljettua erää. Kirjoitusoikeus on keskitetty tiedostoon `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit voi muuttaa kaikkea, kun taas kapeampi Donations.Enter-oikeus (`GivingApi` / `Donations` / `Enter`, roolieditorissa "Enter Donations") saa luoda eriä ja tallentaa tai poistaa lahjoituksia ja rahastojakoja vain silloin, kun sekä lahjoituksen nykyinen erä että kohde-erä ovat auki. Yhdyskäytävälahjaa (jolla on `transactionId`) se ei koskaan saa muokata. Estetty kirjoitus palauttaa `403 { error: "This batch is closed." }`. Erien lukeminen hyväksyy Donations.ViewSummary- tai Donations.Enter-oikeuden, jotta laskija voi valita erän, johon hän kirjaa. Asiakaspuolella `B1Admin/src/donations/batchAccess.ts` peilaa nämä säännöt (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), ja `Header` / `SecondaryMenuHelper` näyttävät **Lahjoitukset > Erät** kaikille, jotka voivat nähdä eriä, vaikka heillä ei olisi View Summary -oikeutta.

### Valuuttasekoitusten yhteissummien muuntaminen

Jokainen päätepiste, joka palauttaa yhden yhdistetyn summan mahdollisesti eri valuuttaisista lahjoista — lahjoitusyhteenvedon KPI-kortit (`GivingKpiCards`), erän kokonaissumma, rahaston kokonaissumma sekä B1App-lahjoitusnäkymän vuosi- ja jaksosummat — muuntaa summat palvelimella seurakunnan oletusvaluuttaan sen sijaan, että se laskisi yhteen eri valuuttoja. `Api/src/shared/helpers/ExchangeRateHelper.ts` hakee kurssit osoitteesta `api.frankfurter.dev` seurakunnan valuutan mukaan, tallentaa ne prosessin muistiin 12 tunniksi ja tarjoaa funktion `convertTotals(rows, churchCurrency, rates)`. Rivit ryhmitellään valuutan mukaan jo SQL:ssä (muutama ryhmä, ei lahjakohtaista muunnosta). Jokainen ryhmä muunnetaan ja lasketaan yhteen, ja tulos kantaa `isConverted`-lipun, jonka perusteella asiakas näyttää huomautuksen "Muunnettu nykyisillä valuuttakursseilla". `GET /donations/exchange-rates` tarjoaa kurssitaulukon asiakkaille, jotka sitä tarvitsevat (B1Appin lahjoitusnäkymä). Kurssit eivät koskaan tule pyynnöstä, vaan ne haetaan aina palvelimelta, joten asiakas ei voi vaikuttaa raportoituun summaan. Yksittäisiä lahjoitustietueita ja historiallisia tai alkuperäisessä valuutassa olevia raportteja ei muunneta, vaan ainoastaan yhdistetyt summat.

Stripe-tuonti (`B1Admin/src/donations/StripeImportPage.tsx`) täydentää lahjat, jotka on tehty B1:n ulkopuolella. Se kutsuu `POST /giving/donate/replay-stripe-events` -pyyntöä `dryRun: true` -arvolla esikatselua varten ja sitten `dryRun: false` -arvolla tuontia varten. Palvelin listaa Stripe-tapahtumat päivämääräväliltä ja ohittaa jo kirjatut. Vastaavuus tarkistetaan ensin `eventLogs`-tietueen provider-tunnuksen, sitten transaktiotunnuksen ja lopuksi `DonationRepo.findMatchingDonation`-funktion (summa + päivä + henkilö) perusteella, joten uusi ajo ei tuo samaa lahjaa kahdesti. Tilauksen `charge.succeeded`- ja `payment_intent.succeeded`-tapahtumat ohitetaan, koska `invoice.paid` kirjaa nämä lahjat. Uudemmat Stripe API -versiot poistavat kentän `PaymentIntent.invoice`, joten ohitus tunnistaa myös kuvauksen "Subscription …".

## Webhookit ja täsmäytys

Hyväksytyt maksut ja tilauksen tilan muutokset saapuvat osoitteeseen `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Käsittely on tarkoituksella idempotenttia:

1. **Vahvista** — `GatewayService.verifyWebhook` delegoi allekirjoituksen tarkistuksen tarjoajalle; epäonnistunut allekirjoitus palauttaa 401. Tapahtumat, joita ei tarvitse käsitellä, palauttavat heti 200.
2. **Deduplikoi tapahtuma** — `EventLogRepo.loadByProviderId` ohittaa webhookin, joka on jo kirjattu `eventLogs`-tauluun.
3. **Deduplikoi lahjoitus** — ennen minkään luomista `DonationRepo.loadByTransactionId` tarkistetaan jokaista mahdollista tunnistetta vastaan, joita hyötykuorma voi sisältää. Tämä kattaa kaksoistoimitukset, monivaiheiset ACH-tapahtumat (odottava → selvitetty) sekä tilanteen, jossa `/donate/charge` on jo kirjannut lahjan optimistisesti.
4. **Käsittele** — tarjoajan `classifyWebhookEvent(eventType)` kertoo, mitä tapahtuma tarkoittaa (`donation` odottava/valmis, `cancel-subscription` tai `ignore`). Valmiit maksut luovat `complete`-lahjoituksen tai päivittävät olemassa olevan `pending`- tai `failed`-lahjoituksen. ACH-tyyppiset tapahtumat kirjautuvat `pending`-tilaan, kunnes ne selvitetään. Epäonnistunut tilauslasku (Stripen `invoice.payment_failed`) luo `failed`-lahjoituksen, jonka avain on laskun tunnus. Peruutustapahtumat poistavat paikallisen `subscriptions`-rivin. Kontrolleri ei koskaan tarkista tarjoajakohtaisia tapahtumanimiä.

### Epäonnistuneet toistuvat lahjat ja maksumuistutukset

`failed`-lahjoitus on palautusprosessin yksikkö. `GET /giving/donations/failed` listaa ne uusimman yhdyskäytävän virheilmoituksen kanssa `eventLogs`-tiedoista, ja `canRetry`-lippu tulee yhdyskäytävän ominaisuuksista. `POST /giving/donate/retry/:donationId` kutsuu tarjoajan `retryFailedPayment`-funktiota (Stripe maksaa avoimen laskun), ja tuloksena oleva webhook päivittää rivin `complete`-tilaan tavallisen deduplikointipolun kautta. Maksumuistutukset lähetetään lahjoittajalle webhook-käsittelijästä päivänä 0, ja sen jälkeen keskiyön ajastimessa (kytketty sekä tiedostoon `lambda/timer-handler.ts` että `RailwayCron.ts`) `DunningHelper.run`-funktiolla päivinä 3 ja 7. Jokainen lähetys kirjataan `eventLogs`-tauluun arvoilla `provider: "dunning"` ja `providerId: "<donationId>:<day>"`, joten uusi ajo ei lähetä sähköpostia kahdesti. Kun Stripe luovuttaa ja peruuttaa tilauksen (`customer.subscription.deleted` ja `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` lähettää lahjoittajalle kerran sähköpostin (`providerId: "<subscriptionId>:canceled"`). Lahjoittajan tai hallinnon tekemät peruutukset pysyvät hiljaisina. Stripe ei koskaan lisää tapahtumia olemassa olevaan päätepisteeseen. Kun muutat `StripeHelper.webhookEvents`-listaa, tallenna yhdyskäytävä uudelleen tai aja `tools/manual/stripe-webhook-events.ts` tuotantoon (oletuksena kuivaajo, `--apply` kirjoittaa muutokset).

Tarjoajat, joilla on `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack), kirjaavat veloitukset `/charge`-vastauksesta (ei webhook-kierrosta onnistuneella polulla). Stripe luottaa tapahtumiin `payment_intent.succeeded` / `invoice.paid` sekä ACH:n `payment_intent.processing`-tapahtumaan. Kulujen käsittely (`POST /giving/donate/fee`, yhdyskäytävän lippu `payFees` ja kunkin tarjoajan `calculateFees`) laskee lahjoittajan puolella "peitä kulut" -korotuksen. B1 ei peri alustamaksua, joten sovellusmaksua ei koskaan lisätä.

:::info
Veloitus- ja webhook-polut kirjoittavat samat `donations`- ja `fundDonations`-rivit. `transactionId` on yhdistävä avain, joka estää optimistisen veloituskirjauksen ja sen myöhemmän webhookin tuottamasta kahta lahjoitusta yhdestä lahjasta.
:::

## Liittyvät sivut

- [Giving-päätepisteet](../api/endpoints/giving.md) — koko REST-rajapinta lahjoituksille, rahastoille, erille, yhdyskäytäville, tilauksille, maksutavoille ja webhookeille
- [AppHelper](../shared-libraries/app-helper.md) — npm-paketti, joka sisältää maksunttarjoajien rekisterin ja lahjoituskomponentit
- [Moduulirakenne](../api/module-structure.md) — miten GivingApi-moduuli on järjestetty palvelinpuolella

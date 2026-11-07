# MinistryStuff (maksullinen tallennustila ja tekstiviestit)

MinistryStuff.org on erillinen maksullinen palvelu, joka rahoittaa kaksi asiaa, joita ChurchApps ei voi tarjota ilmaiseksi: massatallennuksen (1TB+) ja tekstiviestikrediitit. Ne myydään kiinteähintaisina kuukausitilauksina. ChurchApps pysyy itse 100 % ilmaisena. Mikään B1-toiminto ei vaadi MinistryStuff-tilausta, ja jokainen integraatiokohta on palveluntarjoajan liityntäpinta, jonka myös kolmas osapuoli voisi toteuttaa.

## Komponentit

| Osa | Repo | Tehtävä |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (kehityspotti 8097) | Laskutus (Stripe), tekstiviestien lähetys ja krediittikirjanpito (AWS End User Messaging), tallennus (S3 + kiintiökirjanpito). Yksi MySQL-tietokanta `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (kehityspotti 3103) | ministrystuff.org: markkinointi, hinnoittelu ja tilauspalvelu (tilaukset, käyttö, uudelleenohjaukset Stripe Checkoutiin ja Customer Portaliin). |
| Tekstiviestipalveluntarjoaja | `Packages/texting` → `MinistryStuffProvider` | Rekisteröity nimellä `ministrystuff` Clearstreamin ja TextInChurchin rinnalla. |
| Tallennuksen liityntäpinta | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (oletus, ilmainen) kääri alkuperäisen S3/levy-valinnan. `FileStorageHelper` delegoi oletuspalveluntarjoajalle muuttumattomana. |
| Api-kytkennät | `Api/`-sisältö- ja viestintämoduulit | `MinistryStuffStorageProvider` + `StorageResolver` (sisältö), `TextingConfigHelper`-palvelunavaimen lisäys (viestintä), `storageProviders`-taulu, `/content/storage/*`- ja `/messaging/texting/credits`-päätepisteet. |

## Identiteetti ja luottamus

- Samat tilit, samat seurakunnat: MinistryStuffApi tarkistaa ChurchApps-JWT-tunnisteet jaetulla `JWT_SECRET`-avaimella (sisarsovellusmalli, kuten B1Transfer). Portaali kirjautuu MembershipApi:in kautta ja hyväksyy `?jwt=`-siirrot.
- Palvelimelta palvelimelle (ydin-Api → MinistryStuffApi): `X-Service-Key`-otsake (`MINISTRYSTUFF_SERVICE_KEY`, molemmilla puolilla) ja eksplisiittinen `churchId`. Oikeudet tarkistetaan aina kyseisen seurakunnan tilauksesta. Seurakunnat eivät koskaan pidä MinistryStuffin tunnuksia. Riittää, että palveluntarjoaja valitaan B1Adminissa.

## Tekstiviestien kulku

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → viestinosat veloitetaan nykyisen laskutusjakson `smsCreditGrants`-krediiteistä → AWS End User Messaging (tai `smsMode: mock` kehitysympäristössä). Krediitit ovat **ehdoton raja**: loppuneet krediitit hylkäävät koko lähetyksen (`insufficient_credits`, ja B1Adminissa näytetään ystävällinen päivityskehote). Osittaisia lähetyksiä ei tehdä, eikä ylimääräistä laskutusta veloiteta. Krediittejä myönnetään idempotentisti laskutusjaksoittain Stripen `invoice.paid`-webhookeista. Keskeytykset (`smsOptOuts`) suodatetaan ennen jokaista lähetystä.

Muut polut käyttävät samaa palveluntarjoajan liityntäpintaa ohittamatta `TextingController`-ohjainta: saapumishälytykset (`CheckinController` → `MessagingModuleGateway.sendBulkText`) ja työnkulun **Send Text** -vaihtoehto (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, joka kirjoittaa `sentTexts`- ja `deliveryLogs`-rivit ilman lähettäjää). Yhdistelykentät (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ratkaistaan vastaanottajakohtaisesti `MergeFieldHelper.resolve`-funktiolla, ja tulos rajataan 1 600 merkkiin. `TextingController`-ohjaimessa `{{`-merkkejä sisältävä ryhmäviesti lähetetään yhtenä `sendMessage`-kutsuna vastaanottajaa kohden yhden `sendBulk`-kutsun sijaan. Viesti ilman paikkamerkkejä lähetetään edelleen yhtenä massalähetyksenä.

## Tallennuksen kulku

Seurakunnan palveluntarjoajarivi (`content.storageProviders`, hallitaan B1Adminissa kohdassa Asetukset → Tiedostotallennus) valitsee, minne **uudet** lataukset menevät. `contentPath` on absoluuttinen tiedostokohtainen URL-osoite, joten eri palveluntarjoajat voivat olla rinnakkain ilman siirtoa. Vanhat tiedostot toimivat edelleen osoitteesta `content.churchapps.org`, uudet osoitteesta `content.ministrystuff.org`. Lataukset kulkevat seuraavasti: Api → `StorageResolver.forChurch` → palveluntarjoajan `store`/`getUploadUrl` (esiallekirjoitettu POST, jossa on `content-length-range` S3-tilassa; base64-varamenetelmä levy- ja kehitystilassa). Poistot reititetään tallennetun URL-osoitteen perusteella (`StorageResolver.forUrl`). Kiintiö on tilauspaketin tavumäärä, ja se lasketaan taulusta `storageObjects` (`stored` + `pending`-varaukset). Ylitetty kiintiö estää uudet lataukset (`storage_quota_exceeded`). Mitään ei koskaan poisteta eikä veloiteta ylimääräistä. ChurchAppsin ilmainen taso ei muutu: rajat ovat samat kuin ennen, eikä seurakuntakohtaista kokonaiskiintiötä ole.

Rajauksen huomautus: palveluntarjoajan valinta koskee sisällön **tiedostoja ja resursseja** (missä suuret mediatiedostot ovat). Galleria-, logo- ja valokuvalataukset pysyvät oletuspalveluntarjoajalla, koska ne listaavat avaimet tallennuksesta ja rakentavat URL-osoitteet asiakaspuolella. Seurakuntakohtaista juurta ei siksi vielä sovelleta niihin.

Sama liityntäpinta tukee myös [Omat tallennustilat (Bring-Your-Own Storage)](./byos-storage) -toimintoa: seurakunnat voivat yhdistää Google Driven, Dropboxin, OneDriven tai oman S3-yhteensopivan säilönsä MinistryStuff-tilauksen sijaan.

## Laskutus

Stripe Checkout (isännöity) tilaamiseen ja Stripe Customer Portal kortin päivitykseen, peruutukseen ja laskuihin. MinistryStuffWebissä ei ole korttilomakkeita. Yksi `subscriptions`-rivi per (seurakunta, tuote). Paketit ja tasot ovat koodissa (`MinistryStuffApi/src/helpers/Plans.ts`), ja Stripen hinta-tunnukset tulevat asetuksista. Webhook (`/billing/webhook`, raakarungon allekirjoitustarkistus, `webhookEvents`-päällekkäisyyden esto) ohjaa tilauksen elinkaarta: aktiivinen → past_due (armonaika) → peruutettu.

## Kehitysympäristön asetukset

Käynnistä MinistryStuffApi (`yarn dev`, 8097; tarvitaan `.env`-tiedosto, jossa on jaettu `JWT_SECRET` ja `MINISTRYSTUFF_SERVICE_KEY`), ja aseta sama palvelunavain tiedostoon `Api/.env`. `Api/config/dev.json` osoittaa jo `ministryStuffApi`-asetuksella kohteeseen `localhost:8097`. MinistryStuffWeb tarvitsee `.env`-tiedoston, jossa on `VITE_STAGE=dev`. Kehitysympäristö käyttää `smsMode: mock`-tilaa ja levytallennusta, joten AWS:ää ei tarvita.

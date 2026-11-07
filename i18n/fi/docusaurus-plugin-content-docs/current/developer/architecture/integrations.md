---
title: "Integraatio- ja laajennuspinta"
---

# Integraatio- ja laajennuspinta

<div class="article-intro">

Kaikki, mihin kolmannen osapuolen sovellus voi liittyä, kulkee yhden API:n ja yhden valtuutusmallin kautta. Tämä sivu on kartta: se nimeää jokaisen integraatiopinnan, näyttää, miten ne kytkeytyvät toisiinsa, ja linkittää kunkin yksityiskohtaiseen viitteeseen. Jos rakennat B1:tä vastaan, aloita tästä ja valitse oikea ovi. Seuraa sitten linkkiä sivulle, joka dokumentoi sen tarkemmin.

</div>

## Pinnat yhdellä silmäyksellä

Sisään- ja ulospääsyjä on kuusi, ja kaikki jakavat saman todennuskerroksen:

- **[REST API](../api/api-keys)** — koko tuotepinta, johon voi kutsua bearer-tokenilla mistä tahansa kielestä.
- **[API-avaimet](../api/api-keys)** — yksinkertaisin tunnistetieto: `cak_…`-token, joka on sidottu yhteen henkilöön yhdessä seurakunnassa.
- **[OAuth 2.0 & Yhdistetyt sovellukset](../api/connected-apps)** — seurakunnittainen suostumus monivuokralaissovelluksille. Se myöntää saman JWT:n, jonka käyttäjä saa.
- **[Webhookit](../api/webhooks)** — allekirjoitetut ja kestävästi toimitetut lähtevät tapahtumat.
- **[MCP-palvelin](../api/mcp)** — tekoälylle suunnattu kääre REST API:n päällä polussa `/mcp`.
- **[Sisältöpalveluntarjoajat](../freeplay-content-provider)** — sisääntulevan sisällön polku ulkoisilta mediakirjastoilta FreePlayhin ja B1-sovelluksiin.

Kaikkea paitsi sisältöpalveluntarjoajia palvelee yksi monoliittinen API ([Api](https://github.com/ChurchApps/Api)-repositorio). Sen moduulit liitetään vakaisiin perusreitteihin: `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` ja `/mcp`.

## Miten osat kytkeytyvät

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

Kolme nuolta kertovat koko tarinan: kolmas osapuoli **kutsuu sisään** bearer-tokenilla (API-avain tai OAuth JWT, myös `/mcp`:n kautta). API **kutsuu ulos** allekirjoitettujen webhookien kautta. Sisältöpalveluntarjoajat ovat ainoa **sisääntulevan sisällön** polku, jossa B1 itse on OAuth-asiakas ja hakee mediaa ulkoisesta lähteestä.

## Jaettu todennusmalli

Jokainen tunnistetieto (käyttäjän kirjautumis-JWT, OAuth-käyttötoken tai API-avain) ratkeaa samaksi `Principal`-olioksi ja tarkistetaan samalla tavalla. Erillistä "integraatiotodennuksen" polkua ei ole. Rajattu tunnistetieto on käytännössä sama kuin vähemmän oikeuksia omaava käyttäjä.

### JWT-rakenne

B1:n käyttötokenit ovat HS256-JWT:itä, jotka luodaan tiedostossa `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Claim-joukko:

| Claim | Merkitys |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Tokenin takana oleva henkilö |
| `churchId` | Yksi seurakunta, jonka puolesta token toimii. Tämä on kaiken datan rajauksen ankkuri. |
| `personId` | Henkilötietue kyseisessä seurakunnassa |
| `permissions` | Tasainen taulukko RBAC-oikeusmerkkijonoja (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Ryhmäjäsenyys ja -johtajuus ryhmäkohtaisia tarkistuksia varten |
| `membershipStatus` | Vierailija vai jäsen, itsepalvelun rajaamiseen |

OAuth-käyttötoken on bitti bitiltä samanmuotoinen kuin kirjautumis-JWT. Ainoa ero on, että sen `permissions`-taulukko on suodatettu myönnettyjen laajuuksien (scopes) kautta ennen allekirjoitusta (`getCombinedApiJwt(...)`).

### Seurakuntakohtainen rajaus

`churchId` on tokenin claim, ei pyyntöparametri. Tunnistetieto ei siis voi ulottua seurakuntien yli. Jokainen tietokantakysely suodattaa kutsujan `churchId`:n mukaan. API-avain tai OAuth-token on sidottu täsmälleen yhteen seurakuntaan luontihetkellä.

### Roolipohjaiset oikeudet rajapinnassa

Kontrollerit rajaavat toimintoja kutsulla `au.checkAccess(contentType, action)` tokenin `permissions`-taulukkoa vastaan. Laajuudet ovat **suodatin, eivät myöntö** (`Api/src/shared/auth/Scopes.ts`). `SCOPE_CATALOG` yhdistää jokaisen laajuuden (esim. `people:read`, `donations:write`) RBAC-pareihin, jotka se sallii. `filterPermissionsByScopes()` leikkaa tämän henkilön *nykyisillä* oikeuksilla joka kerta, kun token ratkaistaan. Seuraukset:

- Oikeuden peruminen B1Adminissa katkaisee tunnistetiedon käyttöoikeuden seuraavassa pyynnössä. Tokenit eivät koskaan poikkea roolista.
- Laajuus voi vain *poistaa* oikeuksia. Rajattu tunnistetieto ei siis voi kohota palvelin- tai alueylläpitäjän oikeuksiin, sillä ne oikeudet on tarkoituksella jätetty ilman laajuusvastaavuutta.
- API-avaimissa on `cak_`-etuliite. `CustomAuthProvider.getUser()` tunnistaa etuliitteen, tiivistää salaisuuden ja ratkaisee omistajahenkilön elävän RBAC-tilan joka kutsulla.

Täydellinen laajuuskatalogi on kohdassa [API-avaimet → Scopes](../api/api-keys#scopes).

## Pintaviite

### REST API

Täydellinen tuotepinta. Mikä tahansa todennettu päätepiste hyväksyy joko JWT:n tai `cak_…`-API-avaimen `Authorization: Bearer` -otsakkeessa. Erillistä pelkästään avaimille tai pelkästään OAuthille varattua reittitaulukkoa ei ole. Moduulit ja niiden perusreitit ovat hakemistossa `Api/src/modules/*`.

### API-avaimet

`cak_<prefix>.<secret>`-henkilökohtainen käyttöoikeustunnus, joka luodaan kohdassa **B1Admin → Settings → Developer → API Keys**. Tallennetaan vain SHA-256-tiiviste, ja raaka avain näytetään kerran. Hallinta osoitteessa `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Sopii parhaiten yhden seurakunnan omiin skripteihin ja liittimiin, kuten Zapier, Make ja Google Sheets. → **[API-avaimet](../api/api-keys)**

### OAuth 2.0 & Yhdistetyt sovellukset

Monivuokralaissovelluksiin, joissa jokaisen seurakunnan on annettava suostumus. Toteutus on tiedostossa `Api/src/modules/membership/controllers/OAuthController.ts` polun `/membership/oauth` alla. Palvelin tukee kolmea myöntötyyppiä:

- **Authorization Code**: `POST /oauth/authorize` (todennettu) palauttaa lyhytikäisen koodin. `POST /oauth/token` jossa `grant_type=authorization_code` vaihtaa sen käyttö-JWT:hen (noin 7 päivää) ja päivitystokeniin (noin 90 päivää). Julkisten (salaisuudettomien) asiakkaiden on käytettävä PKCE:tä (vain `S256`): `code_challenge` valtuutuksessa ja vastaava `code_verifier` tokenin vaihdossa.
- **Device Code** (RFC 8628): `POST /oauth/device/authorize` antaa `user_code`-koodin. Käyttäjä hyväksyy sen B1Adminissa (`/oauth/device/approve`). Laite kysyy tokenia `/oauth/token`-päätteestä laitekoodi-myöntötyypillä. Tarkoitettu TV:ille, kioskeille ja CLI-työkaluille, joissa ei ole selainta.
- **Refresh Token**: `grant_type=refresh_token` luo uuden käyttötokenin. Julkiset (salaisuudettomat) asiakkaat voivat jättää salaisuuden pois.

Julkiset asiakkaat voivat myös rekisteröityä itse kutsulla `POST /oauth/register` (RFC 7591 dynaaminen asiakasrekisteröinti). Ne saavat `client_id`:n ilman salaisuutta, ja niiden uudelleenohjaus-URI:n on oltava `https` tai loopback-osoite.

**Yhdistetty sovellus** on seurakunnan ylläpitäjän näkymä myönnettyyn tokeniin. Sen voi listata ja peruuttaa osoitteessa `/membership/oauth/connections`. Kontrolleri isännöi myös OAuthin **relay-istuntosiltaa** (`/oauth/relay/*`), jonka avulla selaimeton laite voi kirjautua *ulkoisen* palveluntarjoajan kautta. → **[Yhdistetyt sovellukset ja OAuth](../api/connected-apps)**

### Webhookit

Ainoa lähtevä pinta. Seurakunta tilaa julkisen HTTPS-päätepisteen tapahtumiin. Kun vastaava muutos tapahtuu, `WebhookDispatcher.emit(churchId, event, payload)` rikastaa pelkät tunnukset sisältävät hyötykuormat näyttönimillä (`personName`, `groupName`, `formName`). Haut tehdään vain, kun tilaus täsmää. Järjestelmä kirjaa toimituksen, ja taustatyö lähettää allekirjoitetun JSON-kuoren uudelleenyrityksillä ja viiveellä. Moottori on hakemistossa `Api/src/shared/webhooks/`, ja seurakuntakohtainen CRUD on polun `/membership/webhooks` alla (`WebhookController.ts`). Kenttä `connectorType` muokkaa rungon Slackille ja Discordille sopivaksi. `mailchimp`-liitin menee pidemmälle ja hoitaa koko HTTP-vaihdon itse: menetelmän, URL-osoitteen ja todennuksen tapahtumakohtaisesti Mailchimpin API:a vastaan. Tunnistetiedot on salattu sarakkeeseen `webhooks.connectorConfig`. → **[Webhookit](../api/webhooks)**

### MCP-palvelin

Tekoälylle suunnattu kääre polussa `/mcp` (`Api/src/modules/mcp/`). Kolme yleistä työkalua, `list_endpoints`, `describe_endpoint` ja `api_call`, paljastavat koko REST-pinnan dynaamisesti mille tahansa MCP-asiakkaalle. Todennus on sama bearer-token kuin muualla. Asiakkaille, jotka kirjautuvat OAuthilla (claude.ai:n mukautetut liittimet), `/mcp` palauttaa 401-vastauksen mukana otsakkeen `WWW-Authenticate`, joka osoittaa polkuun `/.well-known/oauth-protected-resource`. Polku `/.well-known/oauth-authorization-server` kertoo `/membership/oauth`-päätepisteet, dynaamisen rekisteröinnin, PKCE:n ja B1Adminin `/oauth`-suostumussivun (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` palaa Express-pinoon prosessin sisällä, joten jokainen oikeus- ja seurakuntarajaussääntö pätee edelleen. → **[MCP-palvelin](../api/mcp)**

### Sisältöpalveluntarjoajat

Sisääntulevan sisällön polku erillisessä paketissa `Packages/content-providers` (`@churchapps/content-providers`), ei API:ssa. Jokainen palveluntarjoaja toteuttaa `IProvider`-rajapinnan (`src/interfaces.ts`): `browse`, `getPlaylist`, `getInstructions` ja todennuskoukut. Se rekisteröityy itse `Map`-rekisteriin (`src/providers/registry.ts`). Tässä **B1 on OAuth-asiakas**. Palveluntarjoaja ilmoittaa `AuthType`-tyypin: `none`, `oauth_pkce`, `device_flow` tai `form_login`. Jaetut apuohjelmat (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) suorittavat asiakaspuolen PKCE- tai laitevirran ulkoista lähdettä vastaan. Yhdeksän palveluntarjoajaa on tällä hetkellä käytössä, mukaan lukien Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church ja B1.church. Ne syöttävät FreePlayta ja B1-sovelluksia. → **[FreePlay-sisältöpalveluntarjoaja](../freeplay-content-provider)**

**Vuosisuunnitelmat** kulkevat tätä polkua. Opetussuunnitelman julkaisija (jolla on `lessons.edit`) ylläpitää järjestettyjä viikko 1/2/3 -sarjoja Lessons.church-hallinnassa. Ne ovat `LessonsApi`-taulukoissa `yearPlans` ja `yearPlanWeeks`, ja niissä voi olla valinnainen `startMonth` sekä viikkokohtainen `anchor`-arvo `easter` tai `christmas`. `GET /yearPlans/public` LessonsApi:ssa palvelee aktiiviset suunnitelmat anonyymisti ja täydentää kunkin viikon ohjelman, tutkimuksen ja paikan oppituntipuusta. B1Adminin **Serving → Plans → Schedule Lesson → Apply Year Plan** käyttää tätä päätepistettä ja kirjoittaa yhden DoingApi-suunnitelman jokaiselle mukana olevalle viikolle (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Suunnitelmat, joilla on `startMonth`, ratkaisevat ankkuroidut viikot valitun vuoden mukaan (pääsiäinen Gregoriuksen laskentatavalla, joulu sunnuntaina joulukuun 25. päivää edeltävältä ajalta tai sitä ennen) ja täyttävät niiden väliset jaksot. Suunnitelmat ilman `startMonth`-arvoa kuvaavat edelleen viikon N päivämääräksi `startDate + (N−1)×7` päivää. Ulkoisten OLF-palveluntarjoajien viikot tai viikot, joiden polku on vajaa, ohitetaan sovellettaessa. Seurakunnat muokkaavat syntyneitä suunnitelmia kuten mitä tahansa muuta, ja FreePlay toistaa sen, mikä suunnitelmassa on.

## Yhteenveto

| Pinta | Todennusmekanismi | Suunta | Toteutuspaikka | Viite |
|---|---|---|---|---|
| REST API | `Bearer` JWT tai `cak_…`-avain | Sisääntulo | `Api/src/modules/*` | [API-avaimet](../api/api-keys) |
| API-avaimet | SHA-256-tiivistetty `cak_`-token | Tunnistetieto | `Api/.../membership/controllers/ApiKeyController.ts` | [API-avaimet](../api/api-keys) |
| OAuth 2.0 / Yhdistetyt sovellukset | Auth code (PKCE) · device · refresh → JWT; dynaaminen asiakasrekisteröinti | Sisääntulo | `Api/.../membership/controllers/OAuthController.ts` | [Yhdistetyt sovellukset](../api/connected-apps) |
| Webhookit | Hookkohtainen salaisuus, HMAC-SHA256-allekirjoitus | Ulosmeno | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhookit](../api/webhooks) |
| MCP-palvelin | `Bearer` JWT, OAuth JWT (löydetään polun `/.well-known` kautta) tai `cak_…`-avain | Sisääntulo (tekoäly) | `Api/src/modules/mcp/` | [MCP-palvelin](../api/mcp) |
| Sisältöpalveluntarjoajat | Palveluntarjoajakohtainen: ei mitään / OAuth PKCE / laite / lomake | Sisääntuleva sisältö | `Packages/content-providers/` | [Sisältöpalveluntarjoaja](../freeplay-content-provider) |

## Valmiit liittimet

Sen sijaan, että kaikki rakentaisivat alusta asti, ChurchApps toimittaa yllä olevien pintojen päälle valmiita liittimiä:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)**: webhookin `connectorType` muokkaa tavallisen kuoren chat-viestiksi. Määritys tehdään kokonaan B1Adminissa, ilman kolmannen osapuolen tiliä.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)**: `mailchimp`-connectorType, joka synkronoi ihmiset Mailchimp-yleisöön ja kuvaa ryhmä- ja listajäsenyydet tageiksi (`Api/src/shared/webhooks/MailchimpConnector.ts`). Toisin kuin chat-liittimet, se lähettää omat todennetut pyyntönsä jokaiselle tapahtumalle (upsert, arkistointi, tagit) sen sijaan, että se lähettäisi POST-pyynnön seurakunnan antamaan URL-osoitteeseen. API-avain ja yleisön tunnus ovat salattuina sarakkeessa `webhooks.connectorConfig`. Synkronointi on yksisuuntainen ja käyttää vain vakiokenttiä.
- **[Zapier](/docs/b1-admin/integrations/zapier)** ja **[Make](/docs/b1-admin/integrations/make)**: käynnistyvät webhook-tapahtumista ja toimivat REST API:n kautta. Ne rekisteröivät oman webhookinsa, kun Zap tai skenaario käynnistyy (tarvitaan avain, jolla on `settings:write`). Zapier-sovelluksen lähdekoodi on `Integrations`-repositoriossa hakemistossa `zapier/` (Zapier CLI, julkaisu komennolla `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)**: API-avaimella todennettu lisäosa, joka vie People-, Donations-, Groups- ja Attendance-tiedot pyynnöstä.
- **[Claude](/docs/b1-admin/integrations/claude)** ja **[ChatGPT](/docs/b1-admin/integrations/chatgpt)**: MCP-asiakkaat, jotka osoittavat polkuun `/mcp`.

Omaa koodia varten **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) kääri kaiken tämän: tyypitetyn REST-asiakkaan, OAuth-asiakkaan (auth-code, päivitys ja laitevirta) sekä HMAC-webhook-varmentajan Express-välikerroksineen.

## Liittyvät sivut

- [API-avaimet](../api/api-keys): yksinkertaisin tunnistetieto ja laajuuskatalogi
- [Yhdistetyt sovellukset ja OAuth](../api/connected-apps): monivuokralaisten suostumusvirrat
- [Webhookit](../api/webhooks): lähtevä tapahtumajärjestelmä
- [MCP-palvelin](../api/mcp): tekoälyintegraation kääre
- [FreePlay-sisältöpalveluntarjoaja](../freeplay-content-provider): sisääntulevan sisällön lähteeksi ryhtyminen
- [Integraatiot (loppukäyttäjä)](/docs/b1-admin/integrations/): valmiiden liittimien asennusoppaat

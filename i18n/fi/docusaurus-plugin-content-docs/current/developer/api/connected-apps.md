---
title: "Yhdistetyt sovellukset ja OAuth"
---

# Yhdistetyt sovellukset ja OAuth

<div class="article-intro">

B1 API tukee OAuth 2.0 -protokollaa, joten kolmannen osapuolen sovellus voi pyytää kunkin seurakunnan ylläpitäjältä luvan käyttää heidän tietojaan ilman, että seurakunta koskaan jakaa salasanaa tai API-avainta. **Yhdistetty sovellus** on OAuth-tunniste, jonka seurakunnan ylläpitäjä on hyväksynyt. Sen peruuttaminen katkaisee kolmannen osapuolen sovelluksen käyttöoikeuden yhdellä napsautuksella. Käytä tätä polkua monivuokralaisille SaaS-liittimille. Yhden seurakunnan integraatioon suosi [API-avaimia](./api-keys).

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- OAuth-**asiakas** on rekisteröitävä ennen kuin seurakunnat voivat myöntää sille pääsyn. Rekisteröijä on joko B1-palvelimen ylläpitäjä tai asiakas itse [dynaamisen rekisteröinnin](#dynamic-client-registration) kautta.
- Kaikki OAuth-päätepisteet sijaitsevat Membership-moduulin alla: `/membership/oauth/...`
- Käyttötunnukset ovat JWT-tunnuksia. Ne sisältävät käyttäjän oikeudet suodatettuina myönnettyjen laajuuksien (scope) mukaan.

</div>

## Käsitteet

| Termi | Merkitys |
|---|---|
| **OAuth-asiakas** | Itse kolmannen osapuolen sovellus. Sitä tunnistetaan `client_id`:llä ja suojataan `client_secret`:llä. Se rekisteröidään B1:een kerran, ja se on yhteinen kaikille seurakunnille, jotka sen asentavat. |
| **Yhdistetty sovellus** | Tietty `(asiakas, seurakunnan ylläpitäjä)`-pari, jossa ylläpitäjä on myöntänyt asiakkaalle pääsyn. Jokaista yhdistettyä sovellusta tukee OAuth-päivitystunniste. |
| **Käyttötunniste** | Lyhytikäinen JWT (noin 7 päivää), jota asiakas käyttää API-kutsuissa. Muoto on sama kuin käyttäjän JWT: `Authorization: Bearer <jwt>`. |
| **Päivitystunniste** | Pitkäikäinen läpinäkymätön merkkijono (noin 90 päivää), jolla asiakas luo uusia käyttötunnisteita. |
| **Laajuus (scope)** | Rajaa sitä, mitä käyttötunniste voi tehdä. Katso [laajuusluettelo](./api-keys#scopes). |

## Myöntövirrat

B1 tukee kolmea OAuth-virtaa. Kaikki ne on määritelty standardeissa RFC 6749 ja RFC 8628.

### Authorization Code (web-sovellukset)

Käytä tätä, kun sovelluksessasi on palvelinpuoli ja se voi pitää `client_secret`-avaimen salassa.

1. **Valtuuta**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Julkisten asiakkaiden (joilla ei ole `client_secret`-avainta) on lisäksi lähetettävä `"code_challenge": "..."` ja `"code_challenge_method": "S256"` (PKCE, RFC 7636). Vain `S256` hyväksytään.

   Palauttaa `{ "code": "...", "state": "xyz" }`. Valtuutuskoodin päätepiste on tarkoituksella todennettu POST-pyyntö. Sovelluksesi kerää käyttäjän B1-JWT:n, yleensä isännöimällä painiketta käyttäjän B1-istunnossa, ja välittää sen suostumusvaiheessa.

2. **Vaihda koodi tunnisteiksi**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Jos valtuutusvaihe lähetti `code_challenge`-arvon, lisää vastaava `"code_verifier": "..."`. Julkinen asiakas lähettää verifierin ja jättää `client_secret`-avaimen pois. Tunnistepäätepiste hyväksyy pyyntörungot JSON-muodossa tai lomakekoodattuina (`application/x-www-form-urlencoded`).

   Palauttaa tunnistevastauksen:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Päivitä**, kun käyttötunniste on vanhenemassa:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Päivitystunniste vanhenee, jos sitä ei ole käytetty 90 päivään. Jos se on vanhentunut, seurakunnan ylläpitäjän on valtuutettava sovellus uudelleen.

### Device Code (TV:t, kioskit, CLI)

Käytä tätä, kun laitteessa ei ole selainta. Määritelty RFC 8628:ssa.

1. **Pyydä laitekoodi**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Palauttaa käyttäjälle näytettävän koodin ja kyselyvälin:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Näytä `user_code` ja `verification_uri` käyttäjälle.

3. **Kysele** päätepisteestä `/membership/oauth/token` käyttäen `grant_type=urn:ietf:params:oauth:grant-type:device_code`-arvoa ja `device_code`-arvoa. Tavalliset vastaukset:

   | Virhe | Merkitys |
   |---|---|
   | `authorization_pending` | Käyttäjä ei ole vielä hyväksynyt. Jatka kyselyä ehdotetulla välillä. |
   | `expired_token` | Laitekoodi on ylittänyt `expires_in`-ajan. Aloita alusta. |
   | `access_denied` | Käyttäjä hylkäsi pyynnön. |
   | _(ei virhettä, 200 OK)_ | Hyväksytty. Runko on `B1TokenResponse`. |

4. Kun hyväksyntä on tehty, tallenna `refresh_token` ja käytä `access_token`-tunnistetta, kunnes se vanhenee.

B1 SDK sisältää metodin `B1OAuthClient.awaitDeviceToken(...)`, joka suorittaa kyselysilmukan puolestasi RFC-yhteensopivalla takaisinvetäytymisellä.

### Päivitystunniste

Tätä voi käyttää aina itsenäisenä pyyntönä, kun sinulla on `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Vastauksena tulee uusi `access_token` ja `refresh_token`. **Julkiset asiakkaat** (joilla ei ole `client_secret`-avainta) voivat jättää `client_secret`-avaimen pois päivityksestä. Tämä on hyödyllistä mobiili- ja työpöytäsovelluksille, jotka eivät voi pitää salaisuutta.

Päivitystunnisteet kiertävät, mutta vanhaa tunnistetta ei hylätä heti. Jos asiakas ei koskaan saa päivitysvastausta, esimerkiksi TV, joka menetti virran tai Wi-Fi-yhteyden pyynnön aikana, se voi yrittää uudelleen edellisellä `refresh_token`-tunnisteella enintään **7 päivän** ajan. Yritys onnistuu vain, jos korvaavaa tunnistetta ei ole vielä käytetty. Tällöin käyttämätön korvaava tunniste hylätään ja myönnetään uusi pari. Kun korvaava tunniste on itse päivitetty, vanha tunniste palauttaa virheen `invalid_grant`. Yhteyden peruuttaminen peruuttaa myös kaikki kierrätetyt tunnisteet, jotka ovat vielä tässä armonajassa. Yhdistettyjen sovellusten luettelossa kukin yhteys näkyy kerran.

## Tunnisteen rakenne

Käyttötunniste on B1:n myöntämä JWT, joka on identtinen sen kanssa, jonka käyttäjä saisi kutsumalla `POST /membership/users/login`-päätepistettä. Sillä on sama moduulikohtainen käyttöoikeusväite ja sama `checkAccess`-toiminta jokaisessa kontrollerissa. **Ainoa ero** on, että oikeustaulukko on suodatettu myönnettyjen laajuuksien mukaan tunnisteen luontihetkellä. Laajuuksilla rajattu käyttötunniste ei voi tehdä mitään, mitä vastaavasti rajattu API-avain ei voisi tehdä. Missään kontrollerissa ei myöskään ole erillistä "OAuth-polkua": `actionWrapper` ei tiedä, onko kantaja henkilö, API-avain vai OAuth-asiakas.

## Yhdistetyt sovellukset (käyttäjän näkymä)

Seurakunnan ylläpitäjän näkökulmasta "Yhdistetyt sovellukset" on luettelo sovelluksista, joille on myönnetty pääsy seurakuntaan. Jokainen rivi on aktiivinen `(OAuthClient, OAuthToken)`-pari.

B1Adminissa **Settings → Developer → Connected Apps** näyttää:

- Asiakkaan nimen
- Laajuudet, jotka ylläpitäjä hyväksyi
- Päivämäärän, jolloin pääsy myönnettiin
- **Revoke**-painikkeen

| Menetelmä ja polku | Todennus | Tarkoitus |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Listaa kutsujan omat aktiiviset yhteydet (yhdistettynä asiakkaan nimeen ja laajuuksiin) |
| `DELETE /membership/oauth/connections/:id` | JWT | Peruuta yhteys OAuth-tunnisteen id:llä. Tunniste lakkaa toimimasta seuraavassa pyynnössä. |

Luettelo jättää automaattisesti pois vanhentuneet tunnisteet.

## Laajuudet ja suostumus

Laajuusmerkkijonot ovat samaa luetteloa kuin [API-avaimet](./api-keys#scopes). Asiakkaiden parhaat käytännöt:

- **Pyydä kapeimmat toimivat laajuudet.** Seurakunnat huomaavat, jos pyydät `donations:write`-oikeutta, vaikka tarvitset vain ihmisten tietojen lukemista.
- **Käytä päivitystunnistetta ja lyhytikäisiä käyttötunnisteita.** Pitkäikäisiä käyttötunnisteita on vaikeampi peruuttaa nopeasti.
- **Näytä aina myönnetyt laajuudet käyttäjälle omassa käyttöliittymässäsi,** jotta he voivat tarkistaa, mihin ovat suostuneet.

## OAuth-asiakkaiden hallinta

OAuth-asiakkaat eli kolmannen osapuolen sovellukset rekisteröidään globaalisti. B1-palvelimen ylläpitäjä luo luottamuksellisen asiakkaan, jolla on `client_secret`. Jos haluat toimittaa sellaisen, ota yhteyttä ChurchApps-tiimiin saadaksesi `client_id`- ja `client_secret`-parin, ja rekisteröi uudelleenohjaus-URI:si. Julkiset asiakkaat, kuten MCP-liittimet, voivat rekisteröityä itse (alla).

Rekisteröityjen uudelleenohjaus-URI:iden on vastattava pyynnön `redirect_uri`-arvoa täsmälleen. Etuliite- tai osittainen vastaavuus hylätään.

| Menetelmä ja polku | Oikeus | Kuvaus |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Listaa kaikki OAuth-asiakkaat |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Hae asiakas julkisella tunnuksella (salaisuus peitetty) |
| `POST /membership/oauth/clients` | Server.Admin | Luo tai päivitä asiakas |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Poista asiakas |

### Dynaaminen asiakasrekisteröinti

`POST /membership/oauth/register` (julkinen, RFC 7591) antaa asiakkaan, kuten claude.ai:n MCP-liittimen, rekisteröityä itse. API:n dokumentti `/.well-known/oauth-authorization-server` mainostaa tätä päätepistettä. Katso [MCP-palvelin → OAuth-löytäminen](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Palauttaa vastauksen 201, jossa on `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) ja `token_endpoint_auth_method: "none"`.

- Salaisuutta ei koskaan myönnetä, joten asiakkaan on käytettävä PKCE:tä jokaisessa valtuutuksessa.
- `redirect_uris` on oltava 1–10 `https`-URL-osoitetta tai `http`-osoite, jos isäntänä on `localhost`, `127.0.0.1` tai `[::1]`.
- `client_name` lyhennetään 45 merkkiin (oletusarvo on "AI assistant").
- Rekisteröintejä on rajoitettu 20 tunnissa IP-osoitetta kohden.

B1Adminin suostumussivulla itse rekisteröityneestä asiakkaasta näytetään ilmoitus. Ilmoituksessa kerrotaan, että asiakas on rekisteröitynyt itse ja ettei se voi koskaan tehdä enempää kuin käyttäjän oma B1-tili. Lisäksi siinä kerrotaan, että yhteyden voi katkaista kohdassa **Settings → Developer → Connected Apps**.

## SDK-tuki

Paketti `@churchapps/integration-sdk` kääri jokaisen OAuth-virran tyypitettyihin apufunktioihin: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` ja `.awaitDeviceToken()`. Katso paketin README sekä [Webhooks](./webhooks#sdk-support) päästä päähän -esimerkkiin.

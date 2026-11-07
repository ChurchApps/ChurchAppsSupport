---
title: "MCP-palvelin"
description: "Ota MCP-yhteys B1-API:in käyttöön, jotta tekoälyasiakkaat, kuten Claude Code, Cursor tai Claude Desktop, voivat kutsua seurakunnan tietopäätepisteitä API-avaimilla tai OAuth-kirjautumisella."
---

# MCP-palvelin

<div class="article-intro">

B1 API tarjoaa MCP-palvelimen (Model Context Protocol) osoitteessa `/mcp`. [MCP](https://modelcontextprotocol.io) on protokolla, jonka tuntevat tekoälyasiakkaat. Mikä tahansa niistä, kuten claude.ai:n mukautetut liittimet, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor tai oma sovelluksesi, voi muodostaa yhteyden palvelimeen ja kutsua taustalla olevaa REST-rajapintaa todennetun seurakuntakäyttäjän puolesta. Kyseessä on kevyt, yleiskäyttöinen kääre: kolme yleistä työkalua paljastavat koko rajapintapinnan dynaamisesti sen sijaan, että jokainen päätepiste mallinnettaisiin erikseen. Lisäksi on yksi verkkosivustojen rakentajan toimialakohtainen opastyökalu.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- [B1 API -avain](./api-keys.md) (`cak_…`) asianmukaisilla oikeuksilla (scopes) tai MCP-asiakas, joka voi kirjautua OAuthilla (katso [OAuth-löytäminen](#oauth-discovery))
- Tavoitettavissa oleva B1 API -isäntä: `https://api.churchapps.org` isännöidyille seurakunnille tai oma käyttöönottosi
- MCP-asiakas. Katso loppukäyttäjän asetukset: [Claude](/docs/b1-admin/integrations/claude) ja [ChatGPT](/docs/b1-admin/integrations/chatgpt)

</div>

## Päätepiste

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Ominaisuus | Arvo |
|---|---|
| **Polku** | `/mcp` (suhteessa API-isäntään) |
| **Metodi** | Vain `POST`. Pyyntö-vastaus- ja SSE-suoratoisto tapahtuvat samassa päätepisteessä |
| **Kuljetus** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Istuntomalli** | Tilaton (stateless). Jokaista pyyntöä varten rakennetaan uusi MCP-palvelininstanssi. Istuntotunnusta tai jatkamista ei ole |
| **Todennus** | Bearer-tunnus. `cak_…`-API-avaimet ja B1 JWT:t (mukaan lukien OAuth-käyttötunnukset) toimivat kaikki. Tunnistus on sama kuin muissa todennetuissa päätepisteissä |

Pyyntö, jonka `Authorization`-otsikko puuttuu tai on virheellinen, palauttaa:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

HTTP-tilakoodilla 401 ja otsikolla `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. OAuthia tukevat asiakkaat seuraavat tätä otsikkoa ja aloittavat kirjautumisen.

Isännöidyssä API:ssa (tuotanto ja demo) `/mcp` palvellaan API Gateway HTTP API -rajapinnan kautta eikä REST-rajapinnan kautta, jota muut päätepisteet käyttävät. REST-rajapinta nimeää Lambda-välityspalvelinvastauksissa `WWW-Authenticate`-otsikon uudelleen muotoon `x-amzn-remapped-www-authenticate`. Tämän vuoksi asiakkaat, kuten ChatGPT, saivat pelkän 401-vastauksen ilman keinoa aloittaa kirjautumista. HTTP API välittää otsikon muuttumattomana.

## Työkalut

Kolme yleistä työkalua ja yksi opas. Malli käyttää `list_endpoints`-työkalua löytämiseen, `describe_endpoint`-työkalua pyynnön rakenteen selvittämiseen, `api_call`-työkalua varsinaiseen rajapintakutsuun ja `describe_page_builder`-työkalua, kun tehtävä liittyy verkkosivuston sisältöön.

### `list_endpoints`

Palauttaa kaikkien rekisteröityjen REST-reittien täydellisen luettelon. Tulosta voi suodattaa valinnaisella osamerkkijonolla ja/tai HTTP-metodilla. Jokaisessa merkinnässä on ohjaimen nimi ja API-avainten oikeudet (scopes), jotka todennäköisimmin tarvitaan.

**Syöte:**

| Kenttä | Tyyppi | Kuvaus |
|---|---|---|
| `filter` | merkkijono (valinnainen) | Polusta etsittävä osamerkkijono, kirjainkoko ei ratkaise, esimerkiksi `"people"` |
| `method` | enum (valinnainen) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Tuloste:** JSON-asiakirja tässä muodossa:

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

Luettelo rakennetaan kerran API:n käynnistyessä elävästä reittitaulukosta. Kaikki, mihin voit osua `curl`-komennolla, näkyy tässä.

### `describe_endpoint`

Palauttaa lyhyen yhteenvedon ja, jos saatavilla, käsin laaditun pyyntörungon ja vastausesimerkin yhdelle päätepisteelle.

**Syöte:**

| Kenttä | Tyyppi | Kuvaus |
|---|---|---|
| `method` | merkkijono | HTTP-metodi |
| `path` | merkkijono | Täysi polku sellaisena kuin `list_endpoints` sen palauttaa |

**Tuloste:** Kuratoiduille päätepisteille esimerkki, jossa on `summary`, `requestBody` ja `responseSample`. Kuratoimattomille päätepisteille varaviesti, joka ohjaa mallia kutsumaan ensin `GET`-pyyntöä rakenteen selvittämiseksi. Noin tusina suuren liikenteen reittiä (henkilöt, ryhmät, lahjoitukset, läsnäolo, rahastot) on kuratoitu.

### `api_call`

Kutsuu valittua REST-päätepistettä prosessin sisällä, saman Express-välikerrosten pinon kautta kuin tavallinen HTTP-pyyntö. Todennus, rungon jäsennys, auditointiloki ja seurakuntakohtainen rajaus ovat kaikki voimassa.

**Syöte:**

| Kenttä | Tyyppi | Kuvaus |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | merkkijono | Polku, mukaan lukien mahdollinen moduulietuliite, esimerkiksi `/membership/people` |
| `query` | objekti (valinnainen) | Tasainen objekti kyselyparametreille |
| `body` | mikä tahansa (valinnainen) | JSON-pyyntörunko, yleensä `POST`-pyynnössä mallioliotaulukko |

**Tuloste:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Tuloksen `isError` on `true`, jos vastauksen tila on vähintään 400.

### `describe_page_builder`

Ainoa ei-yleinen työkalu: staattinen, itsenäinen opas verkkosivujen rakentamiseen `/content/*`-päätepisteiden kautta. Siinä kuvataan Page → Section → Element -tietomalli, luontityönkulku, jokainen `elementType` ja sen `answersJSON`-rakenne sekä osiokohtaiset asetukset, kuten `dividerTop`- ja `dividerBottom`-muotojakajat. Mukana on myös täydellinen esimerkki alusta loppuun. Työkalu ei vaadi syötettä, ja se peilaa B1Admin-editorin elementtiluetteloa (katso [Verkkosivustojen rakentajan arkkitehtuuri](../architecture/website-builder.md)). Agenttien odotetaan kutsuvan sitä kerran ennen sivusisällön luomista tai muokkaamista ja toimivan sen jälkeen `api_call`-työkalulla.

## Todennusmalli

MCP-pyyntö kulkee itsessään `CustomAuthProvider.getUser()`-metodin kautta. Sama polku on käytössä jokaisessa todennetussa B1-päätepisteessä. `cak_…`-tunnus tunnistetaan `Principal`-oliona, jonka oikeudet ovat antajan henkilön nykyiset RBAC-oikeudet **leikattuna** avaimelle myönnetyillä oikeuksilla. Leikkaus lasketaan uudelleen jokaisessa pyynnössä, joten:

- Kun oikeus poistetaan avaimelta (poistamalla avain ja luomalla se uudelleen), pääsy katkeaa seuraavassa kutsussa.
- Kun oikeus poistetaan taustalla olevalta henkilöltä B1Adminissa, pääsy katkeaa seuraavassa kutsussa, vaikka avain olisi yhä olemassa.

Sisäkkäisissä `api_call`-kutsuissa alkuperäinen `Authorization`-otsikko kopioidaan synteettiseen pyyntöön. Näin `CustomAuthProvider` ajetaan uudelleen ja oikeuksien leikkaus sovelletaan uudelleen jokaisessa kutsussa. Tunnuksia ei välimuistiteta.

## Polkujen estolista

Pieni joukko reittejä ei ole saavutettavissa `api_call`-työkalulla, vaikka avain olisi kelvollinen:

| Malli | Syy |
|---|---|
| `/giving/donate/webhook/*` | Palveluntarjoajien webhook-päätepisteet odottavat Stripen tai PayPalin raakoja, allekirjoitettuja runkoja. Ne eivät ole tarkoitettu yleisille kutsujille |
| `/membership/oauth/clients*` | OAuth-asiakkaiden rekisteröinti on vain ylläpitäjän käytössä |
| `/membership/people/apiEmails` | Vaatii ylläpitäjän `jwtSecret`-avaimen, ei käyttäjäoikeuksia |
| Mikä tahansa reitti, joka odottaa `multipart/form-data`-muotoa | Tiedostolataukset eivät sovi JSON-RPC-kutsuihin |

Estetty polku palauttaa `isError: true` -työkalutuloksen kuvaavalla viestillä. Taustalla olevaa reittiä ei koskaan kutsuta.

## Vastauskoon raja

Jokaisen `api_call`-vastauksen runko rajataan **64 KB:iin** tallennettua tulostetta. Jos kysely ylittää rajan, vastauksessa on `"truncated": true`, ja mallin odotetaan yrittävän uudelleen kapeammilla kyselyparametreilla. Tämä estää yksittäistä työkalun vastausta täyttämästä asiakkaan konteksti-ikkunaa.

## Pyyntöjen rajoitus

`/mcp`-päätepisteessä ei ole sovellustason pyyntörajoitusta. Tuotannossa kuristaminen siirretään API Gatewayn ja Lambdan samanaikaisuusrajojen tehtäväksi. Itse isännöidyissä käyttöönotoissa kuristus tehdään käänteisen välityspalvelimen asetuksilla.

## OAuth-löytäminen

MCP-palvelin ilmoittaa OAuth 2.1 -metatiedot. Näin asiakkaat, jotka muodostavat yhteyden vain OAuthilla löydettäviin palvelimiin, kuten Claude.ain "Add custom connector" -käyttöliittymä, voivat kirjata käyttäjän sisään ilman liitettyä avainta. `/mcp` on suojattu resurssi. Sen valtuutuspalvelin on olemassa oleva [OAuth-palveluntarjoaja](./connected-apps.md) polun `/membership/oauth` alla. B1Adminin `/oauth`-sivu on suostumusnäyttö.

| Päätepiste | Tarkoitus |
|---|---|
| `GET /.well-known/oauth-protected-resource` (sekä `/.well-known/oauth-protected-resource/mcp`) | Suojatun resurssin metatiedot (RFC 9728): `resource` on `<api>/mcp`, `authorization_servers` on API:n juuri, `scopes_supported` listaa kaikki [API-avainten oikeudet](./api-keys.md#scopes) |
| `GET /.well-known/oauth-authorization-server` | Valtuutuspalvelimen metatiedot (RFC 8414): `authorization_endpoint` on B1Adminin `/oauth`, `token_endpoint` on `/membership/oauth/token` ja `registration_endpoint` on `/membership/oauth/register` |
| `POST /membership/oauth/register` | Dynaaminen asiakasrekisteröinti (RFC 7591) |

Claude.ain kaltaisen asiakkaan kulku on seuraava:

1. `POST /mcp` ilman tunnusta palauttaa 401-vastauksen. Vastauksen `WWW-Authenticate`-otsikko osoittaa suojatun resurssin metatietoihin.
2. Asiakas lukee molemmat metatietoasiakirjat ja rekisteröi itsensä lähettämällä `POST /membership/oauth/register`-pyynnön, jossa on `client_name`, `redirect_uris` ja valinnaisesti `scope`. Jokainen itse rekisteröitynyt asiakas on **julkinen** asiakas. Salaisuutta ei myönnetä, ja vastauksessa on `token_endpoint_auth_method: "none"`. Uudelleenohjausosoitteiden on oltava `https`-osoitteita tai `http`-osoitteita loopback-osoitteissa (`localhost`, `127.0.0.1`, `[::1]`). Asiakasta kohden saa olla enintään 10. Rekisteröinti on rajoitettu 20 kertaan tunnissa IP-osoitetta kohden.
3. Käyttäjä ohjataan B1Adminin `/oauth`-sivulle mukanaan `code_challenge` ja `code_challenge_method=S256`. Suostumussivu luettelee jokaisen pyydetyn oikeuden selkokielisesti (tai tekstin "Kaikki, mihin B1-tililläsi on pääsy", jos oikeuksia ei pyydetty). Sivu näyttää isännän, jonne käyttäjä palautetaan, ja ilmoittaa, jos sovellus on rekisteröinyt itsensä. Käyttäjä painaa **Allow**-painiketta eli **Salli**.
4. Asiakas vaihtaa koodin `/membership/oauth/token`-päätepisteessä kanssa `grant_type=authorization_code` ja omalla `code_verifier`-arvollaan. Myöhemmin se uudistaa tunnuksen `grant_type=refresh_token`-arvolla. Sekä lomakekoodatut että JSON-rungot hyväksytään.
5. Tuloksena oleva käyttötunnus on rajatun B1 JWT:n, jota käytetään bearer-tunnuksena `/mcp`-päätepisteessä.

PKCE-säännöt: hyväksytään vain `S256`. Asiakkaan ilman salaisuutta on lähetettävä `code_challenge` valtuutuspyynnössä ja vastaava `code_verifier` tunnuksenvaihdossa. Luottamukselliset asiakkaat (joilla on salaisuus) voivat yhä käyttää pelkkää salaisuutta. Uudelleenohjausosoitteiden on vastattava rekisteröityä osoitetta tarkasti.

Asiakkaat, jotka hyväksyvät staattisen bearer-tunnuksen asetuksissaan, kuten Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor ja mukautettu koodi, voivat jatkaa `cak_…`-avaimen käyttöä.

## Paikallinen kehitys

MCP-päätepiste asennetaan muiden päätepisteiden rinnalle, kun API ajetaan paikallisesti:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Käynnistyksen yhteydessä lokirivi `📡 MCP server ready at /mcp — N routes in inventory` vahvistaa, että luettelo on rakennettu.

Tutki palvelinta MCP Inspectorilla:

```bash
npx @modelcontextprotocol/inspector
```

Inspectorin käyttöliittymässä osoita se osoitteeseen `http://localhost:8084/mcp` ja aseta `Authorization`-otsikoksi `Bearer cak_<prefix>.<secret>`. Kutsu ensin `list_endpoints`. Näet koko reittiluettelon. Sen jälkeen `api_call({ method: "GET", path: "/membership/people" })` palauttaa paikallisen kehitysympäristön siemenhenkilöt.

## Koodin rakenne

MCP-palvelin sijaitsee Api-repon hakemistossa `src/modules/mcp/`. Tärkeimmät tiedostot:

| Tiedosto | Tarkoitus |
|---|---|
| `McpController.ts` | `@controller("/mcp")`. Kytkee `StreamableHTTPServerTransport`-kuljetuksen jokaiseen pyyntöön ja lähettää `WWW-Authenticate`-haasteen 401-vastauksessa |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Palvelee `/.well-known`-OAuth-löytämisasiakirjat |
| `McpServer.ts` | Rakentaa MCP-palvelimen `Server`-oliona ja rekisteröi neljä työkalua |
| `RouteInventory.ts` | Käy läpi inversify-express-utils-metatiedot käynnistyksen yhteydessä ja listaa reitit |
| `internalDispatch.ts` | Synteettinen `req`/`res`, joka palaa Express-sovellukseen prosessin sisällä |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Kuratoidut pyynto- ja vastausesimerkit suuren liikenteen päätepisteille |

## Aiheeseen liittyvää

- [API-avaimet](./api-keys.md)
- [Webhookit](./webhooks.md)
- [Yhdistetyt sovellukset (OAuth)](./connected-apps.md)
- [Claude: loppukäyttäjän asetukset](/docs/b1-admin/integrations/claude)
- [ChatGPT: loppukäyttäjän asetukset](/docs/b1-admin/integrations/chatgpt)

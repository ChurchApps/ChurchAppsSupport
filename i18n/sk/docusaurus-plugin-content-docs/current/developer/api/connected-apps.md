---
title: "Pripojené aplikácie a OAuth"
description: "Pripájajte aplikácie tretích strán k údajom B1 cirkvi pomocou súhlasu OAuth 2.0, bez zdieľaných hesiel alebo kľúčov API, a kedykoľvek odvolajte prístup v nastaveniach B1 Admin."
---

# Pripojené aplikácie a OAuth

<div class="article-intro">

B1 API podporuje OAuth 2.0, takže tretia strana môže požiadať každého správcu cirkvi o povolenie na prístup k jeho údajom bez toho, aby cirkev niekedy zdieľala heslo alebo API kľúč. **Pripojená aplikácia** je OAuth token, ktorý správca cirkvi schválil. Jeho odvolaním sa prístup tretej aplikácie preruší jedným kliknutím. Túto cestu použite pre konektory SaaS s viacerými nájomcami. Pre integráciu jednej cirkvi radšej použite [API kľúče](./api-keys.md).

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- OAuth **klient** musí byť zaregistrovaný skôr, ako cirkvi môžu udeliť prístup. Registruje ho buď administrátor servera B1, alebo sa klient zaregistruje sám cez [dynamickú registráciu](#dynamic-client-registration)
- Všetky koncové body OAuth sa nachádzajú pod modulom Membership: `/membership/oauth/...`
- Prístupové tokeny sú JWT. Obsahujú oprávnenia používateľa filtrované podľa udelených rozsahov

</div>

## Pojmy

| Pojem | Význam |
|---|---|
| **Klient OAuth** | Samotná aplikácia tretej strany. Identifikuje ju `client_id` a zabezpečuje `client_secret`. Zaregistruje sa raz v B1 a zdieľajú ho všetky cirkvi, ktoré ju nainštalujú. |
| **Pripojená aplikácia** | Konkrétny pár `(klient, správca cirkvi)`, pri ktorom správca udelil klientovi prístup. Každá pripojená aplikácia je podložená obnovovacím tokenom OAuth. |
| **Prístupový token** | Krátkodobý JWT (≈ 7 dní), ktorý klient používa na volania API. Má rovnaký tvar ako JWT používateľa: `Authorization: Bearer <jwt>`. |
| **Obnovovací token** | Dlhodobý nepriehľadný reťazec (≈ 90 dní), ktorým klient vytvára nové prístupové tokeny. |
| **Rozsah (scope)** | Obmedzuje, čo môže prístupový token robiť. Pozrite si [katalóg rozsahov](./api-keys.md#scopes). |

## Postupy udelenia prístupu

B1 podporuje tri postupy OAuth, všetky definované v RFC 6749 a RFC 8628.

### Autorizačný kód (webové aplikácie)

Použite, keď vaša aplikácia má serverovú časť a dokáže udržať `client_secret` v tajnosti.

1. **Autorizácia**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Verejní klienti (bez `client_secret`) musia navyše odoslať `"code_challenge": "..."` a `"code_challenge_method": "S256"` (PKCE, RFC 7636). Prijíma sa iba `S256`.

   Vráti `{ "code": "...", "state": "xyz" }`. Koncový bod autorizačného kódu je zámerne overené POST volanie. Vaša aplikácia získa JWT používateľa B1 (zvyčajne tlačidlom umiestneným v relácii používateľa v B1) a odošle ho ako súčasť kroku súhlasu.

2. **Výmena kódu za tokeny**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Ak krok autorizácie odoslal `code_challenge`, zahrňte zodpovedajúce `"code_verifier": "..."`. Verejný klient odošle overovací kľúč a vynechá `client_secret`. Koncový bod tokenov prijíma telá vo formáte JSON alebo `application/x-www-form-urlencoded`.

   Vráti odpoveď s tokenmi:

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

3. **Obnovenie**, keď sa prístupový token blíži k vypršaniu:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Obnovovací token vyprší po 90 dňoch nečinnosti. Ak vypršal, správca cirkvi musí autorizáciu zopakovať.

### Kód zariadenia (TV, kiosky, CLI)

Použite, keď zariadenie nemá prehliadač. Definované v RFC 8628.

1. **Požiadajte o kód zariadenia**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Vráti kód pre používateľa a interval dotazovania:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Zobrazte používateľovi `user_code` a `verification_uri`.

3. **Dotazujte sa** na `/membership/oauth/token` s `grant_type=urn:ietf:params:oauth:grant-type:device_code` a `device_code`. Štandardné odpovede:

   | Chyba | Význam |
   |---|---|
   | `authorization_pending` | Používateľ ešte nesúhlasil. Pokračujte v dotazovaní navrhovaným intervalom |
   | `expired_token` | Kód zariadenia presiahol `expires_in`. Začnite odznova |
   | `access_denied` | Používateľ žiadosť zamietol |
   | _(žiadna — 200 OK)_ | Schválené. Telo je `B1TokenResponse` |

4. Po schválení uložte `refresh_token` a používajte `access_token`, kým nevyprší.

SDK B1 obsahuje `B1OAuthClient.awaitDeviceToken(...)`, ktorá za vás spúšťa slučku dotazovania s vhodným oneskorením podľa RFC.

### Obnovovací token

Vždy je dostupný ako samostatná žiadosť, keď máte `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Vráti sa nový `access_token` a `refresh_token`. **Verejní klienti** (bez `client_secret`) môžu pri obnovení vynechať `client_secret`. To sa hodí pre mobilné a desktopové aplikácie OAuth, ktoré nedokážu udržať tajomstvo.

Obnovovacie tokeny sa rotujú, ale starý sa nezahodí hneď. Ak klient nikdy nedostane odpoveď na obnovenie (napríklad TV, ktoré počas žiadosti stratí napájanie alebo Wi-Fi), môže zopakovať žiadosť s predchádzajúcim `refresh_token` až na **7 dní**. Opakovanie uspeje len vtedy, ak ešte nebol použitý nahrádzajúci token. Nepoužitý nahrádzajúci token sa potom zahodí a vydá sa nový pár. Keď sa nahrádzajúci token sám obnoví, starý token vráti `invalid_grant`. Odvolanie pripojenia odvolá aj všetky rotované tokeny, ktoré sú ešte v tomto období odkladu. Zoznam pripojených aplikácií zobrazuje každé pripojenie iba raz.

## Tvar tokenu

Prístupový token je JWT vydané B1. Je totožné s tokenom, ktorý používateľ dostane z `POST /membership/users/login`. Má rovnaký modulárny nárok na oprávnenia a rovnaké správanie `checkAccess` v každom kontroléri. **Jediný rozdiel** je, že pole oprávnení bolo pri vytvorení tokenu filtrované podľa udelených rozsahov. Obmedzený prístupový token nemôže urobiť nič, čo by nemohol urobiť podobne obmedzený API kľúč. Žiadna kontrolérová „OAuth cesta“ neexistuje. `actionWrapper` nerozlišuje, či nositeľom tokenu je osoba, API kľúč alebo klient OAuth.

## Pripojené aplikácie (pre používateľov)

Z pohľadu správcu cirkvi sú „Pripojené aplikácie“ zoznamom aplikácií, ktorým bol udelený prístup k jeho cirkvi. Každý riadok predstavuje aktívny pár `(OAuthClient, OAuthToken)`.

V B1Admin: **Nastavenia → Vývojár → Pripojené aplikácie** zobrazuje:

- Názov klienta
- Rozsahy, ktoré správca schválil
- Dátum udelenia prístupu
- Tlačidlo **Odvolať**

| Metóda a cesta | Autentifikácia | Účel |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Vypíše aktívne pripojenia volajúceho (spolu s názvom klienta a rozsahmi) |
| `DELETE /membership/oauth/connections/:id` | JWT | Odvolá pripojenie podľa ID OAuth tokenu. Token prestane fungovať pri ďalšej žiadosti |

Zoznam automaticky vynecháva vypršané tokeny.

## Rozsahy a súhlas

Reťazce rozsahov sú rovnaký katalóg ako pri [API kľúčoch](./api-keys.md#scopes). Osvedčené postupy pre klientov:

- **Žiadajte najužšie rozsahy, ktoré stačia.** Cirkvi si všimnú, ak si vypýtate `donations:write`, keď potrebujete iba čítať údaje o ľuďoch.
- **Používajte obnovovací token a krátkodobé prístupové tokeny.** Dlhodobé prístupové tokeny sa ťažšie rýchlo odvolávajú.
- **Vždy v rámci svojho rozhrania zobrazte používateľovi udelené rozsahy,** aby mohol overiť, na čo presne dal súhlas.

## Správa klientov OAuth

Klienti OAuth (samotné aplikácie tretích strán) sa registrujú globálne. Dôverný klient s `client_secret` vytvára administrátor servera B1. Ak chcete aplikáciu nasadiť, kontaktujte tím ChurchApps a vyžiadajte si dvojicu `client_id` / `client_secret`, a zaregistrujte svoje presmerovacie URI. Verejní klienti, napríklad konektory MCP, sa môžu zaregistrovať sami (pozrite nižšie).

Registrované presmerovacie URI musia presne zodpovedať `redirect_uri` v žiadosti. Prefix alebo čiastočná zhoda sa odmietne.

| Metóda a cesta | Oprávnenie | Popis |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Vypíše všetkých klientov OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Získa klienta podľa jeho verejného ID (tajomstvo je skryté) |
| `POST /membership/oauth/clients` | Server.Admin | Vytvorí alebo aktualizuje klienta |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Vymaže klienta |

### Dynamická registrácia klienta

`POST /membership/oauth/register` (verejný, RFC 7591) umožňuje klientovi, napríklad konektoru MCP v claude.ai, zaregistrovať sa samostatne. Je inzerovaný v dokumente `/.well-known/oauth-authorization-server` API. Pozrite [Server MCP → OAuth discovery](./mcp.md#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Vráti 201 s `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) a `token_endpoint_auth_method: "none"`.

- Tajomstvo sa nikdy nevydáva, takže klient musí pri každej autorizácii používať PKCE.
- `redirect_uris` musia byť 1 až 10 URL s `https`, alebo `http` na `localhost`, `127.0.0.1` či `[::1]`.
- `client_name` sa skráti na 45 znakov (predvolene „AI asistent“).
- Obmedzenie: 20 registrácií za hodinu na jednu IP adresu.

Na stránke súhlasu B1Admin dostane samostatne zaregistrovaný klient upozornenie, že sa zaregistroval sám. Nikdy nemôže urobiť viac, než môže vlastný účet B1 používateľa, a dá sa odpojiť v **Nastavenia → Vývojár → Pripojené aplikácie**.

## Podpora SDK

Balík `@churchapps/integration-sdk` obaľuje každý postup OAuth typovanými pomocnými funkciami: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` a `.awaitDeviceToken()`. Pozrite README balíka a [Webhooky](./webhooks.md#sdk-support), kde je celý príklad od začiatku do konca.

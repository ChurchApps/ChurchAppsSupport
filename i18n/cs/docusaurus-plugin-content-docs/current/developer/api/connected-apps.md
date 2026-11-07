---
title: "Připojené aplikace a OAuth"
---

# Připojené aplikace a OAuth

<div class="article-intro">

B1 API podporuje OAuth 2.0, takže aplikace třetí strany může každého správce církve požádat o oprávnění k přístupu k jejím datům, a církev přitom nikdy nesdílí heslo ani API klíč. **Připojená aplikace** je OAuth token, který správce církve schválil; jeho zrušením se přístup aplikace třetí strany odebere jedním kliknutím. Tuto cestu používejte pro konektory SaaS s více nájemci. Pro integraci pro jedinou církev dávejte přednost [API klíčům](./api-keys).

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Než mohou církve klientovi OAuth udělit přístup, musí být **klient** zaregistrován, a to buď správcem serveru B1, nebo samotným klientem prostřednictvím [dynamické registrace](#dynamic-client-registration)
- Všechny koncové body OAuth jsou umístěny v modulu Membership: `/membership/oauth/...`
- Přístupové tokeny jsou JWT. Nesou oprávnění uživatele filtrovaná podle udělených rozsahů

</div>

## Pojmy

| Pojem | Význam |
|---|---|
| **OAuth client** | Samotná aplikace třetí strany, identifikovaná pomocí `client_id` a zabezpečená pomocí `client_secret`. Zaregistruje se jednou u B1 a sdílí ji všechny církve, které ji nainstalují. |
| **Connected App** | Konkrétní dvojice `(klient, správce církve)`, u které správce klientovi udělil přístup. Každá připojená aplikace je podložena obnovovacím tokenem OAuth. |
| **Access token** | Krátkodobý JWT (≈ 7 dní), který klient používá pro volání API. Má stejnou podobu jako JWT uživatele: `Authorization: Bearer <jwt>`. |
| **Refresh token** | Dlouhodobý neprůhledný řetězec (≈ 90 dní), který klient používá k vystavení nových přístupových tokenů. |
| **Scope** | Omezuje, co může přístupový token dělat. Viz [katalog rozsahů](./api-keys#scopes). |

## Autorizační toky

B1 podporuje tři toky OAuth, všechny definované v RFC 6749 a RFC 8628.

### Authorization Code (webové aplikace)

Použijte, pokud vaše aplikace má serverovou část a může `client_secret` uchovávat v tajnosti.

1. **Autorizace**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Veřejní klienti (bez `client_secret`) musí navíc odeslat `"code_challenge": "..."` a `"code_challenge_method": "S256"` (PKCE, RFC 7636). Přijímán je pouze `S256`.

   Vrací `{ "code": "...", "state": "xyz" }`. Koncový bod pro autorizační kód je záměrně ověřený POST požadavek. Vaše aplikace získá JWT uživatele v B1 (obvykle tlačítkem umístěným v relaci uživatele v B1) a předá ho jako součást kroku souhlasu.

2. **Výměna kódu za tokeny**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Pokud krok autorizace odeslal `code_challenge`, přidejte odpovídající `"code_verifier": "..."`. Veřejný klient odešle verifier a `client_secret` vynechá. Koncový bod pro tokeny přijímá těla požadavku ve formátu JSON nebo form-encoded (`application/x-www-form-urlencoded`).

   Vrací odpověď s tokeny:

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

3. **Obnovení**, když se přístupový token blíží vypršení:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Obnovovací token vyprší po 90 dnech nečinnosti. Pokud vypršel, správce církve přístup znovu autorizuje.

### Device Code (televize, kiosky, CLI)

Použijte, pokud zařízení nemá prohlížeč. Definováno v RFC 8628.

1. **Vyžádejte si kód zařízení**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Vrací kód určený uživateli a interval dotazování:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Zobrazte uživateli `user_code` a `verification_uri`.

3. **Dotazujte se** koncového bodu `/membership/oauth/token` s `grant_type=urn:ietf:params:oauth:grant-type:device_code` a `device_code`. Standardní odpovědi:

   | Chyba | Význam |
   |---|---|
   | `authorization_pending` | Uživatel ještě neschválil. Pokračujte v dotazování v doporučeném intervalu |
   | `expired_token` | Kód zařízení překročil `expires_in`. Začněte znovu |
   | `access_denied` | Uživatel požadavek zamítl |
   | _(žádná, 200 OK)_ | Schváleno. Tělo odpovědi je `B1TokenResponse` |

4. Po schválení uložte `refresh_token` a používejte `access_token`, dokud nevyprší.

SDK B1 obsahuje `B1OAuthClient.awaitDeviceToken(...)`, který za vás spustí smyčku dotazování s rozumným backoffem podle RFC.

### Obnovovací token

Jakmile máte `refresh_token`, je vždy k dispozici jako samostatný požadavek:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Vrátí se nový `access_token` a `refresh_token`. **Veřejní klienti** (bez `client_secret`) mohou při obnovení `client_secret` vynechat. To se hodí pro mobilní a desktopové aplikace OAuth, které nemohou tajemství uchovat.

Obnovovací tokeny se střídají, ale starý se nezruší hned. Pokud klient odpověď na obnovení nikdy nedostane (například televize, která během požadavku ztratila napájení nebo Wi-Fi), může zopakovat požadavek s předchozím `refresh_token` až po dobu **7 dní**. Opakování uspěje pouze dokud nový token ještě nebyl použit. Nepoužitý nový token se pak zahodí a vydá se nová dvojice. Jakmile byl nový token sám obnoven, starý token vrací `invalid_grant`. Zrušení připojení zruší také všechny střídané tokeny, které ještě spadají do této lhůty, a seznam připojených aplikací zobrazuje každé připojení pouze jednou.

## Podoba tokenu

Přístupový token je JWT vydaný systémem B1, totožný s tokenem, který uživatel dostane z `POST /membership/users/login`. Má stejnou modulární deklaraci oprávnění a stejné chování `checkAccess` v každém kontroleru. **Liší se pouze** tím, že pole oprávnění bylo při vystavení filtrováno podle udělených rozsahů. Přístupový token s rozsahy nemůže udělat nic, co by nemohl udělat podobně omezený API klíč, a v žádném kontroleru neexistuje samostatná „cesta OAuth“. `actionWrapper` nerozlišuje, zda držitelem tokenu je osoba, API klíč nebo klient OAuth.

## Připojené aplikace (pohled uživatele)

Z pohledu správce církve jsou „Připojené aplikace“ seznam aplikací, kterým byl udělen přístup k jeho církvi. Každý řádek představuje aktivní dvojici `(OAuthClient, OAuthToken)`.

V B1Admin zobrazuje **Settings → Developer → Connected Apps**:

- Název klienta
- Rozsahy, které správce schválil
- Datum udělení přístupu
- Tlačítko **Revoke**

| Metoda a cesta | Autentizace | Účel |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Vypíše aktivní připojení volajícího (spojená s názvem klienta a rozsahy) |
| `DELETE /membership/oauth/connections/:id` | JWT | Zruší připojení podle jeho ID OAuth tokenu. Token přestane fungovat při dalším požadavku |

Seznam automaticky vynechává vypršelé tokeny.

## Rozsahy a souhlas

Řetězce rozsahů jsou stejný katalog jako u [API klíčů](./api-keys#scopes). Doporučené postupy pro klienty:

- **Žádejte nejužší rozsahy, které stačí.** Církve si všimnou, pokud požádáte o `donations:write`, když potřebujete jen číst údaje o lidech.
- **Používejte obnovovací token spolu s krátkodobými přístupovými tokeny.** Dlouhodobé přístupové tokeny se hůř rychle odvolávají.
- **Vždy uživateli ve svém rozhraní znovu zobrazte udělené rozsahy**, aby mohl ověřit, s čím souhlasil.

## Správa klientů OAuth

Klienti OAuth (samotné aplikace třetích stran) se registrují globálně. Důvěrného klienta s `client_secret` vystaví správce serveru B1. Pokud chcete takového klienta nasadit, kontaktujte tým ChurchApps kvůli dvojici `client_id` / `client_secret` a zaregistrujte své přesměrovací URI. Veřejní klienti, jako jsou konektory MCP, se mohou zaregistrovat sami (viz níže).

Zaregistrované přesměrovací URI musí přesně odpovídat `redirect_uri` v požadavku. Shoda pouze s prefixem nebo částečná shoda je odmítnuta.

| Metoda a cesta | Oprávnění | Popis |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Vypíše všechny klienty OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Získá klienta podle jeho veřejného ID (tajemství skryto) |
| `POST /membership/oauth/clients` | Server.Admin | Vytvoří nebo aktualizuje klienta |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Smaže klienta |

### Dynamická registrace klienta

`POST /membership/oauth/register` (veřejný, RFC 7591) umožňuje klientovi, jako je konektor MCP služby claude.ai, zaregistrovat se samostatně. Je zveřejněn v dokumentu API `/.well-known/oauth-authorization-server`. Viz [Server MCP → Zjišťování OAuth](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Vrací 201 s `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) a `token_endpoint_auth_method: "none"`.

- Tajemství se nikdy nevydává, takže klient musí při každé autorizaci používat PKCE.
- `redirect_uris` musí být 1–10 URL s `https`, nebo `http` na `localhost`, `127.0.0.1` nebo `[::1]`.
- `client_name` je zkrácen na 45 znaků (výchozí hodnota „AI assistant“).
- Omezeno na 20 registrací za hodinu na jednu IP adresu.

Na stránce souhlasu v B1Admin dostane samostatně zaregistrovaný klient upozornění, že se zaregistroval sám. Nikdy nemůže udělat více, než umožňuje vlastní účet uživatele v B1, a lze jej odpojit v **Settings → Developer → Connected Apps**.

## Podpora SDK

Balíček `@churchapps/integration-sdk` obaluje každý tok OAuth typovanými pomocnými funkcemi: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Příklad od začátku do konce najdete v README balíčku a v části [Webhooky](./webhooks#sdk-support).

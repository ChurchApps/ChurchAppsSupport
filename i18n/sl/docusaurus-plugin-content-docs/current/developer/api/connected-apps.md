---
title: "Povezane aplikacije in OAuth"
description: "Povežite aplikacije tretjih oseb s podatki B1 prek OAuth 2.0 brez gesel ali API ključev ter kadarkoli preklicite dostop v nastavitvah B1 Admin."
---

# Povezane aplikacije in OAuth

<div class="article-intro">

B1 API podpira OAuth 2.0, tako da lahko aplikacija tretje osebe zaprosi vsakega cerkvenega skrbnika za dovoljenje za dostop do njegovih podatkov, ne da bi cerkev kdaj delila geslo ali API ključ. **Povezana aplikacija** je OAuth žeton, ki ga je odobril cerkveni skrbnik. Če ga prekličete, aplikacija tretje osebe z enim klikom izgubi dostop. To pot uporabite za povezovalnike SaaS z več najemniki. Za integracijo ene same cerkve raje uporabite [API ključe](./api-keys.md).

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- OAuth **odjemalec** mora biti registriran, preden ga cerkve lahko pooblastijo. To lahko stori skrbnik strežnika B1 ali odjemalec sam prek [dinamične registracije](#dynamic-client-registration)
- Vse OAuth končne točke so v modulu Membership: `/membership/oauth/...`
- Dostopni žetoni so JWT-ji. Vsebujejo uporabnikova dovoljenja, filtrirana glede na odobrene obsege

</div>

## Pojmi

| Izraz | Pomen |
|---|---|
| **OAuth odjemalec** | Sama aplikacija tretje osebe, določena z `client_id` in zavarovana z `client_secret`. Enkrat registrirana pri B1 in deljena med vse cerkve, ki jo namestijo. |
| **Povezana aplikacija** | Določen par `(odjemalec, cerkveni skrbnik)`, pri katerem je skrbnik odjemalcu dodelil dostop. Vsaka povezana aplikacija temelji na OAuth osveževalnem žetonu. |
| **Dostopni žeton** | Kratkotrajen JWT (≈ 7 dni), ki ga odjemalec uporablja za klice API-ja. Oblika je enaka uporabniškemu JWT-ju: `Authorization: Bearer <jwt>`. |
| **Osveževalni žeton** | Dolgotrajen neprozoren niz (≈ 90 dni), ki ga odjemalec uporablja za pridobivanje novih dostopnih žetonov. |
| **Obseg** | Omejuje, kaj lahko dostopni žeton počne. Glejte [katalog obsegov](./api-keys.md#scopes). |

## Tokovi odobritve

B1 podpira tri tokove OAuth, vse so opredeljeni z RFC 6749 in RFC 8628.

### Koda za avtorizacijo (spletne aplikacije)

Uporabite, kadar ima vaša aplikacija strežniško komponento in lahko `client_secret` ohrani zasebno.

1. **Avtorizacija**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Javni odjemalci (brez `client_secret`) morajo prav tako poslati `"code_challenge": "..."` in `"code_challenge_method": "S256"` (PKCE, RFC 7636). Sprejet je samo `S256`.

   Vrne `{ "code": "...", "state": "xyz" }`. Končna točka za kodo za avtorizacijo je namenoma overjena POST zahteva. Vaša aplikacija pridobi uporabnikov B1 JWT (običajno tako, da v uporabnikovi seji B1 prikaže gumb) in ga pošlje kot del koraka soglasja.

2. **Zamenjajte kodo za žetone**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Če je korak avtorizacije poslal `code_challenge`, vključite ustrezen `"code_verifier": "..."`. Javni odjemalec pošlje preverjevalec in izpusti `client_secret`. Končna točka za žetone sprejema telesa v formatu JSON ali kodiranem obrazcu (`application/x-www-form-urlencoded`).

   Vrne odgovor z žetoni:

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

3. **Osvežite**, ko se dostopni žeton kmalu izteče:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Osveževalni žeton poteče po 90 dneh neuporabe. Če je potekel, cerkveni skrbnik aplikacijo ponovno avtorizira.

### Kodna naprava (TV-ji, kiosk, CLI)

Uporabite, kadar naprava nima brskalnika. Opredeljeno z RFC 8628.

1. **Zahtevajte kodo naprave**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Vrne kodo za uporabnika in interval anketiranja:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Uporabniku prikažite `user_code` in `verification_uri`.

3. **Anketirajte** `/membership/oauth/token` z `grant_type=urn:ietf:params:oauth:grant-type:device_code` in `device_code`. Standardni odgovori:

   | Napaka | Pomen |
   |---|---|
   | `authorization_pending` | Uporabnik še ni odobril. Nadaljujte z anketiranjem v predlaganem intervalu |
   | `expired_token` | Koda naprave je presegla `expires_in`. Začnite znova |
   | `access_denied` | Uporabnik je zahtevo zavrnil |
   | _(brez napake, 200 OK)_ | Odobreno. Telo je `B1TokenResponse` |

4. Ko je odobreno, shranite `refresh_token` in uporabljajte `access_token`, dokler ne poteče.

Paket B1 SDK vključuje `B1OAuthClient.awaitDeviceToken(...)`, ki za vas izvede zanko anketiranja z ustreznim zakasnjevanjem v skladu z RFC.

### Osveževalni žeton

Na voljo vedno kot samostojna zahteva, ko imate `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Vrne se nov `access_token` in `refresh_token`. **Javni odjemalci** (brez `client_secret`) lahko pri osvežitvi izpustijo `client_secret`. To je uporabno za mobilne in namizne aplikacije OAuth, ki ne morejo ohraniti skrivnosti.

Osveževalni žetoni se rotirajo, vendar stari žeton ne zavrže takoj. Če odjemalec nikoli ne prejme odgovora na osvežitev (na primer TV, ki je med zahtevo izgubil napajanje ali Wi-Fi), lahko s prejšnjim `refresh_token` poskusi znova do **7 dni**. Poskus uspe le, dokler nadomestni žeton še ni bil uporabljen. Neuporabljeni nadomestni žeton se nato zavrže in izda se nov par. Ko je bil nadomestni žeton sam osvežen, stari žeton vrne `invalid_grant`. Preklic povezave prekliče tudi vse zasukane žetone, ki so še v tem obdobju milosti, seznam povezanih aplikacij pa prikaže vsako povezavo le enkrat.

## Oblika žetona

Dostopni žeton je JWT, ki ga izda B1 in je enak tistemu, ki ga uporabnik dobi z `POST /membership/users/login`. Enaka je modularna trditev o dovoljenjih in enako vedenje `checkAccess` v vsakem krmilniku. **Razlika** je, da je polje dovoljenj ob izdaji filtrirano glede na odobrene obsege. Dostopni žeton z omejenimi obsegi ne more storiti ničesar, česar ne bi mogel narediti ustrezno omejen API ključ, in v nobenem krmilniku ni ločene „OAuth poti“. `actionWrapper` ne ve, ali nosilec žetona je oseba, API ključ ali odjemalec OAuth.

## Povezane aplikacije (za uporabnike)

Z vidika cerkvenega skrbnika so »Povezane aplikacije« seznam aplikacij, ki so dobile dostop do njegove cerkve. Vsaka vrstica je aktiven par `(OAuthClient, OAuthToken)`.

V B1Admin **Nastavitve → Razvijalec → Povezane aplikacije** prikaže:

- ime odjemalca
- obsege, ki jih je skrbnik odobril
- datum odobritve dostopa
- gumb **Prekliči**

| Metoda in pot | Avtentikacija | Namen |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Seznam lastnih aktivnih povezav klicatelja (združeno z imenom odjemalca in obsegi) |
| `DELETE /membership/oauth/connections/:id` | JWT | Prekliče povezavo po id-ju OAuth žetona. Žeton preneha delovati pri naslednji zahtevi |

Seznam samodejno izključuje poteke žetone.

## Obsegi in soglasje

Nizi obsegov so enak katalog kot pri [API ključih](./api-keys.md#scopes). Najboljše prakse za odjemalce:

- **Zahtevajte najožje obsege, ki delujejo.** Cerkve opazijo, če zahtevate `donations:write`, ko potrebujete samo branje podatkov o ljudeh.
- **Uporabite osveževalni žeton in kratkotrajne dostopne žetone.** Dolgotrajne dostopne žetone je težje hitro preklicati.
- **Odobrene obsege vedno prikažite uporabniku** v lastnem vmesniku, da lahko preveri, na kaj je privolil.

## Upravljanje odjemalcev OAuth

Odjemalci OAuth (same aplikacije tretjih oseb) so registrirani globalno. Zaupnega odjemalca s `client_secret` ustvari skrbnik strežnika B1. Če želite izdati takega odjemalca, se za par `client_id` / `client_secret` obrnite na ekipo ChurchApps in registrirajte svoje preusmeritvene URI-je. Javni odjemalci, kot so MCP povezovalniki, se lahko registrirajo sami (spodaj).

Registrirani preusmeritveni URI-ji se morajo natančno ujemati z `redirect_uri` v zahtevi. Predpona ali delno ujemanje je zavrnjeno.

| Metoda in pot | Dovoljenje | Opis |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Seznam vseh odjemalcev OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Pridobi odjemalca po javnem id-ju (skrivnost je skrita) |
| `POST /membership/oauth/clients` | Server.Admin | Ustvari ali posodobi odjemalca |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Izbriše odjemalca |

### Dinamična registracija odjemalca

`POST /membership/oauth/register` (javno, RFC 7591) omogoča, da se odjemalec, kot je MCP povezovalnik claude.ai, registrira sam. Oglašen je v dokumentu `/.well-known/oauth-authorization-server` API-ja. Glejte [MCP strežnik → odkritje OAuth](./mcp.md#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Vrne 201 s `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) in `token_endpoint_auth_method: "none"`.

- Skrivnost se nikoli ne izda, zato mora odjemalec pri vsaki avtorizaciji uporabiti PKCE.
- `redirect_uris` mora biti 1–10 URL-jev `https` ali `http` na `localhost`, `127.0.0.1` ali `[::1]`.
- `client_name` se skrajša na 45 znakov (privzeto „AI assistant“).
- Omejeno na 20 registracij na uro na IP naslov.

Na strani soglasja v B1Admin dobi samodejno registrirani odjemalec obvestilo, da se je registriral sam. Obvestilo tudi pove, da nikoli ne more narediti več, kot lahko uporabnikov lasten račun B1, in da ga je mogoče odklopiti pod **Nastavitve → Razvijalec → Povezane aplikacije**.

## Podpora SDK-ju

Paket `@churchapps/integration-sdk` ovije vsak tok OAuth s tipiziranimi pomočniki: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` in `.awaitDeviceToken()`. Glejte README paketa in [Webhooks](./webhooks.md#sdk-support) za celoten primer.

---
title: "Connected Apps at OAuth"
---

# Connected Apps at OAuth

<div class="article-intro">

Sinusuportahan ng B1 API ang OAuth 2.0 para makahingi ang isang third-party na application ng pahintulot mula sa bawat church admin na ma-access ang kanilang data -- nang hindi kailanman nagbabahagi ng password o API key ang simbahan. Ang **Connected App** ay isang OAuth token na inaprubahan ng isang church admin; ang pagbawi nito ay pumuputol sa access ng third-party app sa isang click. Gamitin ang daang ito para sa multi-tenant na SaaS connector. Para sa integration ng iisang simbahan, mas mainam ang [API Keys](./api-keys).

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Dapat na nakarehistro muna ang isang OAuth **client** bago makapagbigay ng access ang mga simbahan dito -- ng isang B1 server admin, o ng mismong client sa pamamagitan ng [dynamic registration](#dynamic-client-registration)
- Lahat ng OAuth endpoint ay nasa ilalim ng Membership module: `/membership/oauth/...`
- Ang mga access token ay JWT -- dala nila ang permission ng user na sinala ayon sa mga ipinagkaloob na scope

</div>

## Mga Konsepto

| Termino | Kahulugan |
|---|---|
| **OAuth client** | Ang mismong third-party app -- kinikilala sa pamamagitan ng `client_id`, pinoprotektahan ng `client_secret`. Nakarehistro nang minsan sa B1, ibinabahagi sa lahat ng simbahang nag-i-install nito. |
| **Connected App** | Isang partikular na pares ng `(client, church-admin)` kung saan ipinagkaloob ng admin ang access sa client. Bawat Connected App ay sinusuportahan ng OAuth refresh token. |
| **Access token** | Isang maikli ang buhay na JWT (≈ 7 araw) na ginagamit ng client para sa mga tawag sa API. Kapareho ng hugis ng user JWT -- `Authorization: Bearer <jwt>`. |
| **Refresh token** | Isang mahabang buhay na opaque na string (≈ 90 araw) na ginagamit ng client para gumawa ng bagong access token. |
| **Scope** | Nagpapaliit sa kayang gawin ng access token -- tingnan ang [scope catalog](./api-keys#scopes). |

## Mga Grant Flow

Sinusuportahan ng B1 ang tatlong OAuth flow, na lahat ay tinukoy ng RFC 6749 + RFC 8628.

### Authorization Code (mga web app)

Gamitin kapag may server-side na bahagi ang iyong app at kayang itago ang `client_secret` nang pribado.

1. **Mag-authorize**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Ang mga public client (walang `client_secret`) ay dapat ding magpadala ng `"code_challenge": "..."` at `"code_challenge_method": "S256"` (PKCE, RFC 7636). Tanging `S256` ang tinatanggap.

   Nagbabalik ng `{ "code": "...", "state": "xyz" }`. Sadyang authenticated POST ang authorization-code endpoint -- kinukuha ng iyong app ang B1 JWT ng user (karaniwan sa pamamagitan ng pag-host ng button sa B1 session ng user) at ipinapasa ito bilang bahagi ng hakbang ng pagpayag.

2. **Palitan ang code ng token**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Kung nagpadala ang authorize step ng `code_challenge`, isama ang katumbas na `"code_verifier": "..."`. Ang public client ay nagpapadala ng verifier at hindi kasama ang `client_secret`. Tumatanggap ang token endpoint ng JSON o form-encoded (`application/x-www-form-urlencoded`) na body.

   Nagbabalik ng token response:

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

3. **I-refresh** kapag malapit nang mag-expire ang access token:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Nag-e-expire ang refresh token pagkatapos ng 90 araw na hindi ginagamit; kapag nag-expire na ito, kailangang mag-authorize muli ang church admin.

### Device Code (mga TV, kiosk, CLI)

Gamitin kapag walang browser ang device. Tinukoy ng RFC 8628.

1. **Humiling ng device code**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Nagbabalik ng code na nakikita ng user at ang polling interval:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Ipakita ang `user_code` at `verification_uri` sa user.

3. **I-poll** ang `/membership/oauth/token` gamit ang `grant_type=urn:ietf:params:oauth:grant-type:device_code` at ang `device_code`. Mga karaniwang response:

   | Error | Kahulugan |
   |---|---|
   | `authorization_pending` | Hindi pa naaprubahan ng user -- ipagpatuloy ang polling sa iminumungkahing interval |
   | `expired_token` | Lumampas na sa `expires_in` ang device code -- magsimula ulit |
   | `access_denied` | Tinanggihan ng user ang request |
   | _(wala -- 200 OK)_ | Naaprubahan na -- ang body ay isang `B1TokenResponse` |

4. Kapag naaprubahan na, itago ang `refresh_token` at gamitin ang `access_token` hanggang mag-expire ito.

Kasama sa B1 SDK ang `B1OAuthClient.awaitDeviceToken(...)` na nagpapatakbo ng polling loop para sa iyo, na may maayos at sumusunod-sa-RFC na backoff.

### Refresh Token

Laging available bilang hiwalay na request kapag hawak mo na ang `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Magbabalik ng bagong `access_token` at `refresh_token`. Ang **public client** (walang `client_secret`) ay maaaring hindi isama ang `client_secret` sa refresh -- kapaki-pakinabang para sa mobile/desktop OAuth app na hindi kayang itago ang secret.

Nagre-rotate ang mga refresh token, ngunit hindi agad itinatapon ang luma. Kung hindi kailanman natanggap ng client ang sagot ng refresh (halimbawa, TV na nawalan ng kuryente o Wi-Fi habang may request), maaari nitong subukang muli gamit ang nakaraang `refresh_token` nang hanggang **7 araw**. Magtatagumpay lamang ang retry habang hindi pa nagagamit ang kapalit na token; pagkatapos, ibinabasura ang hindi nagamit na kapalit at naglalabas ng bagong pares. Kapag na-refresh na mismo ang kapalit, magbabalik ng `invalid_grant` ang lumang token. Ang pagbawi sa isang koneksyon ay binabawi rin ang mga na-rotate na token na nasa grace window pa, at ipinapakita ng listahan ng connected apps ang bawat koneksyon nang isang beses lamang.

## Hugis ng Token

Ang access token ay isang JWT na inisyu ng B1 na kapareho ng nakukuha ng user mula sa `POST /membership/users/login` -- parehong modular permission claim, parehong `checkAccess` behavior sa bawat controller -- **maliban** na ang permission array ay sinala ayon sa mga ipinagkaloob na scope sa oras ng paglikha. Ang scoped na access token ay hindi kayang gawin ang anumang hindi kayang gawin ng katulad na scoped na API key, at walang hiwalay na "OAuth path" sa anumang controller; hindi alam ng `actionWrapper` kung ang bearer ay tao, API key, o OAuth client.

## Connected Apps (Para sa User)

Mula sa pananaw ng church admin, ang "Connected Apps" ay ang listahan ng mga app na nabigyan ng access sa kanilang simbahan. Ang bawat hanay ay isang buhay na pares ng `(OAuthClient, OAuthToken)`.

Sa B1Admin: **Settings → Developer → Connected Apps** ay nagpapakita ng:

- Ang pangalan ng client
- Ang mga scope na inaprubahan ng admin
- Ang petsa kung kailan ibinigay ang access
- Button na **Revoke**

| Method at Path | Auth | Layunin |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Ilista ang sariling aktibong koneksyon ng tumatawag (kasama ang pangalan ng client at mga scope) |
| `DELETE /membership/oauth/connections/:id` | JWT | Bawiin ang koneksyon ayon sa id ng OAuth token nito -- hihinto sa paggana ang token sa susunod na request |

Awtomatikong inaalis sa listahan ang mga nag-expire nang token.

## Mga Scope at Pagpayag

Ang mga string ng scope ay kapareho ng catalog ng [API keys](./api-keys#scopes). Mga pinakamahusay na gawi para sa mga client:

- **Humiling ng pinakamakitid na scope na gagana.** Mapapansin ng mga simbahan kung humihingi ka ng `donations:write` gayong kailangan mo lamang magbasa ng tao.
- **Gumamit ng refresh token kasama ang maikling buhay na access token.** Mahirap bawiin nang mabilis ang mahabang buhay na access token.
- **Laging ipakita muli sa user ang mga ipinagkaloob na scope** sa sarili mong UI para mapatunayan nila kung ano ang kanilang pinayagan.

## Pamamahala ng OAuth Client

Ang mga OAuth client (ang mismong third-party app) ay nakarehistro nang global. Ang confidential client na may `client_secret` ay ginagawa ng B1 server admin -- para makapaglabas ng isa, makipag-ugnayan sa ChurchApps team para sa pares ng `client_id` / `client_secret` at iparehistro ang iyong redirect URI. Ang public client gaya ng MCP connector ay maaaring magrehistro ng sarili (sa ibaba).

Dapat eksaktong tumugma ang mga nakarehistrong redirect URI sa `redirect_uri` ng request; tinatanggihan ang prefix o bahagyang tugma.

| Method at Path | Permission | Paglalarawan |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Ilista ang lahat ng OAuth client |
| `GET /membership/oauth/clients/clientId/:clientId` | -- | Kunin ang client ayon sa pampublikong id nito (nakatago ang secret) |
| `POST /membership/oauth/clients` | Server.Admin | Gumawa o mag-update ng client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Burahin ang client |

### Dynamic Client Registration

Ang `POST /membership/oauth/register` (pampubliko, RFC 7591) ay nagpapahintulot sa isang client gaya ng MCP connector ng claude.ai na magrehistro ng sarili. Ina-advertise ito ng `/.well-known/oauth-authorization-server` document ng API -- tingnan ang [MCP Server → OAuth Discovery](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Nagbabalik ng 201 kasama ang `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`), at `token_endpoint_auth_method: "none"`.

- Walang secret na kailanman inilalabas, kaya dapat gumamit ang client ng PKCE sa bawat authorization.
- Dapat 1–10 `https` URL ang `redirect_uris`, o `http` sa `localhost`, `127.0.0.1`, o `[::1]`.
- Pinuputol ang `client_name` sa 45 karakter (default na "AI assistant").
- Limitado sa 20 rehistro bawat oras bawat IP.

Sa consent page ng B1Admin, ang client na nagrehistro ng sarili ay makakakita ng paalalang nagrehistro ito ng sarili, hindi kailanman makakagawa ng higit pa sa sariling B1 account ng user, at maaaring idiskonekta sa ilalim ng **Settings → Developer → Connected Apps**.

## Suporta sa SDK

Binabalot ng package na `@churchapps/integration-sdk` ang bawat OAuth flow ng mga typed na helper -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Tingnan ang README ng package at ang [Webhooks](./webhooks#sdk-support) para sa end-to-end na halimbawa.

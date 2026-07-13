---
title: "Ema-App Lahlanganisiwe & OAuth"
---

# Ema-App Lahlanganisiwe & OAuth

<div class="article-intro">

I-B1 API isekela i-OAuth 2.0 kuze i-app yelucezu lwesitsatfu icele umphatsi ngamunye welibandla imvumo yekufinyelela kudatha yakhe — ngaphandle kwekutsi libandla life yabelane ngephasiwedi noma sikhiya se-API. **I-Connected App** ngu-token we-OAuth lovunyiwe ngumphatsi welibandla; kususa lelo tokheni kuvimbela kufinyelela kwe-app yelucezu lwesitsatfu ngekuchofota kanye. Sebentisa lendlela ye-connectors le-SaaS letisebenta emabandla lamanyenti. Ku-integration yelibandla linye, khetsa [Tikhiya te-API](./api-keys).

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-**client** ye-OAuth kufanele ibhaliswe (kwamanjena ngumphatsi we-server we-B1) ngaphambi kwekutsi emabandla akwati kuyiniketa imvumo
- Tonkhe ema-endpoint e-OAuth atfolakala ngaphansi kwe-module ye-Membership: `/membership/oauth/...`
- Ema-token ekufinyelela angema-JWT — atfwele tinsayeya temsebentisi lokhitwe ngema-scope lanikiwe

</div>

## Imibono

| Ligama | Incazelo |
|---|---|
| **OAuth client** | Yona lucezu lwesitsatfu — yaziswa nge-`client_id`, yivikelwe nge-`client_secret`. Ibhaliswe kanye ku-B1, yabelwana emabandla lawonkhe layifakako. |
| **Connected App** | Umbhangqwano lotsite we `(client, umphatsi welibandla)` lapho umphatsi anike client leyo imvumo. Yonkhe i-Connected App isekelwe yi-token ye-refresh ye-OAuth. |
| **Access token** | I-JWT lephila sikhatsi lesifisha (~emalanga lasi-7) lesetjentiswa yi-client kutingcelo te-API. Umumo ufana newe-JWT yemsebentisi — `Authorization: Bearer <jwt>`. |
| **Refresh token** | Sitringi lesingacaci lesiphila sikhatsi lesidze (~emalanga langu-90) lesetjentiswa yi-client kutakha ema-access token lamasha. |
| **Scope** | Iyancisha loko i-access token ingakwenta — buka [luhla lwema-scope](./api-keys#scopes). |

## Tinchubo Tekunika

I-B1 isekela tinchubo letintsatfu te-OAuth, tonkhe tichazwe yi-RFC 6749 + RFC 8628.

### Authorization Code (ema-app ewebhu)

Sebentisa nangabe i-app yakho inencenye lesebenta ku-server futsi ingakwati kugcina `client_secret` iyimfihlo.

1. **Authorize**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Ibuyisela `{ "code": "...", "state": "xyz" }`. I-endpoint ye-authorization-code ngabomu ingu-POST lotivakalisiwe — i-app yakho iyabutfola i-JWT ye-B1 yemsebentisi (ngalokuvamile ngekuveta inkhinobho ku-session ye-B1 yemsebentisi) bese uyihambisela njengencenye yesinyatselo sekuvuma.

2. **Shintjanisa i-code ngema-token**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Ibuyisela imphendvulo ye-token:

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

3. **Refresh** ngesikhatsi i-access token isayakuvala:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   I-refresh token iyavala ngemuva kwemalanga langu-90 angasetjentiswanga; nangabe seyivalile, umphatsi welibandla uphindze avume kabusha.

### Device Code (ema-TV, ema-kiosk, i-CLI)

Sebentisa nangabe idivayisi lite i-browser. Ichazwe yi-RFC 8628.

1. **Cela i-device code**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Ibuyisela i-code yemsebentisi kanye nesikhatsi se-polling:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Khombisa `user_code` + `verification_uri` kumsebentisi.

3. **Polla** `/membership/oauth/token` nge-`grant_type=urn:ietf:params:oauth:grant-type:device_code` kanye ne-`device_code`. Timphendvulo letivamile:

   | Liphutsa | Incazelo |
   |---|---|
   | `authorization_pending` | Umsebentisi akakavumeli — chubeka nge-polling ngesikhatsi lesincomekile |
   | `expired_token` | I-device code seyendlule i-`expires_in` — cala kabusha |
   | `access_denied` | Umsebentisi alele sicelo |
   | _(kute — 200 OK)_ | Kuvunyiwe — umtimba yi-`B1TokenResponse` |

4. Nase kuvunyiwe, gcina i-`refresh_token` bese usebentisa i-`access_token` kuze ivale.

I-B1 SDK ifaka i-`B1OAuthClient.awaitDeviceToken(...)` lesebentisa i-polling loop ngenca yakho ngemhlahlandlela lohambisana ne-RFC.

### Refresh Token

Ihlala itfolakala njengesicelo lesitimele nawuphetse i-`refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

I-`access_token` lensha ne-`refresh_token` lensha ziyabuya. **Ema-client lavulekile** (angenayo `client_secret`) angayeka `client_secret` ekurefresha — kusita ema-app e-OAuth aselulahni/e-desktop langakwati kugcina imfihlo.

## Umumo We-Token

I-access token yi-JWT lekhishwe yi-B1 lefana nalena umsebentisi angayitfola ku-`POST /membership/users/login` — sisu lesifanako se-modular permission claim, kutiphatsa lokufanako kwe-`checkAccess` kuwo wonkhe umlawuli — **ngaphandle kwekutsi** luhla lwetimvumo selucengiwe ngema-scope lanikiwe ngesikhatsi sekukhishwa. I-access token lene-scope ayikwati kwenta lutfo lokungakwati kwentiwa yi-API key lenaso i-scope lefanako, futsi akukho "ndlela ye-OAuth" lehlukile kunome ngiyiphi umlawuli; i-`actionWrapper` ayati kutsi le-bearer ngumuntfu, i-API key, nobe i-OAuth client.

## Ema-App Lahlanganisiwe (Ngakwemsebentisi)

Ngekubona kwemphatsi welibandla, "Connected Apps" luluhla lwema-app lanikiwe imvumo yekufinyelela ebandleni lakhe. Umugca ngamunye ngumbhangqwano lophilako we-`(OAuthClient, OAuthToken)`.

Ku-B1Admin: **Settings → Developer → Connected Apps** ikhombisa:

- Ligama le-client
- Ema-scope lavunyiwe ngumphatsi
- Lilanga imvumo lenikwa ngalo
- Inkhinobho ye-**Revoke**

| Inchubo & Umkhondvo | Kutivakalisa | Injongo |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Bala tinhlangano letiphilako tembizi (tihlanganiswe neligama le-client + ema-scope) |
| `DELETE /membership/oauth/connections/:id` | JWT | Susa inhlangano nge-id yayo ye-OAuth-token — i-token iyayekela kusebenta esicelweni lesilandzelako |

Luhla lucedza ema-token lasavele evele kuphela.

## Ema-Scope Nekuvuma

Tona letiring lete-scope yiluhla lolufanako [nalelu lwetikhiya te-API](./api-keys#scopes). Tindlela letisebenta kahle kuma-client:

- **Cela ema-scope lancane kakhulu lasebentako.** Emabandla ayabona nawucela `donations:write` kepha udzinga kufundza bantfu kuphela.
- **Sebentisa i-refresh token kanye nema-access token laphila sikhatsi lesifisha.** Ema-access token laphila sikhatsi lesidze anzima kususa ngekushesha.
- **Njalo bonisa ema-scope lavunyiwe kumsebentisi** ku-UI yakho kuze akwati kucinisekisa loko avumeleneko nako.

## Kuphatsa I-OAuth Client

Ema-OAuth client (ema-app etitsatfu ngokwawo) kwamanjena abhaliswa jikelele ngumphatsi we-server we-B1. Kutibhalisa ngekwakho ngalinye libandla kusendleleni yekutfutfuka — kuze kube kunjalo, kutfumela i-connector levulekile, tsintsana ne-thimba le-ChurchApps kuze bakuniketse umbhangqwano we-`client_id` / `client_secret` futsi babhalise ema-redirect URI akho.

| Inchubo & Umkhondvo | Imvumo | Incazelo |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Bala tonkhe ema-OAuth client |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Tfola client nge-id yayo yeveleni (imfihlo iyafihlwa) |
| `POST /membership/oauth/clients` | Server.Admin | Akha nobe buyeketa client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Sula client |

## Kusekelwa Yi-SDK

Liphakheji le-`@churchapps/integration-sdk` lisonga nchubo yonkhe ye-OAuth ngeti-helper letikhitiwe — `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Buka i-README yeliphakheji kanye [ne-Webhooks](./webhooks#sdk-support) ngesibonelo lesigcwele.

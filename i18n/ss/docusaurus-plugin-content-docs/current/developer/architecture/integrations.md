---
title: "Bubanti Bekuhlanganisa Nekwandzisa"
---

# Bubanti Bekuhlanganisa Nekwandzisa

<div class="article-intro">

Konkhe lokungangenwa yincenye yesitsatfu kuhamba nge-API yinye nemodeli yinye yekuvunyelwa (authorization). Lelikhasi limephu: liniketa emagama abo bonkhe bubanti bekuhlanganisa, likhombisa kutsi bahlangana njani, futsi lihlanganisa nekhasi lelinemininingwane ngalunye. Nangabe wakha intfo lesebentisana ne-B1, cala lapha kuze ukhetse umnyango lofanele, bese ulandzela sixhumanisi lesiya ekhasini lelichaza ngalo ngekujula.

</div>

## Bubanti Ngasikhatsi Sinye

Kunetindlela letisitfupha tekungena nome kuphuma, futsi tonkhe tabelana ngesigaba sinye sekuvunyelwa:

- **[REST API](../api/api-keys)** — bonkhe bubanti bemkhicito, lokungabitwa nge-bearer token kusuka kunome nguluphi lulwimi.
- **[Ema-API key](../api/api-keys)** — imininingwane leliciniso lelilula kunato tonkhe: i-token ye-`cak_…` lebotjelwe kumuntfu munye elibandleni linye.
- **[OAuth 2.0 kanye Netinhlelo Letixhunyiwe](../api/connected-apps)** — kuvuma kwelibandla nga linye kutinhlelo te-multi-tenant; ikhicita i-JWT lefanako naleyo umsebentisi ayitfolako.
- **[Ema-Webhook](../api/webhooks)** — imicimbi lesulwako lesayiniwe, letfunyelwa ngekugcina.
- **[Seva ye-MCP](../api/mcp)** — sisibonelo lesibhekiswe ku-AI setulu kwe-REST API ku-`/mcp`.
- **[Bahlinzeki bekucuketfwa (Content providers)](../freeplay-content-provider)** — indlela yekungena yemitapo yemidiya yangephandle iye ku-FreePlay kanye netinhlelo te-B1.

Konkhe ngephandle kwebahlinzeki bekucuketfwa kwenteliswa yi-API yinye lenkhulu (i-repositori ye-[Api](https://github.com/ChurchApps/Api)) lawemodyuli akhe agibela ngaphansi kwetindlela letisisekelo letimile — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, kanye ne-`/mcp`.

## Kutsi Kuhlangana Njani

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

Imicibisholo lemitsatfu ichaza yonkhe indzaba: incenye yesitsatfu **iyabita ingena** nge-bearer token (i-API key nome i-OAuth JWT, kuhlanganisa nge-`/mcp`); i-API **iyabita iphindze iphume** nge-ema-webhook lasayiniwe; kantsi bahlinzeki bekucuketfwa yindlela yinye leyodwa **yekucuketfwa lokungenako**, lapho i-B1 ngalokwayo iba yi-client ye-OAuth leyifuna imidiya kusuka kumtfombo wangephandle.

## Umshini Wekuvunyelwa Lowabelenwe

Yonkhe imininingwane leliciniso — i-JWT yekungena yemsebentisi, i-token yekufinyelela ye-OAuth, nome i-API key — iyaphelela ku-**`Principal`** lefanako futsi ihlolwa ngendlela lefanako. Akukho indlela lehlukene "yekuvunyelwa kwekuhlanganisa"; imininingwane leliciniso lenesigaba ayehlukaniseki lula kumsebentisi lonemvume lencishenako.

### Sakhiwo se-JWT

Ema-token wekufinyelela e-B1 ngema-JWT e-HS256 lakhicitwa ku-`Api/src/modules/membership/auth/AuthenticatedUser.ts`. Luhlu lwemabhalo (claim set):

| Bhalo (Claim) | Incazelo |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Umuntfu lomunikwe i-token |
| `churchId` | Libandla linye lokusebenta ngalo le-token — sitsembu setinto tonkhe tekubekwa esikhtini kwemininingwane |
| `personId` | Umugca womuntfu ngekhatsi kwaleliobandla |
| `permissions` | Luhlu lolusicaba lwema-perm-string e-RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Bululeke/bukhokheli beliciko, kwentela tinhlolo letibekwe esikhtini kweliciko |
| `membershipStatus` | Sihambi kusuka kulilunga, kwentela kuvinjelwa kwekutitikhonzela |

I-token yekufinyelela ye-OAuth ifana ncamashi nesakhiwo se-JWT yekungena — umehluko munye kuphela kutsi luhlu lwayo lwe-`permissions` **luhlungiwe nge-scope letinikeziwe ngaphambi kwekusayina** (`getCombinedApiJwt(...)`).

### Kubekwa esikhtini ngelibandla ngalinye

I-`churchId` ibhalo le-token, hhayi i-parameter yesicelo, ngako imininingwane leliciniso ayikwati kufinyelela emalibandleni lamanye. I-query ngayinye ye-repositori ihlungiwe nge-`churchId` walobitako; i-API key nome i-token ye-OAuth ibotjelwe kulibandla linye kuphela ngesikhatsi sekukhicitwa.

### Ema-vumelo lasekelwe eendleleni etulu

Ema-controller ahlunga tento nge-`au.checkAccess(contentType, action)` kumelene naluhlu lwe-`permissions` lwe-token. Ema-scope kusisihlungi, **akusiko sipho** ngasosonkhe sikhatsi (`Api/src/shared/auth/Scopes.ts`): i-`SCOPE_CATALOG` ihlanganisa i-scope ngayinye (sib. `people:read`, `donations:write`) kuma-pair e-RBAC layivumelako, kantsi i-`filterPermissionsByScopes()` ihlanganisa loku netivumelo **tanyalo-nyalo** talomuntfu ngesikhatsi sonkhe sekuhlunga. Imiphumela:

- Kususa imvume ku-B1Admin kuyanciphisa kufinyelela kwemininingwane leliciniso ngesicelo lesilandzelako — ema-token akaze aphumele endleleni yesigaba.
- I-scope ingasusa kuphela tivumelo, ngako imininingwane leliciniso lenesigaba ayikwati kutenyusa iye ekulawuleni kweseva/lidomeni (letivumelo letifakwe ngekucabanga kusukela kunome iyiphi i-scope).
- Ema-API key aphetse sicalo se-`cak_`; i-`CustomAuthProvider.getUser()` iyahlukanisa ngaso, ihashe imfihlo, bese iyahlunga kabusha i-RBAC lesekhona yalomuntfu lomnini ngesicelo ngasinye.

Bona i-[API Keys → Scopes](../api/api-keys#scopes) kwentela luhlu lolugcwele.

## Sikhombo Se-Bubanti

### REST API

Bonkhe bubanti bemkhicito. Nome yini i-endpoint levunyelwe iyemukela nome ngabe yi-JWT nome i-`cak_…` API key ku-header ye-`Authorization: Bearer` — akukho tafula lendlela lehlukene le-key-kuphela nome le-OAuth-kuphela. Emodyuli kanye netindlela tato tisisekelo tikhona ngaphansi kwe-`Api/src/modules/*`.

### Ema-API key

I-token yekufinyelela komuntfu lengumunye ye-`cak_<prefix>.<secret>`, lekhicitwa e-**B1Admin → Settings → Developer → API Keys**. Kugcinwa kuphela i-hash ye-SHA-256; i-key lengakahlungwa iyakhonjiswa kanye kuphela. Kulawulwa ku-`/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Kufanele kakhulu kutimakhinati talelibandla libodvwa kanye netixhumi njenge-Zapier, Make, kanye ne-Google Sheets. → **[Ema-API Key](../api/api-keys)**

### OAuth 2.0 kanye Netinhlelo Letixhunyiwe

Kwentela tinhlelo te-multi-tenant letidzinga libandla ngalinye kutsi livume. Kwakhiwe ku-`Api/src/modules/membership/controllers/OAuthController.ts` ngaphansi kwe-`/membership/oauth`. Iseva isekela tipho letitsatfu:

- **Khodi Yekuvunyelwa (Authorization Code)** — `POST /oauth/authorize` (levunyelwe) ibuyisa khodi lengaphili sikhatsi lesidze; `POST /oauth/token` nge-`grant_type=authorization_code` iyishintjanisa ngeliso JWT lekufinyelela (malunga ne-7 emalanga) kanye ne-refresh token (malunga ne-90 emalanga).
- **Khodi Yelidivayisi (Device Code)** (RFC 8628) — `POST /oauth/device/authorize` ikhicita i-`user_code`; umsebentisi uyayivumela ku-B1Admin (`/oauth/device/approve`); lidivayisi liyabuta (poll) i-`/oauth/token` nge-device-code grant. Kwentela ema-TV, ema-kiosk, kanye ne-ema-CLI langakabi na-browser.
- **Refresh Token** — `grant_type=refresh_token` ikhicita i-token yekufinyelela lensha; ema-client lawa-public (langakabi ne-secret) angashiya i-secret.

I-**Connected App** kuluvo lwe-church-admin lwe-token lenikeziwe, loluhlelwa futsi lungasuswa ku-`/membership/oauth/connections`. Umlawuli futsi utsatsa i-relay-session bridge ye-OAuth (`/oauth/relay/*`) leyivumela lidivayisi langenambrowser kutsi kuchubeke kungena ngekusayina kumhlinzeki **wangephandle**. → **[Tinhlelo Letixhunyiwe & OAuth](../api/connected-apps)**

### Ema-Webhook

Yindlela yinye kuphela yekuphuma. Libandla libhalisa i-endpoint ye-HTTPS lephephile emicimbini; nangabe kwentekile lokufananako, i-`WebhookDispatcher.emit(churchId, event, payload)` iyabhala kutfunyelwa bese umsebenti wangemuva utfumela i-envelope ye-JSON lesayiniwe nge-retry/backoff kanye nekutfunyelwa kabusha. Injini ikhona ku-`Api/src/shared/webhooks/`, i-CRUD ngelibandla ngalinye ingaphansi kwe-`/membership/webhooks` (`WebhookController.ts`). Inkambu ye-`connectorType` iyashintja umtsamo kwentela i-Slack / Discord. → **[Ema-Webhook](../api/webhooks)**

### Seva ye-MCP

Sisibonelo lesibhekiswe ku-AI ku-`/mcp` (`Api/src/modules/mcp/`). Tinsimbi letitsatfu letivamile — `list_endpoints`, `describe_endpoint`, `api_call` — tikhombisa bonkhe bubanti be-REST ngendlela lesheshako kunome ngiyiphi i-client ye-MCP. Kuvunyelwa kufana nale-bearer token yakho konkhe, kantsi i-`api_call` iyangena kabusha ku-Express stack ngekhatsi kwenchubo (in-process) ngako yonkhe imvume kanye nemtsetfo wekubekwa esikhtini elibandleni usasebenta. → **[Seva ye-MCP](../api/mcp)**

### Bahlinzeki Bekucuketfwa

Indlela yekungena yekucuketfwa, ku-pakethi lehlukene i-`Packages/content-providers` (`@churchapps/content-providers`) kunekutsi kube ku-API. Umhlinzeki ngamunye usebentisa i-`IProvider` interface (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, kanye netibambo (hooks) tekuvunyelwa — futsi uyatibhalisa ngekwakhe ku-`Map` registry (`src/providers/registry.ts`). Lapha **i-B1 ngiyo i-client ye-OAuth**: umhlinzeki uchaza i-`AuthType` ye-`none`, `oauth_pkce`, `device_flow`, nome `form_login`, kantsi tisita letabelene (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) tisebenta i-PKCE / device flow ye-client-side kumtfombo wangephandle. Bahlinzeki labalishumi nakunye batfunyelwa lamuhla — kuhlanganisa Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, kanye ne-B1.church — bondla i-FreePlay kanye netinhlelo te-B1. → **[Umhlinzeki Wekucuketfwa we-FreePlay](../freeplay-content-provider)**

## Sifinyeto

| Bubanti | Umshini wekuvunyelwa | Sicondzo | Lapho kwakhiwe khona | Sikhombo |
|---|---|---|---|---|
| REST API | I-`Bearer` JWT nome i-key ye-`cak_…` | Kungena | `Api/src/modules/*` | [Ema-API Key](../api/api-keys) |
| Ema-API key | I-token ye-`cak_` lehashiwe nge-SHA-256 | Imininingwane leliciniso | `Api/.../membership/controllers/ApiKeyController.ts` | [Ema-API Key](../api/api-keys) |
| OAuth 2.0 / Tinhlelo Letixhunyiwe | Khodi yekuvunyelwa · lidivayisi · refresh → JWT | Kungena | `Api/.../membership/controllers/OAuthController.ts` | [Tinhlelo Letixhunyiwe](../api/connected-apps) |
| Ema-Webhook | Imfihlo ngewebhook ngayinye, luphawu lwe-HMAC-SHA256 | Kuphuma | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Ema-Webhook](../api/webhooks) |
| Seva ye-MCP | I-`Bearer` JWT nome i-key ye-`cak_…` | Kungena (AI) | `Api/src/modules/mcp/` | [Seva ye-MCP](../api/mcp) |
| Bahlinzeki bekucuketfwa | Ngamunye: akukho / OAuth PKCE / lidivayisi / fomu | Kungena kwekucuketfwa | `Packages/content-providers/` | [Umhlinzeki Wekucuketfwa](../freeplay-content-provider) |

## Tixhumi Letakhelwe Kucala

Kunekutsi wonkhe umuntfu akhe kusukela ekucaleni, i-ChurchApps ihambisa tixhumi phezu kwalobubanti lobungetulu:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — i-webhook `connectorType` iyashintja i-envelope lesisekelo yaba umlayeto wenkulumo; kuhlelwa konkhe ku-B1Admin, kungadzingeki akhawunti yesitsatfu.
- **[Zapier](/docs/b1-admin/integrations/zapier)** kanye ne-**[Make](/docs/b1-admin/integrations/make)** — kuvusa ngemicimbi ye-webhook bese kwenta ngendlela ye-REST API; batibhalisela webhook yabo nasekuvulwa Zap/scenario (kudzinga key lenge-`settings:write`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — add-on levunyelwe nge-API key lekhicita Bantfu / Kunikela / Emaciko / Kubakhona ngesikhatsi lesifisako.
- **[Claude](/docs/b1-admin/integrations/claude)** kanye ne-**[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — ema-client we-MCP labhekiswe ku-`/mcp`.

Kwentela ikhodi yakho, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) isongela konkhe: i-client ye-REST leneluhlobo, i-client ye-OAuth (auth-code / refresh / device flow), kanye ne-verifier ye-webhook ye-HMAC nge-Express middleware.

## Emakhasi Lahlobene

- [Ema-API Key](../api/api-keys) — imininingwane leliciniso lelilula kanye neluhlu lwe-scope lolugcwele
- [Tinhlelo Letixhunyiwe & OAuth](../api/connected-apps) — inchubo yekuvuma ye-multi-tenant
- [Ema-Webhook](../api/webhooks) — umshini wemicimbi wekuphuma
- [Seva ye-MCP](../api/mcp) — sisongela se-AI integration
- [Umhlinzeki Wekucuketfwa we-FreePlay](../freeplay-content-provider) — kuba mtfombo wekucuketfwa lokungenako
- [Bubanti (bemsebentisi wekugcina)](/docs/b1-admin/integrations/) — imihlahlandlela yekuhlela tixhumi letakhelwe kucala

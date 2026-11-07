---
title: "Integracijų ir plėtinių paviršius"
description: "Visi būdai prisijungti prie ChurchApps B1: REST API, API raktai, OAuth, webhook'ai, MCP ir turinio tiekėjai su nuorodomis į kiekvieną nuorodą."
---

# Integracijų ir plėtinių paviršius

<div class="article-intro">

Viskas, prie ko gali prisijungti trečioji šalis, veikia per vieną API ir vieną autorizacijos modelį. Šis puslapis yra žemėlapis: jame nurodomi visi integracijos paviršiai, parodoma, kaip jie susiję, ir pateikiamos nuorodos į išsamų kiekvieno paviršiaus aprašymą. Jei kuriate ką nors B1 platformai, pradėkite čia, kad pasirinktumėte tinkamas „duris“, o tada eikite pagal nuorodą į puslapį, kuriame tai aprašyta išsamiai.

</div>

## Visi paviršiai vienu žvilgsniu

Yra šeši būdai įeiti į sistemą arba iš jos išeiti, ir visi jie naudoja tą patį autentifikavimo sluoksnį:

- **[REST API](../api/api-keys.md)** — visas produkto paviršius, kurį galima iškviesti su bearer žetonu iš bet kurios programavimo kalbos.
- **[API raktai](../api/api-keys.md)** — paprasčiausi prisijungimo duomenys: `cak_…` žetonas, susietas su vienu asmeniu vienoje bažnyčioje.
- **[OAuth 2.0 ir prijungtos programos](../api/connected-apps.md)** — kiekvienos bažnyčios sutikimas daugiavartotojėms programoms; išduoda tą patį JWT, kurį gauna vartotojas.
- **[Webhook'ai](../api/webhooks.md)** — pasirašyti, patikimai pristatomi išeinantys įvykiai.
- **[MCP serveris](../api/mcp.md)** — DI orientuotas REST API apvalkalas adresu `/mcp`.
- **[Turinio tiekėjai](../freeplay-content-provider.md)** — įeinantis kelias, per kurį išorinės medijos bibliotekos patenka į FreePlay ir B1 programas.

Viską, išskyrus turinio tiekėjus, teikia viena monolitinė API ([Api](https://github.com/ChurchApps/Api) saugykla), kurios moduliai prijungti prie stabilių bazinių kelių: `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` ir `/mcp`.

## Kaip viskas susiję

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

Trys rodyklės viską paaiškina: trečioji šalis **kreipiasi į** sistemą su bearer žetonu (API raktu arba OAuth JWT, įskaitant per `/mcp`); API **kreipiasi atgal** per pasirašytus webhook'us; o turinio tiekėjai yra vienintelis **įeinančio turinio** kelias, kuriuo pati B1 veikia kaip OAuth *klientas*, traukdama mediją iš išorinio šaltinio.

## Bendras autentifikavimo modelis

Kiekvienas prisijungimo duomenys (vartotojo prisijungimo JWT, OAuth prieigos žetonas ar API raktas) išsprendžiami į **tą patį `Principal`** ir tikrinami tuo pačiu būdu. Atskiro „integracijos autentifikavimo“ kelio nėra; apribotus įgaliojimus turintys prisijungimo duomenys tiesiog nesiskiria nuo žemesnių teisių vartotojo.

### JWT struktūra

B1 prieigos žetonai yra HS256 JWT, sukuriami faile `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Požymių (claim) rinkinys:

| Požymis | Reikšmė |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Asmuo, kuriam priklauso žetonas |
| `churchId` | Vienintelė bažnyčia, kurioje šis žetonas veikia; visų duomenų apimties pagrindas |
| `personId` | Asmens įrašas tos bažnyčios viduje |
| `permissions` | Plokščias RBAC leidimų eilučių masyvas (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Narystė grupėse ir vadovavimas grupėms, grupių lygio tikrinimams |
| `membershipStatus` | Svečias ar narys, savitarnos apribojimams |

OAuth prieigos žetonas yra visiškai tokios pat struktūros kaip prisijungimo JWT. Skirtumas tik tas, kad jo `permissions` masyvas buvo **prieš pasirašant perfiltruotas pagal suteiktas apimtis** (`getCombinedApiJwt(...)`).

### Apribojimas pagal bažnyčią

`churchId` yra žetono požymis, o ne užklausos parametras, todėl prisijungimo duomenys niekada negali pasiekti kitų bažnyčių. Kiekviena saugyklos užklausa filtruoja pagal iškvietėjo `churchId`; API raktas ar OAuth žetonas kuriamas tiksliai vienai bažnyčiai.

### Vaidmenimis grįsti leidimai ribose

Valdikliai riboja veiksmus kviesdami `au.checkAccess(contentType, action)` prieš žetono `permissions` masyvą. Apimtys yra **filtras, o ne suteikimas** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` sieja kiekvieną apimtį (pvz., `people:read`, `donations:write`) su RBAC poromis, kurioms ji leidžia, o `filterPermissionsByScopes()` kiekvieno išsprendimo metu sujungia tai su asmens *dabartiniais* leidimais. Pasekmės:

- B1Admin panelėje panaikinus leidimą, prisijungimo duomenų prieiga nutrūksta kitos užklausos metu. Žetonai niekada nenukrypsta nuo vaidmens.
- Apimtis gali tik *pašalinti* leidimus, todėl apribotus įgaliojimus turintys prisijungimo duomenys negali pakilti iki serverio ar domeno administravimo (tie leidimai tyčia nesusieti su jokia apimtimi).
- API raktai turi `cak_` priešdėlį. `CustomAuthProvider.getUser()` pagal jį skiriasi, sumaišo paslaptį ir kiekvieno kvietimo metu iš naujo nustato savininko asmens dabartinį RBAC.

Visą apimčių katalogą žr. [API raktai → Apimtys](../api/api-keys.md#scopes).

## Paviršių nuorodos

### REST API

Visas produkto paviršius. Bet kuris autentifikuotas galutinis taškas priima arba JWT, arba `cak_…` API raktą `Authorization: Bearer` antraštėje. Atskiros lentelės tik raktams ar tik OAuth nėra. Moduliai ir jų bazinai keliai yra `Api/src/modules/*` aplanke.

### API raktai

Asmeninis prieigos žetonas formatu `cak_<prefix>.<secret>`, sukuriamas **B1Admin → Settings → Developer → API Keys**. Saugoma tik SHA-256 maišos reikšmė; neapdorotas raktas rodomas tik vieną kartą. Valdoma adresu `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Geriausiai tinka vienos bažnyčios scenarijams ir jungtims, pavyzdžiui, Zapier, Make ir Google Sheets. → **[API raktai](../api/api-keys.md)**

### OAuth 2.0 ir prijungtos programos

Skirta daugiavartotojėms programoms, kurioms reikia kiekvienos bažnyčios sutikimo. Įgyvendinta `Api/src/modules/membership/controllers/OAuthController.ts` faile, adresu `/membership/oauth`. Serveris palaiko tris suteikimo tipus:

- **Authorization Code**: `POST /oauth/authorize` (autentifikuotas) grąžina trumpalaikį kodą; `POST /oauth/token` su `grant_type=authorization_code` iškeičia jį į prieigos JWT (≈ 7 dienos) ir atnaujinimo žetoną (≈ 90 dienų). Viešieji (be paslapties) klientai privalo naudoti PKCE (tik `S256`): `code_challenge` autorizacijos metu ir atitinkamą `code_verifier` keitimo metu.
- **Device Code** (RFC 8628): `POST /oauth/device/authorize` išduoda `user_code`; vartotojas jį patvirtina B1Admin (`/oauth/device/approve`); įrenginys tikrina `/oauth/token` su įrenginio kodo suteikimo tipu. Skirta TV, kioskams ir CLI įrankiams be naršyklės.
- **Refresh Token**: `grant_type=refresh_token` sukuria naują prieigos žetoną; viešieji (be paslapties) klientai gali praleisti paslaptį.

Viešieji klientai taip pat gali patys registruotis per `POST /oauth/register` (RFC 7591 dinaminė kliento registracija). Jie gauna `client_id` be paslapties, o jų nukreipimo URI privalo būti `https` arba loopback.

**Prijungta programa** (Connected App) yra bažnyčios administratoriui matomas suteikto žetono vaizdas. Ją galima peržiūrėti ir atšaukti adresu `/membership/oauth/connections`. Valdiklis taip pat talpina OAuth **relay-session** tiltą (`/oauth/relay/*`), leidžiantį įrenginiui be naršyklės baigti prisijungimą per *išorinį* tiekėją. → **[Prijungtos programos ir OAuth](../api/connected-apps.md)**

### Webhook'ai

Vienintelis išeinantis paviršius. Bažnyčia prenumeruoja viešą HTTPS galinį tašką įvykiams. Kai įvyksta atitinkamas pakeitimas, `WebhookDispatcher.emit(churchId, event, payload)` papildo tik ID turinčius duomenis rodomais pavadinimais (`personName`, `groupName`, `formName`; paieškos vykdomos tik tada, kai prenumerata atitinka), įrašo pristatymą. Fone veikiantis darbuotojas siunčia pasirašytą JSON voką su pakartotinais bandymais ir laukimo intervalais bei pakartotiniu pristatymu. Variklis yra `Api/src/shared/webhooks/`, o kiekvienos bažnyčios CRUD veikia adresu `/membership/webhooks` (`WebhookController.ts`). Laukas `connectorType` pakeičia turinį Slack ar Discord formatu. `mailchimp` jungtis eina toliau ir pati valdo visą HTTP keitimąsi: kiekvienam įvykiui taikomas metodas, URL ir autentifikavimas pagal Mailchimp API, o prisijungimo duomenys užšifruoti `webhooks.connectorConfig` lauke. → **[Webhook'ai](../api/webhooks.md)**

### MCP serveris

DI orientuotas apvalkalas adresu `/mcp` (`Api/src/modules/mcp/`). Trys bendrieji įrankiai (`list_endpoints`, `describe_endpoint`, `api_call`) dinamiškai atveria visą REST paviršių bet kuriam MCP klientui. Autentifikavimas yra tas pats bearer žetonas kaip ir visur kitur. Klientams, prisijungiantiems per OAuth (claude.ai pasirinktinės jungtys), 401 atsakas iš `/mcp` turi `WWW-Authenticate` antraštę, nukreipiančią į `/.well-known/oauth-protected-resource`. `/.well-known/oauth-authorization-server` nurodo `/membership/oauth` galinius taškus, dinaminę registraciją, PKCE ir B1Admin `/oauth` sutikimo puslapį (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` vidiniame procese vėl įeina į Express stack, todėl visos leidimų ir bažnyčios apimties taisyklės vis tiek galioja. → **[MCP serveris](../api/mcp.md)**

### Turinio tiekėjai

Įeinančio turinio kelias yra atskiroje pakuotėje `Packages/content-providers` (`@churchapps/content-providers`), o ne API. Kiekvienas tiekėjas įgyvendina `IProvider` sąsają (`src/interfaces.ts`): `browse`, `getPlaylist`, `getInstructions` ir autentifikavimo kablius. Jis pats registruojasi `Map` registre (`src/providers/registry.ts`). Čia **B1 yra OAuth klientas**. Tiekėjas nurodo `AuthType`: `none`, `oauth_pkce`, `device_flow` arba `form_login`. Bendrosios pagalbinės priemonės (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) vykdo kliento pusės PKCE ar įrenginio srautą išoriniam šaltiniui. Šiuo metu pateikiama vienuolika tiekėjų, įskaitant Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church ir B1.church. Jie tiekia turinį FreePlay ir B1 programoms. → **[FreePlay turinio tiekėjas](../freeplay-content-provider.md)**

**Metų planai** naudoja šį kelią. Mokymo programos leidėjas (turintis `lessons.edit`) Lessons.church administravime tvarko sutvarkytas 1, 2 ir 3 savaičių sekas (LessonsApi lentelės `yearPlans` ir `yearPlanWeeks`, su pasirinktiniu `startMonth` ir kiekvienos savaitės `anchor`: `easter` arba `christmas`). LessonsApi `GET /yearPlans/public` anonimiškai teikia aktyvius planus ir įkelia kiekvienos savaitės programą, studiją bei vietą iš pamokų medžio. B1Admin **Serving → Plans → Schedule Lesson → Apply Year Plan** naudoja šį galinį tašką ir įrašo po vieną DoingApi planą kiekvienai įtrauktai savaitei (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Planai su `startMonth` susieja savaites su pasirinktais metais (Velykos pagal Grigaliaus skaičiavimą, Kalėdos kaip sekmadienis, einantis ne vėliau nei gruodžio 25 d.) ir užpildo tarp jų esančius laikotarpius. Planai be `startMonth` vis tiek susieja N-ąją savaitę su `startDate + (N−1)×7` dienų. Savaitės iš išorinių OLF tiekėjų arba su neužbaigtu keliu taikymo metu praleidžiamos. Bažnyčios redaguoja gautus planus kaip ir bet kuriuos kitus, o FreePlay groja tai, kas yra plane.

## Santrauka

| Paviršius | Autentifikavimo mechanizmas | Kryptis | Kur įgyvendinta | Nuoroda |
|---|---|---|---|---|
| REST API | `Bearer` JWT arba `cak_…` raktas | Įeinanti | `Api/src/modules/*` | [API raktai](../api/api-keys.md) |
| API raktai | SHA-256 maiša saugomas `cak_` žetonas | Prisijungimo duomenys | `Api/.../membership/controllers/ApiKeyController.ts` | [API raktai](../api/api-keys.md) |
| OAuth 2.0 / Prijungtos programos | Autorizacijos kodas (PKCE) · įrenginys · atnaujinimas → JWT; dinaminė kliento registracija | Įeinanti | `Api/.../membership/controllers/OAuthController.ts` | [Prijungtos programos](../api/connected-apps.md) |
| Webhook'ai | Kiekvieno kablio paslaptis, HMAC-SHA256 parašas | Išeinanti | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook'ai](../api/webhooks.md) |
| MCP serveris | `Bearer` JWT, OAuth JWT (randamas per `/.well-known`) arba `cak_…` raktas | Įeinanti (DI) | `Api/src/modules/mcp/` | [MCP serveris](../api/mcp.md) |
| Turinio tiekėjai | Pagal tiekėją: nėra / OAuth PKCE / įrenginys / forma | Įeinantis turinys | `Packages/content-providers/` | [Turinio tiekėjas](../freeplay-content-provider.md) |

## Paruoštos jungtys

Užuot visi kūrė nuo nulio, ChurchApps teikia jungtis virš aukščiau nurodytų paviršių:

- **[Slack ir Discord](/docs/b1-admin/integrations/slack-discord)**: webhook `connectorType` standartinį voką pakeičia į pokalbių žinutę. Konfigūruojama visiškai B1Admin, be trečiosios šalies paskyros.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)**: `mailchimp` connectorType sinchronizuoja asmenis su Mailchimp auditorija ir susieja grupės ar sąrašo narystę su žymomis (`Api/src/shared/webhooks/MailchimpConnector.ts`). Skirtingai nuo pokalbių jungčių, ji kiekvienam įvykiui siunčia savo autentifikuotas užklausas (įterpimas, archyvavimas, žymėjimas), o ne POST siunčia į bažnyčios nurodytą URL. API raktas ir auditorijos ID saugomi užšifruoti `webhooks.connectorConfig` lauke. Sinchronizacija vienakryptė, naudojami tik standartiniai sujungimo laukai.
- **[Zapier](/docs/b1-admin/integrations/zapier)** ir **[Make](/docs/b1-admin/integrations/make)**: suveikia pagal webhook įvykius ir veikia per REST API. Kai įjungiamas Zap ar scenarijus, jie patys užregistruoja savo webhook (reikia rakto su `settings:write`). Zapier programos šaltinis yra `Integrations` saugykloje, kataloge `zapier/` (Zapier CLI, diegiamas su `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)**: API raktu autentifikuojamas priedas, eksportuojantis People, Donations, Groups ir Attendance duomenis pagal poreikį.
- **[Claude](/docs/b1-admin/integrations/claude)** ir **[ChatGPT](/docs/b1-admin/integrations/chatgpt)**: MCP klientai, nukreipti į `/mcp`.

Savo kodui **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) apgaubia visa tai: tipizuotą REST klientą, OAuth klientą (autorizacijos kodas, atnaujinimas, įrenginio srautas) ir HMAC webhook tikrintoją su Express tarpine programine įranga.

## Susiję puslapiai

- [API raktai](../api/api-keys.md): paprasčiausi prisijungimo duomenys ir apimčių katalogas
- [Prijungtos programos ir OAuth](../api/connected-apps.md): kelių nuomininkų sutikimo srautai
- [Webhook'ai](../api/webhooks.md): išeinančių įvykių sistema
- [MCP serveris](../api/mcp.md): DI integracijos apvalkalas
- [FreePlay turinio tiekėjas](../freeplay-content-provider.md): tapimas įeinančio turinio šaltiniu
- [Integracijos (galutiniam vartotojui)](/docs/b1-admin/integrations/): paruoštų jungčių sąrankos vadovai

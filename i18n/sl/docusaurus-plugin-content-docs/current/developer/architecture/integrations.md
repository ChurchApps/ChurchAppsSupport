---
title: "Integracijska in razširitvena površina"
---

# Integracijska in razširitvena površina

<div class="article-intro">

Vse, kar lahko tretja oseba poveže z B1, deluje prek enega API-ja in enotnega modela avtorizacije. Ta stran je zemljevid: navaja vsako integracijsko površino, prikazuje, kako so povezane, in povezuje na podrobno referenco za vsako od njih. Če gradite na platformi B1, začnite tukaj, da izberete pravi vhod, nato pa sledite povezavi na stran, ki ga podrobno dokumentira.

</div>

## Površine na prvi pogled

Obstaja šest načinov vstopa in izstopa, vsi pa uporabljajo isto plast avtentikacije:

- **[REST API](../api/api-keys)** — celotna površina izdelka, dostopna z nosilnim žetonom iz katerega koli jezika.
- **[API ključi](../api/api-keys)** — najpreprostejša poverilnica: žeton `cak_…`, vezan na eno osebo v eni cerkvi.
- **[OAuth 2.0 in povezane aplikacije](../api/connected-apps)** — soglasje po cerkvah za večnajemniške aplikacije; izda enak JWT, ki ga dobi uporabnik.
- **[Webhooki](../api/webhooks)** — podpisani odhodni dogodki z zanesljivo dostavo.
- **[Strežnik MCP](../api/mcp)** — ovoj nad REST API-jem, namenjen umetni inteligenci, na poti `/mcp`.
- **[Ponudniki vsebine](../freeplay-content-provider)** — vhodna pot za zunanje knjižnice medijev v FreePlay in aplikacije B1.

Vse razen ponudnikov vsebine streže en sam monolitni API (repozitorij [Api](https://github.com/ChurchApps/Api)), katerega moduli so priklopljeni pod stabilne osnovne poti — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` in `/mcp`.

## Kako se vse skupaj povezuje

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Aplikacija tretje   │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · strežnik / SaaS   │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ ključ ─┐                  │  │
   │  · CLI / skripte     │                          │  │   OAuth JWT  ┴▶ Principal         │  │
   │  · odjemalec AI (MCP)│ ─── POST /mcp ──────────▶ │  │   področja → permissions[]      │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Moduli API: /membership /giving      │
             │        podpisan JSON POST              │  /attendance /content /messaging …    │
             │   (oseba / darilo / skupina / …)       │                   │                    │
             └──────────── webhooki ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (zanesljivo, podpis HMAC-SHA256)  └───────────────────────────────────────┘

   Zunanji viri vsebine (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / tok naprave / brez   ──  B1 je tu odjemalec OAuth  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / aplikacije B1        (vhodna pot vsebine)
```

Tri puščice povedo celotno zgodbo: tretja oseba **kliče v sistem** z nosilnim žetonom (ključ API ali JWT OAuth, tudi prek `/mcp`); API **kliče nazaj** prek podpisanih webhookov; ponudniki vsebine pa so edina **vhodna pot vsebine**, kjer je B1 sam odjemalec OAuth, ki povleče medije iz zunanjega vira.

## Skupni model avtentikacije

Vsaka poverilnica — prijavni JWT uporabnika, žeton za dostop OAuth ali ključ API — se razreši v **isti `Principal`** in se preveri na enak način. Ni ločene poti za »integracijsko avtentikacijo«; omejena poverilnica je preprosto nerazločljiva od uporabnika z manjšimi pravicami.

### Struktura JWT

Dostopni žetoni B1 so JWT-ji HS256, ustvarjeni v `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Nabor zahtevkov:

| Zahtevek | Pomen |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Oseba, ki stoji za žetonom |
| `churchId` | Ena sama cerkev, znotraj katere žeton deluje — sidro za vse omejitve podatkov |
| `personId` | Zapis osebe znotraj te cerkve |
| `permissions` | Ravna tabela nizov dovoljenj RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Članstvo v skupinah / vodstvo skupin, za preverjanja na ravni skupine |
| `membershipStatus` | Gost ali član, za omejevanje samopostrežnih funkcij |

Žeton za dostop OAuth je po obliki povsem enak prijavnemu JWT-ju — edina razlika je, da je bila njegova tabela `permissions` pred podpisom filtrirana skozi odobrena področja (`getCombinedApiJwt(...)`).

### Omejitev na cerkev

`churchId` je zahtevek žetona, ne parameter zahteve, zato poverilnica nikoli ne more seči čez meje cerkva. Vsaka poizvedba v repozitoriju filtrira po `churchId` klicatelja; ključ API ali žeton OAuth je ob izdaji vezan na natanko eno cerkev.

### Dovoljenja na podlagi vlog na meji

Krmilniki omejujejo dejanja z `au.checkAccess(contentType, action)` glede na tabelo `permissions` žetona. Področja so **filter, nikoli dodelitev** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` preslika vsako področje (npr. `people:read`, `donations:write`) na pare RBAC, ki jih dovoljuje, `filterPermissionsByScopes()` pa jih ob vsakem razreševanju preseka z *trenutnimi* dovoljenji osebe. Posledice:

- Preklic dovoljenja v B1Admin prekine dostop poverilnice pri naslednji zahtevi — žetoni nikoli ne odstopajo od vloge.
- Področje lahko dovoljenja le *odvzame*, zato omejena poverilnica nikoli ne more pridobiti skrbniških pravic strežnika ali domene (ta dovoljenja so namerno nepreslikana na nobeno področje).
- Ključi API imajo predpono `cak_`; `CustomAuthProvider.getUser()` jo prepozna, zgoščuje skrivnost in ob vsakem klicu ponovno razreši žive dovoljenja RBAC lastniške osebe.

Za celoten katalog glejte [API ključi → Področja](../api/api-keys#scopes).

## Referenca površin

### REST API

Celotna površina izdelka. Vsaka overjena končna točka sprejme bodisi JWT bodisi ključ `cak_…` v glavi `Authorization: Bearer` — ni ločene tabele poti samo za ključe ali samo za OAuth. Moduli in njihove osnovne poti so v `Api/src/modules/*`.

### API ključi

Osebni dostopni žeton `cak_<prefix>.<secret>`, ustvarjen v **B1Admin → Settings → Developer → API Keys**. Shranjena je samo zgoščena vrednost SHA-256; surovi ključ je prikazan le enkrat. Upravlja se na poti `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Najbolj primeren za lastne skripte ene cerkve in povezovalnike, kot so Zapier, Make in Google Sheets. → **[API ključi](../api/api-keys)**

### OAuth 2.0 in povezane aplikacije

Za večnajemniške aplikacije, ki potrebujejo soglasje vsake cerkve. Implementirano v `Api/src/modules/membership/controllers/OAuthController.ts` pod potjo `/membership/oauth`. Strežnik podpira tri podeljevalne tokove:

- **Authorization Code** — `POST /oauth/authorize` (overjen) vrne kratkotrajno kodo; `POST /oauth/token` z `grant_type=authorization_code` jo zamenja za dostopni JWT (≈ 7 dni) in osvežitveni žeton (≈ 90 dni). Javni odjemalci brez skrivnosti morajo uporabiti PKCE (samo `S256`): `code_challenge` ob avtorizaciji in ustrezen `code_verifier` ob izmenjavi žetona.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` izda `user_code`; uporabnik ga odobri v B1Admin (`/oauth/device/approve`); naprava anketira `/oauth/token` z podeljevalnim tokom za napravo. Namenjeno televizorjem, info točkam in ukazni vrstici brez brskalnika.
- **Refresh Token** — `grant_type=refresh_token` izda nov dostopni žeton; javni odjemalci brez skrivnosti lahko skrivnost izpustijo.

Javni odjemalci se lahko sami registrirajo z `POST /oauth/register` (dinamična registracija odjemalca RFC 7591); prejmejo `client_id` brez skrivnosti, njihovi URI-ji za preusmeritev pa morajo biti `https` ali loopback.

**Povezana aplikacija** je pogled skrbnika cerkve na odobreni žeton; prikazan in preklicen je na poti `/membership/oauth/connections`. Krmilnik gosti tudi most za **relejne seje** OAuth (`/oauth/relay/*`), ki napravi brez brskalnika omogoča dokončanje prijave pri *zunanjem* ponudniku. → **[Povezane aplikacije in OAuth](../api/connected-apps)**

### Webhooki

Edina odhodna površina. Cerkev naroči javno HTTPS-končno točko na dogodke; ko pride do ustrezne spremembe, `WebhookDispatcher.emit(churchId, event, payload)` obogati podatke z zgolj ID-ji z imeni za prikaz (`personName`, `groupName`, `formName` — iskanja se izvedejo samo, ko se naročnina ujema), zabeleži dostavo, ozadjski delavec pa pošlje podpisan JSON ovoj z ponovnimi poskusi in zakasnitvijo. Motor je v `Api/src/shared/webhooks/`, upravljanje po cerkvah pa pod `/membership/webhooks` (`WebhookController.ts`). Polje `connectorType` preoblikuje telo za Slack in Discord; povezovalnik `mailchimp` gre dlje in prevzame celotno izmenjavo HTTP (metoda/URL/avtentikacija za vsak dogodek prek API-ja Mailchimp, poverilnice šifrirane v `webhooks.connectorConfig`). → **[Webhooki](../api/webhooks)**

### Strežnik MCP

Ovoj za umetno inteligenco na poti `/mcp` (`Api/src/modules/mcp/`). Trije splošni orodji — `list_endpoints`, `describe_endpoint` in `api_call` — dinamično izpostavijo celotno površino REST vsakemu odjemalcu MCP. Avtentikacija je enaka nosilni žeton kot pri vsem ostalem. Za odjemalce, ki se prijavljajo z OAuth (vlogi claude.ai po meri), napaka 401 z `/mcp` vsebuje glavo `WWW-Authenticate`, ki kaže na `/.well-known/oauth-protected-resource`; `/.well-known/oauth-authorization-server` oglašuje končne točke `/membership/oauth`, dinamično registracijo, PKCE in stran za soglasje B1Admin `/oauth` (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` ponovno vstopi v sklad Express znotraj procesa, zato veljajo vsa pravila za dovoljenja in omejitve cerkva. → **[Strežnik MCP](../api/mcp)**

### Ponudniki vsebine

Vhodna pot vsebine v ločenem paketu `Packages/content-providers` (`@churchapps/content-providers`), ne v API-ju. Vsak ponudnik implementira vmesnik `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions` in kljuke za avtentikacijo — in se samodejno vpiše v register `Map` (`src/providers/registry.ts`). Tu je **B1 odjemalec OAuth**: ponudnik deklarira `AuthType` kot `none`, `oauth_pkce`, `device_flow` ali `form_login`, skupni pomočniki (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) pa na odjemalski strani izvedejo PKCE ali tok naprave z zunanjim virom. Danes je na voljo enajst ponudnikov — med njimi Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church in B1.church — ki napajajo FreePlay in aplikacije B1. → **[FreePlay ponudnik vsebine](../freeplay-content-provider)**

**Letni načrti** potekajo po tej poti. Izdajatelj učnega gradiva (z `lessons.edit`) vzdržuje urejena zaporedja tednov 1/2/3 v skrbniškem vmesniku Lessons.church (tabeli `yearPlans` in `yearPlanWeeks` v `LessonsApi`, z neobveznim `startMonth` in `anchor` za posamezen teden: `easter` ali `christmas`); `GET /yearPlans/public` v LessonsApi javno streže aktivne načrte, pri čemer vsakemu tednu napolni program/študijo/lokacijo iz drevesa lekcij. Možnost **Serving → Plans → Schedule Lesson → Apply Year Plan** v B1Admin uporabi to končno točko in zapiše en načrt DoingApi za vsak vključeni teden (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Načrti z `startMonth` razrešijo vezane tedne glede na izbrano leto (velika noč po gregorijanskem računu, božič kot nedelja na ali pred 25. decembrom) in zapolnijo vmes ležeče obdobje; načrti brez `startMonth` še vedno preslikajo teden N na `startDate + (N−1)×7` dni. Tedni iz zunanjih ponudnikov OLF ali z nepopolno potjo se ob uveljavitvi preskočijo; cerkve rezultirajoče načrte urejajo kot vsak drug, FreePlay pa predvaja tisto, kar je na načrtu.

## Povzetek

| Površina | Mehanizem avtentikacije | Smer | Kje je implementirano | Referenca |
|---|---|---|---|---|
| REST API | `Bearer` JWT ali ključ `cak_…` | Vhodna | `Api/src/modules/*` | [API ključi](../api/api-keys) |
| API ključi | Zgoščen žeton `cak_` (SHA-256) | Poverilnica | `Api/.../membership/controllers/ApiKeyController.ts` | [API ključi](../api/api-keys) |
| OAuth 2.0 / Povezane aplikacije | Koda za avtorizacijo (PKCE) · naprava · osvežitev → JWT; dinamična registracija odjemalca | Vhodna | `Api/.../membership/controllers/OAuthController.ts` | [Povezane aplikacije](../api/connected-apps) |
| Webhooki | Skrivnost za vsak hook, podpis HMAC-SHA256 | Odhodna | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooki](../api/webhooks) |
| Strežnik MCP | `Bearer` JWT, JWT OAuth (odkrit prek `/.well-known`) ali ključ `cak_…` | Vhodna (AI) | `Api/src/modules/mcp/` | [Strežnik MCP](../api/mcp) |
| Ponudniki vsebine | Po ponudniku: brez / OAuth PKCE / naprava / obrazec | Vhodna vsebina | `Packages/content-providers/` | [Ponudnik vsebine](../freeplay-content-provider) |

## Vnaprej pripravljeni konektorji

Namesto da bi vsi gradili od začetka, ChurchApps ponuja konektorje na zgoraj navedenih površinah:

- **[Slack in Discord](/docs/b1-admin/integrations/slack-discord)** — vrsta konektorja `connectorType` za webhook preoblikuje standardni ovoj v sporočilo za klepet; v celoti se nastavi v B1Admin, brez računa pri tretji osebi.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — vrsta konektorja `mailchimp`, ki sinhronizira osebe v občinstvo Mailchimp in preslika členstvo v skupinah/seznamih v oznake (`Api/src/shared/webhooks/MailchimpConnector.ts`). Za razliko od konektorjev za klepet za vsak dogodek pošlje lastne overjene zahteve (upsert/arhiviranje/oznake), namesto da bi objavil na URL, ki ga poda cerkev; ključ API in ID občinstva sta šifrirana v `webhooks.connectorConfig`. Enosmerno, samo standardna polja za združevanje.
- **[Zapier](/docs/b1-admin/integrations/zapier)** in **[Make](/docs/b1-admin/integrations/make)** — sprožita se ob dogodkih webhooka in delujejo prek REST API-ja; ob vklopu Zap/scenarija sami registrirata svoj webhook (potreben je ključ s `settings:write`). Izvorna koda aplikacije Zapier je v repozitoriju `Integrations` pod `zapier/` (Zapier CLI, objavljena z `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — dodatek, overjen z API ključem, ki na zahtevo izvozi podatke o osebah / darilih / skupinah / obiskih.
- **[Claude](/docs/b1-admin/integrations/claude)** in **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — odjemalca MCP, usmerjena na `/mcp`.

Za lastno kodo **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) vse to ovije: tipiziran odjemalec REST, odjemalec OAuth (koda za avtorizacijo / osvežitev / tok naprave) in preverjevalnik webhookov HMAC z vmesno programsko opremo za Express.

## Povezane strani

- [API ključi](../api/api-keys) — najpreprostejša poverilnica in katalog področij
- [Povezane aplikacije in OAuth](../api/connected-apps) — tokovi soglasja za večnajemniške aplikacije
- [Webhooki](../api/webhooks) — sistem odhodnih dogodkov
- [Strežnik MCP](../api/mcp) — ovoj za integracijo z umetno inteligenco
- [FreePlay ponudnik vsebine](../freeplay-content-provider) — postati vhodni vir vsebine
- [Integracije (za končne uporabnike)](/docs/b1-admin/integrations/) — vodniki za nastavitev vnaprej pripravljenih konektorjev

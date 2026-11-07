---
title: "Entegrasyon ve Genişletme Yüzeyi"
description: "ChurchApps B1'e bağlanmanın tüm yolları: REST API, API anahtarları, OAuth, webhook'lar, MCP ve içerik sağlayıcıları; her biri için başvuru bağlantılarıyla."
---

# Entegrasyon ve Genişletme Yüzeyi

<div class="article-intro">

Üçüncü taraf uygulamaların bağlanabileceği her şey tek bir API ve tek bir yetkilendirme modeli üzerinden çalışır. Bu sayfa bir haritadır: her entegrasyon yüzeyini adlandırır, bunların nasıl bağlandığını gösterir ve her biri için ayrıntılı başvuru sayfalarına bağlantı verir. B1 için bir şey geliştiriyorsanız, doğru kapıyı seçmek için buradan başlayın, ardından konuyu ayrıntılı olarak anlatan sayfaya geçin.

</div>

## Yüzeylere Genel Bakış

Sisteme giriş ve çıkış için altı yol vardır ve hepsi aynı kimlik doğrulama katmanını paylaşır:

- **[REST API](../api/api-keys.md)** — Ürünün tüm yüzeyi; herhangi bir dilden taşıyıcı (bearer) belirteciyle çağrılabilir.
- **[API anahtarları](../api/api-keys.md)** — En basit kimlik bilgisi: tek bir kişiye ve tek bir kiliseye bağlı bir `cak_…` belirteci.
- **[OAuth 2.0 ve Bağlı Uygulamalar](../api/connected-apps.md)** — Çok kiracılı uygulamalar için kilise bazında onay; bir kullanıcının aldığı JWT ile aynı JWT'yi üretir.
- **[Webhook'lar](../api/webhooks.md)** — İmzalı, kalıcı olarak teslim edilen giden olaylar.
- **[MCP sunucusu](../api/mcp.md)** — `/mcp` adresinde REST API'nin yapay zekaya yönelik bir sarmalayıcısı.
- **[İçerik sağlayıcıları](../freeplay-content-provider.md)** — Harici medya kütüphanelerinin FreePlay ve B1 uygulamalarına gelen giriş yolu.

İçerik sağlayıcıları dışındaki her şey, modülleri kararlı temel yollar altında bağlanan tek bir monolitik API ([Api](https://github.com/ChurchApps/Api) deposu) tarafından sunulur: `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` ve `/mcp`.

## Parçaların Birlikte Çalışması

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

Bu şema üç oktan oluşur: Üçüncü taraf bir uygulama taşıyıcı belirteciyle (API anahtarı veya OAuth JWT, `/mcp` üzerinden dahil) **içeri çağrı yapar**; API imzalı webhook'lar aracılığıyla **dışarı geri çağrı yapar**; içerik sağlayıcıları ise B1'in kendisinin harici bir kaynaktan medya çeken OAuth *istemcisi* olduğu tek **içeri gelen içerik** yoludur.

## Ortak Kimlik Doğrulama Modeli

Her kimlik bilgisi — kullanıcının giriş JWT'si, bir OAuth erişim belirteci veya bir API anahtarı — **aynı `Principal`** nesnesine çözümlenir ve aynı şekilde denetlenir. Ayrı bir "entegrasyon kimlik doğrulama" yolu yoktur; kapsamlı bir kimlik bilgisi, daha düşük ayrıcalıklı bir kullanıcıdan ayırt edilemez.

### JWT yapısı

B1 erişim belirteçleri, `Api/src/modules/membership/auth/AuthenticatedUser.ts` içinde üretilen HS256 JWT'lerdir. Talep (claim) kümesi şöyledir:

| Talep | Anlamı |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Belirteç sahibi kişi |
| `churchId` | Bu belirtecin işlem yaptığı tek kilise — tüm veri kapsamlandırmasının dayanağı |
| `personId` | O kilise içindeki kişi kaydı |
| `permissions` | RBAC izin dizgilerinin düz dizisi (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Grup üyeliği / liderliği; grup kapsamlı denetimler için |
| `membershipStatus` | Misafir ya da üye ayrımı; self-service erişim kontrolü için |

Bir OAuth erişim belirteci, bir giriş JWT'siyle bit bit aynı yapıdadır — tek fark, `permissions` dizisinin imzalanmadan önce verilen kapsamlardan **süzülmüş** olmasıdır (`getCombinedApiJwt(...)`).

### Kilise bazında kapsamlandırma

`churchId` bir istek parametresi değil, bir belirteç talebidir; bu yüzden bir kimlik bilgisi kiliseler arasında erişemez. Her depo sorgusu çağıranın `churchId` değerine göre filtrelenir; bir API anahtarı veya OAuth belirteci, üretildiği anda tam olarak bir kiliseye bağlanır.

### Sınırda rol tabanlı izinler

Denetleyiciler, belirtecin `permissions` dizisine karşı `au.checkAccess(contentType, action)` çağrısıyla eylemleri kapılar. Kapsamlar bir **filtredir, asla bir yetki vermez** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG`, her kapsamı (ör. `people:read`, `donations:write`) izin verdiği RBAC çiftlerine eşler ve `filterPermissionsByScopes()` her çözümlemede bunu kişinin *mevcut* izinleriyle kesiştirir. Sonuçları şunlardır:

- B1Admin'de bir izni iptal etmek, kimlik bilgisinin erişimini bir sonraki istekte keser — belirteçler asla rolden sapmaz.
- Bir kapsam yalnızca izinleri *kaldırabilir*; dolayısıyla kapsamlı bir kimlik bilgisi sunucu / alan yöneticiliği düzeyine yükselemez (bu izinler bilerek hiçbir kapsama eşlenmemiştir).
- API anahtarları `cak_` önekini taşır; `CustomAuthProvider.getUser()` bu öneki kontrol eder, gizli anahtarı karma (hash) yapar ve her çağrıda anahtarın sahibi kişinin canlı RBAC izinlerini yeniden çözümler.

Tam kapsam listesi için [API Anahtarları → Kapsamlar](../api/api-keys.md#scopes) bölümüne bakın.

## Yüzey Başvurusu

### REST API

Ürünün tam yüzeyidir. Kimlik doğrulaması yapılmış her uç nokta, `Authorization: Bearer` başlığında bir JWT veya `cak_…` API anahtarı kabul eder — yalnızca anahtara ya da yalnızca OAuth'a ayrılmış ayrı bir yol tablosu yoktur. Modüller ve temel yolları `Api/src/modules/*` altında bulunur.

### API anahtarları

**B1Admin → Settings → Developer → API Keys** bölümünde oluşturulan bir `cak_<prefix>.<secret>` kişisel erişim belirtecidir. Yalnızca SHA-256 karması saklanır; ham anahtar bir kez gösterilir. `/membership/apiKeys` adresinde yönetilir (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Tek bir kilisenin kendi betikleri ve Zapier, Make ve Google Sheets gibi bağlayıcılar için en uygunudur. → **[API Anahtarları](../api/api-keys.md)**

### OAuth 2.0 ve Bağlı Uygulamalar

Her kilisenin onay vermesi gereken çok kiracılı uygulamalar içindir. `/membership/oauth` altında `Api/src/modules/membership/controllers/OAuthController.ts` içinde uygulanmıştır. Sunucu üç izin türünü (grant) destekler:

- **Authorization Code** — `POST /oauth/authorize` (kimlik doğrulamalı) kısa ömürlü bir kod döndürür; `grant_type=authorization_code` ile `POST /oauth/token` bu kodu bir erişim JWT'sine (≈ 7 gün) ve bir yenileme belirtecine (≈ 90 gün) çevirir. Gizli anahtarsız (public) istemciler PKCE (yalnızca `S256`) kullanmak zorundadır: yetkilendirmede bir `code_challenge` ve belirteç değişiminde eşleşen `code_verifier`.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` bir `user_code` üretir; kullanıcı bunu B1Admin'de (`/oauth/device/approve`) onaylar; cihaz device-code izni ile `/oauth/token` adresini sorgular. Tarayıcısı olmayan TV'ler, kiosklar ve CLI'lar içindir.
- **Refresh Token** — `grant_type=refresh_token` yeni bir erişim belirteci üretir; gizli anahtarsız (public) istemciler gizli anahtarı atlayabilir.

Gizli anahtarsız istemciler `POST /oauth/register` ile (RFC 7591 dinamik istemci kaydı) kendilerini de kaydedebilir; bir `client_id` alırlar, gizli anahtarları olmaz ve yönlendirme URI'leri `https` veya loopback olmak zorundadır.

**Bağlı Uygulama**, bir kilise yöneticisinin verilmiş bir belirteci gördüğü görünümdür; `/membership/oauth/connections` adresinde listelenir ve iptal edilebilir. Denetleyici ayrıca, tarayıcısı olmayan bir cihazın *harici* bir sağlayıcıya karşı oturum açmasını sağlayan bir OAuth **relay-session** köprüsünü (`/oauth/relay/*`) da barındırır. → **[Bağlı Uygulamalar ve OAuth](../api/connected-apps.md)**

### Webhook'lar

Tek giden yüzeydir. Bir kilise, olaylara abone olmak için herkese açık bir HTTPS uç noktası kaydeder; eşleşen bir değişiklik olduğunda `WebhookDispatcher.emit(churchId, event, payload)` yalnızca kimlik içeren yükleri görünen adlarla zenginleştirir (`personName`, `groupName`, `formName` — aramalar yalnızca bir abonelik eşleştiğinde çalışır), bir teslimat kaydeder ve arka plandaki bir işçi, yeniden deneme/geri çekilme ve yeniden teslimle birlikte imzalı bir JSON zarfını POST eder. Motor `Api/src/shared/webhooks/` altında, kilise bazında CRUD işlemleri ise `/membership/webhooks` altında (`WebhookController.ts`) bulunur. Bir `connectorType` alanı, Slack ve Discord için gövdeyi yeniden biçimlendirir; `mailchimp` bağlayıcısı ise tüm HTTP alışverişini üstlenir (Mailchimp API'sine olay başına yöntem/URL/kimlik doğrulama ile; kimlik bilgileri `webhooks.connectorConfig` içinde şifreli tutulur). → **[Webhook'lar](../api/webhooks.md)**

### MCP sunucusu

`/mcp` adresinde (`Api/src/modules/mcp/`) bir yapay zekaya yönelik sarmalayıcıdır. Üç genel araç — `list_endpoints`, `describe_endpoint` ve `api_call` — tüm REST yüzeyini herhangi bir MCP istemcisine dinamik olarak sunar. Kimlik doğrulama, diğer her şeyle aynı taşıyıcı belirtecidir. OAuth ile oturum açan istemciler (claude.ai özel bağlayıcıları) için `/mcp` adresinden gelen 401 yanıtı, `/.well-known/oauth-protected-resource` adresine işaret eden bir `WWW-Authenticate` başlığı taşır; `/.well-known/oauth-authorization-server` ise `/membership/oauth` uç noktalarını, dinamik kaydı, PKCE'yi ve B1Admin `/oauth` onay sayfasını duyurur (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call`, Express yığınına süreç içinde yeniden girer; böylece her izin ve kilise kapsamlandırma kuralı yine uygulanır. → **[MCP Sunucusu](../api/mcp.md)**

### İçerik sağlayıcıları

İçeri gelen içerik yoludur; API'den ayrı olan `Packages/content-providers` (`@churchapps/content-providers`) paketinde bulunur. Her sağlayıcı `IProvider` arayüzünü (`src/interfaces.ts`) uygular — `browse`, `getPlaylist`, `getInstructions` ve kimlik doğrulama kancaları — ve kendini `src/providers/registry.ts` içindeki bir `Map` kaydına ekler. Burada **B1 OAuth istemcisidir**: bir sağlayıcı `none`, `oauth_pkce`, `device_flow` veya `form_login` türünde bir `AuthType` bildirir ve paylaşılan yardımcılar (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) harici kaynağa karşı istemci tarafı PKCE / device akışını çalıştırır. Bugün on bir sağlayıcı yayımlanmıştır — Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church ve B1.church dahil — ve bunlar FreePlay ile B1 uygulamalarına içerik besler. → **[FreePlay İçerik Sağlayıcısı](../freeplay-content-provider.md)**

**Yıl planları** bu yol üzerinden işler. Bir müfredat yayıncısı (`lessons.edit` yetkisiyle) Lessons.church yönetim panelinde sıralı 1., 2. ve 3. hafta dizilerini tutar (`LessonsApi` tabloları `yearPlans` ve `yearPlanWeeks`, isteğe bağlı `startMonth` ve hafta başına `easter` / `christmas` değerinde bir `anchor` ile); LessonsApi üzerindeki `GET /yearPlans/public` canlı planları anonim olarak sunar ve her haftanın program/çalışma/mekân bilgisini ders ağacından doldurur. B1Admin'in **Serving → Plans → Schedule Lesson → Apply Year Plan** akışı bu uç noktayı tüketir ve dahil edilen her hafta için bir DoingApi planı yazar (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). `startMonth` içeren planlar, sabitlenmiş haftaları seçilen yıla göre çözer (Paskalya Gregoryen computus ile, Noel ise 25 Aralık'a eşit veya ondan önceki Pazar olarak) ve aralarındaki haftaları doldurur; `startMonth` içermeyen planlar ise yine de N. haftayı `startDate + (N−1)×7` gün olarak eşler. Harici OLF sağlayıcılarından gelen veya yolu eksik haftalar uygulama anında atlanır; kiliseler ortaya çıkan planları diğerleri gibi düzenler ve FreePlay, plana ne konduysa onu oynatır.

## Özet

| Yüzey | Kimlik doğrulama mekanizması | Yön | Nerede uygulanır | Başvuru |
|---|---|---|---|---|
| REST API | `Bearer` JWT veya `cak_…` anahtarı | Giriş | `Api/src/modules/*` | [API Anahtarları](../api/api-keys.md) |
| API anahtarları | SHA-256 ile karmalanmış `cak_` belirteci | Kimlik bilgisi | `Api/.../membership/controllers/ApiKeyController.ts` | [API Anahtarları](../api/api-keys.md) |
| OAuth 2.0 / Bağlı Uygulamalar | Yetkilendirme kodu (PKCE) · cihaz · yenileme → JWT; dinamik istemci kaydı | Giriş | `Api/.../membership/controllers/OAuthController.ts` | [Bağlı Uygulamalar](../api/connected-apps.md) |
| Webhook'lar | Kanca başına gizli anahtar, HMAC-SHA256 imzası | Çıkış | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhook'lar](../api/webhooks.md) |
| MCP sunucusu | `Bearer` JWT, OAuth JWT (`/.well-known` üzerinden keşfedilen) veya `cak_…` anahtarı | Giriş (yapay zeka) | `Api/src/modules/mcp/` | [MCP Sunucusu](../api/mcp.md) |
| İçerik sağlayıcıları | Sağlayıcıya göre: yok / OAuth PKCE / cihaz / form | Giriş içeriği | `Packages/content-providers/` | [İçerik Sağlayıcısı](../freeplay-content-provider.md) |

## Hazır Bağlayıcılar

Herkesin sıfırdan geliştirmesi yerine ChurchApps, yukarıdaki yüzeylerin üzerine bağlayıcılar sunar:

- **[Slack ve Discord](/docs/b1-admin/integrations/slack-discord)** — Bir webhook `connectorType` değeri, standart zarfı bir sohbet mesajına dönüştürür; tamamen B1Admin içinde yapılandırılır, üçüncü taraf hesabı gerekmez.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — İnsanları bir Mailchimp kitlesine eşitleyen ve grup/liste üyeliğini etiketlere eşleyen bir `mailchimp` connectorType (`Api/src/shared/webhooks/MailchimpConnector.ts`). Sohbet bağlayıcılarının aksine, kilisenin verdiği bir URL'ye POST yapmak yerine her olay için kendi kimliği doğrulanmış isteklerini (ekleme/güncelleme, arşivleme, etiketleme) gönderir; API anahtarı ve kitle kimliği `webhooks.connectorConfig` içinde şifreli tutulur. Tek yönlüdür ve yalnızca standart birleştirme alanlarını kullanır.
- **[Zapier](/docs/b1-admin/integrations/zapier)** ve **[Make](/docs/b1-admin/integrations/make)** — Webhook olaylarında tetiklenir ve REST API üzerinden işlem yapar; bir Zap/senaryo açıldığında kendi webhook'larını kaydeder (`settings:write` kapsamlı bir anahtar gerekir). Zapier uygulamasının kaynak kodu `Integrations` deposunda `zapier/` altında bulunur (Zapier CLI, `zapier push` ile dağıtılır).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — API anahtarıyla kimlik doğrulayan bir eklenti; Kişiler / Bağışlar / Gruplar / Katılım verilerini istek üzerine dışa aktarır.
- **[Claude](/docs/b1-admin/integrations/claude)** ve **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — `/mcp` adresine yönlendirilmiş MCP istemcileri.

Kendi kodunuz için **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) bunların tümünü sarmalar: tipli bir REST istemcisi, bir OAuth istemcisi (yetkilendirme kodu / yenileme / cihaz akışı) ve Express ara katmanı içeren bir HMAC webhook doğrulayıcısı.

## İlgili Sayfalar

- [API Anahtarları](../api/api-keys.md) — En basit kimlik bilgisi ve kapsam listesi
- [Bağlı Uygulamalar ve OAuth](../api/connected-apps.md) — Çok kiracılı onay akışları
- [Webhook'lar](../api/webhooks.md) — Giden olay sistemi
- [MCP Sunucusu](../api/mcp.md) — Yapay zeka entegrasyon sarmalayıcısı
- [FreePlay İçerik Sağlayıcısı](../freeplay-content-provider.md) — Giriş içerik kaynağı olmak
- [Entegrasyonlar (son kullanıcı)](/docs/b1-admin/integrations/) — Hazır bağlayıcı kurulum kılavuzları

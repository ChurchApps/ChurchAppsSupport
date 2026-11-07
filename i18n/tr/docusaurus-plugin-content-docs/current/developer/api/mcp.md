---
title: "MCP Sunucusu"
---

# MCP Sunucusu

<div class="article-intro">

B1 API, `/mcp` adresinde bir [MCP (Model Context Protocol)](https://modelcontextprotocol.io) sunucusu içerir. claude.ai özel bağlayıcıları, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor veya kendi geliştirdiğiniz istemci gibi MCP destekli herhangi bir yapay zekâ istemcisi bu sunucuya bağlanabilir ve kimliği doğrulanmış bir kilise kullanıcısı adına temel REST API'yi çağırabilir. Bu, ince ve genel amaçlı bir sarmalayıcıdır: her uç noktayı tek tek modellemek yerine üç genel araç tüm API yüzeyini dinamik olarak sunar. Buna ek olarak web sitesi oluşturucu için bir alan kılavuzu aracı da bulunur.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- İstemcinin sahip olması gereken kapsamlara sahip bir [B1 API anahtarı](./api-keys) (`cak_…`) veya OAuth ile oturum açabilen bir MCP istemcisi (bkz. [OAuth Keşfi](#oauth-discovery))
- Erişilebilir bir B1 API sunucusu: barındırılan kiliseler için `https://api.churchapps.org` ya da kendi dağıtımınız
- Bir MCP istemcisi. Son kullanıcı kurulumu için [Claude](/docs/b1-admin/integrations/claude) ve [ChatGPT](/docs/b1-admin/integrations/chatgpt) sayfalarına bakın

</div>

## Uç Nokta

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Özellik | Değer |
|---|---|
| **Yol** | `/mcp` (API sunucusuna göre) |
| **Yöntem** | Yalnızca `POST` — istek/yanıt ve SSE akışı aynı uç noktada gerçekleşir |
| **Taşıma** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Oturum modeli** | Durumsuz. Her istek için yeni bir MCP sunucu örneği oluşturulur — oturum kimliği ve devam ettirme yoktur |
| **Kimlik doğrulama** | Bearer belirteci. `cak_…` API anahtarları ve B1 JWT'leri (OAuth erişim belirteçleri dahil) çalışır; çözümleme diğer kimlik doğrulamalı uç noktalarla aynıdır |

`Authorization` başlığı eksik veya geçersiz olan bir istek şu yanıtı döndürür:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

Yanıt HTTP 401 durum koduna ve `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"` başlığına sahiptir. OAuth destekleyen istemciler bu başlığı izleyerek oturum açmayı başlatır.

Barındırılan API'de (üretim ve demo), `/mcp` uç noktası diğer uç noktalar için kullanılan REST API yerine bir API Gateway HTTP API üzerinden sunulur. REST API, Lambda proxy yanıtlarında `WWW-Authenticate` başlığını `x-amzn-remapped-www-authenticate` olarak yeniden adlandırıyordu. Bu nedenle ChatGPT gibi istemciler yalnızca boş bir 401 yanıtı alıyor ve oturum açmayı başlatamıyordu. HTTP API ise bu başlığı değiştirmeden iletir.

## Araçlar

Üç genel araç ve bir kılavuz. Model, keşif için `list_endpoints`, bir yük yapısını öğrenmek için `describe_endpoint`, API'yi gerçekten çağırmak için `api_call` kullanır. İçerik web sitesiyle ilgiliyse `describe_page_builder` kullanılır.

### `list_endpoints`

Kayıtlı tüm REST rotalarının envanterini döndürür. İsteğe bağlı bir alt dize ve/veya HTTP fiili ile filtrelenebilir. Her kayıt, denetleyici adını ve büyük olasılıkla gereken API anahtarı kapsamlarını içerir.

**Girdi:**

| Alan | Tür | Açıklama |
|---|---|---|
| `filter` | string (isteğe bağlı) | Yola göre büyük/küçük harf duyarsız alt dize eşleşmesi, örneğin `"people"` |
| `method` | enum (isteğe bağlı) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Çıktı:** şu biçimde bir JSON belgesi:

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

Envanter, API başlatıldığında canlı rota tablosundan bir kez oluşturulur. `curl` ile erişebildiğiniz her şey burada görünür.

### `describe_endpoint`

Bir uç nokta için kısa bir özet ve mevcut olduğunda elle hazırlanmış bir istek gövdesi ile yanıt örneği döndürür.

**Girdi:**

| Alan | Tür | Açıklama |
|---|---|---|
| `method` | string | HTTP fiili |
| `path` | string | `list_endpoints` tarafından döndürülen tam yol |

**Çıktı:** özel olarak hazırlanmış uç noktalar için `summary`, `requestBody` ve `responseSample` alanlarını içeren bir örnek. Hazırlanmamış uç noktalar için ise modele şeklini görmek üzere önce `GET` çağrısı yapmasını söyleyen bir yedek mesaj döner. Yoğun trafik alan on iki kadar rota (kişiler, gruplar, bağışlar, katılım, fonlar) hazırlanmıştır.

### `api_call`

Seçilen REST uç noktasını sunucu içinde, normal bir HTTP isteğiyle aynı Express ara yazılım yığını üzerinden çağırır. Kimlik doğrulama, gövde ayrıştırma, denetim günlüğü ve kilise bazında kapsamlandırma uygulanır.

**Girdi:**

| Alan | Tür | Açıklama |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | `/membership/people` gibi modül önekini de içeren tam yol |
| `query` | object (isteğe bağlı) | Sorgu dizesi parametreleri için düz bir nesne |
| `body` | any (isteğe bağlı) | JSON istek gövdesi — genellikle `POST` için bir model nesneleri dizisi |

**Çıktı:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Durum kodu 400 veya üzeri olan her yanıt için araç sonucu `isError: true` olarak işaretlenir.

### `describe_page_builder`

Genel amaçlı olmayan tek araç budur. `/content/*` uç noktaları üzerinden web sitesi sayfaları oluşturmak için kendi kendine yeterli, statik bir kılavuzdur. Sayfa → Bölüm → Öğe veri modelini, oluşturma iş akışını, her `elementType` öğesini ve `answersJSON` yapısını, `dividerTop`/`dividerBottom` şekil ayırıcıları gibi bölüm düzeyindeki ayarları ve uçtan uca çalışan bir örneği açıklar. Girdi almaz ve B1Admin düzenleyicisinde tutulan öğe kataloğunu yansıtır (bkz. [Web Sitesi Oluşturucu Mimarisi](../architecture/website-builder)). Ajanların sayfa içeriği oluşturmadan veya düzenlemeden önce bu aracı bir kez çağırması, ardından `api_call` ile işlem yapması beklenir.

## Kimlik Doğrulama Modeli

MCP isteğinin kendisi `CustomAuthProvider.getUser()` üzerinden geçer. Bu, kimliği doğrulanmış her B1 uç noktasının kullandığı yoldur. Bir `cak_…` bearer belirteci, verilen kişinin mevcut RBAC izinleri ile anahtara verilen kapsamların **kesişimine** karşılık gelen bir `Principal` nesnesine çözümlenir. Bu kesişim her istekte yeniden hesaplanır, dolayısıyla:

- Bir anahtardan kapsam kaldırmak (anahtarı silip yeniden oluşturarak) erişimi bir sonraki çağrıda keser.
- B1Admin'de temel alınan kişiden bir izni kaldırmak, anahtar hâlâ mevcut olsa bile erişimi bir sonraki çağrıda keser.

İç içe `api_call` çağrılarında, özgün `Authorization` başlığı sahte isteğe kopyalanır. Böylece `CustomAuthProvider` yeniden çalışır ve kapsam kesişimi her çağrıda yeniden uygulanır. Belirteç önbellekleme yoktur.

## Yol Engelleme Listesi

Geçerli bir anahtar olsa bile bazı rotalara `api_call` ile erişilemez:

| Desen | Neden |
|---|---|
| `/giving/donate/webhook/*` | Sağlayıcı webhook uç noktaları, Stripe/PayPal'dan imza doğrulamalı ham gövdeler bekler — genel çağıranlar için değildir |
| `/membership/oauth/clients*` | OAuth istemci kaydı yalnızca operatöre aittir |
| `/membership/people/apiEmails` | Kullanıcı izinleriyle değil, operatör `jwtSecret` ile korunur |
| `multipart/form-data` bekleyen her rota | Dosya yüklemeleri JSON-RPC ile uyumlu değildir |

Engellenen bir yol, açıklayıcı bir mesajla `isError: true` içeren bir araç sonucu döndürür; temel rota hiçbir zaman çağrılmaz.

## Yanıt Boyutu Sınırı

Her `api_call` yanıt gövdesi, yakalanan çıktının en fazla **64 KB**'ı ile sınırlıdır. Bir sorgu bu sınırı aşarsa yanıtta `"truncated": true` bulunur ve modelin daha dar sorgu parametreleriyle yeniden denemesi beklenir. Bu, tek bir araç yanıtının istemcinin bağlam penceresini taşırmasını önler.

## Hız Sınırlama

`/mcp` üzerinde uygulama düzeyinde bir hız sınırı yoktur. Üretimde sınırlama API Gateway / Lambda eşzamanlılığına, kendi sunucunuzda barındırılan dağıtımlarda ise ters proxy'nizin uyguladığı kurallara bırakılmıştır.

## OAuth Keşfi

MCP sunucusu OAuth 2.1 meta verilerini yayınlar. Böylece yalnızca OAuth ile keşfedilen sunuculara bağlanan istemciler (özellikle Claude.ai'daki "Özel bağlayıcı ekle" arayüzü) kullanıcıyı yapıştırılmış bir anahtar olmadan oturum açtırabilir. `/mcp` korunan kaynaktır, `/membership/oauth` altındaki mevcut [OAuth sağlayıcısı](./connected-apps) yetkilendirme sunucusudur ve B1Admin `/oauth` sayfası onay ekranıdır.

| Uç nokta | Amaç |
|---|---|
| `GET /.well-known/oauth-protected-resource` (ayrıca `/.well-known/oauth-protected-resource/mcp`) | Korunan kaynak meta verileri (RFC 9728): `resource` değeri `<api>/mcp`, `authorization_servers` değeri API kökü, `scopes_supported` ise her [API anahtarı kapsamını](./api-keys#scopes) listeler |
| `GET /.well-known/oauth-authorization-server` | Yetkilendirme sunucusu meta verileri (RFC 8414): `authorization_endpoint` B1Admin `/oauth` adresidir, `token_endpoint` `/membership/oauth/token` adresidir, `registration_endpoint` ise `/membership/oauth/register` adresidir |
| `POST /membership/oauth/register` | Dinamik istemci kaydı (RFC 7591) |

claude.ai gibi bir istemcinin izlediği akış şöyledir:

1. Belirteç olmadan yapılan `POST /mcp` isteği, korunan kaynak meta verilerine işaret eden `WWW-Authenticate` başlığıyla 401 döndürür.
2. İstemci her iki meta veri belgesini okur, ardından `client_name`, `redirect_uris` ve isteğe bağlı olarak `scope` göndererek `POST /membership/oauth/register` ile kendini kaydeder. Kendi kendine kaydedilen her istemci **genel** (public) bir istemcidir: gizli anahtar verilmez ve yanıt `token_endpoint_auth_method: "none"` içerir. Yönlendirme URI'leri `https` olmalıdır; loopback adresleri (`localhost`, `127.0.0.1`, `[::1]`) için `http` kabul edilir. İstemci başına en fazla 10 URI tanımlanabilir. Kayıt işlemi IP başına saatte 20 ile sınırlıdır.
3. Kullanıcı, `code_challenge` ve `code_challenge_method=S256` parametreleriyle B1Admin `/oauth` sayfasına yönlendirilir. Onay sayfası istenen her kapsamı sade bir dille listeler (hiçbiri istenmemişse "B1 hesabınızın erişebildiği her şey"). Ayrıca kullanıcının geri döndürüleceği sunucuyu gösterir ve uygulamanın kendini kaydettiğini belirtir. Kullanıcı **Allow** (İzin Ver) düğmesine tıklar.
4. İstemci, `grant_type=authorization_code` ve kendi `code_verifier` değeriyle kodu `/membership/oauth/token` adresinde takas eder; daha sonra `grant_type=refresh_token` ile yeniler. Form kodlamalı ve JSON gövdeleri birlikte kabul edilir.
5. Ortaya çıkan erişim belirteci, kapsamlandırılmış bir B1 JWT'sidir ve `/mcp` üzerinde bearer olarak kullanılır.

PKCE kuralları: yalnızca `S256` kabul edilir. Gizli anahtarı olmayan bir istemci, yetkilendirme sırasında `code_challenge`, belirteç takasında ise eşleşen `code_verifier` göndermelidir. Gizli anahtarı olan gizli (confidential) istemciler yalnızca gizli anahtarı kullanabilir. Yönlendirme URI'leri, kayıtlı URI ile birebir eşleşmelidir.

Yapılandırmasında statik bir bearer belirteci kabul eden istemciler (Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, özel kod) bunun yerine bir `cak_…` anahtarı kullanmaya devam edebilir.

## Yerel Geliştirme

API yerel olarak çalıştırıldığında MCP uç noktası diğer her şeyle birlikte bağlanır:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Başlangıçta görünen `📡 MCP server ready at /mcp — N routes in inventory` günlük satırı, envanterin oluşturulduğunu doğrular.

MCP Inspector ile test edin:

```bash
npx @modelcontextprotocol/inspector
```

Inspector arayüzünde adresi `http://localhost:8084/mcp` olarak ayarlayın ve `Authorization` başlığını `Bearer cak_<prefix>.<secret>` olarak belirleyin. Önce `list_endpoints` çağırın; tam rota listesini görmelisiniz. Ardından `api_call({ method: "GET", path: "/membership/people" })` çağrısı yerel örnek kişilerinizi döndürmelidir.

## Kod Yapısı

MCP sunucusu Api deposunda `src/modules/mcp/` dizinindedir. Önemli dosyalar:

| Dosya | Amaç |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; her istek için `StreamableHTTPServerTransport` bağlar ve 401 yanıtlarında `WWW-Authenticate` questionunu gönderir |
| `WellKnownController.ts` / `OAuthMetadata.ts` | `/.well-known` OAuth keşif belgelerini sunar |
| `McpServer.ts` | Bir MCP `Server` oluşturur ve dört aracı kaydeder |
| `RouteInventory.ts` | Başlangıçta rotaları listelemek için inversify-express-utils meta verilerini tarar |
| `internalDispatch.ts` | Express uygulamasını sunucu içinde yeniden çalıştıran sahte `req`/`res` nesneleri |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Yoğun trafik alan uç noktalar için hazırlanmış istek/yanıt örnekleri |

## İlgili Sayfalar

- [API Anahtarları](./api-keys)
- [Webhook'lar](./webhooks)
- [Bağlı Uygulamalar (OAuth)](./connected-apps)
- [Claude — son kullanıcı kurulumu](/docs/b1-admin/integrations/claude)
- [ChatGPT — son kullanıcı kurulumu](/docs/b1-admin/integrations/chatgpt)

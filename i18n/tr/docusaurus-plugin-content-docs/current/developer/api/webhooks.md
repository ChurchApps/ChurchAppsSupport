---
title: "Webhook'lar"
description: "B1 Admin'de gerçek zamanlı webhook'lar kurun: uç noktaları kaydedin, olayları seçin, HMAC imzalarını doğrulayın ve başarısız yükleri yeniden gönderin."
---

# Webhook'lar

<div class="article-intro">

Webhook'lar, bir kilisenin gerçek zamanlı bildirimleri üçüncü taraf araçlara iletmesini sağlar — otomasyon platformları (Zapier, Make, n8n), CRM'ler, muhasebe sistemleri veya HTTP POST kabul eden herhangi bir araç. B1'de bir kişi, grup veya hane değiştiğinde, B1 o olaya abone olan her URL'ye imzalı bir JSON yükü gönderir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Webhook'ları **Kilise Ayarlarını Düzenle** iznine sahip bir kilise yöneticisi kaydeder ve yönetir
- Alıcı uç noktanız, herkese açık bir adreste **HTTPS** üzerinden erişilebilir olmalıdır
- İmzalama gizli anahtarını güvenli bir şekilde saklamanın bir yolunu hazırlayın — yalnızca bir kez gösterilir

</div>

## Genel Bakış

Webhook'lar yalnızca **giden** yöndedir: B1 sizin uç noktanızı çağırır, siz B1'i çağırmazsınız. Her webhook, bir hedef URL'den, bir imzalama gizli anahtarından ve abone olunan olayların listesinden oluşan kiliseye özgü bir aboneliktir.

Teslimat, **kalıcı bir gelen kutusu (outbox)** kullanır: abone olunan bir olay gerçekleştiğinde B1, bir teslimat kaydı oluşturur ve bir arka plan işçisi bunu yaklaşık bir dakika içinde POST eder. Başarısız teslimatlar, üstel geri çekilme ile yeniden denenir. Bir teslimat yavaş olsa veya uç noktanız kısa süreliğine kullanılamasa bile hiçbir şey kaybolmaz.

## Webhook Kaydetme

### B1Admin'de

**Ayarlar → Geliştirici → Webhook'lar → Yeni Webhook** bölümüne gidin. Bir ad, yük URL'si girin ve abone olmak istediğiniz olayları seçin. Kaydettiğinizde **imzalama gizli anahtarı yalnızca bir kez gösterilir** — hemen kopyalayın ve entegrasyonunuzla birlikte saklayın. Bir daha gösterilmez (daha sonra döndürebilirsiniz, ancak özgün anahtarı geri alamazsınız).

### API Üzerinden

Tüm uç noktalar Üyelik modülünün temel yolu `/membership/webhooks` altındadır ve `Settings / Edit` iznine sahip bir kilise yöneticisinin JWT'sini **veya `settings:write` kapsamıyla oluşturulmuş bir [API anahtarını](./api-keys.md)** gerektirir. Aynı rotalar her ikisini de kabul eder. Bu sayede bir Zap veya senaryo etkinleştirildiğinde Zapier ve Make, kilise adına webhook'ları kaydedebilir.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

Oluşturma yanıtı — ve **yalnızca** oluşturma yanıtı — `secret` alanını içerir:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Yöntem ve Yol | Amacı |
|---|---|
| `GET /membership/webhooks` | Kilisenin webhook'larını listeler (gizli anahtar çıkarılmış) |
| `GET /membership/webhooks/events` | Geçerli olay adlarının kataloğu |
| `GET /membership/webhooks/:id` | Tek bir webhook'u yükler |
| `POST /membership/webhooks` | Oluşturur (`id` olmadan) veya günceller (`id` ile) |
| `POST /membership/webhooks/:id/regenerate-secret` | İmzalama gizli anahtarını döndürür; yeni değeri yalnızca bir kez döndürür |
| `DELETE /membership/webhooks/:id` | Bir webhook'u siler |
| `GET /membership/webhooks/:id/deliveries` | Bir webhook için son teslimat denemeleri |
| `GET /membership/webhooks/deliveries/:deliveryId` | Tek bir teslimatın tam yükü ve yanıtı |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Bir teslimatı yeniden kuyruğa alır |

## Olay Kataloğu

Olay adları `{entity}.{action}` kalıbını izler. Güncel listeyi `GET /membership/webhooks/events` üzerinden alın.

| Olay | Tetiklendiği durum |
|---|---|
| `person.created` | Bir kişi eklendiğinde |
| `person.updated` | Bir kişi kaydı değiştirildiğinde |
| `person.destroyed` | Bir kişi silindiğinde |
| `household.created` | Bir hane eklendiğinde |
| `household.updated` | Bir hane değiştirildiğinde |
| `household.destroyed` | Bir hane silindiğinde |
| `group.created` | Bir grup eklendiğinde |
| `group.updated` | Bir grup değiştirildiğinde |
| `group.destroyed` | Bir grup silindiğinde |
| `group.member.added` | Bir kişi bir gruba eklendiğinde |
| `group.member.removed` | Bir kişi bir gruptan çıkarıldığında |
| `donation.created` | Bir bağış kaydedildiğinde — manuel giriş, çevrimiçi veya beklemede → tamamlandı geçişi |
| `donation.updated` | Bir bağış kaydı düzenlendiğinde |
| `attendance.recorded` | Bir ziyaret kaydedildiğinde (manuel giriş veya check-in) |
| `session.created` | Yeni bir katılım oturumu oluşturulduğunda (manuel olarak veya ilk check-in'de otomatik) |
| `form.submission.created` | Bir form gönderildiğinde |
| `event.created` | Bir takvim etkinliği eklendiğinde |
| `event.updated` | Bir takvim etkinliği düzenlendiğinde |
| `event.destroyed` | Bir takvim etkinliği silindiğinde |

## Yük Biçimi

Her teslimat, JSON gövdesi ve şu başlıklarla birlikte bir HTTP `POST` isteğidir:

| Başlık | Açıklama |
|---|---|
| `Content-Type` | Her zaman `application/json` |
| `X-B1-Event` | Olay adı, ör. `person.created` |
| `X-B1-Delivery-Id` | Bu teslimat denemesi için benzersiz kimlik — tekrarları ayıklamak için kullanın |
| `X-B1-Signature` | Ham gövdenin HMAC-SHA256 imzası (aşağıya bakın) |
| `X-B1-Timestamp` | İsteğin gönderildiği Unix epoch saniyesi |
| `User-Agent` | `B1-Webhooks/1.0` |

Gövde, değişen kaynağı küçük bir zarfa (envelope) sarar:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

`*.destroyed` olayları için `data` yalnızca silinen kaydın `id` ve `churchId` değerlerini içerir.

Yükleri diğer kayıtlara kimlikle başvuran olaylar, teslimat anında çözümlenen, insan tarafından okunabilir adları da taşır: grup üyeliği olaylarında `personName` ve `groupName`, katılım, bağış ve liste üyeliği olaylarında `personName`, `session.created` olayında `groupName`, ve `form.submission.created` olayında `formName` (ve gönderim bir kişiyle ilişkiliyse ayrıca `personName`).

## Bağlayıcı Türleri

Varsayılan teslimat biçimi yukarıdaki JSON zarfıdır — `connectorType: "standard"`. [Slack ve Discord](/docs/b1-admin/integrations/slack-discord) için aynı webhook motoru bunun yerine, bu hizmetlerin doğrudan kabul ettiği sohbet biçimli bir mesaj gönderir:

| `connectorType` | Gönderilen gövde | Ne zaman kullanılır |
|---|---|---|
| `"standard"` (varsayılan) | `{event, churchId, occurredAt, data}` zarfı, imzalı | Kendi entegrasyonunuzu yazıyorsanız veya Zapier / Make / özel bir sunucuya yönlendiriyorsanız |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Doğrudan bir Slack Gelen Webhook URL'sine gönderiyorsanız |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Doğrudan bir Discord kanal webhook URL'sine gönderiyorsanız |
| `"mailchimp"` | Yok — bağlayıcı Mailchimp'in API'sini kendisi çağırır | Barındıracak bir URL olmadan [kitle senkronizasyonu](/docs/b1-admin/integrations/services/mailchimp) istiyorsanız |

Bağlayıcı türü, webhook düzenleyicisindeki **Connector Type** açılır listesinden veya `POST /membership/webhooks` gövdesindeki `connectorType` ile ayarlanır. Slack/Discord teslimatları için imzalı `X-B1-Signature` başlığı yine de gönderilir (bunu zararsızca yok sayarlar), dolayısıyla bir webhook'u daha sonra `standard`'a geri çevirmek için yeniden imzalama gerekmez.

Slack ve Discord yalnızca gövde yeniden biçimlendirmeleridir — motor yine kilisenin verdiği URL'ye gönderir. `mailchimp`, kendi HTTP alışverişine sahip olan ilk bağlayıcıdır: her olay için Mailchimp'in API'sine kimlik doğrulamalı ekleme/arşivleme/etiketleme istekleri gönderir (`MailchimpConnector.deliver`) ve kimlik bilgileri (`{apiKey, audienceId}`) `webhooks.connectorConfig` içinde AES ile şifrelenmiş olarak saklanır; API üzerinden yalnızca yazılabilir. Mailchimp webhook'ları yalnızca kişi, grup üyesi ve liste üyesi olaylarını kabul eder; kaydetme rotası, API anahtarını ve kitleyi kabul etmeden önce Mailchimp'e karşı doğrular. Teslimat kayıtları standart zarfı saklar, böylece teslimat günlüğü B1'in gördüğünü ve Mailchimp'in yanıtını birlikte gösterir. Eşlenmemiş durumlar (e-postası olmayan kişi, eşlemesi olmayan olay), yeniden denemeleri tüketmek yerine `Skipped:` yanıt gövdesiyle başarılı olarak tamamlanır.

## Test Teslimatları

Her webhook düzenleyicisinde bir **Send Test Event** düğmesi bulunur — buna karşılık gelen API çağrısı `POST /membership/webhooks/:id/test`'tir. Test rotası, abone olunan ilk olay için sentetik bir yük oluşturur, bunu gerçek imzalı teslimat yolu üzerinden (ve Slack/Discord için `formatForConnector` üzerinden) eşzamanlı olarak gönderir ve `responseStatus` ve `responseBody` dahil olmak üzere ortaya çıkan teslimat kaydını döndürür. Entegrasyonu gerçekten açmadan önce bağlantıyı ve imza işlemesini doğrulamak için kullanın. `mailchimp` webhook'ları için test bunun yerine, saklanan kimlik bilgilerini Mailchimp API'sine karşı doğrular (sentetik bir olay, kilisenin gerçek kitlesine sahte bir abone yazardı) ve kayıt oluşturmadan teslimat biçiminde bir sonuç döndürür.

## İmzaları Doğrulama

Bir yüke güvenmeden önce her zaman `X-B1-Signature` başlığını doğrulayın. İmza, `sha256=` ile başlar ve ardından **ham istek gövdesinin** imzalama gizli anahtarınızla anahtarlanmış HMAC-SHA256 onaltılık değeri gelir. Ayrıştırılmış JSON'u yeniden serileştirmeyin — imzayı aldığınız baytlar üzerinden hesaplayın.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

İmzası eşleşmeyen her isteği reddedin. İsteğe bağlı olarak, tekrar oynatma (replay) penceresini sınırlamak için `X-B1-Timestamp` değeri birkaç dakikadan eski olan istekleri de reddedebilirsiniz.

## SDK Desteği

Node.js için `@churchapps/integration-sdk`, tipli bir doğrulayıcı ve ham gövde yakalama, imza kontrolü ve zarf ayrıştırmasını sizin yerinize yapan bir Express ara katmanı (middleware) sunar:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// JSON ayrıştırmadan önce ham gövdeyi yakalayın — imzanın yine de doğrulanabilmesi için gereklidir.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK ayrıca Express dışı çalışma zamanları (sunucusuz işlevler, Fastify vb.) için `WebhookVerifier.verify(secret, rawBody, signatureHeader)` fonksiyonunu sunar. Ayrıntılar için npm'deki pakete bakın.

## Teslimat ve Yeniden Denemeler

Uç noktanızın mümkün olduğunca hızlı bir `2xx` durum koduyla yanıt vermesi gerekir — ideal olarak işi işlemeden değil, yalnızca kuyruğa aldıktan sonra. `2xx` olmayan her yanıt, bir bağlantı hatası veya **10 saniyeden** yavaş bir yanıt, başarısız bir teslimat sayılır.

Başarısız teslimatlar, üstel geri çekilme ile yeniden denenir — **yaklaşık 5 gün içinde 16 deneme**. Aralık 1 dakikadan başlar, saatlere çıkar ve son denemelerde 3 günlük aralıklara kadar uzar. 16. başarısız denemeden sonra teslimat `exhausted` (tükenmiş) olarak işaretlenir ve terk edilir.

Teslimat **en az bir kez** (at-least-once) garantilidir: bir teslimat birden fazla kez ulaşabilir (örneğin uç noktanız başarılı olur ancak yanıt kaybolursa). Tekrarları ayıklamak için `X-B1-Delivery-Id` başlığını kullanın — her kimliği yalnızca bir kez işleyin ve tekrarları işlem yapılmayan adımlar olarak değerlendirin.

### Otomatik devre dışı bırakma

Bir webhook **üst üste üç tükenmiş teslimat** üretirse, B1 onu otomatik olarak devre dışı bırakır. Uç noktanızı düzeltin, ardından B1Admin'de webhook'u yeniden etkinleştirin (veya `"active": true` ile `POST /membership/webhooks` üzerinden).

## İnceleme ve Yeniden Teslim Etme

B1Admin'deki webhook düzenleyicisi bir **Son Teslimatlar** tablosu gösterir — olay, durum, deneme sayısı, yanıt kodu ve zaman damgası. Bir satıra seçtiğinizde, gönderilen tam yük ve geri gelen yanıt görüntülenir.

Geçmiş herhangi bir teslimatı özgün yüküyle yeniden kuyruğa almak için **Yeniden Teslim Et** (Redeliver) seçeneğini kullanın — uç noktanızdaki bir hatayı düzelttikten sonra veya uç noktanız kapalıyken kaçırdığı olayları geriye dönük olarak göndermek için kullanışlıdır.

## URL Gereksinimleri

Webhook URL'leri kilisenin verdiği adresler olduğundan, B1 sunucu taraflı istek sahteciliğine (SSRF) karşı korumalar uygular. Bir webhook URL'si — kayıt sırasında ve her teslimattan önce yeniden kontrol edilerek — şu durumlarda reddedilir:

- **`https`** kullanmıyorsa
- `localhost`, bir `.local` / `.internal` ana bilgisayar adına işaret ediyorsa veya
- **özel, loopback, link-local veya bulut meta veri** IP adresine çözümleniyorsa

Uç noktanız, herkese açık olarak erişilebilir bir HTTPS hizmeti olmalıdır.

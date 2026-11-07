---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Bağlantı kurun ChatGPT'yi kilisenizin B1 verilerine ve sade bir dille sorular sorun — yanıtlarını canlı kilise kayıtlarınızdan verir. B1 Admin'de birkaç adım gerektirecek işleri de yapmasını isteyebilirsiniz.

**Sorabileceğiniz bazı şeyler:**
- *"Geçen hafta katılan ama henüz bir küçük gruba atanmayan herkesi göster"*
- *"Bu ayki bağışları fona göre özetle"*
- *"En yeni üyelerimiz kimler ve onlarla ilgilendik mi?"*
- *"B1'de X'i nasıl yapacağımı anlayamıyorum — bana adım adım anlatabilir misin?"*

</div>

<div class="prereqs">
<h4>Neye İhtiyacınız Var</h4>

- Mac veya Windows için **ChatGPT masaüstü uygulaması**
- **Ücretli bir ChatGPT planı** (Plus veya daha üstü). Ücretsiz ChatGPT hesapları B1'e bağlanamaz.
- Kilise ayarlarını yönetme iznine sahip **B1 giriş bilgileriniz** (anahtar oluşturmak için gerekli). Bunlara sahip değil misiniz? Kilisenizin B1 yöneticisine sorun.

</div>

:::tip Önerilen: önce Claude'u deneyin — ücretsiz
[Claude](./claude), B1'e **ücretsiz planında** bağlanır ve 3 dakikadan kısa sürede kurulur — yalnızca B1'i bir bağlayıcı olarak ekleyin ve B1 hesabınızla oturum açın. Anahtar gerekmez. Kilisenizin bir şeye para ödemeden önce B1 ile yapay zekâyı denemesinin en kolay yolu budur.
:::

## Kurulum

Ekranlar ChatGPT'nin sürümünüzde biraz farklı görünebilir.

---

**Adım 1 — B1 anahtarınızı oluşturun**

Anahtar, ChatGPT'nin *kilisenizin* B1 hesabına erişmesini sağlar — yalnızca ChatGPT için bir şifre gibi düşünebilirsiniz.

1. [B1 Admin](https://admin.b1.church) hesabınıza giriş yapın ve [Ayarlar → Geliştirici](https://admin.b1.church/settings/developer) bölümüne gidin.
2. **API Keys** sekmesinde **New API Key** düğmesine tıklayın ve adını `ChatGPT` koyun.
3. **Kapsamlar:** ChatGPT'nin neler yapabileceğini işaretleyin. Her alanın bir **read** (yalnızca görüntüleme) ve bir **write** (değişiklik yapma) kutusu vardır. Emin değilseniz, başlangıç için yalnızca **read** kutularını işaretleyin.
4. **Save** düğmesine tıklayın, ardından anahtarı **Copy** ile kopyalayın (`cak_` ile başlar). Yalnızca bir kez gösterilir.

---

**Adım 2 — ChatGPT'de sol alttaki adınıza tıklayın**

![Profil adınıza tıklayın](/img/guides/chatgpt-mcp/01.png)

---

**Adım 3 — Settings'e tıklayın**

![Menüden Settings'e tıklayın](/img/guides/chatgpt-mcp/02.png)

---

**Adım 4 — Sol kenar çubuğunda Plugins'e tıklayın**

![Integrations altındaki Plugins'e tıklayın](/img/guides/chatgpt-mcp/03.png)

---

**Adım 5 — MCPs sekmesine tıklayın**

![MCPs sekmesine tıklayın](/img/guides/chatgpt-mcp/04.png)

Daha önce eklediğiniz MCP sunucularını burada görürsünüz.

---

**Adım 6 — Add → Add MCP server seçeneğine tıklayın**

![Add ardından Add MCP server'a tıklayın](/img/guides/chatgpt-mcp/06.png)

---

**Adım 7 — Formu doldurun ve Save'e tıklayın**

![Özel bir MCP'ye bağlanma formu](/img/guides/chatgpt-mcp/07.png)

**Streamable HTTP** seçeneğine tıklayın, ardından şunları doldurun:

| Alan | Girilecek değer |
|---|---|
| **Name** | `B1 Church` (veya istediğiniz başka bir ad) |
| **Type** | **Streamable HTTP** seçeneğine tıklayın |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Boş bırakın |
| **Headers** | **+ Add header** seçeneğine tıklayın → Key: `Authorization` → Value: aşağıya bakın |

![Key alanında Authorization, Value alanında Bearer anahtarı gösteren örnek form](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_anahtarınız` — Bearer kelimesi, bir boşluk ve ardından anahtarınız

**Save** düğmesine tıklayın.

Hepsi bu kadar! Bir sohbete dönün ve *"Kilisemizde kaç kişi var?"* gibi bir şey sorun; ChatGPT yanıtı doğrudan B1'den çekecektir.

---

## Güvenli mi?

- ChatGPT yalnızca **kendi kilisenizin** verilerini görebilir.
- Yalnızca anahtarınızın izin verdiği işlemleri yapabilir — yalnızca **read** kutuları işaretlenmiş bir anahtar yalnızca bakabilir, hiçbir şeyi değiştiremez.
- Kapatmak için B1 Admin'de **Ayarlar → Geliştirici** altından anahtarı silin. Erişim hemen durur.

## Maliyeti nedir?

B1 bağlantısı ücretsizdir — ChurchApps'in bir parçasıdır. ChatGPT'nin bağlanabilmesi için ücretli bir plan (Plus veya daha üstü) gerekir; OpenAI'nin fiyatlandırmasına bakın.

## Teknik Ayrıntılar

Bu sayfanın geri kalanı teknik kullanıcılar ve yapay zekâ asistanları içindir. B1'in MCP sunucusu `https://api.churchapps.org/mcp` adresinde (Streamable HTTP) çalışır ve API anahtarını `Authorization: Bearer cak_…` başlığı olarak kabul eder. [MCP Sunucusu geliştirici başvurusuna](/docs/developer/api/mcp) bakın.

### Eylemli Özel GPT

Özel bir GPT (Custom GPT), tüm ekibinizin paylaşabileceği özel bir asistan oluşturmanızı sağlar — ekip üyeleri bir bağlantıyı açar ve kendi taraflarında hiçbir kurulum yapmadan sorular sormaya başlar. ChatGPT Plus, Team veya Enterprise hesabı ve yaklaşık 10 dakika gerektirir.

#### 1. Bir API anahtarı oluşturun

Henüz yapmadıysanız, yukarıdaki Kurulum bölümünün 1. adımını izleyin.

#### 2. Özel GPT'yi oluşturun

1. ChatGPT'de profilinize tıklayın → **My GPTs** → **Create a GPT**.
2. **Configure** sekmesine geçin, GPT'ye bir ad verin (ör. "B1 Asistanı") ve talimatları ekleyin:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. **Actions** bölümüne gidin → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** `cak_…` anahtarınızı yapıştırın
   - **Auth Type:** Bearer
   - Kaydedin.

4. **Schema** kutusuna bu başlangıç OpenAPI belirtimini yapıştırın:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Eylemi kaydedin. Test edin: *"kilisede kaç kişi var?"* — ChatGPT `listPeople` işlevini çağırır ve yanıtlar.
6. GPT'yi **Publish** edin (Only me / Anyone with link / Organization) ve bağlantıyı ekibinizle paylaşın.

#### 3. Kullanın

Bağlantıya sahip herkes doğal dille sorular sorabilir. Anahtarın kapsamları yine geçerlidir — salt okunur bir anahtar, eylem şeması ne derse desin yazma işlemlerini reddeder.

---

### Güvenlik ve sınırlar

- **Kilise bazında yalıtım.** API anahtarı yalnızca tek bir kiliseye çözümlenir. ChatGPT diğer kiliselerin verilerini göremez.
- **İzne dayalı kapsam.** Anahtar yalnızca verdiğiniz kapsamları taşır. Bir kapsamı kaldırmak (anahtarı silip yeniden oluşturarak) bu erişimi bir sonraki çağrıda keser.
- **Anında iptal edilebilir.** **Settings → Developer → API Keys** altından anahtarı silin; erişim hemen sona erer.
- **Özel GPT paylaşmak, veriyi paylaşmak demektir.** GPT'ye erişimi olan herkes, anahtarın kapsamlarının izin verdiği her şeyi görebilir. Geniş çapta paylaşılan GPT'ler için daha dar kapsamları tercih edin (ör. `donations:read` eklemeyin).
- **Denetim izi.** ChatGPT üzerinden yapılan tüm değişiklikler, B1 Admin işlemleriyle aynı denetim günlüğünden geçer — **Settings → Audit Log** altında bulabilirsiniz.

### Sorun Giderme

**MCP bağlayıcısı "Unauthorized" diyor veya 401 hatası gösteriyor:** API anahtarınız eksik veya yanlış. Bağlayıcı ayarlarını açın ve **Authorization** başlığını kontrol edin: değer, `Bearer` kelimesi, bir boşluk ve ardından fazladan boşluk olmadan tam `cak_…` anahtarı olmalıdır.

**ChatGPT belirli verileri bulamadığını söylüyor:** Anahtarın doğru kapsamları olmayabilir. **Settings → Developer → API Keys** altında ek kapsamlarla yeni bir anahtar oluşturun ve bağlayıcıyı güncelleyin.

**Özel GPT eylemi 401 döndürüyor:** Eylemin kimlik doğrulama panelinde **Auth Type: Bearer** seçili olduğunu ve anahtarın içinde `Bearer` kelimesinin bulunmadığını doğrulayın (ChatGPT bunu otomatik ekler).

**Özel GPT eylemi 403 döndürüyor:** Anahtarın bu uç nokta için kapsamı yok. Doğru kapsamlarla yeni bir anahtar oluşturun ve GPT'yi güncelleyin.

**Eylem şeması reddediliyor:** ChatGPT, en az bir `paths` girdisi ve bir `servers` URL'si içeren OpenAPI 3.1 ister. Yapıştırmadan önce YAML'ı [editor.swagger.io](https://editor.swagger.io) üzerinde doğrulayın.

## İlgili

- [API Anahtarları](/docs/developer/api/api-keys) — tam kapsam başvurusu
- [MCP Sunucusu (geliştirici başvurusu)](/docs/developer/api/mcp) — protokol ayrıntıları ve araç şemaları
- [Claude](./claude) — Anthropic'in modelleri için aynı fikir
- [REST API başvurusu](/docs/developer/api/endpoints) — Özel GPT eyleminin çağırabileceği her uç nokta

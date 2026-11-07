---
title: "Claude"
---

# Claude

<div class="article-intro">

Claude'a kendi kilisenizi sade bir dille sorun; Claude, FreePlay derslerinizi ve sınıflarınızı da içeren B1 verilerinizden yanıt versin. *"Pazar günü kaç ilk kez gelen ziyaretçi vardı?"* ya da *"bu ay hangi küçük gruba katılım oldu?"* gibi sorular sorabilir, hatta *"web sitemize Etkinlikler adında yeni bir sayfa ekle"* gibi işlemler yaptırabilirsiniz. Kurulum 3 dakikadan kısa sürer ve herhangi bir yazılım kurmak ya da teknik bilgi gerektirmez.

</div>

<div class="prereqs">
<h4>Neler Gerekli</h4>

- **Bir Claude hesabı.** **Ücretsiz plan çalışır** ve denemek için iyi bir yoldur. Ancak ücretsiz hesaplarda günlük mesaj sınırı vardır ve B1'de bilgi sorgulamak mesaj hakkını hızla tüketir. Bu yüzden düzenli kullanacaksanız **Claude Pro** (ayda yaklaşık 20 $) öneriyoruz.
- **B1 giriş bilgileriniz**; B1 Admin'e girerken kullandığınız bilgilerle aynı.

</div>

:::tip Önerilen — denemesi ücretsiz
Claude, B1'i yapay zekâya bağlamanın en kolay yoludur ve **ücretsiz plan**da çalışır. Kilisenizin herhangi bir ücret ödemeden denemesi için mükemmel bir seçenektir.
:::

İki şekilde bağlanabilirsiniz. **Seçenek 1 en kolay olanıdır**; anahtar gerekmez ve bir şey kurmanız gerekmez.

## Seçenek 1 — B1 ile oturum açın (en kolay)

Claude web sitesinde, Claude masaüstü uygulamasında ve Claude telefon uygulamasında çalışır. Bir kez kurun, hepsinde kullanılabilir.

### Adım 1 — Claude bağlayıcı ayarlarını açın

1. [claude.ai](https://claude.ai) adresine gidin ve oturum açın (ya da ücretsiz bir hesap oluşturun).
2. Sol alt köşedeki adınıza tıklayın, ardından **Ayarlar** → **Bağlayıcılar** seçeneğine gidin.

### Adım 2 — B1'i ekleyin

1. **Ekle**, ardından **Özel bağlayıcı ekle** seçeneğine tıklayın.
2. **Ad:** alanına `B1` yazın.
3. **URL:** alanına `https://api.churchapps.org/mcp` adresini yapıştırın.
4. Diğer seçenekleri olduğu gibi bırakın ve **Ekle** düğmesine tıklayın.

### Adım 3 — B1'de oturum açın

1. **Bağlan** düğmesine tıklayın. Bir B1 oturum açma sayfası açılır.
2. B1 hesabınızla giriş yapın. Birden fazla kiliseye bağlıysanız, en üstte doğru kilisenin gösterildiğinden emin olun.
3. B1, Claude'un neyi yapmak istediğini listeler ve **claude.ai** adresine geri döneceğinizi onaylar. **İzin ver** düğmesine tıklayın.

Claude'a geri dönersiniz ve B1'in bağlı olduğunu görürsünüz.

### Adım 4 — Bir şey sorun

**Yeni bir sohbet** başlatın ve şunlardan birini deneyin:

- *"Kilisemizde kaç kişi var?"*
- *"Aktif grupları listele."*
- *"Bu ayki bağışları fona göre özetle."*
- *"Son 30 günde kiliseye kim katıldı?"*

İlk seferde Claude, B1'i kullanma izni ister. **İzin ver** düğmesine tıklayın.

## Seçenek 2 — B1 anahtarıyla masaüstü uzantısı

Claude'a sınırlı izinlerle (örneğin yalnızca okuma) bir anahtar vermek istiyorsanız bunu kullanın. Mac veya Windows için Claude masaüstü uygulamasında çalışır ve anahtar oluşturmak için B1'de kilise ayarlarını yönetme iznine sahip olmanız gerekir.

### Adım 1 — Claude uygulamasını edinin

Claude uygulamasını [claude.com/download](https://claude.com/download) adresinden indirin, kurun, açın ve oturum açın.

### Adım 2 — B1 anahtarınızı oluşturun

Anahtar, Claude'un *sizin* kilisenizin B1'ine girmesini sağlar. Yalnızca Claude için bir parola gibi düşünebilirsiniz.

1. [B1 Admin](https://admin.b1.church) adresine giriş yapın ve [Ayarlar → Geliştirici](https://admin.b1.church/settings/developer) bölümüne gidin.
2. **API Anahtarları** sekmesinde **Yeni API Anahtarı** düğmesine tıklayın.
3. **Ad:** alanına `Claude` yazın.
4. **Kapsamlar:** Claude'un neler yapabileceğini işaretleyin. Her alanın bir **okuma** kutusu (yalnızca görüntüleme) ve bir **yazma** kutusu (değişiklik yapma) vardır. Emin değilseniz, başlangıç için yalnızca **okuma** kutularını işaretleyin. Daha sonra daha fazla izinli yeni bir anahtar oluşturabilirsiniz.
5. **Kaydet** düğmesine tıklayın, ardından anahtarı **Kopyala**. Anahtar yalnızca bir kez gösterilir, bu yüzden hemen Adım 3'e geçin.

### Adım 3 — Claude'a B1 ekleyin

1. [B1 uzantısını indirin](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. İndirilen dosyaya (`b1-churchapps.mcpb`) **çift tıklayın**. Claude açılır ve **B1 (ChurchApps)** seçeneğini gösterir.
3. **Kur** düğmesine tıklayın.
4. **B1 API anahtarınızı** istediğinde, Adım 2'deki anahtarı yapıştırın ve kaydedin.
5. **Claude'u tamamen kapatın** (Mac: **Cmd+Q** · Windows: görev çubuğundaki Claude simgesine sağ tıklayın → **Kapat**) ve yeniden açın.

Çift tıklamak Claude'u açmazsa, Claude içinde **Ayarlar → Uzantılar → Gelişmiş ayarlar → Uzantı yükle…** seçeneğine gidin ve indirilen dosyayı seçin. Ardından yeni bir sohbet başlatıp bir şey sorun.

:::tip Uzantıyı zaten kurdunuz mu?
Yapmanız gereken bir şey yok. FreePlay de aynı bağlantı üzerinden çalışır. Tek istisna, B1 e-posta ve parola isteyen 1.1.0 sürümüdür. Bu sürümü güncellemek için uzantıyı yeniden indirip kurun. Anahtarınız korunur.
:::

## Güvenli mi?

- Claude yalnızca **kilisenizin** verilerini görebilir.
- **Oturum açılmış (Seçenek 1):** Claude, kendi B1 giriş bilgilerinizin yapabileceğinden fazlasını asla yapamaz. B1 oturum açma sayfası, **İzin ver** düğmesine tıklamadan önce Claude'un neler yapabileceğini listeler.
- **Anahtarla (Seçenek 2):** Claude, B1'de yalnızca anahtarın izin verdiği işlemleri yapabilir. Yalnızca **okuma** kutuları işaretli bir anahtar bakabilir ama hiçbir şeyi değiştiremez. FreePlay da aynı anahtarla, aynı şekilde çalışır.
- **Kapatmak için:** B1 Admin'de **Ayarlar → Geliştirici** bölümüne gidin ve **Bağlı Uygulamalar** altından uygulamayı iptal edin (Seçenek 1) ya da **API Anahtarları** altından anahtarı silin (Seçenek 2). Erişim hemen durur. Ayrıca Claude'da B1 bağlayıcısındaki **Bağlantıyı kes** düğmesine de tıklayabilirsiniz.

## Maliyeti ne kadar?

B1 bağlantısı ücretsizdir; ChurchApps'in bir parçasıdır. Claude'un kendisinin ücretsiz bir planı vardır. Claude Pro (ayda yaklaşık 20 $) çok daha fazla kullanım sağlar. Ayrıntılar için [claude.com/pricing](https://claude.com/pricing) adresine bakın.

## Teknik ayrıntılar

Bu sayfanın geri kalanı teknik kullanıcılar ve yapay zekâ asistanları içindir: kapsamlar, diğer bağlantı yolları ve nasıl çalıştığı.

### Kapsamlar

Claude, B1 API'sine yerleşik **Model Context Protocol (MCP) sunucusu** üzerinden bağlanır (`https://api.churchapps.org/mcp`). Her çağrı, B1 Admin'den gelen bir istekle aynı kimlik doğrulama, izin ve kilise kapsamı kurallarından geçer. Claude, anahtarın **izin ve kapsamlarıyla** sınırlıdır; webhook'lara, OAuth yönetici uç noktalarına ya da yalnızca operatörlere açık diğer yollara erişemez.

Yaygın başlangıç kapsam grupları:

- **Yalnızca okuma yapan asistan:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Okuma + not ve görev ekleme:** `people:write` ekleyin
- **Tam operasyonel asistan:** istediğiniz eşleşen `:write` kapsamlarını ekleyin

`donations:read` anahtarı, Claude'un bağışları özetlemesine izin verir ancak bağış kaydedemez. `people:write` anahtarı kişi ekleyebilir ancak bağışları göremez. Her kapsamın neye izin verdiği için [API Anahtarları](/docs/developer/api/api-keys) sayfasına bakın.

### Diğer bağlantı yolları

#### Claude Code (CLI)

Bir terminalde:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Hepsi bu kadar. Herhangi bir Claude Code oturumunda `/mcp` yazarak `b1` sunucusunun bağlı olduğunu doğrulayın, ardından kilisenizle ilgili istediğiniz soruyu sorun.

#### Claude Desktop — elle yapılandırma (gelişmiş)

Uzantıyı kullanmak istemiyorsanız, Claude Desktop'ın yapılandırma dosyasını düzenleyin:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

`mcp-remote` üzerinden B1'e bağlanan bir `b1` sunucu girdisi ekleyin ([Node.js](https://nodejs.org) gerekir):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Claude Desktop'ı yeniden başlatın. Sohbet giriş alanındaki bağlayıcı menüsünde araçlarıyla birlikte `b1` görünecektir.

#### Claude.ai (web) — Özel bağlayıcı

Yukarıdaki **Seçenek 1**'e bakın. Bağlayıcı OAuth 2.1 kullanır: Claude, B1'in yetkilendirme sunucusunu `https://api.churchapps.org/.well-known/oauth-protected-resource` adresinden keşfeder, Dynamic Client Registration ile kendini kaydeder ve PKCE ile oturum açar. Team ve Enterprise planlarında, bir sahibin önce bağlayıcıyı kuruluş için eklemesi gerekebilir. Claude belirli kapsamlar istemez; bu yüzden onay sayfası, oturum açmış B1 hesabının erişebildiği her şeyi sunar. B1 Admin'de **Ayarlar → Geliştirici → Bağlı Uygulamalar** bölümünden iptal edebilirsiniz.

### Nasıl çalışır

B1 API, `/mcp` adresinde tek bir MCP uç noktası sunar. Claude bu uç noktaya bağlanır, `cak_…` anahtarınızla kimlik doğrular ve dört araca erişim kazanır:

| Araç | Ne yapar |
|---|---|
| `list_endpoints` | Claude'un çağırabileceği REST uç noktalarını listeler; yola göre filtrelenebilir. Keşif için kullanılır. |
| `describe_endpoint` | Belirli bir uç nokta için kısa bir özet ve örnek istek/yanıt döndürür. |
| `api_call` | Kimliği doğrulanmış kullanıcı olarak bir REST uç noktasını gerçekten çağırır. |
| `describe_page_builder` | Kilise web sitenizin sayfalarını oluşturma ve düzenleme rehberidir. Claude, web sitesi içeriğiyle çalışmadan önce bunu okur. |

Bu, B1 Admin'in kullandığı `/membership/people`, `/giving/donations`, `/attendance/visits` vb. yüzeyin aynısıdır; her yetkilendirme kuralı aynı şekilde uygulanır. FreePlay (lessons.church) uç noktaları `/lessons/*` altında listelenir; Claude'un bu uç noktalara yaptığı çağrılar, aynı kullanıcının aynı izinleriyle FreePlay'e iletilir.

### Güvenlik ve sınırlar

- **Kilise bazında yalıtım.** API anahtarı tek bir kiliseye karşılık gelir. Claude, diğer kiliselerin verilerini görme yeteneğine sahip değildir.
- **İzinlere bağlı.** Anahtarı oluşturan kişinin B1 Admin'deki bir iznini kaldırırsanız, Claude bir sonraki çağrıda bu izni anında kaybeder.
- **İptal edilebilir.** **Ayarlar → Geliştirici → API Anahtarları** bölümünden anahtarı silin; Claude'un erişimi hemen sona erer.
- **Engel listesi.** Sağlayıcı webhook'ları, OAuth istemci yönetici uç noktaları ve yalnızca operatörlere açık `apiEmails` yolu MCP üzerinden çağrılamaz.
- **Yanıt boyutu sınırı.** Tek bir araç yanıtı 64 KB ile sınırlıdır; böylece uzun listeler Claude'un bağlamını taşırmaz. Bu durumda Claude sorguyu filtrelerle daraltır.
- **Denetim izi.** Değişiklikler, B1 Admin işlemleriyle aynı denetim günlüğünden geçer; **Ayarlar → Denetim Günlüğü** bölümünden inceleyebilirsiniz.

### Sorun giderme

**Claude, FreePlay'i kullanmak için B1 e-posta ve parola istiyor:** Masaüstü uzantısının 1.1.0 sürümünü kullanıyorsunuz. Güncellemek için uzantıyı yeniden indirip kurun. Yeni sürümler yalnızca anahtarınızı kullanır.

**Claude "Unauthorized" ya da 401 hatası veriyor:** Yetkilendirme belirteci eksik, hatalı veya anahtar iptal edilmiş. Uzantıyı kullandıysanız, Claude içinde **Ayarlar → Uzantılar → B1 (ChurchApps)** bölümünü açın ve anahtarı yeniden yapıştırın. Aksi halde `Authorization: Bearer cak_…` başlığını kontrol edin (boşluğa ve `Bearer` kelimesinin aynen yazıldığına dikkat edin).

**Bir araç çağrısı 403 döndürüyor:** API anahtarının bu uç nokta için gerekli kapsamı yok. **Ayarlar → Geliştirici → API Anahtarları** bölümünden kapsamı ekleyin. Kapsamlar yerinde değiştirilemediği için yeni bir anahtar oluşturmanız gerekir. Yeni anahtarı uzantının ayarlarına ya da Claude yapılandırmasına yapıştırın.

**Claude bir uç noktayı bulamıyor:** Ona bir filtreyle `list_endpoints` çağırmasını söyleyin, örneğin *"doğru yolu bulmak için 'donations' filtresiyle list_endpoints kullan"*. Yol envanteri canlı API'den üretildiği için `curl` ile erişebildiğiniz her şey burada bulunur.

**Yerel geliştirme:** `https://api.churchapps.org/mcp` adresini `http://localhost:8084/mcp` ile değiştirin. Kimlik doğrulama ve araçlar aynıdır.

## İlgili

- [API Anahtarları](/docs/developer/api/api-keys) — kapsamların tam listesi
- [MCP Sunucusu (geliştirici başvurusu)](/docs/developer/api/mcp) — protokol ayrıntıları ve araç şemaları
- [ChatGPT](./chatgpt) — aynı fikir, OpenAI modelleri için

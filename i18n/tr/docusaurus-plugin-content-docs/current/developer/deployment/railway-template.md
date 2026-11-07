---
title: "Railway ile Kendi Sunucunuzda Barındırma"
description: "Railway'de yaklaşık 15 dakikada özel bir ChurchApps kurun; B1 Admin ve B1App için e-posta, özel alan adı, bağış ve dosya depolamayı yapılandırın."
---

# Railway ile Kendi Sunucunuzda Barındırma

<div class="article-intro">

ChurchApps, kiliseniz için B1 Admin, B1 üye portalı, API ve bir MySQL veritabanından oluşan özel bir örnek sunan, tek tıklamayla kurulabilen bir [Railway](https://railway.com) şablonu yayınlar. Hepsi doğrudan sizin sahip olduğunuz ve kendi ödediğiniz altyapıda çalışır. Bu kılavuz sizi yaklaşık 15 dakikada canlıya geçirir ve çoğu kilisenin sonunda isteyeceği dağıtım sonrası yapılandırmayı adım adım anlatır.

</div>

## Hızlı Başlangıç

[![Railway'de Dağıt](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Yukarıdaki **Deploy on Railway** düğmesine tıklayın.
2. Railway'de oturum açın (ya da ücretsiz bir hesap oluşturun) ve bir ödeme yöntemi ekleyin.
3. Hiçbir şeyi değiştirmeden **Deploy** düğmesine tıklayın. Her değişkenin makul bir varsayılan değeri vardır.
4. Dört servisin yeşile dönmesi için 5–10 dakika bekleyin.
5. **B1Admin** servisinin URL'sini açın, **Kayıt Ol** düğmesine tıklayın ve hesabınızı oluşturun. İlk hesap otomatik olarak sunucu yöneticisi olur.
6. İlk kilisenizi oluşturmak için uygulama içindeki yönergeleri izleyin.

Hepsi bu kadar. Artık tam çalışan bir ChurchApps örneğiniz var. Aşağıdakiler isteğe bağlı iyileştirmelerdir.

:::tip
Dağıtım şu anda **beta** aşamasındadır. Belgelerde yer almayan bir sorunla karşılaşırsanız, lütfen dağıtım günlüklerini ekleyerek [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) adresinde bir sorun bildirin.
:::

<div class="prereqs">
<h4>İhtiyacınız Olanlar</h4>

- Ücretsiz bir [Railway](https://railway.com) hesabı
- Railway'de kayıtlı bir kredi kartı (küçük bir cemaat için yaklaşık ayda 15–25 $; bkz. [Maliyetler](#costs))
- İlk dağıtım için yaklaşık 15 dakika
- *İsteğe bağlı ama daha sonra şiddetle önerilen:* SMTP kimlik bilgileri ve özel bir alan adı

</div>

## Neler Dağıtılır

Şablon, tek bir Railway projesinde dört servis oluşturur:

| Servis | Amaç | Dağıtım sonrası URL |
|--------|------|---------------------|
| **MySQL** | Tüm verileri saklar (tek örnek, birden fazla şema) | yalnızca dahili |
| **Api** | Üyelik, içerik, bağış, yoklama vb. için arka uç | `https://api-<id>.up.railway.app` |
| **B1Admin** | Personel/yönetici web uygulaması | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Üyelere yönelik web uygulaması ve kilise web sitesi | `https://b1app-<id>.up.railway.app` |

Veritabanı şemaları, API'nin başlangıç geçişi tarafından ilk çalıştırmada otomatik olarak oluşturulur.

## İlk Yapılandırma

Artık sisteminiz ayakta. Çoğu kilisenin bundan sonra kurduğu ayarlar, öncelik sırasına göre aşağıda yer almaktadır.

### 1. E-posta (Kesinlikle Önerilir)

E-posta olmadan üyeler yine kayıt olabilir ve sistemi kullanabilir, ancak **unutulan şifrelerini sıfırlayamazlar**. Bunu bir yöneticinin onlar adına yapması gerekir. SMTP kurulumu yaklaşık 5 dakika sürer.

Railway kontrol panelinde **Api** servisini açın → **Variables** bölümüne gidin ve şunları ekleyin:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Bilmeye değer üç sağlayıcı:

#### Resend — en basit ücretsiz seçenek (günde 100 e-posta)

1. [resend.com](https://resend.com) adresinde kaydolun.
2. Bir gönderim alan adını doğrulayın (ya da başlamak için `onboarding@resend.dev` test gönderenini kullanın).
3. Bir API anahtarı oluşturun.
4. `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx` değerlerini ayarlayın.

#### Gmail — kişisel kullanım için ücretsiz (günde yaklaşık 500)

1. Google hesabınızda 2 adımlı doğrulamayı etkinleştirin.
2. Bir [Uygulama Şifresi](https://myaccount.google.com/apppasswords) oluşturun.
3. `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<16 karakterli uygulama şifresi>` değerlerini ayarlayın.

#### AWS SES — büyük ölçekte en ucuz seçenek

1. AWS'de bir gönderim alan adını doğrulayın.
2. Doğrulanmamış adreslere gönderim yapacaksanız SES sandbox'ından çıkın.
3. **SES → SMTP Settings → Create credentials** yolunda SMTP kimlik bilgileri oluşturun.
4. `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP şifresi>` değerlerini ayarlayın.

Değişkenleri kaydettikten sonra Api servisi otomatik olarak yeniden dağıtılır. Bir test hesabında şifre sıfırlama işlemi başlatarak test edin.

:::warning
`MAIL_SYSTEM=SMTP` değerini hatalı kimlik bilgileriyle ayarlarsanız, kayıt işlemi başarılı görünür ancak doğrulama e-postası hiçbir zaman gelmez. Kimlik bilgilerini düzeltin ya da e-postasız moda dönmek için `MAIL_SYSTEM` değişkenini kaldırın.
:::

### 2. Özel Alan Adları

Varsayılan `*.up.railway.app` URL'leri çalışır, ancak çoğu kilise kendi alan adını ister.

Her web servisi için (B1Admin ve B1App):

1. Railway'de servisi açın → **Settings** → **Networking**.
2. **+ Custom Domain** düğmesine tıklayın ve ana bilgisayar adını girin:
   - B1Admin için `admin.yourchurch.org`
   - B1App için `app.yourchurch.org` (ya da `www`)
3. Railway'in gösterdiği CNAME kaydını DNS sağlayıcınıza ekleyin.
4. DNS'in yayılması için birkaç dakika bekleyin. Railway, TLS sertifikasını otomatik olarak oluşturur.

Ardından, e-postalardaki bağlantıların yeni alan adlarını kullanması için **Api** servisi değişkenlerini güncelleyin:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

**B1Admin** servisinde ise:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (özel bir API alan adı da ayarladıysanız)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}` ifadesi olduğu gibi yazılmalıdır. Çalışma zamanında her kilisenin alt alan adıyla değiştirilir (aşağıdaki Çoklu Site bölümüne bakın).

### 3. Çoklu Site (Tek Örnekte Birden Fazla Kilise)

ChurchApps tasarım gereği çok kiracılıdır. Tek bir dağıtım, her biri kendi insanları, grupları ve web sitesine sahip sınırsız sayıda kiliseye ev sahipliği yapabilir. Yeni kiliseler tamamen yönetici arayüzü üzerinden eklenir. Altyapıda herhangi bir değişiklik gerekmez.

#### Ek kiliseler ekleme

1. **B1 Admin** içinde **Settings → Manage Church → Switch Church → Create New** yolunu izleyin.
2. Her kilisenin benzersiz bir **alt alan adı kısaltması** vardır (ör. `firstchurch`, `gracecommunity`).
3. Yeni kilise kendi verilerine, üyelerine, web sitesine ve bağış kurulumuna sahip olur. Aynı örnekteki diğer kiliselerden tamamen ayrıdır.

#### Her kiliseyi kendi URL'sine yönlendirme

Kiliseleri herkese açık hale getirmenin iki yolu vardır:

| Desen | Örnek | Kurulum |
|-------|-------|---------|
| **Yola dayalı** (kutudan çıktığı gibi çalışır) | `app.yourchurch.org/firstchurch` | Ek kurulum gerekmez |
| **Alt alan adına dayalı** (daha temiz URL'ler) | `firstchurch.yourchurch.org` | Joker DNS + joker özel alan adı |

Railway üzerinde **alt alan adına dayalı** yönlendirme için:

1. DNS sağlayıcınızda bir joker CNAME kaydı oluşturun: `*.yourchurch.org → <b1app railway hedefi>`.
2. Railway'de B1App servisi → **Settings → Networking** bölümünde `*.yourchurch.org` alan adını özel alan adı olarak ekleyin.
3. **B1Admin** servisinde `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org` değerini ayarlayın.

Yeniden dağıtımdan sonra her kilisenin sitesi otomatik olarak `<alt-alan-adları>.yourchurch.org` adresinde sunulur.

:::info
Joker özel alan adları ücretli bir Railway planı gerektirir. Yola dayalı yönlendirme her planda çalışır ve işlevsel olarak aynıdır. Yalnızca adres çubuğunda daha az şık görünür.
:::

### 4. Çevrimiçi Bağış (Stripe / PayPal)

Bağış ayarları ortam değişkenleri yerine **her kilise için yönetici arayüzünde** yapılandırılır. Böylece her kilise kendi ticari hesabını kullanabilir.

1. [Stripe](https://dashboard.stripe.com/) (Developers → API keys) veya [PayPal](https://developer.paypal.com/) (My Apps & Credentials) üzerinden geliştirici kimlik bilgilerinizi alın.
2. B1 Admin içinde **Settings → Giving Settings** bölümüne gidin.
3. Sağlayıcınızı seçin, Genel ve Gizli anahtarları yapıştırın ve ücret işlemlerini yapılandırın.
4. İsteğe bağlı olarak, herkese açık bağış formlarını botlara karşı korumak için Railway'deki **Api** servisine `GOOGLE_RECAPTCHA_SECRET_KEY` ekleyebilirsiniz.

### 5. Dosya Depolama

Şablon, üye fotoğrafları, vaaz dosyaları ve yüklenen belgeler için Api servisine bağlı **1 GB kalıcı birim** oluşturur.

Birimi büyütmek için Api servisini açın → **Volumes** → boyut kaydırıcısını ayarlayın.

Daha büyük dağıtımlar için (100+ GB veya çok sayıda eşzamanlı yükleme), **Api** servisinde şu değerleri ayarlayarak S3'e geçin:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Birimdeki mevcut dosyalar otomatik olarak taşınmaz. Değişkeni değiştirmeden önce bunları bucket'a kopyalayın.

### 6. İsteğe Bağlı Özellik Entegrasyonları

Bunlar belirli özellikleri açar ve istediğiniz zaman Railway kontrol panelinden eklenebilir. Bunları **Api** servisinde ayarlayın.

| Değişken | Etkinleştirdiği özellik |
|----------|-------------------------|
| `OPENAI_API_KEY` *veya* `OPENROUTER_API_KEY` | Yapay zekâ destekli arama ve içerik önerileri |
| `YOUTUBE_API_KEY` | YouTube vaaz araması ve gömme |
| `PEXELS_KEY` | Web sitesi oluşturucu için stok görsel seçici |
| `VIMEO_TOKEN` | Vimeo vaaz desteği |
| `API_BIBLE_KEY` | Dersler ve içeriklerde İncil ayeti aramaları |
| `YOUVERSION_API_KEY` | YouVersion İncil entegrasyonu |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Tarayıcı push bildirimleri ([bir VAPID anahtar çifti oluşturun](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Yeni kayıtlar için isteğe bağlı CRM senkronizasyonu |

## Güncelleme

Her servis ilgili GitHub deposuna bağlıdır. `ChurchApps/Api`, `ChurchApps/B1Admin` veya `ChurchApps/B1App` üzerindeki `main` dalına yapılan gönderimler otomatik yeniden dağıtımları tetikler.

Belirli bir sürüme sabitlemek için her serviste **Branch** ayarını bir etikete veya sürüm dalına değiştirin. Üretim ortamı için bu önerilen yapılandırmadır. `main` dalından otomatik dağıtım, yarım kalmış işleri de devralmanız anlamına gelir.

## Maliyetler

Küçük bir kilise için (200 üyeden az, düşük trafik) gerçek dünya aralıkları:

| Bileşen | Yaklaşık aylık maliyet |
|---------|------------------------|
| Railway temel ücreti | 5 $ |
| MySQL eklentisi | 5 $ + yaklaşık 1 $ depolama |
| 3 web servisinin işlem gücü | Toplam 3–10 $ |
| 1 GB birim | 0,25 $ |
| **Toplam** | **Ayda yaklaşık 15–25 $** |

Maliyetler trafiğe, fotoğraf yüklemelerine ve veritabanı boyutuna doğrusal olarak artar. Railway, canlı kullanımı projenin **Usage** sekmesinde gösterir. Riskinizi sınırlamak için orada harcama limitleri belirleyebilirsiniz.

## Sorun Giderme

| Belirti | Olası neden | Çözüm |
|---------|-------------|-------|
| Derleme `EBUSY: rmdir '/app/node_modules/.cache'` hatasıyla başarısız oluyor | Nixpacks önbellek bağlama çakışması | Etkilenen serviste `NIXPACKS_NO_CACHE=true` ayarlayın |
| B1Admin derlemesi `Missing: @types/...` hatasıyla başarısız oluyor | Eşzamanlı olmayan `package-lock.json` | En son `main` dalını çekin |
| Api dağıtımı "Deploying" aşamasında takılı kalıyor | Sağlık kontrolü başarısız — `/health` 200 döndürmüyor | Dağıtım günlüklerini inceleyin; genellikle gerekli bir ortam değişkeni eksiktir |
| B1Admin "e-postanızı kontrol edin" diyor ama e-posta gelmiyor | `MAIL_SYSTEM=SMTP` ayarlı ama kimlik bilgileri eksik/hatalı | Kimlik bilgilerini düzeltin veya e-postayı devre dışı bırakmak için `MAIL_SYSTEM` değişkenini kaldırın |
| Giriş `api.churchapps.org` adresine yönlendiriyor | `REACT_APP_STAGE` değeri `prod` | B1Admin servisinde `REACT_APP_STAGE=custom` ayarlayın |
| Alt alan adlı tüm kiliseler aynı içeriği gösteriyor | `REACT_APP_B1_WEBSITE_URL` içinde `{subdomain}` ifadesi yok | Değeri ör. `https://{subdomain}.yourchurch.org` olarak ayarlayın |
| Özel alan adı "Application not found" gösteriyor | DNS henüz yayılmadı veya Railway sertifikası beklemede | 5 dakika bekleyin; DNS'i `dig admin.yourchurch.org` ile kontrol edin |

Bu listede olmayan bir sorunla karşılaşırsanız, dağıtım günlüklerini ekleyerek [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) adresinde bir sorun bildirin.

## İlgili Makaleler

- **[Docker ile Kendi Sunucunuzda Barındırma](./docker.md)** — Aynı yığın kendi donanımınızda veya VPS'nizde
- **[İlk Kurulum](../../getting-started/initial-setup.md)** — Kilisenizi oluşturduktan sonraki ilk adımlar
- **[Web Sitesi İlk Kurulum](../../b1-admin/website/initial-setup.md)** — Kilisenizin herkese açık sitesini yapılandırın
- **[Bağış Ayarları](../../b1-admin/donations/online-giving-setup.md)** — Stripe veya PayPal'ı bağlayın
- **[Yerel API Kurulumu](../api/local-setup.md)** — Geliştirme için yığını yerel olarak çalıştırma
- **[API Dağıtımı (AWS)](./apis.md)** — Resmi ChurchApps SaaS'ın nasıl dağıtıldığı

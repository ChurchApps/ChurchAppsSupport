---
title: "Online Giving Setup"
description: "Stripe, PayPal, Kingdom Funding veya Paystack'i B1 Admin'e bağlayın; üyeler B1.church sitenizden çevrimiçi bağış yapsın ve bağışlar kayıtlarınıza senkronize olsun."
---

# Online Giving Setup

<div class="article-intro">

B1 Admin, **Stripe**, **PayPal**, **Kingdom Funding** ve **Paystack** ile entegre çalışır (Afrika'daki kiliseler için). Böylece üyeleriniz B1.church siteniz üzerinden çevrimiçi bağış yapabilir. Yapılandırıldıktan sonra çevrimiçi bağışlar, elle girilen bağışlarla birlikte bağış kayıtlarınızda otomatik olarak görünür ve her şey tek bir sistemde tutulur.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Bağışçıların bağışlarını belirli bir amaca yönlendirebilmesi için [bağış fonlarınızı](funds.md) ayarlayın
- [stripe.com](https://stripe.com) adresinde bir Stripe hesabı oluşturun ve etkinleştirin (test modundan çıkarın)
- B1 Admin giriş bilgilerinizi hazır bulundurun

</div>

## Stripe'ı Ayarlama

1. Henüz bir hesabınız yoksa [stripe.com](https://stripe.com) adresinde bir hesap oluşturun. **Hesabınızı etkinleştirdiğinizden** ve test modundan çıkardığınızdan emin olun.
2. Stripe'da **Developers > API Keys** bölümüne gidin.
3. **Publishable Key** (Yayımlanabilir Anahtar) değerinizi kopyalayın.
4. [B1 Admin](https://admin.b1.church/) hesabınıza giriş yapın.
5. **Settings** (Ayarlar) bölümüne gidin ve **Giving** (Bağış) bölümünü açın.
6. **Giving** bölümünde **Edit** (Düzenle) düğmesine tıklayın.
7. **Provider** (Sağlayıcı) seçeneğini **Stripe** olarak ayarlayın.
8. Publishable Key değerinizi **Public Key** (Genel Anahtar) alanına yapıştırın.
9. Stripe'a geri dönün ve **Secret Key** (Gizli Anahtar) değerini gösterin (bu değer yalnızca bir kez görüntülenebilir, bu yüzden bir yedek kopyasını kaydedin).
10. Secret Key değerini **Secret Key** alanına yapıştırın ve **Save** (Kaydet) düğmesine tıklayın.

:::warning
Stripe Gizli Anahtarınız yalnızca bir kez gösterilir. Stripe kontrol panelinden ayrılmadan önce güvenli bir yere kopyalayın. Kaybederseniz yeni bir anahtar oluşturmanız gerekir.
:::

## Para Biriminizi Seçme

Stripe'ı sağlayıcı olarak seçtikten sonra API anahtarlarınızın yanında bir **Currency** (Para Birimi) açılır listesi görünür. Bağışların doğru şekilde tahsil edilmesi için Stripe hesabınızın ödeme para birimiyle eşleşen para birimini seçin.

Desteklenen para birimleri arasında USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN ve BRL bulunur. Hesabınızın varsayılan para birimini [Stripe Kontrol Paneli](https://dashboard.stripe.com/settings/currencies) üzerinden doğrulayabilir veya değiştirebilirsiniz.

:::info
Burada seçtiğiniz para birimi tek seferlik bağışlar, yinelenen aboneliklər, ücret hesaplamaları ve bağış raporları için kullanılır. Daha sonra para birimini değiştirirseniz yalnızca yeni bağışlar ve abonelikler yeni para birimini kullanır. Mevcut yinelenen bağışlar, oluşturuldukları para biriminde devam eder.
:::

:::warning
Stripe hesabınızın seçtiğiniz para birimini kabul edecek şekilde yapılandırıldığından emin olun. Stripe hesabınız seçilen para birimini desteklemiyorsa, bağışlar ödeme sırasında başarısız olur.
:::

## Apple Pay ve Google Pay

Stripe kullanan kiliseler, genel bağış sayfasında otomatik olarak Apple Pay ve Google Pay düğmelerine sahip olur. Bu düğmeler, bağışçı bir fon ve tutar seçtiğinde tek seferlik bağışlar için kart alanlarının üzerinde görünür ve yalnızca bağışçının tarayıcısında veya cihazında cüzdan kurulu olduğunda gösterilir. Yinelenen bağışlarda hâlâ kart veya banka alanları kullanılır.

Google Pay için herhangi bir kurulum gerekmez. Apple Pay için bağış sayfanızın alan adının Stripe'a kayıtlı olması gerekir; B1, bağış sayfası alan adınızda ilk kez yüklendiğinde bu kaydı otomatik olarak yapar. Bir iPhone'da Apple Pay düğmesi görünmüyorsa Stripe Kontrol Paneli'nde **Settings > Payment method domains** (Ayarlar > Ödeme yöntemi alan adları) bölümünü kontrol edin ve `yoursubdomain.b1.church` (veya özel) alan adınızın listelendiğini ve doğrulandığını onaylayın.

## Anonim Bağışlar

Genel bağış sayfasındaki bağışçılar **Give anonymously** (Anonim olarak bağış yap) kutusunu işaretleyebilir. Anonim bir bağış, herhangi bir bağışçıyla ilişkilendirilmeden kaydedilir, yine de bağışçının seçtiği fona gider ve toplu işlemlerinizde ve raporlarınızda **Anonymous** (Anonim) olarak görünür. Makbuzun gönderilebilmesi için bağışçının e-posta adresi yine de gereklidir, ancak bir kişi kaydı oluşturulmaz. Anonim bağışlar yalnızca tek seferliktir ve hiçbir bağış dökümünde yer almaz.

## Başarısız Yinelenen Bağışlar

Stripe üzerindeki bir yinelenen bağış başarısız olduğunda (örneğin, süresi dolmuş veya reddedilmiş bir kart), başarısız tahsilat **Donations > Failed Gifts** (Bağışlar > Başarısız Bağışlar) altında; bağışçı, tutar, tarih ve ağ geçidinin verdiği neden ile birlikte görünür. Bağışçı ödeme yöntemini güncelledikten sonra tahsilatı yeniden denemek için **Retry** (Yeniden Dene) düğmesine tıklayın.

Tahsilat başarısız olduğunda B1 bağışçıya e-posta gönderir. Tahsilat hâlâ geçmediyse üç ve yedi gün sonra tekrar e-posta gönderir ve bu e-postalarda ödeme yöntemini B1.church üzerinden güncellemek için bir bağlantı bulunur.

:::info
Kiliseniz Stripe'ı bu özellik kullanıma sunulmadan önce kurduysa, **Settings** > **Giving** (Ayarlar > Bağış) bölümünü açın, düzenle düğmesine tıklayın ve bir kez **Save** düğmesine basın. Bu işlem Stripe webhook'unu yeniler, böylece başarısız tahsilatlar B1'e bildirilir.
:::

## B1.church Sitenize Bağış Sayfası Ekleme

1. [b1.church](https://b1.church/) adresine gidin ve giriş yapın.
2. **Settings** (Ayarlar) simgesine tıklayın.
3. **Add Tab** (Sekme Ekle) düğmesine tıklayın.
4. Tür olarak **Donation** (Bağış) seçin.
5. Sekme için bir ad girin (örneğin "Give" / "Bağış Yap") ve **Save** düğmesine tıklayın.
6. İsteğe bağlı olarak sekme simgesini değiştirin. Bağışla ilgili bir simge için simge aramasına "Giv" yazın.

Bağış sayfanız artık yayında. Üyeler bu sayfayı `yoursubdomain.b1.church/donate` adresinde ziyaret edebilir.

## Bağış Bağlantınızı Paylaşma

Bağış URL'nizi bulmak için **B1 Admin**'e gidin ve alt alan adınızı görmek için **Settings** simgesine tıklayın. Bağış bağlantınız şu biçimde olur:

`https://yoursubdomain.b1.church/donate`

Üyelerin çevrimiçi nerede bağış yapabileceğini bilmesi için bu bağlantıyı web sitenizde, e-postalarda veya bültende paylaşın.

### Önceden Ayarlanmış Fon ve Tutarla Bağlantılar

Bağışçıları doğrudan belirli bir fona yönlendirmek için **Donations > Funds** (Bağışlar > Fonlar) bölümüne gidin ve ilgili fonda **Giving Link** (Bağış Bağlantısı) düğmesine tıklayın. İsterseniz bir tutar girin, ardından bağlantıyı kopyalayın. İletişim kutusunda aynı bağlantının QR kodu da gösterilir; bültende, slaytta veya afişte kullanmak için **Download PNG** (PNG İndir) düğmesine tıklayarak kaydedin. Bağışçı bağlantıyı açtığında veya kodu taradığında, fon ve tutar bağış sayfasında zaten seçili olur. Bağlantı şu biçimdedir:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Aynı parametreler web sitesi oluşturucusundaki **Donate Link** (Bağış Bağlantısı) öğesinde de çalışır.

## Bağış Bildirimleri

Stripe, her bağış alındığında bir e-posta bildirimi gönderir. Bildirim e-posta adresini değiştirmek için Stripe kontrol paneline gidin, sağ üstteki profilinize tıklayın, **Profile** (Profil) seçeneğini seçin ve e-posta adresinizi güncelleyin.

## İşlem Ücreti Seçenekleri

Bağış sayfanızı, bağışçıların isteğe bağlı olarak işlem ücretlerini karşılamasına izin verecek şekilde yapılandırabilirsiniz; böylece kiliseniz bağış tutarının tamamını alır. Bu ayar, B1 Admin içindeki kilise ayarlarınızdan yönetilir.

:::tip
Kurulumdan sonra, çevrimiçi bağışı cemaatinize duyurmadan önce her şeyin çalıştığını doğrulamak için küçük bir test bağışı yapın.
:::

## Kingdom Funding'i Ayarlama

Kingdom Funding, kredi/banka kartlarını ve ACH banka transferlerini destekleyen Hristiyan bir ödeme işlemcisidir. Kiliseniz Kingdom Funding'e kayıtlıysa, bunu bağış ağ geçidiniz olarak bağlayabilirsiniz.

:::info
Kingdom Funding entegrasyonu şu anda beta aşamasındadır. Kilisenizde etkinleştirmek için B1 hesap temsilcinizle iletişime geçin.
:::

1. [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) adresinde kaydolun veya giriş yapın.
2. Kingdom Funding satıcı portalından **Security Key** (Güvenlik Anahtarı, genel) ve **Private Key** (Özel Anahtar) değerlerinizi alın.
3. B1 Admin'de **Settings** bölümüne gidin, **Giving** bölümünü açın ve düzenle düğmesine tıklayın.
4. **Provider** değerini **Kingdom Funding** olarak ayarlayın.
5. Security Key değerinizi **Security Key** alanına, Private Key değerinizi ise **Private Key** alanına yapıştırın.
6. Kingdom Funding'den aldığınız **Webhook Key** değerini girin ve görüntülenen webhook URL'sini kopyalayıp Kingdom Funding satıcı ayarlarınıza yapıştırın; böylece Kingdom Funding tamamlanan işlemleri B1'e bildirebilir.
7. Kaydedin.

Bağlandıktan sonra üyeler bağış sayfasında kart/banka seçeneğini görür ve kredi kartı veya ACH transferiyle bağış yapabilir.

## PayPal ve Venmo Düğmeleri

Sağlayıcı olarak **PayPal** kullanan kiliseler, tek seferlik bağışlar için bağış sayfasında kart alanlarının üzerinde **PayPal** ve **Venmo** düğmelerine sahip olur. Bu düğmelerden birine tıklayan bağışçılar ödemeyi bir PayPal penceresinde tamamlar ve bağış diğer çevrimiçi bağışlar gibi kaydedilir. Venmo yalnızca Birleşik Devletler'deki bağışçılara ve PayPal'ın uygun gördüğü cihazlarda görünür. Yinelenen bağışlarda hâlâ kart alanları kullanılır.

## Paystack'i Ayarlama (Afrika)

Stripe, Gana, Nijerya, Kenya, Güney Afrika ve Fildişi Sahili'ndeki kiliseler için hesap açmaz. [Paystack](https://paystack.com) ise hesap açar; yerel kartları, **mobil parayı** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), banka transferini ve USSD'yi kabul eder. Bağışçılar yerel para biriminizde (GHS, NGN, KES, ZAR, XOF) ödeme yapar.

1. [paystack.com](https://paystack.com) adresinde, kilisenizin işletme kayıt belgesi ve yerel banka hesabıyla kaydolun ve Paystack'in etkinleştirme (canlıya geçiş) incelemesini tamamlayın.
2. Paystack Kontrol Panelinde **Settings → API Keys & Webhooks** (Ayarlar → API Anahtarları ve Webhook'lar) bölümünü açın ve **Public Key** (Genel Anahtar) ile **Secret Key** (Gizli Anahtar) değerlerini kopyalayın (test anahtarları değil, canlı anahtarları kullanın).
3. B1 Admin'de **Settings** bölümüne gidin, **Giving** bölümünü açın ve düzenle düğmesine tıklayın.
4. **Provider** değerini **Paystack** olarak ayarlayın, Public Key ve Secret Key değerlerini yapıştırın ve **Currency** (Para Birimi) seçeneğinizi belirleyin.
5. Sağlayıcının altında gösterilen **webhook URL**'sini kopyalayın, Paystack Kontrol Paneline (**Settings → API Keys & Webhooks**) geri dönün ve bunu **Webhook URL** alanına yapıştırın. Yinelenen bağışlar ve mobil para ödemeleri bu şekilde kaydedilir.
6. Kaydedin.

Bağışçılar ödemelerini güvenli bir Paystack penceresinde tamamlar ve orada kart, mobil para veya banka transferi seçebilir. Notlar:

- **Yinelenen bağışlar** kart gerektirir; mobil para otomatik olarak yeniden tahsil edilemez, bu yüzden Paystack yalnızca tek seferlik mobil para bağışlarına izin verir.
- Paystack yinelenen bağışları B1'den iptal edilebilir, ancak duraklatılamaz veya düzenlenemez. Tutarı değiştirmek için iptal edip yenisini oluşturun.
- **Processing Fee** (İşlem Ücreti) varsayılanları, para biriminiz için Paystack'in yerel kart oranlarını yansıtır; müzakere ettiğiniz oranlar farklıysa bunları düzenleyin.

## Sonraki Adımlar

- Çevrimiçi işlemler otomatik olarak senkronize edilmiyorsa, bunları B1 Admin'e aktarmak için [Stripe İçe Aktarma](stripe-import.md) özelliğini kullanın
- Çevrimiçi bağışların doğru görünüp görünmediğini doğrulamak için [Bağış Raporlarınızı](donation-reports.md) kontrol edin
- Hem çevrimiçi hem de çevrimdışı bağışları içeren [Bağış Dökümleri](giving-statements.md) oluşturun

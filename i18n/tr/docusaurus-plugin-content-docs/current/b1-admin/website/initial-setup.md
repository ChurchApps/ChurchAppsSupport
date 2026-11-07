---
title: "B1 Admin Web Sitenizle Başlarken"
sidebar_label: "İlk Kurulum"
description: "B1 Admin kilise web sitenizi kurun: bir alt alan adı veya özel alan adı belirleyin, ana sayfanızı oluşturun, marka renklerini ve logoyu seçin ve gezinmeyi oluşturun."
---

# İlk Kurulum

<div class="article-intro">

Her B1 hesabı, kullanıma hazır bir web sitesiyle birlikte gelir. Bu kılavuz; kilise alan adınızı ayarlamanız, sitenizin görünümünü yapılandırmanız, ilk sayfalarınızı oluşturmanız ve gezinme menünüzü düzenlemeniz konusunda size adım adım yol gösterir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Yönetici erişimine sahip bir B1.church hesabına ihtiyacınız var
- Özel bir alan adı kullanacaksanız, DNS sağlayıcınızın oturum açma bilgilerini hazır bulundurun (ör. GoDaddy, Cloudflare veya AWS)
- En iyi sonuç için kilise logonuzu şeffaf arka planlı PNG biçiminde hazırlayın

</div>

## Alan Adınızı Ayarlama

Kiliseniz otomatik olarak B1.church üzerinde bir alt alan adı alır (ör. `yourchurch.b1.church`). Ayrıca kendi özel alan adınızı B1 sitenize yönlendirebilirsiniz.

1. admin.b1.church adresini ziyaret ederek veya profil açılır menüsüne tıklayıp **Uygulamayı Değiştir** seçeneğini seçerek **B1.church Admin**'e gidin.
2. [Hızlı menü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) öğesini açın, **Ayarlar**'ı genişletin ve **Ayarlar**'a tıklayın.
3. Alt alan adınızı görmek için **Kilise Bilgileri** bölümünü açın. Bunu kısa, akılda kalıcı ve boşluk içermeyen bir şeye ayarlayın.
4. Özel bir alan adı kullanmak için DNS sağlayıcınıza (GoDaddy, Cloudflare veya AWS gibi) giriş yapın ve iki kayıt ekleyin:
   - Kök alan adınızı `3.23.251.61` adresine yönlendiren bir **A kaydı**
   - `www` için `proxy.b1.church` adresine yönlendiren bir **CNAME kaydı**
5. B1.church Admin'e dönün, aynı Ayarlar sayfasındaki **Alan Adları** bölümünü açın, özel alan adınızı listeye ekleyin ve **Ekle**, ardından **Kaydet**'e tıklayın. Siteniz birkaç dakika içinde özel alan adınızdan erişilebilir olacaktır.

:::tip
Ayarlar seçeneğini görmüyorsanız, kilise hesabınızı kuran kişiden size "Kilise Ayarlarını Düzenle" iznini vermesini isteyin. Ayrıntılar için bkz. [Roller ve İzinler](../settings/roles-permissions.md).
:::

## İlk Sayfanızı Oluşturma

1. B1 Admin'de [Hızlı menü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) öğesini açın, **Web Sitesi**'ni genişletin ve **Sayfalar**'a tıklayın.
2. Sağ üst köşedeki **Sayfa Ekle**'ye tıklayın.
3. Sayfa türü olarak **Boş**'u seçin ve sayfaya "Ana Sayfa" adını verin.
4. **Sayfa Ayarları**'na tıklayın ve ana sayfanız için URL yolunu `/` (metin içermeyen tek bir eğik çizgi) olarak ayarlayın. Diğer sayfalar `/sayfa-adı` biçimini kullanır.
5. Oluşturmaya başlamak için **İçeriği Düzenle**'ye tıklayın. Her sayfa bir **Bölüm** ile başlamalıdır -- bu, diğer tüm öğelerin yerleştirildiği kapsayıcıdır.
6. Bir bölüm ekledikten sonra, metin, resim, video, kart, form ve daha fazlasını bölümünüze sürükleyerek eklemek için yeniden **İçerik Ekle**'ye tıklayın.

:::info
Sayfalar ve gezinme ile çalışma hakkında ayrıntılı bilgi için bkz. [Sayfaları Yönetme](./managing-pages.md). Görsel düzenleyici hakkında tam bir kılavuz için bkz. [Sayfa Düzenleyicisini Kullanma](./page-editor.md).
:::

## Site Görünümünü Yapılandırma

1. Hızlı menüde **Web Sitesi > Görünüm**'ü seçin.
2. Birincil, ikincil ve vurgu tonları için marka renklerinizi ayarlamak üzere **Renk Paleti**'ni kullanın.
3. **Yazı Tipleri** altında, yazı tipi tarayıcısından başlık ve metin yazı tiplerinizi seçin.
4. Stil Ayarları içindeki **Logo** bölümünden kilise logonuzu yükleyin. Hem açık arka plan hem de koyu arka plan sürümünü sağlayın.
5. **Site Altbilgisi**'ni kilisenizin iletişim bilgileri ve bağlantılarıyla yapılandırın.

:::info
Görünüm bölümünde yaptığınız değişiklikler tüm web siteniz genelinde uygulanır. Her bir ayar hakkında ayrıntılı talimatlar için [Görünüm](./appearance.md) sayfasına bakın.
:::

## Gezinmeyi Ayarlama

Gezinme bağlantılarınız Web Sitesi Sayfaları görünümünde yer alır. Bunları düzenlemek için:

1. Yeni bir gezinme bağlantısı oluşturmak için **Ekle**'ye tıklayın ve bağlantıyı sayfalarınızdan birine yönlendirin.
2. Bağlantıları yeniden sıralamak veya üst öğelerin altına iç içe yerleştirmek için sürükleyip bırakın.
3. Gezinmenin doğru göründüğünü doğrulamak için sitenizi önizleyin.

## Sonraki Adımlar

- [Sayfaları Yönetme](./managing-pages.md) -- Sayfalar ve gezinme ile çalışmayı ayrıntılı olarak öğrenin
- [Görünüm](./appearance.md) -- Sitenizin renklerini, yazı tiplerini ve düzenini ince ayarlayın
- [Dosyalar](./files.md) -- Web siteniz için resim ve belgeler yükleyin

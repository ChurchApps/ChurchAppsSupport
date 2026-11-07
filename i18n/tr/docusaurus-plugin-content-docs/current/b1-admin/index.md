---
title: "B1 Admin Genel Bakış"
---

# B1 Admin Genel Bakış

<div class="article-intro">

B1 Admin, kilise yönetim panelinizdir. Üye dizinlerinden bağışlara, web sitesi oluşturmaktan canlı yayına kadar kilisenizin işleyişinin her yönünü tek bir yerden yönetmenize yardımcı olan araçlar sunar.

</div>

## Başlarken

1. Tarayıcınızı açın ve [admin.b1.church](https://admin.b1.church) adresine gidin
2. Kullanıcı adınız ve parolanızla oturum açın
3. Ana sayfanız olan **Gösterge Paneli**ne yönlendirileceksiniz. Bu sayfada bu haftaki ibadet programı, gerçek zamanlı olarak kimlerin giriş yaptığı ve hizmet verdiği, onayınızı bekleyen işler (bekleyen onaylar veya katılma istekleri gibi), açık görevleriniz ve gruplarınız görünür

:::tip
B1 Admin'e yeni misiniz? Video anlatımı için [Giriş](./introduction) bölümüne göz atın, ardından kilise bilgilerinizi ayarlamak ve ekibinizi davet etmek için [Ayarlar](./settings/) bölümünü ziyaret edin.
:::

## Gösterge Paneliniz

Gösterge Paneli, B1 Admin ana sayfanızdır (`/`). Kilisenizin haftalık ibadetine göre oluşturulmuştur:

- **Bu haftaki ibadet** -- mevcut veya yaklaşan planın adı ve ibadet sırası, tam plana giden bir bağlantıyla birlikte
- **Canlı durum** -- Pazar günü insanlar giriş yapmaya başladığında sayfa, salonda kaç kişi olduğunu, bu saatte kimin hizmet verdiğini, ilk kez gelen misafirleri ve kapasite çubuklarıyla oda bazında dağılımı gösterir
- **Dikkat Gerektirenler** -- işlem gerektiren bekleyen onaylar ve grup katılma istekleri
- **Görevlerim** ve **Gruplarım** -- açık görevleriniz (**Görev Ekle** ile yeni görev ekleyebilir veya tüm liste için **Tüm görevler** bağlantısına tıklayabilirsiniz) ve üyesi olduğunuz gruplar

Gösterge Panelinde neyin görüneceği [rolünüze](./settings/roles-permissions.md) bağlıdır. Örneğin, tam plana giden bağlantı yalnızca o planı açabiliyorsanız görünür (planları düzenleyebiliyorsanız, planın hizmet grubuna aitseniz veya o planda görev alıyorsanız). **Tüm gruplar** bağlantısı ise yalnızca grupları yönetebiliyor, grup üyelerini görüntüleyebiliyor veya kişileri görüntüleyebiliyorsanız görünür.

:::tip
Sermons, Calendars, Mobile ve Settings dahil her bölüm, B1 Admin'in sol üst köşesindeki [Atlama menüsünde](./introduction.md#getting-around-with-the-jump-menu) bulunur. Menüye tıklayın veya **Ctrl+K** (ya da **Cmd+K**) tuşlarına basın, ardından göz atın ya da yazmaya başlayın.
:::

## Temel Özellikler

- **[Kişiler](./people/)** - Kilise dizininizi yönetin, üye ekleyin, verileri toplu düzenleyin ve hane veya sıralanabilir tablo olarak göz atın. Her kişi, kendi bilgilerinin solda, devam, bağış, gruplar, notlar ve formlara ait özetlerin yanda yer aldığı tek bir kayıt sayfasında açılır. Yakın zamanda eklenen kişileri **Eklenme Tarihi** aramasıyla bulabilirsiniz. [Notlar](./people/notes) sayfası, kişiler, gruplar, etkinlikler ve iş akışı kartları genelindeki son notları listeler
- **[Gruplar](./groups/)** - Katılma istekleri, üye yönetimi, grup e-postası, yeniden kullanılabilir metin şablonları ve Grup Adı yer tutucusu ile kişiselleştirilmiş grup mesajları ve yazdırılabilir iletişim listeleri ile kilise grupları oluşturun ve düzenleyin. Her grup, eylemlerinin solda, üye, oturum, takvim ve sağlık özetlerinin yanda yer aldığı tek bir sayfada açılır
- **[Devam](./attendance/)** - Kampüsleri, ibadet saatlerini ayarlayın; yazdırılabilir sınıf yoklama çizelgeleriyle adlandırılmış devamı takip edin; devam kaydının henüz girilmesi gereken sınıfları görün; eğilim raporlarıyla basit katılımcı sayılarını kaydedin. Her ibadet saatine bir giriş programı verin, böylece self check-in kendi kendine, her kampüsün saat diliminde açılıp kapansın. İlk kez gelen misafirlerin, seçtiğiniz alanlarla bir [QR kod](./attendance/check-in#guest-registration-via-qr-code) üzerinden kaydolmasına izin verin
- **[Bağışlar](./donations/)** - Birden fazla para biriminde bağış kaydedin, fonları yönetin, bir kişinin kaydından tek bir bağışı işleyin, partileri (tek tek veya tarih aralığındaki tüm partileri) fon ara toplamlarıyla kilisenizin antetli kağıdına yazdırın, sayıldıktan sonra partileri kapatın, bir partiyi CSV dosyasından içe aktarın, **Bağışları Gir** izniyle sayım ekiplerinin bağış girmesine olanak tanıyın ve kilise logonuzla yazdırılan dökümler oluşturun
- **[Hizmet](./serving/)** - Gönüllüleri koordine edin, hizmet planları oluşturun (veya bir planı haftalık olarak 12 haftaya kadar ileri kopyalayın), anlık bildirim, e-posta veya metin mesajıyla hatırlatmalar gönderin, **Gönüllülere Metin** ile planlanmış herkese mesaj gönderin, görevleri yönetin ve e-posta ile metin gönderebilen, bir personel üyesine bildirim yapabilen, devam kaydeden ve gönüllülerin hizmet atamalarını onaylayıp onaylamadığını takip edebilen adım adım iş akışlarında kişileri ilerletin. Planlanmış iş akışı kuralları, süresi dolmuş düzenli bağışçıları bulabilir ve yazdırılan planlarda boş sütunlar yer almaz
- **[Formlar](./forms/)** - Kayıtlar ve veri toplama için özel formlar oluşturun, bir başlık fotoğrafı ekleyin, bağımsız formları QR kodla paylaşın ve bir formu bir gruba bağlayarak grup liderlerinin yanıtları okuyup yazdırabilmesini sağlayın
- **[Raporlar](./reports/)** - Doğum günü, devam ve bağış raporlarını görüntüleyin
- **[Web Sitesi](./website/)** - Kilise web sitenizi, özel gezinme stilleriyle oluşturun ve yönetin; GA4 kimliğinizle web sitenize ve B1 uygulamanıza yapılan ziyaretleri takip edin veya herkese açık siteyi kapatıp yalnızca üye portalını bırakın
- **[Vaazlar](./sermons/)** - Vaaz kütüphanenizi, canlı yayınları ve otomatik podcast akışını yönetin
- **[Takvimler](./calendars/)** - Seçilmiş takvimler oluşturun, oda/kaynak rezervasyonlarını yönetin ve müsaitliği görüntüleyin. Fiyatlı katılımcı türleriyle [etkinlik kayıtları](./calendars/paid-registrations) alın, katılımcıları elle ücretlendirmeden ekleyin ve kilisenizde çevrimiçi bağış yoksa insanların daha sonra kaydolup ödeme yapmasına izin verin
- **[Ayarlar](./settings/)** - Her şeyi, hızlı geçiş listesi olan tek bir kaydırılabilir sayfadan yapılandırın: kilise bilgisi, bölge, tarih ve telefon numarası biçimi, metin mesajlaşma (kendi Twilio hesabınız dahil), üye sayılarıyla roller, izinler ve özel kişi alanları

:::info
Yardım ve belgelere hızlı erişim için herhangi bir sayfanın sağ üst köşesindeki soru işareti simgesine tıklayın. Renk temasını (**Varsayılan**, **Klasik** veya **Özel**) değiştirmek ya da açık ve koyu mod arasında geçiş yapmak için kullanıcı menünüzü açın ve **Tema Tercihleri**ni kullanın. Hesabınızı kimlik doğrulayıcı uygulamasından alınan bir kodla korumak için profilinizde [İki Faktörlü Oturum Açma](./profile/managing-profile#two-factor-sign-in) özelliğini açın.
:::

Destek için [support@churchapps.org](mailto:support@churchapps.org) adresine e-posta gönderin.

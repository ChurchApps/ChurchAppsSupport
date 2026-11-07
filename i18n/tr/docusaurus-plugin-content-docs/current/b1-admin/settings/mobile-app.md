---
title: "Ayarlar"
---

# Mobil Uygulama Ayarları

<div class="article-intro">

Mobil Uygulama Ayarları sayfası, kilisenizin üyelerine **B1.church mobil deneyiminde (PWA)** görünen gezinme sekmelerini yapılandırmanıza olanak tanır. Hangi sekmelerin görünür olacağını, nereye bağlanacaklarını ve nasıl görüntüleneceklerini kontrol edersiniz.

</div>

## Eğitim Videosu

<YouTube id="ydY7WGK16fE" title="B1'de Kilise Üye Uygulamanızı Özelleştirme" />

:::info Yerel B1 Mobil uygulaması artık kullanımdan kaldırıldı
Burada yapılandırılan sekmeler, yerel B1 Mobil uygulamasının yerini alan [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa) üzerinden sunulur. Kilisenizin kurulum sayfasını — `https://yourchurchname.b1.church/mobile/install` — üyelerle paylaşın; sayfa, uygulamayı cihazlarına nasıl kuracaklarını adım adım gösterir ve App Store veya Google Play'den indirme gerektirmez.
:::

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- "Kilise Ayarlarını Düzenle" iznine ihtiyacınız var. Erişiminiz yoksa [Roller ve İzinler](./roles-permissions.md) sayfasına bakın.
- Önce [Kilise Ayarlarınızı](./church-settings.md) yapılandırın; kilise adınız ve markanız dahil.

</div>

## Gezinme Ayarlarına Erişme

1. B1 Admin'de, [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın ve **Mobil** bölümünü genişletin.
2. **Gezinme** (`/mobile/navigation`) seçeneğine tıklayın.
3. Gezinme sayfası, uygulamanızın mevcut sekmelerini gösterir.

## Yeni Sekme Ekleme

1. Sayfanın üstündeki **Sekme Ekle** düğmesine tıklayın.
2. Sekme ayrıntılarını doldurun:
   - **Ad** -- Sekmede görünecek etiket (örneğin "Vaazlar" veya "Bağış").
   - **Simge** -- Sekme için bir simge seçmek üzere simge seçiciye tıklayın.
   - **Görsel** -- Sekmeye fotoğraf eklemek için **Görsel Seç** (veya **Görseli Değiştir**) düğmesine tıklayın. Fotoğraflı sekmeler, uygulamanın Ana ekranında fotoğraf kutucukları olarak görünür -- bkz. [Ana Ekran Kutucukları](#home-screen-tiles).
   - **Sekme Türü** -- Kutsal Kitap, Canlı Yayın, Bağış, Web Sitesi ve daha fazlası gibi seçeneklerden birini seçin.
   - **URL** -- Sekmenin bağlanacağı web adresini girin.
   - **Görünürlük** -- Bu sekmeyi kimlerin görebileceğini belirleyin (herkes, yalnızca üyeler vb.). **Üye Dizini** sekmesi için bu ayar yalnızca sekmenin kimlere görüneceğini belirler; dizine kimin erişebileceği, Üye portalı sayfasındaki **Dizinde Göster** ayarıyla belirlenir (bkz. [Üye Dizini ve Mesajlaşma Ayarları](#member-directory--messaging-settings)).
3. Uygulamanıza eklemek için **Sekmeyi Kaydet** düğmesine tıklayın.

## Mevcut Bir Sekmeyi Düzenleme

1. **Uygulama Sekmeleri** listesindeki herhangi bir sekmeye tıklayın.
2. Sekmenin adını, simgesini, URL'sini, türünü veya görünürlük ayarlarını güncelleyin.
3. Değişikliklerinizi uygulamak için **Sekmeyi Kaydet** düğmesine tıklayın.

## Sekmeleri Yeniden Sıralama

Sekmelerin mobil uygulamada görünme sırasını değiştirebilirsiniz. Yeniden düzenlemek için listedeki sekmeleri sürükleyip bırakın. Bu sayfada gösterilen sıra, üyelerinizin uygulamada göreceği sırayla aynıdır.

:::info
Bazı sekmeler belirli koşullar sağlandığında otomatik olarak görünebilir -- örneğin, bir yayın etkin olduğunda Canlı Yayın sekmesi görünebilir. Elle eklediğiniz sekmeler ise üyelerinizin her zaman neyi göreceği konusunda tam kontrol sağlar.
:::

:::tip
Sekme sayısını yönetilebilir tutun. Çoğu kilise için üç ila beş sekme yeterlidir. Çok fazla sekme, üyeleriniz için gezinmeyi karmaşıklaştırabilir.
:::

## Üye Dizini ve Mesajlaşma Ayarları

Mobil bölümündeki **Üye portalı** öğesi, B1.church deneyimindeki üye dizinini ve özel mesajlaşmayı yöneten ayarları içerir:

- **Dizin Onay Grubu** -- Üye dizini güncellemelerini ve [hesap silme taleplerini](../profile/account-deletion.md) yürürlüğe girmeden önce inceleyen grup.
- **Dizinde Göster** -- Üye dizinine kimlerin erişebileceğini ve dizinde kimlerin listeleneceğini belirler: **Yalnızca Yöneticiler**, **Üyeler ve Üstü** (varsayılan), **Düzenli Katılımcılar ve Üstü** veya **Ziyaretçiler ve Üstü**. Üyelik durumu, seçtiğiniz düzeyin altında kalan kişiler dizini görmez ve dizinde listelenmez. **Yalnızca Yöneticiler** seçeneği, Kişiler &gt; Görüntüleme iznine sahip personel dışındaki herkes için dizini kapatır (yalnızca Personel üyelik durumu yeterli değildir); bu izne sahip personel bu ayardan bağımsız olarak dizini her zaman açabilir ve herkesi görebilir. Misafirler hiçbir zaman dahil edilmez, çünkü çevrimiçi olarak kendini kaydeden herkes misafir olarak başlar.
- **Görünürlük Tercihi** -- Kendi ayarını henüz seçmemiş üyeler için kilise genelinde varsayılanı belirler. **Adres**, **Telefon Numarası** ve **E-posta** her biri kendi açılır listesine sahiptir ve görünürlüğün yapılandırıldığı her yerde aynı beş düzey kullanılabilir:
  - **Herkes** -- Anonim ziyaretçiler dahil herkese görünür
  - **Üyeler** -- Yalnızca Üye veya Personel kaydı olan kişilere görünür
  - **Yalnızca Gruplar** -- Yalnızca bu kişiyle aynı grubu paylaşan kişilere ve personele görünür
  - **Grup Liderlerim ve Personel** -- Yalnızca bu kişinin üyesi olduğu bir grubun liderlerine ve personele görünür
  - **Yalnızca Personel** -- Yalnızca personele (üyelik durumu Personel olan veya Kişiler &gt; Görüntüleme iznine sahip herkes) ve kişinin kendisine görünür

  Bu düzeylerdeki "Personel", üyelik durumu Personel olan veya Kişiler &gt; Görüntüleme iznine sahip herkesi ifade eder. Grup değişiklikleri hemen geçerli olur: bir gruba katılan ya da grup lideri yapılan biri, çıkış yapıp tekrar giriş yapmadan o grubun üyelerinin **Yalnızca Gruplar** veya **Grup Liderlerim ve Personel** düzeyindeki ayrıntılarını görebilir.

  Üyeler, B1.church PWA'daki profillerinin **Gizlilik** sekmesinden kendi kayıtları için bu varsayılanları geçersiz kılabilir -- bkz. [Profilinizi Düzenleme](/docs/b1-church/getting-started/me-page).
- **Özel Mesajlar için Asgari Yaş** -- Çocuk güvenliği kontrolüdür. Taraflardan biri bu yaşın altındaysa, doğum tarihine göre B1 **yeni** bir özel mesaj görüşmesi açmaz (doğum tarihi kayıtlı değilse hane rolü yedek olarak kullanılır). Yaşın altındaki kişiler dizinde tamamen görünür kalır -- yalnızca doğrudan mesajlaşma engellenir; bu engel **her iki yönde** de geçerlidir ve personel dahil herkes için geçerlidir. Grup görüşmeleri ve bir çocuğun ebeveynleriyle mesajlaşma çalışmaya devam eder. Seçenekler Kapalı, 13, 16 veya 18'dir; varsayılan **18**'dir. Mevcut görüşmeler etkilenmez.

:::tip
Asgari yaş kontrolü doğum tarihlerine dayandığı için, kilise topluluğunuzdaki çocukların doğum tarihlerinin doldurulduğundan emin olun. Bu ayar, [yoklama güvenlik kontrolleriyle](../attendance/checkin-safety.md) aynı çocuk güvenliği ailesine aittir.
:::

### Ana Ekran Oturum Açma İstemi

Uygulamanın [Ana ekranını](/docs/b1-church/getting-started/navigating#home) oturum açmadan ziyaret eden kişiler, **Oturum Aç** düğmesinin yanında kısa bir istem görür -- varsayılan olarak *"Gruplarınızı, bağışlarınızı ve daha fazlasını görmek için oturum açın."* Bu metni değiştirmek için aynı Üye portalı sayfasındaki (`/mobile/b1-mobile`) **Ana ekran oturum açma istemi** ayarlarını kullanın:

- **Uygulama ana ekranında oturum açma istemini göster** -- Bunu kapatmak, hem istemi hem de **Oturum Aç** düğmesini Ana ekrandan gizler. Ziyaretçiler yine de uygulama menüsünden oturum açabilir.
- **Oturum açma istemi metni** -- Varsayılan metni kendi mesajınızla değiştirin (en fazla 150 karakter). Varsayılanı kullanmak için boş bırakın. İstem kapalıyken bu kutu devre dışıdır.

Uygulamaya uygulamak için **Kaydet** düğmesine tıklayın. Başarılı bir kayıttan sonra **Kaydedildi** mesajı görünür. Kaydetme işlemi uygulamanın önbelleğe alınmış ayarlarını yeniler, böylece değişiklik Ana ekran bir sonraki yüklendiğinde görünür.

### Ana Ekran Kutucukları

Fotoğrafı olan sekmeler (bkz. [Yeni Sekme Ekleme](#adding-a-new-tab) altındaki **Görsel**) uygulamanın [Ana ekranında](/docs/b1-church/getting-started/navigating#home), kilisenizin adını taşıyan bir bölümde fotoğraf kutucukları olarak görünür. Fotoğraf verirseniz, Günün Ayeti sekmesi de buna dahildir. Fotoğraflı sekmeler sekme çubuğunda da görünmeye devam eder.

Aynı Üye portalı sayfasındaki (`/mobile/b1-mobile`) **Ana ekran kutucukları** ayarı, bu kutucukların düzenini kontrol eder. Bir **Düzen** seçin:

- **Izgara** -- Her satırda iki kutucuk (varsayılan). Kutucuk sayısı tekse, ilk kutucuk tüm genişliği kaplar.
- **Kaydırmalı satır** -- Üyelerin yana kaydırdığı tek bir kutucuk satırı.
- **Kaydırmalı (otomatik)** -- Yana kaydırmalı aynı satır, ancak kendi kendine de hareket eder; yaklaşık her dört saniyede bir kutucuğu ilerletir ve sonda başa döner. Bir üye satıra dokunduğunda, üzerine geldiğinde veya satıra sekmeyle geçtiğinde durur ve birkaç saniye sonra kaldığı yerden devam eder. Hareketi azaltma ayarı açık olan cihazlarda satır sabit kalır ve **Kaydırmalı satır** gibi çalışır.
- **Liste** -- Her sekmenin adının yanında küçük bir fotoğraf küçük resmi bulunan bir liste.

Uygulamaya uygulamak için **Kaydet** düğmesine tıklayın.

### Ana Ekran Bölümleri

Oturum açmış üyeler, kendi yoklama geçmişlerini ve gönderdikleri formları her zaman [Ben sayfasında](/docs/b1-church/getting-started/me-page) görür. Aynı Üye portalı sayfasındaki (`/mobile/b1-mobile`) **Ana ekran bölümleri** anahtarları, bunları Ana ekranda da gösterebilir:

- **Yoklamamı Ana Sayfada Göster** -- Üyenin son 90 günde kaç kez katıldığını, en son iki ziyaretini ve tam yoklama listesine giden bir **Geçmiş** bağlantısını içeren bir **Yoklamam** bölümü ekler.
- **Formlarımı Ana Sayfada Göster** -- Üyenin en son iki form gönderimini ve bir **Tüm formlar** bağlantısını içeren bir **Formlarım** bölümü ekler.

İkisi de varsayılan olarak kapalıdır. Bir bölüm yalnızca oturum açmış ve gösterilecek en az bir kaydı olan üyelere görünür. Uygulamaya uygulamak için **Kaydet** düğmesine tıklayın.

## Bu Sekmelerin Nerede Göründüğü

Burada yapılandırdığınız sekmeler, üyelerinizin `https://yourchurchname.b1.church` adresindeki herhangi bir sayfadan yükleyeceği **B1.church PWA** uygulamasında görüntülenir. Bu sayfada yaptığınız değişiklikler, bir üye uygulamayı bir sonraki açtığında yansıtılır.

Telefonda alt sekme çubuğu **Ana Sayfa**, en fazla üç sekmeniz ve **Daha Fazla** öğelerini gösterir; bilgisayarda ise üst çubukta en fazla beş sekme görünür. Yerleşik ekranlar (Vaazlar, Bağışlar veya Gruplar gibi) önce bu yuvaları alır; boş kalan yuvaları **İç Sayfa** sekmeleri doldurur. **Harici URL** ve **Günün Ayeti** sekmeleri hiçbir zaman bir yuva almaz. Sığmayanlar dahil her sekme, uygulamanın **Daha Fazla** sayfasında listelenir. Üyelerin gördükleri için bkz. [B1App'te Gezinme](/docs/b1-church/getting-started/navigating). (Sekmeler, hâlâ kullanan üyeler için eski [B1 Mobil yerel uygulamasında](/docs/b1-mobile/) da gösterilir; ancak bu uygulama kullanımdan kaldırılmıştır ve artık güncellenmemektedir.)

## Sonraki Adımlar

- [Kilise Ayarları](./church-settings.md) -- Kilise bilgilerinizi ve markanızı yapılandırın
- [Roller ve İzinler](./roles-permissions.md) -- Ekibiniz için erişimi yönetin

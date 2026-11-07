---
title: "Roller ve İzinler"
---

# Roller ve İzinler

<div class="article-intro">

Roller, ChurchApps hesabınızdaki farklı kullanıcıların nelere erişebileceğini kontrol etmenizi sağlar. Personel, gönüllüler ve diğer ekip üyeleri için özel roller oluşturabilirsiniz; her birinin erişim düzeyi ayrı olabilir ve verileriniz güvende kalır.

</div>

## Eğitim Videosu

<YouTube id="ZzCIkinVMnE" title="B1'de Roller, İzinler ve Ekibinizi Davet Etme" next="B1'de Hizmetleri ve Yoklamayı Ayarlama" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Etki alanı yöneticisi (Domain Admin) erişimine veya rolleri yönetme iznine sahip bir role ihtiyacınız var
- Ekip üyelerinin listesini ve ihtiyaç duydukları alanları hazırlayın
- Rollerinizi planlamak için aşağıdaki kullanılabilir izin kategorilerini gözden geçirin

</div>

## Rollere Erişme

1. B1 Admin'de, [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın ve **Ayarlar**'ı genişletin.
2. **Roller**'e tıklayın.
3. Roller sayfası, kilisenizde tanımlı tüm rolleri gösterir. **Üyeler** sütunu her roldeki kullanıcı sayısını gösterir ve **(Herkes)** satırında **Tüm kullanıcılar** yazar.

## Roller Sayfasını Anlamak

Roller sayfası iki panele ayrılmıştır:

- **Sol taraf** -- Seçili role atanmış üyelerin listesini gösterir.
- **Sağ taraf** -- Bu rol için yapılandırabileceğiniz izin ayarlarını gösterir.

Bir rolün üyelerini ve izinlerini görüntülemek ve yönetmek için rol adına tıklayın.

## Role Kullanıcı Ekleme

1. Üye eklemek istediğiniz rolü seçin.
2. Eklemek istediğiniz kişiyi bulmak için sol taraftaki **arama alanını** kullanın.
3. Arama sonuçlarından kişiyi seçin.
4. Kişi hemen role eklenir.

## Rolden Kullanıcı Çıkarma

1. Çıkarmak istediğiniz kullanıcının bulunduğu rolü seçin.
2. Sol taraftaki üye listesinde kişiyi bulun.
3. Adının yanındaki **kaldır düğmesine** tıklayın.

## İzinleri Yapılandırma

Her role, B1 Admin'in belirli alanlarına erişim verilebilir. **İzinleri Düzenle** panelinde izinler; **Yoklama**, **İçerik**, **Bağışlar**, **Formlar ve Planlar**, **Dersler**, **Mesajlaşma**, **Kişiler ve Gruplar** ve **Görevler** gibi genişletebileceğiniz bölümlere ayrılmıştır. Yalnızca eşleşen izinleri göstermek için **İzinleri filtrele** kutusuna yazın.

Bir izni role vermek veya kaldırmak için kutucuğu işaretleyin ya da işaretini kaldırın. Her bölüm başlığı, rolün o bölümdeki izinlerinden kaçına sahip olduğunu gösterir (ör. **5 izinden 2'si**) ve kutucukları işaretledikçe sayı güncellenir.

### Bağış İzinleri

**Bağışlar** bölümünde şu izinler bulunur:

- **Bağış Özetlerini Görüntüle** -- Özet, Toplu İşlemler, Fonlar, Kampanyalar ve Bağış Dökümleri sayfaları dahil olmak üzere Bağışlar bölümünü görün.
- **Bağışları Görüntüle** -- Bir toplu işlemdeki bağışlar gibi tek tek bağışları görün.
- **Bağışları Düzenle** -- Tam kontrol: bağış ve toplu işlemleri ekleme, düzenleme ve silme ile [toplu işlemleri kapatma ve yeniden açma](../donations/batches.md#closing-and-reopening-a-batch).
- **Bağış Girişi** -- Toplu işlem ekleme ile bağış girme, düzenleme veya silme; ancak yalnızca hâlâ açık olan toplu işlemlerde. Yalnızca bu izne sahip kişiler toplu işlemleri silemez, kapatamaz veya yeniden açamaz; ayrıca çevrim içi bağışlardan gelen bağışları değiştiremez.
- **Ayarları Düzenle** -- Bağış ayarlarını yönetin.

**Bağış Girişi** iznine sahip ancak **Bağış Özetlerini Görüntüle** iznine sahip olmayan kişi, **Bağışlar** altında yalnızca **Toplu İşlemler** sayfasını görür. Sayım ekibi rolüne hem **Bağış Girişi** hem de **Bağışları Görüntüle** iznini verin; böylece bir toplu işlemi açıp girdikleri bağışları görebilirler. Ayrıntılar için [Toplu İşlemi Kimler Değiştirebilir](../donations/batches.md#who-can-change-a-batch) bölümüne bakın.

### Yalnızca Kişi Adları

**Kişiler ve Gruplar** bölümünde **Yalnızca Kişi Adlarını Görüntüle** izni bulunur. Bu izni, tam dizine erişimi olmadan kişileri yalnızca ada göre bulmaları gereken gönüllüler için kullanın -- örneğin bir arama kutusunda birini seçmek için. Yalnızca bu izinle bir kişi:

- Ada göre kişi arayabilir ve yakın zamanda eklenen kişilerin listesini görebilir, ancak her kişinin yalnızca adını, fotoğrafını ve üyelik durumunu görür
- E-posta ile arama yapamaz, iletişim bilgilerini göremez veya **Kişiler** dizinini açamaz

Sınıf yoklaması alan gönüllüler için **Yalnızca Kişi Adlarını Görüntüle** iznini **Yoklamayı Görüntüle** veya **Yoklamayı Düzenle** ile birleştirin. Bu durumda menülerindeki **Kişiler**, **Gruplar** sayfasını açar; burada **Tüm gruplar** listesini açıp her sınıfın üye adlarını ve oturumlarını görebilirler. **Yoklamayı Düzenle** iznine sahiplerse [yoklama kaydedebilir](../attendance/recording-attendance.md) ve adlarını arayarak ziyaretçi ekleyebilirler. Adlar kişi kayıtlarına bağlantı değildir ve gizli gruplar, gönüllü üye olmadıkça gizli kalır.

B1 Admin, bir rolün sahip olmadığı izinleri gerektiren bağlantı ve düğmeleri gizler. Örneğin: **Tüm gruplar** listesi yalnızca grupları düzenleyebilen, grup üyelerini görüntüleyebilen veya kişileri görüntüleyebilen kişilere açıktır; ya da **Yalnızca Kişi Adlarını Görüntüle** iznine ek olarak **Yoklamayı Görüntüle** veya **Yoklamayı Düzenle** iznine sahip kişilere açıktır (diğerleri Gösterge Paneline yönlendirilir). Yoklama kurulumu yalnızca **Hizmetleri Düzenle** iznine sahip kişilere görünür. Bir grubun **E-posta** düğmesi yalnızca **Grup Üyelerini Düzenle** iznine (grup e-postası göndermek için gereken izin) sahip kişilere görünür. Bir grup listesini yazdırmak **Grup Üyelerini Görüntüle** iznini veya o grubu yönetmeyi gerektirir. Bir takvim etkinliğini silmek **İçeriği Düzenle** iznini (veya kendi bekleyen talebinizi geri çekmeyi) gerektirir.

### Check-In Kiosk Hesapları

[B1 Checkin](../../b1-checkin/getting-started/logging-in.md) kiosğuna giriş yapan hesabın **Yoklama** bölümünde **Checkin** izni (veya **Yoklamayı Düzenle**) olması gerekir. Yalnızca **Checkin** iznine sahip bir kiosk, aileleri ada veya telefon numarasına göre arayabilir, kişileri giriş ve çıkış yaptırabilir ve bir çocuğu kimlerin alabileceğini gösterebilir; Kişiler dizinine erişimi olmadan.

Checkin artık **(Herkes)** satırı üzerinden verilmez. Başka izinleri olan bir rolde olmak, kişinin kiosku çalıştırmasına izin vermez. **Checkin** iznini "Check-In Gönüllüleri" gibi bir role ekleyin ve kiosk hesaplarını bu role koyun.

:::warning
**Etki Alanı Yöneticileri** (Domain Admins), ChurchApps hesabınızın tüm alanlarına tam erişime sahiptir. Bu izinler değiştirilemez veya kısıtlanamaz. Bu rolü yalnızca en güvendiğiniz yöneticiler için kullanın.
:::

:::tip
"Yalnızca **Bağışlar** erişimi olan **Hazinedar**", "**Bağış Girişi** ve **Bağışları Görüntüle** izinlerine sahip **Sayım Ekibi**" veya yalnızca **Yoklama** erişimi olan **Check-In Gönüllüsü** gibi belirli roller oluşturun. Bu, en az ayrıcalık ilkesini uygular ve verilerinizi güvende tutar. ChurchApps'in bilgilerinizi nasıl koruduğu hakkında daha fazla bilgi için [Veri Güvenliği](./data-security.md) bölümüne bakın.
:::

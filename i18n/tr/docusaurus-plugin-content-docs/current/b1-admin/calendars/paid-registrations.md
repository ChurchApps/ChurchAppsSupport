---
title: "Ücretli Kayıtlar"
description: "B1 Admin'de ücretli etkinlik kaydı kurun: ücretli katılımcı türleri, ek seçenekler, indirim kodları, bekleme listeleri ve bağış sağlayıcınız üzerinden ödeme."
---

# Ücretli Kayıtlar

<div class="article-intro">

Etkinlik kaydı basit bir katılımcı sayımının ötesine geçebilir. Yetişkin ve Çocuk gibi fiyatlandırılmış katılımcı türleri tanımlayabilir, kendi fiyat ve adetleriyle isteğe bağlı ek seçenekler sunabilir, indirim kodları oluşturabilir ve kayıt sırasında kilisenizin mevcut bağış sağlayıcısı üzerinden ödeme alabilirsiniz. Etkinlik dolduğunda, isteğe bağlı bir bekleme listesi ilgilenen üyeleri sırada tutar ve yer açıldıkça onları otomatik olarak kayda alır.

</div>

## Eğitim Videosu

<YouTube id="eGSZv24Dlzk" title="B1'de Etkinlik Kaydı ve Ücretli Etkinlikler" next="B1'de Kilise Web Sitenizi Yayınlama" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Önce etkinlikte kaydı etkinleştirin — bkz. [Takvim Oluşturma](./creating-calendars.md#enabling-event-registration)
- Çevrim içi ödeme almak için kilisenizde [çevrim içi bağış yapılandırılmış](../donations/online-giving-setup.md) olmalıdır (Stripe, PayPal veya Kingdom Funding). Ücretsiz etkinliklerin bağış kurulumuna ihtiyacı yoktur. Çevrim içi bağış olmadan ücretli kayıtlar yine çalışır, ancak kişiler doğrudan kiliseye öder — bkz. [Çevrim İçi Bağışı Olmayan Kiliseler](#churches-without-online-giving).

</div>

## Kayıt Ayarlarını Açma

1. B1 Admin'de, sol üstteki arama çubuğu olan [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) açın, **Takvimler > Kayıtlar** seçeneğini seçin ve etkinliğinizi açın (ya da etkinliği takviminden açın).
2. **Kayıt Ayarları** kartı temel bilgileri gösterir — **Kaydı Etkinleştir**, **Kapasite**, **Kayıt Açılış/Kapanış**, **Etiketler** ve **Kayıt Soruları**.
3. Temel bilgilerin altında üç açılır bölüm bulunur: **Katılımcı Türleri**, **Seçimler** ve **İndirim Kodları**.

## Katılımcı Türleri

Katılımcı türleri, farklı katılımcı grupları için farklı fiyatlar belirlemenize ve her birini ayrı ayrı sınırlandırmanıza olanak tanır.

1. **Katılımcı Türleri** açılır bölümünü genişletin ve **Tür Ekle** düğmesine tıklayın.
2. Bir **Ad** girin (ör. "Yetişkin", "Çocuk", "Öğrenci").
3. Bir **Fiyat** belirleyin. Ücretsiz bir tür için 0 girin.
4. İsteğe bağlı olarak yalnızca bu tür için bir **Kapasite** belirleyin (ör. yalnızca 20 Çocuk yeri). Türe özel bir sınır istemiyorsanız boş bırakın.
5. **Kaydet** düğmesine tıklayın.

Kayıt sırasında her katılımcı bir tür seçer; yeri dolan türler **Tükendi** olarak gösterilir ve seçilemez. Katılımcı listesinde her katılımcının türü ve tür bazında çalışan sayıları görünür.

## Seçimler

Seçimler, isteğe bağlı ücretli ek seçeneklerdir — tişörtler, yemek planları, etkinlik yükseltmeleri gibi.

1. **Seçimler** açılır bölümünü genişletin ve **Seçim Ekle** düğmesine tıklayın.
2. Bir **Ad**, isteğe bağlı bir **Açıklama** ve bir **Fiyat** girin (0 değeri "Ücretsiz" olarak görünür).
3. İsteğe bağlı olarak bir **Kapasite** (tüm kayıtlar genelinde toplam mevcut adet) ve bir **Maks. Adet** (tek bir kaydın sipariş edebileceği en fazla adet) belirleyin.
4. **Kaydet** düğmesine tıklayın.

Kayıt olanlar kayıt sırasında adetleri seçer ve toplamlar kapasiteden düşülür; böylece fazla satış yapmazsınız.

## İndirim Kodları

1. **İndirim Kodları** açılır bölümünü genişletin ve **İndirim Kodu Ekle** düğmesine tıklayın.
2. Kayıt olanların yazacağı **Kodu** girin.
3. **Tür** olarak **Yüzde** veya **Tutar** seçin ve **Değerini** girin.
4. İsteğe bağlı olarak kodu bir **Başlangıç Tarihi** / **Bitiş Tarihi**, bir **Min. Katılımcı** (kayıttaki en az katılımcı sayısı) ve **Maks. Kullanım** ile sınırlandırın.
5. **Kaydet** düğmesine tıklayın.

Her kod, ne sıklıkla kullanıldığını görebilmeniz için bir **Kullanım** sayısı gösterir. Kayıt olanlar bir kodu uyguladıklarında anında geri bildirim alır — kodun süresinin dolduğu, henüz başlamadığı veya daha fazla katılımcı gerektirdiği durumlarda açık mesajlar dahil.

## Bekleme Listesi

Kayıt Ayarları kartında **Bekleme Listesini Etkinleştir** seçeneğini açın. Etkinlik kapasiteye ulaştığında:

- Yeni kayıt olanlara geri çevrilmek yerine bir bekleme listesi yeri önerilir. Aynı kayıt adımlarını tamamlarlar (bekleme listesindeyken ödeme atlanır).
- Biri iptal ettiğinde, en eski bekleme listesi kaydı **otomatik olarak kayda alınır** ve yer açıldığını bildiren bir e-posta alır. Ödenmemiş bakiyeleri varsa e-posta, kilisenizin B1 sitesindeki [Kayıtlarım](../../b1-church/events/my-registrations.md) sayfasına bir bağlantı içerir; ödemeyi orada tamamlayabilirler.
- Etkinlik kapasitesini artırdıktan sonra yararlı olabileceği gibi, bekleme listesindeki bir satırdaki **Kayda Al** işlemiyle istediğiniz zaman birini manuel olarak kayda alabilirsiniz.

:::info
Kayda alınan kayıtlar, herhangi bir bakiye ödenene kadar *beklemede* kalır; ödeme yapıldığında (ya da ödenecek bir şey olmadığında) kayıt onaylanır.
:::

## Kayıt Listesi

Tüm kayıtları görmek için Kayıtlar sayfasından bir etkinlik açın. Kart başlığı, kapasiteye karşı kaç kaydın yer tuttuğunu gösterir (ör. *Kayıtlar (18 / 20)*). Yalnızca beklemede ve onaylanmış kayıtlar sayılır; bekleme listesinde kişiler olduğunda başlığa bu sayı eklenir (ör. *· 3 bekleme listesinde*) ve aynı sayı kapasite çubuğunun altında da görünür. Tabloda **Ad**, **Katılımcılar**, **Tür** (her katılımcının türü), **Ödenen / Toplam** (hâlâ ödenmesi gereken bir miktar varsa bakiye uyarısıyla birlikte), **Durum** ve **Tarih** sütunları ile tablonun üzerinde tür bazında sayı etiketleri bulunur.

- Bir satırın ayrıntılar simgesine tıklayarak **Kayıt Ayrıntıları** penceresini açın — katılımcılar, seçimler, ödenen/bakiye ve her ücreti (tutar, yöntem, tarih) listeleyen bir **Ödemeler** tablosu.
- **CSV Dışa Aktar**, katılımcılar, katılımcı türleri, seçimler, ödenen/toplam/bakiye, durum ve her kayıt sorusu için bir sütun içeren tüm listeyi indirir.
- **Katılımcı Ekle**, kilisenizdeki herhangi biri için çevrim dışı veya telefonla yapılan bir kaydı kaydeder. Kişiyi seçin ve ücretli bir etkinlikse katılımcı türünü belirleyin. Bu kişiden ücret alınmaz: ücretli bir kayıt, tüm tutarı ödenecek bakiye olarak gösterilerek **beklemede** kaydedilir. Kilisenizde çevrim içi bağış varsa kişi bu tutarı [Kayıtlarım](../../b1-church/events/my-registrations.md) sayfasından ödeyebilir; yoksa kişiden yüz yüze tahsil edin. Katılımcı eklemek için Kayıtlar Düzenleme iznine ihtiyacınız vardır.

:::info
B1 içinden iade işlemi yapılmaz. İptal edilmiş ücretli bir kaydı iade etmeniz gerekirse, iadeyi bağış sağlayıcınızın panelinden (ör. Stripe) yapın.
:::

## Ödeme Nasıl Çalışır

Ödemeler, kilisenizin bağışlar için zaten kullandığı bağış ağ geçidi üzerinden yapılır — kart bilgileri doğrudan sağlayıcıya gider ve B1'in sunucularına hiç uğramaz. Fiyatlar her zaman yapılandırdığınız türler, seçimler ve indirim kodlarına göre sunucuda hesaplanır; bu nedenle kayıt olan biri toplam tutarı değiştiremez. Giriş yapmış üyeler kayıtlı kartlarıyla ödeme yapabilir. Misafirler ödeme sırasında bir kart girer ve ödeme yapmadan önce **Ben robot değilim** kutusunu işaretlemelidir.

### Çevrim İçi Bağışı Olmayan Kiliseler

Kilisenizde bir bağış sağlayıcısı kurulu değilse, ücretli etkinlikler yine de kayıt alabilir. Ödeme adımı, kayıt olanlara çevrim içi ödemenin kullanılamadığını ve doğrudan kiliseye ödeme yapabileceklerini bildirir; **Kaydol ve Sonra Öde** düğmesi ise kaydı kaydeder. Kayıt, tüm tutarı ödenecek bakiye olarak **beklemede** kaydedilir ve kayıt listesinde bakiye uyarısıyla görünür. Parayı kilisenizin normal yöntemiyle tahsil edin.

:::info
B1'de çevrim dışı bir ödemenin alındığını işaretlemenin bir yolu yoktur. Tahsil ettikten sonra ödenecek bakiye listede ve kayıt olanın [Kayıtlarım](../../b1-church/events/my-registrations.md) kartında kalır; bu nedenle kimin ödediğine dair kendi kaydınızı tutun.
:::

## İlgili Makaleler

- [Takvim Oluşturma](./creating-calendars.md#enabling-event-registration) — kaydı ve temel ayarları etkinleştirin
- [Çevrim İçi Bağış Kurulumu](../donations/online-giving-setup.md) — ödeme sırasında kullanılan ödeme ağ geçidini yapılandırın
- [Etkinliklere Kayıt Olma](../../b1-church/events/registering.md) — üyelerin kayıt olurken gördükleri ekranlar
- [Kayıtlarım](../../b1-church/events/my-registrations.md) — üyeler bakiyelerini nasıl öder ve kayıtlarını nasıl düzenler

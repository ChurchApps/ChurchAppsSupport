---
title: "Check-In Etiket Tasarımcısı"
---

# Check-In Etiket Tasarımcısı

<div class="article-intro">

Etiket Tasarımcısı, aileler çocuklarını check-in yaptırdığında yazdırılan isim etiketi ve teslim fişi şablonlarını oluşturmanıza ve özelleştirmenize olanak tanır. Her etikette hangi bilgilerin görüneceğini, nerede konumlandırılacağını ve nasıl görüneceğini tam olarak kontrol edebilirsiniz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- [Yoklama](setup) bölümünü ayarlayın ve check-in etkin en az bir ibadet saati tanımlayın
- Etiketlerin yazdırılabilmesi için [Check-In](check-in) bölümünü kurun
- Yoklama bölümüne yönetici erişimine ihtiyacınız var

</div>

## Etiket Tasarımcısını Açma

B1 Admin'de [Atlama menüsü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) öğesini açın, **Mobile** bölümünü genişletin ve **B1 CheckIn** öğesine tıklayın. Ardından Check-in Etiketleri kartındaki **Design Labels** düğmesine tıklayın. Kayıtlı etiket şablonlarınızın bir listesini göreceksiniz; bunlar türlerine göre **Nametag** (İsim Etiketi) ve **Pickup Slip** (Teslim Fişi) olarak ayrılmıştır.

## Etiket Türleri

- **Nametag** (İsim Etiketi) — yazdırılıp çocuğa takılır. Genellikle çocuğun adını, sınıfını/oturumunu ve bir güvenlik kodunu içerir.
- **Pickup Slip** (Teslim Fişi) — veli veya vasiye verilir. Genellikle güvenlik kodunu ve check-in yaptırdıkları çocukların listesini içerir.

B1, standart 3,5 × 1,1 inçlik termal etiketlere uygun varsayılan bir isim etiketi ve varsayılan bir teslim fişi şablonuyla başlar.

## Etiket Şablonu Oluşturma

1. **Add** düğmesine tıklayın ve menüden bir başlangıç noktası seçin: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** veya **Blank** (Boş).
2. Yeni şablon etiket düzenleyicisinde açılır.

### Etiket Düzenleyicisi

Düzenleyici, etiketin yapılandırılmış boyutundaki ölçeklendirilmiş bir önizlemesini gösterir. Sol panelde şunları yapılandırabilirsiniz:

- **Name** (Ad) — şablon adı (yalnızca sizin başvurunuz için)
- **Label Type** (Etiket Türü) — Nametag veya Pickup Slip
- **Width / Height** (Genişlik / Yükseklik) — etiket boyutu (inç cinsinden)

### Blok Ekleme

Bir etiket, bloklardan oluşur; bloklar etiket tuvali üzerinde konumlandırılmış ayrı içerik parçalarıdır. Yeni bir blok eklemek için **Add Block** (Blok Ekle) düğmesine tıklayın ve türünü seçin:

- **Field** (Alan) — yazdırma sırasında bir veri değerini çeker:
  - `person.displayName` — kişinin tam adı
  - `sessions` — kişinin check-in yaptığı ibadet/sınıf
  - `securityCode` — rastgele oluşturulan teslim güvenlik kodu
  - `children` — çocuk listesi (teslim fişleri için)
  - `person.nametagNotes` — kişinin kaydındaki özel notlar
  - `person.isBirthdayWeek` — kişinin doğum günü (ay ve gün) check-in tarihinden önce veya sonra 3 gün içindeyse true
  - `campus` — kampüs adı
- **Text** (Metin) — yazdığınız sabit metin (başlıklar, etiketler veya talimatlar için)
- **Barcode** (Barkod) — güvenlik kodunu kodlayan bir barkod

### Blokları Konumlandırma

Her blokta, etiket tuvalinin yüzdesi (0–100) olarak ifade edilen **X**, **Y**, **Width** (Genişlik) ve **Height** (Yükseklik) alanları bulunur. İçeriği hassas biçimde konumlandırmak için bunları ayarlayın. Ayrıca şunları da belirleyebilirsiniz:

- **Font Size** (Yazı Boyutu) — noktalar cinsinden metin boyutu
- **Bold** (Kalın) — kalın metni açıp kapatma
- **Align** (Hizalama) — metni sola, ortaya veya sağa hizalama
- **Condition** (Koşul) — bir alan boşsa bloğu isteğe bağlı olarak gizleyin (örneğin, nametagNotes yalnızca bir değere sahipse gösterilsin). Bu özellik `person.isBirthdayWeek` ile de çalışır; böylece doğum günü süsü veya metni, yalnızca doğum günü check-in tarihinden birkaç gün içinde olan çocukların isim etiketlerinde görünür.

### Kaydetme

Şablonu kaydetmek için **Save** (Kaydet) düğmesine tıklayın. Güncellenen şablon, B1 Checkin'de etiketlerin bir sonraki yazdırılışında kullanılır.

## Şablonları Yeniden Sıralama

Birden fazla isim etiketi veya teslim fişi şablonunuz varsa, B1 Checkin varsayılan olarak listedeki ilk şablonu kullanır. Şablonları yeniden sıralamak için sürükleyin.

## Şablon Silme

Herhangi bir şablon satırındaki silme simgesine tıklayın ve onaylayın. Bir türdeki son şablonu silmek, varsayılan yerleşik şablonu geri yükler.

:::tip
Bir sonraki ibadetinizden önce düzenin doğru göründüğünü doğrulamak için şablonu düzenledikten sonra bir test çıktısı alın.
:::

## İlgili Makaleler

- [Check-In Kurulumu](setup) — check-in için ibadetleri ve grupları yapılandırın
- [Check-In Tamamlama](check-in) — aileler için check-in akışı
- [B1 Checkin Başlangıç](../../b1-checkin/getting-started/) — Checkin kiosk uygulaması

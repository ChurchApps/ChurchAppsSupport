---
title: "Yoklama Girişi ve Eğilim"
description: "Adlı liste olmadan B1 Admin'de bir hizmet ya da grup için toplam katılımcı sayısı girin ve bu toplamları Headcount Trend raporunda haftalık olarak izleyin."
---

# Yoklama Girişi ve Eğilim

<div class="article-intro">

Katılımcı sayısı girişleri, adını bildiğiniz bir listeyi yoklamadan, bir ibadet, bir ibadet saati veya bir grup için basit bir toplam katılım sayısını kaydetmenizi sağlar. Yalnızca "burada kaç kişi vardı?" bilgisine ihtiyacınız olduğunda bunu kullanın ve bu sayının zaman içindeki değişimini izlemek için Katılımcı Sayısı Eğilimi raporuyla birlikte kullanın.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kampüslerinizin, ibadetlerinizin ve ibadet saatlerinizin yapılandırılmış olması gerekir. Bkz. [Yoklama Kurulumu](setup.md).
- Katılımcı sayısı girmek için **Yoklama &gt; Düzenle** izni, eğilim raporunu görüntülemek için ise **Yoklama &gt; Görüntüle** izni gerekir. Bkz. [Roller ve İzinler](../settings/roles-permissions.md).

</div>

:::info
Katılımcı sayısı, [Yoklama Kaydetme](recording-attendance.md) özelliğinin yalnızca toplam değer tutan bir alternatifidir. **Kimin** katıldığını bilmeniz gerekiyorsa -- örneğin uzun süredir gelmeyen kişilerle ilgilenmek için -- bir grubun Oturumları içindeki adlandırılmış oturum yoklamasını kullanmaya devam edin. Katılımcı sayısı yalnızca bir sayı saklar.
:::

## Katılımcı Sayısı Kaydetme

1. **B1 Admin** uygulamasını açın, [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Kişiler** bölümünü genişletin ve **Yoklama** seçeneğine tıklayın.
2. Sol sütundaki **Katılımcı sayısı gir** seçeneğine tıklayın.
3. Formu doldurun:
   - **Ibadet** *(zorunlu)*
   - **İbadet Saati** -- tüm ibadet saatleri için toplam kaydetmek istiyorsanız boş bırakın
   - **Grup** -- isteğe bağlı; yalnızca Yoklama Takibi etkinleştirilmiş gruplar listelenir. "Grup yok (tüm ibadet)" seçeneği için boş bırakın.
   - **Tarih**
   - **Katılımcı Sayısı** -- mevcut olan toplam kişi sayısı
4. **Kaydet** seçeneğine tıklayın.

Formun yanındaki **Son Katılımcı Sayıları** tablosu, son birkaç kaydınızı tarih, ibadet, ibadet saati, grup ve sayı bilgileriyle listeler. Bir düzeltme yapmanız veya silmeniz gerekirse, bir satıra tıklayarak kaydı forma geri yükleyebilirsiniz.

## Katılımcı Sayısı Eğilim Raporu

1. Aynı **Yoklama** sayfasında, sol sütundaki **Tüm yıllar** seçeneğine tıklayın ve ardından **Katılımcı Sayısı Eğilimi** sekmesini seçin.
2. Raporu daraltmak için **Kampüs**, **İbadet**, **İbadet Saati** ve **Grup** filtrelerini kullanın.

Rapor, kaydedilen katılımcı sayılarını haftalık olarak toplar ve hem bir çizgi grafiği hem de bir tablo olarak gösterir. Bu, [Yoklama Eğilimi ve Grup Yoklaması sekmelerinde](tracking-attendance.md) kullanılan rapor biçimiyle aynıdır. Bu hafta girilen katılımcı sayıları, ana Yoklama sayfasında **Bu haftaki katılımcı sayıları** başlığı altında da görünür.

## İlgili Sayfalar

- [Yoklama Kaydetme](recording-attendance.md) -- adlandırılmış, kişi bazında oturum yoklaması
- [Yoklamayı Takip Etme](tracking-attendance.md) -- yoklama ve grup eğilim raporları
- [Yoklama Kurulumu](setup.md) -- kampüsleri, ibadetleri ve ibadet saatlerini yapılandırma

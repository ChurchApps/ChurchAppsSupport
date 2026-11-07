---
title: "Müsaitlik Takvimi"
description: "B1 Admin'de rezerve edilebilir oda ve ekipmanları kurun; takvime rezervasyon yapın, hazırlık sürelerini ekleyin ve tekrarlayan ya da onaylı rezervasyonları yönetin."
---

# Müsaitlik Takvimi

<div class="article-intro">

Müsaitlik Takvimi, kilisenizdeki tüm oda ve kaynak rezervasyonlarına genel bir bakış sunar. Buradan neyin planlandığını görebilir, çakışmaları önceden fark edebilir ve herhangi bir etkinlik için doğrudan bir oda veya kaynak ayırtabilirsiniz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Oda ve Kaynaklar bölümünde en az bir [oda veya kaynak](./rooms-resources.md) ayarlayın
- B1 Admin içindeki Takvimler bölümünü düzenleme erişiminiz olmalıdır

</div>

## Müsaitlik Takvimini Açma

B1 Admin'de, sayfanın sol üstündeki arama çubuğu olan [Atlama menüsü](../introduction.md#getting-around-with-the-jump-menu) öğesini açın, **Takvimler** öğesini genişletin ve **Müsaitlik**'e tıklayın.

## Takvimi Okuma

Takvim varsayılan olarak içinde bulunulan ayı gösterir. Sayfanın üstündeki oklarla ileri ve geri gidebilir ya da ay, hafta ve gün görünümleri arasında geçiş yapabilirsiniz.

Her etkinlik rezervasyon durumuna göre renklendirilmiştir:

| Renk | Anlamı |
|-------|---------|
| Yeşil | Onaylandı |
| Turuncu | Onay bekliyor |
| Gri | Engellendi (müsait değil) |

Bir etkinliğin üzerine geldiğinizde etkinlik başlığı ve bağlı olduğu oda veya kaynak görünür.

## Oda veya Kaynağa Göre Filtreleme

Takvimi tek bir oda veya kaynağa indirgemek için sol üstteki **Oda / Kaynak** açılır menüsünü kullanın. Tam görünüme dönmek için **Tüm Oda ve Kaynaklar** seçeneğini seçin.

## Oda veya Kaynak Ayırtma

1. Sayfanın üstündeki **Rezerve Et** düğmesine tıklayın.
2. Açılan pencerede etkinlik bilgilerini doldurun:
   - **Başlık** — etkinliğin adı
   - **Başlangıç** ve **Bitiş** tarih/saat
   - **Görünürlük** — Herkese Açık veya Özel
   - **Odalar** — ayırtmak istediğiniz bir veya daha fazla odayı seçin
   - **Kaynaklar** — ayırtmak istediğiniz bir veya daha fazla kaynağı seçin
3. İsteğe bağlı olarak **Hazırlık** ve **Toparlanma** sürelerini (dakika cinsinden) ayarlayın. Bu süreler rezervasyonun her iki ucuna eklenir; böylece etkinlik başlangıç ve bitiş saatleri değişmese de alan kurulum ve temizlik için ayrılmış olur.
4. Rezervasyonu tekrarlamak için **Tekrarlar** kutusunu işaretleyin ve tekrar ayarlarını yapılandırın:
   - **Her şu aralıkla tekrarla** -- aralığı belirleyin (örneğin, her 2 haftada bir).
   - **Sıklık** -- Günlük, Haftalık veya Aylık. Haftalık seçeneğinde haftanın belirli günlerini seçebilirsiniz; Aylık seçeneğinde ayın sabit bir gününü veya "ikinci Salı" gibi göreli bir düzeni seçebilirsiniz.
   - **Bitiş** -- Hiçbir zaman, belirli bir tarihte veya belirli sayıda tekrardan sonra.
5. Özel bir rezervasyon penceresi belirlemek için (etkinliğin başlangıç/bitiş saatlerinden farklı olarak) **Özel Rezervasyon Penceresi** seçeneğini açın ve pencerenin başlangıç ve bitiş saatlerini girin. Bu seçeneği, bir odanın etkinliğin listelenen saatleri dışında da erişilebilir olması gerektiğinde kullanın.
6. Rezervasyonu göndermek için **Kaydet**'e tıklayın.

:::info
Oda veya kaynak için bir **Onay Grubu** yapılandırılmışsa, rezervasyon o grubun bir lideri onaylayana kadar **Beklemede** olarak görünür. Onay süreci için [Takvim Onayları](./approvals.md) bölümüne bakın.
:::

:::tip
Takvim, kaydetmeden önce tüm çakışmaları vurgular. Bir çakışma uyarısı görürseniz saatlerinizi düzenleyin veya farklı bir oda seçin.
:::

## İlgili Makaleler

- [Odalar, Kaynaklar ve Planlama](./rooms-resources.md) — rezerve edilebilir alanları ve ekipmanları ayarlayın
- [Takvim Onayları](./approvals.md) — rezervasyon taleplerini onaylayın veya reddedin
- [Takvim Oluşturma](./creating-calendars.md) — etkinlik takvimlerini yönetin

---
title: "E-posta Şablonları"
---

# E-posta Şablonları

<div class="article-intro">

E-posta Şablonları, karşılama mesajı, etkinlik hatırlatıcısı veya bağış teşekkür notu gibi yeniden kullanılabilir e-posta içeriklerini kaydetmenizi sağlar. Böylece siz (veya bir [iş akışı](../serving/workflows.md)) her seferinde baştan yazmak yerine tek tıklamayla gönderebilirsiniz. Aynı listede, grup ve kişi Metin pencereleri için metin mesajı şablonları da bulunur.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- B1 Admin içindeki Ayarlar alanına erişiminiz olmalıdır.

</div>

## E-posta Şablonlarına Erişme

1. B1 Admin'de, sol üstteki arama çubuğu olan [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) açın ve **Ayarlar** bölümünü genişletin.
2. **E-posta Şablonları**'na tıklayın.
3. Mevcut şablonların konu, kategori ve son değiştirilme tarihini içeren bir liste görürsünüz.

## Şablon Oluşturma

1. **Yeni Şablon**'a tıklayın.
2. Listede tanımlamak için bir **Şablon Adı** girin ve şablonlarınızı düzenlemeye yardımcı olmak üzere bir **Kategori** seçin (Genel, Etkinlikler, Gruplar, Bağış, Karşılama veya Metin). Bunun yerine bir metin mesajı şablonu oluşturmak için **Metin**'i seçin (aşağıdaki [Metin Şablonları](#text-templates) bölümüne bakın).
3. **Konu** satırını girin.
4. Zengin metin düzenleyicisini kullanarak **İçerik** kısmını yazın.
5. **Kaydet**'e tıklayın.

## Birleştirme Alanları

Konu veya İçerik'in üstündeki bir birleştirme alanı çipine tıklayarak alanı imlecinizin olduğu yere ekleyin. Önce alanı eklemek istediğiniz metin yerine tıklayın, ardından çipe tıklayın. İmleciniz yerinde kalır, böylece eklenen alanın hemen ardından yazmaya devam edebilirsiniz. İçeriğe tıklamadan İçerik çipine tıklarsanız, alan içeriğin sonuna eklenir. E-posta gönderildiğinde, her birleştirme alanı alıcının gerçek bilgileriyle değiştirilir:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Alıcının adı
- `{{email}}` -- Alıcının e-posta adresi
- `{{churchName}}` -- Kilisenizin adı

## Metin Şablonları

**Metin** kategorisindeki bir şablon, e-posta yerine metin gönderimi için düz metin mesajıdır:

- Konusu yoktur. Zengin metin düzenleyicisinin yerini, en fazla 1.600 karakter alabilen düz bir **Metin Mesajı** kutusu alır.
- Kutunun üstündeki birleştirme alanı çipleri, imlecinizin olduğu yere `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` veya `{{churchName}}` ekler.
- Metin şablonları, bir [grup](../groups/group-members.md#texting-group-members) veya tek bir kişi için Metin penceresinin **Şablon Yükle (isteğe bağlı)** seçicisinde görünür. Birini seçmek mesajı doldurur ve göndermeden önce yine de düzenleyebilirsiniz.
- İş akışındaki **E-posta gönder** eylemi dahil, e-posta şablonu seçicilerinin dışında tutulurlar.

Metin gönderimi için bağlı bir [metin sağlayıcısı](./church-settings.md#texting) gerekir.

## Şablonu Önizleme

Kaydetmeden veya göndermeden önce, konunun ve içeriğin birleştirme alanlarına örnek verilerle nasıl görüneceğini görmek için **Önizleme**'ye tıklayın.

## Şablon Kullanma

Kaydedilmiş şablonlar, kişilere veya bir gruba e-posta yazarken seçilebilir ve [İş Akışları](../serving/workflows.md) içinde bir eylem olarak kullanılabilir. Kilisenizin bunları gönderebilmesi için, ChurchApps ekibinin grup e-postası için bunu bir kez onaylaması gerekir. Bkz. [Kilisenizde Grup E-postasını Açma](../groups/group-members.md#turning-on-group-email-for-your-church).

## Düzenleme ve Silme

Güncellemek için bir şablonun yanındaki **Düzenle** simgesine, kalıcı olarak kaldırmak için **Sil** simgesine tıklayın.

## Sonraki Adımlar

- [İş Akışları](../serving/workflows.md) -- Kurallara göre bir şablon e-postasını otomatik olarak tetikleyin

---
title: "Takvim Onayları"
description: "B1 Admin'de bekleyen oda ve kaynak rezervasyonlarını inceleyin, çakışmaları kontrol edin, onaylayın ya da reddedin; isterseniz etkinliği yayınlayın."
---

# Takvim Onayları

<div class="article-intro">

Onaylar sayfası, yöneticilerin bekleyen oda ve kaynak rezervasyon taleplerini ve yayımlanmadan önce onay gerektiren takvim etkinliklerini inceleyip işlem yapabileceği yerdir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- [Odalar ve Kaynaklar](./rooms-resources.md) bölümünde odalara veya kaynaklara bir **Onay Grubu** tanımlayın
- **Takvimler Yöneticisi** iznine veya **content.edit** iznine sahip olmanız gerekir

</div>

## Onaylar Sayfasını Açma

B1 Admin'de, sol üstteki arama çubuğu olan [Atlama menüsü](../introduction.md#getting-around-with-the-jump-menu) öğesini açın, **Takvimler** öğesini genişletin ve **Onaylar** öğesine tıklayın. İnceleme bekleyen rezervasyon talepleri ve etkinlikler burada listelenir.

## Rezervasyon Talepleri

Bir grup etkinlik oluşturup bir oda veya kaynak talep ettiğinde, talep **Oda ve Kaynak Talepleri** bölümünde görünür. Her satırda şunlar gösterilir:

- Etkinlik adı ve tarih/saat
- Talep edilen oda veya kaynak (çok birimli kaynaklar için miktarıyla birlikte)
- Talebin çakışma içerip içermediğini gösteren bir durum rozeti

### Çakışma Göstergeleri

Bir talep, aynı oda veya kaynak için başka bir rezervasyonla veya engellemeyle örtüşüyorsa, durumunda **Çakışmalar** rozeti görünür; ayrıntıları görmek için üzerine gelin. Örtüşmesi olmayan talepler **Çakışma yok** olarak gösterilir. Herhangi birini onaylamadan önce çakışan talepleri dikkatle inceleyin.

### Onaylama veya Reddetme

Herhangi bir rezervasyon talebinde **Onayla** veya **Reddet** düğmesine tıklayın (reddetmeden önce onay istenir). Talepte bulunan gruba karar bildirilir. Onaylanan rezervasyonlar, etkinlik için o oda veya kaynağa kilitlenir; reddedilen rezervasyonlar ise zaman dilimini başkalarının kullanımına açar.

**Onayla** düğmesine tıkladığınızda, aynı adımda etkinliği de yayımlayabilmeniz için bir **Rezervasyonu onayla** iletişim kutusu açılır:

1. Etkinliği grubunun takviminde herkese açık hale getirmek için **Herkese açık takvimde yayımla** seçeneğini işaretleyin. Etkinliğin görünürlüğünü değiştirmeden rezervasyonu onaylamak için bu seçeneği işaretsiz bırakın.
2. **Herkese açık takvimde yayımla** işaretlendikten sonra, isterseniz **Ayrıca takvime ekle** seçeneğinden etkinliği [özel takvimlerinizden](./curated-calendar.md) birine de ekleyebilirsiniz. Bu adımı atlamak için **Yok** olarak bırakın. (Bu seçenek yalnızca **content.edit** iznine sahipseniz görünür.)
3. **Onayla** düğmesine tıklayın.

## Bekleyen Etkinlikler

Takvim iş akışınız, etkinliklerin herkese açık hale gelmeden önce onaylanmasını gerektiriyorsa, bekleyen etkinlikler **Etkinlik Talepleri** bölümünde görünür. Etkinliği takvimde yayımlamak için **Onayla**, gönderene değişiklik gerektiğini bildirmek için **Reddet** düğmesine tıklayın.

:::tip
Bir odanın bu oda için onay gerektirmesini sağlamak amacıyla [Odalar ve Kaynaklar](./rooms-resources.md) bölümünde o odaya bir Onay Grubu tanımlayın. Erişimi olan gruplar etkinlik oluştururken odayı talep edebilir ve bu talepler bu sayfaya düşer.
:::

## İlgili Makaleler

- [Odalar, Kaynaklar ve Planlama](./rooms-resources.md) — rezerve edilebilir odaları ve kaynakları yapılandırın
- [Takvim Oluşturma](./creating-calendars.md) — takvimleri ve etkinlikleri yönetin

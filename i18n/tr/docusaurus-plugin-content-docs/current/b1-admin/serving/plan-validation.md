---
title: "Plan Doğrulama ve Bildirimler"
description: "B1 Admin'de hizmet planlarını boş pozisyonlar, zamanlama çakışmaları ve müsait olmayan gönüllüler açısından kontrol edin; ardından tüm ekibinize tek tıklamayla push bildirimi gönderin."
---

# Plan Doğrulama ve Gönüllü Bildirimleri

<div class="article-intro">

B1 Admin, planlarınızı Pazar gününden önce otomatik olarak sorunlara karşı kontrol eder: boş pozisyonlar, zamanlama çakışmaları ve tarihi müsait olmadığını belirten gönüllüler. Her şey yolundaysa, tek tıklamayla tüm ekibinize bildirim gönderebilirsiniz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Bir [hizmet planı](./plans.md) oluşturun ve gönüllüleri pozisyonlara atayın
- Çakışma tespitinin örtüşmeleri kontrol edebilmesi için plana [hizmet saatleri](./plans.md) ekleyin
- Gönüllülerin push bildirimleri alabilmesi için [B1 App'in yüklü](../../b1-church/getting-started/installing-pwa.md) olduğundan emin olun

</div>

## Doğrulama Paneli

Her plan, siz onu oluştururken otomatik çalışan bir **Doğrulama** paneline sahiptir. Üç şeyi kontrol eder:

### Boş Pozisyonlar
Bir pozisyon, şu an atanmış olandan daha fazla kişi gerektiriyorsa, doğrulama paneli tam olarak neyin hâlâ eksik olduğunu listeler. Örneğin: *"Ses Teknisyeni: 1 kişi daha gerekli."* Hafta gelmeden planınızın tam kadrolu olup olmadığını bir bakışta görebilirsiniz.

### Zamanlama Çakışmaları
Bir gönüllü, aynı plan içinde zaman olarak örtüşen iki pozisyona atanmışsa, doğrulama paneli çakışmayı işaretler. Örneğin: *"Jane Smith: Pazar Ibadeti sırasında Ibadet Lideri ile Çocuk Check-in arasında zaman çakışması."* Bu, Pazar sabahı bir soruna dönüşmeden önce çifte rezervasyonları yakalar.

### Müsaitlik Dışı Tarihler
Gönüllüler B1 App içinde müsait olmadıkları tarihleri belirleyebilir. Birisi, müsaitlik dışı tarihlerinden birine denk gelen bir plana atanmışsa, doğrulama paneli çakışmayı otomatik olarak gösterir, böylece bir yedek bulabilirsiniz.

### Planlar Arası Çakışmalar
Doğrulama ayrıca tüm planlarınızı aynı anda kontrol eder. Aynı gönüllü, zaman olarak örtüşen iki farklı planda atanmışsa (örneğin 10:30'a kadar süren bir sabah 9 ibadeti ve bir sabah 10 ibadeti) B1 Admin o kişiyi planlar arasında çifte rezerve olarak işaretler.

:::tip
Doğrulamayı çalıştırmak için bir şey yapmanıza gerek yok. Bir atama eklediğinizde veya değiştirdiğinizde otomatik olarak güncellenir. Planı oluştururken yalnızca paneli takip edin.
:::

## Gönüllülere Bildirim Gönderme

Planınız hazır olduğunda, doğrudan doğrulama panelinden atanmış tüm gönüllülere tek seferde bildirim gönderebilirsiniz.

1. Planı açın ve **Doğrulama** paneline gidin
2. Bildirilmemiş gönüllüler varsa, kaç kişiye bildirim gönderilmesi gerektiğini gösteren bir bağlantı görürsünüz (ör. *"8 gönüllüye bildirim gönder"*)
3. Henüz bildirilmemiş herkese push bildirimi göndermek için bağlantıya tıklayın
4. Gönüllüler telefonlarında, planlandıklarını bildiren ve atamalarını onaylamaları için yönlendiren bir bildirim alır

:::info
Yalnızca henüz bildirilmemiş gönüllüler dahil edilir. Plana daha sonra birini eklerseniz bağlantı yeniden görünür, böylece diğer ekibi tekrar bildirmeden yeni eklenen kişiye bildirim gönderebilirsiniz.
:::

### Onay İş Akışı Olan Planlar

Planın ayarları bir [onay iş akışı](./workflows.md#serving-assignment-confirmations) belirtiyorsa, panel şunu gösterir: *"Yeni talepler onay iş akışını kullanır. Uygulama uyarıları etkin kalır. Her talep kabul edildiğinde veya reddedildiğinde takip mesajları durur."* Bu durumda:

- Bildirim bağlantısı yalnızca henüz bildirilmemiş ve henüz yanıt vermemiş gönüllüleri sayar.
- Tıklandığında, olağan uygulama içi uyarı gönderilir ve iş akışının panosunda her talep için bir kart oluşturulur. Ardından iş akışı e-posta ve SMS takip mesajlarını gönderir ve gerekirse talebi aramak için birine devreder.
- Plan yayınlanmış olmalı (taslak değil) ve iş akışı etkin olmalıdır. Aksi takdirde panel şunu gösterir: *"Talepler gönderilemedi. Seçilen iş akışının etkin olduğunu ve planın yayınlandığını kontrol edip tekrar deneyin."*

:::warning
Gönüllülerin push bildirimleri alabilmesi için B1 App'in ana ekranlarına yüklü olması ve bildirimlerin etkinleştirilmiş olması gerekir. Kurulum talimatları için [Uygulama Olarak Yükleme (PWA)](../../b1-church/getting-started/installing-pwa.md) bölümüne bakın.
:::

## İlgili Makaleler

- [Hizmet Planları](./plans.md)
- [İş Akışları](./workflows.md)
- [B1.church PWA'sını Yükleme](/docs/b1-church/getting-started/installing-pwa)

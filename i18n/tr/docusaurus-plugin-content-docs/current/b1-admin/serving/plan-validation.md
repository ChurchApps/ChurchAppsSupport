---
title: "Plan Doğrulama ve Bildirimler"
description: "B1 Admin'deki hizmet planlarını doldurulmamış pozisyonlar, zamanlama çakışmaları ve müsait olmayan gönüllüler açısından kontrol edin, ardından ekibinize tek tıkla anlık bildirim gönderin."
---

# Plan Doğrulama ve Gönüllü Bildirimleri

<div class="article-intro">

B1 Admin, Pazar gününden önce planlarınızdaki sorunları otomatik olarak kontrol eder: boş kalmış pozisyonlar, zamanlama çakışmaları ve tarihi engellemiş gönüllüler. Her şey yolundaysa, tek tıklamayla tüm ekibinize bildirim gönderebilirsiniz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Bir [hizmet planı](./plans.md) oluşturun ve gönüllüleri pozisyonlara atayın
- Çakışma tespitinin örtüşmeleri kontrol edebilmesi için plana [hizmet saatleri](./plans.md) ekleyin
- Gönüllülerin anlık bildirim alabilmesi için B1 Mobile uygulamasını yüklü tuttuklarından emin olun

</div>

## Doğrulama Paneli

Her planda, siz planı oluştururken otomatik olarak çalışan bir **Doğrulama** paneli bulunur. Bu panel üç şeyi kontrol eder:

### Boş Pozisyonlar
Bir pozisyon, şu an atanmış olandan daha fazla kişi gerektiriyorsa, doğrulama paneli hâlâ neye ihtiyaç duyulduğunu tam olarak listeler. Örneğin, *"Ses Teknisyeni: 1 kişi daha gerekli."* Hafta gelmeden planınızın tam kadrolu olup olmadığını bir bakışta görebilirsiniz.

### Zamanlama Çakışmaları
Bir gönüllü, aynı plan içinde zamanda örtüşen iki pozisyona atanmışsa, doğrulama paneli çakışmayı işaretler. Örneğin, *"Jane Smith: Pazar Ayini sırasında Ibadet Lideri ile Çocuk Girişi arasında zaman çakışması."* Bu özellik, çift rezervasyonların Pazar sabahı sorununa dönüşmesini önler.

### Engellenmiş Tarihler
Gönüllüler, B1 Mobile uygulamasında müsait olmadıkları tarihleri belirleyebilir. Birisi, engellenmiş tarihlerinden birine denk gelen bir plana atanmışsa, doğrulama paneli çakışmayı otomatik olarak gösterir. Böylece bir yedek bulabilirsiniz.

### Planlar Arası Çakışmalar
Doğrulama, tüm planlarınızı aynı anda kontrol eder. Aynı gönüllü, zamanda örtüşen iki farklı planda görevlendirilmişse (örneğin, ikisi de 10:30'a kadar süren sabah 9 ve 10 ayinleri), B1 Admin o kişiyi planlar arasında çift rezervasyonlu olarak işaretler.

:::tip
Doğrulamayı çalıştırmak için bir şey yapmanız gerekmez. Bir atama eklediğinizde veya değiştirdiğinizde otomatik olarak güncellenir. Plan oluştururken yalnızca paneli takip edin.
:::

## Gönüllülere Bildirim Gönderme

Planınız hazır olduğunda, doğrulama panelinden doğrudan atanmış tüm gönüllülere tek seferde bildirim gönderebilirsiniz.

1. Planı açın ve **Doğrulama** paneline gidin
2. Bildirim almamış gönüllüler varsa, kaç kişiye bildirim gönderilmesi gerektiğini gösteren bir bağlantı görürsünüz (örneğin, *"8 gönüllüye bildirim gönder"*)
3. Bağlantıya tıklayarak henüz bildirim almamış herkese anlık bildirim gönderin
4. Gönüllüler telefonlarında, görevlendirildiklerini bildiren ve atamalarını onaylamalarını isteyen bir bildirim alır

:::info
Yalnızca henüz bildirim almamış gönüllüler dahil edilir. Plana daha sonra birini eklerseniz, bağlantı yeniden görünür. Böylece diğer ekip üyelerine tekrar bildirim göndermeden yalnızca yeni eklenen kişiye bildirim gönderebilirsiniz.
:::

### Onay İş Akışı Olan Planlar

Planın ayarları bir [onay iş akışı](./workflows.md#serving-assignment-confirmations) belirtiyorsa, panelde *"Yeni istekler onay iş akışını kullanır. Uygulama uyarıları etkin kalır. Her istek kabul edilene veya reddedilene kadar takip mesajları durdurulur."* ifadesi görünür. Bu durumda:

- Bildirim bağlantısı yalnızca henüz bildirim almamış ve henüz yanıt vermemiş gönüllüleri sayar.
- Bağlantıya tıklamak, olağan uygulama içi uyarıyı gönderir ve iş akışının panosunda her istek için bir kart oluşturur. Ardından iş akışı e-posta ve SMS takip mesajlarını gönderir ve gerekirse isteği aranması için birine devreder.
- Plan yayımlanmış olmalıdır (taslak değil) ve iş akışı etkin olmalıdır. Aksi takdirde panelde *"İstekler gönderilemedi. Seçilen iş akışının etkin olduğunu ve planın yayımlandığını kontrol edip yeniden deneyin."* mesajı görünür.

:::warning
Gönüllülerin anlık bildirim alabilmesi için B1.church mobil deneyiminin yüklü olması (ana ekrana eklenmiş PWA veya hâlâ kullananlar için kullanımdan kaldırılmış B1 Mobile yerel uygulaması) ve bildirimlerin etkinleştirilmiş olması gerekir. Kurulum talimatları için [Uygulama Olarak Yükleme (PWA)](/docs/b1-church/getting-started/installing-pwa) bölümüne bakın.
:::

## İlgili Makaleler

- [Hizmet Planları](./plans.md)
- [İş Akışları](./workflows.md)
- [B1.church PWA'sını Yükleme](/docs/b1-church/getting-started/installing-pwa)

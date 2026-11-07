---
title: "Kılavuz: Çocuk Hizmeti Check-In Kurulumu"
---

# Çocuk Hizmeti Check-In Kurulumu

<div class="article-intro">

Bu kılavuz, kiliseniz için çocuk check-in sistemini çalıştırmak üzere gereken her adımda size yol gösterir. Aileleri veritabanına eklemekten, yaşa uygun grupları yapılandırmaya ve pazar sabahı isim etiketleri yazdırmaya kadar tüm süreci kapsar. Sonunda ebeveynler çocuklarını bir kiosk tabletinden check-in yapabilecek ve eşleşen bir güvenlik etiketi alabilecek.

</div>

## Eğitim Videosu

<YouTube id="Ep9CBUcJwPI" title="B1'de Çocuk Check-In Kurulumu" next="B1'de Yoklamayı Kaydetme ve Takip Etme" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- [admin.b1.church](https://admin.b1.church) adresinde kilise hesabınızı oluşturun
- Yönetici erişiminiz olduğundan emin olun. Gerekirse [Roller ve İzinler](../people/roles-permissions.md) sayfasına bakın
- İsteğe bağlı: Başka bir sistemden geçiş yapıyorsanız aileleri içeren bir CSV dosyası hazırlayın

</div>

## Adım 1: Veritabanınıza Aileleri Ekleyin

Check-in'in çalışabilmesi için sistemin ailelerinizi tanıması gerekir. Her çocuk, hane özelliği aracılığıyla bir ebeveynle bağlantılı olmalıdır.

En az bir aileyi eklemek için [Kişi Ekleme](../people/adding-people.md) kılavuzunu izleyin. Dikkat etmeniz gerekenler:

- Önce ebeveyn(ler)i ekleyin
- Her çocuğu ekleyin
- [hane düzenleyicisini](../people/adding-people.md#managing-households) kullanarak hepsini aynı haneye bağlayın

:::tip
Eklemeniz gereken aile sayısı birkaçtan fazlaysa, tek tek eklemek yerine [CSV İçe Aktarma](../people/importing-data.md) aracını kullanın. Tüm kayıt listenizi birkaç dakika içinde içe aktarabilirsiniz.
:::

## Adım 2: Çocuk Grupları Oluşturun

Gruplar, çocukların check-in yaptığı sınıfları tanımlar. Genellikle her yaş aralığı için bir grup oluşturmak istersiniz.

Aşağıdaki gibi gruplar oluşturmak için [Grup Oluşturma](../groups/creating-groups.md) kılavuzunu izleyin:

- **Bebek Odası** (0–2 yaş)
- **Okul Öncesi** (3–5 yaş)
- **İlkokul** (6–10 yaş)

Bu adları ve yaş aralıklarını hizmet yapınıza uyacak şekilde değiştirebilirsiniz.

## Adım 3: Kampüsleri ve Ayinleri Yapılandırın

Check-in, belirli ayin saatlerine bağlıdır. En az bir kampüs ve bir ayin yapılandırmanız gerekir.

[Yoklama Kurulumu](../attendance/setup.md) kılavuzunu izleyerek şunları yapın:

1. Kampüsünüzü ekleyin (ör. "Ana Kampüs")
2. Bir ayin ekleyin (ör. "Pazar Sabahı")
3. Ayin saatini ayarlayın (ör. "09:00") ve isteğe bağlı olarak, her ayinden önce check-in'in otomatik açılmasını ve ayinden sonra kapanmasını sağlamak için bir [check-in programı](../attendance/setup.md#setting-a-check-in-schedule) ayarlayın
4. Çocuk gruplarınızı ayine atayın

## Adım 4: Check-In Uygulamasını Kurun

Şimdi her şeyi bir tablete check-in uygulaması yükleyerek birbirine bağlayın.

1. **B1 Checkin uygulamasını** yükleyin. İndirme bağlantıları için [Check-In](../attendance/check-in.md) makalesine bakın
2. B1 Admin kimlik bilgilerinizle oturum açın
3. Kampüsünüzü ve ayin saatinizi seçin

Ayrıntılı kurulum adımları için tam [Check-In](../attendance/check-in.md) makalesine bakın.

## Adım 5: Donanımınızı Edinin

Kiosk için bir tablete ve isteğe bağlı olarak isim etiketleri için bir Brother etiket yazıcısına ihtiyacınız var.

En azından şunlar gereklidir:
- **Bir Android veya Amazon Fire tableti.** [Önerilen tabletler](../attendance/check-in.md#recommended-hardware) bölümüne bakın
- **Bir Brother etiket yazıcısı.** Bluetooth ve WiFi desteği nedeniyle QL-1110NWB önerilir
- **Brother DK-1201 etiketleri** (1-1/7" x 3-1/2")

:::warning
B1 Checkin uygulamasıyla yalnızca Brother etiket yazıcıları uyumludur. Diğer yazıcı markaları çalışmaz.
:::

## Adım 6: Deneme Check-In'i Yapın

Pazar sabahından önce bir deneme yapın:

1. Tabletinizde B1 Checkin uygulamasını açın
2. Kampüsünüzü ve doğru ayin saatini seçin
3. Eklediğiniz ailelerden birini arayın
4. Bir çocuğu check-in yapın ve şunları doğrulayın:
   - Yoklama, B1 Admin'de **Yoklama** altında görünüyor
   - Yazıcı kullanıyorsanız, isim etiketi doğru yazdırılıyor

:::tip
Başlatmadan önce karşılama ekibi gönüllülerinize check-in süreci hakkında eğitim verin. Genellikle 5 dakikalık hızlı bir tanıtım yeterlidir.
:::

## Tamamlandı!

Çocuk hizmeti check-in'iniz hazır. Ebeveynler ailelerini arayabilir, çocuklarını seçebilir ve kiosktan check-in yapabilir. Yoklama, B1 Admin'de otomatik olarak kaydedilir.

## İlgili Makaleler

- [Kişi Ekleme](../people/adding-people.md) — ziyaret ettikçe daha fazla aile ekleyin
- [Grup Oluşturma](../groups/creating-groups.md) — çocuk gruplarınızı yönetin
- [Yoklama Kurulumu](../attendance/setup.md) — kampüsleri ve ayinleri yapılandırın
- [Check-In](../attendance/check-in.md) — ayrıntılı check-in uygulaması kurulumu ve donanım
- [Yoklamayı Takip Etme](../attendance/tracking-attendance.md) — check-in raporlarını görüntüleyin

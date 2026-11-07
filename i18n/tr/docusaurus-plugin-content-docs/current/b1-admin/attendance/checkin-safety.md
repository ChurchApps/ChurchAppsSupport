---
title: "Check-In Güvenliği"
---

# Check-In Güvenliği

<div class="article-intro">

B1, check-in için bir dizi çocuk güvenliği denetimi içerir: oda kapasite sınırları ve gönüllü-çocuk oranları, kiosk üzerinde yaş ve sınıf rehberliği, üyeleri, misafirleri ve gönüllüleri ayıran check-in türleri ve check-out sırasında doğrulanan, her haneye ait güvenilir teslim alma listesi. Bu sayfada B1 Admin içinde her güvenlik özelliğinin nasıl yapılandırılacağı anlatılmaktadır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- [Katılım yapısını](setup.md) ve [check-in kiosklarını](check-in.md) ayarlayın
- Odalar, ibadet saatlerine bağlı [gruplardır](../groups/creating-groups.md) — aşağıdaki güvenlik ayarları grubun üzerinde bulunur
- Ebeveyni çağırma ve acil durum yayını için bağlı bir SMS sağlayıcısı gerekir ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) veya Mutual Ministry)

</div>

## Oda Kapasitesi ve Odayı Kapatma

Her check-in odası (grup) kendi sınırlarını uygulayabilir. Grubu açın, ayarlarını düzenlemek için **Düzenle**'ye tıklayın ve **Check-In Kapasitesi** bölümünü bulun:

- **Capacity** -- Bu odaya aynı anda check-in yapılabilecek en fazla kişi sayısı. Oda dolduğunda, odaya check-in engellenir ve kiosk dolu odayı belirtir.
- **Guest Capacity** -- Odanın kabul edebileceği misafir sayısına isteğe bağlı ayrı bir sınır.
- **Closed for Check-In** -- Bu odaya yapılan tüm check-in'leri hemen durdurmak için **Evet** seçin (örneğin, bir sınıf iptal edildiğinde veya oda kullanılamadığında). Check-out işlemleri çalışmaya devam eder.

## Gönüllü Oranları

Grubun **Check-In Kapasitesi** bölümü personel kurallarını da içerir:

- **Children per Volunteer** -- Check-in yapmış her gönüllünün sorumlu olabileceği en fazla çocuk sayısı (örneğin 5, beş çocuk başına bir gönüllü anlamına gelir).
- **Minimum Volunteers** -- Çocukların odaya check-in yapabilmesi için check-in yapmış olması gereken en az gönüllü sayısı.

Gönüllüler, kiosk'ta **Gönüllü** türüyle check-in yaptıklarında bu kurallara dahil edilir (aşağıdaki [Check-In Türleri](#check-in-types) bölümüne bakın).

### Uyarı mı, Engelleme mi?

Oran kurallarının ne kadar katı uygulanacağı kilise genelinde geçerli bir ayardır:

1. B1 Admin'de **Ayarlar**'a gidin ve **Check-In** bölümünü açın.
2. **Gönüllü Oranı Uygulaması**'nı ayarlayın:
   - **Uyarı (onayla izin ver)** -- Bir oda oran sınırını aşarsa veya minimum gönüllü sayısının altında kalırsa kiosk bir uyarı gösterir ve bir personel üyesi yine de devam etmek için onaylayabilir. Varsayılan budur.
   - **Engelle (check-in'i önle)** -- Yeterli sayıda gönüllü check-in yapana kadar odaya check-in reddedilir.

:::info
Kapasite ve Check-In için Kapalı ayarları her zaman kesin sınırlardır. Uyarı/engelleme seçimi yalnızca gönüllü oranları için geçerlidir.
:::

## Check-In Türleri

Her check-in, kişinin **Üye**, **Misafir** veya **Gönüllü** olduğunu kaydeder. Tür, kiosk hane ekranındaki çiplerle seçilir (varsayılan Üye'dir). Türler güvenlik kurallarını besler: gönüllüler oran kapsamı sağlar ve misafirler odanın Misafir Kapasitesine dahil edilir.

## Yaş ve Sınıf Oda Rehberliği

Ailelerin uygun odalara yönlendirilmesi için her odaya yaş veya sınıf sınırları verebilirsiniz:

- Grubun ayarlarında, odanın minimum ve maksimum yaşını (yıl ve ay olarak) ve/veya sınıfını belirlemek için **Yaş ve Sınıf** bölümünü kullanın.
- Kiosk'ta çocuğun uygun olduğu odalar vurgulanır, uygun olmadığı odalar ise soluklaştırılır. Soluk görünen bir oda yine de personel onayıyla seçilebilir. Bu rehberlik hiçbir zaman kesin olarak engellemez.

Sınıflar, kilisenizin **sınıf yükseltme tarihinde** yükselir:

1. B1 Admin'de **Ayarlar**'a gidin ve **Sınıf Yükseltme** bölümünü açın.
2. Kilisenizin öğrencileri yükselttiği ayı ve günü ayarlayın (örneğin, 1 Ağustos). Kiosk'taki yaşlar ve sınıflar en son yükseltme tarihine göre hesaplanır.

## Güvenilir ve Yetkisiz Teslim Alma Kişileri

Her hane, çocuklarını teslim alabilen veya alamayan kişilerin bir listesini tutabilir.

1. **Kişiler** bölümünde bir kişinin sayfasını açın ve **Teslim Alma** kartını bulun.
2. **Ekle**'ye tıklayın. Mevcut bir kişiyi arayın veya **Ad**, **Yakınlık** ve bir fotoğraf girerek sistemde olmayan birini ekleyin.
3. **Durum**'u ayarlayın:
   - **Güvenilir** -- Check-out sırasında bu kişi, fotoğrafıyla birlikte dokunulabilir bir teslim alma kartı olarak görünür ve doğrulanmış teslim almayı hızlandırır.
   - **Yetkisiz** -- Biri bu ad altında teslim almaya çalışırsa, kiosk uyarıyla check-out işlemini engeller. Bir personel üyesi bunu geçersiz kılabilir ve geçersiz kılma katılım kaydına işlenir.

Durum çipine karta tıklayarak Güvenilir ve Yetkisiz arasında geçiş yapabilirsiniz.

:::tip
Mümkün olduğunda güvenilir teslim alma kişilerine fotoğraf ekleyin. Check-out ekranı fotoğrafı gösterir, böylece gönüllüler karşılarındaki kişiyi görsel olarak doğrulayabilir.
:::

## Ebeveyni Çağırma ve Acil Durum Yayını

Bu iki özellik de mesajları kilisenizin bağlı SMS sağlayıcısı üzerinden gönderir. Yerleşik bir SMS hizmeti yoktur, bu nedenle önce desteklenen sağlayıcılardan biri yapılandırılmalıdır.

- **Ebeveyni çağır** -- Kullanımda olan bir kiosk'un check-out ekranından personel, check-in yapılmış bir çocuğun velilerine veya vasilerine mesaj gönderebilir (örneğin, "Lütfen kreşe gelin").
- **Acil durum yayını** -- Kiosk'un yönetici ayarlarından personel, seçilen ibadet için check-in yapmış her hanenin vasilerine aynı anda mesaj gönderebilir. Göndermek için **EMERGENCY** yazarak onaylamanız gerekir.

Mesaj almayı reddetmiş veya dosyasında cep telefonu numarası bulunmayan kişiler otomatik olarak atlanır. Kiosk kaç mesajın gönderildiğini ve kaçının atlandığını bildirir.

Kiosk tarafındaki adım adım anlatım için [Check-Out ve Çocuk Güvenliği](../../b1-checkin/check-in/checking-out) bölümüne bakın.

## İlgili Makaleler

- [Check-In](check-in.md) — kiosk kurulumu ve donanım
- [Check-Out ve Çocuk Güvenliği](../../b1-checkin/check-in/checking-out) — kiosk check-out, teslim alma doğrulaması ve çağırma akışları
- [Grup Oluşturma](../groups/creating-groups.md) — oda ayarlarının bulunduğu yer
- [Katılım Kurulumu](setup.md) — ibadetler, ibadet saatleri ve oda atamaları
- [Özel Mesajlar için Minimum Yaş](../settings/mobile-app.md#member-directory--messaging-settings) — çocuklarla yeni özel mesaj konuşmalarını engeller, ancak onları dizinde tutar

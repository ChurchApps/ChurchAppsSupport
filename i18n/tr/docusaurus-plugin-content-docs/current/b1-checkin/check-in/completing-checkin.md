---
title: "Check-In'i Tamamlama"
---

# Check-In'i Tamamlama

<div class="article-intro">

Hane bilgilerinizi gözden geçirdikten ve gerekli grup atamalarını yaptıktan sonra check-in işlemini tamamlamaya hazırsınız. Bu, kiosk iş akışındaki son adımdır -- uygulama katılımı kaydeder, etiketleri yazdırır ve bir sonraki aile için sıfırlanır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- [Hanenizi gözden geçirin](./household-review) hane inceleme ekranında
- Belirli bir sınıfa veya programa katılması gereken aile üyelerine [grup atayın](./group-assignment)
- İsteğe bağlı olarak, aileniz ile gelen [misafirleri ekleyin](./adding-guests)

</div>

## Check-In Nasıl Yapılır

1. **Hane inceleme ekranından**, ekranın alt kısmındaki **Check-in** düğmesine dokunun.
2. Uygulama katılım verilerini sunucuya gönderir ve yeşil bir onay işareti ile karşılama mesajı içeren bir **başarı ekranı** gösterir.

Hepsi bu kadar. Ailenizin katılımı kaydedildi.

## Dolu Odalar ve Gönüllü Oranları

Kilisenizin odaları için [güvenlik sınırları](../../b1-admin/attendance/checkin-safety) yapılandırdıysa, sunucu kaydetmeden önce bunları kontrol eder:

- Seçilen bir oda **dolu veya kapalı** ise, check-in tamamlanmaz ve uygulama farklı bir oda seçebilmeniz için odanın adını gösterir.
- Ayin saatinin bir [check-in programı](../../b1-admin/attendance/setup#setting-a-check-in-schedule) varsa ve check-in penceresi şu anda açık değilse, o ayin saatinin odalarına check-in de reddedilir. **Check-in henüz yapılamıyor** ekranı, odayı "check-in şu anda açık değil" nedeniyle listeler; farklı bir ayin saati veya grup seçmek için **Odaları Değiştir** düğmesine dokunun. (Zaten kapanmış ayin saatleri [hane ekranında](./household-review) **Kapalı** olarak gösterilir ve seçilemez; bu yüzden bu durumu genellikle yalnızca bir check-in sırasında pencere kapanırsa görürsünüz.)
- Daha önce önceki bir ayin saati için check-in yapmış bir hane, önceki pencere kapandıktan sonra bile geri gelip açık bir ayin saati ekleyebilir. Mevcut check-in kayıtları korunur ve yeni check-in'in reddedilmesine neden olmaz.
- Bir çocuk odasında gönüllü oranı için **yeterli gönüllü yoksa**, uygulama, kilisenizin oran zorlamasını nasıl yapılandırdığına bağlı olarak, devam etmek için bir personelin onaylayabileceği bir uyarı gösterir veya check-in'i tamamen engeller.

## Etiket Yazdırma

Bir ağ yazıcısı yapılandırılmışsa, uygulama check-in'den sonra etiketleri otomatik olarak yazdırır:

- **İsim etiketleri**, **Print Nametag** ayarı etkin olan bir gruba atanmış her kişi için yazdırılır. İsim etiketleri kişinin adını, grup atamasını ve kayıtlı alerji/not bilgisi varsa bunu içerir.
- **Ebeveyn teslim fişleri**, check-in yapılan kişilerden herhangi biri **Parent Pickup** ayarı etkin olan bir grupta olduğunda yazdırılır. **Gönüllü** olarak check-in yapan kişiler atlanır; bu nedenle Parent Pickup odasında hizmet veren bir çocuk bakım görevlisi teslim fişi almaz. Teslim fişinde çocuklar, grup atamaları ve benzersiz bir **4 karakterli güvenlik kodu** listelenir.

:::info
Aynı güvenlik kodu, çocuğun isim etiketinde ve ebeveynin teslim fişinde görünür. Teslim sırasında gönüllüler, her çocuğu doğru yetişkinin aldığını doğrulamak için kodları eşleştirir.
:::

Güvenlik kodu her check-in için yeniden oluşturulur ve yalnızca ünsüz harfleri ve rakamları kullanır (uygunsuz kelimeler oluşmasın diye sesli harfler dışlanır).

:::warning
Etiketler yazdırılmıyorsa, **kilise logosuna** yedi kez dokunarak Yönetici Ayarları'nı açın, ardından yazıcı bağlantısını doğrulamak için **Yazıcıyı Değiştir** düğmesine dokunun. Sorun giderme adımları için [Yazıcı Kurulumu](../getting-started/printer-setup) bölümüne bakın.
:::

## Check-In'den Sonra Ne Olur

- Bir yazıcı yapılandırılmışsa, uygulama tüm etiketleri yazdırır ve ardından bir sonraki aile için otomatik olarak **arama ekranına** döner.
- Yazıcı yapılandırılmamışsa, uygulama yine otomatik olarak **arama ekranına** döner.

Her iki durumda da başarı ekranı, göründüğü andan itibaren en az 6 saniye boyunca açık kalır (birinin katılım kilometre taşını kutladığı durumda 8 saniye), böylece aileler check-in'in başarılı olduğunu görebilir. Yazdırma bu süreden uzun sürerse, uygulama yazdırma bittikten yaklaşık bir buçuk saniye sonra geri döner.

Arama ekranına dönmek için herhangi bir yere dokunmanız gerekmez -- geçişi uygulama otomatik olarak yönetir. Ekran bir süre açık kaldıktan sonra, hemen dönmek için ona dokunabilirsiniz; ilk bir buçuk saniyedeki dokunuşlar yok sayılır, bu nedenle **Check-in** düğmesine hızlıca çift dokunmak ekranı atlamaz.

:::tip
Uygulama her check-in'den sonra tamamen sıfırlanır, bu nedenle bir ailenin başka bir ailenin bilgilerini görme riski yoktur.
:::

## Neler Kaydedilir

**Check-in** düğmesine dokunduğunuzda, uygulama grup ataması olan her hane üyesi için sunucuya şunları gönderir:

- Check-in yapılan **kişi**
- Katıldığı **hizmet**
- Atandığı **ayin saati** ve **grup**

Bu veriler B1 Admin'de Katılım bölümü altında görünür; burada kilise yöneticileri katılım kayıtlarını görüntüleyebilir ve yönetebilir. Ayrıntılar için [check-in yönetim kılavuzuna](../../b1-admin/attendance/check-in.md) bakın.

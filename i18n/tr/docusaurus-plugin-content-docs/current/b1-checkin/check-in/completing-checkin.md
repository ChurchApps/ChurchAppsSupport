---
title: "Check-In'i Tamamlama"
description: "B1 Checkin'de bir ailenin kiosk check-in işlemini tamamlayın; oda sınırlarını, etiket yazdırmayı, teslim güvenlik kodlarını ve uygulamanın sonrasında ne yaptığını öğrenin."
---

# Check-In'i Tamamlama

<div class="article-intro">

Hane halkınızı gözden geçirdikten ve gerekli grup atamalarını yaptıktan sonra check-in işlemini tamamlamaya hazırsınız. Bu, kiosk iş akışındaki son adımdır -- uygulama yoklamayı gönderir, etiketleri yazdırır ve bir sonraki aile için sıfırlanır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- [Hane halkınızı gözden geçirin](./household-review.md) hane halkı inceleme ekranında
- Belirli bir sınıfa veya programa giriş yapması gereken aile üyelerine [grup atayın](./group-assignment.md)
- İsteğe bağlı olarak, aileniz ile gelen [misafirleri ekleyin](./adding-guests.md)

</div>

## Check-In Nasıl Yapılır

1. **Hane halkı inceleme ekranından**, ekranın altındaki **Check-in** düğmesine dokunun.
2. Uygulama yoklama verilerini sunucuya gönderir ve yeşil bir onay işareti ile karşılama mesajı içeren bir **başarı ekranı** gösterir.

Hepsi bu kadar. Ailenizin yoklaması kaydedildi.

Seçtiğiniz kişilerden herhangi biri bugün bu ibadet için zaten check-in yaptıysa, önce bunları adlandıran bir **Zaten Check-In Yapıldı** penceresi açılır. Yeni grup seçimlerini kaydetmek için **Yeniden Check-In Yap** düğmesine, hane halkı ekranına dönmek için **İptal** düğmesine dokunun.

## Dolu Odalar ve Gönüllü Oranları

Kiliseniz odalarında [güvenlik sınırları](../../b1-admin/attendance/checkin-safety.md) yapılandırmışsa, sunucu kaydetmeden önce bunları kontrol eder:

- Seçilen bir oda **dolu veya kapalı** ise check-in tamamlanmaz ve uygulama odayı adlandırarak farklı bir oda seçmenizi sağlar.
- İbadet saatinin bir [check-in programı](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) varsa ve check-in penceresi şu anda açık değilse, o ibadet saatinin odalarına check-in de reddedilir. **Check-in henüz yapılamaz** ekranı, odayı "check-in şu anda açık değil" nedeniyle listeler; farklı bir ibadet saati veya grup seçmek için **Odaları Değiştir** düğmesine dokunun. (Zaten kapanmış ibadet saatleri [hane halkı ekranında](./household-review.md) **Kapalı** olarak gösterilir ve seçilemez; bu nedenle bunu genellikle yalnızca bir check-in işlemi sırasında pencere kapanırsa görürsünüz.)
- Daha önceki bir ibadet saati için check-in yapmış bir hane halkı, önceki pencere kapandıktan sonra bile geri dönüp açık bir ibadet saati ekleyebilir. Mevcut check-in kayıtları korunur ve yeni check-in'in reddedilmesine neden olmaz.
- Bir çocuk odası gönüllü oranı açısından **gönüllü sayısı yetersiz** ise, uygulama ya bir personelin onaylayabileceği bir uyarı gösterir ya da kilisenizin oran zorlamasını nasıl yapılandırdığına bağlı olarak check-in'i tamamen engeller.

## Etiket Yazdırma

Bir ağ yazıcısı yapılandırılmışsa, uygulama check-in'den sonra etiketleri otomatik olarak yazdırır:

- **İsim etiketleri**, **Nametag Yazdır** ayarı etkin olan bir gruba atanmış her kişi için yazdırılır. İsim etiketleri kişinin adını, grup atamasını ve kayıtlı alerji/not bilgisi varsa bunu içerir.
- **Ebeveyn teslim fişleri**, check-in yapılan kişilerden herhangi biri **Ebeveyn Teslimi** ayarı etkin olan bir grupta olduğunda yazdırılır. **Gönüllü** olarak check-in yapan kişiler atlanır; bu nedenle Ebeveyn Teslimi odasında hizmet veren bir çocuk bakım görevlisi teslim fişi almaz. Teslim fişi çocukları, grup atamalarını ve benzersiz bir **4 karakterli güvenlik kodunu** listeler.

:::info
Aynı güvenlik kodu, çocuğun isim etiketinde ve ebeveynin teslim fişinde görünür. Teslim sırasında gönüllüler, her çocuğu doğru yetişkinin aldığını doğrulamak için kodları eşleştirir.
:::

Güvenlik kodu her check-in için yeniden oluşturulur ve yalnızca sessiz harfleri ve rakamları kullanır (uygunsuz kelimeler oluşmasın diye sesli harfler dışarıda bırakılır).

:::warning
Etiketler yazdırılmıyorsa, **kilise logosuna** yedi kez dokunarak Yönetici Ayarları'nı açın, ardından yazıcı bağlantısını doğrulamak için **Yazıcıyı Değiştir** düğmesine dokunun. Sorun giderme adımları için [Yazıcı Kurulumu](../getting-started/printer-setup.md) sayfasına bakın.
:::

## Check-In'den Sonra Ne Olur

- Bir yazıcı yapılandırılmışsa, uygulama tüm etiketleri yazdırır ve ardından otomatik olarak bir sonraki aile için **arama ekranına** döner.
- Yazıcı yapılandırılmamışsa, uygulama yine otomatik olarak **arama ekranına** döner.

Her iki durumda da başarı ekranı, göründüğü andan itibaren en az 6 saniye boyunca açık kalır (birinin yoklama kilometre taşını kutladığında 8 saniye), böylece aileler check-in'in başarılı olduğunu görebilir. Yazdırma bu süreden daha uzun sürerse, uygulama yazdırma bittikten yaklaşık bir buçuk saniye sonra döner.

Arama ekranına dönmek için herhangi bir şeye dokunmanız gerekmez -- geçişi uygulama otomatik olarak yönetir. Ekran bir süre açık kaldıktan sonra, hemen dönmek için ekrana dokunabilirsiniz; ilk bir buçuk saniyedeki dokunuşlar yok sayılır, bu nedenle **Check-in** düğmesine hızlı çift dokunmak ekranı atlamaz.

:::tip
Uygulama her check-in'den sonra tamamen sıfırlanır, bu nedenle bir ailenin başka bir ailenin bilgilerini görme riski yoktur.
:::

## Ne Kaydedilir

**Check-in** düğmesine dokunduğunuzda, uygulama grup ataması olan her hane halkı üyesi için sunucuya şunları gönderir:

- Check-in yapılan **kişi**
- Katıldıkları **ibadet**
- Atandıkları **ibadet saati** ve **grup**

Bu veriler B1 Admin'de Yoklama bölümünde görünür; kilise yöneticileriniz burada yoklama kayıtlarını görüntüleyebilir ve yönetebilir. Ayrıntılar için [check-in yönetim kılavuzuna](../../b1-admin/attendance/check-in.md) bakın.

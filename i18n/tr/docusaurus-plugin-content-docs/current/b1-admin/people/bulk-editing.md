---
title: "Kişileri Toplu Düzenleme"
description: "B1 Admin'de birçok kişinin üyelik durumunu, medeni durumunu, cinsiyetini, opt-out bilgisini, özel Evet/Hayır alanlarını ya da grup üyeliğini tek seferde güncelleyin."
---

# Kişileri Toplu Düzenleme

<div class="article-intro">
Toplu düzenleme, aynı değişikliği birçok kişiye tek tek uygulamak yerine birden fazla kişiyi aynı anda güncellemenize olanak tanır. Üyelik durumu, medeni durum, cinsiyet, iletişim tercihleri ve grup üyeliklerini tek bir işlemde güncelleyebilirsiniz.
</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kişi verilerini yönetme iznine sahip olmanız gerekir. Ayrıntılar için [Roller ve İzinler](./roles-permissions.md) sayfasına bakın.
- Düzenlemek istediğiniz kişileri daha önce eklemiş veya içe aktarmış olmanız gerekir. Gerekirse [Kişi Ekleme](./adding-people.md) sayfasına bakın.
</div>

## Toplu Düzenleme için Kişileri Seçme

1. B1 Admin içinde **People** bölümüne gidin
2. Güncellemek istediğiniz kişileri bulmak için arama veya filtre araçlarını kullanın
3. Kişileri seçmek için kutucukları işaretleyin
   - **Households** (Haneler) görünümünde bir haneyi işaretlemek, o haneдeki herkesi seçer
   - **Table** (Tablo) görünümünde (**View as** anahtarıyla geçiş yapabilirsiniz) kişileri tek tek seçebilirsiniz
   - Ya da listenin üstündeki kutucuğu kullanarak görünen tüm kişileri seçebilirsiniz
4. En az bir kişi seçtikten sonra, listenin üstündeki çubukta kaç kişinin seçili olduğu, ayrıca **Clear Selection** (Seçimi Temizle) ve **Actions** (İşlemler) düğmesi görünür

:::tip
Belirli ölçütlere göre büyük bir grubu güncellemeniz gerekiyorsa, önce listenizi daraltmak için [AI Search](./ai-search.md) özelliğini veya filtreleri kullanın, ardından eşleşen tüm kişileri seçin.
:::

## Kullanılabilir Toplu İşlemler

**Actions** (İşlemler) menüsünde çeşitli seçenekler bulunur:

### Üyelik Durumunu Güncelleme

Seçilen tüm kişilerin üyelik durumunu güncelleyin:

1. **Actions** → **Set Membership Status** (Üyelik Durumunu Ayarla) seçeneğine tıklayın
2. Yeni durumu seçin:
   - **Visitor** (Ziyaretçi) -- İlk kez gelen veya ara sıra katılan kişiler
   - **Guest** (Misafir) -- Bir check-in kioskunda kaydolan aileler gibi misafirler
   - **Regular Attendee** (Düzenli Katılımcı) -- Üye olmayan ama sık katılan kişiler
   - **Member** (Üye) -- Resmi kilise üyeleri
   - **Staff** (Personel) -- Kilise personeli
   - **Inactive** (Pasif) -- Artık katılmayan kişiler
   - **Deceased** (Vefat Etmiş) -- Vefat etmiş kişiler
3. Güncelleme modunu seçin:
   - **Overwrite all** (Tümünün Üzerine Yaz) -- Seçilen tüm kişilerin mevcut durumunu değiştirir
   - **Only update empty** (Yalnızca Boş Olanları Güncelle) -- Yalnızca durumu olmayan kişilere durum atar
4. **Update** (Güncelle) düğmesine tıklayın

### Medeni Durumu Güncelleme

Medeni durumu toplu olarak güncelleyin:

1. **Actions** → **Set Marital Status** (Medeni Durumu Ayarla) seçeneğine tıklayın
2. Yeni durumu seçin:
   - **Unknown** (Bilinmiyor)
   - **Single** (Bekar)
   - **Married** (Evli)
   - **Divorced** (Boşanmış)
   - **Widowed** (Dul)
3. Mevcut değerlerin üzerine yazılıp yazılmayacağını ya da yalnızca boş alanların güncellenip güncellenmeyeceğini seçin
4. **Update** (Güncelle) düğmesine tıklayın

### Cinsiyeti Güncelleme

Birden fazla kişinin cinsiyet bilgisini güncelleyin:

1. **Actions** → **Set Gender** (Cinsiyeti Ayarla) seçeneğine tıklayın
2. Değeri seçin:
   - **Unspecified** (Belirtilmemiş)
   - **Male** (Erkek)
   - **Female** (Kadın)
3. Güncelleme modunu seçin (tümünün üzerine yaz veya yalnızca boşları güncelle)
4. **Update** (Güncelle) düğmesine tıklayın

### İletişim Tercihini (Opt-Out) Güncelleme

Kişilerin iletişimden çıkıp çıkmadığını kontrol edin:

1. **Actions** → **Set Directory Opt-Out** (Rehber Dışında Tutmayı Ayarla) seçeneğine tıklayın
2. Şunlardan birini seçin:
   - **No** (Hayır) -- İletişime izin verin (dışarıda tutmayı kaldırın)
   - **Yes** (Evet) -- İletişimi engelleyin (dışarıda tutmayı ayarlayın)
3. Güncelleme modunu seçin
4. **Update** (Güncelle) düğmesine tıklayın

:::warning
İletişim tercihini değiştirirken dikkatli olun. Açıkça dışarıda kalmayı seçmiş kişilere, yeni bir onay vermedikçe iletişim gönderilmemelidir.
:::

### Özel Alan Ayarlama

Seçilen tüm kişiler için bir Evet/Hayır [özel alan](../settings/custom-fields.md) değerini aynı anda ayarlayın:

1. **Actions** → **Set Custom Field** (Özel Alan Ayarla) seçeneğine tıklayın.
2. Ayarlamak istediğiniz Evet/Hayır özel alanını seçin.
3. Uygulanacak değeri (**Yes** veya **No**) seçin.
4. **Update** (Güncelle) düğmesine tıklayın.

:::info
Bu toplu işlem için yalnızca Evet/Hayır özel alanları kullanılabilir. Diğer alan türlerini ayarlamak için her kişiyi tek tek düzenleyin.
:::

### Gruba Ekleme

Seçilen tüm kişileri bir veya daha fazla gruba ekleyin:

1. **Actions** → **Add to Group** (Gruba Ekle) seçeneğine tıklayın
2. Kişileri ekleyeceğiniz grupları arayıp seçin
3. Kişileri hepsine eklemek için birden fazla grup seçebilirsiniz
4. **Add to Groups** (Gruplara Ekle) düğmesine tıklayın

Seçilen her kişi, seçilen gruba(lara) normal bir üye olarak eklenir. Gerekirse daha sonra [Grup Üyeleri](../groups/group-members.md) sayfasından bu kişileri grup liderine yükseltebilirsiniz.

### Gruptan Çıkarma

Seçilen tüm kişileri bir veya daha fazla gruptan çıkarın:

1. **Actions** → **Remove from Group** (Gruptan Çıkar) seçeneğine tıklayın
2. Kişileri çıkarmak istediğiniz grupları arayıp seçin
3. Birden fazla grup seçebilirsiniz
4. **Remove from Groups** (Gruplardan Çıkar) düğmesine tıklayın

:::info
Bu işlem kişileri yalnızca belirtilen gruplardan çıkarır. Kişi kayıtlarını silmez.
:::

### Kişileri Silme

Seçilen kişileri kilise veritabanınızdan kalıcı olarak silin:

1. **Actions** → **Delete** (Sil) seçeneğine tıklayın
2. **Delete Selected People** (Seçilen Kişileri Sil) iletişim kutusu kaç kişinin silineceğini onaylamanızı ister
3. **Delete** (Sil) düğmesine tıklayın

:::danger
Kişileri silmek kalıcıdır ve geri alınamaz. Bu işlem aşağıdakiler dahil tüm verilerini kaldırır:
- Kişisel bilgiler
- Grup üyelikleri
- Katılım kayıtları
- Bağış geçmişi
- Form gönderimleri

Bu işlemi yalnızca bu kişileri sisteminizden kaldırmak istediğinizden kesinlikle emin olduğunuzda kullanın.
:::

## Toplu Düzenleme Sonuçları

Bir toplu işlemi tamamladıktan sonra şunları gösteren bir özet görürsünüz:

- **Total selected** (Toplam seçilen) -- İşleme kaç kişinin dahil edildiği
- **Successfully updated** (Başarıyla güncellenen) -- Kaç kaydın değiştirildiği
- **Failed** (Başarısız) -- Güncellenemeyen kayıtlar (varsa)
- **Unchanged** (Değişmeyen) -- Değişiklik gerektirmeyen kayıtlar (örneğin "yalnızca boşları güncelle" modu kullanıldığında)

Bazı güncellemeler başarısız olursa, nedenini açıklayan hata ayrıntılarını görürsünüz.

## En İyi Uygulamalar

- **Küçük başlayın** -- Doğru değişiklikleri yaptığınızdan emin olmak için toplu işlemleri önce birkaç kayıtta deneyin
- **Filtre kullanın** -- Yalnızca doğru kişileri güncellediğinizden emin olmak için kişileri seçmeden önce listenizi filtreler veya AI arama ile daraltın
- **Seçimlerinizi iki kez kontrol edin** -- Toplu değişiklikleri uygulamadan önce seçilen kişileri gözden geçirin
- **"Yalnızca boşları güncelle" modunu kullanın** -- Mevcut bilgilerin üzerine yazmadan eksik verileri doldurmak istediğinizde
- **Önemli değişiklikleri belgeleyin** -- Gerektiğinde daha sonra başvurabilmek için toplu güncellemelerle ilgili notlar tutun
- **Ekibinizle koordine olun** -- Büyük toplu değişiklikler yaptığınızda diğer yöneticileri bilgilendirin

## Yaygın Kullanım Senaryoları

### Yeni Üyeleri Güncelleme

Bir üyelik dersinden sonra, katılan tüm kişilerin durumunu Üye olarak güncelleyin:

1. Derse katılan kişileri arayın
2. Hepsini seçin
3. **Actions** → **Set Membership Status** → **Member** seçeneklerini kullanın

### Küçük Grupları Düzenleme

Yeni bir küçük gruba birden fazla kişi ekleyin:

1. Gruba eklemek istediğiniz kişileri arayın
2. Onları seçin
3. **Actions** → **Add to Group** seçeneğini kullanın ve küçük grubu seçin

### Verileri Temizleme

Evli çiftler için eksik medeni durum bilgilerini doldurun:

1. Evli olan kişileri filtreleyin (hane bilgilerini kullanarak)
2. Medeni durumu boş olanları seçin
3. **Actions** → **Set Marital Status** → **Married** → **Only update empty** seçeneklerini kullanın

## İlgili Makaleler

- [Kişileri Arama](./searching-people.md) -- Düzenlenecek kişileri bulun
- [AI Search](./ai-search.md) -- Belirli kişi gruplarını bulmak için doğal dil kullanın
- [Grup Üyeleri](../groups/group-members.md) -- Grup üyeliğini yönetin
- [Verileri Dışa Aktarma](./exporting-data.md) -- Toplu değişikliklerden önce kişi verilerini dışa aktarın

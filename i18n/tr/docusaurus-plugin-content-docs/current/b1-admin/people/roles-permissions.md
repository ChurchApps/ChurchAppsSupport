---
title: "Rollerin Atanması"
---

# Rollerin Atanması

<div class="article-intro">

B1 Admin, ekibinizdeki her kullanıcının neleri görüp neleri yapabileceğini denetlemek için rol tabanlı bir izin sistemi kullanır. Rolleri atayarak personel ve gönüllülere yalnızca ihtiyaç duydukları alanlara erişim verebilir, bunun ötesinde hiçbir şey vermezsiniz. Doğru rol yönetimi, kilise verilerinizi güvende tutarken ekibinizin daha verimli çalışmasını sağlar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- B1 Admin'de **Domain Admin** erişimine veya **Ayarlar**'ı yönetme iznine sahip bir role ihtiyacınız vardır.
- Rol atamak istediğiniz kişilerin zaten rehberinizde kayıtlı olması gerekir. Önce eklemeniz gerekiyorsa [Kişi Ekleme](adding-people.md) bölümüne bakın.

</div>

## Rolleri Anlamak

Rol, bir veya daha fazla kullanıcıya atadığınız izinler kümesidir. Örneğin, [bağış kayıtlarına](../donations/recording-donations.md) erişim veren bir "Finans Ekibi" rolü veya yalnızca [devam özelliklerine](../attendance/check-in.md) erişim sağlayan bir "Check-In Gönüllüsü" rolü oluşturabilirsiniz.

Her rol, B1 Admin'in aşağıdakiler dahil belirli alanlarına erişimi denetler:

- **Kişiler** -- üye profillerini görüntüleme ve düzenleme. Bir kişi kaydındaki Notlar bölümü **Kişileri Düzenle** iznini gerektirir; ayrı bir **Gizli Notları Görüntüle** izni ise Gizli Notlar bölümüne erişimi denetler (şahsi bakım, kişisel geçmiş ve benzeri hassas notlar için). **Yalnızca Kişi Adlarını Görüntüle** izni, bir kişinin tam rehbere erişmeden isimle arama yapmasını sağlar (yalnızca ad, fotoğraf ve üyelik durumu görünür). **Devam Durumunu Görüntüle** veya **Devamı Düzenle** ile birlikte kullanıldığında bir gönüllü **Gruplar**'ı açıp sınıf listelerini isimle görebilir; **Devamı Düzenle** iznine sahipse ayrıca [devamı kaydedebilir](../attendance/recording-attendance.md). Bkz. [Yalnızca Kişi Adları](../settings/roles-permissions.md#people-names-only).
- **Bağışlar** -- katkıları ve mali raporları yönetme. **Bağış Gir** daha dar bir seçenektir ve sayım ekipleri için tasarlanmıştır: bağış girilmesine izin verir, ancak yalnızca hâlâ açık olan [gruplarda](../donations/batches.md#who-can-change-a-batch).
- **Devam** -- devam verilerini kaydetme ve görüntüleme
- **Formlar** -- [özel formlar](../forms/creating-forms.md) oluşturma ve yönetme
- **Gruplar** -- [grup üyeliklerini](../groups/group-members.md) ve takvimleri yönetme
- **Ayarlar** -- kilise genelindeki ayarları yapılandırma

:::warning
**Domain Admin'ler** B1 Admin'in her alanına tam erişime sahiptir. Bu kullanıcıların izinleri düzenlenemez veya kısıtlanamaz. Bu rolü yalnızca birincil yöneticileriniz için kullanın.
:::

## Rolleri Görüntüleme ve Yönetme

1. [Hızlı menüyü](../introduction.md#getting-around-with-the-jump-menu) (B1 Admin'in sol üst kısmındaki arama çubuğu) açın ve **Ayarlar**'ı genişletin.
2. **Roller**'e tıklayın.
3. Kilisenize tanımlı tüm rollerin listesini göreceksiniz; **Üyeler** sütununda her roldeki kullanıcı sayısı gösterilir.
4. Herhangi bir rolün üyelerini ve izinlerini görmek için o role tıklayın.

## Kullanıcıları Bir Role Ekleme

1. Hızlı menüde **Ayarlar > Roller** seçeneğini seçin.
2. Kullanıcı eklemek istediğiniz role tıklayın.
3. **Üyeler** bölümünde kişiyi adıyla arayın.
4. Onu role atamak için **Ekle**'ye tıklayın.

Kullanıcı bir sonraki girişinde bu role ait tüm izinlere sahip olacaktır.

## Rol İzinlerini Düzenleme

1. Hızlı menüde **Ayarlar > Roller** seçeneğini seçin.
2. Düzenlemek istediğiniz role tıklayın.
3. **İzinler** bölümünde, rolün erişmesini istediğiniz alanların kutularını işaretleyin veya işaretini kaldırın. Her izin grubu, içindeki işaretli izin sayısını gösterir (örneğin **5 izinden 2'si**).
4. Her değişiklik, kutuyu işaretlediğiniz veya işaretini kaldırdığınız anda kaydedilir.

:::tip
En az ayrıcalık ilkesini izleyin -- her role yalnızca gerçekten ihtiyaç duyduğu izinleri verin. Bu, verilerinizi güvende tutar ve yanlışlıkla yapılan değişikliklerin olasılığını azaltır.
:::

## Yaygın Rol Örnekleri

- **Ofis Personeli** -- Kişiler, Bağışlar, Devam ve Formlar'a erişim
- **Grup Liderleri** -- yalnızca [Gruplar](../groups/creating-groups.md) erişimi
- **Check-In Gönüllüleri** -- [check-in kiyoskunda](../attendance/check-in.md) oturum açan hesabın ihtiyaç duyduğu **Check-In** devam izni
- **Finans Ekibi** -- [Bağışlar](../donations/recording-donations.md) ve raporlama erişimi
- **Sayım Ekibi** -- **Bağış Gir** ve **Bağışları Görüntüle**; böylece gönüllüler bağış özetlerini görmeden açık gruplara bağış girebilir

Bağış ve kişi izinleri hakkında daha ayrıntılı bilgi için [Roller ve İzinler](../settings/roles-permissions.md) sayfasına bakın.

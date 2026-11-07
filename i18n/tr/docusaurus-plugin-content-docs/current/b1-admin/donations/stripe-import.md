---
title: "Stripe İçe Aktarma"
---

# Stripe İçe Aktarma

<div class="article-intro">

Bağışları Stripe üzerinden kabul ediyorsanız, Stripe İçe Aktarma aracı bu işlemleri B1 Admin'e aktarmanıza olanak tanır; böylece tüm bağış verileriniz tek bir yerde toplanır. Bu, otomatik olarak senkronize edilmemiş işlemleri yakalamak için özellikle yararlıdır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Stripe hesabınızı B1 Admin'e bağlamak için [Çevrim İçi Bağış Kurulumu](online-giving-setup.md) adımlarını tamamlayın. **Stripe İçe Aktarma** menü öğesi ve Gruplar sayfasındaki düğme yalnızca kilisenizin bağış ağ geçidi Stripe olduğunda ve yalnızca bağışları düzenleyebilen kişiler için görünür
- İçe aktarmak istediğiniz tarih aralığı için Stripe panelinizde bağışların olduğunu doğrulayın

</div>

## Nasıl Çalışır

İçe aktarma süreci iki adımlı bir iş akışı kullanır: önce neyin içe aktarılacağını önizlersiniz, ardından içe aktarmayı onaylarsınız. Bu kuru çalıştırma yaklaşımı, herhangi bir veri oluşturulmadan önce her şeyi gözden geçirmenize olanak tanır.

## İşlemleri İçe Aktarma

1. **B1 Admin**'de **Bağışlar > Stripe İçe Aktarma** bölümüne gidin. (Ayrıca **Gruplar** sayfasının üst kısmındaki **Eksik Stripe işlemlerini içe aktar** düğmesini de tıklayabilirsiniz.)
2. **Stripe İçe Aktarma** sayfası açılır.
3. İçe aktarmak istediğiniz işlemler için bir **tarih aralığı** seçin.
4. Kuru bir kontrol çalıştırmak için **Önizleme**'yi tıklayın.

## Önizlemeyi Gözden Geçirme

Önizleme, Stripe'dan gelen her işlemi bir durum göstergesiyle birlikte görüntüler:

- **Yeni** -- bu işlem henüz içe aktarılmadı ve devam ederseniz dahil edilecek.
- **Zaten İçe Aktarılmış** -- bu işlem B1 Admin'de zaten var ve atlanacak.
- **Atlandı** -- bu işlem başka bir nedenle dışarıda bırakıldı (ör. bir iade veya başarısız ödeme).

Sayfanın üst kısmındaki özet bölümünde, her kategorideki toplam işlem sayısı ve ilgili dolar tutarları gösterilir.

:::info
Önizleme adımı herhangi bir kayıt oluşturmaz. Kesinleştirmeden önce neyin olacağını doğrulayabilmeniz için salt okunur bir kontroldür.
:::

## İçe Aktarmayı Tamamlama

1. Önizleme sonuçlarını ve özet toplamlarını gözden geçirin.
2. **Yeni** olarak işaretlenmiş tüm işlemleri içe aktarmak için **Eksikleri İçe Aktar**'ı tıklayın.
3. İçe aktarma tamamlandıktan sonra, her işlemin yanındaki durum rozetleri sonucu gösterecek şekilde güncellenir.

## Stripe İçe Aktarma Kullanımına İlişkin İpuçları

- Kayıtlarınızı güncel tutmak için içe aktarmayı düzenli olarak (haftalık veya aylık) çalıştırın.
- Bir işlem **Zaten İçe Aktarılmış** olarak görünüyorsa, bu B1 Admin'in zaten eşleşen bir kayda sahip olduğu anlamına gelir -- herhangi bir işlem gerekmez.
- Belirli işlemleri arıyorsanız, dikkatinizi belirli bir döneme odaklamak için tarih aralığı filtresini kullanın.

:::tip
İçe aktarma tamamlandıktan sonra, içe aktarılan bağışların doğru göründüğünü ve toplamların Stripe panelinizdekilerle eşleştiğini doğrulamak için [Gruplar](batches.md) sayfasını ziyaret edin.
:::

## Sonraki Adımlar

- İçe aktarılan işlemleri diğer bağış verilerinizle birlikte incelemek için [Bağış Raporları](donation-reports.md) sayfasına bakın
- Doğru [bağış dökümleri](giving-statements.md) için içe aktarılan bağışların doğru [fonlara](funds.md) atandığından emin olun

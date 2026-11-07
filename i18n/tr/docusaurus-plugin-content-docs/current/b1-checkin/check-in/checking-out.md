---
title: "Çıkış Yapma ve Çocuk Güvenliği"
---

# Çıkış Yapma ve Çocuk Güvenliği

<div class="article-intro">

Çıkış yapma, çocuk girişinin son adımıdır: ebeveyn, teslim alma etiketindeki güvenlik kodunu gösterir, kiosk teslim alan kişiyi doğrular ve çocuklar çıkış yapmış olarak işaretlenir. Görevlinin bulunduğu istasyonlar ek güvenlik araçlarından da yararlanır: güvenilir teslim alma doğrulaması, ebeveyne sayfa mesajı, güvenlik etiketlerinin yeniden basımı ve acil durum yayını.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Çıkış yapma, kiosk yönetici ayarlarında **görevli** modu seçilmiş istasyonlarda kullanılabilir
- Çocukların, güvenlik kodunu içeren yazdırılmış bir teslim alma etiketiyle [giriş yapmış](./completing-checkin) olması gerekir
- Sayfa mesajları ve acil durum yayınları için kilisenizin B1 Admin içinde bağlı bir SMS sağlayıcısına sahip olması gerekir

</div>

## Çıkış İşlemini Başlatma

1. Görevli bir istasyonda, arama ekranındaki **Çıkış Yap** düğmesine dokunun.
2. Ailenin teslim alma etiketindeki 4 karakterlik **güvenlik kodunu** girin. Kodu yazabilir, ekrandaki tuş takımını kullanabilir ya da etiketin barkodunu USB veya Bluetooth tarayıcıyla okutabilirsiniz. Kodun 4 karakteri de girildiğinde kod otomatik olarak gönderilir.
   - Tarayıcınız yok mu? Kod alanının altındaki **Tara** düğmesine dokunarak tabletin kamerasını kullanabilirsiniz. Teslim alma etiketinin QR kodunu ya da barkodunu **Teslim alma kodunu tara** penceresinde kameraya tutun; kod sizin yerinize girilir. Varsayılan olarak arka kamera kullanılır. Kameralar arasında geçiş yapmak için çevirme düğmesine dokunun veya yazarak girmeye dönmek için **İptal** düğmesine dokunun.
3. Kiosk, bu kod altında giriş yapmış çocukları gösterir.

## Teslim Alan Kişiyi Doğrulama

Çıkış ekranı çocukları kimin teslim aldığını sorar:

- Ailenin **güvenilir teslim alma kişileri**, fotoğrafları ve yakınlık dereceleriyle dokunulabilir kartlar olarak görünür. Önünüzde duran kişiye dokunun.
- **Haneдeki yetişkinler** de bir fotoğraf ızgarasında görünür.
- **Diğer** seçeneği, listede olmayan bir kişinin adını yazmanıza olanak tanır.

Yazdığınız ad, o haneye **Yetkisiz** olarak işaretlenmiş bir kişiyle eşleşirse kiosk uyarı vererek çıkışı engeller. Bir görevli yine de devam etmek için **Geçersiz Kıl** seçeneğini seçebilir. Geçersiz kılma işlemi, kişinin adıyla birlikte yoklama kaydına işlenir.

Teslim alan kişi onaylandıktan sonra çıkış düğmesine dokunun. Teslim alan kişinin adı yoklama kaydına kaydedilir.

:::info
Güvenilir ve yetkisiz teslim alma kişileri, kilise görevlileri tarafından B1 Admin içinde her kişinin sayfasından yönetilir. Bkz. [Giriş Güvenliği](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Ebeveyne Sayfa Mesajı Gönderme

Ayin sırasında bir ebeveyne ihtiyaç mı var? Bir bez değişimi ya da ağlayan bir çocuk mu var? Görevli bir istasyonda çıkış ekranından **sayfa** gönderebilir: kilisenin SMS sağlayıcısı üzerinden çocuğun ebeveynlerine ya da vasilerine bir metin mesajı. SMS almayı reddeden ya da cep telefonu numarası olmayan ebeveynler atlanır ve kiosk kaç mesaj gönderildiğini gösterir.

## Etiketleri Yeniden Yazdırma

Bir isim etiketi ya da teslim alma etiketi kaybolur ya da hasar görürse, görevliler güvenlik kodunu girdikten sonra çıkış ekranından ailenin etiketlerini **yeniden yazdırabilir**. Yeniden yazdırma, ilk giriş sırasında kullanılan yazıcıyı ve etiket şablonlarını kullanır.

## Acil Durum Yayını

Acil bir durumda görevliler, mevcut ayin için **giriş yapmış her çocuğun** vasisine aynı anda metin mesajı gönderebilir:

1. Kiosk **yönetici ayarlarını** açın (başlıktaki logoya 7 hızlı dokunuş ve varsa PIN kodu).
2. **Acil durum yayını** düğmesine dokunun.
3. Mesajı yazın, ardından onay alanına **EMERGENCY** yazın. Bunu yapana kadar **Yayını gönder** düğmesi devre dışı kalır.
4. Kiosk, mesajın kaç telefona ulaştığını ve kaç kişinin atlandığını (SMS almayı reddeden ya da cep telefonu numarası olmayan) bildirir.

:::warning
Yayın, seçilen ayin için giriş yapmış her haneye gönderilir. Yalnızca gerçek acil durumlarda kullanın: tahliye, kilitlenme veya şiddetli hava koşulları gibi.
:::

## İlgili Makaleler

- [Girişi Tamamlama](./completing-checkin): Güvenlik kodlarının ve teslim alma etiketlerinin nereden geldiği
- [Giriş Güvenliği](../../b1-admin/attendance/checkin-safety): Kapasite, oranlar, teslim alma kişileri ve SMS sağlayıcısı gereksinimini yapılandırma
- [Yazıcı Kurulumu](../getting-started/printer-setup): Etiket yazıcısı yapılandırması

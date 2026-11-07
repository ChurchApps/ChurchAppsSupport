---
title: "Veri Güvenliği"
description: "ChurchApps'in kilise verilerinizi B1 Admin'de nasıl koruduğunu öğrenin: karma şifrelerden ve HTTPS'den ayrı veritabanlarına ve GDPR veri araçlarına kadar."
---

# Veri Güvenliği

<div class="article-intro">

Mükemmel güvenlikte bir sistem diye bir şey olmasa da ChurchApps veri güvenliğini ciddiye alır. Bu sayfa, B1.church Admin ve diğer ChurchApps ürünlerine girilen tüm verileri korumak için alınan önlemleri açıklar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kilisenizin verilerinin nasıl korunduğunu anlamak için bu sayfayı inceleyin
- Hassas bilgilere kimin erişebileceğini denetlemek için [Roller ve İzinler](./roles-permissions.md) ayarlarını yapılandırın
- [gizlilik politikasına](https://churchapps.org/privacy) aşina olun

</div>

## Saklanan Hassas Verilerin Sınırlandırılması

Birincil yaklaşımımız, gereğinden fazla hassas veri saklamamaktır. Bu nedenle bağış yapmak için kullanılan hiçbir kredi kartı veya banka hesabı bilgisi saklanmaz. Bir kullanıcı B1.church Admin veya B1 üzerinden bağış yaptığında kredi kartı verileri hiçbir zaman sunucularımıza iletilmez, yalnızca ödeme altyapınız (Stripe) ile paylaşılır. Bu, bir veri ihlali durumunda hiçbir kredi kartı veya banka bilgisinin ele geçirilmeyeceği anlamına gelir.

Sistemimizde parolaları da asla saklamayız. Tüm parolalar, verilerin bir kısmının yok edildiği tek yönlü bir karma (hash) algoritmasından geçirilir. Bu sayede hiç kimse, biz dahil, parolaları veritabanından geri alamaz. Parolayı doğrulamak için girilen değer aynı tek yönlü karma işleminden geçmeli ve aynı sonucu üretmelidir.

Bu iki kaynak çıkarıldıktan sonra geriye kalan tek hassas veri, ad ve iletişim bilgilerinden oluşan bir listedir.

:::tip
ChurchApps hiçbir zaman kredi kartı veya banka bilgisi saklamadığı için en kötü senaryodaki bir veri ihlali bile finansal hesap ayrıntılarını açığa çıkarmaz. Yalnızca ad ve iletişim bilgileri risk altında olur.
:::

## Standart En İyi Uygulamaların Kullanılması

Sunucularımıza giden ve sunucularımızdan gelen tüm verileri HTTPS kullanarak şifreleme dahil, güvenlik için sektör standardı en iyi uygulamaları kullanıyoruz. Tüm sunucular Amazon Web Services ile güvenli bir fiziksel veri merkezinde barındırılır. Tüm veritabanı sunucuları bir güvenlik duvarının arkasında bulunur ve İnternet üzerinden erişilemez.

## Veri Ayrıştırma

Veriler kapsamlarına göre farklı veritabanlarına ayrılır. Her API'miz (Üyelik, Bağış, Yoklama, Mesajlaşma, Görevler ve Dersler), kendi veritabanlarına sahip bağımsız veri silolarıdır. Bunlardan biri ele geçirilirse, diğerleri de ele geçirilmeden verinin kullanım değeri sınırlı kalır. Örneğin Bağış API'si/veritabanı ele geçirilirse, kötü niyetli bir kişi bağışların ve tarihlerinin listesine erişebilir (ancak asla kart veya banka bilgilerine erişemez). Ancak bağışları kimin yaptığına veya bağışların hangi kiliseler için olduğuna erişemez, çünkü bu veriler ayrı Üyelik veritabanında saklanır.

:::info
Veri ayrıştırması, bir sistemin ele geçirilmesinin tüm kilise verilerine erişim sağlamadığı anlamına gelir. Her API kendi veritabanıyla bağımsız çalışır ve olası bir ihlalin etkisini sınırlar.
:::

## Sınırlı Erişim

Üretim sunucularına erişim, erişime ihtiyaç duyan sunucu yöneticileriyle sıkı şekilde sınırlıdır. Bu, şu anda aynı zamanda yönetim kurulu üyesi olan iki kişidir. Geliştiriciler, gönüllüler ve diğer yönetim kurulu üyelerinin üretim sunucularına erişimine izin verilmez.

## Gizlilik Politikası

Verileriniz size aittir ve asla üçüncü taraflara satılmaz. Tam gizlilik politikamızı [buradan](https://churchapps.org/privacy) okuyabilirsiniz.

## GDPR Uyumluluğu

ChurchApps, Birleşik Krallık veya Avrupa Birliği'nde üyesi bulunan kiliseler için GDPR uyumluluğunu destekler. Temel gereksinimleri nasıl karşıladığımız aşağıda açıklanmıştır:

### Veri Sahibinin Hakları

ChurchApps, kiliselerin veri sahibi taleplerine yanıt vermesine yardımcı olacak araçlar sağlar:

- **Erişim Hakkı (Madde 15)** — Üyeler, kiliselerinden kişisel verilerinin bir kopyasını talep edebilir. Yöneticiler, B1.church Admin'deki kişi ayrıntı sayfasındaki **Veri Yönetimi** bölümünden herhangi bir kişinin verilerini dışa aktarabilir.
- **Silinme Hakkı (Madde 17)** — Üyeler, Profil sayfalarından hesap silme talebinde bulunabilir (bkz. [Hesap Silme Taleplerini İnceleme](../profile/account-deletion.md)) veya doğrudan kiliselerine başvurabilir. Yöneticiler ayrıca kişi ayrıntı sayfasındaki **Veri Yönetimi** bölümünden, tüm modüllerdeki bir kişinin verilerini anonimleştirebilir. Anonimleştirme, kişisel bilgileri genel değerlerle değiştirirken kilisenin mali raporlaması için gerekli toplu kayıtları (bağış toplamları, yoklama sayıları) korur.
- **Kısıtlama Hakkı (Madde 18)** — Üyeler, iletişim tercihlerinden vazgeçmek dahil, kiliselerine başvurarak veri işlemenin kısıtlanmasını talep edebilir.
- **Veri Taşınabilirliği Hakkı (Madde 20)** — Yöneticiler, talepte bulunan üyeler adına kişisel verileri yapılandırılmış, makine tarafından okunabilir JSON biçiminde dışa aktarabilir.

### Veri Yönetimi Araçlarının Kullanılması

Bir birey için GDPR veri araçlarına erişmek üzere:

1. B1 Admin'de **Kişiler** bölümüne gidin ve kişinin kaydını açın.
2. Düzenleme moduna geçmek için **Düzenle** düğmesine tıklayın.
3. Varsayılan olarak daraltılmış olan **Veri Yönetimi** bölümüne kaydırın ve genişletmek için tıklayın.
4. Bu kişi için saklanan tüm verileri içeren bir JSON dosyasını indirmek üzere **Verileri Dışa Aktar** seçeneğini kullanın.
5. Kişisel bilgileri genel değerlerle değiştirmek için **Anonimleştir** seçeneğini kullanın. Onaylamak için `ANONYMIZE` yazmanız istenecektir. Bu işlem geri alınamaz.

:::warning
Anonimleştirme kalıcıdır. Bağış toplamları ve yoklama sayıları mali raporlama amacıyla korunur, ancak tüm kişisel tanımlayıcılar (ad, e-posta, adres vb.) kaldırılır ve geri getirilemez.
:::

### Veri İşleme

ChurchApps, kilisenizin (**veri sorumlusu**) adına bir **veri işleyicisi** olarak hareket eder. [Veri İşleme Sözleşmemiz](https://churchapps.org/terms), alt işleyici kullanımı, ihlal bildirim prosedürleri ve sözleşmenin sona ermesinde veri işleme dahil olmak üzere her tarafın sorumluluklarını belirtir.

### Uluslararası Veri Aktarımları

ChurchApps verileri, Amerika Birleşik Devletleri'nde Amazon Web Services (AWS) üzerinde barındırılır. Birleşik Krallık/AB'den yapılan uluslararası veri aktarımları, [AWS Veri İşleme Ekleri](https://aws.amazon.com/compliance/data-processing-addendum/) kapsamında AWS'nin Standart Sözleşme Hükümleri (SCC) ile kapsanır. AWS DPA, tüm müşteriler için AWS Hizmet Koşullarına otomatik olarak dahil edilir. SCC gibi uygun aktarım mekanizmaları bulunduğunda AB merkezli barındırma gerekli değildir.

Aktarım risklerinin nasıl değerlendirildiğine dair ayrıntılar için [Aktarım Risk Değerlendirmesine](./transfer-risk-assessment.md) bakın.

### Alt İşleyiciler

- **Amazon Web Services (AWS)** — Altyapı barındırma, veri depolama ve içerik dağıtımı
- **Stripe** — Bağışlar için ödeme işleme (ChurchApps tarafından kart verisi saklanmaz)

:::info
Kişisel verileri nasıl işlediğimize dair tüm ayrıntılar için [Gizlilik Politikamıza](https://churchapps.org/privacy) ve [Hizmet Koşullarımıza](https://churchapps.org/terms) bakın. GDPR uyumluluğu hakkında sorularınız varsa support@churchapps.org adresinden bize ulaşın.
:::

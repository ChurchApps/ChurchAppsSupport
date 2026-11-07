---
title: "Aktarım Risk Değerlendirmesi"
---

# Aktarım Risk Değerlendirmesi

<div class="article-intro">

Bu belge, ChurchApps'in Birleşik Krallık/AEA'dan Birleşik Devletler'e yapılan uluslararası kişisel veri aktarımlarıyla ilgili risk değerlendirmesini kaydeder. Bu değerlendirme, Birleşik Krallık GDPR ve AB GDPR kapsamında gereklidir. ChurchApps tarafından veri işleyicisi sıfatıyla tutulan dahili bir uyumluluk kaydıdır.

</div>

**Son gözden geçirme:** Nisan 2026

## 1. Aktarım Ayrıntıları

| Öğe | Ayrıntı |
|---|---|
| **Veri İhracatçısı** | Birleşik Krallık/AEA'da bulunan, ChurchApps kullanan kiliseler (Veri Sorumluları) |
| **Veri İthalatçısı** | Birleşik Devletler'de faaliyet gösteren ChurchApps (Veri İşleyicisi) |
| **Veri Sahiplerinin Kategorileri** | Kilise üyeleri, katılımcılar, ziyaretçiler, bağışçılar, gönüllüler, çocuklar (ebeveynler/yöneticiler tarafından yönetilen) |
| **Kişisel Veri Kategorileri** | Adlar, e-posta adresleri, telefon numaraları, posta adresleri, doğum tarihleri, cinsiyet, medeni durum, profil fotoğrafları, bağış kayıtları, katılım kayıtları, grup üyelikleri, gönüllü görevlendirmeleri, mesajlaşma geçmişi |
| **Hassas Veriler** | Bilerek toplanan bir veri yoktur. Sağlık verileri, biyometrik veriler veya sabıka kayıtları saklanmaz. Finansal hesap bilgileri (kredi kartları, banka hesapları) ChurchApps tarafından hiçbir zaman saklanmaz; bunlar doğrudan Stripe tarafından işlenir. |
| **Aktarımın Amacı** | Kilise yönetim yazılımı hizmetlerinin sağlanması (üye yönetimi, bağışlar, katılım takibi, iletişim, gönüllü planlaması, etkinlik kaydı) |
| **Hedef Ülke** | Birleşik Devletler |
| **Aktarım Mekanizması** | AB Standart Sözleşme Hükümleri (SCC'ler) ve AWS Veri İşleme Ek Protokolü aracılığıyla dahil edilen Birleşik Krallık Uluslararası Veri Aktarımı Eki (IDTA) |

## 2. Alt İşleyiciler

| Alt İşleyici | Rol | Konum | Aktarım Mekanizması |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Altyapı barındırma, veri depolama, içerik dağıtımı (us-east-2 bölgesi) | Birleşik Devletler | SCC'leri içeren AWS DPA (AWS Hizmet Şartlarına otomatik olarak dahildir) |
| **Stripe** | Bağışlar için ödeme işleme | Birleşik Devletler | SCC'leri içeren Stripe DPA |

Kredi kartı ve banka hesabı verileri, kullanıcının tarayıcısından doğrudan Stripe'a iletilir ve hiçbir zaman ChurchApps sunucularında saklanmaz veya bu sunucular üzerinden iletilmez.

## 3. Risk Değerlendirmesi

### 3.1 Şifreleme

- **Aktarım sırasında:** Kullanıcılar ile ChurchApps sunucuları arasındaki tüm iletişimde veriler TLS/HTTPS ile şifrelenir.
- **Depolamada:** AWS üzerinde depolanan veriler, AWS tarafından yönetilen şifreleme ile depolama sırasında şifrelenir.

### 3.2 Erişim Kontrolleri

- Üretim sunucularına erişim, ChurchApps yönetim kurulu üyesi olan iki kişiyle sınırlıdır.
- Geliştiriciler, gönüllüler ve diğer yönetim kurulu üyeleri üretim sunucularına veya veritabanlarına erişemez.
- Veritabanı sunucuları bir güvenlik duvarının arkasındadır ve internetten doğrudan erişilemez.
- Kilise verileri mantıksal olarak ayrılmıştır; her kilise, uygulama düzeyindeki erişim kontrolleri aracılığıyla yalnızca kendi verilerine erişebilir.

### 3.3 Veri Ayrımı

Veriler altı bağımsız veritabanına dağıtılmıştır (Üyelik, Bağış, Katılım, Mesajlaşma, Doing, İçerik). Bir veritabanının ele geçirilmesi, diğerlerindeki verileri açığa çıkarmaz. Örneğin, Bağış veritabanı bağış miktarlarını ve tarihlerini içerir, ancak bağışçıların adlarını veya iletişim bilgilerini içermez (bunlar Üyelik veritabanında saklanır).

### 3.4 Veri Minimizasyonu

- Kredi kartı veya banka hesabı bilgileri saklanmaz (Stripe tarafından işlenir).
- Parolalar tek yönlü karma (hash) ile saklanır ve geri alınamaz.
- Kiliseler, üyelerinden hangi verileri topladıklarını kendileri belirler.

### 3.5 Veri Sahibinin Hakları

ChurchApps, kiliselerin veri sahibi taleplerini yerine getirmesini sağlayan teknik araçlar sunar:

- **Erişim ve Taşınabilirlik:** Makine tarafından okunabilir JSON biçiminde tam veri dışa aktarımı.
- **Silme:** Altı veritabanının tamamında anonimleştirme; kişisel veriler genel değerlerle değiştirilir, finansal raporlama için gerekli toplu kayıtlar korunur.
- **Kısıtlama:** Pasif üyelik durumu, bir kişinin kaydını koruyarak onu aramalardan, dizinden, raporlardan ve mesajlaşmadan çıkarır.
- **Düzeltme:** Üyeler ve yöneticiler, kişisel bilgileri uygulama üzerinden düzenleyebilir.

### 3.6 Veri İhlali Bildirimi

ChurchApps, kişisel veri ihlalinden haberdar olduğu andan itibaren 72 saat içinde etkilenen kiliselere bildirimde bulunmayı taahhüt eder. Bu taahhüt [Hizmet Şartları](https://churchapps.org/terms) (Bölüm 11.6) içinde belgelenmiştir.

### 3.7 ABD Hükümeti Erişim Riski

ABD'de barındırılan verilerle ilişkili temel risk, ABD makamlarının FISA 702. Bölüm veya 12333 sayılı Yürütme Emri kapsamında erişmesi olasılığıdır. Bu risk aşağıdaki nedenlerle **düşük** olarak değerlendirilmektedir:

- ChurchApps, istihbarat değeri taşıyan verileri değil, kilise üyeliği ve katılım verilerini işler.
- Veri sahipleri kilise üyeleri ve katılımcılardır; gözetleme programlarının tipik olarak hedef aldığı kategorilerde değildir.
- Hassas kişisel veriler (sağlık, finansal hesaplar, siyasi görüşler) saklanmaz.
- AWS'nin DPA'sı, hükümet erişim talepleri ve şeffaflık raporlamasına ilişkin taahhütleri içerir.
- AB-ABD Veri Gizliliği Çerçevesi (2023'te kuruldu), sertifikalı ABD kuruluşlarına yapılan veri aktarımları için ek güvenceler sağlar.

## 4. Genel Risk Sonucu

Bu uluslararası aktarımın veri sahipleri üzerindeki riski **düşük** olarak değerlendirilmektedir. Aşağıdakilerin birleşimi:

- Yasal aktarım mekanizması olarak Standart Sözleşme Hükümleri
- Aktarım sırasında ve depolamada şifreleme
- Yalnızca iki yetkili kişiyle sınırlı katı erişim kontrolleri
- Bağımsız veritabanları arasında veri ayrımı
- Finansal hesap bilgilerinin saklanmaması
- İşlenen verilerin düşük hassasiyeti ve düşük istihbarat değeri
- Tüm veri sahibi haklarının kullanılmasına yönelik teknik araçlar

aktarılan verilerin, Birleşik Krallık/AEA içinde garanti edilen koruma düzeyiyle esasen eşdeğer bir koruma almasını sağlamak için yeterli tamamlayıcı önlemler sunmaktadır.

## 5. Gözden Geçirme Takvimi

Bu değerlendirme yılda bir kez veya veri işleme, alt işleyiciler ya da uluslararası veri aktarımlarını yöneten yasal çerçevede önemli bir değişiklik olduğunda gözden geçirilecektir.

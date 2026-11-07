---
title: "Bağış Özetleri"
---

# Bağış Özetleri

<div class="article-intro">

Her yıl sonunda bağışçılarınızın, kayıtları için vergi indirimine konu olan bağışlarının bir özetine ihtiyacı vardır. B1 Admin, bu özetleri tüm bağışçılar için aynı anda oluşturmanızı kolaylaştırır ve size saatlerce süren manuel iş yükünden tasarruf sağlar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- [Fonlarınızın](funds.md) **Vergi İndirimine Konu** olarak doğru şekilde işaretlendiğini doğrulayın -- özetlerde yalnızca vergi indirimine konu fonlara yapılan bağışlar yer alır
- Tüm bağışların [kaydedildiğinden](recording-donations.md) ve çevrimiçi işlemlerin [Stripe'tan içe aktarıldığından](stripe-import.md) emin olun

</div>

## Bağış Özetlerine Erişim

1. **B1 Admin** içinde, [Jump menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın ve **Bağışlar** bölümünü genişletin.
2. **Bağış Özetleri**'ne tıklayın. **Toplu Bağış Özetleri** sayfası açılır.

## Özetleri Oluşturma

1. **Yıl Seçin** panelinde, açılır listeden **Yıl**'ı seçin. Geçerli yılı veya önceki beş yılın herhangi birini seçebilirsiniz.
2. Sayfa yalnızca seçilen yılda (1 Ocak'tan 31 Aralık'a kadar) tarihlenmiş bağışları yükler; bu sayede kiliseniz yıllarca bağış geçmişine sahip olsa bile hızlı açılır. Farklı bir yıl seçtiğinizde, özet o yılın bağışlarıyla yenilenir. Yılın altındaki **Özet** paneli, o yıla ait şu istatistikleri gösterir:
   - **Toplam Bağışçı** -- bağış yapan kişi sayısı
   - **Toplam Bağış** -- ayrı bağış kayıtlarının sayısı
   - **Toplam Tutar** -- tüm bağışların toplam dolar tutarı

## Özetleri İndirme

**İndirme Seçenekleri** paneli, özetleri bağışçılarınıza ulaştırmak için iki seçenek sunar:

### CSV Dosyası Olarak İndirme

**Ayrı CSV Dosyaları** altında, her bağışçı için ayrı bir CSV dosyası içeren bir ZIP dosyasını indirmek için **ZIP İndir**'e tıklayın. Özetleri tek tek e-posta ile göndermek veya başka bir sisteme aktarmak istediğinizde bu kullanışlıdır.

### Tüm Özetleri Yazdırma

**Yazdırılabilir Özetler** altında, seçilen yıl için her bağışçının özetinin yazdırılabilir bir görünümünü tarayıcınızda açmak üzere **Tümünü Yazdır**'a tıklayın (düğme, özet sayısını gösterir). Buradan, tarayıcınızın yazdırma işlevini kullanarak yazıcıya gönderin. Her özet yeni bir sayfada başlar, böylece katlanıp postalanmaya hazır olurlar ve özetler bağışçının soyadına, ardından adına göre sıralanır.

[Web Sitesi > Görünüm](../website/appearance.md) bölümünden bir **Açık Arka Plan Logosu** yüklediyseniz, bu logo her özetin üst kısmında, özet başlığının üstünde ortalanmış olarak yazdırılır. Bu, hem **Tümünü Yazdır** hem de bir bağışçının kaydından yazdırılan tek özet için geçerlidir.

:::tip
Kayıtlarınız taze kalırken özetlerinizi Ocak ayının başında çalıştırın. Özetleri oluşturmadan önce fonlarınızın vergi indirimine konu olarak doğru işaretlendiğini iki kez kontrol edin -- yalnızca vergi indirimine konu fonlara yapılan bağışlar dahil edilir.
:::

:::info
Bağış özetleri yalnızca **Vergi İndirimine Konu** ayarı etkin olan fonlara atanmış bağışları içerir. Bir fon vergi indirimine konu olarak işaretlenmemişse, o fona ait bağışlar özette görünmez. Bu ayarı [Fonlar](funds.md) sayfasından yönetebilirsiniz.
:::

## Kanada, Avustralya ve Yeni Zelanda için Makbuz Formatları

Amerika Birleşik Devletleri dışındaki kiliseler, özeti ülkelerinin resmi makbuz düzenine geçirebilir. Bağış Özetleri sayfasının üst kısmındaki **Özet formatı**'na tıklayın (veya **Ayarlar**'a gidip **Bağış** bölümünü açın) ve **Özet Formatı**'nı **Kanada**, **Avustralya** veya **Yeni Zelanda** olarak ayarlayın. Ardından görünen alanları doldurun: kayıt numaranız (CRA kayıt numarası, ABN veya NZ hayır kurumu kayıt numarası), kuruluşunuzun adresi, makbuzları imzalamaya yetkili kişinin adı ve Kanada için makbuzların düzenlendiği şehir.

Özetler bunun ardından vergi otoritenizin beklediği ifadeleri taşır (Kanada için CRA referansıyla birlikte "Gelir Vergisi Amaçlı Resmi Makbuz"), `YIL-BAĞIŞÇIID` biçiminde bir makbuz numarası, yalnızca vergi indirimine konu fonlardan sayılan uygun tutar ve vergi indirimine konu olmayan fonlara yapılan bağışlar için ayrı bir satır. Bağışçılar, B1.church'ten kendi özetlerini yazdırdıklarında aynı makbuz bloğunu görür.

## Üyelerin B1.church'te Gördükleri

Aynı **Bağış** ayarları bölümü, üyelerin B1.church'teki kendi bağış sayfalarında neyi göreceklerini kontrol eder:

- **Üye Bağış Geçmişi**, üyelerin hangi yılları görebileceğini belirler. Varsayılan **Tüm yıllar**'dır. **2025'e kadar** (veya başka bir yıl) seçeneği o yılda durur; siz izin verene kadar üyeler daha sonraki bir yılı görüntüleyemez veya yazdıramaz. Düzeltmeleri ve iadeleri tamamlarken geçerli yılı geri tutmak için bunu kullanın. **Gizli** seçeneği bağış geçmişini, yıllık toplamları ve özet yazdırmayı tamamen kaldırır. Üyeler yine de bağış yapabilir.
- **Bağış Notu**, üyenin bağış sayfasında ve bağış geçmişinde gösterilen kısa bir mesajdır ve burada yazdırdıklarınız dahil her bağış özetinin altında yazdırılır. İade politikanız gibi şeyler için kullanın.

Bu ayarlar yalnızca üyelerin neyi göreceğini değiştirir. Siz yine de bu sayfadan herhangi bir yılı yazdırabilirsiniz.

## Sonraki Adımlar

Özetleri oluşturmadan önce bağış ayrıntılarını gözden geçirmeniz gerekirse, [Bağış Raporları](donation-reports.md) sayfasını ziyaret edin veya tek tek [partileri](batches.md) kontrol edin.

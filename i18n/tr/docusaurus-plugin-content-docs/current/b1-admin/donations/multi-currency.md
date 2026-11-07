---
title: "Çoklu Para Birimi Desteği"
---

# Çoklu Para Birimi Desteği

<div class="article-intro">

B1'in çoklu para birimi özelliği, kilisenizin bağışları farklı para birimlerinde kabul etmesine ve takip etmesine olanak tanır. Bu özellik, uluslararası üyeleri, misyonerleri veya farklı ülkelerdeki birden fazla kampüsü olan kiliseler için özellikle kullanışlıdır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Bağışları yönetme iznine ihtiyacınız vardır. Ayrıntılar için [Roller ve İzinler](../people/roles-permissions.md) sayfasına bakın.
- Çoklu para birimi işlemlerini destekleyen Stripe ile [çevrimiçi bağış](./online-giving-setup.md) ayarlarınızı yapın.
- Kilisenizin birden fazla para birimini işleme konusundaki muhasebe ihtiyaçlarını anlayın.

</div>

## Çoklu Para Birimini Etkinleştirme

Çoklu para birimi desteği artık B1'de varsayılan olarak etkindir. Etkinleştirildikten sonra:

- Üyeler çevrimiçi bağış yaparken yerel para birimlerinde bağış yapabilir
- Herhangi bir para biriminde manuel olarak bağış kaydedebilirsiniz
- Bağış raporları tutarları özgün para biriminde gösterir
- Çevrimiçi bağışlar için para dönüşümünü Stripe otomatik olarak yapar

## Desteklenen Para Birimleri

Sistem, başlıcaları şunlar olmak üzere tüm önemli dünya para birimlerini destekler:

- **USD** -- ABD Doları
- **EUR** -- Euro
- **GBP** -- İngiliz Sterlini
- **CAD** -- Kanada Doları
- **AUD** -- Avustralya Doları
- **MXN** -- Meksika Pesosu
- **BRL** -- Brezilya Reali
- **INR** -- Hint Rupisi
- **CNY** -- Çin Yuanı
- **JPY** -- Japon Yeni
- Ve daha birçokları...

Çevrimiçi bağış için kullanılabilir para birimleri, Stripe hesabınızın desteklediği para birimlerine bağlıdır.

## Farklı Para Birimlerinde Bağışları Kaydetme

### Çevrimiçi Bağışlar

Bir üye Stripe üzerinden çevrimiçi bağış yaptığında:

1. Ödeme ekranında tercih ettikleri para birimini seçerler
2. Stripe ödemeyi o para biriminde işler
3. Bağış, özgün para birimi tutarıyla B1'de kaydedilir
4. Stripe, gerekli para dönüşümünü hesabınızın varsayılan para birimine otomatik olarak yapar

### Manuel Giriş

Nakit veya çekle yapılan bir bağışı farklı bir para biriminde kaydetmek için:

1. B1 Admin'de **Bağışlar > Gruplar** bölümüne gidin ve grubu açın
2. Grup sayfasının üstündeki **Bağış Ekle** düğmesine tıklayın
3. Para birimi açılır listesinden para birimini seçin
4. Tutarı o para biriminde girin
5. Bağışın diğer ayrıntılarını tamamlayın
6. **Kaydet** düğmesine tıklayın

## Çoklu Para Birimli Bağışları Görüntüleme

### Bağış Raporları

Bağış raporları tutarları özgün para biriminde gösterir:

- Tekil bağış kayıtları para birimi kodunu gösterir (ör. "$100.00 USD")
- Toplamlar para birimi bazında hesaplanır
- Belirli para birimlerine göre filtreleme yapabilirsiniz

### Dönüştürülmüş Toplamlar

B1'in tek bir birleşik toplam gösterdiği her yerde -- bağış özeti KPI kartları, bir bağış grubunun toplamı ve bir fonun toplamı -- kilisenizin varsayılanından farklı bir para biriminde kaydedilen bağışlar, güncel döviz kurları kullanılarak kilisenizin para birimine çevrilir. Böylece farklı birimler toplanmak yerine tek ve anlamlı bir sayı elde edilir. Bir dönüşüm uygulandığında toplamın altında her zaman **Güncel döviz kurlarıyla dönüştürüldü** notu görünür. Tekil bağış satırları ise özgün para biriminde görüntülenmeye devam eder.

### Bağış Makbuzları (Giving Statements)

Bağış özetleri oluştururken:

- Her bağış özgün para birimiyle görünür
- Toplamlar para birimi bazında ayrılır
- Üyeler her para biriminde tam olarak ne bağışladığını görür

## Stripe Entegrasyonu

Çevrimiçi bağışlar için Stripe, çoklu para birimli işlemleri yönetir:

- **Otomatik dönüşüm** -- Stripe, para birimlerini hesabınızın varsayılan para birimine çevirir
- **Döviz kurları** -- Stripe, güncel piyasa döviz kurlarını kullanır
- **Ücretler** -- Para birimi dönüşümü ek Stripe ücretlerine yol açabilir
- **Ödeme para birimi** -- Fonlar hesabınızın varsayılan para biriminde yatırılır

:::info
Çoklu para birimli işlemlerin güncel dönüşüm oranlarını ve ilgili ücretleri görmek için Stripe panelinizi kontrol edin.
:::

## Muhasebe Hususları

Birden fazla para birimiyle çalışırken:

- **Kayıt tutma** -- Doğru raporlama için bağışların özgün tutarlarını ve para birimlerini takip edin
- **Döviz kurları** -- Stripe'ın dönüşüm oranlarının bankanızın oranlarından farklı olabileceğini unutmayın
- **Vergi makbuzları** -- Vergi amaçlı olarak farklı para birimindeki bağışların nasıl raporlanacağı konusunda muhasebecinize danışın
- **Fon tahsisi** -- Bağışları para biriminden bağımsız olarak belirli fonlara tahsis edebilirsiniz

## En İyi Uygulamalar

- **Varsayılan para birimi** -- Çoğu işlem için birincil kilise para biriminizi varsayılan olarak ayarlayın
- **Açık iletişim** -- Ödeme sürecinde bağışçılara hangi para biriminde bağış yaptıklarını bildirin
- **Tutarlı raporlama** -- Birleşik toplamlar her zaman otomatik olarak kilisenizin para birimine çevrilir; özgün tutarları görmeniz gerektiğinde bağış başına para birimi filtresini kullanın
- **Düzenli mutabakat** -- Stripe ödemelerini bağış kayıtlarınızla, para birimi dönüşümlerini hesaba katarak uzlaştırın

## Sınırlamalar

- Ödeme işleme için para birimi dönüşümü yalnızca çevrimiçi bağışlar için Stripe tarafından yapılır; manuel bağışlar girildiği gibi kaydedilir ve otomatik dönüşüm uygulanmaz
- Geçmiş raporlar ve tekil bağış satırları her zaman bağışın kaydedildiği özgün para birimini gösterir
- Birleşik toplamlar (KPI kartları, grup toplamları, fon toplamları) güncel döviz kurları kullanılarak kilisenizin para birimine çevrilir -- bu oranlar, fonlar yatırıldığı andaki bankanızın veya Stripe'ın oranlarından hafifçe farklı olabilir

## İlgili Makaleler

- [Çevrimiçi Bağış Kurulumu](./online-giving-setup.md) -- Bağış kabulü için Stripe'ı yapılandırın
- [Bağışları Kaydetme](./recording-donations.md) -- Bağış kayıtlarını manuel olarak girin
- [Bağış Raporları](./donation-reports.md) -- Bağış özetlerini oluşturun ve görüntüleyin
- [Bağış Makbuzları](./giving-statements.md) -- Yıl sonu bağış özetleri oluşturun

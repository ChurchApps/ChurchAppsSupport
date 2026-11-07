---
title: "Bağış Raporları"
---

# Bağış Raporları

<div class="article-intro">

B1 Admin, kilisenizin bağış verilerini görüntülemek ve analiz etmek için birkaç yol sunar. Bağışlar **Özet** sayfasındaki bağış paneli, grafikler ve filtrelerle görsel bir genel bakış sağlarken, Raporlar bölümü daha ayrıntılı bir Bağış Özeti raporu sunar. Bu araçları bağış eğilimlerini izlemek, yönetim kurulu toplantılarına hazırlanmak veya kayıtlarınızı uzlaştırmak için kullanın.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Bağışların [toplu olarak kaydedildiğinden](recording-donations.md) veya [Stripe'tan içe aktarıldığından](stripe-import.md) emin olun
- Bağışların doğru kategorilendirilmesi için [fonlarınızın](funds.md) doğru ayarlandığını doğrulayın

</div>

## Bağış Paneli

Bağış paneli, **Bağışlar** bölümünü açtığınızda karşınıza çıkan ilk sayfa olan **Özet** sayfasının **Panel** görünümüdür.

1. [Atla menüsünü](../introduction.md#getting-around-with-the-jump-menu) (B1 Admin'in sol üstündeki arama çubuğu) açın, **Bağışlar** öğesini genişletin ve **Özet**'e tıklayın. **Özet** sayfası **Panel** görünümünde açılır. Sağ üstteki **Görünüm** düğmesi **Panel** ile **Geç Bağışçılar** arasında geçiş yapar.
2. Bağışların nasıl gruplandırılacağını seçmek için raporun üstündeki **Haftalık**, **Aylık** ve **Üç Aylık** düğmelerini kullanın.
3. **Raporu Filtrele** panelinde **Başlangıç Tarihi** ve **Bitiş Tarihi** değerlerini ayarlayın (varsayılan olarak son bir yıl, dünkü güne kadar) ve isteğe bağlı olarak bir **Fon** seçin, ardından **Raporu Çalıştır**'a tıklayın. Sayfa açıldığında rapor varsayılan ayarlarla otomatik olarak çalışır.
4. Seçilen aralık için bağış metriklerinizi gösteren dört **KPI kartı** görüntülenir:
   - **Toplam Bağış** -- Bağışlanan toplam tutar.
   - **Ortalama Bağış** -- Ortalama bağış tutarı.
   - **Benzersiz Bağışçılar** -- Bağış yapan farklı kişilerin sayısı.
   - **Toplam Bağış Sayısı** -- Yapılan bireysel bağışların toplam sayısı.
5. KPI'ların altında, fonlara göre ayrılmış haftalık, aylık veya üç aylık bağış miktarlarını gösteren bir çubuk grafik yer alır.
6. Dönem ve fona göre toplamların CSV dosyasını dışa aktarmak için **İndirme Seçenekleri**'ne tıklayıp **Özet**'i seçin veya raporu yazdırmak için yazıcı simgesine tıklayın. Kilise logonuz ([Web Sitesi > Görünüm](../website/appearance.md) bölümündeki **Açık Arka Plan Logosu**, eğer yüklediyseniz) ve adınız yazdırılan raporun üst kısmında ortalanmış olarak görünür. Yazdırılan çıktı, B1 Admin'i karanlık modda kullansanız bile koyu metin ve açık renkli bir grafik kullanır.

Dönemdeki bağışlar birden fazla para biriminde yapılmışsa, KPI toplamları kilise para biriminize dönüştürülür ve kartların altında **Güncel döviz kurlarıyla dönüştürülmüştür** notu görünür. Ayrıntılar için [Çoklu Para Birimi Desteği](./multi-currency.md#converted-totals) bölümüne bakın.

:::info
Panel, toplu bağış verilerini gösterir. Bireysel bağışçı adlarını içermez. Bağışçı bazında ayrıntılar için [Toplu İşlemler](batches.md) sayfasını kullanın.
:::

## Geç Bağışçılar

Bir dönemde bağış yapan ancak sonrasında bağış yapmayan kişileri listelemek için **Görünüm** düğmesinde **Geç Bağışçılar**'ı seçin. Varsayılan olarak geçen takvim yılı ile bu yılın bugüne kadarki dönemini karşılaştırır; aramayı genişletmek veya daraltmak için her iki tarih aralığını da değiştirebilirsiniz. Her satır kişiyi, son bağış tarihini ve önceki dönemdeki toplamını gösterir. **İndirme Seçenekleri > Özet** seçeneği listeyi takip mektubu veya arama listesi için CSV olarak indirir.

## Bağışçı Bazında Ayrıntılar

Kimin, ne kadar ve hangi fona bağış yaptığının dökümünü görmek için:

1. **Bağışlar > Toplu İşlemler** bölümüne gidin.
2. Açmak için bir **toplu işlem adına** tıklayın.
3. Toplu işlem ayrıntı sayfası, her bağışı yöntemi (ve çek numarası veya kart hanesi), bağışçının adı, tarihi, notları ve tutarıyla listeler; sayfanın altında toplam yer alır.
4. Belirli bir bağışın tüm ayrıntılarını, fonu dahil olmak üzere açmak için bağış satırındaki **Düzenle**'ye tıklayın.
5. Toplu işlemin tüm bağışçı ve bağış bilgilerini içeren bir CSV dosyasını indirmek için listenin üstündeki **Dışa Aktar**'a tıklayın.

## Bağış Özeti Raporu

Bağış raporlaması doğrudan Bağışlar bölümüne entegredir -- Özet sayfası bağış özeti raporunuz olarak işlev görür:

1. Atla menüsünde **Bağışlar > Özet**'i seçin.
2. **Panel** görünümünde, **Raporu Filtrele** panelinde **Başlangıç Tarihi** ve **Bitiş Tarihi**'ni ayarlayın ve **Raporu Çalıştır**'a tıklayın.
3. **İndirme Seçenekleri**'ne tıklayıp raporu CSV dosyası olarak dışa aktarmak için **Özet**'i seçin.

## Verileri Dışa Aktarma

Bağış verilerini birden fazla yerden dışa aktarabilirsiniz:

- **Özet sayfası** -- haftalık, aylık veya üç aylık dönem ve fona göre bağış toplamlarının CSV dosyasını indirin
- **Toplu işlem ayrıntı sayfası** -- bağışçı bilgileriyle birlikte bireysel bağışların CSV dosyasını indirin
- **Fon ayrıntı sayfası** -- belirli bir fonun bağış geçmişini indirin

:::tip
Yıl sonu raporlaması için, hem toplu eğilimleri hem de bireysel bağışçı dökümlerini almak amacıyla Özet sayfası dışa aktarımını [Bağış Belgeleri](giving-statements.md) aracıyla birleştirin.
:::

## Sonraki Adımlar

- Yıl sonunda bağışçılarınız için [Bağış Belgeleri](giving-statements.md) oluşturun
- Bağış ayrıntılarını doğrulamak için bireysel [toplu işlemleri](batches.md) gözden geçirin
- Kategoriye göre bağış dökümleri için [fon](funds.md) ayrıntı sayfalarını kontrol edin

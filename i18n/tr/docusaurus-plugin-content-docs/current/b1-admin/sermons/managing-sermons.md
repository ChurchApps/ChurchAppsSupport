---
title: "Vaazların Yönetimi"
---

# Vaazların Yönetimi

<div class="article-intro">

Vaazlar sayfasında kilisenizin tüm vaaz kitaplığı görüntülenir. Bu sayfadan yeni vaazlar ekleyebilir, mevcut kayıtları düzenleyebilir ve içeriğinizi oynatma listesine göre düzenleyebilirsiniz. Her vaaz, YouTube, Vimeo, Facebook veya özel bir URL'de barındırılan videoya ya da sese bağlantı verebilir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **contentApi.streamingServices.edit** iznine ihtiyacınız var. Erişiminiz yoksa [Roller ve İzinler](../settings/roles-permissions.md) bölümüne bakın.
- Vaazlarınızı düzenlemek için en az bir [oynatma listesi](playlists) oluşturun
- YouTube, Vimeo veya Facebook'taki video kimliklerinizi ya da URL'lerinizi hazır bulundurun

</div>

## Vaaz Kitaplığınızı Görüntüleme

1. B1 Admin'de, sol üstteki arama çubuğu olan [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) açın, **Vaazlar** öğesini genişletin ve **Vaazlar**'a tıklayın.
2. Vaazlar sayfasında, her vaazın **Oynatma Listesi**, başlığı ve **Yayın Tarihi** bilgilerinin yer aldığı bir tablo gösterilir. Listeyi filtrelemek için tablonun üstündeki arama kutusunu kullanın. Oynatma listeleriniz tablonun yanındaki **Oynatma Listeleri** panelinde görüntülenir.
3. Ayrıntılarını görüntülemek veya düzenlemek için herhangi bir vaaz satırındaki **Düzenle**'ye tıklayın.

## Yeni Vaaz Ekleme

1. Sağ üst köşedeki **Vaaz Ekle** düğmesine tıklayın ve açılır menüden **Vaaz Ekle**'yi seçin.
2. Vaazı atamak için bir **Oynatma Listesi** seçin.
3. **Video Sağlayıcı**nızı seçin: YouTube, Vimeo, Facebook veya Özel URL. B1 sistemiyle en iyi çalıştığı için YouTube'u öneriyoruz.
4. Video kimliğini veya URL'sini girin ve **Getir**'e tıklayın. YouTube için video kimliği, YouTube URL'sinde `v=` ifadesinden sonra gelen karakter dizisidir.
5. **Getir**'e tıklandığında vaaz ayrıntıları otomatik olarak içe aktarılır. Bu ayrıntılar yayın tarihi, süre, başlık, açıklama ve küçük resmi kapsar.
6. İstediğiniz değişiklikleri yapın ve **Kaydet**'e tıklayın.

:::tip
**Vaaz Ekle** açılır menüsünden **Kalıcı Canlı Yayın URL'si Ekle** seçeneğini seçerek de kalıcı bir canlı yayın URL'si ekleyebilirsiniz. Bu işlem, Kanal Kimliğinizi kullanarak YouTube kanalınızın canlı yayınıyla kalıcı bir bağlantı oluşturur. Daha fazla bilgi için [Canlı Yayın](live-streaming) bölümüne bakın.
:::

## Vaaz Düzenleme

1. Kitaplığınızdaki herhangi bir vaaz satırında **Düzenle**'ye tıklayarak ayrıntılarını açın.
2. Başlığı, konuşmacıyı, tarihi, açıklamayı, küçük resmi veya medya bağlantılarını gerektiği gibi güncelleyin.
3. Değişikliklerinizi uygulamak için **Kaydet**'e tıklayın.

## Vaaz Ayrıntıları

Her vaaz kaydı şunları içerebilir:

- **Başlık** -- Ziyaretçilere gösterilen vaaz adı
- **Konuşmacı** -- Vaazı veren kişi
- **Tarih** -- Yayın veya sunum tarihi
- **Açıklama** -- Vaaz içeriğinin özeti
- **Küçük Resim** -- Vaaz kitaplığınızda gösterilen önizleme görseli
- **Video/Ses Bağlantıları** -- YouTube, Vimeo, Facebook veya özel bir sunucudaki vaaz medyasının URL'leri
- **Ses Dosyası URL'si (podcast için)** -- Bu vaaz için doğrudan bir MP3/M4A dosyasına bağlantı. Bir URL yapıştırabilir veya bir dosya yükleyip alanı otomatik olarak doldurmak için **Ses Yükle**'ye tıklayabilirsiniz. Yalnızca bu alanı (veya doğrudan bir video dosyası bağlantısını) doldurulmuş olan vaazlar podcast akışınıza dahil edilir.

## Podcast Akışınız

En az bir vaaza ses veya video dosyası eklendiğinde B1 Admin, kiliseniz için otomatik olarak bir podcast RSS akışı oluşturur. Bunu açmanız gerekmez. Akışı, vaaz listesinin altındaki **Podcast Akışı** panelinde bulabilirsiniz. Akış URL'sini kopyalamak için kopyalama simgesine tıklayın ve ardından bu URL'yi Apple Podcasts, Spotify veya başka bir podcast dizinine gönderin.

:::info
Yalnızca gömülü bir oynatıcıya bağlantı veren vaazlar (YouTube veya Vimeo video kimliği gibi) podcast akışında görünmez. Podcast uygulamaları doğrudan indirilebilir bir medya dosyasına ihtiyaç duyar. Bir vaazı dahil etmek için **Ses Dosyası URL'si** ekleyin.
:::

## Vaazı Canlı Yayın İçin Planlama

Bir vaaz ekledikten sonra, onu canlı yayın sayfanızda yayınlanacak şekilde planlayabilirsiniz:

1. Atlama menüsünde **Vaazlar > Canlı Yayın Saatleri**'ni seçin.
2. Bir ibadeti düzenleyin ve **Video Ayarları** altında açılır listeden vaazınızı seçin.
3. Vaaz, planlanan ibadet saatinde oynatılacaktır.

:::info
Vaazları tek tek eklemek yerine toplu olarak içe aktarmak için, YouTube veya Vimeo hesabınızdaki videoları doğrudan çekmek üzere [Toplu İçe Aktarma](bulk-import) aracını kullanın.
:::

## Sonraki Adımlar

- [Oynatma Listeleri](playlists) -- Vaazları seriler halinde düzenleyin
- [Canlı Yayın](live-streaming) -- Yayın programınızı yapılandırın
- [Toplu İçe Aktarma](bulk-import) -- Birden fazla vaazı bir kerede içe aktarın

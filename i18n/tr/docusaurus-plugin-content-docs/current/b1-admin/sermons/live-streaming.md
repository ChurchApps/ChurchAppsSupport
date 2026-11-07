---
title: "Canlı Yayın"
---

# Canlı Yayın

<div class="article-intro">

Canlı Yayın Saatleri sayfası, kilisenizin yayın programını yapılandırmanıza, ibadet saatlerini yönetmenize ve izleyici deneyimini özelleştirmenize olanak tanır. Haftalık yinelenen ibadetler veya tek seferlik etkinlikler ayarlayın, sohbet ve video ayarlarını yapılandırın ve yayınınızın ne zaman başlayacağını kontrol edin.

</div>

## Eğitim Videosu

<YouTube id="tpEY-sEYW6A" title="B1'de Canlı Yayını Ayarlama" next="B1'de Kilisenizin Üye Uygulamasını Özelleştirme" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **contentApi.streamingServices.edit** iznine ihtiyacınız var. Erişiminiz yoksa [Roller ve İzinler](../settings/roles-permissions.md) bölümüne bakın.
- Otomatik canlı yayın kullanmayı planlıyorsanız YouTube Kanal Kimliğinizi hazır bulundurun
- Yayın kaynağı olarak kullanmak üzere en az bir [vaaz](managing-sermons) veya kalıcı canlı URL ekleyin

</div>

Canlı yayın, Jump menüsündeki **Vaazlar** bölümünden iki sayfa üzerinden yönetilir: canlı yayın programınızı yönetmek için **Canlı Yayın Saatleri** ve yayın sayfanızdaki sekmeleri yapılandırmak için **Ayarlar**.

## Ibadetleri Yönetme

### Ibadet Ekleme

1. B1 Admin'de [Jump menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Vaazlar** bölümünü genişletin ve **Canlı Yayın Saatleri**'ne tıklayın.
2. Yeni bir planlanmış ibadet oluşturmak için sayfanın üst kısmındaki **Ibadet Ekle** düğmesine tıklayın. Mevcut ibadetler, her ibadetin adını, saatini, sağlayıcısını ve süresini gösteren bir tabloda listelenir; bir satırdaki değiştirme simgesine tıklayarak düzenleyebilirsiniz.
3. **Ibadet Adı** alanına bir ad girin (örneğin, "Pazar Sabahı").
4. **Ibadet Saati**'ni ayarlayın -- ibadetin başlayacağı günü ve saati seçin.
5. Düzenli haftalık ibadetler için **Haftalık Tekrarla** seçeneğini **Evet**, tek seferlik bir etkinlik için **Hayır** olarak ayarlayın.

### Sohbet ve Video Ayarlarını Yapılandırma

6. **Sohbet Ayarları** altında, sohbetin ibadetten kaç dakika önce ve sonra etkinleştirileceğini belirleyin. Bu sayede ziyaretçiler ibadet başlamadan önce sohbete katılabilir ve ibadetten sonra da devam edebilir.
7. **Video Ayarları** altında, geri sayım veya ibadet öncesi içerik için video yayınının ne kadar erken başlayacağını belirleyin. Sohbet, erken video başlamadan *önce* bu dakika kadar açılır; bu nedenle sohbetin dakika öncesi ayarının yanında gösterilen süre her iki sayıyı da içerir. Örneğin, saat 10:00 ibadette sohbet 15 dakika önce ve erken başlangıç 5 dakika ise sohbet 09:40'ta açılır.
8. Açılır listeden oynatılacak vaazı seçin:
   - **En Son Vaaz** -- En son eklenen videonuzu otomatik olarak oynatır.
   - **Mevcut Canlı Ibadet** -- Kanal Kimliğinizi kullanarak YouTube'daki mevcut canlı yayınınızı oynatır.
   - Daha önce kaydettiğiniz herhangi bir belirli vaazı da seçebilirsiniz.
9. Ibadetinizi planlamak için **Kaydet**'e tıklayın.

:::info
Tekrarlanacak şekilde ayarlanmışsa ibadetiniz her hafta otomatik olarak güncellenir. Yaz saati uygulaması başladığında veya sona erdiğinde yerel saatte kalır. İhtiyacınız kadar ibadet ekleyebilirsiniz. Ziyaretçiler yayın sayfanızı ziyaret ettiklerinde bir sonraki planlanmış ibadet saatini görecektir.
:::

## Yayın Sayfası Ayarları

Canlı yayınınızın yanında görünen sekmeleri ve bağlantıları özelleştirmek için Jump menüsünü açın, **Vaazlar** bölümünü genişletin ve **Ayarlar**'a tıklayın. **Yayın Ayarları** sayfasında **Içerik Sekmeleri** listeniz gösterilir.

### Sekme Ekleme

1. Canlı yayın sayfanıza yeni bir sekme eklemek için **Ekle** düğmesine tıklayın.
2. Bir **Bağlantı Türü** seçin: özel bir bağlantı için **Harici URL**, ya da önceden tasarlanmış **Sohbet** veya **Dua** sekmelerinden birini seçin.
3. Sohbet sekmesi için **Sekme Metni** kutusuna yalnızca bir ad verin; kurulum tamamlanır.
4. Bağlantılı bir sekme için sekme adını girin, simge düğmesine tıklayarak bir simge seçin ve URL'yi girin.
5. Yapılandırdığınız sekmeler, izleyicilerin ek kaynaklara ve etkileşimli özelliklere erişebilmesi için canlı yayın sayfasında görünecektir.

### Yayınınızı Önizleme

**Canlı Yayın Saatleri** sayfasında, logonuz, ibadet saatleriniz ve yapılandırdığınız sekmeler dahil olmak üzere canlı yayın sayfanızın ziyaretçilere tam olarak nasıl görüneceğini görmek için sayfanın üst kısmındaki **Yayınınızı Görüntüleyin** düğmesine tıklayın.

## YouTube Canlı Yayınınızı Ayarlama

YouTube kanalınızı otomatik canlı yayın için bağlamak üzere:

1. **Vaazlar** bölümüne gidin, **Vaaz Ekle**'ye tıklayın, ardından **Kalıcı Canlı URL Ekle**'yi seçin.
2. Video sağlayıcısı varsayılan olarak **Mevcut YouTube Canlı Yayını** seçilidir. **YouTube Kanal Kimliğinizi** girin.
3. Bir başlık ve açıklama ekleyin, ardından **Kaydet**'e tıklayın.
4. **Canlı Yayın Saatleri** bölümünde bir ibadet oluşturun ve vaaz açılır listesinden kalıcı canlı URL'nizi seçin.

:::tip
YouTube Kanal Kimliğinizi bulmak için YouTube kanalınızın gelişmiş ayarlarına gidin ve Kanal Kimliği değerini kopyalayın.
:::

## Renkleri ve Logoyu Özelleştirme

Canlı yayın sayfanız web sitenizin [Görünüm](../website/appearance) ayarlarını kullanır:

- Koyu metinli **açık vurgu rengi** üst bilgi için kullanılır.
- Açık metinli **koyu vurgu rengi** kenar çubuğu için kullanılır.
- **Açık Arka Plan Logonuz** yayın sayfasında görünür. Şeffaf arka planlı ve 4:1 en-boy oranlı bir görsel kullanın.

Bunları değiştirmek için **Web Sitesi** ardından **Görünüm** bölümüne gidin ve [Renk Paleti](../website/appearance#color-palette) ve [Logo](../website/appearance#logo-and-branding) ayarlarınızı güncelleyin.

## Yayın Sunucuları Ekleme

Ekip üyelerine genel sohbetin yanında yalnızca sunucuların kullanabileceği sohbete erişim vermek için:

1. Jump menüsünde **Ayarlar > Roller** seçeneğini seçin.
2. Artı düğmesine tıklayın ve **Özel Rol Ekle**'yi seçin.
3. Rolü "Yayın Sunucusu" olarak adlandırın ve **Kaydet**'e tıklayın.
4. Yeni role tıklayın, ardından kişileri eklemek için Üyeler bölümündeki **Ekle**'ye tıklayın.
5. **Izinleri Düzenle** bölümüne kadar aşağı kaydırın, **Içerik** bölümünü genişletin ve **Sunucu Sohbeti**'ni işaretleyin.

Sunucular canlı yayın sayfasına giriş yaptığında, yayın sırasında yalnızca personele yönelik konuşmalar için genel sohbetin yanında özel bir **Sunucu Sohbeti** sekmesi görünür.

:::info
Roller oluşturma ve izinleri yönetme hakkında daha fazla bilgi için [Roller ve İzinler](../settings/roles-permissions.md) bölümüne bakın.
:::

## Sorun Giderme

"Mevcut YouTube Canlı Yayını" seçeneğini Kanal Kimliğinizle kullanırken otomatik YouTube canlı yayınınız düzgün görüntülenmiyorsa şunları deneyin:

**Belirtiler:**
- Canlı yayın gömülü öğesi "Video kullanılamıyor" mesajını gösterir
- Sayfa yükleniyor ancak video görünmüyor
- Doğrudan YouTube gömmeleri çalışıyor, ancak otomatik kanal canlı yayını çalışmıyor

**Çözüm:**
YouTube kanalınızdaki eski veya planlanmış canlı yayınları kontrol edin ve silin:

1. YouTube Studio'nuza gidin.
2. **İçerik** ardından **Canlı** bölümüne gidin.
3. Eski planlanmış canlı yayınları veya yaklaşan planlanmış yayınları arayın.
4. Bu eski veya planlanmış canlı yayın girişlerini silin.
5. Canlı yayın sayfanızı yeniden test edin.

:::warning
Kanalınızda birden fazla planlanmış veya geçmiş canlı yayın girişi olduğunda YouTube'un otomatik kanal canlı yayın gömmesi engellenebilir. Bunları kaldırmak, YouTube'un mevcut canlı yayınınızı doğru şekilde tanımlayıp sunmasını sağlar.
:::

**Ek gereksinimler:**
- Canlı yayınınız **Herkese Açık** olarak ayarlanmış olmalıdır (Listelenmemiş veya Özel değil).
- YouTube yayın ayarlarınızda gömmeye izin verilmelidir.
- **Kanal Kimliği** ile **Mevcut YouTube Canlı Yayını** sağlayıcısını kullandığınızdan emin olun, **Video Kimliği** ile **YouTube** sağlayıcısını değil.

## Sonraki Adımlar

- [Vaazları Yönetme](managing-sermons) -- Kitaplığınıza vaaz ekleyin
- [Oynatma Listeleri](playlists) -- Vaazları serilere düzenleyin

---
title: "Takvimi Planlama"
description: "FreePlay Admin'in Takvim bölümünde haftalık veya tek seferlik bir program kurun; oynatma listeleri, ibadet planları ya da sağlayıcı klasörlerini ekran gruplarınızda, varsayılan döngüler yedek olacak şekilde çalıştırın."
---

# Takvimi Planlama

<div class="article-intro">

FreePlay Admin'deki **Takvim** sayfası, her ekran grubunun neyi ne zaman oynatacağını kontrol eder. Bir oynatma listesi, bir hizmet planı veya bir sağlayıcı klasörü için program ekleyin ve bunu haftalık olarak tekrarlanacak ya da bir kez oynatılacak şekilde ayarlayın. Hiçbir şey planlanmadığında grubun varsayılan döngüsü oynatılır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- En az bir ekran grubu oluşturun. Bkz. [Ekranları ve Grupları Yönetme](./managing-screens.md#screen-groups)
- [Bir oynatma listesi oluşturun](./building-playlists.md) veya B1 Admin'de bir plan türünün ayarlanmış olduğundan emin olun

</div>

## Takvimi Okuma

1. **Takvim**'e gidin.
2. Üstteki sekmelerden bir ekran grubu seçin. Her sekme, grubun kaç programa sahip olduğunu gösterir.
3. Hafta görünümü Pazartesi'den Pazar'a, sabah 6'dan akşam 10'a kadar uzanır. Kırmızı bir çizgi geçerli saati gösterir.
4. Önceki veya sonraki haftaya geçmek için okları kullanın ya da bu haftaya dönmek için **Bugün**'e tıklayın.

Sayfa alt başlığı, takvimde kullanılan saat dilimini gösterir. Programlar kilisenizin saat dilimini izler; bunu B1 Admin'de [Kilise Bilgileri](../../b1-admin/settings/church-settings.md#time-zone) altında ayarlarsınız. Kilisenizin bir saat dilimi ayarlanmamışsa FreePlay, kampüsünüzün saat dilimini kullanır. Takvim ve TV'leriniz aynı saat dilimini kullanır; bu nedenle takvimde sabah 9:00'a yerleştirilen bir blok, bilgisayarınız farklı bir saat dilimine ayarlı olsa bile ekranda sabah 9:00'da oynatılır.

Programlar türlerine göre renklendirilir. Renkleri bir açıklama kutusu gösterir:

- **Varsayılan döngü** - Grubun varsayılan döngüsü olduğunda her şeyin arkasında gösterilen çizgili arka plan
- **Oynatma listesi**
- **Hizmet planı**
- **Sağlayıcı klasörü**

Her blok adını gösterir; daha uzun bloklar ayrıca saatleri, tekrarlanıp tekrarlanmadığını (**haftalık** veya **bir kez**) ve erken bittiğinde ne olacağını gösterir.

## Varsayılan Döngüyü Ayarlama

Varsayılan döngü, hiçbir şey planlanmadığında grubun ekranlarında oynatılır.

1. **Takvim** sayfasında, üst kısımdaki **Varsayılan döngü…** düğmesine tıklayın. Zaten bir varsayılan döngü ayarlıysa düğme, **Varsayılan döngü:** ifadesini oynatma listesinin adıyla birlikte gösterir.
2. Bir **Oynatma listesi** seçin ya da **Yok — ekran kararır** seçeneğini belirleyin.
3. **Kaydet**'e tıklayın.

## Program Ekleme

Yeni bir program başlatmanın üç yolu vardır:

- Takvimde boş bir alana tıklayın. Form, o gün ve yarım saatlik dilim önceden doldurulmuş olarak açılır.
- Üst kısımdaki **Program ekle**'ye tıklayın.
- Komut paletinden (**Ctrl+K** veya **⌘K**) **Program ekle**'yi seçin.

Ardından formu doldurun:

1. **Oynat** - Neyin oynatılacağını seçin:
   - **Oynatma listeleri** - Oluşturduğunuz herhangi bir oynatma listesi
   - **Hizmet planları** - B1 Admin'deki bir plan türü, **(mevcut plan)** etiketiyle işaretlenmiş. Ekran, her hafta o plan türü için geçerli olan planı oynatır; bu, Go Curriculum derslerini (özelleştirilmiş olanlar dahil) de kapsar. Bu dersler, plan türünün bağlı olduğu hizmetin Go hesabını kullanır.
   - **Sağlayıcı klasörü…** - **Bir sağlayıcı klasörü seçin** penceresini açar. Bir klasöre göz atın ve **Bu klasörü kullan**'a tıklayın. Daha sonra farklı bir klasör seçmek için **Değiştir**'e tıklayın.
2. **Tekrarlar** - Bu programın oynatılacağı haftanın günlerini seçin. Bunun yerine tek bir tarih için **Bir kez**'i açın ve **Tarih**'i seçin.
3. **Başlangıç** ve **Bitiş** - Programın başlayıp duracağı saatler.
4. **Erken biterse** - İçerik, bitiş saatinden önce tükendiğinde ne yapılacağı:
   - **Bitiş saatine kadar döngüde oynat** - Baştan yeniden başlar. Tabela döngüleri, duyurular ve geri sayımlar için uygundur.
   - **Öğretmen temposunda** - Slaytlar öğretmenin uzaktan kumandasını bekler. Ders, son slayta kadar bitiş saatinden sonra da ekranda kalır.
   - **Bir kez oynat, sonra varsayılan döngüye dön**
5. Tekrarlayan programlar için **Başlangıç** tarihini ilk güne ayarlayın. **Bitiş** altında **Hiçbir zaman**'ı seçin ya da **Belirli tarihte**'yi seçip bir **Bitiş tarihi** girin.
6. **Kaydet**'e tıklayın.

:::info
**Öğretmen temposunda**, eski "son slaytta bekle" seçeneğinin yerini aldı. Bu seçenekle kaydedilmiş programlar artık öğretmen temposunda oynatılır.
:::

## Programı Düzenleme veya Silme

1. Takvimde programın bloğuna tıklayın.
2. İstediğiniz alanı değiştirip **Kaydet**'e tıklayın ya da programı kaldırmak için **Sil**'e tıklayın.

## Çakışan Programlar

İki program çakışırsa form bir uyarı gösterir: **Başka bir programla çakışıyor. Daha geç başlayan program geçerli olur.** Daha geç başlayan program çalışırken ekranlar onu oynatır. Bittiğinde, daha erken başlayan program hâlâ sürüyorsa ekranlar ona geri döner.

## Ekranlar Değişiklikleri Nasıl Alır

Eşleştirilmiş ekranlar, önümüzdeki 7 gün için planlanan her şeyi indirir ve değişiklikleri kendi kendilerine denetler. Takvimi düzenledikten sonra TV'ye dokunmanız gerekmez. Bir ekranın gerekli her şeye sahip olup olmadığını görmek için [Ekranlar sayfası](./managing-screens.md) üzerindeki **Şu tarihe kadar hazır** bilgisine bakın.

## İlgili Makaleler

- **[Oynatma Listeleri Oluşturma](./building-playlists.md)** - Planladığınız oynatma listelerini oluşturun
- **[TV'de Planlı Oynatma](./scheduled-playback.md)** - Öğretmen temposundaki derslerin ve uzaktan kumandanın TV'de nasıl çalıştığı
- **[Ekranları ve Grupları Yönetme](./managing-screens.md)** - Grup ekleyin ve her ekranın indirmelerini kontrol edin
- **[Her Dersin Yalnızca Bir Bölümünü Tutma](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Bir plan türündeki planlanmış her dersi, odanızın oynattığı bölümlere indirin

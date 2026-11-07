---
title: "İçerik Uç Noktaları"
---

# İçerik Uç Noktaları

<div class="article-intro">

İçerik modülü web sitesi sayfalarını, bölümleri, öğeleri, blokları, blog yazılarını, yönlendirmeleri, vaazları, oynatma listelerini, yayın hizmetlerini, etkinlikleri, özel olarak düzenlenmiş takvimleri, dosyaları, galerileri, İncil çevirilerini ve ayet aramalarını, şarkıları, düzenlemeleri, genel stilleri, stok fotoğrafları ve ayarları yönetir. API'deki en büyük modüldür ve tüm ChurchApps uygulamalarında CMS, medya ve yayın, ibadet planlaması ve İncil özelliklerine güç verir.

</div>

**Temel yol:** `/content`

## Sayfalar

Temel yol: `/content/pages`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:churchId/tree?url=&id=` | Herkese açık | — | URL veya kimlik ile tam sayfa ağacını (bölümler, öğeler, bloklar) yükler. URL ile getirildiğinde dahili kimlikleri kaldırır. URL tabanlı getirmeler `pages.visibility` ayarını uygular; kısıtlı bir sayfa, (isteğe bağlı) JWT erişim koşulunu karşılamadıkça `{ restricted: true, visibility }` döndürür |
| GET | `/public/:churchId` | Herkese açık | — | Herkese açık sayfaları listeler (`url`, `title`, `metaDescription`); yalnızca `visibility = everyone` olanlar |
| GET | `/:id` | JWT | — | Kimlik ile bir sayfa alır |
| GET | `/` | JWT | — | Kilisenin tüm sayfalarını listeler |
| POST | `/duplicate/:id` | JWT | Content.Edit | Bir sayfayı tüm bölümleri ve öğeleriyle çoğaltır |
| POST | `/temp/ai` | JWT | Content.Edit | Yapay zeka tarafından oluşturulan bir sayfayı kaydeder (sayfa, bölümler ve öğeler tek çağrıda) |
| POST | `/importTree` | JWT | Content.Edit | İç içe bir ağaçtan sayfa oluşturur (`title`, `url`, `sections[].elements[]…`). Her zaman çağıran kilisenin altına ekler; gövdedeki kimlikler yok sayılır. Satırlar `column` alt öğelerini içermelidir. En fazla 30 bölüm / 500 öğe |
| POST | `/` | JWT | Content.Edit | Sayfaları oluşturur veya günceller (toplu) |
| DELETE | `/:id` | JWT | Content.Edit | Bir sayfayı siler |

### Örnek: Sayfa Ağacını Yükleme

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Bölümler

Temel yol: `/content/sections`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimlik ile bir bölüm alır |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Bir bölümü çoğaltır veya yeniden kullanılabilir bir bloğa dönüştürür |
| POST | `/` | JWT | Content.Edit | Bölümleri oluşturur veya günceller (toplu). Sıralama düzenini otomatik günceller |
| DELETE | `/:id` | JWT | Content.Edit | Bir bölümü siler (sıralama düzenini otomatik günceller) |

## Öğeler

Temel yol: `/content/elements`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimlik ile bir öğe alır |
| POST | `/duplicate/:id` | JWT | Content.Edit | Bir öğeyi tüm alt öğeleriyle çoğaltır |
| POST | `/` | JWT | Content.Edit | Öğeleri oluşturur veya günceller (toplu). Satır sütunlarını ve karusel slaytlarını otomatik yönetir |
| DELETE | `/:id` | JWT | Content.Edit | Bir öğeyi siler |

## Bloklar

Temel yol: `/content/blocks`

Standart CRUD'dan genişletilir (temel sınıftan GET `/:id`, GET `/`, POST `/`, DELETE `/:id`; yazma işlemleri için Content.Edit izniyle).

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimlik ile bir blok alır |
| GET | `/` | JWT | — | Tüm blokları listeler |
| GET | `/:churchId/tree/:id` | Herkese açık | — | Bölümler ve öğelerle birlikte tam blok ağacını yükler |
| GET | `/blockType/:blockType` | JWT | — | Türe göre blokları yükler (ör. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Herkese açık | — | Bir kilise için altbilgi blok ağacını yükler |
| POST | `/` | JWT | Content.Edit | Blokları oluşturur veya günceller |
| DELETE | `/:id` | JWT | Content.Edit | Bir bloğu siler |

## Bağlantılar

Temel yol: `/content/links`

Standart CRUD'dan genişletilir (temel sınıftan GET `/:id`, GET `/`, POST `/`, DELETE `/:id`; yazma işlemleri için Content.Edit izniyle).

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimlik ile bir bağlantı alır |
| GET | `/` | JWT | — | Tüm bağlantıları listeler. İsteğe bağlı `?category=` filtresi. Kaydettikten sonra otomatik sıralanır |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Görünürlüğe göre filtrelenmiş bağlantıları yükler (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Herkese açık | — | Bir kilise için kategoriye göre bağlantıları yükler (herkese açık) |
| POST | `/` | JWT | Content.Edit | Bağlantıları oluşturur veya günceller (toplu). Kategoriye göre otomatik sıralar |
| DELETE | `/:id` | JWT | Content.Edit | Bir bağlantıyı siler |

## Genel Stiller

Temel yol: `/content/globalStyles`

Standart CRUD'dan genişletilir (temel sınıftan POST `/`, DELETE `/:id`; yazma işlemleri için Content.Edit izniyle).

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/church/:churchId` | Herkese açık | — | Bir kilise için genel stilleri yükler (ayarlanmamışsa varsayılanları döndürür) |
| GET | `/` | JWT | — | Kimliği doğrulanmış kilise için genel stilleri yükler |
| POST | `/` | JWT | Content.Edit | Genel stilleri oluşturur veya günceller |
| DELETE | `/:id` | JWT | Content.Edit | Genel stilleri siler |

## Sayfa Geçmişi

Temel yol: `/content/pageHistory`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Bir sayfanın geçmiş kayıtlarını listeler |
| GET | `/block/:blockId` | JWT | Content.Edit | Bir bloğun geçmiş kayıtlarını listeler |
| GET | `/:id` | JWT | Content.Edit | Kimlik ile bir geçmiş kaydı alır |
| POST | `/` | JWT | Content.Edit | Bir sayfa/blok anlık görüntüsü kaydeder. Düzenli aralıklarla 30 günden eski kayıtları temizler |
| POST | `/restore/:id` | JWT | Content.Edit | Bir sayfayı/bloğu geçmiş anlık görüntüsünden geri yükler (mevcut içeriği siler ve anlık görüntüden yeniden oluşturur) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Satır içi anlık görüntü nesnesinden geri yükler. Gövde: `{ pageId, blockId, snapshot }` |

## Yazılar (Blog)

Temel yol: `/content/posts`

Blog yazıları bağımsız satırlardır: `title`, `slug` (kilise başına benzersiz), `excerpt`, `content` (markdown gövdesi), `authorId`, `photoUrl`, `publishDate`, `category` ve `tags`. Bir yazı, `publishDate` ayarlandığında ve geçmiş bir tarihte olduğunda yayımlanmış sayılır. Okuma uç noktaları her yazıyı, `authorId` değerinden çözümlenen `authorName` ile zenginleştirir. Bkz. [Web Sitesi Oluşturucu Mimarisi](../../architecture/website-builder#blog).

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Herkese açık | — | Yayımlanmış yazıları sayfalayarak listeler (sayfa başına en fazla 50) |
| GET | `/public/:churchId/categories` | Herkese açık | — | Yayımlanmış yazılar arasındaki farklı kategoriler |
| GET | `/public/:churchId/slug/:slug` | Herkese açık | — | Slug ile yayımlanmış bir yazı alır |
| GET | `/rss/:churchId?siteUrl=` | Herkese açık | — | Yayımlanmış yazıların RSS 2.0 beslemesi (bağlantılar `{siteUrl}/blog/{slug}` olarak oluşturulur) |
| GET | `/:id` | JWT | — | Kimlik ile bir yazı alır |
| GET | `/` | JWT | — | Kilisenin tüm yazılarını listeler |
| POST | `/` | JWT | Content.Edit | Yazıları oluşturur veya günceller (toplu) |
| DELETE | `/:id` | JWT | Content.Edit | Bir yazıyı siler |

## Yönlendirmeler

Temel yol: `/content/redirects`

Kilise başına URL yönlendirmeleri (`fromPath` → `toPath`), kilise başına en fazla 200 ile sınırlıdır. Yollar normalleştirilir (küçük harfe çevrilir, baştaki eğik çizgi eklenir, sondaki eğik çizgi kaldırılır) ve `fromPath` kilise başına benzersizdir. B1App, olası 404 hatalarını bu yönlendirmelerle çözer ve HTTP 308 yanıtı verir.

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/public/:churchId?path=` | Herkese açık | — | Bir yolu çözümler (`path` atlandığında tüm yönlendirmeleri listeler) |
| GET | `/:id` | JWT | — | Kimlik ile bir yönlendirme alır |
| GET | `/` | JWT | — | Kilisenin tüm yönlendirmelerini listeler |
| POST | `/` | JWT | Content.Edit | Yönlendirmeleri oluşturur veya günceller. `fromPath = toPath` durumunu reddeder ve 200 satır sınırını uygular |
| DELETE | `/:id` | JWT | Content.Edit | Bir yönlendirmeyi siler |

## Vaazlar

Temel yol: `/content/sermons`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Örnek bir FreeShow oynatma listesi yapısını alır |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Vaaz, ders ve FreeShow kaynaklarını içeren TV uygulaması sarmalayıcısını alır |
| GET | `/public/tvFeed/:churchId/:sermonId` | Herkese açık | — | Tek bir vaazı TV akışı oynatma listesi olarak alır |
| GET | `/public/tvFeed/:churchId` | Herkese açık | — | Tüm herkese açık oynatma listelerini/vaazları TV akışı olarak alır |
| GET | `/public/:churchId` | Herkese açık | — | Bir kilisenin tüm herkese açık vaazlarını listeler |
| GET | `/timeline?sermonIds=` | JWT | — | Vaazlar için zaman çizelgesi verilerini yükler |
| GET | `/lookup?videoType=&videoData=` | Herkese açık | — | YouTube veya Vimeo'dan vaaz meta verilerini arar |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Vaaz altyazılarından yapay zeka destekli sosyal medya gönderi önerileri oluşturur |
| GET | `/outline?url=&title=&author=` | JWT | — | Bir URL'den yapay zeka destekli ders taslağı oluşturur |
| GET | `/youtubeImport/:channelId` | JWT | — | Bir YouTube kanalından videoları içe aktarır. YouTube arama API'sinin başlık ve açıklamalara koyduğu HTML varlıkları (ör. `&amp;` ve `&#39;`) çözülür |
| GET | `/vimeoImport/:channelId` | JWT | — | Bir Vimeo kanalından videoları içe aktarır |
| GET | `/:id` | JWT | — | Kimlik ile bir vaaz alır |
| GET | `/` | JWT | — | Tüm vaazları listeler |
| POST | `/` | JWT | StreamingServices.Edit | Vaazları oluşturur veya günceller. Bir dizi veya tek bir vaaz nesnesi kabul eder (her zaman bir dizi döndürür); boş gövde 400 döndürür. Base64 küçük resim yüklemeyi destekler |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Bir vaazı siler |

### Örnek: YouTube Vaazı Arama

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Oynatma Listeleri

Temel yol: `/content/playlists`

Standart CRUD'dan genişletilir (temel sınıftan GET `/:id`, GET `/`, DELETE `/:id`; yazma işlemleri için StreamingServices.Edit izniyle).

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimlik ile bir oynatma listesi alır |
| GET | `/` | JWT | — | Tüm oynatma listelerini listeler |
| GET | `/public/:churchId` | Herkese açık | — | Bir kilisenin tüm herkese açık oynatma listelerini listeler |
| POST | `/` | JWT | StreamingServices.Edit | Oynatma listelerini oluşturur veya günceller (toplu, base64 küçük resim yüklemeyi destekler) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Bir oynatma listesini siler |

## Yayın Hizmetleri

Temel yol: `/content/streamingServices`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Bir hizmet için şifrelenmiş sunucu sohbet odası kimliğini alır |
| GET | `/` | JWT | — | Tüm yayın hizmetlerini listeler. Süresi dolmuş tekrarlanmayan hizmetleri otomatik temizler ve tekrarlanan hizmetleri ilerletir |
| POST | `/` | JWT | StreamingServices.Edit | Yayın hizmetlerini oluşturur veya günceller (toplu) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Bir yayın hizmetini siler (engellenen IP adreslerini de temizler) |

## Etkinlikler

Temel yol: `/content/events`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Bir grup için zaman çizelgesi etkinliklerini yükler (istisna tarihlerini içerir, böylece silinen tekrarlar atlanabilir) |
| GET | `/timeline?eventIds=` | JWT | — | Geçerli kullanıcının grupları için zaman çizelgesi etkinliklerini yükler (istisna tarihlerini içerir) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Herkese açık | — | Etkinliklere ICS takvim beslemesi olarak abone olunur |
| GET | `/group/:groupId` | JWT | — | Bir grubun etkinliklerini alır (istisna tarihlerini içerir) |
| GET | `/public/group/:churchId/:groupId` | Herkese açık | — | Bir grup için herkese açık etkinlikleri alır |
| GET | `/public/:churchId/:id` | Herkese açık | — | Herkese açık sayfası için tek bir etkinliği alır; reddedilmemiş rezervasyonlardaki odaların adlarını (`roomNames`) içerir. Beklemedeki veya reddedilmiş etkinlikler ile kayıt almayan özel etkinlikler için `null` döndürür |
| GET | `/public/:churchId/:id/ical` | Herkese açık | — | Bu tek etkinliği `.ics` dosyası olarak indirir (`text/calendar`, istisna tarihleri uygulanmış). Aynı kurallarla gizlenmiş bir etkinlik için `404` |
| GET | `/:id` | JWT | — | Kimlik ile bir etkinlik alır |
| POST | `/` | JWT | — | Etkinlikleri oluşturur veya günceller (toplu) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin veya grup lideri | Bir etkinliği ve rezervasyonlarını siler. Etkinliğin grubunun liderleri silebilir; talepte bulunan kişi kendi bekleyen talebini geri çekebilir |

Etkinlik kayıtları şu alanları içerir: `photoUrl` (herkese açık etkinlik sayfasında ve yaklaşan etkinlik kutularında gösterilen 16:9 etkinlik fotoğrafı), `tags` (virgülle ayrılmış; web sitesi Takvim öğesinin etiket filtresi tarafından kullanılır) ve `notesViewRole` / `notesPostRole` (`null` olduğunda `staff`, ayrıca `leaders` veya `members`). Bu alanlar etkinliğin `eventNote` görüşmesine erişimi denetler. Bkz. [Grup ve etkinlik notlarına erişim denetimi](./messaging.md#group-and-event-notes-access-control). Herkese açık özel takvim yanıtları ayrıca her etkinliğin `photoUrl` ve `tags` alanlarını taşır.

## Etkinlik İstisnaları

Temel yol: `/content/eventExceptions`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimlik ile bir etkinlik istisnası alır |
| POST | `/` | JWT | Content.Edit, Calendars.Admin veya grup lideri | Etkinlik istisnalarını oluşturur veya günceller (toplu). Liderler yalnızca kendi yönettikleri gruplardaki etkinlikler için istisna ekleyebilir |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin veya grup lideri | Bir etkinlik istisnasını siler |

## Özel Takvimler

Temel yol: `/content/curatedCalendars`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimlik ile bir özel takvim alır |
| GET | `/` | JWT | — | Tüm özel takvimleri listeler |
| POST | `/` | JWT | Content.Edit | Özel takvimleri oluşturur veya günceller (toplu) |
| DELETE | `/:id` | JWT | Content.Edit | Bir özel takvimi siler |

## Özel Etkinlikler

Temel yol: `/content/curatedEvents`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Bir takvim için özel etkinlikleri alır (`?withoutEvents` ayarlanmadıkça etkinlik ayrıntılarını ve istisna tarihlerini içerir) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Herkese açık | — | Bir takvim için herkese açık özel etkinlikleri alır |
| GET | `/:id` | JWT | — | Kimlik ile bir özel etkinlik alır |
| GET | `/` | JWT | — | Tüm özel etkinlikleri listeler |
| POST | `/` | JWT | Content.Edit | Özel etkinlikleri oluşturur veya günceller. Belirli grup etkinliklerini eklemek için `eventIds` dizisini destekler |
| DELETE | `/:id` | JWT | Content.Edit | Bir özel etkinliği siler |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Belirli bir etkinliği özel bir takvimden kaldırır |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Bir grubun tüm etkinliklerini özel bir takvimden kaldırır |

## Dosyalar

Temel yol: `/content/files`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | İçerik türü ve içerik kimliğine göre dosyaları alır |
| GET | `/` | JWT | — | Kilise web sitesinin tüm dosyalarını listeler |
| GET | `/:id` | JWT | — | Kimlik ile bir dosya alır |
| POST | `/` | JWT | Content.Edit* | Dosyaları yükler (base64). *`contentId` ile eşleşen grubun üyesi olan kullanıcılara da izin verilir |
| POST | `/postUrl` | JWT | Content.Edit* | Önceden imzalanmış bir S3 yükleme URL'si alır. *Grup üyelerine de izin verilir. İçerik öğesi başına en fazla 100 MB |
| DELETE | `/:id` | JWT | Content.Edit* | Bir dosyayı siler ve depolamadan kaldırır. *Grup üyelerine de izin verilir |

## Galeri

Temel yol: `/content/gallery`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/stock/:folder` | Herkese açık | — | Bir klasördeki stok fotoğrafları listeler |
| GET | `/:folder` | JWT | Content.Edit | Bir klasördeki galeri görsellerini listeler |
| POST | `/requestUpload` | JWT | Content.Edit | Bir galeri görseli için önceden imzalanmış bir S3 yükleme URL'si alır |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Bir galeri görselini siler |

## İncil'ler

Temel yol: `/content/bibles`

Tüm İncil uç noktaları herkese açıktır (kimlik doğrulama gerekmez). Veriler harici kaynaklardan alınır ve yerel olarak önbelleğe alınır. api.bible'a yapılan istekler 15 saniye sonra zaman aşımına uğrar; zaman aşımı **504** döndürür.

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | Herkese açık | — | Tüm İncil çevirilerini listeler (önbellek boşsa kaynaktan getirir) |
| GET | `/stats?startDate=&endDate=` | Herkese açık | — | Bir tarih aralığı için İncil arama istatistiklerini alır |
| GET | `/availableTranslations/:source` | Herkese açık | — | Bir kaynaktan (ör. api.bible) mevcut çevirileri listeler |
| GET | `/updateTranslations` | Herkese açık | — | Tüm kaynaklardaki tüm çevirileri senkronize eder |
| GET | `/updateTranslations/:source` | Herkese açık | — | Belirli bir kaynaktan çevirileri senkronize eder |
| GET | `/updateCopyrights` | Herkese açık | — | Telif bilgisi eksik çevirilerin telif bilgilerini günceller |
| GET | `/:translationKey/updateCopyright` | Herkese açık | — | Belirli bir çevirinin telif bilgisini günceller |
| GET | `/:translationKey/search?query=&limit=` | Herkese açık | — | Bir çevirideki ayetleri arar |
| GET | `/:translationKey/books` | Herkese açık | — | Bir çevirinin kitaplarını alır (yerel olarak önbelleğe alır) |
| GET | `/:translationKey/:bookKey/chapters` | Herkese açık | — | Bir kitabın bölümlerini alır (yerel olarak önbelleğe alır) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Herkese açık | — | Bir bölümün ayetlerini alır (yerel olarak önbelleğe alır) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Herkese açık | — | Bir aralık için ayet metnini alır. Aramaları kaydeder. Bazı çeviriler lisans gereği önbelleklemeyi atlar |

### Örnek: Ayet Metnini Alma

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Şarkılar

Temel yol: `/content/songs`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/search?q=` | JWT | — | Sorguya göre şarkı arar |
| GET | `/:id` | JWT | — | Kimlik ile bir şarkı alır |
| GET | `/` | JWT | Content.Edit | Tüm şarkıları listeler |
| POST | `/` | JWT | Content.Edit | Şarkıları oluşturur veya günceller (toplu) |
| POST | `/import` | JWT | — | FreeShow'dan şarkıları içe aktarır (toplu) |
| DELETE | `/:id` | JWT | Content.Edit | Bir şarkıyı siler |

## Şarkı Ayrıntıları

Temel yol: `/content/songDetails`

Şarkı ayrıntıları genel niteliktedir (kilise bazlı değildir). Kiliseler arasında paylaşılan standart şarkı meta verilerini temsil ederler.

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimlik ile bir şarkı ayrıntısı alır (genel) |
| GET | `/` | JWT | — | Kilise için şarkı ayrıntılarını listeler |
| POST | `/create` | JWT | — | PraiseCharts kimliğinden bir şarkı ayrıntısı oluşturur (zaten oluşturulmuşsa mevcut olanı döndürür). Meta verileri PraiseCharts ve MusicBrainz'den otomatik alır |
| POST | `/` | JWT | — | Şarkı ayrıntılarını oluşturur veya günceller (toplu) |

## Şarkı Ayrıntı Bağlantıları

Temel yol: `/content/songDetailLinks`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimlik ile bir şarkı ayrıntı bağlantısı alır |
| GET | `/songDetail/:songDetailId` | JWT | — | Bir şarkı ayrıntısının tüm bağlantılarını alır |
| POST | `/` | JWT | — | Şarkı ayrıntı bağlantılarını oluşturur veya günceller (toplu). Bağlıysa MusicBrainz verilerini otomatik alır |
| DELETE | `/:id` | JWT | — | Bir şarkı ayrıntı bağlantısını siler |

## Düzenlemeler

Temel yol: `/content/arrangements`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimlik ile bir düzenleme alır |
| GET | `/song/:songId` | JWT | Content.Edit | Bir şarkının düzenlemelerini alır |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Bir şarkı ayrıntısının düzenlemelerini alır |
| GET | `/` | JWT | Content.Edit | Tüm düzenlemeleri listeler |
| POST | `/` | JWT | Content.Edit | Düzenlemeleri oluşturur veya günceller (toplu) |
| POST | `/freeShow/missing` | JWT | — | Kilisede bulunmayan FreeShow kimliklerini bulur. Gövde: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Bir düzenlemeyi siler (tonlarını da siler; hiç düzenleme kalmazsa şarkıyı siler) |

## Düzenleme Tonları

Temel yol: `/content/arrangementKeys`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/presenter/:churchId/:id` | Herkese açık | — | Sunucu görünümü için tam şarkı verisiyle birlikte düzenleme tonunu alır |
| GET | `/:id` | JWT | — | Kimlik ile bir düzenleme tonu alır |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Bir düzenlemenin tonlarını alır |
| GET | `/` | JWT | Content.Edit | Tüm düzenleme tonlarını listeler |
| POST | `/` | JWT | Content.Edit | Düzenleme tonlarını oluşturur veya günceller (toplu) |
| DELETE | `/:id` | JWT | Content.Edit | Bir düzenleme tonunu siler |

## Ayarlar

Temel yol: `/content/settings`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/my` | JWT | — | Geçerli kullanıcının ayarlarını alır |
| GET | `/` | JWT | Settings.Edit | Kilise için tüm ayarları alır |
| GET | `/public/:churchId` | Herkese açık | — | Bir kilise için herkese açık ayarları alır (anahtar-değer çiftleri olarak döndürülür) |
| POST | `/my` | JWT | — | Kullanıcı düzeyi ayarları kaydeder (base64 görsel yüklemeyi destekler) |
| POST | `/` | JWT | Settings.Edit | Kilise düzeyi ayarları kaydeder (base64 görsel yüklemeyi destekler) |
| DELETE | `/my/:id` | JWT | — | Bir kullanıcı ayarını siler |

## Önizleme

Temel yol: `/content/preview`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/data/:key` | Herkese açık | — | Alt alan adı anahtarıyla bir kilise için yayın önizleme verilerini yükler (sekmeler, bağlantılar, hizmetler, vaazlar) |

## Galeri (Stok Fotoğraflar)

Temel yol: `/content/stock`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| POST | `/search` | Herkese açık | — | Pexels stok fotoğraflarında arama yapar. Gövde: `{ term: "church" }` |

## PraiseCharts

Temel yol: `/content/praiseCharts`

İbadet şarkısı keşfi ve nota indirmeleri için PraiseCharts ile entegrasyon.

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/raw/:id` | JWT | — | Bir şarkı için ham PraiseCharts verisini alır |
| GET | `/hasAccount` | JWT | — | Kullanıcının bağlı bir PraiseCharts hesabı olup olmadığını denetler |
| GET | `/search?q=` | JWT | — | PraiseCharts kataloğunda arama yapar |
| GET | `/products/:id?keys=` | JWT | — | Bir şarkının ürünlerini alır (kimliği doğrulanmışsa kitaplıktan, değilse kataloktan) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Kitaplıktan ham düzenleme verisini alır |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts'tan bir dosya indirir (PDF veya ZIP). `{ redirectUrl }` döndürür |
| GET | `/authUrl?returnUrl=` | Herkese açık | — | PraiseCharts için OAuth yetkilendirme URL'si alır |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth doğrulayıcısını erişim belirteci ile takas eder ve kullanıcı ayarlarına kaydeder |
| GET | `/library` | JWT | — | Kullanıcının PraiseCharts kitaplığına göz atar |

## Destek

Temel yol: `/content/support`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|-------------|
| POST | `/createAudio` | Herkese açık | — | SSML'yi AWS Polly ile MP3 sesine dönüştürür. Gövde: `{ ssml: "<speak>...</speak>" }` |

## İlgili Sayfalar

- [Web Sitesi Oluşturucu Mimarisi](../../architecture/website-builder) -- Sayfaların, bölümlerin, öğelerin, yazıların ve yönlendirmelerin uygulamalar arasında nasıl bir araya geldiği
- [Üyelik Uç Noktaları](./membership) -- Kişiler, kiliseler, gruplar, roller, izinler
- [Yoklama Uç Noktaları](./attendance) -- Hizmet ve ziyaret takibi
- [Kimlik Doğrulama ve İzinler](./authentication) -- Giriş akışı, JWT, izin modeli
- [Modül Yapısı](../module-structure) -- Kod organizasyon kalıpları

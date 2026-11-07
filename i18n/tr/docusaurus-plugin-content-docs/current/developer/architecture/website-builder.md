---
title: "Web Sitesi Oluşturucu Mimarisi"
description: "B1 web sitesi oluşturucu haritası: içerik ağacı, ortak öğe kataloğu, işleme hattı ve B1 Admin ile B1.church'te yapay zekâ ile sayfa üretimi."
---

# Web Sitesi Oluşturucu Mimarisi

<div class="article-intro">

B1App tarafından sunulan her kilise web sitesi, ContentApi'de saklanan ve B1Admin'de görsel olarak düzenlenen bir içerik ağacından (sayfalar, bölümler, öğeler) oluşturulur. Tek bir paylaşılan bileşen kütüphanesi hem düzenleyici önizlemesini hem de canlı siteyi işler. Tek bir öğe türü kataloğu, bir sayfada neyin görünebileceğini tanımlar. Ayrı bir yapay zeka hizmeti ise bu ağacı oluşturabilir veya yeniden yazabilir. Bu sayfa tüm yapıyı özetler: `@churchapps/helpers` içindeki öğe sözleşmesi, işleme hattı, kilise verisi öğeleri, site geneli bileşenler, blog katmanı, erişim kısıtlamalı sayfalar, SEO, yapay zeka üretimi ve konuşmalı formlar.

</div>

## Genel Bakış

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Yığın boyunca üç kural geçerlidir:

1. **Tek ağaç, iki işleyici.** Bir sayfa, her düğümün ayarlarını bir `answers` JSON bloğu olarak taşıdığı bir `pages → sections → elements` ağacıdır. Aynı apphelper bileşenleri, B1Admin'deki sürükle-bırak düzenleyiciyi ve B1App'teki sunucu tarafında işlenen herkese açık siteyi oluşturur. Ayrı bir "yayın formatı" yoktur.
2. **Sözleşme `@churchapps/helpers` içinde yaşar.** `ElementTypes.ts`, öğe türlerinin tek kataloğudur. İşleyiciler, apphelper içindeki bir kayıt defteri üzerinden çözümlenir ve düzenleyici formları B1Admin'de bulunur. Yeni bir öğe türü eklemek, bu üç yerin de bu sırayla değiştirilmesi anlamına gelir.
3. **Herkese açık site anonim uç noktaları okur.** B1App'in ihtiyaç duyduğu her şey (sayfa ağacı, ayarlar, blog yazıları, yönlendirmeler ve diğer modüllerdeki kilise verisi uç noktaları) herkese açıktır. Kimlik doğrulama isteğe bağlıdır. Anonim ağaç uç noktasındaki bir JWT yalnızca üyelere özel sayfaların kilidini açar, başka hiçbir şey değişmez.

## İçerik ağacı

İçerik modülü (`Api/src/modules/content`), oluşturucunun verisine sahiptir:

| Tablo | Görevi |
|-------|--------|
| `pages` | URL başına bir sayfa: `url`, `title`, `layout`, ayrıca erişim kısıtlaması için `visibility`/`groupIds` ve SEO için `metaDescription` |
| `sections` | Bir sayfadaki (veya bir blokta) yatay bantlar: arka plan, metin rengi ve stil bilgisini ile `dividerTop`/`dividerBottom` şekil ayırıcı yapılandırmalarını taşıyan bir `answersJSON` |
| `elements` | Bir bölüm içindeki içerik parçaları: `elementType` + `answersJSON`. Düzen türleri (satır/sütun, karusel) için iç içe yerleştirilebilir |
| `blocks` | Sayfalar arasında paylaşılan, yeniden kullanılabilir bölüm ve öğe grupları (altbilgi blokları, öğe blokları) |
| `posts` | Bağımsız blog yazıları (bkz. [Blog](#blog)) |
| `redirects` | Kilise başına `fromPath → toPath` çiftleri, 200 ile sınırlı (bkz. [SEO](#seo-and-discoverability)) |
| `settings` | Anahtar-değer kilise ayarları. `public` işaretli satırlar anonim olarak sunulur ve widget ile analitik yapılandırmasını taşır |

Tek bir URL'nin tüm ağacı tek bir anonim çağrıyla geri döner: `GET /content/pages/:churchId/tree?url=/about`. B1App, sunucu tarafında bu ağacı işler. Düzenleyici istekleri bunun yerine kimliğe göre getirir ve dahili kimlikleri korur.

## Öğe sözleşmesi

### Katalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts`, her öğe türünü bir `ElementTypeDefinition` olarak tanımlar: `elementType`, `label`, `category`, `schemaVersion`, `defaults` ve yanıtları için JSON şeması benzeri bir `answersSchema`. `validateElementAnswers()` bilerek hoşgörülüdür. Bilinmeyen türler ve fazla anahtarlar geçer, böylece eski içerik bir katalog güncellemesinde bozulmaz. **Bugün 35 tür sunulmaktadır:**

| Kategori | Öğe türleri |
|----------|-------------|
| düzen (6) | row, column, box, carousel, whiteSpace, block |
| içerik (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| medya (4) | image, gallery, video, map |
| kilise (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| gelişmiş (2) | rawHTML, iframe |

`sermons` öğesi, kilise türleri arasında en yapılandırılabilir olanıdır. Bir `layout` yanıtı `browse` (eski tam kapsamlı tarayıcı), `grid`, `list` veya `featuredLatest` seçer. `playlistId`, `itemCount`, `showTitles` ve `showDates` ise browse dışındaki düzenleri inceltir.

`rawHTML` öğesinin iki yanıtı vardır: `rawHTML` (işaretleme) ve `javascript`. `innerHTML` ile eklenen betikler asla çalışmaz. Bu yüzden `RawHTMLElement`, işaretlemedeki her `<script>` düğümünü yeni bir öğe olarak yeniden oluşturur. Ayrıştırıcı tarafından eklenmeyen bu düğümler, CSP'nin `strict-dynamic` kuralı altında güvenilir kabul edilir. `<` ile başlayan bir `javascript` yanıtı (`<script>` etiketleriyle birlikte yapıştırılmış bir satıcı kod parçacığı) işaretleme olarak ayrıştırılır ve aynı işleme tabi tutulur. Aksi halde düz bir satır içi betik olarak çalışır. B1Admin, JavaScript kutusundaki çıplak bir URL'yi işaretler, çünkü tek başına bir URL işlevsiz bir betik olarak çalışır. `map` öğesi hiçbir şey işlemez ve bir Google Maps API anahtarı yapılandırılmamışsa Google Maps betiğini yüklemez.

### İşleyiciler (`@churchapps/apphelper`)

İşleyiciler `Packages/apphelper/src/website/components/elementTypes/` içinde bulunur. Her tür için bir bileşen vardır ve `ElementRegistry.ts` üzerinden çözümlenirler. Bu, iki katmanlı bir eşlemedir: `Element.tsx` 35 türün tümü için varsayılan işleyiciyi kaydeder (`registerDefaultElementRenderer`) ve bir ana uygulama, paketi çatallamadan bunların herhangi birini çalışma zamanında geçersiz kılabilir (`registerElementRenderer`).

### Düzenleyici formları (B1Admin)

Düzenleyicinin tür başına ayar formları `B1Admin/src/site/admin/elements/` içinde bulunur. `ElementEdit.tsx`, özel bir bileşene (`GalleryEdit`, `TestimonialEdit`, `StatsEdit` gibi) veya her tür için satır içi bir alan oluşturucuya yönlendirir. Bu kataloğun yapay zekaya dönük yansıması, API'nin MCP `describe_page_builder` aracıdır (bkz. [MCP Sunucusu](../api/mcp.md)).

Düzenleyici önizlemesi, canlı sitenin `Theme` bileşenini bağlar. Bu bileşen, kilisenin genel stillerinden `--headingFont` ve `--bodyFont` CSS değişkenlerini ayarlar. B1App bu değişkenleri `pages.css` aracılığıyla uygular, B1Admin ise bunu içe aktaramaz. Bu yüzden `ContentEditor.tsx`, bunları `.page` gövde metnine ve `h1`–`h6` başlıklarına uygulamak için `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) değerini enjekte eder. Bu olmadan önizleme, başlıkları yönetici yazı tipiyle gösteriyordu.

### Bölüm şekil ayırıcıları

Bölümler, her iki kenarında dekoratif şekil ayırıcılar taşıyabilir. Yapılandırma, bölümün `answersJSON` içinde `dividerTop` ve `dividerBottom` nesneleri olarak bulunur: `{ shape, color, height, flip }`. Burada `shape` şunlardan biridir: `wave, waves, slant, curve, triangle, peaks`. Apphelper, `SectionDivider` bileşenini ve `parseDividerConfig()` yardımcısını sağlar. Her iki uygulamanın Section işleyicileri (`B1App/src/components/Section.tsx` ve `B1Admin/src/site/admin/Section.tsx`) yanıtları ayrıştırır ve ayırıcıyı bağlar. B1Admin'deki `SectionEdit.tsx` ise seçici arayüzü sağlar. Paketler yalnızca yapı taşını sunar. Bölüm düzeyindeki bağlantı, kullanan uygulamaların işidir.

## Kilise verisi öğeleri

Üç öğe türü, yazılmış içerik yerine canlı kilise verisini işler. Modül yalıtımı geçerlidir. Her biri, sahibi olan modülün kendi herkese açık uç noktasını tarayıcıdan çağırır:

| Öğe | Uç nokta | Notlar |
|-----|----------|--------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | `{ fundId, totalAmount, donationCount }` döndürür, isteğe bağlı `?startDate=&endDate=` penceresiyle. Öğe bunu `goalAmount` yanıtıyla karşılaştırır |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Yalnızca katılım:** Grubun `publicRoster` ayarının açık olması gerekir (varsayılan kapalı). Projeksiyon bilerek minimaldir: `personId`, `displayName`, `leader` ve fotoğraf. İletişim veya demografik alan yoktur |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Kampüs → ibadet → saat ağacını döndürür. apphelper işleyicisi bundan en iyi çaba ile schema.org `Event` JSON-LD üretir (API düz veri döndürür) |

:::warning
`publicRoster`, `staffGrid` için gizlilik kapısıdır. Herkese açık grup üyesi projeksiyonunu asla genişletmeyin ve bayrağı atlamayın. Roster uç noktası tasarım gereği anonimdir ve minimal alan listesi güvenlik özelliğidir.
:::

### Takvim öğesi ve etkinlik sayfaları

`calendar` öğesinin yanıtları şunlardır: `calendarType` (`group` veya `curated`), `calendarId`, `display` (varsayılan `month` veya `upcoming`) ve `tag`. B1App, `src/components/Element.tsx` içinde `registerElementRenderer("calendar", …)` ile apphelper işleyicisini geçersiz kılar:

- **`display: "upcoming"`** B1App'in `UpcomingEventsElement` bileşenini işler. Bu bileşen `GET /content/events/public/group/:churchId/:groupId` veya `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId` uç noktasını yükler, tekrarları `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, yılda etkinlik başına bir oluşum) ile genişletir ve ilk 12'sini fotoğraflı kutucuklar olarak gösterir. Fotoğraf yoksa başlık, temanın koyu renginde gösterilir. Kutucuklar `/events/{id}` adresine bağlanır ve takvimin ICS beslemesi için bir Abone Ol menüsü içerir.
- **`display: "month"`** apphelper'ın `CalendarElement` bileşenini bir `eventUrl` geri çağrımıyla işler. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` bileşenleri, tıklandığında ayrıntı penceresini açmak yerine bu URL'ye gider. B1Admin `eventUrl` geçmez, bu yüzden yönetici takvimi pencereyi korur.
- **`tag`**, her iki görünümü `EventHelper.hasTag()` (`@churchapps/helpers`) ile filtreler. Virgülle ayrılmış `events.tags` alanıyla büyük/küçük harf duyarsız eşleşme yapılır. Boşsa her şey gösterilir. Küratörlü takvim birleşimi, küratörlü etkinliklerin bu etiketleri taşıması için `e.tags` alanını seçer.

Küratörlü etkinlikler `realEventId` (`eventPageId()`) ile bağlanır, böylece URL her zaman temel etkinliğin adını taşır. `/{sdSlug}/events/[eventId]` ayrılmış bir rotadır (oluşturucu hattı değil). Bu rota `GET /content/events/public/:churchId/:id` uç noktasını yükler. Bu uç nokta, onay bekleyen veya reddedilmiş etkinlikler ile kayıtsız özel etkinlikler için `null` döndürür. Ayrıca reddedilmemiş oda rezervasyonlarından `roomNames` ekler. Rota, `EventPageContent` bileşenini işler: fotoğraf kahramanı, markdown açıklaması, Ne Zaman/Nerede kenar çubuğu, `registrationEnabled` olduğunda **Bu Etkinlik için Kaydol** düğmesi ve `GET /content/events/public/:churchId/:id/ical` uç noktasına bağlanan **Takvimime ekle** bağlantısı. Fotoğrafı Open Graph görseli olarak kullanır ve `EventPageJsonLd` aracılığıyla bir sonraki oluşum için `Event` JSON-LD üretir. Bilinmeyen veya gizli bir etkinlik gerçek bir 404 döndürür.

## Site geneli bileşenler

İki bileşen, ağacın içinde değil her herkese açık sayfada işlenir: **AnnouncementBanner** (kapatılabilir sayfa üstü çubuk) ve **Launcher** (ver, ziyaret et veya izle tarzı bağlantılar için yüzen eylem merkezi). Her iki bileşen ve bunların `parse*Config()` yardımcıları apphelper içinde gelir. Yapılandırma, `announcementBanner` ve `launcher` anahtarlarıyla iki herkese açık ayar satırıdır. Bu satırları B1Admin'in `SiteWidgetsEdit` bileşeni (Görünüm sayfasında) yazar ve B1App'in herkese açık düzeni `GET /content/settings/public/:churchId` üzerinden okur. API bunları opak anahtar-değer çiftleri olarak ele alır. Anahtar adları iki uygulama arasındaki bir kuraldır.

## Blog

Blog, oluşturucu sayfalarının üzerinde bir katman değil, bağımsız bir içerik türüdür. Bir `posts` satırı tüm yazıyı tutar: `title`, `slug`, `excerpt`, `content` (markdown gövdesi), `authorId`, `photoUrl`, `publishDate`, `category` ve `tags`. Herkese açık yüzey (hepsi anonim, `PostController`) şunlardan oluşur:

| Rota | Amacı |
|------|-------|
| `GET /content/posts/public/:churchId` | Yayınlanmış yazılar. `?category=&tag=` ile filtrelenebilir ve sayfalıdır |
| `GET /content/posts/public/:churchId/categories` | Yayınlanmış yazılar arasındaki farklı kategoriler |
| `GET /content/posts/public/:churchId/slug/:slug` | Tek bir yayınlanmış yazı |
| `GET /content/posts/rss/:churchId?siteUrl=` | RSS 2.0 beslemesi. Kilise adıyla başlıklandırılır ve öğe başına kategori ile özet veya içerik açıklaması içerir |

Bir yazı, `publishDate` ayarlandığında ve geçmişte kaldığında "yayınlanmış" sayılır. Gelecekteki bir `publishDate`, zamanlanmış bir yazıdır. Bu yazılar herkese gizlidir ve yönetici panelinde Zamanlandı etiketiyle gösterilir. Okuma uç noktaları her yazıyı `authorName` ile zenginleştirir. Bu ad, `authorId` üzerinden membership modülü ağ geçidiyle çözümlenir. Eksik özetler, liste kartlarında, meta açıklamalarında ve RSS'te markdown'dan arındırılmış içeriğe (yaklaşık 160 karakter) geri döner.

B1App, `/{sdSlug}/blog` adresini bir editoryal liste olarak sunar. Bu listede filtrelendiğinde etkin kategori veya etiket adına dönüşen ortalanmış bir başlık, kategori çipi filtre satırı ve sol tarafta küçük resimli, yazar bilgisi ve özetli yazı satırları bulunur. RSS beslemesi alternatif bağlantı olarak duyurulur. `/{sdSlug}/blog/[postSlug]` adresi ise ayrılmış bir rotadır (Zone/Section hattı değil). Ortalanmış bir başlığa (kategori başlangıcı, başlık, yazar bilgisi ve birincil renk vurgu çizgisi) sahiptir. Konteyner genişliğinde 16:9 bir kahraman görseli ve yaklaşık 720 piksellik bir okuma sütununda markdown gövdesi içerir. Makale altbilgisinde etiket çipleri, `"{category} kategorisinden daha fazla"` başlıklı ilgili yazılar şeridi ve yazarı içeren `BlogPosting` JSON-LD bulunur. Her iki sayfa da tamamen tema belirteçlerinden stil alır, böylece her kilisenin renk paletini devralır. Blog URL'leri kilise başına site haritasına dahildir.

B1Admin'in yazım arayüzü (**Site → Blog**) yazıları bir pencerede düzenler. Pencerede önizleme anahtarlı markdown düzenleyici, 16:9 kırpmalı galeri görsel seçici, yazar kişi seçici (varsayılan olarak düzenleyen kullanıcı), mevcut kategorilerden beslenen kategori otomatik tamamlama, yinelenen slug doğrulaması ve bir yayınlama anahtarı bulunur. Yayınlanmış satırlar canlı yazıya bağlanır ve sayfa, yöneticileri bir `/blog` gezinme bağlantısı eklemeye yönlendirir.

Yorumlar üçüncü taraf hizmetlere bırakılmıştır. Kilise genelinde herkese açık bir içerik ayarı olan `blogFooterHtml`, her yazının altında B1App'in `BlogFooterEmbed` bileşeniyle işlenir. Bu ayar, Blog sayfasındaki **Her Yazının Altında** bölümünde düzenlenir ve yalnızca Ayarlar → Düzenle ile görünür. `BlogFooterEmbed`, `<script>` etiketlerini yeniden oluşturur, böylece bunlar `'strict-dynamic'` altında çalışır. Betikleri sırayla çalıştırır: bir harici `src`, bir sonraki satır içi betikten önce yüklenmeyi tamamlar. Bu gereklidir, çünkü satıcı kodu parçacıkları önce bir kütüphaneyi yükler ve sonra onu çağırır.

## Yalnızca üyelere açık sayfalar

`pages.visibility`, gezinme bağlantılarının enum'unu yeniden kullanır: `everyone` (varsayılan), `visitors`, `members`, `staff`, `team` ve `groups` (`groupIds` ile). Ancak bu bir gezinme filtresi değil, **sert bir erişim kapısıdır** (`PageVisibilityHelper.canViewPage`). Akış şöyledir:

1. Anonim ağaç uç noktası, URL tabanlı getirmelerde görünürlüğü denetler. Kısıtlı bir sayfanın anonim çağıranları içerik yerine `{ restricted: true, visibility }` alır. Ağaç asla sızdırmaz.
2. Uç nokta yine de bir JWT'yi kabul eder. `CustomAuthProvider`, anonim rotalar dahil **her** istekte `Authorization` başlığını doğrular. Bu yüzden kimliği doğrulanmış bir üyenin aynı URL'yi getirmesi normal şekilde çözülür.
3. B1App, `restricted` yanıtında `RestrictedPage` bileşenini işler. Bu bileşen oturumu saklanan kimlik bilgilerinden yeniden kurar, ağacı JWT ile yeniden getirir ve işler. Oturum yoksa `returnUrl` ile bir giriş kapısı gösterir.

:::info
Kapının ayrıntı düzeyi seviyeye göre değişir. `groups`, belirteçteki `groupIds` değerini sayfanın listesiyle karşılaştırır. `staff` ise `membershipStatus` değerini denetler. Ancak `members` ve `team` şu anda kilisenin herhangi bir kimliği doğrulanmış kullanıcısını geçirir. `groups` seçeneğini katı seçenek olarak değerlendirin.
:::

## SEO ve keşfedilebilirlik

Bunların tümü ContentApi verisi üzerinde B1App tarafında yapılan işlemedir. API depolar, uygulama üretir:

| Konu | Nasıl çalışır |
|------|---------------|
| Meta açıklamaları | `pages.metaDescription` (≤300 karakter), `MetaHelper.getMetaData()` aracılığıyla oluşturucuyla işlenen her rotada Next.js `Metadata` (description ve Open Graph) içine akar. B1Admin'in sayfa ayarları, aşağıda açıklanan bir yapay zeka "Oluştur" düğmesi içerir |
| Yönlendirmeler | `/content/redirects` adresinde yönetilen kilise başına `redirects` satırları (`content.edit`, 200 satır sınırı, normalleştirilmiş yollar). Olası bir 404'te B1App'in sayfa rotası yolu `GET /content/redirects/public/:churchId` ile çözer ve Next'in `permanentRedirect` fonksiyonu üzerinden HTTP 308 üretir. Eşleşmeyen yollar `notFound()` fonksiyonuna düşer |
| Markalı 404 | `not-found.tsx`, genel bir hata yerine kilisenin logosu, adı ve temasıyla `BrandedNotFound` bileşenini işler. Bilinmeyen `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]` ve `/volunteer/[planId]` yolları gerçek bir 404 döndürür. Bilinmeyen alt alan adları ve hatalı sayfa slug'ları da öyledir (bkz. [Web Sitesi Yönlendirme ve Çoklu Site](./websites.md)) |
| Yapılandırılmış veri | Blog yazılarında `BlogPosting` JSON-LD. Her vaaz sayfasında (`/{sdSlug}/sermons/[sermonId]`) ve bir `sermons` öğesi içeren sayfalarda `VideoObject`. Oluşturucu sayfalarındaki takvim/etkinlik öğelerinden ve her `/{sdSlug}/events/[eventId]` sayfasında `Event` (bir sonraki oluşum, `image` olarak etkinlik fotoğrafı ile). `serviceTimes` öğesinden schema.org `Event` |
| Vaaz sayfaları | Her herkese açık vaaz, tam meta verisiyle taranabilir bir sayfa alır: `/sermons/[sermonId]`. Vaazlar artık istemci tarafındaki tarayıcı öğesinin içinde kilitli değildir |
| Analitik | `ga4MeasurementId` herkese açık ayar anahtarı (B1Admin'de yönlendirmelerin yanında yönetilir), `next/script` aracılığıyla kilise başına bir GA4 gtag enjekte eder. B1 uygulaması (`/{sdSlug}/mobile`), geçerli bir `G-` kimliği olduğunda sayfa görüntülemelerini ChurchApps'in kendi etiketinin yanında bu kimliğe de gönderir. GTM kapsayıcı kimlikleri yalnızca web sitesinde kalır. Her `gtag('config')`, `navigator.standalone` veya `(display-mode: standalone)` medya sorgusuna göre `installed` ya da `browser` değerinde bir `display_mode` taşır (`B1App/src/helpers/mobileAnalytics.ts`) |
| Site haritası ve beslemeler | Kilise başına `sitemap.xml` rotası, oluşturucu sayfalarını, blog URL'lerini ve en son 50 vaaz sayfasını içerir. Her vaazın `<lastmod>` değeri yayın tarihinden gelir. İçeriği olduğunda (herkese açık gruplar, gönüllü planları) yerleşik `/sermons`, `/groups` ve `/volunteer` sayfalarını da listeler. Kaydedilmiş bir yönlendirme o yolun yerini almadıkça bu böyledir. Kilisenin ana sayfası yoksa `/` dışarıda bırakılır, çünkü `/` o zaman izin verilmeyen `/mobile` adresine yönlendirilir. Blog listesi RSS beslemesini duyurur |
| Erişilebilirlik | Herkese açık sayfa yapısı, her düzen sarmalayıcısında `<main id="main-content">` yer işaretine hedeflenen bir atlama bağlantısı işler |

## Yapay zeka üretimi (AskApi)

Sayfa ve site üretimi, `/website` denetleyicisi altında ayrı bir hizmet olan **AskApi** içinde çalışır. Diğer her şeyle aynı `CustomAuthProvider` JWT'sini kullanarak kimlik doğrulaması yapar ve içerik açısından **durumsuzdur**. Her uç nokta JSON döndürür ve çağıran (B1Admin) sonucu ContentApi üzerinden kalıcı hale getirir. `POST /content/pages/importTree`, tam iç içe bölüm ve öğe ağacıyla bir sayfayı tek çağrıda oluşturur. Her zaman çağıranın kilisesi altına ekler ve gövdedeki kimlikleri yok sayar.

### Sayfa üretimi (`planPage` → `writePage`)

B1Admin'in `AddPageModal` içindeki "AI" sayfa şablonu, tek bir kurala dayanan düşük maliyetli bir hat kullanır (`AskApi/src/helpers/SiteGenHelper.ts`): **hiçbir model oluşturucu JSON'u üretmez**. İki model işi Vercel AI Gateway üzerinden böler (düz HTTP, SSM anahtarı `/{env}/aiGatewayApiKey` veya `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`): Seçenekleri, puanları ve olasılıklı doğru/yanlış değerlerini döndüren tipli bir karar modelidir, ama metin yazamaz. Sabit bir şablon kütüphanesinden her bölümü sırayla seçer, düzenleri puanlar, metni doğrular ve stok fotoğrafları ile simgeleri seçer. Girdi maliyeti milyon token başına yaklaşık 0,04 dolardır ve çıktı ücretsizdir. Bu yüzden sayfa başına yaklaşık 90 çağrı, birkaç sentin çok küçük bir kısmına mal olur.
- **Küçük bir sohbet modeli (varsayılan olarak GPT-4.1 mini)**: Seçilen şablonların adlandırılmış, uzunluğu sınırlı metin yuvalarını doldurur. Yazar tek bir sabittir ve `SITEGEN_COPY_MODEL` ortam değişkeniyle geçersiz kılınabilir. Bu değişken, ağ geçidindeki herhangi bir sohbet modeli kimliği olabilir (örneğin `anthropic/claude-haiku-4.5`). Üç kilise üzerinde yapılan kör bir yan yana karşılaştırmada Claude Haiku 4.5 biraz daha sıcak okundu. Ancak GPT-4.1 mini yakındı, yaklaşık 4 kat daha ucuz ve daha hızlıydı. Bu yüzden varsayılan odur. Üç düzenin tümü olan tam bir sayfa yaklaşık 1,3 sente mal olur ve bunun yaklaşık yüzde 80'i yazara aittir.

| Aşama | Uç nokta | Ne olur |
|-------|----------|---------|
| 1 | `POST /website/planPage` | Sayfa türünü sınıflandırır (ana sayfa, ziyaret, hakkında…). Ardından JEV'in tur başına olasılıklarından 10 aday düzen örnekler (kahraman + bölüm sayısı → her bölüm → kapanış), yinelenenleri ayıklar ve JEV'in her birini uyum, akış ve boşluklar açısından puanlamasını sağlar. İlk 3'ü, bir yazım sesi ve bir `suggestedStyle` (palet ve yazı tipleri) ile döndürür. Şimdiye kadar aynı bölümleri paylaşan adaylar JEV'e aynı soruyu sorar, bu yüzden turlar önek bazında ezberlenir. 6'nın altındaki en iyi puan `lowLayoutScore` olarak kaydedilir. Bu günlük, eklenmeye değer şablonların birikimidir. Yaklaşık 2 sn |
| 2 | `POST /website/writePage` (aday başına bir çağrı) | Yazar, çağrı başına iki bölüm olacak şekilde paralel olarak yuva metnini doldurur ve JEV'in seçtiği beş kahraman başlığı döndürür. JEV her bölümü doğrular. Başarısız olan, bir kalıp ifade kullanan veya önceki bir bölümü yeniden anlatan bölümler (kodda denetlenen paylaşılan 4 kelimelik dizgiler) belirli nedenle paralel olarak yeniden yazılır. Bir kod temizliği, stok kilise sitesi ifadeleri içeren cümleleri atar. Kilisenin kendi açıklaması bu ifadeleri kullanmadıkça böyle olur. JEV fotoğraf konularını, simgeleri ve kahramanın şekil ayırıcısını seçer ve sonucu puanlar. Kaydetmeye hazır bir bölüm ağacı ve bir puan döndürür. Yaklaşık 6–9 sn |
| 3 | `POST /content/pages/importTree` | B1Admin yalnızca en iyi sıralanan düzeni yazar. Yazma başarısız olursa ikinci sıradaki düzen yedek olarak kullanılır. Düzeni kaydeder ve önizlemeyi açar (Kaydet'ten sonra yaklaşık 10 sn) |

Her aşama kendi isteğidir, böylece her çağrı API Gateway'in 29 saniyelik sınırı içinde kalır. `SiteGenHelper.buildTree` içindeki şablonlar, katalogdan gelen sabit bölüm ve öğe ağaçlarıdır (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`). Tema belirteçlerine (`var(--accent)`, `var(--lightAccent)` gibi) başvurur, böylece üretilen sayfalar kilisenin mevcut görünüm ayarlarını devralır. Bir bölüm şablonu eklemek, yuva listesini `SECTIONS` içine ve ağacını `buildTree` içine eklemek anlamına gelir. Birim testi her şablonu gezer ve ağacı doğrular.

**Girdiler.** Metin yalnızca iki kaynaktan gelen gerçekleri belirtebilir: kullanıcının yazdıkları ve `churchContext.facts`. İkincisi, B1Admin'in planlamadan önce topladığı kayıtlardır (herkese açık ibadet saatleri ve herkese açık grup adları, ayrıca kilise adı ve adresi). Aynı bayraklar veriye dayalı şablonları kapılandırır. `times`, kilise ibadet saatlerini B1'de tutuyorsa canlı `serviceTimes` öğesini işler. Aksi halde yazılmış bir tablo kullanılır. `groups` ve `countdown` yalnızca arkalarında veri olduğunda sunulur. JEV çağrıları temkinlidir: bir yinelenen 1,5 saniye sonra tetiklenir ve ilk yanıt kazanır. Bunun nedeni, ağ geçidinin ara sıra takılması ve çağrıların neredeyse ücretsiz olmasıdır.

**Konuda kalmak.** Kullanıcının istemi, kilise hakkında bir arka plan değil, *sayfanın konusudur*. `planPage` isteği sınıflandırır (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). `event` ve `topic` sayfaları için genel kilise şablonları (papaz notu, vaazlar, hizmetler, gruplar, toplum etkisi, haftalık saatler ve geri sayım, video kahramanı) hiç sunulmaz. Bunun yerine `details` (ne zaman, nerede, neyi getirmeli) ve bir tarih `eventCountdown` sunulur. Her iki hakem de konu uygunluğunu puanlar. B1Admin, planlamadan gelen `pageType` değerini her `writePage` çağrısına iletir.

**Kısa isteklerden tam sayfalar.** Sayfalarda üç ila altı orta bölüm, cömert yuva uzunlukları, kart bölümlerinde bir giriş satırı ve beş soruluk bir SSS bulunur. Onarım geçişi, ince gelen herhangi bir bölümü genişletir. Üretim tek tıklamadır ve takip soruları yoktur. İstek, eksiksiz bir sayfanın ihtiyaç duyduğu sıradan bir ayrıntıyı bırakırsa (başlangıç saati, bir oda, neyi getirmeli, nasıl kaydolunur), yazar kilisenin düzenlemesi için makul ve mütevazı bir seçim ekler. Bölümler paralel yazıldığı için bu boşluklar **bir kez** karara bağlanır. Bu karar `planPage` içinde verilir (`assumedDetails`, düzen örneklemesiyle birlikte çalışan küçük bir yazar çağrısı) ve `churchContext.assumedDetails` aracılığıyla her `writePage` çağrısına geri iletilir. Böylece bir bölüm 5:00 derken diğeri 5:30 diyemez. JEV, isteğe, kilisenin kayıtlarına veya bu karara bağlanmış ayrıntılara aykırı herhangi bir bölümü onarır. Karara bağlanan ayrıntılar arayüzde gösterilmez. Kilise sayfayı herhangi bir sayfa gibi gözden geçirir ve düzenler. Bazı şeyler asla uydurulmaz: kişilerin adları, telefon numaraları, e-posta ve web adresleri, fiyatlar, istatistikler, kilisenin tarihi, kişilere atfedilen alıntılar ve isteğin bir gün vermediği bir tarih için haftanın günü.

**Görseller.** Şablonlar fotoğraflarını veya simgelerini asla adlandırmaz. Yuvaları açık bırakırlar. Tek bir genel geçiş (`SiteGenHelper` içindeki `visualSlots` → `pickVisuals` → `applyVisuals`) bitmiş ağacı gezer ve hepsini doldurur. Bu geçiş şunları kapsar: `auto:photo` ile işaretlenmiş bir bölüm arka planı veya galeri girdisi, bir `auto:icon`, kahramanın `auto:divider`'ı ve hiçbir işaret olmadan `photo` alanı boş olan her `textWithPhoto`, `card` veya `image` öğesi. JEV her birini yanındaki metinden seçer. Bir kartın fotoğrafı o kartın başlığından ve metninden, bir arka plan ise bölümün metninden seçilir. Sayfada hiçbir konu tekrarlanmaz. Dolayısıyla yeni bir şablon bedavaya fotoğraf alır. Fotoğraflar, B1Admin'in `POST /content/stock/search` üzerinden çözümlediği `pexels:<term>` yer tutucuları olarak yayılan Pexels arama konularıdır. `resolvesPhotos` göndermeyen bir istemci, bunun yerine yerleşik bir kahraman görseli, düz renkli bantlar ve fotoğrafsız kartlar alır. Bilerek portre konuları yoktur ve papaz şablonu fotoğraf taşımaz. Gerçek bir kişinin yerine bir stok yabancı asla geçmemelidir. Henüz sayfası olmayan bir kilise için B1Admin, `suggestedStyle` değerini genel stillere uygular. Mevcut siteler görünümlerini korur.

### Diğer uç noktalar

:::info
B1Admin'deki `SectionToolbar` yeniden yazma düğmesi ve sayfa listesindeki "Site Oluştur" düğmesi istemci tarafında yorum satırı olarak kalır. Aşağıdaki AskApi uç noktaları hâlâ yanıt verir. Yalnızca bu arayüz gizlidir.
:::

| Uç nokta | Amacı |
|----------|-------|
| `POST /website/generatePageOutline` → `generateSection` | Özgün iki adımlı sayfa akışı: ana hat, ardından bölüm başına bir LLM çağrısı ile öğe JSON'u. Maliyet nedeniyle B1Admin'de `planPage`/`writePage` tarafından değiştirilmiştir. API tüketicileri için tutulmuştur |
| `POST /website/generateSite` | Tüm site üretimi. **Tasarım gereği iki aşamalıdır:** `planOnly: true` çağrısı yalnızca çok sayfalı planı döndürür (tek hızlı model çağrısı). Ardından istemci tam içeriği ister. Bu, her isteği Lambda/API-Gateway zaman aşımı içinde tutar |
| `POST /website/rewriteSection` | Yapıyı koruyan yeniden yazım. Model yalnızca metin içeren yanıtları değiştirebilir. Özyinelemeli bir yapı imzası (kimlikler, türler ve sıra) önce ve sonra karşılaştırılır. Herhangi bir uyuşmazlık, bozuk yapı yerine `fallback: true` ile özgün bölümü döndürür |
| `POST /website/generateAltText` | En fazla 20 görsel URL'si üzerinde görüntü çağrısı yapar. Kısa alt metin döndürür (≤125 karakter, "photo of" önekleri kaldırılmış) |
| `POST /website/generateMetaDescription` | Sayfanın metin içeriğinden tek bir SEO meta açıklaması (≤155 karakter) üretir. B1Admin'in sayfa ayarlarındaki Oluştur düğmesine bağlıdır |

Bu uç noktaların istemleri, `AskApi/config/instructions/` altında markdown dosyalarıdır. Modelin üretildiği öğe kataloğu da bu dosyalara dahildir. İki tasarım noktası kataloğu dürüst tutar. Birincisi, istemci her istekte `availableElementTypes` gönderir. İstem yalnızca bu listedeki türleri kullanabilir. Sunucu tam kümeyi asla sabit kodlamaz. İkincisi, API'nin MCP `describe_page_builder` aracı, [MCP](../api/mcp.md) üzerinden çalışan yapay zeka ajanları için aynı rehberi taşır. Modeller OpenRouter üzerinden Anthropic Claude'dur: bölüm içeriği için 3.5 Haiku (gecikme nedeniyle), ana hatlar, site planları ve görüntü için 3.5 Sonnet. OpenRouter anahtarı yapılandırılmadığında bir OpenAI yedeği kullanılır.

## Konuşmalı formlar

Formlar (membership modülü), bağlantı kartı tarzı sayfaları hedefleyen konuşmalı bir mod kazandı. `forms` üzerindeki dört sütun bunu yönetir: `displayMode` (`standard` veya `conversational`), `autoCreatePerson`, `followUpSubject` ve `followUpBody`.

- **Görüntüleme:** `displayMode` `conversational` olduğunda apphelper'ın `FormSubmissionEdit` bileşeni, bir seferde bir soru gösteren `ConversationalForm` bileşenine geçer. B1App'in form sayfası modu iletir. Her iki durumda da gönderim yükü aynıdır.
- **Kişiyi otomatik oluşturma:** `autoCreatePerson` ayarlıyken gönderimde `ConversationalFormHelper.findOrCreatePerson`, e-postaya göre tekilleştirir (büyük/küçük harf duyarsız). Eşleşme yoksa `membershipStatus: "Guest"` ile bir hane ve kişi oluşturur, ardından gönderimi o kişiye bağlar.
- **Takip e-postası:** Bir konu ve gövde ayarlandığında gönderen, mevcut işlemsel yol (`TransactionalEmailHelper`) üzerinden şablonlu bir e-posta alır. E-posta `{firstName}` ve `{churchName}` belirteçlerini kullanır. Bu e-posta asla bildirim özeti kapısından geçmez. Her iki yan etki de öldürücü değildir: bir hata gönderimi asla kaybettirmez.

Bu dört alan bugün API üzerinden ayarlanır. B1Admin form düzenleyicisi bunları henüz göstermez.

## Herkese açık site önbelleği

B1App'in herkese açık işleme yolu, kilise etiketli getirmeleri önbelleğe alır (üretimde `next: { revalidate: 300, tags: [sdSlug] }`, geliştirmede `0`). Bu nedenle canlı bir sayfa, bir ContentApi yazımından sonra beş dakikaya kadar eski kalabilir. B1App üzerindeki `POST /api/revalidate/{sdSlug}` çağrısı `revalidateTag(sdSlug)` fonksiyonunu çağırır ve bu önbelleği erken temizlemenin tek yoludur.

İki yazıcı bu önbelleğe ulaşır:

1. **B1Admin:** `B1Admin/src/site/siteCache.ts` içindeki `clearSiteCache()`, düzenleyici kaydetmelerinden sonra POST gönderir. Etkin sitenin alt alan adını tercih eder. İkincil bir site *o* etiketi temizlemelidir, kilisenin varsayılanını değil.
2. **Api:** ContentApi dışında, yani B1Admin üzerinden yapılmayan içerik değişiklikleri (API anahtarları, MCP, yapay zeka) içerik denetleyicilerinden `SiteCacheHelper.bump(churchId)` tetikler. Yardımcı, kilisenin alt alan adını `SubDomainHelper` ile çözer ve `{b1AppRoot}/api/revalidate/{sd}` adresine POST gönderir. Hatalar yutulur, böylece erişilemeyen bir B1App bir kaydetmeyi başarısız kılamaz.

Önbelleği temizleyen denetleyiciler şunlardır: sayfalar (kaydetme, silme, çoğaltma, yayınlama, vazgeçme, yayından kaldırma, yapay zeka geçici), bölümler, öğeler, bloklar, bağlantılar, genel stiller, yazılar ve yönlendirmeler. Geliştirmede `b1AppRoot` değeri `http://{subdomain}.localtest.me:3301` olur. Demo ve üretim ortamları `https://{subdomain}.b1.church` kullanır.

## İlgili sayfalar

- [Web Sitesi Yönlendirme ve Çoklu Site](./websites.md): Bir isteğin bir kilise veya siteye nasıl çözüldüğü ve özel alan adlarının nasıl yönlendirildiği
- [İçerik Uç Noktaları](../api/endpoints/content.md): Sayfalar, bölümler, öğeler, bloklar, yazılar, yönlendirmeler ve ayarlar için tam REST yüzeyi
- [AppHelper](../shared-libraries/app-helper.md): Işleyicileri, kayıt defterini, ayırıcıları ve widget'ları içeren npm paketi
- [MCP Sunucusu](../api/mcp.md): `describe_page_builder` rehber aracı dahil
- [Sayfa Düzenleyici (son kullanıcı)](/docs/b1-admin/website/page-editor): Personele yönelik düzenleyici belgeleri

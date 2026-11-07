---
title: "Web Sitesi Yönlendirme ve Çoklu Site"
description: "B1.church'ün alt alan adlarını ve özel alan adlarını doğru kilise veya ikincil siteye nasıl eşlediğini; özel alan adlarında TLS'yi yöneten Caddy uç katmanını açıklar."
---

# Web Sitesi Yönlendirme ve Çoklu Site

<div class="article-intro">

Tek bir kilise artık birden fazla ayrı web sitesi sunabilir. Her site `*.b1.church` alt alan adında ya da tamamen özel, kiliseye ait bir alan adında yayınlanabilir. Bu sayfa, oluşturucunun *altındaki* yönlendirme katmanını açıklar: gelen bir isteğin hangi kiliseye ve hangi siteye çözümlendiği, çoklu site veri modeli (önceden var olan her sitenin değişmeden görüntülenmesini sağlayan `siteId` nöbetçi değeri) ve özel alan adı uç katmanı. Bu uç katman, EC2 üzerinde çalışan, kendi yönettiğimiz bir Caddy vekil sunucusudur. TLS'yi sonlandırır ve her kilise alan adını kendi `*.b1.church` üst kaynağına yeniden yazar. Bir istek çözümlendikten sonra neyin görüntülendiğini, yani sayfa/bölüm/öğe ağacını öğrenmek için [Web Sitesi Oluşturucu](./website-builder.md) sayfasına bakın.

</div>

## Genel Bakış

```
   grace.b1.church              www.gracechurch.org  (özel alan adı)
   (b1.church alt alan adı)               │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Caddy uç katmanı — EC2 3.23.251.61       │
          │             │             (proxy.b1.church)            │
          │             │  • TLS'yi sonlandırır (alan adına özel   │
          │             │    LE sertifikası)                       │
          │             │  • Host'u {sub}.b1.church olarak yeniden │
          │             │    yazar                                 │
          │             │  • B1App'e ters vekil olarak iletir      │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • her zaman: istemcinin gönderdiği x-site başlığını siler  │
   │    (sahteciliğe karşı koruma)                               │
   │  • dahili *.b1.church Host ⇒ domains araması etkisiz kalır  │
   │  • ham özel Host (Caddy'yi atlayarak) ⇒ arama → x-site ayarla │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → host'un ilk etiketi → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   her içerik çağrısına ?siteId= ekler:           │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  alan adı kaydetme/silme (B1Admin Ayarlar→Alan Adları → POST /membership/domains)
        └─ en iyi çaba ile CaddyHelper.updateCaddy()  (sarmalanmış, kritik olmayan, 10 sn zaman aşımı)
  Caddy alan adları tablosunu iki anonim uç nokta üzerinden doğrudan okur:
        GET /membership/domains/authorize  — isteğe bağlı TLS `ask` (bilinen 200 / bilinmeyen 404)
        GET /membership/domains/hostmap    — host→{sub}.b1.church eşlemesi (5 dakikada bir yenilenir)
```

Bu katman boyunca üç kural geçerlidir:

1. **Bir nöbetçi değer, her şeyin geriye dönük uyumlu kalmasını sağlar.** `siteId = ''` birincil sitedir. Bu özellikten önce var olan her sayfa, blok, bağlantı, genel stil ve alan adı kaydı `''` değerini taşır ve tam olarak eskisi gibi görüntülenir. *İkinci* bir web sitesi, boş olmayan bir `siteId` taşıyan kayıtlar kümesinden ibarettir. `?siteId=` olmadan çağrılan herhangi bir içerik uç noktası birincil siteyi döndürür. Bu, eski isteğin birebir aynısıdır.
2. **Yönlendirme, host etiketine dayanır ve tek noktada birleşir.** Bir `*.b1.church` alt alan adı, doğrudan host etiketiyle yönlendirilir. Özel bir alan adı ise B1App'e ulaşmadan önce Caddy uç katmanında `{sub}.b1.church` etiketine yeniden yazılır. (Ham özel bir `Host` için yedek olarak, `x-site` başlığını ayarlayan bir ara katman veritabanı araması da vardır.) Her iki yol da aynı `[sdSlug]` rotasına ve aynı `churches/lookup` çağrısına ulaşır, dolayısıyla sonraki görüntüleme aynıdır.
3. **Caddy uç katmanı, tek bir doğruluk kaynağı üzerinde durumsuz çalışır.** Özel alan adları, her alan adını `{sub}.b1.church` üst kaynağına yeniden yazan, kendi yönettiğimiz bir Caddy vekil sunucusunda sonlandırılır. Bir alan adı kaydedildiğinde tek bir en iyi çaba `CaddyHelper.updateCaddy()` çağrısı yapılır. Caddy ayrıca `domains` tablosunu doğrudan okur (aşağıdaki `authorize` ve `hostmap` uç noktaları). Tablo yetkili kaynaktır. Erişilemeyen bir Caddy hiçbir zaman kaydetme işlemini başarısız kılamaz.

## Site çözümlemesi

### `*.b1.church` alt alan adları

`B1App/next.config.mjs`, gelen istekleri host'a göre yeniden yazar. `(?<subdomain>.*?)\..*` desenli bir host kuralı, host'un **ilk etiketini** yakalar ve `/` ile `/:path*` yollarını `/{subdomain}` biçimine dönüştürür. Bu, `[sdSlug]` App Router segmentidir. Dolayısıyla `grace.b1.church/about`, `/grace/about` olur.

`src/app/[sdSlug]/` içinde `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`), `GET /membership/churches/lookup/?subDomain={sdSlug}` uç noktasını çağırır. `ChurchController.getBySubDomain` yanıtının artık iki dalı vardır:

| Slug eşleşmesi | Yanıt | Anlamı |
|----------------|-------|--------|
| `churches.subDomain` | `{ id, name, subDomain }` | Bu kilisenin birincil sitesi |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | Bir **ikincil site**. Denetleyici `sites` tablosuna geri döner, sahip kiliseyi çözer ve sorgulanan slug'ı ile ek `siteId` değerini geri döndürür |

Bu ek `siteId`, ikincil site isteğini birincil site isteğinden ayıran tek şeydir. Hattın geri kalanı ortaktır.

Hiçbir tabloyla eşleşmeyen bir slug, `200` durum koduyla `{}` olarak döner. `ConfigHelper.load`, `id` içermeyen yanıtı bilinmeyen bir site olarak değerlendirir ve Next'in `notFound()` fonksiyonunu çağırır. Böylece bilinmeyen bir alt alan adı, sonraki tüm çağrıların `/…/undefined` istemesi yerine gerçek bir 404 alır. Oluşturucu sayfa rotası, ağaç yolunu `src/helpers/pageTreePath.ts` içindeki `pageTreePath()` ile oluşturur. Bu fonksiyon slug'ı URL kodlamasından geçirir. Böylece hatalı biçimlendirilmiş bir slug (ters eğik çizgi, boşluk) API'nin `400` yanıtını 500 olarak göstermek yerine 404 döndürür.

### Özel alan adları

Kiliseye ait bir alan adı, **Caddy uç katmanında** sonlanır (aşağıda ayrıntılı). Caddy, B1App'e iletmeden önce `Host` başlığını sitenin `{sub}.b1.church` adresine yeniden yazar. Yani normal yolda B1App, *dahili* bir `*.b1.church` host'u alır ve bunu yerel bir alt alan adıyla tamamen aynı şekilde host etiketine göre çözer. Ara katmanın veritabanı araması hiçbir zaman tetiklenmez. `src/middleware.ts` yine de her istekte çalışır, ama bir sürekli görevi ve bir yedek görevi vardır:

1. **Her zaman** — istemcinin gönderdiği **herhangi bir `x-site` başlığını siler**. Bu başlık sahteciliğe açık bir yeniden yazma girdisidir ve yalnızca ara katmanın kendisi ayarladığında güvenilir kabul edilir. Caddy'nin arkasında bu başlığı temizlemek, ara katmanın asıl işidir.
2. **Yedek, yalnızca dahili olmayan `Host`** — Caddy'nin yeniden yazımından geçmeden B1App'e ulaşan ham bir özel alan adı `Host` için, `GET /membership/domains/public/lookup/{host}` çağrısını yapar. Bu çağrı bir `subDomain` döndürürse `x-site: {subDomain}.b1.church` değerini ayarlar. Caddy'nin arkasında bu dal etkisizdir, çünkü `Host` zaten `*.b1.church` durumundadır.

Dahili host'lar (`localhost`, `b1.church` ve `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` son ekleri) aramayı tamamen atlar. Bu host'lar ya zaten host etiketi yeniden yazımıyla çözümlenmiştir ya da önizleme/dağıtım host'laridir.

Arama işlemi (`DomainRepo.loadByName`), `domains → churches` ve `domains → sites` tablolarını sol birleştirme ile bağlar ve `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)` değerini döndürür. Alan adı bir ikincil siteye işaret ediyorsa o sitenin alt alan adını, aksi halde kilisenin alt alan adını döndürür. Önce tam host eşleşir. Host `www.` ile başlıyorsa ve eşleşme bulunamazsa, çıplak ana alan adıyla **bir kez** daha denenir.

`next.config.mjs` dosyasında `x-site` yeniden yazma kuralları, genel host kurallarının **önüne** yerleştirilir. Böylece onlar önce uygulanır. `x-site: grace.b1.church` → ilk etiket `grace` → `[sdSlug] = grace`. Buradan sonra çözümleme, alt alan adı yoluyla tamamen aynıdır (aynı `churches/lookup` çağrısı, aynı `siteId`).

:::info
`x-site` başlığı dışarıdan gelirse güvenilmez sayılır. Ara katman, kendi değerini ayarlamadan önce gelen her `x-site` başlığını koşulsuz olarak siler. Yeniden yazma kuralları yalnızca ara katmanın ayarladığı değeri görür. Bir istemci bir başlık göndererek başka bir kilisenin içeriğine zorla erişemez.
:::

Ara katmanla ilgili iki işletimsel ayrıntı:

- **Önbellek.** Her host'un sonucu (bir isabet *ya da* doğrulanmış bir ıskalama, asla bir ağ hatası değil) bellek içi bir `Map` içinde, sunucusuz her izolasyon birimi başına **10 dakika** önbelleğe alınır.
- **Eşleştirici.** Eşleştirici bilerek `/sitemap.xml`, `/robots.txt` ve `/manifest.webmanifest` yollarını yeniden dahil eder. İlk deseni, noktalı yolları dışarıda bırakır. Bu, bu dosyaları aksi halde düşürürdü. Dosyalar geri eklenir, böylece bir özel alan adının kilise başına SEO/PWA dosyaları da `x-site` başlığını alır.
- **Kanonik başlık.** Kilise sayfaları için ara katman, bir `Link: <{proto}://{host}{path}>; rel="canonical"` yanıt başlığı ekler. Bu başlık, sayfanın gerçekten sunulduğu host'u belirtir: alt alan adı ya da özel alan adı (`helpers/canonicalLink.ts`). Özel bir alan adı, [Caddy vekili](../deployment/caddy-proxy.md) üzerinden B1App'e ulaştığında istek host'u `{sub}.b1.church` alt alanı olur. Bu durumda ara katman, ziyaretçinin alan adını `X-Church-Host` başlığından alır. Ancak bu yalnızca `/domains/public/lookup/{host}` çağrısı, alan adının aynı alt alana eşlendiğini doğruladıktan sonra yapılır (`ownsSubdomain()`). Böylece kanonik bağlantı, `robots.txt` ve `sitemap.xml`, `b1.church` alt alanı yerine özel alan adını gösterir. Bu başlık, dahili olmayan host'larda (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) ve `/mobile`, `/login`, `/logout` ile üretilen robots/sitemap/manifest dosyalarında atlanır.

### Devre dışı bırakılmış genel web sitesi

Bir kilise, B1Admin içinde **Genel Web Sitesini Devre Dışı Bırak** seçeneğini açabilir (kilise düzeyindeki içerik ayarı `hidePublicSite = "true"`). Bu durumda site yalnızca üyelere yönelik rotalarını sunar:

- **B1App ara katmanı** alt alan adını arar (`/membership/churches/lookup`, ardından `/content/settings/public/:churchId`). İzin listesi dışındaki herhangi bir yola yapılan anonim istekleri `/login?returnUrl={path}{query}` adresine yönlendirir. İzin listesi (`helpers/publicSite.ts`) şunları içerir: `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register` ve manifest/robots/sitemap dosyaları. Yalnızca doğrulanmış yanıtlar önbelleğe alınır. Üretimde bu süre 60 saniyedir, çünkü yöneticinin yeniden doğrulama çağrısı bu örnek başına olan eşlemeyi temizleyemez. Geliştirme/test ortamlarında önbellekleme yapılmaz. Bir API hatası, herkesi dışarıda bırakmak yerine siteyi sunar.
- **Oturum açmış üyeler tam siteyi görür.** Süresi dolmamış bir `jwt` çerezi taşıyan istek yönlendirmeyi atlar. (Ara katmanın `hasSession()` fonksiyonu, yükteki `exp` değerini imzayı doğrulamadan çözer. Bu bir yumuşak kapıdır, erişim denetimi değildir.) Bu sayede oturum açan bir üye, istediği sayfaya geri döner ve normal sayfaları, yerleşik sayfaları (Gruplar, Vaazlar vb.) ve üst gezinmeyi görür. Sayfa bileşenleri ve `Header` artık `hidePublicSite` değerini kendileri kontrol etmez.
- **`robots.txt`**, noindex host'larda olduğu gibi her şeyi engeller.
- **API.** `GET /content/pages/public/:churchId` uç noktası (site haritasının sayfa listesi) `[]` döndürür. Böylece anonim çağıranlar sayfaları listeleyemez.

### `siteId` aktarımı

`ConfigHelper`, çözümlenen `siteId` değerini her istek için tuttuğu `ConfigurationInterface` nesnesinde saklar (React `cache()` ile belleğe alınır). Ardından bu nesnenin ve sayfa bileşenlerinin yaptığı içerik çağrılarına `?siteId=` ekler. Bu ekleme **koşulludur**: boş bir `siteId` (birincil kilise alt alanı) parametreyi tamamen atlar. Aktarılan uç noktalar şunlardır: sayfa ağacı (`/content/pages/:id/tree`), site haritası tarafından kullanılan genel sayfa listesi (`/content/pages/public/:id`), genel stiller (`/content/globalStyles/church/:id`), gezinme bağlantıları (`/content/links/church/:id`) ve bağımsız alt bilgi bloğu (`/content/blocks/public/footer/:id`). Normal görüntüleme yolunda alt bilgi, sayfa ağacının içinde gelir (`zone: "siteFooter"` etiketli bölümler). Bu bölümler zaten `siteId` ile alınmıştır. Bu yüzden kapsamı belirlenmemiş bir alt bilgi boşluğu oluşmaz.

Üye portalı (B1App `mobile`) bilerek bu yapının dışında kalır. `loadChurchAppearance.ts`, kiliseyi `churches/lookup` ile çözer, ancak yalnızca kilise düzeyindeki `/settings/public/{id}` değerini okur ve `siteId` değerini hiç aktarmaz. Portal, v1 sürümünde kilise genelindedir (aşağıya bakın).

## Kilise başına birden fazla web sitesi

### Veri modeli

Yeni `membership.sites` tablosu bilerek küçük tutulmuştur:

| Sütun | Tür | Notlar |
|-------|-----|--------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Sahip kilise |
| `name` | `varchar(255)` | Görünen ad (ör. "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Benzersiz dizin**, genel ad alanı (aşağıya bakın) |

Site kapsamı, içerik ve alan adı tablolarına eklenen tek bir boş bırakılamayan sütunla sağlanır:

| Tablo (modül) | Sütun | `''` anlamı |
|---------------|-------|-------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Alan adı birincil siteye hizmet verir |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Birincil site. Ayrıca **`blocks`** tablosunda `''`, *tüm siteler arasında paylaşılan* anlamına gelir |

Bunların hepsini iki geçiş ekler (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Sütun varsayılanı `''` olduğu için, mevcut her kayıt veri doldurma gerektirmeden bugünkü davranışını korur.

**Genel alt alan adı ad alanı.** `sites.subDomain`, `churches.subDomain` ile *tek* bir ad alanını paylaşır. Bir site alt alanı, bir kilise alt alanıyla ya da başka bir sitenin alt alanıyla asla çakışamaz. Bu kural **her iki** kayıt yolunda uygulanır. `SiteController.save`, `churches` veya `sites` tablosunda karşılığı olan bir slug'ı reddeder. `ChurchController.validateSave` ise bunu tersine yapar. Veritabanı düzeyinde `sites.subDomain` üzerindeki benzersiz dizin bunu destekler.

**Sayfa benzersizliği**, `(churchId, url)` yerine `(churchId, siteId, url)` olacak şekilde genişletildi. Böylece bir kilisenin iki sitesi, her biri kendi `/about` sayfasına sahip olabilir.

### Geri dönüşlü, siteye özgü içerik

Siteye özgü her içerik **liste/ağaç** uç noktası, isteğe bağlı bir `?siteId=` alır (yoksa `''` = birincil site olarak kabul edilir). Bu uç noktalar şunlardır: sayfa ağacı / listesi / genel sayfalar, blok listesi / türe göre blok / alt bilgi, bağlantılar (anonim / filtreli / tümü) ve genel stiller. Bölümler ve öğeler doğrudan kapsamlandırılmaz. Üst sayfaları veya blokları üzerinden miras alırlar.

İki çözümleme zinciri asıl işi yapar:

- **Genel stiller: `site → birincil → varsayılan`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)`, sitenin kendi satırını döndürür. İkincil sitenin satırı yoksa, **birincil (`''`) satırı olduğu gibi döndürür** (istemcinin yazmada kopyalama için kullandığı birincil satırın `id`/`siteId` değerlerini korur). Birincil satır da yoksa `GlobalStyleController`, kodlanmış sabit bir varsayılan renk paleti ve yazı tipi seti döndürür.
- **Alt bilgi bloğu: siteye özgü olan kazanır, paylaşılan olan yedek olur.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)`, paylaşılan (`''`) *ve* siteye özgü satırları döndürür. Çözümleyici, sitenin kendi alt bilgisi varsa onu, yoksa paylaşılanı seçer. Aynı mantık hem `TreeHelper.insertBlocks` (sayfa ağacı) içinde hem de bağımsız `/content/blocks/public/footer/:churchId` uç noktasında çalışır.

### Site silme zincirlemesi

`SiteController.delete` (membership Ayarlar→Düzenle iznine bağlıdır) ikincil bir siteyi üç adımda kaldırır:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)`, sitenin sahip olduğu tüm içeriği zincirleme olarak siler. Bu içerik şunlardır: **sayfaları** → bölümleri, öğeleri, `pageHistory` ve `posts` kayıtları; kendi **blokları** → bölümleri, öğeleri ve `pageHistory` kayıtları; **bağlantıları** ve **globalStyles** kayıtları. Bir koruma, `''` için çalışmayı reddeder. Birincil/paylaşılan nöbetçi değer asla zincirleme silinmez.
2. `DomainRepo.clearSiteId`, sitenin alan adlarını silmek yerine birincil siteye **yeniden atar** (`siteId → ''`). Böylece site silinse bile özel alan adı korunur.
3. `sites` satırı silinir ve Caddy yönlendirmeleri yeniden senkronize edilir (en iyi çaba).

### B1Admin yüzeyi

| Yetenek | Konum | Mekanizma |
|---------|-------|-----------|
| Site değiştirici | `useSiteSelection` + `SiteSwitcher` (boş = "Ana Web Sitesi") | Bir `?site=` URL parametresini okur ve bunu ContentApi çağrılarına `?siteId=` olarak aktarır. Üç Site **liste** alanında bulunur: **Sayfalar**, **Bloklar** ve **Görünüm**. Ancak sayfa/blok düzenleyicilerinde bulunmaz, çünkü bu düzenleyiciler `siteId` değerini kaydın kendisinde taşır |
| Site oluşturma/silme | Değiştiricideki "Web sitelerini yönet…" girişinden açılan `SitesDialog` | `POST /membership/sites` / `DELETE /membership/sites/:id` (ad ve subDomain). Membership Ayarlar→Düzenle iznine bağlıdır (sunucu tarafında `Permissions.settings.edit`, B1Admin'de `Permissions.membershipApi.settings.edit`). **Yalnızca oluşturma ve silme. v1 sürümünde yeniden adlandırma arayüzü yoktur** |
| Alan adı başına site ataması | Ayarlar→Alan Adları altındaki `DomainSettingsEdit` | Her satırdaki site açılır listesi, alan adı başına `siteId` değerini `/membership/domains` adresine gönderir. API site döndürmezse (eski backend) sütun gizlenir |
| Yazmada kopyalama stilleri | `StylesManager.prepareForSave` | Yüklenen genel stil satırının `siteId` değeri seçili siteyle eşleşmediğinde (yani API, miras alınan birincil satırı yedek olarak döndürdüğünde), `id` değerini kaldırır ve geçerli `siteId` değerini ekler. Böylece birincil satırın üzerine yazmak yerine, siteye özgü yeni bir satır **eklenmesi** zorlanır. Aynı ayrım, site alt bilgi bloğu için de geçerlidir |

:::info
**v1 sürümünde kilise genelinde kalanlar (kasıtlı bir kapsam seçimi, veri modelinin bir sınırı değil):** **blog** (`BlogPage` bir değiştirici içermez ve `/posts` uç noktasını `siteId` olmadan yükler), **site bileşenleri** (duyuru afişi ve başlatıcı), **yönlendirmeler**, **logo / GA4 / kilise ayarları** ve **üye portalı** (B1App mobil). Bu, Görünüm sayfasının *tamamı* anlamına gelmez. İkincil bir sitenin genel stilleri (renk paleti, yazı tipleri, tipografi, boşluk, gezinme, özel CSS), yukarıdaki yazmada kopyalama yoluyla **siteye özgüdür**. Görünüm sayfasında yalnızca afiş/başlatıcı/yönlendirme/logo alt panelleri kilise genelinde kalır.
:::

## Özel alan adları: Caddy uç katmanı (statik yapılandırma planı)

:::info
**Yön 2026-07-02 tarihinde revize edildi.** Özel alan adı barındırmasını Vercel tarafından yönetilen alan adlarına taşıma planı **iptal edildi**. Tüm Vercel alan adı kaydı kodu (`VercelHelper`, `vercelToken`/`vercelProjectId`/`vercelTeamId` ortam değişkenleri, SSM parametreleri ve sağlık girişleri) Api'den kaldırıldı. EC2 üzerindeki kendi yönettiğimiz **Caddy vekili kalıcı olarak özel alan adı uç katmanı olarak kalır**. Geriye kalan tek iş dahilidir: Caddy'nin *çalışma zamanı* yönetici API yapılandırmasını, yeniden başlatmalara dayanan bir *statik* yapılandırmayla değiştirmek.
:::

### Uç katman

Her özel kilise alan adı DNS kaydını tek bir EC2 makinesine yönlendirir. Bu makine `3.23.251.61` adresinde çalışır ve `proxy.b1.church` adresiyle de erişilebilir. B1Admin'in Ayarlar→Alan Adları ekranı, kiliselere bir kök `A → 3.23.251.61` kaydı ya da bir `CNAME → proxy.b1.church` kaydı eklemelerini söyler. Caddy, TLS'yi alan adına özel bir Let's Encrypt sertifikasıyla sonlandırır, `Host` başlığını alan adının `{sub}.b1.church` üst kaynağına yeniden yazar ve B1App'e ters vekil olarak iletir. B1App de isteği yerel bir alt alan adı gibi host etiketine göre yönlendirir (yukarıdaki [Özel alan adları](#özel-alan-adları) bölümüne bakın).

Üst kaynak eşlemesi `DomainRepo.loadPairs` tarafından üretilir. Bu fonksiyonun `dial` alanı, atanmış sitenin alt alanını **COALESCE** ile alır. Böylece bir alan adı, doğru **ikincil siteye** vekil olarak yönlendirilir. Atanmamışsa kilisenin birincil alt alanına düşer:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

`www.*` kayıtları eşlemeden çıkarılır. Caddy, `www.{host}` isteklerini bunun yerine ana alan adına `302` yönlendirmesiyle sunar.

### Uç katmanı besleyen iki anonim uç nokta

`DomainController`, makinenin doğrudan kullandığı iki kimlik doğrulaması gerektirmeyen, salt okunur uç nokta sunar. Bunlar gerekli olarak anonimdir, çünkü uç katman herhangi bir kilise bağlamı oluşmadan önce bunları sorgular:

| Uç nokta | Döndürdüğü | Rolü |
|----------|------------|------|
| `GET /membership/domains/authorize?domain=` | Alan adı (veya `www.` ıskalamasında çıplak ana alan adı) `domains` tablosunda varsa `200`, aksi halde `404` (boş `domain` dahil) | Caddy'nin **isteğe bağlı TLS `ask`** uç noktası. Gelen SNI için sertifika verilip verilmeyeceğine karar veren kötüye kullanım denetimi |
| `GET /membership/domains/hostmap` | `text/plain`, yönlendirilebilir alan adı başına sıralı bir `{domain} {sub}.b1.church` satırı | Makinenin bir zamanlayıcıyla yenilediği host→üst kaynak eşleme dosyası |

`authorize`, `DomainRepo.loadByName` fonksiyonunu yeniden kullanır (tam host, ardından tek bir `www.`→ana alan adı yeniden denemesi). `hostmap`, `loadPairs` fonksiyonunu yeniden kullanır. Bu yüzden site farkındalığına sahiptir ve `www.*` kayıtlarını dışarıda bırakır. Vekil rotalarıyla birebir aynıdır. Yalnızca `:443` son ekini kaldırır.

### Alan adı kaydetme/silme: tek en iyi çaba itmesi

`DomainController.save`, `domains` kayıtlarını yazar ve ardından tek bir **en iyi çaba** `CaddyHelper.updateCaddy()` çağrısı yapar. Bu çağrı, hata yakalayıp `console.error` ile günlüğe kaydeden ve hatayı yutan bir `try/catch` ile sarılır. `delete` da aynısını yapar. Bu sayede daha önceki eski yönlendirme silme hatası da düzeltilmiş olur. İkincil site silme (`SiteController.delete`) da aynı şekilde çalışır. `updateCaddy`, kendisi **10 saniyelik** bir Axios zaman aşımıyla sınırlandırılmıştır. Böylece erişilemeyen veya durdurulmuş bir Caddy, hiçbir zaman alan adı kaydetme işlemini `500` ile sonlandıramaz. Gerçek doğruluk kaynağı `domains` tablosudur.

### Mevcut durum: statik yapılandırma, çalışma zamanı durumu yok

Makine (kalıcı Elastic IP arkasındaki Windows EC2), Caddy'yi **statik bir Caddyfile** ile çalıştırır. Bu dosya, `ask` değeri `/membership/domains/authorize` adresine işaret eden isteğe bağlı TLS yapılandırmasını ve host→üst kaynak eşleme dosyasını içerir. Bu eşleme dosyası, zamanlanmış bir görev tarafından her 5 dakikada bir `/membership/domains/hostmap` adresinden yenilenir. Görev, sorunsuz bir `caddy reload` komutuyla biter. Yapılandırma, sıfır çalışma zamanı durumuyla yeniden başlatmalara dayanır. Yeniden ısıtma gerekmez. Bilinmeyen bir SNI **TLS ile reddedilir** (`authorize` komutunun reddettiği bir host için sertifika üretilmez). Yetkilendirilmiş ama henüz eşlenmemiş bir host (senkronizasyon penceresi içindeki yeni bir alan adı) ise temiz bir 404 alır. Yeni alan adları, kaydedildikten yaklaşık 5 dakika içinde yönlendirilebilir hale gelir. Sertifikaları ilk erişimde üretilir. Kurulum/yapılandırma, işletim ve sahada test edilmiş tuzaklar: [Caddy Özel Alan Adı Vekili](../deployment/caddy-proxy.md).

### Eski çalışma zamanı itmesi: geri alma yolu, silinmesi bekliyor

`CaddyHelper` (membership modülü), hâlâ **yönetici API'si** üzerinden Caddy'yi `caddyHost:caddyPort` adresinde yönetebilir (SSM `caddyHost`/`caddyPort`. Ayarlanmamışsa işlem yapmaz. `ServerHealthController`'ın Entegrasyonlar grubunda görünür). `updateCaddy()`, tam bir yönlendirme dizisini PATCH ile gönderir. `initializeCaddy()` ile `GET /membership/domains/caddy/init` ve `GET /membership/domains/caddy` uç noktaları ise çalışma zamanı yapılandırmalı bir sunucuyu sıfırdan oluşturur. Bu modun yapılandırması yalnızca Caddy'nin belleğinde yaşardı. Bu, bu mimarinin yerini aldığı yeniden başlatma unutkanlığıdır. Bu makinelerin geri alma yolu olarak kalmaya devam eder ve statik makine kararlı çalıştıktan sonra silinmesi planlanmıştır. Alan adı kaydetme/silme sırasındaki en iyi çaba `updateCaddy()` itmesi, statik makineye karşı zararsız bir işlemdir. Yönetici API'si yalnızca localhost üzerinden erişilebilir.

## İlgili sayfalar

- [Caddy Özel Alan Adı Vekili](../deployment/caddy-proxy.md): Uç katman makinesinin kendisi. Sıfırdan kurulum, WinSW hizmeti, eşleme senkronizasyon görevi ve işletimsel tuzaklar
- [Web Sitesi Oluşturucu](./website-builder.md): Sayfa/bölüm/öğe ağacı, işleyiciler, blog, SEO ve yapay zekâ ile üretim (bir istek bir kilise/siteye çözümlendikten sonra neyin görüntülendiği)
- [İçerik Uç Noktaları](../api/endpoints/content.md): Sayfalar, bloklar, bağlantılar ve genel stiller için REST yüzeyi. Hepsi artık `?siteId=` değerini tanır
- [B1App](../web-apps/b1-app.md): Ara katmanı ve `[sdSlug]` yönlendirmesini barındıran Next.js uygulaması
- [Web Uygulaması Dağıtımı](../deployment/web-apps.md): B1App'in Vercel'e nasıl dağıtıldığı

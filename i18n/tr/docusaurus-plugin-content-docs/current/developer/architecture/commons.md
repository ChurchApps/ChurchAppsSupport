---
title: "İçerik Ortak Alanı"
---

# İçerik Ortak Alanı — Paylaşılan Varlık Kütüphanesi ve Moderasyon

WorshipCommons şarkıları, Lessons.church dersleri, FreeShow şablonları ve B1 web sitesi şablonları gibi kullanıcılar tarafından gönderilen ve ürünler arasında paylaşılan içerikler, ürüne özgü ayrı bir inceleme akışı yerine tek bir moderasyon kuyruğundan geçer. Bu sayfada gönderim ve onay yaşam döngüsü, paylaşılan varlık veri modeli ve moderasyonun nerede yürütüldüğü anlatılmaktadır.

## Varlık omurgası

Hangi ürüne ait olursa olsun, her ortak alan öğesini iki tablo taşır:

- **`assets`** — herkese açık kimlik satırı. `status`: `pending` | `published` | `unpublished` | `removed`. Türe özgü veriler (şarkı ayrıntıları, yazarlar) `assetId` ile birleştirilen yardımcı tablolarda tutulur.
- **`assetFiles`** — bir varlığa eklenen her dosya (ses, görsel, belge). Bu tablo, bireysel içerik tablolarındaki eski `path` ve virgülle ayrılmış `files` sütunlarının yerini alır.
- **`submissions`** — moderasyon birimi. Yaşam döngüsü: `draft → pending → approved | rejected | withdrawn`. Bir gönderim tamamen yeni bir varlık olabileceği gibi, mevcut yayımlanmış bir varlığın düzenlemesi de olabilir (özgün yazar veya üçüncü bir taraf tarafından).

Bir gönderim onaylandığında, gönderiyi ürünün kendi kayıtlarına dönüştüren ürüne özgü bir **yayın kancası** (`Api/src/modules/commons/helpers/publishHooks/`, örneğin `song.ts`) çalışır.

## Gönderim akışı

`CommonsSubmissionController` (`Api/src/modules/commons/`), son kullanıcıya yönelik API'dir: taslak oluşturma, dosyaları önceden imzalayıp ekleme, incelemeye gönderme veya geri çekme işlemlerini yapar. Gerçek istemcileri harici üretici siteleridir (WorshipCommons sitesi, Lessons.church, FreeShow ve B1 web sitesi şablon galerisi). B1Admin bu istemcilerden biri değildir.

## Kiliseye yönelik kullanım

Moderasyonun ötesinde B1Admin, ortak alan omurgasını doğrudan da okur. Serving → Songs içindeki "Add Song" araması, mevcut harici şarkı veritabanının yanında `GET /songs?sundayReady=true` sorgusunu çalıştırır. Bu sorgu, personel tarafından Pazar'a hazır olarak işaretlenmiş yayımlanmış WorshipCommons şarkılarını (aşağıdaki dinleme kapısına bakın) bir lisans rozetiyle birlikte gösterir. Birini seçmek, yeni `SongDetail` kaydını `songDetailLinks` aracılığıyla kaynağına bağlar. Bu, tek bir kilisenin B1Admin'inin ortak alan verilerine doğrudan dokunduğu tek yoldur. Diğer durumlarda bu veriler yalnızca personele açık Server Admin araçları üzerinden erişilir. Kiliseye yönelik açıklama için destek dokümanındaki [WorshipCommons'tan Ücretsiz Şarkılar](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) bölümüne bakın.

## Moderasyon kuyruğu

Kuyruk **B1Admin → Server Admin → Commons** içinde bulunur (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`). Erişimi `Permissions.server.admin` izni denetler. Bu, aynı sayfada Churches, Impersonate ve Jobs bölümlerini koruyan izinle aynıdır. Bu alan yalnızca ChurchApps personeline yönelik dahili bir araçtır ve bireysel kiliseler tarafından görülmez.

Üç alt sekme vardır:

- **Queue** — tüm ürünlerdeki bekleyen gönderimlerin tamamı. Ürüne ve varlık türüne göre filtrelenebilir. Her satırda yeni varlık, yazarın düzenlemesi veya üçüncü tarafın düzenlemesi rozeti, gönderenin onay geçmişi, alan ve dosya fark özeti ile yaş bilgisi gösterilir. 72 saatten eski gönderimler işaretlenir. **Review** düğmesi, alan düzeyinde farkları, dosya önizlemelerini ve gömülü salt okunur bir ürün önizlemesini içeren bir çekmece açar. Approve ve Reject işlemleri klavye kısayollarını destekler: j/k ile gezinir, a/r ile işlem yaparsınız.
- **Reports** — yayımlanmış varlıklar hakkındaki telif hakkı ve politika/kalite raporları. Bunlar iki kuyruğa ve çözülmüş geçmişe ayrılmıştır. Bir personel üyesi raporu üstlenir, ardından bir çözüm (`upheld`, `dismissed` veya `duplicate`) ve bir işlem (`none`, `unpublish` veya `remove`) ile raporu kapatır.
- **Assets** — yayımlanmış içerikte arama yapmanızı sağlayan bir tarayıcı. Varlık başına şu işlemler yapılabilir: öne çıkarma, yayımdan kaldırma veya yeniden yayımlama ya da kaldırma (neden: copyright/policy). Şarkılar için buradaki **dinleme kapısı**, bir şarkının "Pazar'a hazır" olmasını sağlar. Personel, yayımlanmış her tonu dinleyip nota, akor ve slaytların eksiksiz olduğunu doğruladıktan sonra şarkıyı bir kez işaretler.

`/commons/admin/*` altındaki her uç nokta (`CommonsAdminController.ts`), sunucu yönetici iznini bağımsız olarak yeniden denetler.

:::info
Bu tasarım bilinçli olarak tek bir kuyruk kullanır. WorshipCommons'ın kendi `/admin` moderasyon arayüzü emekli edildi. Böylece her ürünün gönderimleri B1Admin'in Server Admin araçlarına yönlendirilir.
:::

## Kapsam

Api (commons modülü), B1Admin (Server Admin) ve harici üretici siteler: WorshipCommons, Lessons.church, FreeShow ve B1 web sitesi oluşturucu şablonları.

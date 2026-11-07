---
title: "Denetim Günlüğü ve Geri Alınabilir Toplu İşlemler"
description: "API denetim günlüğünü, yani modüller genelindeki her kullanıcı değişikliğini ve içe aktarma gruplarının B1 Admin'de satır satır geri alınmasını kapsar."
---

# Denetim Günlüğü ve Geri Alınabilir Toplu İşlemler

<div class="article-intro">

Api içindeki her kullanıcı kaynaklı değişiklik (kim, ne, ne zaman ve nereden) tüm modüllerde kaydedilir ve bunun için denetleyici başına ek bağlantı gerekmez. Bunun üzerinde bir toplu işlem katmanı yer alır: bir içe aktarma veya toplu işlem toplu işlem olarak etiketlenebilir ve daha sonra Planning Center tarzında satır satır **geri alınabilir**. Her ikisi de membership veritabanındaki tek bir `auditLogs` tablosunda yaşar ve tamamen tek bir kontrol noktası olan `BaseController.actionWrapper` üzerinden yönetilir. Bu sayfa neyin denetlendiğini, verinin nerede tutulduğunu, verinin şekillendirdiği performans ödünleşimlerini ve geri almanın, veritabanlar arası işlem kullanmadan bir toplu işlemi nasıl güvenle tersine çevirdiğini açıklar.

</div>

## Genel Bakış

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

Aşağıdaki her şeyi yönlendiren iki yapısal gerçek vardır:

1. **Yalnızca denetleyici katmanı, işlemi yapan kişiyi bilen tek yerdir.** Depolar (repository) hiçbir zaman `AuthenticatedUser` görmez; yalnızca denetleyiciler `au` değişkenini tutar. Her modülün denetleyicileri zaten `BaseController.actionWrapper` üzerinden geçtiği için denetleme burada devreye girer. Hiçbir yerde repo imzası değişmez.
2. **Tek tablo tüm modüllere hizmet eder.** Bağış, yoklama, içerik vb. için denetim satırları, membership olmayan bir denetleyiciden bile `RepoManager.getRepos("membership")` aracılığıyla membership veritabanındaki `auditLogs` tablosuna yazılır. "Jane'in bugün değiştirdiği her şey" tek bir sorguda kalır.

## Neler denetleniyor

Denetleme, her rotadaki her değiştirici fiil için **varsayılan olarak açıktır**. `actionWrapper`, denetim alanlarını rota başına sıfır yapılandırmayla isteğten türetir:

| Alan | Kaynak |
|------|--------|
| `module` | `this.moduleName` (sahip modül) |
| `entityType` | `req.baseUrl` değerinin son segmentinin tekil hali (ör. `/membership/people` → `person`) |
| `category` | varsayılan olarak `entityType` |
| `action` | `POST /` için `${entityType}_saved`, `DELETE /:id` için `${entityType}_deleted`, aksi halde `${entityType}_${method}:${routePath}`. Böylece CRUD olmayan alt rotalar (ör. `task_post:/:id/move`) otomatik olarak yakalanır |

`BaseController.AUDIT_REGISTRY` yalnızca geçersiz kılmalar ve devre dışı bırakmalar içindir; bir izin listesi değildir. Bir rota oraya; kategori veya entityType adını değiştirmek, `{ dbModule, table }` bildirerek toplu işlem ve geri almaya uygun hale getirmek, `sensitive` olarak işaretleyerek anonim değişiklikleri denetlemek veya `optOut: true` ile kapatmak için eklenir.

**Devre dışı bırakma listesi** (defteri boğacak yoğun yazma yolları): yoklama `visits` / `visitsessions` / `sessions` / `checkin` (Pazar check-in fırtınası) ve mesajlaşma `messages` / `connections` / `devices` (sohbet ve varlık bilgisi). Diğer her şey kaydedilir.

**Toplu uç noktalar** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) `BULK_ROUTES` içinde kayıtlıdır ve **etkilenen her kimlik için bir denetim satırı** yayınlar. Yani 10.000 kişilik bir içe aktarma 10.000 satır üretir. Geri alınabilir yapan tam olarak bu varlık bazlı ayrıntıdır.

**Anonim değişiklikler** (`actionWrapperAnon`: misafir bağışları, misafir kaydı, form gönderimleri) yalnızca kayıtta `sensitive` olarak işaretlenmiş rotalar için denetlenir. Bu kayıtlar `userId="anonymous"` ve istemci IP'si ile yazılır. Bağışlar listenin başındadır; bu yolun gerçek bir gerileme geçmişi vardır.

### Gizli bilgi maskeleme ve boyut sınırları

Herhangi bir `details` yükü saklanmadan önce `AuditLogHelper.capDetails()` ona `sanitizeValue()` uygular:

- **Gizli anahtarlar maskelenir.** Küçük harfe çevrilmiş adı `SENSITIVE_KEYS` içinde olan her alan (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) `"[redacted]"` ile değiştirilir.
- **Büyük skaler değerler çıkarılır.** `data:` URI'si olan veya 4 KB'tan uzun her dize (base64 fotoğraflar, blob'lar) `"[stripped]"` olur.
- **Aşırı büyük satırlar sınırlandırılır.** Serileştirilmiş JSON yaklaşık 64 KB'ı aşarsa tüm yük `{ truncated: true }` ile değiştirilir. Kesilmiş satırlar yine görüntülenebilir, ancak **geri alınamaz** çünkü geri yüklenecek önceki/sonraki görüntüsü yoktur.

## Verinin nerede tutulduğu

Tek bir `auditLogs` tablosu, **membership** veritabanında tüm modülleri destekler. Sütunlar: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON dizgisi), ipAddress, module, batchId, created`. `tools/migrations/membership/2026-07-04_audit_universal.ts` geçişi `module` ve `batchId` ekler, `details` alanını `TEXT`'ten `MEDIUMTEXT`'e genişletir, `ix_auditLogs_batch (batchId)` ve `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` dizinlerini ekler ve `batches` tablosunu oluşturur. `module` sütunu, birden fazla modülde bulunan `entityType` çakışmalarının (`note`, `setting` birkaç modülde vardır) filtrelenebilir kalması için vardır. Varlık dizini ise hem varlık bazlı geçmişi hem de geri alma çakışma korumasını besler.

Modüller arası yazmalar, sarmalayıcının içinden `RepoManager.getRepos("membership")` ile yapılır. Sıra bilinçlidir: **ana yazma önce modül veritabanına işlenir, denetim eklemesi ikinci olarak yapılır.** Normal modda denetim ekleme hatası yutulur (`console.error`, Sentry bunu yakalar). Denetim tavsiye niteliğindedir ve kullanıcının isteğini asla başarısız kılmamalıdır. **Toplu modda ise katıdır** (aşağıya bakın).

:::info Neden tetikleyici, CDC veya modül başına tablo değil?
- **MySQL tetikleyicileri** işlemi yapan kullanıcıyı bilmez (bağlantının `au` değeri yoktur) ve her şemada tetikleyici setlerinin bakımını gerektirir.
- **binlog / CDC** aynı işlemi yapan kimlik sorunuyla birlikte tam bir altyapı projesidir.
- **Her repo'ya `userId` taşımak**, denetleyici katmanının zaten sahip olduğu bilgiyi taşımak için yüzlerce dosyaya dokunmak anlamına gelir.
- **Modül başına denetim tabloları** yedi kat fazla altyapı ve modüller arası her soru için dağıtık sorgular anlamına gelirdi. Kontrol noktasında tek bir tablo, işlemi yapanı yakalayan en az kodlu tasarımdır.
:::

## Performans yaklaşımı

Kritik yol bilinçli olarak ucuz tutulur. Maliyet yalnızca bir karşılık sağlanan yerlerde ödenir.

- **Normal güncellemelerde yazmadan önce okuma yoktur.** Normal bir kayıt eski kaydı yüklemez. **Gönderilen sonraki değerler** `details.after` içinde saklanır. Eski→yeni karşılaştırması, kullanıcı arayüzünde *görüntüleme* zamanında, varlığın önceki denetim satırıyla karşılaştırılarak yeniden oluşturulur. Görüntüleme zamanında bir sorgu, yazma zamanında sıfır maliyet demektir. Lansmandan beri hiç dokunulmamış alanlar basitçe bir "eski" değer göstermez. Bu kabul edilebilir.
- **Silmelerde önceki görüntü alınır.** `{ dbModule, table }` içeren bir kayıt rotasında `DELETE /:id`, önce satırı genel olarak yükler ve `details.before` içinde saklar. Silmeler nadirdir ve önceki görüntü adli değerin tamamıdır.
- **Toplu mod, sistematik olarak okuma-önce-yazma yapan tek moddur** ve isteğe bağlıdır. Toplu veya içe aktarma işlemi zaten pahalıdır, bu yüzden N anlık görüntü okuması geri almanın bedelidir.
- **Denetim eklemeleri beklenir (await).** `actionWrapper` günlük sözlerini toplar ve yanıtı döndürmeden önce `await Promise.allSettled(...)` çağırır. Bu en önemli değişmezdir: Lambda'da yanıt döndüğü anda konteyner **donar** ve beklenmeyen bir ekleme sessizce kaybolur. Buradaki "ateşle ve unut", *hataların isteği asla başarısız kılmaması* anlamına gelir, *beklememek* anlamına değil. Isınmış membership havuzunda tek bir ekleme yaklaşık 1–3 ms sürer.

## Toplu işlemler ve geri alma

Bir **toplu işlem**, bir değişiklik kümesini birlikte incelenebilir ve tersine çevrilebilir hale getirir. Bir toplu işlemi açmanın iki yolu vardır:

- **Açık:** `POST /membership/batches { label, source }` bir `batchId` döndürür. İstemci (B1Transfer, bir B1Admin içe aktarma arayüzü) sonraki her kaydet/sil işleminde `X-Batch-Id: <id>` gönderir. `POST /membership/batches/:id/complete` toplu işlemi kapatır ve `itemCount` değerini işler.
- **Örtük:** Dört toplu uç nokta, tek istek içinde kendi toplu işlemlerini açar, doldurur ve tamamlar. Yanıtta `batchId` döndürürler.

`batches` tablosu (membership DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Toplu mod katıdır

`X-Batch-Id` mevcut olduğunda `actionWrapper` her korumayı sıkılaştırır (`writeBatchAuditRows`):

1. Toplu işlem var olmalı, `open` durumunda olmalı ve `au.churchId`'ye ait olmalıdır. Aksi halde **403** döner.
2. Rota toplu işleme uygun olmalıdır (kayıtta `{ dbModule, table }`). Aksi halde **400** döner.
3. İşlem çalışmadan önce, etkilenen tüm kimliklerin önceki görüntüleri **tek bir** `WHERE id IN (...) AND churchId = ?` sorgusuyla yüklenir. Bu anlık görüntü okuması başarısız olursa istek **500 ile başarısız olur ve işlem çalıştırılmaz**. Toplu mod, geri alınamayan bir defterin sessizce oluşmasına asla izin vermemelidir. (Normal mod ise en iyi çabayla çalışır ve anlık görüntü hatalarını yutar.)
4. İşlem başarılı olduktan sonra, her varlık için `batchId`, `details.before` ve `details.after` ile birlikte bir denetim satırı yazılır. Toplu işlemin oluşturduğu satırlar için ayrıca açık bir **oluşturma işareti** eklenir.

### Geri alma

`POST /membership/batches/:id/undo` (yetki: toplu işlemi oluşturan kişi veya `Permissions.server.admin`). Toplu işlem `completed` değilse veya **30 günlük geri alma penceresinden** eskiyse reddedilir. Ardından `BatchUndoHelper.undo()`:

1. Toplu işlemin denetim satırlarını yükler ve **`(module, entityType, entityId)` ile gruplar.** Toplu işlem içinde birden fazla kez dokunulmuş bir varlık **bir kez** geri alınır ve gerçek toplu öncesi durumuna döndürülür. Bu, en eski önceki görüntü veya toplu işlemin oluşturduğu bir kayıtsa silme anlamına gelir. Geri almanın her satırı naif biçimde yeniden oynatmamasının nedeni budur: toplu işlem ortasındaki ara bir anlık görüntüyü geri yüklemek yanlış olurdu.
2. Her varlık için önce **çakışma korumasını** çalıştırır. `auditLog.hasLaterModification()`, aynı `(module, entityType, entityId)` için bu toplu işlemin dışında daha sonraki bir denetim girdisi olup olmadığını sorgular. Varsa varlık içe aktarmadan sonra düzenlenmiştir. **Atlanır ve raporlanır**, asla üzerine yazılmaz. Bu, denetim defterinin kendisini bir değişiklik dedektörü olarak kullanmasıdır. Hiçbir tabloda `modifiedAt` sütunu gerekmez.
3. Kayıtlı işleme göre tersine çevirir. `{ dbModule, table }` bilgisini kayıttan çözümler ve genel Kysely yazmalarını kullanır:
   - **oluşturuldu** → satırı kalıcı olarak siler.
   - **güncellendi** → `details.before` değerini geri yazar.
   - **silindi** → `details.before` değerini yeniden ekler (aynı kimlikli bir satır yeniden ortaya çıktıysa güncelle-ya-da-ekle).
4. Her geri alma işlemi kendisi de denetlenir (`action: "<entityType>_undone"`, `batchId` yok; geri almanın geri alınması kapsam dışıdır).

İşlem türü, kayıtlı **oluşturma işaretinden** seçilir, eksik bir önceki görüntüden çıkarılmaz. Meşru olarak boş bir önceki görüntü veya kesilmiş bir satır, oluşturma işlemi olarak yanlış anlaşılmamalıdır.

Sonuç yükü `{ restored, skippedConflicts: [...], failed: [...], status }` biçimindedir. Toplu işlem temizse `undone`, değilse `partial` durumuna geçer. **Veritabanlar arası işlem yoktur.** Geri alma satır bazında en iyi çabayla yapılır. Bu, Planning Center'ın birleştirilmiş profiller için belgelediği sınırlamanın aynısıdır.

:::warning Yan etkili varlıkların bir `onUndo` kancasına ihtiyacı vardır
Bir `groupMember` oluşturmasını geri almak, `groupMemberHistory` kaydını ("ayrıldı") da yazmalıdır. Aksi halde kayıp analizleri sessizce bozulur. Bu, geçerli bir çalışma alanı değişmezidir. Bu tür varlıklar, `AUDIT_REGISTRY` içinde bir `onUndo` geri çağrısı kaydeder. Geri çağrı geri almayı tamamen kendisi ele aldığında `true` döndürür ve genel yolu atlar. `groupMembers` standart örnektir: açık yolda satır kimliğiyle, toplu uç noktalarda ise `personId` ile anahtarlanır ve her ekleme/çıkarmada geçmişi izlenir.
:::

## Tüketici yüzeyleri

Her iki yönetici yüzeyi de **devam etmektedir**. Amaç şudur:

| Yüzey | Depo | Amaç |
|-------|------|------|
| **Denetim Günlüğü sayfası** | B1Admin (ManageChurch → Audit Log) | Modül, kategori, kullanıcı ve varlığa göre filtreleme; eski→yeni farklarını gösterme. Düzenlemeler için varlığın önceki girdisiyle karşılaştırılır, silmeler için `details.before` kullanılır. `GET /membership/auditlogs` tarafından desteklenir ve `Permissions.server.admin` ile korunur. |
| **Toplu işlemler sayfası** | B1Admin (aynı Ayarlar merkezi) | Toplu işlemleri durum ve sayılarla listeler. **Sonuçları Görüntüle** (toplu işlemin denetim satırları, `GET /membership/batches/:id/results` ile) ve atlanan çakışma/başarısız rapor bölümünü gösteren bir **Geri Al** düğmesi sunar. |
| **İçe aktarma toplu işlemleri** | B1Transfer | Bir toplu işlem açılır, normal kaydetme çağrılarında `X-Batch-Id` gönderilir, sonunda tamamlanır. Yeni içe aktarma uç noktası olmadan içe aktarmalar geri alınabilir hale gelir. Eski `importKey`, yalnızca oluşturma soy izi işareti olarak kalır ve geri alma için yerini bırakmıştır. |

## Gelecekteki değişikliklerin geriletmemesi gereken tuzaklar

- **Denetim eklemeleri beklenmeye devam etmelidir.** Beklenmeyen `AuditLogHelper.log(...)` çağrısı Lambda dondurmasıyla kaybolur. Promise'leri toplayın ve yanıt döndürmeden önce `await Promise.allSettled` çağırın.
- **Kysely, `.set()` ve `.values()` içinden `undefined` değerlerini çıkarır.** Geri yüklemede temizlenmiş bir sütun dokunulmadan kalır. `BatchUndoHelper`, her eksik alanı açık `null` değerine (`nullify`) dönüştürür. "Daha hızlı" doğrudan bir yazma için bunu asla atlamayın.
- **Saklama süresi geri alma penceresinin çok üzerinde kalmalıdır.** `AuditLogRepo.deleteOld()` gece zamanlayıcısında çalışır (varsayılan 365 gün saklama). Geri alma penceresi 30 gündür. Saklama süresi pencereye yaklaşırsa, geri alma defterleri açık toplu işlemlerin altından silinir.
- **Kesilmiş satırlar geri alınamaz.** `{ truncated: true }` yükünün önceki/sonraki görüntüsü yoktur. Geri alma bunu `failed` olarak raporlar, tahmin yürütmez.
- **Sıra modül-yazma-sonra-denetim şeklindedir.** Denetim eklemesini asla gerçek yazmanın önüne taşımayın ve toplu modda katı, normal modda tavsiye niteliğinde kalmasını sağlayın.

## Dosya envanteri

| Alan | Dosyalar |
|------|----------|
| Sarmalayıcı / kayıt | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, anlık görüntü + satır yazma) |
| Geri alma motoru | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Denetim yardımcısı | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Denetleyiciler | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modeller / depolar | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Geçiş | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Yönetici arayüzü (devam ediyor) | B1Admin Denetim Günlüğü ve Toplu İşlemler sayfaları; B1Transfer içe aktarma toplu işlem başlığı |

## İlgili sayfalar

- [Modül Yapısı](../api/module-structure.md): Membership olmayan bir denetleyicinin `RepoManager` aracılığıyla membership depolarına nasıl ulaştığı
- [Bağışlar](./giving.md): Anonim olsa bile `sensitive` olarak denetlenen bağış yazma yolları
- [Membership Uç Noktaları](../api/endpoints/membership.md): `X-Batch-Id` taşıyan ve `/auditlogs` ile `/batches` uç noktalarını sunan REST yüzeyi

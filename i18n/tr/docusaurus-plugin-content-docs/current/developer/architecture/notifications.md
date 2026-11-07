---
title: "Bildirimler ve Hatırlatıcılar Mimarisi"
---

# Bildirimler ve Hatırlatıcılar Mimarisi

<div class="article-intro">

Bir kilise üyesinin baktığı sayfanın dışında gördüğü her mesaj (rozet sayısı, anlık bildirim, özet e-postası) MessagingApi içindeki iki kapıdan birinden geçer. Bu sayfa bu hunileri, onları zamanlı olarak besleyen hatırlatıcı motorunu ve bir kişiye gerçekte neyin ulaştığını belirleyen tercih modelini belgelemektedir.

</div>

## Genel bakış: iki kapı

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Bir kişiye bir şey bildiren her şey** mesajlaşma modülündeki `NotificationHelper.createNotifications()` üzerinden geçer. Bir `notifications` satırı kaydeder ve socket → push → e-posta yolunu izler. Her kanal için `PreferenceGateHelper` değerlendirilir; buna 0. seviyedeki `in_app` de dahildir.
2. **Zamanlanmış her şey** bir `reminderDefinition` olarak tanımlanır (varlık düzeyinde veya kapsam düzeyinde), `reminderOccurrences` kayıtlarına genişletilir ve periyodik bir zamanlayıcıda `ReminderEngine.scan()` tarafından gönderilir. Tek bir genişletici, tek bir gönderici ve tek bir gönderim defteri (`reminderSentLog`) vardır.
3. **Doğrudan e-posta yalnızca** `TransactionalEmailHelper.sendTransactional()` arkasında bulunur. Bir ESLint kuralı bunu derleme zamanında zorunlu kılar. Aşağıya bakın.

:::tip Lint ile zorunlu kılınan e-posta kapısı, yalnızca bir kural değil
`Api/tools/eslint-rules/email-door.cjs` dosyası `no-direct-email-helper` kuralını tanımlar. `NotificationHelper.ts` veya `TransactionalEmailHelper.ts` dışında yapılan her `EmailHelper.sendTemplatedEmail()` veya `EmailHelper.sendEmail()` çağrısı lint aşamasında başarısız olur. Bir e-posta göndermeniz gerekiyorsa, onu huniden geçirin (`emailImmediate` ile `createNotifications`) veya `TransactionalEmailHelper.sendTransactional()` üzerinden yönlendirin. CI'dan geçen üçüncü bir yol yoktur.
:::

## Bildirim hunisi

`NotificationHelper.createNotifications()`, zamanlanmamış veya işlemsel olmayan her şey için tek giriş noktasıdır:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Her alıcı için `notifications` tablosunda bir satır kaydeder ve aşağıdaki kanal merdivenini izleyen `attemptDeliveryWithEscalation` fonksiyonunu çağırır. Aynı `(contentType, contentId)` için hâlâ okunmamış bir satır varsa yeniden oluşturma engellenir. Bu tekilleştirme koruması, `emailImmediate` gönderimleri (hatırlatıcı zamanlamaları, personelin "tümüne e-posta" gönderimi, iş akışı adımları kendi tekilleştirmelerini yaptığı için) ve doğrudan mesajlar için atlanır. Doğrudan mesajlar her zaman socket'i tetikler.

`shared/helpers/NotificationService.ts`, mesajlaşma modülü dışındaki çağıranlar için aynı imzayı (`NotificationServiceOptions`) yansıtır ve başlatma sırasında mesajlaşma modülüne kaydedilir.

## Kanal yükseltme zinciri

Teslimat bir seviyede başlar (varsayılan 0, hatırlatıcılar veya açık gönderimler için daha yüksek) ve yalnızca önceki kanal başarısız olduysa bir sonraki kanala geçer. Her seviye, herhangi bir şey denenmeden önce `PreferenceGateHelper` tarafından kapılanır.

| Seviye | Kanal | Davranış |
|-------|---------|----------|
| 0 | **in_app / socket** | Önce `in_app` kapısı kontrol edilir. Susturulmuşsa satır `isNew=false` ile kaydedilir ve teslimat tamamen durur: socket tetiklemesi yok, rozet yok, başka yükseltme yok. Aksi halde sunucu, kişinin `alerts` odasındaki açık socket bağlantılarını arar ve bir `notification` (veya `privateMessage`) çerçevesi gönderir. Normal bildirimlerde başarılı socket teslimatı zinciri burada durdurur. 30 dakikalık zamanlayıcı okunmamış öğeleri yeniden kontrol eder ve daha sonra yükseltir. Doğrudan mesajlar asla socket'te durmaz: kurulu bir PWA, alerts socket'ini arka planda açık tutabilir ve bu, işletim sistemi düzeyindeki push'u aksi halde bastırırdı. |
| 1 | **push** | `allowPush`, kategori devre dışı bırakma ve sessiz saatlere göre kapılanır. Kişinin `devices` satırlarındaki hem Expo push belirteçlerine hem de Web Push aboneliklerine gönderir. Uç noktaya göre tekilleştirir ve bu sırada eski belirteçleri temizler. |
| 2 | **email** | `emailFrequency` ve kategori devre dışı bırakmaya göre kapılanır. Anlık gönderimler (`emailImmediate`) hemen oluşturulur ve bir `deliveryLogs` satırı yazar. Aksi halde bildirim, aşağıda açıklanan toplu özet için beklemede bırakılır. |
| — | **sms** | Yükseltme zincirinde bir seviye değildir. Kapılanan tek SMS üreticisi hatırlatıcı motorudur: bir tanımın `channels` listesi `sms` içerdiğinde `ReminderEngine.sendSms()`, her alıcıya push/e-posta bildirimine **ek olarak** mesaj gönderir (bkz. [Metin hatırlatıcıları](#text-reminders)). Toplu metin gönderimi (`TextingController` / `@churchapps/texting`), hizmet genel bakışındaki **Gönüllülere Metin Gönder** (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`) ve iş akışındaki **Metin Gönder** adım eylemi (`StepActionHelper.sendText` → `sendPersonText`) tümü metni doğrudan kilisenin sağlayıcısı üzerinden gönderir. Bu nedenle bildirim tercihleri ve sessiz saatler bunlara uygulanmaz; yalnızca kişinin `optedOut` bayrağı dikkate alınır. |

Socket veya push'ta kalan okunmamış bildirimler, 30 dakikalık zamanlayıcı (`NotificationHelper.escalateDelivery`) tarafından yükseltilir. Toplu e-posta, `NotificationHelper.sendEmailNotifications(frequency)` tarafından gönderilir ve her kişinin `emailFrequency` tercihine göre tetiklenir: `individual` 30 dakikalık zamanlayıcıda, `daily` ise gece zamanlayıcısında çalışır. (`weekly` geçerli bir tercih değeridir ancak henüz özel bir toplu çalıştırması yoktur.)

## Hatırlatıcı motoru

Zamanlanmış hatırlatıcılar (etkinlik hatırlatıcıları, görev son tarihleri, hizmet ve plan atama hatırlatıcıları) özelliğe özgü cron mantığı yerine tek bir genelleştirilmiş motordan geçer.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Tanımlar** (`reminderDefinitions`) ya varlık düzeyindedir (`entityId` ayarlı, yani belirli bir etkinlik, görev veya plan) ya da kapsam düzeyindedir (`entityId` boş, `scopeId` ayarlı; ör. bir hizmet planı türü altındaki her plan). Bir tanım; dakika cinsinden ofsetlerin CSV'sini (`offsets`, ör. bir gün ve bir saat önce için `"1440,60"`), yerel gönderim saatini (`sendLocalTime`), kanalların CSV'sini (`channels`; `email` içerdiğinde gönderim anında zengin bir e-posta tetiklenir), bir `recipientMode` ve isteğe bağlı bir özel `message` taşır.

**Genişletme**, önümüzdeki ufuk için ateşleme satırlarını oluşturur (kayan, çok günlük bir pencere). Gece zamanlayıcısında çalışır ve bir tanım kaydedildiğinde eşzamanlı olarak da çalışır; böylece son dakika etkinliğinin hatırlatıcısı da ateşlenir. Kapsam tanımları, adaptörün `loadScopeEntities` fonksiyonu aracılığıyla yayılır ve her somut varlık için bir occurrence kümesi üretir. Varlık düzeyindeki occurrence'lar `definitionId:occurrenceISO:offset` anahtarını kullanır; kapsamlı occurrence'lar ise çakışmaması için varlık kimliğiyle ayrı bir ad alanına alınır. Bir occurrence'ı yükseltmek (upsert), daha önce iptal edilmiş bir satırı **diriltir**. Temel varlık değiştikten sonra bir hatırlatıcıyı yeniden senkronize etmenin standart yolu iptal edip yeniden genişletmektir. `sent`, `failed` veya `processing` durumundaki satırlar değiştirilmez.

**Gönderim** (`ReminderEngine.scan()`) 30 dakikalık zamanlayıcıda çalışır. Vadesi gelen occurrence'ları talep eder (bir kiralama, çift işlemeyi önler), alıcıları varlığın adaptörü üzerinden yükler, o occurrence için `reminderSentLog` içinde zaten kayıtlı olanları eler ve `createNotifications` fonksiyonunu `deliveryStartLevel: 1` ile (doğrudan push'a geç) çağırır. Tanımın kanalları e-posta içeriyorsa `emailImmediate` ve `emailByPerson` de eklenir.

### Metin hatırlatıcıları

Bir tanımın `channels` listesi `sms` içerdiğinde `scan()`, aynı yeni alıcılar için push/e-posta bildirimleri oluşturulduktan sonra `ReminderEngine.sendSms()` fonksiyonunu çağırır. Metin gönderimi üye başına isteğe bağlıdır:

- Her alıcı `PreferenceGateHelper.evaluate(..., "sms", ...)` kapısından geçer. Bu nedenle `allowSms` açık olmalıdır (varsayılan olarak kapalıdır ve B1App'teki **Metin mesajları** anahtarından ayarlanır) ve kategorinin `sms` kanalı kapalıya zorlanmamış olmalıdır. `event_reminders`, `serving_schedule` ve `tasks`, hem `defaultChannels` hem de `allowedChannels` içinde `sms` listeler.
- `mobilePhone` alanı olmayan veya `optedOut` ayarlanmış kişiler bastırılır. Kilisenin bir metin sağlayıcısı yoksa grubun geri kalanı `no_provider` nedeniyle bastırılır.
- Mesaj gövdesi `ReminderEngine.smsBody()` tarafından oluşturulur: `"<Church name>: <message> Reply STOP to opt out."`. Tek bir 160 karakterlik segmente kırpılır.
- Her alıcı, `channel: "sms"` ve `sent` / `suppressed` / `failed` durumlarıyla kendi `reminderSentLog` satırını alır. Bu satır push/e-posta satırından ayrı anahtarlanır, böylece başarısız bir metin asla push'u veya e-postayı yeniden göndermez.

Editörler **Metin** seçeneğini yalnızca `GET /messaging/texting/status` `{ enabled: true }` döndürdüğünde sunar (kilisenin ilk metin sağlayıcısı etkindir).

**STOP ile çıkış.** `POST /messaging/texting/inbound/:churchId/:token`, kilisenin sağlayıcısına yapıştırdığı anonim bir webhook'tur. B1Admin, URL'yi metin ayarlarında `GET /messaging/texting/inboundUrl` üzerinden gösterir. Belirteç, kilise kimliğinin bir HMAC'idir (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse`, Twilio tarzı form alanlarını ve Clearstream/TextInChurch tarzı JSON'u kabul eder. Yanıt tam olarak bir taşıyıcı durdurma kelimesiyse (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), cep numarası eşleşen, kaldırılmamış her kişi için `people.optedOut = true` ve `allowSms = false` ayarlanır. Diğer yanıtlar onaylanır ve yok sayılır.

Dahili bir olay veriyolu, gece genişletmesini beklemeden varlık değişikliklerine tepki verir. İçerik olayları (webhook dağıtıcısı üzerinden) ile plan ve görev güncelleme olayları, etkilenen varlık için anında yeniden genişletme veya iptal tetikler. Bir plan güncellemesi ayrıca o planın türüne bağlı kapsam tanımlarını da yeniden genişletir.

### Adaptörler

Motor varlıktan bağımsızdır. Desteklenen her varlık türü bir adaptör (`helpers/adapters/`) aracılığıyla bağlanır:

| Varlık türü | Adaptör | Notlar |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Alıcılar, etkinliğe ve `recipientMode` değerine bağlı olarak kayıt olanlarla veya grup üyeleriyle sınırlandırılır. |
| `plan` | `PlanReminderAdapter` | Alıcılar, yayımlanmış (taslak olmayan) planlardaki Kabul Edilmiş ve Onaylanmamış atamalardır. Bir hizmet onay iş akışı üzerinden verilen Onaylanmamış atamalar, kabul edilene kadar hariç tutulur (aşağıya bakın). `buildEmails`, `DoingModuleGateway.buildPlanReminderEmails` fonksiyonunu çağırır. Bu fonksiyon, `doing/helpers/PlanReminderEmailHelper` aracılığıyla pozisyonları, notları ve özel mesajı oluşturur. Ayrıca `ReminderTokenHelper` tarafından imzalanan ve herkese açık bir atama yanıt uç noktasına gönderen Kabul Et/Reddet düğmelerini ekler. |
| `task` | `TaskReminderAdapter` | Alıcılar, görevin atanan kişileridir. |

### Uç noktalar

| Yöntem | Yol | Amaç |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Tek bir varlık için hatırlatıcı tanımını yükle veya kaydet. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Kapsam düzeyinde (miras alınmış) bir hatırlatıcı tanımını yükle veya kaydet. |
| `DELETE` | `/messaging/reminders/:defId` | Bir tanımı sil ve bekleyen occurrence'larını iptal et. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Kaydetmeden önce bir etkinlik hatırlatıcısı için alıcı sayısını ve sonraki ateşleme zamanlarını önizle. |
| `GET` | `/messaging/reminders/log` | Bir kilise için son hatırlatıcı occurrence geçmişi. |
| `POST` | `/messaging/reminders/mute` | Belirli bir varlık için hatırlatıcıları sessize al. |

Bir tanımı kaydetmek, o varlık veya kapsam için eşzamanlı bir yeniden genişletme tetikler. Böylece editörler, gece işini beklemeden güncel "sonraki ateşlemeleri" görür.

## Doğrudan mesajlar

Doğrudan mesajlar, ayrı bir yükseltme yolu yerine diğer her şeyle aynı huniyi kullanır. Okunmamış her konuşma, tüm teslimat durumunu (socket/push/e-posta yükseltmesi, okundu takibi ve diğer her şey) yöneten tek bir **gölge satır** alır: `notifications` içinde `contentType='privateMessage'`, `contentId` = özel mesaj kimliği, `category='direct_messages'`. `privateMessages` tablosu mesaj içeriğini ve `notifyPersonId` sütununu tutar. Bu sütun okunmamış rozetin kaynağıdır ve alıcı konuşmayı okuduğunda temizlenir.

Gölge satırlar bildirim çanından gizlidir. Okunmamış sayısı sorgusundan, bildirim listesi sorgusundan ve okundu işaretleme/silme sorgularından hariç tutulurlar. Bu sorguların hepsi `contentType <> 'privateMessage'` filtresi uygular. Her DM bildirimi okunmamış durumdan bağımsız olarak socket'e ulaşır (canlı sohbet davranışı, tekilleştirme yok). DM'ler, normal bildirimlerin yaptığı gibi socket teslimatında asla durmaz; çünkü arka plandaki bir PWA socket'i açık tutabilirken hâlâ işletim sistemi düzeyinde push'a ihtiyaç duyabilir. Bir kişi DM bildirimlerini sessize alırsa gölge satır park edilir (`isNew=false`, `notifyPersonId` temizlenir). Satır konuşmanın içinde hâlâ görünür, yalnızca rozet veya uyarı olmadan.

## Tercihler ve kapılama

Her gönderim `PreferenceGateHelper.evaluate()` fonksiyonundan geçer. Bu saf bir fonksiyondur: tüm durum parametre olarak geçirilir ve sıcak yolda veritabanı çağrısı yoktur. Fonksiyon `allow`, `suppress` veya `defer` döndürür. Katmanlar sırayla çalışır ve karar veren ilk katman kazanır:

1. **Kilitli kategori**: Bazı kategoriler zorunludur (kademe 0) ve diğer tüm katmanları atlar.
2. **Genel sessize alma / kanal kapatma**: `masterMute`, `allowPush`, `allowSms` (varsayılan olarak kapalıdır, üyeler katılır) veya `emailFrequency='never'` doğrudan bastırır.
3. **Sessiz saatler**: Yalnızca push ve SMS için geçerlidir (e-posta müdahaleci olarak kabul edilmez). Kişinin saat dilimindeki duvar saati sessiz penceresine düşerse işlemsel bir kategori yine ulaşır. İşlemsel olmayan bir kategori ise sessiz pencerenin sonuna ertelenir. Bu son an, `TimezoneHelper.wallClockToUtc` aracılığıyla DST'ye uygun bir UTC anı olarak hesaplanır.
4. **Kategori başına tercih geçersiz kılma**: Bir kategori × kanal çifti için açık bir devre dışı bırakma. Yokluğu, kategorinin varsayılanı anlamına gelir.
5. **Varlık başına sessize alma**: Belirli bir varlık için (ör. bir etkinlik veya bir plan) kaydedilmiş sessize alma, kategori düzeyindeki ayardan daha fazla kısıtlama getirir. Ancak yalnızca çağıran, bildirimle birlikte bir varlık kimliği ve türü sağlarsa uygulanır.

İlgili tablolar: `notificationPreferences` (genel; `masterMute`, `emailFrequency` değerleri `individual|daily|weekly|never`, `allowPush`, sessiz saat penceresi ve saat dilimi, `allowSms`), `notificationPreferenceOverrides` (kategori × kanal başına) ve `notificationEntityMutes` (varlık başına).

Bu kapı, huni içinde uygulama içi (0. seviye), push (1. seviye) ve e-posta (2. seviye) için uygulanır. Buna anlık hatırlatıcı ve özet e-postaları da dahildir. Ayrıca `ReminderEngine.sendSms()` içindeki hatırlatıcı metinleri için de uygulanır. İşlemsel e-posta (doğrulama kodları, şifre sıfırlamaları, davetler, bağış makbuzları) tasarım gereği bu kapıyı atlar. İkinci kapının var olma nedeni budur.

### Hizmet onay iş akışları

Bir plan, `workflowType = "assignmentConfirmation"` iş akışına (`plans.confirmationWorkflowId`) katılabilir. Yayımla/Bildir, atama başına bildirim yerine `POST /doing/plans/:id/issueRequests` çağrısını yapar. Her yeni Onaylanmamış atama `notified` ve `confirmationWorkflowId` alır ve bir iş akışı kartı oluşturulur (`tasks.assignmentId`, benzersiz `followupKey`). Kart yalnızca uygulama içi bir uyarı gönderir (`appOnly: true`, yani push/e-posta yükseltmesi yoktur) ve ardından iş akışının `sendAssignmentRequest` eylemlerini çalıştırır. Bunlar `MessagingModuleGateway.sendServingWorkflowMessage` üzerinden gider: e-posta `NotificationHelper.sendWorkflowEmail` ile (tercih kapısı ve `ChurchEmailLimiter`, `workflowEmail` olarak ölçülür), SMS ise yalnızca `allowSms` ve `serving_schedule` kategori kapısıyla `sendPersonText` üzerinden gönderilir. Kabul Et/Reddet (olay veriyolunda `assignment.updated`) kartı kapatır. 30 dakikalık zamanlayıcı (`AssignmentWorkflowHelper.processPending`) kaçırılmış başlangıçları ve olayları onarır. Takip süresinde yanıtsız kalan bir isteği ise bir lider inceleme görevine dönüştürür. Tam yaşam döngüsü: `Api/docs/assignment-confirmation-workflows.md`.

## Kilisenin yazdığı e-posta sınırları

Bir kilisenin yazdığı içerik içeren e-posta, paylaşılan ChurchApps SES kimliğinden gönderilir. Bu nedenle `Api/src/shared/helpers/ChurchEmailLimiter.ts` tarafından kilise başına ölçülür. Dört yol bunu çağırır: grup ve şablon gönderimleri (`EmailTemplateController`, içerik türü `email`), form takip e-postaları (`FormSubmissionController`, `formFollowUp`), iş akışı **E-posta Gönder** eylemleri (`churchAuthored` ile `NotificationHelper`, `workflowEmail`) ve hizmet onayı istek e-postaları (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Sistem postası (doğrulama kodları, makbuzlar, hatırlatıcılar) ile rol ve grup davetleri (`UserController.sendInviteEmail`, sabit bir şablon) ölçülmez.

- **Onay kapısı.** Bir sunucu yöneticisi `churches.emailApprovedDate` alanını ayarlayana kadar kilise hiçbir şey göndermez (`POST /membership/churches/:id/emailApproval`, Sunucu Yöneticisi → Kiliseler → **Grup E-postası** çipi). Arşivlenmiş kiliseler her zaman engellenir. B1Admin'in E-posta Gönder iletişim kutusu `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) değerini okur. Onaylanmamışsa editör yerine bir **İnceleme iste** kartı gösterir. İş akışı adım editörü de aynı uç noktayı okur. Onaylanmamış veya duraklatılmış kiliselerde **E-posta Gönder** eylemleri için uyarı vermek üzere bu uç nokta `tasks.admin` ile birlikte `groupMembers.edit` yetkisine de açıktır. Gönderim anında, `ChurchEmailLimiter.remaining()` 1'in altındaysa `MessagingModuleGateway.sendTemplatedEmail` bildirim oluşturmadan `false` döndürür. Böylece kartın geçmişi, düşürülmüş bir e-posta için **E-posta gönderildi** demez. `POST /messaging/emailTemplates/requestApproval`, kilise başına haftada en fazla bir kez destek ekibine e-posta gönderir.
- **Kazanılmış kota.** Onaylanmış bir kilise, önceki 30 gündeki en iyi kilise yazımlı günün 2 katı ile 150'nin büyüğünü alır. Bu değer kayan 24 saat başına 2.000 ile sınırlıdır. Mevcut 24 saat "en iyi gün" hesabından hariç tutulur, böylece bir gönderim patlaması kendi sınırını yükseltemez.
- **Ayır, sonra kesinleştir.** `reserve()`, göndermeden önce alıcı başına bir `deliveryLogs` satırı yazar. Bu satırlar sayılarak kota yeniden kontrol edilir. İki istek sınırı aşmak için yarışırsa geri çekilir ve gönderim 429 döndürür. `settle()` her satırı gönderildi veya başarısız olarak işaretler.
- **Şikayet duraklatması.** `sesFeedback` Lambda'sı (`Api/src/lambda/ses-feedback-handler.ts`, SES → SNS ile beslenir), her kalıcı geri dönüşü veya şikayeti, o adrese yakın bir zamanda kilisenin yazdığı e-postanın ulaştığı kiliseye bağlar. Bu kayıt `deliveryMethod` olarak `sesBounce` veya `sesComplaint` ile saklanır. Bir kilise, 7 gün içinde 2 veya daha fazla şikayette (gönderimlerin en az %0,3'ü) ya da 10 veya daha fazla sert geri dönüşte (en az %5) duraklatılır.

## Zamanlama

Hem hatırlatıcı motoru hem de bildirim özeti, yeni altyapı eklemek yerine mevcut zamanlanmış zamanlayıcılar üzerinde çalışır:

| Zamanlayıcı | Zamanlama | Çalıştırdıkları |
|-------|----------|----------|
| 30 dakikalık zamanlayıcı | Her 30 dakikada bir | Okunmamış bildirimleri yükselt; `individual` sıklığındaki özet e-postalarını gönder; vadesi gelen hatırlatıcı occurrence'larını gönder (`ReminderEngine.scan`); onay özetleri; vadesi gelen otomasyon yürütmeleri |
| Gece zamanlayıcısı | 05:00 UTC | Grup yoklama hatırlatıcıları; tekrarlayan yayınları ilerlet; otomatik yenilenen listeleri yenile; bir sonraki ufuk için hatırlatıcı occurrence'larını genişlet (`ReminderEngine.expandAll`); `daily` sıklığındaki özet e-postalarını gönder |

Yerelde aynı mantık, `Api` projesinden `npm run timer:30min` ve `npm run timer:midnight` komutlarıyla isteğe bağlı olarak tetiklenebilir.

## Dosya envanteri

| Alan | Dosyalar |
|------|-------|
| Huni | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Ortak giriş noktası | `Api/src/shared/helpers/NotificationService.ts` |
| İşlemsel kapı | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, lint kuralı `Api/tools/eslint-rules/email-door.cjs` |
| Kilise e-posta sınırları | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Hatırlatıcı motoru | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Metin / STOP ile çıkış | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (hizmet genel bakışındaki **Gönüllülere Metin Gönder**) |
| Hatırlatıcı depoları | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Hizmet/plan e-postası | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Hatırlatıcı editörleri (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Hatırlatıcı editörü / tercihler (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## İlgili sayfalar

- [Gerçek Zamanlı Mimari](../realtime): Yerel uygulama içi teslimat seviyesinin üzerinde çalıştığı WebSocket protokolü ve istemci ilkel öğeleri (`SocketHelper`, `SubscriptionManager`, `ConversationStore`)
- [Web Push Bildirimleri](../web-push): Push yükseltme seviyesinin kullandığı VAPID kurulumu ve tarayıcı Push API yolu
- [Mesajlaşma Uç Noktaları](../api/endpoints/messaging): Mesajlar, konuşmalar, bağlantılar ve bildirim/hatırlatıcı yolları için tam REST yüzeyi

---
title: "Twilio BYOK (Öneri)"
description: "Önerilen, kiliseye ait Twilio entegrasyonu, rıza modeli, uygulama kapsamı ve yayın ölçütleri."
---

# Twilio BYOK entegrasyonu önerisi

:::caution Öneri — kullanılabilir bir entegrasyon değil
Bu, bakım sorumlularının incelemesi için hazırlanmış bir tasarımdır ve 22 Ekim 2026'da incelenen herkese açık kaynak kodu ile Twilio dokümantasyonuna dayanmaktadır. O tarihten bu yana temel bir Twilio sağlayıcısı yayımlandı (`@churchapps/texting` 0.6.0 ve B1 Admin **Ayarlar > Metin mesajlaşma**): kilise Account SID, Auth Token ve bir Gönderen numarası girer. Sağlayıcı ayrıca `MG` ile başlayan 34 karakterlik bir Messaging Service SID'ini de kabul eder, ancak `fromNumber` sütunu hâlâ `varchar(20)` olduğu için bu SID'e yetmez. Mesajlar Twilio'nun Messages API'si üzerinden alıcı başına bir istekle gönderilir ve STOP yanıtları mevcut gelen web kancası üzerinden B1'e ulaşır. Bkz. [Kilise Ayarları: Metin mesajlaşma](../../b1-admin/settings/church-settings.md#texting). Aşağıdaki rıza modeli, Gelişmiş Opt-Out işleme, teslimat durumu ve kurulum hazırlık kontrolleri hâlâ önerilerdir, yayımlanmış davranış değildir. [Kilise başlangıç taslağı](./twilio-byok-onboarding-draft.md) önerilen kurulum yönergelerini ve kiliseye özgü örnekleri içerir.
:::

## Önerilen yol

B1'in mevcut metin mesajı sağlayıcı sistemine Twilio eklenmelidir. Bunun için **kiliseye ait bir Twilio hesabı, API kimlik bilgileri, bir Messaging Service ve SMS destekli bir telefon numarası** kullanılmalıdır. Kilise, kendi yasal tüzel kişiliğini ve mesajlaşma kampanyasını kaydettirir, Twilio'ya doğrudan öder, alıcı rızasını sürdürür ve onayı Twilio Console içinde yönetir. ChurchApps entegrasyonu ve belgeleri sağlar.

Her B1 kilisesi için ilk aşamada bir mesajlaşma programı, bir Messaging Service ve bir ABD yerel 10DLC göndericisiyle başlanmalıdır. Mevcut B1 ekranları üzerinden tekil mesajlar, grup mesajları, iş akışı mesajları ve katılım hatırlatmaları desteklenmelidir. Makul bir ilk program; ibadet değişikliklerini, etkinlik hatırlatmalarını ve gönüllü planlamasını kapsar. Ancak bu üçü de o kilisenin rıza metninde ve onaylı kampanyasında açıklanmış olmalıdır. Bağış toplama veya tanıtım mesajları ayrıca değerlendirilmiş bir kapsam ve rıza gerektirir; bunlar bu programa sessizce eklenmemelidir.

| Sorumluluk | Kilise | B1 / ChurchApps |
|---|---|---|
| Twilio hesabı, faturalandırma, numara sahipliği | Bunları sahiplenir ve yönetir | Platform hesabı sağlamaz ve kredi yeniden satmaz |
| Marka, kampanya, numara kaydı | Doğru kilise bilgilerini sunar; inceleme ve düzeltmeleri yönetir | Ön koşulları açıklar ve mevcut hazırlık bilgilerini okur |
| Kayıt sayfası, politikalar, mesaj amacı | Bunları yayımlar ve sürdürür | Uyumlu form kontrolleri, örnekler ve rıza kayıtları sağlar |
| Alıcı uygunluğu ve STOP işlemi | Rıza kanıtlarını inceler ve SMS dışında alınan talepleri ister | Rızayı, engellemeyi, izinleri ve imzalı web kancalarını uygular |
| Teslimat ve destek | Twilio hatalarını, hesap sağlığını ve gelen yanıtları izler | Gönderim ve teslimat durumunu, onay garantisi iddia etmeden gösterir |

Şu konular ertelenmelidir: ChurchApps'e ait bir Twilio ana hesabı, müşteri alt hesapları, numara satın alma, Trust Hub gönderimleri, faturalandırma, sohbet gelen kutusu, MMS/WhatsApp, uluslararası gönderim ve ücretsiz numara (toll-free) kurulumu. Ücretsiz numara, kayıt sürecini atlatmanın bir yolu değil, ayrı bir doğrulanmış gönderici yoludur. Bu sınırlar, ilk sürümün B1'in mevcut "kendi sağlayıcını getir" modeliyle uyumlu kalmasını sağlar.

## Mevcut temel ve eksikler

Aşağıdaki gözlemler, mevcut dağıtımda neyin çalıştığına dair bir varsayıma değil, kaynak kodu anlık görüntülerine dayanır:

| Bileşen | Mevcut davranış | Sonuç |
|---|---|---|
| [Sağlayıcı kaydı ve sözleşmesi](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` tekil ve toplu gönderimleri, doğrulamayı, isteğe bağlı abone/liste yeteneklerini ve sonuçlarda bir sağlayıcı mesaj kimliğini destekler. Kayıtlı bir Twilio adaptörü yoktur. | Twilio'yu `@churchapps/texting` içine ekleyin. Abone oluşturma veya sağlayıcı yönetimli listeler gerekmez. |
| [Metin mesajlaşma ayarları](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church ve Nalo seçilebilir; MinistryStuff özellik kapısıyla kısıtlıdır. Gönderici düzenleme ve kaydetme şu anda yalnızca Nalo'ya özgüdür. | Açık Twilio alanları, doğrulama, gönderici kaydetme ve kurulum yardımı ekleyin. Yalnızca açılır menüye bir giriş eklemek yeterli değildir. |
| [Denetleyici](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) ve [modül geçidi](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Kimlik bilgileri şifrelenir ve maskelenir; manuel ve otomatik gönderimler bir kilisenin sağlayıcısını çözümler. Grup gönderimleri ortak telefon numaralarını tekilleştirir. | Bu yolları yeniden kullanın ve yetkilendirmeyi koruyun. Yeni rıza ve hazırlık kapılarını ortak bir sunucu yoluna koyun; böylece iş akışları bunları atlayamaz. |
| [STOP yardımcısı](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Twilio tarzı `From`/`Body` alanlarını ayrıştırır; kilise URL belirtecini doğrular; `person.optedOut` değerini ayarlar ve SMS hatırlatmalarını devre dışı bırakır. Diğer yanıtlar yok sayılır. | Bu kullanışlı bir başlangıç noktasıdır, ancak eksiksiz bir Twilio web kancası değildir. Twilio imzaları ve bağımsız SMS abonelik durumu ekleyin. |
| [Mesajlaşma şeması](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | `apiKey`, `apiSecret` ve 20 karakterlik bir `fromNumber` saklar. Teslimat kayıtları yalnızca anlık başarı veya hata bilgisini tutar; sağlayıcı kimliklerini veya son teslimat durumlarını tutmaz. | E.164 gönderici uygundur. 34 karakterlik bir Messaging Service SID'i için ayrı bir alan gerekir. Kalıcı sağlayıcı mesaj ve durum depolaması ekleyin. |
| [Herkese açık form sayfası](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [ortak form işleyicisi](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) ve [gönderim denetleyicisi](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Kısıtlanmamış formlar ve isteğe bağlı onay kutuları vardır. Açıklamalar düz metindir. Gönderimler yanıtları saklar, ancak metin mesajı yolunda kampanyaya özgü bir rıza defteri yoktur. | Gerçek politika bağlantılarıyla yapılandırılmış bir SMS rıza kontrolü ve sunucu tarafında kanıt yakalama ekleyin. Genel bir onay kutusu veya grup üyeliği SMS'i otomatik olarak yetkilendirmemelidir. |

[Kilise ayarları belgeleri](../../b1-admin/settings/church-settings.md#texting) ayrıca mevcut opt-out bayrağının dizin gizliliğiyle paylaşıldığını açıklar. Bu bağlantı bir yayın kaygısıdır: START yanıtı hiçbir zaman dizin görünürlüğünü değiştirmemelidir.

## Yapılandırma ve kimlik bilgisi tasarımı

`fromNumber` alanını aşırı yüklemek veya bir API anahtarı dizesinde yapılandırılmış veri saklamak yerine açık ve eklemeli yapılandırma alanları kullanılmalıdır:

| Alan | Önerilen amaç |
|---|---|
| `accountSid` | Kiliseye ait Twilio hesabı veya proje tanımlayıcısı (`AC…`) |
| `apiKey`, `apiSecret` | Giden API erişimi için ayrılmış Twilio API Key SID (`SK…`) ve gizli anahtarı; şifrelenir ve maskelenir |
| `webhookAuthToken` | Twilio SDK'nın gelen imzaları doğrulamak için kullandığı hesap Auth Token'ı; ayrıca şifrelenir ve maskelenir |
| `messagingServiceSid` | Kilisenin Messaging Service'i (`MG…`, 34 karakter) |
| `fromNumber` | Seçilen, SMS destekli numara; E.164 biçiminde ve o hesapta veya serviste gönderici olarak doğrulanmış |
| Program yapılandırması | Kararlı program kimliği, adı, izin verilen amaçlar, kayıt ve politika URL'leri ile açıklama sürümü |

Twilio, REST kimlik doğrulaması için [API anahtarlarını tercih eder](https://www.twilio.com/docs/iam/api-keys). Gönderimi ve gerekli salt okunur kurulum kontrollerini kapsayan, test edilmiş en dar anahtar izinlerini kullanın. Hesap Auth Token'ı yine de [standart Twilio web kancası imza denetimi](https://www.twilio.com/docs/usage/security) için gereklidir. Bu ayrımı arayüzde açıklayın: bir API gizli anahtarı, web kancası Auth Token'ı değildir. Kimlik bilgileri yalnızca sunucu tarafı ayar deposunda tutulmalıdır. Herkese açık sayfalarda, form yanıtlarında, tarayıcı gönderim isteklerinde veya destek kayıtlarında asla bulunmamalıdır.

Kilise bu kaynakları Console içinde oluşturur ve yönetir. B1'in doğrulama eylemi yalnızca yapılandırılmış servisi, göndericileri ve kayıt bilgilerini okumalıdır. Yan etki olarak numara satın almamalı, kampanya oluşturmamalı, Twilio ayarlarını değiştirmemeli veya test mesajı göndermemelidir. Uygun ve rıza vermiş bir alıcıyla sınırlı, ayrı bir açık test gönderme eylemi sağlanmalıdır.

Maskelenmiş kimlik bilgileri yalnızca aynı kayıtlı sağlayıcı düzenlenirken korunmalıdır. Twilio'ya geçiş kendi kimlik bilgilerini gerektirmeli ve eski sağlayıcıya özgü değerleri temizlemelidir. Maskelenmiş bir Clearstream veya Nalo anahtarı Twilio yapılandırmasına taşınmamalıdır.

Her yükleme ve güncelleme doğrulanmış B1 kilisesiyle sınırlandırılmalıdır. Geri çağrılar kayıtlı bir entegrasyona ve beklenen Twilio hesabına, servisine veya göndericisine bağlanmalıdır. Çakışan kiliseler arası atamalar reddedilmelidir. Kimlik bilgisi döndürme ve sağlayıcı bağlantısının kesilmesi hazırlık durumunu geçersiz kılmalı ve kuyruktaki gönderimleri durdurmalıdır; ancak rıza veya geçmiş teslimat kayıtlarını silmemelidir.

## Rıza ve engelleme zorunlu yayın işidir

Twilio programı için telefon numarasına bağlı abonelik kayıtları ile yalnızca eklenebilen rıza ve engelleme olayları tanıtılmalıdır. Önerilen asgari kanıt şunlardır: kilise kimliği, program kimliği, normalleştirilmiş telefon, isteğe bağlı doğrulanmış kişi ilişkisi, olumlu eylem, kaynak form veya gönderim kimliği ya da incelenmiş dış kanıt, sunucu zaman damgası, açıklama metni ve sürümü, kaynak URL'si, politika URL'leri ve geri çekme veya yeniden başlatma olayları. Erişim ve saklama, mevcut kilise veri güvenliği politikası kapsamında sınırlandırılmalıdır.

Durumlar `unknown`, `pending`, `active` ve `suppressed` gibi olmalıdır. Mevcut mobil numaralar, içe aktarılan kişiler, yoklamalar, bağışlar, grup üyelikleri, `person.optedOut = false` ve `allowSms` alanları program için olumlu rıza değildir. Belgelenmiş rızanın içe aktarılması, kaynağı kaydedilen, yetkilendirilmiş ve denetlenen bir eylem olmalıdır. Bir geçiş herkesi kaydetmemelidir.

İlk web akışı için B1'in standart herkese açık form modu kullanılmalıdır. Açıkça yapılandırılmış bir SMS rıza sorusu eklenmelidir. Bu soru işaretsiz başlamalı, isteğe bağlı kalmalı, tıklanabilir politika bağlantıları göstermeli ve bir program ile bir mobil alana eşlenmelidir. Bu eşleme sunucuda doğrulanmalı ve olumlu bir yanıt kaydedildiğinde gösterilen açıklama anlık görüntüye alınmalıdır. Rıza hiçbir zaman rastgele soru etiketlerinden, konuşma yapay zekâsından veya iş akışı üyeliğinden türetilmemelidir. Konuşma tabanlı bir eşdeğer, açık olumlu etkileşim ve kanıt kaydı test edildikten sonra etkinleştirilmelidir.

İşaretlenmemiş bir gönderim abonelik oluşturmamalı ve başkasının mevcut rızasını geri çekmemelidir. Rıza gönderilen telefona bağlanmalıdır. Belirsiz kişi ilişkileri personel tarafından, hane kayıtlarını birleştirmeden çözülebilmelidir. Değişen mobil numara kendi rızasını gerektirir. Anonim formlar için kötüye kullanım denetimleri uygulanmalı ve numara sahipliği doğrulaması veya çift onay adımı açıkça belirtilmelidir. İşaretli bir kutu, bir telefonun kime ait olduğunu kanıtlamaz. Onay kullanılıyorsa abonelik tamamlanana kadar beklemede kalmalı ve bu tam akış kayıt materyallerinde açıklanmalıdır.

Twilio için SMS engellemesini dizin görünürlüğünden ayırın. Mevcut herhangi bir opt-out, bir engelleme kaydına muhafazakâr biçimde taşınmalıdır. Diğer eski alıcılar `unknown` olarak bırakılmalıdır. Açık, belgelenmiş yeni bir kayıt SMS rızasını oluşturabilir; dizin gizliliği ise değişmeden kalır. Diğer sağlayıcıların davranışı, geçişleri ayrıca incelenene kadar korunmalıdır.

Her gerçek gönderimde şunlar gerekir: kilise entegrasyonu etkin ve hazır olmalı, tam telefon için güncel program rızası bulunmalı, telefon düzeyinde engelleme olmamalı ve mevcut çağıranın izni bulunmalıdır. Hatırlatmalar ayrıca `allowSms`, kategori tercihlerini ve sessiz saatleri dikkate almalıdır. Kuyruğa alındıktan sonra yeniden kontrol edilmeli, birleştirme alanları çözülmeli, numaralar normalleştirilip doğrulanmalı ve telefona göre tekilleştirilmelidir. STOP, manuel gönderimler ve iş akışları dahil olmak üzere servis veya program için tüm gönderimleri engellemelidir. Aynı telefonu paylaşan her kişiyi de kapsamalıdır.

Kilise kimliği ve STOP talimatı ortak Twilio gönderim yolunda tutarlı biçimde işlenmeli ve son SMS veya segment sayısı önizlenmelidir. Birleştirme alanı genişletme ve uzunluk işlemleri bu öğeleri korumalıdır. Opt-out talimatı sessizce kesilmemelidir. Örnekler ile gerçek hatırlatma ve iş akışı şablonları uyumlu tutulmalıdır.

## Twilio gönderimleri, yanıtları ve teslimat durumu

`TwilioProvider.sendMessage`, Messages API üzerinden, seçilen Messaging Service ve göndericiyle uygulanmalıdır. Bir Twilio mesaj SID'i ve kabul edildi veya gönderildi sonucu döndürülmelidir. HTTP kabulü cihaza teslimat anlamına gelmez. Grup gönderimi, girdi sırasıyla alıcı başına sonuç üretmelidir.

Hem `sendBulk` hem de tekil gönderimler için giden eşzamanlılık sınırlandırılmalıdır. Mevcut birleştirme alanı dalı `sendMessage` çağrılarını dağıtır. Bir istek bütçesine sığmayan gruplar için gönderim niyeti ve talep edilebilir işler kalıcı olarak saklanmalıdır. Kiliselerin başka bir servis çalıştırmasını gerektirmek yerine mevcut dağıtım modeli yeniden kullanılmalıdır. Bilinen geçici hatalar ve hız sınırı hataları geri çekilmeyle yeniden denenmelidir. Belirsiz zaman aşımları bilinmeyen sonuçlar olarak ele alınmalı ve çift mesaj ile çift ücret riskini almak için körlemesine yeniden gönderilmemelidir.

Kiliseye özgü gelen ve durum geri çağrı URL'leri yapılandırılmalıdır. `X-Twilio-Signature`, SDK, yapılandırılmış dış URL'nin tamamı, özgün form parametreleri ve eşleşen hesap Auth Token'ı ile doğrulanmalıdır. Yalnızca gizli bir URL yetersizdir. Geri çağrılar kayıtlı kilise, hesap ve mesaj kayıtlarıyla eşleştirilmelidir. Yinelenen olaylar ile gönderim sonucu kaydedilmeden önce gelen geri çağrılar işlenmelidir. Eski olayların son bir durumun üzerine yazması engellenmelidir. Gelen yanıt için boş TwiML, durum olayları için uygun bir başarı yanıtı döndürülmelidir. ([Twilio güvenliği](https://www.twilio.com/docs/usage/security), [durum geri çağrıları](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status))

Twilio **Gelişmiş Opt-Out** özelliği önerilir. STOP, START ve HELP onaylarını Twilio yönetir. B1, kimliği doğrulanmış `OptOutType` olaylarını tüketir ve yinelenen onay göndermez. STOP engellemeyi hemen kaydeder. START yalnızca bilinen bir aboneliği, aynı açıklanmış programa geri getirir ve yeni bir yeniden başlatma olayı oluşturur. Yeni bir telefonu ilgisiz mesajlaşmaya kaydetmemeli veya hatırlatma tercihlerini açmamalıdır. HELP kimseyi kaydetmez. Diğer gelen yanıtlar B1 gelen kutusu kapsamının dışında kalır. Kiliselerin bunları Twilio içinde izlemek için belgelenmiş bir yolu olmalıdır. ([Gelişmiş Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out))

Twilio mesaj SID'i, hesap ve servis bağlaması, gönderim zamanı, son durum ve hata kodu ile geri çağrı zamanı, teslimat kaydının yanında saklanmalıdır. Sıraya alındı veya kabul edildi, teslim edildi, başarısız, teslim edilemedi ve bilinmiyor durumları doğru gösterilmelidir. Diğer sağlayıcılar için mevcut yanıt sözleşmesi korunmalıdır. Toplam başarı sayılarının gönderimi mi yoksa teslimatı mı temsil ettiği tanımlanmalıdır.

## Kurulum hazırlığı ve onay doğrulaması

Kimlik bilgileri, servis ve gönderici sahipliği, kampanya doğrulaması, numara kaydı, web kancası denetimleri ile teslim edilmiş bir duman testi için ayrı kontrol noktaları gösterilmelidir. Kimlik bilgileri çalıştığı için tek bir yeşil "onaylandı" rozeti asla gösterilmemelidir.

ABD yerel numaraları için servisin [Usa2p kampanya kaynağı](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) okunmalı ve ilgili kampanyanın `VERIFIED` olması gerekmelidir. Seçilen telefonun o servise bağlı olduğu ve numara kaydını tamamladığı ayrıca doğrulanmalıdır. Onaylı bir kampanyada numara hâlâ beklemede olabilir. Desteklenen bir okuma API'si gerekli bir sinyali göstermiyorsa **manuel Console doğrulaması gerekli** olarak gösterilmeli ve kilise yöneticisinin tarihli onayı bu şekilde kaydedilmelidir. Bu onay API ile doğrulanmış olarak etiketlenmemelidir. Otomatik numara kaydı olayları ileriki bir iş olabilir. ([Numara kaydı hataları](https://www.twilio.com/docs/api/errors/30035), [A2P kayıt olayları](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup))

Gönderimleri etkinleştirmeden önce güncel kontroller gerekmelidir. Kontrolün ne zaman ve nasıl yapıldığı kaydedilmeli, eski kontrollerin süresi dolmalıdır. İptal edilmiş kimlik bilgileri, değişen göndericiler, kayıt hataları veya kalıcı hesap hataları durumunda gönderim durdurulmalıdır. Duman testinin teslim edilmesi yalnızca test edilen yolu doğrular. Evrensel taşıyıcı onayını veya alıcı rızasını doğrulamaz. Eşlik eden taslak, kilisenin gönderim öncesi, yayın öncesi ve sürekli operasyonel kontrollerini tanımlar.

## Depo ve yayın planı

[Organizasyon katkı rehberi](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md), B1 özellik isteklerini ChurchAppsSupport'a ve uygulama PR'larını sahip depolara yönlendirir. Tek bir merkezi özellik isteği kullanılmalı ve odaklanmış uygulama PR'ları buna bağlanmalıdır:

1. **ChurchAppsSupport:** Twilio'yu kullanılabilir bir kullanıcı özelliği olarak sunmadan önce bu tasarımı ve kurulum taslağını inceleyin.
2. **Packages:** Twilio adaptörünü, açık ortak yapılandırma ve arayüzleri ile B1Admin ve B1App tarafından paylaşılan SMS rıza formu oluşturmasını ekleyin. Değişiklik kayıtları (changeset) dahil edilmeli ve tüketicileri güncellemeden önce mevcut yayın iş akışıyla yayımlanmalıdır.
3. **Api:** Entegrasyon meta verileri, rıza ve engelleme ile teslimat durumları için eklemeli geçişler ekleyin. Yapılandırma doğrulamasını, ortak gönderim kapılarını, form kanıt yakalamayı, web kancası işlemeyi ve gönderim kalıcılığını uygulayın.
4. **B1Admin:** Twilio yapılandırma ve hazırlık arayüzünü, program ve rıza yönetimini, sağlayıcıya duyarlı gönderici kaydetmeyi ve doğru teslimat raporlamasını ekleyin. Sıradan kişi düzenlemeleri üzerinden hiçbir SMS rıza geçersiz kılma imkânı sunulmamalıdır.
5. **B1App:** Herkese açık form ve sayfa ile politika bağlantısı deneyimini, anonim ve mobil ziyaretçiler dahil, ortak kontrollere karşı doğrulayın. Ayrı bir Twilio tarayıcı istemcisi gerekmez.
6. **ChurchAppsSupport:** Yayından sonra kurulum taslağını desteklenen ayar ve yardım sayfalarına dönüştürün, gerçek ekran görüntüleri ekleyin, bunu Metin mesajlaşma ayarlarından bağlayın ve çevirileri düzenleyin.

Şema ve ortak paketler, tüketicilerden önce dağıtılmalıdır. Twilio küçük, isteğe bağlı bir pilot için özellik kapısıyla kapalı tutulmalıdır. Mevcut sağlayıcılar çalışmaya devam etmelidir. Geri alma, Twilio gönderimini devre dışı bırakmalı ve gönderilmemiş işleri iptal etmelidir; ancak engellemeleri ve kanıtları korumalıdır. Alıcıları otomatik olarak farklı bir sağlayıcıya veya göndericiye geçirmemelidir.

## Çaba değerlendirmesi

Bu, ekosistemi bilen bir katkıcı için planlama tahminidir. Bu değerlendirmede üretim kimlik bilgileri veya canlı SMS kullanılmamıştır:

| İş | Geliştirici günü |
|---|---|
| Adaptör, yapılandırma ve şema genişletmeleri, ayar arayüzü | 2–3 |
| Telefon ve program rızası, bağımsız engelleme, ortak gönderim kapıları, herkese açık form entegrasyonu | 3–5 |
| İmzalı geri çağrılar, teslimat kalıcılığı, sınırlandırılmış ve dayanıklı gönderim | 2–3 |
| Hazırlık arayüzü, kilise rehberi, entegrasyon ve regresyon testi, pilot düzeltmeleri | 3–4 |
| **Önerilen yayın kapsamı** | **Toplam 10–15** |

Temel bir adaptör ve ayar kavram kanıtı yaklaşık 1–2 gündür. Yalnızca gönderici odaklı bir tahmin, bu öneri için gerekli rıza ve kurulum işini kapsamaz. Harici Twilio ve taşıyıcı inceleme süresi ayrıdır ve değişkendir. Proje bir onay tarihi veya onay sonucu vaat etmemelidir.

## Kabul ölçütleri

- [ ] Kilise hesabı, servisi, kayıtlı göndericiyi ve kampanyayı sahiplenir ve öder. ChurchApps tarafından yönetilen bir Twilio hesabı gerekmez.
- [ ] Kimlik bilgileri şifrelenir ve maskelenir, kiracıya özgüdür, döndürülebilir ve günlüklerde veya herkese açık içerikte bulunmaz. Doğrulama salt okunurdur.
- [ ] İşaretlenmemiş isteğe bağlı rıza, gerçek politika bağlantılarını gösterir ve program, telefon ile açıklama kanıtını sunucuda kaydeder. Reddetmek yine de birincil form eylemine izin verir.
- [ ] Tüm manuel, grup, birleştirme alanı, iş akışı ve hatırlatma yolları aynı Twilio uygunluk kapısını uygular. Bilinmeyen, rızası olmayan, telefonu değişen veya engellenmiş alıcılar faydalı bir nedenle atlanır. Genişletme ve uzunluk işlemlerinden sonra kilise kimliği ve STOP talimatları korunur.
- [ ] Eski dizin gizliliği alıcıları kaydetmez. STOP ve START dizin görünürlüğünü veya ilgisiz tercihleri asla değiştirmez. Ortak telefon ve kiliseler arası durumlar test edilmiştir.
- [ ] İmzalı STOP, START ve HELP, geçersiz imzalar, yanlış hesaplar veya servisler, yinelenen olaylar, tekrar oynatılan form gönderimleri ve sahte rıza eşlemeleri kapsanmıştır.
- [ ] Grup boyutu ve zaman aşımları, hız sınırları, kısmi hatalar, belirsiz sonuçlar, geri çağrı yarış durumları ile sıra dışı teslimat olayları, yinelenen gönderim olmadan test edilmiştir.
- [ ] Kampanya onayı ve tamamlanmış numara kaydı, kimlik bilgisi doğrulamasından ayrıdır. Manuel kanıt açıkça etiketlenir. Eski veya iptal edilmiş hazırlık, gönderimleri engeller.
- [ ] Bir pilot kilise, kayıt sayfasını, reddedilen ve kabul edilen form yollarını, tam politika URL'lerini ve rıza vermiş bir test alıcısını gönderimden teslimata, STOP engellemeye ve izin verilen yeniden aboneliğe kadar kontrol eder.
- [ ] Mevcut Clearstream, Text In Church ve Nalo ayarları ile gönderim davranışı regresyon kontrollerinden geçer. Yardım metinleri önerileri yayımlanmış özelliklerden ayırt eder.

---
title: "Twilio Kilise Katılım Süreci (Taslak)"
description: "B1 kilisesine ait Twilio kurulumu, herkese açık kayıt yönergeleri, kampanya örnekleri ve onay kontrol listesi için taslak."
---

# Kiliseye ait Twilio katılım taslağı

:::caution Önerilen entegrasyon için taslak
Bu, önerilen bir iş akışıdır. B1 artık **Ayarlar > Metin Mesajlaşma** altında temel bir **Twilio** seçeneği sunuyor (Account SID, Auth Token, Gönderici Numarası ve gelen STOP webhook'u). Bkz. [Kilise Ayarları: Metin Mesajlaşma](../../b1-admin/settings/church-settings.md#texting). Aşağıdaki ek B1 kurulum denetimleri, rıza eşleştirmesi ve doğrulama adımları gelecek bir sürümün gereksinimleridir; mevcut ayarları bulmanız için verilmiş talimatlar değildir. Kapsam ve bağımlılıklar için [teknik öneriye](./twilio-byok-proposal) bakın. Twilio kaynakları 22 Ekim 2026 tarihinde kontrol edilmiştir; bir kampanya göndermeden önce güncel gereksinimleri doğrulayın.
:::

## Önerilen düzen

Kiliseniz, ücretli Twilio hesabının, telefon numarasının, Messaging Service'in, faturalandırmanın ve kampanya kaydının sahibi olmalıdır. B1, bu kaynakları kilise ayarlarına özel olarak girilen kimlik bilgileriyle kullanarak mesaj gönderecektir. Twilio hesabına erişebilen en az iki uygun kilise yöneticisi bulundurun, hesap güvenliğini etkinleştirin ve rıza, gelen yanıtlar ile red bildirimlerinden sorumlu bir kişi atayın.

Burada önerilen ilk sürüm, tek bir ABD yerel numarasını ve açıkça tanımlanmış tek bir kilise mesajlaşma programını kapsar. Aşağıdaki örneklerde kurgusal **Grace Community Church** kilisesinin, ibadet değişiklikleri, etkinlik hatırlatmaları ve gönüllü planlaması için kullandığı **Grace Church Updates** programı yer almaktadır. Her ad, alan adı, sıklık, iletişim bilgisi ve amacı kilisenizin gerçek uygulamasıyla değiştirin. Bunlar Twilio kurallarının kiliseye özgü örnekleridir; önceden onaylanmış bir kampanya ya da onay vaadi değildir.

## 1. Herkese açık B1 kayıt deneyimini hazırlayın

Kilisenizin B1 web sitesinde, örneğin `https://www.example.org/text-updates` gibi bir sayfa yayımlayın. Bu sayfaya gömülü bir herkese açık B1 formu ya da bağımsız herkese açık forma açık bir bağlantı ekleyin. Ayrıca `https://www.example.org/privacy` ve `https://www.example.org/sms-terms` adreslerini de yayımlayın. Bu adresler yer tutucudur; Twilio'ya gerçek ve erişilebilir URL'leri gönderin.

Önerilen SMS kayıt formu için:

| Ayar | Önerilen yapılandırma |
|---|---|
| Erişim | Herkese açık/kısıtlamasız; inceleme ve devam eden kayıt sürecinde etkin; giriş yapmadan kullanılabilir |
| Form modu | İlk aşamada standart mod; konuşma modu, teknik öneride açıklanan açık rıza desteğini gerektirir |
| Mobil | Ülke koduyla açıkça etiketlenmiş; genel bir bağlantı/etkinlik formunun içinde kullanılıyorsa yalnızca SMS kaydı seçildiğinde zorunlu |
| SMS seçimi | Ayrı, isteğe bağlı, varsayılan olarak işaretsiz bir onay kutusu; belirli programa ve mobil alana eşlenmiş |
| Açıklamalar | SMS seçeneğinin yanında görünür olmalı: kilise/program, mesaj amacı ve sıklığı, olası ücretler, STOP, HELP, destek iletişimi ve gerçek, tıklanabilir Gizlilik Politikası/SMS Koşulları bağlantıları |
| Diğer işlemler | Misafirler, SMS'e onay vermeden bağlantı kartını gönderebilir, bir etkinliğe kayıt olabilir veya bilgi isteyebilir |
| Kanıt | Program, tam telefon numarası, seçilen rıza, kaynak gönderim, sunucu zamanı ve açıklama/politika sürümünü kaydedin; bugün sıradan bir form yanıtı tek başına kimseyi kaydetmez |
| Kişi/grup otomasyonu | İncelenmiş ve kilisenin mevcut eşleştirme kuralları için uygun bulunmadıkça, ilk SMS kayıt pilotunda otomatik kişi oluşturma ve grup atamasını kapalı tutun. Grup ataması hiçbir zaman SMS yetkisi değildir. |
| Mevcut otomasyonlar | Her form gönderenini ya da grup üyesini bir metin mesajlaşma iş akışına kaydetmeyin. Yalnızca önerilen ve doğrulanmış rıza eşleştirmesi o programa yetki verebilir. |
| Teşekkür mesajı | Kutu işaretlenmediğinde ya da onay/inceleme hâlâ bekliyorsa, SMS kaydının yapıldığını iddia etmeden yalnızca formun alındığını doğrulayın. |

Mevcut bir onay kutusu sorusu formu örnekleyebilir; ancak B1'in yine de rıza kaydına ve gönderim kapılarına ihtiyacı vardır. Mevcut ortak oluşturucu açıklamaları düz metin olarak gösterir; oraya Markdown veya URL yazmak, politika bağlantılarının tıklanabilir olacağı konusunda yeterli güvence vermez. Uygulama, gerçek bağlantılar içeren erişilebilir bir rıza kontrolü sağlamalıdır. Bkz. [B1 formları oluşturma](../../b1-admin/forms/creating-forms) ve [teknik öneri](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

Twilio, gönüllü ve doğrulanabilir bir onay ister. SMS'i zorunlu üyelik koşulları, e-posta/telefon izinleri, bağış rızası veya etkinlik kaydıyla birleştirmeyin. Bir ziyaretçi kartındaki mobil numara tek başına SMS rızası değildir. Bkz. Twilio'nun [gönüllü rıza gereksinimleri](https://www.twilio.com/docs/api/errors/30923) ve [kampanya önerileri](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Örnek kayıt metni

Bunu yalnızca kilise gerçek amaçlarını, göndericiyi ve sıklığı seçtikten sonra kullanın. Onay kutusu isteğe bağlıdır ve işaretsiz başlar; aşağıdaki politika adları, oluşturulmuş formda bağlantı olmalıdır.

> Evet, Grace Community Church'ün Grace Church Updates programı aracılığıyla [kayıtlı kilise numarası] numarasından bana ibadet değişiklikleri, kilise etkinlikleri ve gönüllü planları hakkında mesaj göndermesini istiyorum. Ayda en fazla 4 mesaj bekleyebilirsiniz. Mesaj ve veri ücretleri uygulanabilir. Abonelikten çıkmak için STOP, yardım için HELP yazın. SMS kaydı isteğe bağlıdır; ibadete katılmak, kayıt olmak veya bağış yapmak için gerekli değildir. Gizlilik Politikamıza ve SMS Koşullarımıza bakın. Sorularınız için: [kilise destek e-postası veya telefonu].

“En fazla 4” bir örnek taahhüttür; Twilio tarafından önerilen bir sınır değildir. Kilisenin gerçekten tutabileceği bir sıklıkla değiştirin. Sıklık değişkense bunu dürüstçe açıklayın ve beklenen aralığı tarif edin. Ayrı olarak değerlendirilmemiş bağış çağrıları veya ek hizmet programları bu onay kutusunun dışında tutulmalıdır.

Genel bir ziyaretçi/etkinlik formunda bu kutu işaretlenmeden gönderim yine başarılı olmalıdır. Yalnızca SMS için hazırlanmış ayrı bir form, kutuyu işaretlemenin kayıt isteği anlamına geldiğini açıklayabilir; ancak ilgisiz kilise hizmetlerini hiçbir zaman kayda bağlamamalıdır. Gerçek davranışı hem telefonda hem masaüstünde doğrulayın.

### Hazırlanacak politika içeriği

Kilisenin gizlilik sayfası, mesajlaşma için hangi bilgileri topladığını, bunları nasıl kullandığını ve koruduğunu, ayrıca saklama ve iletişim uygulamalarını açıklamalıdır. Mobil numaraların ve mesajlaşma rızasının üçüncü taraflara veya bağlı kuruluşlara, onların pazarlama veya tanıtım amacıyla satılmadığını ya da paylaşılmadığını açıkça belirtmelidir. Gerekli hizmet sağlayıcı işlemesini doğru biçimde anlatın; kilise B1 ve Twilio'yu kullanırken hiçbir işlemci kullanmadığını iddia etmeyin. Bu ayrımın referansı, Twilio'nun [gizlilik politikası rehberi](https://www.twilio.com/docs/api/errors/30908) ve [kampanya önerileridir](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

SMS koşulları kiliseyi ve programı, amaçları, gerçek mesaj sıklığını, olası mesaj ücretlerini, STOP/HELP talimatlarını, destek iletişimini ve gizlilik bağlantısını belirtmelidir. Twilio'nun mevcut incelemesinin istediği ek açıklamaları da ekleyin. Açılan onay sayfasındaki politika bağlantıları, kampanyada gönderilen URL'lerle birebir aynı olmalıdır. 30 Haziran 2026'dan itibaren Twilio, yeni API kampanya kayıtları için herkese açık, adanmış gizlilik ve koşul URL'leri gerektirmektedir; Console akışı da bunları toplar. [Twilio gereksinimi](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Bunlar kilisenin gerçek politikalarına uygulanacak içerik gereksinimleridir; mevcut gizlilik uygulamalarının yerine geçmez ve kontrol edilmeden yapıştırılacak genel bir politika metni değildir.

## 2. Kiliseyi ve mesajlaşma programını Twilio'da kaydedin

1. **Kiliseye ait ücretli bir hesap** oluşturun veya mevcut hesabı kullanın; SMS gönderebilen bir ABD yerel numarası ekleyin. Kilisenin yasal adını, EIN/işletme kayıt bilgilerini, adresini, web sitesini ve yetkili temsilcisini tutarlı biçimde kullanın. ChurchApps'in ya da başka bir kilisenin bilgilerini yerine koymayın.
2. Kilisenin gerçek kuruluş türü için Twilio'nun doğrudan müşteri **Marka** kayıt akışını izleyin. Uygun bir kâr amacı gütmeyen kuruluş için [kâr amacı gütmeyen kuruluş kayıt rehberini](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies) kullanın. Hayır kurumu/501(c)(3) kullanım senaryosu uygunluğa bağlıdır; yalnızca kilise adı Twilio onayı veya muafiyeti sağlamaz.
3. Adanmış bir Messaging Service oluşturun ve ilgili A2P 10DLC kampanyasını gönderin. Gerçek mesajlara ve o onaylı Markaya açık seçeneklere doğru gelen kullanım senaryosunu seçin; buradaki örnekler evrensel bir kilise kullanım senaryosu kodu önermez.
4. Herkese açık kayıt URL'sini, politika URL'lerini, tam onay/mesaj akışı açıklamasını ve istenen örnek mesajları sağlayın. Her gerçek kayıt yöntemini ekleyin; bağlantı/telefon numarası beyanlarını gerçek içerikle eşleştirin. Anahtar kelimeyle kayıt veya çift onay akışı var ve test edildi değilse, bunları listelemeyin.
5. Gönderen numarayı hizmete ve onaylı kampanyaya bağlayın. Göndermeden önce hem **kampanya doğrulamasını** hem de **numara kaydının tamamlanmasını** bekleyin.

Bu adımları kilisenin kendi Twilio Console'unda tamamlayın. Önerilen B1 entegrasyonu kiliseler adına kayıt göndermez. Twilio'nun [kayıt hızlı başlangıcı](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) ve [kampanya kaynağı](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) kayıt alanlarını ve durumu açıklar. Bekleyen bir numara, kampanya onaylandıktan sonra bile gönderimi engelleyebilir. [Numara kaydı](https://www.twilio.com/docs/api/errors/30035)

### Örnek kampanya açıklaması

> Grace Community Church, Grace Church Updates programını; ibadet programı değişikliklerini, kilise etkinliği hatırlatmalarını ve gönüllü planlama bildirimlerini, web sitemizde bu programı seçen kişilere göndermek için kullanır. Bu program kapsamında ayda en fazla dört mesaj göndeririz. Alıcılar bu mesajları istedikleri zaman durdurabilir. Bu program satın alınmış kişi listelerini, üçüncü taraf tanıtımlarını veya bağış çağrılarını içermez.

Bu örnek yalnızca kilisenin bu sınırlara ve dışlamalara gerçekten uyduğu durumda geçerlidir. Gönüllü hatırlatmaları tek başına vaat edilen sıklığı aşıyorsa, göndermeden önce program tasarımını ve açıklamayı değiştirin.

### Örnek mesaj akışı açıklaması

> Ziyaretçiler [gerçek kilise kayıt URL'si] adresini açar, mobil numaralarını girer ve isteğe bağlı Grace Church Updates kutusunu bağımsız olarak seçer. Form açıldığında bu kutu işaretsizdir. Açıklamada Grace Community Church adı geçer; ibadet değişikliklerini, etkinlik hatırlatmalarını ve gönüllü planlarını anlatır; aylık sınırı ve olası ücretleri verir; STOP ve HELP'i açıklar. Görüntülenen Gizlilik Politikası ve SMS Koşulları, [gerçek gizlilik URL'si] ve [gerçek SMS koşulları URL'si] adreslerine bağlanır. SMS'i reddetmek ibadete katılmayı, etkinlik kaydını, bağış yapmayı veya genel bağlantı formunu kullanmayı engellemez. B1, olumlu seçimi, telefon numarasını, gönderim zamanını ve açıklama sürümünü kaydeder. Bu programı yalnızca belgelenmiş abonelere gönderiyoruz ve daha fazla gönderimden önce abonelikten çıkmaları bastırılır.

Bu paragrafı uygulanan akışa göre uyarlayın. Telefon doğrulaması veya personel incelemesi kullanılıyorsa, bekleyen durumu ve tam etkinleştirme adımını açıklayın. Başka yöntemler kullanılıyorsa her birini ve kanıtını ekleyin. Kayıt bir oturum açma arkasındaysa veya kağıt üzerinde gerçekleşiyorsa, Twilio gerçek onay deneyiminin herkese açık ve kişisel bilgileri gizlenmiş kanıtını ister; tamamlanmış formları veya üye verilerini asla açığa çıkarmayın. [Doğrulanabilir onay rehberi](https://www.twilio.com/docs/api/errors/30923)

### Örnek giden mesajlar

Bunlar uyarlanacak kurgusal örneklerdir. Göndermeden önce gerçek kilise URL'lerini kullanın ve köşeli parantez içindeki değerleri değiştirin. Twilio kampanya API'si iki ila beş örnek kabul eder. Örnekler kiliseyi tanımlamalı, beyan edilen amacı yansıtmalı ve bir abonelikten çıkma talimatı içermelidir. [Kampanya örnek alanları](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Pazar ibadeti, [neden] nedeniyle saat [saat] itibarıyla başlayacaktır. Ayrıntılar: [kilise web sitesi URL'si]. Mesajları durdurmak için STOP yazın.
```

```text
Grace Community Church: [kilise etkinliği], [tarih] tarihinde saat [saat] için hatırlatma. Bilgi: [kilise etkinliği URL'si]. Mesajları durdurmak için STOP yazın.
```

```text
Grace Community Church: Bu [gün] [ekip] ekibinde görev almış durumdasınız. Lütfen planınızı inceleyin: [B1 kilise portalı URL'si]. Mesajları durdurmak için STOP yazın.
```

Köşeli parantez içindeki URL'ler örnek değişkenleri temsil eder; gönderilen örneklerde gerçek kilise alan adı ve gerçek bağlantı biçimi görünmelidir. Bir plana bağlantı oturum açmayı gerektirebilir, ancak inceleme için kullanılan kayıt sayfası ve politikalar herkese açık olarak incelenebilir olmalıdır. Onay örneklerine özel notları, çocuk bilgilerini veya tanımlanabilir üye ayrıntılarını koymayın. Örnek içeriği B1 şablonlarının gerçekten gönderdikleriyle tutarlı tutun; kullanılamayan bir yanıt kutusunu veya belirli bir hatırlatma davranışını vaat etmeyin.

### STOP, START ve HELP yanıtları

Bu onaylar için Twilio Messaging Service Advanced Opt-Out özelliğini kullanın ve kilise/program kimliğini ile destek bilgilerini özelleştirin. Örnek yanıt amaçları şöyledir:

- **STOP:** Grace Church Updates programının durdurulduğunu onaylayın ve desteklenen devam etme yolunu açıklayın.
- **START:** Aynı programın yeniden başladığını, yapılandırılmış akışın gerektirdiği kimlik, sıklık/ücret ve yardım/durdurma talimatlarıyla birlikte onaylayın.
- **HELP:** Grace Community Church'ü tanımlayın; gerçek destek iletişimini ve abonelikten çıkma talimatlarını verin.

Twilio zaten yanıt verdiyse B1'den ikinci bir onay göndermeyin. HELP yanıtı kayıt anlamına gelmez. START, kişiyi başka kilise programlarına kaydetmemeli ve onu üye rehberinde görünür yapmamalıdır. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Göndermeden önce onay paketini kontrol edin

- [ ] Kilisenin gerçek yasal/Marka bilgileri, web sitesi kimliği ve kampanya amacı birbiriyle tutarlıdır.
- [ ] Kayıt sayfası ve etkin form, mobil cihaz dahil, özel bir tarayıcıda giriş yapılmadan açılır.
- [ ] SMS kutusu işaretsiz başlar ve ana ziyaretçi/etkinlik işlemi tamamlanırken reddedilebilir.
- [ ] Program amacı, gönderen, gerçek sıklık, olası ücretler, STOP, HELP, destek iletişimi ve tıklanabilir politika bağlantıları SMS seçeneğinin yanında görünür.
- [ ] Twilio'ya verilen tam gizlilik/koşul URL'leri herkese açıktır, kimlik bilgisi gerektirmeden çalışır ve aynı kiliseyi/programı tanımlar. Politika içeriği gerçek işlemeyle uyumludur.
- [ ] Her örnek mesaj programla, gerçek gönderici kimliğiyle ve beklenen bağlantı/telefon davranışıyla eşleşir. Kampanya, gerçek her onay yöntemini açıklar.
- [ ] Kısmi olarak gizlenmiş ekran görüntüleri, boş formu, onay kutusunu/açıklamaları ve politika bağlantılarını incelemecilerin göreceği biçimde gösterir. Kanıtta üye kayıtları veya anahtarlar bulunmaz.
- [ ] Kilisenin rıza kanıtlarını saklamak ve gönderimden önce, telefon/e-posta ile gelenler dahil, abonelikten çıkma taleplerine uymak için işletimsel bir yolu vardır.

Bu kontroller önlenebilir uyuşmazlıkları azaltır; onay kararını Twilio ve inceleme ortakları verir. İnceleme bittikten sonra da gerçek kayıt sayfası ve politika URL'lerini erişilebilir tutun.

## 4. Gelecekteki B1 entegrasyonunu bağlayın ve doğrulayın

Entegrasyon yayımlandıktan sonra önerilen Metin Mesajlaşma kurulumu, kilisenin Account SID'sini, adanmış API Key SID/gizli anahtarını, ayrı webhook Auth Token'ını, Messaging Service SID'sini ve seçilen göndericiyi toplamalıdır. Anahtarları yalnızca kilisenin Console'unda oluşturun ve gizli bilgileri yalnızca özel B1 ayarlarına girin. [Twilio API anahtarı rehberi](https://www.twilio.com/docs/iam/api-keys)

B1'in sağladığı kiliseye özgü gelen mesaj ve teslimat durumu webhook URL'lerini, Twilio hizmet yapılandırmasındaki eşleşen alanlara kopyalayın. Advanced Opt-Out'u etkinleştirin ve gelen mesajların yapılandırılmış webhook'a ulaştığını doğrulayın. B1, kimlik bilgileri, hizmet/gönderen sahipliği, onaylı kampanya, tamamlanmış numara kaydı, gelen mesaj doğrulaması ve teslim edilen test için ayrı denetimler göstermelidir. Kaydedilmiş bir kimlik bilgisi veya kabul edilmiş bir API isteği, nihai teslimat anlamına gelmez.

B1, kayıt sinyalini programatik olarak kontrol edemezse, bunu doğrudan Console'da onaylayın; arayüz tarihli sonucun yönetici tarafından onaylandığını belirtmelidir. Üretim mesajlarını etkinleştirmeden önce bekleyen veya başarısız durumları çözün. Ayrıca açıkça istenmiş, rıza vermiş gerçek bir yetişkin test alıcısına gönderilen ayrı bir test kullanın, ardından:

1. Eşleşen belgelenmiş kaydın doğru telefon/program rıza kaydını oluşturduğunu doğrulayın; reddetmek veya telefon değiştirmek, alıcıyı sessizce kaydetmemelidir.
2. Bir test gönderin, alındığını doğrulayın ve B1 durumunu Twilio Message SID ile teslimat sonucuyla karşılaştırın.
3. STOP yazın ve manuel mesajların, grup mesajlarının, iş akışlarının ve hatırlatmaların o telefonu atladığını kontrol edin. Rehber görünürlüğü değişmemelidir.
4. Belgelenmiş aynı programa yeniden abone olma akışını ve HELP yanıtını deneyin; yinelenen onay olmadığını ve ilgisiz tercih değişikliği bulunmadığını doğrulayın.

## 5. Programı sürdürün

Kilise adına bir sahip belirleyin; bu kişi Twilio'da kampanya/hesap durumunu, bakiye ve faturalandırma uyarılarını, mesaj hatalarını ve gelen yanıtları izlesin. Önerilen ilk B1 sürümünde konuşma tabanlı bir SMS kutusu yoktur; bu nedenle gerçek bir yardım iletişimi yayımlayın ve izleyin. Personelin yanıtları B1 içinde gördüğünü varsaymayın, yanıtları kontrol edin.

Rıza ve geri çekme geçmişini, mevcut açıklama/politika sürümlerini, kampanya tanımlayıcılarını ve kanıtları gizlenmiş onay kayıtlarını kilisenin kontrol ettiği kayıtlarda tutun. Anahtarları veya alıcı listelerini asla herkese açık destek taleplerine yapıştırmayın. Bir numara, hizmet, kimlik bilgisi, kayıt akışı, sıklık veya amaç değiştiğinde, devam etmeden önce entegrasyonu yeniden kontrol edin ve gerektiğinde kayıt/rızayı güncelleyin. Paylaşılan hane numaralarını ve değiştirilen numaraları dikkatle inceleyin; uygunluk, her aile üyesinin kaydına değil, rıza veren telefona ve programa bağlıdır.

Red durumunda gerçek Twilio hatasını okuyun, web sitesindeki ve gönderimdeki belirli tutarsızlığı düzeltin ve kiliseniz Console üzerinden yeniden gönderin. Kayıtsız veya bekleyen göndericiler için, kayıt tamamlanana kadar bekleyin; çalışmak için numara değiştirmeyin. [Twilio kayıt sorun giderme](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) rehberini ve sağlanan hata kodu referansını kullanın. Sabit bir süreç vaat etmeyin.

---
title: "Sunucu Yönetimi"
---

# Sunucu Yönetimi

<div class="article-intro">

ChurchApps'teki sunucu yönetimi özellikleri yalnızca **Server.Admin** iznine sahip kullanıcılar tarafından kullanılabilir. Bu araçlar, sistemdeki tüm kiliseler genelinde platform işletimi, destek ve sorun giderme için kullanılır.

</div>

:::warning Erişim Kısıtlı
Bu sayfada açıklanan özellikler **Server.Admin** iznini gerektirir ve normal kilise yöneticileri tarafından kullanılamaz. Yalnızca platform operatörleri ve destek personeli için tasarlanmıştır.
:::

## Sunucu Yönetimine Erişim

Server.Admin iznine sahip kullanıcılar, sunucu yönetim paneline B1 Admin üzerinden erişebilir:

1. [admin.b1.church](https://admin.b1.church) adresinden oturum açın
2. [Atlama menüsünü](../b1-admin/introduction.md#getting-around-with-the-jump-menu) açın, **Ayarlar** bölümünü genişletin ve **Server Admin** seçeneğine tıklayın. (Doğrudan `admin.b1.church/admin` adresine de gidebilirsiniz.)
3. Sunucu Yönetimi paneli, bölümlerini sol tarafta üç grup halinde listeler: **Dizin** (Churches, Users, Impersonate User), **İşlemler** (Background Jobs, Commons, Usage Trends) ve **Sistem** (Translation Lookups, Server Health, Database Migrations)

## İki Faktörlü Oturum Açmayı Sıfırlama

Bir kullanıcının [iki faktörlü oturum açma](../b1-admin/profile/managing-profile.md#two-factor-sign-in) özelliği açıksa ve hem telefonunu hem de yedek kodlarını kaybettiyse, bir sunucu yöneticisi bu özelliği kapatabilir:

1. Sunucu Yönetimi panelinde **Users** bölümünü açın ve kullanıcıyı bulun.
2. İki faktörlü oturum açması etkin olan kullanıcılarda **İki faktör açık** rozeti görünür. Bunun yanındaki **2FA'yı sıfırla** düğmesine tıklayın.
3. Onay istemini onaylayın. Bunu yalnızca kiminle konuştuğunuzu doğruladıktan sonra yapın.

Kullanıcı bundan sonra yalnızca parolasıyla oturum açabilir ve profilinden iki faktörlü oturum açmayı yeniden kurabilir. Sıfırlama işlemleri denetim günlüğüne `mfa_reset` olarak yazılır. Uç nokta `POST /membership/users/mfa/reset/:userId` olup Server.Admin izni gerektirir.

## Kullanıcı Taklit Etme

Taklit etme (impersonation) özelliği, destek ve sorun giderme amacıyla sunucu yöneticilerinin başka bir kullanıcı olarak oturum açmasına olanak tanır. Kullanıcıların bildirdiği sorunları incelerken veya kiliselerin sistemlerini yapılandırmasına yardımcı olurken kullanışlıdır.

### Bir Kullanıcıyı Nasıl Taklit Edilir

1. Sunucu Yönetimi panelinde **Impersonate User** bölümünü açın
2. Arama alanına kullanıcının adını veya e-posta adresini girin
3. **Search** düğmesine tıklayın veya Enter tuşuna basın
4. Arama sonuçlarında taklit etmek istediğiniz kullanıcıya tıklayın
5. Açılan iletişim kutusunda taklit işlemini onaylayın
6. Bu kullanıcı olarak oturum açacak ve onun hesabına yönlendirileceksiniz

### Önemli Notlar

- Taklit etme, hedef kullanıcının izinleri ve kilise erişimiyle yeni bir oturum oluşturur
- Başka bir kullanıcıyı taklit ettiğinizde, özgün yönetici oturumunuz sona erer
- Taklit edilen kullanıcı olarak gerçekleştirilen tüm işlemler denetim kaydına yazılır
- Yönetici hesabınıza dönmek için oturumu kapatıp kimlik bilgilerinizle yeniden oturum açın
- Taklit etmeyi yalnızca destek amacıyla gerektiğinde kullanın ve kullanıcıların hesaplarına destek amacıyla eriştiğinizde her zaman onlara bilgi verin

### API Uç Noktası

Taklit etme özelliği, Membership API'deki `/users/:userId/impersonate` uç noktasıyla desteklenir. Teknik ayrıntılar için [Membership Uç Noktaları](/docs/developer/api/endpoints/membership#users) sayfasına bakın.

### Güvenlik Hususları

- Taklit etme Server.Admin iznini gerektirir; bu izin yalnızca güvenilir platform operatörlerine ve ölçülü biçimde verilmelidir
- Tüm taklit etme olayları yönetici kullanıcı kimliği ve hedef kullanıcı kimliğiyle kaydedilir
- Taklit etme gerçekleştiğinde kiliseler bilgilendirilmez; bu nedenle bu özelliğin ne zaman ve nasıl kullanılacağına dair net politikalar belirleyin
- Hesap sorumluluğu için taklit etme olaylarını destek bilet sisteminizde belgelemeyi düşünün

## Commons Moderasyonu

Commons, ürünler genelinde kullanıcılar tarafından gönderilen içerikler için ortak moderasyon kuyruğudur. WorshipCommons şarkıları, Lessons.church dersleri, FreeShow şablonları ve B1 web sitesi oluşturucu şablonlarının tümü, ürün başına ayrı inceleme araçları yerine aynı kuyruktan geçer.

### Commons'a Erişim

1. Sunucu Yönetimi panelinde **Commons** sekmesine gidin.
2. Üç alt sekme görürsünüz: **Queue**, **Reports** ve **Assets**.

Sınırlı bir **müzik editörü** rolü de Queue sekmesini görebilir, ancak bir şarkının haklarını veya lisanslamasını değiştiren gönderimleri onaylayamaz.

### Queue

Queue, tüm ürünlerdeki bekleyen tüm gönderimleri listeler; ürüne ve varlık türüne göre filtrelenebilir. Her satır, gönderimin yeni bir varlık mı, orijinal yazarın bir düzenlemesi mi yoksa üçüncü bir tarafın düzenlemesi mi olduğunu; ayrıca gönderenin onay geçmişini ve gönderimin ne kadar süredir beklediğini gösterir (72 saati geçtiğinde işaretlenir).

Alan bazında farkları, dosya önizlemelerini ve öğenin salt okunur gömülü önizlemesini içeren bir çekmeceyi açmak için **Review** düğmesine tıklayın. Onaylamak veya reddetmek için **a** ve **r** klavye kısayollarını, çekmeceden ayrılmadan bir sonraki veya önceki gönderime geçmek için **j** ve **k** tuşlarını kullanın. Reddetmek için bir neden (örneğin quality, duplicate, licensing, ccli, ai veya off-topic) seçmeniz ve bir not yazmanız gerekir.

### Reports

Reports sekmesi, yayımlanmış varlıklara karşı yapılan telif hakkı ve politika/kalite raporlarını yönetir. Bunlar ayrı Copyright ve Policy & Other kuyruklarına ve bir Resolved geçmişine bölünmüştür. Bir raporu işlemeye başlamak için raporu üstlenin, ardından bir sonuç (upheld, dismissed veya duplicate) ve bir işlem (none, unpublish veya remove) seçerek raporu çözün.

### Assets

Assets sekmesi, yayımlanmış içeriklerde arama yapabileceğiniz bir tarayıcıdır. Burada bir varlığı **Feature** (ürünün ana sayfasında öne çıkarma), **Unpublish**/**Republish** (yayından kaldırma/yeniden yayımlama) veya **Remove** (telif hakkı veya politika nedeniyle kaldırma) işlemlerini gerçekleştirebilirsiniz.

Özellikle şarkılar için bu sekme, bir şarkının **Sunday-ready** (Pazar hazır) duruma geçtiği ve bir kilisenin B1 Admin şarkı aramasında görünmeye uygun hale geldiği yerdir. Bir inceleyici varlığı açar ve yayımlanmış her tonalite için, şarkıyı dinleyip nota, akorların ve slaytların tamamının mevcut olduğunu doğruladıktan sonra **Listened** işaretini koyar. Bir şarkı, her tonalite işaretlendikten sonra Pazar hazır olur.

:::info
Commons moderasyonu yalnızca personele açıktır; bireysel kiliseler bu kuyruğu hiçbir zaman görmez. Bireysel bir kilisenin B1 Admin'inin Commons verilerine dokunduğu tek yer, [şarkı aramasındaki](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) "WorshipCommons — ücretsiz" bölümüdür. Bu bölüm yalnızca bu inceleme sürecinden geçmiş şarkıları gösterir.
:::

Temel veri modeli ve gönderim yaşam döngüsü için [Content Commons mimarisi](/docs/developer/architecture/commons) sayfasına bakın.

## Grup E-postası Onayı

Kiliseler, bir sunucu yöneticisi onaylayana kadar kilise tarafından yazılan e-postaları (grup e-postası, form takip mesajları, iş akışı e-postaları ve hesap davetleri) gönderemez. Bu, bot aracılığıyla kaydolan kiliselerin paylaşılan ChurchApps gönderim adresini spam için kullanmasını engeller.

1. Sunucu Yönetimi panelinde **Churches** sekmesini açın.
2. Her kilisede bir **Group Email** çipi görünür: **Approved** (yeşil) veya **Not approved** (çerçeveli).
3. Kilisenin onayını vermek veya onayı iptal etmek için çipe tıklayın ve onaylayın.

Kilise personeli, B1 Admin'in E-posta Gönder iletişim kutusundaki **Request review** düğmesiyle onay ister. Talep, destek adresine e-posta olarak gönderilir ve kilisenin adını, kimliğini, kayıt tarihini, konumunu ve talepte bulunan kişiyi listeler. Bir kilise haftada bir talep gönderebilir. Günlük gönderim kotası ve bounce ve şikayetlerde otomatik duraklatma için [Kilise tarafından yazılan e-posta sınırlarına](/docs/developer/architecture/notifications#church-authored-email-limits) bakın.

## Veritabanı Geçişleri

**Deploy Prod** iş akışı, bekleyen geçişleri kendisi uygular. Barındırılan veritabanları yalnızca Api'nin ağının içinden gelen bağlantıları kabul eder; bu nedenle bir GitHub runner'ı bunlara erişemez. Bunun yerine iş akışı, `serverless deploy` komutundan hemen sonra Api'nin `migrate` Lambda fonksiyonunu (`api-Prod-migrate`) çağırır. Bu fonksiyon, her modülün bekleyen geçişlerini bu sekmeyle aynı çalıştırıcı ile uygular ve herhangi bir modül hata verirse veya reddedilirse dağıtımı başarısız sayar. **Rollback Prod** yalnızca Lambda kodunu geri alır; uygulanmış geçişler uygulanmış kalır. **Database Migrations** sekmesi, durumu kontrol etmek, dağıtımın çalıştırmadığı geçişleri çalıştırmak (örneğin, geçiş yapmayan demo ortamında) ve geçiş geçmişi olmayan modüller için temel kayıt oluşturmak için kullanılır. (Kendi sunucunuzda Docker ile kurulum yapanlar için geçişler, Api konteyneri başladığında hâlâ otomatik olarak çalışır.)

Sekmede, mevcut ortam ve her modül için (membership, attendance, giving vb.) bir satır gösterilir. Bu satırlarda durum, uygulanan ve bekleyen geçiş sayıları ile en son uygulanan geçiş bulunur.

- **Run Pending Migrations**, bekleyen tüm geçişleri modül modül, sırayla uygular. İlk hatada durur ve her modül için neyin uygulandığını gösterir.
- **No history** olarak işaretlenen bir modülün veritabanı, geçiş takibinden önce oluşturulmuştur. Bu modül otomatik olarak çalıştırılmaz, çünkü eski veri geçişlerinin canlı tabloların üzerinde yeniden oynatılmasına neden olur. Bunun yerine o modülde **Check Schema** düğmesine tıklayın. Api, her geçişin oluşturduğu tabloları, sütunları ve indeksleri canlı veritabanıyla karşılaştırır ve her geçişi **Already applied**, **Missing**, **Partly applied** veya **Data only** olarak işaretler. Kontrol hiçbir şeyi değiştirmez.
- Kontrol sonuçlarında **Record as Already Applied**, tespit edilen geçişleri çalıştırmadan geçiş geçmişine kaydeder (onaydan sonra). **Already applied** olan son geçişe kadar olan her şey kaydedilir; bu aralıktaki **Data only** geçişler de dahildir. **Missing** geçişler bekleyen olarak kalır ve ardından **Run Pending Migrations** ile normal şekilde çalıştırılabilir.
- **Partly applied** bir geçiş kaydedilmesini engeller. Geçiş tekrar çalıştırmak için güvenliyse (önce okuyun), geçişin bekleyen kalması ve baştan tekrar çalışması için **Re-run** kutusunu işaretleyin.

Sunucu Yönetimi paneli ve CLI (`yarn migrate:up`) aynı Kysely migrator'ını ve `kysely_migration` tablosunu kullanır; bu nedenle uygulanmış geçişler konusunda her zaman aynı bilgiyi paylaşırlar. Arka plandaki uç noktalar `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` ve `POST .../:module/baseline` olup yalnızca Server.Admin tarafından kullanılabilir.

## İlgili Sayfalar

- [Kimlik Doğrulama ve İzinler](/docs/developer/api/endpoints/authentication) — İzin modeli ve JWT kimlik doğrulaması
- [Membership Uç Noktaları](/docs/developer/api/endpoints/membership) — Kullanıcı ve kilise yönetimi API'si
- [Denetim Günlüğü](/docs/b1-admin/reports/audit-log) — Bir kilisenin etkinlik günlüklerini görüntüleyin
- [Content Commons Mimarisi](/docs/developer/architecture/commons) — Paylaşılan varlık modeli ve moderasyon yaşam döngüsü

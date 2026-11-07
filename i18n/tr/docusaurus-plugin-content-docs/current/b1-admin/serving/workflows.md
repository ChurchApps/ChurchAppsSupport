---
title: "İş Akışları"
description: "B1 Admin'de Kanban tarzı panolar oluşturun; kişileri otomatik e-postalar, kısa mesajlar ve kişileri otomatik ekleyen tetikleyicilerle takip adımlarından geçirin."
---

# İş Akışları

<div class="article-intro">

İş akışları, insanları görsel bir pano üzerindeki bir dizi adımdan geçirir. Her kişi, bir adımdan diğerine ilerleyen bir karta dönüşür: ilk kez gelen bir misafirin takibinden üyelik sürecine, ilk kez bağış yapan birine teşekkür etmeye ve aynı aşamalardan çok sayıda kişinin geçmesini izlemeniz gereken her duruma kadar. Bir adım, bir gönüllüden bir şey yapmasını isteyebilir (telefon etmek, görüşme yapmak) **ve** kendi başına otomatik işlemler çalıştırabilir: e-posta veya metin mesajı göndermek, birkaç gün beklemek, kişiyi bir gruba eklemek. Böylece iş akışları hem insan eliyle yapılan takibi hem de bunun çevresindeki rutin işleri yönetir. İş akışları, [Görevler](./tasks.md) özelliğini sürükle-bırak yapısında bir Kanban panosuna genişletir; böylece hiçbir kişi ve hiçbir şey gözden kaçmaz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Takip etmek istediğiniz kişilerin B1 Admin içinde kayıtlı olduğundan emin olun
- [Görevlerin](./tasks.md) nasıl çalıştığını öğrenin, çünkü panodaki her kart bir görevdir
- **E-posta gönder** işlemini kullanmak için önce göndermek istediğiniz e-posta şablonlarını oluşturun (**Ayarlar → E-posta Şablonları** altında yönetilir)
- **Metin gönder** işlemini kullanmak için önce bir [metin mesajı sağlayıcısı](../settings/church-settings.md#texting) bağlayın
- Uygun Görevler iznine ihtiyacınız olacak. Görüntüleme, kartları düzenleme ve iş akışlarını yönetme ayrı izin düzeyleridir (bkz. [Roller ve İzinler](../settings/roles-permissions.md))

</div>

## İş Akışlarını Görüntüleme

[Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) açın (B1 Admin'in sol üstündeki arama çubuğu), **Hizmet**'i genişletin ve **İş Akışları**'na tıklayın. İş akışlarınız, her birinin **Kategori** ve **Durum** (**Etkin** veya **Etkin Değil**) bilgisini gösteren bir tabloda listelenir. Kategori kullanıyorsanız listenin üstündeki sekmeler, listeyi kategoriye göre filtrelemenizi sağlar. Panosunu açmak için herhangi bir iş akışına tıklayın.

## Yeni İş Akışı Oluşturma

1. İş Akışları sayfasında **İş Akışı Ekle**'ye tıklayın.
2. Nasıl başlayacağınızı seçin:
   - **Boş iş akışı** -- sıfırdan başlayın ve kendi adımlarınızı oluşturun.
   - **Şablondan** -- düzenleyebileceğiniz hazır bir adım seti ile başlayın. Yerleşik şablonlar şunlardır:
     - **Yeni Ziyaretçi Takibi** -- Hoş geldiniz e-postası gönder → Kişisel telefon görüşmesi → Bir sonraki adıma davet et → Bağlandı
     - **Üyelik Sınıfı** -- İlgi bildir → Sınıfa kaydol → Sınıfa katıl → Üyeliği tamamla
     - **İlk Kez Bağış Yapanlara Teşekkür** -- Teşekkür notu gönder → Bağışın etkisini paylaş → Sorumluluk üstlenildi
     - **Hizmet Görevi Onayı** -- Talebi gönder ve yanıt bekle → Yanıtsız talep için gönüllüyü ara (bkz. [Hizmet Görevi Onayları](#serving-assignment-confirmations))

   Şablondaki adımların oluşturulması biraz zaman alabilir. Bu sırada **İş Akışı Ekle** düğmesi **Oluşturuluyor...** yazar ve tekrar tıklanamaz; böylece yinelenen bir kayıt oluşmaz. Bir sorun çıkarsa sayfa şu mesajı gösterir: *"İş akışı oluşturulamadı. Lütfen tekrar deneyin."*
3. İş akışına bir **Ad** verin.
4. İlgili iş akışlarını bir arada gruplamak için isteğe bağlı olarak bir **Kategori** atayın. Açılır listeden doğrudan yeni bir kategori oluşturabilirsiniz.
   Boş bir iş akışı için ayrıca **İş akışı amacını** seçersiniz: **Kişi takibi** (genellikle kullanılan tür) veya **Hizmet görevi onayı**. Amaç, iş akışı oluşturulduktan sonra değiştirilemez.
5. Kişilerin iş akışına eklenebilmesi için iş akışını **Etkin** bırakın ya da iş akışını eklemeye yönelik listelerden gizlemek için **Etkin Değil** olarak ayarlayın.
6. **Kaydet**'e tıklayın.

:::tip
Mevcut bir iş akışını adımları, otomatik işlemleri ve yönlendirmesiyle birlikte kopyalayıp yeni bir iş akışının başlangıcı olarak kullanmak için iş akışları listesindeki **Çoğalt** düğmesini kullanın.
:::

## Adımlarla Panoyu Oluşturma

Her iş akışı panosu, soldan sağa sütunlar olarak gösterilen **adımlardan** oluşur. Bir iş akışını açın ve sürecinizin her aşamasını oluşturmak için **Adım Ekle**'yi kullanın.

Bir adım eklerken veya düzenlerken şunları yapılandırabilirsiniz:

- **Adım Adı** -- sütun başlığı (örneğin "Karşılama Görüşmesi" veya "Kayıt Bekleniyor").
- **Süre (gün)** -- bir kart bu adıma girdiğinde otomatik olarak bir son tarih belirler. Son tarihi geçmiş kartlar **Gecikmiş** olarak işaretlenir.
- **Varsayılan atanan** -- bu adımdaki yeni kartların otomatik olarak atandığı kişi veya grup. Varsayılan atanan bir kişiyse, ona bir kartın kendisine atandığına dair bildirim gönderilir.
- **Otomatik işlemler** -- bir kart geldiğinde sistemin kendi başına yaptığı işler (aşağıya bakın).
- **Yönlendirme** -- kart adımdan ayrıldığında nereye gideceği (bkz. [Yönlendirme](#routing-cards-with-outcomes-and-conditions)).

Adım sütunlarını sürükleyerek sürecinizle eşleşen sıraya getirin. Bu sıra, başka bir yönlendirme uygulanmadığında kartın izleyeceği varsayılan yolu da belirler.

:::info
Önce yeni bir adımı kaydedin. Otomatik işlemler ve yönlendirme adıma bağlanır; bu nedenle düzenleyici, adım var olduktan sonra bu bölümleri açar.
:::

## Otomatik İşlemler

Her adım, bir kart adıma **girdiği** anda kendi başına çalışan bir **otomatik işlemler** listesi içerebilir. Kimse karta dokunmadan önce çalışırlar. Bir adım hem bir gönüllüye görev verir hem de takibin etrafındaki rutin işleri yürütür.

Adım düzenleyicisinde **Otomatik işlemler**'i açın, **İşlem Ekle**'ye tıklayın, bir tür seçin ve ayarlarını doldurun. İhtiyacınız kadar işlem ekleyebilirsiniz; bunlar **yukarıdan aşağıya, sırayla** çalışır. Adımı ve tüm işlemlerini birlikte kaydetmek için adımdaki **Kaydet**'e tıklayın. Bir işlemi çöp kutusu simgesiyle kaldırmak ise hemen etkili olur.

| İşlem | Ne yapar |
|---|---|
| **E-posta gönder** | Kişiye seçtiğiniz bir e-posta şablonunu gönderir. Konu satırını değiştirebilirsiniz. |
| **Metin gönder** | Kişiye yazdığınız bir mesajı, kilisenizin [metin mesajı sağlayıcısı](../settings/church-settings.md#texting) üzerinden gönderir. |
| **Bekle** | Bir kartı, devam etmeden önce belirli sayıda gün bekletir (aşağıya bakın). |
| **Gruba ekle** | Kişiyi seçtiğiniz bir [gruba](../groups/index.md) ekler. |
| **Gruptan çıkar** | Kişiyi seçtiğiniz gruptan çıkarır. |
| **Yoklama kaydet** | Kişiyi, devam eden bir grup ibadetinde mevcut olarak işaretler (aşağıya bakın). |
| **İş akışına ekle** | Kişiyi başka bir iş akışına başlatır. Süreçler arasında devir teslim için kullanışlıdır. |
| **Not ekle** | Kartın geçmişine bir not kaydeder. |
| **Alan ayarla** | Kişinin kaydındaki bir alanı günceller: Üyelik Durumu, Medeni Durum, Cinsiyet, Şehir, Eyalet veya Posta Kodu. |
| **Webhook** | Kartın ayrıntılarını, diğer sistemlere bağlanmak için girdiğiniz harici bir web adresine (URL) gönderir. |
| **Görev oluştur** | Girdiğiniz başlık ve açıklamayla, seçtiğiniz kişiye atanmış bir [görev](./tasks.md) oluşturur. |
| **Kişiye bildir** | Seçtiğiniz bir personele veya gönüllüye kart hakkında bir e-posta ve bir B1 bildirimi gönderir (aşağıya bakın). |

Bir adımın tüm işlemleri bittikten sonra kart, bir kişinin üzerinde çalışabilmesi için **o adımda kalır**. Ancak adımda kartı ileri taşıyan otomatik bir yönlendirme varsa bu geçerli değildir (bkz. [Tamamen otomatik adımlar](#fully-automated-steps)).

:::info
Otomatik işlemler yalnızca bir kart normal akış üzerinden geldiğinde çalışır: ilk eklendiğinde, bir sonuç veya otomatik yönlendirme onu getirdiğinde ya da bir Bekle işlemi bittikten sonra. Bir personel kartı elle adıma sürüklediğinde veya geri gönderdiğinde bu işlemler **yeniden çalışmaz**. Böylece bir kişi aynı e-postayı iki kez almaz.
:::

### E-posta gönderme

**E-posta gönder**'i seçin, e-posta şablonlarınızdan birini seçin ve isterseniz özel bir konu yazın. Bir kart adıma girdiğinde kişi bu e-postayı otomatik olarak alır. (Kişinin kayıtlı bir e-posta adresi yoksa adım bu işlemi atlar.) Şablondaki, örneğin `{{firstName}}` gibi [birleştirme alanları](../settings/email-templates.md#merge-fields), kişinin kendi bilgileriyle doldurulur.

E-posta gönderildiğinde kartın geçmişine **E-posta gönderildi** kaydedilir. Gönderilemezse (örneğin kilisenizin e-postası henüz onaylanmadığı veya günlük limite ulaşıldığı için), "E-posta gönderildi" kaydı eklenmez.

:::info
İş akışı e-postaları yalnızca kiliseniz grup e-postası gönderme yetkisi aldıktan sonra gönderilir ve kilisenizin günlük e-posta limitine dahil edilir. Ayrıntılar için bkz. [Kiliniz için Grup E-postasını Açma](../groups/group-members.md#turning-on-group-email-for-your-church). **E-posta gönder** işlemi, bu e-postalar gönderilemeyeceğinde adım düzenleyicisinde sizi uyarır: Onay hâlâ bekleniyorsa *"Kilisenizin e-postası henüz onaylanmadı..."*, son mesajlar geri döndüyse veya spam olarak bildirildiyse *"Kilisenizin e-postası duraklatıldı..."* uyarısını görürsünüz.
:::

### Yoklama kaydetme

**Yoklama kaydet**'i seçin ve yoklamasının alınacağı grubu seçmek için **Grup seç**'e tıklayın. İşlem çalıştığında kişi, o grubun devam eden ibadet saatinde mevcut olarak işaretlenir. Bu, kişinin kendi check-in işlemini yapmış olmasıyla aynıdır. Bu özellik, kişiler geldikçe onları iş akışına ekleyen bir tetikleyiciyle birlikte kullanışlıdır; böylece ayrı bir check-in gerekmeden sayılırlar.

- Yoklama, kartın **oluşturulduğu** anda ölçülür; bu nedenle iş akışında daha önce yer alan bir **Bekle** işlemi, kartı ibadetin ötesine taşımaz.
- Yalnızca günü ve başlangıç saati olan ibadet saatleri sayılır. O anda grubun hiçbir ibadet saati devam etmiyorsa hiçbir kayıt yapılmaz ve kartın geçmişine **Planlanmış ibadet yok — yoklama kaydedilmedi** notu düşülür.
- Yoklama kaydedildiğinde kartın geçmişinde **Yoklama kaydedildi** ve ardından grubun adı görünür. Aynı ibadet için işlemi yeniden çalıştırmak kişiyi iki kez saymaz.

### Bir kişiye bildirim gönderme

**Kişiye bildir**'i seçin, **Kişi seç**'e tıklayın ve isterseniz bir **Mesaj** yazın. Bir kart adıma girdiğinde, o kişi kartta yer alan kişinin adı, iş akışı ve adım adları, mesajınız ve kartı açmak için bir bağlantı ile birlikte bir e-posta ve bir B1 bildirimi alır. Bunu bir personele veya ekip liderine önceden haber vermek için kullanın. Örneğin: *"Biri Üyelik Görüşmesi adımına ulaştığında papaza haber ver."* Kartın geçmişine, kişinin adının önüne **Bildirildi** yazılarak kaydedilir.

### Metin mesajı gönderme

**Metin gönder**'i seçin ve **Metin mesajını** yazın (en fazla 1.600 karakter). Bir kart adıma girdiğinde kişi bu metni cep telefonuna alır. Mesajı kişiselleştirmek için mesaj kutusunun altındaki bir çipe tıklayın: **Ad**, **Soyad**, **Görünen Ad** veya **Kilise Adı**. Çip, imlecinizin olduğu yere `{{firstName}}`, `{{lastName}}`, `{{displayName}}` veya `{{churchName}}` ekler. Metin gönderildiğinde her biri kişinin bilgileriyle doldurulur.

- Kişinin kayıtlı bir cep telefonu yoksa metin gönderilmez ve kartın geçmişine **Metin atlandı: cep telefonu yok** kaydı düşülür.
- Kişi iletişim iznini geri aldıysa metin gönderilmez ve kartın geçmişine **Metin atlandı: izin verilmedi** kaydı düşülür.
- Metin gönderildiğinde kartın geçmişine **Metin gönderildi** kaydedilir. Gönderim başarısız olursa (örneğin bağlı bir metin sağlayıcısı yoksa veya kilisenizin metin kredisi tükendiyse) hata kartın geçmişine kaydedilir ve adımdaki diğer işlemler yine çalışır.

:::warning
Metinler, kilisenizin kendi [metin mesajı sağlayıcısı](../settings/church-settings.md#texting) üzerinden gönderilir. Bağlı bir sağlayıcı yoksa işlem düzenleyicisi *"Bir metin mesajı sağlayıcısı kurulmadı"* uyarısını verir ve metinler gönderilmez.
:::

### Birkaç gün bekleme (damla dizileri)

**Bekle** işlemi, bir kartı ayarladığınız gün sayısı kadar bekletir. Beklerken kart **Ertelendi** olarak görünür. B1, tamamlanmış beklemeleri her 30 dakikada bir kontrol eder; bu nedenle bir kart, beklemesi bittikten yaklaşık yarım saat içinde devam eder. Bekleme bittiğinde:

1. **Aynı adımdaki kalan tüm işlemler** çalışır. Böylece **E-posta gönder → 3 gün bekle → Hatırlatma e-postası gönder** gibi bir damla dizisi oluşturabilirsiniz.
2. Ardından adımda otomatik bir yönlendirme varsa kart ilerler; yoksa bir kişinin üstlenmesi için adımda kalır.

:::tip
Bir adımın en başındaki **Bekle**, kartı bir gönüllüye göstermeden önce "tutmanın" basit bir yoludur. Örneğin: *7 gün bekle, sonra bir koç ulaşsın.*
:::

## Kişileri Kart Olarak Ekleme

Panoya kişi eklemenin birkaç yolu vardır:

- **Panodan** -- Bir adım sütununun altındaki **Kart Ekle**'ye tıklayın ve bir kişi seçin. Ayrıca bir grup da seçebilirsiniz; bu durumda o grubun her üyesi kart olarak eklenir.
- **Bir kişinin kaydından** -- Bir kişinin sayfasındaki **İş Akışına Ekle** ile kişiyi bir iş akışına ekleyin.
- **Kişi aramasından** -- Birden fazla kişi seçin ve toplu **İş Akışına Ekle** işlemini kullanarak hepsini tek seferde ekleyin.
- **Bir tetikleyiciyle otomatik olarak** -- Bir form gönderimi veya ilk bağış gibi bir şey olduğunda kişileri ekleyin (aşağıdaki [Tetikleyiciler](#triggers) bölümüne bakın).

Bir kişiyi elle veya bir **İş akışına ekle** adım işlemiyle eklemek, aynı iş akışında ikinci bir açık kart oluşturmaz. Kişinin zaten açık bir kartı varsa atlanır (toplu eklemede yalnızca kartı olmayan kişilere yeni kart verilir). Kartı kapatıldıktan sonra kişiyi yeniden ekleyebilirsiniz. Tetikleyiciler bunun yerine kendi **Kişi başına yalnızca bir kez** ayarını izler.

## Panoda Çalışma

Panosunu görmek için bir iş akışını açın. Her kart, kişinin adını, kime atandığını ve bir son tarih ya da durum çipini (**Gecikmiş** veya **Ertelendi**) gösterir. Bir adım sütunu, çalıştırdığı otomatik işlemler için küçük rozetleri ve yönlendirmesi için açıklamaları da gösterir. Böylece kartların nasıl aktığını bir bakışta görebilirsiniz.

- **Kartı taşıyın** -- Kişi ilerledikçe kartı bir sütundan diğerine sürükleyin.
- **Kartı açın** -- Kartın üzerine çift tıklayın (veya tek tıklayın) ve adımı değiştirebileceğiniz, yeniden atayabileceğiniz, not ekleyebileceğiniz ve daha önce neler olduğunu inceleyebileceğiniz ayrıntı çekmecesini açın.

Kart çekmecesinden şunları yapabilirsiniz:

- Kartı farklı bir kişiye veya gruba **Atayın**.
- Son tarihi geçici olarak gizlemek için kartı 1 gün, 3 gün veya 1 hafta **Erteleyin**.
- Kartı önceki adıma **Geri gönderin** veya bir sonraki adıma **Atlayın**.
- **Atamayı sabitleyin** -- Kart adımlar arasında hareket etse bile aynı sahibi koruyun. Varsayılan olarak, bir kartı yeni bir adıma taşımak onu o adımın varsayılan atananına yeniden atar. Sabitlemek ise mevcut kişinin sorumluluğunu baştan sona korur.
- Kartı bitirmek için **Tamamla**'yı kullanın veya adımda sonuçlar yapılandırılmışsa bir **Sonuç** düğmesi seçin (bkz. [Sonuçlar ve koşullarla yönlendirme](#routing-cards-with-outcomes-and-conditions)).
- **Kartı kaldırın** -- Kartı bitirmeden panodan çıkarın; örneğin biri yanlışlıkla eklendiyse. Onaylandıktan sonra kart kapatılır ve herkesin listesinden kaldırılır. Hiçbir sonuç, yönlendirme veya adım işlemi çalışmaz; geçmişi **Kaldırıldı** kaydıyla saklanır. [Hizmet görevi onayı](#serving-assignment-confirmations) kartı için, kartı kaldırmak talebi aynı şekilde kapatır.
- **Not ekleyin** ve kartın **Etkinliğini** inceleyin. Etkinlik, çalışmış otomatik işlemlerin (gönderilen e-postalar, beklemeler vb.) bir günlüğüdür ve her biri gerçekleştiği tarih ve saatle birlikte gösterilir.

Bir kişiye ait bir kart için çekmece, kişinin cep telefonu ve e-postasını da gösterir. Bunlar, kişiyi aramak veya e-postasını göndermek için tıklayabileceğiniz bağlantılardır. Kişilere erişim izniniz varsa ayrıca bir **Profili görüntüle** bağlantısı da çıkar. Kartın atandığı kişi, Kişiler bölümüne erişimi olmasa bile telefonu ve e-postayı görür.

Notlar karta kaydedilir. Kartı açabilen herkes (atandığı kişi veya grup dahil) notları okuyabilir ve kendi notunu ekleyebilir. Kartı açamayan kişiler notları göremez.

### Toplu işlemler

Birden fazla kartı birlikte işleme almak için onların onay kutularını seçin. Bir adımdaki tüm kartları aynı anda seçmek için o adımın sütun başlığındaki **Tümünü seç** kutusunu işaretleyin; seçimi temizlemek için tekrar işaretleyin. Seçili tüm kartlar için aynı anda **Tamamla**, **Ertele**, **Ata** (yeniden atama) veya başka bir adıma **Taşı…** işlemlerini yapabileceğiniz bir araç çubuğu görünür.

## Sonuçlar ve Koşullarla Yönlendirme

Yönlendirme, bir kartın bir adımdan çıkarken nereye gideceğini kontrol eder. İki tür yönlendirmeyi yapılandırmak için adım düzenleyicisini açın.

### Sonuç düğmeleri

Sonuçlar, o adımdaki bir kartı tamamlarken kart çekmecesinde gösterilen düğmelerdir. Tek bir **Tamamla** düğmesi yerine "Bir Gruba Katıldı" veya "İlgilenmiyor" gibi seçenekler sunabilirsiniz. Her sonuç şunları yapabilir:

- Kartı bu iş akışında **başka bir adıma** göndermek,
- Kartı tamamen farklı bir iş akışına **devretmek**, veya
- Kartı **kapatmak**.

Böylece tek bir karar, kişiyi farklı yollara ayırabilir.

### Otomatik yönlendirme (koşullu)

Otomatik yönlendirmeler, kişi bir dizi koşula uyduğunda kartı, bir adıma **girdiği anda** (ve otomatik işlemleri bittikten sonra) kimse tıklamadan ilerletir. Bir yönlendirme ekleyin, hedef adımı seçin ve bir veya daha fazla **koşul** tanımlayın (örneğin bir kişinin kampüsü, yaşı veya üyelik durumu). Metin alanları tam olarak eşleştirilebilir ya da **içerir**, **ile başlar** veya **ile biter** seçenekleriyle eşleştirilebilir. Koşulu olmayan bir yönlendirme herkesle eşleşir.

Tarih koşulları (Bugünün Tarihi, Doğum Tarihi veya Yıldönümü) tam tarihi ya da yalnızca bir kısmını karşılaştırabilir: haftanın günü, **Ayın Günü**, **Ay** veya geçen yıllar. Bir kişinin Doğum Tarihi veya Yıldönümü için **Ayın Günü**, göreli bir **Bugün** seçeneği sunar. Böylece *Doğum Tarihi · Ayın Günü = Bugün* gibi bir koşul, doğum günü o günün ayın gününe denk gelen kişileri eşleştirir. **Ay** seçeneği ise **Önceki Ay**, **Bu Ay** ve **Gelecek Ay** sunar. Bu gibi göreli değerler kilisenizin saat dilimine göre hesaplanır; böylece sunucunun değil, kilisenizin takvim gününe uyarlar.

**Bağış** koşulları grubunda **Bağışı kesilmiş düzenli bağışçı** bulunur. Bu koşul, eskiden düzenli bağış yapan ancak sonra bağışı kesilen kişileri bulur. Üç sayı belirleyin: *Son 12 haftanın en az 3 haftasında bağış yaptı, ardından son 3 haftada hiç bağış yapmadı* (bunlar varsayılan değerlerdir). Haftalar, kilisenizin saat dilimindeki bugünden geriye doğru sayılır ve iade edilen bağışlar sayılmaz. Bu koşul en çok bir [zamanlama tetikleyicisinde](#schedule-triggers) kullanışlıdır; örneğin bağışı kesilen kişileri haftalık olarak bir pastoral bakım takip panosuna ekleyen bir kural gibi. Koşul yalnızca bağış tarihlerine bakar, tutarlara asla bakmaz. Kartlar ve uyarılar tutarları hiçbir zaman göstermez. Bu seçenek kimin bağış vermeyi bıraktığını ortaya çıkardığı için yalnızca bağışları görüntüleyebilen kişiler bu seçeneği görür ve ekleyebilir, değiştirebilir veya kaldırabilir.

Bir yönlendirmenin koşulları herhangi bir nedenle kontrol edilemezse, o yönlendirme eşleşmiyor sayılır. Kart, takılıp kalmak yerine adımda kalır (veya eşleşen başka bir yönlendirmeyi izler).

:::info
Panoda her adım sütunu, yönlendirmesini açıklayan küçük notlar gösterir. Bunlar bir sonuç etiketi veya hedef adıma ya da iş akışına giden bir ok ile birlikte "eşleşirse" ifadesi olabilir.
:::

## Tamamen Otomatik Adımlar

Bir adımın kimse ilgilenmeden tamamen kendi başına çalışmasını sağlayabilirsiniz. Adıma **otomatik işlemlerini** verin ve bir sonraki adımı gösteren bir **otomatik yönlendirme** (koşulsuz) ekleyin. Bir kart girdiğinde işlemler çalışır, ardından yönlendirme kartı hemen ilerletir ve kart doğrudan geçer.

:::tip
Bunu **Bekle** ile birleştirin: *Hoş geldiniz e-postası gönder → 3 gün bekle → "Kişisel görüşme" adımına otomatik olarak ilerlet.* E-posta ve zamanlama sizin için yönetilir ve bir gönüllü kartı yalnızca insan temasının zamanı geldiğinde görür.
:::

## Tetikleyiciler

Tetikleyiciler, bir şey olduğunda kişileri otomatik olarak bir iş akışına ekler; böylece kartları elle eklemeniz gerekmez. Bir iş akışı panosunda **Tetikleyiciler** sekmesine, ardından **Tetikleyici Ekle**'ye tıklayın. İki tür vardır:

### Olay tetikleyicileri

B1'de bir kayıt değiştiği anda çalışır. Olayı seçin, ardından yalnızca eşleşen kişilerin eklenmesi için isteğe bağlı olarak **koşullar** ekleyin:

- **Kişi · Oluşturuldu / Güncellendi** -- örneğin durumu *Ziyaretçi* veya *Misafir* olan herkesi ekleyin (kendini kaydettiren kişilere verilen durum).
- **Bağış · Oluşturuldu** -- örneğin ilk kez veya büyük bir bağışı bir teşekkür iş akışına ekleyin (tutar, fon veya yönteme göre eşleştirin).
- **Grup · Üye Katıldı** / **Grup · Oluşturuldu**.
- **Form · Gönderildi** -- seçilen bir formu gönderen herkesi ekleyin ("Yeniyim" veya "Bağlantı" kartı için harika).

### Zamanlama tetikleyicileri

Bir koşul kümesine karşı günlük, haftalık, aylık veya yıllık olarak düzenli şekilde çalışır. Bunları zamana bağlı ulaşımlar için kullanın; örneğin *doğum günü bugün olan herkes* (Doğum Tarihi · Ayın Günü = **Bugün**, ayı da **Bu Ay** ile eşleşen) ya da *aylık* bir kontrol. **Kişi başına yalnızca bir kez** ayarı açık olmasa bile, bir zamanlama tetikleyicisi aynı kişiyi tek bir tekrar döneminde (çalışma sıklığına göre bir gün, hafta, ay veya yıl) yeniden eklemez.

Herhangi bir tetikleyici için ayrıca şunları da ayarlayabilirsiniz:

- Yeni kartın düşeceği **Başlangıç adımı** (varsayılan olarak ilk adım).
- **Kişi başına yalnızca bir kez** -- aynı kişinin tetikleyici tarafından iş akışına iki kez eklenmemesi için. Bu açıkken, bu iş akışında zaten kartı olan herkes atlanır.
  - **Kartı kapandıktan sonra yeniden ekle** -- **Kişi başına yalnızca bir kez** açıkken görünür. İşaretlenirse, tetikleyici bir kişiyi, bu iş akışındaki önceki kartı kapandıktan sonra yeniden ekleyebilir. Bir kişinin iş akışında aynı anda asla iki açık kartı olmaz. Bu seçeneği, bir kişinin birden fazla kez yaşayabileceği durumlar için kullanın; örneğin geri dönen bir misafir veya yıllık bir süreç.
- **Etkin** -- tetikleyiciyi silmeden açıp kapatın.

:::tip
Bir **Form · Gönderildi** tetikleyicisini **Yeni Ziyaretçi Takibi** şablonuyla eşleştirerek "Bağlantı Kartı" veya "Yeniyim" formunuzu otomatik bir takip sürecine dönüştürün.
:::

## Hizmet Görevi Onayları

Özel bir iş akışı türü, her gönüllü kabul edene veya reddedene kadar [hizmet taleplerini](./plans.md#assigning-team-members) takip edebilir. Bu panodaki her kart kişiler yerine **tek bir görevi** izler: bir plandaki bir pozisyonda bir kişi. Aynı kişi için iki rol veya iki hizmet ayrı kartlar alır. Bu özellik isteğe bağlıdır: Bir planın ayarlarında bir onay iş akışı seçmediğiniz sürece o plan için hiçbir şey değişmez.

### Kurulumu yapma

1. İş Akışları sayfasında **İş Akışı Ekle**'ye tıklayın ve **Hizmet Görevi Onayı** şablonunu seçin. (Ya da bir **Boş iş akışı** başlatın ve **İş akışı amacını** **Hizmet görevi onayı** olarak ayarlayın.) Şablondan oluşturmak, bir metin adımı içerdiği için metin gönderme iznini gerektirir.
2. Adımları inceleyin. Şablon şunlarla başlar:
   - **Talebi gönder ve yanıt bekle** -- hizmet talebini e-posta ve metinle gönderir, 2 gün bekler, bir hatırlatma e-postası gönderir, 1 gün daha bekler, ardından kartı otomatik olarak ilerletir.
   - **Yanıtsız talep için gönüllüyü ara** -- bir kişinin gönüllüyü araması için 1 gün içinde son tarihli bir adım. Bu adıma bir **Varsayılan atanan** belirleyin. Bir atanan yoksa kart, hizmet biriminin liderine veya lider yoksa birim ekibine gider.
3. Bekleme sürelerini, mesajları ve adımları kilisenize uyacak şekilde düzenleyin.
4. Bir [planın ayarlarını](./plans.md#plan-settings) açın ve **Onay iş akışı** altında bu iş akışını seçin.

Bu iş akışları, **E-posta gönder** ve **Metin gönder** yerine bir **Hizmet talebi gönder** işlemi kullanır. **E-posta** veya **Metin mesajı** seçin ve isterseniz bir **Talep mesajı** yazın. Talep her zaman pozisyonu, planı, hizmet tarihini ve yanıt vermek için bir bağlantıyı içerir. Mesajınızda `{{planName}}`, `{{positionName}}` ve `{{serviceDate}}` kullanabilirsiniz. Varsayılan talebi kullanmak için mesajı boş bırakın. Gönüllülerin bildirim tercihleri, metin mesajı onayı, metin sağlayıcınız ve kilisenizin e-posta onayı geçerlidir. Atlanan veya engellenen her deneme kartta kaydedilir. Bu panolarda **E-posta gönder**, **Metin gönder** ve **İş akışına ekle** kullanılamaz.

Bir onay iş akışının **Tetikleyiciler** sekmesi, kartların nasıl başlatıldığını açıklar; tetikleyici sunmaz. Bu iş akışları, kişilerin **İş akışına ekle** listelerinde görünmez.

### Kartların nasıl başlatılıp kapatıldığı

- Kartlar, yayımlanmış bir plandaki gönüllüleri **Bildirdiğinizde** başlar (bkz. [Gönüllüleri Bilgilendirme](./plan-validation.md#notifying-volunteers)). Yeni ve yanıtsız her atama bir kart alır. Bir planı kaydetmek, yayımlamak, kopyalamak veya otomatik doldurmak kendi başına kimseyle iletişime geçmez. Kurşun kalemle taslak olarak tutulan planlar hiçbir şey göndermez.
- Gönüllüler yine de olağan uygulama içi uyarıyı alır. E-posta ve metinle takip, iş akışından gelir.
- Gönüllü **kabul ettiğinde veya reddettiğinde** kartı, ona bağlı takip görevleriyle birlikte otomatik olarak kapanır.
- Kart çekmecesinde pozisyon, hizmet tarihi ve plana bir bağlantı görünür. **Tamamla** yerine düğme **Takip yapıldı olarak kaydet** yazar. Bu düğmeye tıklamak birinin takip ettiğini kaydeder; ancak kart, gönüllü yanıt verene veya yanıt süresi dolana kadar açık ve atanmış kalır (**Yanıt bekleniyor** olarak gösterilir).
- Yanıt süresi, pozisyon ekibinin hizmet verdiği son ibadet saatinin bitişidir. Planda eşleşen saatler yoksa, hizmet gününün sonudur. O zamana kadar kimse yanıt vermediyse kart **Yanıt süresi doldu** notuyla kapanır ve kartın mevcut sahibine ya da hizmet liderine **Yanıtsız hizmet talebini gözden geçir** görevi gider. Böylece biri boşluğu nasıl dolduracağına karar verebilir. Atama **Onaylanmadı** olarak kalır.
- Ataması kaldırmak, kişisini, pozisyonunu veya plan tarihini değiştirmek, planı kurşun kalemle taslağa geri döndürmek veya planı farklı bir onay iş akışına geçirmek kartı kapatır. Kapanmış bir kart başka bir **Bildir** işlemiyle asla yeniden açılmaz; yeni bir istek göndermek için yeni bir atama ekleyin.

:::info
Bir onay iş akışı üzerinden gönderilen talepler için [gönüllü hatırlatmaları](./plans.md#volunteer-reminders) yalnızca **kabul etmiş** gönüllülere gider. Böylece yanıt bekleyen kişiler, iş akışının takiplerine ek olarak hatırlatma almaz.
:::

## Kartlarım

Gönüllüler ve personel, işlerini bulmak için her panoyu taramak zorunda değildir. **Görevlerim** sayfasındaki **Kartlarım** listesi, mevcut kullanıcıya tüm iş akışlarında atanmış her kartı gösterir. Oraya ulaşmak için İş Akışları sayfasının üstündeki **Kartlarım**'a tıklayın veya Atlama menüsünde **Hizmet > Görevlerim**'i açın. Bir karta tıklamak, kartın ayrıntı panelini doğrudan Görevlerim sayfasında açar. Böylece sayfadan ayrılmadan kartı işleyebilir veya kaldırabilirsiniz. İş akışlarını görüntüleyebiliyorsanız panelde kartın ait olduğu panoya giden bir **İş akışı panosunu aç** bağlantısı da bulunur.

## Raporlar

Bir iş akışını açın ve o iş akışının analizlerini görmek için **Raporlar**'a tıklayın:

- **Gecikmiş** -- son tarihi geçmiş kartların sayısı.
- **Adım başına kart** -- her adımda şu anda kaç kart bulunduğu; sütun grafik olarak gösterilir.
- **Tamamlanan (30 gün)** -- son 30 gündeki tamamlanma hızı; çizgi grafik olarak gösterilir.

Bu verileri darboğazları fark etmek için kullanın. Örneğin kartların birikip hiç ilerlemediği bir adım gibi.

## İlgili Makaleler

- [Görevler](./tasks.md) -- iş akışı kartlarının dayandığı tek tek eylem maddeleri
- [Formlar](../forms/index.md) -- iş akışlarını tetikleyebilen formları oluşturun
- [Gruplar](../groups/index.md) -- "Gruba ekle" işleminin kişileri yerleştirebileceği gruplar
- [Hizmet Planları](./plans.md) -- bir planın hizmet taleplerine bir onay iş akışı seçin
- [Roller ve İzinler](../settings/roles-permissions.md) -- iş akışlarını kimin görüntüleyebileceğini, düzenleyebileceğini ve yönetebileceğini denetleyin

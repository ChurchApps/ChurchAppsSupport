---
title: "Kilise Ayarları"
description: "B1 Admin Kilise Ayarları sayfasında kilisenizin adını, adresini, alt alan adını, saat dilimini, bölge biçimini, SMS sağlayıcısını ve dosya depolamasını ayarlayın."
---

# Kilise Ayarları

<div class="article-intro">

Kilise Ayarları sayfası, kilisenizin temel bilgilerini, iletişim ayrıntılarını ve markasını yapılandırdığınız yerdir. Bu bilgiler, B1.church web siteniz ve B1 App dahil olmak üzere tüm ChurchApps araçlarında kullanılır.

</div>

## Eğitim Videosu

<YouTube id="634zSbzDkYA" title="B1'de Kilise Bilgilerini ve Markayı Ayarlama" next="B1'de Roller, İzinler ve Ekibinizi Davet Etme" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- "Kilise Ayarlarını Düzenle" iznine ihtiyacınız var. Erişiminiz yoksa [Roller ve İzinler](./roles-permissions.md) sayfasına bakın.
- Kilisenizin adresini, iletişim bilgilerini ve logosunu hazır bulundurun

</div>

## Kilise Bilgilerinizi Düzenleme

1. B1 Admin'de, [Jump menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Ayarlar** bölümünü genişletin ve **Ayarlar**'a tıklayın.
2. Sayfanın en üstündeki **Kilise Bilgileri** bölümünde **Düzenle**'ye tıklayın.
3. Aşağıdaki alanlardan istediğinizi güncelleyin:
   - **Kilise Adı** -- Tüm ChurchApps ürünlerinde görüntülenen ad.
   - **Adres** -- Kilisenizin fiziksel adresi.
   - **İletişim Bilgileri** -- Telefon numarası, e-posta ve diğer iletişim ayrıntıları.
   - **Saat Dilimi** -- Kilisenizin saat dilimi. Aşağıdaki [Saat Dilimi](#time-zone) bölümüne bakın.
4. Değişikliklerinizi uygulamak için **Kaydet**'e tıklayın.

## Alt Alan Adınızı Ayarlama

Kiliseniz, **kilisenizin-adi.1.church** adresinde ücretsiz bir alt alan adı alır. Üyelerin ve ziyaretçilerin kilisenizin çevrim içi varlığına eriştiği web adresi budur.

1. Ayarlar sayfasında **Kilise Bilgileri** bölümündeki **Düzenle**'ye tıklayın ve **Alt Alan Adı** alanını bulun.
2. Tercih ettiğiniz alt alan adını girin (örneğin, gracechurch.1.church için "gracechurch").
3. Değişikliklerinizi kaydedin.

:::info
Alt alan adınız, tüm ChurchApps kiliseleri arasında benzersiz olmalıdır. Tercih ettiğiniz ad alınmışsa, şehrinizi veya eyaletinizi ekleyerek deneyin (örneğin, "gracechurch-dallas").
:::

Ziyaretçilerin sitenize kendi alan adınızdan ulaşmasını istiyorsanız (örneğin, **`www.gracechurch.org`**), [Özel Alan Adı](./custom-domain.md) sayfasına bakın.

## Markayı Yapılandırma

Kilisenizin tüm ChurchApps araçlarında nasıl göründüğünü özelleştirin:

1. Logo alanına tıklayıp bir resim dosyası seçerek **kilise logonuzu** yükleyin.
2. Web sitenizde ve [mobil uygulamanızda](./mobile-app.md) kullanılan ek **kilise görsellerini** ekleyin.

:::tip
En iyi sonuç için, şeffaf arka planlı PNG formatında bir logo kullanın. Bu, logonun hem açık hem koyu arka planlarda iyi görünmesini sağlar.
:::

## Haftanın İlk Günü

Takvimlerinizin hangi gün başlayacağını seçin. Kilise Bilgileri bölümündeki **Haftanın İlk Günü** açılır listesi varsayılan olarak **Pazar**'dır, ancak herhangi bir güne ayarlanabilir. Değiştirdikten sonra, B1 Admin'deki ve B1.church üye portalındaki takvim ızgaralarında geçerli olur. Grup takvimleri, özel takvimler ve etkinlik düzenleyicisinin tümü haftayı seçtiğiniz günden başlatır.

## Saat Dilimi

Kilise Bilgileri bölümündeki **Saat Dilimi** açılır listesi, kilisenizin saat dilimini belirler (örneğin, *America/Chicago*). Boş bırakmak için **Yok**'u seçin. Kaydedildikten sonra, saat dilimi Kilise Bilgileri özetinde görünür.

B1, etkinlik hatırlatmaları ve [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) TV'lerindeki programlar gibi kilise genelindeki saatler için bu saat dilimini kullanır. [Giriş programları](../attendance/setup.md#setting-a-check-in-schedule) önce ibadetin [kampüsünün](./campuses.md) saat dilimine göre ölçülür ve yalnızca kampüsün saat dilimi yoksa kilisenin saat dilimi kullanılır. Kampüslerinizin hepsi aynı saat diliminde ise, hem kiliseye hem de her kampüse ayarlayın.

## Bölge (Tarih ve Telefon Biçimi)

**Bölge** ayarı, B1 genelinde tarihlerin ve saatlerin nasıl yazılacağını belirler. Varsayılan olarak tarihler Amerika Birleşik Devletleri biçimindedir (örneğin, "Sep 28, 2026" ve "9/28/2026"). ABD dışındaki kiliseler kendi biçimlerine geçebilir. Örneğin, "İngilizce (Birleşik Krallık)" seçildiğinde bunun yerine "28 Sept 2026" ve "28/09/2026" görüntülenir.

1. Ayarlar sayfasında, sol taraftaki listeden **Bölge**'ye tıklayın, ardından **Bölge** bölümünde **Düzenle**'ye tıklayın.
2. **Bölge** açılır listesinden bölgenizi seçin. Her seçenek bir örnek tarih gösterir, böylece tarihlerin nasıl görüneceğini tam olarak görebilirsiniz.
3. **Kaydet**'e tıklayın.

Bölge bölümü, ardından seçtiğiniz bölgeyi, **Tarih biçimi** örneğini ve **Telefon numaraları** biçiminizi gösterir.

### Telefon Numarası Biçimi

Aynı Bölge bölümünde, bir kişinin kaydındaki telefon numaralarının nasıl girileceğini kontrol eden bir **Telefon numaraları** ayarı bulunur:

- **Uluslararası (ülke kodu ile)** -- varsayılan. Telefon alanlarında bir ülke bayrağı seçici görünür ve numaraları ülke koduyla kaydeder (örneğin, +1 918 555 1234).
- **Yerel (yazıldığı gibi)** -- telefon alanları düz metin kutularına dönüşür ve numaraları yazdığınız gibi, ülke kodu eklenmeden kaydeder (örneğin, 0701 234 5678). Kilisenizin numaraları yerel biçimde yazması ve B1'in ülke kodu eklemesini istemediğiniz durumlarda bunu seçin.

**Yerel** seçildiğinde, Bölge bölümü bölgenizin yanında "Yerel telefon numaraları" ifadesini de gösterir.

:::tip
SMS gönderimi, numaralar ülke kodunu içerdiğinde en iyi şekilde çalışır. B1'den SMS gönderiyorsanız **Uluslararası** biçimini koruyun veya Yerel modda yazdığınız numaraların ülke kodunu içerdiğinden emin olun.
:::

Bölgeniz, B1 Admin'deki ve B1.church web sitenizdeki ve üye portalınızdaki tarih ve saatlere uygulanır. Bu; vaazları, blog yazılarını, grup takvimlerini ve hizmet planlarını da kapsar. Böylece üyeler, personelinizin gördüğü biçimde tarihleri görür.

## SMS Gönderimi {#texting}

B1 Admin'den bir kişiye veya tüm bir gruba SMS göndermek için bir SMS sağlayıcısı bağlayın. Mesajlar sağlayıcıyla olan kendi hesabınız üzerinden gönderilir, bu nedenle sağlayıcının fiyatları ve sınırları geçerlidir.

1. Ayarlar sayfasında, sol taraftaki listeden **SMS Gönderimi**'ne tıklayın, ardından **SMS Gönderimi** bölümünde **Düzenle**'ye tıklayın.
2. Bir **Sağlayıcı** seçin:
   - **Clearstream** -- bir **API Anahtarı** girin. Clearstream Hesap Ayarlarınızda, API Keys altında bir anahtar oluşturun.
   - **Text In Church** -- bir **API Anahtarı** girin. Önce Text In Church Destek ekibinden geliştirici API erişimi isteyin, ardından Hesap Ayarları > Developer API bölümünde bir anahtar oluşturun.
   - **Nalo Solutions** (Gana) -- Nalo Solutions hesabınızdaki yetkilendirme anahtarını **API Anahtarı** olarak girin ve Nalo'nun sizin için onayladığı bir **Gönderen Kimliği** (en fazla 11 karakter) girin.
   - **Twilio** -- kendi kilisenizin Twilio hesabını kullanın; Twilio sizden doğrudan ücret alır. [Twilio Console](https://console.twilio.com) üzerinden **Account SID** ve **Auth Token** değerlerini kopyalayın ve bir **From Number** girin. Bu, A2P 10DLC için kayıtlı bir Twilio telefon numarasıdır ve `+15551234567` gibi bir biçimde olmalıdır. Kaydettikten sonra, aşağıda açıklanan gelen webhook URL'sini Twilio'da numaranın **A message comes in** webhook alanına yapıştırın. Böylece DUR yanıtları B1'de de kaydedilir.
3. **Kaydet**'e tıklayın.

SMS göndermeyi durdurmak için **Sağlayıcı**'yı **Yok** olarak ayarlayın ve kaydedin. Bu işlem kayıtlı sağlayıcıyı kaldırır.

### DUR Yanıtı Veren Kişilerin Aboneliğini Sonlandırma

Bir sağlayıcı kaydedildikten sonra, SMS Gönderimi bölümünü **Düzenle** ile yeniden açın. Sağlayıcı ayarlarının altında, salt okunur bir **Gelen (DUR) webhook URL'si** alanı, kiliseniz için benzersiz bir web adresi gösterir. Adresi seçmek için alana tıklayın, kopyalayın ve sağlayıcınızın gelen mesaj (yanıt) webhook ayarına yapıştırın. Bu, gelen yanıtları bir webhook'a yönlendirebilen yukarıdaki sağlayıcıların herhangi biriyle çalışır.

Bundan sonra, gönderdiğiniz bir mesaja birisi **DUR** (veya STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ya da REVOKE) yanıtı verirse, B1 mobil numarası eşleşen herkesi bulur, bu kişileri aboneliği iptal edilmiş olarak işaretler ve SMS hatırlatmalarını kapatır. Bu kişiler artık grup mesajlarında atlanır. Diğer yanıtlar yok sayılır.

:::info
Bu, **Beni üye dizininden gizle** ile aynı abonelik ayarını kullanır. Bu nedenle DUR yanıtı veren kişiler, profillerinde de **Dizinden gizlendi** olarak görünür. Bu alan yalnızca kayıtlı sağlayıcı seçiliyken görünür. Açılır listeden farklı bir sağlayıcıya geçerseniz, URL'yi tekrar görmek için önce kaydedin.
:::

Bir sağlayıcı bağlandığında, SMS gönderme yetkisi olan personel, bir grubun sayfasında (**Bu grubu SMS ile bilgilendir**) ve cep telefonu olan bir kişinin sayfasında (**SMS mesajı gönder**) bir **SMS** düğmesi görür. Mesajınızı yazın ve **Gönder**'e tıklayın. İletişim kutusu karakterleri ve SMS bölümlerini sayar. Bir grup için, göndermeden önce mesajı kaç üyenin alacağını gösterir:

- Kayıtlarında cep telefonu numarası olmayan üyeler atlanır.
- **Beni üye dizininden gizle** seçeneğini işaretlemiş üyeler, abonelikleri iptal edilmiş sayılır ve atlanır.
- Aynı cep telefonu numarasını paylaşan aile üyeleri mesajı yalnızca bir kez alır.

### Birleştirme Alanlarıyla Mesajları Kişiselleştirme {#personalizing-texts-with-merge-fields}

Mesaj kutusunun altında, SMS iletişim kutusu **Adı**, **Soyadı**, **Görünen Ad** ve **Kilise Adı** yer tutucu çiplerini gösterir. Bir çipe tıklayarak yer tutucusunu imlecinizin olduğu yere ekleyebilirsiniz (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` veya `{{churchName}}`). Mesaj gönderildiğinde, her yer tutucu alıcının bilgileriyle değiştirilir. Böylece `Merhaba {{firstName}}, pazar görüşmek üzere!` gibi bir grup mesajı, her üyeye kendi adıyla ulaşır. Yer tutucular hem grup mesajlarında hem de tek bir kişiye gönderilen mesajlarda çalışır. Gruba gönderilen mesajlarda ayrıca **Grup Adı** çipi (`{{groupName}}`) bulunur ve bu çip grubun adıyla değiştirilir.

Bir mesajı yeniden kullanmak için, onu bir [SMS şablonu](./email-templates.md#text-templates) olarak kaydedin (**SMS** kategorisine sahip bir e-posta şablonu) ve SMS penceresinin üstündeki **Şablon Yükle (isteğe bağlı)** alanından seçin.

:::info
1.600 karakterlik sınır, yazarken gördüğünüz mesaja uygulanır. Yer tutucular doldurulduktan sonra, 1.600 karakterden uzun olan metin bu uzunlukta kesilir.
:::

Mesajlar ayrıca bir [iş akışı](../serving/workflows.md#sending-a-text) adımındaki **SMS Gönder** eylemiyle otomatik olarak da gönderilebilir. Bu eylem aynı sağlayıcıyı ve yer tutucuları kullanır.

## Dosya Depolama

Varsayılan olarak, web sitenize ([Dosyalar](../website/files.md) üzerinden) ve diğer içerik alanlarına yüklediğiniz dosyalar, 100 MB'a kadar B1'in ücretsiz barındırma alanını kullanır. Daha fazla alana ihtiyacınız varsa, bunun yerine kendi bulut depolamanızı bağlayabilirsiniz. Bu durumda yeni yüklemeler doğrudan kendi hesabınıza gider ve platform sınırı uygulanmaz.

1. Ayarlar sayfasında, sol taraftaki listeden **Dosya Depolama**'ya tıklayın, ardından **Dosya Depolama** bölümünde **Düzenle**'ye tıklayın.
2. Bir sağlayıcı seçin: **Google Drive**, **Dropbox**, **OneDrive** veya bir **S3 uyumlu bucket** (AWS S3, Cloudflare R2, Backblaze B2 vb.).
3. Google Drive, Dropbox veya OneDrive için **Bağlan**'a tıklayın ve erişimi yetkilendirmek için oturum açın. S3 uyumlu bir bucket için erişim anahtarınızı, gizli anahtarınızı, bucket adınızı ve genel URL temelini girin.
4. **Kaydet**'e tıklayın.

:::info
Bu ayar yalnızca web sitenizin Dosyalarına ve benzer içerik alanlarına yapılan yeni yüklemeleri etkiler. Galeri görselleri, küçük resimler, logolar ve kişi fotoğrafları her zaman B1'in varsayılan depolama alanında kalır.
:::

## Sınıf Yükseltme

Çocuklar ve öğrenciler için **Sınıf** takip ediyorsanız, B1 her kişinin profilini tek tek elle düzenlemek yerine, sizin seçtiğiniz bir tarihte (örneğin, 1 Ağustos) herkesin sınıfını otomatik olarak bir üst sınıfa yükseltebilir.

1. Ayarlar sayfasında, sol taraftaki listeden **Sınıf Yükseltme**'ye tıklayın, ardından **Sınıf Yükseltme** bölümünde **Düzenle**'ye tıklayın.
2. Anahtarı açın (**Etkin** olarak görünmelidir) ve her yıl sınıfların yükseltileceği **Ay** ve **Gün**'ü seçin. O tarihte, sınıfı olan herkes bir üst sınıfa geçer ve 12. sınıf öğrencileri **Mezun** olur.
3. Değişikliklerinizi kaydedin.

Otomatik yükseltmeyi durdurmak için anahtarı kapatın, böylece **Devre dışı** olarak görünsün, ardından kaydedin. Yükseltme tarihi kaldırılır ve sınıflar artık kendiliğinden değişmez.

## Gönüllü Kaydı {#volunteer-signup}

Varsayılan olarak, [gönüllü kayıtlarına](../../b1-church/serving/volunteer-signup.md) göz atan üyeler, açık pozisyonu olan her yaklaşan haftayı görür. Bu liste uzunsa, bunun yerine her plan türünün yalnızca bir sonraki haftasını gösterebilirsiniz.

1. Ayarlar sayfasında, sol taraftaki listeden **Gönüllü Kaydı**'na tıklayın, ardından **Gönüllü Kaydı** bölümünde **Düzenle**'ye tıklayın.
2. **Yalnızca her plan türünün bir sonraki haftasını göster** seçeneğini açın.
3. Değişikliklerinizi kaydedin.

Bu seçenek açıkken, her plan türü yalnızca bir sonraki yaklaşan planını gösterir. Bir sonraki hafta, o tarih geçtikten sonra görünür. Bölümün **Gösterilen haftalar** satırı, **Yalnızca her plan türünün bir sonraki haftası** veya **Tüm yaklaşan haftalar** yazar.

## Bağış Gizliliği {#giving-privacy}

Bağış erişimi olan kişiler normalde bir kişinin bağış toplamlarını [kişi kaydında](../people/adding-people.md#editing-details) görür. Bir kayıt her açıldığında tutarların ekranda görünmesini istemiyorsanız, biri sorana kadar bunları gizleyebilirsiniz.

1. Ayarlar sayfasında, sol taraftaki listeden **Bağış gizliliği**'ne tıklayın, ardından **Bağış gizliliği** bölümünde **Düzenle**'ye tıklayın.
2. **Kişi kayıtlarında tıklanana kadar bağışları gizle** seçeneğini açın.
3. Değişikliklerinizi kaydedin.

Bu seçenek açıkken, kişi kaydındaki bağış kartı "Bağışlar kişi kayıtlarında gizlidir." yazar. Bu kişinin bağışlarını yüklemek ve görüntülemek için **Bağışları göster**'e tıklayın. Farklı bir kişiyi açtığınızda bağışlar yeniden gizlenir. Bağışları kimin görebildiği değişmez: bağış kartını yalnızca bağış erişimi olan kişiler görür.

## İçe ve Dışa Aktarma

Ayarlar sayfasında kilisenizin adının altındaki **İçe/Dışa Aktarma** bağlantısı, yeni bir tarayıcı penceresinde özel bir araç açar. Bunu şu amaçlarla kullanın:

- Başka bir kilise yönetim sisteminden üye verilerini içe aktarmak.
- Yedekleme veya taşıma amacıyla ChurchApps verilerinizi dışa aktarmak.

Bu, kilisenizi ilk kez kurarken ve mevcut kayıtları ChurchApps'e aktarmanız gerektiğinde özellikle yararlıdır.

:::warning
Veri içe aktarırken, her zaman önce mevcut kayıtlarınızı yedekleyin. İçe aktarma işlemleri sisteminize veri ekler ve birden fazla kez çalıştırılırsa yinelenen kayıtlar oluşturabilir.
:::

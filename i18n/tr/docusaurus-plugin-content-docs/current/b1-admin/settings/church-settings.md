---
title: "Kilise Ayarları"
description: "B1 Admin Kilise Ayarları sayfasında kilisenizin adını, adresini, alt alan adını, saat dilimini, bölge biçimini, kısa mesaj sağlayıcısını ve dosya depolamasını ayarlayın."
---

# Kilise Ayarları

<div class="article-intro">

Kilise Ayarları sayfası, kilisenizin temel bilgilerini, iletişim ayrıntılarını ve markasını yapılandırdığınız yerdir. Bu ayrıntılar B1.church web siteniz ve B1 Mobile uygulaması dahil tüm ChurchApps araçlarında kullanılır.

</div>

## Eğitim Videosu

<YouTube id="634zSbzDkYA" title="B1'de Kilise Bilgilerini ve Markayı Ayarlama" next="B1'de Roller, İzinler ve Ekibinizi Davet Etme" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- "Kilise Ayarlarını Düzenle" iznine ihtiyacınız vardır. Erişiminiz yoksa [Roller ve İzinler](./roles-permissions.md) bölümüne bakın.
- Kilisenizin adresini, iletişim bilgilerini ve logosunu hazır bulundurun

</div>

## Kilise Bilgilerinizi Düzenleme

1. B1 Admin'de, [Jump menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın, **Ayarlar** bölümünü genişletin ve **Ayarlar**'a tıklayın.
2. **Kilise Bilgileri** bölümünde (sayfanın üst kısmında), **Düzenle**'ye tıklayın.
3. Aşağıdaki alanlardan herhangi birini güncelleyin:
   - **Kilise Adı** -- Tüm ChurchApps ürünlerinde görüntülenen ad.
   - **Adres** -- Kilisenizin fiziksel adresi.
   - **İletişim Bilgileri** -- Telefon numarası, e-posta ve diğer iletişim ayrıntıları.
   - **Saat Dilimi** -- Kilisenizin saat dilimi. Aşağıdaki [Saat Dilimi](#time-zone) bölümüne bakın.
4. Değişikliklerinizi uygulamak için **Kaydet**'e tıklayın.

## Alt Alan Adınızı Ayarlama

Kiliseniz **yourchurch.1.church** adresinde ücretsiz bir alt alan adı alır. Bu, üyelerin ve ziyaretçilerin kilisenizin çevrimiçi varlığına eriştiği web adresidir.

1. Ayarlar sayfasında, **Kilise Bilgileri** bölümündeki **Düzenle**'ye tıklayın ve **Alt Alan Adı** alanını bulun.
2. Tercih ettiğiniz alt alan adını girin (örneğin, gracechurch.1.church için "gracechurch").
3. Değişikliklerinizi kaydedin.

:::info
Alt alan adınız tüm ChurchApps kiliseleri arasında benzersiz olmalıdır. Tercih ettiğiniz ad alınmışsa, şehir veya eyalet adınızı ekleyerek deneyin (örneğin, "gracechurch-dallas").
:::

Ziyaretçilerin sitenize kendi alan adınız üzerinden ulaşmasını istiyorsanız (örneğin **`www.gracechurch.org`**), [Özel Alan Adı](./custom-domain.md) bölümüne bakın.

## Markayı Yapılandırma

Kilisenizin tüm ChurchApps araçlarında nasıl göründüğünü özelleştirin:

1. Logo alanına tıklayıp bir görsel dosyası seçerek **kilise logonuzu** yükleyin.
2. Web sitenizde ve [mobil uygulamada](./mobile-app.md) kullanılan ek **kilise görsellerini** ekleyin.

:::tip
En iyi sonuç için, PNG biçiminde, şeffaf arka planlı bir logo kullanın. Bu, logonun hem açık hem de koyu arka planlarda iyi görünmesini sağlar.
:::

## Haftanın İlk Günü

Takvimlerinizin hangi gün başlayacağını seçin. Kilise Bilgileri bölümündeki **Haftanın İlk Günü** açılır listesi varsayılan olarak **Pazar**'dır, ancak herhangi bir gün olarak ayarlanabilir. Değiştirildikten sonra, B1 Admin ve B1.church üye portalındaki takvim ızgaralarında geçerli olur. Grup takvimleri, özel takvimler ve etkinlik düzenleyici, haftaları seçtiğiniz günle başlatır.

## Saat Dilimi

Kilise Bilgileri bölümündeki **Saat Dilimi** açılır listesi, kilisenizin saat dilimini belirler (örneğin *America/Chicago*). Boş bırakmak için **Yok**'u seçin. Kaydedildikten sonra, saat dilimi Kilise Bilgileri özetinde görünür.

B1, etkinlik hatırlatmaları ve [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) TV'lerinizdeki programlar gibi kilise genelindeki saatler için bu saat dilimini kullanır. [Giriş programları](../attendance/setup.md#setting-a-check-in-schedule) önce ibadetin [kampüsünün](./campuses.md) saat diliminde ölçülür ve yalnızca o kampüsün saat dilimi yoksa kilisenin saat dilimi kullanılır. Kampüslerinizin hepsi aynı saat diliminde ise, bunu hem kiliseye hem de her kampüse ayarlayın.

## Bölge (Tarih ve Telefon Biçimi)

**Bölge** ayarı, B1 genelinde tarihlerin ve saatlerin nasıl yazılacağını belirler. Varsayılan olarak tarihler Amerika Birleşik Devletleri biçimindedir (örneğin "Sep 28, 2026" ve "9/28/2026"). ABD dışındaki kiliseler kendi biçimlerine geçebilir. Örneğin, İngilizce (Birleşik Krallık) seçildiğinde bunun yerine "28 Sept 2026" ve "28/09/2026" gösterilir.

1. Ayarlar sayfasında, sol taraftaki listeden **Bölge**'ye tıklayın, ardından **Bölge** bölümündeki **Düzenle**'ye tıklayın.
2. **Bölge** açılır listesinden bölgenizi seçin. Her seçenek bir örnek tarih gösterir, böylece tarihlerin tam olarak nasıl görüneceğini görebilirsiniz.
3. **Kaydet**'e tıklayın.

Bölge bölümü, daha sonra seçtiğiniz bölgeyi, **Tarih biçiminin** bir örneğini ve **Telefon numaraları** biçimini gösterir.

### Telefon Numarası Biçimi

Aynı Bölge bölümündeki **Telefon numaraları** ayarı, bir kişinin kaydına telefon numaralarının nasıl girileceğini denetler:

- **Uluslararası (ülke koduyla)** -- varsayılandır. Telefon alanlarında bir ülke bayrağı seçici görünür ve numaraları ülke koduyla kaydeder (örneğin +1 918 555 1234).
- **Yerel (yazıldığı gibi)** -- telefon alanları düz metin kutularına dönüşür ve numaraları yazdığınız gibi, ülke kodu eklenmeden kaydeder (örneğin 0701 234 5678). Kiliseniz numaraları yerel biçimde yazıyorsa ve B1'in ülke kodu eklemesini istemiyorsa bunu seçin.

**Yerel** seçildiğinde, Bölge bölümü bölgenizin yanında "Yerel telefon numaraları" ifadesini de gösterir.

:::tip
Kısa mesajlaşma en iyi, numaralar ülke kodunu içerdiğinde çalışır. B1'den kısa mesaj gönderiyorsanız **Uluslararası** biçimini koruyun veya Yerel modda yazdığınız numaralarda ülke kodunun bulunduğundan emin olun.
:::

Bölgeniz, B1 Admin'deki ve B1.church web sitenizde ve üye portalınızdaki tarihleri ve saatleri, vaazlar, blog yazıları, grup takvimleri ve hizmet planları dahil olmak üzere etkiler. Böylece üyeler, tarihleri personelinizin gördüğü biçimde görür.

## Kısa Mesajlaşma {#texting}

B1 Admin'den bir kişiye veya tüm bir gruba SMS göndermek için bir kısa mesaj sağlayıcısı bağlayın. Mesajlar sağlayıcıyla kendi hesabınız üzerinden gönderilir, dolayısıyla sağlayıcının fiyatlandırması ve sınırları geçerlidir.

1. Ayarlar sayfasında, sol taraftaki listeden **Kısa Mesajlaşma**'ya tıklayın, ardından **Kısa Mesajlaşma** bölümündeki **Düzenle**'ye tıklayın.
2. Bir **Sağlayıcı** seçin:
   - **Clearstream** -- bir **API Anahtarı** girin. Bunu Clearstream Hesap Ayarlarınızda, API Anahtarları altında oluşturun.
   - **Text In Church** -- bir **API Anahtarı** girin. Önce Text In Church Desteğinden geliştirici API erişimi isteyin, ardından Hesap Ayarları > Geliştirici API bölümünde bir anahtar oluşturun.
   - **Nalo Solutions** (Gana) -- Nalo Solutions hesabınızdan aldığınız yetkilendirme anahtarını **API Anahtarı** olarak girin ve Nalo'nun sizin için onayladığı bir **Gönderici Kimliği** (en fazla 11 karakter) girin.
   - **Twilio** -- kendi kilisenizin Twilio hesabını kullanın; Twilio sizden doğrudan ücret alır. [Twilio Konsolu](https://console.twilio.com) üzerinden **Hesap SID** ve **Kimlik Doğrulama Belirteci** değerlerini kopyalayın ve bir **Gönderen Numarası** girin. Bu, A2P 10DLC için kayıtlı bir Twilio telefon numarasıdır ve `+15551234567` gibi bir biçimde olmalıdır. Kaydettikten sonra, aşağıdaki gelen webhook URL'sini Twilio'da numaranın **Bir mesaj geldiğinde** webhook alanına yapıştırın. Böylece DUR yanıtları B1'de de kaydedilir.
3. **Kaydet**'e tıklayın.

Kısa mesajlaşmayı durdurmak için **Sağlayıcı**'yı **Yok** olarak ayarlayıp kaydedin. Bu, kayıtlı sağlayıcıyı kaldırır.

### DUR Yanıtı Veren Kişilerin Iletişim Iznini Kaldırma

Bir sağlayıcı kaydedildikten sonra, Kısa Mesajlaşma bölümünü **Düzenle** ile yeniden açın. Sağlayıcı ayarlarının altında, salt okunur bir **Gelen (DUR) webhook URL'si** alanı, kilisenize özgü bir web adresi gösterir. Adresi seçmek için alana tıklayın, kopyalayın ve gelen mesaj (yanıt) webhook ayarına, sağlayıcınızın yukarıdaki sağlayıcılardan biri olması durumunda yapıştırın. Bu, gelen yanıtları bir webhook'a iletebilen tüm sağlayıcılarla çalışır.

Bundan sonra, birisi mesajlarınızdan birine **DUR** (veya STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT ya da REVOKE) yanıtı verdiğinde, B1 cep telefonu numarası eşleşen herkesi bulur, onları iletişim iznini kapatmış olarak işaretler ve metin hatırlatmalarını kapatır. Bundan sonra grup mesajlarında atlanırlar. Diğer yanıtlar yok sayılır.

:::info
Bu, **Üye rehberinden gizle** ile aynı iletişim izni ayarını kullanır. Bu nedenle DUR yanıtı veren kişiler, profillerinde de **Rehberden gizlendi** olarak görünür. Bu alan yalnızca kayıtlı sağlayıcı seçiliyken görünür. Açılır listeyi başka bir sağlayıcıya değiştirirseniz, URL'yi yeniden görmek için önce kaydedin.
:::

Bir sağlayıcı bağlandığında, mesaj gönderme izni olan personel, bir grubun sayfasında (**Bu grubu mesajla**) ve cep telefonu olan bir kişinin sayfasında (**Metin mesajı gönder**) bir **Mesaj** düğmesi görür. Mesajınızı yazın ve **Gönder**'e tıklayın. İletişim kutusu karakterleri ve SMS bölümlerini sayar. Bir grup için, göndermeden önce mesajı kaç üyenin alacağını gösterir:

- Kayıtlı cep telefonu olmayan üyeler atlanır.
- **Üye rehberinden gizle** seçeneğini işaretleyen üyeler, iletişim izni kapalı sayılır ve atlanır.
- Aynı cep numarasını paylaşan aile üyeleri mesajı yalnızca bir kez alır.

### Birleştirme Alanlarıyla Mesajları Kişiselleştirme {#personalizing-texts-with-merge-fields}

Mesaj kutusunun altında, Mesaj iletişim kutusu yer tutucu çiplerini gösterir: **Ad**, **Soyad**, **Görünen Ad** ve **Kilise Adı**. Bir çipe tıklayarak yer tutucusunu imlecinizin olduğu yere ekleyin (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` veya `{{churchName}}`). Mesaj gönderildiğinde, her yer tutucu alıcının kendi bilgileriyle değiştirilir. Böylece `Merhaba {{firstName}}, pazar görüşmek üzere!` gibi bir grup mesajı, her üyeye kendi adıyla ulaşır. Yer tutucular hem grup mesajlarında hem de tek bir kişiye gönderilen mesajlarda çalışır. Gruplara gönderilen mesajlarda ayrıca bir **Grup Adı** çipi (`{{groupName}}`) de bulunur ve bu, grubun adıyla değiştirilir.

Bir mesajı yeniden kullanmak için, onu bir [metin şablonu](./email-templates.md#text-templates) olarak kaydedin (**Mesaj** kategorisine sahip bir e-posta şablonu) ve Mesaj penceresinin üstündeki **Şablon Yükle (isteğe bağlı)** seçeneğinden seçin.

:::info
1.600 karakter sınırı, yazdığınız mesaj için geçerlidir. Yer tutucular doldurulduktan sonra, 1.600 karakterden uzun olan her metin bu uzunlukta kesilir.
:::

Mesajlar, bir [iş akışı](../serving/workflows.md#sending-a-text) adımındaki **Mesaj Gönder** eylemiyle de otomatik olarak gönderilebilir. Bu eylem, aynı sağlayıcıyı ve yer tutucuları kullanır.

## Dosya Depolama

Varsayılan olarak, web sitenize ([Dosyalar](../website/files.md) aracılığıyla) ve diğer içerik alanlarına yüklediğiniz dosyalar, 100 MB'a kadar B1'in ücretsiz barındırılan depolamasını kullanır. Daha fazla alana ihtiyacınız varsa, bunun yerine kendi bulut depolamanızı bağlayabilirsiniz. Bu durumda yeni yüklemeler doğrudan hesabınıza gider ve platformun bir sınırı olmaz.

1. Ayarlar sayfasında, sol taraftaki listeden **Dosya Depolama**'ya tıklayın, ardından **Dosya Depolama** bölümündeki **Düzenle**'ye tıklayın.
2. Bir sağlayıcı seçin: **Google Drive**, **Dropbox**, **OneDrive** veya bir **S3 uyumlu depo** (AWS S3, Cloudflare R2, Backblaze B2 vb.).
3. Google Drive, Dropbox veya OneDrive için **Bağlan**'a tıklayın ve erişimi yetkilendirmek için oturum açın. S3 uyumlu bir depo için erişim anahtarınızı, gizli anahtarınızı, depo adınızı ve genel URL tabanını girin.
4. **Kaydet**'e tıklayın.

:::info
Bu yalnızca web sitesi Dosyalarınıza ve benzer içerik alanlarına yapılan yeni yüklemeleri etkiler. Galeri görselleri, küçük resimler, logolar ve kişi fotoğrafları her zaman B1'in varsayılan depolamasında kalır.
:::

## Sınıf Yükseltme

Çocuklarda ve öğrencilerde **Sınıf** bilgisini takip ediyorsanız, B1 her birini her profili tek tek düzenlemek zorunda kalmadan, seçtiğiniz bir tarihte (örneğin 1 Ağustos) otomatik olarak bir sınıf yukarı taşıyabilir.

1. Ayarlar sayfasında, sol taraftaki listeden **Sınıf Yükseltme**'ye tıklayın, ardından **Sınıf Yükseltme** bölümündeki **Düzenle**'ye tıklayın.
2. Anahtarı açın (**Etkin** olarak görünür) ve her yıl sınıfların yükseltileceği **Ay** ve **Gün**'ü seçin. O tarihte, sınıfı olan herkes bir sınıf yukarı çıkar ve 12. sınıf öğrencileri **Mezun** olur.
3. Değişikliklerinizi kaydedin.

Otomatik yükseltmeyi durdurmak için anahtarı kapatın, böylece **Devre dışı** görünsün, ardından kaydedin. Yükseltme tarihi kaldırılır ve sınıflar artık kendiliğinden değişmez.

## Gönüllü Kaydı {#volunteer-signup}

Varsayılan olarak, [gönüllü kayıtlarına](../../b1-church/serving/volunteer-signup.md) göz atan üyeler, açık pozisyonları olan her yaklaşan haftayı görür. Bu liste uzarsa, bunun yerine her plan türü için yalnızca bir sonraki haftayı gösterebilirsiniz.

1. Ayarlar sayfasında, sol taraftaki listeden **Gönüllü Kaydı**'na tıklayın, ardından **Gönüllü Kaydı** bölümündeki **Düzenle**'ye tıklayın.
2. **Her plan türü için yalnızca bir sonraki haftayı göster** seçeneğini açın.
3. Değişikliklerinizi kaydedin.

Bu seçenek açıkken, her plan türü yalnızca bir sonraki yaklaşan planını gösterir. Bir sonraki hafta, o tarih geçtikten sonra görünür. Bölümdeki **Gösterilen haftalar** satırı, **Her plan türü için yalnızca bir sonraki hafta** veya **Tüm yaklaşan haftalar** yazar.

## Bağış Gizliliği {#giving-privacy}

Bağış erişimi olan kişiler normalde bir kişinin bağış toplamlarını [kişi kaydında](../people/adding-people.md#editing-details) görür. Bir kayıt her açıldığında tutarların ekranda görünmesini istemiyorsanız, biri istediğinde gösterilecek şekilde gizleyebilirsiniz.

1. Ayarlar sayfasında, sol taraftaki listeden **Bağış gizliliği**'ne tıklayın, ardından **Bağış gizliliği** bölümündeki **Düzenle**'ye tıklayın.
2. **Tıklanana kadar kişi kayıtlarında bağışları gizle** seçeneğini açın.
3. Değişikliklerinizi kaydedin.

Bu seçenek açıkken, kişi kaydındaki bağış kartı "Bağışlar kişi kayıtlarında gizlidir" yazar. Bu kişinin bağışlarını yüklemek ve görüntülemek için **Bağışları göster**'e tıklayın. Farklı bir kişiyi açtığınızda tekrar gizlenir. Bağışları kimin görebileceği değişmez: yalnızca bağış erişimi olan kişiler kartı görür.

## İçe ve Dışa Aktarma

Ayarlar sayfasında kilisenizin adının altındaki **İçe/Dışa Aktarma** bağlantısı, yeni bir tarayıcı penceresinde özel bir araç açar. Bunu şunlar için kullanın:

- Başka bir kilise yönetim sisteminden üye verilerini içe aktarmak.
- Yedekleme veya taşıma amacıyla ChurchApps verilerinizi dışa aktarmak.

Bu, kilisenizi ilk kez kurarken ve mevcut kayıtları ChurchApps'e aktarmanız gerektiğinde özellikle yararlıdır.

:::warning
Veri içe aktarırken, önce mevcut kayıtlarınızı her zaman yedekleyin. İçe aktarma işlemleri sisteminize veri ekler ve birden fazla çalıştırılırsa yinelenen kayıtlar oluşturabilir.
:::

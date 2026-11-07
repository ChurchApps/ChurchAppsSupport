---
title: "Form Oluşturma"
description: "B1 Admin'de etkinlik kayıtları, anketler ve ziyaretçi kartları için özel formlar oluşturun; bunları bağlantı, QR kod ya da basılı olarak paylaşın."
---

# Form Oluşturma

<div class="article-intro">

Topluluğunuzdan bilgi toplamak için özel formlar oluşturun. Etkinlik kayıtları, anketler, ziyaretçi kartları, üyelik başvuruları ve daha fazlası için formlar hazırlayabilirsiniz. Formlar, veritabanınızdaki kişilere bağlanabilir veya kendi herkese açık bağlantısına sahip bağımsız sayfalar olarak kullanılabilir.

</div>

## Eğitim Videosu

<YouTube id="sr9wxEj9ghQ" title="B1'de Form Oluşturma ve Gönderileri Yönetme" next="B1'de Kilise Web Sitenizi Yayınlama" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Kişi** formları (kişi kayıtlarına bağlı) için önce [veritabanınızda kişiler](../people/adding-people.md) bulunmalıdır.
- **Ödeme** toplayan formlar için önce [çevrimiçi bağış için Stripe yapılandırılmış](../donations/online-giving-setup.md) olmalıdır.

</div>

## Yeni Form Oluşturma

1. [Jump menüsünü](../introduction.md#getting-around-with-the-jump-menu) (B1 Admin'in sol üst kısmındaki arama çubuğu) açın, **People** bölümünü genişletin ve **Forms** seçeneğine tıklayın.
2. **Add Form** düğmesine tıklayın.
3. Formunuz için bir **ad** girin.
4. **Associate With** açılır listesinden form türünü seçin:
   - **People** — Gönderileri veritabanınızdaki [kişi kayıtlarıyla](../people/adding-people.md) ilişkilendirir. Kişi formları, bir kişinin kaydından doldurulduğu için paylaşılabilir bağlantısı yoktur.
   - **Stand Alone** — Kendi herkese açık URL'sine sahip bağımsız bir form oluşturur ve dış kayıtlar için idealdir. Yalnızca Stand Alone formlar [başlık fotoğrafı](#adding-a-header-photo), [QR kodu](#sharing-a-form-with-a-qr-code), [bağlı grup](#linking-a-form-to-a-group) ve **Create a person record from submissions** seçeneğini sunar.
5. Formu oluşturmak için **Save** düğmesine tıklayın.

Yeni formunuz listede görünür. Soru eklemeye başlamak için formun üzerine tıklayın.

## Boş Formu Yazdırma {#printing-a-blank-form}

Dağıtmak için kağıt bir kopyaya mı ihtiyacınız var? Karşılama masasındaki bir ziyaretçi kartı için ya da internet erişimi olmayan birinin elle dolduracağı bir form için mi? Form listesinde bir formun yanındaki **Print** düğmesine tıklayarak önizlemeyi açın, ardından **Print** düğmesine tıklayın. Boş alanlar, her soru için bir alt çizgi veya onay kutusuyla yazdırılır; böylece kişiler formu elle doldurabilir. Zorunlu sorular yıldız işaretiyle belirtilir. Sayfanın üst kısmında, kilisenizin logosu (yüklediyseniz [Website > Appearance](../website/appearance.md) bölümündeki **Light Background Logo**) ve altında kilisenizin adı, ardından form adı yer alır. Başka yazdırma seçeneği yoktur; formun tamamını yazdırabilir veya hiçbir şey yazdırmayabilirsiniz.

## Formu QR Kodu ile Paylaşma {#sharing-a-form-with-a-qr-code}

Stand Alone formların yanında, form listesinde bir **QR Code** bağlantısı bulunur (arşivlenmiş formlarda bulunmaz). Bağlantıya tıklayarak formun herkese açık URL'si için bir QR kodu açın; bağlantı kodun altında gösterilir. Kodu bültenlere basabileceğiniz veya slaytlarda gösterebileceğiniz bir resim olarak kaydetmek için **Download PNG** düğmesine tıklayın. Kodu tarayan herkes formu telefonunda açar.

## Soru Ekleme {#adding-questions}

1. Formunuzu açın ve **Questions** sekmesine gidin.
2. **Add Question** düğmesine tıklayın.
3. Provider açılır listesinden bir **alan türü** seçin. Kullanılabilir türler şunları içerir:
   - **Textbox** — Kısa metin yanıtları için
   - **Date** — Tarih seçimleri için
   - **Email** — E-posta adresleri için
   - **Phone Number** — Telefon girişi için
   - **Multiple Choice** — Önceden tanımlanmış seçeneklerden seçim yapmak için
   - **Payment** — Ödeme toplamak için
4. Soru için bir **Title** ve isteğe bağlı bir **Description** girin. Açıklama, kişiler formu doldururken soruın altında görünür; bu nedenle "Bilmemiz gereken alerjiler varsa belirtin." gibi ipuçları için kullanın.
5. Alan zorunluysa **Require an answer** kutusunu işaretleyin.
6. **Save** düğmesine tıklayın.
7. Daha fazla soru eklemek için tekrarlayın.

:::warning
**Payment** alan türü için Stripe'ın yapılandırılmış olması gerekir. Henüz çevrimiçi bağışı ayarlamadıysanız, ödeme alanları eklemeden önce [Çevrimiçi Bağış Kurulumu](../donations/online-giving-setup.md) bölümüne bakın. Oturum açmadan formda ödeme yapan kişilerin, kartın kabul edilmesi için **Ben robot değilim** onay kutusunu işaretlemesi gerekir.
:::

## Form Üyelerini Yönetme {#managing-form-members}

1. Formunuzu açın ve **Form Members** sekmesine gidin.
2. Bir kişiyi arayın ve bir rolle ekleyin:
   - **Admin** — Formu düzenleyebilir ve tüm gönderileri görüntüleyebilir.
   - **View Only** — Gönderileri görüntüleyebilir ancak formu düzenleyemez.

## Bir Formu Bir Grupla Bağlama {#linking-a-form-to-a-group}

Herhangi bir Stand Alone formu bir grupla bağlayabilirsiniz. Örneğin, küçük bir grup için dua talebi formu veya gençlik gezisi için tıbbi izin formu gibi:

1. Formunuzun **Details** bölümünü açın.
2. **Linked group** altında grubu seçin veya **None** olarak bırakın.
3. **Save** düğmesine tıklayın.

Bir form bağlandıktan sonra:

- **Grup üyeleri**, form açıkken B1.church'teki grup sayfasında **Forms** bölümünde formu görür; formu açan bir **Fill out** düğmesi bulunur (bkz. [Grup Ayrıntıları](../../b1-church/groups/group-details.md#linked-forms)).
- **Grup liderleri** kapalı formları da görür ve her gönderinin yanıtlarını okuyabilir ve yazdırabilir (tek bir gönderi veya **Print all**). Liderler yalnızca yanıtları görüntüleyebilir; ayrıca [form üyesi](#managing-form-members) değilse formu düzenleyemezler.
- **B1 Admin'de** grubun sayfasında, bağlı her formu **Open** veya **Closed** olarak listeleyen bir **Linked forms** bölümü bulunur. Bu bölüm, grubun liderleri ve formları yönetebilen kişiler için görünür. Bkz. [Grup Üyeleri](../groups/group-members.md#linked-forms).

Bir form, kullanılabilirlik süresinin dışında olduğunda kapalıdır. Arşivlenmiş formlar grup sayfasında gösterilmez.

### Gönderenleri Otomatik Olarak Bir Gruba Ekleme {#automatically-adding-submitters-to-a-group}

Bir formu bir grupla bağlamak, tek başına kimseyi gruba eklemez. Gönderen herkesi bağlı grubun listesine eklemek için formun ayrıntılarında **Create a person record from submissions** seçeneğini de açın ve **Save** düğmesine tıklayın.

Biri formu her gönderdiğinde, eşleşen veya yeni oluşturulan kişi gruba eklenir (zaten grup üyesi olanlar atlanır). Bu, grubun listesini otomatik olarak oluşturması gereken bir kamp kayıt formu gibi durumlar için kullanışlıdır.

### Takip E-postası Gönderme

**Create a person record from submissions** seçeneği açıkken, formu gönderen her kişiye e-posta da gönderebilirsiniz. Formun ayrıntılarında **Follow-up Email Subject** ve **Follow-up Email Body** alanlarını doldurun. Her ikisinde de `{firstName}` ve `{churchName}` belirteçlerini kullanabilirsiniz. E-posta yalnızca her iki alan da doldurulduğunda gönderilir.

:::info
Takip e-postaları yalnızca kilisenizin grup e-postası göndermesi onaylandıktan sonra gönderilir ve kilisenizin günlük e-posta sınırına dahil edilir. Bkz. [Kiliseniz İçin Grup E-postasını Açma](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Bir Formu Çoğaltma

Bir formu yeni bir form için başlangıç noktası olarak kullanmak istiyorsanız, form listesinde formun yanındaki **Duplicate** düğmesine tıklayın ve onaylayın. B1, tüm soruları dahil olmak üzere formun birebir bir kopyasını oluşturur. Bu kopyayı daha sonra yeniden adlandırabilir ve bağımsız olarak düzenleyebilirsiniz.

:::tip
Çoğaltma, kayıt soruları yıldan yıla aynı kalan tekrarlayan etkinlikler için kullanışlıdır. Geçen yılki formu çoğaltın, adı ve tarihleri güncelleyin, ardından hazırsınız.
:::

## Form Özelliklerini Yapılandırma

Form adınızı ve ayarlarınızı istediğiniz zaman güncelleyebilirsiniz. Bağımsız formlar için, herkesle paylaşabileceğiniz benzersiz bir **public URL** ve ayrıca bir **Description** alanı görürsünüz. Açıklama, herkese açık form sayfasında soruların üstünde gösterilen metindir; kişilere formu doldurmaya başlamadan önce formun amacını anlatmak için kullanışlıdır.

### Başlık Fotoğrafı Ekleme {#adding-a-header-photo}

Bağımsız formlar, formun üst kısmında bir **Header Photo** gösterebilir. Formun ayrıntılarında fotoğraf kutusuna veya **Add Photo** düğmesine tıklayın, ardından bir resim seçin veya yükleyin (16:9 oranında kırpılır). **Save** düğmesine tıklayın. Fotoğraf, formun adının altında ve açıklamanın üstünde görünür. Bu fotoğraf, formun herkese açık URL sayfasında ve web sitesi **Form** öğesiyle gömüldüğü her yerde gösterilir. Fotoğrafı değiştirmek için **Change Photo**, kaldırmak için **Remove** düğmesini kullanın.

Kişiler formu gönderdikten sonra ne görmesi gerektiğini belirlemek için **Thank You Message** alanını kullanın. Bu mesaj, formun herkese açık URL sayfasında da gösterilir. Alanı boş bırakırsanız, "Formu gönderdiğiniz için teşekkür ederiz!" mesajını görürler.

:::tip
Bağımsız formlar etkinlik kayıtları için idealdir. Herkese açık URL'yi e-posta, sosyal medya ile paylaşabilir veya formu doğrudan kilise web sitenize gömebilirsiniz.
:::

:::info
Formu B1 web sitenize eklemek için web sitesi düzenleyicinize gidin, yeni bir bölüm ekleyin ve **Form** öğesini seçin. Ardından görüntülemek istediğiniz formu seçin. Web sitenizi düzenleme hakkında ayrıntılar için [Sayfaları Yönetme](../website/managing-pages.md) bölümüne bakın.
:::

---
title: "Hizmet Planları"
---

# Hizmet Planları

<div class="article-intro">

Hizmet planları kimin ne zaman görev yapacağını düzenler. Her plan belirli bir tarih ve hizmet alanına bağlıdır. Böylece gönüllü ekiplerinizi hafta hafta koordine edebilir ve her ibadetin eksiksiz ekiple karşılanmasını sağlayabilirsiniz.

</div>

## Eğitim Videosu

<YouTube id="47DstBXKl74" title="B1'de Plan Oluşturma ve Gönüllü Planlama" next="B1'de Ibadet Sırası ve Şarkı Kitaplığı Oluşturma" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Serving** alanında hizmet alanlarınızı ve ekiplerinizi ayarlayın
- Gönüllülerin [kişi dizinine](../people/adding-people.md) eklendiğinden ve ekiplere atandığından emin olun

</div>

## Planlara Erişim

1. B1 Admin'de, sol üstteki arama çubuğu olan [Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) açın, **Serving** bölümünü genişletin ve **Plans** seçeneğine tıklayın.
2. Sayfanın üstündeki bir **hizmet alanı sekmesini** seçin.
3. Bu türdeki planların listesini görmek için bir **plan türüne** tıklayın. Listenin üstündeki **Upcoming** ve **Past** seçenekleriyle gelecekteki ve önceki planlar arasında geçiş yapabilirsiniz. **Upcoming**, bugünden itibaren planları en yakından en uzağa doğru listeler; tarihi olmayan planlar en sonda yer alır. **Past** yalnızca önceki planları en yeniden en eskiye doğru listeler.
4. Belirli bir planı açmak için üzerine tıklayın.

Her plan sayfasında plan türüne ve **Plans** sayfasına geri dönen bağlantılar bulunur. Böylece tarayıcının geri düğmesini kullanmadan yukarı çıkabilirsiniz.

:::info
Planları yönetmek için tam yönetici erişimi gerekmez. Bir hizmet alanının üyesi olan herkes **Serving** bölümüne gidip kendi hizmet alanı için **Plans Edit** iznine ihtiyaç duymadan plan oluşturabilir, düzenleyebilir ve planlayabilir. **Plans Edit** rolüne sahip editörler ise tüm hizmet alanlarındaki planları yönetebilir.
:::

## Plan Oluşturma

1. Plan türü sayfasının üstünden **New Plan** düğmesine tıklayın.
2. Plana bir ad verin veya tarihi ad olarak kullanın. Ibadetin **tarihini** seçin.
3. Hizmet alanınızda [şablonlar](./plan-templates.md) varsa **Start from template** altından birini seçerek ibadet sırasını, görevleri ve notları tek adımda doldurabilirsiniz.
4. Aksi halde önceki bir plandan kopyalamak istiyorsanız **Copy from Previous Plan** seçeneğini kullanarak **Positions Only** veya **Positions and Assignments** seçeneklerinden birini belirleyin. Kopyalamak istemiyorsanız **Nothing** seçeneğini işaretleyin. Ayrıca **Copy Order of Service** kutusunu da işaretleyebilirsiniz. Önceki bir plandan kopyaladığınızda, yeni plan o planın **Notes**, **Signup Deadline**, **Show volunteer names on signup page** ve otomatik değiştirme ayarlarını da korur. Böylece her hafta bunları yeniden girmeniz gerekmez. Bunların hepsini yeni planın ayarlarından değiştirebilirsiniz.
5. Kopyalama sırasında birden fazla planı aynı anda oluşturmak için **Repeat every** ve **Frequency** (Day, Week veya Month) seçeneklerini belirleyin, ardından **Number of plans** alanına en fazla 12 değer girin. Month seçildiğinde **On** seçeneği ayın aynı gününü veya aynı haftanın gününü (örneğin ikinci cumartesi) korumanızı sağlar. B1 kaydetmeden önce tarihleri listeler ve her tarih için bir plan oluşturur; her plan bir öncekinden kopyalanır. Plan tarihe göre adlandırılmışsa her yeni plan kendi tarihinin adını alır.
6. İsteğe bağlı olarak **Signup Deadline (hours before service)** değerini ayarlayın. Yeni bir plan, önceki planın son kayıt süresiyle başlar; burada değiştirebilirsiniz. Süre sınırı istemiyorsanız boş bırakın. Sürenin nasıl hesaplandığı için [Plan Ayarları](#plan-settings) bölümüne bakın.
7. Planı kaydedin. Artık ekip üyelerini atamaya ve [ibadet sırasını](./service-order.md) oluşturmaya başlayabilirsiniz.

:::tip
Tekrar ayarları yalnızca önceki plandan bir şey (görevler, atamalar veya ibadet sırası) kopyalarken kullanılabilir.
:::

## Plan Detay Sayfası

Bir planı açtığınızda, planın adı, hizmet alanı, plan türü ve ibadet tarihi üstte **Edit** ve **Print** düğmeleriyle birlikte görünür. Bunların altındaki her şey tek bir sayfada yer alır:

- **[Ibadet Sırası](./service-order.md)** -- Ibadet sırasını; ibadet şarkıları, dualar, duyurular ve vaaz gibi öğelerle oluşturun.
- **Serving Team Assignments** -- Bu plana hangi ekip üyelerinin atanacağını yönetin. Mevcut ekiplerinizden kişi ekleyebilir ve kimin onayladığını ya da hâlâ beklediğini görebilirsiniz. Görevlerin üstündeki bağlantılar planın **Notes** ve **Times** bölümlerini açmanızı sağlar.

## Ekip Üyelerini Atama

1. Bir plan açın ve **Serving Team Assignments** bölümüne gidin.
2. **Add Position** düğmesine tıklayın. Açılan görev ekleme formunu doldurun. Kategori adı için istediğiniz bir ad yazabilirsiniz. Görevi kilisenizdeki herkesin (yalnızca tek bir ekibin üyelerinin değil) doldurabilmesini istiyorsanız **Volunteer Group** alanını **None** olarak bırakın.
3. Bu göreve gönüllü atamak için **People Needed** seçeneğine tıklayın. Görevin bir **Volunteer Group** değeri varsa o grubun üyeleri arasından seçim yaparsınız. Volunteer Group değeri **None** ise kilisenizdeki herkesi arayabilirsiniz.
4. **Add** düğmesine tıklayarak ekip listenizden üyeleri ekleyin.
5. Atanan üyeler, atama durumlarıyla birlikte kendi ekiplerinin altında görünür.
6. Gönüllüleri B1 uygulaması içinde veya e-posta yoluyla bilgilendirmek için "notify volunteers" seçeneğine tıklayın. Plan bir [onay iş akışı](#plan-settings) kullanıyorsa bildirim, gönüllü yanıt verene kadar her isteği takip eden bir iş akışı kartı da başlatır.

Her görev, kaç yerin dolu olduğunu bir bakışta görebilmeniz için bir sayı etiketi gösterir (örneğin "2/3"). **Serving Team Assignments** başlığının altında "X of Y positions filled" özeti, planın genel kadro durumunu ve hâlâ kaç kişiye ihtiyaç olduğunu gösterir. Tüm görevler dolduğunda bu özet **Fully staffed** olarak değişir.

:::tip
Plan oluşturmadan önce ekiplerinizi hizmet ayarlarında kurun. Böylece atama yapabileceğiniz hazır bir gönüllü havuzunuz olur.
:::

### Boş Bir Plana Görev Kopyalama

Bir planda henüz görev yoksa ve aynı türde daha önceki bir plan varsa **Serving Team Assignments** bölümünde **Copy from Previous Plan** bağlantısı görünür. **Positions Only** veya **Positions and Assignments** seçeneğini seçerek açık olan planı önceki planın görevleri (ve gönüllüleri) ile doldurabilirsiniz. Kopyalama mevcut plana yapılır; aynı tarih için ikinci bir plan oluşturmaz.

## Plan Ayarları

Her planın, plan türünün listesindeki plan yanındaki **Edit** bağlantısına veya plan sayfasının üstündeki **Edit** düğmesine tıklayarak yapılandırabileceğiniz ek ayarları vardır. Plana dönmek için **Done** (veya planın adı) seçeneğine tıklayın. Bu ayarlar şunları içerir:

- **Signup Deadline (hours before service)** — gönüllü kayıtlarının kapanacağı, ibadetten kaç saat önce olduğu. Süre, planın ilk **Service** saatinden geriye doğru sayılır (provalar ve diğer saatler, planda başka saat yoksa dikkate alınmaz). Bu yüzden sabah 10:00'daki bir ibadet için 2 saatlik süre, o sabah 08:00'de kayıtları kapatır. Planın saati yoksa süre, kilisenizin saat diliminde ibadet tarihindeki sabah 09:00'dan sayılır. Süre dolduğunda gönüllüler ne kayıt olabilir ne de kendilerini çıkarabilir. İbadet başladıktan sonra da kayıtların açık kalması için negatif bir sayı girin. Süre sınırı istemiyorsanız alanı boş bırakın veya temizleyin.
- **Confirmation workflow** — Bu planın hizmet isteklerini, her gönüllü kabul edene veya reddedene kadar e-posta ve metin mesajıyla takip etmek için bir [Hizmet Ataması Onayı iş akışı](./workflows.md#serving-assignment-confirmations) seçin. Yayınlanmış plandaki gönüllüleri **Notify** ile bilgilendirdiğinizde, her yeni istek o iş akışının panosunda kendi kartını alır ve bildirim bağlantısının üstünde *"New requests use the confirmation workflow."* notu görünür. Olağan bildirimleri kullanmak için **Use existing assignment notifications** seçili bırakın. Listede yalnızca etkin onay iş akışları görünür; önce **Serving > Workflows** altında bir tane oluşturun.
- **Show volunteer names on signup page** — işaretlendiğinde, oturum açmış gönüllüler B1.church kayıt sayfasında her görev için kimlerin kayıtlı olduğunu görebilir. İsimler oturum açmamış ziyaretçilere asla gösterilmez.
- **Penciled in** — Programı yayınlamaya hazır olana kadar atamaları gönüllülerden gizler.
- **Automatically schedule a replacement when a volunteer declines** — İşaretlendiğinde, atanan bir gönüllü görevi reddederse B1, ekip listesindeki bir sonraki uygun kişiyle otomatik olarak iletişime geçer ve bu kişiye hizmet edip edemeyeceğini sorar. Biri kabul edene kadar liste boyunca devam eder. Böylece manuel takip gerekmeden görevler dolu kalır.

:::tip
Üye kayıt sayfasında her planın açık görevleri kategoriye ve ardından ada göre listelenir. Üyeler, [Settings > Volunteer Signup](../settings/church-settings.md#volunteer-signup) bölümünde **Show only the next week of each plan type** seçeneğini açmadığınız sürece açık görevi olan her yaklaşan haftayı görür.
:::

## Gönüllü Hatırlatmaları {#volunteer-reminders}

B1, gönüllülere planlandıkları ibadetlerden önce otomatik hatırlatma gönderebilir. Böylece her hafta ekibinizin peşinden koşmanız gerekmez. Hatırlatmalar **planlanmış herkese** gider; hem onaylayanlara hem de henüz yanıt vermeyenlere. Tek istisna bir [onay iş akışı](./workflows.md#serving-assignment-confirmations) üzerinden gönderilen isteklerdir. Bu gönüllü, ancak kabul ettikten sonra hatırlatma alır, çünkü süreci iş akışı kabul edilene kadar takip eder. Her hatırlatma e-postası gönüllünün görevlerini, hizmet tarihini, plan notlarını ve sizin özel mesajınızı içerir.

Hatırlatma zamanlaması ve içeriği **plan türü** bazında ayarlanır. Böylece her hizmet türü kendi programını koruyabilir.

1. **Serving** alanından plan türünü içeren hizmet alanını seçin.
2. **Plan Types** listesinde, plan türünün yanındaki **Edit** bağlantısına tıklayın.
3. **Reminders** bölümünü genişletin ve **Send reminders for plans of this type** seçeneğini açın.
4. **When should reminders go out?** altından en fazla üç zamanlama seçin: **7 days before**, **3 days before**, **2 days before**, **1 day before** veya **Day of**.
5. Hatırlatmaların gönderileceği **Time of Day** saatini ayarlayın.
6. İsteğe bağlı olarak bir **Message** ekleyin. Boş bırakırsanız varsayılan hatırlatma metni kullanılır.
7. **Send By** altından **Push**, **Email** ve kilisenizin bir [metin mesajı sağlayıcısı](../settings/church-settings.md#texting) bağlıysa **Text** seçeneklerini seçin.
8. **Save Reminders** düğmesine tıklayın.

Bir plan türü için hatırlatmalar, siz açana kadar kapalıdır.

:::tip
Henüz onaylamamış gönüllüler, hatırlatma e-postasının içinde **Accept** ve **Decline** düğmelerini görür. Böylece oturum açmadan yanıt verebilirler.
:::

### Metin Mesajı Hatırlatmaları

**Text** seçeneği yalnızca kilisenizde bağlı bir metin mesajı sağlayıcısı varsa görünür. Metinler kilisenizin metin mesajı sağlayıcısı üzerinden gönderilir ve her metin kilisenize maliyet getirebilir. Bir gönüllü, yalnızca [Bildirim Tercihleri](../../b1-church/getting-started/notification-preferences.md) bölümünde **Text messages** seçeneğini açmışsa ve profilinde cep telefonu numarası varsa metin mesajı hatırlatması alır. Her metin kilisenizin adıyla başlar, tek bir metin mesajı olarak tutulur ve "Reply STOP to opt out." ifadesiyle biter. STOP yanıtı veren herkes kilisenizden metin mesajı almayı durdurur. STOP yanıtlarının B1'e ulaşması için [metin mesajı ayarlarınızdaki](../settings/church-settings.md#texting) **Inbound (STOP) webhook URL** adresini sağlayıcınızın gelen mesaj webhook'una yapıştırın.

Belirli bir tarih aralığındaki planlanmış herkese hemen metin mesajı göndermek için [Plan Genel Bakışı](./plans-overview.md#texting-everyone-scheduled) sayfasındaki **Text Volunteers** seçeneğini kullanın.

:::info
Her hatırlatma yalnızca bir kez gönderilir. Metin mesajı hatırlatmaları, anlık bildirim ve e-postaya ek olarak gönderilir; bunların yerine değil.
:::

## Bir Plan Türüne Grup Atama

Plan türü sayfasında plan listesinin altındaki **Associated Groups** bölümü, bu plan türünün planlarını hangi grupların üye portalından görebileceğini belirlemenizi sağlar. Bu, yaklaşan ibadetleri yönetici erişimi vermeden doğru ekiplere göstermenin hızlı bir yoludur.

1. Plan türü sayfasının üstünde **Associated Groups** seçeneğine tıklayın (veya o bölüme kaydırın).
2. **Add Group** düğmesine tıklayın ve açılır listeden bir grup seçin.
3. **Shows** sütununda, o grubun üyelerinin bu plan türü için **Past plans only**, **Upcoming plans only** veya **Past and upcoming plans** seçeneklerinden hangisini görmesi gerektiğini belirleyin.
4. Başka gruplar eklemek için tekrarlayın, ya da bir grubu kaldırmak için çöp kutusu simgesine tıklayın.

:::info
Yalnızca **Standard** olarak etiketlenmiş gruplar seçici listesinde görünür. Ilişkili bir grubun üyeleri, bu plan türünün planlarını B1 üye portalındaki grubun sayfasında otomatik olarak görür. Bu görünüm, seçtiğiniz zaman aralığıyla sınırlıdır.
:::

Planlar Lessons.church dersleri ise, ilişkili grubun üyeleri grup sayfasında **This week's lesson** kartını da görür (alt başlık, ayet ve ebeveynler için bir soru). Burada bir ebeveyn grubunu ilişkilendirin ve filtreyi **Past plans only** olarak ayarlayın; böylece bugünkü ders de dahil edilir. Gönüllü ekipler genellikle **Upcoming plans only** veya **Past and upcoming plans** seçeneğini kullanır.

## Planları Yazdırma

Planı ekip üyelerine dağıtmak için yazdırabilirsiniz. Planı açın ve sayfanın üstündeki **Print** düğmesine tıklayarak görevleri ve ibadet sırasını içeren yazdırılabilir bir sürüm oluşturun. Yazdırılan çıktının üstünde, kilisenizin logosu ([Website > Appearance](../website/appearance.md) bölümündeki **Light Background Logo**, eğer yüklediyseniz) ve altında kilisenizin adı ile planın adı görünür. Böylece dağınık sayfaları kolayca tanıyabilirsiniz. Bu, provalarda dağıtmak veya ortak bir alana asmak için kullanışlıdır.

Yazdırılan çıktıda boş kalacak öğeler yer almaz. Kimse atanmamışsa ekip kutusu olmaz ve ibadet sırası sayfanın tüm genişliğini kullanır. Hiçbir öğenin süresi yoksa **Length** sütunu çıkarılır; planın ibadet saati ve süresi de yoksa **Time** sütunu da çıkarılır. Hizmet tarihini içeren siyah **Service Order** başlık çubuğunu kaldırmak için yazdırma sayfasının üstündeki **Show Service Order heading** kutusunun işaretini kaldırın. B1 Admin, bu tercihinizi o tarayıcı için hatırlar.

:::info
Planlar hizmet alanına göre düzenlenir. Plan oluşturmadan veya görüntülemeden önce doğru hizmet alanı sekmesinde olduğunuzdan emin olun.
:::

## Sonraki Adımlar

- Birden fazla haftadaki tüm yaklaşan görevleri tek bir tabloda görmek, boş kalan görevleri fark etmek ve gönüllüleri doğrudan tablodan atamak için [Plan Genel Bakışı](./plans-overview.md) sayfasını kullanın
- Bir planın yapısını [Plan Şablonu](./plan-templates.md) olarak kaydedin, böylece gelecekteki planlara tek tıklamayla uygulayabilirsiniz
- [Ibadet Sırası](./service-order.md) bölümünü şarkılar, okumalar ve diğer öğelerle oluşturun
- Kütüphanenizdeki [şarkıları](./songs.md) doğrudan ibadet sırasına ekleyin
- Ekip üyelerine takip görevleri atamak için [Görevler](./tasks.md) özelliğini kullanın
- Güncel ders içeriğini [Dijital Tabela](./digital-signage.md) ile kilise lobisindeki bir televizyonda gösterin

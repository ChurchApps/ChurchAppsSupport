---
title: "Mobil Uygulama Ayarları"
description: "B1 Admin'de B1.church üye uygulaması için gezinme sekmelerini, Ana Ekran kutucuklarını, oturum açma istemini ve üye dizini gizlilik ayarlarını yapılandırın."
---

# Mobil Uygulama Ayarları

<div class="article-intro">

Mobil Uygulama Ayarları sayfasında, kilisenizin üyeleri için **B1.church mobil deneyiminde (PWA)** görünen gezinme sekmelerini yapılandırabilirsiniz. Hangi sekmelerin görünür olacağını, nereye bağlanacaklarını ve nasıl görüntüleneceklerini kontrol edersiniz.

</div>

## Eğitim Videosu

<YouTube id="ydY7WGK16fE" title="B1'de Kilisenizin Üye Uygulamasını Özelleştirme" />

:::info
Burada yapılandırılan sekmeler, üyelerin [Gelişmiş Web Uygulaması (PWA) olarak yükleyebileceği](../../b1-church/getting-started/installing-pwa.md) B1 Uygulamasında görünür. Kilisenizin yükleme sayfasını — `https://yourchurchname.b1.church/mobile/install` — üyelerle paylaşın. Bu sayfa, uygulamayı cihazlarına nasıl yükleyeceklerini adım adım gösterir; App Store veya Google Play'den indirme gerekmez.
:::

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- “Church Settings'i Düzenle” iznine ihtiyacınız vardır. Erişiminiz yoksa [Roller ve İzinler](./roles-permissions.md) sayfasına bakın.
- Önce kilise adınız ve markanız dahil olmak üzere [Kilise Ayarlarınızı](./church-settings.md) yapılandırın.

</div>

## Gezinme Ayarlarına Erişim

1. B1 Admin'de, [Hızlı Atlama menüsünü](../introduction.md#getting-around-with-the-jump-menu) (sol üstteki arama çubuğu) açın ve **Mobile** öğesini genişletin.
2. **Navigation** (`/mobile/navigation`) seçeneğine tıklayın.
3. Navigation sayfasında mevcut uygulama sekmeleriniz görüntülenir.

## Yeni Sekme Ekleme

1. Sayfanın üstündeki **Add Tab** düğmesine tıklayın.
2. Sekme bilgilerini doldurun:
   - **Name** -- Sekmede görünecek etiket (örneğin “Sermons” veya “Give”).
   - **Icon** -- Sekmeniz için bir simge seçmek üzere simge seçiciye tıklayın.
   - **Image** -- Sekmeye fotoğraf eklemek için **Select Image** (veya **Change Image**) düğmesine tıklayın. Fotoğraflı sekmeler, uygulamanın Ana Ekranında fotoğraflı kutucuklar olarak görünür -- bkz. [Ana Ekran Kutucukları](#home-screen-tiles).
   - **Tab Type** -- Bible, Live Stream, Donation, Website ve daha fazlası gibi seçeneklerden birini seçin.
   - **URL** -- Sekmenin bağlanacağı web adresini girin.
   - **Visibility** -- Bu sekmeyi kimlerin görebileceğini belirleyin (herkes, yalnızca üyeler vb.). **Member Directory** sekmesi için bu ayar yalnızca sekmenin kimler tarafından göreceğini kontrol eder; dizini kimlerin açabileceği, Member portal sayfasındaki **Show in Directory** ayarıyla belirlenir (bkz. [Üye Dizini ve Mesajlaşma Ayarları](#member-directory--messaging-settings)).
3. Sekmeyi uygulamanıza eklemek için **Save Tab** düğmesine tıklayın.

## Mevcut Bir Sekmeyi Düzenleme

1. **App Tabs** listesindeki herhangi bir sekmeye tıklayın.
2. Sekmenin adını, simgesini, URL'sini, türünü veya görünürlük ayarlarını güncelleyin.
3. Değişikliklerinizi uygulamak için **Save Tab** düğmesine tıklayın.

## Sekmeleri Yeniden Sıralama

Sekmelerin mobil uygulamada görünme sırasını değiştirebilirsiniz. Listede sekmeleri sürükleyip bırakarak yeniden düzenleyin. Bu sayfada gösterilen sıra, üyelerinizin uygulamada göreceği sırayla aynıdır.

:::info
Bazı sekmeler belirli koşullar sağlandığında otomatik olarak görünebilir -- örneğin, bir yayın etkin olduğunda Live Stream sekmesi görünebilir. Elle eklediğiniz sekmeler ise üyelerinizin her zaman neyi göreceği konusunda tam kontrol sağlar.
:::

:::tip
Sekme sayınızı yönetilebilir tutun. Çoğu kilise için üç ila beş sekme idealdir. Çok fazla sekme, üyeleriniz için gezinmeyi karmaşık hale getirebilir.
:::

## Üye Dizini ve Mesajlaşma Ayarları

Mobile bölümündeki **Member portal** öğesi, B1.church deneyimindeki üye dizinini ve özel mesajlaşmayı yöneten ayarları içerir:

- **Directory Approval Group** -- Üye dizini güncellemelerini ve [hesap silme taleplerini](../profile/account-deletion.md) yürürlüğe girmeden önce inceleyen grup.
- **Show in Directory** -- Üye dizinini kimlerin açabileceğini ve dizinde kimlerin listeleneceğini belirler: **Admins Only**, **Members and Above** (varsayılan), **Regular Attendees and Above** veya **Visitors and Above**. Üyelik durumu, seçtiğiniz seviyenin altında kalan kişiler dizini göremez ve dizinde listelenmez. **Admins Only** seçeneği, dizini People &gt; View iznine sahip personel dışındaki herkese kapatır (yalnızca Staff üyelik durumuna sahip olmak yeterli değildir). Bu izne sahip personel, bu ayar ne olursa olsun dizini her zaman açabilir ve herkesi görebilir. Misafirler hiçbir zaman dahil edilmez, çünkü çevrimiçi olarak kendini kaydeden herkes misafir olarak başlar.
- **Visibility Preference** -- Henüz kendi ayarını seçmemiş üyeler için kilise genelindeki varsayılanı belirler. **Address**, **Phone Number** ve **Email** alanlarının her biri kendi açılır listesine sahiptir ve görünürlük ayarlanabilen her yerde aynı beş seviye kullanılır:
  - **Everyone** -- Anonim ziyaretçiler dahil herkes tarafından görülebilir.
  - **Members** -- Yalnızca Member veya Staff kaydı olan kişiler tarafından görülebilir.
  - **Groups Only** -- Yalnızca bu kişiyle aynı grupta bulunan kişiler ve personel tarafından görülebilir.
  - **My Group Leaders and Staff** -- Yalnızca bu kişinin üyesi olduğu bir grubun liderleri ve personel tarafından görülebilir.
  - **Staff Only** -- Yalnızca personel (üyelik durumu Staff olanlar veya People &gt; View iznine sahip olanlar) ve kişinin kendisi tarafından görülebilir.

  Bu seviyelerdeki “personel”, üyelik durumu Staff olan veya People &gt; View iznine sahip herkesi ifade eder. Grup değişiklikleri hemen geçerli olur: bir gruba katılan veya grup lideri yapılan kişi, oturumu kapatıp yeniden açmadan, o grubun üyelerinin eşleşen **Groups Only** veya **My Group Leaders and Staff** bilgilerini görebilir.

  Üyeler, B1.church PWA'daki profillerinin **Privacy** sekmesinden kendi kayıtları için bu varsayılanları geçersiz kılabilir -- bkz. [Profilinizi Düzenleme](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Çocuk güvenliği için bir denetimdir. Doğum tarihine göre, iki kişiden biri bu yaşın altındaysa B1 **yeni** bir özel mesaj görüşmesi açmaz (doğum tarihi kayıtlıysa; kayıtlı değilse hane rolü yedek olarak kullanılır). Bu yaşın altındaki kişiler dizinde tam olarak görünür kalır -- yalnızca doğrudan mesajlaşma engellenir ve bu engel **her iki yönde**, personel dahil herkes için geçerlidir. Grup görüşmeleri ve bir çocuğun velisine mesaj gönderme çalışmaya devam eder. Seçenekler Off, 13, 16 veya 18'dir; varsayılan **18**'dir. Mevcut görüşmeler etkilenmez.

:::tip
Yaş denetimi doğum tarihlerine dayandığı için, cemaatinizdeki çocukların doğum tarihlerinin doldurulduğundan emin olun. Bu ayar, [check-in güvenlik denetimleriyle](../attendance/checkin-safety.md) aynı çocuk güvenliği ailesine aittir.
:::

### Ana Ekran Oturum Açma İstemi

Uygulamanın [Ana Ekranını](/docs/b1-church/getting-started/navigating#home) oturum açmadan açan ziyaretçiler, varsayılan olarak *“Grupların, bağışların ve daha fazlasını görmek için oturum açın.”* metnini içeren kısa bir istem ve yanında bir **Sign In** düğmesi görür. Aynı Member portal sayfasındaki (`/mobile/b1-mobile`) **Home screen sign-in prompt** ayarları, bu metni değiştirmenize olanak tanır:

- **Show sign-in prompt on the app home screen** -- Bunu kapatırsanız, hem istem hem de **Sign In** düğmesi Ana Ekranda gizlenir. Ziyaretçiler yine de uygulama menüsünden oturum açabilir.
- **Sign-in prompt text** -- Varsayılan metni kendi mesajınızla değiştirin (en fazla 150 karakter). Varsayılanı kullanmak için boş bırakın. İstem kapalıyken bu kutu devre dışıdır.

Uygulamaya uygulamak için **Save** düğmesine tıklayın. Bir **Saved** mesajı değişikliği onaylar. Kaydetmek, uygulamanın önbelleğe alınmış ayarlarını yeniler; böylece değişiklik Ana Ekran bir sonraki yüklendiğinde görünür.

### Ana Ekran Kutucukları

Fotoğrafı olan sekmeler (bkz. [Yeni Sekme Ekleme](#adding-a-new-tab) altındaki **Image**), uygulamanın [Ana Ekranında](/docs/b1-church/getting-started/navigating#home) kilisenizin adını taşıyan bir bölümde fotoğraflı kutucuklar olarak görünür. Bir Günün Ayeti sekmesine fotoğraf verirseniz, bu sekme de buraya dahil edilir. Fotoğraflı sekmeler ayrıca sekme çubuğunda da görünmeye devam eder.

Aynı Member portal sayfasındaki (`/mobile/b1-mobile`) **Home screen tiles** ayarı, bu kutucukların düzenini belirler. Bir **Layout** seçin:

- **Grid** -- Satır başına iki kutucuk (varsayılan). Kutucuk sayısı tekse, ilk kutucuk tüm genişliği kaplar.
- **Scrolling row** -- Üyelerin yana kaydırdığı tek bir kutucuk sırası.
- **Scrolling (automatic)** -- Aynı yana kaydırmalı sıra, ancak kendiliğinden de hareket eder: yaklaşık her dört saniyede bir kutucuk ilerler ve sonuncudan sonra yeniden ilk kutucuğa döner. Bir üye sıraya dokunduğunda, üzerine geldiğinde veya sekmesini sıraya getirdiğinde durur ve birkaç saniye sonra yeniden başlar. Hareketi azaltma ayarı açık olan cihazlarda sıra hareket etmez ve **Scrolling row** gibi çalışır.
- **List** -- Her sekmenin adının yanında küçük bir fotoğraf önizlemesi bulunan bir liste.

Her iki kaydırmalı düzende, kutucuklar ekrana sığandan fazlası varsa kutucukların altında her kutucuk için bir nokta sırası belirir ve geçerli kutucuğun noktası dolu gösterilir. Üyeler bu noktalardan birine dokunarak o kutucuğa geçebilir.

Uygulamak için **Save** düğmesine tıklayın.

### Ana Ekran Bölümleri

Oturum açmış üyeler, kendi yoklama geçmişlerini ve gönderdikleri formları her zaman [Me sayfasında](/docs/b1-church/getting-started/me-page) görür. Aynı Member portal sayfasındaki (`/mobile/b1-mobile`) **Home screen sections** anahtarları, bunları Ana Ekranda da gösterebilir:

- **Show My Attendance on Home** -- Üyenin son 90 günde kaç kez katıldığını, en son iki ziyaretini ve tüm yoklama listesine giden bir **History** bağlantısını gösteren **My Attendance** bölümünü ekler.
- **Show My Forms on Home** -- Üyenin en son iki form gönderimini ve bir **All forms** bağlantısını gösteren **My Forms** bölümünü ekler.

İkisi de varsayılan olarak kapalıdır. Bir bölüm yalnızca oturum açmış ve gösterilecek en az bir kaydı olan üyelere görünür. Uygulamak için **Save** düğmesine tıklayın.

## Bu Sekmelerin Nerede Göründüğü

Burada yapılandırdığınız sekmeler, üyelerinizin `https://yourchurchname.b1.church` adresindeki herhangi bir sayfadan yükleyeceği **B1.church PWA** uygulamasında görüntülenir. Bu sayfada yaptığınız değişiklikler, bir üye uygulamayı bir sonraki açtığında yansıtılır.

Telefonda alt sekme çubuğunda **Home**, en fazla üç sekmeniz ve **More** görünür; bilgisayarda üst başlıkta en fazla beş sekme görünür. Yerleşik ekranlar (Sermons, Giving veya Groups gibi) bu yuvaları önce alır ve boş kalan yuvaları **Internal Page** sekmeleri doldurur. **External URL** ve **Verse of the Day** sekmeleri hiçbir zaman bir yuva almaz. Sığmayanlar dahil her sekme, uygulamanın **More** sayfasında listelenir.

Bir **Folder** sekmesinin içine yerleştirilen sekmeler bir istisnadır: Bunlar yalnızca klasörün kendi ekranında görünür ve üyeler klasöre dokunarak bu ekranı açar. Bu ekran, sekmelerin tümünde fotoğraf varsa onları fotoğraflı kutucuklar olarak, aksi halde liste olarak gösterir. Bir üyenin görebileceği sekmesi olmayan klasör, o üyeden gizlenir. Bkz. [Klasör Sekmeleri](../../b1-church/getting-started/navigating.md#folder-tabs). Üyelerin neler göreceği için bkz. [B1App'te Gezinme](../../b1-church/getting-started/navigating.md).

## Sonraki Adımlar

- [Kilise Ayarları](./church-settings.md) -- Kilise bilgilerinizi ve markanızı yapılandırın
- [Roller ve İzinler](./roles-permissions.md) -- Ekibiniz için erişimi yönetin

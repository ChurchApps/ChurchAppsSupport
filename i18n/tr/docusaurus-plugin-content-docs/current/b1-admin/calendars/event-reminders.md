---
title: "Etkinlik Hatırlatmaları"
description: "B1 Admin'de push, e-posta ve SMS için etkinlik hatırlatmaları kurun; zamanlama, alıcılar ve özel mesaj seçerek insanların zamanında bilgilendirilmesini sağlayın."
---

# Etkinlik Hatırlatmaları

<div class="article-intro">

Etkinlik hatırlatmaları, bir etkinlik gerçekleşmeden önce doğru kişileri otomatik olarak bilgilendirir. Örneğin: "Kaçırmayın! Sağlık atölyesi yarın saat 09:00'da başlıyor." Hatırlatmayı etkinlik üzerinde bir kez yapılandırırsınız; B1, anlık bildirim, e-posta ve kilisenizde kısa mesaj (SMS) hizmeti kuruluysa metin mesajı yoluyla hatırlatmayı zamanında gönderir. Üyeler, hangi hatırlatmaları alacaklarını kendi [Bildirim Tercihleri](../../b1-church/getting-started/notification-preferences.md) sayfalarından kontrol edebilir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Hatırlatma göndermek istediğiniz etkinliği oluşturun (bkz. [Takvim Oluşturma](./creating-calendars.md))
- Kayıtlı katılımcılara ulaşmak için etkinlikte [kaydı etkinleştirin](./creating-calendars.md)
- Bütün bir gruba ulaşmak için etkinliğin üyeleri olan bir [gruba](../groups/creating-groups.md) ait olduğundan emin olun

</div>

## Hatırlatma Ayarlama

Hatırlatmaları etkinliğin **Hatırlatmalar** bölümünde yapılandırırsınız.

- **Yeni bir etkinlik oluştururken**, kaydetmeden önce etkinlik düzenleyicisindeki **Hatırlatmalar** bölümünü genişletin.
- **Mevcut bir etkinlik için**, hatırlatmayı eklemek veya değiştirmek üzere etkinliğin **Kayıt Ayrıntıları** sayfasını açın (**Kayıtlar** bölümünden).

1. **Hatırlatmaları etkinleştir** seçeneğini açın.
2. Gönderilecek **zamanı** seçin. En fazla üç zamanlama seçebilirsiniz: **7 gün önce**, **3 gün önce**, **1 gün önce** ve **Etkinlik günü**.
3. Hatırlatmanın gönderileceği **gün saatini** belirleyin (varsayılan **09:00**'dır ve kilisenizin [saat dilimine](../settings/church-settings.md#time-zone) göre uygulanır).
4. Kimlerin hatırlatılacağını **Kim** seçeneğiyle seçin (aşağıdaki [Kimler Hatırlatılır](#who-gets-reminded) bölümüne bakın).
5. İsteğe bağlı olarak bir **Mesaj** ekleyin. Varsayılan metni kullanmak için boş bırakabilir ya da kendi metninizi yazabilirsiniz. Metne `{{eventTitle}}` ifadesini ekleyebilirsiniz; bu ifade etkinliğin adıyla değiştirilir.
6. **Kanalları** seçin: **Anlık bildirim**, **E-posta** ve kilisenizin bir [SMS sağlayıcısı](../settings/church-settings.md#texting) bağlıysa **Metin mesajı**.
7. Etkinliği kaydedin.

Değişiklik yaptıkça bir **canlı önizleme** gösterilir. Bu önizleme yaklaşık kaç kişinin hatırlatılacağını, kaç katılımcıya ulaşılamayacağını ve bir sonraki gönderim zamanlarını gösterir. Böylece kaydetmeden önce hatırlatmanın doğru göründüğünden emin olabilirsiniz.

## Kimler Hatırlatılır

**Kim** ayarı, hatırlatmanın kimlere gönderileceğini belirler:

- **Yalnızca kayıtlı olanlar** -- Etkinliğe kaydolan ve bir kişi kaydına bağlı olan herkes. Etkinlikte kayıt etkinse varsayılan budur. Böylece küçük bir kayıtlı etkinliğin hatırlatması yanlışlıkla bütün gruba gitmez.
- **Yalnızca başkanlar / kayıtlı olanlar** -- Kayıttaki her aile üyesi yerine, kaydı yapan kişi için tek bir hatırlatma gönderilir.
- **Grup üyeleri** -- Etkinliğin grubundaki herkes. Etkinlikte kayıt kullanılmıyorsa varsayılan budur.
- **Otomatik** -- Kayıt etkinse kayıtlı olanları, değilse grubu kullanır.

:::info
Yalnızca ad olarak eklenen misafirler (bağlı bir kişi kaydı olmadan) hatırlatma alamaz. Çünkü onlara gönderilecek bir hesap, cihaz veya e-posta adresi yoktur. Önizleme, bu gruba giren katılımcı sayısını gösterir, böylece sürpriz olmaz. İletişimi kapatmış üyeler de atlanır.
:::

## Hatırlatmalar Ne Zaman Gönderilir

- Hatırlatmalar, seçtiğiniz **gün saatinde**, kilisenizin yerel saat diliminde ve seçtiğiniz her zaman aralığında gönderilir.
- Etkinliğin **tarihini veya saatini değiştirirseniz**, bekleyen hatırlatmalar otomatik olarak yeniden planlanır. Hatırlatmayı ayrıca düzenlemeniz gerekmez.
- **Etkinliği silerseniz** (veya yinelenen bir etkinliğin tek bir tekrarını iptal ederseniz), bekleyen hatırlatmalar otomatik olarak iptal edilir.
- Yinelenen etkinlikler otomatik olarak işlenir: yaklaşan her tekrar kendi hatırlatmasını alır.

:::tip
Hatırlatmalar önce **anlık bildirim** olarak gönderilir, e-posta ise yedek olarak kullanılır. Bir üyenin anlık bildirimleri açıksa anlık bildirim alır; açık değilse bunun yerine e-posta alır. Üyeler, hangi kanalları ve bildirim türlerini istediklerini [Bildirim Tercihleri](../../b1-church/getting-started/notification-preferences.md) sayfalarından seçebilir.
:::

## Metin Mesajı Hatırlatmaları

**Metin mesajı** kanalı yalnızca kilisenizin bir SMS sağlayıcısı bağlıysa görünür. Metinler kilisenizin SMS sağlayıcısı üzerinden gönderilir ve her metin kilisenize maliyet getirebilir. Metinler, anlık bildirim veya e-posta hatırlatmasına ek olarak yalnızca şu koşulları sağlayan kişilere gönderilir:

- [Bildirim Tercihleri](../../b1-church/getting-started/notification-preferences.md) sayfalarında **Metin mesajları** seçeneğini açmış olmak ve
- Profillerinde bir cep telefonu numarası bulunmak.

Her metin kilisenizin adıyla başlar, tek bir metin mesajı olarak tutulur ve "Çıkmak için STOP yazın." ifadesiyle biter. STOP yanıtı veren kişiler kilisenizden metin almayı bırakır. STOP yanıtlarının B1'e ulaşması için, [SMS ayarlarınızdan](../settings/church-settings.md#texting) **Gelen (STOP) webhook URL'sini** kopyalayıp sağlayıcınızın gelen mesaj webhook alanına yapıştırın.

## Üyelerin Kontrol Edebilecekleri

Hatırlatmalar her zaman üyelerin [Bildirim Tercihlerine](../../b1-church/getting-started/notification-preferences.md) uyar. Bir üye şunları yapabilir:

- Diğer bildirimleri açık tutarken **Etkinlik Hatırlatmalarını** anlık bildirim, e-posta veya metin için kapatmak.
- **Metin mesajları** seçeneğiyle metin hatırlatmalarını açıp kapatmak.
- **Sessiz saatler** belirleyerek acil olmayan bildirimlerin uygun bir saate kadar bekletilmesini sağlamak.

Bir üyenin etkinlik hatırlatmalarından çıkma tercihini geçersiz kılamazsınız. Bu, B1'in spam karşıtı kurallara uygun kalmasını ve üyelerin gelen kutularını kendi kontrollerinde tutmasını sağlar.

## Hizmet Hatırlatmaları

Bir plana atanmış gönüllüler, plan ayrıntılarını içeren ayrı bir **hizmet hatırlatması** alır. Henüz yanıt vermemişlerse e-postanın içinde doğrudan **Kabul Et / Reddet** düğmeleri de bulunur. Bu hatırlatmalar bir takvim etkinliğinde değil, plan türünde yapılandırılır ve metin mesajıyla da gönderilebilir. Gönüllü planlama ve hatırlatmaların nasıl çalıştığı için bkz. [Gönüllü Hatırlatmaları](../serving/plans.md#volunteer-reminders) ve [Pazar Gönüllüleri](../guides/sunday-volunteers.md).

## Sonraki Adımlar

- [Bildirim Tercihleri](../../b1-church/getting-started/notification-preferences.md) -- Üyelerin neleri kontrol edebileceği
- [Etkinlik Kaydı Kılavuzu](../guides/event-registration.md) -- Hatırlatmaların katılımcılara ulaşabilmesi için kaydı ayarlama
- [Takvim Oluşturma](./creating-calendars.md) -- Takvim kurulumuna dönün

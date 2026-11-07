---
title: "Hizmet Seçme"
---

# Hizmet Seçme

<div class="article-intro">

Her yoklamanın ilk adımı, katılacağınız hizmeti seçmektir. Hizmetler ekranı, uygulama yüklenmesini tamamladıktan hemen sonra görünür ve yoklama akışının geri kalanında hangi hizmet saatlerinin ve grupların kullanılabilir olacağını belirler.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- B1 Church Checkin uygulamasına [giriş yapın](../getting-started/logging-in) ve kilisenizi seçin
- Kilise yöneticinizin B1 Admin içinde [hizmetleri ve hizmet saatlerini yapılandırdığından](../../b1-admin/attendance/setup.md) emin olun

</div>

## Nasıl Çalışır

1. Giriş yaptıktan sonra (veya sonraki ziyaretlerde otomatik girişten sonra), uygulama **hizmetler ekranını** görüntüler.
2. Kilisenize tanımlanmış tüm hizmetlerin bir listesini görürsünüz. Her hizmet, hizmet adını (örneğin "Pazar Sabahı" veya "Çarşamba Akşamı") gösteren bir kart olarak görünür.
3. Katılacağınız hizmete dokunun.

Uygulama, o hizmetle ilişkili hizmet saatlerini ve grupları yükler, ardından sizi [üye arama ekranına](./looking-up-members) götürür.

## Yoklama Açık Değilken

Yöneticiniz bir hizmet saatine bir [yoklama takvimi](../../b1-admin/attendance/setup#setting-a-check-in-schedule) atadıysa, uygulama aileler için o hizmet saatini yalnızca yoklama penceresi açıkken seçmelerine izin verir. Yoklama penceresi şu anda kapalı olan hizmet saatleri yine de [hane ekranında](./household-review) görünür, ancak grup düğmesi sunmak yerine **Kapalı** olarak işaretlenir (örneğin **Kapalı · Paz 09:30'da açılır**).

Dokunduğunuz hizmetin tüm hizmet saatleri kapalıysa, uygulama yoklamanın ne zaman açılacağını bildirir -- örneğin **"Bu hizmet için yoklama Paz 09:30'da açılır."** (Bir açılış saati gösterilemiyorsa, **"Bu hizmet için yoklama şu anda açık değil."** yazar.) Hizmetler listesine dönmek ve farklı bir hizmet seçmek için **Geri** düğmesine dokunun veya pencere açılana kadar bekleyip tekrar deneyin.

:::info
Yoklama pencereleri, hizmetin kampüsünün saat dilimini izler. Bu kampüs için bir saat dilimi ayarlanmamışsa, bunun yerine kilisenizin saat dilimi kullanılır. Bir hizmet saati yanlış saatte açılıyor gibi görünüyorsa, yöneticinizden kampüs veya kilise ayarlarındaki saat dilimini kontrol etmesini isteyin. Hane ekranında kiosk, hizmet saatlerini açmak ve kapatmak için tabletin kendi saatini de kullanır; bu nedenle tabletin doğru saat ve saat dilimine ayarlandığından emin olun.
:::

:::info
Hizmetler, kilise yöneticiniz tarafından B1 Admin içinde Yoklama bölümünün altında yapılandırılır. Beklediğiniz hizmeti görmüyorsanız, yöneticinizden [yoklama kurulumunda](../../b1-admin/attendance/setup.md) oluşturulduğunu doğrulamasını isteyin.
:::

## Perde Arkasında Neler Olur

Bir hizmeti seçtiğinizde, uygulama sunucudan üç şey getirir:

- Bu hizmet için **hizmet saatleri** (örneğin tek bir hizmetin 09:00 ve 11:00 zaman dilimleri olabilir).
- Her hizmet saatinde kullanılabilir **gruplar** (örneğin Bebek Odası, Okul Öncesi, İlkokul).
- Hangi grupların hangi saatlerde kullanılabilir olduğunu belirleyen **grup-hizmet saati bağlantıları**.

Bu veriler yerel olarak önbelleğe alınır, böylece yoklamanın geri kalanı hızlı ve duyarlı olur.

:::tip
Kiliseniz yalnızca bir hizmet yapılandırdıysa, yine de devam etmek için ona dokunmanız gerekir. Uygulama tek bir hizmeti otomatik olarak seçmez.
:::

## Sonraki Adım

Bir hizmeti seçtikten sonra, telefon numarası veya adla [ailenizi arayacaksınız](./looking-up-members).

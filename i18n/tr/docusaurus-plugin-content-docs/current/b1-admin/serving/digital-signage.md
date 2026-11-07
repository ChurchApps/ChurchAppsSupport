---
title: "Dijital Tabela"
description: "B1 Admin'de her zaman güncel planı gösteren bir dijital tabela adresiyle ders içeriğini lobi veya koridor televizyonuna gönderin ya da FreePlay TV'leri kullanın."
---

# Dijital Tabela

<div class="article-intro">

Ders içeriğinizi bir dijital tabela beslemesi kullanarak bir lobi veya koridor televizyonuna gönderin. Her plan türü, o anki planın içeriğini her zaman oynatan bir besleme URL'si alır, bu yüzden her hafta bir şey güncellemeniz gerekmez. TV'leriniz FreePlay çalıştırıyorsa, bunun yerine plan türünü FreePlay Admin üzerinden bu TV'lerde zamanlayabilirsiniz.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- [Lessons.church](../../b1-church/content/lessons.md) veya başka bir ders içeriğiyle birlikte bir [plan türü](./plans.md) oluşturun ve içerik zamanlanmış olsun
- Bir [SignPresenter](https://www.signpresenter.com) hesabınız ve bunu görüntülemek için ayarlanmış bir cihazınız olsun ya da [FreePlay](../../freeplay/index.md) çalıştıran bir TV'niz olsun

</div>

## Besleme URL'sini Alma

1. **Serving** bölümüne gidin, plan türünüzün bulunduğu hizmet grubunu seçin ve plan türünü açmak için üzerine tıklayın.
2. Plan türü sayfasının üst kısmındaki **Digital Signage** (TV simgesi) düğmesine tıklayın.
3. **Digital Signage Feed** iletişim kutusunda, **Feed Url** yanındaki kopyalama düğmesine tıklayın.

:::info
Besleme URL'si tek bir plana değil, plan türüne bağlıdır. Bu plan türü için o anda geçerli olarak zamanlanmış planı otomatik olarak takip eder, bu yüzden yalnızca bir kez ayarlamanız yeterlidir.
:::

## SignPresenter'a Bağlanma

Besleme, üçüncü taraf bir dijital tabela uygulaması olan [SignPresenter](https://www.signpresenter.com) ile çalışacak şekilde tasarlanmıştır. Kopyaladığınız URL'yi SignPresenter'a harici bir besleme olarak yapıştırın, böylece bağlı ekranda güncel ders içeriğiniz görüntülenir.

SignPresenter içindeki adım adım kurulum için [SignPresenter'ın Lessons.church kılavuzuna](https://support.signpresenter.com/topics/lessons-dot-church.html) bakın. İletişim kutusu da bu talimatlara bağlantı verir.

## Bunun Yerine FreePlay TV'leri Kullanma

Ekranlarınız [FreePlay](../../freeplay/index.md) çalıştırıyorsa besleme URL'sine ihtiyacınız yoktur. **Digital Signage Feed** iletişim kutusu, **admin.freeplay.church/calendar** adresine bağlantı verir. Bu adreste plan türünü FreePlay TV'lerinizde zamanlayabilirsiniz:

1. İletişim kutusundaki **admin.freeplay.church/calendar** bağlantısına tıklayın. FreePlay Admin, B1 Admin ile aynı girişi kullanır.
2. TV'leriniz için ekran grubunu seçin ve **Add schedule** düğmesine tıklayın.
3. **Play** altında, **Service plans** listesinden plan türünüzü seçin. Yanında **(current plan)** ifadesi bulunur.
4. Günleri ve saatleri ayarlayın, ardından **Save** düğmesine tıklayın.

TV'ler, belirlediğiniz saatlerde, her hafta o plan türü için geçerli olan planı oynatır. Bu, özelleştirdiğiniz planlar dahil Go Curriculum derslerinde de çalışır. FreePlay, **Content Providers** altında hizmet grubuna bağlı Go Curriculum hesabıyla giriş yapar (bkz. [Ders Zamanlama](./scheduling-lessons.md)). Hizmet grubunda hesap yoksa kilisenin Go Curriculum bağlantısı kullanılır. Tüm seçenekler için [Takvim Zamanlama](../../freeplay/scheduled-mode/scheduling-the-calendar.md) sayfasına, bir TV eklemek için ise [Ekran Eşleştirme](../../freeplay/scheduled-mode/pairing-a-screen.md) sayfasına bakın.

:::note
Besleme URL'si Go Curriculum medyasını içermez, çünkü bu içerik kilisenizin Go Curriculum girişini gerektirir. Bir lobi veya sınıf TV'sinde Go Curriculum dersi göstermek için FreePlay kullanın.
:::

## Sonraki Adımlar

- Bu dijital tabelayı besleyen planları [Planlar](./plans.md) sayfasında yönetin
- [Lessons.church](./scheduling-lessons.md) ile içerik zamanlayın
- [Zamanlanmış Mod](../../freeplay/scheduled-mode/index.md) ile FreePlay TV'lerini bir takvime bağlayın

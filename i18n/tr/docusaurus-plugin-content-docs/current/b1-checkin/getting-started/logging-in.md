---
title: "B1 Church Checkin'e Giriş Yapma"
sidebar_label: "Giriş Yapma"
description: "B1 Church Checkin kiosk uygulamasına giriş yapın, kilisenizi seçin ve check-in tabletinde otomatik giriş, yönetici ayarları ve çıkış işlemlerini öğrenin."
---

# Giriş Yapma

<div class="article-intro">

Kiosk check-in için kullanılmadan önce, kilisenize erişimi olan bir ChurchApps hesabıyla oturum açmanız gerekir. Bu sayfada ilk giriş işlemi, kilise seçimi, otomatik giriş davranışı ve çıkış yapma yöntemi anlatılmaktadır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- B1 Church Checkin'i Android tabletinize yükleyin ([Başlarken](./index.md) bölümüne bakın)
- ChurchApps hesabınızın e-posta adresini ve parolasını hazır bulundurun
- Hesabın kilisenizde **Checkin** izni (veya **Edit Attendance**) olmalıdır. Bir yönetici bunu B1 Admin içinde **Ayarlar > Roller** bölümünden ekler. Ayrıntılar için [Check-In Kiosk Hesapları](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts) bölümüne bakın

</div>

## İlk Giriş

1. B1 Church Checkin uygulamasını açın. Açılış ekranından sonra, B1 Church Checkin logosunun bulunduğu giriş ekranını göreceksiniz.
2. İlk alana **e-posta adresinizi** girin.
3. İkinci alana **parolanızı** girin.
4. **Giriş Yap** düğmesine dokunun.

Uygulama kimlik bilgilerinizi doğrular ve sizi oturum açmış hale getirir. E-posta veya parola yanlışsa, ekranın altında bir hata mesajı görürsünüz.

Hesapta [iki adımlı oturum açma](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) etkinse, uygulama bir kod ister. Hesap sahibinin kimlik doğrulayıcı uygulamasındaki 6 haneli kodu veya yedek kodlardan birini girin ve yeniden **Giriş Yap** düğmesine dokunun. Bu kodu yalnızca ilk girişte kullanmanız gerekir; sonrasında kiosk oturumu açık tutar.

:::info
Bu, B1 Admin veya diğer ChurchApps ürünlerinde kullandığınız e-posta ve paroladır. Check-in kiosku için ayrı bir hesaba ihtiyacınız yoktur.
:::

## Kilise Seçimi

Başarılı girişten sonra uygulama, hesabınızın **Checkin** veya **Edit Attendance** iznine sahip olduğu kiliseleri yükler. Yalnızca başka izinlere sahip olduğunuz kiliseler listelenmez. Hiç kilise kalmazsa uygulama **Check-in erişimi yok** mesajını gösterir ve kilise yöneticinizden rollerinizden birine Checkin iznini eklemesini isteyin. Her kilise, kilise adı ve logosu (B1 Admin'de yapılandırıldıysa) ile birlikte bir kart olarak gösterilir.

- Hesabınız **yalnızca bir kiliseye** bağlıysa, yine de seçim ekranını görürsünüz. Devam etmek için kilisenize dokunun.
- Hesabınız **birden fazla kiliseye** bağlıysa, bu kioskun hizmet vermesini istediğiniz kiliseye dokunun.

Bir kilise seçtiğinizde uygulama o kilisenin markalama ve görünüm ayarlarını yükler. Kilise logonuz, sonraki tüm ekranların üst kısmında görünecektir.

## Tekrar Ziyaretlerde Otomatik Giriş

İlk başarılı girişten sonra uygulama, tablette güvenli bir oturum açma belirteci ve seçtiğiniz kiliseyi saklar. Parolanızı saklamaz. Sonraki açılışlarda:

- Uygulama, kayıtlı belirteçle sizi otomatik olarak yeniden oturum açar.
- Daha önce bir kilise seçtiyseniz, bu seçimi geri yükler ve doğrudan **hizmet ekranına** götürür.
- Kayıtlı oturum artık geçerli değilse, yeniden giriş yapabilmeniz için giriş ekranına döner.

:::tip
Kiosk otomatik giriş yaptığı için kimlik bilgilerinizi yalnızca ilk kurulumda girmeniz yeterlidir. Bundan sonra tablet açıldığında kullanıma hazır olur.
:::

## Yönetici Ayarları

Yönetici ayarları, kiosku kullanan kilise üyelerinin yapılandırmayı yanlışlıkla değiştirmemesi için bilerek gizlenmiştir. Bu ayarlara erişmek için:

1. Üst kısımdaki **kilise logosuna** iki saniye içinde ardarda **yedi kez** dokunun.
2. Kiosk PIN'i ayarlanmışsa, istendiğinde PIN'i girin.
3. Aşağıdaki seçeneklerin bulunduğu **Yönetici Ayarları** ekranı açılacaktır:
   - **Hizmet Değiştir**: seçili hizmet saatini değiştirin
   - **Yazıcı Değiştir**: yazıcı aramak ve seçmek için [yazıcı ayarlarını](./printer-setup.md) açın
   - **Yönetici PIN'i Ayarla** (veya bir PIN ayarlandıktan sonra **Yönetici PIN'ini Değiştir**): yönetici erişimini koruyan kiosk PIN'ini ayarlayın veya güncelleyin
   - **Acil durum yayını**: check-in yapılmış her hanenin vasilerine mesaj gönderin (bkz. [Acil Durum Yayını](../check-in/checking-out.md#emergency-broadcast))
   - **Görevli istasyon modu**: bu istasyona check-out, çağrı, yeniden yazdırma ve profil düzenleme özelliklerini ekleyen bir anahtar (bkz. [Check-Out](../check-in/checking-out.md))
   - **Çıkış Yap**: oturumu kapatın ve giriş ekranına dönün

   Check-in'e dönmek için **Kiosk'a Dön** düğmesine dokunun.

:::warning
Çıkış yapmak, kayıtlı tüm kimlik bilgilerini ve kilise seçimini temizler. Kiosku yeniden kullanmak için e-posta adresinizi ve parolanızı yeniden girmeniz gerekir. Yalnızca hesap değiştirmeniz veya kiosku yeniden yapılandırmanız gerektiğinde çıkış yapın.
:::

## Sonraki Adımlar

Giriş yaptıktan sonra [bir yazıcı kurabilir](./printer-setup.md) veya doğrudan [check-in iş akışına](../check-in/index.md) geçebilirsiniz.

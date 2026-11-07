---
title: "Giriş Yapma"
---

# Giriş Yapma

<div class="article-intro">

Kiosk check-in için kullanılmadan önce, kilisenize erişimi olan bir ChurchApps hesabıyla oturum açmanız gerekir. Bu sayfada ilk giriş işlemi, kilise seçimi, otomatik giriş davranışı ve oturumun nasıl kapatılacağı anlatılmaktadır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Android tabletinize B1 Church Checkin uygulamasını yükleyin (bkz. [Başlarken](./index.md))
- ChurchApps hesabınızın e-posta adresini ve şifresini hazır bulundurun
- Hesabın kilisenizde **Checkin** iznine (veya **Edit Attendance** iznine) sahip olması gerekir. Bir yönetici bu izni B1 Admin içinde **Settings > Roles** yolundan ekler — bkz. [Check-In Kiosk Hesapları](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## İlk Giriş

1. B1 Church Checkin uygulamasını açın. Açılış ekranından sonra B1 Church Checkin logosunun bulunduğu giriş ekranını göreceksiniz.
2. İlk alana **e-posta adresinizi** girin.
3. İkinci alana **şifrenizi** girin.
4. **Login** düğmesine dokunun.

Uygulama kimlik bilgilerinizi doğrular ve sizi oturum açmış hale getirir. E-posta veya şifre yanlışsa, ekranın alt kısmında bir hata mesajı görürsünüz.

Hesapta [iki adımlı oturum açma](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) açıksa, uygulama bir kod ister. Hesap sahibinin kimlik doğrulayıcı uygulamasından gelen 6 haneli kodu veya yedek kodlarından birini girin ve yeniden **Login** düğmesine dokunun. Bu kod yalnızca ilk girişte gereklidir; sonrasında kiosk oturum açmış kalır.

:::info
Bu, B1 Admin veya diğer ChurchApps ürünlerinde kullandığınız e-posta adresi ve şifrenin aynısıdır. Check-in kiosku için ayrı bir hesaba ihtiyacınız yoktur.
:::

## Kilisenizi Seçme

Başarılı girişten sonra uygulama, hesabınızın **Checkin** veya **Edit Attendance** iznine sahip olduğu kiliseleri yükler. Yalnızca başka izinlere sahip olduğunuz kiliseler listelenmez. Hiç kilise kalmazsa uygulama **No check-in access** mesajını gösterir ve kilise yöneticinizden rollerinizden birine Checkin iznini eklemesini ister. Her kilise, kilise adı ve (B1 Admin içinde yapılandırılmışsa) logosunu gösteren bir kart olarak görüntülenir.

- Hesabınız **yalnızca bir kiliseye** bağlıysa, yine de seçim ekranını görürsünüz. Devam etmek için kilisenize dokunun.
- Hesabınız **birden fazla kiliseye** bağlıysa, bu kioskun hizmet vermesini istediğiniz kiliseye dokunun.

Bir kilise seçtiğinizde uygulama o kilisenin markasını ve görünüm ayarlarını yükler. Kilise logonuz, sonraki tüm ekranların üst kısmında görünür.

## Sonraki Ziyaretlerde Otomatik Giriş

İlk başarılı girişten sonra uygulama, güvenli bir oturum açma belirteci ve seçtiğiniz kiliseyi tablette saklar. Şifrenizi saklamaz. Sonraki açılışlarda:

- Uygulama, kayıtlı belirteçle sizi otomatik olarak yeniden oturum açmış hale getirir.
- Daha önce bir kilise seçtiyseniz, bu seçimi geri yükler ve sizi doğrudan **services screen** ekranına götürür.
- Kayıtlı oturum artık geçerli değilse, uygulama yeniden giriş yapabilmeniz için giriş ekranına döner.

:::tip
Kiosk otomatik giriş yaptığı için kimlik bilgilerinizi yalnızca ilk kurulumda girmeniz yeterlidir. Bundan sonra tablet açıldığında kullanıma hazır olur.
:::

## Yönetici Ayarları

Yönetici ayarları, kiosku kullanan üyelerin yapılandırmayı yanlışlıkla değiştirmemesi için bilerek gizlenmiştir. Bunlara erişmek için:

1. Üstbilgideki **kilise logosuna** iki saniye içinde art arda **yedi kez** dokunun.
2. Kiosk PIN'i ayarlanmışsa, istendiğinde PIN'i girin.
3. **Admin Settings** ekranı aşağıdaki seçeneklerle açılır:
   - **Change Service** — seçili hizmet saatini değiştirin
   - **Change Printer** — yazıcı aramak ve seçmek için [yazıcı ayarlarını](./printer-setup) açın
   - **Set/Change PIN** — yönetici erişimini koruyan kiosk PIN'ini ayarlayın veya güncelleyin
   - **Logout** — oturumu kapatıp giriş ekranına dönün

:::warning
Oturumu kapatmak, kayıtlı tüm kimlik bilgilerini ve kilise seçimini siler. Kiosku yeniden kullanmak için e-posta adresinizi ve şifrenizi yeniden girmeniz gerekir. Yalnızca hesap değiştirmeniz veya kiosku yeniden yapılandırmanız gerektiğinde oturumu kapatın.
:::

## Sonraki Adımlar

Oturum açtıktan sonra [yazıcıyı ayarlayabilir](./printer-setup) veya doğrudan [check-in iş akışına](../check-in/) geçebilirsiniz.

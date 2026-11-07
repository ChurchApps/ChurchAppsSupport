---
title: "AppHelper"
description: "Packages çalışma alanındaki @churchapps/apphelper paylaşılan paketinin başvurusu: alt yol giriş noktaları, her dışa aktarımı hangi uygulamaların kullandığı ve yerel geliştirme ile yayımlama adımları."
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper` paketi, tüm ChurchApps web uygulamaları için ortak React bileşenleri ve yardımcı araçlar sağlar. Tek bir yayımlanmış pakettir ve giriş, bağış, formlar, markdown ve web sitesi/CMS işlevleri gibi özellik modüllerini alt yol giriş noktaları üzerinden sunar. Ayrıca temel bir dizi ortak bileşen ve yardımcı işlevi de içerir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **Node.js** ve **Git** kurun -- bkz. [Ön Koşullar](../setup/prerequisites.md)
- [Packages çalışma alanı](./index.md) kurulumunu ve sürüm yayımlama akışını inceleyin

</div>

## Giriş Noktaları

Paket, `package.json` dosyasında alt yol dışa aktarmalarını tanımlar; böylece her özellik modülü ayrı ayrı içe aktarılabilir:

| Giriş noktası | İçerik |
|-------------|----------|
| `@churchapps/apphelper` | Temel bileşenler, yardımcılar ve kancalar |
| `@churchapps/apphelper/login` | Giriş ve kayıt arayüzü |
| `@churchapps/apphelper/donations` | Bağış ve bağış bileşenleri |
| `@churchapps/apphelper/forms` | Form gönderim bileşenleri |
| `@churchapps/apphelper/markdown` | Markdown ve HTML düzenleyicileri ile görüntüleyicileri |
| `@churchapps/apphelper/website` | Web sitesi oluşturucu ve CMS bileşenleri |

## Neyi Kim Kullanır

Paylaşılan bir dışa aktarmayı değiştirmeden önce, hangi uygulamaların onu içe aktardığını kontrol edin:

| Dışa aktarma alanı | Sağladığı | Kullanan |
|---|---|---|
| Kök -- temel bileşenler ve kancalar | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState` ve yeniden dışa aktarılan `@churchapps/helpers` yardımcıları (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` vb.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Kök -- site üst bölümü | `SiteHeader` (gezinme, kullanıcı menüsü, bildirimler) | B1Admin, B1Transfer, LessonsApp |
| Kök -- yönetici içerik düzenleyicileri | `ImageEditor`, `HelpIcon` | B1Admin |
| Kök -- gerçek zamanlı altyapı | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Kök -- sohbet/varlık depoları | `ConversationStore`, `PresenceStore` | B1App |
| Kök -- notlar ve mesajlaşma arayüzü | `Notes` (kişiler/görevler üzerindeki personel notları); `AddNote`, `SubscriptionToggle` (üye mesajlaşması) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Kök -- Lessons'a özgü | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (ortak); `MarkdownPreview`, `HtmlEditor` (yönetici içerik düzenleme) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (ortak); `FundDonations` (yalnızca yönetici) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (formun `displayMode` değeri `conversational` olduğunda `ConversationalForm` bileşenini oluşturur) | B1Admin, B1App |
| `./website` | Düzenleyici ve oluşturucu tarafından paylaşılan sayfa oluşturma çekirdeği (`Element` ve `ElementRegistry` üzerinden çözümlenen tür başına oluşturucular, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); site geneli bileşenler (`AnnouncementBanner`, `Launcher` ve bunların `parse*Config` yardımcıları); yalnızca herkese açık oluşturucu tarafından kullanılan `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` | B1Admin (düzenleyici), B1App (düzenleyici bileşenleri ve oluşturucu) |

B1Transfer ve LessonsApp yalnızca kök ve `login` giriş noktalarını kullanır. `donations`, `forms` ve `website` alt yolları bugün yalnızca B1Admin ve B1App tarafından kullanılır.

## Yerel Geliştirme Kurulumu

Bu paket, diğer ortak kitaplıklarla birlikte [Packages](https://github.com/ChurchApps/Packages) çalışma alanında bulunur:

1. Çalışma alanını klonlayın:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Bağımlılıkları çalışma alanının kökünde kurun:

   ```bash
   cd Packages && yarn install
   ```

3. Vite oyun alanını paket dizininden başlatın:

   ```bash
   cd apphelper && yarn dev
   ```

   Oyun alanı geliştirme sunucusu `http://localhost:3001` adresinde başlar. Önce `playground/dotenv.sample` dosyasını `playground/.env` olarak kopyalayın ve gerekli değerleri doldurun.

Paketi kullanıma hazır hale getirmek için (`dist/` dizinine derler ve yerel ayar/CSS dosyalarını kopyalar), `yarn workspace @churchapps/apphelper build` komutunu çalıştırın -- ya da bağımlılık sırasına göre tüm paketleri derlemek için kökte `yarn build` komutunu kullanın. Tüketen bir uygulamanın içinde yayımlanmamış bir derlemeyi test etmek için geçici bir Yarn portal kullanın -- bkz. [Tüketen Bir Uygulamaya Karşı Yerel Geliştirme](./index.md#local-development-against-a-consuming-app).

:::tip
Oyun alanı, AppHelper bileşenlerini geliştirmenin ve test etmenin en hızlı yoludur. Vite geliştirme sunucusunu anlık olarak yeniden yükler, böylece değişiklikleri gerçek zamanlı görebilirsiniz.
:::

## Yayımlama

Sürümler changeset'ler üzerinden yürür: her değişiklikle çalışma alanının kökünde `yarn changeset` komutunu çalıştırın, ardından hazır olduğunuzda `yarn publish-all` komutuyla yayımlayın. Tam akış için bkz. [Ortak Kitaplıklara Genel Bakış](./index.md#releasing-with-changesets).

:::warning
Yerine geçen sürüm yayımlanıp her tüketici taşınana kadar bir dışa aktarmayı asla kaldırmayın ya da yeniden adlandırmayın -- bir kaldırmayı birleştirmeden önce tüm tüketen depolarda arama yapın.
:::

## İlgili Makaleler

- **[Helpers](./helpers.md)** -- AppHelper ile birlikte kullanılan temel yardımcı paket
- **[Web Uygulamaları](../web-apps/index.md)** -- Bu paketi kullanan web uygulamaları
- **[Ortak Kitaplıklara Genel Bakış](./index.md)** -- Çalışma alanı kurulumu, sürüm akışı ve yerel bağlantı iş akışı

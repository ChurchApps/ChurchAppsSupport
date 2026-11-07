---
title: "Bağış Mimarisi"
---

# Bağış Mimarisi

<div class="article-intro">

ChurchApps bağışları bir ağ geçidi (gateway) modeliyle yürütür: kilise kendi Stripe (veya PayPal, Kingdom Funding ya da Paystack) hesabını tutar ve B1, bir ödeme işlemcisi olarak asla para akışının içinde yer almaz. Kart verileri tarayıcıda tokenize edilir ve hiçbir zaman bir ChurchApps sunucusuna ulaşmaz. Bu sayfa tüm yığını ele alır: `@churchapps/apphelper` içindeki istemci tarafı sağlayıcı kaydı, GivingApi ağ geçidi soyutlaması, bağış veri modeli ve ağ geçidi webhook'larının veritabanına nasıl geri uzlaştırıldığı.

</div>

## Genel Bakış

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Yığın boyunca geçerli üç ilke:

1. **Kart ağ geçidinde tutulur.** Her sağlayıcının giriş bileşeni tarayıcıda tokenize eder; API yalnızca bir token, nonce veya sipariş kimliği alır.
2. **Tek soyutlama, birçok sağlayıcı.** Tarayıcı bir kayıttan `PaymentProvider` çözer; sunucu bir fabrikadan `IGatewayProvider` çözer. Her ikisi de ağ geçidi kaydında saklanan aynı normalleştirilmiş sağlayıcı adını kullanır.
3. **Mutabakat için webhook'lar doğru kaynaktır.** Bir ödeme yanıtı iyimser olarak kaydedilir, ancak tamamlanmış bağışı onaylayan (veya oluşturan) ağ geçidinin imzalı webhook'udur; her iki tarafta da idempotency korumaları vardır.

## İstemci tarafı: ödeme sağlayıcı kaydı (`@churchapps/apphelper`)

Kayıt `Packages/apphelper/src/donations/providers/` içinde yer alır; her sağlayıcının bileşenleri ve yardımcıları kendi alt klasöründedir (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). `providers/` dışında hiçbir şey bir sağlayıcı adına göre dallanmaz. Bir `PaymentProvider` (bkz. `providers/types.ts`) bir ana uygulamanın tek bir ağ geçidi için ihtiyaç duyduğu her şeyi bir araya getirir: bir `descriptor` (yönetici etiketleri, desteklenen para birimleri, ücret alanları, varsayılan ücret oranları, pano/kayıt URL'leri), bir `capabilities` bayrak kümesi (kayıtlı kartlar, ACH, tekrarlayan, satır içi yeni kart girişi, tokenize sırasında otomatik kaydetme), üye girişi için React bileşenleri (`MemberWrapper`/`MemberEntry`), misafir bağışları (`GuestForm`), kayıtlı yöntem düzenleme (`MethodEditForm`) ve form soruları ödemeleri (`FormPayment`). Ayrıca `buildChargeRequest(ctx, token)` vardır; her sağlayıcıya göre tahsilat isteği yapısının farklılaştığı tek yer burasıdır. Her sağlayıcının `MemberWrapper`'ı SDK'sını ağ geçidi kaydındaki genel anahtardan yükler; böylece ana uygulamalar hiçbir ağ geçidi SDK'sını içe aktarmaz (B1App ve B1Admin'in `@stripe/*` bağımlılığı yoktur). `pickDefaultGateway(gateways, capability?)`, bir kilisenin ağ geçitlerinden hangisinin bir yüzey tarafından kullanılacağını merkezi olarak belirler.

`providers/registry.ts` yerleşik sağlayıcıları tutar. Bunlar bir modül yan etkisiyle kaydedilmek yerine **değerle referans verilir**; böylece bir paketleyicinin ağaç sallama (tree-shaking) işlemi kaydı asla düşüremez:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Fonksiyon | Amaç |
|----------|---------|
| `getPaymentProvider(name)` | Normalleştirilmiş ada göre çözümle; yanlış yapılandırılmış bir sağlayıcının bağışçı formunu asla kilitlemesini önlemek için Stripe'a geri döner |
| `registerPaymentProvider(p)` | Çalışma zamanında ek bir sağlayıcı kaydet (bir ana uygulamanın özel ağ geçidi için) |
| `listPaymentProviders()` | Yerleşik ve özel sağlayıcıları listele; yönetici ağ geçidi açılır listesini oluşturmak için kullanılır |
| `hasPaymentProvider(name)` | Üyelik kontrolü |

**Yerleşik istemci sağlayıcıları: Stripe, PayPal, Kingdom Funding, Paystack.** B1App ve B1Admin kayda yalnızca *okuma* erişimi yapar (`getPaymentProvider`, `listPaymentProviders`). Hiçbiri `registerPaymentProvider` çağırmaz; kayıt apphelper içinde kalır.

Her sağlayıcı farklı tokenize eder, ancak hepsi kartı B1'in dışında tutar:

| Sağlayıcı | Giriş bileşeni | API'ye döndürülen token |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; misafir formu ayrıca bir `ExpressCheckoutElement` (Apple Pay / Google Pay, tek seferlik bağışlar) bağlar ve `onConfirm` aynı `pm_…` kimliğine çözülür | ödeme yöntemi kimliği (`pm_…`); banka için `/paymentmethods/ach-setup-intent`: ABD doları ağ geçitleri için Financial Connections `us_bank_account`, KAD ağ geçitleri için Kanada PAD `acss_debit` (barındırılan yetki modalı; yetki `default_for` faturalar/abonelikler, tek seferlik tahsilatlar yetki kimliğini geçirir) |
| Kingdom Funding | Ağ geçidi genel anahtarıyla anahtarlanmış barındırılan tokenizer formu | tek kullanımlık nonce |
| PayPal | PayPal Hosted Fields (kart, tekrarlayan) ile Venmo fonlamalı PayPal Smart Buttons (tek seferlik); ikisi de tek bir SDK yüklemesini paylaşır ve sunucu siparişi `/donate/client-token` + `/donate/create-order` üzerinden oluşturulur | yakalanmış sipariş kimliği |
| Paystack | Paystack Inline açılır penceresi (`js.paystack.co/v2/inline.js`); açılır pencerenin kendisi ödemeyi alır (kart, mobil para, banka havalesi, USSD) | ödenmiş işlem referansı; kayıtlı yöntemler Paystack `AUTH_…` yetki kodlarıdır |

Stripe'ın `finalizeResult`'ı, bağış tamamlanmış sayılmadan önce tarayıcıda 3-D Secure / SCA çalıştırır (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`). Paylaşılan form yalnızca `provider.finalizeResult(result)` çağırır ve bunun ne yaptığını bilmez.

## Sunucu tarafı: ağ geçidi soyutlaması (GivingApi)

`/giving` modülü (`Api/src/modules/giving`) REST yüzeyini sunar; ağ geçidi altyapısı `Api/src/shared/helpers` içindedir. `DonateController` hiçbir zaman doğrudan bir ağ geçidi SDK'sıyla konuşmaz. `GatewayService` üzerinden gider; bu servis `GatewayFactory`'den doğru `IGatewayProvider`'ı çözer ve ona şifresi çözülmüş bir `GatewayConfig` verir.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) her ağ geçidinin uyguladığı sözleşmedir: webhook yaşam döngüsü (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), ödeme (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), ücretler (`calculateFees`), kayıtlı yöntem işleme (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) ve isteğe bağlı ekstralar (müşteriler, siparişler, SetupIntent'ler, olay yeniden oynatma, başarısız bir abonelik faturası için `retryFailedPayment`, Apple Pay alan adı doğrulaması için `registerPaymentMethodDomain`). İsteğe bağlı bir kancayı atlayan sağlayıcı, o eylem için desteklenmiyor olarak bildirilir ve arayüz kontrolü gizler. Her sağlayıcı sınıfı kendi `capabilities` matrisini tanımlar (desteklenen para birimleri, ACH, geri ödemeler, abonelik gereksinimleri, işlem limitleri). `GatewayService.getProviderCapabilities(provider)` yalnızca bunu okur. `logsDonationsImmediately` gibi bayraklar ise denetleyici davranışını, denetleyicilerde herhangi bir sağlayıcı adına dayalı koşul olmadan yönlendirir.

**`GatewayFactory`'de kayıtlı sunucu sağlayıcıları:**

| Sağlayıcı | Kullanılabilirlik |
|----------|-------------|
| Stripe | Her zaman açık |
| PayPal | Her zaman açık |
| Kingdom Funding | Her zaman açık |
| Paystack | Her zaman açık (Nijerya, Gana, Güney Afrika, Kenya, Fildişi Sahili tüccarları; NGN/GHS/ZAR/KES/XOF/USD para birimleri) |
| Square | `ENABLE_SQUARE` ortam bayrağıyla isteğe bağlı katılım |
| ePayMints | `ENABLE_EPAYMINTS` ortam bayrağıyla isteğe bağlı katılım |

Paystack diğerlerinden şu yönden farklıdır: GivingApi devreye girmeden önce para hareket eder. Açılır pencere bağışçıdan tahsilat yapar; `processCharge` bir `GET /transaction/verify/:reference` çağrısıdır ve ödenen tutar ile para birimi, kaydedilecek bağışla eşleşmelidir (dosyada zaten bulunan bir referans asla iki kez kaydedilmez). Tekrarlayan bir programın ilk bağışı `finalizeSubscription`'dan kaydedilir (doğrula → `POST /plan` → `POST /subscription`, `start_date` bir aralık sonrası). Webhook'lar gizli anahtarın kendisiyle imzalanır (`x-paystack-signature`, ham gövde üzerinde HMAC-SHA512). Paystack'in webhook yönetim API'si olmadığı için yönetici ekranı, kilisenin kontrol paneline yapıştırması için URL'yi gösterir. Yenileme `charge.success` olayları fon bölünmesi taşımaz; sağlayıcı bunu bağışçının yerel `subscriptions`/`subscriptionFunds` satırlarından geri kazanır. Yalnızca kart yetkilendirmeleri `reusable` olarak işaretlenir. Mobil para bağışları yalnızca tek seferliktir, bu yüzden `createSubscription` bunları reddeder. Demo verileri, Paystack Playwright paketinin Grace'in Stripe paketinin yanında çalışması için ikinci bir kilise (Accra Community Church, `CHU00000002`) ekler; bu kilise bir Paystack test modu GHS ağ geçidi üzerindedir.

`ENABLE_CUSTOM_GATEWAY_PROVIDERS` ayarlandığında özel sağlayıcılar çalışma zamanında kaydedilebilir; bunların temel sınıfı `AbstractExperimentalGatewayProvider`'dır. Sağlayıcı adları büyük/küçük harf duyarsız eşleştirilir.

### Ağ geçidi yapılandırması ve gizli bilgiler

Bir yönetici ağ geçidi kimlik bilgilerini `POST /giving/gateways` (`GatewayController`) üzerinden kaydeder. Kaydetmede denetleyici, özel ve webhook anahtarlarını kalıcı hale getirmeden önce `EncryptionHelper` ile şifreler. Ardından yerel ana bilgisayar dışındaki herhangi bir ana bilgisayarda kilisenin mevcut webhook'unu siler ve `/giving/donate/webhook/{provider}?churchId=…` adresine yönlendirilmiş yeni bir tane oluşturur. Bir kilise sağlayıcı başına bir satır tutar: bir ağ geçidini kaydetmek yalnızca aynı sağlayıcı için mevcut satırı değiştirir. Genel okumalar (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) yalnızca genel anahtarları döndürür.

## Veri modeli

Giving şeması (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller `models/` içinde) Kysely üzerinden erişilen bir MySQL şemasıdır:

| Tablo | Rolü |
|-------|------|
| `gateways` | Kilise başına sağlayıcı yapılandırması: `provider`, `publicKey`, şifrelenmiş `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Bağış tahsisleri (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Giriş ve raporlama için gruplama (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Tek bir bağış: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; hesap özetleri, toplamlar, panolar ve bağış raporları yalnızca `complete` veya null olanları sayar), `transactionId` |
| `fundDonations` | Bir bağışın bir veya daha fazla fona tahsisi (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Tekrarlayan bağış; `id` ağ geçidinin abonelik kimliğidir, `personId`, `customerId`, `gatewayId` ile bağlıdır |
| `subscriptionFunds` | Tekrarlayan bir bağış için fon bölünmesi |
| `customers` | Bir `personId`'yi, sağlayıcı başına ağ geçidi müşteri kimliğiyle bağlar |
| `gatewayPaymentMethods` | Kaydedilmiş kartlar ve bankalar: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/olay denetim izi ve tekilleştirme anahtarı (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Bir fona bağlı taahhüt kampanyaları ve her kişinin taahhüt ettiği tutar |

Bir bağış, `fundDonations` aracılığıyla fonlara bölünür: bağış toplamı taşır, her `fundDonation` bir dilimi taşır. `donations.currency` ve `gateways.currency` ISO para birimini taşır. Her sağlayıcı `supportedCurrencies` değerini duyurur ve tutarlar `CurrencyHelper.formatCurrencyWithLocale` ile biçimlendirilir.

## Uçtan uca akışlar

### Üye tek seferlik ve tekrarlayan bağış (B1App)

Kimliği doğrulanmış bağış ekranı (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) üç apphelper bileşenini birleştirir: `MultiGatewayDonationForm`, `PaymentMethods` ve `RecurringDonations`. B1App çevresindeki veri yüklemesini yapar (`GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`) ve ağ geçidi listesini iletir. Çözümlenen sağlayıcı SDK'sını ağ geçidinin genel anahtarından kendisi yükler. Tahsilatın kendisi apphelper içinde gerçekleşir: çözümlenen sağlayıcı (yeni veya kayıtlı) yöntemi tokenize eder, ardından tek seferlik bağış için `/giving/donate/charge`'a, tekrarlayan bağış için `/giving/donate/subscribe`'a gönderir. Her iki uç nokta da oturum açmış bir bağışçıyı kendi `personId`'sine atfeder (yalnızca `donations.edit` sahipleri başkasına atfedebilir) ve toplamı tahsil edilen tutardan fazla olan fon bölünmelerini reddeder. Tekrarlayan bağışlar bir `subscriptions` satırı ile `subscriptionFunds` oluşturur ve programı ağ geçidine devreder (Stripe Subscriptions, PayPal Billing Plans veya bir KF tekrarlayan programı).

### Misafir ve anonim bağış

Herkese açık bağış sayfası (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) ve "şimdi bağış yap" paneli, `@churchapps/apphelper/website` içinden `NonAuthDonationWrapper`'ı işler. Bu bileşen, sağlayıcının `GuestForm`'unu reCAPTCHA ve ağ geçidinin Elements bağlamıyla sarar. Misafirlerde giriş, kayıtlı yöntem veya geçmiş yoktur. Akış `GET /giving/funds/churchId/:id` ve `GET /giving/donate/gateways/:churchId` (yalnızca genel anahtarlar) isteklerini yapar, ziyaretçiyi `POST /giving/donate/captcha-verify` ile doğrular, tarayıcıda tokenize eder ve `/giving/donate/charge` (veya `/subscribe`) adresine gönderir. Doğrulama çağrısı, form her misafir para çağrısıyla birlikte gönderen 10 dakikalık HMAC imzalı bir `captchaPass` döndürür (`Api/src/modules/giving/helpers/CaptchaPass.ts`). `CAPTCHA_ENFORCE=true` ile API, o kilise için geçerli bir geçiş olmadan misafir `create-order`, `charge`, `subscribe`, `addcard` ve `ach-setup-intent-anon` çağrılarını reddeder. Misafir ücretli etkinlik kayıtları (`POST /content/registrations/register`) tahsilatlarından hemen önce aynı geçişi kontrol eder; bkz. [Etkinlik Kayıtları](./registrations#payment-flow). Misafir ACH, anonim `POST /giving/paymentmethods/ach-setup-intent-anon` uç noktasını kullanır. Bu uç nokta yalnızca anlık (Financial Connections) doğrulamaya izin verir: mikro ödeme kontrolü misafir sayfası kapandıktan günler sonra tamamlanır, bu yüzden bağışı asla tamamlayamaz. Form, doğrulanmamış bir SetupIntent ile tahsilat yapmayı reddeder ve bağışçıyı kart veya oturum açmış bir banka kurulumuna yönlendirir.

Üç misafir-form seçeneği aynı tahsilat çağrısına biner. Bağış URL'sindeki `?fundId=` ve `?amount=`, fon bölünmesini önceden seçer (her sağlayıcının misafir formu bağlandığında okur ve normal fon değişikliği işleyicisinden geçirir, böylece toplamlar ve ücretler güncellenir). `anonymous: true`, `DonateController.charge`'ın istemcinin gönderdiği herhangi bir kişiyi atmasını ve bağışı `personId = null` ile kaydetmesini sağlar. Misafir formu `/people/loadOrCreate` ve müşteri/kasa adımını atlar; üç anında kayıt yapan sağlayıcı da ağ geçidi müşterisinden bir kişi çözmeyi durdurur. Apple Pay, sayfanın alan adının Stripe'a kayıtlı olmasını gerektirir. Bu yüzden Stripe misafir formu oturum başına bir kez, herkese açık ve hız sınırlı `POST /giving/donate/register-domain` uç noktasına gönderir. Bu uç nokta yalnızca kiliseye ait bir alan adını kabul eder (`<subDomain>.b1.church`, içerik modülünün alan adları tablosunda bir satır veya yerel bir ana bilgisayar) ve ardından Stripe'ın payment-method-domains API'sini çağırır.

### Yönetici kaydı ve Stripe içe aktarma (B1Admin)

B1Admin bağışlar bölümü (`B1Admin/src/donations/`) finans ekiplerinin çalıştığı yerdir. Toplu giriş (`components/BulkDonationEntry.tsx`), nakit, çek ve ayni bağışları önce `/giving/donations`, sonra `/giving/funddonations` göndererek kaydeder. Burada ağ geçidi yoktur. Kişi kaydının **Bağış kaydet** sayfası (`components/LogGiftDialog.tsx`) tek bir bağış için aynısını yapar: önce `batchDate`'i bağış tarihiyle eşleşen partiyi bulur veya o tarihe göre adlandırılmış bir tane oluşturur (`POST /giving/donationbatches`). Sonraki bir adım başarısız olursa bağışı ya da yeni partiyi tekrar siler. Fonlar, partiler, kampanyalar ve hesap özetleri her biri kendi `/giving/*` CRUD rotalarına eşlenir. Bağış hesap özeti sayfaları (`BatchGivingStatementsPage`, `PrintAllStatementsPage`), kilisenin tüm geçmişi yerine bir takvim yılını `GET /donations?startDate=&endDate=` ve `GET /fundDonations?startDate=&endDate=` ile ister; aksi halde Lambda'nın yanıt boyutu sınırını aşabilirdi. Üye tarzı bağış paneli (`B1Admin/src/donationComponents/`) B1App ile aynı apphelper bileşenlerini yeniden kullanır.

Raporlama ve muhasebe devirleri istemci tarafında veya rapor çalıştırıcısı işidir, ağ geçidi işi değildir. Parti sayfasının QuickBooks dışa aktarımı, partinin `donations` ve `fundDonations` kayıtlarından bir yevmiye kaydı CSV'si oluşturur (Undeposited Funds'a borç, fon başına bir alacak). Özet sayfasının Lapsed Givers görünümü `Api/reports/lapsedGivers.json` dosyasını genel rapor çalıştırıcısı üzerinden çalıştırır ve kişi adlarını `ReportOutput` çözümler. Ülke makbuz biçimleri (Kanada, Avustralya, Yeni Zelanda) üyelik anahtar/değer deposunda kilise ayarlarıdır; `GivingStatementDocument` tarafından işlenir ve B1App yazdırma sayfasında çoğaltılır. B1Admin'in hesap özeti yazdırma sayfaları (`PrintDonationPage`, `PrintAllStatementsPage`) kilisenin `logoLight` ayarını (`B1Admin/src/components/PrintChurchHeader.tsx` içindeki `usePrintLogo` aracılığıyla) iletir. Böylece logo her hesap özetinin üstüne basılır ve otomatik yazdırmadan önce görüntünün yüklenmesini bekler.

### Parti durumu ve Bağış Gir izni

Partiler kapatılabilir, böylece sayılmış bir mevduat olduğu gibi kalır. `POST /giving/donationbatches/:id/close` ve `/:id/reopen` (yalnızca Donations.Edit) `status`, `closedDate` ve `closedBy` değerlerinin tek yazıcılarıdır (`DonationBatchRepo.setStatus`). Normal bir parti kaydı bunlara asla dokunmaz, bu yüzden bir partiyi kaydetmek onu yeniden açamaz. Yazma erişimi `Api/src/modules/giving/helpers/BatchAccessHelper.ts` içinde merkezileştirilmiştir: Donations.Edit her şeyi değiştirebilir. Daha dar olan Donations.Enter izni (`GivingApi` / `Donations` / `Enter`, rol düzenleyicide "Enter Donations") yalnızca bağışın mevcut partisi ve hedef partisi açıkken parti oluşturabilir ve bağışları ile fon bölünmelerini kaydedebilir veya silebilir. Bu izin asla bir ağ geçidi bağışı için geçerli değildir (bir `transactionId`'si olan). Engellenen bir yazma `403 { error: "This batch is closed." }` döndürür. Partileri okuma, bir sayıcının girdiği partiyi seçebilmesi için Donations.ViewSummary veya Donations.Enter kabul eder. İstemci tarafında `B1Admin/src/donations/batchAccess.ts` bu kuralları yansıtır (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`). `Header` ve `SecondaryMenuHelper`, Görünüm Özeti olmadan bile partileri görebilen herkese **Bağışlar > Partiler** gösterir.

### Karışık para birimi toplamlarını dönüştürme

Olası karışık para birimli bağışlar genelinde tek birleşik bir toplam döndüren her uç nokta, toplamı farklı para birimlerini toplamak yerine sunucu tarafında kilisenin varsayılan para birimine dönüştürür. Bunlara bağış özeti KPI'ları (`GivingKpiCards`), bir bağış partisi toplamı, bir fon toplamı ve B1App bağış ekranının yıllık ve dönem toplamları dahildir. `Api/src/shared/helpers/ExchangeRateHelper.ts`, oranları kilise para birimine göre `api.frankfurter.dev` adresinden alır, bunları süreç içinde 12 saat önbelleğe alır ve `convertTotals(rows, churchCurrency, rates)` fonksiyonunu sunar. Satırlar SQL'de para birimine göre önceden gruplanır (birkaç grup, bağış başına dönüşüm asla yapılmaz). Her grup dönüştürülür ve toplanır. Sonuç, istemcinin "Güncel döviz kurlarıyla dönüştürüldü" notunu göstermek için kullandığı bir `isConverted` bayrağı taşır. `GET /donations/exchange-rates`, oran tablosunu ihtiyaç duyan istemcilere (B1App'in bağış ekranı) sunar. Oranlar bir istekten asla kabul edilmez, yalnızca sunucu tarafında alınır; bu yüzden bir istemci bildirilen bir toplamı etkileyemez. Tekil bağış kayıtları ve geçmiş ya da orijinal para birimi raporları asla dönüştürülmez. Yalnızca birleşik toplamlar dönüştürülür.

Stripe içe aktarma (`B1Admin/src/donations/StripeImportPage.tsx`), B1 dışında yapılan bağışları geriye dönük olarak ekler. Önizleme için `dryRun: true` ile `POST /giving/donate/replay-stripe-events` çağırır, ardından içe aktarmak için `dryRun: false` ile çağırır. Sunucu tarih aralığı için Stripe olaylarını listeler ve zaten kaydedilmiş olanları atlar. Eşleştirme önce `eventLogs` sağlayıcı kimliğiyle, sonra işlem kimliğiyle, son olarak `DonationRepo.findMatchingDonation` (tutar, tarih ve kişi) ile yapılır. Böylece yeniden çalıştırma asla çift içe aktarmaz. Abonelik `charge.succeeded` ve `payment_intent.succeeded` olayları atlanır, çünkü bu bağışları `invoice.paid` kaydeder. Yeni Stripe API sürümleri `PaymentIntent.invoice` alanını kaldırır, bu yüzden atlama "Subscription …" açıklamasına da bakar.

## Webhook'lar ve mutabakat

Ödenmiş ödemeler ve abonelik durumu değişiklikleri `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`) adresine gelir. İşleme kasıtlı olarak idempotenttir:

1. **Doğrula**: `GatewayService.verifyWebhook` işi sağlayıcının imza kontrolüne devreder. Başarısız bir imza 401 döndürür. İşlenmesi gerekmeyen olaylar 200 ile kısa devre yapar.
2. **Olayı tekilleştir**: `EventLogRepo.loadByProviderId`, `eventLogs` içinde zaten kaydedilmiş bir webhook'u atlar.
3. **Bağışı tekilleştir**: Bir şey oluşturmadan önce, payload'un taşıyabileceği her aday kimlik için `DonationRepo.loadByTransactionId` kontrol edilir. Bu adım yinelenen teslimatları, çok aşamalı ACH olaylarını (beklemede, sonra yerleşmiş) ve `/donate/charge`'ın bağışı zaten iyimser olarak kaydettiği durumu emer.
4. **Uygula**: Sağlayıcının `classifyWebhookEvent(eventType)` fonksiyonu olayın ne anlama geldiğini söyler (`donation` beklemede veya tamamlandı, `cancel-subscription` ya da `ignore`). Tamamlanmış ödemeler bir `complete` bağış oluşturur veya mevcut bir `pending` ya da `failed` bağışı yükseltir. ACH tarzı olaylar yerleşene kadar `pending` olarak kaydedilir. Başarısız bir abonelik faturası (Stripe `invoice.payment_failed`) fatura kimliğine anahtarlanmış bir `failed` bağış oluşturur. İptal olayları yerel `subscriptions` satırını siler. Denetleyici asla sağlayıcıya özgü olay adlarını incelemez.

### Başarısız tekrarlayan bağışlar ve ödeme hatırlatmaları

`failed` bağış, kurtarma için iş birimidir. `GET /giving/donations/failed` bunları, `eventLogs`'tan en yeni ağ geçidi hata mesajı ve ağ geçidinin yeteneklerinden gelen bir `canRetry` bayrağıyla listeler. `POST /giving/donate/retry/:donationId` sağlayıcının `retryFailedPayment` fonksiyonunu çağırır (Stripe açık faturayı öder). Ortaya çıkan webhook, satırı normal tekilleştirme yoluyla `complete` durumuna yükseltir. Ödeme hatırlatma (dunning) e-postaları, webhook işleyicisinden 0. günde, ardından gece yarısı zamanlayıcısındaki `DunningHelper.run` tarafından 3. ve 7. günlerde bağışçıya gider. Bu zamanlayıcı hem `lambda/timer-handler.ts` hem de `RailwayCron.ts` içinde bağlıdır. Her gönderim `eventLogs` içine `provider: "dunning"` ve `providerId: "<donationId>:<day>"` olarak kaydedilir, böylece yeniden çalıştırma asla iki kez e-posta göndermez. Stripe pes edip aboneliği iptal ettiğinde (`customer.subscription.deleted` ile `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` bağışçıya bir kez e-posta gönderir (`providerId: "<subscriptionId>:canceled"`). Bağışçı veya yönetici tarafından başlatılan iptaller sessiz kalır. Stripe mevcut bir uç noktaya asla olay eklemez. `StripeHelper.webhookEvents` değiştirildikten sonra ağ geçidini yeniden kaydedin ya da üretime karşı `tools/manual/stripe-webhook-events.ts` betiğini çalıştırın (varsayılan olarak kuru çalıştırma, yazmak için `--apply`).

`logsDonationsImmediately` özelliğine sahip sağlayıcılar (PayPal, Kingdom Funding, Paystack) tahsilatlarını `/charge` yanıtından kaydeder. Mutlu yol için webhook turu gerekmez. Stripe ise `payment_intent.succeeded` ve `invoice.paid` olaylarına ve ACH `payment_intent.processing` olayına güvenir. Ücret işleme (`POST /giving/donate/fee`, `payFees` ağ geçidi bayrağı ve her sağlayıcının `calculateFees` fonksiyonu), "ücretleri karşıla" brüt artırımını bağışçı tarafında hesaplar. B1 hiçbir platform payı almaz, bu yüzden hiçbir uygulama ücreti eklenmez.

:::info
Tahsilat ve webhook yolları aynı `donations` ve `fundDonations` satırlarını yazar. `transactionId`, iyimser bir tahsilat kaydının ve sonraki webhook'unun tek bir bağış için iki bağış üretmesini önleyen birleştirme anahtarıdır.
:::

## İlgili Sayfalar

- [Bağış Uç Noktaları](../api/endpoints/giving): bağışlar, fonlar, partiler, ağ geçitleri, abonelikler, ödeme yöntemleri ve webhook'lar için tam REST yüzeyi
- [AppHelper](../shared-libraries/app-helper): ödeme sağlayıcı kaydını ve bağış bileşenlerini barındıran npm paketi
- [Modül Yapısı](../api/module-structure): GivingApi modülünün sunucu tarafında nasıl düzenlendiği

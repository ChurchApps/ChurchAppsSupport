---
title: "API Dağıtımı"
---

# API Dağıtımı

<div class="article-intro">

ChurchApps API'leri, Serverless Framework kullanılarak AWS Lambda fonksiyonları olarak dağıtılır. Bu sayfa, demo ve üretim ortamları için derleme, dağıtım ve yapılandırma iş akışını kapsar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- API'yi yerel olarak kurun -- bkz. [Yerel API Kurulumu](../api/local-setup)
- Makinenizde AWS kimlik bilgilerini yapılandırın
- Hedef AWS hesabına erişiminizin olduğundan emin olun

</div>

## Derleme

API'ler, özel bir TypeScript yapılandırması kullanılarak üretim için derlenir:

```bash
npm run build:prod
```

Bu, Lambda çalışma zamanı için projeyi derlemek üzere `tsconfig.prod.json` dosyasını kullanır.

## Dağıtım

Demo ortamına dağıtın:

```bash
npm run deploy-demo
```

Üretime dağıtın:

```bash
npm run deploy-prod
```

Pratikte API, GitHub Actions tarafından dağıtılır: **Deploy Demo**, `main` dalına yapılan her push'ta çalışır ve **Deploy Prod** manuel olarak (workflow dispatch ile) başlatılır. Artık bir hazırlık (staging) ortamı bulunmamaktadır.

## Veritabanı Geçişleri

**Deploy Prod**, dağıtım sırasında bekleyen veritabanı geçişlerini uygular. Üretim veritabanları yalnızca VPC içinden gelen bağlantıları kabul eder; bu nedenle `serverless deploy` komutundan hemen sonra iş akışı, `migrate` Lambda fonksiyonunu (`api-Prod-migrate`) çağırır. Bu fonksiyon, her modülün bekleyen geçişlerini çalıştırır ve `{ ok, environment, modules }` döndürür. Herhangi bir modül başarısız olur veya reddedilirse (örneğin geçiş geçmişi olmayan bir veritabanı), iş başarısız olur; böylece şema hiçbir zaman kodun gerisinde kalmaz. **Rollback Prod**, yalnızca Lambda kodunu geri alır; geçişler uygulanmış halde kalır, bu yüzden geçişleri eklemeli (additive) tutun. Durumu kontrol etmek veya geçişleri elle çalıştırmak için bkz. [Sunucu Yönetimi -- Veritabanı Geçişleri](../server-admin#database-migrations).

## Oluşturulan Kaynaklar

Her API dağıtımı, aşağıdaki AWS Lambda fonksiyonlarını oluşturur veya günceller:

| Fonksiyon | Amaç |
|----------|---------|
| `web` | API Gateway üzerinden HTTP isteği işleyicisi |
| `socket` | WebSocket bağlantı işleyicisi |
| `timer15Min` | Her 30 dakikada bir çalışan zamanlanmış görev (adı tarihsel nedenlerle böyledir) |
| `timerMidnight` | Her gece yarısı çalışan günlük zamanlanmış görev |
| `migrate` | Bekleyen veritabanı geçişlerini uygular; Deploy Prod iş akışı tarafından çağrılır |

## Ortam Yapılandırması

Dağıtılmış ortamlarda yapılandırma, `.env` dosyaları yerine **AWS SSM Parameter Store**'dan okunur. Bu, gizli bilgilerin dağıtım paketinin dışında tutulmasını sağlar ve yapılandırma değişikliklerinin yeniden dağıtım gerektirmeden yapılabilmesine olanak tanır.

:::warning
Üretim kimlik bilgilerini asla depoya işlemeyin (commit). Tüm hassas yapılandırma AWS SSM Parameter Store'da saklanmalı ve çalışma zamanında oradan erişilmelidir.
:::

:::tip
`main` dalına yapılan her birleştirme (merge) önce demo ortamına dağıtılır. Deploy Prod'u çalıştırmadan önce değişikliğinizi orada kontrol edin (örneğin [demo.b1.church](https://demo.b1.church) adresinde).
:::

## İlgili Makaleler

- **[Yerel API Kurulumu](../api/local-setup)** -- Geliştirme için API'nin kurulumu
- **[Modül Yapısı](../api/module-structure)** -- Lambda fonksiyon mimarisini anlama
- **[Web Uygulaması Dağıtımı](./web-apps)** -- Ön yüz uygulamalarının dağıtımı

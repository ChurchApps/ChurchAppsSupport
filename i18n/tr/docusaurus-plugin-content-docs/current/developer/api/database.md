---
title: "Veritabanı"
description: "ChurchApps API'nin verilerini modül başına bir olmak üzere altı MySQL veritabanına nasıl böldüğünü ve bağlantıların nasıl yapılandırılıp başlatılacağını öğrenin."
---

# Veritabanı

<div class="article-intro">

ChurchApps API, **modül başına veritabanı** mimarisini kullanır. Altı veri modülünün her birinin kendi bağımsız bağlantı havuzuna sahip ayrı bir MySQL veritabanı vardır. Bu yapı, her şeyi tek bir dağıtım içinde tutarken net veri sınırları sağlar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- **MySQL 8.0+** kurun -- bkz. [Ön Koşullar](../setup/prerequisites.md)
- Veritabanı bağlantı dizelerini `.env` dosyanızda yapılandırın -- bkz. [Ortam Değişkenleri](../setup/environment-variables.md)

</div>

## Mimari Genel Bakış

```
Api
├── membership_db   ← Kişiler, gruplar, izinler
├── attendance_db   ← Hizmetler, oturumlar, kayıtlar
├── content_db      ← Sayfalar, bölümler, öğeler
├── giving_db       ← Bağışlar, fonlar, ödemeler
├── messaging_db    ← Konuşmalar, bildirimler
└── doing_db        ← Görevler, planlar, atamalar
```

### Temel Tasarım Kararları

- **Modül başına bir veritabanı** -- Her modül, ayrılmış bir bağlantı havuzuyla (`KyselyPool` tarafından yönetilir) kendi MySQL veritabanını tutar. Bu, modülleri birbirinden bağımsız tutar ve şema değişikliklerinin bağımsız şekilde ilerlemesine olanak tanır.
- **Münhasır sahiplik** -- Bir modülün tablolarına yalnızca o modülün kendi kodu okuma ve yazma erişimine sahiptir. Başka bir modülün verisine ihtiyacı olduğunda, tabloları doğrudan sorgulamak yerine sahip modülün ağ geçidini çağırır -- bkz. [Modüller Arası İletişim](./module-structure.md#cross-module-communication).
- **ORM kullanmayan depo deseni** -- Tüm veri erişimi, modülün şemasına karşı Kysely sorgu oluşturucusu ile tipli SQL oluşturan depo sınıflarından geçer. Bu, sorgu performansı ve davranışı üzerinde tam denetim sağlar.
- **Tasarımdan gelen çok kiracılılık** -- Her sorgu `churchId` ile kapsamlandırılır. Tüm tablolarda bir `churchId` sütunu bulunur ve depo katmanı kiracı izolasyonunu otomatik olarak uygular.

## Bağlantı Dizeleri

Her modülün veritabanı bağlantısı, standart MySQL bağlantı dizesi biçimi kullanılarak `.env` dosyasında yapılandırılır:

```
mysql://user:password@host:port/database
```

Örneğin, yerel bir geliştirme kurulumu şöyle görünebilir:

Her modül, `<MODULE>_CONNECTION_STRING` adlı bir ortam değişkeninden bağlantısını okur:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Üretim ortamında bağlantı dizeleri AWS SSM Parameter Store içinde saklanır ve başlangıçta `Environment` sınıfı tarafından okunur.
:::

## Şema Betikleri

Tablo şemaları, modüllere göre düzenlenmiş olarak `tools/migrations/` dizininde Kysely geçişleri (migrations) olarak tanımlanır:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Geçişler tablo oluşturma, dizinler ve şema değişikliklerini tanımlar. `tools/dbScripts/` dizini, şemanın üzerine yüklenebilecek demo ve tohum verilerini içerir.

## Veritabanı Başlatma

### Tüm veritabanlarını başlatın

```bash
npm run initdb
```

Bu komut altı veritabanının tamamını oluşturur ve her biri için geçişleri çalıştırır.

### Tek bir modülü başlatın

```bash
npm run initdb -- --module=membership
```

:::tip
Belirli bir modül üzerinde çalışırken, diğerlerini etkilemeden yalnızca o modülün veritabanını yeniden başlatabilirsiniz.
:::

## Veri Erişim Deseni

Depolar, modülün `getDb()` fonksiyonu aracılığıyla elde edilen, modülün tipli veritabanı şemasına karşı Kysely sorgu oluşturucusu ile sorgular oluşturur. Tipik bir depo metodu şöyle görünür:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Depolar `RepoManager` aracılığıyla elde edilir:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Çok kiracılı izolasyonu korumak için sorgularınıza her zaman `churchId` ekleyin. Belirli, yetkili bir nedeniniz olmadıkça kiracılar arasında asla sorgu yapmayın.
:::

## Modüller Arası Referanslar

Her modülün verisi ayrı bir veritabanında bulunduğundan, modül sınırları arasında yabancı anahtar (foreign key) veya SQL birleştirmesi (join) yoktur. Başka bir modülün verisiyle ilişkili bir kayıt, o kaydın kimliğini saklar -- örneğin, giving veritabanındaki bir bağış, membership veritabanındaki bir kişinin `personId` değerini taşır -- ve modüller arası birleştirmeler uygulama kodunda gerçekleşir.

Bu kısıtlama, modül sınırlarını gerçek kılan şeydir: her şema bağımsız olarak evrilebilir, bir modülün veritabanı kendi sunucusuna taşınabilir ve bir modül, paylaşılan tablolar veya veritabanlar arası sorgular çözülmeden bağımsız bir servise bile dönüştürülebilir.

## İlgili Makaleler

- **[Modül Yapısı](./module-structure.md)** -- Denetleyicilerin ve depoların her modül içinde nasıl düzenlendiği
- **[Yerel API Kurulumu](./local-setup.md)** -- Adım adım tam kurulum kılavuzu

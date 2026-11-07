---
title: "Modül Yapısı"
description: "API modüllerinin düzenini açıklar: denetleyiciler, depolar, ağ geçitleri, yetki kontrolleri ve B1 geliştirme ortamlarında kodu çalıştıran altı Lambda işlevi."
---

# Modül Yapısı

<div class="article-intro">

Her API modülü; denetleyiciler (controllers), depolar (repositories), modeller ve yardımcılardan oluşan tutarlı bir iç yapıyı izler. Bu düzeni anlamak, kod tabanında gezinmeyi ve herhangi bir modüle yeni işlevsellik eklemeyi kolaylaştırır.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- API'yi yerel olarak kurun -- bkz. [Yerel API Kurulumu](./local-setup.md)
- Veri erişim katmanını anlamak için [Veritabanı](./database.md) mimarisini inceleyin

</div>

## Dizin Yapısı

Modüller `src/modules/{name}/` altında bulunur. Tipik bir modül dört dizin içerir:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

Örneğin, üyelik (membership) modülü:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Altı temel veri modülü -- membership (üyelik), attendance (yoklama), content (içerik), giving (bağışlar), messaging (mesajlaşma) ve doing (görevler) -- hepsi bu düzeni izler. Modüller arası raporları sunan ve kendi verisine sahip olmayan reporting (raporlama) gibi birkaç özel modül de `src/modules/` altında bunların yanında yer alır.

## Bir Uygulama, Birçok Modül

API bir **modüler monolit**tir: modüller ayrı servisler değil, kod organizasyonu ve veri sahipliğinin sınırlarını belirler. Başlangıçta her modülün denetleyicileri tek bir bağımlılık enjeksiyonu (DI) konteynerine kaydedilir ve tek bir Express uygulamasının arkasına yerleştirilir. Böylece tüm API tek bir birim olarak derlenir, çalışır ve dağıtılır -- aşağıda anlatılan dağıtılmış fonksiyonların hepsi bu aynı uygulamaya giriş noktalarıdır.

Her modülün rotaları, modül adıyla eşleşen bir URL önekinin altında bulunur:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Bu yapı, her modülün API yüzeyini kendi içinde tutarken istemcilerin yine tek bir host ile iletişim kurmasını sağlar.

## Denetleyiciler

Denetleyiciler bir modülün API rotalarını tanımlar. Her modülün kendi temel denetleyicisi vardır (örneğin `MembershipBaseController`). Bu denetleyici, `@churchapps/apihelper` paketindeki `CustomBaseController` üzerine kurulu, ortak `BaseController` sınıfından türer. Rotalar Inversify dekoratörleriyle kaydedilir.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = authenticated user context
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper`, isteği kimliğini doğrulayarak başlar ve eylemi çalıştırmadan önce `this.repos` nesnesini modülün depolarıyla doldurur.

### Rota Dekoratörleri

| Dekoratör | HTTP Metodu |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")` dekoratörü, denetleyicideki tüm rotalar için temel yolu belirler.

## Depolar

Depolar tüm veritabanı işlemlerini yönetir. Bir ORM kullanılmaz; sorgular, modülün veritabanı şemasına göre tiplenmiş Kysely sorgu oluşturucusuyla yazılır. Her modülün `db/index.ts` dosyası, modülün tiplenmiş Kysely örneğini döndüren bir `getDb()` fonksiyonu sunar.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Denetleyicilerin içinde modülün depolarına `this.repos` üzerinden erişilir. Denetleyicilerin dışında ise `RepoManager` aracılığıyla alınırlar:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Modüller Arası İletişim

Her modül kendi veritabanına sahiptir (bkz. [Veritabanı](./database.md)) ve hiçbir modül başka bir modülün tablolarını doğrudan sorgulamaz. Bir modül, başka bir modülün sahip olduğu veriye ihtiyaç duyduğunda -- örneğin doing modülünün membership modülünden kişileri çözümlemesi gerektiğinde -- `src/shared/modules/` içindeki sahip modülün **geçidi (gateway)** üzerinden çalışır:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Her geçit (`MembershipModuleGateway`, `GivingModuleGateway` vb.), sahip modülün geri kalan API'ye tam olarak hangi işlemleri sunduğunu tanımlayan bir TypeScript arayüzüdür. Arayüz bir sözleşmedir: mevcut uygulamalar sahip modülün veritabanını süreç içinde okur. Ancak çağıranlar yalnızca arayüze bağımlı olduğundan, bir modül bir gün ayrı bir servise çıkarılırsa uygulama değiştirilebilir (örneğin HTTP çağrıları yapan bir uygulamayla).

:::info
İhtiyacınız olan veri başka bir modülde yer alıyorsa ve o modülün geçidi bu veri için bir işlem sunmuyorsa, diğer modülün depolarına veya veritabanına doğrudan erişmek yerine geçit arayüzünü genişletin.
:::

## Kimlik Doğrulama ve Yetkilendirme

### JWT Kimlik Doğrulama

Tüm istekler, `CustomAuthProvider` tarafından işlenen JWT belirteçleriyle kimliği doğrulanır. Belirteç otomatik olarak doğrulanır ve kimliği doğrulanmış kullanıcı bağlamı (`au`) her denetleyici eyleminde kullanılabilir.

### İzin Kontrolleri

Geçerli kullanıcının gerekli izne sahip olduğunu doğrulamak için `au.checkAccess()` kullanın. İzinler, bir içerik türünü ve bir eylemi birleştiren önceden tanımlanmış sabitlerdir:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

Kullanıcının gerekli izni yoksa otomatik olarak bir hata yanıtı döndürülür.

:::warning
Herhangi bir veri işlemi yapmadan önce her zaman `au.checkAccess()` çağırın. Yalnızca okuma amaçlı görünen uç noktalarda bile izin kontrollerini asla atlamayın.
:::

## Ortam Yapılandırması

`Environment` sınıfı farklı ortamlardaki yapılandırmayı yönetir:

- **Yerel geliştirme:** Proje kökündeki `.env` dosyasından okur
- **Dağıtılmış ortamlar:** AWS SSM Parameter Store'dan okur

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Bu soyutlama sayesinde kodunuzun yapılandırmanın nereden geldiğini bilmesi gerekmez.

## Lambda Fonksiyonları

AWS'ye dağıtıldığında API altı Lambda fonksiyonu olarak çalışır:

| İşlev | Amaç |
|----------|---------|
| `web` | Tüm HTTP REST API isteklerini işler |
| `socket` | Gerçek zamanlı özellikler için WebSocket bağlantılarını yönetir |
| `timer15Min` | E-posta bildirimleri için her 30 dakikada bir planlanır (ad tarihseldir) |
| `timerMidnight` | Özet e-postaları ve bakım için her gün planlanır |
| `timerScheduledTasks` | Vadesi gelmiş otomasyonlar ve süresi geçmiş iş akışı işlemleri için her gün planlanır |
| `timerWebhooks` | Sıraya alınmış giden webhook'ları iletmek için her dakika planlanır |

:::info
Yerelde `web` fonksiyonu 8084 portunda, `socket` fonksiyonu ise 8087 portunda çalışır. Zamanlayıcı fonksiyonları geliştirme sırasında elle tetiklenebilir.
:::

## İlgili Makaleler

- **[Veritabanı](./database.md)** -- Bağlantı dizeleri, şema betikleri ve veri erişim desenleri
- **[Yerel API Kurulumu](./local-setup.md)** -- Adım adım tam kurulum kılavuzu
- **[ApiHelper](../shared-libraries/api-helper.md)** -- `CustomBaseController` ve kimlik doğrulama ara katmanını sağlayan paylaşılan kütüphane

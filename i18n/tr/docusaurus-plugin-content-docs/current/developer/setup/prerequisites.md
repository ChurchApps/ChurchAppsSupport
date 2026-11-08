---
title: "Ön Koşullar"
description: "ChurchApps projelerini (B1 Admin, Lessons.church, FreePlay veya API gibi) yerel olarak çalıştırmadan önce Node.js, npm, Git ve platform araç zincirlerini kurun."
---

# Ön Koşullar

<div class="article-intro">

İhtiyaç duyacağınız araçlar hangi projeler üzerinde çalışmayı planladığınıza bağlıdır. Bu sayfa, gerekli tüm yazılımları geliştirme alanlarına göre listeler; evrensel gereksinimlerden platforma özel araç zincirlerine kadar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Hangi projeler üzerinde çalışmak istediğinizi belirlemek için [Proje Genel Bakışı](./project-overview.md) sayfasını inceleyin
- Yazılım kurabilmek için geliştirme makinenizde yönetici yetkisine sahip olun

</div>

## Tüm Projeler

Hangi projeyi üzerinde çalıştığınıza bakılmaksızın bunlar gereklidir:

| Araç | Sürüm | Notlar |
|------|---------|-------|
| **Node.js** | 20+ | B1App ve LessonsApp (Next.js 16) için 22+ gerekir; Api için 24+ gerekir |
| **npm** | Node.js ile birlikte gelir | Tüm projelerde paket yöneticisi olarak kullanılır |
| **Git** | En son sürüm | Her proje ayrı bir depodur |

:::tip
Node sürümleri arasında kolayca geçiş yapmak için bir Node sürüm yöneticisi kullanın: [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) veya [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows).
:::

## Arka Uç API Geliştirme

API'yi yerel olarak çalıştırmayı planlıyorsanız (demo API'lerine yönlendirmek yerine):

| Araç | Sürüm | Notlar |
|------|---------|-------|
| **MySQL** | 8.0+ | Her API modülü kendi veritabanını kullanır |

Temel API için altı veritabanına ihtiyacınız olacak: `membership`, `attendance`, `content`, `giving`, `messaging` ve `doing`. API, şemayı başlatmak için betikler içerir -- bkz. [API yerel kurulum](../api/local-setup.md) kılavuzu.

## Mobil Uygulama Geliştirme

B1Checkin, LessonsScreen veya diğer React Native / Expo uygulamaları için:

| Araç | Sürüm | Notlar |
|------|---------|-------|
| **Expo CLI** | En son sürüm | Genel olarak kurun: `npm install -g expo-cli` |
| **Android Studio** | En son sürüm | Android geliştirme için gereklidir (Android SDK'yı içerir) |
| **Xcode** | En son sürüm | iOS geliştirme için gereklidir (yalnızca macOS) |

:::info
Android Studio veya Xcode olmadan hızlı test yapmak için fiziksel bir cihazda Expo Go uygulamasını kullanabilirsiniz. Ancak üretim sürümü derlemek için yerel araç zincirleri gereklidir.
:::

## FreeShow (Masaüstü Uygulaması) Geliştirme

FreeShow, yerel Node modüllerini (ör. `canvas`) derlediği için ek yerel derleme bağımlılıklarına sahiptir:

### Tüm Platformlar

| Araç | Sürüm | Notlar |
|------|---------|-------|
| **Python** | 3.12 | Yerel modül derlemesi için `node-gyp` tarafından gereklidir |
| **setuptools** | En son sürüm | `pip install setuptools` ile kurun |

### Windows

| Araç | Notlar |
|------|-------|
| **Visual Studio** | Community sürümü yeterlidir |
| **"C++ ile masaüstü geliştirme" iş yükü** | Visual Studio kurulumu sırasında seçin |
| **Windows 10 SDK** | C++ iş yükünün içinde yer alır; işaretli olduğundan emin olun |

Visual Studio derleme araçlarını komut satırından kurabilirsiniz:

```bash
npm install --global windows-build-tools
```

Ya da Visual Studio Community'yi kurup kurulum sırasında "C++ ile masaüstü geliştirme" iş yükünü seçin.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Genellikle Xcode Command Line Tools yeterlidir:

```bash
xcode-select --install
```

## Kurulumu Doğrulayın

Her şeyin kurulu olduğunu doğrulamak için bu komutları çalıştırın:

```bash
node --version    # v20.x.x veya daha yüksek bir sürüm göstermelidir
npm --version     # 10.x.x veya daha yüksek bir sürüm göstermelidir
git --version     # git version 2.x.x göstermelidir
mysql --version   # Yalnızca yerel API geliştirmesi için gereklidir
```

## Sonraki Adımlar

- **[Proje Genel Bakışı](./project-overview.md)** -- Tüm projeleri ve ne yaptıklarını görün
- **[Ortam Değişkenleri](./environment-variables.md)** -- `.env` dosyalarınızı yapılandırın

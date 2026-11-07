---
title: "Ön Koşullar"
---

# Ön Koşullar

<div class="article-intro">

Ihtiyacınız olan araçlar hangi projeler üzerinde çalışmayı planladığınıza bağlıdır. Bu sayfa, gerekli tüm yazılımları geliştirme alanına göre listeler; evrensel gereksinimlerden platforma özgü araç zincirlerine kadar.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Hangi projeler üzerinde çalışmak istediğinizi belirlemek için [Proje Genel Bakışı](./project-overview) sayfasını inceleyin
- Yazılım kurulumu için geliştirme makinenizde yönetici erişiminiz olduğundan emin olun

</div>

## Tüm Projeler

Çalıştığınız projeden bağımsız olarak bunların tümü gereklidir:

| Araç | Sürüm | Notlar |
|------|-------|--------|
| **Node.js** | 20+ | B1App ve LessonsApp (Next.js 16) için 22+ gereklidir; Api için 24+ gereklidir |
| **npm** | Node.js ile birlikte gelir | Tüm projelerde paket yöneticisi olarak kullanılır |
| **Git** | En son sürüm | Her proje ayrı bir depodur |

:::tip
Node sürümleri arasında kolayca geçiş yapmak için [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) veya [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) gibi bir Node sürüm yöneticisi kullanın.
:::

## Arka Uç API Geliştirme

API'yi yerel olarak çalıştırmayı planlıyorsanız (demo API'lerine yönlendirmek yerine):

| Araç | Sürüm | Notlar |
|------|-------|--------|
| **MySQL** | 8.0+ | Her API modülü kendi veritabanını kullanır |

Temel API için altı veritabanına ihtiyacınız olacak: `membership`, `attendance`, `content`, `giving`, `messaging` ve `doing`. API, şemayı başlatmak için betikler içerir -- bkz. [API yerel kurulum](../api/local-setup) kılavuzu.

## Mobil Uygulama Geliştirme

B1Mobile, B1Checkin, LessonsScreen veya diğer React Native / Expo uygulamaları için:

| Araç | Sürüm | Notlar |
|------|-------|--------|
| **Expo CLI** | En son sürüm | Genel olarak kurun: `npm install -g expo-cli` |
| **Android Studio** | En son sürüm | Android geliştirme için gereklidir (Android SDK'yı içerir) |
| **Xcode** | En son sürüm | iOS geliştirme için gereklidir (yalnızca macOS) |

:::info
Android Studio veya Xcode olmadan hızlı test yapmak için fiziksel bir cihazda Expo Go uygulamasını kullanabilirsiniz. Ancak üretim için derleme yapmak yerel araç zincirlerini gerektirir.
:::

## FreeShow (Masaüstü Uygulaması) Geliştirme

FreeShow, yerel Node modüllerini (`canvas` gibi) derlediği için ek yerel derleme bağımlılıklarına sahiptir:

### Tüm Platformlar

| Araç | Sürüm | Notlar |
|------|-------|--------|
| **Python** | 3.12 | Yerel modül derlemesi için `node-gyp` tarafından gereklidir |
| **setuptools** | En son sürüm | `pip install setuptools` ile kurun |

### Windows

| Araç | Notlar |
|------|--------|
| **Visual Studio** | Community sürümü yeterlidir |
| **"Desktop development with C++" iş yükü** | Visual Studio kurulumu sırasında seçin |
| **Windows 10 SDK** | C++ iş yüküne dahildir; işaretli olduğundan emin olun |

Visual Studio derleme araçlarını komut satırından kurabilirsiniz:

```bash
npm install --global windows-build-tools
```

Ya da Visual Studio Community'yi kurun ve kurulum sırasında "Desktop development with C++" iş yükünü seçin.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Genellikle Xcode Command Line Tools yeterlidir:

```bash
xcode-select --install
```

## Kurulumunuzu Doğrulayın

Her şeyin kurulu olduğunu doğrulamak için bu komutları çalıştırın:

```bash
node --version    # v20.x.x veya üzeri çıktı vermelidir
npm --version     # 10.x.x veya üzeri çıktı vermelidir
git --version     # git version 2.x.x çıktı vermelidir
mysql --version   # Yalnızca yerel API geliştirmesi için gereklidir
```

## Sonraki Adımlar

- **[Proje Genel Bakışı](./project-overview)** -- Tüm projeleri ve ne işe yaradıklarını görün
- **[Ortam Değişkenleri](./environment-variables)** -- `.env` dosyalarınızı yapılandırın

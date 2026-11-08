---
title: "Cerințe preliminare"
description: "Configurați Node.js, npm, Git și instrumentele specifice platformei înainte de a lucra local la proiectele ChurchApps, precum B1 Admin, Lessons.church, FreePlay sau API-ul."
---

# Cerințe preliminare

<div class="article-intro">

Instrumentele de care aveți nevoie depind de proiectele la care intenționați să lucrați. Această pagină enumeră tot software-ul necesar, organizat pe domenii de dezvoltare, de la cerințele comune până la instrumentele specifice fiecărei platforme.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Consultați [Prezentarea generală a proiectelor](./project-overview.md) pentru a stabili la ce proiecte doriți să lucrați
- Aveți nevoie de drepturi de administrator pe computerul de dezvoltare pentru a instala software-ul

</div>

## Toate proiectele

Acestea sunt necesare indiferent de proiectul la care lucrați:

| Instrument | Versiune | Observații |
|------|---------|-------|
| **Node.js** | 20+ | Versiunea 22+ este necesară pentru B1App și LessonsApp (Next.js 16); versiunea 24+ este necesară pentru Api |
| **npm** | Vine odată cu Node.js | Utilizat ca manager de pachete în toate proiectele |
| **Git** | Ultima versiune | Fiecare proiect este un depozit separat |

:::tip
Folosiți un manager de versiuni Node, precum [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) sau [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), pentru a comuta ușor între versiunile Node.
:::

## Dezvoltarea API-ului backend

Dacă intenționați să rulați API-ul local (în loc să folosiți API-urile demo):

| Instrument | Versiune | Observații |
|------|---------|-------|
| **MySQL** | 8.0+ | Fiecare modul al API-ului utilizează propria bază de date |

Pentru API-ul de bază veți avea nevoie de șase baze de date: `membership`, `attendance`, `content`, `giving`, `messaging` și `doing`. API-ul include scripturi pentru inițializarea schemei -- consultați ghidul [Configurarea locală a API-ului](../api/local-setup.md).

## Dezvoltarea aplicațiilor mobile

Pentru B1Checkin, LessonsScreen sau alte aplicații React Native / Expo:

| Instrument | Versiune | Observații |
|------|---------|-------|
| **Expo CLI** | Ultima versiune | Instalare globală: `npm install -g expo-cli` |
| **Android Studio** | Ultima versiune | Necesar pentru dezvoltarea Android (include Android SDK) |
| **Xcode** | Ultima versiune | Necesar pentru dezvoltarea iOS (doar macOS) |

:::info
Puteți folosi aplicația Expo Go pe un dispozitiv fizic pentru testare rapidă, fără Android Studio sau Xcode. Totuși, generarea de binare pentru producție necesită instrumentele native.
:::

## Dezvoltarea FreeShow (aplicația desktop)

FreeShow are dependențe suplimentare de compilare nativă, deoarece compilează module Node native (precum `canvas`):

### Toate platformele

| Instrument | Versiune | Observații |
|------|---------|-------|
| **Python** | 3.12 | Necesar pentru `node-gyp`, la compilarea modulelor native |
| **setuptools** | Ultima versiune | Instalare prin `pip install setuptools` |

### Windows

| Instrument | Observații |
|------|-------|
| **Visual Studio** | Ediția Community este suficientă |
| **Sarcina de lucru „Desktop development with C++”** | Selectați-o în timpul instalării Visual Studio |
| **Windows 10 SDK** | Inclus în sarcina de lucru C++; asigurați-vă că este bifat |

Puteți instala instrumentele de compilare Visual Studio din linia de comandă:

```bash
npm install --global windows-build-tools
```

Sau instalați Visual Studio Community și selectați sarcina de lucru „Desktop development with C++” în timpul instalării.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

De obicei, sunt suficiente Xcode Command Line Tools:

```bash
xcode-select --install
```

## Verificarea instalării

Rulați aceste comenzi pentru a confirma că totul este instalat:

```bash
node --version    # Ar trebui să afișeze v20.x.x sau o versiune superioară
npm --version     # Ar trebui să afișeze 10.x.x sau o versiune superioară
git --version     # Ar trebui să afișeze git version 2.x.x
mysql --version   # Necesar doar pentru dezvoltarea locală a API-ului
```

## Pașii următori

- **[Prezentarea generală a proiectelor](./project-overview.md)** -- Vedeți toate proiectele și ce fac
- **[Variabile de mediu](./environment-variables.md)** -- Configurați fișierele `.env`

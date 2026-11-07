---
title: "Cerințe preliminare"
---

# Cerințe preliminare

<div class="article-intro">

Instrumentele de care aveți nevoie depind de proiectele la care plănuiți să lucrați. Această pagină enumeră tot software-ul necesar, organizat pe domenii de dezvoltare, de la cerințele comune tuturor până la lanțurile de instrumente specifice fiecărei platforme.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Consultați [Prezentarea generală a proiectelor](./project-overview) pentru a stabili la ce proiecte doriți să lucrați
- Aveți nevoie de acces de administrator pe computerul de dezvoltare pentru a instala software-ul

</div>

## Toate proiectele

Acestea sunt necesare indiferent de proiectul la care lucrați:

| Instrument | Versiune | Observații |
|------|---------|-------|
| **Node.js** | 20+ | Versiunea 22+ este necesară pentru B1App și LessonsApp (Next.js 16); versiunea 24+ este necesară pentru Api |
| **npm** | Vine odată cu Node.js | Folosit ca gestionar de pachete în toate proiectele |
| **Git** | Ultima versiune | Fiecare proiect este un depozit separat |

:::tip
Folosiți un manager de versiuni Node, precum [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) sau [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), pentru a comuta cu ușurință între versiunile Node.
:::

## Dezvoltarea API-ului backend

Dacă intenționați să rulați API-ul local (în loc să folosiți API-urile demonstrative):

| Instrument | Versiune | Observații |
|------|---------|-------|
| **MySQL** | 8.0+ | Fiecare modul al API-ului folosește propria bază de date |

Veți avea nevoie de șase baze de date pentru API-ul de bază: `membership`, `attendance`, `content`, `giving`, `messaging` și `doing`. API-ul include scripturi pentru inițializarea schemei -- consultați ghidul [configurarea locală a API-ului](../api/local-setup).

## Dezvoltarea aplicațiilor mobile

Pentru B1Mobile, B1Checkin, LessonsScreen sau alte aplicații React Native / Expo:

| Instrument | Versiune | Observații |
|------|---------|-------|
| **Expo CLI** | Ultima versiune | Instalare globală: `npm install -g expo-cli` |
| **Android Studio** | Ultima versiune | Necesar pentru dezvoltarea Android (include Android SDK) |
| **Xcode** | Ultima versiune | Necesar pentru dezvoltarea iOS (doar macOS) |

:::info
Puteți folosi aplicația Expo Go pe un dispozitiv fizic pentru testare rapidă, fără Android Studio sau Xcode. Totuși, pentru a construi fișiere binare de producție este necesar lanțul de instrumente nativ.
:::

## Dezvoltarea FreeShow (aplicația desktop)

FreeShow are dependențe suplimentare de compilare nativă, deoarece compilează module Node native (precum `canvas`):

### Toate platformele

| Instrument | Versiune | Observații |
|------|---------|-------|
| **Python** | 3.12 | Necesar de `node-gyp` pentru compilarea modulelor native |
| **setuptools** | Ultima versiune | Instalare prin `pip install setuptools` |

### Windows

| Instrument | Observații |
|------|-------|
| **Visual Studio** | Ediția Community este suficientă |
| **Pachetul de lucru „Desktop development with C++"** | Selectați-l în timpul instalării Visual Studio |
| **Windows 10 SDK** | Inclus în pachetul C++; asigurați-vă că este bifat |

Puteți instala uneltele de compilare Visual Studio din linia de comandă:

```bash
npm install --global windows-build-tools
```

Sau instalați Visual Studio Community și selectați pachetul de lucru „Desktop development with C++" în timpul instalării.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Uneltele de linie de comandă Xcode sunt, de obicei, suficiente:

```bash
xcode-select --install
```

## Verificarea instalării

Rulați aceste comenzi pentru a confirma că totul este instalat:

```bash
node --version    # Ar trebui să afișeze v20.x.x sau mai mare
npm --version     # Ar trebui să afișeze 10.x.x sau mai mare
git --version     # Ar trebui să afișeze git version 2.x.x
mysql --version   # Necesar doar pentru dezvoltarea locală a API-ului
```

## Pașii următori

- **[Prezentarea generală a proiectelor](./project-overview)** -- Vedeți toate proiectele și ce fac
- **[Variabile de mediu](./environment-variables)** -- Configurați fișierele `.env`

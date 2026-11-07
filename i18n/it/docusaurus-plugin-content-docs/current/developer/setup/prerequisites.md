---
title: "Prerequisiti"
description: "Installare Node.js, npm, Git e i toolchain delle piattaforme prima di lavorare in locale sui progetti ChurchApps come B1 Admin, Lessons.church, FreePlay o l'API."
---

# Prerequisiti

<div class="article-intro">

Gli strumenti necessari dipendono dai progetti su cui intendi lavorare. Questa pagina elenca tutto il software richiesto, organizzato per area di sviluppo, dai requisiti comuni alle toolchain specifiche di ogni piattaforma.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Consulta la [Panoramica dei progetti](./project-overview.md) per decidere su quali progetti vuoi lavorare
- Assicurati di avere i privilegi di amministratore sulla tua macchina di sviluppo per installare il software

</div>

## Tutti i progetti

Questi sono richiesti indipendentemente dal progetto su cui lavori:

| Strumento | Versione | Note |
|------|---------|-------|
| **Node.js** | 20+ | La versione 22+ è richiesta per B1App e LessonsApp (Next.js 16); la 24+ per l'Api |
| **npm** | Incluso con Node.js | Usato come gestore di pacchetti in tutti i progetti |
| **Git** | Ultima | Ogni progetto è un repository separato |

:::tip
Usa un gestore di versioni di Node come [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) oppure [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) per passare facilmente tra le versioni di Node.
:::

## Sviluppo del backend API

Se prevedi di eseguire l'API in locale (anziché puntare alle API demo):

| Strumento | Versione | Note |
|------|---------|-------|
| **MySQL** | 8.0+ | Ogni modulo dell'API usa il proprio database |

Per l'API principale ti servono sei database: `membership`, `attendance`, `content`, `giving`, `messaging` e `doing`. L'API include gli script per inizializzare lo schema -- vedi la guida [Setup locale dell'API](../api/local-setup.md).

## Sviluppo di app mobile

Per B1Mobile, B1Checkin, LessonsScreen o altre app React Native / Expo:

| Strumento | Versione | Note |
|------|---------|-------|
| **Expo CLI** | Ultima | Installazione globale: `npm install -g expo-cli` |
| **Android Studio** | Ultima | Necessario per lo sviluppo Android (include l'Android SDK) |
| **Xcode** | Ultima | Necessario per lo sviluppo iOS (solo macOS) |

:::info
Per test rapidi puoi usare l'app Expo Go su un dispositivo fisico, senza Android Studio né Xcode. Tuttavia, per generare i binari di produzione servono le toolchain native.
:::

## Sviluppo di FreeShow (app desktop)

FreeShow richiede dipendenze di build native aggiuntive perché compila moduli Node nativi (come `canvas`):

### Tutte le piattaforme

| Strumento | Versione | Note |
|------|---------|-------|
| **Python** | 3.12 | Richiesto da `node-gyp` per compilare i moduli nativi |
| **setuptools** | Ultima | Installa con `pip install setuptools` |

### Windows

| Strumento | Note |
|-------|-------|
| **Visual Studio** | L'edizione Community è sufficiente |
| **Carico di lavoro "Sviluppo desktop con C++"** | Selezionalo durante l'installazione di Visual Studio |
| **Windows 10 SDK** | Incluso nel carico di lavoro C++; assicurati che sia selezionato |

Puoi installare gli strumenti di build di Visual Studio da riga di comando:

```bash
npm install --global windows-build-tools
```

Oppure installa Visual Studio Community e seleziona il carico di lavoro "Sviluppo desktop con C++" durante l'installazione.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Di solito bastano gli Strumenti da riga di comando di Xcode:

```bash
xcode-select --install
```

## Verificare l'installazione

Esegui questi comandi per confermare che tutto sia installato:

```bash
node --version    # Dovrebbe stampare v20.x.x o superiore
npm --version     # Dovrebbe stampare 10.x.x o superiore
git --version     # Dovrebbe stampare git version 2.x.x
mysql --version   # Necessario solo per lo sviluppo locale dell'API
```

## Passi successivi

- **[Panoramica dei progetti](./project-overview.md)** -- Vedi tutti i progetti e a cosa servono
- **[Variabili d'ambiente](./environment-variables.md)** -- Configura i tuoi file `.env`

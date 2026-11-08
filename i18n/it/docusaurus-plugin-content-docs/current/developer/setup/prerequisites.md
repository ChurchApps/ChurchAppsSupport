---
title: "Prerequisiti"
description: "Configura Node.js, npm, Git e le toolchain delle piattaforme prima di lavorare localmente sui progetti ChurchApps come B1 Admin, Lessons.church, FreePlay o l'API."
---

# Prerequisiti

<div class="article-intro">

Gli strumenti necessari dipendono dai progetti su cui intendi lavorare. Questa pagina elenca tutto il software richiesto, organizzato per area di sviluppo, dai requisiti comuni alle toolchain specifiche per piattaforma.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Consulta la [Panoramica dei progetti](./project-overview.md) per decidere su quali progetti vuoi lavorare
- Assicurati di avere i privilegi di amministratore sul tuo computer di sviluppo per installare il software

</div>

## Tutti i progetti

Questi strumenti sono richiesti indipendentemente dal progetto su cui lavori:

| Strumento | Versione | Note |
|------|---------|-------|
| **Node.js** | 20+ | La versione 22+ è richiesta per B1App e LessonsApp (Next.js 16); la 24+ per l'Api |
| **npm** | Incluso con Node.js | Utilizzato come gestore di pacchetti in tutti i progetti |
| **Git** | Ultima versione | Ogni progetto è un repository separato |

:::tip
Usa un gestore di versioni di Node come [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) per passare facilmente da una versione di Node all'altra.
:::

## Sviluppo del backend API

Se prevedi di eseguire l'API localmente (anziché puntare alle API di demo):

| Strumento | Versione | Note |
|------|---------|-------|
| **MySQL** | 8.0+ | Ogni modulo dell'API utilizza il proprio database |

Per l'API principale ti serviranno sei database: `membership`, `attendance`, `content`, `giving`, `messaging` e `doing`. L'API include degli script per inizializzare lo schema -- consulta la guida [configurazione locale dell'API](../api/local-setup.md).

## Sviluppo delle app mobili

Per B1Checkin, LessonsScreen o altre app React Native / Expo:

| Strumento | Versione | Note |
|------|---------|-------|
| **Expo CLI** | Ultima versione | Installazione globale: `npm install -g expo-cli` |
| **Android Studio** | Ultima versione | Necessario per lo sviluppo Android (include l'Android SDK) |
| **Xcode** | Ultima versione | Necessario per lo sviluppo iOS (solo macOS) |

:::info
Puoi usare l'app Expo Go su un dispositivo fisico per test rapidi senza Android Studio o Xcode. Tuttavia, per creare binari di produzione sono necessarie le toolchain native.
:::

## Sviluppo di FreeShow (app desktop)

FreeShow richiede dipendenze native aggiuntive per la compilazione, perché compila moduli Node nativi (come `canvas`):

### Tutte le piattaforme

| Strumento | Versione | Note |
|------|---------|-------|
| **Python** | 3.12 | Richiesto da `node-gyp` per la compilazione dei moduli nativi |
| **setuptools** | Ultima versione | Installazione tramite `pip install setuptools` |

### Windows

| Strumento | Note |
|------|-------|
| **Visual Studio** | L'edizione Community è sufficiente |
| **Carico di lavoro "Sviluppo desktop con C++"** | Selezionalo durante l'installazione di Visual Studio |
| **Windows 10 SDK** | Incluso nel carico di lavoro C++; assicurati che sia selezionato |

Puoi installare gli strumenti di compilazione di Visual Studio da riga di comando:

```bash
npm install --global windows-build-tools
```

In alternativa, installa Visual Studio Community e seleziona il carico di lavoro "Sviluppo desktop con C++" durante l'installazione.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Di solito bastano gli Strumenti da riga di comando di Xcode:

```bash
xcode-select --install
```

## Verifica dell'installazione

Esegui questi comandi per confermare che tutto sia installato:

```bash
node --version    # Dovrebbe stampare v20.x.x o superiore
npm --version     # Dovrebbe stampare 10.x.x o superiore
git --version     # Dovrebbe stampare git version 2.x.x
mysql --version   # Necessario solo per lo sviluppo locale dell'API
```

## Passaggi successivi

- **[Panoramica dei progetti](./project-overview.md)** -- Scopri tutti i progetti e cosa fanno
- **[Variabili d'ambiente](./environment-variables.md)** -- Configura i tuoi file `.env`

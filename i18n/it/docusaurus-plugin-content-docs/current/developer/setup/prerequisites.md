---
title: "Prerequisiti"
---

# Prerequisiti

<div class="article-intro">

Gli strumenti necessari dipendono dai progetti su cui prevedi di lavorare. Questa pagina elenca tutto il software richiesto, organizzato per area di sviluppo, dai requisiti universali alle toolchain specifiche di ciascuna piattaforma.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Consulta la [Panoramica del progetto](./project-overview) per decidere su quali progetti vuoi lavorare
- Assicurati di avere i privilegi di amministratore sul tuo computer di sviluppo per installare il software

</div>

## Tutti i progetti

Richiesti indipendentemente dal progetto su cui lavori:

| Strumento | Versione | Note |
|------|---------|-------|
| **Node.js** | 20+ | Versione 22+ richiesta per B1App e LessonsApp (Next.js 16); 24+ richiesta per l'Api |
| **npm** | Incluso con Node.js | Usato come gestore di pacchetti in tutti i progetti |
| **Git** | Ultima versione | Ogni progetto è un repository separato |

:::tip
Usa un gestore di versioni di Node come [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) per passare facilmente da una versione di Node all'altra.
:::

## Sviluppo delle API backend

Se prevedi di eseguire l'API in locale (anziché puntare alle API demo):

| Strumento | Versione | Note |
|------|---------|-------|
| **MySQL** | 8.0+ | Ogni modulo dell'API usa il proprio database |

Ti serviranno sei database per l'API principale: `membership`, `attendance`, `content`, `giving`, `messaging` e `doing`. L'API include script per inizializzare lo schema — vedi la guida [configurazione locale dell'API](../api/local-setup).

## Sviluppo di app mobili

Per B1Mobile, B1Checkin, LessonsScreen o altre app React Native / Expo:

| Strumento | Versione | Note |
|------|---------|-------|
| **Expo CLI** | Ultima versione | Installazione globale: `npm install -g expo-cli` |
| **Android Studio** | Ultima versione | Richiesto per lo sviluppo Android (include l'Android SDK) |
| **Xcode** | Ultima versione | Richiesto per lo sviluppo iOS (solo macOS) |

:::info
Puoi usare l'app Expo Go su un dispositivo fisico per test rapidi senza Android Studio o Xcode. Tuttavia, per creare binari di produzione servono le toolchain native.
:::

## Sviluppo di FreeShow (app desktop)

FreeShow richiede dipendenze native aggiuntive per la compilazione, perché compila moduli Node nativi (come `canvas`):

### Tutte le piattaforme

| Strumento | Versione | Note |
|------|---------|-------|
| **Python** | 3.12 | Richiesto da `node-gyp` per la compilazione dei moduli nativi |
| **setuptools** | Ultima versione | Installa con `pip install setuptools` |

### Windows

| Strumento | Note |
|------|-------|
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

Di solito bastano gli Xcode Command Line Tools:

```bash
xcode-select --install
```

## Verifica dell'installazione

Esegui questi comandi per confermare che tutto sia installato:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Passi successivi

- **[Panoramica del progetto](./project-overview)** -- Scopri tutti i progetti e cosa fanno
- **[Variabili d'ambiente](./environment-variables)** -- Configura i tuoi file `.env`

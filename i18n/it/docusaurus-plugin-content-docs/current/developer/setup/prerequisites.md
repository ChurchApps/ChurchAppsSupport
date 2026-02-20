---
title: "Prerequisiti"
---

# Prerequisiti

<div class="article-intro">

Gli strumenti necessari dipendono dai progetti su cui intendi lavorare. Questa pagina elenca tutto il software necessario organizzato per area di sviluppo, dai requisiti universali alle toolchain specifiche per piattaforma.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Consulta la [Panoramica dei progetti](./project-overview) per determinare su quali progetti vuoi lavorare
- Assicurati di avere accesso amministratore sulla tua macchina di sviluppo per installare il software

</div>

## Tutti i progetti

Questi sono necessari indipendentemente dal progetto su cui lavori:

| Strumento | Versione | Note |
|------|---------|-------|
| **Node.js** | 20+ | Versione 22+ richiesta per B1App e LessonsApp (Next.js 16) |
| **npm** | Incluso con Node.js | Usato come gestore pacchetti in tutti i progetti |
| **Git** | Ultima | Ogni progetto è un repository separato |

:::tip
Usa un gestore versioni Node come [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) per passare facilmente tra le versioni di Node.
:::

## Sviluppo API backend

Se intendi eseguire l'API in locale (invece di puntare allo staging):

| Strumento | Versione | Note |
|------|---------|-------|
| **MySQL** | 8.0+ | Ogni modulo API utilizza il proprio database |

Avrai bisogno di sei database per l'API principale: `membership`, `attendance`, `content`, `giving`, `messaging` e `doing`. L'API include script per inizializzare lo schema -- consulta la guida [Setup locale dell'API](../api/local-setup).

## Sviluppo app mobili

Per B1Mobile, B1Checkin, LessonsScreen o altre app React Native / Expo:

| Strumento | Versione | Note |
|------|---------|-------|
| **Expo CLI** | Ultima | Installa globalmente: `npm install -g expo-cli` |
| **Android Studio** | Ultima | Necessario per lo sviluppo Android (include Android SDK) |
| **Xcode** | Ultima | Necessario per lo sviluppo iOS (solo macOS) |

:::info
Puoi usare l'app Expo Go su un dispositivo fisico per test rapidi senza Android Studio o Xcode. Tuttavia, la creazione di binari di produzione richiede le toolchain native.
:::

## Sviluppo FreeShow (app desktop)

FreeShow ha dipendenze di build native aggiuntive perché compila moduli Node nativi (come `canvas`):

### Tutte le piattaforme

| Strumento | Versione | Note |
|------|---------|-------|
| **Python** | 3.12 | Richiesto da `node-gyp` per la compilazione di moduli nativi |
| **setuptools** | Ultima | Installa tramite `pip install setuptools` |

### Windows

| Strumento | Note |
|------|-------|
| **Visual Studio** | L'edizione Community è sufficiente |
| **Workload "Desktop development with C++"** | Seleziona durante l'installazione di Visual Studio |
| **Windows 10 SDK** | Incluso nel workload C++; assicurati che sia selezionato |

Puoi installare gli strumenti di build di Visual Studio tramite riga di comando:

```bash
npm install --global windows-build-tools
```

Oppure installa Visual Studio Community e seleziona il workload "Desktop development with C++" durante l'installazione.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Gli Xcode Command Line Tools sono generalmente sufficienti:

```bash
xcode-select --install
```

## Verifica l'installazione

Esegui questi comandi per confermare che tutto è installato:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Prossimi passi

- **[Panoramica dei progetti](./project-overview)** -- Visualizza tutti i progetti e cosa fanno
- **[Variabili d'ambiente](./environment-variables)** -- Configura i tuoi file `.env`

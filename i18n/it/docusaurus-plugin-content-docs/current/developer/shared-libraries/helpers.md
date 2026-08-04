---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Il pacchetto `@churchapps/helpers` fornisce le utilità di base utilizzate da tutti i progetti ChurchApps, sia frontend che backend. È indipendente dal framework e include helper comuni come `DateHelper`, `ApiHelper`, `CurrencyHelper`, oltre alle interfacce TypeScript condivise che formano il contratto dati tra app e API.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Familiarizza con la configurazione del [workspace Packages](./index.md) e il flusso di rilascio

</div>

## Chi Consuma Questo Pacchetto

Ogni API di ChurchApps (l'Api principale, AskApi e LessonsApi) e ogni frontend web (B1Admin, B1App, B1Transfer, LessonsApp) dipende direttamente da questo pacchetto. I frontend ottengono anche molti dei suoi export (`ApiHelper`, `DateHelper`, `UserHelper` e altre interfacce) ri-esportati tramite [`@churchapps/apphelper`](./app-helper). Gli altri pacchetti condivisi lo dichiarano come dipendenza peer così ogni app risolve esattamente una copia.

## Configurazione per lo Sviluppo Locale

Questo pacchetto risiede nel workspace [Packages](https://github.com/ChurchApps/Packages) insieme alle altre librerie condivise:

1. Clona il workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installa le dipendenze alla root del workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Compila (compila TypeScript in `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Oppure esegui `yarn build` alla root per compilare ogni pacchetto nell'ordine di dipendenza.

Per testare le modifiche all'interno di un progetto consumatore, usa un portale Yarn temporaneo -- vedi [Sviluppo Locale contro un'App Consumatrice](./index.md#local-development-against-a-consuming-app).

## Pubblicazione

I rilasci passano attraverso changesets piuttosto che bump manuali di versione:

1. Esegui `yarn changeset` alla root del workspace e seleziona `@churchapps/helpers` con il tipo di bump appropriato; fai il commit del file changeset generato insieme alla tua modifica.
2. Quando sei pronto per il rilascio, esegui `yarn publish-all` alla root -- incrementa le versioni, scrive i CHANGELOG, compila nell'ordine di dipendenza e pubblica su npm.

Le nuove interfacce condivise vanno in `helpers/src/interfaces/` e vengono ri-esportate tramite il barrel del pacchetto. Anche il catalogo dei tipi di elemento del website builder (`ElementTypes.ts` — 35 tipi con i rispettivi schemi answers) risiede qui; è il contratto condiviso dai renderer di apphelper, dai moduli dell'editor di B1Admin e dai prompt di generazione AI (vedi [Architettura del Website Builder](../architecture/website-builder)).

:::warning
Poiché questo pacchetto è utilizzato da ogni progetto ChurchApps, le modifiche qui hanno un impatto ampio. Un rilascio di `helpers` incrementa automaticamente `apihelper` e `apphelper` così i loro intervalli di dipendenza restano aggiornati. Testa con un portale Yarn in almeno un'API consumatrice e un'app web consumatrice prima di pubblicare.
:::

## Articoli Correlati

- **[ApiHelper](./api-helper)** -- Utilità lato server che dipendono da questo pacchetto
- **[AppHelper](./app-helper)** -- Componenti React che dipendono da questo pacchetto
- **[Panoramica delle Librerie Condivise](./index.md)** -- Configurazione del workspace, flusso di rilascio e workflow di link locale

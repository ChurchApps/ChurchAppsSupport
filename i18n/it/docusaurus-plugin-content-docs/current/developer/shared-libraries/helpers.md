---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Il pacchetto `@churchapps/helpers` fornisce le utilità di base usate da tutti i progetti ChurchApps, sia frontend sia backend. È indipendente dal framework e include helper comuni come `DateHelper`, `ApiHelper`, `CurrencyHelper`, oltre alle interfacce TypeScript condivise che costituiscono il contratto dei dati tra le app e le API.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa **Node.js** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Familiarizza con la configurazione del [workspace Packages](./index.md) e con il flusso di rilascio

</div>

## Chi lo utilizza

Ogni API di ChurchApps (l'Api principale, AskApi e LessonsApi) e ogni frontend web (B1Admin, B1App, B1Transfer, LessonsApp) dipende direttamente da questo pacchetto. I frontend ricevono anche molte delle sue esportazioni (`ApiHelper`, `DateHelper`, `UserHelper` e altre interfacce) riesportate tramite [`@churchapps/apphelper`](./app-helper). Gli altri pacchetti condivisi lo dichiarano come peer dependency, così ogni app risolve esattamente una copia.

## Configurazione per lo sviluppo locale

Questo pacchetto si trova nel workspace [Packages](https://github.com/ChurchApps/Packages), insieme alle altre librerie condivise:

1. Clona il workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installa le dipendenze nella radice del workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Compila (traduce il TypeScript in `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Oppure esegui `yarn build` nella radice per compilare tutti i pacchetti nell'ordine delle dipendenze.

Per testare le modifiche all'interno di un progetto che le utilizza, usa un portal Yarn temporaneo -- vedi [Sviluppo locale con un'app che lo utilizza](./index.md#local-development-against-a-consuming-app).

## Pubblicazione

I rilasci passano attraverso i changeset invece che tramite aggiornamenti manuali delle versioni:

1. Esegui `yarn changeset` nella radice del workspace, seleziona `@churchapps/helpers` con il tipo di incremento appropriato e includi il file changeset generato nel tuo commit.
2. Quando sei pronto a rilasciare, esegui `yarn publish-all` nella radice -- aggiorna le versioni, scrive i CHANGELOG, compila nell'ordine delle dipendenze e pubblica su npm.

Le nuove interfacce condivise vanno in `helpers/src/interfaces/` e vengono riesportate tramite il barrel del pacchetto. Il catalogo dei tipi di elemento del website builder (`ElementTypes.ts` -- 35 tipi con i rispettivi schemi delle risposte) si trova anch'esso qui; è il contratto condiviso dai renderer di apphelper, dai moduli di modifica di B1Admin e dai prompt per la generazione con l'AI (vedi [Architettura del Website Builder](../architecture/website-builder)).

:::warning
Poiché questo pacchetto è usato da ogni progetto ChurchApps, le modifiche qui hanno un impatto ampio. Un rilascio di `helpers` aggiorna automaticamente `apihelper` e `apphelper` in modo che i loro intervalli di dipendenza restino aggiornati. Prima di pubblicare, testa con un portal Yarn in almeno un'API e un'app web che lo utilizzano.
:::

## Articoli correlati

- **[ApiHelper](./api-helper)** -- Utilità lato server che dipendono da questo pacchetto
- **[AppHelper](./app-helper)** -- Componenti React che dipendono da questo pacchetto
- **[Panoramica delle librerie condivise](./index.md)** -- Configurazione del workspace, flusso di rilascio e workflow dei link locali

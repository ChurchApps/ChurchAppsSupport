---
title: "Librerie Condivise"
---

# Librerie Condivise

<div class="article-intro">

Il codice condiviso di ChurchApps viene pubblicato su npm sotto lo scope `@churchapps/*`. Tutti i pacchetti condivisi risiedono in un unico repository -- [Packages](https://github.com/ChurchApps/Packages) -- gestito come workspace Yarn (Berry) e versionato con [changesets](https://github.com/changesets/changesets).

</div>

## Pacchetti

| Pacchetto | Descrizione | Usato da |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Livello di base: funzioni helper indipendenti dal framework e le interfacce TypeScript condivise che formano il contratto dati cross-app | Tutti i progetti |
| [`@churchapps/apihelper`](./api-helper) | Utilità Express lato server: autenticazione, controller base, accesso al database, integrazioni AWS ed email | Tutte le API |
| [`@churchapps/apphelper`](./app-helper) | Componenti React condivisi e moduli funzionali (login, donazioni, moduli, markdown, sito web) | Tutte le applicazioni web |
| `@churchapps/content-providers` | Astrazione sui provider di contenuti di terze parti (Lessons.church, Planning Center, Dropbox e altri) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit per costruire integrazioni B1.church: verifica dei webhook, client REST tipizzato, helper OAuth | Sviluppatori di integrazioni esterne |
| `@churchapps/texting` | Astrazione del provider SMS (Text In Church, Clearstream, Mutual Ministry) | Api |

La direzione delle dipendenze è rigorosamente verso il basso: le app dipendono da `apihelper` e `apphelper`, che dichiarano `@churchapps/helpers` come **dipendenza peer** così ogni app risolve esattamente una copia.

## Configurazione del Workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Il repository utilizza Yarn Berry (il campo `packageManager` alla root è autorevole) con un unico lockfile. `yarn build` compila ogni pacchetto nell'ordine di dipendenza; `yarn test` esegue tutti i test dei pacchetti.

## Rilascio con Changesets

Ogni modifica a un pacchetto viene distribuita con un changeset:

1. Esegui `yarn changeset` alla root del workspace. Scegli il pacchetto/i pacchetti modificati, il tipo di bump (patch = fix, minor = nuovo export o funzionalità, major = modifica non retrocompatibile) e scrivi un riepilogo di una riga -- diventerà la voce del CHANGELOG.
2. Fai il commit del file `.changeset/*.md` generato insieme alla tua modifica al codice. Un hook pre-commit blocca i commit che modificano il sorgente di un pacchetto senza un changeset in staging.
3. Quando sei pronto a pubblicare, esegui `yarn publish-all` alla root. Questo consuma i changeset in sospeso (incrementando le versioni, scrivendo i CHANGELOG, sincronizzando gli intervalli di dipendenza interni), compila tutto nell'ordine di dipendenza e pubblica su npm i pacchetti incrementati. Poi fai il commit e il push degli incrementi di versione.

:::warning
Non eseguire mai un `npm publish` grezzo all'interno di un singolo pacchetto -- salta l'ordinamento della build e la contabilità delle versioni gestita dallo script di rilascio. La pubblicazione richiede un account npm con diritti di pubblicazione sullo scope `@churchapps`.
:::

## Sviluppo Locale contro un'App Consumatrice

All'interno del workspace, i pacchetti si compilano direttamente contro i propri fratelli -- nessun linking necessario. Per testare una build di pacchetto non pubblicata all'interno di un'app consumatrice (B1Admin, B1App, ecc.), aggiungi un portale Yarn temporaneo nel consumatore:

```bash
# nel progetto consumatore
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Compila prima il pacchetto (`yarn build` alla root del workspace) -- il consumatore legge l'output compilato in `dist/`, non il sorgente.

:::warning
`yarn link` scrive una risoluzione di portale nel `package.json` del consumatore. Non farne mai il commit -- esegui sempre `yarn unlink` e reinstalla al termine.
:::

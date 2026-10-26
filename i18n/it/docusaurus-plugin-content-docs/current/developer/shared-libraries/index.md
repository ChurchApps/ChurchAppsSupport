---
title: "Librerie condivise"
---

# Librerie condivise

<div class="article-intro">

Il codice condiviso di ChurchApps viene pubblicato su npm sotto lo scope `@churchapps/*`. Tutti i pacchetti condivisi risiedono in un unico repository — [Packages](https://github.com/ChurchApps/Packages) — gestito come workspace Yarn (Berry) e versionato con [changesets](https://github.com/changesets/changesets).

</div>

## Pacchetti

| Pacchetto | Descrizione | Usato da |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Livello di base: funzioni di supporto senza dipendenze dal framework e le interfacce TypeScript condivise che formano il contratto dati tra le applicazioni | Tutti i progetti |
| [`@churchapps/apihelper`](./api-helper) | Utilità Express lato server: autenticazione, controller di base, accesso al database, integrazioni AWS ed email | Tutte le API |
| [`@churchapps/apphelper`](./app-helper) | Componenti React condivisi e moduli funzionali (login, donazioni, moduli, markdown, sito web) | Tutte le app web |
| `@churchapps/content-providers` | Astrazione sui provider di contenuti di terze parti (Lessons.church, Planning Center, Dropbox e altri) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit per costruire integrazioni con B1.church: verifica dei webhook, client REST tipizzato, helper OAuth | Sviluppatori di integrazioni esterne |
| `@churchapps/texting` | Astrazione sui provider SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

La direzione delle dipendenze è rigorosamente verso il basso: le app dipendono da `apihelper` e `apphelper`, che dichiarano `@churchapps/helpers` come **dipendenza peer** in modo che ciascuna app risolva esattamente una copia del pacchetto.

## Configurazione del workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Il repository usa Yarn Berry (il campo `packageManager` nella radice è quello autorevole) con un unico lockfile. `yarn build` compila tutti i pacchetti nell'ordine delle dipendenze; `yarn test` esegue i test di tutti i pacchetti.

## Rilasci con Changesets

Ogni modifica a un pacchetto viene distribuita con un changeset:

1. Esegui `yarn changeset` nella radice del workspace. Seleziona il/i pacchetto/i modificato/i, il tipo di incremento (patch = correzione, minor = nuova esportazione o funzionalità, major = modifica incompatibile) e scrivi un riepilogo di una riga — diventerà la voce del CHANGELOG.
2. Includi il file `.changeset/*.md` generato nello stesso commit della modifica al codice. Un hook di pre-commit blocca i commit che modificano il sorgente di un pacchetto senza un changeset in stage.
3. Quando sei pronto a pubblicare, esegui `yarn publish-all` nella radice. Questo elabora i changeset in sospeso (incrementando le versioni, scrivendo i CHANGELOG, sincronizzando gli intervalli di dipendenza interni), compila tutto nell'ordine delle dipendenze e pubblica su npm i pacchetti incrementati. Poi esegui il commit e il push degli incrementi di versione.

:::warning
Non eseguire mai un `npm publish` diretto dentro un singolo pacchetto — salta l'ordine di compilazione e la contabilità delle versioni gestita dallo script di rilascio. La pubblicazione richiede un account npm con i diritti di pubblicazione sullo scope `@churchapps`.
:::

## Sviluppo locale con un'app che li usa

All'interno del workspace, i pacchetti si compilano direttamente rispetto ai loro fratelli — non serve alcun collegamento. Per testare una build di un pacchetto non pubblicato all'interno di un'app che lo usa (B1Admin, B1App, ecc.), aggiungi un portal Yarn temporaneo nell'applicazione consumer:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Compila prima il pacchetto (`yarn build` nella radice del workspace) — il consumer legge l'output compilato in `dist/`, non il sorgente.

:::warning
`yarn link` scrive una risoluzione portal nel `package.json` del consumer. Non committarla mai — esegui sempre `yarn unlink` e reinstalla al termine.
:::

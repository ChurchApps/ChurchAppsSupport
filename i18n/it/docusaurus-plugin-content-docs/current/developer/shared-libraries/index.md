---
title: "Librerie Condivise"
---

# Librerie Condivise

<div class="article-intro">

Il codice condiviso di ChurchApps viene pubblicato su npm sotto lo scope `@churchapps/*`. Tutti i pacchetti condivisi vivono in un singolo repository -- [Packages](https://github.com/ChurchApps/Packages) -- gestito come workspace Yarn (Berry) e versionato con [changesets](https://github.com/changesets/changesets).

</div>

## Pacchetti

| Pacchetto | Descrizione | Utilizzato Da |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Strato di fondazione: funzioni helper senza framework e le interfacce TypeScript condivise che formano il contratto di dati tra app | Tutti i progetti |
| [`@churchapps/apihelper`](./api-helper) | Utilità Express lato server: autenticazione, controller di base, accesso al database, integrazioni AWS e email | Tutti gli API |
| [`@churchapps/apphelper`](./app-helper) | Componenti React condivisi e moduli di funzionalità (login, donazioni, moduli, markdown, sito web) | Tutte le app web |
| `@churchapps/content-providers` | Astrazione sui provider di contenuto di terze parti (Lessons.church, Planning Center, Dropbox e altri) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit per creare integrazioni B1.church: verifica webhook, client REST tipizzato, helper OAuth | Sviluppatori di integrazioni esterne |
| `@churchapps/texting` | Astrazione del provider SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions) | Api |

La direzione della dipendenza è rigorosamente verso il basso: le app dipendono da `apihelper` e `apphelper`, che dichiarano `@churchapps/helpers` come una **peer dependency** in modo che ogni app risolva esattamente una copia di esso.

## Configurazione Workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Il repo usa Yarn Berry (il campo `packageManager` radice è autorevole) con un singolo lockfile. `yarn build` costruisce ogni pacchetto in ordine di dipendenza; `yarn test` esegue tutti i test del pacchetto.

## Rilascio con Changesets

Ogni modifica a un pacchetto viene spedita con un changeset:

1. Esegui `yarn changeset` alla radice dello workspace. Scegli i pacchetti che hai toccato, il tipo di salto (patch = correzione, minor = nuovo export o funzionalità, major = breaking), e scrivi un riassunto di una riga -- diventa la voce CHANGELOG.
2. Esegui il commit del file `.changeset/*.md` generato insieme alla tua modifica di codice. Un hook pre-commit blocca i commit che cambiano il sorgente di un pacchetto senza un changeset in staging.
3. Quando sei pronto a pubblicare, esegui `yarn publish-all` alla radice. Questo consuma i changesets in sospeso (saltando le versioni, scrivendo CHANGELOGs, sincronizzando le gamme di dipendenza interna), costruisce tutto in ordine di dipendenza e pubblica i pacchetti saltati su npm. Poi esegui il commit e il push dei salti di versione.

:::warning
Non eseguire mai un raw `npm publish` dentro un singolo pacchetto -- salta l'ordinamento di build e la contabilità della versione che lo script di rilascio gestisce. La pubblicazione richiede un account npm con diritti di pubblicazione allo scope `@churchapps`.
:::

## Sviluppo Locale Contro un'App Consumatrice

All'interno dello workspace, i pacchetti costruiscono direttamente contro i loro fratelli -- nessun collegamento necessario. Per testare una costruzione di pacchetto non pubblicata all'interno di un'app consumatrice (B1Admin, B1App, ecc.), aggiungi un portale Yarn temporaneo nel consumatore:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Costruisci prima il pacchetto (`yarn build` alla radice dello workspace) -- il consumatore legge l'output `dist/` compilato, non il sorgente.

:::warning
`yarn link` scrive una risoluzione del portale nel `package.json` del consumatore. Non eseguirne il commit -- sempre `yarn unlink` e reinstalla quando fatto.
:::

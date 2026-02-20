---
title: "Librerie Condivise"
---

# Librerie Condivise

<div class="article-intro">

Il codice condiviso di ChurchApps è pubblicato su npm sotto lo scope `@churchapps/*`. Questi pacchetti forniscono utilità comuni, helper lato server e componenti React che vengono utilizzati da tutti i progetti ChurchApps come normali dipendenze npm.

</div>

## Pacchetti

| Pacchetto | Descrizione | Utilizzato Da |
|-----------|-------------|---------------|
| [`@churchapps/helpers`](./helpers) | Utilità di base (DateHelper, ApiHelper, ecc.) | Tutti i progetti |
| [`@churchapps/apihelper`](./api-helper) | Utilità Express.js lato server | Tutte le API |
| [`@churchapps/apphelper`](./app-helper) | Componenti React e utilità condivisi | Tutte le applicazioni web |

## Sviluppo Locale con `npm link`

Quando sviluppi una libreria condivisa insieme a un progetto che la utilizza, usa `npm link` per testare le modifiche senza pubblicare su npm:

```bash
# Compila e collega la libreria
cd Helpers && npm run build && npm link

# Collegala nel progetto che la utilizza
cd ../Api && npm link @churchapps/helpers
```

Questo crea un collegamento simbolico dalla cartella `node_modules/@churchapps/helpers` del progetto che la utilizza all'output della tua build locale, in modo che le modifiche siano riflesse immediatamente dopo la ricompilazione.

:::tip
Ricorda di eseguire `npm run build` nel progetto della libreria dopo aver apportato modifiche -- il progetto che la utilizza legge dalla cartella compilata `dist/`, non dai sorgenti.
:::

:::warning
Le connessioni `npm link` vengono reimpostate ogni volta che esegui `npm install` nel progetto che le utilizza. Dovrai rieseguire il comando `npm link @churchapps/<package>` dopo l'installazione delle dipendenze.
:::

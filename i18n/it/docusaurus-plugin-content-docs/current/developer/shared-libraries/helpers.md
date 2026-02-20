---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Il pacchetto `@churchapps/helpers` fornisce utilità di base utilizzate da tutti i progetti ChurchApps, sia frontend che backend. È indipendente dal framework e include helper comuni come `DateHelper`, `ApiHelper`, `CurrencyHelper` e altre utilità condivise.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Familiarizza con il [flusso di lavoro npm link](./index.md) per lo sviluppo locale

</div>

## Configurazione per lo Sviluppo Locale

1. Clona il repository:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. Installa le dipendenze:

   ```bash
   cd Helpers && npm install
   ```

3. Compila il pacchetto (compila TypeScript in `dist/`):

   ```bash
   npm run build
   ```

4. Rendilo disponibile per il linking locale:

   ```bash
   npm link
   ```

Puoi poi collegarlo in qualsiasi progetto che lo utilizza:

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## Pubblicazione

Per pubblicare una nuova versione su npm:

1. Aggiorna la versione in `package.json`
2. Pubblica:

   ```bash
   npm publish --access=public
   ```

:::warning
Poiché questo pacchetto è utilizzato da ogni progetto ChurchApps, le modifiche qui hanno un impatto ampio. Testa accuratamente con `npm link` in almeno un'API che lo utilizza e un'applicazione web prima di pubblicare.
:::

## Articoli Correlati

- **[ApiHelper](./api-helper)** -- Utilità lato server che dipendono da questo pacchetto
- **[AppHelper](./app-helper)** -- Componenti React che dipendono da questo pacchetto
- **[Panoramica delle Librerie Condivise](./index.md)** -- Flusso di lavoro `npm link` e panoramica dei pacchetti

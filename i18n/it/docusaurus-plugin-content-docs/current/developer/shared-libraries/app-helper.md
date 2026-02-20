---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

I pacchetti `@churchapps/apphelper*` forniscono componenti React condivisi e utilità per tutte le applicazioni web di ChurchApps. AppHelper è strutturato come un monorepo workspace contenente sei pacchetti che coprono componenti core, autenticazione, donazioni, moduli, markdown e funzionalità sito web/CMS.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Familiarizza con il [flusso di lavoro npm link](./index.md) per lo sviluppo locale

</div>

## Pacchetti

| Pacchetto | Descrizione |
|-----------|-------------|
| `@churchapps/apphelper` | Componenti e utilità core |
| `@churchapps/apphelper-login` | Interfaccia utente per login e registrazione |
| `@churchapps/apphelper-donations` | Componenti per donazioni e offerte |
| `@churchapps/apphelper-forms` | Componenti per la creazione di moduli |
| `@churchapps/apphelper-markdown` | Editor e renderer markdown |
| `@churchapps/apphelper-website` | Componenti sito web e CMS |

## Configurazione per lo Sviluppo Locale

1. Clona il repository:

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. Installa le dipendenze:

   ```bash
   cd AppHelper && npm install
   ```

3. Compila tutti i pacchetti e avvia il playground Vite:

   ```bash
   npm run playground:reload
   ```

   Questo compila ogni pacchetto nel workspace, poi avvia il server di sviluppo del playground su **http://localhost:3001**.

:::tip
Il playground è il modo più rapido per sviluppare e testare i componenti AppHelper. Esegue il ricaricamento a caldo del server di sviluppo Vite in modo da poter vedere le modifiche in tempo reale.
:::

## Pubblicazione

Pubblica un singolo pacchetto:

```bash
npm run publish:apphelper
```

Pubblica tutti i pacchetti:

```bash
npm run publish:all
```

:::warning
Quando pubblichi, assicurati di aggiornare il numero di versione nel file `package.json` pertinente prima di eseguire il comando di pubblicazione. Tutti i pacchetti che dipendono da un pacchetto modificato devono essere anch'essi aggiornati.
:::

## Articoli Correlati

- **[Helpers](./helpers)** -- Il pacchetto di utilità base utilizzato insieme ad AppHelper
- **[Applicazioni Web](../web-apps/)** -- Le applicazioni web che utilizzano questi pacchetti
- **[Panoramica delle Librerie Condivise](./index.md)** -- Flusso di lavoro `npm link` e panoramica dei pacchetti

---
title: "Applicazioni Web"
---

# Applicazioni Web

<div class="article-intro">

ChurchApps include tre applicazioni web, ognuna rivolta a un pubblico e scopo diverso. Condividono una base tecnologica comune di React 19, TypeScript e Material-UI 7, ma differiscono negli strumenti di build e nelle destinazioni di distribuzione.

</div>

## Panoramica delle Applicazioni

| App | Scopo | Framework | Porta di Sviluppo |
|-----|-------|-----------|-------------------|
| [**B1Admin**](./b1-admin.md) | Pannello di amministrazione della chiesa | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | App pubblica per i membri della chiesa | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Gestione dei contenuti delle lezioni | Next.js 16 + React 19 | 3501 |

## Stack Tecnologico Condiviso

Tutte e tre le applicazioni web sono costruite con:

- **TypeScript** -- Sicurezza dei tipi end-to-end
- **React 19** -- Libreria di componenti UI
- **Material-UI 7** -- Design system e toolkit di componenti
- **React Query 5** -- Gestione dello stato del server

## Componenti Condivisi

Le app condividono componenti UI e utilità tramite la famiglia di pacchetti `@churchapps/apphelper*`:

| Pacchetto | Scopo |
|-----------|-------|
| `@churchapps/apphelper` | Componenti React condivisi core |
| `@churchapps/apphelper-login` | Componenti UI per l'autenticazione |
| `@churchapps/apphelper-donations` | Moduli per donazioni e offerte |
| `@churchapps/apphelper-forms` | Componenti per la creazione di moduli |
| `@churchapps/apphelper-markdown` | Rendering markdown |
| `@churchapps/apphelper-website` | Componenti sito web/CMS |

:::tip
Per dettagli sullo sviluppo locale di questi pacchetti condivisi, vedi la documentazione di [AppHelper](../shared-libraries/app-helper).
:::

## Script Postinstall

Ogni applicazione web ha uno script `postinstall` che copia i file di localizzazione e gli asset CSS da `@churchapps/apphelper` nel progetto. Viene eseguito automaticamente dopo `npm install`.

:::info
Se i componenti appaiono senza stili dopo l'installazione delle dipendenze, lo script `postinstall` potrebbe non essere stato eseguito correttamente. Puoi attivarlo manualmente con `npm run postinstall`.
:::

## Strumenti di Build

Le app utilizzano due diversi strumenti di build:

- **B1Admin** utilizza **Vite** -- un bundler veloce e moderno ideale per le applicazioni a pagina singola
- **B1App** e **LessonsApp** utilizzano **Next.js** -- fornendo rendering lato server, routing basato su file e build di produzione ottimizzate

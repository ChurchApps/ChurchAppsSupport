---
title: "Architettura"
---

# Architettura

<div class="article-intro">

Queste pagine sono mappe di sistema tra repository: documentano come funziona un sistema ChurchApps da capo a fondo -- attraverso le app, i moduli API e le biblioteche condivise.

</div>

## L'ecosistema a colpo d'occhio

ChurchApps è composto da ~20 repository indipendenti. Le app client comunicano con un piccolo set di API backend tramite HTTPS e WebSocket, e condividono codice tramite pacchetti npm pubblicati sotto il scope `@churchapps`.

## Due regole strutturali

1. **I moduli sono isolati.** Ogni modulo Api possiede il suo database e le sue tabelle; altri moduli e app raggiungono i suoi dati solo tramite i suoi endpoint REST.
2. **Il codice condiviso viene spedito come pacchetti npm.** Le app non importano mai il codice sorgente l'una dall'altra; tutto il codice riutilizzato attraversa i confini del repository tramite `@churchapps/helpers`, `@churchapps/apphelper` o `@churchapps/apihelper`.

## Mappe di Sistema

| Pagina | Cosa copre |
|------|-----------|
| [Notifiche e Promemoria](./notifications) | Come qualsiasi cosa comunica a una persona |
| [Architettura in Tempo Reale](../realtime) | Il framework di consegna WebSocket |
| [Donazioni](./giving) | Provider di pagamento, flussi di donazione, fondi |
| [Registrazioni di Evento](./registrations) | Modello di commercio di registrazione |
| [Check-In](./check-ins) | Chiosco e auto check-in |
| [Generatore di Sito Web](./website-builder) | Albero pagina/sezione/elemento |
| [Routing del Sito Web e Multi-Sito](./websites) | Come una richiesta si risolve in una chiesa |
| [Integrazioni](./integrations) | Superficie di estensione: OAuth, chiavi API, webhook, MCP |
| [BYOS](./byos-storage) | Le chiese collegano il loro archivio cloud |
| [Content Commons](./commons) | Spine di asset condivise |

:::tip
Quando una modifica altera il funzionamento di uno di questi sistemi, la mappa di sistema corrispondente dovrebbe essere aggiornata nello stesso sforzo.
:::

---
title: "Setup"
---

# Setup

<div class="article-intro">

Questa sezione ti guida nella configurazione di un ambiente di sviluppo locale per i progetti ChurchApps. Puoi puntare il tuo frontend alle API di staging condivise per uno sviluppo rapido, oppure eseguire lo stack completo in locale per il lavoro sul backend.

</div>

## Due approcci

Esistono due modi per sviluppare in locale, a seconda di quanto dello stack hai bisogno:

### 1. Puntare alle API di staging (il più semplice)

Se stai lavorando su un **progetto frontend** (app web, app mobile o app desktop), il percorso più veloce è puntare la tua app locale alle API di staging condivise. Non è necessaria alcuna configurazione di database o backend.

L'URL base delle API di staging è:

```
https://api.staging.churchapps.org
```

Ogni modulo API è disponibile a un percorso sotto questa base, ad esempio:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
Questo approccio ti permette di iniziare a fare modifiche al frontend in pochi minuti. È il percorso consigliato per la maggior parte dei contributori.
:::

### 2. Eseguire tutto in locale

Se hai bisogno di modificare il codice delle API o lavorare offline, puoi eseguire lo stack completo in locale. Questo richiede MySQL 8.0+ e una configurazione aggiuntiva. Consulta la guida [Setup locale dell'API](../api/local-setup) per istruzioni dettagliate.

## Per iniziare

Segui queste pagine in ordine:

1. **[Prerequisiti](prerequisites)** -- Installa gli strumenti necessari (Node.js, Git, MySQL, ecc.)
2. **[Panoramica dei progetti](project-overview)** -- Comprendi quali progetti esistono e cosa fanno
3. **[Variabili d'ambiente](environment-variables)** -- Configura i tuoi file `.env` per collegare tutto

:::info
Ogni progetto ChurchApps è un repository Git indipendente. Devi clonare solo il/i progetto/i specifico/i su cui vuoi lavorare.
:::

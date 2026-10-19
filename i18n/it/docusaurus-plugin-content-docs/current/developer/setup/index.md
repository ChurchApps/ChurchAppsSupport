---
title: "Configurazione"
---

# Configurazione

<div class="article-intro">

Questa sezione ti guida nella configurazione di un ambiente di sviluppo locale per i progetti ChurchApps. Puoi puntare il tuo frontend alle API demo condivise per uno sviluppo rapido, oppure eseguire l'intero stack in locale per il lavoro sul backend.

</div>

## Due approcci

Esistono due modi per sviluppare in locale, a seconda di quanto stack ti serve:

### 1. Punta alle API demo (il più semplice)

Se stai lavorando su un **progetto frontend** (applicazione web, app mobile o applicazione desktop), il percorso più veloce è puntare la tua app locale alle API demo condivise. Non serve alcuna configurazione di database o backend.

L'URL base delle API demo è:

```
https://api.demo.churchapps.org
```

Ogni modulo API è disponibile con un percorso sotto questa base, ad esempio:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

L'ambiente demo esegue l'ultimo codice presente in `main`, e i suoi dati di esempio vengono ricreati ogni notte, quindi non aspettarti che ciò che crei lì resti disponibile. (L'ex ambiente di staging, `api.staging.churchapps.org`, è stato dismesso. Alcuni file `.env` di esempio potrebbero ancora elencare URL di staging: sostituiscili con gli URL demo o locali.)

:::tip
Questo approccio ti permette di iniziare a fare modifiche al frontend in pochi minuti. È il percorso consigliato per la maggior parte dei collaboratori.
:::

### 2. Esegui tutto in locale

Se devi modificare il codice delle API o lavorare offline, puoi eseguire l'intero stack in locale. Questo richiede MySQL 8.0+ e configurazione aggiuntiva. Consulta la guida [configurazione locale delle API](../api/local-setup) per istruzioni dettagliate.

## Per iniziare

Segui queste pagine in ordine:

1. **[Prerequisiti](prerequisites)** -- Installa gli strumenti necessari (Node.js, Git, MySQL, ecc.)
2. **[Panoramica dei progetti](project-overview)** -- Scopri quali progetti esistono e cosa fanno
3. **[Variabili d'ambiente](environment-variables)** -- Configura i tuoi file `.env` per collegare tutto insieme

:::info
Ogni progetto ChurchApps è un repository Git indipendente. Devi clonare solo il/i progetto/i su cui vuoi lavorare.
:::

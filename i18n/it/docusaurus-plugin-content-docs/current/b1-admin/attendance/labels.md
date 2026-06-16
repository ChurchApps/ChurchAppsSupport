---
title: "Progettista di Etichette di Check-In"
---

# Progettista di Etichette di Check-In

<div class="article-intro">

Il Progettista di Etichette ti consente di creare e personalizzare i modelli di etichette di identificazione e moduli di ritiro che vengono stampati quando le famiglie controllano l'ingresso dei loro bambini. Puoi controllare esattamente quali informazioni compaiono su ogni etichetta, dove è posizionata e come appare.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura [Frequenza](setup) e configura almeno un orario di servizio con il check-in abilitato
- Configura [Check-In](check-in) in modo che le etichette vengano stampate
- Hai bisogno dell'accesso amministrativo alla sezione Frequenza

</div>

## Apertura del Progettista di Etichette

In B1 Admin, vai su **Frequenza** nella barra laterale sinistra e seleziona **Etichette**. Vedrai un elenco dei tuoi modelli di etichette salvati, separati per tipo: **Etichetta Identificativa** e **Modulo di Ritiro**.

## Tipi di Etichette

- **Etichetta Identificativa** — stampata e attaccata al bambino. Tipicamente include il nome del bambino, la sua classe/sessione e un codice di sicurezza.
- **Modulo di Ritiro** — consegnato al genitore o tutore. Tipicamente include il codice di sicurezza e un elenco dei bambini che hanno effettuato il check-in.

B1 ti avvia con un modello di etichetta identificativa predefinito e un modello di modulo di ritiro predefinito dimensionato per etichette termiche standard da 3,5 × 1,1 pollici.

## Creazione di un Modello di Etichetta

1. Fai clic su **Aggiungi Etichetta Identificativa** o **Aggiungi Modulo di Ritiro** (o usa il menu a discesa per scegliere).
2. Un nuovo modello si apre nell'editor di etichette.

### Editor di Etichette

L'editor mostra un'anteprima in scala dell'etichetta alla dimensione configurata. Nel pannello sinistro puoi configurare:

- **Nome** — il nome del modello (solo per tuo riferimento)
- **Tipo di Etichetta** — Etichetta Identificativa o Modulo di Ritiro
- **Larghezza / Altezza** — dimensione dell'etichetta in pollici

### Aggiunta di Blocchi

Un'etichetta è costruita da blocchi — singoli pezzi di contenuto posizionati sulla tela dell'etichetta. Fai clic su **Aggiungi Blocco** per inserire un nuovo blocco e scegliere il suo tipo:

- **Campo** — estrae un valore di dati al momento della stampa:
  - `person.displayName` — il nome completo della persona
  - `sessions` — il servizio/classe in cui hanno effettuato il check-in
  - `securityCode` — il codice di sicurezza generato casualmente per il ritiro
  - `children` — elenco dei bambini (per i moduli di ritiro)
  - `person.nametagNotes` — eventuali note speciali sul record della persona
  - `campus` — il nome del campus
- **Testo** — testo statico che digiti (per intestazioni, etichette o istruzioni)
- **Codice a Barre** — un codice a barre che codifica il codice di sicurezza

### Posizionamento dei Blocchi

Ogni blocco ha campi **X**, **Y**, **Larghezza** e **Altezza** espressi come percentuali della tela dell'etichetta (0-100). Regola questi per posizionare il contenuto con precisione. Puoi anche impostare:

- **Dimensione del Carattere** — dimensione del testo in punti
- **Grassetto** -- abilita/disabilita il testo in grassetto
- **Allineamento** -- allineamento del testo a sinistra, centro o destra
- **Condizione** -- facoltativamente nascondi il blocco se un campo è vuoto (ad esempio, mostra solo nametagNotes se ha un valore)

### Salvataggio

Fai clic su **Salva** per salvare il modello. Il modello aggiornato verrà utilizzato la prossima volta che le etichette vengono stampate in B1 Checkin.

## Riordino dei Modelli

Se hai più modelli di etichette identificative o moduli di ritiro, B1 Checkin utilizzerà il primo modello nell'elenco per impostazione predefinita. Trascina i modelli per riordinarli.

## Eliminazione di un Modello

Fai clic sull'icona di eliminazione su qualsiasi riga del modello e conferma. L'eliminazione dell'ultimo modello di un tipo ripristina il modello incorporato predefinito.

:::tip
Effettua una stampa di prova dopo la modifica di un modello per confermare che il layout sia corretto prima del tuo prossimo servizio.
:::

## Articoli Correlati

- [Configurazione del Check-In](setup) — configura servizi e gruppi per il check-in
- [Completamento del Check-In](check-in) — il flusso di check-in per le famiglie
- [Guida Introduttiva a B1 Checkin](../../b1-checkin/getting-started/index) — l'app del chiosco Checkin

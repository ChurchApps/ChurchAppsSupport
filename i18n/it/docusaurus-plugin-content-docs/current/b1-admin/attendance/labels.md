---
title: "Creatore di Etichette Check-In"
---

# Creatore di Etichette Check-In

<div class="article-intro">

Il Creatore di Etichette ti consente di creare e personalizzare i modelli di targhetta e slip di ritiro che vengono stampati quando le famiglie controllano i bambini. Puoi controllare esattamente quale informazione appare su ogni etichetta, dove è posizionata e come appare.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura [Partecipazione](setup) e almeno un orario di servizio con check-in abilitato
- Configura [Check-In](check-in) in modo che le etichette vengano stampate
- Hai bisogno di accesso amministrativo alla sezione Partecipazione

</div>

## Apertura del Creatore di Etichette

In B1 Admin, fai clic su **menu sezione** nell'angolo in alto a sinistra (il nome della sezione corrente con la piccola freccia accanto) e scegli **Mobile**. Nella barra di navigazione, seleziona **B1 CheckIn**, quindi fai clic sul pulsante **Progetta Etichette** sulla scheda Etichette Check-in. Vedrai un elenco dei modelli di etichette salvati, separati per tipo: **Targhetta** e **Slip di Ritiro**.

## Tipi di Etichette

- **Targhetta** — stampata e allegata al bambino. In genere include il nome del bambino, la loro classe/sessione e un codice di sicurezza.
- **Slip di Ritiro** — dato al genitore o tutore. In genere include il codice di sicurezza e un elenco dei bambini che ha controllato.

B1 ti inizia con un modello targhetta predefinito e uno slip di ritiro predefinito dimensionato per etichette termiche standard da 3,5 × 1,1 pollici.

## Creazione di un Modello di Etichetta

1. Fai clic su **Aggiungi Targhetta** o **Aggiungi Slip di Ritiro** (o utilizza il dropdown per scegliere).
2. Un nuovo modello si apre nell'editor di etichette.

### Editor di Etichette

L'editor mostra un'anteprima in scala dell'etichetta alla dimensione configurata. Nel pannello sinistro puoi configurare:

- **Nome** — il nome del modello (solo per tuo riferimento)
- **Tipo di Etichetta** — Targhetta o Slip di Ritiro
- **Larghezza / Altezza** — dimensione dell'etichetta in pollici

### Aggiunta di Blocchi

Un'etichetta è costruita da blocchi — singoli pezzi di contenuto posizionati sulla tela dell'etichetta. Fai clic su **Aggiungi Blocco** per inserire un nuovo blocco e scegli il suo tipo:

- **Campo** — estrae un valore di dati al momento della stampa:
  - `person.displayName` — il nome completo della persona
  - `sessions` — il servizio/classe in cui hanno controllato
  - `securityCode` — il codice di sicurezza di pickup generato casualmente
  - `children` — elenco di bambini (per slip di ritiro)
  - `person.nametagNotes` — eventuali note speciali sul record della persona
  - `campus` — il nome del campus
- **Testo** — testo statico che digiti (per intestazioni, etichette o istruzioni)
- **Codice a Barre** — un codice a barre che codifica il codice di sicurezza

### Posizionamento di Blocchi

Ogni blocco ha campi **X**, **Y**, **Larghezza** e **Altezza** espressi come percentuali della tela dell'etichetta (0–100). Regola questi per posizionare il contenuto con precisione. Puoi anche impostare:

- **Dimensione Font** — dimensione del testo in punti
- **Grassetto** — attiva/disattiva testo in grassetto
- **Allinea** — allineamento del testo a sinistra, centro o destra
- **Condizione** — nascondi facoltativamente il blocco se un campo è vuoto (ad esempio, mostra nametagNotes solo se ha un valore)

### Salvataggio

Fai clic su **Salva** per salvare il modello. Il modello aggiornato verrà utilizzato la prossima volta che le etichette vengono stampate in B1 Checkin.

## Riordinamento di Modelli

Se hai più modelli di targhette o slip di ritiro, B1 Checkin utilizzerà il primo modello nell'elenco per impostazione predefinita. Trascina i modelli per riordinarli.

## Eliminazione di un Modello

Fai clic sull'icona Elimina su qualsiasi riga del modello e conferma. L'eliminazione dell'ultimo modello di un tipo ripristina il modello integrato predefinito.

:::tip
Fai una stampa di test dopo aver modificato un modello per confermare che il layout sia corretto prima del tuo prossimo servizio.
:::

## Articoli Correlati

- [Configurazione Check-In](setup) — configura servizi e gruppi per il check-in
- [Completamento Check-In](check-in) — il flusso di check-in per le famiglie
- [Introduzione a B1 Checkin](../../b1-checkin/getting-started/) — l'app chiosco Checkin

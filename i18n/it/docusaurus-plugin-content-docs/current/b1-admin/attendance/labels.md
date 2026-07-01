---
title: "Progettista etichette check-in"
---

# Progettista etichette check-in

<div class="article-intro">

Il Progettista etichette ti consente di creare e personalizzare i modelli di targhette nominative e buoni di ritiro che vengono stampati quando le famiglie accedono i loro figli. Puoi controllare esattamente quali informazioni vengono visualizzate su ogni etichetta, dove viene posizionata e come appare.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura [Partecipazione](setup) e abilita almeno un orario di servizio con accesso abilitato
- Configura [Check-In](check-in) in modo che le etichette vengano stampate
- Hai bisogno dell'accesso amministrativo alla sezione Partecipazione

</div>

## Apertura del Progettista etichette

In B1 Admin, vai a **Partecipazione** nella barra laterale sinistra e seleziona **Etichette**. Vedrai un elenco dei tuoi modelli di etichette salvati, separati per tipo: **Targhetta nominativa** e **Buono di ritiro**.

## Tipi di etichette

- **Targhetta nominativa** — stampata e applicata al bambino. Tipicamente include il nome del bambino, la sua classe/sessione e un codice di sicurezza.
- **Buono di ritiro** — consegnato al genitore o tutore. Tipicamente include il codice di sicurezza e un elenco dei bambini che hanno effettuato l'accesso.

B1 ti inizia con una targhetta nominativa predefinita e un modello di buono di ritiro predefinito dimensionato per etichette termiche standard di 3,5 × 1,1 pollici.

## Creazione di un modello di etichetta

1. Fai clic su **Aggiungi targhetta nominativa** o **Aggiungi buono di ritiro** (o usa il menu a discesa per scegliere).
2. Un nuovo modello si apre nell'editor delle etichette.

### Editor etichette

L'editor mostra un'anteprima in scala dell'etichetta alla dimensione configurata. Nel pannello sinistro puoi configurare:

- **Nome** — il nome del modello (solo per tuo riferimento)
- **Tipo di etichetta** — Targhetta nominativa o Buono di ritiro
- **Larghezza / Altezza** — dimensione dell'etichetta in pollici

### Aggiunta di blocchi

Un'etichetta è costruita da blocchi — singoli pezzi di contenuto posizionati sul canvas dell'etichetta. Fai clic su **Aggiungi blocco** per inserire un nuovo blocco e scegli il suo tipo:

- **Campo** — estrae un valore dati al momento della stampa:
  - `person.displayName` — il nome completo della persona
  - `sessions` — il servizio/classe a cui hanno effettuato l'accesso
  - `securityCode` — il codice di sicurezza per il ritiro generato casualmente
  - `children` — elenco dei bambini (per i buoni di ritiro)
  - `person.nametagNotes` — qualsiasi nota speciale sul record della persona
  - `campus` — il nome del campus
- **Testo** — testo statico che digiti (per intestazioni, etichette o istruzioni)
- **Codice a barre** — un codice a barre che codifica il codice di sicurezza

### Posizionamento dei blocchi

Ogni blocco ha i campi **X**, **Y**, **Larghezza** e **Altezza** espressi come percentuali del canvas dell'etichetta (0–100). Regolali per posizionare il contenuto con precisione. Puoi anche impostare:

- **Dimensione del carattere** — dimensione del testo in punti
- **Grassetto** — attiva/disattiva il testo in grassetto
- **Allineamento** — allineamento del testo a sinistra, al centro o a destra
- **Condizione** — nascondi facoltativamente il blocco se un campo è vuoto (ad esempio, mostra solo nametagNotes se ha un valore)

### Salvataggio

Fai clic su **Salva** per salvare il modello. Il modello aggiornato verrà utilizzato la prossima volta che le etichette vengono stampate in B1 Checkin.

## Riordino dei modelli

Se hai più modelli di targhette nominative o buoni di ritiro, B1 Checkin utilizzerà il primo modello nell'elenco per impostazione predefinita. Trascina i modelli per riordinarli.

## Eliminazione di un modello

Fai clic sull'icona di eliminazione su una riga del modello e conferma. L'eliminazione dell'ultimo modello di un tipo ripristina il modello incorporato predefinito.

:::tip
Esegui una stampa di prova dopo aver modificato un modello per confermare che il layout appare corretto prima del tuo prossimo servizio.
:::

## Articoli correlati

- [Configurazione check-in](setup) — configura servizi e gruppi per il check-in
- [Completamento check-in](check-in) — il flusso di check-in per le famiglie
- [Guida introduttiva a B1 Checkin](../../b1-checkin/getting-started/) — l'app Checkin kiosk

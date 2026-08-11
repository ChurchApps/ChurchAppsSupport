---
title: "Progettazione etichette Check-In"
---

# Progettazione etichette Check-In

<div class="article-intro">

Il Label Designer ti permette di creare e personalizzare i template di tag con i nomi e le ricevute di prelievo che vengono stampati quando le famiglie fanno il check-in dei loro figli. Puoi controllare esattamente quali informazioni appaiono su ogni etichetta, dove viene posizionata e come appare.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura [Presenze](setup) e configura almeno un ora di servizio con check-in abilitato
- Configura [Check-In](check-in) in modo che le etichette vengono stampate
- Hai bisogno di accesso amministrativo alla sezione Presenze

</div>

## Apertura del Label Designer

In B1 Admin, fai clic sul **menu sezione** nell'angolo in alto a sinistra (il nome della sezione corrente con la piccola freccia accanto) e scegli **Mobile**. Nella barra di navigazione, seleziona **B1 CheckIn**, quindi fai clic sul pulsante **Progetta etichette** sulla scheda Etichette Check-In. Vedrai un elenco dei tuoi template di etichette salvati, separati per tipo: **Tag con il nome** e **Ricevuta di prelievo**.

## Tipi di etichette

- **Tag con il nome** — stampato e attaccato al bambino. In genere include il nome del bambino, la sua classe/sessione e un codice di sicurezza.
- **Ricevuta di prelievo** — data al genitore o tutore. In genere include il codice di sicurezza e un elenco dei figli per cui hanno fatto il check-in.

B1 ti inizia con un template di tag con il nome predefinito e un template di ricevuta di prelievo predefinito dimensionato per etichette termiche standard di 3,5 × 1,1 pollici.

## Creazione di un template di etichetta

1. Fai clic su **Aggiungi tag con il nome** o **Aggiungi ricevuta di prelievo** (oppure usa il dropdown per scegliere).
2. Un nuovo template si apre nell'editor di etichette.

### Editor di etichette

L'editor mostra un'anteprima in scala dell'etichetta alla dimensione configurata. Nel pannello sinistro puoi configurare:

- **Nome** — il nome del template (solo per tuo riferimento)
- **Tipo di etichetta** — Tag con il nome o Ricevuta di prelievo
- **Larghezza / Altezza** — dimensione dell'etichetta in pollici

### Aggiunta di blocchi

Un'etichetta è costruita da blocchi — singoli pezzi di contenuto posizionati sulla tela dell'etichetta. Fai clic su **Aggiungi blocco** per inserire un nuovo blocco e scegli il suo tipo:

- **Campo** — estrae un valore dati al momento della stampa:
  - `person.displayName` — il nome completo della persona
  - `sessions` — il servizio/la classe in cui hanno fatto il check-in
  - `securityCode` — il codice di sicurezza di prelievo generato casualmente
  - `children` — elenco dei bambini (per le ricevute di prelievo)
  - `person.nametagNotes` — eventuali note speciali nel record della persona
  - `campus` — il nome del campus
- **Testo** — testo statico che digiti (per intestazioni, etichette o istruzioni)
- **Codice a barre** — un codice a barre che codifica il codice di sicurezza

### Posizionamento dei blocchi

Ogni blocco ha campi **X**, **Y**, **Larghezza** e **Altezza** espressi come percentuali della tela dell'etichetta (0–100). Regola questi per posizionare il contenuto con precisione. Puoi anche impostare:

- **Dimensione del carattere** — dimensione del testo in punti
- **Grassetto** — attiva/disattiva testo in grassetto
- **Allineamento** — allineamento del testo a sinistra, centro o destra
- **Condizione** — facoltativamente nascondi il blocco se un campo è vuoto (ad esempio, mostra solo nametagNotes se ha un valore)

### Salvataggio

Fai clic su **Salva** per salvare il template. Il template aggiornato verrà utilizzato la prossima volta che le etichette vengono stampate in B1 Checkin.

## Riordinamento dei template

Se hai più template di tag con il nome o ricevute di prelievo, B1 Checkin utilizzerà per impostazione predefinita il primo template dell'elenco. Trascina i template per riordinarli.

## Eliminazione di un template

Fai clic sull'icona di eliminazione su qualsiasi riga di template e conferma. L'eliminazione dell'ultimo template di un tipo ripristina il template predefinito integrato.

:::tip
Fai una stampa di prova dopo aver modificato un template per confermare che il layout appaia corretto prima del prossimo servizio.
:::

## Articoli correlati

- [Impostazione Check-In](setup) — configura servizi e gruppi per il check-in
- [Completamento del Check-In](check-in) — il flusso di check-in per le famiglie
- [B1 Checkin Guida introduttiva](../../b1-checkin/getting-started/) — l'app chiosco Checkin

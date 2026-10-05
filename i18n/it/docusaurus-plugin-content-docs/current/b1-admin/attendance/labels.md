---
title: "Editor delle etichette per il Check-In"
---

# Editor delle etichette per il Check-In

<div class="article-intro">

L'editor delle etichette vi consente di creare e personalizzare i modelli di targhetta con il nome e il foglio di ritiro che stampano quando le famiglie fanno il check-in dei loro bambini. Potete controllare esattamente quali informazioni appaiono su ogni etichetta, dove è posizionata, e come appare.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configurate [Presenze](setup) e configurate almeno un orario di servizio con check-in abilitato
- Configurate [Check-In](check-in) in modo che le etichette stampino
- Avete bisogno di accesso amministrativo alla sezione Presenze

</div>

## Apertura dell'editor delle etichette

In B1 Admin, aprite il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandete **Mobile**, e fate clic su **B1 CheckIn**. Quindi fate clic sul pulsante **Progetta etichette** sulla scheda Etichette di check-in. Vedrete un elenco dei vostri modelli di etichette salvati, separati per tipo: **Targhetta con il nome** e **Foglio di ritiro**.

## Tipi di etichette

- **Targhetta con il nome** — stampata e attaccata al bambino. In genere include il nome del bambino, la sua aula/sessione, e un codice di sicurezza.
- **Foglio di ritiro** — dato al genitore o tutore. In genere include il codice di sicurezza e un elenco dei bambini di cui hanno fatto il check-in.

B1 vi inizia con un modello di targhetta con il nome predefinito e un modello di foglio di ritiro predefinito dimensionato per etichette termiche standard di 3,5 x 1,1 pollici.

## Creazione di un modello di etichetta

1. Fate clic su **Aggiungi** e scegliete un punto di partenza dal menu: **Targhetta con il nome 3,5" x 1,1"**, **Foglio di ritiro 3,5" x 1,1"**, oppure **Vuoto**.
2. Un nuovo modello si apre nell'editor di etichette.

### Editor di etichette

L'editor mostra un'anteprima in scala dell'etichetta nelle dimensioni configurate. Nel pannello sinistro potete configurare:

- **Nome** — il nome del modello (solo per vostra riferimento)
- **Tipo di etichetta** — Targhetta con il nome o Foglio di ritiro
- **Larghezza / Altezza** — dimensione dell'etichetta in pollici

### Aggiunta di blocchi

Un'etichetta è costruita da blocchi -- singoli pezzi di contenuto posizionati sul tela dell'etichetta. Fate clic su **Aggiungi blocco** per inserire un nuovo blocco e scegliete il suo tipo:

- **Campo** — estrae un valore di dati al momento della stampa:
  - `person.displayName` — il nome completo della persona
  - `sessions` — il servizio/aula in cui hanno fatto il check-in
  - `securityCode` — il codice di sicurezza di ritiro generato casualmente
  - `children` — elenco dei bambini (per i fogli di ritiro)
  - `person.nametagNotes` — note speciali sul record della persona
  - `person.isBirthdayWeek` — vero se il compleanno della persona (mese e giorno) è entro 3 giorni prima o dopo la data di check-in
  - `campus` — il nome del campus
- **Testo** — testo statico che digitate (per intestazioni, etichette, o istruzioni)
- **Codice a barre** — un codice a barre che codifica il codice di sicurezza

### Posizionamento dei blocchi

Ogni blocco ha campi **X**, **Y**, **Larghezza**, e **Altezza** espressi come percentuali della tela dell'etichetta (0-100). Regolate questi per posizionare il contenuto con precisione. Potete anche impostare:

- **Dimensione carattere** — dimensione del testo in punti
- **Grassetto** — commuta il testo in grassetto
- **Allineamento** — allineamento del testo a sinistra, al centro, o a destra
- **Condizione** — opzionalmente nascondere il blocco se un campo è vuoto (ad esempio, mostra solo nametagNotes se ha un valore). Questo funziona anche con `person.isBirthdayWeek` per mostrare un grafico di compleanno o testo solo su targhette per i bambini il cui compleanno è entro pochi giorni dal check-in.

### Salvataggio

Fate clic su **Salva** per salvare il modello. Il modello aggiornato verrà utilizzato la prossima volta che le etichette vengono stampate in B1 Checkin.

## Riordinamento dei modelli

Se avete più modelli di targhetta con il nome o foglio di ritiro, B1 Checkin utilizzerà il primo modello nell'elenco per impostazione predefinita. Trascinate i modelli per riordinarli.

## Eliminazione di un modello

Fate clic sull'icona di eliminazione su qualsiasi riga di modello e confermate. L'eliminazione dell'ultimo modello di un tipo ripristina il modello incorporato predefinito.

:::tip
Eseguite una stampa di prova dopo la modifica di un modello per confermare che il layout appare corretto prima del vostro prossimo servizio.
:::

## Articoli correlati

- [Configurazione del Check-In](setup) — configurate servizi e gruppi per il check-in
- [Completamento del Check-In](check-in) — il flusso di check-in per le famiglie
- [Guida introduttiva di B1 Checkin](../../b1-checkin/getting-started/) — l'app chiosco Checkin

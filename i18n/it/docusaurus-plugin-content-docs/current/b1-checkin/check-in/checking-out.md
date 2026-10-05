---
title: "Check-out e Sicurezza dei Bambini"
---

# Check-out e Sicurezza dei Bambini

<div class="article-intro">

Il check-out chiude il ciclo sul check-in dei bambini: un genitore presenta il codice di sicurezza dalla sua etichetta di ritiro, il chiosco verifica chi sta ritirando, e i bambini vengono sottoposti a check-out. Le stazioni gestite da persone ottengono anche strumenti di sicurezza -- verifica del ritiro affidabile, messaggi di avviso genitore, ristampe di etichette di sicurezza e un broadcast di emergenza.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Il check-out è disponibile su stazioni impostate su modalità **manned** nelle impostazioni di amministrazione del chiosco
- I bambini devono essere stati [controllati](./completing-checkin) con un'etichetta di ritiro stampata che riporta il codice di sicurezza
- L'avviso e i broadcast di emergenza richiedono che la tua chiesa abbia un fornitore di SMS collegato in B1 Admin

</div>

## Inizio di un Check-Out

1. Su una stazione gestita, tocca **Check Out** nella schermata di ricerca.
2. Inserisci il **codice di sicurezza** di 4 caratteri dall'etichetta di ritiro della famiglia. Puoi digitarlo, usare il tastierino sullo schermo o scansionare il codice a barre dell'etichetta con uno scanner USB o Bluetooth -- il codice viene inviato automaticamente una volta inseriti tutti e 4 i caratteri.
   - Nessuno scanner? Tocca **Scansiona** sotto il campo del codice per usare la fotocamera del tablet. Tieni il codice QR o il codice a barre dell'etichetta di ritiro davanti alla fotocamera nella finestra **Scansiona codice di ritiro** e il codice viene inserito per te. Per impostazione predefinita viene utilizzata la fotocamera posteriore; tocca il pulsante di capovolgimento per cambiare fotocamere, o tocca **Annulla** per tornare alla digitazione.
3. Il chiosco mostra i bambini controllati sotto quel codice.

## Verifica di Chi Sta Ritirando

La schermata di check-out chiede chi sta ritirando i bambini:

- Le **persone di ritiro affidabili** per la famiglia compaiono come schede toccabili con la loro foto e relazione -- tocca la persona in piedi davanti a te.
- Gli **adulti della famiglia** compaiono anche in una griglia foto.
- **Altro** ti permette di digitare un nome per qualcuno non nell'elenco.

Se un nome digitato corrisponde a qualcuno contrassegnato come **Non Autorizzato** per quella famiglia, il chiosco blocca il check-out con un avviso. Un membro dello staff può scegliere **Ignora** per procedere comunque -- l'ignoranza viene registrata nel record di frequenza con il nome della persona.

Una volta confermato il ritiratario, tocca il check-out. Il nome della persona che ritira viene memorizzato nel record di frequenza.

:::info
Le persone di ritiro affidabili e non autorizzate vengono gestite dal personale della chiesa nella pagina di ogni persona in B1 Admin -- vedi [Sicurezza Check-In](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Avviso di un Genitore

Hai bisogno di un genitore durante il servizio -- un cambio di pannolino, un bambino che piange? Dalla schermata di check-out su una stazione gestita, il personale può inviare un **avviso**: un messaggio di testo ai genitori o ai tutori del bambino attraverso il fornitore di SMS della chiesa. I genitori che hanno rinunciato ai messaggi di testo o non hanno un numero mobile vengono saltati, e il chiosco mostra quanti messaggi sono stati inviati.

## Ristampa di Etichette

Se un cartellino dei nomi o un'etichetta di ritiro è perso o danneggiato, il personale su una stazione gestita può **ristampare** le etichette della famiglia dalla schermata di check-out dopo aver inserito il codice di sicurezza. La ristampa utilizza la stessa stampante e i modelli di etichetta del check-in originale.

## Broadcast di Emergenza

In un'emergenza, il personale può inviare un messaggio ai tutori di **ogni bambino controllato** per il servizio attuale in una volta:

1. Apri le **impostazioni di amministrazione** del chiosco (7 tocchi rapidi sul logo dell'intestazione, più il PIN se ne è stato impostato).
2. Tocca **Broadcast di emergenza**.
3. Inserisci il messaggio, quindi digita **EMERGENZA** nel campo di conferma -- il pulsante **Invia broadcast** rimane disabilitato finché non lo fai.
4. Il chiosco segnala quanti telefoni hanno ricevuto il messaggio e quante persone sono state saltate (hanno rinunciato o non hanno un numero mobile).

:::warning
Il broadcast va a ogni famiglia controllata per il servizio selezionato. Usalo per vere emergenze -- evacuazioni, blocchi, tempo severo.
:::

## Articoli Correlati

- [Completamento del Check-In](./completing-checkin) -- da dove provengono i codici di sicurezza e le etichette di ritiro
- [Sicurezza Check-In](../../b1-admin/attendance/checkin-safety) -- configurazione di capacità, rapporti, persone di ritiro e il requisito del fornitore di SMS
- [Configurazione Stampante](../getting-started/printer-setup) -- configurazione della stampante di etichette

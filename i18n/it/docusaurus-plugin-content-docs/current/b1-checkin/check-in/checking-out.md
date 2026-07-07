---
title: "Check-out e sicurezza dei bambini"
---

# Check-out e sicurezza dei bambini

<div class="article-intro">

Il check-out chiude il ciclo di accoglienza dei bambini in B1 Checkin: un genitore presenta il codice di sicurezza dalla sua etichetta di prelievo, il chiosco verifica chi sta prelevando i bambini, e i bambini vengono registrati in uscita. Le stazioni presidiate dispongono anche di strumenti di sicurezza — verifica del prelievo autorizzato, messaggi di avviso ai genitori, ristampa delle etichette di sicurezza e un avviso di emergenza broadcast.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Il check-out è disponibile sulle stazioni impostate in modalità **manned** nelle impostazioni di amministrazione del chiosco
- I bambini devono essere stati [registrati in ingresso](./completing-checkin) con un'etichetta di prelievo stampata recante il codice di sicurezza
- L'avviso e i messaggi di emergenza richiedono che la vostra chiesa abbia un provider di messaggistica connesso in B1 Admin

</div>

## Avvio di un Check-Out

1. Su una stazione presidiate, tocca **Check Out** sulla schermata di ricerca.
2. Inserisci il **codice di sicurezza** a 4 caratteri dall'etichetta di prelievo della famiglia. Puoi digitarlo, usare la tastiera sullo schermo, oppure scansionare il codice a barre dell'etichetta con uno scanner USB o Bluetooth — il codice viene inviato automaticamente una volta inseriti tutti e 4 i caratteri.
3. Il chiosco mostra i bambini registrati con quel codice.

## Verifica di chi sta prelevando

La schermata di check-out chiede chi sta prelevando i bambini:

- **Le persone autorizzate al prelievo** del nucleo familiare appaiono come schede toccabili con la loro foto e relazione — tocca la persona che hai di fronte.
- **Gli adulti del nucleo familiare** appaiono anche in una griglia di foto.
- **Altro** ti permette di digitare un nome per qualcuno non in elenco.

Se un nome digitato corrisponde a qualcuno contrassegnato come **Non autorizzato** per quel nucleo familiare, il chiosco blocca il check-out con un avviso. Un membro dello staff può scegliere **Override** per procedere comunque — l'override viene registrato nel record di partecipazione con il nome della persona.

Una volta confermato il prelevatore, tocca check-out. Il nome della persona che preleva è memorizzato nel record di partecipazione.

:::info
Le persone autorizzate e non autorizzate al prelievo sono gestite dallo staff della chiesa nella pagina di ogni persona in B1 Admin — vedi [Sicurezza del Check-In](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Avviso a un genitore

Hai bisogno di un genitore durante il servizio — un cambio di pannolino, un bambino che piange? Dalla schermata di check-out su una stazione presidiate, lo staff può inviare un **avviso**: un messaggio di testo ai genitori o tutori del bambino tramite il provider di messaggistica della chiesa. I genitori che hanno rinunciato ai messaggi o che non hanno un numero mobile vengono saltati, e il chiosco mostra quanti messaggi sono stati inviati.

## Ristampa delle etichette

Se un'etichetta con il nome o un'etichetta di prelievo viene smarrita o danneggiata, lo staff su una stazione presidiate può **ristampare** le etichette della famiglia dalla schermata di check-out dopo aver inserito il codice di sicurezza. La ristampa utilizza la stessa stampante e gli stessi modelli di etichette dell'accoglienza originale.

## Avviso di emergenza

In caso di emergenza, lo staff può inviare un messaggio di testo ai tutori di **ogni bambino registrato** per il servizio corrente in una sola volta:

1. Apri le **impostazioni di amministrazione** del chiosco (7 tocchi rapidi sul logo dell'intestazione, più il PIN se ne è stato impostato uno).
2. Tocca **Avviso di emergenza**.
3. Inserisci il messaggio, quindi digita **EMERGENCY** nel campo di conferma — il pulsante **Invia avviso** rimane disabilitato fino a quando non lo fai.
4. Il chiosco mostra quanti telefoni hanno ricevuto il messaggio e quante persone sono state saltate (hanno rinunciato o non hanno un numero mobile).

:::warning
L'avviso viene inviato a ogni nucleo familiare registrato per il servizio selezionato. Usalo per vere emergenze — evacuazioni, blocchi, condizioni meteorologiche severe.
:::

## Articoli correlati

- [Completamento Check-In](./completing-checkin) — da dove provengono i codici di sicurezza e le etichette di prelievo
- [Sicurezza del Check-In](../../b1-admin/attendance/checkin-safety) — configurazione di capacità, rapporti, persone di prelievo e il requisito del provider di messaggistica
- [Configurazione della stampante](../getting-started/printer-setup) — configurazione della stampante di etichette

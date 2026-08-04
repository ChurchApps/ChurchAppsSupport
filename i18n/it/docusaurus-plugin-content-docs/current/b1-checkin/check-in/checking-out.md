---
title: "Check-Out e Sicurezza dei Bambini"
---

# Check-Out e Sicurezza dei Bambini

<div class="article-intro">

Il check-out chiude il ciclo del check-in dei bambini: un genitore presenta il codice di sicurezza della propria etichetta di ritiro, il chiosco verifica chi sta effettuando il ritiro e i bambini vengono registrati in uscita. Le postazioni presidiate ottengono anche strumenti di sicurezza -- verifica del ritiro autorizzato, messaggi di chiamata ai genitori, ristampa delle etichette di sicurezza e una trasmissione di emergenza.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Il check-out è disponibile sulle postazioni impostate in modalità **manned** (presidiata) nelle impostazioni amministrative del chiosco
- I bambini devono essere stati [registrati in entrata](./completing-checkin) con un'etichetta di ritiro stampata che riporta il codice di sicurezza
- Le chiamate e le trasmissioni di emergenza richiedono che la tua chiesa abbia un provider di messaggistica connesso in B1 Admin

</div>

## Avviare un Check-Out

1. Su una postazione presidiata, tocca **Check Out** nella schermata di ricerca.
2. Inserisci il **codice di sicurezza** a 4 caratteri dall'etichetta di ritiro della famiglia. Puoi digitarlo, usare il tastierino a schermo, oppure scansionare il codice a barre dell'etichetta con uno scanner USB o Bluetooth -- il codice viene inviato automaticamente una volta inseriti tutti e 4 i caratteri.
3. Il chiosco mostra i bambini registrati con quel codice.

## Verificare Chi Sta Effettuando il Ritiro

La schermata di check-out chiede chi sta ritirando i bambini:

- Le **persone autorizzate al ritiro** per il nucleo familiare appaiono come schede selezionabili con la loro foto e relazione -- tocca la persona che hai davanti.
- Gli **adulti del nucleo familiare** appaiono anch'essi in una griglia di foto.
- **Other** ti permette di digitare un nome per qualcuno non presente nell'elenco.

Se un nome digitato corrisponde a qualcuno contrassegnato come **Not Authorized** per quel nucleo familiare, il chiosco blocca il check-out con un avviso. Un membro dello staff può scegliere **Override** per procedere comunque -- la forzatura viene registrata nella scheda di presenza con il nome della persona.

Una volta confermata la persona che effettua il ritiro, tocca check out. Il nome della persona che ritira viene memorizzato con la scheda di presenza.

:::info
Le persone autorizzate e non autorizzate al ritiro sono gestite dallo staff della chiesa sulla pagina di ciascuna persona in B1 Admin -- vedi [Sicurezza del Check-In](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Chiamare un Genitore

Hai bisogno di un genitore durante il servizio -- un cambio pannolino, un bambino che piange? Dalla schermata di check-out su una postazione presidiata, lo staff può inviare una **chiamata**: un messaggio di testo ai genitori o ai tutori del bambino tramite il provider di messaggistica della chiesa. I genitori che hanno rifiutato i messaggi di testo o non hanno un numero di cellulare vengono saltati, e il chiosco mostra quanti messaggi sono stati inviati.

## Ristampa delle Etichette

Se un cartellino identificativo o un'etichetta di ritiro viene smarrita o danneggiata, lo staff su una postazione presidiata può **ristampare** le etichette della famiglia dalla schermata di check-out dopo aver inserito il codice di sicurezza. La ristampa utilizza la stessa stampante e gli stessi modelli di etichetta del check-in originale.

## Trasmissione di Emergenza

In caso di emergenza, lo staff può inviare un messaggio di testo ai tutori di **ogni bambino registrato** per il servizio corrente contemporaneamente:

1. Apri le **impostazioni amministrative** del chiosco (7 tocchi rapidi sul logo dell'intestazione, più il PIN se ne è impostato uno).
2. Tocca **Emergency broadcast**.
3. Inserisci il messaggio, poi digita **EMERGENCY** nel campo di conferma -- il pulsante **Send broadcast** rimane disabilitato finché non lo fai.
4. Il chiosco riporta quanti telefoni hanno ricevuto il messaggio e quante persone sono state saltate (per rifiuto dei messaggi o assenza di numero di cellulare).

:::warning
La trasmissione viene inviata a ogni nucleo familiare registrato per il servizio selezionato. Utilizzala per vere emergenze -- evacuazioni, blocchi di sicurezza, maltempo grave.
:::

## Articoli Correlati

- [Completare il Check-In](./completing-checkin) — da dove provengono i codici di sicurezza e le etichette di ritiro
- [Sicurezza del Check-In](../../b1-admin/attendance/checkin-safety) — configurare capienze, rapporti, persone autorizzate al ritiro e il requisito del provider di messaggistica
- [Configurazione della Stampante](../getting-started/printer-setup) — configurazione della stampante di etichette

---
title: "Ritiro e Sicurezza dei Bambini"
---

# Ritiro e Sicurezza dei Bambini

<div class="article-intro">

Il ritiro chiude il ciclo di check-in dei bambini: un genitore presenta il codice di sicurezza dalla sua etichetta di ritiro, il chiosco verifica chi sta ritirando e i bambini vengono ritirati. Le stazioni sorvegliate ottengono anche strumenti di sicurezza — verifica del ritiro di fiducia, testi di pagina di un genitore, ristampe di etichette di sicurezza e un trasmesso di emergenza.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Il ritiro è disponibile sulle stazioni impostate su modalità **manned** nelle impostazioni admin del chiosco
- I bambini devono essere stati [controllati in](./completing-checkin) con un'etichetta di ritiro stampata che porti il codice di sicurezza
- Il paging e i trasmessi di emergenza richiedono che la tua chiesa abbia un provider di messaggistica di testo connesso in B1 Admin

</div>

## Inizio di un Ritiro

1. Su una stazione controllata, tocca **Check Out** sulla schermata di ricerca.
2. Immetti il **codice di sicurezza** di 4 caratteri dall'etichetta di ritiro della famiglia. Puoi digitarlo, usare il tastierino sullo schermo o scansionare il codice a barre dell'etichetta con uno scanner USB o Bluetooth — il codice viene inviato automaticamente una volta che vengono inseriti tutti i 4 caratteri.
3. Il chiosco mostra i bambini controllati sotto quel codice.

## Verifica di Chi Sta Ritirando

La schermata di ritiro chiede chi sta ritirando i bambini:

- Le **persone di ritiro di fiducia** per la famiglia appaiono come schede toccabili con la loro foto e relazione — tocca la persona in piedi di fronte a te.
- Appaiono anche gli **adulti della famiglia** in una griglia di foto.
- **Other** ti permette di digitare un nome per qualcuno non sull'elenco.

Se un nome digitato corrisponde a qualcuno contrassegnato come **Not Authorized** per quella famiglia, il chiosco blocca il ritiro con un avvertimento. Un membro dello staff può scegliere **Override** per procedere comunque — l'override viene registrato nel record di partecipazione con il nome della persona.

Una volta confermato il ritiratore, tocca il ritiro. Il nome della persona che ritira viene archiviato con il record di partecipazione.

:::info
Le persone di ritiro di fiducia e non autorizzate vengono gestite dallo staff della chiesa nella pagina di ogni persona in B1 Admin — vedi [Check-In Safety](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Paging di un Genitore

Hai bisogno di un genitore durante il servizio — un cambio di pannolino, un bambino che piange? Dalla schermata di ritiro su una stazione controllata, lo staff può inviare una **page**: un messaggio di testo al genitore o ai tutori del bambino tramite il provider di messaggistica di testo della chiesa. I genitori che hanno optato per escludersi dai testi o che non hanno un numero mobile vengono saltati e il chiosco mostra quanti messaggi sono stati inviati.

## Ristampa di Etichette

Se un adesivo di nome o un'etichetta di ritiro vengono persi o danneggiati, lo staff su una stazione controllata può **ristampare** le etichette della famiglia dalla schermata di ritiro dopo aver inserito il codice di sicurezza. La ristampa utilizza la stessa stampante e i modelli di etichetta del check-in originale.

## Trasmesso di Emergenza

In un'emergenza, lo staff può inviare un messaggio di testo ai tutori di **ogni bambino controllato** per il servizio corrente contemporaneamente:

1. Apri le **impostazioni admin** del chiosco (7 tocchi rapidi sull'intestazione logo, più il PIN se ne è impostato uno).
2. Tocca **Emergency broadcast**.
3. Immetti il messaggio, quindi digita **EMERGENCY** nel campo di conferma — il pulsante **Send broadcast** rimane disabilitato finché non lo fai.
4. Il chiosco riporta quanti telefoni hanno ricevuto il messaggio e quante persone sono state saltate (optato o nessun numero mobile).

:::warning
Il trasmesso va a ogni famiglia controllata per il servizio selezionato. Usalo per emergenze genuine — evacuazioni, blocchi, maltempo grave.
:::

## Articoli Correlati

- [Completamento del Check-In](./completing-checkin) — da dove provengono i codici di sicurezza e le etichette di ritiro
- [Check-In Safety](../../b1-admin/attendance/checkin-safety) — configurazione di capacità, rapporti, persone di ritiro e il requisito del provider di messaggistica di testo
- [Configurazione della Stampante](../getting-started/printer-setup) — configurazione della stampante di etichette

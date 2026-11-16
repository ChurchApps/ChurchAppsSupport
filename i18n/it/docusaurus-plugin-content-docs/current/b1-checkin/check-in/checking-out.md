---
title: "Check-out e Sicurezza dei Bambini"
description: "Registra l'uscita dei bambini a una postazione B1 Checkin presidiata con codici di sicurezza, ritiro verificato, avvisi ai genitori, ristampa delle etichette ed emergenze."
---

# Check-out e Sicurezza dei Bambini {#checking-out--child-safety}

<div class="article-intro">

Il check-out chiude il ciclo del check-in dei bambini: un genitore presenta il codice di sicurezza dalla sua etichetta di ritiro, il chiosco verifica chi sta ritirando, e i bambini vengono sottoposti a check-out. Le postazioni presidiate ottengono anche strumenti di sicurezza — verifica del ritiro affidabile, messaggi di avviso ai genitori, ristampe di etichette di sicurezza e un broadcast di emergenza.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Il check-out è disponibile sulle postazioni impostate in modalità **manned** nelle impostazioni di amministrazione del chiosco
- I bambini devono essere stati [controllati](./completing-checkin.md) con un'etichetta di ritiro stampata che riporta il codice di sicurezza
- Avvisi e broadcast di emergenza richiedono che la tua chiesa abbia un fornitore di SMS collegato in B1 Admin

</div>

## Inizio di un Check-Out {#starting-a-check-out}

1. Su una postazione presidiata, tocca **Check Out** nella schermata di ricerca.
2. Inserisci il **codice di sicurezza** di 4 caratteri dall'etichetta di ritiro della famiglia. Puoi digitarlo, usare il tastierino sullo schermo o scansionare il codice a barre dell'etichetta con uno scanner USB o Bluetooth — il codice viene inviato automaticamente una volta inseriti tutti e 4 i caratteri.
   - Non hai uno scanner? Tocca **Scansiona** sotto il campo del codice per usare la fotocamera del tablet. Tieni il codice QR o il codice a barre dell'etichetta di ritiro davanti alla fotocamera nella finestra **Scansiona codice di ritiro** e il codice viene inserito per te. Per impostazione predefinita viene usata la fotocamera posteriore; tocca il pulsante di inversione per cambiare fotocamera, oppure tocca **Annulla** per tornare alla digitazione.
3. Il chiosco mostra i bambini controllati sotto quel codice.

### Trovare una Famiglia senza il Codice {#finding-a-family-without-the-code}

Se il genitore ha perso l'etichetta di ritiro, cerca la famiglia tramite il nome:

1. Nella schermata **Check Out**, tocca **Cerca per nome** (accanto a **Scansiona**).
2. Digita il cognome della famiglia e tocca **Cerca**, oppure tocca **Usa numero di telefono** per inserire un numero di telefono (almeno le ultime 4 cifre) dal tastierino.
3. Tocca la persona nei risultati. Il chiosco trova tutti i membri di quel nucleo familiare che sono controllati oggi e non ancora sottoposti a check-out, e li mostra esattamente come se fosse stato inserito il codice.

Se nessuno del nucleo familiare è controllato, il chiosco mostra "Nessuno in questo nucleo familiare è controllato al momento." Tocca **Nuova ricerca** per cercare di nuovo, oppure **Inserisci il codice** per tornare al campo del codice.

Il controllo del ritiro descritto di seguito si applica comunque: vengono elencate le persone di ritiro affidabili e gli adulti del nucleo familiare, e i nomi non autorizzati continuano a essere bloccati.

## Verifica di Chi Sta Ritirando {#verifying-who-is-picking-up}

La schermata di check-out chiede chi sta ritirando i bambini:

- Le **persone di ritiro affidabili** del nucleo familiare compaiono come schede toccabili con la loro foto e la relazione — tocca la persona che ti sta davanti.
- Gli **adulti del nucleo familiare** compaiono anche in una griglia di foto.
- **Altro** ti permette di digitare un nome per qualcuno che non è nell'elenco.

Se un nome digitato corrisponde a qualcuno contrassegnato come **Non Autorizzato** per quel nucleo familiare, il chiosco blocca il check-out con un avviso. Un membro dello staff può scegliere **Ignora** per procedere comunque — la scelta viene registrata nel record di presenza con il nome della persona.

Una volta confermato chi ritira, tocca il pulsante di check-out. Il nome della persona che ritira viene salvato nel record di presenza.

:::info
Le persone di ritiro affidabili e non autorizzate vengono gestite dal personale della chiesa nella pagina di ogni persona in B1 Admin — vedi [Sicurezza Check-In](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Avviso di un Genitore {#paging-a-parent}

Ti serve un genitore durante il culto — un cambio di pannolino, un bambino che piange? Dalla schermata di check-out su una postazione presidiata, il personale può inviare un **avviso**: un messaggio di testo ai genitori o ai tutori del bambino tramite il fornitore di SMS della chiesa. I genitori che hanno rinunciato ai messaggi di testo o non hanno un numero di cellulare vengono saltati, e il chiosco mostra quanti messaggi sono stati inviati.

## Ristampa di Etichette {#reprinting-labels}

Se un cartellino con il nome o un'etichetta di ritiro viene perso o danneggiato, il personale su una postazione presidiata può **ristampare** le etichette della famiglia dalla schermata di check-out dopo aver inserito il codice di sicurezza. La ristampa usa la stessa stampante e gli stessi modelli di etichetta del check-in originale.

## Broadcast di Emergenza {#emergency-broadcast}

In caso di emergenza, il personale può inviare un messaggio ai tutori di **ogni bambino controllato** per il culto attuale in una sola volta:

1. Apri le **impostazioni di amministrazione** del chiosco (7 tocchi rapidi sul logo dell'intestazione, più il PIN se ne è stato impostato).
2. Tocca **Broadcast di emergenza**.
3. Inserisci il messaggio, poi digita **EMERGENCY** nel campo di conferma — il pulsante **Invia broadcast** resta disattivato finché non lo fai.
4. Il chiosco indica quanti telefoni hanno ricevuto il messaggio e quante persone sono state saltate (perché hanno rinunciato o non hanno un numero di cellulare).

:::warning
Il broadcast va a ogni nucleo familiare controllato per il culto selezionato. Usalo solo per vere emergenze — evacuazioni, blocchi, maltempo grave.
:::

## Articoli Correlati {#related-articles}

- [Completamento del Check-In](./completing-checkin.md) — da dove provengono i codici di sicurezza e le etichette di ritiro
- [Sicurezza Check-In](../../b1-admin/attendance/checkin-safety.md) — configurazione di capienze, rapporti, persone di ritiro e requisito del fornitore di SMS
- [Configurazione Stampante](../getting-started/printer-setup.md) — configurazione della stampante delle etichette

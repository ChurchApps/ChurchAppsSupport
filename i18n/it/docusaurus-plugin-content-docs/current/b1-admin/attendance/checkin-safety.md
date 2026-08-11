---
title: "Sicurezza del Check-In"
---

# Sicurezza del Check-In

<div class="article-intro">

B1 include una serie di controlli di sicurezza dei bambini per il check-in: limiti di capacità della stanza e rapporti tra volontari e bambini, guida sull'età e il grado al chiosco, tipi di check-in che distinguono membri, ospiti e volontari, e una lista di prelievo fidata per famiglia che viene verificata al checkout. Questa pagina descrive come configurare ogni funzione di sicurezza in B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura la tua [struttura di presenze](setup.md) e [chioschi di check-in](check-in.md)
- Le stanze sono [gruppi](../groups/creating-groups.md) collegati agli orari di servizio — le impostazioni di sicurezza qui sotto vivono sul gruppo
- Page-a-parent e broadcast di emergenza richiedono un provider di messaggistica connesso ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Capacità della stanza e chiusura di una stanza

Ogni stanza di check-in (gruppo) può applicare i suoi limiti. Apri il gruppo, fai clic sull'**icona della matita** per modificare le sue impostazioni, e trova la sezione **Capacità di check-in**:

- **Capacità** -- Il numero massimo di persone che possono essere registrate in questa stanza in una volta. Quando la stanza è piena, il check-in viene bloccato e il chiosco nomina la stanza piena.
- **Capacità ospiti** -- Un limite separato opzionale su quanti ospiti la stanza può contenere.
- **Chiuso per check-in** -- Impostato a **Sì** per interrompere tutti i check-in in questa stanza immediatamente (ad esempio, quando una classe è cancellata o una stanza non è disponibile). I checkout funzionano comunque.

## Rapporti volontari

La stessa sezione **Capacità di check-in** sul gruppo include regole di staffing:

- **Bambini per volontario** -- Il numero massimo di bambini che ogni volontario registrato può coprire (ad es. 5 significa un volontario ogni cinque bambini).
- **Volontari minimi** -- Il numero più piccolo di volontari che devono essere registrati prima che i bambini possano fare il check-in alla stanza.

I volontari contano verso queste regole quando fanno il check-in con il tipo **Volontario** al chiosco (vedi [Tipi di check-in](#check-in-types) sotto).

### Scelta tra Avviso e Blocco

La rigidità con cui vengono applicati i rapporti è un'impostazione a livello di chiesa:

1. In B1 Admin, vai a **Impostazioni > Gestisci chiesa** e apri il riquadro **Check-In**.
2. Imposta **Applicazione del rapporto volontari**:
   - **Avviso (consenti con conferma)** -- Il chiosco mostra un avviso quando una stanza è oltre il rapporto o al di sotto dei suoi volontari minimi, e un membro dello staff può confermare per procedere comunque. Questo è il valore predefinito.
   - **Blocco (blocca il check-in)** -- Il check-in alla stanza viene rifiutato fino a quando non vengono registrati abbastanza volontari.

:::info
La capacità e la chiusura per check-in sono sempre limiti rigidi — la scelta avviso/blocco si applica solo ai rapporti di volontari.
:::

## Tipi di check-in

Ogni check-in registra se la persona è un **Membro**, **Ospite** o **Volontario**. Il tipo viene scelto con i chip sulla schermata della famiglia del chiosco (Membro è il valore predefinito). I tipi alimentano le regole di sicurezza — i volontari forniscono copertura di rapporto, e gli ospiti contano rispetto alla capacità degli ospiti della stanza.

## Guida sull'età e grado della stanza

Puoi dare a ogni stanza limiti di età o grado in modo che il chiosco guidi le famiglie verso stanze appropriate:

- Sulle impostazioni del gruppo, usa la sezione **Età e grado** per impostare l'età minima/massima (anni e mesi) e/o il grado per la stanza.
- Al chiosco, le stanze per cui un bambino si qualifica sono evidenziate e le stanze per cui non si qualifica sono attenuate. Una stanza attenuata può comunque essere scelta con una conferma dello staff — la guida non blocca mai.

I gradi si rinnovano nella **data di promozione del grado** della tua chiesa:

1. In B1 Admin, vai a **Impostazioni > Gestisci chiesa** e apri il riquadro di promozione del grado.
2. Imposta il mese e il giorno in cui la tua chiesa promuove gli studenti (ad esempio, 1 agosto). Le età e i gradi al chiosco sono calcolati a partire dalla data di promozione più recente.

## Persone di prelievo fidate e non autorizzate

Ogni famiglia può portare un elenco di persone a cui è - o non è - consentito prelevare i suoi figli.

1. Apri la pagina di una persona in **Persone** e trova la scheda **Prelievo**.
2. Fai clic su **Aggiungi**. Cerca una persona esistente, o aggiungi qualcuno non nel sistema inserendo il loro **Nome**, **Relazione** e una foto.
3. Imposta lo **Stato**:
   - **Fidata** -- Al checkout, questa persona appare come una scheda di prelievo toccabile con la loro foto, rendendo il prelievo verificato veloce.
   - **Non autorizzato** -- Se qualcuno tenta il prelievo sotto questo nome, il chiosco blocca il checkout con un avviso. Un membro dello staff può ignorare, e l'override viene registrato nel record di presenze.

Fai clic sul chip di stato di una persona sulla scheda per passare da Fidata a Non autorizzato.

:::tip
Aggiungi foto alle persone di prelievo fidate quando possibile — la schermata di checkout mostra la foto in modo che i volontari possono verificare visivamente la persona di fronte a loro.
:::

## Page-a-Parent e Emergency Broadcast

Entrambe le funzioni inviano messaggi di testo attraverso il provider di messaggistica connesso della tua chiesa — non c'è un servizio SMS integrato, quindi uno dei provider supportati deve essere configurato per primo.

- **Page a parent** -- Da una schermata di checkout presidio del chiosco, lo staff può inviare un SMS ai genitori/tutori di un bambino registrato (ad esempio, "Per favore vieni all'asilo").
- **Emergency broadcast** -- Dalle impostazioni di amministrazione del chiosco, lo staff può inviare un SMS a tutti i tutori della famiglia registrata per il servizio selezionato in una volta. L'invio richiede di digitare **EMERGENCY** per confermare.

Le persone che hanno disabilitato i testi, o che non hanno un numero di cellulare in archivio, vengono saltate automaticamente — il chiosco riporta quanti messaggi sono stati inviati e quanti sono stati saltati.

Vedi la procedura dettagliata dal lato del chiosco in [Check-Out e sicurezza dei bambini](../../b1-checkin/check-in/checking-out).

## Articoli correlati

- [Check-In](check-in.md) — configurazione del chiosco e hardware
- [Check-Out e sicurezza dei bambini](../../b1-checkin/check-in/checking-out) — il checkout del chiosco, la verifica del prelievo e i flussi di paging
- [Creazione di gruppi](../groups/creating-groups.md) — dove vivono le impostazioni della stanza
- [Impostazioni presenze](setup.md) — servizi, orari di servizio e assegnazioni di stanze
- [Età minima per messaggi privati](../settings/mobile-app.md#member-directory--messaging-settings) — blocca le nuove conversazioni di messaggi privati con i bambini mantenendoli nella directory

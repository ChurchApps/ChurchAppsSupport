---
title: "Sicurezza al Check-In"
---

# Sicurezza al Check-In

<div class="article-intro">

B1 include un insieme di controlli di sicurezza per bambini al check-in: limiti di capacità della stanza e rapporti tra volontari e bambini, orientamenti per età e grado al chiosco, tipi di check-in che distinguono i membri, gli ospiti e i volontari, e un elenco di persone di ritiro fidate per nucleo familiare che viene verificato al check-out. Questa pagina illustra come configurare ogni funzione di sicurezza in B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configurare la [struttura di partecipazione](setup.md) e i [chioschi di check-in](check-in.md)
- Le stanze sono [gruppi](../groups/creating-groups.md) collegati agli orari di servizio — le impostazioni di sicurezza di seguito si trovano sul gruppo
- Avvisa un genitore e Broadcast di emergenza richiedono un provider di messaggistica connesso ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) o Mutual Ministry)

</div>

## Capacità della Stanza e Chiusura di una Stanza

Ogni stanza di check-in (gruppo) può applicare i propri limiti. Aprire il gruppo, fare clic sull'**icona della matita** per modificarne le impostazioni e trovare la sezione **Capacità Check-In**:

- **Capacità** -- Il numero massimo di persone che possono essere controllate in questa stanza contemporaneamente. Quando la stanza è piena, il check-in ad essa viene bloccato e il chiosco lo segnala.
- **Capacità Ospiti** -- Un limite opzionale separato su quanti ospiti la stanza può contenere.
- **Chiuso per Check-In** -- Impostare su **Sì** per interrompere immediatamente tutti i check-in in questa stanza (ad esempio, quando una lezione viene annullata o una stanza non è disponibile). I check-out continuano a funzionare.

## Rapporti di Volontari

La stessa sezione **Capacità Check-In** sul gruppo include regole di staffing:

- **Bambini per Volontario** -- Il numero massimo di bambini che ogni volontario controllato può coprire (ad es. 5 significa un volontario ogni cinque bambini).
- **Volontari Minimi** -- Il numero minimo di volontari che devono essere controllati prima che i bambini possano controllare nella stanza.

I volontari contano verso queste regole quando si controllano con il tipo **Volontario** al chiosco (vedi [Tipi di Check-In](#check-in-types) di seguito).

### Scelta tra Avviso e Blocco

La rigorosità con cui vengono applicati i rapporti è un'impostazione a livello di chiesa:

1. In B1 Admin, vai su **Impostazioni > Gestisci Chiesa** e apri il riquadro **Check-In**.
2. Impostare **Applicazione del Rapporto di Volontari**:
   - **Avviso (consenti con conferma)** -- Il chiosco mostra un avviso quando una stanza è fuori rapporto o al di sotto dei suoi volontari minimi, e un membro dello staff può confermare per procedere comunque. Questa è l'impostazione predefinita.
   - **Blocca (previeni il check-in)** -- Il check-in nella stanza viene rifiutato fino a quando non vengono controllati abbastanza volontari.

:::info
La capacità e la chiusura per check-in sono sempre limiti fissi — la scelta avviso/blocco si applica solo ai rapporti di volontari.
:::

## Tipi di Check-In

Ogni check-in registra se la persona è un **Membro**, **Ospite** o **Volontario**. Il tipo viene scelto con i chip sulla schermata del nucleo familiare del chiosco (Membro è l'impostazione predefinita). I tipi alimentano le regole di sicurezza — i volontari forniscono copertura dei rapporti, e gli ospiti contano sulla capacità degli ospiti della stanza.

## Orientamento per Età e Grado della Stanza

Puoi dare a ogni stanza limiti di età o grado in modo che il chiosco guida le famiglie verso stanze appropriate:

- Nelle impostazioni del gruppo, usa la sezione **Età e Grado** per impostare l'età minima/massima (anni e mesi) e/o il grado per la stanza.
- Al chiosco, le stanze per le quali un bambino si qualifica sono evidenziate e le stanze per le quali non si qualificano sono attenuate. Una stanza attenuata può comunque essere scelta con una conferma dello staff — la guida non blocca mai.

I gradi si rinnovano nella **data di promozione di grado** della tua chiesa:

1. In B1 Admin, vai su **Impostazioni > Gestisci Chiesa** e apri il riquadro di promozione di grado.
2. Impostare il mese e il giorno in cui la tua chiesa promuove gli studenti (ad esempio, 1 agosto). Le età e i gradi al chiosco sono calcolati a partire dalla data di promozione più recente.

## Persone di Ritiro Fidate e Non Autorizzate

Ogni nucleo familiare può portare un elenco di persone che sono — o non sono — autorizzate a ritirare i suoi bambini.

1. Aprire la pagina di una persona in **Persone** e trovare il riquadro **Ritiro**.
2. Fare clic su **Aggiungi**. Cercare una persona esistente oppure aggiungere qualcuno non nel sistema inserendo il suo **Nome**, **Relazione** e una foto.
3. Impostare lo **Stato**:
   - **Fidato** -- Al check-out, questa persona appare come una carta di ritiro toccabile con la sua foto, rendendo il ritiro verificato veloce.
   - **Non Autorizzato** -- Se qualcuno tenta il ritiro con questo nome, il chiosco blocca il check-out con un avviso. Un membro dello staff può eseguire l'override, e l'override viene registrato nel record di partecipazione.

Fare clic sul chip di stato di una persona sulla carta per alternare tra Fidato e Non Autorizzato.

:::tip
Aggiungi foto alle persone di ritiro fidate quando possibile — la schermata di check-out mostra la foto in modo che i volontari possano verificare visivamente la persona di fronte a loro.
:::

## Avvisa un Genitore e Broadcast di Emergenza

Entrambe le funzioni inviano messaggi di testo attraverso il provider di messaggistica connesso della tua chiesa — non c'è alcun servizio SMS integrato, quindi uno dei provider supportati deve essere configurato prima.

- **Avvisa un genitore** -- Dalla schermata di check-out di un chiosco presidiato, lo staff può inviare un messaggio di testo ai genitori/tutori di un bambino controllato (ad esempio, "Per favore, vieni nella sala nido").
- **Broadcast di emergenza** -- Dalle impostazioni di amministrazione del chiosco, lo staff può inviare un messaggio di testo ai tutori di ogni nucleo familiare controllato per il servizio selezionato contemporaneamente. L'invio richiede di digitare **EMERGENZA** per confermare.

Le persone che hanno optato per non ricevere messaggi di testo o che non hanno un numero di cellulare in archivio vengono saltate automaticamente — il chiosco segnala quanti messaggi sono stati inviati e quanti sono stati saltati.

Vedi la procedura dettagliata dal lato del chiosco in [Check-Out & Sicurezza dei Bambini](../../b1-checkin/check-in/checking-out).

## Articoli Correlati

- [Check-In](check-in.md) — impostazione del chiosco e hardware
- [Check-Out & Sicurezza dei Bambini](../../b1-checkin/check-in/checking-out) — il check-out del chiosco, la verifica del ritiro e i flussi di avviso
- [Creazione di Gruppi](../groups/creating-groups.md) — dove si trovano le impostazioni della stanza
- [Impostazione della Partecipazione](setup.md) — servizi, orari di servizio e assegnazioni della stanza

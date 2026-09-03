---
title: "Sicurezza Check-In"
---

# Sicurezza Check-In

<div class="article-intro">

B1 include un set di controlli di sicurezza per i bambini durante il check-in: limiti di capienza della sala e rapporti volontari-bambini, orientamenti su età e classe al chiosco, tipi di check-in che distinguono membri, ospiti e volontari, e un elenco di pickup fidati per famiglia che viene verificato al check-out. Questa pagina spiega come configurare ogni funzione di sicurezza in B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura la [struttura di partecipazione](setup.md) e i [chioschi di check-in](check-in.md)
- Le sale sono [gruppi](../groups/creating-groups.md) collegati agli orari di servizio — le impostazioni di sicurezza qui sotto si trovano nel gruppo
- Page-a-parent e emergency broadcast richiedono un provider di messaging collegato ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Capienza della Sala e Chiusura di una Sala

Ogni sala di check-in (gruppo) può applicare i suoi limiti. Apri il gruppo, fai clic su **icona matita** per modificare le impostazioni e trova la sezione **Capienza Check-In**:

- **Capienza** -- Il numero massimo di persone che possono essere controllate in questa sala contemporaneamente. Quando la sala è piena, il check-in è bloccato e il chiosco mostra il nome della sala piena.
- **Capienza Ospiti** -- Un limite opzionale separato su quanti ospiti la sala può contenere.
- **Chiuso per Check-In** -- Impostato su **Sì** per interrompere tutti i check-in a questa sala immediatamente (ad esempio, quando una classe è annullata o una sala non è disponibile). I check-out funzionano ancora.

## Rapporti Volontari

La stessa sezione **Capienza Check-In** nel gruppo include le regole di staffing:

- **Bambini per Volontario** -- Il numero massimo di bambini che ogni volontario controllato può coprire (ad es. 5 significa un volontario ogni cinque bambini).
- **Volontari Minimi** -- Il numero più piccolo di volontari che devono essere controllati prima che i bambini possano entrare nella sala.

I volontari contano per queste regole quando fanno il check-in con il tipo **Volontario** al chiosco (vedi [Tipi di Check-In](#tipi-di-check-in) qui sotto).

### Scegliere Avvertenza vs. Blocco

La severità dell'applicazione dei rapporti è un'impostazione a livello di chiesa:

1. In B1 Admin, vai a **Impostazioni > Gestisci Chiesa** e apri la sezione **Check-In**.
2. Imposta **Applicazione Rapporto Volontari**:
   - **Avvisa (consenti con conferma)** -- Il chiosco mostra un avviso quando una sala è al di fuori del rapporto o al di sotto dei suoi volontari minimi, e un membro dello staff può confermare per procedere comunque. Questa è l'impostazione predefinita.
   - **Blocca (impedisci check-in)** -- Il check-in alla sala è rifiutato fino a quando non ci sono abbastanza volontari controllati.

:::info
La capienza e Chiuso per Check-In sono sempre limiti rigidi — la scelta avvisa/blocca si applica solo ai rapporti di volontari.
:::

## Tipi di Check-In

Ogni check-in registra se la persona è un **Membro**, **Ospite** o **Volontario**. Il tipo viene scelto con i chip nello schermo della famiglia del chiosco (il membro è l'impostazione predefinita). I tipi alimentano le regole di sicurezza — i volontari forniscono copertura di rapporto e gli ospiti contano contro la capienza ospiti della sala.

## Orientamento su Età e Classe della Sala

Puoi dare a ogni sala i limiti di età o classe in modo che il chiosco guidi le famiglie verso le sale appropriate:

- Nelle impostazioni del gruppo, usa la sezione **Età e Classe** per impostare l'età minima/massima (anni e mesi) e/o la classe per la sala.
- Al chiosco, le sale per cui un bambino si qualifica sono evidenziate e le sale per cui non si qualifica sono oscurate. Una sala oscurata può comunque essere scelta con una conferma dello staff — l'orientamento non blocca mai.

Le classi cambiano nella **data di promozione di classe** della tua chiesa:

1. In B1 Admin, vai a **Impostazioni > Gestisci Chiesa** e apri la sezione promozione classe.
2. Imposta il mese e il giorno in cui la tua chiesa promuove gli studenti (ad esempio, 1° agosto). Le età e le classi al chiosco vengono calcolate a partire dalla data di promozione più recente.

## Persone di Pickup Fidate e Non Autorizzate

Ogni famiglia può mantenere un elenco di persone che sono — o non sono — autorizzate a ritirare i suoi bambini.

1. Apri la pagina di una persona in **Persone** e trova la scheda **Pickup**.
2. Fai clic su **Aggiungi**. Cerca una persona esistente o aggiungi qualcuno non nel sistema inserendo il loro **Nome**, **Relazione** e una foto.
3. Imposta lo **Stato**:
   - **Fidato** -- Al check-out, questa persona appare come una scheda di pickup toccabile con la loro foto, rendendo il pickup verificato veloce.
   - **Non Autorizzato** -- Se qualcuno tenta il pickup sotto questo nome, il chiosco blocca il check-out con un avviso. Un membro dello staff può ignorare, e l'ignoramento viene registrato nel record di partecipazione.

Fai clic su un chip dello stato di una persona sulla scheda per alternarsi tra Fidato e Non Autorizzato.

:::tip
Aggiungi foto a persone di pickup fidate ogni volta che possibile — lo schermo di checkout mostra la foto in modo che i volontari possano verificare visivamente la persona di fronte a loro.
:::

## Page-a-Parent e Emergency Broadcast

Entrambe le funzioni inviano messaggi di testo tramite il provider di messaging collegato della tua chiesa — non c'è servizio SMS integrato, quindi uno dei provider supportati deve essere configurato prima.

- **Page a parent** -- Dallo schermo di check-out del chiosco con staffing, lo staff può inviare un SMS ai genitori/tutori del bambino controllato (ad esempio, "Per favore, vieni alla sala neonati").
- **Emergency broadcast** -- Dalle impostazioni admin del chiosco, lo staff può inviare SMS a ogni tutore della famiglia controllata per il servizio selezionato contemporaneamente. L'invio richiede di digitare **EMERGENZA** per confermare.

Le persone che hanno rinunciato ai messaggi di testo o che non hanno un numero di cellulare registrato vengono saltate automaticamente — il chiosco segnala quanti messaggi sono stati inviati e quanti sono stati saltati.

Vedi la procedura dal lato del chiosco in [Check-Out e Sicurezza dei Bambini](../../b1-checkin/check-in/checking-out).

## Articoli Correlati

- [Check-In](check-in.md) — impostazione e hardware del chiosco
- [Check-Out e Sicurezza dei Bambini](../../b1-checkin/check-in/checking-out) — check-out del chiosco, verifica del pickup e flussi di pagina
- [Creazione di Gruppi](../groups/creating-groups.md) — dove si trovano le impostazioni della sala
- [Impostazione di Partecipazione](setup.md) — servizi, orari di servizio e assegnazioni di sala
- [Età Minima per Messaggi Privati](../settings/mobile-app.md#member-directory--messaging-settings) — blocca nuove conversazioni di messaggi privati con bambini mantenendoli nella directory

---
title: "Sicurezza del Check-In"
---

# Sicurezza del Check-In

<div class="article-intro">

B1 include un insieme di controlli di sicurezza per i bambini nel check-in: limiti di capienza delle stanze e rapporti volontario-bambino, indicazioni di età e classe al chiosco, tipi di check-in che distinguono membri, ospiti e volontari, e un elenco di persone autorizzate al ritiro per ogni nucleo familiare, verificato al check-out. Questa pagina illustra come configurare ciascuna funzione di sicurezza in B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura la tua [struttura delle presenze](setup.md) e i [chioschi di check-in](check-in.md)
- Le stanze sono [gruppi](../groups/creating-groups.md) collegati agli orari dei servizi -- le impostazioni di sicurezza sottostanti si trovano sul gruppo
- La chiamata dei genitori e la trasmissione di emergenza richiedono un provider di messaggistica di testo connesso ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Capienza della Stanza e Chiusura di una Stanza

Ogni stanza di check-in (gruppo) può applicare i propri limiti. Apri il gruppo, clicca sull'**icona matita** per modificarne le impostazioni e trova la sezione **Check-In Capacity**:

- **Capacity** -- Il numero massimo di persone che possono essere registrate in questa stanza contemporaneamente. Quando la stanza è piena, il check-in viene bloccato e il chiosco indica la stanza piena.
- **Guest Capacity** -- Un limite separato opzionale su quanti ospiti la stanza può ospitare.
- **Closed for Check-In** -- Imposta su **Yes** per interrompere immediatamente tutti i check-in in questa stanza (ad esempio, quando una classe viene annullata o una stanza non è disponibile). I check-out continuano a funzionare.

## Rapporti Volontari

La stessa sezione **Check-In Capacity** sul gruppo include regole sul personale:

- **Children per Volunteer** -- Il numero massimo di bambini che ogni volontario registrato può seguire (ad es. 5 significa un volontario ogni cinque bambini).
- **Minimum Volunteers** -- Il numero minimo di volontari che devono essere registrati prima che i bambini possano fare il check-in nella stanza.

I volontari contano ai fini di queste regole quando fanno il check-in con il tipo **Volunteer** al chiosco (vedi [Tipi di Check-In](#tipi-di-check-in) qui sotto).

### Scegliere tra Avviso e Blocco

Il grado di rigore con cui vengono applicati i rapporti è un'impostazione a livello di chiesa:

1. In B1 Admin, vai su **Settings > Manage Church** e apri il riquadro **Check-In**.
2. Imposta **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- Il chiosco mostra un avviso quando una stanza supera il rapporto o è sotto il numero minimo di volontari, e un membro dello staff può confermare per procedere comunque. Questa è l'impostazione predefinita.
   - **Block (prevent check-in)** -- Il check-in nella stanza viene rifiutato finché non ci sono abbastanza volontari registrati.

:::info
Capacity e Closed for Check-In sono sempre limiti rigidi -- la scelta tra avviso e blocco si applica solo ai rapporti volontari.
:::

## Tipi di Check-In

Ogni check-in registra se la persona è un **Member**, **Guest** o **Volunteer**. Il tipo viene scelto tramite chip nella schermata del nucleo familiare del chiosco (Member è l'impostazione predefinita). I tipi alimentano le regole di sicurezza -- i volontari forniscono copertura per i rapporti, e gli ospiti contano ai fini della Guest Capacity della stanza.

## Indicazioni di Età e Classe per le Stanze

Puoi assegnare a ciascuna stanza limiti di età o classe in modo che il chiosco guidi le famiglie verso le stanze appropriate:

- Nelle impostazioni del gruppo, usa la sezione **Age & Grade** per impostare l'età minima/massima (anni e mesi) e/o la classe per la stanza.
- Al chiosco, le stanze per cui un bambino è idoneo vengono evidenziate e quelle per cui non lo è vengono attenuate. Una stanza attenuata può comunque essere scelta con la conferma di un membro dello staff -- l'indicazione non blocca mai in modo rigido.

Le classi vengono aggiornate alla **data di promozione di classe** della tua chiesa:

1. In B1 Admin, vai su **Settings > Manage Church** e apri il riquadro della promozione di classe.
2. Imposta il mese e il giorno in cui la tua chiesa promuove gli studenti (ad esempio, 1° agosto). Le età e le classi al chiosco vengono calcolate a partire dalla data di promozione più recente.

## Persone Autorizzate e Non Autorizzate al Ritiro

Ogni nucleo familiare può avere un elenco di persone che sono -- o non sono -- autorizzate a ritirare i propri bambini.

1. Apri la pagina di una persona in **People** e trova il riquadro **Pickup**.
2. Clicca su **Add**. Cerca una persona esistente, oppure aggiungi qualcuno non presente nel sistema inserendo il suo **Name**, la **Relationship** e una foto.
3. Imposta lo **Status**:
   - **Trusted** -- Al check-out, questa persona appare come una scheda selezionabile per il ritiro con la sua foto, rendendo veloce il ritiro verificato.
   - **Not Authorized** -- Se qualcuno tenta il ritiro con questo nome, il chiosco blocca il check-out con un avviso. Un membro dello staff può forzare l'operazione, e la forzatura viene registrata nella scheda di presenza.

Clicca sul chip di stato di una persona sulla scheda per alternare tra Trusted e Not Authorized.

:::tip
Aggiungi foto alle persone autorizzate al ritiro ogni volta che è possibile -- la schermata di check-out mostra la foto in modo che i volontari possano verificare visivamente la persona che hanno davanti.
:::

## Chiamata dei Genitori e Trasmissione di Emergenza

Entrambe le funzionalità inviano messaggi di testo tramite il provider di messaggistica connesso della tua chiesa -- non esiste un servizio SMS integrato, quindi uno dei provider supportati deve essere configurato prima.

- **Page a parent** -- Da una schermata di check-out di un chiosco presidiato, lo staff può inviare un messaggio ai genitori/tutori di un bambino registrato (ad esempio, "Please come to the nursery").
- **Emergency broadcast** -- Dalle impostazioni amministrative del chiosco, lo staff può inviare un messaggio di testo a tutti i tutori dei nuclei familiari registrati per il servizio selezionato contemporaneamente. L'invio richiede di digitare **EMERGENCY** per confermare.

Le persone che hanno rifiutato i messaggi di testo, o che non hanno un numero di cellulare registrato, vengono saltate automaticamente -- il chiosco riporta quanti messaggi sono stati inviati e quanti sono stati saltati.

Consulta la procedura lato chiosco in [Check-Out e Sicurezza dei Bambini](../../b1-checkin/check-in/checking-out).

## Articoli Correlati

- [Check-In](check-in.md) — configurazione del chiosco e hardware
- [Check-Out e Sicurezza dei Bambini](../../b1-checkin/check-in/checking-out) — il check-out al chiosco, la verifica del ritiro e i flussi di chiamata
- [Creare Gruppi](../groups/creating-groups.md) — dove si trovano le impostazioni della stanza
- [Configurazione delle Presenze](setup.md) — servizi, orari dei servizi e assegnazione delle stanze

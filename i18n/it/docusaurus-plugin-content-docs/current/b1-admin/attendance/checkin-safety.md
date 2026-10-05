---
title: "Sicurezza del Check-In"
---

# Sicurezza del Check-In

<div class="article-intro">

B1 include una serie di controlli di sicurezza per i bambini per il check-in: limiti di capacità della stanza e rapporti volontari per bambino, indicazioni su età e grado al chiosco, tipi di check-in che distinguono membri, ospiti e volontari, e un elenco di persone autorizzate al ritiro per nucleo familiare che viene verificato al check-out. Questa pagina copre come configurare ogni funzione di sicurezza in B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configurate la vostra [struttura di presenze](setup.md) e i vostri [chioschi di check-in](check-in.md)
- Le stanze sono [gruppi](../groups/creating-groups.md) collegati agli orari dei servizi — le impostazioni di sicurezza di seguito si trovano sul gruppo
- Page-a-parent e emergency broadcast richiedono un provider di messaggistica connesso ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Capacità della stanza e chiusura di una stanza

Ogni stanza di check-in (gruppo) può applicare i propri limiti. Aprite il gruppo, fate clic sull'**icona della matita** per modificare le sue impostazioni, e trovate la sezione **Capacità del Check-In**:

- **Capacità** -- Il numero massimo di persone che possono essere registrate in questa stanza contemporaneamente. Quando la stanza è piena, il check-in è bloccato e il chiosco identifica la stanza piena.
- **Capacità ospiti** -- Un limite opzionale separato su quanti ospiti la stanza può contenere.
- **Chiusa per Check-In** -- Impostate su **Sì** per interrompere immediatamente tutti i check-in in questa stanza (ad esempio, quando una lezione viene cancellata o una stanza non è disponibile). I check-out continuano a funzionare.

## Rapporti dei volontari

La stessa sezione **Capacità del Check-In** sul gruppo include regole di staffing:

- **Bambini per volontario** -- Il numero massimo di bambini che ogni volontario registrato può coprire (ad es. 5 significa un volontario ogni cinque bambini).
- **Volontari minimi** -- Il numero minimo di volontari che devono essere registrati prima che i bambini possano registrarsi nella stanza.

I volontari contano verso queste regole quando si registrano con il tipo **Volontario** al chiosco (vedere [Tipi di Check-In](#check-in-types) di seguito).

### Scelta tra Avvertimento e Blocco

Come vengono applicate rigorosamente le proporzioni è un'impostazione a livello di chiesa:

1. In B1 Admin, andate a **Impostazioni** e aprite la sezione **Check-In**.
2. Impostate **Applicazione del rapporto volontari**:
   - **Avvertimento (consenti con conferma)** -- Il chiosco mostra un avvertimento quando una stanza è in eccesso rispetto alla proporzione o al di sotto del numero minimo di volontari, e un membro dello staff può confermare per procedere comunque. Questo è il valore predefinito.
   - **Blocco (impedisci check-in)** -- Il check-in nella stanza viene rifiutato fino a quando non saranno registrati abbastanza volontari.

:::info
La capacità e la chiusura per check-in sono sempre limiti vincolanti -- la scelta avvertimento/blocco si applica solo ai rapporti dei volontari.
:::

## Tipi di Check-In

Ogni check-in registra se la persona è un **Membro**, un **Ospite**, o un **Volontario**. Il tipo viene scelto con chip sulla schermata del nucleo familiare del chiosco (Membro è il valore predefinito). I tipi alimentano le regole di sicurezza -- i volontari forniscono copertura della proporzione, e gli ospiti contano contro la Capacità ospiti della stanza.

## Indicazioni su età e grado della stanza

Potete dare a ogni stanza limiti di età o grado in modo che il chiosco guidi le famiglie nelle stanze appropriate:

- Nelle impostazioni del gruppo, utilizzate la sezione **Età e grado** per impostare l'età minima/massima (anni e mesi) e/o il grado per la stanza.
- Al chiosco, le stanze per le quali un bambino si qualifica sono evidenziate e le stanze per le quali non si qualificano sono attenuate. Una stanza attenuata può comunque essere scelta con una conferma dello staff -- la guida non blocca mai.

I gradi si rinnovano nella vostra data di **promozione di grado della chiesa**:

1. In B1 Admin, andate a **Impostazioni** e aprite la sezione **Promozione di grado**.
2. Impostate il mese e il giorno in cui la vostra chiesa promuove gli studenti (ad esempio, 1 agosto). Le età e i gradi al chiosco vengono calcolati alla data di promozione più recente.

## Persone autorizzate al ritiro e non autorizzate

Ogni nucleo familiare può avere un elenco di persone che sono -- o non sono -- autorizzate a ritirare i suoi bambini.

1. Aprite la pagina di una persona in **Persone** e trovate la scheda **Ritiro**.
2. Fate clic su **Aggiungi**. Cercate una persona esistente, o aggiungete qualcuno non nel sistema inserendo il suo **Nome**, **Relazione**, e una foto.
3. Impostate lo **Stato**:
   - **Autorizzata** -- Al check-out, questa persona appare come una scheda di ritiro toccabile con la sua foto, rendendo il ritiro verificato veloce.
   - **Non autorizzata** -- Se qualcuno tenta il ritiro con questo nome, il chiosco blocca il check-out con un avvertimento. Un membro dello staff può scavalcare, e lo scavalcamento è registrato nel record di presenze.

Fate clic sul chip di stato di una persona sulla scheda per passare tra Autorizzata e Non autorizzata.

:::tip
Aggiungete foto alle persone autorizzate al ritiro ogni volta che è possibile -- la schermata di check-out mostra la foto in modo che i volontari possano verificare visivamente la persona davanti a loro.
:::

## Page-a-Parent e Emergency Broadcast

Entrambe le funzioni inviano messaggi di testo attraverso il provider di messaggistica connesso della vostra chiesa -- non c'è alcun servizio SMS integrato, quindi uno dei provider supportati deve essere configurato prima.

- **Page a parent** -- Dalla schermata di check-out di un chiosco con personale, lo staff può inviare un messaggio di testo ai genitori/tutori di un bambino registrato (ad esempio, "Per favore venite alla nursery").
- **Emergency broadcast** -- Dalle impostazioni di amministrazione del chiosco, lo staff può inviare un messaggio di testo ai tutori di ogni nucleo familiare registrato per il servizio selezionato contemporaneamente. L'invio richiede di digitare **EMERGENZA** per confermare.

Le persone che hanno rinunciato ai messaggi di testo, o che non hanno un numero di cellulare in archivio, vengono saltate automaticamente -- il chiosco segnala quanti messaggi sono stati inviati e quanti sono stati saltati.

Vedere la procedura dettagliata dal lato del chiosco in [Check-Out e sicurezza dei bambini](../../b1-checkin/check-in/checking-out).

## Articoli correlati

- [Check-In](check-in.md) — configurazione del chiosco e hardware
- [Check-Out e sicurezza dei bambini](../../b1-checkin/check-in/checking-out) — il check-out del chiosco, verifica del ritiro, e flussi di paging
- [Creazione di gruppi](../groups/creating-groups.md) — dove si trovano le impostazioni della stanza
- [Configurazione delle presenze](setup.md) — servizi, orari dei servizi, e assegnazioni della stanza
- [Età minima per messaggi privati](../settings/mobile-app.md#member-directory--messaging-settings) — blocca le nuove conversazioni di messaggi privati con i bambini mantenendoli nella directory

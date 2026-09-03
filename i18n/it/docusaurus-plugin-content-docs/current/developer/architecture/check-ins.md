---
title: "Check-In"
---

# Check-In

<div class="article-intro">

L'architettura del check-in collega il punto di arrivo kiosk sulle chiese al backend di B1: i bambini in arrivo vengono scansionati nella sessione di servizio, i genitori ricevono etichette di ritiro codificate, la sicurezza dei bambini mantiene i rapporti e la disponibilità. Il design priorizza l'affidabilità offline — i chioschi memorizzano nella cache le informazioni di persona e funzionano se il Wi-Fi cade, sincronizzando quando la connessione ritorna.

</div>

## Modello di Dati

Le sessioni di check-in organizzano i check-in: ogni sessione appartiene a un tempo di servizio e a un campus, contiene i record di partecipazione e ha il suo stato di capacità.

## Kiosk Sync Engine

I chioschi si sincronizzano scaricando un bundle compresso di persone, famiglie, persone autorizzate al ritiro e foto. Questo bundle viene memorizzato nella cache locale e utilizzato per cerca e rendering.

## Check-In Workflow

Quando un genitore arriva con un bambino, il kiosk (1) cerca la persona, (2) seleziona l'evento/sessione, (3) controlla i rapporti di capacità e sicurezza, (4) stampa etichette di ritiro con codice di sicurezza e (5) registra la partecipazione.

## Sicurezza dei Bambini

I dati sui ritiri autorizzati, i genitori designati e i genitori non autorizzati vengono sincronizzati con il chiosco per applicare la logica di ritiro offline.

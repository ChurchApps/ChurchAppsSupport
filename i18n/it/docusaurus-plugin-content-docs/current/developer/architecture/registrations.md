---
title: "Registrazioni agli Eventi"
---

# Registrazioni agli Eventi

<div class="article-intro">

La registrazione agli eventi nativi vive nel modulo di contenuto e, dalla ondata di registrazioni pagate, trasporta un modello di commercio completo: tipi di partecipanti a prezzo, selezioni di componenti aggiuntivi con prezzo, codici di sconto, pagamenti tramite il gateway di donazioni esistente della chiesa e una lista d'attesa guidata dallo stato.

</div>

## Panoramica

Il percorso del denaro riutilizza deliberatamente lo stack di donazioni — il controller di registrazione addebita attraverso la stessa astrazione `GatewayService` / `IGatewayProvider`, in modo che nessun dato di carta o conoscenza di gateway SDK viva nel modulo di contenuto.

## Modello di Dati

Il modello dati include tabelle per: registrazioni, registrationMembers, registrationTypes, registrationSelections, registrationSelectionChoices, registrationPayments, registrationCoupons.

## Tre Regole

1. **Il server possiede il prezzo.** I client sottomettono type ids e quantities; il server calcola il totale.
2. **La capacità è applicata atomicamente al momento dell'inserimento.**
3. **I pagamenti vanno sui binari di donazione.** Lo stesso provider gateway e modello di tokenizzazione.

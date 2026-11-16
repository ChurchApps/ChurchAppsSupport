---
title: "Verifica dei piani e notifiche"
description: "Controlla in B1 Admin i piani di servizio per posizioni non coperte, conflitti di pianificazione e volontari non disponibili, poi invia una notifica push a tutto il team con un solo clic."
---

# Verifica dei piani e notifiche ai volontari {#plan-validation--volunteer-notifications}

<div class="article-intro">

B1 Admin controlla automaticamente i tuoi piani alla ricerca di problemi prima della domenica: posizioni non coperte, conflitti di pianificazione e volontari che hanno bloccato la data. Quando tutto è in ordine, puoi avvisare l'intero team con un solo clic.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea un [piano di servizio](./plans.md) e assegna i volontari alle posizioni
- Aggiungi gli [orari del servizio](./plans.md) al piano, così il rilevamento dei conflitti può verificare le sovrapposizioni
- Assicurati che i volontari abbiano [installato l'app B1](../../b1-church/getting-started/installing-pwa.md) per ricevere le notifiche push

</div>

## Il pannello di verifica {#the-validation-panel}

Ogni piano ha un pannello **Verifica** che si avvia automaticamente mentre lo compili. Apri il piano e clicca su **Gestisci il team di servizio** per vederlo accanto alle posizioni. La pagina del piano mostra un riepilogo di una riga sotto **Team di servizio** (ad esempio, "2 conflitti · 3 non notificati") con un collegamento **Verifica** al pannello completo. Anche le posizioni che hanno ancora bisogno di persone sono elencate nella pagina del piano, quindi la riga di riepilogo conta solo i conflitti e i volontari non ancora notificati.

Il pannello controlla quanto segue:

### Posizioni non coperte {#unfilled-positions}
Se una posizione richiede più persone di quelle attualmente assegnate, il pannello di verifica elenca esattamente ciò che manca, ad esempio *"Tecnico audio: serve 1 persona in più."* Puoi vedere a colpo d'occhio se il piano è completo prima dell'arrivo della settimana.

### Conflitti di pianificazione {#scheduling-conflicts}
Se un volontario è assegnato a due posizioni che si sovrappongono nel tempo all'interno dello stesso piano, il pannello di verifica segnala il conflitto, ad esempio *"Jane Smith: conflitto di orario tra Guida di lode e Accoglienza bambini durante il Servizio domenicale."* In questo modo individui le doppie prenotazioni prima che diventino un problema della domenica mattina.

### Date di indisponibilità {#blockout-dates}
I volontari possono impostare nell'app B1 le date in cui non sono disponibili. Se qualcuno è assegnato a un piano che cade in una delle sue date di indisponibilità, il pannello di verifica segnala automaticamente il conflitto, così puoi trovare un sostituto.

I volontari bloccati vengono segnalati anche mentre pianifichi. Nella pagina del team di servizio e nella finestra **Assegna posizione**, il loro nome mostra un badge rosso **Non disponibile**; passaci sopra con il mouse per vedere le date (ad esempio, *Indisponibile: 22 nov 2026 – 29 nov 2026*). Nella finestra **Assegna posizione** sono elencati dopo tutti gli altri membri del team, e puoi comunque assegnarli. Nella griglia della [Panoramica dei piani](./plans-overview.md), una piccola icona di calendario rossa accanto a un nome indica la stessa cosa.

Per i volontari che non usano l'app, lo staff può inserire le date di indisponibilità al posto loro. Apri il team (dall'elenco **Team di servizio** del ministero) e scorri fino alla scheda **Date di indisponibilità** sotto l'elenco dei membri, che mostra le indisponibilità future di ogni membro del team con **Membro del team**, **Dal** e **Al**:

1. Clicca su **Aggiungi indisponibilità**.
2. Scegli il **Membro del team**, quindi imposta le date **Dal** e **Al**.
3. Clicca su **Salva**.

Per rimuoverne una, clicca sull'icona di eliminazione nella sua riga e conferma. Aggiungere e rimuovere le indisponibilità richiede il permesso di modificare i piani; chiunque altro apra il team vede solo l'elenco.

### Conflitti tra piani diversi {#cross-plan-conflicts}
La verifica controlla anche tutti i tuoi piani contemporaneamente. Se lo stesso volontario è assegnato a due piani diversi che si sovrappongono nel tempo (ad esempio, un servizio alle 9 e uno alle 10 che durano entrambi fino alle 10:30), B1 Admin segnala quella persona come prenotata due volte tra piani diversi.

### Preferenze di pianificazione {#scheduling-preferences}
Se un volontario ha delle [preferenze di pianificazione](./plans.md#scheduling-preferences), il pannello ti avvisa quando un'assegnazione va contro di esse: quando è programmato più volte in questo mese rispetto al suo **Massimo volte al mese**, quando nessuno degli orari del piano corrisponde ai suoi **Orari di servizio preferiti**, oppure quando ha chiesto di non servire nello stesso giorno della sua famiglia e un familiare è anch'esso programmato.

Quando tutti i controlli sono superati, il pannello riporta **Il piano è valido.**

:::tip
Non devi fare nulla per avviare la verifica: si aggiorna automaticamente ogni volta che aggiungi o modifichi un'assegnazione. Tieni d'occhio il pannello mentre componi il piano.
:::

## Notificare i volontari {#notifying-volunteers}

Una volta completato il piano, puoi notificare contemporaneamente tutti i volontari assegnati direttamente dal pannello di verifica.

1. Apri il piano e clicca su **Gestisci il team di servizio** (oppure su **Verifica** nella riga di riepilogo del piano) per vedere il pannello **Verifica**
2. Se ci sono volontari non notificati, vedrai un collegamento che indica quanti devono essere notificati (ad esempio, *"Notifica 8 volontario/i"*). Quando tutti sono stati notificati, il pannello riporta **Tutti i volontari sono stati notificati.**
3. Clicca sul collegamento per inviare le notifiche push a tutti quelli che non sono ancora stati notificati
4. I volontari ricevono sul telefono una notifica che li informa di essere stati programmati e li invita a confermare la loro assegnazione

:::info
Vengono inclusi solo i volontari che non sono ancora stati notificati. Se aggiungi qualcuno al piano in un secondo momento, il collegamento ricompare così puoi notificare la nuova persona senza notificare di nuovo il resto del team.
:::

### Pubblicare un piano in bozza {#publishing-a-penciled-in-plan}

Se il piano è [in bozza](./plans.md#plan-settings), i volontari non possono ancora vedere le proprie assegnazioni, e il pannello mostra *"In bozza: i volontari non possono ancora vedere queste assegnazioni."* con un pulsante al posto del collegamento di notifica:

- **Pubblica piano** rende visibili le assegnazioni.
- **Pubblica e notifica** (mostrato quando alcuni volontari non sono stati notificati, ad esempio *"Pubblica e notifica 8 volontario/i"*) rende visibili le assegnazioni e notifica subito quei volontari.

Conferma nella finestra per pubblicare.

### Piani con un flusso di conferma {#plans-with-a-confirmation-workflow}

Se le impostazioni del piano indicano un [flusso di conferma](./workflows.md#serving-assignment-confirmations), il pannello mostra *"Le nuove richieste usano il flusso di conferma. Gli avvisi nell'app restano attivi. I solleciti si fermano quando ogni richiesta viene accettata o rifiutata."* In questo caso:

- Il collegamento di notifica conta solo i volontari che non sono stati notificati e non hanno ancora risposto.
- Cliccando su di esso viene inviato il consueto avviso nell'app e si avvia una scheda per ogni richiesta nella bacheca del flusso di lavoro. Il flusso di lavoro invia poi i solleciti via email e SMS e, se necessario, affida la richiesta a qualcuno che la contatti telefonicamente.
- Il piano deve essere pubblicato (non in bozza) e il flusso di lavoro deve essere attivo. Altrimenti il pannello mostra *"Impossibile inviare le richieste. Verifica che il flusso di lavoro selezionato sia attivo e che il piano sia pubblicato, quindi riprova."*

:::warning
Per ricevere le notifiche push, i volontari devono avere l'app B1 installata nella schermata Home con le notifiche attive. Per le istruzioni di configurazione, vedi [Installare come app (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Articoli correlati {#related-articles}

- [Piani di servizio](./plans.md)
- [Flussi di lavoro](./workflows.md)
- [Installare la PWA di B1.church](/docs/b1-church/getting-started/installing-pwa)

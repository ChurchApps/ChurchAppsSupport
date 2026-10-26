---
title: "Validazione dei piani e notifiche"
---

# Validazione dei piani e notifiche ai volontari

<div class="article-intro">

B1 Admin controlla automaticamente i tuoi piani alla ricerca di problemi prima di domenica: posizioni non coperte, conflitti di pianificazione e volontari che hanno bloccato la data. Quando tutto è in ordine, puoi avvisare l'intero team con un solo clic.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea un [piano di servizio](./plans.md) e assegna i volontari alle posizioni
- Aggiungi gli [orari di servizio](./plans.md) al piano, così il rilevamento dei conflitti può verificare le sovrapposizioni
- Assicurati che i volontari abbiano installato l'app B1 Mobile per ricevere le notifiche push

</div>

## Il pannello di validazione

Ogni piano ha un pannello **Validation** che viene eseguito automaticamente mentre lo costruisci. Verifica tre cose:

### Posizioni non coperte
Se una posizione richiede più persone di quelle attualmente assegnate, il pannello di validazione elenca esattamente ciò che manca, ad esempio *"Sound Tech: serve 1 persona in più."* Puoi vedere a colpo d'occhio se il tuo piano è completamente coperto prima che arrivi la settimana.

### Conflitti di pianificazione
Se un volontario è assegnato a due posizioni che si sovrappongono nel tempo all'interno dello stesso piano, il pannello di validazione segnala il conflitto, ad esempio *"Jane Smith: conflitto di orario tra Worship Leader e Children's Check-in durante Sunday Service."* In questo modo individui le doppie prenotazioni prima che diventino un problema la domenica mattina.

### Date di blocco
I volontari possono impostare in B1 Mobile le date in cui non sono disponibili. Se qualcuno è assegnato a un piano che cade in una delle sue date di blocco, il pannello di validazione segnala automaticamente il conflitto così puoi trovare un sostituto.

### Conflitti tra piani
La validazione controlla anche tutti i tuoi piani contemporaneamente. Se lo stesso volontario è assegnato a due piani diversi che si sovrappongono nel tempo, ad esempio un servizio alle 9 e uno alle 10 che terminano entrambi alle 10:30, B1 Admin segnalerà quella persona come prenotata due volte tra piani diversi.

:::tip
Non devi fare nulla per avviare la validazione: si aggiorna automaticamente ogni volta che aggiungi o modifichi un'assegnazione. Tieni solo d'occhio il pannello mentre costruisci il piano.
:::

## Notificare i volontari

Una volta definito il piano, puoi avvisare tutti i volontari assegnati in una volta sola direttamente dal pannello di validazione.

1. Apri il piano e scorri fino al pannello **Validation**
2. Se ci sono volontari non ancora notificati, vedrai un link che indica quanti devono essere avvisati (ad esempio *"Notify 8 volunteers"*)
3. Clicca sul link per inviare notifiche push a tutti coloro che non sono ancora stati avvisati
4. I volontari ricevono una notifica sul telefono che li informa di essere stati pianificati e li invita a confermare la loro assegnazione

:::info
Vengono inclusi solo i volontari che non sono ancora stati notificati. Se aggiungi qualcuno al piano in seguito, il link ricomparirà così potrai avvisare la nuova persona senza notificare di nuovo il resto del team.
:::

### Piani con un flusso di conferma

Se le impostazioni del piano indicano un [flusso di conferma](./workflows.md#serving-assignment-confirmations), il pannello mostra *"Le nuove richieste usano il flusso di conferma. Gli avvisi nell'app restano attivi. I solleciti si interrompono quando ogni richiesta viene accettata o rifiutata."* In questo caso:

- Il link di notifica conta solo i volontari che non sono stati notificati e non hanno ancora risposto.
- Cliccandolo viene inviato il normale avviso nell'app e viene creata una scheda per ogni richiesta nella bacheca del flusso di lavoro. Il flusso invia poi i solleciti via email e SMS e, se necessario, passa la richiesta a qualcuno che deve chiamare.
- Il piano deve essere pubblicato (non in bozza) e il flusso di lavoro deve essere attivo. In caso contrario, il pannello mostra *"Impossibile inviare le richieste. Verifica che il flusso di lavoro selezionato sia attivo e che il piano sia pubblicato, quindi riprova."*

:::warning
Per ricevere le notifiche push, i volontari devono avere installata l'esperienza mobile di B1.church (PWA nella schermata Home, oppure l'app nativa B1 Mobile, ormai deprecata, per chi la usa ancora) con le notifiche attivate. Per la configurazione consulta [Installazione come app (PWA)](/docs/b1-church/getting-started/installing-pwa).
:::

## Articoli correlati

- [Piani di servizio](./plans.md)
- [Flussi di lavoro](./workflows.md)
- [Installazione di B1.church PWA](/docs/b1-church/getting-started/installing-pwa)

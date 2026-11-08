---
title: "Convalida dei piani e notifiche"
description: "Controlla i piani di culto in B1 Admin per posizioni non coperte, conflitti di pianificazione e volontari non disponibili, quindi invia una notifica push a tutto il team con un solo clic."
---

# Convalida dei piani e notifiche ai volontari

<div class="article-intro">

B1 Admin controlla automaticamente i tuoi piani prima della domenica: posizioni non coperte, conflitti di pianificazione e volontari che hanno segnalato l'indisponibilità per quella data. Quando tutto è in ordine, puoi avvisare l'intero team con un solo clic.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea un [piano di culto](./plans.md) e assegna i volontari alle posizioni
- Aggiungi gli [orari delle funzioni](./plans.md) al piano, così il rilevamento dei conflitti può verificare le sovrapposizioni
- Assicurati che i volontari abbiano [installato la B1 App](../../b1-church/getting-started/installing-pwa.md) per ricevere le notifiche push

</div>

## Il pannello di convalida

Ogni piano ha un pannello **Convalida** che si avvia automaticamente mentre lo costruisci. Verifica tre aspetti:

### Posizioni non coperte
Se una posizione richiede più persone di quelle attualmente assegnate, il pannello di convalida elenca esattamente ciò che manca, ad esempio *"Tecnico del suono: manca 1 persona."* Puoi vedere a colpo d'occhio se il piano è completo prima dell'arrivo della settimana.

### Conflitti di pianificazione
Se un volontario è assegnato a due posizioni che si sovrappongono nel tempo all'interno dello stesso piano, il pannello di convalida segnala il conflitto, ad esempio *"Jane Smith: conflitto di orario tra Guida di lode e Accoglienza bambini durante la Funzione domenicale."* Questo individua le doppie prenotazioni prima che diventino un problema la domenica mattina.

### Date di indisponibilità
I volontari possono impostare nella B1 App le date in cui non sono disponibili. Se qualcuno è assegnato a un piano che cade in una delle sue date di indisponibilità, il pannello di convalida segnala automaticamente il conflitto, così puoi trovare un sostituto.

### Conflitti tra piani diversi
La convalida controlla anche tutti i tuoi piani contemporaneamente. Se lo stesso volontario è assegnato a due piani diversi che si sovrappongono nel tempo, ad esempio una funzione alle 9 e una alle 10 che terminano entrambe alle 10:30, B1 Admin segnalerà quella persona come doppiamente impegnata tra i piani.

:::tip
Non devi fare nulla per avviare la convalida: si aggiorna automaticamente ogni volta che aggiungi o modifichi un'assegnazione. Basta tenere d'occhio il pannello mentre costruisci il piano.
:::

## Notificare i volontari

Una volta definito il piano, puoi avvisare tutti i volontari assegnati in una sola volta direttamente dal pannello di convalida.

1. Apri il piano e scorri fino al pannello **Convalida**
2. Se ci sono volontari non ancora notificati, vedrai un link che indica quanti devono essere avvisati, ad esempio *"Notifica 8 volontari"*
3. Clicca sul link per inviare le notifiche push a tutti quelli che non sono ancora stati avvisati
4. I volontari ricevono una notifica sul telefono che li informa di essere stati programmati e li invita a confermare la loro assegnazione

:::info
Vengono inclusi solo i volontari che non sono ancora stati notificati. Se aggiungi qualcuno al piano in un secondo momento, il link ricompare così potrai notificare la nuova persona senza avvisare di nuovo il resto del team.
:::

### Piani con un flusso di conferma

Se le impostazioni del piano indicano un [flusso di conferma](./workflows.md#serving-assignment-confirmations), il pannello mostra *"Le nuove richieste usano il flusso di conferma. Gli avvisi nell'app restano attivi. I solleciti si interrompono quando ciascuna richiesta viene accettata o rifiutata."* In questo caso:

- Il link di notifica conta solo i volontari che non sono stati ancora notificati e non hanno ancora risposto.
- Cliccandolo si invia il solito avviso nell'app e si crea una scheda per ogni richiesta nella bacheca del flusso. Il flusso invia poi i solleciti via email e SMS e, se necessario, affida la richiesta a qualcuno che telefonerà.
- Il piano deve essere pubblicato (non in bozza) e il flusso deve essere attivo. Altrimenti il pannello mostra *"Impossibile inviare le richieste. Verifica che il flusso selezionato sia attivo e che il piano sia pubblicato, quindi riprova."*

:::warning
Per ricevere le notifiche push, i volontari devono avere la B1 App installata nella schermata Home con le notifiche attivate. Consulta [Installazione come app (PWA)](../../b1-church/getting-started/installing-pwa.md) per le istruzioni di configurazione.
:::

## Articoli correlati

- [Piani di culto](./plans.md)
- [Flussi di lavoro](./workflows.md)
- [Installare la PWA di B1.church](/docs/b1-church/getting-started/installing-pwa)

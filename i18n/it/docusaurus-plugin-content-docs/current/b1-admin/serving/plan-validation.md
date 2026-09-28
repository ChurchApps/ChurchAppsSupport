---
title: "Convalida del piano e notifiche ai volontari"
---

# Convalida del piano e notifiche ai volontari

<div class="article-intro">

B1 Admin controlla automaticamente i tuoi piani per i problemi prima di domenica — posizioni non riempite, conflitti di pianificazione e volontari che hanno bloccato la data. Quando tutto sembra a posto, puoi notificare l'intero team con un solo clic.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea un [piano di servizio](./plans.md) e assegna i volontari alle posizioni
- Aggiungi gli [orari di servizio](./plans.md) al piano in modo che il rilevamento dei conflitti possa controllare gli sovrapposizioni
- Assicurati che i volontari abbiano l'app B1 Mobile installata per ricevere le notifiche push

</div>

## Il pannello di convalida

Ogni piano ha un pannello **Validation** che si esegue automaticamente mentre lo costruisci. Controlla tre cose:

### Posizioni non riempite
Se una posizione richiede più persone di quante siano attualmente assegnate, il pannello di convalida elenca esattamente cosa è ancora necessario — ad esempio, *"Sound Tech: 1 more person needed."* Puoi vedere a colpo d'occhio se il tuo piano è completamente staffato prima che la settimana arrivi.

### Conflitti di pianificazione
Se un volontario è assegnato a due posizioni che si sovrappongono nel tempo all'interno dello stesso piano, il pannello di convalida segnala il conflitto — ad esempio, *"Jane Smith: time conflict between Worship Leader and Children's Check-in during Sunday Service."* Questo cattura le doppie prenotazioni prima che diventino un problema lunedì mattina.

### Date bloccate
I volontari possono impostare le date in cui non sono disponibili in B1 Mobile. Se qualcuno è assegnato a un piano che rientra in una delle loro date bloccate, il pannello di convalida fa emergere il conflitto automaticamente in modo che tu possa trovare una sostituzione.

### Conflitti tra piani
La convalida verifica anche tutti i tuoi piani contemporaneamente. Se lo stesso volontario è assegnato in due piani diversi che si sovrappongono nel tempo — ad esempio, un servizio alle 9:00 e un servizio alle 10:00 che entrambi si eseguono fino alle 10:30 — B1 Admin contrassegnerà quella persona come prenotata due volte tra i piani.

:::tip
Non devi fare nulla per eseguire la convalida — si aggiorna automaticamente ogni volta che aggiungi o modifichi un'assegnazione. Basta tenere d'occhio il pannello mentre costruisci il piano.
:::

## Notifica ai volontari

Una volta impostato il tuo piano, puoi notificare tutti i volontari assegnati contemporaneamente direttamente dal pannello di convalida.

1. Apri il piano e scorri al pannello **Validation**
2. Se ci sono volontari non notificati, vedrai un link che mostra quanti devono essere notificati (ad esempio, *"Notify 8 volunteers"*)
3. Fai clic sul link per inviare notifiche push a tutti coloro che non sono stati ancora notificati
4. I volontari ricevono una notifica sul loro telefono facendoli sapere che sono stati programmati e chiedendo loro di confermare la loro assegnazione

:::info
Solo i volontari che non sono ancora stati notificati verranno inclusi. Se aggiungi qualcuno al piano in seguito, il link riapparirà in modo che tu possa notificare il nuovo elemento senza ri-notificare il resto del team.
:::

:::warning
I volontari devono avere l'esperienza mobile B1.church installata (PWA sulla loro schermata iniziale, o l'app nativa B1 Mobile deprecata per gli utenti che la hanno ancora) con le notifiche abilitate per ricevere le notifiche push. Vedi [Installing as an App (PWA)](/docs/b1-church/getting-started/installing-pwa) per le istruzioni di configurazione.
:::

## Articoli correlati

- [Service Plans](./plans.md)
- [Workflows](./workflows.md)
- [Installing the B1.church PWA](/docs/b1-church/getting-started/installing-pwa)

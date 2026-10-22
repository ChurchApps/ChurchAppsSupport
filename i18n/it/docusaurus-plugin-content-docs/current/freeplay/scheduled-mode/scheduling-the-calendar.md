---
title: "Programmare il calendario"
---

# Programmare il calendario {#scheduling-the-calendar}

<div class="article-intro">

La pagina **Calendario** di FreePlay Admin controlla cosa riproduce ogni gruppo di schermi e quando. Aggiungi una programmazione per una playlist, un piano di servizio o una cartella di un fornitore, e impostala per ripetersi ogni settimana o per riprodurre una sola volta. Quando non c'è nulla in programma, viene riprodotto il loop predefinito del gruppo.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea almeno un gruppo di schermi. Vedi [Gestire schermi e gruppi](./managing-screens#screen-groups)
- [Crea una playlist](./building-playlists), oppure configura un tipo di piano in B1 Admin

</div>

## Leggere il calendario {#reading-the-calendar}

1. Vai su **Calendario**.
2. Scegli un gruppo di schermi tra le schede in alto. Ogni scheda mostra quante programmazioni ha il gruppo.
3. La vista settimanale va dal lunedì alla domenica, dalle 6:00 alle 22:00. Una linea rossa indica l'ora attuale.
4. Usa le frecce per passare alla settimana precedente o successiva, oppure clicca **Oggi** per tornare alla settimana corrente.

Il sottotitolo della pagina mostra il fuso orario usato dal calendario. Le programmazioni seguono il fuso orario della tua chiesa, che imposti in B1 Admin in [Informazioni sulla chiesa](../../b1-admin/settings/church-settings.md#time-zone). Se la tua chiesa non ha un fuso orario impostato, FreePlay usa il fuso orario della tua sede. Il calendario e le tue TV usano lo stesso fuso orario, quindi un blocco posizionato alle 9:00 nel calendario viene riprodotto alle 9:00 sullo schermo, anche se il tuo computer è impostato su un altro fuso orario.

Le programmazioni sono colorate in base al tipo. Una legenda spiega i colori:

- **Loop predefinito** - Sfondo a righe, mostrato sotto tutto il resto quando il gruppo ha un loop predefinito
- **Playlist**
- **Piano di servizio**
- **Cartella del fornitore**

Ogni blocco mostra il suo nome; i blocchi più alti mostrano anche gli orari, se si ripete (**settimanalmente** o **una volta**) e cosa succede quando finisce in anticipo.

## Impostare il loop predefinito {#setting-the-default-loop}

Il loop predefinito viene riprodotto sugli schermi del gruppo ogni volta che non c'è nulla in programma.

1. Nella pagina **Calendario**, clicca **Loop predefinito…** nell'intestazione. Se un loop predefinito è già impostato, il pulsante mostra **Loop predefinito:** seguito dal nome della playlist.
2. Scegli una **Playlist**, oppure scegli **Nessuno — lo schermo si spegne**.
3. Clicca **Salva**.

## Aggiungere una programmazione {#adding-a-schedule}

Ci sono tre modi per iniziare una nuova programmazione:

- Clicca su uno spazio vuoto del calendario. Il modulo si apre con quel giorno e quella mezz'ora già compilati.
- Clicca **Aggiungi programmazione** nell'intestazione.
- Scegli **Aggiungi programmazione** dalla palette dei comandi (**Ctrl+K** oppure **⌘K**).

Poi compila il modulo:

1. **Riproduci** - Scegli cosa riprodurre:
   - **Playlist** - Qualsiasi playlist che hai creato
   - **Piani di servizio** - Un tipo di piano di B1 Admin, contrassegnato **(piano attuale)**. Lo schermo riproduce il piano attuale per quel tipo di piano ogni settimana, incluse le lezioni di Go Curriculum (anche quelle personalizzate), che usano l'accesso Go collegato al ministero del tipo di piano
   - **Cartella del fornitore…** - Apre **Scegli una cartella del fornitore**. Sfoglia fino a una cartella e clicca **Usa questa cartella**. Per sceglierne un'altra in seguito, clicca **Cambia**
2. **Ripeti** - Seleziona i giorni della settimana in cui questa programmazione viene riprodotta. Per una singola data, attiva **Una volta** e scegli la **Data**.
3. **Inizio** e **Fine** - Gli orari in cui la programmazione inizia e finisce.
4. **Se finisce in anticipo** - Cosa fare quando il contenuto termina prima dell'orario di fine:
   - **Ripeti fino all'orario di fine** - Ricomincia dall'inizio. Ideale per loop di segnaletica, annunci e conto alla rovescia
   - **Ritmo dell'insegnante** - Le diapositive attendono il telecomando dell'insegnante. La lezione resta visibile oltre l'orario di fine fino all'ultima diapositiva
   - **Riproduci una volta, poi torna al loop predefinito**
5. Per le programmazioni ricorrenti, imposta **Inizia** alla prima data. In **Termina**, scegli **Mai**, oppure scegli **In una data** e inserisci una **Data di fine**.
6. Clicca **Salva**.

:::info
**Ritmo dell'insegnante** ha sostituito la vecchia opzione "tieni l'ultima diapositiva". Le programmazioni salvate con quell'opzione ora vengono riprodotte come Ritmo dell'insegnante.
:::

## Modificare o eliminare una programmazione {#editing-or-deleting-a-schedule}

1. Clicca sul blocco della programmazione nel calendario.
2. Modifica qualsiasi campo e clicca **Salva**, oppure clicca **Elimina** per rimuovere la programmazione.

## Programmazioni sovrapposte {#overlapping-schedules}

Se due programmazioni si sovrappongono, il modulo mostra un avviso: **Si sovrappone a un'altra programmazione. Vince quella che inizia più tardi.** Mentre la programmazione più tardiva è in corso, gli schermi la riproducono. Quando finisce, tornano alla programmazione precedente se è ancora in corso.

## Come gli schermi recepiscono le modifiche {#how-screens-pick-up-changes}

Gli schermi associati scaricano tutto ciò che è programmato per i prossimi 7 giorni e controllano da soli se ci sono modifiche. Non devi toccare la TV dopo aver modificato il calendario. Per vedere quando uno schermo ha tutto ciò che gli serve, controlla **Pronto fino a** nella [pagina Schermi](./managing-screens).

## Articoli correlati {#related-articles}

- **[Creare playlist](./building-playlists)** - Crea le playlist da programmare
- **[Riproduzione programmata sulla TV](./scheduled-playback)** - Come funzionano i ritmi dell'insegnante e il telecomando sulla TV
- **[Gestire schermi e gruppi](./managing-screens)** - Aggiungi gruppi e controlla i download di ogni schermo

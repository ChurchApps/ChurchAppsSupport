---
title: "Programmare il calendario"
---

# Programmare il calendario

<div class="article-intro">

La pagina **Calendario** di FreePlay Admin controlla cosa riproduce ogni gruppo di schermi e quando. Aggiungi una programmazione per una playlist, un piano di servizio o una cartella del provider, e impostala per ripetersi ogni settimana oppure per essere riprodotta una sola volta. Quando non c'è nulla in programma, viene riprodotto il loop predefinito del gruppo.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea almeno un gruppo di schermi. Vedi [Gestire schermi e gruppi](./managing-screens#screen-groups)
- [Crea una playlist](./building-playlists), oppure assicurati di avere un tipo di piano configurato in B1 Admin

</div>

## Leggere il calendario

1. Vai su **Calendario**.
2. Scegli un gruppo di schermi dalle schede in alto. Ogni scheda mostra quante programmazioni ha il gruppo.
3. La vista settimanale va da lunedì a domenica, dalle 6:00 alle 22:00. Una linea rossa indica l'ora attuale.
4. Usa le frecce per passare alla settimana precedente o successiva, oppure clicca su **Oggi** per tornare alla settimana corrente.

Il sottotitolo della pagina mostra il fuso orario usato dal calendario. Le programmazioni seguono il fuso orario della tua chiesa, che imposti in B1 Admin in [Informazioni sulla chiesa](../../b1-admin/settings/church-settings.md#time-zone). Se la chiesa non ha un fuso orario impostato, FreePlay usa quello del tuo campus. Il calendario e le TV usano lo stesso fuso orario, quindi un blocco inserito alle 9:00 nel calendario viene riprodotto alle 9:00 sullo schermo, anche se il tuo computer è impostato su un fuso orario diverso.

Le programmazioni sono colorate in base al tipo. Una legenda spiega i colori:

- **Loop predefinito** - Sfondo a tratteggio, mostrato dietro a tutto quando il gruppo ha un loop predefinito
- **Playlist**
- **Piano di servizio**
- **Cartella del provider**

Ogni blocco mostra il suo nome; i blocchi più alti mostrano anche gli orari, se la programmazione si ripete (**settimanale** o **una volta**) e cosa succede quando termina in anticipo.

## Impostare il loop predefinito

Il loop predefinito viene riprodotto sugli schermi del gruppo ogni volta che non c'è nulla in programma.

1. Nella pagina **Calendario**, clicca su **Loop predefinito…** nell'intestazione. Se un loop predefinito è già impostato, il pulsante mostra **Loop predefinito:** seguito dal nome della playlist.
2. Scegli una **Playlist**, oppure scegli **Nessuno — lo schermo si spegne**.
3. Clicca su **Salva**.

## Aggiungere una programmazione

Ci sono tre modi per iniziare una nuova programmazione:

- Clicca su uno spazio vuoto del calendario. Il modulo si apre con quel giorno e quella mezz'ora già compilati.
- Clicca su **Aggiungi programmazione** nell'intestazione.
- Scegli **Aggiungi programmazione** dalla barra dei comandi (**Ctrl+K** o **⌘K**).

Poi compila il modulo:

1. **Riproduci** - Scegli cosa riprodurre:
   - **Playlist** - Qualsiasi playlist che hai creato
   - **Piani di servizio** - Un tipo di piano di B1 Admin, contrassegnato con **(piano attuale)**. Ogni settimana lo schermo riproduce il piano attuale per quel tipo di piano, incluse le lezioni di Go Curriculum (anche quelle personalizzate), che usano l'accesso Go collegato al ministero del tipo di piano
   - **Cartella del provider…** - Apre **Scegli una cartella del provider**. Sfoglia fino a una cartella e clicca su **Usa questa cartella**. Per sceglierne un'altra più tardi, clicca su **Cambia**
2. **Ripeti** - Seleziona i giorni della settimana in cui la programmazione viene riprodotta. Per una singola data, attiva invece **Una volta** e scegli la **Data**.
3. **Inizio** e **Fine** - Gli orari in cui la programmazione inizia e termina.
4. **Se termina in anticipo** - Cosa fare quando il contenuto finisce prima dell'orario di fine:
   - **Ripeti fino all'orario di fine** - Ricomincia dall'inizio. Adatto ai loop di segnaletica, agli annunci e ai conti alla rovescia
   - **Ritmo dell'insegnante** - Le diapositive attendono il telecomando dell'insegnante. La lezione resta visibile oltre l'orario di fine, fino all'ultima diapositiva
   - **Riproduci una volta, poi torna al loop predefinito**
5. Per le programmazioni ricorrenti, imposta **Inizia** alla prima data. Sotto **Termina**, scegli **Mai**, oppure scegli **Alla data** e inserisci una **Data di fine**.
6. Clicca su **Salva**.

:::info
**Ritmo dell'insegnante** ha sostituito la vecchia opzione "mantieni l'ultima diapositiva". Le programmazioni salvate con quell'opzione ora vengono riprodotte come ritmo dell'insegnante.
:::

## Modificare o eliminare una programmazione

1. Clicca sul blocco della programmazione nel calendario.
2. Modifica un campo qualsiasi e clicca su **Salva**, oppure clicca su **Elimina** per rimuovere la programmazione.

## Programmazioni sovrapposte

Se due programmazioni si sovrappongono, il modulo mostra un avviso: **Si sovrappone a un'altra programmazione. Vince quella che inizia più tardi.** Mentre la programmazione che inizia più tardi è in corso, gli schermi la riproducono. Quando termina, tornano alla programmazione precedente, se è ancora in corso.

## Come gli schermi recepiscono le modifiche

Gli schermi abbinati scaricano tutto ciò che è programmato per i successivi 7 giorni e controllano da soli se ci sono modifiche. Non devi toccare la TV dopo aver modificato il calendario. Per vedere quando uno schermo ha tutto ciò di cui ha bisogno, controlla **Pronto fino a** nella [pagina Schermi](./managing-screens).

## Articoli correlati

- **[Creare playlist](./building-playlists)** - Crea le playlist che programmi
- **[Riproduzione pianificata sulla TV](./scheduled-playback)** - Come funzionano sulla TV le lezioni a ritmo dell'insegnante e il telecomando
- **[Gestire schermi e gruppi](./managing-screens)** - Aggiungi gruppi e controlla i download di ciascuno schermo
- **[Mantenere solo una parte di ogni lezione](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Riduci ogni lezione programmata di un piano alle parti che riproduce la tua sala

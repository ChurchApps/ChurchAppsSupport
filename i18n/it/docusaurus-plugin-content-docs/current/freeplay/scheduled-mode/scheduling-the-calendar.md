---
title: "Pianificare il calendario"
---

# Pianificare il calendario

<div class="article-intro">

La pagina **Calendario** di FreePlay Admin controlla cosa riproduce ogni gruppo di schermi e quando. Aggiungi una programmazione per una playlist, un piano di culto o una cartella di un fornitore, e impostala per ripetersi ogni settimana o per riprodurre una sola volta. Quando non c'è nulla in programma, viene riprodotto il loop predefinito del gruppo.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea almeno un gruppo di schermi. Vedi [Gestione di schermi e gruppi](./managing-screens#screen-groups)
- [Crea una playlist](./building-playlists), oppure configura un tipo di piano in B1 Admin

</div>

## Leggere il calendario

1. Vai su **Calendario**.
2. Scegli un gruppo di schermi dalle schede in alto. Ogni scheda mostra quante programmazioni ha il gruppo.
3. La vista settimanale va dal lunedì alla domenica, dalle 6 alle 22. Una linea rossa indica l'ora attuale.
4. Usa le frecce per passare alla settimana precedente o successiva, oppure fai clic su **Oggi** per tornare alla settimana corrente.

Il sottotitolo della pagina mostra il fuso orario usato per il calendario. Le programmazioni seguono il fuso orario della tua chiesa. Se la chiesa non ha un fuso orario impostato, FreePlay usa quello della tua sede.

Le programmazioni sono colorate in base al tipo. Una legenda spiega i colori:

- **Loop predefinito** - Sfondo a tratteggio, mostrato dietro a tutto quando il gruppo ha un loop predefinito
- **Playlist**
- **Piano di culto**
- **Cartella del fornitore**

Ogni blocco mostra il proprio nome; i blocchi più alti mostrano anche gli orari, se si ripete (**settimanalmente** o **una volta**) e cosa succede quando finisce in anticipo.

## Impostare il loop predefinito

Il loop predefinito viene riprodotto sugli schermi del gruppo ogni volta che non c'è nulla in programma.

1. Nella pagina **Calendario**, fai clic su **Loop predefinito** nell'intestazione. Se un loop predefinito è già impostato, il pulsante mostra **Loop predefinito:** seguito dal nome della playlist.
2. Scegli una **Playlist**, oppure scegli **Nessuno - lo schermo si spegne**.
3. Fai clic su **Salva**.

## Aggiungere una programmazione

Ci sono tre modi per iniziare una nuova programmazione:

- Fai clic su uno spazio vuoto del calendario. Il modulo si apre con quel giorno e quella mezz'ora già compilati.
- Fai clic su **Aggiungi programmazione** nell'intestazione.
- Scegli **Aggiungi programmazione** dalla palette dei comandi (**Ctrl+K** oppure **⌘K**).

Poi compila il modulo:

1. **Riproduci** - Scegli cosa riprodurre:
   - **Playlist** - Qualsiasi playlist che hai creato
   - **Piani di culto** - Un tipo di piano da B1 Admin, contrassegnato **(piano attuale)**. Lo schermo riproduce ogni settimana il piano attuale per quel tipo di piano
   - **Cartella del fornitore** - Apre **Scegli una cartella del fornitore**. Sfoglia fino a una cartella e fai clic su **Usa questa cartella**. Per sceglierne un'altra in seguito, fai clic su **Cambia**
2. **Ripeti** - Seleziona i giorni della settimana in cui questa programmazione viene riprodotta. Per una singola data, attiva invece **Una volta** e scegli la **Data**.
3. **Inizio** e **Fine** - Gli orari in cui la programmazione inizia e termina.
4. **Se finisce prima** - Cosa fare quando il contenuto esaurisce prima dell'orario di fine:
   - **Ripeti fino all'orario di fine** - Ricomincia dall'inizio. Ideale per loop di segnaletica, annunci e conti alla rovescia
   - **Ritmo dell'insegnante** - Le diapositive attendono il telecomando dell'insegnante. La lezione resta visibile oltre l'orario di fine fino all'ultima diapositiva
   - **Riproduci una volta, poi torna al loop predefinito**
5. Per le programmazioni ricorrenti, imposta **Inizia il** alla prima data. In **Termina**, scegli **Mai**, oppure scegli **In una data** e inserisci una **Data di fine**.
6. Fai clic su **Salva**.

:::info
**Ritmo dell'insegnante** ha sostituito la vecchia opzione «mantieni l'ultima diapositiva». Le programmazioni salvate con quell'opzione ora vengono riprodotte con il ritmo dell'insegnante.
:::

## Modificare o eliminare una programmazione

1. Fai clic sul blocco della programmazione nel calendario.
2. Modifica un campo qualsiasi e fai clic su **Salva**, oppure fai clic su **Elimina** per rimuovere la programmazione.

## Programmazioni sovrapposte

Se due programmazioni si sovrappongono, il modulo mostra un avviso: **Si sovrappone a un'altra programmazione. Vince quella che inizia più tardi.** Mentre la programmazione più tardiva è in corso, gli schermi la riproducono. Quando finisce, tornano alla programmazione precedente, se questa è ancora in corso.

## Come gli schermi recepiscono le modifiche

Gli schermi associati scaricano tutto ciò che è programmato per i successivi 7 giorni e controllano da soli se ci sono modifiche. Non devi toccare la TV dopo aver modificato il calendario. Per vedere quando uno schermo ha tutto ciò che gli serve, controlla **Pronto fino a** nella [pagina Schermi](./managing-screens).

## Articoli correlati

- **[Creare playlist](./building-playlists)** - Crea le playlist da programmare
- **[Riproduzione programmata sulla TV](./scheduled-playback)** - Come lavorano sulla TV le lezioni a ritmo dell'insegnante e il telecomando
- **[Gestione di schermi e gruppi](./managing-screens)** - Aggiungi gruppi e controlla i download di ogni schermo

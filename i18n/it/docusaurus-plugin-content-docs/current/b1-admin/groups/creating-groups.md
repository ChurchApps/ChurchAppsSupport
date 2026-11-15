---
title: "Creare gruppi"
description: "Configura un nuovo gruppo in B1 Admin, dalla scelta della categoria e del nome fino alla configurazione della politica di adesione, delle etichette, dei messaggi e delle impostazioni delle presenze."
---

# Creare gruppi

<div class="article-intro">

Creare un gruppo in B1 Admin è semplice. Imposterai una categoria, darai un nome al gruppo e poi configurerai le sue impostazioni. I gruppi ti aiutano a organizzare la tua chiesa in unità significative come piccoli gruppi, comitati e classi.

</div>

## Video di formazione {#training-video}

<YouTube id="uG93pXVreNo" title="Creare gruppi e aggiungere membri in B1" next="Richieste di adesione ai gruppi e calendari dei gruppi in B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di gestire i gruppi. Consulta [Ruoli e permessi](../people/roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Decidi una struttura di categorie per i tuoi gruppi (ad esempio "Piccoli gruppi", "Ministeri", "Comitati"). Le categorie aiutano a mantenere ordinati i gruppi correlati.

</div>

## Aggiungere un nuovo gruppo {#adding-a-new-group}

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Persone** e fai clic su **Gruppi**.
2. Fai clic su **Aggiungi gruppo** nell'intestazione della pagina. Sotto l'elenco si apre il modulo **Nuovo gruppo**. Inserisci un **Nome categoria**. Le categorie ti aiutano a raggruppare i gruppi correlati (ad esempio "Piccoli gruppi", "Ministeri" o "Comitati"). Se una categoria esiste già, puoi selezionarla dall'elenco.
3. Inserisci il **Nome** del gruppo.
4. Fai clic su **Aggiungi** (oppure su **Annulla** per chiudere il modulo). Il nuovo gruppo comparirà nell'elenco, con la sua categoria mostrata sotto il nome.

## Configurare le impostazioni del gruppo {#configuring-group-settings}

Una volta creato il gruppo, puoi completarne i dettagli:

1. Fai clic sul **nome del gruppo** nell'elenco per aprirlo.
2. Fai clic sul pulsante **Modifica** sul lato sinistro della pagina del gruppo, sotto i dettagli del gruppo. Si apre il modulo **Dettagli del gruppo**.
3. Configura le seguenti opzioni:
   - **Nome categoria** e **Nome gruppo** -- Cambia la categoria del gruppo oppure rinominalo.
   - **Orario di incontro** e **Luogo di incontro** -- Quando e dove il gruppo si riunisce di solito (ad esempio "Mercoledì alle 19:00" in "Aula 204").
   - **Descrizione** -- Un breve riepilogo di ciò di cui si occupa il gruppo, scritto nell'editor di formattazione. È visibile ai membri.
   - **Foto** -- Fai clic sul riquadro della foto o su **Aggiungi foto** per scegliere o caricare un'immagine per il gruppo.
   - **Slug** -- Il nome breve usato nell'indirizzo web del gruppo sul sito della tua chiesa.
   - **Etichette** -- Assegna una o più etichette descrittive al gruppo (ad esempio "In presenza", "Online", "Nuovi membri benvenuti"). Le etichette sono tag liberi che definisci tu; seleziona quelle che si applicano, oppure fai clic su **Aggiungi nuova etichetta** per crearne una. Le etichette possono essere usate per filtrare i gruppi nell'elemento del sito **Esplora gruppi**, e un elemento **Elenco gruppi** del sito può mostrare solo i gruppi che hanno una specifica etichetta.
   - **Campus** -- Il campus a cui appartiene il gruppo, se la tua chiesa ne ha più di uno.
   - **Iscrizione** -- Scegli chi può entrare in questo gruppo:
     - **Aperto (i membri possono aderire subito)** -- Chiunque può entrare senza approvazione
     - **Richiesta di adesione (serve l'approvazione del leader)** -- Le persone devono inviare una richiesta di adesione che richiede approvazione (vedi [Richieste di adesione ai gruppi](./group-join-requests.md))
     - **Chiuso (solo aggiunta da parte dell'amministratore)** -- I membri devono essere aggiunti manualmente dai leader o dagli amministratori
   - **Discussioni** -- Attiva o disattiva il feed di chat del gruppo, dove ogni membro può scrivere. Per impostazione predefinita è attivo (**Sì**).
   - **Annunci** -- Attiva un secondo feed di chat riservato ai leader: i membri possono leggere e reagire, ma solo i leader possono scrivere. Per impostazione predefinita è attivo (**Sì**).
   - **Mostra elenco sul sito web** -- Imposta su **Sì** per elencare i membri del gruppo nella sua pagina sul sito web della tua chiesa.
   - **Gruppo riservato** -- Nasconde questo gruppo e il suo elenco membri dalle pagine pubbliche, dal cercatore di gruppi e dai non membri. Usalo per gruppi sensibili come i ministeri di recupero o di consulenza; solo i membri del gruppo e lo staff della chiesa possono vederlo.
4. Per classi e aule dei bambini, il modulo contiene anche queste sezioni:
   - **Età e classe** -- **Età minima** e **Età massima** (in anni e mesi) e **Classe minima** e **Classe massima**, usate per suggerire l'aula giusta al check-in. Lasciali vuoti (oppure **Nessun limite**) per nessun limite. Vedi [Sicurezza del check-in](../attendance/checkin-safety.md#age-and-grade-room-guidance).
   - **Capienza del check-in** -- **Capienza**, **Capienza ospiti**, **Bambini per volontario**, **Volontari minimi** e **Chiusa per il check-in**. Vedi [Sicurezza del check-in](../attendance/checkin-safety.md#room-capacity-and-closing-a-room).
   - **Presenze** -- **Traccia presenze** (imposta su **Sì** per registrare le [presenze](../attendance/tracking-attendance.md) di questo gruppo), **Email di promemoria presenze** (ricorda ai leader del gruppo quando uno degli eventi del calendario del gruppo si è svolto ieri ma non è stata registrata alcuna presenza), **Ritiro dai genitori** e **Stampa cartellino** (opzioni di check-in per i gruppi di bambini).
   - **Orari dei culti (facoltativo)** -- Scegli un orario del culto in **Aggiungi orario del culto** e fai clic sul pulsante più per associare il gruppo a quell'orario; fai clic sull'icona di rimozione accanto a un orario del culto per toglierlo. Vedi [Configurazione Presenze](../attendance/setup.md) per i dettagli sugli orari dei culti.
5. Fai clic su **Salva** per applicare le modifiche, oppure su **Annulla** per chiudere il modulo senza salvare.

Il lato sinistro della pagina del gruppo mostra la categoria del gruppo, l'orario e il luogo di incontro, la descrizione, le etichette e gli orari dei culti, oltre ai segni di spunta per **Traccia presenze**, **Stampa cartellino**, **Ritiro dai genitori**, **Discussioni** e **Annunci**, così vedi a colpo d'occhio quali sono attivi.

:::tip
Aggiungere una descrizione chiara e un orario di incontro aiuta i membri a sapere cosa aspettarsi quando entrano in un gruppo.
:::

:::info
Disattivare sia Discussioni sia Annunci rimuove del tutto la scheda Messaggi dal gruppo nel portale dei membri. Disattivarne solo una nasconde la sua scheda; i membri vengono portati al feed ancora attivo. I messaggi esistenti vengono comunque conservati -- gli interruttori controllano solo la pubblicazione di nuovi messaggi.
:::

## Duplicare un gruppo {#duplicating-a-group}

Stai avviando una nuova edizione di una classe o di un ministero ricorrente? Invece di reinserire tutte le impostazioni, duplica un gruppo esistente:

1. Apri il gruppo e fai clic su **Duplica** (sotto il pulsante **Modifica** sul lato sinistro della pagina del gruppo).
2. Conferma la duplicazione.

La copia riprende le impostazioni dell'originale -- categoria, descrizione, foto, orario e luogo di incontro, iscrizione, etichette, campus, feed di chat, riservatezza, limiti di età e classe, capienza del check-in e opzioni di presenza -- ma **non** i suoi membri né gli orari dei culti. Il nuovo gruppo si apre subito; ha il nome dell'originale con " (Copia)" aggiunto, quindi rinominalo dalle impostazioni del gruppo.

## Archiviare un gruppo {#archiving-a-group}

Quando un gruppo non è più attivo ma vuoi conservarne lo storico invece di eliminarlo:

1. Apri il gruppo e fai clic su **Modifica** per modificarne le impostazioni.
2. Fai clic su **Archivia** e conferma.

I gruppi archiviati escono dall'elenco principale dei Gruppi. Per ritrovarne uno, fai clic sul pulsante **Mostra archiviati** accanto ai pulsanti delle categorie in cima alla pagina Gruppi, poi fai clic su **Ripristina** accanto al gruppo e conferma per riportarlo attivo.

:::info
Archiviare un gruppo non elimina i suoi membri, lo storico delle presenze o gli eventi del calendario -- nasconde solo il gruppo dall'elenco predefinito finché non lo ripristini.
:::

## Eliminare un gruppo {#deleting-a-group}

Per rimuovere un gruppo in modo permanente, aprilo, fai clic su **Modifica**, fai clic su **Elimina** in fondo al modulo **Dettagli del gruppo** e conferma. L'eliminazione non può essere annullata -- se potresti aver bisogno dello storico del gruppo in seguito, [archivialo](#archiving-a-group) invece.

## Prossimi passi {#next-steps}

Dopo aver creato e configurato il gruppo, sei pronto a:

- **Aggiungere membri** -- Cerca le persone e aggiungile al gruppo. Usa l'icona a stella (**Rendi leader**) per designare i leader del gruppo. Vedi [Membri del gruppo](./group-members.md).
- **Configurare un calendario** -- Crea eventi e riunioni ricorrenti per il gruppo. Vedi [Calendario del gruppo](./group-calendar.md).
- **Comunicare** -- Invia un'email, un SMS o una notifica push ai membri del gruppo dalla pagina del gruppo. Vedi [Membri del gruppo](./group-members.md#emailing-group-members).
- **Esportare i dati** -- Fai clic su **Esporta** sopra l'elenco membri del gruppo per scaricarlo. Per scaricare l'intero elenco dei gruppi, fai clic su **Esporta** nell'intestazione della pagina Gruppi.

:::info
Ogni gruppo appartiene a una categoria, e la pagina principale dei Gruppi ti permette di filtrare l'elenco per categoria. Puoi sempre riorganizzare o rinominare le categorie man mano che la tua chiesa cresce.
:::

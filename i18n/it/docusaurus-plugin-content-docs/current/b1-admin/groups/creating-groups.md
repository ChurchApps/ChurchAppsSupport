---
title: "Creare gruppi"
description: "Crea un nuovo gruppo in B1 Admin, dalla scelta della categoria e del nome fino alla configurazione di politica di adesione, etichette, messaggistica e presenze."
---

# Creare gruppi

<div class="article-intro">

Creare un gruppo in B1 Admin è semplice. Imposti una categoria, dai un nome al gruppo e poi configuri le sue impostazioni. I gruppi aiutano a organizzare la chiesa in unità significative come piccoli gruppi, comitati e classi.

</div>

## Video di formazione

<YouTube id="uG93pXVreNo" title="Creare gruppi e aggiungere membri in B1" next="Richieste di adesione ai gruppi e calendari dei gruppi in B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di gestire i gruppi. Vedi [Ruoli e permessi](../people/roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Decidi una struttura di categorie per i tuoi gruppi (ad esempio "Piccoli gruppi", "Ministeri", "Comitati"). Le categorie aiutano a tenere organizzati i gruppi affini.

</div>

## Aggiungere un nuovo gruppo

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Persone** e fai clic su **Gruppi**.
2. Fai clic su **Aggiungi gruppo** nell'intestazione della pagina. Sotto l'elenco si apre un modulo **Nuovo gruppo**. Inserisci un **Nome categoria**. Le categorie aiutano a raggruppare i gruppi affini (ad esempio "Piccoli gruppi", "Ministeri" o "Comitati"). Se una categoria esiste già, puoi selezionarla dall'elenco.
3. Inserisci il **Nome** del gruppo.
4. Fai clic su **Aggiungi**. Il nuovo gruppo comparirà nell'elenco, con la sua categoria mostrata sotto il nome.

## Configurare le impostazioni del gruppo

Una volta creato il gruppo, puoi aggiungere altri dettagli:

1. Fai clic sul **nome del gruppo** nell'elenco per aprirlo.
2. Fai clic sul pulsante **Modifica** sul lato sinistro della pagina del gruppo, sotto i dettagli del gruppo.
3. Configura le seguenti opzioni:
   - **Descrizione** -- Un breve riepilogo di cosa tratta il gruppo. È visibile ai membri.
   - **Orari degli incontri** -- Quando il gruppo di solito si incontra (ad esempio "Mercoledì alle 19:00").
   - **Politica di adesione** -- Scegli chi può entrare nel gruppo:
     - **Aperto** -- Chiunque può entrare subito, senza approvazione
     - **Su richiesta** -- Le persone devono inviare una richiesta di adesione che richiede approvazione (vedi [Richieste di adesione ai gruppi](./group-join-requests.md))
     - **Chiuso** -- I membri devono essere aggiunti manualmente da leader o amministratori
   - **Etichette** -- Assegna al gruppo una o più etichette descrittive (ad esempio "Di persona", "Online", "Nuovi membri benvenuti"). Le etichette sono tag liberi che definisci tu; seleziona tutte quelle che si applicano. Le etichette possono essere usate per filtrare i gruppi nell'elemento Browser dei gruppi del sito web, e un elemento Elenco gruppi mostra i gruppi che hanno una determinata etichetta.
   - **Gruppo riservato** -- Nasconde questo gruppo e il suo elenco dalle pagine pubbliche, dal cercatore di gruppi e dai non membri. Usalo per gruppi sensibili come i ministeri di recupero o di consulenza; solo i membri del gruppo e lo staff della chiesa possono vederlo.
   - **Discussioni** -- Attiva o disattiva il feed di chat del gruppo, dove qualsiasi membro può pubblicare. Attivo per impostazione predefinita.
   - **Annunci** -- Attiva un secondo feed di chat riservato ai leader -- i membri possono leggere e reagire, ma solo i leader possono pubblicare. Attivo per impostazione predefinita.
   - **Monitoraggio delle presenze** -- Attivalo se vuoi registrare le [presenze](../attendance/tracking-attendance.md) per questo gruppo.
   - **Orari dei culti** -- Associa il gruppo a specifici orari dei culti della chiesa, se applicabile. Vedi [Configurazione delle presenze](../attendance/setup.md) per i dettagli sugli orari dei culti.
4. Fai clic su **Salva** per applicare le modifiche.

:::tip
Aggiungere una descrizione chiara e un orario di incontro aiuta i membri a sapere cosa aspettarsi quando entrano in un gruppo.
:::

:::info
Disattivare sia Discussioni sia Annunci rimuove completamente la scheda Messaggi dal gruppo nel portale dei membri. Disattivarne solo uno nasconde la sua scheda; i membri vengono spostati sul feed ancora attivo. In entrambi i casi i messaggi esistenti vengono conservati -- gli interruttori controllano solo la pubblicazione di nuovi messaggi.
:::

## Duplicare un gruppo

Stai avviando una nuova edizione di una classe o di un ministero ricorrente? Invece di reinserire tutte le impostazioni, duplica un gruppo esistente:

1. Apri il gruppo e fai clic su **Duplica** (sotto il pulsante **Modifica** sul lato sinistro della pagina del gruppo).
2. Conferma la duplicazione.

La copia mantiene le impostazioni dell'originale -- categoria, descrizione, orario e luogo dell'incontro, politica di adesione, etichette e sede -- ma **non** i suoi membri. Il nuovo gruppo prende il nome dell'originale con " (Copia)" aggiunto; rinominalo dalle impostazioni del gruppo.

## Archiviare un gruppo

Quando un gruppo non è più attivo ma vuoi conservarne la cronologia invece di eliminarlo:

1. Apri il gruppo e fai clic su **Modifica** per modificarne le impostazioni.
2. Fai clic su **Archivia** e conferma.

I gruppi archiviati non compaiono più nell'elenco principale dei Gruppi. Per ritrovarne uno, fai clic sul pulsante **Mostra archiviati** accanto ai pulsanti delle categorie in cima alla pagina Gruppi, poi fai clic su **Ripristina** accanto al gruppo per riportarlo nell'elenco.

:::info
Archiviare un gruppo non elimina i suoi membri, la cronologia delle presenze o gli eventi del calendario -- nasconde solo il gruppo dall'elenco predefinito finché non lo ripristini.
:::

## Passi successivi

Dopo aver creato e configurato il gruppo, puoi:

- **Aggiungere membri** -- Cerca le persone e aggiungile al gruppo. Usa l'icona a stella (**Rendi leader**) per designare i leader del gruppo. Vedi [Membri del gruppo](./group-members.md).
- **Configurare un calendario** -- Crea eventi e incontri ricorrenti per il gruppo. Vedi [Calendario del gruppo](./group-calendar.md).
- **Comunicare** -- Invia messaggi a tutti i membri del gruppo direttamente dalla pagina del gruppo.
- **Esportare i dati** -- Fai clic su **Esporta** sopra l'elenco dei membri del gruppo per scaricarlo.

:::info
Ogni gruppo appartiene a una categoria, e la pagina principale dei Gruppi ti permette di filtrare l'elenco per categoria. Puoi sempre riorganizzare o rinominare le categorie man mano che la chiesa cresce.
:::

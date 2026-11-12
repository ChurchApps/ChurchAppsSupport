---
title: "Registro di controllo"
description: "Consulta il registro di controllo in B1 Admin per vedere chi ha effettuato l'accesso, modificato le schede delle persone o cambiato le autorizzazioni, ed esporta le voci filtrate in CSV."
---

# Registro di controllo

<div class="article-intro">

Il registro di controllo tiene traccia di tutte le azioni e modifiche significative nel tuo sistema di gestione della chiesa. Usalo per verificare l'attività di accesso, capire chi ha apportato modifiche alle schede delle persone, monitorare gli aggiornamenti delle autorizzazioni e mantenere la responsabilità condivisa all'interno del tuo team.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un ruolo con l'autorizzazione **Modifica impostazioni chiesa** (nella sezione **Contenuti** delle autorizzazioni di un ruolo; la stessa autorizzazione che apre **Impostazioni**). Vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md).

</div>

## Visualizzare il registro di controllo {#viewing-the-audit-log}

1. Apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin) ed espandi **Impostazioni**.
2. Fai clic su **Registro di controllo**.
3. Il registro mostra le voci recenti in una tabella con le seguenti colonne:
   - **Data** -- Quando si è verificata l'azione.
   - **Modulo** -- La parte di B1 in cui è stata apportata la modifica (ad esempio, anagrafica o donazioni).
   - **Categoria** -- Il tipo di scheda o di azione (con colori per una lettura rapida).
   - **Azione** -- Cosa è stato fatto (ad esempio, Donazione salvata, Accesso riuscito, Nota aggiornata).
   - **Entità** -- Il tipo e l'ID della scheda interessata.
   - **Indirizzo IP** -- L'indirizzo IP dell'utente che ha eseguito l'azione.
4. Fai clic sulla freccia all'inizio di una riga per vedere i dettagli: una tabella di ciascun campo modificato con il **Valore precedente** e il **Nuovo valore**, oppure il **Record eliminato** in caso di eliminazione.

## Filtrare il registro {#filtering-the-log}

Usa i filtri in cima alla pagina per restringere i risultati:

- **Modulo** -- Filtra per area: **Tutti i moduli**, **Persone**, **Donazioni**, **Presenze**, **Messaggistica**, **Contenuti**, **Servizi** o **Lezioni**.
- **Categoria** -- Filtra per tipo di azione:
  - **Tutte le categorie** -- Mostra tutto.
  - **Accesso** -- Accessi riusciti e falliti.
  - **Persone** -- Creazione, aggiornamento o eliminazione di schede persona.
  - **Autorizzazioni** -- Concessione e revoca di autorizzazioni.
  - **Donazioni** -- Modifiche alle schede delle donazioni.
  - **Gruppi** -- Azioni di gestione dei gruppi.
  - **Moduli** -- Attività di invio dei moduli.
  - **Impostazioni** -- Modifiche alla configurazione.
- **Data di inizio** -- Mostra le voci da questa data in avanti.
- **Data di fine** -- Mostra le voci fino a questa data.

Fai clic su **Cerca** dopo aver impostato i filtri per aggiornare i risultati.

## Capire le categorie {#understanding-categories}

La categoria di ogni voce è mostrata come etichetta colorata, per un'identificazione rapida:

- **login** -- Etichetta blu. Tiene traccia dei tentativi di accesso riusciti e falliti.
- **person** -- Etichetta blu. Tiene traccia della creazione, dell'aggiornamento e dell'eliminazione delle schede persona.
- **permission** -- Etichetta rossa. Tiene traccia di quando i diritti di accesso vengono concessi o revocati.
- **donation** -- Etichetta verde. Tiene traccia delle modifiche alle schede delle donazioni.
- **form** -- Etichetta arancione. Tiene traccia dell'attività di invio dei moduli.
- **group**, **settings** e le altre categorie (come **userchurch**) -- Etichetta grigia.

## Cronologia delle note su persone e gruppi {#note-history-on-people-and-groups}

Se puoi aprire il registro di controllo, vedi anche una traccia delle note modificate direttamente dove si trovano le note, nella scheda **Note** di una persona o di un gruppo:

1. Una nota modificata mostra **(modificata · visualizza cronologia)** accanto alla sua data. Fai clic per aprire il registro di controllo filtrato sulla cronologia delle note di quella persona o di quel gruppo.
2. Una nota eliminata lascia al suo posto un contrassegno grigio **Nota eliminata**, che indica chi l'ha scritta, quando è stata pubblicata e quando è stata eliminata. Fai clic su **Visualizza cronologia** per aprire lo stesso registro filtrato.
3. Nel registro filtrato, espandi una voce **Nota aggiornata** o **Nota eliminata** per vedere il testo precedente e l'account che ha effettuato la modifica. Fai clic su **Mostra tutto** per rimuovere il filtro.
4. Nella colonna **Entità**, l'ID di una nota di persona o di gruppo rimanda alle note di quella persona o di quel gruppo.

Il personale che non può aprire il registro di controllo vede l'elenco delle note senza questi contrassegni.

## Esportare il registro {#exporting-the-log}

Quando le voci del registro sono visualizzate, in cima alla pagina compare il pulsante **Esporta CSV**. Fai clic per esportare i risultati filtrati correnti in un foglio di calcolo per la revisione offline o per la conservazione dei documenti.

## Paginazione {#pagination}

Usa i controlli di paginazione in fondo alla tabella per spostarti tra i risultati. Puoi visualizzare 25, 50 (impostazione predefinita) o 100 voci per pagina.

:::info
Le voci del registro di controllo vengono conservate automaticamente per un anno. Le voci più vecchie di 365 giorni vengono rimosse per mantenere il sistema performante.
:::

:::tip
Consulta il registro di controllo regolarmente, soprattutto dopo aver inserito nuovi membri del team o apportato modifiche significative alla configurazione. Aiuta a individuare tempestivamente attività inattese.
:::

## Articoli correlati {#related-articles}

- [Ruoli e autorizzazioni](../settings/roles-permissions.md) -- Gestisci chi ha accesso a cosa
- [Sicurezza dei dati](../settings/data-security.md) -- Scopri come vengono protetti i tuoi dati
- [Panoramica dei report](./index.md) -- Vedi tutti i report disponibili

---
title: "Registro di audit"
description: "Consulta il registro di audit in B1 Admin per vedere chi ha effettuato l'accesso, modificato le schede delle persone o cambiato i permessi, ed esporta in CSV le voci filtrate."
---

# Registro di audit

<div class="article-intro">

Il registro di audit traccia tutte le azioni e le modifiche significative nel tuo sistema di gestione della chiesa. Usalo per rivedere l'attività di accesso, tenere traccia di chi ha modificato le schede delle persone, monitorare gli aggiornamenti dei permessi e mantenere la responsabilità all'interno del tuo team.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Account B1 Admin con accesso di amministratore del server
- Vai in **Impostazioni** per trovare il Registro di audit

</div>

## Visualizzare il registro di audit

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin) ed espandi **Impostazioni**.
2. Fai clic su **Registro di audit**.
3. Il registro mostra le voci recenti in una tabella con le seguenti colonne:
   - **Data** -- Quando è stata eseguita l'azione.
   - **Categoria** -- Il tipo di azione (con colori diversi per una lettura rapida).
   - **Azione** -- Cosa è stato fatto (ad esempio create, update, delete, login_success).
   - **Entità** -- Il tipo e l'ID del record interessato.
   - **Indirizzo IP** -- L'indirizzo IP dell'utente che ha eseguito l'azione.
   - **Dettagli** -- Un riepilogo delle modifiche specifiche apportate.

## Filtrare il registro

Usa i filtri in alto nella pagina per restringere i risultati:

- **Categoria** -- Filtra per tipo di azione:
  - **Tutte le categorie** -- Mostra tutto.
  - **Accesso** -- Accessi riusciti e falliti.
  - **Persone** -- Creazione, modifica o eliminazione di schede persona.
  - **Permessi** -- Concessione e revoca di permessi.
  - **Donazioni** -- Modifiche ai record delle donazioni.
  - **Gruppi** -- Operazioni di gestione dei gruppi.
  - **Moduli** -- Attività di invio dei moduli.
  - **Impostazioni** -- Modifiche alla configurazione.
- **Data di inizio** -- Mostra le voci da questa data in poi.
- **Data di fine** -- Mostra le voci fino a questa data.

Fai clic su **Cerca** dopo aver impostato i filtri per aggiornare i risultati.

## Capire le categorie

Ogni categoria è contrassegnata da un colore per un riconoscimento immediato:

- **Accesso** -- Chip blu. Traccia i tentativi di accesso riusciti e falliti.
- **Persone** -- Chip viola. Traccia la creazione, la modifica e l'eliminazione delle schede persona.
- **Permessi** -- Chip rosso. Traccia quando i diritti di accesso vengono concessi o revocati.
- **Donazioni** -- Chip verde. Traccia le modifiche ai record delle donazioni.
- **Gruppi** -- Chip grigio. Traccia le operazioni di gestione dei gruppi.
- **Moduli** -- Chip arancione. Traccia l'attività di invio dei moduli.
- **Impostazioni** -- Chip giallo. Traccia le modifiche alla configurazione.

## Cronologia delle note su persone e gruppi

Se puoi aprire il registro di audit, vedi anche una traccia delle note modificate direttamente dove si trovano le note, nella scheda **Note** di una persona o di un gruppo:

1. Una nota modificata mostra **(modificata · vedi cronologia)** accanto alla sua data. Fai clic per aprire il registro di audit filtrato sulla cronologia delle note di quella persona o di quel gruppo.
2. Una nota eliminata lascia al suo posto un segnaposto grigio **Nota eliminata**, che mostra chi l'ha scritta, quando è stata pubblicata e quando è stata eliminata. Fai clic su **Visualizza cronologia** per aprire lo stesso registro filtrato.
3. Nel registro filtrato, espandi una voce **Nota aggiornata** o **Nota eliminata** per vedere il testo precedente e l'account che ha effettuato la modifica. Fai clic su **Mostra tutto** per rimuovere il filtro.
4. Nella colonna **Entità**, l'ID di una nota di persona o di gruppo rimanda alle note di quella persona o di quel gruppo.

Il personale che non può aprire il registro di audit vede l'elenco delle note senza questi segnaposto.

## Esportare il registro

Quando le voci del registro sono visualizzate, compare un pulsante **Download CSV**. Fai clic su di esso per esportare i risultati filtrati correnti in un foglio di calcolo, per una revisione offline o per la conservazione dei registri.

## Impaginazione

Usa i controlli di impaginazione in fondo alla tabella per scorrere i risultati. Puoi visualizzare 25, 50 o 100 voci per pagina.

:::info
Le voci del registro di audit vengono conservate automaticamente per un anno. Le voci più vecchie di 365 giorni vengono rimosse per mantenere il sistema efficiente.
:::

:::tip
Rivedi il registro di audit regolarmente, soprattutto dopo l'inserimento di nuovi membri del team o dopo aver apportato modifiche significative alla configurazione. Aiuta a individuare in anticipo attività inattese.
:::

## Articoli correlati

- [Ruoli e permessi](../settings/roles-permissions.md) -- gestisci chi ha accesso a cosa
- [Sicurezza dei dati](../settings/data-security.md) -- scopri come vengono protetti i tuoi dati
- [Panoramica dei report](./index.md) -- vedi tutti i report disponibili

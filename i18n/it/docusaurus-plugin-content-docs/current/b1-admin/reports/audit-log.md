---
title: "Registro di Audit"
---

# Registro di Audit

<div class="article-intro">

Il registro di audit traccia tutte le azioni e i cambiamenti significativi nel tuo sistema di gestione della chiesa. Usalo per rivedere l'attività di accesso, tracciare chi ha apportato modifiche ai record delle persone, monitorare gli aggiornamenti delle autorizzazioni e mantenere la responsabilità nel tuo team.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Account B1 Admin con accesso amministratore del server
- Vai a **Settings** per trovare il Registro di Audit

</div>

## Visualizzazione del Registro di Audit

1. Apri il [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin) ed espandi **Settings**.
2. Fai clic su **Audit Log**.
3. Il registro visualizza le voci recenti in una tabella con le seguenti colonne:
   - **Date** -- Quando è stata eseguita l'azione.
   - **Category** -- Il tipo di azione (codificato a colori per una scansione rapida).
   - **Action** -- Cosa è stato fatto (ad esempio, create, update, delete, login_success).
   - **Entity** -- Il tipo e l'ID del record che è stato interessato.
   - **IP Address** -- L'indirizzo IP dell'utente che ha eseguito l'azione.
   - **Details** -- Un riepilogo dei cambiamenti specifici apportati.

## Filtraggio del Registro

Usa i filtri in cima alla pagina per restringere i risultati:

- **Category** -- Filtra per tipo di azione:
  - **All Categories** -- Mostra tutto.
  - **Login** -- Successi e fallimenti di accesso.
  - **People** -- Creazione, aggiornamento o eliminazione di record di persone.
  - **Permissions** -- Concessioni e revoche di autorizzazioni.
  - **Donations** -- Cambiamenti nei record di donazione.
  - **Groups** -- Azioni di gestione del gruppo.
  - **Forms** -- Attività di invio di moduli.
  - **Settings** -- Cambiamenti di configurazione.
- **Start Date** -- Mostra voci da questa data in poi.
- **End Date** -- Mostra voci fino a questa data.

Fai clic su **Search** dopo aver impostato i tuoi filtri per aggiornare i risultati.

## Comprensione delle Categorie

Ogni categoria è codificata a colori per una rapida identificazione:

- **Login** -- Chip blu. Traccia i tentativi di accesso riusciti e non riusciti.
- **People** -- Chip viola. Traccia la creazione, l'aggiornamento e l'eliminazione dei record delle persone.
- **Permissions** -- Chip rosso. Traccia quando i diritti di accesso vengono concessi o revocati.
- **Donations** -- Chip verde. Traccia i cambiamenti nei record di donazione.
- **Groups** -- Chip grigio. Traccia le operazioni di gestione del gruppo.
- **Forms** -- Chip arancione. Traccia l'attività di invio di moduli.
- **Settings** -- Chip giallo. Traccia i cambiamenti di configurazione.

## Esportazione del Registro

Quando le voci del registro vengono visualizzate, appare un pulsante **CSV download**. Fai clic su di esso per esportare i risultati filtrati correnti in un foglio di calcolo per la revisione offline o la tenuta dei registri.

## Paginazione

Usa i controlli di paginazione in fondo alla tabella per navigare tra i risultati. Puoi visualizzare 25, 50 o 100 voci per pagina.

:::info
Le voci del registro di audit vengono automaticamente conservate per un anno. Le voci più vecchie di 365 giorni vengono rimosse per mantenere il sistema efficiente.
:::

:::tip
Rivedi il registro di audit regolarmente, soprattutto dopo l'onboarding di nuovi membri del team o dopo aver apportato cambiamenti significativi alla configurazione. Aiuta a identificare l'attività imprevista in anticipo.
:::

## Articoli Correlati

- [Ruoli e Autorizzazioni](../settings/roles-permissions) -- Gestisci chi ha accesso a cosa
- [Sicurezza dei Dati](../settings/data-security) -- Capire come sono protetti i tuoi dati
- [Panoramica dei Rapporti](./index.md) -- Vedi tutti i rapporti disponibili

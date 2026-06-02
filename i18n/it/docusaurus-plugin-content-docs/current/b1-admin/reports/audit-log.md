---
title: "Registro Di Controllo"
---

# Registro Di Controllo

<div class="article-intro">

Il registro di controllo traccia tutte le azioni e i cambiamenti significativi nel tuo sistema di gestione della chiesa. Utilizzalo per rivedere l'attività di accesso, tracciare chi ha apportato modifiche ai record delle persone, monitorare gli aggiornamenti dei permessi e mantenere la responsabilità in tutto il tuo team.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Account B1 Admin con accesso amministratore del server
- Accedi a **Impostazioni** per trovare il Registro Di Controllo

</div>

## Visualizzazione del Registro Di Controllo

1. Vai a **Impostazioni** in B1 Admin.
2. Seleziona **Registro Di Controllo**.
3. Il registro visualizza le voci recenti in una tabella con le seguenti colonne:
   - **Data** -- Quando si è verificata l'azione.
   - **Categoria** -- Il tipo di azione (codificato a colori per una scansione rapida).
   - **Azione** -- Cosa è stato fatto (ad es. create, update, delete, login_success).
   - **Entità** -- Il tipo e l'ID del record che è stato interessato.
   - **Indirizzo IP** -- L'indirizzo IP dell'utente che ha eseguito l'azione.
   - **Dettagli** -- Un riepilogo dei cambiamenti specifici apportati.

## Filtraggio del Registro

Usa i filtri in cima alla pagina per restringere i risultati:

- **Categoria** -- Filtra per tipo di azione:
  - **Tutte le Categorie** -- Mostra tutto.
  - **Accesso** -- Successi e fallimenti di accesso.
  - **Persone** -- Creazione, aggiornamento o eliminazione di record di persone.
  - **Autorizzazioni** -- Concessioni e revoche di autorizzazioni.
  - **Donazioni** -- Cambiamenti ai record di donazione.
  - **Gruppi** -- Azioni di gestione dei gruppi.
  - **Moduli** -- Attività di invio di moduli.
  - **Impostazioni** -- Cambiamenti di configurazione.
- **Data di Inizio** -- Mostra voci da questa data in avanti.
- **Data di Fine** -- Mostra voci fino a questa data.

Fai clic su **Ricerca** dopo aver impostato i tuoi filtri per aggiornare i risultati.

## Comprensione delle Categorie

Ogni categoria è codificata a colori per una rapida identificazione:

- **Accesso** -- Chip blu. Traccia i tentativi di accesso riusciti e falliti.
- **Persone** -- Chip viola. Traccia la creazione, l'aggiornamento e l'eliminazione dei record di persone.
- **Autorizzazioni** -- Chip rosso. Traccia quando i diritti di accesso vengono concessi o revocati.
- **Donazioni** -- Chip verde. Traccia i cambiamenti ai record di donazione.
- **Gruppi** -- Chip grigio. Traccia le operazioni di gestione dei gruppi.
- **Moduli** -- Chip arancione. Traccia l'attività di invio di moduli.
- **Impostazioni** -- Chip giallo. Traccia i cambiamenti di configurazione.

## Esportazione del Registro

Quando vengono visualizzate le voci del registro, appare un pulsante di **download CSV**. Fai clic per esportare i risultati filtrati attuali in un foglio di calcolo per la revisione offline o la conservazione dei record.

## Impaginazione

Usa i controlli di impaginazione in fondo alla tabella per navigare tra i risultati. Puoi visualizzare 25, 50 o 100 voci per pagina.

:::info
Le voci del registro di controllo vengono conservate automaticamente per un anno. Le voci più vecchie di 365 giorni vengono rimosse per mantenere il sistema performante.
:::

:::tip
Rivedi regolarmente il registro di controllo, specialmente dopo l'onboarding di nuovi membri del team o l'apportazione di cambiamenti significativi della configurazione. Aiuta a identificare l'attività inaspettata presto.
:::

## Articoli Correlati

- [Ruoli e Autorizzazioni](../settings/roles-permissions) -- Gestisci chi ha accesso a cosa
- [Sicurezza dei Dati](../settings/data-security) -- Comprendi come i tuoi dati sono protetti
- [Panoramica dei Rapporti](./index.md) -- Vedi tutti i rapporti disponibili

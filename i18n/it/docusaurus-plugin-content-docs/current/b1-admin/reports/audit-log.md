---
title: "Registro di Controllo"
---

# Registro di Controllo

<div class="article-intro">

Il registro di controllo tiene traccia di tutte le azioni e modifiche significative nel sistema di gestione della chiesa. Usalo per rivedere l'attività di accesso, tracciare chi ha effettuato modifiche ai record delle persone, monitorare gli aggiornamenti delle autorizzazioni e mantenere la responsabilità nel tuo team.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Account B1 Admin con accesso di amministratore del server
- Vai a **Impostazioni** per trovare il Registro di Controllo

</div>

## Visualizzazione del Registro di Controllo

1. Vai a **Impostazioni** in B1 Admin.
2. Seleziona **Registro di Controllo**.
3. Il registro visualizza le voci recenti in una tabella con le seguenti colonne:
   - **Data** -- Quando è accaduta l'azione.
   - **Categoria** -- Il tipo di azione (codificata a colori per una scansione veloce).
   - **Azione** -- Cosa è stato fatto (es. create, update, delete, login_success).
   - **Entità** -- Il tipo e l'ID del record interessato.
   - **Indirizzo IP** -- L'indirizzo IP dell'utente che ha eseguito l'azione.
   - **Dettagli** -- Un riepilogo delle modifiche specifiche apportate.

## Filtraggio del Registro

Usa i filtri nella parte superiore della pagina per limitare i risultati:

- **Categoria** -- Filtra per tipo di azione:
  - **Tutte le Categorie** -- Mostra tutto.
  - **Accesso** -- Accessi riusciti e non riusciti.
  - **Persone** -- Creazione, aggiornamento o eliminazione di record personali.
  - **Autorizzazioni** -- Concessioni e revoche di autorizzazioni.
  - **Donazioni** -- Modifiche ai record delle donazioni.
  - **Gruppi** -- Azioni di gestione del gruppo.
  - **Moduli** -- Attività di invio dei moduli.
  - **Impostazioni** -- Modifiche di configurazione.
- **Data di Inizio** -- Mostra le voci da questa data in poi.
- **Data di Fine** -- Mostra le voci fino a questa data.

Fai clic su **Cerca** dopo aver impostato i filtri per aggiornare i risultati.

## Comprensione delle Categorie

Ogni categoria è codificata a colori per un'identificazione rapida:

- **Accesso** -- Chip blu. Tiene traccia dei tentativi di accesso riusciti e non riusciti.
- **Persone** -- Chip viola. Tiene traccia delle creazioni, aggiornamenti ed eliminazioni di record personali.
- **Autorizzazioni** -- Chip rosso. Tiene traccia di quando i diritti di accesso vengono concessi o revocati.
- **Donazioni** -- Chip verde. Tiene traccia delle modifiche ai record delle donazioni.
- **Gruppi** -- Chip grigio. Tiene traccia delle operazioni di gestione del gruppo.
- **Moduli** -- Chip arancione. Tiene traccia dell'attività di invio dei moduli.
- **Impostazioni** -- Chip giallo. Tiene traccia delle modifiche di configurazione.

## Esportazione del Registro

Quando vengono visualizzate le voci del registro, appare un pulsante **Scarica CSV**. Fai clic su di esso per esportare i risultati filtrati correnti in un foglio di calcolo per la revisione offline o la conservazione dei record.

## Paginazione

Usa i controlli di paginazione nella parte inferiore della tabella per navigare tra i risultati. Puoi visualizzare 25, 50 o 100 voci per pagina.

:::info
Le voci del registro di controllo vengono automaticamente conservate per un anno. Le voci più vecchie di 365 giorni vengono rimosse per mantenere il sistema performante.
:::

:::tip
Rivedi il registro di controllo regolarmente, soprattutto dopo l'onboarding di nuovi membri del team o dopo significative modifiche di configurazione. Aiuta a identificare attività impreviste in anticipo.
:::

## Articoli Correlati

- [Ruoli e Autorizzazioni](../settings/roles-permissions) -- Gestisci chi ha accesso a cosa
- [Sicurezza dei Dati](../settings/data-security) -- Comprendi come i tuoi dati sono protetti
- [Panoramica dei Rapporti](./index) -- Vedi tutti i rapporti disponibili

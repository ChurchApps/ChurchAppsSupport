---
title: "Cercare persone"
---

# Cercare persone

<div class="article-intro">

La pagina **Persone** mostra l'elenco della tua comunità come una lista ricercabile di famiglie, oppure come una tabella ordinabile di singole persone. Puoi trovare rapidamente chiunque nella tua comunità, personalizzare le informazioni visualizzate ed esportare i risultati. Una ricerca efficiente è essenziale per le attività quotidiane di amministrazione della chiesa, come il follow-up dei visitatori, la preparazione degli elenchi di contatti e la gestione delle schede dei membri.

</div>

## Video di formazione

<YouTube id="7Y-tN9RmnDQ" title="Searching People and Building Lists in B1" next="Custom Fields, Bulk Editing, and Exporting in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account attivo di B1 Admin con il permesso di visualizzare le persone. Consulta [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Il tuo elenco della chiesa dovrebbe contenere delle persone. Se non hai ancora aggiunto nessuno, consulta [Aggiungere persone](adding-people.md) oppure [Importare dati](importing-data.md).

</div>

## Famiglie e visualizzazioni a tabella

La pagina Persone elenca la tua comunità per **famiglia**, in ordine alfabetico. Ogni riga mostra le foto della famiglia, il suo nome (ad esempio "La famiglia Rossi") e i nomi di tutti i suoi membri. Clicca su una famiglia per aprire la scheda del capofamiglia, oppure clicca sul nome di un membro per aprire quella persona. Un conteggio sopra l'elenco indica quante famiglie e quante persone sono visualizzate.

Usa il selettore **Visualizza come** sopra l'elenco per passare da **Famiglie** a **Tabella**. La vista **Tabella** elenca una persona per riga ed è dove puoi ordinare e scegliere le colonne (vedi sotto). B1 ricorda la tua scelta su questo dispositivo.

Di default la pagina carica la prima parte del tuo elenco. Se hai più persone, clicca su **Mostra tutti i membri** sotto l'elenco per caricarle tutte.

## Ricerca rapida

La casella **Trova una famiglia o una persona** in cima alla pagina Persone ti permette di trovare i membri in tempo reale:

1. Clicca sulla **casella di ricerca** in cima alla pagina Persone.
2. Inizia a digitare un nome.
3. I risultati si filtrano automaticamente mentre digiti (c'è un breve ritardo di circa mezzo secondo, così la ricerca non parte a ogni tasto premuto).
4. L'elenco sottostante si aggiorna mostrando solo i risultati corrispondenti.

Clicca su **Cancella** (sotto la casella di ricerca) per azzerare la ricerca e mostrare di nuovo l'intero elenco.

:::tip
Non serve premere Invio. La ricerca parte automaticamente quando smetti di digitare.
:::

## Ordinare i risultati

Nella vista **Tabella**, le persone sono elencate per cognome e poi per nome. Puoi ordinare l'elenco in modo diverso cliccando su qualsiasi intestazione di colonna:

1. Clicca su un'**intestazione di colonna** (ad esempio **Nome** o **Email**) per ordinare in base a quella colonna.
2. Clicca di nuovo sulla stessa intestazione per invertire l'ordine.

Così è facile trovare le persone in ordine alfabetico, per età o per qualsiasi altra colonna visibile.

## Personalizzare le colonne

Non tutte le informazioni devono essere visibili contemporaneamente. Puoi scegliere quali colonne compaiono nella tabella:

1. Clicca sull'icona **Seleziona colonne** nell'intestazione della pagina Persone. (Le colonne si applicano alla vista **Tabella**.)
2. Seleziona o deseleziona le colonne per mostrarle o nasconderle. Le colonne disponibili includono:
   - **Foto**
   - **Nome**
   - **Email**
   - **Telefono**
   - **Indirizzo**
   - **Data di nascita**
   - **Età**
   - **Sesso**
   - **Stato di appartenenza**
   - **Campus**
3. La tabella si aggiorna subito in base alle tue scelte. Clicca su **Fine** per chiudere la finestra **Seleziona colonne**.

### Mostrare i campi personalizzati come colonne

Il selettore di colonne ha due schede: **Standard** contiene le colonne predefinite elencate sopra, mentre **Personalizzati** contiene i [Campi personalizzati](../settings/custom-fields.md) della tua chiesa insieme alle domande di eventuali moduli per persone. Seleziona un campo personalizzato nella scheda **Personalizzati** per aggiungerlo come colonna, e il valore di ciascuna persona per quel campo compare nella tabella. I valori sono mostrati allo stesso modo che sulla scheda della persona: i campi Sì/No mostrano *Sì* o *No*, i campi a scelta multipla mostrano l'etichetta dell'opzione e le date sono mostrate in formato breve. Le persone senza un valore per il campo mostrano una cella vuota.

## Esportare i risultati di ricerca

Puoi scaricare in qualsiasi momento i risultati della ricerca corrente come file CSV:

1. Applica tutte le ricerche o i filtri che desideri.
2. Clicca sul pulsante **Esporta** nell'intestazione della pagina Persone.
3. Un file CSV verrà scaricato sul tuo computer, pronto per essere aperto in Excel, Google Sheets o qualsiasi altro foglio di calcolo.

Per maggiori dettagli sull'esportazione, consulta [Esportare dati](./exporting-data.md).

:::tip
Per query più avanzate — come trovare tutti quelli che non sono venuti da tre mesi — prova la funzione [Ricerca AI](./ai-search.md), che ti permette di cercare usando domande in linguaggio naturale.
:::

## Ricerca avanzata

La Ricerca avanzata ti permette di costruire filtri precisi combinando più condizioni. Aprila cliccando su **Avanzata** sotto la casella di ricerca nella pagina Persone, poi espandi una categoria e seleziona i campi su cui vuoi filtrare (puoi cliccare sul nome del campo o sulla sua casella), scegliendo per ciascuno un operatore e un valore. Le categorie includono **Nomi**, **Dati demografici**, **Contatto**, **Appartenenza**, **Attività** (donazioni e presenze) e **Campi personalizzati**.

La categoria **Campi personalizzati** elenca i [Campi personalizzati](../settings/custom-fields.md) della tua chiesa — i campi che definisci nelle Impostazioni per tenere traccia di informazioni specifiche (come la data di scadenza di un controllo dei precedenti penali). Gli operatori disponibili corrispondono al tipo di ciascun campo: i campi di testo supportano *contiene / uguale a / inizia con / finisce con*, i campi numerici supportano gli operatori di confronto, i campi data supportano *uguale a / dopo / prima di*, e i campi Sì/No e a scelta multipla ti permettono di selezionare un valore. Qualsiasi campo su cui puoi filtrare qui può essere salvato come [Elenco](./lists.md) dinamico.

## Salvare le ricerche come elenchi

Dopo aver eseguito una ricerca, nell'intestazione della pagina Persone compare il pulsante **Salva come elenco**. Cliccalo per memorizzare la query corrente con un nome e una categoria facoltativa, così potrai ricaricarla al volo nelle sessioni future. Vedi [Elenchi salvati](./lists.md) per tutti i dettagli.

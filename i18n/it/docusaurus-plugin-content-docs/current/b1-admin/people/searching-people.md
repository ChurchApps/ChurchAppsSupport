---
title: "Cercare persone"
---

# Cercare persone

<div class="article-intro">

La pagina **Persone** mostra l'anagrafica della tua chiesa come elenco ricercabile di nuclei familiari, oppure come tabella ordinabile di singole persone. Puoi trovare rapidamente chiunque nella tua comunità, personalizzare le informazioni visualizzate ed esportare i risultati. Una ricerca efficiente è essenziale per le attività quotidiane di amministrazione della chiesa, come il follow-up con i visitatori, la preparazione di elenchi di contatti e la gestione dei registri dei membri.

</div>

## Video tutorial

<YouTube id="7Y-tN9RmnDQ" title="Cercare persone e creare elenchi in B1" next="Campi personalizzati, modifica in blocco ed esportazione in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di visualizzare le persone. Vedi [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- L'anagrafica della tua chiesa dovrebbe contenere delle persone. Se non hai ancora aggiunto nessuno, vedi [Aggiungere persone](adding-people.md) oppure [Importare dati](importing-data.md).

</div>

## Nuclei familiari e viste a tabella

La pagina Persone elenca l'anagrafica per **nucleo familiare**, in ordine alfabetico. Ogni riga mostra le foto del nucleo, il suo nome (ad esempio "La famiglia Rossi") e i nomi di tutti i suoi membri. Clicca su un nucleo per aprire il profilo del capofamiglia, oppure clicca il nome di un membro per aprire quella persona. Un conteggio sopra l'elenco indica quanti nuclei e quante persone vengono mostrati.

Usa il selettore **Visualizza come** sopra l'elenco per passare da **Nuclei familiari** a **Tabella**. La vista **Tabella** elenca una persona per riga ed è dove puoi ordinare e scegliere le colonne (vedi sotto). B1 ricorda la tua scelta su questo dispositivo.

Per impostazione predefinita la pagina carica la prima parte dell'anagrafica. Se hai più persone, clicca **Mostra tutti i membri** sotto l'elenco per caricarle tutte.

## Ricerca rapida

La casella **Trova un nucleo o una persona** in alto nella pagina Persone ti permette di trovare i membri in tempo reale:

1. Clicca sulla **casella di ricerca** in alto nella pagina Persone.
2. Inizia a digitare un nome.
3. I risultati si filtrano automaticamente mentre digiti (c'è un breve ritardo di circa mezzo secondo, così la ricerca non parte a ogni tasto premuto).
4. L'elenco sottostante si aggiorna mostrando solo i risultati corrispondenti.

Clicca **Cancella** (sotto la casella di ricerca) per azzerare la ricerca e mostrare di nuovo l'intera anagrafica.

:::tip
Non serve premere Invio. La ricerca parte automaticamente quando smetti di digitare.
:::

## Ordinare i risultati

Nella vista **Tabella**, le persone sono elencate per cognome, poi per nome. Puoi ordinare l'anagrafica in modo diverso cliccando un'intestazione di colonna:

1. Clicca un'**intestazione di colonna** (ad esempio **Nome** o **Email**) per ordinare in base a quella colonna.
2. Clicca di nuovo la stessa intestazione per invertire l'ordine.

Così è facile trovare le persone in ordine alfabetico, per età o per qualsiasi altra colonna visibile.

## Personalizzare le colonne

Non tutte le informazioni devono essere visibili contemporaneamente. Puoi scegliere quali colonne appaiono nella tabella:

1. Clicca sull'icona **Seleziona colonne** nell'intestazione della pagina Persone. (Le colonne si applicano alla vista **Tabella**.)
2. Seleziona o deseleziona le colonne per mostrarle o nasconderle. Le colonne disponibili includono:
   - **Foto**
   - **Nome**
   - **Email**
   - **Telefono**
   - **Indirizzo**
   - **Data di nascita**
   - **Età**
   - **Genere**
   - **Stato di appartenenza**
   - **Sede**
   - **Data di inserimento** -- quando è stato creato il record della persona
3. La tabella si aggiorna subito in base alle tue scelte. Clicca **Fatto** per chiudere la finestra **Seleziona colonne**.

### Mostrare i campi personalizzati come colonne

Il selettore delle colonne ha due schede: **Standard** contiene le colonne predefinite elencate sopra, e **Personalizzati** contiene i tuoi [Campi personalizzati](../settings/custom-fields.md) insieme alle domande di eventuali moduli per persone. Seleziona un campo personalizzato nella scheda **Personalizzati** per aggiungerlo come colonna: il valore di ogni persona per quel campo compare nella tabella. I valori sono mostrati allo stesso modo che nella scheda della persona — i campi Sì/No mostrano *Sì* o *No*, i campi a scelta multipla mostrano l'etichetta dell'opzione e le date sono mostrate in formato breve. Le persone senza valore per il campo mostrano una cella vuota.

## Esportare i risultati di ricerca

Puoi scaricare in qualsiasi momento i risultati della ricerca attuale come file CSV:

1. Applica la ricerca o i filtri che desideri.
2. Clicca il pulsante **Esporta** nell'intestazione della pagina Persone.
3. Un file CSV verrà scaricato sul tuo computer, pronto per essere aperto in Excel, Google Fogli o qualsiasi applicazione per fogli di calcolo.

Per maggiori dettagli sull'esportazione, vedi [Esportare dati](./exporting-data.md).

:::tip
Per query più avanzate — come trovare tutti quelli che non vengono da tre mesi — prova la funzione [Ricerca IA](./ai-search.md), che permette di cercare usando domande in linguaggio naturale.
:::

## Ricerca avanzata

La Ricerca avanzata ti permette di costruire filtri precisi combinando più condizioni. Aprila cliccando **Avanzata** sotto la casella di ricerca nella pagina Persone, poi espandi una categoria e seleziona i campi su cui filtrare (puoi cliccare il nome del campo oppure la sua casella), scegliendo per ciascuno un operatore e un valore. Le categorie includono **Nomi**, **Dati demografici**, **Contatto**, **Appartenenza**, **Attività** (donazioni e presenze) e **Campi personalizzati**.

Per trovare le persone nuove, apri **Appartenenza** e seleziona **Data di inserimento**. Parte da **negli ultimi N giorni** con 30 già impostato, così puoi trovare con un solo clic tutti quelli aggiunti nell'ultimo mese; puoi cambiare il numero di giorni oppure passare a *uguale a / dopo / prima di* per scegliere una data. Anche **Data di nascita** e **Anniversario** offrono **negli ultimi N giorni**. La Data di inserimento viene registrata solo per le persone create dalla fine di ottobre 2026; per quelle aggiunte prima non c'è alcuna data, quindi questo filtro non le trova.

La categoria **Campi personalizzati** elenca i tuoi [Campi personalizzati](../settings/custom-fields.md) — i campi che definisci nelle Impostazioni per tenere traccia di informazioni tue (come la data di scadenza di una verifica del casellario). Gli operatori disponibili dipendono dal tipo di ogni campo: i campi di testo supportano *contiene / uguale a / inizia con / finisce con*, i campi numerici supportano gli operatori di confronto, i campi data supportano *uguale a / dopo / prima di*, e i campi Sì/No e a scelta multipla ti permettono di scegliere un valore. Ogni campo che puoi filtrare qui può essere salvato come [Elenco](./lists.md) attivo.

## Salvare le ricerche come elenchi

Dopo aver eseguito una ricerca, nell'intestazione della pagina Persone compare il pulsante **Salva come elenco**. Cliccalo per memorizzare la tua query con un nome e una categoria facoltativa, così potrai richiamarla subito nelle sessioni future. Vedi [Elenchi salvati](./lists.md) per tutti i dettagli.

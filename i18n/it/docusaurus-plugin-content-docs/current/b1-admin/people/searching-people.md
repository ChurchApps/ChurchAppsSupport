---
title: "Cercare persone"
---

# Cercare persone

<div class="article-intro">

La pagina **Persone** mostra la rubrica della chiesa come elenco ricercabile di nuclei familiari, oppure come tabella ordinabile di singole persone. Puoi trovare rapidamente chiunque nella tua comunità, personalizzare le informazioni visualizzate ed esportare i risultati. Una ricerca efficiente è essenziale per le attività quotidiane di amministrazione della chiesa, come il follow-up dei visitatori, la preparazione di elenchi di contatti e la gestione delle schede dei membri.

</div>

## Video di formazione

<YouTube id="7Y-tN9RmnDQ" title="Cercare persone e creare elenchi in B1" next="Campi personalizzati, modifica in blocco ed esportazione in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di visualizzare le persone. Vedi [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- La rubrica della tua chiesa deve contenere delle persone. Se non hai ancora aggiunto nessuno, vedi [Aggiungere persone](adding-people.md) oppure [Importare dati](importing-data.md).

</div>

## Nuclei familiari e viste a tabella

La pagina Persone elenca la rubrica per **nucleo familiare**, raggruppata in ordine alfabetico. Ogni riga mostra le foto del nucleo, il suo nome (ad esempio "Famiglia Rossi") e i nomi di tutte le persone che ne fanno parte. Clicca su un nucleo per aprire il profilo del capofamiglia, oppure clicca sul nome di un membro per aprire quella persona. Un contatore sopra l'elenco mostra quanti nuclei e quante persone sono visualizzati.

Usa il selettore **Visualizza come** sopra l'elenco per passare da **Nuclei familiari** a **Tabella**. La vista **Tabella** elenca una persona per riga ed è dove puoi ordinare e scegliere le colonne (vedi sotto). B1 ricorda la tua scelta su questo dispositivo.

Nella vista **Tabella**, lo stato di appartenenza di ciascuna persona compare sotto il suo nome, e ciascuno dei sette stati ha un proprio colore, lo stesso usato nel profilo della persona. Chiunque abbia il ruolo nel nucleo familiare impostato su **Figlio** mostra anche un'etichetta **Figlio** accanto allo stato. Per contrassegnare qualcuno come figlio, imposta il suo ruolo nel [pannello del nucleo familiare](./adding-people.md#managing-households) del suo profilo.

Per impostazione predefinita la pagina carica la prima parte della rubrica. Se hai più persone, clicca su **Mostra tutti i membri** sotto l'elenco per caricarle tutte.

## Ricerca rapida

La casella **Trova un nucleo o una persona** in cima alla pagina Persone ti permette di trovare i membri in tempo reale:

1. Clicca sulla **casella di ricerca** in cima alla pagina Persone.
2. Inizia a digitare un nome.
3. I risultati si filtrano automaticamente mentre digiti (c'è un breve ritardo di circa mezzo secondo, così la ricerca non parte a ogni tasto premuto).
4. L'elenco sotto si aggiorna mostrando solo i risultati corrispondenti.

Clicca su **Cancella** (sotto la casella di ricerca) per azzerare la ricerca e mostrare di nuovo l'intera rubrica.

:::tip
Non serve premere Invio. La ricerca parte automaticamente quando smetti di digitare.
:::

## Ordinare i risultati

Nella vista **Tabella**, le persone sono elencate per cognome, poi per nome. Puoi ordinare la rubrica in modo diverso cliccando su qualsiasi intestazione di colonna:

1. Clicca su un'**intestazione di colonna** (ad esempio **Nome** o **Email**) per ordinare per quella colonna.
2. Clicca di nuovo sulla stessa intestazione per invertire l'ordine.

Questo rende facile trovare le persone in ordine alfabetico, per età o per qualsiasi altra colonna visibile.

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
   - **Sede**
   - **Data di inserimento** -- quando è stata creata la scheda della persona
3. La tabella si aggiorna subito in base alle tue scelte. Clicca su **Fatto** per chiudere la finestra **Seleziona colonne**.

### Mostrare i campi personalizzati come colonne {#showing-custom-fields-as-columns}

Il selettore delle colonne ha due schede: **Standard** contiene le colonne predefinite elencate sopra, e **Personalizzati** contiene i [Campi personalizzati](../settings/custom-fields.md) della tua chiesa insieme alle domande di eventuali moduli per persone. Seleziona un campo personalizzato nella scheda **Personalizzati** per aggiungerlo come colonna, e il valore di ciascuna persona per quel campo compare nella tabella. I valori vengono mostrati come nel profilo della persona -- i campi Sì/No mostrano *Sì* o *No*, i campi a scelta multipla mostrano l'etichetta dell'opzione, e le date vengono mostrate in formato breve. Le persone senza un valore per il campo mostrano una cella vuota.

## Esportare i risultati di ricerca

Puoi scaricare in qualsiasi momento i risultati di ricerca correnti come file CSV:

1. Applica la ricerca o i filtri che desideri.
2. Clicca sul pulsante **Esporta** nell'intestazione della pagina Persone.
3. Un file CSV verrà scaricato sul tuo computer, pronto per essere aperto in Excel, Fogli Google o in qualsiasi altra applicazione di fogli di calcolo.

Per maggiori dettagli sull'esportazione, vedi [Esportare i dati](./exporting-data.md).

:::tip
Per ricerche più avanzate -- come trovare tutti coloro che non hanno partecipato negli ultimi tre mesi -- prova la funzione [Ricerca IA](./ai-search.md), che ti permette di cercare usando domande in linguaggio naturale.
:::

## Ricerca avanzata {#advanced-search}

La Ricerca avanzata ti permette di costruire filtri precisi combinando condizioni. Aprila cliccando su **Avanzata** sotto la casella di ricerca nella pagina Persone, poi espandi una categoria e seleziona i campi su cui vuoi filtrare (puoi cliccare sul nome del campo oppure sulla sua casella), scegliendo per ciascuno un operatore e un valore. Le categorie includono **Nomi**, **Dati demografici**, **Contatti**, **Appartenenza**, **Attività** (donazioni e presenze) e **Campi personalizzati**.

Per trovare le persone nuove, apri **Appartenenza** e seleziona **Data di inserimento**. Parte con l'opzione **negli ultimi N giorni** impostata su 30, così puoi trovare con un solo clic tutti quelli aggiunti nell'ultimo mese; cambia il numero di giorni, oppure passa a *uguale a / dopo / prima di* per scegliere una data. Anche **Data di nascita** e **Anniversario** offrono l'opzione **negli ultimi N giorni**. La Data di inserimento viene registrata solo per le persone create dalla fine di ottobre 2026; per quelle inserite prima non c'è alcuna data, quindi questo filtro non le trova.

La categoria **Campi personalizzati** elenca i [Campi personalizzati](../settings/custom-fields.md) della tua chiesa -- i campi che definisci nelle Impostazioni per tracciare informazioni tue (come la data di scadenza di una verifica del casellario). Gli operatori proposti corrispondono al tipo di ciascun campo: i campi di testo supportano *contiene / uguale a / inizia con / finisce con*, i campi numerici supportano gli operatori di confronto, i campi data supportano *uguale a / dopo / prima di*, e i campi Sì/No e a scelta multipla ti permettono di selezionare un valore. Qualsiasi campo su cui puoi filtrare qui può essere salvato come [Elenco](./lists.md) attivo.

## Salvare le ricerche come elenchi

Dopo aver eseguito una ricerca, nell'intestazione della pagina Persone compare il pulsante **Salva come elenco**. Cliccalo per memorizzare la tua query corrente con un nome e una categoria facoltativa, così potrai ricaricarla istantaneamente nelle sessioni future. Vedi [Elenchi salvati](./lists.md) per tutti i dettagli.

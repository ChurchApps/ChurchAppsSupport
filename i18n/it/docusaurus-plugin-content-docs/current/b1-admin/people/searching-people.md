---
title: "Cercare persone"
description: "Cerca nell'anagrafe delle persone di B1 Admin per nome, ordina e scegli le colonne nella vista a tabella, crea filtri con la Ricerca avanzata ed esporta i risultati in CSV."
---

# Cercare persone

<div class="article-intro">

La pagina **Persone** mostra l'anagrafe della chiesa come elenco ricercabile di nuclei familiari, oppure come tabella ordinabile di singole persone. Puoi trovare rapidamente chiunque nella comunità, personalizzare le informazioni visualizzate ed esportare i risultati. Una ricerca efficiente è essenziale per le attività quotidiane di amministrazione della chiesa, come il follow-up con i visitatori, la preparazione di elenchi di contatti e la gestione delle schede dei membri.

</div>

## Video tutorial {#training-video}

<YouTube id="7Y-tN9RmnDQ" title="Cercare persone e creare liste in B1" next="Campi personalizzati, modifica in blocco ed esportazione in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di visualizzare le persone. Vedi [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- L'anagrafe della chiesa deve contenere delle persone. Se non hai ancora aggiunto nessuno, vedi [Aggiungere persone](adding-people.md) oppure [Importare dati](importing-data.md).

</div>

## Viste per nucleo familiare e a tabella {#households-and-table-views}

La pagina Persone elenca l'anagrafe per **nucleo familiare**, raggruppata in ordine alfabetico. Ogni riga mostra le foto del nucleo, il suo nome (ad esempio, "Famiglia Rossi") e i nomi di tutti i suoi membri. Clicca su un nucleo per aprire la scheda del capofamiglia, oppure clicca sul nome di un membro per aprire quella persona. Un conteggio sopra l'elenco indica quanti nuclei familiari e quante persone vengono mostrati.

Usa il pulsante **Visualizza come** sopra l'elenco per passare da **Nuclei familiari** a **Tabella**. La vista **Tabella** elenca una persona per riga ed è dove puoi ordinare e scegliere le colonne (vedi sotto). B1 ricorda la tua scelta su quel dispositivo.

Nella vista **Tabella**, lo stato di membership di ciascuna persona compare sotto il nome, e ognuno dei sette stati ha un colore proprio, lo stesso usato nella scheda della persona. Chi ha il ruolo nel nucleo impostato su **Figlio** mostra anche un'etichetta **Figlio** accanto allo stato. Per indicare che una persona è un figlio, imposta il suo ruolo nel [pannello del nucleo familiare](./adding-people.md#managing-households) sulla sua scheda.

Per impostazione predefinita la pagina carica la prima parte dell'anagrafe. Se ci sono più persone, clicca su **Mostra tutti i membri** sotto l'elenco per caricarle tutte.

## Ricerca rapida {#quick-search}

La casella **Trova un nucleo o una persona** in cima alla pagina Persone ti permette di trovare i membri in tempo reale:

1. Clicca sulla **casella di ricerca** in cima alla pagina Persone.
2. Inizia a digitare un nome.
3. I risultati si filtrano automaticamente mentre scrivi (c'è un breve ritardo di circa mezzo secondo, così la ricerca non parte a ogni tasto premuto).
4. L'elenco sotto si aggiorna mostrando solo i risultati corrispondenti.

Clicca su **Cancella** (sotto la casella di ricerca) per azzerare la ricerca e tornare a mostrare l'intera anagrafe.

:::tip
Non serve premere Invio. La ricerca parte automaticamente quando smetti di scrivere.
:::

## Ordinare i risultati {#sorting-results}

Nella vista **Tabella**, le persone sono elencate per cognome, poi per nome. Puoi ordinare l'anagrafe in un altro modo cliccando su qualsiasi intestazione di colonna:

1. Clicca su un'**intestazione di colonna** (ad esempio **Nome** o **Email**) per ordinare in base a quella colonna.
2. Clicca di nuovo sulla stessa intestazione per invertire l'ordine.

Il primo clic ordina la colonna in modo crescente (dalla A alla Z, dal più giovane al più anziano, dalla data più vecchia), e la freccia accanto all'intestazione indica la direzione. Le persone senza un valore in quella colonna compaiono sempre per ultime. Così è facile trovare le persone in ordine alfabetico, per età o per qualsiasi altra colonna visibile.

## Personalizzare le colonne {#customizing-columns}

Non tutte le informazioni devono essere visibili contemporaneamente. Puoi scegliere quali colonne compaiono nella tabella:

1. Clicca sull'icona **Seleziona colonne** nell'intestazione della pagina Persone. (Le colonne si applicano alla vista **Tabella**, quindi selezionare una colonna passa anche la pagina alla vista **Tabella**.)
2. Seleziona o deseleziona le colonne per mostrarle o nasconderle. La scheda **Standard** offre:
   - **Foto** e **Nome visualizzato** (mostrati per impostazione predefinita)
   - **Cognome**, **Nome** e **Secondo nome**
   - **Indirizzo**, **Città**, **Provincia/Stato** e **CAP**
   - **Email principale** e **Telefono principale** (il cellulare, oppure il numero di casa o di lavoro quando non c'è un cellulare)
   - **Data di nascita**, **Compleanno (senza anno)** ed **Età**
   - **Genere**, **Stato di membership**, **Sede**, **Stato civile** e **Anniversario**
   - **Note per il cartellino**
   - **Data di inserimento** -- quando è stata creata la scheda della persona
   - **Opzione di eliminazione** -- aggiunge un'icona di eliminazione a ogni riga (disponibile solo se puoi modificare le persone)
3. La tabella si aggiorna subito in base alle tue selezioni. Clicca su **Fine** (oppure **Chiudi**) per chiudere la finestra **Seleziona colonne**. B1 ricorda le colonne scelte su quel dispositivo.

### Mostrare i campi personalizzati come colonne {#showing-custom-fields-as-columns}

Il selettore di colonne ha due schede: **Standard** contiene le colonne integrate elencate sopra, mentre **Personalizzati** contiene i [Campi personalizzati](../settings/custom-fields.md) della tua chiesa insieme alle domande di eventuali moduli Persone. Seleziona un campo personalizzato nella scheda **Personalizzati** per aggiungerlo come colonna: il valore di ciascuna persona per quel campo compare nella tabella. I valori sono mostrati come nella scheda della persona: i campi Sì/No mostrano *Sì* o *No*, i campi a scelta multipla mostrano l'etichetta dell'opzione, e le date sono mostrate in formato breve. Le persone senza un valore per il campo mostrano una cella vuota.


## Esportare i risultati di ricerca {#exporting-search-results}

Puoi scaricare in qualsiasi momento i risultati della ricerca attuale come file CSV:

1. Applica la ricerca o i filtri che desideri.
2. Clicca sul pulsante **Esporta** nell'intestazione della pagina Persone.
3. Sul tuo computer viene scaricato un file CSV, pronto per essere aperto con Excel, Google Sheets o qualsiasi altro programma per fogli di calcolo.

Per maggiori dettagli sull'esportazione, vedi [Esportare dati](./exporting-data.md).

:::tip
Per query più avanzate, come trovare tutti quelli che non sono venuti negli ultimi tre mesi, prova la funzione [Ricerca AI](./ai-search.md), che ti permette di cercare usando domande in linguaggio naturale.
:::

## Ricerca avanzata {#advanced-search}

La Ricerca avanzata ti permette di creare filtri precisi combinando condizioni. Aprila cliccando su **Avanzata** sotto la casella di ricerca nella pagina Persone, poi espandi una categoria e seleziona i campi su cui vuoi filtrare (puoi cliccare sul nome del campo oppure sulla sua casella), scegliendo per ciascuno un operatore e un valore. Le categorie includono **Nomi**, **Dati demografici**, **Dati di contatto**, **Membership e gruppi** (stato di membership, sede, data di inserimento e appartenenza ai gruppi), **Attività** (donazioni e presenze) e **Campi personalizzati**.

Non c'è un pulsante di ricerca: i risultati si aggiornano automaticamente circa mezzo secondo dopo aver cambiato un filtro, e le persone devono corrispondere a ogni filtro selezionato. I filtri attivi compaiono come etichette sopra le categorie: clicca sulla **x** di un'etichetta per rimuovere quel filtro, oppure su **Cancella tutto** per rimuoverli tutti. Clicca di nuovo su **Avanzata** per nascondere il pannello.

Per trovare le persone nuove, apri **Membership e gruppi** e seleziona **Data di inserimento**. Parte con **negli ultimi N giorni** e 30 già inserito, così puoi trovare con un clic tutti quelli aggiunti nell'ultimo mese; cambia il numero di giorni oppure passa a *uguale a / dopo / prima di* per scegliere una data. Anche **Data di nascita** e **Anniversario** offrono **negli ultimi N giorni**. La data di inserimento viene registrata solo per le persone create da fine ottobre 2026: le persone aggiunte in precedenza non hanno una data, quindi questo filtro non le trova.

La categoria **Campi personalizzati** elenca i [Campi personalizzati](../settings/custom-fields.md) della tua chiesa, cioè i campi che definisci nelle Impostazioni per tenere traccia di informazioni tue (come la data di scadenza di una verifica dei precedenti). Gli operatori proposti corrispondono al tipo di ciascun campo: i campi di testo supportano *contiene / uguale a / inizia con / finisce con*, i campi numerici supportano gli operatori di confronto, i campi data supportano *uguale a / dopo / prima di*, e i campi Sì/No e a scelta multipla ti permettono di scegliere un valore. Ogni campo su cui puoi filtrare qui può essere salvato come [Lista](./lists.md) dinamica.

## Salvare le ricerche come liste {#saving-searches-as-lists}

Dopo aver eseguito una ricerca che restituisce almeno una persona, nell'intestazione della pagina Persone compare il pulsante **Salva come lista** (per lo staff che può modificare le persone). Cliccalo per memorizzare la query attuale con un nome e una categoria facoltativa, così potrai ricaricarla subito nelle sessioni future. Vedi [Liste salvate](./lists.md) per tutti i dettagli.

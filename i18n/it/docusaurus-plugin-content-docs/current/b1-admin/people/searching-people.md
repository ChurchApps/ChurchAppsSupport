---
title: "Ricerca di Persone"
---

# Ricerca di Persone

<div class="article-intro">

La pagina **People** visualizza la directory della tua chiesa in una tabella ricercabile e ordinabile. Puoi trovare rapidamente chiunque nella tua congregazione, personalizzare quali informazioni vengono visualizzate ed esportare i tuoi risultati. La ricerca efficiente è essenziale per le attività quotidiane di amministrazione della chiesa come il follow-up con i visitatori, la preparazione di elenchi di contatti e la gestione dei record dei membri.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con autorizzazione per visualizzare le persone. Vedi [Ruoli e Autorizzazioni](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- La tua directory della chiesa dovrebbe avere persone in essa. Se non hai ancora aggiunto nessuno, vedi [Aggiunta di Persone](adding-people.md) o [Importazione di Dati](importing-data.md).

</div>

## Ricerca Rapida

La barra di ricerca in cima alla pagina People ti consente di trovare i membri in tempo reale:

1. Fai clic sulla **casella di ricerca** in cima alla pagina People.
2. Inizia a digitare un nome, un'e-mail o un'altra parola chiave.
3. I risultati si filtreranno automaticamente mentre digiti (c'è un breve ritardo di circa mezzo secondo in modo che la ricerca non si attivi ad ogni pressione di tasto).
4. La tabella sottostante si aggiorna per mostrare solo i risultati corrispondenti.

:::tip
Non hai bisogno di premere Invio. La ricerca viene eseguita automaticamente dopo aver smesso di digitare.
:::

## Ordinamento dei Risultati

Puoi ordinare la directory facendo clic su qualsiasi intestazione di colonna nella tabella:

1. Fai clic su un'**intestazione di colonna** (ad esempio, **Name** o **Email**) per ordinare per quella colonna.
2. Fai clic sulla stessa intestazione di nuovo per invertire l'ordine di ordinamento.

Questo rende facile trovare persone alfabeticamente, per età o da qualsiasi altra colonna visibile.

## Personalizzazione delle Colonne

Non è necessario che ogni informazione sia visibile contemporaneamente. Puoi scegliere quali colonne appare nella tabella:

1. Cerca il **selettore di colonna a discesa** vicino alla cima della tabella.
2. Seleziona o deseleziona le colonne per mostrarle o nasconderle. Le colonne disponibili includono:
   - **Photo**
   - **Name**
   - **Email**
   - **Phone**
   - **Address**
   - **Birth Date**
   - **Age**
   - **Gender**
   - **Membership Status**
   - **Campus**
3. La tabella si aggiorna immediatamente per riflettere le tue selezioni.

### Visualizzazione di Campi Personalizzati come Colonne

Il selettore di colonna ha due schede: **Standard** contiene le colonne integrate elencate sopra, e **Custom** contiene i [Campi Personalizzati](../settings/custom-fields.md) della tua chiesa insieme alle domande di qualsiasi modulo People. Seleziona un campo personalizzato sulla scheda **Custom** per aggiungerlo come colonna, e il valore di ogni persona per quel campo appare nella tabella. I valori vengono mostrati nello stesso modo in cui appaiono sul profilo della persona -- i campi Sì/No mostrano *Sì* o *No*, i campi Scelta Multipla mostrano l'etichetta dell'opzione, e le date vengono mostrate come date brevi. Le persone senza un valore per il campo mostrano una cella vuota.

:::info
Le scelte delle tue colonne influenzano ciò che è incluso quando esporti in CSV. Personalizza le colonne prima di esportare per ottenere esattamente i dati di cui hai bisogno.
:::

## Paginazione

Quando la tua directory ha molti record, i risultati sono divisi su più pagine. Usa i **controlli di paginazione** in fondo alla tabella per spostarti tra le pagine. La pagina attuale e il conteggio totale dei record sono visualizzati in modo che tu sappia sempre dove sei nell'elenco.

:::tip
Se desideri vedere più risultati contemporaneamente, affina la tua ricerca per restringere l'elenco piuttosto che scorrere una grande directory.
:::

## Esportazione dei Risultati di Ricerca

Puoi scaricare i tuoi attuali risultati di ricerca come file CSV in qualsiasi momento:

1. Applica qualsiasi ricerca o filtro che desideri.
2. Personalizza le tue colonne per includere i dati di cui hai bisogno.
3. Fai clic sul pulsante **Export**.
4. Un file CSV verrà scaricato sul tuo computer, pronto per essere aperto in Excel, Google Sheets o qualsiasi applicazione di foglio di calcolo.

Per ulteriori dettagli sull'esportazione, vedi [Esportazione di Dati](./exporting-data.md).

:::tip
Per query più avanzate -- come trovare tutti coloro che non hanno partecipato negli ultimi tre mesi -- prova la funzione [AI Search](./ai-search.md), che ti consente di cercare utilizzando domande in linguaggio naturale.
:::

## Ricerca Avanzata

Advanced Search ti consente di creare filtri precisi combinando condizioni. Aprila dalla pagina People, quindi espandi una categoria e seleziona i campi su cui desideri filtrare, scegliendo un operatore e un valore per ognuno. Le categorie includono **Names**, **Demographics**, **Contact**, **Membership**, **Activity** (donazioni e presenze), e **Custom Fields**.

La categoria **Custom Fields** elenca i [Campi Personalizzati](../settings/custom-fields.md) della tua chiesa -- i campi che definisci in Settings per tracciare le tue informazioni (come una data di scadenza del controllo dei precedenti). Gli operatori offerti corrispondono al tipo di ogni campo: i campi di testo supportano *contains / equals / starts with / ends with*, i campi numero supportano gli operatori di confronto, i campi data supportano *equals / after / before*, e i campi Sì/No e Scelta Multipla ti consentono di scegliere un valore. Qualsiasi campo su cui puoi filtrare qui può essere salvato come [List](./lists.md) dal vivo.

## Salvataggio delle Ricerche come List

Dopo aver eseguito una ricerca, un pulsante **Save as List** (icona di segnalibro) appare nell'intestazione della pagina People. Fai clic su di esso per memorizzare la tua query attuale sotto un nome e una categoria opzionale, in modo da poterla ricaricare istantaneamente in future sessioni. Vedi [Saved Lists](./lists.md) per i dettagli completi.

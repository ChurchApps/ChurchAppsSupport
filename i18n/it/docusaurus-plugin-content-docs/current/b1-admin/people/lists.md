---
title: "Liste salvate"
description: "Salva una ricerca Persone in B1 Admin come lista con nome, poi ricaricala con un solo clic. Le liste restano aggiornate, quindi i nuovi membri che corrispondono compaiono automaticamente."
---

# Liste salvate

<div class="article-intro">

Le **Liste salvate** ti permettono di memorizzare una query di ricerca con un nome e rieseguirla con un clic in qualsiasi momento. Crea una lista una volta sola (ad esempio "Membri attivi nella sede Nord", "Visitatori negli ultimi 90 giorni" o un filtro avanzato qualsiasi): resterà in cima alla pagina Persone e non dovrai mai più ricostruire la query.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Esegui almeno una ricerca nella sezione Persone, così hai dei risultati da salvare. Vedi [Cercare persone](./searching-people.md) oppure [Ricerca AI](./ai-search.md).
- Salvare, modificare ed eliminare le liste richiede il permesso **Modifica persone**. Vedi [Assegnare ruoli](./roles-permissions.md).

</div>

## Salvare una ricerca come lista {#saving-a-search-as-a-list}

1. Esegui una ricerca nella pagina **Persone**: una ricerca rapida, una ricerca AI oppure una ricerca con filtri avanzati.
2. Quando la ricerca trova almeno una persona, nell'intestazione della pagina Persone compare il pulsante **Salva come lista**.
3. Clicca su **Salva come lista**.
4. Inserisci un **Nome lista** (obbligatorio).
5. Facoltativamente, inserisci una **Categoria** per raggruppare liste correlate (ad esempio "Evangelizzazione" o "Membership").
6. Sotto **Chi può vedere questa lista**, scegli **Tutto lo staff** oppure **Solo io**.
7. Sotto **Corrispondenza**, scegli **Tutti i filtri** (le persone devono corrispondere a ogni filtro) oppure **Qualsiasi filtro** (le persone che corrispondono ad almeno un filtro).
8. Sotto **Includi nucleo familiare**, scegli **Solo le corrispondenze**, **Figli delle corrispondenze** (aggiunge anche i figli del nucleo familiare di ogni persona corrispondente) oppure **Intero nucleo familiare** (aggiunge tutti i membri del nucleo familiare di ogni persona corrispondente).
9. Facoltativamente, seleziona **Aggiorna ogni notte** (vedi [Aggiornamento notturno](#nightly-refresh) più sotto). Quando è selezionato, puoi anche selezionare **Inviami un'email quando cambia la membership**.
10. Clicca su **Salva**.

La lista è ora salvata e compare come pulsante nella riga delle liste salvate in cima alla pagina Persone, accanto a **Tutti**. Le liste contrassegnate **Solo io** mostrano una piccola icona a lucchetto.

:::info
Le liste impostate su **Tutto lo staff** sono condivise nella tua chiesa: chiunque abbia accesso a Persone può vederle e caricarle. Solo lo staff con il permesso appropriato può modificarle o eliminarle.
:::

## Caricare una lista salvata {#loading-a-saved-list}

In cima alla pagina Persone, clicca sul nome di una lista qualsiasi. La ricerca viene rieseguita immediatamente con la query memorizzata, aggiornando i risultati. Clicca su **Tutti** per tornare all'intera anagrafica.

Le liste sono raggruppate per categoria (se ne hai assegnata una), e quelle senza categoria compaiono per ultime.

:::tip
Le liste sono **query dinamiche**, non istantanee. Ogni volta che carichi una lista, la ricerca viene eseguita di nuovo sui dati attuali, quindi compaiono anche le nuove persone che ora corrispondono ai criteri.
:::

## Rinominare ed eliminare le liste {#renaming-and-deleting-lists}

Lo staff con il permesso di gestione può rinominare o eliminare qualsiasi lista dalla pagina Persone. Prima clicca sulla lista per caricarla: accanto al nome compaiono due icone:

- Clicca sull'icona **Impostazioni lista** (ingranaggio) per rinominarla o cambiarne la categoria e la condivisione. Le liste salvate con queste opzioni possono modificare qui anche **Includi nucleo familiare**, **Aggiorna ogni notte** e **Inviami un'email quando cambia la membership**. L'impostazione **Corrispondenza** non può essere modificata dopo il salvataggio della lista.
- Clicca sull'icona **Elimina** (cestino) per eliminarla (ti verrà chiesta una conferma).

## Aggiornamento notturno {#nightly-refresh}

Caricare una lista esegue sempre di nuovo la sua ricerca, indipendentemente dal fatto che **Aggiorna ogni notte** sia selezionato. **Aggiorna ogni notte** fa in modo che B1 riesegua la lista ogni notte e tenga traccia di chi vi è entrato o ne è uscito. Se hai selezionato **Inviami un'email quando cambia la membership**, dopo un aggiornamento notturno che ha aggiunto o rimosso qualcuno B1 ti invia un'email (a te, che hai salvato la lista) con il numero di persone aggiunte e rimosse. L'aggiornamento notturno invia anche le variazioni dei membri della lista alle tue [integrazioni](../integrations/index.md), come le etichette di Mailchimp.

## Casi d'uso {#use-cases}

| Scenario | Come creare la lista |
|---|---|
| Tutti i visitatori | Ricerca avanzata: Stato di membership = Visitatore |
| Membri di una sede specifica | Ricerca avanzata: Sede = [la tua sede] |
| Volontari con verifica dei precedenti scaduta | Ricerca avanzata: [Campo personalizzato](../settings/custom-fields.md) "Verifica precedenti scade" è prima di oggi |
| Risultati di una domanda posta all'AI | Fai una domanda in Ricerca AI, poi salva |

## Articoli correlati {#related-articles}

- [Cercare persone](./searching-people.md) — ricerca rapida e personalizzazione delle colonne
- [Ricerca AI](./ai-search.md) — query in linguaggio naturale che puoi salvare come liste
- [Campi personalizzati](../settings/custom-fields.md) — definisci i tuoi campi per le persone, poi filtra e salva liste su di essi
- [Dati demografici](./demographics.md) — approfondisci un grafico demografico in un filtro Persone, poi salvalo come lista
- [Modifica in blocco](./bulk-editing.md) — dopo aver caricato una lista, aggiorna in blocco tutti i suoi membri

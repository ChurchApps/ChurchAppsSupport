---
title: "Esportare dati"
description: "Esporta le persone in CSV, gli elenchi dei membri dei gruppi o un backup completo del database B1 da B1 Admin, e scopri cosa contiene lo zip di esportazione B1."
---

# Esportare dati

<div class="article-intro">

B1 Admin ti permette di esportare i dati della tua chiesa per usarli nei fogli di calcolo, condividerli con il tuo team o conservarne una copia di backup. Che tu abbia bisogno di un elenco rapido di nomi ed email o di un'esportazione completa del database, ci sono opzioni per ogni esigenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di visualizzare i dati che vuoi esportare. Vedi [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Per un'esportazione completa del database, ti serve l'accesso all'area **Impostazioni**.

</div>

## Esportare dalla pagina Persone {#exporting-from-the-people-page}

Il modo più rapido per esportare l'anagrafica è direttamente dalla pagina **Persone**:

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Persone** e clicca su **Persone**.
2. Usa la barra di ricerca o i filtri per restringere i risultati che vuoi esportare (oppure lascia tutto senza filtri per esportare tutti). Vedi [Cercare persone](searching-people.md) per suggerimenti sul filtraggio.
3. Clicca sul pulsante **Esporta** nell'intestazione della pagina Persone.
4. Sul tuo computer viene scaricato un file CSV chiamato `people.csv` con le persone presenti nei risultati attuali, inclusi nome, dati di contatto, indirizzo e altri campi standard. Se non hai effettuato una ricerca, l'esportazione include l'intera anagrafica, anche se la pagina mostra solo la prima parte.

:::tip
L'esportazione include tutte le persone dei risultati attuali. Esegui prima una ricerca, carica una [Lista salvata](./lists.md) oppure usa la ricerca **Avanzata** per esportare solo le persone che ti servono.
:::

## Esportazione completa dalle Impostazioni {#full-data-export-from-settings}

Per un'esportazione completa di tutti i dati di B1 (non solo delle persone), usa lo strumento di esportazione nelle Impostazioni:

1. Nel menu Jump, scegli **Impostazioni > Impostazioni**.
2. Clicca sul link **Importa/Esporta** sotto il nome della tua chiesa, in cima al menu delle impostazioni a sinistra.
3. Seleziona **Database B1** dal menu a tendina **Origine dati**.
4. Controlla l'anteprima dei dati e clicca su **Continua verso la destinazione**.
5. Seleziona **Zip di esportazione B1** come destinazione dell'esportazione.
6. Segui l'avanzamento dell'esportazione finché tutti gli elementi mostrano un segno di spunta verde.
7. Il file di esportazione viene scaricato automaticamente. Cerca il file `B1Export` nella cartella dei download.
8. Decomprimi il file per accedere ai singoli file CSV (come `people.csv`) che puoi aprire con Excel, Google Sheets o Numbers.

:::info
Lo Zip di esportazione B1 è un backup completo dei dati della tua chiesa. Contiene:

- persone (con le foto) e nuclei familiari, inclusi i contatti per il ritiro dei bambini
- sedi, culti e orari dei culti
- gruppi e membri dei gruppi
- fondi e donazioni, incluse le offerte ripartite su più fondi
- presenze
- moduli, domande, invii e risposte
- campi personalizzati e relativi valori
- liste di persone salvate

Se la foto di una persona non può essere scaricata o letta durante l'esportazione, quella foto viene saltata e l'esportazione prosegue senza di essa.

Per ripristinarlo, scegli **Zip di importazione B1** come origine e **Database B1** come destinazione (vedi [Importare dati](./importing-data.md)). Nuclei familiari, contatti per il ritiro e liste salvate vengono ricostruiti insieme alle persone. I filtri delle liste salvate vengono ricollegati ai gruppi, ai fondi, alle sedi e ai campi personalizzati ripristinati.
:::

## Esportare i dati dei gruppi {#exporting-group-data}

Puoi esportare anche gli elenchi dei membri dei singoli gruppi. Dalla pagina **Gruppi**, apri un gruppo e clicca sull'**icona di download** per esportare l'elenco dei membri di quel gruppo. Vedi [Membri del gruppo](../groups/group-members.md) per maggiori dettagli.

:::info
I file CSV esportati funzionano con tutte le principali applicazioni per fogli di calcolo, tra cui Microsoft Excel, Google Sheets e Apple Numbers.
:::

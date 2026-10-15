---
title: "Esportare i dati"
---

# Esportare i dati

<div class="article-intro">

B1 Admin ti permette di esportare i dati della tua chiesa per usarli in fogli di calcolo, condividerli con il tuo team o conservarne una copia di backup. Che tu abbia bisogno di un elenco rapido di nomi ed email o di un'esportazione completa del database, ci sono opzioni per ogni esigenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di visualizzare i dati che vuoi esportare. Consulta [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Per un'esportazione completa del database, ti serve l'accesso all'area **Impostazioni**.

</div>

## Esportare dalla pagina Persone

Il modo più rapido per esportare la rubrica è direttamente dalla pagina **Persone**:

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Persone** e fai clic su **Persone**.
2. Usa la barra di ricerca o i filtri per restringere i risultati che vuoi esportare (oppure lasciala senza filtri per esportare tutti). Consulta [Cercare persone](searching-people.md) per suggerimenti sul filtraggio.
3. Fai clic sul pulsante **Esporta** nell'intestazione della pagina Persone.
4. Sul tuo computer viene scaricato un file CSV con le persone presenti nei risultati correnti, inclusi nome, recapiti, indirizzo e altri campi standard.

:::tip
L'esportazione include tutti i risultati correnti. Esegui prima una ricerca, carica un [Elenco salvato](./lists.md) oppure usa la ricerca **Avanzata** per esportare solo le persone che ti servono.
:::

## Esportazione completa dei dati dalle Impostazioni

Per un'esportazione completa di tutti i tuoi dati B1 (non solo delle persone), usa lo strumento di esportazione nelle Impostazioni:

1. Nel menu Jump, scegli **Impostazioni > Impostazioni**.
2. Fai clic sul collegamento **Importa/Esporta** sotto il nome della tua chiesa, in cima al menu Impostazioni a sinistra.
3. Seleziona **Database B1** dal menu a tendina **Origine dati**.
4. Controlla l'anteprima dei dati e fai clic su **Continua verso la destinazione**.
5. Seleziona **Archivio ZIP B1 Export** come destinazione dell'esportazione.
6. Monitora l'avanzamento dell'esportazione finché tutti gli elementi mostrano il segno di spunta verde.
7. Il file di esportazione verrà scaricato automaticamente. Cerca il file `B1Export` nella cartella dei download.
8. Decomprimi il file per accedere ai singoli file CSV (come `people.csv`) che puoi aprire in Excel, Fogli Google o Numbers.

:::info
L'archivio ZIP B1 Export è un backup completo dei dati della tua chiesa. Contiene:

- persone (con le foto) e nuclei familiari, inclusi i contatti per il ritiro dei bambini
- campus, culti e orari di culto
- gruppi e membri dei gruppi
- fondi e donazioni, incluse le offerte suddivise su più fondi
- presenze
- moduli, domande, risposte e relative compilazioni
- campi personalizzati e i loro valori
- elenchi di persone salvati

Per ripristinarlo, scegli **Archivio ZIP B1 Import** come origine e **Database B1** come destinazione (consulta [Importare dati](./importing-data.md)). Nuclei familiari, contatti per il ritiro e liste salvate vengono ricostruiti insieme alle persone. I filtri delle liste salvate vengono ricollegati ai gruppi, ai fondi, ai campus e ai campi personalizzati ripristinati.
:::

## Esportare i dati dei gruppi

Puoi anche esportare gli elenchi dei membri per i singoli gruppi. Dalla pagina **Gruppi**, apri un gruppo e fai clic sull'**icona di download** per esportare l'elenco dei membri di quel gruppo. Consulta [Membri del gruppo](../groups/group-members.md) per maggiori dettagli.

:::info
I file CSV esportati funzionano con tutte le principali applicazioni per fogli di calcolo, tra cui Microsoft Excel, Fogli Google e Apple Numbers.
:::

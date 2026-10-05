---
title: "Esportazione dei Dati"
---

# Esportazione dei Dati

<div class="article-intro">

B1 Admin ti consente di esportare i dati della tua chiesa in modo da poterli utilizzare in fogli di calcolo, condividerli con il tuo team o mantenere un backup. Che tu abbia bisogno di un elenco veloce di nomi e indirizzi email o di un'esportazione completa del database, ci sono opzioni che si adattano alle tue esigenze.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con il permesso di visualizzare i dati che desideri esportare. Vedi [Ruoli e Autorizzazioni](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Per un'esportazione completa del database, devi avere accesso all'area **Impostazioni**.

</div>

## Esportazione dalla Pagina Persone

Il modo più veloce per esportare la tua directory è direttamente dalla pagina **Persone**:

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Persone** e fai clic su **Persone**.
2. Utilizza la barra di ricerca o i filtri per limitare i risultati che desideri esportare (o lascialo non filtrato per esportare tutti). Vedi [Ricerca Persone](searching-people.md) per suggerimenti sul filtraggio.
3. Utilizza il **selettore di colonne** per scegliere quali colonne desideri includere nell'esportazione (ad esempio, Nome, Email, Telefono, Indirizzo).
4. Fai clic sul pulsante **Esporta**.
5. Un file CSV scaricherà sul tuo computer con i dati attualmente mostrati nella tabella.

:::tip
Personalizza le tue colonne prima di esportare. Il file CSV includerà esattamente le colonne che hai visibile, in modo da poter personalizzare l'esportazione alle tue esigenze senza modificare il file in seguito.
:::

## Esportazione Completa dei Dati dalle Impostazioni

Per un'esportazione completa di tutti i tuoi dati B1 (non solo le persone), utilizza lo strumento di esportazione in Impostazioni:

1. Nel menu Jump, scegli **Impostazioni > Impostazioni**.
2. Fai clic sul pulsante **Importazione/Esportazione** in alto a destra dell'intestazione della pagina.
3. Seleziona **Database B1** dal dropdown **Fonte Dati**.
4. Esamina l'anteprima dei dati e fai clic su **Continua alla Destinazione**.
5. Seleziona **Esportazione B1 Zip** come destinazione di esportazione.
6. Monitora l'avanzamento dell'esportazione fino a quando tutti gli elementi non mostrano segni di spunta verdi.
7. Il file di esportazione scaricherà automaticamente. Cerca il file `B1Export` nella cartella dei download.
8. Decomprimi il file per accedere ai singoli file CSV (come `people.csv`) che puoi aprire in Excel, Google Sheets o Numbers.

:::info
Le esportazioni complete dei dati includono persone, gruppi, donazioni, frequenza e altro -- tutto nel tuo database B1. Questo è anche un ottimo modo per creare un backup periodico dei tuoi record della chiesa.
:::

## Esportazione dei Dati del Gruppo

Puoi anche esportare gli elenchi dei membri per i singoli gruppi. Dalla pagina **Gruppi**, apri un gruppo e fai clic sull'**icona di download** per esportare l'elenco dei membri di quel gruppo. Vedi [Membri del Gruppo](../groups/group-members.md) per maggiori dettagli.

:::info
I file CSV esportati funzionano con tutte le principali applicazioni di fogli di calcolo inclusi Microsoft Excel, Google Sheets e Apple Numbers.
:::

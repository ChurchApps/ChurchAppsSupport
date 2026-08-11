---
title: "Esportazione dati"
---

# Esportazione dati

<div class="article-intro">

B1 Admin ti permette di esportare i dati della tua chiesa in modo da poterli utilizzare nei fogli di calcolo, condividerli con il tuo team, o mantenere un backup. Sia che tu abbia bisogno di un rapido elenco di nomi e email o di un'esportazione completa del database, ci sono opzioni per adattarsi alle tue esigenze.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con il permesso di visualizzare i dati che desideri esportare. Vedi [Ruoli e autorizzazioni](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Per un'esportazione completa del database, hai bisogno di accesso all'area **Impostazioni**.

</div>

## Esportazione dalla pagina Persone

Il modo più veloce per esportare la tua directory è direttamente dalla pagina **Persone**:

1. Apri il **menu sezione** nell'angolo in alto a sinistra e scegli **Persone**.
2. Usa la barra di ricerca o i filtri per restringere i risultati che desideri esportare (o lascialo non filtrato per esportare tutti). Vedi [Ricerca persone](searching-people.md) per suggerimenti sul filtraggio.
3. Usa il **selettore di colonne** per scegliere quali colonne desideri includere nell'esportazione (ad esempio, Nome, Email, Telefono, Indirizzo).
4. Fai clic sul pulsante **Esporta**.
5. Un file CSV scaricherà sul tuo computer con i dati attualmente mostrati nella tabella.

:::tip
Personalizza le tue colonne prima di esportare. Il file CSV includerà esattamente le colonne che hai visibile, in modo da poter personalizzare l'esportazione alle tue esigenze senza modificare il file in seguito.
:::

## Esportazione completa dei dati dalle impostazioni

Per un'esportazione completa di tutti i tuoi dati B1 (non solo persone), usa lo strumento di esportazione in Impostazioni:

1. Apri il **menu sezione** nell'angolo in alto a sinistra e scegli **Impostazioni**.
2. Fai clic su **Importazione/Esportazione** nella navigazione superiore.
3. Seleziona **Database B1** dal dropdown **Fonte dati**.
4. Rivedi l'anteprima dei dati e fai clic su **Continua verso destinazione**.
5. Seleziona **B1 Export Zip** come destinazione di esportazione.
6. Monitora l'avanzamento dell'esportazione fino a quando tutti gli elementi mostrano i segni di spunta verdi.
7. Il file di esportazione scaricherà automaticamente. Cerca il file `B1Export` nella tua cartella dei download.
8. Estrai il file per accedere ai singoli file CSV (come `people.csv`) che puoi aprire in Excel, Google Sheets o Numbers.

:::info
Le esportazioni complete dei dati includono persone, gruppi, donazioni, presenze e altro ancora -- tutto nel tuo database B1. Questo è anche un ottimo modo per creare un backup periodico dei tuoi record di chiesa.
:::

## Esportazione dati del gruppo

Puoi anche esportare gli elenchi di membri per singoli gruppi. Dalla pagina **Gruppi**, apri un gruppo e fai clic sull'**icona di download** per esportare l'elenco di membri di quel gruppo. Vedi [Membri del gruppo](../groups/group-members.md) per più dettagli.

:::info
I file CSV esportati funzionano con tutte le principali applicazioni di fogli di calcolo incluse Microsoft Excel, Google Sheets e Apple Numbers.
:::

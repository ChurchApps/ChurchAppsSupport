---
title: "Esportare dati"
---

# Esportare dati

<div class="article-intro">

B1 Admin ti permette di esportare i dati della tua chiesa per utilizzarli in fogli di calcolo, condividerli con il tuo team o conservare un backup. Che tu abbia bisogno di un rapido elenco di nomi ed email o di un'esportazione completa del database, ci sono opzioni adatte alle tue esigenze.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con il permesso di visualizzare i dati che vuoi esportare. Consulta [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Per un'esportazione completa del database, hai bisogno di accesso all'area **Impostazioni**.

</div>

## Esportazione dalla pagina Persone

Il modo più rapido per esportare il tuo elenco è direttamente dalla pagina **Persone**:

1. Vai su **Persone** nella barra laterale sinistra.
2. Usa la barra di ricerca o i filtri per restringere i risultati che vuoi esportare (o lascia senza filtri per esportare tutti). Consulta [Ricerca persone](searching-people.md) per suggerimenti sui filtri.
3. Usa il **selettore colonne** per scegliere quali colonne vuoi includere nell'esportazione (ad esempio, Nome, Email, Telefono, Indirizzo).
4. Clicca sul pulsante **Esporta**.
5. Un file CSV verrà scaricato sul tuo computer con i dati attualmente visualizzati nella tabella.

:::tip
Personalizza le colonne prima di esportare. Il file CSV includerà esattamente le colonne che hai visibili, così puoi adattare l'esportazione alle tue esigenze senza dover modificare il file successivamente.
:::

## Esportazione completa dei dati dalle Impostazioni

Per un'esportazione completa di tutti i tuoi dati B1 (non solo le persone), usa lo strumento di esportazione nelle Impostazioni:

1. Clicca su **Impostazioni** nella barra laterale sinistra.
2. Clicca su **Importa/Esporta** nella navigazione superiore.
3. Seleziona **B1 Database** dal menu a discesa **Origine dati**.
4. Rivedi l'anteprima dei dati e clicca su **Continua alla destinazione**.
5. Seleziona **B1 Export Zip** come destinazione di esportazione.
6. Monitora l'avanzamento dell'esportazione fino a quando tutti gli elementi mostrano segni di spunta verdi.
7. Il file di esportazione verrà scaricato automaticamente. Cerca il file `B1Export` nella tua cartella dei download.
8. Decomprimi il file per accedere ai singoli file CSV (come `people.csv`) che puoi aprire in Excel, Google Sheets o Numbers.

:::info
Le esportazioni complete dei dati includono persone, gruppi, donazioni, presenze e altro ancora -- tutto ciò che è nel tuo database B1. È anche un ottimo modo per creare backup periodici dei registri della tua chiesa.
:::

## Esportazione dati dei gruppi

Puoi anche esportare gli elenchi dei membri per singoli gruppi. Dalla pagina **Gruppi**, apri un gruppo e clicca sull'**icona di download** per esportare l'elenco dei membri di quel gruppo. Consulta [Membri del gruppo](../groups/group-members.md) per maggiori dettagli.

:::info
I file CSV esportati funzionano con tutte le principali applicazioni di fogli di calcolo, inclusi Microsoft Excel, Google Sheets e Apple Numbers.
:::

---
title: "Esportazione dei dati"
---

# Esportazione dei dati

<div class="article-intro">

B1 Admin ti permette di esportare i dati della tua chiesa per usarli nei fogli di calcolo, condividerli con il tuo team o conservarne una copia di backup. Che ti serva un elenco rapido di nomi ed email o un'esportazione completa del database, ci sono opzioni adatte alle tue esigenze.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di visualizzare i dati che vuoi esportare. Consulta [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Per un'esportazione completa del database, ti serve l'accesso all'area **Impostazioni**.

</div>

## Esportazione dalla pagina Persone

Il modo più rapido per esportare la tua rubrica è direttamente dalla pagina **Persone**:

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Persone** e fai clic su **Persone**.
2. Usa la barra di ricerca o i filtri per restringere i risultati che vuoi esportare (oppure lasciala senza filtri per esportare tutti). Consulta [Cercare persone](searching-people.md) per suggerimenti sul filtraggio.
3. Fai clic sul pulsante **Esporta** nell'intestazione della pagina Persone.
4. Un file CSV verrà scaricato sul tuo computer con le persone presenti nei risultati correnti, inclusi nome, recapiti, indirizzo e altri campi standard.

:::tip
L'esportazione include tutti i presenti nei risultati correnti. Esegui una ricerca, carica un [Elenco salvato](./lists.md) o usa prima la ricerca **Avanzata** per esportare solo le persone che ti servono.
:::

## Esportazione completa dei dati dalle Impostazioni {#full-data-export-from-settings}

Per un'esportazione completa di tutti i tuoi dati B1 (non solo delle persone), usa lo strumento di esportazione nelle Impostazioni:

1. Nel menu Jump, scegli **Impostazioni > Impostazioni**.
2. Fai clic sul link **Importa/Esporta** sotto il nome della tua chiesa, in cima al menu delle impostazioni a sinistra.
3. Seleziona **Database B1** dal menu a tendina **Origine dati**.
4. Controlla l'anteprima dei dati e fai clic su **Continua verso la destinazione**.
5. Seleziona **Zip di esportazione B1** come destinazione dell'esportazione.
6. Controlla l'avanzamento dell'esportazione finché tutti gli elementi non mostrano una spunta verde.
7. Il file di esportazione verrà scaricato automaticamente. Cerca il file `B1Export` nella cartella dei download.
8. Decomprimi il file per accedere ai singoli file CSV (come `people.csv`) che puoi aprire con Excel, Fogli Google o Numbers.

:::info
Lo Zip di esportazione B1 è una copia di backup completa dei dati della tua chiesa. Contiene:

- persone (con foto) e nuclei familiari, inclusi i contatti per il ritiro dei minori
- sedi, servizi e orari di servizio
- gruppi e membri dei gruppi
- fondi e donazioni, inclusi i doni suddivisi tra più fondi
- presenze
- moduli, domande, risposte e compilazioni
- campi personalizzati e i loro valori
- elenchi di persone salvati

Se la foto di una persona non può essere scaricata o letta durante l'esportazione, quella foto viene saltata e l'esportazione prosegue senza di essa.

Per ripristinarlo, scegli **Zip di importazione B1** come origine e **Database B1** come destinazione (vedi [Importazione dei dati](./importing-data.md)). I nuclei familiari, i contatti per il ritiro e gli elenchi salvati vengono ricostruiti insieme alle persone. I filtri degli elenchi salvati vengono ricollegati ai gruppi, ai fondi, alle sedi e ai campi personalizzati ripristinati.
:::

## Esportazione dei dati dei gruppi

Puoi anche esportare gli elenchi dei membri di singoli gruppi. Dalla pagina **Gruppi**, apri un gruppo e fai clic sull'**icona di download** per esportare l'elenco dei membri di quel gruppo. Vedi [Membri dei gruppi](../groups/group-members.md) per maggiori dettagli.

:::info
I file CSV esportati funzionano con tutte le principali applicazioni per fogli di calcolo, tra cui Microsoft Excel, Fogli Google e Apple Numbers.
:::

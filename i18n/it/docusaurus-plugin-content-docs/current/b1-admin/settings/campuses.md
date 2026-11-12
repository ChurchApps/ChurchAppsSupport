---
title: "Campus"
description: "Configura i campus in B1 Admin per tenere traccia della sede a cui appartengono ogni persona e ogni gruppo, poi filtra persone, presenze e dati demografici per sede."
---

# Campus

<div class="article-intro">

Se la tua chiesa si riunisce in più sedi, i **Campus** ti permettono di tenere traccia della sede a cui appartengono ogni persona e ogni gruppo. Una volta configurati, i campus compaiono come opzione nelle schede delle persone, nella configurazione delle presenze e nella dashboard dei Dati demografici. Le chiese con più sedi possono filtrare, cercare e creare report per campus in tutto B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione **Modifica impostazioni chiesa** per gestire i campus. Vedi [Ruoli e autorizzazioni](./roles-permissions.md).

</div>

## Aprire le impostazioni dei campus {#opening-campus-settings}

In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), scegli **Impostazioni > Impostazioni** e fai clic su **Campus** nell'elenco a sinistra per scorrere fino alla sezione **Campus**. Puoi anche andarci direttamente all'indirizzo **/settings/campuses**. Vedrai un elenco di tutti i campus configurati con il loro nome, la posizione e il fuso orario.

## Aggiungere un campus {#adding-a-campus}

1. Fai clic su **Aggiungi campus**.
2. Compila i dettagli del campus:
   - **Nome** *(obbligatorio)* — il nome visualizzato in tutto B1 Admin (ad esempio, "Sede principale" o "Sede nord").
   - **Indirizzo** e **Indirizzo riga 2** — l'indirizzo stradale del campus (usato a scopo informativo; non coincide con l'indirizzo principale della chiesa nelle Impostazioni della chiesa).
   - **Città / Provincia / CAP** — la posizione del campus.
   - **Fuso orario** — il fuso orario IANA di questo campus (ad esempio, *America/Chicago*). [Gli orari di check-in](../attendance/setup.md#setting-a-check-in-schedule) dei servizi di questo campus si aprono e si chiudono in questo fuso orario. Se è impostato su **Nessuno**, viene usato invece il [Fuso orario](./church-settings.md#time-zone) della tua chiesa. È utile quando i campus si trovano in fusi orari diversi.
   - **Sito web** — un URL facoltativo per la presenza web di questo campus.
3. Fai clic su **Salva**.

L'elenco mostra il **Nome**, la **Posizione** (città e provincia) e il **Fuso orario** di ogni campus, e la voce **Campus** nell'elenco a sinistra indica quante sedi hai.

## Modificare un campus {#editing-a-campus}

Fai clic su una riga qualsiasi dell'elenco per aprire il suo editor nel pannello a destra. Aggiorna i campi e fai clic su **Salva**, oppure su **Annulla** per chiudere l'editor senza salvare.

## Eliminare un campus {#deleting-a-campus}

Apri un campus per modificarlo e fai clic su **Elimina**. Ti verrà chiesta conferma. Eliminare un campus non rimuove le persone a esso assegnate: il loro campo campus diventa semplicemente vuoto.

## Assegnare persone a un campus {#assigning-people-to-a-campus}

Dopo aver creato i campus, lo staff può assegnare una persona a un campus dalla sua scheda:

1. Apri la scheda di una persona in **Persone**.
2. Fai clic su **Modifica**.
3. Scegli il campus dal menu a discesa **Campus**.
4. Fai clic su **Salva**.

Puoi anche aggiornare il campus in blocco dalla pagina Persone. Seleziona più persone, usa **Modifica in blocco** e imposta il campo Campus per tutte insieme.

## Filtrare per campus {#filtering-by-campus}

Una volta configurati i campus, puoi filtrare in tutto B1 Admin per campus:

- **Ricerca Persone** — aggiungi una condizione Campus nella ricerca avanzata, oppure carica una [Lista salvata](../people/lists.md) limitata a un campus.
- **Dati demografici** — la [dashboard Dati demografici](../people/demographics.md) mostra un grafico a ciambella Campus quando almeno una persona ha un campus assegnato.
- **Configurazione presenze** — ogni orario di servizio nelle Presenze può essere collegato a un campus.

:::tip
Le chiese con una sola sede non hanno bisogno di configurare i campus. Tutte le funzioni legate ai campus sono facoltative: se non esistono campus, i campi e i grafici relativi semplicemente non compaiono.
:::

## Articoli correlati {#related-articles}

- [Impostazioni della chiesa](./church-settings.md) — l'indirizzo principale della chiesa e l'identità visiva (separati dagli indirizzi dei campus)
- [Dati demografici](../people/demographics.md) — il grafico di ripartizione per Campus
- [Configurazione presenze](../attendance/setup.md) — collega gli orari di servizio a un campus
- [Modifica in blocco](../people/bulk-editing.md) — assegna un campus a molte persone contemporaneamente

---
title: "Campus"
---

# Campus

<div class="article-intro">

Se la tua chiesa si riunisce in più di una posizione, i **Campus** ti permettono di tracciare quale sito ogni persona e gruppo appartiene. Una volta configurati, i campus appaiono come opzione sui profili delle persone, nella configurazione delle presenze e nel dashboard Demografica. Le chiese multi-sito possono filtrare, cercare e segnalare per campus in tutto B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno dell'autorizzazione **Modifica impostazioni chiesa** per gestire i campus. Vedi [Ruoli e autorizzazioni](./roles-permissions.md).

</div>

## Apertura delle impostazioni del campus

In B1 Admin, apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia), scegli **Impostazioni** e seleziona **Campus** dalla navigazione delle impostazioni. Vedrai un elenco di tutti i campus configurati con il loro nome, posizione e fuso orario.

## Aggiunta di un campus

1. Fai clic su **Aggiungi campus** (o il pulsante **+** se non esista ancora alcun campus).
2. Riempi i dettagli del campus:
   - **Nome** *(obbligatorio)* — il nome visualizzato mostrato in tutto B1 Admin (ad esempio, "Campus principale" o "Campus nord").
   - **Indirizzo** — l'indirizzo stradale del campus (utilizzato per visualizzazione informativa; non è lo stesso dell'indirizzo della tua chiesa principale nelle impostazioni della chiesa).
   - **Città / Stato / CAP** — la posizione del campus.
   - **Fuso orario** — il fuso orario IANA per questo campus (ad esempio, *America/Chicago*). Utile quando i campus si trovano in diversi fusi orari.
   - **Sito web** — un URL facoltativo per la propria presenza web di questo campus.
3. Fai clic su **Salva**.

## Modifica di un campus

Fai clic su qualsiasi riga di campus nell'elenco per aprire il suo editor nel pannello a destra. Aggiorna i campi e fai clic su **Salva**.

## Eliminazione di un campus

Apri un campus per la modifica e fai clic su **Elimina**. Ti verrà chiesto di confermare. L'eliminazione di un campus non rimuove le persone ad esso assegnate — il loro campo di campus diventa semplicemente vuoto.

## Assegnazione di persone a un campus

Dopo aver creato i campus, lo staff può assegnare una persona a un campus dal suo profilo:

1. Apri un record di persona in **Persone**.
2. Fai clic su **Modifica**.
3. Scegli il campus dal dropdown **Campus**.
4. Fai clic su **Salva**.

Puoi anche aggiornare il campus in massa dalla pagina Persone. Seleziona più persone, usa **Modifica in massa** e imposta il campo Campus per tutti in una volta.

## Filtro per campus

Una volta che i campus sono configurati, puoi filtrare in tutto B1 Admin per campus:

- **Ricerca persone** — aggiungi una condizione di campus nella ricerca avanzata, o carica una [Lista salvata](../people/lists.md) limitata a un campus.
- **Demografica** — il dashboard [Demografica](../people/demographics.md) mostra un grafico a ciambella del campus quando almeno una persona ha un campus assegnato.
- **Impostazione presenze** — ogni ora di servizio in Presenze può essere legata a un campus.

:::tip
Le chiese in una sola posizione non hanno bisogno di configurare i campus. Tutte le funzioni del campus sono facoltative — se non esista alcun campus, i campi del campus e i grafici semplicemente non appaiono.
:::

## Articoli correlati

- [Impostazioni chiesa](./church-settings.md) — il tuo indirizzo principale della chiesa e branding (separato dagli indirizzi del campus)
- [Demografica](../people/demographics.md) — il grafico di ripartizione del campus
- [Impostazione presenze](../attendance/setup.md) — collega gli orari di servizio a un campus
- [Modifica in massa](../people/bulk-editing.md) — assegna il campus a molte persone in una volta

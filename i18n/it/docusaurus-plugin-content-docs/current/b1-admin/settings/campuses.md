---
title: "Campus"
---

# Campus

<div class="article-intro">

Se la tua chiesa si riunisce in più di una sede, i **Campus** ti permettono di tracciare quale sito appartiene ogni persona e gruppo. Una volta configurati, i campus appaiono come opzione nei profili delle persone, nella configurazione delle presenze e nella dashboard Demografia. Le chiese multi-sito possono filtrare, cercare e fare rapporti per campus in tutto B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno dell'autorizzazione **Modifica impostazioni della chiesa** per gestire i campus. Vedi [Ruoli e autorizzazioni](./roles-permissions.md).

</div>

## Apertura delle impostazioni del campus

In B1 Admin, vai a **Impostazioni** nella barra laterale sinistra e seleziona **Campus** dalla navigazione Impostazioni. Vedrai un elenco di tutti i campus configurati con il loro nome, posizione e fuso orario.

## Aggiungere un campus

1. Fai clic su **Aggiungi campus** (o il pulsante **+** se non esistono ancora campus).
2. Compila i dettagli del campus:
   - **Nome** *(obbligatorio)* — il nome visualizzato in tutto B1 Admin (ad esempio, "Campus principale" o "Campus nord").
   - **Indirizzo** — l'indirizzo della strada del campus (usato per la visualizzazione informativa; non lo stesso dell'indirizzo principale della tua chiesa in Impostazioni della chiesa).
   - **Città / Stato / CAP** -- la posizione del campus.
   - **Fuso orario** — il fuso orario IANA per questo campus (ad esempio, *America/Chicago*). Utile quando i campus si trovano in diversi fusi orari.
   - **Sito web** — un URL facoltativo per la propria presenza web del campus.
3. Fai clic su **Salva**.

## Modifica di un campus

Fai clic su qualsiasi riga del campus nell'elenco per aprire il suo editor nel pannello a destra. Aggiorna i campi e fai clic su **Salva**.

## Eliminazione di un campus

Apri un campus per la modifica e fai clic su **Elimina**. Ti verrà chiesto di confermare. L'eliminazione di un campus non rimuove le persone assegnate a questo -- il loro campo campus diventa semplicemente vuoto.

## Assegnazione di persone a un campus

Dopo aver creato i campus, lo staff può assegnare una persona a un campus dal suo profilo:

1. Apri un record di una persona in **Persone**.
2. Fai clic su **Modifica**.
3. Scegli il campus dal menu a discesa **Campus**.
4. Fai clic su **Salva**.

Puoi anche aggiornare il campus in blocco dalla pagina Persone. Seleziona più persone, usa **Modifica in blocco** e imposta il campo Campus per tutti contemporaneamente.

## Filtraggio per campus

Una volta configurati i campus, puoi filtrare in tutto B1 Admin per campus:

- **Ricerca Persone** -- aggiungi una condizione Campus nella ricerca avanzata, o carica un [Elenco salvato](../people/lists.md) limitato a un campus.
- **Demografia** -- la [dashboard Demografia](../people/demographics.md) mostra un grafico a ciambella Campus quando almeno una persona ha un campus assegnato.
- **Configurazione presenze** -- ogni orario di servizio nelle Presenze può essere collegato a un campus.

:::tip
Le chiese con una singola sede non hanno bisogno di configurare i campus. Tutte le funzioni del campus sono facoltative -- se non esistono campus, i campi del campus e i grafici semplicemente non compaiono.
:::

## Articoli correlati

- [Impostazioni della chiesa](./church-settings.md) — il tuo indirizzo principale della chiesa e il branding (separato dagli indirizzi dei campus)
- [Demografia](../people/demographics.md) — il grafico di suddivisione del campus
- [Configurazione presenze](../attendance/setup.md) — collega gli orari dei servizi a un campus
- [Modifica in blocco](../people/bulk-editing.md) — assegna il campus a molte persone contemporaneamente

---
title: "Campus"
---

# Campus

<div class="article-intro">

Se la tua chiesa si riunisce in più di una sede, i **Campus** ti permettono di tracciare quale sito appartiene a ogni persona e gruppo. Una volta configurato, i campus appaiono come un'opzione nei profili delle persone, nella configurazione della partecipazione e nella dashboard dei dati demografici. Le chiese multi-sito possono filtrare, cercare e creare rapporti per campus in tutto B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- È necessaria l'autorizzazione **Edit Church Settings** per gestire i campus. Vedi [Roles & Permissions](./roles-permissions.md).

</div>

## Apertura delle impostazioni del campus

In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), scegli **Settings > Settings**, e seleziona la scheda **Campuses**. Puoi anche andare direttamente a **/settings/campuses**. Vedrai un elenco di tutti i campus configurati con il loro nome, posizione e fuso orario.

## Aggiunta di un campus

1. Fai clic su **Add Campus** (o il pulsante **+** se non esistono ancora campus).
2. Compila i dettagli del campus:
   - **Nome** *(obbligatorio)* — il nome visualizzato mostrato in tutto B1 Admin (ad esempio, "Campus principale" o "Campus nord").
   - **Indirizzo** — l'indirizzo stradale del campus (utilizzato per la visualizzazione informativa; non è lo stesso dell'indirizzo principale della chiesa nelle Impostazioni della chiesa).
   - **Città / Stato / CAP** — la posizione del campus.
   - **Fuso orario** — il fuso orario IANA per questo campus (ad esempio, *America/Chicago*). Utile quando i campus sono in diversi fusi orari.
   - **Sito web** — un URL facoltativo per la propria presenza web di questo campus.
3. Fai clic su **Salva**.

## Modifica di un campus

Fai clic su qualsiasi riga del campus nell'elenco per aprirne l'editor nel pannello a destra. Aggiorna i campi e fai clic su **Salva**.

## Eliminazione di un campus

Apri un campus per la modifica e fai clic su **Elimina**. Ti verrà chiesto di confermare. L'eliminazione di un campus non rimuove le persone assegnate ad esso: il loro campo campus diventa semplicemente vuoto.

## Assegnazione di persone a un campus

Dopo aver creato i campus, lo staff può assegnare una persona a un campus dal suo profilo:

1. Apri il record di una persona in **Persone**.
2. Fai clic su **Modifica**.
3. Scegli il campus dal menu a discesa **Campus**.
4. Fai clic su **Salva**.

Puoi anche aggiornare il campus in blocco dalla pagina Persone. Seleziona più persone, utilizza **Modifica in blocco**, e imposta il campo Campus per tutti in una volta.

## Filtraggio per campus

Una volta configurati i campus, puoi filtrare in B1 Admin per campus:

- **Ricerca di persone** — aggiungi una condizione Campus nella ricerca avanzata, o carica un [Elenco salvato](../people/lists.md) limitato a un campus.
- **Dati demografici** — la [dashboard dei dati demografici](../people/demographics.md) mostra un grafico a ciambella del Campus quando almeno una persona ha un campus assegnato.
- **Configurazione della partecipazione** — ogni ora di servizio in Partecipazione può essere legata a un campus.

:::tip
Le chiese in un'unica sede non hanno bisogno di configurare i campus. Tutte le funzioni del campus sono facoltative: se non esistono campus, i campi e i grafici del campus semplicemente non appaiono.
:::

## Articoli correlati

- [Church Settings](./church-settings.md) — l'indirizzo principale della chiesa e il marchio (separato dagli indirizzi del campus)
- [Demographics](../people/demographics.md) — il grafico della suddivisione del Campus
- [Attendance Setup](../attendance/setup.md) — collega gli orari dei servizi a un campus
- [Bulk Editing](../people/bulk-editing.md) — assegna il campus a molte persone in una volta

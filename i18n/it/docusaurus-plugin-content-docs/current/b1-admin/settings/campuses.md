---
title: "Campus"
---

# Campus

<div class="article-intro">

Se la tua chiesa si riunisce in più di una località, i **Campus** ti permettono di tracciare quale sito appartiene ogni persona e gruppo. Una volta configurati, i campus appaiono come un'opzione nei profili delle persone, nella configurazione della partecipazione e nella dashboard Dati Demografici. Le chiese multi-sito possono filtrare, cercare e rapporto per campus in tutto B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso **Edit Church Settings** per gestire i campus. Vedi [Ruoli e Permessi](./roles-permissions.md).

</div>

## Apertura delle Impostazioni del Campus

In B1 Admin, apri il **menu della sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia), scegli **Settings** e seleziona **Campuses** dalla navigazione delle Impostazioni. Vedrai un elenco di tutti i campus configurati con il loro nome, posizione e fuso orario.

## Aggiunta di un Campus

1. Fai clic su **Add Campus** (o il pulsante **+** se non esistono ancora campus).
2. Compila i dettagli del campus:
   - **Name** *(obbligatorio)* — il nome visualizzato in tutto B1 Admin (ad esempio, "Main Campus" o "North Campus").
   - **Address** — l'indirizzo stradale del campus (utilizzato per il display informativo; non è lo stesso dell'indirizzo principale della tua chiesa nelle Impostazioni della Chiesa).
   - **City / State / Zip** — la posizione del campus.
   - **Timezone** — il fuso orario IANA per questo campus (ad esempio, *America/Chicago*). Utile quando i campus sono in fusi orari diversi.
   - **Website** — un URL opzionale per la propria presenza web del campus.
3. Fai clic su **Save**.

## Modifica di un Campus

Fai clic su qualsiasi riga di campus nell'elenco per aprire il suo editor nel pannello a destra. Aggiorna i campi e fai clic su **Save**.

## Eliminazione di un Campus

Apri un campus per la modifica e fai clic su **Delete**. Ti verrà chiesto di confermare. L'eliminazione di un campus non rimuove le persone assegnate a esso — il loro campo di campus diventa semplicemente vuoto.

## Assegnazione di Persone a un Campus

Dopo aver creato i campus, lo staff può assegnare una persona a un campus dal suo profilo:

1. Apri il record di una persona in **People**.
2. Fai clic su **Edit**.
3. Scegli il campus dal menu a discesa **Campus**.
4. Fai clic su **Save**.

Puoi anche aggiornare il campus in blocco dalla pagina People. Seleziona più persone, usa **Bulk Edit** e imposta il campo Campus per tutti contemporaneamente.

## Filtraggio per Campus

Una volta configurati i campus, puoi filtrare in tutto B1 Admin per campus:

- **People search** — aggiungi una condizione Campus nella ricerca avanzata, o carica una [Lista Salvata](../people/lists.md) scoped a un campus.
- **Demographics** — la dashboard [Dati Demografici](../people/demographics.md) mostra un grafico a ciambella del Campus quando almeno una persona ha un campus assegnato.
- **Attendance Setup** — ogni time di servizio in Attendance può essere legato a un campus.

:::tip
Le chiese in una singola ubicazione non hanno bisogno di configurare i campus. Tutte le funzioni di campus sono opzionali — se non esistono campus, i campi e i grafici del campus semplicemente non appaiono.
:::

## Articoli Correlati

- [Impostazioni della Chiesa](./church-settings.md) — il tuo indirizzo e branding principale della chiesa (separato dagli indirizzi del campus)
- [Dati Demografici](../people/demographics.md) — il grafico di ripartizione del Campus
- [Attendance Setup](../attendance/setup.md) — collega i time di servizio a un campus
- [Modifica in Blocco](../people/bulk-editing.md) — assegna il campus a molte persone contemporaneamente

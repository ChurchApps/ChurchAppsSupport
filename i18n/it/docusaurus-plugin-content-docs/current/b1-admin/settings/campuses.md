---
title: "Sedi"
---

# Sedi

<div class="article-intro">

Se la tua chiesa si riunisce in più di un luogo, le **Sedi** ti permettono di tenere traccia di quale sede appartiene a ciascuna persona e a ciascun gruppo. Una volta configurate, le sedi compaiono come opzione nei profili delle persone, nella configurazione delle presenze e nella dashboard Demographics. Le chiese multi-sede possono filtrare, cercare e creare report per sede in tutto B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso **Edit Church Settings** per gestire le sedi. Vedi [Ruoli e permessi](./roles-permissions.md).

</div>

## Aprire le impostazioni delle sedi

In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), scegli **Settings > Settings** e clicca su **Campuses** nell'elenco a sinistra per scorrere fino alla sezione **Campuses**. Puoi anche andare direttamente a **/settings/campuses**. Vedrai un elenco di tutte le sedi configurate con nome, posizione e fuso orario.

## Aggiungere una sede

1. Clicca su **Add Campus**.
2. Compila i dati della sede:
   - **Name** *(obbligatorio)* — il nome visualizzato in tutto B1 Admin (ad esempio "Main Campus" o "North Campus").
   - **Address** — l'indirizzo stradale della sede (usato a scopo informativo; non coincide con l'indirizzo principale della chiesa nelle Impostazioni della chiesa).
   - **City / State / Zip** — la posizione della sede.
   - **Time Zone** — il fuso orario IANA di questa sede (ad esempio *America/Chicago*). Le [pianificazioni dei check-in](../attendance/setup.md#setting-a-check-in-schedule) per i servizi di questa sede si aprono e si chiudono in questo fuso orario. Se è impostato su **None**, viene usato il [Time Zone](./church-settings.md#time-zone) della chiesa. È utile quando le sedi si trovano in fusi orari diversi.
   - **Website** — un URL facoltativo per la presenza web della sede.
3. Clicca su **Save**.

## Modificare una sede

Clicca su una riga qualsiasi dell'elenco per aprire il suo editor nel pannello a destra. Aggiorna i campi e clicca su **Save**.

## Eliminare una sede

Apri una sede per modificarla e clicca su **Delete**. Ti verrà chiesta conferma. Eliminare una sede non rimuove le persone che vi sono assegnate -- il loro campo sede diventa semplicemente vuoto.

## Assegnare persone a una sede

Dopo aver creato le sedi, lo staff può assegnare una persona a una sede dal suo profilo:

1. Apri il profilo di una persona in **People**.
2. Clicca su **Edit**.
3. Scegli la sede dal menu a discesa **Campus**.
4. Clicca su **Save**.

Puoi anche aggiornare la sede in blocco dalla pagina People. Seleziona più persone, usa **Bulk Edit** e imposta il campo Campus per tutte in una volta.

## Filtrare per sede

Una volta configurate le sedi, puoi filtrare per sede in tutto B1 Admin:

- **Ricerca persone** — aggiungi una condizione Campus nella ricerca avanzata, oppure carica una [Lista salvata](../people/lists.md) limitata a una sede.
- **Demographics** — la [dashboard Demographics](../people/demographics.md) mostra un grafico a ciambella Campus quando almeno una persona ha una sede assegnata.
- **Configurazione presenze** — ogni orario di servizio nelle presenze può essere collegato a una sede.

:::tip
Le chiese con una sola sede non hanno bisogno di configurare le sedi. Tutte le funzioni relative alle sedi sono facoltative: se non esistono sedi, i campi e i grafici relativi non compaiono.
:::

## Articoli correlati

- [Impostazioni della chiesa](./church-settings.md) — l'indirizzo principale della chiesa e il branding (separati dagli indirizzi delle sedi)
- [Demographics](../people/demographics.md) — il grafico di ripartizione per sede
- [Configurazione presenze](../attendance/setup.md) — collega gli orari di servizio a una sede
- [Modifica in blocco](../people/bulk-editing.md) — assegna una sede a molte persone contemporaneamente

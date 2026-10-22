---
title: "Campus"
---

# Campus {#campuses}

<div class="article-intro">

Se la tua chiesa si riunisce in più sedi, i **Campus** ti permettono di tenere traccia della sede a cui appartiene ogni persona e ogni gruppo. Una volta configurati, i campus compaiono come opzione nei profili delle persone, nella configurazione delle presenze e nella Dashboard demografica. Le chiese con più sedi possono filtrare, cercare e creare report per campus in tutto B1 Admin.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso **Modifica impostazioni della chiesa** per gestire i campus. Consulta [Ruoli e permessi](./roles-permissions.md).

</div>

## Aprire le impostazioni dei campus {#opening-campus-settings}

In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), scegli **Impostazioni > Impostazioni**, poi fai clic su **Campus** nell'elenco a sinistra per scorrere fino alla sezione **Campus**. Puoi anche andare direttamente a **/settings/campuses**. Vedrai un elenco di tutti i campus configurati con nome, posizione e fuso orario.

## Aggiungere un campus {#adding-a-campus}

1. Fai clic su **Aggiungi campus**.
2. Compila i dettagli del campus:
   - **Nome** *(obbligatorio)* — il nome visualizzato in tutto B1 Admin (ad esempio "Campus principale" o "Campus Nord").
   - **Indirizzo** — l'indirizzo stradale del campus (usato solo a scopo informativo; non coincide con l'indirizzo principale della chiesa nelle Impostazioni della chiesa).
   - **Città / Provincia / CAP** — la posizione del campus.
   - **Fuso orario** — il fuso orario IANA di questo campus (ad esempio *America/Chicago*). [Gli orari di check-in](../attendance/setup.md#setting-a-check-in-schedule) per i servizi di questo campus si aprono e chiudono in questo fuso orario. Se è impostato su **Nessuno**, viene usato invece il [Fuso orario](./church-settings.md#time-zone) della tua chiesa. È utile quando i campus si trovano in fusi orari diversi.
   - **Sito web** — un URL facoltativo per la presenza web del campus.
3. Fai clic su **Salva**.

## Modificare un campus {#editing-a-campus}

Fai clic su una riga qualsiasi dell'elenco dei campus per aprire il relativo editor nel pannello a destra. Aggiorna i campi e fai clic su **Salva**.

## Eliminare un campus {#deleting-a-campus}

Apri un campus per la modifica e fai clic su **Elimina**. Ti verrà chiesto di confermare. Eliminare un campus non rimuove le persone assegnate: il loro campo campus diventa semplicemente vuoto.

## Assegnare persone a un campus {#assigning-people-to-a-campus}

Dopo aver creato i campus, il personale può assegnare una persona a un campus dal suo profilo:

1. Apri la scheda di una persona in **Persone**.
2. Fai clic su **Modifica**.
3. Scegli il campus dal menu a discesa **Campus**.
4. Fai clic su **Salva**.

Puoi anche aggiornare il campus in blocco dalla pagina Persone. Seleziona più persone, usa **Modifica in blocco** e imposta il campo Campus per tutte insieme.

## Filtrare per campus {#filtering-by-campus}

Una volta configurati i campus, puoi filtrare in tutto B1 Admin per campus:

- **Ricerca persone** — aggiungi una condizione Campus nella ricerca avanzata, oppure carica un [Elenco salvato](../people/lists.md) limitato a un campus.
- **Demografia** — la [Dashboard demografica](../people/demographics.md) mostra un grafico a ciambella per Campus quando almeno una persona ha un campus assegnato.
- **Configurazione presenze** — ogni orario di servizio nelle Presenze può essere collegato a un campus.

:::tip
Le chiese con una sola sede non hanno bisogno di configurare i campus. Tutte le funzioni legate ai campus sono facoltative: se non esistono campus, i relativi campi e grafici semplicemente non compaiono.
:::

## Articoli correlati {#related-articles}

- [Impostazioni della chiesa](./church-settings.md) — l'indirizzo principale della chiesa e il branding (separati dagli indirizzi dei campus)
- [Demografia](../people/demographics.md) — il grafico di ripartizione per Campus
- [Configurazione presenze](../attendance/setup.md) — collega gli orari di servizio a un campus
- [Modifica in blocco](../people/bulk-editing.md) — assegna il campus a molte persone contemporaneamente

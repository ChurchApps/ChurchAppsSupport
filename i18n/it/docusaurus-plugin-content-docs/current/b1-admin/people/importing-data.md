---
title: "Importare dati"
---

# Importare dati

<div class="article-intro">

B1 Admin rende facile importare i dati dei membri esistenti nel sistema. Che tu stia migrando da un'altra piattaforma di gestione della chiesa o caricando record da un foglio di calcolo, gli strumenti di importazione ti evitano di inserire manualmente ogni persona. Puoi importare da un file CSV o migrare direttamente da Breeze ChMS.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con accesso alle **Impostazioni**. Consulta [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Tieni pronti i dati dei membri in un foglio di calcolo o esportati dal tuo sistema precedente.
- Se stai migrando da Breeze, assicurati di aver prima esportato i file People, Tags e Contributions da Breeze.

</div>

## Importazione da CSV

Se hai dati dei membri in un foglio di calcolo o in un altro sistema, puoi importarli utilizzando un file CSV (valori separati da virgola).

1. Vai su **Impostazioni** nella barra laterale sinistra.
2. Clicca su **Importa/Esporta** nella navigazione superiore.
3. Seleziona **B1 Import Zip** dal menu a discesa **Origine dati**.
4. Clicca sul link per **scaricare i file di esempio** per vedere il formato previsto.
5. Apri il file di esempio `people.csv` e sostituisci i dati di esempio con i tuoi. Mantieni intatta la riga di intestazione.
6. Se hai foto dei membri, aggiungile alla cartella usando immagini 400x300px, nominandole in modo che corrispondano ai numeri `importKey` nel tuo CSV.
7. Comprimi i file modificati in un file zip.
8. Di nuovo in B1 Admin, clicca su **Carica** e seleziona il tuo file zip.
9. Rivedi l'anteprima dei dati e clicca su **Continua alla destinazione**.
10. Verifica che **B1 Database** sia selezionato, rivedi il riepilogo dell'importazione e clicca su **Avvia trasferimento**.
11. Attendi il completamento dell'importazione, poi clicca su **Vai a B1** per tornare alla tua dashboard.

:::tip
Scarica e rivedi sempre prima i file di esempio. Rispettare il formato delle colonne previsto eviterà errori di importazione.
:::

:::warning
L'importazione dei dati aggiungerà nuovi record al tuo database. Se importi lo stesso file due volte, potresti ritrovarti con voci duplicate. Controlla attentamente il file prima di avviare il trasferimento.
:::

## Importazione da Breeze ChMS

Se stai migrando da Breeze, B1 ha un'opzione di importazione dedicata che gestisce la conversione automaticamente.

1. In Breeze, vai su **Impostazioni** e clicca su **Esporta** nella barra laterale sinistra.
2. Esporta tre file: **People**, **Tags** e **Contributions**.
3. Seleziona tutti e tre i file esportati, fai clic destro e comprimili in un unico file zip.
4. In B1 Admin, vai su **Impostazioni** poi **Importa/Esporta**.
5. Seleziona **Breeze Import Zip** dal menu a discesa **Origine dati**.
6. Carica il tuo file zip e segui i passaggi sullo schermo per rivedere e completare l'importazione.

:::info
L'importazione da Breeze trasferisce persone, foto, gruppi, donazioni, presenze, moduli e altro ancora -- offrendoti una migrazione completa in un solo passaggio.
:::

## Dopo l'importazione

Una volta completata l'importazione, prenditi qualche minuto per verificare i tuoi dati:

1. Sfoglia la pagina [Persone](../people/adding-people.md) e controlla a campione alcuni profili.
2. Verifica che nomi, email, numeri di telefono e indirizzi siano stati importati correttamente.
3. Controlla che i collegamenti familiari siano intatti.
4. Rivedi eventuali [gruppi](../groups/creating-groups.md) o tag che sono stati importati.

Se noti problemi, puoi modificare i singoli profili direttamente dalla pagina Persone. Puoi anche [esportare i tuoi dati](exporting-data.md) in qualsiasi momento per creare un backup.

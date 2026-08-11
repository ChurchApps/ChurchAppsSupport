---
title: "Importazione dati"
---

# Importazione dati

<div class="article-intro">

Lo strumento B1 Transfer rende facile portare i tuoi dati esistenti in B1, che tu stia iniziando fresco da un foglio di calcolo, stia eseguendo la migrazione da un'altra piattaforma di gestione della chiesa, o stia importando record di donazioni. Può anche essere utilizzato per esportare o eseguire il backup dei tuoi dati in qualsiasi momento.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con accesso a **Impostazioni**.
- Hai i tuoi dati esportati e pronti dal tuo sistema precedente prima di iniziare.
- Questo strumento è destinato alla migrazione dei dati iniziale. Se utilizzi B1 già da un po', l'importazione di nuovo potrebbe creare record duplicati.

</div>

## Accesso allo strumento di trasferimento

1. Accedi a **B1 Admin**.
2. Apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Impostazioni**.
3. Fai clic sul pulsante **Importazione/Esportazione** nell'angolo in alto a destra dell'intestazione della pagina.
4. Questo aprirà lo strumento **B1 Transfer** in una nuova scheda a [transfer.b1.church](https://transfer.b1.church).

Lo strumento di trasferimento ti guida attraverso quattro passaggi: Fonte, Anteprima, Destinazione ed Esegui.

---

## Passaggio 1 - Scegli la tua fonte

Seleziona da dove provengono i tuoi dati. Ci sono sette opzioni:

- **Database B1** — Estrae i dati direttamente dalla tua chiesa B1 esistente. Utile per fare un backup o convertire i tuoi dati in un altro formato. Devi essere connesso per usare questa opzione.
- **B1 Import Zip** — Un file zip nel formato proprio di B1. Questo è utilizzato principalmente per ripristinare un'esportazione B1 precedente.
- **Breeze Import Zip** — Un file zip contenente i file esportati da Breeze ChMS.
- **Planning Center Zip** — Un file zip o CSV esportato da Planning Center.
- **CSV / Excel personalizzato** — Qualsiasi file CSV o Excel contenente dati di persone. Dopo il caricamento, mapperai le tue colonne ai campi B1 prima che l'importazione proceda.
- **Tithe.ly CSV** — Un file di esportazione di persone o donazioni da Tithe.ly (formato CSV o Excel accettato).
- **CCB / Pushpay CSV** — Un CSV di esportazione di persone o donazioni da Church Community Builder o Pushpay.

Puoi trascinare e rilasciare il tuo file nell'area di caricamento, oppure fare clic per sfogliarlo.

---

## Passaggio 1b - Mappa i tuoi campi (solo CSV / Excel personalizzato)

Se hai selezionato **CSV / Excel personalizzato**, dopo il caricamento del file lo strumento mostrerà una schermata di mappatura dei campi prima di passare all'anteprima.

Ogni colonna dal tuo file è elencata accanto a un valore di esempio. Per ogni colonna, usa il dropdown per scegliere il campo B1 corrispondente. Lo strumento rileverà automaticamente i nomi di colonna comuni come "Nome", "Email" o "CAP", ma dovresti revisionare ogni riga e correggere tutto ciò che ha perso.

I campi B1 disponibili includono:

- Nome, Cognome, Secondo Nome, Soprannome, Nome Visualizzato, Titolo/Prefisso, Suffisso
- Email, Telefono casa, Telefono cellulare, Telefono lavoro
- Indirizzo linea 1, Indirizzo linea 2, Città, Stato, CAP
- Data di nascita, Genere, Stato civile, Stato di iscrizione
- Nome famiglia
- Nome gruppo — assegna la persona a un gruppo per nome
- **Risposta modulo (campo personalizzato)** — salva il valore della colonna come campo personalizzato allegato al record della persona. Se usi questa opzione, ti verrà chiesto di dare un nome al modulo.

Le colonne che non desideri importare possono essere impostate su **(Ignora)**. Almeno un campo del nome (Nome o Cognome) deve essere mappato prima di poter continuare.

Fai clic su **Conferma mappatura e importa** per procedere all'anteprima.

---

## Passaggio 2 - Anteprima dei tuoi dati

Dopo il caricamento, lo strumento visualizza un'anteprima di tutto ciò che verrà importato. Usa le schede per revisionare ogni tipo di dati:

- **Persone** — Elencate per famiglia, con foto se incluse.
- **Gruppi** — Organizzati per campus, servizio, ora e categoria.
- **Presenze** — Date di sessione, gruppi e conteggi di visite.
- **Donazioni** — Lotti, fondi, donatori e importi.
- **Moduli** — Nomi moduli e tipi di contenuto.

Rivedi questo attentamente prima di procedere. Se qualcosa sembra sbagliato, fai clic su **Ricomincia** e correggi il tuo file di origine.

---

## Passaggio 3 - Scegli la tua destinazione

Seleziona dove desideri che vadano i dati:

- **Database B1** — Importa direttamente nel database B1 della tua chiesa. Dopo aver selezionato questo, lo strumento mostrerà un conteggio finale dei record da aggiungere. Fai clic su **Avvia trasferimento** per confermare.
- **B1 Export Zip** — Scarica i tuoi dati come file zip in formato B1. Buono per backup.
- **Breeze Export Zip** — Converte i tuoi dati nel formato Breeze.
- **Planning Center Zip** — Converte i tuoi dati nel formato Planning Center.

:::warning
La fonte e la destinazione non possono essere lo stesso formato. Se corrispondono, lo strumento ti avvertirà per prevenire la duplicazione accidentale.
:::

---

## Passaggio 4 - Esegui

Lo strumento elabora il trasferimento e mostra l'avanzamento per ogni passaggio:

- Campus, servizi e orari
- Persone
- Foto
- Gruppi e membri del gruppo
- Donazioni
- Presenze
- Moduli, domande, risposte e invii di moduli
- Compressione (solo per destinazioni di file zip)

:::warning
Non chiudere il tuo browser mentre il trasferimento è in esecuzione. Aspetta fino a quando tutti i passaggi non mostrino come completi.
:::

---

## Preparazione di un Breeze Import Zip

1. In Breeze, vai a **Impostazioni** e fai clic su **Esporta** nella barra laterale sinistra.
2. Esporta tre file separati: **Persone**, **Tag** e **Contributi**.
3. Seleziona tutti e tre i file, fai clic con il pulsante destro del mouse e comprimili in un singolo file zip.
   - Su un Mac: seleziona i file, fai clic con il pulsante destro del mouse e scegli **Comprimi**.
   - Su un PC: seleziona i file, fai clic con il pulsante destro del mouse, scegli **Invia a**, quindi **Cartella compressa (zipped)**.
4. Carica il file zip usando l'opzione **Breeze Import Zip** nel passaggio 1.

L'importazione Breeze trasferisce automaticamente i record di persone, gruppi (tag) e donazioni.

---

## Preparazione di un'esportazione Planning Center

1. In Planning Center, esporta i tuoi dati di persone come file CSV o zip.
2. Caricalo usando l'opzione **Planning Center Zip** nel passaggio 1.

---

## Preparazione di un'esportazione Tithe.ly

1. In Tithe.ly, esporta i tuoi dati di **Persone** come file CSV o Excel. Puoi anche esportare un file **Donazioni** separato se desideri portare i record di donazione.
2. Lo strumento rileverà automaticamente se il file contiene persone o dati di donazione in base ai nomi delle colonne.
3. Carica il file usando l'opzione **Tithe.ly CSV** nel passaggio 1.

:::info
Le esportazioni Tithe.ly possono essere importate un file alla volta. Esegui il processo due volte se hai bisogno di importare sia record di persone che di donazioni separatamente.
:::

---

## Preparazione di un'esportazione CCB o Pushpay

1. In Church Community Builder o Pushpay, esporta i tuoi dati di **Persone** come file CSV. Puoi anche esportare un file separato di donazioni/contributi.
2. Lo strumento rileverà automaticamente se il file contiene persone o dati di donazione in base ai nomi delle colonne.
3. Carica il file usando l'opzione **CCB / Pushpay CSV** nel passaggio 1.

---

## Dopo l'importazione

Una volta completato il trasferimento, dedica alcuni minuti a verificare i tuoi dati:

1. Sfoglia la pagina [Persone](../people/adding-people.md) e fai un controllo di spot su alcuni profili.
2. Conferma che nomi, email, numeri di telefono e indirizzi sono stati trasferiti correttamente.
3. Controlla che le connessioni familiari siano intatte.
4. Rivedi tutti i gruppi importati e i record di donazione.

Se noti problemi, puoi modificare singoli profili dalla pagina Persone. Puoi anche eseguire di nuovo lo strumento di trasferimento per [esportare i tuoi dati](exporting-data.md) come backup.

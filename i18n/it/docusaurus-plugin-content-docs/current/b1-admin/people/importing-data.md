---
title: "Importazione dei Dati"
---

# Importazione dei Dati

<div class="article-intro">

Lo strumento B1 Transfer rende facile portare i tuoi dati esistenti in B1, sia che tu stia iniziando da zero da un foglio di calcolo, migrando da un'altra piattaforma di gestione della chiesa o importando record di donazioni. Può anche essere utilizzato per esportare o eseguire il backup dei tuoi dati in qualsiasi momento.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con accesso alle **Impostazioni**.
- Esporta i tuoi dati e tienili pronti dal tuo sistema precedente prima di iniziare.
- Questo strumento è destinato alla migrazione iniziale dei dati. Se stai già usando B1 da un po' di tempo, l'importazione di nuovo potrebbe creare record duplicati.

</div>

## Accesso allo Strumento di Trasferimento

1. Accedi a **B1 Admin**.
2. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e fai clic su **Impostazioni**.
3. Fai clic sul pulsante **Importazione/Esportazione** in alto a destra dell'intestazione della pagina.
4. Questo aprirà lo strumento **B1 Transfer** in una nuova scheda in [transfer.b1.church](https://transfer.b1.church).

Lo strumento di trasferimento ti guida attraverso quattro passaggi: Sorgente, Anteprima, Destinazione ed Esecuzione.

---

## Passo 1 - Scegli la Tua Sorgente

Seleziona da dove provengono i tuoi dati. Ci sono sette opzioni:

- **Database B1** — Estrae i dati direttamente dalla tua chiesa B1 esistente. Utile per fare un backup o convertire i tuoi dati in un altro formato. Devi essere connesso per utilizzare questa opzione.
- **Zip di Importazione B1** — Un file zip nel formato proprio di B1. Questo è utilizzato principalmente per ripristinare un'esportazione B1 precedente.
- **Zip di Importazione Breeze** — Un file zip contenente file esportati da Breeze ChMS.
- **Zip di Planning Center** — Un file zip o CSV esportato da Planning Center.
- **CSV/Excel Personalizzato** — Qualsiasi file CSV o Excel contenente dati di persone. Dopo il caricamento, mapperai le tue colonne ai campi B1 prima che l'importazione proceda.
- **CSV di Tithe.ly** — Un file di esportazione di persone o donazioni da Tithe.ly (formato CSV o Excel accettato).
- **CSV di CCB / Pushpay** — Un CSV di esportazione di persone o donazioni da Church Community Builder o Pushpay.

Puoi trascinare il tuo file nell'area di caricamento, o fare clic per cercare.

---

## Passo 1b - Mappa i Tuoi Campi (Solo CSV/Excel Personalizzato)

Se hai selezionato **CSV/Excel Personalizzato**, dopo il caricamento del tuo file lo strumento mostrerà una schermata di mapping dei campi prima di passare all'anteprima.

Ogni colonna dal tuo file è elencata insieme a un valore di esempio. Per ogni colonna, utilizza il dropdown per scegliere il campo B1 corrispondente. Lo strumento rileverà automaticamente i nomi di colonna comuni come "First Name", "Email" o "Zip Code", ma dovresti esaminare ogni riga e correggere qualsiasi cosa abbia perso.

I campi B1 disponibili includono:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — assegna la persona a un gruppo per nome
- **Campo personalizzato (corrispondenza per nome)** — salva la colonna in uno dei [campi persona personalizzati](../settings/custom-fields.md) della tua chiesa. Appare una casella **Nome campo B1**, precompilata con l'intestazione della colonna. Modificala con il nome del campo esattamente come appare in B1 (maiuscole e minuscole non contano).
- **Form Answer (custom field)** — salva il valore di quella colonna come campo personalizzato allegato al record della persona. Se utilizzi questa opzione, ti verrà chiesto di dare un nome al modulo.

Le date possono essere in formati comuni come `9/17/1994` e vengono convertite automaticamente. Per i campi personalizzati, i campi Sì/No accettano valori come Yes, No, Y, N, True, False, 1 e 0, e i campi a scelta multipla accettano il testo della scelta o il suo valore.

:::info
Crea i tuoi campi persona personalizzati in B1 Admin prima di importare. Quando l'importazione è terminata, il passaggio **Campi Personalizzati** elenca tutti i nomi di colonna che non corrispondono a un campo B1 e conta tutti i valori che non si adattano al tipo di campo. Questi valori vengono saltati e il resto dell'importazione si completa comunque.
:::

Le colonne che non desideri importare possono essere impostate su **(Salta)**. Almeno un campo nome (First Name o Last Name) deve essere mappato prima di poter continuare.

Fai clic su **Conferma Mapping e Importa** per procedere all'anteprima.

---

## Passo 2 - Anteprima dei Tuoi Dati

Dopo il caricamento, lo strumento visualizza un'anteprima di tutto ciò che verrà importato. Utilizza le schede per esaminare ogni tipo di dati:

- **Persone** — Elencate per nucleo familiare, con foto se incluse.
- **Gruppi** — Organizzati per campus, servizio, orario e categoria.
- **Frequenza** — Date delle sessioni, gruppi e conteggi delle visite.
- **Donazioni** — Batch, fondi, donatori e importi.
- **Moduli** — Nomi dei moduli e tipi di contenuto.

Esamina questo attentamente prima di procedere. Se qualcosa non è corretto, fai clic su **Ricomincia** e correggi il tuo file sorgente.

---

## Passo 3 - Scegli la Tua Destinazione

Seleziona dove desideri che i dati vadano:

- **Database B1** — Importa direttamente nel database B1 della tua chiesa. Dopo aver selezionato questo, lo strumento mostrerà un conteggio finale dei record da aggiungere. Fai clic su **Avvia Trasferimento** per confermare.
- **Esportazione B1 Zip** — Scarica i tuoi dati come file zip nel formato B1. Buono per i backup.
- **Esportazione Breeze Zip** — Converte i tuoi dati nel formato Breeze.
- **Zip di Planning Center** — Converte i tuoi dati nel formato Planning Center.

:::warning
La sorgente e la destinazione non possono essere dello stesso formato. Se corrisppondono, lo strumento ti avvertirà per prevenire la duplicazione accidentale.
:::

---

## Passo 4 - Esecuzione

Lo strumento elabora il trasferimento e mostra il progresso per ogni passo:

- Campus, Servizi e Orari
- Persone
- Foto
- Gruppi e Membri del Gruppo
- Donazioni
- Frequenza
- Moduli, Domande, Risposte e Invii di Moduli
- Campi Personalizzati (quando hai mappato colonne di Campi Personalizzati)
- Compressione (solo per destinazioni di file zip)

Quando la destinazione è **Database B1**, la scheda di progresso è intitolata **Import Progress** e termina con **Import Complete!** (o **Import Completed with Errors**). Per destinazioni di file zip, gli stessi messaggi dicono **Export**.

:::warning
Non chiudere il tuo browser mentre il trasferimento è in corso. Attendi finché tutti i passaggi non sono completi.
:::

---

## Preparazione di un Zip di Importazione Breeze

1. In Breeze, vai a **Settings** e fai clic su **Export** nella barra laterale sinistra.
2. Esporta tre file separati: **People**, **Tags** e **Contributions**.
3. Seleziona tutti e tre i file, fai clic destro e comprimili in un unico file zip.
   - Su un Mac: seleziona i file, fai clic destro e scegli **Compress**.
   - Su un PC: seleziona i file, fai clic destro, scegli **Send to**, quindi **Compressed (zipped) folder**.
4. Carica il file zip usando l'opzione **Breeze Import Zip** nel Passo 1.

L'importazione da Breeze trasferisce le persone, i gruppi (tag) e i record di donazioni automaticamente.

---

## Preparazione di un'Esportazione Planning Center

1. Accedi a Planning Center e apri il prodotto **People**.
2. Nella barra laterale sinistra, fai clic su **Lists** e crea un elenco che includa tutti coloro che vuoi portare. (Se hai già un elenco di tutta la tua congregazione, usa quello.)
3. Apri l'elenco e utilizza la sua opzione di **export** per scaricare le tue persone come file **CSV**. Includi i campi che vuoi mantenere — nome, email, telefono, indirizzo, data di nascita, genere e stato di iscrizione si trasferiscono tutti a B1.
4. Se Planning Center ti dà più di un file, selezionali tutti, fai clic destro e comprimili in un unico zip.
   - Su un Mac: seleziona i file, fai clic destro e scegli **Compress**.
   - Su un PC: seleziona i file, fai clic destro, scegli **Send to**, quindi **Compressed (zipped) folder**.
5. Carica il CSV o lo zip usando l'opzione **Planning Center Zip** nel Passo 1.

Dopo il caricamento, procedi all'anteprima e conferma che i tuoi popoli e nuclei familiari siano corretti prima di eseguire l'importazione.

---

## Preparazione di un'Esportazione Tithe.ly

1. In Tithe.ly, esporta i tuoi dati **People** come file CSV o Excel. Puoi anche esportare un file di **Giving** separato se vuoi portare i record di donazioni.
2. Lo strumento rileverà automaticamente se il file contiene dati di persone o di donazioni in base ai nomi delle colonne.
3. Carica il file usando l'opzione **Tithe.ly CSV** nel Passo 1.

:::info
Le esportazioni di Tithe.ly possono essere importate un file alla volta. Esegui il processo due volte se hai bisogno di importare sia i record di persone che di donazioni separatamente.
:::

---

## Preparazione di un'Esportazione CCB o Pushpay

1. In Church Community Builder o Pushpay, esporta i tuoi dati **People** come file CSV. Puoi anche esportare un file di donazioni/contributi separato.
2. Lo strumento rileverà automaticamente se il file contiene dati di persone o di donazioni in base ai nomi delle colonne.
3. Carica il file usando l'opzione **CCB / Pushpay CSV** nel Passo 1.

---

## Dopo l'Importazione

Una volta completato il trasferimento, dedica alcuni minuti a verificare i tuoi dati:

1. Sfoglia la pagina [Persone](../people/adding-people.md) e controlla alcuni profili a campione.
2. Conferma che nomi, email, numeri di telefono e indirizzi siano arrivati correttamente.
3. Verifica che le connessioni familiari siano intatte.
4. Esamina i gruppi importati e i record di donazioni.

Se noti problemi, puoi modificare i profili individuali dalla pagina Persone. Puoi anche eseguire di nuovo lo strumento di trasferimento per [esportare i tuoi dati](exporting-data.md) come backup.

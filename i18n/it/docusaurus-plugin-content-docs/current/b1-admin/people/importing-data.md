---
title: "Importazione dei dati"
---

# Importazione dei dati

<div class="article-intro">

Lo strumento B1 Transfer ti permette di portare facilmente i tuoi dati esistenti in B1, che tu stia partendo da zero con un foglio di calcolo, migrando da un'altra piattaforma di gestione della chiesa o importando registri delle donazioni. Può anche essere usato per esportare o creare una copia di backup dei tuoi dati in qualsiasi momento.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con accesso a **Impostazioni**.
- Assicurati di aver esportato i tuoi dati dal sistema precedente e di averli pronti prima di iniziare.
- Questo strumento è pensato per la migrazione iniziale dei dati. Se stai già usando B1 da un po' di tempo, un nuovo import potrebbe creare record duplicati.

</div>

## Accesso allo strumento di trasferimento

1. Accedi a **B1 Admin**.
2. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e fai clic su **Impostazioni**.
3. Fai clic sul collegamento **Import/Export** sotto il nome della tua chiesa, in cima al menu delle impostazioni a sinistra.
4. Questo aprirà lo strumento **B1 Transfer** in una nuova scheda all'indirizzo [transfer.b1.church](https://transfer.b1.church).

Lo strumento di trasferimento ti guida attraverso quattro passaggi: Origine, Anteprima, Destinazione ed Esecuzione.

---

## Passaggio 1 - Scegli l'origine

Seleziona da dove provengono i tuoi dati. Ci sono sette opzioni:

- **Database B1** — Estrae i dati direttamente dalla tua chiesa B1 esistente. Utile per creare un backup o convertire i dati in un altro formato. Devi aver effettuato l'accesso per usare questa opzione.
- **File ZIP di importazione B1** — Un file zip nel formato proprio di B1. Viene usato principalmente per ripristinare un'esportazione precedente di B1. Caricare uno ZIP di esportazione B1 nel **Database B1** ripristina tutto ciò che l'esportazione contiene (vedi [Esportazione dei dati](./exporting-data.md#full-data-export-from-settings)). Se il file non può essere letto, lo strumento mostra l'errore invece di ricominciare da capo.
- **File ZIP di Breeze** — Un file zip contenente i file esportati da Breeze ChMS.
- **File ZIP di Planning Center** — Un file zip o CSV esportato da Planning Center.
- **CSV / Excel personalizzato** — Qualsiasi file CSV o Excel che contenga dati delle persone. Dopo il caricamento, dovrai associare le tue colonne ai campi di B1 prima che l'import prosegua.
- **CSV di Tithe.ly** — Un file di esportazione delle persone o delle donazioni da Tithe.ly (sono accettati formati CSV o Excel).
- **CSV di CCB / Pushpay** — Un CSV di esportazione delle persone o delle donazioni da Church Community Builder o Pushpay.

Puoi trascinare il file nell'area di caricamento oppure fare clic per sfogliare e selezionarlo.

---

## Passaggio 1b - Associa i campi (solo per CSV / Excel personalizzato)

Se hai selezionato **CSV / Excel personalizzato**, dopo aver caricato il file lo strumento mostra una schermata di associazione dei campi prima di passare all'anteprima.

Ogni colonna del tuo file è elencata insieme a un valore di esempio. Per ciascuna colonna, usa il menu a discesa per scegliere il campo B1 corrispondente. Lo strumento riconosce automaticamente i nomi di colonna più comuni come "First Name," "Email" o "Zip Code", ma dovresti verificare ogni riga e correggere eventuali errori.

I campi B1 disponibili includono:

- Nome, Cognome, Secondo nome, Soprannome, Nome visualizzato, Titolo/Prefisso, Suffisso
- Email, Telefono di casa, Cellulare, Telefono di lavoro
- Indirizzo riga 1, Indirizzo riga 2, Città, Stato/Provincia, CAP
- Data di nascita, Anniversario, Sesso, Stato civile, Stato di appartenenza
- Nome della famiglia/nucleo familiare
- Nome del gruppo — assegna la persona a un gruppo in base al nome
- **Campo personalizzato (abbina per nome)** — salva la colonna in uno dei tuoi [campi personalizzati per le persone](../settings/custom-fields.md) della chiesa. Compare una casella **Nome del campo B1**, precompilata con l'intestazione della colonna. Modificala con il nome del campo esattamente come appare in B1 (le maiuscole non contano).
- **Risposta al modulo (campo personalizzato)** — salva il valore di quella colonna come campo personalizzato collegato alla scheda della persona. Se usi questa opzione, ti verrà chiesto di assegnare un nome al modulo.

Le date possono essere in formati comuni come `9/17/1994` e vengono convertite automaticamente. Per i campi personalizzati, i campi Sì/No accettano valori come Yes, No, Y, N, True, False, 1 e 0, mentre i campi a scelta multipla accettano sia il testo della scelta sia il suo valore.

:::info
Crea i tuoi campi personalizzati per le persone in B1 Admin prima di importare. Al termine dell'import, il passaggio **Campi personalizzati** elenca i nomi di colonna che non corrispondono a un campo B1 e conta i valori che non rientrano nel tipo del campo. Questi valori vengono saltati e il resto dell'import viene completato comunque.
:::

Le colonne che non vuoi importare possono essere impostate su **(Salta)**. Almeno un campo nome (Nome o Cognome) deve essere associato prima di poter proseguire.

Fai clic su **Conferma associazione e importa** per passare all'anteprima.

---

## Passaggio 2 - Anteprima dei dati

Dopo il caricamento, lo strumento mostra un'anteprima di tutto ciò che verrà importato. Usa le schede per controllare ciascun tipo di dato:

- **Persone** — Elencate per nucleo familiare, con le foto se incluse.
- **Gruppi** — Organizzati per campus, servizio, orario e categoria.
- **Presenze** — Date delle sessioni, gruppi e numero di visite.
- **Donazioni** — Batch, fondi, donatori e importi.
- **Moduli** — Nomi dei moduli e tipi di contenuto.

Controlla attentamente prima di procedere. Se qualcosa non va, fai clic su **Ricomincia** e correggi il file di origine.

---

## Passaggio 3 - Scegli la destinazione

Seleziona dove vuoi che vadano i dati:

- **Database B1** — Importa direttamente nel database B1 della tua chiesa. Dopo aver selezionato questa opzione, lo strumento mostra il conteggio finale dei record da aggiungere. Fai clic su **Avvia trasferimento** per confermare.
- **File ZIP di esportazione B1** — Scarica i tuoi dati come file zip in formato B1, che può essere ripristinato in seguito con **File ZIP di importazione B1**. Utile per i backup.
- **File ZIP di esportazione Breeze** — Converte i tuoi dati in formato Breeze.
- **File ZIP di esportazione Planning Center** — Converte i tuoi dati in formato Planning Center.

:::warning
L'origine e la destinazione non possono essere dello stesso formato. Se coincidono, lo strumento ti avvisa per evitare duplicazioni accidentali.
:::

---

## Passaggio 4 - Esecuzione

Lo strumento elabora il trasferimento e mostra l'avanzamento di ciascun passaggio:

- Campus, Servizi e Orari
- Persone
- Foto
- Gruppi e membri dei gruppi
- Donazioni
- Presenze
- Moduli, domande, risposte e invii dei moduli
- Campi personalizzati (quando hai associato colonne di campi personalizzati)
- Compressione (solo per le destinazioni in file zip)

Quando la destinazione è **Database B1**, la scheda di avanzamento si intitola **Avanzamento importazione** e termina con **Importazione completata!** (oppure **Importazione completata con errori**). Per le destinazioni in file zip, gli stessi messaggi dicono **Esportazione**.

:::info
Durante il ripristino di un **File ZIP di importazione B1**, i record che puntano a qualcosa non più presente nel file vengono saltati invece di interrompere l'import: appartenenze ai gruppi di persone o gruppi che non sono nello zip, presenze per gruppi o persone eliminati, e collegamenti tra gruppi e orari di servizio eliminati. Le sessioni di presenza mai collegate a un orario di servizio vengono comunque ripristinate. Analogamente, durante l'esportazione, una foto che non può essere scaricata o letta viene esclusa, così il passaggio **Foto** prosegue.
:::

:::warning
Non chiudere il browser mentre il trasferimento è in corso. Attendi che tutti i passaggi risultino completati.
:::

---

## Preparazione di un file ZIP di importazione Breeze

1. In Breeze, vai su **Impostazioni** e fai clic su **Esporta** nella barra laterale sinistra.
2. Esporta tre file separati: **Persone**, **Tag** e **Contributi**.
3. Seleziona tutti e tre i file, fai clic con il tasto destro e comprimili in un unico file zip.
   - Su Mac: seleziona i file, fai clic con il tasto destro e scegli **Comprimi**.
   - Su PC: seleziona i file, fai clic con il tasto destro, scegli **Invia a**, poi **Cartella compressa (in formato zip)**.
4. Carica il file zip usando l'opzione **File ZIP di importazione Breeze** nel Passaggio 1.

L'import da Breeze trasferisce automaticamente persone, gruppi (tag) e record delle donazioni.

---

## Preparazione di un'esportazione da Planning Center

1. Accedi a Planning Center e apri il prodotto **People**.
2. Nella barra laterale sinistra, fai clic su **Lists** e crea un elenco che includa tutte le persone che vuoi trasferire. (Se hai già un elenco di tutta la congregazione, usa quello.)
3. Apri l'elenco e usa la sua opzione **export** per scaricare le persone in un file **CSV**. Includi i campi che vuoi conservare — nome, email, telefono, indirizzo, data di nascita, sesso e stato di appartenenza vengono tutti associati a B1.
4. Se Planning Center ti fornisce più di un file, selezionali tutti, fai clic con il tasto destro e comprimili in un unico zip.
   - Su Mac: seleziona i file, fai clic con il tasto destro e scegli **Comprimi**.
   - Su PC: seleziona i file, fai clic con il tasto destro, scegli **Invia a**, poi **Cartella compressa (in formato zip)**.
5. Carica il CSV o lo zip usando l'opzione **File ZIP di Planning Center** nel Passaggio 1.

Dopo il caricamento, procedi all'anteprima e verifica che persone e nuclei familiari siano corretti prima di eseguire l'import.

---

## Preparazione di un'esportazione da Tithe.ly

1. In Tithe.ly, esporta i dati delle **Persone** come file CSV o Excel. Puoi anche esportare un file separato **Donazioni** se vuoi importare anche i record delle donazioni.
2. Lo strumento rileva automaticamente se il file contiene dati di persone o di donazioni in base ai nomi delle colonne.
3. Carica il file usando l'opzione **CSV di Tithe.ly** nel Passaggio 1.

:::info
Le esportazioni di Tithe.ly possono essere importate un file alla volta. Esegui il processo due volte se devi importare separatamente persone e donazioni.
:::

---

## Preparazione di un'esportazione da CCB o Pushpay

1. In Church Community Builder o Pushpay, esporta i dati delle **Persone** come file CSV. Puoi anche esportare un file separato di donazioni/contributi.
2. Lo strumento rileva automaticamente se il file contiene dati di persone o di donazioni in base ai nomi delle colonne.
3. Carica il file usando l'opzione **CSV di CCB / Pushpay** nel Passaggio 1.

---

## Dopo l'import

Una volta completato il trasferimento, dedica qualche minuto a verificare i dati:

1. Visita la pagina [Persone](../people/adding-people.md) e controlla a campione alcuni profili.
2. Verifica che nomi, email, numeri di telefono e indirizzi siano stati importati correttamente.
3. Controlla che i collegamenti tra i nuclei familiari siano intatti. Il ruolo di ciascuna persona nel nucleo familiare (Capo famiglia, Coniuge, Figlio o Altro) viene mantenuto quando l'origine lo prevede: la colonna **householdRole** in un file ZIP di importazione B1, **Family Role** in Breeze o Tithe.ly, e **Family Position** in CCB / Pushpay. Ruoli come "Head of Household", "Primary", "Wife" o "Son" vengono convertiti nel ruolo B1 corrispondente. Le importazioni da Planning Center e da CSV / Excel personalizzato non hanno una colonna dei ruoli, quindi a queste persone viene assegnato **Altro**; puoi modificare un ruolo dal nucleo familiare della persona nella pagina [Persone](../people/adding-people.md#managing-households).
4. Controlla gruppi e registri delle donazioni importati.

Se noti dei problemi, puoi modificare i singoli profili dalla pagina Persone. Puoi anche eseguire di nuovo lo strumento di trasferimento per [esportare i tuoi dati](exporting-data.md) come backup.

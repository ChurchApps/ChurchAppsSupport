---
title: "Importare dati"
---

# Importare dati

<div class="article-intro">

Lo strumento B1 Transfer rende semplice portare i tuoi dati esistenti in B1, che tu stia partendo da zero con un foglio di calcolo, migrando da un'altra piattaforma di gestione della chiesa o importando registri di donazioni. Può anche essere usato per esportare o creare un backup dei tuoi dati in qualsiasi momento.

</div>

## Video di formazione

<YouTube id="G-VnhzACYIU" title="Importing Your People Database in B1" next="Searching People and Building Lists in B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account attivo di B1 Admin con accesso alle **Impostazioni**.
- Prima di iniziare, esporta i tuoi dati dal sistema precedente e tienili pronti.
- Questo strumento è pensato per la migrazione iniziale dei dati. Se usi già B1 da tempo, reimportare potrebbe creare record duplicati.

</div>

## Accedere allo strumento di trasferimento

1. Accedi a **B1 Admin**.
2. Apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e clicca su **Impostazioni**.
3. Clicca sul link **Importa/Esporta** sotto il nome della tua chiesa, in cima al menu Impostazioni a sinistra.
4. Si aprirà lo strumento **B1 Transfer** in una nuova scheda all'indirizzo [transfer.b1.church](https://transfer.b1.church).

Lo strumento di trasferimento ti guida attraverso quattro passaggi: Origine, Anteprima, Destinazione ed Esecuzione.

---

## Passo 1 - Scegli l'origine

Seleziona da dove provengono i tuoi dati. Ci sono sette opzioni:

- **Database B1** — Estrae i dati direttamente dalla tua chiesa in B1 esistente. Utile per creare un backup o convertire i dati in un altro formato. Per usare questa opzione devi aver effettuato l'accesso.
- **Zip di importazione B1** — Un file zip nel formato proprio di B1. Serve principalmente a ripristinare un'esportazione precedente di B1. Caricare uno Zip di esportazione B1 nel **Database B1** ripristina tutto ciò che l'esportazione contiene (vedi [Esportare dati](./exporting-data.md#full-data-export-from-settings)). Se il file non può essere letto, lo strumento mostra l'errore invece di ricominciare da capo.
- **Zip di importazione Breeze** — Un file zip contenente i file esportati da Breeze ChMS.
- **Zip di Planning Center** — Un file zip o CSV esportato da Planning Center.
- **CSV / Excel personalizzato** — Qualsiasi file CSV o Excel contenente dati di persone. Dopo il caricamento, dovrai associare le colonne ai campi di B1 prima che l'importazione prosegua.
- **CSV di Tithe.ly** — Un file di esportazione di persone o donazioni da Tithe.ly (sono accettati formato CSV o Excel).
- **CSV di CCB / Pushpay** — Un CSV di esportazione di persone o donazioni da Church Community Builder o Pushpay.

Puoi trascinare il file nell'area di caricamento oppure cliccare per cercarlo.

---

## Passo 1b - Associa i campi (solo per CSV / Excel personalizzato)

Se hai selezionato **CSV / Excel personalizzato**, dopo il caricamento del file lo strumento mostra una schermata di associazione dei campi prima di passare all'anteprima.

Ogni colonna del file è elencata insieme a un valore di esempio. Per ciascuna colonna, usa il menu a tendina per scegliere il campo B1 corrispondente. Lo strumento riconosce automaticamente i nomi di colonna comuni come "First Name", "Email" o "Zip Code", ma dovresti controllare ogni riga e correggere ciò che non ha riconosciuto.

I campi di B1 disponibili includono:

- Nome, Cognome, Secondo nome, Soprannome, Nome visualizzato, Titolo/Prefisso, Suffisso
- Email, Telefono di casa, Cellulare, Telefono di lavoro
- Indirizzo riga 1, Indirizzo riga 2, Città, Stato/Provincia, CAP
- Data di nascita, Anniversario, Sesso, Stato civile, Stato di appartenenza
- Nome della famiglia
- Nome del gruppo — assegna la persona a un gruppo tramite il nome
- **Campo personalizzato (corrispondenza per nome)** — salva la colonna in uno dei [campi personalizzati delle persone](../settings/custom-fields.md) della tua chiesa. Compare una casella **Nome del campo B1**, precompilata con l'intestazione della colonna. Modificala con il nome del campo esattamente come appare in B1 (le maiuscole non contano).
- **Risposta a modulo (campo personalizzato)** — salva il valore di quella colonna come campo personalizzato collegato al record della persona. Se usi questa opzione, ti verrà chiesto di dare un nome al modulo.

Le date possono essere in formati comuni come `9/17/1994` e vengono convertite automaticamente. Per i campi personalizzati, i campi Sì/No accettano valori come Yes, No, Y, N, True, False, 1 e 0, mentre i campi a scelta multipla accettano sia il testo della scelta sia il suo valore.

:::info
Crea i campi personalizzati delle persone in B1 Admin prima di importare. Al termine dell'importazione, il passaggio **Campi personalizzati** elenca i nomi di colonna che non corrispondono a un campo di B1 e conta i valori che non rientrano nel tipo di campo. Quei valori vengono saltati, e il resto dell'importazione viene completato comunque.
:::

Le colonne che non vuoi importare possono essere impostate su **(Salta)**. Almeno uno dei campi nome (Nome o Cognome) deve essere associato prima di poter proseguire.

Clicca su **Conferma associazione e importa** per passare all'anteprima.

---

## Passo 2 - Anteprima dei dati

Dopo il caricamento, lo strumento mostra un'anteprima di tutto ciò che verrà importato. Usa le schede per controllare ciascun tipo di dato:

- **Persone** — Elencate per famiglia, con le foto se incluse.
- **Gruppi** — Organizzati per campus, servizio, orario e categoria.
- **Presenze** — Date delle sessioni, gruppi e numero di visite.
- **Donazioni** — Lotti, fondi, donatori e importi.
- **Moduli** — Nomi dei moduli e tipi di contenuto.

Controlla attentamente prima di proseguire. Se qualcosa non va, clicca su **Ricomincia** e correggi il file di origine.

---

## Passo 3 - Scegli la destinazione

Seleziona dove vuoi che vadano i dati:

- **Database B1** — Importa direttamente nel database B1 della tua chiesa. Dopo aver selezionato questa opzione, lo strumento mostra il conteggio finale dei record da aggiungere. Clicca su **Avvia trasferimento** per confermare.
- **Zip di esportazione B1** — Scarica i tuoi dati come file zip nel formato B1, che potrà essere ripristinato in seguito con **Zip di importazione B1**. Ottimo per i backup.
- **Zip di esportazione Breeze** — Converte i tuoi dati nel formato Breeze.
- **Zip di Planning Center** — Converte i tuoi dati nel formato Planning Center.

:::warning
L'origine e la destinazione non possono essere dello stesso formato. Se coincidono, lo strumento ti avvisa per evitare duplicazioni accidentali.
:::

---

## Passo 4 - Esecuzione

Lo strumento elabora il trasferimento e mostra l'avanzamento di ciascun passaggio:

- Campus, Servizi e Orari
- Persone
- Foto
- Gruppi e membri dei gruppi
- Donazioni
- Presenze
- Moduli, Domande, Risposte e Invii dei moduli
- Campi personalizzati (quando hai associato delle colonne di campo personalizzato)
- Compressione (solo per le destinazioni in file zip)

Quando la destinazione è **Database B1**, la scheda di avanzamento si intitola **Avanzamento importazione** e termina con **Importazione completata!** (oppure **Importazione completata con errori**). Per le destinazioni in file zip, gli stessi messaggi dicono **Esportazione**.

:::info
Quando ripristini uno **Zip di importazione B1**, i record che puntano a qualcosa non più presente nel file vengono saltati invece di interrompere l'importazione: appartenenze ai gruppi di persone o gruppi che non sono nello zip, presenze per gruppi o persone eliminati, e collegamenti tra gruppi e orari di servizio eliminati. Le sessioni di presenza che non erano mai state collegate a un orario di servizio vengono comunque ripristinate. Allo stesso modo, durante l'esportazione una foto che non può essere scaricata o letta viene omessa, così il passaggio **Foto** prosegue.
:::

:::warning
Non chiudere il browser mentre il trasferimento è in corso. Attendi finché tutti i passaggi non risultano completati.
:::

---

## Preparare uno Zip di importazione Breeze

1. In Breeze, vai su **Impostazioni** e clicca su **Esporta** nella barra laterale sinistra.
2. Esporta tre file separati: **Persone**, **Tag** e **Contributi**.
3. Seleziona tutti e tre i file, fai clic destro e comprimili in un unico file zip.
   - Su Mac: seleziona i file, fai clic destro e scegli **Comprimi**.
   - Su PC: seleziona i file, fai clic destro, scegli **Invia a**, poi **Cartella compressa (in zip)**.
4. Carica il file zip usando l'opzione **Zip di importazione Breeze** nel Passo 1.

L'importazione da Breeze trasferisce automaticamente persone, gruppi (tag) e registri di donazioni.

---

## Preparare un'esportazione di Planning Center

1. Accedi a Planning Center e apri il prodotto **People**.
2. Nella barra laterale sinistra, clicca su **Liste** e crea una lista che includa tutte le persone che vuoi trasferire. (Se hai già una lista dell'intera comunità, usa quella.)
3. Apri la lista e usa la sua opzione di **esportazione** per scaricare le persone come file **CSV**. Includi i campi che vuoi mantenere — nome, email, telefono, indirizzo, data di nascita, sesso e stato di appartenenza vengono tutti mappati in B1.
4. Se Planning Center ti fornisce più di un file, selezionali tutti, fai clic destro e comprimili in un unico file zip.
   - Su Mac: seleziona i file, fai clic destro e scegli **Comprimi**.
   - Su PC: seleziona i file, fai clic destro, scegli **Invia a**, poi **Cartella compressa (in zip)**.
5. Carica il CSV o lo zip usando l'opzione **Zip di Planning Center** nel Passo 1.

Dopo il caricamento, prosegui con l'anteprima e verifica che persone e famiglie siano corrette prima di eseguire l'importazione.

---

## Preparare un'esportazione di Tithe.ly

1. In Tithe.ly, esporta i dati delle **Persone** come file CSV o Excel. Puoi anche esportare un file separato delle **Donazioni** se vuoi importare anche i registri delle offerte.
2. Lo strumento rileva automaticamente se il file contiene dati di persone o di donazioni in base ai nomi delle colonne.
3. Carica il file usando l'opzione **CSV di Tithe.ly** nel Passo 1.

:::info
Le esportazioni di Tithe.ly possono essere importate un file alla volta. Esegui il processo due volte se devi importare separatamente persone e registri delle offerte.
:::

---

## Preparare un'esportazione di CCB o Pushpay

1. In Church Community Builder o Pushpay, esporta i dati delle **Persone** come file CSV. Puoi anche esportare un file separato con le offerte o i contributi.
2. Lo strumento rileva automaticamente se il file contiene dati di persone o di donazioni in base ai nomi delle colonne.
3. Carica il file usando l'opzione **CSV di CCB / Pushpay** nel Passo 1.

---

## Dopo l'importazione

Al termine del trasferimento, dedica qualche minuto a verificare i dati:

1. Consulta la pagina [Persone](../people/adding-people.md) e controlla a campione alcune schede.
2. Verifica che nomi, email, numeri di telefono e indirizzi siano stati importati correttamente.
3. Controlla che i collegamenti familiari siano integri. Il ruolo di ciascuna persona nella famiglia (Capofamiglia, Coniuge, Figlio o Altro) viene mantenuto quando la fonte lo prevede: la colonna **householdRole** in uno Zip di importazione B1, **Family Role** in Breeze o Tithe.ly, e **Family Position** in CCB / Pushpay. Ruoli come "Head of Household", "Primary", "Wife" o "Son" vengono convertiti nel ruolo B1 corrispondente. Le importazioni da Planning Center e da CSV / Excel personalizzato non hanno una colonna dei ruoli, quindi a quelle persone viene assegnato **Altro**; puoi cambiare il ruolo dalla famiglia della persona nella pagina [Persone](../people/adding-people.md#managing-households).
4. Controlla gruppi e registri delle offerte importati.

Se noti dei problemi, puoi modificare le singole schede dalla pagina Persone. Puoi anche eseguire di nuovo lo strumento di trasferimento per [esportare i tuoi dati](exporting-data.md) come backup.

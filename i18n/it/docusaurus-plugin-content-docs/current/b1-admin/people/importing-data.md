---
title: "Importazione dei dati"
---

# Importazione dei dati

<div class="article-intro">

Lo strumento B1 Transfer ti permette di portare facilmente i tuoi dati esistenti in B1, che tu stia partendo da zero con un foglio di calcolo, migrando da un'altra piattaforma di gestione per chiese oppure importando registrazioni di donazioni. Può anche essere usato per esportare o creare una copia di backup dei tuoi dati in qualsiasi momento.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con accesso alle **Impostazioni**.
- Prima di iniziare, esporta i tuoi dati dal sistema precedente e tienili pronti.
- Questo strumento è pensato per la migrazione iniziale dei dati. Se usi già B1 da tempo, un nuovo import potrebbe creare record duplicati.

</div>

## Accedere allo strumento di trasferimento

1. Accedi a **B1 Admin**.
2. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e fai clic su **Impostazioni**.
3. Fai clic sul link **Import/Export** sotto il nome della tua chiesa, in cima al menu delle impostazioni a sinistra.
4. Si aprirà lo strumento **B1 Transfer** in una nuova scheda all'indirizzo [transfer.b1.church](https://transfer.b1.church).

Lo strumento di trasferimento ti guida attraverso quattro passaggi: Origine, Anteprima, Destinazione ed Esecuzione.

---

## Passaggio 1 - Scegli l'origine

Seleziona da dove provengono i tuoi dati. Ci sono sette opzioni:

- **Database B1** — Preleva i dati direttamente dalla tua chiesa su B1. Utile per fare un backup o convertire i dati in un altro formato. Per usare questa opzione devi aver effettuato l'accesso.
- **Zip di importazione B1** — Un file zip nel formato di B1. Viene usato principalmente per ripristinare un'esportazione precedente di B1.
- **Zip di importazione Breeze** — Un file zip contenente i file esportati da Breeze ChMS.
- **Zip di Planning Center** — Un file zip o CSV esportato da Planning Center.
- **CSV / Excel personalizzato** — Qualsiasi file CSV o Excel contenente dati delle persone. Dopo il caricamento, dovrai associare le colonne ai campi di B1 prima di proseguire con l'importazione.
- **CSV di Tithe.ly** — Un file di esportazione di persone o donazioni da Tithe.ly (sono accettati formati CSV o Excel).
- **CSV di CCB / Pushpay** — Un CSV di esportazione di persone o donazioni da Church Community Builder o Pushpay.

Puoi trascinare il file nell'area di caricamento oppure fare clic per sfogliare e selezionarlo.

---

## Passaggio 1b - Associa i campi (solo CSV / Excel personalizzato)

Se hai selezionato **CSV / Excel personalizzato**, dopo aver caricato il file lo strumento mostrerà una schermata di associazione dei campi prima di passare all'anteprima.

Ogni colonna del file è elencata insieme a un valore di esempio. Per ogni colonna, usa il menu a discesa per scegliere il campo di B1 corrispondente. Lo strumento riconosce automaticamente i nomi di colonna più comuni come "First Name", "Email" o "Zip Code", ma dovresti controllare ogni riga e correggere eventuali errori.

I campi di B1 disponibili includono:

- Nome, Cognome, Secondo nome, Soprannome, Nome visualizzato, Titolo/Prefisso, Suffisso
- Email, Telefono di casa, Cellulare, Telefono di lavoro
- Indirizzo riga 1, Indirizzo riga 2, Città, Stato/Provincia, CAP
- Data di nascita, Anniversario, Genere, Stato civile, Stato di appartenenza
- Nome della famiglia/del nucleo familiare
- Nome del gruppo — assegna la persona a un gruppo tramite il nome
- **Campo personalizzato (abbina per nome)** — salva la colonna in uno dei [campi personalizzati delle persone](../settings/custom-fields.md) della tua chiesa. Compare una casella **Nome del campo B1** precompilata con l'intestazione della colonna. Modificala inserendo il nome del campo esattamente come appare in B1 (le maiuscole non contano).
- **Risposta al modulo (campo personalizzato)** — salva il valore della colonna come campo personalizzato associato alla scheda della persona. Se usi questa opzione, ti verrà chiesto di dare un nome al modulo.

Le date possono essere in formati comuni come `17/9/1994` e vengono convertite automaticamente. Per i campi personalizzati, i campi Sì/No accettano valori come Yes, No, Y, N, True, False, 1 e 0, mentre i campi a scelta multipla accettano sia il testo della scelta sia il suo valore.

:::info
Crea i campi personalizzati delle persone in B1 Admin prima di importare. Al termine dell'importazione, il passaggio **Campi personalizzati** elenca i nomi di colonna che non corrispondono a un campo di B1 e conta i valori che non rientrano nel tipo di campo. Questi valori vengono saltati, mentre il resto dell'importazione viene completato comunque.
:::

Le colonne che non vuoi importare possono essere impostate su **(Salta)**. Almeno un campo nome (Nome o Cognome) deve essere associato prima di poter proseguire.

Fai clic su **Conferma associazione e importa** per passare all'anteprima.

---

## Passaggio 2 - Visualizza l'anteprima dei dati

Dopo il caricamento, lo strumento mostra un'anteprima di tutto ciò che verrà importato. Usa le schede per esaminare ciascun tipo di dato:

- **Persone** — Elencate per nucleo familiare, con le foto se incluse.
- **Gruppi** — Organizzati per campus, servizio, orario e categoria.
- **Presenze** — Date delle sessioni, gruppi e numero di visite.
- **Donazioni** — Lotti, fondi, donatori e importi.
- **Moduli** — Nomi dei moduli e tipi di contenuto.

Controlla attentamente prima di procedere. Se qualcosa non sembra corretto, fai clic su **Ricomincia** e correggi il file di origine.

---

## Passaggio 3 - Scegli la destinazione

Seleziona dove vuoi che vadano i dati:

- **Database B1** — Importa direttamente nel database B1 della tua chiesa. Dopo aver selezionato questa opzione, lo strumento mostrerà il conteggio finale dei record da aggiungere. Fai clic su **Avvia trasferimento** per confermare.
- **Zip di esportazione B1** — Scarica i dati come file zip nel formato B1. Utile per i backup.
- **Zip di esportazione Breeze** — Converte i dati nel formato Breeze.
- **Zip di Planning Center** — Converte i dati nel formato Planning Center.

:::warning
Origine e destinazione non possono essere dello stesso formato. Se coincidono, lo strumento ti avvisa per evitare duplicazioni accidentali.
:::

---

## Passaggio 4 - Esecuzione

Lo strumento elabora il trasferimento e mostra l'avanzamento di ogni passaggio:

- Campus, Servizi e Orari
- Persone
- Foto
- Gruppi e membri dei gruppi
- Donazioni
- Presenze
- Moduli, Domande, Risposte e Risposte ai moduli
- Campi personalizzati (quando hai associato alcune colonne di campi personalizzati)
- Compressione (solo per le destinazioni in formato zip)

Quando la destinazione è **Database B1**, la scheda di avanzamento si intitola **Avanzamento importazione** e termina con **Importazione completata!** (oppure **Importazione completata con errori**). Per le destinazioni in formato zip, gli stessi messaggi dicono **Esportazione**.

:::warning
Non chiudere il browser mentre il trasferimento è in corso. Attendi che tutti i passaggi risultino completati.
:::

---

## Preparare uno zip di importazione Breeze

1. In Breeze, vai su **Impostazioni** e fai clic su **Esporta** nella barra laterale sinistra.
2. Esporta tre file separati: **People**, **Tags** e **Contributions**.
3. Seleziona tutti e tre i file, fai clic con il tasto destro e comprimili in un unico file zip.
   - Su Mac: seleziona i file, fai clic con il tasto destro e scegli **Comprimi**.
   - Su PC: seleziona i file, fai clic con il tasto destro, scegli **Invia a**, quindi **Cartella compressa (zip)**.
4. Carica il file zip usando l'opzione **Zip di importazione Breeze** nel Passaggio 1.

L'importazione da Breeze trasferisce automaticamente persone, gruppi (tag) e registrazioni delle donazioni.

---

## Preparare un'esportazione da Planning Center

1. Accedi a Planning Center e apri il prodotto **People**.
2. Nella barra laterale sinistra, fai clic su **Lists** e crea un elenco che includa tutte le persone che vuoi trasferire. (Se hai già un elenco di tutta la comunità, usa quello.)
3. Apri l'elenco e usa l'opzione **export** per scaricare le persone come file **CSV**. Includi i campi che vuoi mantenere: nome, email, telefono, indirizzo, data di nascita, genere e stato di appartenenza vengono tutti associati a B1.
4. Se Planning Center ti fornisce più di un file, selezionali tutti, fai clic con il tasto destro e comprimili in un unico zip.
   - Su Mac: seleziona i file, fai clic con il tasto destro e scegli **Comprimi**.
   - Su PC: seleziona i file, fai clic con il tasto destro, scegli **Invia a**, quindi **Cartella compressa (zip)**.
5. Carica il CSV o lo zip usando l'opzione **Zip di Planning Center** nel Passaggio 1.

Dopo il caricamento, prosegui fino all'anteprima e verifica che persone e nuclei familiari siano corretti prima di eseguire l'importazione.

---

## Preparare un'esportazione da Tithe.ly

1. In Tithe.ly, esporta i dati **People** come file CSV o Excel. Puoi anche esportare un file **Giving** separato se vuoi importare le registrazioni delle donazioni.
2. Lo strumento rileverà automaticamente se il file contiene dati di persone o di donazioni in base ai nomi delle colonne.
3. Carica il file usando l'opzione **CSV di Tithe.ly** nel Passaggio 1.

:::info
Le esportazioni di Tithe.ly possono essere importate un file alla volta. Esegui il processo due volte se devi importare separatamente persone e donazioni.
:::

---

## Preparare un'esportazione da CCB o Pushpay

1. In Church Community Builder o Pushpay, esporta i dati **People** come file CSV. Puoi anche esportare un file separato con le donazioni o i contributi.
2. Lo strumento rileverà automaticamente se il file contiene dati di persone o di donazioni in base ai nomi delle colonne.
3. Carica il file usando l'opzione **CSV di CCB / Pushpay** nel Passaggio 1.

---

## Dopo l'importazione

Al termine del trasferimento, dedica qualche minuto a verificare i dati:

1. Apri la pagina [Persone](../people/adding-people.md) e controlla a campione alcuni profili.
2. Verifica che nomi, email, numeri di telefono e indirizzi siano stati importati correttamente.
3. Controlla che i collegamenti tra i nuclei familiari siano intatti. Il ruolo familiare di ogni persona (Capofamiglia, Coniuge, Figlio o Altro) viene mantenuto quando l'origine lo prevede: la colonna **householdRole** in uno zip di importazione B1, **Family Role** in Breeze o Tithe.ly, e **Family Position** in CCB / Pushpay. Ruoli come "Head of Household", "Primary", "Wife" o "Son" vengono convertiti nel ruolo B1 corrispondente. Le importazioni da Planning Center e da CSV / Excel personalizzato non hanno una colonna dei ruoli, quindi a queste persone viene assegnato **Altro**; puoi modificare il ruolo dal nucleo familiare della persona nella pagina [Persone](../people/adding-people.md#managing-households).
4. Controlla gruppi e registrazioni delle donazioni importati.

Se noti dei problemi, puoi modificare i singoli profili dalla pagina Persone. Puoi anche eseguire di nuovo lo strumento di trasferimento per [esportare i tuoi dati](exporting-data.md) come backup.

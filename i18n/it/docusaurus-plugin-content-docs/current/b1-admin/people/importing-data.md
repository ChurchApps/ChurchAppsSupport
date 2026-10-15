---
title: "Importare dati"
---

# Importare dati

<div class="article-intro">

Lo strumento B1 Transfer ti permette di portare i tuoi dati esistenti in B1, che tu stia partendo da zero con un foglio di calcolo, stia migrando da un'altra piattaforma di gestione della chiesa oppure stia importando registri di offerte. Può anche essere usato per esportare o fare un backup dei tuoi dati in qualsiasi momento.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con accesso alle **Impostazioni**.
- Prima di iniziare, esporta i dati dal tuo sistema precedente e tienili pronti.
- Questo strumento è pensato per la migrazione iniziale dei dati. Se stai già usando B1 da un po' di tempo, reimportare potrebbe creare record duplicati.

</div>

## Accedere allo strumento di trasferimento

1. Accedi a **B1 Admin**.
2. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e fai clic su **Impostazioni**.
3. Fai clic sul collegamento **Importa/Esporta** sotto il nome della tua chiesa, in cima al menu Impostazioni a sinistra.
4. Si aprirà lo strumento **B1 Transfer** in una nuova scheda all'indirizzo [transfer.b1.church](https://transfer.b1.church).

Lo strumento di trasferimento ti guida attraverso quattro passaggi: Origine, Anteprima, Destinazione ed Esecuzione.

---

## Passaggio 1 - Scegli l'origine

Seleziona da dove provengono i tuoi dati. Ci sono sette opzioni:

- **Database B1** — Preleva i dati direttamente dalla tua chiesa B1 esistente. Utile per fare un backup o per convertire i dati in un altro formato. Per usare questa opzione devi aver effettuato l'accesso.
- **Archivio ZIP B1 Import** — Un file zip nel formato proprio di B1. Serve principalmente a ripristinare un'esportazione B1 precedente. Caricare un Archivio ZIP B1 Export nel **Database B1** ripristina tutto ciò che l'esportazione contiene (consulta [Esportare i dati](./exporting-data.md#full-data-export-from-settings)). Se il file non può essere letto, lo strumento mostra l'errore invece di ricominciare da capo.
- **Archivio ZIP Breeze Import** — Un file zip contenente file esportati da Breeze ChMS.
- **Archivio ZIP Planning Center** — Un file zip o CSV esportato da Planning Center.
- **CSV / Excel personalizzato** — Qualsiasi file CSV o Excel che contenga dati di persone. Dopo il caricamento, dovrai associare le colonne ai campi di B1 prima di procedere con l'importazione.
- **CSV di Tithe.ly** — Un file di esportazione di persone o offerte da Tithe.ly (sono accettati formato CSV o Excel).
- **CSV di CCB / Pushpay** — Un CSV di esportazione di persone o offerte da Church Community Builder o Pushpay.

Puoi trascinare il file nell'area di caricamento oppure fare clic per sfogliare i file.

---

## Passaggio 1b - Associa i campi (solo CSV / Excel personalizzato)

Se hai selezionato **CSV / Excel personalizzato**, dopo aver caricato il file lo strumento mostra una schermata di associazione dei campi prima di passare all'anteprima.

Ogni colonna del file è elencata insieme a un valore di esempio. Per ciascuna colonna, usa il menu a tendina per scegliere il campo B1 corrispondente. Lo strumento riconosce automaticamente i nomi di colonna più comuni come "Nome", "Email" o "CAP", ma dovresti verificare ogni riga e correggere ciò che non ha riconosciuto.

I campi B1 disponibili includono:

- Nome, Cognome, Secondo nome, Soprannome, Nome visualizzato, Titolo/Prefisso, Suffisso
- Email, Telefono di casa, Cellulare, Telefono di lavoro
- Indirizzo riga 1, Indirizzo riga 2, Città, Provincia, CAP
- Data di nascita, Anniversario, Genere, Stato civile, Stato di membro
- Nome del nucleo familiare/famiglia
- Nome del gruppo — assegna la persona a un gruppo tramite il nome
- **Campo personalizzato (abbina per nome)** — salva la colonna in uno dei [campi personalizzati delle persone](../settings/custom-fields.md) della tua chiesa. Compare una casella **Nome del campo B1**, già compilata con l'intestazione della colonna. Modificala inserendo il nome del campo esattamente come appare in B1 (le maiuscole non contano).
- **Risposta a modulo (campo personalizzato)** — salva il valore di quella colonna come campo personalizzato collegato alla scheda della persona. Se usi questa opzione, ti verrà chiesto di dare un nome al modulo.

Le date possono essere in formati comuni come `17/9/1994` e vengono convertite automaticamente. Per i campi personalizzati, i campi Sì/No accettano valori come Sì, No, S, N, Vero, Falso, 1 e 0, mentre i campi a scelta multipla accettano sia il testo della scelta sia il suo valore.

:::info
Crea i tuoi campi personalizzati delle persone in B1 Admin prima di importare. Al termine dell'importazione, il passaggio **Campi personalizzati** elenca i nomi di colonna che non corrispondono a un campo B1 e conta i valori che non rientrano nel tipo di campo. Questi valori vengono saltati, e il resto dell'importazione si completa comunque.
:::

Le colonne che non vuoi importare possono essere impostate su **(Salta)**. Almeno un campo nome (Nome o Cognome) deve essere associato prima di poter continuare.

Fai clic su **Conferma associazione e importa** per passare all'anteprima.

---

## Passaggio 2 - Anteprima dei dati

Dopo il caricamento, lo strumento mostra un'anteprima di tutto ciò che verrà importato. Usa le schede per esaminare ogni tipo di dato:

- **Persone** — Elencate per nucleo familiare, con le foto se incluse.
- **Gruppi** — Organizzati per campus, culto, orario e categoria.
- **Presenze** — Date delle sessioni, gruppi e numero di visite.
- **Donazioni** — Lotti, fondi, donatori e importi.
- **Moduli** — Nomi dei moduli e tipi di contenuto.

Controlla attentamente prima di procedere. Se qualcosa non sembra corretto, fai clic su **Ricomincia** e correggi il file di origine.

---

## Passaggio 3 - Scegli la destinazione

Seleziona dove vuoi che vadano i dati:

- **Database B1** — Importa direttamente nel database B1 della tua chiesa. Dopo aver selezionato questa opzione, lo strumento mostra il numero finale di record da aggiungere. Fai clic su **Avvia trasferimento** per confermare.
- **Archivio ZIP B1 Export** — Scarica i tuoi dati come file zip in formato B1, che potrà essere ripristinato in seguito con **Archivio ZIP B1 Import**. Utile per i backup.
- **Archivio ZIP Breeze Export** — Converte i tuoi dati nel formato Breeze.
- **Archivio ZIP Planning Center** — Converte i tuoi dati nel formato Planning Center.

:::warning
L'origine e la destinazione non possono essere dello stesso formato. Se coincidono, lo strumento ti avvisa per evitare duplicazioni accidentali.
:::

---

## Passaggio 4 - Esecuzione

Lo strumento elabora il trasferimento e mostra l'avanzamento di ciascun passaggio:

- Campus, culti e orari
- Persone
- Foto
- Gruppi e membri dei gruppi
- Donazioni
- Presenze
- Moduli, domande, risposte e compilazioni dei moduli
- Campi personalizzati (se hai associato colonne di campi personalizzati)
- Compressione (solo per le destinazioni in archivio zip)

Quando la destinazione è **Database B1**, la scheda di avanzamento si intitola **Avanzamento importazione** e termina con **Importazione completata!** (oppure **Importazione completata con errori**). Per le destinazioni in archivio zip, i messaggi equivalenti dicono **Esportazione**.

:::warning
Non chiudere il browser mentre il trasferimento è in corso. Attendi finché tutti i passaggi non risultano completati.
:::

---

## Preparare un Archivio ZIP Breeze Import

1. In Breeze, vai su **Impostazioni** e fai clic su **Esporta** nella barra laterale sinistra.
2. Esporta tre file separati: **Persone**, **Tag** e **Contributi**.
3. Seleziona tutti e tre i file, fai clic con il tasto destro e comprimili in un unico file zip.
   - Su Mac: seleziona i file, fai clic con il tasto destro e scegli **Comprimi**.
   - Su PC: seleziona i file, fai clic con il tasto destro, scegli **Invia a**, poi **Cartella compressa (in formato zip)**.
4. Carica il file zip usando l'opzione **Archivio ZIP Breeze Import** nel Passaggio 1.

L'importazione da Breeze trasferisce automaticamente persone, gruppi (tag) e record di donazioni.

---

## Preparare un'esportazione da Planning Center

1. Accedi a Planning Center e apri il prodotto **People**.
2. Nella barra laterale sinistra, fai clic su **Lists** e crea un elenco che includa tutte le persone che vuoi trasferire. (Se hai già un elenco di tutta la comunità, usa quello.)
3. Apri l'elenco e usa l'opzione **export** per scaricare le persone come file **CSV**. Includi i campi che vuoi mantenere: nome, email, telefono, indirizzo, data di nascita, genere e stato di membro vengono tutti associati a B1.
4. Se Planning Center ti fornisce più file, selezionali tutti, fai clic con il tasto destro e comprimili in un unico zip.
   - Su Mac: seleziona i file, fai clic con il tasto destro e scegli **Comprimi**.
   - Su PC: seleziona i file, fai clic con il tasto destro, scegli **Invia a**, poi **Cartella compressa (in formato zip)**.
5. Carica il CSV o lo zip usando l'opzione **Archivio ZIP Planning Center** nel Passaggio 1.

Dopo il caricamento, prosegui con l'anteprima e verifica che persone e nuclei familiari siano corretti prima di eseguire l'importazione.

---

## Preparare un'esportazione da Tithe.ly

1. In Tithe.ly, esporta i dati delle **persone** come file CSV o Excel. Puoi anche esportare un file **Offerte** separato se vuoi importare i record delle donazioni.
2. Lo strumento riconosce automaticamente dai nomi delle colonne se il file contiene dati di persone o di offerte.
3. Carica il file usando l'opzione **CSV di Tithe.ly** nel Passaggio 1.

:::info
Le esportazioni di Tithe.ly si importano un file alla volta. Esegui il processo due volte se devi importare separatamente persone e offerte.
:::

---

## Preparare un'esportazione da CCB o Pushpay

1. In Church Community Builder o Pushpay, esporta i dati delle **persone** come file CSV. Puoi anche esportare un file separato di offerte/contributi.
2. Lo strumento riconosce automaticamente dai nomi delle colonne se il file contiene dati di persone o di offerte.
3. Carica il file usando l'opzione **CSV di CCB / Pushpay** nel Passaggio 1.

---

## Dopo l'importazione

Una volta completato il trasferimento, dedica qualche minuto a verificare i dati:

1. Consulta la pagina [Persone](../people/adding-people.md) e controlla a campione alcuni profili.
2. Conferma che nomi, email, numeri di telefono e indirizzi siano stati importati correttamente.
3. Verifica che i collegamenti tra i nuclei familiari siano integri. Il ruolo nel nucleo familiare di ciascuna persona (Capofamiglia, Coniuge, Figlio o Altro) viene mantenuto quando l'origine lo prevede: la colonna **householdRole** in un Archivio ZIP B1 Import, **Ruolo familiare** in Breeze o Tithe.ly e **Posizione familiare** in CCB / Pushpay. Ruoli come "Capofamiglia", "Principale", "Moglie" o "Figlio" vengono convertiti nel ruolo B1 corrispondente. Le importazioni da Planning Center e da CSV / Excel personalizzato non hanno una colonna dei ruoli, quindi a quelle persone viene assegnato **Altro**; puoi cambiare il ruolo dal nucleo familiare della persona nella pagina [Persone](../people/adding-people.md#managing-households).
4. Controlla gruppi e registri delle offerte importati.

Se noti dei problemi, puoi modificare i singoli profili dalla pagina Persone. Puoi anche eseguire di nuovo lo strumento di trasferimento per [esportare i tuoi dati](exporting-data.md) come backup.

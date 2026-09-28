---
title: "Importazione di Dati"
---

# Importazione di Dati

<div class="article-intro">

Lo strumento B1 Transfer rende facile importare i tuoi dati esistenti in B1, sia che tu stia iniziando da zero da un foglio di calcolo, migrando da un'altra piattaforma di gestione della chiesa, o importando record di donazione. Può anche essere utilizzato per esportare o eseguire il backup dei tuoi dati in qualsiasi momento.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con accesso a **Impostazioni**.
- Hai i tuoi dati esportati e pronti dal tuo sistema precedente prima di iniziare.
- Questo strumento è destinato alla migrazione iniziale dei dati. Se usi già B1 da un po', l'importazione di nuovo potrebbe creare record duplicati.

</div>

## Accesso allo Strumento di Trasferimento

1. Accedi a **B1 Admin**.
2. Apri il **menu della sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Impostazioni**.
3. Fai clic sul pulsante **Importa/Esporta** in alto a destra dell'intestazione della pagina.
4. Questo aprirà lo strumento **B1 Transfer** in una nuova scheda su [transfer.b1.church](https://transfer.b1.church).

Lo strumento di trasferimento ti guida attraverso quattro passaggi: Origine, Anteprima, Destinazione e Esegui.

---

## Passaggio 1 - Scegli la Tua Origine

Seleziona da dove provengono i tuoi dati. Ci sono sette opzioni:

- **B1 Database** - Estrae i dati direttamente dalla tua chiesa B1 esistente. Utile per fare un backup o convertire i tuoi dati in un altro formato. Devi essere collegato per usare questa opzione.
- **B1 Import Zip** - Un file zip nel formato proprio di B1. Questo è principalmente utilizzato per ripristinare un'esportazione B1 precedente.
- **Breeze Import Zip** - Un file zip contenente file esportati da Breeze ChMS.
- **Planning Center Zip** - Un file zip o CSV esportato da Planning Center.
- **Custom CSV / Excel** - Qualsiasi file CSV o Excel contenente dati di persone. Dopo il caricamento, mapperai le tue colonne ai campi B1 prima che l'importazione proceda.
- **Tithe.ly CSV** - Un file di esportazione di persone o donazioni da Tithe.ly (formato CSV o Excel accettato).
- **CCB / Pushpay CSV** - Un CSV di esportazione di persone o donazioni da Church Community Builder o Pushpay.

Puoi trascinare e rilasciare il tuo file nell'area di caricamento, o fare clic per cercarlo.

---

## Passaggio 1b - Mappa i Tuoi Campi (Solo Custom CSV / Excel)

Se hai selezionato **Custom CSV / Excel**, dopo il caricamento del file lo strumento mostrerà una schermata di mappatura dei campi prima di passare all'anteprima.

Ogni colonna del tuo file è elencata accanto a un valore di esempio. Per ogni colonna, usa il menu a discesa per scegliere il campo B1 corrispondente. Lo strumento rileverà automaticamente nomi di colonna comuni come "First Name", "Email" o "Zip Code", ma dovresti rivedere ogni riga e correggere tutto ciò che ha mancato.

I campi B1 disponibili includono:

- Nome, Cognome, Secondo Nome, Soprannome, Nome Visualizzato, Titolo/Prefisso, Suffisso
- Email, Telefono Casa, Telefono Mobile, Telefono Lavoro
- Indirizzo Riga 1, Indirizzo Riga 2, Città, Provincia, Codice Postale
- Data di Nascita, Anniversario, Genere, Stato Matrimoniale, Stato di Iscrizione
- Nome Nucleo Familiare
- Nome Gruppo - assegna la persona a un gruppo per nome
- **Campo Personalizzato (corrispondenza per nome)** - salva la colonna in uno dei [campi persona personalizzati](../settings/custom-fields.md) della tua chiesa. Appare una casella **Nome Campo B1**, compilata con l'intestazione della colonna. Cambiarla al nome esatto del campo come appare in B1 (le maiuscole non contano).
- **Risposta Modulo (campo personalizzato)** - salva il valore di quella colonna come campo personalizzato allegato al record della persona. Se usi questa opzione, ti verrà chiesto di assegnare un nome al modulo.

Le date possono essere in formati comuni come `17/9/1994` e vengono convertite automaticamente. Per i campi personalizzati, i campi Sì/No accettano valori come Sì, No, S, N, Vero, Falso, 1 e 0, e i campi a scelta multipla accettano il testo della scelta o il suo valore.

:::info
Crea i tuoi campi persona personalizzati in B1 Admin prima di importare. Quando l'importazione si conclude, il passaggio **Campi Personalizzati** elenca i nomi di colonna che non corrispondono a un campo B1 e conta eventuali valori che non si adattano al tipo di campo. Questi valori vengono saltati e il resto dell'importazione continua comunque.
:::

Le colonne che non desideri importare possono essere impostate su **(Skip)**. Almeno un campo nome (Nome o Cognome) deve essere mappato prima di poter continuare.

Fai clic su **Conferma Mappatura e Importa** per procedere all'anteprima.

---

## Passaggio 2 - Anteprima i Tuoi Dati

Dopo il caricamento, lo strumento visualizza un'anteprima di tutto ciò che verrà importato. Usa le schede per rivedere ogni tipo di dato:

- **Persone** - Elencate per nucleo familiare, con foto se incluse.
- **Gruppi** - Organizzati per campus, servizio, ora e categoria.
- **Frequenza** - Date di sessione, gruppi e conteggi di visite.
- **Donazioni** - Batch, fondi, donatori e importi.
- **Moduli** - Nomi dei moduli e tipi di contenuto.

Rivedi tutto attentamente prima di procedere. Se qualcosa sembra sbagliato, fai clic su **Ricomincia** e correggi il tuo file di origine.

---

## Passaggio 3 - Scegli la Tua Destinazione

Seleziona dove vuoi che vadano i dati:

- **B1 Database** - Importa direttamente nel database B1 della tua chiesa. Dopo aver selezionato, lo strumento mostrerà un conteggio finale dei record da aggiungere. Fai clic su **Avvia Trasferimento** per confermare.
- **B1 Export Zip** - Scarica i tuoi dati come file zip in formato B1. Buono per i backup.
- **Breeze Export Zip** - Converte i tuoi dati in formato Breeze.
- **Planning Center Zip** - Converte i tuoi dati in formato Planning Center.

:::warning
L'origine e la destinazione non possono essere nello stesso formato. Se corrispondono, lo strumento ti avvertirà per prevenire duplicazione accidentale.
:::

---

## Passaggio 4 - Esegui

Lo strumento elabora il trasferimento e mostra il progresso per ogni passaggio:

- Campus, Servizi e Orari
- Persone
- Foto
- Gruppi e Membri del Gruppo
- Donazioni
- Frequenza
- Moduli, Domande, Risposte e Invii di Moduli
- Campi Personalizzati (quando hai mappato qualsiasi colonna di Campo Personalizzato)
- Compressione (solo per destinazioni di file zip)

:::warning
Non chiudere il browser mentre il trasferimento è in corso. Aspetta fino a quando tutti i passaggi non risultano completi.
:::

---

## Preparazione di un Breeze Import Zip

1. In Breeze, vai a **Impostazioni** e fai clic su **Esporta** nella barra laterale sinistra.
2. Esporta tre file separati: **Persone**, **Tag** e **Contributi**.
3. Seleziona tutti e tre i file, fai clic con il pulsante destro del mouse e comprimili in un unico file zip.
   - Su Mac: seleziona i file, fai clic con il pulsante destro del mouse e scegli **Comprimi**.
   - Su PC: seleziona i file, fai clic con il pulsante destro del mouse, scegli **Invia a**, quindi **Cartella compressa (zippata)**.
4. Carica il file zip utilizzando l'opzione **Breeze Import Zip** nel Passaggio 1.

L'importazione di Breeze trasferisce persone, gruppi (tag) e record di donazione automaticamente.

---

## Preparazione di un'Esportazione di Planning Center

1. Accedi a Planning Center e apri il prodotto **Persone**.
2. Nella barra laterale sinistra, fai clic su **Elenchi** e crea un elenco che includa tutti coloro che desideri portare. (Se hai già un elenco di tutta la tua congregazione, usalo.)
3. Apri l'elenco e utilizza la sua opzione di **esportazione** per scaricare le tue persone come file **CSV**. Includi i campi che desideri mantenere - nome, email, telefono, indirizzo, data di nascita, genere e stato di iscrizione si mappano tutti su B1.
4. Se Planning Center ti dà più di un file, selezionali tutti, fai clic con il pulsante destro del mouse e comprimili in un unico zip.
   - Su Mac: seleziona i file, fai clic con il pulsante destro del mouse e scegli **Comprimi**.
   - Su PC: seleziona i file, fai clic con il pulsante destro del mouse, scegli **Invia a**, quindi **Cartella compressa (zippata)**.
5. Carica il CSV o zip utilizzando l'opzione **Planning Center Zip** nel Passaggio 1.

Dopo il caricamento, continua all'anteprima e conferma che le tue persone e i nuclei familiari sembrino corretti prima di eseguire l'importazione.

---

## Preparazione di un'Esportazione di Tithe.ly

1. In Tithe.ly, esporta i tuoi dati di **Persone** come file CSV o Excel. Puoi anche esportare un file di **Donazioni** separato se desideri portare record di donazione.
2. Lo strumento rileverà automaticamente se il file contiene dati di persone o donazioni in base ai nomi delle colonne.
3. Carica il file utilizzando l'opzione **Tithe.ly CSV** nel Passaggio 1.

:::info
Le esportazioni di Tithe.ly possono essere importate un file alla volta. Esegui il processo due volte se hai bisogno di importare i record di persone e donazioni separatamente.
:::

---

## Preparazione di un'Esportazione di CCB o Pushpay

1. In Church Community Builder o Pushpay, esporta i tuoi dati di **Persone** come file CSV. Puoi anche esportare un file di donazioni/contributi separato.
2. Lo strumento rileverà automaticamente se il file contiene dati di persone o donazioni in base ai nomi delle colonne.
3. Carica il file utilizzando l'opzione **CCB / Pushpay CSV** nel Passaggio 1.

---

## Dopo l'Importazione

Una volta completato il trasferimento, dedica qualche minuto a verificare i tuoi dati:

1. Sfoglia la pagina [Persone](../people/adding-people.md) e fai un controllo spot su alcuni profili.
2. Conferma che nomi, email, numeri di telefono e indirizzi siano passati correttamente.
3. Verifica che le connessioni del nucleo familiare siano intatte.
4. Rivedi i gruppi importati e i record di donazione.

Se noti problemi, puoi modificare profili individuali dalla pagina Persone. Puoi anche eseguire di nuovo lo strumento di trasferimento per [esportare i tuoi dati](exporting-data.md) come backup.

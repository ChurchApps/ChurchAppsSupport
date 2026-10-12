---
title: "Aggiunta di Persone"
---

# Aggiunta di Persone

<div class="article-intro">

La sezione Persone è il fondamento di B1 Admin — è il database dei membri della tua chiesa. Ogni altra funzionalità (gruppi, frequenza, donazioni, moduli) si ricollega a record di persone. Questa guida ti guida attraverso l'aggiunta di qualcuno al tuo database, la modifica dei loro dettagli e il collegamento dei familiari in nuclei familiari.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con il permesso di gestire le persone. Vedi [Ruoli e Autorizzazioni](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se stai aggiungendo più di una manciata di persone, considera di utilizzare lo strumento [Importazione CSV](importing-data.md).

</div>

## Aggiunta di una Persona

1. Accedi al dashboard B1.church Admin.
2. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e fai clic su **Persone**.
3. Fai clic sul pulsante **Aggiungi Persona** nell'intestazione della pagina. La pagina scorre fino al modulo **Aggiungi nuova persona** sotto la directory.
4. Inserisci il **Nome**, il **Cognome** e l'**Email** della persona, quindi fai clic su **Aggiungi**.

La pagina del profilo della persona si aprirà, pronta per aggiungere più dettagli.

:::tip
Se stai migrando da un altro sistema di gestione della chiesa, la funzionalità [Importa Dati](importing-data.md) ti consente di portare l'intera directory da un file CSV — molto più veloce che aggiungere le persone una alla volta.
:::

### Avvisi di Duplicati

Se l'indirizzo email (o, quando si crea una persona dal modulo Modifica completo, il numero di telefono o il nome + cognome + data di nascita corrispondenti) corrisponde a qualcuno nel tuo database, viene visualizzata una finestra di dialogo **Possibile Duplicato** prima che il nuovo record venga salvato. Elenca ogni persona corrispondente insieme al suo email, telefono e data di nascita in modo che tu possa confrontare.

- Fai clic su **Usa Esistente** accanto a una corrispondenza per utilizzare il record di quella persona invece di crearne uno nuovo.
- Fai clic su **Crea Comunque** per aggiungere la nuova persona anche se è stata trovata una possibile corrispondenza.

Questo controlla i duplicati solo quando stai creando una persona completamente nuova — la modifica di un record esistente non lo attiva mai. Previene solo i nuovi duplicati; non unisce due record che già esistono.

## Modifica dei Dettagli

1. Nella pagina del profilo della persona, fai clic sul pulsante **Modifica** sotto i suoi dettagli di contatto a sinistra.
2. Nel modulo **Dettagli personali**, inserisci informazioni aggiuntive come il secondo nome, lo stato di iscrizione (**Visitatore**, **Ospite**, **Frequentatore abituale**, **Membro**, **Staff**, **Inattivo** o **Deceduto**), le date, l'indirizzo, i numeri di telefono e (per i bambini e gli studenti) il voto e la scuola.
3. Fai clic su **Salva** per archiviare le informazioni personali.

A sinistra del profilo ci sono la foto della persona, il nome, lo stato di iscrizione, i dettagli di contatto, gli eventuali valori dei [campi personalizzati](../settings/custom-fields.md) e il nucleo familiare. Fai clic sulla foto per cambiarla. Sotto il pulsante **Modifica** ci sono altre azioni: **Workflow** (aggiungi la persona a un [workflow](../serving/workflows.md)), **Unisci**, **Esporta** ed **Esporta dati**.

Il resto del profilo mostra un riepilogo per ciascun tipo di informazione correlata:

- **Frequenza** — Mostra quali delle ultime settimane la persona ha frequentato e le sue visite più recenti. Fai clic su **Tutti gli anni** per la cronologia completa delle visite, incluso il campus, il servizio, l'orario del servizio, il gruppo e una colonna **Arrivato** con l'orario del check-in al chiosco (mostrato come un trattino per le visite registrate senza check-in al chiosco), oppure su **Stampa** per stamparla. Per le tendenze a livello di chiesa anziché la storia di una persona, vedi [Tracciamento della Frequenza](../attendance/tracking-attendance.md)
- **Donazioni** — Mostra le offerte di quest'anno. Fai clic su **Tutti gli anni** per la [cronologia completa delle donazioni](../donations/recording-donations.md), oppure su **Registra un'offerta** per registrarne una nuova
- **Gruppi** — Elenca le [appartenenze ai gruppi](../groups/group-members.md) della persona
- **Note** — Mostra le note recenti sulla persona (cura pastorale, seguiti, ecc.). Fai clic su **Tutte le note** per leggere e aggiungere note
- **Moduli** — Elenca i moduli della persona e indica se ciascuno è stato inviato (vedi [Utilizzo dei Moduli](#working-with-forms) qui sotto)

Quando apri una di queste viste complete, fai clic sul link **Torna a** con il nome della persona in cima per tornare al profilo.

## Invio di Email a una Persona

Se la persona ha un indirizzo email nel file, nella colonna a sinistra del profilo, sotto i dettagli di contatto, compare un pulsante **Email**.

1. Nel profilo della persona, fai clic su **Email**.
2. Si apre una finestra di dialogo **Email** intitolata con il nome della persona, mostrando **Invio a** con l'indirizzo della persona.
3. Facoltativamente scegli un modello salvato da **Carica Modello (facoltativo)**.
4. Inserisci un **Oggetto** e componi il messaggio.
5. Fai clic su **Invia Email**.

Per scrivere il messaggio nel tuo programma di posta invece, fai clic su **Apri nella mia app di posta**.

:::info
L'invio da B1 utilizza gli stessi limiti di approvazione e giornalieri della posta del gruppo. Se la tua chiesa non è ancora stata approvata, la finestra di dialogo ti chiede di richiedere una revisione — puoi comunque fare clic su **Apri nella mia app di posta** nel frattempo. Vedi [Attivazione della Posta di Gruppo per la Tua Chiesa](../groups/group-members.md#turning-on-group-email-for-your-church). Gli utenti senza il permesso di modificare i membri del gruppo vanno direttamente alla loro app di posta quando fanno clic su **Email**.
:::

## Utilizzo dei Moduli {#working-with-forms}

Puoi compilare i moduli personalizzati direttamente dal profilo di una persona. Si tratta di moduli definiti dall'utente che puoi creare seguendo la guida [Creazione di Moduli](../forms/creating-forms.md).

1. Nel profilo della persona, trova la sezione **Moduli**. Elenca ogni modulo insieme al fatto che sia stato **Inviato** o **Non inviato**.
2. Fai clic sul nome di un modulo per aprirlo (oppure fai clic su **Tutti i moduli** per vedere l'elenco completo).
3. Fai clic sull'**icona di modifica** (matita) del modulo, compila i dettagli e fai clic su **Salva**.

Una volta inviato un modulo, fai clic sull'**icona di stampa** accanto ad esso per stampare le risposte riempite di quella persona.

Se un invio è finito sulla persona sbagliata, fai clic sull'icona **Cambia persona** (due frecce) accanto ad esso per spostarlo a qualcun altro o scollegarlo. Vedi [Modifica della Persona su un Invio](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
I moduli collegati al profilo di una persona utilizzano il tipo di modulo **Persone**. Se hai bisogno di un modulo autonomo (come una registrazione di evento), vedi l'opzione [modulo Stand Alone](../forms/creating-forms.md) nella guida dei moduli.
:::

:::tip
Se hai solo bisogno di tracciare uno o due pezzi di informazioni aggiuntive sulle persone — una data, un numero, una risposta sì/no — usa [Campi Personalizzati](../settings/custom-fields.md) invece di un modulo. Sono più veloci da compilare e sono ricercabili direttamente nella Ricerca Avanzata.
:::

## Gestione dei Nuclei Familiari

I nuclei familiari ti permettono di collegare i familiari insieme. Questo è particolarmente utile per il [check-in](../attendance/check-in.md), dove un genitore può eseguire il check-in di tutti i suoi figli in una volta.

1. Nel profilo di una persona, fai clic su **Modifica** accanto all'intestazione **Nucleo familiare** a sinistra.
2. Si aprirà l'editor del nucleo familiare. Seleziona il **ruolo del nucleo familiare** per la persona corrente (ad es. Capo, Coniuge, Figlio, Altro).
3. Fai clic sull'icona **Aggiungi** per aggiungere un altro membro del nucleo familiare.
4. Sotto **Aggiungi membro del nucleo familiare**, digita il nome della persona nella casella di ricerca e premi **Invio** o fai clic sull'icona di ricerca. (Prima di digitare, viene mostrato un breve elenco di **Persone recenti**.)
5. Quando la persona appare nei risultati, fai clic sul suo nome o sull'icona di aggiunta accanto ad esso.
6. Scegli il loro ruolo nel nucleo familiare e fai clic su **Salva** per completare la configurazione del nucleo familiare.

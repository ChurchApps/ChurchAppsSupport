---
title: "Aggiungere persone"
description: "Aggiungi una persona al database della chiesa in B1 Admin, compila i suoi dati e collega i familiari in nuclei familiari per il check-in e i report."
---

# Aggiungere persone

<div class="article-intro">

La sezione Persone è la base di B1 Admin: è il database dei membri della tua chiesa. Ogni altra funzione (gruppi, presenze, donazioni, moduli) fa riferimento alle schede delle persone. Questa guida ti accompagna nell'aggiunta di una persona al database, nella modifica dei suoi dati e nel collegamento dei familiari in nuclei familiari.

</div>

## Video tutorial {#training-video}

<YouTube id="GtsczJ8JPio" title="Aggiungere persone e nuclei familiari in B1" next="Importare il database delle persone in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di gestire le persone. Vedi [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se devi aggiungere più di qualche persona, valuta lo strumento di [importazione CSV](importing-data.md).

</div>

## Aggiungere una persona {#adding-a-person}

1. Vai alla dashboard di B1.church Admin.
2. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e clicca su **Persone**.
3. Clicca sul pulsante **Aggiungi persona** nell'intestazione della pagina. La pagina scorre fino al modulo **Aggiungi una nuova persona** sotto l'anagrafica.
4. Compila **Nome** e **Cognome** (entrambi obbligatori). Facoltativamente aggiungi **Titolo**, **Email** e **Cellulare**, poi clicca su **Aggiungi** (oppure premi **Invio**).

B1 crea un nuovo nucleo familiare per la persona, con il nome del suo cognome.

Si aprirà la scheda della persona, pronta per aggiungere altri dettagli.

:::tip
Se stai passando da un altro sistema di gestione della chiesa, la funzione [Importa dati](importing-data.md) ti permette di portare l'intera anagrafica da un file CSV: molto più veloce che aggiungere le persone una alla volta.
:::

### Avvisi di duplicato {#duplicate-warnings}

Quando inserisci un indirizzo email nel modulo **Aggiungi una nuova persona**, B1 controlla i duplicati prima di salvare. Se l'indirizzo email (oppure, quando crei una persona dal modulo completo di modifica, il numero di telefono o la combinazione di nome, cognome e data di nascita) corrisponde a qualcuno già presente nel database, prima che il nuovo record venga salvato compare una finestra **Possibile duplicato**. Elenca ogni persona corrispondente con email, telefono e data di nascita, così puoi confrontarli.

- Clicca su **Usa esistente** accanto a una corrispondenza per usare la scheda di quella persona invece di crearne una nuova.
- Clicca su **Crea comunque** per aggiungere la nuova persona anche se è stata trovata una possibile corrispondenza.

Il controllo dei duplicati avviene solo quando crei una persona nuova: modificare una scheda esistente non lo attiva mai. Serve a prevenire nuovi duplicati; non unisce due schede già esistenti.

## Modificare i dettagli {#editing-details}

1. Nella scheda della persona, clicca sul pulsante **Modifica** a sinistra, sotto la sezione **Nucleo familiare**.
2. Nel modulo **Dati personali**, compila le informazioni aggiuntive come il **Titolo** (scegli Sig., Sig.ra, Sig.na, Dott., Dott.ssa, Prof., Rev. o Pastore dall'elenco, oppure scrivi il tuo, fino a 10 caratteri), il secondo nome, il soprannome, le **Note per il cartellino** (stampate sui cartellini nominativi del check-in e mostrate come etichetta di avviso nella scheda), il **Numero donatore**, lo stato di membership (**Visitatore**, **Ospite**, **Frequentatore abituale**, **Membro**, **Staff**, **Inattivo** o **Deceduto**), il genere, lo stato civile, la data di nascita e di anniversario, la sede, l'indirizzo, i numeri di telefono con interni e (per bambini e studenti) classe e scuola. Seleziona **Nascondi me dall'anagrafe dei membri** per escludere la persona dall'[anagrafe stampata](./print-directory.md) e dall'anagrafe dei membri dell'app. Gli eventuali [campi personalizzati](../settings/custom-fields.md) compaiono sotto **Campi personalizzati**.
3. Clicca su **Salva** per memorizzare i dati personali, oppure su **Annulla** per chiudere il modulo senza salvare.

Se modifichi l'indirizzo di una persona che condivide il nucleo familiare con altri, B1 chiede se usare il nuovo indirizzo per l'intero nucleo. Il modulo ha anche un pulsante **Elimina** (per eliminare la persona) e una sezione **Gestione dei dati** per esportare o anonimizzare i dati della persona (vedi [Sicurezza dei dati](../settings/data-security.md#using-the-data-management-tools)).

Il lato sinistro della scheda mostra la foto della persona, nome, età, genere, stato civile, sede, stato di membership, dati di contatto, eventuali valori dei [campi personalizzati](../settings/custom-fields.md) e il suo nucleo familiare. Le etichette sotto il nome indicano se la persona **Ha l'accesso** (un account B1), se è **Nascosta dall'anagrafe** o se ha note per il cartellino. Sopra il nucleo familiare, **Aggiunto** mostra la data di creazione del record (solo per le persone aggiunte da fine ottobre 2026). Clicca sulla foto per cambiarla. Sotto il nucleo familiare trovi i pulsanti **Modifica**, **Email** e **SMS** (vedi sotto) e alcune altre azioni: **Flusso di lavoro** (aggiungi la persona a un [flusso di lavoro](../serving/workflows.md)), **Unisci**, **Esporta** ed **Esporta dati**. Se la persona appartiene a un nucleo familiare, una sezione **Ritiro** elenca le persone autorizzate a ritirare i bambini al [check-in](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).

Il resto della scheda mostra una sezione di riepilogo per ciascun tipo di informazione correlata:

- **Presenze**: mostra in quali delle ultime settimane la persona è stata presente e le sue visite più recenti. Clicca su **Tutti gli anni** per la cronologia completa delle visite, inclusi sede, culto, orario del culto, gruppo e una colonna **Check-in** con l'orario del check-in al chiosco (indicato con un trattino per le visite registrate senza check-in al chiosco), oppure su **Stampa** per stamparla (la stampa riporta in alto al centro il logo e il nome della chiesa, sopra il nome della persona). Per le tendenze dell'intera chiesa anziché la cronologia di una persona, vedi [Monitorare le presenze](../attendance/tracking-attendance.md)
- **Donazioni**: mostra le offerte di quest'anno, incluse quelle destinate a fondi non detraibili. Clicca su **Tutti gli anni** per l'intera [cronologia delle donazioni](../donations/recording-donations.md), oppure su **Registra un dono** per registrarne uno nuovo. Se la tua chiesa ha attivato la [Privacy delle offerte](../settings/church-settings.md#giving-privacy), gli importi restano nascosti finché non clicchi su **Mostra offerte**
- **Gruppi**: elenca le [appartenenze ai gruppi](../groups/group-members.md) della persona, con **Iscritto il** e la data di iscrizione a ciascun gruppo quando è registrata
- **Note**: mostra le note recenti sulla persona (cura pastorale, follow-up, ecc.). Clicca su **Tutte le note** per leggerle e aggiungerne. Ogni nota indica chi l'ha scritta e la data e l'ora di pubblicazione. Per formattare una nota, seleziona il testo nella casella della nota e scegli **Grassetto**, **Corsivo**, **Elenco puntato** o **Elenco numerato** dal piccolo menu a comparsa (oppure premi **Ctrl+B** / **Ctrl+I**, **Cmd** su Mac); la nota mostra la formattazione una volta pubblicata. Eliminare una nota chiede prima una conferma, perché non può essere annullata. Per vedere le note recenti di tutte le persone insieme, usa la pagina [Note](./notes.md)
- **Moduli**: elenca i moduli della persona e indica se ciascuno è stato inviato (vedi [Lavorare con i moduli](#working-with-forms) più sotto)
- **Richieste e iscrizioni**: elenca le [richieste di evento](../calendars/approvals.md) di sale e risorse della persona (con le sale o le risorse richieste e **In attesa**, **Approvata** o **Rifiutata**) e le sue [iscrizioni a eventi](../calendars/paid-registrations.md) (con il numero di persone iscritte e **Iscritto**, **In attesa**, **In lista d'attesa** o **Annullato**), dalla più recente. Vengono mostrate le cinque più recenti; clicca su **Tutte le richieste** per l'elenco completo. Vedi le richieste di evento se puoi usare la pagina [Approvazioni](../calendars/approvals.md), e le iscrizioni se puoi visualizzarle; senza nessuno dei due, la sezione è nascosta

Quando apri una di queste viste complete, clicca sul link **Torna a** con il nome della persona in alto per tornare alla scheda.

## Inviare un'email a una persona {#emailing-a-person}

Se la persona ha un indirizzo email registrato, accanto a **Modifica**, sotto il nucleo familiare sul lato sinistro della scheda, compare un pulsante **Email**.

1. Nella scheda della persona, clicca su **Email**.
2. Si apre una finestra **Email** intitolata con il nome della persona, che mostra **Destinatario** con l'indirizzo della persona.
3. Facoltativamente, scegli un modello salvato da **Carica modello (facoltativo)**.
4. Inserisci un **Oggetto** e scrivi il messaggio.
5. Clicca su **Invia email**.

Per scrivere invece il messaggio nel tuo programma di posta, clicca su **Apri nella mia app email**.

:::info
L'invio da B1 usa le stesse approvazioni e gli stessi limiti giornalieri dell'email di gruppo. Se la tua chiesa non è ancora stata approvata, la finestra ti chiede di richiedere una revisione: nel frattempo puoi comunque cliccare su **Apri nella mia app email**. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church). Gli utenti senza il permesso di modificare i membri dei gruppi passano direttamente all'app di posta quando cliccano su **Email**.
:::

## Inviare un SMS a una persona {#texting-a-person}

Se la tua chiesa ha collegato un [fornitore di SMS](../settings/church-settings.md#texting), hai il permesso di inviare messaggi e la persona ha un numero di cellulare, accanto a **Email** compare un pulsante **SMS**. Cliccalo, scrivi il **Messaggio** e clicca su **Invia**. La finestra mostra il numero a cui va l'SMS. Vedi [Inviare SMS ai membri dei gruppi](../groups/group-members.md#texting-group-members) per il funzionamento degli SMS.

### Promemoria SMS {#text-reminders}

I promemoria di attività, eventi e servizio vengono inviati via SMS solo alle persone che hanno attivato i messaggi di testo. Con lo stesso fornitore SMS, lo stesso permesso e lo stesso numero di cellulare, la scheda della persona mostra **Promemoria via SMS** sotto il suo numero di cellulare, con **Attivo** o **Disattivo**. Clicca su **Attiva** per iniziare a inviare i promemoria via SMS, oppure su **Disattiva** per interromperli. È lo stesso interruttore di **Messaggi di testo** nelle [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md) della persona, quindi entrambi potete modificarlo. Chi ha risposto STOP ai messaggi della tua chiesa non riceve comunque SMS di promemoria, anche con **Promemoria via SMS** attivo.

## Lavorare con i moduli {#working-with-forms}

Puoi compilare i moduli personalizzati direttamente dalla scheda di una persona. Sono moduli definiti dall'utente che puoi costruire seguendo la guida [Creare moduli](../forms/creating-forms.md).

1. Nella scheda della persona, trova la sezione **Moduli**. Elenca ciascun modulo e indica se è stato **Inviato** oppure **Non inviato**.
2. Clicca sul nome di un modulo per aprirlo (oppure clicca su **Tutti i moduli** per vedere l'elenco completo).
3. Clicca sull'**icona di modifica** (matita) del modulo, compila i dettagli e clicca su **Salva**.

Una volta inviato un modulo, clicca sull'**icona di stampa** accanto ad esso per stampare le risposte compilate da quella persona. Quando la persona ha un unico invio di un modulo, il modulo mostra **Inviato** con la data sopra le risposte.

Se un invio è finito sulla persona sbagliata, clicca sull'icona **Cambia persona** (due frecce) accanto ad esso per spostarlo su un'altra persona o scollegarlo. Vedi [Cambiare la persona di un invio](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
I moduli collegati alla scheda di una persona usano il tipo di modulo **Persone**. Se ti serve un modulo autonomo (come un'iscrizione a un evento), vedi l'[opzione Modulo autonomo](../forms/creating-forms.md) nella guida ai moduli.
:::

:::tip
Se ti basta tenere traccia di una o due informazioni extra sulle persone (una data, un numero, una risposta sì/no), usa invece i [Campi personalizzati](../settings/custom-fields.md) anziché un modulo. Sono più rapidi da compilare e sono ricercabili direttamente nella Ricerca avanzata.
:::

## Gestire i nuclei familiari {#managing-households}

I nuclei familiari permettono di collegare tra loro i membri della famiglia. Sono particolarmente utili per il [check-in](../attendance/check-in.md), dove un genitore può registrare tutti i figli in una volta.

1. Nella scheda di una persona, clicca su **Modifica** accanto al titolo **Nucleo familiare** a sinistra.
2. Si apre l'editor del nucleo familiare. Seleziona il **ruolo nel nucleo** della persona corrente (ad esempio, Capofamiglia, Coniuge, Figlio, Altro).
3. Clicca sull'icona **Aggiungi** per aggiungere un altro membro del nucleo familiare.
4. Sotto **Aggiungi membro del nucleo familiare**, scrivi il nome della persona nella casella di ricerca e premi **Invio** oppure clicca sull'icona di ricerca. (Prima di scrivere, viene mostrato un breve elenco di **Persone recenti**: le persone che hai scelto più di recente in una qualsiasi ricerca di persone, seguite dalle persone più nuove in B1.)
5. Quando la persona compare nei risultati, clicca sul suo nome o sull'icona di aggiunta accanto.
6. Scegli il suo ruolo nel nucleo e clicca su **Salva** per completare la configurazione del nucleo familiare.

Se la persona non è ancora in B1, clicca su **Aggiungi nuova persona** sotto la ricerca. Oltre a nome, titolo, email e cellulare, la finestra chiede il loro **Ruolo nel nucleo** (Capofamiglia, Coniuge, Figlio o Altro). La nuova persona viene creata e inserita in questo nucleo con quel ruolo; clicca su **Salva** per completare.

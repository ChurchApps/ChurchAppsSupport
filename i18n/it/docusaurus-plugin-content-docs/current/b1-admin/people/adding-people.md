---
title: "Aggiungere persone"
---

# Aggiungere persone

<div class="article-intro">

La sezione Persone è la base di B1 Admin: è il database dei membri della tua chiesa. Ogni altra funzione (gruppi, presenze, donazioni, moduli) è collegata alle schede persona. Questa guida ti accompagna nell'aggiungere qualcuno al database, modificarne i dati e collegare i familiari in nuclei familiari.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di gestire le persone. Consulta [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se devi aggiungere più di qualche persona, valuta l'uso dello strumento [Importazione CSV](importing-data.md).

</div>

## Aggiungere una persona

1. Vai alla dashboard di B1.church Admin.
2. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e fai clic su **Persone**.
3. Fai clic sul pulsante **Aggiungi persona** nell'intestazione della pagina. La pagina scorre fino al modulo **Aggiungi nuova persona** sotto la rubrica.
4. Inserisci **Nome**, **Cognome** ed **Email** della persona, poi fai clic su **Aggiungi**.

Si aprirà la pagina del profilo della persona, pronta per aggiungere altri dettagli.

:::tip
Se stai migrando da un altro sistema di gestione della chiesa, la funzione [Importa dati](importing-data.md) ti permette di importare l'intera rubrica da un file CSV, molto più velocemente che aggiungere le persone una alla volta.
:::

### Avvisi di duplicato

Se l'indirizzo email (oppure, quando si crea una persona dal modulo di modifica completo, il numero di telefono o la corrispondenza di nome + cognome + data di nascita) corrisponde a qualcuno già presente nel database, compare una finestra **Possibile duplicato** prima che il nuovo record venga salvato. Elenca ogni persona corrispondente con la sua email, il telefono e la data di nascita, così puoi confrontarli.

- Fai clic su **Usa esistente** accanto a una corrispondenza per usare la scheda di quella persona invece di crearne una nuova.
- Fai clic su **Crea comunque** per aggiungere la nuova persona anche se è stata trovata una possibile corrispondenza.

Questo controllo dei duplicati avviene solo quando crei una persona completamente nuova: la modifica di una scheda esistente non lo attiva mai. Serve a impedire nuovi duplicati, ma non unisce due record già esistenti.

## Modificare i dettagli

1. Nella pagina del profilo della persona, fai clic sul pulsante **Modifica** sotto i suoi recapiti, a sinistra.
2. Nel modulo **Dati personali**, inserisci ulteriori informazioni come il secondo nome, lo stato di membro (**Visitatore**, **Ospite**, **Frequentatore abituale**, **Membro**, **Staff**, **Inattivo** o **Deceduto**), le date, l'indirizzo, i numeri di telefono e (per bambini e studenti) classe e scuola.
3. Fai clic su **Salva** per memorizzare i dati personali.

Il lato sinistro del profilo mostra la foto, il nome, lo stato di membro, i recapiti, gli eventuali valori dei [campi personalizzati](../settings/custom-fields.md) e il nucleo familiare della persona. Fai clic sulla foto per cambiarla. Sotto il pulsante **Modifica** ci sono alcune altre azioni: **Flusso di lavoro** (aggiunge la persona a un [flusso di lavoro](../serving/workflows.md)), **Unisci**, **Esporta** ed **Esporta dati**.

Il resto del profilo mostra una sezione di riepilogo per ciascun tipo di informazione correlata:

- **Presenze** — Mostra in quali delle ultime settimane la persona è stata presente e le sue visite più recenti. Fai clic su **Tutti gli anni** per l'intero storico delle visite, inclusi campus, culto, orario di culto, gruppo e una colonna **Registrato alle** con l'orario del check-in al kiosk (indicato con un trattino per le visite registrate senza check-in al kiosk), oppure su **Stampa** per stamparlo. Per le tendenze generali della chiesa anziché lo storico di una sola persona, consulta [Monitorare le presenze](../attendance/tracking-attendance.md)
- **Donazioni** — Mostra le offerte di quest'anno, incluse quelle a fondi non deducibili. Fai clic su **Tutti gli anni** per lo [storico completo delle donazioni](../donations/recording-donations.md), oppure su **Registra un'offerta** per registrarne una nuova. Se la tua chiesa ha attivato la [Privacy delle offerte](../settings/church-settings.md#giving-privacy), gli importi restano nascosti finché non fai clic su **Mostra offerte**
- **Gruppi** — Elenca le [appartenenze ai gruppi](../groups/group-members.md) della persona
- **Note** — Mostra le note recenti sulla persona (cura pastorale, follow-up e simili). Fai clic su **Tutte le note** per leggere e aggiungere note
- **Moduli** — Elenca i moduli della persona e indica se ciascuno è stato inviato (vedi [Lavorare con i moduli](#working-with-forms) più sotto)

Quando apri una di queste viste complete, fai clic sul collegamento **Torna a** con il nome della persona in cima per tornare al profilo.

## Inviare un'email a una persona

Se la persona ha un indirizzo email registrato, sotto i suoi recapiti, a sinistra del profilo, compare un pulsante **Email**.

1. Nel profilo della persona, fai clic su **Email**.
2. Si apre una finestra **Email** intitolata con il nome della persona, che mostra **Destinatario** con il suo indirizzo.
3. Facoltativamente, scegli un modello salvato da **Carica modello (facoltativo)**.
4. Inserisci un **Oggetto** e scrivi il messaggio.
5. Fai clic su **Invia email**.

Per scrivere invece il messaggio nel tuo programma di posta, fai clic su **Apri nella mia app email**.

:::info
L'invio da B1 usa le stesse approvazioni e gli stessi limiti giornalieri dell'email di gruppo. Se la tua chiesa non è ancora stata approvata, la finestra ti chiede di richiedere una revisione -- nel frattempo puoi comunque fare clic su **Apri nella mia app email**. Consulta [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church). Gli utenti senza il permesso di modificare i membri dei gruppi passano direttamente alla loro app email quando fanno clic su **Email**.
:::

## Lavorare con i moduli

Puoi compilare direttamente i moduli personalizzati dal profilo di una persona. Sono moduli definiti dall'utente che puoi creare seguendo la guida [Creare moduli](../forms/creating-forms.md).

1. Nel profilo della persona, trova la sezione **Moduli**. Elenca ogni modulo indicando se è stato **Inviato** o **Non inviato**.
2. Fai clic sul nome di un modulo per aprirlo (oppure fai clic su **Tutti i moduli** per vedere l'elenco completo).
3. Fai clic sull'**icona di modifica** (matita) del modulo, compila i dettagli e fai clic su **Salva**.

Una volta inviato un modulo, fai clic sull'**icona di stampa** accanto a esso per stampare le risposte compilate da quella persona.

Se una risposta è finita sulla persona sbagliata, fai clic sull'icona **Cambia persona** (due frecce) accanto ad essa per spostarla su un'altra persona o scollegarla. Consulta [Cambiare la persona di una risposta](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
I moduli collegati al profilo di una persona usano il tipo di modulo **Persone**. Se ti serve un modulo autonomo (come un'iscrizione a un evento), consulta l'[opzione modulo Autonomo](../forms/creating-forms.md) nella guida ai moduli.
:::

:::tip
Se ti servono solo una o due informazioni aggiuntive sulle persone -- una data, un numero, una risposta sì/no -- usa i [Campi personalizzati](../settings/custom-fields.md) anziché un modulo. Sono più rapidi da compilare e sono ricercabili direttamente nella Ricerca avanzata.
:::

## Gestire i nuclei familiari

I nuclei familiari ti permettono di collegare insieme i membri di una famiglia. Questo è particolarmente utile per il [check-in](../attendance/check-in.md), dove un genitore può registrare tutti i propri figli insieme.

1. Nel profilo di una persona, fai clic su **Modifica** accanto all'intestazione **Nucleo familiare**, a sinistra.
2. Si apre l'editor del nucleo familiare. Seleziona il **ruolo nel nucleo familiare** della persona corrente (ad esempio Capofamiglia, Coniuge, Figlio, Altro).
3. Fai clic sull'icona **Aggiungi** per aggiungere un altro membro del nucleo familiare.
4. Sotto **Aggiungi membro del nucleo familiare**, digita il nome della persona nella casella di ricerca e premi **Invio** oppure fai clic sull'icona di ricerca. (Prima di digitare, viene mostrato un breve elenco di **Persone recenti**.)
5. Quando la persona compare nei risultati, fai clic sul suo nome o sull'icona di aggiunta accanto ad esso.
6. Scegli il suo ruolo nel nucleo familiare e fai clic su **Salva** per completare la configurazione del nucleo.

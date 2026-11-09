---
title: "Aggiungere persone"
description: "Aggiungi una persona al database della chiesa in B1 Admin, compila i suoi dati e collega i familiari in nuclei per check-in e report."
---

# Aggiungere persone

<div class="article-intro">

La sezione Persone è la base di B1 Admin -- è il database dei membri della chiesa. Ogni altra funzione (gruppi, presenze, donazioni, moduli) fa riferimento alle schede delle persone. Questa guida ti accompagna nell'aggiunta di una persona al database, nella modifica dei suoi dati e nel collegamento dei familiari nei nuclei familiari.

</div>

## Video di formazione

<YouTube id="GtsczJ8JPio" title="Aggiungere persone e nuclei familiari in B1" next="Importare il database delle persone in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di gestire le persone. Vedi [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se devi aggiungere più di qualche persona, valuta lo strumento [Importazione CSV](importing-data.md) al posto dell'inserimento manuale.

</div>

## Aggiungere una persona

1. Vai alla dashboard di amministrazione di B1.church.
2. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e fai clic su **Persone**.
3. Fai clic sul pulsante **Aggiungi persona** nell'intestazione della pagina. La pagina scorre fino al modulo **Aggiungi nuova persona** sotto la rubrica.
4. Compila **Nome**, **Cognome** ed **Email**, poi fai clic su **Aggiungi**.

Si aprirà la pagina del profilo della persona, pronta per aggiungere altri dettagli.

:::tip
Se stai migrando da un altro sistema di gestione della chiesa, la funzione [Importa dati](importing-data.md) ti permette di portare l'intera rubrica da un file CSV -- molto più veloce che aggiungere le persone una alla volta.
:::

### Avvisi di duplicato

Se l'indirizzo email (oppure, quando crei una persona dal modulo Modifica completo, il numero di telefono o la combinazione di nome, cognome e data di nascita) corrisponde a qualcuno già presente nel database, prima del salvataggio della nuova scheda compare una finestra **Possibile duplicato**. Elenca ogni persona corrispondente con la sua email, il telefono e la data di nascita, così puoi confrontarle.

- Fai clic su **Usa esistente** accanto a una corrispondenza per usare la scheda di quella persona invece di crearne una nuova.
- Fai clic su **Crea comunque** per aggiungere la nuova persona anche se è stata trovata una possibile corrispondenza.

Il controllo dei duplicati avviene solo quando crei una persona nuova -- la modifica di una scheda esistente non lo attiva mai. Serve a impedire nuovi duplicati; non unisce due schede già esistenti.

## Modificare i dettagli {#editing-details}

1. Nella pagina del profilo della persona, fai clic sul pulsante **Modifica** sotto i suoi recapiti, a sinistra.
2. Nel modulo **Dati personali**, inserisci altre informazioni come un **Titolo** (scegli Sig., Sig.ra, Sig.na, Dott., Prof., Don o Pastore dall'elenco, oppure digita il tuo, fino a 10 caratteri), il secondo nome, lo stato di appartenenza (**Visitatore**, **Ospite**, **Frequentatore abituale**, **Membro**, **Staff**, **Inattivo** o **Deceduto**), le date, l'indirizzo, i numeri di telefono e (per bambini e studenti) classe e scuola.
3. Fai clic su **Salva** per memorizzare i dati personali.

La parte sinistra del profilo mostra la foto della persona, il nome, lo stato di appartenenza, i recapiti, gli eventuali valori dei [campi personalizzati](../settings/custom-fields.md) e il suo nucleo familiare. Sotto il nucleo familiare, **Aggiunto** mostra la data di creazione della scheda (solo per le persone aggiunte dalla fine di ottobre 2026). Fai clic sulla foto per cambiarla. Sotto il pulsante **Modifica** ci sono altre azioni: **Flusso di lavoro** (aggiungi la persona a un [flusso di lavoro](../serving/workflows.md)), **Unisci**, **Esporta** ed **Esporta dati**.

Il resto del profilo mostra una sezione di riepilogo per ogni tipo di informazione collegata:

- **Presenze** -- Mostra in quali delle ultime settimane la persona ha partecipato e le sue visite più recenti. Fai clic su **Tutti gli anni** per l'intera cronologia delle visite, con sede, culto, orario del culto, gruppo e una colonna **Check-in** con l'orario del check-in al chiosco (indicato con un trattino per le visite registrate senza check-in al chiosco), oppure su **Stampa** per stamparla (la stampa ha il logo e il nome della chiesa centrati in alto, sopra il nome della persona). Per le tendenze dell'intera chiesa anziché la cronologia di una sola persona, vedi [Monitorare le presenze](../attendance/tracking-attendance.md)
- **Donazioni** -- Mostra le offerte di quest'anno, comprese quelle destinate a fondi non deducibili. Fai clic su **Tutti gli anni** per l'intera [cronologia delle donazioni](../donations/recording-donations.md), oppure su **Registra un dono** per registrarne uno nuovo. Se la chiesa ha attivato la [Privacy delle donazioni](../settings/church-settings.md#giving-privacy), gli importi restano nascosti finché non fai clic su **Mostra donazioni**
- **Gruppi** -- Elenca le [appartenenze ai gruppi](../groups/group-members.md) della persona, con **Iscritto** e la data di iscrizione a ciascun gruppo quando è registrata
- **Note** -- Mostra le note recenti sulla persona (cura pastorale, follow-up, ecc.). Fai clic su **Tutte le note** per leggere e aggiungere note. Ogni nota mostra chi l'ha scritta e la data e l'ora di pubblicazione. Per vedere le note recenti di tutti insieme, usa la pagina [Note](./notes.md)
- **Moduli** -- Elenca i moduli della persona e indica se ciascuno è stato inviato (vedi [Lavorare con i moduli](#working-with-forms) più sotto)
- **Richieste e iscrizioni** -- Elenca le [richieste di evento](../calendars/approvals.md) di stanze e risorse della persona (con le stanze o le risorse richieste e **In sospeso**, **Approvata** o **Rifiutata**) e le sue [iscrizioni agli eventi](../calendars/paid-registrations.md) (con quante persone ha iscritto e **Iscritto**, **In sospeso**, **In lista d'attesa** o **Annullata**), dalla più recente. Vengono mostrate le ultime cinque; fai clic su **Tutte le richieste** per l'elenco completo. Vedi le richieste di evento se puoi usare la pagina [Approvazioni](../calendars/approvals.md), e le iscrizioni se puoi visualizzarle; senza nessuno dei due permessi la sezione è nascosta

Quando apri una di queste viste complete, fai clic sul link **Torna a** con il nome della persona in alto per tornare al profilo.

## Inviare un'email a una persona

Se la persona ha un indirizzo email registrato, sotto i suoi recapiti, a sinistra del profilo, compare un pulsante **Email**.

1. Nel profilo della persona, fai clic su **Email**.
2. Si apre una finestra **Email** intitolata con il nome della persona, che mostra **Destinatario** con il suo indirizzo.
3. Facoltativamente scegli un modello salvato da **Carica modello (facoltativo)**.
4. Inserisci un **Oggetto** e scrivi il messaggio.
5. Fai clic su **Invia email**.

Per scrivere il messaggio nel tuo programma di posta, fai clic invece su **Apri nella mia app email**.

:::info
L'invio da B1 usa le stesse approvazioni e gli stessi limiti giornalieri dell'email di gruppo. Se la chiesa non è ancora stata approvata, la finestra ti chiede di richiedere una revisione -- nel frattempo puoi comunque fare clic su **Apri nella mia app email**. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church). Gli utenti senza il permesso di modificare i membri dei gruppi passano direttamente all'app email quando fanno clic su **Email**.
:::

## Lavorare con i moduli {#working-with-forms}

Puoi compilare moduli personalizzati direttamente dal profilo di una persona. Sono moduli definiti dall'utente che puoi creare seguendo la guida [Creare moduli](../forms/creating-forms.md).

1. Nel profilo della persona, trova la sezione **Moduli**. Elenca ogni modulo insieme a un'indicazione di **Inviato** oppure **Non inviato**.
2. Fai clic sul nome di un modulo per aprirlo (oppure fai clic su **Tutti i moduli** per vedere l'elenco completo).
3. Fai clic sull'**icona di modifica** (matita) del modulo, compila i dettagli e fai clic su **Salva**.

Una volta inviato un modulo, fai clic sull'**icona di stampa** accanto ad esso per stampare le risposte compilate dalla persona. Quando la persona ha un unico invio di un modulo, il modulo mostra **Inviato** con la data sopra le risposte.

Se un invio è finito alla persona sbagliata, fai clic sull'icona **Cambia persona** (due frecce) accanto ad esso per spostarlo a un'altra persona o scollegarlo. Vedi [Cambiare la persona di un invio](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
I moduli collegati al profilo di una persona usano il tipo di modulo **Persone**. Se ti serve un modulo indipendente (come un'iscrizione a un evento), vedi l'opzione [modulo Indipendente](../forms/creating-forms.md) nella guida ai moduli.
:::

:::tip
Se ti basta tenere traccia di una o due informazioni extra sulle persone -- una data, un numero, una risposta sì/no -- usa i [Campi personalizzati](../settings/custom-fields.md) invece di un modulo. Sono più rapidi da compilare e si possono cercare direttamente nella Ricerca avanzata.
:::

## Gestire i nuclei familiari {#managing-households}

I nuclei familiari permettono di collegare tra loro i membri di una famiglia. Sono particolarmente utili per il [check-in](../attendance/check-in.md), dove un genitore può registrare tutti i figli in una sola volta.

1. Nel profilo di una persona, fai clic su **Modifica** accanto al titolo **Nucleo familiare** a sinistra.
2. Si apre l'editor del nucleo familiare. Seleziona il **ruolo nel nucleo familiare** della persona corrente (ad esempio Capofamiglia, Coniuge, Figlio, Altro).
3. Fai clic sull'icona **Aggiungi** per aggiungere un altro membro del nucleo familiare.
4. Sotto **Aggiungi membro del nucleo familiare**, digita il nome della persona nella casella di ricerca e premi **Invio** oppure fai clic sull'icona di ricerca. (Prima di digitare, compare un breve elenco di **Persone recenti** -- le persone scelte più di recente in una ricerca, poi le persone aggiunte più di recente a B1.)
5. Quando la persona compare nei risultati, fai clic sul suo nome o sull'icona di aggiunta accanto ad esso.
6. Scegli il suo ruolo nel nucleo familiare e fai clic su **Salva** per completare la configurazione del nucleo.

Se la persona non è ancora in B1, fai clic su **Aggiungi nuova persona** sotto la ricerca. Oltre a nome, titolo, email e cellulare, la finestra chiede il suo **Ruolo nel nucleo familiare** (Capofamiglia, Coniuge, Figlio o Altro). La nuova persona viene creata e inserita in questo nucleo con quel ruolo; fai clic su **Salva** per completare.

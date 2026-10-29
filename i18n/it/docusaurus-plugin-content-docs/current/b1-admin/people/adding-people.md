---
title: "Aggiungere persone"
---

# Aggiungere persone

<div class="article-intro">

La sezione Persone è la base di B1 Admin — è il database dei membri della tua chiesa. Ogni altra funzione (gruppi, presenze, donazioni, moduli) fa riferimento alle schede delle persone. Questa guida ti accompagna nell'aggiunta di una persona al database, nella modifica dei suoi dati e nel collegamento dei familiari in nuclei familiari.

</div>

## Video tutorial

<YouTube id="NTL1UDQpx8s" title="Aggiungere persone e nuclei familiari in B1" next="Importare il tuo database di persone in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di gestire le persone. Vedi [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se devi aggiungere più di qualche persona, valuta di usare invece lo strumento [Importazione CSV](importing-data.md).

</div>

## Aggiungere una persona

1. Vai alla dashboard di B1.church Admin.
2. Apri il [menu Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e clicca **Persone**.
3. Clicca il pulsante **Aggiungi persona** nell'intestazione della pagina. La pagina scorre fino al modulo **Aggiungi nuova persona** sotto l'elenco.
4. Compila **Nome**, **Cognome** ed **Email**, poi clicca **Aggiungi**.

Si aprirà la scheda della persona, pronta per aggiungere altri dettagli.

:::tip
Se stai migrando da un altro sistema gestionale per chiese, la funzione [Importa dati](importing-data.md) ti permette di portare l'intera anagrafica da un file CSV — molto più veloce che aggiungere le persone una alla volta.
:::

### Avvisi di duplicato

Se l'indirizzo email (oppure, quando crei una persona dal modulo di modifica completo, il numero di telefono o la corrispondenza di nome + cognome + data di nascita) corrisponde a qualcuno già presente nel database, appare una finestra **Possibile duplicato** prima che il nuovo record venga salvato. Elenca ogni persona corrispondente con la sua email, il telefono e la data di nascita, così puoi confrontarli.

- Clicca **Usa esistente** accanto a una corrispondenza per usare la scheda di quella persona invece di crearne una nuova.
- Clicca **Crea comunque** per aggiungere la nuova persona anche se è stata trovata una possibile corrispondenza.

Il controllo dei duplicati avviene solo quando crei una persona nuova — la modifica di un record esistente non lo attiva mai. Serve a prevenire nuovi duplicati; non unisce due record già esistenti.

## Modificare i dettagli

1. Nella scheda della persona, clicca il pulsante **Modifica** sotto i suoi dati di contatto, a sinistra.
2. Nel modulo **Dati personali**, inserisci informazioni aggiuntive come il secondo nome, lo stato di appartenenza (**Visitatore**, **Ospite**, **Frequentatore regolare**, **Membro**, **Staff**, **Inattivo** o **Deceduto**), le date, l'indirizzo, i numeri di telefono e (per bambini e studenti) classe e scuola.
3. Clicca **Salva** per memorizzare i dati personali.

Sul lato sinistro della scheda sono mostrati la foto della persona, il nome, lo stato di appartenenza, i dati di contatto, gli eventuali valori dei [campi personalizzati](../settings/custom-fields.md) e il suo nucleo familiare. Sotto il nucleo familiare, **Aggiunto** mostra la data di creazione del record (solo per le persone aggiunte dalla fine di ottobre 2026). Clicca sulla foto per cambiarla. Sotto il pulsante **Modifica** ci sono altre azioni: **Flusso di lavoro** (aggiungi la persona a un [flusso di lavoro](../serving/workflows.md)), **Unisci**, **Esporta** ed **Esporta dati**.

Il resto della scheda mostra una sezione di riepilogo per ogni tipo di informazione correlata:

- **Presenze** — Mostra in quali delle ultime settimane la persona è stata presente e le sue visite più recenti. Clicca **Tutti gli anni** per l'intero storico delle visite, comprensivo di sede, servizio, orario del servizio, gruppo e una colonna **Registrato** con l'ora del check-in al kiosk (mostrata come trattino per le visite registrate senza check-in al kiosk), oppure **Stampa** per stamparlo (la stampa include il logo e il nome della chiesa centrati in alto, sopra il nome della persona). Per le tendenze dell'intera chiesa anziché la storia di una persona, vedi [Tracciare le presenze](../attendance/tracking-attendance.md)
- **Donazioni** — Mostra le offerte di quest'anno, comprese quelle a fondi non deducibili. Clicca **Tutti gli anni** per l'intero [storico delle donazioni](../donations/recording-donations.md), oppure **Registra un dono** per registrarne uno nuovo. Se la tua chiesa ha attivato la [Privacy delle offerte](../settings/church-settings.md#giving-privacy), gli importi restano nascosti finché non clicchi **Mostra offerte**
- **Gruppi** — Elenca le [appartenenze ai gruppi](../groups/group-members.md) della persona, con **Iscritto** e la data di iscrizione per ogni gruppo quando è registrata
- **Note** — Mostra le note recenti sulla persona (cura pastorale, follow-up, ecc.). Clicca **Tutte le note** per leggere e aggiungere note. Ogni nota mostra chi l'ha scritta e la data e l'ora di pubblicazione. Per vedere le note recenti di tutti insieme, usa la pagina [Note](./notes.md)
- **Moduli** — Elenca i moduli della persona e se ciascuno è stato inviato (vedi [Lavorare con i moduli](#working-with-forms) più sotto)

Quando apri una di queste viste complete, clicca il link **Torna a** con il nome della persona in alto per tornare alla scheda.

## Inviare un'email a una persona

Se la persona ha un indirizzo email registrato, sotto i suoi dati di contatto, a sinistra della scheda, compare il pulsante **Email**.

1. Nella scheda della persona, clicca **Email**.
2. Si apre una finestra **Email** intitolata con il nome della persona, che mostra **Destinatario** con l'indirizzo della persona.
3. Facoltativamente, scegli un modello salvato da **Carica modello (facoltativo)**.
4. Inserisci un **Oggetto** e scrivi il messaggio.
5. Clicca **Invia email**.

Per scrivere il messaggio nel tuo programma di posta, clicca invece **Apri nell'app email**.

:::info
L'invio da B1 utilizza gli stessi limiti giornalieri e le stesse approvazioni dell'email di gruppo. Se la tua chiesa non è ancora stata approvata, la finestra ti chiede di richiedere una verifica — nel frattempo puoi comunque cliccare **Apri nell'app email**. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church). Gli utenti senza il permesso di modificare i membri dei gruppi passano direttamente all'app email quando cliccano **Email**.
:::

## Lavorare con i moduli {#working-with-forms}

Puoi compilare i moduli personalizzati direttamente dalla scheda di una persona. Sono moduli definiti dall'utente che puoi creare seguendo la guida [Creare moduli](../forms/creating-forms.md).

1. Nella scheda della persona, trova la sezione **Moduli**. Elenca ogni modulo indicando se è stato **Inviato** o **Non inviato**.
2. Clicca sul nome di un modulo per aprirlo (oppure clicca **Tutti i moduli** per vedere l'elenco completo).
3. Clicca sull'**icona di modifica** (matita) del modulo, compila i dettagli e clicca **Salva**.

Una volta inviato un modulo, clicca sull'**icona di stampa** accanto ad esso per stampare le risposte compilate da quella persona. Quando la persona ha un solo invio di un modulo, il modulo mostra **Inviato** con la data sopra le risposte.

Se un invio è finito alla persona sbagliata, clicca sull'icona **Cambia persona** (due frecce) accanto ad esso per spostarlo a un'altra persona o scollegarlo. Vedi [Cambiare la persona di un invio](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
I moduli collegati alla scheda di una persona usano il tipo di modulo **Persone**. Se ti serve un modulo autonomo (ad esempio per l'iscrizione a un evento), vedi l'[opzione Modulo autonomo](../forms/creating-forms.md) nella guida ai moduli.
:::

:::tip
Se ti basta tenere traccia di una o due informazioni extra sulle persone — una data, un numero, una risposta sì/no — usa invece i [Campi personalizzati](../settings/custom-fields.md) anziché un modulo. Sono più veloci da compilare e sono ricercabili direttamente nella Ricerca avanzata.
:::

## Gestire i nuclei familiari {#managing-households}

I nuclei familiari permettono di collegare tra loro i membri di una famiglia. È particolarmente utile per il [check-in](../attendance/check-in.md), dove un genitore può registrare tutti i figli in una volta sola.

1. Nella scheda di una persona, clicca **Modifica** accanto al titolo **Nucleo familiare** a sinistra.
2. Si apre l'editor del nucleo familiare. Seleziona il **ruolo nel nucleo familiare** della persona attuale (ad esempio Capofamiglia, Coniuge, Figlio, Altro).
3. Clicca l'icona **Aggiungi** per aggiungere un altro membro del nucleo familiare.
4. In **Aggiungi membro del nucleo familiare**, digita il nome della persona nella casella di ricerca e premi **Invio** oppure clicca l'icona di ricerca. (Prima di digitare, viene mostrato un breve elenco di **Persone recenti**.)
5. Quando la persona compare tra i risultati, clicca sul suo nome o sull'icona di aggiunta accanto ad esso.
6. Scegli il suo ruolo nel nucleo familiare e clicca **Salva** per completare la configurazione del nucleo.

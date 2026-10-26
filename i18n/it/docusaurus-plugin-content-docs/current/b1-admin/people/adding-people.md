---
title: "Aggiungere persone"
---

# Aggiungere persone

<div class="article-intro">

La sezione Persone è il fondamento di B1 Admin — è il database dei membri della tua chiesa. Ogni altra funzionalità (gruppi, presenze, donazioni, moduli) fa riferimento alle schede delle persone. Questa guida ti accompagna nell'aggiunta di una persona al database, nella modifica dei suoi dati e nel collegamento dei familiari alle famiglie.

</div>

## Video di formazione

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account attivo di B1 Admin con il permesso di gestire le persone. Consulta [Ruoli e permessi](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se devi aggiungere più di qualche persona, valuta l'uso dello strumento [Importazione CSV](importing-data.md).

</div>

## Aggiungere una persona

1. Vai alla Dashboard di B1.church Admin.
2. Apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e clicca su **Persone**.
3. Clicca sul pulsante **Aggiungi persona** nell'intestazione della pagina. La pagina scorre fino al modulo **Aggiungi nuova persona** sotto l'elenco.
4. Compila **Nome**, **Cognome** ed **Email** della persona, poi clicca su **Aggiungi**.

Si aprirà la scheda profilo della persona, pronta per aggiungere altri dettagli.

:::tip
Se stai migrando da un altro sistema di gestione della chiesa, la funzione [Importa dati](importing-data.md) ti permette di importare l'intero elenco da un file CSV — molto più veloce che aggiungere le persone una alla volta.
:::

### Avvisi di duplicato

Se l'indirizzo email (oppure, quando crei una persona dal modulo di modifica completo, il numero di telefono o la combinazione di nome, cognome e data di nascita) corrisponde a qualcuno già presente nel database, prima del salvataggio compare una finestra **Possibile duplicato**. Elenca ogni persona corrispondente con la sua email, il telefono e la data di nascita, così puoi confrontarli.

- Clicca su **Usa esistente** accanto a una corrispondenza per usare il record di quella persona invece di crearne uno nuovo.
- Clicca su **Crea comunque** per aggiungere la nuova persona anche se è stata trovata una possibile corrispondenza.

Il controllo dei duplicati viene eseguito solo quando crei una persona nuova — la modifica di un record esistente non lo attiva mai. Serve a prevenire nuovi duplicati; non unisce due record già esistenti.

## Modificare i dettagli

1. Nella scheda profilo della persona, clicca sul pulsante **Modifica** sotto i dati di contatto, a sinistra.
2. Nel modulo **Dati personali**, inserisci informazioni aggiuntive come il secondo nome, lo stato di appartenenza (**Visitatore**, **Ospite**, **Partecipante abituale**, **Membro**, **Personale**, **Inattivo** o **Deceduto**), le date, l'indirizzo, i numeri di telefono e (per bambini e studenti) la classe e la scuola.
3. Clicca su **Salva** per memorizzare i dati personali.

La parte sinistra della scheda mostra la foto della persona, il nome, lo stato di appartenenza, i dati di contatto, gli eventuali valori dei [campi personalizzati](../settings/custom-fields.md) e la sua famiglia. Clicca sulla foto per cambiarla. Sotto il pulsante **Modifica** ci sono altre azioni: **Flusso di lavoro** (aggiunge la persona a un [flusso di lavoro](../serving/workflows.md)), **Unisci**, **Esporta** ed **Esporta dati**.

Il resto della scheda mostra una sezione di riepilogo per ogni tipo di informazione correlata:

- **Presenze** — Mostra in quali delle ultime settimane la persona è stata presente e le sue visite più recenti. Clicca su **Tutti gli anni** per la cronologia completa delle visite, con campus, servizio, orario del servizio, gruppo e una colonna **Registrato alle** con l'orario di check-in al chiosco (indicato con un trattino per le visite registrate senza check-in al chiosco), oppure su **Stampa** per stamparla (la stampa riporta al centro in alto il logo e il nome della tua chiesa, sopra il nome della persona). Per le tendenze dell'intera chiesa anziché la cronologia di una persona, vedi [Monitorare le presenze](../attendance/tracking-attendance.md)
- **Donazioni** — Mostra le offerte di quest'anno, comprese quelle destinate a fondi non detraibili. Clicca su **Tutti gli anni** per la [cronologia completa delle donazioni](../donations/recording-donations.md), oppure su **Registra un'offerta** per registrarne una nuova. Se la tua chiesa ha attivato la [Privacy delle offerte](../settings/church-settings.md#giving-privacy), gli importi restano nascosti finché non clicchi su **Mostra offerte**
- **Gruppi** — Elenca le [appartenenze ai gruppi](../groups/group-members.md) della persona
- **Note** — Mostra le note recenti sulla persona (cura pastorale, follow-up, ecc.). Clicca su **Tutte le note** per leggerle e aggiungerne. Ogni nota indica chi l'ha scritta e la data e l'ora di pubblicazione. Per vedere le note recenti di tutte le persone insieme, usa la pagina [Note](./notes.md)
- **Moduli** — Elenca i moduli della persona e indica se ciascuno è stato inviato (vedi [Lavorare con i moduli](#working-with-forms) più sotto)

Quando apri una di queste viste complete, clicca sul link **Torna a** con il nome della persona in alto per tornare al profilo.

## Inviare un'email a una persona

Se la persona ha un indirizzo email registrato, sotto i dati di contatto a sinistra del profilo compare un pulsante **Email**.

1. Nel profilo della persona, clicca su **Email**.
2. Si apre una finestra **Email** intitolata con il nome della persona, che mostra **Destinatario** con il suo indirizzo.
3. Facoltativamente, scegli un modello salvato da **Carica modello (facoltativo)**.
4. Inserisci un **Oggetto** e scrivi il messaggio.
5. Clicca su **Invia email**.

Per scrivere il messaggio nel tuo programma di posta, clicca invece su **Apri nella mia app email**.

:::info
L'invio da B1 utilizza gli stessi limiti di approvazione e giornalieri dell'email di gruppo. Se la tua chiesa non è ancora stata approvata, la finestra ti chiede di richiedere una verifica — nel frattempo puoi comunque cliccare su **Apri nella mia app email**. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church). Gli utenti senza il permesso di modificare i membri dei gruppi passano direttamente alla loro app email quando cliccano su **Email**.
:::

## Lavorare con i moduli

Puoi compilare moduli personalizzati direttamente dal profilo di una persona. Sono moduli definiti dall'utente che puoi creare seguendo la guida [Creare moduli](../forms/creating-forms.md).

1. Nel profilo della persona, individua la sezione **Moduli**. Elenca ciascun modulo indicando se è stato **Inviato** oppure **Non inviato**.
2. Clicca sul nome di un modulo per aprirlo (oppure clicca su **Tutti i moduli** per vedere l'elenco completo).
3. Clicca sull'**icona di modifica** (matita) del modulo, compila i dettagli e clicca su **Salva**.

Una volta inviato un modulo, clicca sull'**icona di stampa** accanto ad esso per stampare le risposte compilate da quella persona.

Se un invio è finito sulla persona sbagliata, clicca sull'icona **Cambia persona** (due frecce) accanto ad esso per spostarlo a un'altra persona o scollegarlo. Vedi [Cambiare la persona di un invio](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
I moduli collegati al profilo di una persona usano il tipo di modulo **Persone**. Se ti serve un modulo indipendente (come una registrazione a un evento), vedi l'opzione [Modulo autonomo](../forms/creating-forms.md) nella guida ai moduli.
:::

:::tip
Se ti basta tenere traccia di una o due informazioni extra sulle persone — una data, un numero, una risposta sì/no — usa invece i [Campi personalizzati](../settings/custom-fields.md) anziché un modulo. Sono più rapidi da compilare e sono ricercabili direttamente nella Ricerca avanzata.
:::

## Gestire le famiglie {#managing-households}

Le famiglie ti permettono di collegare tra loro i membri di una stessa famiglia. È particolarmente utile per il [check-in](../attendance/check-in.md), dove un genitore può registrare tutti i figli in una sola volta.

1. Nella scheda profilo di una persona, clicca su **Modifica** accanto al titolo **Famiglia** a sinistra.
2. Si apre l'editor della famiglia. Seleziona il **ruolo nella famiglia** della persona corrente (ad esempio Capofamiglia, Coniuge, Figlio, Altro).
3. Clicca sull'icona **Aggiungi** per aggiungere un altro membro della famiglia.
4. Sotto **Aggiungi membro della famiglia**, digita il nome della persona nella casella di ricerca e premi **Invio** oppure clicca sull'icona di ricerca. (Prima di digitare viene mostrato un breve elenco di **Persone recenti**.)
5. Quando la persona compare nei risultati, clicca sul suo nome o sull'icona di aggiunta accanto ad esso.
6. Scegli il suo ruolo nella famiglia e clicca su **Salva** per completare la configurazione della famiglia.

---
title: "Mailchimp"
description: "Sincronizza le persone di B1 Admin e l'appartenenza a gruppi o liste salvate con un pubblico Mailchimp come etichette, con i passaggi di configurazione, importazione iniziale e risoluzione dei problemi."
---

# Mailchimp

<div class="article-intro">

Mantieni un pubblico Mailchimp sincronizzato automaticamente con B1: le persone arrivano con nome, email e telefono; l'appartenenza a gruppi e liste diventa etichette di Mailchimp; le persone eliminate vengono archiviate. La sincronizzazione è integrata in B1: nessun servizio di terze parti, nessun conteggio per attività, e le modifiche arrivano quasi in tempo reale anziché con una pianificazione notturna.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Mailchimp](https://mailchimp.com) con il pubblico che vuoi che B1 gestisca
- Una **chiave API** di Mailchimp (Mailchimp: icona del profilo → **Account e fatturazione → Extra → Chiavi API**)
- Il tuo **ID pubblico** (Mailchimp: **Pubblico → Impostazioni → Nome del pubblico e impostazioni predefinite**)
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa viene sincronizzato {#what-syncs}

| Modifica in B1 | Effetto su Mailchimp |
|---|---|
| Persona aggiunta o aggiornata | Iscritto aggiunto/aggiornato (nome, cognome, telefono; i nuovi iscritti arrivano come `subscribed`) |
| Persona eliminata (o cancellata per GDPR) | Iscritto archiviato |
| Persona entra in un gruppo | Aggiunta un'etichetta con il nome del gruppo |
| Persona esce da un gruppo | Quell'etichetta viene rimossa |
| Persona entra in una lista salvata | Aggiunta un'etichetta con il nome della lista |
| Persona esce da una lista salvata | Quell'etichetta viene rimossa |

**Le liste salvate sono di solito la fonte migliore per le etichette.** Una [lista salvata](/docs/b1-admin/people/lists) di B1 è un pubblico basato su regole che si riaggiorna da sola: "tutti della sede Nord", "membri che hanno acconsentito alle email pastorali". Collega i segmenti di Mailchimp alle etichette delle liste e la sincronizzazione le mantiene aggiornate; usa le etichette dei gruppi per le comunicazioni ai team di ministero.

La sincronizzazione è **a senso unico** (B1 → Mailchimp) e modifica solo i campi standard di Mailchimp, quindi non può entrare in conflitto con i campi unione o i segmenti che gestisci dentro Mailchimp.

## Configurazione {#setup}

1. In B1Admin vai su **Impostazioni → Sviluppatori → Webhook → Nuovo webhook**.
2. Imposta **Tipo di connettore** su **Mailchimp**.
3. Incolla la tua **chiave API di Mailchimp** e il tuo **ID pubblico**. La chiave viene memorizzata cifrata e non viene più mostrata.
4. Gli eventi pertinenti sono già selezionati; deseleziona quelli che non ti servono (ad esempio, lascia attivi gli eventi delle persone ma salta le etichette dei gruppi).
5. Salva. B1 verifica la chiave e il pubblico con Mailchimp prima di accettarli: un errore di battitura fallisce subito, con il motivo.

Riapri il webhook e clicca su **Invia evento di prova** in qualsiasi momento per verificare di nuovo la connessione (per Mailchimp controlla la chiave e il pubblico, invece di inviare un iscritto di esempio). Ogni tentativo di sincronizzazione viene registrato nella cronologia delle consegne del webhook con la risposta effettiva di Mailchimp, e le consegne non riuscite vengono ritentate automaticamente con intervalli crescenti per circa cinque giorni.

## Importazione iniziale {#initial-import}

Il connettore sincronizza le *modifiche* dal momento in cui è attivo; non recupera retroattivamente l'anagrafica esistente. Per il giorno della configurazione:

1. In B1Admin vai su **Persone**, cerca le persone che ti interessano (oppure esegui una lista salvata) e clicca su **Esporta** per scaricare un CSV.
2. In Mailchimp usa **Pubblico → Importa contatti** per caricare il CSV, applicando eventuali etichette durante l'importazione.

Fare il caricamento iniziale con l'importatore di Mailchimp ti mantiene in controllo della questione del consenso: importa solo le persone che hanno effettivamente accettato di ricevere le tue email. Importare in blocco un'intera anagrafica come contatti iscritti può violare le condizioni di Mailchimp e la normativa anti-spam (CAN-SPAM/GDPR).

## Limiti e note {#limits--notes}

- **Sincronizzazione a senso unico.** Le cancellazioni dall'iscrizione, i rimbalzi e le modifiche fatte in Mailchimp non tornano in B1. Chi si cancella da Mailchimp può comunque ricevere email inviate direttamente da B1: considera Mailchimp come fonte di verità per il consenso alle email di massa.
- **Le persone senza indirizzo email vengono saltate** (registrate come tali nella cronologia delle consegne), perché gli iscritti di Mailchimp sono identificati dall'email.
- **La modifica dell'indirizzo email crea un nuovo iscritto.** Mailchimp identifica le persone tramite l'email, quindi cambiare l'email di qualcuno in B1 lo aggiunge con il nuovo indirizzo; il vecchio iscritto resta finché non lo archivi in Mailchimp.
- **Solo i campi standard vengono sincronizzati**: nome, cognome, telefono. Lo stato di membership, la sede e i campi personalizzati di B1 non vengono mappati ai campi unione di Mailchimp in questa versione: per segmentare usa invece le etichette delle liste.
- **I nomi delle etichette sono i nomi di gruppi/liste.** Rinominare un gruppo o una lista fa iniziare l'etichettatura con il nuovo nome; la vecchia etichetta resta sugli iscritti esistenti finché non la rimuovi in Mailchimp.
- **I limiti di contatti di Mailchimp continuano a valere**: una sincronizzazione che porta un pubblico del piano gratuito oltre il limite registrerà errori `Member limit reached` nella cronologia delle consegne.

## Altre ricette (Zapier / Make) {#other-recipes-zapier--make}

Tutto ciò che va oltre la sincronizzazione del pubblico (ad esempio, etichettare i donatori su `donation.created`, la direzione inversa da Mailchimp a B1, oppure la sincronizzazione con un'altra piattaforma email come Constant Contact, Brevo, ecc.) è ancora disponibile tramite [Zapier](../zapier.md) o [Make](../make.md), che si attivano sugli stessi eventi del webhook:

- **Etichetta i donatori:** B1 *Nuova donazione* → B1 *Trova persona* → Mailchimp *Aggiungi iscritto a etichetta* (`Gave-2026`)
- **Bidirezionale:** Mailchimp *Nuovo iscritto* → B1 *Crea persona*

Se in precedenza hai collegato la sincronizzazione di persone/gruppi tramite Zapier, disattiva quegli Zap dopo aver attivato il connettore nativo: eseguire entrambi elabora due volte ogni evento e consuma attività di Zapier senza motivo.

## Risoluzione dei problemi {#troubleshooting}

- **Il salvataggio fallisce con "Mailchimp ha rifiutato la chiave API"**: la chiave è stata revocata o digitata male. Le chiavi devono terminare con un suffisso del data center, come `-us21`.
- **Il salvataggio fallisce con "pubblico non trovato"**: l'ID pubblico non esiste sotto quell'account. Copialo da **Pubblico → Impostazioni → Nome del pubblico e impostazioni predefinite** (non è il nome del pubblico).
- **Una persona non è mai comparsa in Mailchimp**: controlla la cronologia delle consegne del webhook. "Saltato: la persona non ha un indirizzo email" significa esattamente questo; un errore `4xx` di Mailchimp mostra il motivo nel corpo della risposta.
- **Le consegne si sono fermate del tutto**: dopo ripetuti esaurimenti delle consegne il webhook si disattiva automaticamente. Correggi la causa (di solito una chiave revocata), riattivalo e usa **Invia evento di prova** per confermare.

## Vedi anche {#see-also}

- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks): il motore sottostante, il catalogo degli eventi, la semantica di consegna e ripetizione
- [Liste salvate](/docs/b1-admin/people/lists): pubblici basati su regole che si associano naturalmente alle etichette di Mailchimp
- [Zapier (panoramica)](../zapier.md): per le ricette oltre la sincronizzazione del pubblico

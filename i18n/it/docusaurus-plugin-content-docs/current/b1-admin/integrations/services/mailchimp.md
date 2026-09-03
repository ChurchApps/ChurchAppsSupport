---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Mantieni un pubblico di Mailchimp sincronizzato con B1 automaticamente: le persone fluiscono con il loro nome, email e telefono; l'adesione al gruppo e alla lista diventa tag di Mailchimp; le persone eliminate vengono archiviate. La sincronizzazione è integrata in B1 — nessun servizio di terze parti, nessun metering per attività e i cambiamenti arrivano in tempo quasi reale piuttosto che su una pianificazione notturna.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Un account [Mailchimp](https://mailchimp.com) con il pubblico che desideri che B1 gestisca
- Una **chiave API** di Mailchimp (Mailchimp: icona del profilo → **Account & billing → Extras → API keys**)
- Il tuo **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Un utente di B1Admin con permesso **Edit Settings**

</div>

## Cosa Viene Sincronizzato

| Cambio in B1 | Effetto di Mailchimp |
|---|---|
| Persona aggiunta o aggiornata | Sottoscrittore aggiunto/aggiornato (nome, cognome, telefono; i nuovi sottoscrittori arrivano come `subscribed`) |
| Persona eliminata (o cancellata GDPR) | Sottoscrittore archiviato |
| Persona si unisce a un gruppo | Tag denominato dal nome del gruppo aggiunto |
| Persona lascia un gruppo | Quel tag rimosso |
| Persona entra in una lista salvata | Tag denominato dal nome della lista aggiunto |
| Persona lascia una lista salvata | Quel tag rimosso |

**Le liste salvate sono solitamente la migliore fonte di tag.** Una [lista salvata](/docs/b1-admin/people/lists) di B1 è un pubblico basato su regole che si rivaluta automaticamente — "tutti al campus Nord", "membri che hanno optato per email pastorali". Punta i tuoi segmenti di Mailchimp ai tag della lista e la sincronizzazione li mantiene; usa tag di gruppo per i mailing del team di ministero.

La sincronizzazione è **unidirezionale** (B1 → Mailchimp) e tocca solo i campi standard di Mailchimp, quindi non può entrare in conflitto con i campi di unione o i segmenti che gestisci all'interno di Mailchimp.

## Configurazione

1. In B1Admin vai a **Settings → Developer → Webhooks → Add Webhook**.
2. Imposta **Connector Type** su **Mailchimp**.
3. Incolla la tua **chiave API di Mailchimp** e **Audience ID**. La chiave viene archiviata crittografata e non viene mai più visualizzata.
4. Gli eventi rilevanti sono preselezionati; deseleziona quelli che non desideri (ad esempio, mantieni gli eventi di persona ma salta i tag di gruppo).
5. Salva. B1 verifica la chiave e il pubblico rispetto a Mailchimp prima di accettare — un errore di ortografia fallisce immediatamente con un motivo.

Usa **Send Test** in qualsiasi momento per re-verificare la connessione. Ogni tentativo di sincronizzazione viene registrato nella cronologia di consegna del webhook con la risposta effettiva di Mailchimp, e le consegne fallite si ritentano automaticamente con backoff per circa cinque giorni.

## Importazione Iniziale

Il connettore sincronizza *cambiamenti* da quando è attivato; non riempie la tua directory esistente. Per il giorno della configurazione:

1. In B1Admin vai a **People**, cerca le persone che desideri (o esegui una lista salvata) e fai clic su **Export** per scaricare un CSV.
2. In Mailchimp usa **Audience → Import contacts** per caricare il CSV, applicando qualsiasi tag durante l'importazione.

Facendo il carico iniziale attraverso l'importatore di Mailchimp ti mantiene il controllo della domanda di consenso — importa solo persone che hanno effettivamente accettato di ricevere le tue email. L'importazione in blocco di un'intera directory come contatti sottoscritti può violare i termini di Mailchimp e le leggi anti-spam (CAN-SPAM/GDPR).

## Limiti e Note

- **Sincronizzazione unidirezionale.** I non iscritti, i rimbalzi e le modifiche apportate in Mailchimp non fluiscono indietro a B1. Qualcuno che si annulla in Mailchimp può comunque ricevere email inviate direttamente da B1 — tratta Mailchimp come la fonte di verità per il consenso ai mailing di massa.
- **Le persone senza un indirizzo email vengono saltate** (registrate come tali nella cronologia di consegna) — i sottoscrittori di Mailchimp sono keyed per email.
- **I cambiamenti di indirizzo email creano un nuovo sottoscrittore.** Mailchimp identifica le persone per email, quindi cambiare l'email di qualcuno in B1 le aggiunge nel nuovo indirizzo; il sottoscrittore vecchio rimane finché non lo archivi in Mailchimp.
- **Solo i campi standard si sincronizzano** — nome, cognome, telefono. Lo stato di iscrizione, il campus e i campi B1 personalizzati non si mappano ai campi di unione di Mailchimp in questa versione; usa i tag della lista per segmentare invece.
- **I nomi dei tag sono i nomi del gruppo/lista.** Rinominare un gruppo o una lista inizia a taggare con il nuovo nome; il tag vecchio rimane sui sottoscrittori esistenti finché non lo rimuovi in Mailchimp.
- **I limiti di contatto di Mailchimp si applicano ancora** — una sincronizzazione che spinge il pubblico del tier gratuito oltre il suo limite registrerà errori `Member limit reached` nella cronologia di consegna.

## Altre Ricette (Zapier / Make)

Qualsiasi cosa oltre la sincronizzazione del pubblico — taggare i donatori su `donation.created`, una direzione inversa di Mailchimp → B1, o sincronizzare a una piattaforma di posta diversa completamente (Constant Contact, Brevo, ecc.) — è ancora disponibile tramite [Zapier](../zapier) o [Make](../make), che si attivano sugli stessi eventi webhook:

- **Tag donatori:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Bidirezionale:** Mailchimp *New Subscriber* → B1 *Create Person*

Se precedentemente hai collegato la sincronizzazione di persona/gruppo tramite Zapier, disattiva quelle Zap dopo aver abilitato il connettore nativo — eseguire entrambi il doppio processo di ogni evento e brucia i compiti di Zapier per niente.

## Risoluzione dei Problemi

- **Save non riesce con "Mailchimp rejected the API key"** — la chiave è stata revocata o scritta male. Le chiavi devono terminare con un suffisso del centro dati come `-us21`.
- **Save non riesce con "audience not found"** — l'Audience ID non esiste in quell'account. Copialo da **Audience → Settings → Audience name and defaults** (non è il nome del pubblico).
- **Una persona non è mai apparsa in Mailchimp** — controlla la cronologia di consegna del webhook. "Skipped: person has no email address" significa esattamente questo; un `4xx` da Mailchimp mostra il motivo nel corpo della risposta.
- **Le consegne si sono interrotte completamente** — dopo consegne ripetute esaurite il webhook si auto-disabilita. Correggi la causa (di solito una chiave revocata), ri-abilita e usa **Send Test** per confermare.

## Vedi Anche

- [Webhooks (riferimento sviluppatore)](/docs/developer/api/webhooks) — il motore sottostante, catalogo degli eventi, semantica di consegna/ritentativo
- [Liste Salvate](/docs/b1-admin/people/lists) — pubblici basati su regole che si mappano naturalmente sui tag di Mailchimp
- [Zapier (panoramica)](../zapier) — per ricette oltre la sincronizzazione del pubblico

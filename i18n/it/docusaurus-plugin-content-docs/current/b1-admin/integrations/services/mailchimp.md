---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Mantieni un pubblico Mailchimp sincronizzato con B1 automaticamente: le persone si iscrivono con nome, email e telefono; l'appartenenza a gruppi e liste diventa tag Mailchimp; le persone eliminate vengono archiviate. La sincronizzazione è integrata in B1 — nessun servizio di terze parti, nessuna misurazione per attività, e i cambiamenti arrivano in tempo quasi reale invece di su una pianificazione notturna.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Mailchimp](https://mailchimp.com) con il pubblico che desideri che B1 gestisca
- Una **Chiave API** Mailchimp (Mailchimp: icona profilo → **Account e fatturazione → Extra → Chiavi API**)
- Il tuo **ID Pubblico** (Mailchimp: **Pubblico → Impostazioni → Nome e impostazioni predefinite del pubblico**)
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa si sincronizza

| Cambio B1 | Effetto Mailchimp |
|---|---|
| Persona aggiunta o aggiornata | Iscritto aggiunto/aggiornato (nome, cognome, telefono; i nuovi iscritti arrivano come `subscribed`) |
| Persona eliminata (o cancellata GDPR) | Iscritto archiviato |
| Persona aderisce a un gruppo | Tag denominato dopo il gruppo aggiunto |
| Persona esce da un gruppo | Quel tag rimosso |
| Persona entra in una lista salvata | Tag denominato dopo la lista aggiunto |
| Persona esce da una lista salvata | Quel tag rimosso |

**Le liste salvate sono solitamente la fonte di tag migliore.** Una [lista salvata](/docs/b1-admin/people/lists) B1 è un pubblico basato su regole che si rivaluta — "tutti del campus Nord", "membri che hanno optato per email pastorali". Punta i tuoi segmenti Mailchimp ai tag delle liste e la sincronizzazione li mantiene; usa tag di gruppo per i mailing dei team ministero.

La sincronizzazione è **unidirezionale** (B1 → Mailchimp) e tocca solo i campi standard di Mailchimp, quindi non può entrare in conflitto con i campi merge o i segmenti che gestisci in Mailchimp.

## Setup

1. In B1Admin vai a **Impostazioni → Sviluppatore → Webhook → Aggiungi Webhook**.
2. Imposta il **Tipo di connettore** su **Mailchimp**.
3. Incolla la tua **Chiave API Mailchimp** e l'**ID Pubblico**. La chiave è archiviata crittografata e non viene mai più visualizzata.
4. Gli eventi rilevanti sono pre-selezionati; deseleziona quelli che non desideri (ad es. lascia gli eventi di persone ma salta i tag di gruppo).
5. Salva. B1 verifica la chiave e il pubblico rispetto a Mailchimp prima di accettare — un errore di battitura fallisce immediatamente con un motivo.

Usa **Invia test** in qualsiasi momento per verificare nuovamente la connessione. Ogni tentativo di sincronizzazione viene registrato nella cronologia di consegna del webhook con la risposta effettiva di Mailchimp, e le consegne non riuscite vengono ritentate automaticamente con backoff per circa cinque giorni.

## Importazione iniziale

Il connettore sincronizza i *cambiamenti* dal momento in cui è attivo; non riempie la tua directory esistente. Per il giorno del setup:

1. In B1Admin vai a **Persone**, cerca le persone che desideri (o esegui una lista salvata), e fai clic su **Esporta** per scaricare un CSV.
2. In Mailchimp usa **Pubblico → Importa contatti** per caricare il CSV, applicando i tag durante l'importazione.

Fare il carico iniziale attraverso l'importatore di Mailchimp ti tiene in controllo della domanda di consenso — importa solo le persone che hanno effettivamente accettato di ricevere le tue email. L'importazione in massa di un'intera directory come contatti iscritti può violare i termini di Mailchimp e la legge anti-spam (CAN-SPAM/GDPR).

## Limiti e note

- **Sincronizzazione unidirezionale.** Le cancellazioni di iscrizione, i rimbalzi e le modifiche apportate in Mailchimp non tornano a B1. Qualcuno che si disiscrive in Mailchimp può ancora ricevere email inviate direttamente da B1 — tratta Mailchimp come la fonte di verità per il consenso al mailing di massa.
- **Le persone senza un indirizzo email vengono saltate** (registrate come tali nella cronologia delle consegne) — gli iscritti a Mailchimp sono codificati per email.
- **I cambiamenti dell'indirizzo email creano un nuovo iscritto.** Mailchimp identifica le persone per email, quindi cambiare l'email di qualcuno in B1 li aggiunge con il nuovo indirizzo; l'iscritto precedente rimane fino a quando non lo archivi in Mailchimp.
- **Solo i campi standard si sincronizzano** — nome, cognome, telefono. Stato di iscrizione, campus e campi B1 personalizzati non si mappano ai campi merge di Mailchimp in questa versione; usa i tag della lista per segmentare invece.
- **I nomi dei tag sono i nomi dei gruppi/liste.** Rinominare un gruppo o una lista inizia a contrassegnare con il nuovo nome; il vecchio tag rimane sui sottoscritti esistenti fino a quando non viene rimosso in Mailchimp.
- **I limiti di contatto di Mailchimp si applicano ancora** — una sincronizzazione che spinge un pubblico di livello gratuito oltre il limite registrerà errori `Member limit reached` nella cronologia delle consegne.

## Altre ricette (Zapier / Make)

Qualsiasi cosa al di là della sincronizzazione del pubblico — contrassegnare i donatori su `donation.created`, una direzione inversa Mailchimp → B1, o sincronizzazione a una piattaforma di posta elettronica diversa (Constant Contact, Brevo, ecc.) — è ancora disponibile tramite [Zapier](../zapier) o [Make](../make), che si attivano sugli stessi eventi webhook:

- **Contrassegna i donatori:** B1 *Nuova donazione* → B1 *Trova persona* → Mailchimp *Aggiungi iscritto a tag* (`Gave-2026`)
- **Bidirezionale:** Mailchimp *Nuovo iscritto* → B1 *Crea persona*

Se in precedenza hai collegato la sincronizzazione di persone/gruppi tramite Zapier, spegni questi Zap dopo aver abilitato il connettore nativo — eseguire entrambi elabora doppiamente ogni evento e brucia i compiti di Zapier per niente.

## Risoluzione dei problemi

- **Il salvataggio non riesce con "Mailchimp ha rifiutato la chiave API"** — la chiave è stata revocata o errata. Le chiavi devono terminare con un suffisso di data center come `-us21`.
- **Il salvataggio non riesce con "audience not found"** — l'ID pubblico non esiste con quell'account. Copialo da **Pubblico → Impostazioni → Nome e impostazioni predefinite del pubblico** (non è il nome del pubblico).
- **Una persona non è mai apparsa in Mailchimp** — controlla la cronologia delle consegne del webhook. "Skipped: person has no email address" significa esattamente quello; a `4xx` da Mailchimp mostra il motivo nel corpo della risposta.
- **Le consegne si sono completamente fermate** — dopo consegne esaurite ripetute il webhook si disabilita automaticamente. Correggi la causa (di solito una chiave revocata), ri-abilitalo, e usa **Invia test** per confermare.

## Vedi anche

- [Webhook (riferimento sviluppatore)](/docs/developer/api/webhooks) — il motore sottostante, catalogo degli eventi, semantica di consegna/riprovazione
- [Liste salvate](/docs/b1-admin/people/lists) — pubblici basati su regole che si mappano naturalmente sui tag Mailchimp
- [Zapier (panoramica)](../zapier) — per ricette al di là della sincronizzazione del pubblico

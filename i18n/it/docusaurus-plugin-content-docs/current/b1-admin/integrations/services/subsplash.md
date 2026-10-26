---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Se usi Subsplash per la tua app della chiesa, per le offerte o per i moduli, ma vuoi che B1 sia il sistema di riferimento per persone e donazioni, l'app Zapier di Subsplash può inviare in tempo reale a B1 donazioni, nuovi profili e risposte ai moduli. Tieni presente che l'app Zapier di Subsplash è attualmente **solo trigger** — il collegamento è unidirezionale (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account Subsplash con un piano che includa l'accesso a **API + Zapier** (verificalo con il tuo Client Success Manager di Subsplash — questi servizi dipendono dal livello del piano)
- Un account [Zapier](https://zapier.com)
- Un utente di B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa puoi collegare

Tutti i trigger qui sotto sono di Subsplash. Le azioni sono di B1.

| Trigger di Subsplash | Azione in B1 |
|---|---|
| Nuova donazione | Trova persona → Aggiungi donazione (Crea persona se manca) |
| Nuova promessa di donazione | Aggiungi donazione (con `notes` = "Pledge: …") |
| Nuova persona creata | Crea persona |
| Profilo persona aggiornato | (nessuna azione diretta in B1 — registra su un Google Sheet per una revisione manuale) |
| Nuova risposta al modulo | Crea persona + (facoltativo) Aggiungi membro al gruppo in base al modulo |

Subsplash → B1 è l'unica direzione supportata oggi dall'app di Subsplash.

## Configurazione

### 1. Crea una chiave API di B1

In B1Admin: **Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**. Ambiti:

- `people:read` — per cercare il donatore tramite email
- `people:write` — per crearlo se non esiste
- `donations:write` — per registrare la donazione
- (Non serve `settings:write` — il trigger è gestito da Subsplash, non da B1.)

### 2. Collega Subsplash a Zapier

Segui la [guida all'integrazione Zapier di Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash emette un token API dalla dashboard di Subsplash che Zapier usa per autenticare il lato trigger.

### 3. Crea lo Zap "registra una donazione"

1. **Trigger** — Subsplash: Nuova donazione
2. **Azione** — B1.church: Trova persona (per email)
3. **Filtro / Percorso** — dirama in base a "persona trovata":
   - **Trovata:** B1.church: Aggiungi donazione. Mappa importo, data, fondo, metodo = "Online", note = ID della transazione Subsplash.
   - **Non trovata:** B1.church: Crea persona → B1.church: Aggiungi donazione (usando l'ID della persona appena creata).

Attiva lo Zap. Le future donazioni di Subsplash confluiranno in **B1Admin → Donazioni** in pochi secondi.

## Ricette comuni

### Invia un ringraziamento quando arriva una prima offerta

- **Trigger** — Subsplash: Nuova donazione
- **Azione** — Filtro di Zapier: prosegui solo se è la prima offerta del donatore (usa una *Tabella di ricerca* sull'email del donatore con un Google Sheet dei donatori precedenti, oppure un passaggio *Percorsi* di Zapier sulla data di creazione del donatore)
- **Azione** — Mailchimp / SMTP / SendGrid: invia il messaggio di ringraziamento per la prima offerta
- **Azione** — B1.church: Aggiungi donazione (come di consueto)

### Filtra le promesse di donazione dal flusso di offerte ordinarie

- **Trigger** — Subsplash: Nuova promessa di donazione
- **Azione** — B1.church: Aggiungi donazione con `notes = "Pledge — Subsplash"` e un fondo chiamato `Pledges` (separato dal tuo fondo operativo), così puoi generare report sulle promesse in modo indipendente in **B1Admin → Donazioni → Riepilogo**.

### Sincronizza i nuovi utenti dell'app come persone di B1

- **Trigger** — Subsplash: Nuova persona creata
- **Azione** — B1.church: Crea persona, compilando nome, email, telefono. Etichettala in B1 aggiungendo la nuova persona a un gruppo come "Utenti app Subsplash".

## Limiti e note

- **L'app Zapier di Subsplash è solo trigger.** Se vuoi modifiche lato B1 (ad esempio una nuova persona di B1 che compaia anche in Subsplash), dovrai costruire questo ponte partendo dai trigger dell'app Zapier di B1 che richiamano l'API REST di Subsplash tramite un'azione personalizzata *Webhooks by Zapier — POST*. È un'integrazione personalizzata, non una ricetta.
- **L'accesso all'API dipende dal piano.** Se la connessione Zapier fallisce con `403 Forbidden`, il tuo piano Subsplash probabilmente non include l'accesso all'API — contatta il tuo Client Success Manager.
- **La mappatura dei fondi è manuale.** Subsplash passa il nome di una campagna o di una categoria; B1 richiede un ID numerico del fondo. Puoi impostare il fondo in modo fisso nello Zap oppure mantenere una *Tabella di ricerca* di Zapier che associa le campagne di Subsplash ai fondi di B1.

## Risoluzione dei problemi

- **Nessun trigger scatta dopo una donazione** — verifica nella dashboard Zapier di Subsplash che la connessione risulti ancora *Connessa*. Se il token API è stato ruotato lato Subsplash, lo Zap si interrompe silenziosamente; ricollegalo.
- **L'azione *Aggiungi donazione* di B1 fallisce con 422** — quasi sempre a causa di un `fundId` mancante o non riconosciuto. Elenca i tuoi fondi da **B1Admin → Donazioni → Fondi** e copia l'ID esatto nel passaggio dello Zap.
- **La prima offerta scatena il trigger due volte** — Subsplash a volte riinvia un trigger se Zapier non ha ricevuto la conferma. Aggiungi un *Filtro di Zapier* sull'ID della donazione (Subsplash lo invia nel payload) per eliminare i duplicati.

## Vedi anche

- [Donorbox](./donorbox) — stessa struttura di ricetta, piattaforma di donazioni diversa
- [Zapier (panoramica)](../zapier) — lato B1 di ogni ricetta Zapier
- [Guida all'integrazione Zapier di Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentazione di Subsplash)

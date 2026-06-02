---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Se usi Subsplash per la tua app di chiesa, donazione o moduli ma desideri B1 come sistema di registrazione per persone e donazioni, l'app Zapier di Subsplash può inserire donazioni, nuovi profili e risposte ai moduli in B1 in tempo reale. Nota che l'app Zapier di Subsplash è attualmente **solo trigger** — il collegamento è unidirezionale (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account Subsplash su un piano che include accesso **API + Zapier** (chiedi al tuo Subsplash Client Success Manager — questi cancello dietro il livello del piano)
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con autorizzazione **Modifica impostazioni**

</div>

## Cosa puoi collegare

Tutti i trigger di seguito sono di Subsplash. Le azioni sono di B1.

| Trigger Subsplash | Azione B1 |
|---|---|
| Nuova donazione | Trova persona → Aggiungi donazione (Crea persona se mancante) |
| Nuovo impegno | Aggiungi donazione (con `notes` = "Impegno: …") |
| Nuova persona creata | Crea persona |
| Profilo persona aggiornato | (nessuna azione diretta B1 — registra su un Google Sheet per la revisione manuale) |
| Nuova risposta modulo | Crea persona + (facoltativamente) Aggiungi membro del gruppo in base al modulo |

Subsplash → B1 è l'unica direzione che l'app di Subsplash supporta in questo momento.

## Configurazione

### 1. Crea una chiave API B1

In B1Admin: **Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**. Ambiti:

- `people:read` — per cercare il donatore per email
- `people:write` — per crearlo se non esiste
- `donations:write` — per registrare il regalo
- (Nessun `settings:write` necessario — Subsplash, non B1, possiede il trigger qui.)

### 2. Collega Subsplash a Zapier

Segui la [guida di integrazione Zapier di Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Emettono un token API dal dashboard di Subsplash che Zapier usa per autenticare il lato trigger.

### 3. Costruisci lo "Zap di registrazione della donazione"

1. **Trigger** — Subsplash: Nuova donazione
2. **Azione** — B1.church: Trova persona (per email)
3. **Filtro / Percorso** — biforca su "persona trovata":
   - **Trovata:** B1.church: Aggiungi donazione. Mappa importo, data, fondo, metodo = "Online", note = id transazione Subsplash.
   - **Non trovata:** B1.church: Crea persona → B1.church: Aggiungi donazione (usando il nuovo id della persona).

Attiva lo Zap. Le donazioni future di Subsplash fluiscono in **B1Admin → Donazioni** entro pochi secondi.

## Ricette comuni

### Invia un ringraziamento quando un primo regalo arriva

- **Trigger** — Subsplash: Nuova donazione
- **Azione** — Filtro per Zapier: continua solo se è il primo regalo del donatore (usa una *Lookup Table* su Donatore Email contro un Google Sheet di donatori passati, o un passaggio Zapier *Paths* sulla data creata del donatore)
- **Azione** — Mailchimp / SMTP / SendGrid: invia il messaggio di primo regalo ringraziamento
- **Azione** — B1.church: Aggiungi donazione (come al solito)

### Filtra gli impegni dal flusso di donazione regolare

- **Trigger** — Subsplash: Nuovo impegno
- **Azione** — B1.church: Aggiungi donazione con `notes = "Impegno — Subsplash"` e un fondo chiamato `Impegni` (separato dal tuo fondo operativo) in modo da poter segnalare gli impegni in modo indipendente in **B1Admin → Donazioni → Report**.

### Sincronizza nuovi utenti dell'app come persone B1

- **Trigger** — Subsplash: Nuova persona creata
- **Azione** — B1.church: Crea persona, compilando nome, email, telefono. Tag in B1 aggiungendo la nuova persona a un gruppo come "Utenti app Subsplash".

## Limiti e note

- **L'app Zapier di Subsplash è solo trigger.** Se desideri cambiamenti dal lato B1 (ad es. una nuova persona B1 che arriva anche in Subsplash), dovresti costruire quel ponte dall'app Zapier di B1 chiamando l'API REST di Subsplash tramite un'azione *Webhook per Zapier — POST* personalizzata. Questo è un'integrazione personalizzata, non una ricetta.
- **L'accesso API è gated per piano.** Se la connessione Zapier non riesce con `403 Forbidden`, il tuo piano Subsplash probabilmente non include accesso API — contatta il tuo Client Success Manager.
- **La mappatura dei fondi è manuale.** Subsplash passa un nome di campagna o categoria; B1 ha bisogno di un id di fondo numerico. O hard-code il fondo nello Zap o mantieni una *Lookup Table* di Zapier che mappa campagne Subsplash ai fondi B1.

## Risoluzione dei problemi

- **Nessun trigger si attiva dopo una donazione** — verifica nel dashboard Zapier di Subsplash che la connessione sia ancora *Connessa*. Se il token API è stato ruotato dal lato Subsplash, lo Zap si ferma silenziosamente; ri-collega.
- **B1 *Aggiungi donazione* non riesce con 422** — il più delle volte un `fundId` mancante o non riconosciuto. Elenca i tuoi fondi tramite **B1Admin → Donazioni → Fondi** e copia il id esatto nello Zap step.
- **Il primo regalo attiva due volte** — Subsplash occasionalmente ri-consegna un trigger se Zapier perde il suo ack. Aggiungi un *Filtro per Zapier* sull'id della donazione (Subsplash invia uno nel payload) per rilasciare i duplicati.

## Vedi anche

- [Donorbox](./donorbox) — stessa forma di ricetta, piattaforma di donazione diversa
- [Zapier (panoramica)](../zapier) — lato B1 di ogni ricetta Zapier
- [Guida all'integrazione Zapier di Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentazione di Subsplash)

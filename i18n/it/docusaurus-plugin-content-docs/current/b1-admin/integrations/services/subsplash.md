---
title: "Subsplash"
---

# Subsplash {#subsplash}

<div class="article-intro">

Se usi Subsplash per l'app della tua chiesa, per le donazioni o per i moduli, ma vuoi B1 come sistema di riferimento per persone e donazioni, l'app Zapier di Subsplash può inviare in tempo reale a B1 le donazioni, i nuovi profili e le risposte ai moduli. Nota che l'app Zapier di Subsplash è attualmente **solo trigger** -- il collegamento è unidirezionale (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account Subsplash con un piano che include l'accesso **API + Zapier** (verifica con il tuo Client Success Manager di Subsplash -- questo dipende dal livello del piano)
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa puoi collegare {#what-you-can-wire-up}

Tutti i trigger qui sotto sono di Subsplash. Le azioni sono di B1.

| Trigger di Subsplash | Azione di B1 |
|---|---|
| Nuova donazione | Trova persona → Aggiungi donazione (Crea persona se manca) |
| Nuova promessa di donazione | Aggiungi donazione (con `notes` = "Promessa: …") |
| Nuova persona creata | Crea persona |
| Profilo persona aggiornato | (nessuna azione diretta su B1 -- registra su un Foglio Google per una revisione manuale) |
| Nuova risposta a un modulo | Crea persona + (facoltativamente) Aggiungi membro al gruppo in base al modulo |

Al momento, l'unica direzione supportata dall'app Subsplash è Subsplash → B1.

## Configurazione {#setup}

### 1. Crea una chiave API di B1 {#1-mint-a-b1-api-key}

In B1Admin: **Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**. Ambiti:

- `people:read` -- per cercare il donatore tramite email
- `people:write` -- per crearlo se non esiste
- `donations:write` -- per registrare il dono
- (Non serve `settings:write` -- il trigger qui appartiene a Subsplash, non a B1.)

### 2. Collega Subsplash a Zapier {#2-connect-subsplash-to-zapier}

Segui la [guida all'integrazione Zapier di Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash emette un token API dalla Dashboard di Subsplash che Zapier usa per autenticare il lato trigger.

### 3. Crea lo Zap "registra una donazione" {#3-build-the-record-a-donation-zap}

1. **Trigger** -- Subsplash: Nuova donazione
2. **Azione** -- B1.church: Trova persona (per email)
3. **Filtro / Percorso** -- dirama in base a "persona trovata":
   - **Trovata:** B1.church: Aggiungi donazione. Associa importo, data, fondo, metodo = "Online" e note = ID transazione di Subsplash.
   - **Non trovata:** B1.church: Crea persona → B1.church: Aggiungi donazione (usando l'ID della persona appena creata).

Attiva lo Zap. Le future donazioni di Subsplash confluiranno in **B1Admin → Donazioni** in pochi secondi.

## Ricette comuni {#common-recipes}

### Invia un ringraziamento quando arriva un dono di un nuovo donatore {#send-a-thank-you-when-a-first-time-gift-lands}

- **Trigger** -- Subsplash: Nuova donazione
- **Azione** -- Filtro di Zapier: prosegui solo se è il primo dono del donatore (usa una *Tabella di ricerca* sull'email del donatore confrontata con un Foglio Google dei donatori precedenti, oppure un passaggio *Percorsi* di Zapier sulla data di creazione del donatore)
- **Azione** -- Mailchimp / SMTP / SendGrid: invia il messaggio di ringraziamento per il primo dono
- **Azione** -- B1.church: Aggiungi donazione (come di consueto)

### Separa le promesse di donazione dal flusso ordinario {#filter-pledges-off-the-regular-giving-flow}

- **Trigger** -- Subsplash: Nuova promessa di donazione
- **Azione** -- B1.church: Aggiungi donazione con `notes = "Promessa — Subsplash"` e un fondo chiamato `Promesse` (separato dal tuo fondo operativo), così puoi generare rapporti sulle promesse in modo indipendente in **B1Admin → Donazioni → Riepilogo**.

### Sincronizza i nuovi utenti dell'app come persone di B1 {#sync-new-app-users-as-b1-people}

- **Trigger** -- Subsplash: Nuova persona creata
- **Azione** -- B1.church: Crea persona, compilando nome, email e telefono. Etichetta la persona in B1 aggiungendola a un gruppo come "Utenti app Subsplash".

## Limiti e note {#limits-notes}

- **L'app Zapier di Subsplash è solo trigger.** Se vuoi modifiche lato B1 (ad esempio, una nuova persona di B1 che compaia anche in Subsplash), dovrai costruire quel ponte a partire dai trigger dell'app Zapier di B1 che chiamano l'API REST di Subsplash tramite un'azione personalizzata *Webhooks by Zapier — POST*. È un'integrazione personalizzata, non una ricetta.
- **L'accesso API dipende dal piano.** Se la connessione Zapier fallisce con `403 Forbidden`, il tuo piano Subsplash probabilmente non include l'accesso API -- contatta il tuo Client Success Manager.
- **La mappatura dei fondi è manuale.** Subsplash passa il nome di una campagna o di una categoria; B1 richiede un ID numerico del fondo. Puoi fissare il fondo direttamente nello Zap oppure mantenere una *Tabella di ricerca* di Zapier che associa le campagne di Subsplash ai fondi di B1.

## Risoluzione dei problemi {#troubleshooting}

- **Nessun trigger si attiva dopo una donazione** -- verifica nella dashboard Zapier di Subsplash che la connessione risulti ancora *Connessa*. Se il token API è stato ruotato dal lato Subsplash, lo Zap si ferma silenziosamente; ricollegalo.
- **L'azione *Aggiungi donazione* di B1 fallisce con 422** -- nella maggior parte dei casi manca un `fundId` o non è riconosciuto. Elenca i tuoi fondi da **B1Admin → Donazioni → Fondi** e copia l'ID esatto nel passaggio dello Zap.
- **Una prima donazione attiva il trigger due volte** -- Subsplash a volte ripete un trigger se Zapier non ha ricevuto la conferma. Aggiungi un *Filtro di Zapier* sull'ID della donazione (Subsplash lo invia nel payload) per eliminare i duplicati.

## Vedi anche {#see-also}

- [Donorbox](./donorbox) -- stessa struttura di ricetta, piattaforma di donazioni diversa
- [Zapier (panoramica)](../zapier) -- lato B1 di ogni ricetta Zapier
- [Guida all'integrazione Zapier di Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentazione di Subsplash)

---
title: "Subsplash"
description: "Collega le donazioni, le nuove persone e le risposte ai moduli di Subsplash a B1 con Zapier, così doni e profili arrivano automaticamente in B1 Admin."
---

# Subsplash

<div class="article-intro">

Se usi Subsplash per l'app della chiesa, le donazioni o i moduli, ma vuoi che B1 sia il sistema di riferimento per persone e donazioni, l'app Zapier di Subsplash può trasferire in tempo reale donazioni, nuovi profili e risposte ai moduli verso B1. Nota che l'app Zapier di Subsplash è al momento **solo trigger**: il collegamento è a senso unico (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account Subsplash con un piano che include l'accesso **API + Zapier** (verificalo con il tuo Client Success Manager di Subsplash: questa funzione dipende dal livello del piano)
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa puoi collegare {#what-you-can-wire-up}

Tutti i trigger qui sotto sono di Subsplash. Le azioni sono di B1.

| Trigger di Subsplash | Azione in B1 |
|---|---|
| Nuova donazione | Trova persona → Aggiungi donazione (Crea persona se manca) |
| Nuovo impegno di donazione | Aggiungi donazione (con `notes` = "Impegno: …") |
| Nuova persona creata | Crea persona |
| Profilo della persona aggiornato | (nessuna azione diretta in B1: registra in un Google Sheet per una revisione manuale) |
| Nuova risposta a modulo | Crea persona + (facoltativamente) Aggiungi membro al gruppo in base al modulo |

Da Subsplash a B1 è l'unica direzione supportata oggi dall'app di Subsplash.

## Configurazione {#setup}

### 1. Crea una chiave API B1 {#1-mint-a-b1-api-key}

In B1Admin: **Impostazioni → Sviluppatori → Chiavi API → Nuova chiave API**. Ambiti:

- `people:read`: per cercare il donatore tramite email
- `people:write`: per crearlo se non esiste
- `donations:write`: per registrare la donazione
- `settings:write`: quando colleghi la chiave, Zapier verifica ogni chiave B1 con l'elenco dei webhook di B1, quindi la connessione fallisce senza questo ambito (anche se il trigger qui appartiene a Subsplash, non a B1)

### 2. Collega Subsplash a Zapier {#2-connect-subsplash-to-zapier}

Segui la [guida all'integrazione Zapier di Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash emette un token API dalla propria dashboard, che Zapier usa per autenticare il lato dei trigger.

### 3. Crea lo Zap "registra una donazione" {#3-build-the-record-a-donation-zap}

1. **Trigger**: Subsplash: Nuova donazione
2. **Azione**: B1.church: Trova persona (per email)
3. **Azione**: B1.church: Aggiungi donazione, usando l'ID della persona dal passaggio 2. Collega importo, data, fondo, metodo = "Online" e note = ID della transazione Subsplash.

Il passaggio *Trova persona* di B1 interrompe lo Zap con un errore "Nessuna persona trovata" quando nessuno corrisponde, quindi un passaggio Filtro o Percorso non può ramificarsi su questo. Per gestire i donatori alla prima donazione, attiva la gestione degli errori di Zapier per il passaggio Trova persona e, nel suo percorso di errore, esegui B1.church: Crea persona → B1.church: Aggiungi donazione (usando l'ID della persona appena creata).

Attiva lo Zap. Le future donazioni Subsplash confluiranno in **B1Admin → Donazioni** in pochi secondi.

## Ricette comuni {#common-recipes}

### Invia un ringraziamento quando arriva la prima donazione {#send-a-thank-you-when-a-first-time-gift-lands}

- **Trigger**: Subsplash: Nuova donazione
- **Azione**: Filtro di Zapier: continua solo se è la prima donazione del donatore (usa una *Tabella di ricerca* sull'email del donatore confrontata con un Google Sheet dei donatori passati, oppure un passaggio *Percorsi* di Zapier sulla data di creazione del donatore)
- **Azione**: Mailchimp / SMTP / SendGrid: invia il messaggio di ringraziamento per la prima donazione
- **Azione**: B1.church: Aggiungi donazione (come di consueto)

### Escludi gli impegni dal flusso delle donazioni ordinarie {#filter-pledges-off-the-regular-giving-flow}

- **Trigger**: Subsplash: Nuovo impegno di donazione
- **Azione**: B1.church: Aggiungi donazione con `notes = "Pledge — Subsplash"` e un fondo chiamato `Pledges` (separato dal tuo fondo operativo), così puoi creare report sugli impegni in modo indipendente in **B1Admin → Donazioni → Riepilogo**.

### Sincronizza i nuovi utenti dell'app come persone in B1 {#sync-new-app-users-as-b1-people}

- **Trigger**: Subsplash: Nuova persona creata
- **Azione**: B1.church: Crea persona, compilando nome, email e telefono. Per etichettarla in B1, aggiungi la nuova persona a un gruppo come "Utenti app Subsplash".

## Limiti e note {#limits--notes}

- **L'app Zapier di Subsplash è solo trigger.** Se vuoi modifiche lato B1 (ad esempio, una nuova persona in B1 che arrivi anche in Subsplash), dovresti costruire quel ponte partendo dai trigger dell'app Zapier di B1 che chiamano la REST API di Subsplash tramite un'azione personalizzata *Webhooks by Zapier — POST*. Si tratta di un'integrazione personalizzata, non di una ricetta.
- **L'accesso API dipende dal piano.** Se la connessione Zapier fallisce con `403 Forbidden`, il tuo piano Subsplash probabilmente non include l'accesso API: contatta il tuo Client Success Manager.
- **La corrispondenza dei fondi è manuale.** Subsplash passa il nome di una campagna o di una categoria, mentre B1 richiede uno dei propri fondi. Puoi scegliere il fondo dal menu a tendina **Fondo** del passaggio Aggiungi donazione, oppure mantenere una *Tabella di ricerca* di Zapier che associa le campagne Subsplash ai fondi B1.

## Risoluzione dei problemi {#troubleshooting}

- **Nessun trigger si attiva dopo una donazione**: verifica nella dashboard Zapier di Subsplash che la connessione risulti ancora *Connessa*. Se il token API è stato ruotato lato Subsplash, lo Zap si ferma in silenzio: ricollegalo.
- **B1 *Aggiungi donazione* registra il dono senza fondo**: il campo **Fondo** era vuoto oppure mappato su un valore che non è l'ID di un fondo B1. Scegli il fondo dal menu a tendina **Fondo** del passaggio (elenca i fondi in **Donazioni > Fondi** in B1Admin), oppure mappa una Tabella di ricerca che restituisce gli ID dei fondi B1.
- **La prima donazione viene elaborata due volte**: Subsplash a volte reinvia un trigger se Zapier non ha confermato la ricezione. Aggiungi un *Filtro di Zapier* sull'ID della donazione (Subsplash lo invia nel payload) per eliminare i duplicati.

## Vedi anche {#see-also}

- [Donorbox](./donorbox.md): stessa struttura di ricetta, altra piattaforma di donazioni
- [Zapier (panoramica)](../zapier.md): la parte B1 di ogni ricetta Zapier
- [Guida all'integrazione Zapier di Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentazione di Subsplash)

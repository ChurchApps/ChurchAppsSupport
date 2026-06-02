---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO è una piattaforma di coinvolgimento del volontariato — le persone si iscrivono ai progetti, fanno il check-in al chiosco e accumulano ore. Se usi VOMO per la programmazione dei volontari ma B1 per i record delle persone, Zapier può sincronizzare l'iscrizione e i check-in tra loro in modo che nessuno dei due lati vada alla deriva.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [VOMO](https://vomo.org) su un piano che espone Zapier (contatta il supporto VOMO se non sei sicuro)
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con autorizzazione **Modifica impostazioni**

</div>

## Cosa puoi collegare

L'app Zapier di VOMO espone quattro trigger istantanei e quattro azioni. Le ricette che la maggior parte delle chiese vuole:

| Direzione | Trigger | Azione |
|---|---|---|
| VOMO → B1 | Iscrizione VOMO (creata) | B1: Trova persona → Crea persona (se nuovo) |
| VOMO → B1 | Check-in al chiosco VOMO | B1: Aggiungi membro del gruppo a un gruppo "Attualmente in servizio", o registra come presenze |
| B1 → VOMO | B1 `person.created` | VOMO: Trova organizzatore (per email); altrimenti passaggio personalizzato |
| Entrambi | Partecipazione VOMO (iscrizioni) | B1: Aggiungi membro del gruppo al gruppo specifico del progetto |

Le azioni di VOMO sono limitate a **bozza di progetti** e **ricerca** di organizzatori/progetti esistenti — non c'è un'azione "aggiungi questa persona a un progetto VOMO" oggi. Il collegamento interessante è principalmente VOMO → B1.

## Configurazione

### 1. Crea una chiave API B1

**Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**. Ambiti:

- `people:read`, `people:write` — per cercare e creare volontari come persone B1
- `groups:write` — per aggiungerli a gruppi di team di servizio
- (Facoltativo) `attendance:write` se tratti i check-in al chiosco come presenze

### 2. Costruisci lo Zap di sincronizzazione dell'iscrizione

1. **Trigger** — VOMO: Iscrizione (evento = `created`).
2. **Azione** — B1.church: Trova persona, abbinata per email.
3. **Filtro / Percorso** — biforca su trovato vs. non trovato:
   - Non trovato → B1.church: Crea persona, quindi Aggiungi membro del gruppo al gruppo di volontari appropriato.
   - Trovato → B1.church: Aggiungi membro del gruppo direttamente.
4. Attiva. I nuovi volontari VOMO ora appaiono in B1 con l'iscrizione al gruppo corretta.

### 3. (Facoltativo) Costruisci lo Zap di check-in al chiosco

1. **Trigger** — VOMO: Chiosco
2. **Azione** — B1.church: Trova persona (per email)
3. **Azione** — tua scelta:
   - *Se tratti come presenze* — Webhook per Zapier PUBBLICA sull'endpoint `/attendance/visits` di B1 (l'app Zapier di B1 non ha ancora un'azione di prima classe *Registra presenze*). La [chiave API](/docs/developer/api/api-keys) di B1 va nell'intestazione `Authorization: Bearer cak_…`.
   - *Se tratti come iscrizione al gruppo* — B1.church: Aggiungi membro del gruppo con un gruppo "Attualmente in servizio (oggi)", e uno Zap successivo nel corso della giornata li rimuove tramite una pulizia programmata.

## Ricette comuni

### Sincronizzazione dei gruppi per progetto

- **Trigger** — VOMO: Partecipazione (creata)
- **Azione** — Filtro per Zapier sull'id del progetto, quindi
- **Azione** — B1.church: Aggiungi membro del gruppo a un gruppo B1 il cui nome rispecchia il progetto VOMO.

Quando il progetto VOMO termina, cancella manualmente il gruppo B1 (o abbinalo a un trigger *Partecipazione eliminato* che li rimuove).

### Invia un "grazie per la registrazione" via SMS

Catena VOMO Partecipazione → Clearstream Invia testo o Text In Church Invia messaggio nello stesso Zap. Entrambi hanno azioni Zapier di prima classe — vedi [Clearstream](./clearstream) e [Text In Church](./text-in-church).

### Rileva l'abbandono

Esegui un trigger Zapier *Schedule* giornaliero che chiama Find Organizer in VOMO per un elenco di persone B1 che si sono unite al team di servizio questo mese — se VOMO restituisce "non trovato", non hanno attivato VOMO e hanno bisogno di una spinta.

## Limiti e note

- **L'email è la chiave di unione.** I payload di VOMO espongono un'email utente ma nessun id della persona di B1. I donatori che usano email diverse in ogni sistema creeranno duplicati.
- **Nessuna azione "Aggiungi a progetto" nell'app Zapier di VOMO oggi.** Se hai bisogno dell'iscrizione al progetto B1 → VOMO, pubblicherai sull'API REST di VOMO da un passaggio *Webhook per Zapier*, il che è un'integrazione personalizzata.
- **I livelli VOMO gratuiti / inferiori potrebbero non includere Zapier.** Conferma con il supporto VOMO prima di promettere una data di collegamento.

## Risoluzione dei problemi

- **Trigger non si attiva mai** — I trigger istantanei di VOMO richiedono che il token API rimanga valido. Ri-prova lo Zap; ri-collega VOMO se il token è stato ruotato.
- **B1 *Aggiungi membro del gruppo* non riesce con 422** — l'id del gruppo nell'azione non esiste. Apri **B1Admin → Gruppi**, fai clic sul gruppo e copia il segmento id dall'URL nello Zap step.
- **Persone B1 duplicate da un singolo volontario VOMO** — probabilmente si sono iscritti sotto un'email diversa da quella che avevano già in B1. Standardizza le email, o aggiungi un Zapier *Path* che cerca anche per telefono prima di creare.

## Vedi anche

- [Zapier (panoramica)](../zapier) — lato B1 di ogni ricetta Zapier
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — abbina le iscrizioni ai volontari con le conferme SMS
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks) — gli eventi su cui VOMO può innescare

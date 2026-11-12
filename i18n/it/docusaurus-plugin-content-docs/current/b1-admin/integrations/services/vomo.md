---
title: "VOMO"
description: "Collega le iscrizioni dei volontari e i check-in al chiosco di VOMO alle persone e ai gruppi di B1 Admin con Zapier, inclusi gli ambiti delle chiavi API e i passaggi di configurazione."
---

# VOMO

<div class="article-intro">

VOMO è una piattaforma per il coinvolgimento dei volontari: le persone si iscrivono ai progetti, fanno il check-in al chiosco e accumulano ore. Se usi VOMO per la pianificazione dei volontari ma B1 per le anagrafiche, Zapier può sincronizzare appartenenze e check-in tra i due sistemi, così nessuno dei due si disallinea.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [VOMO](https://vomo.org) con un piano che include Zapier (se non sei sicuro, chiedi al supporto VOMO)
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa puoi collegare {#what-you-can-wire-up}

L'app Zapier di VOMO espone quattro trigger istantanei e quattro azioni. Le ricette più richieste dalle chiese sono:

| Direzione | Trigger | Azione |
|---|---|---|
| VOMO → B1 | Iscrizione VOMO (creata) | B1: Trova persona → Crea persona (se nuova) |
| VOMO → B1 | Check-in al chiosco VOMO | B1: Aggiungi membro al gruppo "In servizio ora", oppure registra come presenza |
| B1 → VOMO | B1 `person.created` | VOMO: Trova organizzatore (per email); altrimenti passaggio personalizzato |
| Entrambe | Partecipazione VOMO (iscrizioni) | B1: Aggiungi membro al gruppo del progetto specifico |

Le azioni di VOMO si limitano a **creare bozze di progetti** e a **cercare** organizzatori/progetti esistenti: oggi non esiste un'azione "aggiungi questa persona a un progetto VOMO". Il collegamento più interessante è soprattutto da VOMO a B1.

## Configurazione {#setup}

### 1. Crea una chiave API B1 {#1-mint-a-b1-api-key}

**Impostazioni → Sviluppatori → Chiavi API → Nuova chiave API**. Ambiti:

- `settings:write`: quando colleghi la chiave, Zapier verifica ogni chiave B1 con l'elenco dei webhook di B1, quindi la connessione fallisce senza questo ambito
- `people:read`, `people:write`: per cercare e creare i volontari come persone di B1
- `groups:write`: per aggiungerli ai gruppi dei team di servizio
- (Facoltativo) `attendance:write` se consideri i check-in al chiosco come presenze

### 2. Costruisci lo Zap di sincronizzazione delle appartenenze {#2-build-the-membership-sync-zap}

1. **Trigger**: VOMO: Appartenenza (evento = `created`).
2. **Azione**: B1.church: Trova persona, abbinata per email.
3. **Azione**: B1.church: Aggiungi membro al gruppo, aggiungendo la persona del passaggio 2 al gruppo di volontari appropriato.

   Il passaggio *Trova persona* di B1 interrompe lo Zap con un errore "Nessuna persona trovata" quando nessuno corrisponde. Per i volontari che non sono ancora in B1, attiva la gestione degli errori di Zapier per il passaggio Trova persona ed esegui nel suo percorso di errore B1.church: Crea persona, poi Aggiungi membro al gruppo.
4. Attiva lo Zap. I nuovi volontari VOMO ora compaiono in B1 con l'appartenenza al gruppo giusto.

### 3. (Facoltativo) Costruisci lo Zap per il check-in al chiosco {#3-optional-build-the-kiosk-check-in-zap}

1. **Trigger**: VOMO: Chiosco
2. **Azione**: B1.church: Trova persona (per email)
3. **Azione**: a tua scelta:
   - *Se lo tratti come presenza*: POST di Webhooks by Zapier all'endpoint `/attendance/visits` di B1 (l'app Zapier di B1 non ha ancora un'azione *Registra presenza* dedicata). La [chiave API](/docs/developer/api/api-keys) di B1 va nell'intestazione `Authorization: Bearer cak_…`.
   - *Se lo tratti come appartenenza a un gruppo*: B1.church: Aggiungi membro al gruppo con il gruppo "In servizio oggi", e uno Zap separato più tardi nella giornata li rimuove tramite una pulizia pianificata.

## Ricette comuni {#common-recipes}

### Sincronizzazione dei gruppi per progetto {#per-project-group-sync}

- **Trigger**: VOMO: Partecipazione (creata)
- **Azione**: Filtro di Zapier sull'ID del progetto, poi
- **Azione**: B1.church: Aggiungi membro al gruppo, a un gruppo di B1 il cui nome rispecchia il progetto VOMO.

Quando il progetto VOMO termina, svuota manualmente il gruppo di B1 (oppure abbina questa ricetta a un trigger *Partecipazione eliminata* che li rimuove).

### Invia un SMS "grazie per esserti iscritto" {#send-a-thanks-for-signing-up-text-via-sms}

Collega in uno stesso Zap Partecipazione VOMO → Invia SMS di Clearstream oppure Invia messaggio di Text In Church. Entrambi hanno azioni Zapier dedicate: vedi [Clearstream](./clearstream.md) e [Text In Church](./text-in-church.md).

### Individua chi abbandona {#detect-drop-off}

Esegui uno Zap *Pianificazione* giornaliero che chiama Trova organizzatore in VOMO per un elenco di persone di B1 entrate nel team di servizio questo mese: se VOMO risponde "non trovato", non hanno attivato VOMO e hanno bisogno di un promemoria.

## Limiti e note {#limits--notes}

- **L'email è la chiave di collegamento.** I dati inviati da VOMO includono l'email dell'utente ma non l'ID persona di B1. I donatori che usano email diverse nei due sistemi creeranno duplicati.
- **Non esiste un'azione "Aggiungi a progetto" nell'app Zapier di VOMO.** Se ti serve l'iscrizione di persone da B1 a un progetto VOMO, dovresti inviare un POST alla REST API di VOMO da un passaggio *Webhooks by Zapier*: si tratta di un'integrazione personalizzata.
- **I piani gratuiti o di livello inferiore di VOMO potrebbero non includere Zapier.** Verifica con il supporto VOMO prima di promettere una data di collegamento.

## Risoluzione dei problemi {#troubleshooting}

- **Il trigger non si attiva mai**: i trigger istantanei di VOMO richiedono che il token API resti valido. Ripeti il test dello Zap; ricollega VOMO se il token è stato ruotato.
- **B1 *Aggiungi membro al gruppo* fallisce**: il gruppo indicato nell'azione non esiste più. Scegli di nuovo il gruppo dal menu a tendina **Gruppo** del passaggio, oppure apri il gruppo in B1Admin (**Persone > Gruppi**) e copia l'ID dalla fine del suo indirizzo web.
- **Persone duplicate in B1 per un singolo volontario VOMO**: probabilmente si è iscritto con un'email diversa da quella che aveva già in B1. Uniforma le email oppure aggiungi un *Percorso* di Zapier che cerchi anche per telefono prima di creare.

## Vedi anche {#see-also}

- [Zapier (panoramica)](../zapier.md): la parte B1 di ogni ricetta Zapier
- [Clearstream](./clearstream.md) e [Text In Church](./text-in-church.md): abbina le iscrizioni dei volontari a conferme via SMS
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks): gli eventi che VOMO può attivare

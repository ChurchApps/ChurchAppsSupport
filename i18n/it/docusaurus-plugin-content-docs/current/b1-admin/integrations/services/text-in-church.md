---
title: "Text In Church"
description: "Collega B1 Admin e Text In Church con Zapier: crea una chiave API, costruisci uno Zap dalla Connect Card a B1 e rispecchia l'appartenenza ai gruppi."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) combina SMS, flussi di lavoro a invio programmato e automazioni delle connect card. La sua app Zapier gestisce entrambe le direzioni: puoi inviare gli eventi di B1 a un flusso di lavoro di Text In Church, e ricevere dall'altra parte i trigger di connect card o di nuovi contatti verso B1.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Text In Church](https://textinchurch.com) con un piano che include l'integrazione Zapier
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa puoi collegare {#what-you-can-wire-up}

| Direzione | Trigger | Azione |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Crea/Aggiorna persona + Aggiungi al gruppo |
| B1 → Text In Church | B1 `form.submission.created` | Invia SMS tramite il team competente |
| B1 → Text In Church | B1 `group.member.added` | Aggiungi al gruppo (rispecchia l'appartenenza al gruppo) |
| Text In Church → B1 | Connect Card inviata | B1: Crea persona + Aggiungi membro al gruppo |
| Text In Church → B1 | Persona creata | B1: Crea persona |
| Text In Church → B1 | Persona entrata nel gruppo | B1: Aggiungi membro al gruppo |

Le azioni di Text In Church includono anche *Invia messaggio SMS*, *Invia messaggio vocale in broadcast*, *Crea compito*, *Trova persona/gruppo* e l'aggiunta/rimozione dall'appartenenza ai gruppi.

## Configurazione {#setup}

### 1. Crea una chiave API B1 {#1-mint-a-b1-api-key}

**Impostazioni → Sviluppatori → Chiavi API → Nuova chiave API**:

- `settings:write`: necessario per collegare la chiave a Zapier e per gli Zap attivati da B1
- `people:read`, `people:write`: per trovare o creare la persona
- `groups:write`: per la sincronizzazione dei gruppi
- (Facoltativo) `donations:write` se vuoi collegare le conferme delle donazioni a TIC

### 2. Collega Text In Church a Zapier {#2-connect-text-in-church-to-zapier}

Segui la [guida all'integrazione Zapier di Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Generano un token API dall'interno della dashboard di TIC.

### 3. Costruisci lo Zap dalla connect card a B1 {#3-build-the-connect-card-to-b1-zap}

È la direzione più comune. Le connect card inviate tramite TIC diventano automaticamente nuove persone in B1.

1. **Trigger**: Text In Church: Connect Card inviata.
2. **Azione**: B1.church: Trova persona (per email).
3. **Azione**: B1.church: Aggiungi membro al gruppo a un gruppo "Nuovo contatto", usando l'ID della persona dal passaggio 2.

Il passaggio *Trova persona* di B1 interrompe lo Zap con un errore "Nessuna persona trovata" quando nessuno corrisponde, quindi un Percorso non può ramificarsi su questo. Per i nuovi contatti, attiva la gestione degli errori di Zapier per il passaggio Trova persona ed esegui nel suo percorso di errore B1.church: Crea persona, poi Aggiungi membro al gruppo.

Attiva lo Zap. La prossima connect card inviata tramite TIC compare automaticamente in **B1Admin → Persone**.

## Ricette comuni {#common-recipes}

### Avvia un flusso di lavoro in stile connect card da un modulo B1 {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **Trigger**: B1.church: Nuovo modulo compilato (filtrato sull'ID del modulo "Sono nuovo qui")
- **Azione**: Text In Church: Crea/Aggiorna persona, associando le risposte del modulo a email / telefono / nome
- **Azione**: Text In Church: Aggiungi al gruppo, dove il gruppo ha un flusso di benvenuto preconfigurato collegato

### Rispecchia l'appartenenza ai gruppi {#mirror-group-membership}

- **Trigger**: B1.church: Nuovo membro del gruppo, filtrato su un `groupId` specifico
- **Azione**: Text In Church: Aggiungi al gruppo (stessa persona, gruppo speculare). Abbinalo a uno Zap `group.member.removed` se vuoi una sincronizzazione completa.

### Avvisa un leader quando qualcuno entra {#page-a-leader-when-someone-joins}

- **Trigger**: B1.church: Nuovo membro del gruppo
- **Azione**: Text In Church: Invia messaggio SMS, destinatario = il telefono del leader del gruppo, testo = `"{first} {last} just joined {group}"`

## Limiti e note {#limits--notes}

- **L'app Zapier di TIC dipende dal piano.** Se l'integrazione Zapier è disattivata nella dashboard di TIC, contatta l'assistenza di TIC per abilitarla sul tuo piano.
- **Gli ID dei gruppi sono quelli di TIC, non di B1.** Quando rispecchi i gruppi, dovrai mantenere una tabella di corrispondenza da qualche parte (una *Tabella di ricerca* di Zapier, oppure valori fissi in ogni Zap).
- **Invia messaggio SMS consuma crediti.** Ogni Zap che attiva *Invia SMS* consuma il tuo pacchetto di SMS di TIC.

## Risoluzione dei problemi {#troubleshooting}

- **Il trigger della Connect Card non si attiva**: TIC richiede che l'integrazione Zapier sia attiva. Verifica anche che il modulo con cui hai fatto la prova sia configurato come "Connect Card" e non come sondaggio generico.
- **Crea persona in B1 fallisce con 401**: la chiave API è errata, revocata o non ha `people:write`. Creane una nuova.
- **Persone duplicate in B1**: TIC invia sia *Persona creata* sia *Connect Card inviata* per lo stesso evento. Scegline una come fonte di riferimento e aggiungi un Filtro di Zapier sull'altra.

## Vedi anche {#see-also}

- [Clearstream](./clearstream.md): piattaforma SMS alternativa con uno schema Zapier simile
- [Zapier (panoramica)](../zapier.md): la parte B1 di ogni ricetta Zapier
- [Guida Zapier di Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (documentazione di TIC)

---
title: "Mobile Message"
description: "Collega gli eventi di B1 Admin a Mobile Message, un'API SMS australiana, usando i webhook di Zapier o Make per inviare SMS di benvenuto, di ringraziamento per le donazioni e di promemoria."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) è un'API SMS australiana, apprezzata dalle chiese australiane perché offre numeri locali e tariffe australiane competitive, dove Clearstream e Text In Church sono orientati agli Stati Uniti. Oggi Mobile Message non dispone di un'app Zapier di prima classe, ma pubblica una REST API pubblica, quindi puoi collegare gli eventi di B1 agli SMS di Mobile Message tramite **Webhooks by Zapier** (oppure il modulo HTTP di Make) in pochi minuti.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Mobile Message](https://mobilemessage.com.au) con un Sender ID registrato e le credenziali API (nome utente e password API in *Account → Impostazioni API*)
- Un account [Zapier](https://zapier.com) (oppure [Make](https://www.make.com))
- Un utente B1Admin con il permesso **Modifica impostazioni**

</div>

## Cosa puoi collegare {#what-you-can-wire-up}

L'API di Mobile Message è pensata solo per "inviare SMS": nessun trigger, solo testi in uscita. Quindi tutte le ricette vanno da B1 a SMS:

| Direzione | Trigger di B1 | Risultato |
|---|---|---|
| B1 → Mobile Message | `person.created` | SMS di benvenuto alla nuova persona |
| B1 → Mobile Message | `donation.created` | SMS di ringraziamento al donatore |
| B1 → Mobile Message | `form.submission.created` | Avviso al team di turno |
| B1 → Mobile Message | `event.created` | Messaggio di promemoria a una lista |

## Configurazione {#setup}

### 1. Crea una chiave API B1 {#1-mint-a-b1-api-key}

**Impostazioni → Sviluppatori → Chiavi API → Nuova chiave API**:

- `settings:write`: perché il webhook del trigger possa essere registrato
- `people:read`: per cercare il numero di telefono del destinatario a partire da un `personId`

### 2. Costruisci lo Zap con Webhooks by Zapier {#2-build-the-zap-with-webhooks-by-zapier}

1. **Trigger**: B1.church: scegli l'evento che ti interessa (ad esempio, Nuova donazione).
2. **Azione**: B1.church: Trova persona (usando `data.personId`) per ottenere numero di telefono e nome.
3. **Azione**: Webhooks by Zapier: **POST**. Configura come segue.

Le impostazioni del passaggio POST:

- **URL**: `https://api.mobilemessage.com.au/v1/messages`
- **Tipo di payload**: JSON
- **Dati**:
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Intestazioni**: `Content-Type: application/json` (Webhooks by Zapier lo aggiunge automaticamente)
- **Basic Auth**: nel campo *Basic Auth* inserisci `<api_username>|<api_password>` (Zapier lo converte nell'intestazione `Authorization: Basic …` corretta)

Attiva lo Zap. Invia una donazione di prova in B1Admin per verificare che arrivi un SMS.

## Ricette comuni {#common-recipes}

### Promemoria degli eventi la mattina stessa {#event-reminders-the-morning-of}

- **Trigger**: Pianificazione di Zapier (ogni giorno, alle 7)
- **Azione**: conserva l'elenco degli eventi di oggi in un Google Sheet (o in un'altra app che Zapier può leggere) e cerca le righe di oggi: l'app Zapier di B1 non ha un'azione per cercare gli eventi
- **Azione**: Webhooks by Zapier: POST a Mobile Message con l'elenco degli eventi, indirizzato a un gruppo di iscritti registrato

### Usa l'endpoint batch per un messaggio a una lista {#use-the-batch-endpoint-for-a-list-broadcast}

L'endpoint `/v1/messages` di Mobile Message accetta fino a 10.000 messaggi per chiamata. Per inviare un messaggio a un gruppo di B1:

- **Trigger**: B1.church: Nuovo modulo compilato (filtrato su un modulo specifico)
- **Azione**: Webhooks by Zapier: GET `/membership/groupmembers?groupId=…` per elencare i membri del gruppo di destinazione (l'app Zapier di B1 non ha un'azione di elenco per questo; invia la chiave API come intestazione `Authorization: Bearer cak_…`)
- **Azione**: Formatter by Zapier → Utilities → Line-itemize per trasformare la risposta in un array `messages`
- **Azione**: Webhooks by Zapier: POST dell'intero array a `/v1/messages`

### Alternativa con Make {#make-alternative}

Se preferisci Make, inserisci il modulo **HTTP — Effettua una richiesta** dopo il trigger Osserva eventi di B1 e configuralo nello stesso modo (POST, Basic Auth, corpo JSON). Vedi la [panoramica di Make](../make.md) per la parte B1: nota che l'app B1.church per Make non è ancora stata rilasciata.

## Limiti e note {#limits--notes}

- **Basic Auth è l'unico metodo di autenticazione**: Mobile Message emette un nome utente e una password dalla dashboard. Trattali entrambi come segreti.
- **`sender` deve essere un Sender ID registrato** nel tuo account Mobile Message, altrimenti l'invio restituisce `400 Invalid sender`. La normativa australiana richiede la registrazione del mittente.
- **I numeri di telefono australiani** possono essere `0412345678` (locale) o `+61412345678` (internazionale). L'API accetta entrambi, ma normalizza su `+61…` se invii anche all'estero.
- **Fino a 10.000 messaggi per richiesta**: utile per i messaggi di massa, ma una singola consegna di webhook di B1 difficilmente genererà un elenco così grande; riserva l'endpoint batch agli Zap di invio massivo pianificati.

## Risoluzione dei problemi {#troubleshooting}

- **POST restituisce `401 Unauthorized`**: le credenziali Basic Auth sono errate. Copiale di nuovo dalla dashboard di Mobile Message in *Account → Impostazioni API*. Nota che per impostazione predefinita il nome utente è l'email del tuo account, non una chiave API separata.
- **POST restituisce `400 Invalid sender`**: il valore di `sender` non è un Sender ID registrato nel tuo account. Registralo prima nella dashboard di Mobile Message.
- **L'SMS arriva ma è troncato**: Mobile Message divide i messaggi oltre circa 160 caratteri in più parti, e si paga per parte. Controlla il corpo della risposta: indica il numero di parti.

## Vedi anche {#see-also}

- [Clearstream](./clearstream.md) e [Text In Church](./text-in-church.md): fornitori SMS alternativi con app Zapier native (non serve il passaggio Webhooks by Zapier)
- [Zapier (panoramica)](../zapier.md): la parte B1 di ogni ricetta Zapier
- [Documentazione API di Mobile Message](https://mobilemessage.com.au/api-documentation)

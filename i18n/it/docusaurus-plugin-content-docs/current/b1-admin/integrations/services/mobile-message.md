---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) è un'API SMS australiana — popolare tra le chiese AU perché offre numeri locali e prezzi AU competitivi dove Clearstream e Text In Church sono incentrati su US. Mobile Message non ha un'app Zapier di prima classe oggi, ma pubblica un'API REST pubblica, quindi puoi collegare gli eventi B1 ai testi Mobile Message tramite **Webhook per Zapier** (o il modulo HTTP di Make) in pochi minuti.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Mobile Message](https://mobilemessage.com.au) con un ID mittente registrato e credenziali API (nome utente e password API sotto *Account → Impostazioni API*)
- Un account [Zapier](https://zapier.com) (o [Make](https://www.make.com))
- Un utente B1Admin con autorizzazione **Modifica impostazioni**

</div>

## Cosa puoi collegare

L'API di Mobile Message ha la forma "invia SMS" — nessun trigger, solo testo in uscita. Quindi le ricette sono tutte B1 → SMS:

| Direzione | Trigger B1 | Risultato |
|---|---|---|
| B1 → Mobile Message | `person.created` | Testo di benvenuto alla nuova persona |
| B1 → Mobile Message | `donation.created` | Testo di ringraziamento al donatore |
| B1 → Mobile Message | `form.submission.created` | Pagina il team in servizio |
| B1 → Mobile Message | `event.created` | Broadcast di promemoria a un elenco |

## Configurazione

### 1. Crea una chiave API B1

**Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**:

- `settings:write` — per il webhook del trigger per registrare
- `people:read` — per cercare il numero di telefono del destinatario da un `personId`

### 2. Costruisci lo Zap con Webhook per Zapier

1. **Trigger** — B1.church: scegli l'evento che desideri (ad es. Nuova donazione).
2. **Azione** — B1.church: Trova persona (usando `data.personId`) per ottenere il numero di telefono e il nome.
3. **Azione** — Webhook per Zapier: **POST**. Configura come di seguito.

Le impostazioni del passaggio POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Tipo di payload** — JSON
- **Dati** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Grazie per il tuo regalo, {{step2_first_name}}!",
        "sender": "TuaChiesa"
      }
    ]
  }
  ```
- **Intestazioni** — `Content-Type: application/json` (Webhook per Zapier lo aggiunge automaticamente)
- **Autenticazione di base** — imposta il campo *Autenticazione di base* su `<api_username>|<api_password>` (Zapier converte questo nell'intestazione `Authorization: Basic …` giusta)

Attiva lo Zap. Invia un regalo di prova in B1Admin per verificare che un testo arrivi.

## Ricette comuni

### Promemoria di evento la mattina di

- **Trigger** — Pianificazione per Zapier (giornaliera, 7am)
- **Azione** — B1.church: Trova eventi per oggi (o usa un passaggio Find con un filtro di data fisso, o memorizza l'elenco di eventi di oggi in un Google Sheet)
- **Azione** — Webhook per Zapier: PUBBLICA su Mobile Message con l'elenco di eventi a un gruppo di sottoscrittori registrati

### Usa l'endpoint batch per un broadcast di elenco

L'endpoint `/v1/messages` di Mobile Message accetta fino a 10.000 messaggi per chiamata. Per trasmettere a un gruppo B1:

- **Trigger** — B1.church: Nuovo invio di modulo (filtro a un modulo specifico)
- **Azione** — B1.church: Elenca i membri del gruppo per un gruppo di destinazione (tramite un passaggio *Webhook per Zapier — GET* su `/membership/groupmembers?groupId=…`)
- **Azione** — Formattatore per Zapier → Utilità → Articolizza la risposta in un array `messages`
- **Azione** — Webhook per Zapier: PUBBLICA l'array completo su `/v1/messages`

### Alternativa Make

Se preferisci Make, rilascia il modulo **HTTP — Effettua una richiesta** dopo il trigger B1 Watch Events, configuralo allo stesso modo (POST, Autenticazione di base, corpo JSON). Vedi la [panoramica Make](../make) per il lato B1.

## Limiti e note

- **L'autenticazione di base è l'unico metodo di autenticazione** — Mobile Message emette un nome utente e una password dal dashboard. Tratta entrambi come segreti.
- **`sender` deve essere un ID mittente registrato** nel tuo account Mobile Message, altrimenti l'invio restituirà `400 Mittente non valido`. I regolamenti AU richiedono la registrazione del mittente.
- **Numeri di telefono AU** possono essere `0412345678` (locale) o `+61412345678` (internazionale). L'API accetta entrambi, ma normalizza su `+61…` se invii anche all'estero.
- **Fino a 10.000 messaggi per richiesta** — utile per broadcast, ma una singola consegna del webhook di B1 raramente emetterà un elenco così grande; riservare l'endpoint batch per Zap bulk programmati.

## Risoluzione dei problemi

- **POST restituisce `401 Non autorizzato`** — Le credenziali di autenticazione di base sono sbagliate. Ri-copia dal dashboard di Mobile Message *Account → Impostazioni API*. Nota che il nome utente è la tua email dell'account per impostazione predefinita, non una chiave API separata.
- **POST restituisce `400 Mittente non valido`** — il valore `sender` non è un ID mittente registrato sul tuo account. Registralo prima nel dashboard di Mobile Message.
- **Il testo arriva ma è troncato** — Mobile Message divide i messaggi su ~160 caratteri in più parti; paghi per parte. Controlla il corpo della risposta — ti dice il conteggio delle parti.

## Vedi anche

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — provider SMS alternativi con app Zapier native (nessun passaggio Webhook-per-Zapier necessario)
- [Zapier (panoramica)](../zapier) — lato B1 di ogni ricetta Zapier
- [Documentazione API Mobile Message](https://mobilemessage.com.au/api-documentation)

---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Collega ChatGPT di OpenAI ai tuoi dati di B1 e lascia che faccia il lavoro pesante. Una volta collegato, ChatGPT può vedere i tuoi record di chiesa in diretta e aiutarti a portare a termine le cose che altrimenti richiederebbero diversi passaggi in B1 Admin.

**Alcune cose che puoi chiedergli di fare:**
- "Configura le aule di Scuola Domenicale e metti ogni insegnante nella stanza giusta in base al loro gruppo"
- "Mostrami tutti coloro che hanno partecipato la scorsa settimana ma non sono stati assegnati a un piccolo gruppo"
- "Riassumi le donazioni di questo mese per fondo"
- "Chi sono i nostri nuovi membri e li abbiamo seguiti?"
- "Non riesco a capire come fare X in B1 — puoi guidarmi attraverso di esso o farlo per me?"

ChatGPT estrae le risposte e intraprende le azioni direttamente dai tuoi dati B1, limitati alla tua chiesa sola.

:::tip Consigliato: Claude Code
Per l'esperienza MCP più liscia, [Claude Code](./claude) è il client consigliato — la configurazione richiede un comando e funziona subito. ChatGPT funziona anche ed è una grande scelta se il tuo team lo sta già utilizzando.
:::

Sono supportati due percorsi: il **Connettore MCP** (incorporato in ChatGPT) e un **GPT Personalizzato** per i team che desiderano un assistente condivisibile.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Un amministratore di chiesa con il permesso **Modifica Impostazioni** in B1 Admin (necessario per creare una chiave API)
- Un account **ChatGPT Plus, Pro, Team o Enterprise**

</div>

## Guida di Configurazione Rapida

Segui questi passaggi nell'app desktop di **ChatGPT** (Mac/Windows).

**Passaggio 1 — Ottieni la tua chiave API da B1 Admin per primo**

Prima di toccare ChatGPT, crea una chiave API in B1 Admin così l'hai pronto da incollare:

1. Vai a **Impostazioni → Sviluppatore → Chiavi API** in B1 Admin
2. Fai clic su **Nuova Chiave API**, chiamala `ChatGPT`, scegli i tuoi ambiti (inizia con `people:read`, `groups:read`, `attendance:read`, `donations:read`), e fai clic su **Salva**
3. Copia la chiave `cak_…` — viene mostrata solo una volta

**Passaggio 2 — Fai clic sul tuo nome nell'angolo in basso a sinistra di ChatGPT**

**Passaggio 3 — Fai clic su Impostazioni**

**Passaggio 4 — Fai clic su Plugin nella barra laterale sinistra**

**Passaggio 5 — Fai clic sulla scheda MCP**

Vedrai qualsiasi server MCP che hai già aggiunto qui.

**Passaggio 6 — Fai clic su Aggiungi → Aggiungi server MCP**

**Passaggio 7 — Compila il modulo e fai clic su Salva**

Fai clic su **HTTP Streamabile**, quindi compila:

| Campo | Cosa inserire |
|---|---|
| **Nome** | `B1 Church` (o qualsiasi nome ti piaccia) |
| **Tipo** | Fai clic su **HTTP Streamabile** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Intestazioni** | Fai clic su **+ Aggiungi intestazione** → Chiave: `Authorization` → Valore: vedi sotto |

- **Chiave:** `Authorization`
- **Valore:** `Bearer cak_yourkey` — la parola Bearer, uno spazio, quindi la tua chiave

Fai clic su **Salva**.

Fatto! Torna a una chat e chiedi qualcosa come "Quante persone ci sono nella nostra chiesa?" e ChatGPT trarrà la risposta direttamente da B1.

---

## Sicurezza e Limiti

- **Isolamento per chiesa.** La chiave API si risolve in una sola chiesa. ChatGPT non può vedere i dati di altre chiese.
- **Limitato dalle autorizzazioni.** La chiave trasporta solo gli ambiti che hai concesso.
- **Revocabile istantaneamente.** Elimina la chiave in **Impostazioni → Sviluppatore → Chiavi API** e l'accesso termina immediatamente.

---

## Costo

ChurchApps è gratuito e open source. OpenAI addebita l'utilizzo di ChatGPT secondo i loro piani. Non c'è costo per chiamata da ChurchApps.

---

## Risoluzione dei Problemi

**Il connettore MCP dice "Non Autorizzato":** la tua chiave API è mancante o non corretta. Apri le impostazioni del connettore e controlla che la chiave nel valore `Authorization: Bearer` sia il valore completo `cak_…`.

**ChatGPT dice che non può trovare determinati dati:** la chiave potrebbe non avere gli ambiti corretti. Crea una nuova chiave in **Impostazioni → Sviluppatore → Chiavi API** con gli ambiti aggiuntivi e aggiorna il connettore.

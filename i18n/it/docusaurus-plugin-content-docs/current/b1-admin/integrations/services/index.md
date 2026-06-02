---
title: "Servizi connessi"
---

# Servizi connessi

<div class="article-intro">

Il modo più rapido per collegare B1 a un altro strumento di tech di chiesa è solitamente una ricetta Zapier o Make — non hai bisogno di nuova infrastruttura B1, e la terza parte ospita il flusso di lavoro. Questa pagina è un elenco curato di servizi che abbiamo confermato sono collegabili oggi, con una breve guida di configurazione copiabile per ciascuno.

</div>

## A colpo d'occhio

| Servizio | Categoria | Ponte | Cosa puoi collegare |
|---|---|---|---|
| [Mailchimp](./mailchimp) | Email | Zapier o Make | Sincronizza nuove persone B1 / donatori in un'audience Mailchimp |
| [Donorbox](./donorbox) | Donazioni | Zapier | Spingere le donazioni di Donorbox e i donatori indietro in B1 |
| [Subsplash](./subsplash) | App / Donazioni | Zapier | Tira le donazioni di Subsplash e le persone in B1 |
| [VOMO](./vomo) | Volontariato | Zapier | Sincronizza le iscrizioni ai volontari tra i gruppi B1 e i progetti VOMO |
| [Clearstream](./clearstream) | SMS | Zapier | Attiva un testo Clearstream da eventi B1; ingerisce le risposte come record B1 |
| [Text In Church](./text-in-church) | SMS / Flussi di lavoro | Zapier | Attiva i flussi di lavoro di Text In Church da B1; ricevi i dati della scheda di contatto |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhook per Zapier o Make | Invia SMS da qualsiasi evento B1 |
| [Checkr](./checkr) | Verifiche background | Make | Avvia una verifica background quando qualcuno si unisce a un team di servizio |

## Cosa hanno tutte in comune

1. **Il lato B1 del collegamento è identico** — crea una chiave API con gli ambiti giusti in **B1Admin → Impostazioni → Sviluppatore → Chiavi API**, quindi lascia che il ponte registri un webhook per il trigger (Zapier / Make lo fanno automaticamente, richiede `settings:write`) oppure chiama gli endpoint REST di B1 da un'azione a valle.
2. **Il ponte ti addebita, non noi.** ChurchApps è gratuito; Zapier e Make hanno entrambi livelli gratuiti che coprono una manciata di ricette.
3. **Puoi testare il collegamento senza andare in diretta.** Entrambi i ponti hanno un pulsante "Test step" che attiva il trigger una volta contro B1 e ti mostra la forma dei dati prima di attivare la ricetta.

## Scelta di un ponte

- **Zapier** è più intuitivo e ha il catalogo app più grande — usalo come predefinito a meno che il costo non sia un problema.
- **Make** è più economico su larga scala e ha una logica di routing/filtro più flessibile — usalo quando un singolo flusso di lavoro ha fan-out, condizionali o molti passaggi.
- **Webhook per Zapier** (usato per il documento Mobile Message) è un adattatore generico che ti consente di INVIARE a qualsiasi endpoint HTTP da uno Zap quando la destinazione non è un'app Zapier di prima classe.

Se desideri qualcosa non su questo elenco, l'[API REST](/docs/developer/api) e i [webhook](/docs/developer/api/webhooks) di B1 sono aperti — puoi costruire un ponte una tantum con il [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) in poche ore.

## Cosa non c'è qui (e perché)

Diversi strumenti di tech di chiesa popolari — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — non hanno oggi un'app Zapier pubblicata o un modulo Make. Hanno le loro API ma collegarli a B1 è un lavoro di codice personalizzato, non una ricetta, quindi non si adattano a questo elenco. Se un fornitore aggiunge un'app Zapier o un modulo Make, aggiungeremo il documento.

Abbiamo anche deliberatamente saltato strumenti specifici di Planning Center-Services (musica, presentazione), prodotti ChMS concorrenti, consulenti di migrazione e strumenti che solo puliscono dati specifici di PCO — nessuno di loro ha un utile percorso di collegamento in B1.

## Vedi anche

- [Zapier (panoramica)](../zapier) — il lato B1 di ogni ricetta Zapier è identico; questo documento lo copre una volta
- [Make (panoramica)](../make) — lo stesso per gli scenari Make
- [Slack e Discord](../slack-discord) — notifiche di chat senza alcun ponte
- [Google Sheets](../google-sheets) — esportazioni su richiesta
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks) — il catalogo degli eventi su cui ogni ricetta si basa

---
title: "Servizi collegati"
description: "Collega B1 Admin a Mailchimp, Donorbox, Subsplash, VOMO, Clearstream e altri strumenti con le ricette di Zapier o Make, con una guida di configurazione per ciascuno."
---

# Servizi collegati

<div class="article-intro">

Il modo più rapido per collegare B1 a un altro strumento tecnologico per la chiesa è di solito una ricetta di Zapier o Make: non servono nuove infrastrutture B1, e il servizio terzo ospita il flusso di lavoro. Questa pagina è un elenco selezionato dei servizi che abbiamo confermato come collegabili oggi, con una breve guida di configurazione da copiare e incollare per ciascuno.

</div>

## In sintesi {#at-a-glance}

| Servizio | Categoria | Ponte | Cosa puoi collegare |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | Email | Integrato in B1 (scheda Webhook) | Mantieni un pubblico Mailchimp sincronizzato con persone, gruppi e liste salvate di B1 |
| [Donorbox](./donorbox.md) | Donazioni | Zapier | Invia le donazioni e i donatori di Donorbox in B1 |
| [Subsplash](./subsplash.md) | App / Donazioni | Zapier | Importa in B1 le donazioni e le persone di Subsplash |
| [VOMO](./vomo.md) | Volontariato | Zapier | Sincronizza le iscrizioni dei volontari tra i gruppi di B1 e i progetti VOMO |
| [Clearstream](./clearstream.md) | SMS | Zapier | Attiva un SMS Clearstream dagli eventi di B1; importa le risposte come record di B1 |
| [Text In Church](./text-in-church.md) | SMS / Flussi di lavoro | Zapier | Attiva i flussi di lavoro di Text In Church da B1; ricevi i dati della Connect Card |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier o Make | Invia SMS a partire da qualsiasi evento di B1 |
| [Checkr](./checkr.md) | Verifiche dei precedenti | Make | Avvia una verifica dei precedenti quando qualcuno entra in un team di servizio |

## Cosa hanno in comune tutti questi {#what-all-of-these-have-in-common}

1. **La parte B1 del collegamento è identica**: crea una chiave API con gli ambiti giusti in **B1Admin → Impostazioni → Sviluppatori → Chiavi API**, poi lascia che il ponte registri un webhook per il trigger (Zapier / Make lo fanno automaticamente e richiedono `settings:write`), oppure chiama gli endpoint REST di B1 da un'azione successiva. L'app Zapier di B1.church richiede `settings:write` su ogni chiave, perché verifica la chiave con l'elenco dei webhook di B1 quando la colleghi. (Mailchimp fa eccezione: la sua sincronizzazione è integrata in B1 e si configura nella scheda **Webhook**, senza chiave API né ponte.)
2. **Il ponte fattura a te, non a noi.** ChurchApps è gratuito; Zapier e Make hanno entrambi piani gratuiti che coprono qualche ricetta.
3. **Puoi testare il collegamento senza andare in produzione.** Zapier ha un pulsante "Testa passaggio" che recupera dati di esempio da B1 e ti mostra la struttura dei dati prima che tu attivi la ricetta.

## Come scegliere il ponte {#picking-a-bridge}

- **Zapier** è più semplice e ha il catalogo di app più ampio: usalo come scelta predefinita, a meno che il costo non sia un problema.
- **Make** costa meno su larga scala e ha una logica di instradamento e filtri più flessibile: usalo quando un singolo flusso di lavoro ha più diramazioni, condizioni o molti passaggi.
- **Webhooks by Zapier** (usato nella documentazione di Mobile Message) è un adattatore generico che ti permette di inviare una richiesta POST a qualsiasi endpoint HTTP da uno Zap, quando la destinazione non è un'app Zapier di prima classe.

Se cerchi qualcosa che non è in questo elenco, la [REST API](/docs/developer/api) e i [webhook](/docs/developer/api/webhooks) di B1 sono aperti: puoi costruire un ponte su misura con l'[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) in qualche ora.

## Cosa non c'è (e perché) {#whats-not-here-and-why}

Diversi strumenti tecnologici popolari per le chiese (Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe) oggi non hanno un'app Zapier pubblicata né un modulo Make. Hanno le proprie API, ma collegarli a B1 richiede codice personalizzato e non una ricetta, quindi non rientrano in questo elenco. Se un fornitore aggiunge un'app Zapier o un modulo Make, aggiungeremo la documentazione.

Abbiamo anche deliberatamente escluso gli strumenti specifici di Planning Center Services (musica, presentazioni), i prodotti ChMS concorrenti, i consulenti per la migrazione e gli strumenti che si limitano a ripulire i dati specifici di PCO: nessuno di questi ha un percorso di collegamento utile verso B1.

## Vedi anche {#see-also}

- [Zapier (panoramica)](../zapier.md): la parte B1 di ogni ricetta Zapier è identica; questa documentazione la illustra una volta sola
- [Make (panoramica)](../make.md): lo stesso vale per gli scenari Make
- [Slack e Discord](../slack-discord.md): notifiche in chat senza alcun ponte
- [Google Sheets](../google-sheets.md): esportazioni su richiesta
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks): il catalogo degli eventi su cui si basa ogni ricetta

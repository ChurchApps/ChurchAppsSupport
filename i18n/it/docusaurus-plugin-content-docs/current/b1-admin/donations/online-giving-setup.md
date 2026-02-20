---
title: "Configurazione donazioni online"
---

# Configurazione donazioni online

<div class="article-intro">

B1 Admin si integra con **Stripe** e **PayPal** per permettere ai tuoi membri di donare online attraverso il tuo sito B1.church. Una volta configurato, le donazioni online appaiono automaticamente nei tuoi registri delle donazioni accanto alle offerte inserite manualmente, mantenendo tutto in un unico sistema.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi [fondi per le donazioni](funds.md) in modo che i donatori possano designare le loro offerte
- Crea un account Stripe su [stripe.com](https://stripe.com) e attivalo (toglilo dalla modalità di test)
- Tieni pronti le tue credenziali di accesso a B1 Admin

</div>

## Configurare Stripe

1. Crea un account su [stripe.com](https://stripe.com) se non ne hai già uno. Assicurati di **attivare il tuo account** e toglierlo dalla modalità di test.
2. In Stripe, vai su **Developers > API Keys**.
3. Copia la tua **Publishable Key**.
4. Accedi a [B1 Admin](https://admin.b1.church/).
5. Clicca **Church** nella navigazione superiore, poi clicca **Edit Church Settings**.
6. Clicca l'icona di modifica accanto a **Church Settings**.
7. Scorri verso il basso fino alla sezione **Giving**.
8. Imposta il **Provider** su **Stripe**.
9. Incolla la tua Publishable Key nel campo **Public Key**.
10. Torna su Stripe e rivela la tua **Secret Key** (puoi visualizzarla solo una volta, quindi salva una copia di backup).
11. Incolla la Secret Key nel campo **Secret Key** e clicca **Save**.

:::warning
La tua Stripe Secret Key viene mostrata solo una volta. Copiala in un luogo sicuro prima di navigare altrove dalla dashboard di Stripe. Se la perdi, dovrai generare una nuova chiave.
:::

## Aggiungere una pagina di donazione al tuo sito B1.church

1. Vai su [b1.church](https://b1.church/) e accedi.
2. Clicca l'icona **Settings**.
3. Clicca **Add Tab**.
4. Scegli **Donation** come tipo.
5. Inserisci un nome per la scheda (ad es., "Dona") e clicca **Save**.
6. Facoltativamente, cambia l'icona della scheda -- digita "Giv" nella ricerca icone per un'icona relativa alle donazioni.

La tua pagina di donazione è ora attiva. I membri possono visitarla all'indirizzo `yoursubdomain.b1.church/donate`.

## Condividere il link per le donazioni

Per trovare il tuo URL per le donazioni, vai su **B1 Admin** e clicca l'icona **Settings** per vedere il tuo sottodominio. Il tuo link per le donazioni segue il formato:

`https://yoursubdomain.b1.church/donate`

Condividi questo link sul tuo sito web, nelle email o nel tuo bollettino in modo che i membri sappiano dove donare online.

## Notifiche di donazione

Stripe invia una notifica email ogni volta che viene ricevuta una donazione. Per cambiare l'indirizzo email di notifica, vai alla dashboard di Stripe, clicca sul tuo profilo in alto a destra, scegli **Profile** e aggiorna il tuo indirizzo email.

## Opzioni per le commissioni di elaborazione

Puoi configurare la tua pagina di donazione per consentire ai donatori di coprire facoltativamente le commissioni di elaborazione in modo che la tua chiesa riceva l'intero importo della donazione. Questa impostazione è gestita nelle impostazioni della tua chiesa all'interno di B1 Admin.

:::tip
Dopo la configurazione, fai una piccola donazione di prova per confermare che tutto funzioni prima di annunciare le donazioni online alla tua congregazione.
:::

## Prossimi passi

- Usa [Importazione Stripe](stripe-import.md) per importare le transazioni online in B1 Admin se non si sincronizzano automaticamente
- Controlla i tuoi [Report donazioni](donation-reports.md) per verificare che le donazioni online appaiano correttamente
- Genera [Dichiarazioni di donazione](giving-statements.md) che includano sia le donazioni online che offline

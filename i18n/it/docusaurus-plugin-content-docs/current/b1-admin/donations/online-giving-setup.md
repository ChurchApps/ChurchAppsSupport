---
title: "Configurazione delle donazioni online"
---

# Configurazione delle donazioni online

<div class="article-intro">

B1 Admin si integra con **Stripe** e **PayPal** in modo che i tuoi membri possano donare online attraverso il tuo sito B1.church. Una volta configurato, le donazioni online appariranno automaticamente nei tuoi registri di donazioni insieme ai doni inseriti manualmente, mantenendo tutto in un unico sistema.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi [fondi di donazione](funds.md) in modo che i donatori possano designare i loro doni
- Crea un account Stripe su [stripe.com](https://stripe.com) e attivalo (esci dalla modalità test)
- Tieni a portata di mano le tue credenziali di accesso a B1 Admin

</div>

## Configurazione di Stripe

1. Crea un account su [stripe.com](https://stripe.com) se non ne hai già uno. Assicurati di **attivare il tuo account** e di uscire dalla modalità test.
2. In Stripe, vai a **Developers > API Keys**.
3. Copia la tua **Publishable Key**.
4. Accedi a [B1 Admin](https://admin.b1.church/).
5. Fai clic su **Church** nella navigazione superiore, quindi fai clic su **Edit Church Settings**.
6. Fai clic sull'icona di modifica accanto a **Church Settings**.
7. Scorri verso il basso fino alla sezione **Giving**.
8. Imposta **Provider** su **Stripe**.
9. Incolla la tua Publishable Key nel campo **Public Key**.
10. Torna a Stripe e rivela la tua **Secret Key** (puoi visualizzarla solo una volta, quindi salva una copia di backup).
11. Incolla la Secret Key nel campo **Secret Key** e fai clic su **Save**.

:::warning
La tua Stripe Secret Key viene visualizzata solo una volta. Copiarla in una posizione sicura prima di navigare via dal dashboard di Stripe. Se la perdi, dovrai generare una nuova chiave.
:::

## Scelta della tua valuta

Dopo aver selezionato Stripe come provider, accanto alle tue chiavi API appare un menu a discesa **Currency**. Scegli la valuta che corrisponde alla valuta di liquidazione del tuo account Stripe in modo che le donazioni vengano addebitate correttamente.

Le valute supportate includono USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN e BRL. Puoi confermare o modificare la valuta predefinita del tuo account nel tuo [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
La valuta che selezioni qui viene utilizzata per le donazioni una tantum, gli abbonamenti ricorrenti, i calcoli delle commissioni e i rapporti di donazione. Se cambi valuta in seguito, solo le nuove donazioni e gli abbonamenti utilizzeranno la nuova valuta, mentre i doni ricorrenti esistenti continueranno nella valuta in cui sono stati creati.
:::

:::warning
Assicurati che il tuo account Stripe sia configurato per accettare la valuta che scegli. Se il tuo account Stripe non supporta la valuta selezionata, le donazioni falliranno al checkout.
:::

## Aggiunta di una pagina di donazione al tuo sito B1.church

1. Vai a [b1.church](https://b1.church/) e accedi.
2. Fai clic sull'icona **Settings**.
3. Fai clic su **Add Tab**.
4. Scegli **Donation** come tipo.
5. Inserisci un nome per la scheda (ad esempio, "Give") e fai clic su **Save**.
6. Facoltativamente, cambia l'icona della scheda - digita "Giv" nella ricerca dell'icona per trovare un'icona correlata alle donazioni.

La tua pagina di donazione è ora live. I membri possono visitarla su `yoursubdomain.b1.church/donate`.

## Condivisione del tuo link di donazione

Per trovare il tuo URL di donazione, vai a **B1 Admin** e fai clic sull'icona **Settings** per visualizzare il tuo sottodominio. Il tuo link di donazione segue il formato:

`https://yoursubdomain.b1.church/donate`

Condividi questo link sul tuo sito web, negli email o nel tuo bollettino in modo che i membri sappiano dove donare online.

## Notifiche di donazione

Stripe invia una notifica email ogni volta che viene ricevuta una donazione. Per modificare l'indirizzo email di notifica, vai al dashboard di Stripe, fai clic sul tuo profilo in alto a destra, scegli **Profile** e aggiorna il tuo indirizzo email.

## Opzioni delle commissioni di elaborazione

Puoi configurare la tua pagina di donazione per permettere ai donatori di coprire facoltativamente le commissioni di elaborazione in modo che la tua chiesa riceva l'importo completo della donazione. Questa impostazione è gestita nelle impostazioni della tua chiesa all'interno di B1 Admin.

:::tip
Dopo la configurazione, effettua una piccola donazione di test per confermare che tutto funzioni correttamente prima di annunciare le donazioni online alla tua congregazione.
:::

## Passaggi successivi

- Usa [Stripe Import](stripe-import.md) per inserire le transazioni online in B1 Admin se non si sincronizzano automaticamente
- Controlla i tuoi [Donation Reports](donation-reports.md) per verificare che le donazioni online stiano apparendo correttamente
- Genera [Giving Statements](giving-statements.md) che includono sia le donazioni online che offline

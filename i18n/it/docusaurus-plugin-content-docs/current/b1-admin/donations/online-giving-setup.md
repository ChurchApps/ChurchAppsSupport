---
title: "Configurazione donazioni online"
---

# Configurazione donazioni online

<div class="article-intro">

B1 Admin si integra con **Stripe**, **PayPal**, **Kingdom Funding** e **Paystack** (per chiese in Africa) in modo che i tuoi membri possano donare online attraverso il sito B1.church. Una volta configurato, le donazioni online compaiono automaticamente nei tuoi registri di donazioni insieme alle offerte inserite manualmente, mantenendo tutto in un unico sistema.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi [fondi di donazione](funds.md) in modo che i donatori possano designare le loro offerte
- Crea un account Stripe su [stripe.com](https://stripe.com) e attivalo (esci dalla modalità di test)
- Tieni a portata di mano le tue credenziali di accesso a B1 Admin

</div>

## Configurazione di Stripe

1. Crea un account su [stripe.com](https://stripe.com) se non ne hai già uno. Assicurati di **attivare il tuo account** e uscire dalla modalità di test.
2. In Stripe, vai a **Developers > API Keys**.
3. Copia la tua **Chiave pubblicabile**.
4. Accedi a [B1 Admin](https://admin.b1.church/).
5. Vai a **Impostazioni** e apri la sezione **Donazioni**.
6. Fai clic sull'icona di modifica nella sezione **Donazioni**.
7. Imposta il **Provider** su **Stripe**.
8. Incolla la tua chiave pubblicabile nel campo **Chiave pubblica**.
9. Torna a Stripe e visualizza la tua **Chiave segreta** (puoi vederla solo una volta, quindi salva un backup).
10. Incolla la chiave segreta nel campo **Chiave segreta** e fai clic su **Salva**.

:::warning
La tua chiave segreta di Stripe viene mostrata solo una volta. Copiarla in un luogo sicuro prima di allontanarti dal dashboard di Stripe. Se la perdi, dovrai generare una nuova chiave.
:::

## Scelta della valuta

Dopo aver selezionato Stripe come provider, accanto alle tue chiavi API apparirà un menu a discesa **Valuta**. Scegli la valuta che corrisponde alla valuta di insediamento del tuo account Stripe in modo che le donazioni vengano addebitate correttamente.

Le valute supportate includono USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN e BRL. Puoi confermare o modificare la valuta predefinita del tuo account nel [Dashboard di Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La valuta che selezioni qui viene utilizzata per le donazioni una tantum, gli abbonamenti ricorrenti, i calcoli delle commissioni e i rapporti sulle donazioni. Se cambi valuta in seguito, solo le nuove donazioni e gli abbonamenti utilizzeranno la nuova valuta - le offerte ricorrenti esistenti continueranno nella valuta in cui sono state create.
:::

:::warning
Assicurati che il tuo account Stripe sia configurato per accettare la valuta che scegli. Se il tuo account Stripe non supporta la valuta selezionata, le donazioni falliranno al momento del pagamento.
:::

## Apple Pay e Google Pay

Le chiese su Stripe ottengono automaticamente i pulsanti Apple Pay e Google Pay sulla pagina pubblica di donazione. I pulsanti compaiono sopra i campi della carta per le donazioni una tantum una volta che il donatore ha scelto un fondo e un importo, e solo quando il browser o il dispositivo del donatore ha un portafoglio configurato. Le donazioni ricorrenti continuano a utilizzare i campi della carta o del conto bancario.

Google Pay non necessita di configurazione. Apple Pay richiede che il dominio della tua pagina di donazione sia registrato presso Stripe; B1 lo registra la prima volta che la pagina di donazione viene caricata sul tuo dominio. Se il pulsante Apple Pay non appare su un iPhone, controlla **Impostazioni > Domini del metodo di pagamento** nel tuo Dashboard di Stripe e conferma che il dominio `tuosubdomain.b1.church` (o personalizzato) è elencato e verificato.

## Donazioni anonime

I donatori sulla pagina pubblica di donazione possono selezionare **Dona in modo anonimo**. Una donazione anonima viene registrata senza donatore associato, va comunque al fondo scelto dal donatore e viene visualizzata come **Anonima** nei tuoi lotti e rapporti. L'indirizzo email del donatore è ancora necessario in modo che la ricevuta possa essere inviata, ma non viene creato alcun record di persona. Le donazioni anonime sono solo una tantum e non compaiono su alcun estratto conto dei doni.

## Donazioni ricorrenti non riuscite

Quando una donazione ricorrente su Stripe non riesce (ad esempio, una carta scaduta o rifiutata), l'addebito non riuscito appare sotto **Donazioni > Donazioni non riuscite** con il donatore, l'importo, la data e il motivo fornito dal gateway. Fai clic su **Riprova** per tentare nuovamente l'addebito una volta che il donatore ha aggiornato il suo metodo di pagamento.

B1 invia anche un'email al donatore quando l'addebito non riesce, e di nuovo tre e sette giorni dopo se non è ancora stato elaborato, con un collegamento per aggiornare il suo metodo di pagamento in B1.church.

:::info
Se la tua chiesa ha configurato Stripe prima che esistesse questa funzione, apri **Impostazioni** > **Donazioni**, fai clic su modifica e fai clic su **Salva** una volta. Questo aggiorna il webhook di Stripe in modo che i mancati addebiti vengano segnalati a B1.
:::

## Aggiunta di una pagina di donazione al tuo sito B1.church

1. Vai a [b1.church](https://b1.church/) e accedi.
2. Fai clic sull'icona **Impostazioni**.
3. Fai clic su **Aggiungi scheda**.
4. Scegli **Donazione** come tipo.
5. Inserisci un nome per la scheda (ad esempio, "Dona") e fai clic su **Salva**.
6. Facoltativamente, cambia l'icona della scheda - digita "Dona" nella ricerca dell'icona per trovare un'icona relativa alle donazioni.

La tua pagina di donazione è ora attiva. I membri possono visitarla su `tuosubdomain.b1.church/donate`.

## Condivisione del collegamento di donazione

Per trovare il tuo URL di donazione, vai a **B1 Admin** e fai clic sull'icona **Impostazioni** per vedere il tuo sottodominio. Il tuo collegamento di donazione segue il formato:

`https://tuosubdomain.b1.church/donate`

Condividi questo collegamento sul tuo sito web, nelle email o nel tuo bollettino in modo che i membri sappiano dove donare online.

### Collegamenti con fondo e importo preimpostati

Per portare i donatori direttamente a un fondo specifico, vai a **Donazioni > Fondi** e fai clic su **Collegamento di donazione** sul fondo. Facoltativamente inserisci un importo, quindi copia il collegamento. Quando un donatore lo apre, il fondo e l'importo sono già selezionati nella pagina di donazione. Il collegamento assume il modulo:

`https://tuosubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Gli stessi parametri funzionano nell'elemento **Collegamento di donazione** del generatore di siti web.

## Notifiche di donazione

Stripe invia una notifica email ogni volta che viene ricevuta una donazione. Per modificare l'indirizzo email di notifica, vai al dashboard di Stripe, fai clic sul tuo profilo in alto a destra, scegli **Profilo** e aggiorna il tuo indirizzo email.

## Opzioni di commissione di elaborazione

Puoi configurare la tua pagina di donazione per consentire ai donatori di coprire facoltativamente le commissioni di elaborazione in modo che la tua chiesa riceva l'importo della donazione completo. Questa impostazione è gestita nelle impostazioni della tua chiesa in B1 Admin.

:::tip
Dopo la configurazione, effettua una piccola donazione di test per confermare che tutto funziona prima di annunciare le donazioni online alla tua congregazione.
:::

## Configurazione di Kingdom Funding

Kingdom Funding è un elaboratore di pagamenti cristiano che supporta carte di credito/debito e trasferimenti bancari ACH. Se la tua chiesa è registrata con Kingdom Funding, puoi connetterla come gateway di donazione.

:::info
L'integrazione di Kingdom Funding è attualmente in beta. Contatta il tuo rappresentante di account B1 per abilitarla per la tua chiesa.
:::

1. Iscriviti o accedi su [kingdomfunding.org](https://kingdomfunding.org).
2. Ottieni la tua **Chiave di sicurezza** (pubblica) e **Chiave privata** dal portale commerciale di Kingdom Funding.
3. In B1 Admin, vai a **Impostazioni**, apri la sezione **Donazioni** e fai clic su modifica.
4. Imposta il **Provider** su **Kingdom Funding**.
5. Incolla la tua chiave di sicurezza nel campo **Chiave di sicurezza** e la tua chiave privata nel campo **Chiave privata**.
6. Imposta la **Chiave Webhook** che hai ricevuto da Kingdom Funding e copia l'URL webhook visualizzato nelle impostazioni commerciali di Kingdom Funding in modo che Kingdom Funding possa notificare a B1 le transazioni completate.
7. Salva.

Una volta connesso, i membri vedranno un interruttore carta/conto bancario nella pagina di donazione e potranno donare tramite carta di credito o trasferimento ACH.

## Pulsanti PayPal e Venmo

Le chiese che utilizzano **PayPal** come provider ottengono pulsanti **PayPal** e **Venmo** sopra i campi della carta nella pagina di donazione per le donazioni una tantum. I donatori che fanno clic su uno completano il pagamento in una finestra PayPal e la donazione viene registrata come qualsiasi altra donazione online. Venmo appare solo per i donatori negli Stati Uniti su dispositivi che PayPal considera idonei. Le donazioni ricorrenti continuano a utilizzare i campi della carta.

## Configurazione di Paystack (Africa)

Stripe non apre account per chiese in Ghana, Nigeria, Kenya, Sud Africa o Costa d'Avorio. [Paystack](https://paystack.com) lo fa, e accetta carte locali, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), trasferimento bancario e USSD - i donatori pagano nella tua valuta locale (GHS, NGN, KES, ZAR, XOF).

1. Registrati su [paystack.com](https://paystack.com) con il certificato di registrazione commerciale della tua chiesa e il conto bancario locale, e completa la revisione di attivazione (go-live) di Paystack.
2. Nel Dashboard di Paystack, apri **Impostazioni → Chiavi API e Webhook** e copia la **Chiave pubblica** e la **Chiave segreta** (utilizza le chiavi live, non le chiavi di test).
3. In B1 Admin, vai a **Impostazioni**, apri la sezione **Donazioni** e fai clic su modifica.
4. Imposta il **Provider** su **Paystack**, incolla la chiave pubblica e la chiave segreta, e scegli la tua **Valuta**.
5. Copia l'**URL del webhook** mostrato sotto il provider, torna al Dashboard di Paystack (**Impostazioni → Chiavi API e Webhook**) e incollalo nel campo **URL Webhook**. Così è come le donazioni ricorrenti e i pagamenti tramite mobile money vengono registrati.
6. Salva.

I donatori completano il loro pagamento in una finestra Paystack sicura e possono scegliere carta, mobile money o trasferimento bancario lì. Note:

- Le **donazioni ricorrenti** richiedono una carta; il denaro mobile non può essere addebitato di nuovo automaticamente, quindi Paystack consente solo donazioni mobile money una tantum.
- Le donazioni ricorrenti di Paystack possono essere annullate da B1 ma non messe in pausa o modificate - annulla e creane una nuova per modificare l'importo.
- La **Commissione di elaborazione** per impostazione predefinita riflette i tassi delle carte locali di Paystack per la tua valuta; modificali se i tuoi tassi negoziati differiscono.

## Passaggi successivi

- Utilizza [Importazione Stripe](stripe-import.md) per estrarre le transazioni online in B1 Admin se non si sincronizzano automaticamente
- Controlla i tuoi [Rapporti di donazione](donation-reports.md) per verificare che le donazioni online compaiano correttamente
- Genera [Estratti conto dei doni](giving-statements.md) che includono donazioni online e offline

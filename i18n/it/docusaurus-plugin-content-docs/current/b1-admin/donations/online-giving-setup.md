---
title: "Configurazione delle donazioni online"
description: "Collega Stripe, Kingdom Funding o Paystack a B1 Admin così i membri possono donare online dal tuo sito B1.church e le offerte si sincronizzano con i tuoi registri."
---

# Configurazione delle donazioni online

<div class="article-intro">

B1 Admin si integra con **Stripe**, **Kingdom Funding** e **Paystack** (per le chiese in Africa) così i tuoi membri possono donare online dal tuo sito B1.church. Una volta configurato, le donazioni online compaiono automaticamente nei tuoi registri insieme alle offerte inserite manualmente, mantenendo tutto in un unico sistema.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi [fondi per le donazioni](funds.md) così i donatori possono destinare le loro offerte
- Crea un account Stripe su [stripe.com](https://stripe.com) e attivalo (uscendo dalla modalità test)
- Tieni pronte le credenziali di accesso a B1 Admin

</div>

## Configurare Stripe {#setting-up-stripe}

1. Crea un account su [stripe.com](https://stripe.com) se non ne hai già uno. Assicurati di **attivare il tuo account** e di uscire dalla modalità test.
2. In Stripe, vai su **Sviluppatori > Chiavi API**.
3. Copia la tua **Chiave pubblicabile**.
4. Accedi a [B1 Admin](https://admin.b1.church/).
5. Vai su **Impostazioni** e apri la sezione **Donazioni**.
6. Fai clic su **Modifica** nella sezione **Donazioni**.
7. Imposta il **Fornitore** su **Stripe**.
8. Incolla la tua Chiave pubblicabile nel campo **Chiave pubblica**.
9. Torna su Stripe e mostra la tua **Chiave segreta** (puoi vederla una sola volta, quindi salvane una copia di sicurezza).
10. Incolla la Chiave segreta nel campo **Chiave segreta** e fai clic su **Salva**.

:::warning
La tua Chiave segreta Stripe viene mostrata una sola volta. Copiala in un luogo sicuro prima di uscire dalla dashboard Stripe. Se la perdi, dovrai generarne una nuova.
:::

## Scegliere la valuta {#choosing-your-currency}

Dopo aver selezionato Stripe come fornitore, accanto alle chiavi API compare un menu a tendina **Valuta**. Scegli la valuta che corrisponde alla valuta di regolamento del tuo account Stripe, così le donazioni vengono addebitate correttamente.

Se non hai ancora salvato una valuta, il menu parte dalla valuta del paese della tua chiesa indicato in fase di registrazione invece che dai dollari USA. Verifica che corrisponda al tuo account Stripe prima di salvare.

Se la tua chiesa non accetta offerte online, lascia il **Fornitore** su **Nessuno** e scegli comunque una **Valuta** -- l'elenco include allora tutte le valute, con la nota "La valuta in cui la tua chiesa registra le offerte." Le offerte che inserisci a mano nei lotti vengono registrate in quella valuta, e i totali delle donazioni vengono mostrati in quella valuta.

Le valute supportate includono USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL e PHP. Puoi confermare o cambiare la valuta predefinita del tuo account nella tua [Dashboard Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La valuta selezionata qui viene usata per le donazioni una tantum, per gli abbonamenti ricorrenti, per il calcolo delle commissioni e per i report sulle donazioni. Se in seguito cambi valuta, solo le nuove donazioni e i nuovi abbonamenti useranno la nuova valuta -- le donazioni ricorrenti esistenti continuano nella valuta con cui sono state create.
:::

:::warning
Assicurati che il tuo account Stripe sia configurato per accettare la valuta che scegli. Se il tuo account Stripe non supporta la valuta selezionata, le donazioni falliranno al checkout.
:::

## Apple Pay e Google Pay {#apple-pay-and-google-pay}

Le chiese che usano Stripe ricevono automaticamente i pulsanti Apple Pay e Google Pay nella pagina pubblica delle donazioni. I pulsanti compaiono sopra i campi della carta per le offerte una tantum, una volta che il donatore ha scelto un fondo e un importo, e solo quando il browser o il dispositivo del donatore ha un wallet configurato. Le donazioni ricorrenti usano ancora i campi della carta o del conto bancario.

Google Pay non richiede alcuna configurazione. Apple Pay richiede che il dominio della tua pagina delle donazioni sia registrato in Stripe; B1 lo registra la prima volta che la pagina delle donazioni viene caricata sul tuo dominio. Se il pulsante Apple Pay non compare su un iPhone, controlla **Impostazioni > Domini per i metodi di pagamento** nella tua Dashboard Stripe e verifica che il tuo dominio `yoursubdomain.b1.church` (o personalizzato) sia elencato e verificato.

## Donazioni anonime {#anonymous-gifts}

I donatori sulla pagina pubblica delle donazioni possono selezionare **Dona in forma anonima**. Un'offerta anonima viene registrata senza alcun donatore associato, va comunque al fondo scelto dal donatore e compare come **Anonimo** nei tuoi lotti e nei report. L'email del donatore resta obbligatoria così la ricevuta può essere inviata, ma non viene creata alcuna scheda persona. Le offerte anonime sono solo una tantum e non compaiono in nessuna ricevuta di donazione.

## Donazioni ricorrenti non riuscite {#failed-recurring-gifts}

Quando una donazione ricorrente su Stripe non va a buon fine (ad esempio per una carta scaduta o rifiutata), l'addebito fallito compare in **Donazioni > Donazioni fallite** con il donatore, l'importo, la data e il motivo fornito dal gateway. Fai clic su **Riprova** per tentare di nuovo l'addebito una volta che il donatore ha aggiornato il proprio metodo di pagamento.

B1 invia anche al donatore un'email quando l'addebito fallisce, e di nuovo tre e sette giorni dopo se il pagamento non è ancora andato a buon fine, con un link per aggiornare il metodo di pagamento in B1.church.

:::info
Se la tua chiesa ha configurato Stripe prima che esistesse questa funzione, apri **Impostazioni** > **Donazioni**, fai clic su modifica e fai clic una volta su **Salva**. Questo aggiorna il webhook di Stripe così gli addebiti falliti vengono segnalati a B1.
:::

## Aggiungere una pagina delle donazioni al tuo sito B1.church {#adding-a-donation-page-to-your-b1church-site}

1. Vai su [b1.church](https://b1.church/) e accedi.
2. Fai clic sull'icona **Impostazioni**.
3. Fai clic su **Aggiungi scheda**.
4. Scegli **Donazione** come tipo.
5. Inserisci un nome per la scheda (ad esempio "Dona") e fai clic su **Salva**.
6. Facoltativamente, cambia l'icona della scheda -- digita "Don" nella ricerca icone per trovare un'icona legata alle donazioni.

La tua pagina delle donazioni è ora attiva. I membri possono visitarla all'indirizzo `yoursubdomain.b1.church/donate`.

## Condividere il tuo link per le donazioni {#sharing-your-giving-link}

Per trovare l'URL delle donazioni, vai su **B1 Admin** e fai clic sull'icona **Impostazioni** per vedere il tuo sottodominio. Il link per le donazioni segue questo formato:

`https://yoursubdomain.b1.church/donate`

Condividi questo link sul tuo sito web, nelle email o nel bollettino così i membri sanno dove donare online.

### Link con fondo e importo preimpostati {#links-with-a-preset-fund-and-amount}

Per indirizzare direttamente i donatori a un fondo specifico, vai su **Donazioni > Fondi** e fai clic su **Link per donare** accanto al fondo. Facoltativamente inserisci un importo, poi copia il link. La finestra mostra anche un codice QR per lo stesso link; fai clic su **Scarica PNG** per salvarlo per un bollettino, una diapositiva o un poster. Quando un donatore apre il link o scansiona il codice, il fondo e l'importo sono già selezionati nella pagina delle donazioni. Il link ha questa forma:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Gli stessi parametri funzionano nell'elemento **Link per donare** del costruttore di siti web.

## Notifiche di donazione {#donation-notifications}

Stripe invia un'email di notifica ogni volta che arriva una donazione. Per cambiare l'indirizzo email delle notifiche, vai nella dashboard Stripe, fai clic sul tuo profilo in alto a destra, scegli **Profilo** e aggiorna il tuo indirizzo email.

## Opzioni per le commissioni di elaborazione {#processing-fee-options}

Puoi permettere ai donatori di coprire facoltativamente le commissioni di elaborazione, così la tua chiesa riceve l'intero importo della donazione. In **Impostazioni > Donazioni**, fai clic su modifica e attiva l'interruttore **Commissione di transazione** accanto alle tue chiavi. Le tariffe usate per calcolare la commissione si trovano in **Commissioni e ricevute**: **Tariffa fissa** e **Commissione di transazione** per le carte e, per le donazioni via bonifico bancario (ACH) di Stripe, una percentuale e un **Limite massimo**. Partono dalle tariffe standard del tuo fornitore; cambiale se le tue tariffe negoziate sono diverse, poi fai clic su **Salva**.

:::tip
Dopo la configurazione, fai una piccola donazione di prova per verificare che tutto funzioni prima di annunciare le donazioni online alla tua comunità.
:::

## Configurare Kingdom Funding {#setting-up-kingdom-funding}

Kingdom Funding è un processore di pagamenti cristiano che supporta carte di credito/debito e bonifici bancari ACH. Se la tua chiesa è iscritta a Kingdom Funding, puoi collegarla come gateway delle donazioni.

:::info
L'integrazione con Kingdom Funding è attualmente in beta. Contatta il tuo referente account B1 per attivarla per la tua chiesa.
:::

1. Registrati o accedi su [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Ottieni la tua **Chiave di tokenizzazione** e la **Chiave sorgente** dalla dashboard di Kingdom Funding.
3. In B1 Admin, vai su **Impostazioni**, apri la sezione **Donazioni** e fai clic su modifica.
4. Imposta il **Fornitore** su **Kingdom Funding**.
5. Incolla le chiavi nei campi **Chiave di tokenizzazione** e **Chiave sorgente**.
6. Inserisci la **Chiave del webhook** (il segreto di firma del webhook dal pannello di controllo di Kingdom Funding), e copia l'URL del webhook mostrato sotto il fornitore nelle impostazioni di Kingdom Funding così Kingdom Funding può avvisare B1 delle transazioni completate.
7. Fai clic su **Salva**.

Una volta collegato, i membri vedranno un interruttore carta/conto nella pagina delle donazioni e potranno donare con carta di credito o bonifico ACH.

## Pulsanti PayPal e Venmo {#paypal-and-venmo-buttons}

PayPal non è più offerto nell'elenco **Fornitore** per le nuove configurazioni. Le chiese già collegate a **PayPal** ricevono i pulsanti **PayPal** e **Venmo** sopra i campi della carta nella pagina delle donazioni per le offerte una tantum. I donatori che cliccano su uno di questi completano il pagamento in una finestra di PayPal, e l'offerta viene registrata come ogni altra donazione online. Venmo compare solo per i donatori negli Stati Uniti su dispositivi che PayPal considera idonei. Le donazioni ricorrenti continuano a usare i campi della carta.

## Configurare Paystack (Africa) {#setting-up-paystack-africa}

Stripe non apre account per le chiese in Ghana, Nigeria, Kenya, Sudafrica o Costa d'Avorio. [Paystack](https://paystack.com) sì, e accetta carte locali, **denaro mobile** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bonifici bancari e USSD -- i donatori pagano nella tua valuta locale (GHS, NGN, KES, ZAR, XOF).

1. Registrati su [paystack.com](https://paystack.com) con il certificato di registrazione dell'attività della tua chiesa e un conto bancario locale, e completa la verifica di attivazione (go-live) di Paystack.
2. Nella Dashboard Paystack apri **Impostazioni → Chiavi API e webhook** e copia la **Chiave pubblica** e la **Chiave segreta** (usa le chiavi live, non quelle di test).
3. In B1 Admin, vai su **Impostazioni**, apri la sezione **Donazioni** e fai clic su modifica.
4. Imposta il **Fornitore** su **Paystack**, incolla la Chiave pubblica e la Chiave segreta e scegli la tua **Valuta**.
5. Copia l'**URL del webhook** mostrato sotto il fornitore, torna nella Dashboard Paystack (**Impostazioni → Chiavi API e webhook**) e incollalo nel campo **URL del webhook**. È così che vengono registrate le donazioni ricorrenti e i pagamenti con denaro mobile.
6. Salva.

I donatori completano il pagamento in una finestra Paystack sicura e possono scegliere lì carta, denaro mobile o bonifico bancario. Note:

- **Le donazioni ricorrenti** richiedono una carta; il denaro mobile non può essere addebitato di nuovo automaticamente, quindi Paystack consente solo donazioni una tantum con denaro mobile.
- Le donazioni ricorrenti Paystack possono essere annullate da B1 ma non sospese o modificate -- per cambiare l'importo, annulla e creane una nuova.
- Le tariffe della **Commissione di elaborazione** riflettono le tariffe Paystack per le carte locali nella tua valuta; modificale se le tue tariffe negoziate sono diverse.

## Prossimi passi {#next-steps}

- Usa [Importazione Stripe](stripe-import.md) per importare in B1 Admin le transazioni online se non si sincronizzano automaticamente
- Controlla i tuoi [Report sulle donazioni](donation-reports.md) per verificare che le donazioni online compaiano correttamente
- Genera le [Ricevute di donazione](giving-statements.md) che includono sia le donazioni online sia quelle offline

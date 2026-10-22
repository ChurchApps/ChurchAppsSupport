---
title: "Configurazione donazioni online"
---

# Configurazione donazioni online {#online-giving-setup}

<div class="article-intro">

B1 Admin si integra con **Stripe**, **PayPal**, **Kingdom Funding** e **Paystack** (per le chiese in Africa), così i tuoi membri possono donare online attraverso il tuo sito B1.church. Una volta configurato, le donazioni online compaiono automaticamente nei registri delle donazioni insieme a quelle inserite manualmente, mantenendo tutto in un unico sistema.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi [fondi per le donazioni](funds.md) così i donatori possono destinare le loro offerte
- Crea un account Stripe su [stripe.com](https://stripe.com) e attivalo (disattiva la modalità test)
- Tieni a portata di mano le credenziali di accesso a B1 Admin

</div>

## Configurare Stripe {#setting-up-stripe}

1. Crea un account su [stripe.com](https://stripe.com) se non ne hai già uno. Assicurati di **attivare il tuo account** e di disattivare la modalità test.
2. In Stripe, vai su **Sviluppatori > Chiavi API**.
3. Copia la tua **Chiave pubblicabile**.
4. Accedi a [B1 Admin](https://admin.b1.church/).
5. Vai su **Impostazioni** e apri la sezione **Donazioni**.
6. Fai clic su **Modifica** nella sezione **Donazioni**.
7. Imposta il **Fornitore** su **Stripe**.
8. Incolla la tua Chiave pubblicabile nel campo **Chiave pubblica**.
9. Torna a Stripe e mostra la tua **Chiave segreta** (puoi visualizzarla una sola volta, quindi salvane una copia di sicurezza).
10. Incolla la Chiave segreta nel campo **Chiave segreta** e fai clic su **Salva**.

:::warning
La tua chiave segreta di Stripe viene mostrata una sola volta. Copiala in un luogo sicuro prima di lasciare la dashboard di Stripe. Se la perdi, dovrai generarne una nuova.
:::

## Scegliere la valuta {#choosing-your-currency}

Dopo aver selezionato Stripe come fornitore, accanto alle chiavi API compare un menu a tendina **Valuta**. Scegli la valuta che corrisponde alla valuta di regolamento del tuo account Stripe, così le donazioni vengono addebitate correttamente.

Le valute supportate includono USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN e BRL. Puoi confermare o modificare la valuta predefinita del tuo account nella tua [Dashboard di Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La valuta che selezioni qui viene usata per le donazioni una tantum, gli abbonamenti ricorrenti, il calcolo delle commissioni e i rapporti sulle donazioni. Se cambi valuta in seguito, solo le nuove donazioni e i nuovi abbonamenti useranno la nuova valuta -- le donazioni ricorrenti esistenti continuano nella valuta con cui sono state create.
:::

:::warning
Assicurati che il tuo account Stripe sia configurato per accettare la valuta che scegli. Se il tuo account Stripe non supporta la valuta selezionata, le donazioni falliranno al momento del pagamento.
:::

## Apple Pay e Google Pay {#apple-pay-and-google-pay}

Le chiese che usano Stripe ricevono automaticamente i pulsanti Apple Pay e Google Pay nella pagina pubblica delle donazioni. I pulsanti compaiono sopra i campi della carta per le donazioni una tantum, una volta che il donatore ha scelto un fondo e un importo, e solo se il browser o il dispositivo del donatore ha un portafoglio digitale configurato. Le donazioni ricorrenti usano ancora i campi per carta o conto bancario.

Google Pay non richiede configurazione. Apple Pay richiede che il dominio della pagina delle donazioni sia registrato presso Stripe; B1 lo registra la prima volta che la pagina delle donazioni viene caricata sul tuo dominio. Se il pulsante Apple Pay non compare su un iPhone, controlla **Impostazioni > Domini per i metodi di pagamento** nella tua Dashboard di Stripe e verifica che il tuo `tuosottodominio.b1.church` (o il dominio personalizzato) sia elencato e verificato.

## Donazioni anonime {#anonymous-gifts}

I donatori nella pagina pubblica delle donazioni possono selezionare **Dona in forma anonima**. Una donazione anonima viene registrata senza donatore associato, va comunque al fondo scelto dal donatore e compare come **Anonima** nei tuoi lotti e nei rapporti. L'email del donatore resta obbligatoria così che la ricevuta possa essere inviata, ma non viene creata nessuna scheda persona. Le donazioni anonime sono solo una tantum e non compaiono in nessun estratto conto delle donazioni.

## Donazioni ricorrenti non riuscite {#failed-recurring-gifts}

Quando una donazione ricorrente su Stripe non va a buon fine (ad esempio, per una carta scaduta o rifiutata), l'addebito fallito compare in **Donazioni > Donazioni non riuscite** con il donatore, l'importo, la data e il motivo indicato dal gateway. Fai clic su **Riprova** per tentare di nuovo l'addebito una volta che il donatore ha aggiornato il metodo di pagamento.

B1 invia anche un'email al donatore quando l'addebito fallisce, e poi di nuovo tre e sette giorni dopo se non è ancora andato a buon fine, con un link per aggiornare il metodo di pagamento su B1.church.

:::info
Se la tua chiesa ha configurato Stripe prima che esistesse questa funzione, apri **Impostazioni** > **Donazioni**, fai clic su modifica e poi su **Salva** una volta. Questo aggiorna il webhook di Stripe così che gli addebiti falliti vengano segnalati a B1.
:::

## Aggiungere una pagina donazioni al tuo sito B1.church {#adding-a-donation-page-to-your-b1church-site}

1. Vai su [b1.church](https://b1.church/) ed effettua l'accesso.
2. Fai clic sull'icona **Impostazioni**.
3. Fai clic su **Aggiungi scheda**.
4. Scegli **Donazione** come tipo.
5. Inserisci un nome per la scheda (ad esempio, "Dona") e fai clic su **Salva**.
6. Facoltativamente, cambia l'icona della scheda -- digita "Don" nella ricerca icone per un'icona legata alle donazioni.

La tua pagina donazioni ora è attiva. I membri possono visitarla all'indirizzo `tuosottodominio.b1.church/donate`.

## Condividere il tuo link per le donazioni {#sharing-your-giving-link}

Per trovare il tuo URL per le donazioni, vai su **B1 Admin** e fai clic sull'icona **Impostazioni** per vedere il tuo sottodominio. Il link per le donazioni ha questo formato:

`https://tuosottodominio.b1.church/donate`

Condividi questo link sul tuo sito web, nelle email o nel bollettino così i membri sanno dove donare online.

### Link con fondo e importo preimpostati {#links-with-a-preset-fund-and-amount}

Per indirizzare i donatori direttamente a un fondo specifico, vai su **Donazioni > Fondi** e fai clic su **Link per le donazioni** accanto al fondo. Facoltativamente inserisci un importo, poi copia il link. Quando il donatore lo apre, il fondo e l'importo sono già selezionati nella pagina delle donazioni. Il link ha questa forma:

`https://tuosottodominio.b1.church/donate?fundId=ID_FONDO&amount=25`

Gli stessi parametri funzionano nell'elemento **Link per le donazioni** del costruttore del sito web.

## Notifiche di donazione {#donation-notifications}

Stripe invia una notifica via email ogni volta che arriva una donazione. Per cambiare l'indirizzo email delle notifiche, vai alla dashboard di Stripe, fai clic sul tuo profilo in alto a destra, scegli **Profilo** e aggiorna il tuo indirizzo email.

## Opzioni per le commissioni di elaborazione {#processing-fee-options}

Puoi configurare la tua pagina delle donazioni in modo che i donatori possano scegliere facoltativamente di coprire le commissioni di elaborazione, così la tua chiesa riceve l'intero importo della donazione. Questa impostazione si gestisce nelle impostazioni della chiesa all'interno di B1 Admin.

:::tip
Dopo la configurazione, fai una piccola donazione di prova per verificare che tutto funzioni prima di annunciare le donazioni online alla tua comunità.
:::

## Configurare Kingdom Funding {#setting-up-kingdom-funding}

Kingdom Funding è un processore di pagamenti cristiano che supporta carte di credito/debito e bonifici bancari ACH. Se la tua chiesa è iscritta a Kingdom Funding, puoi collegarlo come gateway per le donazioni.

:::info
L'integrazione con Kingdom Funding è attualmente in beta. Contatta il tuo referente B1 per attivarla per la tua chiesa.
:::

1. Registrati o accedi su [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Recupera la tua **Chiave di sicurezza** (pubblica) e la **Chiave privata** dal portale dei commercianti di Kingdom Funding.
3. In B1 Admin, vai su **Impostazioni**, apri la sezione **Donazioni** e fai clic su modifica.
4. Imposta il **Fornitore** su **Kingdom Funding**.
5. Incolla la tua Chiave di sicurezza nel campo **Chiave di sicurezza** e la tua Chiave privata nel campo **Chiave privata**.
6. Imposta la **Chiave del webhook** che hai ricevuto da Kingdom Funding, e copia l'URL del webhook visualizzato nelle impostazioni del tuo account commerciante di Kingdom Funding, così Kingdom Funding può avvisare B1 delle transazioni completate.
7. Salva.

Una volta collegato, i membri vedranno nella pagina delle donazioni un interruttore carta/conto bancario e potranno donare con carta di credito o bonifico ACH.

## Pulsanti PayPal e Venmo {#paypal-and-venmo-buttons}

Le chiese che usano **PayPal** come fornitore ricevono i pulsanti **PayPal** e **Venmo** sopra i campi della carta nella pagina delle donazioni per le donazioni una tantum. I donatori che fanno clic su uno di essi completano il pagamento in una finestra di PayPal, e la donazione viene registrata come qualsiasi altra donazione online. Venmo compare solo per i donatori negli Stati Uniti su dispositivi che PayPal considera idonei. Le donazioni ricorrenti usano ancora i campi della carta.

## Configurare Paystack (Africa) {#setting-up-paystack-africa}

Stripe non apre account per le chiese in Ghana, Nigeria, Kenya, Sudafrica o Costa d'Avorio. [Paystack](https://paystack.com) invece sì, e accetta carte locali, **denaro mobile** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bonifici bancari e USSD -- i donatori pagano nella tua valuta locale (GHS, NGN, KES, ZAR, XOF).

1. Registrati su [paystack.com](https://paystack.com) con il certificato di registrazione della tua attività e un conto bancario locale, e completa la revisione di attivazione (go-live) di Paystack.
2. Nella Dashboard di Paystack, apri **Impostazioni → Chiavi API e webhook** e copia la **Chiave pubblica** e la **Chiave segreta** (usa le chiavi live, non quelle di test).
3. In B1 Admin, vai su **Impostazioni**, apri la sezione **Donazioni** e fai clic su modifica.
4. Imposta il **Fornitore** su **Paystack**, incolla la Chiave pubblica e la Chiave segreta e scegli la tua **Valuta**.
5. Copia l'**URL del webhook** mostrato sotto il fornitore, torna alla Dashboard di Paystack (**Impostazioni → Chiavi API e webhook**) e incollalo nel campo **URL del webhook**. È così che vengono registrate le donazioni ricorrenti e i pagamenti con denaro mobile.
6. Salva.

I donatori completano il pagamento in una finestra sicura di Paystack e possono scegliere lì carta, denaro mobile o bonifico bancario. Note:

- **Le donazioni ricorrenti** richiedono una carta; il denaro mobile non può essere addebitato di nuovo automaticamente, quindi Paystack consente solo donazioni con denaro mobile una tantum.
- Le donazioni ricorrenti Paystack possono essere annullate da B1 ma non sospese o modificate -- per cambiare l'importo, annulla e creane una nuova.
- Le **Commissioni di elaborazione** predefinite riflettono le tariffe Paystack per le carte locali nella tua valuta; modificale se le tariffe concordate sono diverse.

## Passaggi successivi {#next-steps}

- Usa [Importazione Stripe](stripe-import.md) per portare in B1 Admin le transazioni online se non si sincronizzano automaticamente
- Controlla i tuoi [Rapporti sulle donazioni](donation-reports.md) per verificare che le donazioni online compaiano correttamente
- Genera [Estratti conto delle donazioni](giving-statements.md) che includano sia le donazioni online sia quelle offline

---
title: "Configurazione della Donazione Online"
---

# Configurazione della Donazione Online

<div class="article-intro">

B1 Admin si integra con **Stripe**, **PayPal** e **Kingdom Funding** in modo che i tuoi membri possano donare online attraverso il tuo sito B1.church. Una volta configurata, le donazioni online vengono visualizzate automaticamente nei tuoi registri di donazione insieme ai doni inseriti manualmente, mantenendo tutto in un unico sistema.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura i tuoi [fondi di donazione](funds.md) in modo che i donatori possano designare i loro regali
- Crea un account Stripe su [stripe.com](https://stripe.com) e attivalo (esci dalla modalità di test)
- Tieni pronti i tuoi dati di accesso a B1 Admin

</div>

## Configurazione di Stripe

1. Crea un account su [stripe.com](https://stripe.com) se non ne hai già uno. Assicurati di **attivare il tuo account** e di escire dalla modalità di test.
2. Su Stripe, vai a **Developers > API Keys** (Sviluppatori > Chiavi API).
3. Copia la tua **Chiave Pubblicabile**.
4. Accedi a [B1 Admin](https://admin.b1.church/).
5. Fai clic su **Church** nella navigazione in alto, quindi fai clic su **Edit Church Settings** (Modifica Impostazioni Chiesa).
6. Fai clic sull'icona di modifica accanto a **Church Settings** (Impostazioni Chiesa).
7. Scorri verso il basso fino alla sezione **Giving** (Donazioni).
8. Imposta il **Provider** su **Stripe**.
9. Incolla la tua Chiave Pubblicabile nel campo **Public Key** (Chiave Pubblica).
10. Torna a Stripe e visualizza la tua **Secret Key** (Chiave Segreta) (puoi visualizzarla solo una volta, quindi salva un backup).
11. Incolla la Chiave Segreta nel campo **Secret Key** (Chiave Segreta) e fai clic su **Save** (Salva).

:::warning
La tua Chiave Segreta di Stripe viene mostrata solo una volta. Copiarla in un luogo sicuro prima di navigare lontano dal dashboard di Stripe. Se la perdi, dovrai generare una nuova chiave.
:::

## Scelta della Valuta

Dopo aver selezionato Stripe come provider, viene visualizzato un menu a discesa **Currency** (Valuta) accanto alle tue chiavi API. Scegli la valuta che corrisponde alla valuta di regolamento del tuo account Stripe in modo che le donazioni vengano addebitate correttamente.

Le valute supportate includono USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN e BRL. Puoi confermare o modificare la valuta predefinita del tuo account nel tuo [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
La valuta che selezioni qui viene utilizzata per donazioni una tantum, abbonamenti ricorrenti, calcoli delle commissioni e rapporti di donazione. Se modifichi la valuta in seguito, solo le nuove donazioni e gli abbonamenti utilizzeranno la nuova valuta. I regali ricorrenti esistenti continueranno nella valuta in cui sono stati creati.
:::

:::warning
Assicurati che il tuo account Stripe sia configurato per accettare la valuta che scegli. Se il tuo account Stripe non supporta la valuta selezionata, le donazioni non riusciranno al momento del pagamento.
:::

## Aggiungere una Pagina di Donazione al Tuo Sito B1.church

1. Vai su [b1.church](https://b1.church/) e accedi.
2. Fai clic sull'icona **Settings** (Impostazioni).
3. Fai clic su **Add Tab** (Aggiungi Scheda).
4. Scegli **Donation** (Donazione) come tipo.
5. Immetti un nome per la scheda (ad es., "Give" Regala) e fai clic su **Save** (Salva).
6. Facoltativamente, modifica l'icona della scheda. Digita "Giv" nella ricerca dell'icona per trovare un'icona relativa alle donazioni.

La tua pagina di donazione è ora attiva. I membri possono visitarla su `yoursubdomain.b1.church/donate`.

## Condivisione del Tuo Link di Donazione

Per trovare l'URL di donazione, vai a **B1 Admin** e fai clic sull'icona **Settings** (Impostazioni) per vedere il tuo sottodominio. Il tuo link di donazione segue questo formato:

`https://yoursubdomain.b1.church/donate`

Condividi questo link sul tuo sito web, nelle e-mail o nel tuo bollettino in modo che i membri sappiano dove donare online.

## Notifiche di Donazione

Stripe invia una notifica e-mail ogni volta che viene ricevuta una donazione. Per modificare l'indirizzo e-mail di notifica, vai al dashboard di Stripe, fai clic sul tuo profilo in alto a destra, scegli **Profile** (Profilo) e aggiorna il tuo indirizzo e-mail.

## Opzioni di Commissione di Elaborazione

Puoi configurare la tua pagina di donazione per consentire ai donatori di coprire facoltativamente le commissioni di elaborazione in modo che la tua chiesa riceva l'importo della donazione completa. Questa impostazione viene gestita nelle impostazioni della tua chiesa all'interno di B1 Admin.

:::tip
Dopo la configurazione, effettua una piccola donazione di test per confermare che tutto funziona prima di annunciare le donazioni online alla tua congregazione.
:::

## Configurazione di Kingdom Funding

Kingdom Funding è un processore di pagamenti cristiano che supporta carte di credito/debito e trasferimenti bancari ACH. Se la tua chiesa è registrata presso Kingdom Funding, puoi collegarlo come tuo gateway di donazione.

:::info
L'integrazione di Kingdom Funding è attualmente in versione beta. Contatta il tuo rappresentante dell'account B1 per abilitarlo per la tua chiesa.
:::

1. Iscriviti o accedi su [kingdomfunding.org](https://kingdomfunding.org).
2. Ottieni la tua **Security Key** (Chiave di Sicurezza) (pubblica) e la **Private Key** (Chiave Privata) dal portale commerciante di Kingdom Funding.
3. In B1 Admin, vai a **Settings** (Impostazioni) e apri **Church Settings** (Impostazioni Chiesa).
4. Nella sezione **Giving** (Donazioni), imposta il **Provider** su **Kingdom Funding**.
5. Incolla la tua Chiave di Sicurezza nel campo **Security Key** (Chiave di Sicurezza) e la tua Chiave Privata nel campo **Private Key** (Chiave Privata).
6. Imposta la **Webhook Key** (Chiave Webhook) che hai ricevuto da Kingdom Funding e copia l'URL webhook visualizzato nelle impostazioni commerciante di Kingdom Funding in modo che Kingdom Funding possa notificare a B1 le transazioni completate.
7. Salva.

Una volta collegato, i membri vedranno un selettore carta/banca sulla pagina di donazione e potranno donare tramite carta di credito o trasferimento ACH.

## Passaggi Successivi

- Usa [Stripe Import](stripe-import.md) per estrarre le transazioni online in B1 Admin se non vengono sincronizzate automaticamente
- Controlla i tuoi [Donation Reports](donation-reports.md) per verificare che le donazioni online vengano visualizzate correttamente
- Genera [Giving Statements](giving-statements.md) che includono sia le donazioni online che offline

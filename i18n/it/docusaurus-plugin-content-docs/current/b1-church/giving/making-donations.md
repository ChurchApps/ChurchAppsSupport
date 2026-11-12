---
title: "Fare donazioni nel portale membri di B1.church"
sidebar_label: "Fare una donazione"
description: "Fai un'offerta una tantum o ricorrente alla tua chiesa tramite B1.church, con o senza account, e consulta in seguito la cronologia delle tue donazioni."
---

# Fare una donazione

<div class="article-intro">

Esistono due modi per fare una donazione tramite il sito B1.church della tua chiesa: la pagina pubblica delle donazioni (non richiede l'accesso) e la pagina delle donazioni per i membri (richiede l'accesso). Entrambe usano un modulo sicuro fornito dal fornitore di pagamenti della tua chiesa (la maggior parte delle chiese usa Stripe).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Per le donazioni pubbliche non serve un account -- basta visitare la pagina **Dona** della tua chiesa.
- Per le donazioni da membro con cronologia e metodi di pagamento salvati, [accedi](../getting-started/logging-in.md) prima al tuo account.

</div>

## Pagina pubblica delle donazioni (senza accesso) {#public-donation-page-no-login-required}

Chiunque può fare una donazione senza creare un account:

1. Vai alla pagina **Dona** della tua chiesa.
2. Il modulo di donazione è mostrato sul lato sinistro della pagina. Scegli **Fai una donazione** per un'offerta una tantum, oppure **Fai una donazione ricorrente** per donare secondo una pianificazione (scegli la frequenza e la data di inizio).
3. Inserisci **Nome**, **Cognome** ed **Email**, poi i dati della carta.
4. In **Fondi**, inserisci un **Importo** e scegli il **Fondo**. Clicca su **Aggiungi altro** per dividere la donazione su più fondi.
5. Facoltativamente, aggiungi una **Nota**. Se la chiesa lo consente, puoi spuntare la casella per coprire le commissioni della transazione.
6. Clicca su **Dona** per completare la donazione.

Per donare senza che il tuo nome compaia sulla donazione, spunta **Dona in forma anonima (solo donazioni una tantum)**. I campi del nome e l'opzione ricorrente scompaiono.

Sul lato destro della pagina, sotto **Gestisci donazioni**, trovi un link a **Istruzioni per il pagamento ACH** se preferisci donare tramite bonifico bancario. C'è anche un pulsante **Accedi** (e un link **Accedi per gestire le donazioni esistenti** sotto il modulo) se vuoi accedere per usare funzioni aggiuntive come la cronologia delle donazioni.

La schermata **Donazioni** del portale membri (`/mobile/donate`) mostra lo stesso modulo quando non hai effettuato l'accesso, con sotto il link **Accedi per gestire le donazioni ricorrenti e vedere la cronologia**.

:::tip
Se hai già effettuato l'accesso quando visiti la pagina pubblica delle donazioni, verrai reindirizzato automaticamente alla pagina delle donazioni per i membri, dove hai accesso alla cronologia completa e ai metodi di pagamento salvati.
:::

## Pagina delle donazioni per i membri (con accesso) {#member-donation-page-logged-in}

Quando hai effettuato l'accesso, la schermata **Donazioni** del portale membri mostra in alto un pulsante **Dona** e un pulsante **Stampa estratto conto**, seguiti da queste sezioni:

- **Quest'anno** (con l'anno in corso nel titolo) -- Il totale delle tue donazioni da inizio anno e il numero di offerte, con un link **Tutta la cronologia**. Vedi [Cronologia delle donazioni](./donation-history.md) per i dettagli.
- **Ricorrenti** -- Le tue donazioni programmate, con un link **Gestisci**.
- **Attività recenti** -- Le tue ultime tre donazioni, con un link **Ripeti l'ultima offerta** che apre il modulo di donazione.
- **Metodi di pagamento** -- Le tue carte e i conti bancari salvati, con un link **Gestisci** per aggiungere una carta o un conto bancario e modificare o rimuovere quelli salvati.
- Una scheda con l'avanzamento di una campagna, se la tua chiesa ha una campagna attiva.

Per donare:

1. Apri la pagina delle donazioni dalla scheda **Dona** della tua chiesa, dal pulsante **Dona** nella sezione **Donazioni** della tua [Dashboard Home](../getting-started/navigating.md#home), oppure da **Cronologia** nella sezione **Donazioni** della tua [pagina Me](../getting-started/me-page.md). Nella pagina Donazioni, tocca **Dona** per aprire il modulo di donazione.
2. Scegli **Fai una donazione** oppure **Fai una donazione ricorrente**.
3. Seleziona un metodo di pagamento salvato oppure inserisci i dati di una nuova carta. Quando inserisci una nuova carta, spunta **Salva questa carta per le prossime donazioni** per conservarla per la volta successiva (se il fornitore di pagamenti della chiesa supporta le carte salvate).
4. Scegli il **Fondo** a cui vuoi donare e inserisci l'**Importo**; clicca su **Aggiungi altro** per donare a più di un fondo. L'elenco mostra solo i fondi che la chiesa mette a disposizione dei donatori, anche se sei un membro dello staff che può vedere altri fondi in B1 Admin.
5. Clicca su **Anteprima donazione** per rivedere la tua offerta, poi su **Dona** per completarla. **Annulla** ti riporta alla pagina Donazioni.

Dopo l'elaborazione della donazione compare un messaggio di conferma e la donazione è visibile nella tua [cronologia delle donazioni](./donation-history.md).

:::info
Se le donazioni effettuate sono state registrate in più di una valuta, il totale da inizio anno e il totale della cronologia vengono convertiti nella valuta della tua chiesa, con una nota **Convertito ai tassi di cambio correnti** sotto. Le singole donazioni nella tua cronologia continuano a mostrare la valuta originale.
:::

## Metodi di pagamento {#payment-methods}

Le donazioni vengono elaborate in modo sicuro dal fornitore di pagamenti collegato dalla tua chiesa. Con cosa puoi pagare dipende da quel fornitore:

- **Stripe** -- carta di credito o di debito, oppure conto bancario (ACH).
- **Kingdom Funding** -- carta di credito o di debito, oppure conto bancario (ACH).
- **Paystack** (chiese in Africa) -- carte locali e denaro mobile, nella tua valuta locale.
- **PayPal e Venmo** -- le chiese che hanno già attivato PayPal mostrano i pulsanti **PayPal** e **Venmo** sopra i campi della carta per le offerte una tantum. Le donazioni ricorrenti usano i campi della carta.

Quando hai effettuato l'accesso, i tuoi metodi di pagamento possono essere salvati per usi futuri, così la prossima volta doni più velocemente.

:::info Donare con conto bancario senza accedere
Se doni come ospite (senza aver effettuato l'accesso) tramite conto bancario, il conto deve essere verificato istantaneamente accedendo al proprio istituto bancario. Se non è possibile, vedrai il messaggio: "Impossibile verificare istantaneamente questo conto bancario. Dona con carta oppure accedi e aggiungi il conto bancario nel tuo profilo delle donazioni." I conti bancari che richiedono alcuni giorni di verifica possono essere aggiunti solo dopo aver effettuato l'accesso.
:::

:::warning
Se la tua donazione non va a buon fine, controlla attentamente i dati di pagamento e riprova. Se il problema persiste, contatta la segreteria della tua chiesa per assistenza.
:::

## Prossimi passi {#next-steps}

- [Cronologia delle donazioni](./donation-history.md) -- Consulta le tue donazioni passate e stampa gli estratti conto

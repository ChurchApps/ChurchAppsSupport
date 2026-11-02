---
title: "Iscrizioni agli eventi"
---

# Iscrizioni agli eventi

<div class="article-intro">

L'iscrizione nativa agli eventi risiede nel modulo content e, dalla release delle iscrizioni a pagamento, include un modello commerciale completo: tipi di partecipante con prezzo, selezioni extra con prezzo, codici sconto, pagamenti tramite il gateway di donazioni già in uso dalla chiesa e una lista d'attesa basata sullo stato. Il percorso del denaro riutilizza deliberatamente lo stack delle donazioni -- il controller delle iscrizioni addebita tramite la stessa astrazione `GatewayService` / `IGatewayProvider` documentata in [Donazioni](./giving), quindi nel modulo content non esiste alcuna conoscenza dei dati delle carte né degli SDK dei gateway. Questa pagina mappa il modello dei dati, le regole di prezzo e di capienza, e i flussi di iscrizione, pagamento e lista d'attesa.

</div>

## Panoramica

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portale dei membri)   │            │ Api — modulo content                        │
│  procedura di iscrizione ·   │   HTTPS    │  RegistrationController                     │
│  Le mie iscrizioni           │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (prezzo lato server) │
│ B1Admin (staff)              │            │  RegistrationHelper (email)                 │
│  impostazioni iscrizione ·   │            └───────────────┬─────────────────────────────┘
│  elenco · esportazione CSV   │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ astrazione gateway condivisa (donazioni)    │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tre regole valgono per l'intero stack:

1. **Il server stabilisce il prezzo.** I client inviano id dei tipi, id delle selezioni e quantità; `RegistrationPricingHelper.computeTotal()` calcola il totale lato server, e i coupon vengono riconvalidati al momento dell'addebito. Un importo inviato dal client non viene mai considerato attendibile.
2. **La capienza viene applicata in modo atomico al momento dell'inserimento.** Ogni inserimento con capienza limitata usa un'istruzione `INSERT … SELECT … FROM dual WHERE (conteggio delle righe attive) < capienza`, così due iscrizioni simultanee non possono prendere entrambe l'ultimo posto. I conteggi derivano dallo stato (`pending`/`confirmed`) e non vengono mai memorizzati.
3. **I pagamenti passano dai binari delle donazioni.** `RegistrationController` chiama il `GatewayService.processCharge` condiviso con il gateway configurato dalla chiesa -- lo stesso livello di astrazione dei provider, lo stesso modello di tokenizzazione e la stessa gestione della SCA delle donazioni.

## Modello dei dati (`Api/src/modules/content`)

I modelli si trovano in `models/Registration.ts`; le mappature delle tabelle in `db/DatabaseTypes.ts`; un repository per tabella sotto `repositories/`.

| Tabella | Significato | Campi chiave |
|-------|-----------|---------|
| `registrations` | Una singola iscrizione (un nucleo/gruppo per un evento) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Un singolo partecipante di un'iscrizione | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Tipi di partecipante per evento (ad es. Adulto / Bambino) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Opzioni extra con nome e prezzo (ad es. maglietta) | eventId, name, description, **price**, **capacity**, **maxQuantity** (limite per iscrizione), sort, active |
| `registrationSelectionChoices` | Quantità di una selezione scelta da un'iscrizione/membro | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Un singolo addebito riuscito su un'iscrizione | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Codici sconto per evento | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Note:

- **Non esiste una tabella per la lista d'attesa.** I gruppi in lista d'attesa sono righe di `registrations` con `status = 'waitlisted'`; l'intero ciclo di vita della lista d'attesa consiste in transizioni di stato su quell'unica tabella.
- **Nessun contatore memorizzato.** I conteggi di "venduti" / "usati" (capienza dell'evento, capienza per tipo, capienza per selezione, utilizzi dei coupon) vengono calcolati con sottoquery correlate su righe con stato in `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Annullare un'iscrizione libera quindi la capienza senza alcuna contabilità aggiuntiva.
- I prezzi sono colonne DECIMAL di MySQL (stringhe nella comunicazione) convertite con `Number()` all'interno dell'helper dei prezzi.

## Superficie REST

Tutto si trova sotto `/content/registrations` (`controllers/RegistrationController.ts`), protetto da `Permissions.registrations` (`view` / `edit`):

| Rotta | Accesso | Scopo |
|-------|---------|-------|
| `POST /register` | anonimo | Invio completo: ospite, membro, oppure Aggiungi partecipante da parte dello staff; prezzo lato server, controlli di capienza, addebito facoltativo |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | pubblico | Tipi/selezioni con `used` / `remainingCapacity` calcolati per la procedura guidata |
| `POST /types`, `DELETE /types/:id` (stesso per `/selections`, `/coupons`) | `registrations.edit` | CRUD delle impostazioni per lo staff |
| `POST /coupons/validate` | pubblico | Validazione in linea del codice sconto durante la procedura guidata |
| `GET /coupons/event/:eventId` | staff | Coupon con i conteggi di utilizzo |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staff · pubblico | Elenco dei partecipanti; conteggio degli attivi per la visualizzazione della capienza |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autenticato | Le mie iscrizioni, dettaglio, cronologia dei pagamenti |
| `PUT /:id` | titolare/staff | Modifica successiva all'invio -- sostituisce membri e scelte delle selezioni con nuovi controlli atomici di capienza, ricalcola `totalAmount`; non addebita né rimborsa mai automaticamente |
| `POST /:id/pay` | titolare | "Completa il pagamento": addebita `totalAmount − amountPaid`, fa passare `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | staff | Promozione manuale dalla lista d'attesa |
| `POST /:id/cancel` · `DELETE /:id` | titolare · staff | Annulla / elimina; entrambi attivano la promozione automatica dalla lista d'attesa |

Un'iscrizione non annullata esistente per lo stesso `personId` per lo stesso evento viene rifiutata con un 409, e ogni iscrizione creata emette un webhook `registration.created` tramite `WebhookDispatcher`.

## Prezzi e codici sconto

`helpers/RegistrationPricingHelper.ts` è l'unica autorità per i calcoli monetari:

- `computeTotal()` somma il prezzo del tipo di ciascun membro più il `prezzo × quantità` di ogni scelta di selezione.
- `validateCoupon()` verifica il flag di attività, la finestra di date (`startDate`/`endDate`), `minMembers` rispetto alla dimensione del gruppo inviato e `maxUses` rispetto al numero di riscatti derivato dallo stato.
- `applyDiscount()` -- `percent` sottrae `totale × valore/100`; `amount` sottrae `valore`; entrambi si fermano a zero.

La procedura guidata chiama `POST /coupons/validate` per un riscontro in linea, ma `register` riconvalida e riapplica il coupon lato server -- il totale mostrato al client è solo indicativo.

## L'idioma atomico della capienza

Ogni inserimento con capienza limitata si svolge in sicurezza senza transazioni né lock, rendendo il controllo di capienza parte dell'`INSERT` stesso. A livello di evento (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero righe modificate significa "capienza raggiunta". Lo stesso idioma protegge gli inserimenti per tipo (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, che conta i membri uniti alle iscrizioni attive) e le quantità per selezione (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, con `COALESCE(SUM(quantity),0) + ? <= capacity`). Quando un inserimento di membro o di selezione fallisce a metà dell'iscrizione, il controller annulla la parte già inserita con `deleteCascade()` e riporta quale tipo o selezione è esaurito.

## Flusso di pagamento {#payment-flow}

`processRegistrationCharge` nel controller è l'unico punto in cui le iscrizioni toccano il denaro, ed è un client sottile dello stack delle donazioni:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

La tokenizzazione avviene nel browser esattamente come per le donazioni (vedi [Donazioni](./giving)) -- la procedura guidata riutilizza il registro dei provider di pagamento di apphelper, quindi i membri connessi possono pagare con le carte salvate e gli ospiti tokenizzano una nuova carta. Il controller replica le particolarità dei provider di `DonateController` (id dei metodi di pagamento Kingdom Funding `pm-{id}`, risposte SCA `requires_action` di Stripe restituite al client senza registrare un pagamento). Un addebito riuscito scrive una riga in `registrationPayments`, incrementa `amountPaid` e conferma l'iscrizione. **I rimborsi non sono implementati** -- un'iscrizione a pagamento annullata conserva le righe di pagamento, e l'eventuale rimborso viene gestito fuori banda nella dashboard del gateway.

Entrambi i punti di ingresso passano dallo stesso percorso di codice: `register` (pagamento alla registrazione) e `pay` (pagamento del saldo / completamento della lista d'attesa).

`register` salta l'addebito in due casi e salva l'iscrizione come `pending` con `amountPaid = 0`, lasciando l'intero totale come saldo dovuto:

- **Aggiungi partecipante da parte dello staff.** Il corpo contiene un `personId` diverso da quello del chiamante, nessun `guestInfo`, e il chiamante ha `registrations.edit` in quella chiesa. La persona deve esistere (altrimenti 404), il filtro sui membri del nucleo viene aggirato e non viene addebitato alcun importo.
- **Nessun gateway.** La chiesa non ha un gateway di donazioni (`hasGateway` controlla `gateway.loadAll`). Il passaggio di pagamento di B1App mostra **Iscriviti e paga più tardi** al posto del modulo della carta.

Le iscrizioni a pagamento di ospiti (senza `au.id`) devono includere un `captchaPass` da `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (ora in `shared/helpers`) viene eseguito appena prima dell'addebito, quindi le iscrizioni in lista d'attesa e quelle gratuite non sono influenzate. Quando `CAPTCHA_ENFORCE=true` e il pass manca o non è valido, la nuova iscrizione viene annullata con `deleteCascade()` e la chiamata restituisce 403. `RegistrationPaymentForm` di B1App mostra la casella reCAPTCHA agli ospiti e invia il pass sia con il salvataggio della carta sia con l'iscrizione.

## Ciclo di vita della lista d'attesa

Quando l'evento è al completo e il flag `waitlistEnabled` dell'evento è attivo, `register` salva il gruppo come `waitlisted` (saltando i controlli di capienza) e invia la normale email di conferma contrassegnata come posto in lista d'attesa. La promozione avviene in tre modi -- `cancel`, `delete` e l'endpoint dello staff `promote` -- confluendo tutti in `RegistrationRepo.promoteFromWaitlist`, che sceglie la riga in lista d'attesa più vecchia e la cambia in modo atomico:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…conteggio attivi per l'evento…) < ?
```

La guardia `status='waitlisted'` impedisce che promozioni concorrenti promuovano due volte la stessa riga, e la sottoquery di capienza impedisce che una promozione porti a superare la capienza. Le righe promosse finiscono in `pending` -- non `confirmed` -- perché potrebbe essere ancora dovuto un saldo; `RegistrationHelper.sendWaitlistAvailabilityEmail` comunica all'iscritto che il suo posto si è liberato e, quando `totalAmount − amountPaid > 0`, rimanda alla pagina `/mobile/registrations` di B1 della chiesa (Le mie iscrizioni), costruita a partire da `B1AppRoot` e dal sottodominio della chiesa. Il pagamento (oppure l'assenza di saldo) conferma l'iscrizione.

:::info
Un aumento di capienza non promuove automaticamente da solo -- lo staff usa l'azione Promuovi dall'elenco dopo aver aumentato la capienza. Annullamenti ed eliminazioni promuovono automaticamente.
:::

## Superfici lato client

- **Procedura guidata di B1App** — un unico hook condiviso, `B1App/src/components/registration/useEventRegistration.ts`, guida sia il componente per il sito web (`components/registration/EventRegister.tsx`) sia la schermata mobile del portale (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) attraverso i passaggi `info → members → selections → questions → payment → confirm` (i passaggi centrali compaiono solo quando l'evento ha selezioni, un modulo allegato o un totale diverso da zero). I passaggi info/membri mostrano i selettori per tipo di partecipante con capienza residua in tempo reale e stati di esaurito; il pagamento (`RegistrationPaymentForm.tsx`) mostra il riepilogo dell'ordine, l'inserimento del codice sconto e -- per i membri connessi -- i metodi di pagamento salvati tramite il registro dei provider di apphelper, mentre gli ospiti tokenizzano una nuova carta. La schermata **Iscrizioni** mobile (`screens/RegistrationsPage.tsx`) è Le mie iscrizioni: stato, saldo dovuto, Completa il pagamento (`POST /:id/pay`), Modifica (`PUT /:id` -- contatti, tipi di membro, quantità delle selezioni) e Annulla.
- **Impostazioni in B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` aggiunge l'interruttore Attiva lista d'attesa più le sezioni a fisarmonica per Tipi di partecipante, Selezioni e Codici sconto (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), tutte in CRUD sulle rotte `/types`, `/selections`, `/coupons`.
- **Elenco in B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: colonna Tipo per partecipante, colonna Pagato/Totale con chip del saldo, chip di conteggio per tipo, una finestra con i dettagli dei pagamenti (`RegistrationDetailDialog.tsx`, da `GET /payments/:registrationId`), l'azione di riga Promuovi per la lista d'attesa ed esportazione CSV con tipi di partecipante, selezioni, pagato/totale/saldo e risposte alle domande.

Le ricerche tra moduli (risoluzione o creazione della persona ospite, caricamento della chiesa per le email) passano da `getMembershipModuleGateway()` -- il modulo content non legge mai direttamente le tabelle di membership.

## Pagine correlate

- [Donazioni](./giving) — l'astrazione del gateway, il registro dei provider e il modello di tokenizzazione che questa funzione riutilizza
- [Endpoint Content](../api/endpoints/content) — la superficie REST del modulo content
- [Webhook](../api/webhooks) — l'evento `registration.created`
- [Struttura del modulo](../api/module-structure) — come è organizzato lato server il modulo content

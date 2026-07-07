---
title: "Registrazioni agli eventi"
---

# Registrazioni agli eventi

<div class="article-intro">

La registrazione nativa dell'evento vive nel modulo di contenuto e, dalla wave di registrazioni a pagamento, porta un modello di commercio completo: tipi di partecipanti a prezzo, selezioni di componenti aggiuntivi a prezzo, codici di sconto, pagamenti attraverso il gateway di donazione esistente della chiesa, e una lista d'attesa guidata dallo stato. Il percorso del denaro deliberatamente riusa lo stack di donazione — il controller di registrazione carica attraverso la stessa astrazione `GatewayService` / `IGatewayProvider` documentata in [Donazioni](./giving), così nessuna conoscenza di dati della carta o SDK del gateway vive nel modulo di contenuto. Questa pagina mappa il modello di dati, le regole di pricing e capacità, e i flussi di registrazione, pagamento, e lista d'attesa.

</div>

## Panoramica

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portale dei membri)   │            │ Api — modulo contenuto                      │
│  wizard registrazione ·      │   HTTPS    │  RegistrationController                     │
│  Le mie registrazioni        │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (prezzo server) │
│ B1Admin (staff)              │            │  RegistrationHelper (email)                 │
│  impostazioni registrazione  │            └───────────────┬─────────────────────────────┘
│  evento · roster · export CSV│                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ astrazione gateway condiviso (donazioni)   │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tre regole si mantengono in tutto lo stack:

1. **Il server possiede il prezzo.** I client inviano i type id, i selection id, e le quantità; `RegistrationPricingHelper.computeTotal()` calcola il totale lato server e i coupon vengono ri-validati al tempo di charge. Un importo fornito dal client non viene mai fidato.
2. **La capacità viene applicata atomicamente al tempo di insert.** Ogni insert con limite di capacità usa un'istruzione `INSERT … SELECT … FROM dual WHERE (count di righe attive) < capacity`, così due registrazioni simultanee non possono entrambe prendere l'ultimo posto. I conteggi sono derivati dallo stato (`pending`/`confirmed`), mai memorizzati.
3. **I pagamenti cavalcano i rails di donazione.** `RegistrationController` chiama lo `GatewayService.processCharge` condiviso con il gateway configurato della chiesa — la stessa astrazione del provider, modello di tokenizzazione, e gestione SCA come le donazioni.

## Modello di dati (`Api/src/modules/content`)

I modelli si trovano in `models/Registration.ts`; mappature di tabella in `db/DatabaseTypes.ts`; un repo per tabella sotto `repositories/`.

| Tabella | Significato | Campi chiave |
|-------|---------|-----------|
| `registrations` | Una registrazione (un nucleo/partito per un evento) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Un partecipante su una registrazione | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Tipi di partecipanti per evento (ad es. Adulto / Bambino) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Opzioni di componente aggiuntivo denominato con un prezzo (ad es. T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (limite per-registrazione), sort, active |
| `registrationSelectionChoices` | Quantità di una selezione scelta da una registrazione/membro | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Una charge riuscita contro una registrazione | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Codici di sconto per evento | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Note:

- **Non esiste una tabella lista d'attesa.** Le parti in lista d'attesa sono righe `registrations` con `status = 'waitlisted'`; l'intero ciclo di vita della lista d'attesa è transizioni di stato su quella una tabella.
- **Nessun contatore memorizzato.** I conteggi "Venduti" / "utilizzati" (capacità evento, capacità per-tipo, capacità per-selezione, usi coupon) sono calcolati con subquery correlate su righe il cui stato è in `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Cancellare una registrazione quindi libera la capacità senza bookkeeping.
- I prezzi sono colonne DECIMAL MySQL (stringhe sul filo) coercizzate con `Number()` dentro l'helper di pricing.

## Superficie REST

Tutto è sotto `/content/registrations` (`controllers/RegistrationController.ts`), controllato da `Permissions.registrations` (`view` / `edit`):

| Rotta | Accesso | Scopo |
|-------|--------|---------|
| `POST /register` | anonimo | Sottomissione completa: ospite o membro, pricing server, controlli capacità, charge opzionale |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | pubblico | Tipi/selezioni con derivato `used` / `remainingCapacity` per il wizard |
| `POST /types`, `DELETE /types/:id` (stesso per `/selections`, `/coupons`) | `registrations.edit` | CRUD impostazioni staff |
| `POST /coupons/validate` | pubblico | Validazione inline di codice di sconto durante il wizard |
| `GET /coupons/event/:eventId` | staff | Coupon con conteggi uses |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staff · pubblico | Roster; conteggio attivo per visualizzazione capacità |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autenticato | Le mie registrazioni, dettaglio, cronologia pagamenti |
| `PUT /:id` | proprietario/staff | Modifica post-sottomissione — sostituisce membri e scelte di selezione con controlli atomici di capacità fresca, ricalcola `totalAmount`; non carica o rimborsa mai automaticamente |
| `POST /:id/pay` | proprietario | "Completa pagamento": carica `totalAmount − amountPaid`, capovolge `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | staff | Promozione lista d'attesa manuale |
| `POST /:id/cancel` · `DELETE /:id` | proprietario · staff | Cancella / elimina; entrambi attivano la promozione auto della lista d'attesa |

Una registrazione non-cancellata esistente per lo stesso `personId` sullo stesso evento è rifiutata con 409, e ogni registrazione creata emette un webhook `registration.created` tramite `WebhookDispatcher`.

## Codici di prezzo e sconto

`helpers/RegistrationPricingHelper.ts` è l'autorità singola di denaro-math:

- `computeTotal()` somma il prezzo di tipo di ogni membro più il `price × quantity` di ogni scelta di selezione.
- `validateCoupon()` applica il flag attivo, finestra di data (`startDate`/`endDate`), `minMembers` rispetto alla dimensione del partito inviato, e `maxUses` rispetto al conteggio di redenzione derivato da stato.
- `applyDiscount()` — `percent` sottrae `total × value/100`; `amount` sottrae `value`; entrambi fanno il pavimento a zero.

Il wizard chiama `POST /coupons/validate` per feedback inline, ma `register` ri-valida e ri-applica il coupon lato server — il totale visualizzato del client è solo consultivo.

## L'idioma atomico di capacità

Ogni insert con limite di capacità corre in modo sicuro senza transazioni o blocchi rendendo il controllo di capacità parte di `INSERT` stessa. A livello di evento (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero righe interessate significa "a capacità". Lo stesso idioma custodisce inserimenti per-tipo (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, conteggiando i membri uniti a registrazioni attive) e quantità per-selezione (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, usando `COALESCE(SUM(quantity),0) + ? <= capacity`). Quando qualsiasi insert di membro o selezione fallisce a metà registrazione, il controller rotola la registrazione parziale indietro con `deleteCascade()` e riporta quale tipo o selezione è sold out.

## Flusso di pagamento

`processRegistrationCharge` nel controller è l'unico posto dove le registrazioni toccano il denaro, ed è un client thin dello stack di donazione:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

La tokenizzazione accade nel browser esattamente come per le donazioni (vedi [Donazioni](./giving)) — il wizard riusa il registro del provider di pagamento apphelper, così i membri connessi possono pagare con carte salvate e gli ospiti tokenizzano una carta nuova. Il controller rispecchia i difetti del provider di `DonateController` (id metodo di pagamento Kingdom Funding `pm-{id}`, risposte Stripe SCA `requires_action` restituite al client senza registrare un pagamento). Una charge riuscita scrive una riga `registrationPayments`, aumenta `amountPaid`, e conferma la registrazione. **I rimborsi non sono implementati** — una registrazione cancellata pagata mantiene le sue righe di pagamento e qualsiasi rimborso è gestito out-of-band nel dashboard del gateway.

Entrambi i punti di ingresso si instradano attraverso lo stesso percorso di codice: `register` (pagamento al signup) e `pay` (pagamento saldo / completamento lista d'attesa).

## Ciclo di vita della lista d'attesa

Quando l'evento è pieno e il flag `waitlistEnabled` dell'evento è acceso, `register` salva il partito come `waitlisted` (saltando i controlli di capacità) e invia l'email di conferma normale contrassegnata come un posto in lista d'attesa. La promozione accade tre modi — `cancel`, `delete`, e l'endpoint `promote` dello staff — tutti imbuti in `RegistrationRepo.promoteFromWaitlist`, che sceglie la riga più vecchia in lista d'attesa e la capovolge atomicamente:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…conteggio attivo per l'evento…) < ?
```

La protezione `status='waitlisted'` significa che le promozioni concorrenti non possono doppia-promuovere una riga, e la subquery di capacità significa che una promozione non può oversell. Le righe promosse atterrano su `pending` — non `confirmed` — perché un saldo potrebbe ancora essere dovuto; `RegistrationHelper.sendWaitlistAvailabilityEmail` dice al registrante che il loro posto si è aperto e, quando `totalAmount − amountPaid > 0`, si collega alla pagina di completamento del pagamento. Pagare (o non avere saldo) li conferma.

:::info
Un aumento di capacità non auto-promuove da solo — lo staff usa l'azione Promote del roster dopo aver aumentato la capacità. I cancel e delete promuovono automaticamente.
:::

## Superfici client

- **B1App wizard** — un gancio condiviso, `B1App/src/components/registration/useEventRegistration.ts`, guida sia il componente del sito web (`components/registration/EventRegister.tsx`) che la schermata del portale mobile (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) attraverso i passaggi `info → members → selections → questions → payment → confirm` (i passaggi intermedi renderizzano solo quando l'evento ha selezioni, un modulo allegato, o un totale diverso da zero). I passaggi info/members mostrano picker per-attendee-type con capacità rimanente in tempo reale e stati sold-out; pagamento (`RegistrationPaymentForm.tsx`) mostra il riepilogo dell'ordine, voce di codice di sconto, e — per i membri connessi — metodi di pagamento salvati tramite il registro del provider apphelper, con ospiti che tokenizzano una carta nuova. La schermata **Registrazioni** mobile (`screens/RegistrationsPage.tsx`) è Le mie registrazioni: status, saldo dovuto, Completa pagamento (`POST /:id/pay`), Modifica (`PUT /:id` — contatto, tipi di membro, quantità di selezione), e Cancella.
- **Impostazioni B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` aggiunge il switch Enable Waitlist più accordioni per Tipi di partecipanti, Selezioni, e Codici di sconto (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), tutto CRUD contro le rotte `/types`, `/selections`, `/coupons`.
- **Roster B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: colonna per-attendee Type, colonna Paid/Total con chip di saldo, chip di conteggio per-tipo, una finestra di dialogo dettagli pagamenti (`RegistrationDetailDialog.tsx`, da `GET /payments/:registrationId`), l'azione riga Promote della lista d'attesa, e export CSV inclusi tipi di partecipanti, selezioni, pagato/totale/saldo, e risposte alle domande.

Gli sguardi cross-modulo (risolvere o creare la persona ospite, caricare la chiesa per email) passano attraverso `getMembershipModuleGateway()` — il modulo di contenuto non legge mai le tabelle di appartenenza direttamente.

## Pagine correlate

- [Donazioni](./giving) — l'astrazione del gateway, il registro del provider, e il modello di tokenizzazione che questa funzione riusa
- [Endpoint di contenuto](../api/endpoints/content) — la superficie REST del modulo di contenuto
- [Webhook](../api/webhooks) — l'evento `registration.created`
- [Struttura del modulo](../api/module-structure) — come il modulo di contenuto è organizzato lato server

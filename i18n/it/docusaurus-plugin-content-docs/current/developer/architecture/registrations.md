---
title: "Registrazioni agli eventi"
---

# Registrazioni agli eventi

<div class="article-intro">

La registrazione nativa agli eventi vive nel modulo di contenuto e, dall'ondata delle registrazioni a pagamento, porta con sé un modello commerciale completo: tipi di partecipanti a prezzo, selezioni di componenti aggiuntivi a prezzo, codici sconto, pagamenti tramite il gateway di donazione esistente della chiesa, e una lista d'attesa guidata dallo stato. Il percorso del denaro riutilizza deliberatamente lo stack di donazione — il controller di registrazione addebita tramite la stessa astrazione `GatewayService` / `IGatewayProvider` documentata in [Contributi](./giving), così nessuna conoscenza di dati carta o SDK del gateway vive nel modulo di contenuto. Questa pagina mappa il modello dati, le regole di prezzo e capienza, e i flussi di registrazione, pagamento, e lista d'attesa.

</div>

## Panoramica

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portale membri)       │            │ Api — modulo content                        │
│  wizard di registrazione ·   │   HTTPS    │  RegistrationController                     │
│  Le mie registrazioni        │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (prezzo server) │
│ B1Admin (staff)              │            │  RegistrationHelper (email)                 │
│  impostazioni registrazione  │            └───────────────┬─────────────────────────────┘
│  evento · roster · export CSV│                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ astrazione gateway condivisa (giving)       │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tre regole valgono in tutto lo stack:

1. **Il server possiede il prezzo.** I client inviano id di tipo, id di selezione, e quantità; `RegistrationPricingHelper.computeTotal()` calcola il totale lato server e i coupon vengono ri-validati al momento dell'addebito. Un importo fornito dal client non viene mai fidato.
2. **La capienza è applicata atomicamente al momento dell'inserimento.** Ogni inserimento con limite di capienza usa un'istruzione `INSERT … SELECT … FROM dual WHERE (conteggio di righe attive) < capacity`, così due registrazioni simultanee non possono entrambe prendere l'ultimo posto. I conteggi sono derivati dallo stato (`pending`/`confirmed`), mai memorizzati.
3. **I pagamenti si basano sui binari del giving.** `RegistrationController` chiama il `GatewayService.processCharge` condiviso con il gateway configurato della chiesa — la stessa astrazione del provider, modello di tokenizzazione, e gestione SCA delle donazioni.

## Modello dati (`Api/src/modules/content`)

I modelli si trovano in `models/Registration.ts`; le mappature delle tabelle in `db/DatabaseTypes.ts`; un repository per tabella sotto `repositories/`.

| Tabella | Significato | Campi chiave |
|-------|---------|-----------|
| `registrations` | Una registrazione (un nucleo familiare/gruppo per un evento) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Un partecipante su una registrazione | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Tipi di partecipanti per evento (ad es. Adulto / Bambino) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Opzioni di componenti aggiuntivi con prezzo (ad es. maglietta) | eventId, name, description, **price**, **capacity**, **maxQuantity** (limite per registrazione), sort, active |
| `registrationSelectionChoices` | Quantità di una selezione scelta da una registrazione/membro | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Un addebito riuscito contro una registrazione | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Codici sconto per evento | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Note:

- **Non esiste una tabella per la lista d'attesa.** I gruppi in lista d'attesa sono righe `registrations` con `status = 'waitlisted'`; l'intero ciclo di vita della lista d'attesa è fatto di transizioni di stato su quell'unica tabella.
- **Nessun contatore memorizzato.** I conteggi "venduti" / "usati" (capienza evento, capienza per tipo, capienza per selezione, usi coupon) vengono calcolati con sottoquery correlate su righe il cui stato è in `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Annullare una registrazione libera quindi la capienza senza alcuna contabilità.
- I prezzi sono colonne MySQL DECIMAL (stringhe sulla rete) convertite con `Number()` dentro l'helper di prezzo.

## Superficie REST

Tutto è sotto `/content/registrations` (`controllers/RegistrationController.ts`), protetto da `Permissions.registrations` (`view` / `edit`):

| Rotta | Accesso | Scopo |
|-------|--------|---------|
| `POST /register` | anonimo | Invio completo: ospite o membro, prezzo server, controlli di capienza, addebito opzionale |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | pubblico | Tipi/selezioni con `used` / `remainingCapacity` derivati per il wizard |
| `POST /types`, `DELETE /types/:id` (stesso per `/selections`, `/coupons`) | `registrations.edit` | CRUD delle impostazioni staff |
| `POST /coupons/validate` | pubblico | Validazione inline del codice sconto durante il wizard |
| `GET /coupons/event/:eventId` | staff | Coupon con conteggi di utilizzo |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staff · pubblico | Roster; conteggio attivo per la visualizzazione della capienza |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autenticato | Le mie registrazioni, dettaglio, cronologia pagamenti |
| `PUT /:id` | proprietario/staff | Modifica post-invio — sostituisce i membri e le scelte di selezione con nuovi controlli atomici di capienza, ricalcola `totalAmount`; non addebita né rimborsa mai automaticamente |
| `POST /:id/pay` | proprietario | "Completa pagamento": addebita `totalAmount − amountPaid`, capovolge `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | staff | Promozione manuale dalla lista d'attesa |
| `POST /:id/cancel` · `DELETE /:id` | proprietario · staff | Annulla / elimina; entrambi attivano la promozione automatica dalla lista d'attesa |

Una registrazione non-annullata esistente per lo stesso `personId` sullo stesso evento viene rifiutata con 409, e ogni registrazione creata emette un webhook `registration.created` tramite `WebhookDispatcher`.

## Prezzi e codici sconto

`helpers/RegistrationPricingHelper.ts` è l'autorità unica per la matematica del denaro:

- `computeTotal()` somma il prezzo del tipo di ogni membro più il `price × quantity` di ogni scelta di selezione.
- `validateCoupon()` applica il flag attivo, la finestra di data (`startDate`/`endDate`), `minMembers` rispetto alla dimensione del gruppo inviato, e `maxUses` rispetto al conteggio di redenzione derivato dallo stato.
- `applyDiscount()` — `percent` sottrae `total × value/100`; `amount` sottrae `value`; entrambi si fermano a zero.

Il wizard chiama `POST /coupons/validate` per un feedback inline, ma `register` ri-valida e ri-applica il coupon lato server — il totale visualizzato dal client è solo consultivo.

## L'idioma atomico della capienza

Ogni inserimento con limite di capienza corre in sicurezza senza transazioni o blocchi rendendo il controllo di capienza parte dell'`INSERT` stesso. A livello di evento (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero righe interessate significa "a capienza". Lo stesso idioma protegge gli inserimenti per tipo (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, contando i membri uniti a registrazioni attive) e le quantità per selezione (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, usando `COALESCE(SUM(quantity),0) + ? <= capacity`). Quando qualsiasi inserimento di membro o selezione fallisce a metà registrazione, il controller annulla la registrazione parziale con `deleteCascade()` e segnala quale tipo o selezione è esaurito.

## Flusso di pagamento

`processRegistrationCharge` nel controller è l'unico punto in cui le registrazioni toccano il denaro, ed è un client sottile dello stack di donazione:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

La tokenizzazione avviene nel browser esattamente come per le donazioni (vedi [Contributi](./giving)) — il wizard riutilizza il registro dei provider di pagamento apphelper, così i membri connessi possono pagare con carte salvate e gli ospiti tokenizzano una nuova carta. Il controller rispecchia le particolarità del provider di `DonateController` (id metodo di pagamento Kingdom Funding `pm-{id}`, risposte Stripe SCA `requires_action` restituite al client senza registrare un pagamento). Un addebito riuscito scrive una riga `registrationPayments`, incrementa `amountPaid`, e conferma la registrazione. **I rimborsi non sono implementati** — una registrazione pagata e annullata mantiene le proprie righe di pagamento e qualsiasi rimborso viene gestito fuori banda nella dashboard del gateway.

Entrambi i punti di ingresso passano per lo stesso percorso di codice: `register` (pagamento all'iscrizione) e `pay` (pagamento del saldo / completamento della lista d'attesa).

## Ciclo di vita della lista d'attesa

Quando l'evento è pieno e il flag `waitlistEnabled` dell'evento è attivo, `register` salva il gruppo come `waitlisted` (saltando i controlli di capienza) e invia la normale email di conferma contrassegnata come un posto in lista d'attesa. La promozione avviene in tre modi — `cancel`, `delete`, e l'endpoint `promote` dello staff — tutti confluiscono in `RegistrationRepo.promoteFromWaitlist`, che sceglie la riga più vecchia in lista d'attesa e la capovolge atomicamente:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…conteggio attivo per l'evento…) < ?
```

Il guard `status='waitlisted'` significa che le promozioni concorrenti non possono promuovere due volte la stessa riga, e la sottoquery di capienza significa che una promozione non può causare overselling. Le righe promosse atterrano su `pending` — non `confirmed` — perché potrebbe essere ancora dovuto un saldo; `RegistrationHelper.sendWaitlistAvailabilityEmail` comunica all'iscritto che il suo posto si è aperto e, quando `totalAmount − amountPaid > 0`, rimanda alla pagina di completamento del pagamento. Pagare (o non avere alcun saldo) li conferma.

:::info
Un aumento di capienza non promuove automaticamente da solo — lo staff usa l'azione Promuovi del roster dopo aver aumentato la capienza. Gli annullamenti e le eliminazioni promuovono automaticamente.
:::

## Superfici client

- **Wizard B1App** — un unico hook condiviso, `B1App/src/components/registration/useEventRegistration.ts`, guida sia il componente del sito web (`components/registration/EventRegister.tsx`) sia la schermata del portale mobile (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) attraverso i passaggi `info → members → selections → questions → payment → confirm` (i passaggi intermedi si renderizzano solo quando l'evento ha selezioni, un modulo allegato, o un totale diverso da zero). I passaggi info/membri mostrano selettori per tipo di partecipante con capienza residua in tempo reale e stati di esaurito; il pagamento (`RegistrationPaymentForm.tsx`) mostra il riepilogo dell'ordine, l'inserimento del codice sconto, e — per i membri connessi — i metodi di pagamento salvati tramite il registro dei provider apphelper, con gli ospiti che tokenizzano una nuova carta. La schermata mobile **Registrazioni** (`screens/RegistrationsPage.tsx`) è Le mie registrazioni: stato, saldo dovuto, Completa pagamento (`POST /:id/pay`), Modifica (`PUT /:id` — contatto, tipi di membro, quantità di selezione), e Annulla.
- **Impostazioni B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` aggiunge l'interruttore Abilita lista d'attesa più fisarmoniche per Tipi di partecipanti, Selezioni, e Codici sconto (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), tutte in CRUD contro le rotte `/types`, `/selections`, `/coupons`.
- **Roster B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: colonna Tipo per partecipante, colonna Pagato/Totale con chip del saldo, chip di conteggio per tipo, una finestra di dialogo dei dettagli di pagamento (`RegistrationDetailDialog.tsx`, da `GET /payments/:registrationId`), l'azione di riga Promuovi della lista d'attesa, ed esportazione CSV che include tipi di partecipanti, selezioni, pagato/totale/saldo, e risposte alle domande.

Le ricerche cross-modulo (risolvere o creare la persona ospite, caricare la chiesa per le email) passano attraverso `getMembershipModuleGateway()` — il modulo di contenuto non legge mai direttamente le tabelle di membership.

## Pagine correlate

- [Contributi](./giving) — l'astrazione del gateway, il registro dei provider, e il modello di tokenizzazione che questa funzionalità riutilizza
- [Endpoint di content](../api/endpoints/content) — la superficie REST del modulo di contenuto
- [Webhook](../api/webhooks) — l'evento `registration.created`
- [Struttura del modulo](../api/module-structure) — come è organizzato lato server il modulo di contenuto

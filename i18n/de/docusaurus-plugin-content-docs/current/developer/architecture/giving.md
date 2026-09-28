---
title: "Spenden-Architektur"
---

# Spenden-Architektur

<div class="article-intro">

ChurchApps verarbeitet Spenden nach einem Gateway-Rail-Modell: Die Kirche behält ihr eigenes Stripe- (oder PayPal-, Kingdom Funding- oder Paystack-) Konto, und B1 sitzt niemals im Geldfluss als Plattform-Prozessor. Kartendaten werden im Browser tokenisiert und erreichen keinen ChurchApps-Server. Diese Seite zeigt den gesamten Stack – die clientseitige Anbieter-Registry in `@churchapps/apphelper`, die GivingApi-Gateway-Abstraktion, das Spendendatenmodell und wie Gateway-Webhooks sich in die Datenbank zurück abstimmen.

</div>

## Übersicht

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Drei Prinzipien gelten für den gesamten Stack:

1. **Das Gateway hält die Karte.** Jedes Anbieter-Eingabe-Widget tokenisiert im Browser; die API erhält nur jemals einen Token, Nonce oder Order-ID.
2. **Eine Abstraktion, viele Anbieter.** Der Browser löst einen `PaymentProvider` aus einer Registry auf; der Server löst einen `IGatewayProvider` aus einer Factory auf. Beide greifen auf denselben normalisierten Anbieternamen zu, der im Gateway-Datensatz gespeichert ist.
3. **Webhooks sind die Quelle der Wahrheit für Settlement.** Eine Charge-Antwort wird optimistisch aufgezeichnet, aber der signierte Webhook des Gateways bestätigt (oder erstellt) die abgeschlossene Spende, mit Idempotenz-Wächtern auf beiden Seiten.

## Clientseitig: die Payment-Provider-Registry (`@churchapps/apphelper`)

Die Registry befindet sich in `Packages/apphelper/src/donations/providers/`, wobei sich die Widgets und Helfer jedes Anbieters in einem eigenen Unterordner befinden (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) – nichts außerhalb von `providers/` verzweigt sich auf einen Anbieternamen. Ein `PaymentProvider` (siehe `providers/types.ts`) bündelt alles, was eine Host-App für ein Gateway benötigt: einen `descriptor` (Admin-Etiketten, unterstützte Währungen, Gebührenfelder, Standard-Gebührensätze, Dashboard-/Registrierungs-URLs), einen `capabilities`-Flag-Satz (gespeicherte Karten, ACH, wiederkehrend, inline neuer Karteneintrag, implizites Speichern beim Tokenisieren), die React-Widgets für Mitgliedereintrag (`MemberWrapper`/`MemberEntry`), Gastspenden (`GuestForm`), Bearbeitung von gespeicherten Methoden (`MethodEditForm`), und Formular-Frage-Zahlungen (`FormPayment`), plus `buildChargeRequest(ctx, token)` – der einzige Ort, an dem sich die Charge-Payload-Form pro Anbieter unterscheidet. Jedes `MemberWrapper` eines Anbieters lädt sein eigenes SDK aus dem öffentlichen Schlüssel des Gateway-Datensatzes, so dass Host-Apps niemals ein Gateway-SDK importieren (B1App und B1Admin haben keine `@stripe/*`-Abhängigkeit). `pickDefaultGateway(gateways, capability?)` zentralisiert, welches der Gateways einer Kirche eine Oberfläche verwenden sollte.

`providers/registry.ts` hält die Built-ins. Sie werden **nach Wert referenziert**, nicht über einen Modul-Nebeneffekt registriert, daher kann ein Bundler das Tree-Shaking niemals die Registrierung fallen lassen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funktion | Zweck |
|----------|---------|
| `getPaymentProvider(name)` | Nach normalisiertem Namen auflösen; fällt zu Stripe zurück, damit ein falsch konfigurierter Anbieter das Spenderformular niemals hart zum Absturz bringt |
| `registerPaymentProvider(p)` | Zur Laufzeit einen zusätzlichen Anbieter registrieren (für ein benutzerdefiniertes Gateway einer Host-App) |
| `listPaymentProviders()` | Built-ins + Custom aufzählen – wird verwendet, um die Admin-Gateway-Dropdown zu erstellen |
| `hasPaymentProvider(name)` | Zugehörigkeitsprüfung |

**Built-in-Client-Anbieter: Stripe, PayPal, Kingdom Funding, Paystack.** B1App und B1Admin nur *lesen* die Registry (`getPaymentProvider`, `listPaymentProviders`); keiner ruft `registerPaymentProvider` auf – die Registrierung bleibt innerhalb von apphelper.

Jeder Anbieter tokenisiert anders, aber alle halten die Karte aus B1:

| Anbieter | Eingabe-Widget | Token zurück zur API |
|----------|-----------|-----|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; das Gastformular montiert auch ein `ExpressCheckoutElement` (Apple Pay / Google Pay, einmalige Geschenke), dessen `onConfirm` zu derselben `pm_…` ID auflöst | Zahlungsmethoden-ID (`pm_…`); Bank über `/paymentmethods/ach-setup-intent` – Financial Connections `us_bank_account` für USD-Gateways, kanadischer PAD `acss_debit` (gehostete Mandat-Modal, Mandat `default_for` Rechnungen/Abos, einmalige Charges übergeben die Mandat-ID) für CAD-Gateways |
| Kingdom Funding | Gehostetes Tokenizer-Formular, das durch den öffentlichen Gateway-Schlüssel gekennzeichnet ist | Nonce für einmalige Verwendung |
| PayPal | PayPal Hosted Fields (Karte, wiederkehrend) plus PayPal Smart Buttons mit Venmo-Finanzierung (einmalig); beide teilen einen SDK-Load und die vom Server erstellte Bestellung über `/donate/client-token` + `/donate/create-order` | Erfasste Order-ID |
| Paystack | Paystack Inline-Popup (`js.paystack.co/v2/inline.js`) – das Popup selbst übernimmt die Zahlung (Karte, mobiles Geld, Banküberweisung, USSD) | Bezahlte Transaktionsreferenz; gespeicherte Methoden sind Paystack-`AUTH_…`-Autorisierungscodes |

Stripes `finalizeResult` führt 3-D Secure / SCA im Browser aus (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), bevor die Spende als abgeschlossen gilt; das gemeinsame Formular ruft einfach `provider.finalizeResult(result)` ohne Kenntnis davon auf, was es tut.

## Serverseite: die Gateway-Abstraktion (GivingApi)

Das `/giving`-Modul (`Api/src/modules/giving`) stellt die REST-Oberfläche bereit; die Gateway-Installation befindet sich in `Api/src/shared/helpers`. `DonateController` spricht niemals direkt mit einem Gateway-SDK – es geht durch `GatewayService`, das den richtigen `IGatewayProvider` aus `GatewayFactory` auflöst und ihm eine entschlüsselte `GatewayConfig` übergibt.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ist der Vertrag, den jedes Gateway implementiert – Webhook-Lebenszyklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), Zahlung (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), Gebühren (`calculateFees`), Behandlung gespeicherter Methoden (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) und optionale Extras (Kunden, Bestellungen, SetupIntents, Ereignis-Wiederholung, `retryFailedPayment` für eine fehlgeschlagene Abonnement-Rechnung, `registerPaymentMethodDomain` für Apple Pay Domänenüberprüfung). Ein Anbieter, dem ein optionaler Hook fehlt, wird als nicht unterstützt für diese Aktion gemeldet und die Benutzeroberfläche verbirgt das Steuerelement. Jede Provider-Klasse deklariert ihre eigene `capabilities`-Matrix (unterstützte Währungen, ACH, Rückerstattungen, Abonnement-Anforderungen, Transaktionslimits) – `GatewayService.getProviderCapabilities(provider)` liest sie einfach – und Flags wie `logsDonationsImmediately` lenken das Controller-Verhalten ohne Provider-Namen-Bedingungen in den Controllern.

**Serveranbieter registriert in `GatewayFactory`:**

| Anbieter | Verfügbarkeit |
|----------|-------------|
| Stripe | Immer aktiv |
| PayPal | Immer aktiv |
| Kingdom Funding | Immer aktiv |
| Paystack | Immer aktiv (Händler in Nigeria, Ghana, Südafrika, Kenia, Côte d'Ivoire; Währungen NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in über das `ENABLE_SQUARE` Umgebungs-Flag |
| ePayMints | Opt-in über das `ENABLE_EPAYMINTS` Umgebungs-Flag |

Paystack unterscheidet sich von den anderen dadurch, dass Geld sich bewegt, bevor GivingApi beteiligt ist: Das Popup berechnet dem Spender, `processCharge` ist ein `GET /transaction/verify/:reference`, dessen bezahlter Betrag und Währung mit der zu erfassenden Spende übereinstimmen muss (eine Referenz bereits auf Datei wird niemals zweimal protokolliert), und das erste Geschenk eines wiederkehrenden Zeitplans wird aus `finalizeSubscription` protokolliert (überprüfe → `POST /plan` → `POST /subscription` mit `start_date` um ein Intervall nach vorne). Webhooks werden mit dem geheimen Schlüssel selbst signiert (`x-paystack-signature`, HMAC-SHA512 über den rohen Text), und Paystack hat keine Webhook-Management-API, daher zeigt der Admin-Bildschirm die URL an, die die Kirche in ihr Dashboard einfügen kann. Erneuerungs-`charge.success`-Ereignisse tragen keine Fondsspaltung; der Anbieter ruft sie aus den lokalen Zeilen `subscriptions`/`subscriptionFunds` des Spenders ab. Nur Kartenberechtigungen sind `reusable` – Geschenke mit mobilen Geldern sind nur einmalig, daher lehnt `createSubscription` sie ab. Die Demo-Daten setzen eine zweite Kirche (Accra Community Church, `CHU00000002`) in einen Paystack-Test-Modus GHS-Gateway, damit die Paystack Playwright Suite neben Graces Stripe läuft.

Benutzerdefinierte Anbieter können zur Laufzeit registriert werden, wenn `ENABLE_CUSTOM_GATEWAY_PROVIDERS` festgelegt ist; `AbstractExperimentalGatewayProvider` ist die Basisklasse für diese. Anbieternamen werden groß-/kleinschreibungsunabhängig verglichen.

### Gateway-Konfiguration & Geheimnisse

Ein Admin speichert Gateway-Anmeldeinformationen über `POST /giving/gateways` (`GatewayController`). Bei der Speicherung verschlüsselt der Controller die privaten und Webhook-Schlüssel mit `EncryptionHelper`, bevor er speichert, und dann – auf jedem nicht-localhost-Host – löscht er die vorhandenen Webhooks der Kirche und stellt einen neuen, auf `/giving/donate/webhook/{provider}?churchId=…` ausgerichteten bereit. Eine Kirche behält eine Zeile pro Anbieter: Die Speicherung eines Gateways ersetzt nur die vorhandene Zeile für denselben Anbieter. Öffentliche Lesevorgänge (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) geben nur öffentliche Schlüssel zurück.

## Datenmodell

Das Spendenschema (`Api/src/modules/giving/db/DatabaseTypes.ts`, Modelle in `models/`) ist ein MySQL-Schema, auf das durch Kysely zugegriffen wird:

| Tabelle | Rolle |
|-------|------|
| `gateways` | Pro-Kirchen-Anbieter-Konfiguration: `provider`, `publicKey`, verschlüsselte `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Spendenpflichtungen (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppierung für Eintrag/Berichterstattung (`name`, `batchDate`) |
| `donations` | Ein Geschenk: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; Aussagen, Summen, Dashboards und Spendenberichte zählen nur `complete` oder null), `transactionId` |
| `fundDonations` | Verteilung einer Spende über einen oder mehrere Fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Wiederkehrende Gabe; `id` ist die Abonnement-ID des Gateways, verknüpft mit `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondsspaltung für eine wiederkehrende Gabe |
| `customers` | Verknüpft einen `personId` mit seiner Gateway-Kunden-ID pro `provider` |
| `gatewayPaymentMethods` | Gespeicherte Karten/Banken: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/Ereignis-Audit-Pfad und Dedup-Schlüssel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Zusagen-Kampagnen, die an einen Fonds gebunden sind, und den zugesagten Betrag jeder Person |

Eine Spende wird über `fundDonations` auf Fonds aufgeteilt – die Spende trägt die Summe, jede `fundDonation` trägt eine Scheibe. `donations.currency` und `gateways.currency` tragen die ISO-Währung; jeder Anbieter gibt sein `supportedCurrencies` an, und Beträge werden mit `CurrencyHelper.formatCurrencyWithLocale` formatiert.

## End-to-End-Abläufe

### Mitglied einmalig und wiederkehrend (B1App)

Der authentifizierte Spendenbildschirm (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setzt sich aus drei apphelper-Komponenten zusammen: `MultiGatewayDonationForm`, `PaymentMethods` und `RecurringDonations`. B1App führt das umgebende Datenladen durch – `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` – und vergibt die Gateway-Liste; der aufgelöste Anbieter lädt sein eigenes SDK aus dem öffentlichen Schlüssel des Gateways. Die Ladung selbst erfolgt innerhalb von apphelper: Der aufgelöste Anbieter tokenisiert die (neue oder gespeicherte) Methode, dann wird an `/giving/donate/charge` für ein einmaliges Geschenk oder `/giving/donate/subscribe` für ein wiederkehrendes gepostet. Beide Endpunkte schreiben einen angemeldeten Spender ihrem eigenen `personId` zu (nur `donations.edit`-Inhaber dürfen jemandem anderen zuweisen) und lehnen Fondsspaltungen ab, die mehr als den berechneten Betrag addieren. Wiederkehrende Geschenke erstellen eine `subscriptions`-Zeile plus `subscriptionFunds` und geben den Zeitplan an das Gateway (Stripe Abonnements, PayPal Abrechnungspläne oder ein KF-Zeitplan).

### Gast- / anonyme Spenden

Die öffentliche Spendenwebseite (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) und das Panel "Jetzt spenden" rendern `NonAuthDonationWrapper` aus `@churchapps/apphelper/website`, das reCAPTCHA und den Elements-Kontext des Gateways um die `GuestForm` des Anbieters injiziert. Gäste bekommen keine Anmeldung, keine gespeicherten Methoden und keine Verlauf. Der Ablauf ruft `GET /giving/funds/churchId/:id` und `GET /giving/donate/gateways/:churchId` (nur öffentliche Schlüssel) ab, überprüft den Besucher mit `POST /giving/donate/captcha-verify`, tokenisiert im Browser und postet zu `/giving/donate/charge` (oder `/subscribe`). Gast-ACH verwendet die anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`.

Drei Gastformular-Optionen fahren auf demselben Charge-Anruf. `?fundId=` und `?amount=` auf der Spenden-URL wählen die Fondsspaltung vor (gelesen von jedem Provider-Gastformular beim Mounten, weitergeleitet durch den normalen Fondsänderungs-Handler, so dass sich Summen und Gebühren aktualisieren). `anonymous: true` lässt `DonateController.charge` jede Person verwerfen, die der Client gesendet hat, und protokolliert das Geschenk mit `personId = null`; das Gastformular überspringt `/people/loadOrCreate` und den Kunden-/Tresor-Schritt, und die drei unmittelbaren Anbieter stoppen die Auflösung einer Person vom Gateway-Kunden. Apple Pay benötigt die Domäne der Seite, die bei Stripe registriert ist, daher postet ein Stripe-Gastformular einmal pro Sitzung an das öffentliche, frequenzlimitierte `POST /giving/donate/register-domain`, das nur eine Domäne akzeptiert, die der Kirche gehört (`<subDomain>.b1.church`, eine Zeile in der Inhaltsmodul-Domänen-Tabelle, oder ein lokaler Host), bevor Stripes Zahlungsmethoden-Domänen-API aufgerufen wird.

### Admin-Aufzeichnung und Stripe-Import (B1Admin)

Der B1Admin-Spendensektion (`B1Admin/src/donations/`) ist der Ort, an dem Finanzteams arbeiten. Batch-Eintrag (`components/BulkDonationEntry.tsx`) erfasst Bargeld/Scheck/Sachspenden durch Veröffentlichung `/giving/donations` dann `/giving/funddonations` – kein Gateway beteiligt. Fonds, Chargen, Kampagnen und Konten werden jeweils auf ihre `/giving/*` CRUD-Routen abgebildet. Das Mitgliederstil-Spendenpanel (`B1Admin/src/donationComponents/`) verwendet die gleichen apphelper-Komponenten erneut wie B1App.

Berichterstattung und Buchhaltungs-Übergaben sind Client-seite- oder Report-Runner-Arbeit, keine Gateway-Arbeit: Der Seiten-QuickBooks-Export des Batch erstellt ein Journal-Entry-CSV aus den `donations` + `fundDonations` des Batch (Debit Undeposited Funds, ein Credit pro Fond), die Lapsed Givers-Registerkarte führt `Api/reports/lapsedGivers.json` durch den generischen Report-Runner mit Personennamen aus, die von `ReportOutput` aufgelöst werden, und Länder-Belegformate (Kanada / Australien / Neuseeland) sind Kircheneinstellungen im Mitgliedschafts-Schlüssel/Wert-Store, die von `GivingStatementDocument` gerendert und im B1App-Druckseite dupliziert werden.

### Umrechnung gemischter Währungssummen

Jeder Endpunkt, der eine einzelne kombinierte Gesamtheit über möglicherweise gemischtsprachige Geschenke zurückgibt – die Spendenzusammenfassungs-KPIs (`GivingKpiCards`), eine Batch-Gesamtheit, eine Gesamtheit von Fonds und die Jahres-bis-Datums-/Periodensummen des B1App-Spendenbildschirms – konvertiert die Standardwährung der Kirche auf der Serverseite, anstatt ungleiche Währungen zu summieren. `Api/src/shared/helpers/ExchangeRateHelper.ts` ruft Tarife von `api.frankfurter.dev` ab, die nach der Kirchenwährung verschlüsselt sind, speichert sie im Speicher für 12 Stunden und stellt `convertTotals(rows, churchCurrency, rates)` zur Verfügung: Zeilen werden vorab nach Währung in SQL gruppiert (eine Handvoll Gruppen, nie eine Pro-Geschenk-Konvertierung), jede Gruppe wird konvertiert und summiert, und das Ergebnis trägt ein `isConverted`-Flag, das der Client verwendet, um eine Notiz "Bei aktuellen Wechselkursen konvertiert" anzuzeigen. `GET /donations/exchange-rates` stellt die Kurstabelle Clients zur Verfügung, die sie benötigen (B1App-Spendenbildschirm); die Tarife selbst werden niemals von einer Anfrage akzeptiert, nur jemals vom Server abgerufen, daher kann ein Client eine gemeldete Gesamtheit nicht beeinflussen. Einzelne Spendenaufzeichnungen und historische/Originalwährungsberichte werden nie konvertiert – nur kombinierte Summen werden konvertiert.

Stripe-Import (`B1Admin/src/donations/StripeImportPage.tsx`) füllt Geschenke, die außerhalb von B1 gemacht wurden, rückwärts: Er ruft `POST /giving/donate/replay-stripe-events` mit `dryRun: true` für eine Vorschau auf, dann `dryRun: false` zum Importieren. Der Server listet Stripe-Ereignisse für den Datumsbereich auf und überspringt alles, das bereits aufgezeichnet wurde – zuerst nach Provider-ID in `eventLogs` abgeglichen, dann nach `DonationRepo.findMatchingDonation` (Betrag + Datum + Person), damit ein Neulauf niemals doppelt importiert.

## Webhooks und Abstimmung

Abgerechnete Zahlungen und Abonnement-Statusänderungen treffen bei `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`) ein. Die Verarbeitung ist absichtlich idempotent:

1. **Überprüfen** – `GatewayService.verifyWebhook` delegiert an die Signaturprüfung des Providers; eine fehlgeschlagene Signatur gibt 401 zurück. Ereignisse, die keine Verarbeitung benötigen, kurzfristig mit 200.
2. **Das Ereignis deduplizieren** – `EventLogRepo.loadByProviderId` überspringt einen Webhook, der bereits in `eventLogs` aufgezeichnet wurde.
3. **Die Spende deduplizieren** – bevor etwas erstellt wird, wird `DonationRepo.loadByTransactionId` gegen jede Kandidaten-ID überprüft, die die Nutzlast möglicherweise trägt. Dies absorbiert doppelte Lieferungen, mehrstufige ACH-Ereignisse (ausstehend → abgerechnet) und den Fall, in dem `/donate/charge` das Geschenk bereits optimistisch protokolliert hat.
4. **Anwenden** – der `classifyWebhookEvent(eventType)` des Providers sagt, was das Ereignis bedeutet (`donation` ausstehend/abgeschlossen, `cancel-subscription` oder `ignore`); abgeschlossene Zahlungen erstellen eine `complete`-Spende (oder fördern eine vorhandene `pending` oder `failed`), ACH-förmige Ereignisse landen als `pending`, bis die Abrechnung erfolgt, eine fehlgeschlagene Abonnement-Rechnung (Stripe `invoice.payment_failed`) erstellt eine `failed`-Spende, die auf der Rechnungs-ID der Zeichenkette nach, und Stornierungsereignisse löschen die lokale `subscriptions`-Zeile. Der Controller inspiziert nie provider-spezifische Ereignisnamen.

### Fehlergeschichte wiederkehrender Geschenke und Dunning

Eine `failed`-Spende ist die Arbeitseinheit für die Genesung. `GET /giving/donations/failed` listet sie mit der neuesten Gateway-Fehlermeldung aus `eventLogs` und einem `canRetry`-Flag aus den Capabilities des Gateways auf; `POST /giving/donate/retry/:donationId` ruft die `retryFailedPayment` des Providers auf (Stripe bezahlt die offene Rechnung), und der resultierende Webhook fördert die Zeile zu `complete` über den normalen Deduplizierungspfad. Dunning-E-Mails gehen am Tag 0 vom Webhook-Handler an den Spender, dann vom `DunningHelper.run` im Midnight-Timer (verdrahtet in `lambda/timer-handler.ts` und `RailwayCron.ts`) an den Tagen 3 und 7; jeder Versand wird in `eventLogs` als `provider: "dunning"`, `providerId: "<donationId>:<day>"` aufgezeichnet, daher wird ein Neulauf niemals zweimal gemailt. Stripe-Webhook-Endpunkte, die vor dieser Funktion erstellt wurden, abonnieren nicht `invoice.payment_failed`; Die erneute Speicherung des Gateways stellt einen neuen Endpunkt mit dem Ereignis bereit.

Anbieter mit `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) lassen ihre Charges vom `/charge`-Antwort protokollieren (kein Webhook-Roundtrip für den Happy Path erforderlich), während Stripe auf `payment_intent.succeeded` / `invoice.paid` und ACH `payment_intent.processing` angewiesen ist. Gebührenbehandlung (`POST /giving/donate/fee`, das `payFees`-Gateway-Flag und jedes Provider-`calculateFees`) berechnet die "Gebühren decken" Brutto-Aufzahlung auf der Spenderseite – B1 nimmt keinen Platform-Schnitt, daher wird niemals eine Applikationsgebühr hinzugefügt.

:::info
Die Charge- und Webhook-Pfade schreiben die gleichen `donations` / `fundDonations`-Zeilen. Die `transactionId` ist der Join-Schlüssel, der eine optimistische Charge-Protokollierung und ihren späteren Webhook davon abhält, zwei Spenden für ein Geschenk zu produzieren.
:::

## Verbundene Seiten

- [Giving Endpoints](../api/endpoints/giving) – volle REST-Oberfläche für Spenden, Fonds, Chargen, Gateways, Abonnements, Zahlungsmethoden und Webhooks
- [AppHelper](../shared-libraries/app-helper) – das npm-Paket, das die Payment-Provider-Registry und die Spenden-Komponenten versendet
- [Module Structure](../api/module-structure) – wie das GivingApi-Modul auf der Serverseite organisiert wird

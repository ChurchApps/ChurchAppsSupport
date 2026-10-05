---
title: "Geben-Architektur"
---

# Geben-Architektur

<div class="article-intro">

ChurchApps führt Spenden auf einem Gateway-Schienen-Modell: die Kirche hält ihren eigenen Stripe (oder PayPal, Kingdom Funding oder Paystack) Konto, und B1 sitzt nie im Geld-Pfad als Platform-Prozessor. Kartendaten werden im Browser tokenisiert und erreichen nie einen ChurchApps-Server. Diese Seite kartiert den ganzen Stack -- die Client-seitige Provider-Registry in `@churchapps/apphelper`, die GivingApi Gateway-Abstraktion, das Spenden-Datenmodell und wie Gateway-Webhooks zurück in die Datenbank abgleichen.

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

Drei Prinzipien gelten über den ganzen Stack:

1. **Das Gateway hält die Karte.** Jedes Provider's Eintrags-Widget tokenisiert im Browser; die API empfängt nur einen Token, eine Nonce oder eine Order-ID.
2. **Eine Abstraktion, viele Provider.** Der Browser löst einen `PaymentProvider` von einer Registry auf; der Server löst einen `IGatewayProvider` von einer Factory auf. Beide schlüsseln auf den gleichen normalisierten Provider-Namen, der auf dem Gateway-Datensatz gespeichert ist.
3. **Webhooks sind die Wahrheitsquelle zur Abrechnung.** Eine Charge-Antwort wird optimistisch erfasst, aber das Gateway's signierter Webhook ist, was die abgeschlossene Spende bestätigt (oder erstellt), mit idempotency-Guards auf beiden Seiten.

## Client-Seite: die Payment-Provider-Registry (`@churchapps/apphelper`)

Die Registry lebt in `Packages/apphelper/src/donations/providers/`, mit jedem Provider's Widgets und Helper unter seinem eigenen Unterordner (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- nichts außerhalb `providers/` verzweigt sich auf einen Provider-Namen. Ein `PaymentProvider` (siehe `providers/types.ts`) bündelt alles, das eine Host-App für ein Gateway braucht: ein `descriptor` (Admin-Labels, unterstützte Währungen, Gebühren-Felder, Standard-Gebühren-Sätze, Dashboard-/Anmeldungs-URLs), ein `capabilities` Flaggen-Satz (gespeicherte Karten, ACH, regelmäßig, eingebettete neue Karten-Eingabe, implizites speichern-auf-tokenisieren), die React-Widgets für Mitglied-Eingabe (`MemberWrapper`/`MemberEntry`), Gast-Geben (`GuestForm`), gespeicherte Methoden-Bearbeitung (`MethodEditForm`) und Formular-Frage-Zahlungen (`FormPayment`), plus `buildChargeRequest(ctx, token)` -- der eine Platz der Charge-Nutzlast-Form unterscheidet sich pro Provider. Jedes Provider's `MemberWrapper` lädt sein eigenes SDK vom Gateway-Datensatz's öffentlich-Schlüssel, daher Host-Apps nie einen Gateway-SDK importieren (B1App und B1Admin haben keine `@stripe/*` Abhängigkeit). `pickDefaultGateway(gateways, capability?)` zentralisiert, welch eines Kirche's Gateways ein Surface verwenden sollte.

`providers/registry.ts` hält die Eingebauten. Sie sind **nach Wert referenziert**, nicht registriert durch eine Modul-Neben-Effekt, daher ein Bundler's Tree-Shaking kann nie die Registrierung fallen lassen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funktion | Zweck |
|----------|---------|
| `getPaymentProvider(name)` | Löse nach normalisiertem Namen auf; Fall zurück zu Stripe daher ein missonfigurierter Provider nie Hart-Crashes die Spender-Form |
| `registerPaymentProvider(p)` | Registriere einen Extra-Provider zur Laufzeit (für einen Host-App's eigenes Gateway) |
| `listPaymentProviders()` | Zähle Eingebaute + Benutzerdefinierte auf -- verwendet um die Admin-Gateway-Dropdown zu bauen |
| `hasPaymentProvider(name)` | Mitgliedschaft überprüfung |

**Eingebaute Client-Provider: Stripe, PayPal, Kingdom Funding, Paystack.** B1App und B1Admin nur *lesen* die Registry (`getPaymentProvider`, `listPaymentProviders`); weder ruft `registerPaymentProvider` -- Registrierung bleibt innerhalb apphelper.

Jeder Provider tokenisiert anders, aber alle behalten die Karte aus B1:

| Provider | Eingabe-Widget | Token zum API zurückgegeben |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; das Gast-Form hat auch einen `ExpressCheckoutElement` (Apple Pay / Google Pay, einmalige Gaben) dessen `onConfirm` zum gleichen `pm_…` ID auflöst | Payment-Method ID (`pm_…`); Bank via `/paymentmethods/ach-setup-intent` -- Financial Connections `us_bank_account` für USD Gateways, Canadian PAD `acss_debit` (gehostete Mandat-Modal, Mandat `default_for` Rechnungen/Abos, Einmalig-Charges übergeben die Mandat ID) für CAD Gateways |
| Kingdom Funding | Gehosteter Tokenizer-Form schlüsseln vom Gateway öffentlich-Schlüssel | Einmalig-Nonce |
| PayPal | PayPal Hosted Fields (Karte, regelmäßig) plus PayPal Smart Buttons mit Venmo Finanzierung (Einmalig); beide teilen ein SDK-Last und der Server Order gebaut via `/donate/client-token` + `/donate/create-order` | Erfasste Order ID |
| Paystack | Paystack Inline Popup (`js.paystack.co/v2/inline.js`) -- das Popup selbst nimmt die Zahlung (Karte, mobiles Geld, Bank-Transfer, USSD) | Bezahlte Transaktions-Referenz; gespeicherte Methoden sind Paystack `AUTH_…` Autorisierungs-Codes |

Stripe's `finalizeResult` läuft 3-D Secure / SCA im Browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) bevor die Spende als abgeschlossen betrachtet wird; die gemeinsame Form ruft nur `provider.finalizeResult(result)` ohne Wissen über was es tut auf.

## Server-Seite: die Gateway-Abstraktion (GivingApi)

Das `/giving` Modul (`Api/src/modules/giving`) stellt die REST-Oberfläche aus; die Gateway-Rohrleitungen lebt in `Api/src/shared/helpers`. `DonateController` spricht nie direkt zu einem Gateway-SDK -- es geht durch `GatewayService`, das den rechten `IGatewayProvider` von `GatewayFactory` auflöst und es einen entschlüsselten `GatewayConfig` übergibt.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ist das Vertrag jedes Gateway implementiert -- Webhook-Lebenszyklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), Zahlung (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), Gebühren (`calculateFees`), gespeicherte Methoden-Handling (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) und optionale Extras (Kunden, Aufträge, SetupIntents, Event-Wiederholung, `retryFailedPayment` für einen fehlgeschlagene Abonnement-Rechnung, `registerPaymentMethodDomain` für Apple Pay Domain-Verifikation). Ein Provider, der einen optionalen Hook auslässt, wird als nicht unterstützt für jene Aktion gemeldet und die Benutzeroberfläche versteckt das Steuerelement. Jede Provider-Klasse erklärt sein eigenes `capabilities` Matrix (unterstützte Währungen, ACH, Rückerstattungen, Abonnement-Anforderungen, Transaktions-Grenzen) -- `GatewayService.getProviderCapabilities(provider)` liest es einfach -- und Flaggen wie `logsDonationsImmediately` fahren Controller-Verhalten ohne jegliche Provider-Namen-Bedingungen in den Controllern.

**Server-Provider registriert in `GatewayFactory`:**

| Provider | Verfügbarkeit |
|----------|-------------|
| Stripe | Immer an |
| PayPal | Immer an |
| Kingdom Funding | Immer an |
| Paystack | Immer an (Nigeria, Ghana, Südafrika, Kenia, Côte d'Ivoire Kaufleute; Währungen NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in via die `ENABLE_SQUARE` Umgebungs-Flagge |
| ePayMints | Opt-in via die `ENABLE_EPAYMINTS` Umgebungs-Flagge |

Paystack unterscheidet sich von die anderen darin, daß Geld vor GivingApi bewegt: das Popup lädt den Spender, `processCharge` ist ein `GET /transaction/verify/:reference` dessen bezahlter Betrag und Währung die Spende, die erfasst wird, abgleichen muß (eine Referenz bereits auf Datei wird nie zweimal protokolliert), und das erste Geschenk eines regelmäßigen Planes wird von `finalizeSubscription` protokolliert (Verify → `POST /plan` → `POST /subscription` mit `start_date` einem Intervall raus). Webhooks sind mit dem Geheim-Schlüssel selbst signiert (`x-paystack-signature`, HMAC-SHA512 über den Roh-Body) und Paystack hat keine Webhook-Management-API, daher zeigt der Admin-Bildschirm die URL für die Kirche, um in sein Dashboard einzufügen. Erneuerungs-`charge.success` Events tragen keine Mittel-Aufspaltung; der Provider erholt es vom Spender's lokalen `subscriptions`/`subscriptionFunds` Zeilen. Nur Kartenautorisierungen sind `wiederverwendbar` -- mobiles Geld Gaben sind einmalig nur, daher `createSubscription` weigert sie. Die Demo-Daten säen eine zweite Kirche (Accra Community Church, `CHU00000002`) auf einem Paystack Test-Modus GHS Gateway, daher die Paystack Playwright Suite läuft neben Grace's Stripe.

Benutzerdefinierte Provider können zur Laufzeit registriert werden, wenn `ENABLE_CUSTOM_GATEWAY_PROVIDERS` gesetzt ist; `AbstractExperimentalGatewayProvider` ist die Basisklasse für jene. Provider-Namen werden case-insensitiv abgeglichen.

### Gateway-Konfiguration & Geheimnisse

Ein Admin speichert Gateway-Zugangsdaten via `POST /giving/gateways` (`GatewayController`). Beim Speichern verschlüsselt der Controller die privaten und Webhook-Schlüssel mit `EncryptionHelper` vor dem Beibehalten, dann -- auf jedem Nicht-Localhost-Host -- löscht die Kirche's vorhandenes Webhook und stellt ein neues zur Verfügung, das auf `/giving/donate/webhook/{provider}?churchId=…` zeigt. Eine Kirche hält eine Zeile pro Provider: das Speichern eines Gateway ersetzt nur die vorhandene Zeile für jenen gleichen Provider. Öffentliche Lese (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) geben nur öffentlich-Schlüssel zurück.

## Datenmodell

Das Geben-Schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, Modelle in `models/`) ist ein MySQL-Schema durch Kysely zugegriffen:

| Tabelle | Rolle |
|-------|------|
| `gateways` | Per-Kirche Provider-Config: `provider`, `publicKey`, verschlüsselt `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Geben-Bezeichnungen (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppierung für Eintrag/Berichterstattung (`name`, `batchDate`) |
| `donations` | Ein Geschenk: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; Aussagen, Gesamtsummen, Dashboards und Spenden-Berichte zählen nur `complete` oder null), `transactionId` |
| `fundDonations` | Zuordnung einer Spende über ein oder mehr Mittel (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Regelmäßiges Geschenk; `id` ist die Gateway's Abonnement-ID, verlinkt zu `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Mittel-Aufspaltung für ein regelmäßiges Geschenk |
| `customers` | Link eine `personId` zu ihrer Gateway-Kunden-ID, pro `provider` |
| `gatewayPaymentMethods` | Gespeicherte Karten/Banken: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/Event-Audit-Spur und dedup Schlüssel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Versprechen-Kampagnen gebunden zu ein Mittel und jede Person's versprochener Betrag |

Ein Spende wird über Mittel durch `fundDonations` aufgeteilt -- die Spende trägt die Gesamtsumme, jedes `fundDonation` trägt ein Scheibe. `donations.currency` und `gateways.currency` tragen die ISO-Währung; jeder Provider bewirbt seine `supportedCurrencies` und Beträge werden mit `CurrencyHelper.formatCurrencyWithLocale` formatiert.

## End-to-End-Arbeitsabläufe

### Mitglied einmalig und regelmäßig (B1App)

Der authentifizierte Spenden-Bildschirm (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setzt drei apphelper-Komponenten zusammen: `MultiGatewayDonationForm`, `PaymentMethods` und `RecurringDonations`. B1App macht die umliegende Daten-Last -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- und übergeben die Gateway-Liste durch; der aufgelöste Provider lädt sein eigenes SDK vom Gateway's öffentlich-Schlüssel. Die Charge selbst passiert innerhalb apphelper: der aufgelöste Provider tokenisiert die (neue oder gespeicherte) Methode, dann postet zu `/giving/donate/charge` für ein Einmalig-Geschenk oder `/giving/donate/subscribe` für ein regelmäßiges. Beide Endpunkte erleben einen angemeldeten Spender zu ihrer eigenen `personId` (nur `donations.edit` Halter dürfen zu jemandem sonst erleben) und weigern Mittel-Aufspaltungen, die mehr als den geladenen Betrag addieren. Regelmäßige Gaben erstellen ein `subscriptions` Zeile plus `subscriptionFunds` und Hand der Plan zum Gateway (Stripe Abonnements, PayPal Abrechnungs-Pläne oder KF regelmäßig Plane).

### Gast / anonym Geben

Die öffentliche Spenden-Seite (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) und die "Gib jetzt" Panel-Render `NonAuthDonationWrapper` von `@churchapps/apphelper/website`, welche reCAPTCHA und die Gateway's Elements Kontext um die Provider's `GuestForm` einfügt. Gäste bekommen keine Anmeldung, keine gespeicherten Methoden und keine Geschichte. Der Arbeitsablauf holt `GET /giving/funds/churchId/:id` und `GET /giving/donate/gateways/:churchId` (nur öffentlich-Schlüssel), verifiziert den Besucher mit `POST /giving/donate/captcha-verify`, tokenisiert im Browser und postet zu `/giving/donate/charge` (oder `/subscribe`). Gast ACH verwendet das anonym `POST /giving/paymentmethods/ach-setup-intent-anon`.

Drei Gast-Form-Optionen fahren auf dem gleichen Charge-Aufruf. `?fundId=` und `?amount=` auf der Spenden-URL wählen die Mittel-Aufspaltung vor (gelesen von jedem Provider's Gast-Form beim Montieren, geroutet durch den normalen Mittel-Wechsel-Handler daher Gesamtsummen und Gebühren aktualisieren). `anonymous: true` macht `DonateController.charge` jede Person verwerfen der Client schickte und das Geschenk mit `personId = null` protokollieren; die Gast-Form überspringt `/people/loadOrCreate` und der Kunde/Vault Schritt und die drei unmittelbar-Protokoll-Provider stoppen das Auflösen einer Person vom Gateway Kunden. Apple Pay braucht die Seiten-Domain registriert mit Stripe, daher postet eine Stripe Gast-Form einmal pro Sitzung zum öffentlich, Tarif-begrenzt `POST /giving/donate/register-domain`, die nur eine Domain akzeptiert die zur Kirche gehört (`<subDomain>.b1.church`, eine Zeile in dem Inhalts-Modul's Domains-Tabelle oder ein lokaler Host) bevor die Stripe's Payment-Method-Domains API aufgerufen wird.

### Admin-Aufzeichnung und Stripe-Import (B1Admin)

Der B1Admin-Spenden-Abschnitt (`B1Admin/src/donations/`) ist, wo Finance-Teams arbeiten. Batch-Eintrag (`components/BulkDonationEntry.tsx`) erfasst Bargeld-/Scheck-/In-Art-Gaben durch Posting `/giving/donations` dann `/giving/funddonations` -- kein Gateway beteiligt. Mittel, Batches, Kampagnen und Aussagen jedem kartieren zu ihren `/giving/*` CRUD Routen. Der Mitglied-Stil Spenden-Panel (`B1Admin/src/donationComponents/`) wiederverwendet die gleichen apphelper-Komponenten als B1App.

Berichterstattung und Rechnungs-Abhebutzungen sind Client-seitig oder Report-Läufer-Arbeit, nicht Gateway-Arbeit: die Batch-Seite's QuickBooks-Export baut ein Journal-Eintrag-CSV aus die Batch's `donations` + `fundDonations` (Debit Nicht Eingezahlte Mittel, ein Kredit pro Mittel), die Lapsed Givers Reiter läuft `Api/reports/lapsedGivers.json` durch den generischen Bericht-Läufer mit Person-Namen aufgelöst von `ReportOutput` und Land-Beleg-Formate (Kanada / Australien / Neuseeland) sind Kirchen-Einstellungen im Mitgliedschafts-Key/Wert-Speicher gerendert von `GivingStatementDocument` und dupliziert in den B1App-Druck-Seite.

### Umwandlung gemischter-Währungs-Gesamtsummen

Jeder Endpunkt, der eine einzelne kombinierte Gesamtsumme über möglich-gemischte-Währungs-Gaben zurückgibt -- die Geben-Zusammenfassung KPIs (`GivingKpiCards`), ein Spenden-Batch-Gesamtsumme, ein Mittel-Gesamtsumme und die B1App-Spenden-Bildschirm's Jahr-zu-Datum/Periode-Gesamtsummen -- konvertiert zur Kirchen-Standard-Währung Server-seitig statt unlike-Währungen zu addieren. `Api/src/shared/helpers/ExchangeRateHelper.ts` holt Sätze von `api.frankfurter.dev` schlüsseln von der Kirchen-Währung, zwischenspeichert sie im Prozess für 12 Stunden und stellt `convertTotals(rows, churchCurrency, rates)` aus: Zeilen sind pre-gruppiert nach Währung in SQL (eine Handvoll Gruppen, nie eine pro-Geschenk-Konvertierung), jede Gruppe wird konvertiert und summiert und das Ergebnis trägt ein `isConverted` Flagge der Client verwendet um einen "Konvertiert in aktuelle Umtauschkurse" Hinweis anzuzeigen. Einzelne Spenden-Datensätze und historisch/Original-Währungs-Berichte werden nie konvertiert -- nur kombinierte Gesamtsummen sind.

Stripe-Import (`B1Admin/src/donations/StripeImportPage.tsx`) Rückfüllung Gaben machte außerhalb B1: es ruft `POST /giving/donate/replay-stripe-events` mit `dryRun: true` für eine Vorschau dann `dryRun: false` zur Importieren auf. Der Server listet Stripe-Events für die Datumsbereich auf und überspringt alles bereits aufgezeichnet -- abgeglichen zuerst nach `eventLogs` Provider-ID, dann nach `DonationRepo.findMatchingDonation` (Betrag + Datum + Person) daher ein Erneut-Lauf nie Doppel-Importiert.

## Webhooks und Abgleich

Gefestigte Zahlungen und Abonnement-Status-Änderungen erreichen `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Die Verarbeitung ist absichtlich idempotent:

1. **Verifiziere** -- `GatewayService.verifyWebhook` delegiert zum Provider's Signatur-Überprüfung; eine fehlgeschlagene Signatur gibt 401 zurück. Events, die keine Verarbeitung brauchen, kurzschließen mit 200.
2. **Dedupliziere die Event** -- `EventLogRepo.loadByProviderId` überspringt ein Webhook bereits in `eventLogs` aufgezeichnet.
3. **Dedupliziere die Spende** -- bevor es was erstellt, `DonationRepo.loadByTransactionId` ist gegen jede Kandidaten-ID der Nutzlast die Lager könnte tragen überprüft. Das absorbiert doppelte Lieferungen, Multi-Stadium ACH Events (ausstehend → gefestigt) und der Fall wo `/donate/charge` bereits das Geschenk optimistisch protokolliert.
4. **Anwenden** -- der Provider's `classifyWebhookEvent(eventType)` sagt, was die Event bedeutet (`donation` ausstehend/abgeschlossen, `cancel-subscription` oder `ignore`); abgeschlossene Zahlungen erstellen ein `complete` Spende (oder fördern ein vorhandenes `pending` oder `failed`), ACH-Stil Events landen als `pending` bishe Abrechnung, ein fehlgeschlagener Abonnement-Rechnung (Stripe `invoice.payment_failed`) erstellt ein `failed` Spende schlüsselweise auf der Rechnung-ID und Stornierung Events löscht den lokalen `subscriptions` Zeile. Der Controller inspiziert nie Provider-spezifische Event-Namen.

### Fehlgeschlagene regelmäßige Gaben und Dunning

Ein `failed` Spende ist die Arbeit-Einheit für Erholung. `GET /giving/donations/failed` listet sie mit der neuste Gateway Fehler-Nachricht von `eventLogs` und ein `canRetry` Flagge von die Gateway's Fähigkeiten; `POST /giving/donate/retry/:donationId` ruft die Provider's `retryFailedPayment` (Stripe zahlt die offene Rechnung) und die resultierende Webhook fördern die Zeile zu `complete` durch den normalen Dedup-Pfad. Dunning-Emails gehen zum Spender von dem Webhook-Handler am Tag 0, dann von `DunningHelper.run` in dem Mitternacht-Timer (verdrahtet in beide `lambda/timer-handler.ts` und `RailwayCron.ts`) auf Tag 3 und 7; jede Sendung wird in `eventLogs` als `provider: "dunning"`, `providerId: "<donationId>:<day>"` protokolliert, daher ein Erneut-Lauf emailt nie zweimal. Wenn Stripe aufgibt und das Abonnement storniert (`customer.subscription.deleted` mit `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` emailt den Spender einmal (`providerId: "<subscriptionId>:canceled"`); Spender- oder Admin-eingeleitete Stornierungen bleiben stille. Stripe addiert nie Events zu einem vorhandenes Endpunkt: nach Ändern `StripeHelper.webhookEvents`, entweder Re-speichern das Gateway oder laufen `tools/manual/stripe-webhook-events.ts` (Trocken-Lauf per Standard, `--apply` zu schreiben) gegen Production.

Provider mit `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) haben ihre Charges protokolliert von den `/charge` Antwort (kein Webhook Rund-Reise nötig für den glücklichen Pfad), während Stripe auf `payment_intent.succeeded` / `invoice.paid` und ACH `payment_intent.processing` anweist. Gebühren-Handling (`POST /giving/donate/fee`, die `payFees` Gateway-Flagge und jede Provider's `calculateFees`) berechnet den "Decke die Gebühren" Groß-Auswahl auf der Spender-Seite -- B1 nimmt keine Platform-Kürzung, daher wird keine Anwendungs-Gebühr jemals addiert.

:::info
Der Charge und Webhook-Pfade schreiben die gleichen `donations` / `fundDonations` Zeilen. Die `transactionId` ist der Join-Schlüssel, der ein optimistisches Charge-Protokoll und sein später Webhook hält von zwei Spenden für ein Geschenk produzierend.
:::

## Verwandte Seiten

- [Geben-Endpunkte](../api/endpoints/giving) -- Vollständige REST-Oberfläche für Spenden, Mittel, Batches, Gateways, Abonnements, Payment-Methoden und Webhooks
- [AppHelper](../shared-libraries/app-helper) -- das npm Paket das die Payment-Provider-Registry und Spenden-Komponenten schifft
- [Modulstruktur](../api/module-structure) -- wie die GivingApi Modul Server-seitig organisiert ist

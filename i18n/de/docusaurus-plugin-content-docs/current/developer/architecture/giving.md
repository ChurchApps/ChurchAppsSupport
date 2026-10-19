---
title: "Architektur der Spendenfunktion"
---

# Architektur der Spendenfunktion

<div class="article-intro">

ChurchApps wickelt Spenden nach einem Gateway-Modell ab: Die Kirche behält ihr eigenes Stripe-Konto (oder PayPal, Kingdom Funding oder Paystack), und B1 ist nie als Zahlungsabwickler im Geldfluss beteiligt. Kartendaten werden im Browser tokenisiert und erreichen nie einen ChurchApps-Server. Diese Seite beschreibt den gesamten Stack – die clientseitige Anbieter-Registry in `@churchapps/apphelper`, die GivingApi-Gateway-Abstraktion, das Spenden-Datenmodell und wie Gateway-Webhooks wieder mit der Datenbank abgeglichen werden.

</div>

## Überblick

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

Drei Grundsätze gelten im gesamten Stack:

1. **Das Gateway hält die Karte.** Das Eingabe-Widget jedes Anbieters tokenisiert im Browser; die API erhält nur ein Token, eine Nonce oder eine Bestell-ID.
2. **Eine Abstraktion, viele Anbieter.** Der Browser löst einen `PaymentProvider` aus einer Registry auf; der Server löst einen `IGatewayProvider` aus einer Factory auf. Beide greifen über denselben normalisierten Anbieternamen zu, der im Gateway-Datensatz gespeichert ist.
3. **Webhooks sind die maßgebliche Quelle für die Abrechnung.** Eine Antwort auf eine Belastung wird optimistisch erfasst, aber erst der signierte Webhook des Gateways bestätigt (oder erstellt) die abgeschlossene Spende – auf beiden Seiten mit Idempotenz-Schutz.

## Clientseitig: die Registry der Zahlungsanbieter (`@churchapps/apphelper`)

Die Registry befindet sich in `Packages/apphelper/src/donations/providers/`, wobei die Widgets und Hilfsfunktionen jedes Anbieters in einem eigenen Unterordner liegen (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) – außerhalb von `providers/` verzweigt nichts anhand eines Anbieternamens. Ein `PaymentProvider` (siehe `providers/types.ts`) bündelt alles, was eine Host-App für ein Gateway benötigt: einen `descriptor` (Bezeichnungen für die Verwaltung, unterstützte Währungen, Gebührenfelder, Standard-Gebührensätze, URLs für Dashboard/Registrierung), eine Menge `capabilities` (gespeicherte Karten, ACH, wiederkehrende Zahlungen, Karteneingabe für neue Karten, implizites Speichern beim Tokenisieren), die React-Widgets für die Eingabe durch Mitglieder (`MemberWrapper`/`MemberEntry`), Gastspenden (`GuestForm`), die Bearbeitung gespeicherter Zahlungsmethoden (`MethodEditForm`) und Zahlungen über Formularfragen (`FormPayment`) sowie `buildChargeRequest(ctx, token)` – die einzige Stelle, an der sich die Struktur der Belastungsanfrage je Anbieter unterscheidet. Der `MemberWrapper` jedes Anbieters lädt sein eigenes SDK anhand des öffentlichen Schlüssels aus dem Gateway-Datensatz, daher importieren Host-Apps nie ein Gateway-SDK (B1App und B1Admin haben keine Abhängigkeit zu `@stripe/*`). `pickDefaultGateway(gateways, capability?)` legt zentral fest, welches der Gateways einer Kirche eine Oberfläche verwenden soll.

`providers/registry.ts` enthält die integrierten Anbieter. Sie werden **per Wert referenziert** und nicht über einen Seiteneffekt beim Modulladen registriert, sodass das Tree-Shaking des Bundlers die Registrierung niemals entfernen kann:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funktion | Zweck |
|----------|---------|
| `getPaymentProvider(name)` | Auflösung über den normalisierten Namen; fällt auf Stripe zurück, damit ein falsch konfigurierter Anbieter das Spendenformular nie hart abstürzen lässt |
| `registerPaymentProvider(p)` | Registriert zur Laufzeit einen zusätzlichen Anbieter (für ein individuelles Gateway einer Host-App) |
| `listPaymentProviders()` | Listet integrierte und individuelle Anbieter auf – dient zum Aufbau der Gateway-Auswahlliste in der Verwaltung |
| `hasPaymentProvider(name)` | Prüft die Zugehörigkeit |

**Integrierte clientseitige Anbieter: Stripe, PayPal, Kingdom Funding, Paystack.** B1App und B1Admin *lesen* die Registry nur (`getPaymentProvider`, `listPaymentProviders`); keine der beiden ruft `registerPaymentProvider` auf – die Registrierung bleibt innerhalb von apphelper.

Jeder Anbieter tokenisiert anders, doch alle halten die Karte aus B1 heraus:

| Anbieter | Eingabe-Widget | An die API zurückgegebenes Token |
|----------|----------------|-----------------------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; das Gastformular bindet außerdem ein `ExpressCheckoutElement` ein (Apple Pay / Google Pay, einmalige Gaben), dessen `onConfirm` auf dieselbe `pm_…`-ID auflöst | ID der Zahlungsmethode (`pm_…`); Bankkonto über `/paymentmethods/ach-setup-intent` – Financial Connections `us_bank_account` für USD-Gateways, kanadisches PAD `acss_debit` (gehostetes Mandat-Modal, Mandat `default_for` für Rechnungen/Abos; Einmalbelastungen übergeben die Mandat-ID) für CAD-Gateways |
| Kingdom Funding | Gehostetes Tokenizer-Formular, gesteuert über den öffentlichen Schlüssel des Gateways | Einmalige Nonce |
| PayPal | PayPal Hosted Fields (Karte, wiederkehrend) sowie PayPal Smart Buttons mit Venmo-Finanzierung (einmalig); beide nutzen ein gemeinsames SDK und die serverseitig über `/donate/client-token` + `/donate/create-order` erstellte Bestellung | Erfasste Bestell-ID |
| Paystack | Paystack Inline-Popup (`js.paystack.co/v2/inline.js`) – das Popup selbst nimmt die Zahlung entgegen (Karte, Mobile Money, Banküberweisung, USSD) | Referenz der bezahlten Transaktion; gespeicherte Methoden sind Paystack-Autorisierungscodes `AUTH_…` |

Die Funktion `finalizeResult` von Stripe führt 3-D Secure / SCA im Browser aus (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), bevor die Spende als abgeschlossen gilt; das gemeinsame Formular ruft lediglich `provider.finalizeResult(result)` auf, ohne zu wissen, was dabei geschieht.

## Serverseitig: die Gateway-Abstraktion (GivingApi)

Das Modul `/giving` (`Api/src/modules/giving`) stellt die REST-Schnittstelle bereit; die Gateway-Logik befindet sich in `Api/src/shared/helpers`. `DonateController` spricht nie direkt mit einem Gateway-SDK – er geht über `GatewayService`, der den passenden `IGatewayProvider` aus `GatewayFactory` auflöst und ihm eine entschlüsselte `GatewayConfig` übergibt.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ist der Vertrag, den jedes Gateway umsetzt – Webhook-Lebenszyklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), Zahlung (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), Gebühren (`calculateFees`), Verwaltung gespeicherter Zahlungsmethoden (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) sowie optionale Erweiterungen (Kunden, Bestellungen, SetupIntents, Wiedergabe von Ereignissen, `retryFailedPayment` für eine fehlgeschlagene Abo-Rechnung, `registerPaymentMethodDomain` für die Domain-Verifizierung bei Apple Pay). Ein Anbieter, der einen optionalen Hook weglässt, meldet diese Aktion als nicht unterstützt, und die Benutzeroberfläche blendet das zugehörige Steuerelement aus. Jede Anbieterklasse deklariert ihre eigene Matrix `capabilities` (unterstützte Währungen, ACH, Rückerstattungen, Anforderungen an Abos, Transaktionslimits) – `GatewayService.getProviderCapabilities(provider)` liest sie lediglich aus. Kennzeichen wie `logsDonationsImmediately` steuern das Verhalten der Controller, ohne dass die Controller Bedingungen anhand des Anbieternamens enthalten.

**Serveranbieter, die in `GatewayFactory` registriert sind:**

| Anbieter | Verfügbarkeit |
|----------|-------------|
| Stripe | Immer aktiv |
| PayPal | Immer aktiv |
| Kingdom Funding | Immer aktiv |
| Paystack | Immer aktiv (Händler in Nigeria, Ghana, Südafrika, Kenia, Côte d'Ivoire; Währungen NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Auf Anfrage über die Umgebungsvariable `ENABLE_SQUARE` |
| ePayMints | Auf Anfrage über die Umgebungsvariable `ENABLE_EPAYMINTS` |

Paystack unterscheidet sich von den anderen darin, dass das Geld bewegt wird, bevor GivingApi einbezogen wird: Das Popup belastet den Spender, `processCharge` ist ein `GET /transaction/verify/:reference`, dessen bezahlter Betrag und dessen Währung mit der zu erfassenden Spende übereinstimmen müssen (eine bereits hinterlegte Referenz wird niemals doppelt erfasst), und die erste Gabe eines wiederkehrenden Zeitplans wird aus `finalizeSubscription` erfasst (verify → `POST /plan` → `POST /subscription` mit `start_date` ein Intervall in der Zukunft). Webhooks werden mit dem geheimen Schlüssel selbst signiert (`x-paystack-signature`, HMAC-SHA512 über den unveränderten Body), und Paystack bietet keine API zur Verwaltung von Webhooks, daher zeigt der Verwaltungsbildschirm die URL, die die Kirche in ihr Dashboard eintragen muss. Verlängerungs-Ereignisse `charge.success` enthalten keine Aufteilung auf Fonds; der Anbieter ermittelt sie aus den lokalen Zeilen `subscriptions`/`subscriptionFunds` des Spenders. Nur Kartenautorisierungen sind `reusable` – Mobile-Money-Gaben sind ausschließlich einmalig, daher lehnt `createSubscription` sie ab. Die Demodaten legen eine zweite Kirche an (Accra Community Church, `CHU00000002`) mit einem Paystack-Testmodus-Gateway in GHS, sodass die Playwright-Suite für Paystack neben der Stripe-Suite von Grace läuft.

Individuelle Anbieter können zur Laufzeit registriert werden, wenn `ENABLE_CUSTOM_GATEWAY_PROVIDERS` gesetzt ist; `AbstractExperimentalGatewayProvider` ist die Basisklasse dafür. Anbieternamen werden ohne Beachtung der Groß-/Kleinschreibung abgeglichen.

### Gateway-Konfiguration und Geheimnisse

Ein Administrator speichert Zugangsdaten des Gateways über `POST /giving/gateways` (`GatewayController`). Beim Speichern verschlüsselt der Controller den privaten und den Webhook-Schlüssel mit `EncryptionHelper`, bevor er sie speichert, und – auf jedem Host außer localhost – löscht er den bestehenden Webhook der Kirche und richtet einen neuen ein, der auf `/giving/donate/webhook/{provider}?churchId=…` verweist. Eine Kirche behält je Anbieter genau eine Zeile: Beim Speichern eines Gateways wird nur die bestehende Zeile für denselben Anbieter ersetzt. Öffentliche Lesevorgänge (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) geben nur öffentliche Schlüssel zurück.

## Datenmodell

Das Schema `giving` (`Api/src/modules/giving/db/DatabaseTypes.ts`, Modelle in `models/`) ist ein MySQL-Schema, auf das über Kysely zugegriffen wird:

| Tabelle | Funktion |
|-------|------|
| `gateways` | Anbieterkonfiguration je Kirche: `provider`, `publicKey`, verschlüsselte `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Zweckbestimmungen für Gaben (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppierung für Erfassung/Berichte (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Eine Gabe: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; Spendenbescheinigungen, Summen, Dashboards und Spendenberichte zählen nur `complete` oder null), `transactionId` |
| `fundDonations` | Aufteilung einer Spende auf einen oder mehrere Fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Wiederkehrende Gabe; `id` ist die Abo-ID des Gateways, verknüpft mit `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Aufteilung einer wiederkehrenden Gabe auf Fonds |
| `customers` | Verknüpft eine `personId` mit ihrer Kunden-ID beim Gateway, je `provider` |
| `gatewayPaymentMethods` | Gespeicherte Karten/Bankkonten: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Protokoll der Webhook-/Ereignisse und Schlüssel zur Deduplizierung (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Zusagekampagnen, die mit einem Fonds verknüpft sind, und der zugesagte Betrag jeder Person |

Eine Spende wird über `fundDonations` auf Fonds aufgeteilt – die Spende enthält die Gesamtsumme, jede `fundDonation` enthält einen Anteil. `donations.currency` und `gateways.currency` enthalten den ISO-Währungscode; jeder Anbieter gibt seine `supportedCurrencies` an, und Beträge werden mit `CurrencyHelper.formatCurrencyWithLocale` formatiert.

## Abläufe von Anfang bis Ende

### Einmalige und wiederkehrende Gaben von Mitgliedern (B1App)

Die Spendenseite für angemeldete Nutzer (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setzt drei Komponenten aus apphelper zusammen: `MultiGatewayDonationForm`, `PaymentMethods` und `RecurringDonations`. B1App übernimmt das umgebende Laden der Daten – `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` – und reicht die Liste der Gateways durch; der aufgelöste Anbieter lädt sein eigenes SDK anhand des öffentlichen Schlüssels des Gateways. Die eigentliche Belastung erfolgt innerhalb von apphelper: Der aufgelöste Anbieter tokenisiert die (neue oder gespeicherte) Zahlungsmethode und sendet dann eine Anfrage an `/giving/donate/charge` für eine einmalige Gabe bzw. an `/giving/donate/subscribe` für eine wiederkehrende. Beide Endpunkte ordnen eine angemeldete spendende Person ihrer eigenen `personId` zu (nur Inhaber von `donations.edit` dürfen eine Spende einer anderen Person zuordnen) und lehnen Fondsaufteilungen ab, deren Summe den belasteten Betrag übersteigt. Wiederkehrende Gaben legen eine Zeile `subscriptions` sowie `subscriptionFunds` an und übergeben den Zeitplan an das Gateway (Stripe Subscriptions, PayPal Billing Plans oder ein wiederkehrender KF-Zeitplan).

### Gastspenden und anonyme Spenden

Die öffentliche Spendenseite (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) und das Panel „Jetzt geben“ rendern `NonAuthDonationWrapper` aus `@churchapps/apphelper/website`, das reCAPTCHA und den Elements-Kontext des Gateways um das `GuestForm` des Anbieters legt. Gäste erhalten keine Anmeldung, keine gespeicherten Methoden und keinen Verlauf. Der Ablauf ruft `GET /giving/funds/churchId/:id` und `GET /giving/donate/gateways/:churchId` ab (nur öffentliche Schlüssel), prüft den Besucher mit `POST /giving/donate/captcha-verify`, tokenisiert im Browser und sendet an `/giving/donate/charge` (bzw. `/subscribe`). Das ACH-Verfahren für Gäste nutzt den anonymen Endpunkt `POST /giving/paymentmethods/ach-setup-intent-anon`, der nur die sofortige Verifizierung (Financial Connections) erlaubt: Eine Überprüfung per Kleinstbetrag ist erst Tage später abgeschlossen, wenn die Gästeseite längst geschlossen ist, und könnte die Gabe daher nie vollenden. Das Formular verweigert die Belastung eines nicht verifizierten SetupIntent und verweist den Spender auf Karte oder die Einrichtung eines Bankkontos im angemeldeten Zustand.

Drei Optionen des Gastformulars nutzen denselben Belastungsaufruf. `?fundId=` und `?amount=` in der Spenden-URL wählen die Fondsaufteilung vor (von dem Gastformular jedes Anbieters beim Einhängen gelesen und über den üblichen Handler für Fondsänderungen geleitet, damit Summen und Gebühren aktualisiert werden). `anonymous: true` bewirkt, dass `DonateController.charge` jede vom Client gesendete Person verwirft und die Gabe mit `personId = null` erfasst; das Gastformular überspringt `/people/loadOrCreate` sowie den Schritt für Kunde/Tresor, und die drei Anbieter mit sofortiger Erfassung ermitteln keine Person mehr anhand des Gateway-Kunden. Apple Pay erfordert, dass die Domain der Seite bei Stripe registriert ist. Daher sendet ein Stripe-Gastformular einmal pro Sitzung eine Anfrage an den öffentlichen, ratenbegrenzten Endpunkt `POST /giving/donate/register-domain`, der nur eine Domain akzeptiert, die zur Kirche gehört (`<subDomain>.b1.church`, eine Zeile in der Domain-Tabelle des Content-Moduls oder ein lokaler Host), bevor die Payment-Method-Domains-API von Stripe aufgerufen wird.

### Erfassung durch Verwaltung und Stripe-Import (B1Admin)

Der Bereich Spenden in B1Admin (`B1Admin/src/donations/`) ist der Arbeitsbereich des Finanzteams. Die Erfassung im Stapel (`components/BulkDonationEntry.tsx`) erfasst Bar-, Scheck- und Sachspenden, indem sie `/giving/donations` und anschließend `/giving/funddonations` sendet – ohne Gateway. Der Dialog **Spende erfassen** im Datensatz einer Person (`components/LogGiftDialog.tsx`) macht dasselbe für eine einzelne Gabe: Er sucht zuerst den Stapel, dessen `batchDate` mit dem Datum der Gabe übereinstimmt, oder legt einen neuen Stapel mit diesem Datum als Namen an (`POST /giving/donationbatches`), und löscht die Spende bzw. den neuen Stapel wieder, falls ein späterer Schritt fehlschlägt. Fonds, Stapel, Kampagnen und Spendenbescheinigungen entsprechen jeweils ihren CRUD-Routen unter `/giving/*`. Die Seiten für Spendenbescheinigungen (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) fragen ein Kalenderjahr über `GET /donations?startDate=&endDate=` und `GET /fundDonations?startDate=&endDate=` ab, statt die gesamte Historie der Kirche zu laden, die die Antwortgrößenbegrenzung von Lambda überschreiten könnte. Das Spendenpanel im Mitgliederstil (`B1Admin/src/donationComponents/`) verwendet dieselben apphelper-Komponenten wie B1App.

Berichte und Übergaben an die Buchhaltung finden clientseitig oder im Berichtsablauf statt, nicht im Gateway: Die QuickBooks-Export-Funktion der Stapelseite erstellt aus `donations` + `fundDonations` des Stapels eine CSV-Journalbuchung (Soll: Undeposited Funds, je Fonds eine Habenbuchung). Die Ansicht „Lapsed Givers“ der Zusammenfassung führt `Api/reports/lapsedGivers.json` über den allgemeinen Berichtsablauf aus, wobei die Namen der Personen von `ReportOutput` aufgelöst werden. Länderspezifische Formate für Spendenquittungen (Kanada / Australien / Neuseeland) sind Kircheneinstellungen im Schlüssel-Wert-Speicher der Mitgliedschaft, die von `GivingStatementDocument` gerendert und auf der Druckseite von B1App dupliziert werden. Die Druckseiten für Spendenbescheinigungen in B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) übergeben die Einstellung `logoLight` der Kirche (über `usePrintLogo` in `B1Admin/src/components/PrintChurchHeader.tsx`), damit das Logo oben auf jeder Bescheinigung gedruckt wird, und warten auf das Bild, bevor der automatische Druck startet.

### Stapelstatus und die Berechtigung „Spenden erfassen“

Stapel können geschlossen werden, damit ein gezählter Geldeingang unverändert bleibt. `POST /giving/donationbatches/:id/close` und `/:id/reopen` (nur Donations.Edit) sind die einzigen Stellen, die `status`, `closedDate` und `closedBy` schreiben (`DonationBatchRepo.setStatus`); ein normales Speichern eines Stapels fasst diese Felder nie an, daher kann das Buchen eines Stapels ihn nicht wieder öffnen. Die Schreibrechte sind zentral in `Api/src/modules/giving/helpers/BatchAccessHelper.ts` geregelt: Donations.Edit darf alles ändern, während die enger gefasste Berechtigung Donations.Enter (`GivingApi` / `Donations` / `Enter`, „Spenden erfassen“ im Rollen-Editor) Stapel anlegen sowie Spenden und Fondsaufteilungen speichern oder löschen darf – aber nur, solange sowohl der aktuelle Stapel der Spende als auch der Zielstapel geöffnet sind, und niemals bei einer Gabe über das Gateway (eine mit `transactionId`). Ein abgelehnter Schreibvorgang liefert `403 { error: "This batch is closed." }`. Beim Lesen von Stapeln werden Donations.ViewSummary oder Donations.Enter akzeptiert, damit eine zählende Person den Stapel auswählen kann, in den sie erfasst. Auf dem Client spiegelt `B1Admin/src/donations/batchAccess.ts` diese Regeln (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), und `Header` / `SecondaryMenuHelper` zeigen **Spenden > Stapel** jedem, der Stapel sehen darf, auch ohne View Summary.

### Umrechnung von Summen in gemischten Währungen

Jeder Endpunkt, der eine einzige kombinierte Summe über möglicherweise gemischte Währungen zurückgibt – die Kennzahlen der Spendenübersicht (`GivingKpiCards`), die Summe eines Spendenstapels, die Summe eines Fonds sowie die Summen für das laufende Jahr bzw. den Zeitraum auf der Spendenseite von B1App –, rechnet serverseitig in die Standardwährung der Kirche um, statt ungleiche Währungen zu addieren. `Api/src/shared/helpers/ExchangeRateHelper.ts` ruft Kurse von `api.frankfurter.dev` ab, die nach der Kirchenwährung geschlüsselt sind, speichert sie 12 Stunden lang im Prozess und stellt `convertTotals(rows, churchCurrency, rates)` bereit: Die Zeilen werden in SQL bereits nach Währung gruppiert (wenige Gruppen, niemals eine Umrechnung je Gabe), jede Gruppe wird umgerechnet und summiert, und das Ergebnis enthält ein Kennzeichen `isConverted`, mit dem der Client den Hinweis „Umgerechnet zu aktuellen Wechselkursen“ anzeigt. `GET /donations/exchange-rates` stellt die Kurstabelle für Clients bereit, die sie benötigen (die Spendenseite von B1App); die Kurse selbst werden nie aus einer Anfrage übernommen, sondern ausschließlich serverseitig abgerufen, sodass ein Client keine gemeldete Summe beeinflussen kann. Einzelne Spendendatensätze sowie historische Berichte in der Originalwährung werden nie umgerechnet – nur kombinierte Summen.

Der Stripe-Import (`B1Admin/src/donations/StripeImportPage.tsx`) übernimmt Gaben, die außerhalb von B1 getätigt wurden: Er ruft `POST /giving/donate/replay-stripe-events` mit `dryRun: true` für eine Vorschau auf, danach mit `dryRun: false` für den Import. Der Server listet die Stripe-Ereignisse für den Zeitraum auf und überspringt alles, was bereits erfasst ist – zuerst abgeglichen über die Provider-ID in `eventLogs`, dann über die Transaktions-ID, dann über `DonationRepo.findMatchingDonation` (Betrag + Datum + Person), sodass ein erneuter Lauf nie doppelt importiert. Ereignisse `charge.succeeded` / `payment_intent.succeeded` für Abos werden übersprungen, weil `invoice.paid` diese Gaben erfasst; neuere Stripe-API-Versionen entfernen `PaymentIntent.invoice`, daher wird das Überspringen zusätzlich über die Beschreibung „Subscription …“ erkannt.

## Webhooks und Abgleich

Abgeschlossene Zahlungen und Änderungen an Abos gehen bei `POST /giving/donate/webhook/:provider?churchId=…` ein (`DonateController.webhook`). Die Verarbeitung ist bewusst idempotent:

1. **Verifizieren** — `GatewayService.verifyWebhook` delegiert an die Signaturprüfung des Anbieters; eine fehlgeschlagene Signatur liefert 401. Ereignisse, die keine Verarbeitung benötigen, werden mit 200 sofort beendet.
2. **Ereignis deduplizieren** — `EventLogRepo.loadByProviderId` überspringt einen Webhook, der bereits in `eventLogs` erfasst ist.
3. **Spende deduplizieren** — bevor etwas angelegt wird, prüft `DonationRepo.loadByTransactionId` jede mögliche ID, die die Nutzlast enthalten könnte. Damit werden doppelte Zustellungen, mehrstufige ACH-Ereignisse (ausstehend → abgerechnet) und der Fall abgefangen, dass `/donate/charge` die Gabe bereits optimistisch erfasst hat.
4. **Anwenden** — `classifyWebhookEvent(eventType)` des Anbieters legt fest, was das Ereignis bedeutet (`donation` ausstehend/abgeschlossen, `cancel-subscription` oder `ignore`); abgeschlossene Zahlungen legen eine `complete`-Spende an (oder stufen eine bestehende `pending`- oder `failed`-Spende hoch), ACH-artige Ereignisse werden bis zur Abrechnung als `pending` erfasst, eine fehlgeschlagene Abo-Rechnung (Stripe `invoice.payment_failed`) legt eine `failed`-Spende an, die über die Rechnungs-ID geführt wird, und Kündigungsereignisse löschen die lokale Zeile `subscriptions`. Der Controller prüft nie anbieterspezifische Ereignisnamen.

### Fehlgeschlagene wiederkehrende Gaben und Mahnwesen

Eine `failed`-Spende ist die Arbeitseinheit für die Wiederherstellung. `GET /giving/donations/failed` listet sie mit der neuesten Fehlermeldung des Gateways aus `eventLogs` und einem Kennzeichen `canRetry` aus den Fähigkeiten des Gateways auf; `POST /giving/donate/retry/:donationId` ruft `retryFailedPayment` des Anbieters auf (Stripe begleicht die offene Rechnung), und der daraus resultierende Webhook stuft die Zeile über den normalen Deduplizierungspfad auf `complete` hoch. Mahnungen gehen vom Webhook-Handler am Tag 0 an den Spender, danach von `DunningHelper.run` im Mitternachts-Timer (verdrahtet in `lambda/timer-handler.ts` und `RailwayCron.ts`) nach 3 und 7 Tagen; jede Versendung wird in `eventLogs` als `provider: "dunning"`, `providerId: "<donationId>:<day>"` erfasst, sodass ein erneuter Lauf nie doppelt versendet. Wenn Stripe aufgibt und das Abo kündigt (`customer.subscription.deleted` mit `cancellation_details.reason: "payment_failed"`), sendet `DunningHelper.notifyCanceled` dem Spender genau einmal eine E-Mail (`providerId: "<subscriptionId>:canceled"`); Kündigungen durch Spender oder Verwaltung bleiben ohne Nachricht. Stripe fügt einem bestehenden Endpunkt nie neue Ereignisse hinzu: Nach einer Änderung an `StripeHelper.webhookEvents` muss man das Gateway erneut speichern oder `tools/manual/stripe-webhook-events.ts` ausführen (standardmäßig Testlauf, `--apply` zum Schreiben) gegen die Produktivumgebung.

Anbieter mit `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) werden über die Antwort auf `/charge` erfasst (im Normalfall ohne Umweg über einen Webhook), während Stripe auf `payment_intent.succeeded` / `invoice.paid` und ACH-`payment_intent.processing` angewiesen ist. Die Gebührenbehandlung (`POST /giving/donate/fee`, das Gateway-Kennzeichen `payFees` und `calculateFees` jedes Anbieters) berechnet die Aufschlagsrechnung „Gebühren übernehmen“ auf Seiten des Spenders – B1 erhebt keinen Anteil der Plattform, daher wird nie eine Anwendungsgebühr aufgeschlagen.

:::info
Der Belastungs- und der Webhook-Pfad schreiben dieselben Zeilen in `donations` / `fundDonations`. Die `transactionId` ist der Verknüpfungsschlüssel, der verhindert, dass eine optimistische Erfassung der Belastung und ihr späterer Webhook zwei Spenden für eine Gabe erzeugen.
:::

## Verwandte Seiten

- [Giving-Endpunkte](../api/endpoints/giving) — vollständige REST-Schnittstelle für Spenden, Fonds, Stapel, Gateways, Abos, Zahlungsmethoden und Webhooks
- [AppHelper](../shared-libraries/app-helper) — das npm-Paket, das die Registry der Zahlungsanbieter und die Spendenkomponenten enthält
- [Modulstruktur](../api/module-structure) — wie das GivingApi-Modul serverseitig aufgebaut ist

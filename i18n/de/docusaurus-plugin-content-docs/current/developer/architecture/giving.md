---
title: "Giving-Architektur"
---

# Giving-Architektur

<div class="article-intro">

ChurchApps betreibt Spenden nach einem Gateway-Modell: Die Gemeinde unterhält ihr eigenes Stripe-Konto (oder PayPal, Kingdom Funding bzw. Paystack), und B1 steht nie als Plattform-Zahlungsabwickler im Geldfluss. Kartendaten werden im Browser tokenisiert und erreichen nie einen Server von ChurchApps. Diese Seite beschreibt den gesamten Stack: die clientseitige Anbieter-Registry in `@churchapps/apphelper`, die Gateway-Abstraktion der GivingApi, das Datenmodell der Spenden und wie Webhooks der Gateways wieder in die Datenbank übernommen werden.

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
2. **Eine Abstraktion, viele Anbieter.** Der Browser löst einen `PaymentProvider` aus einer Registry auf; der Server löst einen `IGatewayProvider` aus einer Factory auf. Beide arbeiten mit demselben normalisierten Anbieternamen, der im Gateway-Datensatz gespeichert ist.
3. **Webhooks sind die Quelle der Wahrheit für die Abwicklung.** Eine Antwort auf eine Belastung wird optimistisch erfasst, doch der signierte Webhook des Gateways bestätigt (oder legt an) die abgeschlossene Spende — mit Idempotenz-Schutz auf beiden Seiten.

## Clientseitig: die Registry der Zahlungsanbieter (`@churchapps/apphelper`)

Die Registry liegt in `Packages/apphelper/src/donations/providers/`; die Widgets und Hilfsfunktionen jedes Anbieters liegen in einem eigenen Unterordner (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Außerhalb von `providers/` verzweigt nichts anhand eines Anbieternamens. Ein `PaymentProvider` (siehe `providers/types.ts`) bündelt alles, was eine Host-App für ein Gateway benötigt: einen `descriptor` (Bezeichnungen für die Administration, unterstützte Währungen, Gebührenfelder, Standard-Gebührensätze, Links zu Dashboard und Anmeldung), eine Gruppe von `capabilities`-Flags (gespeicherte Karten, ACH, wiederkehrende Zahlungen, Eingabe neuer Karten direkt im Formular, implizites Speichern beim Tokenisieren), die React-Widgets für die Eingabe durch Mitglieder (`MemberWrapper`/`MemberEntry`), für Gastspenden (`GuestForm`), für die Bearbeitung gespeicherter Zahlungsmethoden (`MethodEditForm`) und für Zahlungen über Formularfragen (`FormPayment`) sowie `buildChargeRequest(ctx, token)` — die einzige Stelle, an der sich die Struktur der Belastungsanfrage je Anbieter unterscheidet. Der `MemberWrapper` jedes Anbieters lädt sein eigenes SDK anhand des öffentlichen Schlüssels aus dem Gateway-Datensatz, sodass Host-Apps nie ein Gateway-SDK importieren (B1App und B1Admin haben keine Abhängigkeit von `@stripe/*`). `pickDefaultGateway(gateways, capability?)` legt zentral fest, welches der Gateways einer Gemeinde eine Oberfläche verwenden soll.

`providers/registry.ts` enthält die integrierten Anbieter. Sie werden **per Wert referenziert** und nicht über einen Seiteneffekt beim Laden des Moduls registriert, sodass das Tree-Shaking des Bundlers die Registrierung nie entfernen kann:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funktion | Zweck |
|----------|---------|
| `getPaymentProvider(name)` | Auflösung über den normalisierten Namen; fällt auf Stripe zurück, damit ein falsch konfigurierter Anbieter das Spendenformular nicht hart abstürzen lässt |
| `registerPaymentProvider(p)` | Registriert zur Laufzeit einen zusätzlichen Anbieter (etwa ein eigenes Gateway einer Host-App) |
| `listPaymentProviders()` | Zählt integrierte und eigene Anbieter auf — dient dem Aufbau der Auswahlliste für Gateways in der Administration |
| `hasPaymentProvider(name)` | Prüft die Zugehörigkeit |

**Integrierte clientseitige Anbieter: Stripe, PayPal, Kingdom Funding, Paystack.** B1App und B1Admin *lesen* die Registry nur (`getPaymentProvider`, `listPaymentProviders`); keine von beiden ruft `registerPaymentProvider` auf — die Registrierung bleibt innerhalb von apphelper.

Jeder Anbieter tokenisiert auf eine andere Weise, doch alle halten die Karte aus B1 heraus:

| Anbieter | Eingabe-Widget | An die API zurückgegebenes Token |
|----------|--------------|-----------------------|
| Stripe | Stripe-`Elements`-`CardElement` → `stripe.createPaymentMethod(...)`; das Gastformular bindet außerdem ein `ExpressCheckoutElement` ein (Apple Pay / Google Pay, für einmalige Spenden), dessen `onConfirm` dieselbe `pm_…`-ID liefert | ID der Zahlungsmethode (`pm_…`); Bankkonto über `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` für USD-Gateways, kanadisches PAD `acss_debit` (gehostetes Mandat-Modal, Mandat `default_for` Rechnungen/Abonnements; Einmalbelastungen übergeben die Mandats-ID) für CAD-Gateways |
| Kingdom Funding | Gehosteter Tokenizer-Formular, gesteuert über den öffentlichen Gateway-Schlüssel | Einmal verwendbare Nonce |
| PayPal | PayPal Hosted Fields (Karte, wiederkehrend) sowie PayPal Smart Buttons mit Venmo-Finanzierung (einmalig); beide nutzen einen gemeinsamen SDK-Ladevorgang und die serverseitige Bestellung, die über `/donate/client-token` + `/donate/create-order` erstellt wird | Erfasste Bestell-ID |
| Paystack | Paystack-Inline-Popup (`js.paystack.co/v2/inline.js`) — das Popup selbst nimmt die Zahlung entgegen (Karte, Mobile Money, Banküberweisung, USSD) | Referenz der bezahlten Transaktion; gespeicherte Methoden sind Paystack-`AUTH_…`-Autorisierungscodes |

Stripes `finalizeResult` führt die 3-D-Secure-/SCA-Prüfung im Browser aus (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), bevor die Spende als abgeschlossen gilt. Das gemeinsame Formular ruft lediglich `provider.finalizeResult(result)` auf und kennt die Details nicht.

## Serverseitig: die Gateway-Abstraktion (GivingApi)

Das Modul `/giving` (`Api/src/modules/giving`) stellt die REST-Schnittstelle bereit; die Gateway-Infrastruktur liegt in `Api/src/shared/helpers`. `DonateController` spricht nie direkt mit einem Gateway-SDK. Er geht über `GatewayService`, der den passenden `IGatewayProvider` aus `GatewayFactory` auflöst und ihm eine entschlüsselte `GatewayConfig` übergibt.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ist der Vertrag, den jedes Gateway erfüllt — Lebenszyklus der Webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), Zahlungen (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), Gebühren (`calculateFees`), Verarbeitung gespeicherter Zahlungsmethoden (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) sowie optionale Erweiterungen (Kunden, Bestellungen, SetupIntents, Wiederholung von Ereignissen, `retryFailedPayment` für eine fehlgeschlagene Abonnementrechnung, `registerPaymentMethodDomain` für die Domänenprüfung bei Apple Pay). Ein Anbieter, der einen optionalen Hook nicht implementiert, wird für diese Aktion als nicht unterstützt gemeldet, und die Oberfläche blendet das zugehörige Steuerelement aus. Jede Anbieterklasse deklariert ihre eigene Matrix `capabilities` (unterstützte Währungen, ACH, Rückerstattungen, Anforderungen an Abonnements, Transaktionslimits) — `GatewayService.getProviderCapabilities(provider)` liest sie lediglich aus. Flags wie `logsDonationsImmediately` steuern das Verhalten der Controller, ohne dass die Controller Bedingungen anhand von Anbieternamen enthalten.

**Serverseitige Anbieter in `GatewayFactory`:**

| Anbieter | Verfügbarkeit |
|----------|-------------|
| Stripe | Immer aktiv |
| PayPal | Immer aktiv |
| Kingdom Funding | Immer aktiv |
| Paystack | Immer aktiv (Händler in Nigeria, Ghana, Südafrika, Kenia, Côte d'Ivoire; Währungen NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Optional über die Umgebungsvariable `ENABLE_SQUARE` |
| ePayMints | Optional über die Umgebungsvariable `ENABLE_EPAYMINTS` |

Paystack unterscheidet sich von den übrigen darin, dass das Geld fließt, bevor GivingApi beteiligt ist: Das Popup belastet den Spender, `processCharge` ist ein `GET /transaction/verify/:reference`, dessen bezahlter Betrag und dessen Währung mit der zu erfassenden Spende übereinstimmen müssen (eine bereits vorhandene Referenz wird nie doppelt erfasst), und die erste Zahlung eines wiederkehrenden Plans wird aus `finalizeSubscription` erfasst (verify → `POST /plan` → `POST /subscription` mit `start_date` um ein Intervall in der Zukunft). Webhooks werden mit dem geheimen Schlüssel selbst signiert (`x-paystack-signature`, HMAC-SHA512 über den Rohtext), und Paystack bietet keine API zur Verwaltung von Webhooks, daher zeigt die Administrationsseite die URL, die die Gemeinde in ihr Dashboard einfügen muss. `charge.success`-Ereignisse bei Verlängerungen enthalten keine Fondsaufteilung; der Anbieter ermittelt sie aus den lokalen Zeilen `subscriptions`/`subscriptionFunds` des Spenders. Nur Kartenautorisierungen sind `reusable` — Mobile-Money-Zahlungen sind nur einmalig, daher lehnt `createSubscription` sie ab. Die Demodaten enthalten eine zweite Gemeinde (Accra Community Church, `CHU00000002`) auf einem Paystack-Testmodus-Gateway in GHS, damit die Paystack-Playwright-Suite neben derjenigen von Stripe läuft.

Eigene Anbieter können zur Laufzeit registriert werden, wenn `ENABLE_CUSTOM_GATEWAY_PROVIDERS` gesetzt ist; `AbstractExperimentalGatewayProvider` ist die Basisklasse dafür. Anbieternamen werden ohne Berücksichtigung der Groß-/Kleinschreibung abgeglichen.

### Gateway-Konfiguration und Geheimnisse

Ein Administrator speichert die Zugangsdaten eines Gateways über `POST /giving/gateways` (`GatewayController`). Beim Speichern verschlüsselt der Controller den privaten und den Webhook-Schlüssel mit `EncryptionHelper`, bevor er sie speichert. Danach — auf jedem Host, der nicht localhost ist — löscht er den bestehenden Webhook der Gemeinde und richtet einen neuen ein, der auf `/giving/donate/webhook/{provider}?churchId=…` zeigt. Eine Gemeinde hat pro Anbieter genau eine Zeile; das Speichern eines Gateways ersetzt nur die bestehende Zeile desselben Anbieters. Öffentliche Lesezugriffe (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) liefern nur öffentliche Schlüssel.

## Datenmodell

Das Giving-Schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, Modelle in `models/`) ist ein MySQL-Schema, auf das über Kysely zugegriffen wird:

| Tabelle | Funktion |
|-------|------|
| `gateways` | Konfiguration des Anbieters je Gemeinde: `provider`, `publicKey`, verschlüsselter `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Spendenzweckbestimmungen (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppierung für Erfassung und Berichte (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Eine Gabe: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; Bescheinigungen, Summen, Dashboards und Spendenberichte zählen nur `complete` oder null), `transactionId` |
| `fundDonations` | Aufteilung einer Spende auf einen oder mehrere Fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Wiederkehrende Gabe; `id` ist die Abonnement-ID des Gateways, verknüpft mit `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondsaufteilung für eine wiederkehrende Gabe |
| `customers` | Verknüpft eine `personId` mit ihrer Kunden-ID beim Gateway, je `provider` |
| `gatewayPaymentMethods` | Gespeicherte Karten/Bankkonten: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Prüfpfad der Webhook-Ereignisse und Schlüssel zur Duplikatserkennung (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Zusagenkampagnen, die an einen Fonds gebunden sind, sowie der zugesagte Betrag jeder Person |

Eine Spende wird über `fundDonations` auf Fonds verteilt — die Spende trägt die Gesamtsumme, jede `fundDonation` trägt einen Anteil. `donations.currency` und `gateways.currency` tragen die ISO-Währung; jeder Anbieter gibt seine `supportedCurrencies` an, und Beträge werden mit `CurrencyHelper.formatCurrencyWithLocale` formatiert.

## Vollständige Abläufe

### Mitglied: einmalige und wiederkehrende Spende (B1App)

Die Spendenseite für angemeldete Benutzer (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setzt drei Komponenten von apphelper zusammen: `MultiGatewayDonationForm`, `PaymentMethods` und `RecurringDonations`. B1App übernimmt das umgebende Laden der Daten — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — und reicht die Liste der Gateways durch; der aufgelöste Anbieter lädt sein eigenes SDK anhand des öffentlichen Schlüssels des Gateways. Die eigentliche Belastung erfolgt innerhalb von apphelper: Der aufgelöste Anbieter tokenisiert die (neue oder gespeicherte) Methode und sendet dann an `/giving/donate/charge` für eine einmalige Gabe bzw. an `/giving/donate/subscribe` für eine wiederkehrende. Beide Endpunkte ordnen eine angemeldete spendende Person ihrer eigenen `personId` zu (nur Inhaber von `donations.edit` dürfen einer anderen Person zuordnen) und lehnen Fondsaufteilungen ab, deren Summe den belasteten Betrag übersteigt. Wiederkehrende Gaben legen eine Zeile `subscriptions` samt `subscriptionFunds` an und übergeben den Zeitplan an das Gateway (Stripe Subscriptions, PayPal Billing Plans oder ein wiederkehrender Zeitplan bei KF).

### Gastspenden und anonyme Spenden

Die öffentliche Spendenseite (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) und das Panel „Jetzt geben“ rendern `NonAuthDonationWrapper` aus `@churchapps/apphelper/website`. Dieser bindet reCAPTCHA und den Elements-Kontext des Gateways um das `GuestForm` des Anbieters. Gäste erhalten keine Anmeldung, keine gespeicherten Methoden und keinen Verlauf. Der Ablauf lädt `GET /giving/funds/churchId/:id` und `GET /giving/donate/gateways/:churchId` (nur öffentliche Schlüssel), prüft den Besucher mit `POST /giving/donate/captcha-verify`, tokenisiert im Browser und sendet an `/giving/donate/charge` (oder `/subscribe`). Der Prüfaufruf liefert ein 10 Minuten gültiges, mit HMAC signiertes `captchaPass` (`Api/src/modules/giving/helpers/CaptchaPass.ts`), das das Formular bei jedem Geldvorgang eines Gastes mitsendet. Ist `CAPTCHA_ENFORCE=true` gesetzt, lehnt die API Gastaufrufe von `create-order`, `charge`, `subscribe`, `addcard` und `ach-setup-intent-anon` ohne gültigen Pass für diese Gemeinde ab. Gast-ACH nutzt den anonymen Endpunkt `POST /giving/paymentmethods/ach-setup-intent-anon`, der nur die sofortige Verifizierung (Financial Connections) erlaubt: Eine Prüfung über Kleinstbeträge dauert Tage und läuft erst, nachdem die Gastseite nicht mehr besteht, sodass die Spende nie abgeschlossen werden könnte. Das Formular belastet kein unverifiziertes SetupIntent und verweist den Spender auf Karte oder die Einrichtung eines Bankkontos nach Anmeldung.

Drei Optionen des Gastformulars nutzen denselben Belastungsaufruf. `?fundId=` und `?amount=` in der Spenden-URL wählen die Fondsaufteilung vor (von jedem Gastformular des Anbieters beim Laden gelesen und über den üblichen Handler für Fondsänderungen geleitet, sodass Summen und Gebühren aktualisiert werden). `anonymous: true` bewirkt, dass `DonateController.charge` eine vom Client übermittelte Person verwirft und die Gabe mit `personId = null` erfasst; das Gastformular überspringt `/people/loadOrCreate` und den Schritt mit Kunde/Tresor, und die drei Anbieter, die sofort erfassen, lösen über den Gateway-Kunden keine Person mehr auf. Apple Pay benötigt, dass die Domain der Seite bei Stripe registriert ist. Deshalb sendet ein Stripe-Gastformular einmal pro Sitzung an den öffentlichen, ratenbegrenzten Endpunkt `POST /giving/donate/register-domain`, der nur eine Domain akzeptiert, die zur Gemeinde gehört (`<subDomain>.b1.church`, eine Zeile in der Domain-Tabelle des Content-Moduls oder ein lokaler Host), bevor die Payment-Method-Domains-API von Stripe aufgerufen wird.

### Administrative Erfassung und Stripe-Import (B1Admin)

Der Bereich Spenden in B1Admin (`B1Admin/src/donations/`) ist der Arbeitsplatz der Finanzteams. Die Stapelerfassung (`components/BulkDonationEntry.tsx`) erfasst Bar-, Scheck- und Sachspenden, indem sie `/giving/donations` und danach `/giving/funddonations` sendet — ohne Beteiligung eines Gateways. Das Dialogfeld **Log a gift** im Personendatensatz (`components/LogGiftDialog.tsx`) tut dasselbe für eine einzelne Gabe: Es sucht zuerst den Stapel, dessen `batchDate` mit dem Datum der Gabe übereinstimmt, oder legt einen nach diesem Datum benannten an (`POST /giving/donationbatches`), und löscht die Spende bzw. den neuen Stapel wieder, falls ein späterer Schritt fehlschlägt. Fonds, Stapel, Kampagnen und Bescheinigungen sind jeweils ihren CRUD-Routen unter `/giving/*` zugeordnet. Die Seiten für Spendenbescheinigungen (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) fragen mit `GET /donations?startDate=&endDate=` und `GET /fundDonations?startDate=&endDate=` ein Kalenderjahr statt der gesamten Historie der Gemeinde ab, da diese die Antwortgrenze von Lambda überschreiten könnte. Das Spenden-Panel im Stil eines Mitglieds (`B1Admin/src/donationComponents/`) verwendet dieselben apphelper-Komponenten wie B1App.

Berichte und Übergaben an die Buchhaltung sind clientseitige Arbeit oder Arbeit des Berichtsläufers, nicht Arbeit des Gateways: Die Exportfunktion für QuickBooks auf der Stapelseite erstellt aus `donations` + `fundDonations` des Stapels eine CSV-Journalbuchung (Soll Undeposited Funds, eine Haben-Buchung je Fonds). Die Ansicht Lapsed Givers auf der Übersichtsseite führt `Api/reports/lapsedGivers.json` über den allgemeinen Berichtsläufer aus, wobei `ReportOutput` die Namen der Personen auflöst. Länderspezifische Formate für Quittungen (Kanada / Australien / Neuseeland) sind Gemeindeeinstellungen im Schlüssel-Wert-Speicher des Membership-Moduls; sie werden von `GivingStatementDocument` dargestellt und in der Druckseite von B1App dupliziert. Die Druckseiten für Bescheinigungen in B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) übergeben die Einstellung `logoLight` der Gemeinde (über `usePrintLogo` in `B1Admin/src/components/PrintChurchHeader.tsx`), damit das Logo oben auf jeder Bescheinigung gedruckt wird, und warten auf das Bild, bevor der automatische Druck startet.

### Stapelstatus und die Berechtigung „Spenden erfassen“

Stapel können geschlossen werden, damit ein gezählter Einzahlungsbetrag unverändert bleibt. `POST /giving/donationbatches/:id/close` und `/:id/reopen` (nur Donations.Edit) sind die einzigen Schreiber von `status`, `closedDate` und `closedBy` (`DonationBatchRepo.setStatus`). Ein normales Speichern eines Stapels fasst sie nie an, sodass das Buchen eines Stapels ihn nicht wieder öffnen kann. Der Schreibzugriff ist zentral in `Api/src/modules/giving/helpers/BatchAccessHelper.ts` geregelt: Donations.Edit darf alles ändern, während die engere Berechtigung Donations.Enter (`GivingApi` / `Donations` / `Enter`, „Enter Donations“ im Rollen-Editor) Stapel anlegen und Spenden sowie Fondsaufteilungen nur speichern oder löschen darf, solange sowohl der aktuelle Stapel der Spende als auch ihr Zielstapel geöffnet sind, und niemals bei einer Gateway-Zahlung (mit `transactionId`). Ein abgelehnter Schreibvorgang liefert `403 { error: "This batch is closed." }`. Das Lesen von Stapeln akzeptiert Donations.ViewSummary oder Donations.Enter, damit eine Zählkraft den Stapel auswählen kann, in den sie erfasst. Auf der Clientseite spiegelt `B1Admin/src/donations/batchAccess.ts` diese Regeln (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), und `Header` / `SecondaryMenuHelper` zeigen **Donations > Batches** allen, die Stapel sehen dürfen, auch ohne Berechtigung View Summary.

### Summen mit gemischten Währungen umrechnen

Jeder Endpunkt, der eine einzige kombinierte Summe über möglicherweise verschieden lautende Gaben zurückgibt — die Kennzahlen der Spendenübersicht (`GivingKpiCards`), die Summe eines Spendenstapels, die Summe eines Fonds sowie die Jahres- und Zeitraumsummen der Spendenseite von B1App —, rechnet serverseitig in die Standardwährung der Gemeinde um, statt ungleiche Währungen zu addieren. `Api/src/shared/helpers/ExchangeRateHelper.ts` lädt die Kurse von `api.frankfurter.dev` mit der Gemeindewährung als Schlüssel, speichert sie 12 Stunden lang im Prozessspeicher zwischen und stellt `convertTotals(rows, churchCurrency, rates)` bereit: Die Zeilen werden in SQL bereits nach Währung gruppiert (wenige Gruppen, niemals eine Umrechnung je Gabe), jede Gruppe wird umgerechnet und summiert, und das Ergebnis trägt ein Flag `isConverted`, mit dem der Client den Hinweis „Converted at current exchange rates“ anzeigt. `GET /donations/exchange-rates` stellt die Kurstabelle für Clients bereit, die sie benötigen (die Spendenseite von B1App). Die Kurse werden nie aus einer Anfrage übernommen, sondern ausschließlich serverseitig geladen, sodass ein Client eine gemeldete Summe nicht beeinflussen kann. Einzelne Spendendatensätze sowie historische Berichte in der Originalwährung werden nie umgerechnet — nur kombinierte Summen.

Der Stripe-Import (`B1Admin/src/donations/StripeImportPage.tsx`) übernimmt Gaben, die außerhalb von B1 getätigt wurden: Er ruft `POST /giving/donate/replay-stripe-events` mit `dryRun: true` für eine Vorschau auf und danach mit `dryRun: false` für den Import. Der Server listet die Stripe-Ereignisse für den Zeitraum auf und überspringt alles, was bereits erfasst ist — zuerst über die Provider-ID in `eventLogs`, danach über die Transaktions-ID, dann über `DonationRepo.findMatchingDonation` (Betrag + Datum + Person), sodass ein erneuter Lauf nichts doppelt importiert. Ereignisse `charge.succeeded` / `payment_intent.succeeded` für Abonnements werden übersprungen, weil `invoice.paid` diese Gaben erfasst. Neuere Versionen der Stripe-API entfernen `PaymentIntent.invoice`; daher erkennt die Überspringlogik zusätzlich die Beschreibung „Subscription …“.

## Webhooks und Abgleich

Abgeschlossene Zahlungen und Änderungen am Status von Abonnements gehen unter `POST /giving/donate/webhook/:provider?churchId=…` ein (`DonateController.webhook`). Die Verarbeitung ist bewusst idempotent:

1. **Prüfen** — `GatewayService.verifyWebhook` delegiert an die Signaturprüfung des Anbieters; eine fehlgeschlagene Signatur liefert 401. Ereignisse, die keine Verarbeitung benötigen, werden mit 200 abgekürzt.
2. **Ereignis auf Duplikate prüfen** — `EventLogRepo.loadByProviderId` überspringt einen Webhook, der bereits in `eventLogs` erfasst ist.
3. **Spende auf Duplikate prüfen** — bevor etwas angelegt wird, prüft `DonationRepo.loadByTransactionId` jede mögliche ID, die die Nutzlast enthalten könnte. Dies fängt doppelte Zustellungen, mehrstufige ACH-Ereignisse (ausstehend → abgewickelt) sowie den Fall ab, dass `/donate/charge` die Gabe bereits optimistisch erfasst hat.
4. **Anwenden** — `classifyWebhookEvent(eventType)` des Anbieters legt fest, was das Ereignis bedeutet (`donation` ausstehend/abgeschlossen, `cancel-subscription` oder `ignore`). Abgeschlossene Zahlungen legen eine Spende mit `complete` an (oder heben eine vorhandene `pending`- oder `failed`-Spende hoch); Ereignisse im ACH-Stil landen als `pending`, bis die Abwicklung erfolgt; eine fehlgeschlagene Abonnementrechnung (Stripe `invoice.payment_failed`) legt eine Spende mit `failed` an, die über die Rechnungs-ID zugeordnet wird; Kündigungsereignisse löschen die lokale Zeile `subscriptions`. Der Controller wertet niemals anbieterspezifische Ereignisnamen aus.

### Fehlgeschlagene wiederkehrende Gaben und Mahnwesen

Eine Spende mit dem Status `failed` ist die Arbeitseinheit für die Wiederherstellung. `GET /giving/donations/failed` listet sie mit der neuesten Fehlermeldung des Gateways aus `eventLogs` und einem Flag `canRetry` aus den Fähigkeiten des Gateways auf; `POST /giving/donate/retry/:donationId` ruft `retryFailedPayment` des Anbieters auf (Stripe begleicht die offene Rechnung), und der daraus entstehende Webhook hebt die Zeile über den normalen Duplikatpfad auf `complete`. Mahn-E-Mails gehen am Tag 0 aus dem Webhook-Handler an den Spender, danach am 3. und 7. Tag aus `DunningHelper.run` im Mitternachts-Timer (verdrahtet in `lambda/timer-handler.ts` und `RailwayCron.ts`). Jeder Versand wird in `eventLogs` als `provider: "dunning"`, `providerId: "<donationId>:<day>"` protokolliert, damit ein erneuter Lauf nie doppelt mailt. Gibt Stripe auf und kündigt das Abonnement (`customer.subscription.deleted` mit `cancellation_details.reason: "payment_failed"`), schickt `DunningHelper.notifyCanceled` dem Spender genau eine E-Mail (`providerId: "<subscriptionId>:canceled"`); Kündigungen durch Spender oder Administration bleiben still. Stripe fügt einem bestehenden Endpunkt nie neue Ereignisse hinzu: Nach einer Änderung an `StripeHelper.webhookEvents` muss man das Gateway erneut speichern oder `tools/manual/stripe-webhook-events.ts` ausführen (standardmäßig Probelauf, mit `--apply` schreibend) gegen die Produktionsumgebung.

Anbieter mit `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) werden über die Antwort auf `/charge` erfasst (kein Webhook-Umweg für den Normalfall nötig), während Stripe auf `payment_intent.succeeded` / `invoice.paid` und ACH-`payment_intent.processing` setzt. Die Gebührenbehandlung (`POST /giving/donate/fee`, das Gateway-Flag `payFees` und `calculateFees` jedes Anbieters) berechnet die Aufrechnung „Gebühren übernehmen“ auf Seiten des Spenders — B1 erhebt keinen eigenen Anteil, daher wird nie eine Anwendungsgebühr hinzugefügt.

:::info
Der Belastungs- und der Webhook-Pfad schreiben dieselben Zeilen `donations` / `fundDonations`. Die `transactionId` ist der Verbindungsschlüssel, der verhindert, dass eine optimistische Erfassung der Belastung und der spätere Webhook zwei Spenden für eine einzige Gabe erzeugen.
:::

## Verwandte Seiten

- [Giving-Endpunkte](../api/endpoints/giving) — vollständige REST-Schnittstelle für Spenden, Fonds, Stapel, Gateways, Abonnements, Zahlungsmethoden und Webhooks
- [AppHelper](../shared-libraries/app-helper) — das npm-Paket, das die Registry der Zahlungsanbieter und die Spendenkomponenten enthält
- [Modulstruktur](../api/module-structure) — wie das GivingApi-Modul serverseitig organisiert ist

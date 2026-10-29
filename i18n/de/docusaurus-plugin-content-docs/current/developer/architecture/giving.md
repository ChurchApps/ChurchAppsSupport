---
title: "Architektur der Spenden"
---

# Architektur der Spenden

<div class="article-intro">

ChurchApps betreibt Spenden nach einem Gateway-Modell: Die Kirche behält ihr eigenes Stripe-Konto (oder PayPal, Kingdom Funding oder Paystack), und B1 sitzt nie selbst im Zahlungsfluss als Zahlungsabwickler. Kartendaten werden im Browser tokenisiert und erreichen nie einen ChurchApps-Server. Diese Seite beschreibt den gesamten Aufbau -- die clientseitige Anbieter-Registrierung in `@churchapps/apphelper`, die Gateway-Abstraktion der GivingApi, das Datenmodell der Spenden und wie Webhooks der Gateways in die Datenbank zurückgeführt werden.

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

Drei Grundsätze gelten im gesamten Aufbau:

1. **Das Gateway hält die Karte.** Jedes Eingabe-Widget eines Anbieters tokenisiert im Browser; die API erhält nur ein Token, einen Nonce oder eine Bestell-ID.
2. **Eine Abstraktion, viele Anbieter.** Der Browser löst einen `PaymentProvider` aus einer Registrierung auf; der Server löst einen `IGatewayProvider` aus einer Factory auf. Beide arbeiten mit demselben normalisierten Anbieternamen, der im Gateway-Datensatz gespeichert ist.
3. **Webhooks sind die Quelle der Wahrheit für die Abrechnung.** Die Antwort auf eine Belastung wird optimistisch erfasst, aber der signierte Webhook des Gateways bestätigt (oder erzeugt) die abgeschlossene Spende -- auf beiden Seiten mit Idempotenzschutz.

## Clientseitig: die Registrierung der Zahlungsanbieter (`@churchapps/apphelper`)

Die Registrierung liegt in `Packages/apphelper/src/donations/providers/`. Die Widgets und Hilfsfunktionen jedes Anbieters liegen in einem eigenen Unterordner (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`); außerhalb von `providers/` verzweigt nichts nach einem Anbieternamen. Ein `PaymentProvider` (siehe `providers/types.ts`) bündelt alles, was eine Host-App für ein Gateway braucht: einen `descriptor` (Bezeichnungen für die Verwaltung, unterstützte Währungen, Gebührenfelder, Standard-Gebührensätze, Links zu Dashboard und Anmeldung), eine Gruppe von `capabilities` (gespeicherte Karten, ACH, wiederkehrend, Eingabe einer neuen Karte im Formular, implizites Speichern beim Tokenisieren), die React-Widgets für die Eingabe durch Mitglieder (`MemberWrapper`/`MemberEntry`), Gastspenden (`GuestForm`), die Bearbeitung gespeicherter Methoden (`MethodEditForm`) und Zahlungen über Formularfragen (`FormPayment`) sowie `buildChargeRequest(ctx, token)` -- der einzige Ort, an dem sich die Form der Belastungsanfrage je Anbieter unterscheidet. Der `MemberWrapper` jedes Anbieters lädt sein eigenes SDK aus dem öffentlichen Schlüssel des Gateway-Datensatzes, daher importieren Host-Apps nie ein Gateway-SDK (B1App und B1Admin haben keine Abhängigkeit von `@stripe/*`). `pickDefaultGateway(gateways, capability?)` legt zentral fest, welches der Gateways einer Kirche eine Oberfläche verwenden soll.

`providers/registry.ts` enthält die eingebauten Anbieter. Sie werden **als Wert referenziert** und nicht über einen Seiteneffekt beim Laden des Moduls registriert, sodass das Tree-Shaking des Bundlers die Registrierung nie entfernen kann:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funktion | Zweck |
|----------|---------|
| `getPaymentProvider(name)` | Auflösung über den normalisierten Namen; fällt auf Stripe zurück, damit ein falsch konfigurierter Anbieter das Spendenformular nie hart abstürzen lässt |
| `registerPaymentProvider(p)` | Einen zusätzlichen Anbieter zur Laufzeit registrieren (für ein eigenes Gateway einer Host-App) |
| `listPaymentProviders()` | Eingebaute und eigene Anbieter aufzählen -- dient zum Aufbau der Auswahl der Gateways in der Verwaltung |
| `hasPaymentProvider(name)` | Prüfung auf Zugehörigkeit |

**Eingebaute Anbieter im Client: Stripe, PayPal, Kingdom Funding, Paystack.** B1App und B1Admin lesen die Registrierung nur (`getPaymentProvider`, `listPaymentProviders`); keine von beiden ruft `registerPaymentProvider` auf -- die Registrierung bleibt innerhalb von apphelper.

Jeder Anbieter tokenisiert anders, aber alle halten die Karte aus B1 heraus:

| Anbieter | Eingabe-Widget | An die API zurückgegebenes Token |
|----------|--------------|-----------------------|
| Stripe | Stripe-`Elements`-`CardElement` → `stripe.createPaymentMethod(...)`; das Gastformular bindet außerdem ein `ExpressCheckoutElement` (Apple Pay / Google Pay, für einmalige Gaben) ein, dessen `onConfirm` auf dieselbe ID `pm_…` führt | ID der Zahlungsmethode (`pm_…`); Bank über `/paymentmethods/ach-setup-intent` -- Financial Connections `us_bank_account` für USD-Gateways, kanadisches PAD `acss_debit` (gehostetes Mandats-Modal, Mandat mit `default_for` für Rechnungen und Abos, Einzelbelastungen übergeben die Mandats-ID) für CAD-Gateways |
| Kingdom Funding | Gehosteter Tokenizer-Formular, über den öffentlichen Schlüssel des Gateways | einmaliger Nonce |
| PayPal | PayPal Hosted Fields (Karte, wiederkehrend) sowie PayPal Smart Buttons mit Venmo-Finanzierung (einmalig); beide teilen sich ein SDK und die serverseitige Bestellung über `/donate/client-token` + `/donate/create-order` | erfasste Bestell-ID |
| Paystack | Paystack-Inline-Popup (`js.paystack.co/v2/inline.js`) -- das Popup selbst nimmt die Zahlung entgegen (Karte, Mobile Money, Banküberweisung, USSD) | bezahlte Transaktionsreferenz; gespeicherte Methoden sind Paystack-Autorisierungscodes `AUTH_…` |

Die `finalizeResult` von Stripe führt 3-D Secure / SCA im Browser aus (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), bevor die Spende als abgeschlossen gilt. Das gemeinsame Formular ruft nur `provider.finalizeResult(result)` auf und kennt den Inhalt nicht.

## Serverseitig: die Gateway-Abstraktion (GivingApi)

Das Modul `/giving` (`Api/src/modules/giving`) stellt die REST-Schnittstelle bereit; die Gateway-Infrastruktur liegt in `Api/src/shared/helpers`. `DonateController` spricht nie direkt mit einem Gateway-SDK -- er geht über `GatewayService`, der den passenden `IGatewayProvider` aus `GatewayFactory` auflöst und ihm eine entschlüsselte `GatewayConfig` übergibt.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ist der Vertrag, den jedes Gateway erfüllt: Lebenszyklus der Webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), Zahlung (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), Gebühren (`calculateFees`), Verwaltung gespeicherter Methoden (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) und optionale Erweiterungen (Kunden, Bestellungen, SetupIntents, Wiedergabe von Ereignissen, `retryFailedPayment` für eine fehlgeschlagene Abo-Rechnung, `registerPaymentMethodDomain` für die Domänenprüfung bei Apple Pay). Implementiert ein Anbieter eine optionale Methode nicht, gilt die Aktion für ihn als nicht unterstützt, und die Oberfläche blendet die Steuerung aus. Jede Anbieterklasse deklariert ihre eigene Matrix `capabilities` (unterstützte Währungen, ACH, Rückerstattungen, Anforderungen an Abos, Transaktionsgrenzen) -- `GatewayService.getProviderCapabilities(provider)` liest sie nur aus. Merkmale wie `logsDonationsImmediately` steuern das Verhalten der Controller, ohne dass die Controller Bedingungen nach Anbietername enthalten.

**Serveranbieter, registriert in `GatewayFactory`:**

| Anbieter | Verfügbarkeit |
|----------|-------------|
| Stripe | Immer aktiv |
| PayPal | Immer aktiv |
| Kingdom Funding | Immer aktiv |
| Paystack | Immer aktiv (Händler in Nigeria, Ghana, Südafrika, Kenia, Côte d'Ivoire; Währungen NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Auf Anfrage über die Umgebungsvariable `ENABLE_SQUARE` |
| ePayMints | Auf Anfrage über die Umgebungsvariable `ENABLE_EPAYMINTS` |

Paystack unterscheidet sich von den anderen darin, dass Geld fließt, bevor GivingApi beteiligt ist: Das Popup belastet den Spender; `processCharge` ist ein `GET /transaction/verify/:reference`, dessen gezahlter Betrag und dessen Währung mit der zu erfassenden Spende übereinstimmen müssen (eine bereits erfasste Referenz wird nie doppelt eingetragen). Die erste Rate eines wiederkehrenden Plans wird aus `finalizeSubscription` erfasst (verify → `POST /plan` → `POST /subscription` mit `start_date` ein Intervall in der Zukunft). Webhooks werden mit dem geheimen Schlüssel selbst signiert (`x-paystack-signature`, HMAC-SHA512 über den rohen Body). Paystack bietet keine API zur Verwaltung von Webhooks; daher zeigt die Verwaltungsseite die URL, die die Kirche in ihr Dashboard eintragen muss. Ereignisse `charge.success` bei Verlängerungen enthalten keine Fondsaufteilung; der Anbieter holt sie aus den lokalen Zeilen `subscriptions`/`subscriptionFunds` des Spenders. Nur Kartenautorisierungen sind `reusable` -- Mobile-Money-Gaben sind ausschließlich einmalig, daher lehnt `createSubscription` sie ab. Die Demodaten enthalten eine zweite Kirche (Accra Community Church, `CHU00000002`) mit einem Paystack-Gateway im Testmodus für GHS, damit die Paystack-Playwright-Tests neben dem Stripe-Test von Grace laufen.

Eigene Anbieter können zur Laufzeit registriert werden, wenn `ENABLE_CUSTOM_GATEWAY_PROVIDERS` gesetzt ist; `AbstractExperimentalGatewayProvider` ist die Basisklasse dafür. Anbieternamen werden ohne Berücksichtigung der Groß-/Kleinschreibung zugeordnet.

### Gateway-Konfiguration und Geheimnisse

Ein Administrator speichert die Zugangsdaten eines Gateways über `POST /giving/gateways` (`GatewayController`). Beim Speichern verschlüsselt der Controller den privaten und den Webhook-Schlüssel mit `EncryptionHelper`, bevor sie gespeichert werden. Auf jedem Host außer localhost löscht er dann den bestehenden Webhook der Kirche und richtet einen neuen ein, der auf `/giving/donate/webhook/{provider}?churchId=…` zeigt. Eine Kirche hat je Anbieter genau eine Zeile: Das Speichern eines Gateways ersetzt nur die bestehende Zeile desselben Anbieters. Öffentliche Abfragen (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) liefern nur die öffentlichen Schlüssel.

## Datenmodell

Das Schema `giving` (`Api/src/modules/giving/db/DatabaseTypes.ts`, Modelle in `models/`) ist ein MySQL-Schema, auf das über Kysely zugegriffen wird:

| Tabelle | Aufgabe |
|-------|------|
| `gateways` | Konfiguration je Kirche und Anbieter: `provider`, `publicKey`, verschlüsselter `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Zweckbestimmungen der Gaben (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppierung für Erfassung und Berichte (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Eine Gabe: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; Bescheinigungen, Summen, Übersichten und Spendenberichte zählen nur `complete` oder null), `transactionId` |
| `fundDonations` | Verteilung einer Spende auf einen oder mehrere Fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Wiederkehrende Gabe; `id` ist die Abo-ID des Gateways, verknüpft mit `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondsaufteilung einer wiederkehrenden Gabe |
| `customers` | Verknüpft eine `personId` mit der Kunden-ID des Gateways je `provider` |
| `gatewayPaymentMethods` | Gespeicherte Karten/Bankkonten: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Prüfprotokoll der Webhook-Ereignisse und Schlüssel zur Deduplizierung (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Zusagenkampagnen, die an einen Fonds gebunden sind, und der zugesagte Betrag jeder Person |

Eine Spende wird über `fundDonations` auf Fonds verteilt -- die Spende trägt die Gesamtsumme, jede `fundDonation` trägt einen Anteil. `donations.currency` und `gateways.currency` tragen die ISO-Währung; jeder Anbieter gibt seine `supportedCurrencies` an, und Beträge werden mit `CurrencyHelper.formatCurrencyWithLocale` formatiert.

## Abläufe von Anfang bis Ende

### Einmalige und wiederkehrende Gaben eines Mitglieds (B1App)

Die Spendenseite für angemeldete Benutzer (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setzt drei Komponenten von apphelper zusammen: `MultiGatewayDonationForm`, `PaymentMethods` und `RecurringDonations`. B1App übernimmt das umgebende Laden der Daten -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- und gibt die Gateway-Liste weiter. Der aufgelöste Anbieter lädt sein eigenes SDK aus dem öffentlichen Schlüssel des Gateways. Die Belastung selbst findet in apphelper statt: Der aufgelöste Anbieter tokenisiert die (neue oder gespeicherte) Methode und sendet dann an `/giving/donate/charge` für eine einmalige Gabe bzw. `/giving/donate/subscribe` für eine wiederkehrende. Beide Endpunkte ordnen eine angemeldete Spenderin bzw. einen angemeldeten Spender der eigenen `personId` zu (nur Inhaber von `donations.edit` dürfen einer anderen Person zuordnen) und weisen Fondsaufteilungen ab, deren Summe den belasteten Betrag übersteigt. Wiederkehrende Gaben legen eine Zeile `subscriptions` samt `subscriptionFunds` an und übergeben den Zeitplan an das Gateway (Stripe Subscriptions, PayPal Billing Plans oder ein wiederkehrender Zeitplan bei KF).

### Gastspenden und anonyme Spenden

Die öffentliche Spendenseite (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) und das Panel "Jetzt geben" rendern `NonAuthDonationWrapper` aus `@churchapps/apphelper/website`. Dieser umgibt das `GuestForm` des Anbieters mit reCAPTCHA und dem Elements-Kontext des Gateways. Gäste erhalten keine Anmeldung, keine gespeicherten Methoden und keinen Verlauf. Der Ablauf lädt `GET /giving/funds/churchId/:id` und `GET /giving/donate/gateways/:churchId` (nur öffentliche Schlüssel), prüft den Besucher mit `POST /giving/donate/captcha-verify`, tokenisiert im Browser und sendet an `/giving/donate/charge` (bzw. `/subscribe`). Der Prüfaufruf liefert einen 10 Minuten gültigen, mit HMAC signierten `captchaPass` (`Api/src/modules/giving/helpers/CaptchaPass.ts`), den das Formular bei jedem Geldaufruf eines Gastes mitsendet. Mit `CAPTCHA_ENFORCE=true` verweigert die API Gastaufrufe von `create-order`, `charge`, `subscribe`, `addcard` und `ach-setup-intent-anon` ohne gültigen Pass für diese Kirche. Die Bank-Einrichtung für Gäste nutzt den anonymen Endpunkt `POST /giving/paymentmethods/ach-setup-intent-anon` und erlaubt nur die sofortige Verifizierung (Financial Connections): Eine Prüfung über Kleinstbeträge dauert Tage und endet, nachdem die Gastseite nicht mehr besteht, sodass die Gabe nie abgeschlossen werden könnte. Das Formular verweigert die Belastung eines nicht verifizierten SetupIntent und verweist den Spender auf Karte oder die Bankeinrichtung im angemeldeten Zustand.

Drei Optionen des Gastformulars nutzen denselben Belastungsaufruf. `?fundId=` und `?amount=` in der Spenden-URL wählen die Fondsaufteilung vor (von jedem Gastformular des Anbieters beim Laden gelesen und über den normalen Handler für Fondsänderungen geleitet, damit Summen und Gebühren aktualisiert werden). `anonymous: true` führt dazu, dass `DonateController.charge` eine vom Client übermittelte Person verwirft und die Gabe mit `personId = null` erfasst. Das Gastformular überspringt `/people/loadOrCreate` und den Schritt Kunde/Tresor, und die drei Anbieter mit sofortiger Erfassung lösen die Person nicht mehr aus dem Gateway-Kunden auf. Apple Pay setzt voraus, dass die Domain der Seite bei Stripe registriert ist. Ein Stripe-Gastformular sendet daher einmal je Sitzung an den öffentlichen, ratenbegrenzten Endpunkt `POST /giving/donate/register-domain`, der nur eine Domain akzeptiert, die zur Kirche gehört (`<subDomain>.b1.church`, eine Zeile in der Domain-Tabelle des Content-Moduls oder ein lokaler Host), bevor er die Domain-API für Zahlungsmethoden bei Stripe aufruft.

### Erfassung durch Verwaltung und Stripe-Import (B1Admin)

Der Bereich Spenden in B1Admin (`B1Admin/src/donations/`) ist der Arbeitsplatz der Finanzteams. Die Stapelerfassung (`components/BulkDonationEntry.tsx`) erfasst Bar-, Scheck- und Sachgaben, indem sie `/giving/donations` und danach `/giving/funddonations` sendet -- ohne Gateway. Das Fenster **Gabe erfassen** im Personendatensatz (`components/LogGiftDialog.tsx`) macht dasselbe für eine einzelne Gabe: Es sucht zuerst den Stapel mit dem passenden `batchDate` oder legt einen nach dem Datum benannten Stapel an (`POST /giving/donationbatches`), und löscht die Spende bzw. den neuen Stapel wieder, falls ein späterer Schritt fehlschlägt. Fonds, Stapel, Kampagnen und Bescheinigungen entsprechen jeweils den CRUD-Routen unter `/giving/*`. Die Seiten für Spendenbescheinigungen (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) fragen ein Kalenderjahr über `GET /donations?startDate=&endDate=` und `GET /fundDonations?startDate=&endDate=` ab, statt die gesamte Historie der Kirche zu laden, die die Antwortgrößenbegrenzung von Lambda überschreiten könnte. Das Panel für Spenden im Stil der Mitglieder (`B1Admin/src/donationComponents/`) nutzt dieselben apphelper-Komponenten wie B1App.

Die Berichte und Übergaben an die Buchhaltung sind clientseitige Arbeit oder Arbeit des Berichtslaufers, nicht Arbeit des Gateways: Der QuickBooks-Export der Stapelseite erzeugt aus `donations` + `fundDonations` des Stapels eine CSV-Journalbuchung (Soll Nicht eingezahlte Gelder, je Fonds eine Habenbuchung). Die Übersicht "Ehemals regelmäßig Gebende" der Summary-Seite führt `Api/reports/lapsedGivers.json` über den generischen Berichtslauf aus, wobei die Namen der Personen von `ReportOutput` aufgelöst werden. Länderformate für Bescheinigungen (Kanada / Australien / Neuseeland) sind Kircheneinstellungen im Schlüssel-Wert-Speicher des Mitgliedschaftsmoduls, die von `GivingStatementDocument` gerendert und auf der Druckseite der B1App dupliziert werden. Die Druckseiten für Bescheinigungen in B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) übergeben das Logo der Kirche über die Einstellung `logoLight` (über `usePrintLogo` in `B1Admin/src/components/PrintChurchHeader.tsx`), damit das Logo oben auf jeder Bescheinigung gedruckt wird, und warten auf das Bild, bevor sie automatisch drucken.

### Stapelstatus und die Berechtigung Spenden erfassen

Stapel können geschlossen werden, damit eine gezählte Einzahlung unverändert bleibt. `POST /giving/donationbatches/:id/close` und `/:id/reopen` (nur Donations.Edit) sind die einzigen Schreiber von `status`, `closedDate` und `closedBy` (`DonationBatchRepo.setStatus`). Ein normales Speichern eines Stapels berührt diese Felder nie, daher kann das Buchen eines Stapels ihn nicht wieder öffnen. Der Schreibzugriff ist zentral in `Api/src/modules/giving/helpers/BatchAccessHelper.ts` geregelt: Donations.Edit darf alles ändern, während die engere Berechtigung Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Spenden erfassen" im Rollen-Editor) Stapel anlegen und Spenden und Fondsaufteilungen nur speichern oder löschen darf, solange sowohl der aktuelle Stapel der Spende als auch der Zielstapel offen sind, und nie bei einer Gateway-Gabe (mit `transactionId`). Ein abgelehnter Schreibvorgang liefert `403 { error: "This batch is closed." }`. Das Lesen von Stapeln ist mit Donations.ViewSummary oder Donations.Enter möglich, damit eine Zählperson den Stapel finden kann, in den sie erfasst. Auf der Client-Seite spiegelt `B1Admin/src/donations/batchAccess.ts` diese Regeln (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), und `Header` / `SecondaryMenuHelper` zeigen **Spenden > Stapel** jedem, der Stapel sehen darf, auch ohne Übersicht.

### Umrechnung gemischter Währungssummen

Jeder Endpunkt, der eine einzelne Gesamtsumme über möglicherweise verschiedene Währungen liefert -- die Kennzahlen der Spendenübersicht (`GivingKpiCards`), die Summe eines Stapels, die Summe eines Fonds und die Summen für das laufende Jahr und den Zeitraum auf der Spendenseite der B1App -- rechnet serverseitig in die Standardwährung der Kirche um, statt ungleiche Währungen zu addieren. `Api/src/shared/helpers/ExchangeRateHelper.ts` lädt Kurse von `api.frankfurter.dev`, geschlüsselt nach der Kirchenwährung, speichert sie 12 Stunden im Prozess und stellt `convertTotals(rows, churchCurrency, rates)` bereit: Die Zeilen werden in SQL bereits nach Währung gruppiert (wenige Gruppen, nie eine Umrechnung je Gabe), jede Gruppe wird umgerechnet und summiert, und das Ergebnis trägt ein Kennzeichen `isConverted`, das der Client für den Hinweis "Umgerechnet zu aktuellen Wechselkursen" verwendet. `GET /donations/exchange-rates` gibt die Kurstabelle an Clients weiter, die sie brauchen (der Spendenbildschirm der B1App); die Kurse selbst werden nie aus einer Anfrage übernommen, sondern nur serverseitig geladen, sodass ein Client keine gemeldete Summe beeinflussen kann. Einzelne Spendendatensätze sowie historische Berichte in der Originalwährung werden nie umgerechnet -- nur kombinierte Summen.

Der Stripe-Import (`B1Admin/src/donations/StripeImportPage.tsx`) übernimmt Gaben, die außerhalb von B1 getätigt wurden: Er ruft `POST /giving/donate/replay-stripe-events` mit `dryRun: true` für eine Vorschau und danach mit `dryRun: false` zum Import auf. Der Server listet die Stripe-Ereignisse für den Zeitraum und überspringt alles, was bereits erfasst ist -- zuerst über die Provider-ID in `eventLogs`, dann über die Transaktions-ID, dann über `DonationRepo.findMatchingDonation` (Betrag, Datum und Person), damit ein erneuter Lauf nie doppelt importiert. Ereignisse `charge.succeeded` / `payment_intent.succeeded` bei Abos werden übersprungen, weil `invoice.paid` diese Gaben erfasst. Neuere Versionen der Stripe-API entfernen `PaymentIntent.invoice`; deshalb wird das Überspringen zusätzlich über die Beschreibung "Subscription …" geprüft.

## Webhooks und Abgleich

Abgeschlossene Zahlungen und Änderungen am Zustand von Abos treffen über `POST /giving/donate/webhook/:provider?churchId=…` ein (`DonateController.webhook`). Die Verarbeitung ist bewusst idempotent:

1. **Prüfen** — `GatewayService.verifyWebhook` delegiert an die Signaturprüfung des Anbieters; eine fehlgeschlagene Signatur liefert 401. Ereignisse, die nicht verarbeitet werden müssen, enden mit 200.
2. **Das Ereignis deduplizieren** — `EventLogRepo.loadByProviderId` überspringt einen Webhook, der bereits in `eventLogs` steht.
3. **Die Spende deduplizieren** — Bevor etwas angelegt wird, prüft `DonationRepo.loadByTransactionId` jede mögliche Kennung, die die Nutzlast tragen kann. Das fängt doppelte Zustellungen, mehrstufige ACH-Ereignisse (ausstehend → abgerechnet) und den Fall ab, dass `/donate/charge` die Gabe bereits optimistisch erfasst hat.
4. **Anwenden** — `classifyWebhookEvent(eventType)` des Anbieters sagt, was das Ereignis bedeutet (`donation` ausstehend/abgeschlossen, `cancel-subscription` oder `ignore`). Abgeschlossene Zahlungen legen eine Spende mit `complete` an (oder heben eine bestehende `pending`- oder `failed`-Spende an); ACH-artige Ereignisse werden bis zur Abrechnung als `pending` erfasst; eine fehlgeschlagene Abo-Rechnung (Stripe `invoice.payment_failed`) legt eine `failed`-Spende an, die über die Rechnungs-ID geführt wird; Kündigungsereignisse löschen die lokale Zeile `subscriptions`. Der Controller prüft nie anbieterspezifische Ereignisnamen.

### Fehlgeschlagene wiederkehrende Gaben und Mahnwesen

Eine `failed`-Spende ist die Arbeitseinheit für die Wiederherstellung. `GET /giving/donations/failed` listet sie mit der neuesten Fehlermeldung des Gateways aus `eventLogs` und einem Kennzeichen `canRetry` aus den Fähigkeiten des Gateways. `POST /giving/donate/retry/:donationId` ruft `retryFailedPayment` des Anbieters auf (Stripe bezahlt die offene Rechnung), und der daraus entstehende Webhook hebt die Zeile über den normalen Pfad der Deduplizierung auf `complete`. Mahnungen gehen vom Webhook-Handler am Tag 0 an den Spender, danach von `DunningHelper.run` im Mitternachtstimer (verdrahtet in `lambda/timer-handler.ts` und `RailwayCron.ts`) nach 3 und 7 Tagen. Jeder Versand wird in `eventLogs` als `provider: "dunning"` und `providerId: "<donationId>:<day>"` vermerkt, damit ein erneuter Lauf nie doppelt mailt. Gibt Stripe auf und kündigt das Abo (`customer.subscription.deleted` mit `cancellation_details.reason: "payment_failed"`), mailt `DunningHelper.notifyCanceled` dem Spender einmalig (`providerId: "<subscriptionId>:canceled"`); Kündigungen durch den Spender oder die Verwaltung bleiben stumm. Stripe fügt einem bestehenden Endpunkt nie neue Ereignisse hinzu: Nach einer Änderung von `StripeHelper.webhookEvents` muss das Gateway neu gespeichert werden oder `tools/manual/stripe-webhook-events.ts` ausgeführt werden (standardmäßig als Testlauf; `--apply` schreibt) -- gegen die Produktion.

Anbieter mit `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) erfassen ihre Belastungen aus der Antwort auf `/charge` (für den Normalfall ist kein Webhook-Umweg nötig), während Stripe auf `payment_intent.succeeded` / `invoice.paid` und ACH `payment_intent.processing` setzt. Die Gebührenbehandlung (`POST /giving/donate/fee`, das Gateway-Merkmal `payFees` und `calculateFees` jedes Anbieters) berechnet die Hochrechnung "Gebühren übernehmen" auf der Seite des Spenders -- B1 erhebt keinen eigenen Anteil, daher wird nie eine Anwendungsgebühr aufgeschlagen.

:::info
Der Belastungs- und der Webhook-Pfad schreiben dieselben Zeilen `donations` / `fundDonations`. Die `transactionId` ist der Verknüpfungsschlüssel, der verhindert, dass eine optimistische Belastungserfassung und ihr späterer Webhook aus einer Gabe zwei Spenden machen.
:::

## Verwandte Seiten

- [Giving-Endpunkte](../api/endpoints/giving) — vollständige REST-Schnittstelle für Spenden, Fonds, Stapel, Gateways, Abos, Zahlungsmethoden und Webhooks
- [AppHelper](../shared-libraries/app-helper) — das npm-Paket mit der Registrierung der Zahlungsanbieter und den Spendenkomponenten
- [Modulstruktur](../api/module-structure) — wie das GivingApi-Modul serverseitig organisiert ist

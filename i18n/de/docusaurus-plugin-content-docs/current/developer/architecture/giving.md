---
title: "Spendenarchitektur"
---

# Spendenarchitektur

<div class="article-intro">

ChurchApps wickelt Spenden nach einem Gateway-Rail-Modell ab: Die Gemeinde behält ihr eigenes Stripe- (oder PayPal- oder Kingdom-Funding-)Konto, und B1 tritt niemals als Plattform-Zahlungsabwickler in den Geldfluss ein. Kartendaten werden im Browser tokenisiert und erreichen niemals einen ChurchApps-Server. Diese Seite bildet den gesamten Stack ab – die clientseitige Provider-Registry in `@churchapps/apphelper`, die GivingApi-Gateway-Abstraktion, das Spendendatenmodell und wie Gateway-Webhooks die Daten mit der Datenbank abgleichen.

</div>

## Überblick

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
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

Im gesamten Stack gelten drei Prinzipien:

1. **Das Gateway verwahrt die Karte.** Das Eingabe-Widget jedes Providers tokenisiert im Browser; die API erhält ausschließlich ein Token, eine Nonce oder eine Order-ID.
2. **Eine Abstraktion, viele Provider.** Der Browser löst einen `PaymentProvider` aus einer Registry auf; der Server löst einen `IGatewayProvider` aus einer Factory auf. Beide richten sich nach demselben normalisierten Providernamen, der im Gateway-Datensatz gespeichert ist.
3. **Webhooks sind die maßgebliche Quelle für die Abrechnung.** Eine Charge-Antwort wird optimistisch erfasst, aber erst der signierte Webhook des Gateways bestätigt (oder erstellt) die abgeschlossene Spende – mit Idempotenzsicherungen auf beiden Seiten.

## Clientseitig: die Payment-Provider-Registry (`@churchapps/apphelper`)

Die Registry befindet sich in `Packages/apphelper/src/donations/providers/`, wobei die Widgets und Hilfsfunktionen jedes Providers in einem eigenen Unterordner liegen (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) – außerhalb von `providers/` verzweigt nichts anhand eines Providernamens. Ein `PaymentProvider` (siehe `providers/types.ts`) bündelt alles, was eine Host-App für ein Gateway benötigt: einen `descriptor` (Admin-Beschriftungen, unterstützte Währungen, Gebührenfelder, Standard-Gebührensätze, Dashboard-/Anmelde-URLs), einen `capabilities`-Flag-Satz (gespeicherte Karten, ACH, wiederkehrende Zahlungen, Inline-Eingabe neuer Karten, implizites Speichern beim Tokenisieren), die React-Widgets für die Eingabe durch Mitglieder (`MemberWrapper`/`MemberEntry`), Gastspenden (`GuestForm`), die Bearbeitung gespeicherter Zahlungsmethoden (`MethodEditForm`) und Zahlungen über Formularfragen (`FormPayment`) sowie `buildChargeRequest(ctx, token)` – die einzige Stelle, an der sich die Form der Charge-Payload je Provider unterscheidet. Der `MemberWrapper` jedes Providers lädt sein eigenes SDK anhand des öffentlichen Schlüssels des Gateway-Datensatzes, sodass Host-Apps niemals ein Gateway-SDK importieren (B1App und B1Admin haben keine `@stripe/*`-Abhängigkeit). `pickDefaultGateway(gateways, capability?)` legt zentral fest, welches Gateway einer Gemeinde eine Oberfläche verwenden soll.

`providers/registry.ts` enthält die eingebauten Provider. Sie werden **per Wert referenziert** und nicht über einen Modul-Seiteneffekt registriert, sodass das Tree-Shaking eines Bundlers die Registrierung niemals entfernen kann:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Funktion | Zweck |
|----------|---------|
| `getPaymentProvider(name)` | Löst anhand des normalisierten Namens auf; fällt auf Stripe zurück, damit ein falsch konfigurierter Provider das Spenderformular nie zum Absturz bringt |
| `registerPaymentProvider(p)` | Registriert zur Laufzeit einen zusätzlichen Provider (für ein individuelles Gateway einer Host-App) |
| `listPaymentProviders()` | Listet eingebaute und benutzerdefinierte Provider auf – wird zum Aufbau des Admin-Gateway-Dropdowns verwendet |
| `hasPaymentProvider(name)` | Zugehörigkeitsprüfung |

**Eingebaute Client-Provider: Stripe, PayPal, Kingdom Funding.** B1App und B1Admin *lesen* die Registry nur (`getPaymentProvider`, `listPaymentProviders`); keine der beiden ruft `registerPaymentProvider` auf – die Registrierung bleibt innerhalb von apphelper.

Jeder Provider tokenisiert anders, aber alle halten die Karte aus B1 heraus:

| Provider | Eingabe-Widget | An die API zurückgegebenes Token |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | Payment-Method-ID (`pm_…`); Bankkonto über Financial Connections / ACH SetupIntent |
| Kingdom Funding | Gehostetes Tokenizer-Formular, adressiert über den öffentlichen Gateway-Schlüssel | einmalig verwendbare Nonce |
| PayPal | PayPal Hosted Fields; Server-Order wird über `/donate/client-token` + `/donate/create-order` erstellt | erfasste Order-ID |

Stripes `finalizeResult` führt 3-D Secure / SCA im Browser aus (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), bevor die Spende als abgeschlossen gilt; das gemeinsame Formular ruft lediglich `provider.finalizeResult(result)` auf, ohne zu wissen, was dabei geschieht.

## Serverseitig: die Gateway-Abstraktion (GivingApi)

Das Modul `/giving` (`Api/src/modules/giving`) stellt die REST-Oberfläche bereit; die Gateway-Verdrahtung befindet sich in `Api/src/shared/helpers`. `DonateController` spricht niemals direkt mit einem Gateway-SDK – er geht über `GatewayService`, der den passenden `IGatewayProvider` aus der `GatewayFactory` auflöst und ihm eine entschlüsselte `GatewayConfig` übergibt.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ist der Vertrag, den jedes Gateway implementiert – Webhook-Lebenszyklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), Zahlung (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), Gebühren (`calculateFees`), die Handhabung gespeicherter Zahlungsmethoden (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) sowie optionale Extras (Kunden, Bestellungen, SetupIntents, Event-Replay). Jede Provider-Klasse deklariert ihre eigene `capabilities`-Matrix (unterstützte Währungen, ACH, Rückerstattungen, Abo-Anforderungen, Transaktionslimits) – `GatewayService.getProviderCapabilities(provider)` liest sie lediglich aus – und Flags wie `logsDonationsImmediately` steuern das Controller-Verhalten, ohne dass in den Controllern irgendwelche Bedingungen anhand des Providernamens nötig sind.

**In der `GatewayFactory` registrierte Server-Provider:**

| Provider | Verfügbarkeit |
|----------|-------------|
| Stripe | Immer aktiv |
| PayPal | Immer aktiv |
| Kingdom Funding | Immer aktiv |
| Square | Opt-in über das Umgebungs-Flag `ENABLE_SQUARE` |
| ePayMints | Opt-in über das Umgebungs-Flag `ENABLE_EPAYMINTS` |

Benutzerdefinierte Provider können zur Laufzeit registriert werden, wenn `ENABLE_CUSTOM_GATEWAY_PROVIDERS` gesetzt ist; `AbstractExperimentalGatewayProvider` ist dafür die Basisklasse. Providernamen werden ohne Berücksichtigung der Groß-/Kleinschreibung abgeglichen.

### Gateway-Konfiguration und Geheimnisse

Ein Administrator speichert Gateway-Zugangsdaten über `POST /giving/gateways` (`GatewayController`). Beim Speichern verschlüsselt der Controller den privaten Schlüssel und den Webhook-Schlüssel mit `EncryptionHelper`, bevor sie persistiert werden, und löscht dann – auf jedem Host außer localhost – den vorhandenen Webhook der Gemeinde und richtet einen neuen ein, der auf `/giving/donate/webhook/{provider}?churchId=…` zeigt. Öffentliche Leseabfragen (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) liefern ausschließlich öffentliche Schlüssel zurück.

## Datenmodell

Das Giving-Schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, Modelle in `models/`) ist ein MySQL-Schema, auf das über Kysely zugegriffen wird:

| Tabelle | Rolle |
|-------|------|
| `gateways` | Provider-Konfiguration je Gemeinde: `provider`, `publicKey`, verschlüsselte `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Spendenzweckbindungen (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppierung für Erfassung/Berichte (`name`, `batchDate`) |
| `donations` | Eine einzelne Spende: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Zuordnung einer Spende zu einem oder mehreren Fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Wiederkehrende Spende; `id` ist die Subscription-ID des Gateways, verknüpft mit `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondsaufteilung für eine wiederkehrende Spende |
| `customers` | Verknüpft eine `personId` je `provider` mit ihrer Gateway-Kunden-ID |
| `gatewayPaymentMethods` | Gespeicherte Karten/Bankkonten: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Audit-Trail für Webhooks/Events sowie Dedup-Schlüssel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Zusagekampagnen, die an einen Fonds gebunden sind, sowie der zugesagte Betrag jeder Person |

Eine Spende wird über `fundDonations` auf Fonds aufgeteilt – die Spende trägt den Gesamtbetrag, jede `fundDonation` einen Teilbetrag. `donations.currency` und `gateways.currency` enthalten die ISO-Währung; jeder Provider gibt seine `supportedCurrencies` bekannt, und Beträge werden mit `CurrencyHelper.formatCurrencyWithLocale` formatiert.

## Durchgängige Abläufe

### Einmal- und wiederkehrende Spenden von Mitgliedern (B1App)

Der authentifizierte Spenden-Bildschirm (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setzt sich aus drei apphelper-Komponenten zusammen: `MultiGatewayDonationForm`, `PaymentMethods` und `RecurringDonations`. B1App übernimmt das umgebende Laden der Daten – `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` – und reicht die Gateway-Liste durch; der aufgelöste Provider lädt sein eigenes SDK anhand des öffentlichen Schlüssels des Gateways. Der Charge selbst findet innerhalb von apphelper statt: Der aufgelöste Provider tokenisiert die (neue oder gespeicherte) Zahlungsmethode und sendet anschließend eine Anfrage an `/giving/donate/charge` für eine einmalige Spende oder an `/giving/donate/subscribe` für eine wiederkehrende. Wiederkehrende Spenden erzeugen einen `subscriptions`-Datensatz sowie `subscriptionFunds` und übergeben den Zeitplan an das Gateway (Stripe Subscriptions, PayPal Billing Plans oder einen wiederkehrenden KF-Zeitplan).

### Gast-/anonyme Spenden

Die öffentliche Spendenseite (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) und das Panel „Jetzt spenden" rendern `NonAuthDonationWrapper` aus `@churchapps/apphelper/website`, das reCAPTCHA und den Elements-Kontext des Gateways um das `GuestForm` des Providers herum einbindet. Gäste erhalten kein Login, keine gespeicherten Zahlungsmethoden und keinen Verlauf. Der Ablauf ruft `GET /giving/funds/churchId/:id` und `GET /giving/donate/gateways/:churchId` (nur öffentliche Schlüssel) ab, verifiziert den Besucher mit `POST /giving/donate/captcha-verify`, tokenisiert im Browser und sendet eine Anfrage an `/giving/donate/charge` (oder `/subscribe`). Anonymes ACH für Gäste nutzt das anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Admin-Erfassung und Stripe-Import (B1Admin)

Im Spendenbereich von B1Admin (`B1Admin/src/donations/`) arbeiten die Finanzteams. Die Sammelerfassung (`components/BulkDonationEntry.tsx`) erfasst Bar-, Scheck- oder Sachspenden, indem sie eine Anfrage an `/giving/donations` und anschließend an `/giving/funddonations` sendet – ohne Beteiligung eines Gateways. Fonds, Batches, Kampagnen und Aufstellungen sind jeweils ihren `/giving/*`-CRUD-Routen zugeordnet. Das Spendenpanel im Mitglieder-Stil (`B1Admin/src/donationComponents/`) verwendet dieselben apphelper-Komponenten wie B1App.

Der Stripe-Import (`B1Admin/src/donations/StripeImportPage.tsx`) trägt Spenden nach, die außerhalb von B1 getätigt wurden: Er ruft `POST /giving/donate/replay-stripe-events` mit `dryRun: true` für eine Vorschau auf, danach mit `dryRun: false` für den eigentlichen Import. Der Server listet die Stripe-Ereignisse für den Datumsbereich auf und überspringt bereits erfasste Einträge – zunächst abgeglichen anhand der Provider-ID in `eventLogs`, dann über `DonationRepo.findMatchingDonation` (Betrag + Datum + Person), sodass ein erneuter Lauf niemals doppelt importiert.

## Webhooks und Abgleich

Abgerechnete Zahlungen und Statusänderungen von Abos treffen unter `POST /giving/donate/webhook/:provider?churchId=…` ein (`DonateController.webhook`). Die Verarbeitung ist bewusst idempotent gestaltet:

1. **Verifizieren** – `GatewayService.verifyWebhook` delegiert an die Signaturprüfung des Providers; eine fehlgeschlagene Signatur liefert 401 zurück. Ereignisse, die keine Verarbeitung benötigen, brechen sofort mit 200 ab.
2. **Ereignis deduplizieren** – `EventLogRepo.loadByProviderId` überspringt einen Webhook, der bereits in `eventLogs` erfasst ist.
3. **Spende deduplizieren** – bevor etwas erstellt wird, wird `DonationRepo.loadByTransactionId` gegen jede Kandidaten-ID geprüft, die die Payload enthalten könnte. Dies fängt doppelte Zustellungen, mehrstufige ACH-Ereignisse (ausstehend → abgerechnet) sowie den Fall ab, dass `/donate/charge` die Spende bereits optimistisch erfasst hat.
4. **Anwenden** – `classifyWebhookEvent(eventType)` des Providers gibt an, was das Ereignis bedeutet (`donation` ausstehend/abgeschlossen, `cancel-subscription` oder `ignore`); abgeschlossene Zahlungen erzeugen eine Spende mit Status `complete` (oder befördern eine bestehende `pending`-Spende), ACH-artige Ereignisse landen bis zur Abrechnung als `pending`, und Stornierungsereignisse löschen den lokalen `subscriptions`-Datensatz. Der Controller untersucht niemals providerspezifische Ereignisnamen.

Bei Providern mit `logsDonationsImmediately` (PayPal, Kingdom Funding) werden die Charges bereits aus der `/charge`-Antwort erfasst (im Idealfall ist kein Webhook-Roundtrip nötig), während Stripe sich auf `payment_intent.succeeded` / `invoice.paid` sowie bei ACH auf `payment_intent.processing` verlässt. Die Gebührenverarbeitung (`POST /giving/donate/fee`, das Gateway-Flag `payFees` und das `calculateFees` jedes Providers) berechnet den „Gebühren übernehmen"-Aufschlag auf Spenderseite – B1 behält keinen Plattformanteil ein, weshalb niemals eine Anwendungsgebühr hinzugefügt wird.

:::info
Der Charge- und der Webhook-Pfad schreiben dieselben `donations`-/`fundDonations`-Datensätze. Die `transactionId` ist der Verknüpfungsschlüssel, der verhindert, dass ein optimistisch erfasster Charge-Log und der später eintreffende Webhook für ein und dieselbe Spende zwei Spendendatensätze erzeugen.
:::

## Verwandte Seiten

- [Spenden-Endpunkte](../api/endpoints/giving) – vollständige REST-Oberfläche für Spenden, Fonds, Batches, Gateways, Abos, Zahlungsmethoden und Webhooks
- [AppHelper](../shared-libraries/app-helper) – das npm-Paket, das die Payment-Provider-Registry und die Spendenkomponenten bereitstellt
- [Modulstruktur](../api/module-structure) – wie das GivingApi-Modul serverseitig organisiert ist

---
title: "Giving-Architektur"
---

# Giving-Architektur

<div class="article-intro">

ChurchApps betreibt Spenden nach einem Gateway-Schienen-Modell: Die Gemeinde behält ihr eigenes Stripe- (oder PayPal-, oder Kingdom-Funding-)Konto, und B1 sitzt niemals als Plattform-Prozessor im Geldweg. Kartendaten werden im Browser tokenisiert und erreichen nie einen ChurchApps-Server. Diese Seite bildet den gesamten Stack ab — die clientseitige Anbieter-Registry in `@churchapps/apphelper`, die GivingApi-Gateway-Abstraktion, das Spenden-Datenmodell und wie Gateway-Webhooks zurück in die Datenbank abgleichen.

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

Drei Prinzipien gelten über den gesamten Stack:

1. **Das Gateway hält die Karte.** Das Eingabewidget jedes Providers tokenisiert im Browser; die API erhält immer nur ein Token, eine Nonce oder eine Order-ID.
2. **Eine Abstraktion, viele Provider.** Der Browser löst einen `PaymentProvider` aus einer Registry auf; der Server löst einen `IGatewayProvider` aus einer Factory auf. Beide schlüsseln über denselben normalisierten Providernamen, der auf dem Gateway-Datensatz gespeichert ist.
3. **Webhooks sind die maßgebliche Quelle für die Abwicklung.** Eine Belastungsantwort wird optimistisch erfasst, aber der signierte Webhook des Gateways ist es, der die abgeschlossene Spende bestätigt (oder erstellt), mit Idempotenz-Schutz auf beiden Seiten.

## Clientseitig: die Zahlungsanbieter-Registry (`@churchapps/apphelper`)

Die Registry liegt in `Packages/apphelper/src/donations/providers/`, wobei die Widgets und Helfer jedes Providers in ihrem eigenen Unterordner liegen (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — nichts außerhalb von `providers/` verzweigt nach einem Providernamen. Ein `PaymentProvider` (siehe `providers/types.ts`) bündelt alles, was eine Host-App für ein Gateway benötigt: einen `descriptor` (Admin-Beschriftungen, unterstützte Währungen, Gebührenfelder, Standard-Gebührensätze, Dashboard-/Anmelde-URLs), einen `capabilities`-Flag-Satz (gespeicherte Karten, ACH, wiederkehrend, Inline-Neukarteneingabe, implizites Speichern beim Tokenisieren), die React-Widgets für die Mitgliedereingabe (`MemberWrapper`/`MemberEntry`), Gastspenden (`GuestForm`), Bearbeitung gespeicherter Methoden (`MethodEditForm`) und Formularfrage-Zahlungen (`FormPayment`), plus `buildChargeRequest(ctx, token)` — die eine Stelle, an der sich die Form der Belastungs-Payload pro Provider unterscheidet. Der `MemberWrapper` jedes Providers lädt sein eigenes SDK aus dem öffentlichen Schlüssel des Gateway-Datensatzes, sodass Host-Apps nie ein Gateway-SDK importieren (B1App und B1Admin haben keine `@stripe/*`-Abhängigkeit). `pickDefaultGateway(gateways, capability?)` zentralisiert, welches der Gateways einer Gemeinde eine Oberfläche verwenden soll.

`providers/registry.ts` enthält die eingebauten Provider. Sie werden **per Wert referenziert**, nicht durch einen Modul-Seiteneffekt registriert, sodass Tree-Shaking eines Bundlers die Registrierung niemals verwerfen kann:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Funktion | Zweck |
|----------|-------|
| `getPaymentProvider(name)` | Auflösung nach normalisiertem Namen; fällt auf Stripe zurück, sodass ein falsch konfigurierter Provider das Spenderformular nie hart zum Absturz bringt |
| `registerPaymentProvider(p)` | Registriert zur Laufzeit einen zusätzlichen Provider (für ein individuelles Gateway einer Host-App) |
| `listPaymentProviders()` | Zählt eingebaute + individuelle Provider auf — wird verwendet, um das Admin-Gateway-Dropdown zu bauen |
| `hasPaymentProvider(name)` | Mitgliedschaftsprüfung |

**Eingebaute Client-Provider: Stripe, PayPal, Kingdom Funding.** B1App und B1Admin *lesen* die Registry nur (`getPaymentProvider`, `listPaymentProviders`); keiner ruft `registerPaymentProvider` auf — die Registrierung bleibt innerhalb von apphelper.

Jeder Provider tokenisiert anders, aber alle halten die Karte aus B1 heraus:

| Provider | Eingabewidget | An die API zurückgegebenes Token |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | Zahlungsmethoden-ID (`pm_…`); Bankkonto via Financial Connections / ACH SetupIntent |
| Kingdom Funding | Gehostetes Tokenizer-Formular, geschlüsselt mit dem öffentlichen Gateway-Schlüssel | Einmal-Nonce |
| PayPal | PayPal Hosted Fields; Server-Order aufgebaut über `/donate/client-token` + `/donate/create-order` | Erfasste Order-ID |

Stripes `finalizeResult` führt 3-D Secure / SCA im Browser aus (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), bevor die Spende als abgeschlossen gilt; das gemeinsame Formular ruft nur `provider.finalizeResult(result)` auf, ohne zu wissen, was dahinter passiert.

## Serverseitig: die Gateway-Abstraktion (GivingApi)

Das `/giving`-Modul (`Api/src/modules/giving`) stellt die REST-Oberfläche bereit; die Gateway-Verrohrung liegt in `Api/src/shared/helpers`. `DonateController` spricht nie direkt mit einem Gateway-SDK — er geht über `GatewayService`, der den richtigen `IGatewayProvider` aus `GatewayFactory` auflöst und ihm eine entschlüsselte `GatewayConfig` übergibt.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ist der Vertrag, den jedes Gateway implementiert — Webhook-Lebenszyklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), Zahlung (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), Gebühren (`calculateFees`), Behandlung gespeicherter Methoden (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) und optionale Extras (Kunden, Bestellungen, SetupIntents, Ereignis-Replay). Jede Provider-Klasse deklariert ihre eigene `capabilities`-Matrix (unterstützte Währungen, ACH, Rückerstattungen, Abonnement-Anforderungen, Transaktionslimits) — `GatewayService.getProviderCapabilities(provider)` liest sie einfach aus — und Flags wie `logsDonationsImmediately` steuern das Controller-Verhalten ohne jegliche Providernamen-Bedingungen in den Controllern.

**Serverseitige, in `GatewayFactory` registrierte Provider:**

| Provider | Verfügbarkeit |
|----------|-------------|
| Stripe | Immer aktiv |
| PayPal | Immer aktiv |
| Kingdom Funding | Immer aktiv |
| Square | Opt-in über das Umgebungs-Flag `ENABLE_SQUARE` |
| ePayMints | Opt-in über das Umgebungs-Flag `ENABLE_EPAYMINTS` |

Individuelle Provider können zur Laufzeit registriert werden, wenn `ENABLE_CUSTOM_GATEWAY_PROVIDERS` gesetzt ist; `AbstractExperimentalGatewayProvider` ist die Basisklasse dafür. Providernamen werden ohne Berücksichtigung der Groß-/Kleinschreibung abgeglichen.

### Gateway-Konfiguration & Geheimnisse

Ein Admin speichert Gateway-Zugangsdaten über `POST /giving/gateways` (`GatewayController`). Beim Speichern verschlüsselt der Controller den privaten Schlüssel und den Webhook-Schlüssel mit `EncryptionHelper`, bevor er sie persistiert, und löscht dann — bei jedem Nicht-Localhost-Host — den bestehenden Webhook der Gemeinde und richtet einen neuen ein, der auf `/giving/donate/webhook/{provider}?churchId=…` zeigt. Öffentliche Lesevorgänge (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) geben nur öffentliche Schlüssel zurück.

## Datenmodell

Das Giving-Schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, Modelle in `models/`) ist ein MySQL-Schema, auf das über Kysely zugegriffen wird:

| Tabelle | Rolle |
|-------|-------|
| `gateways` | Providerkonfiguration pro Gemeinde: `provider`, `publicKey`, verschlüsselte `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Spendenzweckbindungen (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppierung für Erfassung/Berichte (`name`, `batchDate`) |
| `donations` | Eine Gabe: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Aufteilung einer Spende auf einen oder mehrere Fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Wiederkehrende Gabe; `id` ist die Abonnement-ID des Gateways, verknüpft mit `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondsaufteilung für eine wiederkehrende Gabe |
| `customers` | Verknüpft eine `personId` mit ihrer Gateway-Kunden-ID, pro `provider` |
| `gatewayPaymentMethods` | Gespeicherte Karten/Banken: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook-/Ereignis-Audit-Trail und Dedup-Schlüssel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Spendenzusagen-Kampagnen, gebunden an einen Fonds, und der zugesagte Betrag jeder Person |

Eine Spende wird über `fundDonations` auf Fonds aufgeteilt — die Spende trägt die Gesamtsumme, jede `fundDonation` trägt einen Anteil. `donations.currency` und `gateways.currency` tragen die ISO-Währung; jeder Provider gibt seine `supportedCurrencies` bekannt, und Beträge werden mit `CurrencyHelper.formatCurrencyWithLocale` formatiert.

## End-to-End-Abläufe

### Einmalige und wiederkehrende Spende von Mitgliedern (B1App)

Der authentifizierte Spenden-Screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setzt sich aus drei apphelper-Komponenten zusammen: `MultiGatewayDonationForm`, `PaymentMethods` und `RecurringDonations`. B1App übernimmt das umgebende Daten-Laden — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — und reicht die Gateway-Liste durch; der aufgelöste Provider lädt sein eigenes SDK aus dem öffentlichen Schlüssel des Gateways. Die Belastung selbst geschieht innerhalb von apphelper: Der aufgelöste Provider tokenisiert die (neue oder gespeicherte) Methode und sendet dann per POST an `/giving/donate/charge` für eine einmalige Gabe oder `/giving/donate/subscribe` für eine wiederkehrende. Wiederkehrende Gaben erzeugen eine `subscriptions`-Zeile plus `subscriptionFunds` und übergeben den Zeitplan an das Gateway (Stripe Subscriptions, PayPal Billing Plans oder einen KF-Wiederholungsplan).

### Gast-/anonyme Spende

Die öffentliche Spendenseite (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) und das „Jetzt spenden"-Panel rendern `NonAuthDonationWrapper` aus `@churchapps/apphelper/website`, das reCAPTCHA und den Elements-Kontext des Gateways um das `GuestForm` des Providers herum einfügt. Gäste erhalten kein Login, keine gespeicherten Methoden und keine Historie. Der Ablauf ruft `GET /giving/funds/churchId/:id` und `GET /giving/donate/gateways/:churchId` ab (nur öffentliche Schlüssel), verifiziert den Besucher mit `POST /giving/donate/captcha-verify`, tokenisiert im Browser und sendet per POST an `/giving/donate/charge` (oder `/subscribe`). Gast-ACH nutzt das anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Admin-Erfassung und Stripe-Import (B1Admin)

Der B1Admin-Bereich für Spenden (`B1Admin/src/donations/`) ist der Arbeitsbereich der Finanzteams. Die Batch-Erfassung (`components/BulkDonationEntry.tsx`) erfasst Bar-/Scheck-/Sachgaben, indem sie per POST an `/giving/donations` und dann `/giving/funddonations` sendet — ohne beteiligtes Gateway. Fonds, Batches, Kampagnen und Zusammenfassungen werden jeweils auf ihre `/giving/*`-CRUD-Routen abgebildet. Das mitgliederähnliche Spenden-Panel (`B1Admin/src/donationComponents/`) verwendet dieselben apphelper-Komponenten wie B1App.

Der Stripe-Import (`B1Admin/src/donations/StripeImportPage.tsx`) trägt Gaben nach, die außerhalb von B1 gemacht wurden: Er ruft `POST /giving/donate/replay-stripe-events` mit `dryRun: true` für eine Vorschau auf, dann `dryRun: false` zum Importieren. Der Server listet Stripe-Ereignisse für den Datumsbereich auf und überspringt alles, was bereits erfasst ist — zuerst über die `eventLogs`-Provider-ID abgeglichen, dann über `DonationRepo.findMatchingDonation` (Betrag + Datum + Person), sodass ein erneuter Lauf niemals doppelt importiert.

## Webhooks und Abgleich

Abgewickelte Zahlungen und Änderungen des Abonnementstatus treffen bei `POST /giving/donate/webhook/:provider?churchId=…` ein (`DonateController.webhook`). Die Verarbeitung ist bewusst idempotent:

1. **Verifizieren** — `GatewayService.verifyWebhook` delegiert an die Signaturprüfung des Providers; eine fehlgeschlagene Signatur liefert 401. Ereignisse, die keine Verarbeitung benötigen, brechen mit 200 kurz ab.
2. **Ereignis deduplizieren** — `EventLogRepo.loadByProviderId` überspringt einen Webhook, der bereits in `eventLogs` erfasst ist.
3. **Spende deduplizieren** — bevor irgendetwas erstellt wird, wird `DonationRepo.loadByTransactionId` gegen jede Kandidaten-ID geprüft, die die Payload tragen könnte. Das absorbiert doppelte Zustellungen, mehrstufige ACH-Ereignisse (pending → settled) und den Fall, dass `/donate/charge` die Gabe bereits optimistisch erfasst hat.
4. **Anwenden** — `classifyWebhookEvent(eventType)` des Providers sagt, was das Ereignis bedeutet (`donation` pending/complete, `cancel-subscription` oder `ignore`); abgeschlossene Zahlungen erzeugen eine `complete`-Spende (oder befördern eine bestehende `pending`-Spende), ACH-artige Ereignisse landen als `pending` bis zur Abwicklung, und Stornierungsereignisse löschen die lokale `subscriptions`-Zeile. Der Controller untersucht niemals providerspezifische Ereignisnamen.

Provider mit `logsDonationsImmediately` (PayPal, Kingdom Funding) haben ihre Belastungen bereits aus der `/charge`-Antwort erfasst (kein Webhook-Roundtrip für den Glücksfall nötig), während Stripe sich auf `payment_intent.succeeded` / `invoice.paid` und ACH `payment_intent.processing` verlässt. Die Gebührenbehandlung (`POST /giving/donate/fee`, das `payFees`-Gateway-Flag und `calculateFees` jedes Providers) berechnet den „Gebühren übernehmen"-Aufschlag auf Spenderseite — B1 nimmt keinen Plattformanteil, sodass niemals eine Anwendungsgebühr hinzugefügt wird.

:::info
Der Belastungs- und der Webhook-Weg schreiben dieselben `donations`-/`fundDonations`-Zeilen. Die `transactionId` ist der Verknüpfungsschlüssel, der verhindert, dass ein optimistisch erfasster Belastungseintrag und sein späterer Webhook zwei Spenden für eine Gabe erzeugen.
:::

## Verwandte Seiten

- [Giving-Endpunkte](../api/endpoints/giving) — vollständige REST-Oberfläche für Spenden, Fonds, Batches, Gateways, Abonnements, Zahlungsmethoden und Webhooks
- [AppHelper](../shared-libraries/app-helper) — das npm-Paket, das die Zahlungsanbieter-Registry und die Spenden-Komponenten ausliefert
- [Modulstruktur](../api/module-structure) — wie das GivingApi-Modul serverseitig organisiert ist

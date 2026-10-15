---
title: "Architektur der Spendenabwicklung"
---

# Architektur der Spendenabwicklung

<div class="article-intro">

ChurchApps betreibt die Spendenabwicklung nach einem Gateway-Modell: Die Gemeinde behält ihr eigenes Stripe-Konto (oder PayPal, Kingdom Funding bzw. Paystack), und B1 ist nie als Zahlungsdienstleister im Geldfluss zwischengeschaltet. Kartendaten werden im Browser tokenisiert und erreichen nie einen ChurchApps-Server. Diese Seite beschreibt den gesamten Stapel: die clientseitige Anbieter-Registry in `@churchapps/apphelper`, die Gateway-Abstraktion von GivingApi, das Datenmodell für Spenden und wie Gateway-Webhooks mit der Datenbank abgeglichen werden.

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

Drei Grundsätze gelten im gesamten Stapel:

1. **Das Gateway verwahrt die Karte.** Das Eingabe-Widget jedes Anbieters tokenisiert im Browser; die API erhält nur ein Token, eine Nonce oder eine Bestell-ID.
2. **Eine Abstraktion, viele Anbieter.** Der Browser löst einen `PaymentProvider` über die Registry auf; der Server löst einen `IGatewayProvider` über eine Factory auf. Beide richten sich nach demselben normalisierten Anbieternamen, der im Gateway-Datensatz gespeichert ist.
3. **Webhooks sind die maßgebliche Quelle für die Abrechnung.** Die Antwort auf eine Belastung wird optimistisch erfasst, aber erst der signierte Webhook des Gateways bestätigt (oder erzeugt) die abgeschlossene Spende. Auf beiden Seiten gibt es Schutz vor doppelter Verarbeitung.

## Clientseitig: die Registry der Zahlungsanbieter (`@churchapps/apphelper`)

Die Registry liegt in `Packages/apphelper/src/donations/providers/`, wobei die Widgets und Hilfsfunktionen jedes Anbieters in einem eigenen Unterordner liegen (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Außerhalb von `providers/` verzweigt kein Code anhand eines Anbieternamens. Ein `PaymentProvider` (siehe `providers/types.ts`) bündelt alles, was eine Host-Anwendung für ein Gateway benötigt: einen `descriptor` (Bezeichnungen für die Verwaltung, unterstützte Währungen, Gebührenfelder, Standard-Gebührensätze, Links zu Dashboard und Anmeldung), eine Gruppe von `capabilities` (gespeicherte Karten, ACH, wiederkehrende Zahlungen, Eingabe einer neuen Karte im Formular, implizites Speichern beim Tokenisieren), die React-Widgets für die Eingabe durch Mitglieder (`MemberWrapper`/`MemberEntry`), Spenden durch Gäste (`GuestForm`), die Bearbeitung gespeicherter Zahlungsmethoden (`MethodEditForm`) und Zahlungen über Formularfragen (`FormPayment`) sowie `buildChargeRequest(ctx, token)`. Letzteres ist die einzige Stelle, an der sich die Form der Belastungsanfrage je Anbieter unterscheidet. Der `MemberWrapper` jedes Anbieters lädt sein eigenes SDK anhand des öffentlichen Schlüssels aus dem Gateway-Datensatz. Dadurch importieren Host-Anwendungen niemals ein Gateway-SDK (B1App und B1Admin haben keine Abhängigkeit von `@stripe/*`). `pickDefaultGateway(gateways, capability?)` legt zentral fest, welches der Gateways einer Gemeinde eine Oberfläche verwenden soll.

`providers/registry.ts` enthält die integrierten Anbieter. Sie werden **per Wert referenziert** und nicht über einen Seiteneffekt beim Laden des Moduls registriert. So kann das Tree-Shaking des Bundlers die Registrierung nie entfernen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funktion | Zweck |
|----------|---------|
| `getPaymentProvider(name)` | Auflösung über den normalisierten Namen; fällt auf Stripe zurück, damit ein falsch konfigurierter Anbieter das Spendenformular nie hart zum Absturz bringt |
| `registerPaymentProvider(p)` | Registriert zur Laufzeit einen zusätzlichen Anbieter (etwa ein eigenes Gateway einer Host-Anwendung) |
| `listPaymentProviders()` | Listet integrierte und eigene Anbieter auf. Damit wird das Dropdown für Gateways in der Verwaltung aufgebaut |
| `hasPaymentProvider(name)` | Prüft, ob ein Anbieter vorhanden ist |

**Integrierte Client-Anbieter: Stripe, PayPal, Kingdom Funding, Paystack.** B1App und B1Admin *lesen* die Registry nur (`getPaymentProvider`, `listPaymentProviders`). Keine der beiden ruft `registerPaymentProvider` auf; die Registrierung bleibt innerhalb von apphelper.

Jeder Anbieter tokenisiert auf eine andere Weise, doch alle halten die Karte aus B1 heraus:

| Anbieter | Eingabe-Widget | An die API zurückgegebenes Token |
|----------|--------------|-----------------------|
| Stripe | Stripe-`Elements`-`CardElement` → `stripe.createPaymentMethod(...)`; das Gästeformular bindet außerdem ein `ExpressCheckoutElement` (Apple Pay / Google Pay, für einmalige Gaben) ein, dessen `onConfirm` dieselbe `pm_…`-ID liefert | ID der Zahlungsmethode (`pm_…`); Bankkonto über `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` für USD-Gateways, kanadisches PAD `acss_debit` (gehostetes Mandat-Modal, Mandat mit `default_for` für Rechnungen/Abonnements; Einmalbelastungen übergeben die Mandat-ID) für CAD-Gateways |
| Kingdom Funding | Gehostetes Tokenizer-Formular, gebunden an den öffentlichen Schlüssel des Gateways | Einmal verwendbare Nonce |
| PayPal | PayPal Hosted Fields (Karte, wiederkehrend) sowie PayPal Smart Buttons mit Venmo-Finanzierung (einmalig); beide nutzen ein gemeinsames SDK-Laden und die serverseitige Bestellung, die über `/donate/client-token` + `/donate/create-order` erstellt wird | Erfasste Bestell-ID |
| Paystack | Paystack Inline-Popup (`js.paystack.co/v2/inline.js`) -- das Popup selbst nimmt die Zahlung entgegen (Karte, Mobiles Geld, Banküberweisung, USSD) | Referenz der bezahlten Transaktion; gespeicherte Methoden sind Paystack-Autorisierungscodes `AUTH_…` |

Die Funktion `finalizeResult` von Stripe führt 3-D-Secure / SCA im Browser aus (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), bevor die Spende als abgeschlossen gilt. Das gemeinsame Formular ruft lediglich `provider.finalizeResult(result)` auf und kennt die Details nicht.

## Serverseitig: die Gateway-Abstraktion (GivingApi)

Das Modul `/giving` (`Api/src/modules/giving`) stellt die REST-Schnittstelle bereit; die Gateway-Infrastruktur liegt in `Api/src/shared/helpers`. `DonateController` spricht nie direkt mit einem Gateway-SDK. Er geht über `GatewayService`, der über `GatewayFactory` den passenden `IGatewayProvider` auflöst und ihm eine entschlüsselte `GatewayConfig` übergibt.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ist der Vertrag, den jedes Gateway erfüllt. Er umfasst den Lebenszyklus der Webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), Zahlungen (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), Gebühren (`calculateFees`), die Verwaltung gespeicherter Methoden (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) sowie optionale Erweiterungen (Kunden, Bestellungen, SetupIntents, erneutes Abspielen von Ereignissen, `retryFailedPayment` für eine fehlgeschlagene Abonnementrechnung, `registerPaymentMethodDomain` für die Domainverifizierung bei Apple Pay). Ein Anbieter, der einen optionalen Hook nicht implementiert, wird für diese Aktion als nicht unterstützt gemeldet, und die Oberfläche blendet das Steuerelement aus. Jede Anbieterklasse deklariert eine eigene `capabilities`-Matrix (unterstützte Währungen, ACH, Erstattungen, Anforderungen für Abonnements, Transaktionslimits). `GatewayService.getProviderCapabilities(provider)` liest sie nur aus. Kennzeichen wie `logsDonationsImmediately` steuern das Verhalten der Controller, ohne dass dort Bedingungen anhand des Anbieternamens nötig sind.

**Serveranbieter in `GatewayFactory` registriert:**

| Anbieter | Verfügbarkeit |
|----------|-------------|
| Stripe | Immer aktiv |
| PayPal | Immer aktiv |
| Kingdom Funding | Immer aktiv |
| Paystack | Immer aktiv (für Händler in Nigeria, Ghana, Südafrika, Kenia, Elfenbeinküste; Währungen NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Optional über das Umgebungsflag `ENABLE_SQUARE` |
| ePayMints | Optional über das Umgebungsflag `ENABLE_EPAYMINTS` |

Paystack unterscheidet sich von den anderen darin, dass das Geld bewegt wird, bevor GivingApi überhaupt beteiligt ist. Das Popup belastet den Spender, `processCharge` ist ein `GET /transaction/verify/:reference`, dessen bezahlter Betrag und dessen Währung mit der zu erfassenden Spende übereinstimmen müssen (eine Referenz, die bereits vorliegt, wird nie ein zweites Mal erfasst). Die erste Gabe eines wiederkehrenden Plans wird aus `finalizeSubscription` erfasst (Verifizierung → `POST /plan` → `POST /subscription` mit `start_date` einen Intervall in der Zukunft). Webhooks werden mit dem geheimen Schlüssel selbst signiert (`x-paystack-signature`, HMAC-SHA512 über den Rohtext), und Paystack bietet keine API zur Verwaltung von Webhooks. Daher zeigt der Verwaltungsbildschirm die URL, die die Gemeinde in ihr Dashboard einfügen muss. `charge.success`-Ereignisse bei Verlängerungen enthalten keine Aufteilung auf Fonds; diese ermittelt der Anbieter aus den lokalen Zeilen `subscriptions`/`subscriptionFunds` des Spenders. Nur Kartenautorisierungen sind `reusable`. Gaben über mobiles Geld sind nur einmalig, daher lehnt `createSubscription` sie ab. Die Demodaten legen eine zweite Gemeinde an (Accra Community Church, `CHU00000002`) mit einem GHS-Testgateway von Paystack, damit die Paystack-Playwright-Suite neben der Stripe-Suite von Grace läuft.

Eigene Anbieter lassen sich zur Laufzeit registrieren, wenn `ENABLE_CUSTOM_GATEWAY_PROVIDERS` gesetzt ist. `AbstractExperimentalGatewayProvider` ist die Basisklasse für diese Anbieter. Anbieternamen werden ohne Beachtung der Groß- und Kleinschreibung zugeordnet.

### Gateway-Konfiguration und Geheimnisse

Ein Administrator speichert Zugangsdaten für ein Gateway über `POST /giving/gateways` (`GatewayController`). Beim Speichern verschlüsselt der Controller den privaten und den Webhook-Schlüssel mit `EncryptionHelper`, bevor er sie speichert. Auf jedem Host außer localhost löscht er anschließend den vorhandenen Webhook der Gemeinde und richtet einen neuen ein, der auf `/giving/donate/webhook/{provider}?churchId=…` zeigt. Eine Gemeinde hat pro Anbieter genau eine Zeile: Beim Speichern eines Gateways wird nur die bestehende Zeile desselben Anbieters ersetzt. Öffentliche Lesezugriffe (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) geben nur öffentliche Schlüssel zurück.

## Datenmodell

Das Giving-Schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, Modelle in `models/`) ist ein MySQL-Schema, auf das über Kysely zugegriffen wird:

| Tabelle | Aufgabe |
|-------|------|
| `gateways` | Konfiguration der Anbieter je Gemeinde: `provider`, `publicKey`, verschlüsselter `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Zweckbindungen für Spenden (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppierung zur Erfassung und Auswertung (`name`, `batchDate`) |
| `donations` | Eine Gabe: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; Bescheinigungen, Summen, Dashboards und Spendenberichte zählen nur `complete` oder null), `transactionId` |
| `fundDonations` | Verteilung einer Spende auf einen oder mehrere Fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Wiederkehrende Gabe; `id` ist die Abonnement-ID des Gateways, verknüpft mit `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Aufteilung einer wiederkehrenden Gabe auf Fonds |
| `customers` | Verknüpft eine `personId` mit ihrer Kunden-ID beim Gateway, je `provider` |
| `gatewayPaymentMethods` | Gespeicherte Karten/Bankkonten: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Prüfprotokoll der Webhook-/Ereignisse und Schlüssel zur Vermeidung von Dubletten (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Zusagenkampagnen, die einem Fonds zugeordnet sind, und der zugesagte Betrag jeder Person |

Eine Spende wird über `fundDonations` auf Fonds aufgeteilt: Die Spende trägt die Gesamtsumme, jede `fundDonation` trägt einen Teilbetrag. `donations.currency` und `gateways.currency` enthalten die ISO-Währung. Jeder Anbieter gibt seine `supportedCurrencies` an, und Beträge werden mit `CurrencyHelper.formatCurrencyWithLocale` formatiert.

## Abläufe von Anfang bis Ende

### Einmalige und wiederkehrende Spenden von Mitgliedern (B1App)

Der Spendenbildschirm für angemeldete Nutzer (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setzt drei Komponenten von apphelper zusammen: `MultiGatewayDonationForm`, `PaymentMethods` und `RecurringDonations`. B1App übernimmt das umgebende Laden der Daten (`GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`) und reicht die Liste der Gateways durch. Der aufgelöste Anbieter lädt sein SDK selbst anhand des öffentlichen Schlüssels des Gateways. Die eigentliche Belastung findet in apphelper statt: Der aufgelöste Anbieter tokenisiert die (neue oder gespeicherte) Zahlungsmethode und sendet dann für eine einmalige Gabe an `/giving/donate/charge` bzw. für eine wiederkehrende Gabe an `/giving/donate/subscribe`. Beide Endpunkte ordnen eine angemeldete Spenderin bzw. einen angemeldeten Spender der eigenen `personId` zu (nur Inhaber von `donations.edit` dürfen einer anderen Person zuordnen) und lehnen Fondsaufteilungen ab, deren Summe den belasteten Betrag übersteigt. Wiederkehrende Gaben erzeugen eine Zeile in `subscriptions` samt `subscriptionFunds` und übergeben den Zahlungsplan an das Gateway (Stripe Subscriptions, PayPal Billing Plans oder ein wiederkehrender Plan von KF).

### Gastspenden und anonyme Spenden

Die öffentliche Spendenseite (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) und das Panel „Jetzt geben“ rendern `NonAuthDonationWrapper` aus `@churchapps/apphelper/website`. Dieser bindet reCAPTCHA und den Elements-Kontext des Gateways um das `GuestForm` des Anbieters. Gäste erhalten keine Anmeldung, keine gespeicherten Methoden und keinen Verlauf. Der Ablauf lädt `GET /giving/funds/churchId/:id` und `GET /giving/donate/gateways/:churchId` (nur öffentliche Schlüssel), prüft den Besucher mit `POST /giving/donate/captcha-verify`, tokenisiert im Browser und sendet an `/giving/donate/charge` (bzw. `/subscribe`). Die Lastschrift per ACH für Gäste nutzt den anonymen Endpunkt `POST /giving/paymentmethods/ach-setup-intent-anon`, der nur die sofortige Verifizierung (Financial Connections) erlaubt. Eine Verifizierung per Kleinbetrag dauert Tage und endet erst, nachdem die Gästeseite nicht mehr geöffnet ist. Sie könnte also nie abgeschlossen werden. Das Formular belastet kein nicht verifiziertes SetupIntent und verweist den Spender auf Karte oder eine Bankeinrichtung nach der Anmeldung.

Drei Optionen des Gästeformulars nutzen denselben Belastungsaufruf. `?fundId=` und `?amount=` in der URL der Spendenseite wählen die Fondsaufteilung vor (jedes Gästeformular des Anbieters liest sie beim Mounten und leitet sie über den normalen Handler für Fondsänderungen weiter, damit Summen und Gebühren aktualisiert werden). `anonymous: true` bewirkt, dass `DonateController.charge` jede vom Client gesendete Person verwirft und die Gabe mit `personId = null` erfasst. Das Gästeformular überspringt `/people/loadOrCreate` und den Schritt mit Kunde bzw. Tresor. Die drei Anbieter mit sofortiger Erfassung lösen keine Person mehr über den Kunden beim Gateway auf. Apple Pay setzt voraus, dass die Domain der Seite bei Stripe registriert ist. Daher sendet ein Stripe-Gästeformular einmal pro Sitzung an den öffentlichen, ratenbegrenzten Endpunkt `POST /giving/donate/register-domain`. Dieser akzeptiert nur eine Domain, die zur Gemeinde gehört (`<subDomain>.b1.church`, ein Eintrag in der Domain-Tabelle des Inhaltsmoduls oder ein lokaler Host), bevor er die Payment-Method-Domains-API von Stripe aufruft.

### Erfassung durch Verwaltung und Stripe-Import (B1Admin)

Der Bereich Spenden in B1Admin (`B1Admin/src/donations/`) ist der Arbeitsplatz für die Finanzabteilungen. Die Erfassung im Bündel (`components/BulkDonationEntry.tsx`) nimmt Bar-, Scheck- und Sachspenden auf, indem sie `/giving/donations` und danach `/giving/funddonations` aufruft. Ein Gateway ist dabei nicht beteiligt. Das Blatt **Gabe erfassen** im Personendatensatz (`components/LogGiftDialog.tsx`) tut dasselbe für eine einzelne Gabe. Dabei wird zuerst das Bündel gesucht, dessen `batchDate` dem Datum der Gabe entspricht, oder es wird ein Bündel mit diesem Datum als Namen angelegt (`POST /giving/donationbatches`). Schlägt ein späterer Schritt fehl, werden Spende und neu angelegtes Bündel wieder gelöscht. Fonds, Bündel, Kampagnen und Bescheinigungen entsprechen jeweils den CRUD-Routen unter `/giving/*`. Das Panel für Spenden im Stil der Mitglieder (`B1Admin/src/donationComponents/`) nutzt dieselben Komponenten von apphelper wie B1App.

Berichte und Übergaben an die Buchhaltung laufen clientseitig oder über den Berichtslauf, nicht über das Gateway. Der QuickBooks-Export auf der Seite des Bündels erstellt aus `donations` und `fundDonations` des Bündels eine CSV-Journalbuchung (Soll Undeposited Funds, je Fonds eine Habenbuchung). Die Ansicht „Ehemalige Spender“ auf der Übersichtsseite führt `Api/reports/lapsedGivers.json` über den allgemeinen Berichtslauf aus, wobei die Namen der Personen durch `ReportOutput` aufgelöst werden. Länderspezifische Formate für Bescheinigungen (Kanada / Australien / Neuseeland) sind Gemeindeeinstellungen im Schlüssel-Wert-Speicher des Membership-Moduls. Sie werden von `GivingStatementDocument` dargestellt und in der Druckseite von B1App dupliziert. Die Druckseiten für Bescheinigungen in B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) übergeben die Einstellung `logoLight` der Gemeinde (über `usePrintLogo` in `B1Admin/src/components/PrintChurchHeader.tsx`), sodass das Logo oben auf jeder Bescheinigung gedruckt wird. Sie warten außerdem auf das Bild, bevor der automatische Druck startet.

### Umrechnung von Summen mit gemischten Währungen

Jeder Endpunkt, der eine einzelne Gesamtsumme über möglicherweise gemischte Währungen liefert, rechnet serverseitig in die Standardwährung der Gemeinde um, statt unterschiedliche Währungen zu addieren. Dazu gehören die Kennzahlen der Spendenübersicht (`GivingKpiCards`), die Summe eines Spendenbündels, die Summe eines Fonds sowie die Jahres- und Zeitraumssummen auf dem Spendenbildschirm von B1App. `Api/src/shared/helpers/ExchangeRateHelper.ts` ruft Kurse von `api.frankfurter.dev` ab, die über die Währung der Gemeinde ermittelt werden. Sie werden 12 Stunden lang im Prozess zwischengespeichert und stellen `convertTotals(rows, churchCurrency, rates)` bereit. Zeilen werden in SQL bereits nach Währung gruppiert (wenige Gruppen, nie eine Umrechnung je Gabe). Jede Gruppe wird umgerechnet und summiert. Das Ergebnis enthält ein Kennzeichen `isConverted`, mit dem der Client den Hinweis „Umgerechnet zu aktuellen Wechselkursen“ anzeigt. `GET /donations/exchange-rates` stellt die Kurstabelle für Clients bereit, die sie benötigen (den Spendenbildschirm von B1App). Die Kurse selbst werden nie aus einer Anfrage übernommen, sondern ausschließlich serverseitig abgerufen. So kann ein Client keine gemeldete Summe beeinflussen. Einzelne Spendendatensätze sowie Berichte zu Originalwährungen oder Vorjahren werden nie umgerechnet, sondern nur zusammengefasste Summen.

Der Stripe-Import (`B1Admin/src/donations/StripeImportPage.tsx`) nachträglich erfasst Gaben, die außerhalb von B1 getätigt wurden. Er ruft `POST /giving/donate/replay-stripe-events` mit `dryRun: true` für eine Vorschau auf und danach mit `dryRun: false` für den Import. Der Server listet die Stripe-Ereignisse des Zeitraums auf und überspringt alles, was bereits erfasst ist. Die Prüfung erfolgt zuerst über die Provider-ID in `eventLogs`, dann über die Transaktions-ID und schließlich über `DonationRepo.findMatchingDonation` (Betrag, Datum, Person). So wird beim erneuten Ausführen nichts doppelt importiert. Die Ereignisse `charge.succeeded` / `payment_intent.succeeded` bei Abonnements werden übersprungen, weil `invoice.paid` diese Gaben erfasst. Neuere Versionen der Stripe-API entfernen `PaymentIntent.invoice`. Deshalb wird das Überspringen zusätzlich über die Beschreibung „Subscription …“ gesteuert.

## Webhooks und Abgleich

Abgeschlossene Zahlungen und Änderungen an Abonnements treffen unter `POST /giving/donate/webhook/:provider?churchId=…` ein (`DonateController.webhook`). Die Verarbeitung ist bewusst idempotent:

1. **Prüfen** -- `GatewayService.verifyWebhook` übergibt die Prüfung an die Signaturprüfung des Anbieters. Schlägt die Signatur fehl, wird 401 zurückgegeben. Ereignisse, die keine Verarbeitung benötigen, werden mit 200 abgeschlossen.
2. **Ereignis auf Dubletten prüfen** -- `EventLogRepo.loadByProviderId` überspringt einen Webhook, der bereits in `eventLogs` erfasst ist.
3. **Spende auf Dubletten prüfen** -- Bevor etwas angelegt wird, prüft `DonationRepo.loadByTransactionId` jede mögliche Kennung, die die Nutzlast enthalten könnte. Damit werden doppelte Zustellungen, mehrstufige ACH-Ereignisse (ausstehend → abgerechnet) und der Fall abgefangen, dass `/donate/charge` die Gabe bereits optimistisch erfasst hat.
4. **Anwenden** -- `classifyWebhookEvent(eventType)` des Anbieters legt fest, was das Ereignis bedeutet (`donation` ausstehend/abgeschlossen, `cancel-subscription` oder `ignore`). Abgeschlossene Zahlungen erzeugen eine Spende mit dem Status `complete` (oder heben eine vorhandene `pending`- oder `failed`-Spende an). ACH-artige Ereignisse werden bis zur Abrechnung als `pending` erfasst. Eine fehlgeschlagene Abonnementrechnung (Stripe `invoice.payment_failed`) erzeugt eine Spende mit dem Status `failed`, die über die Rechnungs-ID zugeordnet wird. Kündigungsereignisse löschen die lokale Zeile in `subscriptions`. Der Controller prüft nie anbieterspezifische Ereignisnamen.

### Fehlgeschlagene wiederkehrende Gaben und Mahnwesen

Eine Spende mit dem Status `failed` ist die Einheit für die Wiederherstellung. `GET /giving/donations/failed` listet sie mit der neuesten Fehlermeldung des Gateways aus `eventLogs` und einem Kennzeichen `canRetry` aus den Fähigkeiten des Gateways auf. `POST /giving/donate/retry/:donationId` ruft die Funktion `retryFailedPayment` des Anbieters auf (Stripe begleicht die offene Rechnung). Der daraus folgende Webhook hebt die Zeile über den normalen Weg zur Vermeidung von Dubletten auf `complete`. Mahn-E-Mails gehen an den Spender: am Tag 0 vom Webhook-Handler, danach von `DunningHelper.run` im nächtlichen Timer (verdrahtet in `lambda/timer-handler.ts` und `RailwayCron.ts`) nach 3 und 7 Tagen. Jeder Versand wird in `eventLogs` als `provider: "dunning"` mit `providerId: "<donationId>:<day>"` erfasst, sodass ein erneuter Lauf nie doppelt sendet. Gibt Stripe auf und kündigt das Abonnement (`customer.subscription.deleted` mit `cancellation_details.reason: "payment_failed"`), sendet `DunningHelper.notifyCanceled` dem Spender einmalig eine E-Mail (`providerId: "<subscriptionId>:canceled"`). Kündigungen durch den Spender oder die Verwaltung bleiben stumm. Stripe fügt einem bestehenden Endpunkt nie neue Ereignisse hinzu. Nach einer Änderung von `StripeHelper.webhookEvents` muss deshalb entweder das Gateway erneut gespeichert oder `tools/manual/stripe-webhook-events.ts` ausgeführt werden (standardmäßig als Testlauf, mit `--apply` zum Schreiben) und zwar gegen die Produktivumgebung.

Anbieter mit `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) erfassen ihre Belastungen aus der Antwort von `/charge` (im Normalfall ist kein Webhook-Durchlauf erforderlich). Stripe stützt sich auf `payment_intent.succeeded` / `invoice.paid` sowie bei ACH auf `payment_intent.processing`. Die Behandlung der Gebühren (`POST /giving/donate/fee`, das Gateway-Flag `payFees` und die Funktion `calculateFees` jedes Anbieters) berechnet die Aufschlagung „Gebühren übernehmen“ auf Seiten des Spenders. B1 erhebt keinen Anteil an der Plattform, daher wird nie eine Anwendungsgebühr hinzugefügt.

:::info
Der Belastungs- und der Webhook-Pfad schreiben dieselben Zeilen in `donations` / `fundDonations`. Die `transactionId` ist der Verknüpfungsschlüssel. Er sorgt dafür, dass eine optimistische Erfassung der Belastung und der spätere Webhook nicht zwei Spenden für dieselbe Gabe erzeugen.
:::

## Verwandte Seiten

- [Giving-Endpunkte](../api/endpoints/giving) — vollständige REST-Schnittstelle für Spenden, Fonds, Bündel, Gateways, Abonnements, Zahlungsmethoden und Webhooks
- [AppHelper](../shared-libraries/app-helper) — das npm-Paket mit der Registry der Zahlungsanbieter und den Spendenkomponenten
- [Modulstruktur](../api/module-structure) — wie das Modul GivingApi serverseitig aufgebaut ist

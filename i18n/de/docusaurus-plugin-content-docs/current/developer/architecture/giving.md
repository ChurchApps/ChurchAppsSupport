---
title: "Spenden-Architektur"
---

# Spenden-Architektur

<div class="article-intro">

ChurchApps läuft auf Spenden auf einem Gateway-Schienen-Modell: Die Gemeinde behält ihr eigenes Stripe (oder PayPal, oder Kingdom Funding) Konto, und B1 sitzt nie im Geld-Weg als Plattform-Prozessor. Kartendaten werden im Browser tokenisiert und erreichen nie einen ChurchApps-Server. Diese Seite zeigt den ganzen Stack — die Client-seitige Anbieter-Registry in `@churchapps/apphelper`, die GivingApi Gateway-Abstraktion, das Spenden-Datenmodell und wie Gateway-Webhooks zurück in die Datenbank abgestimmt werden.

</div>

## Überblick

```
┌─────────────────────────────┐                   ┌──────────────────────────────────┐
│  B1App / B1Admin (Browser)  │                   │  Spenden-Gateway                 │
│  @churchapps/apphelper      │                   │  (Stripe / PayPal / KF)          │
│  Zahlungs-Anbieter-Registry │ ──────────────────▶ Card Entry                       │
│  getPaymentProvider()       │◀── token / nonce ─ (Karte erreicht nie B1 Server)    │
└─────────────┬───────────────┘                   └────────────┬────────────────────┘
              │  POST /giving/donate/charge                    │
              │  { token, amount, funds, person }              │
              ▼                                                 ▼
┌─────────────────────────────────────────────┐  GatewayService
│  GivingApi — /giving module                 │  → IGatewayProvider
│  DonateController → GatewayService          │  (Stripe / PayPal / Kingdom Funding)
│  donations · funds · subscriptions · …      │
└─────────────────────────────────────────────┘
```

Drei Prinzipien gelten über den Stack:

1. **Das Gateway hält die Karte.** Jeder Anbieter-Widget tokenisiert im Browser; die API erhält nur ein Token, Nonce oder Order-ID.
2. **Eine Abstraktion, viele Anbieter.** Der Browser löst einen `PaymentProvider` aus einer Registry auf; der Server löst einen `IGatewayProvider` aus einer Fabrik auf. Beide Schlüssel auf denselben normalisierten Anbieter-Namen, die auf dem Gateway-Datensatz gespeichert sind.
3. **Webhooks sind die Quelle der Wahrheit für Ausgleich.** Eine Charge-Antwort wird optimistisch erfasst, aber der Webhook des Gateways ist das, was Abschluss bestätigt.

## Client-seitig: Zahlungs-Anbieter-Registry

Die Registry lebt in `Packages/apphelper/src/donations/providers/`, mit jedem Anbieter-Widget unter seinem eigenen Unterordner. Jeder `PaymentProvider` bündelt alles, was eine Host-App für ein Gateway benötigt: Deskriptoren, Fähigkeiten, React-Widgets für Mitglied-Eintrag, Gast-Spende, gespeicherte Methode-Bearbeitung und Formular-Frage-Zahlungen.

Anbieter tokenisieren unterschiedlich, aber alle halten die Karte aus B1:

| Anbieter | Eintrag | Token |
|---|---|---|
| Stripe | Elements CardElement | payment-method id (pm_…) |
| Kingdom Funding | Gehosteter Tokenizer | Single-use Nonce |
| PayPal | Gehostete Felder | erfasstes Order-ID |

## Server-seitig: Gateway-Abstraktion

`DonateController` spricht nie direkt mit einem Gateway-SDK — es geht durch `GatewayService`, die den richtigen `IGatewayProvider` aus `GatewayFactory` auflöst. `IGatewayProvider` ist der Vertrag, den jedes Gateway implementiert — Webhooks, Zahlungen, Gebühren, gespeicherte Methoden und optionale Extras.

**Server-Anbieter in `GatewayFactory`:**

| Anbieter | Verfügbarkeit |
|---|---|
| Stripe | Immer ein |
| PayPal | Immer ein |
| Kingdom Funding | Immer ein |
| Square | Opt-in via ENABLE_SQUARE |
| ePayMints | Opt-in via ENABLE_EPAYMINTS |

## Datenmodell

Die Spenden-Schema mit Tabellen wie `gateways`, `funds`, `donations`, `fundDonations`, `subscriptions`, `customers`, `gatewayPaymentMethods`, `eventLogs`, `campaigns` und `pledges`. Eine Spende wird über Fonds über `fundDonations` geteilt.

## Verwandte Artikel

- [Spenden-Endpoints](../api/endpoints/giving) — Vollständige REST-Oberfläche
- [AppHelper](../shared-libraries/app-helper) — Das npm-Paket mit Provider-Registry
- [Modul-Struktur](../api/module-structure) — Wie GivingApi organisiert ist

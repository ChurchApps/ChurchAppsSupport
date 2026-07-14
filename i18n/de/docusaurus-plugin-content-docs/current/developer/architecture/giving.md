---
title: "Spendenarchitektur"
---

# Spendenarchitektur

<div class="article-intro">

ChurchApps läuft Spenden auf einem Gateway-Schienen-Modell: Die Kirche behält ihr eigenes Stripe- (oder PayPal- oder Kingdom Funding-) Konto, und B1 sitzt niemals im Geldpfad als Plattformprozessor. Kartendaten werden im Browser tokenisiert und erreichen niemals einen ChurchApps-Server. Diese Seite verweist den gesamten Stack – die Client-seitige Anbieter-Registry in `@churchapps/apphelper`, die GivingApi-Gateway-Abstraktion, das Spendenmodell, und wie Gateway-Webhooks wieder in die Datenbank abstimmen.

</div>

## Übersicht

Das System hat drei Kernprinzipien:

1. **Das Gateway hält die Karte.** Jedes Anbieter-Widget des Anbieters tokenisiert im Browser; die API erhält immer nur einen Token, Nonce oder Order-ID.
2. **Eine Abstraktion, viele Anbieter.** Der Browser löst einen `PaymentProvider` aus einer Registry auf; der Server löst einen `IGatewayProvider` aus einer Fabrik auf. Beide verwenden den gleichen normalisierten Anbieter-Namen, der im Gateway-Datensatz gespeichert ist.
3. **Webhooks sind die Quelle der Wahrheit für Verrechnung.** Eine Gebühren-Antwort wird optimistisch aufgezeichnet, aber der signierte Webhook des Gateways bestätigt (oder erstellt) die vollständige Spende, mit Idempotenz-Schutz auf beiden Seiten.

## Verfügbare Zahlungs-Provider

**Client-Provider:** Stripe, PayPal, Kingdom Funding
**Server-Provider:** Stripe, PayPal, Kingdom Funding, Square (opt-in), ePayMints (opt-in)

Benutzerdefinierte Anbieter können bei Bedarf registriert werden.

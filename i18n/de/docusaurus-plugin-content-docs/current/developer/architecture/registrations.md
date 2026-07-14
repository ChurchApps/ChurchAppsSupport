---
title: "Event-Registrierungen"
---

# Event-Registrierungen

<div class="article-intro">

Native Event-Registrierung lebt im Content-Modul und trägt, seit der Welle der bezahlten Registrierungen, ein volles Commerce-Modell: preisige Teilnehmertypen, preisige Add-on-Auswahlen, Rabattcodes, Zahlungen über das vorhandene Spenden-Gateway der Kirche, und eine Status-gesteuerte Warteliste.

</div>

## Drei Regeln

1. **Der Server besitzt den Preis.** Clients reichen Typ-IDs, Auswahl-IDs und Mengen ein; `RegistrationPricingHelper.computeTotal()` berechnet die Gesamtsumme Server-seitig.
2. **Kapazität wird atomar bei Einfügung durchgesetzt.** Jede Kapazitäts-begrenzte Einfügung verwendet eine `INSERT … SELECT … FROM dual WHERE (Zählung aktiver Zeilen) < Kapazität` Anweisung.
3. **Zahlungen fahren die Spenden-Schienen.** `RegistrationController` ruft den gemeinsamen `GatewayService.processCharge` mit dem konfigurierten Gateway der Kirche auf.

## Datenmodell

| Tabelle | Bedeutung |
|-------|-----------|
| `registrations` | Eine Registrierung pro Event |
| `registrationMembers` | Ein Teilnehmer einer Registrierung |
| `registrationTypes` | Teilnehmertypen (z.B. Erwachsener / Kind) |
| `registrationSelections` | Add-on-Optionen (z.B. T-Shirt) |
| `registrationCoupons` | Rabattcodes pro Event |

---
title: "Ereignis-Registrierungen"
---

# Ereignis-Registrierungen

<div class="article-intro">

Native Ereignis-Registrierung lebt im Inhalts-Modul und trägt seit der Bezahlten-Registrierungen-Welle ein vollständiges Handels-Modell: Preis-Teilnehmer-Typen, preis-Add-On-Auswahl, Rabatt-Codes, Zahlungen über das vorhandene Spenden-Gateway der Gemeinde und eine Status-angetriebene Warteliste. Der Geld-Weg wiederverwendet bewusst den Spenden-Stack — der Registrierungs-Controller lädt durch dasselbe `GatewayService` / `IGatewayProvider` Abstraktion, so dass kein Kartendaten oder Gateway-SDK-Wissen im Inhalts-Modul lebt. Diese Seite zeigt das Datenmodell, die Preis- und Kapazitäts-Regeln und die Registrierungs-, Zahlungs- und Wartelisten-Flows.

</div>

## Überblick

Drei Regeln gelten über den Stack:

1. **Der Server besitzt den Preis.** Clients reichen Typ-IDs und Auswahl-IDs ein; `RegistrationPricingHelper.computeTotal()` berechnet die Summe Server-seitig und Gutscheine werden zur Charge-Zeit erneut validiert.
2. **Kapazität wird atomar bei Einfügung durchgesetzt.** Jede Kapazitäts-limitierte Einfügung verwendet eine `INSERT … SELECT … FROM dual WHERE` Anweisung, so dass zwei gleichzeitige Registrierungen nicht beide den letzten Platz nehmen können.
3. **Zahlungen fahren auf Spenden-Schienen.** `RegistrationController` ruft den gemeinsamen `GatewayService.processCharge` mit dem konfigurierten Gateway der Gemeinde auf — derselbe Anbieter-Abstraktion, Token-Modell und SCA-Handling wie Spenden.

## Datenmodell

| Tabelle | Bedeutung | Schlüssel-Felder |
|---|---|---|
| `registrations` | Eine Registrierung | eventId, personId, **status** (pending/confirmed/waitlisted/cancelled), totalAmount |
| `registrationMembers` | Ein Teilnehmer auf einer Registrierung | registrationId, personId, **registrationTypeId** |
| `registrationTypes` | Teilnehmer-Typen pro Event | eventId, name, **price**, **capacity** |
| `registrationSelections` | Benannte Add-On-Optionen | eventId, name, **price**, **capacity**, **maxQuantity** |
| `registrationCoupons` | Rabatt-Codes | eventId, code, **discountType** (percent/amount), **value** |

## Zahlungs-Flow

`processRegistrationCharge` im Controller ist der einzige Ort, wo Registrierungen Geld berühren, und ist ein dünner Client des Spenden-Stacks. Tokenisierung geschieht im Browser genau wie für Spenden — der Registrierungs-Assistent recycelt die apphelper Zahlungs-Anbieter-Registry.

## Wartelisten-Lebenszyklus

Wenn das Ereignis voll ist und die `waitlistEnabled` Flag ein ist, speichert `register` die Party als `waitlisted` und sendet die normale Bestätigungs-E-Mail markiert als Wartelisten-Platz. Beförderung geschieht drei Wege — `cancel`, `delete` und die Mitarbeiter `promote` Endpoint — alles in `RegistrationRepo.promoteFromWaitlist` funneling.

## Verwandte Artikel

- [Spenden](./giving) — Die Gateway-Abstraktion und Tokenisierungs-Modell
- [Inhalts-Endpoints](../api/endpoints/content) — Vollständige REST-Oberfläche
- [Webhooks](../api/webhooks) — Das registration.created Ereignis

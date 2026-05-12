---
title: "Mehrwährungs-Unterstützung"
---

# Mehrwährungs-Unterstützung

<div class="article-intro">

Die Mehrwährungs-Funktion von B1 ermöglicht es Ihrer Gemeinde, Spenden in verschiedenen Währungen anzunehmen und zu verfolgen. Dies ist besonders nützlich für Gemeinden mit internationalen Mitgliedern, Missionaren oder mehreren Standorten in verschiedenen Ländern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung zur Verwaltung von Spenden. Siehe [Rollen & Berechtigungen](../people/roles-permissions.md) für Details.
- Richten Sie Ihr [Online-Spenden](./online-giving-setup.md) mit Stripe ein, das Mehrwährungstransaktionen unterstützt.
- Verstehen Sie die Buchhaltungsanforderungen Ihrer Gemeinde für den Umgang mit mehreren Währungen.

</div>

## Mehrwährungs-Unterstützung aktivieren

Die Mehrwährungs-Unterstützung ist jetzt standardmäßig in B1 aktiviert. Sobald aktiviert:

- Mitglieder können in ihrer lokalen Währung spenden, wenn sie online spenden
- Sie können Spenden in jeder Währung manuell erfassen
- Spendenberichte zeigen Beträge in ihrer ursprünglichen Währung an
- Stripe übernimmt automatisch die Währungsumrechnung für Online-Spenden

## Unterstützte Währungen

Das System unterstützt alle wichtigen Weltwährungen, einschließlich:

- **USD** -- US-Dollar
- **EUR** -- Euro
- **GBP** -- Britisches Pfund
- **CAD** -- Kanadischer Dollar
- **AUD** -- Australischer Dollar
- **MXN** -- Mexikanischer Peso
- **BRL** -- Brasilianischer Real
- **INR** -- Indische Rupie
- **CNY** -- Chinesischer Yuan
- **JPY** -- Japanischer Yen
- Und viele mehr...

Die verfügbaren Währungen für Online-Spenden hängen von den unterstützten Währungen Ihres Stripe-Kontos ab.

## Spenden in verschiedenen Währungen erfassen

### Online-Spenden

Wenn ein Mitglied online über Stripe spendet:

1. Wählt es seine bevorzugte Währung beim Checkout aus
2. Stripe verarbeitet die Zahlung in dieser Währung
3. Die Spende wird in B1 mit dem ursprünglichen Währungsbetrag erfasst
4. Stripe übernimmt automatisch alle notwendigen Währungsumrechnungen in die Standardwährung Ihres Kontos

### Manuelle Eingabe

Um eine Bar- oder Scheckspende in einer anderen Währung zu erfassen:

1. Navigieren Sie zu **Spenden** in B1 Admin
2. Klicken Sie auf **Spende hinzufügen**
3. Wählen Sie die Währung aus dem Währungs-Dropdown aus
4. Geben Sie den Betrag in dieser Währung ein
5. Vervollständigen Sie die restlichen Spendendetails
6. Klicken Sie auf **Speichern**

## Mehrwährungs-Spenden anzeigen

### Spendenberichte

Spendenberichte zeigen Beträge in ihrer ursprünglichen Währung an:

- Einzelne Spendendatensätze zeigen den Währungscode (z.B. "$100.00 USD")
- Summen werden pro Währung berechnet
- Sie können nach bestimmten Währungen filtern

### Spendenbescheinigungen

Beim Erstellen von Spendenbescheinigungen:

- Erscheint jede Spende mit ihrer ursprünglichen Währung
- Summen sind nach Währung aufgeschlüsselt
- Mitglieder sehen genau, was sie in jeder Währung gespendet haben

## Stripe-Integration

Für Online-Spenden übernimmt Stripe Mehrwährungstransaktionen:

- **Automatische Umrechnung** -- Stripe rechnet Währungen in die Standardwährung Ihres Kontos um
- **Wechselkurse** -- Stripe verwendet aktuelle Marktwechselkurse
- **Gebühren** -- Währungsumrechnung kann zusätzliche Stripe-Gebühren verursachen
- **Auszahlungswährung** -- Gelder werden in der Standardwährung Ihres Kontos eingezahlt

:::info
Überprüfen Sie Ihr Stripe-Dashboard, um aktuelle Umrechnungskurse und etwaige Gebühren im Zusammenhang mit Mehrwährungstransaktionen zu sehen.
:::

## Buchhaltungsaspekte

Beim Arbeiten mit mehreren Währungen:

- **Aufzeichnungen** -- Behalten Sie den Überblick über ursprüngliche Spendenbeträge und Währungen für genaue Berichterstattung
- **Wechselkurse** -- Beachten Sie, dass die Umrechnungskurse von Stripe von den Kursen Ihrer Bank abweichen können
- **Steuerbescheinigungen** -- Konsultieren Sie Ihren Buchhalter darüber, wie Spenden in verschiedenen Währungen für Steuerzwecke zu melden sind
- **Fondszuweisung** -- Sie können Spenden unabhängig von der Währung bestimmten Fonds zuweisen

## Best Practices

- **Standardwährung** -- Legen Sie Ihre primäre Gemeindewährung als Standard für die meisten Transaktionen fest
- **Klare Kommunikation** -- Teilen Sie Spendern mit, in welcher Währung sie während des Checkout-Prozesses spenden
- **Konsistente Berichterstattung** -- Entscheiden Sie, ob Sie in Originalwährungen berichten oder für Zusammenfassungen in eine einzige Währung umrechnen möchten
- **Regelmäßige Abstimmung** -- Gleichen Sie Stripe-Auszahlungen mit Ihren Spendendatensätzen ab und berücksichtigen Sie dabei Währungsumrechnungen

## Einschränkungen

- Währungsumrechnung wird nur für Online-Spenden von Stripe durchgeführt
- Manuelle Spenden werden wie eingegeben ohne automatische Umrechnung erfasst
- Historische Berichte zeigen Spenden in ihren Originalwährungen an
- Gesamtberechnungen erfolgen pro Währung, nicht währungsübergreifend

## Verwandte Artikel

- [Online-Spenden einrichten](./online-giving-setup.md) -- Konfigurieren Sie Stripe für die Annahme von Spenden
- [Spenden erfassen](./recording-donations.md) -- Spendendatensätze manuell eingeben
- [Spendenberichte](./donation-reports.md) -- Spendenzusammenfassungen erstellen und anzeigen
- [Spendenbescheinigungen](./giving-statements.md) -- Jahresend-Spendenbescheinigungen erstellen

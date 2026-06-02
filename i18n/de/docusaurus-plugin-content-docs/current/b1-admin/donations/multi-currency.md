---
title: "Multi-Währungs-Unterstützung"
---

# Multi-Währungs-Unterstützung

<div class="article-intro">

Mit der Multi-Währungs-Funktion von B1 können Ihre Kirchengemeinde Spenden in verschiedenen Währungen akzeptieren und nachverfolgen. Dies ist besonders nützlich für Kirchengemeinden mit internationalen Mitgliedern, Missionaren oder mehreren Standorten in verschiedenen Ländern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung zur Verwaltung von Spenden. Weitere Details finden Sie unter [Rollen & Berechtigungen](../people/roles-permissions.md).
- Richten Sie Ihre [Online-Spenden](./online-giving-setup.md) mit Stripe ein, das Multi-Währungs-Transaktionen unterstützt.
- Verstehen Sie die Anforderungen Ihrer Kirchengemeinde für die Verwaltung mehrerer Währungen.

</div>

## Multi-Währung aktivieren

Multi-Währungs-Unterstützung ist jetzt standardmäßig in B1 aktiviert. Einmal aktiviert:

- Mitglieder können in ihrer lokalen Währung spenden, wenn sie online spenden
- Sie können Spenden manuell in jeder Währung erfassen
- Spendenberichte zeigen Beträge in ihrer ursprünglichen Währung an
- Stripe verarbeitet die Währungsumrechnung automatisch für Online-Spenden

## Unterstützte Währungen

Das System unterstützt alle wichtigen Weltwährungen, darunter:

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
- und viele mehr...

Die verfügbaren Währungen für Online-Spenden hängen von den unterstützten Währungen Ihres Stripe-Kontos ab.

## Spenden in verschiedenen Währungen erfassen

### Online-Spenden

Wenn ein Mitglied online über Stripe spendet:

1. Es wählt seine bevorzugte Währung an der Kasse aus
2. Stripe verarbeitet die Zahlung in dieser Währung
3. Die Spende wird in B1 mit dem ursprünglichen Währungsbetrag erfasst
4. Stripe führt automatisch alle erforderlichen Währungsumrechnungen zu Ihrer Standard-Währung durch

### Manuelle Eintragung

Um eine Bargeld- oder Scheckspende in einer anderen Währung zu erfassen:

1. Navigieren Sie zu **Spenden** in B1 Admin
2. Klicken Sie auf **Spende hinzufügen**
3. Wählen Sie die Währung aus dem Währungs-Dropdown aus
4. Geben Sie den Betrag in dieser Währung ein
5. Füllen Sie die restlichen Spendendetails aus
6. Klicken Sie auf **Speichern**

## Multi-Währungs-Spenden ansehen

### Spendenberichte

Spendenberichte zeigen Beträge in ihrer ursprünglichen Währung an:

- Einzelne Spendendatensätze zeigen den Währungscode an (z.B. "$100,00 USD")
- Gesamtbeträge werden pro Währung berechnet
- Sie können nach bestimmten Währungen filtern

### Spendenbestätigungen

Bei der Erstellung von Spendenbestätigungen:

- Jede Spende wird mit ihrer ursprünglichen Währung angezeigt
- Gesamtbeträge werden nach Währung aufgeschlüsselt
- Mitglieder sehen genau, was sie in jeder Währung gegeben haben

## Stripe-Integration

Für Online-Spenden verwaltet Stripe Multi-Währungs-Transaktionen:

- **Automatische Umrechnung** -- Stripe rechnet Währungen zu Ihrer Standard-Währung um
- **Wechselkurse** -- Stripe verwendet aktuelle Marktwechselkurse
- **Gebühren** -- Die Währungsumrechnung kann zusätzliche Stripe-Gebühren verursachen
- **Auszahlungswährung** -- Gelder werden in Ihrer Standard-Währung eingezahlt

:::info
Überprüfen Sie Ihr Stripe-Dashboard, um aktuelle Umrechnungskurse und alle mit Multi-Währungs-Transaktionen verbundenen Gebühren anzuzeigen.
:::

## Rechnungslegung und Buchhaltung

Bei der Arbeit mit mehreren Währungen:

- **Führung von Aufzeichnungen** -- Behalten Sie die Spendendaten und Währungen in ihrer ursprünglichen Form, um genaue Berichte zu erstellen
- **Wechselkurse** -- Beachten Sie, dass die Umrechnungskurse von Stripe möglicherweise von Ihren Bankenkursen abweichen
- **Steuerquittungen** -- Konsultieren Sie Ihren Buchhalter darüber, wie Spenden in verschiedenen Währungen für Steuerzwecke gemeldet werden
- **Mittelzuordnung** -- Sie können Spenden unabhängig von der Währung zu bestimmten Mitteln zuordnen

## Best Practices

- **Standard-Währung** -- Legen Sie Ihre primäre Kirchengemeinde-Währung als Standard für die meisten Transaktionen fest
- **Klare Kommunikation** -- Teilen Sie den Spendern mit, welche Währung sie während des Checkouts spenden
- **Konsistente Berichterstattung** -- Entscheiden Sie, ob Sie in ursprünglichen Währungen berichten oder für Zusammenfassungen in eine einzige Währung umrechnen
- **Regelmäßige Abstimmung** -- Stimmen Sie Stripe-Auszahlungen mit Ihren Spendendatensätzen ab und berücksichtigen Sie dabei Währungsumrechnungen

## Einschränkungen

- Die Währungsumrechnung wird von Stripe nur für Online-Spenden verwaltet
- Manuelle Spenden werden so erfasst, wie sie eingegeben werden, ohne automatische Umrechnung
- Historische Berichte zeigen Spenden in ihrer ursprünglichen Währung
- Gesamtberechnungen werden pro Währung durchgeführt, nicht währungsübergreifend

## Verwandte Artikel

- [Online-Spenden einrichten](./online-giving-setup.md) -- Konfigurieren Sie Stripe zur Annahme von Spenden
- [Spenden erfassen](./recording-donations.md) -- Geben Sie Spendendatensätze manuell ein
- [Spendenberichte](./donation-reports.md) -- Generieren und sehen Sie Spendendaten
- [Spendenbestätigungen](./giving-statements.md) -- Erstellen Sie Jahresend-Spendenbestätigungen

---
title: "Unterstützung mehrerer Währungen"
description: "Spenden in verschiedenen Währungen in B1 Admin erfassen und auswerten, einschließlich manueller Eingabe, Online-Spenden über Stripe und der Umrechnung von Gesamtbeträgen."
---

# Unterstützung mehrerer Währungen

<div class="article-intro">

Die Funktion für mehrere Währungen in B1 ermöglicht es Ihrer Gemeinde, Spenden in verschiedenen Währungen anzunehmen und zu erfassen. Das ist besonders nützlich für Gemeinden mit internationalen Mitgliedern, Missionaren oder mehreren Standorten in verschiedenen Ländern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung, Spenden zu verwalten. Einzelheiten finden Sie unter [Rollen & Berechtigungen](../people/roles-permissions.md).
- Richten Sie Ihre [Online-Spenden](./online-giving-setup.md) mit Stripe ein, da Stripe Transaktionen in mehreren Währungen unterstützt. Eine Gemeinde ohne Online-Spenden kann trotzdem die Währung auswählen, in der ihre manuell erfassten Gaben verbucht werden.
- Klären Sie, welche buchhalterischen Anforderungen Ihre Gemeinde beim Umgang mit mehreren Währungen hat.

</div>

Die Währung Ihrer Gemeinde ist zunächst die Währung des Landes, das bei der Anmeldung Ihrer Gemeinde angegeben wurde (zum Beispiel Kenia-Schilling für eine Gemeinde in Kenia). Sie wird verwendet, solange noch keine Währung gespeichert wurde. Sie können sie jederzeit unter **Gemeinde verwalten → Spenden** ändern. Wird Ihr Land nicht erkannt, ist die Standardwährung US-Dollar.

## Mehrere Währungen aktivieren

Die Unterstützung mehrerer Währungen ist in B1 inzwischen standardmäßig aktiviert. Danach gilt:

- Mitglieder können bei Online-Spenden in ihrer Landeswährung geben
- Sie können Spenden in jeder Währung manuell erfassen
- Spendenberichte zeigen Beträge in der Originalwährung an
- Stripe übernimmt die Währungsumrechnung für Online-Spenden automatisch

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
- Und viele mehr ...

Welche Währungen für Online-Spenden verfügbar sind, hängt von den Währungen ab, die Ihr Stripe-Konto unterstützt.

## Spenden in verschiedenen Währungen erfassen

### Online-Spenden

Wenn ein Mitglied über Stripe online spendet:

1. Wählt es an der Kasse seine bevorzugte Währung aus
2. Verarbeitet Stripe die Zahlung in dieser Währung
3. Wird die Spende mit dem Betrag in der Originalwährung in B1 erfasst
4. Übernimmt Stripe automatisch die nötige Währungsumrechnung in die Standardwährung Ihres Kontos

### Manuelle Eingabe

Bar- und Scheckspenden, die Sie von Hand eingeben, werden in der Währung Ihrer Gemeinde erfasst. Das ist die **Währung**, die unter **Einstellungen > Spenden** festgelegt ist (siehe [Währung der Gemeinde festlegen](./online-giving-setup.md#choosing-your-currency)). Eine Auswahl der Währung pro Gabe gibt es nicht. Das Feld **Betrag** zeigt am Ende den Währungscode an (zum Beispiel *PHP*), damit Sie wissen, in welcher Währung Sie eingeben.

1. Öffnen Sie in B1 Admin **Spenden > Stapel** und öffnen Sie den Stapel
2. Klicken Sie oben auf der Stapelseite auf **Spende hinzufügen**
3. Geben Sie den Betrag in der Währung Ihrer Gemeinde ein
4. Ergänzen Sie die übrigen Angaben zur Spende
5. Klicken Sie auf **Speichern**

Beim Bearbeiten einer bestehenden Gabe bleibt die Währung erhalten, in der sie ursprünglich erfasst wurde.

## Spenden in mehreren Währungen einsehen

### Spendenberichte

Spendenberichte zeigen Beträge in ihrer Originalwährung an:

- Einzelne Spendenbuchungen zeigen den Währungscode (z. B. „100,00 USD“)
- Summen werden pro Währung berechnet
- Sie können nach bestimmten Währungen filtern

### Umgerechnete Summen {#converted-totals}

Überall dort, wo B1 eine einzige Gesamtsumme anzeigt (die Kennzahlen der Spendenübersicht, die Summe eines Spendenstapels und die Summe eines Fonds), werden Spenden in einer anderen Währung als der Standardwährung Ihrer Gemeinde mit den aktuellen Wechselkursen in die Währung Ihrer Gemeinde umgerechnet. So ergibt die Summe eine einzige aussagekräftige Zahl, statt unterschiedliche Währungen zu addieren. Unter der Summe erscheint der Hinweis **Umgerechnet zu aktuellen Wechselkursen**, sobald eine Umrechnung angewendet wurde. Einzelne Spendenposten werden weiterhin in ihrer Originalwährung angezeigt.

### Spendenbescheinigungen

Beim Erstellen von Spendenbescheinigungen gilt:

- Jede Spende erscheint in ihrer Originalwährung
- Summen werden nach Währung aufgeschlüsselt
- Mitglieder sehen genau, was sie in jeder Währung gegeben haben

## Stripe-Integration

Bei Online-Spenden übernimmt Stripe die Transaktionen in mehreren Währungen:

- **Automatische Umrechnung** -- Stripe rechnet Währungen in die Standardwährung Ihres Kontos um
- **Wechselkurse** -- Stripe verwendet aktuelle Marktkurse
- **Gebühren** -- Die Währungsumrechnung kann zusätzliche Stripe-Gebühren verursachen
- **Auszahlungswährung** -- Die Mittel werden in der Standardwährung Ihres Kontos gutgeschrieben

:::info
Prüfen Sie im Stripe-Dashboard die aktuellen Umrechnungskurse und etwaige Gebühren für Transaktionen in mehreren Währungen.
:::

## Buchhalterische Hinweise

Beim Arbeiten mit mehreren Währungen gilt:

- **Dokumentation** -- Halten Sie die ursprünglichen Spendenbeträge und Währungen für eine korrekte Auswertung fest
- **Wechselkurse** -- Beachten Sie, dass die Umrechnungskurse von Stripe von den Kursen Ihrer Bank abweichen können
- **Steuerbelege** -- Klären Sie mit Ihrer Steuerberatung, wie Spenden in verschiedenen Währungen für steuerliche Zwecke zu melden sind
- **Zuordnung zu Fonds** -- Sie können Spenden unabhängig von der Währung bestimmten Fonds zuordnen

## Empfehlungen

- **Standardwährung** -- Legen Sie Ihre Hauptwährung der Gemeinde unter **Einstellungen > Spenden** fest, damit manuell erfasste Gaben und Spendensummen sie verwenden
- **Klare Kommunikation** -- Teilen Sie Spendenden während des Bezahlvorgangs mit, in welcher Währung sie geben
- **Einheitliche Auswertung** -- Gesamtsummen werden immer automatisch in die Währung Ihrer Gemeinde umgerechnet. Nutzen Sie den Filter nach Währung pro Spende, wenn Sie die Originalbeträge sehen möchten
- **Regelmäßiger Abgleich** -- Gleichen Sie Stripe-Auszahlungen mit Ihren Spendenunterlagen ab und berücksichtigen Sie dabei die Währungsumrechnungen

## Einschränkungen

- Die Währungsumrechnung für die Zahlungsabwicklung übernimmt Stripe nur bei Online-Spenden. Manuelle Spenden werden so erfasst, wie sie eingegeben wurden, ohne automatische Umrechnung
- Historische Berichte und einzelne Spendenposten zeigen immer die Originalwährung, in der die Gabe erfasst wurde
- Gesamtsummen (Kennzahlen, Stapelsummen, Fondssummen) werden mit den aktuellen Wechselkursen in die Währung Ihrer Gemeinde umgerechnet. Diese Kurse können geringfügig von den Kursen Ihrer Bank oder Stripes zum Zeitpunkt der Gutschrift abweichen

## Verwandte Artikel

- [Online-Spenden einrichten](./online-giving-setup.md) -- Stripe für die Annahme von Spenden konfigurieren
- [Spenden erfassen](./recording-donations.md) -- Spendenbuchungen manuell eingeben
- [Spendenberichte](./donation-reports.md) -- Spendenübersichten erstellen und anzeigen
- [Spendenbescheinigungen](./giving-statements.md) -- Jährliche Spendenbescheinigungen erstellen

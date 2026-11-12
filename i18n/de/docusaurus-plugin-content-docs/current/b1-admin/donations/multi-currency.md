---
title: "Unterstützung mehrerer Währungen"
description: "Erfassen und melden Sie Spenden in verschiedenen Währungen in B1 Admin, einschließlich manueller Erfassung, Stripe-Online-Gaben und der Umrechnung kombinierter Summen."
---

# Unterstützung mehrerer Währungen

<div class="article-intro">

Die Funktion für mehrere Währungen in B1 erlaubt es Ihrer Kirche, Spenden in verschiedenen Währungen anzunehmen und zu erfassen. Das ist besonders nützlich für Kirchen mit internationalen Mitgliedern, Missionaren oder mehreren Standorten in verschiedenen Ländern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung, Spenden zu verwalten. Details finden Sie unter [Rollen & Berechtigungen](../people/roles-permissions.md).
- Richten Sie Ihre [Online-Spenden](./online-giving-setup.md) mit Stripe ein, das Transaktionen in mehreren Währungen unterstützt. Eine Kirche ohne Online-Spenden kann dennoch die Währung wählen, in der ihre manuell eingetragenen Gaben erfasst werden.
- Machen Sie sich mit den buchhalterischen Anforderungen Ihrer Kirche beim Umgang mit mehreren Währungen vertraut.

</div>

Die Währung Ihrer Kirche entspricht zunächst der Währung des Landes, das bei der Anmeldung der Kirche angegeben wurde (zum Beispiel kenianische Schilling für eine Kirche in Kenia), und wird verwendet, solange noch keine Währung gespeichert ist. Sie können sie jederzeit unter **Einstellungen → Spenden** (im Dropdown-Menü **Währung**) ändern. Wird Ihr Land nicht erkannt, beginnt die Einstellung mit US-Dollar.

## Mehrere Währungen aktivieren {#enabling-multi-currency}

Die Unterstützung mehrerer Währungen ist in B1 standardmäßig aktiviert:

- Online-Gaben werden in der Währung belastet, die in Ihren **Spenden**-Einstellungen gewählt ist
- Jede Spende behält die Währung, in der sie erfasst wurde, und einzelne Spendenzeilen zeigen diese Währung an
- Kombinierte Summen werden in die Währung Ihrer Kirche umgerechnet (siehe [Umgerechnete Summen](#converted-totals))
- Stripe übernimmt die Währungsumrechnung in Ihre Auszahlungswährung für Online-Gaben

## Unterstützte Währungen {#supported-currencies}

Das System unterstützt alle wichtigen Weltwährungen, darunter:

- **USD** – US-Dollar
- **EUR** – Euro
- **GBP** – Britisches Pfund
- **CAD** – Kanadischer Dollar
- **AUD** – Australischer Dollar
- **MXN** – Mexikanischer Peso
- **BRL** – Brasilianischer Real
- **INR** – Indische Rupie
- **CNY** – Chinesischer Yuan
- **JPY** – Japanischer Yen
- und viele weitere …

Welche Währungen für Online-Gaben verfügbar sind, hängt von den unterstützten Währungen Ihres Stripe-Kontos ab.

## Spenden in verschiedenen Währungen erfassen {#recording-donations-in-different-currencies}

### Online-Spenden {#online-donations}

Wenn ein Mitglied online über Stripe gibt:

1. Die Gabe wird in der Währung belastet, die unter **Einstellungen → Spenden** festgelegt ist; Spendende wählen beim Bezahlen keine Währung
2. Stripe verarbeitet die Zahlung in dieser Währung
3. Die Spende wird in B1 mit dieser Währung und diesem Betrag erfasst
4. Stripe übernimmt automatisch jede nötige Währungsumrechnung in die Auszahlungswährung Ihres Kontos

Ändern Sie die Einstellung **Währung** später, verwenden neue Gaben die neue Währung, während bereits erfasste Gaben ihre bisherige Währung behalten. Ihre Unterlagen können daher mehr als eine Währung enthalten.

### Manuelle Erfassung {#manual-entry}

Gaben, die Sie von Hand eintragen – in einem Stapel, mit **CSV importieren** oder mit **Gabe erfassen** im Datensatz einer Person –, werden immer in der Währung Ihrer Kirche erfasst; sie wird neben dem Feld **Betrag** angezeigt. Für die manuelle Erfassung gibt es kein Währungs-Dropdown. Rechnen Sie daher eine in einer anderen Währung getätigte Gabe vor der Eingabe in die Währung Ihrer Kirche um und vermerken Sie den ursprünglichen Betrag bei Bedarf unter **Notizen**.

## Spenden in mehreren Währungen ansehen {#viewing-multi-currency-donations}

### Spendenberichte {#donation-reports}

Einzelne Spendenzeilen – im Stapel, auf der Seite eines Fonds und im Spendenverlauf einer Person – zeigen jede Gabe in der Währung, in der sie erfasst wurde. Kombinierte Summen werden wie unten beschrieben umgerechnet.

### Umgerechnete Summen {#converted-totals}

Überall dort, wo B1 eine einzelne kombinierte Summe zeigt – die Kennzahlen-Karten der Gabenübersicht, die Summe eines Spendenstapels oder die Summe eines Fonds –, werden Spenden, die in einer anderen als der Standardwährung Ihrer Kirche erfasst wurden, mit den aktuellen Wechselkursen in die Währung Ihrer Kirche umgerechnet. So ist die Summe eine einzige aussagekräftige Zahl und nicht eine Addition unterschiedlicher Währungen. Unter der Summe erscheint der Hinweis **Umgerechnet zu den aktuellen Wechselkursen**, sobald eine Umrechnung angewendet wurde. Einzelne Spendenpositionen werden weiterhin in ihrer ursprünglichen Währung angezeigt.

### Spendenbescheinigungen {#giving-statements}

Spendenbescheinigungen listen den Betrag jeder Gabe so auf, wie er erfasst wurde, und addieren die Beträge ohne Umrechnung. Eine Bescheinigung ist daher nur dann korrekt, wenn alle Gaben dieser Person im Jahr in der Währung Ihrer Kirche vorliegen. Hat eine Person in mehr als einer Währung gegeben, prüfen Sie ihre Bescheinigung, bevor Sie sie versenden.

## Stripe-Integration {#stripe-integration}

Bei Online-Gaben übernimmt Stripe die Transaktionen in mehreren Währungen:

- **Automatische Umrechnung** – Stripe rechnet Währungen in die Standardwährung Ihres Kontos um
- **Wechselkurse** – Stripe verwendet aktuelle Marktwechselkurse
- **Gebühren** – Die Währungsumrechnung kann zusätzliche Stripe-Gebühren verursachen
- **Auszahlungswährung** – Die Gelder werden in der Standardwährung Ihres Kontos gutgeschrieben

:::info
Prüfen Sie in Ihrem Stripe-Dashboard die aktuellen Umrechnungskurse und alle Gebühren für Transaktionen in mehreren Währungen.
:::

## Buchhalterische Hinweise {#accounting-considerations}

Beim Arbeiten mit mehreren Währungen gilt:

- **Dokumentation** – Behalten Sie die ursprünglichen Spendenbeträge und Währungen im Blick, damit die Berichte korrekt sind
- **Wechselkurse** – Beachten Sie, dass die Umrechnungskurse von Stripe von denen Ihrer Bank abweichen können
- **Steuerbelege** – Klären Sie mit Ihrer Steuerberatung, wie Spenden in verschiedenen Währungen für steuerliche Zwecke zu melden sind
- **Fondszuordnung** – Sie können Spenden unabhängig von der Währung bestimmten Fonds zuordnen

## Bewährte Vorgehensweisen {#best-practices}

- **Standardwährung** – Legen Sie Ihre Hauptwährung unter **Einstellungen > Spenden** fest, damit manuell erfasste Gaben und Gebesummen sie verwenden
- **Klare Kommunikation** – Teilen Sie Spendenden beim Bezahlvorgang mit, in welcher Währung sie geben
- **Einheitliche Berichterstattung** – Kombinierte Summen werden immer automatisch in die Währung Ihrer Kirche umgerechnet; öffnen Sie einen Stapel oder einen Fonds, um den ursprünglichen Betrag und die Währung jeder Gabe zu sehen
- **Regelmäßiger Abgleich** – Gleichen Sie Stripe-Auszahlungen mit Ihren Spendenunterlagen ab und berücksichtigen Sie dabei die Währungsumrechnungen

## Einschränkungen {#limitations}

- Die Währungsumrechnung für die Zahlungsabwicklung übernimmt Stripe nur bei Online-Gaben; manuelle Spenden werden in der Währung Ihrer Kirche erfasst, so wie sie eingegeben wurden
- Historische Berichte und einzelne Spendenpositionen zeigen immer die ursprüngliche Währung, in der die Gabe erfasst wurde
- Kombinierte Summen (Kennzahlen-Karten, Stapelsummen, Fondssummen) werden mit den aktuellen Wechselkursen in die Währung Ihrer Kirche umgerechnet – diese Kurse können leicht von denen Ihrer Bank oder Stripe zum Zeitpunkt der Verrechnung abweichen

## Verwandte Artikel {#related-articles}

- [Einrichtung der Online-Spenden](./online-giving-setup.md) – Stripe für die Annahme von Spenden konfigurieren
- [Spenden erfassen](./recording-donations.md) – Spendendatensätze manuell eingeben
- [Spendenberichte](./donation-reports.md) – Spendenübersichten erstellen und ansehen
- [Spendenbescheinigungen](./giving-statements.md) – Jahresbescheinigungen erstellen

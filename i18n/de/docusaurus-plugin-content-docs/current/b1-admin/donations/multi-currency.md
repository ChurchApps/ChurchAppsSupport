---
title: "Multi-Währungs-Unterstützung"
---

# Multi-Währungs-Unterstützung

<div class="article-intro">

Die Multi-Währungs-Funktion von B1 ermöglicht es deiner Kirche, Spenden in verschiedenen Währungen anzunehmen und zu verfolgen. Dies ist besonders nützlich für Kirchen mit internationalen Mitgliedern, Missionaren oder mehreren Standorten in verschiedenen Ländern.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Du brauchst Berechtigung zur Verwaltung von Spenden. Siehe [Rollen und Berechtigungen](../people/roles-permissions.md) für Details.
- Richte dein [Online-Spenden](./online-giving-setup.md) mit Stripe ein, das Multi-Währungs-Transaktionen unterstützt.
- Verstehe die Buchhaltungsbedürfnisse deiner Kirche für die Handhabung mehrerer Währungen.

</div>

## Multi-Währung aktivieren

Multi-Währungs-Unterstützung ist jetzt standardmäßig in B1 aktiviert. Sobald aktiviert:

- Mitglieder können bei Online-Spenden in ihrer lokalen Währung spenden
- Du kannst Spenden manuell in jeder Währung aufzeichnen
- Spendendberichte zeigen Beträge in ihrer ursprünglichen Währung
- Stripe behandelt Währungsumrechnung automatisch für Online-Spenden

## Unterstützte Währungen

Das System unterstützt alle major Weltwährungen, einschließlich:

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

Die verfügbaren Währungen für Online-Spenden hängen von den unterstützten Währungen deines Stripe-Kontos ab.

## Spenden in verschiedenen Währungen aufzeichnen

### Online-Spenden

Wenn ein Mitglied online über Stripe spendet:

1. Es wählt seine bevorzugte Währung an der Kasse
2. Stripe verarbeitet die Zahlung in dieser Währung
3. Die Spende wird in B1 mit dem ursprünglichen Währungsbetrag aufgezeichnet
4. Stripe behandelt automatisch jede erforderliche Währungsumrechnung in die Standardwährung deines Kontos

### Manuelle Eingabe

Um eine Bar- oder Scheckspende in einer anderen Währung aufzuzeichnen:

1. Navigiere zu **Spenden** in B1 Admin
2. Klicke auf **Spende hinzufügen**
3. Wähle die Währung aus der Dropdown-Liste Währung
4. Gib den Betrag in dieser Währung ein
5. Vervollständige die übrigen Spendendetails
6. Klicke auf **Speichern**

## Multi-Währungs-Spenden anzeigen

### Spendendberichte

Spendendberichte zeigen Beträge in ihrer ursprünglichen Währung:

- Einzelne Spendendatensätze zeigen den Währungscode (z. B. „$100,00 USD")
- Summen werden pro Währung berechnet
- Du kannst nach bestimmten Währungen filtern

### Umgerechnete Summen

Überall dort, wo B1 eine einzige kombinierte Summe anzeigt -- die Spendendzusammenfassungs-KPI-Karten, eine Chargensumme und eine Fondssumme -- werden Spenden, die in einer anderen Währung als der Standardwährung deiner Kirche aufgezeichnet wurden, in deine Kirchenwährung unter Verwendung aktueller Wechselkurse umgerechnet, so dass die Summe eine einzelne aussagekräftige Zahl ist, anstatt verschiedene Währungen zusammenzurechnen. Ein Vermerk **Umgerechnet zu aktuellen Wechselkursen** wird unter der Summe angezeigt, wenn eine Umrechnung angewendet wurde. Einzelne Spendendposten werden weiterhin in ihrer ursprünglichen Währung angezeigt.

### Spendendbestätigungen

Beim Generieren von Spendendbestätigungen:

- Jede Spende erscheint mit ihrer ursprünglichen Währung
- Summen werden nach Währung aufgeschlüsselt
- Mitglieder sehen genau, was sie in jeder Währung gespendet haben

## Stripe-Integration

Für Online-Spenden verwaltet Stripe Multi-Währungs-Transaktionen:

- **Automatische Umrechnung** -- Stripe rechnet Währungen in die Standardwährung deines Kontos um
- **Wechselkurse** -- Stripe verwendet aktuelle Marktwechselkurse
- **Gebühren** -- Währungsumrechnung kann zusätzliche Stripe-Gebühren verursachen
- **Auszahlungswährung** -- Gelder werden in der Standardwährung deines Kontos eingezahlt

:::info
Überprüfe dein Stripe-Dashboard, um aktuelle Wechselkurse und eventuelle Gebühren im Zusammenhang mit Multi-Währungs-Transaktionen zu sehen.
:::

## Buchhaltungsüberlegungen

Bei der Arbeit mit mehreren Währungen:

- **Aufzeichnungsverwaltung** -- Verfolge ursprüngliche Spendendbeträge und Währungen für genaue Berichterstattung
- **Wechselkurse** -- Beachte, dass Stripes Umrechnungskurse möglicherweise von den Kursen deiner Bank abweichen
- **Steuernachweise** -- Wende dich an deinen Buchhalter, um zu erfahren, wie du Spenden in verschiedenen Währungen zu Steuerzwecken meldest
- **Fondsallokation** -- Du kannst Spenden unabhängig von der Währung bestimmten Fonds zuordnen

## Bewährte Verfahren

- **Standardwährung** -- Stelle deine primäre Kirchenwährung als Standard für die meisten Transaktionen ein
- **Klare Kommunikation** -- Teile Spendern mit, in welcher Währung sie während des Abrechnungsvorgangs spenden
- **Konsistente Berichterstattung** -- Kombinierte Summen werden immer automatisch in deine Kirchenwährung umgerechnet; verwende den Währungsfilter pro Spende, wenn du ursprüngliche Beträge sehen musst
- **Regelmäßige Abstimmung** -- Stimme Stripe-Auszahlungen mit deinen Spendendaufzeichnungen ab und berücksichtige dabei Währungsumrechnungen

## Einschränkungen

- Währungsumrechnung für die Zahlungsabwicklung wird von Stripe nur für Online-Spenden durchgeführt; manuell eingegebene Spenden werden ohne automatische Umrechnung aufgezeichnet
- Historische Berichte und einzelne Spendendposten zeigen immer die ursprüngliche Währung, in der das Geschenk aufgezeichnet wurde
- Kombinierte Summen (KPI-Karten, Chargensummen, Fondssummen) werden unter Verwendung aktueller Wechselkurse in deine Kirchenwährung umgerechnet -- diese Kurse können sich leicht von den Kursen deiner Bank oder Stripes zum Zeitpunkt der Fondsbeteiligung unterscheiden

## Verwandte Artikel

- [Online-Spenden einrichten](./online-giving-setup.md) -- Konfiguriere Stripe zum Akzeptieren von Spenden
- [Spenden aufzeichnen](./recording-donations.md) -- Erfasse manuell Spendendatensätze
- [Spendendberichte](./donation-reports.md) -- Generiere und zeige Spendendzusammenfassungen
- [Spendendbestätigungen](./giving-statements.md) -- Erstelle Jahresend-Spendendbestätigungen

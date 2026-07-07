---
title: "Personen durchsuchen"
---

# Personen durchsuchen

<div class="article-intro">

Die Seite **Personen** zeigt Ihr Kirchenverzeichnis in einer durchsuchbaren, sortierbaren Tabelle an. Sie können schnell jemanden in Ihrer Gemeinde finden, anpassen, welche Informationen angezeigt werden, und Ihre Ergebnisse exportieren. Eine effiziente Suche ist für alltägliche Aufgaben der Kirchenverwaltung wie das Nachverfolgen von Besuchern, das Vorbereiten von Kontaktlisten und die Verwaltung von Mitgliederdatensätzen unerlässlich.

</div>

<div class="prereqs">
<h4>Bevor Sie anfangen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zum Anzeigen von Personen. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie nicht sicher sind, welchen Zugriff Sie haben.
- Ihr Kirchenverzeichnis sollte Personen enthalten. Wenn Sie noch niemanden hinzugefügt haben, siehe [Personen hinzufügen](adding-people.md) oder [Daten importieren](importing-data.md).

</div>

## Schnellsuche

Die Suchleiste oben auf der Seite "Personen" ermöglicht es Ihnen, Mitglieder in Echtzeit zu finden:

1. Klicken Sie auf das **Suchfeld** oben auf der Seite "Personen".
2. Geben Sie einen Namen, eine E-Mail-Adresse oder ein anderes Schlüsselwort ein.
3. Die Ergebnisse werden automatisch gefiltert, wenn Sie eingeben (es gibt eine kurze Verzögerung von etwa einer halben Sekunde, damit die Suche nicht bei jedem Tastendruck ausgelöst wird).
4. Die Tabelle unten wird aktualisiert, um nur die übereinstimmenden Ergebnisse anzuzeigen.

:::tip
Sie müssen die Eingabetaste nicht drücken. Die Suche wird automatisch ausgeführt, nachdem Sie aufgehört haben zu tippen.
:::

## Sortieren von Ergebnissen

Sie können das Verzeichnis sortieren, indem Sie auf einen beliebigen Spaltenheader in der Tabelle klicken:

1. Klicken Sie auf einen **Spaltenheader** (z.B. **Name** oder **E-Mail**), um nach dieser Spalte zu sortieren.
2. Klicken Sie auf denselben Header erneut, um die Sortreihenfolge umzukehren.

Dies macht es einfach, Menschen alphabetisch, nach Alter oder nach einer beliebigen anderen sichtbaren Spalte zu finden.

## Anpassen von Spalten

Es ist nicht notwendig, dass jedes Stück Informationen auf einmal sichtbar ist. Sie können wählen, welche Spalten in der Tabelle angezeigt werden:

1. Suchen Sie nach dem **Spaltenauswahl-Dropdown** oben in der Tabelle.
2. Aktivieren oder deaktivieren Sie Spalten, um sie anzuzeigen oder auszublenden. Die verfügbaren Spalten enthalten:
   - **Foto**
   - **Name**
   - **E-Mail**
   - **Telefon**
   - **Adresse**
   - **Geburtsdatum**
   - **Alter**
   - **Geschlecht**
   - **Mitgliedschaftsstatus**
   - **Campus**
3. Die Tabelle wird sofort aktualisiert, um Ihre Auswahl zu widerspiegeln.

:::info
Ihre Spaltenauswahl wirkt sich darauf aus, was enthalten ist, wenn Sie in CSV exportieren. Passen Sie die Spalten vor dem Exportieren an, um genau die benötigten Daten zu erhalten.
:::

## Paginierung

Wenn Ihr Verzeichnis viele Datensätze hat, werden die Ergebnisse auf mehrere Seiten aufgeteilt. Verwenden Sie die **Paginierungssteuerelemente** am unteren Ende der Tabelle, um zwischen den Seiten zu wechseln. Die aktuelle Seite und die Gesamtzahl der Datensätze werden angezeigt, sodass Sie immer wissen, wo Sie sich in der Liste befinden.

:::tip
Wenn Sie mehr Ergebnisse auf einmal sehen möchten, grenzen Sie Ihre Suche ein, um die Liste einzuengen, anstatt durch ein großes Verzeichnis zu blättern.
:::

## Exportieren von Suchergebnissen

Sie können Ihre aktuellen Suchergebnisse jederzeit als CSV-Datei herunterladen:

1. Wenden Sie alle Suche oder Filter an, die Sie möchten.
2. Passen Sie Ihre Spalten an, um die benötigten Daten zu enthalten.
3. Klicken Sie auf die Schaltfläche **Exportieren**.
4. Eine CSV-Datei wird auf Ihren Computer heruntergeladen, bereit zum Öffnen in Excel, Google Sheets oder einer beliebigen Tabellenkalkulationsanwendung.

Weitere Details zum Exportieren finden Sie unter [Daten exportieren](./exporting-data.md).

:::tip
Für fortgeschrittenere Abfragen -- wie das Finden aller, die in den letzten drei Monaten nicht teilgenommen haben -- versuchen Sie die Funktion [KI-Suche](./ai-search.md), die es Ihnen ermöglicht, mit einfachen Sprachfragen zu suchen.
:::

## Erweiterte Suche

Die erweiterte Suche ermöglicht es Ihnen, genaue Filter zu erstellen, indem Sie Bedingungen kombinieren. Öffnen Sie sie von der Personenseite, erweitern Sie dann eine Kategorie und aktivieren Sie die Felder, die Sie filtern möchten, wählen Sie für jede einen Operator und Wert aus. Kategorien enthalten **Namen**, **Demografika**, **Kontakt**, **Mitgliedschaft**, **Aktivität** (Spenden und Anwesenheit) und **Benutzerdefinierte Felder**.

Die Kategorie **Benutzerdefinierte Felder** listet die [Benutzerdefinierten Felder](../settings/custom-fields.md) Ihrer Kirche auf -- die Felder, die Sie in den Einstellungen definieren, um Ihre eigenen Informationen zu verfolgen (z.B. ein Ablaufdatum der Hintergrundüberprüfung). Die angebotenen Operatoren entsprechen dem Typ jedes Feldes: Textfelder unterstützen *contains / equals / starts with / ends with*, Zahlenfelder unterstützen die Vergleichsoperatoren, Datumsfelder unterstützen *equals / after / before*, und Ja/Nein und Mehrfachauswahl-Felder ermöglichen es Ihnen, einen Wert auszuwählen. Alle Felder, auf die Sie hier filtern können, können als Live-[Liste](./lists.md) gespeichert werden.

## Speichern von Suchen als Listen

Nach Ausführung einer Suche wird eine Schaltfläche **Als Liste speichern** (Lesezeichen-Symbol) in der Header der Personenseite angezeigt. Klicken Sie darauf, um Ihre aktuelle Abfrage unter einem Namen und einer optionalen Kategorie zu speichern, damit Sie sie in zukünftigen Sitzungen sofort neu laden können. Siehe [Gespeicherte Listen](./lists.md) für vollständige Details.

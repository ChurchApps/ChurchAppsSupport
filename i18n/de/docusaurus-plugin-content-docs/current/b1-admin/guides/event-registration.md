---
title: "Anleitung: Veranstaltungsanmeldung einrichten"
---

# Veranstaltungsanmeldung einrichten

<div class="article-intro">

Erstellen Sie ein Anmeldeformular für Veranstaltungen, sammeln Sie Teilnehmerinformationen und optionale Zahlungen, betten Sie es auf Ihrer Gemeinde-Website ein und verwalten Sie die Eingänge. Am Ende haben Sie eine teilbare Anmeldeseite für jede Gemeindeveranstaltung.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1 Admin-Konto mit Admin-Zugang
- Für die Zahlungserfassung: [Stripe muss zuerst konfiguriert](../donations/online-giving-setup.md) sein

</div>

## Schritt 1: Ein eigenständiges Formular erstellen

Eigenständige Formulare haben ihre eigene öffentliche URL, auf die jeder zugreifen kann -- perfekt für Veranstaltungsanmeldungen.

Folgen Sie der Anleitung [Formulare erstellen](../forms/creating-forms.md), um:

1. Zu Formulare zu navigieren und auf Formular hinzufügen zu klicken
2. Den Typ „Eigenständig" zu wählen -- damit erhält Ihr Formular eine eigene öffentliche URL
3. Es nach der Veranstaltung zu benennen (z. B. „Männerfreizeit Anmeldung", „VBS-Anmeldung")

## Schritt 2: Fragen hinzufügen

Erstellen Sie die Felder, die Sie von den Anmeldern erfassen müssen.

Folgen Sie der Anleitung [Formulare erstellen](../forms/creating-forms.md#adding-questions), um Ihre Fragen hinzuzufügen:

1. Gehen Sie zur Registerkarte Fragen und fügen Sie Felder für die benötigten Informationen hinzu: Name, E-Mail, Telefon, Ernährungseinschränkungen, T-Shirt-Größe, Notfallkontakt usw.
2. Verwenden Sie Mehrfachauswahl für Optionen wie Essenspräferenzen oder Workshopauswahl

:::warning
Der Feldtyp Zahlung erfordert eine konfigurierte Stripe-Verbindung. Wenn Sie Online-Spenden noch nicht eingerichtet haben, lesen Sie [Online-Spenden einrichten](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen.
:::

## Schritt 3: Formulareinstellungen konfigurieren

Steuern Sie, wann und wie Ihr Anmeldeformular verfügbar ist.

1. Legen Sie Verfügbarkeitsdaten fest, wenn die Anmeldung nur für einen begrenzten Zeitraum geöffnet sein soll
2. Kopieren Sie die öffentliche URL -- Sie können diese direkt teilen
3. Fügen Sie Formularmitglieder mit Admin- oder Nur-Lesen-Rollen hinzu, um bei der Verwaltung der Eingänge zu helfen

## Schritt 4: Auf Ihrer Website einbetten

Machen Sie das Anmeldeformular leicht auffindbar, indem Sie es auf Ihrer Gemeinde-Website hinzufügen.

Folgen Sie der Anleitung [Seiten verwalten](../website/managing-pages.md), um:

1. In Ihrem B1-Website-Editor einen neuen Abschnitt zu einer Seite hinzuzufügen und das Element Formular auszuwählen
2. Ihr Anmeldeformular aus der Liste zu wählen

:::tip
Teilen Sie die eigenständige URL auch per E-Mail, in sozialen Medien und in Gemeindebriefen -- je mehr Stellen sie sichtbar ist, desto mehr Anmeldungen erhalten Sie.
:::

## Schritt 5: Eingänge verwalten

Verfolgen Sie Anmeldungen und exportieren Sie Daten bei Bedarf.

Folgen Sie der Anleitung [Eingänge verwalten](../forms/managing-submissions.md), um:

1. Antworten zu überprüfen, sobald sie auf der Registerkarte Eingänge eingehen
2. Als CSV zu exportieren für Tabellenkalkulationen, Teilnehmerzählung oder zum Teilen mit Veranstaltungskoordinatoren

## Fertig!

Ihre Veranstaltungsanmeldung ist live. Teilen Sie den Link, betten Sie ihn auf Ihrer Website ein und verfolgen Sie Anmeldungen über B1 Admin. Wenn die Veranstaltung vorbei ist, exportieren Sie die endgültige Liste für Ihre Unterlagen.

## Verwandte Artikel

- [Formulare erstellen](../forms/creating-forms.md) — Formulare mit verschiedenen Feldtypen erstellen
- [Eingänge verwalten](../forms/managing-submissions.md) — Formularantworten überprüfen und exportieren
- [Seiten verwalten](../website/managing-pages.md) — Formulare auf Ihrer Website einbetten
- [Online-Spenden einrichten](../donations/online-giving-setup.md) — Erforderlich für Zahlungsfelder

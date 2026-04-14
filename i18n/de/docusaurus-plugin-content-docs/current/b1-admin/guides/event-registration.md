---
title: "Anleitung: Ereignisregistrierung einrichten"
---

# Ereignisregistrierung einrichten

<div class="article-intro">

Erstellen Sie ein Ereignisregistrierungsformular, sammeln Sie Teilnehmerinformationen und optionale Zahlungen, betten Sie das Formular auf Ihrer Kirchenwebsite ein und verwalten Sie Eingaben, wenn diese eingehen. Am Ende verfügen Sie über eine teilbare Registrierungsseite für jede Kirchenveranstaltung.

</div>

:::info
**Zwei Möglichkeiten, um Ereignisregistrierung zu handhaben:** Diese Anleitung behandelt **formularbasierte Registrierung**, die Ihnen vollständige Kontrolle über benutzerdefinierte Felder und Zahlungserfassung gibt. Für einfachere Veranstaltungen, bei denen Sie nur verfolgen müssen, wer kommt, verwenden Sie **native Ereignisregistrierung**, die in den Kalender integriert ist -- siehe [Kalender erstellen](../calendars/creating-calendars.md#enabling-event-registration) für Setupanweisungen. Die native Registrierung ermöglicht es Mitgliedern, sich direkt von der [B1-Website](../../b1-church/events/registering) und der [mobilen App](../../b1-mobile/events/registering) mit Kapazitätsverfolgung, Zeitfenstern und E-Mail-Bestätigungen anzumelden.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1 Admin-Konto mit Admin-Zugriff
- Für Zahlungserfassung: [Stripe muss zuerst konfiguriert werden](../donations/online-giving-setup.md)

</div>

## Schritt 1: Erstellen Sie ein eigenständiges Formular

Eigenständige Formulare haben ihre eigene öffentliche URL, auf die jeder zugreifen kann -- perfekt für Ereignisregistrierung.

Folgen Sie der Anleitung [Formulare erstellen](../forms/creating-forms.md) zu:

1. Navigieren Sie zu Formularen und klicken Sie auf Formular hinzufügen
2. Wählen Sie den Typ „Eigenständig" -- dies gibt Ihrem Formular eine eigene öffentliche URL
3. Benennen Sie es nach dem Ereignis (z.B. „Men's Retreat Registration", „VBS Sign-Up")

## Schritt 2: Fragen hinzufügen

Erstellen Sie die Felder, die Sie benötigen, um Informationen von Anmeldenden zu erfassen.

Folgen Sie der Anleitung [Formulare erstellen](../forms/creating-forms.md#adding-questions), um Ihre Fragen hinzuzufügen:

1. Gehen Sie zur Registerkarte Fragen und fügen Sie Felder für die Informationen hinzu, die Sie benötigen: Name, E-Mail, Telefon, Diätbeschränkungen, T-Shirt-Größe, Notfallkontakt usw.
2. Verwenden Sie Multiple Choice für Optionen wie Mahlzeitpräferenzen oder Sitzungsauswahl

:::warning
Der Feldtyp Zahlung erfordert, dass Stripe konfiguriert ist. Wenn Sie das Online-Geben noch nicht eingerichtet haben, siehe [Online-Geben-Setup](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen.
:::

## Schritt 3: Formulareinstellungen konfigurieren

Kontrollieren Sie, wann und wie Ihr Registrierungsformular verfügbar ist.

1. Legen Sie Verfügbarkeitsdaten fest, wenn die Registrierung nur für begrenzte Zeit offen sein soll
2. Kopieren Sie die öffentliche URL -- Sie können diese direkt teilen
3. Fügen Sie Formmitglieder mit Admin- oder View Only-Rollen hinzu, um Einreichungen zu verwalten

## Schritt 4: Betten Sie auf Ihrer Website ein

Machen Sie das Registrierungsformular leicht zugänglich, indem Sie es zu Ihrer Kirchenwebsite hinzufügen.

Folgen Sie der Anleitung [Seiten verwalten](../website/managing-pages.md) zu:

1. Fügen Sie in Ihrem B1 Website-Editor einen neuen Abschnitt zu einer Seite hinzu und wählen Sie das Formularelement aus
2. Wählen Sie Ihr Registrierungsformular aus der Liste aus

:::tip
Teilen Sie die eigenständige URL auch per E-Mail, in sozialen Medien und Kirchenzirkeln -- je mehr Orte, an denen sie sichtbar ist, desto mehr Anmeldungen erhalten Sie.
:::

## Schritt 5: Verwalten Sie Eingaben

Verfolgen Sie Registrierungen, wenn diese eingehen, und exportieren Sie Daten, wenn Sie diese benötigen.

Folgen Sie der Anleitung [Verwaltung von Eingaben](../forms/managing-submissions.md) zu:

1. Überprüfen Sie Antworten auf der Registerkarte "Eingaben"
2. Exportieren Sie zu CSV für Tabellen, Kopfzahlverfolgung oder Freigabe für Veranstaltungskoordinatoren

## Sie sind fertig!

Ihre Ereignisregistrierung ist live. Teilen Sie den Link, betten Sie ihn auf Ihre Website ein und verfolgen Sie Anmeldungen von B1 Admin. Wenn die Veranstaltung vorbei ist, exportieren Sie die endgültige Liste für Ihre Unterlagen.

## Verwandte Artikel

- [Formulare erstellen](../forms/creating-forms.md) -- Erstellen Sie Formulare mit verschiedenen Feldtypen
- [Verwaltung von Eingaben](../forms/managing-submissions.md) -- Überprüfen und exportieren Sie Formularantworten
- [Seiten verwalten](../website/managing-pages.md) -- Betten Sie Formulare auf Ihrer Website ein
- [Online-Geben-Setup](../donations/online-giving-setup.md) -- Erforderlich für Zahlungsfelder


---
title: "Anleitung: Veranstaltungsanmeldung einrichten"
description: "Richten Sie in B1 Admin ein Anmeldeformular für Veranstaltungen ein, um Teilnehmerdaten und optionale Zahlungen zu erfassen, es auf Ihrer Kirchenwebsite einzubetten und Anmeldungen nachzuverfolgen."
---

# Veranstaltungsanmeldung einrichten

<div class="article-intro">

Erstellen Sie ein Anmeldeformular für Veranstaltungen, erfassen Sie Teilnehmerinformationen und optionale Zahlungen, betten Sie es auf Ihrer Kirchenwebsite ein und verwalten Sie die eingehenden Anmeldungen. Am Ende haben Sie eine teilbare Anmeldeseite für jede Gemeindeveranstaltung.

</div>

:::info
**Zwei Möglichkeiten für die Veranstaltungsanmeldung:** Diese Anleitung behandelt die **formularbasierte Anmeldung**, die Ihnen volle Kontrolle über benutzerdefinierte Felder und die Zahlungserfassung gibt. Für einfachere Veranstaltungen, bei denen Sie nur wissen müssen, wer teilnimmt, verwenden Sie die **native Veranstaltungsanmeldung** im Kalender -- Einrichtungsanweisungen finden Sie unter [Kalender erstellen](../calendars/creating-calendars.md#enabling-event-registration). Die native Anmeldung ermöglicht es Mitgliedern, sich direkt über [B1.church oder die B1 App](../../b1-church/events/registering.md) anzumelden, mit Kapazitätsverfolgung, Anmeldezeiträumen und E-Mail-Bestätigungen.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1 Admin-Konto mit Administratorzugriff
- Zum Erfassen von Zahlungen: [Stripe muss zuerst konfiguriert](../donations/online-giving-setup.md) werden

</div>

## Schritt 1: Eigenständiges Formular erstellen

Eigenständige Formulare haben eine eigene öffentliche URL, die für jeden zugänglich ist -- ideal für Veranstaltungsanmeldungen.

Folgen Sie der Anleitung [Formulare erstellen](../forms/creating-forms.md), um:

1. zu Formulare zu navigieren und auf „Formular hinzufügen“ zu klicken
2. den Typ „Stand Alone“ zu wählen -- dadurch erhält Ihr Formular eine eigene öffentliche URL
3. es nach der Veranstaltung zu benennen (z. B. „Männerfreizeit-Anmeldung“, „Anmeldung Kinderbibelwoche“)

## Schritt 2: Fragen hinzufügen

Erstellen Sie die Felder, die Sie von den Teilnehmenden erfassen möchten.

Folgen Sie der Anleitung [Formulare erstellen](../forms/creating-forms.md#adding-questions), um Ihre Fragen hinzuzufügen:

1. Wechseln Sie zum Reiter „Questions“ und fügen Sie Felder für die benötigten Informationen hinzu: Name, E-Mail, Telefon, Ernährungseinschränkungen, T-Shirt-Größe, Notfallkontakt usw.
2. Verwenden Sie „Multiple Choice“ für Auswahlmöglichkeiten wie Essenswünsche oder Veranstaltungsteile

:::warning
Der Feldtyp Zahlung erfordert, dass Stripe konfiguriert ist. Wenn Sie die Online-Spende noch nicht eingerichtet haben, lesen Sie [Online-Spenden einrichten](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen.
:::

## Schritt 3: Formulareinstellungen konfigurieren

Legen Sie fest, wann und wie Ihr Anmeldeformular verfügbar ist.

1. Legen Sie Verfügbarkeitsdaten fest, falls die Anmeldung nur für einen begrenzten Zeitraum offen sein soll
2. Kopieren Sie die öffentliche URL -- Sie können sie direkt weitergeben
3. Fügen Sie Formularmitglieder mit den Rollen Admin oder Nur Ansicht hinzu, die bei der Verwaltung der Einsendungen helfen

## Schritt 4: Auf Ihrer Website einbetten

Machen Sie das Anmeldeformular leicht auffindbar, indem Sie es zu Ihrer Kirchenwebsite hinzufügen.

Folgen Sie der Anleitung [Seiten verwalten](../website/managing-pages.md), um:

1. im B1-Website-Editor einen neuen Abschnitt zu einer Seite hinzuzufügen und das Element Formular auszuwählen
2. Ihr Anmeldeformular aus der Liste zu wählen

:::tip
Teilen Sie die eigenständige URL auch per E-Mail, in sozialen Medien und im Gemeindebrief -- je mehr Orte, an denen sie sichtbar ist, desto mehr Anmeldungen erhalten Sie.
:::

## Schritt 5: Einsendungen verwalten

Verfolgen Sie Anmeldungen, sobald sie eingehen, und exportieren Sie die Daten bei Bedarf.

Folgen Sie der Anleitung [Einsendungen verwalten](../forms/managing-submissions.md), um:

1. Antworten, sobald sie eingehen, auf dem Reiter „Submissions“ zu prüfen
2. als CSV zu exportieren, für Tabellenkalkulationen, die Zählung der Teilnehmenden oder die Weitergabe an Veranstaltungskoordinatoren

## Geschafft!

Ihre Veranstaltungsanmeldung ist live. Teilen Sie den Link, betten Sie ihn auf Ihrer Website ein und verfolgen Sie die Anmeldungen in B1 Admin. Wenn die Veranstaltung vorbei ist, exportieren Sie die endgültige Liste für Ihre Unterlagen.

## Verwandte Artikel

- [Formulare erstellen](../forms/creating-forms.md) — Formulare mit verschiedenen Feldtypen erstellen
- [Einsendungen verwalten](../forms/managing-submissions.md) — Formularantworten prüfen und exportieren
- [Seiten verwalten](../website/managing-pages.md) — Formulare auf Ihrer Website einbetten
- [Online-Spenden einrichten](../donations/online-giving-setup.md) — erforderlich für Zahlungsfelder

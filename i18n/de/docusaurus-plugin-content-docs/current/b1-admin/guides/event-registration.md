---
title: "Anleitung: Veranstaltungsanmeldung einrichten"
description: "Richten Sie in B1 Admin ein Anmeldeformular für Veranstaltungen ein, um Angaben der Teilnehmenden und optionale Zahlungen zu erfassen, es auf Ihrer Kirchenwebsite einzubetten und die Anmeldungen nachzuverfolgen."
---

# Veranstaltungsanmeldung einrichten

<div class="article-intro">

Erstellen Sie ein Anmeldeformular für Veranstaltungen, erfassen Sie Angaben zu den Teilnehmenden und optionale Zahlungen, betten Sie es auf Ihrer Kirchenwebsite ein und verwalten Sie die Einsendungen, sobald sie eingehen. Am Ende haben Sie eine teilbare Anmeldeseite für jede Veranstaltung Ihrer Kirche.

</div>

:::info
**Zwei Wege für die Veranstaltungsanmeldung:** Diese Anleitung behandelt die **Anmeldung über ein Formular** – ein eigenständiges Formular mit eigenem öffentlichem Link, eigenen Fragen und einem optionalen Zahlungsfeld. Für eine Veranstaltung in Ihrem Kalender können Sie stattdessen die **Veranstaltungsanmeldung** nutzen, die im Kalender eingebaut ist – siehe [Kalender erstellen](../calendars/creating-calendars.md#enabling-event-registration). Damit können sich Mitglieder direkt über [B1.church oder die B1-App](../../b1-church/events/registering.md) anmelden, mit Kapazität, Öffnungs- und Schließdaten, einer Warteliste, optionalen Anmeldefragen aus einem Formular und kostenpflichtigen Teilnehmerarten (siehe [Kostenpflichtige Anmeldungen](../calendars/paid-registrations.md)).
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- B1-Admin-Konto mit Administratorzugriff
- Zum Einziehen von Zahlungen: [Stripe muss zuerst eingerichtet sein](../donations/online-giving-setup.md)

</div>

## Schritt 1: Ein eigenständiges Formular anlegen {#step-1-create-a-stand-alone-form}

Eigenständige Formulare haben eine eigene öffentliche URL, die jeder aufrufen kann – ideal für Veranstaltungsanmeldungen.

Folgen Sie der Anleitung [Formulare erstellen](../forms/creating-forms.md), um:

1. im [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) **Personen > Formulare** zu wählen und auf **Formular hinzufügen** zu klicken
2. es nach der Veranstaltung zu benennen (z. B. „Anmeldung Männerfreizeit“, „Anmeldung VBS“)
3. unter **Zuordnen zu** **Eigenständig** zu wählen – so erhält Ihr Formular eine eigene öffentliche URL
4. auf **Speichern** zu klicken

## Schritt 2: Fragen hinzufügen {#step-2-add-questions}

Erstellen Sie die Felder, die Sie von den Anmeldenden benötigen.

Folgen Sie der Anleitung [Formulare erstellen](../forms/creating-forms.md#adding-questions), um Ihre Fragen hinzuzufügen:

1. Öffnen Sie das Formular, wechseln Sie zum Reiter **Fragen** und klicken Sie für jede benötigte Angabe auf **Frage hinzufügen**: Name, E-Mail, Telefon, Ernährungseinschränkungen, T-Shirt-Größe, Notfallkontakt usw.
2. Verwenden Sie **Multiple Choice** für Optionen wie Essenswünsche oder Programmpunkte
3. Um eine Gebühr zu erheben, fügen Sie eine Frage vom Typ **Zahlung** hinzu und wählen Sie deren **Fonds** und **Betrag**

:::warning
Der Feldtyp Zahlung setzt voraus, dass Stripe eingerichtet ist. Haben Sie Online-Spenden noch nicht eingerichtet, lesen Sie [Einrichtung der Online-Spenden](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen.
:::

## Schritt 3: Die Formulareinstellungen konfigurieren {#step-3-configure-form-settings}

Steuern Sie, wann und wie Ihr Anmeldeformular verfügbar ist. Folgen Sie dem Abschnitt [Eigenschaften des Formulars konfigurieren](../forms/creating-forms.md#configuring-form-properties), um:

1. auf **Formular bearbeiten** zu klicken und, falls die Anmeldung nur für begrenzte Zeit offen sein soll, **Verfügbarkeitszeitraum des Formulars festlegen** auf **Ja** zu setzen und Start- und Enddatum auszuwählen
2. die **öffentliche URL** zu kopieren, die auf der linken Seite der Formularseite angezeigt wird – diese können Sie direkt teilen. Klicken Sie auf der Liste der Formulare neben dem Formular auf **QR-Code**, um einen QR-Code für Flyer und Folien herunterzuladen
3. im Reiter **Mitglieder des Formulars** Personen als **Administrator** oder **Nur Anzeigen** hinzuzufügen, die bei der Verwaltung der Einsendungen helfen, und **E-Mail-Benachrichtigung** für alle zu aktivieren, die bei jeder neuen Anmeldung eine E-Mail erhalten sollen

## Schritt 4: Auf Ihrer Website einbetten {#step-4-embed-on-your-website}

Machen Sie das Anmeldeformular leicht auffindbar, indem Sie es auf Ihrer Kirchenwebsite hinzufügen.

Folgen Sie der Anleitung [Seiteneditor](../website/page-editor.md), um:

1. eine Seite in Ihrem B1-Website-Editor zu öffnen und auf **Inhalt hinzufügen** zu klicken
2. das Element **Formular** in einen Abschnitt zu ziehen und Ihr Anmeldeformular auszuwählen

:::tip
Teilen Sie die eigenständige URL auch per E-Mail, in sozialen Medien und in den Gemeindebriefen – je mehr Orte sie sichtbar machen, desto mehr Anmeldungen erhalten Sie.
:::

## Schritt 5: Einsendungen verwalten {#step-5-manage-submissions}

Verfolgen Sie die Anmeldungen, sobald sie eingehen, und exportieren Sie die Daten, wenn Sie sie brauchen.

Folgen Sie der Anleitung [Einsendungen verwalten](../forms/managing-submissions.md), um:

1. Antworten, sobald sie eingehen, auf dem Reiter **Einsendungen** zu prüfen
2. auf **Exportieren** zu klicken, um eine CSV-Datei für Tabellenkalkulationen, zur Zählung der Teilnehmenden oder zur Weitergabe an Veranstaltungsverantwortliche herunterzuladen

## Fertig! {#youre-done}

Ihre Veranstaltungsanmeldung ist live. Teilen Sie den Link, betten Sie ihn auf Ihrer Website ein und verfolgen Sie die Anmeldungen in B1 Admin. Nach der Veranstaltung exportieren Sie die endgültige Liste für Ihre Unterlagen.

## Verwandte Artikel {#related-articles}

- [Formulare erstellen](../forms/creating-forms.md) – Formulare mit verschiedenen Feldtypen aufbauen
- [Einsendungen verwalten](../forms/managing-submissions.md) – Formularantworten prüfen und exportieren
- [Seiteneditor](../website/page-editor.md) – Formulare auf Ihrer Website einbetten
- [Einrichtung der Online-Spenden](../donations/online-giving-setup.md) – erforderlich für Zahlungsfelder

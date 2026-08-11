---
title: "Personen hinzufügen"
---

# Personen hinzufügen

<div class="article-intro">

Der Personen-Bereich ist die Grundlage von B1 Admin -- es ist Ihre Kirchenmitgliederdatenbank. Jede andere Funktion (Gruppen, Anwesenheit, Spenden, Formulare) ist an Personendatensätze gebunden. Diese Anleitung führt Sie durch das Hinzufügen von jemandem zu Ihrer Datenbank, das Bearbeiten seiner Details und das Verknüpfen von Familienmitgliedern in Haushalten.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zur Verwaltung von Personen. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe unsicher sind.
- Wenn Sie mehr als ein paar Personen hinzufügen, erwägen Sie stattdessen die Verwendung des [CSV-Import](importing-data.md)-Tools.

</div>

## Hinzufügen einer Person

1. Navigieren Sie zum B1.church Admin-Dashboard.
2. Öffnen Sie das **Bereichsmenü** in der oberen linken Ecke und wählen Sie **Personen**.
3. Klicken Sie auf die Schaltfläche **Person hinzufügen** in der oberen rechten Ecke.
4. Geben Sie den Vornamen, Nachnamen und die E-Mail-Adresse der Person ein und klicken Sie auf **Hinzufügen**.

Die Profilseite der Person wird geöffnet, bereit für Sie, um mehr Details hinzuzufügen.

:::tip
Wenn Sie von einem anderen Kirchenverwaltungssystem migrieren, ermöglicht die [Datendatai-Funktion](importing-data.md) es Ihnen, Ihr gesamtes Verzeichnis aus einer CSV-Datei einzubringen -- viel schneller als das Hinzufügen von Personen einzeln.
:::

## Bearbeitung von Details

1. Klicken Sie auf der Profilseite der Person auf das **Bearbeitungs-Stift** neben ihrem Namen.
2. Füllen Sie zusätzliche Informationen wie Mittelname, Mitgliedschaftsstatus, Daten, Adresse, Telefonnummern und (für Kinder und Schüler) Klassenstufe und Schule aus.
3. Klicken Sie auf **Speichern**, um die Personalinformationen zu speichern.

Das Profil umfasst auch mehrere Registerkarten für verwandte Informationen:

- **Notizen** -- Fügen Sie Notizen über die Person hinzu (Pastoralsorge, Nachverfolgung etc.)
- **Gruppen** -- Anzeigen und Verwalten von [Gruppenmitgliedschaften](../groups/group-members.md)
- **Anwesenheit** -- Anzeigen von [Anwesenheitsdatensätzen](../attendance/tracking-attendance.md)
- **Spenden** -- Anzeigen von [Spendendenverlauf](../donations/recording-donations.md)

## Arbeit mit Formularen

Sie können benutzerdefinierte Formulare direkt von einer Personenprofilseite ausfüllen. Dies sind benutzerdefinierte Formulare, die Sie durch Folgen des Leitfadens [Formulare erstellen](../forms/creating-forms.md) erstellen können.

1. Klicken Sie auf der Personenprofilseite auf das **Formulare**-Dropdown, um ein Formular auszuwählen.
2. Klicken Sie auf **Formular hinzufügen**, um es zu öffnen.
3. Füllen Sie die Formulardetails aus und klicken Sie auf **Speichern**.

:::info
Formulare, die mit einer Personenprofilseite verknüpft sind, verwenden den Formularetyp **Personen**. Wenn Sie ein eigenständiges Formular benötigen (wie eine Veranstaltungsregistrierung), siehe die Option [Eigenständiges Formular](../forms/creating-forms.md) im Formularleitfaden.
:::

:::tip
Wenn Sie nur eine oder zwei zusätzliche Informationen von Personen verfolgen müssen -- ein Datum, eine Nummer, eine Ja/Nein-Antwort -- verwenden Sie stattdessen [Benutzerdefinierte Felder](../settings/custom-fields.md). Sie sind schneller auszufüllen und direkt in der erweiterten Suche durchsuchbar.
:::

## Verwalten von Haushalten

Haushalte ermöglichen es Ihnen, Familienmitglieder zu verknüpfen. Dies ist besonders nützlich für [Check-in](../attendance/check-in.md), wo ein Elternteil alle seine Kinder gleichzeitig einchecken kann.

1. Klicken Sie auf einer Personenprofilseite auf das **Bearbeitungs**-Stift neben dem Hausnamen.
2. Der Haushalt-Editor wird geöffnet. Wählen Sie die **Haushaltsrolle** für die aktuelle Person (z.B. Kopf, Ehepartner, Kind).
3. Klicken Sie auf **Hinzufügen**, um ein weiteres Haushaltsmitglied hinzuzufügen.
4. Geben Sie den Namen der Person in das Suchfeld ein und klicken Sie auf **Suchen**.
5. Wenn die Person in den Suchergebnissen angezeigt wird, klicken Sie auf **Auswählen**.
6. Wählen Sie ihre Haushaltsrolle und klicken Sie auf **Speichern**, um die Haushaltseinrichtung abzuschließen.

---
title: "Personen hinzufügen"
---

# Personen hinzufügen

<div class="article-intro">

Der Bereich Personen ist die Grundlage von B1 Admin -- es ist die Mitgliederdatenbank deiner Kirche. Jede andere Funktion (Gruppen, Anwesenheit, Spenden, Formulare) bindet auf Personendatensätze zurück. Dieser Leitfaden führt dich durch das Hinzufügen von jemandem zu deiner Datenbank, das Bearbeiten ihrer Details und das Verknüpfen von Familienmitgliedern zu Haushalten.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Du brauchst ein aktives B1 Admin-Konto mit Berechtigung zur Verwaltung von Personen. Siehe [Rollen und Berechtigungen](roles-permissions.md), falls du dir deines Zugriffs nicht sicher bist.
- Wenn du mehr als ein Dutzend Personen hinzufügst, erwäge die Verwendung des Tools [CSV-Import](importing-data.md).

</div>

## Eine Person hinzufügen

1. Navigiere zum B1.church Admin-Dashboard.
2. Öffne das **Menü „Bereich"** in der oberen linken Ecke und wähle **Personen**.
3. Klicke auf die Schaltfläche **Person hinzufügen** in der oberen rechten Ecke.
4. Gib den Vornamen, Nachnamen und die E-Mail-Adresse der Person ein, klicke dann auf **Hinzufügen**.

Die Profilseite der Person wird geöffnet und ist bereit für dich, weitere Details hinzuzufügen.

:::tip
Wenn du von einem anderen Kirchenverwaltungssystem migrierst, ermöglicht die [Daten importieren](importing-data.md)-Funktion dir, dein gesamtes Verzeichnis aus einer CSV-Datei einzubringen -- viel schneller als das Hinzufügen von Personen einzeln.
:::

### Warnungen vor Duplikaten

Wenn die E-Mail-Adresse (oder beim Erstellen einer Person aus dem vollständigen Bearbeitungsformular die Telefonnummer oder Übereinstimmung von Vorname + Nachname + Geburtsdatum) mit jemandem in deiner Datenbank übereinstimmt, erscheint ein Dialogfeld **Mögliches Duplikat** vor der Speicherung des neuen Datensatzes. Es listet jede übereinstimmende Person zusammen mit ihrer E-Mail, Telefon und Geburtsdatum auf, damit du vergleichen kannst.

- Klicke auf **Vorhandenen verwenden** neben einer Übereinstimmung, um den Datensatz dieser Person zu verwenden, anstatt einen neuen zu erstellen.
- Klicke auf **Trotzdem erstellen**, um die neue Person hinzuzufügen, obwohl eine mögliche Übereinstimmung gefunden wurde.

Dies überprüft Duplikate nur, wenn du eine brandneue Person erstellst -- das Bearbeiten eines vorhandenen Datensatzes löst es nie aus. Es verhindert nur neue Duplikate; es verbindet nicht zwei Datensätze, die bereits vorhanden sind.

## Details bearbeiten

1. Klicke auf der Profilseite der Person auf den **Bearbeitungsstift** neben ihrem Namen.
2. Fülle zusätzliche Informationen wie Zweiter Name, Mitgliedschaftsstatus, Daten, Adresse, Telefonnummern und (für Kinder und Schüler) Klasse und Schule ein.
3. Klicke auf **Speichern**, um die persönlichen Informationen zu speichern.

Das Profil enthält auch mehrere Registerkarten für verwandte Informationen:

- **Notizen** -- Füge Notizen über die Person hinzu (Seelsorge, Nachverfolgungen usw.)
- **Gruppen** -- Zeige und verwalte [Gruppenmitgliedschaften](../groups/group-members.md)
- **Anwesenheit** -- Zeige die individuelle Besuchshistorie dieser Person an, einschließlich Standort, Gottesdienst, Gottesdienstzeit, Gruppe und eine Spalte **Eingecheckt** mit der Kiosk-Eincheckt-Zeit (dargestellt als Strich für Besuche, die ohne Kiosk-Eintrag aufgezeichnet wurden). Für kirchenweite Trends anstatt einer Personenhistorie siehe [Anwesenheit verfolgen](../attendance/tracking-attendance.md)
- **Spenden** -- Zeige [Spendendhistorie](../donations/recording-donations.md)

## Mit Formularen arbeiten

Du kannst benutzerdefinierte Formulare direkt aus dem Profil einer Person ausfüllen. Dies sind benutzerdefinierte Formulare, die du durch Befolgung des Leitfadens [Formulare erstellen](../forms/creating-forms.md) erstellen kannst.

1. Klicke auf der Profilseite der Person auf das **Formulare**-Dropdown, um ein Formular auszuwählen.
2. Klicke auf **Formular hinzufügen**, um es zu öffnen.
3. Fülle die Formulardetails ein und klicke auf **Speichern**.

Sobald ein Formular eingereicht wurde, klicke auf das **Druckersymbol** daneben, um die ausgefüllten Antworten dieser Person zu drucken.

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn du ein eigenständiges Formular brauchst (wie eine Veranstaltungsregistrierung), siehe die [eigenständige Formularon](../forms/creating-forms.md) im Formularhandbuch.
:::

:::tip
Wenn du nur ein oder zwei zusätzliche Informationen über Personen verfolgen musst -- ein Datum, eine Zahl, eine Ja/Nein-Antwort -- verwende stattdessen [Benutzerdefinierte Felder](../settings/custom-fields.md). Sie sind schneller auszufüllen und direkt in der Erweiterten Suche durchsuchbar.
:::

## Haushalte verwalten

Haushalte ermöglichen es dir, Familienmitglieder zusammenzuverbinden. Dies ist besonders nützlich für [Eintrag](../attendance/check-in.md), wo ein Eltern all ihre Kinder auf einmal einchecken kann.

1. Klicke auf der Profilseite der Person auf den **Bearbeitungsstift** neben dem Haushaltsnamen.
2. Der Haushalt-Editor wird geöffnet. Wähle die **Haushaltsrolle** für die aktuelle Person (z. B. Kopf, Ehegatte, Kind).
3. Klicke auf **Hinzufügen**, um ein weiteres Haushaltsmitglied hinzuzufügen.
4. Gib den Namen der Person in das Suchfeld ein und klicke auf **Suchen**.
5. Wenn die Person in den Suchergebnissen angezeigt wird, klicke auf **Auswählen**.
6. Wähle ihre Haushaltsrolle und klicke auf **Speichern**, um die Haushalt-Einrichtung zu vervollständigen.

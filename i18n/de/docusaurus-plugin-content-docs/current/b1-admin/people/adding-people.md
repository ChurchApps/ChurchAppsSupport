---
title: "Personen hinzufügen"
---

# Personen hinzufügen

<div class="article-intro">

Der Bereich Personen ist das Fundament von B1 Admin – es ist die Mitgliederdatenbank Ihrer Kirche. Jedes andere Feature (Gruppen, Besucherverfolgung, Spenden, Formulare) ist mit Personeneinträgen verbunden. Diese Anleitung führt Sie durch das Hinzufügen einer Person zu Ihrer Datenbank, das Bearbeiten deren Details und das Verknüpfen von Familienmitgliedern in Haushalte.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zum Verwalten von Personen. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich nicht sicher sind, welches Zugriffsniveau Sie haben.
- Wenn Sie mehr als nur eine Handvoll Personen hinzufügen, sollten Sie das [CSV-Import-Tool](importing-data.md) verwenden.

</div>

## Eine Person hinzufügen

1. Navigieren Sie zum B1.church Admin-Dashboard.
2. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Personen** und klicken Sie auf **Personen**.
3. Klicken Sie auf die Schaltfläche **Person hinzufügen** in der oberen rechten Ecke.
4. Geben Sie den Vornamen, Nachnamen und die E-Mail-Adresse der Person ein und klicken Sie auf **Hinzufügen**.

Die Profilseite der Person wird geöffnet, um weitere Details hinzuzufügen.

:::tip
Wenn Sie von einem anderen Kirchenverwaltungssystem migrieren, können Sie mit der [Importfunktion](importing-data.md) Ihr gesamtes Verzeichnis aus einer CSV-Datei importieren – viel schneller als das Hinzufügen von Personen einzeln.
:::

### Duplikatswarnungen

Wenn die E-Mail-Adresse (oder beim Erstellen einer Person aus dem vollständigen Bearbeitungsformular der Telefonnummer oder dem Abgleich von Vorname + Nachname + Geburtsdatum) mit jemandem in Ihrer Datenbank übereinstimmt, wird ein Dialogfeld **Mögliches Duplikat** angezeigt, bevor der neue Datensatz gespeichert wird. Es listet jede übereinstimmende Person zusammen mit ihrer E-Mail, Telefonnummer und Geburtsdatum auf, damit Sie vergleichen können.

- Klicken Sie auf **Vorhandene verwenden** neben einem Treffer, um den Datensatz dieser Person zu verwenden, anstatt einen neuen zu erstellen.
- Klicken Sie auf **Trotzdem erstellen**, um die neue Person hinzuzufügen, obwohl ein möglicher Treffer gefunden wurde.

Dies überprüft Duplikate nur, wenn Sie eine brandneue Person erstellen – das Bearbeiten eines vorhandenen Datensatzes auslöst es nie. Es verhindert nur neue Duplikate; es führt keine zwei bereits vorhandenen Datensätze zusammen.

## Details bearbeiten

1. Auf der Profilseite der Person klicken Sie auf den **Bearbeitungs-Stift** neben ihrem Namen.
2. Geben Sie zusätzliche Informationen wie Mittelnamen, Mitgliedschaftsstatus, Daten, Adresse, Telefonnummern und (für Kinder und Jugendliche) Klassenstufe und Schule ein.
3. Klicken Sie auf **Speichern**, um die persönlichen Informationen zu speichern.

Das Profil enthält auch mehrere Registerkarten für verwandte Informationen:

- **Notizen** – Fügen Sie Notizen über die Person hinzu (seelsorgliche Betreuung, Nachverfolgung, usw.)
- **Gruppen** – Sehen Sie und verwalten Sie [Gruppenmitgliedschaften](../groups/group-members.md)
- **Besucherzahlen** – Sehen Sie die individuelle Besuchshistorie dieser Person, einschließlich Standort, Gottesdienst, Gottesdienstzeit, Gruppe und einer Spalte **Eingecheckt** mit der Kiosk-Check-in-Zeit (angezeigt als Strich für Besuche, die ohne Kiosk-Check-in erfasst wurden). Für Trends in der gesamten Kirche anstatt der Besuchshistorie einer Person siehe [Besucherzahlen verfolgen](../attendance/tracking-attendance.md)
- **Spenden** – Sehen Sie die [Spendenhistorie](../donations/recording-donations.md)

## E-Mail an eine Person senden

Wenn die Person eine E-Mail-Adresse in der Datei hat, wird eine Schaltfläche **E-Mail an diese Person** (Umschlag-Symbol) in der Profilkopfzeile angezeigt.

1. Klicken Sie auf der Profilseite der Person auf das **Umschlag-Symbol**.
2. Ein Dialogfeld **E-Mail** mit dem Namen der Person wird geöffnet und zeigt **An** mit der Adresse der Person.
3. Wählen Sie optional eine gespeicherte Vorlage aus **Vorlage laden (optional)**.
4. Geben Sie einen **Betreff** ein und verfassen Sie die Nachricht.
5. Klicken Sie auf **E-Mail senden**.

Um die Nachricht stattdessen in Ihrem eigenen Mail-Programm zu schreiben, klicken Sie auf **Im meinem E-Mail-Programm öffnen**.

:::info
Das Senden von B1 verwendet die gleichen Genehmigungen und täglichen Limits wie Gruppen-E-Mail. Wenn Ihre Kirche noch nicht genehmigt wurde, fordert das Dialogfeld Sie auf, eine Überprüfung anzufordern – Sie können unterdessen immer noch auf **In meinem E-Mail-Programm öffnen** klicken. Siehe [Gruppen-E-Mail für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Benutzer ohne Berechtigung zur Bearbeitung von Gruppenmitgliedern gehen direkt zu ihrem E-Mail-Programm, wenn sie auf das Umschlag-Symbol klicken.
:::

## Mit Formularen arbeiten

Sie können benutzerdefinierte Formulare direkt von der Profilseite einer Person ausfüllen. Dies sind benutzerdefinierte Formulare, die Sie erstellen können, indem Sie der [Anleitung zum Erstellen von Formularen](../forms/creating-forms.md) folgen.

1. Klicken Sie auf der Profilseite der Person auf das Dropdown-Menü **Formulare**, um ein Formular auszuwählen.
2. Klicken Sie auf **Formular hinzufügen**, um es zu öffnen.
3. Füllen Sie die Formulardetails aus und klicken Sie auf **Speichern**.

Sobald ein Formular eingereicht ist, klicken Sie auf das **Druck-Symbol** daneben, um die ausgefüllten Antworten dieser Person zu drucken.

Wenn eine Einreichung bei der falschen Person landete, klicken Sie auf das Symbol **Person wechseln** (zwei Pfeile) daneben, um es zu jemandem anderem zu verschieben oder zu trennen. Siehe [Person auf einer Einreichung ändern](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn Sie ein eigenständiges Formular benötigen (wie eine Veranstaltungsanmeldung), siehe die [Option Eigenständiges Formular](../forms/creating-forms.md) in der Formulare-Anleitung.
:::

:::tip
Wenn Sie nur ein oder zwei zusätzliche Informationen zu Personen nachverfolgen müssen – ein Datum, eine Zahl, eine Ja/Nein-Antwort – verwenden Sie [Benutzerdefinierte Felder](../settings/custom-fields.md) anstelle eines Formulars. Sie sind schneller auszufüllen und sind direkt in Advanced Search durchsuchbar.
:::

## Haushalte verwalten

Haushalte ermöglichen es Ihnen, Familienmitglieder zusammen zu verknüpfen. Dies ist besonders nützlich für [Check-in](../attendance/check-in.md), wo ein Elternteil alle seine Kinder auf einmal einchecken kann.

1. Klicken Sie auf der Profilseite einer Person auf den **Bearbeitungs-Stift** neben dem Haushaltsnamen.
2. Der Haushalts-Editor wird geöffnet. Wählen Sie die **Haushaltsrolle** für die aktuelle Person (z. B. Haupt, Ehegatte, Kind).
3. Klicken Sie auf **Hinzufügen**, um ein anderes Haushaltsmitglied hinzuzufügen.
4. Geben Sie den Namen der Person in das Suchfeld ein und klicken Sie auf **Suchen**.
5. Wenn die Person in den Suchergebnissen angezeigt wird, klicken Sie auf **Auswählen**.
6. Wählen Sie ihre Haushaltsrolle aus und klicken Sie auf **Speichern**, um die Haushaltseinrichtung abzuschließen.

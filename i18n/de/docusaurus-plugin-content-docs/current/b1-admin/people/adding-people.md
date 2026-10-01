---
title: "Personen hinzufügen"
---

# Personen hinzufügen

<div class="article-intro">

Der Abschnitt Personen ist die Grundlage von B1 Admin -- es ist die Mitgliedsdatenbank Ihrer Kirche. Jede andere Funktion (Gruppen, Anwesenheit, Spenden, Formulare) verknüpft sich mit Personendatensätzen. Diese Anleitung führt Sie durch das Hinzufügen einer Person zu Ihrer Datenbank, das Bearbeiten ihrer Details und das Verknüpfen von Familienmitgliedern in Haushalten.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen ein aktives B1 Admin-Konto mit Berechtigung zur Verwaltung von Personen. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe unsicher sind.
- Wenn Sie mehr als ein paar Personen hinzufügen, erwägen Sie stattdessen die Verwendung des [CSV-Import](importing-data.md)-Tools.

</div>

## Hinzufügen einer Person

1. Navigieren Sie zum B1.church Admin-Dashboard.
2. Öffnen Sie das **Abschnittsmenü** in der oberen linken Ecke und wählen Sie **Personen**.
3. Klicken Sie auf die Schaltfläche **Person hinzufügen** in der oberen rechten Ecke.
4. Füllen Sie den Vornamen, den Nachnamen und die E-Mail-Adresse der Person aus, dann klicken Sie auf **Hinzufügen**.

Die Profilseite der Person wird geöffnet und ist bereit für Sie, um weitere Details hinzuzufügen.

:::tip
Wenn Sie von einem anderen Kirchenmanagementsystem migrieren, ermöglicht Ihnen die Funktion [Daten importieren](importing-data.md), Ihr gesamtes Verzeichnis aus einer CSV-Datei zu importieren -- viel schneller als das Hinzufügen von Personen einzeln.
:::

### Duplikatwarnungen

Wenn die E-Mail-Adresse (oder beim Erstellen einer Person aus dem vollständigen Bearbeitungsformular die Telefonnummer oder dem Abgleich von Vorname + Nachname + Geburtsdatum) mit jemandem übereinstimmt, der bereits in Ihrer Datenbank vorhanden ist, wird ein Dialog **Mögliches Duplikat** vor dem Speichern des neuen Datensatzes angezeigt. Er listet jede Übereinstimmung mit ihrer E-Mail-Adresse, Telefonnummer und Geburtsdatum auf, damit Sie vergleichen können.

- Klicken Sie auf **Vorhandene verwenden** neben einem Match, um stattdessen den Datensatz dieser Person zu verwenden.
- Klicken Sie auf **Trotzdem erstellen**, um die neue Person hinzuzufügen, obwohl ein mögliches Match gefunden wurde.

Dies überprüft nur auf Duplikate, wenn Sie einen brandneuen Datensatz erstellen -- das Bearbeiten eines vorhandenen Datensatzes löst es niemals aus. Es verhindert nur neue Duplikate; es führt nicht zwei bereits vorhandene Datensätze zusammen.

## Details bearbeiten

1. Klicken Sie auf der Profilseite der Person auf den **Bearbeitungs-Bleistift** neben ihrem Namen.
2. Füllen Sie zusätzliche Informationen wie Mittelname, Mitgliedschaftsstatus, Daten, Adresse, Telefonnummern und (für Kinder und Schüler) Klasse und Schule aus.
3. Klicken Sie auf **Speichern**, um die persönlichen Informationen zu speichern.

Das Profil enthält auch mehrere Registerkarten für verwandte Informationen:

- **Notizen** -- Fügen Sie Notizen über die Person hinzu (Seelsorge, Follow-ups usw.)
- **Gruppen** -- Anzeigen und Verwalten von [Gruppenmitgliedschaften](../groups/group-members.md)
- **Anwesenheit** -- Anzeigen dieser Personenindividuellen Besuchsverlauf, einschließlich Gemeindezweig, Gottesdienst, Gottesdienstzeit, Gruppe und einer Spalte **Eingecheckt** mit der Kiosk-Anmeldezeit (angezeigt als Bindestrich für Besuche, die ohne Kiosk-Anmeldung erfasst wurden). Für kirchenweite Trends anstelle des Personenverlaufs siehe [Anwesenheit verfolgen](../attendance/tracking-attendance.md)
- **Spenden** -- Anzeigen des [Spendenverlaufs](../donations/recording-donations.md)

## Senden einer E-Mail an eine Person

Wenn die Person eine E-Mail-Adresse auf Datei hat, wird eine Schaltfläche **E-Mail an diese Person senden** (Umschllag-Symbol) in der Profil-Kopfzeile angezeigt.

1. Klicken Sie auf der Profilseite der Person auf das **Umschlag-Symbol**.
2. Ein Dialog **E-Mail** mit dem Namen der Person wird geöffnet und zeigt **Senden an** mit der Adresse der Person.
3. Wählen Sie optional eine gespeicherte Vorlage aus **Vorlage laden (optional)**.
4. Geben Sie einen **Betreff** ein und schreiben Sie die Nachricht.
5. Klicken Sie auf **E-Mail senden**.

Um die Nachricht stattdessen in Ihrem eigenen Mail-Programm zu schreiben, klicken Sie auf **In meiner Mail-App öffnen**.

:::info
Das Versenden von B1 verwendet die gleichen Genehmigungen und täglichen Grenzen wie Gruppen-E-Mail. Wenn Ihre Gemeinde noch nicht genehmigt wurde, fordert der Dialog Sie auf, eine Überprüfung anzufordern -- Sie können in der Zwischenzeit trotzdem auf **In meiner Mail-App öffnen** klicken. Siehe [Aktivieren Sie Gruppen-E-Mail für Ihre Gemeinde](../groups/group-members.md#turning-on-group-email-for-your-church). Benutzer ohne Berechtigung zur Bearbeitung von Gruppenmitgliedern gehen direkt zu ihrer Mail-App, wenn sie auf das Umschlag-Symbol klicken.
:::

## Mit Formularen arbeiten

Sie können benutzerdefinierte Formulare direkt von der Profilseite einer Person aus ausfüllen. Dies sind benutzerdefinierte Formulare, die Sie durch Befolgen der Anleitung [Formulare erstellen](../forms/creating-forms.md) erstellen können.

1. Klicken Sie auf der Profilseite der Person auf die **Formulare**-Dropdown, um ein Formular auszuwählen.
2. Klicken Sie auf **Formular hinzufügen**, um es zu öffnen.
3. Füllen Sie die Formulardetails aus und klicken Sie auf **Speichern**.

Sobald ein Formular eingereicht wird, klicken Sie auf das **Druckersymbol** daneben, um die ausgefüllten Antworten dieser Person zu drucken.

Wenn eine Einreichung bei der falschen Person landete, klicken Sie auf das Symbol **Person ändern** (zwei Pfeile) daneben, um es zu jemand anderem zu verschieben oder die Verknüpfung aufzuheben. Siehe [Ändern der Person in einer Einreichung](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulare, die mit der Profilseite einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn Sie ein eigenständiges Formular benötigen (wie eine Event-Registrierung), siehe die Option [eigenständiges Formular](../forms/creating-forms.md) in der Formularanleitung.
:::

:::tip
Wenn Sie nur eine oder zwei zusätzliche Informationen über Personen verfolgen müssen -- ein Datum, eine Zahl, eine Ja/Nein-Antwort -- verwenden Sie [benutzerdefinierte Felder](../settings/custom-fields.md) anstelle eines Formulars. Sie können schneller ausgefüllt werden und sind direkt in der erweiterten Suche durchsuchbar.
:::

## Verwaltung von Haushalten

Haushalte ermöglichen es Ihnen, Familienmitglieder zusammen zu verknüpfen. Dies ist besonders nützlich für [Check-in](../attendance/check-in.md), wo ein Elternteil alle seine Kinder auf einmal einchecken kann.

1. Klicken Sie auf der Profilseite einer Person auf den **Bearbeitungs-Bleistift** neben dem Haushaltsnamen.
2. Der Haushaltseditor wird geöffnet. Wählen Sie die **Haushaltsrolle** für die aktuelle Person (z. B. Haushaltsvorstand, Ehepartner, Kind).
3. Klicken Sie auf **Hinzufügen**, um ein anderes Haushaltsmitglied hinzuzufügen.
4. Geben Sie den Namen der Person in das Suchfeld ein und klicken Sie auf **Suchen**.
5. Wenn die Person in den Suchergebnissen angezeigt wird, klicken Sie auf **Auswählen**.
6. Wählen Sie ihre Haushaltsrolle und klicken Sie auf **Speichern**, um die Haushaltseinrichtung abzuschließen.

---
title: "Personen hinzufügen"
description: "Fügen Sie in B1 Admin eine Person zu Ihrer Gemeindedatenbank hinzu, ergänzen Sie ihre Angaben und verknüpfen Sie Familienmitglieder zu Haushalten für Check-in und Berichte."
---

# Personen hinzufügen

<div class="article-intro">

Der Bereich Personen bildet das Fundament von B1 Admin – er ist die Mitgliederdatenbank Ihrer Kirche. Alle anderen Funktionen (Gruppen, Anwesenheit, Spenden, Formulare) beziehen sich auf Personendatensätze. Diese Anleitung zeigt Ihnen, wie Sie eine Person in Ihre Datenbank aufnehmen, ihre Angaben bearbeiten und Familienmitglieder zu Haushalten verknüpfen.

</div>

## Schulungsvideo

<YouTube id="NTL1UDQpx8s" title="Personen und Haushalte in B1 hinzufügen" next="Ihre Personendatenbank in B1 importieren" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen zu verwalten. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe nicht sicher sind.
- Wenn Sie mehr als eine Handvoll Personen hinzufügen möchten, verwenden Sie stattdessen das Werkzeug [CSV-Import](importing-data.md).

</div>

## Eine Person hinzufügen

1. Rufen Sie das Dashboard des B1.church-Admins auf.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Personen** auf und klicken Sie auf **Personen**.
3. Klicken Sie im Seitenkopf auf die Schaltfläche **Person hinzufügen**. Die Seite scrollt zum Formular **Neue Person hinzufügen** unterhalb des Verzeichnisses.
4. Geben Sie **Vorname**, **Nachname** und **E-Mail** der Person ein und klicken Sie auf **Hinzufügen**.

Die Profilseite der Person öffnet sich, sodass Sie weitere Angaben ergänzen können.

:::tip
Wenn Sie von einem anderen Verwaltungssystem für Kirchen umziehen, können Sie mit dem Werkzeug [Daten importieren](importing-data.md) Ihr gesamtes Verzeichnis aus einer CSV-Datei übernehmen – das ist deutlich schneller, als Personen einzeln anzulegen.
:::

### Warnungen bei Duplikaten

Stimmt die E-Mail-Adresse (oder beim Anlegen über das vollständige Bearbeitungsformular die Telefonnummer oder die Kombination aus Vorname, Nachname und Geburtsdatum) mit einer Person überein, die bereits in Ihrer Datenbank steht, erscheint vor dem Speichern des neuen Datensatzes ein Dialog **Mögliches Duplikat**. Er listet jede passende Person mit E-Mail-Adresse, Telefonnummer und Geburtsdatum auf, damit Sie vergleichen können.

- Klicken Sie neben einem Treffer auf **Vorhandene verwenden**, um den Datensatz dieser Person zu nutzen, statt einen neuen anzulegen.
- Klicken Sie auf **Trotzdem anlegen**, um die neue Person hinzuzufügen, obwohl ein mögliches Duplikat gefunden wurde.

Die Prüfung auf Duplikate findet nur beim Anlegen einer neuen Person statt – das Bearbeiten eines bestehenden Datensatzes löst sie nie aus. Sie verhindert nur neue Duplikate; sie führt nicht zwei bereits bestehende Datensätze zusammen.

## Angaben bearbeiten {#editing-details}

1. Klicken Sie auf der Profilseite der Person links unterhalb ihrer Kontaktdaten auf die Schaltfläche **Bearbeiten**.
2. Ergänzen Sie im Formular **Persönliche Angaben** weitere Informationen wie **Anrede** (wählen Sie aus der Liste Herr, Frau, Fräulein, Dr., Prof., Pastor/Pastorin usw. oder geben Sie eine eigene Anrede mit bis zu 10 Zeichen ein), zweiten Vornamen, **Mitgliedsstatus** (**Besucher**, **Gast**, **Regelmäßiger Teilnehmer**, **Mitglied**, **Mitarbeitende**, **Inaktiv** oder **Verstorben**), Daten, Adresse, Telefonnummern sowie (für Kinder und Schüler) Klasse und Schule.
3. Klicken Sie auf **Speichern**, um die persönlichen Angaben zu sichern.

Die linke Seite des Profils zeigt Foto, Name, Mitgliedsstatus, Kontaktdaten, Werte aus allen [eigenen Feldern](../settings/custom-fields.md) und den Haushalt der Person. Unterhalb des Haushalts zeigt **Hinzugefügt** das Datum, an dem der Datensatz angelegt wurde (nur für Personen, die seit Ende Oktober 2026 hinzugefügt wurden). Klicken Sie auf das Foto, um es zu ändern. Unterhalb der Schaltfläche **Bearbeiten** finden Sie weitere Aktionen: **Workflow** (die Person einem [Workflow](../serving/workflows.md) hinzufügen), **Zusammenführen**, **Exportieren** und **Daten exportieren**.

Der übrige Teil des Profils zeigt für jede Art verwandter Informationen einen Zusammenfassungsbereich:

- **Anwesenheit** – Zeigt, an welchen der letzten Wochen die Person anwesend war, und ihre jüngsten Besuche. Klicken Sie auf **Alle Jahre** für den vollständigen Besuchsverlauf, mit Standort, Gottesdienst, Gottesdienstzeit, Gruppe und einer Spalte **Eingecheckt** mit der Uhrzeit des Kiosk-Check-ins (als Strich dargestellt bei Besuchen ohne Kiosk-Check-in), oder auf **Drucken**, um ihn zu drucken (der Ausdruck hat Logo und Namen Ihrer Kirche zentriert oben, über dem Namen der Person). Für kirchenweite Trends statt des Verlaufs einer einzelnen Person siehe [Anwesenheit auswerten](../attendance/tracking-attendance.md).
- **Spenden** – Zeigt die Gaben dieses Jahres, einschließlich Gaben an nicht steuerlich absetzbare Fonds. Klicken Sie auf **Alle Jahre** für den vollständigen [Spendenverlauf](../donations/recording-donations.md) oder auf **Gabe erfassen**, um eine neue zu erfassen. Hat Ihre Kirche den [Spenden-Datenschutz](../settings/church-settings.md#giving-privacy) aktiviert, bleiben die Beträge verborgen, bis Sie auf **Spenden anzeigen** klicken.
- **Gruppen** – Listet die [Gruppenmitgliedschaften](../groups/group-members.md) der Person auf, mit **Beigetreten** und dem Datum des Beitritts zu jeder Gruppe, sofern es erfasst ist.
- **Notizen** – Zeigt aktuelle Notizen zur Person (Seelsorge, Nachbereitungen usw.). Klicken Sie auf **Alle Notizen**, um Notizen zu lesen und hinzuzufügen. Jede Notiz zeigt, wer sie geschrieben hat, sowie Datum und Uhrzeit der Veröffentlichung. Um aktuelle Notizen aller Personen auf einen Blick zu sehen, nutzen Sie die Seite [Notizen](./notes.md).
- **Formulare** – Listet die Formulare der Person und ob jedes davon eingereicht wurde (siehe [Mit Formularen arbeiten](#working-with-forms) unten).

Wenn Sie eine dieser vollständigen Ansichten geöffnet haben, klicken Sie oben auf den Link **Zurück zu** mit dem Namen der Person, um zum Profil zurückzukehren.

## Eine Person per E-Mail kontaktieren

Hat die Person eine E-Mail-Adresse hinterlegt, erscheint links im Profil unterhalb ihrer Kontaktdaten eine Schaltfläche **E-Mail**.

1. Klicken Sie im Profil der Person auf **E-Mail**.
2. Es öffnet sich ein Dialog **E-Mail**, der mit dem Namen der Person betitelt ist und unter **Empfänger** deren Adresse anzeigt.
3. Wählen Sie optional unter **Vorlage laden (optional)** eine gespeicherte Vorlage aus.
4. Geben Sie einen **Betreff** ein und verfassen Sie die Nachricht.
5. Klicken Sie auf **E-Mail senden**.

Um die Nachricht stattdessen in Ihrem eigenen E-Mail-Programm zu schreiben, klicken Sie auf **In meinem E-Mail-Programm öffnen**.

:::info
Der Versand aus B1 unterliegt denselben Freigabe- und Tageslimits wie die Gruppen-E-Mail. Hat Ihre Kirche noch keine Freigabe erhalten, bittet Sie der Dialog, eine Prüfung anzufordern – bis dahin können Sie trotzdem auf **In meinem E-Mail-Programm öffnen** klicken. Siehe [Gruppen-E-Mails für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Benutzer ohne Berechtigung, Gruppenmitglieder zu bearbeiten, gelangen beim Klick auf **E-Mail** direkt in ihr E-Mail-Programm.
:::

## Mit Formularen arbeiten {#working-with-forms}

Sie können eigene Formulare direkt aus dem Profil einer Person ausfüllen. Dies sind benutzerdefinierte Formulare, die Sie nach der Anleitung [Formulare erstellen](../forms/creating-forms.md) anlegen.

1. Suchen Sie im Profil der Person den Abschnitt **Formulare**. Er listet jedes Formular auf und zeigt, ob es **Eingereicht** oder **Nicht eingereicht** ist.
2. Klicken Sie auf den Namen eines Formulars, um es zu öffnen (oder auf **Alle Formulare**, um die vollständige Liste zu sehen).
3. Klicken Sie auf das **Bearbeitungssymbol** (Stift) des Formulars, füllen Sie die Angaben aus und klicken Sie auf **Speichern**.

Sobald ein Formular eingereicht ist, klicken Sie auf das **Druckersymbol** daneben, um die ausgefüllten Antworten der Person zu drucken. Hat die Person genau eine Einsendung eines Formulars, zeigt das Formular über den Antworten **Eingereicht** mit dem Datum an.

Ist eine Einsendung bei der falschen Person gelandet, klicken Sie daneben auf das Symbol **Person ändern** (zwei Pfeile), um sie einer anderen Person zuzuordnen oder die Verknüpfung zu lösen. Siehe [Die Person einer Einsendung ändern](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn Sie ein eigenständiges Formular brauchen (etwa für eine Veranstaltungsanmeldung), lesen Sie die Option [Eigenständiges Formular](../forms/creating-forms.md) in der Formularanleitung.
:::

:::tip
Wenn Sie nur ein oder zwei zusätzliche Angaben zu Personen erfassen möchten – ein Datum, eine Zahl, eine Ja/Nein-Antwort –, verwenden Sie stattdessen [Eigene Felder](../settings/custom-fields.md). Sie sind schneller ausgefüllt und direkt in der erweiterten Suche durchsuchbar.
:::

## Haushalte verwalten {#managing-households}

Mit Haushalten verknüpfen Sie Familienmitglieder miteinander. Das ist besonders nützlich für den [Check-in](../attendance/check-in.md), bei dem ein Elternteil alle seine Kinder auf einmal einchecken kann.

1. Klicken Sie im Profil einer Person links neben der Überschrift **Haushalt** auf **Bearbeiten**.
2. Der Haushalt-Editor öffnet sich. Wählen Sie die **Haushaltsrolle** der aktuellen Person (z. B. Haupt, Partner/in, Kind, Sonstige).
3. Klicken Sie auf das Symbol **Hinzufügen**, um ein weiteres Haushaltsmitglied hinzuzufügen.
4. Geben Sie unter **Haushaltsmitglied hinzufügen** den Namen der Person in das Suchfeld ein und drücken Sie **Eingabe** oder klicken Sie auf das Suchsymbol. (Bevor Sie etwas eingeben, wird eine kurze Liste **Zuletzt verwendeter Personen** angezeigt.)
5. Sobald die Person in den Ergebnissen erscheint, klicken Sie auf ihren Namen oder auf das Symbol Hinzufügen daneben.
6. Wählen Sie deren Haushaltsrolle und klicken Sie auf **Speichern**, um die Einrichtung des Haushalts abzuschließen.

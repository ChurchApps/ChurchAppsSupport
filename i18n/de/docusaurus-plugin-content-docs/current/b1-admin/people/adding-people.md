---
title: "Personen hinzufügen"
---

# Personen hinzufügen

<div class="article-intro">

Der Bereich Personen ist das Fundament von B1 Admin -- die Mitgliederdatenbank Ihrer Gemeinde. Alle anderen Funktionen (Gruppen, Anwesenheit, Spenden, Formulare) beziehen sich auf Personendatensätze. Diese Anleitung zeigt Ihnen, wie Sie jemanden zu Ihrer Datenbank hinzufügen, seine Angaben bearbeiten und Familienmitglieder zu Haushalten verknüpfen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen zu verwalten. Lesen Sie [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe nicht sicher sind.
- Wenn Sie mehr als eine Handvoll Personen hinzufügen möchten, verwenden Sie besser das Werkzeug [CSV-Import](importing-data.md).

</div>

## Eine Person hinzufügen

1. Öffnen Sie das Dashboard von B1.church Admin.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Personen**.
3. Klicken Sie im Kopfbereich der Seite auf die Schaltfläche **Person hinzufügen**. Die Seite scrollt zum Formular **Neue Person hinzufügen** unterhalb des Verzeichnisses.
4. Geben Sie **Vorname**, **Nachname** und **E-Mail** der Person ein und klicken Sie auf **Hinzufügen**.

Die Profilseite der Person öffnet sich, und Sie können weitere Angaben ergänzen.

:::tip
Wenn Sie von einem anderen Gemeindeverwaltungssystem wechseln, können Sie mit der Funktion [Daten importieren](importing-data.md) Ihr gesamtes Verzeichnis aus einer CSV-Datei übernehmen. Das geht deutlich schneller, als Personen einzeln anzulegen.
:::

### Warnungen bei Dubletten

Wenn die E-Mail-Adresse (oder, wenn Sie die Person über das vollständige Formular Bearbeiten anlegen, die Telefonnummer oder die Kombination aus Vorname, Nachname und Geburtsdatum) mit einer Person in Ihrer Datenbank übereinstimmt, erscheint vor dem Speichern des neuen Datensatzes ein Dialog **Mögliche Dublette**. Er listet jede passende Person mit E-Mail-Adresse, Telefonnummer und Geburtsdatum auf, damit Sie vergleichen können.

- Klicken Sie neben einem Treffer auf **Vorhandene verwenden**, um stattdessen dessen Datensatz zu nutzen und keinen neuen anzulegen.
- Klicken Sie auf **Trotzdem anlegen**, um die neue Person hinzuzufügen, obwohl eine mögliche Übereinstimmung gefunden wurde.

Dies prüft nur beim Anlegen einer völlig neuen Person auf Dubletten. Das Bearbeiten eines bestehenden Datensatzes löst die Prüfung nie aus. Die Prüfung verhindert nur neue Dubletten; sie führt keine bereits bestehenden Datensätze zusammen.

## Angaben bearbeiten

1. Klicken Sie auf der Profilseite der Person links unter den Kontaktdaten auf die Schaltfläche **Bearbeiten**.
2. Ergänzen Sie im Formular **Persönliche Angaben** weitere Informationen wie zweiten Vornamen, Mitgliedschaftsstatus (**Besucher**, **Gast**, **Regelmäßiger Teilnehmer**, **Mitglied**, **Mitarbeiter**, **Inaktiv** oder **Verstorben**), Daten, Anschrift, Telefonnummern und (bei Kindern und Jugendlichen) Klassenstufe und Schule.
3. Klicken Sie auf **Speichern**, um die persönlichen Angaben zu sichern.

Die linke Seite des Profils zeigt Foto, Namen, Mitgliedschaftsstatus, Kontaktdaten, Werte von [eigenen Feldern](../settings/custom-fields.md) und den Haushalt der Person. Klicken Sie auf das Foto, um es zu ändern. Unterhalb der Schaltfläche **Bearbeiten** finden Sie weitere Aktionen: **Workflow** (die Person einem [Workflow](../serving/workflows.md) hinzufügen), **Zusammenführen**, **Exportieren** und **Daten exportieren**.

Der übrige Teil des Profils zeigt für jede Art verwandter Informationen einen Übersichtsbereich:

- **Anwesenheit** — Zeigt, an welchen der letzten Wochen die Person anwesend war, sowie ihre jüngsten Besuche. Klicken Sie auf **Alle Jahre** für den vollständigen Besuchsverlauf mit Standort, Gottesdienst, Gottesdienstzeit, Gruppe und einer Spalte **Eingecheckt** mit der Uhrzeit des Kiosk-Check-ins (für Besuche ohne Kiosk-Check-in wird ein Strich angezeigt), oder auf **Drucken**, um ihn auszudrucken. Für gemeindeweite Trends statt des Verlaufs einer einzelnen Person siehe [Anwesenheit verfolgen](../attendance/tracking-attendance.md).
- **Spenden** — Zeigt die Gaben dieses Jahres, einschließlich Gaben an nicht absetzbare Fonds. Klicken Sie auf **Alle Jahre** für den vollständigen [Spendenverlauf](../donations/recording-donations.md) oder auf **Gabe erfassen**, um eine neue Gabe zu erfassen. Wenn Ihre Gemeinde den [Spenden-Datenschutz](../settings/church-settings.md#giving-privacy) aktiviert hat, bleiben die Beträge verborgen, bis Sie auf **Spenden anzeigen** klicken.
- **Gruppen** — Listet die [Gruppenmitgliedschaften](../groups/group-members.md) der Person auf.
- **Notizen** — Zeigt aktuelle Notizen zur Person (Seelsorge, Nachverfolgung usw.). Klicken Sie auf **Alle Notizen**, um Notizen zu lesen und hinzuzufügen.
- **Formulare** — Listet die Formulare der Person auf und zeigt, ob sie jeweils eingereicht wurden (siehe unten [Mit Formularen arbeiten](#working-with-forms)).

Wenn Sie eine dieser vollständigen Ansichten öffnen, klicken Sie oben auf den Link **Zurück zu** mit dem Namen der Person, um zum Profil zurückzukehren.

## Eine Person per E-Mail kontaktieren

Wenn für die Person eine E-Mail-Adresse hinterlegt ist, erscheint links unter ihren Kontaktdaten im Profil die Schaltfläche **E-Mail**.

1. Klicken Sie im Profil der Person auf **E-Mail**.
2. Es öffnet sich ein Dialog **E-Mail**, der mit dem Namen der Person betitelt ist und unter **Gesendet an** die Adresse der Person anzeigt.
3. Wählen Sie optional eine gespeicherte Vorlage unter **Vorlage laden (optional)**.
4. Geben Sie einen **Betreff** ein und verfassen Sie die Nachricht.
5. Klicken Sie auf **E-Mail senden**.

Um die Nachricht stattdessen in Ihrem eigenen E-Mail-Programm zu schreiben, klicken Sie auf **In meinem E-Mail-Programm öffnen**.

:::info
Der Versand aus B1 unterliegt denselben Freigaben und täglichen Limits wie Gruppen-E-Mails. Wenn Ihre Gemeinde noch nicht freigegeben wurde, fordert der Dialog Sie auf, eine Prüfung anzufordern. In der Zwischenzeit können Sie weiterhin auf **In meinem E-Mail-Programm öffnen** klicken. Siehe [Gruppen-E-Mails für Ihre Gemeinde aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Benutzer ohne Berechtigung zum Bearbeiten von Gruppenmitgliedern öffnen beim Klick auf **E-Mail** direkt ihr E-Mail-Programm.
:::

## Mit Formularen arbeiten

Sie können eigene Formulare direkt aus dem Profil einer Person ausfüllen. Dabei handelt es sich um benutzerdefinierte Formulare, die Sie gemäß der Anleitung [Formulare erstellen](../forms/creating-forms.md) anlegen können.

1. Suchen Sie im Profil der Person den Abschnitt **Formulare**. Er listet jedes Formular auf und zeigt, ob es **Eingereicht** oder **Nicht eingereicht** ist.
2. Klicken Sie auf den Namen eines Formulars, um es zu öffnen (oder auf **Alle Formulare**, um die vollständige Liste zu sehen).
3. Klicken Sie beim Formular auf das **Bearbeiten-Symbol** (Stift), füllen Sie die Angaben aus und klicken Sie auf **Speichern**.

Sobald ein Formular eingereicht ist, klicken Sie daneben auf das **Druck-Symbol**, um die ausgefüllten Antworten dieser Person zu drucken.

Wenn eine Einsendung der falschen Person zugeordnet wurde, klicken Sie daneben auf das Symbol **Person ändern** (zwei Pfeile), um sie einer anderen Person zuzuordnen oder die Verknüpfung zu lösen. Siehe [Person einer Einsendung ändern](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn Sie ein eigenständiges Formular benötigen (etwa für eine Veranstaltungsanmeldung), lesen Sie die Option [Eigenständiges Formular](../forms/creating-forms.md) in der Anleitung zu Formularen.
:::

:::tip
Wenn Sie nur ein oder zwei zusätzliche Angaben zu Personen erfassen möchten -- ein Datum, eine Zahl, eine Ja-/Nein-Antwort --, verwenden Sie [Eigene Felder](../settings/custom-fields.md) statt eines Formulars. Sie sind schneller ausgefüllt und können direkt in der erweiterten Suche durchsucht werden.
:::

## Haushalte verwalten {#managing-households}

Mit Haushalten verknüpfen Sie Familienmitglieder miteinander. Das ist besonders nützlich für den [Check-in](../attendance/check-in.md), wo ein Elternteil alle seine Kinder auf einmal einchecken kann.

1. Klicken Sie im Profil einer Person links neben der Überschrift **Haushalt** auf **Bearbeiten**.
2. Der Haushalt-Editor öffnet sich. Wählen Sie die **Haushaltsrolle** der aktuellen Person (z. B. Haupt, Partner, Kind oder Sonstige).
3. Klicken Sie auf das Symbol **Hinzufügen**, um ein weiteres Haushaltsmitglied hinzuzufügen.
4. Geben Sie unter **Haushaltsmitglied hinzufügen** den Namen der Person in das Suchfeld ein und drücken Sie **Enter** oder klicken Sie auf das Suchsymbol. (Bevor Sie etwas eingeben, wird eine kurze Liste der **Zuletzt verwendeten Personen** angezeigt.)
5. Sobald die Person in den Ergebnissen erscheint, klicken Sie auf ihren Namen oder auf das Symbol Hinzufügen daneben.
6. Wählen Sie deren Haushaltsrolle und klicken Sie auf **Speichern**, um die Einrichtung des Haushalts abzuschließen.

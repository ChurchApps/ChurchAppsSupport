---
title: "Personen hinzufügen"
---

# Personen hinzufügen

<div class="article-intro">

Der Bereich Personen ist das Fundament von B1 Admin -- die Mitgliederdatenbank Ihrer Kirche. Alle anderen Funktionen (Gruppen, Anwesenheit, Spenden, Formulare) hängen an den Personendatensätzen. Diese Anleitung zeigt Ihnen, wie Sie eine Person in Ihre Datenbank aufnehmen, ihre Angaben bearbeiten und Familienmitglieder zu Haushalten zusammenfassen.

</div>

## Einführungsvideo

<YouTube id="NTL1UDQpx8s" title="Personen und Haushalte in B1 hinzufügen" next="Ihre Personendatenbank in B1 importieren" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen zu verwalten. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe unsicher sind.
- Wenn Sie mehr als eine Handvoll Personen hinzufügen möchten, verwenden Sie besser das Werkzeug [CSV-Import](importing-data.md).

</div>

## Eine Person hinzufügen

1. Öffnen Sie das B1.church-Admin-Dashboard.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Personen**.
3. Klicken Sie im Seitenkopf auf die Schaltfläche **Person hinzufügen**. Die Seite scrollt zum Formular **Neue Person hinzufügen** unterhalb des Verzeichnisses.
4. Tragen Sie **Vorname**, **Nachname** und **E-Mail** der Person ein und klicken Sie auf **Hinzufügen**.

Die Profilseite der Person öffnet sich, sodass Sie weitere Angaben ergänzen können.

:::tip
Wenn Sie von einem anderen Gemeindeverwaltungssystem kommen, können Sie mit dem Werkzeug [Daten importieren](importing-data.md) Ihr gesamtes Verzeichnis aus einer CSV-Datei übernehmen -- das geht deutlich schneller, als Personen einzeln anzulegen.
:::

### Warnung vor Dubletten

Wenn die E-Mail-Adresse (oder, beim Anlegen einer Person über das vollständige Bearbeitungsformular, die Telefonnummer bzw. derselbe Vorname + Nachname + Geburtsdatum) bereits zu jemandem in Ihrer Datenbank passt, erscheint ein Dialog **Mögliches Duplikat**, bevor der neue Datensatz gespeichert wird. Er listet jede passende Person mit E-Mail-Adresse, Telefonnummer und Geburtsdatum auf, damit Sie vergleichen können.

- Klicken Sie neben einem Treffer auf **Vorhandene verwenden**, um stattdessen den Datensatz dieser Person zu nutzen.
- Klicken Sie auf **Trotzdem anlegen**, um die neue Person hinzuzufügen, obwohl ein möglicher Treffer gefunden wurde.

Diese Prüfung findet nur statt, wenn Sie einen völlig neuen Datensatz anlegen -- beim Bearbeiten eines bestehenden Datensatzes wird sie nie ausgelöst. Sie verhindert nur neue Dubletten; sie führt keine bereits vorhandenen Datensätze zusammen.

## Angaben bearbeiten

1. Klicken Sie auf der Profilseite der Person links unterhalb ihrer Kontaktdaten auf die Schaltfläche **Bearbeiten**.
2. Ergänzen Sie im Formular **Persönliche Daten** weitere Angaben wie zweiten Vornamen, Mitgliedsstatus (**Besucher**, **Gast**, **Regelmäßiger Teilnehmer**, **Mitglied**, **Mitarbeitende**, **Inaktiv** oder **Verstorben**), Daten, Adresse, Telefonnummern sowie (für Kinder und Jugendliche) Klasse und Schule.
3. Klicken Sie auf **Speichern**, um die persönlichen Angaben zu sichern.

Die linke Seite des Profils zeigt Foto, Name, Mitgliedsstatus, Kontaktdaten, alle Werte von [benutzerdefinierten Feldern](../settings/custom-fields.md) und den Haushalt der Person. Klicken Sie auf das Foto, um es zu ändern. Unterhalb der Schaltfläche **Bearbeiten** stehen weitere Aktionen: **Workflow** (die Person zu einem [Workflow](../serving/workflows.md) hinzufügen), **Zusammenführen**, **Exportieren** und **Daten exportieren**.

Der Rest des Profils zeigt für jede Art verwandter Informationen einen Übersichtsbereich:

- **Anwesenheit** -- Zeigt, an welchen der letzten Wochen die Person teilgenommen hat, sowie ihre jüngsten Besuche. Klicken Sie auf **Alle Jahre**, um den vollständigen Besuchsverlauf zu sehen, einschließlich Standort, Gottesdienst, Gottesdienstzeit, Gruppe und einer Spalte **Eingecheckt** mit der Check-in-Zeit am Kiosk (ein Strich, wenn ein Besuch ohne Kiosk-Check-in erfasst wurde), oder auf **Drucken**, um ihn auszudrucken (der Ausdruck zeigt Ihr Kirchenlogo und Ihren Kirchennamen zentriert oben, über dem Namen der Person). Für Trends der gesamten Gemeinde statt des Verlaufs einer einzelnen Person siehe [Anwesenheit erfassen](../attendance/tracking-attendance.md)
- **Spenden** -- Zeigt die Gaben dieses Jahres, einschließlich Gaben an nicht steuerlich absetzbare Fonds. Klicken Sie auf **Alle Jahre**, um den vollständigen [Spendenverlauf](../donations/recording-donations.md) zu sehen, oder auf **Gabe erfassen**, um eine neue zu erfassen. Hat Ihre Kirche den [Spenden-Datenschutz](../settings/church-settings.md#giving-privacy) aktiviert, bleiben Beträge verborgen, bis Sie auf **Spenden anzeigen** klicken
- **Gruppen** -- Listet die [Gruppenmitgliedschaften](../groups/group-members.md) der Person auf
- **Notizen** -- Zeigt aktuelle Notizen zur Person (Seelsorge, Nachverfolgungen usw.). Klicken Sie auf **Alle Notizen**, um Notizen zu lesen und hinzuzufügen. Jede Notiz zeigt, wer sie verfasst hat, sowie Datum und Uhrzeit. Um aktuelle Notizen für alle gleichzeitig zu sehen, nutzen Sie die Seite [Notizen](./notes.md)
- **Formulare** -- Listet die Formulare der Person und ob jedes davon eingereicht wurde (siehe [Mit Formularen arbeiten](#working-with-forms) unten)

Wenn Sie eine dieser vollständigen Ansichten geöffnet haben, klicken Sie auf den Link **Zurück zu** mit dem Namen der Person oben, um zum Profil zurückzukehren.

## Eine Person kontaktieren

Wenn für die Person eine E-Mail-Adresse hinterlegt ist, erscheint unterhalb ihrer Kontaktdaten links im Profil eine Schaltfläche **E-Mail**.

1. Klicken Sie im Profil der Person auf **E-Mail**.
2. Ein Dialog **E-Mail**, der mit dem Namen der Person betitelt ist, öffnet sich und zeigt unter **Empfänger** die Adresse der Person an.
3. Wählen Sie optional eine gespeicherte Vorlage unter **Vorlage laden (optional)**.
4. Geben Sie einen **Betreff** ein und verfassen Sie die Nachricht.
5. Klicken Sie auf **E-Mail senden**.

Wenn Sie die Nachricht lieber in Ihrem eigenen E-Mail-Programm schreiben möchten, klicken Sie auf **In meinem E-Mail-Programm öffnen**.

:::info
Der Versand aus B1 unterliegt denselben Genehmigungs- und Tageslimits wie die E-Mail an Gruppen. Hat Ihre Kirche noch keine Freigabe erhalten, fordert der Dialog Sie auf, eine Prüfung anzufragen -- in der Zwischenzeit können Sie weiterhin auf **In meinem E-Mail-Programm öffnen** klicken. Siehe [E-Mail-Versand für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Benutzer ohne Berechtigung, Gruppenmitglieder zu bearbeiten, gelangen beim Klick auf **E-Mail** direkt in ihr E-Mail-Programm.
:::

## Mit Formularen arbeiten

Sie können benutzerdefinierte Formulare direkt aus dem Profil einer Person ausfüllen. Dies sind vom Anwender definierte Formulare, die Sie mit der Anleitung [Formulare erstellen](../forms/creating-forms.md) gestalten können.

1. Suchen Sie im Profil der Person den Bereich **Formulare**. Er listet jedes Formular auf und zeigt, ob es **Eingereicht** oder **Nicht eingereicht** ist.
2. Klicken Sie auf den Namen eines Formulars, um es zu öffnen (oder auf **Alle Formulare**, um die vollständige Liste zu sehen).
3. Klicken Sie auf das **Bearbeiten-Symbol** (Stift) am Formular, füllen Sie die Angaben aus und klicken Sie auf **Speichern**.

Sobald ein Formular eingereicht wurde, klicken Sie auf das **Druck-Symbol** daneben, um die ausgefüllten Antworten dieser Person zu drucken.

Wenn eine Einreichung bei der falschen Person gelandet ist, klicken Sie auf das Symbol **Person ändern** (zwei Pfeile) daneben, um sie einer anderen Person zuzuordnen oder die Verknüpfung zu lösen. Siehe [Die Person einer Einreichung ändern](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn Sie ein eigenständiges Formular benötigen (etwa eine Veranstaltungsanmeldung), siehe die Option [Eigenständiges Formular](../forms/creating-forms.md) im Formular-Leitfaden.
:::

:::tip
Wenn Sie nur ein oder zwei zusätzliche Angaben zu Personen erfassen möchten -- ein Datum, eine Zahl, eine Ja/Nein-Antwort -- verwenden Sie besser [Benutzerdefinierte Felder](../settings/custom-fields.md) statt eines Formulars. Sie sind schneller ausgefüllt und lassen sich direkt in der erweiterten Suche durchsuchen.
:::

## Haushalte verwalten {#managing-households}

Haushalte ermöglichen es, Familienmitglieder miteinander zu verknüpfen. Das ist besonders nützlich beim [Check-in](../attendance/check-in.md), wo ein Elternteil alle Kinder auf einmal einchecken kann.

1. Klicken Sie im Profil einer Person links neben der Überschrift **Haushalt** auf **Bearbeiten**.
2. Der Haushalts-Editor öffnet sich. Wählen Sie die **Haushaltsrolle** der aktuellen Person aus (z. B. Haupt, Partner/in, Kind, Sonstige).
3. Klicken Sie auf das Symbol **Hinzufügen**, um ein weiteres Haushaltsmitglied hinzuzufügen.
4. Geben Sie unter **Haushaltsmitglied hinzufügen** den Namen der Person in das Suchfeld ein und drücken Sie **Enter** oder klicken Sie auf das Lupensymbol. (Bevor Sie etwas eingeben, wird eine kurze Liste **Zuletzt verwendete Personen** angezeigt.)
5. Sobald die Person in den Ergebnissen erscheint, klicken Sie auf ihren Namen oder auf das Hinzufügen-Symbol daneben.
6. Wählen Sie die Haushaltsrolle der Person und klicken Sie auf **Speichern**, um die Haushaltszuordnung abzuschließen.

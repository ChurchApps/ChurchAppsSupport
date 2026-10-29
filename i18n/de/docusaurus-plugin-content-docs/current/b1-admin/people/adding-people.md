---
title: "Personen hinzufügen"
---

# Personen hinzufügen

<div class="article-intro">

Der Bereich Personen ist die Grundlage von B1 Admin -- die Mitgliederdatenbank Ihrer Kirche. Alle anderen Funktionen (Gruppen, Anwesenheit, Spenden, Formulare) beziehen sich auf Personendatensätze. Diese Anleitung führt Sie durch das Hinzufügen einer Person zu Ihrer Datenbank, das Bearbeiten ihrer Angaben und das Verknüpfen von Familienmitgliedern zu Haushalten.

</div>

## Schulungsvideo

<YouTube id="NTL1UDQpx8s" title="Personen und Haushalte in B1 hinzufügen" next="Ihre Personendatenbank in B1 importieren" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen zu verwalten. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich über Ihre Zugriffsstufe nicht sicher sind.
- Wenn Sie mehr als eine Handvoll Personen hinzufügen möchten, verwenden Sie stattdessen das Werkzeug [CSV-Import](importing-data.md).

</div>

## Eine Person hinzufügen

1. Rufen Sie das Dashboard von B1.church Admin auf.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Personen**.
3. Klicken Sie im Seitenkopf auf die Schaltfläche **Person hinzufügen**. Die Seite scrollt zum Formular **Neue Person hinzufügen** unterhalb des Verzeichnisses.
4. Geben Sie **Vorname**, **Nachname** und **E-Mail** der Person ein und klicken Sie dann auf **Hinzufügen**.

Die Profilseite der Person öffnet sich, sodass Sie weitere Angaben ergänzen können.

:::tip
Wenn Sie von einem anderen Kirchenverwaltungssystem umziehen, können Sie mit der Funktion [Daten importieren](importing-data.md) Ihr gesamtes Verzeichnis aus einer CSV-Datei übernehmen -- das geht deutlich schneller, als Personen einzeln anzulegen.
:::

### Hinweise auf Dubletten

Stimmt die E-Mail-Adresse (oder beim Anlegen einer Person über das vollständige Bearbeitungsformular die Telefonnummer oder Vorname, Nachname und Geburtsdatum) mit jemandem überein, der bereits in Ihrer Datenbank steht, erscheint vor dem Speichern des neuen Datensatzes ein Dialog **Mögliche Dublette**. Er listet jede passende Person mit E-Mail-Adresse, Telefonnummer und Geburtsdatum auf, damit Sie vergleichen können.

- Klicken Sie neben einem Treffer auf **Vorhandene verwenden**, um den Datensatz dieser Person zu nutzen, statt einen neuen anzulegen.
- Klicken Sie auf **Trotzdem anlegen**, um die neue Person hinzuzufügen, obwohl ein möglicher Treffer gefunden wurde.

Diese Dublettenprüfung greift nur beim Anlegen einer völlig neuen Person -- das Bearbeiten eines bestehenden Datensatzes löst sie nie aus. Sie verhindert nur neue Dubletten; zwei bereits vorhandene Datensätze führt sie nicht zusammen.

## Angaben bearbeiten

1. Klicken Sie auf der Profilseite der Person links unterhalb ihrer Kontaktdaten auf die Schaltfläche **Bearbeiten**.
2. Ergänzen Sie im Formular **Persönliche Angaben** weitere Informationen wie zweiten Vornamen, Mitgliedsstatus (**Besucher**, **Gast**, **Regelmäßiger Teilnehmer**, **Mitglied**, **Mitarbeiter**, **Inaktiv** oder **Verstorben**), Daten, Adresse, Telefonnummern und (für Kinder und Schüler) Klasse und Schule.
3. Klicken Sie auf **Speichern**, um die persönlichen Angaben zu sichern.

Die linke Seite des Profils zeigt Foto, Name, Mitgliedsstatus, Kontaktdaten, Werte von [benutzerdefinierten Feldern](../settings/custom-fields.md) und den Haushalt der Person. Unterhalb des Haushalts zeigt **Hinzugefügt** das Datum, an dem der Datensatz angelegt wurde (nur für Personen, die seit Ende Oktober 2026 hinzugefügt wurden). Klicken Sie auf das Foto, um es zu ändern. Unterhalb der Schaltfläche **Bearbeiten** finden Sie weitere Aktionen: **Workflow** (die Person zu einem [Workflow](../serving/workflows.md) hinzufügen), **Zusammenführen**, **Exportieren** und **Daten exportieren**.

Der übrige Teil des Profils zeigt für jede Art verbundener Informationen eine Zusammenfassung:

- **Anwesenheit** -- Zeigt, an welchen der letzten Wochen die Person anwesend war, sowie ihre letzten Besuche. Klicken Sie auf **Alle Jahre** für den vollständigen Besuchsverlauf mit Standort, Gottesdienst, Gottesdienstzeit, Gruppe und einer Spalte **Eingecheckt** mit der Check-in-Zeit am Kiosk (als Strich dargestellt bei Besuchen ohne Kiosk-Check-in). Oder klicken Sie auf **Drucken**, um ihn auszudrucken (der Ausdruck zeigt oben mittig das Logo und den Namen Ihrer Kirche, darüber den Namen der Person). Für kirchenweite Trends statt des Verlaufs einer einzelnen Person siehe [Anwesenheit nachverfolgen](../attendance/tracking-attendance.md).
- **Spenden** -- Zeigt die Gaben dieses Jahres, einschließlich Gaben an nicht absetzbare Fonds. Klicken Sie auf **Alle Jahre** für den vollständigen [Spendenverlauf](../donations/recording-donations.md) oder auf **Gabe erfassen**, um eine neue zu erfassen. Hat Ihre Kirche den [Datenschutz bei Spenden](../settings/church-settings.md#giving-privacy) aktiviert, bleiben die Beträge verborgen, bis Sie auf **Spenden anzeigen** klicken.
- **Gruppen** -- Listet die [Gruppenmitgliedschaften](../groups/group-members.md) der Person auf, mit **Beigetreten** und dem Beitrittsdatum jeder Gruppe, sofern es erfasst ist.
- **Notizen** -- Zeigt aktuelle Notizen zur Person (Seelsorge, Nachfassaktionen usw.). Klicken Sie auf **Alle Notizen**, um Notizen zu lesen und hinzuzufügen. Jede Notiz zeigt, wer sie geschrieben hat, sowie Datum und Uhrzeit. Um aktuelle Notizen aller Personen auf einmal zu sehen, nutzen Sie die Seite [Notizen](./notes.md).
- **Formulare** -- Listet die Formulare der Person und ob jedes eingereicht wurde (siehe [Mit Formularen arbeiten](#working-with-forms) unten)

Wenn Sie eine dieser vollständigen Ansichten öffnen, klicken Sie oben auf den Link **Zurück zu** mit dem Namen der Person, um zum Profil zurückzukehren.

## Eine Person per E-Mail kontaktieren

Ist für die Person eine E-Mail-Adresse hinterlegt, erscheint links im Profil unterhalb ihrer Kontaktdaten eine Schaltfläche **E-Mail**.

1. Klicken Sie im Profil der Person auf **E-Mail**.
2. Ein Dialog **E-Mail** mit dem Namen der Person im Titel öffnet sich und zeigt unter **Senden an** die Adresse der Person.
3. Wählen Sie optional eine gespeicherte Vorlage unter **Vorlage laden (optional)**.
4. Geben Sie einen **Betreff** ein und verfassen Sie die Nachricht.
5. Klicken Sie auf **E-Mail senden**.

Um die Nachricht stattdessen in Ihrem eigenen E-Mail-Programm zu schreiben, klicken Sie auf **In meiner E-Mail-App öffnen**.

:::info
Der Versand aus B1 unterliegt denselben Freigabe- und Tageslimits wie die Gruppen-E-Mail. Ist Ihre Kirche noch nicht freigegeben, fordert der Dialog Sie auf, eine Prüfung anzufordern -- in der Zwischenzeit können Sie trotzdem auf **In meiner E-Mail-App öffnen** klicken. Siehe [Gruppen-E-Mail für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Benutzer ohne Berechtigung, Gruppenmitglieder zu bearbeiten, gelangen beim Klick auf **E-Mail** direkt in ihre E-Mail-App.
:::

## Mit Formularen arbeiten

Sie können benutzerdefinierte Formulare direkt aus dem Profil einer Person ausfüllen. Dies sind frei definierbare Formulare, die Sie nach der Anleitung [Formulare erstellen](../forms/creating-forms.md) anlegen können.

1. Suchen Sie im Profil der Person den Bereich **Formulare**. Er listet jedes Formular und ob es **eingereicht** oder **nicht eingereicht** ist.
2. Klicken Sie auf den Namen eines Formulars, um es zu öffnen (oder auf **Alle Formulare**, um die vollständige Liste zu sehen).
3. Klicken Sie auf das **Bearbeitungssymbol** (Stift) des Formulars, füllen Sie die Angaben aus und klicken Sie auf **Speichern**.

Sobald ein Formular eingereicht wurde, klicken Sie auf das **Druckersymbol** daneben, um die ausgefüllten Antworten der Person auszudrucken. Hat die Person ein einzelnes Formular nur einmal eingereicht, zeigt das Formular oberhalb der Antworten **Eingereicht** mit dem Datum an.

Wurde eine Einreichung der falschen Person zugeordnet, klicken Sie daneben auf das Symbol **Person ändern** (zwei Pfeile), um sie einer anderen Person zuzuordnen oder die Verknüpfung zu lösen. Siehe [Die Person einer Einreichung ändern](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Benötigen Sie ein eigenständiges Formular (etwa für eine Veranstaltungsanmeldung), lesen Sie die Option [Eigenständiges Formular](../forms/creating-forms.md) im Formularleitfaden.
:::

:::tip
Wenn Sie über Personen nur ein oder zwei zusätzliche Angaben festhalten müssen -- ein Datum, eine Zahl, eine Ja-/Nein-Antwort -- verwenden Sie besser [Benutzerdefinierte Felder](../settings/custom-fields.md) statt eines Formulars. Sie sind schneller ausgefüllt und lassen sich direkt in der erweiterten Suche durchsuchen.
:::

## Haushalte verwalten {#managing-households}

Haushalte ermöglichen es, Familienmitglieder miteinander zu verknüpfen. Das ist besonders beim [Check-in](../attendance/check-in.md) nützlich, bei dem ein Elternteil alle seine Kinder auf einmal einchecken kann.

1. Klicken Sie im Profil einer Person links neben der Überschrift **Haushalt** auf **Bearbeiten**.
2. Der Haushalts-Editor öffnet sich. Wählen Sie die **Haushaltsrolle** der aktuellen Person (z. B. Haupt, Partner/in, Kind, Sonstige).
3. Klicken Sie auf das Symbol **Hinzufügen**, um ein weiteres Haushaltsmitglied hinzuzufügen.
4. Geben Sie unter **Haushaltsmitglied hinzufügen** den Namen der Person in das Suchfeld ein und drücken Sie **Enter** oder klicken Sie auf das Suchsymbol. (Bevor Sie etwas eingeben, wird eine kurze Liste **Zuletzt verwendete Personen** angezeigt.)
5. Sobald die Person in den Ergebnissen erscheint, klicken Sie auf ihren Namen oder auf das Hinzufügen-Symbol daneben.
6. Wählen Sie ihre Haushaltsrolle und klicken Sie auf **Speichern**, um die Haushaltseinrichtung abzuschließen.

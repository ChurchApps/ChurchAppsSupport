---
title: "Personen hinzufügen"
---

# Personen hinzufügen

<div class="article-intro">

Der Bereich Personen ist das Fundament von B1 Admin -- die Mitgliederdatenbank Ihrer Kirche. Alle anderen Funktionen (Gruppen, Anwesenheit, Spenden, Formulare) hängen an den Personendatensätzen. Diese Anleitung zeigt Ihnen, wie Sie eine Person in Ihre Datenbank aufnehmen, ihre Angaben bearbeiten und Familienmitglieder zu Haushalten zusammenfassen.

</div>

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
Wenn Sie von einem anderen Gemeindeverwaltungssystem migrieren, können Sie mit der Funktion [Daten importieren](importing-data.md) Ihr gesamtes Verzeichnis aus einer CSV-Datei übernehmen -- das ist deutlich schneller, als Personen einzeln hinzuzufügen.
:::

### Dubletten-Warnungen

Wenn die E-Mail-Adresse (oder, beim Anlegen einer Person über das vollständige Bearbeitungsformular, die Telefonnummer oder die Kombination aus Vorname, Nachname und Geburtsdatum) mit einer Person in Ihrer Datenbank übereinstimmt, erscheint ein Dialog **Mögliches Duplikat**, bevor der neue Datensatz gespeichert wird. Er listet jede passende Person mit E-Mail, Telefonnummer und Geburtsdatum auf, damit Sie sie vergleichen können.

- Klicken Sie neben einem Treffer auf **Vorhandene verwenden**, um stattdessen dessen Datensatz zu nutzen und keinen neuen anzulegen.
- Klicken Sie auf **Trotzdem anlegen**, um die neue Person hinzuzufügen, obwohl eine mögliche Übereinstimmung gefunden wurde.

Diese Prüfung findet nur beim Anlegen einer völlig neuen Person statt -- das Bearbeiten eines bestehenden Datensatzes löst sie nie aus. Sie verhindert nur neue Dubletten; sie führt bereits vorhandene Datensätze nicht zusammen.

## Angaben bearbeiten {#editing-details}

1. Klicken Sie auf dem Profil der Person links unter ihren Kontaktdaten auf die Schaltfläche **Bearbeiten**.
2. Füllen Sie im Formular **Persönliche Daten** weitere Angaben aus, etwa zweiten Vornamen, Mitgliedschaftsstatus (**Besucher**, **Gast**, **Regelmäßiger Teilnehmer**, **Mitglied**, **Mitarbeiter**, **Inaktiv** oder **Verstorben**), Daten, Adresse, Telefonnummern sowie (für Kinder und Schüler) Klasse und Schule.
3. Klicken Sie auf **Speichern**, um die persönlichen Angaben zu sichern.

Auf der linken Seite des Profils sehen Sie Foto, Name, Mitgliedschaftsstatus, Kontaktdaten, Werte benutzerdefinierter [Felder](../settings/custom-fields.md) sowie den Haushalt der Person. Klicken Sie auf das Foto, um es zu ändern. Unterhalb der Schaltfläche **Bearbeiten** finden Sie weitere Aktionen: **Workflow** (die Person zu einem [Workflow](../serving/workflows.md) hinzufügen), **Zusammenführen**, **Exportieren** und **Daten exportieren**.

Der Rest des Profils zeigt für jede Art verwandter Informationen einen Übersichtsbereich:

- **Anwesenheit** -- Zeigt, an welchen der letzten Wochen die Person teilgenommen hat, sowie ihre letzten Besuche. Klicken Sie auf **Alle Jahre** für den vollständigen Besuchsverlauf mit Standort, Gottesdienst, Gottesdienstzeit, Gruppe und der Spalte **Eingecheckt** mit der Uhrzeit des Kiosk-Check-ins (als Strich angezeigt bei Besuchen ohne Kiosk-Check-in), oder auf **Drucken**, um ihn auszudrucken. Für kirchenweite Trends statt des Verlaufs einer einzelnen Person siehe [Anwesenheit erfassen](../attendance/tracking-attendance.md)
- **Spenden** -- Zeigt die Gaben dieses Jahres, einschließlich Gaben an nicht steuerlich absetzbare Fonds. Klicken Sie auf **Alle Jahre** für den vollständigen [Spendenverlauf](../donations/recording-donations.md) oder auf **Eine Gabe erfassen**, um eine neue zu erfassen. Hat Ihre Kirche den [Spendenschutz](../settings/church-settings.md#giving-privacy) aktiviert, bleiben die Beträge verborgen, bis Sie auf **Spenden anzeigen** klicken
- **Gruppen** -- Listet die [Gruppenmitgliedschaften](../groups/group-members.md) der Person auf
- **Notizen** -- Zeigt aktuelle Notizen zur Person (Seelsorge, Nachverfolgung usw.). Klicken Sie auf **Alle Notizen**, um Notizen zu lesen und hinzuzufügen
- **Formulare** -- Listet die Formulare der Person und ob jedes eingereicht wurde (siehe [Mit Formularen arbeiten](#working-with-forms) unten)

Wenn Sie eine dieser vollständigen Ansichten öffnen, klicken Sie oben auf den Link **Zurück zu** mit dem Namen der Person, um zum Profil zurückzukehren.

## Eine Person per E-Mail kontaktieren

Ist für die Person eine E-Mail-Adresse hinterlegt, erscheint links im Profil unter ihren Kontaktdaten eine Schaltfläche **E-Mail**.

1. Klicken Sie im Profil der Person auf **E-Mail**.
2. Es öffnet sich ein Dialog **E-Mail**, der mit dem Namen der Person betitelt ist und unter **Senden an** die Adresse der Person anzeigt.
3. Wählen Sie optional eine gespeicherte Vorlage unter **Vorlage laden (optional)**.
4. Geben Sie einen **Betreff** ein und verfassen Sie die Nachricht.
5. Klicken Sie auf **E-Mail senden**.

Um die Nachricht stattdessen in Ihrem eigenen E-Mail-Programm zu schreiben, klicken Sie auf **In meiner E-Mail-App öffnen**.

:::info
Das Versenden aus B1 nutzt dieselbe Freigabe und dieselben Tageslimits wie die Gruppen-E-Mail. Wenn Ihre Kirche noch nicht freigegeben wurde, fordert der Dialog Sie auf, eine Prüfung anzufordern -- bis dahin können Sie trotzdem auf **In meiner E-Mail-App öffnen** klicken. Siehe [Gruppen-E-Mail für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Benutzer ohne Berechtigung zum Bearbeiten von Gruppenmitgliedern gelangen beim Klick auf **E-Mail** direkt in ihre E-Mail-App.
:::

## Mit Formularen arbeiten {#working-with-forms}

Sie können benutzerdefinierte Formulare direkt aus dem Profil einer Person ausfüllen. Dies sind benutzerdefinierte Formulare, die Sie mit der Anleitung [Formulare erstellen](../forms/creating-forms.md) gestalten können.

1. Suchen Sie im Profil der Person den Bereich **Formulare**. Er listet jedes Formular auf und zeigt, ob es **eingereicht** oder **nicht eingereicht** ist.
2. Klicken Sie auf den Namen eines Formulars, um es zu öffnen (oder auf **Alle Formulare**, um die vollständige Liste zu sehen).
3. Klicken Sie auf das **Bearbeitungssymbol** (Stift) des Formulars, füllen Sie die Angaben aus und klicken Sie auf **Speichern**.

Sobald ein Formular eingereicht ist, klicken Sie auf das **Druck-Symbol** daneben, um die ausgefüllten Antworten dieser Person zu drucken.

Wenn eine Einreichung der falschen Person zugeordnet wurde, klicken Sie auf das Symbol **Person ändern** (zwei Pfeile) daneben, um sie einer anderen Person zuzuordnen oder die Verknüpfung zu lösen. Siehe [Die Person einer Einreichung ändern](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn Sie ein eigenständiges Formular benötigen (etwa eine Veranstaltungsanmeldung), siehe die Option [Eigenständiges Formular](../forms/creating-forms.md) im Formular-Leitfaden.
:::

:::tip
Wenn Sie nur ein oder zwei zusätzliche Angaben zu Personen erfassen möchten -- ein Datum, eine Zahl, eine Ja/Nein-Antwort -- verwenden Sie stattdessen [Benutzerdefinierte Felder](../settings/custom-fields.md). Sie sind schneller auszufüllen und lassen sich direkt in der erweiterten Suche durchsuchen.
:::

## Haushalte verwalten {#managing-households}

Mit Haushalten können Sie Familienmitglieder miteinander verknüpfen. Das ist besonders nützlich beim [Check-in](../attendance/check-in.md), bei dem ein Elternteil alle seine Kinder auf einmal einchecken kann.

1. Klicken Sie im Profil einer Person links neben der Überschrift **Haushalt** auf **Bearbeiten**.
2. Der Haushalt-Editor öffnet sich. Wählen Sie die **Haushaltsrolle** der aktuellen Person (z. B. Haupt, Ehepartner, Kind, Sonstige).
3. Klicken Sie auf das Symbol **Hinzufügen**, um ein weiteres Haushaltsmitglied hinzuzufügen.
4. Geben Sie unter **Haushaltsmitglied hinzufügen** den Namen der Person in das Suchfeld ein und drücken Sie **Enter** oder klicken Sie auf das Lupensymbol. (Bevor Sie etwas eingeben, wird eine kurze Liste **Zuletzt verwendete Personen** angezeigt.)
5. Sobald die Person in den Ergebnissen erscheint, klicken Sie auf ihren Namen oder das Hinzufügen-Symbol daneben.
6. Wählen Sie ihre Haushaltsrolle und klicken Sie auf **Speichern**, um die Haushaltseinrichtung abzuschließen.

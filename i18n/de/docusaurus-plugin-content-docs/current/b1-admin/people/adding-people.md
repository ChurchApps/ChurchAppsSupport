---
title: "Personen hinzufügen"
description: "Eine Person in B1 Admin zur Gemeindedatenbank hinzufügen, ihre Angaben ergänzen und Familienmitglieder für Check-in und Auswertungen zu Haushalten verknüpfen."
---

# Personen hinzufügen

<div class="article-intro">

Der Bereich Personen ist die Grundlage von B1 Admin. Er ist die Mitgliederdatenbank Ihrer Gemeinde. Alle anderen Funktionen (Gruppen, Anwesenheit, Spenden, Formulare) greifen auf Personendatensätze zurück. Diese Anleitung zeigt Ihnen, wie Sie jemanden zur Datenbank hinzufügen, seine Angaben bearbeiten und Familienmitglieder zu Haushalten verknüpfen.

</div>

## Schulungsvideo

<YouTube id="GtsczJ8JPio" title="Personen und Haushalte in B1 hinzufügen" next="Ihre Personendatenbank in B1 importieren" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen zu verwalten. Wenn Sie unsicher sind, welche Zugriffsrechte Sie haben, lesen Sie [Rollen & Berechtigungen](roles-permissions.md).
- Wenn Sie mehr als eine Handvoll Personen hinzufügen, verwenden Sie besser das Werkzeug [CSV-Import](importing-data.md).

</div>

## Eine Person hinzufügen

1. Öffnen Sie das Admin-Dashboard von B1.church.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Personen**.
3. Klicken Sie im Seitenkopf auf die Schaltfläche **Person hinzufügen**. Die Seite scrollt zum Formular **Neue Person hinzufügen** unterhalb des Verzeichnisses.
4. Geben Sie **Vorname** und **Nachname** der Person ein. Optional können Sie außerdem die **Anrede** angeben (wählen Sie einen Vorschlag wie Herr, Frau, Dr. oder Pastor oder geben Sie eine eigene Anrede ein, bis zu 10 Zeichen), eine **E-Mail-Adresse** und eine **Mobilnummer**. Klicken Sie danach auf **Hinzufügen**.

Die Profilseite der Person öffnet sich, und Sie können weitere Angaben ergänzen.

:::tip
Wenn Sie von einem anderen Gemeindeverwaltungssystem wechseln, können Sie mit der Funktion [Daten importieren](importing-data.md) Ihr gesamtes Verzeichnis aus einer CSV-Datei übernehmen. Das geht deutlich schneller, als Personen einzeln anzulegen.
:::

### Dubletten-Warnungen

Wenn die E-Mail-Adresse (oder beim Anlegen über das vollständige Formular Bearbeiten die Telefonnummer bzw. Vorname, Nachname und Geburtsdatum) mit einer Person übereinstimmt, die bereits in Ihrer Datenbank ist, erscheint der Dialog **Mögliche Dublette**, bevor der neue Datensatz gespeichert wird. Er listet jede passende Person mit E-Mail, Telefonnummer und Geburtsdatum auf, damit Sie vergleichen können.

- Klicken Sie neben einem Treffer auf **Vorhandene verwenden**, um den Datensatz dieser Person zu nutzen, statt einen neuen anzulegen.
- Klicken Sie auf **Trotzdem anlegen**, um die neue Person hinzuzufügen, obwohl eine mögliche Übereinstimmung gefunden wurde.

Die Dublettenprüfung läuft nur beim Anlegen einer neuen Person. Beim Bearbeiten eines bestehenden Datensatzes wird sie nie ausgelöst. Sie verhindert nur neue Dubletten. Bereits vorhandene Datensätze führt sie nicht zusammen.

## Angaben bearbeiten {#editing-details}

1. Klicken Sie auf der Profilseite der Person links unterhalb ihrer Kontaktdaten auf die Schaltfläche **Bearbeiten**.
2. Ergänzen Sie im Formular **Persönliche Angaben** weitere Informationen wie die **Anrede** (wählen Sie Herr, Frau, Fräulein, Divers, Dr., Prof., Pfr. oder Pastor aus der Liste oder geben Sie eine eigene Anrede ein, bis zu 10 Zeichen), den zweiten Vornamen, den Mitgliedsstatus (**Besuchende**, **Gäste**, **Regelmäßige Teilnehmende**, **Mitglied**, **Mitarbeitende**, **Inaktiv** oder **Verstorben**), Daten, Anschrift, Telefonnummern und (bei Kindern und Jugendlichen) Klassenstufe und Schule.
3. Klicken Sie auf **Speichern**, um die persönlichen Angaben zu sichern.

Links im Profil stehen Foto, Name, Mitgliedsstatus, Kontaktdaten, Werte aus [individuellen Feldern](../settings/custom-fields.md) und der Haushalt der Person. Unterhalb des Haushalts zeigt **Hinzugefügt** das Datum, an dem der Datensatz angelegt wurde (nur für Personen, die seit Ende Oktober 2026 hinzugefügt wurden). Zum Ändern des Fotos klicken Sie auf das Foto. Unterhalb der Schaltfläche **Bearbeiten** stehen weitere Aktionen: **Workflow** (die Person zu einem [Workflow](../serving/workflows.md) hinzufügen), **Zusammenführen**, **Exportieren** und **Daten exportieren**.

Der Rest des Profils zeigt für jede Art verbundener Informationen einen Zusammenfassungsbereich:

- **Anwesenheit** — Zeigt, an welchen der letzten Wochen die Person teilgenommen hat, und ihre jüngsten Besuche. Mit **Alle Jahre** sehen Sie den vollständigen Besuchsverlauf mit Standort, Gottesdienst, Gottesdienstzeit, Gruppe und einer Spalte **Eingecheckt** mit der Uhrzeit des Check-ins am Kiosk (bei Besuchen ohne Kiosk-Check-in steht ein Strich). Mit **Drucken** drucken Sie ihn aus. Der Ausdruck trägt das Logo und den Namen Ihrer Gemeinde zentriert oben über dem Namen der Person. Für gemeindeweite Trends statt des Verlaufs einer einzelnen Person siehe [Anwesenheit erfassen](../attendance/tracking-attendance.md).
- **Spenden** — Zeigt die Gaben dieses Jahres, einschließlich Gaben an nicht absetzbare Fonds. Mit **Alle Jahre** sehen Sie den vollständigen [Spendenverlauf](../donations/recording-donations.md), mit **Gabe erfassen** tragen Sie eine neue ein. Haben Sie den [Datenschutz bei Spenden](../settings/church-settings.md#giving-privacy) aktiviert, bleiben Beträge verborgen, bis Sie auf **Spenden anzeigen** klicken.
- **Gruppen** — Listet die [Gruppenmitgliedschaften](../groups/group-members.md) der Person mit **Beigetreten** und dem Beitrittsdatum jeder Gruppe, sofern es hinterlegt ist.
- **Notizen** — Zeigt aktuelle Notizen zur Person (Seelsorge, Nachverfolgung usw.). Mit **Alle Notizen** lesen und ergänzen Sie Notizen. Jede Notiz zeigt, wer sie verfasst hat und wann sie veröffentlicht wurde. Zum Formatieren einer Notiz markieren Sie Text im Notizfeld und wählen im kleinen Popup **Fett**, **Kursiv**, **Aufzählungsliste** oder **Nummerierte Liste** (oder drücken Sie **Strg+B** / **Strg+I**, auf dem Mac **Cmd**). Nach der Veröffentlichung zeigt die Notiz die Formatierung. Beim Löschen einer Notiz müssen Sie zuerst bestätigen, da dies nicht rückgängig gemacht werden kann. Aktuelle Notizen aller Personen auf einen Blick finden Sie auf der Seite [Notizen](./notes.md).
- **Formulare** — Listet die Formulare der Person und ob sie eingereicht wurden (siehe unten unter [Mit Formularen arbeiten](#working-with-forms))
- **Anfragen & Anmeldungen** — Listet die Raum- und Ressourcen-[Veranstaltungsanfragen](../calendars/approvals.md) der Person (mit den angefragten Räumen oder Ressourcen und **Ausstehend**, **Genehmigt** oder **Abgelehnt**) sowie ihre [Veranstaltungsanmeldungen](../calendars/paid-registrations.md) (mit der Anzahl der angemeldeten Personen und **Angemeldet**, **Ausstehend**, **Auf der Warteliste** oder **Storniert**), die neuesten zuerst. Angezeigt werden die fünf letzten. Mit **Alle Anfragen** öffnen Sie die vollständige Liste. Anfragen sehen Sie, wenn Sie die Seite [Genehmigungen](../calendars/approvals.md) nutzen dürfen, Anmeldungen, wenn Sie Anmeldungen einsehen dürfen. Ohne eines von beidem ist der Bereich ausgeblendet

Wenn Sie eine dieser Gesamtansichten öffnen, klicken Sie oben auf den Link **Zurück zu** mit dem Namen der Person, um zum Profil zurückzukehren.

## Eine Person per E-Mail kontaktieren

Hat die Person eine E-Mail-Adresse hinterlegt, erscheint unterhalb ihrer Kontaktdaten links im Profil die Schaltfläche **E-Mail**.

1. Klicken Sie im Profil der Person auf **E-Mail**.
2. Ein Dialog **E-Mail** mit dem Namen der Person im Titel öffnet sich und zeigt unter **Senden an** die Adresse der Person.
3. Wählen Sie optional eine gespeicherte Vorlage unter **Vorlage laden (optional)**.
4. Geben Sie einen **Betreff** ein und verfassen Sie die Nachricht.
5. Klicken Sie auf **E-Mail senden**.

Um die Nachricht stattdessen in Ihrem eigenen E-Mail-Programm zu schreiben, klicken Sie auf **In meiner E-Mail-App öffnen**.

:::info
Das Versenden aus B1 unterliegt denselben Freigabe- und Tageslimits wie Gruppen-E-Mails. Wenn Ihre Gemeinde noch nicht freigegeben ist, bittet Sie der Dialog, eine Prüfung anzufordern. Bis dahin können Sie trotzdem auf **In meiner E-Mail-App öffnen** klicken. Siehe [Gruppen-E-Mails für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Benutzende ohne Berechtigung, Gruppenmitglieder zu bearbeiten, gelangen beim Klick auf **E-Mail** direkt in ihre E-Mail-App.
:::

## Mit Formularen arbeiten {#working-with-forms}

Sie können individuelle Formulare direkt aus dem Profil einer Person ausfüllen. Es handelt sich um benutzerdefinierte Formulare, die Sie nach der Anleitung [Formulare erstellen](../forms/creating-forms.md) anlegen können.

1. Suchen Sie im Profil der Person den Bereich **Formulare**. Er listet jedes Formular und ob es **Eingereicht** oder **Nicht eingereicht** ist.
2. Klicken Sie auf den Namen eines Formulars, um es zu öffnen (oder auf **Alle Formulare**, um die vollständige Liste zu sehen).
3. Klicken Sie beim Formular auf das **Bearbeiten-Symbol** (Stift), ergänzen Sie die Angaben und klicken Sie auf **Speichern**.

Sobald ein Formular eingereicht ist, klicken Sie daneben auf das **Druck-Symbol**, um die ausgefüllten Antworten dieser Person zu drucken. Hat die Person eine einzige Einreichung des Formulars, zeigt das Formular oberhalb der Antworten **Eingereicht** mit dem Datum an.

Wenn eine Einreichung bei der falschen Person gelandet ist, klicken Sie daneben auf das Symbol **Person ändern** (zwei Pfeile), um sie einer anderen Person zuzuordnen oder die Verknüpfung zu lösen. Siehe [Person einer Einreichung ändern](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn Sie ein eigenständiges Formular brauchen (etwa für eine Veranstaltungsanmeldung), lesen Sie in der Anleitung zu Formularen die Option [Eigenständiges Formular](../forms/creating-forms.md).
:::

:::tip
Wenn Sie nur ein oder zwei zusätzliche Angaben zu Personen erfassen müssen, etwa ein Datum, eine Zahl oder eine Ja/Nein-Antwort, verwenden Sie statt eines Formulars [Individuelle Felder](../settings/custom-fields.md). Sie sind schneller auszufüllen und lassen sich direkt in der erweiterten Suche durchsuchen.
:::

## Haushalte verwalten {#managing-households}

Mit Haushalten verknüpfen Sie Familienmitglieder miteinander. Das ist besonders beim [Check-in](../attendance/check-in.md) nützlich, weil ein Elternteil alle Kinder gemeinsam einchecken kann.

1. Klicken Sie im Profil einer Person links neben der Überschrift **Haushalt** auf **Bearbeiten**.
2. Der Haushalteditor öffnet sich. Wählen Sie die **Haushaltsrolle** der aktuellen Person aus (z. B. Haupt, Partner/in, Kind oder Sonstige).
3. Klicken Sie auf das Symbol **Hinzufügen**, um ein weiteres Haushaltsmitglied hinzuzufügen.
4. Geben Sie unter **Haushaltsmitglied hinzufügen** den Namen der Person in das Suchfeld ein und drücken Sie **Enter** oder klicken Sie auf das Suchsymbol. (Bevor Sie etwas eingeben, wird eine kurze Liste **Zuletzt verwendete Personen** angezeigt. Das sind die Personen, die Sie zuletzt bei einer Personensuche ausgewählt haben, gefolgt von den neuesten Personen in B1.)
5. Sobald die Person in den Ergebnissen erscheint, klicken Sie auf ihren Namen oder das Hinzufügen-Symbol daneben.
6. Wählen Sie ihre Haushaltsrolle und klicken Sie auf **Speichern**, um die Haushaltszuordnung abzuschließen.

Ist die Person noch nicht in B1, klicken Sie stattdessen unter der Suche auf **Neue Person hinzufügen**. Der Dialog fragt neben Name, Anrede, E-Mail-Adresse und Mobilnummer auch nach ihrer **Haushaltsrolle** (Haupt, Partner/in, Kind oder Sonstige). Die neue Person wird angelegt und mit dieser Rolle in den Haushalt aufgenommen. Klicken Sie auf **Speichern**, um abzuschließen.

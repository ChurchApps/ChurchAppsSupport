---
title: "Personen hinzufügen"
description: "Fügen Sie in B1 Admin eine Person zu Ihrer Gemeindedatenbank hinzu, tragen Sie ihre Daten ein und verknüpfen Sie Familienmitglieder zu Haushalten für Check-in und Berichte."
---

# Personen hinzufügen {#adding-people}

<div class="article-intro">

Der Bereich Personen ist das Fundament von B1 Admin -- er ist die Mitgliederdatenbank Ihrer Gemeinde. Alle anderen Funktionen (Gruppen, Anwesenheit, Spenden, Formulare) sind mit Personendatensätzen verknüpft. Diese Anleitung zeigt Ihnen, wie Sie jemanden zu Ihrer Datenbank hinzufügen, dessen Daten bearbeiten und Familienmitglieder zu Haushalten verknüpfen.

</div>

## Schulungsvideo {#training-video}

<YouTube id="GtsczJ8JPio" title="Personen und Haushalte in B1 hinzufügen" next="Ihre Personendatenbank in B1 importieren" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen zu verwalten. Falls Sie sich über Ihre Zugriffsstufe nicht sicher sind, lesen Sie [Rollen & Berechtigungen](roles-permissions.md).
- Wenn Sie mehr als eine Handvoll Personen hinzufügen möchten, nutzen Sie besser das Werkzeug [CSV-Import](importing-data.md).

</div>

## Eine Person hinzufügen {#adding-a-person}

1. Rufen Sie das Dashboard von B1.church Admin auf.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Personen**.
3. Klicken Sie in der Seitenkopfzeile auf die Schaltfläche **Person hinzufügen**. Die Seite scrollt zum Formular **Neue Person hinzufügen** unter dem Verzeichnis.
4. Tragen Sie **Vorname** und **Nachname** der Person ein (beide sind erforderlich). Optional können Sie eine **Anrede**, eine **E-Mail** und ein **Mobiltelefon** angeben und dann auf **Hinzufügen** klicken (oder die **Eingabetaste** drücken).

B1 legt für die Person einen neuen Haushalt an, der nach ihrem Nachnamen benannt wird.

Die Profilseite der Person wird geöffnet, damit Sie weitere Angaben ergänzen können.

:::tip
Wenn Sie von einem anderen Gemeindeverwaltungssystem migrieren, können Sie mit der Funktion [Daten importieren](importing-data.md) Ihr gesamtes Verzeichnis aus einer CSV-Datei übernehmen -- das geht deutlich schneller, als Personen einzeln anzulegen.
:::

### Warnungen bei Dubletten {#duplicate-warnings}

Wenn Sie im Formular **Neue Person hinzufügen** eine E-Mail-Adresse eingeben, prüft B1 vor dem Speichern auf Dubletten. Stimmt die E-Mail-Adresse (oder beim Anlegen einer Person über das vollständige Bearbeitungsformular die Telefonnummer bzw. Vorname + Nachname + Geburtsdatum) mit einer Person in Ihrer Datenbank überein, erscheint vor dem Speichern des neuen Datensatzes ein Dialog **Mögliche Dublette**. Er listet jede passende Person mit E-Mail-Adresse, Telefonnummer und Geburtsdatum auf, damit Sie vergleichen können.

- Klicken Sie neben einem Treffer auf **Vorhandene verwenden**, um stattdessen dessen Datensatz zu verwenden und keinen neuen anzulegen.
- Klicken Sie auf **Trotzdem anlegen**, um die neue Person trotz möglicher Übereinstimmung hinzuzufügen.

Dubletten werden nur geprüft, wenn Sie eine völlig neue Person anlegen -- das Bearbeiten eines bestehenden Datensatzes löst die Prüfung nie aus. Sie verhindert nur neue Dubletten; sie führt keine bereits vorhandenen Datensätze zusammen.

## Details bearbeiten {#editing-details}

1. Klicken Sie auf der Profilseite der Person links unterhalb des Abschnitts **Haushalt** auf die Schaltfläche **Bearbeiten**.
2. Ergänzen Sie im Formular **Persönliche Angaben** weitere Angaben wie eine **Anrede** (wählen Sie Mr, Mrs, Miss, Ms, Dr, Prof, Rev oder Pastor aus der Liste oder geben Sie eine eigene Anrede mit bis zu 10 Zeichen ein), zweiten Vornamen, Spitznamen, **Hinweise für das Namensschild** (werden auf den Check-in-Namensschildern gedruckt und im Profil als Warnhinweis angezeigt), **Spendernummer**, Mitgliedschaftsstatus (**Besucher**, **Gast**, **Regelmäßiger Teilnehmer**, **Mitglied**, **Mitarbeitend**, **Inaktiv** oder **Verstorben**), Geschlecht, Familienstand, Geburtsdatum und Hochzeitstag, Standort, Adresse, Telefonnummern mit Durchwahl und (bei Kindern und Schülern) Klasse und Schule. Aktivieren Sie **Mich aus dem Mitgliederverzeichnis ausblenden**, damit die Person im [gedruckten Verzeichnis](./print-directory.md) und im Mitgliederverzeichnis der App nicht erscheint. Alle [individuellen Felder](../settings/custom-fields.md) finden Sie unter **Eigene Felder**.
3. Klicken Sie auf **Speichern**, um die persönlichen Angaben zu speichern, oder auf **Abbrechen**, um das Formular ohne Speichern zu schließen.

Wenn Sie die Adresse einer Person ändern, die einen Haushalt mit anderen teilt, fragt B1, ob die neue Adresse für den gesamten Haushalt übernommen werden soll. Das Formular hat außerdem eine Schaltfläche **Löschen** (zum Löschen der Person) und einen Bereich **Datenverwaltung** zum Exportieren oder Anonymisieren der Daten der Person (siehe [Datensicherheit](../settings/data-security.md#using-the-data-management-tools)).

Die linke Seite des Profils zeigt Foto, Name, Alter, Geschlecht, Familienstand, Standort, Mitgliedschaftsstatus, Kontaktdaten, Werte aller [individuellen Felder](../settings/custom-fields.md) und den Haushalt der Person. Markierungen unter dem Namen zeigen an, ob die Person **Hat Anmeldung** (ein B1-Konto besitzt), **Im Verzeichnis ausgeblendet** ist oder Notizen für das Namensschild hat. Oberhalb des Haushalts zeigt **Hinzugefügt** das Datum, an dem der Datensatz angelegt wurde (nur für Personen, die seit Ende Oktober 2026 hinzugefügt wurden). Klicken Sie auf das Foto, um es zu ändern. Unter dem Haushalt befinden sich die Schaltflächen **Bearbeiten**, **E-Mail** und **SMS** (siehe unten) sowie einige weitere Aktionen: **Workflow** (fügt die Person einem [Workflow](../serving/workflows.md) hinzu), **Zusammenführen**, **Exportieren** und **Daten exportieren**. Gehört die Person zu einem Haushalt, listet der Bereich **Abholung** alle Personen auf, die Kinder beim [Check-in](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people) abholen dürfen.

Der restliche Teil des Profils enthält einen Zusammenfassungsbereich für jede Art verwandter Informationen:

- **Anwesenheit** -- Zeigt, an welchen der letzten Wochen die Person teilgenommen hat, und ihre jüngsten Besuche. Klicken Sie auf **Alle Jahre** für die vollständige Besuchshistorie mit Standort, Gottesdienst, Gottesdienstzeit, Gruppe und einer Spalte **Eingecheckt** mit der Check-in-Zeit am Kiosk (für Besuche ohne Kiosk-Check-in wird ein Strich angezeigt), oder auf **Drucken**, um sie zu drucken (der Ausdruck zeigt oben mittig das Logo und den Namen Ihrer Gemeinde über dem Namen der Person). Für gemeindeweite Trends statt der Historie einer einzelnen Person siehe [Anwesenheit erfassen](../attendance/tracking-attendance.md)
- **Spenden** -- Zeigt die Spenden dieses Jahres, einschließlich Spenden für nicht steuerlich absetzbare Fonds. Klicken Sie auf **Alle Jahre** für die vollständige [Spendenhistorie](../donations/recording-donations.md) oder auf **Gabe erfassen**, um eine neue Spende zu erfassen. Hat Ihre Gemeinde den [Spendendatenschutz](../settings/church-settings.md#giving-privacy) aktiviert, bleiben die Beträge verborgen, bis Sie auf **Spenden anzeigen** klicken
- **Gruppen** -- Listet die [Gruppenmitgliedschaften](../groups/group-members.md) der Person auf, mit **Beigetreten** und dem Beitrittsdatum jeder Gruppe, sofern es erfasst ist
- **Notizen** -- Zeigt aktuelle Notizen zur Person (Seelsorge, Nachfassaktionen usw.). Klicken Sie auf **Alle Notizen**, um Notizen zu lesen und hinzuzufügen. Jede Notiz zeigt, wer sie verfasst hat, sowie Datum und Uhrzeit der Veröffentlichung. Um eine Notiz zu formatieren, klicken Sie in das Notizfeld -- darunter erscheint dann eine Reihe mit den Schaltflächen **Fett**, **Kursiv**, **Aufzählungsliste** und **Nummerierte Liste**, solange das Feld ausgewählt ist. Markieren Sie anschließend den Text und klicken Sie auf eine Schaltfläche (oder drücken Sie **Strg+B** / **Strg+I**, auf dem Mac **Cmd**). In einer Liste startet die **Eingabetaste** den nächsten Aufzählungspunkt oder die nächste Nummer; drücken Sie die **Eingabetaste** in einem leeren Listenpunkt, endet die Liste. Die Notiz zeigt nach dem Veröffentlichen ihre Formatierung einschließlich Aufzählungspunkten und Nummern. Beim Löschen einer Notiz werden Sie zuerst um Bestätigung gebeten, da sich dies nicht rückgängig machen lässt. Um die neuesten Notizen aller Personen auf einmal zu sehen, nutzen Sie die Seite [Notizen](./notes.md)
- **Formulare** -- Listet die Formulare der Person und ob jedes eingereicht wurde (siehe unten [Mit Formularen arbeiten](#working-with-forms))
- **Anfragen & Anmeldungen** -- Listet die Raum- und Ressourcenanfragen für [Veranstaltungen](../calendars/approvals.md) der Person (mit der angegebenen Beschreibung, den angefragten Räumen oder Ressourcen sowie **Ausstehend**, **Genehmigt** oder **Abgelehnt**) und ihre [Veranstaltungsanmeldungen](../calendars/paid-registrations.md) (mit der Anzahl der angemeldeten Personen und **Angemeldet**, **Ausstehend**, **Auf der Warteliste** oder **Storniert**), neueste zuerst. Die letzten fünf werden angezeigt; klicken Sie auf **Alle Anfragen** für die vollständige Liste. Veranstaltungsanfragen sehen Sie, wenn Sie die Seite [Genehmigungen](../calendars/approvals.md) nutzen dürfen, und Anmeldungen, wenn Sie Anmeldungen einsehen dürfen; ohne eines von beiden ist der Bereich ausgeblendet

Wenn Sie eine dieser vollständigen Ansichten öffnen, klicken Sie oben auf den Link **Zurück zu** mit dem Namen der Person, um zum Profil zurückzukehren.

## Eine Person per E-Mail kontaktieren {#emailing-a-person}

Hat die Person eine E-Mail-Adresse hinterlegt, erscheint links im Profil unterhalb des Haushalts neben **Bearbeiten** eine Schaltfläche **E-Mail**.

1. Klicken Sie im Profil der Person auf **E-Mail**.
2. Es öffnet sich ein Dialog **E-Mail**, dessen Titel den Namen der Person trägt und in dem unter **Empfänger** die Adresse der Person angezeigt wird.
3. Wählen Sie optional eine gespeicherte Vorlage unter **Vorlage laden (optional)**.
4. Geben Sie einen **Betreff** ein und verfassen Sie die Nachricht.
5. Klicken Sie auf **E-Mail senden**.

Um die Nachricht stattdessen in Ihrem eigenen E-Mail-Programm zu schreiben, klicken Sie auf **In meiner E-Mail-App öffnen**.

:::info
Für das Senden aus B1 gelten dieselben Genehmigungs- und Tageslimits wie für Gruppen-E-Mails. Wurde Ihre Gemeinde noch nicht freigegeben, bittet Sie der Dialog, eine Prüfung anzufordern -- bis dahin können Sie weiterhin auf **In meiner E-Mail-App öffnen** klicken. Siehe [Gruppen-E-Mail für Ihre Gemeinde aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Benutzer ohne Berechtigung, Gruppenmitglieder zu bearbeiten, gelangen beim Klick auf **E-Mail** direkt in ihr E-Mail-Programm.
:::

## Eine Person per SMS kontaktieren {#texting-a-person}

Ist bei Ihrer Gemeinde ein [SMS-Anbieter](../settings/church-settings.md#texting) verbunden, Sie dürfen SMS versenden und die Person hat eine Mobilnummer hinterlegt, erscheint neben **E-Mail** eine Schaltfläche **SMS**. Klicken Sie darauf, geben Sie Ihre **Nachricht** ein und klicken Sie auf **Senden**. Der Dialog zeigt die Nummer, an die die SMS geht. Wie SMS funktionieren, erfahren Sie unter [Gruppenmitglieder per SMS anschreiben](../groups/group-members.md#texting-group-members).

## Mit Formularen arbeiten {#working-with-forms}

Sie können individuelle Formulare direkt aus dem Profil einer Person ausfüllen. Dies sind benutzerdefinierte Formulare, die Sie nach der Anleitung [Formulare erstellen](../forms/creating-forms.md) anlegen können.

1. Suchen Sie im Profil der Person den Bereich **Formulare**. Er listet jedes Formular auf und zeigt, ob es **Eingereicht** oder **Nicht eingereicht** ist.
2. Klicken Sie auf den Namen eines Formulars, um es zu öffnen (oder auf **Alle Formulare**, um die vollständige Liste zu sehen).
3. Klicken Sie auf das **Bearbeitungssymbol** (Stift) des Formulars, füllen Sie die Angaben aus und klicken Sie auf **Speichern**.

Sobald ein Formular eingereicht ist, klicken Sie auf das **Druck-Symbol** daneben, um die ausgefüllten Antworten der Person zu drucken. Hat die Person ein einziges Einreichen eines Formulars, zeigt das Formular oberhalb der Antworten **Eingereicht** mit dem Datum an.

Wurde eine Einreichung der falschen Person zugeordnet, klicken Sie auf das Symbol **Person ändern** (zwei Pfeile) daneben, um sie einer anderen Person zuzuweisen oder die Verknüpfung zu lösen. Siehe [Person einer Einreichung ändern](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn Sie ein eigenständiges Formular brauchen (etwa für eine Veranstaltungsanmeldung), lesen Sie die Option [Eigenständiges Formular](../forms/creating-forms.md) im Formular-Leitfaden.
:::

:::tip
Wenn Sie nur ein oder zwei zusätzliche Angaben zu Personen erfassen möchten -- ein Datum, eine Zahl oder eine Ja-/Nein-Antwort -- nutzen Sie stattdessen [Individuelle Felder](../settings/custom-fields.md) statt eines Formulars. Sie sind schneller ausgefüllt und können direkt in der erweiterten Suche durchsucht werden.
:::

## Haushalte verwalten {#managing-households}

Mit Haushalten verknüpfen Sie Familienmitglieder miteinander. Das ist besonders nützlich für den [Check-in](../attendance/check-in.md), bei dem ein Elternteil alle seine Kinder auf einmal einchecken kann.

1. Klicken Sie im Profil einer Person links neben der Überschrift **Haushalt** auf **Bearbeiten**.
2. Der Haushaltseditor öffnet sich. Wählen Sie die **Haushaltsrolle** der aktuellen Person aus (z. B. Head, Spouse, Child oder Other).
3. Klicken Sie auf das Symbol **Hinzufügen**, um ein weiteres Haushaltsmitglied hinzuzufügen.
4. Geben Sie unter **Haushaltsmitglied hinzufügen** den Namen der Person in das Suchfeld ein und drücken Sie die **Eingabetaste** oder klicken Sie auf das Suchsymbol. (Bevor Sie etwas eintippen, wird eine kurze Liste **Zuletzt verwendete Personen** angezeigt -- die Personen, die Sie zuletzt in einer Personensuche ausgewählt haben, und danach die neuesten Personen in B1.)
5. Sobald die Person in den Ergebnissen erscheint, klicken Sie auf ihren Namen oder auf das Symbol Hinzufügen daneben.
6. Wählen Sie ihre Haushaltsrolle und klicken Sie auf **Speichern**, um die Haushaltszuordnung abzuschließen.

Ist die Person noch nicht in B1 erfasst, klicken Sie stattdessen unter der Suche auf **Neue Person hinzufügen**. Der Dialog fragt neben Name, Anrede, E-Mail-Adresse und Mobiltelefon auch nach ihrer **Haushaltsrolle** (Head, Spouse, Child oder Other). Die neue Person wird angelegt und mit dieser Rolle in diesen Haushalt aufgenommen; klicken Sie auf **Speichern**, um den Vorgang abzuschließen.

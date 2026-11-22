---
title: "Personen hinzufügen"
description: "Fügen Sie in B1 Admin eine Person zur Datenbank Ihrer Gemeinde hinzu, tragen Sie ihre Angaben ein und verknüpfen Sie Familienmitglieder zu Haushalten für Check-in und Berichte."
---

# Personen hinzufügen

<div class="article-intro">

Der Bereich Personen ist das Fundament von B1 Admin – er ist die Mitgliederdatenbank Ihrer Gemeinde. Alle anderen Funktionen (Gruppen, Anwesenheit, Spenden, Formulare) beziehen sich auf die Personendatensätze. Diese Anleitung führt Sie durch das Hinzufügen einer Person zu Ihrer Datenbank, das Bearbeiten ihrer Angaben und das Verknüpfen von Familienmitgliedern zu Haushalten.

</div>

## Schulungsvideo {#training-video}

<YouTube id="GtsczJ8JPio" title="Personen und Haushalte in B1 hinzufügen" next="Ihre Personendatenbank in B1 importieren" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen ein aktives B1-Admin-Konto mit der Berechtigung, Personen zu verwalten. Siehe [Rollen & Berechtigungen](roles-permissions.md), wenn Sie sich bei Ihrer Zugriffsstufe nicht sicher sind.
- Wenn Sie mehr als eine Handvoll Personen hinzufügen möchten, sollten Sie stattdessen das Werkzeug [CSV-Import](importing-data.md) verwenden.

</div>

## Eine Person hinzufügen {#adding-a-person}

1. Öffnen Sie das Dashboard von B1.church Admin.
2. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Personen** auf und klicken Sie auf **Personen**.
3. Klicken Sie im Seitenkopf auf die Schaltfläche **Person hinzufügen**. Die Seite scrollt zum Formular **Neue Person hinzufügen** unterhalb des Verzeichnisses.
4. Tragen Sie **Vorname** und **Nachname** der Person ein (beide sind erforderlich). Optional können Sie **Anrede**, **E-Mail** und **Mobiltelefon** ergänzen und dann auf **Hinzufügen** klicken (oder die **Eingabetaste** drücken).

B1 legt für die Person einen neuen Haushalt an, der nach dem Nachnamen benannt wird.

Die Profilseite der Person öffnet sich, sodass Sie weitere Angaben ergänzen können.

:::tip
Wenn Sie von einem anderen System zur Gemeindeverwaltung wechseln, können Sie mit der Funktion [Daten importieren](importing-data.md) Ihr gesamtes Verzeichnis aus einer CSV-Datei übernehmen – das ist viel schneller, als Personen einzeln hinzuzufügen.
:::

### Warnungen bei Dubletten {#duplicate-warnings}

Wenn Sie im Formular **Neue Person hinzufügen** eine E-Mail-Adresse eingeben, prüft B1 vor dem Speichern auf Dubletten. Stimmt die E-Mail-Adresse (oder, wenn Sie die Person über das vollständige Bearbeitungsformular anlegen, die Telefonnummer oder die Kombination aus Vorname, Nachname und Geburtsdatum) mit jemandem in Ihrer Datenbank überein, erscheint vor dem Speichern des neuen Datensatzes ein Dialog **Mögliche Dublette**. Er listet jede passende Person mit E-Mail-Adresse, Telefonnummer und Geburtsdatum auf, damit Sie vergleichen können.

- Klicken Sie neben einem Treffer auf **Vorhandene verwenden**, um stattdessen den Datensatz dieser Person zu verwenden und keinen neuen anzulegen.
- Klicken Sie auf **Trotzdem anlegen**, um die neue Person hinzuzufügen, obwohl eine mögliche Übereinstimmung gefunden wurde.

Dubletten werden nur geprüft, wenn Sie eine völlig neue Person anlegen – das Bearbeiten eines vorhandenen Datensatzes löst die Prüfung nie aus. Die Prüfung verhindert nur neue Dubletten; sie führt keine zwei bereits bestehenden Datensätze zusammen.

## Angaben bearbeiten {#editing-details}

1. Klicken Sie auf der Profilseite der Person links unterhalb des Abschnitts **Haushalt** auf die Schaltfläche **Bearbeiten**.
2. Ergänzen Sie im Formular **Persönliche Angaben** weitere Informationen, etwa die **Anrede** (wählen Sie Herr, Frau, Fräulein, Ms, Dr., Prof., Pfr. oder Pastor aus der Liste oder geben Sie eine eigene Anrede ein, bis zu 10 Zeichen), zweiten Vornamen, Spitznamen, **Hinweise für das Namensschild** (werden auf Namensschildern beim Check-in gedruckt und als Warnmarkierung im Profil angezeigt), **Spendernummer**, Mitgliedschaftsstatus (**Besucher**, **Gast**, **Regelmäßiger Teilnehmer**, **Mitglied**, **Mitarbeitend**, **Inaktiv** oder **Verstorben**), Geschlecht, Familienstand, Geburtsdatum und Hochzeitstag, Standort, Adresse, Telefonnummern mit Durchwahl sowie (für Kinder und Jugendliche) Klassenstufe und Schule. Aktivieren Sie **Mich aus dem Mitgliederverzeichnis ausblenden**, um die Person aus dem [gedruckten Verzeichnis](./print-directory.md) und dem Mitgliederverzeichnis der App herauszuhalten. Alle [eigenen Felder](../settings/custom-fields.md) erscheinen unter **Eigene Felder**.
3. Klicken Sie auf **Speichern**, um die persönlichen Angaben zu sichern, oder auf **Abbrechen**, um das Formular ohne Speichern zu schließen.

Wenn Sie die Adresse einer Person ändern, die mit anderen einen Haushalt teilt, fragt B1, ob die neue Adresse für den gesamten Haushalt übernommen werden soll. Das Formular hat außerdem eine Schaltfläche **Löschen** (um die Person zu löschen) und einen Abschnitt **Datenverwaltung** zum Exportieren oder Anonymisieren der Daten der Person (siehe [Datensicherheit](../settings/data-security.md#using-the-data-management-tools)).

Die linke Seite des Profils zeigt Foto, Name, Alter, Geschlecht, Familienstand, Standort, Mitgliedschaftsstatus, Kontaktdaten, Werte aus [eigenen Feldern](../settings/custom-fields.md) und den Haushalt der Person. Markierungen unter dem Namen zeigen, ob die Person **Hat Anmeldung** (ein B1-Konto besitzt), **Im Verzeichnis ausgeblendet** ist oder Hinweise für das Namensschild hat. Über dem Haushalt zeigt **Hinzugefügt** das Datum, an dem der Datensatz angelegt wurde (nur für Personen, die seit Ende Oktober 2026 hinzugefügt wurden). Klicken Sie auf das Foto, um es zu ändern. Unter dem Haushalt befinden sich die Schaltflächen **Bearbeiten**, **E-Mail** und **SMS** (siehe unten) sowie weitere Aktionen: **Workflow** (die Person einem [Workflow](../serving/workflows.md) hinzufügen), **Zusammenführen**, **Exportieren** und **Daten exportieren**. Gehört die Person zu einem Haushalt, listet der Abschnitt **Abholung** die Personen auf, die beim [Check-in](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people) Kinder abholen dürfen.

Der Rest des Profils zeigt für jede Art verwandter Informationen einen Zusammenfassungsabschnitt:

- **Anwesenheit** -- Zeigt, an welchen der letzten Wochen die Person teilgenommen hat, und ihre letzten Besuche. Klicken Sie auf **Alle Jahre** für den vollständigen Besuchsverlauf mit Standort, Gottesdienst, Gottesdienstzeit, Gruppe und einer Spalte **Eingecheckt** mit der Check-in-Zeit am Terminal (ein Strich bei Besuchen ohne Check-in am Terminal), oder auf **Drucken**, um den Verlauf zu drucken (der Ausdruck zeigt das Logo und den Namen Ihrer Gemeinde zentriert oben, über dem Namen der Person). Für gemeindeweite Trends statt des Verlaufs einer einzelnen Person siehe [Anwesenheit verfolgen](../attendance/tracking-attendance.md)
- **Spenden** -- Zeigt die Gaben dieses Jahres, einschließlich Gaben an nicht steuerlich absetzbare Fonds. Klicken Sie auf **Alle Jahre** für die vollständige [Spendenhistorie](../donations/recording-donations.md) oder auf **Gabe erfassen**, um eine neue zu erfassen. Hat Ihre Gemeinde den [Spendenschutz](../settings/church-settings.md#giving-privacy) aktiviert, bleiben die Beträge verborgen, bis Sie auf **Spenden anzeigen** klicken
- **Gruppen** -- Listet die [Gruppenmitgliedschaften](../groups/group-members.md) der Person auf, mit **Beigetreten** und dem Beitrittsdatum jeder Gruppe, sofern es erfasst ist
- **Notizen** -- Zeigt aktuelle Notizen zur Person (Seelsorge, Nachfassen usw.). Klicken Sie auf **Alle Notizen**, um Notizen zu lesen und hinzuzufügen. Jede Notiz zeigt, wer sie verfasst hat, sowie Datum und Uhrzeit. Um eine Notiz zu formatieren, markieren Sie Text im Notizfeld und wählen Sie im kleinen Menü **Fett**, **Kursiv**, **Aufzählungsliste** oder **Nummerierte Liste** (oder drücken Sie **Strg+B** / **Strg+I**, auf dem Mac **Cmd**); die Notiz zeigt die Formatierung nach dem Speichern an. Beim Löschen einer Notiz wird zuerst eine Bestätigung verlangt, weil sie nicht rückgängig gemacht werden kann. Um aktuelle Notizen aller Personen gleichzeitig zu sehen, nutzen Sie die Seite [Notizen](./notes.md)
- **Formulare** -- Listet die Formulare der Person auf und ob jedes davon eingereicht wurde (siehe unten [Mit Formularen arbeiten](#working-with-forms))
- **Anfragen & Anmeldungen** -- Listet die Raum- und Ressourcenanfragen der Person für [Veranstaltungen](../calendars/approvals.md) (mit den angefragten Räumen bzw. Ressourcen und **Ausstehend**, **Genehmigt** oder **Abgelehnt**) sowie ihre [Veranstaltungsanmeldungen](../calendars/paid-registrations.md) (mit der Anzahl angemeldeter Personen und **Angemeldet**, **Ausstehend**, **Auf der Warteliste** oder **Storniert**), die neuesten zuerst. Es werden die fünf letzten angezeigt; klicken Sie auf **Alle Anfragen** für die vollständige Liste. Sie sehen Veranstaltungsanfragen, wenn Sie die Seite [Genehmigungen](../calendars/approvals.md) nutzen können, und Anmeldungen, wenn Sie Anmeldungen einsehen dürfen; ohne eines von beidem ist der Abschnitt ausgeblendet

Wenn Sie eine dieser vollständigen Ansichten öffnen, klicken Sie oben auf den Link **Zurück zu** mit dem Namen der Person, um zum Profil zurückzukehren.

## Eine Person per E-Mail kontaktieren {#emailing-a-person}

Hat die Person eine E-Mail-Adresse hinterlegt, erscheint neben **Bearbeiten** eine Schaltfläche **E-Mail**, unterhalb des Haushalts links im Profil.

1. Klicken Sie auf dem Profil der Person auf **E-Mail**.
2. Ein Dialog **E-Mail**, betitelt mit dem Namen der Person, öffnet sich und zeigt unter **Empfänger** die Adresse der Person.
3. Wählen Sie optional eine gespeicherte Vorlage unter **Vorlage laden (optional)**.
4. Geben Sie einen **Betreff** ein und verfassen Sie die Nachricht.
5. Klicken Sie auf **E-Mail senden**.

Um die Nachricht stattdessen in Ihrem eigenen E-Mail-Programm zu schreiben, klicken Sie auf **In meiner E-Mail-App öffnen**.

:::info
Der Versand aus B1 unterliegt denselben Genehmigungs- und Tageslimits wie die E-Mail an Gruppen. Hat Ihre Gemeinde noch keine Genehmigung erhalten, bittet der Dialog Sie, eine Prüfung anzufordern – bis dahin können Sie trotzdem auf **In meiner E-Mail-App öffnen** klicken. Siehe [E-Mail an Gruppen für Ihre Gemeinde aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church). Benutzer ohne Berechtigung, Gruppenmitglieder zu bearbeiten, gelangen beim Klick auf **E-Mail** direkt in ihr E-Mail-Programm.
:::

## Eine Person per SMS kontaktieren {#texting-a-person}

Ist beim Anbieter für Textnachrichten Ihrer Gemeinde ein [Anbieter für Textnachrichten](../settings/church-settings.md#texting) verbunden, Sie berechtigt sind, SMS zu senden, und die Person eine Mobilnummer hat, erscheint neben **E-Mail** eine Schaltfläche **SMS**. Klicken Sie darauf, tippen Sie Ihre **Nachricht** ein und klicken Sie auf **Senden**. Der Dialog zeigt die Nummer, an die die SMS geht. Wie SMS funktionieren, erfahren Sie unter [Gruppenmitglieder per SMS kontaktieren](../groups/group-members.md#texting-group-members).

### SMS-Erinnerungen {#text-reminders}

Aufgaben-, Veranstaltungs- und Dienst-Erinnerungen werden nur per SMS an Personen verschickt, die Textnachrichten aktiviert haben. Mit demselben Anbieter für Textnachrichten, derselben Berechtigung und einer Mobilnummer zeigt der Datensatz der Person unter ihrer Mobilnummer **SMS-Erinnerungen** mit **Ein** oder **Aus**. Klicken Sie auf **Einschalten**, um Erinnerungen per SMS zu senden, oder auf **Ausschalten**, um sie zu beenden. Dies ist derselbe Schalter wie **Textnachrichten** in den eigenen [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) der Person, daher kann jeder der beiden ihn ändern. Wer auf die Texte Ihrer Gemeinde mit STOP geantwortet hat, erhält auch bei eingeschalteten **SMS-Erinnerungen** keine Erinnerungs-SMS.

## Mit Formularen arbeiten {#working-with-forms}

Sie können eigene Formulare direkt auf dem Profil einer Person ausfüllen. Dies sind benutzerdefinierte Formulare, die Sie nach der Anleitung [Formulare erstellen](../forms/creating-forms.md) anlegen können.

1. Suchen Sie auf dem Profil der Person den Abschnitt **Formulare**. Er listet jedes Formular und ob es **Eingereicht** oder **Nicht eingereicht** ist.
2. Klicken Sie auf den Namen eines Formulars, um es zu öffnen (oder auf **Alle Formulare**, um die vollständige Liste zu sehen).
3. Klicken Sie auf das **Bearbeiten-Symbol** (Stift) beim Formular, füllen Sie die Angaben aus und klicken Sie auf **Speichern**.

Sobald ein Formular eingereicht ist, klicken Sie auf das **Druck-Symbol** daneben, um die ausgefüllten Antworten dieser Person zu drucken. Hat die Person genau eine Einsendung eines Formulars, zeigt das Formular über den Antworten **Eingereicht** mit dem Datum an.

Landete eine Einsendung bei der falschen Person, klicken Sie daneben auf das Symbol **Person ändern** (zwei Pfeile), um sie einer anderen Person zuzuordnen oder die Verknüpfung zu lösen. Siehe [Die Person einer Einsendung ändern](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulare, die mit dem Profil einer Person verknüpft sind, verwenden den Formulartyp **Personen**. Wenn Sie ein eigenständiges Formular brauchen (etwa für eine Veranstaltungsanmeldung), finden Sie die Option [Eigenständiges Formular](../forms/creating-forms.md) in der Anleitung zu Formularen.
:::

:::tip
Wenn Sie nur ein oder zwei zusätzliche Angaben zu Personen erfassen möchten – ein Datum, eine Zahl, eine Ja/Nein-Antwort –, verwenden Sie stattdessen [Eigene Felder](../settings/custom-fields.md) statt eines Formulars. Sie sind schneller auszufüllen und lassen sich direkt in der erweiterten Suche durchsuchen.
:::

## Haushalte verwalten {#managing-households}

Haushalte verknüpfen Familienmitglieder miteinander. Das ist besonders nützlich für den [Check-in](../attendance/check-in.md), bei dem ein Elternteil alle seine Kinder auf einmal einchecken kann.

1. Klicken Sie auf dem Profil einer Person links neben der Überschrift **Haushalt** auf **Bearbeiten**.
2. Der Haushalt-Editor öffnet sich. Wählen Sie die **Haushaltsrolle** der aktuellen Person (z. B. Haupt, Partner/in, Kind, Sonstige).
3. Klicken Sie auf das Symbol **Hinzufügen**, um ein weiteres Haushaltsmitglied hinzuzufügen.
4. Tippen Sie unter **Haushaltsmitglied hinzufügen** den Namen der Person in das Suchfeld und drücken Sie die **Eingabetaste** oder klicken Sie auf das Lupensymbol. (Bevor Sie tippen, wird eine kurze Liste **Zuletzt verwendete Personen** angezeigt – die Personen, die Sie zuletzt bei einer Personensuche gewählt haben, danach die neuesten Personen in B1.)
5. Sobald die Person in den Ergebnissen erscheint, klicken Sie auf ihren Namen oder das Hinzufügen-Symbol daneben.
6. Wählen Sie ihre Haushaltsrolle und klicken Sie auf **Speichern**, um die Haushaltszuordnung abzuschließen.

Ist die Person noch nicht in B1, klicken Sie stattdessen unter der Suche auf **Neue Person hinzufügen**. Neben Name, Anrede, E-Mail-Adresse und Mobiltelefon fragt der Dialog nach ihrer **Haushaltsrolle** (Haupt, Partner/in, Kind oder Sonstige). Die neue Person wird angelegt und mit dieser Rolle in den Haushalt aufgenommen; klicken Sie auf **Speichern**, um abzuschließen.

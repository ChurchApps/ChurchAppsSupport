---
title: "Formulare erstellen"
description: "Erstellen Sie in B1 Admin eigene Formulare für Veranstaltungsanmeldungen, Umfragen und Besucherkarten und teilen Sie sie dann per Link, QR-Code oder Ausdruck."
---

# Formulare erstellen

<div class="article-intro">

Erstellen Sie eigene Formulare, um Informationen von Ihrer Gemeinde zu sammeln. Sie können Formulare für Veranstaltungsanmeldungen, Umfragen, Besucherkarten, Mitgliedsanträge und mehr anlegen. Formulare können mit Personen in Ihrer Datenbank verknüpft oder als eigenständige Seiten mit eigener öffentlicher URL genutzt werden.

</div>

## Schulungsvideo {#training-video}

<YouTube id="UZ4dGCNIFw4" title="Formulare erstellen und Einsendungen verwalten in B1" next="Eine Gemeindewebsite in B1 starten" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Für **Personen**-Formulare (verknüpft mit Personendatensätzen) benötigen Sie zuerst [Personen in Ihrer Datenbank](../people/adding-people.md).
- Für Formulare, die **Zahlungen** erfassen, muss [Stripe für Online-Spenden eingerichtet](../donations/online-giving-setup.md) sein.

</div>

## Ein neues Formular erstellen {#creating-a-new-form}

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Personen** auf und klicken Sie auf **Formulare**.
2. Klicken Sie auf **Formular hinzufügen**.
3. Geben Sie einen **Namen** für Ihr Formular ein.
4. Wählen Sie den Formulartyp im Dropdown-Menü **Zuordnen zu**:
   - **Personen** – ordnet Einsendungen [Personendatensätzen](../people/adding-people.md) in Ihrer Datenbank zu. Personenformulare werden aus dem Datensatz einer Person ausgefüllt, daher erhalten sie keinen teilbaren Link.
   - **Eigenständig** – erstellt ein unabhängiges Formular mit eigener öffentlicher URL, ideal für externe Anmeldungen. Nur eigenständige Formulare bieten ein [Kopfbild](#adding-a-header-photo), einen [QR-Code](#sharing-a-form-with-a-qr-code), eine [verknüpfte Gruppe](#linking-a-form-to-a-group) und **Aus Einsendungen einen Personendatensatz anlegen**.
5. Bei einem eigenständigen Formular können Sie den Rest seiner [Eigenschaften](#configuring-form-properties) jetzt oder später festlegen.
6. Klicken Sie auf **Speichern**, um das Formular zu erstellen.

Ihr neues Formular erscheint in der Liste. Klicken Sie darauf, um Fragen hinzuzufügen.

## Ein leeres Formular drucken {#printing-a-blank-form}

Benötigen Sie eine Papierfassung zum Verteilen – etwa eine Besucherkarte am Empfangstisch oder ein Formular für Personen ohne Internetzugang, die es von Hand ausfüllen sollen? Klicken Sie in der Hauptliste der Formulare neben einem Formular auf **Drucken**, um eine Vorschau zu öffnen, und klicken Sie dann auf **Drucken**. Leere Felder werden mit einer Unterstreichung oder einem Kästchen pro Frage gedruckt, damit Personen sie von Hand ausfüllen können; Pflichtfragen sind mit einem Sternchen markiert. Oben auf der Seite erscheint Ihr Kirchenlogo (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen Ihrer Kirche darunter, dann der Name des Formulars. Weitere Druckoptionen gibt es nicht – Sie drucken das ganze Formular oder nichts.

## Ein Formular per QR-Code teilen {#sharing-a-form-with-a-qr-code}

Eigenständige Formulare haben in der Hauptliste der Formulare neben sich einen Link **QR-Code** (archivierte Formulare nicht). Klicken Sie darauf, um einen QR-Code für die öffentliche URL des Formulars zu öffnen; der Link wird darunter angezeigt. Klicken Sie auf **PNG herunterladen**, um den Code als Bild zu speichern, das Sie auf dem Gemeindebrief drucken oder auf Folien zeigen können. Wer ihn scannt, öffnet das Formular auf seinem Handy.

## Fragen hinzufügen {#adding-questions}

1. Öffnen Sie Ihr Formular und wechseln Sie zum Reiter **Fragen**.
2. Klicken Sie auf **Frage hinzufügen**.
3. Wählen Sie einen **Feldtyp**:
   - **Textfeld** – für kurze Textantworten
   - **Ganze Zahl** und **Dezimalzahl** – für Zahlen
   - **Datum** – für Datumsangaben
   - **Ja/Nein** – für eine Ja-oder-Nein-Antwort
   - **E-Mail** – für E-Mail-Adressen
   - **Telefonnummer** – für Telefoneingaben
   - **Textbereich** – für längere Antworten
   - **Multiple Choice** – um eine von mehreren Optionen zu wählen
   - **Kontrollkästchen** – um beliebig viele Optionen anzukreuzen
   - **Zahlung** – um Zahlungen einzuziehen
4. Geben Sie einen **Titel** und optional eine **Beschreibung** für die Frage ein. Die Beschreibung erscheint unter der Frage, wenn Personen das Formular ausfüllen, verwenden Sie sie also für Hinweise wie „Bitte nennen Sie uns Allergien, die wir kennen sollten.“.
5. Füllen Sie die zusätzlichen Felder für den gewählten Typ aus:
   - Bei Text-, Zahlen-, Datums-, E-Mail- und Telefonfragen zeigt ein optionaler **Platzhalter** Beispieltext im leeren Feld.
   - Bei **Multiple Choice** und **Kontrollkästchen** fügen Sie unter **Auswahlmöglichkeiten** jede Option hinzu: Geben Sie einen **Wert** (der gespeichert wird) und einen **Text** (den Personen sehen) ein und klicken Sie dann auf die Schaltfläche zum Hinzufügen. Mit dem Entfernen-Symbol nehmen Sie eine Option wieder heraus.
   - Bei **Zahlung** wählen Sie den **Fonds**, dem das Geld zufließt, und den **Betrag**.
6. Aktivieren Sie **Für diese Frage eine Antwort verlangen**, wenn das Feld Pflicht ist. (Zahlungsfragen haben diese Option nicht.)
7. Klicken Sie auf **Speichern**.
8. Wiederholen Sie dies, um weitere Fragen hinzuzufügen.

Der Reiter **Fragen** listet jede Frage mit ihrem Typ und der Angabe, ob sie Pflicht ist. Klicken Sie auf den Titel einer Frage, um sie zu bearbeiten, oder klicken Sie im Formular der Frage auf **Löschen** und bestätigen Sie, um sie zu entfernen. Mit den Pfeilen **Nach oben verschieben** und **Nach unten verschieben** in einer Zeile ändern Sie die Reihenfolge, in der die Fragen erscheinen.

:::warning
Der Feldtyp **Zahlung** setzt voraus, dass Stripe eingerichtet ist. Haben Sie Online-Spenden noch nicht eingerichtet, lesen Sie [Einrichtung der Online-Spenden](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen. Personen, die auf einem Formular bezahlen, ohne angemeldet zu sein, müssen das Kontrollkästchen **Ich bin kein Roboter** ankreuzen, bevor die Karte akzeptiert wird.
:::

## Mitglieder des Formulars verwalten {#managing-form-members}

Eigenständige Formulare haben einen Reiter **Mitglieder des Formulars**, um Personen Zugriff nur auf dieses Formular zu geben.

1. Öffnen Sie Ihr Formular und wechseln Sie zum Reiter **Mitglieder des Formulars**.
2. Suchen Sie unter **Person hinzufügen** nach einer Person und klicken Sie auf das Hinzufügen-Symbol neben ihrem Namen. Neue Mitglieder beginnen als **Nur Anzeigen**.
3. Klicken Sie in der Spalte **Berechtigung** auf die gewünschte Rolle:
   - **Administrator** – kann das Formular bearbeiten und alle Einsendungen ansehen.
   - **Nur Anzeigen** – kann Einsendungen ansehen, aber das Formular nicht bearbeiten.
4. Aktivieren Sie **E-Mail-Benachrichtigung** für alle, die bei jeder Einsendung des Formulars eine E-Mail erhalten sollen.

Um jemanden aus dem Formular zu entfernen, klicken Sie in seiner Zeile auf **Entfernen** und bestätigen Sie.

## Ein Formular mit einer Gruppe verknüpfen {#linking-a-form-to-a-group}

Sie können jedes eigenständige Formular mit einer Gruppe verknüpfen – zum Beispiel ein Gebetsanliegen-Formular für einen Hauskreis oder eine medizinische Einverständniserklärung für eine Jugendfreizeit:

1. Öffnen Sie das Formular und klicken Sie auf **Formular bearbeiten** (oder klicken Sie in der Liste der Formulare neben dem Formular auf **Bearbeiten**).
2. Wählen Sie unter **Verknüpfte Gruppe** die Gruppe aus oder belassen Sie die Auswahl auf **Keine**.
3. Klicken Sie auf **Speichern**.

Sobald ein Formular verknüpft ist:

- **Gruppenmitglieder** sehen das Formular im Bereich **Formulare** auf der Seite der Gruppe in B1.church, solange es geöffnet ist, mit einer Schaltfläche **Ausfüllen**, die es öffnet (siehe [Gruppendetails](../../b1-church/groups/group-details.md#linked-forms)).
- **Gruppenleitende** sehen außerdem geschlossene Formulare und können die Antworten jeder Einsendung lesen und drucken (eine Einsendung oder **Alle drucken**). Leitende können die Antworten nur ansehen – bearbeiten können sie das Formular nur, wenn sie zusätzlich [Mitglieder des Formulars](#managing-form-members) sind.
- **In B1 Admin** zeigt die Seite der Gruppe einen Bereich **Verknüpfte Formulare**, der jedes verknüpfte Formular als **Geöffnet** oder **Geschlossen** auflistet. Er erscheint für die Leitenden der Gruppe und für Personen, die Formulare verwalten dürfen. Siehe [Gruppenmitglieder](../groups/group-members.md#linked-forms).

Ein Formular ist geschlossen, wenn es außerhalb seines Verfügbarkeitszeitraums liegt. Archivierte Formulare werden auf der Seite der Gruppe nicht angezeigt.

### Einsendende automatisch zu einer Gruppe hinzufügen {#automatically-adding-submitters-to-a-group}

Die Verknüpfung eines Formulars mit einer Gruppe fügt allein niemanden hinzu. Um jede einsendende Person in die Liste der verknüpften Gruppe aufzunehmen, aktivieren Sie zusätzlich **Aus Einsendungen einen Personendatensatz anlegen** in den Einstellungen des Formulars und klicken Sie auf **Speichern**.

Jedes Mal, wenn jemand das Formular absendet, wird die zugeordnete oder neu angelegte Person der Gruppe hinzugefügt (bereits vorhandene Gruppenmitglieder werden übersprungen). Das ist nützlich, etwa für ein Anmeldeformular für ein Lager, das automatisch die Liste der Teilnehmenden dieser Gruppe aufbauen soll.

### Eine Nachfass-E-Mail senden {#sending-a-follow-up-email}

Wenn **Aus Einsendungen einen Personendatensatz anlegen** aktiviert ist, können Sie außerdem jeder Person, die das Formular absendet, eine E-Mail schicken. Füllen Sie in den Einstellungen des Formulars **Betreff der Nachfass-E-Mail** und **Text der Nachfass-E-Mail** aus. In beiden können Sie die Platzhalter `{firstName}` und `{churchName}` verwenden. Die E-Mail wird nur versendet, wenn beide Felder ausgefüllt sind.

:::info
Nachfass-E-Mails werden erst verschickt, nachdem Ihre Kirche für den Versand von Gruppen-E-Mails freigegeben wurde, und sie zählen zum täglichen E-Mail-Limit Ihrer Kirche. Siehe [Gruppen-E-Mail für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Ein Formular duplizieren {#duplicating-a-form}

Um ein Formular als Ausgangspunkt für ein neues zu verwenden, klicken Sie in der Liste der Formulare neben dem Formular auf **Duplizieren** und bestätigen Sie. Es erscheint die Meldung **Formular dupliziert**, und B1 legt eine exakte Kopie des Formulars an – einschließlich aller Fragen –, die Sie anschließend unabhängig umbenennen und bearbeiten können.

:::tip
Das Duplizieren ist praktisch für wiederkehrende Veranstaltungen, bei denen die Anmeldefragen von Jahr zu Jahr gleich bleiben. Duplizieren Sie das Formular des letzten Jahres, aktualisieren Sie Name und Daten, und Sie sind startklar.
:::

## Eigenschaften des Formulars konfigurieren {#configuring-form-properties}

Sie können Name und Einstellungen Ihres Formulars jederzeit ändern: Öffnen Sie das Formular und klicken Sie auf der linken Seite der Seite auf **Formular bearbeiten**, oder klicken Sie in der Liste der Formulare neben dem Formular auf **Bearbeiten**. Auf der linken Seite der Formularseite stehen der Typ des Formulars (**Personen** oder **Eigenständig**) und bei eigenständigen Formularen, ob es **Öffentlich** oder **Eingeschränkt** ist, sowie seine eindeutige **öffentliche URL**, die Sie mit jedem teilen können.

Die Einstellungen von **Formular bearbeiten** sind:

- **Formularname** – der Name, der in B1 Admin und oben im Formular angezeigt wird.
- **Beschreibung** *(eigenständig)* – Text oberhalb der Fragen auf der öffentlichen Formularseite; nützlich, um Personen vorab zu erklären, wozu das Formular dient.
- **Kopfbild** *(eigenständig)* – siehe [Ein Kopfbild hinzufügen](#adding-a-header-photo).
- **Formularzugang** *(eigenständig)* – **Öffentlich** erlaubt jedem mit dem Link, das Formular auszufüllen; **Eingeschränkt** verlangt, dass sich Personen auf der Website Ihrer Kirche anmelden, bevor sie es öffnen können.
- **Verfügbarkeitszeitraum des Formulars festlegen** *(eigenständig)* – Wählen Sie **Ja** und legen Sie ein **Datum für den Beginn der Verfügbarkeit** und ein **Datum für das Ende der Verfügbarkeit** fest, um Einsendungen nur zwischen diesen Daten anzunehmen. Außerhalb davon ist das Formular geschlossen.
- **Dankesnachricht** – was Personen nach dem Absenden sehen (siehe unten).
- **Anzeigemodus** – **Standard** zeigt alle Fragen auf einer Seite; **Dialogartig (eine Frage nach der anderen)** führt Schritt für Schritt durch die Fragen.
- **Aus Einsendungen einen Personendatensatz anlegen** *(eigenständig)*, **Verknüpfte Gruppe** und die Felder für die Nachfass-E-Mail – siehe [Ein Formular mit einer Gruppe verknüpfen](#linking-a-form-to-a-group) und [Eine Nachfass-E-Mail senden](#sending-a-follow-up-email).

Klicken Sie auf **Speichern**, um Ihre Änderungen zu behalten. Um ein Formular dauerhaft zu entfernen, klicken Sie in den Einstellungen des Formulars auf **Löschen** und bestätigen Sie. Möchten Sie es behalten, aber aus der Liste ausblenden, [archivieren](./index.md#what-you-can-do) Sie es stattdessen.

### Ein Kopfbild hinzufügen {#adding-a-header-photo}

Eigenständige Formulare können oben im Formular ein **Kopfbild** anzeigen. Klicken Sie in den Details des Formulars auf das Fotofeld oder auf **Foto hinzufügen** und wählen oder laden Sie dann ein Bild hoch (es wird im Format 16:9 zugeschnitten). Klicken Sie auf **Speichern**. Das Foto erscheint unter dem Namen des Formulars, oberhalb der Beschreibung, auf der Seite der öffentlichen URL des Formulars und überall dort, wo das Formular mit dem Website-Element **Formular** eingebettet ist. Mit **Foto ändern** ersetzen Sie es, mit **Entfernen** nehmen Sie es wieder heraus.

Mit dem Feld **Dankesnachricht** legen Sie fest, was Personen nach dem Absenden des Formulars sehen, auch auf der Seite der öffentlichen URL des Formulars. Lassen Sie es leer, sehen sie „Vielen Dank für das Absenden des Formulars!“.

:::tip
Eigenständige Formulare eignen sich hervorragend für Veranstaltungsanmeldungen. Teilen Sie die öffentliche URL per E-Mail oder in sozialen Medien oder betten Sie das Formular direkt auf der Website Ihrer Kirche ein.
:::

:::info
Um ein Formular auf Ihrer B1-Website einzubetten, gehen Sie in den Website-Editor, fügen Sie einen neuen Abschnitt hinzu und wählen Sie das Element **Formular**. Wählen Sie dann das Formular, das angezeigt werden soll. Details zur Bearbeitung Ihrer Website finden Sie unter [Seiten verwalten](../website/managing-pages.md).
:::

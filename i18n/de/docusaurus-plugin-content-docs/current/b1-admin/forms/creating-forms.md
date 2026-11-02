---
title: "Formulare erstellen"
---

# Formulare erstellen

<div class="article-intro">

Erstellen Sie eigene Formulare, um Informationen aus Ihrer Gemeinde zu sammeln. Sie können Formulare für Veranstaltungsanmeldungen, Umfragen, Besucherkarten, Mitgliedsanträge und mehr anlegen. Formulare lassen sich mit Personen in Ihrer Datenbank verknüpfen oder als eigenständige Seiten mit eigener öffentlicher URL verwenden.

</div>

## Schulungsvideo

<YouTube id="sr9wxEj9ghQ" title="Formulare erstellen und Einsendungen in B1 verwalten" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Für Formulare vom Typ **Personen** (mit Personendatensätzen verknüpft) benötigen Sie zuerst [Personen in Ihrer Datenbank](../people/adding-people.md).
- Für Formulare, die **Zahlungen** einziehen, muss [Stripe für Online-Spenden konfiguriert](../donations/online-giving-setup.md) sein.

</div>

## Ein neues Formular erstellen

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links in B1 Admin), klappen Sie **Personen** auf und klicken Sie auf **Formulare**.
2. Klicken Sie auf **Formular hinzufügen**.
3. Geben Sie einen **Namen** für Ihr Formular ein.
4. Wählen Sie den Formulartyp im Dropdown-Menü **Zuordnen zu**:
   - **Personen** – Ordnet Einsendungen [Personendatensätzen](../people/adding-people.md) in Ihrer Datenbank zu. Formulare vom Typ Personen werden aus dem Datensatz einer Person ausgefüllt, daher haben sie keinen teilbaren Link.
   - **Eigenständig** – Erstellt ein unabhängiges Formular mit eigener öffentlicher URL, ideal für externe Anmeldungen. Nur eigenständige Formulare bieten ein [Kopfbild](#adding-a-header-photo), einen [QR-Code](#sharing-a-form-with-a-qr-code), eine [verknüpfte Gruppe](#linking-a-form-to-a-group) und **Aus Einsendungen einen Personendatensatz anlegen**.
5. Klicken Sie auf **Speichern**, um das Formular anzulegen.

Ihr neues Formular erscheint in der Liste. Klicken Sie darauf, um Fragen hinzuzufügen.

## Ein leeres Formular drucken {#printing-a-blank-form}

Sie brauchen eine Papierversion zum Verteilen – etwa eine Besucherkarte am Empfangstisch oder ein Formular, das jemand ohne Internetzugang von Hand ausfüllen kann? Klicken Sie in der Hauptliste der Formulare neben einem Formular auf **Drucken**, um eine Vorschau zu öffnen, und klicken Sie dann auf **Drucken**. Leere Felder werden mit einer Linie oder einem Kästchen je Frage gedruckt, damit Menschen sie von Hand ausfüllen können; Pflichtfragen sind mit einem Sternchen markiert. Oben auf der Seite erscheint Ihr Kirchenlogo (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen Ihrer Kirche darunter, danach der Formularname. Weitere Druckoptionen gibt es nicht – Sie drucken das gesamte Formular oder nichts.

## Ein Formular mit einem QR-Code teilen {#sharing-a-form-with-a-qr-code}

Eigenständige Formulare haben in der Hauptliste der Formulare einen Link **QR-Code** daneben (archivierte Formulare nicht). Klicken Sie darauf, um einen QR-Code für die öffentliche URL des Formulars zu öffnen; darunter wird der Link angezeigt. Klicken Sie auf **PNG herunterladen**, um den Code als Bild zu speichern, das Sie auf dem Gemeindebrief drucken oder auf Folien zeigen können. Wer ihn scannt, öffnet das Formular auf seinem Telefon.

## Fragen hinzufügen {#adding-questions}

1. Öffnen Sie Ihr Formular und wechseln Sie zur Registerkarte **Fragen**.
2. Klicken Sie auf **Frage hinzufügen**.
3. Wählen Sie im Dropdown-Menü Anbieter einen **Feldtyp**. Verfügbare Typen sind unter anderem:
   - **Textfeld** – für kurze Textantworten
   - **Datum** – für Datumsangaben
   - **E-Mail** – für E-Mail-Adressen
   - **Telefonnummer** – für Telefoneingaben
   - **Multiple Choice** – zur Auswahl aus vordefinierten Optionen
   - **Zahlung** – zum Einziehen von Zahlungen
4. Geben Sie einen **Titel** und optional eine **Beschreibung** für die Frage ein. Die Beschreibung erscheint unter der Frage, wenn Menschen das Formular ausfüllen, verwenden Sie sie also für Hinweise wie „Bitte nennen Sie uns Allergien, die wir kennen sollten.“
5. Aktivieren Sie **Antwort erforderlich**, wenn das Feld Pflicht ist.
6. Klicken Sie auf **Speichern**.
7. Wiederholen Sie die Schritte, um weitere Fragen hinzuzufügen.

:::warning
Der Feldtyp **Zahlung** setzt voraus, dass Stripe konfiguriert ist. Wenn Sie Online-Spenden noch nicht eingerichtet haben, lesen Sie [Einrichtung der Online-Spenden](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen. Personen, die auf einem Formular ohne Anmeldung bezahlen, müssen das Kästchen **Ich bin kein Roboter** aktivieren, bevor die Karte akzeptiert wird.
:::

## Formularmitglieder verwalten {#managing-form-members}

1. Öffnen Sie Ihr Formular und wechseln Sie zur Registerkarte **Formularmitglieder**.
2. Suchen Sie eine Person und fügen Sie sie mit einer Rolle hinzu:
   - **Administrator** – Kann das Formular bearbeiten und alle Einsendungen einsehen.
   - **Nur Ansicht** – Kann Einsendungen einsehen, aber das Formular nicht bearbeiten.

## Ein Formular mit einer Gruppe verknüpfen {#linking-a-form-to-a-group}

Sie können jedes eigenständige Formular mit einer Gruppe verknüpfen – etwa ein Gebetsanliegen-Formular für einen Hauskreis oder eine Gesundheitserklärung für eine Jugendfreizeit:

1. Öffnen Sie die **Details** Ihres Formulars.
2. Wählen Sie unter **Verknüpfte Gruppe** die Gruppe aus oder lassen Sie es auf **Keine** stehen.
3. Klicken Sie auf **Speichern**.

Sobald ein Formular verknüpft ist:

- **Gruppenmitglieder** sehen das Formular, solange es geöffnet ist, im Abschnitt **Formulare** auf der Seite der Gruppe auf B1.church, mit einer Schaltfläche **Ausfüllen**, die es öffnet (siehe [Gruppendetails](../../b1-church/groups/group-details.md#linked-forms)).
- **Gruppenleitende** sehen außerdem geschlossene Formulare und können die Antworten jeder Einsendung lesen und drucken (eine Einsendung oder **Alle drucken**). Leitende können Antworten nur einsehen – sie können das Formular nicht bearbeiten, es sei denn, sie sind außerdem [Formularmitglieder](#managing-form-members).
- **In B1 Admin** zeigt die Seite der Gruppe einen Abschnitt **Verknüpfte Formulare**, der jedes verknüpfte Formular als **Geöffnet** oder **Geschlossen** auflistet. Er erscheint für die Leitenden der Gruppe und für Personen, die Formulare verwalten dürfen. Siehe [Gruppenmitglieder](../groups/group-members.md#linked-forms).

Ein Formular ist geschlossen, wenn es außerhalb seines Verfügbarkeitszeitraums liegt. Archivierte Formulare werden auf der Gruppenseite nicht angezeigt.

### Einsendende automatisch zu einer Gruppe hinzufügen {#automatically-adding-submitters-to-a-group}

Das Verknüpfen eines Formulars mit einer Gruppe fügt von allein niemanden hinzu. Damit jede einsendende Person in die Mitgliederliste der verknüpften Gruppe aufgenommen wird, aktivieren Sie zusätzlich **Aus Einsendungen einen Personendatensatz anlegen** in den Details des Formulars und klicken Sie auf **Speichern**.

Jedes Mal, wenn jemand das Formular absendet, wird die zugeordnete oder neu angelegte Person der Gruppe hinzugefügt (bestehende Gruppenmitglieder werden übersprungen). Das ist nützlich, etwa bei einem Anmeldeformular für ein Camp, das automatisch die Teilnehmerliste der Camp-Gruppe aufbauen soll.

### Eine Folge-E-Mail senden {#sending-a-follow-up-email}

Mit eingeschaltetem **Aus Einsendungen einen Personendatensatz anlegen** können Sie außerdem jeder Person, die das Formular absendet, eine E-Mail schicken. Tragen Sie in den Details des Formulars **Betreff der Folge-E-Mail** und **Text der Folge-E-Mail** ein. In beiden können Sie die Platzhalter `{firstName}` und `{churchName}` verwenden. Die E-Mail wird nur versendet, wenn beide Felder ausgefüllt sind.

:::info
Folge-E-Mails werden erst versendet, nachdem Ihre Kirche zum Versenden von Gruppen-E-Mails freigegeben wurde, und sie zählen auf das tägliche E-Mail-Limit Ihrer Kirche. Siehe [Gruppen-E-Mails für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Ein Formular duplizieren

Um ein Formular als Ausgangspunkt für ein neues zu verwenden, klicken Sie in der Liste der Formulare neben dem Formular auf **Duplizieren** und bestätigen Sie. B1 erstellt eine exakte Kopie des Formulars – einschließlich aller Fragen –, die Sie anschließend umbenennen und unabhängig bearbeiten können.

:::tip
Das Duplizieren ist praktisch für wiederkehrende Veranstaltungen, bei denen die Anmeldefragen von Jahr zu Jahr gleich bleiben. Duplizieren Sie das Formular des Vorjahres, passen Sie Namen und Termine an, und Sie sind startklar.
:::

## Formulareigenschaften konfigurieren

Sie können den Namen und die Einstellungen Ihres Formulars jederzeit ändern. Bei eigenständigen Formularen sehen Sie außerdem eine eindeutige **öffentliche URL**, die Sie mit jedem teilen können, zusammen mit dem Feld **Beschreibung** – ein Text, der oberhalb der Fragen auf der öffentlichen Formularseite angezeigt wird und den Menschen erklärt, wofür das Formular gedacht ist, bevor sie es ausfüllen.

### Ein Kopfbild hinzufügen {#adding-a-header-photo}

Eigenständige Formulare können ein **Kopfbild** oben über dem Formular anzeigen. Klicken Sie in den Details des Formulars auf das Fotofeld oder auf **Foto hinzufügen** und wählen oder laden Sie ein Bild hoch (es wird auf ein 16:9-Format zugeschnitten). Klicken Sie auf **Speichern**. Das Foto erscheint unter dem Namen des Formulars, oberhalb der Beschreibung, auf der öffentlichen URL-Seite des Formulars und überall dort, wo das Formular mit dem Website-Element **Formular** eingebettet ist. Mit **Foto ändern** ersetzen Sie es, mit **Entfernen** nehmen Sie es wieder heraus.

Mit dem Feld **Dankesnachricht** legen Sie fest, was Menschen nach dem Absenden des Formulars sehen, auch auf der öffentlichen URL-Seite des Formulars. Lassen Sie das Feld leer, sehen sie „Vielen Dank für das Absenden des Formulars!“

:::tip
Eigenständige Formulare eignen sich hervorragend für Veranstaltungsanmeldungen. Teilen Sie die öffentliche URL per E-Mail oder über soziale Medien oder betten Sie das Formular direkt auf Ihrer Kirchenwebsite ein.
:::

:::info
Um ein Formular auf Ihrer B1-Website einzubetten, öffnen Sie den Website-Editor, fügen Sie einen neuen Abschnitt hinzu und wählen Sie das Element **Formular**. Wählen Sie dann das Formular, das angezeigt werden soll. Details zur Bearbeitung Ihrer Website finden Sie unter [Seiten verwalten](../website/managing-pages.md).
:::

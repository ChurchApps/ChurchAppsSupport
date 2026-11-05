---
title: "Formulare erstellen"
---

# Formulare erstellen

<div class="article-intro">

Erstellen Sie benutzerdefinierte Formulare, um Informationen von Ihrer Gemeinde zu sammeln. Sie können Formulare für Veranstaltungsanmeldungen, Umfragen, Besucherkarten, Mitgliedsanträge und mehr erstellen. Formulare lassen sich mit Personen in Ihrer Datenbank verknüpfen oder als eigenständige Seiten mit eigener öffentlicher URL verwenden.

</div>

## Einführungsvideo

<YouTube id="sr9wxEj9ghQ" title="Formulare erstellen und Einsendungen in B1 verwalten" next="Eine Kirchenwebsite in B1 starten" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Für **Personen**-Formulare (mit Personendatensätzen verknüpft) benötigen Sie zuerst [Personen in Ihrer Datenbank](../people/adding-people.md).
- Für Formulare, die **Zahlungen** annehmen, muss [Stripe für Online-Spenden eingerichtet](../donations/online-giving-setup.md) sein.

</div>

## Ein neues Formular erstellen

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Personen** auf und klicken Sie auf **Formulare**.
2. Klicken Sie auf **Formular hinzufügen**.
3. Geben Sie einen **Namen** für Ihr Formular ein.
4. Wählen Sie den Formulartyp im Dropdown-Menü **Verknüpfen mit**:
   - **Personen** -- Verknüpft Einsendungen mit [Personendatensätzen](../people/adding-people.md) in Ihrer Datenbank. Personenformulare werden aus dem Datensatz einer Person ausgefüllt, daher gibt es für sie keinen teilbaren Link.
   - **Eigenständig** -- Erstellt ein unabhängiges Formular mit eigener öffentlicher URL, ideal für externe Anmeldungen. Nur eigenständige Formulare bieten ein [Kopfbild](#adding-a-header-photo), einen [QR-Code](#sharing-a-form-with-a-qr-code), eine [verknüpfte Gruppe](#linking-a-form-to-a-group) und **Aus Einsendungen einen Personendatensatz erstellen**.
5. Klicken Sie auf **Speichern**, um das Formular zu erstellen.

Ihr neues Formular erscheint in der Liste. Klicken Sie darauf, um Fragen hinzuzufügen.

## Ein leeres Formular drucken {#printing-a-blank-form}

Sie benötigen eine Papierkopie zum Verteilen -- etwa eine Besucherkarte für den Empfangstisch oder ein Formular, das jemand ohne Internetzugang handschriftlich ausfüllen kann? Klicken Sie in der Hauptliste der Formulare neben einem Formular auf **Drucken**, um eine Vorschau zu öffnen, und dann auf **Drucken**. Leere Felder werden mit einer Linie oder einem Kästchen für jede Frage gedruckt, damit Menschen sie handschriftlich ausfüllen können; Pflichtfragen sind mit einem Sternchen markiert. Oben auf der Seite erscheint das Logo Ihrer Kirche (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben), darunter der Name Ihrer Kirche und darunter der Formularname. Weitere Druckoptionen gibt es nicht -- Sie drucken das gesamte Formular oder nichts.

## Ein Formular mit einem QR-Code teilen {#sharing-a-form-with-a-qr-code}

Eigenständige Formulare haben in der Hauptliste der Formulare einen Link **QR-Code** daneben (archivierte Formulare nicht). Klicken Sie darauf, um einen QR-Code für die öffentliche URL des Formulars zu öffnen; der Link wird darunter angezeigt. Klicken Sie auf **PNG herunterladen**, um den Code als Bild zu speichern, das Sie auf Gemeindebriefen drucken oder auf Folien zeigen können. Wer ihn scannt, öffnet das Formular auf seinem Telefon.

## Fragen hinzufügen {#adding-questions}

1. Öffnen Sie Ihr Formular und wechseln Sie zum Reiter **Fragen**.
2. Klicken Sie auf **Frage hinzufügen**.
3. Wählen Sie einen **Feldtyp** aus dem Dropdown-Menü Anbieter. Verfügbare Typen sind unter anderem:
   - **Textfeld** -- für kurze Textantworten
   - **Datum** -- für Datumsauswahl
   - **E-Mail** -- für E-Mail-Adressen
   - **Telefonnummer** -- für Telefoneingaben
   - **Multiple Choice** -- zur Auswahl aus vorgegebenen Optionen
   - **Zahlung** -- zum Einziehen von Zahlungen
4. Geben Sie einen **Titel** und optional eine **Beschreibung** für die Frage ein. Die Beschreibung erscheint unter der Frage, wenn Menschen das Formular ausfüllen. Nutzen Sie sie für Hinweise wie "Bitte nennen Sie Allergien, die wir kennen sollten."
5. Aktivieren Sie **Antwort erforderlich**, wenn das Feld Pflicht ist.
6. Klicken Sie auf **Speichern**.
7. Wiederholen Sie den Vorgang, um weitere Fragen hinzuzufügen.

:::warning
Der Feldtyp **Zahlung** erfordert, dass Stripe eingerichtet ist. Falls Sie Online-Spenden noch nicht eingerichtet haben, lesen Sie [Einrichtung von Online-Spenden](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen. Personen, die auf einem Formular bezahlen, ohne sich anzumelden, müssen das Kästchen **Ich bin kein Roboter** anklicken, bevor die Karte akzeptiert wird.
:::

## Formularmitglieder verwalten {#managing-form-members}

1. Öffnen Sie Ihr Formular und wechseln Sie zum Reiter **Formularmitglieder**.
2. Suchen Sie eine Person und fügen Sie sie mit einer Rolle hinzu:
   - **Administrator** -- Kann das Formular bearbeiten und alle Einsendungen sehen.
   - **Nur Ansicht** -- Kann Einsendungen sehen, das Formular aber nicht bearbeiten.

## Ein Formular mit einer Gruppe verknüpfen {#linking-a-form-to-a-group}

Sie können jedes eigenständige Formular mit einer Gruppe verknüpfen -- etwa ein Gebetsanliegen-Formular für einen Hauskreis oder eine medizinische Einverständniserklärung für eine Jugendfreizeit:

1. Öffnen Sie die **Details** Ihres Formulars.
2. Wählen Sie unter **Verknüpfte Gruppe** die Gruppe aus oder lassen Sie es auf **Keine** stehen.
3. Klicken Sie auf **Speichern**.

Sobald ein Formular verknüpft ist:

- **Gruppenmitglieder** sehen das Formular im Abschnitt **Formulare** auf der Seite der Gruppe auf B1.church, solange das Formular geöffnet ist, mit einer Schaltfläche **Ausfüllen**, die es öffnet (siehe [Gruppendetails](../../b1-church/groups/group-details.md#linked-forms)).
- **Gruppenleitungen** sehen auch geschlossene Formulare und können die Antworten jeder Einsendung lesen und drucken (eine Einsendung oder **Alle drucken**). Leitungen können Antworten nur ansehen -- das Formular bearbeiten können sie nur, wenn sie zusätzlich [Formularmitglieder](#managing-form-members) sind.
- **In B1 Admin** zeigt die Seite der Gruppe einen Abschnitt **Verknüpfte Formulare**, der jedes verknüpfte Formular als **Geöffnet** oder **Geschlossen** auflistet. Er erscheint für die Leitungen der Gruppe und für Personen, die Formulare verwalten dürfen. Siehe [Gruppenmitglieder](../groups/group-members.md#linked-forms).

Ein Formular ist geschlossen, wenn es außerhalb seines Verfügbarkeitszeitraums liegt. Archivierte Formulare werden auf der Seite der Gruppe nicht angezeigt.

### Einsendende automatisch zu einer Gruppe hinzufügen {#automatically-adding-submitters-to-a-group}

Die Verknüpfung eines Formulars mit einer Gruppe fügt von selbst niemanden zu ihr hinzu. Damit jede einsendende Person in die Teilnehmerliste der verknüpften Gruppe aufgenommen wird, aktivieren Sie außerdem **Aus Einsendungen einen Personendatensatz erstellen** in den Details des Formulars und klicken Sie auf **Speichern**.

Jedes Mal, wenn jemand das Formular absendet, wird die zugeordnete oder neu angelegte Person der Gruppe hinzugefügt (bestehende Gruppenmitglieder werden übersprungen). Das ist nützlich für Dinge wie ein Anmeldeformular für ein Camp, das automatisch die Teilnehmerliste der Camp-Gruppe aufbauen soll.

### Eine Follow-up-E-Mail senden {#sending-a-follow-up-email}

Mit aktivierter Option **Aus Einsendungen einen Personendatensatz erstellen** können Sie außerdem jede Person anschreiben, die das Formular absendet. Tragen Sie in den Details des Formulars **Betreff der Follow-up-E-Mail** und **Text der Follow-up-E-Mail** ein. In beiden können Sie die Platzhalter `{firstName}` und `{churchName}` verwenden. Die E-Mail wird nur versendet, wenn beide Felder ausgefüllt sind.

:::info
Follow-up-E-Mails werden erst versendet, nachdem Ihre Kirche für den Versand von Gruppen-E-Mails freigegeben wurde, und sie zählen zum täglichen E-Mail-Limit Ihrer Kirche. Siehe [Gruppen-E-Mail für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Ein Formular duplizieren

Um ein Formular als Ausgangspunkt für ein neues zu verwenden, klicken Sie in der Liste der Formulare neben dem Formular auf **Duplizieren** und bestätigen Sie. B1 erstellt eine exakte Kopie des Formulars -- einschließlich aller Fragen --, die Sie anschließend umbenennen und unabhängig bearbeiten können.

:::tip
Das Duplizieren ist praktisch für wiederkehrende Veranstaltungen, bei denen die Anmeldefragen von Jahr zu Jahr gleich bleiben. Duplizieren Sie das Formular des Vorjahres, aktualisieren Sie Name und Termine, und Sie sind startklar.
:::

## Eigenschaften des Formulars einrichten

Sie können Name und Einstellungen Ihres Formulars jederzeit ändern. Bei eigenständigen Formularen sehen Sie außerdem eine eindeutige **öffentliche URL**, die Sie mit beliebigen Personen teilen können, sowie ein Feld **Beschreibung** -- Text, der oberhalb der Fragen auf der öffentlichen Formularseite erscheint und hilfreich ist, um den Zweck des Formulars zu erklären, bevor jemand es ausfüllt.

### Ein Kopfbild hinzufügen {#adding-a-header-photo}

Eigenständige Formulare können oben ein **Kopfbild** anzeigen. Klicken Sie in den Details des Formulars auf das Fotofeld oder auf **Foto hinzufügen**, wählen oder laden Sie dann ein Bild hoch (es wird auf ein Format von 16:9 zugeschnitten). Klicken Sie auf **Speichern**. Das Foto erscheint unter dem Namen des Formulars, oberhalb der Beschreibung, auf der öffentlichen URL-Seite des Formulars und überall dort, wo das Formular über das Website-Element **Formular** eingebettet ist. Mit **Foto ändern** ersetzen Sie es, mit **Entfernen** nehmen Sie es wieder heraus.

Mit dem Feld **Dankeschön-Nachricht** legen Sie fest, was Menschen nach dem Absenden des Formulars sehen, auch auf der öffentlichen URL-Seite des Formulars. Lassen Sie das Feld leer, erscheint "Vielen Dank für das Absenden des Formulars!"

:::tip
Eigenständige Formulare eignen sich hervorragend für Veranstaltungsanmeldungen. Teilen Sie die öffentliche URL per E-Mail oder in sozialen Medien oder betten Sie das Formular direkt auf Ihrer Kirchenwebsite ein.
:::

:::info
Um ein Formular auf Ihrer B1-Website einzubetten, öffnen Sie den Website-Editor, fügen Sie einen neuen Abschnitt hinzu und wählen Sie das Element **Formular**. Wählen Sie dann das gewünschte Formular aus. Wie Sie Ihre Website bearbeiten, erfahren Sie unter [Seiten verwalten](../website/managing-pages.md).
:::

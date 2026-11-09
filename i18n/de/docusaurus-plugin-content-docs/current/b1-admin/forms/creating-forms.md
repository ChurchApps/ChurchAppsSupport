---
title: "Formulare erstellen"
description: "Individuelle Formulare in B1 Admin für Veranstaltungsanmeldungen, Umfragen und Gästekarten erstellen und sie per Link, QR-Code oder Ausdruck teilen."
---

# Formulare erstellen

<div class="article-intro">

Erstellen Sie individuelle Formulare, um Informationen von Ihrer Gemeinde zu sammeln. Sie können Formulare für Veranstaltungsanmeldungen, Umfragen, Gästekarten, Mitgliedsanträge und vieles mehr anlegen. Formulare lassen sich mit Personendatensätzen in Ihrer Datenbank verknüpfen oder als eigenständige Seiten mit eigener öffentlicher URL verwenden.

</div>

## Schulungsvideo

<YouTube id="UZ4dGCNIFw4" title="Formulare erstellen und Einsendungen in B1 verwalten" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Für Formulare vom Typ **Personen** (mit Personendatensätzen verknüpft) benötigen Sie zuerst [Personen in Ihrer Datenbank](../people/adding-people.md).
- Für Formulare, die **Zahlungen** erfassen, muss [Stripe für Online-Spenden eingerichtet](../donations/online-giving-setup.md) sein.

</div>

## Ein neues Formular erstellen

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Personen** auf und klicken Sie auf **Formulare**.
2. Klicken Sie auf **Formular hinzufügen**.
3. Geben Sie einen **Namen** für Ihr Formular ein.
4. Wählen Sie den Formulartyp im Dropdown-Menü **Verknüpfen mit**:
   - **Personen** — Verknüpft Einsendungen mit [Personendatensätzen](../people/adding-people.md) in Ihrer Datenbank. Formulare vom Typ Personen werden aus dem Datensatz einer Person ausgefüllt, daher erhalten sie keinen teilbaren Link.
   - **Eigenständig** — Erstellt ein unabhängiges Formular mit eigener öffentlicher URL, ideal für externe Anmeldungen. Nur eigenständige Formulare bieten ein [Kopfbild](#adding-a-header-photo), einen [QR-Code](#sharing-a-form-with-a-qr-code), eine [verknüpfte Gruppe](#linking-a-form-to-a-group) und die Option **Personendatensatz aus Einsendungen erstellen**.
5. Klicken Sie auf **Speichern**, um das Formular zu erstellen.

Ihr neues Formular erscheint in der Liste. Klicken Sie darauf, um Fragen hinzuzufügen.

## Ein leeres Formular drucken {#printing-a-blank-form}

Brauchen Sie eine Papierversion zum Verteilen, etwa eine Gästekarte für den Empfangstisch oder ein Formular für Personen ohne Internetzugang, das sie von Hand ausfüllen können? Klicken Sie in der Hauptliste der Formulare neben einem Formular auf **Drucken**, um eine Vorschau zu öffnen, und klicken Sie dann auf **Drucken**. Leere Felder werden mit einer Unterstreichung oder einem Kästchen für jede Frage gedruckt, damit Personen sie von Hand ausfüllen können. Pflichtfragen sind mit einem Sternchen markiert. Oben auf der Seite erscheint das Logo Ihrer Gemeinde (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) mit dem Namen Ihrer Gemeinde darunter, danach der Name des Formulars. Weitere Druckoptionen gibt es nicht. Sie drucken das gesamte Formular oder nichts.

## Ein Formular mit einem QR-Code teilen {#sharing-a-form-with-a-qr-code}

Eigenständige Formulare haben in der Hauptliste der Formulare neben sich einen Link **QR-Code** (archivierte Formulare nicht). Klicken Sie darauf, um einen QR-Code für die öffentliche URL des Formulars zu öffnen. Der Link wird darunter angezeigt. Klicken Sie auf **PNG herunterladen**, um den Code als Bild zu speichern, das Sie im Gemeindebrief drucken oder auf Folien zeigen können. Wer ihn scannt, öffnet das Formular auf seinem Telefon.

## Fragen hinzufügen {#adding-questions}

1. Öffnen Sie Ihr Formular und wechseln Sie zum Reiter **Fragen**.
2. Klicken Sie auf **Frage hinzufügen**.
3. Wählen Sie im Dropdown-Menü Anbieter einen **Feldtyp**. Verfügbare Typen sind unter anderem:
   - **Textfeld** — für kurze Textantworten
   - **Datum** — für Datumsangaben
   - **E-Mail** — für E-Mail-Adressen
   - **Telefonnummer** — für Telefoneingaben
   - **Multiple Choice** — zur Auswahl aus vorgegebenen Optionen
   - **Zahlung** — zum Einziehen von Zahlungen
4. Geben Sie einen **Titel** und optional eine **Beschreibung** für die Frage ein. Die Beschreibung erscheint unter der Frage, wenn Personen das Formular ausfüllen. Nutzen Sie sie für Hinweise wie „Bitte nennen Sie uns Allergien, die wir kennen sollten.“
5. Aktivieren Sie **Antwort erforderlich**, wenn das Feld Pflicht ist.
6. Klicken Sie auf **Speichern**.
7. Wiederholen Sie die Schritte, um weitere Fragen hinzuzufügen.

:::warning
Der Feldtyp **Zahlung** setzt voraus, dass Stripe eingerichtet ist. Wenn Sie Online-Spenden noch nicht eingerichtet haben, lesen Sie [Einrichtung der Online-Spenden](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen. Personen, die ohne Anmeldung auf einem Formular bezahlen, müssen vor Annahme der Karte das Kästchen **Ich bin kein Roboter** anklicken.
:::

## Formularmitglieder verwalten {#managing-form-members}

1. Öffnen Sie Ihr Formular und wechseln Sie zum Reiter **Formularmitglieder**.
2. Suchen Sie eine Person und fügen Sie sie mit einer Rolle hinzu:
   - **Admin** — Kann das Formular bearbeiten und alle Einsendungen sehen.
   - **Nur Ansicht** — Kann Einsendungen sehen, das Formular aber nicht bearbeiten.

## Ein Formular mit einer Gruppe verknüpfen {#linking-a-form-to-a-group}

Sie können jedes eigenständige Formular mit einer Gruppe verknüpfen, zum Beispiel ein Gebetsanliegen-Formular für einen Hauskreis oder eine medizinische Einverständniserklärung für eine Jugendfahrt:

1. Öffnen Sie die **Details** Ihres Formulars.
2. Wählen Sie unter **Verknüpfte Gruppe** die Gruppe aus oder lassen Sie die Auswahl auf **Keine**.
3. Klicken Sie auf **Speichern**.

Sobald ein Formular verknüpft ist:

- **Gruppenmitglieder** sehen das Formular, solange es geöffnet ist, im Bereich **Formulare** auf der Seite der Gruppe auf B1.church. Dort gibt es eine Schaltfläche **Ausfüllen**, die es öffnet (siehe [Gruppendetails](../../b1-church/groups/group-details.md#linked-forms)).
- **Gruppenleitungen** sehen auch geschlossene Formulare und können die Antworten jeder Einsendung lesen und drucken (eine einzelne Einsendung oder **Alle drucken**). Leitungen können die Antworten nur ansehen. Sie können das Formular nicht bearbeiten, es sei denn, sie sind auch [Formularmitglieder](#managing-form-members).
- **In B1 Admin** zeigt die Seite der Gruppe einen Bereich **Verknüpfte Formulare**, der jedes verknüpfte Formular als **Offen** oder **Geschlossen** auflistet. Er erscheint für die Leitungen der Gruppe und für Personen, die Formulare verwalten dürfen. Siehe [Gruppenmitglieder](../groups/group-members.md#linked-forms).

Ein Formular ist geschlossen, wenn es außerhalb seines Verfügbarkeitszeitraums liegt. Archivierte Formulare werden auf der Seite der Gruppe nicht angezeigt.

### Einsendende automatisch zu einer Gruppe hinzufügen {#automatically-adding-submitters-to-a-group}

Ein verknüpftes Formular fügt von sich aus niemanden zu der Gruppe hinzu. Damit alle Einsendenden in die Mitgliederliste der verknüpften Gruppe aufgenommen werden, aktivieren Sie zusätzlich **Personendatensatz aus Einsendungen erstellen** in den Details des Formulars und klicken Sie auf **Speichern**.

Jedes Mal, wenn jemand das Formular absendet, wird die passende oder neu angelegte Person zur Gruppe hinzugefügt. Bereits vorhandene Gruppenmitglieder werden übersprungen. Das ist zum Beispiel nützlich für ein Anmeldeformular für ein Camp, das automatisch die Teilnehmendenliste der Camp-Gruppe aufbauen soll.

### Eine Folge-E-Mail senden {#sending-a-follow-up-email}

Wenn **Personendatensatz aus Einsendungen erstellen** aktiviert ist, können Sie außerdem jeder Person, die das Formular absendet, eine E-Mail schicken. Füllen Sie in den Details des Formulars **Betreff der Folge-E-Mail** und **Text der Folge-E-Mail** aus. In beiden können Sie die Platzhalter `{firstName}` und `{churchName}` verwenden. Die E-Mail wird nur gesendet, wenn beide Felder ausgefüllt sind.

:::info
Folge-E-Mails werden erst versendet, nachdem Ihre Gemeinde für den Versand von Gruppen-E-Mails freigegeben wurde. Sie zählen außerdem zum täglichen E-Mail-Limit Ihrer Gemeinde. Siehe [Gruppen-E-Mails für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Ein Formular duplizieren

Um ein Formular als Ausgangspunkt für ein neues zu verwenden, klicken Sie in der Formularliste neben dem Formular auf **Duplizieren** und bestätigen Sie. B1 erstellt eine exakte Kopie des Formulars einschließlich aller Fragen. Diese können Sie anschließend umbenennen und unabhängig bearbeiten.

:::tip
Das Duplizieren ist praktisch für wiederkehrende Veranstaltungen, bei denen die Anmeldefragen von Jahr zu Jahr gleich bleiben. Duplizieren Sie das Formular des Vorjahres, passen Sie Name und Termine an, und schon kann es losgehen.
:::

## Formulareigenschaften konfigurieren

Sie können Name und Einstellungen Ihres Formulars jederzeit ändern. Bei eigenständigen Formularen sehen Sie außerdem eine eindeutige **öffentliche URL**, die Sie mit beliebigen Personen teilen können, sowie ein Feld **Beschreibung**. Der Text der Beschreibung wird oberhalb der Fragen auf der öffentlichen Formularseite angezeigt. Er hilft, Personen vor dem Ausfüllen zu erklären, wofür das Formular gedacht ist.

### Ein Kopfbild hinzufügen {#adding-a-header-photo}

Eigenständige Formulare können oben ein **Kopfbild** anzeigen. Klicken Sie in den Details des Formulars auf das Fotofeld oder auf **Foto hinzufügen** und wählen Sie dann ein Bild aus oder laden Sie es hoch (es wird auf ein Format von 16:9 zugeschnitten). Klicken Sie auf **Speichern**. Das Foto erscheint unter dem Namen des Formulars und oberhalb der Beschreibung auf der öffentlichen URL-Seite des Formulars sowie überall dort, wo das Formular über das Website-Element **Formular** eingebettet ist. Mit **Foto ändern** ersetzen Sie es, mit **Entfernen** nehmen Sie es wieder heraus.

Mit dem Feld **Dankesnachricht** legen Sie fest, was Personen nach dem Absenden des Formulars sehen. Dies gilt auch für die öffentliche URL-Seite des Formulars. Lassen Sie das Feld leer, erscheint „Vielen Dank für das Absenden des Formulars!“

:::tip
Eigenständige Formulare eignen sich hervorragend für Veranstaltungsanmeldungen. Teilen Sie die öffentliche URL per E-Mail oder in sozialen Medien oder betten Sie das Formular direkt auf der Website Ihrer Gemeinde ein.
:::

:::info
Um ein Formular auf Ihrer B1-Website einzubetten, öffnen Sie den Website-Editor, fügen Sie einen neuen Abschnitt hinzu und wählen Sie das Element **Formular**. Wählen Sie danach das Formular aus, das angezeigt werden soll. Details zur Bearbeitung Ihrer Website finden Sie unter [Seiten verwalten](../website/managing-pages.md).
:::

---
title: "Formulare erstellen"
---

# Formulare erstellen

<div class="article-intro">

Erstellen Sie eigene Formulare, um Informationen aus Ihrer Gemeinde einzusammeln. Sie können Formulare für Veranstaltungsanmeldungen, Umfragen, Besucherkarten, Mitgliedsanträge und vieles mehr erstellen. Formulare können mit Personen in Ihrer Datenbank verknüpft oder als eigenständige Seiten mit eigener öffentlicher URL genutzt werden.

</div>

## Schulungsvideo

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Für **People**-Formulare (mit Personendatensätzen verknüpft) benötigen Sie zuerst [Personen in Ihrer Datenbank](../people/adding-people.md).
- Für Formulare, die **Zahlungen** erfassen, muss [Stripe für Online-Spenden eingerichtet](../donations/online-giving-setup.md) sein.

</div>

## Ein neues Formular erstellen

1. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links in B1 Admin), klappen Sie **People** auf und klicken Sie auf **Forms**.
2. Klicken Sie auf **Add Form**.
3. Geben Sie einen **Namen** für Ihr Formular ein.
4. Wählen Sie den Formulartyp im Dropdown-Menü **Associate With**:
   - **People** — Verknüpft Eingaben mit [Personendatensätzen](../people/adding-people.md) in Ihrer Datenbank. People-Formulare werden aus dem Datensatz einer Person ausgefüllt, daher gibt es für sie keinen teilbaren Link.
   - **Stand Alone** — Erstellt ein eigenständiges Formular mit eigener öffentlicher URL, ideal für externe Anmeldungen. Nur Stand-Alone-Formulare bieten ein [Kopfbild](#adding-a-header-photo), einen [QR-Code](#sharing-a-form-with-a-qr-code), eine [verknüpfte Gruppe](#linking-a-form-to-a-group) und **Create a person record from submissions**.
5. Klicken Sie auf **Save**, um das Formular zu erstellen.

Ihr neues Formular erscheint in der Liste. Klicken Sie darauf, um Fragen hinzuzufügen.

## Ein leeres Formular drucken {#printing-a-blank-form}

Sie brauchen eine Papierkopie zum Verteilen – etwa eine Besucherkarte für den Empfangstisch oder ein Formular für Personen ohne Internetzugang, die es von Hand ausfüllen sollen? Klicken Sie in der Hauptliste der Formulare neben einem Formular auf **Print**, um eine Vorschau zu öffnen, und klicken Sie dann auf **Print**. Leere Felder werden mit einer Unterstreichung oder einem Kästchen für jede Frage gedruckt, damit Personen sie von Hand ausfüllen können. Pflichtfragen sind mit einem Sternchen markiert. Oben auf der Seite erscheint das Logo Ihrer Gemeinde (das **Light Background Logo** aus [Website > Appearance](../website/appearance.md), falls Sie eines hochgeladen haben), darunter der Name Ihrer Gemeinde und darunter der Formularname. Weitere Druckoptionen gibt es nicht – Sie drucken entweder das ganze Formular oder gar nichts.

## Ein Formular mit einem QR-Code teilen {#sharing-a-form-with-a-qr-code}

Stand-Alone-Formulare haben in der Hauptliste der Formulare einen Link **QR Code** (archivierte Formulare nicht). Klicken Sie darauf, um einen QR-Code für die öffentliche URL des Formulars zu öffnen; die Adresse wird darunter angezeigt. Klicken Sie auf **Download PNG**, um den Code als Bild zu speichern, das Sie auf Gemeindebriefe drucken oder auf Folien zeigen können. Wer ihn scannt, öffnet das Formular auf seinem Telefon.

## Fragen hinzufügen {#adding-questions}

1. Öffnen Sie Ihr Formular und wechseln Sie zum Reiter **Questions**.
2. Klicken Sie auf **Add Question**.
3. Wählen Sie im Dropdown-Menü Provider einen **Feldtyp**. Verfügbare Typen sind unter anderem:
   - **Textbox** — Für kurze Textantworten
   - **Date** — Für Datumsauswahl
   - **Email** — Für E-Mail-Adressen
   - **Phone Number** — Für Telefoneingaben
   - **Multiple Choice** — Zur Auswahl aus vorgegebenen Optionen
   - **Payment** — Zum Einziehen von Zahlungen
4. Geben Sie einen **Title** und optional eine **Description** für die Frage ein. Die Beschreibung erscheint unter der Frage, wenn Personen das Formular ausfüllen. Nutzen Sie sie für Hinweise wie „Bitte nennen Sie uns alle Allergien, die wir kennen sollten.“
5. Aktivieren Sie **Require an answer**, wenn das Feld Pflicht ist.
6. Klicken Sie auf **Save**.
7. Wiederholen Sie die Schritte, um weitere Fragen hinzuzufügen.

:::warning
Der Feldtyp **Payment** setzt voraus, dass Stripe eingerichtet ist. Wenn Sie Online-Spenden noch nicht eingerichtet haben, lesen Sie [Online-Spenden einrichten](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen.
:::

## Formularmitglieder verwalten {#managing-form-members}

1. Öffnen Sie Ihr Formular und wechseln Sie zum Reiter **Form Members**.
2. Suchen Sie eine Person und fügen Sie sie mit einer Rolle hinzu:
   - **Admin** — Kann das Formular bearbeiten und alle Eingaben einsehen.
   - **View Only** — Kann Eingaben einsehen, aber das Formular nicht bearbeiten.

## Ein Formular mit einer Gruppe verknüpfen {#linking-a-form-to-a-group}

Sie können jedes Stand-Alone-Formular mit einer Gruppe verknüpfen – zum Beispiel ein Gebetsanliegen-Formular für einen Hauskreis oder eine medizinische Einverständniserklärung für eine Jugendfreizeit:

1. Öffnen Sie die **Details** Ihres Formulars.
2. Wählen Sie unter **Linked group** die Gruppe aus oder lassen Sie das Feld auf **None**.
3. Klicken Sie auf **Save**.

Sobald ein Formular verknüpft ist:

- **Gruppenmitglieder** sehen das Formular in einem Abschnitt **Forms** auf der Seite der Gruppe auf B1.church, solange das Formular geöffnet ist. Dort gibt es eine Schaltfläche **Fill out**, die es öffnet (siehe [Gruppendetails](../../b1-church/groups/group-details.md#linked-forms)).
- **Gruppenleitungen** sehen auch geschlossene Formulare und können die Antworten jeder Eingabe lesen und ausdrucken (eine Eingabe oder **Print all**). Leitungen können Antworten nur ansehen – sie können das Formular nicht bearbeiten, es sei denn, sie sind auch [Formularmitglieder](#managing-form-members).
- **In B1 Admin** zeigt die Seite der Gruppe einen Abschnitt **Linked forms** mit jedem verknüpften Formular als **Open** oder **Closed**. Er erscheint für die Leitungen der Gruppe und für Personen, die Formulare verwalten dürfen. Siehe [Gruppenmitglieder](../groups/group-members.md#linked-forms).

Ein Formular ist geschlossen, wenn es außerhalb seines Verfügbarkeitszeitraums liegt. Archivierte Formulare werden auf der Gruppenseite nicht angezeigt.

### Eingereichte Antworten automatisch zu einer Gruppe hinzufügen {#automatically-adding-submitters-to-a-group}

Das Verknüpfen eines Formulars mit einer Gruppe fügt von selbst niemanden hinzu. Wenn jeder Absender in die Mitgliederliste der verknüpften Gruppe aufgenommen werden soll, aktivieren Sie zusätzlich **Create a person record from submissions** in den Details des Formulars und klicken Sie auf **Save**.

Jedes Mal, wenn jemand das Formular absendet, wird die zugeordnete oder neu angelegte Person zur Gruppe hinzugefügt (bereits vorhandene Gruppenmitglieder werden übersprungen). Das ist nützlich, etwa bei einer Anmeldung zu einem Gemeindecamp, die automatisch die Teilnehmerliste der Gruppe aufbauen soll.

### Eine Nachfolge-E-Mail senden

Wenn **Create a person record from submissions** aktiviert ist, können Sie außerdem jeder Person, die das Formular absendet, eine E-Mail schicken. Tragen Sie in den Details des Formulars **Follow-up Email Subject** und **Follow-up Email Body** ein. In beiden können Sie die Platzhalter `{firstName}` und `{churchName}` verwenden. Die E-Mail wird nur verschickt, wenn beide Felder ausgefüllt sind.

:::info
Nachfolge-E-Mails werden erst versendet, nachdem Ihre Gemeinde für den Versand von Gruppen-E-Mails freigegeben wurde, und sie zählen zum täglichen E-Mail-Limit Ihrer Gemeinde. Siehe [Gruppen-E-Mails für Ihre Gemeinde aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Ein Formular duplizieren

Um ein Formular als Ausgangspunkt für ein neues zu verwenden, klicken Sie in der Liste der Formulare neben dem Formular auf **Duplicate** und bestätigen Sie. B1 erstellt eine exakte Kopie des Formulars – einschließlich aller Fragen –, die Sie anschließend umbenennen und unabhängig bearbeiten können.

:::tip
Das Duplizieren ist praktisch bei wiederkehrenden Veranstaltungen, bei denen die Anmeldefragen von Jahr zu Jahr gleich bleiben. Duplizieren Sie das Formular vom letzten Jahr, aktualisieren Sie Namen und Termine, und schon sind Sie startklar.
:::

## Formulareigenschaften konfigurieren

Sie können den Namen und die Einstellungen Ihres Formulars jederzeit ändern. Bei Stand-Alone-Formularen sehen Sie außerdem eine eindeutige **öffentliche URL**, die Sie mit jedem teilen können, sowie das Feld **Description** – einen Text, der oberhalb der Fragen auf der öffentlichen Formularseite angezeigt wird. Er eignet sich, um den Zweck des Formulars zu erklären, bevor jemand mit dem Ausfüllen beginnt.

### Ein Kopfbild hinzufügen {#adding-a-header-photo}

Stand-Alone-Formulare können oben im Formular ein **Header Photo** anzeigen. Klicken Sie in den Details des Formulars auf das Fotofeld oder auf **Add Photo** und wählen oder laden Sie dann ein Bild hoch (es wird auf ein 16:9-Format zugeschnitten). Klicken Sie auf **Save**. Das Foto erscheint unter dem Namen des Formulars, oberhalb der Beschreibung, auf der öffentlichen URL-Seite des Formulars und überall dort, wo das Formular über das Website-Element **Form** eingebettet ist. Mit **Change Photo** ersetzen Sie es, mit **Remove** entfernen Sie es.

Im Feld **Thank You Message** legen Sie fest, was Personen nach dem Absenden des Formulars sehen, auch auf der öffentlichen URL-Seite des Formulars. Lassen Sie das Feld leer, sehen sie „Thank you for submitting the form!“.

:::tip
Stand-Alone-Formulare eignen sich hervorragend für Veranstaltungsanmeldungen. Teilen Sie die öffentliche URL per E-Mail oder in sozialen Netzwerken oder betten Sie das Formular direkt auf Ihrer Gemeindewebsite ein.
:::

:::info
Um ein Formular auf Ihrer B1-Website einzubetten, öffnen Sie den Website-Editor, fügen Sie einen neuen Abschnitt hinzu und wählen Sie das Element **Form**. Wählen Sie dann das Formular aus, das angezeigt werden soll. Weitere Informationen zur Bearbeitung Ihrer Website finden Sie unter [Seiten verwalten](../website/managing-pages.md).
:::

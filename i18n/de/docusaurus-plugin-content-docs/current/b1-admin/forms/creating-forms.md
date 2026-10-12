---
title: "Formulare erstellen"
---

# Formulare erstellen

<div class="article-intro">

Erstellen Sie benutzerdefinierte Formulare, um Informationen von Ihrer Gemeinde zu sammeln. Sie können Formulare für Veranstaltungsanmeldungen, Umfragen, Besucherkarten, Mitgliedsanträge und mehr erstellen. Formulare können mit Personen in Ihrer Datenbank verknüpft oder als eigenständige Seiten mit eigener öffentlicher URL verwendet werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Für **Personen**-Formulare (verknüpft mit Personendatensätzen) benötigen Sie zuerst [Personen in Ihrer Datenbank](../people/adding-people.md).
- Für Formulare, die **Zahlungen** erfassen, muss [Stripe für Online-Spenden eingerichtet](../donations/online-giving-setup.md) sein.

</div>

## Ein neues Formular erstellen

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links in B1 Admin), klappen Sie **Personen** auf und klicken Sie auf **Formulare**.
2. Klicken Sie auf **Formular hinzufügen**.
3. Geben Sie einen **Namen** für Ihr Formular ein.
4. Wählen Sie den Formulartyp im Dropdown-Menü:
   - **Personen** — Ordnet Einsendungen [Personendatensätzen](../people/adding-people.md) in Ihrer Datenbank zu.
   - **Eigenständig** — Erstellt ein unabhängiges Formular mit eigener öffentlicher URL, ideal für externe Anmeldungen.
5. Klicken Sie auf **Speichern**, um das Formular zu erstellen.

Ihr neues Formular erscheint in der Liste. Klicken Sie darauf, um Fragen hinzuzufügen.

## Ein leeres Formular drucken

Sie brauchen eine Papierkopie zum Verteilen – etwa eine Besucherkarte für den Empfangstisch oder ein Formular für Personen ohne Internetzugang, die es handschriftlich ausfüllen sollen? Klicken Sie in der Hauptliste der Formulare neben einem Formular auf **Drucken**, um eine Vorschau zu öffnen, und klicken Sie dann auf **Drucken**. Leere Felder werden mit einer Unterstreichung oder einem Kontrollkästchen für jede Frage gedruckt, damit die Personen sie handschriftlich ausfüllen können. Pflichtfragen sind mit einem Sternchen markiert. Oben auf der Seite erscheint Ihr Gemeindelogo (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben), darunter der Name Ihrer Gemeinde und darüber der Formularname. Weitere Druckoptionen gibt es nicht – Sie drucken entweder das gesamte Formular oder gar nichts.

## Fragen hinzufügen

1. Öffnen Sie Ihr Formular und wechseln Sie zum Tab **Fragen**.
2. Klicken Sie auf **Frage hinzufügen**.
3. Wählen Sie im Anbieter-Dropdown einen **Feldtyp**. Verfügbare Typen sind unter anderem:
   - **Textfeld** — Für kurze Textantworten
   - **Datum** — Für Datumsauswahl
   - **E-Mail** — Für E-Mail-Adressen
   - **Telefonnummer** — Für Telefoneingaben
   - **Multiple Choice** — Zur Auswahl aus vordefinierten Optionen
   - **Zahlung** — Zum Erfassen von Zahlungen
4. Geben Sie einen **Titel** und optional eine **Beschreibung** für die Frage ein.
5. Aktivieren Sie **Antwort erforderlich**, wenn das Feld Pflicht ist.
6. Klicken Sie auf **Speichern**.
7. Wiederholen Sie die Schritte, um weitere Fragen hinzuzufügen.

:::warning
Der Feldtyp **Zahlung** setzt voraus, dass Stripe eingerichtet ist. Falls Sie Online-Spenden noch nicht eingerichtet haben, lesen Sie [Online-Spenden einrichten](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen.
:::

## Formularmitglieder verwalten

1. Öffnen Sie Ihr Formular und wechseln Sie zum Tab **Formularmitglieder**.
2. Suchen Sie eine Person und fügen Sie sie mit einer Rolle hinzu:
   - **Administrator** — Kann das Formular bearbeiten und alle Einsendungen einsehen.
   - **Nur Ansicht** — Kann Einsendungen einsehen, das Formular aber nicht bearbeiten.

## Absender automatisch einer Gruppe hinzufügen

Wenn **Personendatensatz aus Einsendungen erstellen** aktiviert ist, können Sie das Formular außerdem mit einer Gruppe verknüpfen, sodass jeder Absender automatisch in die Teilnehmerliste dieser Gruppe aufgenommen wird:

1. Öffnen Sie die **Details** Ihres Formulars und aktivieren Sie **Personendatensatz aus Einsendungen erstellen**.
2. Wählen Sie unter **Absender einer Gruppe hinzufügen** die Gruppe aus, oder belassen Sie die Einstellung auf **Keine**.
3. Klicken Sie auf **Speichern**.

Jedes Mal, wenn jemand das Formular absendet, wird die zugeordnete oder neu erstellte Person der Gruppe hinzugefügt (bereits vorhandene Gruppenmitglieder werden übersprungen). Das ist nützlich, etwa bei einem Anmeldeformular für ein Camp, das automatisch die Teilnehmerliste der Camp-Gruppe aufbauen soll.

### Eine Nachfassen-E-Mail senden

Wenn **Personendatensatz aus Einsendungen erstellen** aktiviert ist, können Sie außerdem jeder Person, die das Formular absendet, eine E-Mail schicken. Füllen Sie in den Details des Formulars **Betreff der Nachfass-E-Mail** und **Text der Nachfass-E-Mail** aus. In beiden können Sie die Platzhalter `{firstName}` und `{churchName}` verwenden. Die E-Mail wird nur versendet, wenn beide Felder ausgefüllt sind.

:::info
Nachfass-E-Mails werden erst versendet, nachdem Ihre Gemeinde zum Versand von Gruppen-E-Mails freigegeben wurde, und sie werden auf das tägliche E-Mail-Limit Ihrer Gemeinde angerechnet. Siehe [Gruppen-E-Mails für Ihre Gemeinde aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Ein Formular duplizieren

Um ein Formular als Ausgangspunkt für ein neues zu verwenden, klicken Sie in der Formularliste neben dem Formular auf **Duplizieren** und bestätigen Sie. B1 erstellt eine exakte Kopie des Formulars – einschließlich aller Fragen –, die Sie anschließend umbenennen und unabhängig bearbeiten können.

:::tip
Das Duplizieren eignet sich gut für wiederkehrende Veranstaltungen, bei denen die Anmeldefragen von Jahr zu Jahr gleich bleiben. Duplizieren Sie das Formular vom letzten Jahr, aktualisieren Sie Name und Termine, und schon können Sie loslegen.
:::

## Formulareigenschaften konfigurieren

Sie können Name und Einstellungen Ihres Formulars jederzeit ändern. Bei eigenständigen Formularen sehen Sie außerdem eine eindeutige **öffentliche URL**, die Sie an beliebige Personen weitergeben können, sowie ein Feld **Beschreibung** – Text, der oberhalb der Fragen auf der öffentlichen Formularseite angezeigt wird und den Personen erklärt, wofür das Formular gedacht ist, bevor sie es ausfüllen.

Im Feld **Dankesnachricht** legen Sie fest, was die Personen nach dem Absenden des Formulars sehen, auch auf der öffentlichen URL-Seite des Formulars. Wenn Sie es leer lassen, sehen sie „Vielen Dank für das Absenden des Formulars!“.

:::tip
Eigenständige Formulare eignen sich hervorragend für Veranstaltungsanmeldungen. Teilen Sie die öffentliche URL per E-Mail oder in sozialen Medien oder binden Sie das Formular direkt in Ihre Gemeindewebsite ein.
:::

:::info
Um ein Formular in Ihre B1-Website einzubinden, öffnen Sie den Website-Editor, fügen Sie einen neuen Abschnitt hinzu und wählen Sie das Element **Formular**. Wählen Sie anschließend das Formular aus, das angezeigt werden soll. Details zum Bearbeiten Ihrer Website finden Sie unter [Seiten verwalten](../website/managing-pages.md).
:::

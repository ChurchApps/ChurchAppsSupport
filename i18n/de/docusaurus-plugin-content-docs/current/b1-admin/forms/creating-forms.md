---
title: "Formulare erstellen"
---

# Formulare erstellen

<div class="article-intro">

Erstellen Sie eigene Formulare, um Informationen von Ihrer Gemeinde zu sammeln. Sie können Formulare für Veranstaltungsanmeldungen, Umfragen, Besucherkarten, Mitgliedsanträge und vieles mehr anlegen. Formulare können mit Personen in Ihrer Datenbank verknüpft oder als eigenständige Seiten mit eigener öffentlicher URL verwendet werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Für **Personen**-Formulare (verknüpft mit Personendatensätzen) benötigen Sie zuerst [Personen in Ihrer Datenbank](../people/adding-people.md).
- Für Formulare, die **Zahlungen** erfassen, muss [Stripe für Online-Spenden eingerichtet](../donations/online-giving-setup.md) sein.

</div>

## Ein neues Formular erstellen

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Personen** auf und klicken Sie auf **Formulare**.
2. Klicken Sie auf **Formular hinzufügen**.
3. Geben Sie einen **Namen** für Ihr Formular ein.
4. Wählen Sie im Dropdown-Menü den Formulartyp:
   - **Personen** — Ordnet Einsendungen den [Personendatensätzen](../people/adding-people.md) in Ihrer Datenbank zu.
   - **Eigenständig** — Erstellt ein unabhängiges Formular mit eigener öffentlicher URL, ideal für externe Anmeldungen.
5. Klicken Sie auf **Speichern**, um das Formular zu erstellen.

Ihr neues Formular erscheint in der Liste. Klicken Sie darauf, um Fragen hinzuzufügen.

## Ein leeres Formular drucken {#printing-a-blank-form}

Sie benötigen eine Papierversion zum Verteilen -- etwa eine Besucherkarte am Empfangstisch oder ein Formular, das jemand ohne Internetzugang von Hand ausfüllen kann? Klicken Sie in der Hauptliste der Formulare neben einem Formular auf **Drucken**, um eine Vorschau zu öffnen, und dann auf **Drucken**. Leere Felder werden mit einer Linie oder einem Kästchen für jede Frage gedruckt, damit Personen sie von Hand ausfüllen können. Pflichtfragen sind mit einem Sternchen gekennzeichnet. Oben auf der Seite erscheinen das Logo Ihrer Gemeinde (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), sofern Sie eines hochgeladen haben) mit dem Namen Ihrer Gemeinde darunter und anschließend der Formularname. Weitere Druckoptionen gibt es nicht: Sie drucken entweder das gesamte Formular oder gar nichts.

## Fragen hinzufügen {#adding-questions}

1. Öffnen Sie Ihr Formular und wechseln Sie zur Registerkarte **Fragen**.
2. Klicken Sie auf **Frage hinzufügen**.
3. Wählen Sie im Dropdown-Menü Anbieter einen **Feldtyp**. Verfügbare Typen sind unter anderem:
   - **Textfeld** — Für kurze Textantworten
   - **Datum** — Für Datumsauswahl
   - **E-Mail** — Für E-Mail-Adressen
   - **Telefonnummer** — Für die Eingabe einer Telefonnummer
   - **Multiple Choice** — Zur Auswahl aus vorgegebenen Optionen
   - **Zahlung** — Zum Erfassen von Zahlungen
4. Geben Sie einen **Titel** und optional eine **Beschreibung** für die Frage ein. Die Beschreibung erscheint unter der Frage, wenn Personen das Formular ausfüllen. Nutzen Sie sie für Hinweise wie „Bitte nennen Sie Allergien, die wir berücksichtigen sollten.“
5. Aktivieren Sie **Antwort erforderlich**, wenn das Feld Pflicht ist.
6. Klicken Sie auf **Speichern**.
7. Wiederholen Sie diese Schritte, um weitere Fragen hinzuzufügen.

:::warning
Der Feldtyp **Zahlung** setzt voraus, dass Stripe eingerichtet ist. Wenn Sie Online-Spenden noch nicht eingerichtet haben, lesen Sie [Einrichtung von Online-Spenden](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen.
:::

## Formularmitglieder verwalten

1. Öffnen Sie Ihr Formular und wechseln Sie zur Registerkarte **Formularmitglieder**.
2. Suchen Sie eine Person und fügen Sie sie mit einer Rolle hinzu:
   - **Administrator** — Kann das Formular bearbeiten und alle Einsendungen einsehen.
   - **Nur Anzeige** — Kann Einsendungen einsehen, das Formular aber nicht bearbeiten.

## Einsender automatisch einer Gruppe hinzufügen {#automatically-adding-submitters-to-a-group}

Wenn **Personendatensatz aus Einsendungen erstellen** aktiviert ist, können Sie das Formular außerdem mit einer Gruppe verknüpfen, sodass jede einsendende Person automatisch in die Mitgliederliste dieser Gruppe aufgenommen wird:

1. Öffnen Sie die **Details** Ihres Formulars und aktivieren Sie **Personendatensatz aus Einsendungen erstellen**.
2. Wählen Sie unter **Einsender einer Gruppe hinzufügen** die Gruppe aus, oder lassen Sie die Einstellung auf **Keine**.
3. Klicken Sie auf **Speichern**.

Jedes Mal, wenn jemand das Formular absendet, wird die zugeordnete oder neu angelegte Person der Gruppe hinzugefügt (bereits vorhandene Gruppenmitglieder werden übersprungen). Das ist nützlich, etwa für ein Anmeldeformular für ein Freizeitlager, das automatisch die Mitgliederliste der Lagergruppe aufbauen soll.

### Eine Nachfassmail senden {#sending-a-follow-up-email}

Wenn **Personendatensatz aus Einsendungen erstellen** aktiviert ist, können Sie außerdem jeder Person, die das Formular absendet, eine E-Mail schicken. Füllen Sie in den Details des Formulars **Betreff der Nachfass-E-Mail** und **Text der Nachfass-E-Mail** aus. In beiden können Sie die Platzhalter `{firstName}` und `{churchName}` verwenden. Die E-Mail wird nur versendet, wenn beide Felder ausgefüllt sind.

:::info
Nachfassmails werden erst versendet, nachdem Ihre Gemeinde für den Versand von Gruppen-E-Mails freigegeben wurde, und sie zählen zum täglichen E-Mail-Limit Ihrer Gemeinde. Siehe [Gruppen-E-Mails für Ihre Gemeinde aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Ein Formular duplizieren

Um ein Formular als Ausgangspunkt für ein neues zu verwenden, klicken Sie in der Formularliste neben dem Formular auf **Duplizieren** und bestätigen Sie. B1 erstellt eine exakte Kopie des Formulars -- einschließlich aller Fragen --, die Sie anschließend unabhängig umbenennen und bearbeiten können.

:::tip
Das Duplizieren ist praktisch für wiederkehrende Veranstaltungen, bei denen die Anmeldefragen von Jahr zu Jahr gleich bleiben. Duplizieren Sie das Formular des letzten Jahres, aktualisieren Sie Namen und Termine, und schon kann es losgehen.
:::

## Formulareigenschaften konfigurieren

Sie können den Namen und die Einstellungen Ihres Formulars jederzeit ändern. Bei eigenständigen Formularen sehen Sie außerdem eine eindeutige **öffentliche URL**, die Sie mit beliebigen Personen teilen können, sowie ein Feld **Beschreibung**. Der Text erscheint oberhalb der Fragen auf der öffentlichen Formularseite und ist nützlich, um Personen zu erklären, wofür das Formular dient, bevor sie es ausfüllen.

Mit dem Feld **Dankesnachricht** legen Sie fest, was Personen nach dem Absenden des Formulars sehen, auch auf der öffentlichen URL-Seite des Formulars. Lassen Sie das Feld leer, sehen sie „Vielen Dank für das Absenden des Formulars!“.

:::tip
Eigenständige Formulare eignen sich hervorragend für Veranstaltungsanmeldungen. Teilen Sie die öffentliche URL per E-Mail oder in sozialen Medien oder betten Sie das Formular direkt auf der Website Ihrer Gemeinde ein.
:::

:::info
Um ein Formular in Ihre B1-Website einzubetten, gehen Sie zu Ihrem Website-Editor, fügen Sie einen neuen Abschnitt hinzu und wählen Sie das Element **Formular**. Wählen Sie dann das Formular aus, das angezeigt werden soll. Details zur Bearbeitung Ihrer Website finden Sie unter [Seiten verwalten](../website/managing-pages.md).
:::

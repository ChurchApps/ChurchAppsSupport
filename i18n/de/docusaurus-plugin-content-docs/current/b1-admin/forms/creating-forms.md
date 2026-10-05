---
title: "Formulare erstellen"
---

# Formulare erstellen

<div class="article-intro">

Erstellen Sie benutzerdefinierte Formulare, um Informationen von Ihrer Gemeinde zu sammeln. Sie können Formulare für Veranstaltungsregistrierungen, Umfragen, Besucherkarten, Mitgliedschaftsanträge und mehr erstellen. Formulare können mit Personen in Ihrer Datenbank verknüpft werden oder als eigenständige Seiten mit ihrer eigenen öffentlichen URL verwendet werden.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Für **Personen**-Formulare (verknüpft mit Personendatensätzen) benötigen Sie zuerst [Personen in Ihrer Datenbank](../people/adding-people.md).
- Für Formulare, die **Zahlungen** sammeln, müssen Sie [Stripe für Online-Spenden konfiguriert haben](../donations/online-giving-setup.md).

</div>

## Erstellen eines neuen Formulars

1. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), erweitern Sie **People** (Personen) und klicken Sie auf **Forms** (Formulare).
2. Klicken Sie auf **Add Form** (Formular hinzufügen).
3. Geben Sie einen **Namen** für Ihr Formular ein.
4. Wählen Sie den Formulartyp aus dem Dropdown:
   - **People** (Personen) — Ordnet Übermittlungen [Personendatensätzen](../people/adding-people.md) in Ihrer Datenbank zu.
   - **Stand Alone** (Eigenständig) — Erstellt ein unabhängiges Formular mit seiner eigenen öffentlichen URL, ideal für externe Registrierungen.
5. Klicken Sie auf **Save** (Speichern), um das Formular zu erstellen.

Ihr neues Formular wird in der Liste angezeigt. Klicken Sie darauf, um mit dem Hinzufügen von Fragen zu beginnen.

## Drucken eines leeren Formulars

Benötigen Sie eine Papierkopie zum Austeilen – für eine Besucherkarte am Willkommensschalter oder ein Formular, das jemand ohne Internetzugang von Hand ausfüllen kann? Klicken Sie auf das **Druckersymbol** neben einem Formular in der Hauptformularliste, um eine Vorschau zu öffnen, und klicken Sie dann auf **Print** (Drucken). Leere Felder werden mit einer Unterstriche oder Kontrollkästchen für jede Frage gedruckt, damit Personen sie von Hand ausfüllen können; erforderliche Fragen sind mit einem Sternchen gekennzeichnet. Der Name Ihrer Kirche wird oben über dem Formularnamen gedruckt. Es gibt keine anderen Druckoptionen – drucken Sie das ganze Formular oder gar nichts.

## Fragen hinzufügen

1. Öffnen Sie Ihr Formular und gehen Sie zur Registerkarte **Questions** (Fragen).
2. Klicken Sie auf **Add Question** (Frage hinzufügen).
3. Wählen Sie einen **Feldtyp** aus dem Provider-Dropdown. Verfügbare Typen umfassen:
   - **Textbox** (Textfeld) — Für kurze Textantworten
   - **Date** (Datum) — Für Datumsauswahl
   - **Email** (E-Mail) — Für E-Mail-Adressen
   - **Phone Number** (Telefonnummer) — Für Telefoneingabe
   - **Multiple Choice** (Mehrfachauswahl) — Zum Auswählen aus vordefinierten Optionen
   - **Payment** (Zahlung) — Für das Sammeln von Zahlungen
4. Geben Sie einen **Titel** und eine optionale **Beschreibung** für die Frage ein.
5. Aktivieren Sie **Require an answer** (Antwort erforderlich), wenn das Feld erforderlich ist.
6. Klicken Sie auf **Save** (Speichern).
7. Wiederholen Sie, um weitere Fragen hinzuzufügen.

:::warning
Der Feldtyp **Payment** (Zahlung) erfordert, dass Stripe konfiguriert ist. Wenn Sie Online-Spenden noch nicht eingerichtet haben, siehe [Online Giving Setup](../donations/online-giving-setup.md), bevor Sie Zahlungsfelder hinzufügen.
:::

## Verwaltung von Formularmitgliedern

1. Öffnen Sie Ihr Formular und gehen Sie zur Registerkarte **Form Members** (Formularmitglieder).
2. Suchen Sie nach einer Person und fügen Sie sie mit einer Rolle hinzu:
   - **Admin** — Kann das Formular bearbeiten und alle Übermittlungen anzeigen.
   - **View Only** (Nur anzeigen) — Kann Übermittlungen anzeigen, aber das Formular nicht bearbeiten.

## Automatisches Hinzufügen von Übermittlern zu einer Gruppe

Wenn **Create a person record from submissions** (Personendatensatz aus Übermittlungen erstellen) aktiviert ist, können Sie das Formular auch mit einer Gruppe verknüpfen, sodass jeder Übermittler automatisch zur Gruppenliste hinzugefügt wird:

1. Öffnen Sie die **Details** Ihres Formulars und aktivieren Sie **Create a person record from submissions** (Personendatensatz aus Übermittlungen erstellen).
2. Wählen Sie unter **Add submitters to a group** (Übermittler zu einer Gruppe hinzufügen) die Gruppe aus, zu der Übermittler hinzugefügt werden sollen, oder belassen Sie sie auf **None** (Keine).
3. Klicken Sie auf **Save** (Speichern).

Jedes Mal, wenn jemand das Formular übermittelt, wird die übereinstimmende oder neu erstellte Person der Gruppe hinzugefügt (vorhandene Gruppenmitglieder werden übersprungen). Dies ist nützlich für Dinge wie ein Lagerregistrierungsformular, das automatisch die Lagerliste der Gruppe erstellen soll.

### Senden einer Follow-up-E-Mail

Mit **Create a person record from submissions** (Personendatensatz aus Übermittlungen erstellen) aktiviert, können Sie auch jedem Formularübermittler eine E-Mail senden. Füllen Sie **Follow-up Email Subject** (Follow-up-E-Mail-Betreff) und **Follow-up Email Body** (Follow-up-E-Mail-Text) in den Formulardetails aus. Sie können die Token `{firstName}` und `{churchName}` in beiden verwenden. Die E-Mail wird nur versendet, wenn beide Felder ausgefüllt sind.

:::info
Follow-up-E-Mails werden nur versendet, nachdem Ihre Kirche genehmigt wurde, um Gruppen-E-Mails zu versenden, und sie zählen zum täglichen E-Mail-Limit Ihrer Kirche. Siehe [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplizieren eines Formulars

Um ein Formular als Ausgangspunkt für ein neues zu verwenden, klicken Sie auf das Symbol **Duplicate** (Duplizieren) (Kopiersymbol) neben dem Formular in der Formularliste. B1 erstellt eine exakte Kopie des Formulars – einschließlich aller Fragen – die Sie dann unabhängig umbenennen und bearbeiten können.

:::tip
Die Duplizierung ist praktisch für wiederkehrende Veranstaltungen, bei denen die Registrierungsfragen von Jahr zu Jahr gleich bleiben. Duplizieren Sie das Formular des letzten Jahres, aktualisieren Sie den Namen und die Daten, und schon geht es los.
:::

## Konfigurieren von Formulareigenschaften

Sie können den Namen und die Einstellungen Ihres Formulars jederzeit aktualisieren. Für Stand Alone-Formulare sehen Sie auch eine eindeutige **öffentliche URL**, die Sie mit jedem teilen können, zusammen mit einem **Beschreibungsfeld** – Text, der oben über den Fragen auf der öffentlichen Formularseite angezeigt wird, nützlich, um Personen zu sagen, wofür das Formular bestimmt ist, bevor sie mit dem Ausfüllen beginnen.

Verwenden Sie das Feld **Thank You Message** (Dankesnachricht), um festzulegen, was Personen nach dem Absenden des Formulars sehen, einschließlich auf der öffentlichen URL-Seite des Formulars. Wenn Sie es leer lassen, sehen sie "Thank you for submitting the form!"

:::tip
Stand Alone-Formulare sind großartig für Veranstaltungsregistrierungen. Teilen Sie die öffentliche URL per E-Mail, Social Media oder betten Sie das Formular direkt auf Ihrer Kirchenwebsite ein.
:::

:::info
Um ein Formular auf Ihrer B1-Website einzubetten, gehen Sie zu Ihrem Website-Editor, fügen Sie einen neuen Abschnitt hinzu und wählen Sie das Element **Form** (Formular). Wählen Sie dann das Formular aus, das Sie anzeigen möchten. Siehe [Managing Pages](../website/managing-pages.md) für Details zum Bearbeiten Ihrer Website.
:::

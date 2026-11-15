---
title: "Einsendungen verwalten"
description: "Prüfen, drucken und neu zuordnen Sie Einsendungen von Formularen in B1 Admin, indem Sie Antworten der richtigen Person zuordnen und Besucherkarten sowie Gebetsanliegen nachverfolgen."
---

# Einsendungen verwalten

<div class="article-intro">

Sobald Ihr Formular online ist, gehen Einsendungen ein. Auf dem Reiter **Einsendungen** können Sie jede Antwort prüfen, nachvollziehen, wer etwas eingereicht hat, und die Daten nutzen, um Ihre Gemeinde zeitnah nachzufassen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- [Erstellen Sie ein Formular](./creating-forms.md) mit mindestens einer Frage
- Teilen Sie das Formular über seine öffentliche URL oder betten Sie es auf Ihrer [Website](../website/managing-pages.md) ein

</div>

## Einsendungen ansehen {#viewing-submissions}

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin), klappen Sie **Personen** auf und klicken Sie auf **Formulare**.
2. Klicken Sie auf das Formular, das Sie prüfen möchten.
3. Wechseln Sie zum Reiter **Einsendungen**.

Der Reiter enthält zwei Karten:

- **Zusammenfassung der Einsendungen** – Bei jeder Frage vom Typ Multiple Choice, Kontrollkästchen und Ja/Nein eine Auszählung, wie viele Personen jede Antwort gewählt haben.
- **Ergebnisse der Einsendungen** – eine Tabelle aller Antworten mit der Anzahl der Einsendungen. Jede Zeile zeigt, für wen die Einsendung ist (**Eingereicht für** bei Personenformularen, **Eingereicht von** bei eigenständigen Formularen oder **Anonym**) und das **Datum der Einsendung**, gefolgt von einer Spalte für jede Frage des Formulars in der Reihenfolge des Formulars. Hat Ihr Formular viele Fragen, scrollen Sie die Tabelle seitlich, um die übrigen Spalten zu sehen. Klicken Sie auf den Namen einer Person, um ihren Datensatz zu öffnen.

Klicken Sie auf einer der beiden Karten auf **Exportieren**, um die Antworten als CSV-Datei herunterzuladen, mit einer Zeile pro Einsendung. Klicken Sie auf das Symbol **Drucken** (Drucker), um die Zusammenfassung und die Ergebnistabelle zu drucken, mit dem Namen Ihrer Kirche als Kopfzeile.

## Einzelne Einsendungen prüfen {#reviewing-individual-submissions}

Um die Antworten einer Person zu lesen oder zu drucken, öffnen Sie deren Datensatz unter [Personen](../people/adding-people.md#working-with-forms) und klicken Sie im Bereich **Formulare** auf das Formular. Sie sehen alle Antworten, die die Person gegeben hat, jede Frage in einer eigenen Zeile.

Klicken Sie neben der Einsendung auf das **Druckersymbol**, um die ausgefüllten Antworten dieser Person zu drucken – nützlich für eine Papierakte oder eine unterschriebene Einverständniserklärung, die Sie griffbereit haben müssen. Der Ausdruck zeigt Ihr Kirchenlogo (das **Logo für helle Hintergründe** aus [Website > Erscheinungsbild](../website/appearance.md), falls Sie eines hochgeladen haben) zentriert oben, mit dem Namen Ihrer Kirche darunter. Ausdrucke verwenden immer dunklen Text auf weißem Papier, auch wenn Sie B1 Admin im Dunkelmodus nutzen. Dies ist etwas anderes als [ein leeres Formular drucken](./creating-forms.md#printing-a-blank-form): Es druckt die bereits eingereichten Antworten einer Person, keine leere Kopie.

## Die Person einer Einsendung ändern {#changing-the-person-on-a-submission}

Ist eine Einsendung der falschen Person zugeordnet – zum Beispiel, wenn sich zwei Familienmitglieder eine E-Mail-Adresse teilen –, können Sie sie der richtigen Person zuordnen oder die Verknüpfung lösen.

1. Klicken Sie auf dem Reiter **Einsendungen** neben dem Namen der Person auf das Symbol **Person ändern** (zwei Pfeile). Dasselbe Symbol erscheint neben einer Einsendung im [Profil einer Person](../people/adding-people.md#working-with-forms).
2. Suchen Sie im Dialog **Person ändern** nach der richtigen Person und klicken Sie auf **Zu dieser Person verschieben**.
3. Oder klicken Sie auf **Verknüpfung lösen (Anonym)**, um die Einsendung von jeder Person zu lösen. Sie wird dann als **Anonym** angezeigt.

Nur die Verknüpfung ändert sich. Die Antworten bleiben gleich, und es werden keine Nachfass-E-Mails erneut versendet.

:::info
Bei Formularen, die einen Personendatensatz anlegen, wird eine Einsendung, wenn die Person beim Absenden auf der Website Ihrer Kirche angemeldet ist, ihrem eigenen Datensatz zugeordnet – auch dann, wenn eine andere Person in Ihrer Datenbank dieselbe E-Mail-Adresse hat. Wenn Sie [zwei Personendatensätze zusammenführen](../people/adding-people.md), wandern die Formulareinsendungen der entfernten Person zur Person, die Sie behalten.
:::

## Wie Einsendungen eingehen {#how-submissions-are-collected}

Einsendungen können über mehrere Wege eingehen:

- **Öffentliche URL** – Hat Ihr Formular eine öffentliche URL (eigenständige Formulare), kann jeder mit dem Link eine Antwort einreichen. Teilen Sie die URL per E-Mail, in sozialen Medien oder per Textnachricht.
- **Auf Ihrer Website eingebettet** – Formulare, die auf Ihrer B1-Website eingebettet sind, sammeln Einsendungen automatisch, wenn Besucher sie ausfüllen.
- **Interne Nutzung** – Mitarbeitende können Personenformulare für eine Person aus deren Datensatz in B1 Admin ausfüllen. Siehe [Mit Formularen arbeiten](../people/adding-people.md#working-with-forms).

:::tip
Prüfen Sie den Reiter **Einsendungen** regelmäßig bei Formularen wie Besucherkarten oder Gebetsanliegen, damit Sie zeitnah nachfassen können.
:::

## Die Daten der Einsendungen nutzen {#using-submission-data}

Die über Formulare gesammelten Daten können Ihnen helfen:

- Veranstaltungsanmeldungen nachzuverfolgen und entsprechend zu planen
- Besucher oder neue Mitglieder nachzufassen
- Umfrage-Feedback für die Planung des Dienstes zu sammeln
- Zahlungen für Veranstaltungen oder Programme abzuwickeln

:::info
Formularmitglieder mit den Rollen **Administrator** oder **Nur Anzeigen** können auf den Reiter **Einsendungen** zugreifen. Stellen Sie über den Reiter **Mitglieder des Formulars** sicher, dass die richtigen Personen in Ihrem Team Zugriff auf die Formulare haben, die sie brauchen.
:::

:::info
Ist ein eigenständiges Formular [mit einer Gruppe verknüpft](./creating-forms.md#linking-a-form-to-a-group), können die Leitenden dieser Gruppe dessen Einsendungen von der Seite der Gruppe in B1.church aus lesen und drucken, ohne Mitglieder des Formulars zu sein. Leitende können dort außerdem die Antworten auf Anmeldefragen zu den Veranstaltungen ihrer Gruppe lesen. Siehe [Gruppendetails](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Ist ein **eigenständiges** Formular so eingestellt, dass ein Personendatensatz angelegt wird, erscheinen Einsendungen, die einer bestehenden Person zugeordnet wurden, auch im Bereich **Formulare** der Seite dieser Person unter Personen – nicht nur bei Formularen vom Typ Personen.
:::

## Wie es weitergeht {#next-steps}

- Lernen Sie, wie Sie Formulare erstellen und anpassen, in [Formulare erstellen](./creating-forms.md)
- Fügen Sie Personen aus Formulareinsendungen Ihrem [Personenverzeichnis](../people/adding-people.md) hinzu, um sie dauerhaft nachzuverfolgen
- [Verknüpfen Sie ein Formular mit einer Gruppe](./creating-forms.md#linking-a-form-to-a-group), damit deren Leitende die Antworten lesen können, oder [fügen Sie Einsendende automatisch der Gruppe hinzu](./creating-forms.md#automatically-adding-submitters-to-a-group), damit ein eigenständiges Anmeldeformular seine eigene Teilnehmerliste aufbaut
